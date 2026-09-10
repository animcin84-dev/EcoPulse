# Adaptive Micro-Reading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add one adaptive English micro-reading/comprehension step to every MVP lesson without breaking existing saved lesson positions.

**Architecture:** First replace index-only resume with stable authored step IDs and migrate existing guest snapshots. Then add a typed `reading` step with A2/B1/B2 English passages, a comprehension answer, localized support/feedback, context mastery evidence, and a dedicated accessible renderer. Reading remains part of the existing lesson/progress engine and does not create a parallel course.

**Tech Stack:** TypeScript, React/Next App Router source, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Preserve all existing guest progress/mastery/review/mission data during migration.
- Scientific truth and correct answers do not vary by English level.
- A2/B1/B2 changes English passage complexity only.
- Reading comprehension is user-triggered and awards XP/evidence only for a correct answer.
- No autoplay audio and no drag-only interaction.
- EN/ҚАЗ interface chrome remains fully localized.

---

### Task 1: Stable lesson resume IDs
- [x] Add failing tests for `currentStepId` progression and v6 migration.
- [x] Add `currentStepId` to lesson progress and schema v7 migration using frozen legacy step IDs.
- [x] Resolve displayed step by stable ID with safe index fallback.
- [x] Verify progress/sync/export/reset regression.

### Task 2: Reading content contract
- [x] Add failing validation/content tests for a `reading` step.
- [x] Define A2/B1/B2 passages, English comprehension answers, localized explanation, context mastery signals and XP.
- [x] Add one reading to every production lesson and validate all content.

### Task 3: Accessible reading renderer
- [x] Add failing source/UI contract tests.
- [x] Build `ReadingExercise` with level-selected English passage, optional localized support label, keyboard/touch answers and two-attempt feedback.
- [x] Wire it into `LessonExperience` and `lessonUiCopy`.
- [x] Verify full suite, core typecheck, full TS/TSX sanity and diff integrity.
