# Maintenance Review Variety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Keep long-term vocabulary review varied after Mastered while preserving the existing delayed-review mastery gate and 30-day maximum interval.

**Architecture:** Let `ReviewRecord.stage` continue increasing beyond five instead of saturating. Review intervals still clamp to the existing final 30-day interval, while presentation modes rotate after the first delayed-recall gate through context, recall, recognition and delayed recall. All maintenance stages continue to refresh the delayed-review gate; an incorrect maintenance answer removes Mastered without erasing earlier evidence.

**Tech Stack:** TypeScript domain logic, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- First mastery path remains recall → context → recognition → delayed recall.
- First review remains due after one day; intervals remain 1, 3, 7, 14, 30 then 30 days thereafter.
- XP, guest schema and review-item content do not change.
- Maintenance errors remove only the delayed-review gate unless the existing mode-specific early-stage rule applies.

### Task 1: Unbounded maintenance stage with capped interval
- [x] Add failing tests proving correct stage-5 review advances to stage 6 while due date stays 30 days away.
- [x] Update review scheduling without changing initial intervals or incorrect backoff.

### Task 2: Rotating maintenance modes
- [x] Add failing tests for stage 4+ context/recall/recognition/delayed-recall rotation.
- [x] Keep stage 0–3 behavior unchanged and maintenance mastery signal mapped to delayed review.

### Task 3: Verification/checkpoint
- [x] Run full regression, core typecheck, TSX sanity and diff check.
- [x] Update README/status, commit Phase 35, archive committed tree and verify ZIP.
