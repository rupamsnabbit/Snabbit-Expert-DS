# Reference read — *Beauty Expert Master* → Earnings page (`783:15118`)

| | |
| --- | --- |
| Source | Figma *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO`, node `783:15118` — the stakeholder's full Earnings design set, handed over 2026-10-05 for the **earnings-page-revamp** project |
| Read | 2026-10-05, from a native-size `get_screenshot` render (7526 × 8917) cropped per frame; `get_metadata` fails on the section (SSE parse error, as on *Expert (Sahil)*) |
| Files | `page-overview.png` (the whole page at ¼) · `B*` = Beauty pay model · `H*` = Househelp / Cook pay model · `00-*` = the older Beauty day view already read in `references/shipped-daily-earnings-2026-09-24/` |
| Status | **Proposed, not shipped.** The frames are the stakeholder's design ask. Evidence of what ships is `references/shipped-app-2026-09-22/` (the statement card, the rate card) |
| Fed | `projects/earnings-page-revamp/` — `prd.md`, `TIERS.md`, `BUILD.md` |

## What is on the page — 22 frames, two pay models, one structure

| Group | Frames | Screen |
| --- | --- | --- |
| Beauty · month | `B1` | *Total Business ₹1,00,000* above a Statement **Monthly Earnings ₹50,000** → *Line item 1 ₹32,000 · Line item 1 ₹28,000* (placeholders) → DEDUCTIONS *Bike EMI −₹2,500 (Deducted EMI 3/11) · Bike rental −₹2,500 · Onboarding kit and Fees −₹5,000 (1/6)* → **Remaining Payout ₹5,000** → PAYOUT SCHEDULE *15 FEB Monthly payout ₹50,000*. Then **Monthly Earnings Breakup** rows: *Daily Earnings ₹28,000 › · Product Cost −₹8,000 › · Joining Bonus ⓘ 🔒 ₹1,500 › · Winback Bonus ⓘ 🔒 ₹5,000 › · Adjustments ₹8,000 › · Income Tax (20%) −₹4,200 › Upload your PAN Card to reduce tax · Tips Check ›*; a second **Total Earnings ₹11,800 + 🔒 ₹8,500** band; **Penalties** *Red Cards › received this month · 5*; **Other Actions** *Request Early Payout (Available limit ₹25,000) · View Payout History · Referral Earnings · Add UPI ID / Bank Account + (yellow callout) · Add your PAN Card + (yellow callout)* |
| Beauty · month → weeks | `B2` | Statement **Monthly earnings ₹28,000** → *Min BG ₹2,000 · Business Pay ₹40,000 ⟨Services ₹3,430 · Distance Bonus ₹10⟩ · Adjustments ₹800* → DEDUCTIONS *Daily Pass −₹1500 · Red Cards [2] −₹100 › · Red Cards Waiver ₹50 › · Last Hour Min BG Loss −₹21* → footer *Cash collected : ₹150*. Then **Daily Earning Breakup**: five **week cards**, each tinted and badged with the tier she held that week (*Week 1 · 1 March – 7 March · ₹1,350 ›* Silver · Week 2 Gold **expanded**: day cards *23 Mar, Mon ₹350 ›* with rows *✓ Shift 1 Full Shift ₹200 · ✓ Shift 2 Full Shift ₹200*, *22 Mar, Sun* with *✕ Shift 1 Absent [2] −₹150*, *21 Mar, Sat* with *◌ Shift 1 Missed Full Shift ₹150* · Week 3 Diamond · Week 4 Pink Diamond · Week 5 No Tier) |
| Beauty · day | `B3` × 6 | date pager *‹ 13 March 2025 ›* → **tier band** (*No Tier · Silver · Gold · Diamond · Pink Diamond*, tinted) → segmented *All shifts · First shift · Second shift* → **Shift info** card (green header *✓ Present · 👍 First shift*; rows *Shift Timing (5h) 7:00 AM – 12:00 PM · ✓ Login Time 6:40 AM · ✓ Logout Time 11:50 AM*; a horizontal carousel with a page indicator when *All shifts*) → a floating line *✓ Minimum Business Guarantee (MinBG) = ₹2000* → Statement **Daily Earnings ₹530** → *Business Pay ⓘ ₹1800 ⟨Services ₹130 · Distance Bonus ₹5⟩ · Differential MinBG Pay ⓘ ₹200 ⟨MinBG ₹2000 · Business Pay −₹1800 (· Inventory Adjustment (25%) −₹100 · Daily Pass −₹100 on the all-shifts frame)⟩ · Inventory Adjustment (25%) −₹50 · Daily Pass −₹100 · Red Cards [0] ₹0 ›* → **Earnings Breakup**: *Job ID #12563 | 6:05 PM ₹160 → Business Pay: Services (1.5 hr) ₹1230 ⟨Waxing (1 hr) ₹950 · Massage (30 min) ₹200 · Long distance ₹5⟩*, *Job ID #12561 | 5:05 PM ₹80* |
| Beauty · rate card | `B4` | *VISHWAAS — Pakka Vaada, Kamao Zyaada* banner with a photo → **Daily Earnings ›** 🔊 → *Min BG* RateTable `matrix` (tier × *Mon–Sun (6 hrs)*: No Tier ₹1350 · Silver ₹350 · Gold ₹350 · Diamond ₹350 · Pink Diamond ₹350) → card *Inventory Adjustment — Deduction for Inventory saved = (MinBG − Business pay) × 25%* → *Daily Pass* RateTable (tier × *Mon–Fri (6 hrs)*: ₹200 · ₹200 · ₹200 · ₹100 · ₹50) → **Other Bonuses** 🔊 *Joining Bonus · 10 Full Shifts from Feb 27 to Mar 15 · ₹3,500 ›* · *Winback Bonus · 15 Full Shifts from Mar 1 to Mar 25 · ₹2,500 ›* → **Other Income & Deductions** 🔊 *Income Tax 1% › · Tips Check ›* → **Penalties** *Red Cards › received this month · 5* → **Learn about Rate Card** 🔊 three video tiles (*Learn about Daily Earnings · Monthly Incentives · Rewards and Penalties*) with a pink dash pager → **FAQs** Accordion `faq` *What is Last Hour MinG Loss* (open, 🔊) · *What are Adjustments* |
| Beauty · job rate tables | `B5` | **Job Earnings**: five RateTable `sum` blocks, one per tier, header tinted and badged; rows *Waxing (No Tier) / Work ₹120/hr + Check In ⓘ ₹5/hr + Summer Bonus ☀️ ₹20/hr + Distance Bonus ₹4 to ₹30 = Base Pay ₹149/hr to 175/hr* across *Mon–Fri (6 hrs) · Sat (8 hrs) · Sun (8 hrs)*. Identical numbers in all five blocks |
| Househelp · month | `H1` | the **shipped** month statement (`references/shipped-app-2026-09-22/08-statement-monthly.png`): *Total Earnings ₹11,800 + 🔒 ₹8,500 → Cash Collected · Early Payout · Loan EMI · Training and Uniform Fees (Deducted EMI 1/4) · Joining Bonus 🔒 → Remaining Payout ₹800 → 5 APR Monthly Payout*; breakup rows add *Shakti Bonus Check ›*; Penalties; Other Actions as `B1` |
| Househelp · month → weeks | `H2` × 2 | the **shipped** day statement (`09-statement-daily.png`) titled *Total Daily Earnings ₹7,680* (*Min G · Last Hour Min G Loss · Base Pay ⟨Work · Check In · Distance Bonus · Summer Bonus ☀️⟩ · OT · Adjustments · Red Cards [2] · Red Cards Waiver · Cash collected*) above the same five tier-tinted week cards, one expanded |
| Househelp · day | `H3` × 7 | as `B3` but the statement reads *Min G ⓘ ₹500 · Base Pay ⓘ ₹390 (greyed, with its breakup greyed: Work ₹130 · Check In ₹5 · Distance Bonus ₹5 · Summer Bonus ☀️ ₹5) · OT ₹0 · Red Cards [0] ₹0 ›*; per job *Job ID #12563 | 6:05 PM ₹160 → Base Pay: Work (1 hr) ₹130 ⟨Work · Check In · Long distance · Summer Bonus⟩ · Base Pay: Check In ₹5 · Summer Bonus ☀️ (1 hr + 15 min) ₹20 · OT (15 min) ₹50* |

## Step 1 — the idea

One page that answers *how much did I make and how was it made* at four depths — **month → week → day → job** — with the pay **rules** (the rate card) one tap away, and the actions about being paid (early payout, history, bank, PAN) at the bottom of the month.

## Step 2 — idea vs. expression

| Borrowable | The reference's own skin |
| --- | --- |
| The four depths and their order; every figure decomposes into the figures below it | *Business Pay · MinBG · Differential MinBG Pay · Inventory Adjustment (25%) · Daily Pass · Min G · OT · Adjustments · Waiver · Job ID* |
| The week as the unit between month and day, with the tier she held **that week** on the week row | Five pastel tints + a tier badge per week; tier band under the pager |
| A shift card per shift with login / logout against the shift window; *All / First / Second shift* as a filter | Green header bands for *Present*; a carousel of shift cards |
| The rate card as tables by tier and day type, with the sum shown as `+ … =` | *VISHWAAS* banner, a photo, a Hinglish slogan; ⓘ on *Check In*; ☀️ emoji |
| Deductions grouped under one label, EMIs with *n of m* | *DEDUCTIONS* as a letterspaced caption; placeholder *Line item 1* twice |
| Locked bonuses shown with the condition | 🔒 beside a grey number with a ⓘ |
| Penalties counted (red cards) and linked to their reasons | a red pill with a count; *Red Cards ₹0 ›* when there are none |

## Step 3 — against the expert

| Failure | Principle | Fix in the translation |
| --- | --- | --- |
| Six internal terms on one card (*Business Pay · MinBG · Differential MinBG Pay · Inventory Adjustment · Daily Pass · Adjustments*) — none taught, two abbreviations | P1, `content.md` § 9 | Her words, one per line; the *how* behind one tap |
| The guarantee is shown as a **subtraction** (*MinBG ₹2000 − Business Pay ₹1800 = ₹200*) she must do in her head to see why ₹530 is right — and on `H3` the real pay (*Base Pay ₹390*) is **greyed out** because the guarantee overrode it | P1, P5 | Show the guarantee as a **shape**: what she earned filled against a line at the guaranteed amount; the top-up is the gap |
| The numbers do not add up on several frames (*₹1800 + ₹200 − ₹50 − ₹100 = ₹1,850 ≠ ₹530*; *Services ₹130 + Distance ₹5 ≠ Business Pay ₹1800*; *Services (1.5 hr) ₹1230 on a ₹160 job*) | P5 honest | One consistent worked day in the pattern |
| Tier colour on **week rows** and on a band under the pager — five tints that mean *which tier*, beside status green and red | P6 (tier colours only for tier; never beside status) | Tier as the reward asset on the row, no tint; the band becomes a ListItem `navigational` into Rewards |
| ⓘ as the only explanation, nine times | P3, `coachmark.md` | The row opens; the section has a Listen |
| *Job ID #12563* | `earnings.md` | Customer first name + initial · time · duration |
| *Red Cards [0] ₹0 ›*, *OT ₹0* | `statement.md` zero rows hidden | Hidden when zero |
| Green header bands for *Present* and for every money card | P6 row 14 | Tag `success` *Present*; the Statement band is a recorded departure, kept as shipped |
| *Payout Issue* top-right noun; *Expert ID* in the header | P2, `header-nav.md` | Help; ID on Profile |
| Two totals on the month (*Monthly Earnings ₹50,000* band and *Total Earnings ₹11,800* band on one scroll, with *Total Business ₹1,00,000* above both) | P1 one number first | One hero; the others are rows |

## Step 4 — tier

**Tier 2 composition** of core components for every screen: HeaderNav · DatePicker header (pager) · Tabs `segmented` · Card + Tag + ListItem (shift) · **Statement** (month, week, day) · Accordion `breakdown` (job) · ListItem `navigational` · RateTable `matrix` / `sum` · HowToClip + PageIndicator · Accordion `faq`. **Two possible asks of core**, decided in `projects/earnings-page-revamp/TIERS.md`: a *guarantee* shape (earned vs. guaranteed as one bar — `ProgressBar` with a target mark) and a per-day **shift row** state set (*Full shift · Missed full shift · Absent*) on ListItem or Statement row.

## Steps 5–6

In the project: `projects/earnings-page-revamp/BUILD.md` and the pattern revision in `patterns/earnings.md`.
