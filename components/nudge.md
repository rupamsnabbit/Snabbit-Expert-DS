# Nudge

Status: **Proposed** · Tier: Core · Package: `SnabbitNudge` (new) · Figma: Nudge (`1581:6683`, 3 variants). Shipped: the yellow strip under *Login* on Home — *Login by 6:40 AM → 3 coins* (`87:25332`); the *If job not accepted −50* red strip in the DS file.

One line that ties **what she does next** to **what it is worth** — a coin if she logs in by 6:40, a red card if she lets the job lapse. A Nudge is the gamification layer at the moment of decision (P6: nudges are helpful and rare; a nudge appears when it changes what she should do next and never repeats what she has already seen). It is always attached to the control it is about, it never blocks that control, and it disappears the moment the condition is settled.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Three loose strips: red (*If job not accepted −50*), yellow (*Login by 6:50 AM · 1 coin*), white (*No Show · 5 red cards*) | One component, two kinds — **`gain`** (you get X if…) and **`loss`** (you lose X if…) — and one **`list`** form for the job alert where both apply | Same row, two meanings, one place to learn it. |
| Yellow fill for gains, red gradient for losses, plain white for the penalty schedule | `gain`: proposed **`bgReward`** (yellow.50) — the coin's own colour, not a warning; `loss`: `bgError`. Never a gradient | The tint says *which way the money goes*. Yellow is the reward layer's colour, so it never collides with `warning` (P6). |
| Asset sizes and counts vary; a big tilted red card | Reward asset 20 dp from the metallic layer + count in `Caption` SemiBold tabular, trailing | The asset is the meaning; the count is the amount; both small, both consistent. |
| Copy: *If job not accepted*, *No Show* | Copy is **condition + consequence** in her words: *Accept before the timer ends, or −50 coins* · *Login by 6:40 am → 3 coins* | Say what to do, then what it is worth (P2). |
| Floats anywhere on the screen | **Attached**: directly under the Button or card it concerns, 8 dp gap, same width | A consequence far from its action is a rule she has to remember; next to it, it is a label. |

---

## Anatomy

```
┌──────────────────────────────────────────────────────────┐  40 dp · radius.md · full width of the control it sits under
│ (→)  Login by 6:40 am                          🪙  3    │  leading icon 16 in a 24 dp disc · text BodyMd textPrimary · asset 20 + count Caption SemiBold
└──────────────────────────────────────────────────────────┘
```

| Kind | Fill | Leading | Trailing | Reads |
| --- | --- | --- | --- | --- |
| `gain` | `bgReward` (proposed) | `arrow-right` in a `bgWarningSubtle` disc, `textWarning` icon | coin asset · *+3* | *do this by then → you get* |
| `loss` | `bgError` | `clock` (deadline) or `warning-circle` (behaviour), `iconError` | red-card asset · *5* or coin · *−50* | *if this lapses → you lose* |

`list` form: 2–3 rows in one Card with `borderSubtle` dividers, used only in the job alert and the check-in screen where several consequences hold at once — *Accept in time → +5 coins*, *Ignore → −50 coins*, *No show → 5 red cards*. Never more than three; the first row is the one she can still change.

---

## Placement

- **Under the control it is about**, 8 dp below the Button or the card, same width. Home: under *Login*. Job alert: under the Timer/Button block as a `list`. Check-in: under *Check in*.
- **One Nudge per screen** (a `list` counts as one). Two nudges is a rulebook.
- Never in the header, never in a sheet's action area, never over content, never as a Banner (a Banner is about the system; a Nudge is about her next action).

---

## Behaviour

- Appears only while the condition is **open**: a deadline not yet passed, a choice not yet made.
- When the condition **resolves well** (she logs in by 6:40), the Nudge collapses (150 ms) and the reward's own moment plays — coin animation and *coin* sound from the rewards register, Toast *3 coins earned*.
- When it **resolves badly** (deadline passes), the Nudge collapses and a Banner `error` states what happened and what to do next; the Nudge never shows the loss after the fact — that is a Banner.
- **Never repeats.** A Nudge for a recurring condition (daily login) shows daily because the condition is new each day; a Nudge she has dismissed or acted on does not return the same day.
- Times update live (*by 6:40 am* stays; *in 12 min* counts down) — use the Timer's `deadline` mode text, never a second ring.
- Not tappable, except in the `list` where a row may open its Accordion `faq` (*What is a red card?*) via a trailing `caret-right`.
- No sound, no haptic, not spoken on appearance — it is rare by rule, and its neighbour (the Button, the Timer) already has the voice.
- Reduced motion: appears and collapses without animation.

---

## Content

- Pattern: **condition, then consequence**, ≤ 40 chars before the asset: *Login by 6:40 am* · *Accept before the timer ends* · *Miss this job* · *Check in by 7:45 pm*.
- The consequence is the asset + count only: *+3* coins, *−50* coins, *5* red cards. No words like *bonus*, *penalty*, *reward* — the asset says it.
- Times in her format (*6:40 am*), never *06:40* or *AM* in caps.
- Never *Hurry!*, never exclamation marks, never *Don't miss out*.
- Spoken (on the Button's or screen's voice, not its own): *"Login by six forty and you get three coins."*

---

## Accessibility

Role `note`, announced once with the Button it sits under: *"Login. Login by six forty a.m., plus three coins."* Asset carries its name. Contrast: `textPrimary` on `bgReward` and on `bgError` both ≥ 12:1. Not a target.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `bgReward` | `yellow.50` `#FFFBEB` | Reward-layer tint for gain nudges and coin callouts. Distinct in *meaning* from `bgWarning` even where the palette value is shared; keeps *warning* free to mean attention |

---

## Figma reconciliation

1. Nudge → **Nudge**: `Kind` (Gain / Loss), `Icon` (Arrow / Clock / Warning), `Asset` (Coin / Red card), `Count` text. Remove the gradient; bind fills to `bgReward` / `bgError`.
2. Add **Nudge / List** (2–3 rows in a Card) and place it in the job-alert and check-in mocks.
3. Home mock: the *Login by 6:40 AM* strip becomes a `gain` instance directly under *Login*; the white *No Show · 5 red cards* strip becomes a `loss` row inside the job-alert `list`.

Result: **~8 variants** replacing 3, and one place for every consequence in the app.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 2 | ⚙ Semantic tokens only | ✅ + proposed `bgReward` |
| 3 | ⚙ Type scale | ✅ BodyMd / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ tint + icon + asset + sign |
| 5 | ⚙ One next action | ✅ never blocks; attached to the one Button |
| 9 | Meaning without text | ✅ asset + count + arrow/clock |
| 10 | Greyscale | ✅ asset shape + sign survive |
| 14 | Status colours | ✅ red only for loss; yellow is reward, not warning |
| 11 | Costly actions | ✅ tells the cost before the choice (P3) |
| 15–16 | Review | ⬜ pending |
