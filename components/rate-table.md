# RateTable

Status: **Proposed** · **In app** 2026-09-22 (Rate card — *Daily Earnings*, *Job Earnings*, *Shakti Bonus*) · Tier 1 Core · Package: `SnabbitRateTable` · Figma: no component

The system's only table. Rows are things she is paid for, columns are the conditions that change the rate, cells are
money. It exists because the *columns* carry meaning — *Mon–Fri · Sat · Sun*, *Classic · Super · Premium* — and a
ListItem has no columns. Everywhere else in the app a "table" is rows (`stat-rating-divider.md`: *the Table
Components key/value rows are ListItems, not a table*). This is the exception, and it is the shipped Rate card.

## What ships

`references/shipped-app-2026-09-22/07-rate-card.png`. Three uses on one screen:

| Shipped | Kind | Notes |
| --- | --- | --- |
| **Min G** — five tiers × Mon–Fri / Sat / Sun, one rupee value per cell | `matrix` | tier badge leading each row |
| **Job Earnings** — one block per tier: *Work · Check In · Summer Bonus · Distance Bonus* joined by **+**, then **=** *Base Pay* as a range | `sum` | block header tinted by tier; ⓘ on *Check In* |
| **Shakti Bonus** — Classic / Super / Premium columns, rows *Full Shifts · Rating · Sunday Full Shifts* | `matrix` | column headers carry a badge and a rupee figure |

What changes: the ⓘ tooltip goes (a tap she cannot discover — `coachmark.md`); the words move into the row label's
second line or the section's speaker. The tier tint on a `sum` block header is kept for the same reason as
Accordion `week` — rewards may carry their colour. Nothing else changes; the app has this right.

## Anatomy

```
┌─────────────────────────────────────────────────┐  Card static · radius lg
│ [badge] Gold                                    │  block header (sum only) · reward asset 24 · Heading3 · tier tint
├────────────┬──────────┬──────────┬──────────────┤
│            │ Mon–Fri  │ Sat      │ Sun          │  column header · Caption textSecondary · qualifier (6 hrs) beneath
├────────────┼──────────┼──────────┼──────────────┤
│ Work       │ ₹120/hr  │ ₹130/hr  │ ₹130/hr      │  row · label BodyMd · cells Amount S tabular · 48 dp
│            │    +     │    +     │    +         │  operator row (sum only) · Caption textTertiary · 24 dp
│ Check In   │ ₹5/hr    │ ₹5/hr    │ ₹5/hr        │
│ Summer     │ ₹20/hr   │ ₹20/hr   │ ₹20/hr       │
│ Bonus      │          │          │              │
│            │    =     │    =     │    =         │
│ Base Pay   │ ₹149 to  │ ₹149 to  │ ₹149 to      │  total row · label SemiBold · cells Amount S SemiBold · bgSecondary band
│            │ 175/hr   │ 175/hr   │ 175/hr       │
└────────────┴──────────┴──────────┴──────────────┘
```

- **Label column** 96 dp; **≤ 3 value columns**, equal width, sharing the remaining 232 dp. A fourth condition is a
  second table, never a fourth column — 58 dp cannot hold `₹149 to 175/hr`.
- Cells are Amount `S`, tabular, right-aligned. A range is written *₹149 to 175/hr*, never `₹149–175`.
- Dividers `row` between rows; the total row sits on a `bgSecondary` band instead of a heavier rule.
- Speaker on the section heading reads the table **row by row**: *Work — Monday to Friday ₹120 an hour, Saturday ₹130, Sunday ₹130.*

## Kinds

| Kind | Rows | Extra | Where |
| --- | --- | --- | --- |
| `matrix` | independent items, one value each | none | Min G by tier · Shakti Bonus by tier |
| `sum` | addends, then a total | operator rows **+** between addends and **=** before the total; total row banded | Job Earnings per tier |

## States

| State | Rendering |
| --- | --- |
| default | as drawn |
| current row (*you*) | the row of **her** tier: ListItem `current` rendering — `bgBrandSubtle` band, Avatar `XS` after the label |
| locked column / row | a tier she has not reached: label and cells `textTertiary`, `lock-simple` beside the label |
| loading | Skeleton bars in every cell, header intact — never `₹0` |

## Content

Row labels are two words in English and read as a phrase (*Distance Bonus*), because the Kannada budget for a 96 dp
column is one long word or two short ones (`foundations/type.md`). Column qualifiers (*6 hrs*, *8 hrs*) sit under
the column name as Caption. The month pager above the screen sets which month's rates these are; the table itself
never shows a date.

## Behaviour

Static. No sort, no tap on a cell. Tapping a tier's block header on the `sum` kind opens that tier's benefits sheet.
Horizontal scroll **never** — that is what the three-column cap is for.

## Accessibility

- Read row-wise with the column name repeated per cell, as above. Announced as a table with row and column count.
- Contrast: cells `textPrimary` 17.7:1; column headers `textSecondary` 4.8:1; the tinted `sum` header keeps text `textPrimary`.
- At font scale 1.3 the table **does not shrink its type**: it re-flows to one ListItem per row with the three values stacked as *Mon–Fri ₹120 · Sat ₹130 · Sun ₹130* in the description line.
- Targets: none — nothing in a cell is tappable.

## Sound

None. The speaker is the section's.

## Do / don't

**Do** — three value columns or fewer · Amount `S` in every cell · the total row banded, not bolded alone · reward asset on tier rows · read row by row.

**Don't** — a fourth column · horizontal scroll · a tooltip in a cell · colour in a cell (a higher rate is not a status) · a table for key–value pairs (that is a ListItem).

## Figma reconciliation

No component exists; the Rate card is drawn frame by frame. Create **RateTable** on the Components page `1:3886`
with `Kind` (Matrix / Sum), `Columns` (2 / 3), boolean `TierHeader`, and a `Row` sub-component with `State`
(Default / Current / Locked / Operator / Total). Bind cells to `Amount S`.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ Heading3 / BodyMd / Caption / Amount S |
| 3 | Phosphor only | ✅ `lock-simple`; badges are reward assets |
| 4 | Target ≥ 48 dp | ✅ only the block header is a target |
| 5 | Meaning without colour | ✅ the tint sits behind a badge and a word |
| 6 | Meaning without text | ✅ badge + operators |
| 7 | States complete | ✅ default, current, locked, loading |
| 8 | Zero / empty honest | ✅ no rate is `₹0` — a tier with no bonus omits the row |
| 9 | Spoken label | ✅ row-wise with column names |
| 10 | Indic budget | ✅ 2-word labels; re-flows to rows at 1.3 |
| 11 | One meaning | ✅ money by condition |
| 12 | Never a bare digit | ✅ every cell has ₹ and a unit |
| 13 | Not a status | ✅ no cell is coloured |
| 14 | Reuse checked | ✅ ListItem tried — it has no columns; this is the one place columns carry the meaning |
| 15 | In app | ✅ Rate card, 2026-09-22 |
| 16 | Tier named | ✅ Tier 1 Core |
