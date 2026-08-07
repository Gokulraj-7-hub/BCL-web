import { Building2, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { COMPANY, CORE_VALUES, MISSION_VISION, TIMELINE } from '@/constants/company';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';

/**
 * Company overview: who we are, mission and vision, core values, and an
 * animated timeline of the company's milestones.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 cyber-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="about-heading"
          eyebrow="Who We Are"
          title="A technology partner built on"
          highlight="engineering and trust"
          description={`Founded in ${COMPANY.founded} in Erode, Tamil Nadu, ${COMPANY.name} works at the intersection of building software and defending it — with a training academy that turns students into hireable engineers.`}
        />

        {/* Introduction + mission/vision */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal direction="left" className="lg:col-span-5">
            <GlassCard spotlight className="h-full p-7 sm:p-8">
              <span className="inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/40">
                <Building2 className="size-6" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-2xl">Who We Are</h3>

              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                <p>
                  BugCap Labs is a private limited technology company delivering software
                  development, cyber security, cloud infrastructure, digital forensics and hardware
                  &amp; networking services to businesses across Tamil Nadu and beyond.
                </p>
                <p>
                  Alongside our client work, we run a professional training academy. The two sides
                  feed each other: our trainers are practitioners, and our project teams are staffed
                  by people we trained ourselves.
                </p>
              </div>

              <figure className="mt-6 rounded-xl border border-brand-500/20 bg-brand-500/[0.06] p-5">
                <Quote className="size-5 text-brand-400" aria-hidden="true" />
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-300 italic">
                  “We do not treat security as a feature you bolt on at the end. It is the way the
                  system is designed from the first line of code.”
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-white">{COMPANY.director.name}</span>
                  <span className="mt-0.5 block text-xs tracking-wide text-brand-400 uppercase">
                    {COMPANY.director.title}, {COMPANY.shortName}
                  </span>
                </figcaption>
              </figure>
            </GlassCard>
          </Reveal>

          <Reveal direction="right" className="flex flex-col gap-6 lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {[MISSION_VISION.mission, MISSION_VISION.vision].map((item) => (
                <GlassCard key={item.title} tilt className="p-6 sm:p-7">
                  <span className="inline-grid size-11 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-brand-300">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
                </GlassCard>
              ))}
            </div>

            {/* Core values */}
            <div>
              <h3 className="text-xl">Core Values</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {CORE_VALUES.map((value) => (
                  <Reveal as="li" key={value.title}>
                    <div className="group flex h-full gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:border-brand-400/35 hover:bg-brand-500/[0.05]">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-500/12 text-brand-300 transition-transform duration-300 group-hover:scale-110">
                        <value.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-heading text-base font-semibold text-white">
                          {value.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <h3 className="text-center text-2xl sm:text-3xl">Our Journey</h3>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-400 sm:text-base">
            Five years of steady growth, from a small development shop to a full-service technology
            and training company.
          </p>

          <ol className="relative mt-12">
            {/* Spine: left-aligned on mobile, centred from `md` up. */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-transparent via-brand-500/40 to-transparent md:left-1/2 md:-translate-x-1/2"
            />

            {TIMELINE.map((event, index) => {
              // Alternate sides from `md` up; single column below that.
              const isLeft = index % 2 === 0;

              return (
                <Reveal
                  as="li"
                  key={event.year}
                  className={cn(
                    'relative mb-8 pl-12 last:mb-0 md:mb-12 md:w-1/2 md:pl-0',
                    isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-6 left-[0.55rem] z-10 grid size-4 place-items-center rounded-full border-2 border-brand-400 bg-navy-950 md:top-7',
                      isLeft ? 'md:right-[-0.55rem] md:left-auto' : 'md:left-[-0.55rem]',
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-brand-400" />
                  </span>

                  <GlassCard hoverLift className={cn('p-6', isLeft && 'md:text-right')}>
                    <span className="inline-block rounded-full bg-brand-500/15 px-3 py-1 font-heading text-sm font-bold text-brand-300">
                      {event.year}
                    </span>
                    <h4 className="mt-3 font-heading text-lg font-semibold text-white">
                      {event.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {event.description}
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
