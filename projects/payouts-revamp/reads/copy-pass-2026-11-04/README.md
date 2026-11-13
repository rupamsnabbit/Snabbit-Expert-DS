# Copy pass — payout states, all four v2 sections (2026-11-04)

Asked: *"read ux copies of other apps on mobbin and solve our thing … stakeholders didn't understand it well … say
payment triggered, or something similar … do a copy sanity finish all over"*.

## What shipped apps do (Mobbin, iOS)

| App | How they name the stages |
| --- | --- |
| [DoorDash Dasher](https://mobbin.com/screens/b8c3f342-b2b8-4987-a8cc-58c592f37d82) | *Initiated by DoorDash · Nov 24* → *Deposited to bank · Nov 27 – Dec 1* — who did it, and a date on every step |
| [Fidelity](https://mobbin.com/screens/81c49260-ded3-476c-bd0b-4557a2d20a92) | *Today* → *Processing · 1–3 business days* → *Money will be delivered* |
| [Marcus](https://mobbin.com/screens/0d72165f-a2d5-419d-91cc-cfd62115d7c1) | *Transfer scheduled* → *Funds available*, a date under each |
| [Brex](https://mobbin.com/screens/fdf16c74-5c67-4189-9ffb-4d2b83819811) | *Submitted* → *Approved* → *Payment estimated on Jan 22* |
| [Binance](https://mobbin.com/screens/01089d07-a4c1-4fb1-8c42-d21cae82d9da) | *Withdrawal Processing* + amount + estimated completion time |
| [Zomato](https://mobbin.com/screens/2225c0f4-21e4-4ebb-a71f-1cf8aa070700) | *Payment of ₹0.90 failed* — the amount in the title — then what happens to the money, then *Retry payment* |

Rules taken: **one state word per stage, the same word in every flow** (scheduled → sent → bank processing → credited /
failed); **who acts** (*Sent by Snabbit*); **a date or time on every pending step**; **the amount in a failure title**;
**a verb on every button** (no *Click to*). Nothing structural borrowed.

## The vocabulary now used everywhere

| State | Card line (under *Monthly Payout*) | Sheet title | Journey step |
| --- | --- | --- | --- |
| Scheduled | *Scheduled for 2 Aug ‘26* | *Scheduled for 2 Aug ‘26* | *Sent by Snabbit · 2 Aug* (pending) |
| Sent (the "triggered" moment) | *Sent, reaches by 3 Aug ‘26* | *Payout sent* | *Sent by Snabbit* ✓ |
| Bank working on it | — | — | *Bank is processing · Today* |
| Instant retry | *First try failed, sending again* | *Payout sent* | *Payout failed · Attempt 1* → *Sending again · Today* |
| Credited | *Credited to your bank* + *UTR 1234567890* | *Credited to your bank* | *Credited to your bank* + UTR |
| Failed | *Payout failed* + *Could not reach your bank* + **Withdraw** | *Payout failed* · *Resend to get ₹18,555* · **Resend Payout** | *Payout failed · Attempt 1/2/3* |
| On hold (T&S) | *On hold* | *Payout on hold* | *Complaint raised* → *Under review* → *Payout released* |

## Every change

| Was | Now | Where |
| --- | --- | --- |
| Coming on 2 / 4 August | Scheduled for 2 / 4 August | Monthly 1.01, 1.10, 1.11, PAN row; T&S T1–T3 |
| Reaching you by 3 Aug ‘26 · Expected by 3 August | Sent, reaches by 3 Aug ‘26 | Monthly 1.02, 1.12d |
| Payout coming soon to you · Payout processing | Payout sent | Monthly 1.02 sheets; Early 2.05, 2.05b |
| Payout sent (step) · Payout date | Sent by Snabbit | all journey sheets |
| Processing at bank | Bank is processing | Monthly 1.02 sheet; Early 2.05 |
| Second attempt | Sending again | Monthly 1.02 retry sheet; Early 2.05b |
| First try failed, trying again | First try failed, sending again | Monthly 1.02 retry |
| Credited to bank | Credited to your bank (T&S: Payout released) | all journeys |
| Paid on 3 August · Payout credited to bank | Credited on 3 August · Credited to your bank | Monthly 1.03 |
| UTR:1234567890 | UTR 1234567890 | Paid card and sheets |
| Reason: Could not connect · Click to withdraw | Could not reach your bank · Withdraw | Monthly 1.06 |
| Resend to receive | Resend to get | failed landing sheets |
| In [X] hours · will be credited in your bank account within [X] hours | Within 12 hours · reaches your bank within 12 hours | Early 2.04, 2.05 (the 12 h the amount screen already promises) |
| Processing · Paid (withdrawal tags) | Sent · Credited | Early recent withdrawals |
| Max.Early payout | Max. Early payout | Early |
| Not available this month | Not available while on hold | T&S held frames |
| Add bank account to receive (it) | Add bank account to get it | T&S held + no bank |
| Add UPI ID/ Bank Account | Add UPI ID / Bank Account | everywhere |
| Add your UPI / Bank Account to enable payout | Add UPI or bank account to get paid | everywhere |
| PAN Card helps reduce Income Tax | Pay 1% tax instead of 20% | everywhere |
| Add PAN Card to reduce tax | Add PAN Card to pay 1% tax | tax row helper |
| Add your PAN Card · Add PAN card | Add PAN Card | everywhere |
| Add PAN (Card) to save ₹1,900 | … save ₹4,655 | PAN strip and sheet (20 % ₹4,900 − 1 % ₹245) |

Kept: every live label (*Total Earnings*, *Monthly Payout*, *Min G*, *Base Pay* …), the lead's own T&S line
*Trust and safety investigation is underway*, *Payout failed*, *₹X payout failed*, *Resend Payout*, *Understood*.
Prorated MinG v2 needed no change.

**Dates (lead, same day):** status and card lines show the year in short form — *3 Aug ‘26*, not *3 August*. Journey step dates (*2 Aug*) unchanged.

## Urgency on the bank and PAN sheets (lead, same day)

Mobbin's bank / tax-ID prompts (Lightyear, Fuse, Chime, Brex, bunq, N26, Venmo, Cash App) are neutral and legal in tone;
none creates urgency, so the urgency here comes from **the stake as a number in the title** and **a real date** — not from
banned filler (*Hurry*, *Don't miss out*).

| Sheet | Title | Line | Tag |
| --- | --- | --- | --- |
| Bank, monthly (Sheet 4, T&S B1) | *₹14,900 is waiting for you* (₹17,555 on B1) | *Add it before 2 Aug ‘26 to get paid on time* | *No bank account added* |
| Bank, held (T&S C1) | *₹19,555 is waiting for you* | *Add it now, so the money can reach you when the hold ends* | same |
| Bank, Early payout (2.11a) | *₹14,900 is waiting for you* | *Add it now to take your Early Payout today* | same |
| PAN (Sheet 4 · No PAN) | *Save ₹4,655 on tax* | *With PAN you pay 1% tax, not 20%* | *No PAN added* (kept) |
