# Build plan v2 — Job Lifecycle · Beauty · the linear flow

Written 2026-09-23, **before** any artboard, for the redraw on the stakeholder's Figma linear flow
(`MBl1qmM0jgAJn49V8oBxLO` → `686:12720`, 27 frames; read in `reads/figma-linear-flow/`). The 2026-09-22 plan it
replaces is kept as `BUILD-v1-2026-09-22.md` for the trace.

Read first, in order: `reads/figma-linear-flow/` (transcript, `DIFF-vs-paper.md`, `MULTI-SERVICE-ADDON.md`) and
`reads/lovable-prototype/` → `patterns/check-in-out.md` → `components/` (`card`, `list-item`, `tag`, `timer`,
`tooltip`, `bottom-sheet`, `feedback`, `nudge`, `button`, `header-nav`, `numeric-keypad`, `text-field`,
`stat-rating-divider`, `chip`, `empty-state`, `icon-button`) → `foundations/content.md`, `icons.md`, `assets.md`.

**Where it is drawn.** Paper file *Snabbit Beauty*, a new page **`Job lifecycle · linear`**. The 2026-09-16/22
board stays untouched on page `Job lifecycle` as the record of what was tried; nothing is deleted.

## The stakeholder's answers this plan is built on (2026-09-23, `SCOPE.md`)

| # | Answer | What it does to the board |
| --- | --- | --- |
| Q2 | Add-ons arrive **only while the job is in progress**; she **cannot refuse**; an add-on is **a service with its own time and items** (*Fruit facial · 15 min · 2 items*) | One event sheet (2.07), one after-state (2.08). Nothing on the offer, check-in or buffer ever says *Added* |
| Q7 | A product two services use is **listed under each service, always** | *Massage cream* appears under *Fruit facial* **and** *Leg massage*, on every stage including § 6 |
| Q19 | The *ask if she needs anything* prompt **stays, always** | 2.09 on the main line |
| Q20 | **Complete job** is available **any time** during the job | 2.06 / 2.08 enable it with no reason line; the pattern's 10-minute rule is a Househelp rule |
| Q21 | Top earnings card is **Payout's** | Drawn **exactly as on the current board**, not redesigned. Marked *Payout* in the layer name |
| Q22 | A job carries **any number of booked services** | The job story has two booked services from the offer onward |

## The job story (placeholder, `catalogue-sample.md`)

> **Radhika S** · Tuesday 7 February · **10:00 – 11:30 am**
> Booked: **Fruit facial · 60 min · 6 items** — Cleansing milk 1 pc · Fruit facial kit 1 pc · Rose water toner 1 pc
> · Cotton pads 4 pcs · Face pack 1 pc · Massage cream 1 pc
> Booked: **Leg massage · 30 min · 3 items** — Massage cream 1 pc · Massage oil 1 pc · Wet wipes 2 pcs
> Added during the job: **Eyebrow threading · 15 min · 2 items** — Cotton thread 1 pc · Astringent 1 pc
> → job now **10:00 – 11:45 am**, **1 hr 45 min**, **11 items**
> § 6 difference: *Cotton pads 6 pcs · +2 pcs vs usual 4* → *Client needed more*

## The one composition this plan introduces — `Beauty / Service card` (Tier 2)

Every stage shows services the same way (Q12). Nothing in it is new:

| Part | Built from | Source |
| --- | --- | --- |
| Container | `Card expandable` — `bgPrimary`, 16 padding. **Drawn in the board's idiom: radius xl, no border** (as every card on this board); `card.md` says radius lg + thin `borderDefault` — one board-wide reconciliation, open | `card.md` § Kinds |
| Header | service name `Title` 18 Medium · description `BodyMd textSecondary` *60 min · 6 items* · trailing `caret-down/up` IconButton XS ghost | `card.md` § Anatomy; description line inherits `list-item.md` two-line |
| *Added* mark (2.07, 2.08 only) | `Tag info soft M` *Added*, **in the description line before the meta** — the header's one trailing slot is the caret | `tag.md` (info = "a fact the expert should notice"); see ask 3 below |
| Body rows | `ListItem quantity` — name `BodyLg` · count `BodyLg Medium` trailing (*1 pc*, *4 pcs*), 48 dp, space not dividers | `list-item.md` § `quantity`; inherits `Statement` row rhythm |
| Section heading above the cards | `Title` 18 SemiBold outside the cards (the board's shipped section-header idiom, as drawn on the 2.06 master) + optional `BodyMd textSecondary` lead | Figma f11 *Customer Services*; `check-in-out.md` § 3 |

Open/closed by stage: **offer** all closed (decide in a glance, P1) · **check in** first open, rest closed (Lovable
`02-check-in.png`) · **buffer, in progress** all open (Figma f11–f14: she is taking them out and using them).

---

## Screens

Main line left to right; variants under the step they branch from (same convention as the old board). Artboards
393 × 852 (the shipped job board size), `height: fit-content` where the page scrolls.

| # | Screen | Figma | Replaces on the old board |
| --- | --- | --- | --- |
| **2.01** | New job · accept in | f00 | 1.01 + 1.02 |
| 2.01a | Last seconds to accept | f01 | — |
| 2.01b | Deny — last-hour job only | — (PRD § 2) | 1.01a |
| 2.01c | Denial reasons — inherited, not on the board | — | 1.01b |
| **2.02** | Check in | f03 | 1.03 |
| 2.02a | Message Radhika | f02 | — |
| 2.02b | Running late | f05 / f06 | 1.03a |
| **2.03** | Enter the code to start | f07 / f08 | 1.04 |
| 2.03a | No code — her phone number | f09 | 1.04a |
| **2.04** | Job started | f10 | — |
| **2.05** | Get ready — buffer | f11 | 1.05 |
| 2.05a | Start before the buffer ends | — | 1.05a |
| **2.06** | Job in progress | f12 | 1.06 + 1.07 |
| 2.06a | 15 min left | f14 | — |
| **2.07** | A service was added | f13 (event) | 1.06a |
| **2.08** | Job in progress · after the add-on | f13 (state) | 1.06a |
| **2.09** | Ask Radhika if she needs anything | f15 / f16 | — |
| **2.10** | Enter the code to finish | f17 / f18 | 1.08 |
| 2.10a | Checked out for you | — (PRD § 5) | 1.08a |
| **2.11** | Products you used | f19 | 1.09 |
| **2.12** | What was different | f20 | 1.10 |
| 2.12a | Ran out — down to zero | — | 1.10a |
| **2.13** | Job completed · rate Radhika | f21 | 1.11 + 1.12 + 1.13 |
| 2.13a | Unhappy — block offered | f22 | 1.12 |
| 2.13b | Stop jobs from Radhika? | f23 | 1.12a |
| 2.13c | Block list is full | f24 / f25 | 1.12b |
| 2.13d | Radhika blocked | f26 | — |

**Dropped** from the old board, each for a reason: **1.02** products page and **1.07** in-job products sheet (the
service cards carry the items inline — Figma f11–f14, Lovable 02); **1.09a** *All 9 came off* and **1.11** stock
sheet (the result is one Banner on 2.13 — Figma f21, Lovable 06, `check-in-out.md` § 4); **1.12** separate rating
page (one completion page — same sources); **1.06a** *Extension booked* (Q2 re-answered: add-ons are mid-job).

---

## Build plan — every region

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| **all** · status bar | artboard chrome | — | — | — |
| **all** · header | `HeaderNav state` — Help · centred icon + `Title` · SOS rightmost | `header-nav.md` § `state`; shipped | — | — |
| **all** · primary action | `Button primary brand L`, full width, safe-area inset | `button.md` | — | — |
| **all** · sheets | `BottomSheet` — close `IconButton` **inside** the sheet top-right (not floating on the scrim) on dismissible kinds; none on `confirm` | `bottom-sheet.md` § What changes | — | — |
| **2.01** · header | `HeaderNav state` `spray-bottle` *New job* | old 1.01 | — | — |
| 2.01 · earnings | **Payout's card, copied unchanged from old 1.01** — only its placeholder *Check in by 7:45 pm* is aligned to the story's *9:45 am* (on 2.01, 2.01a, 2.02, 2.02b and the sheets over them), and on 2.13 its *Fruit facial · Eyebrow threading* line reads *3 services*; nothing restyled | Q21 | — | — |
| 2.01 · services | `Heading3` *2 services · 9 items* · 2 × `Beauty / Service card` closed | composition above; PRD § 1 | — | — |
| 2.01 · when | `ListItem informational` `clock` *Tue 7 Feb · 10:00 – 11:30 am* above the services | old 1.01 job card; PRD § 1 (date/time) | — | — |
| 2.01 · timer | `Timer countdown L` digits — label *Accept in* · *1:23* `textSuccessStrong` | shipped; `timer.md`; label case `content.md` l.28 | — | — |
| 2.01 · action | `Button primary brand L` *Accept job* (`check`) | `button.md` § `accept`: green only beside a `danger` action — the main line has no Deny (PRD § 2: last-hour only), so brand | — | `accept` tone (rule forbids it here) |
| **2.01a** · nudge | `Nudge loss` — `clock` · *If you don't accept · − ₹50* · red-card asset stand-in, **above the Timer** so the Button stays lowest (P2) | Figma f01; `nudge.md` § `loss` | — | — |
| 2.01a · timer | `Timer countdown L` `urgent` *0:15* — urgent is ≤ 20 % of the 90 s window (≤ 18 s); Figma's *00:23* would still be `attention` | `timer.md` § Tones | — | — |
| **2.01b** · sheet | old 1.01a `BottomSheet confirm` — Tag *Last hour job* · name · services line updated to *Fruit facial · Leg massage* · Button *Accept job* `accept` + `secondary danger` *Decline* (hold) | old 1.01a; `button.md` `accept` (danger adjacent) | — | — |
| **2.01c** · placeholder | old 1.01b `EmptyState page` (Q11) — copied | old 1.01b | — | — |
| **2.02** · header | `HeaderNav state` `check-circle` *Check in* | old 1.03 | — | — |
| 2.02 · earnings | Payout's card, copied unchanged from old 1.03 | Q21 | — | — |
| 2.02 · customer | old 1.03 customer card — name + *Listen* · address · four shipped tiles (open ask: labelled action tile) | old 1.03; shipped | — | — |
| 2.02 · services | `Heading3` *What to prepare* · `BodyMd textSecondary` *Tap a service to see its items* · 2 × service card, first open | composition; PRD § 3; Lovable 02 | — | — |
| 2.02 · timer + action | `Timer countdown L` *Check in by 9:45 am* · *1:23* · `Button primary brand L` *Check in* (`check`) — no progress band inside the button (one clock, not two) | `check-in-out.md` § 1; `progress-button.md` | — | — |
| **2.02a** · sheet | `BottomSheet form` over 2.02 — `Heading3` *Message Radhika* · `Chip quick-reply` ×3 *I'm on my way · I have reached · Running 10 min late* · `TextField text` *Type other message…* · `Button primary brand L` *Send* (`paper-plane-right`) | `check-in-out.md` § 1 (Chat); `bottom-sheet.md` `form`; `chip.md` | — | — |
| **2.02b** · timer | `Timer elapsed L` `attention` — label *Late by* · *1:23*; Check in stays enabled | `check-in-out.md` Edges (late: not blocked); `timer.md` `elapsed`; P6 (no red shouting for a miss) | — | Figma's red *RUNNING LATE −01:23* band (P6) |
| 2.02b · consequence | `Nudge`→ **Banner `warning`** under the earnings card — *Check-in bonus missed · − ₹5*; the card itself is Payout's and is left as is | `nudge.md` l.50 (a lapsed nudge becomes a Banner); `check-in-out.md` § 1 | — | — |
| **2.03** · sheet | `BottomSheet form` over 2.02 — `Heading3` *Enter the code to start* · `BodyLg` *Ask Radhika for the 3-digit code* · `NumericKeypad otp` 3 boxes 48 × 56 (2 filled, active `borderBrand`) · `Button primary brand L` *Start job* (enables on the 3rd digit, auto-submits) · `ghost` *No code? Use her phone number* | `numeric-keypad.md` § `otp` (3 today); `bottom-sheet.md` `form` | — | — |
| **2.03a** · sheet | `BottomSheet form` — `Heading3` *Enter Radhika's phone number* · `BodyLg` *The number she booked with* · `TextField phone` (+91 prefix, *98450 12345*) · `NumericKeypad` (phone) · `Button` *Start job* · `ghost` *Use the code instead* | Figma f09; PRD § 3 "same fallback as Househelp"; `text-field.md` `phone` | — | the old *Start without OTP* (not the shipped fallback) |
| **2.04** · sheet | `BottomSheet info` over 2.05 — `check-circle` fill 40 `iconSuccess` on `bgSuccess` disc · scene stand-in (greeting) · `Heading2` *Job started* · `BodyLg` spoken tip *Say namaste and ask where to set up* · `Button primary brand L` *Start setting up* | `check-in-out.md` § 2 (Job started sheet); `bottom-sheet.md` `info` | — | Figma's *OK* (banned) |
| **2.05** · header | `HeaderNav state` `hourglass` *Get ready* | Figma f11 *Get ready with your things*, cut to the header budget; `icons.md` `hourglass` (*Setting up* state) | — | — |
| 2.05 · timer | `Timer buffer L` ring, **always `calm`** — label *Service starts in* · *8:23* | `timer.md` § `buffer` | — | Figma's green *TIME LEFT* countdown (wrong mode: says her time is running) |
| 2.05 · lead | `BodyLg textSecondary` *Take out your things · Nothing is running yet* | old 1.05; `content.md` § 2 (middle dot) | — | — |
| 2.05 · customer | `Card static` — name row + `IconButton S secondary brand` `chat-circle` · `phone` · Divider · ListItem *Job timing 10:00 – 11:30 am* · *Duration 1 hr 30 min* (`Stat S` trailing) · ShieldRow `off` | old 1.06; `check-in-out.md` § 3 | — | — |
| 2.05 · services | `Heading3` *What you need* · 2 × service card, all open | composition; PRD § 4 | — | — |
| 2.05 · action | `Button primary brand L` *Start service* (`play`) + `BodyMd textSecondary` *Or it starts on its own when this ends* | `timer.md` (she may end the buffer early); old 1.05 | — | Figma's disabled *Complete Job* as the only action (P2) |
| **2.05a** · sheet | old 1.05a `BottomSheet confirm` — *Start the service now?* · *You still have 8 min of setup time. Starting now does not add it to the job.* · `ghost` *Keep setting up* · primary *Start service now* (was *Yes, start now*) | old 1.05a; `content.md` § 3 (a verb, not *Yes*) | — | — |
| **2.06** · header | `HeaderNav state` `clock` *Job in progress* on the shipped green wash | old 1.06 | — | — |
| 2.06 · timer | `Timer countdown L` ring-pill *Time left* · *48:23* `calm` | old 1.06 | — | — |
| 2.06 · customer | as 2.05 | — | — | — |
| 2.06 · services | `Heading3` *What you need* · 2 × service card, all open | composition; PRD § 4 | — | old *See the full list ›* + 1.07 sheet (items now inline) |
| 2.06 · action | `Button primary brand L` *Complete job* (`check`) **enabled, no reason line** | Q20 | — | — |
| **2.06a** · timer | `Timer countdown L` **`urgent`** *14:23* (16 % of 90 min — `timer.md` makes ≤ 20 % urgent) + `Tooltip status` error (computed from the Timer) `warning-circle` *15 min left* pinned under it | `timer.md` § Tones; `tooltip.md` § `status` | — | Figma's red banner (a Banner is a condition; this is a change at the Timer) |
| **2.07** · sheet | `BottomSheet info` over 2.06, dismissible — pictogram stand-in: `list-plus` 40 on `bgBrandSubtle` disc · `Heading2` *Radhika added eyebrow threading* · facts strip `bgSecondary`: `clock-clockwise` *+15 min* · `bag` *2 items* · `BodyLg` *Your job now ends at 11:45 am* · the added service card, open, Tag *Added* · `Button primary brand L` *Got it* · `ghost` *Missing an item? Call help* | Q2 (told, not asked → `info`, one action); `bottom-sheet.md` `info`; `content.md` § 3 (*Got it*); P5 way out (Q23) | facts strip anatomy from `confirm` | Banner with Accept / Decline (`check-in-out.md` Edges — two actions in a Banner, and she can't refuse) |
| 2.07 · sound | new *job changed* sound, then spoken *Eyebrow threading added · Fifteen more minutes* | P4; ask 4 below | — | `sound.newJob` (one sound, one meaning) |
| **2.08** · timer | `Timer countdown L` ring-pill *Time left* · *58:12* (55 % of the new 1 hr 45 min — `calm`, so the Tooltip computes to success) — total grew, ring recomputed — + `Tooltip status` success `clock-clockwise` *15 min added* | `tooltip.md` § `status` (its own example); ask 2 below | — | Figma's hatched ring segment (not in `timer.md`) |
| 2.08 · customer | as 2.06 with *Job timing 10:00 – 11:45 am* · *Duration 1 hr 45 min* + description `BodyMd textSecondary` *15 min added* | P5 (no stale fact — Figma f13 kept *11:00 AM*) | ListItem two-line | Figma's pink *+ 15 min* (brand pink is not a status colour, P6) |
| 2.08 · services | 3 × service card, all open; the third *Eyebrow threading* with Tag *Added* | composition | — | — |
| 2.08 · action | *Complete job* enabled | Q20 | — | — |
| **2.09** · sheet | `BottomSheet info` over 2.08 (Timer behind at *3:23*, `urgent`) — scene stand-in (expert asking the customer — **Beauty scene to register**, ask 5) · `Heading2` *Ask Radhika if she needs anything else* · `Button primary brand L` *Got it* | Figma f15; Q19; `bottom-sheet.md` `info` | — | Figma's cleaning scene (f16) and *Okay* (banned) |
| **2.10** · sheet | `BottomSheet form` over 2.08 — `Heading3` *Enter the code to finish* · `BodyLg` *Ask Radhika for the 3-digit code* · `NumericKeypad otp` 3 boxes · `Button primary brand L` *Complete job* · `ghost` *Radhika can't share the code? Call help* | `check-in-out.md` § 4; `numeric-keypad.md` | — | Figma's *End Job* (vocabulary) and no way out (P5) |
| **2.10a** · page | old 1.08a — `HeaderNav state` *Job completed* · `EmptyState page` *We ended the job for you* · Banner `success` *Your full earnings are safe* · Button *Tell us what you used* — copied, times updated to 11:45 am | old 1.08a; PRD § 5 | — | — |
| **2.11** · sheet | the shipped *What tasks did you do?* sheet slot — `Heading3` left *Products you used* · `BodyMd textSecondary` *Everything below is at the usual amount* · 3 × `Divider labelled` *Fruit facial · 6 items* / *Leg massage · 3 items* / *Eyebrow threading · 2 items* · 11 × `ListItem quantity` 48 dp (Massage cream under two groups) · `Button primary brand L` *Yes, used as expected* · `Button secondary neutral L` *Something was different* | PRD § 6 (its strings); old 1.09; Q7 | Statement row rhythm | Figma's *Facial / Body* grouping, `navigation-arrow` per row (wrong icon meaning), *No i used more/less* |
| **2.12** · sheet | old 1.10 — `Heading3` *What was different* · `BodyLg` *Change only what you used differently* · Divider `labelled` per service · `QuantityStepper` rows (Tier 3, `briefs/quantity-stepper.md`); changed row: `borderBrand` left rule + *+2 pcs vs usual 4* · `Chip reason` ×4 in a `bgSecondary` panel *Why more cotton pads?* · `Button primary brand L` *Save what I used* | PRD § 6; old 1.10 | `ListItem quantity` label | Figma's bare steppers and *Save changes* |
| **2.12a** · sheet | old 1.10a — *Face pack 0 · −1 pc vs usual 1* · *Product ran out* selected · Banner `info` *Face pack goes on your next refill* — copied | old 1.10a | — | — |
| **2.13** · header | `HeaderNav state` `check-circle` fill *Job completed* | `check-in-out.md` § 4 | — | — |
| 2.13 · earnings | Payout's card, copied unchanged from old 1.13 | Q21 | — | — |
| 2.13 · stock | `Banner success` `bag` *11 products came off your stock* | Figma f21 / Lovable 06 (inline banner); `feedback.md` Banner; `content.md` § 4 (success with the number) | — | Figma's *Inventory updated successfully!* (§ 2, § 4) |
| 2.13 · rating | `Title` *How was Radhika?* · `Rating input` five faces 48 dp (asset stand-ins) | `stat-rating-divider.md` § `input`; `check-in-out.md` § 4 | — | — |
| 2.13 · action | `Button primary brand L` *Ready for next job* **disabled** + `BodyMd textSecondary` *Tap a face to continue* | `check-in-out.md` § 4 | — | — |
| **2.13a** · rating | *Very unhappy* face selected, word under the row · `ListItem actionable` `prohibit` *Stop jobs from Radhika* + `Button secondary danger S` *Block* · *Ready for next job* enabled | Figma f22; `check-in-out.md` § 4 (offered after a bad rating) | — | old 1.12's always-visible block row |
| **2.13b** · sheet | old 1.12a `BottomSheet confirm` — *Stop getting jobs from Radhika?* · facts *You can block 5 people · You've blocked 4* · `primary danger` *Yes, block Radhika* · `ghost` *Keep her* — copied | old 1.12a; `bottom-sheet.md` `confirm` | — | Figma's *Are you sure…* / *No · Yes* (§ 9) |
| **2.13c** · sheet | old 1.12b `BottomSheet select` — *You've blocked 5 people* · *That's the most you can block. Unblock one person to make room for Radhika.* · 5 × `ListItem actionable` (name · address wraps · `Button tertiary brand S` *Unblock*) · `ghost` *Leave it for now* — copied | old 1.12b; Figma f24 | — | Figma's truncated addresses (P9) and no way out |
| **2.13d** · page | 2.13 with the block row now `Button tertiary brand S` *Unblock* · `Snackbar` *Radhika is blocked* · *Undo* | Figma f26; `feedback.md` § Snackbar (Undo = the P3 second chance) | — | Figma's red toast over SOS (P6, P7) |
| **cover · lane titles · note** | page furniture | — | — | — |

## Asks of core surfaced by this plan

Landed **before** drawing where they are one line; the rest are named and open.

| # | Ask | Kind | Lands in | When |
| --- | --- | --- | --- | --- |
| 1 | `list-plus` — *A service was added to the job* | icon meaning | `foundations/icons.md` | **now** (2.07) |
| 2 | Timer: **the window grows mid-countdown** — the total grows, the ring and tone recompute from the new total, a `Tooltip status` names the change; no added-time segment | component behaviour | `components/timer.md` § Behaviour | **now** (2.08) |
| 3 | Card `expandable`: where a **Tag** goes when the caret owns the trailing slot — in the description line | component content rule | `components/card.md` | **now** (service card) |
| 4 | A *job changed* sound, distinct from `sound.newJob` | sound | `foundations/sound.md` (not written yet) | open |
| 5 | Scene: *expert asks the customer* (Beauty) for 2.09; Beauty *greeting* scene for 2.04 | asset | `foundations/assets.md` | open — stand-ins on Paper |
| 6 | Beauty variant of the job cycle: start code + phone fallback, buffer, add-on arrives (told, not asked), *Complete job* any time | pattern | `patterns/check-in-out.md` | Step 5 |
| 7 | Labelled action tile (Map · Call · Chat · Street view) | component variant | `icon-button.md` | open (from v1) |

## Change — 2026-09-24 · no buffer; set up, send a photo, then *Job started*

**The ask** (stakeholder, 2026-09-24): *"right now we are not going to do that [the 10-min Getting ready timer]
because we just came to know that these people take 2-3 mins, so in a way we just communicate that set up the
scene properly and take a pic and send it to us, after they take the pic we say job started."*

So the buffer (PRD § 4 *Buffer time*) is **not built**. After the start code she sets up, takes one photo of the
setup, and only then is she told *Job started* and the service clock runs. The PRD stays verbatim; the departure is
recorded in `SCOPE.md` (Q3, Q4, Q25 closed; Q27–Q30 opened) and `DECISIONS.md` 2026-09-24.

**New main line:** 2.03 code → **2.04 Get ready** (set up, then a photo) → **2.05 Photo of your setup** (camera) →
**2.05b Job started** (the result of 2.05) → 2.06 Job in progress. Variant under 2.05: **2.05a Too dark — retake**.
2.05b is lettered, not numbered, so 2.06–2.13 keep the numbers every note and decision already cites; it is the
*success* result of 2.05 as 2.05a is its *fail* result.

**Retired from the board** (moved to a *Dropped 2026-09-24* row on the same page, not deleted): old **2.05 Get
ready — buffer** and **2.05a Start before the buffer ends**. Old **2.04 Job started** is reused as 2.05b.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| **2.03 / 2.03a** · action | `Button primary brand L` **Check in** (was *Start job*) · helper *Checks in when you enter the last digit* | P5: the code no longer starts the job — the photo does; a button that says *Start job* would be false. `check-in-out.md` § 2 (the code is the check-in) | — | — |
| **2.04** · header | `HeaderNav state` `bag` *Get ready* | old 2.05 header; `icons.md` `bag` (*her kit bag — the products she carries*); `hourglass` dropped: nothing is counting down | — | `hourglass` (means time still to run — no longer true) |
| 2.04 · example | **scene stand-in** *A good setup: products laid out in one place* — 16:9 in the slot the Timer held | P1 (show first: what a good photo looks like); `assets.md` § Scenes — new scene, ask 8 | Card `media` 16:9 | — |
| 2.04 · steps | `Heading2` *Set up, then send a photo* · two numbered rows — `ListItem informational` with a number disc as leading (*Put out everything below, in one place* · *Take one photo of your setup*) · `BodyMd textSecondary` *Only your things in the photo — not Radhika* | `list-item.md` `informational`; `content.md` (one idea per line, numbers first); P9 | leading disc = `Stepper` node anatomy, not its line | Stepper (a process across screens; this is two actions on one) |
| 2.04 · customer | as old 2.05 — `Card static` name + chat · call · *Job timing* · *Duration* | old 2.05; `check-in-out.md` § 3 | — | — |
| 2.04 · Kavach row | as old 2.05 (open item c) | — | — | — |
| 2.04 · services | `Heading3` *What you need* · 2 × `Beauty / Service card`, all open | composition; PRD § 4 *Services & inventory shown* | — | — |
| 2.04 · action | `Button primary brand L` `camera` **Take photo** · no timer, no auto-start line | `media-capture.md` § Content (*Take photo*); P2 one next action | — | old *Start service* + *Or it starts on its own* (no clock now) |
| 2.04 · voice | spoken on arrival: *Set up your things, then take one photo* | P4; `media-capture.md` | — | — |
| **2.05** · camera | `MediaCapture preview`, guide **`scene`** (no frame, 16 dp inset), camera-only (no gallery) | `media-capture.md` § `preview`; check-in photos are camera-only | — | `face` guide (the check-in selfie — wrong subject) |
| 2.05 · header | `HeaderNav transparent` — back on a 40 dp disc · **SOS stays** rightmost | `media-capture.md` (SOS on check-in previews, P7); `header-nav.md` `transparent` | — | — |
| 2.05 · instruction bar | 48 dp scrim strip, `BodyLg textInverse` *Get all your things in the photo* (≤ 40 chars, spoken) | `media-capture.md` § Content | — | — |
| 2.05 · shutter | `IconButton L primary brand circle` `camera` 56 dp, bottom centre | `icon-button.md` (one of the two allowed floating controls) | — | — |
| **2.05a** · result | `fail` — `bgErrorSubtle` @ 60 % over the frozen frame · reason `Heading3 textInverse` on the scrim strip *Too dark to see your things* · `Button primary brand L` **Retake**; after 3 fails `secondary` *Call help* joins it | `media-capture.md` § Result `fail` | — | — |
| **2.05b** · behind | 2.06 Job in progress, dimmed, Timer at the full window *1:30:00* (`timer.md` `h:mm:ss`) | `check-in-out.md` § 2 (dismissal lands on in-progress) | — | old 2.04 over the buffer |
| 2.05b · sheet | old 2.04 `BottomSheet info` — `check-circle` fill 40 on `bgSuccess` disc · scene stand-in · `Heading2` **Job started** · `BodyLg` *Photo sent · Your 1 hr 30 min starts now* · `Button primary brand L` **Start work** | `check-in-out.md` § 2 (Job started sheet, *Start work*); `media-capture.md` `success` (*Photo taken*) folded into this sheet rather than shown twice | — | old *Say namaste…* tip (the greeting now happens before setup, on 2.04's arrival) · old *Start setting up* |
| 2.05b · sound | `sound.confirm` + spoken *Job started. Your time starts now* | `check-in-out.md` § 2; P4 | — | — |

**Behaviour written down, not drawn:**

- **The job starts when the photo is taken, not when it has uploaded.** The photo is kept on the phone and sent in
  the background (`media-capture.md` § Behaviour; `patterns/offline.md`). A weak signal never holds her at the
  door with the customer watching.
- **The photo is not checked by a person before the job starts** — the only gate is the on-phone result (too dark,
  blurred). What happens to it afterwards is Q27.
- **Camera permission** is asked through the Permission sheet before the first 2.05, as `media-capture.md`
  requires; denied → the preview's `error` EmptyState with *Allow camera*. Not drawn: shared with every camera.

**Core touched by this change:** `timer.md` `buffer` mode loses its only consumer — marked in the spec, not
deleted (ask 9). `icons.md` `hourglass` loses *Setting up header* as a listed use; it keeps *Duration*. A new
scene (ask 8).

| # | Ask | Kind | Lands in | When |
| --- | --- | --- | --- | --- |
| 8 | Scene: *a good Beauty setup* — products laid out in one place (2.04); reused as the example on any future setup photo | asset | `foundations/assets.md` | open — stand-in on Paper |
| 9 | `buffer` Timer mode has **no consumer** after 2026-09-24 | component | `components/timer.md` | marked now; withdraw at the next release unless a flow claims it |

## Drawn — 2026-09-23

All 27 artboards drawn on page `Job lifecycle · linear` from the rows above: 2.06 by hand as the service-card
master, the rest by four drawing agents, each followed by a reviewer that checked every row, string, token and
font and fixed in place, then a final screenshot pass of every artboard. Corrections made in that pass are already
folded into the rows (timer tones computed from `timer.md`, Nudge above the Timer on 2.01a, verbs on 2.05a, the
2.13c line).

**Board-wide items left open** (each one pass across the page, not a per-screen fix):

| # | Item | Rule it touches |
| --- | --- | --- |
| a | Cards and sheets use the board's radius xl / xxl and 20 side padding with no card border; `card.md` says radius lg + thin border, `bottom-sheet.md` says xl and 16 | `card.md`, `bottom-sheet.md` |
| b | Help and SOS header controls are 40 wide; the target is 48 | P3, checklist row 1 |
| c | *Snabbit Kavach · Activate* row: *Activate* is banned feature-speak; `shield-card.md` draws *Off for this job* + *Start Shield*; waits on the Kavach / Shield naming decision | `content.md` § 8–9 |
| d | Timer L is drawn as the board's 232 × 88 pill with a 3 px border and no drain stroke; `timer.md` has 200 × 88, stroke 6 | `timer.md` |
| e | Stepper `minus` / `plus` are not registered for that meaning | `icons.md` (E3 in a spec) |
| f | `list-item.md` says one IconButton trailing, never a Button; 2.13a / 2.13c put `Button S` in the row (shipped *Block* / *Unblock*) | `list-item.md` |
| g | Sheets cover the header's SOS (P7: never behind a sheet) — true of every sheet on both boards | P7, `bottom-sheet.md` |
| h | 2.01b and 2.02a sit on a plain grey stand-in rather than the dimmed screen behind | board consistency |
| i | Timer digits need `textSuccessStrong`-style text tokens in Paper; calm digits use `--color-success` (= `textSuccess`, per `timer.md`) | tokens 0.20.0 proposals |
