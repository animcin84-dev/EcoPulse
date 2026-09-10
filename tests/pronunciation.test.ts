import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonSequence } from '../src/content/index.ts';
import { lessonPresentationBySlug } from '../src/content/lesson-presentation.ts';
import { buildPronunciationSpeechText, normalizeSpokenTerms } from '../src/domain/learning/pronunciation.ts';

test('every production lesson has explicit English spoken terms separate from IPA display text', () => {
  for (const lesson of lessonSequence) {
    const presentation = lessonPresentationBySlug[lesson.slug];
    assert.ok(presentation, lesson.slug);
    assert.ok(presentation.spokenTerms.length > 0, lesson.slug);
    for (const term of presentation.spokenTerms) {
      assert.ok(term.trim().length > 0, `${lesson.slug}: blank spoken term`);
      assert.doesNotMatch(term, /[\/ˈˌ]/, `${lesson.slug}: spoken term must not be IPA`);
    }
  }
});

test('speech text keeps authored term order and adds clear pauses between terms', () => {
  assert.equal(buildPronunciationSpeechText(['weather', 'climate']), 'weather. climate.');
  assert.equal(buildPronunciationSpeechText(['atmosphere']), 'atmosphere.');
});

test('spoken term normalization trims blanks and removes accidental duplicates without changing order', () => {
  assert.deepEqual(normalizeSpokenTerms([' glacier ', '', 'melt', 'glacier', '  ']), ['glacier', 'melt']);
});

import { existsSync, readFileSync } from 'node:fs';

test('lesson discover UI delegates pronunciation playback to a dedicated control without autoplay wiring', () => {
  assert.equal(existsSync('src/components/lesson/PronunciationControl.tsx'), true);
  const lessonSource = readFileSync('src/components/lesson/LessonExperience.tsx', 'utf8');
  const controlSource = readFileSync('src/components/lesson/PronunciationControl.tsx', 'utf8');
  assert.match(lessonSource, /PronunciationControl/);
  assert.doesNotMatch(lessonSource, /Pronunciation audio is planned/);
  assert.match(controlSource, /speechSynthesis/);
  assert.match(controlSource, /onClick/);
  assert.doesNotMatch(controlSource, /useEffect\([^)]*speak/);
});
