# Scope — Job Lifecycle · Beauty Category

| | |
| --- | --- |
| Slug | `beauty-job-cycle` |
| PRD | `prd.md` — *Job Lifecycle – Beauty Category*, 5 pages, 8 sections |
| PRD received | 2026-09-15 |
| Stakeholder | Rupam Banik |
| Status | **Building** — board rebuilt 2026-09-16 against *Beauty Expert Master*. Spine matched, § 6 re-sited into the shipped sheet. |

## Why this is its own project

The shift PRD and this one are two documents from the same stakeholder describing two different lifecycles. They
were separated at intake on `beauty-shift-lifecycle`'s own evidence: its board carries a placeholder artboard
**1.05 · Jobs — separate PRD** marking exactly where this lifecycle sits inside her day, and its SCOPE logged
*"is the job cycle a separate project"* as open from day one. This PRD arriving as a separate document, and
cross-referencing the other one by name in § 6, settles it.

They meet in **one place only: the shared system**. Nothing is copied between the two folders.

## Standing constraints

| Constraint | What it means in practice |
| --- | --- |
| **This is a delta, not a lifecycle.** The PRD's own summary says most of the flow "is reused exactly as it works today". | Only § 4 (buffer, in-job inventory, extension) and § 6 (inventory check-in) are *invent*. § 2, § 7, § 8 are untouched. § 1, § 3 get one addition each. § 5 gets a logic change with no new screen. **A screen that is not named as changed matches the shipped frame.** |
| **Househelp must not change.** § 6: *"Househelp keeps 'What have you done' exactly as it is today."* | Every § 6 surface is Beauty-only and must be reachable without touching the Househelp path. |
| **§ 6 is not an audit.** *"Does not feed any separate audit or red-card review."* | No accusation, no penalty, no verification theatre in this flow. It is a stock ledger, not a check on her. |
| **Structure is inherited. Beauty content goes inside the shipped screens, not beside them.** Stakeholder, 2026-09-15: *"we need to stick to same design structure as current job lifecycle but build the designs according to beauty requirement."* | `Job States`, the acceptance/check-in bottom sheet, the Job In Progress screen, the OTP sheets, the rating/block sequence and the completion screen are all **matched to the shipped frames**. § 4's buffer is a **new state of the existing in-progress screen**, not a new screen. Only § 6 is a new surface, and it is drawn in the idiom of the post-job sequence it sits in. **This is the opposite of `beauty-shift-lifecycle`**, where the instruction was to design New rows from first principles — that instruction does not travel here. |
| **Structure inherits; banned copy does not.** | Layout, order, component anatomy and placement match the shipped frames exactly. Strings that already fail the repo's lint or principles are still fixed — emoji as icons (*📞 Call SOS Team*, *😊 I am safe, end SOS*), *Are you sure you want to block?*, *Summer Bonus ☀️*, *No storage available.* See the read's *Copy that cannot ship as-is*. |
| **The catalogue is placeholder.** Authorised 2026-09-15 (*"put any names of catalogue"*). | `catalogue-sample.md` holds invented product names, services and usual quantities, chosen for realistic *shape* not content. Real names, units, quantities and images are Category-team data. **Swap before ship.** |
| **In Paper, `position: absolute` anchors to the artboard, not to the parent frame — and `position: relative` on a frame is silently ignored.** | So an overlay (digits centred in a Timer ring, a label over a map) cannot be nested inside the thing it sits on. Compute its **artboard** coordinates and set `left`/`top` against those. `update_styles` reports the drop under `ignoredStyles` — read that field rather than assuming the call worked. Hit 2026-09-15 centring the buffer countdown inside its ring. Together with the flex-column `top`-is-an-offset trap below, this is the main source of layout surprises on this board. |
| Paper board rules carry over from the other project | Tokens by variable; border widths literal px; `fontFamily` set on **every** text node (Paper does not inherit it); artboard children may be flow-positioned, so read `position` before setting `top`. |

## Sits beside

| Existing | Relationship |
| --- | --- |
| `patterns/check-in-out.md` | **This is that flow.** The job cycle already exists in the system as check-in/check-out. Beauty is a variant of it, not a second pattern. |
| `projects/beauty-shift-lifecycle` → **1.05** | The placeholder on that board is this project. Her day contains jobs; this is what happens inside one. |
| **Live inventory** | The integration point. § 6 *writes* the number that the shift project's weekly Auto Replenishment (2.02, 2.06) and nightly bag check (1.11–1.15) *read*. One number, three writers. This is a **shared-system** concern, not a per-project one. |
| `patterns/earnings.md` | § 8 completion earnings. |

## Asks of core

Each is a change to the **shared system**, made per `principles/EXTENDING.md` → *Changing core*, and available to
every other project once landed. None solved privately inside this folder.

| Ask | Kind | Why this PRD needs it | Where it landed | Status |
| --- | --- | --- | --- | --- |
| **QuantityStepper** — `−  6  +` with the expected value inside the control | component (new) | § 6 *Edit quantities*: *"+1 pcs vs usual 1"*. Nothing in core increments a number — `stepper.md` is a process, `numeric-keypad.md` is the money surface, `list-item.md` `quantity` only displays | `components/quantity-stepper.md` + `site/components/quantity-stepper.template.html` | **landed** |
| **Timer `buffer` mode** | component change | § 4 — a countdown that runs *before* the timed thing starts | `components/timer.md` → Modes | **landed** |
| **Chip `reason` kind** — exactly one, no default | component change | § 6 — four fixed reasons after a quantity change | `components/chip.md` → Kinds | **landed** |
| Auto-checkout notice | pattern | § 5.2 — she is checked out by the system 30 min past end and must find out; § 6 still has to happen | `patterns/check-in-out.md` | open — lands with the pattern |
| Vocabulary: *buffer*, *products used*, *usual*, *extension* | vocabulary | § 4, § 6. *Usual* carries the whole § 6 mental model and is defined nowhere | `PRINCIPLES.md` § Vocabulary, `foundations/content.md` | open — lands with the pattern |

**Three decisions worth keeping** from landing these:

- **`buffer` is the one Timer mode that never escalates.** Every other countdown drains toward a cost. A buffer
  drains toward *work starting* — running it green → amber → red would teach her that setting her kit out is a
  race, which is the opposite of why it exists. It holds `calm` to zero and hands over.
- **A changed quantity changes shape, not hue.** `list-item.md` already rules a quantity is never coloured. More is
  not good and less is not bad — both are *different* (P6). Border weight plus the delta line is two channels
  without colour (P1).
- **`reason` is a Chip, not a Radio**, even though `chip.md` itself says exactly-one is Radio. It appears *after*
  she has done the thing; a stacked radio list reads as a form standing between her and finishing, a wrapped row of
  short answers reads as *pick the closest*. It keeps `filter`'s exactly-one and drops its default-selected rule —
  **there is no default reason, because guessing why something happened on her behalf is worse than asking.**

## Answered questions

| # | Question | Answer |
| --- | --- | --- |
| 1 | Is the job cycle part of `beauty-shift-lifecycle` or its own project? | **Its own.** Settled 2026-09-15 on the arrival of this PRD. See *Why this is its own project*. |
| 2 | Is the Extension booked, or added mid-job? | **Taken as booked**, 2026-09-15 — designed as visibility, not a flow. The only line written as an *acceptance criterion* is § 4's: *"If customer has added an addon service **during the booking** then the visibility should be given to expert at both time and service level."* The summary's *"paid extensions"* and § 8's *"added during the job"* are looser prose, and the shipped board has no extension flow — only the status line *Job extended by 15 min* (`9:8300`). So: the addon shows on acceptance, check-in and in-progress at both time and service level, and lands in § 8 earnings. **If mid-job was meant, that is a separate five-ish screen flow** — offer, customer consent, price, timer extension — and none of it is drawn. Flagged, not assumed away. |
| 3 | Product names for § 6? | **Placeholder, authorised.** See `catalogue-sample.md`. |
| 10 | Where does *What have you done* live? | **Found, 2026-09-16.** It is ***What tasks did you do?*** `152:80881` in *Beauty Expert Master* — a bottom sheet after the end-job OTP whose **body is an empty dashed placeholder**. The container exists and is undesigned. § 6 fills it. |
| 13 | Block cap — carried as-is or fixed? | **The number is 5** (*5/5 People blocked*). The board said 3; corrected 2026-09-16. The shipped string still names no count, so our *You can block 5 people. You've blocked 4.* stands as the fix. |
| 14 | Is *Accept Job* green deliberate? | **Yes — landed in the system**, 2026-09-16. New Button tone **`accept`**, `primary` only, allowed **only where a `danger` action sits beside it**. Not the removed *Success* style: that was green as decoration or result; this is *take* told apart from *decline* without reading (P6, P3). Tokens `interactiveAccept` green.700 / `interactiveAcceptPressed` green.800, 5.5:1 on white. |
| 15 | Where do Beauty's services + products go on the acceptance screen? | **Delegated to me, 2026-09-16** (*"take a call based on prd"*). **A second card under the earnings card, with the earnings breakdown collapsed to its shipped one-line form.** Reasons: the shipped earnings card's grammar is `label … ₹amount` and products carry no price, so they cannot be rows in it; § 1 lists earnings *last* among what acceptance shows; and the collapsed form is **already a shipped state** (it is what Check In uses), so nothing new is introduced and ~200 px is freed without scrolling a 1:23 decision. |

## Open questions

| # | Section | Question | Raised |
| --- | --- | --- | --- |
| 2 | § 4 vs summary vs § 8 | **Is the Extension booked or added mid-job?** § 4 says the addon was added *"during the booking"*; the summary says *"paid extensions"* and § 8 says *"added during the job"*. If mid-job, an entire flow is missing — how she offers it, how the customer consents, how it is priced. The shipped board has no extension flow, only a status line *Job extended by 15 min* (`9:8300`). | 2026-09-15 |
| 3 | § 4 | **How long is the buffer?** *"a fixed buffer window"* — no duration given. The shift PRD specifies 10 minutes for the lunch buffer; is this the same number? | 2026-09-15 |
| 4 | § 4 | **Is the buffer paid?** The service timer has not started. If it is unpaid, that is a money change she must be told about plainly (P6). If paid, say so on the screen. | 2026-09-15 |
| 5 | § 6 vs shift § 5 | **The two PRDs disagree on trust.** Shift § 5 asks for *"2 rotating spot checks on random carry items"* because *"blind confirming gets caught"*. Job § 6's happy path **is** a blind confirm — one tap covering every product on the job — and explicitly rules out audit and red cards. Both cannot be the policy. | 2026-09-15 |
| 6 | § 5 + § 6 | **What happens to the inventory check-in on an auto-checkout?** If the system checks her out at +30 min, does she still get the products screen, and when? | 2026-09-15 |
| 7 | § 6 | **Grouped by service** — if two services on one job use the same product, is it listed twice or summed? The deduction must not double-count. | 2026-09-15 |
| 8 | § 6 | **A reason per changed line.** Five differences means five reason picks at the end of a job. Is that intended, or is one reason per report enough? | 2026-09-15 |
| 9 | § 6 | **Can live inventory go negative** if she reports using more than she is carrying? What does the next Auto Replenishment do with that? | 2026-09-15 |
| ~~10~~ | § 6 | ~~*What have you done* is not in the shipped section~~ — **answered 2026-09-16**, see above. | 2026-09-15 |
| 11 | § 2 | **No denial-reason screen exists** in the shipped section, though **Deny** appears on 5 frames. *"Same denial reasons as Househelp, few could be added based on category"* — what are today's reasons, and which are added for Beauty? | 2026-09-15 |
| 12 | § 1 / § 3 / § 4 | The same *services + products/quantities* block is required on **three** screens. One component used three times, or three different densities? Acceptance is a decision, check-in is preparation, in-progress is reference. | 2026-09-15 |
| ~~13~~ | § 7 | ~~The cap is never stated~~ — **answered 2026-09-16**: the cap is **5**. |
| 16 | § 1 | **Does the acceptance screen show the customer's name and address?** The PRD says it *"continues to show date/time, customer, and address, same as today"* — but the shipped accept screen shows **none of them**; the customer first appears after accepting, on Check In. Showing a name and a home address before a job is accepted is a privacy call, not a design one. The board currently shows the **time window** (a real decision input) and leaves name and address to Check In. | 2026-09-16 |
| 17 | § 4 | **Does Beauty get a *Customer preferences* block?** Cook fills that slot with spice and oil level; Beauty's board fills it with *What you need* (services + products), per § 4. If Beauty has its own preferences — skin type, allergies, patch test — they are not in the PRD and there is nowhere to put them. | 2026-09-16 |
| 18 | § 4 | **Does *Your cooking space* (add photos of what you made) have a Beauty equivalent?** Before/after shots are the obvious analogue and are **not** in the PRD. Drawn as absent. | 2026-09-16 |

## Log

| Date | What happened |
| --- | --- |
| 2026-09-16 | **New screen file; board rebuilt against it.** Stakeholder supplied *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO` → `Job lifecycle` `34:41693` → section `152:78592`, **62 screens**, and asked to stick to it so the devs rebuild nothing. Registered in `references/SCREENS.md`; read written to `reads/job-lifecycle-beauty-master/FRAMES.md`. **The finding that reframes the project: that page is the Cook job lifecycle** — spice level, oil level, recipes, *Add photos of dishes you cooked*, *COOOOKS*, *Dosa* — with no Beauty string in 62 screens. It is the category-agnostic shell with one category filled in, so the structure is inherited and none of the content is. It **is** built on our token values (`#F70F79`, `#FBC9DF`, `#111827` all sampled), so the drift is semantic, not palette. **One core change landed first** (nothing drawn before it): Button tone **`accept`** + tokens `interactiveAccept` / `interactiveAcceptPressed` + `green.800`, tokens 0.20.0, accessibility pairs measured, site rebuilt, lint clean at 0/0. **Four screens were wrong and are rebuilt**: 1.01 had a full-bleed map and led with the customer — the job cycle has **no map anywhere** and leads with earnings, so it is now the shipped earnings card (collapsed to its shipped one-line form) plus a Beauty job card, with **Deny** restored; 1.03 is now the shipped four action tiles (Map · Call · Chat · Street view) with *Listen* on the address; 1.06 is now a **ring-pill** timer on a green gradient with *Job timing* and *Duration* inside the customer card, and *What you need* taking the slot Cook gives *Customer preferences*; **1.09–1.11 moved inside the shipped *What tasks did you do?* sheet**, whose body is an empty dashed placeholder — the devs keep the container they already built. Block cap corrected **3 → 5** on 1.12a/1.12b with two list rows added. Cover and a new board note rewritten to name the file and the four changes. Three open questions raised (16 customer/address on acceptance — a privacy call, not a design one; 17 whether Beauty has a *Customer preferences* equivalent; 18 whether *Your cooking space* has one). Font sweep: every text node resolves `"Outfit", system-ui, sans-serif` — Outfit first, which is the correct fallback stack. |
| 2026-09-15 | **Board complete — 24 screens + cover, 11 variants drawn and stitched.** Variants sit under the step they branch from, same convention as the shift board: **1.01a** Deny (last-hour job; *I can't take this one* rather than a bare **Deny**), **1.01b** Denial reasons as an explicit *inherited, not on the board* marker citing Q11, **1.03a** Running late, **1.04a** No OTP (*No OTP? That's fine* · *Nothing is deducted for starting this way*), **1.05a** Start before the buffer ends, **1.06a** Extension booked, **1.08a** Checked out for you, **1.09a** Nothing to change, **1.10a** Ran out — down to zero, **1.12a** Don't send me again, **1.12b** Block list is full. Font sweep clean again: **0 `system-ui` nodes** across the whole page. Decisions worth keeping: **1.08a states the fact and protects the money in the same breath** — *We ended the job for you · It ran 30 minutes past 11:15 am and no OTP was entered* + *Your full earnings are safe* — and still routes to § 6 via *Tell us what you used*, which answers the mechanics half of Q6; **1.10a proves zero is a legitimate answer** (`−` disabled, *−1 pcs vs usual 1*, *Product ran out* selected, and *Face pack goes on your next refill* closing the loop to Auto Replenishment); **1.12a and 1.12b state the block cap as a number** (*You can block 3 people. You've blocked 1.*), fixing the shipped string *Unblock someone to block Radhika S* which names a constraint without ever giving the count — Q13; **1.06a shows the extension at both time and service level** as § 4 asks, labelled *Booked when she booked the job* so the assumption behind Q2 is visible on the screen itself. |
| 2026-09-15 | **Main line complete — 13 of 13 screens drawn, stitched with arrows.** 1.01 New job · accept in → 1.02 Products for this job → 1.03 Check in · what to prepare → 1.04 Enter OTP to start → **1.05 Setting up (buffer)** → 1.06 Job in progress → 1.07 What you need (in-job reference) → 1.08 Enter OTP to end → **1.09 Products you used** → **1.10 What was different** → **1.11 Saved · stock updated** → 1.12 Rate the customer → 1.13 Job completed · you earned. Font sweep verified clean: **0 `system-ui` text nodes** on the page, because `fontFamily` was set on every text node at write time rather than on the frames. Decisions worth keeping: **1.02 and 1.07 are the same list at two moments** — a full page before you go, a sheet during the job with *Nothing to tick. This is just the list.*, which keeps it a reference and stops it becoming a second checklist; **1.09's primary is *Yes, used as usual*** with *Something was different* as a quiet ghost, matching § 6's own instruction that only differences need touching; **1.10 shows reason chips only under the row that changed**, so an untouched list asks nothing; **1.11 names the consequence** — *9 products came off. Your next refill is worked out from this* — which is the § 6 → Auto Replenishment link stated in her words; and **1.13 carries a stock line** so the job's earnings and the job's consumption are seen together. 11 variants still to draw. |
| 2026-09-15 | **Core gaps closed, board started.** Three changes landed in the shared system before anything was drawn: **QuantityStepper** (new component + live page — the only control in the system that increments a number), **Timer `buffer` mode**, and **Chip `reason` kind**. Site rebuilt, lint clean, 40 specs. Tier pass written: **28 surfaces — 17 match, 5 fill, 3 new state, 6 new**, no Tier 0 and no Tier 3. Placeholder catalogue authorised and written to `catalogue-sample.md`. Paper page `Job lifecycle` (`3-1`) started at **393 × 852** (matching the shipped job board, not the shift board's 360 × 800): cover + lane title + **1.01 New job · accept in**, **1.02 Products for this job**, **1.03 Check in — what to prepare**, **1.04 Enter OTP to start job**, **1.05 Setting up — buffer**. The buffer screen is the first proof of the new Timer mode: green to zero, *Setting up* above the digits, *Your service time starts after this. Nothing is running yet*, and an explicit *I'm ready, start the service* so the floor is hers to leave. 8 main-line screens and 11 variants still to draw. |
| 2026-09-15 | **Project created; `ACTIVE` switched from `beauty-shift-lifecycle` to `beauty-job-cycle`.** PRD transcribed verbatim into `prd.md` (5 pages, 8 sections). Shipped Househelp job board read into `reads/job-lifecycle-shipped/FRAMES.md` — section `19:18372` on page *Job Lifecycle* `0:1`, **70 screen frames, 1076 instances, 47 components**. Findings: the board is already component-composed and **shares its library with the shift board**, so reconciliation is renaming, not introducing; `Job States` (46 uses) is the state machine itself; the same unnamed Tier 0 components (`Component 19/21/39/17/8`, 29 uses) appear here as on the shift board. **Two gaps that change the plan: "What have you done" does not exist anywhere in the shipped section** (so we cannot see what § 6 replaces — Q10), and **there is no denial-reason screen** despite Deny appearing on 5 frames (Q11). § 4's buffer has no shipped equivalent, and Extension exists only as the status line *Job extended by 15 min*. Also corrected an error in the other project's read: section `138:38552` is on page **Shift Lifecycle** `28:18373`, not `0:1`. 12 open questions raised, 4 blocking (Q2, Q5, Q6, Q10). Next: Step 2, the tier pass. |
