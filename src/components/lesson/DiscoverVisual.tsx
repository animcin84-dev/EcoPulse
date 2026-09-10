import { lessonPresentationBySlug } from '@/content/lesson-presentation';
import { resolveLessonMedia } from '@/content/media-resolver';
import type { Lesson } from '@/domain/content/types';
import type { PreferredLocale } from '@/domain/learning/settings';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';
import { InstitutionalMedia } from '../media/InstitutionalMedia';

export function DiscoverVisual({ lesson, locale }: { lesson: Lesson; locale: PreferredLocale }) {
  const mode = lessonPresentationBySlug[lesson.slug]?.visualMode;
  const media = resolveLessonMedia(lesson.slug);
  const copy = lessonUiCopy[locale].visuals;

  if (mode === 'atmosphere') {
    const fallback = (
      <div className="atmosphere-diagram concept-visual" aria-label={copy.atmosphereAria}>
        <div className="atmosphere-diagram__space">SPACE</div>
        <div className="atmosphere-diagram__ring"><span>ATMOSPHERE</span></div>
        <div className="atmosphere-diagram__earth">EARTH</div>
      </div>
    );
    return media ? (
      <div className="institutional-media-shell">
        <InstitutionalMedia asset={media} locale={locale} fallback={fallback} className="institutional-media--lesson institutional-media--atmosphere" />
        <span className="institutional-media__annotation">ATMOSPHERE / EARTH LIMB</span>
      </div>
    ) : fallback;
  }

  if (mode === 'weather-climate') {
    return (
      <div className="concept-visual concept-visual--weather" aria-label={copy.weatherClimateAria}>
        <div><span>NOW</span><strong>12°C</strong><small>RAIN / WIND</small></div>
        <div className="concept-visual__timeline" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div><span>LONG TERM</span><strong>CLIMATE</strong><small>PATTERNS / YEARS</small></div>
      </div>
    );
  }

  if (mode === 'glacier') {
    const fallback = (
      <div className="concept-visual concept-visual--ice" aria-label={copy.glacierAria}>
        <span className="concept-visual__label concept-visual__label--top">SNOW</span>
        <div className="ice-layer ice-layer--one" />
        <div className="ice-layer ice-layer--two" />
        <div className="ice-layer ice-layer--three" />
        <span className="concept-visual__label concept-visual__label--bottom">LAND ICE / SLOW FLOW</span>
      </div>
    );
    return media ? (
      <div className="institutional-media-shell">
        <InstitutionalMedia asset={media} locale={locale} fallback={fallback} className="institutional-media--lesson institutional-media--glacier" />
        <span className="institutional-media__annotation">GLACIER / LAND ICE</span>
      </div>
    ) : fallback;
  }

  if (mode === 'coast') {
    return (
      <div className="concept-visual concept-visual--sea" aria-label={copy.coastAria}>
        <span className="concept-visual__label concept-visual__label--top">COAST</span>
        <div className="coast-shape" />
        <div className="sea-surface"><span>SEA LEVEL</span></div>
        <div className="sea-depth" />
      </div>
    );
  }

  if (mode === 'habitat-network') {
    const fallback = (
      <div className="concept-visual concept-visual--habitat" aria-label={copy.habitatAria}>
        <span className="concept-visual__label concept-visual__label--top">LIVING NETWORK</span>
        <svg viewBox="0 0 520 360" role="img" aria-label={copy.habitatGraphAria}>
          <path d="M110 245 C180 170 225 165 275 105" />
          <path d="M110 245 C210 260 310 250 405 195" />
          <path d="M275 105 C330 115 370 145 405 195" />
          <path d="M275 105 C220 110 185 150 170 195" />
          <circle cx="110" cy="245" r="31" />
          <circle cx="170" cy="195" r="24" />
          <circle cx="275" cy="105" r="34" />
          <circle cx="405" cy="195" r="29" />
          <text x="110" y="250">WATER</text>
          <text x="170" y="200">SOIL</text>
          <text x="275" y="110">PLANTS</text>
          <text x="405" y="200">LIFE</text>
        </svg>
        <span className="concept-visual__label concept-visual__label--bottom">HABITAT / ECOSYSTEM</span>
      </div>
    );
    return media ? (
      <div className="institutional-media-shell">
        <InstitutionalMedia asset={media} locale={locale} fallback={fallback} className="institutional-media--lesson institutional-media--habitat" />
        <span className="institutional-media__annotation">WETLAND / HABITAT</span>
      </div>
    ) : fallback;
  }

  if (mode === 'ocean-chemistry') {
    return (
      <div className="concept-visual concept-visual--ocean-chemistry" aria-label={copy.oceanChemistryAria}>
        <span className="concept-visual__label concept-visual__label--top">OCEAN CHEMISTRY</span>
        <div className="chemistry-flow" aria-hidden="true">
          <span>CO₂</span><i>↓</i><span>OCEAN</span><i>↓</i><strong>MORE ACIDIC</strong>
        </div>
        <div className="ocean-chemistry-water" />
        <span className="concept-visual__label concept-visual__label--bottom">LOWER pH ≠ LITERAL ACID</span>
      </div>
    );
  }

  return (
    <div className={mode === 'wildfire-risk' ? 'concept-visual concept-visual--drought concept-visual--wildfire' : 'concept-visual concept-visual--drought'} aria-label={mode === 'wildfire-risk' ? copy.wildfireRiskAria : copy.droughtAria}>
      <span className="concept-visual__label concept-visual__label--top">{mode === 'wildfire-risk' ? 'DRY VEGETATION' : 'LOW RAINFALL'}</span>
      <div className="heat-disc" />
      <div className="dry-ground"><i /><i /><i /><i /></div>
      <span className="concept-visual__label concept-visual__label--bottom">{mode === 'wildfire-risk' ? 'HIGHER RISK / NOT A GUARANTEE' : 'DROUGHT / WATER PRESSURE'}</span>
    </div>
  );
}
