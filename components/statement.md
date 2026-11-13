# Statement

Status: **Proposed** · **In app** 2026-09-22 (*Total Earnings* monthly card, *Total Daily Earnings* card; schedule-row status read 2026-10-23) · Tier 1 Core · Package: `SnabbitStatement` · Figma: composed from frames, no component

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
│ │ [3 NOV] Monthly Payout        ₹11,800 › │   │  a row with a STATUS · tile in its tone · label
│ │   ⟳ Didn't reach your bank · trying …   │   │  status line · icon 16 + BodyMd in the tone's strong text · ≤ 2 lines · caret when the row opens
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
| `band` | yes | disc icon · title · Amount `L` · optional `+ 🔒 Amount S` locked addition · optional **date line** `BodyMd` under the amount (*on 15 Feb*) when the headline is money that is on its way (2026-10-05, `projects/earnings-page-revamp`) |
| `rows` | yes, 1–8 | icon **or Avatar 40** (when the line is a person — a friend's referral bonus) · label · optional description · Amount `M` (`positive` / signed negative / `locked` / `brand` when ready to claim) · optional **asset count** (red card + number) · optional `caret-right` when the row opens a detail |
| `breakup` | optional, per row | a `bgSecondary` panel of 2–5 sub-rows under one row — how a figure was made |
| `total` | optional | one emphasised row after the divider, `textSuccessStrong` |
| `schedule` | optional | a `bgSecondary` panel under a labelled Caption heading, 1–3 rows each with a **date tile** leading and an optional **status** (§ *Schedule row status*) |
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

## Schedule row status

**What ships.** The live month statement (`references/SCREENS.md` → *PLEASE REFER – DESIGN UPDATE* → EARNINGS
`6705:133339`) already tells her where each payout is, inside the schedule row: the **date tile is tinted** and a
**status line** sits under the name — navy and nothing (scheduled), green *Paid on 29 March | UTR:1234567890*, orange
*Payment is under processing…*, red *Add UPI / bank account to enable payout ›*. The spec drew every tile `bgInverse`
with no line; it now catches up with the app (2026-10-23, `projects/payouts-revamp`). What each status *means* for a
payout is `patterns/payout.md` § 2; this section is only how a status renders.

| Tone | Means to her | Leading slot | Status line | Icon |
| --- | --- | --- | --- | --- |
| `neutral` | it is planned; nothing is happening yet | **date tile** `bgInverse` · `textInverse` (as shipped) | `textSecondary`, or none | `calendar-blank` 16 leading the line when it names a date, else none |
| `moving` | it is on its way and nothing is wrong — **she has nothing to do** | **status disc** `bgPrimary` on a `bgInfoSubtle` card wash · icon `textInfoStrong` | `textInfoStrong` | `clock` |
| `waiting` | something went wrong and **we** are fixing it — **she has nothing to do** | **status disc** on a `bgWarningSubtle` wash · icon `textWarningStrong` | `textWarningStrong` | `arrow-clockwise` (we are trying again) · `clock` (on hold) |
| `done` | it reached her bank | **status disc** on a `bgSuccessSubtle` wash · icon `textSuccessStrong` | `textSuccessStrong` | `check-circle` fill |
| `needs-her` | it will not move **until she does something** | **status disc** on a `bgErrorSubtle` wash · icon `textErrorStrong` | `textErrorStrong`, ends with `›` | `x-circle`, or `bank` when the thing to do is about her bank account |

Rules:

- **The date tile while the money is coming; a status disc once something has happened** (2026-10-29,
  `projects/payouts-revamp`, from the lead's card C2). Before the payout the date *is* the news, so the 48 dp tile
  says *2 AUG*. After it is sent, the state is the news, so the same 48 dp slot holds a white disc with the tone's
  icon (24, flat Phosphor), and the **status line carries the only date** (*Expected by 3 August*, *Paid on 3
  August*). Keeping the tile would show two dates — the day it was sent and the day it lands — and she cannot tell
  which one is about her money. The disc is **flat**: a metallic 3D clock or tick reads as a reward (`assets.md`,
  "if it shines, it's earned").
- **Blue means it is moving; amber means we are fixing it; red means she must act; green means it is done.** One
  colour, one meaning (P1): *sent / processing* is `moving` (blue), never amber, so a normal payout never looks like a
  troubled one. A failure that the system will retry on its own is `waiting` (amber), not `needs-her` — the line says
  what happened and when we try again. Red is kept for the moment a tap from her is the only way forward (P5 honest,
  P6 no red shouting at a miss she did not cause).
- **One status line, one idea** (`content.md`): what happened · what happens next. At most two lines at font scale
  1.3; the amount stays on one line.
- **A row with something to read or do opens** (`caret-right` on the status line, the whole 48 dp+ row is the target)
  into a BottomSheet `info` that carries the reason and the one action. **The action never sits in the card** — the
  Statement holds no Button (*Don't*, below); the shipped red row already works this way (*Add UPI / bank account ›*).
- Status is tile tone **+** icon **+** words — never the tint alone (P1, checklist row 4).
- A schedule row with no status is `neutral` with no line, exactly as shipped.

**Departure from the shipped tile, recorded.** The app fills the tile with *solid* green, orange and red under white
digits. White on `textWarning` is 3.2:1 and on `textSuccess` under 4.5:1 at the tile's 18 sp —
the same reason `tag.md` disallows warning solid. The spec keeps the tile's size, shape and digits and uses the soft
wash with the strong text step (`bg*Subtle` + `text*Strong`, the pairing `tag.md` measured at ≥ 4.6:1). The navy
`neutral` tile is unchanged. `text*Strong` remain the component-owned proposals named in `tag.md` until they are
added to `tokens.json`.

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

The band's title says **what the figure is to her**, not what the ledger calls it: *You'll get* (a payout on its way, with the date line *on 15 Feb*), *Today* (a day's pay), *This job*. *Total Earnings* and *Total Daily Earnings* are the shipped titles and stay on the shipped cards until those are re-cut; new uses take the plain title (`projects/earnings-page-revamp`, 2026-10-05). When the card's rows are the three money buckets — *Earned · Added · Taken* — each row leads with its bucket icon (`foundations/icons.md`: `briefcase`, `arrow-circle-up`, `arrow-circle-down`) and opens its lines one tap down; the total after the Divider is the payout.

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
locked money as `locked`, not greyed text · a date tile on every schedule row · a status as tone + icon + one line, and the action one tap down in a sheet.

**Don't** — colour a deduction red · two totals in the body · a Button inside the card · a second Divider · use it for a list that is not money (that is ListItem) · paint a schedule row red while the system is still retrying on its own · list every attempt of a payout as its own row (one row, its current status).

## Figma reconciliation

No component; both cards are frames. Create **Statement** on Components page `1:3886` with slots `Band`, `Rows`
(a `StatementRow` sub-component: `Amount` state Positive / Negative / Locked; booleans `Description`, `AssetCount`,
`Caret`, `Breakup`), `Total`, `Schedule` (with a `DateTile` sub-component — variant `Tone` Neutral (date tile) / Moving / Waiting / Done / NeedsHer (status disc) — and a `StatusLine` boolean with an icon slot), `Footer`. The shipped solid tiles map to the soft tones (§ *Schedule row status*). Bind the band to
`bgSuccess` / `textSuccessStrong`, amounts to `Amount L/M/S`. Replace the ☀️ with the `sun` glyph.

## Acceptance checklist

| # | Check | Verdict |
| --- | --- | --- |
| 1 | Tokens only | ✅ |
| 2 | Outfit only | ✅ Heading3 / BodyLg / BodyMd / Caption / Amount |
| 3 | Phosphor only | ⚠ shipped *Summer Bonus ☀️* recorded; `sun` on redraw |
| 4 | Target ≥ 48 dp | ✅ rows that open are 48 dp |
| 5 | Meaning without colour | ✅ signs, lock icon, the divider before the total; schedule status as tone + icon + words |
| 6 | Meaning without text | ✅ icon per row, date tile, asset count |
| 7 | States complete | ✅ default, opens, locked, empty, loading; schedule row `neutral` · `waiting` · `done` · `needs-her` |
| 8 | Zero / empty honest | ✅ *Nothing yet this month*, never `₹0` |
| 9 | Spoken label | ✅ row by row, locked spoken as locked |
| 10 | Indic budget | ✅ labels wrap, amounts never do |
| 11 | One meaning | ✅ money she is owed or earned, made of its parts |
| 12 | Never a bare digit | ✅ every figure has ₹ |
| 13 | Not a status | ⚠ band green recorded as a shipped departure, kept |
| 14 | Reuse checked | ✅ Accordion `breakdown` tried — the shipped card is static and has a schedule; ListItem tried — no band, no total |
| 15 | In app | ✅ two cards, 2026-09-22 |
| 16 | Tier named | ✅ Tier 1 Core |
