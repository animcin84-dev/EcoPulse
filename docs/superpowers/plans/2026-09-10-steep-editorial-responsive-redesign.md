# EcoPulse Steep-Inspired Editorial Responsive Redesign Implementation Plan

> **For agentic workers:** execute this plan task-by-task with regression verification between structural changes.

**Goal:** Apply the uploaded Steep-derived design system across EcoPulse, rebuild navigation and the home hero around editorial product artifacts, upgrade route/page motion, and make 360/390/430px layouts first-class rather than scaled desktop layouts.

**Architecture:** Preserve the existing learning/progress/game domain logic. Add a late `reference-tokens.css` token bridge and `steep-editorial.css` presentation layer, then make targeted shared-component changes to `AppNav`, `Hero`, and route transition infrastructure so the style reaches every route consistently. Keep existing Noto Serif Display and Geologica fonts as bilingual-safe substitutes for unavailable proprietary reference fonts.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, native View Transition API progressive enhancement, existing zero-extra-runtime-dependency architecture.

**Reference:** `design-reference/steep/DESIGN.md`, `design-reference/steep/theme.css`, `design-reference/steep/variables.css`, `design-reference/steep/tokens.json`.

## Global Constraints

- Preserve all existing lesson, progress, mastery, review, mission and local-persistence semantics.
- Do not fabricate progress or scientific measurements for decorative UI.
- Use the uploaded reference tokens for neutral colors, radii, spacing, surface hierarchy, and elevation.
- Keep EcoPulse green as a restrained brand/action accent; do not copy Steep branding or content.
- Desktop navigation: quiet transparent editorial bar with centered links and right-side actions.
- Mobile navigation: compact header + accessible menu sheet; no six-item cramped row.
- Mobile breakpoints explicitly QA at 360, 390, 430 px.
- Respect `prefers-reduced-motion`, `data-motion="reduced"`, forced-colors, coarse-pointer, and reduced-data fallbacks.
- No new animation dependency.

---

### Task 1: Reference token bridge
- Import exact reference neutral tokens, radii, spacing and shadows into runtime CSS.
- Map Signifier/Sohne roles to existing bilingual font variables.
- Import late enough to power the editorial layer without breaking core semantics.

### Task 2: Shared navigation redesign
- Refactor `AppNav` into editorial desktop navigation and accessible mobile menu sheet.
- Reuse the same navigation shell on Home to eliminate divergent navigation systems.
- Add active-link indicator, language switch, start CTA, settings and body-scroll-safe modal behavior.

### Task 3: Home hero collage redesign
- Replace oversized left-heavy mobile hero with centered editorial headline composition.
- Add real EcoPulse product artifacts for topics, arcade, bilingual learning and optional sign-in.
- Keep an Earth/atmosphere artifact as one floating product visual, not a full-screen dominant object.

### Task 4: Cross-product editorial surface pass
- Apply typography, cards, surfaces, controls, sections and rhythm across Learn, Topic Labs, Climate, Game, Action, Challenges, Pulse, Review, Settings, Onboarding, Mission/Concept details.
- Preserve intentional dark scientific instruments as isolated artifacts only.

### Task 5: Motion and page transitions
- Add progressive native View Transition interception for same-origin internal links.
- Add root old/new transition CSS and section reveal/hover motion.
- Disable or simplify all motion under reduced-motion settings.

### Task 6: Mobile-first forensic pass
- Remove oversized vertical gaps and desktop sticky behavior on narrow screens.
- Set 20px/18px mobile page gutters, 44px+ targets, horizontal rails only where appropriate, safe-area padding, readable type wrapping and compact cards.
- Ensure floating hero artifacts become an intentional stacked collage.

### Task 7: Verification
- Run focused redesign contracts red→green.
- Run all project tests.
- Run core typecheck and independent TS/TSX syntax parse if dependencies are unavailable.
- Check CSS brace balance/import order.
- Package a clean ZIP only after the current tree is verified.
