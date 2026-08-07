import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';

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

/**
 * Shared section heading: eyebrow, gradient-highlighted title, description and
 * an accent rule, revealed with a short stagger as it scrolls into view.
 *
 * A server component — `Reveal` is the only client code involved.
 */
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
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal
          as="span"
          className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase"
        >
          <span className="size-1.5 rounded-full bg-brand-400" aria-hidden="true" />
          {eyebrow}
        </Reveal>
      )}

      <Reveal delay={80}>
        <Heading id={id} className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
          {highlight && <span className="text-gradient-brand"> {highlight}</span>}
        </Heading>
      </Reveal>

      {description && (
        <Reveal
          as="p"
          delay={160}
          className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {description}
        </Reveal>
      )}

      <Reveal
        as="span"
        delay={240}
        aria-hidden="true"
        className="h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
      />
    </div>
  );
}
