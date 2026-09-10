import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const glaciersLesson: Lesson = {
  id: 'lesson-glaciers',
  slug: 'glaciers',
  version: '1.2.0',
  world: 'ice-water',
  title: { en: 'Glaciers in Motion', kk: 'Қозғалыстағы мұздықтар' },
  estimatedMinutes: 8,
  targetWords: ['glacier', 'melt'],
  sourceIds: ['nasa-glacier-basics', 'nasa-sea-level'],
  steps: [
    {
      id: 'discover-glacier',
      type: 'discover',
      title: { en: 'GLACIER', kk: 'МҰЗДЫҚ' },
      body: { en: 'A large mass of ice formed from snow over many years.', kk: 'Көп жылдар бойы қардан түзілген үлкен мұз массасы.' },
    },
    {
      id: 'meaning-glacier',
      type: 'choice',
      title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' },
      prompt: { en: 'What does glacier mean?', kk: 'Glacier сөзі нені білдіреді?' },
      options: [
        { id: 'ice-mass', label: { en: 'A large mass of land ice', kk: 'Құрлықтағы үлкен мұз массасы' } },
        { id: 'wind', label: { en: 'A strong wind', kk: 'Қатты жел' } },
        { id: 'rain-type', label: { en: 'A type of rainfall', kk: 'Жауын-шашын түрі' } },
      ],
      correctOptionId: 'ice-mass',
      hint: { en: 'Think of ice that forms from snow over many years.', kk: 'Көп жыл бойы қардан түзілетін мұзды ойла.' },
      masterySignals: [{ word: 'glacier', signal: 'recognition' }],
      explanation: { en: 'A glacier is a large mass of ice formed from accumulated snow.', kk: 'Мұздық — жиналған қардан түзілген үлкен мұз массасы.' },
      xp: 5,
    },
    {
      id: 'fill-melt-context',
      type: 'fill_blank',
      title: { en: 'Use the Word', kk: 'Сөзді қолдан' },
      prompt: { en: 'Ice can ____ when it becomes warm enough.', kk: 'Мұз жеткілікті жылынғанда ____ алады. Жауапты ағылшынша жаз.' },
      acceptedAnswers: ['melt'],
      hint: { en: 'Use the new verb that means “to become liquid”.', kk: '«Сұйыққа айналу» деген жаңа ағылшын етістігін қолдан.' },
      masterySignals: [{ word: 'melt', signal: 'context' }],
      explanation: { en: 'MELT is the verb: ice can melt and become liquid water.', kk: 'MELT — етістік: мұз еріп, сұйық суға айнала алады.' },
      xp: 5,
    },
    {
      id: 'connection-glacier-melt',
      type: 'connection',
      title: { en: 'Ice can change state', kk: 'Мұз күйін өзгерте алады' },
      body: { en: 'When ice gets warm enough, it can melt and become liquid water.', kk: 'Мұз жеткілікті жылынғанда еріп, сұйық суға айнала алады.' },
      relations: [
        { from: 'glacier', to: 'land-ice-melt', type: 'related_to', label: { en: 'land ice can melt', kk: 'құрлық мұзы ери алады' } },
        { from: 'land-ice-melt', to: 'water', type: 'causes', label: { en: 'solid ice becomes liquid water', kk: 'қатты мұз сұйық суға айналады' } },
      ],
    },
    readingStepsByLessonSlug['glaciers'],
    listeningStepsByLessonSlug['glaciers'],
    {
      id: 'think-melt',
      type: 'think',
      title: { en: 'Think / State Change', kk: 'Ойлан / Күй өзгерісі' },
      prompt: { en: 'Which condition usually makes ice melt faster?', kk: 'Қай жағдай мұздың әдетте тезірек еруіне әкеледі?' },
      options: [
        { id: 'higher-temp', label: { en: 'Higher temperature', kk: 'Жоғары температура' } },
        { id: 'lower-temp', label: { en: 'Lower temperature', kk: 'Төмен температура' } },
        { id: 'same', label: { en: 'The word “glacier” itself', kk: '«Glacier» сөзінің өзі' } },
      ],
      bestOptionId: 'higher-temp',
      explanation: { en: 'Higher temperatures generally increase melting when ice reaches conditions warm enough to change state.', kk: 'Температура жоғарылағанда мұз еруге жеткілікті жағдайға жетсе, еру әдетте күшейеді.' },
      extensionPrompt: { en: 'Explain in one English sentence how temperature affects melting conditions without claiming one warm day determines long-term glacier change.', kk: 'Температураның еру жағдайына қалай әсер ететінін бір ағылшын сөйлемімен түсіндір; бір жылы күн ұзақ мерзімді мұздық өзгерісін анықтайды деп айтпа.' },
      xp: 15,
    },
    {
      id: 'result-glaciers',
      type: 'result',
      title: { en: 'Ice Connection Complete', kk: 'Мұз байланысы аяқталды' },
      body: { en: 'You connected glacier, melt and water without treating every kind of ice as the same system.', kk: 'Сен мұздық, еру және суды байланыстырдың, бірақ мұздың барлық түрін бірдей жүйе деп қабылдамадың.' },
    },
  ],
};
