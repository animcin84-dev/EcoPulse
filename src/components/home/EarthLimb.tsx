import { resolveHomeMedia } from '@/content/media-resolver';
import type { PreferredLocale } from '@/domain/learning/settings';
import { InstitutionalMedia } from '../media/InstitutionalMedia';

function EarthLimbFallback() {
  return (
    <div className="earth-limb__fallback" aria-hidden="true">
      <div className="earth-limb__glow" />
      <div className="earth-limb__planet">
        <div className="earth-limb__cloud earth-limb__cloud--one" />
        <div className="earth-limb__cloud earth-limb__cloud--two" />
        <div className="earth-limb__cloud earth-limb__cloud--three" />
      </div>
    </div>
  );
}

export function EarthLimb({ locale }: { locale: PreferredLocale }) {
  const asset = resolveHomeMedia();

  return (
    <div className="earth-limb">
      {asset ? (
        <InstitutionalMedia
          asset={asset}
          locale={locale}
          loading="eager"
          decorative
          className="institutional-media--hero"
          fallback={<EarthLimbFallback />}
        />
      ) : <EarthLimbFallback />}
      <span className="earth-marker earth-marker--atmosphere">ATMOSPHERE</span>
      <span className="earth-marker earth-marker--ocean">OCEAN</span>
    </div>
  );
}
