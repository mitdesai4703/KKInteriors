import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {

  // CORS PRE-FLIGHT
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const body = await req.json();
    const { email, name, message, phone } = body;

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || FROM_EMAIL;

    if (!SENDGRID_API_KEY || !FROM_EMAIL) {
      throw new Error("Missing SendGrid env variables");
    }

    const sendEmail = async (to, subject, html) => {
      return fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: FROM_EMAIL },
          subject,
          content: [{ type: "text/html", value: html }],
        }),
      });
    };

    // Send user email
    await sendEmail(
      email,
      "Thank You for Contacting Us!",
      `<h3>Hello ${name}</h3>
      <p>We received your message:</p>
      <blockquote>${message}</blockquote>
      <p>We will contact you shortly.</p>`
    );

    // Send admin email
    await sendEmail(
      ADMIN_EMAIL,
      "New Contact Form Submission",
      `<h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>`
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    console.error("Function Error:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
