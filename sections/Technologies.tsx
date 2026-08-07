'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TECHNOLOGIES } from '@/constants/technologies';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/utils/cn';
import type { Technology } from '@/types';

/**
 * Continuously scrolling technology marquee.
 *
 * The list is duplicated so the CSS translation can loop seamlessly; the
 * duplicate is `aria-hidden` so screen readers only encounter each technology
 * once. The animation pauses on hover and is disabled under reduced motion by
 * the global media query in `globals.css`.
 */
export function Technologies() {
  const firstRow = TECHNOLOGIES.slice(0, Math.ceil(TECHNOLOGIES.length / 2));
  const secondRow = TECHNOLOGIES.slice(Math.ceil(TECHNOLOGIES.length / 2));

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="relative overflow-hidden section-padding"
    >
      <Container>
        <SectionHeading
          id="technologies-heading"
          eyebrow="Technologies"
          title="The stack we build with and"
          highlight="train on"
          description="Current, well-supported technologies chosen for maintainability — not whatever is trending this quarter."
        />
      </Container>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 flex flex-col gap-5"
      >
        <MarqueeRow items={firstRow} direction="left" />
        <MarqueeRow items={secondRow} direction="right" />
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: readonly Technology[];
  direction: 'left' | 'right';
}) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <ul
        className={cn(
          'marquee-track flex w-max gap-4',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse',
        )}
      >
        {items.map((tech) => (
          <TechnologyTile key={tech.name} tech={tech} />
        ))}
        {/* Duplicate set — visual only, so it is hidden from assistive tech. */}
        {items.map((tech) => (
          <TechnologyTile key={`${tech.name}-clone`} tech={tech} aria-hidden />
        ))}
      </ul>
    </div>
  );
}

function TechnologyTile({ tech, 'aria-hidden': ariaHidden }: { tech: Technology; 'aria-hidden'?: boolean }) {
  return (
    <li
      aria-hidden={ariaHidden}
      className="group flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg font-heading text-xs font-bold transition-all duration-300"
        style={{
          color: tech.color,
          backgroundColor: `${tech.color}1A`,
          boxShadow: `0 0 0 1px ${tech.color}33`,
        }}
      >
        {tech.abbr}
      </span>
      <span className="font-heading text-sm font-medium whitespace-nowrap text-slate-300 transition-colors group-hover:text-white">
        {tech.name}
      </span>
    </li>
  );
}
