# Build plan — EMI Recovery Engine v1

Written **before** the first artboard. One row per region of every screen. Sources in this order and no other:
**shipped app → `patterns/` → `components/` → Mobbin → invention.** Read all three system sources first, every time
(`CLAUDE.md` § Before you draw a screen).

## S · Suspension screens (2026-10-18)

**Source structure:** the lead's planned screens, *Expert App 2.0* section `25013:170243` — `25013:170245` *Account
paused*, `25013:170428` *Temporarily suspended*, `25013:170620` *Account terminated* (read:
`reads/figma-suspension-2026-10-18/`). The lead's brief: keep this structure, make it less text-heavy, and for a
suspended expert advertise the money she gets back when she rejoins (`SCOPE.md` Q4).

Paper: page **Figma · suspension (as planned)** copies the three frames exactly. Page **Suspension · lighter** builds
S1–S3 on that structure. Shared chrome on S1–S3 is the Figma frame's own, copied, not redrawn.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| S1–S3 · status bar, tinted top band, Home header (bell · Saathi · coins) | the planned Figma frame, as drawn | `25013:170428` | — | — |
| S1–S3 · "More from Snabbit" carousel · bottom tab bar | the planned Figma frame, as drawn (S3 has neither, as planned) | `25013:170428` | — | — |
| S1–S3 · status card shell (white, radius, padding 16, centred) | the planned Figma card | `25013:170465` | EmptyState `section` order: picture → title → one line → Button (`components/empty-state.md` § Anatomy) | — |
| S1–S3 · picture (Figma: grey 80 dp circle) | pictogram, illustration layer | `foundations/assets.md` § Pictograms: S1 `asset/picto/calendar-✗` (*not available*), S2 and S3 `asset/picto/profile-blocked` | EmptyState picture slot | — · **placeholder** until the asset file is pulled from *Snabbit Assets*; the placeholder names the picture, no text compensates (P1) |
| S1–S3 · title | the planned title, sentence case | `25013:170469` (H3 20 SemiBold) | EmptyState title role | — |
| S1 · reason (Figma: two body lines incl. "Contact Support to resume work") | one line, BodyMd `textBody` — *Absent 5 days without telling us* | `components/empty-state.md` body slot | ≤ 1 line; the instruction line is deleted — the Button says it (P1 delete-a-line) | — |
| S2–S3 · reason (Figma: tinted box, `Reason` heading + sentence) | `Banner` `error`, title only | `components/feedback.md` § Banner | the planned red-50 box and warning icon; the word *Reason* goes — the icon and tint say it | — |
| S1–S2 · the one next action | `Button` `primary brand L` *Request to come back* | `components/button.md` | Figma's Button (radius 10, 16 SemiBold) | — (S1's planned Button is outline; made primary because it is the screen's one action, P2) |
| S1–S2 · the money she gets back | `Nudge` `gain` attached under the Button: *Come back by 15 Jan* → **₹2,600 back** | `components/nudge.md` | 40 dp, `radius.md`, `bgReward`, `arrow-right` disc; consequence as an Amount, not asset + count (**ask of core**, `TIERS.md` gap 2) | — |
| S2 · Contact support | `Button` `secondary` *Call help* with `headset` | `components/button.md` · `foundations/icons.md` `headset` | below the Nudge, never beside the primary (P2) | — |
| S3 · Raise a dispute | `Button` `secondary brand L` | `components/button.md` | the planned outline Button | — · no Nudge: terminated experts get no EMI message (PRD § 8 rules, E19) |

## The story every flow below uses (PRD Case 7, Short band)

One expert, one set of numbers, so the screens agree with each other. Sep: kisht 1 of 6, ₹700. **Oct: inactive** (no
shift in her last 7 days), earned ₹5,000 → the run takes ₹3,300 = kisht 2 ₹700 **kept as EMI** + **₹2,600 kept for
her**; payout ₹1,700 on 15 Nov. Window: she gets the ₹2,600 back if she is working by **15 Jan** (engine date, Q2).
**Nov: back** → kisht 3 ₹700 and **+₹2,600 back**; earned ₹12,000, payout ₹13,900 on 15 Dec. If she never returns:
at the Jan run the ₹2,600 goes into her EMI and the EMI is paid off (Paid ₹4,000). Row label stays the shipped
*Training and uniform set · Deducted EMI (n/6)* (Q5 skipped → shipped format).

Chrome on A, B and D is the shipped *WIP – Payout I* frames' own (`3553:12166` frame 4 · `5722:10902`), rebuilt from
native-size crops and design context; C reuses the Home chrome already copied on page *Figma · suspension (as planned)*.

## A · Payments screen – ledger (Earnings → Month)

Source: shipped *Monthly Earnings* `3553:12166`, frame 4 (UPI + PAN added) — `reads/figma-payout-monthly-2026-10-18/`.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A1–A2 · status bar, header (back · Expert ID · *Payout Issue*), month pager | the shipped frame, as drawn | `3553:12166` frame 4 | — | — |
| A1–A2 · statement card (green band, scallop, rows, divider, *Remaining Payout*, payout schedule panel) | `Statement` month use — the shipped card | `components/statement.md` · shipped frame | — | — |
| A1 · the EMI row with what was kept | `Statement` row + **`breakup`** panel: *Kisht 2 of 6 · ₹700* and *Kept for you* · Amount `locked` **₹2,600** | `components/statement.md` § Slots `breakup` · `components/amount.md` `locked` | — | — |
| A1 · what to do, by when | `Banner` `brand` `facts`, page slot under the header: *₹2,600 is kept for you* · facts *Comes back if you work by · 15 Jan* | `components/feedback.md` § Banner | — | — |
| A2 · money back | `Statement` row, Amount `positive` **+₹2,600**, description *Kept in October* | `components/statement.md` · `amount.md` `positive` | icon: money coming back (gap 3, proposed `arrow-u-down-left`) | — |
| A1–A2, E5 · way into the EMI ledger (B) | `Statement` row with `caret-right` — the EMI row (and A2's *Money back* row) inside the Total Earnings card opens the ledger. **No separate EMI card** in Monthly Earnings Breakdown, which stays as shipped (lead, 2026-10-18) | `components/statement.md` § Slots `rows` (*optional `caret-right` when the row opens a detail*) | — | — |
| A1–A2 · Monthly Earnings Breakdown rows below | the shipped frame, as drawn (first rows; the screen scrolls) | `3553:12166` frame 4 | — | — |

## B · Ledger — the EMI's own history (v4, 2026-10-18: the shipped list, plain words)

The lead: it must look like the app, and the ledger must be **transparent** — every rupee, with its reason. v2 (circles),
v3 (month blocks) and an exploration page (earnings A–C, ledger A–C) were rejected and deleted. The confusion was the
invented vocabulary, so the words are now the ones she already knows:

| Word on screen | Means | Replaces |
| --- | --- | --- |
| **EMI n** | the month's normal cut | *Kisht n* |
| **Advance EMI** | next months' EMI cut early while suspended / inactive | *Kept for you*, *Taken early*, *Held* |
| **Refund** | the advance EMI coming back | *Money back*, *Returned* |
| **Pending** | still to pay — total left, or the part of an EMI not cut | *Left*, *Carried forward*, *Moves to* |

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| header | the shipped TopNav, title *EMI · Training and uniform* | `5722:10905` | — | — |
| totals | the shipped *Total Amount* row, three of them: Total EMI ₹4,000 · Paid ₹2,400 · **Pending ₹1,600** | `5722:10907` | — | — |
| next | a date group in brand: *NEXT · 15 NOV 2026* — EMI 5 ₹700 · *Pending from EMI 4 ₹400 · Not cut in Oct · low earnings* (dashed discs: not cut yet) | `5722:10914` group | — | — |
| history | the shipped date groups, newest first: 15 OCT *EMI 4 · part −₹300 (₹300 of ₹700 · ₹400 pending)* · 15 SEP *Refund +₹2,600 (Advance EMI returned)*, *EMI 3 −₹700* · 15 AUG *Advance EMI −₹2,600 (EMI 3 to 6 · cut while suspended)*, *EMI 2 −₹700* · 15 JUL *EMI 1 −₹700* | `5722:10915` rows: 40 disc · 14 Medium title · 12 detail · 16 amount | — | — |

Same words applied to A1, A2, E5 (statement breakup, banners) and D2, E6 (early payout breakup).

**v5 (2026-10-18) — timeline.** Lead: v4's approach is right but too text-heavy; make it a series of events and end on
what she has to pay. Same words, fewer of them: one card of events oldest → newest, each a date · a coloured dot on a
rail · one label · amount (sub-line only on Advance EMI, Refund, part EMI); dot colour carries the kind — grey EMI,
brand Advance EMI, success Refund, warning part paid, ink for the start (*EMI starts ₹4,000*). It ends on a card:
**Pending ₹1,600** (Display) with *Next · 15 Nov ₹1,100 · EMI 5 + ₹400 pending*. Built from the shipped list's row
anatomy (date caption · 16 amount) plus a `Stepper`-style rail (`components/stepper.md`, vertical list). v4 kept beside
it for comparison.

**v5 reorder (2026-10-18) — newest first.** Lead: the order was confusing; the top should be the most recent. Agreed —
the shipped payout history and any bank statement read newest first. The summary card (**Pending ₹1,600** · *Next ·
15 Nov ₹1,100*) moves to the top, and the events run down into the past: EMI 4 → Refund → EMI 3 → Advance EMI →
EMI 2 → EMI 1 → *EMI starts ₹4,000* at the bottom, where the rail ends. Row anatomy and dot colours unchanged.

## C · Inactive experts come back (Home)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| C1–C4 · status bar, band, Home header, tab bar | Home chrome as planned | `25013:170245` (copied) | — | — |
| C1–C4 · shift card with *Log in* | Card + `Button` `primary brand L` *Log in* | `components/button.md` · `patterns/payout.md` | **assumed** — no normal Home frame could be read (connector fails on *Go live*); replace with the shipped Home card when a frame link arrives | shipped Home (not readable) |
| C1 · the money offer | `Nudge` `gain` attached under *Log in*: *Log in by 15 Jan* → **+₹2,600** | `components/nudge.md` | consequence as Amount (gap 2) | — |
| C2 · last 7 days | the same Nudge; the line reads *6 days left · log in by 15 Jan* (Timer `deadline` text, no ring) | `nudge.md` § Behaviour | — | — |
| C3 · back at work, refund due | `Banner` `success` under the header: *Welcome back · ₹2,600 comes back in your November pay*; the Nudge is gone (condition met) | `feedback.md` · `nudge.md` § Behaviour | — | — |
| C4 · payout day | `Snackbar` *₹13,900 paid · includes ₹2,600 back* · *See* | `feedback.md` § Snackbar · `payout.md` § 6 | — | — |

## D · Early payout (rebuilt 2026-10-18 on the lead's latest designs — SCOPE R1, R2, R1a)

Source: *Expert Tier – Snabbit Coins* `e3zridA0BkXzq6yLZtVWvm`, *Benefits* → *Early payout* (`2870:72381` landing ·
`2870:73298` / `2870:73235` amount · `2870:73361` success · `2870:73161` after) — `reads/figma-early-payout-2026-10-18/`.
Replaces the keypad / fee / locked screens drawn earlier from `patterns/payout.md` § 4 (deleted from Paper).

Logic (R1a, design lead 2026-10-18): early payout works off the month's earnings, which start at ₹0 on the 1st. In
the month she comes back, they **start at ₹0 + the money back** — so she reaches the early-payout limit sooner. The
max is half of those earnings on the lead's frames (₹14,200 → ₹7,100); the real formula is in Kishan's sheet.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1–D4 · header, Gold tag, Max card, Withdraw, tips, Android nav | the lead's frames, as drawn | `2870:72381` · `2870:73235` · `2870:73361` | money bag and Gold tag are Figma exports | — |
| D1 · money kept (October) | the landing + an inline `Banner` `brand` in the card: *₹2,600 kept for you · Counts here when you work by 15 Jan* | `components/feedback.md` § Banner | — | — |
| D2 · back (November) | the landing; *Total earnings ₹14,200* gets a `Statement` `breakup`: *Money back · on 1 Nov ₹2,600* first (her starting point), then *+ Earned in November ₹11,600* | `components/statement.md` § Slots `breakup` | — | — |
| D3 · amount | as the lead drew it (₹5,000 of ₹7,100, *Remaining amount ₹2,100*) | `2870:73235` | — | — |
| D4 · success | as the lead drew it; confetti left out of the copy | `2870:73361` | — | — |
| C4 · the moment she is back | `Snackbar` *₹2,600 back counts in early payout* · *See* → D2 | `feedback.md` § Snackbar | — | — |

Deviations from the lead's frames: amount weight 700 → 600 (the system has 400 / 500 / 600 only); dark button bound
to `bgInverse` (gray-900) where the frame uses gray-800.

## E · Suspended → back (2026-10-18, design lead's flow; SCOPE R3–R5)

Story (Short band, money kept only at month end — lead's answer): suspended **21 Jul** · **31 Jul run** while suspended:
earned ₹5,000 → takes ₹3,300 = kisht 2 ₹700 + **kisht 3–6 taken early ₹2,600** · payout ₹1,700 on 15 Aug · window: back
by **31 Oct** · opens the app **27 Aug** · requests a callback · account activated · active at the **31 Aug run** →
₹2,600 back in the **15 Sep payout**, and in August early payout her earnings start from ₹2,600 (R1a).
One suspended state only (R3). The money shows on the suspended screen too (lead, 2026-10-18; R5 closed).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E1 · suspended Home | page *Suspension · lighter* S2 (Home chrome, status card) | Paper `S2` · `25013:170428` | — | — |
| E1 · reason | `Banner` `error`, one line: the reason the system captured | `feedback.md` · R4 | picture-led reasons (2.0 screens) are a follow-up | — |
| E1 · the money | `Nudge` `gain` under *Request to come back*: *Come back by 31 Oct* → **+₹2,600** | `nudge.md` (₹ consequence = ask of core) | — | — |
| E1 · second action | `Button` `secondary neutral M` *See earnings* (`currency-inr`) | `button.md` · `icons.md` | replaces *Call help* (R4) | — |
| E2 · request sent | `BottomSheet` `info`: picture (placeholder), *Our team will call you*, `Button` *Got it* | `bottom-sheet.md` | — | — |
| E3 · waiting | E1 card: title *We'll call you soon*, one line *Request sent on 27 Aug*; the Nudge stays (condition still open); no primary — *See earnings* only | `empty-state.md` `waiting` kind · `nudge.md` | — | — |
| E4 · activated | Home (C3) with `Banner` `success` *You're back · ₹2,600 comes in your 15 Sep payout* | page C · `feedback.md` | — | — |
| E5 · earnings (July) | A1 statement; breakup *Kisht 2 of 6 ₹700* + *Kisht 3–6, taken early* Amount `locked` ₹2,600 *comes back to you*; Banner `success` *₹2,600 comes back to you · in your 15 Sep payout* with a link *Use it in early payout ›* | `statement.md` · `feedback.md` | — | — |
| E6 · early payout (August) | D2 with August numbers: *Money back · on 27 Aug ₹2,600* + *Earned in August ₹1,200* = ₹3,800 → max ₹1,900 | page D | — | — |
| E7 · account inactive (not suspended) | Home (C3 / E4) — *Log in* stays the one action; inline `Banner` `success` *You're back* · *₹2,600 we kept while you were away comes back in your 15 Sep payout* | page C · `feedback.md` | — | — |

### E · suspended → back, redrawn on S5 + S5b (2026-10-18)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E1 · money card (top of band) | `ListItem` (lead's card A) | lead's edit, explore page A | 40 bag · BodyLg 600 title · BodyMd secondary line | — |
| E1 · status card | shipped Home status card, stacked | `references/shipped-app-*` Home band · `components/button.md` | three levels only: Heading3 title → one `primary` L button → BodyMd secondary link *See 2 reasons ›* | the error Banner (removed: the picture says the reason) |
| E1 · picture | suspended character, Figma `37231:320919` | `reads/figma-suspension-cases-2026-10-18/` | 120 × 80, radius lg | — |
| E1b · reasons | `BottomSheet` `info` | `components/bottom-sheet.md` | scrim bgInverse 60 % · radius xl · grabber 32 × 4 · ✕ inside top-right · one picture + one line per reason · one `primary` | rows inside the card (S3), tiles (S2) |
| E2 · request sent | `BottomSheet` `info` (moved from old E2) | `components/bottom-sheet.md` | — | — |
| E3 · waiting | same stacked status card, no button | as E1 | money card line becomes *Comes back when you're active again* | — |

Old E1–E3 kept on the explore page, row 3, as archive.
| E4 / E7 · money card | card A, *coming back* state | as E1 | *₹2,600 coming back to you* · *You're back · in your 15 Sep payout*; replaces the green inline strip in the shift card | — |
| E5 · taken rows | `Statement` rows, flat | `components/statement.md` § Anatomy | one row per deduction, icon 18 · BodyMd label · Caption sub · BodyMd 500 signed amount · chevron → EMI ledger; the sum reads straight down (5,000 − 700 − 2,600 = 1,700) | nested grey breakup box under one −₹3,300 row (removed: a total of a total, and a locked-looking amount being subtracted) |
| E5 · July earnings (F1) | shipped Earnings page, Figma `6582:38248` | `reads/figma-earnings-page-2026-10-18/` | Pay Summary row anatomy: *EMI 2 of 6 −₹700 ›* + one new row *Advance EMI −₹2,600 · Comes back on 15 Sep ›*; rows add up to Remaining Payout | locked/grey treatment (rejected: the money was taken) |
| E5b · August earnings (F3) | same page | as above | *EMI 3 of 6 −₹700* · *Advance EMI back +₹2,600* green; Withdraw Early Payout sub-line *Your ₹2,600 back counts here* | — |

## L · Ledger v3 — two cards (2026-10-21, lead: "just two cards, one is paid, one is to be paid; Snabbit pays me = green")

Replaces E8 / E8 v2 (timeline, Total/Paid/Pending, 6-segment bar — nobody understood them). One page, two cards, newest
first inside each. Rows are the statement's own row so the page reads like the Total Earnings card she tapped from.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| L* · header | `TopNav` *Training and uniform*, back | shipped (lead's E8 frames) | — | — |
| L* · card *To be paid* | `Statement` card (white, radius 16, padding 16) — header label `Body-L/18 SemiBold` + total `H3/20 SemiBold`, `Divider`, rows | `components/statement.md` · shipped Total Earnings card | row gap 16 · total trailing | — |
| L* · card *Paid* | same card | same | same | — |
| L* · row | `Pay Summary - List` `With Subheader` (label 14 · sub 12 · amount 14), icon slot hidden, no chevron | DS library · shipped statement rows | 14/12 pairing, amount trailing | — |
| L* · money back to her | same row, label + amount `Green/color-green-700`, `+₹` | statement *Remaining Payout* green | — | — |
| L* · nothing to pay | same card, one row, `check-circle` | `components/statement.md` empty | — | — |

Sub-line grammar: **which payout** first (*15 Nov payout*), then the one thing that is different (*₹400 left from Oct*,
*kept while suspended*, *no earnings · nothing cut*). Cases: L1 back + refunded (main) · L2 suspended, waiting · L3
not back by 31 Oct · L4 earned less, big catch-up · L5 paused months · L6 all paid.

## H · Home come-back top section — four directions (2026-10-21)

Each direction is three screens on the lead's inactive Home (`545:63660`): Home → tap → after. Only the card slot above
*Attendance* changes; band, header, Attendance, banners and tabs are his.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| H* · Home card | shipped Home card slot (card A) — white card, radius 12, padding 12–16 | lead's frames `545:63660` | bag picture 40 · title Body-M SemiBold · line Body-S | — |
| H* · sheet | `BottomSheet` (grabber, one hero, rows, one Button) | `components/bottom-sheet.md` · C3 sheet | one hero per sheet | — |
| H* · rows | ListItem anatomy from ledger v3 (40 disc, 16 / 14, amount trailing) | BUILD § L | same | — |
| HB · path | `ProgressBar` linear S inside the row | `components/progress-bar.md` | track radius full | `Stepper` (onboarding only, too heavy) |
| HC · jobs | ListItem with `map-pin` / `briefcase` | `components/list-item.md` | — | — |
| HD · status | `trophy` tier row, rating as a number | `components/list-item.md` | — | `HeroCard` (too big for the slot) |
