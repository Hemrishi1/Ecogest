import { Request, Response } from "express";
import { saveSubmission } from "../services/submission.service";
import { sendContactNotification } from "../services/mail.service";

export async function handleContactSubmission(req: Request, res: Response) {
  try {
    const contactData = req.body;
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    // 1. Save submission to server/data/submissions.json
    const submission = saveSubmission("contact", contactData, ip, userAgent);

    // 2. Dispatch email notification via Nodemailer (non-blocking failure safe)
    await sendContactNotification(contactData);

    return res.status(200).json({
      success: true,
      message: "Your message has been received. Our team will contact you shortly.",
      submissionId: submission.id,
    });
  } catch (err: any) {
    console.error("[ContactController] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to process your request. Please try again later.",
    });
  }
}
