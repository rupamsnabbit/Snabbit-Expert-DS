# MapMarker · MapSnippet

Status: **Proposed** · Tier: Core (MapMarker) · Composition (MapSnippet) · Package: `SnabbitMapMarker`, `SnabbitMapSnippet` (new) · Figma: no component. Shipped: a small static map with red default pins and a *Show directions* button laid over it, inside the arrival card (`966:50206`); *Your Hotspot · Jyoti Nivas College Gate · 3.2 km away · Map* on Home (`87:25332`).

The app does not do **turn-by-turn** — it hands that off to the phone's maps app, and that is right: navigation on a
₹10k phone in a moving bus is the wrong tool (P8). But the app owns two map surfaces, and they are not the same thing.

| Surface | What it is | Where |
| --- | --- | --- |
| **MapSnippet** | **Static**, in a card, one destination, one *Show directions* Button that hands off. Not pannable; markers are not targets — the snippet is. | Arrival card, the work-area row's detail view, anywhere a single place must be shown before travelling to it |
| **LiveMap** | **Interactive and full-bleed.** She pans it, and the markers **are** tap targets — it is how she finds a **rest hub** or a **Seva point** near her. Content floats over it in cards. | Home, for the whole time her shift is running |

**Do not shrink the LiveMap into a snippet.** It looks like decoration when the only pin is the job, but that is not
what it is for: it is the only surface in the app that answers *where can I sit down*, *where is help*, and it has to
stay the size of a map to be pannable. Corrected 2026-09-15 after this spec's original wording ('a small map') led to
the Home map being replaced with a 160 dp card on two screens.

MapMarker is the pin family that makes places recognisable at a glance and identical on both surfaces; MapSnippet is
the card the static one sits on.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Google's default red pins, two of them, unlabelled | **Four markers** with one meaning each — `job`, `hub`, `me`, `hotspot` — brand pins with a Phosphor glyph, labelled below | A red pin is "a place"; a pin with a house and *Radhika's home* is "the job" (P1, P2). |
| Map tile in full colour under the card's text | Map style muted (greyscale roads, no POI labels, no traffic) so the markers are the only colour | The map is context; the pins are the message. |
| *Show directions* as a text-and-icon strip over the map | **`secondary brand M`** Button *Show directions* under the map, with the distance line; map itself also opens directions | One clear way out; a 48 dp target not competing with the pins. |
| No way to show an **area** — only points | **`area`**: a filled, stroked shape for the boundary she must be inside to start a shift | A hotspot is a place to stand; a work area is a region she may work anywhere inside. Drawing a region as a pin tells her to go to its centre, which is wrong (`projects/beauty-shift-lifecycle`, PRD § 2). |
| Distance *3.2 km away* on Home; *REACH IN 00:00* ring elsewhere | Distance line *3.2 km · about 12 min* under the snippet; time pressure stays with the Timer | Distance is information; the countdown is the Timer's job. |

---

## MapMarker

```
      ┌────┐
      │ ⌂  │   32 × 32 head · radius 10 · bgBrand · Phosphor fill 18 iconInverse · 2 dp bgPrimary ring
      └─▼──┘   8 dp tail pointing at the spot
   Radhika's home   ← label Caption Medium textPrimary on a bgPrimary pill, 4 dp below the tail
```

| Kind | Head | Glyph | Label |
| --- | --- | --- | --- |
| `job` | `bgBrand` | `house` fill | Customer's first name + *'s home* |
| `hub` | `bgInverse` | `graduation-cap` fill | Hub name (*Koramangala hub*) |
| `me` | 16 dp `textInfo` dot, 3 dp `bgPrimary` ring, 24 dp `textInfo` @ 20 % halo | `navigation-arrow` fill when heading is known | *You* |
| `hotspot` | 48 dp filled circle `bgBrandSubtle` @ 60 % + 1.5 dp dashed `borderBrand`, no head | — | Hotspot name, e.g. *Jyoti Nivas College Gate* |
| `rest-hub` | `bgBrand` | `armchair` fill **(propose in `foundations/icons.md`)** | *Rest hub* + distance, e.g. *Rest hub · 400 m* |
| `seva` | `bgBrand700` | `hand-heart` fill **(propose in `foundations/icons.md`)** | *Seva point* |
| `area` | The whole region: `bgBrandSubtle` @ 40 % fill + 2 dp solid `borderBrand` stroke, no head, no tail | — | Area name on a `bgPrimary` pill at the shape's visual centre, e.g. *Indiranagar* |

Sizes: `M` (above) for snippets; `L` (40 head, 22 glyph, `BodyMd` label) when a marker is the selected one on a taller map. Never smaller than `M`: a 24 dp pin on a 360 dp phone in sunlight is a dot.

States: `default`; `selected` (`L`, label `SemiBold`, the map centres on it); `stale` (`me` when the fix is older than 60 s: dot `textTertiary`, label *You · a minute ago*). **On a MapSnippet markers are not tap targets — the snippet is. On the LiveMap they are**: tapping `rest-hub` or `seva` opens its sheet (what it is, how far, how to get there), which is the whole reason that surface is interactive. Targets there are ≥ 48 dp including the label pill.

Labels are always shown (P2): an unlabelled pin is a red pin. When two labels would overlap, the `me` label yields (it can become *You* under the dot only); `job` never hides its label.

### `area` — the boundary

`hotspot` and `area` answer different questions and must never appear on the same map. A **hotspot** is *stand here*: a small dashed circle she walks to. An **area** is *you may work anywhere inside this*: a large solid shape whose edge is the only thing that matters.

- **Fill and stroke, always both.** The fill says *inside*; the stroke says *where the edge is*. Fill alone on a muted map is a smudge; stroke alone is a road (P1: never one channel).
- **Solid stroke, not dashed.** The hotspot's dashed circle means "approximately here". A boundary is exact — crossing it is the difference between starting a shift and not.
- The map **fits the whole shape** with 24 dp padding, so the edge is always on screen. This is the one case where the shape, not the `me` marker, sets the bounds.
- `me` renders on top, and outside the shape it keeps its normal treatment — it is never coloured to indicate failure. The *state* is carried by the screen's line and icon (*You're 1.2 km outside your work area*), not by recolouring her own dot: she is not the error.
- The shape comes from the backend as a polygon. When it fails to load, the screen falls back to the area **name** and the distance to its edge with a retry — never a guessed circle, because a wrong boundary drawn confidently is worse than no boundary.
- On the Home shift card the area appears as a **row**, not a map: `polygon` icon + *Your work area · Indiranagar* + `caret-right`. It replaces the shipped *Your Hotspot · … · 3.2 km away · Map* row for categories that use areas.

---

## MapSnippet (composition)

```
┌──────────────────────────────────────────┐  Card · radius.lg · borderSubtle
│ ▒▒▒▒▒▒▒▒▒▒▒ muted map 160 dp ▒▒▒▒▒▒▒▒▒▒ │  ≤ 3 markers · fit bounds with 24 dp padding · no zoom controls · not draggable
│ ▒▒▒  (⌂) Radhika's home        ● You ▒▒▒ │
├──────────────────────────────────────────┤
│ HAL Old Airport Rd, near railway bridge  │  address BodyMd textBody · ≤ 2 lines · inline Listen (VoicePrompt)
│ 3.2 km · about 12 min                    │  distance line Caption textSecondary
│ [ ⇱ Show directions                  ]   │  Button secondary brand M · opens the phone's maps app
└──────────────────────────────────────────┘
```

- **Static, not interactive**: no pan, pinch or zoom controls. Tapping anywhere on the map does what the Button does. If the map tile fails to load, the area shows the address on `bgSecondary` with the `job` marker centred — the Button still works.
- Heights: `160` default; `240` on the arrival screen where the snippet is the hero.
- Contains at most **three** markers: the destination (`job` or `hub`), `me`, and a `hotspot` when relevant. Never a list of jobs on a map — that is a ListItem list.
- The Button label is always *Show directions*; the hand-off goes to Google Maps / Apple Maps with the destination pinned, in walking or transit mode as the distance suggests (< 1.5 km walking).
- The distance line updates with her position every 30 s while the screen is open; *about 12 min* is walking or transit time, rounded to 5 min, never seconds.
- Offline: the cached tile if any, else the fallback; the Button still opens the maps app, which handles its own offline state.
- Reduced motion: no `me` halo pulse.

---

## Content

- Marker labels: possessive first name + *home* for jobs (*Radhika's home*); the hub's neighbourhood name; *You*. ≤ 20 chars, one line; longer names truncate with an ellipsis and read in full aloud.
- Address: as the customer wrote it, ≤ 2 lines, with an inline Listen — the address is the thing she most often needs read aloud in a rickshaw.
- Distance: *3.2 km · about 12 min*. Under 1 km: *650 m · about 8 min*. Never *3.24 km*, never *ETA*.
- Button: *Show directions*. Not *Navigate*, *Open in Maps*, *Go*.

---

## Accessibility

Snippet is one button announcing *"Map. Radhika's home, 3.2 kilometres, about 12 minutes. Show directions."*; markers are decorative to the reader. Address has its own Listen. Button ≥ 48 dp. Marker head `iconInverse` on `bgBrand` 4.1:1 with a glyph; `me` `textInfo` dot with a white ring survives any tile.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `map.style` | muted: greyscale roads, no POI, no traffic | One map style everywhere; into foundations when maps get their own page |

---

## Figma reconciliation

1. **Create** MapMarker: `Kind` (Job / Hub / Me / Hotspot / **Area**), `Size` (M / L), `State` (Default / Selected / Stale). Heads bound to `bgBrand` / `bgInverse` / `textInfo`; `Area` has no head — fill `bgBrandSubtle` @ 40 %, stroke `borderBrand` 2 dp.
2. **Create** MapSnippet: `Height` (160 / 240), booleans `Hotspot`, `Me`; muted map fill as a placeholder image; address + Listen + distance + *Show directions*.
3. Replace the default red pins and the overlaid *Show directions* strip in the arrival and Home hotspot cards with the composition.

Result: **~12 variants**, and the same pins on every map.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ the snippet and the Button; pins are not targets |
| 2 | ⚙ Semantic tokens only | ✅ + proposed `map.style` |
| 4 | ⚙ States by ≥ 2 channels | ✅ glyph + colour + label |
| 5 | ⚙ One next action | ✅ Show directions |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ house / cap / dot glyphs; labels anyway |
| 10 | Greyscale | ✅ glyphs differ; map is already muted |
| 12 | Voice | ✅ address Listen |
| 15–16 | Review | ⬜ pending — test the muted tile in sunlight |
