import fs from "fs";
import path from "path";
import * as tar from "tar";

async function createBackup() {
  const dataDir = path.resolve(__dirname, "../../data");
  const backupDir = path.resolve(__dirname, "../../backups");

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  if (!fs.existsSync(dataDir)) {
    console.warn(`[Backup] Data directory does not exist at ${dataDir}. Nothing to backup.`);
    return;
  }

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    console.warn(`[Backup] No .json files found in ${dataDir}. Nothing to backup.`);
    return;
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .slice(0, 19);

  const archiveFileName = `backup-${timestamp}.tar.gz`;
  const archivePath = path.join(backupDir, archiveFileName);

  console.log(`[Backup] Archiving files from ${dataDir}: ${files.join(", ")}`);

  await tar.create(
    {
      gzip: true,
      file: archivePath,
      cwd: dataDir,
    },
    files
  );

  const stats = fs.statSync(archivePath);
  console.log(`[Backup] Successfully created backup archive:`);
  console.log(`  Path: ${archivePath}`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB`);
}

createBackup().catch((err) => {
  console.error("[Backup] Backup failed:", err);
  process.exit(1);
});
