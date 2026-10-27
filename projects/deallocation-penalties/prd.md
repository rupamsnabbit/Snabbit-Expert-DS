# The ask — Expert penalty constructs: offline gaming, check-in actions and events

## A — A PRD arrived

| | |
| --- | --- |
| From | Hardik (De-allocation program) |
| Received | 2026-10-27 |
| Source | Claude doc *Offline & Location Gaming — Penalty Construct & Event Spec* — https://claude.ai/artifact/MC683XPZEaxjMqS7JJk4UK (rev 16) |
| Kind | Written PRD — verbatim below |
| Version | v1 |

The body below is the PRD **as received**. It is evidence, like a Figma screen or a Mobbin flow: it says what the business wants and when. It is not a design, and nothing in it overrides `principles/` or `tokens/`.

Do not edit the body — not the wording, not the structure, not the parts that are wrong. Disagreements go in `SCOPE.md` → *Open questions*. A revision is appended below as a new version with its own header; the diff between versions is often the most useful thing in the folder.

Transcribed from the doc's structure (headings, lists, tables) to markdown on 2026-10-27; wording unchanged.

---

# Expert Penalty Constructs — Offline Gaming, Check-in Actions & Events

2026-10-27 · Hardik

## Scope

This spec covers the expert-side penalty surface for the De-allocation program. Audience: Head of Product & Tech and mobile engineering. It defines three things:

- The offline / location-gaming penalty — six device states an expert can deliberately trigger during a shift.
- The check-in actions — deny, early logout, and forced customer contact before escalation.
- The events that record every incident.

The design rests on one principle:

- We penalise only what the expert controls and chooses to do.
- Device and OS behaviour — which brand killed the app, doze, battery saver — is logged as context that separates a deliberate act from a phone fault. It is never penalised on its own.

Six penalisable offline cases, each carrying the same three configs (timer, red cards, auto-logout), tunable per case:

- Data off, location off, permission off, airplane, phone off, force stop.

Controlling the action is not the same as proving intent — hold this through the whole design:

- Every case has an innocent twin: a dead zone, battery saver, a real GPS glitch.
- The grace timer resolves it — an innocent expert is prompted and fixes it with no penalty.
- She is carded only if she ignores the warning and stays off.

## Penalty cases — what the expert sees

Six cases, worked backwards from the expert's action. Each carries the same three configs, tunable per case:

- Timer — grace to revert (Group A) or the dark threshold on return (Group B).
- Red cards — the number issued.
- Auto-logout — whether it fires.

| Case | Group | What the expert sees on the app | Timer | Red cards | Auto-logout |
| --- | --- | --- | --- | --- | --- |
| Data off | Live, on device | Bottom sheet on open + voice ringer: “Your mobile data is off. Turn it on in [timer] or you’ll get [N] red cards[ and be logged out].” Live countdown. CTA: Turn on data. | Grace to revert | N | On / Off |
| Location off | Live, on device | Same sheet + ringer: “Location is off.” CTA: Turn on location. | Grace to revert | N | On / Off |
| Permission off | Live, on device | Same sheet + ringer: “Location permission is off.” CTA deep-links to the permission screen. | Grace to revert | N | On / Off |
| Airplane | Live, on device | Same sheet + ringer: “Airplane mode is on.” Fires on the toggle. CTA: Turn off airplane. | Grace to revert | N | On / Off |
| Phone off | On return | Nothing while dark. On switch-on, logout screen by default: “You’ve been logged out — your phone was off for [X] during your shift. [N] red cards.” | Dark threshold (default 30 min) | N | On / Off |
| Force stop | On return | Nothing while dark. On reopen, same logout screen: “…the app was stopped for [X] during your shift.” | Dark threshold (default 30 min) | N | On / Off |

Two rules the copy and config must respect:

- The red-card clause branches on the auto-logout switch: with it on, “…or you'll get N red cards and be logged out”; with it off, “…or you'll get N red cards.”
- The timer is a live countdown for the four on-device cases, but is read backwards on return for phone off and force stop — same config field, two behaviours.

## Two groups, because the ring can only fire while the app is alive

The cases split on one question: can we warn her while she is doing it? That line decides the detection, the screen, and the sync behaviour, so it is stated up front.

Group A — data off, location off, permission off, airplane:

- The app is still running; she has only cut a signal.
- The OS reports the change at once, so the ringer and countdown fire live on the device.
- She can revert and avoid the card.

Group B — phone off, force stop:

- The app is dead; a dead process cannot ring.
- No live warning — the incident is caught on return.
- The logout screen shows straight away when she reopens the app.

| Case | How it is detected | Basis / caveat |
| --- | --- | --- |
| Data off |  false, with the network fields; app still reporting | Clean device signal |
| Location off |  false / empty  | Clean device signal |
| Permission off | ,  | Clean device signal |
| Airplane |  true | New field in payload 1.6 |
| Phone off | Silence, then the last good tick before it: healthy battery and healthy posture; dark-duration over threshold on return | Battery % on the last tick splits switched-off (e.g. 64%) from died (e.g. 3%) |
| Force stop | Silence, last tick alive and healthy, cold restart on return () |  is consistent with force stop, not proof of it |

The fully-dark cases are served by silence plus the last good tick, not by a field:

- No new field closes them — that is the Red Card Offline / Push + No-Response path, by design.

## The event: 

One event, one schema, for all six cases:

- It represents a single expert entering a gameable offline state during an active shift, and what happened — one event equals one complete incident.
-  marks frontend (Group A, resolved on device) vs backend (Group B, reconciled on return), so engineering builds to one contract, not six.

The device snapshot carries the payload items captured at the trigger moment (or the last good tick for the dark cases) — the signals that prove the act and the context that proves intent.

| Block | Field | Origin | Notes |
| --- | --- | --- | --- |
| Event & session |  | const |  |
|  |  | system |  (Group A) /  (Group B) |
|  |  | system | ties the trigger-write and resolution-write together |
|  |  | system | when the gameable state began |
|  |  | system | when the card / revert was decided; null while open |
|  |  | session | the expert |
|  |  | payload |  |
|  |  | session | penalty applies only on an active shift |
|  | ,  | payload | which payload version produced this |
| Trigger |  | computed | data_off / location_off / permission_off / airplane / phone_off / force_stop |
|  |  | const | A_live / B_on_return |
|  |  | session | was she holding or about to be allocated a job — the harm multiplier |
| Device snapshot |  | payload | gameable signal — data off |
|  |  | payload | gameable — location off |
|  |  | payload | gameable — permission off |
|  |  | payload | gameable — airplane (new in 1.6) |
|  |  | payload | corroborates connectivity |
|  |  | payload | splits phone-off: switched off vs died |
|  |  | computed | from  — the stale read |
|  |  | payload | frozen-fix detection |
|  |  | payload | spoof flag (handled elsewhere, carried for context) |
|  |  | payload | OEM-kill vs her act (new in 1.6) |
|  | ,  | payload | background-behaviour context (new in 1.6) |
|  |  | payload | restart-after-kill signal (force stop) |
|  |  | payload | doze, power_save, background_restricted, standby_bucket, battery_exemption, wakelock_held — the intent lens |
| Config in effect |  | config | grace (Group A) / dark threshold (Group B), snapshotted at trigger |
|  |  | config | N, snapshotted at trigger |
|  |  | config | on / off, snapshotted at trigger |
| Outcome |  | computed | open / reverted_in_time / penalised / abandoned |
|  |  | computed | Group B |
|  |  | computed | 0 if reverted |
|  |  | computed | boolean |

- Configs are snapshotted at trigger, not read live when the event lands — otherwise retuning a config silently rewrites past incidents.

## How the event fires

One logical event, keyed by , written twice. This gives the clean one-row-per-incident view and still lets us answer “until when did this happen, is it still happening.”

1. Trigger-write — fires the moment the gameable state starts:  set,  null,  = open. The incident now exists even if she never comes back this shift.
2. Resolution-write — same , fills , , , , .

Reading the span:

- Resolved →  minus  is the full duration.
- Still open → now minus  is how long she has been dark so far.

| status | meaning |
| --- | --- |
| open | state started, not yet resolved |
| reverted_in_time | she fixed it inside the timer — no card |
| penalised | timer / threshold expired — cards issued |
| abandoned | shift ended while still dark — the state a resolution-only event cannot represent |

- Resolution-only was rejected because the worst offenders are the ones who stay dark: on those the resolution never arrives cleanly, so the incident would never be recorded. The trigger-write fixes that.

## Engineering flags and open decisions

Stated plainly so they are raised here, not corrected in review.

- The Group A ring must be client-side. In data-off and airplane there is no network to receive a server push, so the app itself detects the state, fires the sheet, counts down, and queues the red card to sync on reconnect. This is new work to confirm, not a reuse of the job ringer.
- The penalty must survive being decided offline. For data-off and airplane the countdown expires while she is unreachable, so the card is decided on-device and reconciled on reconnect; the trigger-write queues the same way. Backend cannot assume it sees these in real time — a server-side “she stopped pinging” watchdog is the backstop for live visibility.
-  is consistent with force stop, not proof. A cold start also follows a crash, an OS low-memory kill, or a reboot. The schema must not imply certainty the signal does not carry.
- Spoofing is handled elsewhere;  is carried for context only. It catches mock-provider apps, not rooted or OS-level fakes.
- The silent FCM wake is the mechanism behind the stale/frozen case, and its reliability is the thing to measure, not assume. Track wake-success rate — a fresh fix within N seconds of the push — overall and by , since the aggressive OEMs are exactly the devices most likely to drop the push.

Open decisions to close before build:

- Dark threshold — total vs continuous. Is the phone-off / force-stop threshold total off-time in the shift, or a single continuous stretch? Total is harder to dodge; default to total unless decided otherwise.
- Live-job modifier. Going dark while holding or about to be allocated a job is the real harm — a customer is waiting. Flat penalty, or sharper when a live allocation is hit?  is already on the event to support this.
- Per-case config values. The timer, red-card count and auto-logout switch per case are placeholders until set.

## Payload delta for schema 1.6

Four new fields. Everything else the construct needs already flows in 1.5.

| Field | Placement | Serves |
| --- | --- | --- |
|  | top-level | Tells an OEM-kill (Xiaomi, Oppo, Vivo) from a deliberate act — the intent lens for every dark case |
|  | top-level | Platform; all-Android today, kept for completeness |
|  | top-level | Doze, background limits and FCM wake behaviour shift by Android version — explains stale variance |
|  |  | The airplane case; no discrete flag exists in 1.5, only an ambiguous inference |

- All four are constant event properties — captured every tick, logged on every incident, never penalised on their own.

## Check-in screen — call the customer before PX

When the expert taps PX on the check-in screen, a bottom sheet opens. The revamp puts customer contact first:

- The sheet leads with Call the customer.
- The Call PX option stays hidden until she has called the customer at least twice.

- Read of PX, to confirm before build: PX is taken here as the expert's escalation / support call — the path that today lets her get off a job. Confirm the exact label and what it resolves to.

Flow:

1. Tap PX → bottom sheet opens, headed Call the customer, with a Call customer action.
2. Each customer call is counted.
3. Call PX appears only once the count reaches the threshold (default 2).

Why it is built this way:

- It closes the invisible channel the deallocation analysis flagged — experts escalating or shedding a job without ever genuinely contacting the customer.
- Forcing two real calls first puts contact on the record before any escalation.

- Config: customer-call threshold (default 2).

Open decisions:

- The rationale for two calls — to be defined (which cases need two vs one).
- What counts as a call — dialled, connected, or a minimum duration. This decides whether the gate is gameable: tapping call and hanging up must not clear it.
- The exact PX label and destination.

## Check-in screen — Deny and Early Logout

The check-in screen carries two always-present buttons — Deny and Early Logout (EL):

- Each fires an event the moment it is tapped.
- Each is gated behind a swipe-to-confirm warning, so neither is a single accidental tap.

| Button | On the screen | Warning bottom sheet | Confirm |
| --- | --- | --- | --- |
| Deny | Always present | “You will get X red cards.” | Swipe to confirm; dismiss to cancel |
| Early Logout | Always present | “You will get X red cards and you will be logged out for the day.” | Swipe to confirm; dismiss to cancel |

Which button shows depends on the job's estimated travel distance — the two are mutually exclusive:

| Estimated travel distance | Deny | Early Logout |
| --- | --- | --- |
| ≥ 1.1 km | Visible | Hidden |
| < 1.1 km | Hidden | Visible |

- At ≥ 1.1 km she has earned the right to refuse (distance denial), so Deny shows.
- Below 1.1 km she has no right to refuse this job, so only Early Logout is offered — a heavier exit (red cards + logged out for the day).
- Strictly mutually exclusive: whenever Deny is available, Early Logout is hidden.
- The effect: a near job has no cheap exit — the pressure wanted on the 600–1,100 m band, close enough to be held to the job and now with no free door.
- Distance source:  on the runner_job table.
- The 1.1 km threshold is a config, but owned by another team (the deallocation-policy threshold) — we read it, we do not set it. Treat it as a dependency, never hard-coded in the client.

- EL is the heavier of the two because it ends her day, so its sheet states both the cards and the day-long logout.
- Deny carrying a red card is deliberate — it closes the free-refusal door the deallocation analysis flagged, where a distance denial today attaches a penalty on well under 1% of cases.

Config:

- X red cards per action, set separately for Deny and EL.
- Lockout length for EL (default: rest of the day).

Open decisions:

- Confirm EL logout is the full day, not just end of shift.
- Whether Deny here is the job-level refusal, and how it reconciles with the existing distance-denial disposition.

## The event: 

One event for the check-in action surface, parallel to :

- It fires the moment the expert taps the button — before the swipe — so an action started and then cancelled is still captured.
- That is deliberate: tap-but-backed-out is the number that tells you how often the warning is doing its job.

| Field | Origin | Notes |
| --- | --- | --- |
|  | const |  |
|  | system | one per tap |
|  | computed | deny / early_logout / px_escalation |
|  | system | on tap |
| , ,  | session | penalty applies only on an active shift |
|  | session | holding or about to be allocated a job — the harm multiplier |
|  | computed | px_escalation only — count at the moment PX was tapped |
|  | computed | px_escalation only — had the two-call gate been cleared |
|  | computed | the red-card warning sheet was shown |
|  | computed | swiped to confirm, or dismissed |
|  | config | X for this action, snapshotted at trigger |
|  | computed | 0 if dismissed |
|  | computed | early_logout only |

- Same discipline as the offline event: configs snapshotted at trigger, and the tap recorded even when she backs out.

