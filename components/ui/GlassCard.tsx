'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  /** Adds a subtle 3D tilt that follows the pointer. */
  tilt?: boolean;
  /** Adds a radial glow that tracks the pointer across the card. */
  spotlight?: boolean;
  /** Lifts and brightens the border on hover. */
  hoverLift?: boolean;
}

/**
 * Frosted-glass surface used across the site. Pointer effects are written to
 * CSS custom properties so they never trigger a React re-render, and they are
 * disabled entirely when the user prefers reduced motion.
 */
export function GlassCard({
  children,
  className,
  tilt = false,
  spotlight = false,
  hoverLift = true,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const interactive = (tilt || spotlight) && !prefersReducedMotion;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || !interactive) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (spotlight) {
      card.style.setProperty('--spot-x', `${x}px`);
      card.style.setProperty('--spot-y', `${y}px`);
    }

    if (tilt) {
      // Map cursor position to a small rotation, capped at ±6deg.
      const rotateY = ((x - rect.width / 2) / rect.width) * 12;
      const rotateX = ((rect.height / 2 - y) / rect.height) * 12;
      card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn(
        'group relative overflow-hidden rounded-2xl glass',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        hoverLift && 'hover:border-brand-400/40 hover:shadow-2xl hover:shadow-brand-950/50',
        tilt && !prefersReducedMotion && 'preserve-3d',
        className,
      )}
      style={
        tilt && !prefersReducedMotion
          ? {
              transform:
                'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
            }
          : undefined
      }
      {...props}
    >
      {spotlight && !prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(43 140 238 / 0.16), transparent 65%)',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
