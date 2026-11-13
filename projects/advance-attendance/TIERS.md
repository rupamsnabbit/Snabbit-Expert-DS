# Tiers — Advance attendance

Every surface the confirmed ask needs, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). Direction: `EXPLORATION.md` → *Recommendation* (E for the ask, A for the record, C for the words).

## Surfaces

| # | Surface (the ask's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | *After she logs out we ask* — the evening sheet | 2 composition | BottomSheet `confirm` **safe confirm** (✕ is the safe way out; closing keeps the default) · day block (#3) · Button `primary brand L` · VoicePrompt `inline` (the sheet speaks on open) | exists; needs the spec line that a safe confirm may hold a composition and a Button whose label follows the pills |
| 2 | *Tomorrow + 1, each day's shifts separately* — the two-day first evening | 2 composition | two day blocks (#3) stacked in #1; from the second evening one block + the answered row (#4) | exists |
| 3 | A **day block** — date + the day's shifts, each answerable | 2 composition | day header inheriting DatePicker `strip` tile type (weekday `Caption` · day `Heading3`) laid flat as a row header · a row of **shift pills** (#5) | exists once #5 is settled |
| 4 | The day she already answered, shown as answered | 2 composition | ListItem `informational`: date · Tag `success` *Coming* / `neutral` *Can't come · 4 – 8* · `caret-down` to open its pills | exists |
| 5 | **Shift pill** — one shift, two answers | **core change** | Chip anatomy (40 dp pill, time label, leading icon) with two answer states: *Coming* `check` `bgBrandSubtle` · *Can't come* `moon` `bgTertiary` | **needs core change** → Chip kind `answer`; fallback ruling: SelectionCard `compact` rows (64 dp, control + time + state) — the tier pass prefers the pill for the Home record's height, the row for the sheet; one component must do both, so the ask is the Chip kind |
| 6 | *Default is present* — shown, never implied | rule | every pill starts in *Coming*; nothing is blank | exists |
| 7 | Home — tomorrow's answer at a glance | 1 core | `ListItem` `navigational` with a `Tag` on the shipped shift card, replacing the *Mark attendance for tomorrow · Present / Absent* block; opens #15 | exists (revised 2026-10-01: a Card of day blocks on Home was drawn and rejected — real estate above *Login*, pills with no question) |
| 15 | **My shifts** page — see and change the next two days | 2 composition | HeaderNav `page` · Today as ListItem rows with Tags (Earnings day-view words) · day blocks (#3) · weekly off row (#9) · one instruction line | exists; lives at Profile → Shifts (`bottom-tab-bar.md` already lists shifts under Profile) and from the Home row |
| 8 | *She can change until midnight* — a free change | 2 | tap on a pill (#5) → state flips, Toast *Saved · Fri 8 – 12 can't come* | exists |
| 9 | Weekly off / approved leave | 2 | ListItem row: `moon` · *Weekly off* / *On leave* · no pills | exists |
| 10 | *If she changes a decision she took we penalise her* — the after-midnight change | 2 composition | BottomSheet `confirm` (costly): consequence strip with the penalty asset + count · safe option `ghost` *Keep it* above · `secondary danger` **hold** *Can't come* / *I'll come* below | exists; the penalty amount is product's |
| 11 | A day with no logout — the reminder | 1 | notification (`patterns/notification-centre.md` rules) at her usual logout hour → opens #1 | exists |
| 12 | Saved / sound | 1 | `sound.confirm` once on the Button; Toast | exists |
| 13 | Loading · empty · error · offline for #1 and #7 | 2 | Skeleton pills · EmptyState `section` (*No shifts set for Sunday*) · EmptyState `error` + **Try again** · Offline Banner, tap queued with Tag `neutral` *Saving…* (`patterns/offline.md` Present rule) | exists |
| 14 | First time she meets it | 1 | Coachmark `point` on the Home record once: *Tap a shift you can't do. Free to change till the night before.* (`patterns/first-run.md` row) | exists |

## Gaps

| Gap | Kind | Blocks |
| --- | --- | --- |
| Chip kind `answer` (two exclusive icon-states on one pill) — or the ruling that SelectionCard `compact` is the row | component change | #3, #5, #7 |
| `moon` register line extended to *a shift she will not work* | icon | #5, #9 |
| BottomSheet safe confirm may hold a composition and a Button whose label follows the content | spec line | #1 |
| Penalty asset + count for the consequence strip | content (product) | #10 |

## Checks

- [x] Every surface in the ask appears above — none skipped as obvious
- [x] No Tier 3 row; the one gap is a change to core, not a local component
- [x] Every gap is an ask of core (`SCOPE.md` → *Asks of core*)
- [x] `SCOPE.md` → *Sits beside* names onboarding § 8, check-in-out, earnings, offline, DatePicker `strip`, BottomSheet `confirm`
- [x] Nothing in this table came from another project's PRD
