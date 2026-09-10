# Progress Sync Semantic Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Ensure merging two valid learner snapshots cannot produce a review/mastery combination rejected by EcoPulse's own semantic validator.

**Architecture:** Keep the existing conservative review merge (`minimum stage`, earliest due date), merge mastery evidence by strongest demonstrated skills, then reconcile the delayed-review gate against the merged review stage before deriving mastery labels. A stage below 4 cannot retain delayed-review evidence; base recognition/recall/context evidence remains intact.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve conservative review scheduling: do not raise the merged stage merely to keep MASTERED.
- Do not sum XP; existing `max` behavior remains.
- Do not erase recognition/recall/context evidence when only the delayed-review gate conflicts.
- Preserve guest schema v7.

---

### Task 1: Prove valid-input merge corruption

**Files:**
- Create: `tests/progress-sync-semantic-integrity.test.ts`

- [x] Build two individually valid snapshots at review stage 0 and stage 4.
- [x] Prove the merged snapshot must remain semantically valid.
- [x] Preserve minimum review stage and earliest-due conservative behavior.
- [x] Clear only an impossible delayed-review gate below stage 4.

### Task 2: Reconcile review/mastery merge output

**Files:**
- Modify: `src/domain/learning/progress-sync.ts`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Reconcile merged evidence after review records are merged.
- [x] Derive mastery labels only after reconciliation.
- [x] Run full regression and source sanity gates.
