import { readFileSync } from 'node:fs';

const stylesheets = [
  '../src/app/globals.css',
  '../src/app/sunlit.css',
  '../src/app/climate.css',
  '../src/app/experiences.css',
  '../src/app/product-polish.css',
  '../src/app/continuity.css',
  '../src/app/continuation.css',
  '../src/app/accessibility.css',
] as const;

export function readPresentationCssBundle(): string {
  return stylesheets
    .map((path) => readFileSync(new URL(path, import.meta.url), 'utf8'))
    .join('\n');
}
