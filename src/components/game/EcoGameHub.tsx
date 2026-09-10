'use client';

import { ecoArcadeModes } from '@/content/eco-arcade';
import { useGuestProgress } from '../progress/GuestProgressProvider';

export function EcoGameHub() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const kk = locale === 'kk';

  return (
    <section className="eco-arcade-hub" aria-labelledby="eco-arcade-title">
      <div className="section-shell">
        <div className="eco-arcade-hub__hero">
          <div>
            <p className="eyebrow eyebrow--dark">{kk ? 'ECO GAME / ЖАТТЫҒУ ЗЕРТХАНАСЫ' : 'ECO GAME / PRACTICE LAB'}</p>
            <h1 id="eco-arcade-title">
              {kk ? <>Тілді ойна.<br /><span>Планетаны есте сақта.</span></> : <>Play the language.<br /><span>Remember the planet.</span></>}
            </h1>
          </div>
          <p>{kk
            ? 'Жылдам жаттығу шынайы оқуды күшейтуі керек, жасанды ұпай жасамауы керек. Бес режим сөздік, жүйелік байланыс және шешім қабылдауды бөлек жаттықтырады.'
            : 'Fast practice should strengthen real learning, not create fake scores. Five modes train vocabulary, system connections and environmental decisions from different angles.'}</p>
        </div>

        <div className="eco-arcade-hub__mode-grid" aria-label={kk ? 'Бес ойын режимі' : 'Five arcade modes'}>
          {ecoArcadeModes.map((mode) => (
            <article className={`eco-arcade-hub__mode eco-arcade-hub__mode--${mode.id}`} key={mode.id}>
              <div><span>{mode.index}</span><em>{mode.label}</em></div>
              <h2>{mode.title[locale]}</h2>
              <p>{mode.description[locale]}</p>
            </article>
          ))}
        </div>

        <div className="eco-arcade-hub__launch">
          <div>
            <span>{kk ? '5 РЕЖИМ / БІР СЕССИЯ' : '5 MODES / ONE SESSION'}</span>
            <p>{kk ? 'Сессия нәтижелері уақытша. Негізгі XP мен mastery тек канондық оқу дәлелі арқылы өзгереді.' : 'Session results are temporary. Canonical XP and mastery still change only through the real learning evidence system.'}</p>
          </div>
          <a className="button button--pulse" href="#arcade-stage">{kk ? 'ОЙЫНДЫ БАСТАУ ↓' : 'START PLAYING ↓'}</a>
        </div>
      </div>
    </section>
  );
}
