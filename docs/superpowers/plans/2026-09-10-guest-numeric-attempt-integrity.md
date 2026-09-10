# Guest Numeric and Attempt Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reject impossible persisted XP and answer-attempt records before they can enter active learner state.

**Architecture:** Keep validation inside the strict guest-state parser. Parse answer attempts field-by-field instead of trusting a TypeScript cast, and require integer non-negative XP at both global and lesson scope.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve guest schema v7 and all valid legacy migrations.
- Do not normalize malformed attempts into plausible data.
- Do not change XP award amounts or learning behavior.

---

### Task 1: Strict persisted attempt and XP validation

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/guest-numeric-attempt-integrity.test.ts`

- [x] Add RED tests for fractional global/lesson XP and malformed attempt records.
- [x] Add `parseAnswerAttempts()` with integer count and boolean state validation.
- [x] Reject impossible `xpAwarded: true` with `correct: false`.
- [x] Require persisted global/lesson XP to be non-negative integers.
- [x] Verify valid current and legacy snapshots remain accepted.
- [x] Run full regression and source sanity gates.
