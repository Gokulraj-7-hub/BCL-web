'use client';

import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Soft glow that follows the pointer.
 *
 * Position is written straight to the element's transform inside a single
 * animation frame — no React state, so pointer movement never triggers a
 * re-render. Disabled on touch devices and under reduced motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const hasFinePointer = useMediaQuery('(pointer: fine)');
  const prefersReducedMotion = useReducedMotion();
  const enabled = hasFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const glow = glowRef.current;
    if (!glow) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      // Exponential smoothing gives the glow a slight trailing lag.
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = '1';
    };

    const onPointerLeave = () => {
      glow.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 size-150 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(43,140,238,0.08) 0%, rgba(43,140,238,0.03) 40%, transparent 70%)',
      }}
    />
  );
}
