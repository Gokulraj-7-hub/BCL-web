import type { LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  /** Visible label in the navbar. */
  label: string;
  /** In-page anchor (e.g. `#services`) or an absolute route. */
  href: string;
  /** Section id used by the scroll-spy to highlight the active link. */
  sectionId?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Individual offerings rendered as a checklist inside the card. */
  features: readonly string[];
  /** Tailwind gradient stops used for the card accent. */
  accent: string;
}

/* -------------------------------------------------------------------------- */
/*                             Marketing content                              */
/* -------------------------------------------------------------------------- */

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Stat {
  /** Numeric target the counter animates towards. */
  value: number;
  /** Rendered after the number, e.g. `+` or `%`. */
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

/* -------------------------------------------------------------------------- */
/*                                 Internships                                */
/* -------------------------------------------------------------------------- */

export interface InternshipProgram {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  mode: string;
  eligibility: string;
  skills: readonly string[];
  certificate: string;
  /** Highlights the card as the most popular track. */
  popular?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Technologies                                */
/* -------------------------------------------------------------------------- */

export interface Technology {
  name: string;
  /** Brand colour used for the glow/tint of the logo tile. */
  color: string;
  /** Short label rendered inside the tile when no logo asset is present. */
  abbr: string;
}

/* -------------------------------------------------------------------------- */
/*                                Testimonials                                */
/* -------------------------------------------------------------------------- */

export type TestimonialCategory = 'Student' | 'Client' | 'Corporate';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
  category: TestimonialCategory;
}

/* -------------------------------------------------------------------------- */
/*                                   Gallery                                  */
/* -------------------------------------------------------------------------- */

export type GalleryCategory =
  'Training' | 'Internships' | 'Workshops' | 'Hackathons' | 'Office' | 'Seminars';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

export type FaqCategory =
  | 'Training'
  | 'Internships'
  | 'Placements'
  | 'Services'
  | 'Cyber Security'
  | 'Software Development';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

/* -------------------------------------------------------------------------- */
/*                                Contact form                                */
/* -------------------------------------------------------------------------- */

export interface ContactApiSuccess {
  success: true;
  message: string;
}

export interface ContactApiError {
  success: false;
  message: string;
  /** Field-level messages keyed by form field name. */
  errors?: Record<string, string[]>;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
