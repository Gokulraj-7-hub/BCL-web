/**
 * Minimal in-memory fixed-window rate limiter for the contact endpoint.
 *
 * This is per-instance state. It stops casual form spam and repeated
 * submissions from a single client, which is what it is here for. For
 * multi-region or high-traffic deployments, back this with a shared store
 * (Upstash Redis, Vercel KV) instead.
 */

interface WindowState {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, WindowState>();

/** Requests allowed per window, per identifier. */
const MAX_REQUESTS = 5;
/** Window length in milliseconds. */
const WINDOW_MS = 10 * 60 * 1000;
/** Prevent unbounded growth if the process is long-lived. */
const MAX_BUCKETS = 10_000;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  /** Seconds until the current window resets. */
  retryAfter: number;
}

export function rateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) pruneExpired(now);
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, retryAfter: 0 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
    retryAfter: 0,
  };
}

function pruneExpired(now: number): void {
  for (const [key, state] of buckets) {
    if (state.resetAt <= now) buckets.delete(key);
  }
}

/** Test helper — clears all windows. */
export function resetRateLimiter(): void {
  buckets.clear();
}

/**
 * Best-effort client identifier from proxy headers. Falls back to a constant
 * so the limiter degrades to a global cap rather than failing open per-request.
 */
export function getClientIdentifier(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') ?? headers.get('cf-connecting-ip') ?? 'unknown';
}
