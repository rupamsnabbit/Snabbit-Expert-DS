# Reference read — the payout status card (Mobbin, 2026-10-23)

Internal only. Never published, never traced. Asked by the design lead after rejecting three variations of the
*Monthly Payout* card: *"read Mobbin, take multiple references, it should cater to all our cases"*. Pinterest was
asked for too; it needs a login, which Claude does not do — mood references wait for the lead to sign in in the
browser pane.

## 1 · What was looked at

Searches (iOS): upcoming payout card · transfer failed with retry · earnings with next payout for couriers ·
transfer in progress with a timeline · payday countdown · UPI payment pending. ~70 screens seen; ten kept:

| # | File | App | What it does that we need |
| --- | --- | --- | --- |
| 1 | `01-kit-payday-countdown.webp` | Kit | **3 Days** *until PayDay August 1* as the hero, a two-colour bar, one line *$10 will be transferred to Card* |
| 2 | `02-remote-invoice-rail.webp` | Remote | amount + a status Tag + a **3-stop rail** inside the card: *Invoice approved → Payment processed → Paid out* |
| 3 | `03-gusto-planned-payday.webp` | Gusto | *Planned payday Thu, May 15* + a *Tracking* tag + one link *Track paycheck status ›* |
| 4 | `04-doordash-deposit.webp` | DoorDash Dasher | a gig worker's deposit: amount, then *Initiated by DoorDash Nov 24 → Deposited to bank Nov 27–Dec 1* |
| 5 | `05-acorns-pending-bars.webp` | Acorns | each pending transfer is a row with a **small progress bar** and *Est. Feb 17* |
| 6 | `06-revolut-in-progress.webp` | Revolut | *Transfer in progress · 1/3* with estimated times per stage |
| 7 | `07-wise-updates.webp` | Wise | an update log, the current stage bold, future stages grey |
| 8 | `08-airbnb-add-payout-method.webp` | Airbnb | the no-payout-method case as a **red alert card on the earnings page** with one action *Set up payouts* |
| 9 | `09-linktree-setup-payout.webp` | Linktree | pending money that cannot be paid without an account → one action *Set up payout account* |
| 10 | `10-zomato-payment-failed.webp` | Zomato | ₹ with a red badge, one line on what happens to the money, *Retry payment* |

## 2 · What they agree on

- **One hero per state**, and it is a number or a date when there is one (Kit *3 Days*, Gusto *Thu, May 15*, DoorDash the amount). P1: number before word.
- **Movement is drawn**, not written: a bar (Kit, Acorns) or a 2–3 stop rail (Remote, DoorDash, Revolut, Wise).
- **The state has a colour and a short name** (Remote *Guaranteed payout* tag, Gusto *Tracking*, Acorns green bar).
- **A blocked payout gets exactly one action** in the card (Airbnb, Linktree), not a paragraph.
- A failure says **what happens to the money** in one line (Zomato *refund in 24 hours*).

## 3 · What we do not take

Card art, brand colours, the serif and display faces, Kit's pastel bar, Remote's dark theme, Airbnb's black pill
button, any copy. Colours and type come from `tokens/`, copy from the live Figma strings (memory: keep Figma wording).

## 4 · Tier

Tier 2 — a composition of core parts: Statement `schedule` row tones (`statement.md` § Schedule row status),
`Tag`, Stepper `tracker` rail, a bar on the ProgressBar track, the Statement `footer` band for the one action.
Nothing new in core unless a direction is picked that needs it (the 3-part bar would be a ProgressBar `segmented`
kind).

## 5 · The three translations

Drawn on Paper page *1b · Monthly payout card · variations*, each in **all ten states** — approaching · sent · paid ·
retry 1 · retry 2 · send it yourself · bank details wrong · no bank · next batch · approaching + no PAN.

| | A · Countdown and a 3-part bar | B · Tracker rail + status Tag | C · One big status, tinted card |
| --- | --- | --- | --- |
| From | Kit, Acorns | Remote, DoorDash, Revolut, Wise | Gusto, Airbnb, Zomato |
| Hero | the wait: *2 days* · *Tomorrow* · *[X] hours* · *Paid* | the amount, with a Tag naming the state | one big icon + one word or number on the state colour |
| Movement | bar July · 2 Aug · 3 Aug; the stopped segment turns amber or red | rail July · 2 Aug · 3 Aug; the stopped stop turns amber (we retry) or red (she acts) | none — the colour carries it |
| Her action | one footer band in the state colour (*Send to my bank ›*, *Fix bank details ›*, *Add UPI / Bank Account ›*) | same | same |
| PAN | brand footer *Upload PAN Card to reduce tax ›* | same | same |

## 6 · Side by side, every difference in one sentence

- Kit's bar is two colours for money split; ours is three segments for **where the money is** (P1, shape before word).
- Remote's rail has three office stages; ours are her dates — *July*, *2 Aug*, *3 Aug* — because she knows dates, not stages (P1).
- Airbnb's alert is a separate card above the page; ours is the footer of the same card, so the action sits next to the money it unblocks (P2, one next action).
- Zomato's failure is a full sheet; ours keeps the card on the page and opens the journey sheet (1.05 / 1.07) on tap, so nothing moves behind a new screen.
- No reference shows *we will try again in [X] hours* on the card itself; ours does, in amber, because she has nothing to do (P5, red only when she must act).

## 7 · Round 3 — the journey sheet (2026-10-23)

The lead chose C3 for the card, asked for it to be tappable (a chevron) and for the sheet it opens to show the
journey *simply*, and rejected the vertical journey sheet drawn earlier. Pinterest still blocked by its login.
Searched Mobbin for status bottom sheets and order-tracking sheets; kept six more:

| # | File | App | Taken |
| --- | --- | --- | --- |
| 11 | `11-instacart-heading-to-you.webp` | Instacart | one big line *Heading to you* + **four icon stops on one thick line** + one line |
| 12 | `12-starbucks-icon-rail.webp` | Starbucks | big state line + *Arrives between 2:53–2:56 PM* + the same icon rail |
| 13 | `13-keeta-eta-rail.webp` | Keeta | the time as the hero, a coloured icon rail, one sentence |
| 14 | `14-careem-arrives-in.webp` | Careem | *Arrives in 9 minutes* + one bar, nothing else |
| 15 | `15-public-deposit-steps.webp` | Public | money's three dated steps, one *Done* |
| 16 | `16-talabat-order-sheet.webp` | talabat | the vertical list of seven steps — **what we do not take** (too long; the rejected iteration looked like this) |

Translation: one big line (the card's state, in its colour) · three icon stops on a 4 dp line with **her dates**
(*July* earned · *2 Aug* sent · *3 Aug* in your bank) · one grey line on what happens next, with the amount · one
Button. The stop that stopped shows amber (we retry: *[X] hrs*) or red (she acts: *Not sent*, *No bank*). Delivery
apps are what she already reads this shape in (Blinkit, Swiggy, Zomato), so the shape carries the meaning, not
words (P1).

## 8 · Round 4 — the journey sheet, vertical and simple (2026-10-23)

The lead rejected the horizontal icon-rail sheet (*"horrible … keep it simple, like a vertical journey"*) and signed
in to Pinterest. Pinterest saved: `17-pinterest-order-tracking-board.jpg` (order trackers: two facts on top —
*Status · Arrival* — then a vertical list, one event per line with its date on the right) and
`18-pinterest-journey-timeline.jpg` (a day as a vertical line of stops with times). Mobbin agrees: Public
(`15-…`, three dated steps), DoorDash Dasher (`04-…`, *Initiated → Deposited*), Too Good To Go, Marcus.

Translation: the state on top (Heading3, its colour) with *Monthly Payout ₹18,555* under it · a vertical journey,
**one line per step**: a 24 dp mark (done ✓ · failed ✗ red · now ◉ in the tone · next ○ grey), the step's name,
its date on the right · one Button. Two to five steps. No boxes, no explanatory sentence, no icons inside nodes.
Unlike the first vertical sheet (rejected), no step has a second line.
