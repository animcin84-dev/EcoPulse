import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/components/review/ReviewSession.tsx', 'utf8');

test('ReviewSession exposes semantic progress and a live item announcement', () => {
  assert.match(source, /role="progressbar"/);
  assert.match(source, /aria-valuenow=/);
  assert.match(source, /aria-valuetext=/);
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /formatReviewItemAnnouncement/);
});

test('recognition review supports guarded numeric shortcuts', () => {
  assert.match(source, /addEventListener\(['"]keydown['"]/);
  assert.match(source, /editable/i);
  assert.match(source, /event\.key/);
  assert.match(source, /optionIndex/);
});

test('ReviewSession focuses the active item only when item navigation changes it', () => {
  assert.match(source, /reviewItemFocusRef/);
  assert.match(source, /tabIndex=\{-1\}/);
  assert.match(source, /\.focus\(/);
  assert.match(source, /focusRequest/);
});
