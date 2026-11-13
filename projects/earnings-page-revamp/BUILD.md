# Build plan — Earnings page revamp (v4, 2026-10-05)

Written before the v4 artboards. Sources in this order and no other: **shipped app → `patterns/` → `components/` →
Mobbin → invention.** Structure: `CONCEPT.md` v4 · tiers: `TIERS.md` v4 · reads: `reads/`. Baseline 360 × 800,
content 328, margin `spacing.5`. Paper file *Earnings* (`01M45RCXKPDWDZXCPTBJMG1HJ5`), page *Earnings v2*.

## E · Earnings — one Statement card

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E · header | HeaderNav `root` *Earnings* · Button `secondary brand S` `headset` *Help* | `components/header-nav.md` | — | — |
| E · month pager | **DatePicker month header, standalone** (the *month pager*): `caret-left` · *March 2026* `Heading3` · `caret-right` `textDisabled` on the current month; swipe pages too | `components/date-picker.md` § Month header → *Standalone — the month pager* (**In app** 2026-09-22: ‹ *March 2025* ›) · `patterns/payout.md` | IconButtons `M ghost neutral` · disabled arrow at the range limit | the month only in the band title (*Net earnings · March*) — no way to another month; a month Chip / select sheet — a hidden affordance and one more tap than the arrow |
| E · card | **Statement**: band · rows · one Divider · total | `components/statement.md` (In app) · shipped `08-statement-monthly.png` | radius lg · `borderDefault` | separate sections and a *Day by day* row at the bottom (v4 first draw) — the number for her days and the door to them were at opposite ends |
| E · band | Statement band: disc `currency-inr` · title *Net earnings* · Amount `L` **₹50,000** (the month moved to the pager above, 2026-10-05) | `components/statement.md` § Anatomy (band) | `bgSuccess` · `textSuccessStrong` | two Stats + arrow (*Made → To your bank*) and a second sentence line — both tried 2026-10-05; the design lead reverted to the one number and relabelled it *Net earnings* (business perspective: how much she made with Snabbit). The payout is the total row below, not the hero |
| E · Daily earnings | **Accordion `breakdown` row that navigates**: *Daily earnings · 24 days · ₹28,000 · caret-right* → Y | `components/accordion.md` § Kinds · `statement.md` (row with caret) | 56 dp · BodyLg · Amount `M` | a plain row + a *Day by day* row elsewhere — two things for one idea |
| E · Bonuses | Accordion `breakdown` row, **closed**: *₹22,000 · caret-down*; opens to *Tips · Adjustments · Joining bonus (ProgressBar `goal` 7 of 10, `locked`) · Winback bonus (`locked`)* | `components/accordion.md` · `amount.md` `locked` · `progress-bar.md` `goal` · Figma `B1` breakup rows (structure only) | — | no detail (v4 first draw) — a bonus she cannot see the rule for is a call |
| E · Deductions | Accordion `breakdown` row, **open by default**: *−₹33,900 · caret-up*; the breakup panel below holds the five month-level lines | `components/accordion.md` § Behaviour (*a breakdown that is the reason for the screen opens by default*) | — | closed by default — the "why was I deducted" answer would need a tap |
| E · breakup lines × 5 | Statement `breakup` panel `bgSecondary` radius lg: Phosphor 20 `textBody` · BodyMd label (≤ 2 words) · Caption date or count (52 dp lane) · Amount `S` signed `textPrimary` (72 dp lane); **every line opens** (`caret-right` 16 `textTertiary`, 2026-10-05): the line's origin sheet, below; *Income tax* carries the `iconWarning` dot and *Add PAN* `textBrand` in the date lane, the sheet holds the Button | `components/statement.md` § Anatomy (nested breakup) · `amount.md` · `foundations/icons.md` | 44 dp lines | sentences as reasons — the persona does not read them |
| E · Divider + total | the one Divider · *Payout* · Amount `M` **₹16,100** `textSuccessStrong` · tracker labels *15 Apr · Processing · 18 Apr* | `components/statement.md` § Anatomy (total) | — | — |
| E · tracker | **Stepper `tracker`** under the total: `check` on `bgSuccessSubtle` *15 Apr* → `bank` on `bgBrand` *bank* → `wallet` on `bgTertiary` *by 18 Apr*; `error` node + fix Button on failure | `components/stepper.md` § tracker · `patterns/payout.md` § 2 · `reads/dasher-earnings` | 28 dp nodes · 2 dp connectors | ListItem with a Tag (v2) — a word, not a shape |
| E · states | Skeleton (band + three rows) · EmptyState `section` *Nothing yet this month* · error · Offline Banner | `components/skeleton.md` · `empty-state.md` · `patterns/offline.md` | — | — |

### E · round 3 (Paper comments, 2026-10-05) — payout first, business as its own card

Design lead's comments on the card: *"can we just show this at the top including the status of the payout"* (on the Payout total + tracker) and *"this we can show as another card saying money you've made with us and on clicking we show some graphs on another page"* (on the Net earnings band). So the Statement flips: **the payout is the band**, the status sits under it, the parts follow; the business number leaves the Statement and becomes a second card that opens a graph page.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E · card 1 band | Statement band: disc `bank` · *Payout · 18 Apr* · Amount `L` **₹16,100** | `components/statement.md` § band (title says what the figure is to her; date line) | `bgSuccess` · `textSuccessStrong` | Net earnings as the band (rounds 1–2) — she read it as money coming to her |
| E · card 1 status | **Stepper `tracker`** directly under the band: `check` *15 Apr* → `bank` *Processing* → `wallet` *18 Apr*; Divider after | `components/stepper.md` § tracker · `patterns/payout.md` | 28 dp nodes · 2 dp connectors | tracker under the total at the bottom — the comment: show it at the top |
| E · card 1 rows | *Daily earnings · 24 days · ₹28,000 ›* · *Bonuses ₹22,000 ▾* · *Deductions −₹33,900 ▴* (open) + the five-line panel, unchanged | as before | — | — |
| E · card 2 | **Card `navigation`**: *Net earnings* `BodyMd` secondary · Amount `M` **₹50,000** · a 6-bar **month sparkline** (Oct–Mar, current bar `bgBrand`, past `borderDefault`) · `caret-right` → G | `components/card.md` · brief `briefs/earnings-page-revamp-month-chart.md` (Tier 3) | 16 dp padding · radius lg · `borderDefault` | a Stat row (no picture) — the comment asks for *graphs*, so the card shows the shape of the graph it opens (P1) |
| G · header | HeaderNav `back` *Net earnings* | `components/header-nav.md` | — | — |
| G · hero | *Since Oct 2025* `BodyMd` secondary · Amount `L` **₹2,51,000** — the motivating number (PRD answer 5: *show her she has made a crazy amount of business*) | `components/statement.md` § band (plain) · HeroCard | — | this month alone — she sees that on E already |
| G · chart | **MonthBars** (Tier 3, brief): 6 bars Oct–Mar, value `Caption` above each, month `Caption` below, current bar `bgBrand`, others `borderDefault`; no axis, no grid, no legend | brief · `progress-bar.md` (track/fill colours, radius full) | 8 dp gaps · radius full | a line chart — a bar per month is countable (P2); a pie — nothing to compare |
| G · months | ListItem rows *March · 24 days · ₹50,000 ›* … *October · 18 days · ₹32,000 ›* → E for that month | `components/list-item.md` | 56 dp | — |
| J · job id | ListItem row at the end: `hash` · *Job ID* · **SNB-48213** · `copy` IconButton `S` `textBrand` (copies, Toast *Copied*) — the number she reads to support (comment: *show job id over here*) | `components/list-item.md` · `foundations/icons.md` (`copy`; `hash` registered 2026-10-05) | 56 dp as the Checked in / out rows | the id in the header subtitle — hidden among the date and time, not tappable |

### Structure v3 — read as the user, then simplified (2026-10-05, Figma only)

Design lead: *rethink the structure; think of yourself as our user; does it make sense; can we simplify more?* Reading the v2 set as Sunita, three things did not make sense: (1) **Early payout −₹27,000 listed under Deductions** — money she already received, shown as money taken, is a call by itself; (2) **three totals** (Net earnings 50,000 · Daily earnings 28,000 · Payout 16,100) with no visible arithmetic between them; (3) **four levels** (E → Y → D → J) when a day's jobs could open inside the day list. So v3 is one equation on one screen, one list screen, one job screen, and sheets.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E · Earned card | Statement band *Earned · March · 24 days* · Amount `L` **₹50,000**, then two rows inside the card: *Work · 24 days · ₹28,000 ›* → Days; *Bonuses · ₹22,000 ›* → bonus sheet | `components/statement.md` § band + rows | `bgSuccess` band · 56 dp rows | the proud number as a separate card at the bottom (v2 round 3) — below the fold; *Net earnings* as the word — *net* means nothing to her |
| E · Deductions | section title *Deductions −₹6,900*, four lines that open (Income tax · Add PAN · Loan EMI · Kit EMI · Cash collected) | Statement `breakup` panel · the E2/E3 sheets | 44 dp lines | Early payout inside this list (v2) — it is not a deduction to her |
| E · Payouts | section title *Payouts ₹43,100*, one row per transfer: `check` *Early payout · 10 Mar · ₹27,000 · Paid*; `bank` *Monthly payout · 18 Apr · ₹16,100 · Processing* › → payout sheet | `patterns/payout.md` § schedule (dated rows) · Stepper node glyphs | 56 dp · date tile idea as a 28 dp node | the tracker on the main screen (v2) — it told one transfer's story and hid the other |
| E · arithmetic | Earned 50,000 − Deductions 6,900 = Payouts 43,100 = 27,000 + 16,100; Work 28,000 + Bonuses 22,000 = 50,000 — every number on the screen is reachable from another by one subtraction | PRD answer: *payout = earned − deductions, keep it simple* | — | numbers that needed the reader to know early payout was already paid |
| P · payout sheet | BottomSheet `info`: *Monthly payout · ₹16,100 · 18 Apr* · Stepper `tracker` (Sent 15 Apr ✓ · Bank processing ● · By 18 Apr ○) · ListItem *Not received by 18 Apr? Call support ›*; **failed variant**: node `error`, *Bank returned it · check your account* with Button *Check bank account* | `components/bottom-sheet.md` · `stepper.md` § tracker · `patterns/payout.md` states | — | — |
| DY · Days | Y and D merged: week cards; a day row **expands in place** (Accordion `breakdown`) to its job lines (→ J) and its day costs; Tue 25 open shows *Red card −₹100 · Waived · ₹100 back 18 Apr* with a Chip `status` | `components/accordion.md` · `card.md` `expandable` · `chip.md` (status, to land) | 52 dp rows · 48 dp job lines | a separate Day screen (v2) — one level for nothing new |
| G · graph | **dropped from the core path** — the month pager answers *other months*; *since you joined* can live on Rewards/Profile | — | — | kept as optional on the v2 page |

### Structure v4 — one tab, three scopes (Paper page *Earnings v4*, 2026-10-06)

Design lead: *keep the Earnings tab monthly, with Today / Week / Month views instead of levels; lead with what is hers.* Rule (see `CRITIQUE.md` / SCOPE log): one ledger, every rupee is a line at one level (job · day · month), every line opens one of three origins (list · instalment · rule); status is not a scope. New flow drawn on its own Paper page; v2/v3 screens untouched.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| M/W/T · header | HeaderNav `root` *Earnings* · Button `secondary brand S` `headset` *Help* | `components/header-nav.md` | 56 dp | — |
| M/W/T · scope switch | **Segmented** 3 segments *Today · Week · Month*, track `bgTertiary` radius full, selected `bgPrimary` + `borderDefault` SemiBold | `components/tabs.md` § Segmented (*today / week / month* is its named use) | 40 dp · 328 wide | Tabs (underline) — segmented is for views of the same data |
| M/W/T · pager | DatePicker month header standalone; the label follows the scope (*March 2026* · *Week 4 · 22 – 28 Mar* · *Thu, 27 Mar*), same arrows, same place | `components/date-picker.md` § Month header, week pager | 48 dp | three different pagers (one per view) — one control that changes meaning |
| M · band | Statement band alone — **Payout · March ₹43,100** (`bank` disc), the final amount and nothing else (design lead, 2026-10-06: *at the top green, just show my final amount*); the two transfers moved to a *Payouts* section at the bottom. Earlier in the day: band + two rows inside the card: *✓ Paid 10 Mar ₹27,000 ›* · *● By 18 Apr · Processing ₹16,100 ›* → payout sheet | `components/statement.md` § band · `patterns/payout.md` § schedule | `bgSuccess` band · 56 dp rows · Stepper node glyphs as the leading disc | Earned ₹50,000 as the band (v3) — *where is my 50k*; a pinned status strip above an Earned band — the bigger number wins |
| M · Total earned | Accordion `breakdown` row **open** *Total earned ₹50,000* on one `bgSecondary` surface with its two lines: `briefcase` *Work · 24 days ₹28,000 ›* → Week scope · `gift` *Bonuses · 3 ₹22,000 ›* → list sheet (one line per bonus). The design lead caught that folding both into one row that opened the Week scope made ₹22,000 of bonuses vanish from the month (*where are the bonuses?*) — every rupee is a line | `components/accordion.md` | 56 dp · BodyLg | — |
| M · Deductions | Accordion row **open** *−₹6,900* and its four lines in **one `bgSecondary` container** — the header row is the top of the panel (comment: *highlight this too, it doesn't look part of deductions*); each line opens its origin (tax → rule · EMIs → instalment · cash → list) | `components/accordion.md` § breakdown (open row + panel as one surface) · `statement.md` § breakup | 56 dp header · 44 dp lines | header on white above a grey panel — read as two things |
| W · band | Statement band *Earned · 5 days ₹12,600*; one row inside: ProgressBar `goal` *12 of 15 coins · 3 to Silver* — coins live here only | `components/progress-bar.md` § goal | — | coins on the day list (v2) — the week is the coin unit |
| W · days | ListItem per day (*Today* brand · off day `moon` · red-card day with the card asset count) → Today scope on that day | `components/list-item.md` · `date-picker.md` `marked` | 52 dp | the expanding day (v3 DY) — the Today scope is that panel |
| T · band | Statement band *Earned · 4 jobs · 5 hr **₹2,000*** (jobs + guarantee, before day costs); rows inside: one per job → Job; *Minimum guarantee +₹200 ›* (rule). The day closes with a Statement **total** after the Divider: *Yours today ₹1,850* (comment: *show you've made in the end*) — the same Earned − Deductions = yours equation as the month | `components/statement.md` · `avatar.md` | 48 dp | — |
| T · Deductions | Accordion row open: *Daily pass −₹100 ›* (rule) · *Product cost · 3 items −₹50 ›* (list); red-card day adds *Red card · late* + Chip `status` *Waived · back 18 Apr* | `chip.md` (status, proposed) | 44 dp | — |
| absent sections | a scope with no lines at a level shows **no section** (Week has no Deductions) | `empty-state.md` (never an empty section) | — | an empty *Deductions* header |

## E2 · Deduction detail sheets — where each line came from

Rule: a deduction is never defined, it is **shown where it came from** — the thing she did (loan, kit order, early payout request) or the jobs it came from. One BottomSheet `info` recipe for all six lines, so once she has opened one she knows all of them. Drawn first for the two that cause calls: Loan EMI and Cash collected.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E2 · shell | **BottomSheet `info`**, dismissible: scrim · grabber · `x` IconButton top-right · one `primary brand L` Button last | `components/bottom-sheet.md` § Anatomy, § Kinds (`info`) · S sheet on this page | radius xl · padding 16 / 24 | an info `i` icon with a tooltip, a glossary screen, a sentence under each line — all text, none read (P1) |
| E2 · head | the S sheet's head: label `BodyMd` `textSecondary` · Amount `L` (display) signed · caption *March · 3 of 12* / *March · 4 jobs* | `components/statement.md` § band (title says what the figure is) · S sheet | centred · `tnum` | a Statement band inside a sheet — a card inside a card |
| E2 · Loan EMI progress | **ProgressBar `segmented`** 12 segments, 3 filled `bgBrand`, rest `bgTertiary`; label row *3 of 12 paid* · *Ends Dec 2026* | `components/progress-bar.md` § Kinds (`segmented` — a count of discrete, equal things) | `M` 8 dp · 4 dp gaps · Caption/BodyMd | a `linear` bar — instalments are countable, so segments |
| E2 · Loan EMI facts | Statement `breakup` panel, three lines: *Loan taken · 10 Jan · ₹12,000* · *Every month · from payout · −₹1,200* · *Left · 9 months · ₹10,800* | `components/statement.md` § Anatomy (nested breakup) | 44 dp · BodyMd · Caption lane · Amount `S` | a paragraph (*You took a loan of…*) — the three numbers say it |
| E2 · Loan EMI link | ListItem `navigation` *Loan details* `caret-right` → the loan's own screen | `components/list-item.md` | 48 dp | repeating the loan terms here — the loan has a home already |
| E2 · Cash collected line | one `BodyMd` `textSecondary` line under the head: *Paid to you in cash* — the one sentence on the sheet, because the question is *why is it a deduction* | `foundations/content.md` § states (one idea per line) · `bottom-sheet.md` `info` body ≤ 2 lines | centred | a picture strip (customer → cash → her) — a new asset for one line; revisit if the line fails the field read |
| E2 · Cash collected jobs | the D screen's job lines ×4: Avatar 28 initial · name · *Thu 27 Mar · 6:05 pm* · Amount `S` · `caret-right` → J | D · Earnings panel (this page) · `components/avatar.md` · `statement.md` (row that opens) | 48 dp · `bgSecondary` panel | a plain count (*4 jobs*) — she wants to know *which* customers |
| E2 · action | **none** — the `x` IconButton closes, as a transaction sheet does in GPay / PhonePe (design lead, 2026-10-05) | `components/bottom-sheet.md` (`info` is dismissible by ✕, drag, scrim) | — | Button `primary brand L` *Done* — a second way to do the one thing ✕ already does |

### E2b / E3b · the clip iteration — no backend, one film per term

Same sheet, but the origin data (loan facts, customer rows) is replaced by a **HowToClip `guide`**: a 30-second film in her language saying what the term is. Nothing on the sheet comes from the ledger except the line she tapped. Trade: no per-expert facts (which jobs, how many months left) → zero backend; the clip is made once per term per language.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E2b · head | label `BodyMd` `textSecondary` · Amount `L` signed · *March · 3 of 12* — the line she tapped, nothing more | E2 head (this page) | centred | the icon disc — the clip is the picture now |
| E2b · clip | **HowToClip `guide`**: 16:9 media, radius lg, poster first frame, play disc 56 `bgPrimary` / `iconBrand`, bottom bar on a 40 % scrim with `speaker-high` · knob-less 4 dp progress · `corners-out`; plays **on tap only**; title `BodyMd` Medium + duration `Caption` beneath (*Loan EMI explained · 0:30*) | `components/how-to-clip.md` § `guide` (In app: the rate card's *Learn about…* clips) | ≤ 60 s · captions burned in · offline poster + *Needs internet* | a full-screen `player` opened directly — she loses the amount she tapped; a text explainer — P1 |
| E2b · action | none — ✕ closes | `components/bottom-sheet.md` | — | — |
| E3b | identical recipe: *Cash collected · −₹1,000 · March · 4 jobs* · clip *Cash collected explained · 0:20* | as above | — | the one sentence from E3 — the voice says it |

## Y · Day by day

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Y · header | HeaderNav `default` *Day by day · March* | `components/header-nav.md` | — | — |
| Y · week card | **Card `expandable`** per week: header on `bgSecondary` — *Week 4* · *22 – 28 Mar · 5 days* · coin asset + count · Amount `M`; the current week open, past weeks closed with `caret-down` | `components/card.md` § Kinds (`expandable`) · shipped Coins **week** accordions (`accordion.md` `week`, In app) | 52 dp header · radius lg | a flat list with Divider headings (v4 first draw) — "looks ass": no grouping a thumb can feel; tier-tinted week cards (Figma) — colour as identity |
| Y · day rows | inside the card: *Today · Thu 27* (brand) · *4 jobs · 5 hr* · Amount `M` · `caret-right` → D; red-card day carries the asset in the description; day off = `moon` row, `textTertiary`, not a target | `components/list-item.md` · `foundations/icons.md` `moon` | 52 dp | — |

## D · Day — one Statement card

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D · header + pager | HeaderNav `default` *Your day* · DatePicker header by day *Today · Thu 27 Mar* | `components/date-picker.md` § Standalone | — | — |
| D · card | **Statement**: band · **two rows** — everything coming to her, everything leaving her · no total (the band is the day's total) | `components/statement.md` | as E | three rows (jobs · top-up · taken off) — the design lead: *it looks like three sections; it should be two* |
| D · band | disc `currency-inr` · *Today · 4 jobs · 5 hr* · Amount `L` **₹1,850** | `components/statement.md` | `bgSuccess` | — |
| D · Earnings | Accordion `breakdown` row, **open**: *Earnings · 4 jobs · ₹2,000 · caret-up*; breakup panel with one line per job (Avatar 28 initial · name · *6:05 pm · 1 hr 30 min* · Amount `S` · `caret-right` → J) and, as the last line, *Minimum guarantee ₹200* with the **ProgressBar `target`** under it (value line *Jobs ₹1,800 · Top-up ₹200* · line caption *Guarantee ₹2,000*) | `components/accordion.md` · `avatar.md` · `progress-bar.md` § `target` · `patterns/earnings.md` § Today | 48 / 44 dp lines | the top-up as its own row (twice) — the design lead: *everything coming to me is one section* |
| D · Deductions | Accordion `breakdown` row, **open**: *Deductions −₹150*; breakup panel *Daily pass −₹100* · *Product cost · 3 items · −₹50*; a red card on its day is a **Chip `status`** line here | `components/statement.md` · `chip.md` (to land) | 44 dp lines | — |

## S · End of day

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| S · container | BottomSheet `info` over Home, safe confirm | `components/bottom-sheet.md` | — | — |
| S · scene | `asset/scene/day-done` 144 dp (to register) | `foundations/assets.md` | — | — |
| S · number | *Today* Caption · Amount `L` **₹1,850** · *4 jobs · 5 hr* | `components/amount.md` | — | — |
| S · climb | ProgressBar `goal`: coin asset + *12 of 15* · *3 to Silver* · tier asset at the track's end, on a `bgSecondary` panel | `components/progress-bar.md` · shipped Coins screen | — | the payout sentence (v2) — the bank line lives on E |
| S · action | Button `primary brand L` **Done** (design lead's copy pass, 2026-10-05; on the § 9 list — recorded) | `components/button.md` | — | a second link *Your day ›* (v3) — the sheet is a moment; the day is on Earnings |

## Words (last)

First screen: *Earnings · Help · Net earnings · March · Daily earnings · Bonuses · Deductions · Early payout · Income tax ·
Add PAN · Loan EMI · Cash collected · Kit EMI · Payout · Processing.* No instruction line
anywhere; S's one line is the Button.

## Checks

- [x] Every region of E, Y, D, J, S has a row
- [x] No Mobbin or invention rows
- [x] Every *Tried first* names the component rejected and why
- [x] Open asks of core before drawing: Stepper `tracker` dated nodes · Chip `status` · Statement band-only · icons · scene
