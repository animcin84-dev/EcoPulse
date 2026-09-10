# EcoPulse Homepage Live Demo Phase 13 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the homepage into a real, transient learning interaction before onboarding without awarding XP or mastery.

**Architecture:** Keep demo content/evaluation in a tiny pure domain module. Render a standalone client component that owns only ephemeral answer/language state and never imports guest progress. Reuse approved Glacier vocabulary and reveal the authored `GLACIER → MELT → SEA LEVEL` connection after resolution.

**Tech Stack:** React, TypeScript, Node test runner, existing Living Editorial Science CSS tokens.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Demo must not persist XP, mastery, attempts, or reflections.
- One retry before answer reveal.
- Keyboard 1/2/3 operation.
- EN/ҚАЗ copy.
- Start-intent CTAs route through `/start`.
- Reduced-motion preference must not remove information.

---

### Task 1: Demo contract
- [x] RED test approved Glacier question, answer, chain, and retry policy.
- [x] Implement pure `homeDemo` and `resolveHomeDemoAttempt()` and verify GREEN.

### Task 2: Homepage interaction
- [x] Add transient `HomeLearningDemo` with EN/ҚАЗ toggle and keyboard shortcuts.
- [x] Add retry, reveal, correct feedback, and connection reveal.
- [x] Keep component independent from `GuestProgressProvider`.

### Task 3: Journey integration
- [x] Place demo after Connection Engine storytelling.
- [x] Route start-intent CTAs to `/start`.
- [x] Add responsive/reduced-motion styling.

### Task 4: Verification/checkpoint
- [x] Run full tests, core typecheck, TSX sanity and diff check.
- [x] Audit demo for absence of progress writes.
- [x] Update status/README, commit and archive.
