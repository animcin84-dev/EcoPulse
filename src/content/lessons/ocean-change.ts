import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const oceanChangeLesson: Lesson = {
  id: 'lesson-ocean-change', slug: 'ocean-change', version: '1.2.0', world: 'life',
  title: { en: 'A Changing Ocean', kk: 'Өзгеріп жатқан мұхит' }, estimatedMinutes: 9,
  targetWords: ['acidic', 'ocean'],
  sourceIds: ['noaa-ocean-acidification'],
  steps: [
    { id: 'discover-acidic', type: 'discover', title: { en: 'ACIDIC', kk: 'ҚЫШҚЫЛДЫ' }, body: { en: 'Having acidic chemical properties. In ocean science, seawater can become more acidic as pH decreases.', kk: 'Қышқылдық химиялық қасиеттері бар. Мұхит ғылымында pH төмендегенде теңіз суы қышқылдырақ бола алады.' } },
    { id: 'meaning-acidic', type: 'choice', title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' }, prompt: { en: 'What does acidic mean?', kk: 'Acidic сөзі нені білдіреді?' }, options: [
      { id: 'acidic', label: { en: 'Acidic', kk: 'Қышқылды' } },
      { id: 'salty', label: { en: 'Salty', kk: 'Тұзды' } },
      { id: 'icy', label: { en: 'Icy', kk: 'Мұзды' } },
    ], correctOptionId: 'acidic', masterySignals: [{ word: 'acidic', signal: 'recognition' }], hint: { en: 'This is a chemistry word, not a word for salt or ice.', kk: 'Бұл тұз немесе мұз емес, химияға қатысты сөз.' }, explanation: { en: 'Acidic describes acid-related chemical properties.', kk: 'Acidic қышқылдық химиялық қасиеттерді сипаттайды.' }, xp: 5 },
    { id: 'connection-ocean-acidification', type: 'connection', title: { en: 'An important chemical connection', kk: 'Маңызды химиялық байланыс' }, body: { en: 'The ocean absorbs some carbon dioxide from the atmosphere. This can change seawater chemistry and make it more acidic. Ocean acidification does not mean the ocean becomes literal acid.', kk: 'Мұхит атмосферадан көмірқышқыл газының бір бөлігін сіңіреді. Бұл теңіз суының химиясын өзгертіп, оны қышқылдырақ ете алады. Мұхиттың қышқылдануы мұхит нағыз қышқылға айналады дегенді білдірмейді.' }, relations: [
      { from: 'carbon-dioxide', to: 'ocean', type: 'absorbed_by', label: { en: 'some carbon dioxide is absorbed by the ocean', kk: 'көмірқышқыл газының бір бөлігі мұхитқа сіңеді' } },
      { from: 'ocean', to: 'more-acidic-seawater', type: 'related_to', label: { en: 'chemistry can shift toward more acidic conditions', kk: 'химиялық жағдай қышқылдырақ бағытқа өзгеруі мүмкін' } },
      { from: 'more-acidic-seawater', to: 'marine-ecosystem', type: 'affects', label: { en: 'chemical change can affect marine organisms', kk: 'химиялық өзгеріс теңіз ағзаларына әсер етуі мүмкін' } },
    ] },
    readingStepsByLessonSlug['ocean-change'],
    listeningStepsByLessonSlug['ocean-change'],
    { id: 'think-ocean-wording', type: 'think', title: { en: 'Think / Scientific Language', kk: 'Ойлан / Ғылыми тіл' }, prompt: { en: 'Which explanation is more accurate?', kk: 'Қай түсіндіру дәлірек?' }, options: [
      { id: 'accurate', label: { en: 'Seawater becomes more acidic as pH decreases.', kk: 'pH төмендегенде теңіз суы қышқылдырақ болады.' } },
      { id: 'acid', label: { en: 'The entire ocean becomes literal acid.', kk: 'Бүкіл мұхит нағыз қышқылға айналады.' } },
      { id: 'freeze', label: { en: 'Acidification means the ocean freezes.', kk: 'Қышқылдану мұхиттың қатуын білдіреді.' } },
    ], bestOptionId: 'accurate', explanation: { en: 'Ocean acidification describes a decrease in pH and increasing acidity; seawater remains on the alkaline side of neutral.', kk: 'Мұхиттың қышқылдануы pH төмендеуін және қышқылдықтың өсуін сипаттайды; теңіз суы бейтараптан сілтілі жақта қалады.' }, extensionPrompt: { en: 'Explain in one English sentence why “more acidic” does not mean the ocean becomes literal acid.', kk: '“More acidic” неліктен мұхит тура мағынада қышқылға айналады дегенді білдірмейтінін бір ағылшын сөйлемімен түсіндір.' }, xp: 15 },
    { id: 'result-ocean-change', type: 'result', title: { en: 'Ocean Connection Complete', kk: 'Мұхит байланысы аяқталды' }, body: { en: 'You used careful scientific language to connect atmosphere, carbon dioxide, ocean chemistry and marine ecosystems.', kk: 'Сен атмосфераны, көмірқышқыл газын, мұхит химиясын және теңіз экожүйелерін ғылыми тілмен байланыстырдың.' } },
  ],
};
