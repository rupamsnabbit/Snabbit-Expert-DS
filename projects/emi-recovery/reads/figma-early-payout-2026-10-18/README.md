# Read — early payout (Expert Tier – Snabbit Coins)

| | |
| --- | --- |
| Source | *Expert Tier – Snabbit Coins* `e3zridA0BkXzq6yLZtVWvm` · section *Benefits* `2870:72377` → *Early payout* row: `2870:72381` landing · `2870:73298` amount (empty) · `2870:73235` amount (₹5,000) · `2870:73361` success · `2870:73161` landing after a withdrawal |
| Given by | the design lead, 2026-10-18, as "the latest early payout designs" |
| Fed | `BUILD.md` § D (replaces the keypad / fee screens drawn from `patterns/payout.md` § 4) |

What the screens say: early payout is a **tier benefit** (a *Gold* tag in the header). The landing card shows
**Max. Early payout ₹7,100** against **Total earnings ₹14,200** — the max is half of what she has earned. The amount
screen is *How much do you need?* with a big green ₹ field and a slider from ₹0 to the max, *Remaining amount*, and
*Arrives in your bank · Within 12 hours*; the button is a dark *Withdraw*, disabled at ₹0. Success is a green tick,
the amount, *will be credited in your bank account within 12 hours*, confetti and *Go back*. After a withdrawal the
max drops (₹2,100) and a *Recent withdrawals* row appears. No fee is shown and there is no locked state on these
frames; the unlock threshold Amit described (₹15,000) is not drawn here — open with Kishan's sheet.
