import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { getBrowserStorage } from '../src/lib/guest-progress.ts';

const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
const notice = readFileSync('src/components/progress/PersistenceNotice.tsx', 'utf8');
const controls = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');

test('browser storage acquisition safely handles a throwing localStorage getter', () => {
  const source = Object.create(null, {
    localStorage: {
      get() { throw new Error('SecurityError'); },
    },
  });
  assert.equal(getBrowserStorage(source), undefined);
});

test('browser storage acquisition returns an accessible storage object', () => {
  const storage = { getItem() { return null; }, setItem() {}, removeItem() {} };
  assert.equal(getBrowserStorage({ localStorage: storage }), storage);
});

test('progress and recovery components never access window.localStorage directly', () => {
  assert.match(provider, /getBrowserStorage\(window\)/);
  assert.match(notice, /getBrowserStorage\(window\)/);
  assert.match(controls, /getBrowserStorage\(window\)/);
  assert.doesNotMatch(provider, /window\.localStorage/);
  assert.doesNotMatch(notice, /window\.localStorage/);
  assert.doesNotMatch(controls, /window\.localStorage/);
});
