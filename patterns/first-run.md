# Pattern — the first time she sees it

Onboarding teaches her who Snabbit is; this pattern teaches her the **app** — where SOS lives, what the tab bar does, what a Nudge is asking — one screen at a time, the first time she meets each. The components are Coachmark (`point` and `tour`), HowToClip (`card` and `guide`) and the VoicePrompt; this page decides which screens get one, in what order, with what sentence, and the rules that stop "first run" from becoming a wall of tips. The shipped app has no coachmarks today; the closest are the *How to* clips under *My Rate Card* (`6062:14426`) and the voice bar on onboarding screens.

---

## Three rules

1. **Teach at the moment, not at the start.** Nothing is explained until the screen it belongs to is on screen for the first time. There is no "tour of the app" after onboarding — the first Home visit gets one tour of three stops, and every other screen waits its turn.
2. **One thing per visit.** At most one Coachmark or tour per screen visit; a second waits for the next visit (`coachmark.md`). A screen never opens with a sheet, a tour and a Nudge competing.
3. **Show, say, then let her do it.** Every Coachmark is spoken; where the target is a tap she should make, the Coachmark is `do-it` and completing the tap dismisses it — she learns by doing, not by reading *Got it*.

---

## The first-run map

| Screen · moment | What she meets | Kind | Sentence (spoken) |
| --- | --- | --- | --- |
| **Home, first visit** (after onboarding) | The three things that matter on Home | `tour` · 3 stops: **SOS** → **Present / availability** → **tab bar (Earnings)** | *If you ever feel unsafe, hold this.* → *Tap here every morning to say you're coming.* → *Your money is here.* |
| **Home, first shift day** | The shift card and Present | `point` `do-it` on **Present** | *Tap Present to start your day.* |
| **Job alert, first time** | Accept, Decline, the Timer | none — the screen speaks itself (the card is read aloud; *"Hold to decline"* on first use) | — |
| **On the way, first time** | Show directions, Chat quick replies | `point` on **Show directions** | *This opens the map to the customer's home.* |
| **In job, first time** | ShieldRow | `point` on the **ShieldRow** | *Shield is recording to keep you safe. Tap to see.* |
| **Check out, first time** | The OTP code | none — the sheet's line *Ask the customer for the code* is the teaching | — |
| **Earnings, first visit** | Today · Week · Month tabs; the breakdown | `point` on the **Tabs** + HowToClip cards *Daily earnings · Monthly bonus · Red cards* below the fold | *Swipe or tap to see the week and the month.* |
| **Payout statement, first visit** | You'll be paid · schedule | `point` on **You'll be paid** | *This is what reaches your account, and when.* |
| **Rewards, first visit** | Coins, tiers, red cards | `tour` · 2 stops: **coin balance** → **tier progress** | *Coins come from good jobs and being on time.* → *Fill this to reach the next tier and earn more.* |
| **First red card** | The penalty and why | none as a Coachmark — the Snackbar *Why? ›* opens the penalties Accordion `faq`; a HowToClip *What a red card is* sits there | — |
| **First Nudge on Home** | *Login by 6:40 am → 3 coins* | `point` on the **Nudge** | *Do this by the time shown and you get the coins.* |
| **Profile, first visit** | Language, documents | none | — |

Ceiling: **12** first-run teachings across the whole app, of which two are tours. Anything not on this list is a design question (*why does it need explaining?*) before it is a Coachmark.

---

## Order and gating

- The Home tour runs on the **first Home visit after onboarding completes**, after the screen has settled (`timeout.screenSettle`) and only if no job alert, Nudge sheet or permission sheet is due; if one is, the tour waits for the next visit.
- A `point` Coachmark shows on the **first visit of its screen** with the target visible; if the target is below the fold, the screen scrolls it into view first (`coachmark.md`).
- `do-it` Coachmarks (Present, tab bar stop) dismiss on the real tap; *Got it* dismisses the rest. A dismissed Coachmark never returns; a `do-it` Coachmark whose action was not taken returns **once**, on the next visit, then never.
- Shown-state is stored per account, not per phone: a new phone does not replay the tour; a new account on the same phone does.
- Language change replays nothing; the sentences are re-spoken in the new language only when a Coachmark is shown anew.
- Reduced motion and screen reader: as `coachmark.md` — no spotlight pulse; focus lands on the sentence; the tour's counter is announced.

---

## Reset and re-learn

- Profile → *Help* → **Show me around again** replays the Home tour and re-arms every `point` for one visit each. Nothing else replays.
- The HowToClip cards (*Learn how it works*) are the always-available layer: Coachmarks say one sentence once; clips can be watched any number of times and live where their subject lives (rate card, rewards, penalties, check-in).
- After a release that moves a control the Coachmark pointed at, the Coachmark is **retired**, not re-shown — a returning expert learns the new place by finding it; only a truly new control gets a new `point`.

---

## Copy

- One sentence, ≤ 60 characters in English (≤ 72 in Hindi), spoken register, present tense, second person, what it does or what she does: *Hold this if you ever feel unsafe.* Never a feature name as a noun (*This is the SOS Control*), never marketing (*Meet your new safety companion!*).
- `do-it` sentences start with the verb she will do: *Tap Present…*, *Hold this…*.
- Tour stops read as one story in order: safety → work → money.
- Buttons: *Next*, *Got it*, *Hear again* (speaker). No *Skip tour* — three stops of one sentence each is shorter than a skip decision; the scrim tap does nothing during a tour.

---

## What first run is never

- A full-screen carousel of illustrations before Home (that was onboarding's promise screen, once).
- A checklist of "tips" in Profile.
- A tooltip with an *i* she has to find (`coachmark.md`: tooltips became Coachmarks).
- Re-shown after every release.
- Shown during a job, a job alert, SOS or SafetyCheck.

---

## Checklist for the pattern

- [ ] Home tour is exactly three stops, safety → work → money, spoken, and waits behind alerts and sheets.
- [ ] Every `point` is on the first visit of its own screen, one per visit, and never returns after dismissal (once for an untaken `do-it`).
- [ ] The whole app has ≤ 12 first-run teachings; each new one is justified in its component or pattern spec.
- [ ] *Show me around again* exists and replays only the tour.
- [ ] Copy reviewed aloud in four languages; the Kannada sentence fits three lines in the bubble at 1.3.
