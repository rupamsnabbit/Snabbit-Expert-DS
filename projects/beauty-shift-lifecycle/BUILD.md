# Build plan — Shift Lifecycle · Beauty · Inventory page

Written 2026-09-22 **before** the rework of the Paper page `Inventory` (`4-0`), after reading, in order:
`references/shipped-app-2026-09-22/` → `patterns/payout.md` (§ 1 Statement, § 2 Schedule states) → every spec in
`components/` (kinds listed by grep, then the relevant specs in full). Sources in that order and no other.

**Built 2026-09-22 from these rows; one row corrected during build (B2 schedule).** **What this plan changes from the board as drawn on 2026-09-21:** every money or product list becomes a
**Statement**, every product grid becomes **ListItem rows**, the two-segment split bar goes (ProgressBar has no
split; the two numbers become a Stat pair), and every screen names what it inherits.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| **all** · status bar, header | `HeaderNav default` (back · title) | `components/header-nav.md` | — | — |
| **all** · primary action | `Button primary brand L`, full width, bottom | `components/button.md` | — | — |
| **all** · step rail (A1–A4) | `ProgressBar segmented` 4 segments | `components/progress-bar.md` § Kinds | — | — |
| **A1** · title + subtitle | Heading2 + BodyLg secondary | `foundations/type.md` | — | — |
| **A1** · refill rows ×6 | `ListItem selection` (leading Checkbox) · image 40 leading · `quantity` instruction *add 2* trailing | `components/list-item.md` § Slots, § quantity | Statement row rhythm: 48–56 dp, BodyLg label, no per-row dividers | — |
| **A1** · footer | `ProgressBar linear` + count *1 of 6 added* + Button | `progress-bar.md`, `button.md` | — | — |
| **A2** · title (statement of fact) | Heading2 *What should be in your bag* | `type.md` | — | — |
| **A2** · pouch rows ×5 | `ListItem selection` · pouch icon 40 leading · title + *9 things* trailing meta · description line = contents names *+3* · inline `VoicePrompt` | `list-item.md` (kinds, description), `voice-prompt.md` | Statement row: description BodyMd secondary under the title | — |
| **A2** · ticked pouch collapse | ListItem `selected` state; description hidden | `list-item.md` § States | — | — |
| **A3** · spot-check rows ×2 | `ListItem selection` with a 72 dp image leading, trailing tick disc | `list-item.md` | — | — |
| **A3** · why-line | `Banner info` | `components/feedback.md` | — | — |
| **A4** · bag summary | `Card static` · `Stat L` *38 of 41* + label · `ProgressBar linear` | `card.md`, `stat-rating-divider.md`, `progress-bar.md` | — | — |
| **A4** · still-not-in-bag | **ListItem rows** (image 40 · name · `quantity` *add 1*) under a Caption heading — **replaces the two tiles** | `list-item.md` | Statement row rhythm | ProductTile — withdrawn to briefs/; a grid is for browsing, this is a list she acts on |
| **A4** · red-card risk | `Banner warning` | `feedback.md` | — | — |
| **A4a** · missing items | `ListItem` (image · name · *You needed 1*) with a `Chip reason` row beneath | `list-item.md`, `chip.md` § reason | — | — |
| **B1** · refill notice | `Card tappable` · truck icon 48 · title · date line · names line · *Track* | `card.md` | Statement `footer` line style for the names line | Nudge `gain` — it is a notice, not a nudge to act |
| **B1** · bag status row | `ListItem navigational` · bag icon · *38 of 41 in your bag* · `ProgressBar S` beneath | `list-item.md` § fill bar | — | — |
| **B2** · pager | DatePicker header, **week pager** form ‹ *2 – 8 Feb* · *RPL-2418* › | `date-picker.md` § Month header | — | — |
| **B2** · status headline + arrival | Heading1 stage name + BodyLg date line | `type.md` | HeroCard label/figure order: name first | — |
| **B2** · tracker | `Stepper tracker` rail, 4 nodes, paired line beneath | `stepper.md` § tracker | In app via the tier rail (`progression`) — same node/connector anatomy | Statement `schedule` rows alone — PRD § 7 asks for the four stages as a stepper |
| **B2** · the money and the items | **`Statement`** — band *This refill* **₹1,240** *from this month's pay*; rows = pouches (*Facial & Clean-up* **+17**) each with a `breakup` of products (*Facial kit · used 6 of 8 · ₹360 · +6*); total *Taken from this month's pay*; `schedule` = **the arrival only** — one dated row, *8 FEB · Wednesday, your week off* — because the four stages are already on the `Stepper tracker` above and the shipped schedule panel is one dated row (*5 APR · Monthly Payout*), not a log | `components/statement.md`, `payout.md` § 2 | — | four stages as schedule rows — duplicated the tracker; corrected during build |
| **B2** · actions | `Button primary` *Mark received* · `Button secondary neutral` *Report issue* | `button.md` | — | — |
| **B2** · explainer | `HowToClip card` in a one-card row | `how-to-clip.md` | — | — |
| **B3** · sheet | `BottomSheet confirm` · pictogram 96 · title · body · summary row · two stacked Buttons | `bottom-sheet.md` § confirm | Statement row for the summary line | — |
| **B4** · success | `EmptyState section` used as a result (icon disc, Heading3, BodyMd) | `empty-state.md` | — | — |
| **B4** · before / after | `Card static` · **two `Stat M`** *At home before 20 of 24* → *Now 24 of 24* · `ProgressBar linear` | `stat-rating-divider.md` (≤ 4 Stats, 2 per row) | — | — |
| **B2a** · nothing to refill | `EmptyState page · empty` · `Banner info` · `Button secondary` | `empty-state.md` § empty | — | — |
| **C1** · tabs | `Tabs segmented` *Orders · Your stock* | `components/tabs.md` | — | — |
| **C1** · summary | `Card static` · `Stat L` **58 of 65** + label · `Tag warning` *7 short* · `ProgressBar linear` (total) · **two `Stat S`** *38 in your bag* · *20 at home* — **replaces the two-segment bar** | `stat-rating-divider.md`, `progress-bar.md`, `tag.md` | — | two-segment bar — ProgressBar has no split kind; the split is two facts, so two Stats |
| **C1** · pouch rows ×5 | `ListItem navigational` · pouch icon 44 leading · title · `quantity of-total` *13 of 15* trailing · `ProgressBar S` beneath · description *7 in bag · 6 at home* | `list-item.md` § quantity, § fill bar | — | pouch *cards* — a list she scans is rows |
| **C2** · pouch header | Heading + `Stat S` *7 of 9 things* + `ProgressBar S` | `stat-rating-divider.md` | — | — |
| **C2** · products ×6 | **`ListItem informational` rows** · image 40 leading · name · `quantity` bare count *6 kits* trailing · description *2 at home*; zero = `disabled` state with *0 left · in your next refill* — **replaces the tile grid** | `list-item.md` § States | Statement row rhythm | ProductTile — withdrawn; the shipped breakup row is this |
| **C3** · product hero | `Card static` · image 120 · `Stat L` *6 kits* + label | `card.md`, `stat-rating-divider.md` | HeroCard order: label then figure | HeroCard — its tones are rewards; a product is not |
| **C3** · facts | `ListItem informational` ×2 (*You should carry · 8 kits*, *Also at home · 2 kits*) | `list-item.md` | Statement row | — |
| **C3** · coming | `ListItem navigational` with truck icon · *6 more coming · Wednesday · ₹360* | `list-item.md` | — | — |
| **C3** · used in | `Tag neutral` row | `tag.md` | — | Chip `filter` — nothing is being filtered |
| **D1** · tabs | `Tabs segmented` | `tabs.md` | — | — |
| **D1** · three stats | **three `Stat M` in one Card, 3 across** — PRD § 7 says three tiles; `stat-rating-divider.md` says 2 per row | `stat-rating-divider.md` | — | 2 × 2 grid — PRD asks for exactly three; recorded as a departure from the spec's grid rule |
| **D1** · newest order (expanded) | **`Statement`** inside a `Card expandable` open: band *2 – 8 Feb* · `Tag` *On the way* · **₹1,240**; rows = products (name · *used 6 of 8 · ₹360* · **+6**) — three shown; row *See all 12 products ›*; `schedule` = the four stages as dated rows with date tiles + Tags; footer row *Track this order* | `statement.md`, `card.md` § expandable, `payout.md` § 2 | — | — |
| **D1** · older orders (collapsed) | `Card expandable` header only: date range · *29 things · ₹980* · `Tag success` *Delivered* · caret | `card.md`, `tag.md` | Statement band type: BodyLg title, Amount M | — |
| **D2** · order detail | **`Statement`** full: band *26 Jan – 1 Feb* · `Tag success` *Delivered 1 Feb* · **₹980** *from January pay*; rows = pouches with `breakup` of products (name · *used x of y* · ₹ · **+n**); one Divider; total *29 things · from January pay ₹980*; `schedule` = Placed 26 Jan · Packed 28 Jan · On the way 31 Jan · Delivered 1 Feb, date tiles, Tags | `statement.md` | — | — |
| **D2** · pager | DatePicker header, week/order pager ‹ *26 Jan – 1 Feb* › | `date-picker.md` | — | — |

## Departures recorded by this plan

| Where | Departure | Why kept |
| --- | --- | --- |
| D1 three stats 3-across | `stat-rating-divider.md` rules 2 per row | PRD § 7 specifies three tiles; the shipped ledger design intent |
| B2 Stepper `tracker` | not literally in the app | PRD § 7 asks for the four stages as a stepper; Stepper rails ship (tier rail); anatomy inherited |

## Removed by this plan

ProductTile grids on A4, C2 (and B2/D2, which become Statement breakups) · the two-segment split bar on C1 · the
per-pouch *cards* on C1 (now rows).
