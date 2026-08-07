import { describe, expect, it } from 'vitest';
import { cn } from '@/utils/cn';
import { formatCount } from '@/utils/dom';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, null, 'c')).toBe('a c');
  });

  it('lets the last conflicting Tailwind utility win', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-white', 'text-brand-300')).toBe('text-brand-300');
  });

  it('keeps non-conflicting utilities', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });
});

describe('formatCount', () => {
  it('formats with Indian digit grouping', () => {
    expect(formatCount(100000)).toBe('1,00,000');
  });

  it('rounds fractional values from the count-up animation', () => {
    expect(formatCount(499.6)).toBe('500');
  });

  it('handles zero', () => {
    expect(formatCount(0)).toBe('0');
  });
});
