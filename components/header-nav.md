# HeaderNav

Status: **Proposed** · Tier: Core · Package: `SnabbitHeaderNav` (exists; this spec defines its variants) · Figma: TopNav (`8:116`), Home navigation bar nav (`1491:15247` — actually the home header cluster)

The strip at the top of every screen that says **where she is** and **how to get back**. On the home screen it also holds the four actions she uses all day — coins, red cards, Saathi, SOS — each as an icon **with a label pill**, and it keeps **SOS in the same place on every in-job screen** (P7). It does not hold menus.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Title sometimes centred ("Dashboard"), sometimes left beside back | **Left-aligned** beside back, always. Root screens: left, no back | Indic titles run long; a centred title truncates or wraps unpredictably. One position is one less thing to learn. |
| Trailing `(i)` info icon | **Removed.** Help is *Saathi* (a labelled chat IconButton) or a `speaker-high` that reads the screen | 16 dp target hiding a sentence — fails P3 and the research. |
| Hamburger `≡` menu | **Removed.** Everything reachable from the tab bar or a labelled row; no drawers | Hierarchical navigation fails for this user (research). The tab bar is the whole map. |
| Home cluster: Help, SOS, Saathi, coins, red cards, bell, ≡ — the set and order vary between frames | The disc + label-pill item is **kept** as `HeaderAction`; the set is fixed at **four in one order**: coins · red cards · Saathi · SOS (rightmost). Help (duplicate of Saathi), bell and ≡ are removed. The greeting moves into the content; the header left holds the wordmark | The labelled-icon idea is right for this user (P2). What hurts is variation: a fixed set in a fixed place is learnable; seven varying items are not. |
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
| `home` | wordmark | — | four `HeaderAction`s: coins · red cards · Saathi · **SOS** | Home tab only |
| `search` | back | TextField `search` (fills the middle) | — | Search screens; the field is focused on open |
| `in-job` | back (or none while a job is running) | job title + subtitle (*Cleaning · 1:24:10*) with Timer M | **SOS** `HeaderAction` only | Every screen during a job |
| `transparent` | back on a 40 dp `bgPrimary` disc | — | — | Over a map or camera preview |

Only `home` and `in-job` carry SOS, and SOS is always the **rightmost** element, same size, same place (P7). Nothing else ever sits where SOS sits.

---

## Home cluster

```
snabbit                                   [🪙]  [🟥]  [💬]   [🚨]
                                          240    1   Saathi  SOS
```

**`HeaderAction`** — a 44 × 52 dp item (48 dp hit area): a 30 dp disc holding an 18 dp Phosphor icon or a 22 dp reward asset, and a 16 dp label pill beneath in `Caption` SemiBold. This is the item the shipped app already uses; the spec names it and fixes its rules.

| # | Action | Disc | Label pill | Opens |
| --- | --- | --- | --- | --- |
| 1 | Coins | coin asset (metallic layer), no disc fill | count, `bgTertiary` / `textPrimary`, tabular | Rewards |
| 2 | Red cards | red-card asset, no disc fill | count, `bgTertiary` / `textPrimary` | Attendance |
| 3 | Saathi | `chats-circle` on `bgBrandSubtle`, `iconBrand` | *Saathi*, `bgBrandSubtle` / `textBrand` | Help chat |
| 4 | **SOS** | `siren` fill on `bgError`, `iconError`, 1.5 dp `borderError` ring | *SOS*, `textError` fill (`#DC2626`) / `textInverse` | `SOSControl` — hold to trigger |

Rules: exactly these four, in this order, on every Home build (coins and red cards hide together only for an account with no rewards yet). SOS is always **rightmost**. No bell — notifications live in Profile. No *Help* — it is the same door as Saathi. The label pill is never dropped: the icon-only version of this row is what the research says fails. Labels are one word; *Saathi* stays *Saathi* in every language (it is a name). Counts announce with meaning: "240 coins", "1 red card".

Why not the greeting here: at 360 dp, four labelled actions (198 dp) leave ~150 dp — not enough for *Namaste, Radhika* in Kannada at 130 %. The greeting is the first line of the content instead, where it has the full width.

---

## Behaviour

- Back always goes back one screen; never to a different destination. On a root screen there is no back; Android back leaves the app from Home only after a Toast *Press back again to exit*.
- The header **never hides on scroll**. Persistent orientation matters more than 56 dp of space for someone who gets lost easily.
- Title updates announce to the screen reader; a screen with a long title reads the full text aloud on the `speaker-high` action when present.
- `in-job`: the Timer M in the subtitle position keeps running; the SOS `HeaderAction` sits rightmost, exactly where it sits on Home (hold to confirm inside the control).
- Font scaling: title wraps to a second line at 130 % and the header grows; nothing truncates below that.

---

## Content

- Title is the noun for the screen, ≤ 24 chars: *Earnings*, *This week*, *Job details*, *Bank account*. Not a sentence, not *How it works* (that's a Coachmark or an `info` sheet).
- Subtitle qualifies: *Last 30 days*, *Koramangala*, the running Timer.
- Greeting on Home lives in the content, not the header: *Namaste, {first name}* in her language; time-of-day variants are fine, jokes are not.
- Trailing Button label is a verb: *Call*, *Share*.

---

## Accessibility

Role banner; title is the page heading (level 1). Back announces "Back". SOS announces "SOS, hold to call for help". HeaderActions announce value + meaning ("240 coins", "1 red card", "Saathi, help chat"). Header contrast: `textPrimary` on `bgPrimary`. All targets 48 dp.

---

## Token proposals

None. The scrolled border uses `borderSubtle`.

---

## Figma reconciliation

1. TopNav → **HeaderNav**: `Variant` (Default / Root / Home / Search / In-job / Transparent), booleans `Subtitle`, `Trailing` (None / IconButton / Button).
2. Delete the `(i)` and `≡` variants. Title left-aligned in all variants.
3. Rename "Home navigation bar nav" → **HeaderNav / Home**. Promote the disc + label-pill item to a **HeaderAction** component (`Kind`: Coins / Red cards / Saathi / SOS; `Count`). Fix the set and order; delete the Help, bell and ≡ items and the loose *₹0* pill.
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
| 4 | ⚙ States | ✅ scrolled border; counts on HeaderActions |
| 7 | ⚙ Four languages | ⬜ title ≤ 24; verify Kannada at 130 % |
| 9 | Meaning without text | ✅ back caret; HeaderActions carry icon + label + asset |
| 11 | Costly actions | ✅ SOS hold lives in SOSControl |
| 14 | Status colours | ✅ red-card action uses the asset, not a red tag; SOS red is the SOS control's own |
| 15–16 | Review | ⬜ pending |
