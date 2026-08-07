'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

/**
 * Brief page loader shown while the first paint settles.
 *
 * It is time-boxed and `aria-hidden`, and dismisses on `window.load` (or after
 * a short ceiling) so it can never block content from users or crawlers.
 */
export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismiss = () => setIsVisible(false);

    // Hard ceiling so a slow third-party asset can never keep the overlay up.
    const timeout = window.setTimeout(dismiss, 1600);

    if (document.readyState === 'complete') {
      const settle = window.setTimeout(dismiss, 450);
      return () => {
        window.clearTimeout(settle);
        window.clearTimeout(timeout);
      };
    }

    window.addEventListener('load', dismiss);
    return () => {
      window.removeEventListener('load', dismiss);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-200 grid place-items-center bg-navy-950"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Logo size={64} withText={false} />
            </motion.div>

            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-brand-400 to-transparent"
              />
            </div>

            <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
              Securing Future By Today
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
