'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { formatCount } from '@/utils/dom';
import { cn } from '@/utils/cn';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Number that counts up when it scrolls into view.
 *
 * The final value is exposed to assistive technology via `aria-label` so
 * screen readers announce the result rather than a stream of intermediate
 * numbers.
 */
export function Counter({ value, suffix = '', prefix = '', duration, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const current = useCountUp({ end: value, duration, start: isInView });

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {/*
        `aria-label` is prohibited on a plain span, so the final value is
        exposed as visually hidden text instead. Screen readers announce the
        result once rather than every intermediate frame.
      */}
      <span className="sr-only">
        {prefix}
        {formatCount(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {formatCount(current)}
        {suffix}
      </span>
    </span>
  );
}
