# Tabs · Segmented

Status: **Proposed** · Tier: Core · Package: `SnabbitTabs`, `SnabbitSegmented` (new) · Figma: no component. Shipped: *My Rate Card* (`6062:14426`) — a two-segment **Weekdays | Weekends** control (dark filled selection) above a five-item **4 hr · 5 hr · 6 hr · 7 hr · 8 hr** underline tab row with a *Your shift* tag on the current one. Leave history uses headings (*Upcoming leave / Past leave*), not tabs.

Two ways to switch what a screen shows without leaving it. **Segmented** for two or three *views of the same thing* (weekdays / weekends, today / week / month); **Tabs** for three to five *sections* of one screen (shift lengths, rate-card parts). Both change content in place, remember the choice, and never navigate — the tab bar at the bottom is the map; these are just pages of one book.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Segmented selection is a dark navy fill (`bgInverse`-like) | Selected segment is `bgPrimary` with a `borderDefault` edge on a `bgTertiary` track; text `textPrimary` SemiBold; unselected `textSecondary` | Dark fills are reserved for scrims and the inverse surface; a raised white segment reads as "the one that's up" in greyscale and outdoors. |
| Tab row scrolls horizontally past the edge (8 hr half visible) | **Never scrolls.** ≤ 5 tabs, equal width; more becomes a `select` sheet or a Chip row | Hidden tabs are hidden features (research: what is not seen is not learned); a cut-off tab is a mis-tap. |
| *Your shift* as a loose pink tag above one tab | Kept as a **marker** slot: one `Tag` `brand S` above at most one tab | The current context deserves a mark; a Tag is the component for it. |
| No rules for what goes in which | Segmented = views of the same data (2–3); Tabs = sections of one screen (3–5); neither ever navigates | A control that sometimes changes the page and sometimes the screen cannot be learned. |
| Selection colour only | Selected = fill/underline + weight + colour; announced | ≥ 2 channels (P1). |

---

## Segmented

```
┌──────────────────────────────────────────────┐  track 40 dp · bgTertiary · radius.full · padding 4
│ ┌──────────────┐                              │
│ │  Weekdays    │        Weekends              │  segment 32 dp · selected bgPrimary + borderDefault, textPrimary SemiBold · others textSecondary Medium
│ └──────────────┘                              │
└──────────────────────────────────────────────┘
```

- **2 or 3 segments**, equal width, full content width (328 dp) or hugging with 16 dp horizontal padding when inside a card header.
- Label `BodyMd` Medium, ≤ 10 chars in the longest language, no icons (there is no room and the words are the point). Optional count in `Caption`: *Today · 3*.
- Selected segment slides 150 ms ease-out; `light` haptic. Reduced motion: no slide.
- Sizes: `M` 40 dp (default), `S` 32 dp inside cards and sheets (segment 24, `Caption` Medium).
- One selection always; there is no "none".

## Tabs

```
   4 hr        5 hr       [6 hr]       7 hr        8 hr        ← label BodyMd Medium · selected textBrand · others textSecondary
                       ━━━━━━━━━━                              ← indicator 2 dp bgBrand, full tab width, radius 1 · 1 dp borderSubtle rule under the row
                     ▲ Your shift                              ← optional marker: Tag brand S above ≤ 1 tab
```

- **3 to 5 tabs**, equal width, 48 dp tall, full content width, never scrolling. Two is a Segmented; six is a `select` BottomSheet or Chip row.
- Label only, or 20 dp Phosphor icon **with** label (icon above, label below, 56 dp tall). Never icon-only.
- Indicator slides between tabs 200 ms ease-out; content may swipe between tabs (`tabs` only, not Segmented); `light` haptic on change.
- Optional `Badge` (dot or count ≤ 9) top-right of a label; at most two badged tabs.
- The row is sticky under the HeaderNav (and SafetyStrip) when the content scrolls.

---

## States

| State | Segmented | Tabs |
| --- | --- | --- |
| selected | `bgPrimary` segment, `borderDefault`, `textPrimary` SemiBold | `textBrand` Medium + 2 dp `bgBrand` indicator |
| unselected | `textSecondary` Medium, no fill | `textSecondary` Medium |
| pressed | `bgSecondary` wash 100 ms | `bgSecondary` wash on the tab |
| disabled | not allowed — hide the segment instead | not allowed — hide the tab; a section with nothing shows its EmptyState `section` |
| focused | 2 dp `borderFocus` ring around the segment / tab | same |

---

## Behaviour

- Changing selection swaps the content below in one frame (or a 150 ms cross-fade when the content heights match); scroll position of each tab/segment is remembered while on the screen.
- The last selection is remembered **per screen, per account**, and restored on return — except where a default is a safety of understanding (Earnings opens on *Today*).
- Neither control ever navigates, opens a sheet, or triggers an action; if a tab would need to "do" something, it is a Button.
- Content under a tab announces its heading on change: *"Weekends. Daily earnings."*
- Segmented in a HeaderNav `search` slot is not allowed; it lives in content.
- A Coachmark may target the row once (*Tap to see weekend rates*).

---

## Content

- Labels are nouns or spans, ≤ 10 chars in the longest language: *Weekdays*, *Weekends*, *Today*, *Week*, *Month*, *4 hr*. Sentence case; no verbs; no *All* unless the others are real subsets and *All* is the default.
- Numbers keep their unit: *4 hr*, not *4*.
- Spoken on change: the label, then the content heading.

---

## Accessibility

Segmented: `radiogroup` of radios. Tabs: `tablist` / `tab` with `selected`, panel labelled by its tab. Full 40/48 dp targets; swipe is an alternative, never the only way. Contrast: `textBrand` 4.1:1 with weight and indicator; `textPrimary` on `bgPrimary`; `textSecondary` 4.8:1.

---

## Token proposals

None. Slide durations use the pending motion foundation (150 / 200 ms).

---

## Figma reconciliation

1. **Create** Segmented: `Count` (2 / 3), `Size` (M / S), `Selected` (1–3), boolean `Counts`. Track `bgTertiary`, segment `bgPrimary` + `borderDefault`.
2. **Create** Tabs: `Count` (3–5), `Selected`, booleans `Icons`, `Marker`, per-tab `Badge`. Indicator bound to `bgBrand`.
3. Rebuild *My Rate Card*: Segmented M for Weekdays / Weekends; Tabs (5) for shift lengths with the *Your shift* marker; no horizontal scroll.
4. Leave history stays as headings — do not convert to Tabs (two lists shown together beat two hidden behind tabs).

Result: **~12 variants**, and the first tab controls drawn from one definition.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 40 / 48 dp full width |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyMd / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ fill or indicator + weight + colour |
| 5 | ⚙ One next action | ✅ never an action |
| 7 | ⚙ Four languages | ⬜ labels ≤ 10 chars at 130 % — verify Kannada *Weekends* |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ raised segment / underline; spoken on change |
| 10 | Greyscale | ✅ raised white segment; indicator weight |
| 15–16 | Review | ⬜ pending |
