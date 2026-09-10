import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lessonUiCopy } from '../src/domain/learning/lesson-ui-copy.ts';

const locales = ['en', 'kk'] as const;

function assertStrings(value: unknown, path: string): void {
  if (typeof value === 'string') {
    assert.ok(value.trim().length > 0, path);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) assertStrings(child, `${path}.${key}`);
  }
}

test('lesson interaction chrome is complete in English and Kazakh', () => {
  for (const locale of locales) assertStrings(lessonUiCopy[locale], locale);
});

test('lesson interaction components consume shared localized chrome instead of fixed English status copy', () => {
  const files = [
    'src/components/lesson/ChoiceQuestion.tsx',
    'src/components/lesson/FactMythExercise.tsx',
    'src/components/lesson/FillBlankExercise.tsx',
    'src/components/lesson/MatchingExercise.tsx',
    'src/components/lesson/OrderingExercise.tsx',
    'src/components/lesson/ConnectionChain.tsx',
    'src/components/lesson/LessonExperience.tsx',
    'src/components/lesson/ResultPanel.tsx',
    'src/components/lesson/SourceDisclosure.tsx',
    'src/components/lesson/PronunciationControl.tsx',
    'src/components/lesson/ListeningExercise.tsx',
    'src/components/lesson/DiscoverVisual.tsx',
    'src/components/lesson/LessonHeader.tsx',
  ];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    assert.match(source, /lessonUiCopy|copy/, file);
  }

  const combined = files.map((file) => readFileSync(file, 'utf8')).join('\n');
  for (const fixed of [
    '>Continue →<',
    '>NOT YET.<',
    '>ANSWER REVEALED.<',
    '>CONNECTION FOUND.<',
    '>CONNECTION ENGINE<',
    '>NEXT PULSE<',
    'Language and learning support controls',
    'LOADING YOUR<br />PROGRESS',
    'AUDIO UNAVAILABLE',
    'Listen to the English pronunciation using the device voice',
    'Simplified diagram of Earth and its atmosphere',
    'Weather now compared with long-term climate patterns',
    'Exit lesson and return to learning map',
    'HOW DO WE KNOW?',
  ]) {
    assert.equal(combined.includes(fixed), false, fixed);
  }
});
