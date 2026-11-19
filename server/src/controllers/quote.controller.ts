import { Request, Response } from "express";
import { saveSubmission } from "../services/submission.service";
import { sendQuoteNotification } from "../services/mail.service";

export async function handleQuoteSubmission(req: Request, res: Response) {
  try {
    const quoteData = req.body;
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    // 1. Save submission to server/data/submissions.json
    const submission = saveSubmission("quote", quoteData, ip, userAgent);

    // 2. Dispatch email notification via Nodemailer (non-blocking failure safe)
    await sendQuoteNotification(quoteData);

    return res.status(200).json({
      success: true,
      message: "Your quote request has been submitted successfully. Our team will contact you with pricing.",
      submissionId: submission.id,
    });
  } catch (err: any) {
    console.error("[QuoteController] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to process quote request. Please try again later.",
    });
  }
}
