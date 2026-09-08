# SelectionCard

Status: **Proposed** · Tier: Core · Package: `SnabbitSelectionCard` · Figma: Simple Selection Cards (`10:2334`), Selection Cards with Description (`19:133`), Date Selection Cards (`10:2585`), Complex Selection Cards (`10:2791`), Selectable Card (`75:500`), Selection Pill (`1075:9887`); Service Selection Card (`1237:10853`) and Shift Selection Card (`1075:6540`) become compositions. Shipped (Self-Serve ER/AR `HqmnjmxhZvyvZxmIaVMCrB`): *What work are you interested in?* photo cards (`599:38186`) and *Tap on the image to proceed* (`599:38549`) — the `hero` variant.

A Card that behaves like a Radio or a Checkbox. Used when the options need more than a label to choose between — a description, a price, an illustration, two facts — and a plain selection row would leave her guessing. The card is the tap target; the control inside it shows the state.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Seven frames with two different layouts (control at the bottom after a divider · control leading) | **One layout: control leading, top-left**, same place as the Radio/Checkbox row | Transfer of learning — the control is where it always is. |
| Selected = pink border only | Selected = `borderBrand` 2 dp **and** the control's selected state **and** a `check` badge on the asset when present | Border colour alone is not a state (P1). |
| Illustration is a coloured clock per card | Optional 64 dp **asset** slot (pictogram or scene) from the asset register, right-aligned | Recognisable at a glance; drawn once, reused. |
| Facts as coloured text lines (green earnings) | Up to two **fact** lines: Phosphor 20 dp icon + text in `textBody`; amounts via `Amount` sm | Green text on a card is a status signal she'll read as "good news", not as information. |
| Camera / Gallery "Selection Pill" as a chip | `compact` variant of SelectionCard | It's an option with an icon, one per line. |
| Onboarding: photo cards with the image bleeding to the right edge, radio at left (*House help · Cooks · Beauty*); a full-width illustration with a Checkbox under it (*I have my own smartphone*) and the instruction *Tap on the image to proceed* | **`hero`** variant: the image is the top of the card, full width, the control + title + description under it; `single` (radio) or `multi` (checkbox); tapping the image toggles | One card for both shipped shapes; the picture is the option, so it gets the whole width (P1 show first); the control makes the state visible, which the shipped illustration alone did not (row 4). |

---

## Anatomy

```
┌ card ─────────────────────────────────────────────────┐  radius lg · border thin (2 dp borderBrand when selected)
│ (○)  Title                                   [asset]  │  control 24 · Title BodyLg 16 Medium · asset 64 (rich) / icon 24 (compact)
│      Description                                       │  BodyMd 14 textSecondary · optional
│      [icon] Fact          [icon] Fact                  │  up to 2 · BodyMd textBody · optional (rich only)
│      Amount sm  ·  Tag                                 │  optional price/meta line (rich only)
└───────────────────────────────────────────────────────┘
```

```
┌ hero ─────────────────────────────────────────────────┐  radius lg · border thin (2 dp borderBrand when selected)
│ ┌───────────────────────────────────────────────────┐ │
│ │                                          [Tag]    │ │  image 16:9, full width, clipped to the top corners · optional Tag top-right
│ │            scene asset or expert photo            │ │  selected: 24 dp check badge bottom-right of the image
│ └───────────────────────────────────────────────────┘ │
│ (○)  Title                                            │  control 24 · Title BodyLg 16 Medium
│      Description                                       │  BodyMd 14 textSecondary · ≤ 2 lines
└───────────────────────────────────────────────────────┘
```

Padding 16; control–text gap 12; lines gap 4; between cards 12. Min height **64** (compact) / **96** (rich) / image 16:9 + 72 (hero, ≈ 256 at 328 wide). Whole card is the tap target — including the image; the control has no separate hit area.

---

## Variants

| Variant | Contents | Use |
| --- | --- | --- |
| `compact` | control · leading icon 24 (optional) · title · optional description | Upload method (Camera / Gallery), language, payout method — options that need one line more than a radio row |
| `rich` | control · title · description · ≤ 2 facts · optional Amount/Tag line · asset 64 right | Shift type, service type, plan choice — options she compares |
| `date` | control · weekday `Caption` · day `Heading2` · month `Caption`; fixed 72 × 88, in a horizontal row of ≤ 7 | Picking a day (leave, shift change). Composes into the Day Strip. |
| `hero` | **image 16:9 on top**, full width · control · title · description · optional Tag over the image | Options she recognises by picture before words — kind of work (*House help · Cook · Beauty*), a confirmation she makes by looking (*I have my own smartphone*, *I can wear the uniform*), a training centre. ≤ 3 per group; one at a time is fine (a single `multi` hero is a big, honest checkbox). |

Mode: `single` (radio, exactly one) or `multi` (checkbox, zero or more). A group is one mode. `date` is always `single`; `hero` is either — a group of confirmations is `multi` and the Button enables when all are checked.

---

## States

| State | Border | Control | Extra |
| --- | --- | --- | --- |
| default | `borderDefault` 1 | unselected | |
| selected | `borderBrand` 2 | selected | asset gets a 20 dp `check` badge (`bgBrand`, `textInverse`) bottom-right; `hero` image gets a 24 dp badge |
| pressed | as state | | `bgSecondary` wash 100 ms; `light` haptic |
| disabled | `borderDefault` | disabled | text `textTertiary`, asset 40 % opacity; description says why (*Not available in your area*) |
| recommended | as state | | a `brand` soft Tag *Recommended* top-right (or above the asset) — at most one per group |
| group error | `borderError` 2 on every unselected card | | one error line under the group, as Selection controls |

Selected fill stays `bgPrimary` — a pink wash across several multi-selected cards is loud; the 2 dp border + control + check badge carry it.

---

## Behaviour

- Tap anywhere on the card selects/toggles. `single` deselects the others. Groups start empty unless a default is safe; the paid or irreversible option is never pre-selected.
- The screen's primary Button commits. Selecting never navigates on its own (that is a tappable Card, not a SelectionCard).
- ≤ **5** cards in a group (≤ **3** for `hero` — each is ~250 dp tall); more is a Select sheet with rows, or `rich` cards.
- `hero` image: a scene asset from the illustration layer or a photo of a real expert in uniform; never stock, never text on the image except the Tag; the image alone must say what the option is (P1) — the title confirms it.
- `date` strips scroll horizontally, today first, with the selected day scrolled into view; past days disabled.
- Font scaling: text wraps, cards grow; asset stays 64; nothing clips.
- Reduced motion: no wash fade.

---

## Content

- Title: the option's name, ≤ 20 chars: *Full time*, *Part time*, *Camera*, *Gallery*, *UPI*.
- Description: one line ≤ 40 chars qualifying it: *10 to 12 hours daily*.
- Facts: icon + value, not sentences: `currency-inr` *₹20K – ₹30K / month*, `clock` *8+ hours daily*. Amounts via Amount, Latin numerals.
- Asset: a pictogram or scene from `foundations/assets.md` that shows the option (clock-face for hours, camera for camera). Never decorative.
- Recommended tag only when there is a real reason, and the description says it (*Most experts choose this*).

---

## Accessibility

Role radio/checkbox with the card's full text as the name ("Full time, 10 to 12 hours daily, ₹20K to ₹30K a month, selected"). Whole-card hit area. Selected = border + control + badge, so it survives greyscale. Recommended is a Tag with text, not colour alone.

---

## Token proposals

None. Check badge reuses Badge's brand fill.

---

## Figma reconciliation

1. Merge the six selection frames into **SelectionCard**: `Variant` (Compact / Rich / Date / **Hero**), `Mode` (Single / Multi), `State` (Default / Selected / Pressed / Disabled), booleans `Description`, `Facts`, `Asset`, `Recommended`.
2. Control always leading top-left; delete the bottom-divider layout.
3. Selected: `borderBrand` 2 + control state + check badge on asset.
4. Facts to `textBody` with Phosphor icons; amounts as Amount instances.
5. Move Selection Pill in as Compact; rebuild Service and Shift Selection cards as Rich instances on their feature pages.
6. Rebuild the onboarding *What work* photo cards and the *Tap on the image* confirmations as Hero instances (image slot, Tag boolean); drop the *Tap on the image to proceed* instruction — the control says it.

Result: 4 variants × 2 modes × 4 states (+ booleans) ≈ **38 variants** replacing 8 frames / 30 plus the two onboarding card shapes.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ whole card ≥ 64; hero image is part of the target |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyLg Medium / BodyMd / Heading2 (date) / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ border + control + badge |
| 5 | ⚙ Error | ✅ group error |
| 6 | ⚙ Tap guard | ✅ idempotent select |
| 7 | ⚙ Four languages | ⬜ title ≤ 20, description ≤ 40; verify |
| 9 | Meaning without text | ✅ asset + facts icons + control |
| 10 | Greyscale | ✅ |
| 11 | Costly options never pre-selected | ✅ |
| 15–16 | Review | ⬜ pending |
