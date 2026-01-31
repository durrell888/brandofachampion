import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema with proper limits
const mediaApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").trim(),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").trim(),
  phone: z.string().max(20, "Phone must be less than 20 characters").trim().optional().default(""),
  experience: z.string().max(200, "Experience must be less than 200 characters").trim().optional().default(""),
  interest: z.string().max(200, "Interest must be less than 200 characters").trim().optional().default(""),
  message: z.string().max(2000, "Message must be less than 2000 characters").trim().optional().default(""),
});

// HTML escape function to prevent XSS in email templates
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate input using zod schema
    const validationResult = mediaApplicationSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => e.message).join(", ");
      console.error("[SEND-MEDIA-APPLICATION] Validation error:", errorMessage);
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, experience, interest, message } = validationResult.data;

    // Escape all user input before embedding in HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeExperience = escapeHtml(experience || "Not specified");
    const safeInterest = escapeHtml(interest || "Not specified");
    const safeMessage = escapeHtml(message || "");

    console.log("[SEND-MEDIA-APPLICATION] Sending email for:", safeName, safeEmail);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BOAC Media <onboarding@resend.dev>",
        to: ["boacmedia@gmail.com"],
        subject: `New Media Development Application: ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              New Media Development Application
            </h1>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #1f2937;">Applicant Information</h2>
              
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              <p><strong>Phone:</strong> ${safePhone}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #1f2937;">Application Details</h2>
              
              <p><strong>Experience Level:</strong> ${safeExperience}</p>
              <p><strong>Area of Interest:</strong> ${safeInterest}</p>
            </div>
            
            ${safeMessage ? `
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #1f2937;">Additional Message</h2>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
            </div>
            ` : ""}
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
            
            <p style="color: #6b7280; font-size: 12px;">
              This application was submitted through the Brand of a Champion Media Development page.
            </p>
          </div>
        `,
      }),
    });

    const emailResponse = await res.json();
    
    if (!res.ok) {
      console.error("[SEND-MEDIA-APPLICATION] Resend API error:", emailResponse);
      throw new Error(emailResponse.message || "Failed to send email");
    }

    console.log("[SEND-MEDIA-APPLICATION] Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("[SEND-MEDIA-APPLICATION] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process application. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
