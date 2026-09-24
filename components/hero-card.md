# HeroCard

Status: **Proposed** · **In app** 2026-09-22 (Streak · Perfect jobs · Early logins · Coins) · Tier 1 Core · Package: `SnabbitHeroCard` · Figma: composed from frames, no component

A card in two parts: a filled top that carries one big figure and its name, and a white bottom that carries the
period and, optionally, the week. It is how every tracker screen opens. Supersedes the Card `hero` kind added on
2026-09-22 (that line now points here).

## What ships

`references/shipped-app-2026-09-22/11-hero-streak.png` · `12-hero-perfect-jobs.png` · `13-hero-early-logins.png`.

| Shipped | Top | Bottom |
| --- | --- | --- |
| **Your Current Streak · 3 🔥** on a pink gradient with a large flame watermark | label · Stat L · small icon · watermark | *Mar 1 – Mar 7* · WeekStrip `band` with coin markers |
| **Perfect jobs done · 18 👌** on green | same | *Mar 7 – Mar 13* only |
| **Early Logins done · 6 →** on blue | same | *Mar 1 – Mar 7* · WeekStrip `dots` |
| **Snabbit Coins · 40** on dark navy with a 3D coin stack | label · Stat L · reward asset | none — the card is the screen header |

## Anatomy

```
┌───────────────────────────────────────────────┐  radius xl · no border · clips its children
│ Your Current Streak                    ╭───╮  │  TOP · fill by tone · padding 24 · label BodyLg Medium textInverse
│ 3 🔥                                   │ 🔥│  │  Stat L Display SemiBold textInverse · 24 dp icon after the figure · watermark icon 96 dp textInverse @ 60 %, right, bleeding the edge
│                                        ╰───╯  │  two concentric arcs at 10 % textInverse behind the watermark (shipped decoration, kept)
├───────────────────────────────────────────────┤
│ Mar 1 – Mar 7                                 │  BOTTOM · bgPrimary · padding 16 · period BodyLg textBody
│ [WeekStrip]                                   │  optional — OR —
│ Deducted        Balance                       │  `facts` · two Stat S side by side · label Caption textSecondary · value BodyLg SemiBold
│ ₹0              ₹6,000                        │  (2026-09-24, the Utsav bonus card)
└───────────────────────────────────────────────┘
```

Top height 160 dp without a WeekStrip below, 140 with. The figure is a Stat `L`: a plain count for streaks, jobs and
logins, or an Amount `L` on a money hero. The small icon after the figure and the watermark are the **same
glyph** — one meaning, twice (P1 allows the repeat because the watermark is decoration, not a second message).

**`facts` bottom.** A bonus wallet — the *Utsav bonus* card in *Expert (Sahil)* `8510:23259` (`references/expert-sahil-rewards-2026-09-24/` `01`) — needs two facts under the headline rather than a week: *Deducted ₹0 · Balance ₹6,000*. The bottom holds **two Stat `S`** in a row, labels first, `Divider` `row` between them, on the same `bgPrimary` 16 dp bottom. Tone is `reward` (a bonus is earned); the top's asset is the bonus's reward asset and the label is the bonus's name as text (*Utsav bonus*, like *Summer bonus*) — never a wordmark painted into the art (`assets.md`). A HeroCard has a WeekStrip **or** facts, never both; more than two facts is a Statement.

## Tones

| Tone | Top fill | Shipped on |
| --- | --- | --- |
| `streak` | brand pink gradient | Streak |
| `jobs` | success green gradient | Perfect jobs |
| `login` | info blue gradient | Early logins |
| `reward` | dark navy (`bgInverse` gradient) with a metallic reward asset instead of a glyph | Coins |

**Recorded departure.** Three trackers, three hues, and the hue means only *which tracker* — P6 reserves colour for
status. Kept as shipped: it costs nothing to reuse and a sprint to change; the design lead decides. If it changes,
the spec's answer is one tone (`reward`'s navy) with the glyph carrying identity.

## States

| State | Rendering |
| --- | --- |
| default | as drawn |
| zero | figure **0** stays, label unchanged, watermark at 30 % — *Your Current Streak · 0* is a true statement, not an empty state |
| loading | top fill intact, Skeleton for the figure; bottom Skeleton line |

No pressed state — the card is not a target. The WeekStrip inside it may be.

## Content

Label first, figure second (`stat-rating-divider.md`: she reads the name before the number). The label is what the
number counts, in her words: *Your Current Streak*, *Perfect jobs done*, *Early Logins done*. The period line is
written *Mar 1 – Mar 7* with an en dash, never `01/03–07/03`.

## Accessibility

- Spoken: *Your current streak, three. March 1 to March 7.* then the WeekStrip.
- Contrast: `textInverse` on each shipped fill — pink 4.0:1 ⚠ (same as `bgBrand`, tracked in `accessibility.md` § Open), green 3.8:1 ⚠ at label size, blue 4.6:1 ✅, navy 17.7:1 ✅. The Display-size figure passes on all four as large text. **The label at BodyLg on pink and green does not pass AA** — recorded; the fix is `textInverse` at Heading3 or the darker gradient stop under the label.
- The watermark is decorative and not announced.

## Sound

None.

## Do / don't

**Do** — one figure · label above it · the same glyph small and as watermark · the period under it · WeekStrip only when there is a week to show.

**Don't** — two figures · a Button in the card · a second colour inside the top · the watermark as the only icon (it bleeds off-screen at small widths).

## Figma reconciliation

No component. Create **HeroCard** on Components page `1:3886` with `Tone` (Streak / Jobs / Login / Reward), `Bottom`
(None / WeekStrip / Facts), and the figure bound to `Stat L`. Rebuild the Utsav bonus card in *Expert (Sahil)* as `Reward` + `Facts`. Bind fills to the three status gradients and `bgInverse`. Delete the
per-screen hero frames once instances are placed.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ |
| 3 | Phosphor only | ✅ `fire`, `arrow-right`, `seal-check` registered; coin is a reward asset |
| 4 | Target ≥ 48 dp | ✅ n/a — not a target |
| 5 | Meaning without colour | ✅ label + glyph carry it; tone is recorded as decoration |
| 6 | Meaning without text | ✅ glyph twice |
| 7 | States complete | ✅ default, zero, loading |
| 8 | Zero / empty honest | ✅ zero is a figure, not an empty state |
| 9 | Spoken label | ✅ |
| 10 | Indic budget | ✅ label wraps to two lines above the figure |
| 11 | One meaning | ✅ one figure, one period |
| 12 | Never a bare digit | ✅ the label names it |
| 13 | Not a status | ⚠ tone by tracker recorded as departure |
| 14 | Reuse checked | ✅ Card `hero` tried — it has no two-part fill and no WeekStrip slot; Stat L alone has no period |
| 15 | In app | ✅ four screens |
| 16 | Tier named | ✅ Tier 1 Core |
