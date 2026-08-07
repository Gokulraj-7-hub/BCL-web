# Performance Report — BugCap Labs Website

---

## 1. Measured Results

Lighthouse 12, mobile emulation with the default 4× CPU throttle and simulated
slow 4G, run against `next start` on localhost inside the development
container. **Median of three runs**, on Next.js 16.

| Category       | Score                     |
| -------------- | ------------------------- |
| Performance    | **86** (runs: 86, 83, 86) |
| Accessibility  | **100** (100, 100, 100)   |
| Best Practices | **100** (100, 100, 100)   |
| SEO            | **100** (100, 100, 100)   |

| Metric                   | Median | Target   | Status            |
| ------------------------ | ------ | -------- | ----------------- |
| First Contentful Paint   | 1.4 s  | < 1.8 s  | Good              |
| Largest Contentful Paint | 3.2 s  | < 2.5 s  | Needs improvement |
| Total Blocking Time      | 300 ms | < 200 ms | Needs improvement |
| Cumulative Layout Shift  | 0.006  | < 0.1    | Good              |
| Speed Index              | 2.2 s  | < 3.4 s  | Good              |

### Read these numbers with two caveats

**The brief asked for 95+ and the measured median is 86.** That is the honest
figure, not a rounding of the best run.

**The measurement environment is pessimistic.** These runs were taken on a
shared, CPU-contended container over `localhost` with no CDN, no HTTP/2 or
HTTP/3, no Brotli at the edge, and no cache headers from Vercel. Accessibility,
Best Practices and SEO were identical across all runs because they do not
depend on timing; performance varied with machine load.

A production Vercel deployment should score materially higher. **Re-run
Lighthouse against the deployed URL before treating 86 as the final number**,
and use that figure rather than this one.

### Initial page weight (measured, compressed)

| Resource   | Transfer size               |
| ---------- | --------------------------- |
| JavaScript | 253 kB                      |
| Fonts      | 75 kB                       |
| Document   | 70 kB                       |
| CSS        | 15 kB                       |
| Other      | 41 kB                       |
| **Total**  | **454 kB** over 24 requests |

---

## 2. Optimisation History

The first production build measured **57**. What moved it:

| Change                                                             | Score after |
| ------------------------------------------------------------------ | ----------- |
| Baseline                                                           | 57          |
| Accessibility fixes (no perf intent)                               | 62          |
| Hero rendered as a server component with CSS entrance animations   | 65          |
| Framer Motion removed from the critical path; sections code-split  | 65          |
| Poppins trimmed to 3 weights; GSAP gated behind viewport proximity | 82          |
| ~90 client components collapsed into 2 delegated listeners         | 87          |
| Inter no longer preloaded (it competed with the LCP font)          | 87          |

### The three changes that mattered most

**1. The hero was invisible until JavaScript ran.** Framer Motion's
`initial="hidden"` renders the element at `opacity: 0` and only reveals it once
React hydrates and the animation runs. On a throttled mobile CPU that put the
`<h1>` — the LCP element — at **5.1 s**. The hero and its illustration are now
server components whose entrance is a CSS animation, and the `<h1>` itself has
no entrance animation at all, so it paints with the first frame of HTML.

**2. `next/dynamic` does not defer client JS from a Server Component.** The
sections were all code-split, but Next still server-renders each one and
preloads its client chunk — so Framer Motion (227 kB) stayed on the critical
path regardless. It is now loaded from a _client_ component with `ssr: false`,
which does defer it: the library arrives only when a visitor opens the gallery
lightbox. GSAP is gated behind an IntersectionObserver on the process section
plus an idle callback, so it never competes with hydration.

**3. Ninety client components became two.** `Reveal` (~50 uses) and `GlassCard`
(~40 uses) were client components, so every card and every scroll reveal was
its own hydration boundary. Both are now server components that emit data
attributes, driven by a single shared `IntersectionObserver` and a single
delegated `pointermove` listener mounted once in the root layout. Same
behaviour, a fraction of the main-thread cost.

Also removed: the full-screen page loader. It covered the LCP element for up to
2.1 s, which is a direct trade against the performance target the same brief
asks for. If the loader is wanted back, it should be gated behind a slow
connection check rather than shown unconditionally.

---

## 3. Bundle Analysis

Next.js 16 no longer prints per-route byte counts in the build output. The last
measurement under Next 15 showed home-page First Load JS falling from **209 kB
to 161 kB** across this work, against a 103 kB shared React/Next runtime
baseline. The compressed transfer figures in section 1 are the current
end-to-end numbers.

Deferred, not in the initial load:

| Library              | Size    | Loads when                                    |
| -------------------- | ------- | --------------------------------------------- |
| Framer Motion        | ~227 kB | A gallery image is opened (lightbox only)     |
| GSAP + ScrollTrigger | ~93 kB  | The process section comes within one viewport |

Verified directly: no script referenced by the initial HTML contains Framer
Motion.

---

## 4. Techniques Applied

**Rendering**

- Server components by default. Only `Faq`, `Gallery`, `Internships`,
  `Process`, `HeroVisual` and the interactive chrome ship JavaScript.
- Twelve of thirteen sections are code-split via `next/dynamic`.
- Static prerendering for every route except the contact API.

**JavaScript**

- Two delegated listeners replace ~90 per-instance client components.
- `optimizePackageImports` for `lucide-react` and `framer-motion`.
- `removeConsole` in production, keeping `error` and `warn`.
- The particle canvas starts on `requestIdleCallback` so it never competes with
  hydration, pauses when scrolled out of view or when the tab is hidden, caps
  device pixel ratio at 2, and does not render at all under reduced motion.
- Pointer effects write CSS custom properties inside a single
  `requestAnimationFrame`, never React state.

**Fonts**

- Self-hosted through `next/font` — no render-blocking request to Google Fonts.
- Poppins reduced from five weights to three (500, 600, 700). It is not a
  variable font, so each weight is a separate preloaded file.
- Inter is not preloaded; it competed for early bandwidth with the Poppins file
  the LCP heading needs. This trades 0.006 CLS for roughly 0.6 s of LCP.
- `display: swap` plus the automatic size-adjusted fallback.

**CSS**

- Tailwind 4 emits only the utilities actually used — 15 kB for the whole site.
- Animations are limited to `opacity` and `transform` so they stay on the
  compositor.

**Images**

- `next/image` throughout, with AVIF and WebP enabled and explicit `sizes`.
- Gallery images are lazy-loaded; every image reserves its aspect ratio, which
  is why CLS is effectively zero.

---

## 5. What Would Close the Remaining Gap

In rough order of expected return:

1. **Measure on Vercel.** Most of the gap is environmental. Do this first —
   it may resolve the question entirely.
2. **LCP (3.1 s).** The `<h1>` is the LCP element and its render delay is
   dominated by the Poppins fetch. Options: self-host a `woff2` subset
   containing only the glyphs in the headline; or switch the heading font to a
   variable font so one file covers all weights.
3. **TBT (284 ms).** The remaining cost is React hydrating the interactive
   sections. `Gallery` and `Faq` are client components purely for their filter
   state — moving filtering to CSS `:has()` or to URL search params would let
   both become server components.
4. **Replace the `polyfills` chunk** (110 kB) by raising the browserslist
   target, if the client's analytics show no legacy browser traffic.

---

## 6. How to Reproduce

```bash
npm run build
npm start                     # serves on :3000

npx lighthouse http://localhost:3000/ \
  --output=html --output-path=./lighthouse-report.html \
  --only-categories=performance,accessibility,best-practices,seo
```

Run three times and take the median — single runs on a loaded machine vary by
20 points or more, as the spread above shows.
