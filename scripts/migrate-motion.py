#!/usr/bin/env python3
"""One-off codemod: replace Framer Motion scroll-reveal with the CSS `Reveal`.

Kept in the repo as a record of the migration. Motion components used purely
for "fade in when scrolled into view" become `<Reveal>`; genuine animation
(the accordion's auto-height, the lightbox modal, the gallery's filter layout
transitions) keeps Framer Motion and stays in its own lazily-loaded chunk.
"""

import re
import sys
from pathlib import Path

# Files whose motion usage is purely scroll-reveal.
TARGETS = [
    'sections/About.tsx',
    'sections/Contact.tsx',
    'sections/Faq.tsx',
    'sections/Internships.tsx',
    'sections/Process.tsx',
    'sections/Services.tsx',
    'sections/Stats.tsx',
    'sections/Technologies.tsx',
    'sections/Testimonials.tsx',
    'sections/Training.tsx',
    'sections/WhyChooseUs.tsx',
]

# Variant name -> Reveal `direction`
DIRECTION_BY_VARIANT = {
    'fadeInUp': 'up',
    'fadeIn': 'none',
    'fadeInDown': 'up',
    'slideInLeft': 'left',
    'slideInRight': 'right',
    'scaleIn': 'scale',
    'staggerContainer': 'up',
    'staggerContainerSlow': 'up',
}

MOTION_TAG = re.compile(r'<motion\.(\w+)\b')
CLOSING_TAG = re.compile(r'</motion\.(\w+)>')


def strip_motion_props(block: str) -> tuple[str, str]:
    """Remove motion-only props from an opening tag; return (cleaned, direction)."""
    direction = 'up'

    variant_match = re.search(r'variants=\{(\w+)\}', block)
    if variant_match:
        direction = DIRECTION_BY_VARIANT.get(variant_match.group(1), 'up')

    for pattern in (
        r'\s*variants=\{\w+\}',
        r'\s*initial=(?:"[^"]*"|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})',
        r'\s*animate=(?:"[^"]*"|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})',
        r'\s*whileInView=(?:"[^"]*"|\{[^{}]*\})',
        r'\s*exit=\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}',
        r'\s*transition=\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}',
        r'\s*viewport=(?:\{viewportOnce\}|\{\{[^{}]*\}\})',
        r'\s*layout\b(?!=)',
        r'\s*layoutId="[^"]*"',
    ):
        block = re.sub(pattern, '', block)

    return block, direction


def convert(path: Path) -> bool:
    source = path.read_text(encoding='utf-8')
    if 'framer-motion' not in source:
        return False

    out = []
    index = 0
    stack = []

    while index < len(source):
        open_match = MOTION_TAG.search(source, index)
        close_match = CLOSING_TAG.search(source, index)

        if not open_match and not close_match:
            out.append(source[index:])
            break

        if open_match and (not close_match or open_match.start() < close_match.start()):
            # Find the end of this opening tag, respecting nested braces.
            cursor = open_match.end()
            depth = 0
            while cursor < len(source):
                char = source[cursor]
                if char == '{':
                    depth += 1
                elif char == '}':
                    depth -= 1
                elif char == '>' and depth == 0:
                    break
                cursor += 1

            self_closing = source[cursor - 1] == '/'
            tag_body = source[open_match.end() : cursor - (1 if self_closing else 0)]
            cleaned, direction = strip_motion_props(tag_body)

            element = open_match.group(1)
            as_prop = '' if element == 'div' else f' as="{element}"'
            dir_prop = '' if direction == 'up' else f' direction="{direction}"'

            out.append(source[index : open_match.start()])
            out.append(f'<Reveal{as_prop}{dir_prop}{cleaned}{"/" if self_closing else ""}>')
            if not self_closing:
                stack.append(element)
            index = cursor + 1
        else:
            out.append(source[index : close_match.start()])
            out.append('</Reveal>')
            if stack:
                stack.pop()
            index = close_match.end()

    result = ''.join(out)

    # Swap the imports.
    result = re.sub(r"import \{[^}]*\} from 'framer-motion';\n", '', result)
    result = re.sub(
        r"import \{[^}]*\} from '@/lib/motion';\n",
        "import { Reveal } from '@/components/ui/Reveal';\n",
        result,
    )
    if "from '@/components/ui/Reveal'" not in result:
        result = result.replace(
            "import { Container } from '@/components/ui/Container';",
            "import { Container } from '@/components/ui/Container';\n"
            "import { Reveal } from '@/components/ui/Reveal';",
            1,
        )

    path.write_text(result, encoding='utf-8')
    return True


def main() -> int:
    for name in TARGETS:
        path = Path(name)
        if not path.exists():
            print(f'skip (missing): {name}')
            continue
        print(('converted' if convert(path) else 'no motion'), name)
    return 0


if __name__ == '__main__':
    sys.exit(main())
