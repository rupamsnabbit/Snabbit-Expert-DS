# Scope — Advance attendance: tomorrow and the day after, every shift

The contract for this project. Filled at intake, kept current as the work runs. Read it before touching anything in this folder.

| | |
| --- | --- |
| Slug | `advance-attendance` |
| PRD | `prd.md` — captured in conversation 2026-10-01 (two passes) from Rupam Banik (design lead), relaying a product ask; **not yet confirmed** |
| Stakeholder | Rupam Banik (design lead) for design; the attendance product owner for business rules (penalty amount, lock rule) — to be named |
| Status | **Pattern drafted** — `BUILD.md` written, Chip `answer` landed in core, four screens drawn in Paper *Advance attendance* (2026-10-01). Next: design lead's read → graduate `FLOW.md` to `patterns/attendance.md` |

## Boundary

This project reads **its own folder** and **the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`, `references/SCREENS.md`). It does not read any other project's folder. Every decision traces to this PRD, the principles, or the tokens — nothing else.

## Answers with

The outputs that graduate to the shared system. Fill in as they land.

| Output | Path | Status |
| --- | --- | --- |
| Pattern | `patterns/attendance.md` — the pre-shift promise: evening ask, Home record, change and lock. Replaces the *Present / Can't come* card in `patterns/onboarding.md` § 8 (that section will point here) | drafted in `FLOW.md`, not yet graduated |
| Brief | `briefs/advance-attendance-<thing>.md` — only if the tier pass finds a Tier 3 | — |
| Screens | Paper file *Advance attendance* (`01M3V5ZE11T221X5NHPMMRQ9RT`) — 1a first evening · 1b daily · 2 Home (one row) · 2b My shifts page · 3 change sheet; exports to `references/advance-attendance-screens/` | drawn 2026-10-01, Home redrawn the same day |

## Asks of core

Everything this PRD needs that the system does not have yet. Nothing here is solved privately inside this folder — each row is a change to the shared system, made per `principles/EXTENDING.md` → *Changing core*, and available to every other project once landed.

| Ask | Kind | Why this PRD needs it | Where it lands | Status |
| --- | --- | --- | --- | --- |
| **Shift pill** — a Chip whose two states are both *answers* (*Coming* `check` · *Can't come* `moon`), not selected / unselected; label is a time range | component change (Chip kind `answer`) | the daily ask and the Home record are rows of these; a hand-styled pill would be Tier 0 | `components/chip.md` § Kinds + live page | **landed 2026-10-01** |
| `moon` meaning extended to *a shift she will not work* (today: weekly off, leave day) | icon register | the *Can't come* state needs one icon with one meaning; rest is the meaning | `foundations/icons.md` | **landed 2026-10-01** |
| BottomSheet `confirm` **safe confirm** holding a composition (day block + pills) and a Button whose label changes with the pills | spec line | today's safe confirm shows body text; here the body is the grid | `components/bottom-sheet.md` § Behaviour | **landed 2026-10-01** |
| Nudge `loss` with the **change penalty** asset + count on the after-midnight confirm | content only, once product names the penalty | the cost is shown before the hold (P3, P5) | `components/nudge.md` (no change expected) | waiting on product |

## Sits beside

Flows already in `patterns/` that this one touches, follows or is a variant of. Named at intake, because a new PRD is usually a variant of a flow that already exists — and a second file duplicating four of five screens is how the system rots.

| Existing pattern | Relationship |
| --- | --- |
| `patterns/onboarding.md` § 8 — Home pre-shift card: *Tue 7 Feb · 7:00 am – 12:00 pm*, **Present** `primary brand M`, *Can't come* never beside it | **variant of.** Today's flow asks for one day and one shift; this ask is the same question for two days × several shifts. The shipped go-live Home (`references/beauty-expert-master-go-live/` frame 18) already says *Mark attendance for tomorrow 6:30 AM · Present / Absent* |
| `components/date-picker.md` `strip` — shipped *Mark attendance for next 4 days* (Shift Lifecycle file) | **the shipped multi-day form.** A day strip already exists for exactly this; the gap is *several shifts per day* |
| `components/bottom-sheet.md` `confirm` — *Change attendance* is a listed use; side-by-side *Absent / Present* is the one allowed two-button row | **reused** for changing an answer |
| `patterns/check-in-out.md` | **runs after.** Attendance is the promise; check-in is keeping it |
| `patterns/earnings.md` — day view *Shift card* with Tags *Present / Absent* + reason | **runs after.** How the answer is shown back on the day |
| `patterns/offline.md` — *Marks Present → queued with the tap time; card flips to Present · sending when online* | **inherits** the queue rule for every answer here |
| `patterns/new-job-alert.md` | **unrelated** — a favourite booking is scheduled, not offered live; but the *Decline is protected, Accept is one tap* rule carries (P3) |
| *Apply leave* (DatePicker `month` range) | **sits beside**, out of scope — long absences stay there |

## Open questions

For the stakeholder, not for the designer to guess. One line each, dated, with the answer when it arrives.

| Question | Asked | Answer |
| --- | --- | --- |
| **What is a shift here?** Her standing shift blocks (e.g. *7:00 am – 12:00 pm* and *4:00 – 8:00 pm*), or per-booking slots from favourite customers? How many per day, and are they the same every day? | 2026-10-01 | A time block she works — *8:00 am – 12:00 pm*, *4:00 – 8:00 pm*; a day can have several. Answered per shift. (2026-10-01) |
| **Who gets asked?** Every expert, every day — or only an expert who has a scheduled (favourite) booking in the next two days? | 2026-10-01 | Everyone, daily. For tomorrow and the day after; each day's shifts separately. (2026-10-01) |
| **Does she see the bookings behind a shift?** *Radhika · Fri 9:00 am* makes the promise concrete (P1); or is the shift block all she is asked about? | 2026-10-01 | No. Scheduling is not being done on the expert side; jobs arrive in real time. Favourites reason withdrawn. (2026-10-01) |
| **When is it asked, and when does it close?** A fixed moment (after her last shift today; a push at a set time) or whenever she opens the app? Is there a cut-off after which Friday locks? | 2026-10-01 | After she logs out. Changes allowed until about midnight — **which midnight is the open lock rule below**. (2026-10-01) |
| **What is the default if she does not answer?** Treated as coming, treated as not coming, or asked again? | 2026-10-01 | Present. (2026-10-01) |
| **What does *Can't come* cost?** A red card, lower priority for favourites, losing that customer — or nothing, because an early no is the point? This decides whether *Can't come* is protected by a hold (P3). | 2026-10-01 | Nothing when told early at the ask. **Changing a decision she took is penalised, both directions.** Amount / kind still open. (2026-10-01) |
| **What does *Present* then a no-show cost?** The existing no-show penalty, or more because a customer was promised? | 2026-10-01 | Unchanged — the existing no-show penalty. (2026-10-01) |
| **Is there a reward for answering?** A coin for answering early (a Nudge `gain`), or none? | 2026-10-01 | No. (2026-10-01) |
| **Can she change an answer, and until when?** Today the *Change attendance* confirm sheet exists; does it apply here, with a cut-off? | 2026-10-01 | Yes, until about midnight. (2026-10-01) |
| **Does this replace the one-day Present on Home?** If both exist she is asked about Friday twice (Thursday in advance, Friday morning again). Proposal: one flow, where the Home card shows the next unanswered shift and the two-day view is one tap away | 2026-10-01 | **Yes — replace.** One flow: the evening sheet answers, the Home card shows and changes. Decided 2026-10-01 with `EXPLORATION.md`. |
| **Rolling window?** On Friday is she asked for Saturday and Sunday? Can she still change today's or tomorrow's answer from the same place? | 2026-10-01 | Yes. On Friday she answers Saturday and Sunday; **Friday itself is never askable on Friday.** (2026-10-01) |
| **Weekly off and leave.** A day that is her weekly off (`moon`) or an approved leave — shown and skipped, or not shown? | 2026-10-01 | **Shown, not askable** — `moon` + *Weekly off* / *On leave*, no pills; no sheet on an evening whose only new day is off. Decided 2026-10-01. |

| **Lock rule.** Default is Present and a change is penalised. When does an answer become "a decision she took"? **A** (recommended): every shift locks at **midnight before its day**; before that, answering and changing are free; after, any change is penalised. **B**: the first explicit tap locks it; a default never does — then an expert who never answers can never be penalised for changing, and the one who answers can, so answering is punished. A chooses one sentence she can hold: *Change by midnight, free. After, it costs.* | 2026-10-01 | **A.** Decided 2026-10-01 with the recommendation. |
| **What is the change penalty?** Red card · ₹ · coins · which amount? Needed for the `confirm` sheet's consequence strip and the Nudge `loss`. | 2026-10-01 | **Open — product.** Drawn as a red-card asset with the count as a placeholder until answered. |
| **A day she did not work.** No logout, so no post-logout ask. Push at a set time (the usual logout hour), or the Home card alone? | 2026-10-01 | A notification at her usual logout hour opens the same sheet (decided with the recommendation); the hour's rule is product's. |
| **Day after tomorrow, asked twice.** Saturday is asked on Thursday (as day +2) and again on Friday (as day +1). Proposal: on Friday it shows her Thursday answer as *answered*, not a blank question — she is only ever asked something new once. Under lock rule A changing it on Friday is still free. | 2026-10-01 | Accepted — the sheet shows the answered day as one small *answered* row under the new day. |

## Recommendations on the open calls (design, 2026-10-01)

**Where it lives (Q10) — replace, one flow.** The shipped Home card asks *Mark attendance for tomorrow · Present / Absent* and `patterns/onboarding.md` § 8 restyles it as *Present* + *Can't come*. Keeping that and adding a two-day ask means Friday is asked on Thursday evening and again on Friday morning — the opposite of simple. Proposal: **the ask happens once, after logout, as the last step of her day; the Home card stops asking and starts showing** — tomorrow's shifts with their answer and one quiet way to change. The morning *Login* (start of day, the 6:40 Nudge) is untouched; it is a different act.

**The shape of the ask — exception first.** Default is Present, so the honest screen shows every shift already Present and asks one thing: *any you can't come to?* Two days × two shifts = four rows, no scroll on 360 × 800. The one action is **I'll come to all** — one tap and her day is done. A shift she can't make is one tap on its row (free, at the ask). This turns four yes/no decisions into one tap in the common case (P2) and never hides the default from her (P5).

**Weekly off and approved leave (Q12) — shown, not askable.** The day keeps its place in the two-day view with the `moon` icon and *Weekly off* / *On leave*, no shift rows, nothing to answer. Hiding it makes the view sometimes one day and sometimes two, which is a thing to work out; showing it costs one row she reads at a glance. If both days are off, there is no ask that evening at all.

**Changing after the ask — protected, with the cost shown first.** Under lock rule A, a change before midnight is a plain tap on the row. After midnight the row opens the existing BottomSheet `confirm` *Change attendance* with the consequence strip (the penalty) and a hold — P3's second gesture for a costly act, and the penalty is never a surprise (P5).

## Log

One line per working session: what was decided and what it changed. This is the audit trail from "someone asked for this" to "this is why the component works that way".

| Date | What happened |
| --- | --- |
| 2026-10-01 | Project opened mid-sitting (`hood-shift-change` parked). Ask captured in conversation into `prd.md` § B; not yet confirmed. System read: PRINCIPLES, EXTENDING, shipped-app read, `check-in-out`, `earnings`, `onboarding` § 8, `offline`, `first-run`, DatePicker, WeekStrip, SelectionCard, Selection controls, Chip, BottomSheet, Nudge, content. Found the ask is a **variant of the shipped one-day Present** (Home pre-shift card) and that a shipped *Mark attendance for next 4 days* day strip exists in the Shift Lifecycle Figma file (not yet screenshotted — Figma connector needs authorising). Twelve open questions put to the design lead; answered the same day. **Favourites / scheduling reason withdrawn** → project renamed from `favourites-advance-attendance` to `advance-attendance`; `prd.md` rewritten with the answers (still unconfirmed). Open: where it lives (recommend replace, one flow), weekly off (recommend shown, not askable), the lock rule (recommend midnight before the day), the penalty amount, the no-logout day. Next: the three calls → confirm `prd.md` → tier pass. |
| 2026-10-01 | Design lead: *don't adhere to the current paradigm, explore more.* Mobbin read by flow — DoorDash Dasher, Turo, Uber Eats / Zomato / Instacart, Octopus Energy, Fiverr / Asana, Visible → `reads/` (six folders, steps 1–4). Six directions written in `EXPLORATION.md` (A on-Home record · B one tap at logout · C spoken · D my-week · E day-per-screen · F switches) with a side-by-side and a recommendation: E for the ask, A for the record, C for the words; lock rule A. Key finding: after the first evening the daily ask is **one new day**, so the two-day grid is the first-day case only. Next: the lead picks → confirm `prd.md` → `TIERS.md`. |
| 2026-10-01 | Design lead picked the recommendation (*"go with your recommendation, just give me a flow"*). `prd.md` § B marked confirmed. Open questions closed except the penalty amount (product). `TIERS.md` filled — all Tier 2 compositions on core parts; one ask of core: the **shift pill** (Chip kind `answer` or SelectionCard `compact`), plus the `moon` register line and a safe-confirm note. Flow drafted in `FLOW.md` (the draft of `patterns/attendance.md`). Next: the lead reads the flow → `BUILD.md` → Paper. |
| 2026-10-01 | **Core change landed:** Chip kind `answer` (`components/chip.md`, live page, `CHANGELOG` § Components), `moon` register line, BottomSheet safe-confirm note; `build_all.sh` + lint clean (0 errors). `BUILD.md` written — every region a system part, no Mobbin *Built from*. New Paper file *Advance attendance* created with the 146-token set (the *Snabbit* set + the four button tokens) and four artboards on 360 × 800: 1a evening sheet (first evening, two days) · 1b evening sheet (daily: new day + answered row) · 2 Home shifts record · 3 change sheet after midnight. Reviewed by screenshot; day headers corrected to *Tomorrow · 2 Oct* / *Saturday · 3 Oct* (weekday said once). Open: penalty amount (product); Kannada check of the 12-character pill label; Figma connector still unauthorised, so no Figma component yet for Chip `answer`. |
| 2026-10-01 | Design lead's review of the screens: *why on Home? not explicit, and it eats real estate — a whole page for attendance?* Agreed: Home redrawn to the shipped shift card plus **one navigational row** (*Tomorrow · Can't come · 4 – 8 pm ›*); new artboard **2b · My shifts** (Profile → Shifts, from the Home row): Today read-only with Present Tag / login window, tomorrow and Saturday pills, weekly off row, the one rule as the single instruction line. Sheets' dimmed backgrounds updated to the new Home. `FLOW.md`, `BUILD.md`, `TIERS.md` (#7 revised, #15 added), `EXPLORATION.md` (revision note) updated. Trade-off accepted: a free change is two taps. |
