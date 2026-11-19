import { Router } from "express";
import {
  login,
  verify2FA,
  generate2FA,
  enable2FA,
  refreshToken,
  logout,
  getMe,
} from "../controllers/auth.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";
import { adminCsrfGuard } from "../middleware/csrf.middleware";
import { authRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/login", authRateLimiter, adminCsrfGuard, login);
router.post("/2fa/verify", authRateLimiter, adminCsrfGuard, verify2FA);
router.post("/2fa/generate", authenticateAdmin, adminCsrfGuard, generate2FA);
router.post("/2fa/enable", authenticateAdmin, adminCsrfGuard, enable2FA);
router.post("/refresh", adminCsrfGuard, refreshToken);
router.post("/logout", adminCsrfGuard, logout);
router.get("/me", authenticateAdmin, getMe);

export default router;
