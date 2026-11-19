import { Router } from "express";
import { handleQuoteSubmission } from "../controllers/quote.controller";
import { validateBody, quoteSchema } from "../middleware/validation.middleware";
import { submissionRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/", submissionRateLimiter, validateBody(quoteSchema), handleQuoteSubmission);

export default router;
