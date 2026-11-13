# Mobbin read — old hood vs new hood, with the change in pay and hours called out (2026-10-14)

| | |
| --- | --- |
| Asked by | Design lead, relaying feedback on 1.08 *Compare two hoods* and P4a *Confirm your move*: "show somehow that this is your old hood and this is your new hood; highlight price and hours — more → less and less → more, both ways" |
| Builds on | `reads/mobbin-compare-change/` (2026-10-08) and `reads/mobbin-confirm-hierarchy/` (2026-10-12) — not repeated here |
| Search | `search_screens`, standard, iOS: plan-change confirms with the price difference; before/after with struck old value and an arrow; schedule changes in worker apps (the last returned nothing worker-side) |
| Internal only | Not published, not traced |

## What was new this time

| App | Screen | What it does | Take |
| --- | --- | --- | --- |
| [KOHO](https://mobbin.com/screens/236cd102-4f18-4c21-a155-1a66961c4b4f) | Manage plan → downgrade | One tinted header card: **Everything → Essential**, then **$22.00 → $7.00/month** on the line under it; a two-step timeline *Today* / *March 25th* | The whole change in two lines, old → new, same size; the date as a step |
| [MacroFactor](https://mobbin.com/screens/4e13dfe2-c783-4569-be53-efecd1c9f433) | Edits to your goal | Each changed field is a row *180.5 lbs » 173 lbs*; a *Changed from* sub-row; unchanged fields say *No change* | Every field gets a verdict — changed or *No change* — so nothing has to be compared by eye |
| [Booking.com](https://mobbin.com/screens/fd073e8e-0f69-4bee-a494-f236f4f67705) | Modify your booking | *New time* tag (green) over *Old time* tag (grey, struck) | Labelled pair; the label carries *which is which*, not position |
| [Cash App](https://mobbin.com/screens/4d260ea2-b691-4506-9d78-631a4d266070) | Compare benefits | Table, columns *Current* | *Green*; the new column bold | Two columns of values, row by row |
| [Opal](https://mobbin.com/screens/aa59fc65-fff7-4fa0-8d67-32ede1ed2d85) | Before / After | Two panels side by side, the number big in each, the difference as the headline (*Gain 2+ hours back*) | The delta itself can be the headline |
| [Public](https://mobbin.com/screens/8cee7b0e-c9a7-45a5-953b-0f78adcb7859) · [Future Pro](https://mobbin.com/screens/bfc57e0b-844a-4412-a214-e7ead2acec10) | Change plan | The current plan muted or tagged *Current plan*; the new one is the live row | *Your hood now* as a tag on a muted card |

## Against the expert

- **Which is which must not depend on position or reading order.** Booking, Future Pro and Public all *name* the current one. So: a Tag *Your hood now* on the old, *New hood* on the new, plus a shape difference (muted fill vs white with the brand border) — two channels (P1).
- **A delta must be read, not computed.** MacroFactor and KOHO show old → new; she should not subtract ₹22,000 − ₹16,500 at the door. So the difference is spelled out once as a number with a direction: *₹5,500 less* / *₹2,000 more*, *2 hrs less a day* / *2 hrs more a day* (DECISIONS 2026-10-01 already uses these words).
- **Direction needs two channels** (`amount.md`: sign, colour and `arrow-up` / `arrow-down`). Colour is the open question — see the options note in `SCOPE.md`.
- **Unchanged is a verdict too** (MacroFactor *No change*): same hours → *Same hours*; same pay → *Same pay*. Otherwise she hunts for a difference that isn't there.
- **Not borrowed:** paywall feature tables (Insight Timer, Sweatcoin, Lifesum), green "new = good", red strike on the old value.
