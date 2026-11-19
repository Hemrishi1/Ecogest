import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Always log full error server-side
  console.error("[ServerError]", {
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    message: err?.message,
    stack: err?.stack,
  });

  const status = typeof err.status === "number" ? err.status : typeof err.statusCode === "number" ? err.statusCode : 500;
  
  // In production, do not leak error details or system paths for 5xx errors
  let clientMessage = err.message || "An unexpected internal server error occurred.";
  if (config.nodeEnv === "production" && status >= 500) {
    clientMessage = "An unexpected internal server error occurred. Please try again later.";
  }

  res.status(status).json({
    success: false,
    message: clientMessage,
    ...(config.nodeEnv !== "production" && { stack: err.stack }),
  });
}
