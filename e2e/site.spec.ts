import { test, expect, type Page } from '@playwright/test';

/** Functional and responsive coverage for the page's interactive surfaces. */

const SECTION_IDS = [
  'home',
  'about',
  'why-us',
  'stats',
  'services',
  'training',
  'internships',
  'technologies',
  'process',
  'testimonials',
  'gallery',
  'faq',
  'contact',
] as const;

async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
  });
  await page.waitForTimeout(1200);
}

test('renders every section', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollThroughPage(page);

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`), `section #${id} should exist`).toHaveCount(1);
  }
});

test('does not overflow horizontally', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollThroughPage(page);

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test('loads without console or page errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollThroughPage(page);

  // The Google Maps embed is blocked by some sandboxed networks; that is an
  // environment condition, not a defect in the page.
  expect(errors.filter((error) => !/maps\.google|google\.com\/maps/.test(error))).toEqual([]);
});

test('gallery filters the grid and opens a lightbox', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const gridItems = page.locator('#gallery ul li');
  const totalCount = await gridItems.count();
  expect(totalCount).toBeGreaterThan(0);

  await page.getByRole('button', { name: 'Workshops', exact: true }).click();
  await page.waitForTimeout(400);
  const filteredCount = await gridItems.count();
  expect(filteredCount).toBeGreaterThan(0);
  expect(filteredCount).toBeLessThan(totalCount);

  await gridItems.first().locator('button').click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('FAQ accordion expands and collapses', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const trigger = page.locator('#faq h3 button').first();

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
  });

  test('blocks an empty submission and shows errors', async ({ page }) => {
    let posted = false;
    await page.route('**/api/contact', (route) => {
      posted = true;
      return route.abort();
    });

    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByRole('alert').first()).toBeVisible();
    expect(posted).toBe(false);
  });

  test('submits valid input and reports success', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thank you for your message.' }),
      }),
    );

    await page.getByLabel(/full name/i).fill('Manikandan K');
    await page.getByLabel(/email address/i).fill('someone@example.com');
    await page.getByLabel(/phone number/i).fill('+91 79047 67261');
    await page.getByLabel(/subject/i).fill('Penetration testing enquiry');
    await page
      .getByLabel(/message/i)
      .fill('We would like a vulnerability assessment for our web application.');

    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('Thank you for your message.')).toBeVisible();
  });

  test('surfaces a server error without losing the visitor', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'We could not send your message.' }),
      }),
    );

    await page.getByLabel(/full name/i).fill('Manikandan K');
    await page.getByLabel(/email address/i).fill('someone@example.com');
    await page.getByLabel(/phone number/i).fill('+91 79047 67261');
    await page.getByLabel(/subject/i).fill('Cloud migration enquiry');
    await page.getByLabel(/message/i).fill('We are planning a migration to AWS this quarter.');

    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('We could not send your message.')).toBeVisible();
  });
});

test('contact API rejects non-POST methods', async ({ request }) => {
  const response = await request.get('/api/contact');
  expect(response.status()).toBe(405);
  expect(response.headers()['allow']).toBe('POST');
});

test('contact API validates its payload server-side', async ({ request }) => {
  // The client form is bypassed entirely here — validation must still hold.
  const response = await request.post('/api/contact', {
    data: { name: 'A', email: 'nope', phone: '1', subject: 'x', message: 'short' },
  });

  expect(response.status()).toBe(422);
  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.errors).toBeTruthy();
});

test('contact API silently accepts and discards honeypot submissions', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      name: 'Spam Bot',
      email: 'spam@example.com',
      phone: '+91 79047 67261',
      subject: 'Cheap backlinks',
      message: 'Buy our search engine optimisation package today.',
      company: 'filled-by-a-bot',
    },
  });

  // A generic success gives the bot no signal about which field betrayed it.
  expect(response.status()).toBe(200);
  expect((await response.json()).success).toBe(true);
});
