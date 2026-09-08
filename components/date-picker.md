# DatePicker

Status: **Proposed** · Tier: Core · Package: `SnabbitDatePicker` · Figma: Date Picker (`756:3531`, month header), Calendar (`827:5182` + duplicate `1598:7553`), Date (`371:2306`), Day Properties (`827:5161`), Day Strip (`869:4920`), Date Selection Cards (`10:2585`), DOB Selection (`89:99`)

Shipped: *Apply leave* (month grid, range, confirm sheet) and *Mark attendance for next 4 days* (day strip) in the Shift Lifecycle file; day cells with a ₹ figure beneath in the DS file (earnings by day).

Choosing a day, the way she thinks about days: **this week** as a row of big numbers with the weekday under each, **further away** as a month she can look at whole. Never a spinner of three wheels, never a typed `10/06/2026`. Dates are read out as they are said — *Wednesday, 10 June* — and the summary of what she chose is always written in words before she confirms.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Seven frames: two Calendars, Date Picker header, Date, Day Properties, Day Strip, Date Selection Cards | One component, two **kinds** — `strip` and `month` — built from one **DayCell** | One day cell, one look, in both places. |
| Sundays in **red** in the shipped month grid | Sundays are `textSecondary` like any other day; a day with no shift available is `disabled`; a weekly-off day gets a small `Caption` *Off* under the number | Red means error or SOS (P6). A Sunday is not a mistake, and many experts work Sundays. |
| Day cell variants show a ₹ amount beneath (−200, +200 in green/red) | Kept as the optional **amount** slot: Amount `S` under the number, tone by sign, for earnings-by-day views only | The good idea in Day Properties; scoped so it does not leak into pickers. |
| Range selection ends in a separate *Confirm Leave* sheet listing *Jun 10 to 12, 2026 · 3 days* | Kept: the **summary line** in words sits inside the picker, always visible; the confirm Button is the flow's | She sees what she chose before she commits (P3), without a second surface. |
| DOB Selection as a TextField | **Removed.** Date of birth is a `month` picker with the year stepper; no typed digits | Typed dates fail for this user; format ambiguity (day/month) is a real error source. |
| No time picker | **Time is never a picker.** Times are a `select` BottomSheet of named slots (*7:00 am · 9:00 am*), or a Chip row when ≤ 4 | Wheels of numbers are the worst control for her (research); slots are how shifts actually work. |

---

## Kinds

| Kind | Shows | Select | Use |
| --- | --- | --- | --- |
| `strip` | 2–7 consecutive days as tiles in one row, starting today | single | Mark attendance, pick a shift day, reschedule within the week |
| `month` | One month as a 7-column grid, Monday first, with month header and prev/next | single · range | Leave (range), date of birth, anything more than a week away, earnings-by-day (read-only with amounts) |

More than seven days is always `month`; the strip never scrolls. A `month` opened from a strip (*More days ›*) starts on the current month with today ringed.

---

## Anatomy — DayCell

```
  ┌────────┐
  │   10   │  number Heading3 SemiBold (month: BodyLg Medium)
  │  WED   │  weekday Caption, uppercase, textSecondary (strip only; month has the weekday row above)
  │  ₹800  │  optional Amount S (month, earnings view only)
  └────────┘
```

| Size | Where | Cell | Target |
| --- | --- | --- | --- |
| strip tile | `strip` | 64 × 64 dp, `radius.lg`, `borderDefault` 1 dp | 64 |
| month cell | `month` | 44 × 44 dp circle (`radius.full`); 44 × 56 with an amount | 44 ≥ 48 with the 4 dp gutter |

Seven month cells at 44 dp plus six 4 dp gutters = 332 dp — fits the 328 dp content width with 2 dp to spare on each side of the grid's own padding.

### States

| State | Strip tile | Month cell |
| --- | --- | --- |
| default | `bgPrimary`, `textPrimary` | `textPrimary` |
| today | weekday reads **Today**; 1.5 dp `borderBrand` | 1.5 dp `borderBrand` ring |
| selected | `bgBrandSubtle`, 2 dp `borderBrand`, number `textBrand` | `bgBrand` fill, `textInverse` |
| in range | — | `bgBrandSubtle` band joining the two endpoints; endpoints `bgBrand` |
| disabled (past, or no shift) | `textDisabled`, no border | `textDisabled`; not a target |
| off (weekly off) | *Off* `Caption` under the number | small `Caption` *Off* replaces the amount slot |
| pressed | `bgSecondary` wash 100 ms; `light` haptic | same |

Selected is fill + colour + (strip) the *Today/weekday* text — three channels; greyscale keeps the fill.

---

## Month header

`caret-left` · **June 2026** (`Heading3`) · `caret-right`, IconButtons `M ghost neutral`; a disabled arrow when the range limit is reached (past months for leave, future months for DOB). Swipe left/right also moves months. Month names are written in full in her language; the year is digits. For date of birth a **year stepper** row (`caret-left` · 1994 · `caret-right`) sits above the month, so nobody taps back through 360 months.

`caret-left` / `caret-right` join the IconButton allowed set **for this header only**.

---

## Summary line

Always present, under the grid or strip, `BodyLg` `textPrimary`, spoken when it changes:

- single: *Wednesday, 10 June*
- range: *10 to 12 June · 3 days*
- nothing yet: *Choose a day* (`textSecondary`)

The confirm Button belongs to the flow (*Confirm leave*, *Submit attendance*) and is disabled until the summary has a value. There is no separate confirm sheet; the summary is the confirmation (P3: the consequence is visible before the tap).

---

## Behaviour

- **Range**: first tap sets the start (ring), second tap sets the end and fills the band; a tap before the start moves the start; a third tap after a complete range starts over. Range length limits (*up to 6 days*) are shown as a `Caption` under the header, and days beyond the limit become `disabled` once a start is chosen.
- Every selection is spoken: *"Wednesday, 10 June"*; a range end: *"10 to 12 June, 3 days"*.
- Past days are `disabled` in pickers about the future; future days are `disabled` in date of birth and history.
- The strip's first tile is always **today**, labelled *Today*; it never scrolls and never starts on a past day.
- Earnings-by-day `month` is **read-only**: tapping a day opens that day's breakdown (Accordion); no selection state.
- Reduced motion: the range band appears without the `motion.standard` grow.

---

## Content

- Dates are words and digits, never numeric formats: *Wed, 10 Jun* in compact places, *Wednesday, 10 June* in the summary, never *10/06/2026* or *06-10*.
- Weekdays are abbreviated to three letters in Latin script and the customary short form in Hindi, Kannada and Marathi (verify width at 130 %).
- *Today* and *Tomorrow* replace the weekday when true.
- Times, when shown with a date, use *7:00 am* — digits, a colon, lowercase am/pm — and are spoken *"seven in the morning"*.

---

## Accessibility

Month grid is a `grid` with row/column headers; each cell announces *"Wednesday 10 June, available"* / *"selected"* / *"not available"*. Strip tiles are radio buttons in a group. Summary line is a live region. Targets: tiles 64, cells 44 + gutter. Contrast: `textInverse` on `bgBrand` 4.1:1 with weight as the second channel; `textDisabled` is decorative and announced as unavailable.

---

## Token proposals

None. Cell size 44 uses `spacing` multiples; the ring uses `borderWidth.2`.

---

## Figma reconciliation

1. Calendar (×2) + Date Picker + Date + Day Properties + Day Strip → **DatePicker** with `Kind` (Strip / Month), `Select` (Single / Range), booleans `Amounts`, `YearStepper`; **DayCell** component with `State` (Default / Today / Selected / InRange / Disabled / Off) and `Amount` boolean.
2. Remove the red Sunday colour; add the *Off* caption variant.
3. Delete DOB Selection (TextField) — replace with DatePicker `month` + `YearStepper`.
4. Date Selection Cards → instances of the strip tile.
5. Add the summary line as part of the component.

Result: **~14 variants** replacing 7 frames and 20-odd loose cells.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ tiles 64; cells 44 + 4 gutter |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Heading3 / BodyLg / Caption / Amount S |
| 4 | ⚙ States by ≥ 2 channels | ✅ fill + colour + label |
| 5 | ⚙ One next action | ✅ the flow's Button, disabled until chosen |
| 7 | ⚙ Four languages | ⬜ month names and weekday short forms at 130 % — verify Kannada |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ big numbers, today ring, filled selection; summary spoken |
| 10 | Greyscale | ✅ fill survives; no red Sundays to lose |
| 14 | Status colours | ✅ none except Amount tone in the earnings view |
| 15–16 | Review | ⬜ pending |
