import type { NavItem } from '@/types';

/** Primary navbar links. Order also drives the scroll-spy. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Training', href: '#training', sectionId: 'training' },
  { label: 'Internships', href: '#internships', sectionId: 'internships' },
  { label: 'Gallery', href: '#gallery', sectionId: 'gallery' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

export const FOOTER_QUICK_LINKS: readonly NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Why BugCap Labs', href: '#why-us' },
  { label: 'Our Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export const FOOTER_SERVICE_LINKS: readonly NavItem[] = [
  { label: 'Software Development', href: '#services' },
  { label: 'Web Development', href: '#services' },
  { label: 'Mobile App Development', href: '#services' },
  { label: 'Cloud Solutions', href: '#services' },
  { label: 'Hardware & Networking', href: '#services' },
  { label: 'Cyber Security', href: '#services' },
  { label: 'Digital Forensics', href: '#services' },
];

export const FOOTER_LEARNING_LINKS: readonly NavItem[] = [
  { label: 'Professional Training', href: '#training' },
  { label: 'Internship Programs', href: '#internships' },
  { label: 'Placement Assistance', href: '#services' },
  { label: 'Technologies We Teach', href: '#technologies' },
  { label: 'Gallery', href: '#gallery' },
];

export const LEGAL_LINKS: readonly NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];
