# EcoPulse Navigation Consistency Phase 15 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make primary navigation and Learn surface reflect the same Next Best Action priority used by `/start` and My Pulse.

**Architecture:** Add a pure five-item navigation presentation resolver for localization and due-review badges. Keep Next Best Action in the existing shared resolver and consume it from LearnJourney.

**Tech Stack:** React, TypeScript, Node tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Exactly five primary nav destinations.
- Due review may add a badge, never a sixth item.
- Review due now takes priority over a new lesson in the Learn hero.
- EN/ҚАЗ labels follow persisted locale.
- No scoring/progress changes.

---

### Task 1: Navigation presentation
- [x] RED tests for fixed destinations, due badge, and Kazakh labels.
- [x] Implement pure resolver and verify GREEN.

### Task 2: AppNav integration
- [x] Make AppNav state-aware through GuestProgressProvider.
- [x] Render due badge and localized labels.

### Task 3: Learn next-action consistency
- [x] Reuse shared next-action resolver.
- [x] Render review, lesson, mission, and complete hero states.

### Task 4: Verification/checkpoint
- [x] Full tests, core typecheck, TSX sanity, diff check.
- [x] Update docs, commit and archive.
