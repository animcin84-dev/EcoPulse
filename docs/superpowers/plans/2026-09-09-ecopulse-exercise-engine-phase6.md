# EcoPulse Exercise Engine Phase 6 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task.

**Goal:** Expand the MVP from recognition-heavy practice into recall, misconception checking and concept matching with keyboard/touch accessible interactions.

**Architecture:** Extend the typed lesson-step union with `fact_myth`, `fill_blank` and `matching`. Keep scoring in existing lesson progress, put answer normalization/evaluation in pure domain helpers, and render each type with a dedicated focused component rather than a universal card.

**Tech Stack:** existing React/TypeScript/CSS plus dependency-free Node domain tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- No drag-only matching.
- Typed recall is case-insensitive and trims/collapses whitespace.
- Every new exercise is bilingual in prompt/explanation/UI support.
- Wrong attempts award no XP; correct XP remains idempotent through existing progress logic.
- Two-attempt feedback pattern remains calm: hint/retry, then reveal/explanation.
- Exercise content must not introduce scientific misconceptions.

### Task 1: Types, evaluation and validation
- [x] Write failing tests for fill-blank normalization, matching evaluation and content validation.
- [x] Add three typed lesson-step contracts and validators.
- [x] Add pure evaluation helpers.

### Task 2: Authored lesson content
- [x] Add Weather/Climate Fact-or-Myth misconception check.
- [x] Add Glacier typed MELT recall.
- [x] Add Habitat/Ecosystem matching exercise.

### Task 3: Accessible UI
- [x] Add dedicated FactMyth, FillBlank and Matching components.
- [x] Integrate step renderers in `LessonExperience`.
- [x] Add responsive/focus/feedback CSS without drag dependence.

### Task 4: Verification
- [x] Run full tests, core typecheck, TSX sanity and diff check.
- [x] Commit and package checkpoint.
