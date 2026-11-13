# Fallback screens — step 1: every case in onboarding (TC-less)

Status: **agreed** by the lead, 2026-11-12. Groups 7 and 8 were added at agreement.

**Scope.** On 2026-11-12 the lead narrowed this to *onboarding specifically, like no internet, etc etc, during tc less training*: from the first open of the app to the end of in-app (TC-less) training. Shipped flow: *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB`, section *TC Less house help* `599:37239`. The order is splash → promise → language → phone → code → *Join Snabbit in 4 simple steps* → location → about you → work → confirmations → Aadhaar → *Your Aadhaar is verified* → *You have successfully done your onboarding* → *Welcome to Snabbit Training*. A render is in `reads/figma-shipped-failures-2026-11-12/`.

The app-wide list (98 cases, 13 families) is parked in `CASES-app-wide.md`. It is not in scope.

**How to read a row.**
- *What happened* and *What she can do* are written the way she would say them. They are not screen copy; that is step 3.
- **Stops** means she cannot go to the next step until it is fixed. **Waits** means onboarding can carry on, or the app tries again by itself.
- **Owner** is who has to act: **Phone** means turn something on, **Place** means move or wait, **Her** means fix her own details, **Snabbit** means wait, **Other** means Aadhaar or the bank, **Help** means call help.
- **Today**:
  - **shipped** means a final Figma frame exists.
  - **specced** means it is in `patterns/` or `components/` but not drawn.
  - **nothing** means it is in neither.

Until group 8, no case loses her money or a job, because she is not earning yet. What a failure costs her there is **dropping out**: she closes the app and does not come back. That is the cost this work is protecting against. Group 8 costs money: a payout that cannot be sent, or more tax.

---

## 1 · Anywhere in onboarding

These can happen on any screen, from the first open to the last training video.

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1 | First open with no internet | The app has nothing to show until internet comes | Turn on data, or move to where there is signal | **Stops** | Phone / Place | specced (EmptyState `offline`) |
| 1.2 | Flight mode on | Phone is in flight mode | Turn off flight mode | **Stops** | Phone | nothing |
| 1.3 | Mobile data off | Data is switched off | Turn on data | **Stops** | Phone | nothing |
| 1.4 | Data pack finished, or Wi-Fi with no internet | Phone is connected but nothing comes through | Recharge, or switch off Wi-Fi | **Stops** | Phone | nothing |
| 1.5 | Internet lost in the middle of a step | Signal went; what she typed is kept | Wait or move; the step sends by itself | Waits | Place | specced (`offline.md`; `onboarding.md` § Edges) |
| 1.6 | Very slow internet | Internet is very slow | Wait; the app keeps trying | Waits | Place | specced (`offline.md` § Patchy) |
| 1.7 | Snabbit slow to answer | Snabbit is taking long | Wait; it tries by itself, then *try again* | Waits, then stops | Snabbit | specced (3-second rule) |
| 1.8 | Snabbit not working | The problem is at Snabbit, not her phone | Wait; try again; call help | **Stops** | Snabbit | nothing |
| 1.9 | Snabbit closed for repair | Snabbit is being fixed until a time | Come back at that time | **Stops** | Snabbit | nothing |
| 1.10 | Update needed | This Snabbit is old; a new one is needed | Update the app | **Stops** | Phone | nothing |
| 1.11 | Phone memory full | Phone has no space (update, videos) | Free up space | **Stops** update and videos | Phone | DS Toast *No storage available* (in-job only) |
| 1.12 | Battery low | Battery may die in training | Charge the phone | Waits | Phone | nothing |
| 1.13 | Sound off | She cannot hear Saathi or the training | Turn up the sound | Waits (but onboarding speaks) | Phone | nothing |
| 1.14 | Phone date or time wrong | Phone clock is wrong; codes fail | Set time to automatic | **Stops** | Phone | nothing |
| 1.15 | Phone too old | Snabbit cannot run on this phone | Call help | **Stops** | Help | nothing |
| 1.16 | A tap did not save | What she chose did not reach Snabbit | Try again | Stops that step | Snabbit | specced (Snackbar) |
| 1.17 | She left half-way, comes back | Her steps are kept | Carry on from the same step | — | — | specced (`onboarding.md` § Edges) |
| 1.18 | Help line busy | Help did not pick up | Help calls back, or wait | Waits | Help | nothing |

## 2 · Phone number and code

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 2.1 | Code SMS did not come | The SMS has not come | Wait for the timer, then ask again or ask for a call | Stops | Other | specced (*Call me instead*) |
| 2.2 | Wrong code | The code does not match | Type it again | Stops | Her | **shipped** red boxes, *Incorrect OTP* and *Resend OTP* (`770:43671`) |
| 2.3 | Code too old | She waited too long; the code no longer works | Ask for a new code | Stops | Her | nothing |
| 2.4 | Number typed short or wrong | The number has fewer than 10 digits | Type the full number | Stops | Her | specced (TextField `error`) |

## 3 · Location (finding her city)

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 3.1 | Location off on the phone | Location is switched off | Turn on location, or pick the city | Waits (city by hand) | Phone | nothing |
| 3.2 | She said no to the location box | Snabbit cannot see where she is | Pick the city herself | Waits | Her | specced (`permissions.md`) |
| 3.3 | Location blocked for good | The phone will not ask again | Pick the city now; allow in settings later | Waits | Phone | specced (*Open settings*) |
| 3.4 | GPS cannot find her (indoors) | Phone cannot find where she is | Pick the city herself | Waits | Place | nothing |

## 4 · About you and work

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 4.1 | City not open yet | Snabbit is not in her city yet | Pick another city, or be told when it opens | **Stops** | Snabbit | **shipped** *We are not live in your area yet.* (`778:47242`) |
| 4.2 | Not hiring men | Snabbit is not taking men right now | Call help | **Stops** | Snabbit | **shipped** *We are not hiring male experts at the moment* (`778:48025`) |
| 4.3 | Referral code not found | The friend's code is not right | Check with the friend, or go on without it | Waits | Her | specced (`onboarding.md` § Edges) |

## 5 · Aadhaar

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 5.1 | Aadhaar page did not open | The Aadhaar page did not open | Try again | Stops | Other | nothing |
| 5.2 | Aadhaar slow today | Aadhaar is slow, not her | Try later; training can start | Waits | Other | specced (*Aadhaar service is slow right now*) |
| 5.3 | Aadhaar code goes to another phone | Her Aadhaar is linked to another number | Keep that phone near; call help | **Stops** | Her | nothing |
| 5.4 | Left the Aadhaar page before the end | She came back without finishing | Start Aadhaar again | Stops | Her | **shipped** prevention: *Do not exit app now* (`599:37239`) |
| 5.5 | Aadhaar name does not match | The name she typed and the Aadhaar name differ | Fix her name; call help | **Stops** | Her | specced (*Aadhaar didn't match*) |
| 5.6 | Aadhaar already used | This Aadhaar is already with another expert | Call help | **Stops** | Help | nothing — **confirm with tech** |
| 5.7 | Not allowed to join (age) | She is under 18 | Nothing; Snabbit tells her plainly | **Stops** | Snabbit | nothing (pictogram `document-not-eligible` exists) |
| 5.8 | Papers being checked | Snabbit is checking her papers | Wait until the time shown | Waits | Snabbit | nothing (confirmed live, 2026-11-12) |
| 5.9 | Account on hold | Snabbit has stopped her joining | Call help or go to the Hub | **Stops** | Help | nothing (confirmed live, 2026-11-12) |

## 6 · Training in the app

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 6.1 | Training video will not play | The video needs internet | Turn on data, or move | **Stops** training | Phone / Place | specced (HowToClip *Needs internet*) |
| 6.2 | Video keeps stopping | Internet is too slow for the video | Wait; the video loads by itself | Waits | Place | nothing |
| 6.3 | Videos are using her data | Training uses a lot of data | Use Wi-Fi, or go on | Waits | Phone | specced in part (*Using data · 1.5 MB*) |
| 6.4 | Quiz answer wrong | That answer is not right | Watch again, answer again | Stops that question | Her | nothing |
| 6.5 | Training progress did not save | What she watched did not reach Snabbit | Nothing; kept on the phone and sent later | Waits | Snabbit | specced (offline queue) |
| 6.6 | Next step did not open after training | Training is done but the next screen did not come | Try again | Stops | Snabbit | nothing |

## 7 · Go-live photo (added by the lead, 2026-11-12)

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 7.1 | She said no to the camera box | Snabbit cannot open the camera | Allow the camera | **Stops** | Her | specced (`permissions.md`, MediaCapture) |
| 7.2 | Camera blocked for good | The phone will not ask again | Allow it in settings | **Stops** | Phone | specced (*Open settings*) |
| 7.3 | Camera will not open | The camera is busy or stuck | Close other apps, then try again | **Stops** | Phone | nothing |
| 7.4 | Photo not right | Uniform or face is not clear | Take it again | Stops that step | Her | **shipped** *Your uniform is not visible*, *Retake Photo* (BEM `775:14164`) |
| 7.5 | Too dark | There is not enough light | Move to the light, take it again | Stops that step | Place | specced in part (MediaCapture `fail`) |
| 7.6 | Face does not match Aadhaar | The face and the Aadhaar photo differ | Take it again; call help | **Stops** | Her / Help | specced (MediaCapture `face`) |
| 7.7 | Photo did not upload | The photo is on the phone, not sent | Nothing; it sends by itself | Waits | Place | specced |

## 8 · Bank and PAN (added by the lead, 2026-11-12)

| # | Case | What happened | What she can do | Stops? | Owner | Today |
| --- | --- | --- | --- | --- | --- | --- |
| 8.1 | Account number typed two ways | The two account numbers are not the same | Type it again | Stops | Her | specced (two entries, `onboarding.md`) |
| 8.2 | IFSC not found | The bank code is not right | Find it by bank and branch | Stops | Her | specced (*Find IFSC*) |
| 8.3 | Bank says the account is wrong | The account number is not right | Fix the bank details | **Stops** payout | Her | specced (`payout.md` *details-wrong*) |
| 8.4 | Bank name is not her name | The account is in another name | Add her own account; call help | **Stops** payout | Her / Help | specced (*No, try again*) |
| 8.5 | Bank slow to check | The bank is still checking | Wait about a day | Waits | Other | specced (*Checking with the bank · usually a day*) |
| 8.6 | UPI ID not found | The UPI ID is not right | Type it again, or add a bank account | Stops | Her | nothing |
| 8.7 | PAN does not match | The PAN name and her name differ | Fix the PAN; call help | Waits (more tax) | Her | nothing |
| 8.8 | PAN not linked to Aadhaar | PAN and Aadhaar are not joined | Link them (outside the app); call help | Waits (more tax) | Other | nothing |
| 8.9 | She skips PAN | Without PAN, more tax is cut | Add PAN now or later | Waits (more tax) | Her | **shipped** *You're losing ₹4,700*, *Add PAN* (ER Bank/UPI) |

**Out of scope:** missed training day (shipped `752:37755`). It belongs to centre (TC) training, not TC-less.

---

**Count:** 60 cases in 8 groups. 6 are shipped, 26 are specced but not drawn, and 28 have nothing. **Agreed by the lead, 2026-11-12.**

**What the shipped onboarding already teaches her.** Saathi sits bottom-right on every form screen and speaks, and the expert photo leads every screen. No failure in onboarding uses either. The two shipped full-page failures (city, men) are a picture with one sentence. The *Incorrect OTP* box is red text only.

**Dropped (not in the live app, per the lead):** a fake-location app, logged in on another phone, and code locked after many tries.

**Still open:**
- The lead also answered *Something else* when confirming live cases, with no detail.
- 5.6 (Aadhaar already used) needs tech to confirm.
