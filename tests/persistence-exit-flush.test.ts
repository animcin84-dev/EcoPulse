import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { flushGuestStateBeforeExit, type GuestPersistenceStatus } from '../src/lib/guest-progress.ts';

function memoryStorage() {
  const values = new Map<string, string>();
  let writes = 0;
  return {
    getItem(key: string) { return values.get(key) ?? null; },
    setItem(key: string, value: string) { writes += 1; values.set(key, value); },
    removeItem(key: string) { values.delete(key); },
    get writes() { return writes; },
  };
}

test('exit flush writes the latest guest snapshot for writable persistence states', () => {
  const state = { ...createEmptyGuestState(), xp: 85 };
  const storage = memoryStorage();

  assert.equal(flushGuestStateBeforeExit(state, 'saved', storage), true);
  assert.equal(storage.writes, 1);
  assert.match(storage.getItem('ecopulse:guest-progress:v1') ?? '', /"xp":85/);
});

test('exit flush can make one last retry after a previously unavailable save', () => {
  const state = { ...createEmptyGuestState(), xp: 40 };
  const storage = memoryStorage();

  assert.equal(flushGuestStateBeforeExit(state, 'unavailable', storage), true);
  assert.equal(storage.writes, 1);
});

test('exit flush never overwrites protected conflict or quarantine states', () => {
  const protectedStates: GuestPersistenceStatus[] = ['checking', 'conflict', 'corrupt', 'incompatible', 'unsupported'];
  const storage = memoryStorage();
  const state = createEmptyGuestState();

  for (const status of protectedStates) {
    assert.equal(flushGuestStateBeforeExit(state, status, storage), false);
  }
  assert.equal(storage.writes, 0);
});

test('provider keeps a freshest-state ref and flushes on pagehide or hidden visibility', () => {
  const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
  assert.match(provider, /useRef<GuestState>/);
  assert.match(provider, /stateRef\.current\s*=\s*result\.state/);
  assert.match(provider, /window\.addEventListener\(['"]pagehide['"]/);
  assert.match(provider, /document\.addEventListener\(['"]visibilitychange['"]/);
  assert.match(provider, /document\.visibilityState\s*===\s*['"]hidden['"]/);
  assert.match(provider, /flushGuestStateBeforeExit\(/);
});
