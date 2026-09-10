# EcoPulse Climate Learning Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Ship the Climate Change flagship learning module plus a second-pass visual upgrade of Learn, Eco Game and My Progress on the Phase 69 sunlit foundation.

**Architecture:** Add a focused static climate content model and a client-side showcase experience that remains practice-only, while preserving the existing canonical lesson/mastery/review state model. Enhance existing Learn/Game/Pulse presentation without changing their domain calculations.

**Tech Stack:** Next.js 16.3.4, React 19.2.7, TypeScript, global CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-10-ecopulse-climate-learning-experience-design.md`

## Global Constraints

- Preserve existing lesson/mastery/review/persistence semantics.
- Climate showcase practice must not silently award canonical mastery or XP.
- First Home topic links to `/learn/climate-change`.
- Reading Check has exactly five questions.
- Climate vocabulary deck has exactly ten supplied terms.
- Official data cards include context/date labels.
- No new runtime dependency.
- Respect reduced motion.

---

### Task 1: Climate content contracts

**Files:**
- Create: `src/content/climate-change-module.ts`
- Modify: `src/content/home-topics.ts`
- Modify: `src/content/science-sources.ts`
- Test: `tests/climate-showcase.test.ts`

- [x] Write failing tests for route href, five questions, ten vocabulary terms and source/data contracts.
- [x] Run focused test and verify RED.
- [x] Implement the climate content model and source metadata.
- [x] Run focused test and verify GREEN.

### Task 2: Climate showcase route and interactions

**Files:**
- Create: `src/app/learn/climate-change/page.tsx`
- Create: `src/components/learning/ClimateChangeModule.tsx`
- Test: `tests/climate-showcase.test.ts`

- [x] Add failing source-contract assertions for the route, reading check, vocabulary practice, ARIA progress and canonical lesson CTA.
- [x] Run focused test and verify RED.
- [x] Implement the module experience.
- [x] Run focused test and verify GREEN.

### Task 3: Learn / Game / Pulse presentation pass

**Files:**
- Modify: `src/components/learning/LearnJourney.tsx`
- Modify: `src/app/game/page.tsx`
- Modify: `src/components/progress/PulseSummary.tsx`
- Test: `tests/climate-showcase.test.ts`

- [x] Add failing presentation-contract assertions.
- [x] Run focused test and verify RED.
- [x] Add flagship module entry, honest arcade framing and pulse dashboard hierarchy.
- [x] Run focused test and verify GREEN.

### Task 4: Phase 70 visual and motion layer

**Files:**
- Modify: `src/app/globals.css`
- Test: `tests/climate-showcase.test.ts`

- [x] Add failing CSS token/class/motion/reduced-motion assertions.
- [x] Run focused test and verify RED.
- [x] Implement responsive Climate/Learn/Game/Pulse styling and motion.
- [x] Run focused test and verify GREEN.

### Task 5: Regression and package

**Files:**
- Modify only if regressions are found.

- [x] Run `npm test`.
- [x] Run `npm run typecheck:core`.
- [x] Full framework typecheck/build checked for availability; skipped because `node_modules`/Next/React typings are unavailable in this sandbox.
- [x] Package Phase 70 ZIP without caches/dependencies.
