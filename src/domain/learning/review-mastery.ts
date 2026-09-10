import { applyMasterySignal, type MasteryEvidence, type MasterySignal } from './mastery.ts';

export type ReviewMode = 'recall' | 'context' | 'recognition' | 'delayed_recall';

export function reviewModeForStage(stage: number): ReviewMode {
  if (stage <= 0) return 'recall';
  if (stage === 1) return 'context';
  if (stage === 2) return 'recognition';
  if (stage === 3) return 'delayed_recall';

  const maintenanceModes = ['context', 'recall', 'recognition', 'delayed_recall'] as const;
  return maintenanceModes[(stage - 4) % maintenanceModes.length]!;
}

export function reviewSignalForStage(stage: number): MasterySignal {
  if (stage <= 0) return 'recall';
  if (stage === 1) return 'context';
  if (stage === 2) return 'recognition';
  return 'delayedReview';
}

export function applyReviewEvidence(
  evidence: MasteryEvidence,
  stage: number,
  correct: boolean,
): MasteryEvidence {
  const signal = reviewSignalForStage(stage);
  if (correct) return applyMasterySignal(evidence, signal);

  const next: MasteryEvidence = {
    exposures: Math.max(1, evidence.exposures),
    recognition: evidence.recognition ?? false,
    recall: evidence.recall ?? false,
    context: evidence.context ?? false,
    delayedReview: false,
  };

  if (signal === 'recognition') next.recognition = false;
  if (signal === 'recall') next.recall = false;
  if (signal === 'context') next.context = false;
  return next;
}


function normalizeReviewText(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[‐‑‒–—−_-]+/g, ' ')
    .replace(/[.,!?;:()[\]{}"'“”‘’]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function evaluateReviewAnswer(
  mode: ReviewMode,
  answer: string,
  item: { word: string; correctOptionId: string; contextAcceptedAnswers: string[] },
): boolean {
  if (mode === 'recognition') return answer === item.correctOptionId;
  const normalized = normalizeReviewText(answer);
  if (mode === 'context') {
    return item.contextAcceptedAnswers.some((candidate) => normalizeReviewText(candidate) === normalized);
  }
  return normalizeReviewText(item.word) === normalized;
}
