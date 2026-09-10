# Pattern — asking for permission

The app needs eight things from the phone — location, camera, notifications, microphone, display-over-other-apps, battery-unrestricted, storage on old Androids, and SMS auto-read — and each one is a moment where a stranger's dialog appears in a language the expert may not read and asks her to trust something. This pattern fixes when each is asked, what the app says first, what happens when she says no, and how she gets back in later. The component is the BottomSheet `permission` (`bottom-sheet.md`); this page is the order and the copy.

Evidence: the shipped onboarding asks for location on a full-screen prompt right after OTP (`599:37386`); the Kavach consent sheet asks for microphone and location together (`1059:54818`); everything else falls to the OS dialog with no explanation.

---

## Three rules

1. **Ask when it is needed, never before.** Location when she first needs jobs near her, camera at the first photo, microphone at the first Shield start, notifications after the first accepted job — not on first launch in a row. A permission asked out of context is a permission denied (research; P5).
2. **Say why first, in one sentence, in her language, aloud.** The `permission` sheet always precedes the OS dialog: a scene asset showing the moment, one sentence of *why*, **Allow …** and **Not now**. She hears it before the phone shows her something she cannot read.
3. **No is allowed, and the app keeps working.** Every permission has a fallback path and a way back in. Nothing is gated behind a permission except the one thing that literally needs it, and that one thing says so where it is.

---

## The eight, in the order they are met

| Permission | Asked when | Why (the sentence) | If she says no | Way back in |
| --- | --- | --- | --- | --- |
| **Notifications** | After the first job is accepted (Android 13+; iOS on first open of Home) | *We'll tell you when a job comes — even when the app is closed.* | Jobs still arrive when the app is open; a Banner `warning` on Home: *Turn on notifications to hear about jobs* → **Turn on** | Home Banner; Profile → *Notifications* row |
| **Location** | Onboarding step 3, when the city is needed; asked again as *always / while using* before the first shift, for Shield and check-in | *We use your location to find jobs near you.* Before the first shift: *…and to share it with the safety team during a job.* | City asked by hand; check-in falls to *Check in anyway* (hold, flagged); Shield `blocked` *Location not allowed* → **Allow location** | ShieldRow fix Button; Profile → *Location* |
| **Camera** | First photo: login selfie, Aadhaar (if typed fails), check-in photo where required | *We take a photo to confirm it's you.* | MediaCapture `preview` shows EmptyState `error` *Camera not allowed* → **Allow camera**; documents offer **Choose from gallery** | The tile itself; Profile → *Camera* |
| **Microphone** | First Shield start (at check-in, after consent) | *Shield records sound during a job so the safety team can hear if something goes wrong.* | Shield `blocked` *Microphone not allowed* → **Allow microphone**; location-only Shield continues; the job continues | ShieldRow fix Button |
| **Display over other apps** (Android) | Onboarding, after Aadhaar, before the first shift | *So a new job can appear even when you're in another app.* | Job alerts arrive as notifications with an **Accept job** action; a Banner on Home until allowed | Home Banner; Profile |
| **Unrestricted battery** (Android) | Same moment as above, one sheet later | *So the phone doesn't stop Snabbit from telling you about jobs.* | Nothing breaks; a Banner `info` appears only if a job alert was missed while the app was asleep | Home Banner after a missed alert |
| **SMS auto-read** (Android) | Never asked — the OTP uses the SMS Retriever API, which needs no permission | — | — | — |
| **Storage / photos** (Android ≤ 12) | Only when *Choose from gallery* is tapped | *To pick a photo from your phone.* | Camera path remains | The gallery Button |

Contacts are never asked (referral is a code, not a contact list). Phone-state, call logs, exact alarm: never.

---

## The sheet

```
┌──────────────────────────────────────────┐  BottomSheet permission
│                                    (🔊)  │  Listen (title + body spoken on open)
│         [ scene asset 160 ]              │  the moment: her at a door with the map · a photo being taken
│ Find jobs near you                       │  Heading3
│ We use your location to find jobs        │  BodyLg · one sentence · the why, never the how
│ near you.                                │
│ [ Allow location                     ]   │  Button primary brand L → the OS dialog
│ [ Not now                            ]   │  Button ghost neutral L
└──────────────────────────────────────────┘
```

- Title is the **benefit** in her words (*Find jobs near you*, *Hear about jobs*, *Confirm it's you*), never *Location permission required*.
- Body is one sentence of why; never the mechanism (*background location service*), never a threat (*Without this the app won't work*).
- **Allow …** names the thing so the OS dialog that follows makes sense; **Not now** is always there and always works.
- The sheet appears **once** per permission per context; if she says *Not now*, it does not return on its own — the Banner or the fix Button does the asking from then on.
- After the OS dialog: allowed → the flow continues with no confirmation screen (the thing just works); denied → the fallback row above, immediately, with the Banner or fix Button, never a second sheet.

---

## Permanently denied

When the OS will no longer show its dialog (*Don't ask again* on Android, any denial on iOS), **Allow …** cannot work. The fix Button then reads **Open settings** and the sheet body adds one line: *Turn it on in Settings — we'll bring you back.* The app deep-links to its own settings page and, on return, re-checks and continues. A HowToClip `guide` (*How to allow location*, 12 s) sits on that sheet for the phones where Settings is a maze.

---

## Shield consent is not a permission

The Shield consent sheet (`shield-card.md`) is Snabbit's own agreement, asked once with a visible way to say no. The OS microphone and location permissions come **after** consent, at the first start, through this pattern's sheets. Consent without permission → Shield `blocked` with the fix; permission without consent is never requested.

---

## Copy

- Titles (benefits): *Find jobs near you* · *Hear about new jobs* · *Confirm it's you* · *Keep the safety team listening* · *See jobs in any app* · *Don't miss a job while the phone sleeps* · *Pick a photo*.
- Bodies: one sentence each, above. ≤ 60 chars in English, verified in Kannada at 1.3 (`type.md`).
- Buttons: *Allow location* · *Allow notifications* · *Allow camera* · *Allow microphone* · *Allow* (overlay) · *Open settings* · *Not now*. Never *OK*, *Enable*, *Grant*, *Continue*.
- Banners: *Turn on notifications to hear about jobs* → **Turn on**; *Allow location to check in faster* → **Allow**.
- Never: *required*, *mandatory*, *the app needs*, *you must*. The app asks; she decides.

---

## Accessibility and trust

- Each sheet is spoken on open (`bottom-sheet.md`); the OS dialog itself is not translatable, which is why the sentence before it matters.
- A denied permission is never shown as an error state in red; it is a condition (Banner `warning` / `info`) with a fix — `pattern: error recovery`.
- The app never asks for a permission during a job alert, SOS or SafetyCheck; if the moment arrives then, it waits.
- Analytics: which sheet was shown and what she chose is logged; a permission with a < 60 % allow rate is a sentence to rewrite, not a sheet to repeat.

---

## Checklist for the pattern

- [ ] Every OS dialog is preceded by a `permission` sheet with a benefit title and a one-sentence why, spoken.
- [ ] Every permission has a fallback path and a way back in; nothing outside the one dependent action is gated.
- [ ] *Not now* never re-prompts on its own; permanently denied leads to **Open settings** with the guide clip.
- [ ] No permission is asked on first launch in a batch, during a job alert, or during SOS.
- [ ] Copy reviewed aloud in four languages.
