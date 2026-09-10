# Pattern — earnings

The Earnings tab answers one question in three time frames: **how much did I earn — today, this week, this month — and where did it come from?** The month view is the payout statement (`payout.md`); this page owns the tab root, the **day** and **week** views, the per-job breakdown, and the rate card that explains the numbers. Evidence: *WIP – Payout I* → *Daily Earnings* (`5836:10552`, 14 attendance cases, the first marked ✅), *DAILY AND JOB LEVEL EARNINGS* (`5311:20676`), *✅ RATE CARD EDUCATION* and *My Rate Card* (`6062:14426`); *Self-Serve ER/AR* → *Post Onboarding* → *Daily* / *Monthly* (`599:32404` …).

The shipped day view is honest to a fault: it shows every line — base pay, minimum guarantee, coins, red cards, overtime, last-job-denied, adjustments, bonus — and every job. The pattern keeps that honesty and fixes what the persona needs: words she uses, one number first, no *Job ID*, no ⓘ.

---

## The tab

```
┌────────────────────────────────────────────┐
│ ‹  Earnings                          Help  │  HeaderNav page (root: title, Help)
│ [ Today ] [ Week ] [ Month ]               │  Tabs segmented · remembered per session
│ ‹        Mon 13 Mar        ›               │  the day / week / month pager (DatePicker header) · today by default
│ …view…                                     │
└────────────────────────────────────────────┘
```

- **Today** is the default. **Week** and **Month** are the same screen shape with a different pager step; the pager never goes past today.
- Everything below the pager is one scroll; the hero is always *what she earned in this period*, an Amount `L` with a Listen that reads the card.
- Empty period → EmptyState `section` *No earnings on Sunday* / *Nothing yet today · Your first job's pay lands here*.

---

## What changes from the shipped screens

| Shipped | Proposed | Why |
| --- | --- | --- |
| Header: back · *Expert ID: 14586* · **Payout Issue** | HeaderNav `page` *Earnings* with **Help**; the Expert ID lives on Profile | As `payout.md` |
| Day view tabs *Earnings · Refer Saheli* | Tabs `segmented` **Today · Week · Month**; referral is its own row on Profile and a Nudge on Home, not a tab on Earnings | One tab, one subject |
| Attendance card: green header *Present · Full Shift*, *Shift Timing (5h) 7:00 AM – 12:00 PM*, login / logout times with green checks; red header *Absent · No Show* | **Shift card**: Tag `success` **Present** / `error` **Absent** with the reason as a second Tag `neutral` (*Full shift* · *Half shift* · *No show* · *False attendance*); ListItem rows *Shift 7:00 – 12:00 am · 5 hr*, *Logged in 6:40 am*, *Logged out 11:50 am* with Stat `S`; no green band | Status by Tag, not by a coloured header (row 14); rows read aloud |
| *Daily Earnings ₹1,680* green band, then rows *Base Pay (₹130 × 1 hr) ⓘ · Min G ⓘ · Gold Coins 🪙3 · Red Cards 🟥2 · Overtime · Last Job Denied · Adjustments · Summer Bonus 🌞* | **Earnings card**: *You earned* + Amount `L` + Listen; Accordion `breakdown` **expanded** with rows in her words — *Pay for work · 1 hr* · *Guaranteed top-up* · *Coins earned · 3* (coin asset) · *Red cards · 2* (red-card asset, negative) · *Overtime · 15 min* · *Last job refused* (negative) · *Extra payments* · *Summer bonus* (bonus asset); every row opens its explanation (Accordion `faq`) — no ⓘ | Jargon (*Min G*, *Base Pay*, *Adjustments*) → words; emoji → assets; tooltips → tap-to-open rows with Listen |
| *Cash collected: ₹150* as a green strip | ListItem `info` *You collected ₹150 in cash · deducted from payout* with the cash pictogram | It is neither earning nor penalty; it is a fact she must not be surprised by on payout day |
| *Earnings Breakdown*: *Shift Performance* card, then *Job ID #12563 ₹160* cards with rows | **Jobs today**: one Card per job — *Radhika S · 9:00 am · 1 hr* as the title (Avatar S), Amount `M`, rows *Pay · Overtime 15 min · Checked in early (coin)*; **Shift bonuses** as the first card (*Logged in early · 1 coin*) | She remembers the customer and the hour, never an ID |
| Weekly: five pastel cards *Week 1 · 1 March – 7 March · ₹1,350 ›* in different colours | **Week** view: hero *This week ₹2,350*; a seven-day strip of Stat tiles (Mon … Sun, amount under each, today outlined, empty days `textTertiary`) — tap a day to jump to it; below, the week's totals as the same Accordion `breakdown`; the month's weeks as plain ListItems in **Month** | Colour meant nothing in the pastel cards (row 14); the day strip shows the shape of her week at a glance (P1) |
| *Add Bank & PAN · Get paid on time · Add* green strip | The *Get paid* Stepper (`payout.md`) — on Month and on Home, not on Today | One place for tasks |
| My Rate Card: performance table (*Min 4.8 avg rating*), rate rows, three how-to clips with a pink dash pager | **Rate card** screen (Profile → *My rate card*, and a row under the breakdown *How your pay is calculated ›*): HowToClip cards × 3 with PageIndicator; ListItem rows *Per hour ₹130*, *Overtime per 15 min ₹50*, *Early check-in 1 coin*; the performance conditions as a Stepper `unordered` with `done` / `attention` (*Rating 4.8 or more · you're at 4.9*) | The table is ListItems (`stat-rating-divider.md`); conditions are things she can meet, so they are steps |
| Fourteen attendance variants drawn as full screens | **One** day view; the shift card's Tags and the breakdown rows carry every case (present / absent / no show / false attendance / missed full shift / early logout / shift shortened / extended) | The variants differ only in Tag and rows; a screen per case is fourteen things to maintain |

Kept as shipped: every earning and every deduction visible on the day it happens; per-job breakdown; the login / logout times on the shift card; the rate card with clips; red cards shown against the day they were given, with *Why? ›*.

---

## Today

```
┌────────────────────────────────────────────┐
│ ‹        Mon 13 Mar        ›               │
│ ┌ Present  Full shift ──────────────────┐  │  Tags
│ │ 🕒 Shift            7:00 – 12:00 am   │  │  ListItem + Stat S
│ │ ✓ Logged in                 6:40 am   │  │
│ │ ✓ Logged out               11:50 am   │  │
│ └───────────────────────────────────────┘  │
│ ┌ You earned                      (🔊) ┐  │
│ │ ₹1,680                                │  │  Amount L
│ │ Pay for work · 1 hr             ₹130 ›│  │  Accordion breakdown, expanded; each row opens its faq
│ │ Guaranteed top-up               ₹500 ›│  │
│ │ [coin] Coins earned · 3          ₹30 ›│  │
│ │ [red]  Red cards · 2            −₹50 ›│  │  negative Amount
│ │ Overtime · 15 min                ₹50 ›│  │
│ │ Last job refused                −₹21 ›│  │
│ │ Extra payments                  ₹800 ›│  │
│ │ [sun]  Summer bonus              ₹70 ›│  │
│ └───────────────────────────────────────┘  │
│ 💵 You collected ₹150 in cash · deducted from payout │  ListItem info
│ Jobs today                                 │
│ ┌ Shift bonuses                    ₹10 ┐  │  Card · rows
│ ┌ (R) Radhika S · 9:00 am · 1 hr  ₹160 ┐  │  Card per job · Avatar S · Amount M · rows
│ │ Pay · 1 hr ₹130 · Overtime 15 min ₹50 · Checked in early [coin] ₹10 │
│ ┌ (A) Anagha S · 10:30 am · 30 min ₹80 ┐  │
│ How your pay is calculated               › │  ListItem navigational → rate card
└────────────────────────────────────────────┘
```

- Rows that are zero are **hidden**, not shown as *₹0* — except the two she is waiting for (*Guaranteed top-up* when it applies later in the day, shown as *Counts at end of day*).
- Negative rows are negative Amounts (`amount.md`): `−₹50`, `textError`, never a red Button-like pill.
- A red-card row opens the penalties `faq` with the specific reason (*Late by 12 min at Radhika's*) and the appeal path (**Ask about this** → Help).
- The day updates live while she works: a job's card appears at check-out with `motion.slow` on the Amount.

## Week and month

- **Week**: hero *This week ₹2,350*; the seven-day Stat strip; the same breakdown card for the week; *Jobs this week* collapsed by day (Divider `labelled` *Mon 13 Mar*).
- **Month**: `payout.md` — the statement, schedule and *Get paid*. The month's weeks appear there as ListItems (*Week 2 · 8 – 14 Mar · ₹1,450 ›*) opening the Week view.
- The pager is the DatePicker header stepping by day / week / month; future is disabled; today is one tap away (*Today* Chip appears when not on today).

## Rate card

Profile → *My rate card* and the *How your pay is calculated ›* row. Sections: **How it works** (HowToClip cards *Daily earnings · Monthly bonus · Red cards*, PageIndicator), **Your rates** (ListItems with Stat `S`: *Per hour ₹130* · *Overtime, per 15 min ₹50* · *Early check-in 1 coin* · *Guaranteed per day ₹500*), **To keep these rates** (Stepper `unordered`: *Rating 4.8 or more · you're at 4.9* `done` · *Fewer than 3 red cards a month · you have 2* `attention`). Rates change with a Banner `info` *Your rates change on 1 Apr — See what's new ›* two weeks ahead, never silently.

---

## Content

- *You earned* · *Pay for work* · *Guaranteed top-up* · *Coins earned* · *Red cards* · *Overtime* · *Last job refused* · *Extra payments* · *Summer bonus* · *You collected ₹150 in cash* · *Jobs today* · *Shift bonuses* · *How your pay is calculated*.
- Never *Min G*, *Base Pay*, *Adjustments*, *Job ID*, *Waiver*, *Deduction* as a heading, *Total Daily Earnings*.
- Job title: customer first name + initial · start time · duration. Times 12-hour, Latin numerals.
- Explanations (the `faq` rows) are two sentences, spoken: *We pay you ₹130 for every hour of work. Overtime is paid per 15 minutes.*

---

## Spec follow-ups

- `amount.md`: a `pending` state for rows that count at end of day (*Counts at end of day*, `textSecondary`, no number) — small addition.
- `stat-rating-divider.md`: the seven-day **Stat strip** (7 × Stat `S` in a row, today outlined) — record as a composition.
- `header-nav.md` / `icon-button.md`: the pager header now steps by day, week or month on Earnings (same DatePicker header).

---

## Checklist for the pattern

- [ ] Today / Week / Month are one screen shape; the hero is always the period's total with a Listen.
- [ ] No jargon rows; every row opens its explanation; zero rows hidden.
- [ ] Jobs are named by customer and time, never by ID.
- [ ] Attendance cases are Tags and rows on one view, not fourteen screens.
- [ ] Copy reviewed aloud in four languages; *Guaranteed top-up* and *Last job refused* verified with experts.
