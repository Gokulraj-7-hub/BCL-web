# Accessibility Report — BugCap Labs Website

Target: **WCAG 2.1 Level AA**. Lighthouse accessibility score: **100**
(consistent across three runs).

---

## 1. Verified Behaviour

Checked with Lighthouse and a scripted Chromium pass over the production build.

### Structure and semantics

| Check                                                             | Result                               |
| ----------------------------------------------------------------- | ------------------------------------ |
| Exactly one `<h1>`                                                | Pass (1)                             |
| No skipped heading levels                                         | Pass (0 skips across the whole page) |
| Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`) | Pass                                 |
| Every `<section>` labelled by its heading (`aria-labelledby`)     | Pass                                 |
| `<html lang="en-IN">`                                             | Pass                                 |
| Lists marked up as lists                                          | Pass                                 |
| Images have `alt`                                                 | Pass (0 of 12+ missing)              |
| Decorative graphics hidden from assistive tech                    | Pass                                 |
| Buttons and links have accessible names                           | Pass (0 unnamed)                     |

### Keyboard

| Check                                            | Result                               |
| ------------------------------------------------ | ------------------------------------ |
| First Tab stop is the skip link                  | Pass                                 |
| Skip link visible when focused                   | Pass (178 × 40 px)                   |
| Skip link moves focus to `#main-content`         | Pass                                 |
| Tab order matches visual order                   | Pass                                 |
| All interactive elements reachable               | Pass                                 |
| Visible focus ring everywhere                    | Pass (2 px `brand-400`, 3 px offset) |
| No keyboard traps                                | Pass                                 |
| Escape closes the mobile drawer and the lightbox | Pass                                 |
| Arrow keys navigate the lightbox                 | Pass                                 |

### Modal dialog (lightbox)

Implements the full dialog contract:

- `role="dialog"` and `aria-modal="true"`
- Descriptive label: _"Gallery image 1 of 12: Full Stack Development Batch"_
- Focus moves into the dialog on open (verified)
- Focus trapped on Tab and Shift+Tab
- Escape closes; focus returns to the triggering element
- Background scroll locked, with scrollbar-width compensation so nothing shifts

### Forms

- Every field has a visible `<label>` bound by `htmlFor`/`id`
- `aria-required` and `aria-invalid` reflect state
- Errors are linked by `aria-describedby` and announced with `role="alert"`
- Submission result announced in an `aria-live="polite"` region
- The honeypot is `aria-hidden` and `tabIndex={-1}`, so it never reaches a
  screen reader or the tab order
- Errors are conveyed by text and icon, not colour alone

### Motion

`prefers-reduced-motion: reduce` is honoured throughout, verified in a
reduced-motion browser context:

- A global CSS rule collapses all animation and transition durations
- The particle canvas does not mount at all
- The typewriter renders static text
- Card tilt, spotlight and the cursor glow are disabled
- Counters jump straight to their final value
- Smooth scrolling falls back to instant
- GSAP scroll animation is skipped

No content flashes more than three times per second.

### Colour contrast

| Combination                         | Ratio  | WCAG AA    |
| ----------------------------------- | ------ | ---------- |
| `slate-200` (#e2e8f0) on `navy-950` | 15.8:1 | Pass (AAA) |
| `slate-300` (#cbd5e1) on `navy-950` | 12.6:1 | Pass (AAA) |
| `slate-400` (#94a3b8) on `navy-950` | 7.5:1  | Pass (AAA) |
| `brand-300` (#93d0fd) on `navy-950` | 10.9:1 | Pass (AAA) |
| White on `brand-600` (#1a6fdc)      | 5.1:1  | Pass       |
| `emerald-300` on `emerald-500/10`   | > 7:1  | Pass       |
| `red-400` on `red-500/10`           | > 6:1  | Pass       |

`text-slate-500` (3.8:1) was removed from all body copy during testing. It
survives only on two decorative bullet separators, which carry no information.

---

## 2. Issues Found and Fixed

All found during testing on the first production build.

| Issue                                                                                                          | WCAG  | Fix                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------- |
| `aria-label` on a bare `<span>` in the stat counters — a prohibited attribute on an element with no role       | 4.1.2 | Final value exposed as visually hidden text; the animating digits are `aria-hidden`                         |
| `<dl>` in Stats and Internships contained `<span>` and nested `<div>` children, which the spec does not permit | 1.3.1 | Converted both to semantic lists; label/value pairing is unchanged for screen readers                       |
| Logo link's `aria-label` ("… — back to top") did not contain its visible text, breaking voice control          | 2.5.3 | Removed the override; the wordmark supplies the name, and the monogram SVG is `aria-hidden` when it appears |
| Navbar phone link announced "+91 79047 67261Call +91 79047 67261"                                              | 4.1.2 | Single `aria-label` on the anchor instead of a duplicate sr-only span                                       |
| `text-slate-500` body text at 3.8:1                                                                            | 1.4.3 | Raised to `text-slate-400` (7.5:1) in seven components                                                      |
| Mobile drawer translucent enough to read the hero through it                                                   | 1.4.3 | Near-opaque background                                                                                      |
| Collapsed accordion panels remained in the tab order                                                           | 2.4.3 | Panels are `inert` while collapsed                                                                          |

---

## 3. Design Decisions Made for Accessibility

**Scroll reveals start visible.** `Reveal` renders content at full opacity and
only hides it once JavaScript has confirmed it is off-screen. A
`whileInView`-style component that starts at `opacity: 0` leaves the page blank
for anyone whose JavaScript fails — and for crawlers.

**Marquees pause on hover and focus.** The technology and testimonial rows
scroll continuously; both stop when hovered or when anything inside them
receives focus, so the content can always be read (WCAG 2.2.2).

**Duplicated marquee content is hidden.** Each marquee renders its items twice
for a seamless loop; the clone is `aria-hidden` so screen readers encounter
each item once.

**Counters announce once.** The final value is read from visually hidden text
rather than the animating number, so assistive tech does not narrate every
intermediate frame.

**Testimonial avatars are initials, not stock photography.** No invented
photographs of people who do not exist.

---

## 4. Not Yet Verified

Automated tooling catches roughly a third of WCAG issues. These need a human:

1. **Screen reader testing** — NVDA (Windows), VoiceOver (macOS/iOS) and
   TalkBack (Android). Not available in this environment. This is the most
   valuable remaining check.
2. **Real keyboard-only session** end to end, including the contact form
   submission flow.
3. **Zoom to 200% and 400%** (WCAG 1.4.4, 1.4.10). Layout is fluid and should
   hold, but it has not been measured.
4. **Windows High Contrast Mode** — the glassmorphism surfaces rely on
   translucency and may need forced-colors overrides.
5. **Voice control** (Dragon, Voice Access) — the label/name mismatch fix
   should have resolved the main risk, but confirm.

---

## 5. Ongoing Guidance

When adding content or components:

- Keep the heading hierarchy sequential — never skip a level for styling
- Write `alt` text that describes the image's purpose; use `alt=""` only for
  genuinely decorative images
- Never convey meaning through colour alone
- Ensure new interactive elements are reachable by keyboard with a visible
  focus ring
- Gate any new animation on `prefers-reduced-motion`
- Keep new text at 4.5:1 contrast or better (`slate-400` is the darkest grey
  that passes on this background)
- Re-run `npx lighthouse <url> --only-categories=accessibility` before merging
