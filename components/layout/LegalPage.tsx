import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { GridBackdrop } from '@/components/background/GridBackdrop';

export interface LegalSection {
  heading: string;
  /** Paragraphs rendered in order. */
  paragraphs?: readonly string[];
  /** Optional bulleted list rendered after the paragraphs. */
  bullets?: readonly string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: readonly LegalSection[];
}

/**
 * Shared layout for the privacy policy and terms pages — a plain, readable
 * document with a correct heading hierarchy (h1 → h2).
 */
export function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <article className="relative overflow-hidden pt-32 pb-20">
      <GridBackdrop withOrbs={false} />

      <Container className="relative max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to homepage
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
        <p className="mt-6 leading-relaxed text-slate-300">{intro}</p>

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl">{section.heading}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-slate-400">
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-slate-400">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
