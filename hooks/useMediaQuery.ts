'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query.
 *
 * @param query A media query string, e.g. `(min-width: 768px)`.
 * @returns Whether the query currently matches (always `false` on the server).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
