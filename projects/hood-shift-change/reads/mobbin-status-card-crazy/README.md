# Reference read: a status card that is loud on purpose

- **Source:** Mobbin (iOS), searched 2026-10-13 after the lead sent the current *Status card · waitlist* set (`../status-card-lead-2026-10-13/`: gray-900 → red gradient, white text, white pill, hourglass silhouette bleeding bottom-right; a green twin for *Work is open*) and said: "I don't like it — even more crazy, doesn't have to be DS, but it should go well with the UI. Read references, make iterations, make it a component." Internal only; never published or traced.
- **Fed:** Paper *Hood & shift · Saathi* → page *Status card · crazy iterations* (`hood-shift-change`), `briefs/hood-shift-change-status-card.md`.

| File | App | What it does |
| --- | --- | --- |
| `01-lloyds-rewards-poster-blobs-sticker.webp` | Lloyds | One flat saturated green, big organic blobs in a lighter tint, a sticker-style object with a black outline, a serif headline, one black button — a **poster**, not a card |
| `02-cashapp-dollar-sunglasses-object-hero.webp` | Cash App | A familiar object (the dollar) given one twist (pixel sunglasses) fills the top of the card; the headline sits under it on plain ground |
| `03-public-treasury-isometric-deep-gradient.webp` | Public | Deep blue → black gradient with faint dotted guide lines; an isometric object floats with a glow; text at the bottom |
| `04-waymo-live-track-min-to-pickup.webp` | Waymo | Dark live card: *4 min to pick-up*, one line, then a **track** with the car moving along it — time as a shape, not digits |
| `05-bereal-countdown-dark-card.webp` | BeReal | Dark card, a huge countdown *1:03*, one line, one round action — the number is the hero |
| `06-corner-tilted-polaroids-sticker-badge.webp` | corner | Two tilted polaroid cards, a round sticker badge, a hand-drawn arrow with a note — **stickers on a table** |
| `07-rodeo-pill-tag-floating-object-did-it.webp` | Rodeo | A green pill tag over a floating mini-calendar object with a black *✓ Did it* sticker; eyebrow in red caps, giant *Do it* |
| `08-tolan-starry-gradient-character.webp` | Tolan | Night gradient with stars, the character on a horizon glow — **a scene**, the card is a window |
| `09-starling-pastel-tile-3d-cards.webp` | Starling | Soft pastel gradient tile holding one 3D object; text below on white |
| `10-opal-live-activity-timer-button.webp` | Opal | Dark live card: *0:14 · App Unblocked* and one wide button — two lines, one tap |

## 1. Name the idea

A status card is loud when **one thing is big** — an object (Cash App, Starling), a number (BeReal, Opal), a word (Rodeo), a scene (Tolan, Public) — and everything else is small and flat. The lead's current card has no hero: title, subtitle, pill and silhouette are all medium. "Crazy" is not more effects; it is one oversized element and a ground with a point of view (flat poster, deep gradient, sticker table, live track).

## 2. Idea vs expression

| Borrowable | Their skin (stays) |
| --- | --- |
| One oversized hero: object, number, word or track | Serif display faces (Lloyds, Tolan) |
| Flat saturated ground with blob shapes in a lighter tint (Lloyds) | Lloyds green, Cash App lime |
| Deep gradient + dotted guides + glow (Public) | Isometric finance cubes |
| Time as a track with a marker (Waymo) | Waymo blue |
| Sticker language: tilt, round stamp, outline (corner, Rodeo) | Photos, hand lettering |
| Eyebrow in caps + giant word (Rodeo) | Caps (our type rules say sentence case; the *size* is what travels) |
| Dark live card, two lines, one wide button (Opal, BeReal) | — |

## 3. Against the expert

| Failure | Fix |
| --- | --- |
| Serif and caps carry the mood (Lloyds, Tolan, Rodeo) | Outfit SemiBold at Heading1–Display carries it; no caps, no second family (P9) |
| Colour alone says the state (red = full, green = open) | The eyebrow word + the pictogram/stamp + the colour, three channels (P1, P6); greyscale check on every direction |
| Photos and 3D renders (corner, Starling, Cash App) | The registered illustration layer: the hourglass pictogram, flat, on its pink stage, or as a silhouette (`assets.md`) |
| Text on busy grounds (Tolan stars, Public grid) | Text sits on a plain band or a scrim; ≥ 4.5:1 measured (`accessibility.md`) |
| A countdown as digits only (BeReal, Opal) | Digits **and** a track or ring (P5) |
| A card that reads as a promo (Lloyds, Swiggy) | No exclamation, no confetti; the ask is the big line, the state is the eyebrow (lead's rule, 2026-10-12) |

## 4. Tier

Tier 3 → brief: **StatusCard** — a card with tone (`full` · `open` · `waiting`), an eyebrow (the state), a hero (the ask, or the hold as a number), one line, one pill Button, one picture slot (pictogram, stamp or track). Off-palette colour is allowed only as a proposed token; every iteration names its tokens.

## 6. Differences, one sentence each

- Lloyds' blobs stayed, in a lighter step of the same tone, because a flat poster ground reads from a metre away and in greyscale.
- Cash App's photographed object became the hourglass pictogram at 120 bleeding out of the card, because the picture must be ours and flat.
- Waymo's track became a three-stop track *Waiting · Open · Yours*, because her question is *where am I in this*, not *how many minutes*.
- BeReal's big digits became the Timer's digits with its ring, never digits alone (P5).
- corner's stickers became one round stamp *Full* / *Open* on a tilted ask ticket, because a stamp is a shape she knows from paper.
- Rodeo's caps eyebrow became a sentence-case pill, because our type never shouts.
