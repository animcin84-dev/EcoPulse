# Derived Lesson State Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent connected concepts and completed Think scenarios from existing before a completed lesson that actually produces them.

**Architecture:** Precompute authored origin lessons for every connection endpoint and Think step. The shared semantic validator then requires each persisted `connectedConceptId` and `completedScenarioId` to have at least one completed origin lesson, matching `finalizeLessonInGuestState()` behavior.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not require every completed lesson to populate all derived state; older completed lessons may legitimately have sparse historical records.
- Do not change lesson completion, XP, mastery or review behavior.
- Preserve schema v7.
- Concepts shared by multiple lessons are valid when any authored origin lesson is completed.

---

### Task 1: Prove derived-state prerequisite failures

**Files:**
- Create: `tests/derived-lesson-state-integrity.test.ts`

- [x] Reject a known connected concept without a completed origin lesson.
- [x] Accept that concept after a completed origin lesson.
- [x] Reject a known Think scenario without its completed lesson.
- [x] Accept that scenario after its completed lesson.
- [x] Reject runtime removal of the origin lesson while derived state remains.

### Task 2: Enforce authored origin prerequisites

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Precompute concept and scenario origins from authored lesson steps.
- [x] Apply the prerequisite in the shared semantic validator.
- [x] Run full regression and source sanity gates.
