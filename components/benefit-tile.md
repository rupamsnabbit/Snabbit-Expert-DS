# BenefitTile

Status: **Proposed** · **In app** 2026-09-22 (Tier screen — *Other Benefits*; Coins screen — *Early Login · Perfect Job · Daily Streak*) · Tier 1 Core · Package: `SnabbitBenefitTile` · Figma: no component

A square tile with an icon in a disc and a label under it, three across. It is how the app shows a **set of things
she gets or can earn** — twelve benefits of a tier, three ways to earn coins — where each thing is one word or two
and the set is read as a whole. It is not a SelectionCard (nothing is chosen) and not a ListItem (a list of twelve
one-word rows is a wall; a 4 × 3 grid is a glance).

## What ships

`references/shipped-app-2026-09-22/01-tier-gold.png` and `03-coins.png`.

| Shipped | Kind | Notes |
| --- | --- | --- |
| **Other Benefits** — 12 tiles: gold-ring disc, line icon, two-line label; the six she has not unlocked are dimmed | `benefit` | tap opens that benefit's sheet (screen 02) |
| **Early Login · Perfect Job · Daily Streak** — 3 tiles, **filled discs in blue, green and pink** | `earn` | tap opens that tracker (screens 04–05) |

What changes: the three coloured discs on the Coins screen. Blue, green and pink here mean nothing but *different*,
and P6 reserves hue for status — so the spec's `earn` disc is `bgBrandSubtle` with the icon in `iconBrand`, identity
carried by the icon. **Recorded as a departure; the shipped fills stay until the design lead decides**, because
reusing them costs tech nothing. Everything else — the grid, the ring, the dimmed locked state — is kept as shipped.

## Anatomy

```
┌──────────────┐  99 × 128 · radius lg · borderDefault 1 dp · bgPrimary
│              │
│    ( ♡ )     │  disc 56 dp · radius.full · 1.5 dp borderBrand ring (benefit) or bgBrandSubtle fill (earn) · icon 28 Phosphor regular iconBrand
│              │
│   Health     │  label BodyMd Medium textPrimary · centred · 2 lines max
│  Insurance   │
└──────────────┘
```

Three across the 328 dp column at `spacing.4` gaps; rows at `spacing.4`. A set of 2 or 4 is still drawn 3-across
with the last row short — never 2-across, so every screen's tiles line up.

## Kinds

| Kind | Disc | Tap | Where |
| --- | --- | --- | --- |
| `benefit` | ring `borderBrand`, icon `iconBrand` | opens a sheet explaining the benefit across tiers (screen 02) | Tier screen |
| `earn` | fill `bgBrandSubtle`, icon `iconBrand` — or a **reward asset** (coin, flame) at 32 dp where one exists | opens the tracker | Coins screen |

## States

| State | Rendering |
| --- | --- |
| default | as drawn |
| pressed | `bgSecondary` wash 100 ms; `light` haptic |
| `locked` | ring `borderDefault`, icon and label `textTertiary`, `lock-simple` 16 dp at the disc's bottom-right; tap opens the same sheet, which says what unlocks it |
| loading | Skeleton disc + one label bar |

**Locked stays in the grid.** The six benefits she has not reached are the reason to reach the next tier; hiding
them hides the incentive. Same logic as ProductTile's zero state.

## Content

Labels are the benefit's name, two words, sentence case in body copy but kept as the product names them (*Snabbit
Seva*, *Path to Promotion*). No amount on the tile — the amount is in the sheet. Icons are registered meanings from
`foundations/icons.md`; several the shipped tiles use are not yet registered and are listed under *Figma reconciliation*.

## Accessibility

- Whole tile is the target, 99 × 128 — well past 48.
- Spoken: *Health insurance* · locked: *Health insurance, unlocks at Diamond*.
- Contrast: label `textPrimary` 17.7:1; locked label `textTertiary` 2.5:1 is **decorative by design** and the lock icon plus the sheet carry the meaning — the same exception `accessibility.md` grants `textTertiary` for locked digits.
- At font scale 1.3 the grid drops to two across; the label never truncates below two lines.

## Sound

None.

## Do / don't

**Do** — three across · keep locked tiles visible · one disc colour per kind · an icon whose meaning is registered · the amount in the sheet, not on the tile.

**Don't** — a different disc colour per tile · a price on the tile · a two-across grid · a tile as a checkbox (that is SelectionCard) · more than twelve without a heading between groups.

## Figma reconciliation

No component exists. Create **BenefitTile** on the Components page `1:3886` with `Kind` (Benefit / Earn) and `State`
(Default / Pressed / Locked / Loading), icon as an instance-swap slot. **Icons to register** in `foundations/icons.md`
before the tiles can be drawn to spec: heartbeat (health insurance), shield with plus (accident insurance), folded
hands (Seva), coins with clock (early payout), briefcase (lunch break), gift (birthday), ticket (vouchers), shopping
bag (merch). `headset` (priority support), `hand-coins` (loan), `coin`, `fire` and `arrow-right` are already registered.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ BodyMd Medium |
| 3 | Phosphor only | ⚠ eight meanings still to register — listed above |
| 4 | Target ≥ 48 dp | ✅ 99 × 128 |
| 5 | Meaning without colour | ✅ icon + label; the shipped coloured discs are recorded as a departure |
| 6 | Meaning without text | ✅ icon |
| 7 | States complete | ✅ default, pressed, locked, loading |
| 8 | Zero / empty honest | ✅ locked stays visible |
| 9 | Spoken label | ✅ with the unlock condition when locked |
| 10 | Indic budget | ✅ 2 lines, grid drops to 2-across at 1.3 |
| 11 | One meaning | ✅ a thing she gets or earns |
| 12 | Never a bare digit | ✅ no digits on the tile |
| 13 | Not a status | ✅ |
| 14 | Reuse checked | ✅ SelectionCard tried — nothing is chosen; ListItem tried — twelve one-word rows is a wall |
| 15 | In app | ✅ two screens, 2026-09-22 |
| 16 | Tier named | ✅ Tier 1 Core |
