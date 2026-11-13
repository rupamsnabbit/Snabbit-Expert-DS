# Build plan — <Project name>

Written **before** the first artboard. One row per region of every screen. Sources in this order and no other:
**shipped app → `patterns/` → `components/` → Mobbin → invention.** Read all three system sources first, every time
(`CLAUDE.md` § Before you draw a screen).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1.01 · header | `HeaderNav` | `components/header-nav.md` | — | — |
| 1.01 · | | | | |

- **Built from** — a component and its kind (`ListItem navigational`, `Statement row`), or a shipped screen region. *Composition* only when every part inside it is also named.
- **Source** — a file in this repo. Mobbin only when the three system sources have no match **and** *Tried first* is filled.
- **Inherits** — when no whole component fits, the anatomy the region still takes from the nearest one: heights, type roles, spacing, amount format, divider rule. **Never empty for a Mobbin or invention row.**
- **Tried first** — what was tried before leaving the system, and why each failed. Empty only when *Built from* is a system component.

A drawn region with no row here is Tier 0.

## Voice flow · fresh (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| V1 · header | HeaderNav `default` (back + *Change area or time*) | `components/header-nav.md` | — | — |
| V1 · question card | Card on a `bgBrandSubtle` stage: Heading1 question, one BodyMd hint | `components/card.md` | 2.1-style pink stage | — |
| V1 · three examples | **VoicePrompt `inline`** rows: a quote line + `speaker-high`, which plays the example | `components/voice-prompt.md` | ListItem 56 row anatomy | — |
| V1 · mic + *Type instead* | **VoiceInput (new, ask of core)**: a brand mic 72 + label; Button `text` | none: the system has no voice-input control | Button L for the label type; IconButton for the touch target | VoicePrompt (it speaks *to* her and can't listen) · TextField (typing, not voice) |
| V2 · compact card | The V1 card at title size | `components/card.md` | — | — |
| V2 · live words + highlights | VoiceInput · transcript: Heading3 (Indic × 1.15), understood words on `bgBrandSubtle` | none | Type scale; Tag radius for the highlight | TextField (no live highlight) |
| V2 · understood rows | ListItem with a leading icon (`map-pin` / `clock` / `users`), label + value, trailing `check-circle` or spinner | `components/list-item.md` | 56 row · BodyLg / BodyMd | — |
| V2 · stop + waveform | VoiceInput · recording state (`pause` in a brand disc 72, waveform bars) | none | — | Button (no recording state) |
| V3 · rows | Card with three ListItem `navigational` rows: icon, label (Caption, secondary), value (BodyLg), trailing *Change* | `components/list-item.md` · `components/card.md` | — | — |
| V3 · actions | Button primary L *Find work* + Button text *Say again* | `components/button.md` | — | — |
| V4 · what she asked | ListItem `compact`: *You asked* + chips (places, time) + *Change* | `components/list-item.md` · `components/chip.md` | — | — |
| V4 · the not-available line | Body line (BodyLg), no banner | `foundations/content.md` | — | Nudge / Banner (too loud for a fact) |
| V4 · cards | SelectionCard `rich` · shift option (area, distance, time rail, pay a month) + Tag *Recommended* | `components/selection-card.md` § shift option | the shipped card | — |
| V4 · waitlist | Button `text` *Put me on the waitlist for HSR* | `components/button.md` | — | — |
| B1 · demo bubble | VoicePrompt `inline` in a speech bubble on the pink stage, with an illustration placeholder (an expert speaking into her phone) | `components/voice-prompt.md` · `foundations/assets.md` | — | — |
| B1/B2 · checklist | Card with three ListItem rows (icon tile · label · example or value); states: to say · say now (2 dp brand border, `bgBrandSubtle`) · done (`check-circle` fill, success) | `components/list-item.md` · `components/selection-card.md` (selected look) | ListItem 64 | — |
| B3 · time sheet | BottomSheet `select` with four SelectionCard `compact` rows (shift clock 40 · title · hint); Button `text` *Say the time* | `components/bottom-sheet.md` · `components/selection-card.md` | E-flow time tiles | — |

### G · when voice fails (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| G1 · nothing heard | F2 layout (card, *Say these three* tiles, mic) with the title changed; Button `text` *Pick instead* under the mic | `components/voice-prompt.md` · `components/button.md` | F2 | — |
| G2 · heard, not understood | Card `outlined` (*We heard* + her partial words in BodyLg secondary) · inline hint (`warning-circle` + one line) · Button primary *Say again* + secondary *Pick instead* | `components/card.md` · `components/button.md` · `patterns/error-recovery.md` | F4 sentence block | — |
| G3 · couldn't send | `patterns/offline.md` empty state (`wifi-slash`, title, one line) · Button primary *Send again* (`arrow-clockwise`) + secondary *Pick instead* | `patterns/offline.md` · `components/button.md` | — | — |
| G4–G6 · header | HeaderNav back + title + PageIndicator (3 steps; G6 trades the indicator for Button `text` *Skip*) | `components/page-indicator.md` · `components/button.md` | — | — |
| G4 · area search + near you | TextField `search` (`magnifying-glass`) · ListItem rows (`map-pin` · area · distance trailing) | `components/text-field.md` · `components/list-item.md` | ListItem 64 | — |
| G5 · time tiles | SelectionCard `compact` × 4 (shift clock 40 · title · hint), as B3 | `components/selection-card.md` | B3 | — |
| G4–G6 · picked so far | Chip `success` look (`check-circle` fill · value) | `components/chip.md` | — | — |
| G6 · friend ID | Number field with cursor + NumericKeypad · Button primary *Find work* | `components/numeric-keypad.md` · `components/button.md` | — | — |
| G4–G6 · Speak instead | Button `text` with `microphone` | `components/button.md` | — | — |

### H · confirm and done · W · waitlist · R · with a friend (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| H1, W1 · backdrop | V4 results under the scrim | V4 on Paper | — | — |
| H1 · confirm | BottomSheet `confirm`, **safe confirm** (✕ top-right, one `primary brand` whose label follows the content: *Move to Koramangala*); title + `speaker-high` | `components/bottom-sheet.md` § Safe confirm (asked by this project, 2026-09-30) | — | — |
| H1 · pay | Amount `hero` + *a month*; caption *₹5,500 less than now* in `textSecondary` (never red: a drop she chooses is not a penalty, P6) | `components/amount.md` | V4 card's *₹5,500 less* | — |
| H1 · facts | ListItem `compact` rows: `clock` time · `calendar-blank` start day · `lock-simple` fill next change date | `components/list-item.md` · `foundations/icons.md` | — | — |
| H2 · done | Empty-state shell: pictogram 120 (proposed `asset/picto/work-area`, green ✓ dot) · Heading1 · BodyLg · Card with the same facts · Button primary *Go to Home* | `components/empty-state.md` · `foundations/assets.md` | H1 facts | — |
| H3 · Work area & time, move booked | HeaderNav · Card `outlined` (*Now*: area, time, pay) · inline Banner `info` (*Moving to … from Thu 8 Oct*) · Button `text` *Cancel move* | `components/card.md` · `components/feedback.md` § Banner | — | — |
| W1 · join waitlist | BottomSheet `confirm`, safe confirm · pictogram 96 (proposed `asset/picto/waitlist`) · body two lines · Button primary *Join waitlist* | `components/bottom-sheet.md` | H1 | — |
| W2 · waiting card | Card `filled` brand-subtle · pictogram 40 · title + *Since 7 Oct* · Button `text` *Leave waitlist* | `components/card.md` | — | — |
| W2 · open now near HSR | The V4 result card × 3 | V4 on Paper (SelectionCard `rich` shift option) | V4 | — |
| W2 · voice off | VoiceInput mic, `disabled` (`bgDisabled` disc, `microphone` in `textDisabled`) + one line | ask of core: VoiceInput | F2 mic | — |
| W3 · leave waitlist? | BottomSheet `confirm` (not safe: she loses her place): `ghost` *Stay on waitlist* above, `secondary` *Leave waitlist* below; no ✕ | `components/bottom-sheet.md` | — | — |
| W4 · HSR opened | Pictogram 120 (`waitlist` with green ✓ dot) · Heading1 · the V4 result card · Button primary *Take this work* · `text` *Not now* | `components/empty-state.md` · V4 card | — | — |
| R1 · which Anita? | BottomSheet `form`: title, one line, number field with cursor + NumericKeypad, Button primary *Find her* | `components/bottom-sheet.md` · `components/numeric-keypad.md` | G6 | — |
| R2 · is this her? | BottomSheet `confirm` safe: Avatar 96 `photo` (verified mark) · name Heading2 · area and time BodyLg secondary · Button primary *Yes, that's her* · `text` *Type again* | `components/avatar.md` · `components/bottom-sheet.md` | — | — |
| R3 · results with a friend | V4 shell; the first card gains Avatar 24 + Tag `M` *Anita works here* | V4 · `components/tag.md` · `components/avatar.md` | V4 card | — |
| R4 · friend's area full | V4 shell, the one line names her: *Anita's area is full right now. Areas near it:* · *Put me on the waitlist for Bellandur* | V4 | V4 | — |

### I · F2–F4 simplified (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| I1–I3 · header | HeaderNav back + trailing IconButton `speaker-high` (replays the spoken line; replaces the pink card's *Listen again* / *Watch video*) | `components/header-nav.md` · `foundations/icons.md` | — | — |
| I1, I2 · three tiles | The F2 tiles unchanged in place: Card `outlined` ×3, icon 32 + label; Friend dashed (optional); friend icon is `users-three` (registered for this meaning; F used `users`, which means Refer) | F2 on Paper | F2 tiles | — |
| I1 · mic | VoiceInput idle: brand disc + `microphone` + *Tap and speak* | ask of core: VoiceInput | F2 mic | — |
| I2 · recording | VoiceInput recording: waveform above, the same disc becomes `check` + *Done*; her words above the tiles only if on-device speech-to-text allows | ask of core: VoiceInput | F3 | — |
| I1, I2 · Pick instead | Button ghost brand | `components/button.md` | G1 | — |
| I3 · what we heard | ListItem 72 ×3: icon tile 40 (`bgBrandSubtle`, same icon as the tile) · label Caption secondary · value BodyLg semibold · `caret-right` (tap to change); friend not said: grey icon, *Add a friend* in brand | `components/list-item.md` | F4 rows | — |
| I3 · actions | Button ghost *Say again* (mic) **above** primary *Find work* (button.md § Placement) | `components/button.md` | F4 | — |

### K · F2–F4 improved, the lead's sequence (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| K1–K3 · top card | The F question card (`bgBrandSubtle`, `radius.xxl`, Trainer placeholder at the corner) | F2 on Paper | F2 card | — |
| K1 · the three things | ListItem 72 ×3: icon tile 48 · label BodyLg semibold · her example in quotes BodyMd secondary; Friend tile dashed (optional) | `components/list-item.md` | I3 rows | — |
| K1 · arrow + *Tap to record* | *none — the drawn arrow*: proposed asset `asset/illustration/arrow-hand` (brand stroke, one curve) + Caption-weight label in `textBrand` | ask of core (assets.md) | — | Coachmark (`components/coachmark.md`): it is a dismissible overlay with a card and copy, too heavy for a pointer that should feel like a hand gesture |
| K1, K2 · mic / Done | VoiceInput idle → recording (same disc) | ask of core: VoiceInput | I1, I2 | — |
| K2a · rotating prompt | Top card holds one prompt at a time (icon 32 · *Say the time* · her example), cycling every 3 s; PageIndicator dots show which; **not tied to what she said** (one input) | `components/page-indicator.md` | F card | — |
| K2b · all three | Top card holds the three prompts as compact rows (icon 24 · example) | `components/list-item.md` (compact) | K1 rows | — |
| K3 · check | F card (*Is this right?*) + I3 rows with *Change* trailing; Say again ghost above Find work | `components/list-item.md` · `components/button.md` | I3 | — |

### Final row additions: loading, honest results (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1.05 · Finding work | Results shell (HeaderNav *Work for you* + the real *You asked* row, which is known content) + Skeleton shapes for the honesty card and three result cards; shimmer `motion.loop`; ≤ 3 s (`timeout.loading`), then EmptyState `waiting` | `components/skeleton.md` · `foundations/motion.md` | 1.06 layout | A full-screen spinner or a custom finding animation: both banned (skeleton.md: "a screen never spins"; motion.md: no custom loaders) |
| 1.06 · honesty card | The F question card (`bgBrandSubtle`, `radius.xxl`) + pictogram 56 (proposed `asset/picto/work-area` with the red ✗ status dot: *not available*, per assets.md's dot rule) + Heading3 *HSR and Bellandur are full right now* + *You asked …* with *Change*; speaks itself (P4) | F4 card · `foundations/assets.md` § Pictograms | F4 | The V4 line of text: true but read as small print; the meeting wants honesty *first* |
| 1.06 · results | Section label *Work close by* + the V4 cards + the waitlist link | V4 | V4 | — |
| 1.06 · full-right-now sheet (replaces the answer card) | BottomSheet `confirm` with two labelled actions (no ✕; scrim and drag do nothing; back = *Show work close by*): pictogram 96 (`work-area` + red ✗ dot) · Heading3 title + `speaker-high` (speaks on open, P4) · one body line · Button secondary brand L *Join the waitlist* **above** primary brand L *Show work close by* (`button.md` § Placement) | `components/bottom-sheet.md` · `components/button.md` | W1, H1 sheets | The answer card inside the results (rejected by the lead: two decisions on one screen) |
| 1.07 · Work close by | Results shell + section heading + the V4 cards only; no waitlist action on this screen | V4 | V4 | — |

### Lead's review on *Voice final*, 2026-10-07: hours step, friend sheet, simpler confirm

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| G4, G5 · step indicator | PageIndicator, now 4 steps (area · time · hours · friend); one grey dot added | `components/page-indicator.md` | G4/G5 indicator | — |
| G5b · header | HeaderNav back + *Hours a day* + PageIndicator 3 of 4 | `components/header-nav.md` · `components/page-indicator.md` | G5 header | — |
| G5b · picked so far | The G5 success chips (*HSR Layout* · *Morning*) | G5 on Paper · `components/chip.md` | G5 | — |
| G5b · hours | The G5 tiles (SelectionCard `compact` look, tap to advance as in G5) ×5: *8 hrs · Same as now* first, then 4 / 6 / 10 / 12. Leading pictogram 40 is G5's dial, with the pink wedge as long as the hours (4 = a third, 12 = full). Trailing pay slot *₹X / a month* | `components/selection-card.md` § shift option (pay slot) · G5 on Paper | G5 tile 40 + BodyLg SemiBold title + BodyMd description; the 1.07 card's pay column (BodyLg SemiBold amount, BodyMd *a month*) | — |
| G5b · Speak instead | Button `text` with `microphone`, as G4–G6 | `components/button.md` | G5 | — |
| G5c · backdrop | G5b under the scrim (`bgInverse` 60 %) | G5b on Paper | — | — |
| G5c · friend sheet | BottomSheet `confirm` with two labelled answers (the 1.06 shape): no ✕, scrim and drag do nothing, back = *No, just me*. `speaker-high` top right (speaks on open, P4). Pictogram 96 (`pink100` circle + `users-three`, placeholder for a two-experts picture). *Work with a friend?* Heading2. Button secondary brand L *Yes, add a friend* (leading `users-three`) **above**, primary brand L *No, just me* below | `components/bottom-sheet.md` · `components/button.md` · `foundations/icons.md` (`users-three` = work with a friend) | 1.06 sheet | `select` kind (Radio rows read as a form; two answers don't need a list). Safe confirm with ✕ (✕ would be a third, unlabelled answer) |
| G6 · header | HeaderNav back + *Add a friend* + PageIndicator 4 of 4. *Skip* removed: the sheet already asked | `components/header-nav.md` · `components/page-indicator.md` | G6 | — |
| G6 · body | Unchanged from G6 (chips now include *8 hrs*, they wrap); heading, number field, *Find work*, NumericKeypad | `components/numeric-keypad.md` · `components/button.md` | G6 | — |
| 1.08 = H1 · backdrop | 1.07 *Work close by* under the scrim (the screen the card is tapped on; it was the old V4 results) | 1.07 on Paper | — | — |
| 1.08 = H1 · title row | BottomSheet `confirm` · safe: *Move here?* Heading3 + IconButton `speaker-high` + IconButton `x` | `components/bottom-sheet.md` § Safe confirm | old H1 title row | — |
| 1.08 = H1 · map | MapSnippet 240 (static) with MapMarker `area` (`bgBrandSubtle` @ 40 %, 2 dp `borderBrand`, name on a `bgPrimary` pill) | `components/map-marker.md` § `area`, § MapSnippet | — | — |
| 1.08 = H1 · pay | Amount, now → here: *₹22,000* Title `textSecondary` · `arrow-right` 20 · *₹16,500* Display SemiBold + *a month* BodyLg `textSecondary`. Never red, never green (P6) | `components/amount.md` · `foundations/icons.md` (`arrow-right` = what she has now → what she'll have) | old H1 Amount hero | The old *₹5,500 less than now* caption: a sentence to read, where two numbers show it |
| 1.08 = H1 · facts | Tag L neutral soft ×2: `clock` *10 AM – 4 PM · 6 hrs*, `calendar-blank` *From Thu 8 Oct* | `components/tag.md` | — | ListItem rows (the old three rows read as a list of sentences) |
| 1.08 = H1 · lock | One line: `lock-simple` 16 + *Next change from 7 Nov* BodyMd `textSecondary` | `foundations/icons.md` | old H1 lock row | — |
| 1.08 = H1 · action | Button primary brand L *Move to Koramangala* | `components/button.md` | old H1 | — |

Read behind 1.08 / H1: `reads/mobbin-confirm-sheet/` (DoorDash Dasher, Swiggy, Shake Shack, Uber, Public).

### WM · waitlist with several areas (2026-10-07)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| WM1 · full right now, 3 areas | 1.06 sheet, title from one list pattern (*A* · *A and B* · *A, B and C*) | 1.06 on *Voice final* · `components/bottom-sheet.md` | 1.06 | — |
| WM2 · waiting card | W2 card: title *Waiting for work* + time/since line + static Chip × n (`map-pin` + area), wrapping; *Leave waitlist* ghost | `components/card.md` · `components/chip.md` | W2 | — |
| WM3 · leave | W3 confirm, copy counts the areas | `components/bottom-sheet.md` | W3 | — |
| WM4 · one area opened | W4 + one quiet consequence line naming the other areas | W4 | W4 | — |

### Lead's second review on *Voice final*, 2026-10-07: G1–G4 redrawn, calmer move sheet

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| G1–G3 · header | HeaderNav back only, no title (1.02's) | `components/header-nav.md` · 1.02 on Paper | 1.02 | — |
| G1 · card | The F question card (`bgBrandSubtle`, `radius.xxl`) · Heading2 *We didn't hear you* · *Listen again* (`speaker-high`); corner picture is a placeholder, `asset/illustration/phone-close` (a hand holding the phone close to the mouth), in place of the trainer | 1.02 on Paper · `foundations/assets.md` | 1.02 card | — |
| G1, G2 · the three | 1.02's ListItem 72 rows cloned unchanged (icon tile 48 · label · her example in quotes; Friend dashed) | `components/list-item.md` · 1.02 on Paper | 1.02 | — |
| G1 · mic | VoiceInput idle (1.02's disc) + *Tap to record* in `textBrand` under it; no hand-drawn arrow on a retry | ask of core: VoiceInput | 1.02 | — |
| G1 · Pick instead | Button ghost brand (1.02's) | `components/button.md` | 1.02 | — |
| G2 · card | F card · *We couldn't understand that* · *Listen again* · trainer placeholder | 1.02 on Paper | 1.02 card | — |
| G2 · her words | 1.04's sentence block (BodyLg Medium, Indic leading `heading3`) with no highlights, all `textSecondary`: nothing was understood | 1.04 on Paper | 1.04 sentence | — |
| G2 · actions | Button ghost brand *Pick instead* **above** primary L *Say again* (`microphone`) | `components/button.md` § Placement | 1.04 actions | — |
| G3 · card | F card · *No internet right now* (the one heading) · *Listen again* (P4: spoken guidance on an error she recovers from) · `wifi-slash` 40 on a `bgPrimary` disc where the trainer sits | `foundations/icons.md` (`wifi-slash` = offline) · `patterns/offline.md` | 1.02 card | — |
| G3 · one line | BodyLg `textBody` *What you said is saved* | `foundations/content.md` | — | — |
| G3 · actions | Button ghost brand *Pick instead* above primary L *Send again* (`arrow-clockwise`) | `components/button.md` | G2 actions | — |
| G4, G4a · header | Unchanged: HeaderNav back + *Pick your area* + PageIndicator 1 of 4 (cloned) | `components/header-nav.md` · `components/page-indicator.md` | G4 | — |
| G4, G4a · search | TextField `search` (cloned) | `components/text-field.md` | G4 | — |
| G4, G4a · picked | Chip, `choice` selected look (`bgBrandSubtle` + 1.5 `borderBrand` + `textBrand` BodyMd Medium, 40 tall, radius full) with a trailing `x` 20 that removes it; no leading `check` | `components/chip.md` | Chip `choice` selected | Chip `choice` (no remove affordance; the check would sit beside the ✕) · Tag (not interactive). **Ask of core:** a removable / input Chip kind |
| G4, G4a · list heading | BodyLg semibold *Areas near you* + counter BodyMd Medium `textSecondary` *2 of 3* / *3 of 3* trailing | `components/list-item.md` (section header) | G4 heading | — |
| G4, G4a · rows | ListItem `selection` 48: `map-pin` 22 · area · distance BodyMd · **trailing** Checkbox 24 (radius sm, 1.5 border `borderStrong` / filled `interactiveDefault` + `check` bold 16); checked row = `bgBrandSubtle` fill | `components/selection-controls.md` · `components/list-item.md` § selected | G4 rows | — (spec puts Checkbox leading; trailing is the lead's call, see Open questions) |
| G4a · at the cap | Unpicked rows disabled: `map-pin`, label and distance in `textDisabled`, the checkbox slot empty (lane kept) | `components/selection-controls.md` § disabled · `components/list-item.md` | G4 rows | — |
| G4, G4a · actions | Button ghost brand *Speak instead* (`microphone`) above primary L *Pick time* | `components/button.md` | G4 | — |
| 1.08 = H1 · title row | BottomSheet `confirm` · safe: Heading3 *Move to Koramangala 6th Block?* (the place in the title) + IconButton `speaker-high` (layer names the spoken line: *Move to Koramangala 6th Block, 10 to 4, from Thursday 8 October, ₹16,500 a month. You can change again after 30 days.*) + IconButton `x` | `components/bottom-sheet.md` § Safe confirm | old 1.08 | — |
| 1.08 = H1 · map | MapSnippet 200, radius lg, MapMarker `area`, **no name pill** (the title names it) | `components/map-marker.md` | old 1.08 map | — |
| 1.08 = H1 · pay | One line: *₹22,000* Title `textSecondary` · `arrow-right` 20 · *₹16,500* Display SemiBold + *a month* | `components/amount.md` · `foundations/icons.md` | old H1 pay | — |
| 1.08 = H1 · when | One BodyMd `textSecondary` line *10 AM – 4 PM · From Thu 8 Oct* (replaces the two Tags); the lock line moved into the spoken line and onto 1.09 | `foundations/content.md` | — | Tag ×2 (two more boxes; the lead called the sheet congested) |
| 1.08 = H1 · rhythm | Four blocks, `spacing.7` apart; pay + when grouped at `spacing.3`; Button primary L *Move to Koramangala* | `components/bottom-sheet.md` · `components/button.md` | — | — |
| 1.09 · lock line | One BodyMd `textSecondary` line under *From Thu 8 Oct*: *You can change again from 7 Nov* | `foundations/content.md` | old H1 lock row | — |

### One screen · iterations (2026-10-08): video → three things → record, without screen jumps

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| All · header | HeaderNav back + trailing *Type it* (the lead's 1.02/1.03) | lead's Figma 1.02 | 1.02 | — |
| A · fixed bottom dock | VoiceInput disc in one fixed place: disabled (video playing) → mic → ✓ Done + waveform → spinner | ask of core: VoiceInput | 1.03 | — |
| A · stage | HowToClip `guide` (playing) that collapses into its compact *Watch again* row | `components/how-to-clip.md` · `components/list-item.md` | 1.01 card (`bgBrandSubtle`, `radius.xxl`) | — |
| A · three things | ListItem ×3 with examples → collapses to a Chip strip while recording | `components/list-item.md` · `components/chip.md` | 1.02 rows | — |
| B · one card | HowToClip `guide` card that stays on screen; its last frame is the three tiles, then her words with the video bar turned waveform, then the highlights. The replay IconButton takes the speaker's place | `components/how-to-clip.md` · `components/icon-button.md` | 1.01 card; tiles take BenefitTile's icon disc + label + one line | `Card` alone (no clip states) |
| C · step list | Stepper `list` `ordered`: node 40 with a numeral, done = `check-circle` fill on `bgSuccess`, connectors `bgBrand` once passed. The current row expands to hold its content (HowToClip, the three tiles, her words) and carries the row's one Button L (*Start speaking* → *Done*) | `components/stepper.md` § `list` | Stepper row: title `Title`, node 40, the one Button in the current row. **Departs:** C2 lights 2 and 3 together (spec: one current) | A stepper across separate screens was today's problem |

### One screen · iterations, round 2 (2026-10-08): ideas she already knows, not a card layout

Lead on B: "looks too much like how would u make it". Round 2 changes the idea, not the styling. Each row borrows a
shape she uses every day.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D · header | HeaderNav back + the guide's Avatar `illustration` + name, trailing *Type it* | `components/header-nav.md` · `components/avatar.md` | 1.02 header | — |
| D · guide's video message | HowToClip `guide` inside an incoming bubble (portrait, `radius.xl`, progress bar) | `components/how-to-clip.md` | 1.01 card | — |
| D · the three | Three incoming bubbles: icon disc + label + example, `speaker-high` to hear it | *invention — WhatsApp-style chat (familiar to her)* | ListItem anatomy: icon 40 · BodyLg SemiBold · BodyMd secondary | ListItem (no "someone is telling me" voice) · VoicePrompt (one line only) |
| D · composer | *Type it* field (TextField `search` shape, no icon) + 56 pink mic disc | `components/text-field.md` · VoiceInput ask of core | TextField height and radius | — |
| D · her voice note | Outgoing bubble: `play` fill + waveform + `m:ss` + transcript if STT allows | *invention — voice note* | Timer format `m:ss` | VoiceInput (no sent state) |
| D · finding | Guide typing dots in an incoming bubble | `components/skeleton.md` (dots = the 3-dot loader already in 2.04a) | 2.04a dots | — |
| E · video | HowToClip `guide`, top half | `components/how-to-clip.md` | 1.01 | — |
| E · sentence with three blanks | One sentence in Heading2; the blanks are Chip-shaped slots (dashed `borderDefault`, icon only) that fill with what was understood | `components/chip.md` | Chip height 40, `radius.full`, icon 20 | ListItem ×3 (three separate things, no sentence to say back) |
| E · mic / recording / finding | VoiceInput disc, as A | ask of core | A dock | — |
| F · round video | HowToClip `guide` clipped to a 240 circle with a progress ring | `components/how-to-clip.md` | ProgressBar track/fill colours on a ring | Rectangular card (B: reads as a template) |
| F · the three | Three icon discs (48, `bgPrimary`, `shadow` none) in an arc above the mic, label + example under each | *invention* | BenefitTile icon disc + label | Chip strip (no sense of "around the mic") |
| F · mic | The same circle, shrunk to 112, becomes the VoiceInput disc; recording = concentric `pink-100`/`pink-200` rings | VoiceInput ask of core | A dock disc | — |

### E5 · edit what was understood, before finding (2026-10-08)

Lead: "lets say ive understood the area and time, but ill show a screen where they can edit, after we get the audio
recording". Sits after E3 (recording); E4 (finding) follows *Find work*. Tech note: this needs the understanding back
before the search runs (two steps: understand → she confirms → find), or the one call returns both and the results wait
behind this screen.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E5 · header | HeaderNav back + *Type it* (E row) | E2–E4 | — | — |
| E5 · the sentence, filled | E's blank in its `filled` state, now tappable: value + trailing `pencil-simple` ("change a saved detail") | E4 · `foundations/icons.md` | Chip height 48 · `radius.full` · 1.5 `borderBrand` | — |
| E5 · friend not said | E's empty dashed blank, tappable → G6 | E4 · G6 | — | — |
| E5 · actions | Button ghost brand L *Say it again* (`microphone`) above Button primary L *Find work* | `components/button.md` · G4a *Actions · ghost above primary* | G4a | — |
| E5a · change area | BottomSheet `select` (✕, scrim and drag close) holding G4a's body: search TextField, Chip `removable` strip, ListItem `selection` with trailing checkbox, counter *2 of 3*; Button primary *Save areas* | `components/bottom-sheet.md` · G4a | G4a rows, chips, counter | Full-screen G4 (leaves the sentence; one-screen ask) |
| E5b · change time | BottomSheet `select` holding G5's options as SelectionCards; the heard time first and chosen; Button primary *Save time* | `components/bottom-sheet.md` · `components/selection-card.md` · G5 | G5 clock pictograms | Full-screen G5 (same reason) |

### F4 · edit what was understood, before finding (2026-10-08)

Lead: "can u do for f1, f2 flows as well". Same step as E5, in F's shape: after F3 the three on the arc carry what was
understood; the mic in the middle goes quiet and becomes *Say it again*.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| F4 · header | HeaderNav back + *Type it* | F2/F3 | — | — |
| F4 · the three, filled | **Redrawn 2026-10-08:** the satellites land from the arc into three ListItem-shaped rows (Card `radius.lg`, 48 disc `bgBrandSubtle` + 1.5 `borderBrand`, value `Title` SemiBold, trailing `pencil-simple`); friend row dashed, *Add a friend* | `components/list-item.md` · F2 discs | F2 disc + icon, so the landing reads as the same three | Values on the arc with an edit badge (first draw — read as funny: floating arc, wrapped values, a big idle outline mic) |
| F4 · friend not said | F's optional satellite (dashed), tap → G6 | F2 · G6 | — | — |
| F4 · centre | Gone: the mic shrinks into Button ghost brand L *Say it again* (`microphone`) above the primary | `components/button.md` | E5 actions | 128 outline disc in the middle (first draw) |
| F4 · action | Button primary L *Find work* | `components/button.md` | E5 | — |
| F4a / F4b | E5a / E5b sheets, unchanged (one sheet per thing, shared by E and F) | E5a · E5b | — | — |

### S · "Does this look right?" summary card (2026-10-08)

Lead shared a reference (*Al Dente*, read in `reads/summary-confirm-ref/`): "try another iteration with something like
this". A third shape for the edit-before-finding step, beside E5 (sentence) and F4 (rows).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| S1 · title | *Does this look right?* Heading2 | reference read § 2 | — | — |
| S1 · summary | One Card (`radius.lg`, 1 `borderDefault`, `bgPrimary`) of ListItem `navigate` rows with dividers: 40 icon disc · label column (BodyMd `textSecondary`, fixed 64) · value (BodyLg SemiBold, wraps to 2 lines) · `caret-right` | `components/card.md` · `components/list-item.md` | ListItem row min 56 · divider `borderSubtle` | — |
| S1 · friend not said | Same row, dashed disc, value *Not said* in `textTertiary` | `components/list-item.md` | — | — |
| S1b · summary | Same rows, label stacked above value (BodyMd over BodyLg SemiBold) for Hindi and large font | `components/list-item.md` (two-line) | — | S1's two columns (may clip at 1.3× in Hindi) |
| S · actions | Button ghost brand L *Say it again* above Button primary L *Find work* | `components/button.md` | E5 / F4 | — |
| S · row taps | Place → E5a sheet · Time → E5b sheet · Friend → G6 | E5a · E5b · G6 | — | — |

### N · Narrated guide on F2 (2026-10-08)

Lead: first time after the video, a voice explains what to say; Place lights (Time, Friend off), then Time (Place,
Friend off), then Friend; only when the voice finishes does *Tap to record* switch on. Follow the lead's Figma F2
(`65:3348`) layout. New Paper page *Voice guide · narrated*.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| N · header | HeaderNav back + *Type it* (always live: her way out if she can't listen) | Figma F2 | — | — |
| N · narration | VoicePrompt `bar` under the header: disc `pause` while playing → `play` when finished (tap replays), track fills in real time, `speaker-high` sound toggle. Carries no text: the lit satellite is the transcript | `components/voice-prompt.md` § `bar` | 48 · `bgBrandSubtle` · disc 32 `bgBrand` | A caption line (VoicePrompt rule: never carries text) |
| N · the three | F2's satellites on the dashed arc, three states: **lit** (96 `pink-100` halo, 80 disc `bgPrimary` + 2 `borderBrand`, icon 32 `iconBrand`, label `textBrand` Title, example BodyLg SemiBold), **off** (disc `bgTertiary`, icon/label/example `textDisabled`), **ready** (F2 as drawn) | Figma F2 | F2 positions on the arc | — |
| N · record | F2's 128 mic disc, **off** while the voice plays (`bgTertiary`, `textDisabled` glyph, no halo, *Tap to record* in `textDisabled`), **on** when it ends (brand + halo, F2) | Figma F2 · ask of core VoiceInput | F2 | — |
| N · motion | Lit moves Place → Time → Friend on the voice's cue points, 300 ms (`motion.slow`) scale + colour; mic switches on at the end with one halo pulse | `foundations/motion.md` | — | — |

### O · Move overview: now vs new, before she commits (2026-10-08)

Lead: "one thing we completely missed … a proper overview page of what it is now, what it is going to be, like shift
hours, shift timings, location & distance, income, and whatever u think is needed". Sits between a card on 1.07 and
the move (replaces the 1.08 confirm sheet: the overview *is* the decision; a full screen has the room a sheet doesn't).
Data shown: area, distance from home + travel time, shift time, hours a day, pay a month, **pay an hour** (often the
same — the drop is fewer hours, not a worse rate), start day, the 30-day lock. Sample values: now Kudlu Gate · 3.1 km
· 9–5 · 8 hrs · ₹22,000; new Koramangala 6th Block · 4.4 km · 10–4 · 6 hrs · ₹16,500; both ₹110 an hour.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| O · header | HeaderNav back + title | `components/header-nav.md` | 1.07 | — |
| O1 · comparison | RateTable `matrix`: columns *Now* (`textSecondary`) · *New* (`textBrand`), rows Place · From home · Time · Hours · Pay; total band *Per hour* | `components/rate-table.md` | 48 rows · Caption column heads · Amount S cells · `bgSecondary` total band | — |
| O2 · rows | ListItem rows in one Card: 40 icon disc · label Caption · *old (`textTertiary`) → `arrow-right` → new (BodyLg SemiBold)* · trailing Tag with the difference (neutral, never red: FLOW § 1.07) | `components/list-item.md` · `components/tag.md` · `foundations/icons.md` (`arrow-right` = now → new) | Statement row anatomy | — |
| O3 · picture first | MapSnippet with MapMarker `me` + two area outlines (now grey, new brand); a day bar (6 AM – 10 PM track, two shift blocks); two pay bars | `components/map-marker.md` · `components/progress-bar.md` | ProgressBar track/fill radius and height | Text rows only (P1: picture before word) |
| O4 · card stack | Card *Your work now* (muted, `bgSecondary`) → `arrow-right` turned down → Card *From Thu 8 Oct* (`borderBrand`), rows map-pin / clock / currency-inr — the shape of her *Work area & time* card (1.10) | `components/card.md` · 1.10 | 1.10 card rows | — |
| O · lock line | `lock-simple` fill + *You can change again after 7 Nov* (P5: say why) | `foundations/icons.md` | — | — |
| O · actions | Button ghost *See other work* above Button primary L *Move to Koramangala* (→ 1.09) | `components/button.md` | 1.08 | — |

### O5–O7 · more overview iterations, from a Mobbin read (2026-10-08)

Read: `reads/mobbin-compare-change/` (Acorns, Speak, Fixtured, TheFork, Booking.com, Redfin, Upwork).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| O5 · table | RateTable `matrix` with **section rows** (*Where · When · Money*, each with an icon) and the *New* column as a `bgBrandSubtle` band whose `bgBrand` header tab (*New · from 8 Oct*) sits above the table edge (Acorns) | `components/rate-table.md` · read 01–03 | O1 rows, Tag for differences, *Per hour* total band | O1 (flat rows, the header carried no meaning) |
| O6 · tagged rows | One Card, ListItem rows: label Caption; **New** tag (brand) + value BodyLg SemiBold; **Was** tag (neutral) + old value `textTertiary` struck through; a difference Tag on the right (Booking.com, TheFork) | `components/list-item.md` · `components/tag.md` · read 04–05 | O2 | — |
| O7 · story | Card *Now* (muted) → 40 disc with `arrow-right` turned down → Card *New* (`borderBrand`), each with three big lines: place (Heading3), time, pay (Amount M) (Redfin, Upwork) | `components/card.md` · read 06–07 | O4 | — |

### P · overview, round 3: less generic, fewer words, more visual (2026-10-08)

Lead on O1–O7: "dont like any of em" → too generic / templated, too much text, not visual enough; "try all" four
directions. Rule for this round: icons and numbers carry it, labels only where an icon can't; one comparison per glance.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| P1 · two cards | Card *Now* (muted, narrow) beside Card *New* (`borderBrand`, wider, raised) with **aligned stat rows** (icon + value, no labels: `navigation-arrow` distance, `clock` time, `hourglass` hours, `currency-inr` pay); an `arrow-right` disc bridging them | `components/card.md` · `foundations/icons.md` | O4 | O1/O5 (table reads as a form) |
| P2 · hero + tiles | Pink stage hero (illustration slot, described) with the new area + start Tag; a 2×2 grid of stat tiles: icon disc, the new value at Heading2, *was …* Caption, a difference Tag | `components/benefit-tile.md` (tile anatomy) · `foundations/assets.md` (pink stage) | BenefitTile icon disc + value | O2 rows (too much reading) |
| P3 · your day | Two journey tracks on one clock (7 AM – 6 PM): MapMarker `me` at leave and home times, dashed travel, the shift block (grey now, brand new); big *Leave · Home* times; the pay line | `components/map-marker.md` · `components/progress-bar.md` (track) | O3 day bar | O3 (clock only showed work hours, not her day) |
| P4 · flip card | Tabs `segmented` *Now · New* over one big card (illustration stage, place, four icon rows at Title), PageIndicator 2 dots; the *New* side adds difference Tags | `components/tabs.md` · `components/card.md` · `components/page-indicator.md` | O4 card | — |

### Saathi · the Figma flow, rebuilt on Paper with the mascot (2026-10-08)

The lead asked to copy every screen of the Figma page *Hood & shift · Voice final* (outside *Iterations*) into a new Paper file, *Hood & shift · Saathi*, using the mascot, so the flow is clean. **The screens are copied, not redesigned.** Figma is the source for layout and copy, translated to Paper tokens. The only change is Saathi, placed by one rule. Evidence for the rule: `references/onboarding-mascot-2026-10-08/` (shipped onboarding: home bottom-right above the primary action, a pause pill with a waveform while she speaks, tap her to replay, no voice bar).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every screen · all regions | The lead's Figma frame of the same name | Figma `cIAH24e13VZJu31OmiMWrj` page `26:291` | Its layout, copy, components | — |
| Speaking screens · Saathi dock | VoicePrompt `bar` reshaped as the onboarding mascot dock: a pill (play/pause disc `bgBrand` + waveform bars, `radius.full`, a `pink.200` border) beside Saathi 64, right-aligned above the primary Button | `components/voice-prompt.md` § bar · shipped onboarding (reference above) | `bar`: play/pause disc, progress without a knob; tap = replay | The `bar` under the header (onboarding dropped it; two voice signals on S1b) |
| Idle / listening · Saathi dock | Same dock without the pill | as above | — | — |
| 1.01 · video stage | Saathi as the presenter in the video placeholder | `foundations/assets.md` § Characters | Illustration slot | — |
| S1b · top voice bar | **Removed.** Saathi's pill reads the summary back | onboarding reference | — | — |

**Where she appears:**
- **Speaking, pill with pause:** N1–N3 (at the lead's positions beside the lit item), S1b (both), 1.06, WM1, 1.08, P4a, 1.09, W4, WM4.
- **Idle, no pill:** N4 (her home beside the mic), F3 ×3 (the expert's turn).
- **As the presenter:** 1.01 ×2.

**Where she doesn't:** 1.05 (loading; `motion.md` allows no mascot loaders), lists (1.07, 1.10, W2, WM2, R3, R4), pickers (Add areas, Modify hours, G4, G4a, G5, G5b, G6 ×4), and confirms the expert opened herself (W1, W3, WM3, G5c). The *Listen* buttons on cards stay.

**Not yet decided:** whether the pill hides or switches to play when she finishes. The Paper file hides it, following the *Work details* frames.

### J · "You're on the waitlist": sheet, page or nothing new (2026-10-09)

Lead: after *Join waitlist* on W1, add a success state ("we've heard you, you're in the waitlist, we'll inform you when a slot opens"). Should it be a sheet or a page? Drawn on Paper *Hood & shift · Saathi*, page *Waitlist joined · iterations*. Saathi speaks the line on each one, so the screen carries only the title.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| J1 · sheet over W2 | BottomSheet `info` (dismissible: ✕, drag, scrim): pictogram hourglass-✓ 96, title, one body line, Saathi speaking dock, one `primary` verb | `components/bottom-sheet.md` § kinds (`info`: *Job started*) | W1's sheet shell; W3's hourglass-✓ | — |
| J2 · sheet with what she'll get | Same `info` sheet; the hero is a preview of the alert she'll get (Card: `bell` disc, *Work opened in HSR*, pay · time) instead of a pictogram | `components/bottom-sheet.md` · `components/card.md` · W4 (the alert itself) | W4 card rows | J1 hero (a picture of waiting, not of the alert) |
| J3 · full page | The W4 / 1.09 result page: ✕, hourglass-✓ 120, title, a Card of what she asked for (place · time · since), Saathi speaking dock, footer `primary` | `patterns`-level twin of 1.09 · W4 | W4 layout | — |
| J4 · nothing new | W2 itself: the *Waiting for HSR* Banner `brand` is the confirmation; a success Toast slides up and Saathi speaks | `components/feedback.md` § Toast (*past tense, ≤ 60 chars*) · § Banner | W2 | J1 (an extra tap to close) |

### L · areas and slots, voice-led (wireframes, 2026-10-12)

From the stakeholder review (SCOPE log 2026-10-12) and the lead's answers:
- areas are shown from what she asked for;
- hood names are specific enough to say and recognise;
- a slot = hood + start + hours.

Black-and-white wireframes on Paper *Hood & shift · Saathi*, page *L · wireframes*. Grey tokens only; the brand comes later.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| L1 · cluster card | Card `selectable` → navigate: name + *x km from HSR* (BodyMd secondary), then the deciding facts: **Up to ₹** (Amount M), **From 7 AM** (clock), slot count as a Tag | `components/card.md` · `components/amount.md` · `components/tag.md` · shipped 1.07 card | 1.07 card: name/distance left, pay right | 1.07 as is (no decision facts; reads optional) |
| L1 · waiting status | Banner `brand` compact (*Waiting for HSR · Bellandur*) | `components/feedback.md` § Banner | W2 waitlist banner | — |
| L2 · filter row | Chip `filter`, single-select per group: hours (only what exists), start part of day, prefilled from what she said | `components/chip.md` | — | G5/G5b pickers as separate screens (back-and-forth) |
| L2 · pay strip | ListItem with `Amount`: *8 hrs a day · ₹22,000 a month* (pay depends on hours only) | `components/list-item.md` · `components/amount.md` | Statement row | — |
| L2 · hood row | ListItem header (hood name + *x km from HSR*) over a wrap of slot Chips (*9 AM – 5 PM*); tapping a chip goes to Confirm (P4a) | `components/list-item.md` · `components/chip.md` | BookMyShow theatre + showtimes (meeting analogy) | One card per slot (12 cards, no grouping) |
| L1/L2 · voice footer | Saathi dock (speaking) + IconButton L `microphone`; heard text as a live line; no *Confirm* Button (choosing is the tap) | `components/voice-prompt.md` · Saathi dock (BUILD § Saathi) · `components/icon-button.md` | N4 mic handover | Button *Confirm* (an extra step after choosing) |
| L2b · after voice filter | Same L2; the chip changed; an inline *Undo* | `components/chip.md` · `components/feedback.md` § Toast with action | — | Asking first ("Show only 6 hours?"), which adds friction to a reversible action |
| L2c · same place, new time | L2 with one hood (hers), no cluster change | as L2 | — | — |

### L · styled explorations + the Saathi orb (2026-10-12)

Lead on the L wireframes: "ui is bad, explore more". They want one **stationary audio circle** that pulses so Saathi looks like she's speaking, and that you tap to talk and ask anything. Paper *Hood & shift · Saathi*, page *L · explorations*. Three directions, each with L1 (areas) and L2 (slots), plus a sheet of the orb's states.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every L screen · Saathi orb (bottom centre, fixed) | **Proposed core change**: Saathi dock + mic merged into one control. Saathi 64 in a circle; pulse rings while speaking; a mic badge when idle (tap to talk); turns `bgBrand` with a mic and live transcript while listening; a spinner ring while thinking | `components/voice-prompt.md` (`bar`: play/pause, replay) · Saathi dock (BUILD § Saathi) · E2 pulse rings · F3 live transcript | Tap-to-replay from onboarding becomes tap-to-talk; replay moves to a long press or to "say it again" | Dock + separate mic bar (L wireframes): two voice controls, one too many |
| D1 · L1 offer cards | Card, large, one per area, in a horizontal carousel with PageIndicator; the slot count drawn as pills | `components/card.md` · `components/page-indicator.md` · `components/amount.md` | L1 wireframe facts | L1 stacked cards (reads as a form) |
| D1 · L2 day strip | Each hood a row with a 6 AM – 10 PM ProgressBar-style track; slots as tappable blocks on it | `components/progress-bar.md` (track) · P3 "your day" | O/P3 day bar | L2 chips (time as words, not shape) |
| D2 · L1 map | Map stage with MapMarker: what she asked (HSR, waiting) and area bubbles sized by slots; compact ListItem rows under it | `components/map-marker.md` · `components/list-item.md` | 1.08 map | — |
| D2 · L2 map + rows | Map zoomed to the area with hood pins; ListItem per hood with time Chips | as above · `components/chip.md` | L2 wireframe | — |
| D3 · L1 question + answer pills | One large question line (*Which area?*); answers as large stacked SelectionCards (area, pay, start) | `components/selection-card.md` | Voice-led: the screen is Saathi's question | — |
| D3 · L2 time tiles | *Which time?*; time tiles grouped by hood, her ask highlighted | `components/selection-card.md` · `components/chip.md` | L2 wireframe | — |

### Flow wireframe · Areas → Hoods → Confirm, voice-led (Claude design canvas, 2026-10-12)

From `FLOW.md` v3. Grey only (`textPrimary`, `textSecondary`, `border`, `bgSubtle`; the full block and the ticked state in `textPrimary` as a fill so the wireframe reads in greyscale, P1 check 10); Outfit; 390 × 844 artboards; no brand colour, no illustration, no icons beyond the orb's mic. For discussion at the 2026-10-13 walkthrough — not evidence for a spec.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every screen · *You asked* strip | ListItem, compact: label *You asked* (BodySm secondary) over the ask (BodyLg), trailing text button *Change* | `components/list-item.md` · shipped 1.07 *You asked* | 1.07 strip | — |
| Every screen · Saathi orb | **Proposed core change** (SCOPE → Asks of core): Saathi 64 in a circle, bottom centre, states speaking / idle / listening / thinking; her words live above it while listening | `components/voice-prompt.md` · BUILD § L explorations | tap-to-replay → tap-to-talk | dock + separate mic (two controls) |
| 1 · Where / When fields | TextField, large, prefilled; the field being heard carries the `focus` border | `components/text-field.md` | — | — |
| 1 · spoken examples | Chip `suggestion` row (what she can say), tap = fills the field | `components/chip.md` | — | — |
| 2 · full block | Banner, `loud` (dark fill, white text): title *HSR is full*, text button *Tell me when it opens* inside | `components/feedback.md` § Banner | W2 waiting banner | Card `warning` (not loud enough — she must not call to ask why) |
| 2 · area card | Card `selectable` → navigate: name (TitleMd) · *1.8 km from HSR* (BodySm secondary) · **9 AM – 5 PM open** (BodyLg, bold) or *closest is 8 AM – 4 PM* · *3 hoods* Tag · Amount M trailing | `components/card.md` · `components/tag.md` · `components/amount.md` · shipped 1.07 card | 1.07: name/distance left, pay right | L1 card with counts (did not answer her ask) |
| 2 · waiting banner (W state) | Banner `brand` compact → grey here: *Waiting for HSR · since 7 Oct* · text button *Leave the waitlist* | `components/feedback.md` § Banner | W2 | — |
| 3 · hood row | SelectionCard, single-select: name (TitleMd) · km (BodySm) · her time as a ticked Chip `selected` (or the closest, with a *closest* Tag) · Amount M · text link *+5 other times* | `components/selection-card.md` · `components/chip.md` · `components/tag.md` | shift option card | hood header + wrap of time chips (made her pick a time) |
| 3 · T lane header | ListItem: *Kudlu Gate · where you work now* · *8 hrs a day · same pay* | `components/list-item.md` | Statement row | — |
| 3 · *now* time | Chip `disabled` with *now* label | `components/chip.md` | — | — |
| 4 · confirm sheet | BottomSheet `confirm`: title, Now row (struck) over New row, start day line, 30-day line, one `primary` Button with the verb, ✕ | `components/bottom-sheet.md` · P4a flip card (Figma V2) | P4a Now / New | — |
| Done | Result page: pictogram slot, title, one line, `primary` Button *Go to Home* | 1.09 (Figma V2) | 1.09 | — |
| W1 · J · W3 · W4 | BottomSheet `confirm` / `info`; W4 the 1.09-style result page with two Buttons | `components/bottom-sheet.md` · Figma V2 W1 / J2 / W3 / W4 | as Figma V2 | — |


### WA · HSR opens → WhatsApp → the app (2026-10-13)

The lane FLOW v3 left as "the push": when the work she waitlisted for opens, we tell her **on WhatsApp**, and tapping the message opens the app on that offer. Drawn on Paper *Hood & shift · Saathi*, page *WA · HSR opens → WhatsApp → app*. Every app screen is a duplicate of a FLOW v3 artboard with only the words changed; the one new drawing is the WhatsApp message, which is not our UI.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| WA1 · the WhatsApp message | Not an app screen: a WhatsApp Business **template** (body + one URL button that deep-links to the offer). Drawn as WhatsApp's own chat UI, in system greys and tokens only — nothing in it is ours except the words and the link | `foundations/content.md` § 1–5 · `patterns/new-job-alert.md` § 1 *Arrive* (the offer arrives outside the app) · `components/promo-card.md` *Invite on WhatsApp* (the one WhatsApp touchpoint the system has) | The W4 card's facts as the message lines (hood · time · hours · pay); the Button rules for the template button (a verb, ≤ 18 ch) | — (not a region of the app) |
| WA2 · the app opens on the offer | **W4 · Work opened in HSR**, unchanged — the link lands here, Saathi speaks | FLOW v3 § W4 · Paper W4 | — | — |
| WA2 · before the offer renders | Skeleton of the W4 result, no Saathi (the Loading rule); not drawn | `components/skeleton.md` · Paper *Loading* | — | — |
| WA3 · confirm | **4 · Move here?** safe-confirm sheet over W4; title and Button carry the hood | Paper 4 · `components/bottom-sheet.md` § confirm | — | — |
| WA4 · done | **Done · You're moving** | Paper Done | — | — |
| WA5 · too late — it filled up again | W4 shell: the hourglass pictogram **without** the check (W1's), Heading, one line *You're still on the waitlist*, Buttons **See work close by** · *Not now*; no card | Paper W4 + W1 pictogram · `patterns/new-job-alert.md` § 3a (*the job is gone — no error tone, no red, not her mistake*) · P6 | W4 layout | A Banner `warning` over the W4 card (a card she cannot take, under a warning, reads like a fault) |
| WA0 · J, the preview she sees when she joins | **J** sheet; the alert-preview card's head now says *WhatsApp · when HSR opens* with `whatsapp-logo` instead of `bell` | Paper J · `foundations/icons.md` `whatsapp-logo` | J2 | — |

**Words (English master; ships in her language, `content.md` § 7).** WA1 body: *Work opened in HSR* / *HSR Layout Sector 2 · 9 AM – 5 PM · 8 hrs* / *₹22,000 a month* / *Take it in the Snabbit app*; template button **Take this work** (14 ch; WhatsApp allows 25). WA5: *HSR filled up again* / *You're still on the waitlist · We'll message you next time* / **See work close by** · *Not now*. Saathi on WA2: "HSR में काम खुल गया। 9 से 5, ₹22,000। लेना है?"; on WA5: "HSR फिर भर गया। आप अभी भी waitlist में हैं।"

**Delete-a-line check (P1).** WA1 keeps four lines because WhatsApp has no picture, no Saathi and no shape — the words are the only channel there. WA5 drops the card: a card for work she cannot take is a thing to read that changes nothing.

### WA · the offer is a sheet, not a page — five directions (2026-10-13)

Lead on the WA lane: "why a full screen? It can come in the app too — a bottom sheet. Change the design, explore, read Mobbin." Read: `reads/mobbin-offer-sheet/` (Luma, Cash App, Sweatcoin, Noom, Glovo, Posh, Swiggy, DoorDash). The offer is one **BottomSheet `info`** that opens over whatever she is on — Home, the areas list, a job — so WhatsApp, a push and the in-app case all land on the same surface. The W4 full page is retired; WA2, WA3 (over W4) and WA5 were deleted from the WA page. Paper page *WA · the offer as a sheet · directions*; every artboard is a duplicate of the J sheet (W2 backdrop · scrim · sheet · ✕ · Saathi dock · one Button) with only the sheet's content changed.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1–D5 · the sheet | BottomSheet `info`: hero 96–120 above a centred Heading3 title, content, Saathi dock (speaking), one `primary` Button, ✕ top-right (dismissible: nothing is lost by closing — the slot goes to the next in line, so no second Button, P2/P3) | `components/bottom-sheet.md` § Anatomy, § kinds · Paper J | J sheet shell | Two stacked Buttons *Take this work* / *Not now* (Luma): a second Button for an exit that costs nothing |
| D1 · card | Hourglass-✓ 96 · title · **the shipped shift card** (hood · *What you asked for* · ₹ · Divider · time) | Paper W4 card (= shipped 1.07 card) · Cash App rows → one card | W4 | — |
| D2 · one figure | Title · *You'll earn* Caption · **₹22,000** Display + *a month* · three 48 dp rows with grey Phosphor icons (`map-pin` place, `clock` time, `calendar-blank` start) | one-hero rule (2026-10-12 confirm sheet) · Cash App fact rows · `components/list-item.md` · `components/amount.md` | D1/D2 confirm sheets | — |
| D3 · held for you | D1 + **Timer M `countdown`** between title and card: label *Yours for*, digits `h:mm:ss`, `calm` tone (stroke `iconSuccess`, digits `textSuccess`) | `components/timer.md` § Anatomy (M 132 × 56, stroke 4) · Noom *expires in* · Swiggy ring | — | A plain line *Yours till 8 pm* (digits only — P5 says a time she can run out of is a shape) |
| D4 · Saathi says it | Hourglass-✓ 120 · title · one BodyLg line *HSR Layout Sector 2 · 9 AM – 5 PM · ₹22,000* · Button; Saathi speaks the rest | P1 delete-a-line · Sweatcoin | — | — |
| D5 · too late | Hourglass 96 (no check) · *HSR filled up again* · *You're still on the waitlist* · **See work close by** | Paper W1 pictogram · `patterns/new-job-alert.md` § 3a · P6 | D4 | — |

**Recommendation.** D1 when there is no hold window (the card is the thing she already knows, nothing new to read); D3 when the hold window is confirmed (open question). D2 is the one-hero alternative if the lead finds the card flat. D4 is the floor — what the sheet is when every line that the picture or Saathi already says is removed.

### WA · D3 chosen — the whole lane and every scenario, one page (2026-10-13)

Lead: "D3 is nice and futuristic — now, on the same page, the flow from WhatsApp to the app and all the other scenarios." Paper page *WA · the offer as a sheet · directions*: row 0 the five directions, row 1 the WhatsApp path end to end, row 2 the other ways it goes, a FLOW MAP board above. **Drawn as if the hold window is decided** (the slot is hers till 8 pm that day) — still an open question in `SCOPE.md`; if the answer is *no hold*, D1 replaces D3 and C1–C2 lose their Timer. Every artboard is a duplicate of D3, Done, Entry or the areas screen with words, one state or one block changed.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A1 · WhatsApp message | WA1 + the hold as its own line *Yours till 8 pm today* | § WA (above) | — | — |
| A2 · the app opens on the sheet | D3, unchanged; the deep link opens the app where she last was and the sheet over it | § WA sheet D3 | — | A full page (retired) |
| A3 · taking | D3 with the Button `loading`: spinner in the icon slot, label kept, ≤ 3 s; no second confirm sheet — taking is the desired outcome and nothing drops (pay, time and place are what she asked for) | `components/button.md` § states · P3 *accepting is not protected* · `patterns/new-job-alert.md` § 3a | — | The FLOW v3 *4 · Move here?* sheet after the offer (two sheets saying the same facts; the consequence — the lock — is on A5) |
| A4 · Done | Done, HSR words | FLOW v3 Done | — | — |
| A5 · Entry afterwards | Entry *change booked*: *You are moving to HSR Layout Sector 2 · From Thu 15 Oct*; the waitlist ends by itself | FLOW v3 Entry | — | — |
| B1 · already in the app | The same D3 sheet over **Entry** (any screen she is on); scrim + sheet moved as a block | D3 · FLOW v3 Entry | — | — |
| C1 · last 5 minutes | D3 with the Timer in `attention`: stroke `iconWarning`, digits `textWarning` *4:59*; `urgent` at the last minute | `components/timer.md` § Tones | — | — |
| C2 · she closed the sheet | The areas screen; the status block becomes `open`: *Work opened in HSR · Yours for 2:14:05 · 9 AM – 5 PM* · text Button **Take this work** reopens the sheet | KIT status block (`open`) · W2 banner | W2 | A Toast (gone in 3 s; the hold is hours) |
| C3 · offline when she taps | D3: Button `disabled` + *Waiting for network…* under it; offline Banner `neutral` at the top of the page: *You're offline · Your place in HSR is still held*; retries every 3 s | `components/button.md` (disabled never alone) · `components/feedback.md` § Banner `offline` · `patterns/new-job-alert.md` § Edges | — | — |
| C4 · too late | D5 | § WA sheet D5 | — | — |

**Voice on the sheet** (FLOW v3 § Voice): "हाँ" / "लूँगी" takes it (response 2, *act here* — the Button's tap); "नहीं" / "रुको" = ✕; a question = Saathi answers, nothing moves; two misses → tap. **Sound:** the offer arrives with the new-job family's sound once (not looping — it is held, not a 90 s window); `sound.confirm` on A4; `soft-tick` entering `attention`.

### WA · back to a full page — stakeholder feedback (2026-10-13, later)

Lead: "sorry, but I got feedback saying we need a full page instead of a bottom sheet." The sheet directions stay on the page as the record of the exploration (row 0); the lane is rebuilt on the **W4 page** with D3's content kept. Same page, rows 1–2 replaced; the sheet-based A2, A3, B1, C1, C3, C4 artboards deleted.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| P2 · the offer page | **W4 · Work opened in HSR** (✕ header · hourglass-✓ 120 · Heading1 · the shipped card · Saathi dock · **Take this work** · *Not now*) with **Timer M `countdown`** between the title and the card: *Yours for · 2:14:05*, `calm` | FLOW v3 W4 · `components/timer.md` | W4 | BottomSheet `info` (D1–D5): explored, rejected by stakeholders |
| P2 · how it arrives | Takes over the screen like a job alert — from the WhatsApp link, a push, or while she is in the app; during a job it waits till check-out; never during SOS | `patterns/new-job-alert.md` § 1 Arrive | — | — |
| P3 · taking | Button `loading`, label kept | `components/button.md` | — | — |
| C1 · last 5 minutes | P2 with the Timer in `attention` (*4:59*, `iconWarning` / `textWarning`) | `components/timer.md` § Tones | — | — |
| C2 · she leaves the page | ✕ or *Not now* → where she was; the areas screen's status block holds the offer with the live Timer and **Take this work** | KIT status block `open` · W2 | — | — |
| C3 · offline | P2 with the Button `disabled` + *Waiting for network…*; offline Banner `neutral` under the header | `components/feedback.md` § Banner | — | — |
| C4 · too late | W4 shell: hourglass (no check), *HSR filled up again*, *You're still on the waitlist*, **See work close by** · *Not now* | W4 + W1 pictogram | — | — |

Rows unchanged: A1 WhatsApp, A4 Done, A5 Entry. Why *Not now* returns on the page when the sheet had only ✕: a page has no scrim to tap and ✕ is top-right, out of the thumb's reach (P3); the quiet exit under the primary is the W4 shape FLOW v3 already had.

### StatusCard · eight skins (2026-10-13)

Lead: the current status cards are not it — "even more crazy, doesn't have to be DS, but it should go well with the UI; read Mobbin; make a template or a component". Read: `reads/mobbin-status-card-crazy/`. Paper page *Status card · crazy iterations*. One anatomy across all skins (eyebrow = state · hero = the ask · one line · one pill · one picture); brief in `briefs/hood-shift-change-status-card.md`.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every skin · anatomy | Tier 3 StatusCard: eyebrow (BodyMd/Caption Medium) · hero (Heading1–Display) · line (BodyMd) · pill Button (40 dp, `radius.full`, ButtonMd) · one picture | brief · the lead's rule "ask big, state as eyebrow" (2026-10-12) | Banner's title/body/action order · PromoCard's media-ground idea | Banner `brand` / `loud` (reads as a notice); PromoCard (brand pink means tap) |
| D1 · poster | Flat `red.600` / `green.600`, two blob ellipses in the neighbouring steps, sticker hourglass (tone-100 fill, gray-900 3 px stroke, tilted), eyebrow pill gray-900, white pill | Lloyds Rewards | — | — |
| D2 · live track | `gray.900`; hero = *Full* in red-400 or the hold *2:14:05*; a three-stop track (Asked · Full now · We'll tell you / Waited · Open now · Yours), the current stop lit with a tone ring | Waymo live card · BeReal countdown · `timer.md` (digits never alone) | — | — |
| D3 · sticker table | `bgBrandSubtle` stage, the ask on a white ticket rotated −3°/2° with a gray-900 2 px border, a round stamp (tone 3 px ring, *Full* / *Open*) rotated | corner polaroids · Rodeo stickers | — | — |
| D4 · deep gradient | `gray.900` → `red.700` / `green.700` at 120°, three dashed gray-600 guides, hourglass silhouette in tone-400/300 with a blurred tone glow | Public Treasury | — | — |
| D5 · object hero | White card as the list below; the registered hourglass pictogram (96, and the ✓ version for open) left; Tag + Heading3 + tone pill right | Cash App · Starling · `assets.md` | the areas list card | — |
| D6 · ticket stub | 96 dp tone stub (hourglass + the state word) · 2 px dashed perforation with two notches · white body with the ask and a pill | ticket convention | — | — |
| D7 · aurora | `gray.900` with two blurred blobs (pink-500 + red-500 / green-400 + blue-500), silhouette at 25 %, glass pill (white 16 % fill, 40 % border) | Tolan · Stardust | — | — (drop first on a ₹10k phone, P8) |
| D8 · big word | Flat tone; the state word at 112 px, 22 %, cropped bottom-right; the ask over it | Rodeo's giant word | — | — |
| In context ×2 | The areas screen with D2 / D1 in the status slot | FLOW v3 W2 | — | — |

**Caught in review:** Paper's token set has no `red-800` / `red-900` (red stops at 700) — D4's gradient rendered white and D2's dot ring fell back; both now use `red-700`. Hero lines that wrapped under the sticker (D1) now carry *9 AM – 5 PM* with the place in the eyebrow.

### Filters · hood, hours, start time on the hoods page (2026-10-13)

Lead: "add filters to the hood selection page — a lot of hoods in a particular cluster; three filters: hoods, working hours, change the starting time; do on Paper." Screen in hand: Figma V2 *1.07* (the card list of a cluster's hoods and times). Read first: `references/shipped-app-2026-10-01-shift-option-card/`, `patterns/` (none filters), `components/chip.md` § Kinds, `components/bottom-sheet.md` § `select`, `components/selection-card.md`; then Mobbin (`reads/mobbin-hood-filters/`). Paper page *Filters · hood, hours, start time (2026-10-13)* in *Hood & shift · Saathi*. Note: FLOW v3 said *no filters* on 2026-10-12; the lead reopened it on 2026-10-13 (SCOPE → Log).

**The answer.** The three filters are the three parts of the ask she already sees pinned as *You asked*. So the strip becomes the filters: three chips that each hold a value and open one `select` sheet; the list re-answers; Saathi says what changed. Nothing is added to the screen.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A0 · the base | Figma V2 1.07 redrawn: HeaderNav · *You asked* strip · one expanded hood card (Tag *Best match*, radio rows with pay) · collapsed hood cards · Saathi · Button | `reads/figma-v2-read-2026-10-13.md` row 3 · Paper *1.07 · Work close by* | V2 words kept as presented (*Earn upto*, *+10 slots*) so the diff is only the filters | — |
| D1 · strip = filters (recommended) | *You asked* label over a **Chip row** of three **Chip `select`** (proposed kind): *All hoods ▾ · 8 hrs ▾ · From 9 AM ▾*; *Change* removed | `components/chip.md` § Anatomy, § Kinds (`filter` current-value default) · **ask of core: Chip `select`** | Chip 40 dp, `radius.full`, BodyMd Medium, 48 dp row, 8 dp gap; the trailing slot (count / `x`) carries `caret-down` 20; selected look (`bgBrandSubtle` + `borderBrand` 1.5 + `textBrand`) when the value differs from her ask, no leading `check` | Chip `filter` (one dimension, ≤ 6 inline values — hoods exceed six and three dimensions would be three rows) · Accordion (collapses, does not filter) · Button `neutral` secondary S (a Button does, it does not hold a value) · a `funnel` HeaderAction opening one all-filters sheet (the configure-everything sheet the stakeholders rejected 2026-10-12) |
| D1 · hood cards | SelectionCard `rich`-style hood card: name TitleMd · *landmark · km* BodyMd secondary · Divider · her time as a Radio row with pay trailing · text link *+N more times here*; the best match carries the Tag and the brand border; one radio group across the screen | `components/selection-card.md` · FLOW v3 § 3 · Paper *3 · Hoods in Agara* | shipped shift option card | — |
| D2 · strip kept + filter row | The V2 strip with *Change*, then a 48 dp Chip row of the same three `select` chips under it | as D1 | — | — (drawn for comparison: one more row, two places saying the same ask) |
| S1 · hood sheet | BottomSheet `select` single: title *Which hood in HSR?*, ✕, search TextField (> 8 hoods), Radio rows *All hoods in HSR · 14 hoods* (selected), then hoods nearest first with *landmark · km* and a trailing *N times* count; closes on pick | `components/bottom-sheet.md` § `select` · `components/list-item.md` · `components/text-field.md` | ListItem 64 rows, Radio leading | — |
| S2 · hours sheet | BottomSheet `select` single: *How many hours a day?*; rows *4 · 6 · 8 (Now) · 10 hrs*, each with Amount M *a month* trailing, because pay follows hours; only hours the cluster has | `components/bottom-sheet.md` · `components/amount.md` · `DECISIONS.md` 2026-10-01 *Hours, not shift types* | Statement row's amount trailing | — |
| S3 · start sheet | BottomSheet `select` single: *Start at what time?*; rows *7 AM … 2 PM* with the end time trailing (*till 3 PM*) for the hours chosen; her ask tagged *You asked*; only starts that exist | `components/bottom-sheet.md` · FLOW v3 open question d (exact time by voice; tiles for part of day stay in the S8 picker) | — | the S8 When tiles (part of day only — the lead asked for the start *time*) |
| R1 · re-answered | D1 after *6 hrs*: the hours chip in the selected look, every card re-answered for 6-hr times from 9 AM, pay updated, the closest time tagged where 9 AM has none, Saathi dock *speaking* | FLOW v3 § Voice response 1 · `components/voice-prompt.md` | — | — |

**Voice (FLOW v3 § Voice).** "6 घंटे वाला" · "8 बजे से" · "Sector 9 दिखाओ" are response 1 (*re-answer*): the matching chip changes first, then the list. Saathi on R1: "6 घंटे वाले टाइम दिखा रही हूँ। Sector 7 में 9 से 3 है।" Tapping a chip is response 2 (*act here*).

**Delete-a-line check (P1).** *You asked* stays as the one label (it names what the three chips are). *Change* goes: it is now three taps. The sheets carry a question each and nothing else; every row is data she acts on.

**Open.** *Hood* on screen (FLOW v3 open question e) — the chips say *All hoods* because the lead's ask says hoods. The Button says *Confirm* as V2 does; the system label is the verb (*Move to HSR Sector 7*). Whether an *All hoods* row belongs in the hood sheet, or the hood chip is simply blank until she narrows, is for the walkthrough.

### Filters · iterations D3–D7, D1 kept aside (2026-10-13, later)

Lead: "try other iterations, let's keep D1 aside." Same page, row 2. Five more places the three filters can live; every one keeps the rules (prefilled from what she said, only values that exist, re-answer at once, Saathi says what changed).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D3 · three inline rows | Three **Chip `filter`** rows under the strip: hoods (*All* first), hours (hers selected, *All* last), start (hers selected); each row scrolls sideways with the trailing fade | `components/chip.md` § Kinds `filter`, § *When the filter default is her current value* · `DECISIONS.md` 2026-10-01 | — | — (nothing new in core; 144 dp of rows is the cost) |
| D4a · one sheet | HeaderAction `funnel` 48 (pressed) → BottomSheet, `form`-shaped: title *Narrow it down*, ✕, three sections (Hours · Start · Hood) each a wrapping row of Chip `filter`, one `primary` Button whose label says what she gets (*Show 3 times*) | `components/header-nav.md` · `components/bottom-sheet.md` § Anatomy · `components/chip.md` (`reason`'s wrapping rule) | `select` sheet shell | A tabbed all-filters sheet (Doji in `reads/mobbin-hood-filters/`; the stakeholders' "SaaS tool", 2026-10-12) |
| D4b · applied | The funnel carries a Badge count; what she narrowed sits above the list as **Chip `removable`** (*6 hrs ✕ · Sector 9 ✕*), each ✕ removing its filter at once; one line under the list says how many and how to widen | `components/chip.md` § `removable` · `components/badge.md` | G4 picked-areas strip | — |
| D5a · pick the hood first | A screen, not a filter: HeaderNav *Hoods in HSR* · strip · search TextField · one line (*14 hoods · nearest first · 9 AM – 5 PM open in 9*) · ListItem `navigational` rows: name (+ Tag *Best match*), *km · her time's state*, trailing count + `caret-right`; no Button (the rows are the action, P2) | `components/list-item.md` · `components/text-field.md` · FLOW v3 § 2 area cards (the facts answer her ask) | Areas screen | — |
| D5b · that hood's times | HeaderNav *HSR Sector 9* · strip · the hours Chip `filter` row · one card: *landmark · km* + pay, Radio rows of that hood's times (hers ticked, Tag *Your time*), *+2 more times*, text link *Other hoods in HSR* | `components/chip.md` · `components/selection-card.md` · Paper *T · Times at Kudlu Gate* | T-lane card | — |
| D6 · bar at the bottom | The three Chip `select` (proposed) docked in the footer above Saathi and the Button, carets pointing up because the sheets open from the chip | `components/chip.md` · P3 (frequent taps in the bottom third) | D1 chips | A FAB (one more floating thing beside Saathi) |
| D7 · pictures, not words | Hoods as a Chip `filter` row; **hours as four dial tiles** (the S8 picker's `hours-dial-*` pictograms, 40, with pay under each); **start as four dial tiles** (*9 AM · as now*, *Morning*, *Afternoon*, *Any time*, the `time-dial-*` pictograms); selected tile = `bgBrandSubtle` + `borderBrand` 1.5 | Paper *S8 · When picker* · `foundations/assets.md` (registered dials) · `components/selection-card.md` `tile` | SelectionCard `tile` anatomy (picture over label over fact) | Chips for hours (a number she has to read instead of a shape she can see, P1) |

**What each costs.** D3 nothing in core, 144 dp of screen. D4 needs `funnel` registered in `foundations/icons.md` (*narrow a list*); closest to the sheet the stakeholders disliked. D5 one more screen. D6 a 210 dp footer. D7 the tallest header, strongest for a first-week expert; start is part of day, so an exact time stays by voice (FLOW v3 open question d).

### Guide cards · Place · Time · Expert ID, redrawn (2026-10-13)

Lead, on Figma V2 N1–N4 / F3: replace the tone-on-tone circles with an abstract shape and pattern that shows only in the top-right corner (masked with a gradient); align the scattered Place and Time cards; one consistent icon set; the map must look like a map, Time like a clock (and less colourful); explore Expert ID's icon and colour; saturated but gentle colours; check accessibility. Read: `reads/mobbin-guide-cards/`. Paper page *Guide cards · Place · Time · Expert ID (2026-10-13)* in *Hood & shift · Saathi*. Tier: Local (`TIERS.md` G1) — no system component is a "what to say" card.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every card · anatomy | Local guide card: picture (top) · label + value (bottom), `space-between`; hero 164 × 212 `radius.xl`, side 112 × 144 `radius.lg`, padding `spacing.5` / `spacing.4` | the lead's B2 fan (Figma V2 `213:17449`) | SelectionCard `tile` type roles: label Heading3 (hero) / BodyLg SemiBold (side), value BodyLg Medium / BodyMd in the hue's 900; Indic leading ×1.15 on the Time value | SelectionCard `tile` (selectable — these cards are not tappable, and a tile reads as a choice); HowToClip `guide` (one item, not three) |
| Corner pattern | SVG pattern under a white radial-gradient mask centred on the top-right corner (opaque at the corner, gone by ~0.95 × the card's width) | Paper renders SVG `<mask>`; a CSS `mask-image` did not render (probe, 2026-10-13) | — | the circles (asked to remove) |
| A · flow lines | Nine white wave lines, same on all three cards | — | — | — |
| B · map, dial, badge | Streets (Place) · minute ticks of a dial edge (Time) · ID-card lines (Expert ID), each white | — | — | — |
| C · white card | White card, 1 px `borderDefault` (2 px hue-300 when lit), a hue-300/200 blob + white dots in the corner | — | — | — |
| D · abstract shapes | Two soft blobs (hue-200 + white) + a hue dot field | — | — | — |
| E · recommended | B's pictograms + A's flow lines (one abstract pattern for all three) | — | — | — |
| Picture · Phosphor (A, C, D) | 64 white disc (C: hue-100 disc; D: white squircle `radius.lg`) with a 32 Phosphor glyph in the hue's 700; **`fill` on the lit card, `regular` otherwise** (icon rule) | `foundations/icons.md` | Brink's one-container rule | — |
| Picture · drawn pictograms (B, E) | 72 white tile `radius.xl` holding a 64 pictogram: a map (hue-100 ground, white roads, hue-200 blocks, hue-700 pin), a clock (white face, gray-200 rim, gray-500/300 hour dots, gray-900 hands at 9:00, the 9-to-5 span as one hue-300 arc), an ID badge (hue-100 card, hue-700 clip, photo and name line) | `foundations/assets.md` § Pictograms (placeholder drawings — to be registered and drawn to the style lock) | Grab's map = roads + pin | Phosphor `map-trifold` (reads as a folded map, not *her area*); the B2 lime pie (read as a chart, not a clock) |
| Colours | Place sky · Time lime · Expert ID violet (alternatives teal, peach); lit = 300 (lime 200), beside = 200 (lime 100) | proposed palette steps, `SCOPE.md` → Asks of core | — | The B2 50/100 tints (too pale, lead) |
| N1–N4 · F3 arrangement | **Aligned fan**: hero at 98, 8; sides 112 × 144 on the hero's centre line (top 42), ±6°, each tucked 12 under the hero, the right card mirrored (picture and words on its outer edge) | Arrangement board | the V2 slots and Smart-Animate names (*Card · Place*, …) | V2 geometry (sides 18 px low, ±8°, the hero covered *Time*'s words); straight (calmer, loses the deck); row of three (offered for N4/F3 only) |
| N4 / F3 · rest of the stage | Unchanged from V2: header clone, *Tap to record*, Saathi grey → colour with the mic badge, ripples, her words, loader ring, *Watch again* / *Listening* | Paper *1 · Main flow* `WO-0` header; prototype `screens/spine.js` stage geometry (from V2 `get_design_context`) | — | — |

### Guide cards, round 2 · deep ground, one white object (2026-10-13, later)

Lead: "good iterations, but I'm not liking the colour itself as base … I like the 3rd one" (three references). Read: `reads/lead-refs-deep-cards-2026-10-13/`. Same Paper page, rows 4–6. The anatomy, type roles and the aligned fan from round 1 are unchanged; the ground and the picture change.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Ground · deep | `radial-gradient(circle at 100% 0%, hue-700, gray-900 78%)` — sky (Place) · teal (Time) · violet (Expert ID) | ref 3 (mood only) | round 1 hues, one step to 700 | round 1's 200/300 fills (rejected: "the colour as base") |
| Ground · light | hue-200 → gray-100 | — | — | — |
| Ground · muted | hue-300 → gray-300 | ref 1 (Givingli, shipped) | — | — |
| Object · Place | Folded map: three flat SVG panels (white · gray-200 · gray-100), roads, a park, a pin with a lit head and a hole, a soft shadow | round 1 pictogram (roads + pin) | 128 box at the top-right, cropped by the card edge | CSS skew panels (Paper ignores `skewY`) |
| Object · Time | Alarm clock: CSS radial-gradient body and bells (white → gray-100 → gray-300 → gray-400/500), recessed face, flat SVG hour dots and hands at 9:00 | — | — | — |
| Object · Expert ID | ID badge on a lanyard: gradient card, clip, slot, photo with silhouette, name lines | round 1 badge | — | — |
| Type | label `textInverse` (deep) / `textPrimary`; value gray-200 (deep) / `textBody`; words bottom-left (bottom-right on the mirrored card) | round 1 | — | — |
| F1 · all deep | every card deep, lit = size + centre | — | — | — |
| F2 · deep lit, light beside | lit card deep; beside and all three on N4 / F3 light, so the pink mic stays the strongest thing (P2) | — | — | — |
| F3 · muted | all cards muted | ref 1 | — | — |

**Contrast (measured):** white on gray-900 17.7; gray-200 on gray-900 14.3 (4.4–5.7 only if the corner light reached the value line, which it does not — the words sit in the gray-900 end); light 9.4–16.1; muted 5.6–12.0; object edges gray-500 on gray-100 4.4, on gray-300 3.3; clock hands 14.7.

### Old hood vs new · pay and hours called out (2026-10-14)

Feedback via the lead on 1.08 *Compare two hoods* and P4a *Confirm your move*: show which hood is hers now and which is new, and highlight pay and hours in both directions. Read: `reads/mobbin-old-vs-new-delta/` (+ `mobbin-compare-change`, `mobbin-confirm-hierarchy`). Lead picked direction 1 for the compare sheet and 2 for the confirm. Paper page *Old hood vs new · pay & hours called out (2026-10-14)*: row 1 = direction 1, row 2 = direction 2, each in three cases (pay up + same hours · pay down + hours down · pay up + hours up). Artboards are duplicates of Paper 1.08 / P4a with only the sheet or the middle rebuilt.

**The delta chip (one rule on both screens).** Tag S anatomy (`radius.sm`, Caption SemiBold, `spacing.1`/`spacing.3`), leading `arrow-up` / `arrow-down` 16, words that say direction and size. Pay up: `bgSuccess` + `textSuccess` *₹2,000 more*; pay down: `bgWarningSubtle` + `textWarningStrong` *₹5,500 less* (never red — she is choosing it, P6); hours either way: `bgTertiary` + `textBody` *2 hrs less a day* / *2 hrs more a day* (neither good nor bad); unchanged: `bgTertiary` + `textSecondary` *Same hours* / *Same pay*, no arrow. Direction is always arrow + word, colour third (P1).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1 · compare sheet | BottomSheet: Heading3 *Compare two hoods* · Card *Your hood now* (`bgSecondary`, `borderDefault`, Tag neutral, all text `textSecondary`/`textTertiary`) · 32 disc with `arrow-down` · Card *New hood* (`bgPrimary`, 2 dp `borderBrand`, Tag brand soft) with pay Title + *a month* + pay chip, Divider, `clock` time row + hours chip · cloned Actions (Saathi dock + Button *Move to …*) | `components/bottom-sheet.md` · `components/selection-card.md` · `components/tag.md` · Figma V2 1.08 | the shipped option card (name/area left, pay right, divider, time) | unlabelled pair (today's 1.08: which is hers depends on position) |
| 2 · confirm | Heading2 *Confirm your move* · one Card, three rows (`map-pin` / `clock` / `currency-inr` 24 `iconBrand`): old value BodyMd `textTertiary` struck, new value (Title; pay Heading2 + *a month*), sub-line; Tag *New hood* · hours chip on the right · pay chip under the amount · status banner + Actions unchanged | `components/statement.md` row anatomy · `components/amount.md` (`muted` struck) · `reads/mobbin-confirm-hierarchy` (one hero: pay) | KOHO / MacroFactor was → now | P4a's three cards (*Shift details*, *Earning details*) with a bare *2 less* tag |

Fixed in review: in row 2 the pay chip beside ₹22,000 wrapped the amount onto two lines; the pay chip moved under the amount and now reads *₹2,000 more a month*.

**Open.** Colours were not confirmed by the lead (green / amber / neutral hours is the recommendation). `arrow-up` / `arrow-down` are registered as *Stat delta*; this use (*change versus her current*) extends the meaning — raise in `foundations/icons.md` if adopted. 1.08 and P4a now carry the same facts; whether to merge them stays open.

### Old vs new · iterations I1–I4, picture before word (2026-10-14, later)

Lead: "not liking this iteration, our expert still doesn't understand this — explore more." The 1 / 2 screens asked her to read tags and struck numbers. Four new directions on the same Paper page, rows 3 (pay and hours down) and 4 (both up); each is a full confirm page with the same top, footer (start day, Saathi, one Button) and data.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| I1 · the change is the headline | One hero card: 64 disc with `arrow-down` / `arrow-up` 32, *₹5,500 less* / *more* at Display, *every month*, a white pill `clock` *2 hrs less / more work a day*; card `bgWarning` + `borderWarning` (down) or `bgSuccess` + `borderSuccess` (up). Under it one small card: place, time, pay as *old → new* lines (`arrow-right`) | P1 (number before word, one hero) · `components/amount.md` · Opal *Before / After* | one-hero rule | rows of tags (direction 1/2) |
| I2 · bars and clocks | Place as two pills (grey now → brand new). *Pay a month* card: two bars, now `gray.300`, new `bgBrand`, heights proportional to pay (data, not tokens), amount on top, *Now* / *New* under; delta chip in the header. *Work a day* card: the registered `hours-dial-8h` / `hours-dial-6h` pictograms, now → new, chip in the header | P1 (*a shape that changes*) · `foundations/assets.md` hours dials (S8 picker) · `dataviz` bar | S8 When picker | chips alone |
| I3 · Now / New columns | One table: icon gutter (`map-pin` / `clock` / `currency-inr`), grey *Now* column (`bgTertiary` header, `bgSecondary` cells, secondary text), pink *New* column (`bgBrand` header, `bgBrandSubtle` cells, primary text) with the chip under the changed value | `reads/mobbin-compare-change` (Acorns / Cash App column band) | RateTable `matrix` | two stacked cards (direction 1) |
| I4 · timeline | Rail: grey dot → line → pink dot. *Till Wed 7 Oct* + muted card (place · time · hrs · pay in one line) → the changes as pills on the line (*₹5,500 less a month*, *2 hrs less work a day*) → *From Thu 8 Oct* + brand card (place Title, time, pay Heading2) | KOHO plan-change timeline (`reads/mobbin-old-vs-new-delta`) | Stepper rail | a start-date banner (said *when* but not *what changes*) |

Bars use data-driven pixel heights; everything else is tokens. Not yet reviewed by the lead.

### Move flow · list → what changes → confirm → done (2026-10-14)

Lead asked which two screens come and in what order; agreed: **difference first, commitment second**, each screen one question. Paper page *Move flow · list → what changes → confirm → done (2026-10-14)*, row 1 pay and hours down (Kudlu Gate → Koramangala 6th Block), row 2 pay up with the same hours (Kudlu Gate → Marathahalli, matching the list's ₹23,000 · 9–5 card).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1 · List | Paper *1.07 · Work close by*, duplicated; the tapped card carries the 2 dp `borderBrand`; the Koramangala card's time corrected to *10 AM – 4 PM · 6 hrs* | Paper 1.07 | — | — |
| 2 · What changes (sheet) | Paper 1.08 sheet shell over the list; contents = I2: Heading3 *What changes for you* · place pills (grey now → brand new) · *Pay a month* bars + delta chip · *Work a day* hours dials + chip (*Same hours* when equal) · cloned Actions (Saathi dock + *Move to …*). Closing returns to the list | BUILD § I1–I4 (I2) · `components/bottom-sheet.md` | 1.08 | 1.08 Now/New pair (direction 1) |
| 3 · Confirm (page) | I4 timeline: *Till Wed 7 Oct* muted card → the change as two small chips (already seen on the sheet) → *From Thu 8 Oct* brand card → `lock` *You can change again after 30 days* · Saathi · Button *Confirm move* (the second deliberate step, P3) | BUILD § I4 · FLOW v3 § 4 | P4a | was → now card (direction 2) |
| 4 · Done | Paper *Done · You're moving*, words changed | FLOW v3 Done | — | — |

## Old vs new · creative + interactive (2026-10-14)

The lead's instruction was to set the DS aside: be creative, in English, with interaction. These are exploration frames, not system builds. Raw colours and the dark face-off theme are deliberate, so tokens are not applied. Paper page *Old vs new · creative + interactive (2026-10-14)*. Each concept is drawn for both directions: Kudlu Gate → Koramangala 6th Block (₹22,000 → ₹16,500, 8 → 6 hrs) and Kudlu Gate → HSR Layout (₹22,000 → ₹27,500, 8 → 10 hrs).

| Concept | What it is | Interaction | Highlight rule |
| --- | --- | --- | --- |
| A · Face-off | Game "VS" screen. Now card and New card face each other, followed by rounds for money, work and timing. In each round, bars grow out from a centre line | Cards slide in from both sides and the VS disc slams in. Rounds then play one by one: the bar grows, the result pill pops in, and a tick sounds | Money down orange-red ▼, money up green ▲ with the round outlined. Hours blue ▲/▼ |
| B · Flip it | One *Your month* card plus a Now / New switch. The money comes with a cash stack and the hours with hour blocks | Flipping makes the numbers count down or up. Lost notes fly off the stack and lost hours turn into green "home" blocks. *Switch to …* stays disabled until she has flipped once | ▼ ₹5,500 less pill, and old value struck through. ▼ 2 hrs less work · home earlier |
| C · Day clock | A 12-hour clock with the new work arc. The old 9–5 is drawn as a dotted outer ring | The pink arc shrinks or grows away from the dotted old arc, then the difference lights up | Freed hours green (*1 hr more at home*). Extra hours blue (*1 hr more work*). The money card sits below |
| D · Stamped slip | The new pay slip lands on top of the old one, which peeks out behind | The slip drops in, then the stamps thump onto it one by one | Red *₹5,500 LESS* or green *₹5,500 MORE*. Blue *2 HRS LESS / MORE WORK* |

## Confirm your move · polished with AI pictograms (2026-10-14)

The lead asked to polish the *Confirm* frame on the *Old hood vs new* page, generate the images with AI and drop the line icons. The original frame is untouched. The polished copy sits beside it as *Confirm your move · polished (AI pictograms)*, built in tokens throughout.

| Region | Built from | Change from the original |
| --- | --- | --- |
| Header | HeaderNav | Title is now *Confirm your move*. The duplicate body heading is gone |
| New hood card | Card plus an illustration Scene (`foundations/assets.md` § Scene prompt), Nano Banana 2.1, 16:9 | A neighbourhood scene with a pin replaces the `map-pin` icon. The start date folds into the subline (*Koramangala · from Thu, 8 Oct*), which removes the floating green date strip |
| Time row | Statement-style row plus a 56 dp Pictogram (§ Pictogram prompt: clock) | Old value struck, new value at Heading2, and a neutral delta chip *▼ 2 hrs less work a day* |
| Pay row | The same, with a coins-and-note pictogram | The `currency-inr` glyph becomes a pictogram. A success delta chip reads *▲ ₹2,000 more a month* |
| Actions | Button L | Unchanged |

The three generated assets are not registered yet. If the lead keeps them, they go into `foundations/assets.md` as `hood-street` (Scene), `clock` and `money-stack` (Pictogram).

## Voice · when to speak — iterations (2026-11-12, Figma page 26:291)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Every frame · status bar, close, caption, Time card, bottom glow | the V4 FB2 screens, cloned | Figma `481:41190` / `481:41234` / `481:41292` / `481:41350` | everything; pearl card at its size | — |
| A · Tap to speak · mic | Button `icon-only` (pink, 88) + library Icon `mic-stroke` | `components/button.md`, library Icons | pink-600 fill, white icon, 2 soft rings | the current "Speak now" line (missed in the field) |
| A/C · listening · stop / hold | same button, live state | `components/voice-prompt.md` (listening) | waveform in pink-600 | — |
| B · auto-listen hand-off | VoicePrompt `listening` scaled up: mic in the centre, "Speak now" as the one line, chime + buzz | `components/voice-prompt.md` | — | small label (today) |
| C · hold to speak | WhatsApp hold-to-record, translated | `reads/voice-turn-taking/` | timer pill like WhatsApp; Button size | tap (A) |
| D · Saathi ↔ you | Saathi orb (the 1.07 screens' orb) + A's mic | Figma `481:37072` | orb 120 → 64 when it is her turn | — |
