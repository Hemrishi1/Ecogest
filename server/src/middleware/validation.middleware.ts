import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

function sanitizeString(str?: string): string {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters").max(25),
  company: z.string().max(100).optional(),
  subject: z.string().max(150).optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to submit this inquiry.",
  }),
  turnstileToken: z.string().optional(),
  honeypot: z.string().optional(),
  website_hp: z.string().optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters").max(25),
  productInterest: z.string().min(2, "Product interest is required").max(150),
  quantity: z.string().max(100).optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to submit this quote request.",
  }),
  turnstileToken: z.string().optional(),
  honeypot: z.string().optional(),
  website_hp: z.string().optional(),
});

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Sanitize string inputs (except security tokens and honeypots)
    if (req.body && typeof req.body === "object") {
      for (const key of Object.keys(req.body)) {
        if (typeof req.body[key] === "string" && key !== "turnstileToken") {
          req.body[key] = sanitizeString(req.body[key]);
        }
      }
    }

    const result = schema.safeParse(req.body);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path.join(".");
        fieldErrors[field] = err.message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed. Please verify the submitted information.",
        errors: fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
}
