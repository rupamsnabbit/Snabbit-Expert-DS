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

---

## Anatomy

```
┌ 48 dp row ───────────────────────────────────────────┐
│ [control]  [icon]  Label                    [switch] │
│                    Description (optional)            │
└──────────────────────────────────────────────────────┘
```

Checkbox and Radio sit **leading**; Switch sits **trailing** (the row reads "Label … on/off", like every phone settings screen she has seen). Control 24 dp; row min height 48 dp; horizontal gap 12 dp; label `BodyLg` 16 sp `textPrimary`; description `BodyMd` 14 sp `textSecondary`; optional leading icon 24 dp Phosphor or a 40 dp pictogram asset.

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
- Group error appears on submit, on every unchosen control in the group, with one error line below the group: *Choose one shift* · *Tick to continue*. Clears on first change.
- Font scaling to 130 %: label and description wrap; the row grows; control stays 24 dp and top-aligned to the first text line.

---

## Content

- Label: a noun or a short state, sentence case, ≤ 24 characters: *Full-time (8 hours)*, *Available for jobs*, *Hindi*.
- Description: one line ≤ 40 chars adding what the label cannot: *You'll get jobs 9 am – 6 pm*.
- Switch labels name the **thing**, not the state — *Available for jobs*, never *Turn on availability*. The switch shows the state.
- Consent checkboxes: the label is what she agrees to in plain words, with a `speaker-high` IconButton beside it that reads the full text aloud (P4). Never *I accept the Terms & Conditions* alone.
- Leading icon or pictogram from the register/asset library when the options are things she recognises by picture (services, languages by script sample, uniforms).

---

## Accessibility

Role checkbox / radio / switch with checked state announced; label is the accessible name, description the hint. Row hit area 48 dp. Contrast: `borderStrong` on white 4.8:1; selected/checked `interactiveDefault` fill with white glyph 4.1:1 (large glyph, passes). Reduced motion: knob slides → jumps; wash fades → none.

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

Result: Checkbox 6, Radio 5, Switch 5 = **16 row variants** plus one Group component, replacing 33 control-only variants.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ whole row 48 |
| 2 | ⚙ Semantic tokens only | ✅ (one proposal noted) |
| 3 | ⚙ Type scale | ✅ BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ checkbox fill + glyph; radio ring + dot; switch position + colour + glyph |
| 5 | ⚙ Loading / error | ✅ switch loading; group error |
| 6 | ⚙ Duplicate taps | ✅ switch ignores taps while loading |
| 7 | ⚙ Four languages at large font | ⬜ label ≤ 24 chars; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ shape says how many; glyph says state; icon/pictogram says which |
| 10 | Greyscale | ✅ |
| 11 | Costly actions protected | ✅ costly switch-off → confirmation sheet |
| 12 | Sound | ✅ confirm on availability-on only |
| 15–16 | Copy / device review | ⬜ pending |
