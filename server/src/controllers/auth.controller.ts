import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config/env";
import {
  findAdminByEmail,
  findAdminById,
  isLockedOut,
  recordFailedAttempt,
  resetFailedAttempts,
  createPreAuthToken,
  createAccessToken,
  createRefreshToken,
  generate2FAEnrollment,
  confirmAndEnable2FA,
  verify2FACodeOrRecovery,
} from "../services/admin.service";
import { logAuditEvent } from "../services/audit.service";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const verify2FASchema = z.object({
  preAuthToken: z.string().min(10),
  code: z.string().min(6),
});

const enable2FASchema = z.object({
  secret: z.string().min(16),
  code: z.string().min(6),
});

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const isProd = config.nodeEnv === "production";

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 mins
    path: "/",
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth",
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid email and password.",
    });
    return;
  }

  const { email, password } = parseResult.data;
  const admin = findAdminByEmail(email);

  if (!admin) {
    logAuditEvent({
      event: "login",
      result: "failure",
      adminEmail: email,
      ip,
      userAgent,
      details: { reason: "User not found" },
    });
    res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
    return;
  }

  if (isLockedOut(admin)) {
    logAuditEvent({
      event: "login",
      result: "failure",
      adminEmail: admin.email,
      ip,
      userAgent,
      details: { reason: "Account locked out" },
    });
    res.status(423).json({
      success: false,
      message: "Account temporarily locked due to multiple failed attempts. Please try again after 15 minutes.",
    });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.passwordHash);
  if (!isPasswordValid) {
    recordFailedAttempt(admin, ip, userAgent);
    logAuditEvent({
      event: "login",
      result: "failure",
      adminEmail: admin.email,
      ip,
      userAgent,
      details: { reason: "Password mismatch" },
    });
    res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
    return;
  }

  // Password correct
  resetFailedAttempts(admin);

  if (admin.twoFactorEnabled) {
    const preAuthToken = createPreAuthToken(admin);
    res.status(200).json({
      success: true,
      requires2FA: true,
      preAuthToken,
    });
    return;
  }

  // 2FA not enabled
  if (config.totp.require2fa) {
    logAuditEvent({
      event: "login",
      result: "failure",
      adminEmail: admin.email,
      ip,
      userAgent,
      details: { reason: "Policy requires 2FA" },
    });
    res.status(403).json({
      success: false,
      message: "Two-factor authentication is required by system policy. Please contact an administrator to enroll.",
    });
    return;
  }

  const accessToken = createAccessToken(admin);
  const refreshToken = createRefreshToken(admin);
  setAuthCookies(res, accessToken, refreshToken);

  logAuditEvent({
    event: "login",
    result: "success",
    adminEmail: admin.email,
    ip,
    userAgent,
    details: { twoFactorEnabled: false },
  });

  res.status(200).json({
    success: true,
    requires2FA: false,
    accessToken,
    admin: {
      id: admin.id,
      email: admin.email,
      twoFactorEnabled: false,
    },
  });
}

export async function verify2FA(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const parseResult = verify2FASchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid 2FA request payload.",
    });
    return;
  }

  const { preAuthToken, code } = parseResult.data;

  let decoded: { sub: string; email: string; role: string };
  try {
    decoded = jwt.verify(preAuthToken, config.jwt.preAuthSecret) as {
      sub: string;
      email: string;
      role: string;
    };
    if (decoded.role !== "pre-auth") {
      throw new Error("Invalid token role");
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Two-factor session expired or invalid. Please log in again.",
    });
    return;
  }

  const admin = findAdminById(decoded.sub);
  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Admin account not found.",
    });
    return;
  }

  if (isLockedOut(admin)) {
    logAuditEvent({
      event: "2fa_verify",
      result: "failure",
      adminEmail: admin.email,
      ip,
      userAgent,
      details: { reason: "Account locked out" },
    });
    res.status(423).json({
      success: false,
      message: "Account temporarily locked due to multiple failed attempts. Please try again later.",
    });
    return;
  }

  const result = verify2FACodeOrRecovery(admin, code);
  if (!result.success) {
    recordFailedAttempt(admin, ip, userAgent);
    logAuditEvent({
      event: "2fa_verify",
      result: "failure",
      adminEmail: admin.email,
      ip,
      userAgent,
      details: { error: result.error },
    });
    res.status(401).json({
      success: false,
      message: result.error || "Invalid 2FA verification code.",
    });
    return;
  }

  // Verification succeeded
  resetFailedAttempts(admin);

  const accessToken = createAccessToken(admin);
  const refreshToken = createRefreshToken(admin);
  setAuthCookies(res, accessToken, refreshToken);

  logAuditEvent({
    event: "2fa_verify",
    result: "success",
    adminEmail: admin.email,
    ip,
    userAgent,
    details: { usedRecoveryCode: result.usedRecoveryCode },
  });

  res.status(200).json({
    success: true,
    usedRecoveryCode: result.usedRecoveryCode,
    accessToken,
    admin: {
      id: admin.id,
      email: admin.email,
      twoFactorEnabled: true,
    },
  });
}

export async function generate2FA(req: Request, res: Response): Promise<void> {
  if (!req.admin) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const admin = findAdminById(req.admin.id);
  if (!admin) {
    res.status(401).json({ success: false, message: "Admin not found" });
    return;
  }

  try {
    const enrollment = await generate2FAEnrollment(admin);
    res.status(200).json({
      success: true,
      secret: enrollment.secret,
      qrCodeUrl: enrollment.qrCodeUrl,
      otpauthUrl: enrollment.otpauthUrl,
    });
  } catch (err: any) {
    console.error("[AuthController] generate2FA error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate two-factor enrollment credentials.",
    });
  }
}

export async function enable2FA(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  if (!req.admin) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const parseResult = enable2FASchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid secret or confirmation code format.",
    });
    return;
  }

  const { secret, code } = parseResult.data;
  const result = confirmAndEnable2FA(req.admin.id, secret, code);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.error || "Failed to confirm 2FA code.",
    });
    return;
  }

  const updatedAdmin = findAdminById(req.admin.id)!;
  const accessToken = createAccessToken(updatedAdmin);
  const refreshToken = createRefreshToken(updatedAdmin);
  setAuthCookies(res, accessToken, refreshToken);

  logAuditEvent({
    event: "2fa_enroll",
    result: "success",
    adminEmail: updatedAdmin.email,
    ip,
    userAgent,
  });

  res.status(200).json({
    success: true,
    message: "Two-factor authentication successfully enabled.",
    recoveryCodes: result.plainRecoveryCodes,
  });
}

export async function refreshToken(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const token = req.cookies?.refresh_token || req.body?.refreshToken;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Refresh token not found.",
    });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwt.refreshSecret) as {
      sub: string;
      email: string;
      role: string;
    };

    const admin = findAdminById(payload.sub);
    if (!admin) {
      throw new Error("Admin not found");
    }

    const newAccessToken = createAccessToken(admin);
    const isProd = config.nodeEnv === "production";
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    logAuditEvent({
      event: "token_refresh",
      result: "failure",
      ip,
      userAgent,
      details: { reason: "Expired or invalid refresh token" },
    });
    res.status(401).json({
      success: false,
      message: "Invalid refresh token. Please log in again.",
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const adminEmail = req.admin?.email;

  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("refresh_token", { path: "/api/auth" });

  if (adminEmail) {
    logAuditEvent({
      event: "logout",
      result: "success",
      adminEmail,
      ip,
      userAgent,
    });
  }

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.admin) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const admin = findAdminById(req.admin.id);
  if (!admin) {
    res.status(401).json({ success: false, message: "Admin not found" });
    return;
  }

  res.status(200).json({
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      twoFactorEnabled: admin.twoFactorEnabled,
      createdAt: admin.createdAt,
    },
  });
}
