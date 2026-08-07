/** Height of the sticky navbar, used to offset in-page scroll targets. */
export const NAVBAR_OFFSET = 80;

/**
 * Smooth-scroll to an in-page anchor, accounting for the sticky navbar and
 * honouring the user's reduced-motion preference.
 */
export function scrollToSection(hash: string): void {
  if (typeof window === 'undefined') return;

  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  // Keep the URL and focus in sync so keyboard and screen-reader users land in
  // the right place rather than staying at the top of the document.
  window.history.replaceState(null, '', `#${id}`);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

/** Format a number with Indian digit grouping (e.g. 1,00,000). */
export function formatCount(value: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
}
