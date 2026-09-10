# EcoPulse Onboarding, World Challenges & Rich Exercises Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Complete the guest-first MVP journey with persistent onboarding, four authored World Challenges, and a non-drag ordering exercise while preserving the locked EcoPulse learning architecture.

**Architecture:** Extend the versioned guest snapshot with a backward-compatible v1→v2 migration for onboarding preferences and challenge completion. Keep World Challenge content repository-owned and framework-independent, render challenges through one route/component, and extend the existing Lesson step union with an ordering step using accessible move-up/move-down controls rather than drag-only interaction.

**Tech Stack:** Next.js 16.3.4, React 19.2.7, TypeScript strict, repository content, browser localStorage guest persistence, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- No visual redesign; keep Living Editorial Science.
- Preserve guest progress when migrating stored v1 snapshots.
- XP and mastery remain separate.
- World Challenge completion awards +50 XP once.
- Onboarding never asks for school, exact age, GPS, photo, real name, or address.
- Ordering interaction must work without drag.
- Science guardrails remain unchanged.

---

### Task 1: Guest Onboarding Contract

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Create: `src/domain/learning/onboarding.ts`
- Create: `tests/onboarding.test.ts`
- Modify: `tests/guest-state.test.ts`

- [x] Write failing tests for v1→v2 migration, persistent level/interests and deterministic diagnostic level selection.
- [x] Implement minimal migration/profile functions.
- [x] Run focused tests and full suite.

### Task 2: Onboarding UI

**Files:**
- Create: `src/app/start/page.tsx`
- Create: `src/components/onboarding/OnboardingExperience.tsx`
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [x] Add guest hydration-safe onboarding flow.
- [x] Support A2/B1/B2/Not sure, a short optional diagnostic, interests, and completion result.
- [x] Returning users see a Continue path instead of repeated onboarding.

### Task 3: World Challenge Content and State

**Files:**
- Create: `src/domain/content/challenge-types.ts`
- Create: `src/content/world-challenges.ts`
- Create: `tests/world-challenges.test.ts`
- Modify: `src/domain/learning/guest-state.ts`
- Modify: `src/domain/learning/profile.ts`

- [x] Write failing tests for 4 bilingual challenges, valid answers and +50 XP idempotent completion.
- [x] Implement content and state functions.
- [x] Run GREEN.

### Task 4: World Challenge UI

**Files:**
- Create: `src/app/challenge/[slug]/page.tsx`
- Create: `src/components/challenges/WorldChallengeExperience.tsx`
- Modify: `src/components/learning/LearnJourney.tsx`
- Modify: `src/components/progress/PulseSummary.tsx`
- Modify: `src/app/globals.css`

- [x] Render all authored challenges through one generic route.
- [x] Add world checkpoint links to Learn.
- [x] Persist completion and show completed state without re-awarding XP.

### Task 5: Accessible Ordering Exercise

**Files:**
- Modify: `src/domain/content/types.ts`
- Modify: `src/domain/content/validate.ts`
- Create: `src/components/lesson/OrderingExercise.tsx`
- Modify: `src/components/lesson/LessonExperience.tsx`
- Modify: `src/content/lessons/sea-level.ts`
- Create: `tests/ordering-content.test.ts`
- Modify: `src/app/globals.css`

- [x] Write failing validator/content tests for unique item IDs and valid exact correct order.
- [x] Implement ordering step type and validator.
- [x] Add a scientifically safe sea-level ordering task.
- [x] Render accessible move-up/move-down ordering controls; no drag required.

### Task 6: Verification and Handoff

- [x] Run `npm test`.
- [x] Run `npm run typecheck:core`.
- [x] Run TSX sanity check in the dependency-blocked sandbox.
- [x] Run `git diff --check`.
- [x] Attempt registry/build verification and document exact limitation.
- [x] Commit and package updated checkpoint.
