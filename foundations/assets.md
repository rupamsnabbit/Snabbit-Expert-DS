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

## Pictures are the instruction

On a task screen an illustration is not decoration above the words; it **is** the instruction, and the words confirm it (P1 · *Text is the last medium*). A scene that shows a good setup replaces *put everything in one place*; a scene that shows her greeting at the door replaces a paragraph about arriving. So a scene on a task screen is briefed as an instruction:

- **It shows the right outcome**, not the idea of the task: the products laid out on a towel, not a woman thinking about products.
- **It carries the rules** that would otherwise be a caption: what is in frame and what is not, where the phone is held, which way the thing faces.
- **The line under it is one line** — often a Tag or a band on the scene's own card (*Say Namaste*) — and it names the action or the moment, never re-describes the picture.
- **A placeholder names what the picture must show** (*scene: kit laid out on a towel, only her things in frame*) and the copy beside it is written as if the picture were there. Text is never added to make up for an illustration that has not been drawn yet.

---

## Classes and their register

Names are `asset/<class>/<name>`. One asset, one meaning. Before making one, look here; if the meaning exists, use it. If not, add the row in the same change.

### 1. Scenes — `asset/scene/*`

Square, pink-tiled floor and wall as the stage, one or two objects, sparkles. Existing: cleaning (bucket, mop), bathroom (toilet), kitchen-clean (spray, cloth), laundry (basket, iron), dishes (rack, plates), cooking (vegetables, board), shelves (books, plant), fridge, magic (wand, star). Sizes 96 · 160 · 240 dp. WebP.

Used for: service categories, empty states, onboarding, the Permission sheet. New scenes needed: permission-camera, permission-location, permission-contacts, permission-notifications, payout-success. (Empty and error states use **pictograms**, not scenes — see `components/empty-state.md`; new pictograms needed: `calendar` without a dot, `tray`.)

### 2. Pictograms — `asset/picto/*`

The middle class between a Phosphor icon and a scene. A **pink disc** (`pink.100`), a **magenta object** (`pink.500–600` with a lighter face), and an optional **status dot** bottom-right — green check (`green.500`) or red cross (`red.500`). Sizes 40 · 64 dp. SVG preferred.

Existing (~30): cash-in-hand, ok-hand, calendar-✓, calendar-✗, door-enter, door-exit (several), profile-blocked, phone-location, megaphone (two), alarm-✓, document-not-eligible, document-eligible, expert-with-tablet, search-document-✗, search-document-✓, id-card-✗, id-card-✓, id-back-✓, bank-✗, phone-✗, route, timer, phone-map-✓, wallet-coins.

Proposed: `asset/picto/shield` — the Snabbit Shield (Kavach) mark, **Kavach blue** (feature colour, see `DESIGN_TOKENS.md` § feature colours), 32 / 96 dp — the one pictogram that is not pink, because a pink shield would read as a promotion and the safety promise must look like nothing else in the app. Decision pending (`shield-card.md`).

Rule: the object says *what*, the dot says *status*. A pictogram without a dot is neutral. Never colour the object itself green or red — status is only ever the dot, so the same object can carry both outcomes.

**Health cover — 12 new pictograms (2026-09-09, `patterns/insurance.md`).** Illustration layer, 40 · 64 dp, 120 dp for the two hero uses; SVG.

| Asset | Meaning | Notes |
| --- | --- | --- |
| `asset/picto/family` | The health cover itself; her family on it | Hero on the cover screen and the confirmation (with a green ✓ dot); 40 dp in the Home card and the benefit row |
| `asset/picto/hospital-bed` | Hospital bills are covered | |
| `asset/picto/spouse` | Husband or wife | A pair; the only relationship pictogram showing two figures |
| `asset/picto/mother` · `asset/picto/father` | Her mother · her father | |
| `asset/picto/brother` · `asset/picto/sister` | Her brother · her sister | |
| `asset/picto/mother-in-law` · `asset/picto/father-in-law` | Her husband's mother · father | **Weak by nature** — indistinguishable from `mother` / `father` at a glance. The `labelled` Divider heading and the voice carry them; watch this row in field testing |
| `asset/picto/child` | Her son or daughter, gender not yet known | The relationship option |
| `asset/picto/boy` · `asset/picto/girl` | A son · a daughter on the cover | The child gender choice; the words on screen are *Boy* and *Girl*, never *Male* / *Female* |

*Cashless* needs no new asset: the existing `cash-in-hand` object takes a **red ✗ dot** and reads as *you pay nothing*. This is the register's own rule working as intended — one object, both outcomes, status only in the dot.

**Kit and refill — 4 new pictograms (2026-09-12, `projects/beauty-shift-lifecycle`).** Illustration layer, 40 · 64 dp, 96 dp for the two hero uses; SVG.

| Asset | Meaning | Notes |
| --- | --- | --- |
| `asset/picto/bag` | Her kit bag — the whole thing she carries | Hero (96 dp) on the bag-check intro and the morning bag-status sheet. Takes a **green ✓ dot** when last night's check was clean and a **red ✗ dot** when something was flagged — one object, both outcomes, exactly as the register's rule intends |
| `asset/picto/pouch` | One service pouch inside the bag | 40 dp beside pouch rows; the Phosphor `tote` icon carries the same meaning at icon scale, and the two must not both appear in one row |
| `asset/picto/box` | A refill order — the parcel that arrives on her week off | Home refill card and the ledger; ✓ dot once received |
| `asset/picto/rest-day` | Her week off | The attendance card. Warm and restful, never a crossed-out calendar — a mandatory day off is a good thing, not an absence (P6). Distinct from `calendar-✗`, which means *not available* |

**Product images are not design-system assets.** The 40–50 items in her kit (facial kits, wax strips, rose water) are **catalogue content**, owned by the Category/Catalog team alongside the pouch master list, and delivered as product images with the item data. They are never drawn as pictograms and never registered here — a register with fifty consumables in it stops being a register. The four assets above are the *structure* (bag, pouch, order, rest day); the contents are data.

### 3. Characters — `asset/character/*`

Semi-realistic flat vector, adult proportions, calm confident expressions, brown skin tones varied across scenes. Uniforms identify the role and are exact:

| Role | Uniform | Existing poses |
| --- | --- | --- |
| House help (expert) | Pink tunic with black trim, black trousers, hair in a bun | Namaste (full), portrait |
| Cook (expert) | Pink chef shirt, black trousers | Man full, woman full |
| Trainer | White polo, white cap, tablet | Half-body with tablet |

Scene compositions exist: meeting a customer, hand-washing, selfie, showing ID (18+), reviewing tasks on phone, high-five, portrait-✓ / portrait-✗. Sizes 96 · 160 · 240 · full-screen. WebP.

Rule (P-persona): the expert is always competent and dignified — working, greeting, celebrating, learning. Never confused, scolded, or the butt of a joke. Distress appears only as *concern* in safety contexts, and the trainer or support is always in frame with her.

**Referral — 1 new scene (2026-09-24, `components/promo-card.md`).** Illustration layer, 96 · 160 dp; WebP.

| Asset | Meaning | Notes |
| --- | --- | --- |
| `asset/character/referral-handover` | She brings a friend to Snabbit | Two women: the expert in uniform handing a Snabbit box to a friend in plain clothes; both smiling, adult proportions. The *Expert (Sahil)* sheet draws it six times with amounts painted in (*KAMAO 15,000*) — the amount is text on the card, never in the art. The only asset for referral; the cash bundle and money bag on the same sheet are **not** registered (currency belongs to the reward layer, and the amount is an `Amount`) |

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
| `asset/reward/spin-wheel` | A free spin — a chance at coins | Metallic wheel, pink and gold segments, pointer at top. Day detail sheet for a spin day and for a spin with no win (at 40 % opacity). From *Expert (Sahil)* `8510:23259`, 2026-09-24 |
| `asset/reward/utsav-bonus` | **Proposed** — a festival bonus | Open (`references/expert-sahil-rewards-2026-09-24/` § Open 1–2): the sheet uses a *UTSAV BONUS* wordmark and a Ganesh idol. Words cannot be in assets, and the register has no rule on religious imagery. Proposal: a metallic disc with a diya motif for the bonus (reward layer), the festival named in text; a generic festive scene (`asset/scene/festival` — diya, marigold, sparkles) for the day card. Needs the design lead's yes before anything is drawn |
| — prize photos (fridge, phone, TV, gold coin…) | **Not assets.** Contest prizes are campaign content | Supplied by Growth per contest, transparent ground, 160 dp, placed in the PromoCard media slot. Same rule as kit products: the register holds meanings, not merchandise |
| `asset/reward/rank-1` · `rank-2` · `rank-3` | First, second, third place in a contest | Metallic medals — gold, silver, bronze discs with the numeral as their identity (the one numeral allowed). 24 dp in a ListItem `rank` leading, 40 in a Nudge, 64 on the podium. Rank is the reward layer's domain (*if it shines, it's about what I earned*). From the proposed Refer tab, 2026-09-24 |
| `asset/reward/podium` | The contest's three places, as one stage | Three metallic blocks — silver left, gold centre and tallest, bronze right — each carrying its medal. 328 × 64 dp, the prize photos (campaign content) sit on it. One asset, so every contest looks like the same contest |

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
