# Card

Status: **Proposed** · Tier: Core · Package: `SnabbitCard` · Figma: Cards – States (`379:6040`); informs Earnings Card, Summary Card, Attendance Card, Job States, Navigation Card, Metric Card (all compositions)

A card is a bounded surface that says "these things belong together and this is one thing you can look at or tap." It is the most-used container in the app, and the place where the system either holds or falls apart — because every team draws its own card. This spec makes the card boring on purpose: one shape, one border, no shadow, a fixed set of slots. Everything interesting happens *inside* it, using the other components.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| A base card with 4 looks (plain, dashed, header band, pink border); every feature card drawn from scratch | One `Card` with **slots** (header · media · body · footer) and **kinds** (static · tappable · expandable); features compose, never redraw | Transfer of learning: every card behaves like every other card. |
| Shadows on some cards, none on others | **Flat.** 1 dp `borderDefault` on `bgPrimary`, radius `lg`. No shadow ever, except the one floating map card | Tokens say elevation is flat; a shadow on a ₹10k phone is a rendering cost and, in sunlight, invisible (P8). |
| Pink-bordered card as a generic "highlight" | `borderBrand` 2 dp means **selected**, nothing else | Border colour is a state, not decoration. Highlighting is done by content (Tag, Amount tone). |
| Dashed border as a state | Dashed = `empty` kind: an **add** slot (*Add bank account*) | The only legitimate use. |
| Header band (`bgTertiary`) | Kept as the `header` slot's `banded` option, for grouped cards with a title | |

---

## Anatomy

```
┌ card ──────────────────────────────────────────┐  radius lg 12 · border thin borderDefault · bgPrimary
│ header   Title                    [Tag|Icon]   │  optional · Title 18 Medium · trailing one Tag or one IconButton
│ media    ────────── 16:9 image ──────────────  │  optional · full-bleed, top corners follow radius
│ body     (anything — composed from components) │  16 padding · 12 gap between children
│ footer   [ghost]              [secondary/M]    │  optional · one or two Buttons, M, never a filled primary unless the card is the screen's one action
└────────────────────────────────────────────────┘
```

Padding 16 dp all round; internal gap 12 dp; between cards 12 dp; screen margin 16 dp. A card is always the full content width (328 dp on the baseline); half-width cards exist only as a **pair** in a 2-column grid (e.g. two metric cards), never three across.

---

## Kinds

| Kind | Tap | Affordance | Use |
| --- | --- | --- | --- |
| `static` | none | — | Earnings summary, info groups |
| `tappable` | whole card opens something | trailing `caret-right` in the header, or the body's own chevron row; pressed wash | Job card → job detail; navigation cards |
| `expandable` | header toggles the body | trailing `caret-down` / `caret-up` IconButton XS ghost, rotates 180° in 200 ms | Earnings breakdown (*You will earn ₹150 ▾*) |
| `empty` | whole card | dashed `borderStrong` 1.5 dp, `plus-circle` icon + one line, centred | *Add bank account*, *Add a document* |
| `hero` | → **HeroCard** (own spec, 2026-09-22) | | the filled two-part card that opens every tracker screen |
| `selectable` | → **SelectionCard** (own spec) | | Options with description/price/image |

**`hero` and colour.** The shipped heroes are filled pink, green and blue by screen (streak · perfect jobs · early logins). That is three hues meaning only *different*, which P6 reserves for status — recorded in `references/shipped-app-2026-09-22/` as a departure. The spec's `hero` is `bgPrimary` with the figure carrying the weight; the shipped fills stay until the design lead decides, because reusing them costs tech nothing and changing them costs a sprint.

A `tappable` card never also contains Buttons; if it needs an action it is a `static` card with a footer. One tap target per card, or many small ones — never both (P3).

---

## States

| State | Border | Fill | Notes |
| --- | --- | --- | --- |
| default | `borderDefault` 1 dp | `bgPrimary` | |
| pressed (tappable) | as default | `bgSecondary` 100 ms | `light` haptic |
| selected | `borderBrand` 2 dp | `bgPrimary` | only via SelectionCard or a picker |
| disabled | `borderDefault` | `bgTertiary` | content at `textTertiary`; not tappable — rare; prefer removing the card |
| loading | `borderDefault` | `bgPrimary` | body is a **skeleton** of the real layout (title bar, two lines, amount block), never a spinner in a box |
| error | `borderDefault` | `bgPrimary` | an inline error **Banner** as the first body child; the card itself does not go red |
| empty (kind) | dashed `borderStrong` 1.5 | `bgSecondary` | |

---

## Slots

**Header.** Title `Title` 18 sp Medium `textPrimary`, one line, ≤ 24 chars; optional leading Phosphor 24 dp or Avatar 40; trailing **one** of: Tag (status), IconButton XS ghost (expand / overflow-free actions), Amount `md`, `caret-right`. Banded option: `bgTertiary` fill on the header row only, for grouped cards (*Today · 3 jobs*).

**Media.** 16:9, full-bleed to the card edges, top corners clipped to radius `lg`. Photo or scene asset. Never required for meaning (P8): with images blocked the card still reads.

**Body.** Free composition from core components: Amount `hero`/`lg`, ListItem rows (with `borderSubtle` dividers inset 16), Tags, ProgressBar, text at `BodyLg`/`BodyMd`. Max hierarchy inside a card: **three levels** (P-type rule) — a title, a hero figure or lead line, and supporting rows.

**Footer.** One or two Buttons at `M`. One → full-width `secondary` or `tertiary`. Two → `ghost` left, `secondary` right, 12 dp apart, equal width. A filled `primary` in a card footer is allowed **only** when the card is the screen's one next action (the job card's *Accept* on the alert). Footer sits 16 dp below the body with a `borderSubtle` divider when the body has rows.

---

## Composition rules

- **Never a card inside a card.** Rows inside a card are ListItems with dividers, not nested cards.
- **Never a card for one line.** A single row is a ListItem on the page; a card holds a group.
- **Cards don't scroll internally.** If the content is long, the card grows or becomes a list screen.
- **One hero per card, one primary per screen.** Two cards on a screen cannot both have a `hero` Amount.
- **Flat.** The only shadow in the app is the floating card over the map (`elevation.floating`), which is a pattern-level exception documented there.
- **Colour by content, not by container.** A card's fill is `bgPrimary`; status is shown by a Tag, an Amount tone or a Banner inside. Tinted cards (green for earned, red for penalty) are not allowed — with two tinted cards on a screen the page stops reading as one surface.
- Cards live on `bgSecondary` pages (`#F9FAFB`) so the border and fill separate without a shadow. On a `bgPrimary` page the border does the work alone.

---

## Accessibility

A `tappable` card is a single button with an accessible name composed from its title and key values ("Cleaning, 2 hours, ₹450, 9:30 am, opens job"). Inside a `static` card each control is reachable on its own. `expandable` announces expanded/collapsed. Skeleton loading is announced once as "loading". Font scaling: cards grow; media keeps 16:9; nothing clips.

---

## Token proposals

None. Dashed empty border uses `borderStrong` at `thick` (1.5 dp), both existing.

---

## Figma reconciliation

1. Cards – States → **Card**: `Kind` (Static / Tappable / Expandable / Empty), `State` (Default / Pressed / Selected / Disabled / Loading), slot booleans `Header`, `Banded`, `Media`, `Footer`, `Footer buttons` (1 / 2).
2. Remove the pink-border look as a style; it exists only as `Selected`.
3. Rebuild Earnings Card, Summary Card, Attendance Card, Job States, Navigation Card and Metric Card **as instances** of Card with composed bodies (Amount, ListItem, Tag). Move them to their feature pages as compositions.
4. Delete drop shadows on every card in the file.
5. Bind border, fill and radius to tokens.

Result: **~24 core variants** and six feature cards rebuilt as compositions.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ tappable card ≥ 56 dp; footer Buttons M 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Title / BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ selected = border + check (SelectionCard); expandable = chevron rotation + content |
| 5 | ⚙ Loading / error / empty | ✅ skeleton · inline Banner · empty kind |
| 6 | ⚙ Tap guard | ✅ via Button; tappable card debounced 300 ms |
| 8 | ⚙ Motion ≤ 300 ms | ✅ expand 200 ms; reduced-motion → instant |
| 9 | Meaning without text | ✅ shape says "group"; content components carry meaning |
| 10 | Greyscale | ✅ no colour-only container states |
| 14 | Status colours only for status | ✅ no tinted cards |
| 15–16 | Review | ⬜ pending |
