# Brief — QuantityStepper (Tier 3, withdrawn from core 2026-09-22)

> **Not in the app.** Invented 2026-09-15/18 for `projects/beauty-shift-lifecycle` from Mobbin references (sweetgreen, Thrive Market), not from any Snabbit screen. Withdrawn from `components/` after tech feedback: reuse what ships. Kept here as a Tier 3 brief per `principles/EXTENDING.md` — it may return to core only by the rule of three, and only after naming the shipped component it tried. The original spec follows unchanged.

---

# QuantityStepper

Status: **Proposed** · **Build request** — not in the app (2026-09-22 read: no stepper on any shipped screen) · Tier: Core · Package: `SnabbitQuantityStepper` · Figma: no component

> **Reuse checked, none found.** The job-cycle PRD § 6 requires a +/− per product line. The app has no increment control; NumericKeypad is money, Stepper is a process. This is a genuine build, and it stays a proposal until an engineer says the sprint is worth it.

Adjusts a count that already has a right answer. `−  6  +` with the expected value remembered underneath, so the
control is never asking *"how many?"* from nothing — it is asking *"was it the usual, or not?"*

This is the only control in the system that **increments a number**. `Stepper` is a *process* (step 2 of 4).
`NumericKeypad` is the money surface — a keypad for one digit from a known small range is four taps where one will
do. `ListItem`'s `quantity` trailing **displays** a count (*used 6 of 8*) and cannot edit it. QuantityStepper fills
that hole.

Asked for by `projects/beauty-job-cycle` (PRD § 6, *Edit quantities*): *"Expert adjusts a product's quantity up or
down with a +/- stepper. A changed line is marked against the usual amount (e.g. '+1 pcs vs usual 1')."*

---

## What ships

No Figma component exists, so nothing is being changed — this is new. The decisions that matter:

| Decision | Why |
| --- | --- |
| **The expected value is part of the control, not context around it** | The whole meaning is the distance from usual. A bare number makes her remember what normal was; this states it. |
| **A changed line changes shape, not hue** | `ListItem` already rules that a quantity is *never coloured*. More is not good and less is not bad — both are just *different* (P6). Change is signalled by border weight and the delta line appearing, which is two channels without colour (P1). |
| **No long-press repeat** | The counts here are single digits. Repeat-on-hold exists for ranges of hundreds; here it only produces overshoot she has to correct. |
| **`−` stops at 0, `+` stops at max** | Disabled with the reason spoken, never a silent no-op (P3). Zero is a legitimate answer — *"product ran out"* is one of the reasons. |
| **Tabular numerals** | The value must not jitter between 9 and 10 while she taps. |

---

## Anatomy

```
┌──────────────────────────────────────────────────┐
│ Cotton pads                    ⊖    6    ⊕       │   row 56 dp
│ +2 pcs vs usual 4                                │   delta line, appears only when changed
└──────────────────────────────────────────────────┘
```

| Part | Spec |
| --- | --- |
| Decrement / increment | 44 × 44 dp inside a 48 dp hit area, `radius.full`, `bgSecondary` fill, `textPrimary` glyph. Phosphor `minus` / `plus`, `bold`, 20 dp |
| Value | `BodyLg` 16 sp SemiBold, `textPrimary`, tabular, min-width 40 dp so the row does not reflow |
| Delta line | `BodyMd` 14 sp Regular, `textSecondary`. Format: `+2 pcs vs usual 4` / `−1 pcs vs usual 4`. **Absent entirely at the usual value** |
| Group | 8 dp between each part; the group hugs right in a `ListItem` |

## Sizes

| Size | Row | Button | Value | Use |
| --- | --- | --- | --- | --- |
| `M` | 56 dp | 44 | `BodyLg` | default — inside a list row |
| `S` | 48 dp | 40 | `BodyMd` | dense sheets; needs a 48 dp parent hit area |

## States

| State | Row | Buttons | Delta line |
| --- | --- | --- | --- |
| at usual | no border change | both enabled | hidden |
| changed | left edge 2 dp `borderBrand`; label `textPrimary` SemiBold | both enabled | shown |
| at zero | as its at-usual/changed state | `−` disabled `textDisabled` | shown (`−4 pcs vs usual 4`) |
| at max | as above | `+` disabled | shown |
| disabled | `bgTertiary`, `textTertiary` | both disabled | hidden |
| pressed | — | `bgTertiary` fill, 100 ms | — |

**Max** is supplied by the caller. Where a live stock count exists, max is that count — she cannot report using
more than she carries. Where it does not, max is `usual × 3`, which is generous and still stops a stuck finger.

## Content

The delta uses the noun the caller supplies (`pcs`, `ml`, `g`) and the word **usual** — not *expected*, *standard*
or *par*, which are all system words. Never *qty*. See `foundations/content.md`.

## Behaviour

Each tap commits immediately — there is no separate save inside the control. `timeout.tapGuard` between taps blocks
a double-fire. Changing a value back to the usual removes the delta line and the border, so the row visibly returns
to *untouched*; she can always undo by tapping back.

Offline: fully functional, the value queues with everything else.

## Accessibility

Hit area ≥ 48 × 48 dp on both buttons, 8 dp apart, so a mis-tap is not a wrong number. Screen reader announces the
control as *"Cotton pads, 6 pieces, usual 4"*, and each tap announces the new value and the new delta. The buttons
are labelled *"one more"* / *"one fewer"*, never *"plus"* / *"minus"* — the glyph is not the meaning. Disabled
buttons keep their reason available (*"already at zero"*). Value respects font scaling to 130 %; beyond that the
delta line wraps below and the row grows, never clips. Reduced motion: the value cross-fades, no roll or count
animation.

## Sound

None. The taps are frequent and a tick on each would be noise (`foundations/motion.md`). `light` haptic per tap;
`error` haptic when a disabled edge is hit, which is how she learns the limit without reading.

## Do / don't

- **Do** put it in a `ListItem` with the product's name and image. It is a trailing control, not a screen.
- **Do** keep the whole list at usual by default, so the only rows she touches are the ones that differ.
- **Don't** colour the delta green or red. It is not a gain or a loss.
- **Don't** use it for money — that is `NumericKeypad` and `Amount`.
- **Don't** use it where there is no expected value; without *usual* this is just a spinner, and a spinner asking an
  open question belongs in a `TextField` with a number pad.

## Figma reconciliation

No component exists. Create **QuantityStepper** in *Expert App — Design System 2.O* Components page `1:3886`, with
variants for size (M, S) and state (at-usual, changed, at-zero, at-max, disabled). Nothing to deprecate. The
closest existing thing is the `+/−` pair drawn ad hoc inside `Component 21` on the Job Lifecycle board
(`19:18372`) — unnamed, and Tier 0 by `EXTENDING.md`; it is replaced by this.

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ 44 dp button in a 48 dp hit area, 8 dp apart |
| 2 | ⚙ Semantic tokens only | ✅ no new tokens |
| 3 | ⚙ Type scale | ✅ `BodyLg` value, `BodyMd` delta |
| 4 | ⚙ States by ≥ 2 channels | ✅ changed = border weight + the delta line, no hue |
| 5 | ⚙ Loading / empty / error / offline | ✅ works offline; no expected value → the control is not used |
| 6 | ⚙ Duplicate taps blocked | ✅ `timeout.tapGuard` |
| 7 | ⚙ Text wraps, four languages | ✅ delta wraps below the row; *usual* is the only word |
| 8 | ⚙ Reduced motion, ≤ 300 ms | ✅ cross-fade only |
| 9 | Meaning without text | ✅ `minus` / `plus` glyphs plus the number |
| 10 | Greyscale | ✅ nothing here is carried by colour |
| 11 | Costly protected, desired one tap | ✅ leaving everything at usual costs zero taps |
| 12 | Sound / voice | ✅ no sound; `light` haptic, `error` haptic at the edges |
| 13 | Error copy | ✅ no error state; a limit is announced, not an error |
| 14 | Tier colours | ✅ none used |
| 15 | Copy reviewed aloud | ⬜ pending four-language review of *usual* and the unit nouns |
| 16 | Baseline device | ⬜ pending |
