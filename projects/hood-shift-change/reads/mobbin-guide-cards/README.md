# Mobbin read — the three guide cards: pattern in one corner, consistent icons, a map that looks like a map (2026-10-13)

| | |
| --- | --- |
| Asked by | `projects/hood-shift-change` — the lead, 2026-10-13, on the Figma V2 N1–N4 / F3 fan: replace the circles with an abstract shape masked to the top-right corner; patterns instead of circles; align the scattered Place and Time cards; make the icons consistent; the map does not look like a map; Time is too colourful and does not look like a clock; explore Expert ID's icon and colour; saturated but gentle colours; check accessibility. "Read Mobbin if required." |
| Region | The three guide cards (Place · Time · Expert ID) above Saathi on N1–N4 and F3 |
| Why Mobbin | No system component is a "what to say" card; the fan is a Local piece the lead drew (`TIERS.md` G1). Mobbin was read for *how shipped apps keep category icons consistent* and *how a map reads as a map at icon size*, not for layout |
| Search | `search_screens`, standard, iOS: (1) "category cards with soft colour fill and a subtle pattern or abstract shape in the top-right corner fading out, icon in a white circle, short label"; (2) "colourful cards with a subtle geometric pattern or contour lines in one corner fading into a solid colour, large icon, title" |
| Internal only | Not published, not traced |

## What shipped apps do

| App | What the screen does | Take | Leave |
| --- | --- | --- | --- |
| [Brink](https://mobbin.com/screens/b3517c8e-c5db-442e-a8a8-2a3459dca9a9) | Category tiles: every icon in the same tinted disc, one line weight, the disc tinted per category | **Consistency is the container, not the glyph**: same disc, same size, same weight, colour per category | Grey tiles |
| [Grab · Map Your City](https://mobbin.com/screens/2bc70d9c-5e4c-4e09-8a23-d63463162c34) | Cards whose picture is a light-blue map with white roads and red pins | **A map reads as a map when it has roads and a pin** — a pin alone reads as "location", a hexagon reads as nothing | Hands and red pins (red = error here) |
| [Monzo · wallpapers](https://mobbin.com/screens/c277bfef-6b7f-4cb8-bad8-4aa6b97fc1a6) | Soft, saturated gradients that fade to white | Saturated but gentle: mid-light tones with real chroma, not 50-step tints | Full-bleed gradients behind content |
| [Rakuten](https://mobbin.com/screens/acb8018d-112d-4b39-a932-938cbaa7d8ec) | Coloured objects in identical neutral discs | Same as Brink | — |

## Translation (Paper page *Guide cards · Place · Time · Expert ID (2026-10-13)*)

- **Borrowed:** one container for every picture (white disc or white tile, same size); a map drawn with roads and a pin; mid-light colour steps instead of 50/100 tints.
- **Ours:** tokens only (the five new hues are proposals, see `SCOPE.md` → Asks of core); the pattern is an SVG with a white radial-gradient mask anchored at the top-right corner; Outfit; Phosphor where an icon is used; pink stays only on actions (the lead's B2 reason).
- **Not borrowed:** photography, full-card gradients, red pins.
