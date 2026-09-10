# EcoPulse UX Clarity Pass — 2026-09-10

## Current verified state

- 507 / 507 regression tests pass.
- `npm run typecheck:core` passes.
- Independent TypeScript parser: 154 TS/TSX source files, 0 syntax errors.
- 14 app CSS files have balanced braces.
- Full `npm run typecheck` and `npm run build` are not verified in this sandbox because the extracted handoff intentionally has no `node_modules`; first failures are missing Next/React typings and `next: not found`.

## UX clarity work in this build

- Added plain-language descriptions to every primary navigation destination.
- Mobile navigation now explains what each area is for instead of showing labels alone.
- Added shared Page Orientation strips to Learn, Eco Game, Challenges, Eco Action, My Progress, Review, Settings and Explore.
- The orientation strip answers: what this page is, what to do now, and how it affects progress.
- Added a persistent simple journey model: Learn → Practice → Think → Act → Progress.
- Added a Home product map explaining the five major areas before the user has to explore them.
- Added consistent breadcrumbs to Topic Labs, Climate Change, Worlds, Missions and Concept details.
- Simplified internal product jargon in visible UI: Session progress, Key ideas, Connection check, Your progress, Reasoning challenge, Learning progress, Recommended focus and Current activity.
- Added explicit Ready / Locked / Complete status explanations to Challenges.
- Challenge runner now returns to Challenges; locked challenges separately route to the required learning.
- Lesson mobile header now exposes textual Step X of Y in addition to visual progress.
- Added responsive/mobile styling for all new clarity surfaces, including 430px layouts.

---

# CURRENT STATUS — AWWWARDS APP-WIDE FRONTEND + MOTION PASS — 2026-09-10

- Extended the Steep-inspired EcoPulse system into one app-wide design/motion language rather than isolated page effects.
- Added a measured sliding active indicator to desktop navigation, scroll-direction nav behavior, focus-managed animated mobile menu, safe-area handling, and scroll-position-preserving mobile body lock.
- Added contextual View Transition families for topic, lesson, game, back, detail, and generic navigation while retaining normal Next navigation and reduced-motion fallbacks.
- Added one global motion controller that classifies sections as narrative, practice, or instrument; orchestrates headings and grouped content; and applies pointer depth/magnetic feedback only for fine pointers.
- Added richer floating product artifacts for shared Explore/Challenges hero surfaces and depth-aware EcoPulse Home artifacts.
- Eco Arcade now uses a measured five-mode tab glider plus a local directional View Transition for only the changing game board.
- Eco Action and Challenges filters now share a reusable measured pill rail with localized list-only View Transitions instead of duplicating filter behavior.
- Climate Change now has a sticky active chapter navigator (Story / Reading / Words / Sources), including a horizontal mobile mode.
- Reworked large display copy toward sentence-case editorial serif hierarchy while preserving compact metadata/sequence labels where they carry meaning.
- Added dynamic `@starting-style` choreography for resolved lesson feedback, Arcade feedback, saved settings, and mission-complete states.
- Added shared `:focus-within` treatment for reflection/reasoning/settings surfaces, safe-bottom mobile resolved actions, coarse-pointer tactile states, and rendering containment for expensive below-fold sections.
- Added explicit responsive composition and motion tuning at 760 / 430 / 390 / 360px, plus coarse-pointer, reduced-data, reduced-motion, high-contrast, and forced-colors safeguards through the final accessibility layer.
- No canonical XP, mastery, review, mission, or lesson semantics were replaced by presentation effects.

## Fresh verification for this exact tree

- `npm test`: **495/495 PASS**.
- `npm run typecheck:core`: **PASS**.
- Independent global TypeScript parser: **151 `src/**/*.ts(x)` files, 0 syntax errors**.
- CSS brace balance: **PASS for all 14 loaded app stylesheets**.
- CSS import order: **PASS**, each stylesheet imported exactly once.
- Full `npm run typecheck`: **not passing in this sandbox because `node_modules` is absent**; first diagnostic is `Cannot find module 'next'`.
- `npm run build`: **not passing in this sandbox**, exits `127` with `next: not found`.
- The user's prior local build proved an earlier checkpoint can install/typecheck/build successfully, but that result is deliberately not claimed for this newer tree until the user runs `npm install && npm run typecheck && npm run build`.
- Browser screenshot/render QA is **not claimed** for this checkpoint.

---

# CURRENT STATUS — STEEP-INSPIRED EDITORIAL RESPONSIVE REDESIGN

- Applied the user-provided Steep reference system across the frontend through `reference-tokens.css`, `steep-editorial.css`, and `steep-motion.css`.
- Copied the supplied `DESIGN.md`, `theme.css`, `variables.css`, and `tokens.json` into `design-reference/steep/` as the auditable source reference.
- Uses the exact neutral reference palette/radii/spacing/elevation values while preserving EcoPulse green as a restrained brand/action signal.
- Maps unavailable proprietary Signifier/Sohne roles to existing bilingual-safe Noto Serif Display / Geologica fonts.
- Rebuilt shared desktop navigation and replaced the cramped mobile dock/header behavior with an accessible full-screen editorial menu sheet.
- Home now uses one shared navigation system and a product-first floating artifact collage: 8 topics, 5 game modes, EN+ҚАЗ, zero required account, and Earth/atmosphere as a contained artifact.
- Added explicit mobile tuning for 430px, 390px, and 360px: tighter hero, no giant blank Earth gap, stacked CTA layout, 2x2 product artifacts, contained Earth panel, 44px-class controls, compact section spacing.
- Applied editorial serif H1/H2 hierarchy, near-white surfaces, 24px card radius, pill CTAs, restrained peach accent, and low-shadow card treatment across Learn, Topic Labs, Climate, Game, Action, Challenges, Pulse, Review, Settings, onboarding, mission/world/concept surfaces.
- Added progressive same-origin native View Transition routing with standard Next navigation fallback and full reduced-motion escape hatches.
- Removed forced ALL-CAPS rendering from major product H1/H2 surfaces where the authored copy already provides casing.

## Verification

- `npm test`: **447/447 PASS** after the redesign.
- `npm run typecheck:core`: **PASS**.
- Independent TypeScript transpile parser: **149 TS/TSX files, 0 syntax diagnostics**.
- CSS brace balance: all app stylesheets balanced, including new editorial layers.
- Full `npm run typecheck` is **not verified in this container** because `node_modules` is absent; the first diagnostics are missing `next` / React JSX types, not a claimed production pass.
- Headless Chromium render proof was attempted but hung on the container DBus/browser environment, so no screenshot proof is claimed.

---

# MAX Continuation — Reading Depth, Session Guidance, Product Polish — 2026-09-10

This is the current handoff checkpoint after continuing beyond the previously packaged bulk frontend build.

## Implemented in this continuation

- All 7 compact non-flagship Topic Labs now include **3 authored bilingual reading chapters** between Briefing and Vocabulary.
- Every compact Topic Lab now follows a fuller transient learning loop: **Briefing → Reading → Reading Check → Words → Connections → Sources → System Check**.
- Added a 3-question bilingual Reading Check per Topic Lab with keyboard `1/2/3`, explanations, accessible feedback, and no canonical XP/mastery mutation.
- Topic Lab session pulse now measures three transient practice signals: **Reading /3, Words /4, System /3**.
- Added adaptive **Next Best Move** guidance that normalizes those three signals, points learners back to the weakest practice area, and advances perfect sessions to Eco Game.
- Added active-section tracking for the sticky Topic Lab rail using `IntersectionObserver`, `aria-current="step"`, and mobile centering with reduced-motion protection.
- Added an 8-topic Previous/Next sequence with semantic ARIA progress.
- Eco Game contains **5** transient practice modes plus a 5/5 session recap; completion still does not award canonical XP/mastery.
- Home now previews the real 5-mode Eco Game and links Eco Action previews into the actual `/action` experience.
- All 7 compact Topic Labs expose official source disclosures via a shared registry.
- CSS is split into ordered domain layers: `globals.css → sunlit.css → climate.css → experiences.css → product-polish.css → continuity.css → continuation.css → accessibility.css`.
- Long Topic Lab sections use anchor-safe scroll margins and progressive `content-visibility`; reduced-data, forced-colors, coarse-pointer, and reduced-motion safeguards cover the new surfaces.

## Fresh verification at this checkpoint

- `npm test`: **441/441 passing**.
- `npm run typecheck:core`: **passing**.
- Independent TypeScript parser: **261 TS/TSX files, 0 syntax errors**.
- CSS brace sanity: every loaded stylesheet has balanced opening/closing braces.
- CSS import order in `src/app/layout.tsx` matches the intended cascade exactly.
- Full `npm run typecheck`: **not passing in this sandbox** because `node_modules` is absent, so `next`, `react`, JSX and their type declarations cannot resolve.
- `npm run build`: **not passing in this sandbox**; fresh run exits `127` with `next: not found`.
- Previous offline dependency install attempt failed with `ENOTCACHED` for `@tailwindcss/postcss`; normal install attempts have timed out.
- Browser/render screenshot QA is **not claimed** for this checkpoint.

## Integrity note

Topic Lab reading checks, session pulse, and adaptive recap are deliberately **practice-only**. They do not write fabricated mastery, XP, real-world impact, or assessment claims into canonical learner progress.

---

# Current Bulk Frontend Upgrade — 2026-09-10

This package continues the sunlit EcoPulse redesign as one combined implementation pass rather than stopping after each numbered phase.

## Implemented in this bulk pass

- All 8 Home topics now have dedicated destinations. Climate Change remains the long-form flagship; the other 7 topics have real bilingual Topic Labs with overview, 4-word vocabulary practice, pronunciation, system connections, action links, and a transient Quick Check.
- `/game` now contains three real practice modes: Word Pulse, Climate Chain, and Eco Decision, with accessible tabs, keyboard navigation, number-key answers where applicable, and no fake canonical XP/mastery.
- `/action` is a dedicated light Eco Action cockpit with mission progress, three-step field plans, reflections, and the existing idempotent mission completion semantics.
- `/challenges` now shows checkpoint progress and a lighter challenge experience while retaining the canonical +50 XP completion rules.
- `/pulse` now exposes a four-part LANGUAGE / PLANET / THINK / ACT balance plus momentum cards, with explicit copy that these are in-app evidence rather than intelligence or real-world impact measurements.
- `/learn` includes an eight-topic atlas alongside the canonical 8-lesson structured journey.
- Product navigation includes instant EN/ҚАЗ switching. Mobile keeps five bottom-dock destinations and exposes Challenges through a separate compact shortcut.
- Canonical World pages, Explore shell, mission detail, onboarding/recovery/loading states, and most remaining major product surfaces use the lighter Sunlit Planet Lab visual direction. Explore keeps its graph itself dark as a contained data-visualization instrument.
- Added route-level enter motion, native CSS view-timeline reveal choreography as progressive enhancement, reduced-motion fallbacks, content-visibility containment for heavy lower-page sections, and a compact linear lesson progress bar on small screens.
- Added human-readable metadata for all seven new Topic Lab routes.

## Fresh verification for this package

- `npm test`: **396/396 passing** after the bulk implementation pass.
- `npm run typecheck:core`: **passing**.
- Dependency-independent TypeScript transpile/parse check: **140 `src/**/*.ts(x)` files, 0 syntax errors**.
- `src/app/globals.css`: **2285 opening / 2285 closing braces**.
- Full `npm run typecheck`: syntax defects found during QA were fixed; the remaining errors are dependency-resolution/JSX-type errors because `next`, `react`, and their type packages are not installed in this sandbox.
- `npm install --ignore-scripts --no-audit --no-fund`: attempted again and timed out in this environment; it did not leave a partial `node_modules` tree.
- `npm run build`: **not verified**; it exits with `next: not found` because frontend dependencies are unavailable here.
- Browser screenshot / rendered visual QA: **not claimed** in this environment.

## Deliberately not overstated

- The seven new non-flagship Topic Labs are polished compact learning experiences, not seven additional Climate-Change-sized long-form science modules.
- A real dependency-backed Next.js production build and browser breakpoint QA still need to be run on a machine where `npm install` can complete.
- No GSAP/WebGL dependency was added in this pass. Motion uses React/CSS primitives and native scroll/view timelines so the project remains lighter and friendlier to constrained Android/Termux development.
- `globals.css` remains large and should be split into focused design-system/page/motion files in a later architecture cleanup; this pass prioritized visible product breadth and behavior without destabilizing the existing learning engine.

---

# EcoPulse Implementation Status

## Phase 2 implemented

### Curriculum and learning engine

- Full authored MVP core curriculum: **8 lessons / 4 worlds**.
- Generic `/lesson/[slug]` renderer shared by all lessons.
- Versioned bilingual English/Kazakh lesson content.
- Stronger content validation: bilingual option labels, unique option/step IDs, valid answer references, non-negative XP, non-empty connection sets.
- Lesson presentation metadata contract guarantees every curriculum lesson has pronunciation and an authored visual mode.
- Scientific semantic relations and authored Explore graph integrity tests.

### Progress and memory

- Guest-first versioned local progress snapshot.
- Safe localStorage adapter with malformed/storage-error fallback.
- Deterministic review scheduling with first review after 1 day, then 1/3/7/14/30-day successful intervals.
- Review mistakes move material earlier without resetting knowledge to NEW.
- `NEW → SEEN → LEARNING → STRONG → MASTERED` mastery states remain separate from XP.
- Lesson completion bonus: **+40 XP exactly once**.
- Mission completion bonus: **+25 XP exactly once**.
- Review success: **+10 XP** while mastery changes independently.
- Next-best-action logic prioritizes due review, then next lesson, then mission.

### Product surfaces

- `/learn` — responsive authored learning journey and all-complete state.
- `/review` — due-word review session and empty/completed states.
- `/pulse` — Pulse Level/XP separated from mastery, concepts, Think, and Act metrics.
- `/challenges` — safe optional missions with no photo/location requirement.
- `/explore` — authored SVG knowledge map plus semantic/mobile list alternative.
- Responsive product navigation with mobile bottom navigation.
- LIFE and OCEAN-specific authored concept visuals.
- Guest hydration gates prevent interactions from racing local progress restore.
- Home CTAs navigate into the real product routes.

### Accessibility / resilience intent

- Keyboard 1/2/3 answers retained in lesson questions.
- No drag-only interaction.
- Semantic list alternative for the visual Explore graph.
- Reduced-motion production CSS retained.
- No autoplay audio; pronunciation is user-triggered with visible IPA and a device-speech fallback while curated recordings remain deferred.
- Loaded guest data fails safely when storage is unavailable or incompatible.

## Verification in this environment

Run fresh before handoff:

```bash
npm test
npm run typecheck:core
tsc -p /tmp/ecopulse-ui-check.json
git diff --check
```

The Node/core suite validates content, graph semantics, guest persistence, XP idempotency, review scheduling, curriculum navigation, mastery, and profile calculations.

## Environment limitation

This sandbox has not been able to resolve `registry.npmjs.org` (`EAI_AGAIN`), so frontend dependencies cannot be installed here. A real `next build` and browser render must therefore be performed on a normal networked machine before claiming production build/render verification.

Headless Chromium in this sandbox also hangs on trivial local HTML, so screenshot-based visual QA is not claimed here.

Run externally:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Then visually QA at:

```text
1440
1280
1024
768
430
390
360
```

## Remaining external/deferred verification work

1. Local-vendored/optimized institutional image binaries and curated pronunciation recordings (the current MVP has verified remote institutional media plus authored fallbacks and user-triggered device speech).
2. Supabase Auth/RLS runtime adapter after a real project/database is available for policy verification.
3. Real dependency-backed Next.js build.
4. Browser accessibility, performance and visual QA at the required breakpoints.


## Phase 3 — onboarding, checkpoints and richer exercises

Implemented:
- guest onboarding with A2/B1/B2 and a short deterministic “Not sure” diagnostic;
- interest selection with no school, age, GPS, photo, address or real-name collection;
- guest snapshot schema v2 with v1→v2 migration;
- four bilingual World Challenges with +50 XP awarded idempotently;
- challenge unlock rules: all lessons in the matching world must be completed first;
- accessible ordering exercise using 48px+ move-up/move-down controls, with no drag requirement;
- stronger ordering content validation and a scientifically careful land-ice → sea-level sequence.

Verification at the Phase 3 checkpoint:
- `npm test`: 68/68 passing;
- `npm run typecheck:core`: passing;
- dependency-independent TSX sanity check with temporary React/Next stubs: passing;
- `git diff --check`: passing.

Environment limitation remains unchanged: this sandbox cannot reach `registry.npmjs.org`, so a real Next.js dependency install/build cannot be truthfully claimed here.

## Phase 4 — science trust and reflective action

Implemented:
- typed official science-source registry with stable IDs, HTTPS links, institution/title metadata and last-checked dates;
- every one of the 8 MVP lessons now references at least one validated official source;
- lesson validator rejects blank/duplicate science-source references;
- quiet, keyboard-native `HOW DO WE KNOW?` disclosure on lesson result screens;
- guest state schema **v3** with backward-compatible v1/v2 migration;
- optional mission reflections, trimmed/capped at 280 characters and stored separately from completion state;
- mission completion remains optional and reflection-free; reflections are not part of analytics and require no photo/location;
- completed missions can save or revise a reflection without re-awarding mission XP.

Verification for the Phase 4 checkpoint:
- `npm test`: 76/76 passing;
- `npm run typecheck:core`: passing;
- dependency-independent TSX sanity check with temporary React/Next stubs: passing;
- `git diff --check`: passing.

The sandbox network limitation remains: `registry.npmjs.org` cannot currently be resolved, so a real dependency-backed `next build` must still be verified externally.

## Phase 5 — sync-ready account boundary

Implemented without adding an unverified Supabase runtime dependency:
- pure immutable `mergeProgressSnapshots(local, remote)`;
- completion/scenario/mission/challenge/concept evidence is unioned rather than lost;
- stronger mastery wins; review conflicts schedule conservatively;
- total XP uses `max(local, remote)` rather than summing snapshots, preventing sync-based XP inflation;
- remote account reflections/settings win actual conflicts while local data fills remote gaps;
- repository interface + `syncProgressSnapshot` supports first-account upload and returning-account merge;
- merge is deterministic/idempotent under repeated sync;
- exact Supabase SSR/RLS verification contract documented in `docs/backend/SUPABASE_SYNC_CONTRACT.md`.

No Supabase migration or client adapter is claimed as implemented: the CLI/project database is not available in this sandbox, and current Supabase guidance requires RLS/grant tests against an actual environment before calling that layer complete.

## Phase 6 — richer accessible exercise engine

Implemented:
- `fact_myth` lesson steps with bilingual claim validation, 1/2 keyboard shortcuts and calm two-attempt feedback;
- `fill_blank` typed English recall with case-insensitive, trimmed and whitespace-normalized accepted-answer evaluation;
- `matching` concept-definition practice using native selects, so keyboard/touch users never depend on dragging;
- dedicated UI components rather than a universal card, while sharing the existing XP/progress path;
- authored exercises in Weather vs Climate, Glaciers, and Habitats;
- stronger validators for malformed accepted answers, duplicate matching IDs, bilingual matching content, and bilingual Fact/Myth statements.

Verification before the Phase 6 commit/package:
- `npm test`: **86/86 passing**;
- `npm run typecheck:core`: passing;
- dependency-independent TSX sanity check with temporary React/Next stubs: passing;
- `git diff --check`: passing.

The sandbox limitation remains unchanged: `npm install` still fails with `EAI_AGAIN` while resolving `registry.npmjs.org`, so a real dependency-backed `next build` is not claimed here.


## Phase 7 — persistent learning/accessibility settings

Implemented:
- guest state schema **v4** with lossless v1/v2/v3 migration and safe settings normalization;
- persistent lesson-language preference (`en` / `kk`) instead of resetting every lesson to English;
- explicit `system` / `reduced` motion preference applied at the document root after hydration;
- `/settings` screen with native, keyboard-focusable controls and no personal-information fields;
- My Pulse contains the settings entry point while the five-item mobile primary navigation remains unchanged;
- account merge keeps remote account settings on actual returning-account merges.

Verification for the Phase 7 checkpoint: **91/91 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing.


## Phase 8 — mastery integrity

Implemented:
- guest-state schema **v5** with per-word mastery evidence and lossless v1-v4 migration;
- authored exercise `masterySignals` validated against lesson target vocabulary;
- successful lesson answers record only the evidence actually tested; incorrect answers do not create positive evidence;
- staged review modes: recall → context → recognition → delayed recall;
- MASTERED requires recognition + recall + context + delayed-review evidence;
- account sync merges evidence conservatively and recomputes mastery labels;
- all 15 review items include bilingual contextual prompts.

Fresh Phase 8 verification: **106/106 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. The npm-registry `EAI_AGAIN` sandbox blocker still prevents a dependency-backed `next build` from being claimed.


## Phase 9 — concept detail and mastery transparency

Implemented:
- bilingual metadata and valid science-source references for all authored Explore nodes;
- pure concept-detail resolver with semantic incoming/outgoing relations;
- `/concept/[slug]` pages with description, connection list, source layer and lesson/review actions;
- mastery evidence checklist for vocabulary concepts with no percentage knowledge score;
- Explore SVG nodes and mobile semantic list now navigate to the same concept pages.

Fresh Phase 9 verification: **110/110 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing.


## Phase 10 — dedicated World pages

Implemented:
- `/learn/[world]` static routes for all four authored worlds;
- bilingual world thesis/description metadata for Earth & Atmosphere, Ice & Water, Extremes, and Life & Habitats;
- pure `resolveWorldDetail()` contract deriving lessons, checkpoint, total minutes, unique target vocabulary, and connection previews from authored curriculum content;
- deterministic `resolveWorldNextAction()` progression: first incomplete lesson → world checkpoint → completed world;
- progress-aware world UI with semantic relation list, lesson states, checkpoint lock/connected states, and persisted EN/ҚАЗ preference;
- Learn page world overview layer with direct world navigation while preserving direct lesson links;
- responsive 1440/tablet/mobile layouts with no drag-only or color-only required interaction.

Fresh Phase 10 verification: **117/117 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by the sandbox npm-registry `EAI_AGAIN` limitation.


## Phase 11 — adaptive learning support

Implemented:
- pure A2/B1/B2 support profiles with B1 as the safe fallback when onboarding level is unset;
- A2 guided mode: auto Kazakh meaning support on English Discover screens, bilingual choice labels, and early authored clues where available;
- B1 standard mode: existing English-first behavior with support after an incorrect attempt;
- B2 impact mode: fewer hints plus a short English reasoning attempt after every Think decision;
- one authored bilingual B2 extension prompt for each of the 8 production Think steps;
- content validation for bilingual extension prompts;
- level/mode visibility inside lessons and A2/B1/B2 controls in `/settings`;
- no step-count, XP, correct-answer, scientific-fact, or mastery-rule changes across levels;
- B2 reasoning remains transient local component state and is not analytics/profile/mastery data.

Fresh Phase 11 verification: **124/124 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. The npm-registry `EAI_AGAIN` limitation still prevents dependency-backed `next build` verification in this sandbox.


## Phase 12 — accessibility focus and document semantics

Implemented:
- pure bilingual accessibility helpers for document language, one-indexed lesson progress text, and authored step announcements;
- localized skip link as the first focusable control with a stable `#main-content` target on every route;
- hydrated EN/ҚАЗ preference synchronizes the root `<html lang>` while preserving the existing reduced-motion root marker;
- lesson dot progress now exposes `role="progressbar"`, min/max/current values, and bilingual `aria-valuetext`;
- lesson-step changes produce a polite bilingual status announcement and move programmatic focus only when the authored step index changes;
- answer selection, hint reveal, retries, and other intra-step feedback do not trigger focus movement;
- programmatic container focus suppresses its own visual outline while interactive controls keep the global visible focus treatment.

Fresh Phase 12 verification: **127/127 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by the sandbox npm-registry `EAI_AGAIN` limitation.


## Phase 13 — real transient homepage learning demo

Implemented:
- approved Glacier meaning question as a real homepage interaction rather than a decorative mockup;
- pure retry policy with one clue-bearing second attempt before answer reveal;
- EN/ҚАЗ demo language controls and keyboard `1/2/3` answer shortcuts;
- `GLACIER → MELT → SEA LEVEL` connection reveal after resolution;
- demo component intentionally has no guest-progress import and cannot write XP/mastery;
- hero and connection-preview start-intent CTAs now route through `/start` instead of bypassing onboarding;
- responsive desktop/tablet/mobile styling and reduced-motion-safe transitions.

Fresh Phase 13 verification: **130/130 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. The npm-registry `EAI_AGAIN` limitation still prevents dependency-backed `next build` verification in this sandbox.


## Phase 14 — returning learner continuity

Implemented:
- pure bilingual `resolveNextLearningAction()` used as the single source of truth for due review → next lesson → optional mission → Explore;
- returning `/start` no longer repeats onboarding or blindly routes to `/learn`;
- returning screen presents the exact next action in persisted EN/ҚАЗ;
- My Pulse now consumes the same resolver instead of maintaining a second priority implementation;
- completed core learners with unfinished missions are offered a mission, while fully complete learners move to Explore.

Fresh Phase 14 verification: **134/134 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains gated by the sandbox npm-registry `EAI_AGAIN` limitation.


## Phase 15 — navigation and Next Best Action consistency

Implemented:
- pure five-item AppNav presentation with persisted EN/ҚАЗ labels;
- due-review badge inside the existing Review destination without adding a sixth primary item;
- Learn hero now follows the shared review → lesson → mission → Explore priority rather than always pushing new content;
- review/lesson/mission/complete hero states preserve the existing learning journey below;
- navigation and Learn changes do not modify scoring, mastery, or persistence semantics.

Fresh Phase 15 verification: **137/137 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains gated by the sandbox npm-registry `EAI_AGAIN` limitation.


## Phase 16 — bilingual onboarding

Implemented:
- typed authored EN/ҚАЗ content for all level choices, interest labels, diagnostic prompts, onboarding notes, and result copy;
- EN/ҚАЗ language controls directly in `/start`, persisted through the existing learning-settings state;
- root document `lang` changes immediately through the Phase 12 provider contract;
- English diagnostic answer strings remain English in both presentation modes and are explicitly marked `lang="en"`;
- no extra onboarding steps, personal data collection, or changes to level-inference/science rules.

Fresh Phase 16 verification: **140/140 tests**, core TypeScript typecheck, dependency-independent TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains unverified until dependency installation can be completed.

## Phase 17 — production chrome hardening

Implemented:
- one typed EN/ҚАЗ product-chrome source for Review, My Pulse, Explore, Challenges, Missions, concept detail, and World Challenge states;
- persisted language now drives the Knowledge Map node/relation labels and challenge locale instead of resetting those surfaces to English;
- route ownership helper maps nested `/lesson`, `/learn/[world]`, `/concept`, `/challenge`, and `/settings` routes back to exactly five primary navigation destinations;
- AppNav exposes `aria-current="page"` and a visible current-route signal while preserving the existing review badge;
- mission instructions/reflection chrome and review prompts/feedback are bilingual while English-production inputs remain explicitly `lang="en"`;
- homepage demo answer selection uses `aria-pressed` and its feedback uses polite live regions;
- no scoring, mastery, review scheduling, mission XP, or science content semantics changed.

## Phase 18 — end-to-end localization continuity

Implemented:
- typed EN/ҚАЗ Home and Learn presentation copy in the shared product-copy contract;
- Home hero/navigation, connection preview, learning loop, action section and final CTA now follow persisted locale;
- homepage live demo initializes from persisted locale while remaining read-only with respect to guest progress;
- Learn world rows, authored world headlines, lesson titles, statuses, checkpoint titles/metadata and CTAs are bilingual;
- English target vocabulary stays English and is explicitly marked where appropriate;
- no changes to lesson step order, science facts, scoring, mastery, review scheduling, or persistence schema.

Fresh Phase 18 verification: **145/145 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` is still externally gated by unavailable npm registry access in this sandbox.

## Phase 19 — scientific source hardening

Implemented:
- reverified official NASA, USGS and NOAA source URLs on 2026-09-10;
- added typed science claim tags for atmosphere basics, weather/climate, sea level, land-ice melt, drought/fire interaction, wildfire risk, ecosystems, and ocean acidification;
- added per-lesson source requirements and tests proving authored lesson sources cover each scientific focus;
- machine checks require official nasa.gov/usgs.gov/noaa.gov hosts, non-empty claim coverage, and current non-future `lastChecked` metadata;
- no science lesson copy, causal relation semantics, scoring, mastery, or learner progress logic changed.

Fresh Phase 19 verification: **147/147 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing.

## Phase 20 — SEO and privacy indexing hardening

Implemented:
- pure segment-aware indexing policy separating public discovery routes from private learner-state/assessment routes;
- explicit `noindex, nofollow` metadata on `/start`, `/review`, `/pulse`, `/settings`, lesson routes, and World Challenge routes, including the legacy Atmosphere lesson path;
- one tested public metadata-content source for Home, Learn, Explore, and Challenges;
- authored dynamic metadata for `/learn/[world]` from world presentation content and `/concept/[slug]` from Knowledge Graph content;
- unknown dynamic world/concept metadata fails closed with `noindex` before the route resolves to 404;
- no sitemap or canonical production URL is invented before a real deployment domain exists.

Fresh Phase 20 verification: **153/153 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing. A fresh npm probe still fails with `EAI_AGAIN` resolving `registry.npmjs.org`, so dependency-backed `next build` remains externally gated in this sandbox.

## Phase 21 — route resilience and branded recovery

Implemented:
- authored route-integrity tests proving every lesson world, concept lesson reference, concept world and World Challenge world resolves to current curriculum structure;
- uniqueness checks for public concept and World Challenge route IDs;
- source-level QA that derives App Router page patterns and verifies every literal internal component `href` resolves to an existing page;
- bilingual Living Editorial Science not-found boundary using the persisted EN/ҚАЗ preference;
- recovery actions back to Learn and Home without creating a new progress/scoring path;
- release-source scan found no TODO/TBD/Coming-next markers or debug logging in production source; HTML/CSS placeholder occurrences are intentional input placeholder attributes/styles.

Fresh Phase 21 verification: **158/158 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing.

## Phase 22 — runtime loading and failure recovery

Implemented:
- bilingual route-segment `error.tsx` recovery inside the normal EcoPulse shell;
- provider-independent `global-error.tsx` fallback for root-layout/provider failures, with English and Kazakh recovery copy available even when guest settings cannot load;
- error UI never renders `error.message`, stack traces, digests, or stringified error objects to the learner;
- safe Retry/Home recovery actions without changing XP, mastery, review, mission, or account state;
- branded App Router loading boundary with polite live status, `aria-busy`, persisted EN/ҚАЗ presentation, and reduced-motion-safe Pulse animation;
- regression tests covering copy completeness, safe error-detail handling, global fallback, and loading semantics.

Fresh Phase 22 verification: **162/162 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing.

## Phase 23 — baseline response security and privacy headers

Implemented:
- framework disclosure remains disabled with `poweredByHeader: false`;
- catch-all `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` response headers;
- `Referrer-Policy: strict-origin-when-cross-origin` to reduce cross-origin referrer leakage while preserving normal same-origin navigation context;
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` matching the MVP privacy contract (no camera, microphone, or location requirement);
- tests assert the exact approved header contract;
- Content Security Policy and HSTS are intentionally not guessed before a dependency-backed deployment/runtime verification can confirm script/font/image requirements and the final HTTPS domain policy.

Fresh Phase 23 verification on the exact checkpoint tree: **165/165 tests**, core TypeScript typecheck, and `git diff --check` all passing. No application TS/TSX source changed in this phase.

## Phase 24 — explicit pronunciation playback

Implemented:
- explicit per-lesson `spokenTerms` kept separate from visual IPA strings, preventing IPA punctuation/stress marks from being sent to speech synthesis;
- dedicated pronunciation control on Discover steps replacing the previous disabled “planned audio” button;
- playback is strictly user-triggered: there is no autoplay or speech side effect during render/effect setup;
- optional authored `audioSrc` takes priority when curated recordings are later supplied; current MVP falls back to the browser/device English speech-synthesis voice;
- speech text normalization trims blanks, removes duplicate terms case-insensitively, preserves authored order, and inserts audible pauses between terms;
- playback cancels safely on unmount and exposes EN/ҚАЗ control labels;
- visual control styling follows existing focus, reduced-motion, and Living Editorial Science interaction language.

Fresh Phase 24 verification: **169/169 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing. Device speech synthesis is an MVP fallback, not a claim of curated/native-speaker recording quality.

## Phase 25 — learner-owned local data controls

Implemented:
- versioned JSON export of the portable guest learning snapshot, including XP, lesson progress, mastery evidence, review timing, missions, optional reflections, World Challenges, onboarding choices, and settings;
- export happens entirely in the browser through a local Blob download and performs no network request;
- immutable `resetLearningProgress()` clears learning history while preserving preferred EN/ҚАЗ language, A2/B1/B2 level, interests, and motion preference;
- Settings now exposes a bilingual Local Data section with explicit disclosure of what is exported/reset;
- destructive reset requires a second confirmation action and clearly states that it cannot be undone without an earlier export;
- reset preserves learner preferences but clears XP, lesson progress, mastery/evidence, reviews, connected concepts, scenarios, missions/reflections, and checkpoint completion.

Fresh Phase 25 verification: **173/173 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS structural sanity, local-only network-source audit, and `git diff --check` all passing.

## Phase 26 — source-backed institutional educational media

Implemented:
- typed institutional-media manifest for exactly three deliberately selected NASA Earth Observatory visuals: atmosphere limb, Easton Glacier, and tidal-wetland habitat;
- bilingual EN/ҚАЗ alt text, exact source pages, visible credits, authored dimensions, usage scope, and 2026-09-10 verification metadata;
- pure Home/Lesson media resolver so visual selection remains content-owned rather than scattered across JSX;
- progressive fallback-first rendering: existing authored CSS/SVG diagrams render immediately, institutional imagery fades in only after successful load, and the authored diagram remains on failure;
- Home atmosphere imagery is eager; lesson imagery is lazy; explicit dimensions reduce layout shift;
- remote image requests use `referrerPolicy="no-referrer"`, source links use `rel="noreferrer"`, and no NASA logo/insignia is used;
- truth-preserving annotations only: Atmosphere / Earth limb, Glacier / land ice, and Wetland / habitat;
- the Delaware wetland asset is explicitly disclosed in EN/ҚАЗ as a false-color Landsat view, so learners are not led to read enhanced colors as literal natural color;
- NASA source/credit policy and future local-vendoring gate documented in `docs/content/MEDIA_SOURCES.md`.

Fresh Phase 26 verification: **181/181 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS/media structural sanity, no NASA-logo source references, and `git diff --check` all passing.

Container DNS cannot retrieve NASA binary assets, so this checkpoint does **not** claim locally optimized image files. The current implementation uses the verified NASA-hosted renditions with authored diagram fallbacks. Local WebP/AVIF vendoring remains a deployment/build-environment task once external binary access is available.


## Phase 27 — reduced-data institutional media policy

Implemented:
- guest learning settings schema v6 adds an explicit `media: auto | reduced` preference while preserving all v1–v5 learning-state migrations;
- `Auto` respects the browser `Save-Data` connection hint when available, while `Reduced Data` always suppresses remote institutional image requests;
- institutional media remains diagram-first during hydration/policy detection, so no remote request is created before the learner/data-saving policy is known;
- Settings exposes bilingual EN/ҚАЗ Auto and Reduced Data controls with explicit explanation that real NASA imagery is optional and authored diagrams preserve the lesson;
- suppressed/failed media surfaces communicate that an authored diagram is being shown instead of leaving an empty media region;
- export/reset and account-sync continue to preserve the complete settings object; scoring, mastery, review intervals, XP and science content are unchanged.

Fresh Phase 27 verification: **185/185 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS structural sanity, and `git diff --check` all passing.


## Phase 28 — public learning/science methodology trust layer

Implemented:
- real public `/about` route using the already-public indexing policy rather than inventing a new marketing route;
- typed bilingual EN/ҚАЗ methodology copy covering the full `Learn → Understand → Connect → Think → Act → Review → Master` loop;
- production proof metrics derived from the authored curriculum, Knowledge Graph, science-source registry and institutional-media manifest rather than hard-coded marketing numbers;
- explicit mastery explanation separating Pulse XP activity progression from recognition/recall/context/delayed-review evidence;
- semantic relationship vocabulary and an official-source policy explaining why EcoPulse does not treat every graph edge as deterministic causation;
- live official science-source registry with last-checked dates, plus institutional media credits/source links;
- public privacy/action principles covering optional missions, no GPS/photo proof, local reflections, export and learner-controlled reset;
- accessibility/resilience principles covering non-drag ordering, non-color-only feedback, click-only audio, bilingual alt/credits, Reduced Data and Reduced Motion;
- persisted EN/ҚАЗ language toggle on the methodology page and Home entry points on desktop plus the final CTA area on mobile.

Fresh Phase 28 verification: **189/189 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS brace/structural sanity, route/indexing integrity, and `git diff --check` all passing. The external npm-registry/DNS limitation remains, so a dependency-backed `next build` is still not claimed in this sandbox.


## Phase 29 — methodology print/share distribution controls

Implemented:
- user-triggered `Print / Save PDF` control on the public methodology page;
- user-triggered native Web Share with clipboard fallback and a safe browser-address fallback when neither API is available;
- bilingual EN/ҚАЗ share title/text and status messaging;
- no share/print side effects during render/effects and no analytics or learner-progress writes;
- dedicated print stylesheet that removes interactive navigation/controls, converts dark sections to readable paper output, avoids breaking evidence/source rows where possible, and prints external source URLs alongside citations.

Fresh Phase 29 verification: **192/192 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS/print structural sanity, and `git diff --check` all passing.

## Phase 30 — lesson interaction localization hardening

Lesson-adjacent interaction chrome now uses one typed EN/ҚАЗ presentation contract instead of scattering English status strings across JSX. Choice, Fact/Myth, Fill Blank, Matching, Ordering, Connection, Result, lesson loading/support controls, source disclosure, pronunciation states, lesson-header accessibility labels, and explanatory diagram ARIA labels all resolve from `lessonUiCopy`. Target environmental vocabulary and diagram concepts intentionally remain English because they are the language-learning objects rather than interface chrome.

The localization regression test also source-audits the affected lesson components so fixed English feedback/status copy cannot silently return in future edits. No science claims, answer logic, XP, mastery evidence, review scheduling, or persisted progress behavior changes in this phase.

Fresh Phase 30 verification: **194/194 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.


## Phase 31 — adaptive micro-reading and stable resume anchors

Implemented:
- guest-state schema **v7** adds optional stable `currentStepId` anchors while preserving v1–v6 snapshots through a frozen legacy step map;
- lesson resume resolves by stable authored step ID first, with numeric-index fallback only for defensive compatibility;
- account progress sync selects a winning lesson-progress snapshot and preserves its `(currentStepIndex, currentStepId)` pair atomically, while attempts are unioned and XP remains conservative;
- all **8/8 MVP lessons** now include exactly one adaptive English `reading` step immediately before Think;
- A2/B1/B2 passages vary language complexity but preserve the same scientific truth and comprehension answer;
- reading passages/questions remain English learning material while support/feedback is EN/ҚАЗ;
- successful reading comprehension contributes authored `context` mastery evidence only; viewing the passage alone contributes no mastery;
- `ReadingExercise` supports keyboard `1/2/3`, touch, two-attempt feedback, `aria-pressed`, and polite live feedback;
- lesson versions were raised to `1.1.0` to reflect the content change without invalidating stable resume anchors;
- official science coverage was strengthened for glacier formation/flow, local sea-level variation, and drought indicators.

Fresh Phase 31 verification: **206/206 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS brace integrity, renderer/resume source audit, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.


## Phase 32 — adaptive listening comprehension

Implemented:
- one adaptive `listening` step in all **8/8 MVP lessons**, positioned after Reading and before Think;
- A2/B1/B2 English utterances that vary language/delivery complexity without changing scientific truth or the correct answer;
- typed validation for utterances, answer IDs, HTTPS recorded-audio overrides, context-only mastery signals and XP;
- pure level-aware playback plans (`A2 0.78`, `B1 0.88`, `B2 0.98`) with optional recorded-audio URLs;
- dedicated `ListeningExercise` with explicit Play/Replay, recorded-audio-first and device-voice fallback, always-available Transcript support, keyboard `1/2/3`, two-attempt feedback, and no autoplay;
- answer options stay hidden until Play or Transcript, preventing pre-reading of choices from replacing listening;
- audio failure never blocks completion because Transcript remains available;
- correct comprehension contributes only authored `context` evidence, while playback/transcript access alone contributes no XP or mastery;
- EN/ҚАЗ listening chrome integrated into the shared `lessonUiCopy` contract and localization regression coverage;
- explicit science-source requirements for listening claims, including sea-level thermal expansion and multi-factor wildfire risk;
- lesson content versions raised to `1.2.0`; schema v7 stable step IDs preserve existing resume anchors.

Fresh Phase 32 verification: **213/213 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity check, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.


## Phase 33 lesson-to-mission continuity

Lesson completion now reconnects the approved learning loop to safe off-screen action instead of jumping directly to another lesson. Every production lesson resolves through one authored lesson-to-mission mapping; unknown lessons never invent a mission. Result screens surface the relevant optional mission with time/no-photo/no-location metadata while preserving the direct next-lesson or learning-map action, so missions never become a completion gate.

EcoPulse now has a focused private `/mission/[slug]` route for each authored mission. It uses the existing idempotent guest completion/reflection domain, keeps reflections local-only and optional, caps them at 280 characters, and returns completed learners to My Pulse. Persisted reflections hydrate correctly until the learner explicitly edits them. Unified Next Best Action now points to the exact first unfinished mission rather than the general Challenges page, and `/mission/*` correctly belongs to Challenges in primary navigation while remaining `noindex, nofollow`.

Fresh Phase 33 verification: **222/222 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.


## Phase 34 source-backed World Challenge reasoning

World Challenges now carry their own official science-source references instead of relying indirectly on lesson citations. Weather Detective is backed by NASA weather/climate material, The Coastal City by NASA sea-level/land-ice material, The Dry Season by USGS drought/fire material, and The Living Network by USGS ecosystem material. Machine-checkable claim requirements ensure those source sets continue to cover each checkpoint's scientific focus.

Checkpoint completion now includes one final short English reasoning explanation after the authored decisions and before the +50 XP completion action. EcoPulse only requires a minimal three-word reasoning attempt; it does not grade the learner's opinion, persist the text, add mastery evidence, or send it anywhere. The final reasoning surface exposes the official source disclosure before completion, while the existing idempotent World Challenge domain remains the only path that awards +50 XP.

Fresh Phase 34 verification: **226/226 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 35 — varied long-term review maintenance

Long-term vocabulary maintenance no longer saturates at stage 5 and repeat the same delayed-recall format forever. Successful review stages now keep increasing while the scheduling interval remains capped at 30 days. The initial mastery path is unchanged (`recall → context → recognition → delayed recall`), then maintenance rotates through `context → recall → recognition → delayed recall` before repeating.

All maintenance stages still refresh the existing delayed-review mastery gate rather than inventing new mastery dimensions. An incorrect maintenance response therefore removes the delayed-review gate while preserving previously demonstrated recognition, recall and context evidence. XP, guest schema, review content and initial 1/3/7/14/30-day scheduling are unchanged.

Fresh Phase 35 verification: **227/227 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 36 — honest review batching

A review visit remains intentionally short even when a learner has a larger overdue backlog. The pure `buildReviewBatch()` contract now separates the current focused batch from the total number of due records: at most 8 items are shown in one batch, while `totalDue` and `remainingCount` preserve the truthful backlog.

`ReviewSession` initializes only after guest progress has hydrated, avoiding a false `Nothing due` flash. After the learner finishes a batch, due work is recomputed from the updated review records, so the just-reviewed items are no longer counted. If more words remain due, EcoPulse explicitly reports the remaining count and offers a user-triggered `Continue review` action; it never silently chains into an unbounded session or falsely announces that review is complete. Once no due work remains, the existing My Pulse completion path returns unchanged.

Fresh Phase 36 verification: **230/230 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Review scheduling, maintenance-mode rotation, mastery evidence and XP rules are unchanged. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 37 — review accessibility parity

Implemented:
- bilingual pure review progress and active-item announcement formatters;
- semantic one-indexed `progressbar` for each focused review batch;
- polite screen-reader announcement containing review position, current review mode and target English word;
- guarded `1/2/3` keyboard shortcuts for recognition review, ignored for editable controls, modifier shortcuts and key-repeat;
- `aria-keyshortcuts` and selected-state semantics on recognition answer controls;
- explicit focus handoff to the next active review item after `Next` or `Continue review`, with no focus movement when answer feedback alone changes;
- visible focus treatment on the programmatic review item target.

Fresh Phase 37 verification: **235/235 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check`. Review scoring, XP, mastery evidence, scheduling and batching are unchanged. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 38 — safe typed-review normalization

Implemented:
- typed recall/context answers use Unicode NFKC normalization before comparison;
- harmless sentence punctuation no longer turns a known word into an incorrect review result;
- common hyphen/dash/underscore compound separators normalize to spaces, allowing formats such as `sea-level` for `SEA LEVEL`;
- whitespace/case normalization remains unchanged;
- recognition answer IDs remain strict and are never normalized;
- no edit-distance, stemming, autocorrection, semantic guessing or typo tolerance was introduced; explicit negative tests keep misspellings incorrect.

Fresh Phase 38 verification: **236/236 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check`. XP, mastery evidence, review scheduling, maintenance rotation, batching and accessibility behavior are unchanged. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 39 — idempotent review submission

Implemented:
- new pure `submitDueReviewAnswer()` domain boundary owns due validation, answer evaluation, mastery evidence, review scheduling and review XP as one immutable operation;
- correct due submissions award +10 XP exactly once and advance the review record exactly once;
- incorrect due submissions award no XP, increment mistakes once and schedule relearning once;
- immediate duplicate submissions become no-ops because the first accepted result moves `dueAt` into the future;
- future/non-due and missing review records cannot mutate XP, mastery or scheduling;
- `ReviewSession` no longer directly calls `recordReviewResult`, `applyReviewEvidence`, `computeMasteryState`, or increments XP;
- existing recognition keyboard shortcuts, focus handoff, honest eight-item batching and safe typed normalization are preserved.

Fresh Phase 39 verification: **243/243 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 40 — persistence failure transparency

Implemented:
- `loadGuestStateWithStatus()` distinguishes working local storage from read failure/missing storage while keeping the original `loadGuestState()` API compatible;
- `GuestProgressProvider` exposes `checking`, `saved`, and `unavailable` persistence status and observes the boolean result of every local save;
- a global bilingual, non-modal `PersistenceNotice` appears only after hydration when durable local saving is unavailable;
- warning copy explicitly says progress remains available in the current tab but is not durably stored, avoiding the previous false-safety implication;
- the recovery action links directly to `#data-controls`, where the learner can export the in-memory guest snapshot as JSON;
- the warning automatically disappears if a later state save succeeds;
- guest schema, progress, XP, mastery, review scheduling and privacy boundaries are unchanged.

Fresh Phase 40 pre-checkpoint verification: **249/249 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 41 — multi-tab conflict protection

Implemented:
- `GuestProgressProvider` listens for external browser `storage` events on the exact EcoPulse guest-progress key;
- an external write changes persistence state to `conflict`;
- a conflicted tab stops all subsequent guest-progress writes, preventing a stale local snapshot from overwriting newer progress from another tab;
- EcoPulse deliberately does **not** reuse the account-sync merge policy for live tabs because conservative review merging could resurrect already-reviewed due records;
- the bilingual persistence notice explains the conflict and provides both local export and explicit reload recovery actions;
- in-memory interaction can continue, but the UI no longer implies those changes are being persisted from the conflicted tab;
- no guest schema, XP, mastery, review scheduling or server-sync behavior changed.

Fresh Phase 41 pre-checkpoint verification: **252/252 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 42 — corrupt snapshot quarantine

Implemented:
- `loadGuestStateWithStatus()` now classifies local data as `unavailable`, `empty`, `valid`, `corrupt`, or `unsupported` and preserves the raw stored payload when present;
- malformed JSON and malformed current-schema snapshots are quarantined instead of being silently overwritten by the clean fallback state;
- future/unsupported schema versions are preserved without downgrade;
- valid empty current snapshots remain valid and are not falsely flagged as corruption;
- `GuestProgressProvider` exposes quarantined raw bytes, maps integrity to protected persistence states, and suppresses autosave for `corrupt`/`unsupported`;
- multi-tab conflict handling cannot replace an existing quarantine state;
- bilingual recovery UI can download the exact raw payload before a destructive reset;
- `Start fresh` requires a second explicit confirmation, clears only on user action, then reloads;
- existing `parseGuestState()` fallback behavior and guest schema version remain unchanged.

Fresh Phase 42 pre-checkpoint verification: **261/261 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 43 — strict legacy snapshot integrity

Implemented:
- guest-state parsing now exposes `parseGuestStateStrict()` so storage integrity can distinguish a successful migration from the historical clean-state fallback;
- the existing `parseGuestState()` API remains backward-compatible and still returns a clean state for direct callers on invalid input;
- valid empty and populated schema v1-v6 snapshots continue through their authored migrations to current schema v7;
- malformed legacy snapshots, including invalid core values or missing version-required fields, are now classified as `corrupt` rather than `valid`;
- quarantined legacy payloads preserve their exact raw bytes and therefore use the same download-before-reset recovery path introduced in Phase 42;
- future schema versions remain `unsupported` and are never downgraded.

Fresh Phase 43 pre-checkpoint verification: **264/264 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 44 — safe browser storage acquisition + hydration-safe data controls

Implemented:
- browser storage acquisition now goes through `getBrowserStorage()` so a `SecurityError` thrown by the `window.localStorage` getter itself is handled as unavailable storage instead of crashing the provider;
- `GuestProgressProvider`, persistence recovery, and Settings data controls no longer access `window.localStorage` directly;
- Export and Reset are disabled until guest-state hydration completes, preventing accidental export/reset of the pre-hydration empty snapshot;
- normal Reset clears the durable browser snapshot before mutating in-memory progress and only reports success when that durable clear succeeds, except when storage is already known to be unavailable;
- general Reset stays disabled during multi-tab conflict and corrupt/unsupported quarantine states so specialized recovery flows cannot be bypassed;
- EN/ҚАЗ loading/failure copy makes the temporary disabled state and failed durable clear explicit;
- guest schema remains v7 and XP, mastery, review scheduling, sync, conflict protection, and quarantine behavior are unchanged.

Fresh Phase 44 verification: **270/270 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 45 — last-chance guest persistence flush

Implemented:
- guest persistence now exposes a single `flushGuestStateBeforeExit()` boundary for browser-exit durability;
- `GuestProgressProvider` keeps a freshest-state ref updated synchronously with every guest-state mutation so page-exit handling does not depend on a later React effect;
- the latest guest snapshot is flushed on `pagehide` and when document visibility becomes `hidden`;
- a previously unavailable save gets one last retry if storage is accessible again at exit time;
- `checking`, `conflict`, `corrupt`, and `unsupported` states are hard-blocked from exit flushes so stale or quarantined data can never overwrite protected snapshots;
- existing autosave, multi-tab conflict protection, quarantine, XP, mastery, review scheduling, and guest schema v7 remain unchanged.

Fresh Phase 45 verification: **274/274 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 46 — empty-string snapshot quarantine

Implemented:
- only `null` from `localStorage.getItem()` is treated as an empty/new guest slot;
- an explicitly stored empty string now goes through parsing, fails validation, and is quarantined as `corrupt` with its raw bytes preserved;
- this closes a data-loss edge case where malformed stored data could previously be mistaken for a new user and overwritten;
- guest schema, migrations, autosave, recovery, XP, mastery, and review behavior are unchanged.

Fresh Phase 46 verification: **275/275 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing.

## Phase 47 — local learning-data import and restore

Implemented:
- EcoPulse learning-data exports can now be restored locally from Settings without any network request;
- `parseLearningDataImport()` strictly validates JSON, product identity, export version, export timestamp, and the embedded guest snapshot through the current strict guest-state parser;
- malformed, foreign, future-export-version, damaged, or future-schema backups are rejected without creating a fallback state;
- selecting a valid backup shows a non-destructive preview with XP, completed lessons, mastered words, completed missions, completed challenges, filename, and export date;
- applying a backup requires a separate explicit replace confirmation;
- import is enabled only after hydration while durable persistence status is `saved`, and the validated snapshot must save successfully to browser storage before in-memory state is replaced;
- import performs a deliberate replace rather than an automatic merge, avoiding XP inflation and ambiguous review-state reconciliation;
- export, import, and reset remain local-only with no `fetch`, XHR, beacon, or server dependency.

Fresh Phase 47 verification: **281/281 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 48 — bounded backup import size

Implemented:
- local learning-data import now has a single 2 MiB safety budget;
- Settings checks `File.size` before calling `file.text()`, preventing obviously oversized backups from being read into memory;
- `parseLearningDataImport()` repeats the same guard on the raw string and verifies UTF-8 byte size before JSON parsing, so direct parser callers receive the same protection;
- oversized backups return an explicit `too-large` failure reason with EN/ҚАЗ copy instead of attempting partial import;
- strict product/version/date/guest-state validation and durable-before-memory replace behavior from Phase 47 remain unchanged.

Fresh Phase 48 verification: **283/283 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing.

## Phase 49 — semantic backup integrity

Implemented:
- local backup restore now validates authored-reference consistency after strict guest-state shape validation;
- lesson progress must resolve to a current lesson slug/id pair and any stable `currentStepId` must exist in that lesson;
- review-record keys must match their own `itemId` and resolve to authored review items;
- mastery/evidence ids, connected concepts, completed Think scenarios, missions, mission reflections, and World Challenges must resolve to current authored content;
- structurally valid but logically inconsistent backups are rejected as `inconsistent-learning-state` with bilingual UI copy;
- valid current backups still round-trip through preview/replace without merge or XP inflation.

Fresh Phase 49 verification: **286/286 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing.

## Phase 50 — cross-tab `localStorage.clear()` conflict protection

Implemented:
- guest persistence now exposes `storageEventAffectsGuestProgress()` as the single policy for interpreting browser storage events;
- the exact EcoPulse guest-progress key continues to trigger the protected multi-tab conflict state;
- `StorageEvent.key === null`, which represents browser-wide `localStorage.clear()`, now also triggers conflict protection;
- unrelated storage keys are ignored and do not interrupt the learner;
- `GuestProgressProvider` consumes the shared policy instead of maintaining a fragile direct key comparison;
- conflict, quarantine, autosave, exit flush, XP, mastery, review scheduling, and guest schema v7 are unchanged.

## Phase 51 — runtime semantic snapshot quarantine

Implemented:
- authored-reference validation moved to `state-integrity.ts` as a single domain source used by both local backup import and normal local-storage loading;
- a shape-valid guest snapshot is accepted only when lesson slug/id pairs, stable step ids, attempt ids, review/mastery ids, concepts, Think scenarios, missions/reflections, and World Challenges all resolve against current authored content;
- semantic content mismatch is classified as `incompatible` rather than `corrupt`, separating stale curriculum structure from damaged JSON/schema data;
- incompatible raw payloads are preserved for recovery and never enter active learner state;
- `GuestProgressProvider` treats `incompatible` as a protected quarantine state and suppresses autosave and multi-tab overwrite behavior;
- exit flush and ordinary Settings reset/export controls cannot overwrite/bypass an incompatible snapshot;
- bilingual recovery copy explains the older-content mismatch and retains download-before-destructive-reset behavior;
- guest schema remains v7 and learning XP/mastery/review behavior is unchanged.

## Phase 52 — persisted XP and answer-attempt integrity

Implemented:
- strict guest parsing now validates every persisted `AnswerAttempt` record instead of casting an arbitrary object;
- attempt counts must be integer values >= 1 and `correct` / `xpAwarded` must be booleans;
- impossible `xpAwarded: true` + `correct: false` records are rejected;
- guest-level and lesson-level XP must be non-negative integers;
- malformed numeric/attempt snapshots use the existing `corrupt` quarantine/recovery path rather than being normalized silently;
- valid schema v7 and legacy v1-v6 snapshots continue to migrate/load normally;
- XP award amounts, mastery rules, review scheduling, and guest schema v7 are unchanged.

## Phase 53 — persisted mastery consistency

Implemented:
- current schema v7 no longer accepts a persisted mastery label without a corresponding mastery-evidence record;
- current mastery/evidence key sets must match exactly and each label must equal `computeMasteryState()` for its persisted evidence;
- mastery signals with zero exposures are rejected as corrupt current state;
- `delayedReview` evidence is rejected unless recognition, recall, and context prerequisites are all present;
- valid current snapshots round-trip unchanged when label and evidence agree;
- valid legacy v1-v6 snapshots can still reconstruct missing evidence from their historical mastery label during migration;
- backup-import and ordinary local-storage paths inherit the same strict parser behavior;
- guest schema remains v7 and XP, review scheduling, lesson behavior, and mastery thresholds are unchanged.

Fresh Phase 53 verification: **299/299 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 54 — runtime state write integrity

Implemented:
- added `applyValidatedGuestStateUpdate()` as the single pure runtime transform boundary for guest learning state;
- updater callbacks receive a canonical clone rather than the live state object, preventing rejected in-place mutations from corrupting the previous snapshot;
- candidate state must pass strict current-schema/mastery parsing and authored-reference integrity before it can enter active state;
- unknown lesson/step/mission/challenge/concept references and contradictory mastery label/evidence candidates are rejected immediately;
- `GuestProgressProvider.updateState()` now uses the validation boundary and updates `stateRef` only when the candidate is accepted;
- rejected runtime candidates therefore cannot reach React state, autosave, or exit-flush persistence;
- existing load/import quarantine remains a second durable integrity defense;
- guest schema remains v7 and XP, mastery, review, mission, challenge, and lesson semantics are unchanged.

Fresh Phase 54 verification: **304/304 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 55 — lesson progress anchor integrity

Implemented:
- lesson progress numeric indexes must remain within the current authored lesson step range;
- a lesson marked `completed` must have a stable `currentStepId` equal to that lesson's final authored `result` step;
- false completion anchored to a choice/reading/listening/connection/Think step is rejected as incompatible semantic state;
- the same rule is inherited automatically by normal storage loading, backup restore, and the Phase 54 runtime write guard;
- valid completed lessons continue to load normally;
- stable step ids remain authoritative for legacy resume, so old migrated numeric positions do not need to equal modern inserted-step positions;
- guest schema stays v7 and lesson XP, mastery, review scheduling, and UI completion behavior are unchanged.

Fresh Phase 55 verification: **308/308 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 56 — canonical lesson resume anchors

Implemented:
- current schema v7 lesson progress now requires a stable `currentStepId` for every persisted lesson record;
- `currentStepIndex` must resolve to the same authored step as `currentStepId`, eliminating contradictory dual resume anchors;
- legacy v1-v6 migration preserves/recovers the historical stable step id and resolves it against the current authored lesson sequence;
- old numeric positions are therefore canonicalized after later Reading/Listening insertions instead of being carried forward stale;
- removed/unknown historical step ids remain incompatible and continue through the existing protected recovery path rather than being guessed;
- completed-result validation from Phase 55 remains in force;
- guest schema remains v7 and lesson XP, mastery, review scheduling, and UI progression are unchanged.

Fresh Phase 56 verification: **311/311 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 57 — answer-attempt semantic integrity

Implemented:
- persisted answer attempts now require `correct` and `xpAwarded` to agree with the one-time reward semantics used by `recordAnswer()`;
- impossible `correct=true` + `xpAwarded=false` state is rejected rather than entering active progress;
- authored semantic validation now rejects attempt records attached to passive `discover` or `result` lesson steps;
- real scored interactive steps, including the connection step with its fixed interaction reward, remain valid;
- storage loading, backup import, and the runtime write boundary inherit the same attempt-step eligibility rule;
- exact historical lesson XP is intentionally not reconstructed against current lesson content, preserving legacy compatibility rather than introducing false precision;
- guest schema remains v7 and XP reward values, mastery, review scheduling, and lesson flow are unchanged.

Fresh Phase 57 verification: **314/314 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 58 — World Challenge prerequisite integrity

Implemented:
- `completeWorldChallengeInGuestState()` now resolves the authored challenge and refuses unknown or locked checkpoint completion;
- a World Challenge awards its existing +50 XP only after every authored lesson in that challenge's world is completed;
- repeated challenge completion remains idempotent;
- shared state-integrity validation now rejects persisted/imported/runtime `completedChallengeIds` whose world prerequisites are not satisfied;
- valid completed checkpoints with completed world lessons remain accepted;
- existing UI unlock logic is retained as presentation but is no longer the only protection;
- guest schema remains v7 and lesson XP, mastery, missions, review scheduling, and challenge copy are unchanged.

Fresh Phase 58 verification: **318/318 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 59 — review/mastery prerequisite integrity

Implemented:
- review/mastery state now has an authored learning-origin prerequisite rather than being valid solely because its item id exists;
- every review record, mastery label, and mastery-evidence record must belong to at least one completed lesson whose `targetWords` includes that review item;
- completing an unrelated lesson cannot authorize mastery/review for another word;
- the rule lives in the shared semantic validator, so normal storage loading, backup restore, and runtime state updates enforce the same lifecycle;
- production content is guarded so every review item has at least one authored target-word lesson origin;
- the rule is intentionally one-way: valid older completed lessons are not forced to regenerate missing review/mastery records;
- mastery thresholds, review intervals, XP values, and guest schema v7 are unchanged.

## Phase 60 — review/mastery pair integrity

Implemented:
- `reviewRecords`, `masteryStates`, and `masteryEvidence` must now describe exactly the same set of review items in active semantic state;
- review-only and mastery-only partial ledgers are rejected instead of entering Review/My Pulse with contradictory data;
- an empty review/mastery set remains valid, so completed older lessons are not forced to regenerate historical records;
- the Phase 59 completed-origin prerequisite still applies to every non-empty review/mastery item;
- runtime updates cannot delete only one side of the review/mastery pair;
- backup restore and normal local storage inherit the same shared rule;
- mastery thresholds, review intervals, XP values, and guest schema v7 are unchanged.

Fresh Phase 60 verification: **328/328 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 61 — review progression integrity

Implemented:
- review stage/evidence progression is validated by the same shared semantic state-integrity boundary used by local storage, backup restore and runtime updates;
- stage 1 requires prior recall evidence;
- stage 2 requires prior recall + context evidence;
- stage 3 requires prior recall + context + recognition evidence;
- `delayedReview=true` is rejected before the first stage-4 delayed-review gate;
- stage 4+ does not require `delayedReview=true`, because a legitimate later maintenance mistake can clear that mastery gate while preserving stage history;
- review intervals, stage transitions, XP, mastery thresholds and guest schema v7 are unchanged.

Fresh Phase 61 verification: **333/333 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 62 — mission reflection lifecycle integrity

Implemented:
- orphan `missionReflections` are rejected unless their authored mission is already completed;
- completed missions remain valid without a reflection because reflection is optional;
- runtime updates cannot remove mission completion while leaving its reflection behind;
- storage loading and backup restore inherit the same shared semantic invariant;
- mission XP, completion idempotency, reflection length rules and guest schema v7 are unchanged.

Fresh Phase 62 verification: **337/337 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 63 — derived lesson-state lifecycle integrity

Implemented:
- authored origin lessons are precomputed for every connection endpoint and Think scenario;
- persisted/runtime `connectedConceptIds` require at least one completed lesson that authors that connection endpoint;
- persisted/runtime `completedScenarioIds` require the completed lesson containing that Think step;
- runtime updates cannot remove the origin lesson while leaving its derived concept/scenario state behind;
- completed lessons are not required to backfill missing historical derived records;
- lesson XP, mastery, review behavior and guest schema v7 are unchanged.

Fresh Phase 63 verification: **342/342 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 64 — answer-attempt ordering integrity

Implemented:
- every persisted/runtime answer attempt is resolved to its authored lesson step index;
- attempts on future steps are rejected as incompatible semantic state;
- attempts on the current interactive step remain valid before Continue;
- past attempts remain valid after lesson advancement;
- runtime progress rewinds cannot leave later attempts behind;
- scoring, retry counts, XP, resume anchors and guest schema v7 are unchanged.

Fresh Phase 64 verification: **346/346 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 65 — progress-sync semantic integrity

Implemented:
- account/local progress merge now reconciles review stage with merged mastery evidence before deriving mastery labels;
- conservative review merge behavior remains `minimum stage` + earliest due date;
- if the merged review stage is below 4, an OR-merged `delayedReview=true` gate is cleared because that combination cannot be produced by the staged review lifecycle;
- recognition, recall and context evidence are preserved;
- mastery labels are computed only after this reconciliation;
- XP remains `max` rather than sum, and guest schema v7 is unchanged.

Fresh Phase 65 verification: **348/348 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 66 — strict current-snapshot canonicality

Implemented:
- current schema v7 learning settings require canonical EN/ҚАЗ, motion and media values instead of silently falling back to defaults;
- current mission reflections must already be trimmed, non-empty and at most 280 characters instead of being silently truncated/removed on load;
- current set-like arrays reject duplicate ids instead of silently deduplicating;
- legacy v1-v6 snapshots retain tolerant normalization/deduplication during migration;
- `normalizeLearningSettings()` remains the UI/update helper and mission save helpers still trim/cap before persistence;
- guest schema remains v7.

Fresh Phase 66 verification: **352/352 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 67 — onboarding current-state canonicality

Implemented:
- current schema v7 onboarding interests must already be unique approved authored ids;
- current duplicate interests are rejected rather than silently deduplicated;
- current unknown interest ids remain rejected;
- valid unique interests preserve their persisted authored order;
- legacy v1-v6 onboarding interests remain tolerant and normalize duplicate/unknown historical values;
- `completed`, learning-level fallback behavior, XP, mastery, review and guest schema v7 are unchanged.

Fresh Phase 67 verification: **356/356 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated because `node_modules` is unavailable and npm-registry/DNS access is blocked in this sandbox.

## Phase 68 — release/build contract

Implemented:
- `package.json` now declares `engines.node: >=20.9.0`, matching the Next.js 16 runtime floor;
- added `check:core` for dependency-independent test + core TypeScript verification;
- `check` now represents the real dependency-backed test + full TypeScript gate;
- added `verify:release` as the production gate: full check followed by `next build`;
- exact Next/React runtime pins, matching React/ReactDOM versions, Tailwind 4 PostCSS wiring, and the global Tailwind import are machine-checked;
- no runtime dependency version, learner behavior, state schema, XP, mastery, or curriculum behavior changed.

Fresh Phase 68 source verification: **360/360 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. `npm run verify:release` was also attempted and correctly remains blocked at framework-aware TypeScript because `node_modules`/React/Next type packages are unavailable in this sandbox; npm registry DNS still returns `EAI_AGAIN`, so a successful dependency-backed `next build` is not claimed.


## Phase 69 — Sunlit frontend foundation / new Home IA (2026-09-10)

Implemented the first approved frontend-max upgrade wave without changing the core learning/mastery/persistence semantics.

- Replaced the Home visual foundation with a light `Sunlit Planet Lab` palette and semantic tokens (`canvas`, `surface`, `mint`, `sky`, `warm`).
- Rebuilt the Hero around `LEARN ENGLISH. / UNDERSTAND EARTH. / MAKE A DIFFERENCE.` with dual CTAs, proof rail, light Earth treatment and staged motion.
- Added the new `Welcome to EcoPulse` section and the approved three-part value path.
- Added eight bilingual environmental topic cards with topic-specific generative visual motifs and responsive interaction states.
- Updated primary IA to Home / Learn / Challenges / Eco Game / Eco Action / My Progress.
- Added `/game` as a dedicated interactive practice surface backed by the existing review engine.
- Added `/action` as a dedicated real-world action surface backed by the existing safe mission engine.
- Separated `/challenges` from missions with a new World Challenge overview that respects existing unlock/completion logic.
- Restyled the existing Home connection/demo/loop/action/final sections into the light visual system.
- Added reduced-motion fallbacks for the new hero, ambient and micro-motion effects.
- Added responsive behavior for desktop/tablet/mobile including mobile navigation fallback and one-column topic cards.
- Added `tests/home-sunlit-redesign.test.ts` and updated intentional navigation contracts.

Verification at packaging time: `npm test` 366/366 passing; `npm run typecheck:core` passing. Full Next build could not be executed in the sandbox because dependency installation timed out and no `node_modules` directory is available.

## Phase 70 — Climate flagship learning experience / product-depth pass (2026-09-10)

Implemented on top of the Phase 69 sunlit foundation without changing canonical lesson/mastery/review persistence semantics.

- Added dedicated `/learn/climate-change` flagship route entered from the first Home topic.
- Added an evidence-backed Climate Change content model with five reading chapters, five Reading Check questions and the ten supplied EN→ҚАЗ vocabulary terms.
- Added official dated NASA/NOAA data cards and source disclosure for CO₂, temperature, ice-sheet loss, sea level and ocean acidification.
- Reading Check is a focused one-question-at-a-time flow with 1–3 keyboard shortcuts, semantic progress, calm correct/incorrect feedback and restart/continue states.
- Vocabulary includes a ten-card bilingual deck, device/recorded pronunciation through the existing pronunciation engine, and a ten-item recognition sprint.
- Showcase practice deliberately does not award canonical XP/mastery; completion routes into the existing `/lesson/atmosphere` engine where recognition/recall/context/review evidence is tracked.
- Added a native CSS scroll-linked reading-position signal with reduced-motion fallback and no runtime animation dependency.
- Added a sunlit Learn orientation layer with flagship entry and real journey statistics.
- Reframed `/game` as an honest EcoPulse Arcade hub while keeping the existing spaced-review engine as the live playable mode.
- Upgraded My Progress into a `pulse-dashboard` hierarchy with a visual Pulse dial and direct Learn/Game/Action continuation routes.
- Added responsive Climate/Learn/Game/Pulse layouts and global reduced-motion overrides for the new motion system.
- Fixed the orbit animation so rotation no longer overwrites element translation geometry.

Verification at packaging time: `npm test` **372/372 passing**; `npm run typecheck:core` passing; changed-TSX syntax sanity reports **0 parse errors**; CSS brace integrity is **1838/1838**. `npm run build` was attempted and stops immediately with `next: not found` because this sandbox has no `node_modules`; a successful dependency-backed Next build is therefore not claimed.

