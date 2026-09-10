# Review Progression Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reject review/mastery states whose persisted review stage could not have been produced by the real staged review lifecycle.

**Architecture:** Extend the shared semantic state validator with stage/evidence invariants derived from the existing review engine. Stage advancement proves earlier review skills, while delayed-review mastery cannot exist before the first delayed-review gate at stage 4. The rule automatically protects storage, backup import, runtime updates, and future sync validation.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not change review intervals or stage transitions.
- Do not change XP awards or mastery thresholds.
- Do not require `delayedReview=true` at maintenance stages because a later maintenance mistake legitimately clears that gate while preserving stage history.
- Preserve schema v7 and legacy migration behavior for valid states.

---

### Task 1: Prove impossible stage/evidence combinations

**Files:**
- Create: `tests/review-progression-integrity.test.ts`

- [x] Reject stage 1 without recall evidence.
- [x] Reject stage 2 without context evidence.
- [x] Reject stage 3 without recognition evidence.
- [x] Reject delayed-review evidence before stage 4.
- [x] Accept stage 4 with the base three skills but a cleared delayed-review gate.

### Task 2: Enforce shared progression integrity

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Modify: `IMPLEMENTATION_STATUS.md`
- Modify: `README.md`

- [x] Add one pure review-stage/evidence consistency helper.
- [x] Apply it to every paired review/mastery item in the shared semantic validator.
- [x] Run the full regression and source sanity gates.
