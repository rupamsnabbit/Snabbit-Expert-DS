# Read — the Earnings page (Expert App 2.0 `6582:38245`, 2026-10-18)

Shared by the lead: *"don't change much, let's build on top of this."* Seven frames of one page (bank not added,
PAN not added, UPI added, payout states). The default frame `6582:38248` was rebuilt in Paper *EMI recovery* → page
*F · Earnings page (Figma) + EMI*: the summary card as editable layers (from `get_design_context`, row icons cropped
from the frame's own 3× export), the rest — Monthly Earnings Breakdown, Rewards & Penalties, Quick Actions — as the
frame's own exports (`breakdown@2x.png`, `rewards@2x.png`, `quick-actions@2x.png`), untouched.

## What the page already has that EMI recovery uses

- A **Pay Summary list** inside the Total Earnings card: icon 20 · BodyMd label · Caption sub (*Deducted EMI (1/4)*) ·
  semibold signed amount · a 10 px slot where a chevron can sit. Training and uniform set is already a row here.
- A **locked** treatment (lock + grey amount, + *🔒 ₹3,500* under the total) — for money she *hasn't earned yet*.
  Not used for Advance EMI: that money *was* taken, so it is a minus row, not a grey one.
- An **info tooltip** (dark, Caption) on *Locked Bonuses* — reused in F2.
- **Quick Actions** list items (illustration 40 · title · green sub-line · chevron) — reused in F3/F4.

## Iterations

| | What changes from Figma | Why |
| --- | --- | --- |
| F0 | nothing (numbers as in Figma) | the before |
| F1 · July | Training row becomes *EMI 2 of 6 −₹700 ›*; one new row *Advance EMI −₹2,600 · Comes back on 15 Sep ›*; payout recalculated | the smallest change: one row, same anatomy, rows add up |
| F2 · July | F1, the sub-line moves into the page's own info tooltip | for a lead who wants the row quieter |
| F3 · August (paid 15 Sep) | *EMI 3 of 6 −₹700*, *Advance EMI back +₹2,600* (green); Early payout sub-line *Your ₹2,600 back counts here* | the refund month, and R1a in the place she withdraws |
| F4 · July | F1 + a Quick Action *Uniform EMI · 2 of 6 paid · ₹2,600 comes back ›* → EMI ledger | a permanent door to the ledger, not only via the rows |

## Open

- The Breakdown export still shows ₹16,000 / ₹16,800 in F3 (August ₹9,000) — it is the untouched Figma export.
- Early payout limit with the refund (R1a) is Kishan's formula; F3 says it counts, not how much.
- The shipped page uses `green-700` and Phosphor duotone icons; kept for fidelity on this page only.
