import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');

test('GuestProgressProvider routes every runtime update through the validated state boundary', () => {
  assert.match(provider, /applyValidatedGuestStateUpdate/);
  assert.match(provider, /const result = applyValidatedGuestStateUpdate\(current, updater\)/);
  assert.match(provider, /if \(!result\.applied\) return current/);
  assert.match(provider, /stateRef\.current = result\.state/);
});
