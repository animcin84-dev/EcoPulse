import type { LocalizedText } from '../domain/content/types.ts';
import type { TopicLab } from './topic-labs.ts';

export type TopicReadingChapter = {
  label: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

export const topicReadings: Record<TopicLab['id'], [TopicReadingChapter, TopicReadingChapter, TopicReadingChapter]> = {
  recycling: [
    {
      label: { en: '01 / BEFORE THE BIN', kk: '01 / ЖӘШІККЕ ДЕЙІН' },
      title: { en: 'Waste begins before we throw something away.', kk: 'Қалдық затты тастаған сәттен бұрын басталады.' },
      body: {
        en: 'Every product begins with materials, energy, transport and design choices. If an item is bought for a very short use and quickly discarded, recycling only deals with the final stage of a much longer system. Reducing unnecessary purchases, choosing durable products and reusing what already exists can prevent waste before collection and processing are needed.',
        kk: 'Әр өнім материалдан, энергиядан, тасымалдан және дизайн шешімдерінен басталады. Егер зат өте қысқа уақытқа сатып алынып, тез тасталса, қайта өңдеу ұзақ жүйенің тек соңғы кезеңімен жұмыс істейді. Қажетсіз сатып алуды азайту, ұзақ қызмет ететін өнімді таңдау және бар затты қайта қолдану қалдықты жинау мен өңдеу қажет болмай тұрып азайта алады.',
      },
    },
    {
      label: { en: '02 / SORTING', kk: '02 / СҰРЫПТАУ' },
      title: { en: 'A recycling symbol is not a universal permission slip.', kk: 'Қайта өңдеу белгісі барлық жерде бірдей рұқсат емес.' },
      body: {
        en: 'Recycling systems depend on local collection rules, equipment and markets for recovered material. One city may accept a container that another city cannot process. Food, liquids or mixed materials can also contaminate a recycling stream. Good sorting therefore means checking local guidance and keeping recoverable materials as clean and separate as the system requires.',
        kk: 'Қайта өңдеу жүйесі жергілікті жинау ережесіне, жабдыққа және қайта алынған материалға сұранысқа тәуелді. Бір қала қабылдайтын контейнерді басқа қала өңдей алмауы мүмкін. Тағам, сұйықтық немесе аралас материал сұрыпталған ағынды ластауы мүмкін. Сондықтан дұрыс сұрыптау жергілікті нұсқаулықты тексеріп, пайдалы материалды жүйе талап еткендей таза және бөлек ұстауды білдіреді.',
      },
    },
    {
      label: { en: '03 / CIRCULATION', kk: '03 / АЙНАЛЫМ' },
      title: { en: 'The goal is useful material staying useful for longer.', kk: 'Мақсат — пайдалы материалды ұзақ уақыт пайдалы күйде ұстау.' },
      body: {
        en: 'A stronger material system tries to keep products and materials in use through maintenance, repair, reuse and suitable recycling. Recycling is valuable when it replaces part of the need for new raw material, but it still uses collection, transport and processing. Thinking in loops helps us ask a better question: how can this object stay useful before it becomes waste?',
        kk: 'Күшті материал жүйесі өнім мен материалды қызмет көрсету, жөндеу, қайта қолдану және сәйкес қайта өңдеу арқылы айналымда ұстауға тырысады. Қайта өңдеу жаңа шикізатқа сұраныстың бір бөлігін алмастырғанда пайдалы, бірақ оған да жинау, тасымалдау және өңдеу керек. Айналыммен ойлау «бұл зат қалдыққа айналмай тұрып қалай ұзақ пайдалы болады?» деген жақсырақ сұрақ қояды.',
      },
    },
  ],
  'ocean-pollution': [
    {
      label: { en: '01 / PATHWAYS', kk: '01 / ТАРАЛУ ЖОЛДАРЫ' },
      title: { en: 'Ocean pollution can start far away from the ocean.', kk: 'Мұхит ластануы мұхиттан өте алыс жерде басталуы мүмкін.' },
      body: {
        en: 'Litter, oil, chemicals and other material can move with rainwater into drains, streams and rivers. Those connected waterways can carry pollution toward lakes and coasts, sometimes far from the place where it first entered the environment. This is why protecting the ocean also requires attention to streets, rivers, waste systems and everyday choices on land.',
        kk: 'Қоқыс, май, химиялық заттар және басқа материал жауын суымен кәрізге, жылғаға және өзенге түсуі мүмкін. Байланысқан су жолдары ластануды көлдер мен жағалауға, бастапқы орнынан өте алыс жерге дейін жеткізе алады. Сондықтан мұхитты қорғау үшін көшеге, өзенге, қалдық жүйесіне және құрлықтағы күнделікті таңдауға да назар аудару қажет.',
      },
    },
    {
      label: { en: '02 / PERSISTENCE', kk: '02 / ҰЗАҚ САҚТАЛУ' },
      title: { en: 'Breaking into smaller pieces is not the same as disappearing.', kk: 'Ұсақ бөлшекке бөліну жоғалып кетумен бірдей емес.' },
      body: {
        en: 'Many plastic items become brittle and fragment into smaller pieces as they weather. The pieces may become harder to see and harder to recover, yet the material can remain in the environment. Small particles can move through water and sediment and may interact with wildlife. Preventing plastic escape is therefore usually more practical than trying to collect widely dispersed fragments later.',
        kk: 'Көптеген пластик зат уақыт өте морт болып, ұсақ бөлшектерге бөлінеді. Бөлшектерді көру де, жинау да қиындайды, бірақ материал қоршаған ортада қала береді. Ұсақ бөлшектер су мен шөгінді арқылы қозғалып, жануарлармен әсерлесуі мүмкін. Сондықтан пластиктің табиғатқа түсуін алдын ала тоқтату кейін кең таралған ұсақ бөлшекті жинаудан жиі тиімдірек.',
      },
    },
    {
      label: { en: '03 / PREVENTION', kk: '03 / АЛДЫН АЛУ' },
      title: { en: 'The strongest cleanup can happen before pollution escapes.', kk: 'Ең тиімді тазалау ластану таралмай тұрып жасалуы мүмкін.' },
      body: {
        en: 'Beach cleanups can remove visible litter and are useful for communities, but they cannot solve every upstream source. Better systems reduce unnecessary single-use material, collect waste reliably and stop pollutants from entering drains and rivers. Ocean protection is therefore both a cleanup problem and a design problem: preventing leakage makes later recovery less difficult.',
        kk: 'Жағалауды тазалау көрінетін қоқысты алып тастап, қоғамға пайдалы болады, бірақ ол барлық жоғары ағыстағы көзді шеше алмайды. Жақсы жүйе бір реттік материалды азайтып, қалдықты сенімді жинап, ластаушының кәріз бен өзенге түсуін тоқтатады. Сондықтан мұхитты қорғау тек тазалау емес, алдын ала дұрыс жүйе құру мәселесі де болып табылады.',
      },
    },
  ],
  deforestation: [
    {
      label: { en: '01 / MORE THAN TREES', kk: '01 / ТЕК АҒАШ ЕМЕС' },
      title: { en: 'A forest is a layered living system.', kk: 'Орман — қабаттардан тұратын тірі жүйе.' },
      body: {
        en: 'A forest includes canopy, smaller plants, soil, fungi, dead wood, water pathways and many interacting species. Removing forest cover changes more than the number of trees. It can change shelter and food for organisms, expose soil, alter shade and moisture, and simplify a network that took a long time to develop. Forest quality therefore matters as much as counting trunks.',
        kk: 'Орманға ағаш төбесі, ұсақ өсімдіктер, топырақ, саңырауқұлақ, қураған ағаш, су жолдары және өзара әрекеттесетін көптеген түр кіреді. Орман жамылғысын жою тек ағаш санын өзгертпейді. Ол ағзалардың қорегі мен панасын, топырақтың қорғанысын, көлеңке мен ылғалды және ұзақ уақыт қалыптасқан байланысты желіні өзгерте алады.',
      },
    },
    {
      label: { en: '02 / CARBON + WATER', kk: '02 / КӨМІРТЕК + СУ' },
      title: { en: 'Forests connect the carbon cycle and the water cycle.', kk: 'Ормандар көміртек айналымы мен су айналымын байланыстырады.' },
      body: {
        en: 'Trees build biomass from carbon taken from the atmosphere, while roots and soils can store additional carbon. Vegetation also intercepts rainfall, shades the ground and moves water back to the air through transpiration. When forest cover changes, these processes change together. The exact effects depend on climate, soil, forest type and what replaces the forest after clearing.',
        kk: 'Ағаштар атмосферадан алынған көміртек арқылы биомасса құрайды, ал тамыр мен топырақ қосымша көміртек сақтай алады. Өсімдік жауынның бір бөлігін ұстап, жерді көлеңкелеп, транспирация арқылы суды ауаға қайтарады. Орман жамылғысы өзгергенде осы процестер бірге өзгереді. Нақты әсер климатқа, топыраққа, орман түріне және орманның орнына не келгеніне тәуелді.',
      },
    },
    {
      label: { en: '03 / RESTORATION', kk: '03 / ҚАЛПЫНА КЕЛТІРУ' },
      title: { en: 'Restoring a forest is not simply planting any tree anywhere.', kk: 'Орманды қалпына келтіру кез келген жерге кез келген ағаш отырғызу емес.' },
      body: {
        en: 'Effective restoration considers native ecosystems, local communities, soil, water, fire risk and the long-term survival of vegetation. Protecting an existing healthy forest can preserve complex habitat that new planting cannot recreate immediately. Planting can still be valuable, but the goal is a functioning ecosystem rather than a short-term tree count or a single photograph of seedlings.',
        kk: 'Тиімді қалпына келтіру жергілікті экожүйені, қауымдастықты, топырақты, суды, өрт қаупін және өсімдіктің ұзақ өмір сүруін ескереді. Бар сау орманды қорғау жаңа отырғызу бірден қайта жасай алмайтын күрделі табиғи ортаны сақтайды. Ағаш отырғызу пайдалы болуы мүмкін, бірақ мақсат — уақытша сан емес, жұмыс істейтін экожүйе.',
      },
    },
  ],
  'water-conservation': [
    {
      label: { en: '01 / USEFUL WATER', kk: '01 / ПАЙДАЛЫ СУ' },
      title: { en: 'Conservation means reducing waste, not refusing essential use.', kk: 'Суды сақтау қажеттіліктен бас тарту емес, ысырапты азайту.' },
      body: {
        en: 'Drinking, hygiene, cooking and sanitation are essential uses of water. Good conservation protects those needs while looking for avoidable losses: taps left running, inefficient routines, leaking fixtures or water used where a lower-water option works just as well. The goal is not the smallest possible number; it is a reliable system that uses water deliberately and efficiently.',
        kk: 'Ішу, гигиена, тамақ дайындау және санитария — судың негізгі қажетті қолданылуы. Дұрыс үнемдеу осы қажеттіліктерді сақтап, ашық қалған кран, тиімсіз әдет, ағып тұрған құрылғы немесе аз су қажет ететін балама бар жағдайдағы артық пайдалануды іздейді. Мақсат ең кішкентай сан емес, суды саналы әрі тиімді қолданатын сенімді жүйе.',
      },
    },
    {
      label: { en: '02 / HIDDEN FLOW', kk: '02 / ЖАСЫРЫН АҒЫН' },
      title: { en: 'Small losses become large when they continue.', kk: 'Кішкентай шығын ұзақ жалғасса, үлкен шығынға айналады.' },
      body: {
        en: 'A leak may look unimportant in a single minute, but continuous flow adds up over hours, days and weeks. This is why observation is powerful: listen for running water, check fixtures, notice unusual use and repair problems early when possible. Conservation often begins with measurement and attention before it begins with complicated technology.',
        kk: 'Ағып кету бір минутта маңызды емес сияқты көрінуі мүмкін, бірақ үздіксіз ағын сағат, күн және апта бойы жиналады. Сондықтан бақылау маңызды: ағып тұрған суды тыңдау, құрылғыларды тексеру, әдеттен тыс тұтынуды байқау және мүмкін болса мәселені ерте жөндеу. Суды сақтау көбіне күрделі технологиядан бұрын өлшеу мен зейіннен басталады.',
      },
    },
    {
      label: { en: '03 / LOCAL CONTEXT', kk: '03 / ЖЕРГІЛІКТІ КОНТЕКСТ' },
      title: { en: 'Water pressure on a system is different from place to place.', kk: 'Су жүйесіне түсетін қысым әр жерде әртүрлі.' },
      body: {
        en: 'Climate, season, infrastructure, population and available sources all shape local water conditions. A useful action in one place may matter less somewhere with a different system. This is why conservation works best when general habits such as fixing leaks and avoiding waste are combined with local guidance about drought, supply conditions and community priorities.',
        kk: 'Климат, маусым, инфрақұрылым, халық саны және қолжетімді су көздері жергілікті жағдайды қалыптастырады. Бір жерде пайдалы әрекет басқа жүйеде азырақ маңызды болуы мүмкін. Сондықтан ағып кетуді жөндеу мен ысырапты азайту сияқты жалпы әдеттерді құрғақшылық, су қоры және қауым басымдығы туралы жергілікті нұсқаулықпен біріктірген дұрыс.',
      },
    },
  ],
  biodiversity: [
    {
      label: { en: '01 / VARIETY', kk: '01 / АЛУАНДЫҚ' },
      title: { en: 'Biodiversity is more than the number of visible species.', kk: 'Биоалуантүрлілік тек көрінетін түрлер саны емес.' },
      body: {
        en: 'Biodiversity includes variation within species, differences among species and the diversity of ecosystems. Two places with the same number of species can still function differently if their habitats, relationships or genetic diversity are different. This wider view helps explain why protecting one famous animal is not enough to protect the whole living system around it.',
        kk: 'Биоалуантүрлілік бір түр ішіндегі генетикалық айырмашылықты, түрлер арасындағы алуандықты және экожүйелердің әртүрлілігін қамтиды. Түр саны бірдей екі жердің табиғи ортасы, байланысы немесе генетикалық алуандықтары өзгеше болса, олардың қызметі де әртүрлі болуы мүмкін. Сондықтан бір танымал жануарды қорғау бүкіл тірі жүйені қорғауға тең емес.',
      },
    },
    {
      label: { en: '02 / RELATIONSHIPS', kk: '02 / БАЙЛАНЫСТАР' },
      title: { en: 'Life works through relationships.', kk: 'Тіршілік байланыстар арқылы жұмыс істейді.' },
      body: {
        en: 'Plants, animals, fungi and microorganisms exchange energy and materials through food webs, decomposition, pollination, competition and cooperation. A change to one population can affect several others, sometimes indirectly. Thinking about relationships helps us understand why habitat quality, timing and connectivity between places can matter as much as the presence of a single species.',
        kk: 'Өсімдіктер, жануарлар, саңырауқұлақтар және микроағзалар қоректік желі, ыдырау, тозаңдану, бәсеке және ынтымақтастық арқылы энергия мен материал алмасады. Бір популяцияның өзгеруі бірнеше басқа ағзаға жанама әсер етуі мүмкін. Байланыстарды ойлау табиғи ортаның сапасы мен орындар арасындағы байланыстылықтың неге маңызды екенін көрсетеді.',
      },
    },
    {
      label: { en: '03 / HABITAT', kk: '03 / ТАБИҒИ ОРТА' },
      title: { en: 'Protecting biodiversity means protecting the conditions life needs.', kk: 'Биоалуантүрлілікті қорғау тіршілікке қажет жағдайды қорғауды білдіреді.' },
      body: {
        en: 'An organism needs more than physical space. It may depend on food, nesting sites, water, seasonal conditions, migration routes or other species. Habitat protection therefore asks whether a place still supports those needs over time. Restoring native vegetation, reducing disturbance and connecting fragmented habitats can all help, but actions should fit the local ecosystem rather than follow one universal recipe.',
        kk: 'Ағзаға тек бос кеңістік жеткіліксіз. Оған қорек, ұя салатын орын, су, маусымдық жағдай, көшу жолы немесе басқа түрлер қажет болуы мүмкін. Сондықтан табиғи ортаны қорғау сол жер осы қажеттіліктерді ұзақ уақыт қамтамасыз ете ала ма деген сұрақ қояды. Жергілікті өсімдікті қалпына келтіру мен бөлінген орталарды байланыстыру көмектесе алады, бірақ әрекет жергілікті экожүйеге сәйкес болуы керек.',
      },
    },
  ],
  'renewable-energy': [
    {
      label: { en: '01 / SOURCE', kk: '01 / ЭНЕРГИЯ КӨЗІ' },
      title: { en: 'Renewable energy starts with flows that are naturally replenished.', kk: 'Жаңартылатын энергия табиғи түрде қайта толығатын ағындардан басталады.' },
      body: {
        en: 'Sunlight, wind and flowing water are examples of energy sources that are continually renewed by natural processes. Technologies such as solar panels and wind turbines convert part of those flows into useful electricity. Renewable does not mean impact-free, however: equipment still requires materials, land, manufacturing, maintenance and decisions about where infrastructure is built.',
        kk: 'Күн сәулесі, жел және ағын су — табиғи процестер арқылы үздіксіз жаңарып отыратын энергия көздері. Күн панелі мен жел турбинасы осы ағындардың бір бөлігін пайдалы электр энергиясына айналдырады. Бірақ жаңартылатын деген әсері жоқ деген сөз емес: жабдыққа материал, жер, өндіріс, қызмет көрсету және инфрақұрылым орнын таңдау қажет.',
      },
    },
    {
      label: { en: '02 / GRID', kk: '02 / ЭЛЕКТР ЖЕЛІСІ' },
      title: { en: 'A clean energy source still has to work inside a reliable system.', kk: 'Таза энергия көзі сенімді жүйенің ішінде жұмыс істеуі керек.' },
      body: {
        en: 'Electricity supply and demand must be coordinated across time. Solar output changes with daylight, and wind output changes with weather. Grids connect many producers and users, while storage, transmission, flexible demand and other resources can help balance changing conditions. This is why energy transition is a systems challenge rather than a competition to find one perfect technology.',
        kk: 'Электр энергиясын өндіру мен тұтыну уақыт бойынша үйлестірілуі керек. Күн энергиясы жарыққа, жел энергиясы ауа райына байланысты өзгереді. Электр желісі көптеген өндіруші мен тұтынушыны байланыстырады, ал сақтау, тасымалдау және икемді сұраныс өзгермелі жағдайды теңестіруге көмектесе алады. Сондықтан энергия ауысуы бір мінсіз технологияны іздеу емес, жүйелік міндет.',
      },
    },
    {
      label: { en: '03 / DEMAND', kk: '03 / СҰРАНЫС' },
      title: { en: 'Efficiency can make the energy problem smaller before new supply is added.', kk: 'Тиімділік жаңа энергия қоспай тұрып мәселенің көлемін азайта алады.' },
      body: {
        en: 'Using less energy for the same useful service can reduce demand on generation, grids and storage. Efficient buildings, devices and routines do not replace the need for clean energy, but they can reduce how much new infrastructure is required. A strong energy strategy therefore looks at both sides of the system: where energy comes from and how intelligently it is used.',
        kk: 'Бірдей пайдалы нәтиже үшін аз энергия қолдану өндіріске, желіге және сақтау жүйесіне түсетін сұранысты азайта алады. Тиімді ғимарат, құрылғы және әдет таза энергия қажеттілігін жоймайды, бірақ жаңа инфрақұрылым көлемін қысқартуы мүмкін. Сондықтан күшті энергия стратегиясы энергияның қайдан келетінін де, қалай ақылды қолданылатынын да қарайды.',
      },
    },
  ],
  'sustainable-consumption': [
    {
      label: { en: '01 / BEFORE PURCHASE', kk: '01 / САТЫП АЛУҒА ДЕЙІН' },
      title: { en: 'The first environmental question can be: do I need a new product?', kk: 'Алғашқы экологиялық сұрақ: маған жаңа өнім шынымен керек пе?' },
      body: {
        en: 'Every new product represents materials, energy, manufacturing and transport before it reaches a user. Sustainable consumption does not mean never buying anything; it means making the decision more deliberate. Borrowing, sharing, repairing or continuing to use a working item can sometimes provide the same service without creating immediate demand for another product.',
        kk: 'Әр жаңа өнім пайдаланушыға жеткенге дейін материал, энергия, өндіріс және тасымалды қамтиды. Жауапты тұтыну ешқашан ештеңе сатып алмау емес; ол шешімді саналы қабылдау. Қарызға алу, бөлісу, жөндеу немесе жұмыс істеп тұрған затты қолдануды жалғастыру кейде жаңа өнімге бірден сұраныс тудырмай-ақ сол қажеттілікті өтей алады.',
      },
    },
    {
      label: { en: '02 / USE PHASE', kk: '02 / ҚОЛДАНУ КЕЗЕҢІ' },
      title: { en: 'How long something stays useful changes its story.', kk: 'Заттың қанша уақыт пайдалы болуы оның бүкіл тарихын өзгертеді.' },
      body: {
        en: 'Durability, maintenance and repair can extend the useful life of many products. Keeping an item longer can delay replacement and reduce demand for new materials, although the best choice depends on the product and how it uses energy or resources during operation. Looking at the whole lifecycle prevents us from judging sustainability only by packaging or a single label.',
        kk: 'Беріктік, қызмет көрсету және жөндеу көптеген өнімнің пайдалы мерзімін ұзарта алады. Затты ұзақ қолдану оны ауыстыруды кейінге қалдырып, жаңа материалға сұранысты азайтуы мүмкін, бірақ ең дұрыс таңдау өнімге және оның пайдалану кезінде энергия мен ресурсты қалай қолданатынына тәуелді. Өмірлік циклді толық қарау тек қаптамаға немесе бір белгіге қарап шешім шығармауға көмектеседі.',
      },
    },
    {
      label: { en: '03 / AFTER USE', kk: '03 / ҚОЛДАНҒАННАН КЕЙІН' },
      title: { en: 'End of use is a design question as well as a consumer question.', kk: 'Қолдану соңы — тұтынушыға ғана емес, дизайнға да қатысты мәселе.' },
      body: {
        en: 'A product is easier to keep in circulation when it can be repaired, reused, disassembled or recovered through a real local system. Consumers can sort and care for items, but producers and infrastructure also shape what is possible. Sustainable consumption therefore connects personal choices with product design, business models and public systems instead of placing the entire responsibility on one person.',
        kk: 'Өнімді жөндеуге, қайта қолдануға, бөлшектеуге немесе нақты жергілікті жүйе арқылы қайта алуға болатын болса, оны айналымда ұстау оңайырақ. Тұтынушы затты сұрыптап, күте алады, бірақ өндіруші мен инфрақұрылым да мүмкіндікті анықтайды. Сондықтан жауапты тұтыну жеке таңдауды өнім дизайнымен, бизнес үлгісімен және қоғамдық жүйемен байланыстырады.',
      },
    },
  ],
};

export type TopicReadingCheckQuestion = {
  prompt: LocalizedText;
  options: [LocalizedText, LocalizedText, LocalizedText];
  correct: 0 | 1 | 2;
  explanation: LocalizedText;
};

export const topicReadingChecks: Record<TopicLab['id'], [TopicReadingCheckQuestion, TopicReadingCheckQuestion, TopicReadingCheckQuestion]> = {
  recycling: [
    {
      prompt: { en: 'Why can reducing an unnecessary purchase be stronger than recycling it later?', kk: 'Неге қажетсіз сатып алуды азайту кейін қайта өңдеуден күштірек болуы мүмкін?' },
      options: [
        { en: 'It avoids material and processing demand before waste exists', kk: 'Қалдық пайда болмай тұрып материал мен өңдеу сұранысын болдырмайды' },
        { en: 'It makes every material biodegradable', kk: 'Барлық материалды биоыдырайтын етеді' },
        { en: 'It removes the need for local rules', kk: 'Жергілікті ережені қажетсіз етеді' },
      ],
      correct: 0,
      explanation: { en: 'Prevention acts earlier in the system, so collection and recycling are not required for material that was never unnecessarily consumed.', kk: 'Алдын алу жүйенің ертерек кезеңінде әсер етеді, сондықтан қажетсіз тұтынылмаған материалды жинау мен қайта өңдеу қажет болмайды.' },
    },
    {
      prompt: { en: 'Why should recycling instructions be checked locally?', kk: 'Неге қайта өңдеу нұсқаулығын жергілікті деңгейде тексеру керек?' },
      options: [
        { en: 'Collection and processing systems differ by place', kk: 'Жинау және өңдеу жүйелері әр жерде әртүрлі' },
        { en: 'All recycling symbols mean exactly the same service', kk: 'Барлық қайта өңдеу белгілері бір қызметті білдіреді' },
        { en: 'Only glass can ever be recovered', kk: 'Тек шыны ғана қайта алынады' },
      ],
      correct: 0,
      explanation: { en: 'A material can be technically recyclable while a particular local collection system still lacks the equipment or pathway to accept it.', kk: 'Материал техникалық тұрғыдан қайта өңделетін болса да, нақты жергілікті жүйеде оны қабылдайтын жабдық немесе жол болмауы мүмкін.' },
    },
    {
      prompt: { en: 'What is the main idea of keeping materials in circulation?', kk: 'Материалды айналымда ұстаудың негізгі идеясы қандай?' },
      options: [
        { en: 'Keep products useful through reuse, repair and suitable recovery', kk: 'Қайта қолдану, жөндеу және сәйкес өңдеу арқылы өнімді пайдалы ұстау' },
        { en: 'Replace products as quickly as possible', kk: 'Өнімдерді мүмкіндігінше тез ауыстыру' },
        { en: 'Mix every waste stream together', kk: 'Барлық қалдық ағынын араластыру' },
      ],
      correct: 0,
      explanation: { en: 'Circulation is about extending useful life and recovering value, rather than treating disposal as the automatic next step after use.', kk: 'Айналым пайдалы мерзімді ұзартуға және құндылықты сақтауға бағытталады, яғни қолданғаннан кейін тастауды автоматты қадам деп қарамайды.' },
    },
  ],
  'ocean-pollution': [
    {
      prompt: { en: 'How can pollution from a street become an ocean problem?', kk: 'Көшедегі ластану қалай мұхит мәселесіне айналуы мүмкін?' },
      options: [
        { en: 'Rain can carry material through drains and rivers toward the coast', kk: 'Жауын суы материалды кәріз бен өзен арқылы жағалауға жеткізе алады' },
        { en: 'Every pollutant immediately turns into seawater', kk: 'Әр ластаушы бірден теңіз суына айналады' },
        { en: 'Only ships can create marine pollution', kk: 'Теңіз ластануын тек кемелер тудырады' },
      ],
      correct: 0,
      explanation: { en: 'Drainage and river networks connect inland places to coasts, so material can travel far beyond the point where it first escaped.', kk: 'Дренаж бен өзен желілері құрлықты жағалаумен байланыстырады, сондықтан материал бастапқы шыққан жерінен алысқа тарай алады.' },
    },
    {
      prompt: { en: 'What does plastic fragmentation change?', kk: 'Пластиктің бөлшектенуі нені өзгертеді?' },
      options: [
        { en: 'Its size, not the fact that the material remains present', kk: 'Материалдың бар болуын емес, оның өлшемін' },
        { en: 'It guarantees the plastic disappears completely', kk: 'Пластиктің толық жоғалуына кепілдік береді' },
        { en: 'It automatically makes the water clean', kk: 'Суды автоматты түрде тазартады' },
      ],
      correct: 0,
      explanation: { en: 'Weathering can break plastic into smaller pieces, but smaller pieces can still persist and become more difficult to see or recover.', kk: 'Ауа райы пластикті ұсақ бөлшекке бөлуі мүмкін, бірақ олар қоршаған ортада сақталып, көру мен жинауды қиындатады.' },
    },
    {
      prompt: { en: 'Why is upstream prevention part of ocean protection?', kk: 'Неге жоғары ағыста алдын алу мұхитты қорғаудың бөлігі?' },
      options: [
        { en: 'Stopping leakage early can be easier than collecting dispersed pollution later', kk: 'Ластануды ерте тоқтату кейін шашыраған қалдықты жинаудан оңай болуы мүмкін' },
        { en: 'Oceans do not move material once it arrives', kk: 'Мұхитқа түскен материал қозғалмайды' },
        { en: 'Beach cleanups can remove every pollution source', kk: 'Жағалау тазалығы барлық ластану көзін жояды' },
      ],
      correct: 0,
      explanation: { en: 'Prevention addresses pollution near its source, before currents and connected waterways can spread it across a much larger area.', kk: 'Алдын алу ластануды оның көзіне жақын жерде тоқтатады, су ағыстары оны үлкен аумаққа таратпай тұрып әсер етеді.' },
    },
  ],
  deforestation: [
    {
      prompt: { en: 'Why is a forest more than a collection of trees?', kk: 'Неге орман тек ағаштар жиынтығы емес?' },
      options: [
        { en: 'It contains layered habitats, soil, water pathways and interacting species', kk: 'Онда қабатты орта, топырақ, су жолдары және өзара әрекеттесетін түрлер бар' },
        { en: 'Every forest contains only one species', kk: 'Әр орманда тек бір түр болады' },
        { en: 'Trees do not interact with soil or water', kk: 'Ағаштар топырақ пен суға әсер етпейді' },
      ],
      correct: 0,
      explanation: { en: 'Forest structure supports many organisms and physical processes, so changing cover can alter several linked parts of the ecosystem at once.', kk: 'Орман құрылымы көптеген ағза мен физикалық процесті қолдайды, сондықтан жамылғы өзгерсе экожүйенің бірнеше байланысқан бөлігі бірге өзгереді.' },
    },
    {
      prompt: { en: 'Which two large cycles are directly connected to forest cover in the reading?', kk: 'Оқылымда орман жамылғысымен тікелей байланысқан екі ірі айналым қайсы?' },
      options: [
        { en: 'Carbon and water', kk: 'Көміртек пен су' },
        { en: 'Sound and magnetism', kk: 'Дыбыс пен магнетизм' },
        { en: 'Moonlight and tides only', kk: 'Тек ай сәулесі мен тасу-қайту' },
      ],
      correct: 0,
      explanation: { en: 'Trees and soils store carbon while vegetation also changes rainfall interception, transpiration, shade and the movement of water through landscapes.', kk: 'Ағаш пен топырақ көміртек сақтайды, ал өсімдік жауынның ұсталуына, транспирацияға, көлеңкеге және судың ландшафт арқылы қозғалуына әсер етеді.' },
    },
    {
      prompt: { en: 'What makes forest restoration stronger than simply counting planted seedlings?', kk: 'Орманды қалпына келтіруді тек отырғызылған көшет санынан күштірек ететін не?' },
      options: [
        { en: 'Considering native ecology, soil, water and long-term survival', kk: 'Жергілікті экология, топырақ, су және ұзақ өмір сүруді ескеру' },
        { en: 'Planting any species anywhere', kk: 'Кез келген түрді кез келген жерге отырғызу' },
        { en: 'Ignoring existing healthy forest', kk: 'Бар сау орманды елемеу' },
      ],
      correct: 0,
      explanation: { en: 'Restoration aims for a functioning ecosystem, so long-term ecological fit matters more than a short-term planting number by itself.', kk: 'Қалпына келтірудің мақсаты жұмыс істейтін экожүйе болғандықтан, ұзақ мерзімді экологиялық сәйкестік қысқа уақыттағы отырғызу санынан маңыздырақ.' },
    },
  ],
  'water-conservation': [
    {
      prompt: { en: 'What does good water conservation protect first?', kk: 'Дұрыс су үнемдеу ең алдымен нені қорғайды?' },
      options: [
        { en: 'Essential drinking, hygiene, cooking and sanitation needs', kk: 'Ішу, гигиена, тамақ дайындау және санитария сияқты негізгі қажеттіліктерді' },
        { en: 'The smallest possible usage number at any cost', kk: 'Қандай жағдай болса да ең кішкентай тұтыну санын' },
        { en: 'Only decorative water use', kk: 'Тек сәндік су қолдануды' },
      ],
      correct: 0,
      explanation: { en: 'Conservation is about removing avoidable waste while keeping essential water uses safe, reliable and available for people who need them.', kk: 'Суды сақтау қажетсіз ысырапты азайтады, бірақ адамдарға керек негізгі су қолдануын қауіпсіз әрі қолжетімді күйде сақтайды.' },
    },
    {
      prompt: { en: 'Why can a small leak deserve attention?', kk: 'Неге кішкентай ағып кетуге назар аудару керек?' },
      options: [
        { en: 'Continuous flow accumulates over long periods', kk: 'Үздіксіз ағын ұзақ уақыт бойы жиналады' },
        { en: 'Leaks always improve efficiency', kk: 'Ағып кету әрқашан тиімділікті арттырады' },
        { en: 'Water stops flowing after one minute', kk: 'Су бір минуттан кейін өзі тоқтайды' },
      ],
      correct: 0,
      explanation: { en: 'A small rate can become meaningful waste when it continues for hours or days, which makes early observation and repair useful.', kk: 'Кішкентай ағын сағат немесе күн бойы жалғасса елеулі ысырапқа айналады, сондықтан ерте байқап жөндеу пайдалы.' },
    },
    {
      prompt: { en: 'Why should conservation advice include local context?', kk: 'Неге су үнемдеу кеңесі жергілікті контексті ескеруі керек?' },
      options: [
        { en: 'Climate, infrastructure and supply conditions differ by place', kk: 'Климат, инфрақұрылым және су қоры әр жерде әртүрлі' },
        { en: 'Every community has exactly the same water system', kk: 'Әр қауымдастықта су жүйесі бірдей' },
        { en: 'Season never affects water availability', kk: 'Маусым су қолжетімділігіне әсер етпейді' },
      ],
      correct: 0,
      explanation: { en: 'Local drought, infrastructure and available sources change which actions matter most, even when avoiding obvious waste remains broadly useful.', kk: 'Жергілікті құрғақшылық, инфрақұрылым және су көздері қай әрекет маңызды екенін өзгертеді, ал айқын ысырапты азайту жалпы пайдалы болып қалады.' },
    },
  ],
  biodiversity: [
    {
      prompt: { en: 'Which statement best describes biodiversity?', kk: 'Биоалуантүрлілікті қай тұжырым жақсы сипаттайды?' },
      options: [
        { en: 'Variation within species, among species and across ecosystems', kk: 'Түр ішіндегі, түрлер арасындағы және экожүйелердегі алуандық' },
        { en: 'Only the number of large animals', kk: 'Тек ірі жануарлардың саны' },
        { en: 'Only how green a landscape looks', kk: 'Тек ландшафттың қаншалық жасыл көрінуі' },
      ],
      correct: 0,
      explanation: { en: 'Biodiversity works at multiple levels, which is why a simple species count alone cannot describe the full variety of living systems.', kk: 'Биоалуантүрлілік бірнеше деңгейде қаралады, сондықтан тек түр санын есептеу тірі жүйенің толық алуанын сипаттай алмайды.' },
    },
    {
      prompt: { en: 'Why are ecological relationships important?', kk: 'Неге экологиялық байланыстар маңызды?' },
      options: [
        { en: 'A change in one population can indirectly affect other parts of the network', kk: 'Бір популяцияның өзгеруі желінің басқа бөліктеріне жанама әсер етуі мүмкін' },
        { en: 'Every species lives independently', kk: 'Әр түр толық тәуелсіз өмір сүреді' },
        { en: 'Food webs contain no material or energy flow', kk: 'Қоректік желіде материал мен энергия ағыны жоқ' },
      ],
      correct: 0,
      explanation: { en: 'Food webs, pollination, decomposition and competition connect organisms, so effects can propagate through relationships rather than stay isolated.', kk: 'Қоректік желі, тозаңдану, ыдырау және бәсеке ағзаларды байланыстырады, сондықтан әсер бір жерде қалып қоймай желі арқылы тарай алады.' },
    },
    {
      prompt: { en: 'What does habitat protection need to preserve?', kk: 'Табиғи ортаны қорғау нені сақтауы керек?' },
      options: [
        { en: 'The conditions and connections organisms need over time', kk: 'Ағзаларға ұзақ уақыт қажет жағдайлар мен байланыстарды' },
        { en: 'Only an empty physical area', kk: 'Тек бос физикалық аумақты' },
        { en: 'One universal recipe for every ecosystem', kk: 'Әр экожүйеге бір әмбебап рецептті' },
      ],
      correct: 0,
      explanation: { en: 'Food, shelter, water, seasonal conditions and movement routes can all matter, so habitat quality is broader than simply setting aside space.', kk: 'Қорек, пана, су, маусымдық жағдай және қозғалыс жолдары маңызды болуы мүмкін, сондықтан табиғи орта сапасы жай ғана аумақ бөлуден кеңірек.' },
    },
  ],
  'renewable-energy': [
    {
      prompt: { en: 'What does “renewable” describe in an energy source?', kk: 'Энергия көзіндегі «жаңартылатын» сөзі нені сипаттайды?' },
      options: [
        { en: 'The natural flow is replenished on human timescales', kk: 'Табиғи ағын адам өмірі ауқымында қайта толығады' },
        { en: 'The technology has no material impact at all', kk: 'Технологияның мүлде материалдық әсері жоқ' },
        { en: 'The electricity is stored forever', kk: 'Электр энергиясы мәңгі сақталады' },
      ],
      correct: 0,
      explanation: { en: 'Renewable describes the source flow, while the equipment that captures it still has material, manufacturing, land and maintenance requirements.', kk: 'Жаңартылатын ұғымы энергия ағынын сипаттайды, ал оны пайдаланатын жабдыққа бәрібір материал, өндіріс, жер және қызмет көрсету қажет.' },
    },
    {
      prompt: { en: 'Why are grids and storage discussed with wind and solar?', kk: 'Неге жел мен күн энергиясымен бірге желі мен сақтау қарастырылады?' },
      options: [
        { en: 'Supply changes with conditions and must be coordinated with demand', kk: 'Өндіріс жағдайға қарай өзгеріп, сұраныспен үйлестірілуі керек' },
        { en: 'Electricity demand never changes', kk: 'Электрге сұраныс ешқашан өзгермейді' },
        { en: 'Each home must operate as an isolated power system', kk: 'Әр үй толық бөлек энергия жүйесі болуы керек' },
      ],
      correct: 0,
      explanation: { en: 'Networks, storage and flexible demand help coordinate variable generation with when and where electricity is actually needed.', kk: 'Желі, сақтау және икемді сұраныс өзгермелі өндірісті электр энергиясы нақты қажет болатын уақыт пен орынға сәйкестендіруге көмектеседі.' },
    },
    {
      prompt: { en: 'How can efficiency support an energy transition?', kk: 'Тиімділік энергия ауысуына қалай көмектесе алады?' },
      options: [
        { en: 'It can reduce the energy needed for the same useful service', kk: 'Бірдей пайдалы нәтиже үшін қажет энергияны азайта алады' },
        { en: 'It makes clean generation unnecessary in every case', kk: 'Барлық жағдайда таза энергия өндірісін қажетсіз етеді' },
        { en: 'It increases demand by definition', kk: 'Анықтама бойынша сұранысты арттырады' },
      ],
      correct: 0,
      explanation: { en: 'Lower demand can reduce pressure on generation, transmission and storage, while clean supply is still needed for the energy that remains.', kk: 'Төмен сұраныс өндіріске, тасымалдауға және сақтауға түсетін қысымды азайтады, ал қалған энергия үшін таза көздер бәрібір қажет.' },
    },
  ],
  'sustainable-consumption': [
    {
      prompt: { en: 'What can be a useful question before buying a new product?', kk: 'Жаңа өнім сатып алар алдында қандай пайдалы сұрақ қоюға болады?' },
      options: [
        { en: 'Can an existing, shared or repaired item meet the same need?', kk: 'Бар, ортақ немесе жөнделген зат сол қажеттілікті өтей ала ма?' },
        { en: 'How quickly can I replace a working item?', kk: 'Жұмыс істейтін затты қаншалық тез ауыстыра аламын?' },
        { en: 'Can I ignore the materials completely?', kk: 'Материалды толық елемеуге бола ма?' },
      ],
      correct: 0,
      explanation: { en: 'Avoiding an unnecessary replacement can delay new material and manufacturing demand while still providing the useful service a person needs.', kk: 'Қажетсіз ауыстырудан бас тарту жаңа материал мен өндіріс сұранысын кейінге қалдырып, адамға керек қызметті бәрібір қамтамасыз ете алады.' },
    },
    {
      prompt: { en: 'Why does product durability matter?', kk: 'Неге өнімнің беріктігі маңызды?' },
      options: [
        { en: 'Longer useful life can delay replacement', kk: 'Ұзақ пайдалы мерзім ауыстыруды кейінге қалдырады' },
        { en: 'Durable products never need maintenance', kk: 'Берік өнімге ешқашан қызмет көрсету керек емес' },
        { en: 'It guarantees zero environmental impact', kk: 'Ол нөлдік экологиялық әсерге кепілдік береді' },
      ],
      correct: 0,
      explanation: { en: 'Maintenance and repair can keep many products useful for longer, which can reduce the frequency of replacement and associated new production.', kk: 'Қызмет көрсету мен жөндеу көптеген өнімді ұзақ уақыт пайдалы ұстап, ауыстыру жиілігін және жаңа өндіріс қажеттілігін азайта алады.' },
    },
    {
      prompt: { en: 'Why is end-of-use responsibility shared?', kk: 'Неге қолдану соңындағы жауапкершілік ортақ?' },
      options: [
        { en: 'Consumers, product design and infrastructure all shape what can be reused or recovered', kk: 'Тұтынушы, өнім дизайны және инфрақұрылым қайта қолдану мен өңдеу мүмкіндігін бірге анықтайды' },
        { en: 'Only one individual controls the whole material system', kk: 'Бүкіл материал жүйесін тек бір адам басқарады' },
        { en: 'Product design has no effect after sale', kk: 'Сатылғаннан кейін өнім дизайнының әсері жоқ' },
      ],
      correct: 0,
      explanation: { en: 'Repairability, collection systems and recovery infrastructure are designed around the user, so sustainable outcomes cannot depend on personal behaviour alone.', kk: 'Жөндеу мүмкіндігі, жинау жүйесі және өңдеу инфрақұрылымы пайдаланушыдан тыс құрылады, сондықтан тұрақты нәтиже тек жеке мінез-құлыққа тәуелді бола алмайды.' },
    },
  ],
};
