'use client';

import { useEffect, useRef, useState } from 'react';
import { buildPronunciationSpeechText } from '@/domain/learning/pronunciation';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';
import type { PreferredLocale } from '@/domain/learning/settings';

interface PronunciationControlProps {
  terms: readonly string[];
  locale: PreferredLocale;
  audioSrc?: string;
}

export function PronunciationControl({ terms, locale, audioSrc }: PronunciationControlProps) {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canUseRecordedAudio = Boolean(audioSrc && typeof Audio !== 'undefined');
    const canUseDeviceVoice = typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && typeof SpeechSynthesisUtterance !== 'undefined';
    setAvailable(canUseRecordedAudio || canUseDeviceVoice);

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [audioSrc]);

  function play() {
    const speechText = buildPronunciationSpeechText(terms);
    if (!speechText) return;

    if (audioSrc && typeof Audio !== 'undefined') {
      audioRef.current?.pause();
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      setPlaying(true);
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      void audio.play().catch(() => setPlaying(false));
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  }

  const copy = lessonUiCopy[locale].pronunciation;
  const label = playing ? copy.playing : copy.listen;
  const unavailable = copy.unavailable;
  const ariaLabel = copy.aria;

  return (
    <button
      type="button"
      className="pronunciation-control"
      onClick={play}
      disabled={!available || playing}
      aria-label={available ? ariaLabel : unavailable}
      title={available ? ariaLabel : unavailable}
    >
      {available ? label : unavailable}
    </button>
  );
}
