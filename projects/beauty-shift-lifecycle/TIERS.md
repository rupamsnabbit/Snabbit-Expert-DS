# Tiers — Shift Lifecycle · Beauty Category

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). Flows are in `FLOWS.md`; this is the plan behind them.

**Inherit / invent** is the second axis, and it decides where the design comes from: an *inherit* surface is matched to the shipped Figma frame; an *invent* surface is designed from `principles/` first. A *New* row in the PRD is always invent, even when a Figma version of it exists.

## Surfaces

| # | Surface (PRD's words) | § | Tier | Inherit / invent | Built from | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Attendance for next 3 days | 1 | 2 composition | **invent** | Card, SelectionCard `compact`, Tag, Nudge `loss`, BottomSheet `confirm` | exists |
| 2 | Weekoff state | 1 | 2 composition | **invent** | Card `static`, Tag `brand`, rest pictogram | needs asset |
| 3 | Change D+1 after cutoff | 1 | 1 core | inherit | BottomSheet `confirm`, Button `primary danger` | exists |
| 4 | Today's first job on Home | 2 | 2 composition | **invent** | Card `static`, Tag, icons `clock` `spray-bottle` `map-pin` | exists |
| 5 | Boundary check — inside | 2 | 1 core + change | **invent** | MapSnippet, MapMarker `me`, Button `primary` | **needs core change** — area shape |
| 6 | Boundary check — outside | 2 | 2 composition | **invent** | as above + Nudge `loss`, Button `secondary` | needs #5 |
| 7 | Bag status — all clear | 2 | 1 core | **invent** | BottomSheet `info`, packed-bag pictogram | needs asset |
| 8 | Bag status — flagged | 2 | 1 core | **invent** | BottomSheet `confirm`, Nudge `loss` | needs asset |
| 9 | Selfie | 2 | 1 core | inherit | MediaCapture | exists |
| 10 | Lunch window + countdown | 3 | 1 core | inherit | Timer `L countdown`, Button `disabled` + reason | exists |
| 11 | End shift confirm | 4 | 1 core | inherit | BottomSheet `confirm` | exists |
| 12 | Emergency logout (menstrual leave) | 4 | 1 core | inherit | BottomSheet `confirm`, Radio group | exists — **copy rewrite** |
| 13 | Shift ended moment | 4 | 2 composition | inherit | success moment, sound | exists |
| 14 | Daily earnings | 4 | — | inherit | `patterns/earnings.md` | exists, unchanged |
| 15 | Bag check — why / intro | 5 | 1 core | **invent** | BottomSheet `info`, bag pictogram | needs asset |
| 16 | Bag check — add refills | 5 | 2 composition | **invent** | Card, Checkbox rows, ProgressBar | **needs core change** — quantity on a checkable row |
| 17 | Bag check — confirm 5 pouches | 5 | 2 composition | **invent** | Card + Checkbox row + `caret` IconButton XS, ListItem | exists |
| 18 | Bag check — pouch drill-down | 5 | 1 core | **invent** | ListItem read-only | exists |
| 19 | Bag check — spot check | 5 | **3 local** | **invent** | pictogram, Chips, Button `ghost` | **needs brief** |
| 20 | Bag check — missing summary | 5 | 2 composition | **invent** | BottomSheet, Chips (reason), Button ×2 | exists |
| 21 | Home stock short (report) | 5 | 2 composition | **invent** | BottomSheet, NumericKeypad or Chips | exists |
| 22 | Bag check — final confirmation | 5 | 2 composition | **invent** | recap rows, Nudge `loss`, red-card asset, Button | exists |
| 23 | Home banner carousel — Beauty | 6 | — | inherit | content only, carousel takes category | no design work |
| 24 | Profile row — Inventory ledger | 6 | 1 core | **invent** | ListItem, `receipt` leading | exists |
| 25 | Profile row — Your jobs | 6 | 1 core | **invent** | ListItem, `calendar` leading | exists |
| 26 | Home card — refill notice | 7 | 2 composition | **invent** | Card `tappable` / `static` + footer Button | exists |
| 27 | Weekly refill — order header | 7 | 2 composition | **invent** | Heading3 + Caption | exists |
| 28 | Weekly refill — status + cost | 7 | 2 composition | **invent** | Card, Tag, Amount `lg` | **needs core change** — a price that is a deduction from pay |
| 29 | Weekly refill — 4-stage tracker | 7 | 1 core + change | **invent** | Stepper `rail` | **needs core change** — delivery tracker ≠ onboarding stepper |
| 30 | Weekly refill — status banner | 7 | 1 core | **invent** | one line tied to stage | exists |
| 31 | Weekly refill — item breakdown | 7 | 2 composition | **invent** | Accordion `breakdown`, Amount `sm` | needs #16 |
| 32 | Weekly refill — how it works | 7 | 1 core | **invent** | HowToClip `card` | exists — **needs 4-language video** |
| 33 | Mark received | 7 | 1 core | **invent** | BottomSheet `confirm`, Button `primary` | exists |
| 34 | Report issue — order (3 steps) | 7 | 2 composition | **invent** | SelectionCard `compact`, Checkbox list, BottomSheet | exists |
| 35 | Ledger — tabs + stat tiles | 7 | 2 composition | **invent** | Tabs, Card `static` ×3 | exists |
| 36 | Ledger — order list + detail | 7 | 2 composition | **invent** | Card `expandable`, Tag, tertiary link | exists |
| 37 | Ledger — live inventory tab | 7 | 2 composition | **invent** | Accordion, ListItem | needs #16 |
| 38 | Scheduled jobs — list | 8 | 2 composition | **invent** | Tabs, ListItem 72 with tonal time box | exists |
| 39 | Scheduled jobs — detail | 8 | 2 composition | **invent** | MapSnippet, Listen, Button `secondary`, ListItem | exists |
| 40 | Scheduled jobs — empty | 8 | 1 core | **invent** | EmptyState `waiting` | exists |

**40 surfaces. 31 invent, 9 inherit.** Two-thirds of the invent work is §5 and §7 (surfaces 15–22, 26–37).

No Tier 0 anywhere. One Tier 3 (#19, spot check), which is also the one surface the stakeholder has said may be deleted — it is isolated so that deleting it costs one screen.

## Gaps

Copied into `SCOPE.md` → *Asks of core* and closed **there**, in the shared system, before the pattern is written.

| Gap | Kind | Blocks | Note |
| --- | --- | --- | --- |
| `package` · `truck` · `tote` · `polygon` icon meanings | icon → `foundations/icons.md` | 5, 6, 15, 26, 29 | Lint E3 fails the moment one appears in a spec |
| Service-area shape on a map (filled + stroked) | component change → `map-marker.md` | 5, 6 | MapMarker is a pin family today; an area is a new member |
| Delivery tracker — 4 stages measuring a shipment | component change → `stepper.md` | 29 | Today's Stepper is a to-do list she acts on; this one she only watches |
| Quantity on a checkable row | component change → `list-item.md` | 16, 31, 37 | "add 2", "used 6 of 8" — a count that is not an Amount |
| A price that is a deduction from pay | component change → `amount.md` | 28, 33 | Money leaving her pay, shown outside Earnings; must not read as a penalty |
| Pouch · kit · packed bag · rest day pictograms | asset → `foundations/assets.md` | 2, 7, 8, 15 | Illustration layer, flat, pink stage — **never metallic**, none of these is a reward |
| Spot check | Tier 3 brief → `briefs/beauty-shift-lifecycle-spot-check.md` | 19 | |
| Vocabulary rows | `PRINCIPLES.md` § Vocabulary + `foundations/content.md` | all | start/end shift, week off, bag check, pouch, refill, your stock |
| 4-language explainer video | content, not design | 32 | A single-language video fails P9 |

## Checks

- [x] Every surface in the PRD appears in the table above — none skipped as "obvious"
- [x] Every Tier 3 row has a brief named (#19)
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
- [ ] Inherit surfaces matched against the shipped Figma frames — **waiting on the shift-lifecycle file**
- [ ] Invent surfaces that need a reference read have one — **waiting on the inventory prototype**; attendance is exempt by stakeholder instruction
