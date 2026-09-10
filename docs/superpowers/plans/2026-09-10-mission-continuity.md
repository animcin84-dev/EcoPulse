# Lesson Mission Continuity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Restore the approved EcoPulse journey from lesson completion to a relevant optional eco mission and then to My Pulse without forcing off-screen action or duplicating progress logic.

**Architecture:** Add one authored lesson-to-mission mapping resolved against the existing mission registry. Introduce a focused private `/mission/[slug]` route that reuses the existing guest mission completion/reflection domain functions, and let `ResultPanel` offer the mapped mission before the normal next-learning action. Mission completion remains idempotent and the route returns the learner to `/pulse`.

**Tech Stack:** TypeScript, React/Next App Router source, existing guest-state domain, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Missions remain optional; no lesson completion depends on completing a mission.
- No photo, GPS, exact location, account, or upload is required.
- Mission XP remains idempotent through the existing guest-state domain function.
- Reflections remain optional, local-only, editable, and capped at 280 characters.
- `/mission/[slug]` is private/noindex and unknown mission IDs recover through the branded 404.
- EN/ҚАЗ presentation follows the persisted learner locale.
- Result flow must preserve direct access to the next lesson/learning map even when a mission is offered.

---

### Task 1: Authored lesson-to-mission mapping
- [x] Add failing tests requiring every production lesson to resolve to a known mission and unknown lesson slugs to resolve to `null`.
- [x] Add a pure lesson-mission resolver backed by the existing mission registry.
- [x] Keep repeated world missions deterministic and safe; no runtime heuristics.

### Task 2: Focused mission route
- [x] Add failing tests for `/mission/[slug]`, explicit noindex metadata, static params, unknown-slug recovery, and private indexing policy.
- [x] Add a focused `MissionExperience` that saves optional reflection and completes via existing guest-state helpers.
- [x] After completion expose a primary route to `/pulse` and secondary route back to Challenges.

### Task 3: Lesson result continuity
- [x] Add failing source/presentation tests requiring ResultPanel to render mapped mission title, safety metadata, completion state, and `/mission/[id]` CTA.
- [x] Wire `LessonExperience` to pass the resolved mission and current completion state into ResultPanel.
- [x] Keep the next lesson/learning-map CTA available as a secondary action.

### Task 4: Verification and checkpoint
- [x] Run the full regression suite, core typecheck, dependency-independent TS/TSX sanity, CSS structural sanity, and `git diff --check`.
- [x] Update README/status and mark this plan complete.
- [x] Commit Phase 33, archive the committed tree, and verify ZIP integrity.
