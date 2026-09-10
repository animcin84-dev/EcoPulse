'use client';

import { useGuestProgress } from '../progress/GuestProgressProvider';

export function EcoActionHero() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const kk = locale === 'kk';

  return (
    <header className="action-cockpit" aria-labelledby="action-cockpit-title">
      <div className="section-shell action-cockpit__grid">
        <div>
          <p className="eyebrow eyebrow--dark">{kk ? 'ECO ACTION / ДАЛАЛЫҚ РЕЖИМ' : 'ECO ACTION / FIELD MODE'}</p>
          <h1 id="action-cockpit-title">
            {kk ? <>Көбірек байқа.<br /><span>Ақылдырақ әрекет ет.</span></> : <>Notice more.<br /><span>Act smarter.</span></>}
          </h1>
          <p>{kk
            ? 'Ағылшын тілін планетамен байланыстыратын шағын нақты бақылаулар. GPS жоқ, міндетті фото жоқ және жария дәлел қажет емес.'
            : 'Small real-world observations that connect English to the planet. No GPS, no required photo and no public proof.'}</p>
          <a href="#missions" className="button button--pulse">{kk ? 'ӘРЕКЕТТІ ТАҢДАУ ↓' : 'CHOOSE AN ACTION ↓'}</a>
        </div>
        <div className="action-cockpit__visual" aria-hidden="true">
          <span className="action-cockpit__ring action-cockpit__ring--one" />
          <span className="action-cockpit__ring action-cockpit__ring--two" />
          <div className="action-cockpit__radar"><i /><i /><i /><strong>{kk ? <>ЭКРАННАН ТЫС<br />ӘДЕЙІ</> : <>OFF-SCREEN<br />ON PURPOSE</>}</strong></div>
          <p>{kk ? <>БАЙҚА<br />БАЙЛАНЫСТЫР<br />ОЙ ЕЛЕГІНЕН ӨТКІЗ</> : <>NOTICE<br />CONNECT<br />REFLECT</>}</p>
        </div>
      </div>
      <div className="section-shell action-cockpit__principles" aria-label={kk ? 'Eco Action қағидалары' : 'Eco Action principles'}>
        <span>{kk ? '01 / ҚАУІПСІЗДІК БІРІНШІ' : '01 / SAFE FIRST'}</span>
        <span>{kk ? '02 / ОРЫН ДЕРЕГІ ЖОҚ' : '02 / NO LOCATION'}</span>
        <span>{kk ? '03 / МІНДЕТТІ ФОТО ЖОҚ' : '03 / NO REQUIRED PHOTO'}</span>
        <span>{kk ? '04 / РЕФЛЕКСИЯ МІНДЕТТІ ЕМЕС' : '04 / REFLECTION OPTIONAL'}</span>
      </div>
    </header>
  );
}
