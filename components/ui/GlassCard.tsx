import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
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
 * Frosted-glass surface used across the site.
 *
 * A **server component**. The pointer tilt and spotlight are opt-in via data
 * attributes and driven by a single delegated listener (`CardPointerEffects`)
 * mounted once in the root layout. The home page renders around forty of these
 * cards, so giving each its own `mousemove` handler meant forty client
 * components and forty hydration boundaries for an effect that is really just
 * two CSS custom properties.
 */
export function GlassCard({
  children,
  className,
  tilt = false,
  spotlight = false,
  hoverLift = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      data-glass-card=""
      {...(tilt ? { 'data-tilt': '' } : {})}
      {...(spotlight ? { 'data-spotlight': '' } : {})}
      className={cn(
        'group relative overflow-hidden rounded-2xl glass',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        hoverLift && 'hover:border-brand-400/40 hover:shadow-2xl hover:shadow-brand-950/50',
        tilt && 'glass-tilt',
        className,
      )}
      {...props}
    >
      {spotlight && <span aria-hidden="true" className="glass-spotlight" />}
      {children}
    </div>
  );
}
