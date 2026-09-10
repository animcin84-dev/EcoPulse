# Review and Mastery Prerequisite Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent review or mastery state from existing before the learner has completed an authored lesson that targets that word.

**Architecture:** The shared semantic learning-state validator derives review-item origins from current lesson `targetWords`. Review records, mastery labels, and mastery evidence are accepted only when at least one authored origin lesson is completed, so storage loading, backup import, and runtime writes inherit one authoritative prerequisite rule.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not change mastery thresholds or review scheduling.
- Do not require every completed legacy lesson to contain regenerated review state.
- Completing an unrelated lesson must not authorize a word.
- Every authored review item must have at least one target-word lesson origin.

---

### Task 1: Prove authored review origins

**Files:**
- Test: `tests/review-mastery-prerequisite-integrity.test.ts`

- [x] Verify every review item resolves to at least one current lesson `targetWords` entry.
- [x] Prove review/mastery before the origin lesson is rejected.
- [x] Prove an unrelated completed lesson does not satisfy the prerequisite.

### Task 2: Enforce shared prerequisite integrity

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Test: `tests/review-mastery-prerequisite-integrity.test.ts`
- Test: `tests/persisted-mastery-consistency.test.ts`

- [x] Derive review-item origin lessons from authored curriculum.
- [x] Require a completed origin lesson for review records, mastery labels, and mastery evidence.
- [x] Inherit the same rule in local storage, backup import, and runtime writes.
- [x] Keep valid current and legacy mastery fixtures aligned with the real completion lifecycle.
- [x] Run full regression and source sanity gates.
