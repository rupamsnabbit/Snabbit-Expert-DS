# Pattern — payout

Where the money goes. The expert earns per job, sees a running total on the Earnings tab, and is **paid** on fixed days — monthly, with an early-payout option and bonuses that land on their own dates. This pattern covers the statement she reads, the schedule that tells her when, the states a payout can be in, and the two things she must set up to be paid at all (a UPI or bank account, and a PAN). Evidence: *Expert App 2.0* → *WIP – Payout I* → the sections marked ✅ — *Monthly Earnings* (`3553:12166`, four account states) and *Adjustments Case* (`5007:9424`); the rest of that page is still working material and is not treated as shipped.

---

## The flow

```
 Earnings tab
      │
      ▼
 1. Statement ── month pager · "You'll be paid" hero · earned − deductions · breakdown rows · rewards · actions
      │
      ├── 2. Schedule ── dated rows: paid (UTR) · processing · blocked (no account) · failed
      │         │
      │         └── 3. Get paid ── Add UPI / bank (form sheet) · Add PAN (MediaCapture document) · one Stepper when missing
      │
      ├── 4. Early payout ── amount up to the limit · fee shown · confirm · lands in the schedule as "Early payout"
      │
      ├── 5. History ── every payout ever, newest first, with UTR
      │
      └── 6. Paid ── notification + Snackbar on payout day; Help for a payout issue
```

---

## What changes from the shipped screens

| Shipped (✅ Monthly Earnings) | Proposed | Why |
| --- | --- | --- |
| Header: back · *Expert ID: 14586* · **Payout Issue** pill | HeaderNav `page` — back, title *March earnings*, trailing **Help** `HeaderAction` (headset) | The Expert ID belongs on Profile; *Payout Issue* is Help with a payout context (`header-nav.md`) |
| `‹ March 2025 ›` month pager | Kept: the DatePicker month header (caret IconButtons), months with no earnings disabled | Already a system part; one place to learn a month pager |
| Green band **Total Earnings ₹26,674**, then deductions, then *Remaining Payout ₹15,474* — and the green Total band again at the bottom | Hero Card: **You'll be paid** · Amount `L` **₹15,474** · *on 15 Mar*; under it Accordion `breakdown` **collapsed**: *Earned ₹26,674* then each deduction as a negative row; the total appears once | The number she needs is what reaches her account (P1, P2); green is a status colour, not a heading colour (row 14); the same total twice is noise |
| ⓘ tooltips (*Locked bonuses*, *Joining bonus unlocks when…*) | Supporting text in the row + the section's Listen; no tooltips | A tooltip is a tap she cannot discover (`coachmark.md`); words she can hear |
| *Locked Bonuses 🔒 ₹8,500 ›* | Amount `locked` in the row, supporting line *Unlocks after 20 jobs*, row opens the rules Accordion `faq` | `amount.md` already has the state |
| Payout Schedule: date tile + name + status line (*Paid on 5 Feb · UTR…* / *Payment is under processing…* / *Add UPI / bank account to enable payout ›*) | ListItem with a date tile leading, Tag for status (`success` Paid · `warning` Processing · `error` Blocked · `error` Failed), status line as supporting text, UTR with a **copy** IconButton; Blocked and Failed rows carry the fix as a Button `secondary M` | State by Tag + words + icon, not by a coloured sentence (row 4); the fix is on the row that needs it (P2) |
| Monthly Earnings Breakdown rows with brown 3D coin icons, a **Show** pill on Karma bonus, 🔒 on locked rows | ListItem rows with the **reward asset** 24 dp leading (coin / badge — the metallic layer is right here, these are rewards), Amount `S` trailing, `caret-right`; locked rows use Amount `locked`; no *Show* pill — the row opens | `assets.md`: rewards are metallic, informational icons are not; a pill inside a row is a second target (P3) |
| *Income Tax (20 %) −₹500 · Upload PAN Card to reduce tax* as a red link | Row with Amount negative + supporting *20 % until PAN is added*; below the card a **Nudge `gain`** *Add PAN → tax drops to 10 %* with the PAN pictogram | A red link reads as an error; it is an opportunity (P6) and Nudge is the component for *do this → get that* |
| Rewards & Penalties: two tiles *Gold Coins 40* / *Red Cards 15* | Two Stat `M` tiles in a Card: **Snabbit coins 40** with the pink coin, **Red cards 15** with the red-card asset; tap → the rewards / penalties screens | Gold coin is deprecated (`assets.md`); Stat is the component |
| Quick Actions with 3D pictograms: *Withdraw Early Payout · View Payout History · Referral Earnings · UPI/Bank Details · PAN Details* | ListItem `navigational` rows with flat pictograms 40; account rows show the masked value (*sushila@okaxis*, *BFTPX…34K*) and a Tag `warning` **Update** when action is needed | Illustration layer for informational pictograms; one list, one row style |
| Yellow callouts *Add your UPI / Bank Account to enable payout* and *PAN Card helps reduce Income Tax* with 3D art | When either is missing, a **Stepper `list unordered`** *Get paid* at the **top** of the statement: *Add UPI or bank account* · *Add PAN card*; each row is the task; done rows show the check | A blocked payout is the one thing on the page that matters (P2); Stepper is the component for tasks to complete |
| Adjustments detail: *Total Amount* + rows with a blank grey circle, *Job ID: 15567, 09:00 AM*, grouped by date | Same structure with Divider `labelled` per day, ListItem rows with the job-type pictogram, supporting line *Radhika's home · 9:00 am*; the Job ID stays in the detail, not the row | The grey circle is a placeholder; she recognises a customer and a time, not an ID |

Kept as shipped: the month-by-month statement; deductions listed openly (cash collected, early payout, loan EMI, training kit EMI — *Deducted EMI 1/4*); the payout schedule as dated rows; the four account states (no account / account / UPI + PAN / PAN pending); the 20 % → 10 % tax rule surfaced in the statement.

---

## 1. Statement

> **2026-09-22 — the shipped card is the spec.** The re-shaping proposed in the table above (hero as *You'll be paid*, the band folded into an Accordion `breakdown`, the total shown once) is **withdrawn** after tech feedback: reuse what ships. The card is now a component, **`components/statement.md`**, drawn exactly as the app has it; the departures from principles are recorded there and left for the design lead. The rows below stand as the *content* of the statement.


```
┌────────────────────────────────────────────┐
│ ‹  March earnings                    Help  │  HeaderNav page
│         ‹   March 2025   ›                 │  DatePicker month header
│ ┌ Get paid ────────────────────────────── ┐│  Stepper list unordered · only while something is missing
│ │ ○ Add UPI or bank account               ││
│ │ ○ Add PAN card                          ││
│ └─────────────────────────────────────────┘│
│ ┌────────────────────────────────────────┐ │  Card
│ │ You'll be paid                   (🔊)  │ │  Caption + Listen
│ │ ₹15,474                                │ │  Amount L
│ │ on 15 Mar · monthly payout             │ │  BodyMd textSecondary
│ │ Earned ₹26,674 · deductions ₹11,200  ▾ │ │  Accordion breakdown, collapsed
│ │   Earned                      ₹26,674  │ │
│ │   Cash you collected          −₹1,000  │ │
│ │   Early payout taken          −₹3,000  │ │
│ │   Loan EMI                    −₹1,200  │ │
│ │   Training kit EMI · 1 of 4     −₹500  │ │
│ │   🔒 Locked bonuses            ₹8,500  │ │  Amount locked · unlocks after 20 jobs
│ └────────────────────────────────────────┘ │
│ Payout schedule                            │  section heading
│ [7 Feb] Winback bonus     Paid ✓  ₹5,000  │  ListItem · date tile · Tag success · UTR 1234… ⧉
│ [15 Feb] Monthly payout  Processing ₹10,474│  Tag warning · "Usually by evening"
│ [20 Feb] Joining bonus   Blocked   ₹5,000  │  Tag error · [ Add UPI or bank ]
│ This month's earnings                      │
│ [coin] Daily earnings              ₹8,000 ›│  ListItem + reward asset + Amount S
│ [badge] Karma bonus                ₹2,000 ›│
│ [badge] Joining bonus         🔒  ₹5,000 ›│
│ [ ] Adjustments                    ₹8,000 ›│
│ [ ] Income tax · 20 % until PAN     −₹500 ›│
│ [PAN picto] Add PAN → tax drops to 10 %   ›│  Nudge gain
│ ┌ 🪙 40 Snabbit coins ┐ ┌ 🟥 15 Red cards ┐│  two Stat M tiles
│ Early payout · up to ₹25,000              ›│  ListItem navigational rows
│ Payout history                            ›│
│ Referral earnings                         ›│
│ UPI / bank · sushila@okaxis     Update    ›│
│ PAN · BFTPX…34K                           ›│
└────────────────────────────────────────────┘
```

- The hero is **what reaches her account and when**; the earned total is the first breakdown row. The whole Card is read aloud by its Listen in that order.
- Deductions are named in her words: *Cash you collected* (she kept it — it is not a penalty), *Early payout taken*, *Loan EMI*, *Training kit EMI · 1 of 4*. Never *Adjustments* as a deduction label — adjustments are additions here and have their own row.
- Tabs: the Earnings tab root shows **Today** by default (`pattern: earnings breakdown`, to come); this statement is the **Month** view reached by the Tabs `segmented` *Today · Week · Month*.
- Empty month: EmptyState `empty` *No earnings in February* with *See March ›*.

## 2. Schedule and states

| State | Tag | Supporting line | Action on the row |
| --- | --- | --- | --- |
| `scheduled` | `neutral` *15 Mar* | *Monthly payout* | — |
| `processing` | `warning` **Processing** | *Usually by evening · started 9:10 am* | — (never a spinner; a date, a word) |
| `paid` | `success` **Paid** | *5 Feb · UTR 1234 5678 90* | IconButton `S` **copy** the UTR (Toast *Copied*) |
| `blocked` | `error` **Blocked** | *Add a UPI or bank account to get paid* | Button `secondary brand M` **Add UPI or bank** |
| `failed` | `error` **Failed** | *Bank returned it · check the account number* | Button `secondary brand M` **Fix account** · Help |
| `held` | `warning` **On hold** | *Talk to Help about this payout* | Button `secondary neutral M` **Call help** |

Rules: a payout row never shows an amount without a state; *Processing* has a plain-language expectation (*Usually by evening*), never a percentage; a `failed` or `blocked` row is also a Snackbar on Home the day it happens (*Payout blocked · Add UPI ›*), and the *Get paid* Stepper appears at the top of the statement until it is fixed.

## 3. Get paid — account and PAN

- **Add UPI or bank account** → BottomSheet `select`: *UPI ID* or *Bank account* (Radio rows with pictograms). UPI → `form` sheet: one TextField *UPI ID* (`sushila@okaxis`), helper *It's in your UPI app, under your name*, Button **Verify and save** → a ₹1 verification with a spoken *"Your account is verified"* and the name from the bank shown for her to confirm (*Is this you? Sushila Devi*). Bank → account number and IFSC through the NumericKeypad (`otp`-style boxes for the account number, plain field for IFSC), then the same verification.
- **Add PAN** → MediaCapture `preview` with the `document` guide, then `tile` `done`; the number is read from the photo and shown for confirmation, never typed. The Nudge `gain` collapses when done and the tax row updates on the next statement.
- Both are also reachable from the *UPI / bank* and *PAN* rows; a Tag `warning` **Update** on the row means the bank rejected the last payout.
- Verification and PAN checks can take a day: the row shows `processing` with *Checking with the bank · usually a day* — and payouts are **not** blocked in the meantime if a previous account exists.

## 4. Early payout

- Row *Early payout · up to ₹25,000* → screen: Amount `L` picker with a NumericKeypad `amount` (₹ steps of 500, max the limit), the fee stated as a row *Fee ₹X (Y %)* and *You'll get ₹Z on Monday*, Button `primary brand L` **Take early payout** → `confirm` sheet with the consequence strip (*−₹3,000 from your 15 Mar payout · fee ₹X*), safe option **Not now** above, **Confirm** below (plain tap — it is her money; the sheet is the protection).
- It lands in the schedule as *Early payout · Processing* and in the statement as the *Early payout taken* deduction.
- Limit reached → the row shows *Available again after 15 Mar* and is not disabled without that reason.

## 5. History

- One list, newest first, Divider `labelled` per month; ListItem rows: date tile, *Monthly payout* / *Early payout* / *Winback bonus*, Tag state, Amount `S`; row opens a detail with the UTR (copy), the account it went to (masked) and **Help with this payout**.
- Skeleton on load; EmptyState *No payouts yet · your first is on 15 Mar*.

## 6. Paid — the moment

- On payout day: a notification *₹10,474 paid to your account* with the bank's name; in the app a Snackbar *₹10,474 paid · See ›*; the schedule row flips to `paid`. A short `celebrate` moment on the Earnings tab the first time she opens it that day — this is the whole point of the week (P6).
- Failed: notification + Snackbar with the fix; never silent.
- Help from any payout row opens Help with the payout pre-attached (the shipped *Payout Issue*).

---

## Content

- *You'll be paid* · *Earned* · *Cash you collected* · *Early payout taken* · *Loan EMI* · *Training kit EMI · 1 of 4* · *Locked bonuses* · *Paid* · *Processing* · *Blocked* · *Failed* · *On hold*.
- Dates: *15 Mar*, weekday when within a week (*Mon 15 Mar*); never *15/03/2025*.
- Tax: *Income tax · 20 % until PAN is added* → after: *Income tax · 10 %*. The Nudge: *Add PAN → tax drops to 10 %*.
- Never *Remaining Payout*, *Adjustments* for a deduction, *UTR* without the number, *under processing*.

---

## Spec follow-ups

- `icon-button.md`: `caret-left` / `caret-right` month pager — allowed in the DatePicker header **and** the earnings statement header (same component).
- `icons.md`: register `copy` (copy a reference number — UTR, job ID), `receipt` (payout history), `hand-coins` (early payout).
- `amount.md`: add `S` negative rows for deductions in a breakdown (already covered by `negative`; note the *−* precedes the ₹).
- Pattern *earnings breakdown* (to come) owns the Today / Week views and the Tabs root; this page owns Month and everything about being paid.

---

## Checklist for the flow

- [ ] The hero says what reaches her account and when; the earned total is one row.
- [ ] Every payout row has a state Tag and, if blocked or failed, the fix on the row.
- [ ] When an account or PAN is missing, the *Get paid* Stepper is the first thing on the statement.
- [ ] Deduction labels read in her words in Kannada at 1.3 (*Cash you collected*, *Training kit EMI · 1 of 4*).
- [ ] UTR copies with one tap; *Processing* never shows a spinner or a percentage.
- [ ] Field review with experts (checklist rows 15–16) — pending; test the UPI verification moment.
