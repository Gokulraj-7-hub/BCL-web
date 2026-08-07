import {
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  GraduationCap,
  Users,
  Award,
  Briefcase,
  FolderKanban,
  CalendarClock,
} from 'lucide-react';
import type { Stat, TimelineEvent, ValueItem } from '@/types';

/** Canonical site URL, overridable per environment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bugcaplabs.com').replace(
  /\/$/,
  '',
);

export const COMPANY = {
  name: 'BugCap Labs Pvt. Ltd.',
  shortName: 'BugCap Labs',
  legalName: 'BugCap Labs Private Limited',
  tagline: 'Securing Future By Today',
  founded: '2020',
  director: {
    name: 'Mr. K. Manikandan',
    title: 'Director',
  },
  description:
    'BugCap Labs Pvt. Ltd. is a technology company delivering software development, cyber security, cloud solutions, digital forensics, hardware & networking, professional training, internships and placement assistance.',
  contact: {
    phone: '+91 79047 67261',
    /** E.164 form used for `tel:` and WhatsApp deep links. */
    phoneRaw: '+917904767261',
    whatsapp: '917904767261',
    email: 'bugcaplabinfo@gmail.com',
  },
  address: {
    line1: '212, Parasuraman Thottam',
    line2: 'Kadappanallur Post',
    taluk: 'Bhavani Taluk',
    city: 'Erode',
    postalCode: '638311',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
    /** Approximate coordinates for Bhavani Taluk, Erode district. */
    latitude: 11.4453,
    longitude: 77.6819,
  },
  businessHours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
    { days: 'Saturday', hours: '9:00 AM – 2:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/bugcap-labs',
    twitter: 'https://twitter.com/bugcaplabs',
    facebook: 'https://www.facebook.com/bugcaplabs',
    instagram: 'https://www.instagram.com/bugcaplabs',
    github: 'https://github.com/bugcaplabs',
    youtube: 'https://www.youtube.com/@bugcaplabs',
  },
} as const;

/** Single-line address used in the footer and structured data. */
export const FULL_ADDRESS = `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.taluk}, ${COMPANY.address.city} – ${COMPANY.address.postalCode}, ${COMPANY.address.state}, ${COMPANY.address.country}`;

/** Embedded Google Maps URL (keyless embed, no API cost). */
export const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.postalCode}, India`,
)}&output=embed`;

export const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.postalCode}, India`,
)}`;

export const MISSION_VISION = {
  mission: {
    icon: Target,
    title: 'Our Mission',
    text: 'To engineer secure, reliable and scalable technology for businesses, while training the next generation of engineers with the practical, industry-grade skills the market actually demands.',
  },
  vision: {
    icon: Eye,
    title: 'Our Vision',
    text: 'To become South India’s most trusted partner for cyber security and software engineering — a place where enterprises secure their future and students launch their careers.',
  },
} as const;

export const CORE_VALUES: readonly ValueItem[] = [
  {
    title: 'Security First',
    description:
      'Every line of code and every network we touch is designed with a defensive mindset from day one, not patched afterwards.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation',
    description:
      'We track the modern stack closely and adopt what genuinely improves outcomes for our clients and learners.',
    icon: Lightbulb,
  },
  {
    title: 'Integrity',
    description:
      'Transparent scope, honest timelines, and clear reporting. We say what we will deliver, then deliver it.',
    icon: HeartHandshake,
  },
  {
    title: 'Learning Culture',
    description:
      'Knowledge compounds when shared. Mentorship and continuous upskilling are built into how we work.',
    icon: GraduationCap,
  },
];

export const TIMELINE: readonly TimelineEvent[] = [
  {
    year: '2020',
    title: 'BugCap Labs Founded',
    description:
      'Started in Erode, Tamil Nadu with a small team focused on custom software development for local businesses.',
  },
  {
    year: '2021',
    title: 'Cyber Security Practice',
    description:
      'Launched dedicated penetration testing and vulnerability assessment services for web and network infrastructure.',
  },
  {
    year: '2022',
    title: 'Training Academy',
    description:
      'Opened our professional training division, delivering hands-on programs in programming, networking and ethical hacking.',
  },
  {
    year: '2023',
    title: 'Cloud & DevOps',
    description:
      'Extended into AWS, Azure and Google Cloud migrations, CI/CD automation and cloud security posture management.',
  },
  {
    year: '2024',
    title: 'Digital Forensics Lab',
    description:
      'Commissioned an in-house forensics and incident response capability for malware analysis and evidence handling.',
  },
  {
    year: '2025',
    title: 'Placement Network',
    description:
      'Grew our hiring-partner network, taking placement assistance for trained candidates to 95% coverage.',
  },
];

export const STATS: readonly Stat[] = [
  { value: 500, suffix: '+', label: 'Students Trained', icon: Users },
  { value: 150, suffix: '+', label: 'Projects Completed', icon: FolderKanban },
  { value: 100, suffix: '+', label: 'Business Clients', icon: Briefcase },
  { value: 95, suffix: '%', label: 'Placement Assistance', icon: Award },
  { value: 5, suffix: '+', label: 'Years of Experience', icon: CalendarClock },
];

export const HERO_HIGHLIGHTS = [
  'Software Development',
  'Cyber Security',
  'Cloud Solutions',
  'Digital Forensics',
  'Professional Training',
] as const;
