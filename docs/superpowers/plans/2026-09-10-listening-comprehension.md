# Listening Comprehension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one adaptive, user-triggered English listening-comprehension step to each MVP lesson without autoplay, blocking learners who cannot use audio, or changing the existing mastery model.

**Architecture:** Add a typed `listening` lesson step with A2/B1/B2 English utterances, one comprehension question, optional future recorded-audio URLs, localized explanation, and authored context mastery signals. A dedicated client component plays recorded audio when supplied or device speech synthesis as a fallback; transcript reveal is always available and unlocks the same comprehension interaction without penalty. Stable `currentStepId` resume anchors from schema v7 make inserting the new step before Think safe for existing progress.

**Tech Stack:** TypeScript, React/Next App Router source, Web Speech API progressive enhancement, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-09-ecopulse-mvp-design.md`

## Global Constraints
- No autoplay; listening starts only from an explicit Play action.
- Transcript is always user-accessible and never penalized.
- Audio unavailability cannot block lesson completion.
- A2/B1/B2 vary English delivery complexity/rate, not scientific truth or correct answer.
- Correct listening comprehension may add existing `context` evidence only; it does not add a new mastery shortcut.
- Device speech is an MVP fallback, not a claim of curated/native-speaker audio quality.
- Keep EN/ҚАЗ interface chrome fully localized and keep listening material itself English.

---

### Task 1: Listening content contract
- [x] Add failing tests requiring one listening step per production lesson after Reading and before Think.
- [x] Add `ListeningStep` to the lesson union with A2/B1/B2 utterances, answer contract, optional recorded-audio URLs, explanation, mastery signals, and XP.
- [x] Extend lesson validation for empty utterances/questions, duplicate answer IDs, invalid correct-answer references, invalid URLs, and non-context mastery signals.
- [x] Author eight scientifically conservative listening steps and insert them into the eight lessons; bump lesson versions to `1.2.0`.

### Task 2: Playback policy and accessible renderer
- [x] Add failing tests for level-specific device-voice rate and explicit user-triggered playback policy.
- [x] Implement a pure listening playback plan helper.
- [x] Add failing source/UI tests for dedicated `ListeningExercise`, transcript toggle, no autoplay, keyboard `1/2/3`, and lesson-engine branch.
- [x] Build `ListeningExercise` with recorded-audio-first/device-voice fallback, replay, transcript support, two-attempt feedback, and no progress writes outside `onAttempt`.
- [x] Add EN/ҚАЗ listening chrome to `lessonUiCopy` and wire the component into `LessonExperience`.

### Task 3: Verification and checkpoint
- [x] Verify all authored step types still have explicit renderer branches.
- [x] Run full tests, core typecheck, dependency-independent full TS/TSX sanity and `git diff --check`.
- [x] Update README/status, commit Phase 32, archive committed tree, and verify ZIP integrity.
