import type { LocalizedText } from '../domain/content/types.ts';

export type ReviewItem = {
  id: string;
  word: string;
  definition: LocalizedText;
  options: { id: string; label: LocalizedText }[];
  correctOptionId: string;
  context: { prompt: LocalizedText; acceptedAnswers: string[] };
};

export const reviewItems: ReviewItem[] = [
  {
    id: 'atmosphere', word: 'ATMOSPHERE',
    definition: { en: 'The layer of gases surrounding Earth.', kk: 'Жерді қоршап тұрған газдар қабаты.' },
    options: [
      { id: 'correct', label: { en: 'The layer of gases surrounding Earth', kk: 'Жерді қоршап тұрған газдар қабаты' } },
      { id: 'ocean', label: { en: 'The bottom of the ocean', kk: 'Мұхиттың түбі' } },
      { id: 'ice', label: { en: 'Part of a glacier', kk: 'Мұздықтың бір бөлігі' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: "Most weather happens in Earth's ____.", kk: 'Ауа райының көп бөлігі Жердің ____ жүреді. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['ATMOSPHERE'] },
  },
  {
    id: 'weather', word: 'WEATHER',
    definition: { en: 'Atmospheric conditions at a particular time and place.', kk: 'Белгілі бір уақыт пен жердегі атмосфера жағдайы.' },
    options: [
      { id: 'correct', label: { en: 'Short-term atmospheric conditions', kk: 'Қысқа мерзімді атмосфера жағдайы' } },
      { id: 'climate', label: { en: 'Long-term patterns only', kk: 'Тек ұзақ мерзімді заңдылықтар' } },
      { id: 'glacier', label: { en: 'A mass of ice', kk: 'Мұз массасы' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: "Rain this morning describes today's ____.", kk: 'Бүгін таңертеңгі жаңбыр бүгінгі ____ сипаттайды. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['WEATHER'] },
  },
  {
    id: 'climate', word: 'CLIMATE',
    definition: { en: 'Long-term patterns of weather.', kk: 'Ауа райының ұзақ мерзімді заңдылықтары.' },
    options: [
      { id: 'today', label: { en: 'Only today’s weather', kk: 'Тек бүгінгі ауа райы' } },
      { id: 'correct', label: { en: 'Long-term weather patterns', kk: 'Ұзақ мерзімді ауа райы заңдылықтары' } },
      { id: 'ocean', label: { en: 'Ocean depth', kk: 'Мұхит тереңдігі' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: "Long-term weather patterns help describe a region's ____.", kk: 'Ұзақ мерзімді ауа райы заңдылықтары аймақтың ____ сипаттауға көмектеседі. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['CLIMATE'] },
  },
  {
    id: 'glacier', word: 'GLACIER',
    definition: { en: 'A large mass of ice formed from snow over many years.', kk: 'Көп жылдар бойы қардан түзілген үлкен мұз массасы.' },
    options: [
      { id: 'wind', label: { en: 'A strong wind', kk: 'Қатты жел' } },
      { id: 'correct', label: { en: 'A large mass of land ice', kk: 'Құрлықтағы үлкен мұз массасы' } },
      { id: 'rain', label: { en: 'A type of rain', kk: 'Жаңбыр түрі' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'A large moving mass of land ice is a ____.', kk: 'Құрлықтағы үлкен қозғалатын мұз массасы — ____. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['GLACIER'] },
  },
  {
    id: 'melt', word: 'MELT',
    definition: { en: 'To change from solid to liquid because of heat.', kk: 'Жылудың әсерінен қатты күйден сұйық күйге өту.' },
    options: [
      { id: 'freeze', label: { en: 'Freeze', kk: 'Қату' } },
      { id: 'correct', label: { en: 'Melt', kk: 'Еру' } },
      { id: 'rise', label: { en: 'Rise', kk: 'Көтерілу' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'Ice can ____ when it becomes warm enough.', kk: 'Мұз жеткілікті жылынғанда ____ алады. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['MELT'] },
  },
  {
    id: 'sea level', word: 'SEA LEVEL',
    definition: { en: 'The average level of the sea surface.', kk: 'Теңіз бетінің орташа деңгейі.' },
    options: [
      { id: 'correct', label: { en: 'The level of the sea surface', kk: 'Теңіз бетінің деңгейі' } },
      { id: 'temp', label: { en: 'Ocean temperature', kk: 'Мұхит температурасы' } },
      { id: 'volume', label: { en: 'Glacier volume', kk: 'Мұздық көлемі' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'Melting land ice can contribute to rising ____.', kk: 'Құрлық мұзының еруі ____ көтерілуіне үлес қоса алады. Ағылшынша тіркесті жаз.' }, acceptedAnswers: ['SEA LEVEL'] },
  },
  {
    id: 'coast', word: 'COAST',
    definition: { en: 'Land next to the sea or ocean.', kk: 'Теңіз немесе мұхит жанындағы құрлық.' },
    options: [
      { id: 'correct', label: { en: 'Land next to the sea', kk: 'Теңіз жанындағы құрлық' } },
      { id: 'air', label: { en: 'A layer of air', kk: 'Ауа қабаты' } },
      { id: 'storm', label: { en: 'A storm', kk: 'Дауыл' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'Land next to the sea is called the ____.', kk: 'Теңіз жанындағы құрлық ____ деп аталады. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['COAST'] },
  },
  {
    id: 'drought', word: 'DROUGHT',
    definition: { en: 'A long period with much less rainfall than usual.', kk: 'Әдеттегіден әлдеқайда аз жауын-шашын түсетін ұзақ кезең.' },
    options: [
      { id: 'snow', label: { en: 'Heavy snow', kk: 'Қатты қар' } },
      { id: 'correct', label: { en: 'A long period of unusually low rainfall', kk: 'Жауын-шашын аз болатын ұзақ кезең' } },
      { id: 'sea', label: { en: 'Sea-level rise', kk: 'Теңіз деңгейінің көтерілуі' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'Months of unusually low rainfall can develop into a ____.', kk: 'Бірнеше ай бойы жауын-шашынның әдеттен тыс аз болуы ____ айналуы мүмкін. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['DROUGHT'] },
  },
  {
    id: 'wildfire', word: 'WILDFIRE',
    definition: { en: 'A large uncontrolled fire spreading through natural vegetation.', kk: 'Табиғи өсімдіктер арасында бақылаусыз таралатын үлкен өрт.' },
    options: [
      { id: 'storm', label: { en: 'An ocean storm', kk: 'Мұхиттағы дауыл' } },
      { id: 'rain', label: { en: 'Heavy rain', kk: 'Қатты жаңбыр' } },
      { id: 'correct', label: { en: 'An uncontrolled vegetation fire', kk: 'Өсімдіктер арасында бақылаусыз таралатын өрт' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'A large uncontrolled vegetation fire is a ____.', kk: 'Өсімдіктер арасында таралатын үлкен бақылаусыз өрт — ____. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['WILDFIRE'] },
  },
  {
    id: 'extreme weather', word: 'EXTREME WEATHER',
    definition: { en: 'Weather events that are unusually severe or dangerous.', kk: 'Өте күшті немесе қауіпті ауа райы құбылыстары.' },
    options: [
      { id: 'normal', label: { en: 'Normal calm weather', kk: 'Қалыпты тыныш ауа райы' } },
      { id: 'correct', label: { en: 'Unusually severe or dangerous weather', kk: 'Өте күшті немесе қауіпті ауа райы' } },
      { id: 'winter', label: { en: 'Only winter weather', kk: 'Тек қысқы ауа райы' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'A severe heatwave can be an example of ____.', kk: 'Қатты аптап ыстық ____ мысалы болуы мүмкін. Ағылшынша тіркесті жаз.' }, acceptedAnswers: ['EXTREME WEATHER'] },
  },

  {
    id: 'rainfall', word: 'RAINFALL',
    definition: { en: 'The amount of rain that falls in a place.', kk: 'Белгілі бір жерде түсетін жаңбыр мөлшері.' },
    options: [
      { id: 'correct', label: { en: 'The amount of rain that falls', kk: 'Түсетін жаңбыр мөлшері' } },
      { id: 'wind', label: { en: 'Wind speed', kk: 'Жел жылдамдығы' } },
      { id: 'ice', label: { en: 'A mass of ice', kk: 'Мұз массасы' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'The amount of rain that falls in a place is its ____.', kk: 'Белгілі бір жерде түсетін жаңбыр мөлшері оның ____. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['RAINFALL'] },
  },
  {
    id: 'habitat', word: 'HABITAT',
    definition: { en: 'The natural place where an organism lives.', kk: 'Ағза өмір сүретін табиғи орта.' },
    options: [
      { id: 'correct', label: { en: 'The natural place an organism lives', kk: 'Ағза өмір сүретін табиғи орта' } },
      { id: 'gas', label: { en: 'A gas in the air', kk: 'Ауадағы газ' } },
      { id: 'plastic', label: { en: 'Plastic in the ocean', kk: 'Мұхиттағы пластик' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: "A wetland can be a frog's ____.", kk: 'Батпақты жер бақаның ____ болуы мүмкін. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['HABITAT'] },
  },
  {
    id: 'ecosystem', word: 'ECOSYSTEM',
    definition: { en: 'Living organisms and their environment interacting as a system.', kk: 'Тірі ағзалар мен қоршаған ортаның өзара байланысқан жүйесі.' },
    options: [
      { id: 'animals', label: { en: 'Only animals', kk: 'Тек жануарлар' } },
      { id: 'correct', label: { en: 'Living things and their environment interacting', kk: 'Тірі ағзалар мен қоршаған ортаның өзара әрекеті' } },
      { id: 'weather', label: { en: 'One day of weather', kk: 'Бір күндік ауа райы' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'Living things and their environment interacting together form an ____.', kk: 'Тірі ағзалар мен олардың ортасының өзара әрекеті ____ құрайды. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['ECOSYSTEM'] },
  },
  {
    id: 'acidic', word: 'ACIDIC',
    definition: { en: 'Having acidic chemical properties.', kk: 'Қышқылдық химиялық қасиеттері бар.' },
    options: [
      { id: 'correct', label: { en: 'Acidic', kk: 'Қышқылды' } },
      { id: 'salty', label: { en: 'Salty', kk: 'Тұзды' } },
      { id: 'icy', label: { en: 'Icy', kk: 'Мұзды' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'If seawater pH decreases, it becomes more ____.', kk: 'Теңіз суының pH төмендесе, ол көбірек ____ болады. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['ACIDIC'] },
  },
  {
    id: 'ocean', word: 'OCEAN',
    definition: { en: 'A very large area of salt water.', kk: 'Тұзды судың өте үлкен аймағы; мұхит.' },
    options: [
      { id: 'river', label: { en: 'A small river', kk: 'Кішкентай өзен' } },
      { id: 'correct', label: { en: 'A very large area of salt water', kk: 'Тұзды судың өте үлкен аймағы' } },
      { id: 'cloud', label: { en: 'A cloud', kk: 'Бұлт' } },
    ], correctOptionId: 'correct',
    context: { prompt: { en: 'A very large area of salt water is an ____.', kk: 'Тұзды судың өте үлкен аймағы — ____. Ағылшынша сөзді жаз.' }, acceptedAnswers: ['OCEAN'] },
  },
];

export const reviewItemsById = Object.fromEntries(reviewItems.map((item) => [item.id, item])) as Record<string, ReviewItem>;
