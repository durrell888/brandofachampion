import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-STRENGTH-CHECKOUT] ${step}${detailsStr}`);
};

// Input validation schema
const subscriptionSchema = z.object({
  athleteName: z.string().min(1, "Athlete name is required").max(100, "Athlete name too long").trim(),
  parentEmail: z.string().email("Please enter a valid email address").max(255, "Email too long").trim(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const rawBody = await req.json();
    logStep("Received subscription request");

    // Validate input using zod schema
    const validationResult = subscriptionSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      logStep("Validation failed", { error: errorMessage });
      return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { athleteName, parentEmail } = validationResult.data;
    logStep("Validated subscription data", { athleteName: athleteName.substring(0, 20), parentEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create checkout session for monthly subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : parentEmail,
      line_items: [
        {
          price: "price_1SsoXGJCEhoZof7crlYkUj9r", // Strength and Speed Performance - $150/month
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/coach/strength-coach?success=true`,
      cancel_url: `${req.headers.get("origin")}/coach/strength-coach?canceled=true`,
      metadata: {
        coachId: "strength-coach",
        coachName: "Scott Lashley",
        athleteName,
        parentEmail,
        type: "strength_speed_subscription",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-strength-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
