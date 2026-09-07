# Assets — illustration, pictograms, characters, rewards

Coins, red cards, badges, status pictograms, service scenes, the expert characters. Not icons (icons are Phosphor, see `icons.md`) — assets are pictorial, coloured, and carry meaning on their own. For an expert who reads slowly, a red card is not decoration: it *is* the message. So assets are governed like icons — one asset, one meaning, one canonical file — plus a style lock so that a hundred of them look like one world.

The house style already exists. It was built by Snabbit's previous visual designer in the **Snabbit Assets** Figma file (`QhbyjXwWU3rukCUuDcLuRD`, page *Illustrations System*). This document writes down what he did so it can be continued — by a designer or by AI — without drift.

Decision (2026-09-07, revised): **two layers.** Flat vector with soft shading for everything informational; metallic 3D only for rewards. See `DECISIONS.md`.

---

## The two layers

| Layer | Used for | Look | Never used for |
| --- | --- | --- | --- |
| **Illustration** — flat vector, soft gradient shading, no outlines | Scenes, status pictograms, characters, empty states, permissions, coachmarks | Pink / purple / yellow palette on a pink stage; one light from top-left; sparkles as the only flourish | Rewards, currency, rank |
| **Reward** — metallic 3D | Badges, tiers, bonuses, coins, red cards | Glossy hexagons and discs, star-and-laurel motif, strong specular highlight, soft glow on dark | Information, status, anything not earned or lost |

The rule the expert learns without being told: *if it shines, it's about what I earned.* That contrast is the whole point — do not make an informational pictogram glossy, and do not flatten a badge.

---

## Classes and their register

Names are `asset/<class>/<name>`. One asset, one meaning. Before making one, look here; if the meaning exists, use it. If not, add the row in the same change.

### 1. Scenes — `asset/scene/*`

Square, pink-tiled floor and wall as the stage, one or two objects, sparkles. Existing: cleaning (bucket, mop), bathroom (toilet), kitchen-clean (spray, cloth), laundry (basket, iron), dishes (rack, plates), cooking (vegetables, board), shelves (books, plant), fridge, magic (wand, star). Sizes 96 · 160 · 240 dp. WebP.

Used for: service categories, empty states, onboarding, the Permission sheet. New scenes needed: no-jobs, offline, permission-camera, permission-location, permission-contacts, permission-notifications, payout-success.

### 2. Pictograms — `asset/picto/*`

The middle class between a Phosphor icon and a scene. A **pink disc** (`pink.100`), a **magenta object** (`pink.500–600` with a lighter face), and an optional **status dot** bottom-right — green check (`green.500`) or red cross (`red.500`). Sizes 40 · 64 dp. SVG preferred.

Existing (~30): cash-in-hand, ok-hand, calendar-✓, calendar-✗, door-enter, door-exit (several), profile-blocked, phone-location, megaphone (two), alarm-✓, document-not-eligible, document-eligible, expert-with-tablet, search-document-✗, search-document-✓, id-card-✗, id-card-✓, id-back-✓, bank-✗, phone-✗, route, timer, phone-map-✓, wallet-coins.

Rule: the object says *what*, the dot says *status*. A pictogram without a dot is neutral. Never colour the object itself green or red — status is only ever the dot, so the same object can carry both outcomes.

### 3. Characters — `asset/character/*`

Semi-realistic flat vector, adult proportions, calm confident expressions, brown skin tones varied across scenes. Uniforms identify the role and are exact:

| Role | Uniform | Existing poses |
| --- | --- | --- |
| House help (expert) | Pink tunic with black trim, black trousers, hair in a bun | Namaste (full), portrait |
| Cook (expert) | Pink chef shirt, black trousers | Man full, woman full |
| Trainer | White polo, white cap, tablet | Half-body with tablet |

Scene compositions exist: meeting a customer, hand-washing, selfie, showing ID (18+), reviewing tasks on phone, high-five, portrait-✓ / portrait-✗. Sizes 96 · 160 · 240 · full-screen. WebP.

Rule (P-persona): the expert is always competent and dignified — working, greeting, celebrating, learning. Never confused, scolded, or the butt of a joke. Distress appears only as *concern* in safety contexts, and the trainer or support is always in frame with her.

### 4. Rewards — `asset/reward/*`, `asset/badge/*`, `asset/tier/*`

Metallic 3D: hexagonal badges with a star and laurel, discs for coins, cards for penalties. Strong top-left specular, darker rim, optional soft glow on dark backgrounds. Sizes 40 · 64 · 96 · 160 dp. WebP; Lottie for the earn moment.

| Asset | Meaning | Notes |
| --- | --- | --- |
| `asset/reward/snabbit-coin` | Snabbit coin (reward currency) | The **pink "S" coin**. Current. |
| `asset/reward/gold-coin` | — | **Deprecated** ("old" in the source file). Do not use in new work. |
| `asset/reward/red-card` | Attendance penalty | Red card with ✗. Variants: `-50` amount, `full-shift` (thumbs down). Only meaning of a red card in the app; never generic error. |
| `asset/badge/silver` · `gold` · `blue` · `bronze` · `purple` | Achievement badges (star + laurel hex) | Map each to one achievement; record here when assigned. |
| `asset/badge/shakti-classic` · `shakti-super` · `shakti-premium` | Shakti Bonus tiers (blue hex, letter S / C / P) | |
| `asset/badge/winback` | Winback bonus (bronze hex) | |
| `asset/badge/joining` | Joining bonus (purple hex) | |
| `asset/tier/bronze` … `pink-diamond`, `asset/tier/locked` | Expert tier gems | From the DS file; same metallic layer. |

### 5. Faces — `asset/face/*`

Rating scale, five steps, angry → very happy. Keep the **coloured, soft-shaded** set only (illustration layer); delete the outline and grey sets. 40 · 64 dp, SVG.

### 6. Attendance and job-state marks — `asset/state/*`

The source file has a family of 258 × 258 marks: login, logout, emergency-logout, no-show, false, attendance-change, attendance-question, overtime, job-denied, lunch, plus small 40 dp PROGRESS steps. These are pictogram-layer assets and should be normalised to the pictogram rule (pink disc, magenta object, status dot). Register each when its screen is specified.

---

## The style lock — checked before any asset is registered

**Illustration layer (scenes, pictograms, characters, faces)**

1. Colour from tokens. Pinks are `pink.50–600`; purples and yellows are the two accent hues already in the scenes — record their hexes as `illustration.purple` and `illustration.yellow` in `tokens.json` so they stop being re-picked; greens/reds only as status dots.
2. Flat vector with **soft gradient shading**, no outline strokes, one light from top-left. Shadows are a darker tint of the object's colour on the stage, never grey.
3. Sparkles (four-point stars, `yellow.300–400`) are the only flourish. No confetti, no motion lines, no drop shadows onto the page.
4. Pictograms: pink disc + magenta object + status dot. Nothing else in the disc.
5. Characters: exact uniforms, adult proportions, dignified. Skin tones vary.

**Reward layer (badges, tiers, coins, cards)**

1. Metallic 3D: hexagon or disc, star-and-laurel motif for badges, specular highlight top-left, darker rim, optional soft glow.
2. Metal colours are fixed per meaning (silver, gold, bronze, blue, purple, pink) — no new metals.
3. Nothing informational is ever rendered in this layer.

**Both layers**

- No text inside assets except a single numeral or letter that is the asset's identity (the `-50` card, the S/C/P badges). Words cannot be translated.
- Assets ship on the grid: 40 · 64 · 96 · 160 · 240 dp, detail simplified as size drops.
- No asset is *required* to understand a screen — the number, label and Phosphor icon beside it carry the meaning if the image fails (P1, P8).
- **Phosphor only for icons.** The source file contains at least one Streamline icon (`Time-Clock-Hand`). Icons inside assets are drawn shapes, not imported icon-set glyphs; standalone icons are Phosphor.

---

## Reference sheet

The six assets that define each layer. Kept as a locked frame named **Reference sheet** on the Assets page, exported to `references/asset-reference-sheet.png`.

Illustration layer: (1) cleaning scene — stage, shading, sparkle standard; (2) `calendar-✓` pictogram — disc/object/dot standard; (3) house-help portrait — face and uniform standard.
Reward layer: (4) gold star badge — the metallic standard; (5) Snabbit coin — disc rendering and glow; (6) red card `-50` — a flat object in the metallic layer.

### Style prompts (for AI generation)

Paste with the reference sheet image. Fill the `<>`. Generate ≥ 1024 px square; downscale to the grid. Reject and regenerate — never retouch — anything with outlines, a second light, grey shadows, text, or a hue outside the palette.

**Scene.** Flat vector illustration of `<objects>` on a pink tiled floor against a pink tiled wall, soft gradient shading, no outline strokes, single soft light from top-left, small four-point yellow sparkles, palette `<pink/purple/yellow hexes>`, centred, fills ~75% of a square canvas, no text. Match the reference sheet exactly in shading, palette and stage.

**Pictogram.** Flat vector pictogram of `<object>` in magenta (`#F70F79` with lighter `#F4368D` face), centred inside a pale pink circle (`#FDE4EF`), soft gradient shading, no outlines, `<optional: small green check / red cross badge at bottom-right>`, plain white background, no text.

**Character.** Semi-realistic flat vector illustration of an adult Indian woman, `<role uniform exactly as described in the Characters table>`, `<pose/action>`, calm confident expression, soft gradient shading, no outlines, plain background, no text. Dignified and competent.

**Reward.** Glossy metallic 3D `<hexagonal badge with star and laurel | disc coin | card>` in `<metal colour>`, strong specular highlight top-left, darker rim, soft glow, dark neutral background for preview, centred, no text except `<numeral/letter if any>`.

---

## Formats and performance (P8)

| Kind | Format | Rule |
| --- | --- | --- |
| Pictograms, faces, small scenes | SVG / vector drawable | Preferred; they are flat |
| Scenes, characters | WebP q80, transparent | Never PNG; 1× at largest used size, or 2× for ≤ 96 dp |
| Rewards | WebP q85 | Gloss needs the bits |
| Animated (earn moment, coin drop, celebration) | Lottie or Rive | ≤ 60 frames, ≤ 100 KB, ≤ 1.5 s (P6), still fallback at last frame |

Budget: ≤ 30 KB per still pictogram/face, ≤ 80 KB per scene or character, ≤ 100 KB per animation, ≤ 2 MB bundled total. Export names mirror registry names: `asset_picto_calendar_ok_64.svg`.

---

## Process for a new asset

1. Check the register — does the meaning exist? Use it.
2. Name the meaning in one sentence, and which layer it belongs to (informational → illustration; earned/lost → reward).
3. Make it from the reference sheet with the matching style prompt, or brief the designer with the same.
4. Check the style lock for its layer.
5. Register it, export at the grid sizes, place it on the Assets page.
6. Tier it like a component: one feature = local; third feature promotes it to shared.

---

## Migration and housekeeping

- Move everything from the *Snabbit Assets* file's two sections into the design-system file on an **Assets** page, organised by class. The assets file stays as the archive.
- Delete the outline and grey smiley sets. Mark `gold-coin` deprecated; new work uses `snabbit-coin`.
- Normalise the 258 × 258 attendance marks to the pictogram rule as their screens are specified.
- Replace the Streamline clock glyph with a drawn shape or Phosphor `clock`.
- Record `illustration.purple` and `illustration.yellow` hexes in `tokens.json` from the existing scenes.
- Lock the reference sheet before Coachmark and Empty state are specified — both depend on it.
