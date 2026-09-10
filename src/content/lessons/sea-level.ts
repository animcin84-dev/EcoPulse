import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const seaLevelLesson: Lesson = {
  id: 'lesson-sea-level',
  slug: 'sea-level',
  version: '1.2.0',
  world: 'ice-water',
  title: { en: 'When Water Rises', kk: 'Су деңгейі көтерілгенде' },
  estimatedMinutes: 8,
  targetWords: ['sea level', 'coast'],
  sourceIds: ['nasa-sea-level', 'nasa-local-sea-level'],
  steps: [
    {
      id: 'discover-sea-level',
      type: 'discover',
      title: { en: 'SEA LEVEL', kk: 'ТЕҢІЗ ДЕҢГЕЙІ' },
      body: { en: 'The average level of the sea surface.', kk: 'Теңіз бетінің орташа деңгейі.' },
    },
    {
      id: 'meaning-sea-level',
      type: 'choice',
      title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' },
      prompt: { en: 'What does sea level mean?', kk: 'Sea level нені білдіреді?' },
      options: [
        { id: 'surface-level', label: { en: 'The level of the sea surface', kk: 'Теңіз бетінің деңгейі' } },
        { id: 'ocean-temperature', label: { en: 'Ocean temperature', kk: 'Мұхит температурасы' } },
        { id: 'glacier-volume', label: { en: 'Glacier volume', kk: 'Мұздық көлемі' } },
      ],
      correctOptionId: 'surface-level',
      masterySignals: [{ word: 'sea level', signal: 'recognition' }],
      hint: { en: 'Level describes height, not temperature.', kk: 'Level биіктікті сипаттайды, температураны емес.' },
      explanation: { en: 'Sea level refers to the average height of the sea surface.', kk: 'Теңіз деңгейі теңіз бетінің орташа биіктігін білдіреді.' },
      xp: 5,
    },
    {
      id: 'connection-land-ice-sea-level',
      type: 'connection',
      title: { en: 'Land ice connects to the ocean', kk: 'Құрлық мұзы мұхитпен байланысады' },
      body: { en: 'When land ice melts, additional water can enter the ocean and contribute to sea-level rise.', kk: 'Құрлық мұзы ерігенде қосымша су мұхитқа түсіп, теңіз деңгейінің көтерілуіне үлес қоса алады.' },
      relations: [
        { from: 'land-ice-melt', to: 'ocean-water', type: 'contributes_to', label: { en: 'adds water to the ocean', kk: 'мұхитқа су қосады' } },
        { from: 'land-ice-melt', to: 'sea-level', type: 'contributes_to', label: { en: 'can contribute to rising sea level', kk: 'теңіз деңгейінің көтерілуіне үлес қоса алады' } },
      ],
    },
    {
      id: 'order-land-ice-system',
      type: 'ordering',
      title: { en: 'Build the system', kk: 'Жүйені құрастыр' },
      prompt: { en: 'Put this simplified land-ice connection in a scientifically sensible order.', kk: 'Құрлық мұзына қатысты осы қарапайым байланысты ғылыми тұрғыдан дұрыс ретке қой.' },
      items: [
        { id: 'sea-level-rise', label: { en: 'Sea level can rise', kk: 'Теңіз деңгейі көтерілуі мүмкін' } },
        { id: 'temperature-rise', label: { en: 'Temperature rises', kk: 'Температура көтеріледі' } },
        { id: 'land-ice-melt', label: { en: 'Land-ice melting increases', kk: 'Құрлық мұзының еруі күшейеді' } },
      ],
      correctOrder: ['temperature-rise', 'land-ice-melt', 'sea-level-rise'],
      masterySignals: [{ word: 'sea level', signal: 'context' }],
      explanation: { en: 'In this simplified learning model, higher temperature can increase land-ice melt, and added meltwater can contribute to sea-level rise.', kk: 'Бұл қарапайым оқу моделінде температураның жоғарылауы құрлық мұзының еруін күшейтіп, еріген су теңіз деңгейінің көтерілуіне үлес қоса алады.' },
      xp: 10,
    },
    readingStepsByLessonSlug['sea-level'],
    listeningStepsByLessonSlug['sea-level'],
    {
      id: 'think-coastal-planning',
      type: 'think',
      title: { en: 'Think / Coastal City', kk: 'Ойлан / Жағалаудағы қала' },
      prompt: { en: 'A coastal town expects flood risk to increase over time. What is the strongest first planning step?', kk: 'Жағалаудағы қалада су басу қаупі уақыт өте өседі деп күтілуде. Ең дұрыс алғашқы жоспарлау қадамы қандай?' },
      options: [
        { id: 'risk-map', label: { en: 'Improve flood-risk mapping before future development.', kk: 'Болашақ құрылыстан бұрын су басу қаупі картасын жақсарту.' } },
        { id: 'ignore', label: { en: 'Ignore future risk.', kk: 'Болашақ қауіпті елемеу.' } },
        { id: 'exposed', label: { en: 'Put critical facilities in exposed areas without assessment.', kk: 'Маңызды нысандарды бағалаусыз қауіпті аймақтарға орналастыру.' } },
      ],
      bestOptionId: 'risk-map',
      explanation: { en: 'Better risk information helps planners make safer long-term decisions.', kk: 'Қауіп туралы жақсырақ ақпарат жоспарлаушыларға қауіпсіз ұзақ мерзімді шешімдер қабылдауға көмектеседі.' },
      extensionPrompt: { en: 'Explain in one English sentence why melting land ice matters when thinking about sea-level change.', kk: 'Құрлықтағы мұздың еруі теңіз деңгейінің өзгерісін түсінуде неге маңызды екенін бір ағылшын сөйлемімен түсіндір.' },
      xp: 15,
    },
    {
      id: 'result-sea-level',
      type: 'result',
      title: { en: 'Water System Connected', kk: 'Су жүйесі байланыстырылды' },
      body: { en: 'You connected land-ice melt, ocean water and sea level with careful scientific wording.', kk: 'Сен құрлық мұзының еруін, мұхит суын және теңіз деңгейін ғылыми тұрғыдан дәл байланыстырдың.' },
    },
  ],
};
