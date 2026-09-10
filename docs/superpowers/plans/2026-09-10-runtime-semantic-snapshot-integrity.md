# Runtime Semantic Snapshot Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent a structurally valid but curriculum-incompatible local snapshot from entering active learner state or being silently overwritten.

**Architecture:** Extract authored-reference validation into one learning-domain module consumed by both backup import and normal local-storage loading. Classify reference mismatch separately as `incompatible`, retain raw recovery bytes, and reuse the existing protected quarantine workflow.

**Tech Stack:** TypeScript, React, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve guest schema v7 and migration behavior.
- Do not auto-rewrite unknown authored references.
- Do not auto-save, exit-flush, or ordinary-reset over quarantined data.
- Keep import and runtime semantic validation identical.

---

### Task 1: Shared semantic state validator

**Files:**
- Create: `src/domain/learning/state-integrity.ts`
- Modify: `src/domain/learning/data-controls.ts`
- Modify: `src/lib/guest-progress.ts`
- Test: `tests/runtime-semantic-snapshot-integrity.test.ts`

**Interfaces:**
- Produces: `hasConsistentLearningStateReferences(state: GuestState): boolean`
- Consumes: current lesson, review, mission, challenge, concept, and Think registries.

- [x] Write RED tests for stale authored references in normal storage.
- [x] Extract the existing import semantic validator into a shared domain module.
- [x] Apply the validator after strict shape parsing during local-storage load.
- [x] Confirm current semantically valid snapshots still load.

### Task 2: Incompatible-content recovery state

**Files:**
- Modify: `src/lib/guest-progress.ts`
- Modify: `src/components/progress/GuestProgressProvider.tsx`
- Modify: `src/components/progress/PersistenceNotice.tsx`
- Modify: `src/components/settings/DataControlsPanel.tsx`
- Modify: `tests/snapshot-quarantine-ui.test.ts`
- Modify: `tests/persistence-exit-flush.test.ts`

**Interfaces:**
- Produces: `GuestSnapshotIntegrity['incompatible']` and `GuestPersistenceStatus['incompatible']`.

- [x] Classify semantic mismatch as `incompatible` instead of damaged JSON.
- [x] Preserve raw bytes and block autosave/exit flush/ordinary reset.
- [x] Add distinct EN/ҚАЗ recovery messaging and explicit download-before-reset flow.
- [x] Run full regression and source sanity gates.
