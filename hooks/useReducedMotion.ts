'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Tracks the `prefers-reduced-motion` media query.
 *
 * Returns `false` during SSR and the first paint so markup is deterministic;
 * heavy animations should be gated on this and disabled when it becomes true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
