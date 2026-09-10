# Lesson Progress Anchor Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent logically impossible lesson progress from being loaded, imported, or written at runtime.

**Architecture:** Extend the shared authored-reference validator rather than creating a separate persistence-only rule. Lesson progress must stay within the current authored step range, and a `completed` lesson must be anchored to its actual final `result` step. Because storage/import and runtime writes already share the same validator, one rule protects all three paths.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve schema v7 and valid v1-v6 migrations.
- Keep stable `currentStepId` authoritative for resume.
- Do not change lesson XP, mastery, review, or completion UX.
- Do not require old migrated numeric indexes to equal modern inserted-step positions.

---

### Task 1: Lesson progress semantic invariants

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Test: `tests/lesson-progress-anchor-integrity.test.ts`

- [x] Reject a completed lesson anchored to a non-result step.
- [x] Reject numeric step indexes outside the current authored lesson range even when a stable step id exists.
- [x] Preserve valid completed progress anchored to the final authored result step.
- [x] Verify Phase 54 runtime writes reject the same impossible completion state.
- [x] Run full regression and source sanity gates.
