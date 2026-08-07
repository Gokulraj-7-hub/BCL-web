'use client';

import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TypedText } from '@/components/ui/TypedText';
import { GridBackdrop } from '@/components/background/GridBackdrop';
import { ParticleField } from '@/components/background/ParticleField';
import { HeroVisual } from '@/sections/HeroVisual';
import { COMPANY, HERO_HIGHLIGHTS } from '@/constants/company';
import { fadeInUp, slideInRight, staggerContainer } from '@/lib/motion';

/**
 * Full-screen hero: headline, rotating specialisation line, primary calls to
 * action, and an animated cyber-shield visual on the right.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      <GridBackdrop />
      <ParticleField className="absolute inset-0 size-full" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 lg:col-span-7"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-xs font-medium text-brand-200 sm:text-sm"
            >
              <Sparkles className="size-3.5 text-brand-400" aria-hidden="true" />
              {COMPANY.tagline}
              <span className="hidden text-slate-500 sm:inline">•</span>
              <span className="hidden text-slate-400 sm:inline">Erode, Tamil Nadu</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              id="hero-heading"
              className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
            >
              Securing the Future Through{' '}
              <span className="text-gradient-brand">Technology &amp; Innovation</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="min-h-[3.5rem] text-lg text-slate-300 sm:min-h-0 sm:text-xl"
            >
              <span className="text-slate-400">We specialise in </span>
              <TypedText
                phrases={HERO_HIGHLIGHTS}
                className="font-heading font-semibold text-brand-300"
              />
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-base leading-relaxed text-slate-400"
            >
              {COMPANY.name} builds and defends the systems businesses depend on — and trains the
              engineers who will run them. From custom software and cloud infrastructure to
              penetration testing, digital forensics and industry-ready internships.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#services" size="lg">
                Explore Services
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                <Mail className="size-4" aria-hidden="true" />
                Contact Us
              </Button>
              <Button href="#internships" variant="outline" size="lg">
                <GraduationCap className="size-4" aria-hidden="true" />
                Apply for Internship
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
            >
              {[
                '500+ students trained',
                '150+ projects delivered',
                '100+ business clients',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-brand-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <span className="size-1.5 animate-float rounded-full bg-brand-400" />
        </div>
      </motion.div>
    </section>
  );
}
