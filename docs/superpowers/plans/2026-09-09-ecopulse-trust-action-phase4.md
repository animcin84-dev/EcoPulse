# EcoPulse Science Trust & Action Reflection Phase 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task.

**Goal:** Add visible authoritative science provenance to every MVP lesson and complete the mission loop with privacy-preserving optional reflections.

**Architecture:** Keep sources repository-owned and typed, reference them from lessons by stable IDs, and render them only in a quiet disclosure on result screens. Migrate guest state from schema v2 to v3 by adding local-only mission reflections; no reflection content is sent to analytics or made public.

**Tech Stack:** existing Next.js/React/TypeScript content architecture; no new runtime dependency.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Sources must be official/high-authority and HTTPS.
- Every lesson must have at least one valid source reference.
- Ocean acidification must preserve “more acidic / lower pH”, not “ocean becomes acid”.
- Wildfire wording must preserve risk/multifactor semantics.
- Mission reflection is optional, max 280 characters, local-only in guest mode.
- v1 and v2 guest snapshots must migrate without losing prior progress.

### Task 1: Source Registry & Lesson Contract
- [x] Write failing tests for source registry integrity and lesson source coverage.
- [x] Add `ScienceSource`, registry, `sourceIds` and validator checks.
- [x] Assign official sources to all 8 lessons.

### Task 2: Source Disclosure UI
- [x] Add reusable `SourceDisclosure` to lesson results.
- [x] Keep source links visually secondary and keyboard accessible.

### Task 3: Guest Reflection Contract
- [x] Write failing tests for v2→v3 migration, reflection trimming/limit and mission XP idempotency.
- [x] Add `missionReflections` to guest state schema v3.
- [x] Add local-only save helper.

### Task 4: Mission Reflection UI
- [x] Add optional textarea with 280-character limit.
- [x] Save reflection before/with mission completion.
- [x] Preserve no-photo/no-location safety copy.

### Task 5: Verification
- [x] Run full tests, core typecheck, TSX sanity and diff check.
- [x] Attempt dependency install/build and document sandbox limitation.
- [x] Commit and package checkpoint.
