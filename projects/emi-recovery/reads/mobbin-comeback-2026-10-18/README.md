# Reference read — the come-back money moment (2026-10-18)

Internal only. Never published, never traced.

**Ask (lead, 2026-10-18):** the come-back amount on the suspended → back screens (page *E · Suspended → back*) reads like a
small nudge. Make it eye-catching, on every Home state. Explore 5–6 iterations.

## 1 · What was looked at

Mobbin (iOS), searched by flow — win-back offer, reward with deadline, reactivate account, money waiting to be claimed:

| App | Screen | What it does |
| --- | --- | --- |
| Swiggy | One membership expired | Gradient hero, then a green savings card showing ₹538. Ends with "Don't break your savings streak" and a renew button |
| SHEIN | Jackpot quest | Dark card with a huge amount and a progress bar to the withdraw threshold |
| FocusFlight | Lifetime discount | A ticket with perforation notches, the amount as the hero, and a countdown below |
| Natural AI | Reactivate subscription | A big disc showing money saved, with one reactivate button |
| QUITTR / Flo | One-time offer | A big number in a coloured block, an expiry, and one claim button |
| Grab Driver, DoorDash Dasher | Offline / paused | Gig-worker state screens, all plain text. None shows money at stake, which is the gap here |
| Lloyds, Qantas | Rewards challenges | Days-left chip and calendar countdown beside a reward |

Pinterest (mood only, nothing structural borrowed): cashback card UIs with big balances on pink, badge-unlock sheets,
and savings jars filling with coins.

## 2 · Structure that recurs

The amount is the hero (Display size or bigger). It sits in its own coloured container, apart from the status. The
date sits right under the amount, never in a separate line elsewhere. There is one action. A picture of money (a bag,
a jar or a disc) does the explaining instead of a sentence.

## 3 · Translation (what we take, what we don't)

| Taken | Not taken |
| --- | --- |
| Amount as hero in its own container | Gradients and neon fills beyond the token set |
| Date pinned to the amount | Second-by-second countdown clocks (P6: no pressure; Timer `deadline` is for jobs) |
| Ticket notches, dark vault, calendar tile as *shapes* | Strike-through prices, "Limited time", "One-time offer" copy (manipulative for this audience) |
| A money picture doing the work of the sentence | Confetti or celebration on a *suspended* screen |

## 4 · Tier

Composition (Tier 2) on the shipped Home status card. Iteration 5 reuses the shipped early-payout *Max early payout*
header (bg-reward, Display amount, money bag) as a band at the bottom of the card, so it is the closest to the app.
Iteration 6 (money dock above the tabs) would be a new Home slot → Tier 3 brief if picked.

## 5 · Iterations drawn — Paper *EMI recovery* → page *E · Come back · explore (pick one)*

1. **Money first.** The card opens with the money bag, ₹2,600 in green Display, *is waiting for you* and a date chip. The suspension reason sits below.
2. **Ticket.** A pink coupon with perforation: *Kept for you ₹2,600* and the bag on top; *Come back by 31 Oct* and *65 days left* on the stub.
3. **Countdown.** A calendar tile reading *65 days left*, then *to get ₹2,600 back*, then a days bar running from today to 31 Oct.
4. **Dark vault.** A dark panel: *Locked for you ₹2,600*, a pink lock disc, then *Unlocks when you come back by 31 Oct*.
5. **Reward band.** The shipped early-payout header attached to the bottom of the status card. Carried to E3 (waiting) and E4 (back), where the band turns green: *You're back · +₹2,600 · In your 15 Sep payout*.
6. **Money dock.** A pink strip pinned above the tab bar, the same on every Home state: *₹2,600 waiting · Come back by 31 Oct ›*.

## 6 · Open

- The money bag (`59MK…` in Paper, from the lead's early-payout designs) is not in `foundations/assets.md`. If the pick
  uses it, it is registered first. It belongs to the reward layer by look, but the money is hers, which is the open
  question.
- `pink-300` is used for the ticket perforation (2) and for the existing dashed placeholders. That is a palette step,
  so it needs a semantic token if 2 is picked.

## 7 · Rejected, round 2 (same day)

Lead: *"too much overload — I was thinking of just adding a card to the top saying so and so money waiting for you."*
All six above were erased. What the read got wrong: it copied the *size* of the reference heroes, not the *idea*
(money is its own thing, apart from the status). On a screen that already carries a status, a reason and two buttons,
the money gets one quiet card above them — never a second hero inside the card.

Round 2, same page: the shipped E1 untouched, the old nudge removed, one card added above the status card.
A one line (bag · *₹2,600 waiting for you* · ›) · B two lines (+ *Come back by 31 Oct*) · C yellow `bg-reward`, amount
first · D pill, smallest · E no picture (*Waiting for you* · green ₹2,600 · *By 31 Oct* chip).
