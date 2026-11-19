import nodemailer from "nodemailer";
import { config } from "../config/environment";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  if (!config.smtp.user || !config.smtp.pass) {
    console.warn(
      "[MailService] No SMTP user/pass configured in .env. Form submissions will still be saved to server/data/submissions.json."
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  return transporter;
}

export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer) {
    console.log(
      `[MailService] Simulation: Contact email from ${contactData.name} <${contactData.email}> - "${contactData.subject || "General Inquiry"}"`
    );
    return true;
  }

  const mailOptions = {
    from: config.smtp.from,
    to: config.smtp.to,
    replyTo: contactData.email,
    subject: `[Ecogest India Contact] ${contactData.subject || "New Inquiry from " + contactData.name}`,
    html: `
      <h2>New Contact Form Submission - Ecogest India</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Company:</strong> ${contactData.company || "N/A"}</p>
      <p><strong>Subject:</strong> ${contactData.subject || "N/A"}</p>
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-line;">${contactData.message}</p>
    `,
  };

  try {
    await mailer.sendMail(mailOptions);
    console.log(`[MailService] Contact notification email sent successfully.`);
    return true;
  } catch (err) {
    console.error("[MailService] Failed to send email:", err);
    return false;
  }
}

export async function sendQuoteNotification(quoteData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity?: string;
  message: string;
}): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer) {
    console.log(
      `[MailService] Simulation: Quote email from ${quoteData.name} (${quoteData.company}) - Interest: ${quoteData.productInterest}`
    );
    return true;
  }

  const mailOptions = {
    from: config.smtp.from,
    to: config.smtp.to,
    replyTo: quoteData.email,
    subject: `[Ecogest India Quote Request] ${quoteData.company} - ${quoteData.productInterest}`,
    html: `
      <h2>New Quote Request - Ecogest India</h2>
      <p><strong>Contact Name:</strong> ${quoteData.name}</p>
      <p><strong>Company:</strong> ${quoteData.company}</p>
      <p><strong>Email:</strong> ${quoteData.email}</p>
      <p><strong>Phone:</strong> ${quoteData.phone}</p>
      <p><strong>Product Interest:</strong> ${quoteData.productInterest}</p>
      <p><strong>Estimated Quantity:</strong> ${quoteData.quantity || "N/A"}</p>
      <hr />
      <h3>Project Specifications:</h3>
      <p style="white-space: pre-line;">${quoteData.message}</p>
    `,
  };

  try {
    await mailer.sendMail(mailOptions);
    console.log(`[MailService] Quote notification email sent successfully.`);
    return true;
  } catch (err) {
    console.error("[MailService] Failed to send quote email:", err);
    return false;
  }
}
