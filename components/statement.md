# Statement

Status: **Proposed** · **In app** 2026-09-22 (*Total Earnings* monthly card, *Total Daily Earnings* card) · Tier 1 Core · Package: `SnabbitStatement` · Figma: composed from frames, no component

The money card. A tinted band with a title and the headline amount, a scalloped edge, then the lines that make it
up, a total, and where the money goes. It is the shape of both shipped earnings cards and it is the shape of any
ledger — a month's pay, a day's pay, a refill order. **Reuse this before drawing any new list of amounts.**

## What ships

`references/shipped-app-2026-09-22/08-statement-monthly.png` · `09-statement-daily.png`.

| Shipped | Slots used |
| --- | --- |
| **Total Earnings ₹11,800 + 🔒 ₹8,500** → Cash Collected −₹1,000 · Early Payout −₹3,000 · Loan EMI −₹1,200 · Training and Uniform Fees −₹500 *Deducted EMI (1/4)* · Joining Bonus 🔒 ₹8,500 → **Remaining Payout ₹800** → PAYOUT SCHEDULE · **5 APR** Monthly Payout ₹11,800 | band · rows · total · schedule |
| **Total Daily Earnings ₹7,680** → Min G ₹2,000 · Last Hour Min G Loss −₹21 · Base Pay ₹4,000 ⟨Work ₹3,430 · Check In ₹250 · Distance Bonus ₹10 · Summer Bonus ₹1,345⟩ · OT ₹200 · Adjustments ₹800 · Red Cards **2** −₹100 › · Red Cards Waiver ₹50 › → **Cash collected : ₹150** | band · rows with a nested breakup · rows with asset count and caret · footer band |

**Kept exactly as shipped.** `patterns/payout.md` had proposed re-shaping this card (hero as *You'll be paid*, the
band collapsed into an Accordion); that proposal is withdrawn in favour of the built thing. Departures from
principles are **recorded, not applied**: the band uses the success green as a heading colour (P6 reserves it for
status); the total appears in the band and again in the schedule; *Summer Bonus ☀️* uses an emoji as an icon
(`icons.md` bans it — the spec's row carries the `sun` glyph instead when it is redrawn, not before).

## Anatomy

```
┌───────────────────────────────────────────────┐  Card · radius lg · borderDefault
│ (₹) Total Earnings                 ₹11,800    │  BAND · bgSuccess · disc 40 textSuccess/bgPrimary · title Heading3 textSuccessStrong · Amount L textSuccessStrong
│                               + 🔒 ₹8,500     │  optional locked addition · Amount S locked
│~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~│  scalloped edge · 8 dp scallops · bgPrimary over the band
│ [icon] Cash Collected            − ₹1,000     │  ROW · icon 24 textBody · label BodyLg textPrimary · Amount M, signed
│ [icon] Training and Uniform Fees    −₹500     │
│        Deducted EMI (1/4)                     │  optional description BodyMd textSecondary
│ [icon] Joining Bonus            🔒 ₹8,500     │  locked row · Amount locked
│ [icon] Base Pay                    ₹4,000     │
│   ┌ Work                          ₹3,430 ┐    │  NESTED BREAKUP · panel bgSecondary radius lg · rows BodyMd textBody · Amount S
│   │ Check In                        ₹250 │    │
│   └ Summer Bonus                  ₹1,345 ┘    │
│ Red Cards  [🟥 2]               −₹100  ›      │  row with reward-asset count (red card + number) and caret → opens detail
│ ───────────────────────────────────────────── │  divider borderDefault · 16 dp above and below
│ [bank] Remaining Payout              ₹800     │  TOTAL · label SemiBold textSuccessStrong · Amount M SemiBold textSuccessStrong
│ ┌─ PAYOUT SCHEDULE ───────────────────────┐   │  SCHEDULE · panel bgSecondary · labelled divider Caption letterspaced
│ │ [5 APR] Monthly Payout        ₹11,800   │   │  date tile 48 bgInverse textInverse (day Heading3 · month Caption) · label · Amount M
│ └─────────────────────────────────────────┘   │
│ [icon] Cash collected : ₹150                  │  FOOTER BAND · bgSuccess · centred · textSuccessStrong · full width, bottom corners follow radius
└───────────────────────────────────────────────┘
```

Row height 48 dp; rows are separated by space, not dividers — the one `Divider` on the card is the one before the
total. Signs: a deduction is written `− ₹1,000` with a true minus; nothing is coloured red for being a deduction
(`amount.md`: a deduction is a fact, a penalty is a status). Locked amounts follow `amount.md` `locked`.

## Slots

| Slot | Required | Holds |
| --- | --- | --- |
| `band` | yes | disc icon · title · Amount `L` · optional `+ 🔒 Amount S` locked addition |
| `rows` | yes, 1–8 | icon **or Avatar 40** (when the line is a person — a friend's referral bonus) · label · optional description · Amount `M` (`positive` / signed negative / `locked` / `brand` when ready to claim) · optional **asset count** (red card + number) · optional `caret-right` when the row opens a detail |
| `breakup` | optional, per row | a `bgSecondary` panel of 2–5 sub-rows under one row — how a figure was made |
| `total` | optional | one emphasised row after the divider, `textSuccessStrong` |
| `schedule` | optional | a `bgSecondary` panel under a labelled Caption heading, 1–3 rows each with a **date tile** leading |
| `footer` | optional | a tinted band with one centred fact |

At most one of `schedule` / `footer` — both exist in the app, on different cards, never together.

## Kinds

Not kinds — **uses**. The same component, different rows:

| Use | Band | Rows | Ends with |
| --- | --- | --- | --- |
| Month statement | *Total Earnings* + locked bonus | deductions | total + schedule |
| Day statement | *Total Daily Earnings* | additions, one with a breakup, two with caret | footer band |
| **Refill order** (Beauty) | *This refill* ₹1,240 · *from this month's pay* | products: name · *used 6 of 8* · ₹360 | schedule: Placed · Packed · On the way · Delivered as dated rows |
| **Referral earnings** (`patterns/referral.md`, 2026-09-24) | *Earned from friends* ₹2,000 | one row per friend, **Avatar 40** leading: *Kriti Patel · 7 of 7 days · ready to claim* Amount `brand` › · *Sita Rao · 5 of 7 days* Amount `locked` *after day 7* · *Kriti Patel · claimed Fri 12 Sep* `+ ₹2,000` | schedule **ON ITS WAY**: date tile · *Sita's bonus* · ₹2,000 |

The third row is why this exists as a component and not a payout composition; the fourth is why the row's leading slot takes an Avatar — the proposed Refer screen drew each friend as a card with a green *Claim* Button, a phone and a WhatsApp icon in the row, and the shipped money card already had every one of those states as a row.

## States

| State | Rendering |
| --- | --- |
| default | as drawn |
| a row that opens | `caret-right`, pressed `bgSecondary` wash on the row only |
| locked figure | `amount.md` `locked` — lock icon, `textTertiary` digits, the condition in the description |
| empty rows | the band alone with *Nothing yet this month* as a single `textSecondary` row — never an empty card |
| loading | band intact with a Skeleton amount; three Skeleton rows |

## Content

Row labels are her words for the thing: *Cash you collected*, *Loan EMI*, *Training kit EMI · 1 of 4* — the shipped
labels are kept where they are already hers and flagged in `payout.md` where they are not (*Adjustments*). The
schedule heading is the one letterspaced Caption in the system, inherited from the app. Every amount follows
`amount.md`'s formatting rules.

## Accessibility

- Read top to bottom: band title and amount, each row as *label, amount*, the total, then the schedule. The locked
  addition reads *plus eight thousand five hundred rupees, locked*.
- Contrast: `textSuccessStrong` on `bgSuccess` 5.5:1 ✅; `textPrimary` rows 17.7:1; `textSecondary` descriptions 4.8:1; date tile `textInverse` on `bgInverse` 17.7:1.
- Rows that open are 48 dp targets; nothing else is a target.
- At font scale 1.3 labels wrap to two lines and amounts stay on one; the nested breakup keeps its indent.

## Sound

None. The screen's VoicePrompt reads the card.

## Do / don't

**Do** — one Statement per figure she is owed or has earned · true minus signs · the total after the one divider ·
locked money as `locked`, not greyed text · a date tile on every schedule row.

**Don't** — colour a deduction red · two totals in the body · a Button inside the card · a second Divider · use it for a list that is not money (that is ListItem).

## Figma reconciliation

No component; both cards are frames. Create **Statement** on Components page `1:3886` with slots `Band`, `Rows`
(a `StatementRow` sub-component: `Amount` state Positive / Negative / Locked; booleans `Description`, `AssetCount`,
`Caret`, `Breakup`), `Total`, `Schedule` (with a `DateTile` sub-component), `Footer`. Bind the band to
`bgSuccess` / `textSuccessStrong`, amounts to `Amount L/M/S`. Replace the ☀️ with the `sun` glyph.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ Heading3 / BodyLg / BodyMd / Caption / Amount |
| 3 | Phosphor only | ⚠ shipped *Summer Bonus ☀️* recorded; `sun` on redraw |
| 4 | Target ≥ 48 dp | ✅ rows that open are 48 dp |
| 5 | Meaning without colour | ✅ signs, lock icon, the divider before the total |
| 6 | Meaning without text | ✅ icon per row, date tile, asset count |
| 7 | States complete | ✅ default, opens, locked, empty, loading |
| 8 | Zero / empty honest | ✅ *Nothing yet this month*, never `₹0` |
| 9 | Spoken label | ✅ row by row, locked spoken as locked |
| 10 | Indic budget | ✅ labels wrap, amounts never do |
| 11 | One meaning | ✅ money she is owed or earned, made of its parts |
| 12 | Never a bare digit | ✅ every figure has ₹ |
| 13 | Not a status | ⚠ band green recorded as a shipped departure, kept |
| 14 | Reuse checked | ✅ Accordion `breakdown` tried — the shipped card is static and has a schedule; ListItem tried — no band, no total |
| 15 | In app | ✅ two cards, 2026-09-22 |
| 16 | Tier named | ✅ Tier 1 Core |
