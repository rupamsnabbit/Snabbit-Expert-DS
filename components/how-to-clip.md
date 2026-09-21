# HowToClip

Status: **Proposed** · Tier: Core · Package: `SnabbitHowToClip` (new) · Figma: no component. Shipped: a carousel of three portrait video cards with a play button under *My Rate Card* (`6062:14426`) — *Learn about Daily Earnings · Monthly Incentives · Rewards and Penalties*.

A ten-second film of a real expert doing the thing, with a voice saying what she is doing. The research that shaped this system (Microsoft's low-literacy work) found video with voice to be the channel first-time users completed tasks with; the shipped rate card already reaches for it. HowToClip makes it a component: a **card** she taps and a **player** that shows one task, loops once, speaks, and gets out of the way.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Three portrait thumbnails with a centred play glyph and a two-line title, in a scrolling row | **`card`**: 4:5 thumbnail, `play` disc, a **duration** chip (*0:12*), a title of ≤ 3 words; in a carousel of ≤ 5 with a PageIndicator | A duration tells her the cost before she taps (P3); ≤ 5 keeps every card reachable. |
| No player defined; presumably the OS video player | **`player`**: full-screen portrait, autoplay, loops **once**, voice on, large captions, knob-less progress, three controls — pause (tap), replay, close | The OS player has a scrubber, a share sheet and landscape; none of that is for her. |
| Clips of unspecified length | **10–20 seconds, one task each** | Longer is a course; shorter is a Coachmark. |
| Stock or studio footage | Shot with a **real expert in uniform**, in a real home, portrait, phone-quality light | She should see someone like her doing it (persona; P1 show first). |

---

## Anatomy

### `card`

```
┌──────────────┐  144 × 180 (4:5) · radius.lg · thumbnail (first frame) · bottom 40 % scrim
│              │
│     (▶)      │  play disc 40 dp bgPrimary / iconBrand, centred
│         0:12 │  duration chip Caption textInverse on bgInverse @ 60 %, bottom-right
│  Daily       │  title BodyMd Medium textInverse, ≤ 3 words, bottom-left over the scrim
│  earnings    │
└──────────────┘
```

Cards sit in a horizontal carousel (≤ 5, 12 dp gaps, 16 dp margins, first card fully visible, second peeking 24 dp) under a section heading (*Learn how it works*), with a PageIndicator beneath. A single card may also sit inside a Stepper row or a Coachmark (*Show me ›*) at `S` (96 × 120, title outside).

A **watched** card shows a `check-circle` fill 20 dp `iconSuccess` top-right; watching is remembered per account.

### `story` — the shipped circle

**In app** 2026-09-22 — *How to earn Gold coins*, *Helpful tips and guide*: a row of **circular** 72 dp thumbnails
with a 2 dp `borderBrand` ring, title beneath or none, in a horizontal scroll under a heading or inside an Accordion.
The spec's `card` (144 × 180) is the richer form; `story` is what ships, kept as a second size because replacing it
buys nothing. A watched circle drops the ring to `borderDefault`. Same player, same 8-second rule.

### `player`

```
┌────────────────────────────────────┐  full screen · bgInverse · portrait locked
│ [✕]                          [🔊]  │  close IconButton M ghost inverse · sound toggle
│                                    │
│         video 9:16, letterboxed     │  autoplays 300 ms after open · loops once · voice in her language
│                                    │
│   ┌──────────────────────────┐     │  captions: BodyLg SemiBold textInverse on bgInverse @ 60 %, ≤ 2 lines, bottom third
│   │ Tap Check in when you    │     │
│   │ reach the door.          │     │
│   └──────────────────────────┘     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  progress 4 dp bgBrand on textInverse @ 30 % · no knob · not draggable
│               (↺ Replay)           │  after the loop: Button secondary inverse M · before it: nothing
└────────────────────────────────────┘
```

Tap anywhere on the video to pause / resume (a 64 dp `pause` / `play` glyph flashes `motion.emphasis` (400 ms)). Nothing else: no scrubber, no speed, no share, no fullscreen toggle, no next-clip autoplay. The header and SOS are hidden — a clip is never watched during a job.

---

## Behaviour

- **Autoplay** on open, with voice, after `timeout.settle` (300 ms); the phone's silent switch is respected (captions carry it). The VoicePrompt rules apply: one voice at a time; opening a clip stops any other.
- **Loops once** (plays twice) then stops on the last frame with *Replay*; close returns to where she was. Never a queue, never *Up next*.
- **Captions always on**, burned in per language at build time (not a text track) so they render identically on every phone and survive offline; Outfit for Latin, system face for Indic per the type rules; ≤ 2 lines, ≤ 40 chars each, changing no faster than every 2 s.
- **Offline**: onboarding, go-live and check-in clips ship in the app (≤ 2 MB each at 720 × 1280, 24 fps, H.264); others download on first view over Wi-Fi or on tap over data with a Toast *Using data · 1.5 MB* — the one place a size is shown, because it costs her money. If unavailable offline, the card shows *Needs internet* in `Caption` and the tap gives a Toast.
- A **watched** state is set when 80 % has played once; it drives the check on the card and can satisfy a Stepper step (*Watch: how to check in*).
- Reduced motion: no glyph flash; video still plays (it is content).
- Android back = close. Rotating the phone does nothing.

---

## Content

- One task per clip, 10–20 s: *How to check in* · *Reading your rate card* · *What a red card is*. Not *Welcome to Snabbit* (that is a Coachmark tour), not *All about earnings* (that is three clips).
- Title ≤ 3 words in the longest language: *Check in* · *Daily earnings* · *Red cards*.
- Voice is a recorded native speaker, spoken register, present tense, describing what is on screen: *"Tap Check in when you reach the door."* Never a script that says *"In this video…"*.
- The expert on screen wears the uniform, does the task in a real home, and is never a model; faces are shown with consent.

---

## Accessibility

Card announces *"Video: Daily earnings, twelve seconds, watched"*. Player: pause/resume by tap or by the TalkBack double-tap; captions are the transcript; progress is a live region at 25 % steps. Sound toggle announces state. Close ≥ 48 dp. Caption contrast ≥ 4.5:1 on the scrim regardless of the frame.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `media.clipBudget` | 2 MB · 720 × 1280 · ≤ 20 s | Build-time rule for bundled clips; into the motion/media foundation |

---

## Figma reconciliation

1. **Create** HowToClip / Card: `Size` (M / S), booleans `Watched`, `NeedsInternet`; duration chip and ≤ 3-word title.
2. **Create** HowToClip / Player: `State` (Playing / Paused / Ended), `Sound` (On / Off); knob-less progress, captions block, Replay.
3. Rebuild the rate-card carousel with three Card instances and a PageIndicator; add clip cards to the onboarding Stepper steps that have one.

Result: **~8 variants**, and the app's third channel — video — drawn for the first time.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ card 144 × 180; close, toggle, replay 48 |
| 2 | ⚙ Semantic tokens only | ✅ + proposed budget |
| 3 | ⚙ Type scale | ✅ BodyMd / BodyLg / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ watched check + remembered; paused glyph + stopped progress |
| 5 | ⚙ One next action | ✅ Replay or close; never Up next |
| 8 | ⚙ Reduced motion | ✅ glyph flash removed |
| 9 | Meaning without text | ✅ **by construction** — video + voice |
| 12 | Voice | ✅ recorded native speaker |
| 13 | Screen reader | ✅ captions as transcript |
| 15–16 | Review | ⬜ pending — first three clips shot with experts |
