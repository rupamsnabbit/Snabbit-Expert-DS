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
| No way to take a pick back from a summary | **`removable`** kind: a picked value shown back as a selected-style chip with a trailing `x`; no `check` | The picked areas sit above the list as one strip she can read and undo at a glance; the list already shows the checks, so a second check would say the same thing twice (P1). Asked by `projects/hood-shift-change`, 2026-10-07. |

---

## Anatomy

```
╭───────────────────────────╮
│ [check|icon]  Label  [12] │   40 dp · radius full · padding 0 16 · gap 8
╰───────────────────────────╯
```

Leading slot: Phosphor `regular` 20 dp icon **or**, when selected, Phosphor `check` bold 20 dp (the check replaces the icon so width does not jump). `removable` has no leading slot and a trailing `x` instead (below). Label `BodyMd` 14 sp Medium. Trailing count `Caption` 12 sp Medium in `textSecondary`, tabular. Chips never wrap; a label that does not fit is shortened.

Row: horizontal, 8 dp between chips, 16 dp side padding, scrolls with a 16 dp fade at the trailing edge so the cut-off says "more". The row is 48 dp tall so the hit area extends 4 dp above and below each chip.

---

## Kinds

| Kind | Selection | Fires | Use |
| --- | --- | --- | --- |
| `filter` | **exactly one**; first chip is *All* and is selected by default — **or her current value**, when the list is about something she already has (below) | on tap, filters the list below immediately | Job list by category, earnings by week, history by status; timings lists by hours a day (`projects/hood-shift-change`) |
| `choice` | **zero or more** | on tap, toggles; the screen's Button commits | Days you work, services you offer, in a sheet or form |
| `quick-reply` | none — fires once and the row disappears | sends the reply | Chat with customer/support: *On my way* · *5 min late* · *Reached* |
| **`reason`** | **exactly one**, none selected to begin with | on tap, selects and commits; a second tap moves the selection, never clears it | Why a number or a state differs from expected — *client needed more · spilled/wasted · product ran out · client asked less* (`beauty-job-cycle` PRD § 6) |
| **`answer`** | **two answers, both "chosen"** — every pill starts in *Coming* and a tap flips it to *Can't come*; there is no unselected state | on tap, flips; the screen's Button commits (the sheet) or the flip is live (the Home record, before the lock) | One shift she is promising or declining — *8 am – 12 pm* · *4 – 8 pm* — in the evening attendance sheet and the Home shifts record (`projects/advance-attendance`, 2026-10-01) |
| **`removable`** | none to choose — every chip is a value she **already picked** elsewhere on the screen | the trailing `x` removes the value at once and unticks its row; no commit | The picked-areas strip above a multi-select list — *Agara ✕ · HSR Layout ✕* over *Areas near you* (`projects/hood-shift-change`, G4, 2026-10-07) |
| **`reaction`** | **zero or more**, each toggles on its own | on tap, adds or removes *her* reaction and updates the count at once | How she feels about a post or a story — `heart` · `thumbs-up` · `hands-clapping` · `hands-praying`, with a count (`patterns/notification-centre.md`, 2026-09-24) |

A `filter` row never has a "none selected" state. A `choice` row is not for exactly-one (that is Radio). `quick-reply` chips carry a `paper-plane-right` trailing icon so they look like they *do* something.

**When the `filter` default is her current value.** Some lists are about something she already has, such as the
hours she works a day. In those rows:

- **Her current value is selected** when the row appears. She is never asked for it.
- **The chips are in their natural order** (*4 hrs · 6 hrs · 8 hrs*), and ***All* comes last**.
- **Only values that exist in the list are offered.** Hours the list has nothing for are not shown. If her own value
  has nothing in the list, it is not offered either, and the row opens on *All*, because a `filter` row always has
  one chip selected.

The selected chip scrolls into view when the row appears. Example: the hours filter on every timings list, where her
*8 hrs* is selected, so the list opens on timings of the length she works now (`projects/hood-shift-change`,
`DECISIONS.md` 2026-10-01). Every other `filter` row keeps *All* first and selected.

**Why `reason` is a Chip and not a Radio.** The spec above says exactly-one is Radio, and for a form that holds. A reason picker is not a form: it appears *after* she has already done the thing, it offers three or four short answers, and it must not look like another question standing between her and finishing. A stacked radio list reads as a form to fill; a wrapped row of short answers reads as *pick the closest one*. It keeps Chip's exactly-one selection from `filter` but drops the *All*-selected-by-default rule — **there is no default reason, because guessing why something happened on her behalf is worse than asking.** Reasons wrap onto a second line rather than scrolling: a reason she cannot see is a reason she will not give.

---

**`removable` — a pick shown back, with a way to take it back.** Asked by `projects/hood-shift-change` (G4 · *Pick instead*: she picks up to 3 work areas; the picks show as chips under the search), approved by the design lead 2026-10-07.

```
╭──────────────────────╮
│  Label            ✕  │   40 dp · radius full · padding 0 8 0 16 · gap 8
╰──────────────────────╯
        ✕ hit area 48 × 48, centred on the icon — may extend past the chip
```

- **Selected look, no `check`.** `bgBrandSubtle` fill, `borderBrand` 1.5, `textBrand` label — the chip's `selected` state — with **no leading `check`**: the list above already shows what is picked, and a check beside a ✕ would ask her to read two marks that point opposite ways.
- **Trailing `x`**, Phosphor `regular` 20 dp in `textBrand`, the register's *remove this value* (`foundations/icons.md`). Its **hit area is ≥ 48 × 48 dp**, centred on the icon; it may extend past the chip's edge and 4 dp above and below it. The label is not a second target: tapping the label does nothing, so a mis-tap never removes a pick.
- **Removing a chip unticks the row** it came from (and re-enables the rest if the list was at its cap, `selection-controls.md` § A cap); ticking a row adds its chip at the end of the strip. The strip and the list are one state, shown twice.
- **Chips wrap.** The strip wraps onto a second line rather than scrolling: a pick she cannot see is a pick she cannot undo. Lines sit `spacing.3` apart, so the 48 dp ✕ areas of two lines meet and never overlap. The label inside a chip still never wraps; it is shortened.
- **Empty strip** — when nothing is picked, the strip is not drawn (no placeholder text); the list's counter says *0 of 3*.
- **Use on:** a picked-values strip above a multi-select list (work areas; later, services or languages). **Not** for filters (that is `filter`), not for choosing (that is `choice`), not for a single value (a single pick is shown in its row).

**Why `reaction` is a Chip and not a new control.** The Figma sheet drew reactions as emoji pills with a count — which is a Chip with a leading icon and a trailing count, the two slots this component already has. `reaction` keeps `choice`'s zero-or-more toggling and changes two things: the leading icon **stays** when selected and goes to Phosphor `fill` in `textBrand` (a `check` would hide which reaction it is), and there is no label — the icon is the word, so the chip is 40 dp tall and hugs icon + count. ≤ 4 in a row, `spacing.3` apart, never scrolling: a reaction she cannot see is a reaction she cannot give. The count is `Caption` Medium `textSecondary`, ≤ 999 then *999+*, and it changes with `motion.fast` when she taps. The set is fixed by the register: `fire` is not offered because it already means *streak* (`foundations/icons.md`).

**Why `answer` is a Chip and not `choice`.** A `choice` chip has one meaning when selected and none when not — an
unselected day is simply not a day she works. A shift she *can't come to* is not "unselected": it is an answer she
gave, and hiding it as the absence of a check would make the default and the refusal look alike (P5). So `answer`
has **two filled states, each with its own icon**: *Coming* — `check`, `bgBrandSubtle`, `borderBrand` 1.5,
`textBrand`; *Can't come* — `moon`, `bgTertiary`, `borderDefault`, `textBody`. The icon changes, the fill changes, the
word she hears changes — three channels (P1). The label is a compact time range (*8 am – 12 pm*, ≤ 12 characters);
the full `content.md` § 5 form belongs to the Toast and the sheet title, not the pill. Pills sit in the 48 dp Chip
row, never scroll (≤ 3 shifts a day), and are never pre-set to *Can't come* — the default is always *Coming*,
because that is what the product treats silence as, and the pill must say so.

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

`removable` has only the **selected** look (it is always a value she picked), with the trailing `x` and no `check`. Pressed: the fill goes to pink.100\* while the ✕ is held. Disabled: not used — a value she cannot remove is not shown as removable.

`answer` has no unselected row: *Coming* renders as **selected** above with `check`; *Can't come* renders as **unselected fill + `borderDefault`** but with the `moon` leading icon and `textBody` label — it is a chosen state, so it never looks disabled (`bgTertiary`, not `textTertiary`). Pressed and focused as for the others.

---

## Behaviour

- Tap toggles (`choice`) or selects (`filter`) with `light` haptic. No sound.
- `filter`: the list updates within 300 ms; while loading, the chip keeps its selected look and the list shows skeletons — the chip never shows a spinner.
- Selected chip scrolls into view when the row appears; *All* is always first and never scrolls off. The exception is a current-value `filter` row, where *All* is last and her value is scrolled into view.
- **≤ 6 chips in a row.** More than six categories is a `Select` sheet. The research is blunt about hierarchical and long choices; a chip row must be scannable in one look.
- `choice` rows show the count of selected items in the screen's Button label (*Save 3 days*).
- Font scaling to 130 %: chips grow in height and width; the row stays single-line and scrolls.
- Reduced motion: no fade animation on selection; state changes instantly.
- `removable`: the ✕ removes with `light` haptic; the chip leaves with `motion.fast` and the strip closes the gap; the row in the list unticks in the same frame. No undo toast — re-ticking the row puts it back. Reduced motion: the chip disappears without the exit.

---

## Content

- Label: one word, or two at most, sentence case, ≤ 12 characters in the longest language: *All*, *Cleaning*, *Cooking*, *This week*, *Paid*, *Mon*, *On my way*. `answer`: a compact time range — *8 am – 12 pm*, *4 – 8 pm* — digits, en dash with spaces, lowercase am/pm; the hour alone when both ends share the half of the day.
- Icon: from the register, meaning the category: `broom` cleaning, `cooking-pot` cooking, `t-shirt` laundry, `calendar` this week. Filter rows with categories **should** carry icons; time-range rows (*Today · This week*) need none.
- Count: integer only, ≤ 99 then *99+*. Shown only on `filter` chips, only when it helps her choose.
- Quick replies are complete, sendable sentences ≤ 20 chars, written in the expert's voice: *On my way*, *Reached*, *Need 5 more min*.
- `removable`: the label is the value exactly as the row names it (*HSR Layout*), so she matches chip to row without reading twice; no verb, no *✕ Remove* text.

---

## Do / Don't

**Do** — `removable`: show the picks above the list they came from · keep the selected look · give the ✕ a 48 dp target · let the strip wrap · untick the row when the chip goes.

**Don't** — `removable`: add a `check` beside the ✕ · make the label a second remove target · scroll the strip sideways · use it as a filter or a choice · show an empty strip with placeholder text.

---

## Accessibility

Role: `filter` → radio group; `choice` → checkbox group; `quick-reply` → button; `removable` → the chip is text and its ✕ is a button named *"Remove HSR Layout"*; after removal, focus moves to the next chip (or the list heading when none is left) and the counter's live region reads the new count (*"1 of 3"*). Announced with state and count: "Cleaning, 3 jobs, selected". Hit area 48 dp via the row. Contrast: `textBody` on white 10.3:1; `textBrand` on `bgBrandSubtle` 4.2:1 — passes for 14 sp Medium as UI text with the check as second channel.

---

## Token proposals

None new (reuses `bgBrandSubtlePressed`; `removable` uses only the selected state's tokens). Row fade uses `bgPrimary` → transparent, component-owned.

---

## Figma reconciliation

1. Selection Chips → **Chip**: `Kind` (Filter / Choice / Quick reply / Reason / Reaction / Answer / **Removable**), `State` (Unselected / Selected / Pressed / Disabled; Answer: **Coming / Can't come**), booleans `Leading icon`, `Count`. `Reaction` has no label slot; its icon swaps to the `fill` weight when selected. `Answer` has a fixed leading icon per state (`check` / `moon`).
2. Height 40, radius full, padding 16, gap 8; selected = `bgBrandSubtle` fill + `borderBrand` 1.5 + leading `check`.
3. Add a **Chip row** component (auto-layout, 8 dp gap, 48 dp tall) with the trailing fade. For `filter` rows, add a `Default` property: *All first* or *Current value* (natural order, *All* last).
4. Move Selection Pill (Camera / Gallery) to SelectionCard.
5. Rebind colours to semantic variables; label to `BodyMd` Medium.
6. **New ask (2026-10-07, `projects/hood-shift-change`):** the DS library has no removable chip. Add `Kind` = **Removable**: selected look only, no leading slot, trailing `x` 20 dp `textBrand` with a 48 × 48 hit-area frame, padding 16 / 8; plus a **wrapping** Chip row variant (auto-layout wrap, 8 dp gaps, no fade).

Result: 3 kinds × 4 states × (icon, count) ≈ **20 variants** from 2.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ 40 dp chip in 48 dp row; `removable` ✕ 48 × 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyMd Medium / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ selected = fill + border + check |
| 5 | ⚙ Loading | ✅ list skeletons, chip unchanged |
| 6 | ⚙ Duplicate taps | ✅ toggle is idempotent; quick-reply fires once then row disappears; `removable` ✕ removes once (the chip is gone) |
| 7 | ⚙ Four languages | ⬜ ≤ 12 chars; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ icon + check; `removable` = brand pill + ✕ |
| 10 | Greyscale | ✅ check + fill; `removable` reads by the ✕ |
| 15–16 | Review | ⬜ pending |
