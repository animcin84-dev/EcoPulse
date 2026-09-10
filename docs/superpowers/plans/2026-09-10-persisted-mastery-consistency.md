# Persisted Mastery Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reject current-schema guest snapshots whose mastery labels and evidence ledger disagree or contain impossible evidence combinations.

**Architecture:** Keep the integrity rule inside strict guest-state parsing so local storage and backup import inherit the same protection. Current schema v7 is exact: every persisted mastery label must have matching evidence and every evidence record must derive the same label. Historical v1-v6 states remain migration-compatible by reconstructing missing evidence from their legacy mastery labels.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve guest schema v7 and all valid legacy migrations.
- Keep mastery evidence as the source of truth for current snapshots.
- Do not infer impossible current evidence into a plausible state.
- Do not change XP, review scheduling, or authored lesson behavior.

---

### Task 1: Current-schema label/evidence integrity

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/persisted-mastery-consistency.test.ts`
- Test: `tests/guest-state.test.ts`
- Test: `tests/learning-data-import.test.ts`

- [x] Reject a current-schema mastery label with no matching evidence record.
- [x] Reject a current-schema label that disagrees with the state derived from its evidence.
- [x] Require equal current-schema mastery/evidence key sets.
- [x] Update valid round-trip/import fixtures to include their real evidence ledger.
- [x] Preserve legacy v6 reconstruction of missing evidence.

### Task 2: Evidence prerequisite integrity

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Test: `tests/persisted-mastery-consistency.test.ts`

- [x] Reject mastery signals when exposure evidence is zero.
- [x] Reject delayed-review evidence unless recognition, recall, and context are already present.
- [x] Keep ordinary SEEN, LEARNING, STRONG, and MASTERED evidence combinations valid.
- [x] Run full regression and source sanity gates.
