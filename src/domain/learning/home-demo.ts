import type { ChoiceOption, LocalizedText } from '../content/types.ts';

export type HomeDemoOutcome = 'correct' | 'try_again' | 'reveal';

export type HomeDemo = {
  word: string;
  prompt: LocalizedText;
  options: ChoiceOption[];
  correctOptionId: string;
  hint: LocalizedText;
  explanation: LocalizedText;
  connection: string[];
};

export const homeDemo: HomeDemo = {
  word: 'GLACIER',
  prompt: {
    en: 'What does glacier mean?',
    kk: 'Glacier сөзі нені білдіреді?',
  },
  options: [
    { id: 'wind', label: { en: 'Strong wind', kk: 'Қатты жел' } },
    { id: 'glacier', label: { en: 'A large mass of land ice', kk: 'Құрлықтағы үлкен мұз массасы' } },
    { id: 'weather', label: { en: 'A type of precipitation', kk: 'Жауын-шашын түрі' } },
  ],
  correctOptionId: 'glacier',
  hint: {
    en: 'Think about a large natural body of ice on land.',
    kk: 'Құрлықтағы үлкен табиғи мұз массасы туралы ойлан.',
  },
  explanation: {
    en: 'A glacier is a large mass of ice formed from snow over many years. In EcoPulse, the word then connects to melt and sea level.',
    kk: 'Мұздық — ұзақ жылдар бойы қардан түзілген үлкен мұз массасы. EcoPulse-та бұл сөз кейін еру және теңіз деңгейі ұғымдарымен байланысады.',
  },
  connection: ['GLACIER', 'MELT', 'SEA LEVEL'],
};

export function resolveHomeDemoAttempt(
  correctOptionId: string,
  selectedOptionId: string,
  previousAttempts: number,
): HomeDemoOutcome {
  if (selectedOptionId === correctOptionId) return 'correct';
  return previousAttempts >= 1 ? 'reveal' : 'try_again';
}
