# Mobbin read: confirm sheets (place, pay, one button)

| | |
| --- | --- |
| Asked by | Design lead, Paper comments on *Voice final* 1.08 and H1 (2026-10-07): "this can be simplified, just too much text, show only whats necessary, bottom sheet height can be more, explore on mobbin" |
| Captured | 2026-10-07 · iOS · Mobbin MCP (`search_screens`, `search_flows`) |
| Fed | 1.08 · Move here? and H1 (the same sheet) on Paper *Voice final*; `BUILD.md` § *Lead's review, 2026-10-07* |
| Status | Internal reference. Never published, never traced. The `.webp` files are Mobbin's low-res previews, kept for side-by-side review only |

## What was read

| # | App | Screen | Mobbin | What it does |
| --- | --- | --- | --- | --- |
| 01 | DoorDash Dasher (worker side) | Offer card | https://mobbin.com/screens/61830cf9-fba8-4c86-a85f-5b84b20fcc54 | Map in the top half. Then one big amount (*$11.50 Guaranteed*), two short facts (distance, deliver by), a few icon lines, and one full-width *Accept* |
| 02 | DoorDash Dasher (worker side) | Dash summary sheet | https://mobbin.com/screens/ad3159d1-75e2-4cc5-8816-3d19bff9aad1 | The zone map stays visible above a tall sheet. The total is the biggest thing; one *Done* |
| 03 | Swiggy | Confirm location | https://mobbin.com/screens/7efdc60f-1c93-41b3-a16f-df71ae131e52 | Map with the pin is the hero. The sheet holds the place name (bold) and one *Confirm & proceed* |
| 04 | Shake Shack | Confirm place | https://mobbin.com/screens/2b746ac4-17bb-4899-94dd-9f9f08a46a25 | Map, then the place name large, one time fact with an icon, one button |
| 05 | Uber | Your reserved ride | https://mobbin.com/screens/2168021b-5519-4d71-97fe-0cd378e133e4 | A picture fills the top; the sheet below is a short list of icon + fact rows |
| 06 | Public | Change billing plan sheet | https://mobbin.com/screens/8cee7b0e-c9a7-45a5-953b-0f78adcb7859 | Switching plans: the two prices side by side, current one marked; *Keep current plan* as the quiet way out |

Also skimmed and not used: Future Pro, Beside, Atoms, AllTrails, Perplexity, Manus. They are paywalls that sell with feature tables, which is the opposite of what she needs. Jobber, Best Buy, Deliveroo and Booking.com were not used either: they are pickers, not confirms.

## The six-step read

**1. The idea.** When someone confirms a *place*, the shipped apps show the place as a picture first: a map takes the top of a tall sheet (DoorDash, Swiggy, Shake Shack). Then they show one big number, the money (DoorDash), and only one or two short facts. One button ends it. Three apps do this, so it is convention. She may know it already from Swiggy or a delivery app.

**2. Idea vs. skin.**

- **Borrowable:** the order (map, then name, then the big amount, then two short facts, then one button). A taller sheet, so the map has room. Facts as short icon-led pieces, not sentences. Old and new price shown side by side (Public).
- **Their skin, not borrowed:** DoorDash red, Swiggy orange, Uber black. Their type, pins and map tiles. *Guaranteed (incl. tips)*. The countdown on *Accept*.

**3. Against the expert.**

- **Text-dense.** The old sheet had a two-line title, a hero amount, a *less than now* line and three sentence-like rows. *Fix:* the map says where; the numbers say the money; time and start day become two Tags; the lock becomes one quiet line.
- **The drop must be seen** (the meeting's rule). A single amount with a *less* caption is a line she has to read. *Fix:* show what she has → what she'll have: *₹22,000 → ₹16,500*. This uses `arrow-right`, registered for exactly this. The old amount is grey and not red, because she chooses the drop (P6). The spoken line on open says the difference out loud (P4).
- **Maps assume she can read a map.** *Fix:* the map is a picture of a region, not a tool. It has one area shape and the name on a pill, and it is static, so there is nothing to pan or tap. It works with images blocked, because the name and the button say the same thing (P8).
- **A countdown on the button** (DoorDash) would be pressure on a decision that is not time-critical. *Not borrowed.*

**4. Tier.** Tier 2, a composition. BottomSheet `confirm` · safe (✕ + one primary), MapSnippet 240 with MapMarker `area`, Amount, Tag L neutral soft ×2, one icon line and Button primary L. Every part is core. No ask of core.

**5. Translation.**

- **Sheet:** `bgPrimary`, top radius `radius.xl`, padding `spacing.3` top / `spacing.5` sides / `spacing.6` bottom, gap `spacing.4`. About two thirds of the screen (it was under half). Scrim `bgInverse` 60 % over 1.07 *Work close by*, which is the screen she tapped from.
- **Title row:** *Move here?* in Heading3, IconButton `speaker-high` (speaks on open) and IconButton `x`. *Here* points at the map below, so the place name is not said twice.
- **MapSnippet 240** (`components/map-marker.md`), radius `lg`, muted map placeholder. MapMarker `area`: `bgBrandSubtle` @ 40 %, 2 dp `borderBrand`, name on a `bgPrimary` pill (*Koramangala 6th Block*).
- **Pay:** *₹22,000* in Title, `textSecondary`, then `arrow-right` 20 in `textSecondary`, then *₹16,500* in Display SemiBold `textPrimary` + *a month* in BodyLg `textSecondary`. It is never red and never green.
- **Facts:** Tag L neutral soft (`bgTertiary`, `textBody`, BodyMd Medium, icon 16, radius `sm`): `clock` *10 AM – 4 PM · 6 hrs* and `calendar-blank` *From Thu 8 Oct*.
- **Lock:** `lock-simple` 16 + *Next change from 7 Nov*, BodyMd `textSecondary`.
- **Button:** primary brand L, *Move to Koramangala*.

**6. Side by side: every difference, one sentence each.**

- The map comes first, because three of the apps put the place picture first, and a picture is read before a word (P1).
- The title went from *Move to Koramangala 6th Block?* (two lines) to *Move here?*, because the map's pill names the area and the button names it again.
- *₹5,500 less than now* became *₹22,000 → ₹16,500*. She now *sees* the drop as two numbers instead of reading a sentence (P1, the meeting's rule), and the spoken line still says it.
- The three fact rows became two Tags and one quiet line. Time and start day are data she checks. The 30-day lock is a consequence she should notice but not stop at.
- The sheet is taller (about 525 of 800, was about 380), because the lead asked for it and the map needs the room. It stays under the 90 % cap in `bottom-sheet.md`.
- There is no countdown and no *Guaranteed*: the change is not time-critical, and pay *up to* is not a guarantee.
- The backdrop is now 1.07 *Work close by*, the screen she tapped the card on. It was the older V4 results.

## Open for the lead

- **Is *Move here?* enough of a title?** It relies on the map. If the map tile fails to load, only the pill name, the button and the spoken line carry the place. They do, but the lead should confirm.
- **Should the old amount carry a word (*Now*)?** It was left out to cut text. The arrow's registered meaning and the spoken line carry it.
