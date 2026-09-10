export type LessonVisualMode =
  | 'atmosphere'
  | 'weather-climate'
  | 'glacier'
  | 'coast'
  | 'drought'
  | 'wildfire-risk'
  | 'habitat-network'
  | 'ocean-chemistry';

export interface LessonPresentation {
  pronunciation: string;
  spokenTerms: readonly string[];
  audioSrc?: string;
  visualMode: LessonVisualMode;
}

export interface WorldPresentation {
  index: string;
  name: string;
  short: string;
  headline: { en: string; kk: string };
  description: { en: string; kk: string };
}

export const lessonPresentationBySlug: Record<string, LessonPresentation> = {
  atmosphere: {
    pronunciation: '/ˈæt.mə.sfɪər/',
    spokenTerms: ['atmosphere'],
    visualMode: 'atmosphere',
  },
  'weather-climate': {
    pronunciation: '/ˈweð.ər/ · /ˈklaɪ.mət/',
    spokenTerms: ['weather', 'climate'],
    visualMode: 'weather-climate',
  },
  glaciers: {
    pronunciation: '/ˈɡlæs.i.ər/ · /melt/',
    spokenTerms: ['glacier', 'melt'],
    visualMode: 'glacier',
  },
  'sea-level': {
    pronunciation: '/ˈsiː ˌlev.əl/ · /koʊst/',
    spokenTerms: ['sea level', 'coast'],
    visualMode: 'coast',
  },
  drought: {
    pronunciation: '/draʊt/ · /ˈreɪn.fɔːl/',
    spokenTerms: ['drought', 'rainfall'],
    visualMode: 'drought',
  },
  'wildfire-extreme-weather': {
    pronunciation: '/ˈwaɪld.faɪər/ · /ɪkˈstriːm ˈweð.ər/',
    spokenTerms: ['wildfire', 'extreme weather'],
    visualMode: 'wildfire-risk',
  },
  habitats: {
    pronunciation: '/ˈhæb.ɪ.tæt/ · /ˈiː.koʊˌsɪs.təm/',
    spokenTerms: ['habitat', 'ecosystem'],
    visualMode: 'habitat-network',
  },
  'ocean-change': {
    pronunciation: '/əˈsɪd.ɪk/ · /ˈoʊ.ʃən/',
    spokenTerms: ['acidic', 'ocean'],
    visualMode: 'ocean-chemistry',
  },
};

export const worldPresentation: Record<string, WorldPresentation> = {
  'earth-atmosphere': {
    index: 'WORLD 01',
    name: 'EARTH & ATMOSPHERE',
    short: 'EARTH',
    headline: { en: 'THE AIR AROUND US.', kk: 'БІЗДІ ҚОРШАҒАН АУА.' },
    description: {
      en: 'Start with the layer around Earth, then separate today\'s weather from the long-term patterns we call climate.',
      kk: 'Жерді қоршаған қабаттан баста, содан кейін бүгінгі ауа райын климат деп аталатын ұзақ мерзімді заңдылықтардан ажырат.',
    },
  },
  'ice-water': {
    index: 'WORLD 02',
    name: 'ICE & WATER',
    short: 'ICE',
    headline: { en: 'ICE CHANGES. WATER MOVES.', kk: 'МҰЗ ӨЗГЕРЕДІ. СУ ҚОЗҒАЛАДЫ.' },
    description: {
      en: 'Follow water from glacier ice through melting land ice to the ocean, and understand how that connection relates to sea level.',
      kk: 'Суды мұздықтан құрлық мұзының еруі арқылы мұхитқа дейін бақылап, бұл байланыстың теңіз деңгейіне қалай қатысты екенін түсін.',
    },
  },
  extremes: {
    index: 'WORLD 03',
    name: 'EXTREMES',
    short: 'EXTREMES',
    headline: { en: 'RISK IS NOT CERTAINTY.', kk: 'ҚАУІП — КЕПІЛДІК ЕМЕС.' },
    description: {
      en: 'Connect low rainfall, drought, dry vegetation and wildfire risk without turning a higher risk into a guaranteed outcome.',
      kk: 'Жауын-шашынның аздығын, құрғақшылықты, құрғақ өсімдіктерді және өрт қаупін байланыстырып, жоғары қауіпті міндетті нәтиже деп қабылдама.',
    },
  },
  life: {
    index: 'WORLD 04',
    name: 'LIFE & HABITATS',
    short: 'LIFE',
    headline: { en: 'NOTHING LIVES ALONE.', kk: 'ЕШТЕҢЕ ЖАЛҒЫЗ ӨМІР СҮРМЕЙДІ.' },
    description: {
      en: 'Move from habitats to ecosystems, then see how changes in ocean chemistry can affect connected marine life.',
      kk: 'Табиғи ортадан экожүйеге өтіп, кейін мұхит химиясындағы өзгерістердің өзара байланысты теңіз тіршілігіне қалай әсер ете алатынын көр.',
    },
  },
};
