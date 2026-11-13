# Flow — Self-serve work area & time change (v3, 2026-10-12 · decided)

**This is the decided flow.** It replaces v2 of the same afternoon (areas and hoods as two zoom levels of one finder, with filters) after the lead walked it as the expert: *"I told you my area and my time. If you can't give me that and show me nearby areas, on what basis do I pick one? And then you make me pick a hood too? I told you my time — preselect it."* It traces to `prd.md` (confirmed 2026-10-07), the stakeholder review of 2026-10-12 (`SCOPE.md` → *Log*) and the lead's calls of 2026-10-12 (`SCOPE.md` → *Open questions*). The wireframe is the Claude design canvas *Hood & shift change — flow wireframe* (`SCOPE.md` → *Answers with*); build rows are in `BUILD.md` § Flow wireframe.

## The one rule

**She says where and when she wants to work. If that exists, she confirms it. If not, every option she is shown already answers her question — her time is preselected, the nearest place first — so the only thing she chooses is *which one*.**

## What changed from v2

| v2 (afternoon) | v3 (evening) | Why |
| --- | --- | --- |
| Area cards showed *12 times open · from 7 AM · up to ₹22,000* | Area cards answer her ask: **9 AM – 5 PM open · 3 hoods · 1.8 km · ₹22,000**, or *closest is 8 AM – 4 PM* | "On what basis do I pick an area?" — the facts must be about *her* time |
| Hoods × times with filter chips (hours, part of day, hood) she operates | Hoods with **her time already ticked**; *other times* behind one link per hood; no filters | "I told you my time — preselect it" |
| Two zoom levels of one finder | **Areas → Hoods → Confirm**, each step skipped when it has nothing to decide | Area is the level she thinks in (HSR, Agara); hood names are ours. So area first, then hoods inside a place she can picture |
| Voice on results = filter | **Speaking anywhere is a new ask.** The *You asked* strip updates, then the finder re-answers at the most specific level she gave | She can't be on the wrong screen to say something |
| — | **An exact hood and time that is open goes straight to the confirm sheet** | She asked for one thing and it exists; the only question left is *are you sure* |

## The three intents

Intent is never asked. Screen 1 holds **Where** and **When**, prefilled with where and when she works now. What she changes is the intent:

| Intent | She says / taps | Where | When | What happens next |
| --- | --- | --- | --- | --- |
| **T** · time only | "यहीं, बस 7 बजे से" · taps *When* | Same place | 7 AM | **Times at Kudlu Gate**, 7 AM ticked if open, else the closest ticked |
| **H** · area only | "HSR में काम करना है" · taps *Where* | HSR | Same as now | Saathi checks "same time?" in one line, then as HT |
| **HT** · both | "HSR, सुबह 9 से 5" · taps both | HSR | 9 AM – 5 PM | **Hoods in HSR** with 9 AM – 5 PM ticked if HSR is open; **Areas near HSR** if HSR is full |

## The finder: Areas → Hoods → Confirm, each step only when it has something to decide

```
1 Tell us ─────────────────────────────────────────────────────────────────────────┐
   │ "HSR, 9 से 5"                                                                 │ "Agara 10th Main, 9 से 5" and it is open
   ▼                                                                               │ (an exact hood + time, anywhere in the flow)
HSR open? ── yes ──▶ 3 Hoods in HSR · 9 AM – 5 PM ticked on each ──▶ 4 Move here? ◀┘
   │ no                      ▲ (one hood only → skip to 4)
   ▼                         │
2 Areas near HSR             │
   full block: HSR is full · Tell me when it opens
   Agara · 1.8 km · 9 AM – 5 PM open · 3 hoods · ₹22,000      ── tap / say ──▶ 3 Hoods in Agara
   Koramangala · 2.6 km · 9 AM – 5 PM open · 1 hood           ── tap / say ──▶ 4 (one hood → skip 3)
   Marathahalli · 3.2 km · closest 8 AM – 4 PM
   (only one area near → skip 2)

T  "यहीं, 7 बजे से" ──▶ 3 Times at Kudlu Gate (her hood only) ──▶ 4 Change your time?
W  full block link ──▶ W1 Wait for HSR? ──▶ J (the alert she'll get) ──▶ back to 2 with the waiting banner
4 Move here? ──▶ Done ──▶ Entry shows "from Thu 15 Oct", then the 30-day lock
```

**Skips.** 2 is skipped when her area is open, when only one area is near, and always on the T lane. 3 is skipped when the area she picked has one hood. Both are skipped when she names an exact hood and time that is open.

**What a row carries.** An area card: name · km from what she asked · *her time* open (or *closest is …*) · how many hoods · pay. A hood card (decided 2026-10-12, evening): the card header (name · landmark · km · pay), then **that hood's times as a radio list inside the card** — at most three shown, *+N more times* expands in place; one radio group across the whole screen; her time ticked on the nearest hood (Tag *Your time*), the closest time ticked and tagged *Closest to 9 AM* when hers is not there. The time-only lane is the same card for her own hood, with her current time as a row marked *now*. Pay depends on hours only, so it changes only if she changes hours. She never operates a filter and never opens a separate times sheet.

## Speaking anywhere is a new ask

The rule for the orb on every screen: **what she says replaces the request**, the *You asked* strip changes first so she sees it heard her, and then the finder re-answers at the most specific level she gave. *Change*, or saying "वापस", puts the previous ask back. The screen never changes while she is still speaking.

| She says, on any screen | The finder answers with |
| --- | --- |
| An exact hood and time, and it is open — "Agara 10th Main, 9 से 5" | **4 Move here?** directly. Saathi: "Agara 10th Main में 9 से 5 है। Kudlu Gate से वहाँ जाना है?" |
| An exact hood, her time is full there | **3 Hoods in Agara**, 10th Main first, full block *9 to 5 is full at Agara 10th Main*, its closest time ticked, the other Agara hoods with 9 to 5 under it |
| A hood with nothing open, or a name we don't know | **3 Hoods in Agara** with the block *Agara 10th Main is full* (or Saathi: "10th Main समझ नहीं आया, Agara में ये हैं") |
| An area — "Agara" | Same as tapping its card → **3 Hoods in Agara** |
| A time — "8 बजे से" | The same screen, re-answered for 8 AM; strip updated; Saathi says what changed |
| A far place — "Hebbal" | An honest answer: **2 Areas near Hebbal**. If she is waitlisted, this is the one case that asks *leave the HSR waitlist first?* |
| "हाँ" / "पक्का" on 4 | Commits. "नहीं" / "रुको" closes the sheet |
| "HSR खुलने पर बताओ" anywhere | **W1** |

## Scenario traces

Real numbers: she works at **Kudlu Gate · 9 AM – 5 PM · 8 hrs · ₹22,000 a month**. HSR, Bellandur; Agara 1.8 km from HSR (3 hoods), Koramangala 6th Block 2.6 km (1 hood), Marathahalli 3.2 km. Friend: **Anita Sharma · 14586 · Bellandur**.

| # | Scenario | Trace |
| --- | --- | --- |
| S1 | **Time only** — "यहीं, बस 7 बजे से" | 1 fills *Same place · Kudlu Gate* / *7 AM* → **3 Times at Kudlu Gate**: 7 AM ticked, *9 AM · now* greyed, other times under it. Saathi: "Kudlu Gate में 7 बजे का है। लेना है?" → "हाँ" → **4 Change your time?** (Now 9–5 struck, New 7–3, same pay, from Thu 15 Oct) → "हाँ" → Done. *If 7 AM is full there:* block *7 AM is full at Kudlu Gate* + link; the closest time ticked (6 AM); Saathi: "7 नहीं है, 6 या 8 है। कौन सा?" |
| S2 | **Area full → area → hood** — "HSR, सुबह 9 से 5" | → **2 Areas near HSR**: block *HSR is full* + *Tell me when it opens*; Agara · 1.8 km · **9 AM – 5 PM open** · 3 hoods · ₹22,000 (marked); Koramangala · 2.6 km · 9 AM – 5 PM open · 1 hood; Marathahalli · 3.2 km · closest 8 AM – 4 PM. Saathi: "HSR में जगह नहीं है। Agara में 9 से 5 है, 1.8 km। देखूँ?" → "Agara" → **3 Hoods in Agara**: 10th Main · 1.8 km · 9 AM – 5 PM ✓; Main Road · 2.4 km · 9 AM – 5 PM ✓; Sector 1 · 2.9 km · closest 10 AM – 6 PM. Saathi: "Agara 10th Main, 9 से 5, 1.8 km। लेना है?" → tap / "हाँ" → **4 Move here?** → Done |
| S3 | **Area and time, open** — "Bellandur, 9 से 5" | → **3 Hoods in Bellandur**, 9 AM – 5 PM ticked on each, nearest first. Saathi: "Bellandur Sector 2 में 9 से 5 है। लेना है?" → 4 → Done. One hood in Bellandur → straight to 4 |
| S4 | **Area only, keep time** — "HSR में काम करना है" | Saathi: "HSR, 9 से 5 — ठीक है?" Silence or "हाँ" → S2 or S3. "नहीं, 7 बजे से" → When updates, then S2 or S3 for 7 AM |
| S5 | **Exact hood by voice, mid-flow** — on 2 she says "Agara 10th Main, 9 से 5" | Strip → *Agara 10th Main · 9 AM – 5 PM*. Open → **4 Move here?** directly. Full → **3 Hoods in Agara** with the block and the closest time at 10th Main ticked (table above) |
| S6 | **With a friend** — "Anita के साथ" | Saathi: "Anita Sharma, Bellandur वाली — वही?" → "हाँ" → as S3 for Bellandur, Anita's hood first, tagged *Anita works here*; full → 2 with *Anita's area is full*. Two Anitas or none → the expert-ID sheet on 1 (keypad, or say the number) → *Is this Anita Sharma?* → on |
| S7 | **Heard only part** — "HSR" | 1 stays; *When* lights; Saathi: "HSR, ठीक है। टाइम वही 9 से 5, या बदलना है?" → S4 |
| S8 | **Voice fails or off** | Two misses → Saathi: "टैप करके बताओ." Where picker (*Same place* first, areas near her, *Work with a friend*); When picker (*Same as now* first, start and hours tiles with pay) → **Find work** → the same 2 / 3 / 4, every row a tap target |
| S9 | **Waitlisted, comes back** | Entry opens **2** with the banner *Waiting for HSR · since 7 Oct · Leave the waitlist*; Saathi: "HSR का wait है। Agara में 9 से 5 खुला है।" Picking anything → 4 with one line *This ends your HSR waitlist*. A far place by voice → **W3 Leave the HSR waitlist first?** Push when HSR opens → **W4** offer → 4 → Done |

## Screen by screen

Every screen carries **Saathi says** (spoken on open, ≤ 12 words per language) and **She can say**. The control is the **Saathi orb**, bottom centre, on every screen but the loader: *speaking* · *idle* (tap to talk) · *listening* (her words live) · *thinking*. Every spoken option is also a tap target (P4).

### 0 · Entry — Work area & time
Her hood on a map, her time, her pay, one Button **Change area or time**. Gates: lock (*You can change again from 14 Nov*) · booked (*Moving to Agara 10th Main from Thu 15 Oct*; open question b) · waitlisted (opens 2 with the banner). *Saathi says* on a booked change: "गुरुवार से Agara 10th Main।" *She can say:* "बदलना है" → 1.

### V · Video (first time)
Saathi shows the three things she can say. *Try it now* → 1; *Watch again* on 1 afterwards. *Saathi says:* "मैं Saathi हूँ। बोलो कहाँ और कब काम करना है, मैं ढूँढ दूँगी।"

### 1 · Tell us
*Where* and *When*, prefilled *Kudlu Gate* and *9 AM – 5 PM · 8 hrs*, filling live as she speaks; tap a field for its picker. Any change heard → moves on by itself; place only → Saathi checks the time (S7). *Saathi says:* "कहाँ और कब काम करना है? सिर्फ टाइम बदलना है तो वो बोलो।" *She can say:* a place or landmark (up to three) · *same place* · a start time · hours · a part of the day · a friend's name or number · "वही". **Find work** appears once a field has been tapped.

### 2 · Areas near HSR (only when there is an area to choose)
*You asked: HSR · 9 AM – 5 PM · Change* on top. The **full block** (dark): *HSR is full* · *Tell me when it opens*. Then up to three areas within ~10 km, nearest first, never her own hood: **name · km · her time open (or *closest is …*) · N hoods · ₹**; the one Saathi names first is marked; *More areas* behind a link. *Saathi says:* "HSR में जगह नहीं है। Agara में 9 से 5 है, 1.8 km। देखूँ?" *She can say:* an area → 3 · an exact hood and time → 4 or 3 · a time → re-answer · "HSR खुलने पर बताओ" → W1 · "वापस" → 1.

### 3 · Hoods in Agara (only when there is a hood to choose)
Strip on top. If she asked for a specific hood or time that is full here, the full block first. Up to three hoods, nearest to what she asked first: **name · km · her time ticked (or the closest, marked *closest*) · ₹ · +N other times**. *Other times* opens the sheet (grouped morning / afternoon / evening, hers filled). *Other area* → 2. **T lane:** the one hood *Kudlu Gate · where you work now*, her current time greyed *now*. *Saathi says:* "Agara 10th Main, 9 से 5, 1.8 km। लेना है?" *She can say:* a hood → 4 · a time → re-answer · "और टाइम" → sheet · "दूसरा area" → 2 · "HSR खुलने पर बताओ" → W1.

### 4 · Move here? · Change your time?
A sheet: Now vs New (hood, time, pay with any drop struck through, start day), *You can change again after 30 days*, one Button with the verb — **Move to Agara 10th Main** / **Start at 7 AM**. ✕ is the safe way out. Waitlisted: one more line, *This ends your HSR waitlist*. *Saathi says:* the change, then "पक्का?" *She can say:* "हाँ" / "पक्का" commits (the sheet with the consequence shown is the second gesture, P3) · "नहीं" / "रुको" closes · a different time → re-answer.

### Done
Success picture and sound, *You're moving to Agara 10th Main from Thu 15 Oct* (or *New time from Thursday · 7 AM – 3 PM*), **Go to Home**. *Saathi says:* "हो गया। गुरुवार से।"

### Loading
Between 1 and 2/3/4: ring or Skeleton, *Finding work near HSR…*, no Saathi (`motion.md`), not cancellable; failure → *Error recovery*. **Nothing open near** (rare): 2 with the block and *There's no open work near HSR right now*; the waitlist link is the main action.

### W · Waitlist (offered, never forced; cap 1)
- **W1 · Wait for work in HSR?** — one line *We'll tell you when it opens* · **Join the waitlist** · *Not now*. *Saathi:* "HSR खुलते ही बताऊँ?"
- **J · You're on the list** — a preview of the alert she will get · **See work close by** → 2 with the banner. *Saathi:* "ऐसा message आएगा। तब तक पास का काम देखो।"
- **2 with the banner** — *Waiting for HSR · since 7 Oct · Leave the waitlist*; everything below works as normal by voice and tap.
- **W3 · Leave the HSR waitlist?** — from the banner link or a new far search: *You'll lose your place since 7 Oct* · **Stay on the waitlist** (primary) · *Leave the waitlist*. *Saathi:* "पहले HSR की waitlist छोड़नी होगी। छोड़ दूँ?"
- **W4 · Work opened in HSR** — from the push: **Take this work** · *Not now* → 4 → Done. *Saathi:* "HSR में काम खुल गया। 9 से 5, ₹22,000। लेना है?"
- **WA · the message that brings her here** (added 2026-10-13) — when HSR opens we send a **WhatsApp** message (body: *Work opened in HSR · HSR Layout Sector 2 · 9 AM – 5 PM · 8 hrs · ₹22,000 a month · Take it in the Snabbit app*; one button **Take this work**). The button deep-links to **W4** for that offer. If the slot went before she opened it: **WA5 · HSR filled up again** — *You're still on the waitlist · We'll message you next time* · **See work close by** · *Not now*; no card, no red. Whether the slot is held for her, and for how long, is open (`SCOPE.md`). *Saathi on WA5:* "HSR फिर भर गया। आप अभी भी waitlist में हैं।"

### C · With a friend
*With Anita* is a value of *Where*; her friend's hood is the ask. Ambiguous or no match → the expert-ID sheet on 1 (keypad, or she says the number) → *Is this Anita Sharma? · works in Bellandur* → on. *Work with a friend* is also a row in the Where picker. Working near the expert who referred her stays out of the MVP.

## Rules

| Rule | Value |
| --- | --- |
| When a change starts | Asked Mon / Tue / Wed → **the next day**. Thu / Fri / Sat / Sun → **the next Monday** |
| Lock | **30 days from the day the change starts** (open question b: cancel until the day before) |
| Waitlist | **One**, only when she asks. Picking and asking stay on while she waits; a new far search means leaving first. Taking open work ends it |
| The finder | Areas → Hoods → Confirm, each skipped when it has nothing to decide. ≤ 3 per screen, then *more*. Nearest to what she asked first. Her time ticked everywhere; the closest time ticked and marked when hers is not there. Never her own hood except on the T lane. ~10 km |
| Voice | Speaking anywhere is a new ask; the strip changes before the screen does; "वापस" restores. Saathi on every screen but the loader; one orb; every spoken option is a tap target; two misses → tap; one recording per ask |
| Intent | Never asked; read from which field changed. Place only → keep her time, checked in one line |
| Words | *Work area* or the area's name, *time*, *hours*, *waitlist*. Never *cluster*, *slot*. *Hood* — open question e |

## Decision register

| Decision | By | When |
| --- | --- | --- |
| One flow, voice first, never empty-handed, money on every option, honest when full, waitlist captures intent | Product, business, design | 2026-10-07 · `prd.md` |
| Waitlist her choice, cap 1, start-day rule, *not available* in a line, time asked, visual guide first, friend in MVP | Design lead | 2026-10-07 · `prd.md` |
| Where and when together; same-place path; she names areas and landmarks; decision facts on areas; hoods × times on one page; happy path lands on the same page | Product, business, design | 2026-10-12 review |
| No fixed screen count; the three intents shape the flow | Design lead | 2026-10-12 |
| Saathi speaks on every screen; every screen takes voice | Design lead | 2026-10-12 |
| Areas first, then hoods — and the area card must answer *her* time; hoods carry her time preselected; no filters | Design lead (as the expert) | 2026-10-12, evening |
| Speaking anywhere is a new ask; an exact open hood + time goes straight to the confirm sheet | Design lead | 2026-10-12, evening |
| A separate confirm sheet commits (P3); spoken *yes* counts | Design lead | 2026-10-12 |
| Voice on while waitlisted; a new far search asks her to leave first | Design lead | 2026-10-12 · replaces the 2026-10-07 answer |
| The waitlist is offered inside the full block, never forced | Design lead | 2026-10-12 |
| **Filters return on the hoods page** — hood, hours and start time, because a cluster can hold many hoods; drawn as the *You asked* strip becoming three `select` chips (D1) or a filter row under the strip (D2), on Paper *Filters · hood, hours, start time*; § 3 above still says *no filters* and is revised once a direction is picked | Design lead | 2026-10-13 |

## Still open

| # | Question | Recommendation |
| --- | --- | --- |
| a | T lane, her time full in her hood: show one *7 AM close by* row, or her hood only? | One clearly separate row at the end |
| b | Can she cancel a booked change? | Yes, until the day before, from the Entry strip |
| c | What *marked* means on an area card | Business-pushed; ops defines it |
| d | When picker: exact start time, or part of day + hours? | Part of day + hours as tiles; an exact time by voice |
| e | *Hood* on screen: PRD says never; `PRINCIPLES.md` lists *My hood* | Follow the PRD; raise the vocabulary row when the pattern graduates |
| f | J sheet after joining the waitlist: keep, or let the banner and Saathi's line be the confirmation? | Drop it if the walkthrough feels long; the banner is enough |

## Voice: anything she says lands in one of five UI responses

Voice never gets a screen of its own. It can only do what a tap can do on this screen, or on screen 1. Everything else is a sentence from Saathi and the screen stays. Tech builds one classifier and one response set, not per-screen logic.

| Response | What the UI does |
| --- | --- |
| 1 · Re-answer | The *You asked* strip changes, then the finder re-answers (place, time, hours, *same place*, a friend) |
| 2 · Act here | Tick a row, expand *+N more times*, *More areas*, back, *Other area* |
| 3 · Sheet | Confirm, wait for it, leave the waitlist, call the Saathi team |
| 4 · Say only | Saathi answers aloud; nothing moves |
| 5 · Hand to tap | After two misses: "टैप करके बताओ" and a *You can say* chip row above the dock |

| She says | Intent → response | What happens |
| --- | --- | --- |
| "और टाइम दिखाओ" · "I want more times" | reveal → 2 | Expands the ticked hood's *+N more times*. Already open: "बस इतने ही हैं यहाँ, पास में और हैं" |
| "8 बजे वाला" · "पहला वाला" · "Agara" | pick → 2 | Ticks that row or opens that area; the Button label follows |
| "4 घंटे वाला" · "सुबह का" · "Bellandur" · "यहीं" | re-answer → 1 | Strip updates, finder re-answers — same as saying it on screen 1 |
| "पैसा कितना?" · "कितनी दूर?" | question → 4 | Saathi reads the ticked card's pay or distance |
| "Sunday off चाहिए" · "रात में नहीं" | not supported here → 4 | "वो यहाँ नहीं बदल सकती। यहाँ जगह और टाइम बदलता है।" Logged as a signal |
| "call करो" · a complaint | help → 3 | Sheet with *Call Saathi team*; one tap; never auto-dials |
| "waitlist छोड़ दो" · "cancel करो" · "हाँ" on a sheet | costly → 3 | Voice opens the sheet; "हाँ" on the sheet is the second gesture (P3); voice never commits a loss directly |
| noise · half a word · gibberish | low confidence → 5 | First: "समझ नहीं पाई, फिर से बोलो". Second: hand to tap. The screen never changes on a miss |

**Budget.** One recording per ask. Two misses, then tap mode; after that voice rests on this screen until she navigates. Every unmatched sentence is logged for the Saathi team as the list of what she wanted that we don't support yet.
