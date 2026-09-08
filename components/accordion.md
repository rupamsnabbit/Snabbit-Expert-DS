# Accordion

Status: **Proposed** · Tier: Core · Package: `SnabbitAccordion` · Figma: Accordion (`894:7348`, 2 variants), Earnings Accordion (`1490:11066`, 2 variants)

A row that opens to say more. Two jobs in the Expert app: **answer a question** (*What is Last Hour MinG Loss?*) and **show a breakdown** (*You will earn ₹150* → work, check-in bonus, summer bonus, OT). Both keep the screen short until she asks, and both **read aloud** — the Figma accordion already has a speaker on every row, which is exactly right (P4).

An Accordion hides information, never actions. If something inside it needs a tap, it belongs on the screen, not behind a caret (P2).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Two unrelated frames (FAQ accordion, Earnings accordion) | One component, two **kinds**: `faq` and `breakdown` | Same header, same caret, same motion; only the body differs. |
| Speaker on the FAQ header — good — but not on Earnings | Speaker on **both**; it reads the body, not the title | Consistency is usability for this user (research: weak transfer of learning). |
| Earnings collapsed shows title + amount as two lines | Collapsed `breakdown` shows title left, **Amount M right**, one line | The summary is the reason to open; make it scannable. |
| Emoji in a row label (*Summer Bonus 🌞*) | Phosphor `sun` at 16 dp, or no icon | Phosphor only; emoji render differently on every ₹8k phone. |
| Highlighted row (Check in by 7:45 PM) with a blue tint and no rule for it | Named **`conditional`** row: `bgInfo` wash, `clock` icon, the condition in `textInfo`; means *you get this if…* | A tint without a meaning is decoration; this one earns its colour (P6). |
| Caret and speaker crowded at the right | Speaker is an IconButton `M tertiary brand` (allowed set), caret is a 24 dp glyph 8 dp to its right; header min-height 56 | Two targets, both 48 dp. |

---

## Anatomy

```
┌────────────────────────────────────────────────────────┐  Card surface bgPrimary · radius lg · borderSubtle
│ What is Last Hour MinG Loss?              [🔊]   ⌄     │  header ≥ 56 dp · title BodyLg Medium · speaker M tertiary · caret 24
├────────────────────────────────────────────────────────┤  (open) borderSubtle divider
│ If you log out early or deny a job in your last hour…   │  body BodyMd textBody · padding 16 · ≤ 3 short paragraphs
│ To avoid this, complete your full shift.               │
│ Ask Saathi ›                                            │  optional one tertiary link, never a Button
└────────────────────────────────────────────────────────┘
```

`breakdown` collapsed header: title left (`BodyMd textSecondary`), **Amount M** right, caret. Open: Amount L centred above a rule, then rows — label left, Amount S right, 48 dp each, `borderSubtle` between; one row may be `conditional`.

Items sit in one Card each (as in Figma), 8 dp apart, or as rows of one Card with dividers when there are more than three FAQ items.

---

## Kinds

| Kind | Header | Body | Where |
| --- | --- | --- | --- |
| `faq` | Question, speaker, caret | Prose ≤ 3 paragraphs, optional *Ask Saathi ›* | Help, Rewards rules, penalties explained |
| `breakdown` | Title + Amount M, speaker, caret | Amount L, then line rows (label · Amount S), one `conditional` row allowed | Job alert, job details, earnings day view, payout |

---

## States

| State | Header | Caret | Body |
| --- | --- | --- | --- |
| collapsed | as above | `caret-down` | hidden |
| open | title `textPrimary` | rotated 180°, 200 ms | revealed; height animates 200 ms ease-out |
| pressed | `bgSecondary` wash on the header, 100 ms; `light` haptic | | |
| speaking | speaker `fill`, `iconBrand`; header unchanged | | body auto-opens if closed |
| disabled | not allowed — an item with nothing to say is not shown | | |

Only **one item open at a time** within a group of `faq` items; opening another closes the first (she reads one answer at a time, and the screen stays short). `breakdown` items are independent.

---

## Behaviour

- The **whole header** is the target for open/close; the speaker is its own 48 dp target and does not toggle.
- Speaker reads the **body** in her language, in spoken register; while speaking the body is open and the speaker shows `fill`. Tapping again stops. Only one speaker plays at a time across the screen.
- Opening scrolls so the whole body is visible where possible; never scrolls the header off the top.
- A `breakdown` that is the only thing on a screen (job details) opens by default; in a list (earnings history) it starts collapsed.
- Never nested. Never more than **6** items in a group; beyond that the content needs a search or a Select, not a longer accordion.
- Reduced motion: no height animation, caret swaps without rotation.

---

## Content

- FAQ titles are the question she would ask, ≤ 48 chars, ending with a question mark: *What are adjustments?* *Why did I get a red card?* Not *Adjustments*.
- Bodies are spoken register, one idea per paragraph, ≤ 3 paragraphs, and end with what to do: *To avoid this, complete your full shift.*
- Breakdown row labels are noun + qualifier: *Work (1 hour)*, *OT (15 min)*, *Summer bonus (1 hour)*. Conditional rows state the condition: *Check in by 7:45 pm*.
- The link, when present, is *Ask Saathi ›* — never *Learn more*.

---

## Accessibility

Header is a button with `aria-expanded`; body is a region labelled by the header. Speaker announces *"Read aloud"* / *"Stop"*. Amounts read with the noun (*"one hundred fifty rupees"*). Header contrast `textPrimary`; conditional row `textInfo` on `bgInfo` 4.9:1. Targets ≥ 48 dp.

---

## Token proposals

None. Conditional row uses `bgInfo` / `textInfo`; motion uses the 200 ms standard pending the motion foundation.

---

## Figma reconciliation

1. Accordion + Earnings Accordion → **Accordion**: `Kind` (FAQ / Breakdown), `State` (Collapsed / Open), boolean `Speaker` (default on), boolean `Link`.
2. Add **Accordion / Row** for breakdown lines with `Conditional` boolean; replace the emoji with a Phosphor `sun` instance.
3. Speaker → IconButton `M tertiary brand` instance; caret → 24 dp `caret-down` instance rotated in the Open variant.
4. Collapsed Earnings header → one line, Amount M right.

Result: **~8 variants** replacing 4, and one component where there were two.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ header 56, speaker 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ BodyLg / BodyMd / Amount sizes |
| 4 | ⚙ States by ≥ 2 channels | ✅ caret rotation + body + title colour |
| 5 | ⚙ One next action | ✅ no actions inside; one tertiary link at most |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ speaker reads every body |
| 12 | Voice | ✅ **by construction** — every item has a speaker |
| 14 | Status colours | ✅ `conditional` is the only tint and it has one meaning |
| 15–16 | Review | ⬜ pending |
