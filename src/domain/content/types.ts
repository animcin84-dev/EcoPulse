export type LocalizedText = {
  en: string;
  kk: string;
};

export type RelationType =
  | 'causes'
  | 'contributes_to'
  | 'affects'
  | 'part_of'
  | 'related_to'
  | 'depends_on'
  | 'example_of'
  | 'absorbed_by';

export type KnowledgeRelation = {
  from: string;
  to: string;
  type: RelationType;
  label?: LocalizedText;
};

export type ChoiceOption = {
  id: string;
  label: LocalizedText;
};

export type VocabularyMasterySignal = 'recognition' | 'recall' | 'context';

export type MasterySignalRef = {
  word: string;
  signal: VocabularyMasterySignal;
};

export type DiscoverStep = {
  id: string;
  type: 'discover';
  title: LocalizedText;
  body?: LocalizedText;
};

export type ChoiceStep = {
  id: string;
  type: 'choice';
  title: LocalizedText;
  prompt: LocalizedText;
  options: ChoiceOption[];
  correctOptionId: string;
  hint?: LocalizedText;
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};

export type OrderingItem = {
  id: string;
  label: LocalizedText;
};

export type OrderingStep = {
  id: string;
  type: 'ordering';
  title: LocalizedText;
  prompt: LocalizedText;
  items: OrderingItem[];
  correctOrder: string[];
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};


export type FactMythStep = {
  id: string;
  type: 'fact_myth';
  title: LocalizedText;
  statement: LocalizedText;
  correctAnswer: 'fact' | 'myth';
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};

export type FillBlankStep = {
  id: string;
  type: 'fill_blank';
  title: LocalizedText;
  prompt: LocalizedText;
  acceptedAnswers: string[];
  hint?: LocalizedText;
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};

export type MatchingPair = {
  id: string;
  left: LocalizedText;
  right: LocalizedText;
};

export type MatchingStep = {
  id: string;
  type: 'matching';
  title: LocalizedText;
  prompt: LocalizedText;
  pairs: MatchingPair[];
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};


export type ReadingAnswer = {
  id: string;
  text: string;
};

export type ReadingStep = {
  id: string;
  type: 'reading';
  title: LocalizedText;
  passages: Record<'A2' | 'B1' | 'B2', string>;
  question: string;
  answers: ReadingAnswer[];
  correctAnswerId: string;
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};


export type ListeningStep = {
  id: string;
  type: 'listening';
  title: LocalizedText;
  utterances: Record<'A2' | 'B1' | 'B2', string>;
  question: string;
  answers: ReadingAnswer[];
  correctAnswerId: string;
  audioSrcByLevel?: Partial<Record<'A2' | 'B1' | 'B2', string>>;
  explanation: LocalizedText;
  masterySignals?: MasterySignalRef[];
  xp: number;
};

export type ConnectionStep = {
  id: string;
  type: 'connection';
  title: LocalizedText;
  body?: LocalizedText;
  relations: KnowledgeRelation[];
};

export type ThinkStep = {
  id: string;
  type: 'think';
  title: LocalizedText;
  prompt: LocalizedText;
  extensionPrompt?: LocalizedText;
  options: ChoiceOption[];
  bestOptionId: string;
  explanation: LocalizedText;
  xp: number;
};

export type ResultStep = {
  id: string;
  type: 'result';
  title: LocalizedText;
  body?: LocalizedText;
};

export type LessonStep = DiscoverStep | ChoiceStep | OrderingStep | FactMythStep | FillBlankStep | MatchingStep | ReadingStep | ListeningStep | ConnectionStep | ThinkStep | ResultStep;

export type Lesson = {
  id: string;
  slug: string;
  version: string;
  world: string;
  title: LocalizedText;
  estimatedMinutes: number;
  targetWords: string[];
  sourceIds: string[];
  steps: LessonStep[];
};
