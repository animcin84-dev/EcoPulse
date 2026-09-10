'use client';

import { useState } from 'react';
import Link from 'next/link';
import { clearGuestState, getBrowserStorage } from '@/lib/guest-progress';
import type { PreferredLocale } from '@/domain/learning/settings';
import { useGuestProgress, type PersistenceStatus } from './GuestProgressProvider';

type NoticeStatus = Extract<PersistenceStatus, 'unavailable' | 'conflict' | 'corrupt' | 'incompatible' | 'unsupported'>;

type NoticeText = {
  title: string;
  body: string;
  exportAction?: string;
  reloadAction?: string;
  downloadRawAction?: string;
  startFreshAction?: string;
  confirmTitle?: string;
  confirmBody?: string;
  cancelAction?: string;
  confirmAction?: string;
};

const copy: Record<PreferredLocale, Record<NoticeStatus, NoticeText>> = {
  en: {
    unavailable: {
      title: 'LOCAL SAVING IS BLOCKED.',
      body: 'Your progress is available in this tab, but this browser is not saving it durably. Keep this tab open or export your learning data before leaving.',
      exportAction: 'Open export controls →',
    },
    conflict: {
      title: 'ANOTHER ECOPULSE TAB CHANGED PROGRESS.',
      body: 'This tab stopped writing to local progress so it cannot overwrite a newer saved version. Export this tab if you need its in-memory work, then reload to use the latest saved progress.',
      exportAction: 'Export this tab →',
      reloadAction: 'Reload latest saved progress',
    },
    corrupt: {
      title: 'SAVED PROGRESS NEEDS RECOVERY.',
      body: 'EcoPulse found damaged local progress data and quarantined it instead of overwriting it. Download the raw recovery copy before starting fresh if you may need it later.',
      downloadRawAction: 'Download raw recovery copy',
      startFreshAction: 'Start fresh',
      confirmTitle: 'DELETE THE QUARANTINED COPY?',
      confirmBody: 'Starting fresh permanently removes the saved recovery data from this browser. Download it first if you may need it.',
      cancelAction: 'Cancel',
      confirmAction: 'Delete and start fresh',
    },
    incompatible: {
      title: 'SAVED PROGRESS USES AN OLDER CONTENT STRUCTURE.',
      body: 'This saved progress refers to lessons or learning steps that are no longer part of the current EcoPulse curriculum. EcoPulse quarantined the raw data instead of guessing how to rewrite it.',
      downloadRawAction: 'Download raw recovery copy',
      startFreshAction: 'Start fresh',
      confirmTitle: 'DELETE THE INCOMPATIBLE SAVED PROGRESS?',
      confirmBody: 'Starting fresh permanently removes this older saved progress from the browser. Download the raw copy first if you may need it.',
      cancelAction: 'Cancel',
      confirmAction: 'Delete and start fresh',
    },
    unsupported: {
      title: 'SAVED PROGRESS USES A NEWER VERSION.',
      body: 'This EcoPulse build cannot safely read the saved progress version, so it has quarantined the raw data and will not overwrite it.',
      downloadRawAction: 'Download raw recovery copy',
      startFreshAction: 'Start fresh',
      confirmTitle: 'DELETE THE NEWER SAVED VERSION?',
      confirmBody: 'Starting fresh permanently removes this saved version from the browser. Download the raw copy first if you may need it.',
      cancelAction: 'Cancel',
      confirmAction: 'Delete and start fresh',
    },
  },
  kk: {
    unavailable: {
      title: 'ЖЕРГІЛІКТІ САҚТАУ БҰҒАТТАЛҒАН.',
      body: 'Прогресің осы қойындыда бар, бірақ браузер оны тұрақты түрде сақтай алмай тұр. Қойындыны жаппай тұр немесе шығар алдында оқу дерегін экспортта.',
      exportAction: 'Экспорт баптауларын ашу →',
    },
    conflict: {
      title: 'БАСҚА ECOPULSE ҚОЙЫНДЫСЫ ПРОГРЕСТІ ӨЗГЕРТТІ.',
      body: 'Бұл қойынды жаңарақ сақталған нұсқаны басып кетпеу үшін жергілікті прогреске жазуды тоқтатты. Қажет болса, осы қойындыдағы деректі экспортта, содан кейін соңғы сақталған прогресті ашу үшін бетті қайта жүкте.',
      exportAction: 'Осы қойындыны экспорттау →',
      reloadAction: 'Соңғы сақталған прогресті жүктеу',
    },
    corrupt: {
      title: 'САҚТАЛҒАН ПРОГРЕСТІ ҚАЛПЫНА КЕЛТІРУ ҚАЖЕТ.',
      body: 'EcoPulse бүлінген жергілікті прогресс дерегін тапты және оны өшірмей оқшаулады. Кейін қажет болуы мүмкін болса, жаңадан бастамас бұрын raw қалпына келтіру көшірмесін жүктеп ал.',
      downloadRawAction: 'Raw қалпына келтіру көшірмесін жүктеу',
      startFreshAction: 'Жаңадан бастау',
      confirmTitle: 'ОҚШАУЛАНҒАН КӨШІРМЕНІ ӨШІРУ КЕРЕК ПЕ?',
      confirmBody: 'Жаңадан бастау браузердегі сақталған қалпына келтіру дерегін біржола өшіреді. Қажет болуы мүмкін болса, алдымен көшірмесін жүктеп ал.',
      cancelAction: 'Бас тарту',
      confirmAction: 'Өшіріп, жаңадан бастау',
    },
    incompatible: {
      title: 'САҚТАЛҒАН ПРОГРЕСС ЕСКІ КОНТЕНТ ҚҰРЫЛЫМЫН ҚОЛДАНАДЫ.',
      body: 'Бұл сақталған прогресс қазіргі EcoPulse оқу бағдарламасында енді жоқ сабақтарға немесе оқу қадамдарына сілтеме жасайды. EcoPulse деректі өз бетінше өзгертіп жібермей, raw нұсқасын оқшаулады.',
      downloadRawAction: 'Raw қалпына келтіру көшірмесін жүктеу',
      startFreshAction: 'Жаңадан бастау',
      confirmTitle: 'ҮЙЛЕСІМДІ ЕМЕС САҚТАЛҒАН ПРОГРЕСТІ ӨШІРУ КЕРЕК ПЕ?',
      confirmBody: 'Жаңадан бастау браузердегі осы ескі прогресті біржола өшіреді. Қажет болуы мүмкін болса, алдымен raw көшірмесін жүктеп ал.',
      cancelAction: 'Бас тарту',
      confirmAction: 'Өшіріп, жаңадан бастау',
    },
    unsupported: {
      title: 'САҚТАЛҒАН ПРОГРЕСТІҢ НҰСҚАСЫ ЖАҢАРАҚ.',
      body: 'Бұл EcoPulse нұсқасы сақталған прогресті қауіпсіз оқи алмайды, сондықтан raw дерек оқшауланды және оның үстінен жазылмайды.',
      downloadRawAction: 'Raw қалпына келтіру көшірмесін жүктеу',
      startFreshAction: 'Жаңадан бастау',
      confirmTitle: 'ЖАҢАРАҚ САҚТАЛҒАН НҰСҚАНЫ ӨШІРУ КЕРЕК ПЕ?',
      confirmBody: 'Жаңадан бастау бұл сақталған нұсқаны браузерден біржола өшіреді. Қажет болуы мүмкін болса, алдымен raw көшірмесін жүктеп ал.',
      cancelAction: 'Бас тарту',
      confirmAction: 'Өшіріп, жаңадан бастау',
    },
  },
};

export function PersistenceNotice() {
  const { state, hydrated, persistenceStatus, recoveryRaw } = useGuestProgress();
  const [confirmFresh, setConfirmFresh] = useState(false);
  const visible = persistenceStatus === 'unavailable'
    || persistenceStatus === 'conflict'
    || persistenceStatus === 'corrupt'
    || persistenceStatus === 'incompatible'
    || persistenceStatus === 'unsupported';
  if (!hydrated || !visible) return null;

  const status = persistenceStatus as NoticeStatus;
  const text = copy[state.settings.preferredLocale][status];
  const isConflict = persistenceStatus === 'conflict';
  const isRecovery = persistenceStatus === 'corrupt' || persistenceStatus === 'incompatible' || persistenceStatus === 'unsupported';

  function downloadRecoveryRaw() {
    if (!recoveryRaw) return;
    const blob = new Blob([recoveryRaw], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecopulse-raw-recovery-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function startFresh() {
    if (!clearGuestState(getBrowserStorage(window))) return;
    window.location.reload();
  }

  return (
    <aside className="persistence-notice" aria-live="polite" aria-atomic="true">
      <div>
        <strong>{text.title}</strong>
        <p>{text.body}</p>
      </div>
      <div className="persistence-notice__actions">
        {text.exportAction ? <Link href="/settings#data-controls">{text.exportAction}</Link> : null}
        {isConflict && text.reloadAction ? (
          <button type="button" onClick={() => window.location.reload()}>{text.reloadAction}</button>
        ) : null}
        {isRecovery ? (
          <>
            <button type="button" onClick={downloadRecoveryRaw} disabled={!recoveryRaw}>{text.downloadRawAction}</button>
            {!confirmFresh ? (
              <button type="button" onClick={() => setConfirmFresh(true)}>{text.startFreshAction}</button>
            ) : (
              <span className="persistence-notice__confirm" role="group" aria-label={text.confirmTitle}>
                <strong>{text.confirmTitle}</strong>
                <span>{text.confirmBody}</span>
                <button type="button" onClick={() => setConfirmFresh(false)}>{text.cancelAction}</button>
                <button type="button" onClick={startFresh}>{text.confirmAction}</button>
              </span>
            )}
          </>
        ) : null}
      </div>
    </aside>
  );
}
