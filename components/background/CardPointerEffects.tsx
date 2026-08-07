'use client';

import { useEffect } from 'react';

/** Maximum tilt in degrees at the card's corners. */
const MAX_TILT = 6;

/**
 * Drives the pointer tilt and spotlight for every `GlassCard` from one
 * delegated listener.
 *
 * Mounted once in the root layout. `GlassCard` is a server component that only
 * marks itself with `data-tilt` / `data-spotlight`; this finds the card under
 * the pointer and writes CSS custom properties to it. Nothing here touches
 * React state, so pointer movement never causes a re-render — and the ~40
 * cards on the home page share a single client component instead of each
 * being one.
 *
 * Skipped entirely on touch devices and under reduced motion.
 */
export function CardPointerEffects() {
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;
    let activeCard: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;

      const { card, x, y } = pending;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const localX = x - rect.left;
      const localY = y - rect.top;

      if (card.hasAttribute('data-spotlight')) {
        card.style.setProperty('--spot-x', `${localX}px`);
        card.style.setProperty('--spot-y', `${localY}px`);
      }

      if (card.hasAttribute('data-tilt')) {
        const rotateY = ((localX - rect.width / 2) / rect.width) * MAX_TILT * 2;
        const rotateX = ((rect.height / 2 - localY) / rect.height) * MAX_TILT * 2;
        card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      }
    };

    const resetCard = (card: HTMLElement) => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const card = target.closest<HTMLElement>('[data-glass-card]');

      if (card !== activeCard) {
        if (activeCard) resetCard(activeCard);
        activeCard = card;
      }

      if (!card) return;
      if (!card.hasAttribute('data-tilt') && !card.hasAttribute('data-spotlight')) return;

      // Coalesce to one write per frame regardless of pointer event rate.
      pending = { card, x: event.clientX, y: event.clientY };
      if (frame === 0) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      if (frame) cancelAnimationFrame(frame);
      if (activeCard) resetCard(activeCard);
    };
  }, []);

  return null;
}
