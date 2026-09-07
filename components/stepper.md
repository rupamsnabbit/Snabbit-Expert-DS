# Stepper

Status: **Proposed** · Tier: Core · Package: `SnabbitStepper` · Figma: Step Indicatorss (`1075:8388`, rename), Onboarding Step Card (`1075:8182`)

A short list of things to do, in order, with one of them lit. Onboarding (register → ID proof → bank → training), going live, a first check-in. The Stepper's job is to make a multi-day process feel like a short list — and to point at exactly **one** next step (P2), because a new expert who sees four things to do at once does none of them.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| "Step Indicatorss" — two nodes, a line, no states | **`rail`** layout: 2–5 nodes with icon + label, four states, connectors that fill as steps complete | The indicator exists; it needs states and a label rule. |
| Onboarding Step Card — four loose cards (Step 1 current with Start, Completed, Step 2 grey, Step 2 pink) | **`list`** layout: one Stepper of step rows, each row in one of four states; only the current row carries a Button | One component, one order, one action. |
| Current step marked by pink border **and** pink eyebrow **and** a button | Current = brand ring on the node + `bgBrandSubtle` card wash + the Button. Eyebrow stays `textSecondary` | Enough channels without shouting; the Button is the "do this". |
| Completed shows a green check and the word "Completed" | Kept: `check-circle` fill `iconSuccess` + *Done* in `textSuccess`. Row stays tappable to review | Status colour as status — correct use (P6). |
| Grey future step with no reason | Upcoming: `textTertiary` with **a reason line** (*After ID proof*). Locked: same + `lock-simple` | A grey thing with no reason is a broken thing (P5). |
| Step icons custom | Phosphor from the register: `user-plus`, `identification-card`, `bank`, `graduation-cap`, `camera` | Icon rule. |

---

## Layouts

### `rail` — where am I

```
  (✓)━━━━━━━━(🪪)────────( 🏦 )────────( 🎓 )
 Register    ID proof     Bank      Training
```

Horizontal, non-interactive, at the top of a flow screen under the HeaderNav, or at the top of the onboarding Home card. 2–5 steps; more than five becomes a `list`. Nodes 32 dp (icon 18) with 2 dp connectors; connector before a done/current node is `bgBrand`, after is `borderDefault`. Labels **always** under the nodes, `Caption` Medium, ≤ 8 chars per language, wrap to two lines. Equal-width columns; the rail never scrolls horizontally.

### `list` — what do I do

```
 ┌────────────────────────────────────────────────┐
 │ (✓)  Done                                    › │  done · tappable to review
 │      Register                                  │
 ├────────────────────────────────────────────────┤
 │ (🪪) Step 2                                    │  current · bgBrandSubtle wash · brand ring
 │      ID proof                                  │
 │      [ Start ID proof              › ]         │  the one Button on the screen
 ├────────────────────────────────────────────────┤
 │ (🏦) Step 3 · After ID proof                   │  upcoming · reason line
 │      Bank account                              │
 └────────────────────────────────────────────────┘
```

Vertical; each step is a row 72 dp (88 with a description) inside one Card with `borderSubtle` dividers. Node 40 dp (icon 20) leading; eyebrow `Caption` (*Step 2*, *Done*, *Step 3 · After ID proof*); title `BodyLg` Medium; optional one-line description `BodyMd` `textSecondary`. The current row alone holds a `primary brand M` Button, full width, verb + step noun (*Start ID proof*, *Continue training*). At most one current row.

---

## States

| State | Node | Eyebrow | Title | Row | Tap |
| --- | --- | --- | --- | --- | --- |
| `done` | `check-circle` fill, `iconSuccess`, no ring | *Done*, `textSuccess` | `textPrimary` | `bgPrimary`, `caret-right` trailing | Opens the step read-only |
| `current` | step icon, `iconBrand`, 2 dp `borderBrand` ring, `bgBrandSubtle` disc | *Step n*, `textSecondary` | `textPrimary` | `bgBrandSubtle` wash | Row and Button both open the step |
| `upcoming` | step icon, `textTertiary`, `bgTertiary` disc | *Step n · {reason}*, `textTertiary` | `textSecondary` | `bgPrimary` | Toast: *Finish ID proof first* |
| `locked` | as upcoming + `lock-simple` badge at bottom-right of the node | *Step n · {reason}* | `textSecondary` | `bgPrimary` | Toast with the reason |
| `attention` | step icon, `iconWarning`, `borderWarning` ring | *Needs a fix*, `textWarning` | `textPrimary` | `bgWarning` wash | Opens the step at the problem |

`attention` is for a step she finished that came back (ID photo rejected). It is the only state besides `current` that may carry a Button (*Fix ID photo*), and when present it is the current action — the flow cannot move on. `upcoming` and `locked` look the same except the lock; the difference is whether time or her own action unlocks it.

In the `rail`, states show as node fill + ring + connector fill; labels do not change colour except `done` → `textSuccess`.

---

## Behaviour

- Steps complete in order. The Stepper is fed the state per step; it never infers.
- Completing a step: the node animates `current` → `done` over 300 ms (ring shrinks, check draws), the connector fills over 300 ms, the next row becomes `current` and its Button appears. The *success* sound and a `medium` haptic once. Then the screen scrolls so the new current row is fully visible.
- Reduced motion: states swap without animation; sound and haptic stay.
- A `list` with everything done collapses to a single `done` summary row (*All 4 steps done*) with the rail above; the flow's next screen takes over.
- Progress against a Stepper is spoken on entry: *"Step 2 of 4, ID proof"*.
- The rail is never a tab bar in disguise: it is not tappable. Wanting to jump to a step is the `list`.

---

## Content

- Step titles are nouns, ≤ 14 chars: *Register*, *ID proof*, *Bank account*, *Training*, *First job*.
- Eyebrow *Step n* uses digits (she reads them); never *Step two*.
- Reason lines are short and true: *After ID proof*, *Opens Monday*, *Trainer will call*. Never *Coming soon*.
- Button label: verb + step noun. *Start*, *Continue*, *Fix*.
- Descriptions, when present, say what she needs in hand: *Aadhaar card and a clear photo*.

---

## Accessibility

Role list; each step announces *"Step 2 of 4, ID proof, current"* / *"Register, done"* / *"Bank account, after ID proof, not yet"*. Rail nodes are decorative to the reader; the rail announces once as a summary. Row targets ≥ 72 dp; nodes are not separate targets. Contrast: `textTertiary` eyebrow on `bgPrimary` 2.8:1 — acceptable for an upcoming step because the title (`textSecondary`, 4.8:1) carries the meaning; the reason is repeated in the Toast.

---

## Token proposals

None. Node ring `borderWidth.2`; row height from the ListItem scale.

---

## Figma reconciliation

1. "Step Indicatorss" → **Stepper / Rail**: `Steps` (2–5), per-step `State` (Done / Current / Upcoming / Locked / Attention). Icons as Phosphor instances; labels always on.
2. Onboarding Step Card → **Stepper / List / Row**: `State` (same five), booleans `Description`, `Button`. Remove the pink border variant; current = ring + wash. Compose four rows into a **Stepper / List** example.
3. Bind node fills to `bgBrandSubtle` / `bgTertiary` / `iconSuccess`, rings to `borderBrand` / `borderWarning`.

Result: **~14 variants** replacing 3 + 4 frames, and one component where there were two unrelated ones.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ rows ≥ 72; rail non-interactive |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Caption / BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ node icon + ring + eyebrow word |
| 5 | ⚙ One next action | ✅ only the current (or attention) row has a Button |
| 6 | ⚙ Tap guard | ✅ via Button |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ check / ring / lock; icons from register |
| 10 | Greyscale | ✅ check and lock survive |
| 12 | Sound / haptic | ✅ success on completion |
| 14 | Status colours | ✅ green = done, amber = needs fix; both are statuses |
| 15–16 | Review | ⬜ pending |
