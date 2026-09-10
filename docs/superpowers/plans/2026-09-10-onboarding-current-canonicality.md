# Onboarding Current-State Canonicality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent current schema v7 onboarding interests from being silently canonicalized while preserving tolerant legacy migration.

**Architecture:** Keep `normalizeInterests()` as the UI/legacy migration helper. Add a strict-current mode to guest-state onboarding parsing so current snapshots must already contain unique approved interest ids in their persisted order, while v1-v6 continue to normalize duplicate or unknown values.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Guest schema remains v7.
- Do not change onboarding screens, diagnostic scoring, XP, mastery, review, or settings behavior.
- Do not require a non-null level solely because onboarding is completed; current product logic intentionally tolerates a B1 fallback.
- Current snapshots are strict; legacy v1-v6 migration remains tolerant.

---

### Task 1: Enforce current onboarding-interest canonicality

**Files:**
- Modify: `src/domain/learning/guest-state.ts`
- Create: `tests/onboarding-current-canonicality.test.ts`

**Interfaces:**
- Consumes: `normalizeInterests(values)` and `GUEST_STATE_VERSION`.
- Produces: strict current parsing through `parseGuestStateStrict()` without changing its public signature.

- [x] **Step 1: Write failing tests** for duplicate current interests, unknown current interests, valid ordered current interests, and tolerant legacy v6 migration.
- [x] **Step 2: Run targeted tests** and verify current duplicates are accepted while legacy duplicate/unknown input is rejected.
- [x] **Step 3: Add `strictCurrent` to onboarding parsing** and require current persisted interests to equal their normalized representation exactly.
- [x] **Step 4: Run targeted tests** and verify all four cases pass.
- [x] **Step 5: Run full regression and type/source checks** before checkpointing.
