# Figma linear flow (Beauty Expert Master `686-12720`) compared with the Paper board

**Summary**

- The Figma flow follows the shipped shell from accept to block. It has 27 frames that make 20 steps, and its spine is the same as Paper's.
- **Multiple services show properly in only one place: the buffer and in-progress screens.** On those screens (f11–f14), both services (*Fruit facial*, *Leg massage*) appear as cards with their products underneath. Everywhere else they drop out or change:
  - Acceptance shows one of the two services, and only as a line inside the earnings card (f00).
  - Check in shows no services at all (f03).
  - *Products you used* groups by category (*Facial / Body*) instead of by service (f19).
  - *What was different* uses a third service name, *Back massage* (f20).
  - Completion says only *Work (1 hour)* (f21).
- **Add-ons appear in one frame only (f13), and only as extra time.** There is a banner, a hatched segment on the timer ring, and *60 min + 15 min*. No frame shows which service was added. No frame shows an add-on arriving before check-in. None of its products appear.
- **Figma is closer to the shipped app or the pattern than Paper on these points:**
  - The OTP has 3 digits.
  - The no-OTP fallback asks for the customer's phone number.
  - Running late is a state of the check-in page, not a sheet.
  - Earnings and rating sit on one completion page.
  - Blocking is offered after a low rating.
  - Products are listed inline, per service, during the job.
  - Added time is shown as a segment of the ring.
- **Paper is closer to the PRD and the principles on these points:**
  - Services are listed at check-in (§ 3).
  - The add-on is shown at service level as well as time level.
  - § 6 has the "vs usual" line and the reason chips.
  - Disabled buttons say why.
  - The block copy and buttons pass the content rules.
  - The buffer timer is calm and she can start early.

## 1. The Figma flow as a linear sequence

1. **New job.** f00 shows the countdown at 1:23. f01 is the same screen at 00:23: urgent, with a red *If job not accepted −50* banner.
2. **Message customer.** f02 is a sheet over Check In with a prefilled line: *Hi, I am on my way…*.
3. **Check in.** f03. f04 is a pixel-duplicate of f03.
4. **Running late.** f05 is a state of the Check In page. f06 is f05 with the earnings card expanded.
5. **Code to start job.** f07 is empty; f08 is filled with 6 6 6.
6. **No-OTP fallback.** f09 asks for the customer's phone number. It is reached from *No OTP*, and *Use OTP instead* goes back.
7. **Job started.** f10 is a success sheet with the namaste illustration and an *OK* button with a moving band.
8. **Buffer.** f11, *Get ready with your things*, 08:23.
9. **Job in progress.** f12, 48:23.
10. **Extension.** f13 is a branch off step 9, not the next step: f14 goes back to *60 min*.
11. **Last 15 min.** f14 has a red timer, the banner *15 mins remaining*, and *Complete Job* is enabled.
12. **Help nudge at 03:23.** f15. f16 is not a screen; it is the illustration for f15's empty slot.
13. **Code to end job.** f17 is empty; f18 is filled.
14. **Products you used.** f19.
15. **What was different.** f20, reached from *No i used more/less*.
16. **Completion page.** f21: inventory banner, earnings, rating faces, and *Ready for next job* disabled.
17. **Low rating, then block offer.** f22: the angry face is selected and *Block Customer?* appears.
18. **Block confirm.** f23.
19. **Block list full.** f24 shows 5/5. f25 shows 4/5 after one unblock.
20. **Blocked.** f26: a red toast, and Radhika's row now says *Unblock*.

The canvas has an empty gap between f18 and f19 (`overview.png`). Nothing is drawn there.

## 2. Figma step → Paper screen

| Figma step (frames) | Paper | Verdict | Difference |
| --- | --- | --- | --- |
| 1 New job (f00, f01) | 1.01 | differs | Figma has no Deny and no job card. The only service is a line inside the earnings card, one of the job's two services. Products sit behind an *Items required for this job ›* row. Paper has a separate job card with every service and a products link. |
| — | 1.01a, 1.01b | only on Paper | Deny on a last-hour job, and the denial-reasons placeholder, are not in Figma. |
| (destination of f00's items row, not drawn) | 1.02 | only on Paper | Figma's row has a chevron, but the screen it opens is not drawn. |
| 2 Message customer (f02) | — | new in Figma | This is the shipped send-message sheet (FRAMES § *New*). Paper has no equivalent. |
| 3 Check in (f03, f04) | 1.03 | differs | Same customer card, *Listen* and four tiles. Figma lists no services, only the collapsed items row. Paper has a *What to prepare* card with the services and *Take out 9 products ›*. |
| 4 Running late (f05, f06) | 1.03a | differs | Figma turns the page's own timer band red (*Running late −01:23*) and keeps *Check In* on the page. Paper uses a separate confirm sheet. |
| 5 Code to start (f07, f08) | 1.04 | differs | Figma: 3 boxes, no keypad drawn, secondary *No OTP*. Paper: 4 boxes, a `NumericKeypad` tray, and *She can't share the OTP*. |
| 6 No-OTP fallback (f09) | 1.04a | differs | Figma's fallback is the phone number used for the booking. Paper lets her *Start without OTP* with no check at all. |
| 7 Job started (f10) | — | new in Figma | This is the shipped success moment. Its background already shows the service timer at 48:23, before the buffer (f11). |
| 8 Buffer (f11) | 1.05 | differs | Figma reuses the in-progress screen: a new title, the same green *Time left* ring, a disabled *Complete Job* and the full services list. Paper uses Timer `buffer` *Setting up*, says *Nothing is running yet*, and offers *I'm ready, start the service*. |
| — | 1.05a | only on Paper | Starting before the buffer ends. |
| 9 Job in progress (f12) | 1.06 | differs | Figma shows each service as an expanded card with its products under *Customer Services*. Paper shows service rows with a product count and *See the full list ›*. |
| — | 1.07 | only on Paper | The in-job products sheet. Figma's inline lists make it unnecessary. |
| 10 Extension (f13) | 1.06a | differs | Figma is time-level only: banner, a hatched segment on the ring, *60 min + 15 min*. Paper adds the service level (added row with Tag *Added*) but has no ring segment. |
| 11 Last 15 min (f14) | state of 1.06 | new in Figma | Red tone, a warning banner, and *Complete Job* enabled. Paper draws only the disabled state. |
| 12 Help nudge (f15, f16) | — | new in Figma | A Househelp prompt with a cleaning illustration (spray, mop, wand). |
| 13 Code to end (f17, f18) | 1.08 | differs | Figma: 3 boxes, *End Job*, and no way out if the customer can't share the code. Paper: 4 boxes, a keypad, *Complete job*, and a fallback. |
| — | 1.08a | only on Paper | Auto-checkout. |
| 14 Products you used (f19) | 1.09 | same structure, differs in detail | Both are a sheet in the shipped *What tasks did you do?* slot, with the PRD's two answers. Figma groups by *Facial / Body*, shows the count *1* over four items, and puts a map arrow on every row. Paper groups by the job's services. |
| — | 1.09a | only on Paper | The *All 9 came off* result. |
| 15 What was different (f20) | 1.10, 1.10a | differs | Figma has a stepper per product and nothing else: no "vs usual" line, no mark on a changed row, no reason chips, and the button says *Save changes*. Its products also differ from f19's. |
| 16 Completion page (f21) | 1.11 + 1.12 + 1.13 | differs | Figma puts everything on one page: inventory banner, earnings, rating, *Ready for next job*. Paper uses three surfaces: a stock sheet, a rating page and a completion page. |
| 17 Block offer (f22) | 1.12 | differs | In Figma, blocking appears only after the lowest face is chosen. Paper's *Don't send me to Radhika again ›* is always visible. |
| 18 Block confirm (f23) | 1.12a | differs | Figma: *Are you sure you want to block?* with *No / Yes*. Paper: *Stop getting jobs from Radhika?*, a strip saying how many people she can block, *Yes, block Radhika* and *Keep her*. |
| 19 Block list full (f24, f25) | 1.12b | differs | Figma's sheet has no way out and *Unblock* is one tap. Radhika is then blocked with no step of her own. Paper has *Leave it for now*. |
| 20 Blocked (f26) | — | new in Figma | The blocked state, with a toast and an *Unblock* row. |

## 3. What Figma answers among SCOPE open questions

| Q | Answered? | Evidence |
| --- | --- | --- |
| 2 Extension: booked or added mid-job | **Partly, leaning mid-job** | f13's banner arrives while the timer is running (14:23 left). Your note that customers can "later … add on" points the same way. The expert needs no offer or consent flow, because the customer adds it in the consumer app. Still open: when an add-on can arrive, whether she can refuse one she has no products for, and whether an *add-on service* is the same thing as a *time extension* (f13 shows time only). |
| 12 One services block or three densities | **Answered differently from Paper** | Before check-in there is one collapsed *Items required ›* row (f00, f03). After check-in there are expanded cards per service (f11–f14). This leaves check-in thinner than PRD § 3 asks. |
| 16 Name and address on acceptance | **Answered in practice: no** | f00 shows neither, which matches Paper. PRD § 1's wording still says otherwise, so record the decision. |
| 17 A Beauty *Customer preferences* block | **Answered: none** | *Customer Services* takes Cook's preferences slot (f11–f14), as Paper's *What you need* does. |
| 18 A *Your cooking space* equivalent | **Answered: none** | No photo step anywhere. |
| 5 Trust: blind confirm vs spot checks | Leans, not settled | f19 keeps a one-tap *Yes, used as expected* with no spot check, which sides with job § 6. The policy conflict with the shift PRD stays open. |
| 7 Same product in two services | Open, and made visible | f11–f14 list *Cleansing milk* and *Fruit facial kit* under both services. That is exactly the double-count case. |
| 8 A reason per changed line | Open | f20 has no reasons at all. |
| 3, 4 Buffer length; is the buffer paid | Open | 08:23 on f11 is the only hint. Nothing says the buffer is paid or unpaid. |
| 6 Auto-checkout | Open | Not drawn. |
| 9 Can inventory go negative | Open | f20's steppers show no limits. |
| 11 Denial reasons | Open | Figma has no Deny at all. |

## 4. Conflicts

**With the PRD**
- **§ 1:** f00 shows only *Fruit facial*, although the job carries two services (f11). Products hide behind an undrawn row, so acceptance does not show "services booked and the products/quantities needed".
- **§ 1:** The job's time window appears nowhere on f00. The only time is *Check In by 7:45 PM* inside the earnings card, which contradicts f11's *10:00 AM – 11:00 AM*.
- **§ 3:** f03–f05 list no services and no products, while § 3 says Check in "now also lists the services and products/inventory needed".
- **§ 4 buffer:** f10 shows the service timer (48:23) before the buffer (f11). That goes against "the service timer hasn't started yet".
- **§ 4 extension:** f13 gives time-level visibility only. No service is marked as the add-on, so "both time and service level" is half met.
- **§ 6 grouping:** f19 groups by *Facial / Body*, not by service, and a count of *1* sits over four products.
- **§ 6 labels:** f19 says *No i used more/less* where § 6 says *Something was different*. f20 says *Save changes* where § 6 says *Save what I used*.
- **§ 6 same list:** f20's products and services (*Back massage*, *Eye serum*, *Night cream*) are not "an editable version of the same list" f19 showed.
- **§ 6 editing:** f20 has no "+1 pcs vs usual 1" line, no mark on a changed row, and no reason chips.
- **§ 1 / § 2:** f01's *If job not accepted −50* penalty has no PRD line. It may belong to Payout.
- **§ 7 / § 8 order (not a real conflict):** f21 shows earnings above the rating, on one page. § 8's own "shown the same way as it is for Househelp" and `patterns/check-in-out.md` line 120 both support that order, so I read the PRD's flow prose as loose.

**With the principles**
- **P1:** f19 puts `navigation-arrow` on every product row. That icon is registered as "her heading" (`icons.md` line 15).
- **P1 / CLAUDE.md:** f10 uses an emoji as an icon (*🙏 Say Namaste*).
- **P2:** On f11 the buffer's only primary is a disabled *Complete Job*. `timer.md` line 70 says she may end the buffer early, so she has no next action.
- **P5 (buffer label):** f11 labels the buffer *Time left* on the same green ring as the service timer. Nothing says her service time has not started; `timer.md` sets the label *Setting up*.
- **P5 (disabled without a reason):** *Complete Job* (f11–f13), *Start Job* (f07), *End Job* (f17) and *Ready for next job* (f21) are disabled with no reason line under them.
- **P5 (stale fact):** f13 still shows *Job Timing 10:00 AM – 11:00 AM* after the 15-minute extension.
- **P5 (timer tone):** The same remaining time gets two tones: amber at 14:23 on f13, red at 15:23 on f14. f14's banner also says *15 mins* while the digits say 15:23.
- **P5 (no way out):** f17 has no path if the customer can't share the code; `check-in-out.md` line 43 requires one. f24/f25 have no ✕ and no *leave it*.
- **P3:** On f24/f25, *Unblock* is one tap with no confirmation, and it removes a block she set for herself. f26 then shows Radhika blocked without any step of hers.
- **P3 / `bottom-sheet.md` line 102:** f23 is a costly confirmation, yet it has a ✕ and a side-by-side *No / Yes*, with *Yes* in brand pink rather than danger.
- **P6 (blocking moment):** f10 is a win moment she must dismiss with *OK*. Win moments should last ≤ 1.5 s and never block the next action.
- **P6 (red for success):** f26 confirms her own choice with a red toast.
- **P6 / `assets.md` line 90:** f01 uses the red card, which is registered for *Attendance penalty*, for a missed acceptance.
- **Assets:** f21's rating uses the outline faces; `assets.md` § 5 keeps only the coloured, soft-shaded set. f16 puts cleaning tools in a Beauty flow.
- **P7:** f26's toast covers Help and SOS. Every sheet in the flow also dims SOS behind the scrim. Paper's sheets do the same, so check both.
- **P9:** f24/f25 cut addresses short with "…".
- **SCOPE Q14 rule:** f00/f01 use the green *Accept Job* with no danger action beside it. The `accept` tone is allowed only next to one.
- **`progress-button.md`:** f00, f01, f03 and f05 show a Timer and a button band at once, which is two clocks, and the band grows from the right.

**With `foundations/content.md`**
- **Title case (§ 2):** *New Job, Accept Job, Check In, Start Job, End Job, Job In Progress, Complete Job, Customer Services, Job Timing, Block Customer?*
- **Caps (§ 2 line 28, retired):** *ACCEPT IN, CHECK IN BY 7:45 PM, RUNNING LATE, TIME LEFT, FRUIT FACIAL, BACK MASSAGE.*
- **Banned labels (§ 9):** *OK* (f10), *Okay* (f15), *No / Yes* (f23).
- **Named in SCOPE as cannot-ship:** *Are you sure you want to block?* (f23).
- **Exclamation mark and a success line with no number (§ 2, § 4):** *Inventory updated successfully!* (f21).
- **Jargon and unnamed people (§ 2, § 9):** *OTP* instead of *code*; *the customer* instead of *Radhika* (f07, f09, f17, f26).
- **Formats (§ 5):** *7:45 PM*, *10:00 AM - 11:00 AM*, *15 mins remaining*, *00:23 / 08:23 / −01:23* and *−50* should read *7:45 pm*, *10:00 – 11:00 am*, *15 min left*, *0:23* and *− ₹50*.
- **Not a verb (§ 3):** *No i used more/less* (f19).
- **Vocabulary (§ 8):** *End Job* should be *Complete job*.
- **Punctuation (§ 2):** a full stop on a one-line title (f15).
- **Feature-speak (§ 9):** *Activate* on Kavach. Paper has this too.
- **Units:** f19 mixes *1 unit / 35 g / 1*.

## 5. IGNORE: top card (owned by Payout)

The differences are only listed here, with no recommendation:
- f00/f01 list *Fruit facial (1 hour)* where f21 says *Work (1 hour)*.
- The lines add up to ₹185 under a ₹150 headline.
- When she is late, f05–f07 strike ₹150 down to ₹145 and fade the ₹5.
- *OT (15 min) ₹40* is the only money trace of the extension.
- *Summer Bonus ☀️* keeps its emoji.
- The *Items required for this job ›* row hangs off the card's foot (f00, f03–f06).

## 6. What should change on Paper

**A. Multiple services and add-ons (your question)**
1. **Keep the services block outside the earnings card, on every stage.** Figma loses the services wherever they depend on that card (f00, f03, f21), and the card belongs to Payout. Paper already has the block outside: 1.01 job card, 1.03 prepare card, 1.06 Beauty slot. Keep all three.
2. **Give every service header its name, duration and product count.** Figma has only a job-level *60 min* (f11), so she cannot tell which service the extra 15 min belongs to. The earlier Lovable prototype already did this (`02-check-in.png`, *25 min · 7 products*).
3. **Buffer and in-progress: take Figma's per-service cards with products inline (f11–f12).** Then drop 1.06's *See the full list ›* and the 1.07 sheet. It can be built today from Card + Divider `labelled` + ListItem `quantity`. A collapsible version needs an Accordion kind; the nearest existing one is `week`, so a new kind is an ask of core.
4. **Mark only what changed after she accepted, with Tag *Added* on the new service row.** The row goes on whichever stage she is on:
   - **Before check-in:** a new 1.03 variant. The added row joins the prepare card, its products join the count, and a Banner `info` and a sound announce it (P4).
   - **During the job (1.06a):** keep Paper's service-level row and add Figma's time level: the banner, *60 min + 15 min*, and the added-time ring segment. *Job timing* should move to 11:15 am.
   - **In § 6 (1.09 / 1.10):** the added service is its own group, so its products are deducted.
5. **Ask of core: an added-time segment for the Timer.** `timer.md` has none. f13's hatched segment carries the meaning with shape as well as colour (P1).
6. **Split Q2 in SCOPE into two cases:** an *add-on service* (new service, new products, new time) and a *time extension* (more time, same service).

**B. Other changes the Figma evidence supports**
7. **1.04 / 1.08:** use 3 boxes, since the length is set by the server and is 3 today (`check-in-out.md` line 43). Keep the keypad and the fallback on the end sheet.
8. **1.04a:** use the phone-number fallback from f09 (PRD § 3, "same fallback path as Househelp") instead of *Start without OTP*. Record it in `patterns/check-in-out.md`, which currently names *Call help* as the fallback.
9. **1.03a:** make running late a state of 1.03 (f05; `check-in-out.md` line 75) rather than a sheet.
10. **1.01:** take Deny off the main line; keep it on 1.01a and a long-distance variant (PRD § 2). Without Deny beside it, the green *Accept job* tone no longer applies (Q14).
11. **Merge 1.11, 1.12 and 1.13 into one completion page**, as in f21, Lovable `06-job-completed.png` and `check-in-out.md` line 120. Give it HeaderNav `state` *Job completed*, and show the § 6 result as a Banner `success` with the number instead of the 1.11 sheet.
12. **1.12:** offer blocking only after a low rating (f22), which is also the pattern's conditional. This reverses BUILD.md's "Not changed" note, so log it.
13. **Add the states Figma has and Paper lacks:**
    - f10 job started: put it over the buffer, and make it dismiss itself.
    - f14 *Complete job* enabled: Figma enables it at 15 min left, the pattern at 10 min.
    - f26 blocked: a Banner `success` naming Radhika.
    - f02 message sheet: mark it as inherited.
14. **Decide whether Beauty keeps the f15 help nudge at all.** If it stays, it needs a Beauty illustration.

**C. Keep Paper where Figma is weaker**
- Services at check-in (PRD § 3).
- Timer `buffer` *Setting up*, with the early start (P2, P5).
- Reason lines under disabled buttons.
- The fallback on the end-job code sheet.
- § 6 grouped by service, with the delta line and the reason chips.
- The block confirmation copy and a way out of 1.12b (P3, P5).
- Paper's single job story from `catalogue-sample.md`. Figma uses four different service sets (f00, f11, f19, f20) and repeats the same product list under two services.

**New open questions to add to SCOPE**
- When can an add-on arrive (before accepting, before check-in, or mid-job)? Can she refuse one she has no products for?
- Does an add-on move the 30-minute auto-checkout deadline (§ 5)?
- Whose rule is f01's −50 penalty?
- Should *Complete job* enable at 15 min left (f14) or 10 (pattern)?
- Does Beauty keep the f15 help nudge?

I only read and compared. Nothing was written or edited, and no lint or build was run.

Files read:
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/BUILD.md`
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/SCOPE.md`
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/TIERS.md`
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/prd.md`
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/reads/job-lifecycle-beauty-master/FRAMES.md`
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/reads/figma-linear-flow/` (frames f10, f11, f13, f15, f19, f20, f21, f24 and `overview.png`, checked against the transcription)
- `/Users/rupambanik/Downloads/Snabbit-Expert-DS/projects/beauty-job-cycle/reads/lovable-prototype/` (all 6 images)