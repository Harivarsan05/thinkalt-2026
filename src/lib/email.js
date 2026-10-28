import nodemailer from "nodemailer";

/**
 * Sends a contact form submission email to hello@thinkalternate.com.
 *
 * @param {Object} params
 * @param {string} params.name - User's name
 * @param {string} params.email - User's email address
 * @param {string} params.company - User's company (optional)
 * @param {string} params.phone - User's phone number
 * @param {string} params.service - Requested service
 * @param {string} params.message - Message/Comments
 * @returns {Promise<any>} Resolves with nodemailer send info or mock data
 */
export async function sendContactEmail({
  name,
  email,
  company,
  phone,
  service,
  message,
}) {
  console.log("HOST =", process.env.SMTP_HOST);
  console.log("USER =", process.env.SMTP_USER);
  console.log("PASS =", process.env.SMTP_PASS ? "FOUND" : "NOT FOUND");
  console.log("SITE KEY =", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = process.env.SMTP_SECURE === "true"; // true for port 465, false for other ports
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "hello@thinkalternate.com";
  const to = process.env.EMAIL_TO || "hello@thinkalternate.com";

  const mailOptions = {
    from: `"${name}" <${from}>`,
    replyTo: email,
    to,
    subject: `New Contact Form Submission: ${name} (${service})`,
    text: `
You have received a new contact form submission.

Details:
------------------------------------------
Name: ${name}
Email: ${email}
Company: ${company || "Not Provided"}
Phone: ${phone}
Requested Service: ${service}

Message:
------------------------------------------
${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #7c3aed; margin-top: 0; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">New Lead Notification</h2>
        <p>You have received a new contact form submission.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; width: 30%; border-bottom: 1px solid #eee;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Not Provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Service:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
          </tr>
        </table>
        
        <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-style: italic; border-left: 4px solid #7c3aed;">
${message}
        </div>
        
        <div style="margin-top: 25px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
          This email was generated automatically by the ThinkAlternate website.
        </div>
      </div>
    `,
  };

  if (!host || !user || !pass) {
    console.warn(
      "SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not fully configured in environment variables. Email notification will be simulated."
    );
    console.log("--------------------------------------------------");
    console.log(`[SIMULATED EMAIL SENT TO ${to}]:`);
    console.log(`From: ${mailOptions.from}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Details:`, { name, email, company, phone, service, message });
    console.log("--------------------------------------------------");
    return { mock: true, messageId: "mock-message-id" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return transporter.sendMail(mailOptions);
}
