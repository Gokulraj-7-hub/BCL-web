import dynamic from 'next/dynamic';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Stats } from '@/sections/Stats';
import { Services } from '@/sections/Services';

/**
 * Below-the-fold sections are code-split so the initial bundle only carries
 * what is needed to paint the hero and the first scroll. Each placeholder
 * reserves vertical space to prevent layout shift while the chunk loads.
 */
const sectionFallback = <div className="min-h-[60vh]" aria-hidden="true" />;

const Training = dynamic(() => import('@/sections/Training').then((m) => m.Training), {
  loading: () => sectionFallback,
});
const Internships = dynamic(() => import('@/sections/Internships').then((m) => m.Internships), {
  loading: () => sectionFallback,
});
const Technologies = dynamic(() => import('@/sections/Technologies').then((m) => m.Technologies), {
  loading: () => sectionFallback,
});
const Process = dynamic(() => import('@/sections/Process').then((m) => m.Process), {
  loading: () => sectionFallback,
});
const Testimonials = dynamic(() => import('@/sections/Testimonials').then((m) => m.Testimonials), {
  loading: () => sectionFallback,
});
const Gallery = dynamic(() => import('@/sections/Gallery').then((m) => m.Gallery), {
  loading: () => sectionFallback,
});
const Faq = dynamic(() => import('@/sections/Faq').then((m) => m.Faq), {
  loading: () => sectionFallback,
});
const Contact = dynamic(() => import('@/sections/Contact').then((m) => m.Contact), {
  loading: () => sectionFallback,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Stats />
      <Services />
      <Training />
      <Internships />
      <Technologies />
      <Process />
      <Testimonials />
      <Gallery />
      <Faq />
      <Contact />
    </>
  );
}
