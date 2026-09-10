'use client';

import { useGuestProgress } from '@/components/progress/GuestProgressProvider';
import { updateLearningSettings, type MediaPreference, type MotionPreference, type PreferredLocale } from '@/domain/learning/settings';
import type { LearningLevel } from '@/domain/learning/onboarding';
import { DataControlsPanel } from './DataControlsPanel';

const copy = {
  en: {
    eyebrow: 'LEARNING SETTINGS',
    title: 'MAKE ECOPULSE\nWORK FOR YOU.',
    lede: 'Choose how lesson language support and motion behave. These preferences stay with your local learning progress and require no profile data.',
    language: 'LESSON LANGUAGE',
    languageNote: 'English remains the target language. Choose the default language used for lesson prompts and explanations.',
    english: 'ENGLISH',
    englishDetail: 'English-first learning with Kazakh meaning available when you need it.',
    kazakh: 'ҚАЗАҚША',
    kazakhDetail: 'Kazakh prompts and explanations while target environmental words remain in English.',
    level: 'LEARNING LEVEL',
    levelNote: 'Level changes support, not scientific facts or lesson order. You can change this without resetting progress.',
    a2: 'A2 / GUIDED',
    a2Detail: 'More Kazakh support, bilingual choices and earlier clues.',
    b1: 'B1 / STANDARD',
    b1Detail: 'English-first learning with support when you need it.',
    b2: 'B2 / IMPACT',
    b2Detail: 'Less hinting plus short English reasoning after Think decisions.',
    motion: 'MOTION',
    motionNote: 'Motion never carries information by itself. Reduced mode removes non-essential transitions and pulse movement.',
    system: 'SYSTEM',
    systemDetail: 'Follow your device accessibility preference.',
    reduced: 'REDUCED',
    reducedDetail: 'Minimize animation throughout EcoPulse.',
    media: 'INSTITUTIONAL MEDIA',
    mediaNote: 'Real NASA imagery is optional. Diagrams always preserve the lesson, and Auto also respects your browser Save-Data preference when available.',
    mediaAuto: 'AUTO',
    mediaAutoDetail: 'Use institutional imagery unless your browser requests reduced data.',
    mediaReduced: 'REDUCED DATA',
    mediaReducedDetail: 'Keep authored diagrams and do not request remote institutional images.',
    saved: 'SAVED LOCALLY',
  },
  kk: {
    eyebrow: 'ОҚУ БАПТАУЛАРЫ',
    title: 'ECOPULSE-ТЫ\nӨЗІҢЕ ЫҢҒАЙЛА.',
    lede: 'Сабақтағы тілдік қолдау мен қозғалысты таңда. Бұл баптаулар жергілікті оқу прогресімен сақталады және жеке профиль деректерін қажет етпейді.',
    language: 'САБАҚ ТІЛІ',
    languageNote: 'Ағылшын тілі негізгі оқу мақсаты болып қалады. Сабақ сұрақтары мен түсіндірмелерінің әдепкі тілін таңда.',
    english: 'ENGLISH',
    englishDetail: 'Ағылшынша негізгі оқу, қажет кезде қазақша мағына ашылады.',
    kazakh: 'ҚАЗАҚША',
    kazakhDetail: 'Сұрақтар мен түсіндірмелер қазақша, ал негізгі экологиялық сөздер ағылшынша қалады.',
    level: 'ОҚУ ДЕҢГЕЙІ',
    levelNote: 'Деңгей ғылыми фактілерді немесе сабақ ретін өзгертпейді, тек қолдауды өзгертеді. Прогресті жоғалтпай ауыстыра аласың.',
    a2: 'A2 / GUIDED',
    a2Detail: 'Қазақша қолдау көбірек, екі тілдегі жауаптар және ертерек кеңестер.',
    b1: 'B1 / STANDARD',
    b1Detail: 'Ағылшын тілі негізгі, қажет кезде қолдау бар.',
    b2: 'B2 / IMPACT',
    b2Detail: 'Кеңес азырақ және Think шешімдерінен кейін қысқа ағылшынша түсіндіру.',
    motion: 'ҚОЗҒАЛЫС',
    motionNote: 'Қозғалыс ақпаратты жалғыз өзі жеткізбейді. Reduced режимі қажет емес анимация мен pulse қозғалысын азайтады.',
    system: 'ЖҮЙЕ',
    systemDetail: 'Құрылғының accessibility баптауын қолдану.',
    reduced: 'АЗАЙТЫЛҒАН',
    reducedDetail: 'EcoPulse бойындағы анимацияны барынша азайту.',
    media: 'ИНСТИТУЦИОНАЛДЫҚ МЕДИА',
    mediaNote: 'NASA-ның нақты кескіндері міндетті емес. Диаграммалар сабақ мазмұнын толық сақтайды, ал Auto мүмкін болса браузердің Save-Data баптауын да ескереді.',
    mediaAuto: 'AUTO',
    mediaAutoDetail: 'Браузер деректі үнемдеуді сұрамаса, институционалдық кескіндерді қолдану.',
    mediaReduced: 'ДЕРЕКТІ ҮНЕМДЕУ',
    mediaReducedDetail: 'Авторлық диаграммаларды сақтау және сыртқы институционалдық кескіндерді сұрамау.',
    saved: 'ЖЕРГІЛІКТІ САҚТАЛДЫ',
  },
} as const;

export function LearningSettingsPanel() {
  const { state, hydrated, updateState } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const text = copy[locale];

  function setLocale(preferredLocale: PreferredLocale) {
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { preferredLocale }),
    }));
  }

  function setMotion(motion: MotionPreference) {
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { motion }),
    }));
  }

  function setMedia(media: MediaPreference) {
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { media }),
    }));
  }

  function setLevel(level: LearningLevel) {
    updateState((current) => ({
      ...current,
      onboarding: { ...current.onboarding, level },
    }));
  }

  if (!hydrated) {
    return (
      <section className="settings-shell settings-shell--loading">
        <div className="section-shell"><p className="eyebrow eyebrow--dark">LEARNING SETTINGS</p><h1>Loading<br />preferences…</h1></div>
      </section>
    );
  }

  return (
    <section className="settings-shell" aria-labelledby="settings-title">
      <div className="section-shell settings-intro">
        <p className="eyebrow eyebrow--dark">{text.eyebrow}</p>
        <h1 id="settings-title">{text.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1>
        <p className="settings-lede">{text.lede}</p>
        <p className="settings-saved">● {text.saved}</p>
      </div>

      <div className="section-shell settings-groups">
        <fieldset className="settings-group">
          <legend>{text.language}</legend>
          <p>{text.languageNote}</p>
          <div className="settings-options">
            <button type="button" className={locale === 'en' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
              <span>01</span><strong>{text.english}</strong><small>{text.englishDetail}</small>
            </button>
            <button type="button" className={locale === 'kk' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={locale === 'kk'} onClick={() => setLocale('kk')}>
              <span>02</span><strong>{text.kazakh}</strong><small>{text.kazakhDetail}</small>
            </button>
          </div>
        </fieldset>

        <fieldset className="settings-group">
          <legend>{text.level}</legend>
          <p>{text.levelNote}</p>
          <div className="settings-options settings-options--three">
            {(['A2', 'B1', 'B2'] as const).map((level, index) => {
              const activeLevel = state.onboarding.level ?? 'B1';
              const label = level === 'A2' ? text.a2 : level === 'B1' ? text.b1 : text.b2;
              const detail = level === 'A2' ? text.a2Detail : level === 'B1' ? text.b1Detail : text.b2Detail;
              return (
                <button key={level} type="button" className={activeLevel === level ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={activeLevel === level} onClick={() => setLevel(level)}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><small>{detail}</small>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="settings-group">
          <legend>{text.motion}</legend>
          <p>{text.motionNote}</p>
          <div className="settings-options">
            <button type="button" className={state.settings.motion === 'system' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={state.settings.motion === 'system'} onClick={() => setMotion('system')}>
              <span>01</span><strong>{text.system}</strong><small>{text.systemDetail}</small>
            </button>
            <button type="button" className={state.settings.motion === 'reduced' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={state.settings.motion === 'reduced'} onClick={() => setMotion('reduced')}>
              <span>02</span><strong>{text.reduced}</strong><small>{text.reducedDetail}</small>
            </button>
          </div>
        </fieldset>

        <fieldset className="settings-group">
          <legend>{text.media}</legend>
          <p>{text.mediaNote}</p>
          <div className="settings-options">
            <button type="button" className={state.settings.media === 'auto' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={state.settings.media === 'auto'} onClick={() => setMedia('auto')}>
              <span>01</span><strong>{text.mediaAuto}</strong><small>{text.mediaAutoDetail}</small>
            </button>
            <button type="button" className={state.settings.media === 'reduced' ? 'settings-option settings-option--active' : 'settings-option'} aria-pressed={state.settings.media === 'reduced'} onClick={() => setMedia('reduced')}>
              <span>02</span><strong>{text.mediaReduced}</strong><small>{text.mediaReducedDetail}</small>
            </button>
          </div>
        </fieldset>
      </div>

      <div className="section-shell">
        <DataControlsPanel />
      </div>
    </section>
  );
}
