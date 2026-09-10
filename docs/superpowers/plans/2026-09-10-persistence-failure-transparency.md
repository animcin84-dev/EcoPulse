# Persistence Failure Transparency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or equivalent TDD execution task-by-task.

**Goal:** Tell learners immediately when browser-local progress persistence is unavailable so in-memory progress is never mistaken for durable progress.

**Architecture:** Extend the guest-storage adapter with an explicit load status, expose a small persistence status from `GuestProgressProvider`, and render one global bilingual recovery notice when persistence is unavailable. Existing guest schema, learning state, XP and mastery remain unchanged.

**Tech Stack:** TypeScript strict, React/Next source integration, localStorage adapter, Node built-in tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- No new server/network persistence.
- No false claim that progress is saved when `localStorage` throws.
- Warning is bilingual, accessible, and non-modal.
- Learner can navigate to local export controls.
- No guest schema migration.

### Task 1: Storage Status Contract
**Files:** `src/lib/guest-progress.ts`, `tests/guest-progress.test.ts`
- [x] RED: test successful read vs storage read exception status.
- [x] GREEN: add `loadGuestStateWithStatus()` while preserving existing `loadGuestState()` API.

### Task 2: Provider Status + Notice
**Files:** `src/components/progress/GuestProgressProvider.tsx`, `src/components/progress/PersistenceNotice.tsx`, `src/app/layout.tsx`, `src/components/settings/DataControlsPanel.tsx`, `tests/persistence-status-ui.test.ts`
- [x] RED: require provider to surface persistence status and check `saveGuestState()` result.
- [x] GREEN: wire `checking/saved/unavailable`, global bilingual notice, and settings export anchor.

### Task 3: Regression + Checkpoint
- [x] Full tests/typechecks/sanity/CSS/diff.
- [x] Update README/status.
- [x] Repeat fresh verification.
- [x] Commit and archive Phase 40.
