import type { LocalizedText } from '../domain/content/types.ts';

export type ClimateDataCard = {
  id: string;
  value: string;
  unit: string;
  label: LocalizedText;
  context: LocalizedText;
  sourceId: string;
  tone: 'air' | 'heat' | 'ice' | 'ocean' | 'life';
};

export type ClimateChapter = {
  id: string;
  index: string;
  title: LocalizedText;
  kicker: LocalizedText;
  body: string[];
  accent: 'air' | 'heat' | 'ice' | 'ocean' | 'weather';
  terms: string[];
};

export type ClimateReadingQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: LocalizedText;
};

export type ClimateVocabularyItem = {
  id: string;
  term: string;
  meaning: LocalizedText;
  definition: string;
  example: string;
  distractors: string[];
  tone: ClimateDataCard['tone'];
};

export const climateChangeModule = {
  title: { en: 'Climate Change', kk: 'Климаттың өзгеруі' },
  eyebrow: { en: 'Flagship module / Climate systems', kk: 'Негізгі модуль / Климат жүйелері' },
  lede: {
    en: 'Read the science in English, check what you understood, then turn ten climate words into usable vocabulary.',
    kk: 'Ғылымды ағылшынша оқы, түсінгеніңді тексер, содан кейін климатқа қатысты он сөзді белсенді сөздікке айналдыр.',
  },
  dataCards: [
    {
      id: 'co2', value: '429', unit: 'ppm',
      label: { en: 'Atmospheric CO₂', kk: 'Атмосфералық CO₂' },
      context: { en: 'NASA latest measurement · July 2026', kk: 'NASA соңғы өлшемі · 2026 жылғы шілде' },
      sourceId: 'nasa-co2-indicator', tone: 'air',
    },
    {
      id: 'warming', value: '+1.47', unit: '°C',
      label: { en: '2024 vs. preindustrial average', kk: '2024 жыл индустрияға дейінгі орташа деңгеймен салыстырғанда' },
      context: { en: 'NASA late-19th-century comparison', kk: 'NASA XIX ғасыр соңы базасымен салыстыруы' },
      sourceId: 'nasa-global-temperature-indicator', tone: 'heat',
    },
    {
      id: 'ice-loss', value: '399', unit: 'Gt/yr',
      label: { en: 'Greenland + Antarctica ice loss', kk: 'Гренландия + Антарктида мұз жоғалтуы' },
      context: { en: '264 + 135 billion metric tons per year · 2002–2025', kk: 'Жылына 264 + 135 млрд метрикалық тонна · 2002–2025' },
      sourceId: 'nasa-ice-sheets-indicator', tone: 'ice',
    },
    {
      id: 'sea-level', value: '~20', unit: 'cm',
      label: { en: 'Global sea-level rise since 1900', kk: '1900 жылдан бергі жаһандық теңіз деңгейінің көтерілуі' },
      context: { en: 'NASA historical estimate · about 16–21 cm', kk: 'NASA тарихи бағасы · шамамен 16–21 см' },
      sourceId: 'nasa-sea-level-indicator', tone: 'ocean',
    },
    {
      id: 'acidity', value: '+30', unit: '%',
      label: { en: 'Surface-ocean acidity', kk: 'Мұхит беті қышқылдығы' },
      context: { en: 'Since the Industrial Revolution · NOAA', kk: 'Индустриялық революциядан бері · NOAA' },
      sourceId: 'noaa-ocean-acidification', tone: 'life',
    },
  ] satisfies ClimateDataCard[],
  chapters: [
    {
      id: 'atmosphere', index: '01', accent: 'air',
      title: { en: 'More heat stays in the system.', kk: 'Жүйеде көбірек жылу қалады.' },
      kicker: { en: 'Atmosphere / greenhouse gases', kk: 'Атмосфера / парниктік газдар' },
      body: [
        'Climate change is one of the biggest problems facing our planet today. Because of human activity, the amount of carbon dioxide (CO₂) in the atmosphere has increased greatly.',
        'Carbon dioxide is a greenhouse gas. Greenhouse gases trap heat in the climate system, so increasing their concentration changes Earth’s energy balance and warms the planet.',
      ],
      terms: ['GREENHOUSE GAS', 'ATMOSPHERE'],
    },
    {
      id: 'warming-ice', index: '02', accent: 'ice',
      title: { en: 'Warming becomes visible in ice.', kk: 'Жылыну мұзда анық көрінеді.' },
      kicker: { en: 'Glaciers / ice sheets / habitats', kk: 'Мұздықтар / мұз жамылғылары / мекен ету ортасы' },
      body: [
        'One of the clearest signs of global warming is the melting of glaciers and ice sheets. NASA satellite observations show that the huge ice sheets in Greenland and Antarctica lose hundreds of billions of tons of ice every year.',
        'The Arctic is also warming rapidly. This creates serious pressure for polar animals because shrinking sea ice and changing frozen environments can reduce or transform their natural habitats.',
      ],
      terms: ['GLACIER', 'MELT', 'HABITAT'],
    },
    {
      id: 'ocean', index: '03', accent: 'ocean',
      title: { en: 'The ocean records the change.', kk: 'Мұхит өзгерісті тіркейді.' },
      kicker: { en: 'Sea level / expansion / chemistry', kk: 'Теңіз деңгейі / кеңею / химия' },
      body: [
        'Climate change also affects the oceans. When glaciers and ice sheets melt, more water enters the ocean. At the same time, warmer ocean water expands. Together these processes raise global sea level and increase coastal flood risk.',
        'The ocean also absorbs some of the extra CO₂ from the atmosphere. This changes seawater chemistry and makes the ocean more acidic, which can harm marine organisms and coral reefs.',
      ],
      terms: ['SEA LEVEL', 'ACIDIC'],
    },
    {
      id: 'extremes', index: '04', accent: 'weather',
      title: { en: 'Risk changes with the climate.', kk: 'Климат өзгерсе, қауіп те өзгереді.' },
      kicker: { en: 'Drought / wildfire / extreme weather', kk: 'Құрғақшылық / орман өрті / экстремалды ауа райы' },
      body: [
        'Climate change is also making some types of extreme weather more dangerous. Long droughts and large wildfires can become more likely or more severe in some regions as heat and dryness interact.',
        'Heavy rainfall can cause floods, while powerful storms can damage cities, homes and ecosystems. Climate change does not create every individual event, but it can change the conditions that shape their probability and intensity.',
      ],
      terms: ['DROUGHT', 'WILDFIRE', 'EXTREME WEATHER'],
    },
    {
      id: 'system', index: '05', accent: 'heat',
      title: { en: 'Climate is a connected Earth system.', kk: 'Климат — өзара байланысқан Жер жүйесі.' },
      kicker: { en: 'Air / ice / ocean / life / people', kk: 'Ауа / мұз / мұхит / тіршілік / адамдар' },
      body: [
        'Climate change is not only about higher temperatures. It affects our air, ice, oceans, animals and people. A change in one part of the Earth system can create consequences in another.',
        'What happens to our planet in the future depends on the choices societies make today. Understanding the system helps us discuss those choices more clearly and act with better evidence.',
      ],
      terms: ['ATMOSPHERE', 'SEA LEVEL', 'HABITAT'],
    },
  ] satisfies ClimateChapter[],
  readingCheck: [
    {
      id: 'cause', question: 'What is one of the main causes of climate change?',
      options: [
        { id: 'human', text: 'Human activity and greenhouse gases.' },
        { id: 'ocean-motion', text: 'The natural movement of oceans.' },
        { id: 'forest-growth', text: 'The growth of forests.' },
      ],
      correctOptionId: 'human',
      explanation: { en: 'Human activities have increased heat-trapping greenhouse gases, especially carbon dioxide.', kk: 'Адам әрекеті жылуды ұстайтын парниктік газдарды, әсіресе көмірқышқыл газын арттырды.' },
    },
    {
      id: 'co2-heat', question: 'What happens when there is more CO₂ in the atmosphere?',
      options: [
        { id: 'colder', text: 'The Earth becomes colder.' },
        { id: 'heat', text: 'More heat stays in the climate system.' },
        { id: 'stop-ocean', text: 'The oceans stop moving.' },
      ],
      correctOptionId: 'heat',
      explanation: { en: 'CO₂ is a greenhouse gas, so a higher concentration increases heat trapping.', kk: 'CO₂ — парниктік газ, сондықтан оның мөлшері артса, жүйеде көбірек жылу ұсталады.' },
    },
    {
      id: 'habitat-loss', question: 'Why are polar animals losing natural habitat?',
      options: [
        { id: 'ice', text: 'Because glaciers, sea ice and frozen environments are changing or melting.' },
        { id: 'oxygen', text: 'Because there is more oxygen in the air.' },
        { id: 'lower-sea', text: 'Because sea levels are becoming lower.' },
      ],
      correctOptionId: 'ice',
      explanation: { en: 'Warming changes frozen environments that many polar species use for feeding, breeding or movement.', kk: 'Жылыну көптеген полярлық түрлер қорек, көбею және қозғалыс үшін пайдаланатын мұзды ортаны өзгертеді.' },
    },
    {
      id: 'sea-level', question: 'Why are sea levels rising?',
      options: [
        { id: 'smaller', text: 'Because the ocean is becoming smaller.' },
        { id: 'melt-expand', text: 'Because land ice melts and warmer ocean water expands.' },
        { id: 'less-water', text: 'Because there is less water on Earth.' },
      ],
      correctOptionId: 'melt-expand',
      explanation: { en: 'Added water from melting land ice and thermal expansion of warmer seawater are major drivers of global sea-level rise.', kk: 'Құрлық мұзының еріп мұхитқа қосылуы және жылы судың жылулық кеңеюі жаһандық теңіз деңгейін көтереді.' },
    },
    {
      id: 'weather', question: 'How can climate change affect weather risks?',
      options: [
        { id: 'risk', text: 'It can make some droughts, wildfires, floods, heat and storms more dangerous.' },
        { id: 'calm', text: 'It makes all weather calm and predictable.' },
        { id: 'no-rain', text: 'It stops heavy rainfall.' },
      ],
      correctOptionId: 'risk',
      explanation: { en: 'Climate change can alter the background conditions that influence the frequency or severity of several types of extremes.', kk: 'Климаттың өзгеруі кейбір экстремалды құбылыстардың жиілігі мен күшіне әсер ететін бастапқы жағдайларды өзгерте алады.' },
    },
  ] satisfies ClimateReadingQuestion[],
  vocabulary: [
    {
      id: 'greenhouse-gas', term: 'GREENHOUSE GAS', tone: 'heat',
      meaning: { en: 'A gas that traps heat in the atmosphere', kk: 'Жылуды атмосферада ұстайтын газ' },
      definition: 'A gas that absorbs and re-emits heat in Earth’s atmosphere.',
      example: 'Carbon dioxide is an important greenhouse gas.',
      distractors: ['Мұхиттағы тұз', 'Өсімдіктерге арналған тыңайтқыш'],
    },
    {
      id: 'atmosphere', term: 'ATMOSPHERE', tone: 'air',
      meaning: { en: 'The layer of gases surrounding Earth', kk: 'Жерді қоршап тұрған ауа қабаты' },
      definition: 'The mixture of gases surrounding our planet.',
      example: 'Most familiar weather develops in the atmosphere.',
      distractors: ['Мұхиттың түбі', 'Мұздықтың бір бөлігі'],
    },
    {
      id: 'glacier', term: 'GLACIER', tone: 'ice',
      meaning: { en: 'A large mass of land ice', kk: 'Үлкен мұздық' },
      definition: 'A large body of land ice formed from accumulated snow.',
      example: 'A glacier can move slowly under its own weight.',
      distractors: ['Қатты жел', 'Жауын-шашын түрі'],
    },
    {
      id: 'melt', term: 'MELT', tone: 'ice',
      meaning: { en: 'Change from solid to liquid', kk: 'Еру' },
      definition: 'To change from a solid state into a liquid because of heat.',
      example: 'Land ice can melt when temperatures stay warm enough.',
      distractors: ['Қату', 'Көтерілу'],
    },
    {
      id: 'drought', term: 'DROUGHT', tone: 'heat',
      meaning: { en: 'A long period with unusually low rainfall', kk: 'Ұзақ уақыт жаңбыр жаумауы, құрғақшылық' },
      definition: 'A long period when an area receives much less rainfall than normal.',
      example: 'A long drought can dry vegetation and reduce water supplies.',
      distractors: ['Қатты қар жаууы', 'Теңіз деңгейінің көтерілуі'],
    },
    {
      id: 'wildfire', term: 'WILDFIRE', tone: 'heat',
      meaning: { en: 'A large uncontrolled vegetation fire', kk: 'Ормандағы бақылаусыз үлкен өрт' },
      definition: 'An uncontrolled fire that spreads through natural vegetation.',
      example: 'Hot, dry conditions can increase wildfire risk in some regions.',
      distractors: ['Мұхиттағы дауыл', 'Қатты жаңбыр'],
    },
    {
      id: 'sea-level', term: 'SEA LEVEL', tone: 'ocean',
      meaning: { en: 'The level of the sea surface', kk: 'Теңіз суының биіктігі' },
      definition: 'The average height of the sea surface used as a reference level.',
      example: 'Melting land ice contributes to rising sea level.',
      distractors: ['Мұхиттың температурасы', 'Мұздықтың көлемі'],
    },
    {
      id: 'acidic', term: 'ACIDIC', tone: 'ocean',
      meaning: { en: 'Having more acidic chemical properties', kk: 'Қышқылды' },
      definition: 'Describing a substance with relatively higher acidity and lower pH.',
      example: 'Absorbing extra CO₂ makes seawater more acidic.',
      distractors: ['Тұзды', 'Мұзды'],
    },
    {
      id: 'extreme-weather', term: 'EXTREME WEATHER', tone: 'air',
      meaning: { en: 'Unusually severe or dangerous weather', kk: 'Өте қауіпті немесе қалыптан тыс ауа райы' },
      definition: 'Weather events that are unusually severe, rare or dangerous for a place.',
      example: 'Extreme weather can include dangerous heat, rainfall, drought or storms.',
      distractors: ['Қалыпты және тыныш ауа райы', 'Тек қыс мезгіліндегі ауа райы'],
    },
    {
      id: 'habitat', term: 'HABITAT', tone: 'life',
      meaning: { en: 'The natural environment where an organism lives', kk: 'Жануар немесе өсімдік өмір сүретін табиғи орта' },
      definition: 'The natural place and conditions in which an organism lives.',
      example: 'Sea ice is important habitat for several polar species.',
      distractors: ['Ауадағы газ', 'Мұхиттағы пластик'],
    },
  ] satisfies ClimateVocabularyItem[],
} as const;
