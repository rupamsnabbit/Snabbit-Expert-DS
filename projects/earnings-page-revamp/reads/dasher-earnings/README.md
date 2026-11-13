# Reference read — DoorDash Dasher · Earnings, Earnings history, Payout history, Dasher rewards

| | |
| --- | --- |
| App · platform | DoorDash Dasher · iOS (402 × 874) — worker-side |
| Captured | 2026-10-05, Mobbin, browsed in Chrome (the Mobbin connector refused with *out of AI credits*) |
| Flows | [Earnings](https://mobbin.com/flows/27119ef9-4d9d-4ccf-84a4-ef87a35a9e80) (2) · [Earnings history](https://mobbin.com/flows/84db5d50-8265-4fa2-aff4-c9deb27605e5) (3) · Payout methods (4) · Payout history (3) · Dasher rewards (3) — from the app's flows page |
| Files | `01-earnings-tab.jpg` · `02-earnings-history-week-day-delivery.jpg` · `03-payout-methods-and-history.jpg` · `04-earnings-and-payout-methods.jpg` · `05-dasher-rewards-tiers.jpg` · `06-ending-a-dash-summary.jpg` (+ zoom) — [Ending a dash](https://mobbin.com/flows/64a82ee0-39e6-4b22-baec-fa77b6513bfa), added 2026-10-05 (late) for the end-of-day moment |
| For | `projects/earnings-page-revamp` — the month → day → job ladder and the three buckets (`CONCEPT.md`) |
| Internal only | never published, never traced |

## What the screens show

| Screen | What is on it |
| --- | --- |
| **Earnings** | *This week* **$15.40** · *Active 26 min · Dashed 27 min* · Button *View payout details* · a promo card (DoorDash Crimson) · **Earnings history**: a small bar chart Jun → Oct with one green bar, then one row *Nov 17 – Nov 23 · $15.40 ›* |
| **Week** (Nov 17–24) | **$19.78** with a caret (tap to see the sum) → *DoorDash pay $6.50 · DoorDash pay adjustment ⓘ $4.38* with an info card (*Based on your dashing for the week ending 11/24, you qualified for $4.38 of additional pay as required by regulations · Learn More*) · *DoorDash tips $8.90* · facts *Active time 26m · Dash time 27m · Completed deliveries 1* · **Dashes**: *Friday, Nov 21 · $15.40 ›* |
| **Day** (Nov 21, 2025) | **$15.40** ▾ · chip *Earn per offer* · facts *Start Time 3:27 PM · End Time 3:54 PM · Active time 26 min · Dash time 27 min · Offers 1 · Deliveries 1* · **1 DoorDash Offer**: *[merchant] $15.40 ^ → DoorDash pay $6.50 · Customer tips $8.90* |
| **Payout history** | *Available balance* **$0.00** · *Initiated by DoorDash*: *Nov 24 · $4.38 · Weekly deposit ›*, *Nov 24 · $15.40 ›* → detail *Nov 24, 2025 · $4.38 · Weekly deposit* with a two-step timeline *Initiated by DoorDash · Nov 24 → Deposited to bank · Nov 27 – Dec 1* and *Earnings from Nov 17 – Nov 23 ›* |
| **Payout methods** | *Current: Weekly pay to your bank account · No fee · Pays every Monday · Takes up to 3 days* · *Available: Instant pay to DoorDash Crimson · Fast Pay to your debit card · $1.99 fee* |
| **Ending a dash** | *Current dash* sheet: *Earnings · This dash $0.00* · *Dash ends at 4:00 PM* · **+ Add time** / **✕ End now** → confirm sheet *End your current dash?* **End dash** / *Go back* → back on the map, a **Dash summary** sheet: *Start time 3:27 PM · Active Time 26 min · Dash Time 27 min · Deliveries Completed 1* · one line *Weekly payout scheduled for Mon, Nov 24* · **Dash total $15.40** · Button **Done**. Nothing else: no lines, no chart, no promo |
| **Dasher rewards** | *0 / 50 deliveries* progress · *Rewards to help you get started* rows with *Active for first 50 deliveries* Tags · *Your ratings*: Acceptance 100 % · Completion 100 % · On-time 100 % · a tier table Silver / Gold / Platinum × four ratings · *Available rewards* grouped by tier with locks |

## 1 · The idea

One number per period, and **the same ladder at every depth**: week total → day total → one offer, each a header figure that opens to its two or three lines. Payout is a separate, dated record with a two-step timeline, never mixed into earnings.

## 2 · Idea vs. expression

| Borrowable | Skin |
| --- | --- |
| **Week → day → offer**, each level the same shape: big figure, then its lines | Red brand, Apple-style facts list, tiny bar chart |
| The figure's caret: the sum is one tap away, closed by default on the week, open on the day | *DoorDash pay adjustment* with a regulations paragraph |
| Payout as its own list: *Initiated → Deposited*, a date for each, *Takes up to 3 days* | *Weekly deposit* as a label |
| Payout method stated as a sentence with its cost and day (*Pays every Monday · No fee*) | the promo card between the number and the history |
| Facts row under the figure (*Active 26 min · 1 delivery*) | *Earn per offer* chip |

## 3 · Against the expert

| Failure | Fix |
| --- | --- |
| The chart is decoration — one bar in five months says nothing a row cannot | The month **calendar** carries the shape (DatePicker `month` with amounts) |
| *Available balance $0.00* as the payout hero — a zero that alarms (amount.md) | The hero is *You'll get ₹X on 15 Feb*; zero is never shown as a figure |
| Three sums to read (week, day, offer) with no words for what the parts are to her | Three buckets with one icon each, same on every level |
| ⓘ for the adjustment | the row opens; the section's Listen |

## 4 · Tier

Tier 2 composition of core parts — Statement (band · rows · total · schedule), ListItem rows, the DatePicker month header. Nothing here needs a brief.

## 5–6 · What travels into the pattern

- **The ladder is the same card at every depth** — month, day, job share the Statement with the three bucket rows. (Dasher's week → day → offer, with the nouns changed.)
- **Payout is dated and two-stepped** — *On its way 15 Feb → In your bank by 17 Feb*. Already the Statement's schedule panel and `payout.md`'s states; Dasher confirms the convention.
- **Facts under the figure** — *24 days · 41 jobs* under the month hero; *4 jobs · 5 hr* under the day. Stat `S` row inside the Statement band.
- **Dropped**: the chart, the promo card, *Available balance*, ⓘ.

## 7 · The end-of-day moment (added for `earnings-page-revamp`, the design lead's ask)

Dasher's *Dash summary* is the model of restraint: four facts, one sentence about when the money comes, one total, one
Button. It does not break the total down, it does not sell anything, and it sits as a sheet over the map she was
already on. **Borrow:** the shape (facts · when · total · one Button) and the single payout sentence. **Translate:**
the facts become hers (*Logged in 6:40 am · Logged out 11:50 am · 4 jobs · 5 hr*), the total is *Today you made
₹1,850* at Amount `L`, the sentence is *₹5,000 so far · reaches your bank on 15 Apr*, and the Button says the verb
(*Done for today*). The breakdown stays one tap away (*See how ›*), exactly as on the Earnings tab's first screen.
