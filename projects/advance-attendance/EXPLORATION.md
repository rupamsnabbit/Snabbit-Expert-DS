# Exploration — six ways to ask about the next two days

Written 2026-10-01, after the intake answers and the Mobbin reads in `reads/`. Nothing here is drawn; these are
directions, each placed against the expert, the principles and the system, so the design lead can pick one
before the tier pass. The current paradigm (the shipped Home card *Mark attendance for tomorrow · Present / Absent*)
is one of the six, not the frame for the others.

## The problem in one line

Every evening, for tomorrow and the day after, for every shift on each: *is she coming?* Default Present. Telling
us early is free; changing later costs. Today is never askable. And the app already asks a lot of her.

## The fact that changes the problem

On Thursday she answers Friday **and** Saturday. On Friday, Saturday is already answered — only Sunday is new.
So after the first evening, **the daily ask is one new day**, plus a glance at a day she has already answered.
"Two days × N shifts" is the first-day case, not the daily case. Every direction below is judged on the daily case.

## What ships elsewhere (the convention)

| Family | Apps | What she would already know from them |
| --- | --- | --- |
| Calendar | DoorDash Dasher, Turo | a week strip with today marked; blocks on a day |
| Day tabs + slot list | Uber Eats, Zomato, Instacart | one day at a time, slots as rows, days one tap away |
| Grid at once | Octopus Energy | days as rows, slots as pills, all visible |
| Exception-only | Fiverr, Asana | available by default; you state the exception |
| The moment | Visible | an evening ask, with a reminder for the day you did not open the app |

All five families *show the default*; none asks a yes/no per slot. The one thing no shipped app does is what the
shipped Snabbit card does — ask *Present / Absent* as two equal buttons for one day.

---

## A · Nothing to answer — the next days live on Home

```
┌ Your next days ───────────────────────────┐
│ Fri 2 Oct     [✓ 8 – 12]   [✓ 4 – 8]      │   day · shift pills, all Present
│ Sat 3 Oct     [✓ 8 – 12]   [✓ 4 – 8]      │
│ Sun 4 Oct     ☾ Weekly off                │
└───────────────────────────────────────────┘
```

No ask after logout. The Home card always shows tomorrow and the day after with every shift already Present.
A shift she cannot do is one tap on its pill → *Can't come*. Idea from Fiverr / Asana; shape from Octopus.

- **Taps on a normal day:** 0. **One leave:** 1.
- **Principles.** P2: no question, so no action competing with *Login*. P5: honest only because the default is
  *shown* on every pill. P6: no nag. P3: a tap is reversible until midnight, so no hold.
- **Breaks from today:** removes the daily *Present* question entirely.
- **Risk.** Ops gets the same signal as silence; if product wants an *explicit* yes, A cannot give one. She may
  not notice the card changed — the first-run Coachmark handles that once (`patterns/first-run.md`).
- **Tier.** 2 — Card + day header + pills. See *What the pills are* below.

## B · One tap at logout

```
╭ after Logout ──────────────────────────────╮
│ Tomorrow and Saturday                      │
│ Fri 2 Oct     [✓ 8 – 12]   [✓ 4 – 8]       │
│ Sat 3 Oct     [✓ 8 – 12]   [✓ 4 – 8]       │
│ [ ✓ I'll come to all                     ] │   Button primary L
╰────────────────────────────────────────────╯
```

The same grid, shown once as a sheet at the end of her day. One Button confirms everything; tapping a pill flips
it and the Button label changes to what she is saying (*Come to 3 of 4*). Afterwards the grid sits on Home as in A.

- **Taps on a normal day:** 1. **One leave:** 2.
- **Principles.** P2: one action, under the thumb. P4: the sheet is spoken. P5: default shown, then confirmed.
- **Breaks from today:** moves the ask from the morning-of to the evening-before; replaces the Home question with a record.
- **Risk.** On Friday the sheet asks about Saturday again — unless Saturday is drawn as *answered* (see E).
- **Tier.** 2 — BottomSheet `info` (one Button) holding the grid.

## C · The spoken ask — no words on the screen

B with the title and every instruction removed. The VoicePrompt asks in her language — *"Friday and Saturday, all
four shifts — coming?"* — and the screen is the grid and the Button. Pills carry only numbers and a check; the
day cell carries weekday and date; the Button carries the verb.

- **Taps:** as B. **Instruction lines:** 0 (P1 · *Text is the last medium*, taken literally).
- **Risk.** Phone on silent after work: the question is then only the grid, which must still read on its own —
  it does, because the pills show the default (P4: audio never carries meaning not also on screen).
- **Tier.** 2 — B plus VoicePrompt `inline`. C is a layer on B, not an alternative to it.

## D · Her week, one screen

```
‹  My week                        ›
Mo 29  Tu 30  We 1  [Th 2]  Fr 3  Sa 4  Su 5
 ✓      ✓     ✗     today    …     …    ☾
Fri 3 Oct      [✓ 8 – 12]  [✓ 4 – 8]      editable
Sat 4 Oct      [✓ 8 – 12]  [✓ 4 – 8]      editable
Sun 5 Oct      ☾ Weekly off
Mon 6 Oct      8 – 12 · 4 – 8               not yet
```

A screen that is both record and plan (DoorDash, Turo): the past week as WeekStrip `dots` with Present / Absent
Tags per day (`patterns/earnings.md`), today ringed, the next two days editable, beyond that read-only. Reached
from the Home shift card; the evening ask is a Nudge on Home pointing here.

- **Taps on a normal day:** 0 (if she trusts the default) or 2 (open, confirm).
- **Principles.** P6: she sees her week as progress, which is how she measures herself. P1: more on one screen
  than any other direction — a record and a plan are two things.
- **Breaks from today:** adds a screen the app does not have.
- **Risk.** Build cost: WeekStrip is read-only by rule ("never a selection"); making future days editable is a core
  change or a second component. Heaviest of the six for the smallest gain in the daily case.
- **Tier.** 2 with one ask of core (an editable future state on WeekStrip, or a separate plan row).

## E · One day per screen — and the daily case collapses to one

```
Thursday evening            Friday evening
┌ Fri 2 Oct ───────┐        ┌ Sun 4 Oct ───────┐
│ [✓ 8–12] [✓ 4–8] │        │ [✓ 8–12] [✓ 4–8] │
│ [ I'll come ]    │  →     │ [ I'll come ]    │
└──────────────────┘        │ Sat 3 Oct  ✓ answered yesterday │
┌ Sat 3 Oct ───────┐        └──────────────────┘
│ …                │
```

Uber Eats' *one day at a time*, run through P1's *a step is a screen*. On the first evening, two screens, two
taps. On every evening after, **one screen**: the new day, big, with its pills and one Button; the day she already
answered shown underneath as a small *answered* line, tappable if she must change it.

- **Taps on a normal day (steady state):** 1. **One leave:** 2.
- **Principles.** P1: one question per screen, one line. P2: one Button. P5: the already-answered day is shown
  as answered, never asked twice. This is the only direction that **removes the double ask** for Saturday.
- **Breaks from today:** same as B, plus it stops treating "two days" as the daily shape.
- **Tier.** 2.

## F · Shift rows with switches

```
Fri 2 Oct
🕗 8:00 am – 12:00 pm                   (● on)
🕓 4:00 – 8:00 pm                       (● on)
Sat 3 Oct
🕗 8:00 am – 12:00 pm                   (● on)
🕓 4:00 – 8:00 pm                       (● on)
```

Each shift a ListItem with a Switch, on by default. A Switch is *immediate* (`selection-controls.md`): every flip is
live, which matches lock rule A (free until midnight) with no commit step at all.

- **Taps on a normal day:** 0. **One leave:** 1.
- **Principles.** P3: 48 dp rows, whole row toggles. P1: four switches read as four questions; the row needs
  text to say what each is. A settings-screen shape for a daily promise.
- **Breaks from today:** no question, no Button.
- **Risk.** It looks like settings, and she turns settings off by accident. A costly switch-off needs a confirm
  sheet by rule, so after midnight each row grows a sheet anyway.
- **Tier.** 1 only — ListItem + Switch. Cheapest to build, least like a promise.

---

## Side by side

| | A · on Home | B · one tap | C · spoken | D · my week | E · day per screen | F · switches |
| --- | --- | --- | --- | --- | --- | --- |
| Taps, normal day | 0 | 1 | 1 | 0–2 | **1** | 0 |
| Taps, one leave | 1 | 2 | 2 | 2–3 | 2 | 1 |
| Instruction lines | 0 | 1 | **0** | 2 | 1 | 0 |
| Explicit *yes* for ops | no | yes | yes | optional | **yes** | no |
| Asks Saturday twice | — | yes unless fixed | yes unless fixed | no | **no** | — |
| New screens | 0 | 0 (sheet) | 0 | 1 | 0 (sheet) | 0 |
| Asks of core | pill state | pill state | pill state | WeekStrip editable | pill state | none |
| Reads as | a record | a promise | a conversation | a calendar | a promise | settings |

## Recommendation — E for the ask, A for the record, C for the words

**The ask (E).** After logout, one sheet: the **new day**, its shifts as pills already Present, one Button
*I'll come*. The day she answered yesterday sits under it as one small *answered* row. First evening only, two
days stack. One tap on a normal day, and Saturday is never asked twice.

**The record (A).** The same pills live on the Home shift card for tomorrow and the day after, replacing the
shipped *Present / Absent* question. Home stops asking and starts showing. Changing before midnight is a tap on a
pill; after midnight the pill opens the `confirm` sheet with the penalty strip and a hold (P3).

**The words (C).** The sheet has no title or instruction; the VoicePrompt asks. The pills carry the time, the
check carries the answer, the Button carries the verb. Delete-a-line leaves nothing to delete.

**The three calls, under this.**
- *Where it lives:* replace. One flow — evening sheet to answer, Home card to see and change.
- *Weekly off / leave:* shown with `moon` and no pills; no sheet at all on an evening when the only new day is off.
- *Lock rule:* **A** — free until midnight before the day; penalised after. The one sentence: *Change by midnight,
  free. After, it costs.* It is what makes the pill a plain tap and keeps "answering" from being punished.
- *No-logout day:* a notification at her usual logout hour opens the same sheet (Visible's reminder).

**Revision after the design lead's review (2026-10-01).** A — the record *on Home* — was drawn and rejected: two day
blocks of pills cost about 290 dp above *Login*, and pills with no question around them read as filter chips. The
record moved to a **My shifts page** (Profile → Shifts, also from one navigational row on Home that carries
tomorrow's answer as a Tag). That is D without the calendar: the ask stays the evening sheet (E), the page is for
seeing and changing, and a free change becomes two taps instead of one — accepted, because changes are rare and
Home must stay short.

## What the pills are — the one likely ask of core

A shift pill is a **Chip** in anatomy (40 dp pill, time as the label, leading check when Present) but a Chip
`choice` has one selected state and a check-only glyph. The pill here has two **answers**, not selected/unselected:
*Present* (`check`, `bgBrandSubtle`) and *Can't come* (`moon`, `bgTertiary`). That is a Chip kind — `answer`, two
exclusive icon-states on one pill — or it is SelectionCard `compact` rows. The tier pass decides and raises the ask
in `SCOPE.md`; nothing is drawn as a hand-styled pill.
