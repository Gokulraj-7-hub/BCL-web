import { cn } from '@/utils/cn';
import { COMPANY } from '@/constants/company';

interface LogoProps {
  className?: string;
  /** Renders the wordmark and tagline next to the monogram. */
  withText?: boolean;
  /** Monogram edge length in pixels. */
  size?: number;
}

/**
 * BugCap Labs monogram, reproduced from the company letterhead: a "BCL"
 * lettermark with a circuit-node motif, in brand blue on a white tile.
 *
 * Inline SVG rather than an image file so it stays crisp at any size and
 * costs no extra network request.
 */
export function Logo({ className, withText = true, size = 40 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // With the wordmark alongside it the monogram is redundant to a screen
        // reader; without it, the mark has to carry the company name itself.
        {...(withText
          ? { 'aria-hidden': true as const }
          : { role: 'img', 'aria-label': `${COMPANY.shortName} logo` })}
        className="shrink-0"
      >
        <rect width="64" height="64" rx="12" fill="#ffffff" />

        {/* "B" */}
        <path
          d="M11 18h9.5c3.2 0 5.4 1.8 5.4 4.6 0 1.9-1 3.3-2.6 4 2 .6 3.3 2.2 3.3 4.4 0 3.2-2.4 5.2-6.1 5.2H11V18Zm4.3 3.4v4h4.3c1.4 0 2.3-.8 2.3-2s-.9-2-2.3-2h-4.3Zm0 7.1v4.4h4.7c1.6 0 2.6-.9 2.6-2.2 0-1.3-1-2.2-2.6-2.2h-4.7Z"
          fill="#1a6fdc"
        />

        {/* "C" — open ring */}
        <path
          d="M43.6 22.6a9.2 9.2 0 1 0 0 12.5"
          stroke="#2b8cee"
          strokeWidth="4.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* "L" */}
        <path d="M48 18h4.3v14.2H60V36H48V18Z" fill="#1a6fdc" />

        {/* Circuit nodes — the "bug" motif from the letterhead. */}
        <circle cx="38.5" cy="28.8" r="2.6" fill="#0a1128" />
        <circle cx="52" cy="43" r="2" fill="#2b8cee" />
        <circle cx="58" cy="46.5" r="1.4" fill="#60b4fa" />
        <path d="M31 44h9l4-4" stroke="#2b8cee" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="44" r="2" fill="#1a6fdc" />
      </svg>

      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
            BugCap Labs <span className="text-brand-400">Pvt. Ltd.</span>
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.14em] text-slate-400 italic sm:text-[11px]">
            securing future by today
          </span>
        </span>
      )}
    </span>
  );
}
