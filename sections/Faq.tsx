'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FAQS } from '@/constants/faq';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/utils/cn';
import type { FaqCategory } from '@/types';

type Filter = FaqCategory | 'All';

const CATEGORIES: readonly Filter[] = [
  'All',
  'Training',
  'Internships',
  'Placements',
  'Services',
  'Cyber Security',
  'Software Development',
];

/** Frequently asked questions, filterable by topic. */
export function Faq() {
  const [activeCategory, setActiveCategory] = useState<Filter>('All');

  const visibleFaqs = useMemo(
    () =>
      activeCategory === 'All' ? FAQS : FAQS.filter((faq) => faq.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative section-padding">
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Answers to the questions"
          highlight="we hear most"
          description="Still unsure about something? Send us a message and we will answer it directly."
        />

        <div className="mx-auto mt-10 max-w-4xl">
          {/* Topic filters */}
          <div
            role="group"
            aria-label="Filter questions by topic"
            className="flex flex-wrap justify-center gap-2.5"
          >
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'border-brand-400 bg-brand-500/20 text-white'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8"
          >
            <Accordion key={activeCategory} items={visibleFaqs} />
          </motion.div>

          {/* Fallback CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-brand-500/25 bg-brand-500/[0.06] p-7 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                <MessageSquareText className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Question not answered here?
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Our team usually replies within one business day.
                </p>
              </div>
            </div>
            <Button href="#contact" className="shrink-0">
              Ask Us Directly
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
