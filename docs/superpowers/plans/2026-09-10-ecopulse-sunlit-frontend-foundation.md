# EcoPulse Sunlit Frontend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the first production-ready light visual-system wave: updated navigation, slogan-led Home hero, bilingual welcome and eight topic entry cards, with responsive motion-safe styling.

**Architecture:** Preserve existing learning/progress domain behavior and change the presentation layer through focused Home components plus navigation/copy data. Reuse existing media and exercise components, and implement this wave with CSS transform/opacity motion so no new dependency is needed.

**Tech Stack:** Next.js 16.3.4, React 19.2.7, TypeScript, Tailwind/PostCSS global CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-10-ecopulse-sunlit-frontend-foundation-design.md`

## Global Constraints

- Preserve current lesson, mastery, review, persistence and mission semantics.
- Brand name is EcoPulse.
- Home hero copy is `LEARN ENGLISH. / UNDERSTAND EARTH. / MAKE A DIFFERENCE.`
- Default Home presentation is light, not black.
- Eight environmental topics are bilingual English/Kazakh.
- No new runtime animation dependency in this wave.
- Respect `prefers-reduced-motion` and `html[data-motion='reduced']`.

---

### Task 1: Home content and navigation contracts

**Files:**
- Create: `src/content/home-topics.ts`
- Modify: `src/content/index.ts`
- Modify: `src/domain/learning/product-copy.ts`
- Modify: `src/domain/learning/navigation.ts`
- Test: `tests/home-sunlit-redesign.test.ts`

**Interfaces:**
- Produces: `homeTopics` array with exactly eight bilingual topic records.
- Produces: updated `productCopy[locale].home` slogan/welcome/topic strings.
- Produces: navigation labels for Home, Learn, Challenges, Eco Game, Eco Action and My Progress.

- [x] **Step 1: Write failing tests for approved slogan, eight topic records and navigation labels.**
- [x] **Step 2: Run `node --experimental-strip-types --test tests/home-sunlit-redesign.test.ts` and verify RED.**
- [x] **Step 3: Implement minimal copy/content/navigation model.**
- [x] **Step 4: Re-run the focused test and verify GREEN.**

### Task 2: New Home information architecture

**Files:**
- Create: `src/components/home/HomeWelcome.tsx`
- Create: `src/components/home/HomeTopics.tsx`
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/home-sunlit-redesign.test.ts`

**Interfaces:**
- `HomeWelcome` renders the approved positioning and `/start` CTA.
- `HomeTopics` consumes `homeTopics` and links topic cards into the current learning journey.
- `Hero` uses approved slogan and dual CTAs.

- [x] **Step 1: Extend focused source-contract tests for new components and Home ordering.**
- [x] **Step 2: Run the focused test and verify RED.**
- [x] **Step 3: Implement HomeWelcome, HomeTopics, new Hero and page ordering.**
- [x] **Step 4: Re-run focused test and verify GREEN.**

### Task 3: Sunlit design tokens and motion system

**Files:**
- Modify: `src/app/globals.css`
- Test: `tests/home-sunlit-redesign.test.ts`

**Interfaces:**
- Produces light background tokens `--canvas`, `--surface`, `--mint`, `--sky`, `--warm` and semantic ink/action tokens.
- Produces Home hero/topic/welcome responsive CSS and reduced-motion overrides.

- [x] **Step 1: Extend focused test with token and reduced-motion contracts.**
- [x] **Step 2: Run focused test and verify RED.**
- [x] **Step 3: Implement tokens, light Home surfaces, hero/topic animation and responsive rules.**
- [x] **Step 4: Re-run focused test and verify GREEN.**

### Task 4: Global app navigation and dedicated game/action surfaces

**Files:**
- Create: `src/app/game/page.tsx`
- Create: `src/app/action/page.tsx`
- Modify: `src/components/navigation/AppNav.tsx`
- Modify: `src/domain/learning/navigation.ts`
- Test: `tests/home-sunlit-redesign.test.ts`

**Interfaces:**
- Home is represented in global app nav.
- `/game` reuses the proven ReviewSession as the first Eco Game surface.
- `/action` reuses the proven MissionList as the dedicated Eco Action surface.
- Legacy `/review` maps to Eco Game; `/mission/*` maps to Eco Action; `/settings` remains grouped under My Progress.

- [x] **Step 1: Add focused navigation resolver and route source assertions.**
- [x] **Step 2: Run focused test and verify RED.**
- [x] **Step 3: Implement navigation mapping and dedicated routes.**
- [x] **Step 4: Re-run focused test and verify GREEN.**

### Task 5: Regression and release checks

**Files:**
- Modify only if a regression is found.

**Interfaces:**
- Existing 360-test baseline remains green.

- [x] **Step 1: Run `npm test`.**
- [x] **Step 2: Run `npm run typecheck:core` if full dependencies remain unavailable.**
- [ ] **Step 3: Run `npm run typecheck` and `npm run build` if dependencies can be installed in the environment.**
- [x] **Step 4: Inspect source diff and package the updated project ZIP.**

## Verification note

- `npm test`: 366/366 passing after the Challenge/Eco Action separation contract was added.
- `npm run typecheck:core`: passing.
- Full `npm run typecheck` / `npm run build`: not executable in this sandbox because two `npm install --ignore-scripts --no-audit --no-fund` attempts timed out and `node_modules` is unavailable. The raw `tsc --noEmit` output consequently reports missing `next`, `react` and JSX typings across the whole pre-existing app.
- System Chromium is present but its headless renderer hangs on the container DBus/zygote boundary, so no render proof is claimed.
