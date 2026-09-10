# Idempotent Review Submission Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every due-review answer an idempotent domain operation so duplicate UI events cannot grant review XP twice or advance the spaced-review stage twice.

**Architecture:** Add a pure `submitDueReviewAnswer()` boundary that owns due-state validation, answer evaluation, mastery evidence, review scheduling, and +10 correct-review XP. `ReviewSession` remains responsible only for presentation/feedback and delegates authoritative state mutation to the domain helper.

**Tech Stack:** TypeScript strict, Node built-in test runner, React/Next source integration.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Correct review awards +10 XP exactly once for a due record.
- Incorrect review awards 0 XP and schedules relearning exactly once.
- A non-due or missing review record is a no-op.
- Answer semantics remain unchanged: recognition IDs are strict; typed recall/context use safe normalization only.
- Mastery remains evidence-based; the domain helper must update evidence and derived mastery atomically with the review record.
- UI accessibility, batching, keyboard shortcuts, and focus behavior must not regress.

---

### Task 1: Pure Review Submission Boundary

**Files:**
- Create: `src/domain/learning/review-submission.ts`
- Create: `tests/review-submission.test.ts`

**Interfaces:**
- Consumes: `GuestState`, `ReviewRecord`, review answer evaluator, mastery evidence functions.
- Produces: `submitDueReviewAnswer(state, input, now) -> { state, applied, correct }`.

- [x] **Step 1: Write failing tests** for due correct, duplicate correct, non-due, due incorrect, duplicate incorrect, and missing record.
- [x] **Step 2: Run targeted tests and verify RED** because the domain module is missing.
- [x] **Step 3: Implement the minimal immutable domain helper** with due-state guard and atomic state update.
- [x] **Step 4: Run targeted tests and verify GREEN.**

### Task 2: ReviewSession Delegation

**Files:**
- Modify: `src/components/review/ReviewSession.tsx`
- Create: `tests/review-submission-ui.test.ts`

**Interfaces:**
- Consumes: `submitDueReviewAnswer()`.
- Produces: authoritative review mutation delegated to domain while preserving existing feedback/focus/keyboard UX.

- [x] **Step 1: Write a source-level failing test** requiring `ReviewSession` to import/use the helper and prohibiting direct review XP/stage mutation.
- [x] **Step 2: Verify RED.**
- [x] **Step 3: Replace direct mutation with the domain helper**, capturing one `now` per submitted UI event.
- [x] **Step 4: Verify targeted UI test and review accessibility/batching tests remain GREEN.**

### Task 3: Full Regression and Checkpoint

**Files:**
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`
- Modify: this plan

- [x] **Step 1: Run full test suite and core typecheck.**
- [x] **Step 2: Run dependency-independent full TS/TSX sanity check.**
- [x] **Step 3: Run CSS structural sanity and `git diff --check`.**
- [x] **Step 4: Update handoff docs with exact verified counts and Phase 39 behavior.**
- [x] **Step 5: Repeat final verification after documentation.**
- [x] **Step 6: Commit Phase 39 and create `/mnt/data/EcoPulse-MVP-phase39.zip` from committed tree; verify with `unzip -t`.**
