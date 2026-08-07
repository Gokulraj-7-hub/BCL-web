# Testing Report — BugCap Labs Website

Last run: against the production build (`npm run build && npm start`) in the
development container.

---

## 1. Summary

| Area                   | Method                                               | Result                              |
| ---------------------- | ---------------------------------------------------- | ----------------------------------- |
| Unit & component tests | Vitest + Testing Library                             | 50 passed / 50                      |
| Type safety            | `tsc --noEmit`, strict mode                          | 0 errors                            |
| Linting                | ESLint 9 (`next/core-web-vitals`, `next/typescript`) | 0 errors, 0 warnings                |
| Production build       | `next build`                                         | Succeeds, 9 routes generated        |
| Accessibility          | Lighthouse + scripted axe-style checks               | **100**                             |
| SEO                    | Lighthouse                                           | **100**                             |
| Best practices         | Lighthouse                                           | **100**                             |
| Performance            | Lighthouse (median of 3)                             | **86** — see `PERFORMANCE.md`       |
| Responsive             | Chromium at 390 / 820 / 1440 px                      | No horizontal overflow at any width |
| Broken links           | Scripted check of all in-page anchors                | 0 broken                            |
| Console errors         | Chromium, full-page scroll at 3 breakpoints          | 0 errors                            |
| Dependency audit       | `npm audit --omit=dev`                               | 0 vulnerabilities                   |

---

## 2. Automated Test Suite

Run with `npm test`. 50 tests across 5 files.

### `tests/validation.test.ts` — 18 tests

Covers the Zod schema shared by the contact form and the API route.

- `sanitizeText` strips angle brackets and control characters, trims whitespace.
- `escapeHtml` escapes `& < > " '` and leaves safe text untouched.
- Accepts a valid submission; lowercases the email; sanitises the message body.
- Rejects: short name, name containing digits, malformed email, short phone,
  phone containing letters, short subject, short message, message over 2000
  characters.
- Accepts names with accents, apostrophes and hyphens (`Anne-Marie O'Néill`).
- Rejects a filled honeypot field.

### `tests/rate-limit.test.ts` — 8 tests

- Allows 5 requests per identifier, blocks the 6th.
- Tracks identifiers independently.
- Decrements the remaining allowance correctly.
- Resets after the 10-minute window elapses (fake timers).
- `getClientIdentifier` prefers the first `x-forwarded-for` entry, falls back to
  `x-real-ip`, then to `"unknown"`.

### `tests/utils.test.ts` — 7 tests

- `cn` joins classes, drops falsy values, resolves conflicting Tailwind
  utilities last-wins, and preserves non-conflicting ones.
- `formatCount` applies Indian digit grouping, rounds fractional counter values,
  handles zero.

### `tests/Accordion.test.tsx` — 8 tests

- Renders each question as a button; all panels start collapsed.
- Expands on click and reveals the answer; collapses on second click.
- Single-open by default; multiple-open when `allowMultiple` is set.
- `aria-controls` points at a panel that is `aria-labelledby` its trigger.
- Operable by keyboard (Tab to focus, Enter to expand).

### `tests/ContactForm.test.tsx` — 9 tests

- Every field has an accessible label and is marked required.
- Empty submit shows validation errors and does not call `fetch`.
- Rejects a malformed email and sets `aria-invalid`.
- Rejects a too-short message.
- Valid submit POSTs the right body to `/api/contact` and shows the success
  message.
- Surfaces a server-side failure (HTTP 502) to the user.
- Handles a network rejection without crashing.
- Pre-fills the subject stashed by an internship "Apply Now" button and clears
  it from session storage afterwards.
- Keeps the honeypot field out of the accessibility tree.

---

## 3. Accessibility Testing

Lighthouse accessibility: **100**. Verified additionally with a scripted
Chromium pass. Details in `ACCESSIBILITY.md`.

Issues found during testing and fixed:

| Issue                                                                       | Fix                                            |
| --------------------------------------------------------------------------- | ---------------------------------------------- |
| `aria-label` on a bare `<span>` in the stat counters (prohibited attribute) | Final value exposed as visually hidden text    |
| `<dl>` in Stats and Internships contained non-`dt`/`dd` children            | Converted to semantic lists                    |
| Logo link's `aria-label` did not contain its visible text (WCAG 2.5.3)      | Removed the override; the wordmark is the name |
| Navbar phone link announced its number twice                                | Single `aria-label` on the anchor              |
| `text-slate-500` body text at 3.8:1 contrast                                | Raised to `text-slate-400` (7.5:1)             |
| Mobile drawer translucent enough to read the hero through                   | Near-opaque background                         |

Verified working:

- First Tab stop is the skip link; it is visible when focused (178 × 40 px) and
  Enter moves focus to `#main-content`.
- Tab order follows visual order: skip link → logo → nav items → phone → CTA →
  hero buttons.
- Exactly one `<h1>`; no skipped heading levels anywhere on the page.
- All 12 gallery images have descriptive `alt` text; no image lacks `alt`.
- No button or link is without an accessible name.
- Lightbox is a proper modal: `role="dialog"`, `aria-modal="true"`, descriptive
  `aria-label`, focus moves into it on open, focus trap on Tab, Escape closes,
  focus returns to the trigger.
- Accordion exposes `aria-expanded` / `aria-controls`; collapsed panels are
  `inert`.
- Contact form errors are announced via `role="alert"`; the submission result
  via an `aria-live="polite"` region.
- Reduced-motion rendering verified in a `prefers-reduced-motion: reduce`
  browser context — the particle canvas does not render, the typewriter shows
  static text, and all transitions collapse.

---

## 4. Responsive Testing

Measured `document.scrollWidth` against `clientWidth` after a full-page scroll:

| Viewport   | Device class             | Overflow    | Result |
| ---------- | ------------------------ | ----------- | ------ |
| 390 × 844  | Mobile (iPhone 14 class) | 390 = 390   | Pass   |
| 820 × 1180 | Tablet (iPad Air class)  | 820 = 820   | Pass   |
| 1440 × 900 | Desktop                  | 1440 = 1440 | Pass   |

Checked visually at each width: navbar and mobile drawer, hero, service grid,
internship cards, technology marquee, process timeline, testimonial rows,
gallery grid and lightbox, FAQ, contact form and map.

---

## 5. Cross-Browser Testing

**Automated in this environment:** Chromium 3 breakpoints, plus a
reduced-motion context. Zero console errors, zero page errors, zero failed
requests (other than the Google Maps embed, which the container's network
policy blocks — it loads normally in a real deployment).

**Not yet run — requires real devices or a browser cloud:** Safari (macOS/iOS),
Firefox, Edge, Samsung Internet. The code avoids known cross-browser hazards
(`-webkit-` prefixes on `backdrop-filter` and `mask`, a `setTimeout` fallback
where `requestIdleCallback` is unsupported, `dvh` units with graceful
degradation), but this should be confirmed on real Safari before launch.

---

## 6. Manual QA Checklist

| Check                                                      | Result       |
| ---------------------------------------------------------- | ------------ |
| All 13 sections present and reachable by anchor            | Pass (13/13) |
| Navbar transparent at top, solid glass on scroll           | Pass         |
| Scroll-spy highlights the current section                  | Pass         |
| Smooth scrolling from navbar, footer and CTA links         | Pass         |
| Mobile drawer opens, closes on link click and on Escape    | Pass         |
| Counters animate on scroll into view and stop at target    | Pass         |
| Gallery category filters change the grid                   | Pass         |
| Lightbox opens, navigates with arrows, closes with Escape  | Pass         |
| FAQ topic filters and accordion expand/collapse            | Pass         |
| Internship "Apply Now" pre-fills the contact subject       | Pass         |
| Contact form validation, success and error states          | Pass         |
| WhatsApp button and back-to-top button                     | Pass         |
| Privacy policy, terms and 404 pages render                 | Pass         |
| `robots.txt`, `sitemap.xml`, `manifest.webmanifest` served | Pass         |
| 6 JSON-LD blocks present in the document head              | Pass         |

---

## 7. Broken Link Testing

Every in-page `href="#..."` was resolved against the DOM: **0 broken anchors**.

External links (social profiles) are placeholder URLs following each platform's
conventional format. They are **not verified accounts** — replace them in
`constants/company.ts` with the company's real profiles before launch.

---

## 8. Known Gaps

1. **Cross-browser testing on Safari, Firefox and Edge has not been performed.**
   Only Chromium was available in this environment.
2. **The contact form's live email delivery has not been tested end to end** —
   that requires real SMTP credentials. The route's validation, rate limiting,
   error handling and the not-configured path are covered by tests; the
   Nodemailer send itself is not.
3. **No end-to-end test suite.** Interactive flows were verified by a scripted
   Chromium pass rather than committed Playwright specs. Adding
   `@playwright/test` would make that repeatable in CI.
4. **Content is placeholder in two places** — testimonials and gallery images.
   See the pre-launch checklist in `README.md`.
