# Source — EMI Recovery — Logic & Payout Cases

| | |
| --- | --- |
| From | Amit |
| Received | 2026-10-18 (doc dated 2026-10-11) |
| Source | claude.ai doc — https://claude.ai/artifact/5kbLrk78F7om29HDmabaob (read at rev 384) |
| Kind | The logic doc the PRD names as its source of truth ("locked with business") — verbatim below |

Evidence, like `prd.md`, and not edited. Where this doc and the PRD differ, the PRD says which wins (PRD § 3 note: the return criteria R/W is dropped; configs are renumbered). Disagreements go to `SCOPE.md` → *Open questions*.

---

# EMI Recovery — Logic & Payout Cases

2026-10-11 · @Amit

## Recovery config

Each expert repays ₹4,000 in fixed monthly slots set by their shift type (Short ₹700, Long ₹1,000), with the last slot being whatever is left. If a month falls short, the missed amount is added in full to the next month's ask, and anything still unpaid carries forward again. In an inactive or suspended month, the normal ask is still kept if the expert had earnings, and only the extra taken is held. Held is refunded only if the expert returns within the refund window; after that it counts as paid. A month with no earnings pauses the plan. Nothing is ever charged beyond the ₹4,000 balance. Band changes are handled separately.

| Band | S1 | S2 | S3 | S4 | S5 | S6 | Total | Normal instalment (after schedule) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Short | 700 | 700 | 700 | 700 | 700 | 500 | 4,000 | 700 |
| Long | 1,000 | 1,000 | 1,000 | 1,000 | 0 | 0 | 4,000 | 1,000 |

S1–S6 are **schedule slots**, not calendar months. A month with earnings uses the next slot. A month with ₹0 earnings while inactive or suspended uses no slot, and the plan pauses.

Assumptions used in every case below:

- Earnings = net income for the month after tax and non-EMI deductions, before EMI
- A normal working month = ₹12,000
- Whenever config changes, the experts that have their FL in the upcoming cycle after the config changes will start seeing this effect.
- Catch-up: an amount missed is added in full to the next month's ask; anything still unpaid carries forward again.
- Refund window T = 3 months: Held is refunded only if the expert returns within 3 months of becoming inactive. After that it counts as paid and is never refunded

## Configs

All recovery behaviour is driven by these configs. How a config edit applies to plans already running is handled separately, with band changes.

| # | Config | What it controls | Example |
| --- | --- | --- | --- |
| 1 | Total recovery | Full amount to recover, per EMI type | Uniform + training ₹4,000 |
| 2 | Recovery per month, by shift type | Monthly instalment. Tenure is derived, and the last month is the remainder | Short ₹700 (→ 6 months, last ₹500), Long ₹1,000 (→ 4 months) |
| 3 | New-joiner grace | skip to not month if FL done in last 'n' days |  |
| 4 <br>  | Inactive days (Y) | Expert is inactive for the month if they have 0 completed shifts in the last Y days | 7 days |
| 5 | Return criteria (R, W) | An inactive or suspended expert counts as returned after R completed shifts within W days. This triggers the refund of Held, if within the refund window (config 13) | 3 shifts in 7 days |
| 6 | EMI types | Which recovery types exist, each with its own configs 1–2 | Uniform, Training, Merch |
| 7 | Deduction priority | Which EMI type is collected first when earnings fall short | Uniform & Training > Merch |
| 8 | Config effective date and scope | When an edit applies, and to whom -> Edit applies to upcoming experts considering the new-joiner grace. Nothing changes for the existing experts |  |
| 9 | Refund window (T) | Months after becoming inactive or suspended within which the expert must return for Held to be refunded. After T months, Held counts as paid and is never refunded | 3 months |

## Monthly logic

Runs once per expert at the end of every month.

**What the system stores per expert**

```
Slot          = next schedule slot to use (starts at S1)
Paid          = EMI kept so far (never refunded)
Held          = extra collected in Inactive / Suspended months (returnable)
InactiveSince = month the current inactive / suspended stretch began (none if Active)
Balance       = 4,000 − Paid − Held
```

**Inputs each month**

```
Earnings = month's net income before EMI (minus any early payout already given)
Monthly  = fixed monthly instalment for the expert's shift type (config 2)
           Short 700, Long 1,000
Sched    = amount for the current Slot (Monthly, or the remainder in the last slot)
           SHORT: 700, 700, 700, 700, 700, 500
           LONG:  1,000, 1,000, 1,000, 1,000
T        = refund window in months (config 13)
```

**Step 1 — Pool available for EMI**

```
Pool = Earnings          (if negative, Pool = 0)
```

**Step 2 — If Inactive or Suspended**

```
If InactiveSince is none:  InactiveSince = this month

Collected = smaller of (Balance, Pool)

If Pool > 0:
    NormalAsk = what Steps 3b–3c would ask if Active (Slot moves)
    Kept      = smaller of (Collected, NormalAsk)   ← counts as this month's EMI
    Paid      = Paid + Kept
    Held      = Held + (Collected − Kept)

If Pool = 0:
    Nothing moves (plan paused, Slot stays)
```

**Step 3 — If Active**

```
3a. If the expert has returned (R shifts in W days):
        If Held > 0:            (still within the window, see Step 4)
            Refund  = Held
            Balance = Balance + Held
            Held    = 0
        InactiveSince = none

3b. Arrears = (sum of Sched for slots already used) − Paid      (if negative, 0)

3c. If a slot is left:   Ask = Sched + Arrears;  Slot moves to next
    If no slot is left:  Ask = Monthly          (schedule over, continue at normal instalment)

3d. Ask       = smaller of (Ask, Balance)
    Collected = smaller of (Ask, Pool)
    Paid      = Paid + Collected

Anything not collected stays in Arrears and is added to next month's Ask.
```

**Step 4 — ****Refund window closes (Inactive / Suspended only)**

```
If still Inactive / Suspended at this run and (this month − InactiveSince) ≥ T:
    Paid = Paid + Held
    Held = 0                (no refund ever; it counts as paid)
```

**Step 5 — Payout**

```
Payout = Earnings − Collected + Refund
```

States: **Active** = ≥1 shift in last Y days of month. **Inactive** = 0 shifts in last Y days. **Suspended** = suspension flag on. **Terminated** = permanently off.

In plain words: each month with earnings uses the next slot. Its ask is the slot amount plus everything missed so far. Whatever still isn't paid rolls into the month after. Once the slots run out, any leftover is collected at the normal instalment. In an inactive month with earnings, the normal ask is kept and only the extra is held. If the expert comes back within T months, the held extra is refunded; if not, it counts as paid. A month with no earnings moves nothing.

## Reading the payout tables

All amounts are in ₹.

| Column | Meaning |
| --- | --- |
| Slot | Instalment number collected that month (— = none) |
| Earnings | Net income for the month before EMI |
| Ask | What the logic tries to deduct |
| Deducted | What was actually collected |
| Refund | Held amount returned this month |
| Payout | Earnings − Deducted + Refund |
| Balance | 4,000 − Paid − Held |
| Held | Collected in inactive / suspended months, returnable |
| Kept as EMI | Part of Deducted counted as that month's normal instalment; never refunded. Deducted − Kept as EMI = Held |
| Arrears | Amount missed so far, added in full to this month's ask |

Baseline with all months normal:

- **Short:** payout ₹11,300 in M1–M5, ₹11,500 in M6, ₹12,000 from M7.
- **Long:** payout ₹11,000 in M1–M4, ₹12,000 from M5.

## Shortfall cases (expert stays Active)

### Case 1 — One low month mid-plan (Short)

| Month | Slot | Earnings | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | S1 | 12,000 | 0 | 700 | 700 | 11,300 | 3,300 |
| M2 | S2 | 300 | 0 | 700 | 300 | 0 | 3,000 |
| M3 | S3 | 12,000 | 400 | 700 + 400 = 1,100 | 1,100 | 10,900 | 1,900 |
| M4 | S4 | 12,000 | 0 | 700 | 700 | 11,300 | 1,200 |
| M5 | S5 | 12,000 | 0 | 700 | 700 | 11,300 | 500 |
| M6 | S6 | 12,000 | 0 | 500 | 500 | 11,500 | 0 |

The ₹400 missed in M2 is added in full to M3. From M4 the expert is back on the normal ₹700, and the plan closes on schedule in M6.

### Case 2 — Low month in the last slot (Long)

| Month | Slot | Earnings | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | S1 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 3,000 |
| M2 | S2 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 2,000 |
| M3 | S3 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 1,000 |
| M4 | S4 | 400 | 0 | 1,000 | 400 | 0 | 600 |
| M5 | — | 12,000 | — | Monthly 1,000 → capped at 600 | 600 | 11,400 | 0 |

The shortfall happens in the last slot, so there are no slots left to spread it over. M5 continues at the normal instalment until the balance clears.

### Case 3 — Three low months in a row (Long)

| Month | Slot | Earnings | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | S1 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 3,000 |
| M2 | S2 | 200 | 0 | 1,000 | 200 | 0 | 2,800 |
| M3 | S3 | 100 | 800 | 1,000 + 800 = 1,800 | 100 | 0 | 2,700 |
| M4 | S4 | 1,800 | 1,700 | 1,000 + 1,700 = 2,700 | 1,800 | 0 | 900 |
| M5 | — | 12,000 | — | Monthly 1,000 → capped at 900 | 900 | 11,100 | 0 |

Arrears roll forward and grow each month: ₹800 into M3, then ₹1,700 into M4. The M4 ask is 2.7× normal and takes the whole payout. This is the cost of having no cap.

### Case 4 — Early payout squeezes the month (Short)

In M2 the expert earns ₹12,000 but took ₹11,800 as early payout, so only ₹200 is available at month end.

| Month | Slot | Earnings | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | S1 | 12,000 | 0 | 700 | 700 | 11,300 | 3,300 |
| M2 | S2 | 200 | 0 | 700 | 200 | 0 (+11,800 early) | 3,100 |
| M3 | S3 | 12,000 | 500 | 700 + 500 = 1,200 | 1,200 | 10,800 | 1,900 |
| M4 | S4 | 12,000 | 0 | 700 | 700 | 11,300 | 1,200 |
| M5 | S5 | 12,000 | 0 | 700 | 700 | 11,300 | 500 |
| M6 | S6 | 12,000 | 0 | 500 | 500 | 11,500 | 0 |

An avoidable shortfall: an early payout holdback (config 11) would have kept ₹700 back in M2.

### Case 5 — Worst case: repeated low months (Short)

What happened, month by month:

| Month | Slot | Earnings | Paid (before) | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | S1 | 400 | 0 | 0 | 700 | 400 | 0 | 3,600 |
| M2 | S2 | 12,000 | 400 | 700 − 400 = 300 | 700 + 300 = 1,000 | 1,000 | 11,000 | 2,600 |
| M3 | S3 | 100 | 1,400 | 0 | 700 | 100 | 0 | 2,500 |
| M4 | S4 | 600 | 1,500 | 2,100 − 1,500 = 600 | 700 + 600 = 1,300 | 600 | 0 | 1,900 |
| M5 | S5 | 12,000 | 2,100 | 2,800 − 2,100 = 700 | 700 + 700 = 1,400 | 1,400 | 10,600 | 500 |
| M6 | S6 | 300 | 3,500 | 0 | 500 | 300 | 0 | 200 |
| M7 | — | 500 | 3,800 | — | Monthly 700 → capped at 200 | 200 | 300 | 0 |

1. **M1:** earned ₹400 against ₹700, so ₹300 rolls into M2.
2. **M2:** asks ₹1,000 and is fully paid, so arrears clears.
3. **M3:** earned only ₹100, so ₹600 rolls into M4.
4. **M4:** asks ₹1,300 but only ₹600 is earned. The ₹700 still missed rolls again, into M5.
5. **M5:** asks ₹1,400, which is 2× normal and the highest ask. It is fully paid.
6. **M6–M7:** a ₹200 shortfall in the last slot is collected in M7 at the normal instalment, and the plan closes.

Four months end with a ₹0 payout (M1, M3, M4, M6).

## Inactivity cases

### Case 6 — Inactive one month, returns next month (Short)

In M3 the expert worked early in the month (₹1,500) but did no shifts in the last Y days.

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 3,300 |
| M2 | Active | S2 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 2,600 |
| M3 | Inactive | S3 | 1,500 | 2,600 | 1,500 | 700 | 800 | — | 0 | 1,100 |
| M4 | Returned | S4 | 12,000 | 700 | 700 | 700 | 0 | 800 | 12,100 | 1,200 |
| M5 | Active | S5 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 500 |
| M6 | Active | S6 | 12,000 | 500 | 500 | 500 | 0 | — | 11,500 | 0 |

M3 still pays its ₹700 slot, and only the extra ₹800 is held. The plan closes on schedule in M6.

### Case 7 — Inactive month clears the whole balance, returns next month (Short)

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 3,300 |
| M2 | Inactive | S2 | 5,000 | 3,300 | 3,300 | 700 | 2,600 | — | 1,700 | 0 |
| M3 | Returned | S3 | 12,000 | 700 | 700 | 700 | 0 | 2,600 | 13,900 | 1,900 |
| M4 | Active | S4 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 1,200 |
| M5 | Active | S5 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 500 |
| M6 | Active | S6 | 12,000 | 500 | 500 | 500 | 0 | — | 11,500 | 0 |

### Case 8 — Inactive for 3 months, returns in M6 (Short)

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 3,300 |
| M2 | Active | S2 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 2,600 |
| M3 | Inactive | S3 | 2,000 | 2,600 | 2,000 | 700 | 1,300 | — | 0 | 600 |
| M4 | Inactive | — (paused) | 0 | 600 | 0 | 0 | 1,300 | — | 0 | 600 |
| M5 | Inactive | — (paused) | 0 | 600 | 0 | 0 | 1,300 | — | 0 | 600 |
| M6 | Returned | S4 | 12,000 | 700 | 700 | 700 | 0 | 1,300 | 12,600 | 1,200 |
| M7 | Active | S5 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 500 |
| M8 | Active | S6 | 12,000 | 500 | 500 | 500 | 0 | — | 11,500 | 0 |

In M3, ₹2,000 is collected. ₹700 counts as the S3 instalment, so only ₹2,000 − ₹700 = ₹1,300 is refunded in M6. M4 and M5 have no earnings, so the schedule pauses and there is no catch-up spike on return.

M6 is 3 months after M3, so the return is still inside the T = 3 refund window. Returning in M7 or later would mean no refund (see Case 9).

### Case 9 — Returns after the refund window (Short)

The expert goes inactive in M2 and returns in M10. With T = 3, the window closes at the end of M5.

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 3,300 |
| M2 | Inactive | S2 | 3,000 | 3,300 | 3,000 | 700 | 2,300 | — | 0 | 300 |
| M3–M4 | Inactive | — (paused) | 0 | 300 | 0 | 0 | 2,300 | — | 0 | 300 |
| M5 | Inactive | — (paused) | 0 | 300 | 0 | 0 | 0 (2,300 → Paid, window closed) | — | 0 | 300 |
| M6–M9 | Inactive | — (paused) | 0 | 300 | 0 | 0 | 0 | — | 0 | 300 |
| M10 | Returned | S3 | 12,000 | 700 → capped at 300 | 300 | 300 | 0 | — | 11,700 | 0 |

The ₹2,300 is never refunded. It counts towards the ₹4,000, so only ₹300 is left on return and the plan closes in M10. Had the expert returned by M5, they would have got ₹2,300 back and run S3–S6 at the normal 700/700/700/500.

### Case 10 — Inactive, returns, inactive again (Short)

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 700 | 700 | 700 | 0 | — | 11,300 | 3,300 |
| M2 | Inactive | S2 | 4,000 | 3,300 | 3,300 | 700 | 2,600 | — | 700 | 0 |
| M3 | Returned | S3 | 12,000 | 700 | 700 | 700 | 0 | 2,600 | 13,900 | 1,900 |
| M4 | Inactive | S4 | 4,000 | 1,900 | 1,900 | 700 | 1,200 | — | 2,100 | 0 |
| M5 | Returned | S5 | 12,000 | 700 | 700 | 700 | 0 | 1,200 | 12,500 | 500 |
| M6 | Active | S6 | 12,000 | 500 | 500 | 500 | 0 | — | 11,500 | 0 |

The plan still closes on schedule in M6, but payouts swing between ₹700 and ₹13,900. A limit on refund cycles may be needed.

## Suspension cases

### Case 11 — Suspended, then reinstated (Long)

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 1,000 | 1,000 | 1,000 | 0 | — | 11,000 | 3,000 |
| M2 | Suspended | S2 | 3,500 | 3,000 | 3,000 | 1,000 | 2,000 | — | 500 | 0 |
| M3 | Reinstated | S3 | 12,000 | 1,000 | 1,000 | 1,000 | 0 | 2,000 | 13,000 | 1,000 |
| M4 | Active | S4 | 12,000 | 1,000 | 1,000 | 1,000 | 0 | — | 11,000 | 0 |

### Case 12 — Suspended past the refund window, reinstated in M8 (Long)

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 1,000 | 1,000 | 1,000 | 0 | — | 11,000 | 3,000 |
| M2 | Suspended | S2 | 3,500 | 3,000 | 3,000 | 1,000 | 2,000 | — | 500 | 0 |
| M3–M4 | Suspended | — (paused) | 0 | 0 | 0 | 0 | 2,000 | — | 0 | 0 |
| M5 | Suspended | — (paused) | 0 | 0 | 0 | 0 | 0 (2,000 → Paid, window closed) | — | 0 | 0 |
| M8 | Reinstated | — | 12,000 | 0 | 0 | 0 | 0 | — | 12,000 | 0 |

Reinstated after the window, the expert gets no refund, but nothing more is owed either. The full ₹4,000 is recovered by M2.

## Balance left after the schedule ends

Once all slots are used, the plan does not collect the remaining balance at once. It continues at the band's normal instalment until the balance clears.

### Case 14 — Low months at the end, inactive, returns in M9 (Long)

| Month | State | Slot | Earnings | Arrears | Ask | Deducted | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Active | S1 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 3,000 |
| M2 | Active | S2 | 12,000 | 0 | 1,000 | 1,000 | 11,000 | 2,000 |
| M3 | Active | S3 | 300 | 0 | 1,000 | 300 | 0 | 1,700 |
| M4 | Active | S4 | 500 | 700 | 1,000 + 700 = 1,700 | 500 | 0 | 1,200 |
| M5–M8 | Inactive | — (paused) | 0 | — | 1,200 | 0 | 0 | 1,200 |
| M9 | Returned | — | 12,000 | — | Monthly 1,000 | 1,000 | 11,000 | 200 |
| M10 | Active | — | 12,000 | — | Monthly 1,000 → capped at 200 | 200 | 11,800 | 0 |

On return, the expert pays the normal ₹1,000, not the full ₹1,200 at once. Nothing was held, so there is no refund.

### Case 15 — Same expert, but earns ₹3,000 in an inactive M5, returns in M6 (Long)

M1–M4 are as in Case 14, so the Balance is ₹1,200 going into M5.

| Month | State | Slot | Earnings | Ask | Deducted | Kept as EMI | Held | Refund | Payout | Balance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M5 | Inactive | — (schedule over) | 3,000 | 1,200 | 1,200 | Normal 1,000 | 200 | — | 1,800 | 0 |
| M6 | Returned | — | 12,000 | Normal 1,000 → capped at 200 | 200 | 200 | 0 | 200 | 12,000 | 0 |

Even after the schedule ends, the inactive month keeps the normal ₹1,000 as EMI. Only the extra ₹200 is held, and it is refunded on return.
