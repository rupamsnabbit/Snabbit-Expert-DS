# HeaderNav

Status: **Proposed** · Tier: Core · Package: `SnabbitHeaderNav` (exists; this spec defines its variants) · Figma: TopNav (`8:116`), Home navigation bar nav (`1491:15247` — actually the home header cluster)

The strip at the top of every screen that says **where she is** and **how to get back**. It does two more things on the home screen: shows the two or three numbers she cares about all day (coins, red cards) and keeps **SOS in the same place on every in-job screen** (P7). It does not hold menus.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Title sometimes centred ("Dashboard"), sometimes left beside back | **Left-aligned** beside back, always. Root screens: left, no back | Indic titles run long; a centred title truncates or wraps unpredictably. One position is one less thing to learn. |
| Trailing `(i)` info icon | **Removed.** Help is *Saathi* (a labelled chat IconButton) or a `speaker-high` that reads the screen | 16 dp target hiding a sentence — fails P3 and the research. |
| Hamburger `≡` menu | **Removed.** Everything reachable from the tab bar or a labelled row; no drawers | Hierarchical navigation fails for this user (research). The tab bar is the whole map. |
| Home cluster: SOS pill, Saathi pill, coins, red cards, bell, ≡ — six items, varying | Home header = greeting + **at most three**: SOS (own component, always rightmost), one status chip pair (coins · red cards), one IconButton (`bell` with Badge) | Six tap targets in 56 dp is a mis-tap field. Three, in fixed positions, is learnable. |
| Trailing pink *Call* button | Kept: one `secondary brand S` Button with icon + label is allowed as the trailing action | A labelled small button is clearer than a lone icon for a non-universal action. |
| Search bar replacing the title | Kept as the `search` variant, using TextField `search` kind | |

---

## Anatomy

```
┌─ 56 dp + status bar ──────────────────────────────────────────┐
│ [back]  Title                                     [trailing]   │  padding 4 (edges) · title 8 dp from back
│         Subtitle                                                │  optional · Caption textSecondary
└────────────────────────────────────────────────────────────────┘
```

Height 56 dp (64 with subtitle) plus the status-bar inset. `bgPrimary`, no shadow; a 1 dp `borderSubtle` bottom line appears only once the content has scrolled under it. Title `Title` 18 sp Medium `textPrimary`, one line, ≤ 24 chars, truncates with ellipsis (the full title is read aloud). Back = IconButton M ghost neutral `caret-left`. Trailing = **one** of: IconButton M ghost (`x`, `bell`, `translate`, `speaker-high`) · `secondary brand S` Button with icon + verb (*Call*) · nothing.

---

## Variants

| Variant | Leading | Middle | Trailing | Where |
| --- | --- | --- | --- | --- |
| `default` | back | title (+ subtitle) | one action or none | Every pushed screen |
| `root` | — | title | one action or none | Tab destinations (Earnings, Rewards, Profile) |
| `home` | — | greeting + Avatar 32 (*Namaste, Radhika*) | status chips + `bell` + **SOS** | Home tab only |
| `search` | back | TextField `search` (fills the middle) | — | Search screens; the field is focused on open |
| `in-job` | back (or none while a job is running) | job title + subtitle (*Cleaning · 1:24:10*) with Timer M | **SOS** only | Every screen during a job |
| `transparent` | back on a 40 dp `bgPrimary` disc | — | — | Over a map or camera preview |

Only `home` and `in-job` carry SOS, and SOS is always the **rightmost** element, same size, same place (P7). Nothing else ever sits where SOS sits.

---

## Home cluster

```
Namaste, Radhika  (Avatar 32)          [🪙 240] [🟥 1]   [bell•]   [SOS]
```

- **Status chips**: `Tag`-sized pills (28 dp) with the coin asset + count, and the red-card asset + count. Tapping opens Rewards / Attendance. Counts via Amount/`Caption` SemiBold, tabular. At most two.
- **Notifications**: IconButton M ghost `bell` with a `Badge` (dot or count ≤ 9). `bell` joins the IconButton allowed set with this spec: meaning *Notifications*, position header top-right-of-centre.
- **SOS**: the `SOSControl` component (own spec) — 48 × 48, `siren` fill, `bgError` disc; hold to trigger. Documented here only for position.
- **Saathi** (help chat): not in the header. It lives as a tab-bar destination or a Card on Home — a labelled place, not a lone icon.

---

## Behaviour

- Back always goes back one screen; never to a different destination. On a root screen there is no back; Android back leaves the app from Home only after a Toast *Press back again to exit*.
- The header **never hides on scroll**. Persistent orientation matters more than 56 dp of space for someone who gets lost easily.
- Title updates announce to the screen reader; a screen with a long title reads the full text aloud on the `speaker-high` action when present.
- `in-job`: the Timer M in the subtitle position keeps running; SOS is reachable in **one tap** from here (hold to confirm inside the control).
- Font scaling: title wraps to a second line at 130 % and the header grows; nothing truncates below that.

---

## Content

- Title is the noun for the screen, ≤ 24 chars: *Earnings*, *This week*, *Job details*, *Bank account*. Not a sentence, not *How it works* (that's a Coachmark or an `info` sheet).
- Subtitle qualifies: *Last 30 days*, *Koramangala*, the running Timer.
- Greeting on Home: *Namaste, {first name}* in her language; time-of-day variants are fine, jokes are not.
- Trailing Button label is a verb: *Call*, *Share*.

---

## Accessibility

Role banner; title is the page heading (level 1). Back announces "Back". SOS announces "SOS, hold to call for help". Chips announce value + meaning ("240 coins", "1 red card"). Header contrast: `textPrimary` on `bgPrimary`. All targets 48 dp.

---

## Token proposals

None. The scrolled border uses `borderSubtle`.

---

## Figma reconciliation

1. TopNav → **HeaderNav**: `Variant` (Default / Root / Home / Search / In-job / Transparent), booleans `Subtitle`, `Trailing` (None / IconButton / Button).
2. Delete the `(i)` and `≡` variants. Title left-aligned in all variants.
3. Rename "Home navigation bar nav" → **HeaderNav / Home**; reduce the cluster to chips (≤ 2) + `bell` + SOS; move Saathi out.
4. Trailing *Call* → Button instance (`secondary brand S`, icon + label).
5. Search variant uses a TextField `search` instance.

Result: **~12 variants** replacing 6 + 5 frames.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Title / Caption |
| 4 | ⚙ States | ✅ scrolled border; badge on bell |
| 7 | ⚙ Four languages | ⬜ title ≤ 24; verify Kannada at 130 % |
| 9 | Meaning without text | ✅ back caret, bell, SOS, chips with assets |
| 11 | Costly actions | ✅ SOS hold lives in SOSControl |
| 14 | Status colours | ✅ red-card chip uses the asset, not a red tag |
| 15–16 | Review | ⬜ pending |
