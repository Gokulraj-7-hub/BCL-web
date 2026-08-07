import type { Testimonial } from '@/types';

/**
 * Testimonials shown in the auto-scrolling slider.
 *
 * NOTE FOR CONTENT OWNERS: these are placeholder entries written to represent
 * the tone and length of real feedback. Replace each entry with a genuine,
 * attributable quote before the site goes live — do not publish invented
 * testimonials as if they were real.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Placeholder — Student Name',
    role: 'Cyber Security Trainee',
    quote:
      'The lab time was the difference. Instead of slides about the OWASP Top 10 we spent weeks actually exploiting and then fixing vulnerable applications, and I could talk about all of it in interviews.',
    rating: 5,
    category: 'Student',
  },
  {
    id: 't2',
    name: 'Placeholder — Client Name',
    role: 'Operations Head',
    company: 'Manufacturing Client',
    quote:
      'They replaced three spreadsheets and a lot of manual follow-up with one ERP module. Scope was written down up front and the delivery dates held.',
    rating: 5,
    category: 'Client',
  },
  {
    id: 't3',
    name: 'Placeholder — Student Name',
    role: 'Full Stack Development Intern',
    quote:
      'My internship was run like a real sprint — a ticket board, code review on every pull request, and a demo each Friday. The certificate mattered less than the GitHub history I walked away with.',
    rating: 5,
    category: 'Student',
  },
  {
    id: 't4',
    name: 'Placeholder — Corporate Contact',
    role: 'IT Manager',
    company: 'Textile Group',
    quote:
      'The network audit found firewall rules nobody had reviewed in years. Remediation was prioritised sensibly rather than dumped on us as a 90-page PDF.',
    rating: 5,
    category: 'Corporate',
  },
  {
    id: 't5',
    name: 'Placeholder — Student Name',
    role: 'Cloud Computing Trainee',
    quote:
      'Went in knowing only Linux basics and came out able to deploy a containerised app to AWS with a CI/CD pipeline behind it. The mentor sessions were the part that made it stick.',
    rating: 5,
    category: 'Student',
  },
  {
    id: 't6',
    name: 'Placeholder — Client Name',
    role: 'Founder',
    company: 'E-Commerce Startup',
    quote:
      'Our storefront rebuild cut page load times noticeably and search traffic followed. They also handled the migration without a single hour of downtime.',
    rating: 5,
    category: 'Client',
  },
  {
    id: 't7',
    name: 'Placeholder — Student Name',
    role: 'Placement Program Participant',
    quote:
      'Resume review, three mock interviews and honest feedback after each one. The technical round questions were close enough to the real thing that nothing surprised me.',
    rating: 5,
    category: 'Student',
  },
  {
    id: 't8',
    name: 'Placeholder — Corporate Contact',
    role: 'Systems Administrator',
    company: 'Education Trust',
    quote:
      'Server installation, CCTV and the AMC are all handled by one team, which means one phone call when something breaks. Response times have been good.',
    rating: 5,
    category: 'Corporate',
  },
];
