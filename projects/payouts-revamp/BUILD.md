# Build plan — Payouts revamp

Written **before** the first artboard. One row per region of every screen. Sources in this order and no other:
**shipped app → `patterns/` → `components/` → Mobbin → invention.**

**The rule for this project (design lead, 2026-10-23): same screens, no behaviour change — only understandable.**
Every screen is a **duplicate of a live screen** copied exactly from Figma into the Paper file *Payouts revamp*
(`01M5KTVK34DK436Z84NN3P6D5X`, page *Live · as shipped (from Figma)*). A region not listed here is left exactly as
shipped. Nothing collapses, nothing moves behind a new tap, no section moves.

## Workstream 1 — Monthly payout visibility

Base: `Live · Month statement · bank + PAN, paid` (Figma `6705:133456`). Only the *Monthly Payout* row in the
*Payout schedule* panel changes per screen; everything else is the base, untouched.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1.01–1.08 · whole screen | the live month statement, duplicated | `reads/figma-live-earnings/` · Figma `6705:133456` | — | — |
| 1.01 · schedule row *approaching* | Statement `schedule` row, status `neutral` | `components/statement.md` § Schedule row status · `patterns/payout.md` § 2 | shipped navy tile · status line BodyMd `textSecondary` + `calendar-blank` 16 | — |
| 1.02 · schedule row *sent* | same row, status `moving` (blue, 2026-10-29; was `waiting` amber) | same | status disc (white, flat `clock`) on a `bgInfoSubtle` wash · line `textInfoStrong` | — |
| 1.03 · schedule row *paid* | same row, status `done` — the shipped green row, re-toned | same | *Paid on 3 Nov · UTR …* as shipped wording order | — |
| 1.04 · schedule row *retrying* | same row, status `waiting` · `arrow-clockwise` · caret | same | — | — |
| 1.04b · *retry 2, last automatic try* | 1.04 duplicated, status line only: *Didn't reach your bank again · last try in [X] hours* | `statement.md` `waiting` · `payout.md` § 2 | — | — |
| 1.05 · retry sheet | `BottomSheet info` over 1.04; hero = **Stepper `tracker` · vertical** (Sent · Your bank didn't accept it · Sending again · In your bank, each with its time) in place of the pictogram and paragraph · title *We are sending ₹18,555 again* · Button *Got it* | `components/bottom-sheet.md` · `components/stepper.md` § `tracker` · vertical | rail tracker states, 40 dp node | — |
| 1.06 · schedule row *send it yourself* | same row, status `needs-her` · `x-circle` · caret | `statement.md` | — | — |
| 1.07 · send-yourself sheet | `BottomSheet info`; hero = Stepper `tracker` · vertical (Sent · Your bank didn't accept it · We tried 2 more times · **Send it now** (brand, she acts) · In your bank) · title *Send ₹18,555 to your bank* · Button `primary brand` *Send to my bank* | `bottom-sheet.md` · `stepper.md` | — | — |
| 1.08 · *bank details wrong* row + sheet | row `needs-her` · `bank` · sheet `info` with `asset/picto/passbook` ✗ · Button *Fix bank details* | `statement.md` · `payout.md` § 2 | — | — |
| 1.09 · *no bank* | the live red rows, duplicated from `Live · Month statement · no bank (red rows)` (Figma `6705:133579`) — status line re-worded only | `statement.md` `needs-her` | shipped red row, soft tile | — |
| 1.10 · *bank just added* | 1.09 duplicated: row → `neutral` *In the next batch · sent on 3 Nov* + `Toast` *Bank account added · your payout goes on 3 Nov* | `components/feedback.md` § Toast | — | — |
| 1.01b · *approaching, PAN missing* | 1.01 duplicated: tax row *Income tax · 20 % (no PAN)*, the totals that follow from it, a brand-subtle line in the bank card *20 % tax is cut · add PAN and pay only 1 %* ›, the live *Add your PAN Card* card in place of the PAN Details row | live screen · `payout.md` § 2 rules | — | — |
| Page · flow board | arrows and lane labels behind the screens, mirroring the whiteboard; the add / fix bank step is a labelled box pointing at the live flow, not a redraw | `reads/meeting-2026-10-22/` | — | — |
| 1.11 · *PAN missing* | the live *Income Tax (20 %)* row and *Add your PAN Card* card — words only | live screen · `payout.md` § 2 rules | — | — |

### Monthly payout card variations, round 2 (page *1b · Monthly payout card · variations*)

Round 1 (amount first · big date tile · journey rail) was rejected by the lead: *"dont like any … read mobbin, take multiple references, it should cater to all our cases"*. Round 2 comes from `reads/mobbin-payout-status/` (ten shipped references) and each direction is drawn in **all ten states**.

| Direction · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A · hero + 3-part bar | Statement `schedule` row tones; hero `Heading1` with the state icon 28; three-segment bar on the ProgressBar track; Statement `footer` band for her one action | `statement.md` · `progress-bar.md` | ProgressBar track 8 dp, radius full; footer band 48 dp | round 1 V1 (amount first) — no movement shown |
| B · Tag + tracker rail | `Tag` L in the state tone; Stepper `tracker` rail July · 2 Aug · 3 Aug; footer band | `tag.md` · `stepper.md` § `tracker` | rail 32 dp nodes; the stopped node in amber (we act) or red (she acts) | round 1 V3 (rail, no state name) |
| C · tinted status hero | the card's top takes the state's subtle wash; 64 dp disc + icon 32; one `Heading3` word or number + one line; amount row below; footer band | `statement.md` § Schedule row status | tone table neutral · waiting · done · needs-her · brand | round 1 V2 (date tile only) |
| **C2 · amount first** (lead: *"C looks most graspable but the hierarchy seems messed up, the copy as well; B and A are text monsters"*) | one block, read top to bottom: Caption *Monthly Payout* · Amount `Heading2` · one status line in the tone; leading 64 dp picture = the shipped **date tile** when the money is coming (*2 AUG*), a status disc with the icon when something happened; card wash only for amber / green / red; her one action is a white strip at the bottom with a caret | `statement.md` § Schedule row status (tile, tones, status line) | 64 dp tile (`spacing.11`), the tone table, footer 48 dp | C (amount demoted under the status word, *Not sent* three times) |
| **C3 · compact** (lead: *"taking a lot of real estate, maybe we play with the fonts"*) | C2 in two lines: *Monthly Payout* `BodyLg` Medium and the amount `Heading3` share line 1, the status `BodyMd` Medium in the tone is line 2; date tile and disc 48 dp (`spacing.10`, tile `Title` day + `Small` month); card ~80 dp, action strip 48 dp | `statement.md` § Schedule row status | the shipped row's two-line anatomy, bigger | C2 (~108 dp, amount on its own line) |
| **Card on every monthly screen** (lead: *"c3 works, update it on all monthly screens … make it clicky, add a chevron"*) | C3, line 1 = *Monthly Payout* `BodyLg` Medium · amount `BodyLg` SemiBold · 20 dp `caret-right` `textSecondary`; fill = vertical gradient, state wash → `bgPrimary` (neutral: `bgTertiary` → `bgPrimary`); the whole top area opens the journey sheet; the action strip (when present) does its own action | as C3 | — | — |
| **Journey sheet, v3** (lead rejected the icon rail and the first vertical one; *"keep it simple, like a vertical journey"*) | `BottomSheet info`: handle · state line `Heading3` in its tone + *Monthly Payout ₹18,555* `BodyMd` · Stepper `tracker` vertical, **one line per step**: 24 dp mark (done check · failed x red · now ring in the tone · next hollow) · name `BodyLg` · date `BodyMd` right · one `primary brand` Button | `bottom-sheet.md` · `stepper.md` § `tracker` · vertical · `reads/mobbin-payout-status/` § 8 | the vertical tracker's states, minus the second line per step | horizontal icon rail (rejected) · vertical with titles and times on two lines (rejected) |

## Workstream 2 — Early payout visibility

Base: the five live Early Payout frames, Figma *Expert Tier – Snabbit Coins* `e3zridA0BkXzq6yLZtVWvm` → *Benefits* →
*Early payout* (`reads/early-payout-live/`), copied exactly into Paper page *2 · Early payout · states*. A region not
listed here is left exactly as shipped. Flow per the whiteboard (`reads/meeting-2026-10-22/whiteboard-early-payout.webp`):
*Early payout → Trigger → Success / Failed, why? → Nudge to re-trigger*; *bank not added — case to be handled*.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 2.01–2.03 · home, amount, amount ₹5,000 | the live frames, unchanged | `2870:72381` · `2870:73298` · `2870:73235` | — | — |
| 2.04 · sent | live `2870:73361`, words only: *will be credited in your bank account within [X] hours* | shipped · `payout.md` § 4 `sent` | — | — |
| 2.05 · *Recent withdrawals* row, on its way | live `2870:73161`; the *● Successful* pill → `Tag` `warning` soft M *On its way* + `clock` 14 | `components/tag.md` · `payout.md` § 4 | the shipped pill's slot and size | — |
| 2.06 · same row, paid | same; Tag `success` soft M *Paid* + `check-circle` fill 14 | `tag.md` | — | — |
| 2.07 · same row, failed + the nudge | same; Tag `error` soft M *Failed* + `x-circle` 14 and a `caret-right` (the row opens 2.08); `Banner` `error` `standard` above **Withdraw**: `x-circle` · *₹5,100 didn't reach your bank* · action *Send again* | `tag.md` · `components/feedback.md` § Banner · `payout.md` § 4 `failed` | Banner inline, 12 dp from the card it refers to | — |
| 2.08 · failed sheet | the monthly journey sheet v3 (vertical, one line per step); was: monthly 1.07 sheet duplicated (`BottomSheet info`), words only: *We couldn't send your ₹5,100* · reason line · `primary brand` *Send again* → 2.04 | `components/bottom-sheet.md` · `payout.md` § 2 reasons | reason pictogram placeholder `transfer` ✗ / `bank` ✗ | — |
| 2.09 · account details wrong sheet | the monthly journey sheet v3; was: monthly 1.09 sheet duplicated, words only; *Fix bank details* → the live add/fix bank flow | `bottom-sheet.md` · `payout.md` § 4 `details-wrong` | `passbook` ✗ placeholder | — |
| 2.10 · no bank | live home duplicated; **Withdraw** → *Add bank account* (same Button) + `Banner` `warning` `bank` *Add a bank account to take an early payout* | `payout.md` § 4 `blocked` · `feedback.md` | — | — |
| Page · flow board | arrows and lane labels behind the screens, mirroring the whiteboard; the add / fix bank step is a labelled box pointing at the live flow | `reads/meeting-2026-10-22/` | the monthly board's style | — |

## Workstream 3 — Month statement that adds up

Base: the live statement *bank + PAN, paid* (Figma `6705:133456`), where both sums hold (`reads/statement-math/` § 7).
Drawn on Paper page *3 · Statement · one total*.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 3.00 · whole screen | the live statement, unchanged — the *before* | Figma `6705:133456` | — | — |
| 3.01 · whole screen | 3.00 duplicated | same | — | — |
| 3.01 · list heading | live heading text, re-worded *How ₹24,255 adds up* | `statement.md` § Content (the title says what the figure is to her) | Title SemiBold as shipped | — |
| 3.01 · closing band | **removed** — the live *Total Earnings* band repeated the card's band | `statement.md` *Don't*: two totals | — | — |

## Workstream 4 — Trust and safety (penalty · held month)

Ask: `prd.md` § B · v3. Iterated on Paper page *4 · Trust and safety*, then built in Figma beside *Monthly Payout*.
Base screen: **1.01 · Approaching** with the lead's statement card (Figma `1111:280`, card `1314:7540`); base sheets:
the A journey sheet (`1176:2869`) and the must-act landing sheet with Saathi (`1272:5175`). Numbers: penalty ₹2,000 on
Job ID 15567 (earned ₹450) → deductions −₹7,945, payout ₹16,555; held month ₹18,555.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 4.01 · whole screen | 1.01 duplicated, statement card = the lead's card | Figma `1111:280` · `components/statement.md` | everything not listed is the base | — |
| 4.01 · penalty line (A) | a *Deductions* line, the same row as *Training and Uniform Fees*: leading icon 20 · label Body-S · sub-line Caption `gray-500` *Job ID 15567* · amount Body-S Semibold · `caret-right` (the line opens a sheet, like *Daily Earnings*) | the lead's card `1316:5699` · `statement.md` § Rows | 48 dp min row, divider `gray-100` | — |
| 4.01b · penalty line (B, the lead's idea) | same line, an `info` 16 after the label instead of the caret | same | — | — (needs `info` re-registered: today *never an (i) tooltip trigger*) |
| 4.01 · penalty icon | `shield-warning` regular 20 | `foundations/icons.md` — **to register** (*a trust and safety case*) | the other deduction icons' size and colour | `warning-circle` (already *attention* on Banners) · `prohibit` (*block a customer*) |
| 4.02 · sheet on landing | Sheet 4 style (`1272:5175`): cross · tint `gray` · Tag · amount Display · one line · Button · Saathi Orb | `components/bottom-sheet.md` `info` · Figma `1272:5175` | tone **neutral grey**, not red: she cannot act (P5) | — |
| 4.03 · penalty sheet (from the line) | the A journey sheet shell (`1176:2869`) with a `Statement`-row list in place of the steps: *Job ID* · *You earned on this job* · *Trust and Safety Penalty* | `bottom-sheet.md` · `statement.md` § Rows | pictogram circle 96 · H2 title · Body-M line | Stepper (there is no sequence to show) |
| 4.11 · sheet on landing (held) | Sheet 4 style as 4.02, tone `warning` (amber), Tag *Payout on hold* + `clock` | same · `patterns/payout.md` § 2 `held` | — | — |
| 4.12 · payout card, held | the Monthly Payout card: tile `yellow-50`/`yellow-700` with `clock` in place of the date · line 2 *On hold* in `yellow-700` | `statement.md` § Schedule row status `waiting` · `payout.md` `held` | the card as shipped | — |
| 4.12 · Request Early Payout | the Other Actions row, line 2 *Not this month* `gray-500`, `lock` 16 | `payout.md` § 4 `blocked` · `icons.md` `lock` | the row as shipped | — |
| 4.13 · held journey sheet | the A journey sheet: three fixed stages *Earned* (done, grey) · *On hold* (current, amber) · *In your bank* (planned, grey) | `components/stepper.md` § tracker · vertical · the A rule | — | — |

## Workstream 5 — prorated Min G (prd v4, 2026-10-30)

Built from the live **Daily Earnings** day view (*Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM` → EARNINGS → *Daily Earnings* `6582:25063`; read in `reads/figma-master-earnings/`) and, for the warning, the shipped shift logout. Numbers are placeholders: 5 h shift 7:00 AM – 12:00 PM, Min G ₹500, Base Pay ₹390, 30 min early = ₹450.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1 · full Min G | live day view *Present · Full Shift*; *Min G ₹500* paid, *Base Pay* greyed | `6582:25063` frame *Base pay and ming to be shown separate* | as shipped | — |
| D2 · prorated (left in the last hour) | live *Full shift + Last job denied (proportionate MinG)* / *Missed full shift because of early logout* | same section | the shipped *Last Hour Min G Loss* row, negative Amount | — |
| D3 · no Min G, late login | live *No show applied but CT logged in expert late* (late login line) | same section | Min G row greyed + one reason (Tag), *Late Login* in Shift Performance | — |
| D4 · no Min G, early logout | live *Missed full shift because of early logout* | same section | Min G row greyed + one reason, *Early Logout* in Shift Performance | — |
| W · before she ends early | the shipped shift logout confirm (Shift Lifecycle `WEUPV9q19eAqRbkZSBj6OY`) and the shipped Nudge strip (*Login by 6:40 AM · coins*) | `components/bottom-sheet.md` `confirm` · `components/nudge.md` `loss` | one hero: the amount she keeps vs loses; safe option first, costly option needs a hold (P3) | — |


## Workstream 1 · v5 — months waiting for a bank (prd v5, 2026-11-03)

Iterated on Paper page *1c · Months waiting (no bank)*. Base screen: **H2 · Held · Earnings rest** (page *4 · Trust and
safety*, the lead's statement card with a status disc); base sheets: **T1** (Tag · Display amount · one line · Button ·
Saathi Orb) and **T3** (disc · title · line · rows panel · Button). Numbers are placeholders: today 2 December 2026,
October ₹16,200 + November ₹18,555 = **₹34,755**; 13 months = **₹2,31,400**; next batch 4 December.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| all · whole screen | H2 duplicated; month *November 2026* | `components/statement.md` · Paper H2 | everything not listed is the base | — |
| all · strip | the shipped pinned red strip (as on 1.12 / T2), `bank` icon, the **total** across months | `statement.md` `needs-her` · `icons.md` `bank` | strip as drawn on T2 | — |
| all · Monthly Payout card | schedule row `needs-her`: status disc `bank` on `bgErrorSubtle`, line *No bank account added*, amount = **this month** (the statement still adds up, v2) | `statement.md` § Schedule row status | 48 dp disc · BodyLg title · BodyMd line | — |
| A · months on the card | `Badge` `count` on the disc = months waiting | `components/badge.md` Part 1 | pinned top-right, 2 dp ring | — |
| A · sheet | T1 sheet: Tag · **total** Display · a row of month tiles · Button | `bottom-sheet.md` `info` · Paper T1 | month tile = the schedule row's 48 dp date tile (*OCT* instead of *2 AUG*), `bgErrorSubtle` + `textErrorStrong` | — |
| A · 13 months | the same row: last three tiles + a `+10` tile | `badge.md` count overflow rule (*99+*) | tile size and gap unchanged | — |
| B · sheet | T3 sheet: disc · title · rows panel, one row per month, a total row | `statement.md` rows · Paper T3 | 48 dp row · label BodyLg · Amount trailing · one Divider before the total | — |
| B · 13 months | the panel shows the last 3 months + one row *10 more months* with its sum, then the total | `statement.md` nested breakup | same row anatomy | — |
| C · month pager | `Badge` `dot` on the ‹ prev month button: an earlier month is waiting too | `badge.md` Part 1 `dot` · `date-picker.md` month header | — | — |
| C · sheet | T1 sheet with a year grid: 12 month cells per year, waiting months marked | `date-picker.md` `month` DayCell | 44 dp cell · `marked` tone · year as the header | — |
| after · sheet | each option's sheet with tone `moving`: *Coming on 4 December*, the **total**, one Button *Got it* | `statement.md` `moving` · `payout.md` § 2 *Bank just added* | — | — |

## Workstream 1 · Figma v2 — Monthly Payout section (2026-11-04)

Section *Monthly Payout v2* `2791:24639` in `cIAH24e13VZJu31OmiMWrj`. Every frame keeps its header, status card,
Rewards and Other Actions; only the statement region is rebuilt. Read: `reads/figma-v2-monthly-payout-2026-11-04/`.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| all · statement band | *Summary Card* `Top Green Card` (lock line hidden) | shipped app, `reads/figma-live-earnings/` · `components/statement.md` § band | — | — |
| all · Income Tax row | *Pay Summary - List* `Default` / `With Subheader` (no PAN), detached only to take the v2 tax icon | shipped app (live tax row: *Income Tax (20%)* + red *Upload your PAN Card to reduce tax*) | 20 px icon · 14 Regular label · 14 SemiBold amount · chevron to the tax sheet | — |
| all · *Earnings After Tax* | *Pay Summary - List* `Default`, icon hidden, label SemiBold `gray-900` | `components/statement.md` § subtotal after a Divider | row height and type of the rows around it | — |
| all · deductions | *Pay Summary - List* `Default` ×3 + `With Subheader` (Training fees) | shipped app | — | — |
| all · *Monthly Payout* total | *Pay Summary - List* `Green` | shipped app (*Remaining Payout*, renamed) | — | — |
| all · *Monthly Earnings Breakup* | the live list (*List Items - Payout* + *Summary Card* `Bottom Green Card`), cloned from S07 `870:2109`, tax row removed | shipped app | — | — |
| 1.01b · Sheet 4 · strip and PAN sheet | the bank's red strip and *Add Bank Account* sheet, recoloured from blue | v2 *Sheet 4 · No bank account added* `2791:29308` | `red-600` strip · red tint · `red-700` title and tag | — |

## Workstream 1 · Figma v2 — the lead's Monthly Payout v2 edits, carried to Early payout v2 and Trust and Safety v2 (2026-11-04)

The lead's edits in *Monthly Payout v2* are the reference: attempts listed on the failed sheet (*Payout failed · Attempt 1 / 2 / 3*),
a *Second attempt* step while the instant retry runs, the UTR under *Credited to bank*. Nothing below is new: every region is
a clone of a Monthly Payout v2 node with Early Payout or T&S data.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| T&S all 14 · statement | *Statement · old UI* master `2811:19784` + *Monthly Earnings Breakup* `2811:19947` | Monthly Payout v2 1.01 | everything; held frames use it unchanged (₹18,555) | — |
| T&S penalty frames · penalty line | the master's *Income Tax* row (detached, with chevron), shield-warning icon from the frame's own v2 line | Monthly Payout v2 1.01 · v2 T&S line | 20 px icon · 14 Regular label · 14 SemiBold amount · chevron to the which-job sheet; last deduction before the Divider; total ₹16,555 | — |
| T1 · spotlight | the frame's own two scrims, moved to the penalty line's new position | v2 T1 | Saathi sits under the lit line, as before | — |
| 2.11c · statement | no-PAN master `2811:20234` + breakup `2811:20394` | Monthly Payout v2 1.11 (no bank, no PAN) | 20 % tax, ₹13,900 | — |
| 2.06 sheet · 2.12c sheet | the lead's Monthly sheets already pasted in; copy set to *Early Payout ₹5,000* and June dates | Monthly Payout v2 1.03 sheet · 1.07 sheet | — | — |
| 2.05b · second attempt sheet | 2.05 sheet duplicated, timeline from the lead's Monthly 1.02 second-attempt sheet `2828:58147` | Monthly Payout v2 | *Payout failed · Attempt 1* then *Second attempt · Today* | — |

## Workstream 1 · Figma v2 — Prorated MinG v2: eligibility first, *Why* opens a spoken sheet (2026-11-04)

Ask: *"show it dominantly … you are MinG / base pay eligible … keep a 'why' … opens a bottom sheet and our tts explains
through voice … current layout does not work with voice"*. Three iterations, each for A2 (left 30 min early → prorated
Min G ₹450) and A4 (left 2 hr early → Base Pay ₹390), on new rows under the v2 frames. Rest screens are duplicates of
A2 / A4; sheets are the T&S T3 sheet with the Saathi *Playing* player (the file's voice-is-speaking shape).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| all · rest screen | A2 / A4 duplicated | Prorated MinG v2 `2791:41678` / `2791:41999` | attendance card, band, OT / coins / red cards, breakdown unchanged | — |
| A · eligibility row | the card's own *Row · Min G* / *Row · Base Pay*, promoted: label *Min G eligible*, `Check`-style pink *Why?* link, panel = the card's *Cash Collected* strip fill | v2 A2 · live *Check* link | 24 px icon slot · row amount | — |
| B · eligibility card | a Card between the attendance card and the statement, same fill and radius as the Cash strip; note pictogram from B1 | v2 B1 sheet pictogram | — | the row in A (B tests a separate, bigger surface) |
| C · Saathi row | Saathi avatar (idle) + label + *Why?* inside the statement under the band | Saathi frame used on every payout sheet | row height of the rows around it | — |
| all · sheet | T&S T3 *Bottom sheet* (Cross · tint · pictogram · title · amount line · panel · *Understood*) + *Playing* player | v2 T3 `2791:38090` · `2791:38123` | green tint from 1.03 Paid sheet; note pictogram from B1 | — |
| A · sheet hero | five hour blocks 7–12 (worked = green icon paint, left = Divider grey), last hour outlined in brand; red ✕ *Logged out 11:30 AM* under it | *ProgressBar* anatomy (`components/progress-bar.md`) split per hour | track radius · 4 px gaps | *ProgressBar* single track (cannot show the last hour) |
| B · sheet hero | two statement rows: ✓ paid row on top on the Cash-strip fill, ✕ the other below | `components/statement.md` rows · Oct 30 ✓/✕ decision | 48 dp row · label + amount | — |
| C · sheet hero | the payout *journey* rail: ✓ Shift · ✕ Logged out + tag · green ✓ eligible | lead's Monthly v2 sheets `2791:25226`, `2791:24640` | rail, tags, date column | — |

## Workstream 1 · Figma v2 — Monthly Payout: Saathi explains the page (2026-11-04)

Ask: *"a mascot at the bottom right sticky of the payment screen and when they click on that it explains the different
sections … only the total earnings and breakdown part"*. Three frames on a new row in *Monthly Payout v2*: rest with
Saathi pinned, stop 1 (statement), stop 2 (breakup). Voice script beside each stop.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| all · page | 1.01 *Approaching* duplicated, cut to the 852 viewport | Monthly Payout v2 `2791:27941` | everything | — |
| M1 · sticky Saathi | Saathi avatar (idle: ring and pause hidden), 72, bottom-right 16 above the nav | the Saathi frame on every payout sheet | — | — |
| M2–M3 · spotlight | `Coachmark` `tour`: scrim with a cut-out = target + 8, brand ring | `components/coachmark.md` § Anatomy | four scrim rects of the file's scrim paint | — |
| M2–M3 · bubble | `Coachmark` bubble: one BodyLg sentence, counter *1 of 2*, *Next* / *Got it* (file's Primary Button) | `components/coachmark.md` | white, radius 12, 16 padding, width screen − 64, above the target (target centre in the bottom half) | — |
| M2–M3 · Saathi | *Playing* player in the same sticky spot — she is the voice | T&S T3 player `2791:38123` | — | — |
| M3 · scroll | page scrolled so the breakup sits under the tabs; header and tabs stay | — | — | — |

## Workstream 1 · Figma v2 — Talk to Saathi (2026-11-04)

Ask: *"a journey where we are able to talk to the mascot … it's listening … shows whatever it's taking as input …
research how other voice apps do it … show me linearly"*. Mobbin read: ChatGPT and Grok voice, Meta AI, Todoist
(*Try saying …* + waveform + *Listening…*), Mindtrip (*… is speaking* with the spoken words lit), Cleo (money questions),
Perplexity. Six frames in a line on a new row of *Monthly Payout v2*.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| V1 · page | 1.01 with the sticky Saathi | Monthly Payout v2 | — | — |
| V2–V6 · bubble | speech bubble anchored to the sticky Saathi (white, brand border, 16 radius, tail corner at her), small Cross; no sheet (lead) | `components/coachmark.md` bubble | 264 wide, 16 padding | Bottom sheet (rejected: not on the current screen) |
| V2–V4 · listening | `VoicePrompt` `listen` (proposed): Saathi in a field that swells with her voice, *Listening…*, her words as she says them, *Type instead* | `components/voice-prompt.md` § listen | 136 field · BodyMd her words · ghost *Type instead* | — |
| V2 · first help | *Try saying* + one example question | Todoist pattern, translated | — | — |
| V2–V3 · level | waveform bars in brand pink | `voice-prompt.md` (field shows her voice level) | — | — |
| V5 · answer | Saathi *Playing* + the spoken sentence, said part dark, rest grey; the page's own *Monthly Payout* status card as the proof | T&S T3 player · 1.01 status card | — | — |
| V6 · not heard | same panel, Saathi idle, two example questions as outline rows, *Speak again* | `voice-prompt.md` error · file's Primary Button | — | — |
