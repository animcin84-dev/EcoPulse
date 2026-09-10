import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
const dataControls = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');

test('GuestProgressProvider exposes persistence status from both load and save results', () => {
  assert.match(provider, /loadGuestStateWithStatus/);
  assert.match(provider, /persistenceStatus/);
  assert.match(provider, /setPersistenceStatus/);
  assert.match(provider, /saveGuestState\([^)]*\)/);
  assert.match(provider, /saved \? ['"]saved['"] : ['"]unavailable['"]/);
});

test('root layout renders one provider-aware persistence recovery notice', () => {
  assert.match(layout, /PersistenceNotice/);
  assert.match(layout, /<PersistenceNotice\s*\/>/);
});

test('persistence notice is bilingual, polite, and links to anchored export controls', () => {
  const notice = readFileSync('src/components/progress/PersistenceNotice.tsx', 'utf8');
  assert.match(notice, /preferredLocale/);
  assert.match(notice, /persistenceStatus === ['"]unavailable['"]/);
  assert.match(notice, /aria-live=['"]polite['"]/);
  assert.match(notice, /\/settings#data-controls/);
  assert.match(notice, /export/i);
  assert.match(notice, /экспорт|экспортта/i);
  assert.match(dataControls, /id=['"]data-controls['"]/);
});
