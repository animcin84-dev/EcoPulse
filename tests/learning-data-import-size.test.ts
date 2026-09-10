import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { MAX_LEARNING_DATA_IMPORT_BYTES, parseLearningDataImport } from '../src/domain/learning/data-controls.ts';

test('raw import parser rejects oversized payloads before attempting normal validation', () => {
  const raw = 'x'.repeat(MAX_LEARNING_DATA_IMPORT_BYTES + 1);
  assert.deepEqual(parseLearningDataImport(raw), { ok: false, reason: 'too-large' });
});

test('file import checks browser file size before reading file text', () => {
  const source = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');
  const sizeGuard = source.indexOf('file.size > MAX_LEARNING_DATA_IMPORT_BYTES');
  const textRead = source.indexOf('await file.text()');
  assert.ok(sizeGuard >= 0, 'missing file-size guard');
  assert.ok(textRead >= 0, 'missing file.text()');
  assert.ok(sizeGuard < textRead, 'file size must be checked before reading text');
});
