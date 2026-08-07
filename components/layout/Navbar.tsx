'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/constants/navigation';
import { COMPANY } from '@/constants/company';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { scrollToSection } from '@/utils/dom';
import { cn } from '@/utils/cn';

/**
 * Sticky navigation: transparent over the hero, solid glass once scrolled.
 * Includes a scroll-spy highlight and a full-screen mobile drawer.
 *
 * Animation here is CSS rather than Framer Motion. The navbar renders on every
 * page, so importing the animation library from it would put ~45 kB into the
 * initial bundle for effects a transition handles just as well.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrolled, progress } = useScrollPosition(40);

  const sectionIds = useMemo(
    () => NAV_ITEMS.map((item) => item.sectionId).filter((id): id is string => Boolean(id)),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  useLockBodyScroll(isMenuOpen);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMenuOpen(false);
    scrollToSection(href);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only-focusable fixed top-3 left-3 z-200 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-90 transition-all duration-300',
          scrolled
            ? 'glass-strong border-b border-white/10 py-2 shadow-lg shadow-navy-950/50'
            : 'border-b border-transparent bg-transparent py-4',
        )}
      >
        <nav aria-label="Main navigation" className="container-page">
          <div className="flex items-center justify-between gap-4">
            {/*
              No `aria-label` here: WCAG 2.5.3 requires the accessible name to
              contain the visible text, and the logo's wordmark already reads
              "BugCap Labs Pvt. Ltd." — overriding it with a different string
              would break voice-control users saying what they can see.
            */}
            <Link
              href="#home"
              onClick={(event) => handleNavClick(event, '#home')}
              className="rounded-lg transition-opacity hover:opacity-85"
            >
              <Logo size={scrolled ? 36 : 42} />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = item.sectionId === activeSection;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                        isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-400 transition-transform duration-300',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              {/*
                The number is hidden below `xl` to save space, so the label
                lives on the anchor itself — that keeps one accessible name at
                every breakpoint instead of duplicating it in an sr-only span.
              */}
              <a
                href={`tel:${COMPANY.contact.phoneRaw}`}
                aria-label={`Call ${COMPANY.shortName} on ${COMPANY.contact.phone}`}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-300 transition-colors hover:text-brand-300"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="hidden xl:inline">{COMPANY.contact.phone}</span>
              </a>
              <Button href="#contact" size="sm">
                Get in Touch
              </Button>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Reading-progress bar */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-500 to-brand-300 transition-opacity',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/*
        Mobile drawer. Unmounted when closed so its links never become hidden
        keyboard traps; the entrance animation is CSS.
      */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          // Near-opaque rather than frosted: at this size the hero copy showed
          // through the glass and made the menu unreadable.
          className="fixed inset-x-0 top-[68px] z-80 max-h-[calc(100dvh-68px)] animate-enter overflow-y-auto border-b border-white/10 bg-navy-950/98 shadow-2xl shadow-navy-950 backdrop-blur-xl lg:hidden"
          style={{ animationDuration: '0.25s' }}
        >
          <nav aria-label="Mobile navigation" className="container-page py-6">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className="animate-enter"
                  style={{ animationDelay: `${index * 40}ms`, animationDuration: '0.25s' }}
                >
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    aria-current={item.sectionId === activeSection ? 'page' : undefined}
                    className={cn(
                      'block rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                      item.sectionId === activeSection
                        ? 'bg-brand-500/12 text-brand-300'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5">
              <Button href={`tel:${COMPANY.contact.phoneRaw}`} variant="secondary" fullWidth>
                <Phone className="size-4" aria-hidden="true" />
                {COMPANY.contact.phone}
              </Button>
              <Button href="#contact" fullWidth onClick={() => setIsMenuOpen(false)}>
                Get in Touch
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
