# Skeleton · Spinner

Status: **Proposed** · Tier: Core · Package: `SnabbitSkeleton`, `SnabbitSpinner` (spinner exists inside Button) · Figma: no Skeleton component. Shipped: the *Loading States* section of *Job Lifecycle* (`98:36313`) — loading is the primary Button with a spinner and a lightened fill (*Check In*, *Accept Job*, *Start Job*); a *Retrying…* full-screen spinner in the ERRORS section.

Loading is one of P5's five mandatory states, and P8 says it must be visible and cheap. Two components cover it: a **Skeleton** that holds the shape of what is coming (lists, cards, amounts), and a **Spinner** that lives only inside a Button or a 48 dp row and never fills a screen. Both are short by rule: a Skeleton that is still there after three seconds is not loading, it is failing, and the screen must say so.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| No Skeleton; screens appear when data arrives | **Skeleton** presets for every list and card screen: the layout appears at once with grey shapes where content will be | P8: a blank screen on a ₹10k phone reads as broken; the shape tells her the app heard her. |
| Button spinner with lightened pink fill | Kept as **Spinner inside Button** (already in `button.md`): spinner replaces the label, fill goes to `interactiveHover`, taps ignored, ≥ 400 ms | Correct as shipped. |
| *Retrying…* full-screen spinner | **Deleted.** A screen never spins: it shows a Skeleton (≤ 3 s), then EmptyState `error` / `offline` / `waiting` | Indefinite spinners hide failure; P5 wants the state named. |
| Nothing for a row that is refreshing (payout status, attendance) | **Spinner `inline`**: 20 dp at the trailing edge of a ListItem / Accordion row, with the row's text still readable | Refresh one thing without blanking the screen. |

---

## Skeleton

### Anatomy

Grey shapes on the real layout, in the real positions, with the real sizes — the skeleton *is* the screen's layout with the content removed. Fill `bgTertiary`; a shimmer band (`bgSecondary` → `bgPrimary` → `bgSecondary`, 1.2 s, left to right) crosses all shapes in sync. Radii follow the content they stand for: `radius.sm` for text lines, `radius.full` for avatars and pictograms, the container's own radius for cards.

| Shape | Size rule | Stands for |
| --- | --- | --- |
| `line` | height = the text's line height × 0.6, width 40–90 % of the column, last line shorter | Any text |
| `amount` | height = the Amount size's cap height, width 4–6 digits | Amount |
| `circle` | the Avatar / pictogram size | Avatar, coin, pictogram |
| `block` | the media or Button box | Image, map, Button |
| `row` | 56 / 64 / 72 dp with `circle` + two `line`s | ListItem |
| `card` | the Card padding with `line`s and a `block` | Card |

### Presets

Every screen with a list or card has one named preset, drawn once, reused everywhere: **JobCard** (title line, two meta lines, Amount, Button block), **ListRows** (n × `row`), **EarningsHead** (Amount L + two lines + segmented block), **Breakdown** (title + Amount + four short rows), **Home** (JobCard + two `card`s). Presets never include the header, tab bar, SOS or Banners — those render real, immediately.

### Timing — the three-second rule

| Time | What she sees |
| --- | --- |
| 0 ms | Skeleton, at once — no delay, no fade-in. The header and tab bar are real |
| ≤ 300 ms | Content arrives → Skeleton swaps to content in one frame (no cross-fade); nothing to notice |
| 300 ms – 3 s | Shimmer runs; nothing else changes |
| **3 s** | Skeleton is replaced by EmptyState: `offline` if no connection, otherwise `error` with *Try again*; or `waiting` when the server said so |
| Never | A Skeleton older than 3 s. A spinner over a Skeleton. A Skeleton with a Coachmark. A Skeleton on a screen that has cached data — show the data with a Banner or an inline Spinner instead |

Partial loads are allowed: a card whose amount is late shows the real card with an `amount` skeleton inside it, also under the 3-second rule.

### Behaviour

- Announces once: *"Loading jobs"*; the screen reader is not told each shape. On swap, the content's heading is announced.
- Reduced motion: no shimmer; shapes are static `bgTertiary`.
- No haptic, no sound.
- Never tappable; tapping a skeleton does nothing and gives no feedback. Back is allowed.

---

## Spinner

A 2.5 dp arc, 270°, rotating 800 ms linear, colour inherits the text colour of its container. Two homes, no others:

| Place | Size | Rule |
| --- | --- | --- |
| **Button** | 20 dp (M/L), 16 dp (S/XS) | Replaces the label; fill `interactiveHover`; ignores taps; shows ≥ 400 ms so it never flickers; on failure the Button returns and a Toast or Banner explains (`button.md`) |
| **inline** | 20 dp | Trailing edge of a ListItem / Accordion row / HeaderAction count while that one value refreshes; the row's text stays; under the 3-second rule, after which the row shows its last value with *Not updated* in `Caption` |

Never: centred on a screen, inside a sheet as the only content, over a scrim, or beside a Skeleton. Loading a screen is the Skeleton's job; loading a tap is the Button's.

Reduced motion: the arc does not rotate; it pulses opacity 0.4 → 1 at 1 s.

---

## Content

Skeletons carry no text. The single announcement is *Loading {noun}* — *Loading jobs*, *Loading earnings*. Inline spinner rows say nothing until they fail, then *Not updated*.

---

## Accessibility

Skeleton region `aria-busy`, labelled *Loading jobs*; its shapes are hidden from the reader. Spinner in a Button: the Button announces *"Accept job, busy"*. Contrast is not required of skeleton shapes (decorative), but `bgTertiary` on `bgPrimary` stays visible outdoors at low brightness — verified on device is pending.

---

## Token proposals

None — `motion.loop`, `motion.celebrate` and `timeout.loading` are now tokens (`foundations/motion.md`).

---

## Figma reconciliation

1. **Create** Skeleton shapes (`Line` / `Amount` / `Circle` / `Block` / `Row` / `Card`) bound to `bgTertiary`, and the five presets as components: JobCard, ListRows, EarningsHead, Breakdown, Home.
2. **Create** Spinner (`Size` 16 / 20; `Place` Button / Inline). Replace the hand-drawn arcs inside the loading Buttons in *Loading States* with the instance.
3. Delete the *Retrying…* screen; replace with Skeleton → EmptyState `error` in the flow.
4. Add a loading frame (Skeleton preset) to each list screen mock — loading exists only if it is drawn.

Result: **~13 variants**, and a loading state for every screen for the first time.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | n/a — not interactive |
| 2 | ⚙ Semantic tokens only | ✅ + three proposed motion/timeout tokens |
| 4 | ⚙ States by ≥ 2 channels | ✅ shape + shimmer + announcement |
| 6 | ⚙ Loading visible ≥ 400 ms, never indefinite | ✅ **by construction** — 3-second rule |
| 8 | ⚙ Reduced motion | ✅ static shapes; pulsing arc |
| 9 | Meaning without text | ✅ the layout itself |
| 13 | Screen reader | ✅ one announcement, shapes hidden |
| 16 | Device review (low brightness outdoors) | ⬜ pending |
