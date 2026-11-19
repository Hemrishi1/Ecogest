import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { logAuditEvent, getAuditLogs } from "../services/audit.service";
import { config } from "../config/env";

describe("Audit Logging Service", () => {
  it("should record audit events without leaking sensitive fields", () => {
    const entry = logAuditEvent({
      event: "login_failed",
      result: "failure",
      adminEmail: "attacker@example.com",
      ip: "127.0.0.1",
      userAgent: "TestAgent/1.0",
      details: {
        reason: "Invalid password",
        password: "SuperSecretPassword123!", // MUST be stripped
        totpToken: "123456", // MUST be stripped
        safeDetail: "Attempt number 3",
      },
    });

    assert.ok(entry.id);
    assert.equal(entry.event, "login_failed");
    assert.equal(entry.result, "failure");
    assert.equal(entry.adminEmail, "attacker@example.com");

    // Check that sensitive fields were stripped
    assert.equal(entry.details?.password, undefined);
    assert.equal(entry.details?.totpToken, undefined);
    assert.equal(entry.details?.safeDetail, "Attempt number 3");
  });

  it("should retrieve paginated audit logs", () => {
    // Write test event
    logAuditEvent({
      event: "2fa_enrolled",
      result: "success",
      adminEmail: "admin@ecogestindia.com",
      ip: "127.0.0.1",
    });

    const result = getAuditLogs({ page: 1, limit: 10 });
    assert.ok(result.logs.length > 0);
    assert.ok(result.total >= 1);
    assert.equal(result.page, 1);
  });
});
