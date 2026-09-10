import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { methodologySharePayload } from '../src/domain/learning/methodology-sharing.ts';

const url = 'https://example.test/about';

test('methodology share payload preserves the exact public URL and localizes the message', () => {
  const en = methodologySharePayload('en', url);
  const kk = methodologySharePayload('kk', url);
  assert.equal(en.url, url);
  assert.equal(kk.url, url);
  assert.match(en.title, /EcoPulse/);
  assert.match(en.text.toLowerCase(), /method/);
  assert.match(kk.title, /EcoPulse/);
  assert.match(kk.text.toLowerCase(), /әдіс/);
});

test('methodology distribution controls are user-triggered and do not run print/share from an effect', () => {
  const source = readFileSync('src/components/about/MethodologyDistributionControls.tsx', 'utf8');
  assert.match(source, /window\.print\(\)/);
  assert.match(source, /navigator\.share/);
  assert.match(source, /navigator\.clipboard/);
  assert.doesNotMatch(source, /useEffect/);
});

test('methodology has dedicated print CSS that removes interactive chrome and prints source URLs', () => {
  const css = readFileSync('src/app/globals.css', 'utf8');
  assert.match(css, /@media print/);
  assert.match(css, /\.method-distribution-controls/);
  assert.match(css, /a\[href\^=["']https["']\]::after/);
});
