# Pattern — onboarding and go-live

From the first open to the first shift. Evidence: *Self-Serve ER/AR* (`HqmnjmxhZvyvZxmIaVMCrB`, page *Final*) — the latest onboarding file, which supersedes the master file's FINAL ONBOARDING. Its five sections are two variants of one flow plus what follows: **TC-less** (house help `599:37239`, house cook `599:42040`) where training happens in the app; **TC** (house help `619:55994`) where she is booked into a training centre; **Bank/UPI** (`619:51990`) for getting paid; and **Post onboarding** (`599:29415`) — Home before the first shift, profile, earnings, notifications.

The shipped flow is good: it is short (five steps, "2 minutes"), speaks, shows a real expert on every screen, and asks for one thing per screen. This pattern names its stages, composes each from system parts, and lists the departures. It is also where the system learns two new things: a **presenter video** at the top of form screens, and a **training-centre card** that is a Card composition rather than a new component.

---

## The flow

```
 first open
     │
     ▼
 0. Welcome ── splash · promise cards (₹30,000 · sick leave · insurance) · [Start]
     │
     ▼
 1. Language ── five SelectionCards in their own scripts · [Next]  — voice from here on
     │
     ▼
 2. Phone ── NumericKeypad · OTP (auto-read) · location permission (why, then the OS dialog)
     │
     ▼
 3. About you ── "5 steps · 2 minutes" intro · city (auto, changeable) · name · gender · referral (optional)
     │
     ▼
 4. Work ── what work (SelectionCard rich: House help · Cook · Beauty) · "tap the image" confirmations (uniform, phone, …)
     │
     ▼
 5. Identity ── "Keep your Aadhaar ready" · DigiLocker / Aadhaar OTP (in-app, "Don't leave the app") · verified summary
     │
     ├── TC-less ──► 6a. Training in the app ── HowToClip course · quiz · certificate → "Onboarding complete" → Home (pre-shift)
     │
     └── TC ──────► 6b. Training centre ── pick centre · pick day · confirmed card (map, trainer, documents, countdown) → Home (pre-shift)
                          │
                          ▼
 7. Get paid ── Bank or UPI (presenter video · form · verify · confirm name) · PAN (or skip with the 20 % warning)
     │
     ▼
 8. First shift ── Home pre-shift card: date · time · earnings range · Present / Absent → the shift lifecycle
```

---

## What changes from the shipped screens

| Shipped | Proposed | Why |
| --- | --- | --- |
| Header: back · title · **Call** pill · **language** switcher (translate + caret) | HeaderNav `page` with a two-item cluster: **Help** `HeaderAction` (headset, calls the onboarding line) and **Language** `IconButton` `translate` | Same two actions, system parts; Call = Help everywhere (`DECISIONS.md`) |
| Thin segmented progress strip under the header (4–5 segments), Button label *Continue (1/5)* | ProgressBar `segmented` `S` under the header, `neutral`/`brand`; Button label **Next** — no count (the strip already says it), and not *Continue* (`button.md` bans it); spoken *"Step 2 of 5"* on each screen | One channel for progress; a Button label is a verb (`button.md`) |
| Language: five cards with the language name in its own script + English, radio at right | SelectionCard `compact`, one column of five, own script first — kept; **Telugu** joins the four (the shipped set is five) | Already right; the system's "four scripts" becomes **five** — see follow-ups |
| Phone: hero photo, title with a speaker icon, `+91` field, OS keyboard | Same layout with the VoicePrompt inline Listen, TextField `phone`, **NumericKeypad** in-app | `numeric-keypad.md`: every number through one keypad |
| OTP: six boxes, OS keyboard, *Resend* link | NumericKeypad `otp` (6), auto-read from SMS, **Resend code** as a Button `tertiary` with a Timer `deadline` (*in 0:28*) | Matches `text-field.md` OTP rules |
| Location permission: full-screen *Allow Snabbit to access this device's location?* with a map pin and the OS dialog | BottomSheet `permission` (why, one sentence, scene asset) → OS dialog; **Not now** allowed, city then asked manually | `bottom-sheet.md` permission kind; P5 honesty |
| *Start training in 4 simple steps · It takes 2 minutes* with the stairs illustration | Kept as a full-screen intro (scene asset, Heading1, Button **Start**); the count is whatever the variant has (5 steps TC-less) | It sets expectation — P6 |
| *A little bit about you*: Work location with **Change**, Full name, Gender as two photo cards, *Have a referral code?* with a code field | Same fields: city as a ListItem with a `tertiary` **Change** → `select` sheet with city cards and an *Unavailable city* EmptyState; name TextField; gender as two SelectionCard `rich` with the character asset; referral as a collapsed row that opens a TextField | Component parts for every field; the *Unavailable city* screen becomes the EmptyState `empty` kind with **Notify me** |
| *What work are you interested in?* three photo cards with a **NEW** pill on Beauty | SelectionCard **`hero`** × 3 `single` — the photo is the top of the card, Tag `brand` **New** over Beauty | The picture is the option; `hero` gives it the whole width (P1) |
| *Tap on the image to proceed* — a large illustration, a checkbox *I have my own smartphone* | SelectionCard **`hero`** `multi`, one per screen — tapping the image toggles the Checkbox; title says what she is confirming (*I have my own smartphone*); the instruction line goes | The image is a checkbox target already; one component makes the state visible (row 4) |
| *Keep Aadhaar number ready* → DigiLocker in a WebView with **Taking you there** and a *Do not exit app now* Banner | Kept: Banner `warning` *Stay in the app — we'll bring you back*; the WebView keeps the HeaderNav so Help stays reachable; on return, a Skeleton while verifying (3-second rule) then the summary Card (name · gender · DOB · father's name · masked Aadhaar · address) with ListItem rows and Stat `S` | P5, P7: never lose the header during a third-party step |
| *Your Aadhaar is verified!* check + summary, Button **Starting your training** | Kept; Button **Start training** | Verb, sentence case |
| *Congratulations! You have successfully done your onboarding!* with a celebratory scene, Button **Let's train now** (dark) | Screen kept with the scene asset and `motion.celebrate`; Button `primary brand L` **Start training** | One primary style (`button.md`) |
| Bank details form with a **presenter video** (16:9, play button) above the fields | **HowToClip `guide`** — an inline 16:9 clip at the top of a form screen: a trainer explains the screen; plays on tap, captions on, ≤ 20 s; collapses to a 56 dp bar on scroll | The shipped voice bar has become video; it is HowToClip's third form — see follow-ups |
| Bank: account number, confirm account number, IFSC — OS keyboard; *Fetching account details* spinner screen; *Confirm this is you* with the bank's name; *Bank details added* | NumericKeypad for the account number (two entries kept — a wrong digit is money lost); IFSC TextField with a **Find IFSC** helper; Skeleton then the confirm Card (*Is this you? Sushila Devi · HDFC*) with **Yes, that's me** / **No, try again**; success sheet | Keypad rule; the confirm step is the safety (P3) |
| UPI: ID field · *The account belongs to* · a consent screen for UPI collection · *Thank you* | TextField with the `@bank` suggestions as Chips; confirm name Card; consent as a BottomSheet `confirm` with the consequence stated (*Snabbit can send money to this UPI. It can never take money.*) | The consent is a costly-feeling step; naming what it is not is the honesty (P5) |
| PAN entry, *Your PAN is verified*, a **Skip** with a red *20 % tax…* warning sheet | PAN by MediaCapture `document` (number read, confirmed) or typed; skip sheet kept as `confirm` with the Nudge `loss` line *Without PAN, 20 % tax instead of 10 %* — safe option **Add PAN** above, **Skip for now** below | Same as `payout.md` |
| Home pre-shift: *Welcome to Snabbit!* card with date, *7:00 AM – 12:00 PM*, *You can earn ₹800 – ₹1000*, **Absent** (red) and **Present** (green) side by side | Card with the shift as Stats and Amount; **Present** as `primary brand M` alone; **Can't come** as a `ghost` Button *above* it, opening the leave `confirm` sheet | Two coloured Buttons in a row is the mis-tap the principles forbid (P3); green/red are status colours (row 14) |
| Task cards *Add bank account to get money quickly* / *Protect yourself…* with 3D art; a bottom strip *Bank details & PAN missing · Add* | The **Get paid** Stepper (`payout.md`) on Home until done; other tasks as a Stepper `unordered` *Before your first shift*; the strip is a Nudge `loss`-free reminder → a Banner `info` with **Add** | Tasks are a Stepper; one list, not three surfaces |
| *Need help? Call our team* with three avatars | ListItem rows with Avatar + name + role and a `phone` IconButton | Component parts |
| TC: *Please select these two* photo pairs; centre list; day list; confirmed card (map, *TIME LEFT 1 day*, trainer, documents to carry, centre address with Call/Share, nearest metro/bus) | SelectionCard `rich` for centres (distance as a fact); SelectionCard `date` strip for the day; the **training-centre card** = MapSnippet 160 (`hub` marker) + Timer `L` `deadline` (*Fri 7 Feb · 10:00 am*, not a countdown in days) + ListItem rows (documents with the ID pictograms, trainer with Avatar and Call, centre address with Listen and Show directions, nearest metro/bus) + Buttons **I'm on my way** / **Call trainer** | Composition from parts; a date she plans around is a `deadline`, not a draining ring (`timer.md`) |
| TC states: confirmed · today (*Reach by 9:45 am*) · missed (*Rebook*) · change date / change centre | Same states through Tag + Timer tone + Banner; **Rebook** and **Change** as `secondary` Buttons; missing twice → Help | Kept |

Kept as shipped: the order of steps; one question per screen; the real expert in uniform on every hero; the five-language choice first; the *2 minutes* promise; Aadhaar via DigiLocker; the celebratory completion screen; bank **and** UPI paths; the pre-shift Home.

---

## Stages in detail

### 0–1. Welcome and language

Splash (wordmark, expert photo) → promise screen: three ListItem rows with reward assets (*₹30,000 per month* · *Sick leaves* · *Insurance up to 5 lakh*), the expert pointing at them, Button **Start**. Then language: five SelectionCard `compact` (*English · हिन्दी · मराठी · తెలుగు · ಕನ್ನಡ*, own script first, English name under), Button **Next** enabling on choice. From here every screen is spoken in her language on arrival (`voice-prompt.md`, `timeout.screenSettle`).

### 2. Phone, OTP, location

Hero photo (*Work in flexible shifts*, PageIndicator under a 3-card carousel of promises) over a bottom sheet-like panel: *Enter your mobile number* with Listen, TextField `phone` `+91`, NumericKeypad, **Next**. OTP: NumericKeypad `otp` 6, auto-read, **Resend code** with a `deadline` Timer. Location: BottomSheet `permission` (*We use your location to find jobs near you*) → OS dialog; **Not now** → city asked in step 3.

### 3. About you

Intro screen *Finish onboarding in 5 steps · about 2 minutes* with the stairs scene and **Start**. Then: city ListItem (auto from location, **Change** → `select` sheet with city SelectionCards; unavailable → EmptyState *We're not in Mysuru yet* with **Notify me**), name TextField (spoken *"Type your name as on your Aadhaar"*), gender SelectionCard `rich` × 2, *Have a referral code?* row → TextField. ProgressBar `segmented` 1 of 5. **Next**.

### 4. Work

*What work are you interested in?* SelectionCard `hero` × 3 `single` (House help · Cook · Beauty **New**). Then the confirmations: each a SelectionCard `hero` `multi` — *I have my own smartphone*, *I can wear the uniform*, *I can work 8 hours*; the image is the target; **Next** enables when all are checked. Cook variant adds *What can you cook?* as Chips `filter` multi-select.

### 5. Identity

*Keep your Aadhaar number ready* (card illustration with the number highlighted; *You'll need your Aadhaar number and the phone linked to it*), Banner `warning` *Stay in the app — we'll bring you back*, **Open Aadhaar** → DigiLocker WebView with the HeaderNav kept → Skeleton (*Checking…*, 3-second rule, then **Try again** / **Call help**) → *Your Aadhaar is verified* summary Card → **Start training**. Failure: EmptyState `error` *Aadhaar didn't match* with *Try again* and *Call help*; never a code.

### 6a. Training in the app (TC-less)

*Welcome to Snabbit training · Let's become a 5★ expert together* (Avatar of the trainer, `motion.celebrate`). The course is a Stepper `list` of modules, each a HowToClip `player` sequence (10–20 s clips) with a two-question quiz (SelectionCard `compact`, spoken); a module is `done` at 100 %. Finished → *Onboarding complete* scene (**Start training** was the entry; **Go to Home** exits) → Home pre-shift.

### 6b. Training centre (TC)

Pick centre: SelectionCard `hero` (centre photo) or `rich` list with distance and next slot as facts — `hero` when there are ≤ 3 centres. Pick day: SelectionCard `date` strip (≤ 7). Confirmed: the training-centre card (above) with Timer `deadline`; states *Confirmed* · *Today · reach by 9:45 am* (Timer `countdown` appears only on the day) · *Missed* (Banner `error` + **Rebook**). **Change date** / **Change centre** as `secondary` Buttons below the card; **Call trainer** always present.

### 7. Get paid

The Bank/UPI section, as `payout.md` § 3 — reached from the *Get paid* Stepper on Home. New here: the HowToClip `guide` at the top of the form screens, which is how the trainer explains *IFSC* without a paragraph.

### 8. First shift

Home pre-shift: HeaderNav `home` (bell · SOS · Saathi · coins); Card *Your first shift* — *Tue 7 Feb* · *7:00 am – 12:00 pm* as Stats, *You can earn ₹800 – ₹1,000* as Amount range; **Present** `primary brand M`; **Can't come** `ghost` above it → leave `confirm` sheet. Below: the *Before your first shift* Stepper (bank · PAN · uniform pickup · watch the check-in clip), then *Need help?* rows. Marking Present hands over to the shift lifecycle and `pattern: check-in-out`.

---

## Edges

| Edge | Behaviour |
| --- | --- |
| Drops out mid-flow | Progress is saved per step; reopening lands on the current Stepper step with the intro skipped; a notification after 24 h (*Finish in 2 minutes*) |
| No OTP arrives | Resend after the deadline; after two, **Call me instead** (voice OTP) — never a dead end |
| City unavailable | EmptyState + **Notify me**; the flow ends warmly, no error tone |
| Aadhaar fails / mismatch | EmptyState `error` with the reason in her words and **Try again** / **Call help**; the header's Help is live throughout |
| DigiLocker down | Skeleton hits 3 s → *Aadhaar service is slow right now* with **Try again** and **Later** (the step becomes `attention` in the Stepper, onboarding continues) |
| Referral code invalid | TextField `error` *Code not found — check with your friend*; optional, never blocking |
| Training centre missed twice | Card state *Missed* with **Call trainer** as primary; rebooking moves to Help |
| Offline | Steps that need the network queue where they can (name, gender, work); OTP, Aadhaar and bank verification wait with an honest Banner |
| Screen reader | Each step's title is the page label; the presenter video is described; SelectionCards announce state |

---

## Follow-ups for the system

- **Five scripts, one voice.** The shipped language list has **Telugu**. `PRINCIPLES.md` P9, `type.md` and `typography.indic` say four; Telugu (a round, wide script like Kannada) joins with an expansion factor ≈ ×1.3 and the platform fallback (Noto Sans Telugu / Telugu Sangam MN). **Decision to confirm** — if Telugu is launching, the foundation updates in one commit.
- **HowToClip `guide`** — a third form: inline 16:9 at the top of a screen, plays on tap, captions on, collapses on scroll to a 56 dp bar with the play glyph; used on form screens where a trainer's explanation beats helper text. Add to `how-to-clip.md`.
- **SelectionCard `hero`** — added to `selection-card.md` (image on top, single or multi) for the work cards and the confirmations.
- **Training-centre card** is a composition (MapSnippet + Timer `deadline` + ListItems + Buttons); no new component. Record in `card.md` compositions list.
- **Header cluster in `page` variant**: Help + Language during onboarding only.
- `icons.md`: `translate` already registered; `graduation-cap` (hub marker) already registered.

---

## Checklist for the flow

- [ ] Every step is one question, spoken on arrival in the chosen language, with a Listen.
- [ ] No Button label carries a count; the ProgressBar and the voice carry progress.
- [ ] Every number (phone, OTP, account, PAN) is typed on the NumericKeypad.
- [ ] Help is reachable from every screen including the DigiLocker step.
- [ ] Present / Can't come are never side by side; no red/green Button pair anywhere.
- [ ] Kannada (and Telugu, if confirmed) at 1.3: language cards, *Start training*, *I have my own smartphone*.
- [ ] Field review with new experts on their own phones (checklist rows 15–16) — pending.
