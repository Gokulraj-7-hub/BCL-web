import { Quote, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/constants/testimonials';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';
import type { Testimonial } from '@/types';

/**
 * Auto-scrolling testimonial slider.
 *
 * Two rows drift in opposite directions and pause on hover or keyboard focus,
 * so a visitor can always stop and read a card. The duplicated track is hidden
 * from assistive technology.
 */
export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowOne = TESTIMONIALS.slice(0, half);
  const rowTwo = TESTIMONIALS.slice(half);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden section-padding"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 cyber-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          title="What students and clients"
          highlight="say about working with us"
          description="Feedback from training participants, interns and the businesses whose systems we build and defend."
        />
      </Container>

      <div className="relative mt-14 flex flex-col gap-5">
        <TestimonialRow items={rowOne} direction="left" />
        <TestimonialRow items={rowTwo} direction="right" />
      </div>
    </section>
  );
}

function TestimonialRow({
  items,
  direction,
}: {
  items: readonly Testimonial[];
  direction: 'left' | 'right';
}) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <ul
        className={cn(
          'marquee-track flex w-max gap-5 focus-within:[animation-play-state:paused]',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse',
        )}
        style={{ animationDuration: '55s' }}
      >
        {items.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
        {items.map((testimonial) => (
          <TestimonialCard key={`${testimonial.id}-clone`} testimonial={testimonial} aria-hidden />
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  'aria-hidden': ariaHidden,
}: {
  testimonial: Testimonial;
  'aria-hidden'?: boolean;
}) {
  return (
    <li aria-hidden={ariaHidden} className="w-[19rem] shrink-0 sm:w-[23rem]">
      <Reveal
        as="figure"
        className="flex h-full flex-col rounded-2xl glass p-6 transition-colors duration-300 hover:border-brand-400/35"
      >
        <div className="flex items-start justify-between gap-3">
          <Quote className="size-7 shrink-0 text-brand-500/50" aria-hidden="true" />
          <span className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-brand-300 uppercase">
            {testimonial.category}
          </span>
        </div>

        <div
          className="mt-4 flex items-center gap-0.5"
          role="img"
          aria-label={`Rated ${testimonial.rating} out of 5`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={cn(
                'size-3.5',
                index < testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-700 text-slate-700',
              )}
              aria-hidden="true"
            />
          ))}
        </div>

        <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
          “{testimonial.quote}”
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
          {/* Initials avatar — no stock photography of people who do not exist. */}
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-heading text-sm font-bold text-white"
          >
            {getInitials(testimonial.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">
              {testimonial.name}
            </span>
            <span className="block truncate text-xs text-slate-400">
              {testimonial.role}
              {testimonial.company ? `, ${testimonial.company}` : ''}
            </span>
          </span>
        </figcaption>
      </Reveal>
    </li>
  );
}

/** First letters of the first two words, e.g. "Placeholder Name" -> "PN". */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}
