# ProgressBar

Status: **Proposed** · Tier: Core · Package: `SnabbitProgressBar` · Figma: Progress Bar (`666:3317`, 34 variants); compositions Progress Cards (`2489:8412`), Progress Stat – List (`666:3266`), TIER PROGRESS (`2488:8490`); Progress Buttons (`1491:13660`) to delete

How far she has come toward something she wants: the next tier, this week's coin goal, five jobs today, a document upload. A ProgressBar is **always about a goal she can name**, drawn as a filling track with the goal at the end. It is never a loading indicator — that is Skeleton or the Button's own spinner.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| 34 variants: two kinds × many fill levels × light/dark fills | **Kind × Size × Marker** — fill level is a value, not a variant | Variants describe shape, not data. ~12 instead of 34. |
| Fill colour picked per instance (dark grey, tier colours, pink) | Fill is `bgBrand`; **`success`** when the goal is reached; **`neutral`** for a locked or upcoming track. In tier compositions the fill may take the tier asset's colour (Tier 2, see below) | One meaning per colour (P6). |
| Percentages and bare fractions | Value line always **number + noun**: *4 of 20 coins*, *3 of 5 jobs*. Never `%` | Percent is abstract; she counts things (P2, persona). |
| Progress-fill *Button* ("Small / Half / Full fill") | **Deleted.** A button that fills is the Button's hold-to-confirm state, specified in `button.md` | A control and a status must not look alike (P3). |
| Segmented bars with 3–5 segments as separate frames | One `segmented` kind, `count` 2–7 | Fewer frames, same look. |
| Milestone markers (weeks) and goal asset drawn ad hoc in Progress Cards | `Marker` slot: `goal` (asset at the end) and `milestones` (dots on the track, each reached / locked) | The best idea in Figma, made reusable. |

---

## Anatomy

```
 Snabbit coins this week                         4 of 20    ← label row: label textBody · value textPrimary tabular, Caption/BodyMd
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○──────────────────(🪙)  ← track bgTertiary · fill · milestone dot · goal asset
```

Track `bgTertiary`, radius `full`. Fill grows from the leading edge (mirrored in RTL — not needed today). Label row above the track is part of the component so the value is never omitted; on `S` the label row may be dropped **only** when the value is shown elsewhere in the same card.

| Size | Track | Milestone dot | Goal asset | Text | Use |
| --- | --- | --- | --- | --- | --- |
| `S` | 4 dp | — | — | `Caption` | Inside ListItem rows and compact cards |
| `M` | 8 dp | 12 dp | 24 dp | `Caption` label · `BodyMd` value | Default: cards, rewards |
| `L` | 12 dp | 16 dp | 32 dp | `BodyMd` label · `Heading3` value | Hero tier progress at the top of Rewards |

---

## Kinds

| Kind | Shows | Example |
| --- | --- | --- |
| `linear` | A continuous quantity toward a goal | 4 of 20 coins · 1,240 of 3,000 ₹ · document upload |
| `segmented` | A count of discrete, equal things, 2–7 segments, 4 dp gaps | 3 of 5 jobs today · 5 of 7 streak days |

Not a kind: **indeterminate**. If the end is unknown there is nothing to show progress toward; use a Skeleton (loading) or a Timer (waiting).

---

## Tones — computed, not chosen

| Tone | When | Fill | Value text |
| --- | --- | --- | --- |
| `brand` | 0 < value < goal | `bgBrand` | `textPrimary` |
| `success` | value ≥ goal | `iconSuccess` fill; goal asset lit; `check` in the value line | `textSuccess` |
| `neutral` | locked / upcoming (a future week, a tier not yet unlocked) | `borderDefault` fill on `bgTertiary` track, `lock` on the goal | `textTertiary` |

Empty (value 0) is `brand` with no fill — the track alone reads as "nothing yet, here is the goal". Never `warning` or `error`: a bar that turns red is a punishment, and a shortfall is told with a Banner or a spoken line, not a colour.

**Tier compositions** (Tier 2 — `TierProgressCard`, `TierRail`): the fill may take the colour of the *next* tier's metallic asset (bronze, silver, gold, blue, pink), because the asset is right there at the end of the track and the colour points at it. This is the only place a ProgressBar fill is not brand/success/neutral, and it must be paired with the asset.

---

## Markers

- **`goal`**: the reward asset (metallic layer — coin, tier badge, red card) at the end of the track, 24/32 dp, overlapping the track end by half. Lit when reached, grey with a `lock-simple` badge when locked. One goal per bar.
- **`milestones`**: 1–4 dots on the track at their values (weeks of a month, the three tiers on the way to pink). Reached: `bgBrand` fill dot with a 2 dp `bgPrimary` ring. Not yet: `bgPrimary` dot with `borderDefault` ring. Milestone labels (Week 1, Week 2) sit below the track as `Small` — the one allowed use of `Small`, because the value line above already carries the meaning.
- **Position marker** (her avatar on the tier rail, as in TIER PROGRESS): allowed only in the `TierRail` composition at `L`; it is the Avatar `XS` under the current tier node.

---

## Behaviour

- **Motion**: fill animates from the previous value over 300 ms ease-out. Reaching the goal: fill completes, then the goal asset scales 1 → 1.15 → 1 over 400 ms with the *coin* sound (rewards register) and a `medium` haptic. Reduced motion: values snap; no pulse; sound and haptic stay.
- **Decrease** (a red card removed coins): the bar animates down over 300 ms with no sound; the reason is told by the Banner that caused it, never by the bar alone.
- A bar that changes while she is looking at it announces the new value once ("6 of 20 coins").
- Never interactive. No tap, no drag. A goal she can change is a Slider (later spec), not a ProgressBar.
- On `L`, tapping the card that holds the bar may open the breakdown; the bar itself is not the target.

---

## Content

- Label: the thing being counted, sentence case, ≤ 24 chars: *Snabbit coins this week*, *Jobs today*, *To Gold tier*.
- Value: **`{value} of {goal} {noun}`** with the noun only when the label doesn't already say it; tabular digits; Amount rules for ₹.
- Segmented: *3 of 5* beside the label; the segments do the rest.
- Completed: value line becomes *Done · 20 of 20* with `check`; spoken *"Goal reached, 20 coins"*.
- Locked: *Unlocks after Gold* — the reason, not just a lock.

---

## Accessibility

Role progressbar; `valueNow`, `valueMax`, and the value line as the text. Segmented announces *"3 of 5 jobs"*. Milestones are decorative to the screen reader; the goal asset carries its name (*"Gold tier"*). Fill on track: `bgBrand` on `bgTertiary` passes 3:1 as a non-text element; `success` fill 3.1:1. Height ≥ 4 dp so it survives low-brightness outdoors (persona); `S` is never used alone as the only indicator of a goal.

---

## Token proposals

None. Segment gap uses `spacing.2` (4 dp). Milestone ring uses `borderWidth.2`.

---

## Figma reconciliation

1. Progress Bar → **ProgressBar**: `Kind` (Linear / Segmented), `Size` (S / M / L), `Marker` (None / Goal / Milestones), `Tone` (Brand / Success / Neutral); fill level via a number property, not variants. Bind track to `bgTertiary`, fill to `bgBrand` / `iconSuccess`.
2. Delete the dark-grey and light-grey fill variants; delete the **Progress Buttons** frame.
3. Progress Cards → rebuild as **TierProgressCard** (Card + ProgressBar M `goal`) and **WeeklyGoalCard** (ProgressBar M `milestones`); tier header colours come from the tier asset palette in `foundations/assets.md`.
4. TIER PROGRESS → **TierRail** composition: ProgressBar L with five tier assets as milestones and the Avatar position marker.
5. Progress Stat – List → ListItem with ProgressBar S trailing.

Result: **~12 variants** replacing 34 + 16 + 5 + 8 frames.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | n/a — not interactive |
| 2 | ⚙ Semantic tokens only | ✅ (tier fill colours are asset-derived, Tier 2 only) |
| 3 | ⚙ Type scale | ✅ Caption / BodyMd / Heading3; `Small` for milestone labels only |
| 4 | ⚙ States by ≥ 2 channels | ✅ success = colour + check + lit asset; locked = colour + lock + text |
| 8 | ⚙ Reduced motion | ✅ snap; sound/haptic kept |
| 9 | Meaning without text | ✅ filling track toward an asset |
| 10 | Greyscale | ✅ fill vs track luminance; success carries a check |
| 12 | Sound / haptic | ✅ goal reached only |
| 14 | Status colours | ✅ never warning/error |
| 15–16 | Review | ⬜ pending |
