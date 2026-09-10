# Popover

Status: **Proposed** · Tier: Core · Package: `SnabbitPopover` (new) · Figma: none shipped — the DS file has no Popover frame and no screen uses one (`audit/BENCHMARK.md` P2, "rarely"). Reinstated 2026-09-10 (`DECISIONS.md`) as a specified-but-rare component so that when one is needed it is built once, not improvised.

A **small surface anchored to the thing she just tapped, holding two or three actions about that thing**, with the rest of the screen still visible and still live. Tap the customer's house on the arrival map and a Popover offers *Directions* and *Call*; tap outside and it is gone. That is almost the whole of it — the Popover exists for the one situation the BottomSheet handles badly: when the actions are **about a spot on the screen** and a sheet sliding up would hide that spot.

Everything else that looks like a popover on other apps is something else here. A list of choices is a BottomSheet `select`. A fact about a thing is a Tooltip `status` or an `info` sheet. A lesson is a Coachmark. An overflow menu behind three dots **does not exist** in this app (P3: nothing she needs is hidden behind a small icon).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| No component; the app has no anchored menus | One **Popover**, two kinds: **`actions`** (2–3 rows, icon + verb) and **`detail`** (one line about the anchor + one action) | Specified so it is built once; without a spec the first map menu will be hand-styled (Tier 0). |
| The arrival map opens the maps app straight from **Show directions** on the card (`map-marker.md`) | Unchanged for the card. The Popover is the marker's own tap: *Directions · Call* — the card action stays the primary path | The card is reachable without knowing that a marker is tappable; the Popover is a shortcut for those who do (P3: the obvious path is never the hidden one). |
| Benchmark row P2 Popover "rarely; tooltips cover most cases" | Row closed against this spec with a **placement whitelist** of three sites | "Rarely" only holds if the places are named; otherwise every card grows a menu. |

---

## Anatomy

```
        ┌──────────────────────────────┐   surface · bgPrimary · radius.lg · border 1 dp borderDefault · elevation.floating · width 200–280 dp
        │ (→)  Directions              │   row 48 dp · icon 20 iconBrand · BodyLg textPrimary · no dividers, 4 dp between rows
        │ (☏)  Call Radhika            │
        └──────────────▼───────────────┘   arrow 12 × 6 dp · bgPrimary with the same border · points at the anchor · 8 dp gap
                     [🏠]                  the anchor stays fully visible and lit — no scrim
```

| Part | Spec |
| --- | --- |
| Surface | `bgPrimary`, `radius.lg`, 1 dp `borderDefault`, `elevation.floating`; padding 8 dp; width hugs content, 200–280 dp |
| Arrow | 12 × 6 dp, same fill and border, above or below (never left/right — same rule as Tooltip), centred on the anchor, ≥ 16 dp from the surface's ends |
| Row (`actions`) | 48 dp, `radius.md`, icon 20 dp `iconBrand` (danger rows `iconError`), label `BodyLg` `textPrimary` (danger `textError`), pressed `bgSecondary`; 2–3 rows, never 1, never 4 |
| Body (`detail`) | One `BodyLg` line + one `Caption` `textSecondary` line about the anchor (*Radhika's home · 350 m*) and **one** Button `tertiary brand M` (*Directions*) |
| Placement | Below the anchor by default, above when there is no room; 16 dp from screen edges; never over the SOS control, the primary Button or the HeaderNav |

---

## Kinds

| Kind | Holds | Use |
| --- | --- | --- |
| `actions` | 2–3 rows of icon + verb, each a complete action (no submenus, no toggles) | The house marker: *Directions* · *Call Radhika*. The hotspot marker on Home: *Directions* · *Jobs here* |
| `detail` | Name + one fact + one action | The *me* marker or a hotspot when there is only one sensible action: *Jyoti Nivas Gate · 4 jobs today* · **See jobs** |

Danger rows (*Report a problem*) are allowed as the **last** row only, in `textError`, and always open a confirmation (a `confirm` BottomSheet); a Popover row never completes a costly action by itself (P3, `button.md` § hold).

---

## Behaviour

- **Opens on tap** of an anchor that is drawn as tappable — a MapMarker on the **taller map only** (markers on a snippet are not tap targets, `map-marker.md`); the anchor takes its `selected` state while the Popover is open. Never on long-press (that is the Tooltip `label`), never automatically, never on scroll.
- **Non-modal.** No scrim; the screen behind stays live. It closes on: tap outside · back gesture · scrolling the underlying map or list by more than 8 dp · choosing a row · a screen-level state change (job cancelled, SOS). It never closes on its own timer — she may be reading it.
- **One at a time.** Opening another closes the first with no overlap.
- **Row tap** closes the Popover (`motion.fast`) *then* acts, so the outcome is never behind it. Actions that leave the app (*Directions*) show the `arrow-square-out` icon per `icons.md`.
- **Voice**: not spoken on open; rows are read on focus. The anchor's own name is enough context.
- **Haptic**: none.
- **Offline**: rows that need the network are `disabled` with the reason as their `Caption` (*Needs internet*) — never hidden, so the menu keeps the same shape every time (P7).

---

## Where it may appear — the whitelist

| Site | Kind | Rows |
| --- | --- | --- |
| Arrival map — the customer's `house` marker (`map-marker.md`) | `actions` | *Directions* (`arrow-square-out`) · *Call Radhika* (`phone`) |
| Home map — a hotspot marker | `detail` or `actions` | *Directions* · *Jobs here* (`caret-right`) |
| In-job screen — the SafetyStrip's Shield status text | `detail` | *Recording · 32 min · saving on phone* · **Shield settings** |

Anything else needs a change-to-core brief (`GOVERNANCE.md` § 2). In particular the Popover is **not** for: job cards or list rows (their actions are visible Buttons or the row itself) · the HeaderNav (its actions are labelled `HeaderAction`s) · sorting and filtering (Chips, or a `select` sheet) · the month pager (a `select` sheet) · a three-dots overflow anywhere.

---

## Placement in the system

| | Popover | BottomSheet `confirm` / `select` | Tooltip | Coachmark |
| --- | --- | --- | --- | --- |
| Anchored to a spot | Yes | No | Yes | Yes (spotlight) |
| Blocks the screen | No | Yes (scrim) | No | Yes |
| Holds actions | 2–3 | Any, incl. costly | None | *Got it* / *Do it* |
| Opened by | Tap on the anchor | A Button | Long-press · a change | First use |
| Closed by | Tap outside · row | Action · handle · back | Release · timer | The one way out |
| Voice | Rows on focus | Title spoken | `status` once | Yes |

---

## Accessibility

- Role: menu (`actions`) or dialog non-modal (`detail`); focus moves to the first row on open and returns to the anchor on close; back closes it.
- Rows are ≥ 48 dp tall and ≥ 200 dp wide; the surface is ≥ 16 dp from edges so the tap-outside area is always large.
- Contrast (measured): `textPrimary` on `bgPrimary` 17.7:1; `textSecondary` 4.8:1 for the `Caption` line (AA for normal text; the `BodyLg` line carries the meaning anyway); `textError` on `bgPrimary` 4.8:1.
- Greyscale and sunlight: the 1 dp border, not the shadow, separates the surface; icons make rows distinguishable without colour.
- Font scale 1.3: rows grow in height, the surface widens to 280 dp max, then labels wrap to two lines — never truncate; Kannada *Directions* budget checked (`foundations/type.md`).
- Reduced motion: fade only.

---

## Motion

| Moment | Duration | Easing |
| --- | --- | --- |
| Open | `motion.standard` · scale 0.96 → 1 from the arrow · fade | `enter` |
| Close (tap outside, back, scroll) | `motion.fast` · fade | `exit` |
| Row tap → close → act | `motion.fast` then the action | `exit` |
| Anchor `selected` while open | `motion.fast` | `move` |

---

## Do / Don't

**Do** — anchor it to a spot on a map · 2–3 verbs with icons · keep the screen live · close before acting · put danger last and confirm it in a sheet · keep the shape the same offline.

**Don't** — a three-dots menu · a Popover on a card or list row · one row (make it the tap) · four rows (make it a sheet) · a toggle or a text field inside · a scrim · auto-close · a left or right arrow · a Popover that covers SOS or the primary Button.

---

## Token proposals

None. The surface reuses `elevation.floating` (the one control shadow) plus a `borderDefault` border; no new elevation level is added — if the shadow proves too light over a map, the answer is the border, not a new token.

---

## Figma reconciliation

1. Create **Popover** on the Components page: `Kind` (Actions / Detail), `Arrow` (Above / Below), `Rows` (2 / 3, Actions only), `Danger last` (boolean). Surface `bgPrimary`, `radius.lg`, `borderDefault`, effect = the IconButton floating shadow style.
2. Row = a `ListItem` instance at 48 dp (icon 20 + `BodyLg`, no trailing), so a change to ListItem flows here.
3. Place one instance on the arrival-map mock over the `house` marker (*Directions · Call Radhika*) and mark the marker `selected`.
4. `audit/BENCHMARK.md` P2 Popover → closed against this spec.

---

## Acceptance checklist

| # | Row | Result |
| --- | --- | --- |
| 1 | Named component, Tier stated | ✅ Core · `SnabbitPopover` |
| 2 | Tokens only | ✅ `bgPrimary`, `bgSecondary`, `borderDefault`, `radius.lg/md`, `elevation.floating`, `textPrimary/Secondary/Error`, `iconBrand/Error`, `motion.*` |
| 3 | Outfit only; four scripts at 1.3 | ✅ `BodyLg` rows wrap; width 200–280 |
| 4 | Every state by ≥ 2 of colour / icon / shape / motion | ✅ pressed row: colour + motion; disabled row: colour + reason text; danger: colour + position |
| 5 | Phosphor only, registered | ✅ `arrow-square-out`, `phone`, `caret-right`, `house` |
| 6 | Copy: verbs, sentence case | ✅ *Directions*, *Call Radhika*, *See jobs* |
| 7 | Spoken where it matters | ✅ rows on focus; nothing on open |
| 8 | Reduced motion, ≤ 300 ms | ✅ `motion.standard` / `motion.fast`; fade only |
| 9 | Hit targets ≥ 48 | ✅ rows 48 × ≥ 200 |
| 10 | Contrast measured | ✅ 17.7 / 4.8 / 4.8 |
| 11 | Costly actions protected | ✅ danger last, confirmed in a sheet |
| 12 | Offline and slow states | ✅ rows disabled with reason, never hidden |
| 13 | One per screen / rarity rule | ✅ whitelist of three sites; one at a time |
| 14 | Figma reconciliation listed | ✅ |
| 15 | Copy heard aloud in four languages | ⏳ pending |
| 16 | Device review with experts | ⏳ pending |
