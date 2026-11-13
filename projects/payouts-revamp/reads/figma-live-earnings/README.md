# Expert App 2.0 → PLEASE REFER – DESIGN UPDATE → EARNINGS — the live screens

| | |
| --- | --- |
| Source | *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM`, page **PLEASE REFER- DESIGN UPDATE - 27/04** (`6123:21478`), section **EARNINGS** `6705:133339` (13 627 × 13 312), shared by the design lead 2026-10-23 |
| Status | **Live.** In the review meeting (2026-10-22) the stakeholder confirmed this page is what ships today ("ये अभी जो लाइव है वही है"). It outranks `../figma-master-earnings/` (`6582:24617`), which is an older copy of the same section |
| Captured | 2026-10-23 — renders of the payout-relevant parts here; the month statement in seven states in `frames/lm-<node-id>.png` |
| Use | **The screens this project builds on.** New states go into these screens; nothing is redrawn from scratch |

Only what bears on the two workstreams (monthly payout visibility, early payout) was read closely. The day view,
coins / red cards, Shakti, tips and tax sheets are the same as `../figma-master-earnings/README.md` with the
differences noted at the bottom.

## The month statement — where payout status lives today

`frames/lm-*.png` — seven states (*Bank account not added · PAN not added*, *UPI added · link PAN with Aadhaar*, *zero state*).

```
HeaderNav · back · Expert ID: 14586 · [headset Payout Issue]      ← opens a menu: Call Saathi · Report new issue · View issue history
‹  March 2025  ›                                                  ← month pager
┌ (₹) Total Earnings                        ₹11,800  + 🔒 ₹8,500 ┐ ← Statement band
│ Cash Collected −₹1,000 · Early Payout −₹3,000 · Loan EMI −₹1,200 · Training and Uniform Fees −₹500 (Deducted EMI 1/4) · Joining Bonus 🔒 ₹8,500
│ (bank) Remaining Payout                                  ₹800  │ ← Statement total
│ ┌ PAYOUT SCHEDULE ───────────────────────────────────────────┐ │
│ │ [5 APR] Monthly Payout                           ₹11,800  │ │ ← Statement schedule row: date tile · name · status line · amount
│ └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
Monthly Earnings Breakup · Daily Earnings › · Shakti Bonus Check › · Joining / Winback 🔒 › · Adjustments › · Income Tax (20 % | 1 %) › · Tips Check › · Total Earnings band
Rewards & Penalties · Gold Coins 40 · Red Cards 5
Other Actions · Request Early Payout (Available limit ₹25,000) › · View Payout History › · Referral Earnings › · UPI / Bank Details (Update) › · PAN Details ›
        — or, when missing — Add UPI ID / Bank Account [+] · "Add your UPI / Bank Account to enable payout" · Add your PAN Card [+] · "PAN Card helps reduce Income Tax"
```

**The schedule row is the only place a payout's state is shown today.** Its states, as drawn:

| State | Date tile | Status line under the name |
| --- | --- | --- |
| scheduled | dark navy *5 APR* | — |
| paid | green *29 MAR* | *Paid on 29 March \| UTR:1234567890* (green) |
| processing | orange *5 FEB* | *Payment is under processing...* (orange) |
| blocked — no bank | red *5 APR* | *Add UPI / bank account to enable payout ›* (red, tappable) |
| next month, not yet known | dark *5 MAY* | amount *₹--* |

Rows seen in the schedule: *Monthly Payout*, *Winback Bonus*, *Joining Bonus*. The **Vishwaas bonus** has its own
sticky bar at the bottom of the screen instead (`vishwaas-*.png`): *Vishwaas Bonus ₹1,580 › · Will be paid by 20
March* / *Paid on 20 March | UTR:1234567890* / *No bonus. Missed 15 Full Shifts.* — the same paid / scheduled
language, a second place.

## Early payout — the entry points

- Month statement → *Other Actions* → **Request Early Payout · Available limit ₹25,000 ›** (the shift-in-progress frames still say *Withdraw Early Payout*).
- Side menu (`tiers-only-bank-missing-*.png`, `only-bank-missing-*.png`): *Earnings · **Payout History** · **Early Payout** · Language · Leaves · Refer & Earn · Emergency Logout · Call Support*.
- The early payout screens themselves are not in this Figma file; the live flow is `../early-payout-live/`.

## Account and tax, as live

- **Payout Issue** menu (`call-saathi-8409-119496.png`, canvas note *CALL SAATHI BUTTON ON PAYOUT ISSUE*): *Call Saathi · Report new issue · View issue history*.
- Tax sheets (frames `8172:46787`, `8172:46823`, `7315:*`, `8113:*`, `8141:102944`, `6705:139375`): *No PAN 20 % Income Tax −₹5,000 · Aadhaar linked PAN 1 % Income Tax −₹250 · Total Savings ₹4,750*; *PAN not linked* + *How to link PAN and Aadhaar?*; *1 % Income Tax is applicable as per government regulations. Refundable when income tax is filed.*; a banner *20 % Income Tax is applicable on your earnings now as per government regulations*.
- *Income Tax (20 %)* row link variants: *Upload PAN Card to reduce tax* (red) · *PAN verification is under processing…* (orange).

## Differences from the older copy (`6582:24617`)

Karma → **Shakti Bonus** on the statement (a *Karma Bonus* sheet with *Classic ₹4,000 · Super ₹5,000 · Premium ₹6,000* also exists); *Quick Actions* → **Other Actions** with *Request Early Payout*; a **Tips** row; a Hindi heading variant *महीने की कमाई*; the **Vishwaas** rate-card banner and bonus bar; the redesigned tax sheets with *Total Savings*; *Emergency Logout* as a red-card reason; daily view drawn *with* and *without* cash collected (COD has been removed — the component stays).
