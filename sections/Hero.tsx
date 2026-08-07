import { ArrowRight, GraduationCap, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TypedText } from '@/components/ui/TypedText';
import { GridBackdrop } from '@/components/background/GridBackdrop';
import { ParticleField } from '@/components/background/ParticleField';
import { HeroVisual } from '@/sections/HeroVisual';
import { COMPANY, HERO_HIGHLIGHTS } from '@/constants/company';

/**
 * Full-screen hero: headline, rotating specialisation line, primary calls to
 * action, and an animated cyber-shield visual on the right.
 *
 * This is a server component and its entrance animations are pure CSS. The
 * headline is the Largest Contentful Paint element, so it is rendered at full
 * opacity in the initial HTML rather than being faded in by JavaScript.
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
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <div
              className="inline-flex animate-enter items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-xs font-medium text-brand-200 sm:text-sm"
              style={{ animationDelay: '80ms' }}
            >
              <Sparkles className="size-3.5 text-brand-400" aria-hidden="true" />
              {COMPANY.tagline}
              <span className="hidden text-slate-400 sm:inline" aria-hidden="true">
                •
              </span>
              <span className="hidden text-slate-400 sm:inline">Erode, Tamil Nadu</span>
            </div>

            {/* No entrance animation — this is the LCP element. */}
            <h1
              id="hero-heading"
              className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
            >
              Securing the Future Through{' '}
              <span className="text-gradient-brand">Technology &amp; Innovation</span>
            </h1>

            <p
              className="min-h-[3.5rem] animate-enter text-lg text-slate-300 sm:min-h-0 sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              <span className="text-slate-400">We specialise in </span>
              <TypedText
                phrases={HERO_HIGHLIGHTS}
                className="font-heading font-semibold text-brand-300"
              />
            </p>

            <p
              className="max-w-xl animate-enter text-base leading-relaxed text-slate-400"
              style={{ animationDelay: '240ms' }}
            >
              {COMPANY.name} builds and defends the systems businesses depend on — and trains the
              engineers who will run them. From custom software and cloud infrastructure to
              penetration testing, digital forensics and industry-ready internships.
            </p>

            <div
              className="flex animate-enter flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: '320ms' }}
            >
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
            </div>

            <ul
              className="mt-2 flex animate-enter flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
              style={{ animationDelay: '400ms' }}
            >
              {['500+ students trained', '150+ projects delivered', '100+ business clients'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-brand-400" aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Visual */}
          <div className="animate-enter-right lg:col-span-5" style={{ animationDelay: '200ms' }}>
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 hidden animate-enter justify-center lg:flex"
        style={{ animationDelay: '900ms' }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <span className="size-1.5 animate-float rounded-full bg-brand-400" />
        </div>
      </div>
    </section>
  );
}
