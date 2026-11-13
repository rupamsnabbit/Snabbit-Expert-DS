# Reference read — the lead's three card references (2026-10-13)

| | |
| --- | --- |
| Asked by | The lead, after round 1 of the guide cards: "good iterations, but I'm not liking the colour itself as base … I like the 3rd one" |
| Region | The three guide cards (Place · Time · Expert ID) on N1–N4 and F3 |
| Sources | `ref-1-givingli-categories.png` (Mobbin, Givingli · shipped) · `ref-2-forex-carousel.png` (concept shot, unknown source) · `ref-3-sport-cards.png` (concept shot, unknown source — **the one the lead likes**) |
| Weight | Ref 1 is shipped; refs 2 and 3 never shipped (`EXTENDING.md`: mood only). Nothing structural is taken from 2 or 3; what travels from them is the ground + object treatment, which the lead asked for by name |
| Internal only | Not published, not traced |

## 1 · The idea

The colour is not the base; the **object** is. Each card is a quiet ground (deep, desaturated, with one soft light in the corner) and one large monochrome object that names the card and is cropped by the card's edge. The title sits on the quiet part.

## 2 · Idea vs expression

| Borrowable (idea) | Their skin (stays behind) |
| --- | --- |
| A deep or muted ground with **one soft light** from a corner, instead of a bright fill | Their navy, steel, greens; the dark page around them |
| **One big white object per card**, bleeding off the top-right edge (the lead's "only in the top-right corner") | Photoreal 3D renders (rackets, dumbbells, gloves) |
| Title on the quiet side, one small line under it | Two-line title case, *Learn more* links (our cards are not tappable) |
| Ref 1: muted grounds (lilac grey, blush, sage) instead of candy pastels | Sticker outlines, serif titles |
| Ref 2: side cards peek at full height beside the centre one, no tilt | The play button, grain, the carousel itself (P3: no horizontal browsing for required content) |

## 3 · Against the expert

- **Outdoors, at a glance:** white type on a deep ground is 14–18 : 1, better in sunlight than round 1's pastels. Pass.
- **Picture first (P1):** the object *is* the meaning — a folded map with a pin, an alarm clock at 9, an ID badge on a lanyard. Greyscale still works because the three shapes differ. Pass.
- **One next action (P2):** three dark cards on N4/F3 compete with the pink mic. **Change:** offered both ways — F1 keeps them deep, F2 makes the cards beside the lit one (and all three on N4/F3) a light grey ground so the mic stays the only strong thing.
- **Assets (style lock):** photoreal or glossy 3D is reserved for rewards ("if it shines, it's about what I earned"). **Change:** the objects are matte, flat-vector with soft gradient shading, monochrome — the illustration layer, not the reward layer.
- **Performance (P8):** CSS radial gradients and flat SVG only; no blur, no images.

## 4 · Tier

Still Local (`TIERS.md` G1). The objects are three illustration-layer pictograms to register (`SCOPE.md` → Asks of core).

## 5 · Translation (Paper, page *Guide cards · Place · Time · Expert ID (2026-10-13)*, round 2)

- Ground **deep**: `radial-gradient(circle at 100% 0%, hue-700, gray-900 78%)` — sky (Place), teal (Time), violet (Expert ID). Ground **light**: hue-200 → gray-100. Ground **mid** (ref 1): hue-300 → gray-300.
- Object: white / gray-50…500 only, CSS radial gradients for the round bodies, flat SVG for the map and the clock face; edges gray-400 on deep, gray-500 on light (≥ 3 : 1 against gray-100).
- Type: label Heading3 / BodyLg SemiBold in `textInverse` (deep) or `textPrimary`; value in gray-200 (deep) or `textBody`; Hindi leading ×1.15.
- Arrangement: round 1's aligned fan (one centre line, ±6°, right card mirrored) — unchanged.

## 6 · Side by side

On the Paper page, artboard *Round 2 · your refs → our cards*. Every difference is written there as one line.
