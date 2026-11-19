import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { corsMiddleware } from "./middleware/cors.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import contactRoutes from "./routes/contact.routes";
import quoteRoutes from "./routes/quote.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import { startRetentionSchedule } from "./services/retention.service";

const app = express();

// Disable X-Powered-By
app.disable("x-powered-by");

// Security and parser middleware
app.use(helmet());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Ecogest India API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Central Error Handler
app.use(errorHandler);

// Detect if running inside test runner
const isTestEnvironment =
  process.env.NODE_ENV === "test" ||
  process.argv.some((arg) => arg.includes("test")) ||
  process.execArgv.some((arg) => arg.includes("test"));

if (!isTestEnvironment) {
  startRetentionSchedule();

  app.listen(config.port, () => {
    console.log(`[Ecogest Server] Listening on http://localhost:${config.port}`);
    console.log(`[Ecogest Server] CORS configured for: ${config.clientUrl}`);
  });
}

export default app;
