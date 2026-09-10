# World Challenge Prerequisite Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make World Challenge completion authoritative at the domain/state-integrity layer rather than trusting UI unlock checks alone.

**Architecture:** `completeWorldChallengeInGuestState()` resolves the authored challenge and verifies that every lesson in its world is completed before awarding XP or storing completion. The shared semantic validator applies the same prerequisite to persisted/imported/runtime state, so a completed checkpoint cannot exist without its world journey.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve +50 XP and idempotent challenge completion.
- Preserve existing UI unlock presentation.
- Do not change lesson completion, mastery, missions, or review scheduling.
- Unknown or locked challenge completion must be a no-op.

---

### Task 1: Domain prerequisite enforcement

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/challenge-prerequisite-integrity.test.ts`
- Test: `tests/world-challenges.test.ts`

- [x] Reject unknown challenge slugs.
- [x] Return the original state when the challenge world is still locked.
- [x] Award +50 XP after all authored world lessons are completed.
- [x] Preserve idempotency after completion.

### Task 2: Persisted/runtime prerequisite integrity

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Test: `tests/challenge-prerequisite-integrity.test.ts`

- [x] Reject persisted challenge completion without completed world lessons.
- [x] Preserve challenge completion when prerequisites are satisfied.
- [x] Inherit the same rule in backup import and runtime state writes.
- [x] Run full regression and source sanity gates.
