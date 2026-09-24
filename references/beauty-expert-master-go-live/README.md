# Reference read — *Beauty Expert Master* → Onboarding → **Go Live Flow**

| | |
| --- | --- |
| Source | Figma *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO` · page `Onboarding` (`0:1`) · section **Go Live Flow** `97:55482` — 19 frames, 393 × 852 |
| Read | 2026-09-22, every text string swept (`findAllWithCriteria TEXT`), four frames screenshotted at full size |
| Why | Stakeholder feedback: the flow is *not cohesive and not conversational*. Ask: rebuild on Paper (*Snabbit Beauty* → page **Iterations**), keeping the shipped order |
| Owner | **The system, not a project.** Go-live is a stage of `patterns/onboarding.md` (between 6b *Training centre* and 8 *First shift*); the decision on 2026-09-22 was not to open a project for it. The build plan is `BUILD.md` in this folder |
| Whose phone | **The expert's.** The header shows *her* name and number on purpose — experts screenshot screens and send them to support, and the team identifies the account from the header. Kept. |

## Step 1 — what is there (shipped order, kept)

| # | Frame | Strings that matter |
| --- | --- | --- |
| 1 | `97:55844` Date of joining | *Select date of joining* · 8 Feb Tomorrow · 9 · 10 · *Show more dates* · Continue |
| 2–3 | `135:73283` · `135:73369` Earn more on Sunday | 6 hours *Current shift hours* · 8 h *Earn ₹1,000 extra* · 10 h ₹3,000 · 12 h ₹5,000 (coin emoji pills) · selected → *Select shift start time* 08:00 / 09:00 / 10:00 AM · Continue · Skip |
| 4 | `97:61143` Weekly off | *Select your weekly off day* · Mon–Thu radios · Continue |
| 5 | `135:73464` · `135:73825` Confirm your shift timings | Wipro Park, 2nd Block Koramangala (edit) · Tue–Sat 10:00 AM to 8:00 PM 10 hours · Sunday 07:00 AM to 07:00 PM 12 hours · Monday Weekly off · *Estimated Monthly Earnings* ₹35,000 · *Joining Bonus* +₹1,000 · Continue |
| 6 | `97:57379` Kit Details | *Your Beauty Kit* · Total kit cost ₹22,510 · Tools 34 items ₹21,012 · Bag ₹599 · 2 Sets ₹899 · item list · *See all 37 Items* · Total ₹22,012 · Advance −₹2,000 · **Left to pay ₹20,510** · Continue |
| 7 | `97:57472` Confirmation | *Have you got everything?* · 4 checkboxes · *Handed over by Sahil Waghmare* · Continue |
| 8 | `97:57506` EMI | *You will pay in 6 monthly parts* · ₹3,624 · *Cut from your payout, not paid by you* · kit balance ₹20,510 · interest 12 % ₹1,234 · total ₹21,744 · March–Aug rows · I-understand checkbox · Continue |
| 9 | `97:56526` Hub | *How it Works* header + voice bar · *Your hub location* · cluster Powai · 4 photos · R-City Mall + address · MAPS · Proceed |
| 10 | `97:56590` Terms | full legal text · Decline · Accept |
| 11–14 | `97:56233` · `97:57225` · `97:57244` · `97:57210` Selfie | intro sheet *Please take a selfie in your Snabbit uniform · This will be your ID card picture* · camera with face oval · *Your uniform is not visible* + *Correct way to take selfie* · Retake · Submit |
| 15–17 | `97:57275` · `97:57329` · `97:57354` OTP | *Enter OTP · Please ask your trainer to share the OTP with you* · 3 boxes · Submit → Verify OTP → Verifying |
| 18 | `97:55483` Congrats | *Congratulations · You are now a Snabbit Expert · Get started* over a first Home: *Welcome to Snabbit! Earn upto ₹800 on your first day* · Your Shift 7:00 AM – 12:00 PM · Mark attendance for tomorrow 6:30 AM · Mark Present / Absent · Reach hotspot by 6:30 AM · Jyoti Nivas College Gate 3.2 km · Show me the way · Buddy / Team Leader / CLM · Call |

## Step 2 — what it is trying to do

A trainer at the Hub hands an expert her kit and signs her off; the app is the script for that conversation, and the record of what she agreed to (hours, off day, kit debt, terms). Five stages, one sitting, one trainer in the room.

## Step 3 — why it does not read as one flow

| Symptom | Where | Rule it breaks |
| --- | --- | --- |
| Four header shells (name + Call + thin progress · back + *Your Kit* · *How it Works* + voice bar · bare camera title) | 1–5 vs 6–8 vs 9–10 vs 11–17 | `header-nav.md`: one nav per app; P5 — she cannot tell where she is |
| Progress shown on some screens, never as a count | 1–5 only | P5 |
| Every action is *Continue · Proceed · Submit · Skip* | all | `content.md` § 3 verbs; § 9 banned list |
| Coin-emoji pills as reward marks; *Earn ₹1,000 extra* not numbers-first | 2–3 | `assets.md` (rewards are assets, never emoji); `content.md` § 1 numbers first |
| Money in three card shapes (kit · EMI · estimate) | 5, 6, 8 | `statement.md` — the app ships one shape for money |
| Terms as a legal wall with *Decline / Accept* | 10 | P1, P9 — a wall in English is unreadable in four scripts; `bottom-sheet.md` `confirm` |
| Trainer appears only at steps 7 and 15 though he is in the room throughout | 7, 15 | `content.md` § 1 — *the trainer at the Hub* is the register |
| *Skip* on Sunday hours — an unlabelled consequence | 2 | P5 — say what skipping means |
| Kit totals disagree (₹22,510 vs ₹22,012; 34 tools vs 37 items) | 6 | stakeholder: *put anything* — one consistent set chosen in the build |
| Selfie fail drawn as a separate screen with a *correct way* illustration | 13 | `media-capture.md` `fail` state already covers it |

## Step 4 — tier

**Tier 2 composition** throughout; every region below is a system component or a shipped region (`BUILD.md`). No Tier 3. One ask of core: **VoicePrompt `bar` + ProgressBar `segmented` + HeaderNav as one onboarding shell** — recorded as a composition in `BUILD.md`, not a new component.

## Step 5–6 — translation (shipped order kept; what changes is the shell, the voice and the shapes)

| Shipped | Paper (*Iterations*) | In one sentence |
| --- | --- | --- |
| Four header shells | **One shell on every screen**: HeaderNav `default` — back · *Sunita Rao* · *5673439* subtitle · Call + Language actions — then ProgressBar `segmented` (5) and VoicePrompt `bar` | She always knows who she is signed in as, where she is, and can hear the screen (P5, P4) |
| *Continue / Proceed / Submit / Skip* | Verbs that say the consequence: *Start on Tue 8 Feb* · *Work 8 hours on Sundays* · *Not on Sundays* · *Take Mondays off* · *This is my week* · *Check the kit with Sahil* · *Everything is here* · *Agree to pay ₹3,624 a month* · *I agree* / *I don't agree* · *Take selfie* · *Finish go-live* · *See my first shift* | The button is the sentence she is saying back (`content.md` § 3) |
| Kit card · EMI card · estimate card | Statement ×3 (band · rows · total · `schedule` with date tiles) | One shape for money, already shipped |
| Coin pills | SelectionCard `rich` with Amount `S` trailing *+₹1,000 a month* | Rewards are assets, not emoji; numbers first |
| Radio lists for dates | SelectionCard `date` strip (7 days) + *Show more dates ›* | The system's way to pick a day |
| Terms wall | Five numbered plain rows + *Read the full terms ›* · **I agree** / **I don't agree** adjacent | P1, P3, P9 |
| Selfie: 4 frames | MediaCapture `face` with its `fail` and `review` states | The component already has the states |
| *Enter OTP* | *Sahil signs you off* — NumericKeypad `otp`, 3 boxes, auto-submit | The code is the trainer's signature, in his name |
| Congrats + composite Home | Celebration (`motion.celebrate`, `sound.confirm`) → Home pre-shift card exactly as `patterns/onboarding.md` § 8 | Already specified; nothing new |

Open for the stakeholder: whether *Estimated ₹35,000 a month* has a source (RateTable) — drawn as *About ₹35,000 a month* until it does (P5).
