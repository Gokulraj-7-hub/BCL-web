'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TypedTextProps {
  /** Phrases cycled through, one character at a time. */
  phrases: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  /** How long a completed phrase stays on screen, in ms. */
  pauseDuration?: number;
  className?: string;
}

/**
 * Typewriter effect.
 *
 * The full phrase list is also rendered into a visually hidden node so screen
 * readers and crawlers see the complete content rather than a partial string.
 * Under reduced motion the first phrase is shown statically.
 */
export function TypedText({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 1800,
  className,
}: TypedTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) return;

    const current = phrases[phraseIndex % phrases.length] ?? '';

    // Finished typing: hold, then start deleting.
    if (!isDeleting && displayed === current) {
      const timer = window.setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => window.clearTimeout(timer);
    }

    // Finished deleting: advance to the next phrase.
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setPhraseIndex((index) => (index + 1) % phrases.length);
      return undefined;
    }

    const timer = window.setTimeout(
      () => {
        setDisplayed((text) =>
          isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
        );
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => window.clearTimeout(timer);
  }, [
    displayed,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    prefersReducedMotion,
  ]);

  if (prefersReducedMotion) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <>
      <span className={cn('inline-flex items-center', className)} aria-hidden="true">
        {displayed}
        <span className="ml-0.5 inline-block h-[1.05em] w-0.5 animate-blink bg-brand-400 align-middle" />
      </span>
      <span className="sr-only">{phrases.join(', ')}</span>
    </>
  );
}
