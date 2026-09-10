# EcoPulse Accessibility Focus Phase 12 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Harden keyboard and screen-reader navigation with document language sync, a localized skip link, semantic lesson progress, and predictable focus/announcements between lesson steps.

**Architecture:** Add a tiny pure accessibility formatter used by client UI. GuestProgressProvider synchronizes the hydrated preferred locale to the root document language. Root layout exposes a persistent main-content target and client-localized skip link. LessonExperience moves focus only when the authored step index changes and exposes a polite status announcement.

**Tech Stack:** React, TypeScript, DOM accessibility primitives, Node tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- WCAG 2.2 AA intent.
- Do not change lesson scoring, state shape, or content order.
- Do not add focus traps or focus movement for answer selection/feedback changes.
- Respect reduced motion.
- EN/ҚАЗ announcements must match the active lesson locale.

---

### Task 1: Accessibility formatting contract
- [x] RED tests for document language and bilingual lesson progress text.
- [x] Implement pure helpers and verify GREEN.

### Task 2: Root navigation semantics
- [x] Add localized skip link as first focusable control.
- [x] Add stable `#main-content` focus target.
- [x] Sync hydrated document `lang` in GuestProgressProvider.

### Task 3: Lesson semantics/focus
- [x] Convert visual dot group to semantic progressbar attributes.
- [x] Add polite bilingual step announcement.
- [x] Move focus to step container only when step index changes.
- [x] Keep visible focus ring suppressed for programmatic container focus while preserving controls.

### Task 4: Verification/checkpoint
- [x] Full tests, core typecheck, TSX sanity, diff check.
- [x] Update docs with exact count.
- [x] Commit and archive Phase 12.
