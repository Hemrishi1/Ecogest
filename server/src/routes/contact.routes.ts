import { Router } from "express";
import { handleContactSubmission } from "../controllers/contact.controller";
import { validateBody, contactSchema } from "../middleware/validation.middleware";
import { submissionRateLimiter } from "../middleware/rateLimit.middleware";
import { verifyTurnstileAndHoneypot } from "../middleware/turnstile.middleware";

const router = Router();

router.post(
  "/",
  submissionRateLimiter,
  verifyTurnstileAndHoneypot,
  validateBody(contactSchema),
  handleContactSubmission
);

export default router;
