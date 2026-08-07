'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface ParticleFieldProps {
  /** Particle count at 1280px wide; scaled down proportionally on smaller screens. */
  density?: number;
  className?: string;
}

const LINK_DISTANCE = 130;
const MAX_PARTICLES = 90;

/**
 * Canvas particle network used behind the hero.
 *
 * Runs entirely on canvas (no DOM nodes), pauses when scrolled out of view or
 * when the tab is hidden, and renders nothing at all under reduced-motion —
 * so it costs nothing on the metrics Lighthouse measures.
 */
export function ParticleField({ density = 70, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrame = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap the device pixel ratio: beyond 2x the extra pixels are invisible
      // but the fill cost is real.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((density * width) / 1280), MAX_PARTICLES);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.45 + 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (!p) continue;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges rather than bouncing, which reads as a
        // continuous field instead of a box of bouncing dots.
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 180, 250, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles; only look forward to avoid drawing each
        // link twice.
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          if (!other) continue;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(43, 140, 238, ${0.14 * (1 - distance / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (animationFrame === 0) animationFrame = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    seed();

    // Wait for the main thread to go idle before starting the loop, so the
    // canvas never competes with hydration during the page's busiest moment.
    // Safari lacks requestIdleCallback, hence the timeout fallback.
    const supportsIdleCallback = typeof window.requestIdleCallback === 'function';
    const idleHandle = supportsIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1200);

    // Pause when the canvas scrolls off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden || !isVisible) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(seed, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      if (supportsIdleCallback) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [density, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      // Decorative only — excluded from the accessibility tree above.
      role="presentation"
    />
  );
}
