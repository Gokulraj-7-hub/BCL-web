import type { FaqItem } from '@/types';

export const FAQS: readonly FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Training',
    question: 'Which training programs does BugCap Labs offer?',
    answer:
      'We run instructor-led programs across programming (Python, Java, C, C++, JavaScript), web development (React, Node.js), AI, Machine Learning and Data Science, Cloud Computing, Networking, Linux, DevOps, Cyber Security, Ethical Hacking and Digital Forensics. Every program is delivered with lab work and a capstone project.',
  },
  {
    id: 'faq-2',
    category: 'Training',
    question: 'Do I need prior programming experience to join?',
    answer:
      'For most foundation programs, no. We start from fundamentals and build up. Advanced tracks such as Penetration Testing or Digital Forensics assume basic networking and operating-system knowledge — we will tell you honestly during counselling if a prerequisite course would serve you better first.',
  },
  {
    id: 'faq-3',
    category: 'Training',
    question: 'Are classes online or at your campus?',
    answer:
      'Both. Programs run online, offline at our Erode facility, or in a hybrid format. Online sessions are live and interactive rather than pre-recorded, and recordings are shared with enrolled participants for revision.',
  },
  {
    id: 'faq-4',
    category: 'Training',
    question: 'Will I receive a certificate?',
    answer:
      'Yes. Every participant who completes the coursework and the final project receives a BugCap Labs certificate of completion. Internship participants additionally receive a project letter describing what they actually built.',
  },
  {
    id: 'faq-5',
    category: 'Internships',
    question: 'What internship programs are available?',
    answer:
      'We offer structured internships in Software Development, Cyber Security, Cloud Computing, Artificial Intelligence and Networking. Durations run from one to six months depending on the track and your availability.',
  },
  {
    id: 'faq-6',
    category: 'Internships',
    question: 'Who is eligible to apply for an internship?',
    answer:
      'Final-year students and recent graduates from B.E, B.Tech, MCA, BCA, B.Sc (CS/IT) and related diploma programs. Some tracks have light prerequisites — for example, basic Python for the AI internship — which are listed on each internship card.',
  },
  {
    id: 'faq-7',
    category: 'Internships',
    question: 'Is the internship project-based?',
    answer:
      'Yes. You are assigned a real deliverable with a mentor, a review cadence and an end-of-term demo. The output is something you can show in interviews, not a certificate alone.',
  },
  {
    id: 'faq-8',
    category: 'Placements',
    question: 'How does placement assistance work?',
    answer:
      'Placement assistance covers resume building, career guidance, mock technical and HR interviews, and introductions through our hiring-partner network. It begins during your program and continues after completion.',
  },
  {
    id: 'faq-9',
    category: 'Placements',
    question: 'Do you guarantee a job?',
    answer:
      'No, and you should be cautious of anyone who does. We provide assistance, preparation and introductions — the hiring decision belongs to the employer. Our 95% figure reflects candidates who received placement support and interview opportunities, not a guaranteed offer.',
  },
  {
    id: 'faq-10',
    category: 'Services',
    question: 'What kind of businesses do you work with?',
    answer:
      'Everything from local businesses needing a website or IT infrastructure to enterprises requiring ERP platforms, cloud migrations and ongoing security engagements. Engagements are scoped individually after a requirement discussion.',
  },
  {
    id: 'faq-11',
    category: 'Services',
    question: 'Do you provide support after a project is delivered?',
    answer:
      'Yes. Every delivery includes a defined support window, and we offer AMC and retainer arrangements covering maintenance, security patching, monitoring and enhancements.',
  },
  {
    id: 'faq-12',
    category: 'Services',
    question: 'How long does a typical project take?',
    answer:
      'A business website is typically two to four weeks. Custom software and ERP or CRM platforms usually run two to six months depending on scope. You receive a milestone-level timeline before development starts.',
  },
  {
    id: 'faq-13',
    category: 'Cyber Security',
    question: 'What does a penetration test from BugCap Labs include?',
    answer:
      'Scoping and rules of engagement, reconnaissance, vulnerability identification, controlled exploitation, and a report with severity-rated findings, reproduction steps and prioritised remediation guidance. A free retest of fixed issues is included.',
  },
  {
    id: 'faq-14',
    category: 'Cyber Security',
    question: 'Is testing performed on live production systems?',
    answer:
      'Only with written authorisation and an agreed testing window. Where production testing carries risk we work against a staging replica instead. All engagements are governed by a signed scope and confidentiality agreement.',
  },
  {
    id: 'faq-15',
    category: 'Cyber Security',
    question: 'Can you help after a security incident has already happened?',
    answer:
      'Yes. Our incident response service covers containment, forensic analysis of affected systems, malware analysis, root-cause identification and a remediation plan to prevent recurrence.',
  },
  {
    id: 'faq-16',
    category: 'Software Development',
    question: 'Which technologies do you build with?',
    answer:
      'Primarily Python, Java, JavaScript and TypeScript with React, Next.js, Node.js, Flutter and React Native on the front end and MySQL, PostgreSQL and MongoDB for data. Infrastructure runs on AWS, Azure or Google Cloud with Docker-based deployment.',
  },
  {
    id: 'faq-17',
    category: 'Software Development',
    question: 'Do we own the source code?',
    answer:
      'Yes. On final payment, full intellectual property and the complete source repository transfer to you, along with documentation and deployment instructions.',
  },
  {
    id: 'faq-18',
    category: 'Software Development',
    question: 'Can you take over an existing project?',
    answer:
      'Frequently. We start with a code and infrastructure audit, report on quality, security and technical debt, then agree a stabilisation or enhancement plan before making changes.',
  },
];
