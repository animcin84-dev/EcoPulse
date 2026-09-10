import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const droughtLesson: Lesson = {
  id: 'lesson-drought', slug: 'drought', version: '1.2.0', world: 'extremes',
  title: { en: 'When Rain Does Not Come', kk: 'Жауын азайғанда' }, estimatedMinutes: 8,
  targetWords: ['drought', 'rainfall'],
  sourceIds: ['usgs-drought-basics', 'usgs-fire-drought'],
  steps: [
    { id: 'discover-drought', type: 'discover', title: { en: 'DROUGHT', kk: 'ҚҰРҒАҚШЫЛЫҚ' }, body: { en: 'A long period with much less rainfall than usual.', kk: 'Әдеттегіден әлдеқайда аз жауын-шашын түсетін ұзақ кезең.' } },
    { id: 'meaning-drought', type: 'choice', title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' }, prompt: { en: 'What does drought mean?', kk: 'Drought сөзі нені білдіреді?' }, options: [
      { id: 'low-rain', label: { en: 'A long period with much less rain than usual', kk: 'Ұзақ уақыт жауын-шашынның әдеттегіден аз болуы' } },
      { id: 'snow', label: { en: 'Heavy snowfall', kk: 'Қатты қар жаууы' } },
      { id: 'sea-rise', label: { en: 'Sea-level rise', kk: 'Теңіз деңгейінің көтерілуі' } },
    ], correctOptionId: 'low-rain', masterySignals: [{ word: 'drought', signal: 'recognition' }], hint: { en: 'Think about rainfall over a long period.', kk: 'Ұзақ уақыттағы жауын-шашын мөлшерін ойла.' }, explanation: { en: 'Drought is a prolonged period of unusually low rainfall or water availability.', kk: 'Құрғақшылық — жауын-шашын немесе су қолжетімділігі әдеттегіден аз болатын ұзақ кезең.' }, xp: 5 },
    { id: 'connection-rainfall-drought', type: 'connection', title: { en: 'Rainfall changes water availability', kk: 'Жауын-шашын су қолжетімділігіне әсер етеді' }, body: { en: 'Unusually low rainfall over time can contribute to drought and lower available water.', kk: 'Ұзақ уақыт бойы жауын-шашынның әдеттен тыс аз болуы құрғақшылық пен қолжетімді судың азаюына үлес қоса алады.' }, relations: [
      { from: 'rainfall', to: 'drought', type: 'contributes_to', label: { en: 'unusually low rainfall can contribute', kk: 'жауын-шашынның аз болуы үлес қоса алады' } },
      { from: 'drought', to: 'water-scarcity', type: 'contributes_to', label: { en: 'can reduce available water', kk: 'қолжетімді суды азайта алады' } },
    ] },
    readingStepsByLessonSlug['drought'],
    listeningStepsByLessonSlug['drought'],
    { id: 'think-drought-duration', type: 'think', title: { en: 'Think / Time Scale', kk: 'Ойлан / Уақыт ауқымы' }, prompt: { en: 'Which situation best represents drought?', kk: 'Қай жағдай құрғақшылықты жақсы сипаттайды?' }, options: [
      { id: 'months', label: { en: 'Many months with much less rain than usual', kk: 'Көп ай бойы жауын-шашынның әдеттегіден әлдеқайда аз болуы' } },
      { id: 'afternoon', label: { en: 'One dry afternoon', kk: 'Бір құрғақ түстен кейін' } },
      { id: 'snowday', label: { en: 'One snowy morning', kk: 'Бір қарлы таң' } },
    ], bestOptionId: 'months', explanation: { en: 'Drought is about sustained conditions over time, not one dry afternoon.', kk: 'Құрғақшылық бір құрғақ күн емес, ұзақ уақыт сақталатын жағдай.' }, extensionPrompt: { en: 'Explain in one English sentence why drought is about conditions over time rather than one dry afternoon.', kk: 'Құрғақшылық неге бір құрғақ түстен кейін емес, уақыт бойы сақталатын жағдай екенін бір ағылшын сөйлемімен түсіндір.' }, xp: 15 },
    { id: 'result-drought', type: 'result', title: { en: 'Drought Connection Complete', kk: 'Құрғақшылық байланысы аяқталды' }, body: { en: 'You used rainfall and time scale to understand drought without oversimplifying it as “zero rain”.', kk: 'Сен құрғақшылықты «мүлде жаңбыр жоқ» деп жеңілдетпей, жауын-шашын мен уақыт арқылы түсіндің.' } },
  ],
};
