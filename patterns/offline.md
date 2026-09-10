# Pattern — offline and patchy network

The expert's phone loses data in lifts, stairwells, basements and buses several times a day (persona; P8). If every loss were an error she would see red a dozen times before lunch, and she would learn not to trust the app at the exact moments — check-in at the door, check-out in the kitchen — when trust matters most. This pattern makes offline a **condition the app works within**, not an error it reports: what keeps working, what queues, what honestly cannot, and how the app says so once. The components are the Banner, Skeleton, EmptyState `offline`, Button `disabled` with a reason, and the SOS offline path already drawn in `sos-control.md`. No shipped screen shows an offline state; everything here is proposed.

---

## Three rules

1. **Everything she has already seen keeps working.** Screens render from cache; her jobs, earnings, rate card, clips marked *saved*, and the Home card are there without a network. A blank screen for lack of signal is a bug.
2. **Everything she does is queued unless it needs an answer from someone else right now.** Check-in, check-out, decline, photos, ratings, messages, attendance — recorded on the phone with the tap time, sent when the network returns, told to her once. Only accepting a job, verifying a code and paying need the network at that moment, and they say so.
3. **Say it once, at the top, and stop.** One Banner `warning` at the top of the screen while offline; no Toast per failure, no red screen unless there is truly nothing to show. When the network returns, the Banner becomes *Back online · Sending 3 things…* for as long as the queue takes, then leaves.

---

## The Banner

```
│ ⚠ You're offline · Your work is saved and will send when you're back   │  Banner warning · under the header, above content · not dismissible
```

- Appears after **5 s** without a network (not on a one-second blip), on every screen except full-screen job states, where it sits under the state header. It never covers the SafetyStrip; the two stack.
- Variants of the one Banner as the state changes: *You're offline · Your work is saved…* (`warning`) → *Back online · Sending 3 things…* (`info`, with a ProgressBar `S` when > 3 items) → gone. If something in the queue fails on return: *Couldn't send 1 thing — Retry* (`error`, `pattern: error recovery`).
- Spoken once when it appears: *"You're offline. Your work is saved."* Not again when it changes, unless something failed.
- Never a full-screen "No internet" page while anything is cached.

---

## What works, what queues, what waits

| She does | Offline behaviour | Told how |
| --- | --- | --- |
| Opens Home, Earnings, Profile, a job | Renders from the last sync; a `Caption` *Updated 9:40 am* under the hero where numbers matter (earnings, coins) | Banner only |
| Marks **Present** | Queued with the tap time; the card flips to *Present · sending when online* | Banner; the card's Tag `neutral` *Saving…* → `success` on send |
| **Checks in** | Queued with tap time and last known location; the job screen moves to *Job in progress*; the Timer runs from the device clock | Banner `warning` on the job screen: *Check-in will send when you're back online* |
| **Completes the job** (OTP) | The code is validated against a hash sent at accept time, so it works offline; check-out is queued with its time | Banner; earnings row *Pending sync* until sent |
| Takes a **photo** | Kept on the phone; tile `uploading` → after 3 s `queued` (*Will upload when online*, `textSecondary`); never `error` for lack of network | The tile's own state |
| **Rates**, **messages**, **quick-replies** | Queued; Chat shows the message with a small `clock` glyph until sent | Inline glyph |
| **Declines** a job alert | Queued (hold still required); the alert closes | Toast *Declined* as usual |
| **Accepts** a job alert | **Cannot** queue — someone else may take it. Accept `disabled` with *Waiting for network…* under it; the Timer keeps running; retry every 3 s; enables the instant the network returns | On the Button, per `job-alert.md` |
| Verifies an **OTP for login**, adds a **bank account**, requests **early payout** | Wait: the Button `disabled` with *Needs internet* under it; the typed value is kept for 5 minutes | On the Button |
| Watches a **HowToClip** | Bundled clips play; others show *Needs internet* on the card | On the card |
| Opens a **map** | Cached tile or the address fallback; **Show directions** still opens the maps app | Snippet's own fallback |
| Presses **SOS** | Works: dialler call, SMS location, retries — `sos-control.md` | The active screen says *Calling by phone · Location by SMS* |
| **Shield** | Recording continues on the phone; location is buffered; uploads when back; the row says *Recording · saving on phone* | ShieldRow status line |

---

## The queue

- Everything queued is stored with its **tap time**, so a check-in at 9:58 that sends at 10:04 is a 9:58 check-in. The Timer and all earnings use the tap time. She is never late because the network was.
- Sending is silent and in order; the Banner counts down (*Sending 3 things…*). Each item that lands updates its own place (a Tag, a row, a tile) with `motion.standard`; no Toast per item.
- Conflicts (the server says the job was cancelled while she was offline): the item is dropped and the change is explained where it lives — a Banner `info` on the job (*This job was cancelled at 9:45 · you're paid for the trip*), never a modal, never a loss of her record.
- Items older than **24 h** that still cannot send become a Snackbar *1 thing from yesterday didn't send — Retry · Call help*. Nothing is silently discarded.
- The queue survives app kills and restarts; it is visible under Profile → *Waiting to send* (ListItems with the tap time) only when it is not empty.

---

## Truly nothing

When there is no network **and** nothing cached for the screen (first open on a new phone, a screen she has never visited): EmptyState `offline` — *You're offline* · *Your jobs will show when you're back online. SOS still works.* · **Try again** — with the Banner above it. This is the only full-screen offline state, and it still shows the header, the tab bar and SOS.

---

## Patchy, not off

Half the time the network is not gone but slow. The rules are the same ones the loading pattern set: Skeleton after `motion.instant`, at least `timeout.loadingMin`, honest failure at `timeout.loading` (3 s) — and on a slow network the honest failure is **the offline path above**, not an error: the screen shows what it has, queues what she does, and the Banner says *Slow network · Your work is saved*. Requests retry with back-off; nothing spins past three seconds.

---

## Cost

Data costs money (P8). Nothing downloads by itself on mobile data except the queue, job alerts and Shield uploads (which are the job). Clips, maps beyond the snippet and profile photos wait for Wi-Fi unless she taps them, and then say the size once (*Using data · 1.5 MB*, `how-to-clip.md`). There is no "download for offline" setting to find; the app decides what she will need at the door and keeps it.

---

## Content

- *You're offline · Your work is saved and will send when you're back* · *Back online · Sending 3 things…* · *Slow network · Your work is saved* · *Check-in will send when you're back online* · *Waiting for network…* · *Needs internet* · *Will upload when online* · *Updated 9:40 am* · *Recording · saving on phone*.
- Never *No internet connection*, *Network error*, *Failed to fetch*, *Retry* as the only text, a red screen, a spinner that does not end.
- Spoken once per state change that matters (offline; something failed to send); not for *Back online*.

---

## Checklist for the pattern

- [ ] Every screen renders from cache with the network off; the only full-screen state is EmptyState `offline` with nothing cached.
- [ ] Check-in, check-out, Present, photos, ratings, messages and declines queue with their tap time; Accept and verifications disable with the reason.
- [ ] One Banner, not dismissible, stacking with the SafetyStrip; no Toast per failure.
- [ ] The queue survives restarts, is visible only when non-empty, and nothing is discarded silently.
- [ ] Tested in a lift, a basement and a bus on the baseline device (checklist row 16).
