# WeekStrip

Status: **Proposed** · **In app** 2026-09-22 (Streak hero, Early logins hero) · Tier 1 Core · Package: `SnabbitWeekStrip` · Figma: composed from frames, no component

Seven days, Monday first, read as a record: which days counted. It is **not** the DatePicker `strip` — that is
64 dp tiles for *choosing* a day; this is a row of small marks for *seeing* a week she has already lived. Nothing is
selected; at most a day opens its detail — a BottomSheet `info` with the **day detail** recipe (`bottom-sheet.md`, 2026-09-24).

## What ships

| Shipped | Kind |
| --- | --- |
| Streak — weekday row with a coin above Mo · Fr · Sa · Su, then **1 2 3 4 5 6 7 in one continuous pink pill** | `band` + markers |
| Early logins — weekday row, then **7 8 9 10 11 12 13 as separate circles**, blue where she logged in early, grey on the 10th | `dots` |

Both write **Su** in red. `date-picker.md` already ruled Sundays are `textSecondary` like any day (red means error
or SOS, P6; many experts work Sundays) — **recorded here as a shipped departure, kept until the design lead decides.**

## Anatomy

```
   🪙                  🪙    🪙    🪙      MARKERS · optional · reward asset 16 dp above a day that earned it
   Mo    Tu    We    Th    Fr    Sa    Su   WEEKDAYS · Caption Medium textSecondary · 2 letters · Sunday shipped textError (departure)

 ┌  1     2     3     4     5     6     7 ┐  `band` · one pill bgBrandSubtle radius.full 44 dp tall · numbers BodyLg textPrimary
 └────────────────────────────────────────┘    the pill is the streak: unbroken because the days were

  (7)   (8)   (9)   (10)  (11)  (12)  (13)  `dots` · seven 44 dp circles · achieved bgInfoSubtle textPrimary · missed bgTertiary textBody
```

Seven columns share the content width; 44 dp cells with 4 dp gutters fit 328 dp (`date-picker.md` did the sum).
Markers, weekdays and days align on the same seven columns — use fixed-width columns, never gap alone.

## Kinds

| Kind | Says | Where |
| --- | --- | --- |
| `band` | *these days ran together* — continuity is the message, so the days sit in one unbroken pill | streaks |
| `dots` | *each of these days did or did not count* — independence is the message, so each day is its own circle | early logins, perfect jobs, attendance |

A `band` that breaks (a missed day) is drawn as **two pills** with a gap — the gap is the missed day, and it is the
most important pixel on the card. Markers work on both kinds.

## States (per day)

| State | `band` | `dots` |
| --- | --- | --- |
| counted | inside the pill | `bgInfoSubtle` fill |
| missed | outside the pill (gap) | `bgTertiary` fill, number `textBody` |
| today | number `textBrand` Medium | 1.5 dp `borderBrand` ring |
| future | `textTertiary`, no fill | `textTertiary`, no fill |
| marker | asset above the day | same |

## Behaviour

Read-only by default. Optionally a day opens its detail (the trackers' day rows) — then every day is a 44 dp
target with the 4 dp gutter making 48. Never a range, never a selection.

## Content

Weekdays are two letters in the app's language (*Mo Tu We Th Fr Sa Su* in English). Day numbers only — the month
is in the HeroCard's period line above, never repeated here.

## Accessibility

- Spoken as a sentence, not seven numbers: *Streak from Monday the 1st to Sunday the 7th, coins earned on Monday, Friday, Saturday and Sunday.* / *Early login on six days; missed Thursday the 10th.*
- Contrast: numbers `textPrimary` on `bgBrandSubtle` 16:1 and on `bgInfoSubtle` 12:1 ✅; weekday `textSecondary` 4.8:1 ✅; `textError` Sunday 4.8:1 ✅ but the meaning is wrong — see departure.
- The missed day is carried by fill **and** by the spoken sentence, never by colour alone.

## Sound

None.

## Do / don't

**Do** — Monday first · seven columns aligned · a gap for a missed day in a `band` · markers only for something earned that day.

**Don't** — make it a picker · scroll it · show two weeks · use it for a month (that is DatePicker `month`) · colour Sunday red on a new screen.

## Figma reconciliation

No component. Create **WeekStrip** on Components page `1:3886` with `Kind` (Band / Dots), boolean `Markers`, and a
`Day` sub-component with `State` (Counted / Missed / Today / Future). Bind fills to `bgBrandSubtle`, `bgInfoSubtle`,
`bgTertiary`. Change *Su* to `textSecondary` on the component; the shipped red stays on screens until they are re-cut.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ Caption / BodyLg |
| 3 | Phosphor only | ✅ markers are reward assets |
| 4 | Target ≥ 48 dp | ✅ 44 + 4 gutter when tappable |
| 5 | Meaning without colour | ✅ the gap; the spoken sentence |
| 6 | Meaning without text | ✅ pill / circles / markers |
| 7 | States complete | ✅ counted, missed, today, future, marker |
| 8 | Zero / empty honest | ✅ a week with nothing is seven grey dots, not a hidden strip |
| 9 | Spoken label | ✅ one sentence |
| 10 | Indic budget | ✅ two-letter weekdays; numbers only |
| 11 | One meaning | ✅ which days counted |
| 12 | Never a bare digit | ✅ the weekday row names each number |
| 13 | Not a status | ⚠ red Sunday recorded as departure |
| 14 | Reuse checked | ✅ DatePicker `strip` tried — 64 dp picking tiles, no markers, no continuity |
| 15 | In app | ✅ two heroes |
| 16 | Tier named | ✅ Tier 1 Core |
