# Motion

Motion in the Expert app does one of two jobs: it **carries information** (time draining, progress filling, something recording) or it **acknowledges her** (a press answered, a sheet arriving from where she tapped). It never decorates. On a ₹10k phone in a moving bus, every extra frame is battery and doubt (P8), and every unexplained movement is a question she cannot ask (P5). This page fixes the durations, curves and waits that the component specs already use, so that no spec hard-codes a number again. Tokens live in `tokens/tokens.json` (`motion`, `timeout`) and are summarised in `tokens/DESIGN_TOKENS.md`.

---

## Three rules

1. **Decoration ends in 300 ms.** Anything that is not information or a gesture uses `instant` – `slow`. `emphasis` (400) is allowed once per event, for the thing that just happened (a goal reached). Gestures (`gesture` 600), celebrations (`celebrate` 800) and loops (`beat`, `loop`) are exempt because they *are* the meaning.
2. **Transform and opacity only.** Never animate colour, shadow, blur or layout width on the main thread; height animates only for expand/collapse (Accordion, Card) and only over `standard`. One property per element per moment: a sheet slides *or* fades, a Badge scales in *or* fades out.
3. **Information motion survives reduced motion.** When the OS asks for less motion, decoration becomes a fade or nothing, but the Timer ring still drains, the ProgressBar still fills, the level meter still moves, the camera guide still turns green — these are the state. Hold gestures replace the sweep with a countdown label; pulses stop and the state is carried by weight or words.

---

## Durations

| Token | ms | What it is for | Used by |
| --- | --- | --- | --- |
| `motion.instant` | 0 | Content swaps | Skeleton → content, Tabs content, list updates after a Chip filter |
| `motion.xfast` | 80 | Feedback that must beat the finger | NumericKeypad key scale (was 60), OTP shake (was 80 / 120) |
| `motion.fast` | 100 | Pressed washes; small things leaving | Every pressed state; Badge fade-out; Coachmark leaving (was 150); SOS indicator fade (was 150) |
| `motion.standard` | 200 | Open / close, slide, expand — the default | BottomSheet closing; Accordion and Card expand; Tabs indicator; Segmented slide (was 150); PageIndicator pill; Toast slide; NumericKeypad rise; Badge scale-in (was 150); Nudge collapse (was 150); DatePicker range grow (was 150) |
| `motion.slow` | 300 | Arriving surfaces; value changes | BottomSheet opening (was 250); ProgressBar fill; Stepper node completing and connector fill; Amount change |
| `motion.emphasis` | 400 | One-shot emphasis | ProgressBar goal asset 1 → 1.15 → 1; HowToClip pause / play glyph flash |
| `motion.gesture` | 600 | Hold-to-confirm fill | Button danger hold (Decline, end shift); NumericKeypad backspace clear |
| `motion.celebrate` | 800 | Celebration; one Spinner revolution | JobAlert accepted; Spinner (`motion.spin` → this) |
| `motion.beat` | 1000 | A pulse that means *live* | SafetyStrip and ShieldRow record dot; Timer urgent digits; `me` marker halo |
| `motion.loop` | 1200 | One cycle of an indefinite loop | Skeleton shimmer (`motion.shimmer` → this); Coachmark spotlight pulse |

Values that were off the scale in earlier specs (60, 120, 150, 250) are mapped above; the specs are the owners of *what* moves, this page of *how long*.

## Easing

| Token | Curve | Use |
| --- | --- | --- |
| `easing.enter` | `cubic-bezier(0, 0, 0.2, 1)` | Arriving: sheets, keypad, toasts, expanding content. Fast start, soft landing — she sees where it came from |
| `easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Leaving: it gets out of the way and does not linger |
| `easing.move` | `cubic-bezier(0.4, 0, 0.2, 1)` | Moving while on screen: Tabs indicator, PageIndicator pill, Segmented selection |
| `easing.linear` | `linear` | Anything that measures time: hold fills, Timer ring, ProgressBar, shimmer, spin. A curve here would lie about time |

No springs, bounces or overshoots except the single `emphasis` scale on a reached goal. Nothing parallax, nothing that follows the finger except the sheet's drag handle.

---

## Timeouts — behaviour, not animation

How long the app waits before it acts or speaks. They are not motion but they are time, and they were scattered across the specs with the same numbers meaning different things.

| Token | ms | Rule |
| --- | --- | --- |
| `timeout.tapGuard` | 300 | After a tap, further taps are ignored (Button, Card, ListItem) — the duplicate-tap guard |
| `timeout.loadingMin` | 400 | A spinner or skeleton, once shown, stays at least this long so it never flickers |
| `timeout.settle` | 300 | After a component appears, before it speaks or plays: Coachmark voice, HowToClip autoplay; also the OTP auto-submit pause |
| `timeout.screenSettle` | 500 | After a screen appears, before its VoicePrompt bar autoplays (`voice.autoplayDelay` → this) |
| `timeout.loading` | 3000 | **The three-second rule**: after this, loading becomes an honest failure with a way out (Skeleton, Button loading, MediaCapture checking, ShieldRow starting) |
| `timeout.toast` | 3000 | Toast visible |
| `timeout.snackbar` | 6000 | Snackbar visible, or until acted on |
| `timeout.autoAdvance` | 6000 | Promotional carousel dwell; pauses on touch; one loop |
| `timeout.autoContinue` | 800 | MediaCapture success overlay before moving on |
| `timeout.holdSOS` | 1500 | SOS hold — deliberately longer than `motion.gesture` |
| `timeout.sosCancel` | 5000 | Cancel window after SOS triggers |
| `timeout.expiredClose` | 2000 | An expired job alert stays readable before it closes |
| `timeout.safetyCheck` | 30 000 | No answer to *Are you in danger?* is treated as danger |
| `timeout.jobAlert` | server | The job-alert window (default 90 000); the Timer reads it and never hard-codes it |

The Timer's own thresholds (attention at 50 %, urgent at 20 %, absolute 5 min / 60 s for long windows) live in `components/timer.md`; they are rules about time, not waits.

---

## Where motion is *not*

- No screen transitions beyond the platform default; the app does not slide, zoom or fade between screens — the header title and the tab bar carry continuity.
- No loading animation other than Skeleton shimmer and the Spinner; no custom loaders, no mascots waving.
- No idle animation anywhere: nothing moves on a screen she is not touching, except a live Timer, a live record dot and an auto-advancing promo carousel (which stops after one loop).
- No confetti. The one celebration is the 800 ms accept moment, and reduced motion makes it a static check.
- No animated icons; Phosphor glyphs swap, they do not morph (a caret rotates 180° over `standard` — that is the exception, and it is a transform).

---

## Reduced motion, per kind

| Kind | Normal | Reduced |
| --- | --- | --- |
| Pressed wash | 100 ms fade | same (it is a fade) |
| Sheet / keypad arrive | slide 300 / 200 | appear |
| Expand / collapse | height 200 | instant |
| Slide of an indicator | 200 move | jump |
| Hold fill | 600 sweep | countdown label *3 · 2 · 1* |
| Timer ring, progress fill, level meter | animate | **animate** — information |
| Pulses (record dot, urgent digits) | 1000 beat | static; digits go bold, dot stays solid |
| Shimmer, spin | loop | static skeleton block; static spinner arc |
| Celebration | 800 scale-in | static check |
| Glyph flash | 400 | none |

---

## Checklist row 8, restated

*⚙ Motion ≤ 300 ms, reduced motion.* Passes when every decorative duration is a `motion.*` token at or below `slow`, every gesture or loop is named as such, every wait is a `timeout.*` token, and the reduced-motion column above is implemented. A spec that writes a raw millisecond value fails the row.

---

## Reconciliation

Applied 2026-09-08 to the specs (values as in the table above): `numeric-keypad.md` (60 → `xfast`; `motion.keyPress` retired), `text-field.md` (120 → `xfast`), `tabs.md` / `date-picker.md` / `badge.md` / `nudge.md` / `coachmark.md` / `sos-control.md` (150 → `standard` or `fast` as listed), `bottom-sheet.md` (250 → `slow`), `skeleton.md` (`motion.shimmer` → `loop`, `motion.spin` → `celebrate`, `timeout.skeleton` → `loading`), `voice-prompt.md` (`voice.autoplayDelay` → `timeout.screenSettle`), `shield-card.md` (`timeout.safetyCheck` — now real), `job-alert.md` (`timeout.jobAlert` — now real). Remaining raw values in specs are on-scale (100 / 200 / 300 …) and read as the token of that value. In Figma: motion is not modelled; the prototype settings for the sheet and tabs should use 300 / 200 ease-out.
