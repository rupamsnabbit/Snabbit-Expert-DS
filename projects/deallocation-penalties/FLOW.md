# Flows — Expert penalty constructs

The three journeys this PRD creates, from her side of the phone. Answers from the lead (2026-10-27) are applied: hold, not swipe; *Decline*, not *Deny*; only the toggles trigger; a dead battery is never carded; no "my phone died" path (dropped by the lead, 2026-10-27). Screen ids (N1–N8, E1–E6) are the rows in `TIERS.md`.

Everything here runs **only during an active shift** (PRD: `shift_id`), with or without a job in hand. SOS and Help stay in the header through every flow, including while a sheet is open (P7).

---

**The red cards moment** (shipped `87:39237`, the lead 2026-10-27): wherever red cards are issued below, the shipped full-screen moment plays first — red wash, one −50 card per red card, a ribbon naming the reason (*MOBILE DATA OFF*, *PHONE OFF*, *APP STOPPED*, *JOB DECLINED*, *EARLY LOGOUT*) — then the next screen.

---

## Flow A: she switches something off (the app is still running)

Data off, location off, location permission off. (Airplane mode: out of scope, product 2026-10-27.)

```
On shift, something goes off
        │
        ├── No signal, data still on (lift, basement, GPS glitch, empty fix)
        │        └──► calm offline Banner (patterns/offline.md) ── no sheet, no penalty
        │
        └── She switched the setting off herself (the toggle, not the signal)
                 │
                 ▼
          App in the background? ── notification rings ── tap ──┐
                 │                                               │
                 ▼                                               ▼
          N1 · Warning sheet + ringer (rings through silent, its own sound)
          picture of the state · countdown · red cards she would get (+ logout, if on)
          one fix action: Turn on data · Turn on location · Allow location · Turn off airplane mode
                 │
                 ├── Fixed before the countdown ends ──► sheet closes · no red cards   [reverted_in_time]
                 │
                 └── Countdown ends (decided on the phone; synced when back online)   [penalised]
                          │
                          ├── Logout on  ──► A5 · logged-out screen: "Your mobile data was off during your shift"
                          └── Logout off ──► the same popup stays: "Mobile data is still off" + Turn On Data (no timer, no second red-card strip: one penalty, shown once)
```

- **Popup only** (the lead, 2026-10-27): no *I Understand*; the sheet stays on top of whatever screen she is on, job screens included, until she fixes the setting. SOS and Help stay reachable above it.

- She switches it off again later in the shift: a **new incident**, a new countdown.
- Her shift ends while the countdown is still running: the countdown stops; the incident is recorded as *abandoned* (open question 16).

---

> **Out of scope (product, 2026-10-27, `prd.md` v1.1):** only data off, location off and location permission off ship. Airplane mode and all of Flow B are kept below for the record only; the Paper page is parked as *Out of scope*.

## Flow B: phone switched off, or app force-stopped (the app cannot warn her)

```
Phone off, or app force-stopped
        │
        ▼
Nothing shows while it is dark (a dead app cannot ring)
        │
        ▼
Phone switched on / app reopened
        │
        ├── Battery had died (low battery on the last signal) ──► never carded · nothing shown
        │
        ├── Total time dark this shift < 30 min ──► nothing shown; the minutes still count
        │      (PRD default: the threshold is TOTAL off-time in the shift, not one stretch —
        │       three 12-minute switch-offs = 36 min = over the threshold on the third return)
        │
        ├── Total time dark this shift ≥ 30 min, shift still running                      [penalised]
        │        │
        │        ├── Logout on  ──► N4 · logged-out screen: "Your phone was off for 36 min during your shift · 2 red cards"
        │        └── Logout off ──► N3 · stays on shift · same fact and red cards as a Snackbar on Home · Why? ›
        │                 │
        │
        └── Her shift ended while she was still dark                                        [abandoned]
                 └──► N4b · on next open: "Your shift ended while your phone was off" · red cards (open question 16)
```

- Force stop reads the same as phone off with *"…the app was stopped for 36 min…"*.

---

## Flow C: the On the way screen, after she accepts a job

The PRD's *check-in screen*, read as our `check-in-out.md` § 1 *On the way* (open question 17).

```
E1 · On the way  (Check in by ⏱ · [Check in] stays the main button)
        │
        ├── Taps PX (customer representative)
        │        ▼
        │   N6 · "Call the customer" sheet · [Call customer]
        │        ▼
        │   2 calls made ──► [Call PX] appears
        │
        ├── Job ≥ 1.1 km away ──► [Decline] shown
        │        ▼
        │   N7 · warning sheet: 2 red cards
        │        ├── Goes back ──► nothing lost (the tap is still recorded)
        │        └── Holds Decline ──► job gone · red cards · Home
        │
        └── Job < 1.1 km away ──► [Early logout] shown  (never both)
                 ▼
            N8 · warning sheet: 2 red cards + logged out for today
                 ├── Goes back ──► nothing lost (the tap is still recorded)
                 └── Holds to log out ──► red cards · Home, logged out for today
```

---

## What the flows add to the PRD, and why

| Added | Why |
| --- | --- |
| Notification when the app is in the background | The PRD's ringer has to come from somewhere when another app is on top |
| N3 (logout off → Snackbar on Home) for both groups | The PRD's logout switch is on every case; with it off she stays on shift and must still be told |
| N4b (shift ended while dark) | The PRD's `abandoned` status is a state she will see on her next open |
| Battery died → never carded; dead zone / empty fix → Banner | The lead's answers 5 and 6, and the PRD's own rule |

Numbers on the screens (2 min grace, 2 red cards, 36 min) are illustrative; the PRD's values are placeholders.
