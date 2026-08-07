import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { WHY_CHOOSE_US } from '@/constants/services';
import { COMPANY } from '@/constants/company';
import { Reveal } from '@/components/ui/Reveal';

/** Animated feature grid explaining what sets BugCap Labs apart. */
export function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className="relative section-padding">
      <Container>
        <SectionHeading
          id="why-us-heading"
          eyebrow="Why Choose Us"
          title="Why teams and students choose"
          highlight={COMPANY.shortName}
          description="Eight reasons businesses trust us with their systems and students trust us with their careers."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((feature) => (
            <Reveal as="li" key={feature.title}>
              <GlassCard tilt spotlight className="h-full p-6">
                {/* Icon tile */}
                <span className="relative inline-grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500/25 to-brand-700/15 text-brand-300 transition-all duration-300 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/30">
                  <feature.icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>

                {/* Bottom accent that grows on hover. */}
                <span
                  aria-hidden="true"
                  className="mt-5 block h-0.5 w-8 rounded-full bg-brand-500/50 transition-all duration-300 group-hover:w-16 group-hover:bg-brand-400"
                />
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
