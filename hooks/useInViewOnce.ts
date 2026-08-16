'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOnceOptions {
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  /** Grows or shrinks the trigger area, e.g. `'0px 0px -10% 0px'`. */
  rootMargin?: string;
}

/**
 * Reports whether an element has entered the viewport, latching to `true` the
 * first time it does.
 *
 * This exists so `Counter` does not have to import Framer Motion's `useInView`.
 * That single hook drags the whole animation library into whichever chunk uses
 * it — measured at ~69 kB of JavaScript pulled in as soon as a visitor scrolled
 * to the statistics section, for what amounts to one IntersectionObserver.
 * Framer Motion now loads only when the gallery lightbox is opened.
 *
 * @returns A ref to attach to the observed element, and whether it has been seen.
 */
export function useInViewOnce<T extends Element>({
  amount = 0.5,
  rootMargin,
}: UseInViewOnceOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    // Without IntersectionObserver, show the final state rather than nothing.
    if (!element || typeof IntersectionObserver === 'undefined') {
      setHasBeenSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasBeenSeen(true);
          observer.disconnect();
        }
      },
      { threshold: amount, ...(rootMargin ? { rootMargin } : {}) },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  return [ref, hasBeenSeen];
}
