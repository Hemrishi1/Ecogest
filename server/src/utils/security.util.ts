import crypto from "crypto";
import { config } from "../config/env";

/**
 * Strips CR, LF, and control characters to prevent header injection in email & logs.
 */
export function stripHeaderInjection(input?: string): string {
  if (!input) return "";
  // Remove \r, \n, URL-encoded versions (%0D, %0A), and ASCII control characters (0x00 - 0x1F, 0x7F)
  return input
    .replace(/%0[ad]/gi, "")
    .replace(/[\r\n\x00-\x1F\x7F]/g, "")
    .trim();
}

/**
 * Escapes HTML entities to prevent HTML injection / XSS in email bodies.
 */
export function escapeHtml(str?: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Derives a consistent 32-byte key from TOTP_ENCRYPTION_KEY using SHA-256.
 */
function getDerivedKey(): Buffer {
  return crypto.createHash("sha256").update(config.totp.encryptionKey).digest();
}

/**
 * Encrypts a string (e.g. TOTP secret) at rest using AES-256-GCM.
 * Output format: iv:authTag:ciphertext (hex encoded)
 */
export function encryptAES256GCM(plaintext: string): string {
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const key = getDerivedKey();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 */
export function decryptAES256GCM(encryptedPayload: string): string {
  const parts = encryptedPayload.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted payload format");
  }

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const key = getDerivedKey();

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertextHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
