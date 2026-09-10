# Review and Mastery Pair Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent partial review/mastery ledgers that cannot be produced by the real lesson/review lifecycle.

**Architecture:** The shared semantic validator requires `reviewRecords`, `masteryStates`, and `masteryEvidence` to describe the same set of review items. Empty sets remain valid for backward compatibility, while any non-empty word must have the complete review/mastery pair and the Phase 59 completed-origin prerequisite.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not require completed lessons to backfill missing historical review/mastery state.
- Do not change mastery thresholds, review scheduling, or XP.
- Preserve schema v7.
- Apply one rule to storage, backup import, and runtime updates.

---

### Task 1: Prove partial-ledger failures

**Files:**
- Test: `tests/review-mastery-pair-integrity.test.ts`

- [x] Reject review without mastery.
- [x] Reject mastery without review.
- [x] Accept the complete pair after its origin lesson.
- [x] Reject runtime removal of one side of the pair.

### Task 2: Enforce shared key-set integrity

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Modify: `tests/learning-data-import.test.ts`
- Modify: `tests/persisted-mastery-consistency.test.ts`

- [x] Require review/mastery/evidence key-set equality.
- [x] Keep valid export and persisted mastery fixtures lifecycle-complete.
- [x] Run full regression and source sanity gates.
