# Tiers — EMI Recovery Engine v1

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). This is the step that turns an ask into a plan, and it is where the gaps in the system become visible.

Sources read for this pass (2026-10-18): `prd.md` § 7–8, the design lead's screen list in `SCOPE.md` → *Screens impacted*, `patterns/payout.md`, `patterns/earnings.md`, `patterns/notification-centre.md`, `components/statement.md`, `hero-card.md`, `nudge.md`, `feedback.md`, `progress-bar.md`, `amount.md`, `empty-state.md`, `foundations/icons.md`, `references/shipped-app-2026-09-22/`. **Not yet read:** *Expert App 2.0* `9484:54252` — the connector could not open it (metadata too large to parse; screenshot errored three times). Rows marked **Figma** are confirmed or changed once it is read.

## Surfaces

| # | Surface (PRD's / lead's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | **Payments screen – ledger** · PRD "monthly payslip — breakdown rows: Earnings · EMI kisht · Extra held (refundable) · Refund credited · Net payout" | 1 core | `Statement` month use (`statement.md`, `payout.md` § 1). EMI row is the shipped *Training kit EMI · 1 of 4* row with `arrow-circle-down` (registered for EMIs). Held money is a row with **Amount `locked`** and its condition as the description (*comes back if you log in by 15 Jan*), the same state a locked bonus uses. Money back is a row with Amount `positive`. Window closed → the description changes (*added to your EMI*) | exists · needs the word for held (gap 1) · needs an icon for money back (gap 3) |
| 2 | **Ledger** — the EMI's own history | 1 core | `Statement`, a new **use**: band *Uniform and training kit* · Amount `L` **₹1,100 left**; one row per month that took a kisht (*Mar · 3 of 6 · ₹700*, *Feb · kept for you · ₹800 locked*); total *Paid ₹2,900*; schedule panel with one date tile, the next kisht (*31 Mar · ₹700*). Opened from row 1's EMI row (`caret-right`) and from surface 3 | exists · add the use to `statement.md` → *Uses* (gap 4) |
| 3 | **EMI card** on the Earnings tab · PRD "Total, Paid, Held (refundable), Balance as one segmented bar; slot progress (Kisht 3 / 6)" | 2 composition | `ListItem` `navigational` (`list-item.md`) holding `ProgressBar` `segmented` `S` (instalments: 3 of 6 — equal steps, which is what `segmented` means) and Amount *₹1,100 left* trailing; held money is one line under it with Amount `locked`, not a part of the bar. Opens surface 2 | exists · **departure from the PRD** (4-part bar → instalment count + one held line), recorded below |
| 4 | **Inactive experts come back** · PRD "earn-back banner: held amount, deadline date, CTA" (CTA = start her shift, `SCOPE.md` Q3) | 1 core + core change | **Home:** `Nudge` `gain` under the existing *Log in* button — *Log in by 15 Jan → ₹2,600 back*. A Nudge is exactly "do this by then → you get", attached to the control that does it. **Earnings tab:** `Banner` `brand` `facts` — *₹2,600 is kept for you* · *Log in by 15 Jan* — no button (the action lives on Home; P2) | Banner exists · **Nudge needs a ₹ consequence** (gap 2) |
| 4a | — state: back at work, refund due | 1 core | `Banner` `success` on Earnings: *₹2,600 comes back in your 15 Mar payout*; Home Nudge collapses (its condition resolved, `nudge.md` § Behaviour) | exists |
| 4b | — state: last 7 days of the window | 1 core | Same Nudge and Banner; the date line counts down in Timer `deadline` text (`nudge.md`: never a second ring). Banner tone stays `brand`, not `warning` (P6: a shortfall is never shouted) | exists |
| 4c | — state: refund earned (Home toast) | 1 core | The payout day moment already exists (`payout.md` § 6: notification + Snackbar + `celebrate`); the refund rides on it — Toast *₹2,600 back in your payout* | exists |
| 4d | — state: window closed | 1 core | No banner. Surface 1's held row reads *added to your EMI*; the EMI card's left amount drops. One push (M8) | exists |
| 4e | — state: EMI paused (₹0 month while inactive / suspended) | 1 core | Surface 3's row description: *Paused · starts again when you log in*; `ProgressBar` keeps its fill | exists |
| 4f | — state: EMI complete | 1 core | `ProgressBar` tone `success` (computed at goal, `progress-bar.md`), Amount *Paid off*; the row stays one month, then leaves the tab | exists |
| 5 | **Suspension** — "advertise that she can get ₹X back when she rejoins" (`SCOPE.md` Q4) | **Figma** | Not in the system: no pattern or component has a suspended state. Likely a `Banner` `brand` `facts` with no action (*₹2,000 is kept for you · back when you rejoin*) on whatever screen a suspended expert lands on — that screen is the unknown | **needs the shipped suspension screen** |
| 6 | **Early payout** | 2 composition · **Figma** | `payout.md` § 4 (Proposed; not shipped in the references read): the amount screen and the `confirm` sheet's consequence strip. EMI enters as one more line in the strip — early payout lowers what's left at month end, so the kisht may not fit (PRD E4, Case 4). Holdback is out of v1 (Q3) | exists · confirm against the shipped early-payout screen |
| 7 | **Notification Centre** inbox item | — | Not tiered: `notification-centre.md` holds everything that is not money (`SCOPE.md` Q7, open) | waits on Q7 |
| 8 | **Push · WhatsApp · IVR** (§ 8, M1–M8) | content | Strings and spoken lines per `foundations/content.md` (voice, spoken copy, four languages); push opens surface 4 or 1. No UI component | waits on Q8 (scope) |

### Departure recorded — surface 3

The PRD asks for one bar holding Total, Paid, Held and Balance. Drawn as asked it is four numbers in one shape, and the
held part — the one thing she can still change — becomes a sliver of colour she must decode (P1: one figure; the
design lead's *one hero per sheet*). `ProgressBar` `segmented` already means *a count of equal steps*, which is what
*Kisht 3 / 6* is. So: the bar counts kisht, the left amount is the figure, and held money is its own line with
Amount `locked`, where its date can sit next to it. If the lead wants held inside the bar, that is a change to core
(`ProgressBar` gains a second, *parked* fill — the `target` marker's top-up hatch is the nearest precedent) and
becomes gap 5.

## Gaps

Everything the verdict column marked as missing, copied into `SCOPE.md` → *Asks of core* and closed **there** — in the shared system — before the pattern is written. A project never patches core privately.

| Gap | Kind | Blocks |
| --- | --- | --- |
| 1 · The on-screen word for held money (answered: may differ from *Held*, Q1). Candidates: *kept for you* · *saved for you*. Lands in `foundations/content.md` § vocabulary and the `PRINCIPLES.md` table, with *Held* listed under "Not" | content · vocabulary | 1, 2, 3, 4, 5 |
| 2 · `Nudge` `gain` consequence as a money amount (Amount `S` `positive`, *₹2,600 back*), not only an asset + count | component change — `components/nudge.md` | 4 |
| 3 · An icon meaning for **money coming back to her** (a refund, not the company adding — `arrow-circle-up` is *Added*). Candidate `arrow-u-down-left`; register in `foundations/icons.md` | icon | 1 |
| 4 · `Statement` → *Uses*: add the EMI ledger row | component doc change — `components/statement.md` | 2 |
| 5 · *(only if the lead overrides the departure)* `ProgressBar` second *parked* fill | component change — `components/progress-bar.md` | 3 |
| 6 · The suspension surface — read from Figma before it can be tiered | evidence | 5 |

## Checks

- [x] Every surface in the PRD appears in the table above — none skipped as "obvious" (§ 7 surfaces 1, 3, 4, 4a–f, 7; § 8 as 8; the lead's five screens as 1, 2, 4, 5, 6)
- [x] Every Tier 3 row has a brief, or a line saying why it is not needed yet — no Tier 3 rows
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
- [ ] Rows 5 and 6 confirmed against *Expert App 2.0* — pending the Figma read
