# AudioSphere card carousel → Place · Time · Expert ID cards (2026-10-12)

Source: a Dribbble-style concept shot ("AudioSphere") shared by the lead. It never shipped, so it is a mood source
(`EXTENDING.md` § Where inspiration comes from): structure and motion may be borrowed, nothing else.

1. **What it is.** It is a dark podcast picker. One big upright card sits in the centre, with two smaller cards tilted outward and bleeding off the screen edges. A gradient orb with a progress arc sits below.
2. **What it does well.** It shows one thing at a time and makes it the hero, while the neighbours stay visible. The ring order says "there are more, and you move through them".
3. **What we take.** The fan: the hero card is upright and centred; the side cards are smaller, tilted ±8° with their outer edges lower, and bleed off the 360 width. The ring order is Place → Time → Expert ID, so the lit card is always in the centre. The three overlapping watermark circles are kept on the lit card.
4. **Tier.** Local (Tier 1) to `hood-shift-change`. It replaces the satellite arc on V2 N2, N3, N4 and F3 ×3. If a second flow wants a "what to say" carousel, write a brief.
5. **What we do not take.** We do not take the dark background (light mode only), the red, lime or violet cards (P6: colour is a language, pink means *this one*), the condensed display face (Outfit only), or the cyan–violet orb. The orb was not asked for this pass.
6. **Side by side.** `reference.png` → `translation-figma-v2.png`. The differences, one sentence each:
   - The lit card is `Pink/color-primary-600` with `-500` circles, and the side cards are `-100`, because brand pink is the only "this one" colour.
   - The neutral states (N4, F3) use white cards with `Secondary Stroke`, because nothing is lit while she records.
   - The card titles are the field (H3/20, Body-M/16 Semibold) and the subtitle is what she might say ("सुबह 9 से 5"). The reference's author line is gone.
   - The icons are Phosphor regular `map-pin`, `clock` and `users-three`, already registered with these meanings.
   - The radius is `radius-24` on the hero and `radius-20` on the sides, the padding is `Base (16px)`, and there is no shadow.

The old satellites are still in each frame, hidden and named `old · Satellite …`. Delete the card fan and unhide them to go back.

## Variations · colour per card (2026-10-12)

The lead asked to try the reference's colour-per-card idea, accepting that it is off-DS. Two frames sit above N2 in V2:

- **A** gives every card its own saturated colour.
- **B** gives only the lit card its colour; the side cards are pale tints.

Both add pictures and a gradient on the lit card. Lime (`#D4F25C` family) and violet (`#C48AF0` family) are raw hex and have no tokens.
