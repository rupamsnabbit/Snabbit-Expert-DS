# Pattern — after SOS

`sos-control.md` draws SOS from the hold to the *I'm safe now* hold; `shield-card.md` draws the safety check. This pattern is what the app does **afterwards** — in the minutes, the day and the week after she pressed SOS or answered *I am in danger* — because the moment she is safe is the moment the app most often goes silent, and silence after fear reads as abandonment. Evidence: the shipped *Post SOS Trigger Flow* (`1059:55741`) ends at *Help is on the way · I am safe, end SOS*; nothing after that is drawn. Everything here is proposed.

---

## The flow

```
 SOS ended (I'm safe now, held) · or SafetyCheck answered "I am in danger" then resolved
        │
        ▼
 1. The next minute ── Snackbar "SOS ended · Recording saved" · the job screen becomes "Job stopped" · Shield keeps running until she leaves
        │
        ▼
 2. The next hour ── a call from the safety team (not a form) · the job is closed as "Stopped for safety" · she is paid for the time · no red card
        │
        ▼
 3. The same day ── Home shows a calm card: what happened, what we did, who to call · availability off until she turns it on
        │
        ▼
 4. The next week ── follow-up call · the customer is blocked for her · the record is in Profile → Safety
```

---

## 1. The next minute

- The SOS active screen closes on the *I'm safe now* hold; the screen she returns to is the **job screen in a new state — `stopped`**: HeaderNav `state` *Job stopped* with `shield-check`, the Timer gone, the customer row without Call, and one Button `primary brand L` **Leave now** (opens Show directions to the nearest hub or home, her choice, as a `select` sheet). There is no *Complete job*, no OTP, no rating.
- Snackbar *SOS ended · Recording saved* with **What happens next ›** → the card in (3).
- Shield stays **on** until she taps *I've left* on the Leave screen or is 200 m away; the SafetyStrip says so. Nothing asks her to do anything else for at least five minutes: no rating, no survey, no Nudge, no job alert (alerts are held for 30 minutes after an SOS).
- Voice, once, calm: *"Help is with you. You can leave when you're ready. We'll call you soon."*

## 2. The next hour

- The safety team **calls her** (the number she sees as *Snabbit safety*); the app never asks her to fill in what happened. If she does not answer, the team calls again in 15 minutes and sends the card in (3) as a notification.
- The job closes automatically as **Stopped for safety**. She is paid for the time worked plus the guaranteed top-up for the day; the earnings row reads *Job stopped for your safety · paid in full* with the Shield pictogram — never a deduction line, never a red card, never *Job denied*.
- Any customer rating or complaint from this job is not shown to her.

## 3. The same day — the safety card on Home

```
┌────────────────────────────────────────────┐  Card · bgInfo stage · asset/picto/shield
│ [shield]  You pressed SOS today            │  Heading3
│ Radhika S · 10:14 am · 14 min              │  BodyMd textSecondary
│ ✓ Safety team spoke with you               │  ListItem rows, check-circle, as they happen
│ ✓ Job closed · you're paid in full         │
│ ✓ Recording saved with the safety team     │
│ ○ We'll call you tomorrow to check in      │
│ [ 📞 Call the safety team              ]   │  Button secondary brand M
│ You're off for today. Turn on when ready.  │  Caption + the availability Switch
└────────────────────────────────────────────┘
```

- Availability is set **off** and stays off until she turns it on; the card says so plainly and holds the Switch (`selection-controls.md`). No Nudge about missed earnings appears that day.
- The card stays on Home until the follow-up call is done, then moves to Profile → *Safety* as a record (*4 Mar · Radhika S · SOS · resolved*).
- Rows appear as they happen (`motion.standard`); each is spoken when it appears if the app is open.
- The card is `bgInfo`, never red: red was the emergency; this is the aftermath (row 14, P6).

## 4. The next week

- Follow-up call from the same team member where possible; the card row ticks.
- The customer is **blocked for her** automatically (the block-list count on the rating screen shows it; she can unblock only through Help). She is never sent to that address again.
- Profile → *Safety*: the record, the recording's status (*Saved · 30 days*), **Call the safety team**, **Talk to someone** (counselling line, if offered), and the Shield settings. Nothing here has a red card, a rating or a penalty near it.
- If SOS was pressed by mistake and cancelled in the 5-second window, none of this happens — a Toast *SOS cancelled*, nothing on Home.

---

## False alarms and repeat presses

- Cancelled within `timeout.sosCancel`: Toast only. Ended within 60 s with *I'm safe now*: the minute-after steps happen, the call happens, the card is shorter (*You pressed SOS · everything's fine · we'll still check in*). Nothing about a false alarm is ever framed as her fault; the copy never says *false alarm*.
- Three SOS presses in a month → the follow-up call is by a supervisor and the card offers **Change my area**; never a warning, never a restriction shown in the app.

---

## Content

- *Job stopped* · *Leave now* · *SOS ended · Recording saved* · *You pressed SOS today* · *Safety team spoke with you* · *Job closed · you're paid in full* · *We'll call you tomorrow to check in* · *You're off for today. Turn on when ready.* · *Call the safety team* · *Talk to someone*.
- Voice: the same calm speaker as the SOS screen; present tense; no exclamation marks; nothing spoken more than once.
- Never: *Incident*, *Report*, *Ticket*, *Case ID*, *false alarm*, *Please rate your experience*, *Are you sure?*

---

## Parts used

HeaderNav `state` · Button · Snackbar · SafetyStrip · ShieldRow · Card (`bgInfo` stage) · ListItem · Switch · Toast · MapSnippet (Leave now) · VoicePrompt. Nothing new; the `stopped` job state joins `check-in-out.md`'s stage 3 as a fourth exit.

---

## Checklist for the pattern

- [ ] After *I'm safe now*, nothing asks her for anything for five minutes; job alerts are held for thirty.
- [ ] The job closes as *Stopped for safety*, paid in full, no red card, no rating shown.
- [ ] A human calls within the hour; the app never asks her to describe what happened.
- [ ] The Home card is `bgInfo`, ticks as things happen, holds the availability Switch, and moves to Profile → Safety after the follow-up.
- [ ] The customer is blocked for her without asking.
- [ ] Copy reviewed aloud in four languages by the safety team as well as native speakers.
