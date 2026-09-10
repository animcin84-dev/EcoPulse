# EcoPulse Reduced-Data Media Phase 27 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make institutional Earth-observation imagery optional and data-conscious without reducing any educational content.

**Architecture:** Persist one media preference in the versioned guest settings, resolve remote-load permission through a pure policy, and let the institutional-media component progressively enhance existing authored diagrams only when loading is permitted. Browser Save-Data is treated as an automatic suppression signal; explicit Reduced Data always wins.

**Tech Stack:** TypeScript, React client components, browser Network Information hint when available, existing localStorage guest-state layer.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-design.md`

## Global Constraints
- [x] No institutional image is required to understand or complete a lesson.
- [x] Reduced Data must prevent creation of the remote image request.
- [x] Auto must respect Save-Data where supported.
- [x] Legacy guest progress must migrate without loss.
- [x] No change to XP, mastery, review, science facts, or mission state.

### Task 1: Persist the media preference
- [x] Write failing settings/migration tests.
- [x] Add `media: auto | reduced` and schema v6 migration behavior.
- [x] Verify settings tests GREEN.

### Task 2: Add a pure loading policy
- [x] Write RED tests for Reduced Data, Save-Data, normal Auto, and unknown initial browser state.
- [x] Implement `shouldLoadInstitutionalMedia`.
- [x] Verify policy tests GREEN.

### Task 3: Apply policy to institutional media
- [x] Write source-level RED integration coverage.
- [x] Keep diagrams rendered first; create `<img>` only when policy permits it.
- [x] Show localized data-saving/unavailable state instead of a blank region.
- [x] Preserve credits only when institutional imagery is actually displayed.

### Task 4: Settings and regression
- [x] Add bilingual Auto / Reduced Data controls.
- [x] Verify export/reset preserves media preference.
- [x] Run complete suite, core typecheck, TS/TSX sanity, diff check, commit, and archive.
