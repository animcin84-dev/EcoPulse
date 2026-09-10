# EcoPulse Awwwards Frontend + Motion Implementation Plan

> **For agentic workers:** execute task-by-task with tests first and verify the whole tree before packaging.

**Goal:** Raise the entire EcoPulse presentation layer to a restrained Steep-inspired editorial/Awwwards level across desktop, tablet and mobile without changing learning-domain semantics.

**Architecture:** Keep the existing Next/React learning core. Add one dependency-free client motion orchestrator, contextual View Transition routing, a final visual-polish stylesheet and a final motion stylesheet. Adapt interaction ideas from the user-provided React Bits/Motion Primitives/GSAP guidance, but implement them with native browser APIs so the production dependency graph remains unchanged.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, View Transition API, IntersectionObserver, Pointer Events, requestAnimationFrame.

**Spec:** User-provided Steep DESIGN/theme/variables/tokens and frontend-design skill, plus uploaded animation/component repositories.

## Global Constraints
- Preserve EN + ҚАЗ behavior and current progress/mastery/XP semantics.
- Do not add proprietary font files; keep Noto Serif Display + Geologica bilingual-safe aliases.
- Motion must have reduced-motion and coarse-pointer fallbacks.
- Prefer transforms/opacity/custom properties; avoid layout animation on scroll.
- Mobile 360/390/430 receives its own composition, not scaled desktop.
- No fake build claims; package only after fresh regression and parser/CSS verification.

---

### Task 1: Motion foundation
- [ ] Add motion tokens and a single SiteMotionController.
- [ ] Track scroll direction/progress with rAF.
- [ ] Observe major headings and content groups once with IntersectionObserver.
- [ ] Add pointer-aware soft surface/magnetic interactions only for fine pointers.

### Task 2: Contextual route transitions
- [ ] Record click-origin and transition kind in NavigationTransitionController.
- [ ] Add radial/detail and quiet/page transition choreography.
- [ ] Preserve no-motion fallback.

### Task 3: Navigation redesign
- [ ] Add accessible focus-managed mobile sheet.
- [ ] Remove decorative numeric sequencing from non-sequential navigation.
- [ ] Add scroll-hide/reveal behavior and refined active/hover states.

### Task 4: Home signature scene
- [ ] Refine hero typography to ink-first editorial hierarchy.
- [ ] Convert CTA pair to Steep-like black + ghost with EcoPulse micro-accent.
- [ ] Add depth metadata to real product artifacts.
- [ ] Add desktop pointer depth and scroll drift; simplify on mobile.

### Task 5: App-wide interaction polish
- [ ] Add staggered group reveal for topic/game/action/progress grids.
- [ ] Add button/link arrow kinetics, surface light response, progress animation.
- [ ] Normalize product heroes and remove unnecessary all-caps decoration.

### Task 6: Forensic mobile pass
- [ ] Tighten 430/390/360 typography and vertical rhythm.
- [ ] Improve menu safe-area, CTA sizing, horizontal card scrollers and sticky rails.
- [ ] Disable costly pointer/ambient effects on touch and reduced-data.

### Task 7: Accessibility/performance
- [ ] Keep focus visible, trap/release menu focus, ESC close.
- [ ] Respect prefers-reduced-motion and project motion setting.
- [ ] Use will-change only while interacting/animating.

### Task 8: Verification and packaging
- [ ] Run focused RED/GREEN contracts.
- [ ] Run full regression and core typecheck.
- [ ] Parse all TS/TSX and verify CSS brace/import order.
- [ ] Attempt full typecheck/build only if dependencies exist.
- [ ] Package clean ZIP and run unzip integrity check.
