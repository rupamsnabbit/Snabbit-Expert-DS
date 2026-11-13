# Tiers — Earnings page revamp (v4, 2026-10-05)

Every surface the ask needs, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*).
The ask is `prd.md` plus `CONCEPT.md` v4: **E** one Earnings screen built for the three calls · **Y** Day by day
(grouped by week) · **D** Day · **J** Job · **S** end-of-day sheet. Earlier tier tables (v1–v3) are superseded; the
core changes they landed stay in the system (ProgressBar `target` and DatePicker `marked` are still used; the three
bucket icons are not).

## Surfaces

| # | Surface (the ask's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | E · header *Earnings* + Help | 1 core | HeaderNav `root` · Button `secondary brand S` `headset` | exists |
| 2 | E · one Statement card: band *Net earnings · March · ₹50,000* · Accordion rows *Daily earnings ₹28,000 ›* (navigates) · *Bonuses ₹22,000 ▾* (closed) · *Deductions −₹33,900 ▴* (open by default) · Divider · total *Payout ₹16,100* · tracker | 1 core | **Statement** with **Accordion `breakdown`** rows (shipped: the job alert's *You will earn* row) | exists — record the *navigating* row (caret-right to a screen) and *open by default for one row* in `accordion.md` / `statement.md` |
| 3 | E · total *Payout ₹16,100* with the tracker ✓ 15 Apr → ● Processing → ○ 18 Apr under it | 1 core, **needs variant** | **Stepper `tracker`** with three nodes carrying dates; current node brand; `error` node + fix Button when Razorpay reports a failure | **needs core change** → `stepper.md` (dated nodes; a payout use) |
| 4 | E · *Bonuses* row, closed — opens to Tips · Adjustments · Joining bonus (ProgressBar `goal`, 7 of 10 full shifts, locked) · Winback bonus (locked) | 1 core | Accordion `breakdown` row + breakup panel; Amount `locked` for bonuses not yet earned | exists |
| 5 | E · *Deductions* breakup panel — five lines: icon 20 · one or two words · date or count · amount | 1 core | Statement `breakup` panel (`bgSecondary`, radius lg) · BodyMd label · Caption date/count · Amount `S` signed, `textPrimary` | exists — icons to register (Gaps) |
| 6 | E · *Tax 20% · Add PAN ›* line | 1 core | breakup line with a text Button `ghost brand S` in the date slot and an `iconWarning` dot on the icon | exists |
| 7 | **D** · red card as a Chip on the day it was given | 1 core, **needs variant** | **Chip** `status`: red (asset · −₹) / success (greyed asset · `check` · +₹ · date) under the day's costs | **needs core change** → `chip.md` (a `status` kind for a red card's fate) |
| 8 | ~~E · *Day by day ›* row~~ | — | folded into #2: *Daily earnings ›* is the door | dropped |
| 9 | **Y** · Day by day — week headings *Week 4 · 22 – 28 Mar · ●12 · ₹12,600*, day rows, day off as `moon`, red-card day marked | 1 core | HeaderNav `default` · Divider `labelled` with a trailing coins count + Amount `M` · ListItem `navigational` per day | exists — the heading's trailing values are content on Divider `labelled`; record as a use, no new kind |
| 10 | **D** · Day — *Today ₹1,850 · 4 jobs · 5 hr · times* · jobs · guaranteed top-up bar · **that day's costs** (daily pass · products · red card chip) · total | 1 core | Statement band · ListItem per job · ProgressBar `target` (landed) · Statement rows + total | exists |
| 11 | **J** · Job — services / hours · checked in / out · rating | 1 core | Statement · ListItem · Rating `display` | exists |
| 12 | **S** · end-of-day sheet — scene · *Today's earnings ₹1,850 · 4 jobs · 5 hr* · *●12/15 coins · 3 to Silver* bar · **Done** | 2 composition | BottomSheet `info` · illustration scene · Amount `L` · ProgressBar `goal` with the tier asset · Button `primary brand L` | exists — scene asset to register (Gaps); joins `patterns/check-in-out.md` as the logout moment |
| 13 | Five states per screen; spoken version | 1 core | Skeleton · EmptyState · Offline Banner · VoicePrompt `bar` | exists |

Dropped, so not tiered: Week screen · month statement page · week strip and weeks list · section totals · *How it
adds up* · tier tints · shift filter · calendar · buckets · bars.

## Gaps

| Gap | Kind | Blocks |
| --- | --- | --- |
| **Stepper `tracker` for a payout** — dated nodes (*15 Apr · bank · 18 Apr*), the Razorpay window shown as the gap to a date, `error` node with the fix Button on failure | component change → `components/stepper.md` | #3 |
| **Chip `status` for a red card** — red (asset · date · −₹) when counted; success (greyed asset · `check` · +₹ · date) when removed | component change → `components/chip.md` | #7 |
| **Statement band-only use** — the band as a hero without rows | component change (rule) → `components/statement.md` | #2, #10, #11 |
| **Icons** — register `tote` is registered (pouch) → reuse for *Products*? No: `tote` means *one service pouch*; propose `shopping-bag` for products from her kit · `identification-card` (PAN / tax) · `ticket` (daily pass) · `money` (cash collected) · `briefcase` (kit EMI; **replaces** the unused v1 meaning *Earned*) · `bank` already = bank account (loan EMI reuses it with the EMI count) · `hand-coins` already = early payout (drawn with the `coins` glyph as a placeholder — the Phosphor path to be placed) | icon → `foundations/icons.md` | #5 |
| **`asset/scene/day-done`** — the end-of-day scene | asset → `foundations/assets.md` | #12 |
| Withdrawn: WeekStrip `amounts`/`off`/1–7 (v3) · Divider `labelled total` (v2) · bucket icons `arrow-circle-up` / `arrow-circle-down` (v1, now unused — remove from `icons.md` at publish) | — | — |

## Checks

- [x] Every surface in the ask appears above — E, Y, D, J, S, states, voice
- [x] No Tier 3 rows
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
