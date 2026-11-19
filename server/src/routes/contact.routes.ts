import { Router } from "express";
import { handleContactSubmission } from "../controllers/contact.controller";
import { validateBody, contactSchema } from "../middleware/validation.middleware";
import { submissionRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/", submissionRateLimiter, validateBody(contactSchema), handleContactSubmission);

export default router;
