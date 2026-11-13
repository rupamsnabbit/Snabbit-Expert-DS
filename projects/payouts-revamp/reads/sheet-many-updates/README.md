# Reference read — the status sheet when there are many updates (2026-10-23)

Internal only. Never published, never traced. Asked by the design lead after rejecting five simplifications
(*Simpler sheets* on *Urgent card · iterations*): the journey sheet gets text heavy when a payout has several
tries — *Last try* reads five rows. *"Read Mobbin, Pinterest and see multiple references."*

## 1 · What was looked at

Mobbin (iOS): payment-failed sheets with retry · delivery-delayed status · refund status trackers. ~30 screens seen,
ten kept. Pinterest (signed in by the lead): *order status bottom sheet*, *delivery tracking status progress*; two kept.

| # | File | App | What it does |
| --- | --- | --- | --- |
| 1 | `01-zomato-payment-failed.jpg` | Zomato | ₹ pictogram with a red badge · *Payment of ₹0.90 failed* · one grey line on what happens to the money · Retry |
| 2 | `02-revolut-payment-failed.jpg` | Revolut | ✕ · *Payment failed* · Try again · Done. Nothing else |
| 3 | `03-kraken-payment-didnt-work.jpg` | Kraken | picture · *Your payment didn't work* · one line · two actions |
| 4 | `04-shein-refund-fixed-stages.jpg` | SHEIN | four **fixed** stages; only the current one is open, with one line under it |
| 5 | `05-temu-refund-current-stage-note.jpg` | Temu | two stages; the current one carries a short note (*less than 5 mins*) |
| 6 | `06-moonpay-amount-hero-status-card.jpg` | MoonPay | amount as the title, then a status card: three stages, current one with a line |
| 7 | `07-toogoodtogo-three-stages.jpg` | Too Good To Go | three stages with dates; the last one *Estimated June 10* |
| 8 | `08-hellofresh-new-date-hero.jpg` | HelloFresh | a change shown as the new date, big: *This delivery will be now on* · **15 Aug** |
| 9 | `09-shakeshack-segmented-bar.jpg` | Shake Shack | state + estimated time, a five-part bar, no labels |
| 10 | `10-depop-three-stop-bar.jpg` | Depop | *Awaiting shipping* + a bar with three stops |
| 11 | `11-pinterest-order-status-two-facts.jpg` | Pinterest | two facts big at the top — *Status · In Transit*, *Arrival · 8 April* — the history folded in rows below |
| 12 | `12-pinterest-on-the-way-track.jpg` | Pinterest | *On the way* · one line · a chunky track · the time big |

## 2 · What they agree on

- **The stages are fixed and few** (2–4). A retry, a delay or a problem is **never a new row**; it is a note or a
  state on the current stage (SHEIN, Temu, MoonPay, Too Good To Go). Our sheet adds a row per try — that is the text.
- **A failure sheet shows no history at all**: one picture with a badge, the fact with the amount in it, one line on
  what happens to the money, the action (Zomato, Revolut, Kraken).
- **When the news is a change, the new value is the hero**: the new date or the time left, big (HelloFresh, the
  Pinterest *On the way* board, Shake Shack).
- **Two facts beat a list**: *where it is* and *when it arrives*, side by side (Pinterest order status).

## 3 · What we do not take

Card art, brand colours, the serif faces, black pills, the horizontal icon track (rejected by the lead on
2026-10-23 for the journey sheet), any copy. Tokens, the shipped sheet shell and Figma wording stay.

## 4 · Tier

Tier 2 — the shipped bottom sheet (`components/bottom-sheet.md` `info`) with the Stepper `tracker · vertical`, a Tag
and the type scale. Nothing new in core.

## 5 · The four translations (Figma *Urgent card · iterations* → *Sheets from references*)

| | From | What the sheet shows |
| --- | --- | --- |
| **A · Fixed stages** | SHEIN, Temu, Too Good To Go | always three rows — *Sent to your bank* · the stage now · *In your bank*; the tries are a Tag on the stage now (*Try 3 of 3*) |
| **B · Failure card** | Zomato, Revolut, Kraken | no rows: picture with badge, the fact with the amount in it, one line on the money, the button |
| **C · The new time is the hero** | HelloFresh, Pinterest *On the way* | the time left or the new date in Display, the state as a small line, the amount, the button |
| **D · Two facts** | Pinterest order status, MoonPay | two columns under the picture — *Now* and *In your bank* — each one word or one date, no list |

Every difference from the references, one sentence each:
- SHEIN opens the current stage with a sentence; ours puts a number on it (*Try 3 of 3*), because she counts faster than she reads (P1).
- Zomato's line is about a refund; ours says the money is safe and waiting, because nothing was taken from her (P5).
- HelloFresh asks to confirm the new date; ours only tells it, because the retry is ours to do, not hers.
- Pinterest's two facts are *Status* and *Arrival*; ours are *Now* and *In your bank*, her words, not the system's.
