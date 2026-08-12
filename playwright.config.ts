import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end configuration.
 *
 * These specs run against a real production build (`next build && next start`),
 * not the dev server — dev-only overlays and unminified bundles would make the
 * accessibility and console-error assertions unreliable.
 *
 * `CHROMIUM_PATH` lets the container point at its preinstalled browser; leave
 * it unset locally and Playwright uses its own.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

const executablePath = process.env.CHROMIUM_PATH;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',

  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],

  // Reuse an already-running server when one is up, so the suite can be
  // pointed at a preview deployment via E2E_BASE_URL too.
  ...(process.env.E2E_BASE_URL
    ? {}
    : {
        webServer: {
          command: `npx next start -p ${PORT}`,
          url: BASE_URL,
          timeout: 120_000,
          reuseExistingServer: !process.env.CI,
        },
      }),
});
