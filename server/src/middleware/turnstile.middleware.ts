import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export async function verifyTurnstileAndHoneypot(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Honeypot check: If hidden honeypot is filled, silently discard and return fake success
  const honeypot = req.body?.honeypot || req.body?.website_hp;
  if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
    console.warn(`[BotProtection] Honeypot triggered from IP: ${req.ip}. Silently discarding.`);
    return res.status(200).json({
      success: true,
      message: "Your submission has been received. Our team will contact you shortly.",
    });
  }

  // 2. Turnstile token check
  const token = req.body?.turnstileToken || req.body?.["cf-turnstile-response"];

  if (!token || typeof token !== "string" || token.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Security verification token is missing. Please complete the verification challenge.",
    });
  }

  // Offline / Test mock evaluation for Cloudflare dummy test keys
  if (config.nodeEnv === "test" || config.nodeEnv === "development") {
    if (token === "1x00000000000000000000AA" || token.startsWith("1x") || token === "pass") {
      return next();
    }
    if (token.startsWith("2x") || token.startsWith("INVALID")) {
      return res.status(400).json({
        success: false,
        message: "Security verification challenge failed. Please refresh and try again.",
        errors: { turnstile: "Verification failed" },
      });
    }
  }

  // Cloudflare siteverify API verification
  try {
    const formData = new URLSearchParams();
    formData.append("secret", config.turnstile.secretKey);
    formData.append("response", token);
    const clientIp = (req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress) as string;
    if (clientIp) {
      formData.append("remoteip", clientIp);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const cfResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    const cfData: any = await cfResponse.json();

    if (!cfData.success) {
      console.warn(`[Turnstile] Verification failed:`, cfData["error-codes"]);
      return res.status(400).json({
        success: false,
        message: "Security verification challenge failed. Please refresh and try again.",
        errors: { turnstile: "Verification failed" },
      });
    }

    // Token verified successfully
    next();
  } catch (err: any) {
    console.error("[Turnstile] Error verifying token with Cloudflare API:", err);
    // In local development or network failure with test keys, fail open only in dev
    if (config.nodeEnv === "development" && config.turnstile.secretKey.startsWith("1x")) {
      console.warn("[Turnstile] Bypassing verification network error in development with test key.");
      return next();
    }
    return res.status(500).json({
      success: false,
      message: "Unable to verify security challenge at this time. Please try again later.",
    });
  }
}
