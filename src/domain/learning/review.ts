export type ReviewResult = 'correct' | 'incorrect';

export type ReviewRecord = {
  itemId: string;
  stage: number;
  dueAt: string;
  mistakes: number;
};


export type ReviewBatch = {
  records: ReviewRecord[];
  totalDue: number;
  remainingCount: number;
};

export type NextBestActionInput = {
  dueReviewCount: number;
  nextLessonSlug: string | null;
  missionId: string | null;
};

export type NextBestAction =
  | { type: 'review'; count: number }
  | { type: 'lesson'; slug: string }
  | { type: 'mission'; id: string }
  | { type: 'none' };

const reviewIntervalsDays = [1, 3, 7, 14, 30] as const;
const dayMs = 24 * 60 * 60 * 1000;

export function createReviewRecord(itemId: string, now: Date): ReviewRecord {
  return {
    itemId,
    stage: 0,
    dueAt: addDays(now, 1),
    mistakes: 0,
  };
}

function addDays(date: Date, days: number): string {
  return new Date(date.getTime() + days * dayMs).toISOString();
}

export function recordReviewResult(
  record: ReviewRecord,
  result: ReviewResult,
  now: Date,
): ReviewRecord {
  if (result === 'incorrect') {
    return {
      ...record,
      stage: Math.max(0, record.stage - 1),
      dueAt: addDays(now, 1),
      mistakes: record.mistakes + 1,
    };
  }

  const intervalIndex = Math.min(record.stage, reviewIntervalsDays.length - 1);
  const interval = reviewIntervalsDays[intervalIndex];

  return {
    ...record,
    stage: record.stage + 1,
    dueAt: addDays(now, interval),
  };
}

export function selectDueReviewItems(
  records: ReviewRecord[],
  now: Date,
  limit = 8,
): ReviewRecord[] {
  const nowMs = now.getTime();
  return records
    .filter((record) => new Date(record.dueAt).getTime() <= nowMs)
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, Math.max(0, limit));
}


export function buildReviewBatch(
  records: ReviewRecord[],
  now: Date,
  limit = 8,
): ReviewBatch {
  const dueRecords = selectDueReviewItems(records, now, records.length);
  const batchSize = Math.max(0, limit);
  const batchRecords = dueRecords.slice(0, batchSize);
  return {
    records: batchRecords,
    totalDue: dueRecords.length,
    remainingCount: Math.max(0, dueRecords.length - batchRecords.length),
  };
}

export function chooseNextBestAction(input: NextBestActionInput): NextBestAction {
  if (input.dueReviewCount > 0) return { type: 'review', count: input.dueReviewCount };
  if (input.nextLessonSlug) return { type: 'lesson', slug: input.nextLessonSlug };
  if (input.missionId) return { type: 'mission', id: input.missionId };
  return { type: 'none' };
}
