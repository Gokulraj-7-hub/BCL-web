'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/constants/company';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/utils/cn';

const WHATSAPP_MESSAGE = encodeURIComponent(
  `Hello ${COMPANY.shortName}, I would like to know more about your services.`,
);

/**
 * Floating WhatsApp shortcut (always visible) and a back-to-top control that
 * appears once the visitor has scrolled a reasonable distance.
 *
 * Rendered on every page, so the entrance animation is CSS — importing Framer
 * Motion here would pull the library into the initial bundle site-wide.
 */
export function FloatingActions() {
  const { y } = useScrollPosition();
  const showBackToTop = y > 600;

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="fixed right-4 bottom-4 z-70 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className={cn(
            'grid size-11 animate-enter place-items-center rounded-full border border-white/15',
            'bg-navy-800/90 text-brand-300 shadow-lg backdrop-blur transition-colors',
            'hover:border-brand-400/50 hover:bg-brand-600 hover:text-white sm:size-12',
          )}
          style={{ animationDuration: '0.25s' }}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      )}

      <a
        href={`https://wa.me/${COMPANY.contact.whatsapp}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${COMPANY.shortName} on WhatsApp`}
        className="group relative grid size-13 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-transform duration-300 hover:scale-105 sm:size-14"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden"
        />
        <MessageCircle className="relative size-6 sm:size-7" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-navy-800 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
