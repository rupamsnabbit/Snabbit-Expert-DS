# Scope — Fallback screens in onboarding

The contract for this project. Filled at intake, kept current as the work runs. Read it before touching anything in this folder.

| | |
| --- | --- |
| Slug | `fallback-screens` |
| PRD | `prd.md` — captured 2026-11-12 from Rupam Banik (design lead), in conversation |
| Stakeholder | Rupam Banik |
| Status | **Intake** — step 1 agreed (`CASES.md`, 60 cases); step 2, the template, in progress |
| `ACTIVE` | Left on `contactless-gl` by the lead's choice (2026-11-12): another chat owns it. This chat works only in this folder |

## Boundary

This project reads **its own folder** and **the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`, `references/SCREENS.md`). It does not read any other project's folder. Every decision traces to this PRD, the principles, or the tokens — nothing else.

## Answers with

| Output | Path | Status |
| --- | --- | --- |
| Where each onboarding failure goes, the template, the copy | a section in `patterns/error-recovery.md` (+ edits to `offline.md`, `permissions.md`, `onboarding.md` § Edges) | — |
| Template parts that core lacks | `components/empty-state.md` and/or `feedback.md` | — |
| Pictures | `foundations/assets.md` (pictograms / Saathi scenes) | — |

## Asks of core

| Ask | Kind | Why this PRD needs it | Where it lands | Status |
| --- | --- | --- | --- | --- |
| | | (filled at step 2) | | |

## Sits beside

| Existing pattern | Relationship |
| --- | --- |
| `patterns/error-recovery.md` | **variant of** — this project fills its onboarding cases and replaces its copy with no-jargon copy |
| `patterns/offline.md` | variant of — the onboarding side of offline; its copy (*network*, *You're offline ·*) is rewritten at step 3 |
| `patterns/permissions.md` | runs inside — the location case in onboarding |
| `patterns/onboarding.md` | runs inside — its § Edges table is where the result is cited |

## Open questions

| Question | Asked | Answer |
| --- | --- | --- |
| Which live cases exist: fake-location app, other phone, code locked, account on hold, under review? | 2026-11-12 | On hold and under review: yes. The others: not selected. Also *Something else* — detail not given |
| Edge groups: go-live photo, bank and PAN, missed training day (TC) — in or out? | 2026-11-12 | Photo and bank/PAN in; missed training day out (2026-11-12) |
| Does an Aadhaar already used by another account show anything today? | 2026-11-12 | — (tech) |
| Existing copy in `offline.md` / `error-recovery.md` uses *network*, *we*, contractions, *·* — replace in place at step 3? | 2026-11-12 | — |

## Log

| Date | What happened |
| --- | --- |
| 2026-11-12 | Intake. Read the system's failure sources and the shipped failure frames (Job Lifecycle ERRORS `991:58068`; a survey of BEM, Self-Serve ER/AR and the DS toasts and banners; renders in `reads/figma-shipped-failures-2026-11-12/`). Drafted an app-wide list of 98 cases (`CASES-app-wide.md`). The lead created this folder, left `ACTIVE` alone and narrowed the scope to onboarding (TC-less). Re-cut to 44 cases + 3 edge groups in `CASES.md`. **Next:** the lead agrees `CASES.md` and confirms `prd.md` → step 2, the template. |
| 2026-11-12 | The lead agreed the case list and added go-live photo and bank/PAN (groups 7–8), for 60 cases. Missed training day is out. **Next:** step 2, the template. |
| 2026-11-12 | Step 2 drafted: `TEMPLATE.md`. One composition (picture + one line + Saathi voice + one Button), three placements (Screen = EmptyState new size `step`; Strip = Banner; In place = field, OTP or photo states), and six owners giving six actions. Asks of core listed there, waiting for agreement. |
| 2026-11-12 | The lead chose the picture: **the cause as an object with a ✗ dot** (not Saathi acting the fix). Asked to *draw it first* before agreeing the template: `BUILD.md` written; a new Paper file *Fallback screens* is being built from the shipped TC-less frames, three lanes (Screen · Strip · In place). |
| 2026-11-12 | Template drawn in Paper *Fallback screens* (`01M77KHBN4WTXYESWQ5208ZWQE`), page *Template · 3 examples*: S1→F1→F1b (Screen, data off, finger guide), S2→F2 (Strip, slow internet), S3→F3 (In place, *Incorrect OTP*), imported from the ER/AR frames (`FROM-ERAR.md`). Font check passed (only the status-bar clocks are system-ui); no raw colours. To flag: `phone-✗` is not in the DS file, so the placeholder disc is described; `cell-signal-low` reads weakly at 24 dp; `toggle-right` and `hand-pointing` are not registered yet; Figma palette drift (pink-200 disabled, gray-200/600, red-600 OTP border). Waiting for the lead to agree the template. |
