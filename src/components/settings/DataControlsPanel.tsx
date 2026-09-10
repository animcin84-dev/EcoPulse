'use client';

import { useState } from 'react';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';
import { clearGuestState, getBrowserStorage, saveGuestState } from '@/lib/guest-progress';
import {
  MAX_LEARNING_DATA_IMPORT_BYTES,
  createLearningDataExport,
  learningDataExportFilename,
  parseLearningDataImport,
  resetLearningProgress,
  summarizeLearningDataImport,
  type LearningDataImportFailureReason,
  type LearningDataImportSummary,
} from '@/domain/learning/data-controls';

const copy = {
  en: {
    eyebrow: 'LOCAL DATA',
    title: 'YOUR LEARNING\nSTAYS YOURS.',
    body: 'EcoPulse stores guest learning progress on this device. Export it whenever you want, or clear the learning history without changing your language, level or motion preferences.',
    exportTitle: 'EXPORT LEARNING DATA',
    exportBody: 'Download a JSON copy of XP, lessons, mastery evidence, review timing, missions, optional reflections and settings.',
    exportAction: 'Download JSON →',
    importTitle: 'RESTORE FROM BACKUP',
    importBody: 'Choose an EcoPulse JSON export. EcoPulse validates it locally and shows a summary before anything is replaced.',
    importAction: 'Choose JSON backup',
    importPreview: 'BACKUP PREVIEW',
    importExported: 'Exported',
    importXp: 'XP',
    importLessons: 'Lessons complete',
    importMastered: 'Words mastered',
    importMissions: 'Missions complete',
    importChallenges: 'Challenges complete',
    importReplace: 'Replace with this backup',
    importConfirmTitle: "REPLACE THIS DEVICE'S PROGRESS?",
    importConfirmBody: 'The validated backup will replace the current local learning state. Export the current state first if you may need it.',
    importConfirm: 'Replace now',
    importDone: 'Backup restored on this device.',
    importSaveFailed: 'EcoPulse could not save the imported backup durably. Nothing was replaced.',
    resetTitle: 'RESET LEARNING PROGRESS',
    resetBody: 'Clear XP, lesson history, mastery, reviews, missions, reflections and World Challenge completion on this device. Your learning preferences stay.',
    resetAction: 'Reset learning progress',
    confirmTitle: 'RESET THIS DEVICE?',
    confirmBody: 'This cannot be undone unless you exported a copy first. Language, level and motion preferences will be kept.',
    cancel: 'Cancel',
    confirm: 'Reset now',
    resetDone: 'Learning progress reset. Your preferences were kept.',
    resetFailed: 'EcoPulse could not clear the saved browser copy. Nothing was reset.',
    loading: 'Loading saved progress…',
    localOnly: 'No upload · no account required',
    importErrors: {
      'too-large': 'This backup is too large to import safely. Maximum size is 2 MiB.',
      'invalid-json': 'This file is not valid JSON.',
      'wrong-product': 'This is not an EcoPulse learning-data export.',
      'unsupported-export-version': 'This EcoPulse export version is not supported by this build.',
      'invalid-export-date': 'The backup has an invalid export timestamp.',
      'invalid-learning-state': 'The backup learning state is damaged or incompatible.',
      'inconsistent-learning-state': 'The backup contains learning references that do not match this EcoPulse curriculum.',
    },
  },
  kk: {
    eyebrow: 'ЖЕРГІЛІКТІ ДЕРЕК',
    title: 'ОҚУ ДЕРЕГІҢ\nӨЗІҢДЕ ҚАЛАДЫ.',
    body: 'EcoPulse қонақ режиміндегі оқу прогресін осы құрылғыда сақтайды. Оны кез келген уақытта экспорттай аласың немесе тіл, деңгей және қозғалыс баптауларын өзгертпей оқу тарихын тазалай аласың.',
    exportTitle: 'ОҚУ ДЕРЕГІН ЭКСПОРТТАУ',
    exportBody: 'XP, сабақтар, меңгеру дәлелдері, қайталау уақыты, миссиялар, қосымша рефлексиялар және баптаулар бар JSON көшірмесін жүктеп ал.',
    exportAction: 'JSON жүктеу →',
    importTitle: 'САҚТЫҚ КӨШІРМЕДЕН ҚАЛПЫНА КЕЛТІРУ',
    importBody: 'EcoPulse экспорттаған JSON файлын таңда. Файл осы құрылғыда тексеріліп, ештеңе ауыстырылмай тұрып қысқаша мәлімет көрсетіледі.',
    importAction: 'JSON сақтық көшірмесін таңдау',
    importPreview: 'САҚТЫҚ КӨШІРМЕ АЛДЫН АЛА ҚАРАУ',
    importExported: 'Экспортталған',
    importXp: 'XP',
    importLessons: 'Аяқталған сабақтар',
    importMastered: 'Меңгерілген сөздер',
    importMissions: 'Аяқталған миссиялар',
    importChallenges: 'Аяқталған challenges',
    importReplace: 'Осы сақтық көшірмемен ауыстыру',
    importConfirmTitle: 'ОСЫ ҚҰРЫЛҒЫДАҒЫ ПРОГРЕСТІ АУЫСТЫРУ КЕРЕК ПЕ?',
    importConfirmBody: 'Тексерілген сақтық көшірме осы құрылғыдағы оқу күйін ауыстырады. Қазіргі күй керек болуы мүмкін болса, алдымен экспортта.',
    importConfirm: 'Қазір ауыстыру',
    importDone: 'Сақтық көшірме осы құрылғыда қалпына келтірілді.',
    importSaveFailed: 'EcoPulse импортталған сақтық көшірмені тұрақты сақтай алмады. Ештеңе ауыстырылған жоқ.',
    resetTitle: 'ОҚУ ПРОГРЕСІН ҚАЛПЫНА КЕЛТІРУ',
    resetBody: 'Осы құрылғыдағы XP, сабақ тарихы, меңгеру, қайталау, миссиялар, рефлексиялар және World Challenge прогресін тазалайды. Оқу баптаулары сақталады.',
    resetAction: 'Оқу прогресін тазалау',
    confirmTitle: 'ОСЫ ҚҰРЫЛҒЫДА ТАЗАЛАУ КЕРЕК ПЕ?',
    confirmBody: 'Алдымен экспорт жасамаған болсаң, бұл әрекетті қайтару мүмкін емес. Тіл, деңгей және қозғалыс баптаулары сақталады.',
    cancel: 'Бас тарту',
    confirm: 'Қазір тазалау',
    resetDone: 'Оқу прогресі тазаланды. Баптауларың сақталды.',
    resetFailed: 'EcoPulse браузердегі сақталған көшірмені тазалай алмады. Ештеңе өшірілген жоқ.',
    loading: 'Сақталған прогресс жүктелуде…',
    localOnly: 'Жүктеп жіберілмейді · аккаунт қажет емес',
    importErrors: {
      'too-large': 'Бұл сақтық көшірме қауіпсіз импорттау үшін тым үлкен. Ең үлкен өлшем — 2 MiB.',
      'invalid-json': 'Бұл файл жарамды JSON емес.',
      'wrong-product': 'Бұл EcoPulse оқу деректерінің экспорты емес.',
      'unsupported-export-version': 'Бұл EcoPulse export нұсқасын осы build қолдамайды.',
      'invalid-export-date': 'Сақтық көшірмедегі экспорт уақыты жарамсыз.',
      'invalid-learning-state': 'Сақтық көшірмедегі оқу күйі зақымдалған немесе үйлесімсіз.',
      'inconsistent-learning-state': 'Сақтық көшірмедегі оқу сілтемелері осы EcoPulse оқу бағдарламасына сәйкес келмейді.',
    },
  },
} as const;

export function DataControlsPanel() {
  const { state, updateState, hydrated, persistenceStatus } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const text = copy[locale];
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);
  const [importPreview, setImportPreview] = useState<null | { state: typeof state; exportedAt: string; fileName: string; summary: LearningDataImportSummary }>(null);
  const [confirmImport, setConfirmImport] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importDone, setImportDone] = useState(false);
  const canExport = hydrated && persistenceStatus !== 'corrupt' && persistenceStatus !== 'incompatible' && persistenceStatus !== 'unsupported';
  const canImport = hydrated && persistenceStatus === 'saved';
  const canReset = hydrated
    && persistenceStatus !== 'conflict'
    && persistenceStatus !== 'corrupt'
    && persistenceStatus !== 'incompatible'
    && persistenceStatus !== 'unsupported'
    && persistenceStatus !== 'checking';

  function exportData() {
    if (!canExport) return;
    const now = new Date();
    const payload = createLearningDataExport(state, now);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = learningDataExportFilename(now);
    link.click();
    URL.revokeObjectURL(url);
  }

  async function selectImportFile(event: { currentTarget: { files: FileList | null; value: string } }) {
    const file = event.currentTarget.files?.[0];
    if (!file || !canImport) return;
    if (file.size > MAX_LEARNING_DATA_IMPORT_BYTES) {
      setImportPreview(null);
      setConfirmImport(false);
      setImportDone(false);
      setImportError(text.importErrors['too-large']);
      return;
    }
    setImportError(null);
    setImportDone(false);
    setConfirmImport(false);
    setImportPreview(null);

    let raw: string;
    try {
      raw = await file.text();
    } catch {
      setImportError(text.importErrors['invalid-json']);
      return;
    }

    const parsed = parseLearningDataImport(raw);
    if (!parsed.ok) {
      setImportError(text.importErrors[parsed.reason as LearningDataImportFailureReason]);
      return;
    }

    setImportPreview({
      state: parsed.state,
      exportedAt: parsed.exportedAt,
      fileName: file.name,
      summary: summarizeLearningDataImport(parsed.state),
    });
  }

  function applyImportedData() {
    if (!canImport || !importPreview) return;
    const saved = saveGuestState(importPreview.state, getBrowserStorage(window));
    if (!saved) {
      setImportError(text.importSaveFailed);
      return;
    }
    updateState(() => importPreview.state);
    setConfirmImport(false);
    setImportError(null);
    setImportDone(true);
    setImportPreview(null);
  }

  function resetProgress() {
    if (!canReset) return;
    const cleared = clearGuestState(getBrowserStorage(window));
    if (!cleared && persistenceStatus !== 'unavailable') {
      setResetFailed(true);
      setResetDone(false);
      return;
    }
    updateState((current) => resetLearningProgress(current));
    setConfirmReset(false);
    setResetFailed(false);
    setResetDone(true);
  }

  return (
    <section id="data-controls" className="settings-data" aria-labelledby="settings-data-title">
      <div className="settings-data__intro">
        <p className="eyebrow eyebrow--dark">{text.eyebrow}</p>
        <h2 id="settings-data-title">{text.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
        <p>{text.body}</p>
        <small>{text.localOnly}</small>
      </div>

      <div className="settings-data__actions">
        <article className="settings-data__item settings-data__item--import">
          <p className="eyebrow eyebrow--dark">01 / IMPORT</p>
          <h3>{text.importTitle}</h3>
          <p>{text.importBody}</p>
          <label className={canImport ? 'settings-data__file' : 'settings-data__file settings-data__file--disabled'}>
            <span>{hydrated ? text.importAction : text.loading}</span>
            <input type="file" accept=".json,application/json" disabled={!canImport} onChange={selectImportFile} />
          </label>

          {importPreview ? (
            <div className="settings-import-preview" aria-live="polite">
              <p className="eyebrow eyebrow--dark">{text.importPreview}</p>
              <strong>{importPreview.fileName}</strong>
              <small>{text.importExported}: {importPreview.exportedAt.slice(0, 10)}</small>
              <dl>
                <div><dt>{text.importXp}</dt><dd>{importPreview.summary.xp}</dd></div>
                <div><dt>{text.importLessons}</dt><dd>{importPreview.summary.completedLessons}</dd></div>
                <div><dt>{text.importMastered}</dt><dd>{importPreview.summary.masteredWords}</dd></div>
                <div><dt>{text.importMissions}</dt><dd>{importPreview.summary.completedMissions}</dd></div>
                <div><dt>{text.importChallenges}</dt><dd>{importPreview.summary.completedChallenges}</dd></div>
              </dl>
              {!confirmImport ? (
                <button type="button" className="button button--dark" onClick={() => setConfirmImport(true)}>{text.importReplace}</button>
              ) : (
                <div className="data-reset-confirm" role="group" aria-labelledby="data-import-confirm-title">
                  <strong id="data-import-confirm-title">{text.importConfirmTitle}</strong>
                  <p>{text.importConfirmBody}</p>
                  <div className="data-reset-confirm__actions">
                    <button type="button" className="text-link" onClick={() => setConfirmImport(false)}>{text.cancel}</button>
                    <button type="button" className="data-reset-button data-reset-button--confirm" onClick={applyImportedData}>{text.importConfirm}</button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          {importError ? <p className="settings-data__status" role="alert">{importError}</p> : null}
          {importDone ? <p className="settings-data__status" role="status" aria-live="polite">{text.importDone}</p> : null}
        </article>

        <article className="settings-data__item">
          <p className="eyebrow eyebrow--dark">02 / EXPORT</p>
          <h3>{text.exportTitle}</h3>
          <p>{text.exportBody}</p>
          <button type="button" className="button button--dark" onClick={exportData} disabled={!canExport}>{hydrated ? text.exportAction : text.loading}</button>
        </article>

        <article className="settings-data__item settings-data__item--danger">
          <p className="eyebrow eyebrow--dark">03 / RESET</p>
          <h3>{text.resetTitle}</h3>
          <p>{text.resetBody}</p>

          {!confirmReset ? (
            <button type="button" className="data-reset-button" disabled={!canReset} onClick={() => { setConfirmReset(true); setResetDone(false); setResetFailed(false); }}>{hydrated ? text.resetAction : text.loading}</button>
          ) : (
            <div className="data-reset-confirm" role="group" aria-labelledby="data-reset-confirm-title">
              <strong id="data-reset-confirm-title">{text.confirmTitle}</strong>
              <p>{text.confirmBody}</p>
              <div className="data-reset-confirm__actions">
                <button type="button" className="text-link" onClick={() => setConfirmReset(false)}>{text.cancel}</button>
                <button type="button" className="data-reset-button data-reset-button--confirm" disabled={!canReset} onClick={resetProgress}>{text.confirm}</button>
              </div>
            </div>
          )}

          {resetDone ? <p className="settings-data__status" role="status" aria-live="polite">{text.resetDone}</p> : null}
          {resetFailed ? <p className="settings-data__status" role="alert">{text.resetFailed}</p> : null}
        </article>
      </div>
    </section>
  );
}
