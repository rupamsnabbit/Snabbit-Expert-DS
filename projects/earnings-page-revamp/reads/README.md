# Reads — Earnings page revamp

Mobbin reads for this project, done 2026-10-05 by browsing Mobbin in Chrome (the Mobbin connector answered *out of AI credits* on every search). Worker-side apps first; Uber Driver and Lyft Driver are not on Mobbin.

| Folder | App | What it fed |
| --- | --- | --- |
| `dasher-earnings/` | DoorDash Dasher — Earnings, Earnings history, Payout history, Payout methods, Dasher rewards | the ladder (month → day → job as one card shape), payout as a dated two-step record, facts under the figure |
| `grab-driver-earnings/` | Grab Driver — Incentives, Tiers and progress, Booking planner | the target number at the bar's end → the `target` marker; conditions as icon + value; bonuses as bars |
| `turo-host-earnings/` | Turo (host side) — Earnings | the fixed bucket set with an amount each → *Earned · Added · Taken*; *adjustments included* caption |

Also on file from before this project: `references/mobbin-week-summary/` (seven-day strip, one big number) and `references/mobbin-extra-hours/` (one number that changes).

## What all three do (convention — keep)

- One figure for the period at the top; everything else is below it.
- The sum is **one tap down**, not on the first screen (Dasher's caret, Turo's legend, Grab's bar).
- Payout is a separate, dated thing with its own screen; it is never a line in the earnings list.

## What only one does (a choice — justified or dropped)

- Turo's **fixed set of named buckets** — kept, cut to three, because it is the arithmetic (`CONCEPT.md` § 2).
- Grab's **progress bar with the target number at the end** — kept as the guarantee bar; the number moves to a line inside the track because she can pass a guarantee.
- Dasher's **bar chart** and Turo's **year chart** — dropped; the DatePicker month with amounts is the picture of her month.
