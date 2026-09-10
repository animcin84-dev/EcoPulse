import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('bulk experience CSS is split into ordered core, product-polish and continuity layers', () => {
  assert.ok(existsSync(new URL('../src/app/product-polish.css', import.meta.url)));
  assert.ok(existsSync(new URL('../src/app/continuity.css', import.meta.url)));
  const layout = read('../src/app/layout.tsx');
  const core = layout.indexOf("import './experiences.css'");
  const polish = layout.indexOf("import './product-polish.css'");
  const continuity = layout.indexOf("import './continuity.css'");
  const continuation = layout.indexOf("import './continuation.css'");
  assert.ok(core >= 0 && polish > core && continuity > polish && continuation > continuity);
  assert.ok(read('../src/app/experiences.css').length < 30_000);
  assert.match(read('../src/app/product-polish.css'), /navigation language tools and Learn topic atlas/);
  assert.match(read('../src/app/continuity.css'), /route motion, compact lesson progress/);
});
