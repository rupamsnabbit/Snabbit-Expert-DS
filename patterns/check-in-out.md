# Pattern — check in, work, check out

The second pattern: everything between *Accept job* and *Ready for next job*. It is the longest stretch she spends in the app and the one where the money, the safety promise and the customer relationship all live on the same screen. The shipped flow (Lifecycle file → *Final Designs DS Compatible*: *Reach Job Location* `16:14340`, *Job Started* `10:8552`, *Job In Progress* `19:15700` / `6:8405`, *Enter OTP to end job* `10:13110`, *Job Completed* `11:18791`) is already close to the system; this page names its stages, composes each from system parts, and records the handful of departures.

---

## The flow

```
 accepted (pattern: new job)
        │
        ▼
 1. On the way ── state header "Check in" · MapSnippet + Show directions · address + Listen · Call · Chat · Timer "Check in by" · [Check in]
        │
        ▼
 2. Check in ── location check → (far) sheet: Show directions / I'm here anyway (hold) → Job started sheet · Shield starts
        │
        ▼
 3. Working ── state header "Job in progress" · Timer "Time left" · customer card · ShieldRow · You earn · preferences · [Complete job]
        │
        ▼
 4. Check out ── OTP sheet (NumericKeypad) → Job completed · You earned + breakdown · Rating · [Ready for next job]
        │
        ▼
 Home
```

Every stage keeps the in-job header (`state` variant, Help + SOS) and, once Shield is on, the SafetyStrip when she leaves the screen. Nothing here has a tab bar: she is at work.

---

## What changes from the shipped screens

| Shipped | Proposed | Why |
| --- | --- | --- |
| *CHECK IN BY* · **1:23** digits alone above *Check In* | Timer `L` `countdown`, label *Check in by*, above the Button | Time as a shape (P5); same change as the job alert |
| Customer card: name + *Listen*, address, four tiles Map · Call · Chat · Street view | MapSnippet with **Show directions** (replaces Map + Street view); address with inline Listen; **Call** and **Chat** as two Buttons `secondary M` under the card | Two ways to the same map is two things to learn; Street view is a novelty on a ₹10k phone (P8). Call and Chat are the actions she uses |
| Chat sheet with the customer's messages and *Quick Replies* (*I have reached* · *Please give approval*) and a free-text field | Kept as a BottomSheet `form` with Chip `quick-reply` (≤ 4) and one TextField; quick replies first, typing last | It is already the right shape; Chips carry the P1 promise that she never has to type |
| *Job Started* sheet: check, illustration, *Say Namaste* tip, **OK** | BottomSheet `info`: check pictogram, scene illustration, one tip spoken aloud, Button **Start work** | *OK* is not a verb (`button.md`); the tip is the moment to speak (P4) |
| *Job In Progress* · *TIME LEFT* **48:23** ring | Same — Timer `L` `countdown` *Time left*; tone computed | Already matches `timer.md`; the label goes sentence case |
| Kavach row with **▶ Activate** / waveform | ShieldRow (`shield-card.md`): starts at check-in, reports *Recording · Location shared* | Decided in the Shield spec (auto-start to confirm) |
| *Complete Job* disabled (pink wash) with no reason until the end time | Button `primary brand L` **Complete job**, `disabled` **with the reason under it** — *Available at 11:00* — enabling 10 min before the end time; a Timer `attention` tone at 15 min | A Button is never disabled without saying why (`button.md`); she should know when she can leave |
| *Enter OTP to end job*: three boxes, *Please ask the customer to share the OTP with you*, **End Job** disabled | BottomSheet `form` with NumericKeypad `otp` (length server-set, 3 today); line *Ask the customer for the code*; spoken; **Complete job** enables on the last digit and auto-submits (`timeout.settle`); a `ghost` **Customer can't share the code?** → Call help | Same shape, system parts; the fallback is the missing piece (P5: every state has a way out) |
| *Job Completed* · *You Earned* ₹150 + breakdown · *Rate the customer* five faces · **Ready for next job** disabled | Same order: Card + Amount `L` + Accordion `breakdown` (expanded), Rating `input`, Button `primary brand L`; while unrated the Button is disabled **with** *Tap a face to continue* under it | The screen is right; it needed the reason line and the Rating component's spoken words |
| Customer preferences as a plain key/value table (*Spice level · Low*) | ListItem rows with Stat `S` trailing, under a section heading, with a Listen on the section | `stat-rating-divider.md`: tables are ListItems; preferences are read aloud in a kitchen |

Kept as shipped: the state header with icon + title (*Check in*, *Job in progress*, *Job completed*), Help + SOS, the customer card order (name · timing · duration), *You earn* as a one-row Card, the block-customer flow after a bad rating.

---

## 1. On the way

```
┌────────────────────────────────────────────┐
│ ( Help )                    ( SOS )        │  HeaderNav state · check-circle + Check in
│              ✓ Check in                    │
│ ┌────────────────────────────────────────┐ │  MapSnippet 240 (hero) · job + me markers
│ │ ▒▒▒  (⌂) Radhika's home      ● You ▒▒▒ │ │
│ │ HAL Old Airport Rd, near railway  (🔊) │ │  address ≤ 2 lines + Listen
│ │ 3.2 km · about 12 min                  │ │
│ │ [ ⇱ Show directions                 ]  │ │  Button secondary brand M
│ └────────────────────────────────────────┘ │
│ [ 📞 Call ]        [ 💬 Chat  ①  ]          │  two Buttons secondary neutral M · Badge on Chat
│ ┌ You'll earn  ₹145 + ₹5 · Check in by 7:45 pm ▾ ┐  Card + Accordion breakdown, collapsed
│                                            │
│              Check in by                   │  Timer L countdown · tone computed from the check-in window
│               ( 1:23 )                     │
│ [ ✓ Check in                            ]  │  Button primary brand L
└────────────────────────────────────────────┘
```

- **Show directions** hands off to the maps app (`map-marker.md`); coming back lands here. The distance line refreshes every 30 s.
- **Chat** opens the BottomSheet `form`: customer messages as plain bubbles (read aloud on open), Chips *I have reached* · *Please give approval* · *Running 10 min late* (≤ 4, server-set), one TextField *Type other message…* with the NumericKeypad **not** used (free text). A Badge on Chat shows unread.
- **Call** goes through a masked number; the Button label is *Call*, never the number.
- The *Check in by* Timer's tone follows `timer.md`; `urgent` at ≤ 60 s. On expiry the Timer says *Late* and a Nudge `loss` explains the consequence if there is one (*Check-in bonus lost · ₹5*); Check in stays enabled — being late is not being blocked.
- **Check in** is one tap. Tapping it runs the check-in (2).

## 2. Check in

- The app checks her location against the customer's. Within the radius → check-in succeeds. Outside it → BottomSheet `confirm`: *You're about 400 m from Radhika's home* with the MapSnippet 160 (job + me), Button `primary` **Show directions**, and `ghost danger` **I'm here anyway** as a **hold** — a wrong check-in is costly for her (P3, P11).
- No GPS fix in 5 s → the same sheet with *Can't find your location*; **Check in anyway** (hold) is allowed and the job is flagged for review, told to her plainly: *We'll confirm with the customer*.
- Where the flow requires a check-in photo (a subset of jobs, server-set) it is the MediaCapture `preview` with the `face` guide **before** the location check, SOS in the header.
- Success: the **Job started** sheet — BottomSheet `info`, `check-circle` fill 40 `iconSuccess` on a `bgSuccess` disc, the scene illustration for the job type (*greeting at the door*), one tip in `BodyLg` spoken aloud (*Say namaste and ask where to start*), Button `primary brand L` **Start work**. `sound.confirm`. Shield starts here (ShieldRow `starting` → `on`); the sheet's dismissal lands on (3).
- Offline: check-in is **queued** — the Button goes `loading`, then the screen moves to (3) with a Banner `warning` *Check-in will send when you're back online*; the Timer records the tap time, not the send time. Never a blocked check-in for lack of network (P5, P8).

## 3. Working

```
┌────────────────────────────────────────────┐
│ ( Help )                    ( SOS )        │  HeaderNav state · clock + Job in progress
│           ⏱ Job in progress                │
│              Time left                     │  Timer L countdown · calm → attention (15 min) → urgent (≤ 20 %)
│               ( 48:23 )                    │
│ ┌────────────────────────────────────────┐ │  Card
│ │ 👤 Radhika S               [📞] [💬]  │ │  customer row · IconButtons S secondary brand
│ │ 🕒 Job timing        10:00 – 11:00 am   │ │  ListItem rows, Stat S trailing
│ │ ⏳ Duration                    60 min   │ │
│ │ 🛡 Shield  ● Recording · Location shared│ │  ShieldRow · last row
│ └────────────────────────────────────────┘ │
│ ┌ You earn                        ₹145 ┐   │  one-row Card · Amount M · tap → breakdown
│ Customer preferences                (🔊)   │  section heading + Listen
│ 🌶 Spice level                   Low       │  ListItem + Stat S
│ 🫙 Oil level                  Medium       │
│                                            │
│ [ ✓ Complete job                        ]  │  disabled until 10 min before end · reason line under it
│   Available at 10:50                       │
└────────────────────────────────────────────┘
```

- The Timer counts **down** (*Time left*), as shipped; `elapsed` is reserved for overtime (see edges).
- **Complete job** enables 10 minutes before the end time; the reason line disappears when it enables. Before that, the only way to end early is Help (call the trainer) — early completion is a support decision, not a tap.
- Preferences come from the customer and are read aloud with the section's Listen; there are ≤ 6 rows, or a *See all ›* ListItem.
- The screen never sleeps while it is on top (she puts the phone on the counter); brightness follows the system.
- Leaving the screen (to Earnings, say) is allowed; the SafetyStrip shows *Recording · Location shared* and tapping it returns here. The tab bar is hidden during a job; Home is reached only by finishing.

## 4. Check out

- **Complete job** → BottomSheet `form`: title *Enter the code to finish*, line *Ask the customer for the code* (spoken), NumericKeypad `otp` with the server-set length (3 today), Button **Complete job** enabling on the last digit and auto-submitting after `timeout.settle`. Wrong code: boxes shake (`motion.xfast`), *Wrong code — ask again* spoken; after 3 wrong codes **Call help** joins as `secondary`.
- `ghost` **Customer can't share the code?** → calls Help directly; the sheet stays.
- On success: the **Job completed** screen — HeaderNav `state` *Job completed* with `check-circle`; Card *You earned* + Amount `L` `textSuccess` + Accordion `breakdown` expanded (Work · Check in by 7:45 pm · Summer bonus · Overtime — the same rows as the alert, now earned); *Rate the customer* with Rating `input` (five faces, spoken word on tap); Button `primary brand L` **Ready for next job**, disabled with *Tap a face to continue* until a face is chosen.
- `sound.confirm` and the accept celebration (`motion.celebrate`) play once when the screen appears — this is the moment the money became hers (P6).
- **Ready for next job** → Home; a Toast *₹150 added to today's earnings*. Shield stops; ShieldRow `ended` is visible in the job's detail later.
- A rating of *unhappy* or *very unhappy* offers **Block this customer** as a `tertiary` Button under the faces (shipped flow kept); it opens a `confirm` sheet with the block-list count (*4 of 5 blocked*), safe option first.

---

## Edges

| Edge | Behaviour |
| --- | --- |
| Late for check-in | Timer `expired` → *Late*; Nudge `loss` with the lost bonus; Check in still one tap. A red card, if any, is shown **before** it applies (Nudge) and **after** as a Snackbar on Home |
| Customer not home / not answering | Chat quick reply *I have reached* → after 5 min a Banner `info` *Waited 5 min? Call help* with **Call help**; the wait is paid per policy and the Banner says so (*Waiting time is paid*) |
| Overtime | At *Time left* 0:00 the Timer switches to `elapsed` **Overtime** counting up, `textWarning`, and an Accordion row *Overtime · 15 min · ₹40* appears in *You earn*; **Complete job** stays enabled |
| Customer extends the job | Banner `info` *Radhika asked for 30 more minutes · ₹75* with **Accept** (tap) / **Decline** (hold); the Timer resets on accept |
| Job denied in the last hour (shipped *Last hour job denied*) | Not on this screen: it is a Snackbar on Home with the reason and *Why? ›* |
| Shield blocked or stopped | ShieldRow states; never a modal; work continues (`shield-card.md`) |
| Battery < 15 % during the job | Banner `warning` *Battery low — charge if you can*; nothing else; Shield's own row handles its state |
| Offline during the job | Timer runs from the device clock; check-out queues like check-in; the code is validated offline against a hash sent at accept time, so *Complete job* works without signal |
| SOS or SafetyCheck at any point | Take over everything; return here after (P7) |
| Screen reader | Each stage's Card is one block; Timer live region at 15 min, 5 min, 0; the OTP boxes announce digit count |

---

## Parts used

HeaderNav `state` · SOSControl · MapSnippet · MapMarker · VoicePrompt inline · Button (`primary L`, `secondary M`, `ghost danger` hold) · IconButton `S` · Badge · Chip `quick-reply` · TextField · BottomSheet `form` / `info` / `confirm` · Timer `L` (`countdown`, `elapsed`) · Card · ListItem · Stat `S` · Amount `M` / `L` · Accordion `breakdown` · ShieldRow · SafetyStrip · Nudge `loss` · Banner · NumericKeypad `otp` · Rating `input` · MediaCapture `preview` (where required) · Toast · Snackbar. Nothing new.

---

## Spec follow-ups from this pattern

- `numeric-keypad.md`: the `otp` variant's length is server-set, **3–6** boxes (shipped is 3), not only 4 or 6.
- `timer.md`: the in-job Timer is `countdown` *Time left* (as shipped); `elapsed` is for **overtime** — the mode table's example changes.
- `header-nav.md`: `state` titles used here — *Check in* (`check-circle`), *Job in progress* (`clock`), *Job completed* (`check-circle` fill).
- `chip.md`: quick replies are server-set, ≤ 4, first is always *I have reached*.

---

## Checklist for the flow

- [ ] From accept to *Start work* with one tap per stage on a moving bus; Show directions returns to the same screen.
- [ ] Check in works offline (queued) and with no GPS fix (hold, flagged, told plainly).
- [ ] *Complete job* is never disabled without the reason under it; the OTP sheet has a way out when the customer can't share the code.
- [ ] Shield state is readable on every in-job screen and on the SafetyStrip off it.
- [ ] Kannada at 1.3: *Job in progress*, *Customer preferences*, *Ready for next job* fit their budgets.
- [ ] Field review with experts (checklist rows 15–16) — pending; test the OTP moment with a real customer.
