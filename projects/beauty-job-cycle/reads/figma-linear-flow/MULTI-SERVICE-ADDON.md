# Multiple services and add-ons in the Beauty job flow

**Sources.** I read the 27 exported frames in `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/reads/figma-linear-flow/`. The Figma connector isn't authorised in this session, so I worked from the PNGs, not the live file. I also read this project's `prd.md`, `SCOPE.md`, `TIERS.md`, `BUILD.md` and `catalogue-sample.md`, plus `PRINCIPLES.md`, `content.md`, `check-in-out.md`, `new-job-alert.md` and the requested component specs.

Two things beyond the list:
- f13's green bubble is a shipped Tooltip `status`, so I also read `tooltip.md`, `amount.md`, `nudge.md` and `stat-rating-divider.md`.
- I checked the icon names against `foundations/icons.md`.

I read no other project folder and wrote nothing.

## What the Figma flow says

**The order of screens:** New job (f00–f01) → message the customer (f02) → Check in: on time (f03/f04), running late (f05), earnings opened (f06) → code to start, with the phone-number fallback (f07–f09) → Job started (f10) → Get ready with your things, the buffer (f11) → Job in progress (f12) → Extended (f13) → 15 min left (f14) → *Ask if you can help quickly with anything* (f15, picture f16) → code to end (f17–f18) → Products you used (f19) → What was different (f20) → You earned + rate the customer (f21–f22) → Block (f23–f26).

It follows the Paper board's main line (1.01 → 1.13). It adds two things the board doesn't have: the f15 "ask for more" prompt, and a state where only time is added.

**About services and add-ons, it says five things:**

1. **She can't see the services before the job starts.** f00–f06 show one service, and only as a money line (*Fruit facial (1 hour)*). Products are hidden behind *Items required for this job ›*. PRD § 1 and § 3 both say these screens must show the services and products.
2. **A second service appears without warning.** *Leg massage* first shows up on f11, with no event. Either it was booked, and f00–f06 are wrong, or it was added, and she was never told (P5).
3. **The only add-on drawn is extra time.** On f13: *Job extended by 15 min*, *Duration 60 min + 15 min*, and a striped section on the timer ring. But:
   - no service is named;
   - *Job timing* still ends at 11:00 AM;
   - on f14 the *+15 min* is gone and the timer goes *up*, from 14:23 to 15:23.

   So PRD § 4's "time and service level" is half drawn, and that half contradicts itself.
4. **There is no time per service.** Two services share one *Duration 60 min*, while f00 prices *Fruit facial (1 hour)* on its own.
5. **The product lists disagree with each other.**
   - f11 and f12 show the same list twice.
   - f19 groups by category (*Facial / Body*), and its first count says 1 when the group lists 4.
   - f20 names a different service, *Back massage*.
   - Counts are bare digits.
   - PRD § 6 says "grouped by service".

**f15 is probably where a mid-job add-on starts:** near the end, the expert asks, and the customer adds from the consumer app. Its picture (f16) is a cleaning scene (spray bottle, mop), not Beauty.

## A. When an add-on can arrive

| # | Moment | Figma | PRD | System today | Verdict |
| --- | --- | --- | --- | --- | --- |
| 0 | Booked together, before the offer | 1 service | Supported (§ 1 "services booked") | ListItem rows | **Supported.** For her it is simply the job, so no *Added* mark before she has seen it. |
| 1 | While the offer is on screen (about 90 s) | — | Not mentioned | `job-alert.md`: the Timer never restarts | **Don't change the offer under her thumb.** Hold the change until she accepts, then deliver it as moment 2 (P2, P5). |
| 2 | Accepted, on the way or at the door | — | Not mentioned | Nothing | **Open, and the biggest risk for Beauty.** The add-on's products must already be in her bag. |
| 3 | Setting up (buffer) | — | Not mentioned | Timer `buffer` | **Open.** Same event as 2. Her kit is out, so she can still find the product. |
| 4 | Working (job in progress) | f13, time only | Contradicts itself. § 4's acceptance criterion says "during the booking", the summary says "paid extensions", § 8 says "added during the job". | `check-in-out.md` Edges: *Customer extends the job*. It covers time only, and it puts Accept/Decline in a Banner, which `feedback.md` doesn't allow (one action or one dismiss). | **Time is backed only by the looser PRD text. A new service is not drawn anywhere.** |
| 5 | After *Complete job* / the end code | — | § 8 counts only add-ons "added during the job" | — | **Not allowed.** It would be a new job. |

**This reopens SCOPE Q2.** The stakeholder's "later be able to add on" means add-ons do come after booking. So the *taken as booked* answer, and 1.06a's line *Booked when she booked the job*, no longer hold. This belongs in SCOPE → Open questions and Log. `prd.md` stays unedited. Which moment "later" means is still open (D1).

## B. How it shows, stage by stage

### The add-on event: one shape wherever it lands (moments 2–4)

| Part | Built from | Copy |
| --- | --- | --- |
| Sound and voice | A new sound, different from `sound.newJob` (P4). Her hands are in a facial, so she won't be looking at the phone. | Spoken: *"Leg massage added. Thirty more minutes."* |
| The decision, if she can say no (D2) | BottomSheet `confirm` with a facts strip | Title *Radhika added a leg massage*. Body *Your job now ends at 11:30 am*. Facts strip: `clock-clockwise` *+30 min* · `bag` *3 products* · a ₹ amount from Payout. Buttons stacked: `ghost` *I can't do this* on top (becomes `secondary danger` with a hold if saying no carries a penalty), `primary brand` *Add to my job* at the bottom. |
| If she can't say no | BottomSheet `info` with the same title, body and facts | One button: *See what you need* |
| Confirmation at the thing that changed | Tooltip `status` pinned to the Timer, `clock-clockwise` icon (already registered as "time added"), colour taken from the Timer's tone | *30 min added*. Spoken once; disappears after the toast timeout. |
| What stays on screen | Tag `info` (soft style) *Added* on the service row; the *Job timing* and *Duration* rows update | See the stage table |
| If she says no | Snackbar | *Leg massage not added* · *Undo* (6 s) |
| Never allowed | A number that changes with no event (P5); pink *+15 min* (P6: brand pink is not a status colour); a change shown by colour alone (P1) | — |

**SOS during the sheet (P7).** A `confirm` sheet opened during a job covers SOS. So the back button must mean *decide later*, not *say no*. Then SOS stays two taps away and back never turns down the add-on by accident.

### Stage table

| Stage (Figma → Paper) | Several services | An added service | Time | Products |
| --- | --- | --- | --- | --- |
| New job, f00–f01 → 1.01 | A `Card static` under the money card (SCOPE Q15), one ListItem `informational` per service: *Fruit facial · 60 min*, *Leg massage · 30 min* | None: everything is still "booked" (moment 1 is held until she accepts) | Timer *Accept in* unchanged | ListItem `navigational` with `bag`: *9 products from your bag ›* replaces *Items required for this job* |
| Check in, f03–f06 → 1.03 / 1.03a | Same service rows in the 1.03 "what to prepare" card | Event sheet over 1.03. The row gains Tag *Added*. The products row becomes *12 products from your bag ›* with the description *3 for leg massage*. | The check-in Timer doesn't change, because the start time doesn't move. The new end time is in the sheet body. | The 1.07 sheet: a Divider `labelled` per service, the added group last |
| Code to start, f07–f09 → 1.04 / 1.04a | No services on this sheet | An event arriving while this sheet is open waits until it closes (`bottom-sheet.md`: one sheet at a time) | — | — |
| Setting up, f11 → 1.05 | ListItem `quantity` per service: *Fruit facial · 6 items* | Added row with its Tag; event sheet over 1.05 | Timer in `buffer` mode, label *Setting up*, never turns amber or red. f11's green *TIME LEFT* countdown is the wrong mode. An add-on does not make the buffer longer. | This is where she takes products out, so group them by service |
| In progress, f12–f14 → 1.06 / 1.06a | Heading3 *What you need*, then a `Card static` with one ListItem per service: title *Fruit facial*, description *60 min · 6 products*, then *See all 9 products ›* opening 1.07 | Row *Leg massage*, description *30 min · 3 products*, trailing Tag `info` *Added*. If only time was added, the service that grew gets Tag *+15 min*. | The ring recalculates from the new total; its colour is computed, with no striped section. Tooltip *30 min added*. *Job timing 10:00 – 11:30 am*. *Duration 1 hr 30 min*, description *60 min booked · 30 min added*, in `textPrimary` / `textSecondary`, not pink. *Complete job* stays disabled with *Available at 11:20 am* under it. | 1.07 grouped by service |
| Ask prompt, f15–f16 → new 1.06c | — | Where an add-on gets asked for: BottomSheet `info`, a Beauty scene registered in `assets.md`, button *Got it* instead of *Okay* | Appears at 3:23 left; if an add-on follows, the Timer grows | — |
| Code to end, f17–f18 → 1.08 | — | No change to the sheet | *Complete job* enables 10 min before the **new** end. Auto check-out (+30 min, § 5) counts from the new end. | — |
| Products used, f19–f20 → 1.09 / 1.10 | Divider `labelled` per **service** (*Fruit facial · 6*); ListItem `quantity` with units (*1 bottle*, never a bare *1*) | Just another group, no *Added* mark: the question here is what she used. Products of an add-on she didn't perform never appear. | — | What was different: QuantityStepper (Tier 3 brief) + *+1 pcs vs usual 1* + Chip `reason`. Buttons *Something was different* and *Save what I used*. |
| Completed + rating, f21–f26 → 1.12 / 1.13 | Money rows → Payout | Its money row → Payout | — | 1.13 line: *12 products came off your stock ›* |

**Why service rows plus a sheet, not Figma's open card per service.** The system match for f11–f14's cards is Card `expandable`. But its header has one trailing slot and the caret fills it, so an *Added* Tag has nowhere to go. It would also put 9–12 product rows above *Complete job*. ListItem `informational` rows can hold a trailing Tag, and the products go into 1.07 grouped by service, as `BUILD.md` already plans.

**Two corrections to `BUILD.md` 1.06a:**
- **Tag tone:** use `info`, not `neutral`. `tag.md` says neutral means a category; info means "a fact the expert should notice".
- **Drop the Banner:** its `plus` icon isn't registered, and it repeats what the Tag already says.

### Where the add-on touches money (hand to Payout)

1. **The ₹ amount in the event sheet.** Payout supplies the number (Amount `positive`). The sheet must not change her time without showing the money (P5, P6; `content.md` has the example *Radhika asked for 30 more minutes · ₹75*).
2. **The money card on 1.01, 1.03 and 1.06.** A line for the add-on and a new total, announced by the same event.
3. **The 1.13 *You earned* breakdown** (§ 8: base fare plus add-ons).
4. **Figma inconsistencies to pass on:**
   - The ₹150 headline doesn't match the rows, which add up to ₹185 (f00, f21). ₹145 doesn't match its rows either (f06).
   - *OT (15 min) ₹40* appears on the offer, before any work. Overtime is what the Timer counts up after 0:00 (`check-in-out.md` Edges), so a booked extension is not overtime.
   - *Work (1 hour)* is one line where there should be a line per service.
   - *Summer Bonus ☀️* uses an emoji as an icon.

## C. Does the system have it?

**Every part already exists:** Card, ListItem (`informational` / `navigational` / `quantity`), Tag, Tooltip `status` with `clock-clockwise`, BottomSheet `confirm` / `info` with a facts strip, Snackbar, Timer `countdown` / `buffer`, Divider `labelled`, Chip `reason`, and QuantityStepper (Tier 3 brief). **No new component is needed.**

These are the asks of core:

| Ask | Kind | Lands in |
| --- | --- | --- |
| **An "add-on arrives" edge case** replacing *Customer extends the job*: service or time, moments 2–4, a BottomSheet `confirm` instead of a Banner with two buttons, and the rows that update | Pattern | `patterns/check-in-out.md` |
| **A "your job changed" sound**, different from `sound.newJob` | Sound token | Foundations (`sound.md` isn't written yet), P4 |
| **An icon meaning "a service was added after she accepted"** (for example `list-plus`). `plus` isn't registered, and `plus-circle` already means "add one more" (an action). | Icon register | `foundations/icons.md` |
| **What the Timer does when its window grows mid-countdown:** recalculate the colour from the new total, no added-time section | One spec line | `components/timer.md` |
| **Vocabulary:** *Added*, and *extension* vs *Overtime* (already an open ask) | Vocabulary | `PRINCIPLES.md`, `content.md` |

## D. Questions the stakeholder must answer

1. **When is "later"?** While the offer is on screen, after accepting but before check-in, while setting up, or while working? Is there a cut-off, such as nothing in the last 15 min?
2. **Can she say no?** Is there a penalty? What happens if she doesn't answer because her hands are busy?
3. **A service or time?** Is f13's *Job extended by 15 min* a purchase of its own, or the time of an added service? Can both happen?
4. **Products.** Must she already carry the add-on's products? Does the consumer app check her stock before offering it? If she's missing one, is *I can't do this* the right answer?
5. **Her next job.** If an add-on pushes her end past the next job's check-in window, who sorts it out? Does the consumer app block the add-on?
6. **Money (Payout).** One line per service, or a single *Work* line? Is overtime different from an extension?
7. **Removing a service.** Can the customer drop a service after booking? Is that the same flow in reverse?
8. **Leg massage on f11: booked or added?** This decides whether f00–f06 get a second service row or an event.
9. **Same product in two services (Q7).** List it under each service, or add them up? This gets more likely with add-ons.
10. **f15.** Is it part of the Beauty flow, and is it how add-ons start?
11. **Who can add?** Only the customer in the consumer app, or can the expert add on the customer's behalf?
12. **How many?** Is there a limit on add-ons per job?

## Other changes to the Figma flow, not about add-ons

- **Banned button words:** *OK* (f10), *Okay* (f15), *No / Yes* and *Are you sure…* (f23) become verbs (`content.md` § 9). The ✕ floating on the dimmed background moves inside the sheet.
- **Buffer (f11):** *TIME LEFT* and a disabled *Complete Job* become the `buffer` Timer labelled *Setting up*, plus the button *I'm ready, start the service*.
- **15 min left (f14):**
  - The red *15 mins remaining* should be amber. The bubble takes its colour from the Timer, which is amber at that point, not red.
  - *Complete Job* is enabled at 15 min left; the pattern says 10 min.
  - *Complete Job* must never be disabled without the reason under it.
- **Products (f19–f20):** *No i used more/less* → *Something was different*; *Save changes* → *Save what I used*. The difference line and reason chips are missing.
- **Completed (f21):**
  - *Inventory updated successfully!* is an event, so it becomes a Toast: *Stock updated · 9 products*.
  - The *Job completed* header is missing.
  - *Ready for next job* needs *Tap a face to continue* under it while disabled.
- **Blocking (f24–f26):** after unblocking someone, the flow jumps to "blocked" without confirming Radhika. The block limit is never stated as a number (the Q13 fix stands).
- **Capitals:** *ACCEPT IN*, *CHECK IN BY*, *RUNNING LATE*, *FRUIT FACIAL* and the Title Case labels all go sentence case.

## What to draw on Paper, once D1–D3 are answered

Write the `BUILD.md` rows first (the build-plan gate), then draw.

| Board | Change |
| --- | --- |
| 1.01, 1.03 | Add a service row with its own time |
| **1.03b** (new) | Check in · service added (event sheet over 1.03) |
| **1.05b** (new) | Setting up · service added |
| 1.06a (rework) | Remove the Banner and *Booked when she booked the job*. Add the Tooltip on the Timer, Tag `info` *Added*, and the updated *Job timing* and *Duration* rows. |
| **1.06b** (new) | Time extended only (Tag *+15 min* on the service), if D3 says this exists |
| **1.06c** (new) | Ask if you can help, if D10 says yes |
| 1.07, 1.09 | Show the added service as its own group |
| 1.13 | Hand to Payout |