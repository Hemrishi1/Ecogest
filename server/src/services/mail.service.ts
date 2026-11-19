import nodemailer from "nodemailer";
import { config } from "../config/environment";
import { stripHeaderInjection, escapeHtml } from "../utils/security.util";

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
  // Sanitize headers against CRLF injection
  const cleanName = stripHeaderInjection(contactData.name);
  const cleanEmail = stripHeaderInjection(contactData.email);
  const cleanSubject = stripHeaderInjection(contactData.subject || "General Inquiry");
  const cleanCompany = stripHeaderInjection(contactData.company || "N/A");
  const cleanPhone = stripHeaderInjection(contactData.phone);

  const mailer = getTransporter();
  if (!mailer) {
    console.log(
      `[MailService] Simulation: Contact email from ${cleanName} <${cleanEmail}> - "${cleanSubject}"`
    );
    return true;
  }

  const mailOptions = {
    from: config.smtp.from,
    to: config.smtp.to,
    replyTo: cleanEmail,
    subject: `[Ecogest India Contact] ${cleanSubject} from ${cleanName}`,
    html: `
      <h2>New Contact Form Submission - Ecogest India</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(cleanCompany)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-line;">${escapeHtml(contactData.message)}</p>
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
  // Sanitize headers against CRLF injection
  const cleanName = stripHeaderInjection(quoteData.name);
  const cleanCompany = stripHeaderInjection(quoteData.company);
  const cleanEmail = stripHeaderInjection(quoteData.email);
  const cleanPhone = stripHeaderInjection(quoteData.phone);
  const cleanProduct = stripHeaderInjection(quoteData.productInterest);
  const cleanQuantity = stripHeaderInjection(quoteData.quantity || "N/A");

  const mailer = getTransporter();
  if (!mailer) {
    console.log(
      `[MailService] Simulation: Quote email from ${cleanName} (${cleanCompany}) - Interest: ${cleanProduct}`
    );
    return true;
  }

  const mailOptions = {
    from: config.smtp.from,
    to: config.smtp.to,
    replyTo: cleanEmail,
    subject: `[Ecogest India Quote Request] ${cleanCompany} - ${cleanProduct}`,
    html: `
      <h2>New Quote Request - Ecogest India</h2>
      <p><strong>Contact Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Company:</strong> ${escapeHtml(cleanCompany)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
      <p><strong>Product Interest:</strong> ${escapeHtml(cleanProduct)}</p>
      <p><strong>Estimated Quantity:</strong> ${escapeHtml(cleanQuantity)}</p>
      <hr />
      <h3>Project Specifications:</h3>
      <p style="white-space: pre-line;">${escapeHtml(quoteData.message)}</p>
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
