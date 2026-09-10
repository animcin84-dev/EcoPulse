'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ListeningStep } from '@/domain/content/types';
import { buildListeningPlaybackPlan } from '@/domain/learning/listening';
import type { LearningLevel } from '@/domain/learning/onboarding';
import type { PreferredLocale } from '@/domain/learning/settings';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

export function ListeningExercise({
  step,
  locale,
  level,
  onAttempt,
  onContinue,
}: {
  step: ListeningStep;
  locale: PreferredLocale;
  level: LearningLevel;
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [playbackAvailable, setPlaybackAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const copy = lessonUiCopy[locale].listening;
  const plan = useMemo(() => buildListeningPlaybackPlan(step, level), [step, level]);
  const canAnswer = hasListened || showTranscript;

  useEffect(() => {
    const canUseRecordedAudio = Boolean(plan?.audioSrc && typeof Audio !== 'undefined');
    const canUseDeviceVoice = typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && typeof SpeechSynthesisUtterance !== 'undefined';
    setPlaybackAvailable(Boolean(plan && (canUseRecordedAudio || canUseDeviceVoice)));
    setAvailabilityChecked(true);

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [plan]);

  function playWithDeviceVoice(): boolean {
    if (!plan || typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      return false;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(plan.text);
    utterance.lang = plan.lang;
    utterance.rate = plan.rate;
    utterance.pitch = 1;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => {
      setPlaying(false);
      setPlaybackFailed(true);
    };
    setPlaying(true);
    setHasListened(true);
    try {
      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      setPlaying(false);
      setPlaybackFailed(true);
      return false;
    }
  }

  function play() {
    if (!plan || playing) return;
    setPlaybackFailed(false);

    if (plan.audioSrc && typeof Audio !== 'undefined') {
      audioRef.current?.pause();
      const audio = new Audio(plan.audioSrc);
      audio.preload = 'none';
      audioRef.current = audio;
      setPlaying(true);
      let fallbackStarted = false;
      const fallbackToDeviceVoice = () => {
        if (fallbackStarted) return;
        fallbackStarted = true;
        audio.pause();
        audioRef.current = null;
        if (!playWithDeviceVoice()) {
          setPlaying(false);
          setPlaybackFailed(true);
        }
      };
      audio.onended = () => setPlaying(false);
      audio.onerror = fallbackToDeviceVoice;
      void audio.play()
        .then(() => setHasListened(true))
        .catch(fallbackToDeviceVoice);
      return;
    }

    if (!playWithDeviceVoice()) setPlaybackFailed(true);
  }

  function choose(answerId: string) {
    if (!canAnswer || resolved) return;
    const correct = answerId === step.correctAnswerId;
    const nextAttempts = attempts + 1;
    setSelected(answerId);
    setAttempts(nextAttempts);
    onAttempt(correct);
    if (correct || nextAttempts >= 2) setResolved(true);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!canAnswer || resolved) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < step.answers.length) choose(step.answers[index]!.id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canAnswer, step.answers, resolved, attempts]);

  const correct = selected === step.correctAnswerId;
  const revealCorrect = resolved && !correct;
  const playLabel = playing
    ? copy.playing
    : hasListened
      ? copy.replay
      : copy.play;

  return (
    <section className="lesson-stage lesson-stage--question lesson-stage--listening" aria-labelledby={`listening-title-${step.id}`}>
      <div className="lesson-stage__inner lesson-stage__inner--reading">
        <p className="eyebrow eyebrow--dark">{copy.eyebrow.toUpperCase()} / {level}</p>
        <h1 id={`listening-title-${step.id}`} className="reading-title">{step.title[locale]}</h1>
        <p className="reading-support">{copy.supportNote}</p>

        <div className="listening-player">
          <div className="listening-player__controls">
            <button
              type="button"
              className="button button--dark listening-play"
              onClick={play}
              disabled={!availabilityChecked || !playbackAvailable || playing}
              aria-label={playing ? copy.playing : hasListened ? copy.replayAria : copy.playAria}
            >
              {playLabel}
            </button>
            <button
              type="button"
              className="translation-toggle"
              onClick={() => setShowTranscript((value) => !value)}
              aria-expanded={showTranscript}
              aria-controls={`listening-transcript-${step.id}`}
            >
              {showTranscript ? copy.hideTranscript : copy.showTranscript}
            </button>
          </div>

          {!availabilityChecked && <p className="listening-player__status" role="status">{copy.checking}</p>}
          {availabilityChecked && !playbackAvailable && <p className="listening-player__status" role="status">{copy.unavailable}</p>}
          {playbackFailed && <p className="listening-player__status" role="status">{copy.playbackFailed}</p>}
          {playbackAvailable && !plan?.audioSrc && <p className="listening-player__note">{copy.deviceVoiceNote}</p>}

          <div
            id={`listening-transcript-${step.id}`}
            className={showTranscript ? 'listening-transcript listening-transcript--visible' : 'listening-transcript'}
            hidden={!showTranscript}
          >
            <p className="reading-check__label">{copy.transcript.toUpperCase()}</p>
            <p lang="en">{step.utterances[level]}</p>
          </div>
        </div>

        {!canAnswer && <p className="listening-gate" role="status">{copy.listenFirst}</p>}

        {canAnswer && (
          <div className="reading-check listening-check">
            <p className="reading-check__label">{copy.comprehension.toUpperCase()}</p>
            <h2 className="reading-check__question" lang="en">{step.question}</h2>
            <div className="choice-list" role="group" aria-label={step.question} lang="en">
              {step.answers.map((answer, index) => {
                const isSelected = selected === answer.id;
                const isCorrect = answer.id === step.correctAnswerId;
                const stateClass = isSelected
                  ? correct
                    ? 'choice-card--correct'
                    : 'choice-card--incorrect'
                  : revealCorrect && isCorrect
                    ? 'choice-card--correct-reveal'
                    : '';
                return (
                  <button
                    key={answer.id}
                    type="button"
                    className={`choice-card ${stateClass}`.trim()}
                    onClick={() => choose(answer.id)}
                    disabled={resolved}
                    aria-pressed={isSelected}
                  >
                    <span className="choice-card__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="choice-card__copy"><span>{answer.text}</span></span>
                    {revealCorrect && isCorrect && <span className="choice-card__status">{lessonUiCopy[locale].common.answer.toUpperCase()}</span>}
                    {isSelected && correct && <span className="choice-card__status">{lessonUiCopy[locale].common.correct.toUpperCase()}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selected && !correct && !resolved && (
          <div className="feedback-panel" role="status" aria-live="polite">
            <strong>{lessonUiCopy[locale].common.notYet.toUpperCase()}</strong>
            <p>{copy.retry}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status" aria-live="polite">
            <strong>{(correct ? copy.success : lessonUiCopy[locale].common.answerRevealed).toUpperCase()}</strong>
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{lessonUiCopy[locale].common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
