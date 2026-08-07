'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy. Watches the given section ids and returns the one currently
 * closest to the top of the viewport, for highlighting the active nav link.
 *
 * @param sectionIds Section element ids, in document order.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section so overlapping tall sections
        // don't cause the highlight to jump backwards.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Trigger when a section crosses the upper third of the viewport.
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
