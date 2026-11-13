# The ask — Fallback screens in onboarding

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | Rupam Banik (design lead), after a visit to a training centre; passed to this session by the session that started it |
| Captured | 2026-11-12 |
| Kind | Captured in conversation — no written PRD |
| Confirmed by | — (read back 2026-11-12, waiting for the lead) |

There is no document, so this file **becomes** one. This section is closed once it is confirmed. After that, new information goes to `SCOPE.md` → *Log*.

---

**What.** One fallback screen template for every case where something does not work in onboarding: from the first open of the app to the end of in-app (TC-less) training. That covers no internet, Snabbit slow or down, update, location, the login code, Aadhaar, training videos, phone health, and the rest. The lead narrowed the scope from the whole app on 2026-11-12: *"onboarding specifically, like no internet, etc etc, during tc less training"*.

**For whom.** A new expert joining on her own phone, with no trainer beside her. At the training centre, experts did not understand the app's screens. Words like *timeout*, *network* and *server* mean nothing to them, and they need a lot of guidance.

**The problem.** Today a failure screen depends on reading: a red `!`, a title, a body sentence, *Try again* and *Contact support*. The shipped copy says things like *This might be a network issue*. Many onboarding failures have no screen at all. She cannot tell what happened or what to do, so she drops out.

**Done means.** Without reading, every failure screen makes two things clear: what happened, and the one thing to do next (try again, wait, call for help, or turn something on).

**Three steps, each agreed before the next starts.**
1. Every case.
2. One template that every case uses: what changes per case and what never changes, with a tier for each part.
3. Each case's picture brief, on-screen line, spoken line and button.

**Out of scope.**
- The rest of the app. The app-wide list is parked in `CASES-app-wide.md`.
- Engineering error handling.
- Retry timings and queue rules, which stay as `offline.md` and `error-recovery.md` set them.

**Already decided.**
- Show, don't tell: a picture or Saathi plus a voice line, and one instruction line per screen (P1).
- On screens based on the live app, keep the Figma wording.
- Start from imported shipped Figma frames, not new drawings.
- The training CTA guide is accepted and can be used: a finger plus a spotlight on the button, which starts only after she has not tapped for a while.
- Never the words *timeout*, *server*, *error*, *network* or *sync*.

**Still open.** The edge-of-scope groups in `CASES.md` § 7 (photo, bank and PAN, missed training day).
