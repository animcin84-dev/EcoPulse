export function normalizeTypedAnswer(value: string): string {
  return value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');
}

export function isAcceptedFillBlankAnswer(input: string, acceptedAnswers: readonly string[]): boolean {
  const normalized = normalizeTypedAnswer(input);
  return acceptedAnswers.some((answer) => normalizeTypedAnswer(answer) === normalized);
}

export function isMatchingAnswerCorrect(
  pairIds: readonly string[],
  answers: Readonly<Record<string, string>>,
): boolean {
  return pairIds.length > 0 && pairIds.every((pairId) => answers[pairId] === pairId);
}
