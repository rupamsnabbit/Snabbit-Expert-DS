# Tiers — Payouts revamp

Every surface this ask (`prd.md` § B, confirmed 2026-10-23) asks for, placed in a tier before anything is drawn
(`principles/EXTENDING.md` → *Three tiers*). The constraint is **build on the existing screens**: every surface is
first a state of a screen that ships (`reads/figma-live-earnings/`, `reads/early-payout-live/`), and only then
anything else.

## Surfaces

### Workstream 1 — Monthly payout

All of these live on **one existing row**: the *Monthly Payout* row in the month statement's *Payout schedule*
panel (Statement `schedule`). Today that row already carries four states by **date-tile tint + a status line under
the name** (navy scheduled · green *Paid on … | UTR* · orange *Payment is under processing…* · red *Add UPI / bank
account to enable payout ›*). Each new step is one more state of that row; anything she must read or do opens one
tap down in a BottomSheet, because `statement.md` forbids a Button inside the card.

| # | Surface (the ask's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| M1 | **Payout approaching** — 1–2 days before the trigger date | core change | Statement `schedule` row, new state: navy tile with the trigger date, status line *Coming on 2 Nov* | needs core change — the row's status line and tile tint ship but are not in `statement.md` (see Gaps) |
| M1a | approaching + **bank not added** | 2 | same row in its shipped red state, status line rewritten to say it will not be sent (*Add a bank account — your payout waits until you do ›*); opens *Get paid* (`payout.md` § 3) | exists (shipped red state) · copy change |
| M1b | approaching + **PAN not added** | 2 | same row (approaching) + the shipped *Add your PAN Card* card below the statement, re-worded to the 20 % → 1 % saving; tapping opens the shipped tax sheet (*No PAN 20 % −₹5,000 · Aadhaar-linked PAN 1 % −₹250 · Total savings ₹4,750*) | exists (shipped card + sheet) · copy change |
| M2 | **Sent** — in her bank by a named date | core change | row state: tile tint for *on its way*, status line *Sent · in your bank by 3 Nov* | needs the same core change as M1 |
| M3 | **Paid** — with the reference number | 1 | row in its shipped green state (*Paid on 3 Nov \| UTR …*); `copy` on the UTR per `payout.md` § 2 | exists |
| M4 | **Failed, retrying** — why, and the time we send it again | 2 | row state (error tint, status line *Didn't reach your bank · trying again in [X] hours ›*) → **BottomSheet `info`**: reason pictogram · one line of reason · the retry time · *Got it* | exists (BottomSheet `info`) · row state is the M1 core change |
| M5 | **Failed after two retries — withdraw it yourself** | 2 | row state (error, status line *Couldn't send · send it yourself ›*) → **BottomSheet `info`** with the reason and one `primary brand` Button *Send to my bank* → row returns to *Sent* (M2) | exists · row state is the M1 core change |
| M6 | **Account details wrong** — retrying cannot fix it | 2 | row state (error, status line *Bank details are wrong · fix them ›*) → BottomSheet `info` with the reason and *Fix bank details* → the shipped *UPI / Bank Details* flow (`payout.md` § 3); the shipped *Update* Tag on the *UPI / Bank Details* row stays | exists · row state is the M1 core change |
| M7 | **Bank not added** — explicit, through every trigger date | 2 | the shipped red row, status line re-worded (as M1a) + the shipped *Add UPI ID / Bank Account* card | exists · copy change |
| M8 | **Bank just added** — in the next batch, sent on a date | 2 | **Toast** (*Bank account added · your payout goes on 3 Nov*) after the add flow + the row in the approaching state with the next batch's date | exists (Toast, `feedback.md`) |
| M9 | **PAN missing**, across every step, large and plain | 2 | the shipped *Income Tax (20 %)* breakdown row (*Upload PAN Card to reduce tax*) + the shipped *Add your PAN Card* card + the shipped tax sheet — one message in three shipped places; no new surface | exists · copy change |
| M10 | **Failure reason** on every failure — three placeholders | content | the BottomSheet's one reason line + a pictogram per reason (bank's side · our side · account details) | needs icon / pictogram check (see Gaps) |
| M11 | **Only the current step**, never the timeline | rule | one row, one state at a time; the earlier attempts are not listed | — |

### Workstream 2 — Early payout

All on the **five shipped Early Payout screens** (`reads/early-payout-live/`).

| # | Surface | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| E1 | **Sent** — the money is on its way, in [X] hours | 1 / shipped | shipped screen 4 (check disc, Amount, *will be credited in your bank account within 12 hours*); hours become a placeholder value | exists · copy change |
| E2 | **Paid** | 2 | shipped screen 5, *Recent withdrawals* row: ListItem · date-time · **Tag `success` *Paid*** · Amount | exists (the shipped *● Successful* pill → Tag `success` with `check-circle`) |
| E3 | **On its way** (between sent and paid) | 2 | same row, Tag `warning` *On its way* with `clock` | exists |
| E4 | **Failed — why, and send it again** | 2 | same row, Tag `error` *Failed* with `x-circle`, the row opens **BottomSheet `info`**: reason + `primary brand` *Send again*; and, while a failed withdrawal is unresolved, a **Banner** `error` on the home card (*₹5,000 didn't reach your bank · Send again ›*) — the whiteboard's *nudge to re-trigger* | exists (Tag, ListItem, BottomSheet, Banner) |
| E5 | **Bank not added** | 2 | home screen: the *Withdraw* Button is replaced by *Add bank account* (one next action, P2) and a Banner `warning` says why; the amount screen is not reachable | exists (Banner, Button) |
| E6 | **No PAN message**, **no approaching step**, **no automatic retry** | rule | — | — |

## Gaps

Copied into `SCOPE.md` → *Asks of core*. Closed in the shared system before any screen is drawn.

| Gap | Kind | Blocks |
| --- | --- | --- |
| **Statement `schedule` row status** — the date-tile tint and the status line under the name ship in the app (navy · green · orange · red) but `statement.md` draws every tile `bgInverse` with no status line. Spec catches up with the app: a `status` on the schedule row = tile tone + one status line (+ icon, P1) + the row opening a sheet when there is something to read or do | component change (`components/statement.md`) | M1, M2, M4–M7 |
| **Payout states** — `payout.md` § 2 has scheduled · processing · paid · blocked · failed · on hold. The ask adds *approaching*, *sent* (with a date), *failed — retrying at a time*, *failed — send it yourself*, *bank details wrong*, *next batch*; and the early-payout subset (no approaching, no auto-retry, no PAN) | pattern revision (`patterns/payout.md` § 2, § 4) | every surface |
| **Reason pictograms** — one per failure reason (bank's side · our side · account details) for the BottomSheet hero | asset check (`foundations/assets.md`) — reuse `bank` / informational pictograms if registered, propose otherwise | M4–M6, E4 |
| **Icons** — confirm `arrow-clockwise` (retry) and the status-line icons (`clock`, `x-circle`, `check-circle`, `bank`) carry these meanings in `foundations/icons.md`; nothing new expected | icon check | M1–M7, E2–E5 |

## Checks

- [x] Every surface in the ask appears in the table above — none skipped as "obvious"
- [x] Every Tier 3 row has a brief, or a line saying why it is not needed yet — there is no Tier 3 row
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
