import rateLimit from "express-rate-limit";

export const submissionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many submission attempts from this IP. Please try again after 15 minutes.",
  },
});
