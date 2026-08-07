'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
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
            <Link
              href="#home"
              onClick={(event) => handleNavClick(event, '#home')}
              aria-label={`${COMPANY.name} — back to top`}
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
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-400"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${COMPANY.contact.phoneRaw}`}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-300 transition-colors hover:text-brand-300"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="hidden xl:inline">{COMPANY.contact.phone}</span>
                <span className="sr-only xl:hidden">Call {COMPANY.contact.phone}</span>
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[68px] z-80 max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-white/10 glass-strong lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-page py-6">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
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
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5">
                <Button href={`tel:${COMPANY.contact.phoneRaw}`} variant="secondary" fullWidth>
                  <Phone className="size-4" aria-hidden="true" />
                  {COMPANY.contact.phone}
                </Button>
                <Button
                  href="#contact"
                  fullWidth
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get in Touch
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
