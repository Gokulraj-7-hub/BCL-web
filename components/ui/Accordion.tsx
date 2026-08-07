'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  /** Allow more than one panel open at a time. */
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accessible accordion.
 *
 * Each header is a real `<button>` carrying `aria-expanded` and
 * `aria-controls`, and each panel is labelled by its header — so screen
 * readers announce state correctly and keyboard users get native Tab/Enter
 * behaviour without extra key handling.
 */
export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((openId) => openId !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `${baseId}-header-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-xl border transition-colors duration-300',
              isOpen
                ? 'border-brand-500/40 bg-brand-500/[0.06]'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20',
            )}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span
                  className={cn(
                    'font-heading text-base font-semibold transition-colors sm:text-lg',
                    isOpen ? 'text-brand-200' : 'text-white',
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-45 border-brand-400 bg-brand-500 text-white'
                      : 'border-white/15 bg-white/5 text-brand-300',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6 sm:pb-6 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
