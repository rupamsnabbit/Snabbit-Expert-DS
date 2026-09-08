# Pattern — a new job arrives

The first pattern, and the model for every time-critical flow: what happens from the moment the server offers her a job to the moment she is on her way, has declined, or has missed it. The screen itself is `components/job-alert.md`; this page is the flow around it — sound, wake, overlay, the three exits, and the edges (offline, repeat, several at once). It replaces the eight-line reference case in `PRINCIPLES.md` as the detailed version; the principles page keeps the summary.

---

## The flow

```
 server offers job
        │
        ▼
 1. Arrive ── sound.newJob loops · haptic.heavy · screen wakes · full-screen takeover (or lock-screen notification with Accept job)
        │
        ▼
 2. Decide ── JobAlert: facts strip · earnings card (read aloud once) · Timer L draining · Decline (hold) · Accept job
        │
        ├── Accept ──► 3a. Confirm loudly ── sound.confirm · 800 ms celebration · job screen: MapSnippet + Show directions + check-in Timer
        │
        ├── Decline (hold) ──► 3b. Declined ── sound.commit · Toast "Declined" · Home; on a repeat alert the red card shows as a Snackbar
        │
        └── Timer 0 ──► 3c. Time's up ── 2 s · closes · "This job went to someone else"; on a repeat alert the red card shows as a Snackbar
```

---

## 1. Arrive

- **Sound first.** `sound.newJob` starts before the screen is drawn and loops gently until she acts or the window closes. It overrides silent mode and Do Not Disturb (an OS-level alarm channel), because a missed job costs her money and the sound is the one thing she can notice with the phone in her bag (P4). Volume follows the alarm volume, never media volume.
- **Haptic** `heavy` once on arrival, then `light` ticks for the last 10 s.
- **Wake and take over.** In the app: the JobAlert replaces whatever is on screen, except an active SOS or Shield SafetyCheck (safety always wins, P7); the alert then waits and its Timer starts only when it is shown. Outside the app: an Android full-screen intent shows the same screen over the lock screen; on iOS a time-sensitive notification with the **Accept job** action opens it. The *Display over other apps* permission is asked once, in onboarding, with the `permission` BottomSheet explaining exactly this moment.
- **One at a time.** If two jobs arrive together, the second waits, unseen, and its Timer starts when it is shown. A queue is never shown; she is never asked to compare.
- **Repeat alerts.** If she does not respond and the server offers the same job again, the alert comes back as a `repeat` with the Nudge `loss` (red-card asset · −50 · *If you don't accept*) — the penalty is shown before it applies, never after (P5, P6).

## 2. Decide

The JobAlert screen. Four facts in a glance, the money as the hero, the time as a shape, one Button under the thumb. The card is read aloud once on arrival (VoicePrompt autoplay rule), the Timer speaks at 10 s. Nothing on the screen scrolls, animates or changes except the Timer.

While she decides, the header cluster stays live: Help (call the trainer) and SOS. Tapping the facts strip or the address does nothing — there is no map before acceptance, because the decision is *distance and money*, not *route* (P2).

## 3a. Accept

- Accept goes `loading` (label kept) while the server confirms — ≤ 3 s; the Timer keeps running so a slow network cannot make an expired job look accepted.
- On success: `sound.confirm`, an 800 ms celebration (the illustration layer's *ok-hand* pictogram scaling in on a `bgSuccess` wash — reduced motion: a static check), then the **job screen**: HeaderNav `state` *Job accepted*, the MapSnippet with **Show directions**, the address with Listen, the check-in Timer in `countdown` mode (*Check in within · 42:10*), and the Shield row if consent is given.
- If the server says the job is gone (someone else accepted): the alert becomes `expired` with the *This job went to someone else* line and closes after 2 s. No error tone, no red — it is not her mistake.

## 3b. Decline

- Decline is a **hold**: a 600 ms fill sweeps the ghost Button; releasing early cancels with no penalty and no message. Completing fires `sound.commit`, the label becomes *Declined*, and the alert closes to a Toast *Declined*.
- No confirmation sheet, ever: the hold is the second gesture (P3), and the consequence — if any — was already visible as the Nudge. On a `repeat` alert the red card is applied on decline and shown as a Snackbar on Home: *Red card · −50 · Job declined twice*, with *Why? ›* opening the penalties Accordion `faq`.
- Declining never asks for a reason. A reason picker is a Local-tier addition for a later experiment, and it would sit **after** the decline, never before it.

## 3c. Time's up

- At 0 the Timer shows *Time's up · 0:00*, both Buttons disappear, the line *This job went to someone else* appears, `sound.commit` plays low, and the screen closes after 2 s to wherever she was.
- On a `repeat` alert the red card applies and shows as the same Snackbar as 3b.
- No *You missed a job!* sheet, no red, no exclamation: warm and honest (P6).

## Edges

| Edge | Behaviour |
| --- | --- |
| Offline when the alert arrives | Alert still shows (it came by push or SMS fallback); Banner `error` *No connection — can't accept right now*; Accept `disabled` with *Waiting for network…* under it; the app retries every 3 s and enables Accept the moment it can. Decline works offline (queued). |
| Network drops while accepting | Accept stays `loading` under the 3-second rule, then becomes `disabled` with the reason; the Timer keeps running. |
| Alert arrives during a job | Not shown; the server should not offer overlapping jobs. If it does, the alert waits until check-out and is dropped if its window has passed. |
| Alert arrives during SOS / SafetyCheck | Never shown until the safety state ends (P7). |
| Screen reader on | Sound and haptic unchanged; the card is read as one block; Accept is first in the tab order. |
| Phone at 130 % font scale | Five breakdown rows still fit; the facts strip wraps to two lines; Button labels never shrink. |
| Reduced motion | Timer ring still drains (it is information); no digit pulse (digits go bold); no hold sweep (a countdown label instead); static celebration. |

---

## What this pattern changes in the principles

`PRINCIPLES.md` reference case, line 4, said the countdown was *a ring around the accept button*. The Timer spec placed it above the Button as a pill ring, and the shipped screens already do the same with digits alone. The principles line is updated to match: the Timer sits above the Button, the ring is the Timer's own. Line 5 is updated to name the Button *Decline* (hold), matching `button.md`.

---

## Checklist for the flow

- [ ] Sound plays with the phone silent and in a bag; volume follows alarm volume.
- [ ] Full-screen takeover shows over the lock screen on the three most common phones in the fleet.
- [ ] The card is read aloud in Hindi, Kannada and Marathi within 4 s of arrival.
- [ ] Accept succeeds in one tap on a moving bus; Decline never fires by accident (hold).
- [ ] Repeat alert shows the red card **before** it applies; decline and timeout show it after.
- [ ] Offline: Accept says why it is disabled and enables itself when the network returns.
- [ ] Nothing scrolls; five rows fit at 130 % font scale on 360 × 800.
- [ ] Field review with experts (checklist rows 15–16) — pending.
