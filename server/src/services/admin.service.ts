import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticator } from "otplib";
import qrcode from "qrcode";
import crypto from "crypto";
import { config } from "../config/env";
import { encryptAES256GCM, decryptAES256GCM } from "../utils/security.util";
import { logAuditEvent } from "./audit.service";

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  twoFactorEnabled: boolean;
  twoFactorSecretEncrypted?: string;
  recoveryCodesHashed?: string[];
  lastTotpWindow?: number;
  failedLoginAttempts: number;
  lockoutUntil?: string | null;
  createdAt: string;
  updatedAt: string;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function getAdminsFilePath(): string {
  const dir = path.dirname(config.adminsPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return config.adminsPath;
}

function loadAdmins(): AdminUser[] {
  const filePath = getAdminsFilePath();
  if (!fs.existsSync(filePath)) {
    // Seed default admin account
    const defaultPassword = "EcogestAdmin2026!";
    const defaultAdmin: AdminUser = {
      id: "admin_root_1",
      email: "admin@ecogestindia.com",
      passwordHash: bcrypt.hashSync(defaultPassword, 10),
      twoFactorEnabled: false,
      failedLoginAttempts: 0,
      lockoutUntil: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(filePath, JSON.stringify([defaultAdmin], null, 2), "utf8");
    console.log(`[AdminService] Initialized default admin account: ${defaultAdmin.email}`);
    return [defaultAdmin];
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("[AdminService] Error reading admins.json:", err);
    return [];
  }
}

function saveAdmins(admins: AdminUser[]): void {
  const filePath = getAdminsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(admins, null, 2), "utf8");
}

export function findAdminByEmail(email: string): AdminUser | undefined {
  const admins = loadAdmins();
  return admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export function findAdminById(id: string): AdminUser | undefined {
  const admins = loadAdmins();
  return admins.find((a) => a.id === id);
}

export function isLockedOut(admin: AdminUser): boolean {
  if (!admin.lockoutUntil) return false;
  return new Date(admin.lockoutUntil).getTime() > Date.now();
}

export function recordFailedAttempt(admin: AdminUser, ip?: string, ua?: string): void {
  const admins = loadAdmins();
  const target = admins.find((a) => a.id === admin.id);
  if (!target) return;

  target.failedLoginAttempts = (target.failedLoginAttempts || 0) + 1;
  target.updatedAt = new Date().toISOString();

  if (target.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
    target.lockoutUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
    logAuditEvent({
      event: "lockout",
      result: "failure",
      adminEmail: target.email,
      ip,
      userAgent: ua,
      details: { reason: "Exceeded maximum failed authentication attempts" },
    });
  }

  saveAdmins(admins);
}

export function resetFailedAttempts(admin: AdminUser): void {
  const admins = loadAdmins();
  const target = admins.find((a) => a.id === admin.id);
  if (!target) return;

  target.failedLoginAttempts = 0;
  target.lockoutUntil = null;
  target.updatedAt = new Date().toISOString();
  saveAdmins(admins);
}

// Token generation helpers
export function createPreAuthToken(admin: AdminUser): string {
  return jwt.sign(
    { sub: admin.id, email: admin.email, role: "pre-auth" },
    config.jwt.preAuthSecret,
    { expiresIn: "5m" }
  );
}

export function createAccessToken(admin: AdminUser): string {
  return jwt.sign(
    { sub: admin.id, email: admin.email, role: "admin", twoFactorEnabled: admin.twoFactorEnabled },
    config.jwt.accessSecret,
    { expiresIn: "15m" }
  );
}

export function createRefreshToken(admin: AdminUser): string {
  return jwt.sign(
    { sub: admin.id, email: admin.email, role: "admin" },
    config.jwt.refreshSecret,
    { expiresIn: "7d" }
  );
}

// 2FA Generation & Setup
export async function generate2FAEnrollment(admin: AdminUser): Promise<{
  secret: string;
  qrCodeUrl: string;
  otpauthUrl: string;
}> {
  const secret = authenticator.generateSecret();
  const serviceName = "Ecogest India Admin";
  const otpauthUrl = authenticator.keyuri(admin.email, serviceName, secret);
  const qrCodeUrl = await qrcode.toDataURL(otpauthUrl);

  return { secret, qrCodeUrl, otpauthUrl };
}

export function generateRecoveryCodes(): { plainCodes: string[]; hashedCodes: string[] } {
  const plainCodes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < 10; i++) {
    const raw = crypto.randomBytes(5).toString("hex").toUpperCase();
    const formatted = `ECO-${raw.slice(0, 5)}-${raw.slice(5)}`;
    plainCodes.push(formatted);
    hashedCodes.push(bcrypt.hashSync(formatted, 10));
  }

  return { plainCodes, hashedCodes };
}

export function confirmAndEnable2FA(
  adminId: string,
  secret: string,
  totpCode: string
): { success: boolean; plainRecoveryCodes?: string[]; error?: string } {
  const isValid = authenticator.verify({ token: totpCode, secret });
  if (!isValid) {
    return { success: false, error: "Invalid 6-digit confirmation code. Please try again." };
  }

  const admins = loadAdmins();
  const target = admins.find((a) => a.id === adminId);
  if (!target) return { success: false, error: "Admin not found" };

  const { plainCodes, hashedCodes } = generateRecoveryCodes();
  const encryptedSecret = encryptAES256GCM(secret);

  target.twoFactorEnabled = true;
  target.twoFactorSecretEncrypted = encryptedSecret;
  target.recoveryCodesHashed = hashedCodes;
  target.lastTotpWindow = Math.floor(Date.now() / 30000);
  target.updatedAt = new Date().toISOString();

  saveAdmins(admins);

  return { success: true, plainRecoveryCodes: plainCodes };
}

export function verify2FACodeOrRecovery(
  admin: AdminUser,
  inputCode: string
): { success: boolean; usedRecoveryCode?: boolean; error?: string } {
  const code = inputCode.trim();
  const currentWindow = Math.floor(Date.now() / 30000);

  // 1. Check if 6-digit TOTP
  if (/^\d{6}$/.test(code)) {
    if (!admin.twoFactorSecretEncrypted) {
      return { success: false, error: "2FA secret not configured" };
    }

    // Single-use enforcement per TOTP time window (prevent replay)
    if (admin.lastTotpWindow === currentWindow) {
      return { success: false, error: "This TOTP code has already been used. Please wait for the next code." };
    }

    try {
      const secret = decryptAES256GCM(admin.twoFactorSecretEncrypted);
      const isValid = authenticator.verify({ token: code, secret });
      if (!isValid) {
        return { success: false, error: "Invalid two-factor authentication code." };
      }

      // Update lastTotpWindow
      const admins = loadAdmins();
      const target = admins.find((a) => a.id === admin.id);
      if (target) {
        target.lastTotpWindow = currentWindow;
        saveAdmins(admins);
      }

      return { success: true, usedRecoveryCode: false };
    } catch (err) {
      console.error("[AdminService] Decryption or TOTP verification failed:", err);
      return { success: false, error: "Two-factor verification error." };
    }
  }

  // 2. Check if recovery code
  if (admin.recoveryCodesHashed && admin.recoveryCodesHashed.length > 0) {
    const admins = loadAdmins();
    const target = admins.find((a) => a.id === admin.id);
    if (!target || !target.recoveryCodesHashed) {
      return { success: false, error: "No recovery codes available." };
    }

    for (let i = 0; i < target.recoveryCodesHashed.length; i++) {
      const hash = target.recoveryCodesHashed[i];
      if (bcrypt.compareSync(code, hash)) {
        // Recovery code matched: consume it (one-time use)
        target.recoveryCodesHashed.splice(i, 1);
        target.updatedAt = new Date().toISOString();
        saveAdmins(admins);
        return { success: true, usedRecoveryCode: true };
      }
    }
  }

  return { success: false, error: "Invalid two-factor code or recovery code." };
}

export function disable2FAForAdmin(adminEmail: string): boolean {
  const admins = loadAdmins();
  const target = admins.find((a) => a.email.toLowerCase() === adminEmail.toLowerCase());
  if (!target) return false;

  target.twoFactorEnabled = false;
  target.twoFactorSecretEncrypted = undefined;
  target.recoveryCodesHashed = undefined;
  target.lastTotpWindow = undefined;
  target.updatedAt = new Date().toISOString();

  saveAdmins(admins);
  return true;
}
