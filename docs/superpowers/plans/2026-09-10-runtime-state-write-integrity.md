# Runtime Guest-State Write Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent invalid guest-state transforms from entering active React state before persistence or reload-time integrity checks.

**Architecture:** Route every `GuestProgressProvider.updateState()` transform through a pure validation boundary. The updater receives a canonical clone rather than the live state object, and its candidate result must pass strict current-schema parsing plus authored-reference integrity before it can replace active state.

**Tech Stack:** TypeScript, React source integration, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-slice-design.md`

## Global Constraints

- Do not change guest schema v7.
- Do not change XP, mastery, review scheduling, mission, challenge, or lesson semantics.
- Invalid runtime transforms must not mutate the previous active state.
- Existing load/import quarantine remains the durable fallback defense.

---

### Task 1: Pure validated runtime update boundary

**Files:**
- Create: `src/domain/learning/runtime-state-update.ts`
- Test: `tests/runtime-state-update-integrity.test.ts`

- [x] Canonicalize the current snapshot before handing it to an updater.
- [x] Accept ordinary valid runtime updates.
- [x] Reject unknown authored references.
- [x] Reject contradictory current mastery state/evidence.
- [x] Ensure an in-place mutating updater cannot alter the original state when rejected.

### Task 2: Provider wiring

**Files:**
- Modify: `src/components/progress/GuestProgressProvider.tsx`
- Test: `tests/runtime-state-update-provider.test.ts`
- Test: `tests/persistence-exit-flush.test.ts`

- [x] Route `updateState()` through `applyValidatedGuestStateUpdate()`.
- [x] Update the freshest-state ref only after successful validation.
- [x] Keep rejected candidates out of React state, autosave, and exit flush.
- [x] Preserve existing persistence-status and recovery behavior.
- [x] Run full regression and source sanity gates.
