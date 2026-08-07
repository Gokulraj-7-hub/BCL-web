'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/constants/gallery';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/utils/cn';
import type { GalleryCategory } from '@/types';

type Filter = GalleryCategory | 'All';

const FILTERS: readonly Filter[] = ['All', ...GALLERY_CATEGORIES];

/** Filterable gallery grid with an accessible lightbox preview. */
export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        <motion.ul
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
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
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visibleItems.length === 0 && (
          <p className="mt-10 text-center text-sm text-slate-500">
            No images in this category yet.
          </p>
        )}
      </Container>

      <Lightbox
        items={visibleItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
