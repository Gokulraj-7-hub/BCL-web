'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { GalleryItem } from '@/types';

interface LightboxProps {
  items: readonly GalleryItem[];
  /** Index of the open item, or `null` when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Modal image viewer.
 *
 * Implements the dialog accessibility contract: focus moves into the dialog on
 * open and is trapped inside it, Escape closes, arrow keys navigate, and focus
 * returns to the trigger on close.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const goPrevious = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  // Remember the trigger so focus can be restored when the dialog closes.
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      // Wait for the portal content to mount before moving focus.
      const timer = window.setTimeout(() => dialogRef.current?.focus(), 30);
      return () => window.clearTimeout(timer);
    }
    previouslyFocused.current?.focus?.();
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrevious();
          break;
        case 'Tab': {
          // Simple focus trap across the dialog's focusable controls.
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!first || !last) return;

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, goNext, goPrevious]);

  if (typeof document === 'undefined') return null;

  const active = index !== null ? items[index] : undefined;

  return createPortal(
    <AnimatePresence>
      {isOpen && active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image ${index + 1} of ${items.length}: ${active.caption}`}
            tabIndex={-1}
            className="relative w-full max-w-5xl outline-none"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">{active.caption}</span>
                <span className="mx-2 text-slate-600">•</span>
                {index + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close image viewer"
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </motion.div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-900/80 text-white transition hover:bg-brand-600 sm:-left-16"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-900/80 text-white transition hover:bg-brand-600 sm:-right-16"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
