# Reference read — early payout that unlocks at a threshold (2026-10-22)

Internal only. Never published, never traced.

**Ask (lead):** early payout is ₹0 until her earnings this month reach a threshold (e.g. ₹10,000); only then is some amount
available. The page must show that, and the ₹2,600 back should read as something that brings it closer.

| Source | Screen | Taken |
| --- | --- | --- |
| Mobbin · SHEIN Jackpot | "Collect over $1,500 to qualify for withdrawal" + bar with milestones | progress to a withdrawal threshold, the amount still needed |
| Mobbin · Cash App Green | "$500.00 away · By Jul 31" + bar | "X away" as the one line |
| Mobbin · Rocket Money / Vivid | ring with "$35 · 70% of $50" | the amount inside the gauge, the goal under it |
| Mobbin · ShopBack | "$0.00 · Insufficient · Min withdrawal $5", button disabled | the locked state keeps the button, greyed |
| Pinterest (lead's Chrome, mood) | level gauges ("16,320 points to Gold"), streak bars with "next milestone" | a semicircle gauge as the hero |

Translation (on the lead's Early Payout screen, his header, tips and Saathi kept): one card — *Early payout* + Locked /
Unlocked chip → semicircle gauge with the amount and *of ₹10,000 earned* → one pill (*₹6,200 more · about 7 jobs*) →
what counts (*Your ₹2,600 back*, *Earned this month*) → Withdraw, disabled until unlocked. Not taken: countdowns,
confetti, "insufficient" language. Example values: threshold ₹10,000, 50 % available once unlocked, ~₹900 a job.

## Round 2 — after "they didn't understand" and "hate all of them" (2026-10-22)

Searched Mobbin (earned-wage / cash-advance limits; level-unlock rows) and Pinterest in the lead's Chrome (unlock levels, cashback milestones, salary advance).

| Source | What it does | Taken |
| --- | --- | --- |
| KOHO *Cover limit* (`koho-cover-limit-levels.jpg`) | Big amount you can take now; a row of level tiles — ✓ *$20 Current*, 🔒 *$50 Locked*, 🔒 *$100 Locked*; one bar below for the next level | Structure: the tile shows **only what she gets**, a lock says *not yet*, a tick says *you are here* |
| Chime *SpotMe* | Amount + "of your $20 limit", grow-your-limit below | Amount first, how-to-grow second |
| Noom levels | One bar to the next level only, upcoming levels listed with locks | Only the **next** step has a condition |
| Pinterest — superRewards "₹0.00 … redeem on reaching ₹10", daily-coin grid, streak "Next milestone: 5 days" | Zero is shown plainly; one threshold line | One line, one number to reach |

**Why E01 failed (diagnosis):** every box carried two numbers (what she gets inside, what she must earn under it) and the "fill" read as a selector. The references never ask a tile to carry the condition — they say *locked*, and state only the next condition once.

**Translation (K01 / K02, Figma section 3):** the lead's early payout card, unchanged header; the slab bar is replaced by level tiles (96 × 100, radius 12, current = pink surface + pink border + `check-circle` fill + *Now*; others = grey surface + `lock` regular + *Locked*), scrolling sideways, and one line under them — *Earn ₹6,200 more to unlock ₹3,000* — with a ProgressBar-S-style bar to the next level only.
