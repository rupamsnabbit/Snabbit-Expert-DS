# SelectionCard

Status: **Proposed** · **In app** 2026-10-01 (`rich` · shift option: the timings card, single and split day, `references/shipped-app-2026-10-01-shift-option-card/`; reconciled at the ask of `projects/hood-shift-change`) · Tier: Core · Package: `SnabbitSelectionCard` · Figma: Simple Selection Cards (`10:2334`), Selection Cards with Description (`19:133`), Date Selection Cards (`10:2585`), Complex Selection Cards (`10:2791`), Selectable Card (`75:500`), Selection Pill (`1075:9887`); Service Selection Card (`1237:10853`) and Shift Selection Card (`1075:6540`) become compositions. Shipped (Self-Serve ER/AR `HqmnjmxhZvyvZxmIaVMCrB`): *What work are you interested in?* photo cards (`599:38186`) and *Tap on the image to proceed* (`599:38549`) — the `hero` variant.

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
| **Shipped shift option card** (live app, 2026-10-01, `references/shipped-app-2026-10-01-shift-option-card/`). It has a Radio, the hood as title over the area and a `map-pin`, and green *Earn upto ₹22,000* top right. Under a divider is the day: `clock` *8 AM to 2 PM \| 6 hrs*. A split day is block · dotted line · coffee cup *Break* · block. Selected is a pink border on a white fill | **`rich` · shift option** form, matched region for region. The header row has the Radio, the landmark over sector · km + `map-pin` (the area is the list heading), and a **trailing pay slot** (*Earn up to* / Amount `md` / *a month*) in place of the 64 dp asset. Below it are a Divider and the facts as a **day rail** of up to three lines (block · break · block) (§ *`rich` · shift option*). Four departures are kept: the pay is neutral, *up to* is two words, times use the `content.md` format, and the hours add up with the break's length shown | The card is live, so the card is the design and the spec is reconciled to it (`EXTENDING.md` § *Reuse before you invent*). The design lead asked for the same card on every timings list. Each kept departure cites its principle (P6, `content.md`, P9). |

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
│ │                                          [Tag]    │ │  image 4:3 (near-square, as shipped) or 16:9 for landscape photos · full width · optional Tag top-right
│ │            scene asset or expert photo            │ │  selected: 24 dp check badge bottom-right of the image
│ └───────────────────────────────────────────────────┘ │
│ (○)  Title                                            │  control 24 · Title BodyLg 16 Medium
│      Description                                       │  BodyMd 14 textSecondary · ≤ 2 lines
└───────────────────────────────────────────────────────┘
```

Padding 16; control–text gap 12; lines gap 4; between cards 12. Min height **64** (compact) / **96** (rich) / image + 72 (hero: ≈ 318 at 328 wide with a 4:3 image, ≈ 256 with 16:9). Whole card is the tap target — including the image; the control has no separate hit area. The `rich` · shift option form (the shipped timings card) has its own anatomy under § Variants.

---

## Variants

| Variant | Contents | Use |
| --- | --- | --- |
| `compact` | control · leading icon 24 (optional) · title · optional description | Upload method (Camera / Gallery), language, payout method — options that need one line more than a radio row |
| `rich` | control · title · description · ≤ 2 facts · optional Amount/Tag line · asset 64 right. **Shift option** form: a trailing pay slot in place of the asset, a Divider, and the facts as a day rail of ≤ 3 lines (below) | A shift (hood + timing, the **shift option** form), service type, plan choice — options she compares |
| `date` | control · weekday `Caption` · day `Heading2` · month `Caption`; fixed 72 × 88, in a horizontal row of ≤ 7 | Picking a day (leave, shift change). Composes into the Day Strip. |
| `hero` | **image on top** (4:3 default, 16:9 allowed), full width · control · title · description · optional Tag over the image | Options she recognises by picture before words — kind of work (*House help · Cook · Beauty*), a confirmation she makes by looking (*I have my own smartphone*, *I can wear the uniform*), a training centre. ≤ 3 per group; one at a time is fine (a single `multi` hero is a big, honest checkbox). |

Mode: `single` (radio, exactly one) or `multi` (checkbox, zero or more). A group is one mode. `date` is always `single`; `hero` is either — a group of confirmations is `multi` and the Button enables when all are checked.

### `rich` · shift option — the shipped timings card

**In app** 2026-10-01 (`references/shipped-app-2026-10-01-shift-option-card/`). Each card is one hood + timing,
used on every timings list (change hood, change shift time), and the whole card selects. It matches the shipped card
region by region. The four departures it keeps are listed at the end of this section. Asked by
`projects/hood-shift-change`.

```
┌ rich · shift option ──────────────────────────────────┐  radius lg · border thin borderDefault (thicker borderBrand when selected) · fill bgPrimary always
│ (●)  Near Forum Mall                      Earn up to  │  Radio 24 · title (landmark) BodyLg SemiBold textPrimary, ≤ 2 lines · pay label BodyMd textSecondary
│      6th Sector · 1.2 km                     ₹22,000  │  place line (sector · km) BodyMd textSecondary, ≤ 2 lines · Amount md default — never green
│                                              a month  │  period BodyMd textSecondary
│ ───────────────────────────────────────────────────── │  Divider thin borderDefault, full content width
│ [clock]  8 am – 10 am · 2 hrs          [pin] Show map │  block: clock 20 textSecondary + BodyMd Medium textBody · Show map ends the first line
│    ┆                                                   │  connector: thick dashed borderStrong · spacing.4 tall · centred in the 20 dp icon column
│ [coffee] Break · 4 hrs                                 │  break: coffee 20 textSecondary + BodyMd textSecondary
│    ┆                                                   │
│ [clock]  2 pm – 5 pm · 3 hrs                           │  block
└───────────────────────────────────────────────────────┘
```

**Layout.**

- Padding is `spacing.5`. The gap between the control and the text is `spacing.4`, and the gap between title and area
  line is `spacing.2`. Header, Divider and day rail are stacked `spacing.4` apart, so the facts sit `spacing.4` below
  the Divider.
- **The header row** is Radio · text column · pay slot. **The pay slot never shrinks.** It is as wide as its longest
  line, right-aligned, and top-aligned with the title.
- The text column shrinks first and wraps. The title gets up to 2 lines and the place line up to 2 lines. Neither is
  ever truncated (`foundations/type.md` § Wrapping, where the distance *1.2 km* is one unbreakable unit).
- **Pay slot.** Three right-aligned lines: *Earn up to* (BodyMd `textSecondary`), then Amount `md` `default` (BodyLg
  SemiBold digits, ₹ one step smaller, `textPrimary`), then *a month* (BodyMd `textSecondary`). The amount never wraps
  and never truncates. The label and the period are one line each, within the Amount label budget (≤ 20).
- **Day rail.** One line for a single block. A split day gets three lines: block · break · block. A day has at most
  one break, so the rail never runs past three lines. Each line is a 20 dp icon, then `spacing.3`, then the text. The
  rail spans the full content width under the Divider and starts under the control, as shipped.
- **Show map** (2026-10-01, design lead: "a simple text button and a small icon"). Button `ghost · brand` with no
  container: `map-pin` 16 `textBrand`, `spacing.2`, *Show map* ButtonMd Medium `textBrand`, as tall as the rail line
  (24), at the right end of the **first** rail line. The time text takes the rest of the line. The 48 dp hit area
  comes from the line's row (`button.md` § Sizes, S / XS). It opens a BottomSheet `info`: the landmark as title, the
  area line, ✕, a MapSnippet 240 with the hood as MapMarker `area` (named on its pill), MapMarker `me` when the
  distances are from her, the distance line and *Show directions* (`map-marker.md`). When the distances are from a
  place she searched, the sheet drops `me` and the line says so: *400 m from Indiranagar metro*. Show map never
  selects the card.
- **Connector.** Between rail lines sits a `borderWidth.thick` (1.5 dp) dashed `borderStrong` line, `spacing.4` tall (the shipped card's gap)
  and centred in the 20 dp icon column. It takes the Stepper `rail` connector, a line that joins nodes and is centred
  on them, and turns it vertical and dashed, as shipped.
- **States.** As `rich`, but with no asset there is no check badge. Selected is `borderBrand` `thicker` plus the
  selected Radio, two channels (row 4). The fill stays `bgPrimary`. The group is always `single`.

**Content.**

- Title: the hood's landmark, e.g. *Near Forum Mall* or *Kudlu Gate* (`PRINCIPLES.md` § Vocabulary, *Hood*). A
  hood's name is a proper noun and cannot be shortened, so it wraps to 2 lines rather than taking a budget.
- Place line: the rest of the hood's name, its sector, and how far it is from where she is now, e.g. *6th Sector ·
  1.2 km*. The area (*Koramangala*) is the list's heading above the cards, so it is not repeated on each card. On a
  list with no area heading (her own hood, on *Change shift time*) the place line is the area: *Bommanahalli*. The name
  part is ≤ 18 characters in English; the distance is added after it and the line may wrap to 2 lines. Never *Near
  your home*, because we know only where she is now.
- **One-hood list** (her own hood on *Change shift time*, a friend's hood): same card, same order — hood title, place line, Divider, day rail. A time-first variant was tried and dropped (2026-10-01): with the time as the title, a split day has no single time to lead with.
- Pay: always *Earn up to* · ₹ · *a month*. Always show the period, because a figure without one makes her guess
  whether it is per day or per month. Never *upto*, never green.
- Times: *9 am – 5 pm · 8 hrs*. Use the 12-hour clock with lowercase am/pm, an en dash with spaces, whole hours without
  *:00*, and a middle dot before the duration. Durations follow `content.md` § 5 (*8 hrs*). Never write *AM*, *to*, a
  pipe or *upto*.
- **Every hour count adds up.**
  - Each block's hours match its range.
  - The blocks add up to the day's hours, the Chip `filter` value she picked (*2 hrs* + *3 hrs* = *5 hrs*).
  - The break shows its own length, equal to the gap between the blocks (*Break · 4 hrs* for 10 am – 2 pm).
- No shift-type word. Never *Full time*, *Part time* or *Smart Shift*: the rail's shape says the day is split
  (`PRINCIPLES.md` § Vocabulary, *Shift*).

**Kept departures from the shipped card.**

- **The grey `map-pin` after the place line is gone; the pin now leads *Show map*.** An icon that does nothing is
  noise (P1); on the button it says what the tap does (design lead, 2026-10-01).

- **Pay is neutral, not green.** Green means money already credited (P6, `amount.md` `positive`), so pay she might
  earn is Amount `default`.
- **We write *Earn up to … a month*, not *Earn upto*.** *Upto* is a misspelling (`content.md`), and the period stops
  her guessing.
- **We write *8 am – 2 pm · 6 hrs*, not *8 AM to 2 PM | 6 hrs*.** This follows `content.md` § 5 for clock time,
  ranges and duration.
- **The hours add up and the break shows its length.** The shipped split card says *6 hrs* on a 2-hour block and gives
  no length for the break. She checks these numbers, so they must be right (P9, P1).

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

Selected fill stays `bgPrimary` for `compact`, `rich` and `date` — a pink wash across several multi-selected cards is loud; the 2 dp border + control + check badge carry it. **`hero` is the exception**: its text row takes a `bgBrandSubtle` wash when selected (as shipped) — with the image filling the card, the wash under the title is the one place the state can be seen at a glance, and hero groups are ≤ 3.

---

## Behaviour

- Tap anywhere on the card selects/toggles. `single` deselects the others. Groups start empty unless a default is safe; the paid or irreversible option is never pre-selected.
- The screen's primary Button commits. Selecting never navigates on its own (that is a tappable Card, not a SelectionCard).
- ≤ **5** cards in a group (≤ **3** for `hero` — each is ~250 dp tall); more is a Select sheet with rows, or `rich` cards. **Proposed exception (2026-09-09):** a group may run to **8** when the list is fixed by an outside authority and cannot be shortened, it is split by a `labelled` Divider into sub-groups of ≤ 5, and every card carries a pictogram — the insurance relationship list (`briefs/insurance-relationship-picker.md`, `patterns/insurance.md`). More than 8 is still a Select sheet with search.
- `hero` image: a scene asset from the illustration layer or a photo of a real expert in uniform; never stock, never text on the image except the Tag; the image alone must say what the option is (P1) — the title confirms it.
- `date` strips scroll horizontally, today first, with the selected day scrolled into view; past days disabled.
- Font scaling: text wraps, cards grow; asset stays 64; nothing clips.
- Reduced motion: no wash fade.

---

## Content

- Title: the option's name, ≤ 20 chars: *Full time*, *Part time*, *Camera*, *Gallery*, *UPI*. Since 2026-10-01, *Full time* and *Part time* are internal words (`PRINCIPLES.md` § Vocabulary, *Shift*). A shift she chooses is the **shift option** form, titled by its hood and described by hours.
- Description: one line ≤ 40 chars qualifying it: *10 to 12 hours daily*.
- Facts: icon + value, not sentences: `currency-inr` *₹20K – ₹30K / month*, `clock` *8+ hours daily*. Amounts via Amount, Latin numerals.
- Asset: a pictogram or scene from `foundations/assets.md` that shows the option (clock-face for hours, camera for camera). Never decorative.
- Recommended tag only when there is a real reason, and the description says it (*Most experts choose this*).

---

## Accessibility

Role radio/checkbox with the card's full text as the name ("Full time, 10 to 12 hours daily, ₹20K to ₹30K a month, selected"). Whole-card hit area. Selected = border + control + badge, so it survives greyscale. Recommended is a Tag with text, not colour alone.

**Shift option.** The card is announced as one item, and the whole card is the target, except *Show map*, which is its
own button after the card ("Show map, Near Forum Mall, button"). The `clock` and `coffee` icons and the connector are
decorative. Times and distances are spoken in full: "Near Forum Mall, 6th
Sector, 1.2 kilometres. 9 am to 5 pm, 8 hours. Earn up to 22,000 rupees a month. Selected." A split day
reads the rail in order: "8 am to 10 am, 2 hours. Break, 4 hours. 2 pm to 5 pm, 3 hours." Selected is the border plus
the Radio, so it survives greyscale without a badge.

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
7. Add the **shift option** form to Rich from the shipped card. It gets a boolean `Pay` (the trailing slot that replaces `Asset`, with the label, an Amount `md` instance and the period), a Divider, and `Day` (Single / Split). Split is block · connector · break · connector · block, drawn with the `clock` and `coffee` instances. The pay text is `textPrimary`/`textSecondary`, never green, and the time strings use the `content.md` format.

Result: 4 variants × 2 modes × 4 states (+ booleans) ≈ **38 variants** replacing 8 frames / 30 plus the two onboarding card shapes.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ whole card ≥ 64; hero image is part of the target |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyLg Medium / BodyMd / Heading2 (date) / Caption; shift option: BodyLg SemiBold title, BodyMd Medium rail, Amount `md` |
| 4 | ⚙ States by ≥ 2 channels | ✅ border + control + badge; shift option has no asset, so border + control |
| 5 | ⚙ Error | ✅ group error |
| 6 | ⚙ Tap guard | ✅ idempotent select |
| 7 | ⚙ Four languages | ⬜ title ≤ 20, description ≤ 40; shift option: hood 2 lines, place line name ≤ 18 + distance and 2 lines, never truncated, pay slot never shrinks; verify |
| 9 | Meaning without text | ✅ asset + facts icons + control; shift option: the rail's shape shows a split day (`clock` · `coffee` · `clock`) |
| 10 | Greyscale | ✅ |
| 11 | Costly options never pre-selected | ✅ |
| 14 | Status colours only for status | ✅ shift option pay is Amount `default`, not green (P6) |
| 15–16 | Review | ⬜ pending |
