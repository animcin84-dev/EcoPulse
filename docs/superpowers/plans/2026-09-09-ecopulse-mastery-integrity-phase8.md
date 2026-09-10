# EcoPulse Mastery Integrity Phase 8 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make vocabulary mastery evidence-based so repeated recognition cannot produce STRONG or MASTERED.

**Architecture:** Persist a per-word mastery evidence ledger in guest state and derive learner-facing mastery states from that ledger. Lesson exercises may contribute only explicitly authored evidence signals, while spaced review uses staged recall, context, recognition, and delayed-review tasks. Guest-state v5 migrates v1-v4 snapshots without discarding prior visible mastery.

**Tech Stack:** TypeScript, Node test runner, React/Next source layer, local guest persistence.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-design.md`

## Global Constraints
- XP and mastery remain separate.
- MASTERED requires recognition + recall + context + delayed review.
- Repeated recognition alone can never yield STRONG or MASTERED.
- Existing guest progress must migrate without destructive resets.
- Review remains keyboard/touch accessible and bilingual.

---

### Task 1: Persist mastery evidence
**Files:** `src/domain/learning/mastery.ts`, `src/domain/learning/guest-state.ts`, `tests/mastery-integrity.test.ts`
- [x] Write failing tests for evidence updates, v4→v5 migration, and repeated-recognition anti-farming.
- [x] Run focused tests and confirm RED.
- [x] Implement immutable evidence recording and guest schema v5 parsing/migration.
- [x] Run focused tests and confirm GREEN.

### Task 2: Author lesson mastery signals
**Files:** `src/domain/content/types.ts`, `src/domain/content/validator.ts`, `src/content/lessons/*.ts`, `src/domain/learning/guest-state.ts`, `tests/mastery-integrity.test.ts`
- [x] Write failing tests requiring valid target-word mastery signals.
- [x] Run focused tests and confirm RED.
- [x] Add optional exercise mastery signals, validate them, and apply only successful authored signals during lesson finalization.
- [x] Run focused and full domain tests.

### Task 3: Stage review evidence
**Files:** `src/content/review-items.ts`, `src/domain/learning/review-mastery.ts`, `src/components/review/ReviewSession.tsx`, `tests/mastery-integrity.test.ts`
- [x] Write failing tests for stage 0 recall, stage 1 context, stage 2 recognition, stage 3 delayed review.
- [x] Run focused tests and confirm RED.
- [x] Add bilingual recall/context prompts and deterministic stage→signal logic.
- [x] Update ReviewSession to render typed recall/context before recognition choices.
- [x] Run full tests, core typecheck, TSX sanity and diff check.

### Task 4: Handoff
**Files:** `README.md`, `IMPLEMENTATION_STATUS.md`
- [x] Document mastery evidence semantics and migration.
- [x] Run final fresh verification.
- [x] Commit Phase 8 and package a checkpoint ZIP.
