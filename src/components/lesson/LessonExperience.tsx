'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson, ThinkStep } from '@/domain/content/types';
import { advanceLesson, completeLesson, createLessonProgress, recordAnswer, resolveLessonStepIndex } from '@/domain/learning/progress';
import { updateLearningSettings } from '@/domain/learning/settings';
import { resolveAdaptiveSupport } from '@/domain/learning/adaptive-support';
import { formatLessonStepAnnouncement } from '@/domain/learning/accessibility';
import { finalizeLessonInGuestState, LESSON_COMPLETION_XP, upsertLessonProgress } from '@/domain/learning/guest-state';
import { lessonSequence } from '@/content';
import { lessonPresentationBySlug, worldPresentation } from '@/content/lesson-presentation';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { ChoiceQuestion } from './ChoiceQuestion';
import { ConnectionChain } from './ConnectionChain';
import { FactMythExercise } from './FactMythExercise';
import { FillBlankExercise } from './FillBlankExercise';
import { DiscoverVisual } from './DiscoverVisual';
import { LessonHeader } from './LessonHeader';
import { MatchingExercise } from './MatchingExercise';
import { OrderingExercise } from './OrderingExercise';
import { PronunciationControl } from './PronunciationControl';
import { ResultPanel } from './ResultPanel';
import { ReadingExercise } from './ReadingExercise';
import { ListeningExercise } from './ListeningExercise';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';
import { resolveLessonMission } from '@/domain/learning/lesson-mission';

export function LessonExperience({ lesson }: { lesson: Lesson }) {
  const [showKazakh, setShowKazakh] = useState(false);
  const { state, hydrated, updateState } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const support = resolveAdaptiveSupport(state.onboarding.level);
  const copy = lessonUiCopy[locale];

  const stepIds = useMemo(() => lesson.steps.map((candidate) => candidate.id), [lesson.steps]);
  const storedProgress = state.lessonProgress[lesson.slug];
  const progress = storedProgress?.lessonId === lesson.id ? storedProgress : createLessonProgress(lesson.id, stepIds[0]);
  const safeIndex = resolveLessonStepIndex(progress, stepIds);
  const step = lesson.steps[safeIndex]!;
  const stageNumber = safeIndex + 1;
  const relationXp = 10;
  const stepFocusRef = useRef<HTMLDivElement | null>(null);
  const previousStepIndexRef = useRef(safeIndex);
  const focusTrackingReadyRef = useRef(false);
  const stepAnnouncement = formatLessonStepAnnouncement(safeIndex, lesson.steps.length, step.title[locale], locale);

  const mission = useMemo(() => resolveLessonMission(lesson.slug), [lesson.slug]);
  const missionCompleted = mission ? state.completedMissionIds.includes(mission.id) : false;

  const nextLesson = useMemo(() => {
    const index = lessonSequence.findIndex((candidate) => candidate.slug === lesson.slug);
    return index >= 0 ? lessonSequence[index + 1] : undefined;
  }, [lesson.slug]);


  function updateProgress(transform: (current: typeof progress) => typeof progress) {
    updateState((currentState) => {
      const current = currentState.lessonProgress[lesson.slug]?.lessonId === lesson.id
        ? currentState.lessonProgress[lesson.slug]!
        : createLessonProgress(lesson.id, stepIds[0]);
      return upsertLessonProgress(currentState, lesson.slug, transform(current));
    });
  }

  useEffect(() => {
    if (!hydrated) return;
    setShowKazakh(support.autoShowKazakhMeaning && locale === 'en');
  }, [hydrated, lesson.slug, locale, support.autoShowKazakhMeaning]);

  useEffect(() => {
    if (!hydrated) return;
    if (!focusTrackingReadyRef.current) {
      focusTrackingReadyRef.current = true;
      previousStepIndexRef.current = safeIndex;
      return;
    }
    if (previousStepIndexRef.current === safeIndex) return;
    previousStepIndexRef.current = safeIndex;
    stepFocusRef.current?.focus({ preventScroll: false });
  }, [hydrated, safeIndex]);

  useEffect(() => {
    if (step.type !== 'result' || progress.status === 'completed') return;
    updateState((currentState) => {
      const current = currentState.lessonProgress[lesson.slug] ?? createLessonProgress(lesson.id, stepIds[0]);
      const completed = completeLesson(current);
      const withProgress = upsertLessonProgress(currentState, lesson.slug, completed);
      return finalizeLessonInGuestState(withProgress, lesson, new Date());
    });
  }, [lesson, progress.status, step.type, updateState]);

  if (!hydrated) {
    return <main className="lesson-shell"><section className="lesson-stage lesson-stage--question"><div className="lesson-stage__inner lesson-stage__inner--narrow"><p className="eyebrow eyebrow--dark">{copy.common.loadingEyebrow.toUpperCase()}</p><h1 className="question-title">{copy.common.loadingTitle.split('\n').map((line, index) => <span key={line}>{line.toUpperCase()}{index === 0 ? <br /> : null}</span>)}</h1></div></section></main>;
  }

  function next() {
    updateProgress((current) => advanceLesson(current, stepIds));
  }

  function record(stepId: string, correct: boolean, xp: number) {
    updateProgress((current) => recordAnswer(current, stepId, correct, xp));
  }

  return (
    <main className="lesson-shell">
      <LessonHeader current={safeIndex} total={lesson.steps.length} xp={state.xp} world={worldPresentation[lesson.world]?.short ?? lesson.world} locale={locale} />
      <div className="lesson-tools" aria-label={copy.common.languageControls}>
        <span className={`adaptive-level-chip adaptive-level-chip--${support.mode}`}>{support.level} / {support.mode.toUpperCase()}</span>
        <button type="button" className={locale === 'en' ? 'language-chip language-chip--active' : 'language-chip'} onClick={() => updateState((current) => ({ ...current, settings: updateLearningSettings(current.settings, { preferredLocale: 'en' }) }))}>EN</button>
        <button type="button" className={locale === 'kk' ? 'language-chip language-chip--active' : 'language-chip'} onClick={() => updateState((current) => ({ ...current, settings: updateLearningSettings(current.settings, { preferredLocale: 'kk' }) }))}>ҚАЗ</button>
      </div>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{stepAnnouncement}</p>
      <div key={step.id} ref={stepFocusRef} tabIndex={-1} className="lesson-step-focus" aria-label={step.title[locale]}>
      {step.type === 'discover' && (
        <section className="lesson-stage lesson-stage--discover" aria-labelledby="discover-title">
          <div className="lesson-stage__inner lesson-stage__inner--discover">
            <p className="eyebrow eyebrow--dark">{copy.common.discover.toUpperCase()} / {worldPresentation[lesson.world]?.short ?? 'ECOPULSE'}</p>
            <h1 id="discover-title">{step.title[locale]}</h1>
            <div className="pronunciation">
              <span>{lessonPresentationBySlug[lesson.slug]?.pronunciation ?? ''}</span>
              <PronunciationControl
                terms={lessonPresentationBySlug[lesson.slug]?.spokenTerms ?? lesson.targetWords}
                audioSrc={lessonPresentationBySlug[lesson.slug]?.audioSrc}
                locale={locale}
              />
            </div>
            {step.body && <p className="word-definition">{step.body[locale]}</p>}
            {locale === 'en' && (
              <>
                <button type="button" className="translation-toggle" onClick={() => setShowKazakh((value) => !value)} aria-expanded={showKazakh}>
                  {showKazakh ? copy.common.hideKazakh : copy.common.showKazakhMeaning}
                </button>
                {showKazakh && step.body && <p className="kazakh-meaning" lang="kk">{step.body.kk}</p>}
              </>
            )}
            <p className="lesson-targets">{lesson.targetWords.map((word) => word.toUpperCase()).join(' · ')}</p>
            <button type="button" className="button button--dark" onClick={next}>{copy.common.quickCheck}</button>
          </div>
          <DiscoverVisual lesson={lesson} locale={locale} />
        </section>
      )}

      {step.type === 'choice' && (
        <ChoiceQuestion
          key={step.id}
          label={`${copy.common.quickPulse.toUpperCase()} / ${String(stageNumber).padStart(2, '0')}`}
          prompt={step.prompt}
          options={step.options}
          correctOptionId={step.correctOptionId}
          explanation={step.explanation}
          hint={step.hint}
          locale={locale}
          secondaryLocale={support.showBilingualChoiceSupport && locale === 'en' ? 'kk' : undefined}
          showHintBeforeAttempt={support.showHintBeforeAttempt}
          showHintAfterFirstAttempt={support.showHintAfterFirstAttempt}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'ordering' && (
        <OrderingExercise
          key={step.id}
          step={step}
          locale={locale}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'fact_myth' && (
        <FactMythExercise
          key={step.id}
          step={step}
          locale={locale}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'fill_blank' && (
        <FillBlankExercise
          key={step.id}
          step={step}
          locale={locale}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'matching' && (
        <MatchingExercise
          key={step.id}
          step={step}
          locale={locale}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'connection' && (
        <ConnectionChain
          step={step}
          locale={locale}
          onContinue={() => {
            record(step.id, true, relationXp);
            next();
          }}
        />
      )}

      {step.type === 'reading' && (
        <ReadingExercise
          key={step.id}
          step={step}
          locale={locale}
          level={support.level}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'listening' && (
        <ListeningExercise
          key={step.id}
          step={step}
          locale={locale}
          level={support.level}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'think' && (
        <ChoiceQuestion
          key={step.id}
          label={copy.common.thinkRealWorld.toUpperCase()}
          prompt={(step as ThinkStep).prompt}
          options={(step as ThinkStep).options}
          correctOptionId={(step as ThinkStep).bestOptionId}
          explanation={(step as ThinkStep).explanation}
          locale={locale}
          secondaryLocale={support.showBilingualChoiceSupport && locale === 'en' ? 'kk' : undefined}
          showHintBeforeAttempt={support.showHintBeforeAttempt}
          showHintAfterFirstAttempt={support.showHintAfterFirstAttempt}
          reasoningPrompt={support.requireThinkReasoning ? (step as ThinkStep).extensionPrompt : undefined}
          requireReasoning={support.requireThinkReasoning}
          onAttempt={(correct) => record(step.id, correct, step.xp)}
          onContinue={next}
        />
      )}

      {step.type === 'result' && (
        <ResultPanel
          lesson={lesson}
          step={step}
          lessonXp={progress.xp + LESSON_COMPLETION_XP}
          totalXp={state.xp + (progress.status === 'completed' ? 0 : LESSON_COMPLETION_XP)}
          locale={locale}
          nextLesson={nextLesson}
          mission={mission}
          missionCompleted={missionCompleted}
        />
      )}
      </div>
    </main>
  );
}
