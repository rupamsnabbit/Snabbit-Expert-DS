# IconButton

Status: **Proposed** · Tier: Core · Package: `SnabbitIconButton` · Figma: Components → Icon Buttons (`1825:6970`, merge `1847:11099`)

A button whose whole meaning is one Phosphor icon. Because there is no label, an IconButton is allowed only for actions the expert already knows by shape and place: back, close, call, hear again, retry, take photo, recentre map. Everything else is a Button with a verb.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Two frames (60 + 12 variants), unnamed properties `Property 1–4` | One component; same axes as Button: **variant × tone × size × state** | One vocabulary across Button and IconButton. |
| States: Active, Disabled | default, pressed, focused, disabled, loading | Same as Button (P5). |
| Red and green filled variants | Tones brand / neutral / danger; no success tone | Status colours are not button styles (P6). |
| Any icon | Only icons in the **allowed set** below, from the Phosphor register | No label means the icon must already be universal (P1, and the research on transfer of learning). |

---

## Anatomy

Square container · one Phosphor icon centred · optional **badge** (count or dot) at top-right, overlapping the container by 4 dp · focus ring outside.

Sizes, radii and icons are Button's, so the two sit flush in a row:

| Size | Container | Radius | Icon | Use |
| --- | --- | --- | --- | --- |
| `L` | 56 × 56 | 12 | 24 | Map controls, camera shutter area |
| `M` | 48 × 48 | 10 | 20 | Header actions (back, close), default |
| `S` | 40 × 40 | 8 | 18 | Inside list rows and cards · needs 48 dp parent hit area |
| `XS` | 32 × 32 | 6 | 16 | Dismiss on a tag/banner · needs 48 dp parent hit area |

A `circle` shape option (`radius.full`) exists only for **floating** IconButtons over a map or camera preview, where a square would read as a card.

---

## Variants × tones

Identical colour table to Button — see `button.md`. Allowed combinations:

| | brand | neutral | danger |
| --- | --- | --- | --- |
| `primary` (filled) | ✅ only as a floating map/camera control | — | — |
| `secondary` (outline) | ✅ | ✅ | ✅ |
| `tertiary` (tonal) | ✅ | ✅ | — |
| `ghost` (no container) | ✅ | ✅ default for header back/close | ✅ |

A filled brand IconButton is never the screen's one next action — that action needs a verb label (P2). Its only legitimate use is a floating control (recentre, shutter) where the icon is the universal convention.

---

## Allowed icons

An IconButton may use only these registered icons (nine, after `bell` was added by the HeaderNav spec), in these positions. Anything else becomes a labelled Button.

| Icon | Meaning | Position | Size |
| --- | --- | --- | --- |
| `caret-left` | Back | Header, top-left | M ghost neutral |
| `x` | Close / dismiss | Header top-right; sheet top-right; banner right | M ghost neutral; XS ghost neutral on banners |
| `phone` | Call | Job card, contact row | M/S secondary brand |
| `speaker-high` | Hear again (spoken guidance) | Beside the text it reads | M tertiary brand |
| `arrow-clockwise` | Retry | Error states | M secondary neutral |
| `camera` | Take photo | Camera screens | L primary brand (floating, circle) |
| `crosshair` | Recentre map | Map, bottom-right above the action bar | L secondary neutral (floating, circle) |
| `translate` | Change language | Settings header | M ghost neutral |
| `bell` | Notifications | Home header left, with Badge; root header trailing | M ghost neutral |

To add an icon here: it must be in `foundations/icons.md`, tested with five experts who have never seen it, and appear in the same place on every screen.

Not allowed: `dots-three` (overflow menus are hierarchical navigation — the research says it fails), `pencil` (edit needs a verb), `trash` (destructive without a label), any icon whose meaning is feature-specific.

---

## Badge slot

A small count or dot at top-right: unread messages on the chat icon, pending items on a tab. Uses the `Badge` component (spec to follow): count ≤ 9, else `9+`; `bgBrand` fill with `textInverse`; dot variant for "something new" without a number. A badge is information, never a second tap target.

---

## States and behaviour

Same as Button: pressed (darker fill, 100 ms), focused (2 dp `borderFocus` ring), disabled (`bgTertiary` fill / `textTertiary` icon; ghost disabled = icon only in `textTertiary`), loading (spinner replaces the icon, same size, same colour; taps ignored; ≥ 400 ms), 300 ms duplicate-tap guard. No hold gesture — anything worth a hold needs a label.

Haptic: `light` on primary and secondary; none on ghost. Sound: none — the outcome (call connecting, photo taken) carries its own.

---

## Accessibility

**A content description is mandatory** and is the verb the labelled version would have shown: "Back", "Close", "Call customer", "Hear again". Hit area ≥ 48 × 48 dp; S and XS are wrapped by the parent. Icon-only controls are read as "Call customer, button". Contrast follows the Button table; ghost neutral icon `textBody` on white is 10.3:1.

---

## Placement

- Header: back at left, at most **one** IconButton at right (close or language). Two right-side icon buttons is a menu; use a labelled action instead.
- Floating controls sit 16 dp from the screen edge, above the bottom action bar by 16 dp, never over the primary Button.
- In a list row an IconButton (S, secondary brand `phone`) sits at the trailing edge with 12 dp from the row's text.

---

## Figma reconciliation

1. Merge `1847:11099` into `1825:6970`. Rename properties to `Variant`, `Tone`, `Size`, `State`; add `Shape` (Square / Circle) and `Badge` (None / Dot / Count).
2. Delete red/green filled variants; keep danger only as secondary/ghost.
3. Replace placeholder glyphs with the eight allowed Phosphor icons as swappable instances.
4. Rebind to semantic variables (same as Button).

Result: ~40 variants instead of 72.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ L/M; S/XS by parent — documented |
| 2 | ⚙ Semantic tokens only | ✅ (inherits Button's two proposed pressed fills) |
| 3 | ⚙ Type scale | n/a |
| 4 | ⚙ States by ≥ 2 channels | ✅ as Button |
| 6 | ⚙ Tap guard, loading | ✅ |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ **by construction** — only universal icons allowed |
| 10 | Greyscale | ✅ |
| 11 | Costly actions protected | ✅ none allowed here |
| 13 | Screen-reader label | ✅ mandatory content description |
| 15–16 | Copy / device review | ⬜ pending |
