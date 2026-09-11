# Reference read — picking one of many, without scrolling

Apps: **Warby Parker**, **Strava**, **Afterpay**, **Lloyds Mobile Banking** · Platform: iOS · Captured: 2026-09-11
- [Warby Parker · Face Shapes](https://mobbin.com/screens/600a67ca-1249-4283-aa69-5d64a00f55f7) — the closest analogue: 6 picture options, 2-up, in a sheet, primary Button below
- [Strava · activity types](https://mobbin.com/screens/ddbaede6-f037-4540-b46a-703d60c8aa35) — 10 options, icon + one-word label
- [Afterpay · categories](https://mobbin.com/screens/fdcec71d-c7fa-41f5-be03-16d5da000f45) — 14 options, icon top-left, label under
- [Lloyds · choose an image](https://mobbin.com/screens/29c4c331-1bf5-4ce3-8ed6-d2464576f0b1) — 2-up, selection by border only

Fed: `briefs/insurance-relationship-picker.md` (the `tile` variant), `patterns/insurance.md` §§ 2, 4, 5.

Screenshots not committed — see `references/alan-add-family-member/README.md`.

---

## Why this read happened

The first translation of the health-cover flow stacked eight relationship options as full-width `rich` cards. That is 900 dp of scrolling for one choice on a 360 × 800 screen — the design lead rejected it, correctly. This read asks a narrower question than the first pass did: **how does shipped product let someone choose one of six to fourteen fixed options, in one screenful, without reading?**

## 1. Name the idea

A **2-up grid of tiles** — picture above a short label, tile ~158 × 104 — turns a list into a shape you scan instead of read. Eight options become four rows instead of eight, and the whole set is visible at once, which is what makes a choice feel small.

## 2. Separate idea from expression

**Borrowable.**
- Two columns, tile ~158 wide, icon or picture **above** the label, label left-aligned, one or two words.
- **No radio control.** All four apps carry selection on the tile itself: border, fill, and (Shop, MyFitnessPal, corner) a check badge. The 24 dp radio plus its 12 dp gap is 36 dp of every row spent saying something the border already says.
- **No paragraph under the question.** Warby Parker and Lloyds have a title and nothing else. Strava's intro paragraph is the weakest thing on its screen.
- Options ordered by likelihood, not alphabetically.

**Not borrowable.** Their icon styles (mono line icons — ours are pink-disc pictograms), the lavender and orange palettes, Strava's greyed `bgSecondary` tiles with no border, and Lloyds' selection-by-black-outline (fails greyscale on its own).

## 3. Run it against the expert

| Check | Result |
| --- | --- |
| Target size (P3) | 158 × 104 is far above 48 × 48, and larger than the 328 × 96 row it replaces in the only dimension that matters — the thumb |
| Two channels for state (P1, row 4) | Border colour **and** the check badge on the pictogram **and** the `bgBrandSubtle` fill. Dropping the radio still leaves three; Lloyds' border-only version would fail |
| Greyscale (row 10) | Border weight 1 → 2 dp plus the badge survives greyscale; colour is not carrying it alone |
| Four scripts (P9) | The risk. A 158 dp tile leaves 134 dp for the label; Kannada at font scale 1.3 will wrap to two lines. Tile height is therefore **fixed at 104 with a two-line label budget**, not hugged to content |
| Reading (P1) | Improves — the label drops from *"Your mother"* to *"Mother"* because the question already said "your" |

## 4. Tier

**Change to core `SelectionCard`** — a new `tile` variant. Written up in `briefs/insurance-relationship-picker.md`, which this read replaces the reference section of.

## 5. Translate

`briefs/insurance-relationship-picker.md` § The change. Applied on three screens of `patterns/insurance.md` — relationship (8 tiles), children yes/no (2 tiles), boy/girl (2 tiles) — deliberately the same shape all three times, so the expert learns one control rather than three.

## 6. Side by side

Relationship step: **~1400 dp of scroll → one 800 dp screen**, eight options all visible, no radio, no group headings, no body copy. The in-law pair keeps its meaning through self-describing labels (*Husband's mother*) plus a second figure in the pictogram, which is stronger than the group heading it replaces.
