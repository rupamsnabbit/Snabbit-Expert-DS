# Review meeting — payout visibility and early payout, 2026-10-22

| | |
| --- | --- |
| Who | The design lead (Rupam Banik) and the payouts stakeholder; transcript pasted into the project chat 2026-10-23 (Hindi / English) |
| Files | `whiteboard-payout-visibility.webp` · `whiteboard-early-payout.webp` — the board drawn in the meeting |
| Kind | Evidence for `../../prd.md` § B. The transcript also covered prorated Min G and the statement's arithmetic; both are **parked** and not part of this ask |

## Whiteboard 1 — Payout visibility

```
                 2nd                                 3rd
Pre-shadow ──► Triggered ──► Success
     ▲              └──────► Failed (at xx/xx · mention error reason) ──► Re-trigger ──► Success
     │                                                                        └────► Failed ──► Re-trigger ──► Success
Case 1) Bank added ──┬─ PAN ✓                                                                       └────► Failed ──► CTA (Withdraw)
                     └─ PAN ✗ — Add PAN & pay only 1 % tax
Case 2) Bank not added ──► ┌ Bank not added ─────────────────────┐
                           │ Your payout will not be triggered   │  (spans every trigger date)
                           │ until bank added     [ ADD BANK ]   │
                           └─────────────────────────────────────┘
                                    └──► Added ──► "You're in the next lot → to trigger xx date"
```

## Whiteboard 2 — Early payout

```
Early payout ──► Trigger ──► Success
                    └──────► Failed — why? ──► Nudge to re-trigger
(Bank not added case to be handled)
```

## What was said, in order

1. Today she only sees a payout's **final** status in the payout schedule (paid or not), and the add-bank / add-PAN prompts. The ask is **end-to-end visibility** of each payout.
2. **Pre-shadow.** Before the payout is triggered, tell her it is coming so she is not anxious. Payouts used to trigger on the **5th**; from **October 2026 on the 2nd**; the aim is the **1st from January 2027**. The pre-shadow comes **T-1 or T-2** before the trigger. What it says depends on her account: **no bank** → add your bank; **no PAN** → upload PAN; **all set** → your payout is approaching.
3. **Triggered.** "It is triggered and will be in your bank by …" — commit to a **date** (next day), not "24 hours".
4. **Success / failed.** On failure she can do nothing; show that **we will re-trigger at a fixed time** and **why it failed** (an error reason on every failure — bank downtime, our downtime, …; the list will come from a call with Razorpay). Experts' banks are often small banks with low success rates.
5. **Two system re-triggers.** After the second retry also fails, no third automatic try: give her a **CTA to withdraw it herself**, with the reason; tapping it re-triggers.
6. **Show only the current piece**, not the whole timeline.
7. **Bank not added** is explicit: *your payout will not be triggered until you add a bank — Add bank*, and it stays through every trigger date. If she adds the bank before the next lot: *you are in the next lot, triggered on <date>; money by the next day*.
8. **PAN missing**, across everything and large: *20 % tax is cut — add PAN and pay only 1 %*.
9. **Early payout** runs the same rail with three differences: **no pre-shadow**, **no automatic re-trigger** (triggered → success / failed → nudge her to re-trigger, as many times as it takes), **no PAN message**. The bank-not-added case must be handled.
10. Keep the anxiety low throughout: "we are re-triggering, don't worry" → "we could not do it, please withdraw it yourself".

## Answers given by the design lead on 2026-10-23

| Question | Answer |
| --- | --- |
| Folders | One project, `payouts-revamp`, with the two as workstreams inside it |
| Status on Home | No — the status is not shown on Home |
| Gap between a failure and the retry | **Hours** (the meeting said "20"), a fixed retry time shown to her |
| Which payouts get the journey | **The monthly payout** only — not the bonus rows |
| A failure caused by wrong or closed account details | Cover it — retrying will not fix it, so it needs its own path |
| Early payout screens | `../early-payout-live/` |
| Failure reasons until Razorpay's list arrives | Three placeholders: the bank's side · our side · account details |
| Constraint | **Build on top of the existing screens** |
