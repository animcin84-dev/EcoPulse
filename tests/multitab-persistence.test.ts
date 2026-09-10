import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
const notice = readFileSync('src/components/progress/PersistenceNotice.tsx', 'utf8');

test('guest provider detects external writes to the exact local progress key', () => {
  assert.match(provider, /GUEST_PROGRESS_STORAGE_KEY/);
  assert.match(provider, /addEventListener\(['"]storage['"]/);
  assert.match(provider, /storageEventAffectsGuestProgress\(event\.key\)/);
  assert.doesNotMatch(provider, /event\.key\s*!==\s*GUEST_PROGRESS_STORAGE_KEY/);
  assert.match(provider, /setPersistenceStatus\(['"]conflict['"]\)/);
  assert.match(provider, /removeEventListener\(['"]storage['"]/);
});

test('a conflicted tab suppresses further local progress writes', () => {
  assert.match(provider, /persistenceStatus === ['"]conflict['"][^\n]*return/);
});

test('conflict recovery is bilingual and offers both export and reload without auto merge', () => {
  assert.match(notice, /persistenceStatus === ['"]conflict['"]/);
  assert.match(notice, /another EcoPulse tab|another tab/i);
  assert.match(notice, /басқа.*қойынды|қойындыда/i);
  assert.match(notice, /\/settings#data-controls/);
  assert.match(notice, /window\.location\.reload\(\)/);
  assert.doesNotMatch(provider, /mergeProgressSnapshots/);
});
