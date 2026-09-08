# VoicePrompt

Status: **Proposed** · Tier: Core · Package: `SnabbitVoicePrompt` (new) · Figma: no component. Shipped: a **voice bar** under the header on every FINAL ONBOARDING screen (play ▸, progress track, speaker) — e.g. `23235:38542`; a *Listen 🔊* pill on the customer address in *Check In* (`98:36313`); a speaker on the landmark row of *Training confirmed* (`23235:39901`).

Spoken guidance is a first-class channel (P4): she processes speech faster than text, her eyes are on the work, and every flow she does alone for the first time must be able to talk. VoicePrompt is the one visible shape for "this can be heard": a **bar** that speaks a whole screen, and an **inline** control that speaks one thing. The shipped onboarding already does the first; this spec names it, adds the second, and writes the rules for when the app speaks on its own.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Voice bar with play disc, a **scrubber knob**, and a speaker icon; appears on onboarding screens only | **`bar`**: play/pause disc, a **progress track without a knob**, a *replay* control; available on every screen with spoken guidance | Dragging a 12 dp knob one-handed on a moving bus fails P3; progress is information, not a control. Replay is what she actually wants. |
| *Listen 🔊* pill with text on some rows, a bare speaker on others | **`inline`**: IconButton `M tertiary brand` `speaker-high`, optional *Listen* label when there is room; one shape everywhere | Same control, same meaning (research: transfer of learning). |
| No playing state | Playing: disc shows `pause`, track fills, inline control goes `fill`; **only one voice at a time** across the screen | She must see what is talking to stop it. |
| Autoplay undefined | **Autoplay policy** below: first visit of onboarding / first-run screens, errors and offline speak on their own; in-job screens never speak unasked | A customer's home is not the place for the phone to start talking (P7 tone, persona). |
| Speaker icon on the right does nothing defined | Right slot = **sound on/off** for autoplay, `speaker-high` / `speaker-slash`, remembered per account | One place to quiet the app without losing the ability to replay. |

---

## Anatomy

### `bar` — speaks the screen

```
┌────────────────────────────────────────────────────────────────┐  48 dp · bgBrandSubtle · full width, under HeaderNav (and SafetyStrip)
│  (▶)  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   [🔊]   │  disc 32 bgBrand/iconInverse · track 4 dp bgBrand on borderBrand@30% · sound toggle IconButton M ghost
└────────────────────────────────────────────────────────────────┘
```

- **Disc**: `play` (idle / finished) ↔ `pause` (playing). 48 dp hit area. Tapping after finishing replays from the start.
- **Track**: fills left→right in real time; no knob; not draggable. Tapping the track does nothing.
- **Sound toggle**: `speaker-high` = the app may speak on its own; `speaker-slash` = it speaks only when she taps play. Persistent per account; a Toast confirms *Voice on* / *Voice off — tap ▶ to hear*.
- Never carries text: the screen's own copy is the transcript.

### `inline` — speaks one thing

IconButton `M tertiary brand` with `speaker-high`, at the trailing edge of the thing it reads (address, breakdown body, coachmark sentence, empty-state message, an amount). With room, a *Listen* label to its left in `Caption` `textBrand`. Playing: `speaker-high` **fill**, disc `bgBrand`, icon `iconInverse`; tapping again stops. 48 dp target; in a ListItem row it takes the trailing slot.

---

## What gets a voice

| Surface | Form | Autoplay |
| --- | --- | --- |
| Onboarding, training, go-live screens | `bar` | First visit only, 500 ms after the screen settles |
| Coachmark sentence | `inline` (in the bubble) | Yes (see `coachmark.md`) |
| EmptyState `error` / `offline` / `waiting` | `inline` | Yes — errors she must recover from are always spoken (P4) |
| Banner `error` / `offline` | `inline` at the trailing slot | Yes, once |
| Accordion body | `inline` in the header | No |
| Customer address, landmark, instructions (in-job) | `inline` | **No** — in-job never speaks unasked |
| Job alert | the alert's own sound + spoken amount/time (pattern) | Yes — highest-stakes moment |
| SOS active screen | spoken status (see `sos-control.md`) | Yes |
| Amount (payout, earnings) | `inline` beside the figure | No |

Anything that autoplays also shows the control, so what spoke can be replayed and stopped.

---

## Behaviour

- **One voice at a time.** Starting one stops any other on the screen; the stopped control returns to idle.
- **Priority.** The job-alert sound and SOS voice stop and block all other voice; a Timer's final-30-seconds sound plays over voice; system phone calls pause voice, which does not resume on its own.
- **Language.** Always her chosen language (Profile → Language). Fixed copy is a **recorded native speaker**; dynamic parts (names, amounts, times) are on-device TTS in the same language, spliced with the recording. Safety copy is never synthetic.
- **Speed.** One speed. No 1.5×, no slow mode — replay is the control.
- **Offline.** Fixed-copy audio ships in the app for all four languages; dynamic TTS is on-device. Voice never depends on the network.
- **Haptic.** `light` tick when a voice starts; none when it ends.
- **Screen readers.** When TalkBack is on, autoplay is suppressed (the reader is already speaking); the controls remain and read as *Listen* / *Stop*.
- **Autoplay is once.** A screen that has auto-spoken does not speak again on return; the *seen* state syncs with the Coachmark's.
- Playing never blocks input; she can tap through while it talks. Leaving the screen stops it.
- Reduced motion: the track fill still moves (it is information, not decoration).

---

## Content — writing for the voice

- Spoken copy is written as **speech**: short, warm, present tense, one instruction per sentence, ≤ 12 words a sentence, ≤ 3 sentences a screen. It is not the screen's text read aloud; it is what a trainer would *say* standing beside her.
- The visible text is the transcript's meaning, not necessarily its words; both must agree in what to do next.
- Numbers are spoken in words and units: *"four hundred and fifty rupees"*, *"nine in the morning"*.
- Reviewed **aloud** by a native speaker of each language before ship (P9); a written translation alone is not a review.
- Never spoken: legal text, codes, URLs, anything she cannot act on.

---

## Accessibility

Bar: `group` labelled *Voice guidance*; disc announces *Play guidance* / *Pause*; toggle announces *Voice on* / *Voice off*. Inline: *Listen, {what}* / *Stop*. Live region announces *Playing* once. Contrast: disc `iconInverse` on `bgBrand`; track `bgBrand` on `bgBrandSubtle` 3.2:1 (non-text). Targets 48 dp.

---

## Token proposals

| Token | Value | Note |
| --- | --- | --- |
| `sound.voiceStart` | — | Tick haptic only; no sound (into the sound register) |

---

## Figma reconciliation

1. **Create** VoicePrompt: `Form` (Bar / Inline), `State` (Idle / Playing / Finished), `Sound` (On / Off), boolean `Label` (inline). Bar bound to `bgBrandSubtle`, disc to `bgBrand`.
2. Replace the scrubber knob in every onboarding frame with the knob-less track; add the bar to training, go-live and error screens.
3. Replace the *Listen* pill and bare speakers with `inline` instances.
4. Note autoplay in each screen mock's frame description (*autoplays first visit* / *never autoplays*).

Result: **~8 variants**, and the app's voice drawn on every screen that has one.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 48 dp disc, toggle, inline |
| 2 | ⚙ Semantic tokens only | ✅ + two proposed |
| 4 | ⚙ States by ≥ 2 channels | ✅ icon swap + fill + track |
| 6 | ⚙ Tap guard | ✅ one voice at a time |
| 8 | ⚙ Reduced motion | ✅ track kept — information |
| 9 | Meaning without text | ✅ **by construction** |
| 11 | Costly / in-job | ✅ never speaks unasked in a customer's home |
| 12 | Voice for key moments | ✅ the component itself |
| 13 | Screen reader | ✅ autoplay suppressed with TalkBack |
| 15 | Copy heard aloud, four languages | ⬜ pending — every recorded line |
| 16 | Device review | ⬜ pending |
