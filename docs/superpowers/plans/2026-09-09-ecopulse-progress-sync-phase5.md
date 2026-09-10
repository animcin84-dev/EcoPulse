# EcoPulse Progress Sync Phase 5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task.

**Goal:** Make guest learning progress safely mergeable into a future authenticated account without making login a prerequisite for learning.

**Architecture:** Keep the existing `GuestState` as the canonical portable learning snapshot. Add a pure deterministic merge that conservatively combines local and remote evidence, plus a repository interface that can later be implemented by Supabase without changing lesson UI/domain logic.

**Tech Stack:** TypeScript domain code and Node test runner only; no new runtime dependency.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Guest-first remains functional with no account.
- Merging must never sum total XP from two snapshots; use a conservative non-inflating rule.
- Completed lessons/missions/challenges and concept/scenario evidence must never be lost.
- Stronger mastery wins; review conflicts schedule conservatively rather than delaying a due review.
- Remote account settings/reflections win conflicts, while local values may fill remote gaps.
- Merge and sync operations must be deterministic and idempotent.
- No Supabase migration/client code is added until it can be verified against a real/local Supabase environment.

### Task 1: Merge Contract
- [x] Write failing tests for initial upload, conflicting lesson/mastery/review data, union evidence and reflection precedence.
- [x] Implement immutable `mergeProgressSnapshots(local, remote)`.

### Task 2: Repository Boundary
- [x] Write failing tests for first-account upload and existing-account merge/save.
- [x] Add `ProgressRepository` and `syncProgressSnapshot` without importing Supabase.

### Task 3: Verification
- [x] Run full tests, core typecheck, TSX sanity and diff check.
- [x] Document the Supabase adapter/RLS requirements without claiming unverified database execution.
- [x] Commit and package checkpoint.
