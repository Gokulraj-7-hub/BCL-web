import type { Variants } from 'framer-motion';

/**
 * Shared Framer Motion variants.
 *
 * All transforms are limited to `opacity` and `transform` so they run on the
 * compositor. The global `prefers-reduced-motion` rule in `globals.css`
 * collapses these durations to ~0 for users who ask for less motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Parent variant that staggers its children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Slower stagger for large grids so the cascade stays readable. */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Default `whileInView` viewport config: animate once, when 25% is visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
