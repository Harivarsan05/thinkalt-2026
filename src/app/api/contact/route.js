import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/email";
import { createZohoLead } from "../../../lib/zoho";

export async function POST(request) {
  try {
    const {
  name,
  email,
  company,
  phone,
  service,
  message,
  recaptchaToken,
} = await request.json();

if (!recaptchaToken) {
  return NextResponse.json(
    { error: "reCAPTCHA token missing." },
    { status: 400 }
  );
}

const verifyResponse = await fetch(
  "https://www.google.com/recaptcha/api/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
    }),
  }
);

const verifyData = await verifyResponse.json();

if (!verifyData.success) {
  return NextResponse.json(
    { error: "reCAPTCHA verification failed." },
    { status: 400 }
  );
}

    // Validate required fields
    if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim() || !message || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required fields." },
        { status: 400 }
      );
    }

    // Attempt to send email and create Zoho CRM lead in parallel
    const emailPromise = sendContactEmail({ name, email, company, phone, service, message });
    const zohoPromise = createZohoLead({ name, email, company, phone, service, message });

    const results = await Promise.allSettled([emailPromise, zohoPromise]);

    const emailResult = results[0];
    const zohoResult = results[1];

    const emailSuccess = emailResult.status === "fulfilled";
    const zohoSuccess = zohoResult.status === "fulfilled";

    // If both integrations failed, return a 500 server error
    if (!emailSuccess && !zohoSuccess) {
      throw new Error(
        `Form submission failed. Email notification and CRM lead creation both failed. Email Error: ${emailResult.reason?.message}. Zoho Error: ${zohoResult.reason?.message}`
      );
    }

    // Return status of both actions (allowing graceful partial successes)
    return NextResponse.json({
      success: true,
      emailSent: emailSuccess,
      zohoCreated: zohoSuccess,
      warnings: {
        email: emailSuccess ? null : emailResult.reason?.message,
        zoho: zohoSuccess ? null : zohoResult.reason?.message,
      },
    });
  } catch (error) {
    console.error("Contact Form Submission API Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during form submission." },
      { status: 500 }
    );
  }
}
