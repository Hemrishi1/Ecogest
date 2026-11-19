import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const serverEnvSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL").default("http://localhost:3000"),
  
  // JWT & Encryption secrets (minimum 32 characters for security)
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters long")
    .default("ecogest_access_secret_production_ready_min_32_chars_2026"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters long")
    .default("ecogest_refresh_secret_production_ready_min_32_chars_2026"),
  JWT_PREAUTH_SECRET: z
    .string()
    .min(32, "JWT_PREAUTH_SECRET must be at least 32 characters long")
    .default("ecogest_preauth_secret_production_ready_min_32_chars_2026"),
  TOTP_ENCRYPTION_KEY: z
    .string()
    .min(32, "TOTP_ENCRYPTION_KEY must be at least 32 characters long for AES-256")
    .default("ecogest_totp_encryption_key_256_bit_secure_32_chars"),
  
  // Cloudflare Turnstile Secret Key (default official test key: always passes)
  TURNSTILE_SECRET_KEY: z
    .string()
    .default("1x0000000000000000000000000000000AA"),
  
  // 2FA Enforcement
  REQUIRE_2FA: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1")
    .default("false"),
  
  // Data Retention in Days
  RETENTION_DAYS: z.coerce.number().min(1).default(365),
  
  // Nodemailer SMTP
  SMTP_HOST: z.string().default("smtp.example.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((val) => val === "true")
    .default("false"),
  SMTP_USER: z.string().default(""),
  SMTP_PASS: z.string().default(""),
  EMAIL_FROM: z.string().default('"Ecogest India" <noreply@ecogestindia.com>'),
  EMAIL_TO: z.string().email().default("kanhaiya.mali@ecogestindia.com"),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ FATAL: Server Environment Configuration Validation Failed:");
  result.error.errors.forEach((err) => {
    console.error(`  - ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

export const env = result.data;

export const config = {
  port: env.PORT,
  clientUrl: env.CLIENT_URL,
  nodeEnv: env.NODE_ENV,
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    preAuthSecret: env.JWT_PREAUTH_SECRET,
    accessExpiresIn: "15m",
    refreshExpiresIn: "7d",
    preAuthExpiresIn: "5m",
  },
  totp: {
    encryptionKey: env.TOTP_ENCRYPTION_KEY,
    require2fa: env.REQUIRE_2FA,
  },
  turnstile: {
    secretKey: env.TURNSTILE_SECRET_KEY,
  },
  retentionDays: env.RETENTION_DAYS,
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.EMAIL_FROM,
    to: env.EMAIL_TO,
  },
  dataPath: path.resolve(__dirname, "../../data/submissions.json"),
  adminsPath: path.resolve(__dirname, "../../data/admins.json"),
  auditLogDir: path.resolve(__dirname, "../../data"),
  backupDir: path.resolve(__dirname, "../../backups"),
};
