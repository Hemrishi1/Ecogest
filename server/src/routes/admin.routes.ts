import { Router } from "express";
import {
  getSubmissions,
  deleteSubmission,
  getAuditLogs,
} from "../controllers/admin.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";
import { adminCsrfGuard } from "../middleware/csrf.middleware";

const router = Router();

router.use(authenticateAdmin);

router.get("/submissions", getSubmissions);
router.delete("/submissions/:id", adminCsrfGuard, deleteSubmission);
router.get("/audit", getAuditLogs);

export default router;
