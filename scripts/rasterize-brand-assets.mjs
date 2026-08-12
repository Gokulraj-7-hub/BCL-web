/**
 * Rasterise the brand SVGs in `public/` to PNG.
 *
 * Why this exists: Facebook, LinkedIn and WhatsApp do not reliably render SVG
 * Open Graph images, and Android PWA install prompts want PNG icons. The SVGs
 * remain the source of truth — re-run this after editing them.
 *
 *   node scripts/rasterize-brand-assets.mjs
 *
 * Requires Playwright's Chromium (already a dev dependency of this project's
 * tooling). Rendering through a real browser keeps gradients, masks and text
 * identical to what the SVG shows on the site.
 */

import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'public');

/** [source SVG, output PNG, width, height] */
const TARGETS = [
  ['og-image.svg', 'og-image.png', 1200, 630],
  ['logo.svg', 'icon-512.png', 512, 512],
  ['logo.svg', 'icon-192.png', 192, 192],
  // Apple touch icons are composited on white by iOS, which the logo already is.
  ['logo.svg', 'apple-touch-icon.png', 180, 180],
  ['logo.svg', 'favicon-32.png', 32, 32],
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
});

try {
  for (const [source, output, width, height] of TARGETS) {
    const svg = await readFile(join(PUBLIC_DIR, source), 'utf8');

    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });

    // `margin: 0` and an exact-size wrapper keep the raster free of padding.
    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8"><style>
         html,body{margin:0;padding:0;background:transparent}
         svg{display:block;width:${width}px;height:${height}px}
       </style></head><body>${svg}</body></html>`,
      { waitUntil: 'load' },
    );

    const buffer = await page.screenshot({ omitBackground: true, type: 'png' });
    await writeFile(join(PUBLIC_DIR, output), buffer);
    await page.close();

    console.log(
      `${source} -> ${output} (${width}x${height}, ${(buffer.length / 1024).toFixed(0)} kB)`,
    );
  }
} finally {
  await browser.close();
}
