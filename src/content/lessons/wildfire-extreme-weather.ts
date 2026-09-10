import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const wildfireExtremeWeatherLesson: Lesson = {
  id: 'lesson-wildfire-extreme-weather', slug: 'wildfire-extreme-weather', version: '1.2.0', world: 'extremes',
  title: { en: 'Fire & Extreme Weather', kk: 'Өрт және экстремалды ауа райы' }, estimatedMinutes: 9,
  targetWords: ['wildfire', 'extreme weather'],
  sourceIds: ['usgs-fire-drought', 'usgs-wildfire-risk'],
  steps: [
    { id: 'discover-wildfire', type: 'discover', title: { en: 'WILDFIRE', kk: 'ТАБИҒИ ӨРТ' }, body: { en: 'A large uncontrolled fire that spreads through natural vegetation.', kk: 'Табиғи өсімдіктер арасында бақылаусыз таралатын үлкен өрт.' } },
    { id: 'meaning-wildfire', type: 'choice', title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' }, prompt: { en: 'What does wildfire mean?', kk: 'Wildfire сөзі нені білдіреді?' }, options: [
      { id: 'fire', label: { en: 'An uncontrolled fire spreading through vegetation', kk: 'Өсімдіктер арасында бақылаусыз таралатын өрт' } },
      { id: 'storm', label: { en: 'An ocean storm', kk: 'Мұхиттағы дауыл' } },
      { id: 'rain', label: { en: 'Heavy rain', kk: 'Қатты жаңбыр' } },
    ], correctOptionId: 'fire', masterySignals: [{ word: 'wildfire', signal: 'recognition' }], hint: { en: 'Think about uncontrolled fire in natural vegetation.', kk: 'Табиғи өсімдіктердегі бақылаусыз өртті ойла.' }, explanation: { en: 'A wildfire spreads through natural vegetation without being fully controlled.', kk: 'Табиғи өрт табиғи өсімдіктер арасында толық бақылаусыз таралады.' }, xp: 5 },
    { id: 'connection-drought-wildfire-risk', type: 'connection', title: { en: 'Risk is a connection, not a guarantee', kk: 'Қауіп — байланыс, кепілдік емес' }, body: { en: 'Drought can dry vegetation and contribute to higher wildfire risk. It does not guarantee that a wildfire will happen.', kk: 'Құрғақшылық өсімдіктерді құрғатып, өрт қаупінің өсуіне үлес қоса алады. Бірақ бұл өрт міндетті түрде болады деген сөз емес.' }, relations: [
      { from: 'drought', to: 'dry-vegetation', type: 'contributes_to', label: { en: 'can dry vegetation', kk: 'өсімдіктерді құрғата алады' } },
      { from: 'drought', to: 'wildfire-risk', type: 'contributes_to', label: { en: 'can increase risk', kk: 'қауіпті арттыра алады' } },
      { from: 'wildfire', to: 'habitat', type: 'affects', label: { en: 'can affect habitat', kk: 'табиғи ортаға әсер етуі мүмкін' } },
    ] },
    readingStepsByLessonSlug['wildfire-extreme-weather'],
    listeningStepsByLessonSlug['wildfire-extreme-weather'],
    { id: 'think-extreme-weather', type: 'think', title: { en: 'Think / Risk', kk: 'Ойлан / Қауіп' }, prompt: { en: 'Hot, dry and windy conditions are present. Does this guarantee a wildfire?', kk: 'Ыстық, құрғақ және желді жағдай бар. Бұл өрт міндетті түрде болады дегенді білдіре ме?' }, options: [
      { id: 'no', label: { en: 'No. These conditions can raise risk, but ignition and other factors still matter.', kk: 'Жоқ. Бұл жағдайлар қауіпті арттыра алады, бірақ тұтану және басқа факторлар да маңызды.' } },
      { id: 'yes', label: { en: 'Yes. A wildfire must happen.', kk: 'Иә. Өрт міндетті түрде болады.' } },
      { id: 'never', label: { en: 'Weather can never affect fire risk.', kk: 'Ауа райы өрт қаупіне ешқашан әсер етпейді.' } },
    ], bestOptionId: 'no', explanation: { en: 'Fire risk depends on multiple factors. Severe heat, dry fuels and wind can increase danger without guaranteeing a fire.', kk: 'Өрт қаупі бірнеше факторға тәуелді. Қатты ыстық, құрғақ материал және жел қауіпті арттыра алады, бірақ өртке кепілдік бермейді.' }, extensionPrompt: { en: 'Explain in one English sentence why higher wildfire risk is not the same as a guaranteed wildfire.', kk: 'Өрт қаупінің жоғары болуы неге өрт міндетті түрде болады дегенмен бірдей емес екенін бір ағылшын сөйлемімен түсіндір.' }, xp: 15 },
    { id: 'result-wildfire-extreme', type: 'result', title: { en: 'Risk Connection Complete', kk: 'Қауіп байланысы аяқталды' }, body: { en: 'You learned wildfire and extreme-weather reasoning without turning risk into certainty.', kk: 'Сен табиғи өрт пен экстремалды ауа райын түсініп, қауіпті міндетті нәтиже деп қабылдамауды үйрендің.' } },
  ],
};
