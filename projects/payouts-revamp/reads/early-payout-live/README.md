# Early payout — the live flow

| | |
| --- | --- |
| Source | Figma *Expert Tier – Snabbit Coins* (`e3zridA0BkXzq6yLZtVWvm`), section *Benefits* → *Early payout*: `2870:72381` · `2870:73298` · `2870:73235` · `2870:73361` · `2870:73161` (link from the design lead, 2026-10-23); frame renders in `../../assets/figma/early-payout/`. First seen as a screenshot (`early-payout-five-screens.png`) |
| Status | Live — what ships today, per the design lead |
| Use | **The screens the early-payout workstream builds on** |

## The five screens

| # | Screen | What is on it |
| --- | --- | --- |
| 1 | Early Payout — home | HeaderNav *Early Payout* (back) · a cream card: *Max.Early payout* **₹7,100** with a money-bag pictogram in a ring, under it *Total earnings ₹14,200* · Button (dark, full width) **Withdraw** · *Helpful tips and guide* — a row of circular video thumbnails (HowToClip `story`) |
| 2 | Amount — empty | Same card (and a **Gold** tier chip top right) · *How much do you need?* · an amount field *₹0* with a cursor · a slider *₹0 — ₹7,100* · rows *Remaining amount ₹2,000* · *Arrives in your bank · Within 12 hours* · bottom Button **Withdraw** disabled |
| 3 | Amount — filled | *₹5,000* in green in the field, slider filled to that point · Button **Withdraw** enabled (dark) |
| 4 | Sent | green confetti · a green check disc · **₹5,100** *will be credited in your bank account within 12 hours* · Button **Go back** (outlined) |
| 5 | Early Payout — after | card *Max.Early payout ₹2,100 · Total earnings ₹14,200* · **Withdraw** · *Recent withdrawals*: one row *20 June, 5:35 PM · ● Successful · ₹5,100* · tips and guide |

## What the flow already has, and what it does not

| Has | Does not have |
| --- | --- |
| a limit, an amount, an arrival promise (*within 12 hours*) | any state between *sent* and *successful* — screen 4 says it is coming; the next thing she can see is a *Successful* row |
| a *Recent withdrawals* list with a status pill (*Successful*) | a *failed* row, a reason, or a way to try again |
| — | a no-bank case: what screen 1 shows when no bank account is added |

That gap is exactly the early-payout workstream (`../meeting-2026-10-22/README.md`).

## Things to check against the screens (not decisions)

- Screen 3 asks for ₹5,000; screen 4 credits ₹5,100 — a fee, a top-up, or placeholder numbers?
- *Remaining amount ₹2,000* does not change between ₹0 and ₹5,000 — what is it the remainder of?
- Screen 1's limit is ₹7,100 of ₹14,200 total earnings (50 %); screen 5 shows ₹2,100 after a ₹5,100 withdrawal — consistent with *limit − withdrawn*.
- The month statement says *Available limit ₹25,000* while this screen says *Max. ₹7,100* — two numbers for one limit, or a cap and a current limit?
- Copy to bring into line with `foundations/content.md`: *Max.Early payout* (abbreviation, no space), *Go back* as the only action after success, *Withdraw* as a one-word action (*Withdraw ₹5,000* says the outcome), *Successful* (adjective, not a state word), the green confetti (motion budget P8 — fine if ≤ 1.5 s, P6).
