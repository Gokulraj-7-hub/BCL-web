# BugCap Labs Pvt. Ltd. — Corporate Website

Production-ready, single-page corporate website for **BugCap Labs Pvt. Ltd.** — a technology
company delivering software development, cyber security, cloud solutions, digital forensics,
hardware & networking, professional training, internships and placement assistance from Erode,
Tamil Nadu.

> **Securing Future By Today**

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Content Editing Guide](#content-editing-guide)
- [Contact Form Setup](#contact-form-setup)
- [Deployment (Vercel)](#deployment-vercel)
- [Before You Go Live](#before-you-go-live)
- [Documentation](#documentation)

---

## Tech Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router, React Server Components)        |
| UI        | React 19, TypeScript 5 (strict)                         |
| Styling   | Tailwind CSS 4 (CSS-first `@theme` configuration)       |
| Animation | Framer Motion 11, GSAP 3 + ScrollTrigger                |
| Forms     | React Hook Form 7 + Zod 3 (shared client/server schema) |
| Email     | Nodemailer 9 (SMTP, server-side only)                   |
| Icons     | Lucide React                                            |
| Testing   | Vitest 2, Testing Library, jsdom                        |
| Tooling   | ESLint 9 (flat config), Prettier 3                      |
| Hosting   | Vercel (zero-config)                                    |

---

## Features

**Sections** — Hero, Company Overview (mission, vision, values, timeline), Why Choose Us,
Animated Statistics, Services, Professional Training, Internship Programs, Technology Marquee,
Development Process, Testimonials, Gallery with lightbox, FAQ, Contact.

**Engineering**

- Fully responsive, mobile-first (verified at 390 / 820 / 1440 px)
- Server components by default; below-the-fold sections code-split via `next/dynamic`
- Self-hosted fonts through `next/font` — no render-blocking Google Fonts request
- Complete SEO: metadata, Open Graph, Twitter Cards, canonical URLs, `robots.txt`,
  `sitemap.xml`, PWA manifest and six Schema.org JSON-LD graphs
- WCAG 2.1 AA oriented: skip link, semantic landmarks, correct heading hierarchy, visible focus
  rings, full keyboard operability, `prefers-reduced-motion` support throughout
- Security headers including a strict Content Security Policy, HSTS, and clickjacking protection
- Contact API with shared Zod validation, input sanitisation, honeypot spam trap, rate limiting
  and body-size limits
- 50 automated tests covering validation, rate limiting, utilities, the accordion and the contact
  form

---

## Quick Start

**Requirements:** Node.js 20 or newer, npm 10 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

To verify a production build locally:

```bash
npm run build
npm start
```

---

## Environment Setup

Copy `.env.example` to `.env.local` and fill in the values. **Never commit `.env.local`.**

| Variable                               | Required     | Purpose                                                                                                     |
| -------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Yes          | Canonical site URL, no trailing slash. Drives SEO metadata, canonical tags, `sitemap.xml` and `robots.txt`. |
| `SMTP_HOST`                            | For the form | SMTP server hostname (e.g. `smtp.gmail.com`).                                                               |
| `SMTP_PORT`                            | For the form | `587` for STARTTLS, `465` for implicit TLS.                                                                 |
| `SMTP_SECURE`                          | For the form | `true` only when using port 465.                                                                            |
| `SMTP_USER`                            | For the form | SMTP username.                                                                                              |
| `SMTP_PASSWORD`                        | For the form | SMTP password or app password. **Server-side only.**                                                        |
| `CONTACT_TO_EMAIL`                     | For the form | Mailbox that receives enquiries.                                                                            |
| `CONTACT_FROM_EMAIL`                   | For the form | `From` address on outgoing mail.                                                                            |
| `NEXT_PUBLIC_GA_ID`                    | No           | Google Analytics measurement ID. Leave empty to disable analytics entirely.                                 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No           | Google Search Console verification token.                                                                   |

Only variables prefixed with `NEXT_PUBLIC_` reach the browser. SMTP credentials are read
exclusively inside `lib/mailer.ts`, which imports `server-only` so an accidental client import
becomes a build error rather than a leak.

---

## Project Structure

```
.
├── app/                        # Next.js App Router
│   ├── api/contact/route.ts    # Contact form endpoint (validation, rate limit, mail)
│   ├── privacy-policy/         # Privacy policy page
│   ├── terms-and-conditions/   # Terms page
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD, chrome
│   ├── page.tsx                # Home page — composes all sections
│   ├── not-found.tsx           # 404 page
│   ├── manifest.ts             # PWA manifest
│   ├── robots.ts               # robots.txt
│   └── sitemap.ts              # sitemap.xml
├── components/
│   ├── background/             # GridBackdrop, ParticleField, CursorGlow
│   ├── layout/                 # Navbar, Footer, Preloader, FloatingActions, LegalPage
│   ├── ui/                     # Button, GlassCard, Accordion, Counter, Lightbox, …
│   └── ContactForm.tsx
├── constants/                  # All site content lives here (single source of truth)
├── hooks/                      # useScrollPosition, useCountUp, useActiveSection, …
├── lib/                        # motion variants, seo, schema, validation, mailer, rate-limit
├── scripts/                    # Placeholder asset generation
├── sections/                   # One file per page section
├── styles/globals.css          # Tailwind theme tokens, keyframes, component utilities
├── tests/                      # Vitest suite
├── types/                      # Shared TypeScript types
└── public/                     # Logo, icons, OG image, gallery images
```

---

## Available Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start the development server     |
| `npm run build`         | Create a production build        |
| `npm start`             | Serve the production build       |
| `npm run lint`          | Run ESLint                       |
| `npm run lint:fix`      | Run ESLint with autofix          |
| `npm run typecheck`     | Type-check without emitting      |
| `npm run format`        | Format all files with Prettier   |
| `npm run format:check`  | Verify formatting                |
| `npm test`              | Run the test suite once          |
| `npm run test:watch`    | Run tests in watch mode          |
| `npm run test:coverage` | Run tests with a coverage report |

---

## Content Editing Guide

All copy lives in `constants/` as typed objects — you do not need to touch component code to
update the site.

| File                        | Contains                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `constants/company.ts`      | Company name, tagline, director, phone, email, address, business hours, social links, mission, vision, values, timeline, statistics |
| `constants/services.ts`     | Service catalogue, "Why Choose Us" features, development process steps                                                              |
| `constants/training.ts`     | Training tracks and course lists, internship programs                                                                               |
| `constants/technologies.ts` | Technology marquee entries                                                                                                          |
| `constants/testimonials.ts` | Testimonials                                                                                                                        |
| `constants/faq.ts`          | FAQ questions and answers                                                                                                           |
| `constants/gallery.ts`      | Gallery images, alt text and categories                                                                                             |
| `constants/navigation.ts`   | Navbar and footer link lists                                                                                                        |

**Adding a service:** append an entry to `SERVICES` in `constants/services.ts`. Import an icon
from `lucide-react` and pick a Tailwind gradient for `accent`. The card, the Schema.org offer
catalogue and the footer list all update automatically.

**Replacing gallery photos:** drop real images into `public/gallery/`, then update the `src` and
`alt` values in `constants/gallery.ts`. Use 4:3 images at roughly 1600 × 1200 px in WebP or AVIF.

---

## Contact Form Setup

The form posts to `/api/contact`, which validates with the shared Zod schema, applies rate
limiting, then sends mail through Nodemailer.

**Using Gmail:**

1. Enable 2-Step Verification on the Google account.
2. Create an App Password at <https://myaccount.google.com/apppasswords>.
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`,
   `SMTP_USER=<your address>` and `SMTP_PASSWORD=<the app password>`.

Gmail's free tier caps outbound mail at roughly 500 messages per day. For higher volume or
better deliverability, use a transactional provider such as Resend, SendGrid, Postmark or
Amazon SES — only the four `SMTP_*` variables need to change.

**Behaviour when SMTP is not configured:** the endpoint returns HTTP 503 and the form shows a
message directing the visitor to the phone number and email address. It never reports a false
success.

**Spam protection:** a hidden honeypot field, a fixed-window rate limit of 5 submissions per IP
per 10 minutes, a 16 KB body cap, and length limits on every field. For a high-traffic
deployment, back the limiter with a shared store (Vercel KV or Upstash Redis) — see
`lib/rate-limit.ts`.

---

## Deployment (Vercel)

### Option A — Vercel dashboard

1. Push this repository to GitHub.
2. Go to <https://vercel.com/new> and import the repository.
3. Vercel auto-detects Next.js; leave the build settings at their defaults.
4. Under **Settings → Environment Variables**, add every variable from
   [Environment Setup](#environment-setup) for the **Production**, **Preview** and
   **Development** environments.
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # preview deployment
vercel --prod   # production deployment
```

### Custom domain

1. **Settings → Domains** → add your domain (e.g. `bugcaplabs.com`).
2. Point the DNS records at Vercel as instructed (usually an `A` record to `76.76.21.21` and a
   `CNAME` for `www`).
3. Update `NEXT_PUBLIC_SITE_URL` to the live URL and redeploy so canonical URLs, the sitemap and
   Open Graph tags all resolve correctly.

HTTPS certificates are issued and renewed automatically.

### Deploying elsewhere

The app needs a Node.js runtime because the contact route uses Nodemailer. Any Node host works:

```bash
npm run build
npm start        # serves on PORT (default 3000)
```

A static export (`output: 'export'`) would drop the contact API — use an external form service
if you go that route.

---

## Before You Go Live

- [ ] Replace the gallery placeholders in `public/gallery/` with real photographs and update the
      `alt` text in `constants/gallery.ts`.
- [ ] Replace the placeholder entries in `constants/testimonials.ts` with real, attributable
      quotes. **Do not publish invented testimonials as genuine feedback.**
- [ ] Verify the statistics in `constants/company.ts` (500+ students, 150+ projects, 100+
      clients, 95% placement assistance, 5+ years) against your actual records, and adjust the
      founding year and timeline entries.
- [ ] Update the social media URLs in `constants/company.ts` — the current values are
      conventional guesses, not verified accounts.
- [ ] Have a legal advisor review `app/privacy-policy/page.tsx` and
      `app/terms-and-conditions/page.tsx`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Configure SMTP and send a live test submission.
- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- [ ] Run a Lighthouse audit against the deployed URL (see `docs/PERFORMANCE.md`).

---

## Documentation

| Document                                         | Contents                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [`docs/TESTING.md`](docs/TESTING.md)             | Test strategy, automated suite, manual QA results, cross-browser and responsive testing |
| [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md)     | Bundle analysis, optimisation techniques, Lighthouse guidance                           |
| [`docs/SEO-CHECKLIST.md`](docs/SEO-CHECKLIST.md) | Full SEO implementation checklist and post-launch tasks                                 |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | WCAG conformance notes and verification results                                         |
| [`docs/SECURITY.md`](docs/SECURITY.md)           | Security headers, input handling, secrets management                                    |

---

## License & Ownership

© BugCap Labs Pvt. Ltd. All rights reserved. This codebase is proprietary to BugCap Labs
Pvt. Ltd. and is not licensed for redistribution.

**Contact** — [bugcaplabinfo@gmail.com](mailto:bugcaplabinfo@gmail.com) · +91 79047 67261 ·
212, Parasuraman Thottam, Kadappanallur Post, Bhavani Taluk, Erode – 638311, Tamil Nadu, India
