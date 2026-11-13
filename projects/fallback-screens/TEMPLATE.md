# Fallback screens — step 2: one template

Status: **draft for the lead's agreement**, 2026-11-12. It covers the 60 cases in `CASES.md`.

## The one rule

**The picture says what happened. Saathi says it aloud. One button does the one thing.** She never has to read to know where she is or what to do. When the cause goes away (data comes back, location turns on), the screen leaves by itself and she is back on her step.

---

## Anatomy: the same in every case

```
┌──────────────────────────────────────┐
│ ‹      ▬▬▬▬▬▬▬▬▬░░░░░    (☎ Help) (अ) │  NEVER CHANGES: the step's own header and progress bar stay.
│                                      │  She sees she has not lost her place. Help is always here.
│                                      │
│          ┌──────────────────┐        │
│          │                  │        │  CHANGES ① THE PICTURE: what happened, shown as a thing
│          │   [ picture ]    │        │  (phone with no signal, location pin, Snabbit shop with a
│          │            ✗     │        │  clock, Aadhaar card). The ✗ dot is the only red on the screen.
│          └──────────────────┘        │
│                                      │
│      Phone has no internet           │  CHANGES ② ONE LINE: what happened. Heading, ≤ 40 chars.
│                                      │  No second line on screen; the reassurance is spoken.
│                                      │
│                              (Saathi)│  NEVER CHANGES: Saathi docked bottom-right, speaks on arrival,
│                             ∿∿∿      │  tap to hear again (as on shipped onboarding).
│ [ ⏻  Turn on data                  ] │  CHANGES ③ THE ACTION: one Button L, full width, bottom.
└──────────────────────────────────────┘  Its icon and verb come from the owner (table below).
                                          The finger guide lands on it if she has not tapped.
```

**What changes per case: four things.**
1. The picture.
2. The one line.
3. The action.
4. The spoken line, which is not on screen.

Everything else is fixed.

**What never changes:**

| Fixed part | Rule | Principle |
| --- | --- | --- |
| Place | Header and progress bar stay, so the failure looks like part of her step, not a crash | P5 |
| Picture slot | Same size and place in every case. One picture, never two | P1 · one hero |
| Status mark | The ✗ dot on the picture. No red title, no red screen, no red icon | P6 · `error-recovery.md` § Colour |
| One line | One line, no body text, no error code, none of the banned words (*error, network, server, timeout, sync, failed*) | P1 · `content.md` § 9 |
| Voice | Saathi speaks once on arrival: what happened, then that her steps are kept, then what to do. Tap Saathi to hear it again | P4 |
| One action | One Button, at the bottom, full width. Never a second Button except *Call help* after the third failure | P2 · `error-recovery.md` ladder |
| Finger guide | If she has not tapped after a while, the accepted CTA guide (finger + spotlight) lands on the Button | lead's accepted guide |
| Leaves by itself | When the cause clears, the screen goes and the step continues. No *Back online* tap, no confirmation | P5 |
| Sound | No error sound. Silence, then Saathi's voice | `error-recovery.md` § Colour and sound |
| Help | The header's Help (call) is live on every fallback. After three failures of anything, *Call help* becomes the Button | `error-recovery.md` ladder |

---

## Six owners, six actions: what she learns once

Each case has one owner, and the owner picks the Button. Sixty cases come down to six actions. Each action has a fixed icon and behaviour, so the second time she sees one she knows it without reading.

| Owner | The action | Icon (Phosphor) | What the tap does | Cases |
| --- | --- | --- | --- | --- |
| **Her phone** — something is off | **Turn on …** (*Turn on data*, *Turn on location*, *Turn up sound*, *Allow camera*) | `toggle-right` **new meaning** | Opens the phone's own panel for that one switch over our screen (Android Internet, Location, Volume panels) where one exists, otherwise Settings. The screen leaves by itself when it is on | 1.2 1.3 1.4 1.13 1.14 3.1 3.3 7.1 7.2; 7.3 (camera busy) gets **Try again** |
| **Where she is** — no signal, no GPS, dark | none: **the screen waits** | the picture + a moving shape | No Button. A ring shows the app is trying by itself; it continues when the signal comes. Saathi says *move near a door or window* | 1.1 1.5 1.6 3.4 6.2 7.5 7.7 |
| **Snabbit** — slow, down, closed | none (or **Try again** after the wait) | `arrow-clockwise` | The app tries by itself first. Closed for repair shows the time it opens (Timer `deadline`), with no Button | 1.7 1.8 1.9 1.16 5.8 6.5 6.6 |
| **Her details** — a typo, a photo | **Fix** the thing, in place (*Type again*, *Take again*) | `pencil-simple` / `camera` | Goes back to the field or the camera. Usually it is the field's own state, not a screen | 2.2 2.3 2.4 4.3 5.4 5.5 6.4 7.4 7.6 8.1–8.4 8.6 8.7 8.9 |
| **Someone else** (Aadhaar, the bank, the SMS) | **Wait**, or **another way** (*Ask for a call*, *Pick the city*) | `clock` / the way's icon | Shows when, or offers the one other path the system has | 2.1 3.2 5.1 5.2 5.3 8.5 8.8 |
| **Nobody here** | **Call help** | `headset` | Calls the onboarding line | 1.15 1.18 4.2 5.6 5.7 5.9 |

Plus two that are Fix-like but special: **Update app** (`download-simple`, opens the store; 1.10) and **Free up space** (`trash`, opens the phone's storage page; 1.11). Battery (1.12) is a fact with no Button (*charge the phone*). City not open (4.1) keeps its shipped city picker.

---

## Three placements, one template

Whether she can carry on decides how much of the screen the template takes. The parts and their order stay the same.

| Placement | When | Built from (system) | Tier |
| --- | --- | --- | --- |
| **Screen** | It **stops** her step or the whole app | **EmptyState** `page` (`components/empty-state.md`), changed: picture 200 dp, title only, Button L at the bottom, Saathi docked instead of the speaker button | **Core**, changed |
| **Strip** | She **can carry on** (slow internet, battery low, the photo will send) | **Banner** `offline` / `degraded` / `warning` (`components/feedback.md`), under the header, not dismissible; Saathi speaks it once | **Core**, as is (copy rewritten) |
| **In place** | The fix is in what she just typed or shot | **TextField** `error` · **NumericKeypad** `otp` shake · **MediaCapture** `fail` | **Core**, as is; Saathi speaks the line |

Waiting on the Screen placement uses **EmptyState `waiting`** with a **Timer** (`components/timer.md`): *the shape of the wait, not a spinner*.

### Every case placed

| Placement | Cases |
| --- | --- |
| **Screen** | 1.1 1.2 1.3 1.4 1.8 1.9 1.10 1.11 1.14 1.15 · 2.1 · 3.1 3.3 · 4.1 4.2 · 5.1 5.2 5.3 5.5 5.6 5.7 5.8 5.9 · 6.1 6.6 · 7.1 7.2 7.3 7.6 · 8.3 8.4 8.5 8.8 |
| **Strip** | 1.5 1.6 1.7 1.12 1.13 1.16 1.17 1.18 · 6.2 6.3 6.5 · 7.7 · 8.9 |
| **In place** | 2.2 2.3 2.4 · 3.2 3.4 (city list opens) · 4.3 · 5.4 · 6.4 · 7.4 7.5 · 8.1 8.2 8.6 8.7 |

---

## Checked against the system before adding anything

| Part | Already in the system | Used as is? |
| --- | --- | --- |
| Whole-screen failure | EmptyState `error` / `offline` / `waiting` | **Changed.** Inline M Buttons and a body line become one bottom L Button and no body (P1 one line, P2 bottom action). A new size, **`step`**, beside `page` and `section` |
| Lasting condition | Banner `offline` / `degraded` (Feedback) | Yes. Copy is rewritten at step 3 (*You're offline · …* breaks the no-jargon and no-dot rules) |
| One failed tap | Snackbar | **Not used in onboarding.** A Snackbar disappears in 6 s, and she would miss it. A failed tap here becomes the Strip, with *Try again* |
| Field or photo failure | TextField `error`, NumericKeypad `otp`, MediaCapture `fail` | Yes |
| Recovery order | `error-recovery.md` ladder (retry → fix → alternative → help → later) | Yes. The six owners are the ladder, named by who acts |
| Voice | VoicePrompt `inline`; EmptyState speaks error / offline | **Changed.** In onboarding the voice is Saathi docked (shipped), not the speaker IconButton |
| Picture | Pictograms: pink disc, magenta object, ✗ dot (`assets.md`); `phone-✗`, `search-document-✗`, `id-card-✗`, `bank-✗` exist | Yes for the rule. The hero size (200 dp) and the missing objects are new |
| Finger guide | Coachmark (spotlight, voice) | **Changed.** The accepted idle trigger and finger are not in `coachmark.md` yet |

## Tier of every part

| Part | Tier |
| --- | --- |
| The template as a whole (*Fallback*) | **Tier 2 Composition**: EmptyState + Saathi + Button + finger guide, named once in `patterns/error-recovery.md` |
| EmptyState size `step` | **Tier 1 Core**, a change to `components/empty-state.md` |
| Banner strip, TextField, NumericKeypad, MediaCapture, Timer, Button | **Tier 1 Core**, as is |
| Saathi docked voice | **Tier 1 Core**, ask: register Saathi in `assets.md` and add a `saathi` form to `voice-prompt.md` (shipped, never specified) |
| Finger guide on idle | **Tier 1 Core**, ask: add the idle trigger to `coachmark.md` |
| Case pictures | **Tier 1 Core** assets: new pictograms in `assets.md` |
| *Turn on* opening the phone's panel | Behaviour in the pattern, plus `toggle-right` registered in `icons.md` |

## Asks of core (go to `SCOPE.md` once agreed)

1. `empty-state.md`: size **`step`**. Picture 200 dp, title only, one Button L at the bottom, Saathi docked, leaves by itself when the cause clears.
2. `assets.md`: register **Saathi** (docked portrait plus the speaking waveform pill), and add the case pictures. Step 3 lists each one; most are objects with a ✗ dot (phone, location pin, Snabbit shop, Aadhaar card, camera, bank, play button).
3. `voice-prompt.md`: the **`saathi`** form (docked, tap to replay, waveform while speaking).
4. `coachmark.md`: **idle finger guide** (starts after she has not tapped for a while, spotlight + finger on the one Button).
5. `icons.md`: register three new meanings: `toggle-right` (*turn on a phone setting*), `download-simple` (*update the app*) and `trash` (*free up space*). `pencil-simple`, `clock`, `headset`, `camera` and `arrow-clockwise` are already registered.
6. `motion.md`: an exception to *no mascots waving*, for Saathi's speaking pill only.

## For the lead to decide

- ~~The picture~~ — **decided 2026-11-12: the cause as an object with a ✗ dot.**
- **Strip for a failed tap** instead of a Snackbar, in onboarding only (above).
