import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { GUEST_PROGRESS_STORAGE_KEY, storageEventAffectsGuestProgress } from '../src/lib/guest-progress.ts';

test('guest storage conflict policy treats localStorage.clear as affecting EcoPulse progress', () => {
  assert.equal(storageEventAffectsGuestProgress(null), true);
  assert.equal(storageEventAffectsGuestProgress(GUEST_PROGRESS_STORAGE_KEY), true);
  assert.equal(storageEventAffectsGuestProgress('unrelated:key'), false);
});

test('provider uses the shared storage-event policy instead of rejecting null keys directly', () => {
  const source = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
  assert.match(source, /storageEventAffectsGuestProgress\(event\.key\)/);
  assert.doesNotMatch(source, /event\.key\s*!==\s*GUEST_PROGRESS_STORAGE_KEY/);
});
