# EcoPulse Learning Settings Phase 7 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task.

**Goal:** Persist learner language and motion preferences so EcoPulse respects accessibility choices across routes without turning settings into a profile/data-collection surface.

**Architecture:** Extend the versioned guest snapshot with a small `settings` object and migrate v1-v3 snapshots safely to v4. Apply motion preference at the document root from `GuestProgressProvider`, initialize lesson locale from the persisted preference, and expose a focused `/settings` screen with native controls.

**Tech Stack:** existing React/TypeScript/CSS and dependency-free Node tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- No personal information fields.
- Default language remains English; Kazakh can be selected as persistent UI/lesson support.
- Motion options are `system` and `reduced`; reduced mode must never remove information.
- Existing v1/v2/v3 guest progress must migrate without losing XP, mastery, lessons, missions or reflections.
- Settings changes must not award XP.

### Task 1: Versioned settings domain
- [x] Write RED tests for v4 defaults, normalization, and v3→v4 migration.
- [x] Add typed learning settings and safe update helper.
- [x] Update guest parser/serializer migration path.

### Task 2: Runtime application
- [x] Apply persisted motion mode to the document root after hydration.
- [x] Initialize and persist lesson locale from learning settings.
- [x] Add CSS override for explicit reduced motion.

### Task 3: Settings UI
- [x] Add `/settings` page with language and motion controls.
- [x] Add a discoverable Settings link without expanding the five-item mobile primary nav.
- [x] Add responsive/focus states.

### Task 4: Verification
- [ ] Run tests, core typecheck, TSX sanity and diff check.
- [ ] Commit and package checkpoint.
