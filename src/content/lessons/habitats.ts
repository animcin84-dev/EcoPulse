import type { Lesson } from '../../domain/content/types.ts';
import { readingStepsByLessonSlug } from '../reading-steps.ts';
import { listeningStepsByLessonSlug } from '../listening-steps.ts';

export const habitatsLesson: Lesson = {
  id: 'lesson-habitats', slug: 'habitats', version: '1.2.0', world: 'life',
  title: { en: 'A Place to Live', kk: 'Тіршілік ететін орта' }, estimatedMinutes: 8,
  targetWords: ['habitat', 'ecosystem'],
  sourceIds: ['usgs-ecosystems'],
  steps: [
    { id: 'discover-habitat', type: 'discover', title: { en: 'HABITAT', kk: 'ТАБИҒИ ОРТА' }, body: { en: 'The natural place where an organism lives.', kk: 'Ағза өмір сүретін табиғи орта.' } },
    { id: 'meaning-habitat', type: 'choice', title: { en: 'Quick Pulse', kk: 'Жылдам тексеру' }, prompt: { en: 'What does habitat mean?', kk: 'Habitat сөзі нені білдіреді?' }, options: [
      { id: 'home', label: { en: 'The natural place where an organism lives', kk: 'Ағза өмір сүретін табиғи орта' } },
      { id: 'gas', label: { en: 'A gas in the air', kk: 'Ауадағы газ' } },
      { id: 'plastic', label: { en: 'Plastic in the ocean', kk: 'Мұхиттағы пластик' } },
    ], correctOptionId: 'home', masterySignals: [{ word: 'habitat', signal: 'recognition' }], hint: { en: 'Think about the natural home of a plant or animal.', kk: 'Өсімдік немесе жануардың табиғи үйін ойла.' }, explanation: { en: 'A habitat is the natural place an organism lives and finds what it needs.', kk: 'Табиғи орта — ағза өмір сүріп, қажетті ресурстарды табатын табиғи орын.' }, xp: 5 },
    {
      id: 'match-life-concepts',
      type: 'matching',
      title: { en: 'Match the System', kk: 'Жүйені сәйкестендір' },
      prompt: { en: 'Match each ecology word to its meaning.', kk: 'Әр экология сөзін оның мағынасымен сәйкестендір.' },
      pairs: [
        { id: 'habitat', left: { en: 'HABITAT', kk: 'HABITAT' }, right: { en: 'The natural place where an organism lives', kk: 'Ағза өмір сүретін табиғи орта' } },
        { id: 'species', left: { en: 'SPECIES', kk: 'SPECIES' }, right: { en: 'A group of living organisms of the same kind', kk: 'Бір түрге жататын тірі ағзалар тобы' } },
        { id: 'ecosystem', left: { en: 'ECOSYSTEM', kk: 'ECOSYSTEM' }, right: { en: 'Living things and their environment interacting as a system', kk: 'Тірі ағзалар мен қоршаған ортаның бір жүйе ретінде өзара әрекеттесуі' } },
      ],
      masterySignals: [{ word: 'habitat', signal: 'context' }, { word: 'ecosystem', signal: 'context' }],
      explanation: { en: 'Habitat, species and ecosystem describe different levels of a living system.', kk: 'Habitat, species және ecosystem тірі жүйенің әртүрлі деңгейлерін сипаттайды.' },
      xp: 10,
    },
    { id: 'connection-habitat-ecosystem', type: 'connection', title: { en: 'Nature becomes a network', kk: 'Табиғат желіге айналады' }, body: { en: 'Habitats are parts of ecosystems, where living organisms and environmental conditions interact.', kk: 'Табиғи орталар экожүйелердің бөлігі, онда тірі ағзалар мен қоршаған орта жағдайлары өзара әрекеттеседі.' }, relations: [
      { from: 'habitat', to: 'ecosystem', type: 'part_of', label: { en: 'habitats are parts of ecosystems', kk: 'табиғи орталар экожүйенің бөліктері' } },
      { from: 'ecosystem', to: 'biodiversity', type: 'related_to', label: { en: 'ecosystems contain diverse living things', kk: 'экожүйелерде әртүрлі тіршілік иелері болады' } },
    ] },
    readingStepsByLessonSlug['habitats'],
    listeningStepsByLessonSlug['habitats'],
    { id: 'think-wetland', type: 'think', title: { en: 'Think / Living System', kk: 'Ойлан / Тірі жүйе' }, prompt: { en: 'A wetland is drained. Several species depended on it. What could happen?', kk: 'Батпақты жер құрғатылды. Бірнеше түр оған тәуелді еді. Не болуы мүмкін?' }, options: [
      { id: 'loss', label: { en: 'Some organisms may lose habitat and resources they need.', kk: 'Кейбір ағзалар табиғи ортасы мен қажетті ресурстарынан айырылуы мүмкін.' } },
      { id: 'nothing', label: { en: 'No organism can be affected by habitat change.', kk: 'Табиғи ортаның өзгерісі ешбір ағзаға әсер етпейді.' } },
      { id: 'continents', label: { en: 'The number of continents changes.', kk: 'Материктердің саны өзгереді.' } },
    ], bestOptionId: 'loss', explanation: { en: 'Habitat change can affect food, water, shelter and space available to organisms.', kk: 'Табиғи ортаның өзгеруі ағзаларға қолжетімді азық, су, баспана және кеңістікке әсер етуі мүмкін.' }, extensionPrompt: { en: 'Explain in one English sentence one way habitat change can affect an ecosystem.', kk: 'Табиғи ортаның өзгеруі экожүйеге қалай әсер ете алатынының бір жолын бір ағылшын сөйлемімен түсіндір.' }, xp: 15 },
    { id: 'result-habitats', type: 'result', title: { en: 'Living Network Connected', kk: 'Тірі желі байланыстырылды' }, body: { en: 'You moved from a simple word chain toward systems thinking: habitats exist within interacting ecosystems.', kk: 'Сен қарапайым сөз тізбегінен жүйелік ойлауға өттің: табиғи орталар өзара әрекеттесетін экожүйелердің ішінде болады.' } },
  ],
};
