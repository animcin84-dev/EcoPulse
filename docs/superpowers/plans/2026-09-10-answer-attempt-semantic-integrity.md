# Answer Attempt Semantic Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reject impossible persisted answer-attempt records without pretending historical lesson XP can be perfectly reconstructed across all legacy content versions.

**Architecture:** Keep shape-level attempt coherence in the strict guest parser and authored-step eligibility in the shared semantic validator. An attempt that claims a correct answer must also carry its one-time XP-awarded flag, and attempts are allowed only on interactive/scored lesson steps rather than passive discover/result screens.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve schema v7 and valid legacy migrations.
- Do not infer exact historical lesson XP from current content versions.
- Do not change authored XP amounts or award timing.
- Keep connection steps valid scored interactions even though their reward is authored in the renderer contract.

---

### Task 1: Persisted attempt coherence

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/answer-attempt-semantic-integrity.test.ts`

- [x] Reject `correct=true` with `xpAwarded=false` as impossible persisted attempt state.
- [x] Preserve valid incorrect attempts and valid correct+awarded attempts.

### Task 2: Authored interactive-step eligibility

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Test: `tests/answer-attempt-semantic-integrity.test.ts`

- [x] Reject attempts attached to passive `discover` or `result` steps.
- [x] Preserve authored connection attempts as valid scored interactions.
- [x] Reuse the same rule for storage, import, and runtime-write validation.
- [x] Run full regression and source sanity gates.
