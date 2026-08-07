#!/usr/bin/env python3
"""Generate the branded gallery placeholder images in `public/gallery`.

These stand in for real photography so the gallery grid, category filters and
lightbox are fully functional before launch. Replace each file with a real
photograph (1600x1200 or similar 4:3, WebP/AVIF preferred) and update the
matching `alt` text in `constants/gallery.ts`.

Run from the project root:  python3 scripts/generate-gallery-placeholders.py
"""

from html import escape
from pathlib import Path

OUTPUT_DIR = Path('public/gallery')

# (filename, category, accent colour, base colour)
ITEMS = [
    ('training-01', 'Training', '#2b8cee', '#1a4076'),
    ('training-02', 'Training', '#60b4fa', '#194a91'),
    ('internships-01', 'Internships', '#38bdf8', '#155e75'),
    ('internships-02', 'Internships', '#22d3ee', '#164e63'),
    ('workshops-01', 'Workshops', '#818cf8', '#312e81'),
    ('workshops-02', 'Workshops', '#a78bfa', '#4c1d95'),
    ('hackathons-01', 'Hackathons', '#34d399', '#065f46'),
    ('hackathons-02', 'Hackathons', '#4ade80', '#14532d'),
    ('office-01', 'Office', '#facc15', '#713f12'),
    ('office-02', 'Office', '#fb923c', '#7c2d12'),
    ('seminars-01', 'Seminars', '#f472b6', '#831843'),
    ('seminars-02', 'Seminars', '#f87171', '#7f1d1d'),
]

TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="{category} placeholder image">
  <defs>
    <linearGradient id="bg{i}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{base}"/>
      <stop offset="100%" stop-color="#070c1d"/>
    </linearGradient>
    <pattern id="grid{i}" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="{accent}" stroke-opacity="0.12" stroke-width="1.5"/>
    </pattern>
    <radialGradient id="glow{i}" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="900" fill="url(#bg{i})"/>
  <rect width="1200" height="900" fill="url(#grid{i})"/>
  <rect width="1200" height="900" fill="url(#glow{i})"/>

  <g opacity="0.45" stroke="{accent}" stroke-width="2.5" fill="none">
    <path d="M170 760 L340 660 L520 715 L700 600 L900 665 L1040 570"/>
  </g>
  <g fill="{accent}">
    <circle cx="170" cy="760" r="10"/><circle cx="340" cy="660" r="10"/><circle cx="520" cy="715" r="10"/>
    <circle cx="700" cy="600" r="10"/><circle cx="900" cy="665" r="10"/><circle cx="1040" cy="570" r="10"/>
  </g>

  <g transform="translate(504 170) scale(3)">
    <rect width="64" height="64" rx="12" fill="#ffffff" fill-opacity="0.94"/>
    <path d="M11 18h9.5c3.2 0 5.4 1.8 5.4 4.6 0 1.9-1 3.3-2.6 4 2 .6 3.3 2.2 3.3 4.4 0 3.2-2.4 5.2-6.1 5.2H11V18Zm4.3 3.4v4h4.3c1.4 0 2.3-.8 2.3-2s-.9-2-2.3-2h-4.3Zm0 7.1v4.4h4.7c1.6 0 2.6-.9 2.6-2.2 0-1.3-1-2.2-2.6-2.2h-4.7Z" fill="#1a6fdc"/>
    <path d="M43.6 22.6a9.2 9.2 0 1 0 0 12.5" stroke="#2b8cee" stroke-width="4.2" stroke-linecap="round" fill="none"/>
    <path d="M48 18h4.3v14.2H60V36H48V18Z" fill="#1a6fdc"/>
    <circle cx="38.5" cy="28.8" r="2.6" fill="#0a1128"/>
  </g>

  <rect x="{chip_x}" y="418" width="{chip_w}" height="54" rx="27" fill="{accent}" fill-opacity="0.18" stroke="{accent}" stroke-opacity="0.55"/>
  <text x="600" y="454" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="4" fill="{accent}">{category_upper}</text>

  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" fill="#94a3b8">Placeholder image</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="21" fill="#64748b">Replace with a real photograph before launch</text>
</svg>
'''


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for index, (name, category, accent, base) in enumerate(ITEMS):
        category_upper = category.upper()
        # Rough advance width for the letter-spaced uppercase label.
        chip_w = 80 + len(category_upper) * 19
        svg = TEMPLATE.format(
            i=index,
            # `escape` guards against an unescaped `&` breaking XML parsing.
            category=escape(category),
            category_upper=escape(category_upper),
            accent=accent,
            base=base,
            chip_w=chip_w,
            chip_x=600 - chip_w // 2,
        )
        (OUTPUT_DIR / f'{name}.svg').write_text(svg, encoding='utf-8')

    print(f'Wrote {len(ITEMS)} placeholder images to {OUTPUT_DIR}')


if __name__ == '__main__':
    main()
