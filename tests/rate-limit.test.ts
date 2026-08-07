import { afterEach, describe, expect, it, vi } from 'vitest';
import { getClientIdentifier, rateLimit, resetRateLimiter } from '@/lib/rate-limit';

afterEach(() => {
  resetRateLimiter();
  vi.useRealTimers();
});

describe('rateLimit', () => {
  it('allows the first five requests from an identifier', () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(rateLimit('1.2.3.4').success).toBe(true);
    }
  });

  it('blocks the sixth request within the window', () => {
    for (let attempt = 0; attempt < 5; attempt += 1) rateLimit('1.2.3.4');

    const result = rateLimit('1.2.3.4');
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('tracks identifiers independently', () => {
    for (let attempt = 0; attempt < 5; attempt += 1) rateLimit('1.2.3.4');

    expect(rateLimit('1.2.3.4').success).toBe(false);
    expect(rateLimit('5.6.7.8').success).toBe(true);
  });

  it('decrements the remaining allowance', () => {
    expect(rateLimit('9.9.9.9').remaining).toBe(4);
    expect(rateLimit('9.9.9.9').remaining).toBe(3);
  });

  it('resets once the window has elapsed', () => {
    vi.useFakeTimers();

    for (let attempt = 0; attempt < 5; attempt += 1) rateLimit('1.2.3.4');
    expect(rateLimit('1.2.3.4').success).toBe(false);

    // The window is 10 minutes.
    vi.advanceTimersByTime(10 * 60 * 1000 + 1000);
    expect(rateLimit('1.2.3.4').success).toBe(true);
  });
});

describe('getClientIdentifier', () => {
  it('uses the first entry of x-forwarded-for', () => {
    const headers = new Headers({ 'x-forwarded-for': '203.0.113.5, 70.41.3.18' });
    expect(getClientIdentifier(headers)).toBe('203.0.113.5');
  });

  it('falls back to x-real-ip', () => {
    const headers = new Headers({ 'x-real-ip': '198.51.100.7' });
    expect(getClientIdentifier(headers)).toBe('198.51.100.7');
  });

  it('returns "unknown" when no proxy headers are present', () => {
    expect(getClientIdentifier(new Headers())).toBe('unknown');
  });
});
