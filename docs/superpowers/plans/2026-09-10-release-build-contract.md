# Release Build Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make EcoPulse's production runtime and release verification requirements explicit and machine-checkable before dependency-backed deployment is available.

**Architecture:** Keep the existing dependency-independent core gate for the sandbox, but distinguish it from the real release gate. `package.json` declares the Next.js 16 Node runtime floor, `check` requires the full framework-aware TypeScript check, and `verify:release` additionally requires a successful Next production build.

**Tech Stack:** Node.js, npm scripts, Next.js 16, React 19, TypeScript, Tailwind CSS 4/PostCSS.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints

- Minimum Node runtime is 20.9.0 for Next.js 16.
- Do not claim `next build` passes until dependencies are installed and the real command exits 0.
- Preserve dependency-independent test/core-typecheck tooling for this sandbox.
- Do not change runtime framework versions in this phase.

---

### Task 1: Encode the release/build contract

**Files:**
- Modify: `package.json`
- Create: `tests/build-contract.test.ts`

**Interfaces:**
- Consumes: existing npm scripts, framework dependency pins, PostCSS config, global Tailwind import.
- Produces: `engines.node`, `check:core`, dependency-backed `check`, and `verify:release`.

- [x] **Step 1: Write failing tests** for the Node runtime floor and release scripts while confirming existing exact runtime pins and Tailwind wiring.
- [x] **Step 2: Verify RED** because the engine and release scripts are absent.
- [x] **Step 3: Add the minimum package contract** without changing dependency versions.
- [x] **Step 4: Verify targeted GREEN**.
- [x] **Step 5: Run full regression, core typecheck, dependency-independent TS/TSX sanity, CSS and diff checks**.
- [x] **Step 6: Attempt `verify:release` and record the environment blocker honestly** rather than treating source-only verification as a production build.
