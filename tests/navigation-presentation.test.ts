import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { resolveAppNavigationPresentation } from '../src/domain/learning/navigation.ts';

test('app navigation exposes the approved six primary destinations', () => {
  const state = createEmptyGuestState();
  const presentation = resolveAppNavigationPresentation(state, new Date('2026-09-09T12:00:00.000Z'));
  assert.equal(presentation.items.length, 6);
  assert.deepEqual(presentation.items.map((item) => item.href), ['/', '/learn', '/challenges', '/game', '/action', '/pulse']);
});

test('Eco Game navigation item exposes the due review count without adding another destination', () => {
  const state = createEmptyGuestState();
  state.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-08T12:00:00.000Z'));
  const presentation = resolveAppNavigationPresentation(state, new Date('2026-09-09T12:00:00.000Z'));

  const game = presentation.items.find((item) => item.href === '/game');
  assert.equal(game?.badge, 1);
  assert.equal(presentation.items.length, 6);
});

test('navigation labels follow the persisted Kazakh locale', () => {
  const state = createEmptyGuestState();
  state.settings.preferredLocale = 'kk';
  const presentation = resolveAppNavigationPresentation(state, new Date('2026-09-09T12:00:00.000Z'));

  assert.equal(presentation.items[0]?.label, 'Басты бет');
  assert.equal(presentation.items[1]?.label, 'Оқу');
  assert.equal(presentation.items[3]?.label, 'Eco Game');
  assert.equal(presentation.items[4]?.label, 'Eco Action');
  assert.equal(presentation.items[5]?.label, 'Менің прогресім');
});
