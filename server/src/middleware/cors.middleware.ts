import cors from "cors";
import { config } from "../config/environment";

const allowedOrigins = [
  config.clientUrl,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://www.ecogestindia.com",
  "https://ecogestindia.com",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    return callback(new Error("CORS policy violation: origin not allowed"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
