# Concept — the money page, from the ground up (v4, 2026-10-05)

Agreed with the design lead on 2026-10-05 after five rounds. v1 (buckets, calendar, bars), v2 (bank number hero,
no week) and v3 (earned-till-date hero, week strip, weeks list, Week screen) are superseded. The reasons are in
`SCOPE.md` → *Log*. The Figma iterations are not a source; the shipped app, `patterns/`, `components/`,
`principles/` and the reads in `reads/` are.

## 1 · The one rule

**The page exists to stop three phone calls.** Experts call to ask (1) *why was this money taken off?*, (2) *where is
my money?* — payouts run through Razorpay, which takes up to 3 days to report success or failure — and (3) *you said
the red card would be reduced, it isn't showing*. Each answer is on the first screen with **no tap**, and it is
carried by an icon, a date, a count or a number — not a sentence. **Simplicity** is the design principle: anything
that does not answer one of the three calls is not on the first screen.

**The money model (design lead, 2026-10-05).** A day is *business − that day's costs* (daily pass, products, a red
card): *I did ₹2,400 of business, ₹400 came off, I made ₹2,000.* The month is the days added up plus bonuses and
extras. The payout is the month minus the **month-level** items only: early payout, income tax, EMIs, cash collected.
**Day costs are shown on the day they happened and never reappear on the month list**, so a rupee is subtracted
once. The month card carries two rows — *Daily earnings* and *Bonuses* — so the sum of days has a home.

## 2 · The one screen and what sits under it

```
EARNINGS  (one Statement card, in equation order)          ┐
  March · 24 days                                           │ band — two numbers and an arrow, in the order the money moves:
  Net earnings · March   ₹50,000                             │   one number: what she made with Snabbit this month (design lead, 2026-10-05)
  Daily earnings        24 days   ₹28,000  ›                │ Accordion row → opens the day list (the days, net of their costs)
  Bonuses                         ₹22,000  ▾                │ Accordion row, closed: Tips · Adjustments · Joining bonus (bar 7 of 10) · Winback (locked)
  Deductions                     −₹33,900  ▴                │ Accordion row, OPEN by default — call 1
    [coins] Early payout   10 Mar  −₹27,000                 │   breakup panel: icon · 1–2 words · date or count · amount
    [PAN]•  Tax 20%        Add PAN › −₹4,200                │   the only action on the card
    [bank]  Loan EMI       3 of 12  −₹1,200                 │
    [money] Cash collected 4 jobs   −₹1,000                 │
    [case]  Kit EMI        1 of 4     −₹500                 │
  ──────────────────────────────────────────                │ the one Divider
  Payout                           ₹16,100                  │ total — call 2 · tracker 15 Apr → Processing → 18 Apr
    ✓ 15 Apr ──── ● bank ──── ○ by 18 Apr                   │   Stepper tracker: sent → bank confirms (Razorpay, ≤ 3 days) → in her account
                                                            ┘
      ▼
DAY BY DAY  — one Card per week (header: Week 4 · 22 – 28 Mar · 5 days · ●12 · ₹12,600), the current week open with its
             day rows, past weeks closed; day off as `moon`; red-card day marked
      ▼ tap a day
DAY  — one Statement card, two sections: band Today · 4 jobs · 5 hr · ₹1,850 →
       Earnings ₹2,000 ▴ (one line per job → JOB, then Minimum guarantee ₹200 with the bar) →
       Deductions −₹150 ▴ (Daily pass · Product cost · 3 items · a red card as a chip: red = counted · green ✓ +₹50 · date = removed)
                                                                                      ← call 1 (day costs) and call 3 live here
      ▼ tap a job
JOB  — services or hours · checked in / out · rating

END OF DAY (sheet over Home after logout, a moment not a level) — scene · Today ₹1,850 · 4 jobs · 5 hr ·
  Today's earnings ₹1,850 · 4 jobs · 5 hr · ●12/15 coins · 3 to Silver (ProgressBar `goal`) · [Done]
```

Three levels at most. No Week screen, no month statement behind a tap, no *How it adds up*, no *Day by day* row at
the bottom: the first screen **is** the statement, and *Daily earnings* is the door to the days — the number and its
detail are the same row. The week survives as the **grouping** of the day list and the coins count on its heading — it gives
days a parent and shows the climb without a block, a bar or a screen of its own on Earnings. Coins and the tier bar
live on the Rewards tab and on the end-of-day sheet, where the climb is the point.

## 3 · The pictures

| Thing | Shape | Why |
| --- | --- | --- |
| The sum | one Statement card: band with **two Stats and an arrow** (made → to your bank) · three Accordion rows (navigate · closed · open) · Divider · total | the band says both truths at once without a sentence; the rows then explain the gap; the arithmetic reads top to bottom |
| Where the money is | Stepper `tracker` under the total, three nodes with dates: tick · bank (brand, now) · wallet (grey, by date) | the 3-day window is a gap between two dots and a date, not a paragraph; failed turns the bank node `error` with the fix Button |
| Why it was taken off | an icon per line (`hand-coins` early payout · `tote` products · `identification-card` tax · `ticket` daily pass · `bank` loan EMI · `money` cash collected · `briefcase` kit EMI · the red-card asset) + a date or count in `Caption` | the reason is the picture and the date; the word is one or two |
| A red card's fate | Chip on the **day** it was given: red with the card asset and −₹ when it counts; green with a greyed card, a tick, +₹ and the date it lands when removed. The day's row in *Day by day* carries the card mark | promised, done and when, without a status word, where it happened |
| The action | one `Add PAN ›` in brand on the tax line, an amber dot on its icon | the only thing on the list she can change |
| The end of day | scene · one number · ProgressBar `goal` with the tier asset | a moment that also motivates (P6) |

## 4 · Words on the first screen

*Earnings · Help · Net earnings · March · Daily earnings · Bonuses · Deductions · Early payout · Income tax · Add PAN ·
Loan EMI · Cash collected · Kit EMI · Payout · Processing.* Everything else is a number, a date, a
count or an icon.

## 5 · Gone for good

Weeks as rows or a strip on Earnings · the Week screen · the month statement as a second page · *How it adds up* ·
*See how* · section totals she must add · the bank number as the hero · the three buckets · the calendar · the three
bars · tier tints · the shift filter · ⓘ · *Job ID* · `₹0` rows · sentences as reasons · *Business Pay · MinBG ·
Differential · Inventory Adjustment · Min G · OT · Adjustments*.

## 6 · Reads that shaped this

`reads/dasher-earnings` (one figure first; the *Dash summary* sheet; payout as a dated two-step record) ·
`reads/grab-driver-earnings` (conditions as icon + value) · `reads/turo-host-earnings` (a fixed set of named lines).

## Copy rule (2026-10-05)

Labels are **standard app vocabulary**, not sentences and not her-words phrases: *Net earnings · Daily earnings ·
Bonuses · Deductions · Payout · Processing · Earnings · Minimum guarantee · Product cost · Today's earnings · Job
earnings · Total · Rating · Done*. The design lead: *"follow how apps work, less text"*. This departs from
`foundations/content.md`'s her-words labels and is recorded in `DECISIONS.md` at publish; the pattern's word table
and the four-language strings are written from this list.
