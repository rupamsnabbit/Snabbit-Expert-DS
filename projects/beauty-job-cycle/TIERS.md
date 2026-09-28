# Tiers — Job Lifecycle · Beauty Category

Every surface the PRD asks for, placed in a tier per `principles/EXTENDING.md` **before anything is drawn**.

**The axis for this project is different from `beauty-shift-lifecycle`.** There, a *New* PRD row was designed from
first principles. Here the stakeholder's instruction (2026-09-15) is to **keep the shipped structure and put Beauty
content inside it**. So the column below is not *invent / inherit* but **how much of the shipped frame survives**:

- **match** — the shipped frame, unchanged but for banned copy
- **fill** — the shipped frame's structure, with Beauty content added into it
- **new state** — a state the shipped screen does not have, drawn in that screen's own anatomy
- **new** — a surface with no shipped equivalent

| # | Surface (PRD's words) | § | Tier | Treatment | Shipped frame | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1 | New job alert · **ACCEPT IN** countdown | 1 | 2 | match | `2:6955` `15:12524` | exists |
| 1.2 | Acceptance card — *"services booked and the products/quantities needed"* | 1 | 2 | **fill** | `2:6955`, `Bottom check-in / Acceptance screen` ×28 | exists |
| 1.3 | Earnings on acceptance, *"computed from the services booked"* | 1 | 2 | fill | `Metric Card` ×50 | exists |
| 2.1 | Deny — long-distance / last-hour only | 2 | 2 | match | `14:11083` `98:36570` | exists |
| 2.2 | Denial reasons, *"few could be added based on category"* | 2 | 2 | match | **none on the board** | **blocked — Q11** |
| 2.3 | Deallocation by ops/system | 2 | — | match | not a screen | exists |
| 3.1 | Check-in screen + *"services and products/inventory needed for this job"* | 3 | 2 | **fill** | `4:8915` `4:9038` `4:9194` | exists |
| 3.2 | Delayed check-in · **RUNNING LATE** | 3 | 2 | match | `2:6823` `4:9621` | exists |
| 3.3 | **Enter OTP to start job** | 3 | 2 | match | `4:9621` `4:9885` | exists |
| 3.4 | **No OTP** fallback · *Use OTP instead* | 3 | 2 | match | `4:10055` | exists |
| 3.5 | Reach job location · **CHECK IN BY** | 3 | 2 | match | `16:14340` | exists |
| 4.1 | ~~**Buffer running**~~ — **dropped 2026-09-24**, replaced by 4.1b — *"before the service timer starts… take out tools and set up"* | 4 | 2 | **new state** | `10:8552` anatomy | **needs core change** |
| 4.2 | ~~Buffer ends → service timer starts~~ — dropped 2026-09-24 | 4 | 2 | new state | `10:8552` | needs core change |
| 4.1b | **Set up, then a photo of the setup → Job started** (stakeholder, 2026-09-24; replaces the buffer) | 4 | 2 | **new state** | `check-in-out.md` § 2 Job started sheet · `media-capture.md` `preview` `scene` | exists — composed from core, no core change |
| 4.3 | Job In Progress · TIME LEFT · Kavach · Complete Job | 4 | 2 | match | `6:8405` `10:9397` | exists |
| 4.4 | *"keeps showing the services booked and the products/inventory needed… at any point"* | 4 | 2 | **fill** | `6:8405` (h1268 — the tall scrolling variant) | exists |
| 4.5 | Extension as addon — visibility *"at both time and service level"* | 4 | 2 | fill | status line only, `9:8300` | exists (see Q2) |
| 5.1 | **Complete Job** → **Enter OTP to end job** | 5 | 2 | match | `10:13110` `10:13325` | exists |
| 5.2 | Auto checkout at +30 min | 5 | 2 | new state | none — logic change | **needs a surface — Q6** |
| 6.1 | **Products you used** — read-only, grouped by service, count per service, each at usual | 6 | 2 | **new** | none. *What have you done* is **not on the board** | **new** |
| 6.2 | **Yes, used as expected** → deduct at usual | 6 | 2 | new | none | new |
| 6.3 | **Something was different** → editable list | 6 | 2 | new | none | new |
| 6.4 | **+/− stepper**, *"+1 pcs vs usual 1"* | 6 | **core** | new | none | **needs core change** |
| 6.5 | Reason: *client needed more · spilled/wasted · product ran out · client asked less* | 6 | **core** | new | none | **needs core change** |
| 6.6 | **Save what I used** → live inventory updates | 6 | 2 | new | none | new |
| 7.1 | **Rate the customer** | 7 | 2 | match | `12:9750` `13:10601`, `Rating` ×6 | exists |
| 7.2 | **Block Customer?** sheet | 7 | 2 | match | `13:10601` | exists |
| 7.3 | Block cap — *"Unblock someone to block Radhika S"* | 7 | 2 | match | `13:11931` `13:12234` | exists (see Q13) |
| 8.1 | **Job Completed · You Earned**, base fare + addons | 8 | 2 | match | `11:18791` `13:11607` | exists |
| 8.2 | **Ready for next job** | 8 | 2 | match | `11:18791` | exists |

## Count

**28 surfaces.** 17 match · 5 fill · 3 new state · 6 new (all § 6). **No Tier 0. No Tier 3** — § 6's controls are
proposed as *core changes* rather than local ones, because a quantity stepper and an exactly-one reason picker are
general controls the system lacks, not Beauty-specific inventions.

## Asks of core

Copied to `SCOPE.md` → *Asks of core*. None is solved privately inside this folder.

| Ask | Kind | Why this PRD needs it | Where it lands |
| --- | --- | --- | --- |
| **Quantity stepper** — `−  2  +` with a delta against a reference | component (new) | 6.4. Nothing in core increments a number: `stepper.md` is a *process* stepper, `numeric-keypad.md` is the money surface, `list-item.md` `quantity` **displays** a count but cannot edit one. | `components/quantity-stepper.md` + brief |
| **Timer `buffer` mode** — a countdown before the timed thing starts | component change | 4.1 / 4.2. `timer.md` counts the work; this counts the setup, and must read as *not yet started* rather than *running out*. | `components/timer.md` |
| **Exactly-one reason picker** | component change | 6.5. `chip.md` `choice` is explicitly *zero or more*; its own spec says exactly-one "is Radio". Four short reasons in a sheet is neither cleanly. | `components/chip.md` or `selection-controls.md` |
| **Auto-checkout notice** | pattern | 5.2. She is checked out by the system 30 min past end; she must find out, and § 6 still has to happen. | `patterns/check-in-out.md` |
| Vocabulary: *buffer*, *products used*, *usual*, *extension* | vocabulary | § 4, § 6 throughout. *Usual* carries the whole § 6 mental model and is not defined anywhere. | `PRINCIPLES.md` § Vocabulary, `foundations/content.md` |

## Blocked, and what I will draw anyway

| # | Blocked on | What gets drawn |
| --- | --- | --- |
| 2.2 | Q11 — no denial-reason screen exists to match | nothing; marked *inherited-unknown* on the board |
| 5.2 | Q6 — what happens to § 6 on an auto-checkout | the notice; the § 6 entry point from it is left open |
| 6.1 | Q10 — *What have you done* is not on the board | § 6 drawn from the PRD alone, since there is nothing to match |
