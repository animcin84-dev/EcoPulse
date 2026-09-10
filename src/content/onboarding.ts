import type { LocalizedText } from '../domain/content/types.ts';
import { onboardingInterestIds, type LearningLevel, type OnboardingInterest } from '../domain/learning/onboarding.ts';

type LevelChoiceId = LearningLevel | 'not-sure';

type LevelOption = {
  id: LevelChoiceId;
  title: LocalizedText;
  detail: LocalizedText;
};

type DiagnosticQuestion = {
  prompt: LocalizedText;
  options: LocalizedText[];
  correct: number;
};

const interestLabels = Object.fromEntries([
  ['climate', { en: 'CLIMATE', kk: 'КЛИМАТ' }],
  ['water', { en: 'WATER', kk: 'СУ' }],
  ['life', { en: 'LIFE', kk: 'ТІРШІЛІК' }],
  ['cities', { en: 'CITIES', kk: 'ҚАЛАЛАР' }],
  ['energy', { en: 'ENERGY', kk: 'ЭНЕРГИЯ' }],
]) as Record<OnboardingInterest, LocalizedText>;

export const onboardingContent = {
  levelOptions: [
    {
      id: 'A2',
      title: { en: 'STARTING', kk: 'БАСТАПҚЫ' },
      detail: {
        en: 'I understand basic English words and short sentences.',
        kk: 'Мен қарапайым ағылшын сөздері мен қысқа сөйлемдерді түсінемін.',
      },
    },
    {
      id: 'B1',
      title: { en: 'COMFORTABLE', kk: 'ЕРКІН' },
      detail: {
        en: 'I understand everyday English and short explanations.',
        kk: 'Мен күнделікті ағылшын тілін және қысқа түсіндірмелерді түсінемін.',
      },
    },
    {
      id: 'B2',
      title: { en: 'CONFIDENT', kk: 'СЕНІМДІ' },
      detail: {
        en: 'I understand longer texts and can explain ideas.',
        kk: 'Мен ұзағырақ мәтіндерді түсініп, ойымды түсіндіре аламын.',
      },
    },
    {
      id: 'not-sure',
      title: { en: 'NOT SURE', kk: 'БІЛМЕЙМІН' },
      detail: {
        en: 'Give me a quick three-question check.',
        kk: 'Маған үш сұрақтан тұратын қысқа тексеру бер.',
      },
    },
  ] satisfies LevelOption[],
  interestLabels,
  diagnostic: [
    {
      prompt: { en: 'Choose the natural English sentence.', kk: 'Табиғи естілетін ағылшын сөйлемін таңда.' },
      options: [
        { en: 'The weather is sunny today.', kk: 'The weather is sunny today.' },
        { en: 'The weather today sun.', kk: 'The weather today sun.' },
        { en: 'Climate is raining now.', kk: 'Climate is raining now.' },
      ],
      correct: 0,
    },
    {
      prompt: { en: 'Which sentence describes a long-term pattern?', kk: 'Қай сөйлем ұзақ мерзімді үлгіні сипаттайды?' },
      options: [
        { en: 'It is windy this morning.', kk: 'It is windy this morning.' },
        { en: 'This region usually has dry summers.', kk: 'This region usually has dry summers.' },
        { en: 'It rained for one hour.', kk: 'It rained for one hour.' },
      ],
      correct: 1,
    },
    {
      prompt: { en: 'Complete the idea: “Glaciers can ___ when temperatures rise.”', kk: 'Сөйлемді толықтыр: “Glaciers can ___ when temperatures rise.”' },
      options: [
        { en: 'melt', kk: 'melt' },
        { en: 'climate', kk: 'climate' },
        { en: 'habitat', kk: 'habitat' },
      ],
      correct: 0,
    },
  ] satisfies DiagnosticQuestion[],
  copy: {
    levelEyebrow: { en: 'STARTING POINT', kk: 'БАСТАУ НҮКТЕСІ' },
    levelTitle: { en: 'HOW COMFORTABLE\nARE YOU WITH ENGLISH?', kk: 'АҒЫЛШЫН ТІЛІН\nҚАНШАЛЫҚТЫ ТҮСІНЕСІҢ?' },
    diagnosticEyebrow: { en: 'QUICK LEVEL CHECK', kk: 'ҚЫСҚА ДЕҢГЕЙ ТЕКСЕРУІ' },
    diagnosticNote: { en: 'No score is shown. This only adjusts English complexity.', kk: 'Ұпай көрсетілмейді. Бұл тек ағылшын тілінің күрделілігін реттейді.' },
    interestsEyebrow: { en: 'YOUR PLANET', kk: 'СЕНІҢ ПЛАНЕТАҢ' },
    interestsTitle: { en: 'WHAT DO YOU\nWANT TO EXPLORE?', kk: 'НЕНІ\nЗЕРТТЕГІҢ КЕЛЕДІ?' },
    continue: { en: 'Continue →', kk: 'Жалғастыру →' },
    everything: { en: 'Everything interests me →', kk: 'Маған бәрі қызық →' },
    changeLevel: { en: 'Change level', kk: 'Деңгейді өзгерту' },
    resultEyebrow: { en: 'YOUR STARTING PULSE', kk: 'СЕНІҢ БАСТАПҚЫ PULSE' },
    resultLede: {
      en: 'EcoPulse keeps most learning in English and reveals Kazakh support when you need it. Scientific facts stay the same at every level.',
      kk: 'EcoPulse негізгі оқуды ағылшын тілінде жүргізеді және қажет кезде қазақша қолдау көрсетеді. Ғылыми фактілер барлық деңгейде бірдей қалады.',
    },
    startEarth: { en: 'Start with Earth →', kk: 'Жерден бастау →' },
    languageLabel: { en: 'Onboarding language', kk: 'Бастау тілін таңдау' },
  } satisfies Record<string, LocalizedText>,
} as const;

export const onboardingApprovedInterestIds = onboardingInterestIds;
