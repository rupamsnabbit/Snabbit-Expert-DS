# Stat · Rating · Divider

Status: **Proposed** · Tier: Core · Package: `SnabbitStat`, `SnabbitRating`, `SnabbitDivider` · Figma: Value (`537:4277`, 6), Metric Card (`1491:13010`, 4), Rating (`1550:11864`, 6) with Smileys (`1491:9039`, 15 faces), Table Components (`974:5706`). Shipped: *Min 4.8 avg rating* in the rate card's performance table; *You earn ₹145* rows; 1 dp rules between ListItems everywhere.

Three small things that appear on almost every screen and so must be exactly the same everywhere: a **Stat** (a number with its name), a **Rating** (how the customer felt, given and shown as faces, not stars), and a **Divider** (the line between things).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| *Value* (6) and *Metric Card* (4) with the label above or below by frame | **Stat** with `Size` and `Delta`; label always above the value | She reads the name before the number |
| *Rating* (6) with 15 smiley faces and star-like displays | **Rating** `input` with five faces (two states) and `display` as a number + one face | Faces are recognised without reading; five is enough |
| Hand-drawn 1 dp lines; *Table Components* as tables | **Divider** with three kinds; tables become ListItems with Stat `S` | One line, one rule |

---

## Stat

A label and a value, optionally with a change. It is how every earnings, coin, job and rating figure is shown outside a list row.

```
 Earned this week          ← label Caption textSecondary
 ₹4,250                    ← value Amount M (Heading2 tabular) · or a plain number / duration
 ↑ ₹380 vs last week       ← delta Caption · textSuccess / textError · arrow-up / arrow-down · optional
```

| Size | Value | Where |
| --- | --- | --- |
| `S` | `BodyLg` SemiBold | Inside a ListItem trailing slot, a Chip |
| `M` | Amount `M` / `Heading2` | Stat tiles in a Card (Metric Card), 2 per row |
| `L` | Amount `L` / `Display` | The hero figure of a tab (Earnings today) |

Rules: values follow `amount.md` (₹, Indian grouping, tabular, never decimals for rupees). A **delta** appears only when the comparison is one she can act on and understand (*vs last week*, *vs last month*) — never *vs 7-day rolling average*; positive is `textSuccess` with `arrow-up`, negative `textError` with `arrow-down`, zero omitted. Label first, value second, always — she reads the name before the number. Optional 20 dp Phosphor icon or 24 dp reward asset leading the label. At most **four** Stats in one Card, in a 2 × 2 grid with a `Divider` between rows. Speaker: a Stat `L` has an inline VoicePrompt; `M` and `S` are read by the Card's.

What changes from Figma: *Value* (6) and *Metric Card* (4) become one Stat with `Size` and `Delta`; the label moves **above** the value in every variant (the Figma frames mix above and below); the *Table Components* key/value rows are ListItems with a Stat `S` trailing, not a table.

---

## Rating

### `input` — how did it go?

Five faces from the illustration layer's `face` class (existing Smileys asset family), 48 dp each, in a row with 8 dp gaps — *very unhappy · unhappy · okay · happy · very happy*. Tapping one fills it (asset's coloured state) and outlines the rest; the chosen word appears under the row in `BodyMd` and is spoken (*"Happy"*). One tap changes the choice; there is no half-face. The flow's Button (*Send*) enables on choice.

Faces, not stars: a star scale is abstract; a face is a feeling she recognises without reading (P1, research). The 15-face Smileys set is trimmed to **five** expressions in two states (outline / filled) = 10 assets; the rest are archived.

### `display` — what customers think

```
 4.8  😊     ← number Heading3 tabular + the face for the band, 24 dp
```

A number to one decimal and **one** face for its band: ≥ 4.5 very happy · 4.0–4.4 happy · 3.5–3.9 okay · 3.0–3.4 unhappy · < 3.0 very unhappy. Never five small stars, never a bar of faces. With fewer than 5 ratings the display shows *New* instead of a number. In a Stat it is the value with the face trailing; in a ListItem it is the trailing slot. The face gives the meaning; the number gives precision for those who want it.

Copy: the words under the input are *Very unhappy · Unhappy · Okay · Happy · Very happy* in her language; no *Rate us 5 stars!*; the question is *How was the job?*

---

## Divider

The line between things. 1 dp, never thicker; never as decoration.

| Kind | Colour | Inset | Where |
| --- | --- | --- | --- |
| `row` | `borderSubtle` | 16 dp from the leading edge (aligned with row text), full to trailing | Between ListItems and Accordion rows inside one Card |
| `section` | `borderDefault` | full bleed | Between sections of a screen when a heading alone is not enough; 16 dp space above and below |
| `labelled` | `borderSubtle` both sides of a centred `Caption` `textSecondary` label | full bleed | Grouping a list by day or status: *Today*, *Yesterday*, *Paid* |

Rules: never two Dividers in a row; never a Divider directly under a heading or above a Button; never a Divider and a card edge doing the same job (a Card's border is already a divider). Between a Stat 2 × 2 grid's rows only. Vertical dividers do not exist — use gap.

---

## Accessibility

Stat announces *"Earned this week, four thousand two hundred fifty rupees, up three hundred eighty versus last week"*. Rating input is a radiogroup of five radios announcing the word; display announces *"Rating four point eight, very happy"*. Dividers are decorative (`aria-hidden`); labelled dividers are group headings.

---

## Token proposals

None.

---

## Figma reconciliation

1. Value + Metric Card → **Stat**: `Size` (S / M / L), booleans `Delta`, `Icon`; label above value in all variants.
2. Rating → **Rating**: `Form` (Input / Display), `Value` (1–5), input faces as instances of the five kept Smileys; delete the other ten faces; display = number + one face.
3. **Create** Divider: `Kind` (Row / Section / Labelled). Replace every hand-drawn 1 dp line in the Lifecycle mocks with it.
4. Table Components → ListItem + Stat `S`.

Result: **~14 variants** replacing 6 + 4 + 6 + 15 + 7 frames.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ rating faces 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Caption / Amount / Heading |
| 4 | ⚙ States by ≥ 2 channels | ✅ face fill + word; delta arrow + colour + sign |
| 9 | Meaning without text | ✅ faces; assets before labels |
| 10 | Greyscale | ✅ arrows and face shapes survive |
| 12 | Voice | ✅ rating word spoken; Stat L has Listen |
| 14 | Status colours | ✅ delta only |
| 15–16 | Review | ⬜ pending |
