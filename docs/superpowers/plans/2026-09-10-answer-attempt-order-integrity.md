# Answer Attempt Order Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent persisted/runtime answer attempts from appearing on authored lesson steps the learner has not reached yet.

**Architecture:** During shared semantic validation, resolve each attempt step to its authored lesson index and require that index to be at or before the canonical `currentStepIndex`. The existing interactive-step eligibility checks remain in force.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Attempts on the current interactive step remain valid before the learner presses Continue.
- Past-step attempts remain valid.
- Do not change scoring, XP, retry counts, resume behavior or schema v7.
- Apply through the shared semantic validator so storage, import and runtime writes agree.

---

### Task 1: Prove future-attempt failures

**Files:**
- Create: `tests/answer-attempt-order-integrity.test.ts`

- [x] Reject an attempt on a future interactive step.
- [x] Accept an attempt on the current interactive step.
- [x] Accept a past attempt after the learner advances.
- [x] Reject runtime rewind that leaves future attempts behind.

### Task 2: Enforce authored attempt ordering

**Files:**
- Modify: `src/domain/learning/state-integrity.ts`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Resolve each attempt step index and require it to be <= current progress.
- [x] Run full regression and source sanity gates.
