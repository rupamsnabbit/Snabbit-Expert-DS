# Decisions

Design decisions that constrain everything downstream. One entry each, dated, with the consequence spelled out. Reverse a decision by adding a new entry, not by editing the old one.

## 2026-09-07 — Outfit is the only type family

**Decision.** Compose/KMP uses Outfit for all text. No companion or second family is added, including for Indic scripts.

**Consequence.** Outfit covers Latin and numerals only. Hindi, Marathi (Devanagari) and Kannada glyphs render in the platform's system fallback face, which differs by device. To keep layouts safe: any container that may hold those scripts uses the type scale's line height × 1.15, text wraps and never truncates, and every text component is reviewed in all four languages at large font size (P9). Numerals stay Latin (₹1,250) so amounts always render in Outfit.

**Revisit if.** Field feedback shows Indic text clipping or looking inconsistent enough to hurt trust; or the design-system package adds a bundled Indic face.

## 2026-09-07 — Phosphor Icons only

**Decision.** All icons come from Phosphor Icons. No other set, no custom glyphs, no emoji used as icons.

**Weights.** `regular` is the default. `fill` marks selected/active state (tab bar, selection cards, toggled controls) so state is carried by shape as well as colour (P1). `bold` only for deliberate emphasis. `thin`, `light` and `duotone` are not used.

**Consequence.** The iconography foundation reduces to a meaning register: one Phosphor icon name → one meaning in the Expert app, in `foundations/icons.md`. An icon not in the register is not used until it is added. The Figma library's icon frames (Icons Group, Icons_Karma Bonus, Pay Summary – Icons, Lock, Smileys, SNABBIT COIN) are reviewed against Phosphor; anything that is not a Phosphor glyph becomes an illustration asset or is replaced.

**Revisit if.** A required meaning has no Phosphor glyph after a real search; then propose an illustration, not a custom icon.

## 2026-09-07 — Assets: two layers, continuing the existing illustration system

**Decision.** Assets follow the system built by Snabbit's previous visual designer (*Snabbit Assets* Figma file). Two layers: **illustration** — flat vector with soft gradient shading, pink stage, pink/purple/yellow palette — for scenes, status pictograms, characters and faces; **reward** — metallic 3D hexagons, discs and cards — only for badges, tiers, bonuses, coins and penalty cards. *Supersedes the earlier same-day note that everything should be soft 3D, which was made before the assets file was reviewed.*

**Consequence.** "If it shines, it's earned" is a rule the expert learns without text: nothing informational is glossy, nothing earned is flat. Assets are registered like icons in `foundations/assets.md` by class (scene, picto, character, reward, face, state), made from a six-asset reference sheet with per-class style prompts, and checked against the layer's style lock. The gold coin and red card marked "old" are deprecated in favour of the pink Snabbit coin. All assets move to an Assets page in the design-system file.

**Revisit if.** A new asset class appears that fits neither layer; then add a layer here, do not blur the two.

## 2026-09-07 — Light mode only, for now

**Decision.** Tokens define light mode. No dark values are invented.

**Consequence.** Semantic names are mode-ready; a dark mapping is a later token task, not a per-screen decision.

## 2026-09-07 — Navigation: keep the shipped four-tab bar and the labelled home actions

**Decision.** The bottom tab bar stays **Home · Earnings · Refer · Profile**, as the live app ships it, with the pink pill indicator; icons become Phosphor (`spray-bottle`, `currency-inr`, `users`, `user-circle`). Rewards and Saathi are **not** tabs. The Home header keeps the shipped *disc + label pill* item (now the `HeaderAction` sub-component) with a fixed set and order — coins · red cards · Saathi · SOS — and drops Help, bell and ≡. The greeting moves from the header into the content. *Supersedes the first HeaderNav / BottomTabBar drafts, which proposed a five-tab bar (with Rewards and Saathi) and unlabelled chips + bell in the header — written before the shipped bar had been reviewed.*

**Consequence.** Experts relearn nothing: the map they know is the map. The system gains one small component (`HeaderAction`), one governed badge kind (`promo`, Refer only, live bonus only), and a rule that SOS is always the rightmost labelled action on Home and every in-job screen.

**Revisit if.** Rewards outgrows the header (tier, coins, streaks, contests in one place) — then it becomes the only permitted fifth tab.

## 2026-09-08 — No FAB component

**Decision.** The system has no floating action button. A floating control is an IconButton `L` `circle` at `elevation.floating`, and exactly two exist: the camera shutter (MediaCapture) and recentre on the taller arrival map. No extended FAB, no `+` / *New* action, at most one per screen.

**Consequence.** Benchmark row *Floating action button* is closed against IconButton; `elevation.floating` stays the only control shadow. The expert never creates content, so the M3 FAB's purpose does not exist in this app; a labelled floating action is a Button in the bottom action bar (P2).

**Revisit if.** A pannable map with more than one control ships (zoom, layers) — then a `MapControls` composition, still built from IconButtons.

## 2026-09-08 — Read the shipped screens; four header/stepper corrections

**Decision.** The two screen files (*Expert App 2.0*, *Shift – Job Lifecycle DS*; pages listed in `references/SCREENS.md`) are the evidence for "what ships today" in every spec. Read against them: the Home header keeps the shipped **bell at left**; the action cluster is coins · (red cards) · Saathi · **SOS rightmost** — the one deliberate change from shipped (P7: SOS in the same place on Home and in-job). **Help** (headset) and **Saathi** (chat) are two different actions: Help is a call and appears on job screens beside SOS; Saathi is the chat and appears on Home. HeaderNav gains a **`state`** variant — centred icon + title, no back — for full-screen job states only. Stepper gains an **`unordered`** mode for independent steps (*complete them in any order*), matching the shipped Training screen.

**Consequence.** Every future spec starts from a screenshot of the shipped form and records it in its *What changes* table; a departure from shipped must cite a principle. `references/SCREENS.md` says which pages and sections count as shipped.

**Revisit if.** The shipped app moves SOS to the right on Home — then the P7 rule is simply met and the note above can go.

## 2026-09-10 — Tooltip, ProgressButton and Popover are components again

**Decision.** Three things earlier removed from the core count are reinstated as **separate components**, each with its own spec and live page. *Tooltip* (`tooltip.md`) is the small anchored bubble: `label` names an icon-only control on long-press; `status` announces a change at the thing it points at (the Timer gained fifteen minutes) in a tone computed from that thing, for `timeout.toast`. It is not the Coachmark, which keeps first-use lessons (scrim, voice, one way out). *ProgressButton* (`progress-button.md`) is a Button whose band the **clock or the server** moves (`countdown` · `progress`); the hold Button's band is moved by **her finger** — two authors of motion, two components, so a fill never means two things. *Popover* (`popover.md`) is a non-modal surface with two or three actions about a tapped map marker, limited to a whitelist of three sites; three-dots overflow menus still do not exist. *Supersedes* the 2026-09-08 notes in `coachmark.md` ("Colored Tooltip deleted", "Tooltips → Coachmark") and `button.md` ("Progress Buttons → hold behaviour"), and the ROADMAP line "Removed from the count".

**Consequence.** Core count 46 → 49. The shipped Colored Tooltip on the Timer and the shipped Progress Buttons have a home in the system instead of being explained away; the shipped green *Accept Job* becomes brand (no success Button tone), the red *15 mins remaining* becomes warning (the Timer's `attention` tone). Tooltip `status` is a second consumer of the 0.20.0 `text*Strong` tokens. BENCHMARK P2 Popover is closed.

**Revisit if.** A year in, no screen has used a Popover — then deprecate it per `GOVERNANCE.md` § 1 rather than keep an unused core component. Or if experts in device review (checklist row 16) do not discover long-press labels at all — then `label` is dropped and only `status` remains.


## 2026-09-22 — Reuse before you invent; the live app is the first reference

**Decision.** Tech feedback: low bandwidth, reuse existing components, build new only where nothing existing serves.
The Beauty inventory ledger was designed as new surfaces (a ProductTile grid, a two-segment bar) when the shipped
**Earnings statement** already had the shape — and `patterns/payout.md` § 1 already said so. Seven screenshots of
the live app are now registered in `references/shipped-app-2026-09-22/`, each region mapped to the component it
*is*, and three rules follow. (1) **The first reference read is our own app**, before Mobbin and before the tier
tree (`EXTENDING.md` § Reuse before you invent; `CLAUDE.md` hard rule). (2) Every spec's status line carries an
**In app** mark when the app ships it; a Proposed spec without one is a **build request** and must say so and name
the reuse it rejected (`GOVERNANCE.md` § 1). (3) A new component or variant must name the shipped component it
tried. Landed from the read: **RateTable** and **BenefitTile** (genuinely missing, both In app); Card `hero`,
Stepper `progression`, Accordion `week` with tier tint, HowToClip `story`, DatePicker month pager, ListItem
*current* (variants of things that ship). Four shipped departures from principles are **recorded and kept as
shipped** — hero and tile fills by colour (P6), Amount + Tag in one trailing slot, the tier tint — because reusing
them costs nothing and changing them costs a sprint; the design lead decides, not the spec.

**Consequence.** Two of this month's core proposals are re-marked: **QuantityStepper** is a genuine build request
(no increment control ships); **ProductTile** is an *avoidable* one — every use can be a ListItem with an image
leading, the shipped breakup row — and defaults to that. **Button `accept`** (2026-09-16) is recorded as superseding
the 2026-09-10 *no success Button tone* decision, which was not consulted at the time. The Beauty ledger rework to
the payout shape is project work, logged in that project. Core count 49 → 51.

**Revisit if.** The package ships and the "In app" mark stops being the cheaper path — then the mark retires and
**Stable** does its job.


## 2026-09-22 — Statement, HeroCard, WeekStrip from the live app; ProductTile and QuantityStepper withdrawn from core

**Decision.** Six more live-app crops (both earnings cards, the coins week view, the three tracker heroes) become
three components drawn **exactly as shipped**: **Statement** (band · rows with breakup, asset count and caret ·
total · schedule with a date tile · footer), **HeroCard** (filled two-part card with a Stat `L`, four tones), and
**WeekStrip** (`band` for streaks, `dots` for independent days, reward markers). `patterns/payout.md`'s re-shape of
the statement is withdrawn; the built card is the spec. Card `hero` (added the same morning) points at HeroCard.
**ProductTile** and **QuantityStepper** — invented 2026-09-15/18 from Mobbin, not from any Snabbit screen — leave
`components/` for `briefs/` as Tier 3, templates and nav entries removed; they return only by the rule of three.

**Consequence.** Core 51 → 52 (−2 +3). Five shipped departures are recorded in the specs and **kept**: the
statement band's green as a heading colour, the total shown twice, *Summer Bonus ☀️*, three hero hues, red Sunday.
The Beauty inventory ledger's rework — a Statement per order, a week pager above it — is project work and waits.

**Revisit if.** A browsing surface genuinely needs pictures over rows, and a third feature asks for the same tile —
then ProductTile comes back through the rule of three, with the shipped ListItem named as the thing it tried.

## 2026-09-23 — Beauty job cycle: add-ons are told, not asked; *Complete job* any time

**Decision.** For the Beauty job cycle (`projects/beauty-job-cycle`, stakeholder answers 2026-09-23): (1) a customer's
**add-on is a service** with its own time and items, it can arrive **only while the job is in progress**, and the
expert **cannot refuse it** — so it arrives as a `BottomSheet info` with one action and a way to call help, never a
Banner with Accept / Decline; (2) **Complete job is available at any point during the job**, with no reason line.

**Departs from.** `patterns/check-in-out.md` § 3 (*Complete job* enables 10 min before the end; early completion is
a support decision) and its *Customer extends the job* edge (Accept by tap / Decline by hold). The Figma linear flow
(`686:12720`) enables *Complete job* at 15 min left.

**Why it is safe.** Finishing needs the customer's end code (NumericKeypad `otp`), so she cannot end a job the
customer has not agreed to end — the code is the second gesture P3 asks for. An add-on she cannot refuse must never
arrive silently (P5): sound, spoken line, the sheet, a `Tooltip status` on the Timer, and the *Job timing* and
*Duration* rows all change in the same moment (`components/timer.md` § Behaviour, landed the same day).

**Consequence.** The Househelp flow is unchanged; the pattern gains a Beauty variant section when the project writes
its pattern (Step 5). Open, and asked of the stakeholder: what happens when an add-on needs an item she does not carry
(`SCOPE.md` Q23), and whether completing early changes earnings (Q26, Payout).

**Revisit if.** Experts report finishing early by mistake, or customers dispute early completions.

## 2026-09-24 — Beauty job cycle: no setup buffer; a photo of the setup starts the job

**Decision.** For the Beauty job cycle (`projects/beauty-job-cycle`, stakeholder 2026-09-24) the setup buffer is
**not built**. Experts take 2–3 minutes to set up, so a 10-minute countdown only adds a wait. After the start code
she is told to set up properly and take **one photo of her setup**; the app says **Job started** only after the
photo, and the service clock runs from there. The start code now *checks her in* (its button reads *Check in*, not
*Start job*), because it no longer starts anything.

**Departs from.** PRD § 4 *Buffer time* (*"a fixed buffer window opens before the service timer starts"*). The PRD
stays verbatim; this entry is the record. Also leaves `components/timer.md` `buffer` mode, landed for this project on
2026-09-15, with no consumer.

**Why it is safe.** Nothing new is invented: the setup screen is the old buffer screen without the Timer, the camera
is `MediaCapture preview` with the `scene` guide (camera-only, SOS in the header, Retake on a failed shot), and
*Job started* is the shipped sheet from `patterns/check-in-out.md` § 2. The job starts when the photo is **taken**,
not when it has uploaded, so a weak signal never holds her at the door. The photo asks her to keep the customer out
of it.

**Consequence.** Setup time is no longer protected by a clock — she sets up on her own pace, then starts. Open, and
asked of the stakeholder (`SCOPE.md` Q27–Q30): who reviews the photo and whether it can lead to a penalty (if so she
must be told before she takes it, P6); what a correct setup must show; whether the clock starts at the photo or the
code; and what happens when she cannot take a photo at all.

**Revisit if.** Setup times in the field grow past a few minutes, or photos turn out to be unused — then either the
buffer returns (the Timer mode is still specified) or the photo step goes.

## 2026-09-24 — Promotions have one shape; reactions are Chips; a day's detail is a sheet

**Decision.** The *Expert (Sahil)* sheet (`KiQaNqLFaH1orma4Uf7hzU` → `8510:23259`, ~70 frames, read in
`references/expert-sahil-rewards-2026-09-24/`) is registered as a **proposed, not shipped** file and translated, not
transplanted. (1) Its twenty-two referral, contest and festival cards — six fills, six border colours, six button
colours — become **one PromoCard** (`components/promo-card.md`, Tier 1, build request): `bgPrimary`, `borderDefault`,
a `bgBrandSubtle` media ground, one Button tone, identity carried by the asset and an eyebrow Tag. Colour that means
only *a different prize* is decorative colour, and for an expert who reads slowly colour is a language (P6). (2) Emoji
reactions become **Chip `reaction`** — the Chip already has the two slots (icon, count); `fire` is not offered because
it means *streak*. (3) The seven centred day cards become **BottomSheet `info`** with a day-detail recipe: attendance
as a Tag, wins as reward assets, *Got it* as the one action — the sheet is the app's only modal surface and *Okay!* is
banned copy. (4) Stories reuse the shipped HowToClip `story` circle and the clip player gains a `story` mode with a
time Caption and the reactions row, still without a scrubber knob (P3). (5) A bonus wallet is a HeroCard `reward` with
a `facts` bottom. Nothing on the sheet needed a second new component.

**Consequence.** Core 52 → 53; patterns 10 → 11 (`patterns/notification-centre.md`). Six icon meanings and two assets
registered; `whatsapp-logo` is the one third-party mark allowed as an icon. Copy masters are English (*Invite on
WhatsApp* · *See contest* · *Claim bonus* · *Got it*); the sheet's romanised Hindi is not one of the four scripts and
is not a master. Growth supplies prize photos as campaign content, never as registered assets.

**Open, for the design lead.** Festival and religious imagery (the Ganesh idol) — proposal: a generic festive scene
and a diya-motif reward disc, the festival named in text. Whether *Utsav Bonus* is a brand word or a bonus name. Which
surface opens the day-detail sheets (a month calendar with markers is implied but not drawn). Whether the Hub accepts
*a friend* for *Saheli* in English copy.

**Revisit if.** Growth ships a campaign that cannot be said in one title line and one Button — then PromoCard gains a
slot, not a colour. Or the Rewards home is drawn and the day sheets turn out to open from a Statement, not a calendar.

## 2026-09-24 — The Refer tab is a Statement and a leaderboard, not new components

**Decision.** The proposed Refer screen (`references/refer-tab-2026-09-24/`) is translated with **no new component**.
Its friend cards — placeholder avatar, name, *Day 7 completed*, a green **Claim Bonus** Button, phone and WhatsApp
icons in the row, an orange *Processing* strip, a *Claimed 🤑* pill — are the shipped **Statement** with an Avatar
leading each row: ready to claim is Amount `brand` with a caret, in progress is Amount `locked` with its condition,
claimed is Amount `positive`, and a bonus on its way is a `schedule` row with a date tile. Claim, call and message
move to the friend's own screen, because a Button in a list row and two IconButtons in one row are the two things
`list-item.md` forbids. The contest is a Card: prizes on a metallic podium asset, ListItem rows with a new **`rank`**
leading (medal assets for 1–3), her row `current` with a **You** Tag (in a list of people the marker is the word),
a Nudge whose consequence is a rank. The inline video becomes **HowToClip `guide`**, the form the roadmap had open
since 2026-09-08, without the drawn scrubber knob. The purple and pink sections become Cards on the page; the
confetti hero becomes the PromoCard `referral` specified the same morning.

**Consequence.** Patterns 11 → 12 (`patterns/referral.md`); ROADMAP's *HowToClip `guide`* item closes. Four reward
assets (`rank-1/2/3`, `podium`) and one icon (`corners-out`) registered; `whatsapp-logo` now also means *message a
friend she referred*. Growth supplies podium prize photos as campaign content.

**Open.** What the leaderboard ranks (drawn as referral earnings); whether the per-screen language toggle belongs on
the share sheet instead of the header; the *Saheli* wordmark; what *day 7* counts.

**Revisit if.** Experts in device review do not find the claim on the friend's screen — then the ready-to-claim row
gets the one allowed IconButton (`hand-coins`) as an `actionable` row, still never a labelled Button in a list.

## 2026-09-28 — Words are the last medium; a step is a screen

**Decision.** P1 gains six rules and three checks that turn *show first, then say* from an intention into a method:
**text is the last medium** (picture → shape → icon → number → word); **an instruction a picture can show is a
picture**, and a rule about what to avoid goes into the picture or the voice line, not a caption; **a step is a
screen, not a numbered line**; **one instruction line per task screen**, with the *why* behind one tap; **related is
not needed** — context she already has is not repeated on a step screen (SOS and Help stay); **a missing picture is
not a reason for text**. The persona gains *She knows her job better than the app does*: explain only what is new to
her or what she could get wrong. `content.md`, `assets.md` and `CLAUDE.md` carry the same rule in their own terms, and
the build plan gains step 4, *then take words away*.

**Evidence.** The design lead's review of a *Get ready* screen drawn for the Beauty job cycle against the shipped
setup-photo flow (`references/setup-photo-text-vs-visual-2026-09-28/`): every line on the drawn screen was true and
the persona had been read, and it still "explained like to a kid". The existing rules already said *one idea per
line* and *text confirms*, but nothing said *how few* lines, or that a sequence belongs in screens rather than in a
list — so a careful reader of the persona produced more text, not less. Field evidence from experts is not yet
recorded; the shipped flow is the only in-use evidence.

**Consequence.** A screen review now fails a task screen with two instruction lines, a numbered list of instructions,
a caption that restates the picture, or a context card the step does not need. Placeholder illustrations are briefed
by what they must show. The 16-row component checklist is unchanged — this is a screen rule, checked by P1's checks
and `content.md` § 10. Governance asks a founder to confirm a principle change: **pending**.

**Revisit if.** Device review shows experts missing a step because its reason was behind a tap — then that step's
*why* moves onto the screen as its one line, and the rule stays.

## 2026-09-29 — Walkthroughs: a Paper page, tapped through on a phone

**Decision.** A flow drawn in Paper may be shown as a **walkthrough** — the page's screens played on the Android
emulator, tapping from screen to screen with the drawn controls working (expandable cards, countdowns, code entry
with the keypad, steppers, chips, sheets rising and falling). It is built from Paper's own code by
`tools/walkthrough/`, run by the `walkthrough` skill, and kept per project in
`projects/<slug>/walkthrough/<page>/` (`flow.json` holds the taps). This narrows the rule in `CLAUDE.md` that
nothing in the repository is a prototype: a walkthrough is a way to *show* a design, not to make one.

**Why.** Stakeholders and experts understand a flow by moving through it; a row of screenshots hides the order, the
sheets, the timers and what a tap does (P5). The design lead draws in Paper, and Paper's code is already the design,
so the walkthrough can be built without redrawing anything.

**Consequence.** Screens are never redrawn to make them work and a state Paper does not draw is never invented — a
missing state (a card's open state, a filled field) is reported to the designer and appears on the next refresh.
Artboards are named `N.NN · title`, variants `N.NNa`, dropped screens start with `✕`; anything without a number is
not a screen. A walkthrough is not evidence for a spec and is not published on claude.ai; it runs on this Mac and the
emulator only. The first one is Beauty's *Job lifecycle · linear* (28 screens).

**Revisit if.** Walkthroughs start being used to decide a design instead of showing one, or the team needs them on
real phones outside this Mac — then hosting and a review step are decided here first.

