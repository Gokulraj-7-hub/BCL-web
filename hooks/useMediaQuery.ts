'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a CSS media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`: a
 * media query list *is* an external store, and this avoids the cascading
 * render that setting state from an effect body causes on mount.
 *
 * @param query A media query string, e.g. `(min-width: 768px)`.
 * @returns Whether the query currently matches (always `false` on the server).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // The server has no viewport, so render the non-matching branch and let the
  // client correct it on hydration.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
