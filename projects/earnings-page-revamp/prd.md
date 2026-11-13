# The ask — Earnings page revamp

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | Rupam Banik, design lead — in chat, with the stakeholder's Figma designs as the input |
| Captured | 2026-10-05 |
| Kind | Captured in conversation — no written PRD. The design input is Figma *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO` node `783:15118`, read into `references/earnings-revamp-figma-2026-10-05/` |
| Confirmed by | Rupam Banik, 2026-10-05 — read back in chat and confirmed with the answers below |

---

**What.** Revamp the entire Earnings page of the Expert app — month, week, day and job views, and the rate card that explains the numbers — so that an expert can tell at a glance how much she made and how the number was made.

**For whom, when.** Every expert, on the Earnings tab, after a shift or on payout day; both pay models the Figma page carries — **Beauty** (pay per service, a daily minimum guarantee, product and pass deductions) and **Househelp / Cook** (pay per hour of work, a daily minimum guarantee, overtime).

**The problem.** The stakeholder's designs are complete and look good, but the design lead cannot understand them — the day card alone carries six internal terms (*Business Pay · MinBG · Differential MinBG Pay · Inventory Adjustment (25%) · Daily Pass · Adjustments*), the guarantee is shown as a subtraction she must do in her head, the figures on several frames do not add up, and the tier she holds is painted as a colour on every week. If the design lead cannot read it, the expert cannot.

**In scope.** The Earnings tab root and its period pager · the **month** statement and its breakup · the **week** as the step between month and day · the **day** view with the shift card(s) and the day statement · the **job** breakdown · the **rate card** (tables by tier, bonuses, penalties, how-to clips, FAQs) · the words for every pay line · the five states of each screen.

**Out of scope** (exists elsewhere, stays there). Payout actions — early payout, payout history, UPI / bank and PAN setup, the payout schedule states — are `patterns/payout.md` and are only *linked* from the month view. Referral earnings are `patterns/referral.md`. Rewards, tiers and red-card detail screens are their own flows; the Earnings page links to them.

**Already decided (not up for design).** The pay rules themselves — what a minimum guarantee is, that products and the daily pass are deducted, that income tax is 20 % without a PAN, that tier is held per week — are business rules. The shipped Statement card is the money card (`components/statement.md`, *kept exactly as shipped* 2026-09-22) and is reused, not redrawn. The Figma frames are the stakeholder's ask and supply structure and order; the system supplies expression.

**Still open** (see `SCOPE.md` → *Open questions*). Whether both pay models ship in one app build or the page is per category · what each Beauty term means in her terms and in money · whether a week can be the default view · whether the rate card belongs on Earnings or on Profile.

---

## Answers given at confirmation (2026-10-05, Rupam Banik)

These describe **how it is now** and are context only. The design lead's instruction: *do not refer to the Figma iterations while deciding the new designs; rethink from the ground up so an expert instantly understands what is happening with her money, simple enough that the design lead understands it, without losing much data.*

| Question | Answer |
| --- | --- |
| One build or per category? | Payout exists for all three categories. Househelp and Cook share a model; Beauty has its own. **One structure must hold all three.** |
| The Beauty terms (*Business Pay, MinBG, Differential MinBG Pay, Inventory Adjustment, Daily Pass, Adjustments, Product Cost, Tips*) | Not known to the design lead. Open for the stakeholder; the new design must not depend on them. |
| Tier per week? | **No.** Tier is decided on the last day of the month. The per-week tier badges in Figma were iterations to see how it looks. |
| *Total Business ₹1,00,000* | Yes, show it: she should see she has made a large amount of business. |
| Rate card Min BG values, Income Tax 1 % | Placeholders. |
| Where the rate card lives | On the Earnings page. |
| Default period on opening the tab | **Month.** |
| Stakeholder | Not known. |
