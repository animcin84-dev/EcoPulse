'use client';

import { useMemo, useState } from 'react';
import { missions } from '@/content';
import { productCopy } from '@/domain/learning/product-copy';
import {
  completeMissionInGuestState,
  saveMissionReflectionInGuestState,
} from '@/domain/learning/guest-state';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { MeasuredFilterRail } from '../ui/MeasuredFilterRail';

type MissionFilter = 'all' | 'next' | 'quick';

export function MissionList() {
  const { state, hydrated, updateState } = useGuestProgress();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<MissionFilter>('all');
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].missions;

  function draftFor(id: string) {
    return drafts[id] ?? state.missionReflections[id] ?? '';
  }

  function setDraft(id: string, value: string) {
    setDrafts((current) => ({ ...current, [id]: value.slice(0, 280) }));
  }

  function saveReflection(id: string) {
    if (!hydrated) return;
    const draft = draftFor(id);
    updateState((current) => saveMissionReflectionInGuestState(current, id, draft));
  }

  function completeMission(id: string) {
    if (!hydrated) return;
    const draft = draftFor(id);
    updateState((current) => {
      const withReflection = saveMissionReflectionInGuestState(current, id, draft);
      return completeMissionInGuestState(withReflection, id);
    });
  }

  const completedCount = missions.filter((mission) => state.completedMissionIds.includes(mission.id)).length;
  const progress = Math.round((completedCount / missions.length) * 100);
  const nextMission = missions.find((mission) => !state.completedMissionIds.includes(mission.id)) ?? missions[0];
  const visibleMissions = useMemo(() => {
    if (filter === 'quick') return missions.filter((mission) => mission.estimatedMinutes <= 3);
    if (filter === 'next') return nextMission ? [nextMission] : [];
    return missions;
  }, [filter, nextMission]);

  return (
    <div className="mission-list">
      <div className="mission-list__progress" aria-label={locale === 'en' ? 'Eco Action progress' : 'Eco Action прогресі'}>
        <div><span>{locale === 'en' ? 'FIELD PROGRESS' : 'FIELD ПРОГРЕСІ'}</span><strong>{completedCount}/{missions.length}</strong></div>
        <div className="mission-list__progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><i style={{ width: `${progress}%` }} /></div>
        <p>{locale === 'en' ? 'Actions are optional. Progress records participation, not moral worth or environmental impact.' : 'Әрекеттер міндетті емес. Прогресс қатысуды ғана көрсетеді, адамның құндылығын немесе нақты экологиялық әсерді бағаламайды.'}</p>
      </div>
      <MeasuredFilterRail<MissionFilter>
        className="mission-list__filters"
        ariaLabel={locale === 'en' ? 'Filter Eco Actions' : 'Eco Action сүзгісі'}
        label={locale === 'en' ? 'SHOW' : 'КӨРСЕТ'}
        value={filter}
        onChange={setFilter}
        transitionName="mission-filter"
        options={[
          { value: 'all', label: locale === 'en' ? 'ALL' : 'БАРЛЫҒЫ' },
          { value: 'next', label: locale === 'en' ? 'NEXT UP' : 'КЕЛЕСІ' },
          { value: 'quick', label: '≤3 MIN' },
        ]}
      />
      <div className="mission-list__cards" aria-live="polite">
      {visibleMissions.map((mission) => {
        const index = missions.findIndex((entry) => entry.id === mission.id);
        const complete = state.completedMissionIds.includes(mission.id);
        const reflection = draftFor(mission.id);
        const savedReflection = state.missionReflections[mission.id] ?? '';
        const reflectionChanged = reflection.trim() !== savedReflection;

        return (
          <article className={complete ? 'mission-card mission-card--complete' : 'mission-card'} key={mission.id}>
            <div className="mission-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <div className="mission-card__content">
              <span>{(complete ? copy.completed : copy.optional).toUpperCase()}</span>
              <h2>{mission.title[locale]}</h2>
              <p>{mission.description[locale]}</p>
              <div className="mission-card__meta">
                <span>~{mission.estimatedMinutes} {copy.minutes.toUpperCase()}</span>
                <span>{copy.noPhoto.toUpperCase()}</span>
                <span>{copy.noLocation.toUpperCase()}</span>
              </div>

              <ol className={`mission-card__steps mission-card__steps--${mission.theme}`} aria-label={locale === 'en' ? `${mission.title.en} steps` : `${mission.title.kk} қадамдары`}>
                {mission.microSteps.map((step, stepIndex) => <li key={step.en}><span>{String(stepIndex + 1).padStart(2, '0')}</span><p>{step[locale]}</p></li>)}
              </ol>

              <div className="mission-reflection-field">
                <label htmlFor={`reflection-${mission.id}`}>
                  <span>{copy.reflection.toUpperCase()}</span>
                  <strong>{mission.reflectionPrompt[locale]}</strong>
                </label>
                <textarea
                  id={`reflection-${mission.id}`}
                  maxLength={280}
                  rows={3}
                  value={reflection}
                  lang="en"
                  onChange={(event: { currentTarget: { value: string } }) => setDraft(mission.id, event.currentTarget.value)}
                  placeholder={copy.reflectionPlaceholder}
                  disabled={!hydrated}
                />
                <div className="mission-reflection-field__meta">
                  <span>{reflection.length}/280</span>
                  <span>{copy.guestStored}</span>
                </div>
              </div>
            </div>

            <div className="mission-card__actions">
              {complete ? (
                <>
                  <span className="mission-complete-mark">{copy.missionComplete.toUpperCase()}</span>
                  <button
                    type="button"
                    className="button button--dark"
                    disabled={!hydrated || !reflectionChanged}
                    onClick={() => saveReflection(mission.id)}
                  >
                    {reflectionChanged ? copy.saveReflection : savedReflection ? copy.reflectionSaved : copy.addReflection}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="button button--pulse"
                  disabled={!hydrated}
                  onClick={() => completeMission(mission.id)}
                >
                  {!hydrated ? copy.loading : copy.completeMission}
                </button>
              )}
            </div>
          </article>
        );
      })}
      </div>
    </div>
  );
}
