# SEO Checklist — BugCap Labs Website

Lighthouse SEO score: **100** (consistent across three runs).

---

## 1. Implemented

### Metadata

| Item                          | Status | Where                                      |
| ----------------------------- | ------ | ------------------------------------------ |
| Meta title (unique per route) | Done   | `lib/seo.ts`, per-page `metadata` exports  |
| Meta description              | Done   | `lib/seo.ts`                               |
| Keywords                      | Done   | 14 location- and service-targeted terms    |
| Canonical URLs                | Done   | `alternates.canonical` on every route      |
| `metadataBase`                | Done   | Driven by `NEXT_PUBLIC_SITE_URL`           |
| Language                      | Done   | `<html lang="en-IN">`                      |
| Viewport                      | Done   | `app/layout.tsx` viewport export           |
| Theme colour                  | Done   | `#04070f`                                  |
| Author / publisher / creator  | Done   | `lib/seo.ts`                               |
| Google site verification      | Ready  | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |

Title: `BugCap Labs Pvt. Ltd. | Cyber Security, Software Development & IT Training in Erode` (82 characters — slightly over the ~60 character display limit; Google will truncate the tail. Kept because the truncated portion still carries the location keyword.)

### Social sharing

| Item                                                        | Status                 |
| ----------------------------------------------------------- | ---------------------- |
| Open Graph type, locale, URL, site name, title, description | Done                   |
| OG image (1200 × 630, branded)                              | Done — `/og-image.svg` |
| Twitter card (`summary_large_image`)                        | Done                   |
| Twitter title, description, image, creator                  | Done                   |

> **Note:** the OG image is an SVG. Facebook, LinkedIn and WhatsApp do not
> render SVG previews reliably. Export `public/og-image.svg` to a 1200 × 630
> PNG and point `lib/seo.ts` at it before launch — this is the one SEO item
> that will visibly misbehave in production if skipped.

### Crawling and indexing

| Item                      | Status | Where                                           |
| ------------------------- | ------ | ----------------------------------------------- |
| `robots.txt`              | Done   | `app/robots.ts` — allows all, disallows `/api/` |
| `sitemap.xml`             | Done   | `app/sitemap.ts` — 12 entries with priorities   |
| Robots meta directives    | Done   | `index, follow`, `max-image-preview: large`     |
| 404 page marked `noindex` | Done   | `app/not-found.tsx`                             |
| PWA manifest              | Done   | `app/manifest.ts`                               |

### Structured data (Schema.org, JSON-LD)

Six graphs, each emitted as its own `<script>` so they validate independently:

1. **Organization** — name, legal name, logo, founder, address, contact point, `sameAs` social profiles
2. **ProfessionalService** (LocalBusiness) — geo coordinates, opening hours, area served, full offer catalogue generated from `SERVICES`
3. **WebSite** — publisher reference, language
4. **EducationalOrganization** — training academy, linked to the parent organisation
5. **FAQPage** — all 18 questions and answers, eligible for FAQ rich results
6. **BreadcrumbList** — six main sections

Validate at <https://search.google.com/test/rich-results> after deployment.

### Technical

| Item                                                   | Status                    |
| ------------------------------------------------------ | ------------------------- |
| Server-side rendered HTML (content visible without JS) | Done                      |
| Semantic HTML5 landmarks                               | Done                      |
| Exactly one `<h1>`, no skipped heading levels          | Verified                  |
| Descriptive `alt` on every image                       | Verified — 0 missing      |
| Descriptive link text (no "click here")                | Done                      |
| Mobile-friendly / responsive                           | Verified at 3 breakpoints |
| HTTPS + HSTS                                           | Done (`next.config.ts`)   |
| No broken internal links                               | Verified — 0 broken       |
| Fast load, zero layout shift                           | CLS 0.006                 |
| Google Analytics ready                                 | Set `NEXT_PUBLIC_GA_ID`   |

**Scroll-reveal and crawlability:** the reveal animations were deliberately
built so content is visible in the server-rendered HTML and only hidden after
JavaScript confirms it is off-screen. A `whileInView`-style implementation that
starts at `opacity: 0` risks a crawler indexing an empty page.

---

## 2. Local SEO — Erode, Tamil Nadu

Implemented:

- `ProfessionalService` schema with a full postal address and geo coordinates
- Opening hours specification
- `areaServed`: Erode → Tamil Nadu → India
- NAP (name, address, phone) consistent across the contact section, footer and structured data
- Embedded Google Maps and a "get directions" link
- Location keywords in the title, description and keyword list

Still to do (off-site, cannot be done in code):

- [ ] Create and verify a **Google Business Profile** for the Erode address
- [ ] Confirm the geo coordinates in `constants/company.ts` — they are
      approximate for Bhavani Taluk, not surveyed for the exact building
- [ ] List on Justdial, IndiaMART, Sulekha and local directories with identical NAP
- [ ] Collect Google reviews

---

## 3. Pre-Launch Tasks

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (canonical URLs, the
      sitemap and OG tags all derive from it)
- [ ] **Convert the OG image to PNG** and update `lib/seo.ts`
- [ ] Replace the placeholder social URLs in `constants/company.ts` with real,
      verified profiles — they feed the `sameAs` array, and wrong values weaken
      entity matching
- [ ] Verify the exact office coordinates
- [ ] Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and verify in Search Console
- [ ] Add `NEXT_PUBLIC_GA_ID` if analytics are wanted
- [ ] Replace placeholder testimonials with real ones — review content can
      support review rich results later, but only if genuine

## 4. Post-Launch Tasks

- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools
- [ ] Request indexing for the homepage
- [ ] Validate all six JSON-LD graphs in the Rich Results Test
- [ ] Check the OG preview with the Facebook Sharing Debugger and LinkedIn Post Inspector
- [ ] Re-run Lighthouse against the live URL
- [ ] Monitor Core Web Vitals in Search Console after ~28 days of field data

---

## 5. Content Recommendations

The site is a single page, which limits how many queries it can rank for. Two
options once it is live:

1. **Service detail pages** — `/services/cyber-security`,
   `/services/software-development`, and so on. Each can target its own query
   set and carry its own `Service` schema. The content already exists in
   `constants/services.ts`.
2. **A blog** — `/blog/...` with `Article` schema. Security advisories, training
   guides and case studies are the natural fit and would build topical
   authority around the cyber security terms.

Both are straightforward additions: the App Router structure, SEO helpers and
component library are already in place.
