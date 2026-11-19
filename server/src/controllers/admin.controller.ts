import { Request, Response } from "express";
import fs from "fs";
import { config } from "../config/env";
import { StoredSubmission } from "../services/submission.service";
import { getAuditLogs as fetchAuditLogs, logAuditEvent } from "../services/audit.service";

function readSubmissions(): StoredSubmission[] {
  if (!fs.existsSync(config.dataPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(config.dataPath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("[AdminController] Error reading submissions:", err);
    return [];
  }
}

function writeSubmissions(submissions: StoredSubmission[]): void {
  fs.writeFileSync(config.dataPath, JSON.stringify(submissions, null, 2), "utf8");
}

export async function getSubmissions(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const adminEmail = req.admin?.email;

  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
  const typeFilter = req.query.type as string | undefined;

  let all = readSubmissions();

  if (typeFilter && (typeFilter === "contact" || typeFilter === "quote")) {
    all = all.filter((s) => s.type === typeFilter);
  }

  // Sort descending by submission time
  all.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const total = all.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = all.slice(offset, offset + limit);

  logAuditEvent({
    event: "submission_view",
    result: "success",
    adminEmail,
    ip,
    userAgent,
    details: { page, limit, typeFilter, totalReturned: paginated.length },
  });

  res.status(200).json({
    success: true,
    submissions: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  });
}

export async function deleteSubmission(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const adminEmail = req.admin?.email;
  const { id } = req.params;

  const submissions = readSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    res.status(404).json({
      success: false,
      message: "Submission not found.",
    });
    return;
  }

  const deleted = submissions.splice(index, 1)[0];
  writeSubmissions(submissions);

  logAuditEvent({
    event: "submission_delete",
    result: "success",
    adminEmail,
    ip,
    userAgent,
    details: { submissionId: id, type: deleted.type },
  });

  res.status(200).json({
    success: true,
    message: "Submission deleted successfully.",
  });
}

export async function getAuditLogs(req: Request, res: Response): Promise<void> {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 50));
  const event = req.query.event as string | undefined;

  const result = fetchAuditLogs({ page, limit, event });

  res.status(200).json({
    success: true,
    logs: result.logs,
    pagination: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    },
  });
}
