# Review Accessibility Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Bring Review keyboard, focus, progress and screen-reader behavior up to the same accessibility standard as lessons without changing scheduling, mastery, or XP.

**Architecture:** Extend the existing pure accessibility helpers with bilingual review progress/announcement formatters, then wire those into `ReviewSession`. Recognition uses document-level numeric shortcuts only while an unanswered recognition item is active; focus moves to the new review item only after explicit item navigation or batch continuation.

**Tech Stack:** TypeScript, React client components, Node test runner.

**Spec:** `IMPLEMENTATION_STATUS.md` Phase 36 review flow plus the approved Phase 37 accessibility parity scope.

## Global Constraints

- Review scoring, scheduling, mastery evidence and XP remain unchanged.
- Numeric shortcuts apply only to unresolved recognition options and never fire from editable controls.
- Review exposes a semantic one-indexed progressbar in EN/ҚАЗ.
- Focus changes only when the active review item changes, not when feedback state changes.
- Screen-reader announcements include current position, review mode and current word.

---

### Task 1: Pure review accessibility contract

**Files:**
- Modify: `src/domain/learning/accessibility.ts`
- Modify: `tests/accessibility-contract.test.ts`

- [x] Add failing tests for bilingual review progress and item announcements.
- [x] Implement normalized, one-indexed formatters.
- [x] Run the accessibility contract tests to GREEN.

### Task 2: Review keyboard/focus/progress wiring

**Files:**
- Modify: `src/components/review/ReviewSession.tsx`
- Create: `tests/review-accessibility.test.ts`
- Modify: `src/app/globals.css`

- [x] Add source-level failing assertions for numeric shortcuts, semantic progressbar, live announcement and focus target.
- [x] Implement guarded `1/2/3` shortcuts for recognition only.
- [x] Add progressbar and polite announcement.
- [x] Focus the review item container after explicit next-item/batch transitions.
- [x] Add visible focus treatment for the review item container if needed.

### Task 3: Verification and checkpoint

- [x] Run targeted accessibility/review tests.
- [x] Run the complete regression suite.
- [x] Run core typecheck, full dependency-independent TS/TSX sanity, CSS structural sanity and `git diff --check`.
- [x] Update README/status, commit Phase 37, archive committed tree and verify ZIP integrity.
