import test from 'node:test';
import assert from 'node:assert/strict';

import { documentLanguageForLocale, formatLessonProgressText, formatLessonStepAnnouncement, formatReviewProgressText, formatReviewItemAnnouncement } from '../src/domain/learning/accessibility.ts';

test('document language follows the persisted lesson locale', () => {
  assert.equal(documentLanguageForLocale('en'), 'en');
  assert.equal(documentLanguageForLocale('kk'), 'kk');
});

test('lesson progress text is bilingual and one-indexed for assistive technology', () => {
  assert.equal(formatLessonProgressText(0, 5, 'en'), 'Lesson progress: step 1 of 5');
  assert.equal(formatLessonProgressText(2, 5, 'kk'), 'Сабақ прогресі: 5 қадамның 3-қадамы');
});

test('step announcement includes position and authored title without changing the title', () => {
  assert.equal(formatLessonStepAnnouncement(1, 4, 'GLACIER', 'en'), 'Step 2 of 4: GLACIER');
  assert.equal(formatLessonStepAnnouncement(1, 4, 'МҰЗДЫҚ', 'kk'), '4 қадамның 2-қадамы: МҰЗДЫҚ');
});


test('review progress text is bilingual and one-indexed for assistive technology', () => {
  assert.equal(formatReviewProgressText(0, 8, 'en'), 'Review progress: item 1 of 8');
  assert.equal(formatReviewProgressText(3, 8, 'kk'), 'Қайталау прогресі: 8 тапсырманың 4-тапсырмасы');
});

test('review item announcement includes position, mode and word', () => {
  assert.equal(formatReviewItemAnnouncement(1, 5, 'Recall', 'GLACIER', 'en'), 'Review item 2 of 5. Recall: GLACIER');
  assert.equal(formatReviewItemAnnouncement(1, 5, 'Еске түсіру', 'GLACIER', 'kk'), '5 тапсырманың 2-тапсырмасы. Еске түсіру: GLACIER');
});
