import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/constants/services';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';

/** Premium service cards covering the full BugCap Labs offering. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(43_140_238_/_0.08),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="services-heading"
          eyebrow="Our Services"
          title="End-to-end technology services,"
          highlight="under one roof"
          description="From the first line of code to the firewall in front of it — and the people trained to run both."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <Reveal as="li" key={service.id} className="h-full">
              <GlassCard spotlight className="flex h-full flex-col p-6 sm:p-7">
                {/* Gradient icon tile */}
                <span
                  className={cn(
                    'inline-grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-navy-950/40 transition-transform duration-300 group-hover:scale-110',
                    service.accent,
                  )}
                >
                  <service.icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>

                <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-white/8 pt-5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
                >
                  Discuss your requirement
                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> — {service.title}</span>
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </ul>

        {/* Section CTA */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-brand-500/25 bg-gradient-to-r from-brand-900/40 via-navy-800/60 to-navy-900/60 p-8 text-center sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 cyber-grid opacity-40"
            />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl">Not sure which service you need?</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
                Tell us the problem you are trying to solve. We will scope it honestly and recommend
                the smallest engagement that actually fixes it.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="#contact" size="lg">
                  Request a Consultation
                </Button>
                <Button href="#process" variant="secondary" size="lg">
                  See How We Work
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
