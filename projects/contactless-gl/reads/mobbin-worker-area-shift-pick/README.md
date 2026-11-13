# Reference read — Mobbin → **a gig worker choosing where and when to work**

Feeds `TIERS.md` surfaces 11–16 (work area list with joining bonus · shift windows with open seats · *Help me choose* · *Decide later* · seat released · nothing nearby) and 32–33 (joining date · slot confirmation with alternatives). Internal reference only: never published, never traced. Screenshots `<app>-<nn>.webp` in flow order.

| | |
| --- | --- |
| Source | Mobbin, iOS catalogue, searched by flow on 2026-11-04 |
| Searches | *driver app choose delivery zone* · *gig worker onboarding select working hours* · *shift booking available slots app* · *delivery partner onboarding* |
| Read | Claude (agent), 2026-11-04; every screen opened at full size, strings quoted verbatim |
| Skipped | GetYourGuide (tour tickets — a consumer booking), Keeta and Gopuff onboarding (consumer sign-ups with no area or hours), Shopee shipping channels (seller settings), Turo *Location & delivery* (car-owner radius setting; one fact kept from *Car availability*), Lyft *Price Lock* (a rider product), Beside *Preferred hours* (read for the day-chip + from/to shape only) |

## Source table

| App | Flow | Mobbin URL | Screens | Files | Why it is here |
| --- | --- | --- | --- | --- | --- |
| Grab Driver (worker) | Booking planner | https://mobbin.com/flows/51f3a17a-1c5f-4238-80b1-e4b7665862e5 | 7 | `grab-driver-01…07` | The closest shipped thing to *shift windows with a bonus*: a day strip, rows of *Shift* / *Streak Zone* with hours, zone and bonus; a *My Bookings* empty state |
| DoorDash Dasher (worker) | Scheduling a dash | https://mobbin.com/flows/b23594e3-4bda-495a-ae7e-205a5ab55ee0 | 5 | `doordash-dasher-schedule-01…05` | Zone on a map with demand labels; start/end time pickers bounded by *openings* |
| DoorDash Dasher (worker) | Schedule | https://mobbin.com/flows/7f950431-4f7d-4309-99d9-f7ce6abab6b6 | 5 | `doordash-dasher-schedule-tab-01…05` | Day strip + *Available / Scheduled*; the scheduled dash as a block on an hour rail |
| DoorDash Dasher (worker) | Home | https://mobbin.com/flows/0773d51a-62f8-48b6-9c5e-622d686bc3a4 | 3 | `doordash-dasher-home-01…03` | The **zone states**: *Very busy · Busy · This zone's full right now · Reserved zone, locked for now* |
| DoorDash Dasher (worker) | Preferences | https://mobbin.com/flows/de302588-d9a6-4b8d-918f-5a070a311ceb | 3 | `doordash-dasher-preferences-01…03` | Opt-in work types as toggles with *High demand* tags (context only) |
| Swiggy (India, consumer) | Booking a table | https://mobbin.com/flows/48eb9619-a3a9-48d3-a0f0-888256af71c4 | 11 | `swiggy-01…11` | The Indian slot-grid convention she already knows: day strip with *10% off* under each day, *Breakfast / Lunch / Dinner* segments, a grid of time chips each carrying its offer, *View all slots*, a confirmed card |
| Turo | Selecting car availability | https://mobbin.com/flows/04e8363b-d917-4203-b4d2-f3b177268ad5 | 3 | `turo-01…03` | *Recommended* on an option; a one-line fact in a tip box above the list |
| Beside | Setting up preferred hours | https://mobbin.com/flows/5ae96939-6a68-4f5c-ad72-f0590699f2c6 | 7 | `beside-01…07` | Day chips M–S + *From / To* (the from-to shape, read only) |

Three worker-side sources (Grab Driver, DoorDash Dasher ×4 flows) and one Indian consumer app she uses (Swiggy); Turo and Beside for one fact each. **No shipped app on Mobbin asks a worker to pick an area and a shift during onboarding** — see *What Mobbin could not show*.

## Step 1 — what is there

### A. Choosing where — the area / zone

| # | File | App | Strings (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| A1 | `doordash-dasher-home-01` | DoorDash Dasher | map with outlined zones; pills **Very busy** (dark red) on *San Francisco*, **Busy** on *South San Francisco* · sheet: *CA: San Francisco* · *"Kick off the day with lots of offers"* · **Dash** · calendar icon button | The zone is the map; demand is a coloured pill on it; the sheet names the zone she is in |
| A2 | `doordash-dasher-home-02` | DoorDash Dasher | grey zone *Alameda* · *"Schedule your dash for later"* · *"This zone's full right now"* · **Claim a spot** · calendar | A **full** zone: the primary changes to *Claim a spot* (schedule) |
| A3 | `doordash-dasher-home-03` | DoorDash Dasher | ochre zone **Reserved** on *Daly City* · *"Reserved zone, locked for now"* · *"Schedule or check back later"* · card *"300 deliveries needed to dash here"* · ProgressBar *1 / 300 complete* · **Schedule** | A **locked** zone with the unlock as a bar |
| A4 | `doordash-dasher-schedule-02` | DoorDash Dasher | *December 8* · *"Choose a time to Dash in CA: San Francisco. We currently have openings between 6:00 PM and 12:00 AM"* · *Start Time* `December 8 at 6:00 PM ⌄` · *End Time* `December 9 at 12:00 AM ⌄` · **Save Dash** | Zone fixed by location; the open window stated in one line |
| A5 | `grab-driver-04` | Grab Driver | tooltip on the filter icon: *"Filter the bookings based on location."* **Got It** | Zone is a filter on the list, not a step |
| A6 | `grab-driver-05`, `-06` | Grab Driver | rows: *Shift · 04:00 PM – 06:00 PM · S$0.00 · ● SG_GC_SHIFT_DOWNTOWN_1* · *Streak Zone · 05:00 PM – 06:00 PM · S$8.30 bonus · ● Lower Central* · *… S$6.90 bonus · ● Southeast* · *Shift · 12:00 AM – 03:00 AM · S$0.00 · ● SG GC – North Shift* | Each row = type · hours · trailing money · zone with a green dot |

### B. Choosing when — the shift / slot

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| B1 | `grab-driver-02` | Grab Driver | intro: *"Plan ahead! Get bookings that fit your schedule."* · *Streaks — Earn bonuses by completing all bookings within a timeframe.* · *Shift — Secure your income by reserving your preferred working hours and zone in advance.* · **Start Tour** | Two pictograms, two lines, one button |
| B2 | `grab-driver-03` | Grab Driver | *Booking Planner* · day strip *Today 15 · Fri 16 · Sat 17 · Sun 18 · Mon 19 · Tue 20 · Wed 21* (today a green disc) · coachmark *"Browse for bookings up to 10 days ahead."* **Next** · list as A6 · tabs *Browse · My Bookings* | Day strip over a list |
| B3 | `grab-driver-07` | Grab Driver | *My Bookings* · *"No accepted bookings yet"* · *"Once you accept a booking, you'll see them here."* | Empty state, text only, no action |
| B4 | `doordash-dasher-schedule-03`, `-04` | DoorDash Dasher | sheet *"Choose end time"* · wheel *Today 9:00 PM* (Tomorrow greyed) · **Done** · *Cancel* → *End Time December 8 at 9:00 PM* · **Save Dash** | A wheel picker for the end |
| B5 | `doordash-dasher-schedule-05`, `-tab-03…05` | DoorDash Dasher | *Schedule* · day strip *Mon 8 (red disc) … Sun 14* · segmented *Available / Scheduled* · *CA: San Francisco* · *12/8/2025, 6:00 PM–12/8/2025, 9:00 PM* ✎ · *12:30–1:30 AM* ✎ → *Scheduled*: *"1 Dash scheduled"* · hour rail *1 PM … 10 PM* with a blue block *"CA: San Francisco from 6:00 PM to 9:00 PM"* | Available = rows; Scheduled = a block on an hour rail |
| B6 | `swiggy-02…05` | Swiggy | *Book table · Bird Valley* · banner *"Get flat 10% DineCash on your bill payment"* · *Number of guest(s)* chips *1 2 3 4 5* · *"When are you visiting?"* · day chips *18 Today · 19 Wed · 20 Thu · 21 Fri · 22 Sat*, each with a green pill *10% off* · segmented *☕ Breakfast · ☀ Lunch · ☾ Dinner* · grid of chips *05:00 PM 10% off · 05:15 PM 10% off …* (selected = orange outline) · *View all slots ⌄* · *Booking option for 07:45 PM — REGULAR OFFER ◉ Flat 10% off on total bill · Cover charge: FREE* · **Proceed** (disabled until a slot is picked) | Day strip → part-of-day segment → slot grid, **every option carries its incentive** |
| B7 | `swiggy-06…08` | Swiggy | confirm card: *Wednesday 19 Aug 2026 · Dinner 07:45 PM · for 2 guests · Bird Valley, Pimple Saudagar, Pune* · *OFFER FOR YOU Flat 10% off on total bill* · **Book your table for Free** → spinner → ✓ *"Your table is booked!"* · *Confirmed* card with 📞 and 📍 · **Done** | The confirmation repeats the picked facts as a card with call and map |
| B8 | `swiggy-09…11` | Swiggy | *"What to do next? — Reach restaurant on the booked date and time · Pay your dining bill via Swiggy Dineout…"* · *"Can't make it to the restaurant? Cancel booking"* · Home *My Bookings* card with **View details** | After-booking next steps and the cancel path |
| B9 | `turo-02`, `-03` | Turo | *Advance notice* · tip box 💡 *"51% of trips at home locations are booked on shorter notice than your current requirement of 1 day."* · radios *12 hours · 1 day **Recommended** (selected)* · *Maximum trip duration* · *5 days · 1 week · 2 weeks (selected) · 3 weeks **Recommended** · 1 month* · **Continue** · progress *6 of 11 · View all steps* | *Recommended* as a small label on one option; one fact above the list |
| B10 | `beside-02…07` | Beside | *Preferred hours* · day chips *M T W T F S S* (filled = on) · *From 9:00 AM* / *To 5:00 PM* with a wheel · *"Your AI Receptionist will only book calls or events during your preferred hours on the selected days."* · **Save** | The from-to shape |

### C. Incentives on options

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| C1 | `grab-driver-05` | Grab Driver | *S$8.30 bonus* / *S$6.90 bonus* trailing on *Streak Zone* rows; *S$0.00* on plain *Shift* rows | Money trailing on every row, zero shown as *S$0.00* |
| C2 | `swiggy-02` | Swiggy | *10% off* under every day chip and inside every time chip | The incentive is on the option itself, repeated |
| C3 | `doordash-dasher-home-01` | DoorDash Dasher | **Very busy · Busy** pills on zones; *$0.00 This week* in the header | Demand as a coloured label, not money |
| C4 | `doordash-dasher-preferences-02` | DoorDash Dasher | *Shop and deliver* with tag **High demand**; *Alcohol delivery* with tag **Certified** | A Tag on the option |

## Step 2 — what each flow is trying to do

**Grab Driver's Booking Planner** is a marketplace of hours: a day strip, then rows of *Shift* (reserve hours in a zone, no bonus) and *Streak Zone* (an hour in a zone with a bonus). Every row says the same four things in the same order — kind, hours, money, zone — and the zone is a filter, not a step. It is the closest shipped answer to *shift windows with open seats and a bonus*, with one gap: it never says how many seats are left.

**DoorDash Dasher** puts the **zone on the map** and the **state on the zone**: busy (dash now), full (claim a spot later), locked (a bar to unlock). Scheduling is then a start and an end inside the stated *openings*. It is the one flow that designs *nothing open right now* as a state of the same screen, not an empty list.

**Swiggy's table booking** is the Indian consumer convention for *pick a day, a part of the day, a slot*: day chips with the offer under each, a three-way segment, a grid of time chips each carrying its offer, and a confirm card that repeats the facts with call and directions. She has very likely used it.

**Turo** shows the smallest honest way to steer a choice: a *Recommended* label on one option and one fact above the list.

## Step 3 — against the expert

| Symptom | Where | Breaks |
| --- | --- | --- |
| Zone names are system IDs (*SG_GC_SHIFT_DOWNTOWN_1*, *SG GC – West (Expanded) Shift*) | Grab A6 | `content.md` — plain spoken words; vocabulary: a **Hood** is *landmark + sector* (*Near Forum Mall · 6th Sector*) |
| *S$0.00* trailing on rows with no bonus | Grab C1 | P1 numbers first — a zero is noise; the pay slot is empty or carries the bonus |
| Seats left is never shown | Grab, DoorDash, Swiggy | TIERS 12 — *full ones hidden*; the system also wants *N seats* as a fact when it matters (P5) |
| Wheel pickers for start / end (*Choose end time*) | DoorDash B4, Beside B10 | P3 — a drag-only control for an essential choice; `selection-card.md` `rich` · shift option is a tap |
| A dense grid of 12+ time chips, each with a tiny *10% off* | Swiggy B6 | P3 targets; P9 the chip cannot hold Kannada; `selection-card.md` says a shift is a card with a day rail, not a chip |
| Demand as colour + word only (*Very busy / Busy*), red for "good" | DoorDash C3 | P1 row 4 (two channels — colour + word is two, kept) but P6 — red is a status colour, not an incentive; and *busy* is not money |
| *Proceed · Continue · Save Dash · Done · Got It* | all | `content.md` § 9; `button.md` |
| Empty *My Bookings* with no action | Grab B3 | P2, P5 — an empty state has one next action |
| Coachmark tours on first open (*Browse for bookings up to 10 days ahead*) | Grab B2–B3 | `first-run.md` governs; not for the pick step |
| The incentive repeated on every day chip and every slot | Swiggy C2 | P1 — say it once where it differs (on the option that has it), not on all |
| The full/locked zone is a map colour she must decode | DoorDash A2–A3 | P1 — the state needs a shape + icon + word; on a 360 dp phone the map is not the list |

**What they get right, to keep**

- **One row, four facts, same order** (Grab A6): kind · hours · money · place — this is `SelectionCard rich · shift option` (hood over area + `map-pin` + trailing pay slot) already shipped 2026-10-01.
- **The incentive sits on the option** (Grab C1, Swiggy C2, DoorDash C4): a trailing Amount or a Tag on the card, never a banner above the list.
- **A full zone is not an empty list** (DoorDash A2): the screen stays, the state is named, the primary changes to the next thing (*Claim a spot* → ours **Help me choose** / **Pick another day**).
- **A locked zone shows the unlock as a bar** (DoorDash A3): a ProgressBar with the number, which is how a *seat released after 7 days* or *N more needed* can be shown (P6 progress as a shape).
- **The open window is stated once in one line** (DoorDash A4: *openings between 6:00 PM and 12:00 AM*).
- **Day strip over the list** (Grab B2, DoorDash B5, Swiggy B6): SelectionCard `date` strip — the system's way to pick a day (Beauty go-live G1).
- **Confirm card repeats the facts with call and directions** (Swiggy B7): the slot-confirmation shape for surface 33, and the Hub card already has it (`onboarding.md` § 6b).
- ***Recommended* as a small label with one fact above** (Turo B9): Tag `brand` on the card + one line — the way *nearby first* and *joining bonus* steer without a paragraph.
- **Next steps + cancel after booking** (Swiggy B8): the *Change ›* ListItem under the confirmed card (TIERS 33) and the *Can't make it* ghost.

## Step 4 — tier and system map

| Region (reference) | What it is in the system | Tier |
| --- | --- | --- |
| Shift row: kind · hours · money · zone (Grab A6) | **SelectionCard `rich` · shift option** (`selection-card.md` § the shipped timings card): hood over area, `map-pin`, day rail (block · break · block), trailing pay slot as Amount `S` *+₹2,000 joining bonus* | 1 — exists (TIERS 11–12) |
| Day strip (Grab B2, DoorDash B5, Swiggy B6) | **SelectionCard `date`** strip + *Show more dates ›* | 1 — exists (TIERS 32) |
| Part-of-day segment *Breakfast / Lunch / Dinner* (Swiggy B6) | **Tabs `segmented`** *Morning · Afternoon · Evening* over the windows list — only if a hood has more than ~5 windows; otherwise the list alone | 1 — exists |
| Time-chip grid with offers (Swiggy B6) | **Not borrowed** as chips (P3, P9); the slot is the `rich` card above. The *offer on every option* idea travels as the pay slot | — |
| *Very busy / Busy* pills on the map (DoorDash A1) | **Tag `brand`** *Joining bonus* / **Tag `info`** *Near your home* on the card; no demand colours (P6). The map is MapSnippet `hotspot` on the confirmed card only, never the picker | 1 — exists |
| Full zone with a changed primary (DoorDash A2) | **EmptyState `empty`** *No open shifts in Kudlu Gate this week* with **Help me choose** `secondary` and **Pick another hood** — TIERS 16; or a **Banner `info`** above the list when some hoods are full | 1 — exists |
| Locked zone with an unlock bar (DoorDash A3) | **ProgressBar `linear`** with the count inside a Card — the shape for *seat released* / *N of 300*; for TIERS 15 the Home **Banner `warning`** *Your shift seat was released* → **Pick again** | 1 — exists |
| *Openings between 6 PM and 12 AM* line (DoorDash A4) | The list heading line under the ProgressBar: *Open this week near your home* — one line, BodyLg | 1 — content |
| Start / end wheel (DoorDash B4) | **Not borrowed**; a shift is picked, not typed (`selection-card.md`) | — |
| Scheduled block on an hour rail (DoorDash B5) | The `rich` card's **day rail** (block · break · block) already draws the hours as a shape | 1 — exists |
| Confirm card with call + directions (Swiggy B7) | **SelectionCard `rich` `selected`** + **ListItem** *Change ›* (TIERS 33); the Hub card composition carries call + **Show directions** | 1 — exists |
| *Recommended* + one fact (Turo B9) | **Tag `brand`** on the first card + the heading line *Near your home* (vocabulary: *Area* as a list heading) | 1 — exists |
| Empty *My Bookings* (Grab B3) | **EmptyState `empty`** with one action **Pick a shift** | 1 — exists |
| *Plan ahead!* two-pictogram intro (Grab B1) | **Not needed** — one instruction line per screen (P1); the heading and the first card say it | — |
| *Decide later* | No base in these flows (none lets the worker skip). **Button `ghost`** below the primary (TIERS 14) stays as specced | 1 — exists |
| *Help me choose* → callback | No base. EmptyState `secondary` + a quiet ListItem row under the list (SCOPE q5) | 1 — exists |

## Step 5 — what travels to contactless-gl

| Surface | Base here | What changes for contactless |
| --- | --- | --- |
| 11 · work-area list, nearby first, name + landmark, joining bonus | Grab A6 (four facts per row), Turo B9 (*Recommended* + one fact), Swiggy C2 (incentive on the option) | SelectionCard `rich` · shift option as shipped; hood as *landmark + sector*, never an ID; **Tag `brand`** *Near your home* on the first cards and the trailing Amount `S` *+₹2,000 joining bonus* only where configured — the pay slot **may read a bonus** (confirms the TIERS 11 question: Grab's pay slot reads a bonus, not a monthly figure); no zero shown |
| 12 · shift windows with open seats, full hidden | Grab A6, DoorDash A4 | Same card with the day rail; one heading line states the open window; when a window shows seats it is a fact on the card (*3 seats*), never a wheel or a chip grid |
| 13 · *Help me choose* · *Call support* | — no base | As SCOPE q5: EmptyState `secondary` + a quiet row under the list; Help in the header |
| 14 · *Decide later* | — no base (no worker app lets her skip the pick) | Button `ghost` below the primary; Home Stepper step turns `attention` — a choice of ours, justified by P2 (one primary) |
| 15 · seat released after 7 days | DoorDash A3 (unlock as a bar) | Notification + Home **Banner `warning`** → **Pick again**; if the 7-day hold is shown while it runs, a ProgressBar/Timer `deadline` on the confirmed card (*Held till Sat 8 Nov*) — open question 15 |
| 16 · nothing open nearby | DoorDash A2 (the screen stays, the primary changes) | EmptyState `empty` with **Help me choose** and **Call help**; never an empty list |
| 32 · joining date | Grab B2, DoorDash B5, Swiggy B6 (day strip) | SelectionCard `date` strip + *Show more dates ›* (Beauty G1) — convention confirmed |
| 33 · slot confirmation with edit; alternatives if filled | Swiggy B7–B8 (confirm card, next steps, cancel), DoorDash A2 (full → the next thing) | `rich` `selected` card + *Change ›*; filled → Banner `info` *Your seat went — these are open* over the surface-11 list; the Swiggy *What to do next* list is **not** borrowed (P1: next steps are the Home Stepper) |

Surfaces with **no base** here: 13, 14 (no app lets a worker defer or ask for help at the pick), and the *seats left* fact (no app shows capacity).

## Step 6 — convention vs choice

**Convention (three or more — keep):**

- A **day strip** at the top, today marked, over whatever is picked below (Grab, DoorDash, Swiggy, Beside).
- An option is a **row/card with its hours and its place**, and anything extra (bonus, offer, demand) sits **on the option** (Grab, Swiggy, DoorDash preferences).
- The confirmed choice is **repeated as a card** with the day, the hours, the place and a way to change it (Swiggy, DoorDash *Available* rows with ✎, Grab *My Bookings*).
- *Recommended* / *High demand* as a **small label**, one per list (Turo, DoorDash, Wise's KYC choice in the sibling read).

**Choice (one app — borrow with a reason, or not):**

- DoorDash's **full zone is a state of the same screen** with a changed primary: borrowed for surfaces 16 and 33 (P5 honest state, P2 one next action).
- DoorDash's **unlock as a progress bar**: borrowed for the 7-day hold if it is shown (P6 progress as a shape).
- Grab's *S$0.00* on bonus-less rows, its ID-named zones, its two-pictogram intro: not borrowed (P1, content).
- Swiggy's slot **chip grid** and the offer repeated on every chip: not borrowed (P3, P9); the segment and the day strip are.
- DoorDash's **wheel pickers**: not borrowed (P3).
- Turo's one fact above the list (*51% of trips…*): borrowed as the shape of the single heading line (*Open this week near your home*), with a number only when we have one (P5).

## What Mobbin could not show

- **No worker-side onboarding where the area and the shift are picked as a step.** Grab and DoorDash set zone by location and pick hours from a planner after activation; the pick-before-KYC position (open question 8) has no precedent here either way.
- **No seat count** on any option; *full* is a state (DoorDash), never *2 seats left*.
- **No skip / decide-later** on a worker pick, and no *help me choose* callback.
- **No Indian worker app** (Urban Company Partner, Swiggy delivery partner, Rapido, Porter) in the catalogue at the time of reading; Swiggy stands in as the Indian consumer convention only.
- **No joining bonus** on an area; the nearest is Grab's per-hour *S$8.30 bonus* on a zone hour.
- **No Android**, no Indic script, no large-font state.

## Note on files

File names follow the manifest order of each flow on Mobbin. Flows were downloaded in full; the screens not read (see *Skipped*) are kept so the sequence is intact, and are not evidence.
