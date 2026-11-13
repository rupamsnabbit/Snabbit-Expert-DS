# Why the month statement does not add up — and the smallest fix

| | |
| --- | --- |
| Asked | Design lead, 2026-10-23: *"there is earnings, then there are deductions, then there are again breakdown of something — it makes zero sense … keeping the UI alike can we also fix these … don't hallucinate"* |
| Evidence | The live month statement, seven states (`../figma-live-earnings/frames/lm-*.png`); the 2026-10-22 meeting, where the stakeholder checked the screen on a live device (`../meeting-2026-10-22/`); `components/statement.md` |
| Kind | A reading of the shipped screen and a proposal. Nothing drawn. Every claim below is marked **seen** (on the screens or said in the meeting) or **unknown** (needs an answer) |

## 1 · What the screen shows today, top to bottom (seen)

```
A  ┌ Total Earnings                ₹11,800   + 🔒 ₹8,500 ┐   band
   │ Cash Collected                −₹1,000              │   ┐
   │ Early Payout                  −₹3,000              │   │ "deductions"
   │ Loan EMI                      −₹1,200              │   │
   │ Training and Uniform Fees       −₹500  (EMI 1/4)   │   ┘
   │ Joining Bonus                 🔒 ₹8,500             │   ← locked money, inside the deductions
   │ ─────────────────────────────────────────────────  │
   │ Remaining Payout                ₹800               │   total
   │ PAYOUT SCHEDULE  [5 APR] Monthly Payout  ₹11,800   │   a third number
   └────────────────────────────────────────────────────┘
B  Monthly Earnings Breakup
     Daily Earnings ₹8,000 › · Shakti Bonus Check › · Joining Bonus 🔒 ₹3,500 › · Winback Bonus 🔒 ₹5,000 ›
     Adjustments ₹8,000 › · Income Tax (20 %) −₹4,200 › · Tips Check ›
   ┌ Total Earnings                ₹11,800   + 🔒 ₹8,500 ┐   the same band, a second time
C  Rewards & Penalties   Gold Coins 40 · Red Cards 5
D  Other Actions …
```

(The figures in Figma are placeholders and do not add up on any frame — the analysis below is about the **structure**,
which is the same on all seven.)

## 2 · Where it breaks (seen)

1. **The first and biggest number is not her money.** *Total Earnings* leads; what reaches her bank (*Remaining
   Payout*) is a small green line in the middle; the schedule row shows a third figure.
2. **Things are taken away before she is shown what they are taken from.** Card A subtracts from *Total Earnings*;
   the parts of *Total Earnings* come later, in list B, after the payout schedule.
3. **Tax is in the wrong list, so neither list adds up.** Tax comes out of her payout, but card A does not list it —
   it sits in list B as a negative row. So *Total Earnings − A's deductions* ≠ *Remaining Payout* (the tax is
   missing), and list B ≠ *Total Earnings* (the tax is subtracted there). **This is exactly what the stakeholder found
   on the live device** in the meeting: the top figure and the remaining payout differed by the tax, and the rows in
   B could not be made to sum to either.
4. **Locked money is in three places, once among the minuses.** *+ 🔒 ₹8,500* beside the total, *Joining Bonus 🔒*
   as a row inside the deductions, and *Joining / Winback 🔒* in list B. It is not money she gets this month, and
   in card A it reads like one more cut.
5. **The same title twice.** *Total Earnings* is the band of card A and the band closing list B.
6. **Words in a column of numbers.** *Shakti Bonus · Check* and *Tips · Check* have no figure, so list B cannot be
   added up by eye — and it is not visible whether they are inside the total.
7. **Rows at ₹0** (*Cash Collected ₹0*, *Early Payout ₹0*, *Loan EMI ₹0*). Cash on delivery has been removed (meeting),
   so *Cash Collected* is ₹0 for nearly everyone.
8. **Money she already received is written like a cut.** *Early Payout −₹3,000* sits beside the EMIs; it is her own
   money, paid to her earlier.
9. **Counts beside rupees.** *Gold Coins 40* and *Red Cards 5* are counts whose rupees are already inside *Daily
   Earnings* (the day view adds *Gold Coins ₹30* and *Red Cards −₹50* into the day's total) — one more set of numbers
   that do not belong to the sum.

## 3 · What the stakeholder asked for (seen, meeting)

- One hierarchy, *A + B + C = total*, as simple as possible: **everything she earned (all additions) − everything
  taken off = her earnings − tax = her net payout.**
- **Keep the structure and the look**; change the order, the grouping and the words. *"Instead of total earnings I
  can show net earnings or remaining payout — that is quick."*
- Groups **collapsed by default**; collapsed, the lines must add up to the total.
- Line-by-line detail stays available one tap down (*daily earnings, Shakti, joining … a breakup for each*).

## 4 · The proposal — the same parts, read as one sum

Nothing new is built. The card is the shipped **Statement** (band · rows · divider · total · schedule); the detail
rows are the shipped breakup row cards; the rule already exists in `components/statement.md` § Content — the band
says *what the figure is to her* (*You'll get … on 2 Nov*), the rows are the money buckets *Earned · Added · Taken*
with their icons (`briefcase` · `arrow-circle-up` · `arrow-circle-down`), each opens its lines one tap down, and **the
total after the divider is the payout**.

```
┌ (₹) You'll get                      ₹6,814 ┐   band — the payout, with the date line
│     on 2 Nov                               │
│~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~│
│ [briefcase] Earned from your shifts  ₹8,000 ›   Daily earnings — opens the days (as today)
│ [↑] Bonuses and tips                   ₹600 ›   opens: Shakti ₹500 · Tips ₹100 · Adjustments …  (only rows with a figure)
│ [↓] Taken off                       −₹1,700 ›   opens: Early payout you took ₹1,000 · Loan EMI ₹500 · Training kit EMI 1 of 4 ₹200
│ [↓] Income tax · 1 %                   −₹86 ›   own row (same `arrow-circle-down` — tax is *taken*) — the PAN message lives here when it is 20 %
│ ────────────────────────────────────────── │
│ [bank] You'll get                    ₹6,814 │   total = the four lines above, exactly
│ PAYOUT SCHEDULE [2 NOV] Monthly payout ₹6,814 · status (the payout-visibility row)
└────────────────────────────────────────────┘
┌ 🔒 Locked · ₹8,500                        › ┐   outside the sum: Joining ₹3,500 · Winback ₹5,000, each with how it unlocks
└────────────────────────────────────────────┘
Rewards & Penalties · Other Actions             unchanged
```

(Figures are illustrations: 8,000 + 600 − 1,700 − 86 = 6,814.)

What changes, one sentence each:

- **The band says *You'll get*** and the figure that reaches her bank, with the date — the first number is her money (P1, P2; `statement.md` § Content).
- **Four lines, one sum, one total.** *Earned* + *Bonuses and tips* − *Taken off* − *Income tax* = *You'll get*; nothing between the band and the total is outside that sum (P5 honest).
- **Tax gets its own line**, inside the sum, so both the sum and the PAN message are visible — the stakeholder's *show how much tax you pay this month*. `icons.md` already files tax under *Taken* (`arrow-circle-down`); it keeps that icon and is simply pulled out of the *Taken off* group into its own row. No new icon.
- **List B becomes the inside of the first two lines** — the same row cards, opened one tap down, instead of a second list with a second *Total Earnings* band.
- **Locked money leaves the sum** and gets one card under it, with how each bonus unlocks; it is never among the minuses (`amount.md` `locked`).
- **Zero lines and *Check* lines are hidden**; a bonus with no figure yet is not in the sum, and its card (Shakti, Tips) stays reachable from *Bonuses and tips* or *Other actions*.
- ***Early payout you took*** names it as her own money paid earlier, not a cut (`content.md`).
- **Coins and red cards stay as counts** under the statement, with a line that their rupees are already in *Earned* — or they move into the *Earned* breakup; to decide (see 5).

The UI stays as it is: same card, same band and scallop, same row cards, same schedule panel, same order of sections below.

## 5 · What I do not know (unknown — needs an answer before drawing)

1. **What is inside the *Monthly payout* amount?** The schedule pays *Winback bonus*, *Joining bonus* and the *Vishwaas bonus* on **their own dates**. If bonuses are paid separately, they must not be in the *You'll get on 2 Nov* sum — they would be their own schedule rows. Which bonuses go into the monthly payout, and which are paid on their own?
2. **Is *Remaining Payout* today equal to the *Monthly payout* schedule row?** On every frame they differ; is that placeholder data, or are they different things?
3. **What is the tax charged on** — all earnings, or job pay only (*1 % TDS on every job done*)? It decides whether the tax line sits after *Earned* or after *Bonuses and tips*.
4. **Are Shakti bonus and Tips inside today's *Total Earnings*?** They show *Check*, not a figure.
5. **Adjustments** — the meeting leaned towards removing them as a separate line (*every rupee added should sit against a job or a shift*). For this fix: keep *Adjustments* as a line inside *Bonuses and tips*, or move them into *Earned*?
6. **Cash collected** — COD is removed. Hide the line when ₹0 (proposed), or remove it?
7. **Coins and red cards** — keep the two count tiles under the statement, or fold them into the *Earned* breakup?

## 6 · Revised 2026-10-23 — same screens, no behaviour change

The design lead: *"preserve the same screens … behaviour change shouldn't be there, just keep it understandable."*
§ 4's proposal collapsed list B into the card and moved locked money to a new card — both are behaviour changes,
so § 4 is **withdrawn**. What remains is the smallest set of changes that makes the two existing sums add up, with
every section where it is, nothing collapsed, nothing behind a new tap:

| # | Change | Fixes (§ 2) |
| --- | --- | --- |
| 1 | **Income tax moves from list B into card A**, as one more line among the deductions (*Income tax · 1 %  −₹86*), with the existing *Upload PAN Card to reduce tax* link under it when it is 20 % | 3 — now *Total Earnings − every line = Remaining Payout*, exactly |
| 2 | **The locked *Joining Bonus* line leaves card A's deductions.** Locked money stays where it already is: *+ 🔒 ₹8,500* under the band, and the locked rows in list B | 4 |
| 3 | ***Remaining Payout* is re-labelled to what it is to her** — *Reaches your bank* (or *You'll get*), and it equals the *Monthly payout* schedule row (pending question 2) | 1 |
| 4 | **List B's heading says what it is** — *How you earned ₹11,800* instead of *Monthly Earnings Breakup*; its closing band stays and is now the exact sum of the rows above it (tax has left the list) | 2, 5 |
| 5 | ***Check* rows show their figure** when there is one (Shakti, Tips) — or are clearly outside the total (pending question 4) | 6 |
| 6 | **₹0 deduction lines are hidden** (*Cash Collected ₹0*, *Loan EMI ₹0*) | 7 |
| 7 | ***Early Payout* → *Early payout you took*** | 8 |

The result reads as two sums that chain: card A *Total earnings − what was taken − tax = what reaches your bank*;
list B *the rows that make up Total earnings*. The same card, the same rows, the same order on screen.

## 7 · Correction and the fix drawn, 2026-10-23

**§ 2 point 3 was wrong for the live screen.** On the live July 2025 frame (`6705:133456`) both sums hold exactly:

- List B: Daily earnings 8,000 + Joining 3,500 + Winback 5,000 + Adjustments 8,000 − Income tax 245 = **24,255** (Shakti and Tips show *Check* and count as 0)
- Card A: 24,255 − 1,000 − 3,000 − 1,200 − 500 = **18,555** = *Remaining Payout*

So *Total Earnings* is already **after tax**, and tax is correctly inside list B. Moving tax into card A (§ 6 change 1) would count it twice — **withdrawn**. (The *no bank, no PAN* frame does not add up — 11,800 − 6,200 ≠ 800 — which is placeholder data in that frame.)

**What actually confuses:** one number is the **end of one sum and the start of the other**, and the page shows the second sum first. Card A begins with ₹24,255 and subtracts from it; list B, further down, builds ₹24,255 and then shows it again in a second green band. She meets the result, then the subtraction, then the parts, then the result again.

**The fix, drawn** (Paper *Payouts revamp* → page *3 · Statement · one total*, 3.00 before / 3.01 after — a duplicate of the live frame, nothing else changed):

1. **The second *Total Earnings* band is removed.** ₹24,255 is shown once, at the top, where the card starts from it.
2. **The list heading names the number it explains:** *Monthly Earnings Breakup* → ***How ₹24,255 adds up***. The list now reads as the working for the figure above it, not as a second statement.

Two changes, no behaviour change, no new component. Still open: whether the *Monthly payout* schedule row should equal *Remaining Payout* (on this frame it is ₹3,500 vs ₹18,555), and whether Shakti and Tips belong in the sum when they have a figure.
