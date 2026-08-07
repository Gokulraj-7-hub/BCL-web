import dynamic from 'next/dynamic';
import { Hero } from '@/sections/Hero';

/**
 * Only the hero is in the initial bundle. Every other section is code-split so
 * Framer Motion, GSAP and the section markup are fetched as the visitor
 * scrolls rather than blocking first paint.
 *
 * Each placeholder reserves vertical space to keep Cumulative Layout Shift at
 * zero while a chunk loads.
 */
const sectionFallback = <div className="min-h-[60vh]" aria-hidden="true" />;

const About = dynamic(() => import('@/sections/About').then((m) => m.About), {
  loading: () => sectionFallback,
});
const WhyChooseUs = dynamic(() => import('@/sections/WhyChooseUs').then((m) => m.WhyChooseUs), {
  loading: () => sectionFallback,
});
const Stats = dynamic(() => import('@/sections/Stats').then((m) => m.Stats), {
  loading: () => <div className="min-h-[20vh]" aria-hidden="true" />,
});
const Services = dynamic(() => import('@/sections/Services').then((m) => m.Services), {
  loading: () => sectionFallback,
});
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
