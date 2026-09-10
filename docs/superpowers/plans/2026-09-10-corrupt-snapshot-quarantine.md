# Corrupt Snapshot Quarantine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use a TDD execution workflow task-by-task.

**Goal:** Prevent malformed or unsupported local guest snapshots from being silently replaced by a clean empty state.

**Architecture:** Extend the storage read result with integrity classification and preserve the raw payload. Provider enters a protected recovery state for corrupt/current-invalid or unsupported/future snapshots and suppresses automatic writes. The global persistence notice provides explicit raw download and destructive start-fresh recovery.

**Tech Stack:** TypeScript strict, localStorage adapter, React provider/UI, Node tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Constraints
- Existing `parseGuestState()` fallback behavior remains compatible for callers/tests.
- Valid empty current snapshots are not treated as corruption.
- Future schema versions are quarantined, not downgraded.
- Quarantined raw bytes are not overwritten automatically.
- Starting fresh is explicit and destructive; raw export is available first.

### Task 1: Integrity Classification
- [x] RED: malformed JSON, malformed current schema, unsupported future schema and valid empty snapshot classifications.
- [x] GREEN: extend `loadGuestStateWithStatus()` with `integrity` and `raw`.

### Task 2: Provider Quarantine + Recovery UI
- [x] RED: provider suppresses writes for corrupt/unsupported status and exposes raw recovery payload.
- [x] GREEN: add recovery states, raw download and explicit clear/reload actions.

### Task 3: Regression + Checkpoint
- [x] Full regression/type/sanity/CSS/diff.
- [x] Update docs and plan.
- [x] Repeat fresh verification.
- [x] Commit and archive Phase 42.
