import { cn } from '@/utils/cn';

interface GridBackdropProps {
  className?: string;
  /** Adds animated gradient orbs behind the grid. */
  withOrbs?: boolean;
}

/**
 * Decorative cyber-grid backdrop with gradient lighting.
 *
 * Server component — this is pure CSS with no interactivity, so it ships zero
 * JavaScript to the client.
 */
export function GridBackdrop({ className, withOrbs = true }: GridBackdropProps) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {/* Grid lines, faded out towards the edges. */}
      <div className="absolute inset-0 cyber-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {withOrbs && (
        <>
          <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand-600/20 blur-[110px] animate-pulse-glow" />
          <div
            className="absolute top-1/3 -right-32 size-[32rem] rounded-full bg-brand-500/15 blur-[130px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className="absolute -bottom-40 left-1/3 size-[26rem] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-glow"
            style={{ animationDelay: '3s' }}
          />
        </>
      )}

      {/* Vignette that anchors content against the background. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950" />
    </div>
  );
}
