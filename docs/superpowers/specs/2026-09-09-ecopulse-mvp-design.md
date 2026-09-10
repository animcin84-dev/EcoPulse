# EcoPulse MVP Design

EcoPulse is an environmental English-learning product whose signature loop is **Learn → Understand → Connect → Think → Act → Review → Master**. The visual direction is **Living Editorial Science**: dark cinematic storytelling, light reading/learning surfaces, and Pulse Green (`#54F078`) as a rare semantic signal rather than a decorative wash.

## MVP vertical slice

The first executable slice must prove `Home → Atmosphere lesson → Meaning question → Connection chain → Think prompt → Result`. The domain model must already support later vocabulary mastery, review scheduling, missions, knowledge-graph relation types, localization (`en`/`kk`), and versioned lesson content.

## Architecture

- Next.js App Router with React and strict TypeScript.
- Repository-owned, typed content for the first curriculum; user state is kept separate from content.
- Domain logic under `src/domain` has no React dependency and is covered by executable tests.
- UI is responsive at 1440/768/390 and remains keyboard/reduced-motion friendly.
- No WebGL in the first slice. The Earth hero is rendered as CSS/SVG art so learning UI is not blocked by heavy media.

## Design lock

- Brand: EcoPulse with a custom pulse-heart symbol.
- Primary palette: Carbon `#070A08`, Cloud `#F5F7F3`, Ink `#141814`, Pulse `#54F078`.
- Primary type: Geologica; editorial accent: Noto Serif Display (loaded with Next font tooling when dependencies are available).
- No emoji-led visual language, no confetti, no fake planetary-health score, no streak guilt.
- User-facing progress distinguishes XP/activity from actual learning mastery.

## Scientific guardrails

- Weather and climate are not synonyms.
- Land-ice melt may add water to the ocean; sea-ice melt is not described as equivalent.
- Drought/dry vegetation may increase wildfire risk; the relationship is not deterministic.
- Ocean acidification means seawater becomes more acidic as pH decreases, not that the ocean becomes literal acid.
- Knowledge edges have semantic relation types rather than implying every arrow is direct causation.

## Accessibility and performance

- Target WCAG 2.2 AA.
- Primary targets are generally 48px+ and answer cards are larger.
- Drag interactions always have non-drag alternatives.
- Reduced motion preserves all information.
- Learning text and controls render before decorative media.
