# EcoPulse Learning Platform Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Expand the first EcoPulse vertical slice into a coherent offline-capable MVP shell with multiple lessons, deterministic review/mastery, guest persistence, My Pulse, missions, and authored Explore connections.

**Architecture:** Keep content and learning rules framework-independent under `src/content` and `src/domain`. Use a generic lesson renderer for all repository-owned lessons, a browser persistence adapter for guest state, and authored semantic knowledge relations for Explore. UI routes stay small and composable; Supabase remains deferred until the local learning loop is stable.

**Tech Stack:** Next.js 16.3.4, React 19.2.7, TypeScript 5.8+, CSS/Tailwind-ready styling, Node built-in test runner for dependency-free domain verification.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Keep Living Editorial Science; no redesign.
- Preserve Carbon `#070A08`, Cloud `#F5F7F3`, Ink `#141814`, Pulse `#54F078`.
- Keep XP/activity separate from mastery.
- Content must remain English/Kazakh and versioned.
- Scientific relations must use semantic edge types and approved guardrails.
- No WebGL, Supabase, AI, leaderboard, public profiles, or CMS in this phase.
- Every browser-only feature must degrade safely if localStorage is unavailable.
- WCAG 2.2 AA target; no drag-only interaction.

---

### Task 1: Reproducible Core Tooling

**Files:**
- Modify: `package.json`
- Modify: `IMPLEMENTATION_STATUS.md`

**Produces:** `npm run typecheck:core` as the dependency-free content/domain typecheck command.

- [x] Add `typecheck:core` script invoking `tsc -p tsconfig.core.json`.
- [x] Run baseline `npm test` and `npm run typecheck:core`.

### Task 2: Curriculum Expansion

**Files:**
- Create: `src/content/lessons/weather-climate.ts`
- Create: `src/content/lessons/glaciers.ts`
- Create: `src/content/lessons/sea-level.ts`
- Create: `src/content/lessons/drought-wildfire.ts`
- Create: `src/content/missions.ts`
- Modify: `src/content/index.ts`
- Create: `tests/curriculum-content.test.ts`

**Produces:** `lessonsBySlug`, `lessonSequence`, mission definitions and validated bilingual lesson content.

- [x] Write failing tests for lesson slugs, sequence, required scientific wording and content validation.
- [x] Run RED.
- [x] Add minimal production lesson data using existing typed steps.
- [x] Run GREEN.

### Task 3: Review Scheduler and Learning Profile

**Files:**
- Create: `src/domain/learning/review.ts`
- Create: `src/domain/learning/profile.ts`
- Create: `tests/review.test.ts`
- Create: `tests/profile.test.ts`

**Produces:** deterministic review intervals, due-item selection, Pulse Level calculation, aggregate learning stats.

- [x] Write failing tests for 1/3/7/14/30-day review progression, mistakes moving items sooner, and deterministic next-best-action selection.
- [x] Write failing tests proving XP level and mastery counts remain separate.
- [x] Implement minimal pure functions and run GREEN.

### Task 4: Guest Persistence Contract

**Files:**
- Create: `src/domain/learning/guest-state.ts`
- Create: `tests/guest-state.test.ts`
- Create: `src/lib/guest-progress.ts`

**Produces:** versioned serializable guest snapshot plus safe browser load/save adapter.

- [x] Write failing tests for snapshot round-trip, malformed-data fallback, and content-version-safe defaults.
- [x] Implement dependency-free serializer/parser and run GREEN.
- [x] Add browser adapter that catches storage/security errors.

### Task 5: Generic Lesson Player and Curriculum Navigation

**Files:**
- Create: `src/app/learn/page.tsx`
- Create: `src/app/lesson/[slug]/page.tsx`
- Modify: `src/app/lesson/atmosphere/page.tsx`
- Modify: `src/components/lesson/LessonExperience.tsx`
- Modify: `src/components/lesson/ResultPanel.tsx`
- Create: `src/components/learning/LearnJourney.tsx`

**Produces:** all curriculum lessons render through one route/component and results link to the correct next lesson.

- [x] Generalize lesson renderer without changing first-slice behavior.
- [x] Add `/learn` journey and authored next-lesson navigation.
- [x] Keep keyboard/retry/reduced-motion behavior.

### Task 6: Review and My Pulse UI

**Files:**
- Create: `src/app/review/page.tsx`
- Create: `src/app/pulse/page.tsx`
- Create: `src/components/progress/PulseSummary.tsx`
- Create: `src/components/review/ReviewSession.tsx`

**Produces:** deterministic daily review surface and honest progress dashboard.

- [x] Render due words and quick review interactions.
- [x] Render Pulse Level/XP separately from word mastery and concept counts.
- [x] Add empty states and next-best-action CTA.

### Task 7: Missions and Explore

**Files:**
- Create: `src/app/challenges/page.tsx`
- Create: `src/app/explore/page.tsx`
- Create: `src/components/missions/MissionList.tsx`
- Create: `src/components/explore/KnowledgeMap.tsx`
- Create: `src/content/knowledge-graph.ts`
- Create: `tests/knowledge-graph.test.ts`

**Produces:** safe mission list and authored semantic knowledge graph with accessible list alternative.

- [x] Write failing graph integrity tests for unique nodes, valid relation endpoints, and no unsupported relation types.
- [x] Add authored graph and run GREEN.
- [x] Render SVG desktop Explore plus semantic/mobile list alternative.
- [x] Render missions with no photo/location requirements.

### Task 8: Responsive Integration and Verification

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

**Produces:** coherent nav into Learn/Explore/Challenges/Pulse/Review and updated handoff.

- [x] Integrate responsive navigation and new route surfaces at 1440/768/390 intent.
- [x] Run `npm test`, `npm run typecheck:core`, and `git diff --check`.
- [x] Attempt `npm install`/`npm run build`; document registry limitation exactly if still blocked.
- [x] Package updated repository to `/mnt/data/EcoPulse-MVP-phase2.zip`.
