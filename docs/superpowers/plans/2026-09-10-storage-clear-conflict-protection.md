# Cross-Tab Storage Clear Conflict Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Treat `localStorage.clear()` in another tab as an EcoPulse guest-progress conflict so a stale tab cannot resurrect cleared progress.

**Architecture:** Keep storage-event interpretation in the guest-persistence boundary rather than React. The provider consumes a pure key policy: the exact EcoPulse key and `null` (browser-wide clear) affect progress; unrelated keys do not.

**Tech Stack:** TypeScript, React, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not change guest schema, XP, mastery, review scheduling, or autosave behavior.
- Preserve existing multi-tab conflict/quarantine protections.
- Do not auto-merge stale snapshots.

---

### Task 1: Shared storage-event policy

**Files:**
- Modify: `src/lib/guest-progress.ts`
- Modify: `src/components/progress/GuestProgressProvider.tsx`
- Test: `tests/storage-clear-conflict.test.ts`
- Test: `tests/multitab-persistence.test.ts`

**Interfaces:**
- Produces: `storageEventAffectsGuestProgress(key: string | null): boolean`
- Consumes: `GUEST_PROGRESS_STORAGE_KEY`

- [x] **Step 1: Write failing tests for exact key, null key, and unrelated keys.**
- [x] **Step 2: Run the targeted tests and verify the null-key case fails before implementation.**
- [x] **Step 3: Implement the pure storage-event policy and wire the provider to it.**
- [x] **Step 4: Update the previous source assertion to the shared-policy contract.**
- [x] **Step 5: Run the full regression, core typecheck, full TS/TSX sanity, CSS structure, and diff checks.**
