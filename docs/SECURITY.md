# Security Notes — BugCap Labs Website

A public marketing site has a small attack surface, but it belongs to a
security company, so the site should hold up to the practices it sells.

Lighthouse Best Practices score: **100**.

---

## 1. HTTP Security Headers

Applied to every route in `next.config.ts`:

| Header                      | Value                                          | Protects against                                     |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `Content-Security-Policy`   | See below                                      | XSS, data exfiltration, unexpected third-party loads |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Protocol downgrade, SSL stripping                    |
| `X-Frame-Options`           | `SAMEORIGIN`                                   | Clickjacking                                         |
| `X-Content-Type-Options`    | `nosniff`                                      | MIME confusion                                       |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              | Referrer leakage                                     |
| `Permissions-Policy`        | Camera, microphone, geolocation, FLoC denied   | Unwanted API access                                  |
| `X-XSS-Protection`          | `1; mode=block`                                | Legacy browser XSS filter                            |
| `X-DNS-Prefetch-Control`    | `on`                                           | (Performance)                                        |

`X-Powered-By` is disabled.

### Content Security Policy

```
default-src 'self'
script-src  'self' 'unsafe-inline' 'unsafe-eval' googletagmanager google-analytics
style-src   'self' 'unsafe-inline' fonts.googleapis.com
font-src    'self' fonts.gstatic.com data:
img-src     'self' data: blob: google-analytics
connect-src 'self' google-analytics googletagmanager
frame-src   'self' google.com maps.google.com
object-src  'none'
base-uri    'self'
form-action 'self'
frame-ancestors 'self'
upgrade-insecure-requests
```

`'unsafe-inline'` and `'unsafe-eval'` in `script-src` are required by the
Next.js runtime and the inline JSON-LD blocks. **This is the weakest part of the
policy.** To remove them, adopt nonce-based CSP via middleware — Next.js
documents the pattern at
<https://nextjs.org/docs/app/guides/content-security-policy>. Worth doing for a
security company's own site.

`object-src 'none'`, `base-uri 'self'` and `form-action 'self'` are the three
directives that block the most common CSP bypasses, and all are set.

---

## 2. Input Handling

The contact form is the only user input path.

**Validation is shared, not duplicated.** `lib/validation.ts` exports one Zod
schema used both as the React Hook Form resolver and by the API route. A client
that skips the form and POSTs directly hits identical rules — the client-side
check is a convenience, never the control.

Per field: type, minimum and maximum length, and a format pattern. Names allow
Unicode letters, marks, spaces, hyphens and apostrophes (so accented and
hyphenated names are accepted) but not digits or symbols.

**Sanitisation** — `sanitizeText` strips control characters and angle brackets
from every string field before it leaves validation.

**Output escaping** — `escapeHtml` escapes `& < > " '` before any value is
interpolated into the HTML email body. Newlines are converted to `<br>` after
escaping, never before. Together with the CSP and React's default escaping,
that is three independent layers against XSS.

**Header injection** — the enquirer's address goes into `replyTo`, not `from`.
The subject is prefixed and length-capped, and control characters (including
CR/LF) are stripped, so a crafted subject cannot inject SMTP headers.

---

## 3. Abuse Prevention

| Control            | Detail                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| Honeypot           | Hidden `company` field. Bots fill it; the schema rejects any non-empty value.                              |
| Rate limiting      | 5 submissions per IP per 10-minute fixed window (`lib/rate-limit.ts`), returning `429` with `Retry-After`. |
| Body size cap      | Requests over 16 KB rejected with `413` before parsing.                                                    |
| Field length caps  | Message capped at 2,000 characters, all other fields shorter.                                              |
| Method restriction | Only `POST`; `GET` returns `405` with an `Allow` header.                                                   |

**Silent honeypot failure.** A tripped honeypot returns a generic success
response and sends nothing. Returning an error would tell the bot exactly which
field to leave blank next time.

**Rate limiter scope.** The limiter is in-memory and per-instance, which is
adequate for a marketing site on a single region. On a multi-region deployment
each instance keeps its own counter, so the effective limit multiplies by the
instance count. For stricter enforcement, back it with Vercel KV or Upstash
Redis — the interface in `lib/rate-limit.ts` is designed for that swap.

---

## 4. Secrets Management

- All credentials come from environment variables; nothing is committed.
- `.env.example` documents every variable with placeholder values only.
- `.env`, `.env.local` and `.env*.local` are git-ignored.
- Only `NEXT_PUBLIC_`-prefixed variables reach the browser. The public ones are
  the site URL, an optional GA measurement ID and an optional Search Console
  token — none sensitive.
- `lib/mailer.ts` imports `server-only`, so an accidental client import becomes
  a **build error** rather than a credential leak.
- SMTP credentials are read only inside that module and never returned to a
  caller.

Recommended: use a Gmail App Password rather than the account password, or move
to a transactional provider (Resend, Postmark, SES) with a scoped API key.

---

## 5. Error Handling

Transport failures are logged server-side and returned to the client as a
generic message with a phone number and email address. Stack traces, SMTP
responses and hostnames are never sent to the browser.

When SMTP is not configured the endpoint returns `503` with an honest message
directing the visitor to call or email — it never reports a false success.

---

## 6. Dependencies

Nine runtime dependencies, all widely used and actively maintained.

```bash
npm audit
npm outdated
```

**Current status: `npm audit --omit=dev` reports 0 vulnerabilities.**

Getting there required two upgrades during the security review, both of which
are worth recording:

- **Nodemailer 6 → 9.** Versions at or below 9.0.0 carry eight advisories,
  including SMTP command injection via CRLF in the transport name and in the
  `envelope.size` parameter, and a recursive-call DoS in the address parser.
  This site sends mail through Nodemailer from a public form, so these were
  directly reachable. The upgrade is a semver major but needed no code change —
  `createTransport` and `sendMail` are unchanged for this usage.
- **Next.js 15 → 16.** Next 15 pins vulnerable `postcss` (XSS via unescaped
  `</style>`, path traversal in source-map auto-loading) and `sharp`
  (inherited libvips CVEs). Both are transitive, and Next 16 is the only
  version that resolves them. The upgrade required updating the ESLint flat
  config, since `eslint-config-next` v16 ships flat configs natively and no
  longer needs the `FlatCompat` shim.

Enable Dependabot or Renovate on the repository so this does not drift again.

## 7. Deployment Checklist

- [ ] HTTPS enforced (automatic on Vercel; HSTS is already set)
- [ ] Environment variables set in the Vercel dashboard, not committed
- [ ] SMTP uses an app password or scoped API key, never an account password
- [ ] Verify the security headers after deploy with
      <https://securityheaders.com> and <https://observatory.mozilla.org>
- [ ] Send a real contact-form submission and confirm delivery
- [ ] Confirm the rate limit behaves as expected against the live endpoint
- [ ] Consider SPF, DKIM and DMARC on the sending domain for deliverability
- [ ] Restrict who can deploy to production in Vercel

---

## 8. Known Limitations

1. **CSP allows `unsafe-inline` and `unsafe-eval` for scripts.** Required by the
   current Next.js setup. Nonce-based CSP via middleware would close it.
2. **The rate limiter is per-instance and in-memory.** It resets on cold start
   and does not coordinate across regions.
3. **No CAPTCHA.** The honeypot plus rate limiting stops commodity spam but not
   a determined targeted bot. If spam becomes a problem, Cloudflare Turnstile
   is the least intrusive addition.
4. **The Google Maps iframe is a third-party embed** — it can see visitor IP
   addresses under Google's own policy. Disclosed in the privacy policy. A
   static map image with a link out would avoid it entirely.
