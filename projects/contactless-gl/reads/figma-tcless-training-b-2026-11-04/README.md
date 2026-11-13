# Reference read — *Expert App 2.0* → page **🏋️‍♀️TC Less training** (lower half: training, knowledge check, post-training, app education)

Read for project `contactless-gl`, surfaces 25–33 and 44–47 of `TIERS.md`. Read-only; nothing in Figma was changed.

## Source table

| | |
| --- | --- |
| File | Figma *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM` · page *🏋️‍♀️TC Less training* `29584:61907` |
| Sections read | `32725:192015` **TRAINING - PRE GOLIVE (v2)** 139 children (94 phone frames read) · `31833:51169` **TRAINING - PRE GOLIVE** (v1) 99 children (89 frames read, deltas only) · `32145:22893` **KNOWLEDGE CHECK - Farhan** 37 children (17 frames + 20 question notes) · `32145:34067` **POST TRAINING - APP** 35 children (31 frames) · `33450:44695` **App Education** 114 children (77 frames; Step 1 strings for the first 20, one line each for the rest) · Sections 1, 2, 3, 4, 6 — one line each (§ Other sections) |
| Frames | 308 crops in `crops/` (`v2-`, `v1-`, `kc-`, `pt-`, `ae-` + running number + frame id); section renders `section-*.png` |
| Date · reader | 2026-11-04 · Claude (agent B of the TC-less page read), for Rupam Banik |
| Shipped vs proposed | Nothing on this page is marked shipped. **v2** is the newest training iteration (newer ids `33563`, `35410`, `35427`, `35468`, `35588` sit on top of `32725`); **v1** is the iteration before it; the five numbered sections are older still. Read for structure and strings; the shipped onboarding remains *Self-Serve ER/AR* (`patterns/onboarding.md`) |
| Method | `get_metadata` on each section (saved to file, parsed with Python for depth-1 frames with x/y) → one `get_screenshot` per section at maxDimension 6 000–8 000 → PIL crops by frame coordinates (+38 px render offset, measured) → read on 4-up / 6-up contact sheets. v1 and Knowledge Check render **dimmed** in Figma (a dark overlay sits above them on the canvas); v1 crops were brightened ×2.2 to read, so colours in the v1 crops are not evidence |
| Figma failures | The MCP **tool-call rate limit** was hit mid-run: three row-label frames of v2 (`32725:195342`, `195360`, `195362`) could not be screenshotted individually and were read from the section render instead (`195360` and `195362` have no label text — they are empty pink cards). `get_metadata` on every section exceeded the tool's output limit and was parsed from the saved file (all five read in full). No frame was skipped for lack of a render; strings in v2 and App Education were read at ~2.4× crop scale and are reliable; v1 strings were read through the dim overlay and are reliable for titles and buttons, less so for 12-sp helper text, which is marked *(dim)* where uncertain |
| Skipped and why | **Section 2** (8 image-only frames: a "Bathroom Challenge" game concept) read as one line; **Sections 1, 3, 4, 6** are earlier iterations of what v1/v2 superseded, read as one line each; the upper half of the page (registration, KYC, work area) belongs to agent A |

## Step 1 — what is there

Three header shells recur across the page and are named once here:

- **Training shell** — HeaderNav with back · title *Training* / *Snabbit Training* / *Knowledge check* / *Final Assessment* · subtitle (*Currently playing : Intro…*, *Intro to Snabbit*) · a **Call** pill (phone icon) · a **language** pill (translate icon + chevron). Under it a thin **segmented progress** (4 segments on the player, 5 on the knowledge check, 4 on the final assessment) — never a count.
- **Player shell** — full-bleed video (a real expert sweeping / dusting / with a pink arrow overlay), centre play ▶ / replay ↻, pill *00:36/01:00*, a pink scrubber, the mascot bottom-right with a speech bubble.
- **Home shell** — the live Home (map, bell, *SOS* / *Saathi* / *30* coin pills, *Searching for jobs nearby*, *More From Snabbit* refer card *Refer and earn upto ₹4000* · *Refer Now*, tab bar *Home · Earnings · Refer (₹4000 badge) · Profile*).

The mascot — **"Saathi"**, a cartoon expert in the pink polo (full-body sheet `32725:201183`, `32269:28632`) — appears on almost every training screen: as a coachmark speaker, as a "reader" that sits on each option while it is read aloud, and as a floating help button (FAB).

### 1a. TRAINING - PRE GOLIVE (v2) — `32725:192015`

Top banner (`33563:54974`, 7252 × 208, label-only frame): read from render as a wide pink title strip; text not legible at section scale and the individual screenshot was rate-limited — **not read**. Second banner `33563:53697` likewise.

**Row 1 · "First time" (happy path)** — label `32725:195342` (rate-limited; title read from the v1 twin as *First time*)

| # | Frame | Screen | Strings (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1 | `32725:201277` *Finished* | TC booking confirmed (the entry screen, carried over from the TC flow) | *Training Confirmed* ✓ · *Your Timings* · *Change* · *Day 1 - 7 Feb, Friday* · *10:00 AM - 5:00 PM* · *Day 2 - 8 Feb, Saturday* · *Training Centre Details* · *Change* · *Koramangala Training Center* · *HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru* · *Landmark* (dim) · **Start Training** · **Call Trainer** | back · voice bar (play, slider, speaker) · timings list · centre card with 3 photos · two buttons |
| 2 | `32725:195366` | Transition video, still 1 | header *Training* · *Call* · language | Training shell · full photo of an expert holding her phone (video still) |
| 3–5 | `195375` `195386` `195397` | Transition animation | — | mascot in a circle rising over pink bar-chart steps; last frame bars only |
| 6 | `195407` | Welcome | *Welcome to Snabbit Training* · *Let's become a* [5★ pill] *Expert together.* | grey stage · mascot in circle · Heading · line |
| 7 | `195422` | Meet the mascot | *Hey I am your Saathi, I'll help you with your training process* · *Snabbit Trainer* · *We will teach you everything step by step* | mascot + speech bubble · Heading · line |
| 8 | `208948` | **Training home** | header *Snabbit Training* · *Welcome to Snabbit Training* (books-and-gift illustration) · module rail *Intro* (selected, phone icon) · *Payouts* 🔒 · *Apps* 🔒 · *Grooming* 🔒 · *T…* 🔒 · *Chapters* *1/6* · cards *Introduction to Snabbit* (▶, *10s left*) · *How to become a Snabbit Expert* 🔒 ×3 · **▶ Start Training** | Training shell · hero line + illustration · horizontal module rail (circles with lock) · progress bar with count · 2-column video-card grid · primary button |
| 9 | `209510` | Coachmark 1 | *These are the lessons you have to complete* | scrim · mascot · bubble pointing at the grid |
| 10 | `209793` | Coachmark 2 | *Tap this video to start your first lesson* | scrim · first card lifted |
| 11–13 | `194328` `194350` `194378` | Player | *Training* · *Currently playing : Intro…* · *00:36/01:00* · *00:30/01:00* | Player shell · 4-segment progress |
| 14 | `194515` | Video ended | **Practice** (half-tone pink button) | replay ↻ · one button |

**Row 2 · "Knowledge check"** — label `33550:51609`

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 15 | `33550:51611` | Video ended → check | **Knowledge Check** | replay · button |
| 16 | `32725:194632` | Question, 4 images | header *Knowledge check* · *Intro to Snabbit* · *Customer ke valuables dikhne par aap kya karenge?* · options *Earn Money* · *Watch TV* · *Shopping* · *Gaming* · **Choose an option** (disabled) | Training shell (iPhone status bar) · 4-segment progress · question + mascot avatar · 2×2 image radio cards · disabled primary |
| 17–20 | `194768` `194813` `194677` `194722` | Read-aloud states | same | the mascot sits on one card; the others go greyscale while that option is read |
| 21–22 | `194542` `194587` | Reading done | same | all cards in colour, none selected |
| 23 | `194859` | Selected | *Earn money* (selected) · **Continue** | pink border + filled radio · primary enabled |
| 24 | `194905` | Multi-select | *Which two benefits does Snabbit offer?* · ☑ *Insurance* · ☐ *Free car* · ☑ *Early payout* · ☐ *Gifts* · **Submit** | 2×2 checkbox image cards (grey placeholders) |
| 25 | `194946` | **Module complete** | ✓ *Completed* · *Intro to Snabbit* · *Up next : Module 2* · *Payout's and rate card* · **Next module** | green confetti band with cheering illustration · module rail (1 ✓, next ringed, rest 🔒) · up-next row · primary |
| 26 | `35410:54788` | Same, illustration placeholder | same | grey circle where the scene goes |

**Row 3 · "Final assessment"** — label `33563:51829`

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 27 | `33563:51831` | Last module complete | ✓ *Completed* · *Final module* · *Up next* · *Final assessment* · **Start Final Assessment** | rail all ✓ |
| 28 | `33563:53373` *Landing screen* | Assessment intro | *FINAL ASSESSMENT* · *Show you're ready to be an Expert* · **Start now** (dark navy button) | full illustration (expert at a desk with phone, stopwatch) · eyebrow · Heading · button |
| 29 | `52904` | Yes/No question | header *Final Assessment* · *Call* · language · ◯ *05:48* · *2 of 15* · *Have you cut vegetables before?* · ✕ (red) · ✓ (green) | 4-segment progress · timer + count card · question + mascot · oval illustration · two square buttons |
| 30 | `53325` | Two images | *Select the correct image from options* · *Earn Money* · *Earn Money* (speaker icons) · **Continue** | 2 tall image radio cards |
| 31 | `52720` | Four images | *Earn money* selected · **Continue** | 2×2 with speaker icon per option |
| 32 | `52801` | Multi-select | *Which two benefits does Snabbit offer?* · *Insurance* ☑ · *Early payout* ☑ · **Submit** | |
| 33 | `52876` | Hotspot | *Select what is wrong in this image* · **Submit** | kitchen illustration with dotted hotspot rings (dish rack, pipe on floor) |
| 34 | `52326` | **Assessment passed** | ✓ *Assessment Completed* · **Claim certificate** | green confetti band · cheering illustration · half-tone primary |
| 35 | `33807:93058` *Landing screen* | **You are an expert** | *YOU ARE NOW A* · *Snabbit* · *Expert* · **Start working** | pink gradient · photo of an expert, thumbs up · one button |
| 36 | `35468:55488` | Module-complete skeleton | — | rail + up-next, no illustration |

**Row 4 · "Watching video"** — label `32725:195346`

| 37–39 | `194311` `194267` `194284` | Player states | *00:30/01:00* | playing · different clip (dusting) · paused |
| 40 | `194489` | Ended + coachmark | *Start your first assessment now* · **Knowledge Check** | mascot bubble |
| 41 | `194407` | Help sheet 1 | *Need help?* · **Call trainer** | bottom sheet over the player, grey illustration placeholder |
| 42 | `194462` | Help sheet 2 | *Trainer will call you in 24 hours* · **👍 Okay** | sheet with a nurse-like illustration, thumbs-up icon on the button |
| 43 | `35588:56182` | empty frame | — | — |

**Row 5 · "Abandon mid-video"** — label `32725:195344`: 44 `208599` training home with the back arrow, card *Introduction to Snabbit* *10s left*, **Continue Training** (+ ⓘ icon); 45 `208263` scrim + *Finish this video to open the next training video*.

**Row 6 · "Abandon after all videos"** — label `33563:53699`: 46 `33563:54176` home with *Chapters* *6/6* ✓ (green bar), 4 cards ✓, a bottom card 📋 *Start your knowledge check* + **Start knowledge check**.

**Row 7 · "Assessment templates"** — label `32725:195352` (header *Training · Currently playing : Learn*): 47 `195668` yes/no (*Have you cut vegetables before?* — the first half of the title dark, the second grey = read-aloud highlight) · 48 `196496` two images *Take it and run away with it and hide it* / *Show it to customer and hide the stuff* (sic) **Continue** disabled · 49 `195436` four images **Choose an option** disabled · 50 `195528` multi-select **Submit** · 51 `195611` hotspot **Submit** disabled.

**Row 8 · "Module completion" (training-home states, 1183 tall)** — label `32725:195350`: 52 `206270` *Chapters 1/6*, **Start Training** ⓘ · 53 `206488` same · 54 `206700` *2/6*, **Continue Training** · 55 `206861` *4/4* green · 56 `206998` *6/6* + 📋 *Start your knowledge check* + **Start Assessment** · 57 `207170` *Intro* ✓ in rail, **Start Payouts** · 58 `207357` *Payouts* ringed, *Chapters 1/6*, **Continue Training** ⓘ · 59 `33563:53701` *6/6* + **Start Assessment** · 60 `33563:53928` *Payouts* ✓, **Start Apps**.

**Row 9 · "Assessment failed"** — label `32725:195356`

| 61 | `197623` | **Assessment failed** | ✕ *Assessment Failed* · *Correct Answers* **7** (green tile) · *Wrong Answers* **8** (red tile) · **Rewatch videos** | illustration (expert pointing at her phone) · red ✕ badge · two stat tiles · one button |
| 62 | `197804` | + coachmark | *You need to see some videos and try again* | scrim · mascot · illustration placeholder |
| 63 | `33305:45233` | Rewatch player | *00:30/01:00* | |
| 64 | `199093` | Ended | **Start final assessment** | replay |

**Row 10 · "Right / Wrong answer"** — label `32725:195358`: 65 `196634` two-image radio, **Confirm** · 66 `196662` correct → left card green border + confetti, green sheet ✓ *Correct answer!* **⏭ Continue** · 67 `196893` wrong → red border, red sheet ✕ *Wrong answer.* **⟲ Watch video again** · 68 `198588` final-assessment yes/no wrong: illustration greyscale, *Wrong answer.* **Watch video again** (and the *05:48 · 2 of 15* card stays).

**Row 11 · "FAB"** — label `195360` (empty): 69 `204879` home **Start Training** ⓘ · 70 `205520` scrim + *If you're stuck, you can tap here for instructions* pointing at the mascot bottom-right · 71 `205087` · 72 `205295` mascot highlighted.
**Row 12 · "Locked videos"** — label `195362` (empty): 73 `205962` home, locked cards.
**Row 13 · Mascot** — 74 `201183` full-body Saathi (pink polo *Snabbit*, black trousers, black shoes).

**Row 14 · "Accessibility and answering (KNOWLEDGE CHECK)"** — label `32725:195348` (3076 tall)

| 75–78 | `200081` `199253` `199667` `200495` | yes/no read-aloud | title two-tone → ✕ red/✓ grey → ✕ grey/✓ green → both coloured | the mascot sits on the option being read |
| 79–82 | `200909` `200977` `201045` `201113` | two-image read-aloud | … 82: Hindi title *Snabbit expert अपने बाल कैसे बनाती है*, card 1 selected, **Continue** enabled | one card greyscale while the other is read |
| 83–86 | `199177` `199196` `199215` `199234` | hotspot read-aloud | **Submit** disabled | image dimmed; the mascot moves over each hotspot |
| 87–89 | `33522:51094` `51217` `51383` | final-assessment four-image | *Earn money* · **Continue** | same mechanic |

**Row 15 · "Updated colors" intro** — label `35427:477677`: 90–92 `477849` `477937` `478025` mascot rising over paler pink bars · 93 `478113` *Welcome to Snabbit Training* · *Let's become a* [5★] *Expert together.* on a white-to-pink gradient · 94 `477758` + *Hey I am your Saathi, I'll help you with your training process*.

### 1b. TRAINING - PRE GOLIVE (v1) — `31833:51169` — only what differs from v2

Rows (labels read): *First time* · *Continuing from last video* · *Watching video* · *Module completion* · *Assessment templates* · *Final assessment* · *Assessment failed* · *Right/Wrong answer* · *FAB* · *Locked videos* · *Accessibility and answering (KNOWLEDGE CHECK)*. Same order and most of the same frames as v2.

| Where | v1 | v2 | What v2 changed |
| --- | --- | --- | --- |
| Training home `31833:51170` `32313:461209` | module rail *Intro · Payouts · Apps · Grooming · Tech Skills*; section title **Intro to Snabbit** *0/6*; **six** cards in a 3-column grid; a **Knowledge check** card (📋, 🔒 → ✓) under the grid (`31833:51435` `51710`); buttons *Start Training* · *Continue Training* · **Start Assessment** · **Start Payouts** · **Download certificate** (`32446:110516`, all modules ✓) | section title **Chapters** *1/6*; 2-column grid of larger cards; knowledge-check card appears only when 6/6; no certificate button; **Claim certificate** moves to the assessment-passed screen | Bigger targets (P3); the certificate becomes a moment, not a row |
| Player | mascot bubble *Pay attention to the video You'll be tested* (`31840:54431`) | bubble dropped on the player; coachmarks only on home | one line less (P1) |
| Help sheets `31877:55825` `55898` `32661:185631` | *Need help?* **Call trainer** → *Trainer unavailable* **Ask trainer to call me** → *Trainer will call you in 24 hours* **Continue** | *Trainer unavailable* step removed; button *👍 Okay* | — |
| Knowledge-check question (`31833:51965`…) | iPhone status bar *12:15*, 3-segment progress | 4-segment | — |
| Assessment failed `32366:24089` | illustration is a grey circle placeholder | illustration drawn | — |
| Passed `32366:23730` → `32456:112007` → `32603:44875` | *Assessment Completed* **Claim certificate** → *YOU ARE NOW A Snabbit Expert* · *CONGRATULATIONS!* · *You are now a Snabbit Expert!* **Continue** → a dim frame *CONGRATULATIONS!* · *You have successfully passed your Training!* **Continue** (dim) | one screen, **Start working** | the congratulation is said once |
| Final-assessment intro `32434:110151` | **Continue** (dark) | **Start now** (dark) | verb |
| Wrong answer `32190:460067` | red sheet *Wrong answer.* **Watch video again** | same + the illustration goes greyscale | — |
| Right answer `32190:459882` | green confetti + *Correct answer!* **⏭ Continue** | same | — |
| Knowledge-check timer card | absent | *05:48 · 2 of 15* on the final assessment only | — |
| Mascot sheet `32269:28632` | same drawing | same | — |

Not in either: a certificate screen itself, a lockout screen, an attempts-left counter, a "which topics were wrong" list.

### 1c. KNOWLEDGE CHECK - Farhan — `32145:22893`

The question bank, written on the canvas as text notes (verbatim, Hinglish), grouped by module:

- **BATHROOM CLEANING** — *Choose the right image Q- Fixtures ke liye sahi scrubber chunein Sponge(y) green scrubber(N)* · *Choose the right image Q- Customer ke valuables dikhne par aap kya karenge? A- Expert picking valuable (N), Expert directing towards the valuables asking customer to pick it (Y)* · *Tick and Cross Q- Kya floor ko bina squeegee/sukhaye chhod dena sahi hai? A-No (slip hazard) or cross*
- **CUSTOMER DELIGHT** (`33291:43238`, no note text)
- **UTENSIL CLEANING** — *Tick and Cross Q- Kya utensils ko achhi tarah rinse karna zaroori hai taaki soap na reh jaye? A-Yes* · *Tick and Cross Q-Kya khane ke scrap laga hua utensil bina saaf kiye dhona theek hai? A-No*
- **SWEEPING AND MOPPING** — *Choose the right image Q- Sweeping karne ka sahi posture kaunsa hai? A- Standing (N) Squatting(Y)* · *Choose the right image Q- Safai kis direction mein karni chahiye? A- Andar se bahar (inside to outside) (Y), Bahar se Andhar (Outside to inside) (N)* · *Tick and Cross Q-Kya har room ka kachra agle room jaane se pehle nikalna zaroori hai? A-Yes*
- **BEDMAKING** — *Tick and Cross Q-Kya aap customer se poochenge ki bedsheet badalni hai ya purani hi rakhni hai? A- Yes* · *Choose the right image Q-Kya aap customer se poochhe bina unke valuables khud move karenge? A-Expert picking valuable (N) Expert directing towards the valuables asking customer to pick it.(Y)* · *MCQ Q-Bed banate samay pillow aur duvet ko kahan rakhna sahi hai? A-Chair ottoman stool floor (wrong)*
- **LAUNDRY** — *MCQ Q-Laundry mein kya kya aap nahi karoge? A-Joote dhona Chaadar/Razai/parde dhone Haath se kapde dhona - wrong answer Safed or rangeen kapdo ko saath dhona*

Frames (header *< Assessment (5 of 10)* + language pill, **no Call pill**; 5-segment progress; card ◯ *05:48* | *1 point*; question + mascot avatar; options with speaker icons):

| # | Frame | Type | Strings |
| --- | --- | --- | --- |
| 1 | `33291:42856` | two images | *How should the nails be?* · *Short and clean* (selected) · *Long Nails* · **Continue** |
| 2 | `32852:34022` | two images | *Choose the correct scrubber for bathroom fixtures.* · *Sponge* · *Green Scrubbber* (sic) |
| 3 | `32852:34157` | two images | *What should you do if you see the customer's valuables?* · *show it to the customer* · *Take it* |
| 4 | `32853:34605` | yes/no | header *Training · Currently playing : Learn* · *Is it correct to leave the floor without using a squeegee or drying it?* · ✕ ✓ |
| 5 | `33291:43239` | two images | *If a customer complains, what should you do first?* · *Listen calmly and apologise* · *Argue with the customer* |
| 6 | `33291:43631` | two images | *What should you do if something breaks while you are working?* · *Inform the customer immediately, then call the helpline* · *Hide it and leave* |
| 7 | `33299:44612` | two images | *What should you do if 5–10 minutes are still left?* · *Ask if there is any more work to do* · *Check out from the job* |
| 8–9 | `32859:34677` `34753` | yes/no | *Is it necessary to rinse utensils thoroughly so that no soap remains?* (two illustrations: plate at sink; dirty plate) |
| 10 | `32874:35153` | two images | *What is the correct posture for sweeping?* · *Standing* · *Squatting* |
| 11 | `32868:35014` | two images | *In which direction should cleaning be done?* · *From inside to outside* · *From outside to inside* (dim) |
| 12 | `32864:34885` | hotspot | *Select what is wrong in this image* · living-room illustration, pink ring on the dustpan · **Submit** |
| 13 | `32802:30903` | four images, multi | header *< Knowledge check · Intro to Snabbit* · *Where is it appropriate to place the pillow and duvet while making the bed?* · *Chair* · *Ottoman* · *Stool* · *On the floor* ☑ · **Submit** |
| 14 | `32763:34732` | yes/no | *Will you ask the customer whether the bedsheet should be changed or the existing one should be kept?* |
| 15 | `32454:29088` | four images, multi | *What should you NOT do in laundry?* · *Wash Shoes* · *Wash Curtains* · *Wash Shoes* · *Wash Shoes* (placeholder labels) · **Submit** |
| 16 | `32766:30090` | four images, multi | *What should you remember while washing clothes?* · **Submit** |
| 17 | `32839:32404` | four images, multi | *Which types of clothes should you immediately inform the customer about when you see them?* · *Blood Stains* · *White Clothes* · *Spoiled by Pets* · *Torn Clothes* ☑ · **Submit** |

Five question types in total: **yes/no** (✕ ✓), **two images** (radio), **four images** (radio), **four images multi-select** (checkbox), **hotspot** (tap what is wrong). Every option carries a speaker icon; the mascot reads them in turn. Attempts, pass mark and a fail screen for the knowledge check are **not shown** in this section.

### 1d. POST TRAINING - APP — `32145:34067`

Row labels: *LMS Entry point* (`32916:32859`) · *Optional Nudge Touchpoint* (`33522:46013`) · *Mandatory training* (`31944:207354`) · *Flagged* (`32000:452261`) · *Home - school (training completed)* (`32096:454009`, dim).

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 1 | `32916:32861` | Home with a training section | *Snabbit training* · *View all >* · cards *Introduction to Snabbit* ▶ · *How to become a Snabbit Expert* ▶ | Home shell · horizontal video-card row between *More From Snabbit* and the tab bar |
| 2 | `32916:33355` *My Profile* | Profile | *Profile* · *Reema Saju* · *#SNAB2413* · ★ *3.2* · *Earnings & Payments*: *Monthly earnings* ₹24,000 · *Payout history* · *Early Payout* · *Shift & Availability*: *Apply leave* · *Emergency logout* (red) · *Benefits & Perks*: *Refer & earn* · *Seva* · *Insurance* · *Snabbit store* · *Loans* · *Account & Settings*: *Language* · *Emergency contact* · *Personal details & KYC* · *Bank details* *Add Bank* · *PAN details* *Add PAN* · *Learnings*: **Snabbit Training** | the live Profile with a new *Learnings* group at the bottom |
| 3 | `33522:46015` | Nudge on Home | card *Increase your speed to get 5 stars* · *See video* (with a video thumbnail of an expert) | Home shell · a video-nudge card above *More From Snabbit* |
| 4 | `33522:46234` | Pre-shift Home + nudge | *Tuesday, 7 February* · *7:00 AM - 12:00 PM* · ✓ *Present* · *Change* · **Login** · *Your Hotspot* · *Jyoti Nivas College Gate* · *3.2 km away* · *Map* · *Watch how to increase your speed to get 5 stars* · *See video* · *Congratulations! You are a Gold expert >* (Gold pill in the header) | shift card · hotspot card · video nudge · tier banner |
| 5 | `33522:46100` | Attendance Home + nudge | *You can earn* ₹800 - ₹1000 · *Mark attendance for tomorrow* · **Absent** (red) · **Present** (green) · nudge card · Banner *UPI ID/ Bank details missing* **Add** | |
| 6 | `33522:46155` *Before 12 AM* | Check-in + nudge | *Check In* · *You Will Earn* ₹150 · *₹145 + ₹5* · *Check in by 7:45 PM* · *Radhika S* · *Listen* · address · *Map · Call · Chat · Street view* · nudge card · *CHECK IN BY 7:45 PM* *1:23* · **Check In** | the live check-in screen with the nudge inserted above the timer |
| 7 | `33522:46186` | Break + nudge | *TIME LEFT* *28:23* · **End Break & Start Earning** · nudge card | |
| 9 | `32759:211424` | **Mandatory training sheet** | 📖 · *Complete your training* · *Watch 2 videos to become an expert* · cards *Introduction to Snabbit* ▶ · *Introduction to Snabbit Payouts* ▶ | Home dimmed · bottom sheet with a book badge · two video cards · mascot peeking |
| 10–11 | `32759:212314` `212396` | Player | *Training · Currently playing : How to present as Snabbit…* · *Call* · bubble *Pay attention to the video* · *00:36/01:00* | 2-segment progress |
| 12 | `33296:43380` | Sheet, both ✓ | same cards with green ✓ | |
| 13 | `33296:46981` | Done toast | *TRAINING COMPLETED!* | green radial burst over Home, no button |
| 14 | `33296:46404` | Home after | no training section | |
| 15 | `35993:477636` *Single Video* | Sheet, one card | *Complete your training* · *Watch 2 videos to become an expert* (sic, one card) | |
| 16 | `33296:44775` | Sheet variant | *Watch 2 videos to start working* | |
| 17 | `32759:212949` | Player | | |
| 18–19 | `33296:45205` `45647` | Sheet progress | card 1 *10s left* → card 1 ✓ card 2 *10s left* | |
| 21 | `32000:452263` *My Profile* (Flagged) | Profile | same as 2 | |
| 22 | `32759:213193` | **Progress reset** | training home *Chapters 0/6* + sheet *Progress has been reset* · *You require retraining again, go through all modules* · **Restart training** | sheet over the training home |
| 23 | `32000:452790` | Home card | *Snabbit training* · *Progress has been reset* · *You require retraining again, go through all modules* · **Restart training** | a card on Home |
| 24 | `33296:46130` *Temporarily Suspended* | **Suspended Home** | *Temporarily Suspended* · ⚠ *Reason* · *Your customer ratings dropped below 3.0.* · **Request to Come Back** · **Contact Support** | red Home header · avatar · reason card · two buttons |
| 25 | `35086:55469` *Temporarily Suspended* | Retraining required | illustration (trainer teaching two experts at a bed, tag *Retraining*) · 📞 *Retraining required* · *We'll call you with the date* · **Request callback** | full illustration · card · one button |
| 26 | `35086:55169` | Suspended (variant) | *You are temporarily suspended* · *Please wait for us to call you* · Banner *You cannot accept jobs or use the app untill retraining* (sic) | |
| 27–28 | `32096:453882` `453947` | video-card component | *How to become a Snabbit Expert* · lock | states of the card |
| 30 | `32096:453881` | **Snabbit School** | *Snabbit School* · rail *For you* (selected) · *Intro* · *Payouts* · *Apps* · search *Search "Payouts"* · *For you* grid | the post-training library |
| 31 | `32190:460281` | Snabbit School, *Intro* | | |

### 1e. App Education — `33450:44695`

Sub-flows (canvas titles): **Login flow** · **Change attendance** · **Logout** · **Emergency logout** · **Lunch** · **Profile page** · **Job flow**. Each is a "try it yourself" rehearsal: a training video → *Try it yourself* → the real screen, with the control she must tap lifted out of a scrim (white card, the rest dimmed), and small annotation frames (`Frame 2147244043`, 265 × 95) beside each step.

Step-1 strings, first 20 frames:

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| 1 | `33004:33085` | Training home (App Education) | *Snabbit Training* · *Call* · rail *Intro · Payouts · Apps · Grooming · T…* · *Chapters* *3/6* · cards *Introduction to Snabbit* ▶ *10s left* · *How to become a Snabbit Expert* 🔒 ×3 · **Continue Training** ⓘ |
| 2 | `33004:32668` | Player | *Training* · *How to use App* · 1-segment progress · video |
| 3 | `33004:32692` | Video ended | **Try it yourself** · **Rewatch module** |
| 4 | `33004:32415` | Home, pre-shift | *Tuesday, 7 February* · *7:00 AM - 12:00 PM* · ✓ *Present* · *Change* · **Login** · *Login by 6:50 AM* · coin *1* · *Your Hotspot* · *Jyoti Nivas College Gate* · *3.2 km away* · *Map* · *More From Snabbit* |
| 5 | `33004:32363` | Step: tap Login | the shift card lifted on a scrim; button reads **Button** (placeholder) |
| 6 | `33004:32371` | Step: pressed | same, button pressed |
| 7–10 | `33004:32379` `32385` `32405` `32395` | Selfie | *Take a selfie* · *Please ensure you are wearing the uniform.* · dotted face oval · shutter |
| 11 | `33004:32424` *Snabbit Cancelled* | Review | **Retake** · **Submit** |
| 12 | `33004:32443` | Success | ✓ *Login successful* (green scrim, *Snabbit* logo box on the chest) |
| 13 | `33004:32451` | Rehearsal passed | green sheet ✓ *Correct answer!* · **⏭ Continue** over the success screen |
| 14 | `33064:39453` | Change attendance: Home | (as 4) |
| 15 | `33064:39826` | Step: shift card lifted | |
| 16 | `33074:40051` | Sheet | three red *-50* cards · *Are you sure you want to change attendance?* · *Period Leave (1 Available)* toggle · **Absent** (with a red-card icon) · **Present** |
| 17 | `33053:36769` | Consequence overlay | three *-50* red cards + tag *FALSE PRESENT* over the Home |
| 18 | `33074:40498` | Absent Home | ✕ *Absent Today* · *(Tuesday, 7 February)* · *Wednesday, 8 February* · *7:00 AM - 12:00 PM* · *Mark attendance for tomorrow* · **Absent** · **Present** |
| 19 | `33074:46385` | Logout: Home | *Searching for jobs nearby* |
| 20 | `33074:46477` | Step: logout bar | ⏱ *Shift ends at 6:00PM* · **Logout** (lifted) |

The rest, one line each: 21 `33074:46652` *Mark tomorrow's attendance* sheet (📅, date, **Absent** / **Present**) · 22 `33074:46291` pre-shift Home after logout · 23–24 `33097:66577` `67206` Emergency logout: Home → Profile tab lifted · 25 `33097:67567` Profile with *Emergency logout* row lifted (profile now shows *STAR EXPERT · View tier*, *Request overtime*, *Bank details ICICI\*\*\*\*4567*, *PAN details PBYDC0243F*) · 26 `33074:41981` sheet *Shift ending in 01h : 36m : 12s* · *Emergency logout will lead to* · *1 Red Card* · *Miss Full Shift* · *Lose ₹250* · **Go back** · **Logout** · 27 `33097:67840` *Mark tomorrow's attendance* · 28 `33074:41641` *EMERGENCY LOGOUT* red-card overlay on Home · 29 `33105:69612` Lunch: Home · 30 `33105:68226` break card *TIME LEFT 28:23* **End Break & Start Earning** lifted · 31 `33105:70246` same, button lifted · 32 `33105:68418` *05:23* (amber) + sheet *Are you sure you want to end the break ?* **End Break** / **Go Back** · 33 `33105:68176` Home · 34 `33115:96260` attendance Home (*You can earn ₹800 - ₹1000*, **Absent** / **Present**, refer card *₹5,000*) · 35 `33115:96428` Refer page (*EARN UP TO ₹4,000 For every referral* · **Refer Now** · *View Rules* · *Your referrals* rows *Lakshmi Devi · Training pending* with call/WhatsApp · **View all referrals** · *Bumper Contest … ₹50,000* · leaderboard · **View Leaderboard**) · 36 `33115:96408` sheet *Choose the work you're referring for* · *House Help · Female only · upto ₹4,000 / Referral* · *Home Cook · Male or Female* · **Refer Friends** · 37–38 `33115:96662` `96585` *Refer Friends*: *Add manually* (name, mobile) · *Choose friends to refer* · *Select all* · *Search contact* · **Refer now** · 39–41 `33115:96520` `96695` `96788` *Send WhatsApp invites* · *Invite your selected friends one by one* · rows **Invite** / **Resend** · *1 Friends Referred* · **Go back** · 42–43 `33105:71029` `71127` Profile flow: Home → Profile tab lifted · 44–48 `33105:70809` `35086:54045` `54305` `54520` `54735` Profile with each group lifted in turn (header card · *Earnings & Payments* · *Shift & Availability* · *Benefits & Perks* · *Account & Settings*) · 49 `33141:103236` Job flow: Home · 50–52 `33141:102615` `35081:53610` `53814` *New Job* · *You Will Earn ₹150* · *Work (1 hour) ₹120* · *Check in by 7:45 PM ₹5* · *Summer Bonus ☀ (1 hour) ₹20* · *OT (15 min) ₹40* · *ACCEPT IN 1:23* · **Accept Job** (green), rows lifted one by one · 53 `33141:102915` sheet *Send a message to customer* · *Hi, I am on my way and will reach your location shortly.* · send · 54–56 `102895` `102905` `102533` *Check In* with earn card / actions / *RUNNING LATE -01:23* lifted · 57–58 `102543` `102555` *Enter OTP to start job* · *Please ask the customer to share the OTP with you* · **Start Job** · *No OTP* · 59 `102567` *Enter customer phone number* · **Use OTP instead** · 60 `102370` ✓ *Job Started* · illustration (namaste at the door) · 🙏 *Say Namaste* · **OK** · 61–63 `102351` `102390` `102411` *Job In Progress* · *TIME LEFT 48:23* · *Radhika S* · *Job Timing 10:00 AM - 11:00 AM* · *Duration 60 min* · *Snabbit Kavach* **Activate** (lifted) · *Customer preferences · Spice level Low · Oil level Medium* · **Complete Job** · *Job extended by 15 min* · *15 mins remaining* · 64 `102483` sheet *…ask if you can help quickly with anything.* **Okay** · 65–66 `102433` `102458` *Enter OTP to end job* **End Job** · 67 `102508` sheet *What tasks did you do?* (dotted drop zone) **Okay** · 68 `33141:101662` task pictogram tiles · 69–70 `102624` `35086:54978` *Job Completed* · *You Earned ₹150* · breakdown rows · *Rate the customer* five faces · **Ready for next job** · 71–72 `102637` `102678` *Block customer?* · *Radhika S* **Block** · *Are you sure you want to block?* **No** / **Yes** · 73–74 `102700` `102799` *Unblock someone to block Radhika S* · *5/5 People blocked* · list with **Unblock** · 75 `102657` *…the customer is blocked* banner · **Unblock** · 76 `33141:102885` *Check In* · *You Will Earn ₹145 ~~₹150~~* · *RUNNING LATE -01:23* · 77 `35086:53931` *New Job* · **Accept Job**. Also on the section: a pair of selection-state swatches *Unselected* / *Selected* (`33141:101662` area) and notes *This property should jump to bring an highlight to it* (×2).

### Other sections on the page (one line each)

- **Section 1** `29852:107213` (31 frames) — the earliest training iteration: *Registration* pick-a-shift and *Select 3 work areas* (dim), *Welcome to Snabbit Training*, *Learn new skills*, *Practice like an expert*, an *Intro to Training* video still, a **Snabbit Training** home with a vertical lesson list (*About Snabbit* › *Intro to Snabbit* › *Seva services* › *Learn, earn, payouts, insurance* › *Assessment*, then locked modules *Payouts and rate card* · *How to use the app and map* · *Grooming and delight* · *Technical skills*), a player with the caption *Prepare the Area Move small objects like toys, slippers, and buckets out of the way before you begin.*, *Why did you join Snabbit?* four-image questions with the same read-aloud mechanic, *Which two benefits does Snabbit offer?*, a fail card *Oops! you didn't pass this module* **Go to Module 1**, and *Woohoo! You completed About snabbit*. Superseded by v1/v2; nothing here that v2 lacks except the fail-per-module card.
- **Section 2** `29990:132548` (8 image frames) — a **"Bathroom Challenge!"** game concept: *Welcome to Bathroom Challenge! Can you clean this bathroom the Snabbit way?* · *You'll make 5 decisions. Get them right to earn ⭐ Stars!* · Level 1–5 (*Protect Customer's Belongings* drag-to-safe-place · *Use the Right Cleaner* drag Blue/Red Harpic · *Something is Broken* · *Make it Shine* tap-the-dirty-area · *Before You Leave* swipe the wiper) · *Amazing! You completed all 5 challenges!* · *BATHROOM CLEANING CHAMPION!* · *5/5 Stars · Rules Mastered · +50 Snabbit Coins* · **Continue to Next Lesson**. Image-only, no components; a mood reference for "do, don't read" (P1).
- **Section 3** `30000:132568` (11 frames) — a **path / level-map** training home (*Snabbit Training* · *Lessons 3/40* · a winding road of lesson nodes *All About Snabbit*, *What do we do at Snabbit*, *Assessment* 🔒, score chip *8/10*, module headers *Intro to Snabbit* · *Seva services*, trophy header when done) and five iPhone question frames (*Rearrange the pictures in the correct brooming order* drag-and-drop · *Whats the first thing to do while brooming* · *Have you cut vegetables before?* ✕ ✓ · *Select the pictures in the correct brooming order*). The ordering question type exists only here.
- **Section 4** `30826:146879` (6 frames, dim) — Home with a *Learning Modules* circle rail; Home cards *Learn more about Snabbit* / *Learn more Payouts & Jobs*; Profile with a *Learnings · Snabbit Training NEW* group at the top; a suspended Home *Watch this to remove suspension* **Contact Support**; *Snabbit Training Modules* page (*Kitchen cleaning (4/10)* · *Bathroom cleaning (4/10)* · *App Training*). Earlier post-training iteration.
- **Section 6** `31246:83103` (21 frames, dim, titled *Module Completion*) — v1's training-home states, player, and four-image question read-aloud frames before they were moved into the v1 section. Nothing new.

## Step 2 — what it is trying to do

**Training (v2).** Replace the training centre with a guided course on the phone: a mascot ("Saathi") welcomes her, every module is a short real-video lesson followed by a two-to-four-question knowledge check, modules unlock in order on a rail (Intro → Payouts → Apps → Grooming → Tech Skills), and a timed 15-question final assessment ends in a certificate claim and *You are now a Snabbit Expert*. Help is a phone call to a trainer, promised within 24 hours. Coachmarks teach the home once; the mascot is also the help button.

**Knowledge check (Farhan).** A question bank per cleaning module and a template set of five question types, every option illustrated and read aloud so the check works without reading — the right answer is the picture she recognises, not the sentence she decodes.

**Post training.** Keep training alive after go-live: an LMS entry on Home and in Profile (*Learnings*), a video nudge card inserted into every live screen (Home, check-in, break), a **mandatory** two-video sheet that blocks nothing but sits on Home until watched, a **flagged / suspended** state when ratings fall (*Temporarily Suspended*, *Progress has been reset*, *Retraining required*), and a *Snabbit School* library.

**App education.** Teach the app by rehearsing it: watch a clip, then do the real flow (login selfie, attendance change, logout, emergency logout, lunch break, profile, a whole job) on a copy of the live screens with the next tap lifted out of a scrim and consequences (red cards, *Lose ₹250*) shown as pictures.

## Step 3 — against the expert

| Symptom | Where | Principle / spec it breaks |
| --- | --- | --- |
| Progress is a thin segmented bar with no count on the player and the check; the count exists only as *Chapters 1/6* on home and *2 of 15* on the final assessment | v2 rows 1–3, 7 | P5 — she cannot tell how much is left; `progress-bar.md` `segmented` carries a `count` |
| Four button shells on one flow: pink primary, half-tone pink (*Practice*, *Knowledge Check*, *Claim certificate*, *Start Assessment*), dark navy (*Start now*), outline (*Call Trainer*) | v2 14, 15, 28, 34, 56; 1 | `button.md` one primary style; P6 colour is a language |
| Verbs vary for the same act: *Continue* / *Confirm* / *Submit* / *Choose an option* / *Okay* / *Continue Training* ⓘ | v2 23, 24, 65, 42, 44; kc; pt | `content.md` § 3 verbs, § 9 banned *Continue / Submit / OK / Okay* |
| The coachmark and the help FAB both use the mascot; the mascot also "reads" options; one figure, three meanings | v2 9–10, 17–20, 70 | P1 — one icon, one meaning; `coachmark.md`, `nudge.md` |
| Fail screen shows two bare numbers (*7* / *8*) with grey placeholder dots and a single **Rewatch videos**; no topics, no attempts left, no module named | v2 61 | PRD § 3.8 req 7 (score, wrong topics, module to rewatch, attempts left); P5 |
| No lockout screen at all; no *Call support* on the knowledge check (its header has no Call pill) | kc frames; v2 | PRD § 3.8 req 6, 8; P5 |
| *Trainer will call you in 24 hours* with a thumbs-up *Okay* — the wait is a sentence, not a shape; no who, no number | v2 42 | P5 honesty, P1 show first; `empty-state.md` `waiting` |
| Timer *05:48* and *2 of 15* in a card without a draining shape; the timer is digits only | v2 29, kc | `timer.md` — time is a shape; P5 |
| Multi-select image questions with four checkboxes and *Submit*; the PRD itself asks to replace or part-score these | v2 24, 32; kc 13–17 | PRD § 3.8 req 5; P3 one tap |
| Hotspot question (*Select what is wrong in this image*) needs a precise tap on a small ring inside an illustration | v2 33, 51, 83–86; kc 12 | P3 targets ≥ 48 dp; P8 small cracked screens |
| Question copy in English on the frames (*Will you ask the customer whether the bedsheet should be changed or the existing one should be kept?*) — 20+ words, a sentence she must parse | kc 14, 6, 17 | P9, `type.md` budgets; `content.md` one idea per line |
| Option labels that lecture (*Take it and run away with it bro, don't come back*) | v2 48, v1 | `content.md` voice — warm, never mocking |
| Module names are internal words (*Payouts*, *Apps*, *Tech Skills*, *Grooming*) | v2 8 | vocabulary; P9 |
| Three strings for one state: *Chapters 6/6* + *Start your knowledge check* + **Start knowledge check** (and *Start Assessment* for the same card elsewhere) | v2 46, 56, 59 | P1 delete-a-line; one noun for the check |
| *Congratulations!* said on three successive screens in v1 (fixed in v2 to one) | v1 70–72 | `content.md` celebrate once |
| The certificate is a button (*Claim certificate*) that leads to a hero screen; the certificate itself is never drawn; v1 has *Download certificate* as a row | v2 34–35; v1 56 | PRD § 3.9 (name, KYC photo, date, ID, download, stays in app) — **not designed** |
| Post-training video nudge is pasted into every live screen including the check-in timer screen | pt 3–7 | P2 one next action; `nudge.md` placement rules |
| *Temporarily Suspended* with a red full header and *Your customer ratings dropped below 3.0.* | pt 24, 26 | P6 dignity; `error-recovery.md` — one recovery, no red walls |
| *untill retraining*, *Scrubbber*, *Payout's*, *Whats* | pt 26; kc 2; v2 25; s3 | copy review (checklist 15) |
| English-only Hindi test string in Devanagari on one frame; no Kannada/Marathi anywhere | v2 82 | P9 — four scripts at 1.3 |
| App Education "lifted control" rehearsal uses a white card on a scrim with the real screen underneath — good — but the button under test is labelled **Button** | ae 5–6 | placeholder copy |
| Red cards (−50) as a picture of the consequence | ae 16–17, 26, 28 | **Keep** — P1 show first (and the red card is a registered reward-layer asset) |

What it does right and must be kept:

- **Every option is a picture, read aloud, with the reader shown** (the mascot on the card being read, the others greyscale). This is P1 and P4 done properly; keep the mechanic, replace the mascot with the VoicePrompt highlight.
- **Yes/No as two big coloured squares** (✕ red, ✓ green) — two channels, two targets, no reading.
- **One lesson, one check, one unlock** — modules unlock in order on a rail; the next step is always the only button.
- **Real-video lessons with a real expert in uniform**, 60 s, with a one-line caption in the player (v1).
- **Right / wrong as a full-width coloured sheet** with the next action inside it (*Watch video again* on wrong).
- **Rehearse the app on the app** (App Education): the training screen *is* the live screen with the next tap lifted; consequences drawn as the red card.
- **Help as a call**, present on the header of every training screen (the Call pill) — satisfies PRD § 3.8 req 6 and `SCOPE.md` question 6, except on the knowledge-check frames.
- **Mandatory-training sheet on Home** after go-live that names exactly how many videos (*Watch 2 videos*) and shows them as cards with ✓.

## Step 4 — tier and system map

| Screen · region | Is | Kind / notes |
| --- | --- | --- |
| Training shell header (back · title · subtitle · Call · language) | `HeaderNav` `page` with Help and Language IconButtons | as `patterns/onboarding.md` header row; subtitle slot carries *Currently playing* |
| Thin segmented progress under the header | `ProgressBar` `segmented` | add `count` (*2 of 15*) per spec |
| Transition video (v2 2–5) | `HowToClip` `player` full screen | the mascot animation is an illustration asset (register) |
| Welcome + mascot bubble (6–7, 93–94) | `EmptyState` `info` shape (scene · Heading · one line) | the bubble is a `Coachmark` only if it points at something; here it does not — it is copy |
| Training home — hero line + illustration | `Card` `header` with illustration | *Welcome to Snabbit Training* |
| Training home — module rail (circles, lock, ✓, selected ring) | `Stepper` `rail` (horizontal) | states `done` / `current` / `locked`; icons `lock`, `check` |
| Training home — *Chapters 1/6* + bar | `ProgressBar` `linear` with `count` | |
| Training home — video-card grid | `HowToClip` `card` ×n in a 2-col grid; `locked` state with `lock` icon; `done` with ✓ badge; *10s left* as a `Tag` `neutral` | no match for *10s left* on a card → inherits `Tag` S |
| Training home — bottom *Start your knowledge check* card | `Card` `state` with icon + line + `Button` | composition |
| Training home — primary button | `Button` `primary` `L` | one style, not half-tone |
| Coachmarks (9, 10, 45, 62, 70) | `Coachmark` | the mascot is not part of the component |
| Help FAB (mascot bottom-right) | no match — nearest `IconButton` `floating` with `question` icon (inherits 56 dp, elevation.floating) | the system has no mascot; `SOSControl` is the only floating control and it is reserved |
| Player (11–13, 37–39, 63) | `HowToClip` `player` with scrubber and time pill | |
| Player ended + one button (14, 15, 40, 64) | `HowToClip` `player` `ended` state + `Button` `primary` | |
| Help sheet 1 *Need help? Call trainer* (41) | `BottomSheet` `action` with illustration | |
| Help sheet 2 *Trainer will call you in 24 hours* (42) | `EmptyState` `waiting` inside a `BottomSheet` | add a `Timer` `deadline` for *by tomorrow 3 pm* |
| Question header *◯ 05:48 · 2 of 15* (29, kc) | `Timer` `countdown` `M` + `ProgressBar` `count` | composition in one row; not a card |
| Question title + mascot avatar | `Heading2` + `VoicePrompt` `inline` (speak button) | the avatar is the speak control |
| Yes/No question (29, 47, 75–78) | `SelectionCard` `hero` (one oval illustration) + two `Button` `L` *No* (`error`) / *Yes* (`success`) with icons | composition; checklist row 4 (colour + icon + shape) |
| Two-image / four-image radio (16–23, 30–31, 48–49, 65) | `SelectionCard` `rich` ×2/×4 in a grid, `selected` state; each with a `VoicePrompt` `inline` speaker | the read-aloud highlight = `VoicePrompt` `highlight` state on the card, not a mascot |
| Multi-select images (24, 32, 50) | `SelectionCard` `rich` + `Checkbox` | PRD asks to retire the type |
| Hotspot *what is wrong* (33, 51, 83–86) | no match — nearest `MediaCapture` `review` overlay (tap zones) · inherits 48 dp targets and the `result` ring | Tier 3 candidate only if the type survives § 3.8 req 5 |
| Right / wrong sheet (66–68) | `BottomSheet` `result` `success` / `error` with `Button` inside | `feedback.md` says a result that blocks the next tap is a sheet, not a toast |
| Module complete (25–27) | `EmptyState` `success` scene + `Stepper` `rail` + `ListItem` up-next + `Button` | `motion.celebrate` |
| Final-assessment intro (28) | `EmptyState` `info` scene with eyebrow + Heading + `Button` | |
| Assessment passed (34) | `EmptyState` `success` + `Button` **Claim certificate** | |
| *You are now a Snabbit Expert* (35) | `onboarding.md` *Onboarding complete* scene | photo → illustration asset |
| Assessment failed (61) | `HeroCard` `facts` (two `Stat`s, score as figure) + `ListItem` `navigational` rows (modules to rewatch) + `ProgressBar` `segmented` (attempts) + `Button` | the drawn screen has only the two stats; the rest is TIERS 27's composition |
| Training-confirmed entry (1) | the **training-centre card** composition (`onboarding.md` § 6b) + `VoicePrompt` `bar` | TC flow only; not for contactless |
| Mascot full-body (74) | illustration asset — **not registered** | `assets.md` would need a *character* class entry; the system has no mascot and `PRINCIPLES.md` has no mascot persona |
| **Post training** — Home training section (pt 1) | `HowToClip` `card` row with section title + *View all ›* `ListItem` link | Home composition |
| Profile *Learnings · Snabbit Training* (pt 2) | `ListItem` `navigational` in a group | |
| Video nudge card (pt 3–7) | `Nudge` `card` with thumbnail + `See video` ghost | one per screen, never on the check-in timer |
| Mandatory-training sheet (pt 9, 12, 15–19) | `BottomSheet` `task` with icon badge + `HowToClip` `card` ×2 (`done` ✓) | composition |
| *TRAINING COMPLETED!* burst (pt 13) | `Toast` `success` with `motion.celebrate` | |
| Progress reset sheet / card (pt 22–23) | `Banner` `warning` on Home + `BottomSheet` `confirm` on the training home | |
| Suspended Home (pt 24–26) | `EmptyState` `waiting` on Home + `Banner` `error`; *Reason* row as `ListItem` `informational` | not red-headed; `error-recovery.md` ladder |
| Retraining required (pt 25) | `EmptyState` `waiting` scene + `Button` **Request callback** | illustration asset to register (trainer + experts) |
| Snabbit School (pt 30–31) | `Tabs` `chips` rail + `TextField` `search` + `HowToClip` `card` grid | |
| **App Education** — try-it-yourself player end (ae 3) | `HowToClip` `player` `ended` + `Button` pair (**Try it yourself** `primary`, **Rewatch** `secondary`) | |
| Lifted control on a scrim (ae 5, 15, 20, 25, 30, 44–48, 50–56) | `Coachmark` `spotlight` on a live screen | the live screens are the shipped app (`references/shipped-app-*`) |
| Consequence overlay (red cards −50, *FALSE PRESENT*, *EMERGENCY LOGOUT*) | `Nudge` `overlay` with the red-card reward asset ×3 + `Tag` `error` | asset exists in the reward layer |
| Rehearsal passed (ae 13) | the same `BottomSheet` `result` `success` as training | |
| Annotation frames *This property should jump…* | designer notes, not UI | — |

**Tier:** everything above is **Tier 2 composition** of core components, with three exceptions: the **mascot** (Tier 0 as drawn — an unregistered character that is coachmark, reader and help button at once; it becomes a registered illustration asset or is dropped), the **hotspot question** (Tier 3 if kept), and the **certificate** (not drawn here; TIERS 31 stays a brief).

## Step 5 — what travels to contactless-gl

| Surface | Base here | What changes for contactless |
| --- | --- | --- |
| 25 Transition video | v2 2–5 `32725:195366`–`195397` (a video still, then the mascot-over-bars animation) + 6–7 welcome | Keep one `HowToClip` `player` full screen with close → training home; the welcome and mascot screens are two text screens the player already says (P1 delete-a-line); the PRD's *what happens if she fails* is content in the clip, not a screen (§ 3.8 req 1) |
| 26 Training home | v2 8 `32725:208948` + states 52–60 | Keep the shape: rail · count · card grid · one button. Rail is `Stepper` `rail`, count is `ProgressBar` `count`, cards are `HowToClip` `card`; rename modules in her words; drop the ⓘ-in-button and the help FAB — Help is in the header (`SCOPE.md` q 6) |
| 26 Lesson + check | v2 11–24, kc templates | `HowToClip` `player` → `SelectionCard` `rich` questions with `VoicePrompt` highlight instead of the mascot; yes/no as two big icon buttons; retire multi-select (§ 3.8 req 5); every title ≤ one line in Kannada at 1.3 (P9) |
| 27 Failed attempt | v2 61 `32725:197623` (score tiles + **Rewatch videos**) + 62 coachmark + 66–68 wrong-answer sheets | The base has the score only. Add the three things the PRD lists: wrong topics as `ListItem` rows that open the module, attempts left as `ProgressBar` `segmented`, and the one button names the module (*Watch Payouts again*) — § 3.8 req 7; P5 |
| 28 Locked out | **no base** — nothing on this page shows attempts used up | `EmptyState` `waiting` with **Call help**; the nearest drawn thing is the v2 42 *Trainer will call you in 24 hours* sheet, which gives the register (a promise with a time) — turn the time into a `Timer` `deadline` (P5) |
| 29 Call support on every module | the Call pill on every Training-shell header (v2), **missing** on the Farhan knowledge-check header | One `HeaderNav` with Help on every training screen including questions (`SCOPE.md` q 6) |
| 30 Completion | v2 34 `33563:52326` (*Assessment Completed* → **Claim certificate**) + 35 `33807:93058` (*You are now a Snabbit Expert* → **Start working**) | One celebration, not two: the passed scene carries her name and the date (§ 3.9) and one button to the certificate; *Start working* is wrong here — the Hub visit and go-live are still ahead (§ 3.10–3.13), so the exit is **Next: pick your joining date** |
| 31 Certificate | **no base** — only the button (v2 34) and a v1 *Download certificate* row (`32446:110516`) | Stays a brief (TIERS gap); the v1 row says where it lives afterwards (Profile › *Learnings*), which pt 2 confirms |
| 32–33 Joining date · slot confirm | not on this page (v2 1 is the **TC** confirmation card with *Day 1 / Day 2* and a centre) | Base remains Beauty go-live G1 and TIERS 32–33; v2 1 shows the *Change* affordance on a confirmed card, which is the `ListItem` **Change ›** TIERS 33 already names |
| 44 Day-one Home | pt 4 `33522:46234` (pre-shift Home: date · time · *Present* · **Login** · *Your Hotspot · Jyoti Nivas College Gate · 3.2 km away · Map*) and ae 4 `33004:32415` (*Login by 6:50 AM*) | Confirms `onboarding.md` § 8: shift card + hotspot card + **Show directions**; add the *Login by* deadline as `Timer` `deadline` (§ 3.14 req 1); no video nudge on day one (P2) |
| 45 Call for help | **not on this page** (pt/ae Homes have no help row; the Beauty go-live Home has *Buddy / Team Leader / CLM · Call*) | Keep TIERS 45 (*Need help?* `ListItem` `actionable`); nothing here contradicts it |
| 46 Voice guidance / app tour | **App Education** section (try-it-yourself rehearsals on the live screens, ae 1–77) + v2 9–10 coachmarks | `patterns/first-run.md` Home tour is the base; App Education adds the **rehearsal** idea — the next tap lifted on a scrim with the consequence drawn — which belongs in `first-run.md` as the tour's "do it" step, not as a training module. Voice reads each card: `VoicePrompt` `bar` as in the Beauty shell |
| 47 Reminders | pt 3–7 video nudges are the only "reminder" shape here | Not a base; `notification-centre.md` rows stand |
| 3 Intro videos (*Get to know more*) | pt 9 mandatory-training sheet (`32759:211424`: book badge · *Watch 2 videos* · two cards with ✓) and pt 1 Home row | The sheet is the shape for "n short clips, see which are done" — `BottomSheet` `task` + `HowToClip` `card` ×≤5 with ✓; use it for surface 3 inside onboarding, with **Next** always enabled (PRD § 3.2 req 4) |
| 49 Progress | v2's thin segmented bar everywhere, count only on home | `ProgressBar` `segmented` with `count` under the header on every step (TIERS 49) |

Surfaces with **no base** in these sections: 28 (locked out), 31 (certificate), 45 (call for help on Home), 47 (reminders), and the retraining / suspension flows (pt 22–26) are **out of this PRD** — they are post-go-live and belong to the system, noted here only because they reuse the training home.

## Step 6 — side by side / open findings

- `patterns/onboarding.md` § 6a describes the course as *a Stepper list of modules, each a HowToClip sequence with a two-question quiz*; the v2 home is a **horizontal rail of modules with a 2-column card grid per module and a 6-chapter count**, which is a different shape from a vertical `Stepper` `list` — the pattern's variant section should say which (the rail reads better on 360 dp with five modules).
- `onboarding.md` § 6a says *a module is done at 100 %*; v2 unlocks the next module only after its knowledge check (home states 56–60), so completion is check-passed, not clips-watched.
- v2 ends training with **Start working** (`33807:93058`); the PRD puts the joining date, Hub visit, TnC and go-live selfie after training (§ 3.10–3.13), so that button is a different flow (the one where training is the last step).
- The PRD says *a failed attempt shows score, wrong topics, the module to rewatch, attempts left* (§ 3.8 req 7); v2 61 shows score only and one *Rewatch videos* button — three of four items are undesigned.
- The PRD says *Call support on every module and on the assessment* (§ 3.8 req 6); v2's Training shell has the Call pill but the Farhan knowledge-check frames have only the language pill.
- The PRD's *Problem today: will add this* (§ 3.8) and `SCOPE.md` q 14 — the number of attempts, the pass mark and the lockout — are also absent from every frame here; the only numbers are *2 of 15*, *05:48*, *7 / 8* and *1 point*.
- v1 and v2 both call the per-module check *Knowledge check* and the end test *Final assessment*; the Farhan section calls the per-module check *Assessment (5 of 10)*; `TIERS.md` 27 says *quiz*. One word is needed.
- The Farhan question bank is Hinglish on the canvas and English on the frames; nothing on the page is drawn in Kannada or Marathi, and only one Hindi title exists (`32725:201113`) — the P9 check has not been run on any question.
- The mascot *Saathi* also names a live Home header pill (*Saathi*, pt 1) that is a different thing (a help/companion entry) — the same word for a character and a feature.
- The certificate: v1 has **Download certificate** on the training home (`32446:110516`); v2 has **Claim certificate** on the passed screen and no certificate anywhere; pt 2 puts *Snabbit Training* under Profile › *Learnings* — three places, no artefact.
- `TIERS.md` 25 says the transition video *closes to the training home*; v2 inserts two welcome screens and a mascot introduction in between (6–7, 93–94).
- Section 3's level-map home (a winding road of lesson nodes with *Lessons 3/40*) is the only iteration that shows total progress across all modules; v2 shows per-module *Chapters* only.
- App Education's rehearsal screens label the control under test **Button** (`33004:32363`) and show *Login by 6:50 AM* with a coin *1*, a reward for logging in on time that `onboarding.md` § 8 does not mention.
- The post-training nudge card is drawn on the check-in screen above the *CHECK IN BY* timer (`33522:46155`); `patterns/check-in-out.md` has no slot for a nudge there.
