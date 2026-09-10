import test from 'node:test';
import assert from 'node:assert/strict';

import { inferDiagnosticLevel, normalizeInterests } from '../src/domain/learning/onboarding.ts';

test('diagnostic level is deterministic across A2 B1 and B2 score bands', () => {
  assert.equal(inferDiagnosticLevel([false, false, false]), 'A2');
  assert.equal(inferDiagnosticLevel([true, false, false]), 'A2');
  assert.equal(inferDiagnosticLevel([true, true, false]), 'B1');
  assert.equal(inferDiagnosticLevel([true, true, true]), 'B2');
});

test('onboarding interests are deduplicated and restricted to approved categories', () => {
  assert.deepEqual(normalizeInterests(['climate', 'water', 'water', 'unknown', 'life']), ['climate', 'water', 'life']);
});
