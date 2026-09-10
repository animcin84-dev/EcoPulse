# EcoPulse

EcoPulse is an environmental English-learning product built around the loop:

**Learn → Understand → Connect → Think → Act → Review → Master**

The current implementation is a guest-first local MVP shell with the full authored core curriculum:

- **4 worlds** — Earth & Atmosphere, Ice & Water, Extremes, Life & Habitats
- **8 lessons** — Atmosphere, Weather vs Climate, Glaciers, Sea Level, Drought, Wildfire & Extreme Weather, Habitats, Ocean Change
- deterministic spaced review
- honest mastery separated from activity XP
- safe optional eco missions with local-only reflections
- authored semantic Explore graph
- local guest progress persistence with backward-compatible schema migrations
- responsive Learn / Review / My Pulse / Challenges / Explore surfaces
- visible official science provenance through `HOW DO WE KNOW?` disclosures
- guest onboarding and four gated World Challenges
- accessible exercise engine: choice, ordering, Fact/Myth, typed fill-blank, and semantic matching
- sync-ready account repository boundary with deterministic local↔remote merge
- persistent learning settings (English/Kazakh lesson preference + system/reduced motion)
- sunlit light-first product presentation with responsive route/view motion and reduced-motion fallbacks
- dedicated Climate Change flagship plus 7 compact bilingual environmental Topic Labs
- each compact Topic Lab now includes 3 bilingual reading chapters, Reading Check, vocabulary retrieval, official sources, System Check, session pulse, and adaptive Next Best Move guidance
- five real Eco Game practice modes, dedicated Eco Action cockpit, challenge progress map, and richer My Progress evidence dashboard
- app-wide Awwwards motion system: contextual route View Transitions, section-specific choreography, measured nav/tab/filter gliders, depth-aware artifacts, and state-entry animation
- mobile-first navigation/body-lock/safe-area behavior plus dedicated 430/390/360px layout and motion tuning
- tactile accessibility polish: focus-within surfaces, reduced-motion/coarse-pointer fallbacks, safe-bottom actions, and below-fold rendering containment

## Stack

- Next.js 16.3.4 App Router
- React 19.2.7
- TypeScript strict
- Tailwind CSS 4.3 via PostCSS + custom Living Editorial Science CSS
- dependency-free Node tests for content and learning-domain logic

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000`.

## Dependency-free verification

These checks work even when frontend packages cannot be downloaded:

```bash
npm test
npm run typecheck:core
git diff --check
```

## Product routes

```text
/                         cinematic EcoPulse home
/start                    guest onboarding + lightweight diagnostic
/learn                    authored 8-lesson journey + 8-topic atlas
/learn/[world]            bilingual world overview, progress, connections + checkpoint
/learn/climate-change     long-form Climate Change flagship module
/learn/recycling          compact bilingual Recycling Topic Lab
/learn/ocean-pollution    compact bilingual Ocean Pollution Topic Lab
/learn/deforestation      compact bilingual Deforestation Topic Lab
/learn/water-conservation compact bilingual Water Conservation Topic Lab
/learn/biodiversity       compact bilingual Biodiversity Topic Lab
/learn/renewable-energy   compact bilingual Renewable Energy Topic Lab
/learn/sustainable-consumption compact bilingual Sustainable Consumption Topic Lab
/lesson/[slug]            generic lesson player
/review                   deterministic spaced review
/game                     five real transient Eco Arcade practice modes + session recap
/action                   safe Eco Action cockpit + mission progress
/pulse                    My Pulse progress dashboard
/settings                 persistent lesson language + motion preferences
/challenges               gated World Challenges + checkpoint progress
/explore                   authored semantic knowledge graph
/concept/[slug]           bilingual concept detail + mastery evidence
/challenge/[slug]          gated World Challenge player
```

## Learning integrity

- XP/activity and vocabulary mastery are intentionally separate.
- A completed lesson awards its completion bonus once.
- A completed mission awards its bonus once.
- Newly learned vocabulary becomes due for review the next day, then follows deterministic 1/3/7/14/30-day review intervals.
- Connection edges use semantic types such as `contributes_to`, `part_of`, and `affects`; arrows are not automatically interpreted as deterministic causation.
- Sea-level content explicitly distinguishes melting **land ice**.
- Drought content describes increased wildfire **risk**, not guaranteed ignition.
- Ocean-change content teaches “more acidic” rather than claiming seawater becomes literal acid.

## Design source of truth

- `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`
- `docs/superpowers/plans/2026-09-09-ecopulse-mvp-slice.md`
- `docs/superpowers/plans/2026-09-09-ecopulse-learning-platform-phase2.md`

The locked visual direction is **Living Editorial Science**. Do not redesign the product during implementation without a concrete usability, accessibility, scientific-correctness, or performance reason.

## Deferred intentionally

Supabase/Auth runtime wiring, institutional final imagery/audio, and real dependency-backed browser/build verification remain later phases. The account-sync merge boundary is already tested independently of Supabase. The local learning loop, onboarding, World Challenges, science trust layer, and reflective missions are stabilized first.


## Phase 3 additions

- `/start` guest-first onboarding with optional diagnostic
- 4 gated World Challenges
- accessible ordering exercise (no drag required)
- versioned guest migration preserving existing progress


## Phase 4 additions

- official NASA / NOAA / USGS source registry referenced by all MVP lessons
- result-screen `HOW DO WE KNOW?` disclosure
- guest-state schema v3 with v1/v2 migration
- optional local-only mission reflections (280-character cap)
- reflections remain separate from mission completion and XP


## Phase 5 sync boundary

`src/domain/learning/progress-sync.ts` defines the tested guest/account merge policy without coupling learning UI to Supabase. The database/auth requirements and verification gates are documented in `docs/backend/SUPABASE_SYNC_CONTRACT.md`. A real Supabase adapter/migration remains intentionally deferred until it can be applied and RLS-tested against an actual project.


## Phase 6 exercise engine

The lesson player now supports three additional authored practice modes:

- **Fact / Myth** — bilingual misconception checks with 1/2 keyboard shortcuts and two-attempt feedback;
- **Fill Blank** — typed English recall with case/whitespace-normalized answer evaluation and hint/reveal states;
- **Matching** — semantic concept-definition matching with native selects, keyboard/touch operation, and no drag dependency.

All exercise content is schema-validated and reuses the existing idempotent lesson scoring path.


## Phase 7 learning settings

Guest state schema v4 adds non-personal learning preferences with backward-compatible v1/v2/v3 migration. `/settings` persists the default lesson language (`EN` or `ҚАЗ`) and motion behavior (`system` or `reduced`). Explicit reduced motion is applied at the document root and preserves all information while minimizing non-essential animation.


## Phase 8 mastery integrity

Vocabulary mastery is now evidence-based. Guest state schema v7 preserves the per-word evidence ledger (`exposure`, `recognition`, `recall`, `context`, `delayedReview`) and derives learner-facing states from it. Authored lesson exercises can contribute only explicit mastery signals after successful answers. Spaced review rotates through typed recall, sentence context, recognition, and delayed recall; repeated recognition alone can never produce STRONG or MASTERED. Account merge unions evidence and recomputes mastery instead of trusting a conflicting label.


## Phase 9 concept detail

Explore nodes now open dedicated bilingual concept pages. Every authored knowledge node carries a concise description, official science-source references, lesson linkage, and optional vocabulary-review mapping. Concept pages show semantic inbound/outbound relations and, for vocabulary concepts, an evidence checklist (`Recognize`, `Recall`, `Context`, `Delayed review`) instead of a synthetic mastery percentage.


## Phase 10 world pages

The Learn journey now has a real structural layer between the global curriculum and individual lessons. `/learn/[world]` resolves from authored curriculum data and shows bilingual world thesis copy, lesson progress, unique target vocabulary, authored semantic connection previews, checkpoint state, and one deterministic next action (`lesson → checkpoint → complete`). The global Learn page links into all four worlds while retaining direct lesson access.


## Phase 11 adaptive learning support

A2/B1/B2 now changes scaffolding without forking the curriculum or changing lesson step order. **A2 / Guided** auto-opens Kazakh meaning support on English Discover screens, adds bilingual choice labels and early authored clues. **B1 / Standard** preserves the English-first baseline. **B2 / Impact** suppresses first-attempt authored hints and requires a short English reasoning attempt after Think decisions; this transient text is not scored, persisted, or treated as mastery evidence. `/settings` can change level without resetting progress.


## Phase 12 accessibility focus

EcoPulse now exposes a localized skip-to-content path, synchronizes the persisted lesson locale to the root document language, presents lesson progress as a real semantic progressbar, and announces/focuses newly authored lesson steps for keyboard and screen-reader users. Focus moves only when the lesson step itself changes — never for answer selection, hints, retries, or feedback states.


## Phase 13 homepage live demo

The public homepage now includes a real, transient Glacier question with EN/ҚАЗ support, keyboard `1/2/3`, one retry before reveal, and a `GLACIER → MELT → SEA LEVEL` connection reveal. The demo deliberately does not import guest progress, so marketing practice cannot award or farm XP/mastery. Primary start-intent CTAs now pass through `/start`.


## Phase 14 returning continuity

Returning learners now use one shared Next Best Action resolver across `/start` and My Pulse. Due review takes priority, followed by the first incomplete lesson, then an optional unfinished mission, then Explore when the core loop is complete. The returning start screen uses the persisted EN/ҚАЗ preference and never forces onboarding again.


## Phase 15 navigation consistency

Primary navigation remains exactly five items, now localized from the persisted EN/ҚАЗ setting and able to show a due-review badge inside Review. The Learn hero consumes the same Next Best Action policy as `/start` and My Pulse, so due review is no longer hidden behind a new-lesson recommendation.


## Phase 16 bilingual onboarding

`/start` is now bilingual end-to-end. Level choices, interest selection, diagnostic instructions, notes and result copy use typed EN/ҚАЗ content, while the actual diagnostic answer options remain English and are marked accordingly for assistive technology. The onboarding language toggle persists into lessons/settings and updates the root document language.

## Phase 17 production chrome hardening

Persisted EN/ҚАЗ now carries through the main product shell instead of stopping at onboarding/lessons. Review, My Pulse, Explore, Missions, concept-detail chrome, World Challenge chrome, and the semantic Knowledge Map use one typed bilingual presentation source. AppNav is route-aware across nested lesson/world/concept/challenge/settings routes and exposes `aria-current="page"` without adding another primary destination. The homepage demo now exposes selected answer state with `aria-pressed` and polite live feedback while remaining transient and XP-free.

## Phase 18 end-to-end localization continuity

Home and Learn now follow the persisted EN/ҚАЗ preference instead of treating localization as an onboarding/lesson-only feature. Hero/navigation/story copy, connection preview, learning-loop/action copy, world headlines, lesson titles/statuses, checkpoints and CTAs are bilingual while target English vocabulary remains explicitly English. The transient homepage demo now initializes from the persisted locale but still receives no progress-update capability, so it cannot award XP or mastery.

## Phase 19 scientific source hardening

The official science registry now declares machine-checkable claim coverage for atmosphere basics, weather/climate, sea level and land-ice melt, drought/fire interaction, wildfire risk, ecosystems, and ocean acidification. Source records were rechecked on 2026-09-10 against NASA, USGS, and NOAA. Tests enforce official domains, current `lastChecked` metadata, non-empty claim tags, and lesson-to-source coverage so future content edits cannot silently detach a scientific claim from its supporting source.

## Phase 20 SEO/privacy indexing policy

EcoPulse now distinguishes public educational discovery from private learner-state routes at the route-metadata layer. Home, Learn, World, Explore, Concept, and Challenges surfaces are indexable discovery content. Onboarding, Review, My Pulse, Settings, individual lesson players, and World Challenge players explicitly emit `noindex, nofollow`. Public world/concept metadata is authored from the same curriculum/knowledge content used by the UI, and no sitemap/canonical host is fabricated until a real deployment domain exists.

## Phase 21 route resilience

Route references are now machine-checked even without a dependency-backed Next build. Tests verify curriculum/world/checkpoint/concept references and derive route patterns from `src/app/**/page.tsx` to validate literal internal CTA links in components. Unknown paths use a branded bilingual EcoPulse recovery screen with clear routes back to Learn or Home.

## Phase 22 runtime resilience

EcoPulse now has branded App Router loading, route-error, and root-layout failure states. Normal route failures preserve the persisted EN/ҚАЗ shell and offer safe retry/home recovery. A provider-independent global fallback remains usable if the root shell itself fails. Learner-facing error UI intentionally never exposes raw error messages, stacks, or digests.

## Phase 23 baseline response hardening

`next.config.ts` applies conservative response headers across page routes: MIME sniffing protection, frame denial, a strict-origin referrer policy, and browser permission denial for camera, microphone, and geolocation. CSP/HSTS remain intentional deployment gates rather than unverified source-only configuration.

## Phase 24 pronunciation

Discover steps now have a real, user-triggered pronunciation control. IPA remains display-only; separate authored English `spokenTerms` drive playback. Curated lesson audio can later be supplied via `audioSrc`, while the current MVP uses browser/device English speech synthesis as a non-autoplay fallback. This fallback is functional but intentionally not presented as final studio-quality pronunciation media.

## Phase 25 learner-owned data controls

Settings now includes local-only learner data controls. A learner can download a versioned JSON copy of the complete portable guest-learning snapshot without sending it anywhere, and can reset learning history through a two-step confirmation flow. Reset clears XP, lesson/mastery/review/mission/checkpoint history while preserving the learner's EN/ҚАЗ preference, A2/B1/B2 support level, selected interests, and motion preference.

## Phase 26 institutional educational media

EcoPulse now uses a narrow source-backed media layer for three concepts where real Earth observation materially improves learning: the atmospheric limb, a Landsat view of Easton Glacier, and a tidal-wetland habitat. Each asset has bilingual alt text, visible NASA Earth Observatory credit/source, explicit dimensions, and an authored CSS/SVG fallback. The wetland visual is explicitly labelled as false-color in EN/ҚАЗ so enhanced spectral colors are not mistaken for literal natural color. Images are progressively enhanced over those fallbacks, never autoplay/track the learner, and remote requests suppress the referrer. The full provenance and the current local-vendoring gate are documented in `docs/content/MEDIA_SOURCES.md`.


## Phase 27 reduced-data media behavior

Institutional imagery is now optional at the request layer rather than merely decorative. Learning settings add `Auto` and `Reduced Data`: Reduced Data never creates the remote NASA image request, while Auto respects the browser `Save-Data` signal where available. Initial rendering remains authored-diagram-first until the policy is known, so the educational content never depends on external media. Guest snapshots migrate from v5 to v6 with `media: auto` and preserve all existing learning progress.


## Phase 28 public methodology

`/about` is now the public evidence layer for EcoPulse rather than a generic company page. It explains the seven-stage learning loop, the distinction between Pulse XP and evidence-based mastery, semantic connection types, official science-source policy, privacy-preserving missions/local data controls, accessibility/media resilience, and current institutional media credits. Its proof numbers are derived from the same production curriculum/graph/source registries used by the app, and the page follows the persisted EN/ҚАЗ preference.


## Phase 29 methodology distribution

The public `/about` methodology/evidence surface can now be printed or saved as PDF and shared without adding a server-side sharing service. Native share is used when available, clipboard copy is the fallback, and all actions are explicitly user-triggered. Print CSS removes interactive chrome and includes external source URLs so a teacher/jury copy remains useful outside the live site.

## Phase 30 lesson interaction localization

Lesson interaction chrome is now consistently bilingual through a single typed `lessonUiCopy` contract. Exercise feedback, source disclosure, pronunciation states, lesson support/loading labels, result navigation, header accessibility copy and explanatory diagram ARIA labels follow the persisted EN/ҚАЗ preference. English environmental terms inside diagrams remain intentionally English as target vocabulary, not untranslated UI.


## Phase 31 adaptive micro-reading and stable lesson resume

Every MVP lesson now includes one dedicated English micro-reading immediately before Think. Each reading has A2/B1/B2 passage variants that change language complexity without changing the scientific truth or comprehension answer. The passage/question remain English learning material, while support and feedback follow the persisted EN/ҚАЗ interface locale. Correct comprehension contributes only authored `context` mastery evidence; merely viewing a passage does not advance mastery.

Guest progress schema **v7** adds stable `currentStepId` anchors so inserting or reordering authored lesson steps does not move returning learners to a different activity. v1–v6 snapshots migrate through a frozen pre-Reading step map, and account sync preserves the winning `(currentStepIndex, currentStepId)` pair atomically instead of mixing anchors from different snapshots.

Reading-specific scientific details now have explicit official NASA/USGS source coverage for glacier formation/flow, local sea-level variation, and drought indicators.


## Phase 32 adaptive listening comprehension

Every MVP lesson now includes one dedicated English listening-comprehension step after Reading and before Think. A2/B1/B2 utterances vary delivery complexity while preserving the same scientific meaning and correct comprehension answer. Playback is explicitly user-triggered: a future recorded clip is preferred when authored, otherwise the MVP uses a slower-to-faster level-aware device English voice. There is no autoplay.

Transcript is always available as an accessibility/support path and never reduces XP or mastery. Answer choices remain hidden until the learner has either started playback or opened the transcript, so the activity does not collapse into another visual multiple-choice question. Audio failure never blocks lesson completion. Correct listening comprehension contributes only existing authored `context` evidence; listening alone creates no mastery shortcut. Listening-specific science claims are covered by explicit NASA/USGS/NOAA source requirements, including thermal expansion and multi-factor wildfire risk. Lesson versions are now `1.2.0`; stable schema-v7 step IDs keep existing resume positions safe.


## Phase 33 lesson-to-mission continuity

Lesson completion now reconnects the approved learning loop to safe off-screen action instead of jumping directly to another lesson. Every production lesson resolves through one authored lesson-to-mission mapping; unknown lessons never invent a mission. Result screens surface the relevant optional mission with time/no-photo/no-location metadata while preserving the direct next-lesson or learning-map action, so missions never become a completion gate.

EcoPulse now has a focused private `/mission/[slug]` route for each authored mission. It uses the existing idempotent guest completion/reflection domain, keeps reflections local-only and optional, caps them at 280 characters, and returns completed learners to My Pulse. Persisted reflections hydrate correctly until the learner explicitly edits them. Unified Next Best Action now points to the exact first unfinished mission rather than the general Challenges page, and `/mission/*` correctly belongs to Challenges in primary navigation while remaining `noindex, nofollow`.

Fresh Phase 33 verification: **222/222 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.


## Phase 34 source-backed World Challenge reasoning

World Challenges now carry their own official science-source references instead of relying indirectly on lesson citations. Weather Detective is backed by NASA weather/climate material, The Coastal City by NASA sea-level/land-ice material, The Dry Season by USGS drought/fire material, and The Living Network by USGS ecosystem material. Machine-checkable claim requirements ensure those source sets continue to cover each checkpoint's scientific focus.

Checkpoint completion now includes one final short English reasoning explanation after the authored decisions and before the +50 XP completion action. EcoPulse only requires a minimal three-word reasoning attempt; it does not grade the learner's opinion, persist the text, add mastery evidence, or send it anywhere. The final reasoning surface exposes the official source disclosure before completion, while the existing idempotent World Challenge domain remains the only path that awards +50 XP.

Fresh Phase 34 verification: **226/226 tests**, core TypeScript typecheck, dependency-independent full TS/TSX sanity, CSS brace integrity, and `git diff --check` all passing. Dependency-backed `next build` remains externally gated by unavailable npm-registry/DNS access in this sandbox.

## Phase 35 varied maintenance review

After the first delayed-recall mastery gate, long-term review no longer repeats one format forever. Maintenance stages keep advancing while the interval remains capped at 30 days, and the learner cycles through context, typed recall, recognition and delayed recall. The original path to `MASTERED` remains unchanged, and a later maintenance mistake removes only the delayed-review gate rather than erasing earlier evidence.

## Phase 36 honest review batching

Review sessions stay intentionally focused at a maximum of eight due words per batch. If more work is still due after that batch, EcoPulse recomputes the backlog from the updated review state, tells the learner exactly how many words remain, and offers an explicit `Continue review` action instead of falsely announcing completion or automatically extending the session. The review screen also waits for guest hydration before deciding whether nothing is due, removing the previous empty-state flicker.

## Phase 37 review accessibility parity

Review now matches the lesson player’s core accessibility behavior without changing review scoring or scheduling. Recognition-mode answers expose keyboard shortcuts `1/2/3` while deliberately ignoring key-repeat, modifier shortcuts and events originating from inputs, textareas, selects or editable content. The active batch position is exposed as a bilingual semantic progressbar, and each new review item has a polite EN/ҚАЗ announcement containing its position, mode and target word.

Focus moves to the newly active review item only after an explicit `Next` or `Continue review` transition; selecting an answer or showing feedback does not steal focus. Recognition options also expose `aria-keyshortcuts` and selected state. Review XP, mastery evidence, 1/3/7/14/30-day scheduling, maintenance rotation and eight-item batching are unchanged.

## Phase 38 safe typed-review normalization

Typed recall/context review now tolerates harmless answer formatting without weakening spelling requirements. Unicode text is normalized, common compound separators such as hyphen/dash/underscore are treated like spaces, and ordinary sentence punctuation is ignored, so answers such as `glacier.` and `sea-level` can match `GLACIER` and `SEA LEVEL`. Recognition option IDs remain exact, and EcoPulse still rejects misspellings, missing letters, letter-by-letter spacing and other fuzzy approximations.

## Phase 39 idempotent review submission

Review answer mutation now lives in a pure due-state domain boundary instead of React. A correct due review awards +10 XP and advances scheduling/mastery exactly once; an incorrect due review schedules relearning exactly once with no XP. Replaying the same event against the updated snapshot, submitting a future record early, or submitting a missing record is a no-op. Review batching, keyboard shortcuts, focus behavior and answer normalization remain unchanged.

## Phase 40 persistence failure transparency

Guest-first progress no longer silently pretends to be durable when browser storage is blocked. The storage adapter reports availability explicitly, `GuestProgressProvider` exposes `checking / saved / unavailable`, and a global EN/ҚАЗ notice appears only when local persistence fails. The learner can keep working in the current tab and is directed to anchored local JSON export controls before leaving. No server sync, schema migration, XP or mastery behavior changed.

## Phase 41 multi-tab conflict protection

EcoPulse no longer attempts to reconcile simultaneous live-tab writes with an unsafe automatic merge. When another tab changes the exact guest-progress storage key, the current stale tab enters a protected conflict state and stops writing to localStorage. A bilingual global notice explains that in-memory work can still be exported, and offers an explicit reload to use the latest saved progress. This avoids stale-tab overwrite without changing guest schema, XP, mastery or account-sync policy.

## Phase 42 corrupt snapshot quarantine

Malformed current guest snapshots and unsupported future schema versions are no longer silently converted into a durable empty state. Storage reads now classify `empty / valid / corrupt / unsupported / unavailable`, preserve quarantined raw bytes, and place the provider in a protected recovery state that suppresses autosave. The bilingual global notice can download the raw recovery payload and requires explicit confirmation before deleting it and starting fresh. Existing `parseGuestState()` callers remain compatible, and no guest schema version changed.

## Phase 43 legacy snapshot integrity

Legacy guest progress now receives the same corruption protection as current schema data. EcoPulse uses a strict internal parser to prove whether v1-v6 snapshots can migrate; malformed legacy payloads are quarantined with their raw bytes instead of being mistaken for a successful empty migration and overwritten. The public `parseGuestState()` fallback API remains compatible, current guest schema stays at v7, and valid historical snapshots continue to migrate normally.

## Phase 44 safe storage boundary and hydration-safe data controls

EcoPulse now treats browser storage acquisition itself as fallible: if accessing `window.localStorage` throws a privacy/security exception, the guest provider safely enters the existing unavailable-persistence path instead of crashing. Provider, recovery, and Settings data controls all use the same guarded storage boundary.

Learning-data Export and Reset stay disabled until the actual guest snapshot has hydrated, so the pre-hydration empty state cannot be exported or mistaken for the learner's real progress. A normal Reset clears the durable browser copy first and only then updates in-memory progress; conflict and quarantine states remain protected by their dedicated recovery flows. Guest schema remains v7 and learning progression rules are unchanged.

## Phase 45 last-chance persistence flush

EcoPulse now protects the narrow gap between a guest-state update and the normal React autosave effect. The provider keeps a freshest-state reference and performs a synchronous local-storage flush when the page is hidden or leaves through `pagehide`, reducing the chance that an immediately closed tab loses the learner's last completed action.

Exit flushing deliberately refuses to write during multi-tab conflict or corrupt/unsupported recovery states, so durability hardening cannot bypass the protections added in earlier persistence phases. A previously unavailable save may make one final retry if browser storage becomes accessible again. Guest schema remains v7 and learning-state rules are unchanged.

## Phase 46 empty-string snapshot integrity

EcoPulse now distinguishes a missing local-storage key from an explicitly stored empty string. Only `null` means “no saved progress”; `""` is treated as malformed saved data and enters the existing quarantine/recovery flow instead of being silently replaced by a clean guest state.

## Phase 47 local backup restore

The JSON export is now a usable backup rather than a one-way download. Settings can validate and preview a native EcoPulse export entirely in the browser, then restore it only after an explicit replace confirmation. Foreign files, unsupported export versions, invalid dates, damaged learning state, and future guest schemas are rejected without falling back to an empty profile.

A validated backup is written to durable guest storage before the in-memory state changes. Restore is available only when guest progress has hydrated and browser persistence is currently healthy; it never auto-merges competing states or sends the file to a server.

## Phase 48 bounded backup import

Backup restore now rejects files larger than 2 MiB before reading them, and the import parser enforces the same UTF-8 byte budget before JSON validation. This keeps the local-only restore path from attempting to parse unexpectedly large files while preserving the strict preview-and-confirm workflow introduced in Phase 47.

## Phase 49 semantic backup integrity

Backup restore now checks more than JSON shape. Lesson/resume references, review items, mastery ids, connected concepts, Think scenarios, missions, reflections, and World Challenges must resolve to the current authored EcoPulse content before a backup can be previewed or applied. A structurally valid but logically broken snapshot is rejected instead of entering the learner's active state.

## Phase 50 cross-tab storage-clear conflict protection

Multi-tab protection now also covers browser-wide `localStorage.clear()` events. Browser storage events with either the exact EcoPulse guest-progress key or `key === null` are treated as external progress changes and place the stale tab in the existing protected conflict state; unrelated storage keys are ignored. This prevents a stale tab from resurrecting progress that another tab deliberately cleared, without changing guest schema, autosave, XP, mastery, review scheduling, quarantine, or recovery behavior.

## Phase 51 runtime semantic snapshot integrity

Normal browser progress now receives the same authored-reference integrity checks as imported backups. After strict JSON/schema parsing, a saved snapshot must still resolve every lesson/resume step, review item, mastery id, concept, Think scenario, mission, reflection, and World Challenge against the current EcoPulse curriculum before it can enter active learner state.

A structurally valid snapshot that belongs to an older or incompatible content structure is classified separately as `incompatible`, not mislabeled as damaged JSON. EcoPulse preserves the raw payload, blocks autosave/exit flush/ordinary reset, and offers the existing download-before-reset recovery path with explicit EN/ҚАЗ content-mismatch messaging. Backup import and normal local storage share one semantic validator, preventing their integrity rules from drifting apart.

## Phase 52 persisted XP and answer-attempt integrity

The strict guest-state parser no longer trusts persisted lesson attempts through a TypeScript cast. Every answer-attempt record is validated at runtime: `count` must be an integer of at least one, `correct` and `xpAwarded` must be booleans, and a record cannot claim awarded XP while also claiming the answer was never correct. Global and per-lesson XP must also be non-negative integers rather than arbitrary numeric JSON values. Invalid snapshots enter the existing corruption quarantine path; valid current and legacy snapshots are unchanged.

## Phase 53 persisted mastery consistency

Current schema v7 snapshots now treat the mastery evidence ledger as authoritative rather than accepting a stored label at face value. Every persisted mastery label must have a matching evidence record, the label must equal the state derived from that evidence, and current mastery/evidence key sets must match exactly.

The strict parser also rejects internally impossible current evidence: mastery signals cannot exist with zero exposures, and delayed-review evidence is valid only after recognition, recall, and context have all been demonstrated. Valid v1-v6 snapshots remain migration-compatible because historical mastery labels can still reconstruct their missing evidence during migration. XP, review scheduling, lesson behavior, and guest schema version are unchanged.

## Phase 54 runtime state write integrity

Guest-state integrity is now enforced before a UI transform can enter active React state, not only when that state is later loaded from storage. `GuestProgressProvider.updateState()` routes through a pure validation boundary that gives the updater a canonical clone, then requires the candidate snapshot to pass the strict current-schema parser and authored-reference integrity checks.

An invalid transform is a no-op and the previous state object remains untouched, including when a buggy updater mutates the draft in place. Because the freshest-state ref is updated only after validation, rejected candidates cannot leak into normal autosave or last-chance exit flush. Guest schema v7, XP, mastery thresholds, review scheduling, and learning behavior are unchanged.

## Phase 55 lesson progress anchor integrity

Lesson progress now has semantic completion guarantees in addition to reference validity. A persisted or runtime lesson record cannot claim `completed` while pointing at an ordinary question, reading, listening, connection, or Think step; completion must be anchored to that lesson's authored final `result` step. Numeric progress indexes must also remain inside the current authored lesson range even when a stable step id is present.

The rule lives in the shared learning-state reference validator, so normal local-storage loading, backup import, and the Phase 54 runtime write boundary all enforce the same behavior. Stable step ids remain authoritative for legacy resume, so valid v1-v6 migrations are preserved even when older numeric indexes no longer equal positions after later Reading/Listening insertions.

## Phase 56 canonical lesson resume anchors

Lesson resume data is now internally canonical rather than carrying two potentially conflicting positions. Current schema v7 progress requires a stable `currentStepId`, and `currentStepIndex` must point to that exact authored step. A current snapshot that says index 1 but names a later Think step is therefore rejected instead of relying on one field while silently ignoring the other.

Legacy v1-v6 progress remains compatible with later curriculum insertions. Migration first recovers/preserves the historical stable step id, then resolves that id against the current authored lesson and updates the numeric index to its modern position. This lets older progress survive the Reading and Listening steps added after the original lesson sequence while giving current snapshots a strict one-to-one resume anchor.

## Phase 57 answer-attempt semantic integrity

Persisted answer attempts now have stronger internal meaning rather than being accepted solely because their fields have the right primitive types. A correct attempt must also show that its one-time step XP was awarded, matching the actual `recordAnswer()` behavior; the inverse impossible state is rejected as corruption instead of being normalized.

Attempts must also belong to an authored interactive/scored lesson step. Passive `discover` and `result` screens cannot carry answer-attempt records, while real interactions such as choice, reading, listening, connection, ordering, matching, fill-blank, fact/myth, and Think remain valid. EcoPulse deliberately does not reconstruct exact historical lesson XP from modern content because legacy snapshots may predate later content-version changes.

## Phase 58 World Challenge prerequisite integrity

World Challenge unlock rules are now authoritative domain rules rather than UI-only presentation. `completeWorldChallengeInGuestState()` resolves the authored checkpoint and verifies that every lesson in its world is completed before it can award +50 XP or record the challenge slug. Calling the helper early or with an unknown challenge is a no-op, while repeated valid completion remains idempotent.

Persisted/imported/runtime state receives the same prerequisite check through the shared semantic validator. A snapshot can no longer claim a completed checkpoint while its world lessons are unfinished and thereby cause Next Best Action to skip a required learning checkpoint. UI lock states remain unchanged and now mirror the underlying domain truth.

## Phase 59 review/mastery lifecycle integrity

Review and mastery can no longer appear before the learner has completed a lesson that actually teaches the word. EcoPulse derives each review item's origin from authored lesson `targetWords` and applies that prerequisite through the same semantic validator used by local storage, backup restore, and runtime updates. An unrelated completed lesson does not unlock another word's review/mastery state, while older completed lessons are not forced to regenerate missing records.

## Phase 60 review/mastery pair integrity

EcoPulse now treats a word's review schedule and mastery ledger as one lifecycle unit. `reviewRecords`, `masteryStates`, and `masteryEvidence` must contain the same review-item keys, preventing a saved/runtime state from showing a due review with no mastery evidence or a mastery badge with no review schedule. Empty historical sets remain valid; no backfill is forced onto older completed lessons.

## Phase 61 review progression integrity

EcoPulse now rejects review/mastery pairs whose review stage could not have been produced by the staged review lifecycle. Stage 1 requires recall evidence, stage 2 also requires context, stage 3 also requires recognition, and delayed-review mastery cannot appear before the first stage-4 delayed-review gate. Maintenance history remains valid when a later mistake clears only the delayed-review gate.

## Phase 62 mission reflection lifecycle integrity

Mission reflections now remain strictly subordinate to mission completion. A reflection can exist only for an authored mission that is already present in `completedMissionIds`; completed missions may still have no reflection because reflection remains optional. The same rule protects storage, backup restore and runtime state updates.

## Phase 63 derived lesson-state lifecycle integrity

Connected concepts and completed Think scenarios now require a completed authored lesson that can actually produce them. EcoPulse derives these origin relationships directly from connection and Think steps, so known graph/scenario IDs cannot appear early merely because they exist somewhere in the curriculum. Sparse older completed lessons remain valid; no backfill is forced.

## Phase 64 answer-attempt ordering integrity

Persisted/runtime lesson attempts can no longer appear on authored steps the learner has not reached. Every attempt must belong to an interactive step at or before the canonical current lesson step; attempts on the current step remain valid before Continue, and past attempts remain valid after advancing.

## Phase 65 progress-sync semantic integrity

Merging two individually valid learner snapshots can no longer create a review/mastery state that EcoPulse itself would quarantine. Conservative review timing remains authoritative: the merged stage and due date stay at the earlier/weaker position, while an impossible delayed-review gate is cleared when that merged stage is below 4. Recognition, recall and context evidence are preserved, and mastery is derived only after reconciliation.

## Phase 66 strict current-snapshot canonicality

Current schema v7 no longer silently repairs impossible persisted values. Invalid learning settings are quarantined instead of defaulted, mission reflections must already be trimmed/non-empty/≤280 characters, and duplicate set-like ids are rejected instead of deduplicated. Legacy v1-v6 migration keeps its tolerant normalization behavior so older valid progress can still be recovered.

## Phase 67 onboarding current-state canonicality

Current schema v7 onboarding interests must now already be canonical persisted data. Duplicate approved interests or unknown ids are rejected instead of being silently normalized during load/import/runtime validation, while the authored order of valid unique interests is preserved.

Legacy v1-v6 snapshots retain tolerant onboarding migration: duplicate and unknown historical interest values are normalized to the approved unique set. `normalizeInterests()` remains the UI helper, and onboarding completion/level behavior is intentionally unchanged.

## Phase 68 release/build contract

EcoPulse now declares the Next.js 16 runtime floor explicitly with `engines.node: >=20.9.0` and separates sandbox-safe verification from the real production gate. `npm run check:core` runs the dependency-independent test/core-TypeScript checks; `npm run check` requires the full framework-aware TypeScript check; and `npm run verify:release` additionally requires a successful `next build`.

Runtime Next/React dependencies remain exact pins and the Tailwind 4 PostCSS/global-import wiring is covered by a machine-checkable build-contract test. In this sandbox the real release command reaches full TypeScript and then fails because React/Next packages and their JSX types are not installed; npm registry DNS remains unavailable. That failure is recorded as an environment/dependency gate, not reported as a successful production build.

## Phase 70 Climate flagship learning experience

The first Home topic now opens a dedicated Climate Change showcase at `/learn/climate-change`. It turns the supplied material into five readable climate-system chapters, a five-question keyboard-accessible Reading Check, an EN→ҚАЗ ten-word vocabulary deck with pronunciation, and a ten-item recognition sprint. Official dated NASA/NOAA evidence is surfaced beside headline data rather than presented as timeless unsupported numbers.

This showcase is intentionally practice-only: it does not silently award canonical XP or mastery. Learners continue into the existing Atmosphere lesson for the evidence-backed mastery/review path. Learn, Eco Game and My Progress also receive a second sunlit presentation pass, while a native CSS scroll progress signal and all new ambient motion respect reduced-motion preferences.

Phase 70 handoff verification: **372/372 tests passing**, core TypeScript passing, changed-TSX syntax sanity with zero parse errors, and balanced CSS structure. The dependency-backed `next build` cannot run in this sandbox because `node_modules` is absent (`next: not found`), so production build verification remains an external step.


## Editorial responsive design system

The current frontend includes a Steep-inspired editorial product layer sourced from `design-reference/steep/`. Runtime mappings live in `src/app/reference-tokens.css`; final cross-product styling is in `src/app/steep-editorial.css`; progressive route/interaction motion is in `src/app/steep-motion.css`. The reference's proprietary font roles are intentionally mapped to the project's existing bilingual-safe fonts rather than pretending the proprietary font files are bundled.

Mobile has explicit 430 / 390 / 360px treatment and uses a menu sheet rather than squeezing the desktop navigation into a bottom or multi-row dock.
