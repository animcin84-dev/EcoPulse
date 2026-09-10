'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { climateChangeModule } from '@/content/climate-change-module';
import { scienceSourcesById } from '@/content/science-sources';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';
import { SourceDisclosure } from '../lesson/SourceDisclosure';
import { PronunciationControl } from '../lesson/PronunciationControl';
import { TopicSequenceNav } from './TopicSequenceNav';
import { ContextBreadcrumbs } from '../navigation/ContextBreadcrumbs';

const climateSourceIds = [...new Set(climateChangeModule.dataCards.map((card) => card.sourceId))];

const climateJourneySections = [
  { id: 'story', en: 'Story', kk: 'Жүйе' },
  { id: 'reading-check', en: 'Reading', kk: 'Оқу' },
  { id: 'vocabulary', en: 'Words', kk: 'Сөздер' },
  { id: 'climate-sources', en: 'Sources', kk: 'Деректер' },
] as const;

function ClimateJourneyRail({ locale }: { locale: 'en' | 'kk' }) {
  const [activeId, setActiveId] = useState<(typeof climateJourneySections)[number]['id']>('story');
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sections = climateJourneySections
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const nextId = visible.target.id as (typeof climateJourneySections)[number]['id'];
      setActiveId(nextId);
      const activeLink = railRef.current?.querySelector<HTMLElement>(`a[href="#${nextId}"]`);
      if (activeLink && window.matchMedia('(max-width: 760px)').matches) {
        activeLink.scrollIntoView({ behavior: prefersReducedMotionForRail() ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
      }
    }, { rootMargin: '-28% 0px -54% 0px', threshold: [0, .15, .4, .7] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={railRef} className="climate-journey-rail" aria-label={locale === 'en' ? 'Climate module sections' : 'Климат модулінің бөлімдері'}>
      <span className="climate-journey-rail__label">{locale === 'en' ? 'Journey' : 'Жол'}</span>
      <div>
        {climateJourneySections.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} aria-current={activeId === item.id ? 'step' : undefined}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{item[locale]}</strong>
          </a>
        ))}
      </div>
    </nav>
  );
}

function prefersReducedMotionForRail() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
}

function ClimateSystemVisual() {
  return (
    <div className="climate-system-visual" aria-hidden="true" style={{ viewTransitionName: 'topic-climate-change' }}>
      <div className="climate-system-visual__sun" />
      <div className="climate-system-visual__earth">
        <span className="climate-system-visual__ocean" />
        <span className="climate-system-visual__land climate-system-visual__land--one" />
        <span className="climate-system-visual__land climate-system-visual__land--two" />
        <span className="climate-system-visual__ice" />
      </div>
      <span className="climate-system-visual__ring climate-system-visual__ring--one" />
      <span className="climate-system-visual__ring climate-system-visual__ring--two" />
      <span className="climate-system-visual__label climate-system-visual__label--air">ATMOSPHERE</span>
      <span className="climate-system-visual__label climate-system-visual__label--ice">ICE</span>
      <span className="climate-system-visual__label climate-system-visual__label--ocean">OCEAN</span>
      <span className="climate-system-visual__label climate-system-visual__label--life">LIFE</span>
    </div>
  );
}

function ClimateReadingCheck({ locale }: { locale: 'en' | 'kk' }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const question = climateChangeModule.readingCheck[index]!;

  function choose(optionId: string) {
    if (resolved || finished) return;
    const correct = optionId === question.correctOptionId;
    setSelected(optionId);
    setResolved(true);
    if (correct) setScore((value) => value + 1);
  }

  function next() {
    if (index >= climateChangeModule.readingCheck.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setResolved(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setResolved(false);
    setScore(0);
    setFinished(false);
    requestAnimationFrame(() => focusRef.current?.focus());
  }

  useEffect(() => {
    if (finished) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || resolved) return;
      const optionIndex = Number(event.key) - 1;
      if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= question.options.length) return;
      event.preventDefault();
      choose(question.options[optionIndex]!.id);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finished, question, resolved]);

  useEffect(() => {
    if (index === 0) return;
    focusRef.current?.focus({ preventScroll: true });
  }, [index]);

  const progress = finished ? 100 : ((index + 1) / climateChangeModule.readingCheck.length) * 100;

  return (
    <section className="climate-reading-check" id="reading-check" aria-labelledby="climate-reading-title">
      <div className="section-shell climate-practice-shell">
        <div className="climate-practice-heading">
          <div>
            <p className="eyebrow eyebrow--dark">READING CHECK / 05</p>
            <h2 id="climate-reading-title">{locale === 'en' ? 'Read for meaning.\nNot just words.' : 'Мағынаны түсініп оқы.\nТек сөздерді емес.'}</h2>
          </div>
          <p>{locale === 'en' ? 'Five focused questions. Use keys 1–3 or choose an answer. This practice does not change your canonical mastery score.' : 'Бес нақты сұрақ. 1–3 пернелерін немесе жауап батырмаларын қолдан. Бұл жаттығу негізгі mastery көрсеткішін өзгертпейді.'}</p>
        </div>

        <div className="climate-progress" role="progressbar" aria-label={locale === 'en' ? 'Reading check progress' : 'Оқу тапсырмасының прогресі'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {finished ? (
          <div className="climate-practice-result" tabIndex={-1} ref={focusRef}>
            <span>{locale === 'en' ? 'READING COMPLETE' : 'ОҚУ АЯҚТАЛДЫ'}</span>
            <strong>{score} / {climateChangeModule.readingCheck.length}</strong>
            <h3>{score >= 4 ? (locale === 'en' ? 'You followed the system.' : 'Сен жүйені түсіндің.') : (locale === 'en' ? 'One more pass will make the links clearer.' : 'Тағы бір рет оқу байланыстарды айқынырақ етеді.')}</h3>
            <div className="climate-practice-result__actions">
              <button type="button" className="button button--dark" onClick={restart}>{locale === 'en' ? 'Try again ↻' : 'Қайта көру ↻'}</button>
              <a className="text-link text-link--dark" href="#vocabulary">{locale === 'en' ? 'Continue to vocabulary ↓' : 'Сөздікке өту ↓'}</a>
            </div>
          </div>
        ) : (
          <div className="climate-question" ref={focusRef} tabIndex={-1} aria-labelledby={`climate-question-${question.id}`}>
            <div className="climate-question__meta">
              <span>{String(index + 1).padStart(2, '0')} / 05</span>
              <span>{locale === 'en' ? 'KEYS 1–3 ENABLED' : '1–3 ПЕРНЕЛЕРІ БЕЛСЕНДІ'}</span>
            </div>
            <h3 id={`climate-question-${question.id}`}>{question.question}</h3>
            <div className="climate-answer-grid" role="group" aria-label={question.question}>
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === option.id;
                const isCorrect = option.id === question.correctOptionId;
                const className = resolved
                  ? isCorrect
                    ? 'climate-answer climate-answer--correct'
                    : isSelected
                      ? 'climate-answer climate-answer--incorrect'
                      : 'climate-answer climate-answer--muted'
                  : 'climate-answer';
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={className}
                    onClick={() => choose(option.id)}
                    disabled={resolved}
                    aria-pressed={isSelected}
                    aria-keyshortcuts={String(optionIndex + 1)}
                  >
                    <span>{String(optionIndex + 1).padStart(2, '0')}</span>
                    <strong>{option.text}</strong>
                    {resolved && isCorrect ? <em>✓ {locale === 'en' ? 'SUPPORTED' : 'ДҰРЫС'}</em> : null}
                    {resolved && isSelected && !isCorrect ? <em>↗ {locale === 'en' ? 'COMPARE' : 'САЛЫСТЫР'}</em> : null}
                  </button>
                );
              })}
            </div>
            {resolved ? (
              <div className="climate-feedback" role="status" aria-live="polite">
                <div>
                  <strong>{selected === question.correctOptionId ? (locale === 'en' ? 'Connection found.' : 'Байланыс табылды.') : (locale === 'en' ? 'Compare the claim.' : 'Тұжырымды салыстыр.')}</strong>
                  <p>{question.explanation[locale]}</p>
                </div>
                <button type="button" className="button button--dark" onClick={next}>{index === climateChangeModule.readingCheck.length - 1 ? (locale === 'en' ? 'See result →' : 'Нәтижені көру →') : (locale === 'en' ? 'Next question →' : 'Келесі сұрақ →')}</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function ClimateVocabularyPractice({ locale }: { locale: 'en' | 'kk' }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const item = climateChangeModule.vocabulary[index]!;

  const options = useMemo(() => {
    const values = [item.meaning.kk, ...item.distractors];
    const shift = index % values.length;
    return [...values.slice(shift), ...values.slice(0, shift)];
  }, [index, item]);

  function choose(value: string) {
    if (resolved || finished) return;
    setSelected(value);
    setResolved(true);
    if (value === item.meaning.kk) setCorrectCount((count) => count + 1);
  }

  function next() {
    if (index >= climateChangeModule.vocabulary.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setResolved(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setResolved(false);
    setCorrectCount(0);
    setFinished(false);
  }

  useEffect(() => {
    if (finished) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || resolved) return;
      const optionIndex = Number(event.key) - 1;
      if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= options.length) return;
      event.preventDefault();
      choose(options[optionIndex]!);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finished, options, resolved]);

  useEffect(() => {
    if (index === 0) return;
    focusRef.current?.focus({ preventScroll: true });
  }, [index]);

  const progress = finished ? 100 : ((index + 1) / climateChangeModule.vocabulary.length) * 100;

  return (
    <section className="climate-vocabulary-practice" id="vocabulary" aria-labelledby="climate-vocab-title">
      <div className="section-shell">
        <div className="climate-vocab-intro">
          <div>
            <p className="eyebrow eyebrow--dark">VOCABULARY PRACTICE / 10</p>
            <h2 id="climate-vocab-title">{locale === 'en' ? 'Build climate\nlanguage.' : 'Климат тілін\nүйрен.'}</h2>
          </div>
          <p>{locale === 'en' ? 'First scan the deck. Then complete a ten-card recognition sprint in Kazakh.' : 'Алдымен карточкаларды қарап шық. Содан кейін қазақша мағына бойынша он карточкалық recognition sprint орында.'}</p>
        </div>

        <div className="climate-vocab-deck" aria-label={locale === 'en' ? 'Climate vocabulary deck' : 'Климат сөздігі'}>
          {climateChangeModule.vocabulary.map((word, wordIndex) => (
            <article className={`climate-vocab-card climate-vocab-card--${word.tone}`} key={word.id}>
              <div className="climate-vocab-card__top"><span>{String(wordIndex + 1).padStart(2, '0')}</span><span>{word.tone.toUpperCase()}</span></div>
              <div className="climate-vocab-card__word">
                <h3 lang="en">{word.term}</h3>
                <PronunciationControl terms={[word.term]} locale={locale} />
              </div>
              <p lang="kk" className="climate-vocab-card__meaning">{word.meaning.kk}</p>
              <p lang="en">{word.definition}</p>
              <blockquote lang="en">{word.example}</blockquote>
            </article>
          ))}
        </div>

        <div className="climate-vocab-game" ref={focusRef} tabIndex={-1}>
          <div className="climate-vocab-game__header">
            <div>
              <span>{locale === 'en' ? 'RECOGNITION SPRINT' : 'ТАНУ ЖАТТЫҒУЫ'}</span>
              <strong>{finished ? '10 / 10' : `${String(index + 1).padStart(2, '0')} / 10`}</strong>
            </div>
            <div className="climate-vocab-game__progress" role="progressbar" aria-label={locale === 'en' ? 'Vocabulary practice progress' : 'Сөздік жаттығу прогресі'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ width: `${progress}%` }} /></div>
          </div>

          {finished ? (
            <div className="climate-vocab-result">
              <PulseHeart size={64} labelled />
              <strong>{correctCount} / 10</strong>
              <h3>{locale === 'en' ? 'Recognition pass complete.' : 'Тану жаттығуы аяқталды.'}</h3>
              <p>{locale === 'en' ? 'For canonical mastery, continue into the structured lesson path where EcoPulse collects recognition, recall and context evidence separately.' : 'Негізгі mastery үшін құрылымдалған сабақтарға өт: EcoPulse recognition, recall және context дәлелдерін бөлек жинайды.'}</p>
              <div className="climate-vocab-result__actions">
                <Link className="button button--pulse" href="/lesson/atmosphere">{locale === 'en' ? 'Start structured lesson →' : 'Негізгі сабақты бастау →'}</Link>
                <button type="button" className="button button--ghost" onClick={restart}>{locale === 'en' ? 'Replay sprint ↻' : 'Қайта ойнау ↻'}</button>
              </div>
            </div>
          ) : (
            <>
              <div className={`climate-vocab-prompt climate-vocab-prompt--${item.tone}`}>
                <span>{locale === 'en' ? 'WHAT DOES THIS MEAN?' : 'БҰЛ НЕНІ БІЛДІРЕДІ?'}</span>
                <div className="climate-vocab-prompt__word">
                  <h3 lang="en">{item.term}</h3>
                  <PronunciationControl terms={[item.term]} locale={locale} />
                </div>
                <p lang="en">{item.definition}</p>
              </div>
              <div className="climate-vocab-options" role="group" aria-label={`${item.term} meaning`}>
                {options.map((value, optionIndex) => {
                  const correct = value === item.meaning.kk;
                  const chosen = selected === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => choose(value)}
                      disabled={resolved}
                      aria-pressed={chosen}
                      aria-keyshortcuts={String(optionIndex + 1)}
                      className={resolved ? correct ? 'climate-vocab-option climate-vocab-option--correct' : chosen ? 'climate-vocab-option climate-vocab-option--incorrect' : 'climate-vocab-option climate-vocab-option--muted' : 'climate-vocab-option'}
                    >
                      <span>{String(optionIndex + 1).padStart(2, '0')}</span>
                      <strong lang="kk">{value}</strong>
                    </button>
                  );
                })}
              </div>
              {resolved ? (
                <div className="climate-feedback climate-feedback--vocab" role="status" aria-live="polite">
                  <div>
                    <strong>{selected === item.meaning.kk ? (locale === 'en' ? 'Meaning connected.' : 'Мағына байланыстырылды.') : (locale === 'en' ? `Answer: ${item.meaning.kk}` : `Жауап: ${item.meaning.kk}`)}</strong>
                    <p lang="en">{item.example}</p>
                  </div>
                  <button type="button" className="button button--dark" onClick={next}>{index === 9 ? (locale === 'en' ? 'Finish sprint →' : 'Аяқтау →') : (locale === 'en' ? 'Next word →' : 'Келесі сөз →')}</button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function ClimateChangeModule() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;

  return (
    <div className="climate-module">
      <ContextBreadcrumbs ariaLabel={locale === 'en' ? 'Topic location' : 'Тақырып орны'} items={[{ href: '/', label: locale === 'en' ? 'Home' : 'Басты бет' }, { href: '/learn', label: locale === 'en' ? 'Learn' : 'Оқу' }, { label: locale === 'en' ? 'Climate Change' : 'Климаттың өзгеруі' }]} />
      <div className="climate-module__scroll-progress" aria-hidden="true"><span /></div>
      <section className="climate-module__hero" aria-labelledby="climate-module-title">
        <div className="section-shell climate-module__hero-grid">
          <div className="climate-module__hero-copy">
            <p className="eyebrow eyebrow--dark">{climateChangeModule.eyebrow[locale]}</p>
            <h1 id="climate-module-title">{locale === 'en' ? <>Climate<br /><span>change.</span></> : <>Климаттың<br /><span>өзгеруі.</span></>}</h1>
            <p className="climate-module__lede">{climateChangeModule.lede[locale]}</p>
            <div className="climate-module__hero-actions">
              <a className="button button--pulse" href="#story">{locale === 'en' ? 'Read the system ↓' : 'Жүйені оқу ↓'}</a>
              <a className="button button--ghost" href="#reading-check">{locale === 'en' ? 'Jump to reading check' : 'Оқу тапсырмасына өту'}</a>
            </div>
            <div className="climate-module__meta">
              <span>5 {locale === 'en' ? 'CHAPTERS' : 'БӨЛІМ'}</span>
              <span>5 {locale === 'en' ? 'READING QUESTIONS' : 'ОҚУ СҰРАҒЫ'}</span>
              <span>10 {locale === 'en' ? 'CORE WORDS' : 'НЕГІЗГІ СӨЗ'}</span>
            </div>
          </div>
          <ClimateSystemVisual />
        </div>
      </section>

      <section className="climate-data-strip" aria-label={locale === 'en' ? 'Climate evidence snapshot' : 'Климат деректерінің қысқаша көрінісі'}>
        <div className="section-shell climate-data-strip__grid">
          {climateChangeModule.dataCards.map((card) => {
            const source = scienceSourcesById[card.sourceId];
            return (
              <a className={`climate-data-card climate-data-card--${card.tone}`} href={source?.url} target="_blank" rel="noreferrer" key={card.id}>
                <span>{card.label[locale]}</span>
                <strong>{card.value}<small>{card.unit}</small></strong>
                <p>{card.context[locale]}</p>
                <em>{source?.institution ?? 'SOURCE'} ↗</em>
              </a>
            );
          })}
        </div>
      </section>

      <div className="section-shell climate-journey-rail-shell"><ClimateJourneyRail locale={locale} /></div>

      <section className="climate-story" id="story" aria-labelledby="climate-story-title">
        <div className="section-shell">
          <div className="climate-story__heading">
            <p className="eyebrow eyebrow--dark">READ / CONNECT / UNDERSTAND</p>
            <h2 id="climate-story-title">{locale === 'en' ? 'Climate change is\na chain of connections.' : 'Климаттың өзгеруі —\nбайланыстар тізбегі.'}</h2>
          </div>
          <div className="climate-story__chapters">
            {climateChangeModule.chapters.map((chapter) => (
              <article className={`climate-chapter climate-chapter--${chapter.accent}`} key={chapter.id}>
                <aside>
                  <span>{chapter.index}</span>
                  <p>{chapter.kicker[locale]}</p>
                </aside>
                <div className="climate-chapter__body">
                  <h3>{chapter.title[locale]}</h3>
                  {chapter.body.map((paragraph) => <p lang="en" key={paragraph}>{paragraph}</p>)}
                  <div className="climate-chapter__terms" aria-label={locale === 'en' ? 'Vocabulary in this chapter' : 'Осы бөлімдегі сөздер'}>
                    {chapter.terms.map((term) => <a href="#vocabulary" key={term}>{term}</a>)}
                  </div>
                </div>
                <div className="climate-chapter__signal" aria-hidden="true"><i /><i /><i /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClimateReadingCheck locale={locale} />
      <ClimateVocabularyPractice locale={locale} />

      <section className="climate-module__sources" id="climate-sources">
        <div className="section-shell climate-module__sources-grid">
          <div>
            <p className="eyebrow eyebrow--dark">SCIENCE LAYER / CHECKED 2026-09-10</p>
            <h2>{locale === 'en' ? 'Know where the\nnumbers come from.' : 'Сандардың қайдан\nшыққанын біл.'}</h2>
          </div>
          <SourceDisclosure sourceIds={climateSourceIds} locale={locale} />
        </div>
      </section>

      <TopicSequenceNav currentId="climate-change" locale={locale} />

      <section className="climate-module__next">
        <div className="section-shell climate-module__next-grid">
          <div>
            <p className="eyebrow">{locale === 'en' ? 'NEXT / GUIDED LEARNING PATH' : 'КЕЛЕСІ / НЕГІЗГІ ОҚУ ЖОЛЫ'}</p>
            <h2>{locale === 'en' ? 'Turn the overview\ninto mastery.' : 'Шолуды нақты\nбілімге айналдыр.'}</h2>
            <p>{locale === 'en' ? 'The structured lessons collect evidence separately for recognition, recall, context and delayed review.' : 'Құрылымдалған сабақтар recognition, recall, context және delayed review дәлелдерін бөлек жинайды.'}</p>
          </div>
          <div className="climate-module__next-actions">
            <Link className="button button--pulse" href="/lesson/atmosphere">{locale === 'en' ? 'Start with Atmosphere →' : 'Atmosphere сабағынан бастау →'}</Link>
            <Link className="button button--ghost-light" href="/game">{locale === 'en' ? 'Open Eco Game' : 'Eco Game ашу'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
