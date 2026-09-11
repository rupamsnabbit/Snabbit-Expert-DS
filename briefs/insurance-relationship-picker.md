# Insurance / Relationship picker → SelectionCard `tile`

Tier: change to core **SelectionCard**
Owner: Rupam Banik · Date: 2026-09-09 · Revised 2026-09-11

## Idea

The insurance nominee's relationship is a fixed list of eight values the insurer will not shorten: Spouse, Child, Mother, Father, Brother, Sister, Mother-in-law, Father-in-law. All eight must be **visible at once** and choosable by picture, because the expert reads slowly and this single choice decides where ₹5,00,000 goes.

## Why not existing

- **Radio** (`selection-controls.md`) caps at 5 plain options and carries no image.
- **SelectionCard `rich`**, one per row, was the first attempt (2026-09-09) and it is **rejected**. Eight full-width `rich` cards is ~900 dp of content — about 2½ screenfuls on the 360 × 800 baseline. Breathing room bought with scrolling is a bad trade for someone deciding one thing (P2), and the design review on 2026-09-11 rejected it on exactly that ground.
- **`select` BottomSheet** allows ≤ 8 radio rows with a 40 dp pictogram leading, and is technically legal. It fails P1 and P2: the options become invisible until she taps a row that names none of them. Still rejected.
- **Shortening the list** was tried and rejected. Grouping into *Parent* / *Sibling* / *In-law* tiles fails the register's own rule — a two-adult pictogram for *Parent* and one for *In-law* would be the same drawing with two meanings.

## Reference

`references/mobbin-tile-pickers/` — Warby Parker, Strava, Afterpay, Lloyds. Four shipped apps solving "pick one of 6–14 fixed options" the same way: a 2-up grid of tiles, picture above a short label, **no radio control**, selection carried by the tile.

## The change

Add a **`tile`** variant to `selection-card.md`.

```
┌ tile ────────────────┐  158 × 104 fixed · radius lg · border thin
│ (◯ pictogram 48)     │  pictogram top-left; selected adds a 20 dp check badge
│                      │
│ Label                │  BodyLg 16 Medium · 1–2 lines · left
└──────────────────────┘
```

| Property | Value |
| --- | --- |
| Grid | Exactly **2 columns**, `spacing.4` (12) between tiles and between rows; full content width (328) → 158 per tile |
| Size | **158 × 104, fixed.** Height is not hugged to content — it is budgeted for a two-line label so the grid stays even when Kannada wraps (P9) |
| Contents | Pictogram 48 (asset register) + label `BodyLg` Medium, 1–2 lines. **No description, no facts, no amount** — that is what `rich` is for |
| Control | **None.** `tile` is the only SelectionCard variant without a visible radio/checkbox |
| Selected | `borderBrand` `thicker` **+** `bgBrandSubtle` fill **+** 20 dp `check` badge on the pictogram — three channels, so dropping the radio does not cost row 4 or row 10 |
| Group size | 2–8 tiles. More than 8 is a `select` sheet with a search field |
| Mode | `single` only. A multi-select grid reads as a filter, not an answer |
| Group error | As the existing spec: `borderError` `thicker` on every unselected tile, one error line under the grid |

The earlier proposal — "a group may run to 8 in one column when the list is fixed by an outside authority, split by a `labelled` Divider" — is **withdrawn**. The `tile` grid makes the column cap moot for this case, and the labelled Divider is no longer needed (see below).

## Applied here

Eight tiles, four rows, ordered by how often each is chosen. No group headings and no body copy — the screen is a `Heading3` question and the grid.

| Row | Left | Right |
| --- | --- | --- |
| 1 | Husband or wife | Son or daughter |
| 2 | Mother | Father |
| 3 | Brother | Sister |
| 4 | Husband's mother | Husband's father |

**The in-law problem, restated.** The 2026-09-09 version relied on a *Your husband's family* Divider heading to separate the in-laws from the parents. That heading is now replaced by two stronger things:

1. **Self-describing labels.** *Husband's mother* carries the meaning in the label itself, in fewer words than a heading plus *His mother*.
2. **A drawing difference, not just a word.** `mother-in-law` and `father-in-law` are drawn as the parent figure with a **second, smaller `pink.300` figure behind them** — the husband through whom the relation runs. This is a real pictogram difference, where the old version admitted there was none. Still the weakest row for P1, and still the first thing to watch in field testing — but it is now weak by degree rather than blank.

## Translation

Tokens: `radius.lg`, `borderDefault` `thin`, `borderBrand` `thicker`, `bgPrimary`, `bgBrandSubtle`, `bgSecondary` (pressed), `textPrimary`, `spacing.4` grid gap, `spacing.5` tile padding, `text-body-lg` / `leading-body-lg` label.
Core components: SelectionCard `tile` `single`, Button.
Assets: eight relationship pictograms at 48 dp, registered in `foundations/assets.md`.
States: default · selected · pressed · disabled · group error.
Voice: the screen's VoicePrompt `bar` reads the question; no on-screen body copy repeats it.

## Deviations

Breaks from `selection-card.md`'s "control leading, top-left, same place as the Radio/Checkbox row" on `tile` only, because the tile's own border, fill and check badge already carry the state in three channels and the control costs 36 dp of a 158 dp tile.

## Principles checklist

Inherited from `selection-card.md`. The variant affects four rows:

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ 158 × 104 |
| 4 | ⚙ States by ≥ 2 channels | ✅ border + fill + check badge (three, with the radio removed) |
| 7 | ⚙ Four languages, nothing truncated | ⬜ **the open risk.** Fixed 104 height budgets two lines; measure eight labels in Kannada at font scale 1.3 |
| 9 | Meaning survives with text covered | ⚠ six of eight yes; the two in-law tiles rely on the second figure in the pictogram and the voice. Field-test watch item |
| 10 | Meaning survives in greyscale | ✅ border weight 1 → 2 dp plus the check badge |

## Promotion

Used three times in this pattern alone (relationship 8-up, children Yes/No, boy/girl) and the next likely use is the government document-type picker in onboarding (Aadhaar / PAN / voter ID / driving licence / passport — also a fixed outside list). At that point `tile` moves from this brief into `selection-card.md` proper with a rendered example on `site/components/selection-card.html`.
