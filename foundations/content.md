# Content — how the app talks

The expert reads slowly, in one of four scripts, often with the phone in her hand at a stranger's door. So the words are not decoration on the interface — for her, **the sentence she hears or reads is the interface** (P1, P4, P9). This page gathers the copy rules that forty component specs apply one at a time into one place: the voice, the grammar, how actions and states are worded, how numbers and time are written, how spoken lines differ from written ones, how a string gets to four languages, the words we always use and the words we never use. The length budgets live in `foundations/type.md`; this page is about what goes inside them.

Everything here applies to UI text, spoken lines, notifications, SMS, and training material alike. One voice.

---

## 1. The register

Write the way a good trainer at the Hub talks to an expert she respects: plainly, warmly, one thing at a time, assuming intelligence but not literacy.

- **Words are the last layer.** Before writing a line, ask whether a picture, a shape, an icon or a number already says it (P1 · *Text is the last medium*). If it does, the line is not written. Most screens need fewer words than the first draft has — a task screen has **one instruction line** and a Button, and the sequence of a task is a sequence of screens, never a numbered list of sentences.
- **Say only what is new, or what she could get wrong.** She does this work every day. A line that narrates what the screen already shows, restates the obvious, or gives the reason for a step she knows is talking down to her. Warm is not wordy: warmth comes from the moment, the name and the specific number, not from explaining more.
- **One idea per line.** A Button says one thing; a Banner says what happened and what to do, nothing else; a sheet body says at most four lines — a ceiling for information sheets, not a target; a task sheet has one. If a sentence needs a comma to survive, split it.
- **Verbs for actions, nouns for things, numbers first.** *Accept job* · *Check in* · *3 more jobs to Gold* · *15 min added*. The number leads because it is the part she reads fastest and the part that is the same in every language.
- **Concrete over abstract.** *Your ₹450 will reach your bank by Tuesday* beats *Payout processing*. Name the amount, the day, the person, the place.
- **Her words, not ours.** She says *job*, *shift*, *check in*, *earnings*, *payout*, *tier*, *SOS*, *Shield*, *Hub* — the vocabulary in `PRINCIPLES.md` § Vocabulary. She does not say *booking*, *task*, *wallet*, *settlement*, *KYC*, *OTP verification*, *ETA*, *UTR*. When a system word is unavoidable, put the plain meaning first and the word after: *Reference number (UTR) 4021…*.
- **No idiom, no cleverness.** Every English line will be translated by someone who has met an expert; a pun or a phrasal verb makes their job impossible and the Kannada line 1.6× long. *Keep going!* is untranslatable and says nothing; *3 more jobs to Gold* translates itself.
- **Adult to adult.** She is a professional having a normal day or a hard one. No cheerleading, no scolding, no baby talk, no *Oops*.

The test for any line: **would you say this to a colleague, out loud, at her door — and would she need you to?** If it would sound odd spoken, it is wrong written. If she already knows it, or the screen already shows it, it is not written at all.

---

## 2. Grammar and typography of copy

| Rule | Do | Don't | Why |
| --- | --- | --- | --- |
| Sentence case everywhere | *Accept job* · *Time left* | *Accept Job* · *TIME LEFT* | Indic scripts have no case; caps make English the odd one out (P9). The shipped *ACCEPT IN* small caps is retired (`timer.md`). |
| No exclamation marks, no emoji as content | *Job done · ₹450 earned* | *Job done! 🎉* | Emphasis comes from the moment (sound, motion), not punctuation. Emoji do not translate and read as noise to a screen reader. |
| No questions in status or feedback | *Waiting for network…* | *No internet?* | A question asks her to think; a status tells her. Questions belong only in confirmations that have a real choice. |
| No ellipsis except a live wait | *Checking in…* (band moving) | *Loading…* on a static screen | Three dots mean *something is happening now*; never *there is more text*. |
| Full stops only in multi-sentence bodies | Banner: *You're offline · Your work is saved* | *You're offline.* | Single lines and labels carry no terminal punctuation; the middle dot joins two facts. |
| Second person, present tense | *You earn ₹450* · *Radhika asked for 30 more minutes* | *The user will be paid* · *Extension requested* | Active voice with a named actor; the passive hides who did what. |
| Never blame | *That code didn't match · Try again or call help* | *Invalid input* · *You entered the wrong OTP* | P5, `patterns/error-recovery.md`: state the fact, show the way back. |
| Name people | *Call Radhika* · *Radhika's home* | *Call customer* | The customer has a name; using it is respect and disambiguation. |
| Brand words stay Latin | *Snabbit* · *SOS* · *UPI* | transliterated | Read as logos; the feature name *Kavach* is written in the script of the language (see § 8). |

---

## 3. Actions

An action is a **verb, or verb + object, ≤ 18 English characters, one line**, and it names what will happen — never the fact that she agrees.

| Situation | Say | Never |
| --- | --- | --- |
| Take the job | **Accept job** | *Accept*, *Yes*, *OK*, *Confirm* |
| Refuse the job (hold) | **Decline** | *Reject*, *Deny*, *Skip*, *No* |
| Arrive / leave | **Check in** · **Complete job** | *Start*, *Submit*, *Done* |
| Move through a flow | **Next** · **Start** · **Go to Home** | *Continue*, *Proceed*, *OK* |
| Low-stakes exit | **Not now** · **Got it** | *Dismiss*, *Cancel* (unless it cancels a job), *Close* on a Banner (swipe does that) |
| Permission | **Allow location** · **Open settings** | *Enable*, *Grant*, *Allow* alone |
| Money | **Get paid now** · **Add bank account** · **See breakdown** | *Withdraw*, *Redeem*, *Proceed to payout* |
| Help | **Call help** · **Chat with Saathi** | *Contact support*, *Raise a ticket* |
| Retry | **Try again** (with the reason above it) | *Retry* alone, *Refresh* |
| Learn | **Show me** · **Play** | *Learn more*, *Know more*, *Read more* |

Rules:

- Two actions on one surface are **different verbs**, never *Yes / No*: *Accept job* and *Decline*; *Get paid now* and *Not now*.
- A destructive or costly action's label says what is lost: *End shift* · *Decline* · *Remove account*; the hold gesture (`button.md`) is the protection, the word is the warning.
- A disabled Button always has its **reason under it** in `BodyMd` `textSecondary`: *Available at 11:00* · *Needs internet* · *Waiting for network…*. Never a disabled Button alone.
- Tab labels are single nouns ≤ 10 characters: *Home · Earnings · Refer · Profile*.
- Chips are nouns or short phrases she would say: *I have reached* · *Running 10 min late* — quick replies are written as **her** speech.

---

## 4. States

Every state has the same two-part shape — **what is true, then what to do** — and the second part is a Button or a chip, not a sentence.

| State | Shape | Example |
| --- | --- | --- |
| Loading (≤ 3 s) | Present participle on the thing she tapped; no text elsewhere | *Checking in…* |
| Loading (> 3 s) | The honest reason + what continues | *Slow network · Your work is saved* |
| Empty | What would be here + how it gets here; never blame, never *No data* | *No jobs yet* · *Jobs for tomorrow arrive by 8 pm. We'll ring you.* |
| Success | **What** succeeded, with the number | *Checked in · 9:58 am* · *₹450 added to earnings* — never *Success!* alone |
| Error she can fix | The fact + the fix | *That code didn't match* → **Try again** · **Call help** |
| Error she cannot fix | The fact + who is on it + what she can still do | *Couldn't reach Snabbit · Your photo is saved · We'll send it when you're back online* |
| Offline | Once, at the top, calm | *You're offline · Your work is saved and will send when you're back* |
| Waiting on someone else | Who, and for how long | *Waiting for Radhika to approve · 2 min* |
| Time running out | Number first, tone from the Timer | *15 min left* · *1 min left to accept* |
| Miss (late, no-show, lapsed) | The fact, the consequence as a number, the way back — no shame | *Login window closed at 6:40 am · Log in now to start your shift* |
| Win | One warm specific line, ≤ 1.5 s on screen | *Gold tier · 3 weeks on time* |

Never: *Something went wrong* · *Error 502* · *Request failed* · *Oops* · *Network error* · *Failed to fetch* · *Invalid input* · *Verification failed* · *Try again later* without a time · *Success!* · *Coming soon* · *Pro tip* · *New!* · *Up next* · a red screen · a spinner that does not end.

---

## 5. Numbers, money, time, place

Identical in every language (P9); numerals are Latin; formats come from `foundations/type.md` § Numerals.

| Thing | Format | Notes |
| --- | --- | --- |
| Money | `₹450` · `₹1,250` · `₹1,25,000` | Indian grouping; no decimals unless paise matter (never in UI); the sign is `+ ₹450` / `− ₹50` with a space, `Amount` component |
| Duration | `45 min` · `1 hr 20 min` · `2 hrs` | Never `1:20` for a duration; `m:ss` only inside a Timer |
| Countdown | `1:23` · `0:42` · `48:23` | Timer only; tabular numerals |
| Clock time | `9:30 am` · `6:40 pm` | 12-hour, lowercase, space before am/pm; never `06:40`, never `AM` |
| Date | *Mon 8 Sep* · *Tuesday, 7 February* | Weekday and month translated, numerals Latin; never `08/09/2026`, never ISO |
| Relative time | *Today* · *Tomorrow* · *Yesterday* · *in 2 days* · *2 min ago* | Beyond a week, use the date |
| Distance | `350 m` · `1.2 km` | One decimal max |
| Counts | *3 jobs* · *1 job* · *no jobs* | Plurals written out per language; never *job(s)* |
| Ranges | `9:55 – 10:00` · `7:00 am – 12:00 pm` | En dash with spaces |
| Reference numbers | *Reference (UTR) 4021 8834 …* with **copy** | Grouped in fours; never the bare acronym |
| Phone | `+91 98xxx xxxxx` | Grouped 5-5 |
| Percent | `20 %` — avoid in UI | She thinks in rupees and minutes, not percent; the Timer uses percent only to compute tone |

---

## 6. Spoken copy

Voice is a first-class channel (P4). Spoken lines are **written separately** from their on-screen twins — they are speech, not text read aloud.

- **≤ 12 words, one instruction, present tense, her name never.** *"Hold the button to decline."* · *"Fifteen minutes added."* · *"You're offline. Your work is saved."*
- **Numbers are spoken as she would say them**: *"four hundred and fifty rupees"*, *"nine fifty-eight"*, *"fifteen minutes"* — not *"₹450"* passed to a TTS engine. Every string with a number has a spoken form written by hand.
- **When it speaks** (and only then): first use of a control (Coachmark); every error she must recover from; every time-critical event (new job, check-in window, running late, time left at 15 / 5 / 1 min, payout credited); the outcome of an action that takes her eyes off the phone (checked in, photo saved). Once per event; never on *Back online*, never on decoration, never twice for the same thing.
- **The speaker control** (`speaker-high`) sits beside anything spoken so she can hear it again; replay is never more than one tap away (`voice-prompt.md`).
- **Silence is a state.** Silent mode is honoured except for the new-job alert and SOS, which she has told us she always wants to hear.
- **Recorded, not synthesised, for the fixed set.** Onboarding, coachmarks, error recovery and the safety flows are recorded by a native speaker per language; dynamic strings (amounts, names, times) are synthesised into a template *"Your ₹450 will reach your bank by Tuesday"* with the recorded frame and the synthesised slot — and are reviewed aloud once per release.
- **Sound before words.** The distinct sound (new job, confirm, commit, SOS) plays first; the words follow after `motion.standard`. A sound is never used for two meanings.

---

## 7. Four languages — how a string ships

Hindi, Kannada, Marathi and English are equal citizens (P9). The process is the same for every string, and nothing is Stable until it has been through it (`GOVERNANCE.md`, checklist row 15).

1. **English master, written to this page**, with its budget from `type.md` and its spoken form (§ 6) if it is spoken. The string key names the place and the job, not the words: `job.accept.button`, `checkin.window.closed.banner`.
2. **Translated by a native speaker who has met an expert** — a trainer, a Hub lead, an expert herself — never a vendor working from a spreadsheet. The translator sees the screen, not a list. Formal register (आप / ನೀವು / तुम्ही), never the intimate form.
3. **Kannada is the test string.** It is the widest (× 1.35). If the Kannada string does not fit the box at font scale 1.3, the **English is shortened** — all four languages get the shorter idea; a language never gets a worse line to fit.
4. **Heard aloud.** Each spoken line is recorded or synthesised and played to the translator and to one expert; a line that sounds like a form is rewritten.
5. **Reviewed on the screen** in all four languages at font scale 1.3 (`accessibility.md` § the test pass, step 4). Then it is done — and it is never edited in one language alone.

Rules of the road: numerals stay Latin in every language; brand words (*Snabbit*, *SOS*, *UPI*, *Saathi*) stay Latin; **Kavach** is written in the script of the language (कवच / ಕವಚ) because it is a word, not a logo — *decision to confirm* (§ 8); dates translate the weekday and month, not the numerals; the language picker offers each language in its own name and script (हिन्दी · ಕನ್ನಡ · मराठी · English).

---

## 8. Vocabulary — the words we always use

`PRINCIPLES.md` § Vocabulary is the source; this extends it with the words the specs settled on since. Say the left column everywhere: UI, voice, code identifiers, training, support scripts.

| Say | Not | Notes |
| --- | --- | --- |
| Expert | worker, runner, helper, maid, partner | *Runner* survives in package names only |
| Customer · her name | client, user, household | Name whenever known |
| Job | booking, order, task, gig, visit | One customer visit |
| Shift | slot, session, duty | The block of hours she chose |
| Check in / Complete job | login, punch, attendance, check out, submit | *Check out* is the pattern's name; the Button says *Complete job* |
| Present / Login (Home card) | attendance, mark attendance | The pre-shift confirmation; shipped word |
| Earnings | income, wallet, balance | What she has earned |
| Payout | settlement, transfer, withdrawal, redeem | Money reaching her bank |
| Tier · Gold / Silver / Bronze / Diamond | level, rank, badge | Tier colours only for tier (P6) |
| Streak | run, chain | Consecutive on-time days |
| Coins · Red cards | points, rewards, penalties, strikes | The two reward-layer currencies; always with the asset |
| Bonus | incentive, karma, adjustment | Additions to base pay; *Adjustments* is never a deduction label |
| SOS | emergency, panic, alert | The safety trigger |
| Shield | safety mode, monitoring, recording mode | The in-job safety feature — see the Kavach note |
| Saathi | support chat, help desk, bot | The chat; *Help* is the call |
| Hub | centre, office, branch | The physical training / support location |
| Code (OTP) | OTP, PIN, passcode | *Enter the code Radhika gives you* |
| Bank account · UPI ID | payment method, KYC | Plain nouns |
| Directions | navigate, maps, route | Opens the maps app |
| Time left · Overtime | remaining, extra time, ETA | Timer labels |
| A friend · **Saheli** | referral, referee, lead, contact | The friend she brings to Snabbit. *Saheli* is the shipped word (*Refer Saheli* tab) and the Hindi / Marathi UI word; English copy says *a friend*; Kannada uses its own word. Never *Refer Saheli* as an English Button — the verb is *Invite on WhatsApp* (`promo-card.md`, 2026-09-24) |

**Open decision — Kavach or Shield.** The shipped product calls the feature *Snabbit Kavach*; `PRINCIPLES.md` says *Shield*; `shield-card.md` uses *Shield* in the UI and *Kavach* as the feature's proper name. Recommendation: **Kavach** as the name she hears and sees (it is what the Hub calls it and it is a word in her language), *Shield* as the component name in code and specs. Needs the design lead's yes; then one pass through `shield-card.md`, `patterns/after-sos.md` and the vocabulary table.

---

## 9. Words we never use

Consolidated from every spec. The lint warns on the first group.

- **Bare agreement labels:** *OK* · *Okay* · *Yes* · *No* · *Submit* · *Continue* · *Proceed* · *Confirm* alone · *Done* alone · *Dismiss* · *Cancel* (except cancelling a job) · *Skip*.
- **System error language:** *Something went wrong* · *Oops* · *Error 4xx / 5xx* · *Request failed* · *Network error* · *No internet connection* · *Failed to fetch* · *Invalid input* · *Verification failed* · *Server* · *Timeout* · *Try again later*.
- **Marketing filler:** *Hurry!* · *Don't miss out* · *Keep going!* · *Pro tip* · *New!* · *Coming soon* · *Learn more* · *Know more* · *Up next* · *Congratulations!* alone · *Success!* alone.
- **Jargon and acronyms alone:** *KYC* · *OTP* (say *code*) · *ETA* · *UTR* (say *Reference number (UTR)*) · *Min G* · *Base Pay* as a heading · *Adjustments* for a deduction · *Job ID* · *Waiver* · *Step two* (steps are shown, not numbered in words).
- **Feature-speak:** *Activate* · *Enable* · *Grant* · *Monitoring active* · *Smart monitoring* · *Turn on availability* · *Location permission required* · a feature name alone as a Button.
- **Shame:** *Streak broken* · *You missed…* as a headline · *Job denied* · *Rejected* · *Failed* about her.

---

## 10. Copy review — the checklist for one string

Run before a string enters a spec or a build. Rows 15–16 of the component checklist depend on it.

- [ ] The line says something no picture, shape, icon or number on the screen already says, and something she does not already know.
- [ ] It is the only instruction line on its screen; a second instruction is a second screen, a *why* is behind a tap.
- [ ] Verb for an action, noun for a thing, number first where there is one.
- [ ] ≤ its budget in English (`type.md`); Kannada fits the same box at 1.3.
- [ ] Sentence case; no caps, exclamation marks, emoji, idiom, question in a status.
- [ ] Vocabulary from § 8; nothing from § 9.
- [ ] States say what is true, then what to do; no blame; the way back is a Button.
- [ ] Numbers, money, time and dates in the § 5 formats.
- [ ] If spoken: a separate spoken form ≤ 12 words, numbers written as speech.
- [ ] Translated by someone who has met an expert; heard aloud; reviewed on screen in four languages.
- [ ] Passes the colleague test: you would say it to her, out loud, at the door.

---

## Checklist for the foundation

- [ ] Every component spec's *Content* section cites this page instead of restating rules.
- [ ] The lint W1 list matches § 9's first two groups.
- [ ] The Kavach / Shield decision is made and applied.
- [ ] A four-language glossary (§ 8 in हिन्दी · ಕನ್ನಡ · मराठी) is filled in by the Hub trainers and kept beside this page.
- [ ] The first ten Stable components have every string through § 7.
