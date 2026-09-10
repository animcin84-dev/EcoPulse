export function normalizeSpokenTerms(terms: readonly string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const raw of terms) {
    const term = raw.trim();
    if (!term) continue;
    const key = term.toLocaleLowerCase('en-US');
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(term);
  }
  return normalized;
}

export function buildPronunciationSpeechText(terms: readonly string[]): string {
  return normalizeSpokenTerms(terms).map((term) => `${term}.`).join(' ');
}
