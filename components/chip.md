# Chip

Status: **Proposed** · Tier: Core · Package: `SnabbitChip` · Figma: Selection Chips (`122:145`); Selection Pill (`1075:9887`) is reclassified to `SelectionCard`

A chip is a small tappable choice in a row of choices — filter today's jobs by *All · Cleaning · Cooking*, pick a quick reply, choose a shift day. It is the one small control that is allowed to be a pill, because a row of pills says "pick from these" the way nothing else does.

Chip is not a Tag (a Tag is read, a Chip is tapped) and not a Button (a Button does something; a Chip selects something).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Two variants: *All* unselected / selected, 32 dp | **40 dp** tall, three kinds (filter, choice, quick-reply), five states | 32 dp in a scrolling row on a moving e-bike is a miss; 40 dp with a 48 dp row hit area is the floor (P3). |
| Selected = pink border, same white fill | Selected = `bgBrandSubtle` fill + `borderBrand` + **leading `check`** | Selection must change shape, not only border colour (P1). |
| "Selection Pill" (Camera / Gallery rows) filed as chips | Moved to `SelectionCard` | Full-width, one per line, with an icon and a description — that is a card, not a chip. |
| No icon, no count | Optional leading Phosphor icon; optional trailing count | An icon lets a category be recognised (P1); a count (*Cleaning · 3*) tells her what's behind the filter. |

---

## Anatomy

```
╭───────────────────────────╮
│ [check|icon]  Label  [12] │   40 dp · radius full · padding 0 16 · gap 8
╰───────────────────────────╯
```

Leading slot: Phosphor `regular` 20 dp icon **or**, when selected, Phosphor `check` bold 20 dp (the check replaces the icon so width does not jump). Label `BodyMd` 14 sp Medium. Trailing count `Caption` 12 sp Medium in `textSecondary`, tabular. Chips never wrap; a label that does not fit is shortened.

Row: horizontal, 8 dp between chips, 16 dp side padding, scrolls with a 16 dp fade at the trailing edge so the cut-off says "more". The row is 48 dp tall so the hit area extends 4 dp above and below each chip.

---

## Kinds

| Kind | Selection | Fires | Use |
| --- | --- | --- | --- |
| `filter` | **exactly one**; first chip is *All* and is selected by default | on tap, filters the list below immediately | Job list by category, earnings by week, history by status |
| `choice` | **zero or more** | on tap, toggles; the screen's Button commits | Days you work, services you offer, in a sheet or form |
| `quick-reply` | none — fires once and the row disappears | sends the reply | Chat with customer/support: *On my way* · *5 min late* · *Reached* |
| **`reason`** | **exactly one**, none selected to begin with | on tap, selects and commits; a second tap moves the selection, never clears it | Why a number or a state differs from expected — *client needed more · spilled/wasted · product ran out · client asked less* (`beauty-job-cycle` PRD § 6) |
| **`reaction`** | **zero or more**, each toggles on its own | on tap, adds or removes *her* reaction and updates the count at once | How she feels about a post or a story — `heart` · `thumbs-up` · `hands-clapping` · `hands-praying`, with a count (`patterns/notification-centre.md`, 2026-09-24) |

A `filter` row never has a "none selected" state. A `choice` row is not for exactly-one (that is Radio). `quick-reply` chips carry a `paper-plane-right` trailing icon so they look like they *do* something.

**Why `reason` is a Chip and not a Radio.** The spec above says exactly-one is Radio, and for a form that holds. A reason picker is not a form: it appears *after* she has already done the thing, it offers three or four short answers, and it must not look like another question standing between her and finishing. A stacked radio list reads as a form to fill; a wrapped row of short answers reads as *pick the closest one*. It keeps Chip's exactly-one selection from `filter` but drops the *All*-selected-by-default rule — **there is no default reason, because guessing why something happened on her behalf is worse than asking.** Reasons wrap onto a second line rather than scrolling: a reason she cannot see is a reason she will not give.

---

**Why `reaction` is a Chip and not a new control.** The Figma sheet drew reactions as emoji pills with a count — which is a Chip with a leading icon and a trailing count, the two slots this component already has. `reaction` keeps `choice`'s zero-or-more toggling and changes two things: the leading icon **stays** when selected and goes to Phosphor `fill` in `textBrand` (a `check` would hide which reaction it is), and there is no label — the icon is the word, so the chip is 40 dp tall and hugs icon + count. ≤ 4 in a row, `spacing.3` apart, never scrolling: a reaction she cannot see is a reaction she cannot give. The count is `Caption` Medium `textSecondary`, ≤ 999 then *999+*, and it changes with `motion.fast` when she taps. The set is fixed by the register: `fire` is not offered because it already means *streak* (`foundations/icons.md`).

## States

| State | Border | Fill | Label / icon |
| --- | --- | --- | --- |
| unselected | `borderDefault` 1 dp | `bgPrimary` | `textBody` |
| selected | `borderBrand` 1.5 dp | `bgBrandSubtle` | `textBrand`; leading `check` |
| pressed | as state | unselected → `bgSecondary`; selected → pink.100* | |
| disabled | `borderDefault` | `bgTertiary` | `textTertiary`; not tappable |
| focused | + 2 dp `borderFocus` ring outside | | |

\* pink.100 is the `bgBrandSubtlePressed` token already proposed in Button.

`quick-reply` uses the unselected look with `textBrand` label and icon (it is an action, so it borrows brand colour), pressed → `bgBrandSubtle`.

---

## Behaviour

- Tap toggles (`choice`) or selects (`filter`) with `light` haptic. No sound.
- `filter`: the list updates within 300 ms; while loading, the chip keeps its selected look and the list shows skeletons — the chip never shows a spinner.
- Selected chip scrolls into view when the row appears; *All* is always first and never scrolls off.
- **≤ 6 chips in a row.** More than six categories is a `Select` sheet. The research is blunt about hierarchical and long choices; a chip row must be scannable in one look.
- `choice` rows show the count of selected items in the screen's Button label (*Save 3 days*).
- Font scaling to 130 %: chips grow in height and width; the row stays single-line and scrolls.
- Reduced motion: no fade animation on selection; state changes instantly.

---

## Content

- Label: one word, or two at most, sentence case, ≤ 12 characters in the longest language: *All*, *Cleaning*, *Cooking*, *This week*, *Paid*, *Mon*, *On my way*.
- Icon: from the register, meaning the category: `broom` cleaning, `cooking-pot` cooking, `t-shirt` laundry, `calendar` this week. Filter rows with categories **should** carry icons; time-range rows (*Today · This week*) need none.
- Count: integer only, ≤ 99 then *99+*. Shown only on `filter` chips, only when it helps her choose.
- Quick replies are complete, sendable sentences ≤ 20 chars, written in the expert's voice: *On my way*, *Reached*, *Need 5 more min*.

---

## Accessibility

Role: `filter` → radio group; `choice` → checkbox group; `quick-reply` → button. Announced with state and count: "Cleaning, 3 jobs, selected". Hit area 48 dp via the row. Contrast: `textBody` on white 10.3:1; `textBrand` on `bgBrandSubtle` 4.2:1 — passes for 14 sp Medium as UI text with the check as second channel.

---

## Token proposals

None new (reuses `bgBrandSubtlePressed`). Row fade uses `bgPrimary` → transparent, component-owned.

---

## Figma reconciliation

1. Selection Chips → **Chip**: `Kind` (Filter / Choice / Quick reply / Reason / Reaction), `State` (Unselected / Selected / Pressed / Disabled), booleans `Leading icon`, `Count`. `Reaction` has no label slot; its icon swaps to the `fill` weight when selected.
2. Height 40, radius full, padding 16, gap 8; selected = `bgBrandSubtle` fill + `borderBrand` 1.5 + leading `check`.
3. Add a **Chip row** component (auto-layout, 8 dp gap, 48 dp tall) with the trailing fade.
4. Move Selection Pill (Camera / Gallery) to SelectionCard.
5. Rebind colours to semantic variables; label to `BodyMd` Medium.

Result: 3 kinds × 4 states × (icon, count) ≈ **20 variants** from 2.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ 40 dp chip in 48 dp row |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyMd Medium / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ selected = fill + border + check |
| 5 | ⚙ Loading | ✅ list skeletons, chip unchanged |
| 6 | ⚙ Duplicate taps | ✅ toggle is idempotent; quick-reply fires once then row disappears |
| 7 | ⚙ Four languages | ⬜ ≤ 12 chars; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ icon + check |
| 10 | Greyscale | ✅ check + fill |
| 15–16 | Review | ⬜ pending |
