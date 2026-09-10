# Coachmark

Status: **Proposed** · Tier: Core · Package: `SnabbitCoachmark` (new) · Figma: Tooltips (`537:4918`, 6 variants), Colored Tooltip (`1491:17618`, merge then delete)

Point and say. The first time a screen shows her something she has never used — the availability switch, the tab bar, the check-in camera — a Coachmark dims everything else, lights the one thing, and **speaks** one sentence about it in her language. Then it gets out of the way, and never comes back for that thing.

This is the app's only **lesson**. Hover hints, `(i)` popovers and "tap to learn more" bubbles do not exist here (the small anchored bubble that names a control on long-press or announces a change at a Timer is the separate **Tooltip**, `tooltip.md`, reinstated 2026-09-10; a menu about a tapped marker is the **Popover**, `popover.md`); the research on low-literate users is clear that guidance must be **on first use, with audio**, at the thing itself — not stored behind a small icon for later.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Tooltips: dark bubble, one line of `Caption`, six arrow positions, no trigger defined | **Coachmark**: scrim with a spotlight cut-out around the target, a light bubble with one `BodyLg` sentence, a **speaker** control, an optional pictogram, and one way out | A tooltip that appears on tap of an `(i)` fails P3 and the research; a coachmark that appears on first use with voice is how features get discovered. |
| "This includes all bonuses" — explaining an amount in a bubble | Not a Coachmark. Explanations of a value are an `info` BottomSheet row or a `speaker-high` beside the label | A coachmark teaches a control once; it does not annotate data. |
| Colored Tooltip (pink / warning fills) | ~~Deleted~~ → **Tooltip `status`** (`tooltip.md`, 2026-09-10) — not part of the Coachmark | Colour on *guidance* reads as status (P6), so the Coachmark stays neutral; the tinted bubble *is* status (a change at the Timer) and lives in its own component. |
| Six arrow positions | **Two**: bubble below the target with the arrow on top, or above with the arrow beneath; arrow slides horizontally to the target centre | Fewer shapes to recognise; left/right arrows collide with 360 dp screens. |

---

## Anatomy

```
 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  scrim bgInverse @ 60 %
 ▒▒▒▒▒▒▒▒▒▒▒╭───────────╮▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒▒│  ◯ target │▒▒▒  ← spotlight: target + 8 dp, radius = target radius + 8, pulsing 2 dp ring
 ▒▒▒▒▒▒▒▒▒▒▒╰─────▲─────╯▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒▒╭─────────────────────────────────╮▒▒▒  ← bubble bgPrimary · radius lg · padding 16 · 12 dp from target
 ▒▒▒▒▒│ [picto]  Turn this on when you  │▒▒▒     one sentence BodyLg textPrimary ≤ 60 chars
 ▒▒▒▒▒│  48      are ready for jobs.    │▒▒▒
 ▒▒▒▒▒│  🔊 Hear again        1 of 3    │▒▒▒  ← speaker (tertiary S) · counter Caption when in a tour
 ▒▒▒▒▒│           [ Got it            ] │▒▒▒  ← one Button primary brand M — or none when the target itself is the way out
 ▒▒▒▒▒╰─────────────────────────────────╯▒▒▒
```

Bubble width 296 dp (screen − 2 × 32), never narrower than 240. The spotlight keeps the target **live**: tapping it does the real thing. Everything under the scrim is inert.

---

## Kinds

| Kind | Stops | When | Way out |
| --- | --- | --- | --- |
| `point` | 1 | First time a screen shows one new control | **Do it** (tap the lit target) or *Got it* |
| `tour` | 2–3, in sequence | First launch after onboarding (availability → tab bar → SOS); first Rewards visit | *Next* on each stop, *Got it* on the last; counter *1 of 3* |

Three stops is the ceiling. A feature that needs four sentences needs a redesign, or a how-to clip (later spec), not a longer tour.

Each Coachmark has a **way out** declared: `do-it` (the target's own action dismisses it — *Tap here to go online*) or `got-it` (a Button — *This is your SOS. Hold it if you feel unsafe.* has nothing to do now). `do-it` coachmarks still show *Got it* as a `tertiary` link below, smaller, for someone who does not want to act yet.

---

## Voice

The sentence is **spoken automatically** when the Coachmark appears, in her chosen language, `timeout.settle` (300 ms) after the bubble settles. The speaker control replays it. Voice is the primary channel; the text is the transcript. Spoken copy is written as speech and reviewed aloud (P4, P9). If sound is off or the phone is silent, the speaker control shows the *muted* state and the text carries the whole meaning — which is why it is one short sentence, not three.

---

## Rules

- **Once.** A Coachmark for a control shows once per account, then never again on any device. *Show me again* lives in Saathi → Help, where a list replays any coachmark.
- **One at a time.** At most one Coachmark (or tour) per screen visit. Two features arriving in the same release queue; the second waits for the next visit.
- **Never during a job alert, a running Timer, a check-in, or an OTP.** Never when a Banner of tone `error` or `offline` is showing.
- **Never over SOS** — the SOS control is never under a scrim. A Coachmark *about* SOS spotlights it; every other Coachmark leaves it lit and live outside the scrim.
- **Never on the first screen of the first launch.** She meets the app for a moment before the app starts talking.
- The scrim does not dismiss. An accidental tap outside pulses the bubble once; the guidance is not lost by a slip of the thumb (persona: moving, one-handed).
- Android back dismisses as *Got it* (once is once).
- A `point` Coachmark's target must be ≥ 48 dp and fully on screen; the screen scrolls it into view first, or the Coachmark does not show.

---

## Placement

Bubble **below** the target when the target's centre is in the top half of the screen, **above** when in the bottom half; 12 dp gap; arrow 12 × 8 dp centred on the target's horizontal centre, clamped 24 dp from the bubble's corners. The bubble never covers the bottom action bar's primary Button unless that Button is the target. In a tour, stops are ordered top-to-bottom, then left-to-right, so the bubble moves in one direction.

---

## States

| State | Looks |
| --- | --- |
| entering | Scrim fades in 200 ms; bubble scales 0.96 → 1 and fades 200 ms; spotlight ring pulses 2 dp → 6 dp twice over 1.2 s, then holds |
| showing | Steady; voice plays; speaker control in `playing` (icon `speaker-high` fill) then `idle` (regular) |
| muted | Sound off: speaker shows `speaker-slash`; text unchanged |
| leaving | Bubble and scrim fade `motion.fast` (100 ms); target un-spotlights; if `do-it`, the target's own pressed state runs |

Reduced motion: no pulse, no scale; fades stay.

---

## Content

- One sentence, ≤ 60 characters in English, ≤ 72 in Hindi, sentence case, spoken register: *Turn this on when you are ready for jobs.* · *Everything is here — jobs, money, help.* · *This is SOS. Hold it if you feel unsafe.*
- Say what it is **and** what she does with it. Never *Pro tip*, never *New!*, never a feature name alone.
- Button labels: *Got it* (single / last), *Next* (tour). `do-it` coachmarks name the action in the sentence, not on a button.
- The pictogram, when present, is from the illustration layer's `picto` class and shows the *result* (a phone ringing with a job), not the control.

---

## Accessibility

Role dialog, modal; focus moves to the bubble; the sentence is announced (and spoken — the two do not overlap: screen-reader users get the announcement, voice is suppressed). The target is reachable from the bubble as the next focusable element. *Got it* ≥ 48 dp. Bubble `textPrimary` on `bgPrimary`; the scrim guarantees the bubble is the brightest thing on screen outdoors.

---

## Token proposals

| Token | Value | Note |
| --- | --- | --- |
| `overlay.scrim` | `bgInverse` at 60 % | Shared with BottomSheet's scrim — propose once, here, and reference it from `bottom-sheet.md` |

---

## Figma reconciliation

1. ~~Tooltips → Coachmark~~ Create **Coachmark** as a new component: `Placement` (Below / Above), `Media` (None / Picto), `WayOut` (Do-it / Got-it), `Counter` (None / n of 3), `Sound` (On / Muted). Bubble `bgPrimary`, text `BodyLg`. (Tooltips stays, reconciled by `tooltip.md`.)
2. ~~Delete Colored Tooltip~~ — reconciled as Tooltip `status` in `tooltip.md`.
3. Add a **Coachmark / Overlay** frame: scrim + spotlight mask, to compose over screen mocks.
4. Any mock that annotates a value with a tooltip → `info` BottomSheet or `speaker-high` beside the label.

Result: **~10 variants** replacing 8, and a first-run pattern that every screen mock can show.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ Got it, speaker; target must be ≥ 48 to qualify |
| 2 | ⚙ Semantic tokens only | ✅ + one proposed `overlay.scrim` |
| 3 | ⚙ Type scale | ✅ BodyLg / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ spotlight + scrim + voice |
| 5 | ⚙ One next action | ✅ one Button, or the target itself |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ voice + spotlight + picto |
| 11 | Costly actions | ✅ never during alert / timer / check-in |
| 12 | Voice for key moments | ✅ **by construction** |
| 13 | Screen reader | ✅ modal dialog, no double-speak |
| 15–16 | Copy heard aloud in four languages; device review | ⬜ pending |
