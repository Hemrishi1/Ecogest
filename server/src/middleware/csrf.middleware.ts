import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

const stateChangingMethods = ["POST", "PUT", "PATCH", "DELETE"];

const allowedOrigins = [
  config.clientUrl,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://www.ecogestindia.com",
  "https://ecogestindia.com",
];

export function adminCsrfGuard(req: Request, res: Response, next: NextFunction) {
  // Only protect state-changing requests
  if (!stateChangingMethods.includes(req.method)) {
    return next();
  }

  // 1. Require custom header X-Requested-With: ecogest-admin
  const requestedWith = req.headers["x-requested-with"];
  if (!requestedWith || requestedWith.toString().toLowerCase() !== "ecogest-admin") {
    return res.status(403).json({
      success: false,
      message: "CSRF protection: request rejected. Required security header missing or invalid.",
    });
  }

  // 2. Origin / Referer check
  const origin = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer).origin : undefined);
  if (origin) {
    const isAllowed = allowedOrigins.some((allowed) => {
      try {
        return new URL(allowed).origin === new URL(origin).origin;
      } catch {
        return false;
      }
    });

    if (!isAllowed && config.nodeEnv === "production") {
      return res.status(403).json({
        success: false,
        message: "CSRF protection: request rejected. Untrusted request origin.",
      });
    }
  }

  next();
}
