# Ecogest India Pvt. Ltd. — Corporate Web Platform

Production-ready, multi-page corporate website and backend REST API for **Ecogest India Pvt. Ltd.** — specialist in imported European softwood timber trading and export-compliant industrial packaging manufacturing.

---

## 🏗️ Architecture & Monorepo Structure

Built as an **npm workspaces** monorepo:

```
ecogest-india/
├── package.json                 # Monorepo workspaces & root orchestration scripts
├── README.md                    # Setup, run, deployment & asset guide
├── .gitignore                   # Ignores node_modules, build outputs, submissions
├── client/                      # Frontend Next.js (App Router) application
│   ├── public/
│   │   ├── favicon.svg          # Custom brand favicon
│   │   └── assets/
│   │       ├── logo/            # SVG logo & variants (logo.svg, logo-white.svg)
│   │       ├── hero/            # Hero & section backgrounds
│   │       ├── timber/          # Softwood timber product illustrations
│   │       ├── pallets/         # Two-way, four-way & specialized pallet illustrations
│   │       ├── industrial-products/ # Cable drums, boxes, crates
│   │       └── icons/           # ISPM-15 IPPC stamp emblem
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages (/about, /timber, etc.)
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer, MobileMenu, FloatingContact
│   │   │   ├── sections/        # Hero, CoreServices, AboutTeaser, WhyChooseUs, etc.
│   │   │   ├── ui/              # Container, SectionHeading, Button, Card
│   │   │   └── forms/           # ContactForm, QuoteForm
│   │   ├── content/
│   │   │   └── site-content.ts  # Centralized content store (all text lives here)
│   │   ├── lib/                 # API client, SEO metadata, Tailwind cn helper
│   │   └── styles/              # globals.css with custom design tokens
│   ├── tailwind.config.ts       # Industrial timber/forest/cream color system
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env.local
└── server/                      # Node.js + Express (TypeScript) REST API
    ├── src/
    │   ├── index.ts             # Express server entry point & middleware wiring
    │   ├── routes/              # /api/contact, /api/quote
    │   ├── controllers/         # Form processing & response dispatchers
    │   ├── services/            # mail.service.ts (Nodemailer), submission.service.ts
    │   ├── middleware/          # Zod validation, rate limiter, CORS, error handler
    │   └── config/              # Environment loader
    ├── data/
    │   └── submissions.json     # Appended JSON audit log (gitignored)
    ├── tsconfig.json
    ├── .env.example
    └── .env
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
From the project root:
```bash
npm install
```
*(On Windows PowerShell, use `npm.cmd install` if script execution policies apply).*

### 3. Running Development Servers
Run both Next.js frontend and Express backend concurrently with a single command from root:
```bash
npm run dev
```

- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Running Workspaces Independently
```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

---

## 🎨 Design System & Visual Palette

| Palette Token | Color Code | Role |
| :--- | :--- | :--- |
| **Forest 700 / 900** | `#1D4B24` / `#0D2512` | Deep forest green for authority, sustainability & hero sections |
| **Timber 500 / 600** | `#9C763C` / `#7E5B29` | Warm wood brown accent for buttons, badges, and timber styling |
| **Cream 50 / 100** | `#FCFBF8` / `#F8F5EE` | Clean off-white/cream background for readable contrast |
| **Charcoal 900** | `#111827` | High-contrast editorial typography |

Typography features a distinguished serif heading hierarchy (`font-serif`) paired with modern, accessible sans-serif body typography.

---

## 🖼️ Expected Image Filenames & Replacement Guide

All components are wired to `client/public/assets/*`. To replace placeholders with photography: simply place your image in the target path with the filename below.

| Category | Path & Expected Filename | Description / Dimensions |
| :--- | :--- | :--- |
| **Logo** | `client/public/assets/logo/logo.svg` | Primary color logo (horizontal format) |
| **Logo** | `client/public/assets/logo/logo-white.svg` | White/cream version for dark footers |
| **Logo** | `client/public/assets/logo/logo-icon.svg` | Square emblem icon |
| **Hero** | `client/public/assets/hero/hero-bg.svg` | Homepage hero forest & lumber backdrop (1920x1080) |
| **Hero** | `client/public/assets/hero/about-hero.svg` | European heritage sawmills & trade facilities |
| **Hero** | `client/public/assets/hero/manufacturing-hero.svg`| Packaging manufacturing shop floor |
| **Hero** | `client/public/assets/hero/quality-compliance.svg` | Quality inspection & ISPM-15 testing |
| **Timber** | `client/public/assets/timber/softwood-lumber.svg` | European & South American softwood stacks |
| **Timber** | `client/public/assets/timber/kiln-dried.svg` | Kiln-dried sawn timber stacks |
| **Timber** | `client/public/assets/timber/structural-wood.svg` | Graded structural beams and lumber |
| **Pallets** | `client/public/assets/pallets/two-way-pallet.svg` | Two-way stringer pallet photo/diagram |
| **Pallets** | `client/public/assets/pallets/four-way-pallet.svg` | Four-way solid block pallet photo/diagram |
| **Pallets** | `client/public/assets/pallets/closed-boarded.svg` | Closed boarded flush deck pallet |
| **Pallets** | `client/public/assets/pallets/wing-type.svg` | Wing type pallet with extended deck boards |
| **Pallets** | `client/public/assets/pallets/reversible.svg` | Identical dual-face reversible pallet |
| **Pallets** | `client/public/assets/pallets/single-deck.svg` | Single deck skid pallet |
| **Pallets** | `client/public/assets/pallets/reversible-closed.svg` | Closed-boarded reversible pallet |
| **Pallets** | `client/public/assets/pallets/four-way-non-reversible.svg` | Industrial 4-way non-reversible pallet |
| **Industrial** | `client/public/assets/industrial-products/cable-drums.svg` | Heavy-duty wooden cable drums |
| **Industrial** | `client/public/assets/industrial-products/wooden-boxes.svg` | Heavy machinery wooden transport boxes |
| **Industrial** | `client/public/assets/industrial-products/wooden-crates.svg` | Open & reinforced wooden industrial crates |
| **Icons** | `client/public/assets/icons/ispm15-stamp.svg` | ISPM-15 IPPC compliance stamp emblem |

*Tip: You can use `.svg`, `.png`, `.jpg`, or `.webp` files. When changing file extensions, update the corresponding path in `client/src/content/site-content.ts`.*

---

## 📝 How to Edit Website Content

**Zero JSX hardcoding rule**: All text, company details, navigation links, and product descriptions live in:
👉 `client/src/content/site-content.ts`

- **To update addresses, phone numbers, or email**: Update `SITE_METADATA`.
- **To update navigation items**: Update `NAVIGATION_LINKS`.
- **To edit timber or packaging descriptions**: Update `TIMBER_CONTENT`, `PALLETS_CONTENT`, etc.

---

## ⚙️ Environment Variables & Configuration

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (`server/.env`)
```env
PORT=5000
CLIENT_URL=http://localhost:3000

# Nodemailer SMTP Configuration
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM="Ecogest India <noreply@ecogestindia.com>"
EMAIL_TO=kanhaiya.mali@ecogestindia.com
```

*Note: If SMTP credentials are blank, the backend automatically runs in safe simulation mode: submissions are logged to `server/data/submissions.json` and printed to the console without crashing!*

---

## 📡 API Endpoints

- `GET /api/health` — Service health and uptime status.
- `POST /api/contact` — Validates with Zod, logs to `submissions.json`, rate-limits to 20/15min, sends email notification.
- `POST /api/quote` — Request-a-quote submission with product selection, dimensions, and quantity.

---

## 🚢 Production Build & Deployment

To build both client and server for production:
```bash
npm run build
```

To run both production servers:
```bash
npm run start
```

- **Frontend hosting**: Can be deployed to Vercel, AWS Amplify, Docker, or any Node.js host.
- **Backend hosting**: Can be deployed to Railway, Render, Fly.io, AWS EC2, or Docker.


---

## 🔒 Security Hardening Architecture

The platform includes an enterprise security-hardening layer across both the Next.js frontend and Express backend:

### 1. Bot Protection & Honeypot
- **Cloudflare Turnstile**: Embedded on both `QuoteForm` and `ContactForm` using `@marsidev/react-turnstile`.
- **Server Siteverify**: `server/src/middleware/turnstile.middleware.ts` validates the client turnstile token with Cloudflare's verification API.
- **Hidden Honeypot**: Detects automated spam bots filling hidden fields (`honeypot` / `website_hp`) and silently returns a fake success response without processing or emailing.
- **Local Dev Test Keys**: Uses Cloudflare's official dummy pass key (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`).

### 2. Email Injection Guard & XSS Sanitization
- **CRLF Stripping**: `server/src/utils/security.util.ts` (`stripHeaderInjection`) strips `\r`, `\n`, `%0D`, `%0A`, and ASCII control characters from user-controlled fields before passing to Nodemailer headers.
- **HTML Escaping**: Escapes `<script>`, HTML entities, and injection attempts inside email bodies.

### 3. Security Headers & Strict CSP
- `client/next.config.js` sets:
  - `Content-Security-Policy`: Restricts scripts, styles, objects, and connect endpoints to self, Cloudflare Turnstile, and Google Maps embeds.
  - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Powered-By` is explicitly disabled on both Next.js and Express.

### 4. CSRF Protection
- All state-changing methods (`POST`, `PUT`, `PATCH`, `DELETE`) under `/api/admin` and `/api/auth` strictly require the custom header `X-Requested-With: ecogest-admin` and validate the incoming `Origin` / `Referer`.
- `client/src/lib/auth-client.ts` automatically injects this security header.

### 5. Admin Two-Factor Authentication (2FA)
- **TOTP Standard**: Powered by `otplib` and `qrcode`.
- **At-Rest Encryption**: TOTP secrets are encrypted at rest using AES-256-GCM via `TOTP_ENCRYPTION_KEY` in `server/data/admins.json`.
- **One-Time Recovery Codes**: Upon enrollment, 10 single-use recovery codes (`ECO-XXXXX-XXXXX`) are generated, bcrypt-hashed, and burned on use.
- **Replay Prevention**: Enforces single-use verification per 30-second TOTP time window.
- **Two-Step Login**: Step 1 validates password and issues a 5-minute `pre-auth` JWT. Step 2 requires TOTP or a recovery code before granting access.
- **Enforcement Banner**: Persistent banner displayed to admins without 2FA; can be strictly mandated with `REQUIRE_2FA=true`.
- **Recovery CLI**: Disable 2FA for an admin account via CLI:
  ```bash
  npm run reset-2fa --workspace=server -- --email=admin@ecogestindia.com
  ```

### 6. Append-Only Audit Logging
- Security events (`login`, `2fa_verify`, `lockout`, `submission_view`, `submission_delete`, `2fa_enroll`, `2fa_reset`, `retention_purge`) are appended in JSON Lines format to `server/data/audit.log`.
- **Monthly Rotation**: Automatically rotated into `server/data/audit-YYYY-MM.log`.
- **Zero Credential Leakage**: Sanitization layer strips all sensitive fields (`password`, `token`, `secret`, `code`).
- **Admin Viewer**: View and filter audit logs directly at `/admin/audit`.

### 7. Strict Startup Environment Validation
- `server/src/config/env.ts` and `client/src/lib/env.ts` use Zod to validate all environment variables at startup.
- The server will immediately halt with a clear error message if secrets (`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_PREAUTH_SECRET`, `TOTP_ENCRYPTION_KEY`) are missing or under 32 characters long.

### 8. Data Retention & Backups
- **Daily Purge**: `server/src/services/retention.service.ts` runs a daily cron job to purge submissions older than `RETENTION_DAYS` (default 365) and logs the count to audit.
- **Backup Archive CLI**:
  ```bash
  npm run backup --workspace=server
  ```
  Generates a timestamped `.tar.gz` archive of all JSON datastores in `server/backups/`.

### 9. Repo Hygiene & Security Policy
- `.github/dependabot.yml`: Weekly npm dependency vulnerability updates.
- `.github/workflows/ci.yml`: Automated CI pipeline running unit tests and production builds.
- `client/public/.well-known/security.txt`: RFC 9116 compliant security contact policy.
- `DEPLOYMENT-SECURITY.md`: Pre-flight deployment checklist and operational runbook.
- `/privacy`: Transparent privacy policy detailing data collection, processing, and deletion rights.
