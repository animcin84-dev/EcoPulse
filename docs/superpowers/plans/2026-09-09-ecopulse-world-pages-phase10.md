# EcoPulse World Pages Phase 10 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add dedicated bilingual World pages between the Learn journey and lessons, with deterministic progress/next-action logic, authored connection previews, and checkpoint status.

**Architecture:** Extend the existing world presentation metadata with bilingual thesis copy, resolve all world detail in a pure domain helper, and render a single reusable client WorldExperience at `/learn/[world]`. The Learn page links into each world instead of treating world names as inert labels. User progress remains guest-state-driven; no new persistence schema is required.

**Tech Stack:** Next.js App Router source tree, React client components, TypeScript strict, authored content, CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Preserve Living Editorial Science visual direction.
- Dark for wonder, light for learning.
- EN / ҚАЗ must remain first-class.
- No drag-only interaction.
- Challenge remains locked until all lessons in its world are completed.
- Do not duplicate lesson science copy or invent numerical science claims.
- No new dependencies.

---

### Task 1: World detail domain contract

**Files:**
- Create: `src/domain/learning/world-detail.ts`
- Create: `tests/world-detail.test.ts`
- Modify: `src/content/lesson-presentation.ts`

**Interfaces:**
- Produces: `resolveWorldDetail(worldId)` and `resolveWorldNextAction(worldId, lessonProgress, completedChallengeIds)`.

- [x] Write failing tests covering all four worlds, lesson/challenge membership, bilingual metadata, unique target words, relation preview integrity, unknown worlds, and next-action states.
- [x] Run the focused test and verify RED due to missing world-detail module/metadata.
- [x] Add bilingual world thesis/description metadata and the minimal resolver implementation.
- [x] Run the focused test and verify GREEN.

### Task 2: World page UI

**Files:**
- Create: `src/components/learning/WorldExperience.tsx`
- Create: `src/app/learn/[world]/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `resolveWorldDetail`, `resolveWorldNextAction`, guest progress, persisted preferred locale.

- [x] Add one reusable world page with dark opening, world metrics, progress, authored connection preview, lessons, challenge state, and next-action CTA.
- [x] Add a mobile-first semantic layout; connection preview remains text/SVG-independent and understandable without color.
- [x] Add route static params and `notFound()` behavior for unknown worlds.
- [x] Run dependency-independent TSX sanity and fix only source issues.

### Task 3: Learn journey integration

**Files:**
- Modify: `src/components/learning/LearnJourney.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: world overview links and lesson world labels linking to `/learn/[world]`.

- [x] Add four world overview rows/cards with completion counts and checkpoint status.
- [x] Make lesson world labels navigable without removing direct lesson links.
- [x] Ensure 390px layout remains one primary action at a time.

### Task 4: Verification and checkpoint

**Files:**
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Run `npm test` and record exact pass count.
- [x] Run `npm run typecheck:core`.
- [x] Run dependency-independent TSX sanity.
- [x] Run `git diff --check`.
- [x] Update handoff docs with verified state and npm-registry limitation.
- [x] Commit Phase 10 and create a ZIP from the committed tree.
