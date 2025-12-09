import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-SITE-PASSWORD] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  );

  try {
    logStep("Function started");
    
    const { password } = await req.json();
    
    if (!password || typeof password !== "string") {
      return new Response(JSON.stringify({ valid: false, error: "Password required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get site password from settings
    const { data: settings, error: settingsError } = await supabaseClient
      .from("site_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["site_password_enabled", "site_password"]);

    if (settingsError) {
      logStep("Error fetching settings", { error: settingsError.message });
      return new Response(JSON.stringify({ valid: false, error: "Could not verify password" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const passwordEnabled = settings?.find(s => s.setting_key === "site_password_enabled")?.setting_value === "true";
    const sitePassword = settings?.find(s => s.setting_key === "site_password")?.setting_value || "";

    if (!passwordEnabled) {
      logStep("Site password is disabled");
      return new Response(JSON.stringify({ valid: true, message: "Password protection disabled" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const isValid = password === sitePassword;
    logStep("Password verification", { valid: isValid });

    return new Response(JSON.stringify({ valid: isValid }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-site-password", { message: errorMessage });
    return new Response(JSON.stringify({ valid: false, error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
