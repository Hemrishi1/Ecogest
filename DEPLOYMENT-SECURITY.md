# Production Deployment & Security Checklist

This document details critical pre-launch actions and operational procedures for securing the Ecogest India website and backend services in a production environment.

---

## 1. Environment Secrets Rotation

Prior to deploying to production, generate secure, cryptographically random strings (at least 32 characters) for all secrets:

```bash
# Example generation via OpenSSL:
openssl rand -base64 32
```

Configure these values in the production `.env` file:
- `JWT_ACCESS_SECRET` (minimum 32 characters)
- `JWT_REFRESH_SECRET` (minimum 32 characters)
- `JWT_PREAUTH_SECRET` (minimum 32 characters)
- `TOTP_ENCRYPTION_KEY` (minimum 32 characters, used for AES-256-GCM encryption of TOTP secrets)

> **WARNING:** The startup validator (`server/src/config/env.ts`) will intentionally fail and halt the server if any of these secrets are shorter than 32 characters.

---

## 2. Cloudflare Turnstile Setup

In development, official Cloudflare dummy test keys are configured (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`).

For production:
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Turnstile**.
2. Create a new Turnstile widget:
   - **Domain:** `ecogestindia.com` (and `www.ecogestindia.com`)
   - **Mode:** Managed (recommended)
3. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `client/.env.production`.
4. Set `TURNSTILE_SECRET_KEY` in `server/.env`.

---

## 3. Initial Admin Account & Password Change

The default administrative seed credentials are:
- **Email:** `admin@ecogestindia.com`
- **Initial Password:** `EcogestAdmin2026!`

### Steps immediately after first deployment:
1. Navigate to `/admin/login`.
2. Sign in with the temporary seed credentials.
3. Immediately navigate to `/admin/security` and complete **Two-Factor Authentication (2FA)** enrollment.
4. Save the 10 one-time recovery codes in a secure password manager (e.g. 1Password or Bitwarden).
5. Set `REQUIRE_2FA=true` in `server/.env` to strictly enforce 2FA across all admin logins.

### Emergency 2FA Reset CLI:
If administrative access to an authenticator app is lost and all recovery codes are exhausted, run the recovery CLI directly on the server:
```bash
npm run reset-2fa --workspace=server -- --email=admin@ecogestindia.com
```

---

## 4. SMTP / Email Relay Configuration

Ensure valid SMTP credentials are configured in `server/.env`:
- `SMTP_HOST`
- `SMTP_PORT` (typically 587 or 465)
- `SMTP_SECURE` (`true` for port 465, `false` for 587)
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM` (e.g. `"Ecogest India" <noreply@ecogestindia.com>`)
- `EMAIL_TO` (destination mailbox for customer quote inquiries)

---

## 5. Automated Backups & Data Retention

1. **Submissions Retention:** The built-in retention scheduler automatically purges submissions older than `RETENTION_DAYS` (default 365) every night at midnight.
2. **Database / JSON Backups:**
   Schedule a daily cron job (or Windows Task Scheduler) to trigger the automated backup script:
   ```bash
   npm run backup --workspace=server
   ```
   This generates a timestamped `.tar.gz` archive in `server/backups/`.
3. **Restore Procedure:**
   To restore from a backup:
   ```bash
   tar -xzf server/backups/backup-YYYY-MM-DD_HH-mm-ss.tar.gz -C server/data/
   ```

---

## 6. Reverse Proxy & Network Configuration

When deploying behind Nginx, Caddy, or Cloudflare:
- Ensure `X-Forwarded-For` and `X-Forwarded-Proto` headers are correctly forwarded so Express rate limiters and audit logs capture true client IPs.
- Enforce HTTPS exclusively.
- Verify that `CLIENT_URL` in `server/.env` matches the public canonical origin (e.g. `https://www.ecogestindia.com`).
- Disable verbose server tokens (`ServerTokens Prod` in Nginx, `server_tokens off`).
