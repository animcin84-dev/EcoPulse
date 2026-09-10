'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import {
  climateChain,
  ecoArcadeModes,
  ecoDecisions,
  ecoSignalMatches,
  ecoSortRounds,
  ecoWordDeck,
  type EcoArcadeModeId,
} from '@/content/eco-arcade';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PronunciationControl } from '../lesson/PronunciationControl';

type Locale = 'en' | 'kk';
type Mode = EcoArcadeModeId;

type CompleteHandler = () => void;

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable);
}

function ScorePill({ score, total, locale }: { score: number; total: number; locale: Locale }) {
  return <div className="arcade-score" aria-live="polite"><span>{locale === 'en' ? 'ROUND SCORE' : 'РАУНД ҰПАЙЫ'}</span><strong>{score}/{total}</strong></div>;
}

function WordPulse({ locale, onComplete }: { locale: Locale; onComplete: CompleteHandler }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = ecoWordDeck[index]!;

  function choose(option: string) {
    if (selected || done) return;
    setSelected(option);
    if (option === item.correct) setScore((value) => value + 1);
  }

  useEffect(() => {
    const numberKeys = ['1', '2', '3'];
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if (isTypingTarget(event.target)) return;
      const optionIndex = numberKeys.indexOf(event.key);
      if (optionIndex < 0 || selected || done) return;
      const option = item.options[optionIndex];
      if (option) choose(option);
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [done, item, selected]);

  function next() {
    if (index === ecoWordDeck.length - 1) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() { setIndex(0); setSelected(null); setScore(0); setDone(false); }

  if (done) {
    return <div className="arcade-result" aria-live="polite"><span>WORD PULSE / {locale === 'en' ? 'COMPLETE' : 'АЯҚТАЛДЫ'}</span><strong>{score}/{ecoWordDeck.length}</strong><h3>{locale === 'en' ? 'Recognition round complete.' : 'Сөзді тану раунды аяқталды.'}</h3><button className="button button--dark" type="button" onClick={restart}>{locale === 'en' ? 'Play again ↻' : 'Қайта ойна ↻'}</button></div>;
  }

  return (
    <div className="arcade-round">
      <div className="arcade-round__meta"><span>WORD PULSE</span><span>{index + 1}/{ecoWordDeck.length}</span></div>
      <div className="arcade-word" lang="en"><small>{locale === 'en' ? 'CHOOSE THE KAZAKH MEANING · KEYS 1–3' : 'ҚАЗАҚША МАҒЫНАСЫН ТАҢДА · 1–3 ПЕРНЕЛЕРІ'}</small><h3>{item.word}</h3><PronunciationControl terms={[item.word]} locale={locale} /></div>
      <div className="arcade-choice-grid">
        {item.options.map((option, optionIndex) => {
          const resolved = selected !== null;
          const correct = option === item.correct;
          const active = option === selected;
          return <button key={option} type="button" className={resolved ? correct ? 'arcade-choice arcade-choice--correct' : active ? 'arcade-choice arcade-choice--wrong' : 'arcade-choice arcade-choice--muted' : 'arcade-choice'} disabled={resolved} onClick={() => choose(option)}><span>{optionIndex + 1}</span><strong>{option}</strong></button>;
        })}
      </div>
      {selected ? <div className="arcade-feedback" aria-live="polite"><strong>{selected === item.correct ? (locale === 'en' ? '✓ CONNECTED' : '✓ ДҰРЫС БАЙЛАНЫС') : (locale === 'en' ? '↗ TRY THE CORRECT LINK' : '↗ ДҰРЫС БАЙЛАНЫСТЫ КӨР')}</strong><button type="button" className="button button--dark" onClick={next}>{index === ecoWordDeck.length - 1 ? (locale === 'en' ? 'RESULT →' : 'НӘТИЖЕ →') : (locale === 'en' ? 'NEXT →' : 'КЕЛЕСІ →')}</button></div> : null}
      <ScorePill score={score} total={ecoWordDeck.length} locale={locale} />
    </div>
  );
}

function ClimateChain({ locale, onComplete }: { locale: Locale; onComplete: CompleteHandler }) {
  const start = useMemo(() => [climateChain[2], climateChain[0], climateChain[4], climateChain[1], climateChain[3]], []);
  const [items, setItems] = useState([...start]);
  const [checked, setChecked] = useState(false);
  const correct = items.every((item, index) => item === climateChain[index]);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const copy = [...items];
    [copy[index], copy[nextIndex]] = [copy[nextIndex]!, copy[index]!];
    setItems(copy);
    setChecked(false);
  }

  function check() {
    setChecked(true);
    if (correct) onComplete();
  }

  function reset() { setItems([...start]); setChecked(false); }

  return (
    <div className="arcade-round arcade-chain">
      <div className="arcade-round__meta"><span>CLIMATE CHAIN</span><span>{locale === 'en' ? 'CAUSE → EFFECT' : 'СЕБЕП → САЛДАР'}</span></div>
      <div className="arcade-chain__intro"><h3>{locale === 'en' ? 'Build the climate sequence.' : 'Климаттық тізбекті құрастыр.'}</h3><p>{locale === 'en' ? 'Move each statement until the cause-and-effect chain makes scientific sense.' : 'Себеп-салдар тізбегі ғылыми мағына бергенше тұжырымдарды жылжыт.'}</p></div>
      <ol className="arcade-chain__list">
        {items.map((item, index) => <li key={item.en}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item[locale]}</strong><div><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={locale === 'en' ? `Move up ${item.en}` : `${item.kk} жоғары жылжыту`}>↑ <em>{locale === 'en' ? 'MOVE UP' : 'ЖОҒАРЫ'}</em></button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={locale === 'en' ? `Move down ${item.en}` : `${item.kk} төмен жылжыту`}>↓ <em>{locale === 'en' ? 'MOVE DOWN' : 'ТӨМЕН'}</em></button></div></li>)}
      </ol>
      <div className="arcade-chain__actions"><button type="button" className="button button--pulse" onClick={check}>{locale === 'en' ? 'Check chain' : 'Тізбекті тексер'}</button><button type="button" className="button button--ghost" onClick={reset}>{locale === 'en' ? 'Reset' : 'Қайта бастау'}</button></div>
      {checked ? <div className={correct ? 'arcade-feedback arcade-feedback--success' : 'arcade-feedback'} aria-live="polite"><strong>{correct ? (locale === 'en' ? '✓ SYSTEM CONNECTED' : '✓ ЖҮЙЕ БАЙЛАНЫСТЫ') : (locale === 'en' ? '↗ NOT YET CONNECTED' : '↗ ӘЛІ БАЙЛАНЫСПАДЫ')}</strong><p>{correct ? (locale === 'en' ? 'The sequence follows greenhouse forcing → warming → land-ice melt → sea-level rise.' : 'Тізбек жылыжай әсері → жылыну → құрлық мұзының еруі → теңіз деңгейінің көтерілуін көрсетеді.') : (locale === 'en' ? 'Look for the earliest cause first, then follow what changes next.' : 'Алдымен бастапқы себепті тауып, одан кейін не өзгеретінін бақыла.')}</p></div> : null}
    </div>
  );
}

function EcoDecision({ locale, onComplete }: { locale: Locale; onComplete: CompleteHandler }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = ecoDecisions[index]!;

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === item.correct) setScore((value) => value + 1);
  }

  useEffect(() => {
    const numberKeys = ['1', '2', '3'];
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if (isTypingTarget(event.target)) return;
      const optionIndex = numberKeys.indexOf(event.key);
      if (optionIndex < 0 || selected !== null) return;
      if (item.options[optionIndex]) choose(optionIndex);
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [item, selected]);

  function next() {
    if (index === ecoDecisions.length - 1) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() { setIndex(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <div className="arcade-result" aria-live="polite"><span>ECO DECISION / {locale === 'en' ? 'COMPLETE' : 'АЯҚТАЛДЫ'}</span><strong>{score}/{ecoDecisions.length}</strong><h3>{locale === 'en' ? 'Decision round complete.' : 'Шешім раунды аяқталды.'}</h3><button type="button" className="button button--dark" onClick={restart}>{locale === 'en' ? 'Play again ↻' : 'Қайта ойна ↻'}</button></div>;

  return (
    <div className="arcade-round arcade-decision">
      <div className="arcade-round__meta"><span>ECO DECISION</span><span>{index + 1}/{ecoDecisions.length}</span></div>
      <h3>{item.prompt[locale]}</h3>
      <div className="arcade-decision__options">
        {item.options.map((option, optionIndex) => {
          const resolved = selected !== null;
          const isCorrect = optionIndex === item.correct;
          const isSelected = selected === optionIndex;
          return <button key={option.en} type="button" disabled={resolved} onClick={() => choose(optionIndex)} className={resolved ? isCorrect ? 'arcade-choice arcade-choice--correct' : isSelected ? 'arcade-choice arcade-choice--wrong' : 'arcade-choice arcade-choice--muted' : 'arcade-choice'}><span>{optionIndex + 1}</span><strong>{option[locale]}</strong></button>;
        })}
      </div>
      {selected !== null ? <div className="arcade-feedback" aria-live="polite"><div><strong>{selected === item.correct ? (locale === 'en' ? '✓ STRONG CHOICE' : '✓ КҮШТІ ТАҢДАУ') : (locale === 'en' ? '↗ COMPARE THE IMPACT' : '↗ ӘСЕРДІ САЛЫСТЫР')}</strong><p>{item.why[locale]}</p></div><button type="button" className="button button--dark" onClick={next}>{index === ecoDecisions.length - 1 ? (locale === 'en' ? 'RESULT →' : 'НӘТИЖЕ →') : (locale === 'en' ? 'NEXT →' : 'КЕЛЕСІ →')}</button></div> : null}
      <ScorePill score={score} total={ecoDecisions.length} locale={locale} />
    </div>
  );
}

function SortItRight({ locale, onComplete }: { locale: Locale; onComplete: CompleteHandler }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = ecoSortRounds[index]!;

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === item.correct) setScore((value) => value + 1);
  }

  useEffect(() => {
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if (isTypingTarget(event.target) || selected !== null) return;
      const optionIndex = ['1', '2', '3'].indexOf(event.key);
      if (optionIndex >= 0) choose(optionIndex);
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selected, item]);

  function next() {
    if (index === ecoSortRounds.length - 1) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() { setIndex(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <div className="arcade-result" aria-live="polite"><span>SORT IT RIGHT / {locale === 'en' ? 'COMPLETE' : 'АЯҚТАЛДЫ'}</span><strong>{score}/{ecoSortRounds.length}</strong><h3>{locale === 'en' ? 'Material strategy round complete.' : 'Материал стратегиясы раунды аяқталды.'}</h3><button type="button" className="button button--dark" onClick={restart}>{locale === 'en' ? 'Play again ↻' : 'Қайта ойна ↻'}</button></div>;

  return <div className="arcade-round arcade-sort">
    <div className="arcade-round__meta"><span>SORT IT RIGHT</span><span>{index + 1}/{ecoSortRounds.length}</span></div>
    <div className="arcade-sort__object"><small>{locale === 'en' ? 'BEST NEXT STRATEGY · KEYS 1–3' : 'ЕҢ ДҰРЫС КЕЛЕСІ СТРАТЕГИЯ · 1–3'}</small><h3>{item.item[locale]}</h3></div>
    <div className="arcade-choice-grid arcade-choice-grid--strategy">
      {item.options.map((option, optionIndex) => {
        const resolved = selected !== null;
        const isCorrect = optionIndex === item.correct;
        const isSelected = selected === optionIndex;
        return <button key={option.en} type="button" disabled={resolved} onClick={() => choose(optionIndex)} className={resolved ? isCorrect ? 'arcade-choice arcade-choice--correct' : isSelected ? 'arcade-choice arcade-choice--wrong' : 'arcade-choice arcade-choice--muted' : 'arcade-choice'}><span>{optionIndex + 1}</span><strong>{option[locale]}</strong></button>;
      })}
    </div>
    {selected !== null ? <div className="arcade-feedback" aria-live="polite"><div><strong>{selected === item.correct ? (locale === 'en' ? '✓ STRATEGY FITS' : '✓ СТРАТЕГИЯ СӘЙКЕС') : (locale === 'en' ? '↗ TRY THE HIERARCHY' : '↗ ИЕРАРХИЯНЫ ҚОЛДАН')}</strong><p>{item.why[locale]}</p></div><button type="button" className="button button--dark" onClick={next}>{index === ecoSortRounds.length - 1 ? (locale === 'en' ? 'RESULT →' : 'НӘТИЖЕ →') : (locale === 'en' ? 'NEXT →' : 'КЕЛЕСІ →')}</button></div> : null}
    <ScorePill score={score} total={ecoSortRounds.length} locale={locale} />
  </div>;
}

function SignalMatch({ locale, onComplete }: { locale: Locale; onComplete: CompleteHandler }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = ecoSignalMatches[index]!;

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === item.correct) setScore((value) => value + 1);
  }

  useEffect(() => {
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if (isTypingTarget(event.target) || selected !== null) return;
      const optionIndex = ['1', '2', '3'].indexOf(event.key);
      if (optionIndex >= 0) choose(optionIndex);
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selected, item]);

  function next() {
    if (index === ecoSignalMatches.length - 1) {
      setDone(true);
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() { setIndex(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <div className="arcade-result" aria-live="polite"><span>SIGNAL MATCH / {locale === 'en' ? 'COMPLETE' : 'АЯҚТАЛДЫ'}</span><strong>{score}/{ecoSignalMatches.length}</strong><h3>{locale === 'en' ? 'System signal round complete.' : 'Жүйелік белгі раунды аяқталды.'}</h3><button type="button" className="button button--dark" onClick={restart}>{locale === 'en' ? 'Play again ↻' : 'Қайта ойна ↻'}</button></div>;

  return <div className="arcade-round arcade-signal">
    <div className="arcade-round__meta"><span>SIGNAL MATCH</span><span>{index + 1}/{ecoSignalMatches.length}</span></div>
    <div className="arcade-signal__prompt"><span>{item.signal}</span><h3>{item.prompt[locale]}</h3><small>{locale === 'en' ? 'MATCH THE STRONGEST TOPIC · KEYS 1–3' : 'ЕҢ СӘЙКЕС ТАҚЫРЫПТЫ ТАҢДА · 1–3'}</small></div>
    <div className="arcade-choice-grid">
      {item.options.map((option, optionIndex) => {
        const resolved = selected !== null;
        const isCorrect = optionIndex === item.correct;
        const isSelected = selected === optionIndex;
        return <button key={option.en} type="button" disabled={resolved} onClick={() => choose(optionIndex)} className={resolved ? isCorrect ? 'arcade-choice arcade-choice--correct' : isSelected ? 'arcade-choice arcade-choice--wrong' : 'arcade-choice arcade-choice--muted' : 'arcade-choice'}><span>{optionIndex + 1}</span><strong>{option[locale]}</strong></button>;
      })}
    </div>
    {selected !== null ? <div className="arcade-feedback" aria-live="polite"><strong>{selected === item.correct ? (locale === 'en' ? '✓ SIGNAL CONNECTED' : '✓ БЕЛГІ БАЙЛАНЫСТЫ') : (locale === 'en' ? '↗ FOLLOW THE DEFINITION' : '↗ АНЫҚТАМАНЫ ҚАДАҒАЛА')}</strong><button type="button" className="button button--dark" onClick={next}>{index === ecoSignalMatches.length - 1 ? (locale === 'en' ? 'RESULT →' : 'НӘТИЖЕ →') : (locale === 'en' ? 'NEXT →' : 'КЕЛЕСІ →')}</button></div> : null}
    <ScorePill score={score} total={ecoSignalMatches.length} locale={locale} />
  </div>;
}

export function EcoArcadeExperience() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const [mode, setMode] = useState<Mode>('words');
  const [completedModes, setCompletedModes] = useState<Set<Mode>>(() => new Set());
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ words: null, chain: null, decision: null, sort: null, signals: null });
  const modeOrder = ecoArcadeModes.map((entry) => entry.id);

  useEffect(() => {
    const rail = tabsRef.current;
    const active = tabRefs.current[mode];
    if (!rail || !active) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = active.getBoundingClientRect().width;
        rail.style.setProperty('--arcade-tab-x', `${active.offsetLeft}px`);
        rail.style.setProperty('--arcade-tab-width', `${width}px`);
        rail.style.setProperty('--arcade-tab-opacity', '1');
      });
    };

    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(rail);
    Object.values(tabRefs.current).forEach((node) => { if (node) observer?.observe(node); });
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [mode, locale]);

  function changeMode(next: Mode) {
    if (next === mode) return;
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> };
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    if (!doc.startViewTransition || reduced) {
      setMode(next);
      return;
    }

    const currentIndex = modeOrder.indexOf(mode);
    const nextIndex = modeOrder.indexOf(next);
    const rawDelta = nextIndex - currentIndex;
    const direction = Math.abs(rawDelta) > modeOrder.length / 2 ? -Math.sign(rawDelta) : Math.sign(rawDelta);
    const root = document.documentElement;
    root.dataset.uiTransition = 'arcade';
    root.style.setProperty('--arcade-direction', String(direction || 1));

    const transition = doc.startViewTransition(() => {
      flushSync(() => setMode(next));
    });
    transition.finished.finally(() => {
      delete root.dataset.uiTransition;
      root.style.removeProperty('--arcade-direction');
    });
  }

  function completeMode(id: Mode) {
    setCompletedModes((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  function onTabKey(event: { key: string; preventDefault: () => void }, current: Mode) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    let next: Mode;
    if (event.key === 'Home') next = modeOrder[0]!;
    else if (event.key === 'End') next = modeOrder[modeOrder.length - 1]!;
    else {
      const currentIndex = modeOrder.indexOf(current);
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      next = modeOrder[(currentIndex + delta + modeOrder.length) % modeOrder.length]!;
    }
    changeMode(next);
    window.requestAnimationFrame(() => tabRefs.current[next]?.focus());
  }

  return (
    <section className="eco-arcade-stage" id="arcade-stage" aria-labelledby="eco-arcade-stage-title">
      <div className="section-shell">
        <div className="eco-arcade-stage__heading"><div><p className="eyebrow eyebrow--dark">ARCADE / LIVE PRACTICE</p><h2 id="eco-arcade-stage-title">{locale === 'en' ? 'Five ways to make the connection stick.' : 'Байланысты бекітудің бес жолы.'}</h2></div><p>{locale === 'en' ? 'Train language, sequence reasoning, decisions, material strategy and system recognition. Session marks are temporary and never pretend to be mastery.' : 'Тіл, тізбектік ойлау, шешім, материал стратегиясы және жүйелік тануды жаттықтыр. Сессия белгілері уақытша және mastery болып есептелмейді.'}</p></div>

        <div className="arcade-session-meter" aria-live="polite" aria-label={locale === 'en' ? `${completedModes.size} of 5 arcade modes completed this session` : `Осы сессияда 5 режимнің ${completedModes.size} аяқталды`}>
          <div><span>{locale === 'en' ? 'SESSION COVERAGE' : 'СЕССИЯ ҚАМТУЫ'}</span><strong>{completedModes.size}/5</strong></div>
          <div className="arcade-session-meter__track" aria-hidden="true"><i style={{ width: `${(completedModes.size / 5) * 100}%` }} /></div>
          <p>{locale === 'en' ? 'Local to this visit · no canonical XP or mastery changes.' : 'Тек осы кіру сессиясы · негізгі XP немесе mastery өзгермейді.'}</p>
        </div>

        <div ref={tabsRef} className="eco-arcade-tabs" role="tablist" aria-label={locale === 'en' ? 'Eco Game modes' : 'Eco Game режимдері'}>
          <span className="eco-arcade-tabs__glider" aria-hidden="true" />
          {ecoArcadeModes.map((entry) => <button
            key={entry.id}
            ref={(node) => { tabRefs.current[entry.id] = node; }}
            id={`arcade-tab-${entry.id}`}
            type="button"
            role="tab"
            aria-selected={mode === entry.id}
            aria-controls="arcade-panel"
            tabIndex={mode === entry.id ? 0 : -1}
            onKeyDown={(event) => onTabKey(event, entry.id)}
            onClick={() => changeMode(entry.id)}
          ><span>{entry.index}</span><strong>{entry.label}</strong><small>{completedModes.has(entry.id) ? '✓' : '○'}</small></button>)}
        </div>
        <div id="arcade-panel" className="eco-arcade-stage__board" data-arcade-mode={mode} role="tabpanel" aria-labelledby={`arcade-tab-${mode}`}>
          {mode === 'words' ? <WordPulse locale={locale} onComplete={() => completeMode('words')} /> : null}
          {mode === 'chain' ? <ClimateChain locale={locale} onComplete={() => completeMode('chain')} /> : null}
          {mode === 'decision' ? <EcoDecision locale={locale} onComplete={() => completeMode('decision')} /> : null}
          {mode === 'sort' ? <SortItRight locale={locale} onComplete={() => completeMode('sort')} /> : null}
          {mode === 'signals' ? <SignalMatch locale={locale} onComplete={() => completeMode('signals')} /> : null}
        </div>
        {completedModes.size === ecoArcadeModes.length ? (
          <div className="arcade-session-recap" aria-live="polite">
            <div>
              <span>{locale === 'en' ? 'SESSION / 05 OF 05' : 'СЕССИЯ / 05-ТІҢ 05-І'}</span>
              <h3>{locale === 'en' ? 'All five practice signals sampled.' : 'Бес жаттығу сигналының бәрі орындалды.'}</h3>
              <p>{locale === 'en' ? 'This session coverage is temporary and gives no canonical XP or mastery. Move into Review for measured learning evidence, or Eco Action to use the language off-screen.' : 'Бұл сессия нәтижесі уақытша және негізгі XP немесе mastery бермейді. Өлшенетін оқу дәлелі үшін Review-ға, ал тілді өмірде қолдану үшін Eco Action-ға өт.'}</p>
            </div>
            <div className="arcade-session-recap__actions">
              <Link className="button button--dark" href="/review">{locale === 'en' ? 'Open mastery review →' : 'Mastery review ашу →'}</Link>
              <Link className="button button--ghost" href="/action">{locale === 'en' ? 'Go to Eco Action →' : 'Eco Action-ға өту →'}</Link>
            </div>
          </div>
        ) : null}
        <div className="eco-arcade-stage__footer"><span>{locale === 'en' ? 'SESSION PRACTICE / NO CANONICAL XP' : 'СЕССИЯ ЖАТТЫҒУЫ / НЕГІЗГІ XP ЖОҚ'}</span><Link href="/review">{locale === 'en' ? 'Open mastery review →' : 'Mastery review ашу →'}</Link></div>
      </div>
    </section>
  );
}
