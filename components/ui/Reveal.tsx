import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'none';

interface RevealProps {
  /** Optional so the component can render as a decorative empty rule. */
  children?: ReactNode;
  /** Forwarded to the rendered element (e.g. `aria-hidden`, `role`). */
  [key: `aria-${string}`]: string | boolean | undefined;
  role?: string;
  className?: string;
  /** Direction the element travels from. */
  direction?: RevealDirection;
  /** Delay before the transition starts, in milliseconds. */
  delay?: number;
  /** Element to render as — defaults to `div`. */
  as?: ElementType;
}

/**
 * Scroll-reveal wrapper: fades content in the first time it enters the
 * viewport.
 *
 * This is a **server component**. It renders nothing but a `data-reveal`
 * attribute; a single `RevealObserver` mounted once in the root layout finds
 * every marked element and drives the transitions. That indirection is the
 * whole point — the page uses this wrapper around 50 times, and making each
 * one its own client component created 50 hydration boundaries. One shared
 * IntersectionObserver does the same work for a fraction of the main-thread
 * cost.
 *
 * It replaced Framer Motion's `whileInView` for the same reason at a larger
 * scale: Framer is ~227 kB, and because `next/dynamic` inside a Server
 * Component still server-renders the section and preloads its client chunk,
 * importing it across a dozen sections put the whole library on the critical
 * path.
 *
 * Content is styled **visible by default** and only hidden once JavaScript
 * confirms it is off-screen. That ordering means the server-rendered HTML is
 * fully readable to crawlers, to visitors without JavaScript, and if hydration
 * ever fails — a component that starts at `opacity: 0` would leave the page
 * blank in all three cases.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  as: Component = 'div',
  ...rest
}: RevealProps) {
  return (
    <Component
      data-reveal={direction}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
