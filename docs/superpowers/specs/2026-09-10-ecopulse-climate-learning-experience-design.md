# EcoPulse Climate Learning Experience Design

## Goal

Turn the new Sunlit Planet Lab foundation into a real flagship learning experience by shipping an immersive Climate Change module, richer reading/vocabulary interactions, and a second-pass visual redesign of Learn, Eco Game and My Progress.

## Product direction

The module must feel like one connected learning story rather than a stack of forms. Scientific context comes first, then reading comprehension, then vocabulary recall, then a clear handoff into the existing structured curriculum. The module is deliberately practice-first in this phase: it does not silently mutate mastery or XP because the existing lesson engine is the canonical evidence system.

## Climate Change showcase

Create `/learn/climate-change` and route the first Home topic card there. The page contains:

- A sunlit climate hero with live-looking environmental data annotations.
- Five reading chapters based on the supplied Climate Change text: atmosphere/CO2, warming/ice, oceans, extreme weather, and action/system thinking.
- Five Reading Check questions with one-question-at-a-time interaction, keyboard shortcuts 1-3, progress indication, correct/retry/reveal feedback, and a final score summary.
- Ten vocabulary items: GREENHOUSE GAS, ATMOSPHERE, GLACIER, MELT, DROUGHT, WILDFIRE, SEA LEVEL, ACIDIC, EXTREME WEATHER, HABITAT.
- Vocabulary cards with English term, Kazakh meaning, short English definition and an example/context line.
- Recognition practice that rotates through all ten terms locally and shows completion progress.
- A final CTA into the canonical `/lesson/atmosphere` learning path and a secondary CTA to `/game`.

## Science/data presentation

Use dated, official-source-backed data cards. Show the measurement date or historical baseline next to every headline number. Avoid presenting an annual anomaly as if it were the same thing as warming since preindustrial times.

## Learn redesign

Keep the existing next-best-action and curriculum behavior but give the page a lighter orientation layer: a journey summary, clear “Climate Change flagship module” entry, improved world cards and calmer typographic hierarchy. Existing world and challenge unlock semantics remain unchanged.

## Eco Game redesign

Keep ReviewSession as the canonical spaced-review engine. Add an arcade-style surface above it that explains the current live mode and previews the other types of practice already available through lessons/challenges. No fake XP or fake unlocked games.

## My Progress redesign

Keep profile calculations unchanged. Present XP as activity progression, not a knowledge percentage. Add a visual pulse dial, split metrics into Language / Planet / Think / Act, make the next-best action dominant, and provide explicit links back to learning/game/action.

## Motion system

Add phase-level enter transitions, subtle ambient data/diagram movement, answer feedback motion, card hover/focus and score transitions using CSS transforms/opacity only. Every new motion has `prefers-reduced-motion` and `html[data-motion='reduced']` fallbacks.

## Accessibility

All quizzes support keyboard and pointer input. Correctness is communicated with text/icons in addition to color. Progress uses native ARIA progress semantics. Focus moves to the next question after a completed answer. No drag-only interaction is introduced.

## Performance

No new runtime dependency, canvas, or WebGL. Use CSS gradients and lightweight semantic markup. New data/content models are static TypeScript.
