# Reference read: comparing what you have now with what you'll have

- **Source:** Mobbin (iOS), searched 2026-10-08 for plan comparisons, rescheduling and "review changes" screens. Internal only; never published or traced.
- **Fed:** O5–O7 on Paper *Move overview · iterations* (`hood-shift-change`). The lead asked for more iterations, and for one based on O1 that is "a bit more visual and structured".

| File | App | What it does |
| --- | --- | --- |
| `01-acorns-highlighted-column.webp` | Acorns | The chosen column is a tinted band with its own coloured header tab; rows are grouped under section headers with an icon (*Money Manager*, *Investing*) |
| `02-speak-tinted-column.webp` | Speak | Two columns; the better one is a soft tinted band with rounded top corners; its header is coloured |
| `03-fixtured-column-band.webp` | Fixtured | The same band idea, with a header chip that sits above the table edge |
| `04-thefork-old-vs-new-booking.webp` | TheFork | *Your old reservation* as a grey pill, *Your new booking* as an outlined pill; every value on one line, side by side |
| `05-booking-new-old-tags.webp` | Booking.com | Each changed field has a *New* tag (green, bold) above an *Old* tag (grey, struck through) |
| `06-redfin-original-arrow-new.webp` | Redfin | *Original time*, then a big down arrow, then *New requested time*, centred and large |
| `07-upwork-current-vs-new-plan.webp` | Upwork | *Current plan* above *New plan*, plain labels, one card |

## 1. Name the idea

Three ideas recur across seven shipped apps:

- **A tinted band marks the column you're choosing**, and rows are grouped into a few named sections (Acorns, Speak, Fixtured).
- **The old value is tagged and struck through under the new one** (Booking.com, TheFork).
- **A single vertical "was → now" story** with a big arrow and large type (Redfin, Upwork).

## 2. Idea vs expression

| Borrowable | Their skin (stays) |
| --- | --- |
| A band behind the *New* column with a header tab that sits above the table edge | Gold, purple and dark-gradient paywall styling |
| Section headers with an icon that group rows: *Where · When · Money* | Ticks and crosses (features have yes/no; ours have values) |
| *New* and *Old* tags, with the old value struck through | Green "new" (green means *success* for her, P6) |
| A vertical original → arrow → new layout with large type | Marketing copy, testimonials, trial pricing |

## 3. Against the expert

| Failure | Fix |
| --- | --- |
| Ticks and crosses mean nothing for a value change | Values in the cells; the difference as a neutral grey Tag |
| Struck-through text is hard to read for a slow reader | The old value stays readable (`textTertiary`, no strike) in O5; O6 uses the strike only on the small *Was* line, never on the value she's deciding on |
| Green for *new* reads as "good" even when pay drops | *New* is brand pink, and the difference is neutral grey |
| Paywall-style tables run long | Three sections, two rows each, so it fits on one screen at 360 × 800 |

## 4. Tier

Tier 2: RateTable `matrix` with section rows (O5), ListItem rows with Tag (O6), Card + `arrow-right` (O7). No new component. The column band uses `bgBrandSubtle`, already the system's "this one" tint.

## 6. Differences, one sentence each

- The Acorns column band became `bgBrandSubtle`, with a `bgBrand` header tab reading *New · from 8 Oct*, because pink is her "this one" colour (P6).
- Feature ticks became values plus a grey difference Tag, because she is comparing amounts, not features.
- Booking's green *New* tag became brand pink, and the old value lost its strike in O5, because green means *paid / done* in this app.
- Redfin's centred stack kept its big arrow but carries only the three things that change most (place, time, pay), because large type costs room.
