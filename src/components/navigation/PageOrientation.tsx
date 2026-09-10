'use client';

import Link from 'next/link';
import { useGuestProgress } from '../progress/GuestProgressProvider';

type OrientationKind = 'learn' | 'game' | 'challenges' | 'action' | 'pulse' | 'review' | 'settings' | 'explore';

type Locale = 'en' | 'kk';

type OrientationCopy = {
  label: { en: string; kk: string };
  purpose: { en: string; kk: string };
  now: { en: string; kk: string };
  effect: { en: string; kk: string };
  stage: 0 | 1 | 2 | 3 | 4;
};

const copyByKind: Record<OrientationKind, OrientationCopy> = {
  learn: {
    label: { en: 'Learn', kk: 'Оқу' },
    purpose: { en: 'Learn new English through real Earth systems.', kk: 'Нақты Жер жүйелері арқылы жаңа ағылшын сөздерін үйрен.' },
    now: { en: 'Continue the recommended lesson, or choose one of the eight topics.', kk: 'Ұсынылған сабақты жалғастыр немесе сегіз тақырыптың бірін таңда.' },
    effect: { en: 'Lessons build vocabulary evidence, connections and activity XP.', kk: 'Сабақтар сөздік дәлелін, байланыстарды және activity XP-ді дамытады.' },
    stage: 0,
  },
  game: {
    label: { en: 'Practice', kk: 'Жаттығу' },
    purpose: { en: 'Practice words and connections you have already seen.', kk: 'Бұрын көрген сөздер мен байланыстарды жаттықтыр.' },
    now: { en: 'Pick any game mode. Use Review when words are due.', kk: 'Кез келген ойын режимін таңда. Сөздер дайын болғанда Review қолдан.' },
    effect: { en: 'Arcade scores are practice only. Review can strengthen learning evidence.', kk: 'Arcade ұпайы тек жаттығу. Review оқу дәлелін күшейте алады.' },
    stage: 1,
  },
  review: {
    label: { en: 'Review', kk: 'Қайталау' },
    purpose: { en: 'Refresh vocabulary at the moment it is due.', kk: 'Сөздерді қайталау уақыты келгенде еске түсір.' },
    now: { en: 'Finish one short review batch, then return to Learn or Game.', kk: 'Бір қысқа review топтамасын аяқтап, Learn немесе Game-ға орал.' },
    effect: { en: 'Correct recall can strengthen spaced-review evidence.', kk: 'Дұрыс еске түсіру spaced-review дәлелін күшейте алады.' },
    stage: 1,
  },
  challenges: {
    label: { en: 'Think', kk: 'Ойлан' },
    purpose: { en: 'Test your reasoning about causes, consequences and evidence.', kk: 'Себеп, салдар және дәлел туралы ойлауыңды тексер.' },
    now: { en: 'Open a Ready checkpoint. Locked checkpoints need their lessons first.', kk: 'Дайын checkpoint-ті аш. Жабық checkpoint үшін алдымен сабақтарын аяқта.' },
    effect: { en: 'A completed checkpoint records reasoning progress and awards its XP once.', kk: 'Аяқталған checkpoint reasoning прогресін сақтайды және XP-ді бір рет береді.' },
    stage: 2,
  },
  action: {
    label: { en: 'Act', kk: 'Әрекет' },
    purpose: { en: 'Try a small, safe environmental observation away from the screen.', kk: 'Экраннан тыс шағын әрі қауіпсіз экологиялық бақылау жаса.' },
    now: { en: 'Choose one optional mission that fits your day.', kk: 'Күніңе сай бір міндетті емес миссияны таңда.' },
    effect: { en: 'Completion records participation only—no moral score or impact claim.', kk: 'Аяқтау тек қатысуды көрсетеді—моральдық баға немесе impact claim емес.' },
    stage: 3,
  },
  pulse: {
    label: { en: 'Progress', kk: 'Прогресс' },
    purpose: { en: 'See what you have completed and where to focus next.', kk: 'Не аяқтағаныңды және әрі қарай неге назар аудару керегін көр.' },
    now: { en: 'Start with Recommended next step instead of choosing from every section.', kk: 'Барлық бөлімнен таңдаудың орнына Ұсынылған келесі қадамнан баста.' },
    effect: { en: 'This page summarizes learning evidence, activity XP and optional actions.', kk: 'Бұл бет оқу дәлелін, activity XP және міндетті емес әрекеттерді қорытындылайды.' },
    stage: 4,
  },
  settings: {
    label: { en: 'Settings', kk: 'Баптаулар' },
    purpose: { en: 'Control language, motion and local-data preferences.', kk: 'Тіл, motion және жергілікті дерек параметрлерін басқар.' },
    now: { en: 'Change only what you need; your learning content stays the same.', kk: 'Тек қажет параметрді өзгерт; оқу мазмұны өзгермейді.' },
    effect: { en: 'Settings change presentation and storage, not your learning progress.', kk: 'Баптаулар көрсету мен сақтауды өзгертеді, оқу прогресін емес.' },
    stage: 4,
  },
  explore: {
    label: { en: 'Explore', kk: 'Зерттеу' },
    purpose: { en: 'See how Earth concepts connect instead of memorising isolated facts.', kk: 'Жеке фактілерді жаттаудың орнына Жер ұғымдарының байланысын көр.' },
    now: { en: 'Open any concept node, then follow one connection that interests you.', kk: 'Кез келген ұғымды ашып, қызық бір байланысты жалғастыр.' },
    effect: { en: 'Exploration builds understanding; mastery changes through lessons and review.', kk: 'Зерттеу түсінікті дамытады; mastery сабақтар мен review арқылы өзгереді.' },
    stage: 0,
  },
};

const journey = [
  { href: '/learn', en: 'Learn', kk: 'Үйрен', noteEn: 'new ideas', noteKk: 'жаңа идея' },
  { href: '/game', en: 'Practice', kk: 'Жаттық', noteEn: 'memory', noteKk: 'есте сақтау' },
  { href: '/challenges', en: 'Think', kk: 'Ойлан', noteEn: 'reasoning', noteKk: 'пайымдау' },
  { href: '/action', en: 'Act', kk: 'Әрекет', noteEn: 'off-screen', noteKk: 'экраннан тыс' },
  { href: '/pulse', en: 'Progress', kk: 'Прогресс', noteEn: 'next step', noteKk: 'келесі қадам' },
] as const;

export function PageOrientation({ kind }: { kind: OrientationKind }) {
  const { state } = useGuestProgress();
  const locale: Locale = state.settings.preferredLocale;
  const page = copyByKind[kind];
  const kk = locale === 'kk';

  return (
    <section className="page-orientation" aria-label={kk ? `${page.label.kk} бетінің түсіндірмесі` : `${page.label.en} page guide`}>
      <div className="section-shell page-orientation__shell">
        <div className="page-orientation__summary">
          <div className="page-orientation__current">
            <span>{kk ? 'Сіз осындасыз' : 'You are here'}</span>
            <strong>{page.label[locale]}</strong>
          </div>
          <dl className="page-orientation__answers">
            <div><dt>{kk ? 'Бұл не' : 'What this is'}</dt><dd>{page.purpose[locale]}</dd></div>
            <div><dt>{kk ? 'Қазір не істеу керек' : 'Do this now'}</dt><dd>{page.now[locale]}</dd></div>
            <div><dt>{kk ? 'Прогреске әсері' : 'Progress effect'}</dt><dd>{page.effect[locale]}</dd></div>
          </dl>
        </div>

        <div className="page-orientation__journey" aria-label={kk ? 'EcoPulse оқу жолы' : 'EcoPulse learning journey'}>
          <div className="page-orientation__journey-title">
            <span>{kk ? 'Қарапайым жол' : 'Simple path'}</span>
            <strong>{kk ? 'Үйрен → Жаттық → Ойлан → Әрекет → Прогресс' : 'Learn → Practice → Think → Act → Progress'}</strong>
          </div>
          <ol>
            {journey.map((item, index) => (
              <li key={item.href} className={page.stage === index ? 'is-current' : page.stage > index ? 'is-past' : ''}>
                <Link href={item.href} aria-current={page.stage === index ? 'step' : undefined}>
                  <span>{index + 1}</span>
                  <strong>{kk ? item.kk : item.en}</strong>
                  <small>{kk ? item.noteKk : item.noteEn}</small>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
