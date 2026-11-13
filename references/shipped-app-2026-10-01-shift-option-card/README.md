# Shift option card — shipped app, 2026-10-01

| | |
| --- | --- |
| Source | **The live Expert app.** Screenshots shared by the design lead in chat on 2026-10-01, who confirmed the same day that the card is live |
| Files | `1-single-shift.png` · `2-split-shift.png` |
| Feeds | `components/selection-card.md` § `rich` · shift option (the *What changes* row, the anatomy, the kept departures, the **In app** mark) |
| Asked by | `projects/hood-shift-change` (the six-step read is in `projects/hood-shift-change/reads/lead-shift-option-card/README.md`) |

This is shipped evidence, not a Mobbin read. It is what she uses today, so the spec is reconciled to the card, not the
card to the spec (`principles/EXTENDING.md` § *Reuse before you invent*). Internal only.

## What each shows

- **`1-single-shift.png`.** One option, selected, with one block of hours. It has a Radio, the hood *ST Bed Layout*, and
  the area *Koramangala* with a `map-pin`. Green *Earn upto ₹22,000* sits top right. Under a divider is a `clock` and
  *8 AM to 2 PM | 6 hrs*. Selected is a pink border on a white fill. The round *R* disc on the divider looks like a
  capture overlay, not part of the card.
- **`2-split-shift.png`.** The same card for a split day: *Wipro Park* · *Koramangala*, then `clock` *8 AM to 10 AM | 6
  hrs*, a dotted connector, a coffee cup with *Break*, another dotted connector, and `clock` *2 PM to 5 PM | 5 hrs*.
  The hour counts do not match their blocks (2 hrs and 3 hrs), and the break has no length.

## What the spec keeps and what it changes

The spec matches the card region by region: pay top right, the hood over area · km and `map-pin`, a divider, and the
day as a rail. It keeps four departures, and each one cites its reason in `selection-card.md`:

- pay is neutral, not green (P6)
- *up to* is spelt as two words
- times follow the `content.md` format
- hours add up, and the break shows its length (P9)
