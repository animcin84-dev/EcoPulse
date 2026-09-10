# EcoPulse Bilingual Onboarding Phase 16 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/start` genuinely bilingual from the first level question through the result screen while preserving English diagnostic validity.

**Architecture:** Move onboarding copy/questions to typed authored EN/ҚАЗ content. Use persisted learning settings for the active onboarding locale so Phase 12 root-language synchronization applies immediately.

**Tech Stack:** React, TypeScript, Node tests.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- No new personal-data fields.
- Diagnostic English answer options remain English and are marked `lang="en"`.
- Changing onboarding language persists as the lesson-language preference.
- Scientific content and level inference remain unchanged.

---

### Task 1: Authored bilingual content
- [x] RED tests for level choices, interests, diagnostic and core copy.
- [x] Implement typed `onboardingContent` and verify GREEN.

### Task 2: Onboarding runtime
- [x] Add EN/ҚАЗ header toggle using persisted settings.
- [x] Localize level, interest, diagnostic prompt/note and result surfaces.
- [x] Mark diagnostic answer text as English.

### Task 3: Responsive/accessibility styling
- [x] Add touch-sized language controls without increasing onboarding steps.
- [x] Keep root document-language synchronization through GuestProgressProvider.

### Task 4: Verification/checkpoint
- [x] Full tests, core typecheck, TSX sanity and diff check.
- [x] Update docs, commit and archive.
