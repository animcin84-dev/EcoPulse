# World Challenge Scientific and Reasoning Integrity Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make every World Challenge source-backed and require a short, non-graded English reasoning explanation before checkpoint completion.

**Architecture:** Extend authored World Challenge content with official `sourceIds` and one bilingual reasoning prompt. Reuse the current science registry/source disclosure and the existing three-word reasoning readiness rule. Keep reasoning transient component state; checkpoint XP remains the existing idempotent +50 completion award.

**Tech Stack:** TypeScript, React/Next source, existing science registry, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- Reasoning text is not persisted, sent, scored for opinion, or added to mastery evidence.
- Every checkpoint keeps exactly one +50 XP completion award.
- Every challenge source must come from the official existing science registry.
- A2/B1/B2 share the same scientific truth; English production may be short and imperfect.
- Completion remains keyboard/touch accessible and no drag/audio is required.

### Task 1: Challenge source/reasoning content
- [x] Add failing tests for bilingual reasoning prompts, valid source IDs, and source claim coverage.
- [x] Extend `WorldChallenge` with `sourceIds` and `reasoningPrompt`.
- [x] Author source/reasoning data for all four checkpoints.

### Task 2: Reasoning completion step
- [x] Add failing UI tests requiring source disclosure and transient reasoning gate.
- [x] Insert a final explanation screen after the last choice and before completion.
- [x] Reuse `isReasoningResponseReady`; do not persist reasoning or award separate XP.

### Task 3: Verification/checkpoint
- [x] Run full tests, core typecheck, TSX sanity, CSS sanity and diff check.
- [x] Update README/status, commit Phase 34, archive committed tree and verify ZIP.
