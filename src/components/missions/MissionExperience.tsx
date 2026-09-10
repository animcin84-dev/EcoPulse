'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { EcoMission } from '@/content/missions';
import { productCopy } from '@/domain/learning/product-copy';
import {
  completeMissionInGuestState,
  saveMissionReflectionInGuestState,
} from '@/domain/learning/guest-state';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { ContextBreadcrumbs } from '../navigation/ContextBreadcrumbs';

export function MissionExperience({ mission }: { mission: EcoMission }) {
  const { state, hydrated, updateState } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].missions;
  const complete = state.completedMissionIds.includes(mission.id);
  const savedReflection = state.missionReflections[mission.id] ?? '';
  const [draftOverride, setDraftOverride] = useState<string | null>(null);
  const draft = draftOverride ?? savedReflection;
  const reflectionChanged = draft.trim() !== savedReflection;

  function saveReflection() {
    if (!hydrated) return;
    updateState((current) => saveMissionReflectionInGuestState(current, mission.id, draft));
  }

  function completeMission() {
    if (!hydrated) return;
    updateState((current) => {
      const withReflection = saveMissionReflectionInGuestState(current, mission.id, draft);
      return completeMissionInGuestState(withReflection, mission.id);
    });
  }

  return (
    <section className="mission-focus" aria-labelledby="mission-focus-title">
      <ContextBreadcrumbs ariaLabel={locale === 'en' ? 'Action location' : 'Әрекет орны'} items={[{ href: '/', label: locale === 'en' ? 'Home' : 'Басты бет' }, { href: '/action', label: locale === 'en' ? 'Eco Action' : 'Eco Action' }, { label: mission.title[locale] }]} />
      <div className="section-shell mission-focus__grid">
        <div className="mission-focus__intro">
          <p className="eyebrow">{copy.optional.toUpperCase()}</p>
          <h1 id="mission-focus-title">{mission.title[locale]}</h1>
          <p className="mission-focus__lede">{mission.description[locale]}</p>
          <div className="mission-card__meta" aria-label={copy.safetyMetaAria}>
            <span>~{mission.estimatedMinutes} {copy.minutes.toUpperCase()}</span>
            <span>{copy.noPhoto.toUpperCase()}</span>
            <span>{copy.noLocation.toUpperCase()}</span>
          </div>
          <ol className={`mission-focus__steps mission-focus__steps--${mission.theme}`} aria-label={locale === 'en' ? 'Field plan' : 'Әрекет жоспары'}>
            {mission.microSteps.map((step, stepIndex) => <li key={step.en}><span>{String(stepIndex + 1).padStart(2, '0')}</span><p>{step[locale]}</p></li>)}
          </ol>
          <p className="mission-focus__safety">{copy.noProof}</p>
        </div>

        <div className="mission-focus__action">
          <div className="mission-reflection-field">
            <label htmlFor={`mission-focus-reflection-${mission.id}`}>
              <span>{copy.reflection.toUpperCase()}</span>
              <strong>{mission.reflectionPrompt[locale]}</strong>
            </label>
            <textarea
              id={`mission-focus-reflection-${mission.id}`}
              maxLength={280}
              rows={5}
              value={draft}
              lang="en"
              onChange={(event: { currentTarget: { value: string } }) => setDraftOverride(event.currentTarget.value.slice(0, 280))}
              placeholder={copy.reflectionPlaceholder}
              disabled={!hydrated}
            />
            <div className="mission-reflection-field__meta">
              <span>{draft.length}/280</span>
              <span>{copy.guestStored}</span>
            </div>
          </div>

          <div className="mission-focus__actions">
            {complete ? (
              <>
                <div className="mission-focus__complete" role="status">
                  <strong>{copy.missionComplete}</strong>
                  <span>{copy.completeBody}</span>
                </div>
                <Link className="button button--pulse" href="/pulse">{copy.seePulse}</Link>
                <button
                  type="button"
                  className="button button--dark"
                  disabled={!hydrated || !reflectionChanged}
                  onClick={saveReflection}
                >
                  {reflectionChanged ? copy.saveReflection : savedReflection ? copy.reflectionSaved : copy.addReflection}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="button button--pulse"
                disabled={!hydrated}
                onClick={completeMission}
              >
                {!hydrated ? copy.loading : copy.completeMission}
              </button>
            )}
            <Link className="mission-focus__back" href="/action">{copy.allMissions}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
