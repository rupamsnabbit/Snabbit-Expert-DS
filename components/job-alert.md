# JobAlert

Status: **Proposed** · Tier: Composition · Package: `SnabbitJobAlert` (uses HeaderNav `state`, Amount, Accordion `breakdown`, Nudge, Timer `L`, Button, Banner, VoicePrompt, SOSControl) · Figma: *Over the app* (`1564:12441`) in the DS file; shipped screens in *Shift – Job Lifecycle DS* → Job Lifecycle → *FOR ANY SCREEN REFERENCE*: first alert (`1:10224`), second alert with penalty (`1:10111`), deny confirmation (`1:10890`). The New Job screen has **no** "Final Designs DS Compatible" frame — the reference-section frames are the latest drawn state.

The highest-stakes screen in the app and the reference case in `PRINCIPLES.md`: a job arrives, she has about ninety seconds, and the money is on the line. JobAlert composes existing parts into one full-screen takeover with **one primary action**, the time shown **as a shape**, the earnings shown **as a number she can trust**, and a decline that is **safe but protected**. The flow around it — sound, wake, overlay, what happens after accept, decline and timeout — is the pattern `patterns/new-job-alert.md`.

---

## What changes from Figma

| Shipped today | Proposed | Why |
| --- | --- | --- |
| Header `state` — 🧴 *New Job*, Help + SOS | Same: HeaderNav `state` with `spray-bottle` + *New job*; Help and SOS in the cluster | Matches the decided header (`DECISIONS.md`); SOS stays on the job-alert takeover (P7). |
| *You Will Earn* · ₹150 `Display` · breakdown rows (Work · *Check In by 7:45 PM* tinted · Summer Bonus 🌞 · OT · Long Distance) in a card | **Facts strip** first — distance · start · duration, icon-led — then the earnings Card: *You'll earn* + Amount `L` + Accordion `breakdown` **expanded**, ≤ 5 rows, the *Check in by 7:45 pm* row as the one `conditional` row | Four facts to decide in a glance (P1, reference case); distance was hidden as a breakdown row. Bonus rows stay visible — they are why she accepts. Emoji in a row label → the reward asset (`assets.md`). |
| *ACCEPT IN* · **1:23** green digits above the Button; red digits on a red wash at 0:23 | **Timer `L`** above the Button: pill ring that drains, tone **computed** (calm → attention → urgent), label *Accept within*, digits inside | Time as a shape (P5); the shipped form already places digits above the Button — the ring adds the shape the reference case asked for. No wash: ring, digits, sound and haptic are four channels already. |
| **Accept Job** — green, full width, with a darker segment that shrinks as time passes | **Accept job** — Button `primary brand L`, `check` icon, one tap, full width at the bottom | One brand primary per screen; green "success" Buttons are a listed don't (`button.md`). The time-fill inside the Button is dropped: fills are the danger-hold gesture, and the Timer already shows time. |
| **Deny** — red outline Button *below* Accept (second variant only); a *You will lose your job earnings* sheet with Accept / Deny | **Decline** — Button `ghost danger L` **above** Accept, **hold to confirm** (600 ms sweep, label → *Declined*), spoken *"Hold to decline"* on first use; no confirmation sheet | Decline is adjacent-but-separate and protected by a second gesture, never a second sheet (P3; `button.md` hold). The consequence is already on screen as a Nudge, so a sheet repeats what she can see. |
| Second alert: Banner *If job not accepted* with a −50 red-card asset | **Nudge `loss`** — red-card asset · *−50 · if you don't accept* — between the Card and the Timer, only when a penalty applies | It is a Nudge by definition (`nudge.md`: *if this lapses → you lose*), so it uses that component, not a Banner. |
| No offline, no expired state drawn | `offline` — Banner `error` *No connection — can't accept right now*, Accept disabled **with the reason under it**; `expired` — Timer *Time's up*, Buttons gone, closes after 2 s | Offline is honest (P5, reference case 7); a Button is never disabled without saying why (`button.md`). |
| Alert drawn as a card *over the app* | Same screen everywhere: in-app takeover, Android full-screen intent, and the lock-screen notification with an **Accept job** action | One screen to learn (P8: nothing new to understand at the worst moment). |

---

## Anatomy

```
┌────────────────────────────────────────────┐  bgPrimary · full screen · portrait
│ ( Help )                    ( SOS )        │  HeaderNav state · spray-bottle + New job · centred
│              🧴 New job                     │
│ 📍 1.2 km  ·  🕒 7:45 pm  ·  ⏱ 1 hr        │  facts strip · 3 Stats S, icon-led · BodyLg Medium
│ ┌────────────────────────────────────────┐ │
│ │ You'll earn                    (🔊)    │ │  Card · Caption textSecondary · VoicePrompt inline reads the whole card
│ │ ₹150                                   │ │  Amount L
│ │ Work · 1 hr                      ₹120  │ │  Accordion breakdown, expanded, ≤ 5 rows
│ │ Check in by 7:45 pm               ₹5   │ │  conditional row (bgInfo) — the only tinted row
│ │ [☀ asset] Summer bonus · 1 hr     ₹20  │ │  reward asset 20 dp, not emoji
│ │ Overtime · 15 min                 ₹40  │ │
│ └────────────────────────────────────────┘ │
│ [🟥 −50]  If you don't accept              │  Nudge loss · repeat alerts only
│                                            │
│              Accept within                 │  Timer L · label BodyMd · digits Display · ring drains · tone computed
│               ( 1:23 )                     │
│           Decline — hold                   │  Button ghost danger L · hold to confirm
│ [ ✓ Accept job                          ]  │  Button primary brand L · fullWidth · safe-area inset
└────────────────────────────────────────────┘
```

Spacing: facts strip 16 dp under the header; Card 16 dp margins; Nudge 12 dp under the Card; Timer centred with 24 dp above the Decline; Decline 8 dp above Accept; Accept 16 dp side padding plus the safe-area inset. On a 360 × 800 screen everything fits without scrolling with five breakdown rows at 130 % font scale; a sixth row is not allowed.

---

## States

| State | What changes | Sound / voice |
| --- | --- | --- |
| `new` | As drawn; Timer `calm` | New-job sound loops until she acts or the window closes (overrides silent, see pattern); the card is read once: *"New job. 1.2 kilometres. 7:45. One hour. You'll earn 150 rupees."* |
| `attention` / `urgent` | Timer tone changes by its own rules (≤ 50 % / ≤ 20 % or ≤ 60 s); at ≤ 10 s digits pulse and a `light` haptic ticks each second | *"Ten seconds"* spoken once |
| `repeat` | Nudge `loss` appears with the red-card asset and the amount; nothing else changes | Nudge is read after the card |
| `accepting` | Accept → `loading` (label kept, spinner); Decline hidden; Timer keeps running | — |
| `accepted` | Handled by the pattern: confirm sound, brief celebration, then the job screen with MapSnippet and the check-in Timer | `confirm` sound |
| `declining` | Hold fill sweeps 600 ms; releasing early cancels; completing → *Declined* label, `commit` sound, screen closes | *"Hold to decline"* on first use only |
| `offline` | Banner `error` *No connection — can't accept right now* under the header; Accept `disabled` with *Waiting for network…* under it; Timer keeps running; retry every 3 s | Spoken once |
| `expired` | Timer `expired` (*Time's up* · `0:00`); Buttons removed; a line *This job went to someone else*; closes after 2 s; on a `repeat` alert a Snackbar on the next screen shows the red card | `commit` sound (low), no voice |

Rules: the Timer never restarts, pauses or hides; Accept is never disabled except `offline`, and then with the reason; there is never a third Button; the header cluster is live throughout (SOS, Help).

---

## Content

- Header: *New job*. Facts: *1.2 km* · *7:45 pm* · *1 hr* — no words, the icons carry them; read aloud with words.
- Card: *You'll earn* (not *You Will Earn*); rows *Work · 1 hr*, *Check in by 7:45 pm*, *Summer bonus · 1 hr*, *Overtime · 15 min*, *Far away · 1.2 km*; amounts per `amount.md`.
- Nudge: *If you don't accept* with the asset and *−50*; second line optional: *Red card*.
- Timer label: *Accept within*. Expired: *Time's up*.
- Buttons: *Accept job* · *Decline* (hold) → *Declined*. Never *Deny*, *Accept Job*, *Reject*, *Skip*.
- Offline: *No connection — can't accept right now* · under the Button *Waiting for network…*
- All of it must fit in Kannada at large font: facts strip wraps to two lines before it shrinks; the Button label never shrinks.

---

## Accessibility

The screen is a modal region; focus lands on the Card, which is read as one block. Timer is a live region announcing at 60 s, 30 s, 10 s. Accept is the first Button in the tab order despite being last on screen. Decline announces *"Decline, button, hold to confirm"*. Targets: Accept 56, Decline 56, Help / SOS 48. Contrast: `textInverse` on `bgBrand` 4.1:1 at 16 sp SemiBold; Timer digits in tone colours ≥ 4.5:1 on `bgPrimary`.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `sound.newJob` | — | The unique, looping new-job sound; the only sound that overrides silent besides `sound.sos` and `sound.safetyCheck` |
| `haptic.heavy` (existing proposal) | — | Alert arrival and timeout |
| `timeout.jobAlert` | server-set, default 90 000 ms | Window length; the Timer reads it, never hard-codes it |

---

## Figma reconciliation

1. Build **JobAlert** as one frame from instances: HeaderNav `state`, three Stat `S`, Card + Amount `L` + Accordion `breakdown`, Nudge `loss`, Timer `L`, Button `ghost danger L` (hold), Button `primary brand L`. Variants: `State` (New / Attention / Urgent / Repeat / Offline / Expired).
2. Replace the green Accept and its time-fill with Button `primary brand L`; move Deny above as Decline `ghost danger`; delete the *You will lose your job earnings* sheet.
3. Move *Long Distance* out of the breakdown into the facts strip; swap the 🌞 emoji for the reward asset.
4. Replace the red wash + *ACCEPT IN* digits with Timer `L` in its `urgent` tone.
5. Point the *Over the app* frame and the lock-screen notification at the same instance.

Result: one frame, six states, and the reference case drawn for the first time from the system's own parts.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 56 / 56 / 48 |
| 2 | ⚙ Semantic tokens only | ✅ + three proposed sound / timeout tokens |
| 3 | ⚙ Type scale | ✅ Display / Amount L / BodyLg / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ ring + digits + sound + haptic; hold fill + label + sound |
| 5 | ⚙ One next action | ✅ Accept; Decline quieter and above |
| 6 | ⚙ Tap guard / loading | ✅ Accept loading keeps label; Decline hold |
| 7 | ⚙ Four languages | ⬜ *Accept within* and facts strip in Kannada — verify at 130 % |
| 8 | ⚙ Reduced motion | ✅ per Timer and Button rules |
| 9 | Meaning without text | ✅ icons, ring, asset |
| 10 | Greyscale | ✅ ring length + digits carry urgency |
| 11 | Costly actions | ✅ Decline holds; timeout consequence shown as a Nudge |
| 12 | Voice | ✅ card read once; 10 s warning |
| 14 | Status colours | ✅ Timer tones only; conditional row bgInfo |
| 15–16 | Review | ⬜ pending — the first screen to test with experts on a moving bus |
