# Reference read: the offer that arrives — a sheet, not a page

- **Source:** Mobbin (iOS), searched 2026-10-13 after the lead asked why the *work opened* moment was a full page: "it can come in the app too — make it a bottom sheet, explore more, read Mobbin". Internal only; never published or traced.
- **Fed:** Paper *Hood & shift · Saathi* → page *WA · the offer as a sheet · directions* (`hood-shift-change`), `BUILD.md` § WA sheet.

| File | App | What it does |
| --- | --- | --- |
| `01-luma-invite-accept-decline.webp` | Luma | An invite arrives as a sheet over whatever she was doing: logo, one line *X invited you*, the time, **Accept** / Decline. The page under it is untouched |
| `02-cashapp-offer-facts-open-remove.webp` | Cash App | Offer sheet: logo, title, **four equal fact rows with a grey icon each** (valid for, max, expires, where), then two stacked buttons |
| `03-sweatcoin-youre-in-two-buttons.webp` | Sweatcoin | Check disc, eyebrow *You're in!*, one headline, one line, primary + *Maybe next time* |
| `04-noom-plan-reserved-expires-in.webp` | Noom | *Your plan has been saved for the next 15 minutes* with a live **Expires in 14:59** — a hold window said as a number |
| `05-glovo-prime-keep-or-cancel.webp` | Glovo | Pictogram, headline with the number in it, one consequence line, keep (primary) above cancel |
| `06-posh-waitlist-offer-next-in-line.webp` | Posh | The organiser's side of a waitlist: *we'll alert people to claim; if they decline it goes to the next person in line* — the rule behind the offer |
| `07-swiggy-ending-ring-around-pictogram.webp` | Swiggy | A sheet whose only picture is the pictogram inside a **draining ring** — time as a shape, no digits |
| `08-doordash-live-activity-min-left.webp` | DoorDash | Lock-screen card: one line of what, one line of when, *4:17 min left* — the offer survives outside the app |

## 1. Name the idea

The thing she waited for has arrived; it interrupts her wherever she is, says the one fact that matters, and gives one tap to take it. Every reference does it as a **sheet over the current screen**, never a new page: the page is where she was, the sheet is the news. A hold window, when there is one, is shown as a live number or a ring (Noom, Swiggy), and the rule "decline and it goes to the next person" is what makes the window honest (Posh).

## 2. Idea vs expression

| Borrowable | Their skin (stays) |
| --- | --- |
| A sheet, dismissible, over whatever she was doing; the page under it does not change | Luma's dark glass, Sweatcoin's purple |
| Pictogram or disc, headline, the facts, one primary | Green accept / grey decline pairs |
| Facts as equal rows with a grey icon (Cash App) | Cash App's black button |
| The hold window as a live countdown (Noom) or a ring around the pictogram (Swiggy) | Noom's teal band, caps labels |
| *Maybe next time* as the quiet exit | Marketing lines (*You're in!*) |

## 3. Against the expert

| Failure | Fix |
| --- | --- |
| Luma / Sweatcoin carry the meaning in two lines of text | The hourglass-✓ pictogram and Saathi's spoken line carry it; the title confirms (P1, P4) |
| Cash App's four rows are all the same weight — nothing to decide on | ≤ 3 rows, and in one direction the pay is the one hero (one-hero rule, 2026-10-12) |
| Noom's countdown is digits only, in caps | Timer M: ring + digits + label in sentence case, tone computed (`timer.md`) |
| Decline sits beside accept (Luma) | ✕ is the way out; taking the work is one tap, declining is not protected because nothing is lost (P3) |
| Dark sheets, small text | `bgPrimary` sheet, Heading3 title, BodyLg facts, 56 dp Button |

## 4. Tier

Tier 2: BottomSheet `info` (dismissible, hero 96–120, one `primary`) with the shipped shift card, Amount, ListItem rows, Timer M and the Saathi dock. No new component. The sheet opens over **whatever screen she is on** — Home, the areas list, a job — so it is the same surface whether she comes from WhatsApp, a push or is already in the app.

## 6. Differences, one sentence each

- Luma's logo became the hourglass-✓ pictogram because the picture must say *the wait is over* without reading (P1).
- Cash App's four rows became the shipped shift card or three rows, because she already knows the facts she asked for and only needs them confirmed.
- Noom's *Expires in 14:59* became a Timer M `countdown` with the label *Yours for*, because a time you can run out of is a draining shape, never digits alone (P5).
- Swiggy's ring was kept as the alternative to the Timer pill when the window is long (hours), because a ring on the pictogram says *held* without a number to read.
- Luma's Decline became the ✕ because declining loses nothing here (the slot goes to the next in line), so it needs no second Button (P2, P3).
