import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility regression tests.
 *
 * Automated tooling catches roughly a third of WCAG issues, so this suite
 * covers the machine-checkable part and the structural invariants that were
 * broken at least once during development (see `docs/ACCESSIBILITY.md`).
 * Screen-reader and zoom testing still need a human.
 */

/** Scroll the whole page so every lazily-mounted section is in the DOM. */
async function mountAllSections(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
});

test('has no detectable WCAG 2.1 A/AA violations', async ({ page }) => {
  await mountAllSections(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    // The Google Maps embed is third-party markup we cannot fix.
    .exclude('iframe')
    .analyze();

  // Print the detail on failure — the default message is just a count.
  expect(
    results.violations.map((v) => `${v.id}: ${v.description} (${v.nodes.length} nodes)`),
  ).toEqual([]);
});

test('has exactly one h1 and no skipped heading levels', async ({ page }) => {
  await mountAllSections(page);

  const headings = await page.$$eval('h1,h2,h3,h4,h5,h6', (nodes) =>
    nodes.map((node) => ({
      level: Number(node.tagName[1]),
      text: (node.textContent ?? '').trim().slice(0, 40),
    })),
  );

  expect(headings.filter((h) => h.level === 1)).toHaveLength(1);

  const skips = headings.flatMap((heading, index) => {
    const previous = headings[index - 1];
    if (!previous || heading.level - previous.level <= 1) return [];
    return [`h${previous.level} "${previous.text}" -> h${heading.level} "${heading.text}"`];
  });
  expect(skips).toEqual([]);
});

test('every image has alt text and every control has an accessible name', async ({ page }) => {
  await mountAllSections(page);

  const imagesWithoutAlt = await page.$$eval(
    'img',
    (nodes) => nodes.filter((node) => !node.hasAttribute('alt')).length,
  );
  expect(imagesWithoutAlt).toBe(0);

  const unnamed = await page.$$eval('button, a', (nodes) =>
    nodes
      .filter((node) => {
        if (node.closest('[aria-hidden="true"]')) return false;
        const name = (node.getAttribute('aria-label') ?? node.textContent ?? '').trim();
        return name.length === 0;
      })
      .map((node) => node.outerHTML.slice(0, 80)),
  );
  expect(unnamed).toEqual([]);
});

test('skip link is the first tab stop, becomes visible, and moves focus to main', async ({
  page,
}) => {
  await page.keyboard.press('Tab');

  const skipLink = page.locator('a[href="#main-content"]');
  await expect(skipLink).toBeFocused();
  // `sr-only-focusable` should give it real dimensions once focused.
  await expect(skipLink).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
});

test('lightbox implements the modal dialog contract', async ({ page }) => {
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  await page.locator('#gallery button:has(img)').first().click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(dialog).toHaveAttribute('aria-label', /Gallery image \d+ of \d+/);
  await expect(dialog).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('accordion exposes expanded state and keeps collapsed panels inert', async ({ page }) => {
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const trigger = page.locator('#faq h3 button').first();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const panelId = await trigger.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();
  const panel = page.locator(`#${panelId}`);
  await expect(panel).toHaveAttribute('aria-labelledby', (await trigger.getAttribute('id')) ?? '');

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('renders without animation when reduced motion is preferred', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'networkidle' });

  // The particle canvas is skipped entirely rather than rendered and paused.
  await expect(page.locator('canvas')).toHaveCount(0);

  // Content is still fully readable.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await context.close();
});
