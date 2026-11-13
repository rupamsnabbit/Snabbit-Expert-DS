# The ask — Advance attendance: tomorrow and the day after, every shift

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | Rupam Banik (design lead), relaying a product ask — in chat, 2026-10-01 |
| Captured | 2026-10-01, in two passes: the ask, then answers to twelve intake questions |
| Kind | Captured in conversation — no written PRD |
| Confirmed by | Rupam Banik, 2026-10-01 — *"let's go with your recommendation"* after `EXPLORATION.md`: ask after logout (one new day per evening), the record on Home replaces the shipped *Present / Absent* question, weekly off shown and not askable, lock at midnight before the day. Penalty amount and the no-logout reminder hour remain product inputs, recorded in `SCOPE.md` |

There is no document, so this file **becomes** one. Before anything is designed, write down what was asked in the same detail a PRD would carry — what is being built, for whom, what problem it solves, what is in and out of scope, what is already decided, what is not — then read it back and get it confirmed. An unwritten ask drifts; a written one can be checked against later.

This section is closed once confirmed. After that it is evidence and is not edited; new information goes to `SCOPE.md` → *Log*, and a genuinely changed ask is a new version below.

---

## What was said (verbatim, 2026-10-01)

> another project has come on the fly for me, so now we want to take multi day and multi shifts at the same time from an expert. problem statement is if today is thursday, i can ask attendance for friday and saturday. that is next two days. now in each day there are multiple shifts as well, and we have to take attendance for that
>
> ill also tell u why we doing this, so we are doing favorites right now where scheduled booking is done and we'd like to take attendance is advance so that we can accomodate well. rememebr our persona, this is a complex problem statement and we solve this design wise so lets get started

Second pass, answering the intake questions:

> forget about scheduling now, we arent doing scheduling in experts
> 1. shift here is time in which they work, they can have multiple shifts in a day, 8am to 12pm, then 4pm to 8pm etc
> 2. everyone daily, and they get asked for tomorow + 1, and in tomorrow also mark tomorrows shifts attendance separately.
> 3. no she cant see booking, she gets bookings real time
> 4. after she logs out we ask, that mark attendance
> 5. default is present if she isnt filling
> 6. so if she gets 1-2 leaves, if she is informing early when we ask then cool, but if she is changing a decision she took then we penalise her, for absent to present and for present to absent
> 7. nothing changes here
> 8. no reward
> 9. she can change untill like 12 in the night
> 10. this is something we should take a call on
> 11. ON FRIDAY, she doesnt get to mark friday attendance man, she marks saturday and sunday
> 12. again lets discuss on this
> hope u got the problem satement, main issue is that we are asking so much from them and we need to keep the flows simple

## The ask, as captured

**1. What is being built.** Every day, after the expert logs out, the app asks her which of her shifts she will come to on **tomorrow and the day after** — each day has one or more shifts (*8:00 am – 12:00 pm*, *4:00 – 8:00 pm*, …) and each shift is answered on its own. The window rolls: on Thursday she answers Friday and Saturday; on Friday, Saturday and Sunday. **Today is never askable.**

**2. Who it is for, and when she meets it.** Every expert, every day. The moment is the end of her working day — right after logout — and the answers stay visible and changeable afterwards from Home.

**3. What problem it solves.** Operations knows two days ahead who is coming to which shift, instead of learning it the morning of. (The favourites / scheduled-booking reason that opened the ask was withdrawn in the same conversation: *we aren't doing scheduling in experts*. She does not see bookings here; jobs still arrive in real time.)

**4. In scope.** The ask after logout; the surface where tomorrow and the day after are answered shift by shift; the five states; sound and voice; changing an answer and what that costs; how the answers show back on Home and in the day's record.

**5. Out of scope.** Leave for longer periods (*Apply leave* stays). Changing standing shift hours or work area. The morning *Login* and the shift lifecycle itself. The no-show penalty (unchanged). Any customer-side surface.

**6. Already decided.**
- Shifts are time blocks; a day can have several; answered per shift.
- Everyone, daily; asked after logout; window = tomorrow + the day after; today is not askable.
- **Default is Present** when she does not answer.
- Telling us early is free. **Changing a decision she took is penalised**, in both directions (Present → Can't come and Can't come → Present).
- She can change an answer **until about midnight**.
- No reward for answering. The no-show penalty is unchanged.
- She does not see bookings.
- The flow must stay **simple** — the app is already asking a lot of her.

**7. Still open.**
- **Where it lives** (Q10): does this replace the one-day *Mark attendance for tomorrow · Present / Absent* on the shipped Home card? Design recommendation in `SCOPE.md`.
- **Weekly off and approved leave** (Q12): shown and not askable, or hidden? Recommendation in `SCOPE.md`.
- **When does an answer become "a decision she took"?** Default-Present and *change is penalised* need one rule: locks at midnight before the day (anything before is free), or locks at her first explicit tap. Recommendation in `SCOPE.md`.
- **What the change penalty is** (red card · ₹ · coins) — needed for the consequence strip.
- **A day with no logout** (she did not work today): when is she asked?
