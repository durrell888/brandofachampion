import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIER_PRICES = {
  basic: "price_1SaXIxJCEhoZof7cVAHwQfwm", // $4.99/month
  pro: "price_1SampeJCEhoZof7c94qEo7fv", // $14.99/month
};

// Input validation schema
const registrationSchema = z.object({
  parentName: z.string().min(1, "Parent name is required").max(100, "Parent name too long").trim(),
  parentEmail: z.string().email("Invalid email address").max(255, "Email too long").trim(),
  athleteName: z.string().min(1, "Athlete name is required").max(100, "Athlete name too long").trim(),
  athleteAge: z.string().min(1, "Athlete age is required").max(20, "Age value too long"),
  sport: z.string().min(1, "Sport is required").max(50, "Sport name too long").trim(),
  school: z.string().min(1, "School is required").max(100, "School name too long").trim(),
  tier: z.enum(["basic", "pro"]).default("basic"),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input using zod schema
    const validationResult = registrationSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => e.message).join(", ");
      console.error("[CREATE-REGISTRATION] Validation error:", errorMessage);
      return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    const { parentName, parentEmail, athleteName, athleteAge, sport, school, tier } = validationResult.data;

    const priceId = TIER_PRICES[tier];

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : parentEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/?registration=success`,
      cancel_url: `${req.headers.get("origin")}/?registration=canceled`,
      metadata: {
        parentName,
        athleteName,
        athleteAge,
        sport,
        school,
        tier,
      },
    });

    console.log("[CREATE-REGISTRATION] Checkout session created", { 
      sessionId: session.id, 
      athleteName,
      parentEmail,
      tier,
      priceId,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-REGISTRATION] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
