import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { STATS } from '@/constants/company';
import { Reveal } from '@/components/ui/Reveal';

/** Animated counters summarising the company's track record. */
export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative overflow-hidden border-y border-white/10 bg-navy-900/50 py-14 md:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 cyber-grid opacity-50 [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
      />

      <Container className="relative">
        <h2 id="stats-heading" className="sr-only">
          BugCap Labs by the numbers
        </h2>

        {/*
          A description list would be the purest semantics here, but each item
          needs an icon alongside the term and value, and `<dl>` only permits
          `<dt>`/`<dd>` (or a single wrapping `<div>` holding just those). A
          list of items reads identically to a screen reader and stays valid.
        */}
        <ul className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat) => (
            <Reveal
              as="li"
              key={stat.label}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span className="grid size-12 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-300 transition-all duration-300 group-hover:scale-110 group-hover:border-brand-400/50 group-hover:bg-brand-500/20">
                <stat.icon className="size-5" aria-hidden="true" />
              </span>

              <span className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-[2.6rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>

              <span className="text-xs font-medium tracking-wide text-slate-400 uppercase sm:text-sm">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
