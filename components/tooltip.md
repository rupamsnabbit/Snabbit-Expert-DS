# Tooltip

Status: **Proposed** · Tier: Core · Package: `SnabbitTooltip` (new) · Figma: Tooltips (`537:4918`, 6 variants — *This includes all bonuses*), Colored Tooltip (`1491:17618`, 2 variants — *Job extended by 15 min* · *15 mins remaining*). Reinstated 2026-09-10 (`DECISIONS.md`); earlier folded into Coachmark.

A **small bubble with an arrow that says one short thing about the exact spot it points at**, and then leaves. It is the smallest guidance surface in the system: shorter than a Coachmark (no scrim, no voice, no lesson), quieter than a Toast (it does not float over the screen — it is pinned to a thing), and never a place for choices (that is a Popover) or for prose (that is an `info` BottomSheet).

Two kinds, both shipped in some form. **`label`** — the dark bubble — names an icon-only control when she long-presses it, or names a value the first time it appears. **`status`** — the tinted bubble — announces a change to the thing it points at, for a few seconds: the Timer gained fifteen minutes, the Timer is down to fifteen. It says what changed, at the thing that changed, and it goes away by itself.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Tooltips: dark bubble, `Caption`, **six arrow positions** (top-left, top-centre, top-right, left, right, bottom) | Kind **`label`**: `bgInverse` bubble, `BodyMd` `textInverse`, **arrow above or below only**, sliding along the edge to the anchor's centre | Left/right arrows collide with the edges of a 360 dp screen and a bubble that lands beside a control covers its neighbour. Two shapes to recognise, not six (P7). `Caption` at 12 sp is under the 14 sp floor for anything she must read (`foundations/type.md`). |
| *This includes all bonuses* — a fact about an amount, no trigger drawn | **Not a Tooltip.** An explanation of a value is a row in the `info` BottomSheet or a `speaker-high` beside the label (`coachmark.md`) | A bubble that must be summoned by a small `(i)` fails P3 and the low-literacy research; a fact she needs should be on the screen or spoken. The dark bubble keeps one job — naming a thing on long-press. |
| Colored Tooltip: green *Job extended by 15 min* with a clock, red *15 mins remaining* with a warning, arrow on top, full-width | Kind **`status`**: `bgSuccess` / `bgWarning` / `bgError` bubble, `text*Strong` (proposed 0.20) text, tone icon, anchored to the **Timer** or the value it is about; **wraps to its content**, max 328 dp; appears on its own, leaves after `timeout.toast` | The shipped meaning is right — a change to the anchored thing, in its status colour (P6: colour is status). Full width made it read as a Banner; a bubble that wraps its content reads as *about this*. Red with a warning glyph for *15 min left* contradicts the Timer's own tone at that point (`attention` = yellow), so the colour is **computed from the Timer's tone**, never picked. |
| No behaviour drawn: how it appears, how it leaves | `label`: long-press in, release out. `status`: enter `motion.standard` when the change happens; leaves after `timeout.toast` or on the next change; **spoken once** | Guidance without a trigger becomes a permanent decoration. |
| Coachmark spec (2026-09-08) folded Tooltips into Coachmark and deleted Colored Tooltip | Both **reinstated as a separate component**; the Coachmark keeps first-use lessons, the Tooltip keeps names and change announcements | The shipped screens use the tinted bubble on the Timer and there is no other component for *this thing just changed*; a Coachmark (scrim, voice, one way out) is far too heavy for it. Decision recorded in `DECISIONS.md`. |

---

## Anatomy

```
                 ▲                              arrow 12 × 6 dp · same fill as the bubble · centred on the anchor, clamped ≥ 16 dp from the bubble's ends
┌────────────────────────────────────┐
│ (◔)  Job extended by 15 min        │          bubble · radius.md · padding 8 dp 12 dp · min height 36 dp · max width 328 dp
└────────────────────────────────────┘          icon 20 dp (status only) · text BodyMd, one line, wraps to two at most
```

| Part | `label` | `status` |
| --- | --- | --- |
| Bubble | `bgInverse` · `radius.md` · no border · `elevation.flat` | `bgSuccess` / `bgWarning` / `bgError` · `radius.md` · 1 dp `borderSuccess` / `borderWarning` / `borderError` · `elevation.flat` |
| Text | `BodyMd` Medium `textInverse` · ≤ 24 chars · one line | `BodyMd` Medium `textSuccessStrong` / `textWarningStrong` / `textErrorStrong` (0.20; until then `textSuccess` etc. with the contrast note below) · ≤ 40 chars · ≤ 2 lines |
| Icon | none | 20 dp, tone colour: `clock-clockwise` (time added) · `warning-circle` (attention) · `x-circle` (error) · `check-circle` (done) |
| Arrow | 12 × 6 dp, bubble fill, above or below | same |
| Gap to anchor | 8 dp | 8 dp |

Placement is **below the anchor by default**, above when there is no room below (bottom action bar, tab bar). The arrow slides horizontally to the anchor's centre; the bubble itself stays ≥ 16 dp from the screen edges. It never covers the anchor and never covers the SOS control or the primary Button.

---

## Kinds and triggers

| Kind | Appears when | Leaves when | Says | Example |
| --- | --- | --- | --- | --- |
| `label` | She **long-presses** an icon-only control (IconButton, tab, HeaderAction) — after `timeout.tapGuard` (300 ms) so a slow tap does not show it | Finger lifts (+ `motion.fast` fade) | The control's name — the same string the screen reader gets | Long-press the bell → *Notifications*; the shutter → *Take photo*; the recentre button → *Recentre* |
| `status` | The **anchored value changes because of something outside her tap**: the customer extended the job, the Timer crossed a tone threshold, a queued item finally sent | After `timeout.toast` (3 s), or on the next change, or when she taps it | What changed, in numbers: *Job extended by 15 min* · *15 min left* · *Check-in sent* | The Timer on the job screen; the earnings row that just went from *Pending* to *Paid* |

Rules that keep it small:

- **Never on tap.** A tap does something; a Tooltip is never the *result* of a tap. There is no `(i)` that opens one — an `(i)` does not exist in this app.
- **Never a lesson.** *Turn this on when you are ready for jobs* is a Coachmark (first use, voice, one way out). A Tooltip has no button, no speaker control, no counter.
- **Never a choice.** Anything with two actions in it is a Popover or a BottomSheet.
- **Never about the past screen.** A `status` Tooltip is about the value it is pinned to, on this screen; a change that happened elsewhere is a Toast or a Banner.
- **One at a time.** A new one replaces the old with no overlap.
- **`status` colour is computed**, not set: it takes the anchored Timer's tone (`calm` → success, `attention` → warning, `urgent` → error) or the outcome (sent → success; failed → error). A designer never picks a colour for a Tooltip.

---

## Copy

- `label`: the noun the screen reader says, ≤ 24 chars — *Notifications*, *Take photo*, *Earnings*. Sentence case, no full stop.
- `status`: what changed, with the number first when there is one — *15 min added* · *15 min left* · *Check-in sent* · *₹75 added*. ≤ 40 chars in English so Kannada fits in two lines at ×1.35 (`foundations/type.md`). Never *Hurry*, never an exclamation mark, never a question.
- Spoken: `status` is spoken once when it appears (*"Fifteen minutes added"*); `label` is not spoken — the screen reader already announces the name on focus. Nothing repeats.

---

## Where it is not

The shipped *This includes all bonuses* bubble on the earnings hero is the case to learn from: the fact is true and useful, and a bubble is the wrong home for it, because she would have to know a hidden gesture to find it. The rule is that a fact she needs to understand a number is **on the screen** (an Accordion row *Includes bonuses · ₹120*) **or spoken** (`speaker-high` beside the amount) — never behind a tooltip. Tooltips also do not appear on: text (nothing to name), disabled Buttons (the reason is written under the Button, `button.md`), onboarding (Coachmarks own that), or as a permanent pointer ("tap here") — that is a Coachmark once, and then nothing.

---

## Placement in the system

| Surface | Job | Trigger | Has actions | Blocks | Voice |
| --- | --- | --- | --- | --- | --- |
| **Tooltip** | Name a control; say what just changed at the thing | Long-press · a change | No | No | `status` once |
| Coachmark | Teach one control on first use | First use | *Got it* / *Do it* | Yes (scrim) | Yes |
| Popover | Two or three actions about the thing tapped | Tap | Yes | No (tap outside closes) | No |
| Toast | Confirm something she did | Her action | Optional one | No | Optional |
| Banner | A condition on this screen | State | Optional one | No | Once |
| Nudge | Condition → consequence, attached to a control | Condition open | No | No | No |

---

## Accessibility

- `label` text is the control's `contentDescription`; long-press to reveal it is the platform convention, so screen-reader users lose nothing (they hear it on focus).
- `status` is a **polite live region**: announced once, not stealing focus. Hit target is the bubble itself (≥ 36 dp tall; tap dismisses).
- Contrast (measured): `textInverse` on `bgInverse` **17.7:1**. `status` text at the 600 step on the tinted fills fails AA at 14 sp — `textSuccess` on `bgSuccess` 3.6:1, `textWarning` on `bgWarning` 3.1:1, `textError` on `bgError` 4.4:1 (`foundations/accessibility.md`) — so this component **requires** `textSuccessStrong` / `textWarningStrong` / `textErrorStrong` (700 step: 5.2 / 4.8 / 5.9:1) from token release 0.20.0; until then the live page shows the 700 values with the token proposal named.
- Font scale 1.3: the bubble grows to two lines, never truncates; max width stays 328 dp.
- Reduced motion: fade only; `status` still leaves after `timeout.toast`.
- Greyscale: `status` keeps its icon, so the tone survives without colour (checklist row 4).

---

## Motion

| Moment | Duration | Easing |
| --- | --- | --- |
| `label` appear (after long-press guard) | `motion.fast` | `enter` |
| `label` leave on release | `motion.fast` | `exit` |
| `status` appear | `motion.standard` | `enter` · 4 dp rise from the anchor |
| `status` leave | `motion.standard` | `exit` |
| Replace | old leaves and new enters together, `motion.standard` | — |

---

## Do / Don't

**Do** — long-press names for every icon-only control · one `status` Tooltip per change, on the value that changed · let the Timer's tone choose the colour · numbers first.

**Don't** — an `(i)` that opens a bubble · a tooltip that stays until dismissed · a left or right arrow · a lesson or a link inside it · two bubbles at once · a tooltip on a disabled button · a red bubble for a yellow Timer.

---

## Token proposals

`textSuccessStrong`, `textWarningStrong`, `textErrorStrong`, `textInfoStrong` — already proposed for 0.20.0 in `foundations/accessibility.md` § Open; this component is a second consumer.

---

## Figma reconciliation

1. Tooltips (`537:4918`) → **Tooltip / Label**: `Arrow` (Above / Below), `Offset` (Start / Centre / End). Text style `BodyMd` Medium, fill `bgInverse`. Delete the Left and Right arrow variants (4 of 6).
2. Colored Tooltip (`1491:17618`) → **Tooltip / Status**: `Tone` (Success / Warning / Error), `Arrow` (Above / Below). Width **hug**, max 328; text `BodyMd` Medium bound to `text*Strong`; icon 20 dp bound to the tone. The red *15 mins remaining* instance becomes Warning (the Timer's `attention` tone at 15 min).
3. Detach *This includes all bonuses* from the earnings mock; replace with an Accordion row or a `speaker-high` per `coachmark.md`.
4. `coachmark.md` § Figma reconciliation items 1–2 are superseded by this list: Tooltips are **not** renamed to Coachmark; the Coachmark is its own new component.

---

## Acceptance checklist

| # | Row | Result |
| --- | --- | --- |
| 1 | Named component, Tier stated | ✅ Core · `SnabbitTooltip` |
| 2 | Tokens only | ✅ `bgInverse`, `bgSuccess/Warning/Error`, `border*`, `text*Strong` (proposed), `radius.md`, `spacing`, `motion.*`, `timeout.*` |
| 3 | Outfit only; four scripts at 1.3 | ✅ `BodyMd`; wraps to two lines; max width 328 |
| 4 | Every state by ≥ 2 of colour / icon / shape / motion | ✅ `status` tone: colour + icon; `label` vs `status`: colour + shape (border) |
| 5 | Phosphor only, registered | ✅ `clock-clockwise` (new), `warning-circle`, `x-circle`, `check-circle` |
| 6 | Copy: verbs for actions, sentence case, ≤ budget | ✅ no actions; ≤ 24 / 40 chars |
| 7 | Spoken where it matters | ✅ `status` once; `label` via screen reader |
| 8 | Reduced motion, ≤ 300 ms | ✅ `motion.fast` / `motion.standard`; fade only |
| 9 | Hit targets ≥ 48 | ✅ anchor is the target; bubble ≥ 36 tall for dismiss (not the only way out) |
| 10 | Contrast measured | ✅ 17.7:1 label; `status` 600 step fails (3.6 / 3.1 / 4.4), 700 step passes (5.2 / 4.8 / 5.9) — needs 0.20 `text*Strong` |
| 11 | Costly actions protected | ✅ n/a — no actions |
| 12 | Offline and slow states | ✅ *Check-in sent* is the offline queue's confirmation |
| 13 | One per screen / rarity rule | ✅ one at a time; `status` only on change |
| 14 | Figma reconciliation listed | ✅ |
| 15 | Copy heard aloud in four languages | ⏳ pending |
| 16 | Device review with experts | ⏳ pending |
