# Legacy Snapshot Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Quarantine malformed guest snapshots from legacy schemas v1-v6 without breaking valid migrations or the existing fallback parser API.

**Architecture:** Keep `parseGuestState()` backward-compatible by adding a strict parser that returns `null` on invalid data. Storage loading uses the strict result to distinguish a proven migration from corruption and preserves raw bytes for recovery.

**Tech Stack:** TypeScript, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-10-ecopulse-design.md`

## Global Constraints

- Current guest schema remains v7.
- Valid v1-v6 snapshots must continue migrating.
- Malformed legacy snapshots must never be silently autosaved as a clean empty state.
- Raw stored bytes must remain available to the existing quarantine recovery UI.
- `parseGuestState()` keeps its clean-fallback behavior for existing callers.

---

### Task 1: Strict legacy parsing

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Modify: `src/lib/guest-progress.ts`
- Test: `tests/legacy-snapshot-integrity.test.ts`

**Interfaces:**
- Produces: `parseGuestStateStrict(raw): GuestState | null`
- Existing: `parseGuestState(raw): GuestState` remains compatible.

- [x] Add failing coverage for valid empty legacy migrations, malformed XP and missing version-required fields.
- [x] Add `parseGuestStateStrict()` and make the legacy fallback API wrap it.
- [x] Make storage integrity classification quarantine every strict parse failure as `corrupt`.
- [x] Preserve `unsupported` handling for future versions and raw recovery bytes.
- [x] Run targeted migration/integrity tests.
- [x] Run full regression, type and source sanity checks.
