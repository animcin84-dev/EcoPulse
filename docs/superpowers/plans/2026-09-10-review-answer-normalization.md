# Review Answer Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Accept harmless punctuation/compound-word formatting differences in typed review answers without introducing fuzzy spelling acceptance.

**Architecture:** Keep recognition IDs exact. Strengthen only the private typed-text normalizer used by recall/context evaluation: Unicode-normalize text, convert common dash/underscore separators to spaces, strip surrounding sentence punctuation, then collapse whitespace and lowercase.

**Tech Stack:** TypeScript, Node test runner.

**Spec:** Phase 35–37 review model; scoring/mastery/scheduling remain unchanged.

## Global Constraints

- No edit-distance, typo correction, stemming or semantic guessing.
- `glacier.` is equivalent to `GLACIER`.
- `sea-level`, `sea_level` and `SEA LEVEL` are equivalent typed compounds.
- Misspellings remain incorrect.
- Recognition option IDs remain exact.

---

### Task 1: Typed-answer normalization

**Files:**
- Modify: `src/domain/learning/review-mastery.ts`
- Modify: `tests/mastery-integrity.test.ts`

- [x] Add failing tests for punctuation and compound separators.
- [x] Add explicit negative tests proving fuzzy spelling is still rejected.
- [x] Implement the minimal safe normalizer.
- [x] Run targeted tests to GREEN.

### Task 2: Verification and checkpoint

- [x] Run full regression and core typecheck.
- [x] Run full TS/TSX sanity, CSS structure and `git diff --check`.
- [x] Update README/status.
- [x] Commit and archive Phase 38 from the committed tree.
