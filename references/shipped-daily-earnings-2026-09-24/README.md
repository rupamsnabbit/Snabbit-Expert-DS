# Daily earnings (Beauty) — reference read and redraw

| | |
| --- | --- |
| Source | Screenshot pasted by the design lead, 2026-09-24 — the day view of Earnings, Beauty variant (*13 March 2025*, *No Tier*, *Inventory Adjustment (25%)*, *Daily Pass*) |
| File | `01-daily-earnings-beauty.png` (the `.webp` is the original paste) |
| Context | **No project.** An exploration on the Paper *Snabbit Beauty* → *Iterations* page. Nothing here is a decision; `projects/ACTIVE` untouched |
| Redraw | Paper *Snabbit Beauty* → *Iterations* → artboards *E1 · Daily earnings — shipped (reference)* and *E1 · Daily earnings — redraw* |

## 1 · The idea

Tells her what one day paid and exactly how the number was made: attendance first, then the day's statement (pay for
work, the guaranteed top-up, deductions), then each job's own lines.

## 2 · Idea vs. expression

| Borrowable (travels) | Skin (stays behind) |
| --- | --- |
| Order: date → attendance → day total → lines → per-job lines | Green header band on the attendance card (status green as a heading) |
| Every line visible on the day it happens, with sub-lines showing how a figure was made | *Business Pay*, *Differential MinBG Pay*, *Inventory Adjustment*, *Job ID #12563* |
| Login / logout times against the shift | ⓘ tooltips (16 dp targets hiding a sentence) |
| The guarantee explained as *guaranteed − earned = top-up* | *MinBG = ₹2000* as a floating line outside any card |
| Red cards shown on the day | *₹0* row for zero red cards; red pill count |

## 3 · Against the expert

| Failure | Principle | Fix |
| --- | --- | --- |
| Jargon she was not taught — *MinBG*, *Differential*, *Business Pay*, *Inventory Adjustment* | P1, content.md | Her words: *Pay for work*, *Guaranteed top-up*, *Products from your kit*, as `patterns/earnings.md` § Content |
| Jobs named by *Job ID* | earnings.md | Customer first name + initial · start time · duration |
| ⓘ as the only explanation | P3, header-nav.md | The explanation is the row's breakup and its description line |
| *Present* carried by a green header | P6, row 14 | Tag `success` *Present* with `check-circle` + Tag `neutral` *Full shift* |
| Numbers do not add up (₹1,800 + ₹200 − ₹50 − ₹100 ≠ ₹530; ₹130 + ₹5 ≠ ₹1,800; job at 6:05 PM on a 7–12 shift) | P5 honest | Redraw uses one consistent day: ₹1,790 + ₹10 = ₹1,800 · + ₹200 − ₹50 − ₹100 = **₹1,850** |
| *Red Cards 0 · ₹0* | earnings.md: zero rows hidden | Row hidden |
| *Payout Issue* — a noun as an action, top corner | P2 | HeaderNav trailing `secondary brand S` *Help* with `headset` |

## 4 · Tier

**Tier 2 — composition** of core components: HeaderNav · DatePicker day pager · Card + Tag + ListItem (shift) ·
ListItem `navigational` (tier) · **Statement** (day use) · Card per job (Statement-row anatomy) · ListItem `navigational`.
No Tier 3 piece, no ask of core.

## 5 · Build plan

| Region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Header | HeaderNav `default`, title *Earnings*, trailing Button `secondary brand S` `headset` *Help* | `components/header-nav.md` | — | — |
| Day pager | DatePicker month header, standalone, stepping by **day** | `components/date-picker.md` § Month header · `patterns/earnings.md` § The tab | caret IconButtons M ghost · label Heading3 · next arrow disabled on today | — |
| Shift card | Card `static` + Tag `success` L *Present* + Tag `neutral` L *Full shift* + ListItem rows with meta trailing | `patterns/earnings.md` § What changes (Shift card) · `components/tag.md` · `components/list-item.md` | — | — |
| Tier line | ListItem `navigational`, `asset/tier/locked` leading, caret | `components/list-item.md` · `foundations/assets.md` § 4 | — | — |
| Day statement | **Statement** — band *You earned* Amount L · rows · breakup panels | `components/statement.md` § Kinds (Day statement) · shipped `09-statement-daily.png` | 48 dp rows · BodyLg label · Amount M signed with true minus · breakup `bgSecondary` radius lg | Accordion `breakdown` (earnings.md's older proposal, withdrawn in statement.md) |
| Jobs today | Card `static` per job: Avatar-initial 40 + title + meta, Amount M, rows | `patterns/earnings.md` § Today (*Jobs today*) | Statement row anatomy for the lines inside | — |
| Rate-card link | ListItem `navigational` *How your pay is calculated* | `patterns/earnings.md` § Rate card | — | — |

## 6 · Differences, one sentence each

- *Expert ID: 14586* left the header because it lives on Profile (earnings.md).
- *13 March 2025* became *Thu, 13 Mar* in the pager because dates are words and a weekday helps her place the day (date-picker.md § Content).
- The green attendance header became two Tags on a white card because status green is not a heading colour (P6).
- *Login / Logout Time* became *Logged in / Logged out* with a *20 min early* note because the vocabulary says Check in/out is for homes, and the times mean something only against the shift.
- *No Tier* moved from a brown band to a ListItem with the locked tier asset and a way into Rewards, because tier is a reward and should lead somewhere (P6).
- The floating *MinBG = ₹2000* line moved inside the *Guaranteed top-up* breakup, where the subtraction is shown.
- *Daily Earnings* became *You earned*; the band keeps the shipped Statement anatomy (disc · title · Amount L) with no Listen of its own — per `statement.md` § Sound the screen's VoicePrompt reads the card, and that bar is **not drawn** in this exploration (P4 gap, open).
- Jobs became *Your 2 jobs* rather than *Jobs today* because the pager is on a past day.
- *Red Cards 0 ₹0* is hidden because a zero row is noise (earnings.md).
- *Job ID #12563* became *Radhika S · 7:15 am · 1 hr 30 min* because she remembers the customer, not the ID.
- A *How your pay is calculated* row replaces the two ⓘ icons as the single way to the rate card.
- Deductions are `textPrimary` with a true minus, not red, because a deduction is a fact, not a penalty (statement.md).

## Drawing notes

- Borders are literal `1px` / `1.5px` (= `border.thin` / `border.thick`): Paper drops a `var()` in `borderWidth`, and the file's other cards do the same.
- The tier disc is a placeholder for `asset/tier/locked`; the 3D asset is not placed.
- Artboard is 393 wide to match its neighbours on *Iterations*, not the 360 baseline — check at 360 before it goes anywhere.

## Open questions

- What *Inventory Adjustment (25%)* is exactly — a share of product cost used on today's jobs? The redraw says *Products from your kit · 25% of what you used today*; confirm with ops.
- What *Daily Pass* buys — the redraw keeps the name; if it has an everyday word, use it.
