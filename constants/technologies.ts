import type { Technology } from '@/types';

/**
 * Technology stack shown in the marquee. `color` drives the tile glow and
 * `abbr` is the short label rendered inside the tile.
 */
export const TECHNOLOGIES: readonly Technology[] = [
  { name: 'Python', color: '#3776AB', abbr: 'Py' },
  { name: 'Java', color: '#F89820', abbr: 'Jv' },
  { name: 'JavaScript', color: '#F7DF1E', abbr: 'JS' },
  { name: 'TypeScript', color: '#3178C6', abbr: 'TS' },
  { name: 'React', color: '#61DAFB', abbr: 'Re' },
  { name: 'Next.js', color: '#FFFFFF', abbr: 'N' },
  { name: 'Node.js', color: '#5FA04E', abbr: 'No' },
  { name: 'Tailwind CSS', color: '#38BDF8', abbr: 'Tw' },
  { name: 'Flutter', color: '#54C5F8', abbr: 'Fl' },
  { name: 'Docker', color: '#2496ED', abbr: 'Dk' },
  { name: 'AWS', color: '#FF9900', abbr: 'AW' },
  { name: 'Azure', color: '#0089D6', abbr: 'Az' },
  { name: 'Linux', color: '#FCC624', abbr: 'Lx' },
  { name: 'Kali Linux', color: '#557C94', abbr: 'Kl' },
  { name: 'MySQL', color: '#4479A1', abbr: 'My' },
  { name: 'MongoDB', color: '#47A248', abbr: 'Mg' },
  { name: 'Git', color: '#F05032', abbr: 'Gt' },
  { name: 'GitHub', color: '#E6EDF3', abbr: 'GH' },
];
