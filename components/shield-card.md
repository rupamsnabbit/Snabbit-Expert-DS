# ShieldCard (Kavach)

Status: **Proposed** · Tier: Composition · Package: `SnabbitShield` (ShieldRow, ShieldConsent, SafetyCheck; uses Card, Button, Switch, SafetyStrip, BottomSheet, VoicePrompt) · Figma: Kavach Card (`1490:11346`, 3 states) in the DS file; shipped flow in *Shift – Job Lifecycle DS* → *✅ Snabbit Kavach – Final Screens* (`1059:53709`): consent (`1059:54818`), activation during the job (`1059:53710`), edge cases (`1059:55269`), post-SOS (`1059:55741`).

Shield is the in-job safety feature: while she is inside a customer's home the phone records audio and shares her location with the safety team, and if something looks wrong the team checks on her. Together with SOS it is the promise that makes the job possible (P7). This spec does not add a new core component; it composes the ones that exist into **one row on the job card** that says, plainly and continuously, whether Shield is on — and three sheets around it: consent (once), the first-start explainer, and the safety check.

---

## What changes from Figma

The shipped Kavach screens are the latest state of the feature, but their chrome is the older header (hamburger, *Help* / *SOS* text pills, *Hi, Reshma!*) and a **blue** control palette. The row moves into the current in-job Card and the system's tokens.

| Shipped today | Proposed | Why |
| --- | --- | --- |
| Footer row on the job card: shield mark + *Snabbit Kavach* + a small blue **▶ Activate** button; active state = a blue dot and a waveform | **ShieldRow**: shield mark + *Shield* + a live status line (*Recording · Location shared*) with a `record` dot and a small level meter; Button `secondary brand M` **Start Shield** when it is off | The state is said in words *and* shown live (P7, P5); the Button is a system Button with a 48 dp target instead of a 28 dp pill. |
| Opt-in **per job** by tapping Activate | After consent, Shield **starts by itself at check-in** and the row reports it; a per-account Switch (*Shield on for every job*) in Profile turns it off with a confirmation sheet (`selection-controls.md`, costly switch-off). Manual *Start Shield* remains for accounts that switched it off | Under stress she will not remember to tap a small button; a promise that depends on a tap is not a promise. **Product decision — confirm before shipping.** |
| Consent sheet: *INTRODUCING Snabbit Kavach*, three benefit rows with metallic 3D icons, T&C line, blue *Yes, I agree* | **ShieldConsent**: same structure; shield pictogram; benefit rows with Phosphor `shield-check` · `map-pin` · `siren` at 24; T&C line with an inline Listen; Button `primary brand L` **Yes, turn on Shield**; a tertiary **Not now** | Metallic is the reward layer (`assets.md`); *I agree* is not a verb she can picture; a consent needs a visible way to say no. |
| *Always keep your phone with you* explainer sheet, *Got it* | Kept as a BottomSheet `info`, shown once at the first start, spoken | Right sheet, right moment; it just needs the voice. |
| Edge cases: greyed *Start Monitoring* + a red *No storage available* line; a full sheet *SNABBIT KAVACH IS OFF · Battery is running low · I will do* | `blocked` state **in the row**: reason line + the one fix as a Button (*Free up space* → settings · *Charge your phone*); no modal during a job. When Shield **stops** mid-job, a Snackbar + spoken line, and the SafetyStrip turns amber | A sheet over a running job costs her attention for something she cannot fix from the sheet (P3, P8). The row is where the state lives. |
| Post-SOS: *Are you in danger?* sheet (siren, **I am in danger** / **I am safe**) and *Help is on the way. Move to a safe place.* screen | **SafetyCheck** sheet kept (it is the Shield feature at work), both answers a plain tap, no emoji in the labels; the *Help is on the way* screen is SOSControl's active screen, not a second one | One active screen for SOS (`sos-control.md`); the check is Shield's, the rescue is SOS's. |
| Blue everywhere: buttons, dot, links | **Kavach blue stays on the shield mark only** (`asset/picto/shield`, the one domain-coloured pictogram, allowed by `DESIGN_TOKENS.md` § feature colours); every control uses system tokens | Tokens only; blue Buttons compete with the brand primary and with `textInfo`. **Confirm** that the blue shield stays. |

Lock-screen notifications (*Help is on the way*, *Are you in danger?* with two actions) exist in the shipped set; they belong to the notifications pattern, not this spec.

---

## ShieldRow

The last row of the in-job Card, under the address and the customer row, above the card's edge. Always present between check-in and check-out; never on Home, Earnings or Profile.

```
┌──────────────────────────────────────────────┐
│ (🛡)  Shield                                 │  mark 32 dp asset/picto/shield · title BodyLg Medium textPrimary
│       ● Recording · Location shared  ▁▃▅▂▁  │  status Caption Medium · record dot 8 dp textError pulsing 1 s · level meter 5 bars 16 dp
└──────────────────────────────────────────────┘
```

| State | Title line | Status line | Trailing | Voice (once, on entering the state) |
| --- | --- | --- | --- | --- |
| `on` | Shield | `record` dot + *Recording · Location shared* + level meter | — (row opens the Shield sheet) | *"Shield is on."* |
| `off` | Shield | *Off for this job* `textSecondary` | Button `secondary brand M` **Start Shield** | — |
| `starting` | Shield | *Starting…* + Spinner 16 | — | — (≤ 3 s, then `on` or `blocked`) |
| `blocked` | Shield | `warning-circle` 16 `textWarning` + reason: *Not enough storage* · *Battery too low* · *Microphone not allowed* | Button `tertiary M` with the one fix: **Free up space** · **Charge your phone** · **Allow microphone** | *"Shield can't start — not enough storage."* |
| `stopped` (was on, then failed) | Shield | `warning-circle` + *Stopped · battery too low* | Button `secondary brand M` **Start again** | *"Shield has stopped. Charge your phone."* + Snackbar |
| `ended` (check-out) | Shield | *Recording saved · 58 min* `textSecondary` | — | — |

- The level meter is five 3 dp bars at 16 dp height, `textError` @ 60 %, driven by the microphone; it is the proof that recording is real (P7). It never animates when nothing is recorded; reduced motion shows the bars static at a fixed height with the words carrying the state.
- The **`record` dot pulses 1 s** while `on`; it is the same dot as the SafetyStrip's.
- Tapping the row (any state except `starting`) opens the **Shield sheet**: a BottomSheet `info` with the pictogram, the current state in `Heading3`, what is being recorded and shared, *Since 10:04 · 58 min*, and — only if the account allows manual control — **Stop Shield** as a `tertiary neutral` Button with the costly-switch-off confirmation (*Stop Shield for this job? The safety team won't be able to hear you.* · **Keep it on** primary · **Stop** tertiary danger).
- When she leaves the job screen while `on`, the **SafetyStrip** (`sos-control.md`) shows *● Recording · Location shared · Open ›* in its Shield kind (`bgInfo` / `textInfo`), amber when `stopped`.
- `blocked` reasons are checked **before check-in** so the fix can happen at the door, not mid-job: the check-in flow shows the same row in its `blocked` state above the Check in Button, and check-in is still allowed — Shield never blocks work.

---

## ShieldConsent (once)

A BottomSheet `info` height `full`, shown once per account before the first check-in (in the go-live flow), and again only if the terms change.

```
┌──────────────────────────────────────────┐
│           [ asset/picto/shield 96 ]      │  bgInfo stage
│              Snabbit Shield              │  Heading2 textPrimary
│                                          │
│ 🛡 Stays with you                        │  three rows: Phosphor 24 textInfo · BodyLg Medium · BodyMd textSecondary
│    Records sound while you work          │
│ 📍 Shares where you are                  │
│    With the safety team, only during a job│
│ 🚨 Checks on you                         │
│    If something seems wrong, we call     │
│                                          │
│ By turning on Shield you agree to the    │  Caption textSecondary · terms as a link · inline Listen
│ Shield terms.                     (🔊)   │
│ [ Yes, turn on Shield                 ]  │  Button primary brand L
│ [ Not now                             ]  │  Button tertiary neutral L
└──────────────────────────────────────────┘
```

The whole sheet is spoken on open (VoicePrompt, autoplay rule). *Not now* leaves Shield `off` and shows the row's **Start Shield** on every job; the sheet returns on the third job. There is no *✕*: the choice is the way out.

---

## SafetyCheck

Shown by the safety team or by an automatic trigger (loud noise, a stop in movement, a long silence) while Shield is `on`. A BottomSheet `alert` over whatever she is on, plus a full-volume sound and haptic, plus a lock-screen notification with the same two actions.

```
┌──────────────────────────────────────────┐
│ [ Shield ]                          [✕]  │  Tag info · no ✕ — closes only by an answer
│           [ asset/picto/siren 96 ]       │  bgErrorSubtle stage
│         Are you in danger?               │  Heading1 textPrimary · spoken, repeated every 10 s
│ [ I am in danger                      ]  │  Button primary danger L · plain tap → SOS active screen
│ [ I am safe                           ]  │  Button secondary neutral L · plain tap; no hold — a false alarm must be easy to end
│ No answer in 30 s → the team calls       │  Caption textSecondary
└──────────────────────────────────────────┘
```

*I am in danger* opens SOSControl's active screen directly (no hold — the check already asked). *I am safe* closes the sheet, tells the team, and a Toast *Glad you're safe* follows. No answer in 30 s is treated as danger. The shipped 😰 / 😊 emoji in the button labels are dropped: buttons carry words and colour, faces belong to Rating (`icons.md`, no emoji as icons).

---

## Content

- The feature is **Shield** in the UI, *Kavach* in Hindi/Marathi (कवच), and the row's title is the same word everywhere. *Snabbit Kavach* as a wordmark appears only on the consent sheet.
- Status lines are present tense, two facts, a dot: *Recording · Location shared*. Never *Monitoring active*, *Smart monitoring*.
- Reasons say the thing and the fix: *Not enough storage* → **Free up space**. Never *No storage available. Clear space to continue.*
- Buttons: *Start Shield*, *Start again*, *Stop Shield*, *Keep it on*, *Yes, turn on Shield*, *Not now*, *I am in danger*, *I am safe*. Never *Activate*, *Start Monitoring*, *I will do*, *Yes, I agree*.
- Voice lines are recorded by the same calm speaker as SOS; the SafetyCheck question is spoken at full volume regardless of the phone's volume setting where the OS allows.

---

## Accessibility

Row announces *"Shield, on, recording and location shared, button"*; state changes are announced once as live regions. The level meter is decorative. SafetyCheck is a modal alert that takes focus; both Buttons are `L`. Contrast: status `Caption` `textSecondary` on `bgPrimary` 4.6:1; `textError` dot is paired with words. All targets ≥ 48 dp.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `bgInfo` / `textInfo` (existing) | — | SafetyStrip `shield` kind and the consent stage; no new colour |
| `asset/picto/shield` | Kavach blue shield, 32 / 96 dp | Register in `assets.md` as the one domain-coloured pictogram (feature colour per `DESIGN_TOKENS.md`); confirm |
| `sound.safetyCheck` | — | Full-volume, distinct from `sound.sos`; into the sound register |
| `timeout.safetyCheck` | 30 000 ms | No answer → treated as danger |

---

## Figma reconciliation

1. Kavach Card (3 states) → **ShieldRow** inside the Job Card: `State` (On / Off / Starting / Blocked / Stopped / Ended); Activate → Button `secondary brand M`; waveform → level meter + words.
2. Consent → **ShieldConsent**: BottomSheet `info` full; metallic row icons → Phosphor 24; *Yes, I agree* → *Yes, turn on Shield* + *Not now*.
3. *Are you in danger?* → **SafetyCheck**: BottomSheet `alert`; emoji removed from Buttons; *Help is on the way* frames → instances of SOSControl / Active screen.
4. Battery-low sheet and storage line → ShieldRow `blocked` / `stopped` states; delete the sheet.
5. Add the `shield` kind to SafetyStrip; rebuild the six activation frames on the current in-job header.
6. Register `asset/picto/shield`; retire the blue Button style in these frames.

Result: **~12 variants** across three components, on the current header, and Shield's state readable in one glance on every in-job screen.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ row 56; Buttons M / L |
| 2 | ⚙ Semantic tokens only | ✅ + shield pictogram (domain colour, to confirm) |
| 3 | ⚙ Type scale | ✅ BodyLg / Caption / Heading |
| 4 | ⚙ States by ≥ 2 channels | ✅ dot + meter + words + voice |
| 5 | ⚙ One next action | ✅ one Button per state |
| 6 | ⚙ Tap guard / loading | ✅ starting ≤ 3 s; stop is a costly switch-off |
| 7 | ⚙ Four languages | ⬜ *Recording · Location shared* in Kannada — verify length |
| 8 | ⚙ Reduced motion | ✅ static meter, no pulse |
| 9 | Meaning without text | ✅ shield mark + red dot + meter |
| 11 | Costly actions | ✅ Stop confirms; I am safe is plain (deliberate) |
| 12 | Voice | ✅ every state change spoken once |
| 14 | Status colours | ✅ error dot only while live; warning for blocked |
| 15–16 | Review | ⬜ pending — auto-start decision, blue shield decision |
