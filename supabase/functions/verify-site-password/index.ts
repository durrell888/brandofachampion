import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-SITE-PASSWORD] ${step}${detailsStr}`);
};

// Rate limiting constants
const MAX_ATTEMPTS = 10;
const WINDOW_MINUTES = 60;
const BLOCK_DURATION_MINUTES = 30;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   req.headers.get("x-real-ip") || 
                   "unknown";

  // Use service role for rate limiting operations and reading settings
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  try {
    logStep("Function started", { ip: ipAddress });
    
    // Check rate limit
    const { data: rateData } = await supabaseAdmin
      .from("password_rate_limits")
      .select("*")
      .eq("ip_address", ipAddress)
      .maybeSingle();

    if (rateData) {
      // Check if blocked
      if (rateData.blocked_until && new Date(rateData.blocked_until) > new Date()) {
        const remainingMinutes = Math.ceil(
          (new Date(rateData.blocked_until).getTime() - Date.now()) / 60000
        );
        logStep("IP is blocked", { ip: ipAddress, remainingMinutes });
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: `Too many attempts. Please try again in ${remainingMinutes} minutes.` 
          }), 
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          }
        );
      }

      // Check if within rate limit window
      const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
      if (new Date(rateData.first_attempt_at) > windowStart && rateData.attempt_count >= MAX_ATTEMPTS) {
        // Block the IP
        const blockedUntil = new Date(Date.now() + BLOCK_DURATION_MINUTES * 60 * 1000);
        await supabaseAdmin
          .from("password_rate_limits")
          .update({ blocked_until: blockedUntil.toISOString() })
          .eq("ip_address", ipAddress);

        logStep("IP blocked due to too many attempts", { ip: ipAddress });
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: `Too many attempts. Please try again in ${BLOCK_DURATION_MINUTES} minutes.` 
          }), 
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          }
        );
      }
    }

    const { password } = await req.json();
    
    if (!password || typeof password !== "string") {
      return new Response(JSON.stringify({ valid: false, error: "Password required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get site password hash from settings using service role
    const { data: settings, error: settingsError } = await supabaseAdmin
      .from("site_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["site_password_enabled", "site_password_hash"]);

    if (settingsError) {
      logStep("Error fetching settings", { error: settingsError.message });
      return new Response(JSON.stringify({ valid: false, error: "Could not verify password" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const passwordEnabled = settings?.find(s => s.setting_key === "site_password_enabled")?.setting_value === "true";
    const sitePasswordHash = settings?.find(s => s.setting_key === "site_password_hash")?.setting_value || "";

    if (!passwordEnabled) {
      logStep("Site password is disabled");
      return new Response(JSON.stringify({ valid: true, message: "Password protection disabled" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Require bcrypt hash - no plaintext fallback allowed
    if (!sitePasswordHash || sitePasswordHash.length < 20) {
      logStep("Site password hash not configured properly");
      return new Response(JSON.stringify({ valid: false, error: "Site password not configured. Contact administrator." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Use bcrypt to compare passwords - no plaintext fallback
    let isValid = false;
    try {
      isValid = await compare(password, sitePasswordHash);
    } catch (e) {
      logStep("Bcrypt comparison failed", { error: String(e) });
      return new Response(JSON.stringify({ valid: false, error: "Password verification failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    logStep("Password verification", { valid: isValid });

    // Update rate limiting based on result
    if (!isValid) {
      // Increment attempt count
      if (rateData) {
        const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
        if (new Date(rateData.first_attempt_at) < windowStart) {
          // Reset window
          await supabaseAdmin
            .from("password_rate_limits")
            .update({
              attempt_count: 1,
              first_attempt_at: new Date().toISOString(),
              last_attempt_at: new Date().toISOString(),
              blocked_until: null,
            })
            .eq("ip_address", ipAddress);
        } else {
          // Increment
          await supabaseAdmin
            .from("password_rate_limits")
            .update({
              attempt_count: rateData.attempt_count + 1,
              last_attempt_at: new Date().toISOString(),
            })
            .eq("ip_address", ipAddress);
        }
      } else {
        // Create new rate limit entry
        await supabaseAdmin
          .from("password_rate_limits")
          .insert({
            ip_address: ipAddress,
            attempt_count: 1,
          });
      }
    } else {
      // On success, clear rate limit
      if (rateData) {
        await supabaseAdmin
          .from("password_rate_limits")
          .delete()
          .eq("ip_address", ipAddress);
      }
    }

    return new Response(JSON.stringify({ valid: isValid }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-site-password", { message: errorMessage });
    return new Response(JSON.stringify({ valid: false, error: "Verification failed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
