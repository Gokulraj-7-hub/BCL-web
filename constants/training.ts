import {
  Code2,
  ShieldCheck,
  Cloud,
  BrainCircuit,
  Network,
  Terminal,
  Database,
  Bug,
} from 'lucide-react';
import type { InternshipProgram } from '@/types';

export interface TrainingTrack {
  id: string;
  title: string;
  icon: typeof Code2;
  courses: readonly string[];
}

/** Course catalogue, grouped into tracks for the Training section. */
export const TRAINING_TRACKS: readonly TrainingTrack[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: Code2,
    courses: ['Python', 'Java', 'C', 'C++', 'JavaScript'],
  },
  {
    id: 'web',
    title: 'Web & Frameworks',
    icon: Terminal,
    courses: ['React', 'Node.js', 'Next.js', 'REST APIs'],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    icon: BrainCircuit,
    courses: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    courses: ['Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Docker & Kubernetes'],
  },
  {
    id: 'infrastructure',
    title: 'Networking & Systems',
    icon: Network,
    courses: ['Computer Networking', 'Linux Administration', 'Server Management'],
  },
  {
    id: 'security',
    title: 'Cyber Security',
    icon: ShieldCheck,
    courses: ['Cyber Security Fundamentals', 'Ethical Hacking', 'Penetration Testing'],
  },
  {
    id: 'forensics',
    title: 'Digital Forensics',
    icon: Bug,
    courses: ['Digital Forensics', 'Malware Analysis', 'Incident Response'],
  },
  {
    id: 'database',
    title: 'Databases',
    icon: Database,
    courses: ['MySQL', 'MongoDB', 'Database Design'],
  },
];

/** Benefits listed alongside the training tracks. */
export const TRAINING_BENEFITS = [
  'Live instructor-led sessions',
  'Hands-on lab environment',
  'Real-time capstone project',
  'Industry-recognised certificate',
  'Doubt-clearing & mentor support',
  'Placement assistance included',
] as const;

/* -------------------------------------------------------------------------- */
/*                             Internship programs                            */
/* -------------------------------------------------------------------------- */

export const INTERNSHIPS: readonly InternshipProgram[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Build and ship a production-style application end to end, with version control, code review and deployment.',
    icon: Code2,
    duration: '1 – 6 Months',
    mode: 'Online / Offline / Hybrid',
    eligibility: 'B.E / B.Tech / MCA / BCA / B.Sc (CS, IT) — final year & graduates',
    certificate: 'Internship Completion Certificate + Project Letter',
    skills: [
      'Python / Java',
      'React & Next.js',
      'Node.js & REST APIs',
      'MySQL / MongoDB',
      'Git & GitHub',
      'Agile workflow',
    ],
    popular: true,
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description:
      'Work inside a controlled lab: assess deliberately vulnerable targets, document findings and write real reports.',
    icon: ShieldCheck,
    duration: '1 – 6 Months',
    mode: 'Online / Offline / Hybrid',
    eligibility: 'Any CS / IT graduate or student with basic networking knowledge',
    certificate: 'Internship Completion Certificate + Assessment Report',
    skills: [
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Web & API Security',
      'Kali Linux tooling',
      'OWASP Top 10',
      'Report writing',
    ],
    popular: true,
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description:
      'Provision, secure and automate cloud infrastructure across AWS and Azure using infrastructure-as-code.',
    icon: Cloud,
    duration: '1 – 4 Months',
    mode: 'Online / Hybrid',
    eligibility: 'CS / IT students & graduates comfortable with Linux basics',
    certificate: 'Internship Completion Certificate',
    skills: [
      'AWS core services',
      'Microsoft Azure',
      'Docker & containers',
      'CI/CD pipelines',
      'Linux administration',
      'Cloud security basics',
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description:
      'Train, evaluate and deploy machine-learning models on real datasets, ending with a deployed inference service.',
    icon: BrainCircuit,
    duration: '1 – 4 Months',
    mode: 'Online / Hybrid',
    eligibility: 'Students & graduates with Python and basic mathematics',
    certificate: 'Internship Completion Certificate + Model Project',
    skills: [
      'Python for AI',
      'NumPy & Pandas',
      'Machine Learning',
      'Deep Learning basics',
      'Model evaluation',
      'Model deployment',
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    description:
      'Design, configure and troubleshoot networks — switching, routing, firewalls and server infrastructure.',
    icon: Network,
    duration: '1 – 3 Months',
    mode: 'Offline / Hybrid',
    eligibility: 'Diploma / B.E / B.Sc students in CS, IT or ECE',
    certificate: 'Internship Completion Certificate',
    skills: [
      'TCP/IP & OSI model',
      'Routing & switching',
      'Firewall configuration',
      'Server installation',
      'Network troubleshooting',
      'Structured cabling',
    ],
  },
];
