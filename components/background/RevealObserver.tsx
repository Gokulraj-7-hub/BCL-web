'use client';

import { useEffect } from 'react';

/**
 * Drives every `<Reveal>` on the page from a single IntersectionObserver.
 *
 * Mounted once in the root layout. `Reveal` itself is a server component that
 * only emits a `data-reveal` attribute, so the ~50 reveals on the home page
 * cost one client component between them instead of fifty.
 *
 * Elements are visible by default (see the `.reveal` rules in `globals.css`).
 * This hides the off-screen ones on mount, then reveals each as it scrolls in —
 * that order guarantees content is never stuck invisible if JavaScript fails.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal-state', 'shown');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const register = (element: Element) => {
      if (element.hasAttribute('data-reveal-state')) return;

      const rect = element.getBoundingClientRect();
      const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0;

      if (isOnScreen) {
        // Already visible at mount: show it without a transition so
        // above-the-fold content never flickers.
        element.setAttribute('data-reveal-state', 'shown');
        return;
      }

      element.setAttribute('data-reveal-state', 'hidden');
      observer.observe(element);
    };

    const scan = () => document.querySelectorAll('[data-reveal]').forEach(register);
    scan();

    // Filtered lists (gallery, FAQ) and lazily-loaded sections insert new
    // reveals after mount, so watch for them rather than only scanning once.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.hasAttribute('data-reveal')) register(node);
          node.querySelectorAll?.('[data-reveal]').forEach(register);
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
