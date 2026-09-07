# Tag

Status: **Proposed** · Tier: Core · Package: `SnabbitTag` · Figma: Components → Tags (`7:1574`)

A tag labels a thing with its status or category — *Ongoing*, *Paid*, *Cleaning*, *New*. It is read, not tapped. Anything tappable that looks like a tag is a Chip (selection) or an XS Button (action).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| 7 colours: pink, gray, green, yellow, red, blue, **purple** | **6 tones**: brand, neutral, success, warning, error, info. Purple removed. | Purple is not in the palette. If it was standing in for tier, tier has its own component (`TierBadge`, P6). |
| 3 styles: Filled, Soft, Outline | Same three, renamed `solid`, `soft`, `outline`. **Soft is the default.** | Soft gives colour + readable text at small sizes without shouting; solid is reserved for the one status that must dominate a card. |
| 4 sizes (14 / 12 / 12 / 10 sp) | **3 sizes**: L 14 sp, M 12 sp, S 10 sp. S restricted. | The type rule forbids `Small` (10 sp) for anything essential — payment status, safety, errors. S exists for dense secondary metadata only. |
| Palette variables (`Green/color-green-700`) | Semantic tokens; two proposed additions | Same as Button. |
| Leading icon on every variant | Icon optional, Phosphor, leading only | One icon, one meaning (P1). |

---

## Anatomy

```
┌──────────────────┐
│ [icon] Label     │   container · optional leading icon · label
└──────────────────┘
```

Radius `sm` (4 dp) — tags are the one place the smallest radius is used, so they read as labels, not buttons. Internal icon–label gap 4 dp (L/M) or 2 dp (S). Horizontal padding 8 / 6 / 4 dp.

---

## Tones × styles

Every value is a semantic token. Two soft-text values have no token yet (proposed below).

| Tone | `solid` fill · label | `soft` fill · label | `outline` border · label |
| --- | --- | --- | --- |
| **brand** | `interactiveDefault` · `textInverse` | `bgBrandSubtle` · `textBrand` | `borderBrand` · `textBrand` |
| **neutral** | gray.800 (`bgInverse`-adjacent)* · `textInverse` | `bgTertiary` · `textBody` | `borderStrong` · `textBody` |
| **success** | `textSuccess` · `textInverse` | `bgSuccessSubtle` · green.700* | `borderSuccess` · `textSuccess` |
| **warning** | `textWarning` · `textInverse` | `bgWarningSubtle` · yellow.700* | `borderWarning` · `textWarning` |
| **error** | `textError` · `textInverse` | `bgErrorSubtle` · red.700* | `borderError` · `textError` |
| **info** | `textInfo` · `textInverse` | blue.100* · blue.700* | `borderFocus` (blue.500) · `textInfo` |

\* **Token proposals.** Soft tags need a darker text step than the 600 status text to pass 4.5:1 on the 100 wash at 12 sp: `textSuccessStrong` = green.700, `textWarningStrong` = yellow.700, `textErrorStrong` = red.700, `textInfoStrong` = blue.700. Info also lacks a subtle wash: `bgInfoSubtle` = blue.100. Neutral solid uses gray.800 rather than `bgInverse` (gray.900) to sit below true black surfaces; propose `bgNeutralStrong` = gray.800. Until added, these are component-owned.

Contrast (label on fill): solid ≥ 4.5:1 for all tones except warning solid (`textWarning` #D97706 with white = 3.2:1) — **warning solid is therefore disallowed**; use warning soft or outline. Soft with the 700 text ≥ 4.6:1 everywhere.

---

## Sizes

| Size | Height | Pad X | Label | Icon | Use |
| --- | --- | --- | --- | --- | --- |
| `L` | 28 dp | 8 | `BodyMd` 14 sp Medium | 16 | Card headers, job status, anything the expert must not miss |
| `M` | 24 dp | 6 | `Caption` 12 sp Medium | 14 | Default in lists and cards |
| `S` | 20 dp | 4 | `Small` 10 sp Medium | 12 | Dense secondary metadata only. **Never** for payment, safety, errors or instructions. |

Tags are never full-width and never wrap; a label that does not fit is shortened, not clipped.

---

## Content

- One or two words, sentence case, ≤ 12 characters in the longest language. *Ongoing*, *Paid*, *New*, *Late*, *Cleaning*.
- Numbers are fine (*+₹50*, *2 hr*). Numerals stay Latin.
- Icon (optional) is Phosphor `regular`, leading, from the register, and adds meaning the colour alone does not carry: `check-circle` on *Paid*, `clock` on *Late*, `warning-circle` on *Pending*. A tag whose meaning is a status **should** have an icon (P1: never colour alone).
- No emoji, no all-caps.

---

## Rules

- **Tone is meaning, not decoration.** success = done/paid/verified; warning = waiting/attention; error = failed/penalty; info = neutral fact the expert should notice; brand = new/featured; neutral = category. A category is never green; a penalty is never blue.
- **Tier colours never appear in a tag.** Tier is `TierBadge`.
- **At most two tags per card**, and at most one `solid`. More than that and nothing is highlighted.
- **Not interactive.** No pressed state, no ripple. If it must be tapped, it is a Chip.
- **Red cards are assets, not tags.** A penalty count uses `asset/reward/red-card` + number; the word *Penalty* may be an error tag beside it.

---

## Accessibility

Tag text is read by screen readers as part of its parent (e.g. "Cleaning job, Ongoing"). Colour is never the sole carrier: icon or wording carries the status. At 130 % font scaling tags grow in height; they do not clip.

---

## Figma reconciliation

1. Delete the purple colour set. Rename `Color` → `Tone` (Brand / Neutral / Success / Warning / Error / Info) and `Style` → `Style` (Solid / Soft / Outline).
2. Collapse four sizes to L / M / S; delete the duplicate 12 sp row.
3. Remove the Warning · Solid variant.
4. Rebind fills, strokes and text to semantic variables; soft label text to the proposed `*Strong` tokens.
5. Make the icon a boolean property, leading only.

Result: 6 × 3 × 3 − 3 (warning solid) = **51 variants** instead of 84.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | n/a — not interactive |
| 2 | ⚙ Semantic tokens only | ✅ except 6 proposed tokens, listed |
| 3 | ⚙ Type scale only | ✅ BodyMd / Caption / Small (Medium) |
| 4 | ⚙ Every state by ≥ 2 of colour/icon/shape/motion | ✅ tone + icon + wording; S size documented as metadata-only |
| 5–6 | ⚙ States / tap guard | n/a |
| 7 | ⚙ Fits four languages at large font | ⬜ 12-char budget set; verify |
| 8 | ⚙ Motion | n/a |
| 9 | Meaning without text | ✅ when icon present — status tags require one |
| 10 | Greyscale | ✅ solid / soft / outline differ by form; icon carries status |
| 14 | Status colours only for status; tier only for tier | ✅ purple removed; rule stated |
| 15–16 | Copy review / device review | ⬜ pending |
