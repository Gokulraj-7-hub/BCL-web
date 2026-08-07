'use client';

import { useEffect, useState } from 'react';

export interface ScrollState {
  /** Current vertical scroll offset in pixels. */
  y: number;
  /** True once the page has scrolled past `threshold`. */
  scrolled: boolean;
  /** Scroll progress through the document, 0–1. */
  progress: number;
}

/**
 * Reports scroll position, throttled to one update per animation frame so it
 * never blocks the main thread on fast scrolls.
 */
export function useScrollPosition(threshold = 40): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, scrolled: false, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        y,
        scrolled: y > threshold,
        progress: scrollable > 0 ? Math.min(y / scrollable, 1) : 0,
      });
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
