'use client';

import { Award, CalendarDays, GraduationCap, MonitorSmartphone, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { INTERNSHIPS } from '@/constants/training';
import { Reveal } from '@/components/ui/Reveal';
import { scrollToSection } from '@/utils/dom';
import type { InternshipProgram } from '@/types';

/** Internship program cards with duration, mode, eligibility and skills. */
export function Internships() {
  return (
    <section
      id="internships"
      aria-labelledby="internships-heading"
      className="relative section-padding"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(43_140_238_/_0.08),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="internships-heading"
          eyebrow="Internship Programs"
          title="Structured internships that produce"
          highlight="something you can show"
          description="A real deliverable, a named mentor, a review cadence and a verifiable certificate — across five specialisations."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {INTERNSHIPS.map((program) => (
            <Reveal as="li" key={program.id} className="h-full">
              <InternshipCard program={program} />
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-400">
          Applications are open year-round. Mention your preferred track, duration and start month
          in the contact form and our team will get back to you with the batch schedule.
        </Reveal>
      </Container>
    </section>
  );
}

function InternshipCard({ program }: { program: InternshipProgram }) {
  const details = [
    { label: 'Duration', value: program.duration, Icon: CalendarDays },
    { label: 'Mode', value: program.mode, Icon: MonitorSmartphone },
    { label: 'Eligibility', value: program.eligibility, Icon: GraduationCap },
    { label: 'Certificate', value: program.certificate, Icon: Award },
  ] as const;

  return (
    <GlassCard
      spotlight
      className={`flex h-full flex-col p-6 sm:p-7 ${
        program.popular ? 'border-brand-400/35 ring-1 ring-brand-500/20' : ''
      }`}
    >
      {program.popular && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-200 uppercase">
          <Sparkles className="size-3" aria-hidden="true" />
          Popular
        </span>
      )}

      <span className="inline-grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/40 transition-transform duration-300 group-hover:scale-110">
        <program.icon className="size-6" aria-hidden="true" />
      </span>

      <h3 className="mt-5 font-heading text-xl font-semibold text-white">
        {program.title} Internship
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{program.description}</p>

      {/*
        `<dl>` only allows `<dt>`/`<dd>` children (or one wrapping `<div>` that
        contains nothing else), which cannot accommodate the icon column. A
        list conveys the same label/value pairing and stays valid.
      */}
      <ul className="mt-5 flex flex-col gap-3 border-t border-white/8 pt-5">
        {details.map(({ label, value, Icon }) => (
          <li key={label} className="flex gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-brand-400">
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {label}
              </p>
              <p className="mt-0.5 text-sm leading-snug text-slate-300">{value}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-white/8 pt-5">
        <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Skills Covered
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {program.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-lg border border-brand-500/20 bg-brand-500/[0.08] px-2.5 py-1 text-xs font-medium text-brand-200"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <Button
        href="#contact"
        fullWidth
        className="mt-6"
        variant={program.popular ? 'primary' : 'secondary'}
        onClick={() => {
          // Pre-fill the contact subject so the enquiry arrives already tagged.
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(
              'bcl:contact-subject',
              `Internship Application — ${program.title}`,
            );
            window.dispatchEvent(new CustomEvent('bcl:prefill-contact'));
          }
          scrollToSection('#contact');
        }}
      >
        Apply Now
        <span className="sr-only"> for the {program.title} internship</span>
      </Button>
    </GlassCard>
  );
}
