import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const weatherClimateLesson: Lesson = {
  id: 'lesson-weather-climate',
  slug: 'weather-climate',
  version: '1.2.0',
  world: 'earth-atmosphere',
  title: { en: 'Weather or Climate?', kk: 'Ауа райы ма, климат па?' },
  estimatedMinutes: 7,
  targetWords: ['weather', 'climate'],
  sourceIds: ['nasa-weather-climate'],
  steps: [
    {
      id: 'discover-weather-climate',
      type: 'discover',
      title: { en: 'WEATHER ≠ CLIMATE', kk: 'АУА РАЙЫ ≠ КЛИМАТ' },
      body: {
        en: 'Weather describes short-term atmospheric conditions. Climate describes long-term patterns over many years.',
        kk: 'Ауа райы қысқа мерзімдегі атмосфера жағдайын сипаттайды. Климат көптеген жылдардағы ұзақ мерзімді заңдылықтарды сипаттайды.',
      },
    },
    {
      id: 'weather-or-climate-choice',
      type: 'choice',
      title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' },
      prompt: { en: '“It is raining this morning.” Is this weather or climate?', kk: '«Бүгін таңертең жаңбыр жауып тұр». Бұл ауа райы ма, климат па?' },
      options: [
        { id: 'weather', label: { en: 'Weather', kk: 'Ауа райы' } },
        { id: 'climate', label: { en: 'Climate', kk: 'Климат' } },
        { id: 'both', label: { en: 'They always mean the same thing', kk: 'Олар әрқашан бір мағынаны білдіреді' } },
      ],
      correctOptionId: 'weather',
      hint: { en: 'Think about the time scale: one morning is short-term.', kk: 'Уақыт ауқымын ойла: бір таң — қысқа мерзім.' },
      masterySignals: [{ word: 'weather', signal: 'recognition' }],
      explanation: { en: 'A single morning describes weather. Climate is based on much longer-term patterns.', kk: 'Бір таңдағы жағдай ауа райын сипаттайды. Климат әлдеқайда ұзақ мерзімді заңдылықтарға негізделеді.' },
      xp: 5,
    },
    {
      id: 'fact-myth-cold-day',
      type: 'fact_myth',
      title: { en: 'Fact or Myth?', kk: 'Факт әлде миф?' },
      statement: {
        en: 'One cold day is enough to describe a region’s climate.',
        kk: 'Бір суық күн аймақтың климатын сипаттауға жеткілікті.',
      },
      correctAnswer: 'myth',
      masterySignals: [{ word: 'climate', signal: 'context' }],
      explanation: {
        en: 'Myth. One day is weather. Climate is described from long-term patterns measured over many years.',
        kk: 'Миф. Бір күн ауа райын сипаттайды. Климат көптеген жылдар бойы өлшенетін ұзақ мерзімді заңдылықтармен сипатталады.',
      },
      xp: 5,
    },
    {
      id: 'connection-weather-climate',
      type: 'connection',
      title: { en: 'Time changes the meaning', kk: 'Уақыт мағынаны өзгертеді' },
      body: { en: 'Short-term observations describe weather. Repeated observations over long periods help describe climate.', kk: 'Қысқа мерзімді бақылаулар ауа райын сипаттайды. Ұзақ уақыт бойы қайталанған бақылаулар климатты сипаттауға көмектеседі.' },
      relations: [
        { from: 'atmosphere', to: 'weather', type: 'related_to', label: { en: 'short-term conditions', kk: 'қысқа мерзімді жағдайлар' } },
        { from: 'weather', to: 'climate', type: 'related_to', label: { en: 'long-term patterns', kk: 'ұзақ мерзімді заңдылықтар' } },
      ],
    },
    readingStepsByLessonSlug['weather-climate'],
    listeningStepsByLessonSlug['weather-climate'],
    {
      id: 'think-cold-day',
      type: 'think',
      title: { en: 'Think / Evidence', kk: 'Ойлан / Дәлел' },
      prompt: { en: 'A student says: “It was cold today, so long-term climate warming cannot be happening.” What is missing?', kk: 'Оқушы: «Бүгін суық болды, демек ұзақ мерзімді климаттық жылыну болмайды» дейді. Мұнда не жетіспейді?' },
      options: [
        { id: 'timescale', label: { en: 'One day is weather; climate needs long-term evidence.', kk: 'Бір күн — ауа райы; климат үшін ұзақ мерзімді дерек керек.' } },
        { id: 'mountains', label: { en: 'The number of mountains.', kk: 'Таулардың саны.' } },
        { id: 'nothing', label: { en: 'Nothing is missing.', kk: 'Ештеңе жетіспейді.' } },
      ],
      bestOptionId: 'timescale',
      explanation: { en: 'A cold day can occur within a long-term warming climate. Weather and climate use different time scales.', kk: 'Ұзақ мерзімді жылыну жағдайында да суық күн болуы мүмкін. Ауа райы мен климаттың уақыт ауқымы әртүрлі.' },
      extensionPrompt: { en: 'Explain in one English sentence why one cold day cannot describe a long-term climate trend.', kk: 'Бір суық күн ұзақ мерзімді климат үрдісін неге сипаттай алмайтынын бір ағылшын сөйлемімен түсіндір.' },
      xp: 15,
    },
    {
      id: 'result-weather-climate',
      type: 'result',
      title: { en: 'World Connection Strengthened', kk: 'Әлем байланысы күшейді' },
      body: { en: 'You can now separate short-term weather from long-term climate patterns.', kk: 'Енді қысқа мерзімді ауа райын ұзақ мерзімді климат заңдылықтарынан ажырата аласың.' },
    },
  ],
};
