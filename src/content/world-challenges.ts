import type { WorldChallenge } from '../domain/content/challenge-types.ts';

const weatherDetective: WorldChallenge = {
  id: 'challenge-weather-detective',
  slug: 'weather-detective',
  world: 'earth-atmosphere',
  title: { en: 'Weather Detective', kk: 'Ауа райы зерттеушісі' },
  intro: {
    en: 'Use a fictional seven-day weather record to separate short-term observations from climate reasoning.',
    kk: 'Қысқа мерзімді бақылауды климат туралы ой қорытудан ажырату үшін ойдан шығарылған жеті күндік ауа райы деректерін қолдан.',
  },
  estimatedMinutes: 5,
  sourceIds: ['nasa-weather-climate'],
  reasoningPrompt: { en: 'Explain why one week cannot define a region’s climate.', kk: 'Неліктен бір апта аймақтың климатын анықтай алмайтынын түсіндір.' },
  xp: 50,
  questions: [
    {
      id: 'weather-warmest-day',
      prompt: {
        en: 'Mon 12°C, Tue 14°C, Wed 16°C, Thu 15°C, Fri 17°C, Sat 18°C, Sun 17°C. Which day was warmest?',
        kk: 'Дс 12°C, Сс 14°C, Ср 16°C, Бс 15°C, Жм 17°C, Сб 18°C, Жс 17°C. Ең жылы күн қайсысы?',
      },
      options: [
        { id: 'wednesday', label: { en: 'Wednesday', kk: 'Сәрсенбі' } },
        { id: 'saturday', label: { en: 'Saturday', kk: 'Сенбі' } },
        { id: 'sunday', label: { en: 'Sunday', kk: 'Жексенбі' } },
      ],
      bestOptionId: 'saturday',
      explanation: { en: 'Saturday is warmest at 18°C.', kk: 'Сенбі 18°C көрсеткішімен ең жылы күн.' },
    },
    {
      id: 'weather-climate-window',
      prompt: {
        en: 'Is this one week enough to describe the region’s climate?',
        kk: 'Осы бір апта аймақтың климатын сипаттауға жеткілікті ме?',
      },
      options: [
        { id: 'yes', label: { en: 'Yes — one week defines climate', kk: 'Иә — бір апта климатты анықтайды' } },
        { id: 'no', label: { en: 'No — climate needs much longer-term patterns', kk: 'Жоқ — климат үшін әлдеқайда ұзақ мерзімді заңдылықтар керек' } },
        { id: 'only-temperature', label: { en: 'Only temperature matters', kk: 'Тек температура маңызды' } },
      ],
      bestOptionId: 'no',
      explanation: {
        en: 'A week is useful weather data, but climate is described using much longer-term patterns.',
        kk: 'Бір апта ауа райы туралы пайдалы дерек береді, бірақ климат әлдеқайда ұзақ мерзімді заңдылықтармен сипатталады.',
      },
    },
  ],
};

const coastalCity: WorldChallenge = {
  id: 'challenge-coastal-city',
  slug: 'coastal-city',
  world: 'ice-water',
  title: { en: 'The Coastal City', kk: 'Жағалаудағы қала' },
  intro: {
    en: 'A fictional coastal town expects flood risk to increase over time. Make a planning decision without pretending this is a numerical flood simulation.',
    kk: 'Ойдан шығарылған жағалау қаласында уақыт өте су басу қаупі өсуі мүмкін. Мұны нақты сандық су басу симуляциясы деп көрсетпей, жоспарлау шешімін қабылда.',
  },
  estimatedMinutes: 6,
  sourceIds: ['nasa-sea-level'],
  reasoningPrompt: { en: 'Explain why better risk information can improve coastal planning.', kk: 'Неліктен қауіп туралы жақсырақ дерек жағалауды жоспарлауды жақсарта алатынын түсіндір.' },
  xp: 50,
  questions: [
    {
      id: 'coastal-first-evidence',
      prompt: { en: 'Which first action gives planners better evidence for future decisions?', kk: 'Қай алғашқы әрекет болашақ шешімдер үшін жоспарлаушыларға жақсырақ дерек береді?' },
      options: [
        { id: 'risk-map', label: { en: 'Improve flood-risk mapping', kk: 'Су басу қаупінің картасын жақсарту' } },
        { id: 'ignore', label: { en: 'Ignore future risk', kk: 'Болашақ қауіпті елемеу' } },
        { id: 'exposed-build', label: { en: 'Build critical facilities in exposed areas without assessment', kk: 'Бағалаусыз қауіпті аймақтарда маңызды нысандар салу' } },
      ],
      bestOptionId: 'risk-map',
      explanation: { en: 'Better risk information supports safer long-term planning.', kk: 'Қауіп туралы жақсы дерек ұзақ мерзімді қауіпсіз жоспарлауға көмектеседі.' },
    },
    {
      id: 'coastal-land-ice',
      prompt: { en: 'Which change can add water to the ocean and contribute to sea-level rise?', kk: 'Қай өзгеріс мұхитқа су қосып, теңіз деңгейінің көтерілуіне үлес қоса алады?' },
      options: [
        { id: 'land-ice', label: { en: 'Melting land ice', kk: 'Құрлықтағы мұздың еруі' } },
        { id: 'cloud', label: { en: 'A cloud moving over a mountain', kk: 'Таудың үстінен бұлттың өтуі' } },
        { id: 'wind', label: { en: 'Wind alone', kk: 'Тек жел' } },
      ],
      bestOptionId: 'land-ice',
      explanation: { en: 'When land ice melts, additional water can enter the ocean.', kk: 'Құрлықтағы мұз ерігенде, қосымша су мұхитқа түсе алады.' },
    },
  ],
};

const drySeason: WorldChallenge = {
  id: 'challenge-dry-season',
  slug: 'dry-season',
  world: 'extremes',
  title: { en: 'The Dry Season', kk: 'Құрғақ кезең' },
  intro: {
    en: 'Rainfall is very low, temperatures are high, vegetation is dry and winds are strong. Reason about risk without turning risk into certainty.',
    kk: 'Жауын-шашын өте аз, температура жоғары, өсімдіктер құрғақ, жел күшті. Қауіпті міндетті нәтиже деп қабылдамай ой қорыт.',
  },
  estimatedMinutes: 5,
  sourceIds: ['usgs-drought-basics', 'usgs-fire-drought'],
  reasoningPrompt: { en: 'Explain why higher wildfire risk does not guarantee that a wildfire will start.', kk: 'Неліктен өрт қаупінің жоғары болуы өрт міндетті түрде басталады дегенді білдірмейтінін түсіндір.' },
  xp: 50,
  questions: [
    {
      id: 'dry-season-risk',
      prompt: { en: 'Which risk can increase under these conditions?', kk: 'Осындай жағдайда қандай қауіп өсуі мүмкін?' },
      options: [
        { id: 'wildfire', label: { en: 'Wildfire risk', kk: 'Дала немесе орман өрті қаупі' } },
        { id: 'glacier-form', label: { en: 'Instant glacier formation', kk: 'Мұздықтың бірден пайда болуы' } },
        { id: 'new-ocean', label: { en: 'A new ocean forming immediately', kk: 'Жаңа мұхиттың бірден пайда болуы' } },
      ],
      bestOptionId: 'wildfire',
      explanation: { en: 'Dry vegetation, heat and wind can contribute to higher wildfire danger.', kk: 'Құрғақ өсімдіктер, ыстық және жел өрт қаупінің өсуіне үлес қоса алады.' },
    },
    {
      id: 'dry-season-guarantee',
      prompt: { en: 'Do these conditions guarantee that a wildfire will start?', kk: 'Бұл жағдайлар өрт міндетті түрде басталады деген кепілдік бере ме?' },
      options: [
        { id: 'guaranteed', label: { en: 'Yes, always', kk: 'Иә, әрқашан' } },
        { id: 'not-guaranteed', label: { en: 'No — they increase risk, not certainty', kk: 'Жоқ — олар қауіпті арттырады, бірақ кепілдік бермейді' } },
        { id: 'no-factors', label: { en: 'No other factors ever matter', kk: 'Басқа факторлар ешқашан маңызды емес' } },
      ],
      bestOptionId: 'not-guaranteed',
      explanation: { en: 'Wildfire behavior depends on multiple factors, including fuel, weather, terrain and ignition.', kk: 'Өрттің таралуы жанғыш материал, ауа райы, жер бедері және тұтану сияқты бірнеше факторға байланысты.' },
    },
  ],
};

const livingNetwork: WorldChallenge = {
  id: 'challenge-living-network',
  slug: 'living-network',
  world: 'life',
  title: { en: 'The Living Network', kk: 'Тірі желі' },
  intro: {
    en: 'A wetland contains water, soil, plants, insects and birds. Think in networks rather than treating nature as a list.',
    kk: 'Сулы-батпақты жерде су, топырақ, өсімдіктер, жәндіктер және құстар бар. Табиғатты тізім емес, желі ретінде қарастыр.',
  },
  estimatedMinutes: 6,
  sourceIds: ['usgs-ecosystems'],
  reasoningPrompt: { en: 'Explain one way a habitat change can affect another part of an ecosystem.', kk: 'Тіршілік ортасының өзгеруі экожүйенің басқа бөлігіне қалай әсер ете алатынының бір жолын түсіндір.' },
  xp: 50,
  questions: [
    {
      id: 'living-habitat-change',
      prompt: { en: 'If a wetland is drained, what could happen to species that depend on it?', kk: 'Егер сулы-батпақты жер құрғатылса, оған тәуелді түрлерге не болуы мүмкін?' },
      options: [
        { id: 'lose-habitat', label: { en: 'They may lose part of their habitat', kk: 'Олар тіршілік ортасының бір бөлігін жоғалтуы мүмкін' } },
        { id: 'nothing-ever', label: { en: 'Nothing can ever change', kk: 'Ештеңе ешқашан өзгермейді' } },
        { id: 'new-continent', label: { en: 'A new continent appears', kk: 'Жаңа материк пайда болады' } },
      ],
      bestOptionId: 'lose-habitat',
      explanation: { en: 'Changes to habitat can affect organisms that rely on its food, water, shelter or space.', kk: 'Тіршілік ортасының өзгеруі ондағы қорекке, суға, баспанаға немесе кеңістікке тәуелді ағзаларға әсер етуі мүмкін.' },
    },
    {
      id: 'living-system-thinking',
      prompt: { en: 'Which statement best describes an ecosystem?', kk: 'Экожүйені қай тұжырым жақсы сипаттайды?' },
      options: [
        { id: 'network', label: { en: 'Living things and their environment interact as a system', kk: 'Тірі ағзалар мен олардың ортасы жүйе ретінде өзара әрекеттеседі' } },
        { id: 'animals-only', label: { en: 'Only animals matter', kk: 'Тек жануарлар маңызды' } },
        { id: 'separate-list', label: { en: 'Every part is completely separate', kk: 'Әр бөлік толығымен бөлек' } },
      ],
      bestOptionId: 'network',
      explanation: { en: 'Ecosystems are networks of interactions, not isolated lists of organisms.', kk: 'Экожүйелер — бір-бірінен бөлек ағзалар тізімі емес, өзара әрекеттесу желілері.' },
    },
  ],
};

export const worldChallenges = [weatherDetective, coastalCity, drySeason, livingNetwork] as const;
export const worldChallengesBySlug = Object.fromEntries(worldChallenges.map((challenge) => [challenge.slug, challenge])) as Record<string, WorldChallenge>;
