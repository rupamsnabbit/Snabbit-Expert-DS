# Reference read — Grab Driver · Incentives, Tiers and progress, Booking planner

| | |
| --- | --- |
| App · platform | Grab Driver · iOS — worker-side (Singapore) |
| Captured | 2026-10-05, Mobbin, browsed in Chrome |
| Flows | from the [app's flows page](https://mobbin.com/apps/grab-driver-ios-b529d4fe-57c1-495d-9fa1-eecab48784ea/60ddf6c1-1a18-4be7-bc74-056935886a84/flows): *Incentives* (2) · *Tiers and progress* (2) · *Booking planner* (7) · *Completing a job* (14) · *Account* (5). Mobbin holds no Earnings flow for this app; the Incentives screen's tab bar shows *Earnings · Incentives · Wallet* |
| Files | `01-account-and-incentives.jpg` · `02-profile-safety-score-tiers.jpg` · `03-tiers-and-progress-badges.jpg` · `04-booking-planner-shifts-with-bonus.jpg` · `05-completing-a-job-fare.jpg` |
| For | `projects/earnings-page-revamp` — the guarantee / incentive as a shape; tier progress |
| Internal only | never published, never traced |

## What the screens show

| Screen | What is on it |
| --- | --- |
| **Incentives** | Tabs *Today · Upcoming · Past* · one card per incentive: date range *01 Aug – 31 Aug · 12:00 AM – 12:00 AM* · *Ends in 16 days* (orange) · a long legal title (*Grab Streak Bonus Rebate (1 to 31 Aug 2024) [IGNORE PAYOUT, DISQUALIFIED STATUS, SEE T&Cs]*) · region · **a progress bar with the target number at its right end (300)** · a row of three conditions with icons: *✓ 99.0 % · ★ 4.60 · ⊘ 10.0 %* · a tooltip *Tap here to check your earnings* pointing at the Earnings tab |
| **Tiers and progress** | *MY PROGRESS*: tier gem *Ruby* ✓ · *Since 12 July 2024 · Next tier: Sapphire* · two labelled bars **Driver Rating 5/4.60** and **XP Points 293.60/1200** · *Calculated on 16 Aug 2024 for the last 45 days* · *Tier Booster Breakdown* toggle · *CRITERIA AND BENEFITS* tabs Emerald · Ruby · Sapphire · Diamond · Button *View All Ruby Benefits* |
| **Booking planner** | a week strip *Today 15 · Fri 16 … Wed 21* · rows per slot: *Shift · 04:00 PM – 06:00 PM · S$60.00* and *Streak Zone · 05:00 PM – 06:00 PM · S$88.30 bonus · Lower Central* |
| **Completing a job** | fare *S$21.70 · GrabPay* on the job card; *Route Details · Current net earnings: S$21.70* |
| **Account** | *GrabCar · Weekly · 100.0 % Acceptance · 2.4 % Cancellation* at the top of the account |

## 1 · The idea

Every incentive is **a bar toward a number, with its conditions as a row of icon + value under it**; tier is **two bars** (rating, points) with *since* and *next*. Money for a slot is written on the slot itself (*S$88.30 bonus*).

## 2 · Idea vs. expression

| Borrowable | Skin |
| --- | --- |
| **A progress bar whose target number sits at the track's end** — the whole incentive in one glance | legal titles, *[IGNORE PAYOUT, DISQUALIFIED STATUS…]*, T&Cs |
| **Conditions as a row of icon + value** (✓ 99 % · ★ 4.60 · ⊘ 10 %), not sentences | the ⊘ and % without a word for what they are |
| *Ends in 16 days* as the time left | orange text as the only urgency channel |
| Two labelled bars for tier (rating, points), *since* / *next tier* lines | *Tier Booster Breakdown* toggle, *XP Points* |
| *Today · Upcoming · Past* for incentives | — |
| Bonus written on the slot | — |

## 3 · Against the expert

| Failure | Fix |
| --- | --- |
| The incentive title is a sentence of legal English | Name + amount (*Joining bonus · ₹3,500*), the rule as the bar's caption (*10 full shifts by 15 Mar*) |
| Percentages as conditions (*99.0 %*, *10.0 %*) | counts and faces — *Rating 4.8 · 2 red cards* (`progress-bar.md`: never `%`) |
| Urgency by colour alone (*Ends in 16 days* orange) | Tag `warning` with `clock` and the words |
| *XP Points 293.60/1200* — a decimal abstraction | coins as whole numbers (`ProgressBar` *4 of 20 coins*) |

## 4 · Tier

Tier 2: ProgressBar `linear M` with `goal` (bonuses) and the new `target` marker (the guarantee); ListItem rows for conditions; Stepper `unordered` for the rate card's conditions (`earnings.md` already does this).

## 5–6 · What travels into the pattern

- **Target at the track's end** — the number she is heading for sits where the bar ends; for the guarantee the number sits at the *target line* instead, because she can pass it. This is the `target` marker landed in `progress-bar.md` (2026-10-05).
- **Bonuses on the month as bars, not rows** — *Joining bonus ₹3,500 · 7 of 10 full shifts* is a ProgressBar `goal` with the badge asset, under *Added*; locked until reached (`amount.md` `locked`).
- **Conditions as icon + value**, the row under the bar.
- **Dropped**: percentages, legal titles, decimals, colour-only urgency.
