'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the `prefers-reduced-motion` media query.
 *
 * Returns `false` during SSR and the first paint so markup is deterministic;
 * heavy animations should be gated on this and disabled when it becomes true.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
