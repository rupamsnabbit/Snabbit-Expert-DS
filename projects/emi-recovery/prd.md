# The ask — EMI Recovery Engine v1

## A — A PRD arrived

| | |
| --- | --- |
| From | Amit |
| Received | 2026-10-18 (PRD dated 2026-10-12) |
| Source | claude.ai doc *PRD — EMI Recovery Engine v1* — https://claude.ai/artifact/BXxoUzrcqtzBFyzrNCkQDe (read at rev 39) |
| Kind | Written PRD — verbatim below |
| Version | v1 |
| Source of truth it names | *EMI Recovery — Logic & Payout Cases* (dated 2026-10-11, Amit) — kept verbatim in [`prd-logic.md`](prd-logic.md) |

The body below is the PRD **as received**. It is evidence, like a Figma screen or a Mobbin flow: it says what the business wants and when. It is not a design, and nothing in it overrides `principles/` or `tokens/`.

Do not edit the body — not the wording, not the structure, not the parts that are wrong. Disagreements go in `SCOPE.md` → *Open questions*. A revision is appended below as a new version with its own header; the diff between versions is often the most useful thing in the folder.

Conversion note: the doc was converted from its stored structure to markdown on 2026-10-18. The one embedded diagram in § 2 did not convert and is marked where it stood; the date and author chips are kept as text.

---

# PRD — EMI Recovery Engine v1

2026-10-12 · @Amit

## 1. Overview

Every expert repays a fixed EMI (₹4,000 for uniform + training) in fixed monthly slots by shift type; shortfalls roll forward in full, and anything taken extra in an inactive or suspended month is refundable if the expert returns within T months. This page is the single grooming reference: final logic, configs, edge cases, UI and comms.

**Problem today:** a month-end shortfall is written off, so recovery leaks and there is no consistent rule for inactive, suspended or returning experts.

**Goal:** recover the full EMI balance, never over-charge, keep payouts predictable, and use the refund as a reason for inactive experts to come back.

| In scope (v1) | Out of scope (v1) |
| --- | --- |
| Month-end EMI run per expert, per EMI type | Band (Short ↔ Long) change mid-plan |
| Slot schedule, arrears catch-up, held + refund, refund window | Cap on catch-up ask (accepted cost, see Case 3) |
| Config versioning: no retro recalculation | Early payout holdback (see Q3) |
| Expert app: EMI card, held amount, earn-back | Deduction priority vs non-EMI deductions (Section 9, open) |
| Suspension / inactivity comms: PN, WhatsApp, IVR | Terminated expert recovery (see Q2) |

**Source of truth for the logic:** [EMI Recovery — Logic & Payout Cases](https://claude.ai/artifact/5kbLrk78F7om29HDmabaob) (locked with business).

## 2. Logic at a glance

*[Embedded diagram: month-end EMI run · 3 paths, 2 decisions]*

Inactive or suspended months keep only the normal ask; the extra is held and comes back if she returns within T months, else it becomes Paid.

**In plain words**

1. Each month with earnings uses the next slot. Ask = slot amount + everything missed so far.
2. Whatever still isn't paid rolls into the next month, in full. After the last slot, collect at the normal instalment.
3. Inactive / suspended with earnings: keep the normal ask, hold the extra.
4. Returns within T months: held amount refunded. After T: it counts as paid.
5. Inactive / suspended with ₹0: nothing moves. Never collect above the ₹4,000 balance.

**Baseline, all months normal (₹12,000 earnings):** Short pays out ₹11,300 in M1–M5, ₹11,500 in M6, ₹12,000 from M7. Long pays out ₹11,000 in M1–M4, ₹12,000 from M5.

## 3. Definitions, states and configs

### Terms

| Term | Meaning |
| --- | --- |
| Plan | One EMI type for one expert. Starts at the expert's FL (subject to new-joiner grace) |
| Earnings | Month's net income after tax and non-EMI deductions, before EMI, minus any early payout already given |
| Slot (S1…Sn) | A schedule position, not a calendar month. Used only by a month that runs the deduction |
| Ask | What the run tries to deduct this month |
| Arrears | Sum of slot amounts already used − Paid. Added in full to the next ask |
| Paid | EMI kept. Never refunded |
| Held | Extra collected in an inactive / suspended month. Refundable within T |
| Balance | Total − Paid − Held. Never deduct above this |

### States (evaluated once, at the month-end run)

| State | Rule | Precedence |
| --- | --- | --- |
| Terminated | Permanently off-boarded | 1 (highest) |
| Suspended | Suspension flag on at run time | 2 |
| Inactive | 0 completed shifts in the last Y days of the month | 3 |
| Active | ≥ 1 completed shift in the last Y days | 4 |
| Returned (event) | Inactive / suspended expert is Active again at a month-end run (suspension flag off, ≥ 1 shift in last Y days). No separate return config | Triggers refund of Held, if within T |

### Configs

All values live in an admin-editable, versioned config. Every plan stores the config version it started on.

| # | Config | Controls | Default |
| --- | --- | --- | --- |
| C1 | Total recovery | Amount per EMI type | Uniform + Training ₹4,000 |
| C2 | Instalment by shift type | Monthly slot amount; tenure derived; last slot = remainder | Short ₹700 (6 slots, last ₹500) · Long ₹1,000 (4 slots) |
| C3 | New-joiner grace (n) | FL in the last n days of a month → first slot starts next month | n = TBD (Q1) |
| C4 | Inactive days (Y) | Window for the Active / Inactive check; also decides return | 7 days |
| C5 | EMI types | Types that exist, each with its own C1–C2 | Uniform, Training, Merch |
| C6 | Deduction priority | Order when earnings < total ask | Uniform & Training > Merch (rest open, Section 9) |
| C7 | Refund window (T) | Months from InactiveSince within which return refunds Held | 3 months |
| C8 | Effective date | When a saved config version starts applying | Next month-end run |
| C9 | Config change scope | Who a new version applies to (Section 5) | New FL only |

Note: the logic doc's return criteria (R shifts in W days) is dropped; return = back to Active under C4. Its "config 13" (refund window) and "config 11" (early payout holdback) are renumbered here; holdback is not in v1.

## 4. Final monthly logic

Runs once per expert per EMI plan at month end, before payout. Each run writes one immutable ledger row; a closed month is never recomputed.

**Stored per plan**

```
Slot          = next schedule slot to use (starts at S1)
Paid          = EMI kept so far (never refunded)
Held          = extra collected in Inactive / Suspended months (refundable)
InactiveSince = month the current inactive / suspended stretch began (none if Active)
Balance       = Total − Paid − Held
ConfigVersion = config version locked at plan start (Section 5)
```

**Inputs each month**

```
Earnings = month's net income before EMI (minus early payout already given)
Monthly  = instalment for the shift type (C2): Short 700, Long 1,000
Sched    = amount for the current Slot (Monthly, or remainder in the last slot)
           SHORT: 700, 700, 700, 700, 700, 500
           LONG:  1,000, 1,000, 1,000, 1,000
T        = refund window in months (C7)
```

**Step 1 — Pool**

```
Pool = Earnings          (if negative, Pool = 0)
```

**Step 2 — If Inactive or Suspended**

```
If InactiveSince is none:  InactiveSince = this month

Collected = smaller of (Balance, Pool)

If Pool > 0:
    NormalAsk = what Steps 3b–3c would ask if Active (Slot moves)
    Kept      = smaller of (Collected, NormalAsk)   ← this month's EMI
    Paid      = Paid + Kept
    Held      = Held + (Collected − Kept)

If Pool = 0:
    Nothing moves (plan paused, Slot stays)
```

**Step 3 — If Active**

```
3a. If returned (InactiveSince is set, i.e. Active again after an inactive / suspended stretch):
        If Held > 0:   Refund = Held;  Balance = Balance + Held;  Held = 0
        InactiveSince = none

3b. Arrears = (sum of Sched for slots already used) − Paid      (min 0)

3c. If a slot is left:  Ask = Sched + Arrears;  Slot moves to next
    If no slot left:    Ask = Monthly   (schedule over, continue at normal instalment)

3d. Ask       = smaller of (Ask, Balance)
    Collected = smaller of (Ask, Pool)
    Paid      = Paid + Collected
```

**Step 4 — Refund window closes**

```
If still Inactive / Suspended and (this month − InactiveSince) ≥ T:
    Paid = Paid + Held
    Held = 0          (never refunded; counts as paid)
```

**Step 5 — Payout**

```
Payout = Earnings − Collected + Refund
```

**Invariants (assert on every run)**

1. Paid + Held ≤ Total, at all times.
2. Collected ≤ Pool, so payout is never negative from EMI.
3. Refund only when Held > 0 and the expert returned before the window closed.
4. A month with ₹0 earnings while inactive / suspended consumes no slot.
5. Plan closes when Balance = 0 and Held = 0.

## 5. Config change handling

A config change never rewrites a closed month. By default it applies only to experts whose FL falls on or after the effective date, after new-joiner grace.

**Rules**

1. Configs are versioned. Saving an edit creates a new version (v1, v2…) with an effective date (C8); old versions are read-only.
2. Each plan stores `ConfigVersion` at plan start. Every run reads values from that version only.
3. Ledger rows already written (Paid, Held, Refund, Payout per month) are immutable, whatever the scope.
4. New-joiner grace (C3) decides the cohort: an expert whose FL is in the last n days before the effective date starts on the new version.

**C****9**** — Config change scope (selected at save time)**

| Option | Who gets the new version | What changes for them | v1? |
| --- | --- | --- | --- |
| New FL only (default) | Experts with FL on / after the effective date | Whole plan runs on new version | Yes |
| New FL + running plans | Above + all open plans, from the next run | Only future, unclosed months; Paid, Held, Slot carried as is; remaining slots re-derived from Balance | Build toggle, keep disabled until finance signs off (Q4) |

**Admin guardrails**

- Save screen shows: version diff, effective date, scope, count of experts affected.
- Mid-run edits are blocked: an edit saved during a month-end run applies from the next run.
- Every version change is audit-logged (who, when, old → new).

## 6. Critical and edge cases

Each row is a QA test. "Case n" points to the worked month-by-month table in the logic doc.

### Shortfalls (expert stays Active)

| # | Scenario | Expected behaviour | Ref |
| --- | --- | --- | --- |
| E1 | One low month mid-plan | Missed amount added in full to next ask; back to normal after | Case 1 |
| E2 | Shortfall in the last slot | No slots left: continue at Monthly until Balance = 0. No lump sum | Case 2 |
| E3 | Consecutive low months | Arrears compound; ask can reach 2.7× normal and take the full payout. Accepted in v1 (no cap) | Cases 3, 5 |
| E4 | Early payout drains the month | Earnings = net of early payout; shortfall rolls forward | Case 4 |
| E5 | Active with ₹0 or negative earnings | Pool = 0, slot is still consumed, full Sched goes to arrears. Only inactive / suspended ₹0 months pause | — |

### Inactivity and suspension

| # | Scenario | Expected behaviour | Ref |
| --- | --- | --- | --- |
| E6 | Inactive with earnings | Kept = normal ask incl. arrears; rest Held, up to Balance | Case 6 |
| E7 | Inactive month clears full balance | Balance = 0 but Held > 0, plan stays open. Refund on return reopens Balance; schedule resumes | Case 7 |
| E8 | Inactive with ₹0 earnings | Plan paused, slot stays, no catch-up spike on return | Case 8 |
| E9 | Back to Active within T | Full Held refunded in that month's payout, then normal ask | Case 8 |
| E10 | Back to Active after T | Held moved to Paid at window close; on return only the remaining Balance at Monthly | Cases 9, 12 |
| E11 | Inactive → return → inactive again | Each stretch restarts InactiveSince. Payouts swing ₹700 to ₹13,900. No cycle limit in v1 (Q5) | Case 10 |
| E12 | Suspended, then reinstated | Same as inactive. Reinstatement alone is not a return; she must be Active at the run (≥ 1 shift in last Y days) | Case 11 |
| E13 | Schedule over, balance left, inactive with earnings | Kept = Monthly; only the extra is Held | Case 15 |
| E14 | Schedule over, balance left, returns | Collect at Monthly, not the full balance at once | Case 14 |
| E15 | Window boundary: return month = InactiveSince + T | Refund paid (3a runs before 4). Still inactive at that run → window closes | Cases 8, 9 |
| E16 | Back to Active with a single shift | Counts as return; full Held refunded. Risk: one shift to unlock refund, then inactive again. Track refund-then-inactive rate (Q5) | — |

### Gaps found while writing this PRD (need a call before dev)

| # | Scenario | Gap | Proposed default |
| --- | --- | --- | --- |
| E17 | Worked early in the month, no shift in the last Y days | State is read only at the run | Treat as Inactive; no refund that month |
| E18 | Suspension longer than T | Expert cannot return while suspended, yet the window keeps running | Pause the window clock during suspension (Q6, legal) |
| E19 | Terminated with Held or Balance > 0 | Not defined in the logic | Held → Paid; remaining Balance per finance (Q2) |
| E20 | Several EMI types, earnings < total ask | Order not final | C6 order; full rule in Section 9 |

### System cases

| # | Scenario | Expected behaviour |
| --- | --- | --- |
| E21 | FL in the last n days of the month | No deduction this month; S1 next month (C3) |
| E22 | Config edited mid-plan | Plan stays on its version (Section 5) |
| E23 | Shift type changes mid-plan | Out of scope v1; plan keeps its start schedule |
| E24 | Month-end job re-run or retried | Idempotent per (plan, month); no double deduction or double refund |
| E25 | Manual correction by ops | New reversal / adjustment ledger row; old rows never edited |

## 7. Expert app UI (designer reference)

The one message the UI must land: money held in an inactive or suspended month is the expert's, and she earns it back by returning before a date. Copy below is draft Hinglish, to be finalised with the copy owner.

### Where it shows

| Surface | Component | Shows |
| --- | --- | --- |
| Earnings tab | EMI card | Total, Paid, Held (refundable), Balance as one segmented bar; slot progress ("Kisht 3 / 6") |
| Earnings tab (top) | Earn-back banner | Held amount, deadline date, CTA to book a shift |
| Monthly payslip | Breakdown rows | Earnings · EMI kisht · Extra held (refundable) · Refund credited · Net payout |
| Home (on return) | Refund toast | "₹X wapas mil gaye" once refund is credited |
| Notification Centre | Inbox item | Same as PN / WhatsApp (Section 8) |

### States

| State | Trigger | Banner / card copy (draft) | Tone |
| --- | --- | --- | --- |
| Held, window open | Held > 0, within T | "₹2,600 aapke hain. 15 Jan tak kaam pe wapas aao, poore wapas milenge." + "Shift book karo" | Accent, hopeful |
| Back at work, refund due | ≥ 1 shift in the last Y days of this month, Held > 0 | "Welcome back! Mahine ke end tak kaam karte raho, ₹2,600 is payout mein wapas." | Accent |
| Refund earned | Returned, refund in this payout | "₹2,600 wapas mil gaye. Agle payout mein jud gaye." | Success |
| Last 7 days of window | Held > 0, deadline ≤ 7 days | "Sirf 5 din bache. ₹2,600 wapas paane ke liye abhi shift lo." | Warning |
| Window closed | Held moved to Paid | "₹2,600 aapki EMI mein adjust ho gaye. Baaki EMI: ₹300." | Neutral, no blame |
| EMI paused | Inactive / suspended with ₹0 earnings | "Is mahine EMI nahi kati. Kaam shuru karte hi normal kisht chalegi." | Neutral |
| EMI complete | Balance = 0 and Held = 0 | "EMI poori ho gayi." | Success |

### Design notes

- Held must never look like a fine. Show it as the expert's money, parked.
- Always show the exact amount and the exact date. No "soon", no "up to".
- Deadline = the last month-end run inside T. She must have ≥ 1 shift in the Y days before that run.
- Suspended experts see the banner, but the CTA changes to "Reinstatement ke baad kaam shuru karo" (no booking CTA while suspended).
- Payslip must show Kept and Held as separate rows, so the expert sees that only the extra is refundable.

### API fields the app needs

`total`, `paid`, `held`, `balance`, `slot_current`, `slot_total`, `refund_deadline`, `active_in_last_y_days`, `inactive_days_y`, `plan_state`, `last_refund_amount`, `last_refund_date`.

## 8. Suspension and inactivity comms

Every suspended or inactive expert is told, on PN, WhatsApp and IVR, that coming back early gets her the extra deducted amount refunded. The held amount is only known after the month-end run, so the first message is amount-free and later ones carry the exact ₹ and date.

### Trigger plan

| # | Trigger | Channels | Timing | Message (draft) |
| --- | --- | --- | --- | --- |
| M1 | Suspension flag on, EMI Balance > 0 | PN + WhatsApp | Within 1 hour | "Aap suspend hue ho. Is mahine EMI se jo extra katega, woh wapas milega agar aap jaldi kaam pe wapas aate ho." |
| M2 | Month-end run sets Held > 0 (**inactive or suspended**) | PN + WhatsApp + IVR | With payout | "₹2,600 extra deduct hua hai. 15 Jan tak kaam pe wapas aao, poore wapas milenge." |
| M3 | Reinstated (suspension flag off), Held > 0 | PN + WhatsApp | Within 1 hour | "Aap wapas active ho. Kaam shuru karo, ₹2,600 wapas milenge." |
| M4 | Reminder, Held > 0, still not returned | PN + WhatsApp | 30 days before deadline | Amount + date + "shift book karo" |
| M5 | Final reminder | PN + WhatsApp + IVR | 7 days before deadline | "Sirf 7 din bache. ₹2,600 wapas paane ka last mauka." |
| M6 | First shift after an inactive / suspended stretch | PN | After the shift | "Welcome back! Mahine ke end tak kaam karte raho, ₹2,600 is payout mein wapas." |
| M7 | Refund credited | PN + WhatsApp | With payout | "₹2,600 wapas aa gaye aapke payout mein." |
| M8 | Window closed | PN | At the run that closes it | "₹2,600 EMI mein adjust ho gaye. Baaki EMI ₹300." |

### Rules

- Inactive experts (no suspension) skip M1 and M3; they start at M2.
- Suspended experts: no booking CTA until reinstated; message says "reinstatement ke baad".
- Do not send to Terminated experts. Suspension reasons to exclude (e.g. fraud) need ops input (Q7).
- Quiet hours 9 pm to 9 am; max one EMI message per day across channels; IVR max 2 per stretch (M2, M5).
- Every message pulls amount, date and Y from the same API as the app, never hard-coded.
- WhatsApp templates need Meta approval before launch (dependency); IVR in the expert's app language.
- Log send, deliver, open / listen and the expert's next shift, to measure refund-led return rate.

## 9. Deduction priority (OPEN)

**Status: open. To be closed with legal and finance before dev starts on the multi-deduction path.**

Question: when net income < total deductions, which deduction is collected first, and what happens to the rest?

| To decide | Notes |
| --- | --- |
| Order across EMI types | Current C6: Uniform & Training > Merch. Confirm, and whether Uniform vs Training split proportionally or in sequence |
| EMI vs non-EMI deductions | Where EMI sits against penalties, advances, other recoveries |
| Arrears vs current slot | Within one type: current slot first, or oldest arrears first |
| Partial collection | Fill the top item fully before the next, or pro-rata across items |
| Held allocation | When an inactive month holds money across several types, which type's Held is refunded or closed first |

**Build ask now:** keep the order as a config (C6) and the allocation as one isolated function, so the final rule is a config change, not a rebuild.

## 10. Dependencies, failure modes, open questions

### Dependencies

| Dependency | Needed for | Owner |
| --- | --- | --- |
| Payout service: net income before EMI, early payout taken | Step 1 Pool | Payments |
| Shift data: completed shifts with timestamps | Active / Inactive and return (Y) | Supply tech |
| Ops flags: suspension on / off, termination, FL date | States, C3 grace | Ops tech |
| Versioned config admin | C1–C9, Section 5 | EMI service |
| EMI ledger (immutable, per plan per month) | All steps, audit, app API | EMI service |
| Payslip line items: Held, Refund | Payout + UI | Payments |
| Expert app earnings screens, Notification Centre | Section 7 | Expert app |
| WhatsApp BSP + approved templates, IVR vendor | Section 8 | Growth / CRM |

### Failure modes and guards

| Failure | Impact | Guard |
| --- | --- | --- |
| Payout released before the EMI run finishes | Wrong payout, unrecoverable | EMI run is a hard gate on payout |
| Shift or suspension data lands late | Wrong state, wrong Held | Snapshot inputs at run start; late changes apply next run |
| Job re-run | Double deduction or refund | Idempotency key (plan, month) |
| Refund paid but Held not reset | Double refund next month | Invariant checks fail the run for that plan |
| App / comms show stale amount or date | Trust loss, support tickets | One API for app, PN, WhatsApp, IVR |
| Arrears spike empties a payout (E3) | Churn of low earners | Track % payouts = ₹0 due to EMI; revisit cap after 2 cycles |
|  |  |  |

### Open questions

| # | Question | Owner |
| --- | --- | --- |
| Q1 | New-joiner grace: value of n | Business |
| Q2 | Terminated with Held or Balance: convert Held to Paid, and recover or write off the rest? | Finance |
| Q3 | Early payout holdback (keep Sched back from early payout) in v1 or later? | Business |
| Q4 | Enable C9 "running plans" option at launch? | Finance |
| Q5 | Limit on refund cycles per plan (E11, E16)? | Business |
| Q6 | Pause the window clock during suspension (E18)? | Legal |
| Q7 | Suspension reasons excluded from refund comms | Ops |
| Q8 | Deduction priority (Section 9) | Legal + finance |

### Success metrics

Recovery rate vs ₹ issued · ₹ written off · % payouts reduced to ₹0 by EMI · % inactive / suspended experts who return within T after M2 · ₹ Held converted to Paid.
