import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const controls = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');

test('settings import is local-only, hydration-safe and requires strict parser preview before replace', () => {
  assert.match(controls, /parseLearningDataImport/);
  assert.match(controls, /summarizeLearningDataImport/);
  assert.match(controls, /accept=["']\.json,application\/json["']/);
  assert.match(controls, /\.text\(\)/);
  assert.match(controls, /persistenceStatus\s*===\s*['"]saved['"]/);
  assert.match(controls, /importPreview/);
  assert.match(controls, /confirmImport/);
  assert.doesNotMatch(controls, /fetch\(|XMLHttpRequest|navigator\.sendBeacon/);
});

test('validated import is saved durably before replacing in-memory guest state', () => {
  assert.match(controls, /saveGuestState\(importPreview\.state,\s*getBrowserStorage\(window\)\)/);
  assert.match(controls, /if \(!saved\)/);
  assert.match(controls, /updateState\(\(\) => importPreview\.state\)/);
});
