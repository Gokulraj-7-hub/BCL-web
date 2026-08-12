import { test, expect } from '@playwright/test';

/** SEO and crawlability regressions. */

test.describe('metadata', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('has a title, description and canonical URL', async ({ page }) => {
    await expect(page).toHaveTitle(/BugCap Labs/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /BugCap Labs Pvt\. Ltd\./);

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });

  test('exposes Open Graph and Twitter card tags with a PNG image', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');

    // SVG previews are not rendered by Facebook, LinkedIn or WhatsApp.
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\.png$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /\.png$/);
  });

  test('emits all six Schema.org graphs as valid JSON-LD', async ({ page }) => {
    const blocks = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.map((node) => node.textContent ?? ''),
    );

    expect(blocks).toHaveLength(6);

    const types = blocks.map((block) => JSON.parse(block)['@type']);
    expect(types).toEqual(
      expect.arrayContaining([
        'Organization',
        'ProfessionalService',
        'WebSite',
        'EducationalOrganization',
        'FAQPage',
        'BreadcrumbList',
      ]),
    );
  });

  test('declares language and viewport', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-IN');
    await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
  });
});

test.describe('crawlability endpoints', () => {
  test('serves robots.txt with a sitemap reference', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('Sitemap:');
    expect(body).toContain('Disallow: /api/');
  });

  test('serves a sitemap containing the home page', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('<urlset');
  });

  test('serves the PWA manifest with PNG icons', async ({ request }) => {
    const response = await request.get('/manifest.webmanifest');
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toContain('BugCap Labs');
    // Android's install prompt ignores SVG icons.
    for (const icon of manifest.icons) {
      expect(icon.type).toBe('image/png');
    }
  });

  test('serves every branded asset with the right content type', async ({ request }) => {
    const assets = [
      ['/og-image.png', 'image/png'],
      ['/icon-192.png', 'image/png'],
      ['/icon-512.png', 'image/png'],
      ['/apple-touch-icon.png', 'image/png'],
      ['/favicon.svg', 'image/svg+xml'],
    ] as const;

    for (const [path, contentType] of assets) {
      const response = await request.get(path);
      expect(response.status(), `${path} should be served`).toBe(200);
      expect(response.headers()['content-type']).toContain(contentType);
    }
  });

  test('404 page returns 404 and is marked noindex exactly once', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');
    expect(response?.status()).toBe(404);

    const robots = await page.$$eval('meta[name="robots"]', (nodes) =>
      nodes.map((node) => node.getAttribute('content')),
    );

    expect(robots.length).toBeGreaterThan(0);

    // Next emits its own noindex for the not-found boundary while the root
    // layout's directive is still inherited, so more than one tag is expected.
    // What must never happen is the two disagreeing — drop the page's own
    // `robots` override and the second tag reverts to `index, follow`.
    for (const directive of robots) {
      expect(directive, `conflicting robots directive: ${directive}`).toContain('noindex');
    }
  });
});

test('has no broken in-page anchors', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Mount every lazily-loaded section so its id exists before resolving links.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
  });
  await page.waitForTimeout(1200);

  const missing = await page.evaluate(() => {
    const hrefs = Array.from(document.querySelectorAll('a[href^="#"]')).map((a) =>
      a.getAttribute('href'),
    );
    return [...new Set(hrefs)].filter(
      (href) => href && href !== '#' && !document.getElementById(href.slice(1)),
    );
  });

  expect(missing).toEqual([]);
});

test('security headers are present', async ({ request }) => {
  const response = await request.get('/');
  const headers = response.headers();

  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('SAMEORIGIN');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['content-security-policy']).toContain("object-src 'none'");
  expect(headers['strict-transport-security']).toContain('max-age=');
  // Next.js should not advertise itself.
  expect(headers['x-powered-by']).toBeUndefined();
});
