import fs from "fs";
import path from "path";
import { config } from "../config/environment";

export interface StoredSubmission {
  id: string;
  type: "contact" | "quote";
  submittedAt: string;
  data: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export function saveSubmission(
  type: "contact" | "quote",
  data: Record<string, any>,
  ip?: string,
  userAgent?: string
): StoredSubmission {
  const dir = path.dirname(config.dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let submissions: StoredSubmission[] = [];
  if (fs.existsSync(config.dataPath)) {
    try {
      const content = fs.readFileSync(config.dataPath, "utf-8");
      submissions = JSON.parse(content || "[]");
    } catch (err) {
      console.error("Error reading submissions.json, starting fresh array:", err);
      submissions = [];
    }
  }

  const newEntry: StoredSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    type,
    submittedAt: new Date().toISOString(),
    data,
    ip,
    userAgent,
  };

  submissions.push(newEntry);

  try {
    fs.writeFileSync(config.dataPath, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to submissions.json:", err);
  }

  return newEntry;
}
