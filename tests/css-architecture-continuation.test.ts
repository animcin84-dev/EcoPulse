import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('continuation presentation rules live in their own ordered stylesheet', () => {
  assert.ok(existsSync(new URL('../src/app/continuation.css', import.meta.url)));
  const layout = read('../src/app/layout.tsx');
  const experiencesIndex = layout.indexOf("import './experiences.css'");
  const continuationIndex = layout.indexOf("import './continuation.css'");
  const accessibilityIndex = layout.indexOf("import './accessibility.css'");
  assert.ok(experiencesIndex >= 0 && continuationIndex > experiencesIndex && accessibilityIndex > continuationIndex);
  assert.ok(read('../src/app/experiences.css').length < 60_000);
  assert.match(read('../src/app/continuation.css'), /MAX continuation/);
  assert.match(read('../src/app/continuation.css'), /Continuation polish: localized product hubs/);
});
