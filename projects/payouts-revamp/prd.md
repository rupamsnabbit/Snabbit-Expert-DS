# The ask — Payouts revamp

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | The payouts stakeholder, in a review meeting with the design lead (Rupam Banik), 2026-10-22; answers from the design lead 2026-10-23 |
| Captured | 2026-10-23 |
| Kind | Captured in conversation — no written PRD. Evidence: `reads/meeting-2026-10-22/` (whiteboard + what was said), `reads/figma-live-earnings/`, `reads/early-payout-live/` |
| Confirmed by | Rupam Banik (design lead), 2026-10-23 — read back in chat; the three *Still open* items answered the same day (`SCOPE.md` → *Log*) |

There is no document, so this file **becomes** one. Once confirmed it is evidence and is not edited; new information
goes to `SCOPE.md` → *Log*, and a changed ask is a new version below.

---

### What is being built

Two pieces of payout visibility, **built on top of the screens that ship today** (the month statement in Earnings
and the Early Payout screens), not as new screens:

1. **Monthly payout visibility** — she can see where her monthly payout is at every step, from just before it is sent
   until it reaches her bank, and what happens next when it does not.
2. **Early payout visibility** — the same for a withdrawal she asks for herself.

### For whom, and when

The expert, on the Earnings tab, in the days around the start of each month (monthly payout), and after she asks for
an early payout (any day). Today she sees only the final status of a payout — *paid* or *under processing* — and the
add-bank / add-PAN prompts. A failed payout today leaves her guessing, and her banks are often small banks where
transfers fail more often.

### 1 · Monthly payout — the journey

| Step | When | What she must understand |
| --- | --- | --- |
| **Payout approaching** (pre-shadow) | 1–2 days before the trigger date | Her payout is coming soon. If her **bank is not added**: it will not be sent until she adds it — Add bank. If her **PAN is not added**: add it and pay 1 % tax instead of 20 %. If both are in place: just that it is coming |
| **Sent** (triggered) | on the trigger date — the 2nd from October 2026, the 1st from January 2027 | It has been sent; it will be in her bank **by a named date** (the next day) |
| **Paid** | when the bank confirms | It reached her bank (with the reference number) |
| **Failed, retrying** | after the first or second attempt fails | Why it failed, and that **we will send it again at a fixed time** (a gap in hours); she has nothing to do |
| **Failed, withdraw it yourself** | after the second automatic retry also fails — no third automatic retry | Why it failed, and **one action to withdraw it herself**, which sends it again |
| **Account details wrong** | a failure caused by her account (wrong number, closed account) | Retrying cannot fix this; she needs to fix her account details |
| **Bank not added** | any time, through every trigger date | **Explicit**: her payout will not be sent until she adds a bank — Add bank |
| **Bank just added** | she adds a bank after the trigger date | She is in the next batch, sent on <date>, money by the next day |
| **PAN missing** | across every step | Large and plain: 20 % tax is being cut — add PAN and pay only 1 % |

She sees **only the current step**, not the whole timeline.

### 2 · Early payout — the journey

The same steps, with three differences: **no payout-approaching step**, **no automatic retry** (a failure shows why
and lets her send it again herself, as many times as needed), **no PAN message**. The **bank-not-added** case is
handled.

### In scope

- The monthly payout's states on the month statement's existing payout schedule row and whatever it opens.
- The early payout's states on the existing Early Payout screens (*sent* screen, *Recent withdrawals*, the home card).
- The bank-not-added, PAN-missing and account-details-wrong cases for both.
- A failure reason on every failure — three placeholders until the list from Razorpay arrives: **the bank's side · our side · account details**.

### Out of scope

- Payout status on **Home** (no nudge, no snackbar there).
- The **bonus rows** in the payout schedule (Winback, Joining) and the Vishwaas bonus bar — this ask is the monthly payout only.
- Prorated Min G; the statement's arithmetic and hierarchy (*Total business − deductions − tax = net payout*); removing *Adjustments*; grouping the EMIs — discussed in the same meeting, **parked**.
- Changing how early payout is requested (limit, amount, slider) beyond what the states need.

### Already decided — not up for design

- Trigger date: the 2nd of the month from October 2026; the 1st from January 2027.
- Pre-shadow 1–2 days before the trigger; none for early payout.
- Two automatic retries for the monthly payout, then a withdraw-it-yourself action; none for early payout.
- The retry gap is in hours and is configurable; she is shown a fixed time.
- Promise a date (next day), not "24 hours", for when the money arrives.
- Build on the existing screens; no new screens where an existing one can carry the state.

### Still open

- The real failure reasons (call with Razorpay).
- The exact retry gap in hours.
- Whether the *Sent* promise for early payout stays *within 12 hours* (as live) or becomes a date like the monthly payout.

---

## B · v2 — the month statement adds up (2026-10-23)

| | |
| --- | --- |
| From | The design lead, in the project chat, 2026-10-23; the same problem raised by the payouts stakeholder in the 2026-10-22 meeting (`reads/meeting-2026-10-22/`) |
| Kind | A third workstream added to the confirmed v1 ask. v1 is unchanged; its *Out of scope* line *"the statement's arithmetic and hierarchy"* is superseded by this version |
| Confirmed by | **awaiting confirmation** |

### What is being built

**Same screens, no behaviour change — only understandable** (design lead, 2026-10-23): nothing collapses, nothing moves behind a new tap, no section moves.

The month statement on the Earnings tab, **made to add up**, keeping the shipped UI: the same Statement card, band,
rows, row cards and schedule panel — changed only in **order, grouping, labels and what is shown where**.

### The problem (the design lead's words)

*"There is earnings, then there are deductions, then there are again breakdown of something — it makes zero sense."*
The money made no sense to the people who designed it; the stakeholder could not reconcile it on a live device.

### In scope

- One reading order that is one sum: what she earned, what was added, what was taken off, the tax, and what reaches her bank — and nothing between the headline and the total that is outside that sum.
- Where the existing *Monthly Earnings Breakup* rows, the locked bonuses, the tax row and the zero rows go.

### Out of scope

- New components or a new look; the day and week views; prorated Min G; removing *Adjustments* as a concept; grouping the EMIs.

### Still open

The seven questions in `reads/statement-math/README.md` § 5 — first, **what the *Monthly payout* amount includes** (which bonuses are paid inside it and which on their own dates).


## B · v3 — trust and safety: a penalty, or the month held (2026-10-26)

| | |
| --- | --- |
| From | The design lead, in the project chat, 2026-10-26 |
| Kind | A fourth workstream added to the confirmed ask. v1 and v2 are unchanged |
| Confirmed by | the lead's answers to nine questions, 2026-10-26 (below, in their words where given) |

### What is being built

The lead's words: *"in the payouts, we need to add another factor, its called trust and safety … lets say an expert
is accused of stealing something from the customer's home, in that case, we can do two things, either we deduct a
certain amount for them called trust and safety penalty, or we HOLD off the payout for the month … all we have to do
is build the ui on how it would if either of these cases occur."*

1. **Penalty** — a *Trust and Safety Penalty* is taken off the month's payout. The lead's idea: *"place an eye next to
   it or an info icon which opens a bottom sheet saying which job they did it."*
2. **Hold** — the whole month's payout is held. *"if payment is hold out then even that state should be inculcated."*

### Already decided — not up for design

| Question | The lead's answer |
| --- | --- |
| How is the penalty set | a **fixed fine**; the trust and safety team confirms guilt in an internal tool before it is applied |
| Can she dispute it | **no** |
| What is shown about the job | **job-level details only — Job ID, amount earned on that job**; customer privacy is protected (no customer name, address or item) |
| How much is held | **the whole month** |
| How a hold ends | not known; *"doesn't bother us much"* — out of scope |
| Early payout during a hold | **none** |
| Red card | **no** red card is tied to it |
| Name | **Trust and Safety** — copy to be changed later |
| How she is told | the sheet **opens on its own** when she is on the app; **the mascot** (Saathi) is used |

### In scope

- The penalty row in the statement's *Deductions*, and the sheet it opens (the job).
- The held month: the Monthly Payout card, the statement, the journey sheet, early payout switched off.
- The sheet that opens on its own for each case, with Saathi.

### Out of scope

- How a hold ends (released, turned into a penalty). A dispute path. Red cards and tier effects. Final copy.

### Still open

- Where the auto-opening sheet lives — the Earnings tab only, or the home screen too.
- Whether a penalty and a hold can happen in the same month.

## B · v4 — prorated Min G: the day's guarantee, kept, cut or lost (2026-10-30)

| | |
| --- | --- |
| From | The design lead, in the project chat, 2026-10-30, with a whiteboard photo (`reads/whiteboard-prorated-ming-2026-10-30/`) |
| Kind | A fifth workstream added to the confirmed ask ("one more small project came inside payment revamp"). v1–v3 are unchanged |
| Confirmed by | the lead: "create these flows … on paper, finalise iterations there, then Figma"; "create an iteration where we show before she ends as well" (2026-10-30) |

### What is being built

The **day** level of earnings (not the month): how the Min G (minimum guarantee) for one shift is paid, cut or lost, shown on the day's earnings, and — in one iteration — told to her **before** she ends her shift early.

In the lead's words:

- **Min G applicable.** If the base pay she makes is less than the Min G, she gets the Min G, a fixed amount. For this she has to complete her full shift. If she logs out 30 minutes before her full shift ends, the Min G is reduced: Min G ₹500 → she gets ₹450 because she did not finish.
- **Min G not applicable.** Two cases: (1) **late login** — she logged in late (whiteboard: shift starts 8 AM, login 10 AM); (2) **early logout** — she logged out before her time was over. Then there is no Min G and she gets her base pay (whiteboard: *EL → No MinG → Base Pay*).
- The base principle: when base pay is higher than Min G, base pay is what she gets.

### Read with the live app (not the lead's words)

The live day view already has *Min G* and *Base Pay* rows (the one not paid greyed), a **Last Hour Min G Loss** row, and an FAQ: *If you log out early or deny a job in your last hour, your MinG for that remaining time will be reduced* (`reads/figma-master-earnings/`, `reads/figma-beauty-payouts/`). The whiteboard's *Exception · request in last hour* matches it. Working reading, to confirm: leaving **in the last hour** prorates Min G; leaving **earlier** loses it.

### In scope

- The day's earnings in four states: full Min G · prorated · no Min G (late login) · no Min G (early logout); built on the live *Daily Earnings* day view, reached from the *Daily Earnings* row of the payments page.
- An iteration that tells her **before** she ends her shift early what she will lose.

### Out of scope

- The month: the *Daily Earnings* row only adds the days.
- Min BG (Beauty) and split shifts.

### Still open (business rules — numbers and labels only, not layout)

1. The line between prorated and lost: exactly the last hour?
2. Proration maths: Min G × minutes worked ÷ shift minutes, by the minute?
3. Late login: any minute late, or a grace period? Ever prorated?
4. Declining a job in the last hour (live FAQ) — part of this?


## B · v5 — months waiting for a bank account (2026-11-03)

| | |
| --- | --- |
| From | The design lead, in the project chat, 2026-11-03 |
| Kind | A new case inside workstream 1 (*Bank not added*). v1–v4 are unchanged |
| Confirmed by | the lead: "lets try iterations on paper" (2026-11-03) |

### What is being built

The *bank not added* state when it lasts **more than one month**. In the lead's words: she did not add a bank account on 1 October; October is over and she still has not added it, but the payout can still be collected. When November is complete she is owed **two months' earnings**. This can go on for 12–13 months, or longer. The tech sends **all of it at once** when she adds her bank account.

The ask: a **scalable** way to show this — one that works for 2 months and for 13 — tried as iterations on Paper.

### Read with the live ask (not the lead's words)

- v1 already says: *Bank not added* — explicit, through every trigger date; *Bank just added* — next batch, money by the next day. v5 adds the number of months.
- Each month's statement keeps its own sum (v2); what grows is the amount waiting across months.

### In scope

- What she sees while 2 … 13+ months wait: the strip, the Monthly Payout card, the sheet it opens.
- What she sees after she adds a bank: one payout for all the months, in the next batch.

### Out of scope

- The Add UPI / Bank Account flow itself; PAN; early payout.

### Still open (business rules)

1. Is there a limit on how many months are kept, or an expiry?
2. One bank transfer for all months, or one per month sent on the same day? (Changes the UTR line on *Paid*.)
3. Does each past month's card say *Coming on <date>* after she adds the bank, or only the latest month?
