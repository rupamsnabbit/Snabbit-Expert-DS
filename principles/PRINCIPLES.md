# Snabbit Expert — Design principles

The rules every screen and component in the Expert app must satisfy. Tokens say *what values* to use; these principles say *what the experience must do* for the person holding the phone. A component that follows the tokens but fails a principle is not done.

Audience: design, KMP/Compose engineers, AI agents building screens, and ops/training/leadership who need to understand why the app looks the way it does. Every principle ends with checks that can be answered yes or no.

---

## Who we design for

An expert is an adult professional — most often a woman from the same neighbourhood as her customers — who was doing this work informally before Snabbit and now does it on a schedule, in uniform, with a phone as her dispatcher.

**She reads slowly, in her own script.** Hindi, Kannada or Marathi first; some English. Short, familiar words work. Sentences, abbreviations and anything she has to *work out* do not. She is not illiterate and must never be treated as if she were — but the app must never *depend* on reading to be safe or to earn.

**Her phone is a ₹8–15k Android.** Small screen, older OS, limited RAM, cracked glass more often than not. Data is prepaid and sometimes runs out mid-shift. Network drops in lifts, basements and stairwells — exactly where she spends her day.

**She is usually moving.** Walking or on an e-bike between homes in a sub-1 km cluster, in sunlight, one-handed, bag on the other shoulder. Inside a home her hands are wet or soapy. The app is glanced at, not studied.

**Her income depends on the app.** Punctuality, attendance and quality incentives make the difference between ₹10k and ₹35k a month. Every job accepted, every check-in on time, every tier climbed is real money. Getting this wrong is not a UX bug; it is her rent.

**She is motivated by progress she can see.** Tiers, streaks, contests and celebrations work — they are how she knows she is doing well. The app should be a warm, encouraging colleague who is proud of her, not a neutral tool and not a nag.

**The hardest moment is a new job arriving.** A full-screen alert with a sound and a countdown, while she may be finishing another task or crossing a road. She has seconds to understand *where, what, how long, how much* and to accept without a mistake.

---

## The principles

### 1. Show first, then say

Meaning is carried by icon, colour, shape and sound *together*. Text confirms; it never carries meaning alone.

Why: she reads slowly and glances quickly. If understanding waits for reading, she is slower than the countdown, slower than the customer at the door, slower than the expert next to her.

Rules

- Every state (success, warning, error, selected, disabled, in-progress) is expressed by at least two of: colour, icon, shape, motion. Never colour alone; never text alone.
- Every action button has an icon, or is the only button on the screen.
- Icons are Phosphor Icons only — `regular` by default, `fill` when selected or active — with one meaning each. The same icon never means two things; two icons never mean the same thing.
- Amounts, times and distances are large and numeric (`Heading2` or bigger for the primary figure), with the unit shown as a symbol or short word (₹, min, km).
- Text is short, sentence case, in the expert's language. One idea per line. No abbreviations she was not taught in training.

Checks

- [ ] Cover the text: can a first-week expert still tell what this screen is for and what to do?
- [ ] Set the screen to greyscale: are all states still distinguishable?
- [ ] Is every icon on this screen in the approved set, with its meaning recorded?

### 2. One next action

Every screen has exactly one thing she is meant to do next, and it is the biggest, brightest, lowest thing on the screen.

Why: under time pressure and on the move, choice is cost. The app is her dispatcher; a dispatcher tells you the next step.

Rules

- One primary action per screen, full-width at the bottom (`SnabbitButton` L, 56 dp) above the safe area. Secondary actions are visually quieter and never adjacent to the primary in the same row.
- The primary action states its outcome as a verb: *Accept job*, *Start work*, *Mark done*. Never *OK*, *Submit*, *Continue*.
- Everything on the screen either helps her decide to take the action or is removed.
- Where two outcomes are both legitimate (accept / decline), the safer or more common one is primary; the other is secondary and placed away from it, not mirrored beside it.

Checks

- [ ] Can you name the one action this screen exists for?
- [ ] Is it reachable with the thumb of the hand holding the phone?
- [ ] Is anything on the screen not helping her take that action?

### 3. Big, forgiving, one-handed

Targets are large, spaced, and impossible to hit by accident when the mistake is expensive.

Why: moving, one-handed, wet fingers, cracked screen, small phone. Mis-taps are the normal case, not the edge case.

Rules

- Interactive targets are ≥ 48 × 48 dp; primary actions ≥ 56 dp tall. Adjacent targets have ≥ 8 dp between them.
- Anything irreversible or costly (decline a job, cancel, end shift, report an issue about a customer) needs a second deliberate gesture: a hold, a slide, or a confirmation sheet with the consequence shown. Accepting a job is *not* protected — accepting is the desired outcome and must be one tap.
- Primary actions live in the bottom third of the screen. Nothing she must tap frequently sits in the top corners.
- No swipe-only, long-press-only or drag-only interactions for anything essential. Gestures are shortcuts, never the only path.
- Scrolling is vertical only. Horizontal carousels are for browsing, never for required content.

Checks

- [ ] Every tap target ≥ 48 dp, every primary ≥ 56 dp?
- [ ] Is every costly action protected by a second gesture, and every desired action not?
- [ ] Can the whole task be done with one thumb, phone held in the left hand?

### 4. Sound and voice are part of the interface

Audio is a first-class channel with the same design care as visuals — not a notification afterthought.

Why: her phone is in a pocket or bag most of the shift, her eyes are on the work, and she processes spoken language faster than written.

Rules

- Every time-critical event (new job, job about to start, running late, shift ending, payout credited) has a distinct sound. Sounds are a small, consistent family: the *new job* sound is never used for anything else.
- Spoken guidance is available in the expert's chosen language for every flow an expert does alone for the first time (onboarding, first check-in, first payout) and for every error she must recover from.
- Audio never carries meaning that is *not also* on screen; the screen never carries essential meaning that has no audio path on a first-time flow.
- Sound respects the phone: honours silent mode except for the new-job alert and SOS, which are the two things she has told us she always wants to hear.
- Spoken copy is written as speech — short, warm, one instruction at a time — and reviewed by a native speaker of each language before ship.

Checks

- [ ] Does this flow have a sound or voice for its key moments, and is each sound unique to its meaning?
- [ ] Can a first-time expert complete this flow with the screen described to her aloud?
- [ ] Has the spoken copy been heard, not just read, in all four languages?

### 5. Every state is visible and honest

Loading, offline, empty, error and success each look distinct, say what is happening, and say what to do.

Why: patchy data and low balance are her normal. A spinner with no explanation, or a screen that silently shows stale data, costs her a job or a check-in.

Rules

- Every screen that loads data designs five states: loading, loaded, empty, error, offline. None is optional.
- Offline is a persistent, calm banner — not a modal — and the app keeps working with what it has. Actions that need the network say so *before* she taps, not after.
- Errors name the problem in her words and give one recovery action. Never a code, never "something went wrong", never blame.
- Anything time-based (countdown, job start, shift end) is shown as a shape that changes — a ring, a bar — not only as digits.
- Success is confirmed on screen and by sound. She should never wonder whether the tap worked.
- Duplicate taps are blocked while an action is in flight; the button shows a spinner *and keeps its label* so she knows what is happening.

Checks

- [ ] Are all five states designed and reviewed for this screen?
- [ ] Does every error tell her what happened and what to do, in her language?
- [ ] Toggle airplane mode: does the app say so and keep working?

### 6. Warm, proud, encouraging

The app is glad to see her and proud of her progress. Gamification is core, not decoration — and it lifts her toward the next action rather than distracting from it.

Why: tiers, streaks and contests are how she measures her own work. Recognition is retention, and retention is her income stability and ours.

Rules

- Every win — job done, on-time streak, tier up, payout — gets a moment: a sound, a visual, a warm line. Moments are brief (≤ 1.5 s) and never block the next action.
- Progress is always visible as a shape: how far to the next tier, how many jobs to the bonus, where she stands in the contest. Numbers accompany the shape, never replace it.
- Tier colours (`TierColors`) are used only for tier. They never stand in for status colours (success, warning, error), and status colours never stand in for tier.
- Misses are handled with dignity: state the fact, show the way back, no red shouting, no streak-broken shame screens. She is an adult professional having a hard day, not a player who lost.
- Copy is warm and specific: *3 more jobs to Gold* beats *Keep going!*. No exclamation-mark spam, no emoji as content.
- Nudges are helpful and rare. A nudge appears when it changes what she should do next; it never repeats what she has already seen.

Checks

- [ ] Does the celebration finish on its own and leave the next action visible?
- [ ] Can she see, as a shape, how far she is from the next reward?
- [ ] Read the miss-state copy aloud: would you say this to a colleague?

### 7. Safe by default

Safety controls are always reachable, always recognisable, and work under stress without reading.

Why: she enters strangers' homes alone. SOS and Shield are the promise that makes the job possible.

Rules

- SOS is reachable from every in-job screen in at most two taps, always in the same place, always the same shape and colour. It is never behind a menu, a scroll or a sheet.
- SOS is protected against accidental trigger by a hold or slide — never a plain tap — and confirms activation with sound, vibration and a full-screen state.
- Safety copy and audio are the calmest in the app. Short, steady, present tense: *Help is on the way. Stay on the line.*
- Location, recording and consent states are shown plainly and continuously while active. Nothing about safety is hidden or implied.
- Safety flows are tested on the smallest supported screen, one-handed, with the screen partly obscured.

Checks

- [ ] From this screen, how many taps to SOS? Same place and shape as everywhere else?
- [ ] Can SOS be triggered by accident? Can it be triggered without reading?
- [ ] Is every active safety state (recording, sharing location) visibly on screen?

### 8. Fast on a ₹10k phone

Performance is a design requirement. If it is slow on the cheapest phone in the fleet, it is broken.

Why: a job alert that renders two seconds late is a job lost. Animations that stutter make the app feel untrustworthy at exactly the moment she needs to trust it.

Rules

- Baseline device for review: a 2–3 GB RAM Android on a 360 × 800 dp screen, on a throttled 3G profile. Every screen is checked there, not only on the designer's phone.
- First meaningful content ≤ 1 s on baseline. The new-job alert renders its accept action before anything else on the screen.
- Images are sized for the screen, cached, and never required for understanding. A screen with no images loaded is still fully usable.
- Motion is short (≤ 300 ms for transitions), purposeful, and honours reduced-motion settings. No ambient or decorative animation on in-job screens.
- Payloads are small; the app works on data left over at the end of the month.

Checks

- [ ] Tested on the baseline device and network profile?
- [ ] With images blocked, is the screen still understandable and operable?
- [ ] Does the primary action render first?

### 9. Four scripts, one voice

Hindi, Kannada, Marathi and English are equal citizens. Layout is designed for the longest and tallest of them.

Why: the app switches language per expert. A layout that only works in English is a layout that only works for the minority.

Rules

- Every text container is designed for the longest translation and verified at a large system font size. Text wraps; it is never truncated or clipped. Two-line labels are normal.
- Outfit is the only family; Devanagari and Kannada fall back to the system face. Containers that may hold those scripts use line height × 1.15 — the scale's line heights are minimums for them.
- Numbers, currency and time use the same numerals and formats across languages (₹1,250 · 45 min · 9:30 am). Amounts are never spelled out.
- Copy is written in plain, spoken register and translated by native speakers who have met an expert. No literal translation of English idiom.
- Language choice is one tap from settings and offered with the language's own name in its own script.

Checks

- [ ] Reviewed in all four languages at the largest supported font size?
- [ ] Any clipped, truncated or overflowing text?
- [ ] Are numerals and formats identical across languages?

---

## The reference case: a new job arrives

How the principles combine on the highest-stakes screen. Use this as the model for every other time-critical flow. The full flow is `patterns/new-job-alert.md`; the screen is `components/job-alert.md`.

1. **Sound first.** The unique new-job sound plays, overriding silent mode. It loops gently until she responds or the window closes. (P4)
2. **Full-screen, accept-first.** The screen takes over. The accept button renders first — full-width, 56 dp, brand pink, labelled *Accept job* with a check icon — at the bottom, under the thumb. (P2, P3, P8)
3. **Decide in a glance.** Four facts, large, icon-led, top to bottom: distance (📍 icon + *1.2 km*), duration (clock icon + *2 hr*), task type (task icon + name), earnings (₹ icon + amount in `Heading1`). Nothing else. (P1)
4. **Time as a shape.** The countdown is a Timer directly above the accept button: a pill ring that drains and changes colour as time runs out, with the seconds inside. It is never only digits. (P5; see `components/timer.md`)
5. **Decline is safe and separate.** *Decline* is a ghost button above the accept, quieter, needing a deliberate hold. Declining is costly; it is protected. Accepting is one tap. (P3)
6. **Confirm loudly.** On accept: the accept sound, a brief celebration, the next screen with the route. She never wonders whether it worked. (P5, P6)
7. **Offline is honest.** If the network drops, the alert says so and does not pretend she can accept. (P5)
8. **Works in every language.** Every label fits in Kannada at large font. Amounts use the same numerals everywhere. (P9)

---

## Component acceptance checklist

Every new component, before it is merged, answers yes to all of these. Machine-checkable rows are marked ⚙.

| # | Check | Principle |
| --- | --- | --- |
| 1 | ⚙ All interactive targets ≥ 48 × 48 dp; primary actions ≥ 56 dp | 3 |
| 2 | ⚙ Uses only semantic tokens — no raw hex, dp or sp | Tokens |
| 3 | ⚙ Text uses the type scale; no custom sizes or families | Tokens, 9 |
| 4 | ⚙ Every state expressed by ≥ 2 of colour / icon / shape / motion | 1 |
| 5 | ⚙ Loading, empty, error, offline states implemented (where data loads) | 5 |
| 6 | ⚙ Duplicate taps blocked while in flight; label stays visible | 5 |
| 7 | ⚙ Text wraps; nothing truncated at largest font in all four languages | 9 |
| 8 | ⚙ Honours reduced-motion; transitions ≤ 300 ms | 8 |
| 9 | Meaning survives with text covered | 1 |
| 10 | Meaning survives in greyscale | 1 |
| 11 | Costly actions protected; desired actions one tap | 3 |
| 12 | Key moments have a sound / voice, unique to their meaning | 4 |
| 13 | Error copy names the problem and one recovery, in her words | 5 |
| 14 | Tier colours used only for tier; status colours only for status | 6 |
| 15 | Copy reviewed aloud by a native speaker in each language | 9 |
| 16 | Reviewed on the baseline device and network profile | 8 |

---

## Vocabulary

Use these words everywhere — UI, code, docs, training. Do not introduce synonyms.

| Say | Not | Notes |
| --- | --- | --- |
| Expert | worker, runner, helper, maid | *Runner* survives in package names only |
| Job | booking, order, task, gig | A single customer visit |
| Shift | slot, session | The block of hours she has chosen to work |
| Check in / Check out | login, punch, attendance | Arriving at / leaving a customer's home |
| Earnings | income, wallet balance | What she has earned |
| Payout | settlement, transfer | Money reaching her bank |
| Tier | level, rank, badge | Bronze / Silver / Gold etc. |
| Streak | run, chain | Consecutive on-time or attended days |
| SOS | emergency, panic | The safety trigger |
| Shield | safety mode, Kavach | The in-job safety feature set |
| Hub | centre, office | The physical training / support location |
| Cover · You are covered | policy, plan, scheme | The free health insurance. *Insurance* itself is fine — बीमा (Hindi/Marathi) and ವಿಮೆ (Kannada) are everyday words |
| The person who gets the money | nominee, beneficiary | *Nominee* has no everyday equivalent in any of her languages; it stays in code and the insurer's forms, never on a screen |
| Hospital bills | hospitalisation, in-patient | |
| You pay nothing at the hospital | cashless treatment, network hospital | Says the outcome, not the mechanism |
| Your family on the cover | dependents, family floater | |

---

## How to use this document

- **Designing:** start every brief by naming the one next action and the two channels (visual + audio) that carry each state.
- **Building:** run the acceptance checklist before opening a PR; paste the ticked list in the PR description.
- **Reviewing (human or AI):** cite the principle number when requesting a change — *fails P3: decline is adjacent to accept*.
- **Changing this document:** a principle changes only with evidence from experts — field observation, support tickets, or hub feedback — recorded in the change.
