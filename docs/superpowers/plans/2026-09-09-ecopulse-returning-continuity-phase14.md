# EcoPulse Returning Continuity Phase 14 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every returning-user entry point resolve the same meaningful next action instead of hard-coding `/learn`.

**Architecture:** Centralize review → lesson → mission → explore priority in a pure bilingual resolver. Reuse it from `/start` and My Pulse so presentation cannot drift between surfaces.

**Tech Stack:** TypeScript, React, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Review due now wins over new content.
- No new progress/scoring semantics.
- EN/ҚАЗ next-action titles.
- Returning onboarding never repeats diagnostic.
- Optional missions stay below required review/lesson work.

---

### Task 1: Unified action resolver
- [x] RED tests for review, lesson, mission, and fully complete states.
- [x] Implement `resolveNextLearningAction()` and verify GREEN.

### Task 2: Returning start flow
- [x] Replace hard-coded `/learn` CTA with resolved next action.
- [x] Localize returning copy EN/ҚАЗ.

### Task 3: My Pulse reuse
- [x] Remove duplicated next-action logic from PulseSummary.
- [x] Use the same resolver and persisted locale.

### Task 4: Verification/checkpoint
- [x] Full tests, core typecheck, TSX sanity, diff check.
- [x] Update docs, commit and archive.
