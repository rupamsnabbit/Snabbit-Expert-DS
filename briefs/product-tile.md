# Brief — ProductTile (Tier 3, withdrawn from core 2026-09-22)

> **Not in the app.** Invented 2026-09-15/18 for `projects/beauty-shift-lifecycle` from Mobbin references (sweetgreen, Thrive Market), not from any Snabbit screen. Withdrawn from `components/` after tech feedback: reuse what ships. Kept here as a Tier 3 brief per `principles/EXTENDING.md` — it may return to core only by the rule of three, and only after naming the shipped component it tried. The original spec follows unchanged.

---

# ProductTile

Status: **Proposed** · **Build request — avoidable** · Tier 1 Core · added 2026-09-18 for `projects/beauty-shift-lifecycle`

> **Reuse checked after the fact (2026-09-22), and it exists.** Every place this tile was drawn can be a **ListItem** with a 40 dp product image leading, name, and Amount `S` or `quantity` trailing — the shipped *Monthly Earnings Breakup* row (`references/shipped-app-2026-09-22/`, `patterns/payout.md` line 38). The Beauty board's two working screens were already rebuilt that way on 2026-09-21. This spec stays because the rule *the name never leaves* and the visible zero state are worth keeping; **the 99 dp grid tile itself should not be built unless a browsing surface demands pictures over rows.** Default to the ListItem.

A picture of a real thing she carries, with how many of it, and its name. It exists because the inventory flow is
entirely about amounts of physical objects, and a list of their names is the one form that tells her least.

## What ships

Nothing. This is new. It replaces a text row in three places at once, which is why it is Core on its first pass
rather than a Tier 3 brief — `EXTENDING.md` § rule of three is satisfied at birth:

| Screen | What it replaced |
| --- | --- |
| **Live inventory** → a pouch's contents | *Facial kit … 6 of 8* as a text row |
| **Weekly refill** → *What is coming* | *Facial kit · used 6 of 8 · +6 · ₹360* as an invoice line |
| **Add refills** → what to put back | a checkbox row with an empty image slot |

The stakeholder's feedback on the text-row version was that it read *"like a bill"* (2026-09-18). The reference
read is `projects/beauty-shift-lifecycle/reads/mobbin-2026-09-18-visual-inventory/` — sweetgreen's ingredient grid
is the closest shipped analogue, Snoonu supplies the corner badge, Blinkit proves a delivery screen can show the
goods as pictures.

## Anatomy

```
┌──────────────┐
│           ⌐──┤   badge   top-right, radius.full, bgInverse / textInverse
│    image  │+6│   image   1:1, radius.lg, bgSecondary ground, contain
│           └──┤
└──────────────┘
  Facial kit       name    BodyMd 14 Medium textPrimary, 2 lines max
  used 6 of 8      note    Caption 12 textSecondary, 1 line, optional
```

- **Image** is catalogue content, never a design-system asset (`foundations/assets.md`). The tile draws the slot;
  the Category team fills it. With no image the slot shows the pouch's Phosphor icon at 40 dp in `textTertiary` —
  never an empty coloured box, which is what the first draft of the board rendered.
- **Badge** carries an amount and nothing else. Never a discount, never a promotion — we have nothing to sell her.
- **Name** wraps to two lines and then truncates; the full string is always in the spoken label.

### The name never leaves

**A product is never identified by its picture alone, and never by an icon at all.** The catalogue runs to roughly
forty items and most of them are white bottles, sachets and tubes — at tile size they are not reliably
distinguishable from each other even as photographs, and as Phosphor glyphs they are not distinguishable at all.

This is also a category error: `foundations/icons.md` registers **meanings** — *back*, *SOS*, *rest hub* — it is a
UI vocabulary, not a product catalogue. A face pack is not a UI concept and will never earn a glyph.

So the image is an **assist**: it speeds recognition of something she has already been told the name of. Any
surface that shows products without their names is showing texture. There is no image-only size of this component,
and a smaller tile drops the *badge* before it drops the *name*.

Retracted on 2026-09-18: a 48 dp image-only `peek` size was added and removed the same day, when the stakeholder
asked how an expert is meant to identify forty icons instantly. She isn't. See
`projects/beauty-shift-lifecycle/reads/mobbin-2026-09-18-visual-inventory/` § 4.

## Variants

| Variant | Badge | Tap | Where |
| --- | --- | --- | --- |
| `read` | the count she holds — *8 kits*, *1 pack* | opens item detail | Live inventory |
| `incoming` | what is arriving — *+6* | none | Weekly refill § What is coming |
| `task` | what she must add — *add 2* | toggles ticked | Add refills |

`task` adds a Checkbox at the tile's top-left and, when ticked, a 2 dp `borderBrand` on the tile. It never uses
strikethrough: a struck-through product reads as *cancelled*, and it is not cancelled, it is packed.

## Sizes

Three across the 328 dp content column: tile 99 dp wide, image 99 dp tall, `spacing.4` between. Two across
(156 dp) only where a row holds fewer than three items and the grid would look broken.

At font scale 1.3 the grid drops to two across before any name truncates — the tile grows, the type does not
shrink (`foundations/type.md`).

## States

| State | Renders |
| --- | --- |
| default | as drawn |
| pressed (`read`, `task`) | image ground `bgTertiary` |
| ticked (`task`) | Checkbox filled, tile border `borderBrand` 2 dp |
| zero (`read`) | badge reads *0 left*, image at 40% opacity, name unchanged |
| loading | Skeleton square plus two grey lines |

**The zero state is the one to get right.** A product she has run out of stays in the grid, greyed, with the count
still legible — removing it would make the gap invisible, and the gap is the whole point.

## Content

Amounts follow `list-item.md` § `quantity`: the unit is part of the value (*8 kits*, not *8*), `+` marks something
arriving, and there is no `−` form. Names are the catalogue's, sentence case, never abbreviated to fit.

## Accessibility

- Tile is a 99 dp square — comfortably past the 48 dp target.
- **The badge is never the only carrier of the amount**: it is repeated in the spoken label, and on `read` tiles
  also in the item detail it opens.
- Contrast: `textInverse` on `bgInverse` is 17.7:1; name `textPrimary` on `bgPrimary` 17.7:1; note `textSecondary`
  4.8:1 — all pass (`foundations/accessibility.md`).
- Spoken: *"Facial kit, eight kits"* · `task`: *"Facial kit, add two, not yet added"* · zero: *"Face pack, none left"*.
- The image is decorative to a screen reader; the name and amount carry everything.

## Sound

None on `read` and `incoming`. `task` ticking uses the Checkbox's own tick (`foundations/motion.md`).

## Do / don't

**Do** — draw the slot even when the catalogue has no image · keep the amount in the badge and the words · grey a
zero rather than hiding it · three across.

**Don't** — colour the badge by how much is left (a count is not a status, `list-item.md`) · put a price in the
badge · strikethrough a ticked tile · use an illustration where a product photo belongs (`foundations/assets.md`:
one asset, one meaning) · let a name shrink to fit.

## Figma reconciliation

New component. Create **ProductTile** on the Components page `1:3886` with properties `Variant`
(`Read / Incoming / Task`), `State` (`Default / Pressed / Ticked / Zero / Loading`), boolean `Note`, and an image
fill slot bound to a catalogue placeholder. Bind every colour to the semantic variables named here. No existing
frame is replaced — the text rows it supersedes live in screen files, not in the library.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ no raw values |
| 2 | Outfit only | ✅ BodyMd / Caption |
| 3 | Phosphor only | ✅ fallback glyph is the pouch icon; no emoji |
| 4 | Target ≥ 48 dp | ✅ 99 dp square |
| 5 | Meaning without colour | ✅ amount is a number and a word; nothing is carried by hue |
| 6 | Meaning without text | ✅ product image plus badge |
| 7 | States complete | ✅ default, pressed, ticked, zero, loading |
| 8 | Zero / empty honest | ✅ zero stays visible and greyed, never removed |
| 9 | Spoken label | ✅ name plus amount, always |
| 10 | Indic budget | ✅ 2 lines, grid drops to 2-across at 1.3 |
| 11 | One meaning | ✅ a thing she carries and how many |
| 12 | Never a bare digit | ✅ unit or verb always present |
| 13 | Not a status | ✅ badge never coloured by level |
| 14 | Asset rule | ✅ image is catalogue content, not a DS asset |
| 15 | Motion | ✅ none beyond the Checkbox tick |
| 16 | Tier named | ✅ Tier 1 Core, rule of three met on arrival |
