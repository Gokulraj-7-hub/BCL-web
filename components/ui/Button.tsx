'use client';

import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { scrollToSection } from '@/utils/dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-500/35 hover:from-brand-500 hover:to-brand-400',
  secondary: 'glass text-white hover:bg-white/10 hover:border-brand-400/40',
  outline:
    'border border-brand-500/50 text-brand-200 hover:bg-brand-500/10 hover:border-brand-400 hover:text-white',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2.5',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a spinner and blocks interaction. */
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  /** When set, renders an anchor. In-page hashes get smooth scrolling. */
  href?: string;
  /** Opens the link in a new tab with safe `rel` attributes. */
  external?: boolean;
}

/**
 * Shared button. Renders a `<button>` by default and an `<a>` when `href` is
 * supplied, so links stay real links for keyboard and screen-reader users.
 */
export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      href,
      external = false,
      className,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) {
    const classes = cn(
      'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold',
      'transition-all duration-300 ease-out will-change-transform',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
      'disabled:pointer-events-none disabled:opacity-55',
      'hover:-translate-y-0.5 active:translate-y-0',
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      fullWidth && 'w-full',
      className,
    );

    // Shine sweep on hover — purely decorative.
    const shine = (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
      />
    );

    if (href) {
      const isHashLink = href.startsWith('#');

      const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (isHashLink) {
          event.preventDefault();
          scrollToSection(href);
        }
        onClick?.(event as unknown as MouseEvent<HTMLButtonElement>);
      };

      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          onClick={handleAnchorClick}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {shine}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        onClick={onClick}
        {...props}
      >
        {shine}
        <span className="relative z-10 inline-flex items-center gap-2">
          {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {children}
        </span>
      </button>
    );
  },
);
