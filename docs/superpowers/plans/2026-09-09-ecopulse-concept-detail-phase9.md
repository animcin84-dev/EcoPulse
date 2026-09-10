# EcoPulse Concept Detail Phase 9 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Turn Explore nodes into useful concept pages that explain meaning, relations, mastery evidence and official sources.

**Architecture:** Extend authored knowledge nodes with bilingual descriptions, lesson/source links and optional vocabulary-review ids. Add a pure concept-detail resolver so UI does not infer semantics. `/concept/[slug]` renders the authored detail and overlays local guest mastery evidence when the node maps to vocabulary.

**Tech Stack:** TypeScript, React/Next source layer, authored SVG graph, guest progress state.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-design.md`

## Global Constraints
- Knowledge relations retain semantic labels; arrows are not assumed causal.
- Every concept detail must be bilingual and source-backed where science-heavy.
- Mastery transparency must show evidence categories, not a synthetic knowledge score.
- Mobile/assistive users must reach every concept without manipulating the SVG graph.

---

### Task 1: Author concept metadata
- [x] Write failing integrity tests for descriptions, valid sources and review-item references.
- [x] Run focused tests and confirm RED.
- [x] Add concept descriptions, source ids, lesson links and optional review ids.
- [x] Run focused tests and confirm GREEN.

### Task 2: Resolve concept detail
- [x] Write failing tests for semantic inbound/outbound relation resolution and source lookup.
- [x] Implement the pure resolver and verify GREEN.

### Task 3: Concept UI and Explore links
- [x] Add `/concept/[slug]` and a client mastery-evidence panel.
- [x] Make SVG/list Explore nodes navigate to concept pages.
- [x] Add responsive styles and accessible evidence labels.
- [x] Run full tests, core typecheck, TSX sanity and diff check.

### Task 4: Handoff
- [x] Update README/status.
- [x] Run final fresh verification.
- [x] Commit and package Phase 9 ZIP.
