import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom implements neither of these, and several components rely on them.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
vi.stubGlobal('ResizeObserver', class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

afterEach(() => {
  cleanup();
});
