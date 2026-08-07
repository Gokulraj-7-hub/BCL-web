'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Check, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { TRAINING_BENEFITS, TRAINING_TRACKS } from '@/constants/training';
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Professional training catalogue, grouped into tracks. */
export function Training() {
  return (
    <section id="training" aria-labelledby="training-heading" className="relative section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 cyber-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="training-heading"
          eyebrow="Professional Training"
          title="Industry-grade training that ends in"
          highlight="a job-ready engineer"
          description="Instructor-led programs with roughly 70% lab time, a real capstone project and placement assistance built in."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Track grid */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-8"
          >
            {TRAINING_TRACKS.map((track) => (
              <motion.li key={track.id} variants={fadeInUp}>
                <GlassCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-300 transition-transform duration-300 group-hover:scale-110">
                      <track.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{track.title}</h3>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {track.courses.map((course) => (
                      <li
                        key={course}
                        className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-brand-400/35 hover:bg-brand-500/10 hover:text-brand-200"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.li>
            ))}
          </motion.ul>

          {/* Benefits panel */}
          <motion.aside
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-4"
          >
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-brand-500/25 bg-gradient-to-b from-brand-900/40 to-navy-900/70 p-7">
              <span className="inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/40">
                <GraduationCap className="size-6" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-xl">What every program includes</h3>

              <ul className="mt-5 flex flex-col gap-3">
                {TRAINING_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <BadgeCheck className="size-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-slate-400">
                  Batches run online, offline at our Erode facility, or hybrid — with flexible
                  weekday and weekend timings.
                </p>
              </div>

              <Button href="#contact" fullWidth className="mt-6">
                Enquire About a Batch
              </Button>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
