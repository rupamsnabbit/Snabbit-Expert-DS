# ListItem

Status: **Proposed** · Tier: Core · Package: `SnabbitListItem` · Figma: List Items (`579:2665`), ListItem / meta (`609:6107`), List (`1598:7354`); informs List Items – Payout, Attendance List Item, Account Item, Breakdown List, Pay Summary – List, Progress Stat – List, Referral list, Contact List, Transaction states (all compositions)

One row in a list: a leading thing, a title with optional supporting lines, a trailing thing, a divider. Eleven Figma frames are all this row with different things in the slots. The expert reads lists constantly — today's jobs, this week's earnings, her attendance — so the row has to be tall enough to tap, calm enough to scan, and honest about status.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| 11 domain-specific row frames | One `ListItem` with three slots; domains are compositions | Learn one row, know every list. |
| Rows ~48 dp with 14 sp text | **Min 56 dp**, title `BodyLg` 16 sp; 64 with a description; 72 with a 40 dp leading | P3, P1: the row is the tap target and the title is what she reads. |
| `(i)` info icon beside labels, opening a tooltip | **Removed.** Explanation goes in the description line, or the row opens a sheet | A 16 dp icon hiding a sentence is a small target and a hidden layer — both fail the research. |
| Hidden values shown **blurred** | `Amount` `hidden` state: `₹••••` + `eye` IconButton | Blur is illegible *and* looks like a rendering bug. |
| Helper text in red/orange under the label | **Status line**: icon + text in the status colour, one line | Same rule as TextField errors: three channels, never colour alone. |
| Trailing "Show" chip | Tapping the row or the `eye` reveals; no chip | Chips are for choosing, not for revealing. |
| Trailing is a value (Amount), a status (Tag) or a way in (caret) | **`quantity`** trailing: a plain count — *add 2*, *used 6 of 8*, *9 items* | A kit is counted, not priced. Rendering *8 kits* as an Amount says it is money; rendering it as meta text makes it disappear (`projects/beauty-shift-lifecycle`, PRD § 5). |

---

## Anatomy

```
┌ row ──────────────────────────────────────────────────┐  min 56 dp · padding 0 16 · gap 12
│ [leading]  Title                             [trailing]│  Title BodyLg 16 textPrimary
│            Description                                 │  BodyMd 14 textSecondary · optional
│            [icon] Status line                          │  BodyMd 14 status colour + Phosphor 16 · optional
└────────────────────────────────────────────────────────┘
  ─────────── divider borderSubtle, inset to the title's left edge ───────────
```

Heights: **56** title only · **64** title + one line · **72** title + two lines, or any row with a 40 dp leading. Text is vertically centred to the leading element when one line; top-aligned to it when two or more.

---

## Slots

### Leading (one of)

| Leading | Size | Use |
| --- | --- | --- |
| Phosphor icon `regular` | 24, `textBody`, in a 40 dp box | Settings rows, categories, actions |
| Icon in a tonal box | 40 dp box, radius `md`, `bgBrandSubtle` + `textBrand` (or a status wash) | Job rows, earnings lines — gives the eye a shape to land on |
| Avatar | 40 | People |
| AchievementBadge / asset | 40 | Earnings lines tied to a badge or bonus |
| Checkbox / Radio | 24 | Then it is a **selection row** — see Selection controls; the whole row toggles |
| Pictogram asset | 40 | Status rows where the object + dot says it |
| **`rank`** | 40 box | A place in an ordered list — a leaderboard. **1–3** are the medal assets `asset/reward/rank-1/2/3` (rank is the reward layer's domain); **4 and after** are the number, `BodyLg` SemiBold `textPrimary`, tabular, centred in the box. Always followed by an Avatar 40 — a rank belongs to a person (`patterns/referral.md`, 2026-09-24) |
| none | — | Plain text rows (settings sub-items); title aligns to the 16 dp margin |

### Content

**Title** `BodyLg` 16 Regular `textPrimary`, one line, ≤ 28 characters, truncated with an ellipsis only when the row opens a detail that shows the full text. **Description** `BodyMd` 14 `textSecondary`, one line, ≤ 40 chars — where the `(i)` explanation now lives (*Bonus for 5-star ratings this week*). **Status line** `BodyMd` 14 in `textSuccess` / `textWarning` / `textError` with the matching Phosphor 16 dp icon (`check-circle`, `warning-circle`, `x-circle`) — *Paid on Friday*, *Pending customer confirmation*, *Missed check-in*.

Title + description + status = 3 lines max. More is a card.

### Trailing (one of)

| Trailing | Use |
| --- | --- |
| `Amount` md (any tone/state — `locked`, `hidden`, `negative`) | Earnings, payouts, breakdowns |
| `Tag` M | Status a glance must catch (*Paid*, *Late*) |
| `caret-right` 20 dp `textTertiary` | The row opens something — the **default** for navigational rows |
| Amount + `caret-right` | Value that opens detail |
| `Switch` | Settings toggles (whole row toggles) |
| meta text `Caption` `textSecondary` | Time, distance (*9:30 am*, *1.2 km*) |
| `quantity` | A count of things she can hold — *add 2*, *used 6 of 8*, *9 items*, *+17* |
| IconButton S (`phone`, `speaker-high`) | One row-level action — needs a 48 dp parent hit area; the row itself is then **not** tappable |

Never two trailing elements except Amount + caret. Never a Button in a row (a row is a list, not a form); the exception is one IconButton from the allowed set.

---

### `quantity` — counting things, not money

`BodyLg` 16 SemiBold `textPrimary` for the number and its unit, with an optional `BodyMd` `textSecondary` qualifier on the line below. It is deliberately built like `Amount md` and deliberately not it — same weight and size so a list of counts and a list of amounts feel like one family, no ₹ and no tone so that the two are never confused.

| Form | Renders | Use |
| --- | --- | --- |
| bare count | *9 items* · *1 pack of 6* | What is in a pouch |
| instruction | *add 2* | What she must physically do to this row — the strongest form, used when the row is a task |
| of-total | *6 of 8* | Held against what she should hold; the second number is `textSecondary`. May carry a **fill bar** — see below |
| delta | *+17* · *+6* | What is arriving. `+` is part of the value, never typed into the label |

Rules:

- **Never coloured.** A count is not a status. Green *6 of 8* would say the shortfall is fine; red would say it is a failure. Where a count *is* a problem, the row carries a status line and its icon (P1), and the number stays `textPrimary`.
- **Never a bare digit.** *2* is unreadable at a glance; *add 2* and *9 items* are not. The unit or the verb is part of the value in every language (P9).
- **`+` is a direction, not a sign.** It marks something arriving. There is no `−` form — stock she used is written as *used 6 of 8*, in words, because a red *−6* beside a product reads as a penalty.
- Never in the same row as an Amount. If a row needs both a count and a price (*+6 · ₹360*), the count is the trailing `quantity` and the price goes on the description line — the trailing slot holds one thing.
- Announced with its unit: *add two facial kits*, *used six of eight*.

#### The fill bar — `of-total` only

`of-total` may carry a **ProgressBar `S`** directly under the count, the width of the trailing slot — the same ProgressBar the app already ships on the coins card (**In app** 2026-09-22), not a new primitive. It is allowed on **no other form**, because only `of-total` has a
denominator for a bar to mean anything.

**Why it exists.** *6 of 8* asks her to read two numbers and infer a ratio between them. Over nine rows that is a
ledger, and the stakeholder's word for the result was *"like a bill"* (2026-09-18). The bar answers the question
before the numbers are read and confirms it after — the numerals stay, they are not replaced.

**It is never coloured**, for the same reason the count is not: a red bar on a short pouch says she failed, and a
green one says a shortfall is fine. Shortness is carried by **length**, which is the one channel that cannot lie
about it (P6). A row whose shortfall is a problem still says so in words, in its own status line (P1).

Evidence: Garmin Connect and Runna both render gear wear as the numerals **and** a bar, and Copilot Money does it
per row and again in summary — `projects/beauty-shift-lifecycle/reads/mobbin-2026-09-18-visual-inventory/`. The
same read **rejects a donut ring** for the summary: six of six ring references on Mobbin mean *loading* or *score*,
and a percentage replaces a count she can act on with one she cannot.

---

## Kinds

| Kind | Tap | Trailing |
| --- | --- | --- |
| `navigational` | opens detail | `caret-right` (default), optional Amount/meta before it |
| `informational` | none | Amount / Tag / meta |
| `selection` | toggles | leading Checkbox/Radio, or trailing Switch |
| `actionable` | none on row | one IconButton in trailing |

---

## States

| State | Rendering |
| --- | --- |
| default | as above |
| pressed (navigational/selection) | `bgSecondary` full-row wash 100 ms; `light` haptic |
| selected (in a picker) | `bgBrandSubtle` fill, leading `check` replaces icon — used by Select sheets |
| current (*you are here*) | the `selected` rendering, but the leading icon stays and an Avatar `XS` sits after the title — a row that is **her** in a list of tiers or ranks (**In app** 2026-09-22: the Gold row in *Base Pay across Tiers*). **In a list of people** (a leaderboard), every row already carries an avatar, so the marker is a Tag `M soft brand` **You** in the trailing slot before the value instead — the word, not a second face (2026-09-24, `patterns/referral.md`) |
| disabled | all text `textTertiary`, leading at 40 % opacity, not tappable; description says why when possible |
| loading | skeleton: leading circle/box, 60 % title bar, 40 % description bar; 3 rows shown, never a spinner |
| swipe | **not supported** — no swipe-to-delete or swipe actions (P3: gestures are shortcuts, never the only path; here they would be the only path) |

---

## Lists

- Rows sit **in a Card** when they are a group with a title (earnings breakdown), or **full-bleed** on the page when the list *is* the screen (jobs today, history). Full-bleed rows use the same 16 dp padding and `borderSubtle` dividers.
- Divider inset: starts at the title's left edge, runs to the right edge — so leading icons line up as a column and the eye reads titles as a list.
- Section header: `BodyMd` Medium `textSecondary`, 16 dp above rows, 8 below, sentence case (*This week*, *Earlier*). Never all-caps.
- Lists are lazy and paginated; the empty state is an **Empty state** component, not a blank area; loading shows 3 skeleton rows.
- Max one status line per row; if many rows share a status, the status is a section, not a repeated line.

---

## Content

- Title names the thing: *Cleaning · 2 hr*, *Weekly bonus*, *Bank account*. Not a sentence.
- Description explains or qualifies: *Koramangala · 9:30 am*, *5-star ratings this week*.
- Status line says what happened and, if pending, what's next: *Paid on Friday* · *Pending — customer confirms by 8 pm* · *Missed check-in · −₹50*.
- Numerals Latin; amounts via Amount; times as *9:30 am*.
- Spoken: title, description, status, trailing value, then "opens detail" if navigational.

---

## Accessibility

Navigational rows are a single button named by their content. Informational rows are read as text. Selection rows carry the control's role. Hit area is the full row height (≥ 56). Status line icon + text; colour never alone. Truncated titles expose the full text to the reader.

---

## Token proposals

None. Tonal leading boxes use existing `bg*Subtle` washes; status lines reuse status text tokens and 500-step icons.

---

## Figma reconciliation

1. Merge List Items, ListItem / meta and List into **ListItem**: `Leading` (None / Icon / Icon box / Avatar / Badge / Checkbox / Radio / Pictogram), `Lines` (1 / 2 / 3), `Trailing` (None / Caret / Amount / Amount+Caret / Tag / Switch / Meta / IconButton), `State` (Default / Pressed / Selected / Disabled / Loading), boolean `Divider`.
2. Delete every `(i)` info icon; move its text into the description line.
3. Replace blurred values and "Show" chips with Amount `hidden` + `eye`.
4. Rebuild the eight domain list frames as compositions of ListItem on their feature pages.
5. Add **List section header** and **Skeleton row** components.
6. Bind text, dividers and washes to tokens.

Result: ListItem ≈ **60 meaningful variants** replacing 11 frames / 46 rows.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ rows ≥ 56; IconButton wrapped |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyLg / BodyMd / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ status line = icon + colour + words; selected = fill + check |
| 5 | ⚙ Loading / empty | ✅ skeleton rows; Empty state component |
| 6 | ⚙ Tap guard | ✅ row debounced 300 ms |
| 7 | ⚙ Four languages | ⬜ title ≤ 28, description ≤ 40; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ leading icon/asset + trailing Amount/Tag; caret says "opens" |
| 10 | Greyscale | ✅ |
| 11 | Costly actions | ✅ no swipe actions; nothing destructive in a row |
| 15–16 | Review | ⬜ pending |
