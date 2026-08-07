'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { fadeInUp, staggerContainer } from '@/lib/motion';

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  /** Portion of the title rendered in the brand gradient. */
  highlight?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level — keeps the document outline correct. */
  as?: 'h2' | 'h3';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300"
        >
          <span className="size-1.5 rounded-full bg-brand-400" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}

      <motion.div variants={fadeInUp}>
        <Heading id={id} className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
          {highlight && <span className="text-gradient-brand"> {highlight}</span>}
        </Heading>
      </motion.div>

      {description && (
        <motion.p
          variants={fadeInUp}
          className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {description}
        </motion.p>
      )}

      <motion.span
        variants={fadeInUp}
        aria-hidden="true"
        className="h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
      />
    </motion.div>
  );
}
