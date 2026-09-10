'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { TopicLab as TopicLabContent } from '@/content/topic-labs';
import { topicDepth } from '@/content/topic-depth';
import { topicReadingChecks, topicReadings } from '@/content/topic-readings';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';
import { PronunciationControl } from '../lesson/PronunciationControl';
import { SourceDisclosure } from '../lesson/SourceDisclosure';
import { TopicSequenceNav } from './TopicSequenceNav';
import { getTopicLabSessionFocus } from '@/domain/learning/topic-lab-session';
import { ContextBreadcrumbs } from '../navigation/ContextBreadcrumbs';

type Locale = 'en' | 'kk';

function TopicLabQuickCheck({ lab, locale, onComplete, onReset }: { lab: TopicLabContent; locale: Locale; onComplete: (score: number) => void; onReset: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = lab.vocabulary[index];

  const options = useMemo(() => {
    if (!current) return [];
    const meanings = lab.vocabulary.map((item) => item.meaning[locale]);
    const shift = index % meanings.length;
    return [...meanings.slice(shift), ...meanings.slice(0, shift)];
  }, [current, index, lab.vocabulary, locale]);

  const correct = selected === current?.meaning[locale];

  function choose(option: string) {
    if (selected || !current) return;
    setSelected(option);
    if (option === current.meaning[locale]) setScore((value) => value + 1);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (selected || finished) return;
    const keys = ['1', '2', '3', '4'];
    const optionIndex = keys.indexOf(event.key);
    if (optionIndex < 0 || !options[optionIndex]) return;
    event.preventDefault();
    choose(options[optionIndex]!);
  }

  function advance() {
    if (index >= lab.vocabulary.length - 1) {
      setFinished(true);
      onComplete(score);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    onReset();
  }

  return (
    <div className="topic-lab__quick-check" aria-labelledby="topic-lab-quick-check-title" tabIndex={0} onKeyDown={handleKeys}>
      <div className="topic-lab__quick-check-head">
        <div>
          <p className="eyebrow eyebrow--dark">QUICK CHECK / 04</p>
          <h3 id="topic-lab-quick-check-title">{locale === 'en' ? 'Can you recognise the meaning?' : 'Мағынасын тани аласың ба?'}</h3>
        </div>
        <span>{finished ? `${score}/4` : `${String(index + 1).padStart(2, '0')} / 04`}</span>
      </div>

      {finished ? (
        <div className="topic-lab__quick-check-result" aria-live="polite">
          <strong>{score}/4</strong>
          <div>
            <h4>{locale === 'en' ? (score === 4 ? 'Clean recall.' : 'One more pass will make it stick.') : (score === 4 ? 'Барлығы есте.' : 'Тағы бір қайталау көмектеседі.')}</h4>
            <p>{locale === 'en' ? 'This is a practice score only. Your canonical mastery and XP stay unchanged.' : 'Бұл тек жаттығу ұпайы. Негізгі mastery және XP өзгермейді.'}</p>
          </div>
          <button type="button" className="button button--ghost" onClick={restart}>{locale === 'en' ? 'Try again' : 'Қайта көр'}</button>
        </div>
      ) : current ? (
        <div className="topic-lab__quick-check-body">
          <div className="topic-lab__quick-check-word">
            <span>{locale === 'en' ? 'Choose the meaning · keys 1–4' : 'Мағынасын таңда · 1–4 пернелері'}</span>
            <strong lang="en">{current.term}</strong>
            <PronunciationControl terms={[current.term]} locale={locale} />
          </div>
          <div className="topic-lab__quick-check-options">
            {options.map((option, optionIndex) => {
              const isSelected = selected === option;
              const isCorrect = option === current.meaning[locale];
              const stateClass = selected
                ? isCorrect ? ' topic-lab__quick-check-option--correct' : isSelected ? ' topic-lab__quick-check-option--wrong' : ''
                : '';
              return (
                <button
                  key={option}
                  type="button"
                  className={`topic-lab__quick-check-option${stateClass}`}
                  onClick={() => choose(option)}
                  disabled={Boolean(selected)}
                >
                  <span>{optionIndex + 1}</span>
                  <strong>{option}</strong>
                </button>
              );
            })}
          </div>
          <div className="topic-lab__quick-check-feedback" aria-live="polite">
            {selected ? (
              <>
                <p><strong>{correct ? (locale === 'en' ? 'Correct.' : 'Дұрыс.') : (locale === 'en' ? 'Not quite.' : 'Әлі емес.')}</strong> {correct ? current.example[locale] : (locale === 'en' ? `The best match is “${current.meaning.en}”.` : `Дұрыс мағынасы: «${current.meaning.kk}».`)}</p>
                <button type="button" className="button button--pulse" onClick={advance}>{index === lab.vocabulary.length - 1 ? (locale === 'en' ? 'See result' : 'Нәтижені көр') : (locale === 'en' ? 'Next word' : 'Келесі сөз')} →</button>
              </>
            ) : <p>{locale === 'en' ? 'No penalty for guessing — this is retrieval practice.' : 'Қате болжам үшін жаза жоқ — бұл еске түсіру жаттығуы.'}</p>}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TopicLabReadingCheck({ lab, locale, onComplete, onReset }: { lab: TopicLabContent; locale: Locale; onComplete: (score: number) => void; onReset: () => void }) {
  const questions = topicReadingChecks[lab.id];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = questions[index]!;

  function choose(optionIndex: number) {
    if (selected !== null || finished) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) setScore((value) => value + 1);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (selected !== null || finished) return;
    const optionIndex = ['1', '2', '3'].indexOf(event.key);
    if (optionIndex < 0) return;
    event.preventDefault();
    choose(optionIndex);
  }

  function next() {
    if (index >= questions.length - 1) {
      setFinished(true);
      onComplete(score);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    onReset();
  }

  return (
    <section className="topic-lab__reading-check topic-lab__deferred-section" id="reading-check" aria-labelledby="topic-lab-reading-check-title">
      <div className="section-shell topic-lab__reading-check-shell">
        <div className="topic-lab__section-heading">
          <div><p className="eyebrow eyebrow--dark">READING CHECK / 03</p><h2 id="topic-lab-reading-check-title">{locale === 'en' ? 'Did the system story stick?' : 'Жүйелік әңгіме есте қалды ма?'}</h2></div>
          <p>{locale === 'en' ? 'Retrieve the idea without scrolling back first. Explanations are learning support, not a penalty.' : 'Алдымен артқа қарамай идеяны еске түсір. Түсіндірме — жаза емес, оқу қолдауы.'}</p>
        </div>
        <div className="topic-lab__reading-check-card" tabIndex={0} onKeyDown={handleKeys}>
          {finished ? (
            <div className="topic-lab__reading-check-result" aria-live="polite">
              <span>{locale === 'en' ? 'READING SIGNAL COMPLETE' : 'ОҚУ СИГНАЛЫ АЯҚТАЛДЫ'}</span>
              <strong>{score}/{questions.length}</strong>
              <h3>{locale === 'en' ? (score === questions.length ? 'The story connected.' : 'Re-read one chapter, then test the model again.') : (score === questions.length ? 'Әңгіме байланыстырылды.' : 'Бір бөлімді қайта оқып, модельді тағы тексер.')}</h3>
              <p>{locale === 'en' ? 'Practice only: canonical mastery and XP remain unchanged.' : 'Тек жаттығу: негізгі mastery және XP өзгермейді.'}</p>
              <button type="button" className="button button--ghost" onClick={restart}>{locale === 'en' ? 'Run again' : 'Қайта орында'}</button>
            </div>
          ) : (
            <>
              <div className="topic-lab__reading-check-meta"><span>{String(index + 1).padStart(2, '0')} / 03</span><span>{locale === 'en' ? 'KEYS 1–3' : '1–3 ПЕРНЕЛЕРІ'}</span></div>
              <h3>{current.prompt[locale]}</h3>
              <div className="topic-lab__reading-check-options">
                {current.options.map((option, optionIndex) => {
                  const resolved = selected !== null;
                  const isCorrect = optionIndex === current.correct;
                  const isSelected = selected === optionIndex;
                  const stateClass = resolved ? isCorrect ? ' topic-lab__reading-check-option--correct' : isSelected ? ' topic-lab__reading-check-option--wrong' : ' topic-lab__reading-check-option--muted' : '';
                  return <button key={option.en} type="button" className={`topic-lab__reading-check-option${stateClass}`} disabled={resolved} onClick={() => choose(optionIndex)}><span>{optionIndex + 1}</span><strong>{option[locale]}</strong></button>;
                })}
              </div>
              <div className="topic-lab__reading-check-feedback" aria-live="polite">
                {selected !== null ? <><p><strong>{selected === current.correct ? (locale === 'en' ? 'Yes.' : 'Дұрыс.') : (locale === 'en' ? 'Re-read the connection.' : 'Байланысты қайта қара.')}</strong> {current.explanation[locale]}</p><button type="button" className="button button--pulse" onClick={next}>{index === questions.length - 1 ? (locale === 'en' ? 'See reading result →' : 'Оқу нәтижесін көр →') : (locale === 'en' ? 'Next reading question →' : 'Келесі оқу сұрағы →')}</button></> : <p>{locale === 'en' ? 'Choose the strongest explanation.' : 'Ең мықты түсіндіруді таңда.'}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function TopicLabSystemCheck({ lab, locale, onComplete, onReset }: { lab: TopicLabContent; locale: Locale; onComplete: (score: number) => void; onReset: () => void }) {
  const depth = topicDepth[lab.id];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = depth.checks[index]!;

  function choose(optionIndex: number) {
    if (selected !== null || finished) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) setScore((value) => value + 1);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (selected !== null || finished) return;
    const optionIndex = ['1', '2', '3'].indexOf(event.key);
    if (optionIndex < 0) return;
    event.preventDefault();
    choose(optionIndex);
  }

  function next() {
    if (index >= depth.checks.length - 1) {
      setFinished(true);
      onComplete(score);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    onReset();
  }

  return (
    <section className="topic-lab__system-check topic-lab__deferred-section" id="system-check" aria-labelledby="topic-lab-system-check-title">
      <div className="section-shell">
        <div className="topic-lab__section-heading">
          <div><p className="eyebrow eyebrow--dark">CONNECTION CHECK / 03</p><h2 id="topic-lab-system-check-title">{locale === 'en' ? 'Can you reason through the system?' : 'Жүйені түсіндіріп ойлай аласың ба?'}</h2></div>
          <p>{locale === 'en' ? 'This is an orientation check, not canonical mastery. Use the explanation after each answer to refine your mental model.' : 'Бұл негізгі mastery емес, түсінікті тексеру. Әр жауаптан кейінгі түсіндіру арқылы ой үлгіңді нақтыла.'}</p>
        </div>
        <div className="topic-lab__system-check-card" tabIndex={0} onKeyDown={handleKeys}>
          {finished ? (
            <div className="topic-lab__system-result" aria-live="polite">
              <span>{locale === 'en' ? 'CONNECTION CHECK COMPLETE' : 'SYSTEM CHECK АЯҚТАЛДЫ'}</span>
              <strong>{score}/{depth.checks.length}</strong>
              <h3>{locale === 'en' ? (score === depth.checks.length ? 'The connections are clear.' : 'Review the briefing, then run it once more.') : (score === depth.checks.length ? 'Байланыстар анық.' : 'Briefing-ті қарап, тағы бір рет орында.')}</h3>
              <button type="button" className="button button--ghost" onClick={restart}>{locale === 'en' ? 'Run again ↻' : 'Қайта орында ↻'}</button>
            </div>
          ) : (
            <>
              <div className="topic-lab__system-meta"><span>{String(index + 1).padStart(2, '0')} / 03</span><span>{locale === 'en' ? 'KEYS 1–3' : '1–3 ПЕРНЕЛЕРІ'}</span></div>
              <h3>{current.prompt[locale]}</h3>
              <div className="topic-lab__system-options">
                {current.options.map((option, optionIndex) => {
                  const resolved = selected !== null;
                  const isCorrect = optionIndex === current.correct;
                  const isSelected = selected === optionIndex;
                  const className = resolved ? isCorrect ? 'topic-lab__system-option topic-lab__system-option--correct' : isSelected ? 'topic-lab__system-option topic-lab__system-option--wrong' : 'topic-lab__system-option topic-lab__system-option--muted' : 'topic-lab__system-option';
                  return <button key={option.en} type="button" className={className} disabled={resolved} onClick={() => choose(optionIndex)}><span>{optionIndex + 1}</span><strong>{option[locale]}</strong></button>;
                })}
              </div>
              <div className="topic-lab__system-feedback" aria-live="polite">
                {selected !== null ? <><p><strong>{selected === current.correct ? (locale === 'en' ? 'Connected.' : 'Байланыс дұрыс.') : (locale === 'en' ? 'Re-route the idea.' : 'Ой бағытын түзет.')}</strong> {current.explanation[locale]}</p><button type="button" className="button button--pulse" onClick={next}>{index === depth.checks.length - 1 ? (locale === 'en' ? 'See result →' : 'Нәтижені көр →') : (locale === 'en' ? 'Next system question →' : 'Келесі жүйелік сұрақ →')}</button></> : <p>{locale === 'en' ? 'Choose the strongest system explanation.' : 'Ең мықты жүйелік түсіндіруді таңда.'}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function TopicLab({ lab }: { lab: TopicLabContent }) {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const depth = topicDepth[lab.id];
  const reading = topicReadings[lab.id];
  const [activeSection, setActiveSection] = useState('briefing');
  const [readingPracticeScore, setReadingPracticeScore] = useState<number | null>(null);
  const [wordPracticeScore, setWordPracticeScore] = useState<number | null>(null);
  const [systemPracticeScore, setSystemPracticeScore] = useState<number | null>(null);
  const completedPracticeSignals = Number(readingPracticeScore !== null) + Number(wordPracticeScore !== null) + Number(systemPracticeScore !== null);
  const sessionComplete = completedPracticeSignals === 3;
  const sessionFocus = readingPracticeScore !== null && wordPracticeScore !== null && systemPracticeScore !== null
    ? getTopicLabSessionFocus({ reading: readingPracticeScore, words: wordPracticeScore, system: systemPracticeScore })
    : null;

  useEffect(() => {
    const sectionIds = ['briefing', 'reading', 'reading-check', 'words', 'connections', 'sources', 'system-check'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const next = visible[0]?.target.id;
      if (next) setActiveSection(next);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = document.querySelector<HTMLElement>('.topic-lab__rail');
    const activeLink = rail?.querySelector<HTMLAnchorElement>(`a[href="#${activeSection}"]`);
    if (!activeLink) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    activeLink.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  return (
    <div className={`topic-lab topic-lab--${lab.id}`}>
      <ContextBreadcrumbs ariaLabel={locale === 'en' ? 'Topic location' : 'Тақырып орны'} items={[{ href: '/', label: locale === 'en' ? 'Home' : 'Басты бет' }, { href: '/learn', label: locale === 'en' ? 'Learn' : 'Оқу' }, { label: lab.title[locale] }]} />
      <nav className="topic-lab__rail" aria-label={locale === 'en' ? `${lab.title.en} learning sections` : `${lab.title.kk} оқу бөлімдері`}>
        <a href="#briefing" aria-current={activeSection === 'briefing' ? 'step' : undefined}><span>01</span>{locale === 'en' ? 'Briefing' : 'Түсінік'}</a>
        <a href="#reading" aria-current={activeSection === 'reading' ? 'step' : undefined}><span>02</span>{locale === 'en' ? 'Reading' : 'Оқу'}</a>
        <a href="#reading-check" aria-current={activeSection === 'reading-check' ? 'step' : undefined}><span>03</span>{locale === 'en' ? 'Read Check' : 'Оқу тесті'}</a>
        <a href="#words" aria-current={activeSection === 'words' ? 'step' : undefined}><span>04</span>{locale === 'en' ? 'Words' : 'Сөздер'}</a>
        <a href="#connections" aria-current={activeSection === 'connections' ? 'step' : undefined}><span>05</span>{locale === 'en' ? 'Connections' : 'Байланыс'}</a>
        <a href="#sources" aria-current={activeSection === 'sources' ? 'step' : undefined}><span>06</span>{locale === 'en' ? 'Sources' : 'Дереккөз'}</a>
        <a href="#system-check" aria-current={activeSection === 'system-check' ? 'step' : undefined}><span>07</span>{locale === 'en' ? 'Check' : 'Тексеру'}</a>
      </nav>

      <aside className="topic-lab__session-pulse" aria-label={locale === 'en' ? 'Topic Lab practice pulse' : 'Topic Lab жаттығу пульсі'}>
        <div className="section-shell topic-lab__session-pulse-shell">
          <div><span>{locale === 'en' ? 'SESSION PROGRESS' : 'LAB ПУЛЬСІ'}</span><strong>{completedPracticeSignals} / 03</strong></div>
          <div className="topic-lab__session-pulse-track" role="progressbar" aria-valuemin={0} aria-valuenow={completedPracticeSignals} aria-valuemax={3} aria-label={locale === 'en' ? 'Practice signals completed' : 'Аяқталған жаттығу сигналдары'}><i style={{ width: `${completedPracticeSignals * (100 / 3)}%` }} /></div>
          <p>{locale === 'en' ? 'Three practice signals: reading retrieval + vocabulary recall + system reasoning.' : 'Үш жаттығу сигналы: оқуды еске түсіру + сөздерді еске түсіру + жүйелік ойлау.'}</p>
        </div>
      </aside>

      <section className="topic-lab__hero" aria-labelledby="topic-lab-title">
        <div className="section-shell topic-lab__hero-grid">
          <div className="topic-lab__intro">
            <p className="eyebrow eyebrow--dark">TOPIC LAB / {lab.index}</p>
            <h1 id="topic-lab-title">{lab.title[locale]}</h1>
            <p className="topic-lab__subtitle">{lab.subtitle[locale]}</p>
            <p className="topic-lab__overview">{lab.overview[locale]}</p>
            <div className="topic-lab__actions">
              <a href="#briefing" className="button button--pulse">{locale === 'en' ? 'Enter the system ↓' : 'Жүйеге кір ↓'}</a>
              <Link href={lab.actionHref} className="button button--ghost">{lab.actionLabel[locale]} →</Link>
            </div>
          </div>
          <div className="topic-lab__visual" aria-hidden="true" style={{ viewTransitionName: `topic-${lab.id}` } as CSSProperties}>
            <span className="topic-lab__orbit topic-lab__orbit--one" />
            <span className="topic-lab__orbit topic-lab__orbit--two" />
            <span className="topic-lab__orbit topic-lab__orbit--three" />
            <div className="topic-lab__core"><PulseHeart size={82} /><strong>{lab.signal[locale]}</strong></div>
            <i className="topic-lab__particle topic-lab__particle--one" />
            <i className="topic-lab__particle topic-lab__particle--two" />
            <i className="topic-lab__particle topic-lab__particle--three" />
          </div>
        </div>
      </section>

      <section className="topic-lab__briefing" id="briefing" aria-labelledby="topic-lab-briefing-title">
        <div className="section-shell">
          <div className="topic-lab__briefing-lead">
            <p className="eyebrow eyebrow--dark">KEY IDEAS / 03</p>
            <h2 id="topic-lab-briefing-title">{locale === 'en' ? <>Don’t memorise the topic.<br />Build the model.</> : <>Тақырыпты жаттама.<br />Жүйелік модель құр.</>}</h2>
            <p>{depth.thesis[locale]}</p>
          </div>
          <div className="topic-lab__insight-grid">
            {depth.insights.map((insight, index) => <article key={insight.label.en}><span>{String(index + 1).padStart(2, '0')} / {insight.label[locale]}</span><strong>{insight.value[locale]}</strong><p>{insight.body[locale]}</p></article>)}
          </div>
        </div>
      </section>

      <section className="topic-lab__reading topic-lab__deferred-section" id="reading" aria-labelledby="topic-lab-reading-title">
        <div className="section-shell">
          <div className="topic-lab__section-heading topic-lab__reading-heading">
            <div><p className="eyebrow eyebrow--dark">READING / 03 CHAPTERS</p><h2 id="topic-lab-reading-title">{locale === 'en' ? 'Read the system as a short story.' : 'Жүйені қысқа әңгіме ретінде оқы.'}</h2></div>
            <p>{locale === 'en' ? 'Three compact chapters connect the environmental idea to useful English before you move into retrieval practice.' : 'Үш ықшам бөлім экологиялық идеяны пайдалы ағылшын тілімен байланыстырады, содан кейін еске түсіру жаттығуына өтесің.'}</p>
          </div>
          <div className="topic-lab__reading-grid">
            {reading.map((chapter, index) => (
              <article className="topic-lab__reading-card" key={chapter.title.en}>
                <div className="topic-lab__reading-card-meta"><span>{String(index + 1).padStart(2, '0')} / 03</span><span>{chapter.label[locale]}</span></div>
                <h3>{chapter.title[locale]}</h3>
                <p>{chapter.body[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TopicLabReadingCheck lab={lab} locale={locale} onComplete={setReadingPracticeScore} onReset={() => setReadingPracticeScore(null)} />

      <section className="topic-lab__words topic-lab__deferred-section" id="words" aria-labelledby="topic-lab-words-title">
        <div className="section-shell">
          <div className="topic-lab__section-heading">
            <div><p className="eyebrow eyebrow--dark">LANGUAGE / 04</p><h2 id="topic-lab-words-title">{locale === 'en' ? 'Four words that unlock the topic.' : 'Тақырыпты ашатын төрт сөз.'}</h2></div>
            <p>{locale === 'en' ? 'Read the definition, then use the example to see the word inside a real environmental sentence.' : 'Анықтаманы оқып, кейін сөздің экологиялық сөйлемде қалай қолданылатынын көр.'}</p>
          </div>
          <div className="topic-lab__vocab-grid">
            {lab.vocabulary.map((item, index) => (
              <article key={item.term} className="topic-lab__vocab-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3 lang="en">{item.term}</h3>
                <strong>{item.meaning[locale]}</strong>
                <p>{item.example[locale]}</p>
                <PronunciationControl terms={[item.term]} locale={locale} />
              </article>
            ))}
          </div>
          <TopicLabQuickCheck lab={lab} locale={locale} onComplete={setWordPracticeScore} onReset={() => setWordPracticeScore(null)} />
        </div>
      </section>

      <section className="topic-lab__connections topic-lab__deferred-section" id="connections" aria-labelledby="topic-lab-connections-title">
        <div className="section-shell">
          <div className="topic-lab__section-heading">
            <div><p className="eyebrow eyebrow--dark">CONNECTIONS</p><h2 id="topic-lab-connections-title">{locale === 'en' ? 'See what connects.' : 'Ненің байланысатынын көр.'}</h2></div>
            <p>{locale === 'en' ? 'Environmental problems rarely happen alone. Follow three relationships instead of memorizing isolated facts.' : 'Экологиялық мәселелер жеке болмайды. Бөлек фактілерді жаттаудың орнына үш байланысты бақыла.'}</p>
          </div>
          <div className="topic-lab__connection-list">
            {lab.connections.map((connection, index) => (
              <article key={`${connection.from.en}-${connection.to.en}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{connection.from[locale]}</strong><i aria-hidden="true">→</i><strong>{connection.to[locale]}</strong></div>
                <p>{connection.note[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="topic-lab__sources topic-lab__deferred-section" id="sources" aria-labelledby="topic-lab-sources-title">
        <div className="section-shell">
          <div className="topic-lab__section-heading">
            <div><p className="eyebrow eyebrow--dark">SOURCES / OFFICIAL</p><h2 id="topic-lab-sources-title">{locale === 'en' ? 'Check the source layer.' : 'Дереккөз қабатын тексер.'}</h2></div>
            <p>{locale === 'en' ? 'Topic Labs are compact orientation experiences. Their environmental claims point to current official material so the learning layer stays inspectable.' : 'Topic Lab — қысқа бағдарлау тәжірибесі. Экологиялық тұжырымдар тексеруге болатын ресми материалдарға сүйенеді.'}</p>
          </div>
          <SourceDisclosure sourceIds={lab.sourceIds} locale={locale} />
        </div>
      </section>

      <TopicLabSystemCheck lab={lab} locale={locale} onComplete={setSystemPracticeScore} onReset={() => setSystemPracticeScore(null)} />

      {sessionComplete ? (
        <section className="topic-lab__session-recap" aria-live="polite">
          <div className="section-shell topic-lab__session-recap-grid">
            <div>
              <p className="eyebrow eyebrow--dark">LAB SESSION / COMPLETE</p>
              <h2>{locale === 'en' ? 'Three signals connected.' : 'Үш сигнал байланыстырылды.'}</h2>
              <p>{locale === 'en' ? 'You completed all three practice loops. This recap is session-only: canonical mastery and XP still change only inside the main learning engine.' : 'Сен үш жаттығу циклін де аяқтадың. Бұл тек осы сессияның қорытындысы: негізгі mastery және XP тек негізгі оқу жүйесінде өзгереді.'}</p>
            </div>
            <div>
              <div className="topic-lab__session-recap-scores">
                <article><span>{locale === 'en' ? 'READING' : 'ОҚУ'}</span><strong>{readingPracticeScore}/3</strong></article>
                <article><span>{locale === 'en' ? 'WORDS' : 'СӨЗДЕР'}</span><strong>{wordPracticeScore}/4</strong></article>
                <article><span>{locale === 'en' ? 'SYSTEM' : 'ЖҮЙЕ'}</span><strong>{systemPracticeScore}/3</strong></article>
              </div>
              {sessionFocus ? (
                <div className="topic-lab__session-recap-focus">
                  <span>{locale === 'en' ? 'NEXT BEST MOVE' : 'КЕЛЕСІ ЕҢ ТИІМДІ ҚАДАМ'}</span>
                  <strong>{sessionFocus.label[locale]}</strong>
                  <p>{sessionFocus.note[locale]}</p>
                  <Link className="button button--pulse" href={sessionFocus.href}>{sessionFocus.label[locale]} →</Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <TopicSequenceNav currentId={lab.id} locale={locale} />

      <section className="topic-lab__next" id="next">
        <div className="section-shell topic-lab__next-grid">
          <div><p className="eyebrow">NEXT / CONNECT</p><h2>{locale === 'en' ? 'Turn the idea into practice.' : 'Идеяны тәжірибеге айналдыр.'}</h2><p>{locale === 'en' ? 'Topic Labs build orientation. Canonical lessons, Eco Game and Eco Action collect the deeper learning evidence.' : 'Topic Lab жалпы түсінік береді. Терең оқу дәлелі негізгі сабақтарда, Eco Game және Eco Action ішінде жиналады.'}</p></div>
          <div><Link href={lab.nextHref} className="button button--light">{lab.nextLabel[locale]} →</Link><Link href="/learn" className="text-link">{locale === 'en' ? 'Back to all learning' : 'Барлық оқуға қайту'}</Link></div>
        </div>
      </section>
    </div>
  );
}

// legacy UI aliases: LAB PULSE / SYSTEM BRIEFING / SYSTEM CHECK / EVIDENCE
