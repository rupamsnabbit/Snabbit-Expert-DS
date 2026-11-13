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
| Payout Schedule: date tile + name + status line (*Paid on 5 Feb · UTR…* / *Payment is under processing…* / *Add UPI / bank account to enable payout ›*) | ListItem with a date tile leading, Tag for status (`success` Paid · `warning` Processing · `error` Blocked · `error` Failed), status line as supporting text, UTR with a **copy** IconButton; Blocked and Failed rows carry the fix as a Button `secondary M` | State by Tag + words + icon, not by a coloured sentence (row 4); the fix is on the row that needs it (P2). **Withdrawn 2026-10-23**: the shipped tile + status line is kept and given tones and an icon (`statement.md` § *Schedule row status*); the fix opens one tap down, because the Statement holds no Button |
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

> **2026-10-23 — the payout journey** (`projects/payouts-revamp`). Today she sees only a payout's final status.
> She now sees **where her monthly payout is at every step**, on the **one row that already ships** — the
> *Monthly payout* row in the statement's *Payout schedule* panel. Each step is a **status** of that row, rendered
> by `statement.md` § *Schedule row status* (date-tile tone + icon + one status line). Anything she must read or do
> opens one tap down in a BottomSheet `info`. The Tag-per-row proposal of 2026-09-22 is withdrawn in favour of the
> shipped tile and line.

**One row, its current step only.** Earlier attempts are never listed; the row moves on.

```
 approaching ─► sent ─► paid
 (T−2 … T)       │
                 └─► failed ─► retrying (in [X] hours) ─► sent ─► paid
                                   │  (two automatic retries)
                                   └─► send it yourself ─► sent ─► paid
                 └─► bank details wrong ─► (she fixes them) ─► next batch ─► sent
 bank not added ─────────────────────────► (she adds a bank) ─► next batch ─► sent
```

| Step | When | Tone | Status line (her words) | Icon | Opens |
| --- | --- | --- | --- | --- | --- |
| `approaching` | from 2 days before the trigger date | `neutral` | *Coming on 2 Nov* | `calendar-blank` | — |
| `sent` | the trigger date | `moving` (blue — fine, on its way; 2026-10-29) | *Sent · in your bank by 3 Nov* | `clock` | — |
| `paid` | the bank confirms | `done` | *Paid on 3 Nov · UTR 1234567890* | `check-circle` | sheet: UTR with **copy** (Toast *Copied*), the account it went to (masked), *Payout issue* → Help |
| `retrying` | an attempt failed; an automatic retry is due | `waiting` | *Didn't reach your bank · trying again in [X] hours* | `arrow-clockwise` | sheet `info`: reason pictogram · the reason in one line · *We'll send it again at 2 pm. You don't need to do anything.* · **Got it** |
| `send-yourself` | the second automatic retry also failed | `needs-her` | *Couldn't send it · send it yourself* | `x-circle` | sheet `info`: reason · one Button `primary brand` **Send to my bank** → the row returns to `sent` |
| `details-wrong` | the failure is her account (wrong number, closed account) — retrying cannot fix it | `needs-her` | *Bank details are wrong · fix them* | `bank` | sheet `info`: *account details* pictogram · *Your bank couldn't find this account* · **Fix bank details** → § 3 |
| `blocked` | no bank account added — at any step, through every trigger date | `needs-her` | *Add a bank account · your payout waits until you do* | `bank` | § 3 *Get paid* |
| `next-batch` | she has just added or fixed her bank after a trigger date | `neutral` | *In the next batch · sent on 3 Nov* | `calendar-blank` | — · plus a Toast at the end of § 3: *Bank account added · your payout goes on 3 Nov* |
| `held` | ops has paused it | `waiting` | *On hold · talk to us about this payout* | `clock` | sheet: **Call Saathi** (the shipped *Payout Issue* menu) |

**Rules**

- **Red means she must act; amber means we are acting** (`statement.md`). `retrying` is amber even though an attempt failed: she has nothing to do, and the line says so. Red is only `send-yourself`, `details-wrong` and `blocked`.
- **Every failure names its reason** — in the sheet, one line and one pictogram. Until the payment partner's list is mapped, three reasons: **the bank's side** (*Your bank didn't accept it today*, `bank` ✗) · **our side** (*We couldn't send it — our problem, not yours*, `transfer` ✗) · **account details** (*Your bank couldn't find this account*, `passbook` ✗). The first two retry; the third goes to `details-wrong`.
- **Dates, not durations, for the monthly payout.** *In your bank by 3 Nov*, never *within 24 hours*. The retry time is a placeholder *[X] hours* until the gap is configured.
- **Trigger dates.** The 2nd of the month from October 2026; the 1st from January 2027. `approaching` starts two days before.
- **PAN missing** does not change the row. It is said in the three shipped places, in one message: the *Income tax (20 %)* row, the *Add your PAN card* card, and the tax sheet — *20 % tax is cut until you add PAN. With PAN: 1 %.*
- **Nothing on Home** (ask of 2026-10-23). The status lives on the statement; notifications are § 6.
- **This journey is the monthly payout's.** Bonus rows in the schedule (*Winback*, *Joining*) keep `neutral` / `paid` / `blocked` as shipped.

## 3. Get paid — account and PAN

- **Add UPI or bank account** → BottomSheet `select`: *UPI ID* or *Bank account* (Radio rows with pictograms). UPI → `form` sheet: one TextField *UPI ID* (`sushila@okaxis`), helper *It's in your UPI app, under your name*, Button **Verify and save** → a ₹1 verification with a spoken *"Your account is verified"* and the name from the bank shown for her to confirm (*Is this you? Sushila Devi*). Bank → account number and IFSC through the NumericKeypad (`otp`-style boxes for the account number, plain field for IFSC), then the same verification.
- **Add PAN** → MediaCapture `preview` with the `document` guide, then `tile` `done`; the number is read from the photo and shown for confirmation, never typed. The Nudge `gain` collapses when done and the tax row updates on the next statement.
- Both are also reachable from the *UPI / bank* and *PAN* rows; a Tag `warning` **Update** on the row means the bank rejected the last payout.
- Verification and PAN checks can take a day: the row shows `processing` with *Checking with the bank · usually a day* — and payouts are **not** blocked in the meantime if a previous account exists.

## 4. Early payout

> **2026-10-23 — as shipped, plus its missing states** (`projects/payouts-revamp`;
> `references/shipped-app-2026-10-23-early-payout/`). The earlier proposal here (NumericKeypad, fee row, confirm
> sheet) is withdrawn: the live flow is kept — *Max. early payout* card · **Withdraw** · *How much do you need?* with
> an amount field and slider · *Arrives in your bank* · the sent screen · *Recent withdrawals*.

Early payout runs the § 2 journey with three differences: **no `approaching`** (she asks for it), **no automatic
retry** (a failure waits for her), **no PAN message**.

| Step | Where she sees it | Rendering |
| --- | --- | --- |
| `sent` | the shipped sent screen, then the *Recent withdrawals* row | screen: *₹5,000 will reach your bank in [X] hours* (hours, as shipped) · row: Tag `info` **On its way** with `clock` (blue: moving, nothing wrong — `statement.md` § Schedule row status) |
| `paid` | *Recent withdrawals* row | Tag `success` **Paid** with `check-circle` (the shipped *● Successful* pill); the row opens the UTR sheet as § 2 `paid` |
| `failed` | *Recent withdrawals* row **and** the home card | row: Tag `error` **Failed** with `x-circle`, opens a sheet `info`: reason (§ 2 reasons) · **Send again** `primary brand` → `sent`. Home card: a Banner `error` above **Withdraw** while a failure is unresolved — *₹5,000 didn't reach your bank · Send again ›* (the whiteboard's *nudge to re-trigger*). As many times as it takes |
| `details-wrong` | as `failed` | the sheet's action is **Fix bank details** → § 3 instead of *Send again* |
| `blocked` | home card | **Withdraw** is replaced by **Add bank account** (one next action, P2) and a Banner `warning` says *Add a bank account to take an early payout*; the amount screen is not reachable |

- It lands in the month statement as the *Early payout* deduction once `paid`.
- Limit reached → the card shows *Available again after 2 Nov*; **Withdraw** is never disabled without that reason.

## 5. History

- One list, newest first, Divider `labelled` per month; ListItem rows: date tile, *Monthly payout* / *Early payout* / *Winback bonus*, Tag state, Amount `S`; row opens a detail with the UTR (copy), the account it went to (masked) and **Help with this payout**.
- Skeleton on load; EmptyState *No payouts yet · your first is on 15 Mar*.

## 6. Paid — the moment

- On payout day: a notification *₹10,474 paid to your account* with the bank's name; in the app a Snackbar *₹10,474 paid · See ›*; the schedule row flips to `paid`. A short `celebrate` moment on the Earnings tab the first time she opens it that day — this is the whole point of the week (P6).
- Failed: a notification with the reason and what happens next (§ 2); never silent. No Snackbar on Home (2026-10-23).
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
