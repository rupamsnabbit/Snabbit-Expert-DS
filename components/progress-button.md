# ProgressButton

Status: **Proposed** · Tier: Core · Package: `SnabbitProgressButton` (new; a `Button` with a fill) · Figma: Progress Buttons (`1491:13660`, 10 variants — five green *Accept Job*, five pink *Check In*, a darker segment growing from none → small → half → full → full-dark). Reinstated 2026-09-10 (`DECISIONS.md`); earlier folded into Button hold behaviour.

A **Button whose fill moves on its own** to show time or progress the system controls — *how long she still has to accept*, *how far along the check-in is*. The shipped screens draw it as a darker band growing across the Accept and Check In buttons; the system keeps that idea and gives it two exact meanings, one direction, and a rule about when the label can be trusted.

It is not the hold Button. The hold Button's fill is **her finger**: it sweeps while she presses and cancels when she lets go (`button.md` § hold). The ProgressButton's fill is **the clock or the server**: it moves whether or not she touches the screen. Same Button anatomy, opposite author of the motion — which is why they are two components, so a fill never means two things.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Ten loose variants; the dark segment grows **from the right**; last variant fully dark | Two modes with one meaning each: **`countdown`** (a window is closing) and **`progress`** (work is happening). The moving band **always starts at the left** and covers what is *used* or *done*; the last state is a normal Button (`countdown` → `disabled` with a reason; `progress` → `loading` label → outcome) | Left-to-right is the direction of the hold sweep, the ProgressBar and the Stepper (P7: one direction for "done"). A fully dark button with the same label is unreadable as a state: is it done, or over? The end state must say. |
| Green *Accept Job* | `brand` tone; there is no `success` Button tone | Status colours are for status (P6, `button.md`); *Accept job* is the forward action, not a result. Green is the Timer's `calm` tone, and the Timer beside it already carries it. |
| No label change across the five steps | The label stays; an optional **trailing count** in tabular numerals says the number: *Accept job · 0:42*, *Checking in · 2 of 3* | She should not have to read a fill to know the number (checklist row 4: every state by ≥ 2 channels). |
| Where it goes is not drawn | `countdown` only where the **Timer is not on the screen** (a job row in a list, the Home card); `progress` only for **multi-step work the Button itself started** | On the job alert the Timer pill ring above the Button is the countdown (`job-alert.md`); a second countdown in the Button would be two clocks. |
| Colour for the band not specified | `interactivePressed` over `interactiveDefault` for `primary`; `bgBrandSubtle` over `bgPrimary` for `secondary` | The pressed shade is already "the same button, more" — no new token. |

---

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│████████████████████                                    │   band: interactivePressed · same radius · clipped to the container · grows left → right
│          Accept job                        0:42        │   label centred, textInverse, unchanged · trailing count Caption SemiBold tabular
└────────────────────────────────────────────────────────┘
```

Parts: **container** (a Button `primary` or `secondary`, `L` or `M`, `brand` tone only), **band** (the moving fill, behind the label), **label** (never moves, never fades), **count** (optional, trailing, 12 dp from the edge), **focus ring** (inherited).

| Variant | Container | Band | Label / count |
| --- | --- | --- | --- |
| `primary` | `interactiveDefault` | `interactivePressed` | `textInverse` |
| `secondary` (`L` only) | `bgPrimary`, `borderBrand` 1.5 dp | `bgBrandSubtle` | `textBrand` label · `textBody` count |

Sizes: `L` (56 dp, the one next action) and `M` (48 dp, inside a Card or a list row). No `S`, no icon-only — a band on a small control is noise.

---

## Modes

| Mode | The band means | Starts | Ends | Count | Example |
| --- | --- | --- | --- | --- | --- |
| `countdown` | Time **used** of a window the server set | Empty when the window opens | Full at 0; the Button becomes `disabled` with the reason under it (*Time's up · The job went to another expert*) and, after `timeout.expiredClose`, the row updates | `m:ss` left, the Timer's own format | *Accept job · 0:42* on a job row in the Jobs list, where there is no Timer pill; *Check in · 4:10* on the Home card when the check-in window is open |
| `progress` | Work **done** of a job the Button started | Empty on tap; the label changes to the present participle (*Checking in…*) | Full → `motion.standard` hold → the outcome replaces the Button (a Tag, the next screen) or the Button returns with the failure under it | *2 of 3* steps, or nothing when steps are not meaningful | *Checking in · 2 of 3* (location, photo, server) · *Sending · 3 of 5* when the offline queue flushes from the Button she tapped |

In `countdown` the Button is **tappable the whole time** — tapping accepts; the band is only information. In `progress` the Button is **not tappable** (it is the `loading` state with a band instead of a spinner) and blocks the duplicate tap (P5).

Tone is not computed here: the band is always the pressed shade. Urgency belongs to the Timer; when a window is under 20 %, the **count** turns `textWarning` on `secondary` (on `primary` it stays `textInverse` and the Nudge / Timer beside it carries the urgency).

---

## Behaviour

- **Band motion** is continuous for `countdown` (`easing.linear`, updated every second, jumps at most 1/60 of the width) and stepped for `progress` (each step animates `motion.standard`, `easing.move`). The band never moves backwards; if a `progress` step fails, the band stops and the reason appears under the Button (`patterns/error-recovery.md`).
- **The label never changes during `countdown`** and changes exactly once at the start of `progress` (to the participle) — a moving fill under changing words is two things to read.
- **Voice**: nothing on the band itself. `countdown` inherits the Timer's spoken thresholds only if no Timer is on the screen (*"One minute left to accept"*); `progress` speaks the outcome, not the steps.
- **Haptic**: none for the band. Tap and outcome haptics are the Button's own.
- **Offline**: `countdown` keeps counting (device clock); if the action needs the network at tap time (accept), the Button is `disabled` with *Waiting for network…* under it and the band keeps moving, so she sees the window closing and why she cannot act (`patterns/offline.md`). `progress` that is queued shows the band at the last completed step with *Will send when online* under it.
- **Reduced motion**: the band updates in steps of 10 % with no tweening; the count carries the number.

---

## Placement

| Where | Mode | Why here |
| --- | --- | --- |
| Job row in the Jobs list (`ListItem` with an `M` action) | `countdown` | Several jobs, no room for a Timer pill each |
| Home card *Check in* when the window has opened | `countdown` | The card already has the time text; the band says how much of the window is left at a glance |
| Check-in screen, after the tap | `progress` | Three steps she cannot see otherwise |
| Offline queue, from the Button she tapped | `progress` | The confirmation should be where she acted |
| **Not** the job alert | — | The Timer L pill ring is the countdown there; the Button is a plain `primary` (`job-alert.md`) |
| **Not** any `danger` action | — | Danger is hold (`button.md`); a self-moving fill on *Decline* would look like the hold completing on its own |

At most **one ProgressButton per screen**, and never in the same view as a Timer of the same window.

---

## Accessibility

- Role: button. `countdown` announces *"Accept job, button, 42 seconds left"* and re-announces at the Timer thresholds (1 min, 30 s, 10 s) as a polite live region; `progress` announces *"Checking in, step 2 of 3"* per step and the outcome.
- The band is decorative to the screen reader; the count is the accessible number.
- Contrast (measured): label `textInverse` on `interactiveDefault` **4.0:1** and on `interactivePressed` **5.7:1** — the label passes AA over the band and only as large text over the unfilled part, the same margin as the plain primary Button (`foundations/accessibility.md`; the `ButtonLg` 18/24 decision applies here too). `secondary`: `textBrand` on `bgBrandSubtle` **3.6:1** — passes only as large text, so `secondary` is `L` only and the count on `secondary` uses `textBody` (10.3:1), not `textBrand`.
- Hit target: the whole container, ≥ 48 dp.
- Greyscale: the band is darker, so it survives; the count carries the number regardless.
- Font scale 1.3: label wraps to two lines and the Button grows, per `button.md`; the count drops to its own line under the label at `M` if the width is short.

---

## Motion

| Moment | Duration | Easing |
| --- | --- | --- |
| `countdown` band | continuous, 1 s ticks | `linear` |
| `progress` step | `motion.standard` | `move` |
| Window closes → `disabled` | `motion.standard` | `exit` |
| Outcome replaces the Button | `motion.standard` | `enter` |

---

## Do / Don't

**Do** — one per screen · band from the left · label still · count in tabular numerals · `disabled` with a reason at the end of a countdown · `progress` only for work the Button started.

**Don't** — a green button · a band growing from the right · a full-dark end state with the same label · a ProgressButton beside a Timer of the same window · a band on *Decline* or any hold action · a moving band under a label that also changes · a spinner *and* a band.

---

## Figma reconciliation

1. Progress Buttons (`1491:13660`) → **ProgressButton**: `Mode` (Countdown / Progress), `Variant` (Primary / Secondary), `Size` (L / M), `Fill` (0 / 25 / 50 / 75 / 100), `Count` (boolean). Band is a left-anchored rectangle clipped by the container, fill bound to `interactivePressed` / `bgBrandSubtle`.
2. Recolour the green *Accept Job* set to `interactiveDefault`; the label stays `textInverse`.
3. Replace the full-dark variant with the two end states: *Countdown 100* = Button `disabled` + reason text; *Progress 100* = Button with the outcome Tag.
4. `button.md` § Figma reconciliation item 6 ("Progress Buttons out of the Components page") is superseded: they stay, as this component.

---

## Acceptance checklist

| # | Row | Result |
| --- | --- | --- |
| 1 | Named component, Tier stated | ✅ Core · `SnabbitProgressButton` |
| 2 | Tokens only | ✅ `interactiveDefault/Pressed`, `bgPrimary`, `bgBrandSubtle`, `borderBrand`, `textInverse/Brand/Warning`, `ButtonLg/Md`, `motion.*`, `timeout.expiredClose` |
| 3 | Outfit only; four scripts at 1.3 | ✅ label rules from `button.md`; count tabular |
| 4 | Every state by ≥ 2 of colour / icon / shape / motion | ✅ band (colour + motion) + count (text); end states: disabled + reason / outcome |
| 5 | Phosphor only, registered | ✅ no icons of its own |
| 6 | Copy: verbs, sentence case | ✅ *Accept job*, *Check in*, *Checking in…* |
| 7 | Spoken where it matters | ✅ thresholds when no Timer; outcome |
| 8 | Reduced motion, ≤ 300 ms | ✅ stepped band; `motion.standard` steps |
| 9 | Hit targets ≥ 48 | ✅ |
| 10 | Contrast measured | ✅ 4.0 / 5.7 / 3.6 measured; `secondary` L only; `ButtonLg` decision noted |
| 11 | Costly actions protected | ✅ never on danger; `progress` blocks duplicate taps |
| 12 | Offline and slow states | ✅ counts on; disabled with reason; queued band |
| 13 | One per screen | ✅ |
| 14 | Figma reconciliation listed | ✅ |
| 15 | Copy heard aloud in four languages | ⏳ pending |
| 16 | Device review with experts | ⏳ pending |
