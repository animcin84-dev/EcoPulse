import type { LocalizedText } from '../domain/content/types.ts';

export type TopicLabVocabulary = {
  term: string;
  meaning: LocalizedText;
  example: LocalizedText;
};

export type TopicLabConnection = {
  from: LocalizedText;
  to: LocalizedText;
  note: LocalizedText;
};

export type TopicLab = {
  id: 'recycling' | 'ocean-pollution' | 'deforestation' | 'water-conservation' | 'biodiversity' | 'renewable-energy' | 'sustainable-consumption';
  index: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  overview: LocalizedText;
  signal: LocalizedText;
  vocabulary: TopicLabVocabulary[];
  connections: TopicLabConnection[];
  sourceIds: string[];
  actionHref: string;
  actionLabel: LocalizedText;
  nextHref: string;
  nextLabel: LocalizedText;
};

export const topicLabs: Record<TopicLab['id'], TopicLab> = {
  recycling: {
    id: 'recycling', index: '02',
    title: { en: 'Recycling', kk: 'Қалдықтарды қайта өңдеу' },
    subtitle: { en: 'Materials do not disappear when we throw them away.', kk: 'Біз затты тастағанда материал жоғалып кетпейді.' },
    overview: {
      en: 'Recycling can keep useful materials in circulation, but it works best after reducing unnecessary consumption and reusing products. Different materials need different collection and processing systems, so local rules matter.',
      kk: 'Қайта өңдеу пайдалы материалдарды айналымда ұстауға көмектеседі, бірақ ең алдымен қажетсіз тұтынуды азайтып, заттарды қайта қолданған дұрыс. Әртүрлі материалдарға бөлек жинау және өңдеу жүйелері қажет, сондықтан жергілікті ережелер маңызды.',
    },
    signal: { en: 'REDUCE → REUSE → RECYCLE', kk: 'АЗАЙТ → ҚАЙТА ҚОЛДАН → ҚАЙТА ӨҢДЕ' },
    vocabulary: [
      { term: 'MATERIAL', meaning: { en: 'what an object is made from', kk: 'зат жасалған материал' }, example: { en: 'Glass is a material that can often be recycled.', kk: 'Шыны — жиі қайта өңдеуге болатын материал.' } },
      { term: 'WASTE', meaning: { en: 'unwanted material that is discarded', kk: 'тасталатын қажетсіз материал' }, example: { en: 'Reducing food waste saves resources.', kk: 'Тағам қалдығын азайту ресурстарды сақтайды.' } },
      { term: 'REUSE', meaning: { en: 'use an item again instead of discarding it', kk: 'затты тастамай қайта пайдалану' }, example: { en: 'We can reuse this container.', kk: 'Бұл контейнерді қайта қолдануға болады.' } },
      { term: 'SORT', meaning: { en: 'separate items into groups', kk: 'заттарды топтарға бөлу' }, example: { en: 'Sort paper from general waste.', kk: 'Қағазды жалпы қоқыстан бөлек сұрыпта.' } },
    ],
    connections: [
      { from: { en: 'Consumption', kk: 'Тұтыну' }, to: { en: 'Waste', kk: 'Қалдық' }, note: { en: 'More short-lived products can create more waste.', kk: 'Қысқа мерзім қолданылатын заттар қалдықты көбейтуі мүмкін.' } },
      { from: { en: 'Sorting', kk: 'Сұрыптау' }, to: { en: 'Recovery', kk: 'Қайта алу' }, note: { en: 'Clean separation can make material recovery easier.', kk: 'Дұрыс бөлу материалды қайта алуды жеңілдетеді.' } },
      { from: { en: 'Reuse', kk: 'Қайта қолдану' }, to: { en: 'Demand', kk: 'Сұраныс' }, note: { en: 'Longer product life can reduce demand for new material.', kk: 'Затты ұзақ қолдану жаңа материалға сұранысты азайта алады.' } },
    ],
    sourceIds: ['unep-circularity'],
    actionHref: '/action', actionLabel: { en: 'Try an Eco Action', kk: 'Eco Action жасап көр' },
    nextHref: '/game', nextLabel: { en: 'Practice in Eco Game', kk: 'Eco Game ішінде жаттық' },
  },
  'ocean-pollution': {
    id: 'ocean-pollution', index: '03',
    title: { en: 'Ocean Pollution', kk: 'Мұхиттардың ластануы' },
    subtitle: { en: 'What enters rivers and streets can eventually reach the sea.', kk: 'Өзендер мен көшелерге түскен заттар кейін теңізге жетуі мүмкін.' },
    overview: {
      en: 'Ocean pollution includes plastics, chemicals, excess nutrients and other waste that reaches marine environments. Pollution can travel through rivers, drains and coastlines, so prevention on land is an important part of protecting ocean ecosystems.',
      kk: 'Мұхит ластануына пластик, химиялық заттар, артық қоректік заттар және теңіз ортасына жететін басқа қалдықтар кіреді. Ластану өзендер, су ағарлар және жағалау арқылы таралуы мүмкін, сондықтан құрлықта алдын алу мұхит экожүйесін қорғаудың маңызды бөлігі.',
    },
    signal: { en: 'STREET → RIVER → OCEAN', kk: 'КӨШЕ → ӨЗЕН → МҰХИТ' },
    vocabulary: [
      { term: 'POLLUTANT', meaning: { en: 'a substance that contaminates the environment', kk: 'қоршаған ортаны ластайтын зат' }, example: { en: 'Oil can become a marine pollutant.', kk: 'Мұнай теңіз ластаушысына айналуы мүмкін.' } },
      { term: 'MARINE', meaning: { en: 'related to the sea', kk: 'теңізге қатысты' }, example: { en: 'Marine animals can swallow plastic.', kk: 'Теңіз жануарлары пластикті жұтып қоюы мүмкін.' } },
      { term: 'MICROPLASTIC', meaning: { en: 'a very small piece of plastic', kk: 'өте ұсақ пластик бөлшегі' }, example: { en: 'Microplastics can persist in water.', kk: 'Микропластик суда ұзақ сақталуы мүмкін.' } },
      { term: 'RUNOFF', meaning: { en: 'water that flows over land into waterways', kk: 'құрлық үстімен су жолдарына ағатын су' }, example: { en: 'Runoff can carry pollutants into rivers.', kk: 'Ағын су ластаушыларды өзенге тасымалдауы мүмкін.' } },
    ],
    connections: [
      { from: { en: 'Plastic', kk: 'Пластик' }, to: { en: 'Wildlife', kk: 'Жануарлар' }, note: { en: 'Animals can become entangled in or ingest plastic.', kk: 'Жануарлар пластикке оралып қалуы немесе оны жұтуы мүмкін.' } },
      { from: { en: 'Runoff', kk: 'Ағын су' }, to: { en: 'Coast', kk: 'Жағалау' }, note: { en: 'Water carries material across connected systems.', kk: 'Су материалдарды байланысқан жүйелер арқылы тасымалдайды.' } },
      { from: { en: 'Prevention', kk: 'Алдын алу' }, to: { en: 'Cleaner ocean', kk: 'Таза мұхит' }, note: { en: 'Stopping waste before it escapes is often easier than recovery at sea.', kk: 'Қалдықтың табиғатқа түсуін алдын ала тоқтату теңізден жинаудан жеңілірек.' } },
    ],
    sourceIds: ['unep-marine-pollution'],
    actionHref: '/action', actionLabel: { en: 'Take an off-screen action', kk: 'Экраннан тыс әрекет жаса' },
    nextHref: '/learn/life', nextLabel: { en: 'Explore Life systems', kk: 'Life жүйесін зертте' },
  },
  deforestation: {
    id: 'deforestation', index: '04',
    title: { en: 'Deforestation', kk: 'Ормандардың жойылуы' },
    subtitle: { en: 'A forest is habitat, carbon storage and a living network.', kk: 'Орман — табиғи орта, көміртек қоры және тірі желі.' },
    overview: {
      en: 'Deforestation is the long-term removal of forest cover, often to change how land is used. Losing forests can reduce habitat, release stored carbon and alter water cycles, while the causes and solutions differ from one region to another.',
      kk: 'Ормансыздану — көбіне жерді пайдалану тәсілін өзгерту үшін орман жамылғысын ұзақ мерзімге жою. Орманның жоғалуы табиғи ортаны азайтып, сақталған көміртекті босатып, су айналымын өзгерте алады; себептері мен шешімдері аймаққа қарай әртүрлі.',
    },
    signal: { en: 'FOREST = HABITAT + CARBON + WATER', kk: 'ОРМАН = ОРТА + КӨМІРТЕК + СУ' },
    vocabulary: [
      { term: 'DEFORESTATION', meaning: { en: 'the long-term removal of forest', kk: 'орман жамылғысының ұзақ мерзімге жойылуы' }, example: { en: 'Deforestation changes ecosystems.', kk: 'Ормансыздану экожүйелерді өзгертеді.' } },
      { term: 'CANOPY', meaning: { en: 'the upper layer formed by tree crowns', kk: 'ағаш тәждерінен құралған жоғарғы қабат' }, example: { en: 'The canopy shelters many species.', kk: 'Орман төбесі көптеген түрлерге пана болады.' } },
      { term: 'CARBON STORE', meaning: { en: 'a place that holds carbon for a period of time', kk: 'көміртекті белгілі уақыт сақтайтын қор' }, example: { en: 'Forests are important carbon stores.', kk: 'Ормандар маңызды көміртек қоры.' } },
      { term: 'RESTORE', meaning: { en: 'help a damaged system recover', kk: 'зақымданған жүйенің қалпына келуіне көмектесу' }, example: { en: 'Communities can restore degraded land.', kk: 'Қауымдастықтар бүлінген жерді қалпына келтіре алады.' } },
    ],
    connections: [
      { from: { en: 'Forest loss', kk: 'Орман жоғалуы' }, to: { en: 'Habitat loss', kk: 'Табиғи орта жоғалуы' }, note: { en: 'Species lose food, shelter and breeding space.', kk: 'Түрлер қорек, пана және көбею орнын жоғалтады.' } },
      { from: { en: 'Trees', kk: 'Ағаштар' }, to: { en: 'Carbon', kk: 'Көміртек' }, note: { en: 'Living biomass stores carbon while it grows.', kk: 'Өсіп жатқан биомасса көміртекті сақтайды.' } },
      { from: { en: 'Forest cover', kk: 'Орман жамылғысы' }, to: { en: 'Water cycle', kk: 'Су айналымы' }, note: { en: 'Vegetation influences evaporation, soil and local water movement.', kk: 'Өсімдік булануға, топыраққа және жергілікті су қозғалысына әсер етеді.' } },
    ],
    sourceIds: ['fao-forest-resources-2025'],
    actionHref: '/action', actionLabel: { en: 'Observe a local habitat', kk: 'Жергілікті табиғи ортаны бақыла' },
    nextHref: '/learn/life', nextLabel: { en: 'Continue into Life', kk: 'Life бөліміне өт' },
  },
  'water-conservation': {
    id: 'water-conservation', index: '05',
    title: { en: 'Water Conservation', kk: 'Суды сақтау' },
    subtitle: { en: 'Use water carefully before scarcity becomes visible.', kk: 'Су тапшылығы байқалмай тұрып суды ұқыпты пайдалан.' },
    overview: {
      en: 'Water conservation means reducing unnecessary water use and improving efficiency while protecting health and essential needs. Freshwater availability varies by place and season, so useful actions focus on avoiding waste rather than simply using less at any cost.',
      kk: 'Суды сақтау — денсаулық пен негізгі қажеттіліктерді қорғай отырып, қажетсіз су шығынын азайту және тиімділікті арттыру. Тұщы судың қолжетімділігі орын мен маусымға қарай өзгереді, сондықтан пайдалы әрекет суды кез келген бағамен азайтудан емес, ысырапты тоқтатудан басталады.',
    },
    signal: { en: 'NOTICE → REDUCE WASTE → PROTECT SUPPLY', kk: 'БАЙҚА → ЫСЫРАПТЫ АЗАЙТ → ҚОРДЫ ҚОРҒА' },
    vocabulary: [
      { term: 'FRESHWATER', meaning: { en: 'water with very little salt', kk: 'тұзы өте аз су' }, example: { en: 'People depend on freshwater for drinking.', kk: 'Адамдар ауыз су үшін тұщы суға тәуелді.' } },
      { term: 'SCARCITY', meaning: { en: 'not having enough of something needed', kk: 'қажетті ресурстың жеткіліксіз болуы' }, example: { en: 'Drought can increase water scarcity.', kk: 'Құрғақшылық су тапшылығын күшейте алады.' } },
      { term: 'EFFICIENCY', meaning: { en: 'getting the same result with less waste', kk: 'аз ысыраппен бірдей нәтижеге жету' }, example: { en: 'Efficient fixtures can reduce water waste.', kk: 'Тиімді құрылғылар су ысырабын азайта алады.' } },
      { term: 'LEAK', meaning: { en: 'an unintended escape of water', kk: 'судың байқамай сыртқа ағуы' }, example: { en: 'A small leak can waste water over time.', kk: 'Кішкентай ағып кету уақыт өте суды ысырап етеді.' } },
    ],
    connections: [
      { from: { en: 'Drought', kk: 'Құрғақшылық' }, to: { en: 'Supply', kk: 'Су қоры' }, note: { en: 'Long dry periods can reduce available water.', kk: 'Ұзақ құрғақ кезең қолжетімді су қорын азайтады.' } },
      { from: { en: 'Leak', kk: 'Ағып кету' }, to: { en: 'Waste', kk: 'Ысырап' }, note: { en: 'Unnoticed flow can add up over time.', kk: 'Байқалмаған ағын уақыт өте үлкен шығынға айналады.' } },
      { from: { en: 'Efficiency', kk: 'Тиімділік' }, to: { en: 'Resilience', kk: 'Тұрақтылық' }, note: { en: 'Using water more efficiently can reduce pressure on supplies.', kk: 'Суды тиімді пайдалану су қорына түсетін қысымды азайта алады.' } },
    ],
    sourceIds: ['epa-water-efficiency'],
    actionHref: '/mission/water-watch', actionLabel: { en: 'Start Water Watch', kk: 'Water Watch баста' },
    nextHref: '/learn/ice-water', nextLabel: { en: 'Explore Ice + Water', kk: 'Ice + Water зертте' },
  },
  biodiversity: {
    id: 'biodiversity', index: '06',
    title: { en: 'Biodiversity', kk: 'Биоалуантүрлілік' },
    subtitle: { en: 'Life is strongest as a network, not a list of species.', kk: 'Тіршілік — түрлер тізімі емес, байланысқан желі.' },
    overview: {
      en: 'Biodiversity describes variation in living things at genetic, species and ecosystem levels. Healthy ecosystems depend on many relationships among organisms and their habitats, so losing one part of the network can affect other parts in ways that are not always obvious.',
      kk: 'Биоалуантүрлілік тірі ағзалардың генетикалық, түрлік және экожүйелік деңгейдегі алуан түрлілігін сипаттайды. Сау экожүйелер ағзалар мен олардың табиғи орталары арасындағы көптеген байланыстарға тәуелді, сондықтан желінің бір бөлігі жоғалса, басқа бөліктерге де бірден байқалмайтын әсер етуі мүмкін.',
    },
    signal: { en: 'SPECIES ↔ HABITAT ↔ RELATIONSHIPS', kk: 'ТҮРЛЕР ↔ ОРТА ↔ БАЙЛАНЫСТАР' },
    vocabulary: [
      { term: 'BIODIVERSITY', meaning: { en: 'the variety of life at multiple levels', kk: 'тіршіліктің бірнеше деңгейдегі алуан түрлілігі' }, example: { en: 'A wetland can support high biodiversity.', kk: 'Сулы-батпақты жер жоғары биоалуантүрлілікті қолдай алады.' } },
      { term: 'SPECIES', meaning: { en: 'a group of organisms of the same kind', kk: 'бір түрге жататын ағзалар тобы' }, example: { en: 'Each species has relationships with its environment.', kk: 'Әр түр қоршаған ортамен байланыста болады.' } },
      { term: 'ECOSYSTEM', meaning: { en: 'living things and their physical environment interacting', kk: 'тірі ағзалар мен физикалық ортаның өзара әрекеттесетін жүйесі' }, example: { en: 'A forest is an ecosystem.', kk: 'Орман — экожүйе.' } },
      { term: 'HABITAT', meaning: { en: 'the natural place where an organism lives', kk: 'ағза тіршілік ететін табиғи орта' }, example: { en: 'A pond can be habitat for insects and birds.', kk: 'Тоған жәндіктер мен құстарға табиғи орта бола алады.' } },
    ],
    connections: [
      { from: { en: 'Habitat', kk: 'Орта' }, to: { en: 'Species', kk: 'Түрлер' }, note: { en: 'Food, shelter and conditions shape where species can live.', kk: 'Қорек, пана және жағдайлар түрлердің қай жерде өмір сүре алатынын анықтайды.' } },
      { from: { en: 'Pollinators', kk: 'Тозаңдандырғыштар' }, to: { en: 'Plants', kk: 'Өсімдіктер' }, note: { en: 'Many plants depend on animals to move pollen.', kk: 'Көптеген өсімдіктер тозаң тасымалдау үшін жануарларға тәуелді.' } },
      { from: { en: 'Diversity', kk: 'Алуантүрлілік' }, to: { en: 'Ecosystem function', kk: 'Экожүйе қызметі' }, note: { en: 'Different organisms contribute different roles.', kk: 'Әртүрлі ағзалар жүйеде әртүрлі қызмет атқарады.' } },
    ],
    sourceIds: ['ipbes-global-assessment'],
    actionHref: '/mission/habitat-observer', actionLabel: { en: 'Become a Habitat Observer', kk: 'Habitat Observer баста' },
    nextHref: '/learn/life', nextLabel: { en: 'Explore Life', kk: 'Life зертте' },
  },
  'renewable-energy': {
    id: 'renewable-energy', index: '07',
    title: { en: 'Renewable Energy', kk: 'Жаңартылатын энергия' },
    subtitle: { en: 'Energy systems connect physics, infrastructure and choices.', kk: 'Энергия жүйелері физика, инфрақұрылым және таңдауды байланыстырады.' },
    overview: {
      en: 'Renewable energy comes from sources that are naturally replenished, such as sunlight, wind and flowing water. Building a cleaner energy system also involves grids, storage, demand, land, materials and reliability, so no single technology solves every problem everywhere.',
      kk: 'Жаңартылатын энергия күн сәулесі, жел және ағын су сияқты табиғи түрде қайта толығатын көздерден алынады. Таза энергия жүйесін құру электр желісін, сақтау жүйесін, сұранысты, жерді, материалдарды және сенімділікті де қамтиды, сондықтан бір технология барлық жерде барлық мәселені шеше алмайды.',
    },
    signal: { en: 'SOURCE → GRID → USE', kk: 'КӨЗ → ЖЕЛІ → ҚОЛДАНУ' },
    vocabulary: [
      { term: 'RENEWABLE', meaning: { en: 'naturally replenished on human timescales', kk: 'адам өмірі ауқымында табиғи түрде қайта толығатын' }, example: { en: 'Sunlight is a renewable energy source.', kk: 'Күн сәулесі — жаңартылатын энергия көзі.' } },
      { term: 'GRID', meaning: { en: 'the network that moves electricity', kk: 'электр энергиясын тасымалдайтын желі' }, example: { en: 'The grid balances supply and demand.', kk: 'Электр желісі өндіріс пен сұранысты теңестіреді.' } },
      { term: 'STORAGE', meaning: { en: 'keeping energy for later use', kk: 'энергияны кейін қолдану үшін сақтау' }, example: { en: 'Storage can move energy from one time to another.', kk: 'Сақтау энергияны бір уақыттан екінші уақытқа ауыстыруға көмектеседі.' } },
      { term: 'EFFICIENCY', meaning: { en: 'using less energy for the same useful result', kk: 'бірдей пайдалы нәтиже үшін аз энергия қолдану' }, example: { en: 'Efficiency can reduce total demand.', kk: 'Тиімділік жалпы сұранысты азайта алады.' } },
    ],
    connections: [
      { from: { en: 'Sun + wind', kk: 'Күн + жел' }, to: { en: 'Variable supply', kk: 'Өзгермелі өндіріс' }, note: { en: 'Output changes with conditions and time.', kk: 'Өндіріс жағдай мен уақытқа қарай өзгереді.' } },
      { from: { en: 'Grid', kk: 'Желі' }, to: { en: 'Reliability', kk: 'Сенімділік' }, note: { en: 'Networks coordinate many sources and users.', kk: 'Желі көптеген энергия көздері мен тұтынушыларды үйлестіреді.' } },
      { from: { en: 'Efficiency', kk: 'Тиімділік' }, to: { en: 'Demand', kk: 'Сұраныс' }, note: { en: 'Doing the same useful work with less energy can lower demand.', kk: 'Бір жұмысты аз энергиямен орындау сұранысты төмендете алады.' } },
    ],
    sourceIds: ['iea-renewables-2025'],
    actionHref: '/action', actionLabel: { en: 'Audit one energy habit', kk: 'Бір энергия әдетін тексер' },
    nextHref: '/learn/earth-atmosphere', nextLabel: { en: 'Explore Earth + Atmosphere', kk: 'Earth + Atmosphere зертте' },
  },
  'sustainable-consumption': {
    id: 'sustainable-consumption', index: '08',
    title: { en: 'Sustainable Consumption', kk: 'Жауапты тұтыну' },
    subtitle: { en: 'Every product has a story before and after you use it.', kk: 'Әр өнімнің оны қолданғанға дейінгі және кейінгі тарихы бар.' },
    overview: {
      en: 'Sustainable consumption looks at what we buy, how long we use it and what happens after use. Better choices can include buying less, choosing durable products, repairing, sharing and avoiding waste, while recognizing that infrastructure and producer decisions also shape what consumers can do.',
      kk: 'Жауапты тұтыну нені сатып алатынымызды, оны қанша уақыт қолданатынымызды және кейін не болатынын қарастырады. Жақсы таңдау аз сатып алу, ұзақ қызмет ететін затты таңдау, жөндеу, бөлісу және ысырапты азайтуды қамтуы мүмкін; сонымен бірге тұтынушы мүмкіндігіне инфрақұрылым мен өндіруші шешімдері де әсер етеді.',
    },
    signal: { en: 'NEED → CHOOSE → USE → REUSE', kk: 'ҚАЖЕТ → ТАҢДА → ҚОЛДАН → ҚАЙТА ҚОЛДАН' },
    vocabulary: [
      { term: 'DURABLE', meaning: { en: 'able to last for a long time', kk: 'ұзақ уақыт қызмет ете алатын' }, example: { en: 'A durable bottle can be reused many times.', kk: 'Берік бөтелкені көп рет қолдануға болады.' } },
      { term: 'REPAIR', meaning: { en: 'fix something so it can be used again', kk: 'затты қайта қолдану үшін жөндеу' }, example: { en: 'Repair can extend a product’s life.', kk: 'Жөндеу өнімнің қызмет мерзімін ұзартады.' } },
      { term: 'RESOURCE', meaning: { en: 'a useful material, energy source or supply', kk: 'пайдалы материал, энергия көзі немесе қор' }, example: { en: 'Products require resources to make.', kk: 'Өнім жасау үшін ресурстар қажет.' } },
      { term: 'LIFECYCLE', meaning: { en: 'the stages from production to end of use', kk: 'өндіруден пайдалану соңына дейінгі кезеңдер' }, example: { en: 'Think about the whole product lifecycle.', kk: 'Өнімнің бүкіл өмірлік циклін ойла.' } },
    ],
    connections: [
      { from: { en: 'Buying', kk: 'Сатып алу' }, to: { en: 'Resources', kk: 'Ресурстар' }, note: { en: 'New products require materials and energy.', kk: 'Жаңа өнімдерге материалдар мен энергия қажет.' } },
      { from: { en: 'Durability', kk: 'Беріктік' }, to: { en: 'Replacement', kk: 'Ауыстыру' }, note: { en: 'Longer-lasting products may need replacement less often.', kk: 'Ұзақ қызмет ететін өнімді сирек ауыстыру қажет болуы мүмкін.' } },
      { from: { en: 'Repair + reuse', kk: 'Жөндеу + қайта қолдану' }, to: { en: 'Waste prevention', kk: 'Қалдықты азайту' }, note: { en: 'Keeping products in use can delay disposal.', kk: 'Өнімді қолданыста ұстау оны тастауды кейінге қалдырады.' } },
    ],
    sourceIds: ['unep-sustainable-consumption'],
    actionHref: '/action', actionLabel: { en: 'Try a low-impact choice', kk: 'Аз әсерлі таңдау жаса' },
    nextHref: '/learn/recycling', nextLabel: { en: 'Connect to Recycling', kk: 'Recycling тақырыбына өт' },
  },
};
