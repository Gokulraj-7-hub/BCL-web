import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Server,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Users,
  Cpu,
  Layers,
  BookOpen,
  Rocket,
  Wrench,
  Zap,
  Award,
} from 'lucide-react';
import type { Feature, ProcessStep, Service } from '@/types';

/* -------------------------------------------------------------------------- */
/*                              Service catalogue                             */
/* -------------------------------------------------------------------------- */

export const SERVICES: readonly Service[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Custom-built business software engineered around your workflow, from internal tools to full enterprise platforms.',
    icon: Code2,
    accent: 'from-brand-500 to-cyan-400',
    features: [
      'Custom Software',
      'Enterprise Solutions',
      'ERP Systems',
      'CRM Platforms',
      'Desktop Applications',
      'API Development',
      'Software Maintenance',
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Fast, accessible and search-optimised web experiences built on a modern, maintainable front-end stack.',
    icon: Globe,
    accent: 'from-sky-500 to-brand-400',
    features: [
      'Business Websites',
      'E-Commerce Stores',
      'Admin Panels',
      'Web Portals',
      'Progressive Web Apps',
    ],
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform apps with a single codebase where it makes sense and native performance where it matters.',
    icon: Smartphone,
    accent: 'from-indigo-500 to-brand-400',
    features: ['Android Applications', 'iOS Applications', 'Flutter', 'React Native'],
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description:
      'Cloud architecture, migration and automation that cuts infrastructure cost while improving uptime and security.',
    icon: Cloud,
    accent: 'from-cyan-400 to-blue-500',
    features: [
      'Amazon Web Services',
      'Microsoft Azure',
      'Google Cloud Platform',
      'Cloud Migration',
      'DevOps & CI/CD',
      'Cloud Security',
    ],
  },
  {
    id: 'hardware-networking',
    title: 'Hardware & Networking',
    description:
      'End-to-end IT infrastructure — procurement, deployment, hardening and ongoing annual maintenance.',
    icon: Server,
    accent: 'from-blue-500 to-violet-500',
    features: [
      'Server Installation',
      'Network Design & Setup',
      'Firewall Configuration',
      'Computer Sales',
      'IT Infrastructure',
      'Preventive Maintenance',
      'CCTV Surveillance',
      'AMC Contracts',
    ],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description:
      'Offensive testing and defensive engineering, from a single web app assessment to full incident response.',
    icon: ShieldCheck,
    accent: 'from-brand-500 to-emerald-400',
    features: [
      'Ethical Hacking',
      'Penetration Testing',
      'Vulnerability Assessment',
      'Web Application Security',
      'API Security',
      'Cloud Security',
      'Malware Analysis',
      'Digital Forensics',
      'Incident Response',
      'Security Consulting',
    ],
  },
  {
    id: 'professional-training',
    title: 'Professional Training',
    description:
      'Instructor-led programs built on real projects and lab work, mapped to what employers actually hire for.',
    icon: GraduationCap,
    accent: 'from-amber-400 to-brand-500',
    features: [
      'Programming Languages',
      'Web & App Frameworks',
      'AI, ML & Data Science',
      'Cloud Computing & DevOps',
      'Networking & Linux',
      'Cyber Security & Ethical Hacking',
      'Digital Forensics',
    ],
  },
  {
    id: 'placement-assistance',
    title: 'Placement Assistance',
    description:
      'Career support that continues after the syllabus ends — until you are interview-ready and placed.',
    icon: Briefcase,
    accent: 'from-emerald-400 to-brand-500',
    features: [
      'Resume Building',
      'Career Guidance',
      'Mock Interviews',
      'Technical Interview Prep',
      'HR Interview Prep',
      'Industry Connect',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                            Why choose BugCap Labs                          */
/* -------------------------------------------------------------------------- */

export const WHY_CHOOSE_US: readonly Feature[] = [
  {
    title: 'Industry Experts',
    description:
      'Practitioners who ship production systems and run real security engagements, not career trainers.',
    icon: Award,
  },
  {
    title: 'Real-Time Projects',
    description:
      'Every program is anchored to a live project brief with the same constraints as client work.',
    icon: Rocket,
  },
  {
    title: 'Experienced Mentors',
    description:
      'Small batches with one-to-one mentorship, code reviews and structured feedback loops.',
    icon: Users,
  },
  {
    title: 'Placement Assistance',
    description:
      'Resume workshops, mock interviews and direct introductions through our hiring-partner network.',
    icon: Briefcase,
  },
  {
    title: 'Internship Programs',
    description:
      'Structured internships with defined deliverables, mentor check-ins and a verifiable certificate.',
    icon: GraduationCap,
  },
  {
    title: 'Latest Technologies',
    description:
      'Curriculum and delivery stack refreshed continuously — no outdated tooling or dead frameworks.',
    icon: Cpu,
  },
  {
    title: 'Practical Learning',
    description:
      'Roughly 70% lab time. You learn by building, breaking and defending real systems.',
    icon: Wrench,
  },
  {
    title: 'Corporate Solutions',
    description:
      'Dedicated delivery teams, SLA-backed support and annual maintenance for business clients.',
    icon: Layers,
  },
];

/* -------------------------------------------------------------------------- */
/*                             Development process                            */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: 1,
    title: 'Requirement Analysis',
    description:
      'We map your goals, users and constraints into a written scope with measurable acceptance criteria.',
    icon: BookOpen,
  },
  {
    step: 2,
    title: 'Planning',
    description:
      'Architecture, technology choices, milestones and a delivery timeline you can hold us to.',
    icon: Layers,
  },
  {
    step: 3,
    title: 'UI/UX Design',
    description:
      'Wireframes and high-fidelity prototypes reviewed with you before a single component is built.',
    icon: Globe,
  },
  {
    step: 4,
    title: 'Development',
    description:
      'Iterative sprints with version control, code reviews and a demo at the end of every cycle.',
    icon: Code2,
  },
  {
    step: 5,
    title: 'Testing',
    description:
      'Functional, security, performance and accessibility testing before anything reaches production.',
    icon: ShieldCheck,
  },
  {
    step: 6,
    title: 'Deployment',
    description:
      'Automated CI/CD release to cloud or on-premise infrastructure with monitoring switched on.',
    icon: Zap,
  },
  {
    step: 7,
    title: 'Maintenance',
    description:
      'Ongoing support, security patching and enhancements under a clear AMC or retainer.',
    icon: Wrench,
  },
];
