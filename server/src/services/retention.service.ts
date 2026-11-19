import fs from "fs";
import cron from "node-cron";
import { config } from "../config/env";
import { StoredSubmission } from "./submission.service";
import { logAuditEvent } from "./audit.service";

export function purgeOldSubmissions(): number {
  if (!fs.existsSync(config.dataPath)) {
    return 0;
  }

  let submissions: StoredSubmission[] = [];
  try {
    const raw = fs.readFileSync(config.dataPath, "utf8");
    submissions = JSON.parse(raw || "[]");
  } catch (err) {
    console.error("[RetentionService] Failed to read submissions:", err);
    return 0;
  }

  if (submissions.length === 0) {
    return 0;
  }

  const retentionMs = config.retentionDays * 24 * 60 * 60 * 1000;
  const cutoffTime = Date.now() - retentionMs;
  const cutoffDate = new Date(cutoffTime).toISOString();

  const retained = submissions.filter((s) => {
    const submittedTime = new Date(s.submittedAt).getTime();
    return submittedTime >= cutoffTime;
  });

  const purgedCount = submissions.length - retained.length;

  if (purgedCount > 0) {
    try {
      fs.writeFileSync(config.dataPath, JSON.stringify(retained, null, 2), "utf8");
      logAuditEvent({
        event: "retention_purge",
        result: "success",
        details: {
          purgedCount,
          retainedCount: retained.length,
          retentionDays: config.retentionDays,
          cutoffDate,
        },
      });
      console.log(
        `[RetentionService] Purged ${purgedCount} submission(s) older than ${config.retentionDays} days (before ${cutoffDate}).`
      );
    } catch (err) {
      console.error("[RetentionService] Failed to write retained submissions:", err);
    }
  }

  return purgedCount;
}

export function startRetentionSchedule(): void {
  // Run once daily at 00:00 (midnight)
  cron.schedule("0 0 * * *", () => {
    console.log("[RetentionService] Executing daily data retention purge check...");
    purgeOldSubmissions();
  });

  // Run initial check on server startup
  setTimeout(() => {
    purgeOldSubmissions();
  }, 5000);

  console.log(`[RetentionService] Scheduled daily retention check (retention: ${config.retentionDays} days).`);
}
