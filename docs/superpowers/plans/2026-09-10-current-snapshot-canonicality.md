# Current Snapshot Canonicality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Stop current schema v7 from silently normalizing impossible persisted values while preserving tolerant legacy migration.

**Architecture:** Add strict current-schema parsers for learning settings, mission reflections and set-like string arrays. Legacy v1-v6 continue through existing normalization/deduplication paths; current v7 must already be canonical or parsing fails and the existing corruption quarantine handles recovery.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Preserve tolerant legacy migration for v1-v6.
- Preserve `normalizeLearningSettings()` as the UI/update helper.
- Preserve reflection trimming/capping when saving through the official runtime helper.
- Do not change guest schema version.

---

### Task 1: Prove current-schema silent normalization

**Files:**
- Create: `tests/current-snapshot-canonicality.test.ts`
- Modify: `tests/learning-settings.test.ts`

- [x] Current invalid settings are corrupt, not silently defaulted.
- [x] Legacy v4 invalid settings still migrate with defaults.
- [x] Current padded/oversized/blank reflection is corrupt rather than truncated/removed.
- [x] Current duplicate set-like ids are corrupt rather than silently deduplicated.
- [x] Legacy duplicate arrays may still canonicalize during migration.

### Task 2: Add strict current parsers

**Files:**
- Modify: `src/domain/learning/settings.ts`
- Modify: `src/domain/learning/guest-state.ts`
- Modify: `README.md`
- Modify: `IMPLEMENTATION_STATUS.md`

- [x] Add strict learning-settings parser.
- [x] Add strict mission-reflection parsing for current schema only.
- [x] Add strict unique string-array parsing for current schema only.
- [x] Run full regression and source sanity gates.
