import type { LocalizedText } from '../domain/content/types.ts';

export type EcoArcadeModeId = 'words' | 'chain' | 'decision' | 'sort' | 'signals';

export type EcoArcadeMode = {
  id: EcoArcadeModeId;
  index: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
};

export const ecoArcadeModes: EcoArcadeMode[] = [
  { id: 'words', index: '01', label: 'WORD PULSE', title: { en: 'Recognise the language', kk: 'Сөздерді таны' }, description: { en: 'Fast bilingual vocabulary recognition.', kk: 'Жылдам екітілді сөздік тану.' } },
  { id: 'chain', index: '02', label: 'CLIMATE CHAIN', title: { en: 'Order cause and effect', kk: 'Себеп пен салдарды ретте' }, description: { en: 'Build a scientific sequence without drag-only controls.', kk: 'Drag-қа тәуелді болмай ғылыми тізбек құрастыр.' } },
  { id: 'decision', index: '03', label: 'ECO DECISION', title: { en: 'Choose the stronger action', kk: 'Күштірек әрекетті таңда' }, description: { en: 'Compare practical environmental choices.', kk: 'Практикалық экологиялық таңдауларды салыстыр.' } },
  { id: 'sort', index: '04', label: 'SORT IT RIGHT', title: { en: 'Choose the material strategy', kk: 'Материал стратегиясын таңда' }, description: { en: 'Reduce, reuse or check the local system.', kk: 'Азайт, қайта қолдан немесе жергілікті ережені тексер.' } },
  { id: 'signals', index: '05', label: 'SIGNAL MATCH', title: { en: 'Connect words to systems', kk: 'Сөздерді жүйелермен байланыстыр' }, description: { en: 'Match a system signal to the strongest topic.', kk: 'Жүйелік белгіні ең сәйкес тақырыппен байланыстыр.' } },
];

export const ecoWordDeck = [
  { word: 'GLACIER', correct: 'Үлкен мұздық', options: ['Үлкен мұздық', 'Қатты жел', 'Орман өрті'] },
  { word: 'DROUGHT', correct: 'Құрғақшылық', options: ['Су тасқыны', 'Құрғақшылық', 'Мұздық'] },
  { word: 'HABITAT', correct: 'Табиғи орта', options: ['Табиғи орта', 'Жылыжай газы', 'Теңіз деңгейі'] },
  { word: 'REUSE', correct: 'Қайта қолдану', options: ['Еріту', 'Қайта қолдану', 'Ластау'] },
] as const;

export const climateChain: LocalizedText[] = [
  { en: 'More greenhouse gases', kk: 'Жылыжай газдары көбейеді' },
  { en: 'More heat stays in the climate system', kk: 'Климат жүйесінде көбірек жылу қалады' },
  { en: 'Average temperature rises', kk: 'Орташа температура көтеріледі' },
  { en: 'Land ice melts faster', kk: 'Құрлық мұзы тезірек ериді' },
  { en: 'Sea level rises', kk: 'Теңіз деңгейі көтеріледі' },
];

export const ecoDecisions = [
  {
    prompt: { en: 'You notice a tap dripping continuously. What is the best first action?', kk: 'Кран үздіксіз тамшылап тұр. Ең дұрыс алғашқы әрекет қандай?' },
    options: [
      { en: 'Ignore it because one drop is small', kk: 'Бір тамшы аз болғандықтан елемеу' },
      { en: 'Report or fix the leak safely', kk: 'Ағып кетуді қауіпсіз түрде хабарлау немесе жөндеу' },
      { en: 'Use more water before it stops', kk: 'Тоқтағанша көбірек су пайдалану' },
    ],
    correct: 1,
    why: { en: 'A persistent leak can add up over time. Stopping avoidable waste is a practical conservation step.', kk: 'Тұрақты ағып кету уақыт өте үлкен ысырапқа айналады. Қажетсіз шығынды тоқтату — практикалық су сақтау қадамы.' },
  },
  {
    prompt: { en: 'A reusable bottle is still safe and working. What usually avoids unnecessary material demand?', kk: 'Қайта қолданылатын бөтелке әлі қауіпсіз әрі жұмыс істейді. Қай таңдау қажетсіз материал сұранысын азайтады?' },
    options: [
      { en: 'Keep using it', kk: 'Оны қолдануды жалғастыру' },
      { en: 'Replace it every week', kk: 'Әр апта сайын ауыстыру' },
      { en: 'Throw it away immediately', kk: 'Бірден тастау' },
    ],
    correct: 0,
    why: { en: 'Extending the useful life of a working product can delay replacement and new material demand.', kk: 'Жұмыс істейтін өнімнің қызмет мерзімін ұзарту ауыстыру мен жаңа материал сұранысын кейінге қалдырады.' },
  },
  {
    prompt: { en: 'You are unsure whether an item can be recycled locally. What is the strongest choice?', kk: 'Заттың жергілікті жерде қайта өңделетінін білмейсің. Ең дұрыс таңдау қандай?' },
    options: [
      { en: 'Guess from the recycling symbol alone', kk: 'Тек қайта өңдеу белгісіне қарап болжау' },
      { en: 'Check the local collection rules', kk: 'Жергілікті жинау ережесін тексеру' },
      { en: 'Put it in every recycling bin', kk: 'Оны кез келген қайта өңдеу жәшігіне салу' },
    ],
    correct: 1,
    why: { en: 'Accepted materials vary by local system. Checking actual collection guidance reduces contamination.', kk: 'Қабылданатын материалдар жергілікті жүйеге қарай өзгереді. Нақты ережені тексеру сұрыптау ластануын азайтады.' },
  },
] as const;

export const ecoSortRounds = [
  {
    item: { en: 'A safe reusable bottle you already own', kk: 'Өзіңде бар қауіпсіз қайта қолданылатын бөтелке' },
    options: [{ en: 'REDUCE', kk: 'АЗАЙТ' }, { en: 'REUSE', kk: 'ҚАЙТА ҚОЛДАН' }, { en: 'CHECK LOCAL RULES', kk: 'ЖЕРГІЛІКТІ ЕРЕЖЕНІ ТЕКСЕР' }],
    correct: 1,
    why: { en: 'Keeping a useful product in service can delay replacement demand.', kk: 'Пайдалы өнімді қолдануды жалғастыру ауыстыру сұранысын кейінге қалдырады.' },
  },
  {
    item: { en: 'A disposable item you do not actually need', kk: 'Шын мәнінде қажет емес бір реттік зат' },
    options: [{ en: 'REDUCE', kk: 'АЗАЙТ' }, { en: 'REUSE', kk: 'ҚАЙТА ҚОЛДАН' }, { en: 'CHECK LOCAL RULES', kk: 'ЖЕРГІЛІКТІ ЕРЕЖЕНІ ТЕКСЕР' }],
    correct: 0,
    why: { en: 'Avoiding unnecessary demand prevents material use before disposal becomes a question.', kk: 'Қажетсіз сұраныстан бас тарту қалдық мәселесі туындамай тұрып материал қолдануды азайтады.' },
  },
  {
    item: { en: 'A plastic tray with an unclear local recycling route', kk: 'Жергілікті қайта өңдеу жолы белгісіз пластик науа' },
    options: [{ en: 'REDUCE', kk: 'АЗАЙТ' }, { en: 'REUSE', kk: 'ҚАЙТА ҚОЛДАН' }, { en: 'CHECK LOCAL RULES', kk: 'ЖЕРГІЛІКТІ ЕРЕЖЕНІ ТЕКСЕР' }],
    correct: 2,
    why: { en: 'Material acceptance depends on local collection and processing infrastructure.', kk: 'Материалды қабылдау жергілікті жинау және өңдеу инфрақұрылымына байланысты.' },
  },
  {
    item: { en: 'A sturdy container that can safely hold supplies again', kk: 'Қауіпсіз түрде қайта қолдануға болатын берік контейнер' },
    options: [{ en: 'REDUCE', kk: 'АЗАЙТ' }, { en: 'REUSE', kk: 'ҚАЙТА ҚОЛДАН' }, { en: 'CHECK LOCAL RULES', kk: 'ЖЕРГІЛІКТІ ЕРЕЖЕНІ ТЕКСЕР' }],
    correct: 1,
    why: { en: 'Safe reuse preserves the value already invested in the product.', kk: 'Қауіпсіз қайта қолдану өнімге бұрын жұмсалған құнды сақтайды.' },
  },
] as const;

export const ecoSignalMatches = [
  { signal: 'RUNOFF', prompt: { en: 'Water carrying material across land toward waterways', kk: 'Құрлық үстімен материалды су жолдарына тасымалдайтын су' }, options: [{ en: 'Ocean Pollution', kk: 'Мұхиттардың ластануы' }, { en: 'Renewable Energy', kk: 'Жаңартылатын энергия' }, { en: 'Biodiversity', kk: 'Биоалуантүрлілік' }], correct: 0 },
  { signal: 'CANOPY', prompt: { en: 'The upper forest layer formed by tree crowns', kk: 'Ағаш тәждерінен құралған орманның жоғарғы қабаты' }, options: [{ en: 'Water Conservation', kk: 'Суды сақтау' }, { en: 'Deforestation', kk: 'Ормандардың жойылуы' }, { en: 'Recycling', kk: 'Қайта өңдеу' }], correct: 1 },
  { signal: 'GRID', prompt: { en: 'A network that moves electricity between supply and demand', kk: 'Электр энергиясын өндіру мен сұраныс арасында тасымалдайтын желі' }, options: [{ en: 'Renewable Energy', kk: 'Жаңартылатын энергия' }, { en: 'Ocean Pollution', kk: 'Мұхиттардың ластануы' }, { en: 'Deforestation', kk: 'Ормандардың жойылуы' }], correct: 0 },
  { signal: 'LIFECYCLE', prompt: { en: 'Stages from production through use to end-of-use', kk: 'Өндіруден қолдануға және қолданудан кейінгі кезеңдерге дейінгі жол' }, options: [{ en: 'Climate Change', kk: 'Климаттың өзгеруі' }, { en: 'Sustainable Consumption', kk: 'Жауапты тұтыну' }, { en: 'Water Conservation', kk: 'Суды сақтау' }], correct: 1 },
] as const;
