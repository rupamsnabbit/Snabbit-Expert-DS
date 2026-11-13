# Reference read: a confirm sheet with one number

- **Source:** Mobbin (iOS), searched 2026-10-12 after the lead rejected five flat *now vs new* confirm sheets ("no hierarchy, everything is messed up — see Mobbin and rework"). Internal only; never published or traced.
- **Fed:** D1 / D2 on Paper *Confirm sheet · iterations (now vs new)* (`hood-shift-change`).

| File | App | What it does |
| --- | --- | --- |
| `01-doordash-dasher-delivery-completed.webp` | DoorDash Dasher | Sheet: caption *Delivery Completed*, then **one big figure** `$15.40`, then a small breakdown, then a *Total* line with the old figure struck beside the new, one line of explanation, one button |
| `02-hellofresh-delivery-change-confirm.webp` | HelloFresh | Sheet: one icon, one caption *This delivery will be now on*, the **new value large** `15, AUG FRI, 8 AM – 8 PM`, two buttons. Nothing else |
| `03-indrive-request-sent-price-chips.webp` | inDrive | Price large, then the facts as small chips underneath (*Pickup: up to 1 hour*, *Small Truck*) |
| `04-linkedin-old-price-struck-inline.webp` | LinkedIn | Old price struck small, inline, immediately before the new price; the new price carries the weight |
| `05-public-change-billing-plan-current-muted.webp` | Public | *Current plan* is a muted, disabled row; the new plan is the only live row |

## 1. Name the idea

All five do the same thing: **one figure carries the sheet**, the rest is small and equal. The old value is never a second hero — it is struck small beside the new (DoorDash, LinkedIn) or muted below it (Public). Facts sit under the figure at one size, one per line. One button.

## 2. Idea vs expression

| Borrowable | Their skin (stays) |
| --- | --- |
| One large figure with a short caption above it | Red/blue/green brand colour on the figure |
| Old value struck small, inline, beside the new | Marketing phrasing (*Save 25%*) |
| Facts as a short list of equal rows under the figure | Chips with coloured fills (inDrive) |
| The current state as one muted line | Disabled-button styling for *current* |

## 3. Against the expert

| Failure | Fix |
| --- | --- |
| Five sheets each with three or four competing emphases (tags, bands, tiles, two headings) | One hero: the pay, at Display size (P1: the primary figure is Heading2 or bigger). Everything else BodyLg or smaller |
| Tags on every row | One Tag only, on the drop, and only when pay drops |
| The old state as a card or column of equal weight | One Caption line, `textTertiary`, under the facts |
| Map that says *where* but not *what changes* | Dropped; the place row carries the distance |

## 4. Tier

Tier 2: BottomSheet `confirm` with Amount `L` as the hero, three ListItem rows, Caption lines, Saathi dock, one Button. No new component.

## 6. Differences, one sentence each

- DoorDash's breakdown rows became three facts (place, time, start day) because she is confirming a shift, not an invoice.
- LinkedIn's struck old price kept its inline position but went `textTertiary` BodyLg, because a slow reader must still read the new figure first.
- HelloFresh's two buttons became one Button plus the ✕, because the sheet is a safe confirm (`bottom-sheet.md`).
- inDrive's coloured chips became plain rows with a grey icon, because colour means status here (P6).
