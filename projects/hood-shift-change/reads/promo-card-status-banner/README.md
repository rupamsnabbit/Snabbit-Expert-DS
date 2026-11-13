# Reference read — promo card → status card (2026-10-12)

**Reference.** A courier app's *Promos & Offers* list (`reference-promos-and-offers.webp`, source unknown, shared by the lead). **Ours before:** the waitlist banner on 1.07 (`ours-before-waitlist-banner.png`).

## 1 · What the reference does
One card per offer, full width, flat saturated colour with a soft diagonal sheen. Four things in a fixed order: eyebrow (*Up to*), one big line (*25% OFF*), one description (*Package discount coupon*), one white pill (the code, with a copy icon). A large translucent pictogram of the card's meaning (percent tag, parcel) sits at the right edge, bleeding off, clipped by the card. Colour changes per card; the layout never does.

## 2 · Why it works
The big line is the only thing you read; everything else is support. The pictogram says the kind of offer before the words do (P1). One pill, one action. The bleed makes the card feel like an object, not a strip.

## 3 · What we take (structure)
Eyebrow → big line → description → pill; pictogram at the right edge, translucent, clipped; sheen on a flat colour; one card height and one layout for every state.

## 4 · What we leave (expression)
Their orange / green / navy / forest colours, the ticket perforation, the copy icon, the code pill as content. A status card is not a coupon.

## 5 · Tier
**Tier 2 composition** of core: `Banner` anatomy (pictogram · title · line · action) re-expressed as a card. The pictogram is the existing hourglass placeholder (`foundations/assets.md` — informational, flat). If this card graduates, it is a *Banner* variant `card`, not a new component.

## 6 · Reference ↔ translation
| Reference | Ours |
| --- | --- |
| Flat brand colour per offer | `bgBrand` (pink-600) for every waitlist state — one colour, one meaning (P6) |
| Soft diagonal sheen | White linear gradient 32 % → 0 → 12 %, over the fill |
| Eyebrow *Up to* | Eyebrow Body-S `white 80 %`: *Waiting for* / *Your time* / *Anita's timing* / *Anita's area* |
| Big line *25 % OFF* | Heading2 white: *HSR* / *Not available* / *Full* |
| Description | Body-S `white 85 %`: the old second line |
| White pill with code | White pill with the action, Body-M semibold `textBrand`: *Leave waitlist* / *Join waitlist* |
| Percent tag bleeding right | Hourglass pictogram ×4.2, white 22 %, bleeding right and bottom, clipped |
| Radius ~16, no shadow | `radius-16`, no shadow |
| Different colour per card | Same colour on all four |

**Copy added:** *We'll tell you when it opens* on *Anita's area is full* (the old banner had one line only). To be confirmed.
