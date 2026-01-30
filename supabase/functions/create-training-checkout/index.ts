import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-TRAINING-CHECKOUT] ${step}${detailsStr}`);
};

// Input validation schema
const bookingSchema = z.object({
  coachId: z.string().min(1, "Coach ID is required").max(50, "Coach ID too long").trim(),
  coachName: z.string().min(1, "Coach name is required").max(100, "Coach name too long").trim(),
  position: z.string().min(1, "Position is required").max(50, "Position too long").trim(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)"),
  time: z.string().regex(/^\d{1,2}:\d{2}\s?(AM|PM)$/i, "Invalid time format"),
  athleteName: z.string().min(1, "Athlete name is required").max(100, "Athlete name too long").trim(),
  parentEmail: z.string().email("Invalid email address").max(255, "Email too long").trim(),
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
    logStep("Received booking request");

    // Validate input using zod schema
    const validationResult = bookingSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      logStep("Validation failed", { error: errorMessage });
      return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { coachId, coachName, position, date, time, athleteName, parentEmail } = validationResult.data;
    logStep("Validated booking data", { coachId, position, date, time, athleteName: athleteName.substring(0, 20) });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create checkout session for training session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : parentEmail,
      line_items: [
        {
          price: "price_1SjEP9JCEhoZof7cJZXzxPZN", // Football Training Session price
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/training?success=true&session=${encodeURIComponent(coachId)}`,
      cancel_url: `${req.headers.get("origin")}/training?canceled=true`,
      metadata: {
        coachId,
        coachName,
        position,
        date,
        time,
        athleteName,
        parentEmail,
        type: "training_session",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-training-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
