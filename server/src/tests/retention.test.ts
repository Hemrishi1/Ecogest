import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { config } from "../config/env";
import { purgeOldSubmissions } from "../services/retention.service";
import { saveSubmission } from "../services/submission.service";

describe("Data Retention Service", () => {
  it("should purge submissions older than retention days and preserve recent ones", () => {
    // 1. Insert a mock old submission (e.g. 400 days old)
    const oldDate = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();
    const recentDate = new Date().toISOString();

    let existing: any[] = [];
    if (fs.existsSync(config.dataPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(config.dataPath, "utf8") || "[]");
      } catch {
        existing = [];
      }
    }

    const testOld = {
      id: "sub_test_old",
      type: "contact",
      submittedAt: oldDate,
      data: { name: "Ancient Lead", email: "old@example.com" },
    };

    const testRecent = {
      id: "sub_test_recent",
      type: "quote",
      submittedAt: recentDate,
      data: { name: "Recent Lead", email: "recent@example.com" },
    };

    fs.writeFileSync(
      config.dataPath,
      JSON.stringify([...existing, testOld, testRecent], null, 2),
      "utf8"
    );

    // 2. Run purge
    const purged = purgeOldSubmissions();
    assert.ok(purged >= 1, "Should have purged at least the 400-day-old submission");

    // 3. Verify
    const updated = JSON.parse(fs.readFileSync(config.dataPath, "utf8"));
    const oldFound = updated.find((s: any) => s.id === "sub_test_old");
    const recentFound = updated.find((s: any) => s.id === "sub_test_recent");

    assert.equal(oldFound, undefined, "Old submission should have been purged");
    assert.ok(recentFound, "Recent submission must be retained");

    // Clean up test recent entry
    const cleaned = updated.filter((s: any) => s.id !== "sub_test_recent");
    fs.writeFileSync(config.dataPath, JSON.stringify(cleaned, null, 2), "utf8");
  });
});
