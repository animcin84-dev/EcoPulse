# EcoPulse Supabase Account Sync Contract

This document defines the database/auth boundary for the existing guest-first learning system. It is **not an applied migration**. Do not turn it into production SQL until it can be executed and verified with a real/local Supabase project.

## Current platform guidance checked 2026-09-09

- Next.js SSR sessions should use `@supabase/ssr` with cookies/PKCE rather than moving the existing learning state into browser auth storage.
- Browser code receives only the project URL and publishable key. Never expose a service-role/secret key.
- Every table exposed through the Data API must combine explicit grants with RLS.
- UPDATE requires an applicable SELECT policy and ownership checks in both `USING` and `WITH CHECK`.
- Authorization must use `auth.uid()` ownership, not editable user metadata.

## MVP storage model

For the first authenticated version, persist the existing versioned learning snapshot as one owner-scoped JSONB row. This keeps the local and remote representations identical and lets the tested `mergeProgressSnapshots()` function remain the single merge policy.

Proposed shape:

```sql
create table public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  schema_version integer not null,
  snapshot jsonb not null,
  updated_at timestamptz not null default now()
);
```

Before Data API use, the migration must:

1. enable RLS on `public.user_progress`;
2. revoke inherited/default table privileges from `anon` and `authenticated`;
3. grant only `select, insert, update` to `authenticated`;
4. add separate SELECT, INSERT and UPDATE policies scoped to `(select auth.uid()) = user_id`;
5. use both `USING` and `WITH CHECK` on UPDATE;
6. keep `anon` with no access to this table.

No `SECURITY DEFINER` function is needed for this flow.

## Auth flow

1. Guest uses EcoPulse entirely from local versioned state.
2. `Save your Pulse` initiates email magic-link/OTP auth.
3. After authenticated session is available, account repository loads the user's `user_progress` row.
4. If no remote row exists, upload local state unchanged.
5. If a remote row exists, call `mergeProgressSnapshots(local, remote)`.
6. Save merged state remotely and replace local state with that exact merged snapshot.
7. Continue normal local-first UI; account sync is persistence, not a learning gate.

## Merge policy already implemented/tested

- total XP: `max(local, remote)`, never sum;
- lesson progress: completion wins; step/lesson XP use maxima; attempt evidence is combined;
- mastery: stronger state wins;
- review conflicts: earlier due date, lower stage and higher mistake count are kept conservatively;
- completed lessons/scenarios/missions/challenges/concepts: union;
- mission reflections: remote wins conflicts, local fills remote gaps;
- onboarding/settings: completed remote account settings win conflicts, otherwise completed local settings fill the account.

## Verification gate before enabling Supabase in production

Do not claim the database integration complete until all of these are run against a real/local Supabase environment:

- create migration with the installed Supabase CLI (`supabase migration new ...`), not a guessed filename;
- apply/iterate schema locally or through the connected project tooling;
- test anon cannot SELECT/INSERT/UPDATE another or any user row;
- test authenticated user can SELECT/INSERT/UPDATE only their own row;
- test authenticated user cannot change `user_id` during UPDATE;
- run `supabase test db` with allow/deny SQL tests;
- run database advisors and fix security findings;
- verify session/auth flow in a real Next.js build;
- verify guest → account merge and returning-account merge end-to-end.

## Why JSONB first

The MVP has one learner-owned state object and no teacher analytics/query requirements yet. JSONB avoids prematurely normalizing every review/mastery entity into separate tables. If classroom/reporting requirements arrive later, normalized derived tables can be added without changing the current guest data model.
