import fs from "fs";
import path from "path";
import { config } from "../config/env";

export type AuditEventType =
  | "login"
  | "login_success"
  | "login_failed"
  | "2fa_verify"
  | "2fa_success"
  | "2fa_failed"
  | "logout"
  | "token_refresh"
  | "token_refresh_failed"
  | "lockout"
  | "submission_view"
  | "submission_delete"
  | "2fa_enroll"
  | "2fa_enrolled"
  | "2fa_reset"
  | "retention_purge";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: AuditEventType;
  result: "success" | "failure";
  adminEmail?: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

function getMonthlyLogPath(): string {
  const now = new Date();
  const yearMonth = now.toISOString().slice(0, 7); // YYYY-MM
  const dir = config.auditLogDir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, `audit-${yearMonth}.log`);
}

function getMainLogPath(): string {
  return path.join(config.auditLogDir, "audit.log");
}

/**
 * Appends an audit event to the append-only JSON Lines log file.
 * Guaranteed never to log sensitive credentials, passwords, raw tokens, or TOTP codes.
 */
export function logAuditEvent(entry: {
  event: AuditEventType;
  result: "success" | "failure";
  adminEmail?: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}): AuditLogEntry {
  // Sanitize details to guarantee zero leakage of credentials
  const sanitizedDetails: Record<string, any> = {};
  if (entry.details && typeof entry.details === "object") {
    const sensitiveKeys = ["password", "token", "code", "secret", "totp", "cookie", "auth"];
    for (const [k, v] of Object.entries(entry.details)) {
      if (!sensitiveKeys.some((s) => k.toLowerCase().includes(s))) {
        sanitizedDetails[k] = v;
      }
    }
  }

  const record: AuditLogEntry = {
    id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    event: entry.event,
    result: entry.result,
    adminEmail: entry.adminEmail,
    ip: entry.ip,
    userAgent: entry.userAgent,
    ...(Object.keys(sanitizedDetails).length > 0 && { details: sanitizedDetails }),
  };

  const line = JSON.stringify(record) + "\n";

  try {
    // 1. Write to monthly log file (rotation)
    fs.appendFileSync(getMonthlyLogPath(), line, "utf8");
    // 2. Append to main audit.log
    fs.appendFileSync(getMainLogPath(), line, "utf8");
  } catch (err) {
    console.error("[AuditService] Failed to write audit log:", err);
  }

  return record;
}

/**
 * Retrieves paginated audit logs in reverse chronological order.
 */
export function getAuditLogs(options: {
  page?: number;
  limit?: number;
  event?: string;
  adminEmail?: string;
}): { logs: AuditLogEntry[]; total: number; page: number; limit: number; totalPages: number } {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));

  const mainPath = getMainLogPath();
  if (!fs.existsSync(mainPath)) {
    return { logs: [], total: 0, page: 1, limit, totalPages: 0 };
  }

  try {
    const fileContent = fs.readFileSync(mainPath, "utf8");
    const lines = fileContent.trim().split("\n").filter(Boolean);

    let parsedEntries: AuditLogEntry[] = [];
    for (const line of lines) {
      try {
        parsedEntries.push(JSON.parse(line));
      } catch (err) {
        // Skip malformed lines
      }
    }

    // Filter if requested
    if (options.event) {
      parsedEntries = parsedEntries.filter((e) => e.event === options.event);
    }
    if (options.adminEmail) {
      parsedEntries = parsedEntries.filter(
        (e) => e.adminEmail?.toLowerCase() === options.adminEmail?.toLowerCase()
      );
    }

    // Sort newest first
    parsedEntries.reverse();

    const total = parsedEntries.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const logs = parsedEntries.slice(start, start + limit);

    return {
      logs,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (err) {
    console.error("[AuditService] Error reading audit logs:", err);
    return { logs: [], total: 0, page: 1, limit, totalPages: 0 };
  }
}

export const getPaginatedAuditLogs = getAuditLogs;
