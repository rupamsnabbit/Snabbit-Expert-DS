# SOSControl

Status: **Proposed** · Tier: Core · Package: `SnabbitSOSControl` (new; the current SOS pill has no protected gesture) · Figma: SOS item inside "Home navigation bar nav" (`1491:15247`); Shield frames Kavach Card (`1490:11346`), Over the app (`1564:12441`), PIP (`1548:12258`) inform the active state

The promise that makes the job possible (P7). One control, one shape, one place, that calls for help when she cannot read, cannot look, and may not be able to speak. It has to be impossible to miss, impossible to trigger by accident, and impossible to lose once triggered.

This spec covers the **control** (resting, holding, triggered), the **active screen** it opens, the **safety strip** that stays on screen while anything is active, and the **offline** path. Shield (Kavach) — audio recording and location sharing during a job — reuses the strip and gets its own composition spec later.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| SOS is a small red pill labelled *SOS* inside the header cluster, plain tap, no defined outcome | The `HeaderAction` shape (disc + *SOS* label pill) is kept as the resting form; the gesture becomes **hold 1.5 s** with a visible fill; the outcome is a defined **active screen** | Same shape she already knows; the protection and the outcome were missing (P7). |
| Position varies between frames (left of the cluster, middle, right) | **Rightmost in the header**, on Home and every in-job screen, always | P7: same place everywhere; she must find it by muscle memory. |
| No active state anywhere | Full-screen **active screen** with a 5-second cancel window, then live status of call, location and recording | Confirmation by sound, vibration and a full-screen state is a P7 rule. |
| Kavach card shows an "Activate" button and a waveform | The waveform idea becomes the **safety strip** — a persistent 32 dp strip that says what is active | P7: recording and location are shown plainly and continuously. |

---

## Anatomy — the control

```
        ┌ 44 × 52 dp, 48 dp hit area
   ( 🚨 )   ← disc 30 dp, bgError fill, iconError siren (fill), 1.5 dp borderError ring
   ▐ SOS ▌  ← label pill 16 dp, bgErrorStrong (proposed) / textInverse, Caption SemiBold
```

Identical on Home, in-job and state headers, always the last element on the right; on job screens the **Help** `HeaderAction` (headset, a call) sits immediately to its left, as shipped. `siren` is registered for this single meaning; no other component may use it. The only red solid fill in the app outside the `danger` Button belongs to this label pill.

---

## Gesture — hold, never tap

| Time held | What she sees | What she feels / hears |
| --- | --- | --- |
| 0 ms | Disc darkens to pressed; a **hold indicator** appears in the **centre of the screen**: 120 dp disc, `bgErrorStrong`, siren, ring track around it, text *Keep holding* (`Heading3`, `textInverse` on a 60 % scrim) | `light` haptic |
| 0 → 1500 ms | The ring fills clockwise; the number *3 · 2 · 1* is not shown — the fill is the countdown | `light` haptic tick at 500 and 1000 ms |
| **1500 ms** | Ring completes → **triggered**. Active screen opens | `heavy` haptic; the *sos* sound (registered; unique) once |
| released early | Indicator fades `motion.fast` (100 ms); Toast, spoken: *Hold SOS for 2 seconds to call for help* | none |

The indicator sits in the centre because her thumb covers the control itself; she must be able to see progress without looking under her hand. The hold works with the screen partly obscured and one-handed (P7 test condition). No slide, no double-tap, no shake: one gesture, taught once by the first-run Coachmark.

**Platform fallback**: pressing the power button five times (Android emergency) and the volume-down + power hold on supported devices trigger the same active screen; both are told in the Coachmark and in Profile → Safety.

---

## Active screen

Full-screen takeover; the tab bar and header are hidden; Android back does nothing; the screen stays on and at full brightness; the phone unmutes for the call.

```
┌────────────────────────────────────────────┐
│ ████ bgErrorStrong band 96 dp ████████████  │  siren fill 32 · "SOS" Display 32 SemiBold textInverse
├────────────────────────────────────────────┤
│  Calling for help in  5                     │  ← first 5 s: Amount-sized countdown, Heading1
│  [ Cancel — pressed by mistake        ]    │     one Button, secondary neutral L, plain tap (the hold already protected it)
│                                            │
│  ─ after 5 s ─                             │
│  Help is on the way. Stay on the line.     │  Heading2 textPrimary · spoken · the calmest copy in the app
│  📞 Snabbit safety team · connecting…      │  status rows: icon 24 · BodyLg · live state word
│  📍 Location shared · Koramangala          │
│  🎙 Recording                               │
│  [ Call police 112                     ]   │  Button secondary danger L · plain tap
│  [ I'm safe now — hold to end          ]   │  Button tertiary neutral L · hold 1.5 s with the same ring
└────────────────────────────────────────────┘
```

- **Cancel window (0–5 s)**: a plain-tap *Cancel — pressed by mistake* is allowed because the 1.5 s hold already protected the trigger. Cancelling within the window sends nothing and returns to the previous screen with a Toast *SOS cancelled*. The countdown is spoken: *Calling for help in five, four…*
- **After 5 s**: the safety team call connects (in-app voice, falling back to the dialler), location sharing and audio recording start. Each status row shows a live word — *connecting… · connected · shared · recording* — and a pulsing `record` dot for anything live. Nothing here is implied (P7).
- **Ending**: *I'm safe now* is a **hold** (same 1.5 s ring), because an accidental end is worse than an accidental start. Ending asks nothing else; the team is told; a Snackbar *SOS ended · Recording saved* follows on the previous screen.
- The screen never times out and never auto-ends. If the app is backgrounded, a persistent notification with *Return to SOS* is posted and the safety strip is shown when the app returns.

Sound and voice on this screen are the calmest in the app: steady tone, present tense, no exclamation marks, one sentence at a time.

---

## Safety strip

A 32 dp strip directly under the HeaderNav (above content, above Banners), shown whenever **anything safety-related is live** — SOS active in the background, Shield recording, location shared for a job.

```
│ ● Recording · Location shared              Open › │  bgError · textError · record dot pulsing 1 s · Caption Medium
```

It never hides, never scrolls away, and cannot be dismissed; it ends when the state ends. Tapping opens the relevant screen (SOS active screen or Shield). With SOS active the strip uses `bgErrorStrong` / `textInverse` and reads *SOS active · Safety team on call*. The strip is the reason the header keeps 32 dp free below it on every in-job screen.

---

## Offline and low signal

SOS must work with no data (persona: patchy data).

| Condition | Behaviour |
| --- | --- |
| No data, has voice | Active screen opens; the call goes through the **dialler** to the safety line; location is sent by **SMS** when it can be; rows say *Calling by phone · Location by SMS* |
| No signal at all | Active screen still opens; rows say *No network — trying…*; the app retries every 10 s; the *Call police 112* Button still attempts the emergency call, which carriers route without signal where possible |
| Sound off / silent | Haptics still fire; the hold indicator and active screen carry the meaning without sound |

The control is never disabled, greyed or hidden for any reason, including offline, logged-out-in-job, or during a job alert.

---

## Placement and reach

- Header, rightmost, Home and every in-job screen (HeaderNav `home` and `in-job` variants). Not on Earnings, Refer, Profile roots — she is not at a customer's home when she is looking at earnings. It **is** on every screen between check-in and check-out, including camera, OTP and the job-alert takeover.
- Never under a Coachmark scrim (see `coachmark.md`), never under a BottomSheet scrim — a sheet leaves the header row live.
- Never moved to a floating position or the bottom bar, even where it would be easier to reach: one place is worth more than a shorter thumb path. The platform hardware fallback covers the pocket case.

---

## Content

- Label: *SOS*, in every language, never translated (it is a shape as much as a word).
- Hold indicator: *Keep holding*. Early release: *Hold SOS for 2 seconds to call for help*.
- Countdown: *Calling for help in 5*. Cancel: *Cancel — pressed by mistake*.
- Active: *Help is on the way. Stay on the line.* Status words: *connecting…*, *connected*, *shared*, *recording*, *trying…*
- End: *I'm safe now — hold to end*. After: *SOS ended · Recording saved*.
- Spoken copy is recorded by a calm native speaker in each language; no synthetic voice for this flow.

---

## Accessibility

Control role button, label *SOS, hold to call for help*; the hold is announced as it fills (*hold… hold… calling*). Active screen is a modal region; status rows are live regions announcing changes once. All targets ≥ 48 dp; the active-screen Buttons are `L` (56 dp). Contrast: `textInverse` on `bgErrorStrong` 5.9:1; `textError` on `bgError` 4.6:1. Works with TalkBack's double-tap-and-hold.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `bgErrorStrong` | `red.600` `#DC2626` | Solid red fills: SOS label pill, active-screen band, SOS safety strip. Today `textError` is being used as a fill, which is the wrong role |
| `sound.sos` | — | Registered unique sound, used only here (sound register is a pending foundation) |
| `haptic.heavy` | — | Only SOS trigger and job-alert timeout use it |

---

## Figma reconciliation

1. Promote the SOS `HeaderAction` to **SOSControl** with states `Resting` / `Pressed` / `Holding` (ring 0–100 via a number property).
2. Add **SOSControl / Hold indicator** (centre-screen) and **SOSControl / Active screen** with `Phase` (Countdown / Live / Offline) frames.
3. Add **SafetyStrip** with `Kind` (SOS / Shield / Location).
4. Fix the cluster order in "Home navigation bar nav" so SOS is rightmost in every frame; delete the loose *Help* pill.
5. Kavach Card → composition using SafetyStrip; the "Activate" button becomes `primary brand M` *Start Shield*.

Result: **~9 variants** and, for the first time, an SOS that is drawn end to end.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ 48 hit; active screen Buttons 56 |
| 2 | ⚙ Semantic tokens only | ✅ + proposed `bgErrorStrong` |
| 3 | ⚙ Type scale | ✅ Display / Heading / BodyLg / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ ring + haptic ticks + voice |
| 5 | ⚙ One next action | ✅ Cancel in the window; then Call 112 (safe end is a hold, visually tertiary) |
| 6 | ⚙ Tap guard | ✅ hold to start, hold to end |
| 8 | ⚙ Reduced motion | ✅ ring fills without easing; pulse dot static with a `record` glyph |
| 9 | Meaning without text | ✅ shape, colour, siren, ring, sound |
| 11 | Costly actions protected | ✅ **by construction** |
| 12 | Sound / voice | ✅ unique sos sound; calm recorded voice |
| 14 | Status colours | ✅ red is only ever SOS/danger; proposal separates fill from text role |
| 7 | Four languages | ⬜ *Keep holding* / *Help is on the way* ≤ 60 chars — verify Kannada |
| 15–16 | Copy heard aloud; tested one-handed with the screen partly obscured (P7) | ⬜ pending — **this component does not ship without the field test** |
