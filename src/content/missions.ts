import type { LocalizedText } from '../domain/content/types.ts';

export type EcoMission = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  estimatedMinutes: number;
  optional: true;
  requiresPhoto: false;
  requiresLocation: false;
  reflectionPrompt: LocalizedText;
  theme: 'sky' | 'water' | 'life' | 'connection';
  microSteps: LocalizedText[];
};

export const missions: EcoMission[] = [
  {
    id: 'sky-check',
    title: { en: 'Sky Check', kk: 'Аспанды бақыла' },
    description: { en: 'Describe today’s weather using three English words.', kk: 'Бүгінгі ауа райын үш ағылшын сөзімен сипатта.' },
    estimatedMinutes: 2,
    optional: true,
    requiresPhoto: false,
    requiresLocation: false,
    reflectionPrompt: { en: 'The weather today is…', kk: 'Бүгінгі ауа райы…' },
    theme: 'sky',
    microSteps: [
      { en: 'Look outside from a safe place.', kk: 'Қауіпсіз жерден сыртқа қара.' },
      { en: 'Choose three English weather words.', kk: 'Ауа райын сипаттайтын үш ағылшын сөзін таңда.' },
      { en: 'Say or write one short sentence.', kk: 'Бір қысқа сөйлем айт немесе жаз.' },
    ],
  },
  {
    id: 'water-watch',
    title: { en: 'Water Watch', kk: 'Суды бақыла' },
    description: { en: 'Notice one moment when water could be used more carefully.', kk: 'Суды ұқыптырақ қолдануға болатын бір сәтті байқа.' },
    estimatedMinutes: 5,
    optional: true,
    requiresPhoto: false,
    requiresLocation: false,
    reflectionPrompt: { en: 'I noticed…', kk: 'Мен байқадым…' },
    theme: 'water',
    microSteps: [
      { en: 'Notice one everyday use of water.', kk: 'Күнделікті су қолданатын бір сәтті байқа.' },
      { en: 'Check whether any water is being wasted.', kk: 'Су ысырап болып жатқан-жатпағанын тексер.' },
      { en: 'Choose one safe way to reduce that waste.', kk: 'Ысырапты азайтудың бір қауіпсіз жолын таңда.' },
    ],
  },
  {
    id: 'habitat-observer',
    title: { en: 'Habitat Observer', kk: 'Табиғи ортаны бақылаушы' },
    description: { en: 'Notice a plant, bird or insect in a safe place you normally visit.', kk: 'Өзің жиі және қауіпсіз баратын жерде өсімдік, құс немесе жәндікті байқа.' },
    estimatedMinutes: 5,
    optional: true,
    requiresPhoto: false,
    requiresLocation: false,
    reflectionPrompt: { en: 'This place may provide…', kk: 'Бұл орын мынаны қамтамасыз етуі мүмкін…' },
    theme: 'life',
    microSteps: [
      { en: 'Choose a familiar safe place.', kk: 'Өзіңе таныс қауіпсіз орынды таңда.' },
      { en: 'Notice one plant, bird or insect without disturbing it.', kk: 'Бір өсімдік, құс немесе жәндікті мазаламай бақыла.' },
      { en: 'Describe what this place may provide as habitat.', kk: 'Бұл орын табиғи орта ретінде не бере алатынын сипатта.' },
    ],
  },
  {
    id: 'eco-connection',
    title: { en: 'Eco Connection', kk: 'Eco байланыс' },
    description: { en: 'Connect one EcoPulse concept to something you noticed today.', kk: 'EcoPulse-тағы бір ұғымды бүгін байқаған нәрсеңмен байланыстыр.' },
    estimatedMinutes: 3,
    optional: true,
    requiresPhoto: false,
    requiresLocation: false,
    reflectionPrompt: { en: 'This reminded me of…', kk: 'Бұл маған мынаны еске салды…' },
    theme: 'connection',
    microSteps: [
      { en: 'Recall one EcoPulse concept.', kk: 'EcoPulse-тағы бір ұғымды есіңе түсір.' },
      { en: 'Notice something connected to it today.', kk: 'Бүгін соған байланысты бір нәрсені байқа.' },
      { en: 'Explain the connection in one sentence.', kk: 'Байланысты бір сөйлеммен түсіндір.' },
    ],
  },
];

export const missionsById = Object.fromEntries(missions.map((mission) => [mission.id, mission])) as Record<string, EcoMission>;
