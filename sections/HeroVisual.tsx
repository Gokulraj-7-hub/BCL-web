'use client';

import { Cloud, Code2, Cpu, Database, Lock, ShieldCheck, Terminal, Wifi } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

/** Technology icons that orbit the shield. */
const ORBIT_ICONS = [
  { Icon: Code2, label: 'Software Development', angle: 0 },
  { Icon: Cloud, label: 'Cloud Solutions', angle: 45 },
  { Icon: Lock, label: 'Security', angle: 90 },
  { Icon: Database, label: 'Data', angle: 135 },
  { Icon: Terminal, label: 'DevOps', angle: 180 },
  { Icon: Cpu, label: 'Hardware', angle: 225 },
  { Icon: Wifi, label: 'Networking', angle: 270 },
  { Icon: ShieldCheck, label: 'Cyber Security', angle: 315 },
] as const;

/** Lines of "code" for the laptop screen — purely decorative. */
const CODE_LINES = [
  { width: 'w-3/5', color: 'bg-brand-400/70' },
  { width: 'w-4/5', color: 'bg-slate-500/50' },
  { width: 'w-2/5', color: 'bg-emerald-400/60' },
  { width: 'w-3/4', color: 'bg-slate-500/50' },
  { width: 'w-1/2', color: 'bg-brand-400/70' },
  { width: 'w-5/6', color: 'bg-slate-500/40' },
] as const;

/**
 * Hero illustration: a laptop with a scanning code editor, a pulsing cyber
 * shield, orbiting technology icons and a network-node overlay.
 *
 * Entirely decorative, so the whole tree is `aria-hidden` — nothing here adds
 * meaning that isn't already in the hero copy.
 */
export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-brand-600/20 blur-[90px]" />

      {/* Network node overlay */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 size-full opacity-45"
        fill="none"
      >
        <g stroke="rgb(43 140 238 / 0.35)" strokeWidth="1">
          <path d="M60 90 L160 40 L300 100 L340 220 L240 330 L90 300 L40 190 Z" />
          <path d="M160 40 L240 330" />
          <path d="M60 90 L340 220" />
          <path d="M90 300 L300 100" />
        </g>
        {[
          [60, 90],
          [160, 40],
          [300, 100],
          [340, 220],
          [240, 330],
          [90, 300],
          [40, 190],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="#60b4fa"
            className={prefersReducedMotion ? undefined : 'animate-pulse-glow'}
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
      </svg>

      {/*
        Orbiting technology icons.

        Three nested transforms keep each tile upright while the ring turns:
        the outer ring spins, the middle span places the tile on the circle,
        and the inner span counter-spins at the same rate.
      */}
      <div
        className={cn(
          'absolute inset-0 hidden sm:block',
          !prefersReducedMotion && 'animate-spin-slower',
        )}
      >
        {ORBIT_ICONS.map(({ Icon, label, angle }) => (
          <span
            key={label}
            className="absolute top-1/2 left-1/2 -mt-5 -ml-5 block size-10"
            style={{ transform: `rotate(${angle}deg) translateY(-11.5rem)` }}
          >
            <span
              className={cn(
                'block size-10',
                !prefersReducedMotion && 'animate-spin-slower-reverse',
              )}
            >
              <span
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-navy-800/80 backdrop-blur-sm"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <Icon className="size-4 text-brand-300" />
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* Shield + laptop stack */}
      <div className="relative flex flex-col items-center gap-6 px-6 py-10 sm:px-14">
        {/* Cyber shield */}
        <div className={cn('relative', !prefersReducedMotion && 'animate-float')}>
          <span className="absolute inset-0 rounded-full bg-brand-500/25 blur-2xl" />
          <span className="relative grid size-24 place-items-center rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-600/30 to-navy-800/80 backdrop-blur-sm sm:size-28">
            <ShieldCheck className="size-11 text-brand-300 sm:size-13" strokeWidth={1.6} />
            {/* Scanning sweep */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden rounded-3xl">
              <span
                className={cn(
                  'block h-px w-full bg-gradient-to-r from-transparent via-brand-300 to-transparent',
                  !prefersReducedMotion && 'animate-scan',
                )}
              />
            </span>
          </span>
        </div>

        {/* Laptop */}
        <div
          className={cn('w-full', !prefersReducedMotion && 'animate-float-slow')}
          style={{ animationDelay: '0.6s' }}
        >
          {/* Screen */}
          <div className="rounded-t-xl border border-white/12 border-b-0 bg-navy-900/90 p-2 shadow-2xl shadow-navy-950/60 backdrop-blur">
            <div className="rounded-lg border border-white/8 bg-navy-950/90 p-3">
              {/* Window chrome */}
              <div className="mb-3 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-400/70" />
                <span className="size-2 rounded-full bg-amber-400/70" />
                <span className="size-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-[10px] text-slate-500">
                  bugcap@labs:~/secure
                </span>
              </div>

              {/* Code lines */}
              <div className="flex flex-col gap-2">
                {CODE_LINES.map((line, index) => (
                  <span
                    key={index}
                    className={cn(
                      'h-1.5 origin-left animate-grow-x rounded-full',
                      line.width,
                      line.color,
                    )}
                    style={{ animationDelay: `${500 + index * 120}ms` }}
                  />
                ))}
                <span className="mt-1 flex items-center gap-2 font-mono text-[10px] text-emerald-400/80">
                  <span className="text-brand-400">$</span>
                  scan --target production
                  <span className="inline-block h-3 w-1.5 animate-blink bg-emerald-400/80" />
                </span>
              </div>
            </div>
          </div>

          {/* Base */}
          <div className="h-2.5 rounded-b-xl bg-gradient-to-b from-slate-600/60 to-slate-800/60" />
          <div className="mx-auto h-1 w-1/4 rounded-b-lg bg-slate-700/60" />
        </div>
      </div>

      {/* Floating status chips */}
      <span
        className={cn(
          'absolute top-8 -left-2 hidden items-center gap-2 rounded-xl border border-white/10 bg-navy-800/85 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur sm:flex',
          !prefersReducedMotion && 'animate-float',
        )}
      >
        <span className="size-2 rounded-full bg-emerald-400" />
        Threats blocked
      </span>

      <span
        className={cn(
          'absolute right-0 bottom-12 hidden items-center gap-2 rounded-xl border border-white/10 bg-navy-800/85 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur sm:flex',
          !prefersReducedMotion && 'animate-float-slow',
        )}
        style={{ animationDelay: '0.8s' }}
      >
        <span className="size-2 rounded-full bg-brand-400" />
        99.9% uptime
      </span>
    </div>
  );
}
