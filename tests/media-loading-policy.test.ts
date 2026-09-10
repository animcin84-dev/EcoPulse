import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldLoadInstitutionalMedia } from '../src/domain/learning/media-preference.ts';

test('reduced-data preference never loads remote institutional media', () => {
  assert.equal(shouldLoadInstitutionalMedia('reduced', false), false);
  assert.equal(shouldLoadInstitutionalMedia('reduced', true), false);
});

test('automatic media respects the browser Save-Data signal when available', () => {
  assert.equal(shouldLoadInstitutionalMedia('auto', true), false);
  assert.equal(shouldLoadInstitutionalMedia('auto', false), true);
  assert.equal(shouldLoadInstitutionalMedia('auto', null), false, 'unknown Save-Data state should stay diagram-first');
});
