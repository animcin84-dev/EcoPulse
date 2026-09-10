import { lessonsBySlug } from '../../content/index.ts';
import { reviewItemsById } from '../../content/review-items.ts';
import { missionsById } from '../../content/missions.ts';
import { worldChallengesBySlug } from '../../content/world-challenges.ts';
import { knowledgeGraph } from '../../content/knowledge-graph.ts';
import type { GuestState } from './guest-state.ts';
import type { MasteryEvidence } from './mastery.ts';
import type { ReviewRecord } from './review.ts';
import { isWorldChallengeUnlocked } from './curriculum.ts';


const completedOriginLessonsByReviewItem = new Map<string, string[]>(
  Object.keys(reviewItemsById).map((itemId) => [
    itemId,
    Object.entries(lessonsBySlug)
      .filter(([, lesson]) => lesson.targetWords.includes(itemId))
      .map(([slug]) => slug),
  ]),
);

const connectionOriginLessonsByConcept = new Map<string, string[]>();
const scenarioOriginLessonsById = new Map<string, string[]>();

for (const [slug, lesson] of Object.entries(lessonsBySlug)) {
  for (const step of lesson.steps) {
    if (step.type === 'connection') {
      for (const relation of step.relations) {
        for (const conceptId of [relation.from, relation.to]) {
          const origins = connectionOriginLessonsByConcept.get(conceptId) ?? [];
          if (!origins.includes(slug)) origins.push(slug);
          connectionOriginLessonsByConcept.set(conceptId, origins);
        }
      }
    }
    if (step.type === 'think') {
      const origins = scenarioOriginLessonsById.get(step.id) ?? [];
      if (!origins.includes(slug)) origins.push(slug);
      scenarioOriginLessonsById.set(step.id, origins);
    }
  }
}

function hasCompletedLessonFromOrigins(originSlugs: readonly string[], state: GuestState): boolean {
  return originSlugs.some((slug) => state.lessonProgress[slug]?.status === 'completed');
}

function hasCompletedOriginLesson(itemId: string, state: GuestState): boolean {
  return hasCompletedLessonFromOrigins(completedOriginLessonsByReviewItem.get(itemId) ?? [], state);
}

function hasConsistentReviewProgression(record: ReviewRecord, evidence: MasteryEvidence): boolean {
  const recall = evidence.recall === true;
  const context = evidence.context === true;
  const recognition = evidence.recognition === true;
  const delayedReview = evidence.delayedReview === true;

  if (record.stage >= 1 && !recall) return false;
  if (record.stage >= 2 && !context) return false;
  if (record.stage >= 3 && !recognition) return false;
  if (record.stage < 4 && delayedReview) return false;
  return true;
}

export function hasConsistentLearningStateReferences(state: GuestState): boolean {
  const reviewIds = new Set(Object.keys(reviewItemsById));
  const missionIds = new Set(Object.keys(missionsById));
  const challengeIds = new Set(Object.keys(worldChallengesBySlug));
  const conceptIds = new Set(knowledgeGraph.nodes.map((node) => node.id));
  const scenarioIds = new Set(
    Object.values(lessonsBySlug).flatMap((lesson) => lesson.steps.filter((step) => step.type === 'think').map((step) => step.id)),
  );

  for (const [slug, progress] of Object.entries(state.lessonProgress)) {
    const lesson = lessonsBySlug[slug as keyof typeof lessonsBySlug];
    if (!lesson || progress.lessonId !== lesson.id) return false;
    const stepIds = new Set(lesson.steps.map((step) => step.id));
    if (progress.currentStepIndex >= lesson.steps.length) return false;
    if (!progress.currentStepId || !stepIds.has(progress.currentStepId)) return false;
    if (lesson.steps[progress.currentStepIndex]?.id !== progress.currentStepId) return false;
    if (progress.status === 'completed') {
      const finalStep = lesson.steps[lesson.steps.length - 1];
      if (!finalStep || finalStep.type !== 'result' || progress.currentStepId !== finalStep.id) return false;
    }
    for (const stepId of Object.keys(progress.attempts)) {
      const attemptStepIndex = lesson.steps.findIndex((step) => step.id === stepId);
      if (attemptStepIndex < 0 || attemptStepIndex > progress.currentStepIndex) return false;
      const attemptStep = lesson.steps[attemptStepIndex]!;
      if (attemptStep.type === 'discover' || attemptStep.type === 'result') return false;
    }
  }

  const reviewRecordIds = Object.keys(state.reviewRecords);
  const masteryStateIds = Object.keys(state.masteryStates);
  const masteryEvidenceIds = Object.keys(state.masteryEvidence);
  const reviewMasteryIds = new Set([...reviewRecordIds, ...masteryStateIds, ...masteryEvidenceIds]);

  if (
    reviewRecordIds.length !== reviewMasteryIds.size ||
    masteryStateIds.length !== reviewMasteryIds.size ||
    masteryEvidenceIds.length !== reviewMasteryIds.size
  ) return false;

  for (const [itemId, record] of Object.entries(state.reviewRecords)) {
    const evidence = state.masteryEvidence[itemId];
    if (
      !reviewIds.has(itemId)
      || record.itemId !== itemId
      || !hasCompletedOriginLesson(itemId, state)
      || !evidence
      || !hasConsistentReviewProgression(record, evidence)
    ) return false;
  }
  if (masteryStateIds.some((itemId) => !reviewIds.has(itemId) || !hasCompletedOriginLesson(itemId, state))) return false;
  if (masteryEvidenceIds.some((itemId) => !reviewIds.has(itemId) || !hasCompletedOriginLesson(itemId, state))) return false;
  if (state.connectedConceptIds.some((conceptId) => (
    !conceptIds.has(conceptId)
    || !hasCompletedLessonFromOrigins(connectionOriginLessonsByConcept.get(conceptId) ?? [], state)
  ))) return false;
  if (state.completedScenarioIds.some((scenarioId) => (
    !scenarioIds.has(scenarioId)
    || !hasCompletedLessonFromOrigins(scenarioOriginLessonsById.get(scenarioId) ?? [], state)
  ))) return false;
  if (state.completedMissionIds.some((missionId) => !missionIds.has(missionId))) return false;
  const completedMissionIds = new Set(state.completedMissionIds);
  if (Object.keys(state.missionReflections).some((missionId) => !missionIds.has(missionId) || !completedMissionIds.has(missionId))) return false;
  for (const challengeId of state.completedChallengeIds) {
    const challenge = worldChallengesBySlug[challengeId];
    if (!challenge || !challengeIds.has(challengeId)) return false;
    if (!isWorldChallengeUnlocked(challenge.world, Object.values(lessonsBySlug), state.lessonProgress)) return false;
  }

  return true;
}
