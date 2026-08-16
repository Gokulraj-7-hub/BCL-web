'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Expand } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/constants/gallery';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';
import type { GalleryCategory } from '@/types';

/**
 * The lightbox is the one place Framer Motion genuinely earns its weight — a
 * modal needs a real exit animation, which CSS cannot express on unmount.
 *
 * Loading it from this client component with `ssr: false` means the library is
 * fetched only when a visitor actually opens an image. (The same `dynamic()`
 * call inside a Server Component would still server-render the modal and
 * preload its chunk, putting Framer Motion back on the critical path.)
 */
const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox), {
  ssr: false,
});

type Filter = GalleryCategory | 'All';

const FILTERS: readonly Filter[] = ['All', ...GALLERY_CATEGORIES];

/** Filterable gallery grid with an accessible lightbox preview. */
export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Latches on the first open. Rendering <Lightbox> unconditionally — even
  // with index={null} — resolves its dynamic import as soon as this section
  // mounts, which measured at 69 kB of JavaScript fetched on scroll for
  // visitors who never open an image. Gating on this defers it to the click,
  // and keeping it mounted afterwards preserves the modal's exit animation.
  const [hasOpenedLightbox, setHasOpenedLightbox] = useState(false);

  const openLightbox = (index: number) => {
    setHasOpenedLightbox(true);
    setLightboxIndex(index);
  };

  const visibleItems = useMemo(
    () =>
      activeFilter === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const handleFilterChange = (filter: Filter) => {
    setActiveFilter(filter);
    // Indices refer to the filtered list, so close any open preview.
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="relative section-padding">
      <Container>
        <SectionHeading
          id="gallery-heading"
          eyebrow="Gallery"
          title="Inside BugCap Labs —"
          highlight="training, teams and events"
          description="Moments from our classrooms, labs, workshops, hackathons and campus outreach."
        />

        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter gallery by category"
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'border-brand-400 bg-brand-500/20 text-white shadow-lg shadow-brand-900/30'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {/* `key` on the list remounts the items when the filter changes, so
            each new set replays its reveal instead of appearing instantly. */}
        <ul key={activeFilter} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <Reveal as="li" key={item.id} delay={Math.min(index, 5) * 60}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/8 bg-navy-900"
              >
                <span className="relative block aspect-4/3 w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </span>

                {/* Hover overlay */}
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent p-4 text-left opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-semibold tracking-wider text-brand-300 uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1 font-heading text-sm font-semibold text-white">
                    {item.caption}
                  </span>
                </span>

                <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/20 bg-navy-900/70 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" aria-hidden="true" />
                </span>

                <span className="sr-only">View larger image: {item.caption}</span>
              </button>
            </Reveal>
          ))}
        </ul>

        {visibleItems.length === 0 && (
          <p className="mt-10 text-center text-sm text-slate-400">
            No images in this category yet.
          </p>
        )}
      </Container>

      {hasOpenedLightbox && (
        <Lightbox
          items={visibleItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
