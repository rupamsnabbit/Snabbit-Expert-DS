# Critique — the Earnings v2 screens, read as the expert

2026-10-05 · design lead asked: *be a design critic of the screens you have made, analyse what you're thinking on each one as a user.* Read as Sunita — a cook, reads Hindi slowly, checks the app on the bus between jobs, phone brightness low, often with one hand. Figma rebuild: *Expert App — Earnings revamp (critique build)*.

## The verdict first

The set answers **call 1** (deductions) well and **call 2** (payout) half-way; it does **not yet touch call 3** (red cards). Four words for money sit on one screen. Nothing speaks. A past-month and a failed-payout state are not drawn. The screens are tidy; they are not yet the three-call answer the concept file promises.

## E · Earnings

**What she sees first:** a green block with a bank icon and *₹16,100*, then a line with three dots, then three rows with amounts, then a grey box of minus numbers, then a second card with *₹50,000* half off the bottom.

- **Good.** The first number is the one she wants: what is coming, and when. The tracker says *where* it is without a sentence. The three rows are the whole month in three lines.
- **Four money words.** *Earnings* (header), *Payout*, *Daily earnings*, *Net earnings* — plus *Bonuses* and *Deductions*. The persona reads word by word; four nouns for money on one screen is the confusion this project set out to remove. *Net* means nothing to her. Candidate: header *Earnings*, band *Payout*, row *Work* or *Days*, card *This month*.
- **Green is a status colour here.** The band is `bgSuccess` because the shipped card is. P6 reserves green for *done / safe*. *Processing* in pink under a green band says two things. Recorded departure, still a departure.
- **The deductions panel is the loudest region.** Open by default was the right call for call 1, but visually the screen reads *money, then five things taken away*. The proud number (*₹50,000*) is below the fold on a 360 × 800 phone. Business wanted it seen; the layout hides it.
- **Icons in the panel do not carry their meaning yet.** Coin stack, ID card, bank, note, bag: three of five are abstract to her. The row opens a sheet, so the icon is decoration, not a channel. Either register meanings she already knows or drop the icons and let the words and dates carry it.
- **Add PAN** is pink text inside a grey panel on a row that also has a chevron: two affordances on one line. The sheet should hold the button; the row should hold the warning dot only.
- **Date twice.** *Payout · 18 Apr* in the band and *18 Apr* under the third tracker node.
- **No voice.** The system has a VoicePrompt; the persona research says voice is the channel. The one control that would cut calls most is missing from every screen.
- **Not drawn:** payout failed (Razorpay), no bank account, past month (tracker all green, no *Add PAN*), empty month.

## Y · Daily earnings (weeks)

- **Good.** Week cards with the current week open; *Today* in brand; the moon for an off day; one chevron per day.
- **Header says *Daily earnings*, content says *Week 4*.** Label and content disagree.
- **Two numbers per week header** — coins with a pink dot and rupees. The pink dot is not a coin to her; the coin asset exists in `foundations/assets.md`. Either the asset or no coins here (Rewards has them).
- **The red mark on Tue 25** is a 6 dp red rectangle with no word. Red is SOS/error in this system; a mark with no label reads as *something is wrong* and is exactly where call 3 starts. This is the one place red cards appear on the whole flow, and it says nothing.
- **Depth.** E → Y → D → J is four levels. The project asked for minimal navigation. Y exists to hold the week grouping; if coins leave Y, the week grouping is only a divider and Y could fold into E as a *Days* section, or into D's pager.

## D · Day

- **Good.** Two sections only; one line per job; the band says the day in four tokens.
- **The row amount is not the sum of its lines.** *Earnings ₹2,000* over four jobs that add to ₹1,800; the ₹200 appears as *Minimum guarantee* two lines later. She adds the jobs, gets 1,800, and the row says 2,000 — the exact moment she would call. Put the guarantee line *inside* the job list visually (same indent) or label the row *Jobs + guarantee*.
- **The bar has three numbers** (*Jobs ₹1,800 · Top-up ₹200 · Guarantee ₹2,000*). The spec says one value line; this is a sentence of numbers. One number under the line (*Guarantee ₹2,000*) and the fill speaks.
- **Daily pass −₹100 is an unknown term with no door.** Same problem the deduction sheets solved on E; the day's lines do not open. *Product cost · 3 items* — which items? Needs the same sheet.
- **No red card on this day** — the Tue 25 variant was never drawn, so the one deduction that generates call 3 has no designed form at day level.

## J · Job

- **Good.** Simple, one card, the ID at the end with copy. Checked in 6:02 / out 7:35 beside a 6:05 pm start is useful evidence in a dispute.
- **Three times on one screen** (6:05 pm start, 6:02 in, 7:35 out) and a duration in the band. One of the four can go.
- *Rating · Very happy* is a word where the system has a face (`Rating` component, smiley scale). Use the face.
- *Distance ₹5* is a line for five rupees; it will be the first *why only ₹5* call. Either explain in the row (km) or fold into the first service.

## S · End of day

- **Good.** One number, one bar, one button; the moment is small and proud.
- **Done** is on the banned list and does nothing a close doesn't; the sheet after logout may not need a button at all (same logic as the deduction sheets).
- **The scene is a placeholder.** Until the asset exists the sheet is grey text in a pink circle; the brief for it is not written.
- **No red-card variant** — the day she gets a card is the day the sheet matters most.

## E2 / E3 · deduction sheets (data)

- **Good.** Origin, not definition. The segmented bar for 3 of 12 is the clearest thing in the set. Four customer rows answer *which jobs* in a way no sentence can.
- *Left* is a direction before it is an amount; *Remaining* or *Still to pay*.
- *From payout* as a caption lane is a fragment; *Every month* already implies it.
- The one sentence on E3 (*Paid to you in cash by the customer*) will run to two lines in Hindi and Kannada; test at 1.3 ×.
- No *Help* on the sheet — the sheet is where she decides whether to call; a *Call support* ghost row with the term pre-filled is the cheapest call-deflection in the set.

## E2b / E3b · clip sheets

- **Good.** Zero backend; one film per term per language; the voice does the explaining.
- The poster must carry the meaning without playing — she is in a customer's home with no sound and maybe no data. A poster that is a person at a table does not.
- The clip cannot answer *which jobs* or *how many left*. For Cash collected it will still produce the call. The data sheet and the clip are not alternatives; the clip belongs on terms she opted into once (Loan, Kit, Early payout) and the list on terms made of jobs.

## G · Net earnings graph

- **Good.** Six bars, the current one brand, numbers printed, no axis. The *since you joined* number is the motivating one.
- *₹32k* — *k* is English shorthand she does not read. Full numbers or none (the list below has them).
- The month list and the E pager now do the same job. Keep one: G as the door to months, pager gone.
- *Since Oct 2025* and header *Net earnings* — same word problem as E.

## Across all screens

1. **Call 3 is unaddressed.** Red cards appear once, as an unlabeled red mark. Design the red-card line (day level, with the waiver state and the date the money returns) before anything else.
2. **Vocabulary.** Six money nouns across the flow; the pattern's word table needs one word per idea and a Hindi/Kannada/Marathi check at 1.3 ×.
3. **Voice.** Add the VoicePrompt bar to E, D and the sheets. It is already core.
4. **States.** Failed payout, past month, empty month, offline, loading — none drawn.
5. **Icons.** Half the panel icons are unregistered meanings for her; decide per row whether the icon is a channel or noise.
6. **Depth.** Fold Y into E or D once coins leave it.

---

# Round 2 — reading v2 as the user, then v3

Design lead: *rethink the structure; think of yourself as our user; can you understand the design yourself; what would you want; can we simplify more?* Figma page *Structure v3 — simplified*.

## Did v2 make sense to me as the user? Three places it did not

1. **Early payout under Deductions.** I asked for ₹27,000 early on 10 March and got it. Three weeks later the app shows *−₹27,000* in a list called Deductions. To me that is money taken, twice. This single line would generate the "why was I deducted" call on its own.
2. **Three totals that do not talk to each other.** ₹50,000 net earnings, ₹28,000 daily earnings, ₹16,100 payout. I cannot get from one to the next without knowing what was already paid, what the bonuses were and what *net* means. Any number I cannot reach from another number by one subtraction is a number I will ask about.
3. **Four levels for one question.** Earnings → weeks → day → job. The day screen showed nothing the day row could not have opened in place.

## What I want, as the user, in order

1. How much did I earn this month. One number.
2. Where is my money: what was paid, what is coming, when, and is it stuck.
3. What was taken and why, with the thing it came from one tap away.
4. That red card: was it waived, when does the money come back.
5. Then, and only if I am curious, which jobs on which day.

## v3 — the structure that follows from that

**E · Earnings** is one equation on one screen, no scrolling at 800 dp:
*Earned ₹50,000* (Work ₹28,000 › · Bonuses ₹22,000 ›) → *Deductions −₹6,900* (four lines, each opens its origin sheet) → *Payouts ₹43,100* (Early payout · 10 Mar · Paid ✓ · ₹27,000 — Monthly payout · 18 Apr · Processing · ₹16,100 ›). Every number is one subtraction from its neighbour. *Net earnings* became *Earned*; early payout moved to where it belongs; the tracker became a status word per transfer with the full tracker one tap away.

**DY · Days** merges Y and D: a day row opens in place to its jobs and its day costs. Three levels, not four. Coins left (they are Rewards). Tue 25 shows the red card for the first time in the flow — the card, the reason, the money, and a status chip *Waived · ₹100 back 18 Apr*. That is call 3, drawn.

**P · Payout sheet** holds the tracker (Sent · Bank processing · Your account by 18 Apr) and a *Not received by 18 Apr? Call support* row; a **failed** variant shows the bank's return, the reason, and one button *Check bank account*. That is call 2, both states.

**Dropped from the path:** the Net earnings card and the graph screen (the pager answers *other months*; the since-you-joined number belongs on Rewards or Profile), the separate Day screen, the Done button on sheets.

## What I still cannot answer as the user

- Whether *Work* is the right word for the sum of my days (candidates: *Days*, *Jobs*). It needs the Hindi/Kannada/Marathi check.
- Whether bonuses deserve their own sheet or a row per bonus inside Earned.
- Whether the Help pill should be a voice button first (P4) — nothing on these screens speaks yet.
