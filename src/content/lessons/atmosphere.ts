import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const atmosphereLesson: Lesson = {
  id: 'lesson-atmosphere',
  slug: 'atmosphere',
  version: '1.2.0',
  world: 'earth-atmosphere',
  title: {
    en: 'The Air Around Us',
    kk: 'Бізді қоршаған ауа',
  },
  estimatedMinutes: 7,
  targetWords: ['atmosphere'],
  sourceIds: ['nasa-atmosphere'],
  steps: [
    {
      id: 'discover-atmosphere',
      type: 'discover',
      title: { en: 'ATMOSPHERE', kk: 'АТМОСФЕРА' },
      body: {
        en: 'The layer of gases surrounding Earth.',
        kk: 'Жерді қоршап тұрған газдар қабаты.',
      },
    },
    {
      id: 'meaning-atmosphere',
      type: 'choice',
      title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' },
      prompt: {
        en: 'What does atmosphere mean?',
        kk: 'Atmosphere сөзі нені білдіреді?',
      },
      options: [
        {
          id: 'ocean-floor',
          label: { en: 'The bottom of the ocean', kk: 'Мұхиттың түбі' },
        },
        {
          id: 'earth-gases',
          label: {
            en: 'The layer of gases surrounding Earth',
            kk: 'Жерді қоршап тұрған газдар қабаты',
          },
        },
        {
          id: 'glacier-part',
          label: { en: 'Part of a glacier', kk: 'Мұздықтың бір бөлігі' },
        },
      ],
      correctOptionId: 'earth-gases',
      hint: {
        en: 'Think about what surrounds the whole planet.',
        kk: 'Бүкіл Жерді не қоршап тұрғанын ойла.',
      },
      masterySignals: [{ word: 'atmosphere', signal: 'recognition' }],
      explanation: {
        en: 'The atmosphere is the layer of gases surrounding Earth.',
        kk: 'Атмосфера — Жерді қоршап тұрған газдар қабаты.',
      },
      xp: 5,
    },
    {
      id: 'connection-atmosphere-weather-climate',
      type: 'connection',
      title: { en: 'Words are connected', kk: 'Сөздер өзара байланысты' },
      body: {
        en: 'Most weather happens in the atmosphere. Climate describes longer-term weather patterns.',
        kk: 'Ауа райының көп бөлігі атмосферада жүреді. Климат ұзақ мерзімді ауа райы заңдылықтарын сипаттайды.',
      },
      relations: [
        {
          from: 'atmosphere',
          to: 'weather',
          type: 'related_to',
          label: {
            en: 'weather happens in the atmosphere',
            kk: 'ауа райы атмосферада жүреді',
          },
        },
        {
          from: 'weather',
          to: 'climate',
          type: 'related_to',
          label: {
            en: 'long-term patterns help describe climate',
            kk: 'ұзақ мерзімді заңдылықтар климатты сипаттайды',
          },
        },
      ],
    },
    readingStepsByLessonSlug['atmosphere'],
    listeningStepsByLessonSlug['atmosphere'],
    {
      id: 'think-no-atmosphere',
      type: 'think',
      title: { en: 'Think / Real World', kk: 'Ойлан / Нақты әлем' },
      prompt: {
        en: 'Imagine Earth had no atmosphere. Which thing would be most directly affected?',
        kk: 'Жерде атмосфера жоқ деп елестет. Ең тікелей не өзгерер еді?',
      },
      options: [
        {
          id: 'air',
          label: { en: 'The air around the planet', kk: 'Жерді қоршаған ауа' },
        },
        {
          id: 'continents',
          label: { en: 'The number of continents', kk: 'Материктердің саны' },
        },
        {
          id: 'mountains',
          label: { en: 'The shape of every mountain', kk: 'Барлық таулардың пішіні' },
        },
      ],
      bestOptionId: 'air',
      explanation: {
        en: 'The atmosphere is the gases around Earth, so the air surrounding the planet would be directly affected.',
        kk: 'Атмосфера — Жерді қоршаған газдар қабаты, сондықтан планетаны қоршаған ауа тікелей өзгерер еді.',
      },
      extensionPrompt: {
        en: 'Explain in one English sentence why the atmosphere would be directly affected. Use “because”.',
        kk: 'Атмосфера неге тікелей әсерге ұшырайтынын бір ағылшын сөйлемімен түсіндір. “Because” сөзін қолдан.',
      },
      xp: 15,
    },
    {
      id: 'result-first-pulse',
      type: 'result',
      title: { en: 'First Pulse Complete', kk: 'Алғашқы Pulse аяқталды' },
      body: {
        en: 'You learned a word, connected it to a system, and used it to reason.',
        kk: 'Сен жаңа сөз үйрендің, оны жүйемен байланыстырдың және ой қорытуда қолдандың.',
      },
    },
  ],
};
