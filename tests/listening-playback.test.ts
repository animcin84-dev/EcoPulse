import test from 'node:test';
import assert from 'node:assert/strict';
import { buildListeningPlaybackPlan } from '../src/domain/learning/listening.ts';
import type { ListeningStep } from '../src/domain/content/types.ts';

const step: ListeningStep = {
  id: 'listen-test',
  type: 'listening',
  title: { en: 'Listen', kk: 'Тыңда' },
  utterances: {
    A2: '  Weather is short term.  ',
    B1: 'Weather describes short-term conditions over a limited period.',
    B2: 'Weather describes short-term atmospheric conditions, while climate summarizes longer-term patterns and variability.',
  },
  question: 'What is the idea?',
  answers: [
    { id: 'a', text: 'Time scale differs.' },
    { id: 'b', text: 'They are identical.' },
  ],
  correctAnswerId: 'a',
  audioSrcByLevel: { B2: 'https://example.com/weather-b2.mp3' },
  explanation: { en: 'Time scale differs.', kk: 'Уақыт ауқымы өзгеше.' },
  masterySignals: [{ word: 'weather', signal: 'context' }],
  xp: 10,
};

test('listening playback plan normalizes utterance and uses progressively faster device-voice rates', () => {
  const a2 = buildListeningPlaybackPlan(step, 'A2');
  const b1 = buildListeningPlaybackPlan(step, 'B1');
  const b2 = buildListeningPlaybackPlan(step, 'B2');

  assert.equal(a2.text, 'Weather is short term.');
  assert.equal(a2.lang, 'en-US');
  assert.ok(a2.rate < b1.rate);
  assert.ok(b1.rate < b2.rate);
  assert.equal(a2.audioSrc, undefined);
  assert.equal(b2.audioSrc, 'https://example.com/weather-b2.mp3');
});

test('listening playback plan is safe when authored text is blank', () => {
  const broken = { ...step, utterances: { ...step.utterances, A2: '   ' } };
  assert.equal(buildListeningPlaybackPlan(broken, 'A2'), null);
});
