# Pattern — when something goes wrong

The expert cannot read an error code, will not open a help centre, and is usually standing in someone's doorway when it happens. So every failure in the app answers three questions in her words, in this order: **what happened**, **is my money / job / safety okay**, and **what do I do now** — with the *do now* as one Button. This pattern says which component carries each kind of failure, the copy rules, the recovery ladder, and the list of things an error is never allowed to be. The components already exist (`empty-state.md`, `feedback.md`, `text-field.md`, `button.md`, `skeleton.md`); this page decides which one to reach for.

Evidence: the shipped app has few drawn error states (the DS file's Camera Preview fail overlay, Toast styles, the OTP *Wrong code* box; the onboarding file's *Unavailable city*). Most of what follows fills gaps the screens leave open, which is why checklist row 5 (*loading, empty, error, offline states*) is on every component.

---

## Where the failure is → which component

| Level | What failed | Component | Example |
| --- | --- | --- | --- |
| **A field** | One thing she typed or chose | TextField `error` line (BodyMd, icon, spoken); NumericKeypad `otp` shake; SelectionCard group error | *Phone number needs 10 digits* · *Wrong code — ask again* · *Choose how to add the photo* |
| **An action** | A tap did not do its thing (save, send, accept, upload) | Button back to `default` + **Snackbar** with the one recovery | *Couldn't send — Retry* · *Upload failed — Retry* |
| **A result** | She did the thing; the check said no | The component's own `fail` / `error` state with the reason and Retake / Try again | MediaCapture *Uniform not visible → Retake* · Aadhaar *Didn't match → Try again* |
| **A screen** | The screen's data could not load or save | EmptyState `error` (`page` or `section`) | *Couldn't load your earnings · Your money is safe. The network dropped. → Try again · Call help* |
| **A condition** | Something is wrong and stays wrong for a while | **Banner** (`error` / `warning`) at the top, inline, with its fix | *You're offline* · *Payout blocked — Add UPI* · *Shield stopped — charge your phone* |
| **A job or payment** | Ops or the customer changed something | **Snackbar** on Home + a Banner on the thing itself; consequences shown as a Nudge `loss` **before** they apply | *Job cancelled by customer — See ›* · *Red card · −50 — Why? ›* |
| **A service** | Snabbit's or a partner's backend is down | Skeleton hits `timeout.loading` → EmptyState `error` with **Try again** / **Later**; the step becomes `attention` in any Stepper | *Aadhaar service is slow right now* |
| **Safety** | Anything that touches SOS or Shield | Never an error tone: ShieldRow `blocked` / `stopped` states; SOS offline path (`sos-control.md`) | *Shield can't start — not enough storage → Free up space* |

Rules that follow: a field error never becomes a Toast (she has to see it next to the field); an action error never becomes a full-screen EmptyState (the screen is fine — one thing failed); a lasting condition never becomes a Toast (it would vanish while the condition stays); a Toast never carries an error at all (Toast is for events that went right, or *Copied*).

---

## The recovery ladder

Every error offers exactly **one** primary way out, and the ladder decides which:

1. **Retry** — when trying again could work (network, service, a photo). Button **Try again** / **Retake** / **Retry**; the app retries by itself first where it can (uploads, check-in, payout fetch) and only asks her when it has failed twice.
2. **Fix** — when she can change something. The Button *is* the fix: **Add UPI or bank**, **Free up space**, **Allow camera**, **Charge your phone** (no Button — a fact), **Choose another day**.
3. **Alternative** — when the path is closed but another exists: **Call me instead** (voice OTP), **Choose from gallery** (documents), **Type the number** (PAN), **Check in anyway** (hold, flagged).
4. **Help** — when nothing above applies, or after the third failure of any kind: **Call help** joins as `secondary`; the header's Help is live throughout.
5. **Later** — when it is not urgent and not hers to fix: **Later** / **Not now** as `ghost`; the item becomes `attention` in its Stepper or a Banner `info` so it is not forgotten.

Never more than two Buttons (the ladder step + Help). Never *OK*, *Dismiss*, *Cancel* as the only way out of an error.

---

## Copy rules

- **Line 1 — what happened**, as she would say it: *Couldn't send the photo* · *Wrong code* · *Aadhaar didn't match* · *You're offline*. Never *Something went wrong*, *Error 502*, *Request failed*, *Oops*.
- **Line 2 — is she okay**, when money, a job or safety could be in doubt: *Your money is safe* · *Your job is still yours* · *SOS still works*. Say it every time it is true; it is the sentence she is waiting for.
- **Line 3 — the cause**, only when it is hers to know and act on: *The network dropped* · *The card wasn't fully in the frame*. Never a cause she cannot act on (*server timeout*).
- **Button — the recovery verb**: *Try again* · *Retake* · *Add UPI* · *Call help*.
- Spoken: line 1 and the Button, once, on appearance (`voice-prompt.md`). Errors in a field are spoken when the field loses focus, not on every keystroke.
- No exclamation marks, no blame (*You entered the wrong code* → *Wrong code — ask again*), no jargon (*OTP* → *code*, *authentication* → *login*, *transaction* → *payment*).
- Four languages: line 1 ≤ 40 chars, line 2 ≤ 60, Button ≤ 18 — see `type.md`.

---

## Colour and sound

- Red means *this failed* and nothing else (row 14): `textErrorStrong` on `bgError` for text (`accessibility.md`), `iconError` for the glyph, `borderError` for a field. The reassurance line is `textBody`, never red — the whole card is not an emergency.
- The EmptyState `error` pictogram carries the red ✗ dot; the object stays magenta (`assets.md`).
- A failure has **no sound** except MediaCapture's fail line and the OTP shake haptic (`haptic.bump`); the SOS and job-alert sounds are never reused. Silence plus a spoken sentence is calmer than a buzzer (P6).

---

## Loading before failing

Nothing fails silently or instantly. The order is fixed by `motion.md` and `skeleton.md`: show the Skeleton or Button spinner after `motion.instant` if the answer is not already there; keep it at least `timeout.loadingMin`; at `timeout.loading` (3 s) become the honest error above with the ladder. A spinner that outlives three seconds is itself a bug.

---

## Offline is a condition, not an error

Losing the network is the most common "error" and it is not one: the app keeps working on what it has, queues what it can (check-in, check-out, decline, photos, ratings), and says so once at the top — Banner `warning` *You're offline · Your work is saved and will send when you're back*. Things that truly need the network (accepting a job, verifying a code) disable **with the reason under them** and enable themselves when the network returns. The full behaviour is `pattern: offline` (to come); this page only says: never show a red error screen for the network unless there is also nothing cached to show (EmptyState `offline`).

---

## What an error is never

- A code, an ID, a stack, a percentage, a timestamp in UTC.
- A modal that blocks the screen for something she cannot fix from it (`shield-card.md` learned this).
- A Toast (it disappears; errors don't).
- Red text with no Button.
- A disabled Button with no reason under it.
- A dead end: every error screen has Help reachable, and after three failures Help is a Button.
- Louder than the problem: a failed upload is a Snackbar; only a failed payment or a lost job gets a Banner **and** a Snackbar.

---

## Examples end to end

| Moment | What she sees |
| --- | --- |
| OTP wrong, third time | Boxes shake (`motion.xfast`), spoken *Wrong code — ask again*; after the third: Button **Resend code** becomes primary and **Call help** appears |
| Photo upload fails on a bus | Tile `error` *Couldn't upload — try again*, photo kept locally; app retries twice by itself; Snackbar *Photo will upload when you're back online* if offline |
| Earnings tab fails to load | Skeleton → 3 s → EmptyState `error` *Couldn't load your earnings · Your money is safe. The network dropped.* → **Try again** · **Call help** |
| Payout bounced | Snackbar on Home *Payout failed — Fix account ›*; Banner `error` on the payout row with **Fix account**; the *Get paid* Stepper returns |
| Customer cancels mid-way to the job | Snackbar *Job cancelled by Radhika · You'll be paid for the trip — See ›*; the job screen becomes a Card with the payout line; Home |
| Aadhaar service down | Skeleton → *Aadhaar service is slow right now* → **Try again** · **Later**; onboarding continues; the step shows `attention` |

---

## Checklist for the pattern

- [ ] Every error on a screen answers *what · am I okay · what now* in ≤ 3 lines and one primary Button.
- [ ] No Toast carries an error; no Banner is used for a one-off event.
- [ ] Spinners never exceed 3 s without becoming an honest error.
- [ ] After three failures of anything, Help is a Button.
- [ ] Copy reviewed aloud in four languages; no *Oops*, no codes.
