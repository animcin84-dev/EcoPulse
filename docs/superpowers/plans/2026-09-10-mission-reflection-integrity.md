# Mission Reflection Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent persisted/runtime mission reflections from existing without the corresponding completed mission.

**Architecture:** Extend the shared semantic learning-state validator with a subset invariant: every `missionReflections` key must be both an authored mission id and present in `completedMissionIds`. This matches the existing UI lifecycle, where a first reflection is committed atomically with mission completion and later edits are available only after completion.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not require every completed mission to have a reflection; reflection remains optional.
- Do not change mission completion XP or idempotency.
- Preserve guest schema v7.
- Apply the rule through the shared semantic validator so storage, backup restore and runtime updates agree.

---

### Task 1: Prove orphan-reflection failures

**Files:**
- Create: `tests/mission-reflection-integrity.test.ts`

- [x] Reject a reflection whose mission is not completed.
- [x] Accept a completed mission with no reflection.
- [x] Accept a completed mission with a reflection.
- [x] Reject runtime removal of completion while its reflection remains.

### Task 2: Enforce the shared subset invariant

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Require every reflection key to belong to `completedMissionIds`.
- [x] Run full regression and source sanity gates.
