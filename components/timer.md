# Timer

Status: **Proposed** · Tier: Core · Package: `SnabbitTimer` · Figma: Timers (`371:6294`); stray frames `2477:7134`, `2477:7141` to delete

Time as a shape. The Timer is a pill whose stroke drains as time runs out, with the digits inside and one word above saying what the time is for. It is the highest-stakes core component: it runs the job-alert countdown, the arrive-by window and the login window — the three moments that decide whether she gets paid.

The existing Figma component already has the right idea (ring + digits + urgency colour). This spec keeps that form and fixes the thresholds, sizes, states and behaviour.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Ring colour chosen per instance (green / yellow / red) | Colour is **computed from time remaining**, never set by hand | Urgency must mean the same thing on every screen. |
| Two sizes, unclear | `L` (job alert, full-screen states) and `M` (cards, headers) | |
| Digits `04:23` and `4:23` both appear | **`m:ss`** under 10 min, `mm:ss` from 10 min, `h:mm:ss` from 1 h — never a leading zero on the first group | Fewer digits to read; consistent. |
| Static "Login by 6:45 AM" styled like a countdown | Separate `deadline` mode: clock time, no ring | A time you cannot run out of should not look like one you can. |
| Label in caps | Label in sentence case, `Caption` (M) / `BodyMd` (L) | Type rules. |

---

## Anatomy

```
 ╭──────────────────────╮
 │   Arrive within      │  ← label, one or two words, textSecondary
 │      4:23            │  ← digits, tabular, tone colour
 ╰──────────────────────╯  ← pill ring: track (borderDefault) + progress stroke (tone colour) draining clockwise from 12 o'clock
```

Sizes: **L** 200 × 88 dp, stroke 6, digits `Display` 32 SemiBold, label `BodyMd`. **M** 132 × 56 dp, stroke 4, digits `Heading3` 20 SemiBold, label `Caption`. Radius `full`. Padding inside the ring 8 dp.

---

## Tones — computed, not chosen

The tone is a function of **time remaining as a fraction of the total window**, with absolute floors so a short window still gets its warning.

| Tone | When | Stroke / digits | Track |
| --- | --- | --- | --- |
| `calm` | > 50 % remaining | `textSuccess` / `iconSuccess` stroke | `borderDefault` |
| `attention` | ≤ 50 % **or** ≤ 5 min | `textWarning` / `iconWarning` | `borderDefault` |
| `urgent` | ≤ 20 % **or** ≤ 60 s | `textError` / `iconError`; digits pulse once per second at ≤ 10 s (reduced-motion: no pulse, digits go `bold`) | `borderDefault` |
| `expired` | 0 | digits `0:00` in `textTertiary`, stroke gone, label becomes the outcome (*Time's up*) | `borderDefault` |
| `deadline` (mode) | fixed clock time | digits `textBrand`, **no progress stroke**; ring is a plain `borderBrand` outline | — |

For windows shorter than 5 minutes (the job alert's 90 s) only the percentages apply — otherwise a 90 s window would be `attention` from its first second and `urgent` for two-thirds of its life.

Tone changes are also **sounds** (P4): entering `attention` plays the `soft-tick`; entering `urgent` plays the `urgent-tick` and a `medium` haptic; `expired` plays the `timeout` sound. The job-alert Timer additionally ticks audibly every second in `urgent`.

Colour is never the only signal: the stroke length, the digits and the sound all change together (P1).

---

## Modes

| Mode | Digits | Ring | Use |
| --- | --- | --- | --- |
| `countdown` | time remaining | drains | Job alert (accept within), check in by, **job in progress (time left)**, login within, OTP resend |
| `elapsed` | time since a moment, counts up | fills | **Overtime** (*Overtime 12:40*, after time left reaches 0), waiting at the door |
| `deadline` | clock time (`6:45 am`) | none | Login by, job starts at — things she plans around rather than races |
| **`buffer`** | time remaining **before** the timed thing starts | drains, but **always `calm`** | Setup window after check-in, before the service timer runs (`beauty-job-cycle` PRD § 4) |

**`buffer` is the one mode that never escalates.** Every other countdown drains toward a cost — a job lost, a
login missed. A buffer drains toward *work starting*, which is the thing she came for. Running it green → amber →
red would teach her that setting her kit out is a race, which is the opposite of why the buffer exists. So
`buffer` holds `calm` to zero, and the label above it names what is waiting, not what is ending: **Setting up** ·
*Your service starts in 8:40*. At zero it does not alarm; it hands over to a `countdown` and the service timer
begins. She may end the buffer early with an explicit action — it is a floor for her benefit, not a gate.

`elapsed` uses `calm` only, unless it crosses a limit (overtime) → `attention`.

---

## Behaviour

- Updates every second; digits never skip. When the app resumes from background the Timer recomputes from the server deadline, not from local ticks.
- **The window can grow while it runs** — the customer adds a service during the job (`beauty-job-cycle` PRD § 4). The deadline moves, the digits jump to the new time left, and the ring and tone **recompute from the new total**: the drained share stays drained, the rest of the ring is the new remaining share, and a tone that had reached `attention` may fall back to `calm`. There is **no added-time segment**, stripe or second colour on the ring — what changed is said by a `Tooltip status` pinned to the Timer (`clock-clockwise` *15 min added*, spoken once) and by the screen's own *Job timing* and *Duration* rows, which change in the same frame. The window never grows silently (P5) and never by the expert's tap.
- A Timer is never the only place a deadline lives: the label names it, and the screen's helper text states it in words for the spoken guidance (*Accept in the next 30 seconds*).
- On the job alert the Timer sits **directly above the accept Button**, centred, L size; the Button is not wrapped by the ring (a ring around a 56 dp button is too thin to read at arm's length). The window is 30 s; `attention` at 15 s, `urgent` at 6 s.
- Reduced motion: the stroke updates in 1 s steps rather than animating; no pulse.
- At 130 % font scale the pill grows to fit `1:20:23` — width is content-driven, never fixed.
- Offline: the Timer keeps counting from the last known deadline and the Offline banner explains; it never freezes silently (P5).

---

## Content

- Label: one or two words in sentence case saying what the time is for: *Accept within*, *Arrive within*, *Login within*, *Time left*, *Working for*, *Login by*. ≤ 14 characters in the longest language.
- Digits are Latin numerals (P9). The `am`/`pm` in deadline mode is lower-case `BodyMd` `textSecondary`.
- Spoken: *Four minutes twenty-three seconds left to arrive* — the label and the value, never digits read individually.

---

## Accessibility

Live region announces at each tone change and at 10 s, 5 s (not every second). Contrast: digits at `textWarning` 4.6:1 at 32 sp SemiBold passes; at M (20 sp) still passes as large text. Digits `tabular-nums` so the pill never jitters.

---

## Token proposals

Sound names `soft-tick`, `urgent-tick`, `timeout` go to `foundations/sound.md` when it is written; tone thresholds (50 % / 20 %, 5 min / 60 s) are component-owned constants.

---

## Figma reconciliation

1. Merge the three Timer frames into one component. Properties: `Mode` (Countdown / Elapsed / Deadline), `Size` (L / M), `Tone` (Calm / Attention / Urgent / Expired) — Tone is shown for documentation, computed in code.
2. Digits format `m:ss` / `mm:ss` / `h:mm:ss`; no leading zero on the first group.
3. Label to sentence case, `BodyMd` (L) / `Caption` (M).
4. Deadline mode: `borderBrand` outline, no progress stroke, digits `textBrand`.
5. Bind stroke and digits to the semantic status tokens; track to `borderDefault`.

Result: 3 modes × 2 sizes × 4 tones (countdown/elapsed) + 2 (deadline) = **~18 variants**.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale only | ✅ Display / Heading3 / BodyMd / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ stroke length + colour + digits + sound |
| 5 | ⚙ Offline / expired handled | ✅ |
| 8 | ⚙ Reduced motion | ✅ stepped stroke, no pulse |
| 9 | Meaning without text | ✅ the draining ring is the meaning |
| 10 | Greyscale | ✅ stroke length carries urgency |
| 12 | Unique sounds per moment | ✅ soft-tick / urgent-tick / timeout |
| 15–16 | Copy / device review | ⬜ pending |
