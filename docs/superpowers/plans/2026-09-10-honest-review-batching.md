# Honest Review Batching Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Keep each review session capped at eight due words while truthfully reporting and continuing any due backlog that remains.

**Architecture:** Add a pure `buildReviewBatch()` domain helper that separates current-batch records from total due work. The client review session initializes only after guest hydration, renders one focused batch, and recomputes due work after completion so already-reviewed items are excluded before offering the next batch.

**Tech Stack:** TypeScript, React client components, Node test runner.

**Spec:** `IMPLEMENTATION_STATUS.md` Phase 35 review model plus the approved short-session UX.

## Global Constraints

- One review batch contains at most 8 due items.
- Remaining due work must never be hidden behind a false completion message.
- Continuing review must be explicit; there is no infinite automatic session.
- Existing review scheduling, mastery evidence, XP and maintenance-mode logic remain unchanged.
- Review must not flash a false empty state before guest hydration completes.

---

### Task 1: Domain batching contract

**Files:**
- Modify: `src/domain/learning/review.ts`
- Test: `tests/review.test.ts`

**Interfaces:**
- Produces: `buildReviewBatch(records, now, limit)` returning `records`, `totalDue`, and `remainingCount`.

- [x] Add failing tests for an 11-item due backlog and a due set that fits within one batch.
- [x] Implement the pure helper using existing overdue-first ordering.
- [x] Verify the helper caps only the visible batch and preserves the truthful total due count.

### Task 2: Review-session continuation

**Files:**
- Modify: `src/components/review/ReviewSession.tsx`
- Modify: `src/domain/learning/product-copy.ts`
- Test: `tests/review-session-batching.test.ts`

**Interfaces:**
- Consumes: `buildReviewBatch()`.
- Produces: explicit EN/ҚАЗ remaining-work completion state and `Continue review` action.

- [x] Prevent pre-hydration empty-state flicker with an initialized gate.
- [x] Build the first batch only after hydration.
- [x] Recompute due work after a batch completes so reviewed items are no longer counted.
- [x] Show the true remaining due count and require explicit continuation into the next short batch.
- [x] Preserve the normal My Pulse completion action once no due work remains.

### Task 3: Verification and checkpoint

- [x] Run targeted review tests.
- [x] Run the complete regression suite.
- [x] Run core typecheck, dependency-independent full TS/TSX sanity, CSS brace check, and `git diff --check`.
- [x] Commit the verified Phase 36 tree and archive the committed checkpoint.
