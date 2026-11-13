# Reference read — the month statement reads as if Total Earnings is her pay (2026-10-26)

Internal only. Never published, never traced. Feedback from the lead's people on the 1.01 screen: *the earnings
breakdown is confusing — they thought Total Earnings is what they will get in the end.* Asked for iterations in a
separate section, with Pinterest (read on a mobile viewport) for inspiration. Builds on `../statement-math/`.

| # | File | App | What it does |
| --- | --- | --- | --- |
| 1 | `01-turo-you-earned.jpg` | Turo | Trip total plain → fees in red → **YOU EARNED** big and green at the end |
| 2 | `02-gusto-paycheck.jpg` | Gusto | earned → taxes → **net pay**, net pay is the coloured slice |
| 3 | `03-alias-available-to-spend.jpg` | alias | selling price → commission and fee grey → **Available to spend** |
| 4 | `04-lloyds-total-groups.jpg` | Lloyds | a total, then groups that open one tap down |
| 5 | `05-copilot-net-income.jpg` | Copilot | **net income** is the hero; income and expenses are the rows under it |
| 6 | `06-pinterest-payslip-invoice.jpg` | Pinterest | invoice detail: item lines, tax, total at the bottom |

**What they agree on:** the gross is never the coloured or biggest figure; colour and size go to what you keep, either
first (Copilot) or as the end of the sum (Turo, alias). Our screen does the opposite — the green scalloped band and the
largest number are *Total Earnings*.

**Translations** (Figma *Payment revamp* → section *Earnings breakdown · iterations*, on copies of 1.01):
1. Same words, the green moves to *Remaining Payout* at the bottom; *Total Earnings* becomes a plain header (Turo).
2. *You get ₹18,555* is the band; one grey sum line; *Earned* and *Taken off* groups; *You get* closes (Copilot).
3. *You get* band + three boxes *Earned − Taken off = You get*; the two groups folded (Lloyds).
4. A split bar of ₹24,500 — green what she gets, grey what is taken off — over the list of 1 (Gusto).

Every difference in one sentence:
- Turo's result is a word line; ours is the existing statement total row turned into the green block, so no new part.
- Copilot's hero is a chart; ours is the shipped band with its words changed, because the band is what she already reads.
- Gusto's split is a ring; ours is a straight bar, because a bar reads left to right like the sum below it (P1).
