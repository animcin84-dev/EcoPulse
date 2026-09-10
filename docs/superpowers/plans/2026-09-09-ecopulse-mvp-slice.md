# EcoPulse MVP Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, testable EcoPulse vertical slice proving the core learning loop from cinematic home entry through the first Atmosphere lesson result.

**Architecture:** Keep curriculum/content and learning rules framework-independent under `src/domain` and `src/content`. Render the first experience with Next.js App Router and small focused React components. Persist the first slice in client state only; database/auth remain intentionally deferred until the domain loop is proven.

**Tech Stack:** Next.js 16.3.4, React 19.2.7, TypeScript 5.8+, Tailwind CSS 4.3/PostCSS, Node built-in test runner for dependency-free domain verification.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Design direction is Living Editorial Science; do not redesign.
- Palette core: `#070A08`, `#F5F7F3`, `#141814`, `#54F078`.
- Lesson loop: Learn → Understand → Connect → Think → Act → Review → Master.
- MVP vertical slice: Home → Atmosphere lesson → Meaning question → Connection → Think → Result.
- Content supports English and Kazakh.
- Domain logic has no React dependency.
- WCAG 2.2 AA is the accessibility target; keyboard and reduced-motion behavior are required.
- No WebGL, auth, Supabase, AI, leaderboard, social layer, or CMS in this slice.

---

### Task 1: Typed Content Contract and Validation

**Files:**
- Create: `src/domain/content/types.ts`
- Create: `src/domain/content/validate.ts`
- Create: `tests/content-validation.test.ts`

**Interfaces:**
- Produces: `Lesson`, `LessonStep`, `LocalizedText`, `validateLesson(lesson): string[]`.

- [ ] Write tests proving a valid bilingual Atmosphere lesson passes and malformed lessons report missing ids/translations/invalid relation types.
- [ ] Run tests and confirm RED because contract/validator do not exist.
- [ ] Implement minimal types and deterministic validator.
- [ ] Run tests and confirm GREEN.

### Task 2: Learning Progress and Mastery

**Files:**
- Create: `src/domain/learning/progress.ts`
- Create: `src/domain/learning/mastery.ts`
- Create: `tests/learning-progress.test.ts`
- Create: `tests/mastery.test.ts`

**Interfaces:**
- Produces: `createLessonProgress`, `advanceLesson`, `recordAnswer`, `computeMasteryState`.

- [ ] Write failing tests for step advancement, correct/incorrect attempts, XP separation, and mastery thresholds.
- [ ] Run RED.
- [ ] Implement minimal pure functions.
- [ ] Run GREEN.

### Task 3: Versioned Atmosphere Content

**Files:**
- Create: `src/content/lessons/atmosphere.ts`
- Create: `src/content/index.ts`
- Create: `tests/atmosphere-content.test.ts`

**Interfaces:**
- Produces: `atmosphereLesson`, `lessonsBySlug`.

- [ ] Write test validating production Atmosphere content and required step order.
- [ ] Run RED.
- [ ] Add the real bilingual lesson data.
- [ ] Run GREEN.

### Task 4: Design Foundation and Responsive Home

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `src/components/brand/PulseHeart.tsx`
- Create: `src/components/home/EarthLimb.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/ConnectionPreview.tsx`

**Interfaces:**
- Produces reusable brand mark and home sections; CTA routes to `/lesson/atmosphere`.

- [ ] Implement semantic structure using locked design tokens.
- [ ] Add responsive 1440/768/390 layouts and reduced-motion CSS.
- [ ] Keep visuals CSS/SVG-only and non-blocking.

### Task 5: Lesson Player Vertical Slice

**Files:**
- Create: `src/app/lesson/atmosphere/page.tsx`
- Create: `src/components/lesson/LessonExperience.tsx`
- Create: `src/components/lesson/ChoiceQuestion.tsx`
- Create: `src/components/lesson/ConnectionChain.tsx`
- Create: `src/components/lesson/LessonHeader.tsx`
- Create: `src/components/lesson/ResultPanel.tsx`

**Interfaces:**
- Consumes: `atmosphereLesson`, `progress` domain functions.
- Produces: client-driven first lesson experience with keyboard-friendly choices.

- [ ] Render Discover, meaning, choice, connection, Think, result stages.
- [ ] Add answer retry/hint behavior and semantic feedback.
- [ ] Ensure English/Kazakh support and reduced-motion connection state.

### Task 6: Verification and Handoff

**Files:**
- Modify: `README.md`

- [ ] Run `npm test` and `tsc -p tsconfig.core.json`.
- [ ] Attempt dependency install/build; if registry is unavailable, document exact limitation without claiming a build.
- [ ] Inspect source tree and responsive CSS for 1440/768/390 intent.
- [ ] Package repository as `/mnt/data/EcoPulse-MVP-slice.zip`.
