import type { GalleryCategory, GalleryItem } from '@/types';

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  'Training',
  'Internships',
  'Workshops',
  'Hackathons',
  'Office',
  'Seminars',
];

/**
 * Gallery entries.
 *
 * The images in `/public/gallery` are branded SVG placeholders so the layout,
 * lightbox and filters are fully functional out of the box. Replace each `src`
 * with a real photograph (1600×1067, WebP or AVIF preferred) and update the
 * `alt` text to describe what is actually in the photo.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: 'g1',
    src: '/gallery/training-01.svg',
    alt: 'Placeholder image for a classroom training session at BugCap Labs',
    caption: 'Full Stack Development Batch',
    category: 'Training',
  },
  {
    id: 'g2',
    src: '/gallery/training-02.svg',
    alt: 'Placeholder image for a hands-on cyber security lab session',
    caption: 'Ethical Hacking Lab',
    category: 'Training',
  },
  {
    id: 'g3',
    src: '/gallery/internships-01.svg',
    alt: 'Placeholder image for interns working on a project',
    caption: 'Software Development Interns',
    category: 'Internships',
  },
  {
    id: 'g4',
    src: '/gallery/internships-02.svg',
    alt: 'Placeholder image for an intern project demonstration',
    caption: 'Internship Project Demo Day',
    category: 'Internships',
  },
  {
    id: 'g5',
    src: '/gallery/workshops-01.svg',
    alt: 'Placeholder image for a cloud computing workshop',
    caption: 'Cloud & DevOps Workshop',
    category: 'Workshops',
  },
  {
    id: 'g6',
    src: '/gallery/workshops-02.svg',
    alt: 'Placeholder image for a digital forensics workshop',
    caption: 'Digital Forensics Workshop',
    category: 'Workshops',
  },
  {
    id: 'g7',
    src: '/gallery/hackathons-01.svg',
    alt: 'Placeholder image for a hackathon event',
    caption: 'Capture The Flag Night',
    category: 'Hackathons',
  },
  {
    id: 'g8',
    src: '/gallery/hackathons-02.svg',
    alt: 'Placeholder image for hackathon prize distribution',
    caption: 'Annual Hackathon Finals',
    category: 'Hackathons',
  },
  {
    id: 'g9',
    src: '/gallery/office-01.svg',
    alt: 'Placeholder image for the BugCap Labs office workspace',
    caption: 'Our Erode Workspace',
    category: 'Office',
  },
  {
    id: 'g10',
    src: '/gallery/office-02.svg',
    alt: 'Placeholder image for the BugCap Labs team',
    caption: 'The BugCap Labs Team',
    category: 'Office',
  },
  {
    id: 'g11',
    src: '/gallery/seminars-01.svg',
    alt: 'Placeholder image for a college seminar presentation',
    caption: 'Campus Awareness Seminar',
    category: 'Seminars',
  },
  {
    id: 'g12',
    src: '/gallery/seminars-02.svg',
    alt: 'Placeholder image for an industry seminar session',
    caption: 'Industry Connect Seminar',
    category: 'Seminars',
  },
];
