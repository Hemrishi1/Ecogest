import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { findAdminById } from "../services/admin.service";

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Extract token from cookie or Authorization header
  let token: string | undefined = req.cookies?.access_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as {
      sub: string;
      email: string;
      role: string;
      twoFactorEnabled: boolean;
    };

    if (payload.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions.",
      });
      return;
    }

    const admin = findAdminById(payload.sub);
    if (!admin) {
      res.status(401).json({
        success: false,
        message: "User session is no longer valid.",
      });
      return;
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: "admin",
      twoFactorEnabled: admin.twoFactorEnabled,
    };

    next();
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: "Session expired or invalid token. Please log in again.",
    });
  }
}
