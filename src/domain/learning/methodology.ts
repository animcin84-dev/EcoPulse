import { lessonSequence } from '../../content/index.ts';
import { scienceSources } from '../../content/science-sources.ts';
import { educationalMedia } from '../../content/media-assets.ts';
import { knowledgeGraph } from '../../content/knowledge-graph.ts';

export type MethodologyLocale = 'en' | 'kk';
export type MethodStageId = 'learn' | 'understand' | 'connect' | 'think' | 'act' | 'review' | 'master';
export type MasteryEvidenceId = 'recognition' | 'recall' | 'context' | 'delayedReview';

export type MethodologySnapshot = {
  worlds: number;
  lessons: number;
  relationTypes: number;
  scienceSources: number;
  mediaAssets: number;
};

export const methodologyCopy = {
  en: {
    hero: {
      eyebrow: 'Method / evidence',
      title: 'How EcoPulse\nworks.',
      body: 'EcoPulse is designed as a learning system, not a vocabulary list. English, environmental science, systems thinking, small real-world actions and spaced review are connected into one transparent learning loop.',
      primary: 'Start your pulse →',
      secondary: 'Explore the knowledge map',
    },
    proof: {
      eyebrow: 'Current MVP / authored system',
      worlds: 'connected worlds',
      lessons: 'versioned lessons',
      relations: 'semantic relation types',
      sources: 'official science sources',
      media: 'institutional media assets',
    },
    flow: {
      eyebrow: 'Learning architecture / 01',
      title: 'From a word\nto a system.',
      body: 'Every stage has a different job. Recognition is useful, but EcoPulse keeps moving until the learner can connect, use and revisit the idea.',
      stages: [
        { id: 'learn', title: 'Learn', body: 'Meet the English term, pronunciation and a clear definition.' },
        { id: 'understand', title: 'Understand', body: 'See the concept in an image, sentence or simple explanation.' },
        { id: 'connect', title: 'Connect', body: 'Place the concept inside a relationship instead of memorising it alone.' },
        { id: 'think', title: 'Think', body: 'Use evidence, context and trade-offs to reason about a situation.' },
        { id: 'act', title: 'Act', body: 'Take an optional, safe observation mission beyond the screen.' },
        { id: 'review', title: 'Review', body: 'Return through spaced recall, context and recognition over time.' },
        { id: 'master', title: 'Master', body: 'Build multiple kinds of evidence before a word is considered mastered.' },
      ] as const,
    },
    mastery: {
      eyebrow: 'Mastery / evidence, not points',
      title: 'XP shows activity.\nEvidence shows learning.',
      body: 'Pulse XP tracks activity progression, but it is not a knowledge score. Vocabulary mastery is derived from evidence: recognition, recall, context use and a delayed review must accumulate across time.',
      evidence: [
        { id: 'recognition', title: 'Recognize', body: 'Identify the term or meaning when alternatives are visible.' },
        { id: 'recall', title: 'Recall', body: 'Produce the English word without seeing the answer first.' },
        { id: 'context', title: 'Context', body: 'Use or recover the word inside a meaningful sentence.' },
        { id: 'delayedReview', title: 'Delayed review', body: 'Show the knowledge again after time has passed.' },
      ] as const,
      note: 'Repeated easy recognition alone cannot create STRONG or MASTERED status.',
    },
    science: {
      eyebrow: 'Science integrity / 02',
      title: 'Connections have\nprecise meanings.',
      body: 'EcoPulse does not treat every arrow as “A causes B.” Authored relations distinguish causes, contributes to, affects, part of, related to, depends on, example of and absorbed by. Science-heavy lessons point to official sources for the claims they teach.',
      sourceTitle: 'Source policy',
      sourceItems: [
        'A science-heavy lesson must reference an authored official source.',
        'Source coverage is tied to the lesson claim, not added as decoration.',
        'Each source records when it was last checked.',
        'Simplified explanations must not turn risk or contribution into deterministic causation.',
      ],
      checked: 'Last checked',
    },
    privacy: {
      eyebrow: 'Action without surveillance / 03',
      title: 'Small actions.\nMinimal data.',
      body: 'The learning loop can extend into the real world without making observation intrusive. EcoPulse keeps the MVP guest-first and avoids collecting data that the learning task does not need.',
      items: [
        'Eco Missions are optional.',
        'No GPS is required for a mission.',
        'No photo is required as proof.',
        'Mission reflections stay in the local guest learning snapshot unless an account sync is explicitly introduced later.',
        'Learners can export their local learning data and reset progress themselves.',
      ],
    },
    accessibility: {
      eyebrow: 'Resilient learning / 04',
      title: 'The lesson survives\nwithout the spectacle.',
      body: 'Media and motion support the explanation, but they are never the only way to understand it. The core interaction remains usable by keyboard, touch and reduced-motion or reduced-data preferences.',
      items: [
        'Ordering tasks have non-drag controls.',
        'Correct and incorrect states are not communicated by color alone.',
        'Audio is user-triggered; there is no autoplay pronunciation.',
        'Institutional images include bilingual alt text, visible credit and an authored diagram fallback.',
        'Reduced Data can suppress remote image requests entirely.',
        'Reduced Motion preserves the information while removing non-essential motion.',
      ],
    },
    final: {
      eyebrow: 'The design principle',
      title: 'You do not learn\na word list.\nYou learn a system.',
      body: 'That is the standard every new EcoPulse world, lesson, connection, mission and review item has to preserve.',
      primary: 'Start learning →',
      secondary: 'Explore connections →',
    },
  },
  kk: {
    hero: {
      eyebrow: 'Әдіс / дәлел',
      title: 'EcoPulse\nқалай жұмыс істейді.',
      body: 'EcoPulse сөздер тізімі емес, тұтас оқу жүйесі ретінде жасалған. Ағылшын тілі, экологиялық ғылым, жүйелік ойлау, шағын нақты әрекеттер және интервалдық қайталау бір ашық оқу цикліне біріктірілген.',
      primary: 'Pulse-ыңды бастау →',
      secondary: 'Білім картасын зерттеу',
    },
    proof: {
      eyebrow: 'Қазіргі MVP / дайын жүйе',
      worlds: 'байланысқан әлем',
      lessons: 'нұсқаланған сабақ',
      relations: 'мағыналық байланыс түрі',
      sources: 'ресми ғылыми дереккөз',
      media: 'институционалдық медиа',
    },
    flow: {
      eyebrow: 'Оқу архитектурасы / 01',
      title: 'Сөзден\nжүйеге дейін.',
      body: 'Әр кезеңнің өз міндеті бар. Сөзді тану маңызды, бірақ EcoPulse оқушы ұғымды байланыстырып, қолданып және кейін қайта еске түсіргенге дейін жалғастырады.',
      stages: [
        { id: 'learn', title: 'Үйрен', body: 'Ағылшын терминімен, айтылуымен және анықтамасымен таныс.' },
        { id: 'understand', title: 'Түсін', body: 'Ұғымды сурет, сөйлем немесе қарапайым түсіндірме арқылы көр.' },
        { id: 'connect', title: 'Байланыстыр', body: 'Ұғымды жеке жаттамай, басқа ұғымдармен қатынасына орналастыр.' },
        { id: 'think', title: 'Ойлан', body: 'Жағдайды талдау үшін дәлелді, контексті және таңдаулардың салдарын қолдан.' },
        { id: 'act', title: 'Әрекет ет', body: 'Экраннан тыс қауіпсіз және міндетті емес бақылау миссиясын орында.' },
        { id: 'review', title: 'Қайтала', body: 'Уақыт өте еске түсіру, контекст және тану арқылы қайта орал.' },
        { id: 'master', title: 'Меңгер', body: 'Сөз меңгерілді деп саналмай тұрып бірнеше түрлі дәлел жина.' },
      ] as const,
    },
    mastery: {
      eyebrow: 'Mastery / ұпай емес, дәлел',
      title: 'XP белсенділікті көрсетеді.\nДәлел — үйренуді.',
      body: 'Pulse XP белсенділік прогресін көрсетеді, бірақ білім бағасы емес. Сөзді меңгеру нақты дәлелден құралады: тану, еске түсіру, контексте қолдану және кейінгі қайталау уақыт өте жиналуы керек.',
      evidence: [
        { id: 'recognition', title: 'Тану', body: 'Жауап нұсқалары көрініп тұрғанда терминді немесе мағынаны анықтау.' },
        { id: 'recall', title: 'Еске түсіру', body: 'Дұрыс жауапты алдын ала көрмей ағылшын сөзін жазу.' },
        { id: 'context', title: 'Контекст', body: 'Сөзді мағыналы сөйлем ішінде қолдану немесе еске түсіру.' },
        { id: 'delayedReview', title: 'Кейінгі қайталау', body: 'Уақыт өткеннен кейін білімді қайта көрсету.' },
      ] as const,
      note: 'Бірдей жеңіл тану тапсырмаларын қайталау ғана STRONG немесе MASTERED мәртебесін бермейді.',
    },
    science: {
      eyebrow: 'Ғылыми дәлдік / 02',
      title: 'Әр байланыстың\nнақты мағынасы бар.',
      body: 'EcoPulse әр жебені “A міндетті түрде B-ні тудырады” деп түсіндірмейді. Байланыстар себеп болады, ықпал етеді, әсер етеді, бөлігі, байланысты, тәуелді, мысалы және сіңіріледі сияқты нақты мағыналарды ажыратады. Ғылыми мазмұны бар сабақтар үйретілетін тұжырымдарға ресми дереккөздер береді.',
      sourceTitle: 'Дереккөз саясаты',
      sourceItems: [
        'Ғылыми мазмұны бар сабақта дайын ресми дереккөз болуы керек.',
        'Дереккөз сабақтағы нақты ғылыми тұжырыммен байланысады, жай безендіру үшін қосылмайды.',
        'Әр дереккөздің соңғы тексерілген күні сақталады.',
        'Қарапайым түсіндірме ықтималдықты немесе үлесті міндетті себеп-салдарға айналдырмауы керек.',
      ],
      checked: 'Соңғы тексеру',
    },
    privacy: {
      eyebrow: 'Бақылаусыз әрекет / 03',
      title: 'Шағын әрекет.\nМинималды дерек.',
      body: 'Оқу циклі нақты өмірге шыға алады, бірақ бақылауды жеке кеңістікке қол сұғатын әрекетке айналдырмайды. MVP қонақ режимін негізгі етеді және оқу тапсырмасына қажет емес деректерді жинамайды.',
      items: [
        'Eco Mission тапсырмалары міндетті емес.',
        'Миссия үшін GPS қажет емес.',
        'Дәлел ретінде фото талап етілмейді.',
        'Аккаунт синхрондауы кейін арнайы енгізілмесе, миссия рефлексиялары құрылғыдағы жергілікті оқу snapshot-ында қалады.',
        'Оқушы жергілікті оқу деректерін өзі экспорттап, прогресті өзі өшіре алады.',
      ],
    },
    accessibility: {
      eyebrow: 'Тұрақты оқу / 04',
      title: 'Сабақ әсерсіз де\nжұмыс істеуі керек.',
      body: 'Медиа мен қозғалыс түсіндіруге көмектеседі, бірақ ақпараттың жалғыз жолы емес. Негізгі әрекеттер пернетақта, touch, reduced-motion және reduced-data режимдерінде де жұмыс істейді.',
      items: [
        'Реттеу тапсырмалары drag-қа тәуелді емес.',
        'Дұрыс және қате күй тек түспен берілмейді.',
        'Аудио тек пайдаланушы басқанда ойнайды; autoplay жоқ.',
        'Институционалдық суреттерде қазақша/ағылшынша alt, көрінетін credit және авторлық diagram fallback бар.',
        'Reduced Data сыртқы сурет сұрауларын толық тоқтата алады.',
        'Reduced Motion ақпаратты сақтап, қажет емес қозғалысты алып тастайды.',
      ],
    },
    final: {
      eyebrow: 'Негізгі дизайн қағидасы',
      title: 'Сен сөздер\nтізімін емес,\nжүйені үйренесің.',
      body: 'Әр жаңа EcoPulse әлемі, сабағы, байланысы, миссиясы және қайталау тапсырмасы осы стандартты сақтауы керек.',
      primary: 'Оқуды бастау →',
      secondary: 'Байланыстарды зерттеу →',
    },
  },
} as const;

export function resolveMethodologySnapshot(): MethodologySnapshot {
  return {
    worlds: new Set(lessonSequence.map((lesson) => lesson.world)).size,
    lessons: lessonSequence.length,
    relationTypes: new Set(knowledgeGraph.relations.map((relation) => relation.type)).size,
    scienceSources: scienceSources.length,
    mediaAssets: educationalMedia.length,
  };
}
