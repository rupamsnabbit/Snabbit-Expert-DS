# Expert App 2.0 → EARNINGS — first read

| | |
| --- | --- |
| Source | *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM`, section **EARNINGS** `6582:24617` (11 731 × 16 990), shared by the design lead 2026-10-22 |
| Captured | 2026-10-22 — section renders at native size (`*.png` here), one crop per screen in `frames/` (`<group>-<node-id>.png`) |
| Shipped or proposed | Sub-sections marked ✅ (*Monthly Earnings*, *Adjustments Case*, one *Daily Earnings* frame, one *Shift in Progress* frame) follow the file's own "✅ = shipped" convention. Everything else (*Daily Earnings* cases, *Gold Coins / Red Cards*, *Karma bonus*, *Bonuses*, *Tips*, *Govt taxes*) has **no ✅ mark**, so treat it as the latest proposal, not as shipped |
| Kind | Evidence of what ships today and of what the business has already designed. Not a design for this project |

The section is the whole earnings surface in one place, built for the **Househelp/Cook pay model** (Min G, Base Pay
per hour, Gold coins, red cards). It supersedes *WIP – Payout I* (`3406:12122`) as evidence, because it holds the same
✅ statements plus the case studies that were missing there.

---

## Sub-sections

| Sub-section | Node | Screens | What it is |
| --- | --- | --- | --- |
| ✅ Monthly Earnings | `6582:38245` | 7 | The month statement in seven account / payout states |
| Daily Earnings | `6582:25063` | 15 | The month-of-days list (✅) and the day view in 14 attendance cases |
| 🔵 Shift in Progress | `6582:31463` | 4 | Month, days list and day view while a shift is running |
| Gold Coins / Red Cards | `6582:25714` | 7 | The coins and red-cards screen (two tabs), *how to earn / how not to get* sheets, zero states |
| FINALLL – KARMA BONUS | `6638:68811` | 8 | The Karma bonus sheet in eight states |
| Bonuses | `6638:69953` | 6 | Joining bonus and Winback bonus sheets, three states each |
| Govt taxes | loose frames `6583:64229 · 64333 · 64437 · 64443 · 64453` | 5 | Two statements and three tax sheets |
| Tips | `6668:104124` | 5 | The *Your tips* sheet in five states |
| ✅ Adjustments Case | `6668:104403` | 4 | The Adjustments detail screen, daily and monthly level, empty |

---

## 1 · The month statement (✅) — `monthly-*.png`

Every month screen has the same order, top to bottom:

1. HeaderNav: back · *Expert ID: 14586* · **Payout Issue** (headset) pill.
2. Month pager `‹ March 2025 ›`.
3. **Statement** card (`components/statement.md`): band *Total Earnings ₹X* (+ 🔒 locked amount) → deduction rows *Cash Collected · Early Payout · Loan EMI · Training and uniform set (Deducted EMI 1/4) · Locked Bonuses 🔒* → total **Remaining Payout** → inset **PAYOUT SCHEDULE** rows (date tile · name · status line · amount).
4. **Monthly Earnings Breakdown** — one row card each: *Daily Earnings ⓘ ₹ › · Karma Bonus ⓘ Check › · Joining Bonus ⓘ 🔒 ₹ › · Winback Bonus ⓘ 🔒/🔓 ₹ › · Adjustments ⓘ ₹ › · Income Tax (20 %) ⓘ −₹ ›* with a red link *Upload PAN Card to reduce tax*, then the green **Total Earnings** band again.
5. **Rewards & Penalties** — two tiles *Gold Coins 40 earned this month* (yellow) · *Red Cards 5 received this month* (pink).
6. **Quick Actions** — *Withdraw Early Payout · Available limit ₹25,000* · *Payout History* · *Referral Earnings* · then either the account rows *UPI / Bank Details · sushila@okaxis · Update* and *PAN Details · BFTPX1234K*, or two yellow callout cards *Add UPI ID / Bank Account → Add your UPI / Bank Account to enable payout* and *Add your PAN Card → PAN Card helps reduce Income Tax* with 3D art.

The seven states drawn:

| Frame | Account state | Schedule rows | Income tax row |
| --- | --- | --- | --- |
| `38558` | no bank, no PAN | 5 Apr monthly payout | 20 % · *Upload PAN Card to reduce tax* |
| `38248` | no bank, no PAN · locked + unlocked bonuses | 5 Apr monthly · 7 Apr winback | 20 % |
| `38351` | UPI + PAN | **29 Mar winback · Paid on 29 March · UTR:1234567890** (green tile) · **5 Apr monthly · Payment is under processing…** (orange tile) · 7 Apr joining | 1 % |
| `38476` | UPI (Update) + PAN | 15 Apr monthly | 20 % · *PAN verification is under processing…* (orange link) |
| `67340` / `91525` | no bank, PAN added | **5 Apr monthly · Add UPI / bank account to enable payout ›** · 10 Apr winback, same (red tiles) | 1 % |
| `27942` | next month, nothing earned yet | 5 May monthly · ₹-- | 20 %, ₹0 — every row ₹0, locked bonuses shown |

Section notes on the canvas: *Bank account not added · PAN not added* and *UPI added · link PAN with Aadhaar case*.

## 2 · Daily earnings — `daily-*.png`

**✅ The month's days** (`25648`): band *Total Daily Earnings ₹7,680* with every line of the month (*Min G · Base Pay · Summer Bonus ☀️ · Longdistance · Overtime (2 hrs) · Last Job Denied · Adjustments · Gold Coins 8 · Red Cards 2*), then *Total Daily Earnings Breakdown* — one row per day: status disc (green ✓ full shift · grey ✓ missed full shift · red ✕ absent) · *22 Mar, Mon* · *Full Shift / Missed Full Shift / Absent* · coin and red-card counts · ₹ · `›`. This is what the *Daily Earnings ›* row on the month statement opens.

**The day view**, one shape in fourteen cases:

1. Shift card with a coloured header — green *Present · Full Shift* / grey-green *Present · Missed Full Shift* / red *Absent · False Present / No Show* — then *Shift Timing (5h) 7:00 AM – 12:00 PM*, *Login Time* and *Logout Time* each with a ✓ or ✕.
2. **Statement** *Daily Earnings ₹X* (band green, grey at ₹0, **red when negative**: *−₹150*, *−₹200*) with rows *Min G ⓘ · Base Pay (₹130 × 3 hr) ⓘ · Summer Bonus ☀️ · Longdistance · Overtime · Last Job Denied · Adjustments · Gold Coins [3] · Red Cards [2]*; footer *Cash collected : ₹150 ⓘ* (tooltip *This amount will be adjusted from your monthly payouts*).
3. **Earnings Breakdown** — a *Shift Performance* card (*Early Login 🪙1 ₹10* / *False Absent 🟥1 −₹50* / *Late Login · Early Logout*) then one card per job: *Job ID #12563 ₹160 · Base pay (₹130 × 1 hr) ₹130 · Overtime (15 min) ₹50 · Early check in 🪙1 ₹10* · *Long distance Job (1200 m) ₹25* · *Job ID #12563 −₹100 · Did not accept · Job assigned 1.12 PM 🟥5 −₹50*.

Rules the cases show:

- **Min G and Base Pay are both shown; the one not paid is greyed out** (tooltip *MinG more than Base Pay*). Canvas note: *Base pay and MinG to be shown separate*.
- Shift **extended / shortened**: the shift row shows *Old Shift Timing (5h) ~~7:00 AM – 12:00 PM~~* above *New Shift Timing (3h) 9:00 AM – 12:00 PM*. Canvas note: *Shift shortened — only can be done via CT Team*; *Shift extended — shift extension feature, also cash representation*.
- **Missed full shift** because of early logout, late login, or both — the failing time gets a red ✕.
- **Absent** cases: plain absent (₹0, grey band), *False Present* (−₹150, 3 red cards), *No Show* (−₹200, 4 red cards), *No show applied but CT logged in expert late*, *False attendance*, *False Promise — deallocation; full shift to be considered*.
- **First warning**: the first red card of a kind is waived — the row shows the card greyed with *First Warning* and ₹0 (*Early Logout · First Warning · ₹0*, *Late Login · First Warning · ₹10*). Canvas note: *MinG violation waiver warning*.
- **Last job denied** is a proportionate Min G loss (canvas: *Full shift + Last job denied case (proportionate MinG)*).
- Canvas note: *In case of Summer / holiday bonus — MinG / Base Pay change — pill to be added.* Every row in most day frames carries an orange **⚠ Warning** pill; read as that placeholder pill (or the waiver slot) left visible, not as a real state — **to confirm**.

## 3 · Shift in progress — `inprogress-*.png`

A blue info strip under the pager on month, days list and day: *● Shift in progress · Final earnings will show after shift Logout* (one frame has it in Hindi: *पूरी कमाई shift Logout के बाद दिखेगा*). On the day view *MinG* and *Summer Bonus* show **--**, with a tooltip *This will be calculated after Shift Logout*; *Logout Time --*. *Last job denied* and *Adjustments* rows gain a ⌄ caret (they expand).

## 4 · Gold coins / Red cards — `coins-*.png`

One screen, two tabs *Gold Coins | Red Cards*, under the month pager.

- **Hero**: big coin / red card art on a tinted radial ground · *Gold Coins · Earn ₹10 for every Gold Coin* · **30 × ₹10 = ₹300** · or *Red Cards · Lose ₹50 for every Red Card* · **26 × −₹50 = −₹1,300**.
- **Totals card**: *Total Gold Coins 8* → *Early Login 8 · Early Check In 12* (another frame adds *Long Distance Jobs 10*); *Total Red Cards 20* → *Late Login · False Present · False Absent · Early Logout · No Show · Jobs not accepted*, 5 each.
- Link *How to earn Gold Coins?* / *How not to receive red cards?* → a sheet of tiles (*Login 15 Minutes Early · Checkin On Time*; *Late Login · False Present · Early Logout · False Absent · No Show · Jobs Not Accepted*), each tile showing **how many cards** that miss costs — 1, 2, 3, 1, 4 — and *Jobs Not Accepted* escalating **1st time 1 · 2nd time 2 · 3rd time 3**. Button *Understood*.
- **History** by day (*9 APR, TUE*): one expandable row per reason with its count, opening to *Job ID: 15567 | Time: 09:00 AM · 1*; a waived card shows ⚠ *First Warning*.
- **Zero states**: *0 Gold Coins · Start earning Gold coins today* with the two earn tiles inline; *0 Red Cards · How not to recieve Red Cards* with the six tiles inline.

## 5 · Karma bonus — `karma-*.png`

A bottom sheet, cream ground: **Karma Bonus** · three metallic badges **Bronze ₹1,000 · Silver ₹1,500 · Gold ₹2,000** · three progress rows, each with its own goal markers:

- *23 Full Shifts done* — markers at 22 (bronze) · 24 (silver) · 28 (gold)
- *4.65 Ratings achieved* — goal 4.6
- *3 Sunday Full Shifts done* — segmented, goal 3 or 4

Footer strip by state: on track (none) · **at risk** *Improve your rating to 4.6+* (yellow) · **inactive** *No bonus. Missed 1 Sunday – 20th Jan* · *No bonus. Rating was lower than 4.6* · *No bonus. Did not complete 22 Full shifts* (red, everything greyed) · **success** *Gold / Silver / Bronze Bonus unlocked* (green, bars green). Button *Close* (navy).

## 6 · Joining and Winback bonus — `bonuses.png`

Same sheet shape, smaller: **Joining Bonus** blue badge · 🔒 ₹3,500 · *6 Full Shifts done* of 10 · strip *Complete by 15 March · Payout Date: 20 March*; failed *No bonus. Did not complete 10 Full shifts*; success 🔓 ₹5,000 *Joining Bonus will be paid on 21st March*. **Winback Bonus** pink badge · ₹2,500 · of 15 · *Complete by 25 March · Payout Date: 20 March* (payout before deadline — likely a typo); success strip reads *Joining Bonus will be paid on 20th March* (copy bug).

## 7 · Income tax — `frames/tax-*.png`

Three sheets opened from the tax row: *Don't lose 20% of your earnings · As per government rules, 20% income tax is cut if PAN is not added* · **Later | Add PAN**; *Income tax · 20% TDS is applicable on your earnings since your PAN and Aadhar are not linked* · **Understood**; *Income tax · 1% TDS is applicable on every job done, according to government regulations* · **Understood**. So tax has three states: **no PAN → 20 %**, **PAN not linked to Aadhaar → 20 %**, **PAN ok → 1 %**, plus *PAN verification is under processing*.

## 8 · Tips — `tips-*.png`

A tall sheet on yellow: *Your Tips · MARCH 2026* · a scalloped gold coin with the figure · states **locked** *₹?? · Tips earned will unlock on 31 March* · **reveal** (coin spinning, rays, *Congrats! You made ₹465 as tips*) · **amount** *₹765* · **none** *₹0 · NO TIPS*; a warning card *Do not ask customers for Tips · If reported, Tips feature will be disabled for you*. Button *Understood*. Reached from the *Tips · Check ›* row on the month statement (Beauty and Househelp files).

## 9 · Adjustments (✅) — `adjust-*.png`

HeaderNav *Adjustments*. Card *Total Amount ₹8,000*, rows grouped by date (*3 MAR, FRI*): grey placeholder disc · *Overtime pay · Job ID: 15567, 09:00 AM · ₹180* · *Long distance job* · *Early login · Login 08:45 AM* · *Accident adjustments*; daily level (no date groups) and a *Last job denied ₹70* case; empty *No adjustments* with a grey placeholder circle.

---

## What the section teaches about the money model (Househelp / Cook)

| Concept on screen | What it is | Where |
| --- | --- | --- |
| Min G | guaranteed minimum for a full shift; paid instead of Base Pay when higher | day, month |
| Base Pay (₹130 × n hr) | hourly pay for job time; made of Work · Check In · Distance Bonus · Summer Bonus | day, job card |
| Last Job Denied / Last Hour Min G Loss | Min G reduced for the time not worked when she logs out early or refuses a job in her last hour | day |
| Overtime | paid per 15 min | day, job |
| Longdistance / Long distance job | per-job distance bonus (*1200 m · ₹25*) | day, job, adjustments |
| Gold coin | ₹10 each — login 15 min early, on-time check-in, long-distance jobs | day, coins screen, month tile |
| Red card | −₹50 each; count per miss rises with severity; first of a kind waived as *First Warning* | day, red-cards screen, month tile |
| Adjustments | manual additions by ops (overtime pay, accident, early login…), listed per day | day, month, detail screen |
| Cash collected | cash she took from a customer; **deducted from the monthly payout** | day footer, month deduction |
| Early payout | withdrawal against the month, limit ₹25,000; deducted at month end | month |
| Loan EMI · Training and uniform set EMI (1/4) | instalments deducted from payout | month |
| Karma bonus | monthly, three badge levels by full shifts + rating + Sunday shifts | month row → sheet |
| Joining / Winback bonus | locked until N full shifts by a date; paid on a fixed date | month row → sheet, schedule |
| Income tax | 20 % (no PAN, or PAN–Aadhaar unlinked) · 1 % TDS per job | month row → sheet |
| Tips | monthly, locked until month end | month row → sheet |
| Payout schedule | dated payouts in the month: scheduled · paid (UTR) · processing · blocked (no bank) | month statement |

## Copy that cannot ship as-is (against `foundations/content.md` and P1)

*Expert ID: 14586* and *Payout Issue* in the header · *Min G*, *MinG*, *Base Pay*, *Adjustments*, *Last Job Denied*, *Longdistance* · *Job ID #12563* as a job's name · *UTR:1234567890* · *Payment is under processing…* · *TDS* · ⓘ tooltips on every row · *Summer Bonus ☀️* (emoji) · all-caps *PAYOUT SCHEDULE*, *MARCH 2026*, *NO TIPS*, *9 APR, TUE* · the total shown twice (band and footer) · *recieve*, *feauture*, *Aadhar* typos · *Understood* / *Close* / *Later* as actions · the Winback sheet saying *Joining Bonus will be paid*.

## Numbers

The figures are placeholders and often do not add up (e.g. ₹1,680 day total over rows that sum differently; month
*Remaining Payout ₹15,474* against a schedule row of ₹10,474). Read structure and states from this file, never sums.
