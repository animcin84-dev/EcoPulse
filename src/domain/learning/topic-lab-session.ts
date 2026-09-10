export type TopicLabSessionScores = {
  reading: number;
  words: number;
  system: number;
};

export type TopicLabSessionFocus = {
  id: 'reading' | 'words' | 'system' | 'advance';
  href: string;
  label: { en: string; kk: string };
  note: { en: string; kk: string };
};

const focusBySignal: Record<'reading' | 'words' | 'system', TopicLabSessionFocus> = {
  reading: {
    id: 'reading',
    href: '#reading',
    label: { en: 'Re-read the system story', kk: 'Жүйелік мәтінді қайта оқы' },
    note: { en: 'Reading retrieval is the weakest signal in this session.', kk: 'Оқуды еске түсіру — осы сессиядағы ең әлсіз сигнал.' },
  },
  words: {
    id: 'words',
    href: '#words',
    label: { en: 'Strengthen the four words', kk: 'Төрт сөзді күшейт' },
    note: { en: 'Vocabulary recall is the weakest signal in this session.', kk: 'Сөздерді еске түсіру — осы сессиядағы ең әлсіз сигнал.' },
  },
  system: {
    id: 'system',
    href: '#system-check',
    label: { en: 'Rebuild the system links', kk: 'Жүйелік байланыстарды қайта құр' },
    note: { en: 'System reasoning is the weakest signal in this session.', kk: 'Жүйелік ойлау — осы сессиядағы ең әлсіз сигнал.' },
  },
};

export function getTopicLabSessionFocus(scores: TopicLabSessionScores): TopicLabSessionFocus {
  if (scores.reading === 3 && scores.words === 4 && scores.system === 3) {
    return {
      id: 'advance',
      href: '/game',
      label: { en: 'Apply it in Eco Game', kk: 'Eco Game ішінде қолдан' },
      note: { en: 'All three practice signals are complete at full score.', kk: 'Үш жаттығу сигналы да толық ұпаймен аяқталды.' },
    };
  }

  const normalized = [
    { id: 'reading' as const, value: scores.reading / 3 },
    { id: 'words' as const, value: scores.words / 4 },
    { id: 'system' as const, value: scores.system / 3 },
  ];
  normalized.sort((a, b) => a.value - b.value);
  return focusBySignal[normalized[0]!.id];
}
