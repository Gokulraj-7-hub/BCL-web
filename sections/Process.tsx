'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { PROCESS_STEPS } from '@/constants/services';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Development-process timeline.
 *
 * GSAP ScrollTrigger scrubs the progress line against scroll position, which
 * is far smoother than re-rendering React on every frame.
 *
 * Loading is gated twice over: the import only fires once the section nears
 * the viewport, and only after the main thread goes idle. Importing it on
 * mount pulled ~93 kB and a full ScrollTrigger layout pass into the page's
 * busiest moment, which Lighthouse charged straight to Total Blocking Time.
 */
export function Process() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const loadScrollTrigger = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      // The effect may have been torn down while the chunks were in flight.
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const animation = gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      );

      cleanup = () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    };

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => void loadScrollTrigger(), { timeout: 1500 });
      } else {
        window.setTimeout(() => void loadScrollTrigger(), 400);
      }
    };

    // Start fetching a screen ahead so the line is ready before it is seen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          scheduleLoad();
        }
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  return (
    <section id="process" aria-labelledby="process-heading" className="relative section-padding">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="A delivery process with"
          highlight="no surprises"
          description="Seven stages, each with a defined output you sign off before we move to the next."
        />

        <div ref={containerRef} className="relative mx-auto mt-14 max-w-4xl">
          {/* Static rail */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-6 h-full w-0.5 rounded-full bg-white/8 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Scroll-scrubbed progress fill */}
          <span
            ref={lineRef}
            aria-hidden="true"
            className="absolute top-0 left-6 h-full w-0.5 origin-top rounded-full bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="relative flex flex-col gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <Reveal
                  as="li"
                  key={step.step}
                  className={`relative pl-16 md:w-1/2 md:pl-0 ${
                    isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  {/* Step marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-5 left-6 z-10 grid size-9 -translate-x-1/2 place-items-center rounded-full border-2 border-brand-500 bg-navy-950 font-heading text-sm font-bold text-brand-300 md:left-auto ${
                      isLeft ? 'md:right-[-1.125rem] md:translate-x-0' : 'md:left-[-1.125rem]'
                    }`}
                  >
                    {step.step}
                  </span>

                  <GlassCard className="p-6">
                    <div
                      className={`flex items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-300">
                        <step.icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-white">
                        <span className="sr-only">Step {step.step}: </span>
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </GlassCard>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
