# EcoPulse Sunlit Frontend Foundation Design

## Goal

Transform the existing dark climate-tech presentation into a light, premium eco-learning product while preserving the proven learning, mastery, review, mission and guest-progress domains.

## Scope of this implementation wave

This wave implements the shared visual foundation and the public Home experience only. It also updates global primary navigation so the new product IA is visible without deleting existing routes.

### Included

- Sunlit Planet Lab color/token system with a light default canvas.
- Home navigation aligned to Home / Learn / Challenges / Eco Game / Eco Action / My Progress.
- New light hero using the approved three-line slogan.
- Welcome section using the approved EcoPulse positioning copy.
- Eight bilingual environmental topic cards.
- Existing connection demo, live question demo, learning loop and action preview restyled into the new light system.
- Motion primitives for hero reveal, ambient Earth movement, card hover/focus, section reveal and reduced-motion fallback.
- Responsive behavior for 1440, 1280, 1024, 768, 430, 390 and 360-width layouts.
- Preserve existing content, progress and lesson engine behavior.

### Not included in this wave

- Re-authoring the full Climate Change reading module.
- Building the full future multi-game EcoPulse Arcade beyond the first practice surface.
- Re-authoring mission content beyond the current safe mission system.
- Rebuilding Learn, Explore, Challenge, Review and My Pulse page interiors.
- Adding WebGL or third-party animation dependencies.

## Architecture

Keep the domain layer stable. Add a focused Home content model for the eight topics, create reusable Home sections, and update presentation copy/navigation through existing domain modules. Use CSS animation and transform primitives for this wave so the project remains install-light and works on Android/Termux; complex Motion/GSAP sequences can be added in later isolated phases.

## Visual system

The default canvas is warm off-white, with white, mint, sky and warm surfaces. Primary ink is deep green-black rather than pure black. EcoPulse green remains the primary action color. Dark sections are removed from the Home route except for small high-contrast elements when useful.

## Motion principles

Motion supports hierarchy rather than decoration. Hero text enters with masked vertical reveals; the Earth visual drifts and breathes subtly; cards lift by small transforms; section content animates only on initial page load where CSS can do so safely. All non-essential animation is disabled for `prefers-reduced-motion: reduce` and the existing `html[data-motion='reduced']` setting.

## Navigation mapping

The primary navigation exposes the approved six-item information architecture with real routes:

- Home -> `/`
- Learn -> `/learn`
- Challenges -> `/challenges`
- Eco Game -> `/game`
- Eco Action -> `/action`
- My Progress -> `/pulse`

`/game` is the first dedicated Eco Game surface and reuses the proven interactive review engine in this wave. `/action` is the dedicated real-world action surface and reuses the proven safe mission system. Legacy `/review` and `/mission/*` routes remain valid; navigation grouping maps them to Eco Game and Eco Action respectively.

## Accessibility and performance

All interactive topic cards are links with visible focus states and accessible bilingual text. Pointer-only behavior is avoided. Motion is transform/opacity based. No new runtime dependency is required. Existing media progressive loading and data-saving behavior remain intact.
