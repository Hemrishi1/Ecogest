import express from "express";
import helmet from "helmet";
import { config } from "./config/environment";
import { corsMiddleware } from "./middleware/cors.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import contactRoutes from "./routes/contact.routes";
import quoteRoutes from "./routes/quote.routes";

const app = express();

// Security and middleware
app.use(helmet());
app.use(corsMiddleware);
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

// Central Error Handler
app.use(errorHandler);

// Server start
app.listen(config.port, () => {
  console.log(`[Ecogest Server] Listening on http://localhost:${config.port}`);
  console.log(`[Ecogest Server] CORS configured for: ${config.clientUrl}`);
});

export default app;
