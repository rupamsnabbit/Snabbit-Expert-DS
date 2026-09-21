# The shipped app — seven screens, read as a component map

| | |
| --- | --- |
| Source | **The live Expert app**, Android, screenshots from the design lead, 2026-09-22 |
| Why | Tech feedback: low bandwidth; **reuse what exists, build new only where the existing thing cannot do the job**. The Beauty inventory ledger was designed as new surfaces when the Payout statement already had the shape |
| Files | `01-tier-gold.png` · `02-base-pay-sheet.png` · `03-coins.png` · `04-trackers-three.png` · `05-streak.png` · `06-earnings-march.png` · `07-rate-card.png` · **second batch:** `08-statement-monthly.png` · `09-statement-daily.png` · `10-coins-week.png` · `11-hero-streak.png` · `12-hero-perfect-jobs.png` · `13-hero-early-logins.png` — **to be dropped in by the design lead; the images arrived pasted, not as files** |
| Rule this created | `principles/EXTENDING.md` § *Reuse before you invent* — the first reference read is this folder |

This is not a Mobbin read. Nothing here is translated; it is **what she uses today**, and it outranks Figma as evidence
because it is what tech has already built. Every region below is mapped to the system component it *is*, with one of
four verdicts:

- **ships · specced** — the component exists in the app and in `components/`. Reuse. Zero build.
- **ships · needs variant** — the component exists in both, but this screen shows a kind or state the spec lacks. Add the variant; small build or none.
- **ships · spec disagrees** — the app does it, the spec forbids or changes it, and the departure is recorded so the design lead decides. Reusing as-is costs nothing.
- **not in the system** — the app has it, we never specced it. Add it *as the app has it* first.

---

## 01 · Tier — Gold

| Region | Is | Verdict |
| --- | --- | --- |
| Metallic Gold badge on a dark radial ground, tier name | `foundations/assets.md` reward layer (metallic 3D, tiers) + Heading | ships · specced |
| Coin header action (coin · *20*) | HeaderNav `HeaderAction` (`DECISIONS.md` 2026-09-08) | ships · specced |
| **Tier rail** — Base → Silver → **Gold** (avatar) → Diamond 🔒 → Pink Diamond 🔒, connector filled to current | **Stepper `progression`** — a rail where nodes are **earned**, so `locked` is allowed and nodes are reward assets. Stepper `tracker` forbade `locked` (*"nothing here is earned"*); tiers are the case where it is | ships · needs variant → `stepper.md` |
| *20 Snabbit coins · 30* progress bar with a coin marker and a lock at the end; *Week 1* folded tab | ProgressBar with `markers` (spec § Markers) inside a Card; the tab is a Tag | ships · specced |
| **Payout Benefits** rows — icon disc · *Base Pay* · *₹110/hr + 15/hr* · **Extra** pill | ListItem `informational`, Amount `S` trailing. **Two trailing things** (Amount + Tag) — `list-item.md` allows only Amount + caret | ships · spec disagrees — recorded; proposal: the *+15/hr Extra* becomes the description line |
| **Other Benefits** — 3-across tiles, gold-ring icon disc, label, locked tiles dimmed | **BenefitTile** | **not in the system** → `components/benefit-tile.md` |

## 02 · Base Pay sheet

| Region | Is | Verdict |
| --- | --- | --- |
| Sheet with the close X floating above it | BottomSheet | ships · specced |
| Icon disc · **Base Pay** · *Base Pay across Tiers* | Sheet header composition (Card `hero` at sheet size) | ships · specced as composition |
| Tier rows — badge asset · *Gold* · avatar · *₹110 + ₹10*; **her row tinted** | ListItem `informational`, reward asset leading, Amount `S` trailing; her row is the `selected` rendering plus an Avatar `XS` — a *you are here* row | ships · needs a one-line rule → `list-item.md` |
| **See Rate Card** | Button `primary · brand` | ships · specced |

## 03 · Snabbit Coins

| Region | Is | Verdict |
| --- | --- | --- |
| Dark hero, 3D coin stack, *Snabbit Coins* **40** | **Card `hero`** (new kind) + Stat `L` + reward asset | ships · needs variant → `card.md` |
| *Early Login · Perfect Job · Daily Streak* tiles, **three different disc colours** (blue · green · pink) | BenefitTile `earn` | not in the system; **colour is a P6 departure** — three hues that mean nothing but "different". Proposal: one disc colour, identity by icon |
| *How to earn Gold coins* ▾ with **circular** video thumbnails | Accordion `faq` + HowToClip **`story`** (circular 72 dp) — spec has only the 144 × 180 card | ships · spec disagrees → `how-to-clip.md` gains `story`, kept as shipped |

## 04 · 05 · Trackers — Streak · Perfect Jobs · Early logins

| Region | Is | Verdict |
| --- | --- | --- |
| **Coloured hero card** — big number, icon, date range, then a Mo–Su week strip with coin marks | Card `hero` + Stat `L` + **DatePicker `strip`** read-only with markers | Card `hero` needs adding; strip ships · specced. **Three hero colours** (pink · green · blue) are the same P6 departure as the tiles — recorded, kept as shipped for now |
| **Week accordions tinted by tier** — *Week 1 · Silver* grey · Gold · Diamond blue · Pink Diamond pink · No Tier brown, coin count right | Accordion with a **`tier`** header tint + Stat `S` coin trailing | ships · spec disagrees. **Kept**: tiers are rewards, and `assets.md` already reserves colour for the reward layer — the tint is the badge's own colour at low opacity, not a status colour → `accordion.md` |
| Day rows — grey disc · *1 Mar, Mon* · coin **2** | ListItem, Avatar placeholder leading, Stat `S` (coin asset + number) trailing | ships · specced |
| *Helpful tips and guide* circles | HowToClip `story` | as above |

## 06 · Earnings — March 2025

| Region | Is | Verdict |
| --- | --- | --- |
| HeaderNav with *Expert ID: 14586* subtitle and **Payout Issue** action | HeaderNav | ships · specced (subtitle is a small addition) |
| **‹ March 2025 ›** | DatePicker **month header**, standalone — the *month pager* `patterns/payout.md` already names | ships · needs a line → `date-picker.md` |
| **Total Earnings** green band → deductions → *Remaining Payout* → **PAYOUT SCHEDULE** date chip | **Accordion `breakdown`** + Amount `locked` + ListItem schedule rows with a date tile. **Already fully specified in `patterns/payout.md` § 1**, with its departures (green as heading colour; total shown twice) recorded there | ships · specced |
| **Monthly Earnings Breakup** rows — label · Amount / 🔒 / *Check ›* | ListItem `navigational`, Amount `S` or `locked`, `caret-right` — **`patterns/payout.md` line 38** | ships · specced. **This is the row the Beauty ledger should have used** |
| Penalties — *Red Cards ›* **5** | ListItem + `asset/reward/red-card` count (`tag.md`: red cards are assets, not tags) | ships · specced |
| Other Actions rows | ListItem `navigational` with icon | ships · specced |
| Add UPI / Add PAN with yellow banners | Card `empty` + Banner; `payout.md` proposes a Stepper instead — recorded | ships · specced |

## 07 · Rate card — Vishwaas

| Region | Is | Verdict |
| --- | --- | --- |
| Month pager + *Vishwaas* promo banner | month pager; the banner is a promo asset | ships |
| **Daily Earnings — Min G**: tiers × Mon–Fri / Sat / Sun | **RateTable `matrix`** | **not in the system** → `components/rate-table.md` |
| *Or* | Divider `labelled` | ships · specced |
| **Job Earnings**: one table per tier, rows *Work · Check In · Summer Bonus · Distance Bonus* joined by **+**, *Base Pay* after **=** | **RateTable `sum`** | not in the system |
| Shakti Bonus — Classic / Super / Premium | RateTable `matrix` | not in the system |
| Speaker per section | VoicePrompt | ships · specced |
| ⓘ on *Check In* | Tooltip — `coachmark.md` says a tooltip is a tap she cannot discover; the words move into the row or the speaker | ships · spec disagrees, already recorded in `payout.md` |

## 08 · 09 · The two earnings cards, cropped

| Region | Is | Verdict |
| --- | --- | --- |
| Green band · disc · *Total Earnings* · **₹11,800** · *+ 🔒 ₹8,500* · scalloped edge | **Statement** `band` | not in the system → `components/statement.md` |
| Icon rows with signed amounts, one with *Deducted EMI (1/4)*, one locked | Statement `rows` | same |
| Divider · **Remaining Payout ₹800** in green | Statement `total` | same |
| PAYOUT SCHEDULE panel · **5 APR** date tile · Monthly Payout · ₹11,800 | Statement `schedule` with a **date tile** | same |
| Daily card: *Base Pay ₹4,000* with an inset *Work · Check In · Distance Bonus · Summer Bonus ☀️* | Statement row with `breakup` | same; ☀️ emoji recorded |
| *Red Cards* **🟥 2** −₹100 › · *Red Cards Waiver* ₹50 › | Statement rows with asset count + caret | same |
| *Cash collected : ₹150* green footer | Statement `footer` | same |

## 10 · Coins with a week pager

| Region | Is | Verdict |
| --- | --- | --- |
| ‹ **Week 1** · *01 Mar to 07 Mar* › | DatePicker month header as a **week pager** — same control, week label with a date-range subtitle | ships · needs a line → `date-picker.md` |
| Day rows *1 Mar, Mon* · coin **2** › in one card | ListItem `navigational`, Stat `S` (coin asset + number) trailing | ships · specced |

## 11 · 12 · 13 · The three hero cards, cropped

| Region | Is | Verdict |
| --- | --- | --- |
| Filled top (pink / green / blue gradient), label, **big figure + small glyph**, large watermark glyph, concentric arcs | **HeroCard** `top` | not in the system → `components/hero-card.md` |
| White bottom with *Mar 1 – Mar 7* | HeroCard `bottom` | same |
| Streak: coin markers above Mo · Fr · Sa · Su, weekday row, **1–7 in one pink pill**, Su in red | **WeekStrip** `band` + markers | not in the system → `components/week-strip.md`; red Sunday recorded |
| Early logins: weekday row, **7–13 as blue circles, the 10th grey** | WeekStrip `dots` | same |

---

## What this says about the Beauty inventory ledger

It should have been screen 06 with the nouns changed. Month pager → **order pager**. *Total Earnings* band →
**this order's cost**. *Monthly Earnings Breakup* rows → **the products in it**, name · *used 6 of 8* · ₹, Amount `S`
trailing, `caret-right`. Payout schedule rows → **Placed · Packed · On the way · Delivered** as dated rows with Tags.
Every one of those is a component tech has already built. Instead the board got a ProductTile grid and a two-segment
bar — both new. The rework is project work and is logged there, not here.

## What is genuinely missing, in order of build cost

| Component | Why the app needs it and nothing existing serves | Cost |
| --- | --- | --- |
| **Statement** | both earnings cards, and every ledger — a band, rows, a total, a schedule with date tiles; Accordion `breakdown` is collapsible and has none of the last three | medium — but it replaces every future money list |
| **HeroCard** | four screens open with a two-part filled card; Card `hero` had no two-part fill and no WeekStrip slot | small |
| **WeekStrip** | two heroes show a week as a record; DatePicker `strip` is 64 dp picking tiles | small |
| **BenefitTile** | 12 benefit tiles and 3 earn tiles on two screens; SelectionCard is for choosing, ListItem is a row | small — one tile, two kinds, one locked state |
| **RateTable** | A 5 × 3 rate matrix and a 5-row sum with operators cannot be ListItems — the *columns* carry the meaning | medium — the system's only table |
| Stepper `progression` | tier rail; Stepper `tracker` exists but forbids `locked` and does not know reward-asset nodes | small — a mode on an existing component |
| Card `hero` | three screens open with a coloured hero and a Stat `L` | small — a kind on an existing component |
| Accordion `tier` · HowToClip `story` · DatePicker month pager · ListItem *you are here* | variants of things that ship | none — spec catches up with the app |
