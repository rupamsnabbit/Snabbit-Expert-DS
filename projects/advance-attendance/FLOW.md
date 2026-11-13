# Flow — the pre-shift promise (draft of `patterns/attendance.md`)

Tier 2 composition throughout; one ask of core (the shift pill, `TIERS.md` #5). Direction: `EXPLORATION.md` →
*Recommendation*. Reads: `reads/`. Status: **draft, drawn** — Paper file *Advance attendance* (2026-10-01): 1a · 1b · 2 · 2b · 3 on 360 × 800. Graduates to `patterns/attendance.md` after the design lead's read.

---

## The one rule

**She is asked about a day once, the evening before the evening before, with every shift already marked
Coming; she only ever touches what is different.** Changing is free until midnight before the day; after that
it costs, and the cost is shown before she can do it.

## Where it lives

- **The evening sheet** — opens once, right after her last logout of the day (or from a notification at her usual
  logout hour on a day she did not work). It asks about the one new day; the day she answered yesterday sits
  under it as one answered row.
- **One row on Home** — the shipped shift card keeps today's shift and *Login*; the shipped *Mark attendance for
  tomorrow · Present / Absent* block becomes a single navigational row, *Tomorrow · Coming to both ›* (a Tag carries
  the words). Home gets shorter, not longer, and asks nothing. (Changed 2026-10-01 after the design lead's review:
  two day blocks of pills on Home cost 290 dp above *Login* and read like filter chips with no question around them.)
- **The My shifts page** — Profile → Shifts, and the Home row opens it. Today read-only with its login state,
  tomorrow and the day after with the pills, weekly off rows, and the one rule as its single instruction line. This
  is where she sees and changes; the after-midnight change sheet opens from here.
- **The change sheet** — reached only by tapping a pill after midnight. Shows the cost, needs a hold.

The morning *Login* (the shipped start of her day, the 6:40 Nudge) is untouched; it is a different act.

---

## The flow

```
 last Logout today ─────────────── or ─── notification at her usual logout hour (no logout today)
        │
        ▼
 1. Evening sheet ── voice asks · NEW DAY block: date + shift pills, all Coming · answered-day row · [ I'll come ]
        │     ├── tap a pill ──► flips to Can't come · Button label follows (Come to 1 of 2)
        │     ├── ✕ ──────────► closes; the default (Coming) stands — nothing lost
        │     └── Button ─────► sound.confirm · Toast *Sunday saved* · sheet closes
        ▼
 2. Home ── shipped shift card + ONE row: Tomorrow · [Tag: Coming · both] ›  ── tap ──► 2b
        ▼
 2b. My shifts ── Today (read-only) · Tomorrow pills · day-after pills · weekly off row · the one rule
        │     ├── tap a pill before midnight ──► flips at once · Toast — free
        │     └── tap a pill after midnight ───► 3. Change sheet ── cost strip · [ Keep it ] · hold [ Can't come ]
        ▼
 the day arrives ── Login (shipped) → check in, work, check out → Earnings day view shows Present / Absent
```

### The rhythm, with dates

| When | What she sees | What is asked |
| --- | --- | --- |
| **Thu evening** (first time) | sheet with **Fri** and **Sat** blocks, four pills Coming, *I'll come to all* | both days — the only two-day evening |
| Fri 00:00 | Fri locks: changes to Fri now cost | — |
| **Fri evening** | sheet with **Sun** block, two pills, *I'll come*; one row *Sat 3 Oct · Coming to both ▾* | Sunday only |
| Sat 00:00 | Sat locks | — |
| **Sat evening** | **Mon** block; *Sun 4 Oct · Weekly off* row, nothing to answer | Monday only |
| any morning | Home: today's shift, *Login* as shipped, one row *Tomorrow · Coming to both ›*; the pills live on *My shifts* | nothing |

---

## 1. Evening sheet

```
╭──────────────────────────────────────────────╮  BottomSheet confirm · safe confirm (✕ is the safe exit)
│                                        [✕]   │
│  (🔊)  Sunday  4 Oct                         │  VoicePrompt inline · day header: weekday (or *Tomorrow*) Caption · date Heading3 — the weekday is never repeated in the date
│  [ ✓ 8 am – 12 pm ]   [ ✓ 4 – 8 pm ]         │  shift pills · Coming: check · bgBrandSubtle · textBrand
│                                              │
│  Sat 3 Oct              [Coming · both]  ▾   │  answered row · ListItem · Tag success · caret-down opens its pills
│                                              │
│  [ ✓ I'll come                            ]  │  Button primary brand L — label follows the pills
╰──────────────────────────────────────────────╯
```

- **No title, no instruction line.** The voice asks: *"Sunday — two shifts. Coming to both?"* The pills show the
  default; the Button says her answer. Cover the text: a filled pill with a check still reads as *yes*.
- **Tap a pill** → *Can't come*: `moon`, `bgTertiary`, `textBody`; `light` haptic; spoken *"Sunday evening — can't
  come."* Tap again → back to Coming. Nothing is committed until the Button or the ✕.
- **Button label** is the sentence she is saying back: *I'll come* (all Coming) · *Come to 1 of 2* (some) ·
  *Not coming Sunday* (none). First evening: *I'll come to all* · *Come to 3 of 4* · *Not coming*.
- **✕ / back** closes with the default standing — nothing is lost, so it is a safe confirm (`bottom-sheet.md`
  2026-09-30). Drag and scrim tap do nothing. The sheet does not return that evening; the Home record is always there.
- **Button** → `sound.confirm`, Toast *Sunday saved* (or *Sunday · can't come 4 – 8 pm*), sheet closes to Home.
- **First evening** stacks two day blocks (Fri, Sat) above one Button. No answered row yet.
- **Answered row** (`Sat 3 Oct · Coming · both ▾`) opens its pills in place; a change there before midnight is
  free (Sat locks Fri 00:00 — she is on Friday evening, so it is free). The row never asks; it shows.
- **Weekly off / leave** as the new day → no sheet that evening. As the answered day → row *Sun 4 Oct · Weekly off*.

## 2. Home — one row, not a block

```
┌ Your shift today ────────────────────────────┐  the shipped shift card, kept
│ 🕒 8:00 am – 12:00 pm                   4 hr │  ListItem · today's shift
│ ──────────────────────────────────────────── │
│ Tomorrow          [☾ Can't come · 4 – 8 pm] ›│  ListItem navigational · Tag neutral (or success *Coming · both*) · caret-right → My shifts
└──────────────────────────────────────────────┘
│ [ Login ]  + Nudge                            │  shipped, unchanged
```

- The row replaces the shipped *Mark attendance for tomorrow · Present / Absent* block. It asks nothing: it says
  tomorrow's answer in words (the Tag) and opens the page. The day after is not on Home — it is one tap away.
- The Tag is `success` *Coming · both* when every shift is Coming, `neutral` *Can't come · 4 – 8 pm* when one is
  not, `neutral` *Weekly off* when tomorrow is off.

## 2b. My shifts — Profile → Shifts, and from the Home row

```
┌ ‹  My shifts                          (🔊)  ┐  HeaderNav page · speaker reads the page
│ Today  1 Oct                                 │  day header
│ 🕒 8:00 am – 12:00 pm          [✓ Present]   │  ListItem · Tag success — a shift that happened is a fact
│ 🕒 4:00 – 8:00 pm           Login by 3:40 pm │  ListItem · the next shift's login window
│ Tomorrow  2 Oct                              │
│ [ ✓ 8 am – 12 pm ]   [ ☾ 4 – 8 pm ]          │  Chip answer pills — tappable
│ Saturday  3 Oct                              │
│ [ ✓ 8 am – 12 pm ]   [ ✓ 4 – 8 pm ]          │
│ ☾ Sun 4 Oct · Weekly off                     │  ListItem row, no pills
│ Change by midnight, free. After, it costs.   │  the page's one instruction line · BodyMd textSecondary
└──────────────────────────────────────────────┘
```

- Today is read-only: *Present / Absent* Tags for a shift that happened (the Earnings day view's words), the login
  window for the one still to come. Nothing before today — the record of past days is Earnings.
- **Tap a pill before midnight** → flips at once, Toast *Saved · Fri 4 – 8 pm can't come*; spoken.
- **Tap a pill after midnight** → the change sheet (3). The pill looks the same before and after midnight; the
  cost appears at the moment of change, before she can commit (P5). The one rule sits at the foot of the page as
  the single instruction line — it is the thing she could get wrong, so it earns its place (P1).
- If every shift tomorrow is *Can't come*, the *Login* Nudge for tomorrow does not show on Home.
- A tour stop in `patterns/first-run.md` (*Home, first shift day*) points at the Home row once: *Tap here to see
  or change your next days.*

## 3. Change sheet — after midnight

```
╭──────────────────────────────────────────────╮  BottomSheet confirm · costly · no ✕
│  Change Friday 8 am – 12 pm?                 │  title Heading3
│  You said you're coming. Changing now costs. │  body BodyLg · spoken
│  ┌ [red card]  1 red card                 ┐  │  consequence strip · penalty asset + count (amount: product)
│  [ Keep it                                ]  │  ghost · safe option above
│  [ ☾ Can't come · hold                    ]  │  secondary danger · hold-to-confirm
╰──────────────────────────────────────────────╯
```

- Both directions cost: from *Can't come* the hold Button is *I'll come* and the body is *You said you can't come.
  Changing now costs.* The strip is the same.
- Back = *Keep it*. Hold completes → `sound.commit`, Toast *Changed · Fri 8 am – 12 pm can't come*, the record
  updates; the red card shows against that day in Earnings as any red card does (*Why? ›*).

---

## States (P5)

| State | Sheet (1) | Home record (2) |
| --- | --- | --- |
| loading | day header + two Skeleton pills; Button `disabled` *Loading shifts…* | Skeleton pills in the card |
| loaded | as drawn | as drawn |
| empty (no shifts set) | no sheet; Home shows EmptyState `section` *No shifts on Sunday yet* | the day's row says *No shifts yet* |
| error | sheet does not open; Home card: *Couldn't load your shifts* + **Try again** | same |
| offline | opens from cache; Button tap **queues** with the tap time; pills get Tag `neutral` *Saving…* → `success`; Offline Banner | tap queues the same way (`patterns/offline.md` Present rule) |

## Voice (P4)

| Moment | Spoken (≤ 12 words) |
| --- | --- |
| sheet opens, one day | *Sunday — two shifts. Coming to both?* |
| sheet opens, first evening | *Friday and Saturday — four shifts. Tap any you can't do.* |
| pill → Can't come | *Sunday evening — can't come.* |
| pill → Coming | *Sunday evening — coming.* |
| saved | *Saved.* |
| change sheet opens | *You said you're coming. Changing now costs one red card.* |
| no shifts tomorrow (weekly off) | nothing — nothing to ask |

## Words

| Say | Not | Where |
| --- | --- | --- |
| Coming · Can't come | Present / Absent as buttons, attendance, mark attendance | pill states, Tags, Toasts |
| I'll come · I'll come to all · Come to 1 of 2 · Not coming Sunday | Submit, Confirm, Save, Done | the sheet's Button |
| Keep it | Cancel, No | change sheet, safe option |
| Weekly off · On leave | Holiday, Off day, WO | the off row |
| Tomorrow · 2 Oct · Saturday · 3 Oct (caption + date) · Sat 3 Oct (a ListItem title) | 03/10, Saturday 3rd, *Saturday · Sat 3 Oct* | day headers and rows (content.md § 5) — the weekday is said once |
| 8 am – 12 pm · 4 – 8 pm | 08:00–12:00, 8-12 | pill labels — compact range; the Toast uses the full *8:00 am – 12:00 pm* |

*Present / Absent* survive as **Tags in the record of a day that has happened** (`patterns/earnings.md`); for a day
ahead the words are *Coming / Can't come* — a promise, not a fact.

## What changes from the shipped screens

| Shipped | Here | Why |
| --- | --- | --- |
| Home card *Mark attendance for tomorrow 6:30 AM* with **Absent** (red) / **Present** (green) side by side | One navigational row with a Tag; the question moves to the evening sheet; the answers live on *My shifts* | Two coloured buttons in a row is the mis-tap P3 forbids; green/red are status colours (row 14); Home should not ask a question she has already answered, and should not grow (P2: *Login* under the thumb) |
| Asked the morning of, one day, one shift | Asked the evening before the evening before, one new day, every shift | The ask; and one new day per evening is the simplest honest shape |
| *Mark attendance for next 4 days* strip (Shift Lifecycle file) | Two days; the day strip anatomy survives as the day header | The ask says two; the strip's tile is reused, not the picker |
| Default unknown until she taps | Default **Coming**, shown on every pill | P5 — never a hidden default |
| Any change is a tap | Free until midnight; after, a hold with the cost shown | Product rule; P3 protects what costs |

## Edges

| Edge | Behaviour |
| --- | --- |
| Both next days off | no sheet; Home shows two off rows |
| Ops changes her shift after she answered | out of scope here; noted as an open question (a Banner on Home is the likely shape) |
| She never opens the sheet | notification once at her usual logout hour; at midnight the default stands and locks |
| Sheet open at 23:59 → 00:00 | the Button commits what is on screen at tap time; the lock applies to later changes, never to a tap in flight |
| Phone on silent | the sheet is still readable: pills + Button carry everything the voice says |
| Reduced motion | pills flip without animation; sheet appears without the slide |
| Screen reader | each pill: *"Sunday, 8 am to 12 pm, coming — double-tap to change"*; the Button announces its current label |

## Parts used

HeaderNav `page` · BottomSheet `confirm` (safe · costly) · **shift pill** (Chip kind `answer` — ask of core) · ListItem · Tag ·
Button `primary L` / `ghost` / `secondary danger` hold · Nudge `loss` strip · VoicePrompt `inline` · Toast ·
Skeleton · EmptyState · Offline Banner · Coachmark `point` · notification. Day header inherits DatePicker `strip`
tile type roles.

## Open

- Penalty asset and count (product).
- Pill label budget: *8 am – 12 pm* is 12 characters — verify Kannada and Marathi at 130 %; if it breaks, the pill
  becomes a two-line tile (time over am/pm) or the row form (SelectionCard `compact`).
- Ops-side shift changes after an answer.

## Checklist for the flow

- [ ] One tap on a normal evening; two for one leave; zero text instructions on the sheet.
- [ ] Saturday is never asked twice; the answered day is shown, not asked.
- [ ] A change before midnight is one tap; after midnight it shows the cost and needs a hold.
- [ ] Default Coming is visible on every pill in every state, including offline.
- [ ] Cover the text: pills and Button still say yes / no / how many.
- [ ] Kannada at 1.3: pill labels, *Come to 1 of 2*, *Not coming Sunday*.
- [ ] Field review with experts (checklist rows 15–16) — pending.
