'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseCountUpOptions {
  /** Final value to count towards. */
  end: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** When false the counter stays at 0 (used to defer until scrolled into view). */
  start?: boolean;
}

/** Ease-out cubic: fast start, gentle settle. */
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to `end` using requestAnimationFrame.
 *
 * Under reduced motion the final value is returned directly rather than being
 * written to state from the effect — same result, no extra render pass.
 */
export function useCountUp({ end, duration = 2000, start = true }: UseCountUpOptions): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = start && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(end * easeOut(progress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, shouldAnimate]);

  if (prefersReducedMotion) return start ? end : 0;
  return value;
}
