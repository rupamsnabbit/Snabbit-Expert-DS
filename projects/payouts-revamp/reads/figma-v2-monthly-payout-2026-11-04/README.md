# Monthly Payout v2 — old-UI statement, no hourly retry, PAN in red (2026-11-04)

| | |
| --- | --- |
| Source | Figma `cIAH24e13VZJu31OmiMWrj` → page *Payment revamp* → section **Monthly Payout v2** `2791:24639` (the lead's copy of *Monthly Payout* `1099:30031`; v1 is untouched) |
| Asked | *"the breakup we need to stick with the old ui … first we show u ur earnings, then we do post tax deduction and show u ur taxed money and then we show deductions in that"* · *"there is not going to be any retry in x hours state coz our system auto triggers the retry instantly"* · *"pan also should be made into an urgent action like the bank … in red color"* |

## 1 · Breakup on the old UI

The v2 *July Earnings* card (Earned group + Deductions group, tax inside deductions) is replaced on all 29 frames by
the live statement, built from the same library parts the live screen uses (*Summary Card*, *Pay Summary - List*,
*List Items - Payout*, cloned from *Payouts ledger* S07 `870:1991`), in auto layout, read top to bottom in the
order the money moves:

```
[Total Earnings band]                 ₹24,500      ← earnings
 Income Tax (1%)                       −₹245 ›     ← tax first (opens the tax sheet)
 ─────────
 Earnings After Tax                   ₹24,255      ← taxed money (new subtotal, SemiBold, no icon)
 Cash Collected · Early Payout · Loan EMI · Training and Uniform Fees (Deducted EMI 1/4)
 ─────────
 Monthly Payout                       ₹18,555      ← was *Remaining Payout*; now the same name as the card above
Monthly Earnings Breakup  (live list, Income Tax row removed — it moved up)
 Daily Earnings · Shakti Bonus · Joining Bonus · Winback Bonus · Adjustments · Tips → [Total Earnings ₹24,500]
```

No PAN (rows 2–3): *Income Tax (20%) −₹4,900* with the red underlined helper *Add PAN Card to reduce tax*,
*Earnings After Tax ₹19,600*, *Monthly Payout ₹13,900*. The v2 status card at the top stays.

Copy changed: *Remaining Payout* → *Monthly Payout*; new *Earnings After Tax*. Kept: every other live label.

## 2 · No retry-in-hours state

Removed from row 1: *1.04 Retrying*, *1.05 Retrying — sheet*, *1.04b Retry 2*, *1.04b Last try — sheet*; the
row now runs Approaching → Sent → Payout failed → Paid. The automatic tries happen inside *Processing at bank*;
*3 attempts* on the failed sheets stays true (the tries are instant, not gone).

## 3 · PAN in red

Strip *Add PAN to save ₹1,900* on 1.01b (both) and row 3's 1.11 → `red-600`, as the bank strip. Sheet 4 · No PAN
added → bank sheet's red tint, *No PAN added* tag in `red-700` / `red-200`, title *Add PAN Card* in `red-700`
(was *Save ₹1,900* in blue), line *Add PAN card to save ₹1,900*. The PAN pictogram is a blue bitmap; no red one
is registered in `foundations/assets.md`.

## Flagged

- *₹1,900* (strip and sheet) does not match the frames' tax: 20 % is ₹4,900, 1 % is ₹245 — a saving of ₹4,655.
- Row 2 *1.10 Next batch* shows 1 % tax although that row is *no PAN*.
