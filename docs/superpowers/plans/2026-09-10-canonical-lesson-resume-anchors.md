# Canonical Lesson Resume Anchors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make persisted lesson resume anchors internally canonical so current schema v7 cannot disagree about step id vs numeric position while legacy progress survives inserted Reading/Listening steps.

**Architecture:** Current-schema progress is validated exactly: every lesson record needs a stable step id and its numeric index must point to that same authored step. Legacy v1-v6 progress is normalized during migration by resolving the frozen historical step id against the current authored lesson and replacing the old numeric index with the modern one.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve schema v7.
- Preserve all valid legacy v1-v6 resume positions.
- Stable step ids remain the semantic resume anchor.
- Do not change lesson progression, XP, mastery, or review behavior.

---

### Task 1: Legacy anchor canonicalization

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/lesson-progress-anchor-canonicalization.test.ts`

- [x] Recover or preserve the historical stable step id for legacy progress.
- [x] Resolve that stable id against the current authored lesson.
- [x] Replace stale pre-Reading/pre-Listening numeric positions with the current index.
- [x] Keep incompatible removed-step ids available for the existing semantic quarantine path.

### Task 2: Current-schema exact anchor validation

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Test: `tests/lesson-progress-anchor-canonicalization.test.ts`

- [x] Require current lesson progress to include a stable step id.
- [x] Require `currentStepIndex` to point to exactly the same authored step as `currentStepId`.
- [x] Reject mismatched current v7 pairs as incompatible semantic state.
- [x] Run full regression and source sanity gates.
