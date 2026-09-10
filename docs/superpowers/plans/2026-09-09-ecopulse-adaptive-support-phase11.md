# EcoPulse Adaptive Support Phase 11 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make the selected A2/B1/B2 learning level materially change scaffolding and English production without changing lesson step count or scientific content.

**Architecture:** Add a pure adaptive-support profile keyed by onboarding level. Lesson UI consumes that profile: A2 adds bilingual scaffolding and early clues, B1 preserves current standard behavior, and B2 reduces hinting and requires a short English reasoning extension after Think steps. All production Think steps carry authored bilingual extension prompts. Settings can update the stored onboarding level without resetting progress.

**Tech Stack:** React, TypeScript strict, authored lesson content, guest-state onboarding preferences, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- One curriculum, not separate A2/B1/B2 course copies.
- Scientific facts, correct answers, relation semantics and XP remain identical across levels.
- Lesson step count/order must not change by level.
- A2 support may reveal Kazakh scaffolding but target environmental vocabulary stays English.
- B2 reasoning text is local transient UI state and is not analytics/profile data.
- No new dependency.

---

### Task 1: Adaptive support domain contract
- [x] Write RED tests for A2/B1/B2/null support profiles.
- [x] Implement `resolveAdaptiveSupport(level)` with guided/standard/impact modes.
- [x] Verify GREEN.

### Task 2: B2 authored reasoning prompts
- [x] Extend Think steps with optional bilingual `extensionPrompt` and validate it when present.
- [x] Write RED production coverage test requiring all eight Think steps to have valid extension prompts.
- [x] Author one scientifically responsible extension prompt per lesson.
- [x] Verify GREEN.

### Task 3: Adaptive lesson UI
- [x] A2 Discover auto-opens Kazakh meaning when English is primary.
- [x] A2 Choice/Think shows secondary Kazakh labels and authored clue before first attempt when available.
- [x] B2 hides first-attempt authored hint and requires a short English reasoning response after Think resolution.
- [x] Add visible level/mode chip without adding a new navigation item.
- [x] Run TSX sanity.

### Task 4: Level settings
- [x] Add A2/B1/B2 controls to `/settings`, updating onboarding level only.
- [x] Keep existing progress and settings untouched.
- [x] Run TSX sanity and keyboard/source audit.

### Task 5: Verification/checkpoint
- [x] Run full test suite and core typecheck.
- [x] Run dependency-independent TSX sanity and `git diff --check`.
- [x] Update README/status with exact verified count.
- [x] Commit and archive Phase 11.
