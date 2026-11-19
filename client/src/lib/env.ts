import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z
    .string()
    .url("NEXT_PUBLIC_API_URL must be a valid URL")
    .default("http://localhost:5000/api"),
  // Cloudflare Turnstile official test site key (Always passes: 1x00000000000000000000AA)
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .default("1x00000000000000000000AA"),
});

const clientEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
};

const result = clientEnvSchema.safeParse(clientEnv);

if (!result.success) {
  console.warn("⚠️ Client Environment Warning (using defaults):", result.error.format());
}

export const env = result.success ? result.data : clientEnvSchema.parse({});
