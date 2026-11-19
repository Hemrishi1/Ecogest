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
