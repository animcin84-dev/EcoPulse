# Multi-tab Conflict Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use a TDD execution workflow task-by-task.

**Goal:** Prevent a stale EcoPulse tab from silently overwriting newer local learning progress written by another tab.

**Architecture:** Treat any external `storage` event for the guest-progress key as a conflict signal. The affected tab enters a protected `conflict` persistence state and stops subsequent localStorage writes until reload. A global bilingual notice explains the situation and offers export/reload recovery rather than attempting an unsafe automatic merge.

**Tech Stack:** TypeScript strict, React effects, browser StorageEvent, existing local guest storage.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Constraints
- Never auto-merge live-tab review state with the conservative account-sync merge policy.
- A conflict must stop this tab from further writes.
- In-memory learning can continue, but UI must say it is not being persisted from this tab.
- Export remains available before reload.
- No schema migration or server dependency.

### Task 1: Conflict Detection Contract
- [x] RED: provider source must subscribe to `storage` for the exact guest-progress key.
- [x] GREEN: add `conflict` persistence status and listener.

### Task 2: Write Suppression + Recovery Notice
- [x] RED: persistence notice must have bilingual conflict copy, export link and explicit reload action.
- [x] GREEN: skip save effect while conflicted; render recovery controls.

### Task 3: Regression + Checkpoint
- [x] Run full tests/typechecks/sanity/CSS/diff.
- [x] Update README/status/plan.
- [x] Repeat fresh verification.
- [x] Commit and archive Phase 41.
