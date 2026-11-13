# Selection controls — Checkbox · Radio · Switch

Status: **Proposed** · Tier: Core · Package: `SnabbitCheckbox`, `SnabbitRadio`, `SnabbitSwitch` · Figma: Check box (`8:1322`), Radio button (`8:1091`); Switch is new

Three controls, one rulebook. They differ only in shape and in what the shape promises: a **checkbox** is a square (any number can be on), a **radio** is a circle (exactly one), a **switch** is a pill with a knob (on/off, takes effect now). The expert learns the shapes once.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Box ~20 / 18 / 16 dp, three sizes | **One size: 24 dp** control in a **48 dp row** | P3. Three sizes of a tap target that is already small is three ways to miss. |
| Label text only | Label + optional description + optional leading icon/asset | The label alone is text; an icon or pictogram lets the option be recognised, not read (P1). |
| States: unchecked, checked, indeterminate, error, disabled | Same, plus **pressed**, and error is **group-level** only | Error belongs to the question ("Choose one"), not to a single box. |
| No Switch | **Switch** added | Availability on/off, shift on/off — the missing P0 from the benchmark. |
| Whole control is the tap target | **Whole row** is the tap target | Tapping the word must work; nobody aims for a 20 dp square on an e-bike. |
| Checkbox always leading | **Trailing checkbox** allowed in a multi-select row whose leading slot already holds a meaning icon or pictogram (`map-pin` for a place) | P1: the icon keeps saying *what*, the checkbox says *picked*. Two things in the leading slot would push the label off its column, and dropping the icon would turn a list of places into a list of words (`projects/hood-shift-change`, 2026-10-07). |
| No limit on how many | **A cap** (*up to 3*): a counter by the list heading, and at the cap the unpicked rows go disabled | P5: she sees how many are left before she runs out, and a row she cannot pick no longer looks pickable (`projects/hood-shift-change`, 2026-10-07). |

---

## Anatomy

```
┌ 48 dp row ───────────────────────────────────────────┐
│ [control]  [icon]  Label                    [switch] │
│                    Description (optional)            │
└──────────────────────────────────────────────────────┘
```

Checkbox and Radio sit **leading**; Switch sits **trailing** (the row reads "Label … on/off", like every phone settings screen she has seen). The one exception is the **trailing checkbox** below. Control 24 dp; row min height 48 dp; horizontal gap 12 dp; label `BodyLg` 16 sp `textPrimary`; description `BodyMd` 14 sp `textSecondary`; optional leading icon 24 dp Phosphor or a 40 dp pictogram asset.

### Trailing checkbox — multi-select with a meaning icon

```
┌ 48 dp row · whole row is the tap target ───────────────┐
│ [map-pin]  Label                             [checkbox] │
│            Description (optional)                       │
└─────────────────────────────────────────────────────────┘
```

Asked by `projects/hood-shift-change` (G4 · *Pick instead*: she picks up to 3 work areas from a list), approved by the design lead 2026-10-07 (`DECISIONS.md`).

Allowed only when the row is **multi-select** and its leading slot already holds a **meaning icon or pictogram that must stay**: the place pin in a list of work areas, a service's pictogram in a list of services. The icon says *what* the row is; the checkbox says *picked*. When there is no such icon, the checkbox stays leading. Radio never moves (single choice keeps its ring at the start of the row).

- **The whole row is the tap target**, ≥ 48 dp tall. Tapping the label, the icon or the box toggles the row. The box is never the only place to tap.
- **The checkbox is the same 24 dp box** as the leading one: unchecked `borderStrong` 1.5 on `bgPrimary`; checked `interactiveDefault` fill with a white `check` (bold 16, `textInverse`). It sits in a fixed 24 dp trailing slot, `spacing.4` after the text, so the boxes form a column.
- **A selected row also gets the `bgBrandSubtle` tint** across its full width, like ListItem `selected`, but the leading icon **stays** (it is the meaning; the checkbox already carries the check). Tint + filled box + `check` = three channels (P1).
- The row is a ListItem `selection` (`components/list-item.md`); its title may be SemiBold in a choice list (`list-item.md` § Content).

### A cap — *up to 3*

When she may pick **up to N** (N stated by the screen, never guessed):

- **A counter sits by the list heading**, trailing on the heading's line: *2 of 3* in `BodyMd` Medium `textSecondary`, tabular. It starts at *0 of 3*. It is the only place the limit is written.
- **At the cap, every unpicked row goes disabled:** label, description and leading icon in `textDisabled`, **no checkbox drawn**, and the 24 dp trailing slot kept empty so the column does not shift. The row is not tappable. Picked rows stay enabled, so unticking one re-opens the rest at once.
- `textDisabled` is below contrast by design (`foundations/accessibility.md`); the reason sits beside it in words, the counter *3 of 3*.
- Nothing shakes, toasts or explains when she reaches the cap; the rows going quiet and the counter reading *3 of 3* say it.

---

## Shapes and states

### Checkbox (24 × 24, radius `sm` 4, border `thick` 1.5)

| State | Border | Fill | Glyph |
| --- | --- | --- | --- |
| unchecked | `borderStrong` | `bgPrimary` | — |
| checked | — | `interactiveDefault` | Phosphor `check` bold, `textInverse`, 16 dp |
| indeterminate | — | `interactiveDefault` | `minus` bold, `textInverse` — only on a parent "select all" |
| pressed | as state | +`interactivePressed` on checked / `bgBrandSubtle` on unchecked, 100 ms | |
| disabled unchecked | `borderDefault` | `bgTertiary` | — |
| disabled checked | — | `borderDefault` fill | `check` in `textTertiary` |
| group error | `borderError` 2 dp on every unchecked box in the group | | + error line under the group |
| at the cap, unpicked (trailing or leading) | **no box drawn**; the 24 dp slot is kept empty | row text and leading icon `textDisabled` | — · not tappable |

A **trailing** checkbox uses the same states; a checked trailing row adds the `bgBrandSubtle` row tint.

### Radio (24 × 24, radius `full`, border `thick` 1.5)

| State | Border | Fill | Glyph |
| --- | --- | --- | --- |
| unselected | `borderStrong` | `bgPrimary` | — |
| selected | `interactiveDefault` 2 dp | `bgPrimary` | inner dot 12 dp `interactiveDefault` |
| disabled | `borderDefault` | `bgTertiary` | dot `textTertiary` if selected |
| group error | `borderError` 2 dp on every unselected radio | | + error line |

Selected radio is **ring + dot**, not a filled circle, so selected radio and checked checkbox never look alike.

### Switch (track 52 × 32, radius `full`; knob 24, 4 dp inset)

| State | Track | Knob | Glyph in knob |
| --- | --- | --- | --- |
| off | `borderStrong` fill (gray.500) | `bgPrimary`, left | `x` regular 14 dp `textSecondary` |
| on | `interactiveDefault` | `bgPrimary`, right | `check` bold 14 dp `interactiveDefault` |
| pressed | as state | knob widens to 28 for 100 ms | |
| disabled off | `bgTertiary` | `bgSecondary` | `x` `textTertiary` |
| disabled on | `bgBrandSubtle` | `bgSecondary` | `check` `textTertiary` |
| loading (applying) | as previous state | knob shows a spinner; taps ignored | |

The glyph inside the knob is the P1 rule made physical: on/off is carried by **position + colour + icon**, so a grey track and a pink track are never the only difference. Off track is `borderStrong` (gray.500), not `borderDefault`, so an off switch still reads as a control against a white card.

---

## Which one

| Use | When | Not when |
| --- | --- | --- |
| **Checkbox** | Several may apply (services she can do; days she works); a single consent (*I agree*) | A yes/no that takes effect immediately → Switch |
| **Radio** | Exactly one of **2–5** plain options (shift length, language) | > 5 options → `Select` sheet · options need a description, price or image → `SelectionCard` |
| **Switch** | On/off that **takes effect now**, no submit (available for jobs, notifications) | Anything that needs *Save* → Checkbox · a costly toggle (going offline mid-shift) → Switch **plus** confirmation sheet (P3) |

A radio group is never used for a single yes/no; that is a Switch (immediate) or two Buttons (decision).

---

## Behaviour

- **The whole row toggles.** Tapping label, description or icon toggles the control. Ripple/pressed wash covers the row (`bgSecondary`, 100 ms).
- Haptic `light` on every state change. Switch **on** adds the `confirm` sound family only when the toggle changes something the expert earns from (availability on).
- **Switch is immediate.** The state flips optimistically, then `loading` shows in the knob while the server applies; on failure it flips back with a Toast that says what happened.
- **Costly switch-off** (availability off during a shift, Shield off): flip is not immediate — a confirmation sheet with the consequence opens; the switch moves only after confirm.
- Radio: selecting one deselects the rest; a group starts with **no** selection unless a default is safe and obvious. Never pre-select the paid or irreversible option.
- Indeterminate exists only on a parent checkbox summarising children; never as an input state.
- **Capped multi-select:** each tick moves the counter (*1 of 3* → *2 of 3*) with `light` haptic; the tick that reaches the cap disables every unpicked row in the same frame; the first untick re-enables them. A strip of removable Chips above the list (`components/chip.md` § `removable`) mirrors the picks: removing a chip unticks its row, and ticking a row adds its chip.
- Group error appears on submit, on every unchosen control in the group, with one error line below the group: *Choose one shift* · *Tick to continue*. Clears on first change.
- Font scaling to 130 %: label and description wrap; the row grows; control stays 24 dp and top-aligned to the first text line.

---

## Content

- Label: a noun or a short state, sentence case, ≤ 24 characters: *Full-time (8 hours)*, *Available for jobs*, *Hindi*.
- Description: one line ≤ 40 chars adding what the label cannot: *You'll get jobs 9 am – 6 pm*.
- Switch labels name the **thing**, not the state — *Available for jobs*, never *Turn on availability*. The switch shows the state.
- Consent checkboxes: the label is what she agrees to in plain words, with a `speaker-high` IconButton beside it that reads the full text aloud (P4). Never *I accept the Terms & Conditions* alone.
- Leading icon or pictogram from the register/asset library when the options are things she recognises by picture (services, languages by script sample, uniforms). With a multi-select checkbox, that icon keeps the leading slot and the checkbox moves trailing.
- Cap counter: *2 of 3* — numbers first, no *selected* or *areas* after it; the list heading already names the thing (*Areas near you*).

---

## Do / Don't

**Do** — make the whole row the target · keep the meaning icon leading and move the checkbox trailing when both are needed · tint a picked row · show *2 of 3* by the heading when there is a cap · keep the empty checkbox slot on a disabled row so the column stays straight.

**Don't** — put a checkbox and a meaning icon side by side in the leading slot · drop the icon to make room for the box · move a Radio trailing · use a trailing checkbox in a single-choice list · let her tap past the cap and then show an error · hide the cap until she hits it.

---

## Accessibility

Role checkbox / radio / switch with checked state announced; label is the accessible name, description the hint. Row hit area 48 dp. A **trailing** checkbox row is one checkbox node for the whole row (the leading icon is decorative to the reader), announced in reading order: label, description, state. With a **cap**, the state carries the count — *"HSR Layout, 2 km, selected, 2 of 3"*; at the cap an unpicked row is announced *"Bellandur, 4 km, not available, 3 of 3 picked"*, and the counter by the heading is a live region that reads its new value after each tick. Contrast: `borderStrong` on white 4.8:1; selected/checked `interactiveDefault` fill with white glyph 4.1:1 (large glyph, passes). Reduced motion: knob slides → jumps; wash fades → none.

---

## Token proposals

None new. Switch off-track uses `borderStrong` as a fill (a border token used as fill) — acceptable, but propose `bgControlOff` = gray.500 if it recurs in Slider.

---

## Figma reconciliation

1. Check box and Radio button: collapse three sizes to one 24 dp control inside a 48 dp row component with `Label`, `Description`, `Leading icon` slots.
2. Rename `Selected` → `State` with Unchecked / Checked / Indeterminate (checkbox only) / Disabled / Disabled checked; add `Pressed`. Move `Error` to a **Group** component (row list + error line).
3. Radio selected = ring + dot (not filled).
4. Add **Switch**: 52 × 32 track, 24 knob with `x`/`check` glyph; states Off / On / Disabled off / Disabled on / Loading.
5. Rebind colours to semantic variables; text to `BodyLg` / `BodyMd`.
6. **New ask (2026-10-07, `projects/hood-shift-change`):** the DS library has no trailing-checkbox row yet. Add a `Control position` property (Leading / **Trailing**, Trailing on Checkbox only) with the `Leading icon` slot kept, the `bgBrandSubtle` tint on Checked, and a **Capped** state (unpicked, `textDisabled`, no box, slot kept). Add a **Cap counter** to the Group component's heading (*2 of 3*).

Result: Checkbox 6, Radio 5, Switch 5 = **16 row variants** plus one Group component, replacing 33 control-only variants.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ whole row 48, trailing checkbox rows too |
| 2 | ⚙ Semantic tokens only | ✅ (one proposal noted) |
| 3 | ⚙ Type scale | ✅ BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ checkbox fill + glyph; radio ring + dot; switch position + colour + glyph; trailing checked row adds the tint; capped row = no box + muted text + counter |
| 5 | ⚙ Loading / error | ✅ switch loading; group error |
| 6 | ⚙ Duplicate taps | ✅ switch ignores taps while loading |
| 7 | ⚙ Four languages at large font | ⬜ label ≤ 24 chars; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ shape says how many; glyph says state; icon/pictogram says which — kept leading when the checkbox moves trailing |
| 10 | Greyscale | ✅ |
| 11 | Costly actions protected | ✅ costly switch-off → confirmation sheet; the cap disables rows instead of erroring after the tap |
| 12 | Sound | ✅ confirm on availability-on only |
| 15–16 | Copy / device review | ⬜ pending |
