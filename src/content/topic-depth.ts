import type { LocalizedText } from '../domain/content/types.ts';
import type { TopicLab } from './topic-labs.ts';

export type TopicDepthInsight = {
  label: LocalizedText;
  value: LocalizedText;
  body: LocalizedText;
};

export type TopicDepthQuestion = {
  prompt: LocalizedText;
  options: [LocalizedText, LocalizedText, LocalizedText];
  correct: 0 | 1 | 2;
  explanation: LocalizedText;
};

export type TopicDepthEntry = {
  thesis: LocalizedText;
  insights: [TopicDepthInsight, TopicDepthInsight, TopicDepthInsight];
  checks: [TopicDepthQuestion, TopicDepthQuestion, TopicDepthQuestion];
};

export const topicDepth: Record<TopicLab['id'], TopicDepthEntry> = {
  recycling: {
    thesis: {
      en: 'Recycling is one stage of a material system: the strongest result usually comes from preventing unnecessary material demand first, then reusing products, and only then recovering what remains.',
      kk: 'Қайта өңдеу — материал жүйесінің бір ғана кезеңі: ең күшті нәтиже әдетте алдымен қажетсіз материал сұранысын азайтудан, кейін заттарды қайта қолданудан, содан соң қалғанын қайта өңдеуден келеді.',
    },
    insights: [
      { label: { en: 'BEFORE THE BIN', kk: 'ЖӘШІККЕ ДЕЙІН' }, value: { en: 'Prevent waste', kk: 'Қалдықты алдын ал' }, body: { en: 'A product that never becomes unnecessary waste avoids collection, transport and processing altogether.', kk: 'Қажетсіз қалдыққа айналмаған өнім жинау, тасымалдау және өңдеу қажеттілігін де болдырмайды.' } },
      { label: { en: 'SYSTEM LIMIT', kk: 'ЖҮЙЕ ШЕГІ' }, value: { en: 'Local rules matter', kk: 'Жергілікті ереже маңызды' }, body: { en: 'A recycling symbol does not guarantee that a local facility accepts an item; collection systems differ by place.', kk: 'Қайта өңдеу белгісі заттың жергілікті жүйеде міндетті түрде қабылданатынын білдірмейді; жинау ережелері әр жерде әртүрлі.' } },
      { label: { en: 'MATERIAL QUALITY', kk: 'МАТЕРИАЛ САПАСЫ' }, value: { en: 'Clean streams recover better', kk: 'Таза сұрыптау тиімді' }, body: { en: 'Mixing food, liquids or incompatible materials can make useful material harder to recover.', kk: 'Тағам, сұйықтық немесе үйлеспейтін материалдарды араластыру пайдалы материалды қайта алуды қиындатады.' } },
    ],
    checks: [
      { prompt: { en: 'What is usually the strongest first step in the waste hierarchy?', kk: 'Қалдық иерархиясында әдетте ең күшті алғашқы қадам қайсы?' }, options: [{ en: 'Prevent unnecessary consumption', kk: 'Қажетсіз тұтынуды азайту' }, { en: 'Recycle everything immediately', kk: 'Барлығын бірден қайта өңдеу' }, { en: 'Replace working products', kk: 'Жұмыс істейтін заттарды ауыстыру' }], correct: 0, explanation: { en: 'Preventing waste avoids the material and processing demand before it appears.', kk: 'Қалдықты алдын алу материал мен өңдеу қажеттілігін пайда болмай тұрып азайтады.' } },
      { prompt: { en: 'Why should you check local collection guidance?', kk: 'Неліктен жергілікті жинау ережесін тексеру керек?' }, options: [{ en: 'All places accept the same items', kk: 'Барлық жерде бірдей заттар қабылданады' }, { en: 'Accepted materials vary by system', kk: 'Қабылданатын материалдар жүйеге қарай өзгереді' }, { en: 'Symbols are illegal', kk: 'Белгілер заңсыз' }], correct: 1, explanation: { en: 'Collection and processing infrastructure differs, so local instructions are the reliable guide.', kk: 'Жинау және өңдеу инфрақұрылымы әртүрлі, сондықтан жергілікті нұсқаулық сенімдірек.' } },
      { prompt: { en: 'What can contamination do?', kk: 'Ластану сұрыпталған материалға не істей алады?' }, options: [{ en: 'Always improve recycling', kk: 'Әрқашан қайта өңдеуді жақсартады' }, { en: 'Make recovery harder', kk: 'Қайта алуды қиындатады' }, { en: 'Create new raw material', kk: 'Жаңа шикізат жасайды' }], correct: 1, explanation: { en: 'Food, liquid and incompatible materials can reduce the quality of a recycling stream.', kk: 'Тағам, сұйықтық және үйлеспейтін материалдар қайта өңдеу ағынының сапасын төмендетуі мүмкін.' } },
    ],
  },
  'ocean-pollution': {
    thesis: {
      en: 'Ocean pollution is often a connected-land problem: what is dropped, washed or discharged upstream can move through drains and rivers before it becomes a marine problem far from its source.',
      kk: 'Мұхит ластануы көбіне құрлықтағы байланысқан мәселе: жоғары ағыста тасталған, жуылған немесе төгілген заттар су ағарлар мен өзендер арқылы өтіп, бастапқы орнынан алыс жерде теңіз мәселесіне айналуы мүмкін.',
    },
    insights: [
      { label: { en: 'PATHWAY', kk: 'ЖОЛ' }, value: { en: 'Land → water', kk: 'Құрлық → су' }, body: { en: 'Runoff and drainage networks can carry litter, oil, nutrients and fine particles into waterways.', kk: 'Ағын су мен дренаж жүйелері қоқыс, май, қоректік заттар және ұсақ бөлшектерді су жолдарына тасымалдауы мүмкін.' } },
      { label: { en: 'PERSISTENCE', kk: 'ҰЗАҚ САҚТАЛУ' }, value: { en: 'Small does not mean gone', kk: 'Ұсақ болса да жоғалмайды' }, body: { en: 'Plastic can fragment into smaller pieces while remaining in the environment rather than simply disappearing.', kk: 'Пластик жай жоғалып кетпей, қоршаған ортада қала отырып ұсақ бөлшектерге бөлінуі мүмкін.' } },
      { label: { en: 'LEVER', kk: 'ТИІМДІ ҚАДАМ' }, value: { en: 'Stop escape early', kk: 'Ерте тоқтат' }, body: { en: 'Preventing waste from reaching drains and rivers can be easier than trying to recover diffuse pollution at sea.', kk: 'Қалдықтың су ағарлар мен өзендерге түсуін алдын ала тоқтату теңіздегі шашыраңқы ластануды жинаудан жеңілірек болуы мүмкін.' } },
    ],
    checks: [
      { prompt: { en: 'Which pathway can carry pollution from streets to the sea?', kk: 'Көшеден теңізге ластануды қай жол жеткізе алады?' }, options: [{ en: 'Runoff and rivers', kk: 'Ағын су мен өзендер' }, { en: 'Only clouds', kk: 'Тек бұлттар' }, { en: 'Only underground magma', kk: 'Тек жер асты магмасы' }], correct: 0, explanation: { en: 'Connected drainage and river systems can transport material from land toward coasts.', kk: 'Байланысқан дренаж және өзен жүйелері материалды құрлықтан жағалауға тасымалдай алады.' } },
      { prompt: { en: 'When plastic breaks into microplastics, what has happened?', kk: 'Пластик микропластикке бөлінгенде не болды?' }, options: [{ en: 'It vanished', kk: 'Ол жоғалды' }, { en: 'It fragmented into smaller pieces', kk: 'Ол ұсақ бөлшектерге бөлінді' }, { en: 'It became clean water', kk: 'Ол таза суға айналды' }], correct: 1, explanation: { en: 'Fragmentation changes size; it does not mean the material has disappeared from the environment.', kk: 'Бөлшектену өлшемді өзгертеді, бірақ материал қоршаған ортадан жоғалды деген сөз емес.' } },
      { prompt: { en: 'Why is prevention on land useful?', kk: 'Құрлықтағы алдын алу неге пайдалы?' }, options: [{ en: 'It can stop pollution before it disperses', kk: 'Ластану таралмай тұрып тоқтатуға болады' }, { en: 'The ocean has no currents', kk: 'Мұхитта ағыс жоқ' }, { en: 'All pollution sinks immediately', kk: 'Барлық ластану бірден түбіне түседі' }], correct: 0, explanation: { en: 'Stopping material near its source is often more practical than recovering it after wide dispersal.', kk: 'Материалды бастапқы орнына жақын тоқтату кең таралғаннан кейін жинаудан жиі тиімдірек.' } },
    ],
  },
  deforestation: {
    thesis: {
      en: 'Deforestation changes more than the number of trees: it can alter habitat, stored carbon, soil protection and water movement at the same time, which is why forest loss is a system-level change.',
      kk: 'Ормансыздану тек ағаш санын өзгертпейді: ол бір уақытта табиғи ортаны, сақталған көміртекті, топырақ қорғанысын және су қозғалысын өзгерте алады, сондықтан орман жоғалуы — жүйелік өзгеріс.',
    },
    insights: [
      { label: { en: 'LIVING STRUCTURE', kk: 'ТІРІ ҚҰРЫЛЫМ' }, value: { en: 'Habitat has layers', kk: 'Табиғи орта қабатты' }, body: { en: 'Canopy, understory, soil and dead wood can each support different organisms and ecological roles.', kk: 'Орман төбесі, төменгі өсімдік қабаты, топырақ және қураған ағаш әртүрлі ағзалар мен экологиялық қызметтерді қолдай алады.' } },
      { label: { en: 'CARBON', kk: 'КӨМІРТЕК' }, value: { en: 'Biomass stores carbon', kk: 'Биомасса көміртек сақтайды' }, body: { en: 'Trees and soils can hold carbon for years; removing or burning biomass can return part of it to the atmosphere.', kk: 'Ағаштар мен топырақ көміртекті жылдар бойы сақтай алады; биомассаны жою немесе өртеу оның бір бөлігін атмосфераға қайтара алады.' } },
      { label: { en: 'WATER + SOIL', kk: 'СУ + ТОПЫРАҚ' }, value: { en: 'Cover changes flow', kk: 'Жамылғы ағынды өзгертеді' }, body: { en: 'Vegetation affects interception, evaporation, root structure and how water moves across and through soil.', kk: 'Өсімдік жауынның ұсталуына, булануға, тамыр құрылымына және судың топырақпен қозғалуына әсер етеді.' } },
    ],
    checks: [
      { prompt: { en: 'Why can forest loss affect biodiversity?', kk: 'Орман жоғалуы биоалуантүрлілікке неге әсер етеді?' }, options: [{ en: 'It changes habitat', kk: 'Табиғи ортаны өзгертеді' }, { en: 'It creates more oceans', kk: 'Көбірек мұхит жасайды' }, { en: 'It stops gravity', kk: 'Гравитацияны тоқтатады' }], correct: 0, explanation: { en: 'Species depend on food, shelter and conditions provided by habitat structure.', kk: 'Түрлер табиғи орта беретін қорекке, панаға және жағдайларға тәуелді.' } },
      { prompt: { en: 'What can happen to stored carbon when biomass is burned?', kk: 'Биомасса жанғанда сақталған көміртекке не болуы мүмкін?' }, options: [{ en: 'Some can return to the atmosphere', kk: 'Бір бөлігі атмосфераға қайтуы мүмкін' }, { en: 'It becomes gravity', kk: 'Ол гравитацияға айналады' }, { en: 'It disappears from matter', kk: 'Материядан жоғалады' }], correct: 0, explanation: { en: 'Combustion converts carbon in biomass into gases including carbon dioxide.', kk: 'Жану биомассадағы көміртекті көмірқышқыл газы сияқты газдарға айналдырады.' } },
      { prompt: { en: 'Forest restoration is strongest when it considers…', kk: 'Орманды қалпына келтіру ең тиімді болады, егер ол…' }, options: [{ en: 'Only tree count', kk: 'Тек ағаш санын' }, { en: 'Habitat, soil, water and local ecology', kk: 'Табиғи орта, топырақ, су және жергілікті экологияны' }, { en: 'Only paint colour', kk: 'Тек бояу түсін' }], correct: 1, explanation: { en: 'A forest is a living system, so recovery is broader than planting any tree anywhere.', kk: 'Орман — тірі жүйе, сондықтан қалпына келтіру кез келген жерге кез келген ағаш отырғызудан кеңірек.' } },
    ],
  },
  'water-conservation': {
    thesis: {
      en: 'Water conservation is not “use as little water as possible”; it is a systems decision that protects essential needs while reducing avoidable losses, inefficient use and pressure on local supplies.',
      kk: 'Суды сақтау «мүмкіндігінше аз су қолдану» деген емес; ол негізгі қажеттіліктерді қорғап, қажетсіз шығынды, тиімсіз қолдануды және жергілікті су қорына түсетін қысымды азайтатын жүйелік шешім.',
    },
    insights: [
      { label: { en: 'PRIORITY', kk: 'БАСЫМДЫҚ' }, value: { en: 'Essential use stays', kk: 'Қажетті су қалады' }, body: { en: 'Health, hygiene and drinking needs should not be sacrificed simply to make a usage number smaller.', kk: 'Тек тұтыну санын азайту үшін денсаулық, гигиена және ауызсу қажеттілігін құрбан етуге болмайды.' } },
      { label: { en: 'HIDDEN LOSS', kk: 'ЖАСЫРЫН ШЫҒЫН' }, value: { en: 'Leaks accumulate', kk: 'Ағып кету жиналады' }, body: { en: 'A small continuous leak can become meaningful waste over hours, days and weeks.', kk: 'Кішкентай тұрақты ағып кету сағаттар, күндер және апталар ішінде елеулі ысырапқа айналуы мүмкін.' } },
      { label: { en: 'LOCAL SYSTEM', kk: 'ЖЕРГІЛІКТІ ЖҮЙЕ' }, value: { en: 'Scarcity varies', kk: 'Тапшылық әртүрлі' }, body: { en: 'Water availability, infrastructure and seasonal stress differ between places, so context matters.', kk: 'Су қолжетімділігі, инфрақұрылым және маусымдық қысым әр жерде өзгеше, сондықтан контекст маңызды.' } },
    ],
    checks: [
      { prompt: { en: 'Which is a better conservation target?', kk: 'Суды сақтаудың қай нысанасы дұрысырақ?' }, options: [{ en: 'Avoidable waste', kk: 'Қажетсіз ысырап' }, { en: 'Essential drinking water', kk: 'Қажетті ауызсу' }, { en: 'Necessary hygiene', kk: 'Қажетті гигиена' }], correct: 0, explanation: { en: 'Conservation should reduce avoidable losses without undermining essential health needs.', kk: 'Суды сақтау негізгі денсаулық қажеттіліктерін бұзбай, қажетсіз шығынды азайтуы керек.' } },
      { prompt: { en: 'Why can a small leak matter?', kk: 'Кішкентай ағып кету неге маңызды?' }, options: [{ en: 'It accumulates over time', kk: 'Уақыт өте жиналады' }, { en: 'It stops rainfall', kk: 'Жаңбырды тоқтатады' }, { en: 'It creates salt', kk: 'Тұз жасайды' }], correct: 0, explanation: { en: 'Continuous small flows can add up to a large total volume.', kk: 'Үздіксіз кішкентай ағындар жалпы көлемде үлкен шығынға айналуы мүмкін.' } },
      { prompt: { en: 'Why does local context matter?', kk: 'Жергілікті контекст неге маңызды?' }, options: [{ en: 'Supply and infrastructure differ', kk: 'Су қоры мен инфрақұрылым әртүрлі' }, { en: 'Water has different chemistry rules in each city', kk: 'Әр қалада судың химия заңы бөлек' }, { en: 'Gravity changes by neighbourhood', kk: 'Әр ауданда гравитация өзгереді' }], correct: 0, explanation: { en: 'Availability, drought pressure and infrastructure vary, so useful priorities are not identical everywhere.', kk: 'Қолжетімділік, құрғақшылық қысымы және инфрақұрылым әртүрлі, сондықтан басымдықтар да барлық жерде бірдей емес.' } },
    ],
  },
  biodiversity: {
    thesis: {
      en: 'Biodiversity is not just a species count: resilience depends on genetic variation, species, habitats and the relationships among them, so losing connections can matter even before a whole species disappears.',
      kk: 'Биоалуантүрлілік тек түрлер саны емес: тұрақтылық генетикалық әртүрлілікке, түрлерге, табиғи орталарға және олардың байланыстарына тәуелді, сондықтан байланыстардың жоғалуы түр толық жойылмай тұрып-ақ маңызды болуы мүмкін.',
    },
    insights: [
      { label: { en: 'LEVELS', kk: 'ДЕҢГЕЙЛЕР' }, value: { en: 'Genes → species → ecosystems', kk: 'Ген → түр → экожүйе' }, body: { en: 'Variation exists inside species, between species and across whole ecosystems.', kk: 'Алуан түрлілік түрдің ішінде, түрлер арасында және тұтас экожүйелерде болады.' } },
      { label: { en: 'RELATIONSHIPS', kk: 'БАЙЛАНЫСТАР' }, value: { en: 'Functions are connected', kk: 'Қызметтер байланысқан' }, body: { en: 'Pollination, decomposition, predation and shelter are examples of relationships that help systems function.', kk: 'Тозаңдану, ыдырау, жыртқыштық және пана — жүйенің жұмыс істеуіне көмектесетін байланыстардың мысалдары.' } },
      { label: { en: 'HABITAT', kk: 'ТАБИҒИ ОРТА' }, value: { en: 'Place shapes life', kk: 'Орын тіршілікті қалыптастырады' }, body: { en: 'Food, water, shelter and physical conditions determine which organisms can persist in a place.', kk: 'Қорек, су, пана және физикалық жағдайлар қай ағзалардың белгілі жерде тұрақтай алатынын анықтайды.' } },
    ],
    checks: [
      { prompt: { en: 'Biodiversity includes variation at which levels?', kk: 'Биоалуантүрлілік қай деңгейлердегі алуан түрлілікті қамтиды?' }, options: [{ en: 'Genes, species and ecosystems', kk: 'Гендер, түрлер және экожүйелер' }, { en: 'Only large animals', kk: 'Тек ірі жануарлар' }, { en: 'Only forests', kk: 'Тек ормандар' }], correct: 0, explanation: { en: 'Biodiversity is broader than a list of species and includes multiple biological levels.', kk: 'Биоалуантүрлілік түрлер тізімінен кең және бірнеше биологиялық деңгейді қамтиды.' } },
      { prompt: { en: 'Why can losing pollinators affect plants?', kk: 'Тозаңдандырғыштардың азаюы өсімдіктерге неге әсер етуі мүмкін?' }, options: [{ en: 'Some plants depend on them for reproduction', kk: 'Кей өсімдіктер көбею үшін оларға тәуелді' }, { en: 'Pollinators control gravity', kk: 'Тозаңдандырғыштар гравитацияны басқарады' }, { en: 'Plants stop needing water', kk: 'Өсімдіктерге су қажет болмай қалады' }], correct: 0, explanation: { en: 'Many flowering plants use animal pollinators to move pollen between flowers.', kk: 'Көптеген гүлді өсімдіктер тозаңды гүлдер арасында тасымалдау үшін жануар тозаңдандырғыштарды пайдаланады.' } },
      { prompt: { en: 'A habitat provides…', kk: 'Табиғи орта нені қамтамасыз етеді?' }, options: [{ en: 'Conditions and resources organisms need', kk: 'Ағзаларға қажет жағдайлар мен ресурстарды' }, { en: 'Only a scientific name', kk: 'Тек ғылыми атауды' }, { en: 'Unlimited food', kk: 'Шексіз қоректі' }], correct: 0, explanation: { en: 'Habitat includes the physical and biological conditions that support an organism.', kk: 'Табиғи орта ағзаны қолдайтын физикалық және биологиялық жағдайларды қамтиды.' } },
    ],
  },
  'renewable-energy': {
    thesis: {
      en: 'Renewable energy is a whole-system engineering problem: clean generation matters, but reliability also depends on transmission, storage, flexible demand, geography and how different sources work together over time.',
      kk: 'Жаңартылатын энергия — тұтас жүйелік инженерлік мәселе: таза өндіру маңызды, бірақ сенімділік сонымен бірге электр желісіне, сақтауға, икемді сұранысқа, географияға және әртүрлі энергия көздерінің уақыт бойынша бірге жұмыс істеуіне тәуелді.',
    },
    insights: [
      { label: { en: 'SOURCE', kk: 'КӨЗ' }, value: { en: 'Variable output', kk: 'Өзгермелі өндіріс' }, body: { en: 'Solar and wind output changes with sunlight, weather and time, so supply is not constant.', kk: 'Күн және жел энергиясының өндірісі жарыққа, ауа райына және уақытқа қарай өзгереді, сондықтан өндіріс тұрақты емес.' } },
      { label: { en: 'NETWORK', kk: 'ЖЕЛІ' }, value: { en: 'Grid coordinates', kk: 'Желі үйлестіреді' }, body: { en: 'Transmission connects many generators and users so the system can balance supply and demand across places.', kk: 'Электр желісі көптеген өндірушілер мен тұтынушыларды байланыстырып, әр жердегі өндіріс пен сұранысты теңестіруге көмектеседі.' } },
      { label: { en: 'FLEXIBILITY', kk: 'ИКЕМДІЛІК' }, value: { en: 'Storage + demand', kk: 'Сақтау + сұраныс' }, body: { en: 'Storage and flexible consumption can shift energy across time instead of requiring generation and use to match perfectly every moment.', kk: 'Сақтау мен икемді тұтыну энергияны уақыт бойынша жылжытып, өндіру мен қолданудың әр сәтте дәл сәйкес болуын азайтады.' } },
    ],
    checks: [
      { prompt: { en: 'Why is a grid important?', kk: 'Электр желісі неге маңызды?' }, options: [{ en: 'It coordinates supply and demand', kk: 'Өндіріс пен сұранысты үйлестіреді' }, { en: 'It creates sunlight', kk: 'Күн сәулесін жасайды' }, { en: 'It removes all weather', kk: 'Барлық ауа райын жояды' }], correct: 0, explanation: { en: 'A network moves electricity between generators and users while operators balance the system.', kk: 'Желі электр энергиясын өндірушілер мен тұтынушылар арасында тасымалдап, жүйені теңестіруге мүмкіндік береді.' } },
      { prompt: { en: 'What can energy storage do?', kk: 'Энергия сақтау не істей алады?' }, options: [{ en: 'Shift energy from one time to another', kk: 'Энергияны бір уақыттан екіншісіне ауыстыру' }, { en: 'Make energy from nothing', kk: 'Жоқтан энергия жасау' }, { en: 'Stop night permanently', kk: 'Түнді толық тоқтату' }], correct: 0, explanation: { en: 'Storage charges when energy is available and can discharge later, with real efficiency limits.', kk: 'Сақтау жүйесі энергия қолжетімді кезде зарядталып, кейін бере алады; мұнда нақты тиімділік шектері бар.' } },
      { prompt: { en: 'Why is no single technology enough everywhere?', kk: 'Неге бір технология барлық жерде жеткіліксіз?' }, options: [{ en: 'Resources, grids and needs differ', kk: 'Ресурстар, желі және қажеттілік әртүрлі' }, { en: 'Physics changes each day', kk: 'Физика күн сайын өзгереді' }, { en: 'Electricity has no units', kk: 'Электр энергиясының өлшемі жоқ' }], correct: 0, explanation: { en: 'Geography, weather, infrastructure and demand profiles change which combinations work best.', kk: 'География, ауа райы, инфрақұрылым және сұраныс профилі қай комбинация тиімді екенін өзгертеді.' } },
    ],
  },
  'sustainable-consumption': {
    thesis: {
      en: 'Sustainable consumption is a lifecycle question, not a shopping slogan: need, durability, repair, reuse, energy, materials and end-of-use systems all influence the impact of a product over time.',
      kk: 'Жауапты тұтыну — сатып алу ұраны емес, өмірлік цикл сұрағы: қажеттілік, беріктік, жөндеу, қайта қолдану, энергия, материал және қолданудан кейінгі жүйе өнімнің уақыт бойынша әсерін қалыптастырады.',
    },
    insights: [
      { label: { en: 'BEFORE BUYING', kk: 'САТЫП АЛУҒА ДЕЙІН' }, value: { en: 'Question the need', kk: 'Қажеттілікті тексер' }, body: { en: 'The lowest-impact new product can still use materials and energy; sometimes the strongest choice is using what already exists.', kk: 'Ең аз әсерлі жаңа өнімнің өзіне материал мен энергия керек; кейде ең тиімді таңдау — бар затты қолдану.' } },
      { label: { en: 'USE PHASE', kk: 'ҚОЛДАНУ КЕЗЕҢІ' }, value: { en: 'Durability matters', kk: 'Беріктік маңызды' }, body: { en: 'Keeping a safe, useful product in service longer can delay replacement and spread manufacturing impacts across more use.', kk: 'Қауіпсіз әрі пайдалы өнімді ұзақ қолдану ауыстыруды кейінге қалдырып, өндіріс әсерін көбірек қолдану уақытына бөле алады.' } },
      { label: { en: 'AFTER USE', kk: 'ҚОЛДАНУДАН КЕЙІН' }, value: { en: 'Repair → reuse → recovery', kk: 'Жөндеу → қайта қолдану → қайта алу' }, body: { en: 'Repair and reuse can preserve more of a product’s existing value before material recycling becomes the final option.', kk: 'Жөндеу мен қайта қолдану материалды қайта өңдеуге дейін өнімнің бар құнын көбірек сақтауға көмектеседі.' } },
    ],
    checks: [
      { prompt: { en: 'What should come before choosing a new “green” product?', kk: 'Жаңа «жасыл» өнімді таңдаудан бұрын не ойлау керек?' }, options: [{ en: 'Whether you need a new product at all', kk: 'Жаңа өнім шынымен қажет пе' }, { en: 'Only package colour', kk: 'Тек қаптама түсі' }, { en: 'Whether it is the newest model', kk: 'Ең жаңа модель ме' }], correct: 0, explanation: { en: 'Avoiding unnecessary replacement can prevent new material and manufacturing demand entirely.', kk: 'Қажетсіз ауыстырудан бас тарту жаңа материал мен өндіріс сұранысын толық болдырмауы мүмкін.' } },
      { prompt: { en: 'How can durability reduce replacement demand?', kk: 'Беріктік ауыстыру сұранысын қалай азайта алады?' }, options: [{ en: 'A product can stay useful longer', kk: 'Өнім ұзақ уақыт пайдалы болып қалады' }, { en: 'It makes products weightless', kk: 'Өнімді салмақсыз етеді' }, { en: 'It removes all maintenance', kk: 'Барлық күтімді жояды' }], correct: 0, explanation: { en: 'A longer useful life can mean fewer replacements over the same period.', kk: 'Ұзақ қызмет мерзімі бір уақыт ішінде азырақ ауыстыру қажет дегенді білдіруі мүмкін.' } },
      { prompt: { en: 'Why can repair be valuable?', kk: 'Жөндеу неге пайдалы болуы мүмкін?' }, options: [{ en: 'It can keep an existing product in use', kk: 'Бар өнімді қолданыста ұстайды' }, { en: 'It always creates more waste', kk: 'Әрқашан көбірек қалдық жасайды' }, { en: 'It guarantees zero impact', kk: 'Нөлдік әсерге кепілдік береді' }], correct: 0, explanation: { en: 'Repair can extend useful life, though the best decision still depends on safety, efficiency and context.', kk: 'Жөндеу қызмет мерзімін ұзарта алады, бірақ дұрыс шешім қауіпсіздікке, тиімділікке және контекстке тәуелді.' } },
    ],
  },
};
