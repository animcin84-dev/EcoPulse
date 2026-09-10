'use client';

import Link from 'next/link';
import { useGuestProgress } from '../progress/GuestProgressProvider';

const areas = [
  { href: '/learn', index: '01', en: 'Learn', kk: 'Үйрен', bodyEn: 'Learn new English through real Earth systems.', bodyKk: 'Нақты Жер жүйелері арқылы жаңа ағылшын тілін үйрен.' },
  { href: '/game', index: '02', en: 'Practice', kk: 'Жаттық', bodyEn: 'Practice what you learned with short games and review.', bodyKk: 'Үйренгеніңді қысқа ойындар мен review арқылы жаттықтыр.' },
  { href: '/challenges', index: '03', en: 'Think', kk: 'Ойлан', bodyEn: 'Test your reasoning in unlocked environmental challenges.', bodyKk: 'Ашылған экологиялық challenge арқылы ойлауыңды тексер.' },
  { href: '/action', index: '04', en: 'Act', kk: 'Әрекет', bodyEn: 'Try a safe real-world action away from the screen.', bodyKk: 'Экраннан тыс қауіпсіз нақты әрекет жасап көр.' },
  { href: '/pulse', index: '05', en: 'Progress', kk: 'Прогресс', bodyEn: 'See progress and what to do next.', bodyKk: 'Прогресті және келесі қадамыңды көр.' },
] as const;

export function HomeProductMap() {
  const { state } = useGuestProgress();
  const kk = state.settings.preferredLocale === 'kk';
  return (
    <section className="home-product-map" aria-labelledby="home-product-map-title">
      <div className="section-shell">
        <div className="home-product-map__heading">
          <div>
            <p className="eyebrow eyebrow--dark">{kk ? 'EcoPulse қалай жұмыс істейді' : 'How EcoPulse is organized'}</p>
            <h2 id="home-product-map-title">{kk ? 'Не керек екенін бірден таңда.' : 'Know where to go before you click.'}</h2>
          </div>
          <p>{kk ? 'Бес бөлімнің әрқайсысы бір нақты жұмыс атқарады. Ұсынылған жол — Үйрен → Жаттық → Ойлан → Әрекет → Прогресс.' : 'Each area has one clear job. The recommended flow is Learn → Practice → Think → Act → Progress.'}</p>
        </div>
        <div className="home-product-map__grid">
          {areas.map((area) => (
            <Link href={area.href} key={area.href}>
              <span>{area.index}</span>
              <strong>{kk ? area.kk : area.en}</strong>
              <p>{kk ? area.bodyKk : area.bodyEn}</p>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
