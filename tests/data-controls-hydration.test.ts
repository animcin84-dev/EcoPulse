import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const controls = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');

test('data export and reset are gated until guest progress hydration completes', () => {
  assert.match(controls, /hydrated/);
  assert.match(controls, /disabled=\{!canExport\}/);
  assert.match(controls, /disabled=\{!canReset\}/);
  assert.match(controls, /if \(!canExport\) return/);
  assert.match(controls, /if \(!canReset\) return/);
});

test('normal reset clears durable guest storage before reporting completion', () => {
  assert.match(controls, /clearGuestState\(getBrowserStorage\(window\)\)/);
  assert.match(controls, /if \(!cleared && persistenceStatus !== ['"]unavailable['"]\)/);
  assert.match(controls, /setResetDone\(true\)/);
});

test('general reset is disabled during conflict or quarantine recovery states', () => {
  assert.match(controls, /persistenceStatus !== ['"]conflict['"]/);
  assert.match(controls, /persistenceStatus !== ['"]corrupt['"]/);
  assert.match(controls, /persistenceStatus !== ['"]unsupported['"]/);
});
