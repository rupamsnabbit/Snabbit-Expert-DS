# Fallback screens — app-wide case list (parked 2026-11-12; scope narrowed to onboarding, see CASES.md)

Draft, 2026-11-12. Not yet in the repo: it moves into `projects/fallback-screens/CASES.md` once you agree it and say yes to the folder.

**How to read a row.** *What happened* and *What she can do* are written the way she would say them. They are not screen copy yet; that is step 3. **Stops her** means she cannot carry on until it is fixed. **Can wait** means the app keeps working and she can fix it later. **Costs** is what she loses if it is not fixed: ₹ (money), Job, Safety, or — (nothing).
**Today** says what exists now: **shipped** (in the live app or a final Figma frame), **specced** (in `patterns/` or `components/`, not drawn), or **nothing**.

Sources read: `PRINCIPLES.md` (P1, P4, P5), `patterns/error-recovery.md`, `offline.md`, `permissions.md`, `check-in-out.md`, `new-job-alert.md`, `payout.md`, `onboarding.md`, `earnings.md`, `insurance.md`, `referral.md`, `notification-centre.md`, `after-sos.md`, `components/empty-state.md`, `feedback.md`, `media-capture.md`, `shield-card.md`, `sos-control.md`, `job-alert.md`, `skeleton.md`, `foundations/content.md`, `assets.md`, `motion.md`, and the shipped Figma ERRORS section (Job Lifecycle `991:58068`).

---

## Who has to act: the six owners

Every case below has one owner, and the owner decides what kind of button she gets. This is the main finding of step 1, and step 2 builds on it.

| Owner | What she does | Example |
| --- | --- | --- |
| **Her phone setting** | Turn something on (one tap opens the setting) | Location off, flight mode on, data off |
| **Where she is standing** | Move or wait. There is no button, only the place. | Lift, basement, indoors with no GPS |
| **Her details** | Fix her own details | Wrong bank account, wrong code, photo not clear |
| **Snabbit** | Nothing, she waits; the app tries again by itself | Snabbit slow, Snabbit being fixed, payout retrying |
| **Someone else** (customer, bank, Aadhaar) | Wait, or use another way | Customer not at the door, bank refused, Aadhaar slow |
| **Nobody can fix it here** | Call help | Account blocked, third failure of anything |

---

## A · Internet

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | Flight mode on | Anywhere | Phone is in flight mode | Turn off flight mode | Can wait (saved work keeps going) | Job, if an alert comes | nothing (offline banner covers all A as one) |
| A2 | Mobile data off | Anywhere | Data is switched off | Turn on data | Can wait | Job | nothing |
| A3 | No signal | Lift, basement, stairwell, bus | No signal here | Step out or wait; app sends by itself | Can wait | — | **shipped** red strip *No internet connection* at check-in (BEM `152:81490`, DS Toast) |
| A4 | Data pack finished, or Wi-Fi with no internet | Anywhere | Phone is connected but nothing comes through | Recharge, or switch off Wi-Fi | Can wait | Job | nothing |
| A5 | Very slow internet | Anywhere | Internet is very slow | Wait; app keeps trying | Can wait | — | **shipped** yellow strip *Bad internet connection* (BEM `152:81469`, DS Toast) |
| A6 | No internet and nothing saved on the phone | First open, a screen she has never opened | Nothing to show until internet comes | Turn on data or move, then try again | **Stops** that screen | — | specced (EmptyState `offline`) |
| A7 | Back online, saved work sending | Anywhere | Internet is back, sending her work | Nothing | — | — | specced |
| A8 | Saved work did not send when internet came back | Anywhere | One thing did not reach Snabbit | Try again; call help | Can wait | ₹ if it is a check-in or check-out | specced |
| A9 | Saved work still not sent after a day | Profile, Home | Yesterday's work has not reached Snabbit | Try again; call help | Can wait | ₹ | specced (`offline.md` § Queue) |

## B · Snabbit's side

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B1 | Snabbit slow to answer (more than 3 s) | Any load or save | Snabbit is taking long | Wait; it tries by itself; then try again | Stops that action | — | specced (3-second rule) |
| B2 | Snabbit not working | Anywhere | The problem is at Snabbit, not her phone | Wait; try again; call help | **Stops** | Job, if long | nothing (no "it's us, not you" state) |
| B3 | Snabbit being fixed (planned) | App open | Snabbit is closed for repair until a time | Wait until that time; SOS still works | **Stops** | Job | nothing |
| B4 | A screen did not open | Earnings, payout, notifications, refer, cover | This page did not open | Try again; call help | Stops that screen | — | specced (EmptyState `error`) |
| B5 | A tap did not save | Present, attendance, rating, details | What she pressed did not reach Snabbit | Try again; call help | Stops that action | ₹ (attendance → absent) | **shipped** "We couldn't mark your attendance" (sheet + full page) |
| B6 | Still being worked out | Earnings after the day | Today's money is not counted yet | Wait until the time shown | Can wait | — | **shipped** "Final Earnings will be shown by 10:00 PM" |

## C · Location

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | Location off on the phone | Home (jobs nearby), check-in, Shield | Location is switched off | Turn on location | **Stops** check-in (except *check in anyway*) | Job, ₹ | nothing (only the app permission is specced) |
| C2 | Snabbit not allowed location | Onboarding, check-in, Shield | Snabbit is not allowed to see where she is | Allow location | Stops check-in | Job | specced (`permissions.md`) |
| C3 | Snabbit blocked for good (*Don't ask again*) | Same | The phone will not ask again | Open settings and allow | Stops | Job | specced (*Open settings*) |
| C4 | Only "while using", needs "all the time" | Shield, job in progress | Location stops when the app is closed | Allow all the time | Can wait (Shield partial) | Safety | specced in part |
| C5 | Weak GPS, cannot find her | Check-in, indoors | Phone cannot find where she is | Step near a window or door; or check in anyway (hold) | Can wait | Flagged check-in | specced (`check-in-out.md`) |
| C6 | Too far from the customer's home | Check-in | She is not at the customer's home yet | Go closer; directions | Stops check-in | Late | specced (`map-marker.md` line) |
| C7 | Fake-location app on the phone | Check-in, Home | Another app is changing her location | Remove that app | **Stops** | Job | nothing — **confirm if this exists** |

## D · Camera, photo, microphone

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D1 | Snabbit not allowed the camera | Selfie, Aadhaar, setup photo | Snabbit cannot open the camera | Allow camera (or settings) | Stops the photo | Job (no start) | specced |
| D2 | Camera will not open | Same | Camera is busy or stuck | Close other apps, try again | Stops | Job | nothing |
| D3 | Photo not right | Selfie, uniform, card, setup | Face, uniform or card not clear | Take again | Stops that step | — | **shipped** *Your uniform is not visible* · *Retake Selfie* (BEM `1:22718`, `775:14164`) |
| D4 | Photo did not upload | Any photo | Photo is on the phone, not sent yet | Nothing; sends by itself; or try again | Can wait | — | specced |
| D5 | Snabbit not allowed the microphone | Shield start | Shield cannot hear | Allow microphone | Can wait (job goes on) | Safety | specced |
| D6 | Gallery not allowed | Document upload | Cannot pick a photo from the phone | Allow, or use camera | Can wait | — | specced |

## E · Phone health

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| E1 | Phone memory full | Shield, photos, update | Phone has no space left | Free up space | Stops Shield, photos, update | Safety, Job | **shipped** "No storage available" (toast, Kavach line) |
| E2 | Battery low in a job | Job in progress | Battery is low | Charge if she can | Can wait | Safety (Shield stops) | specced; **shipped** Kavach battery sheet |
| E3 | Battery saver puts Snabbit to sleep | Between jobs | Phone stopped Snabbit to save battery | Allow Snabbit to stay on | Can wait | Job (alerts missed) | specced |
| E4 | Notifications off | Home | Phone will not ring for new jobs | Turn on notifications | Can wait | Job | specced |
| E5 | Sound off or Do not disturb | Home, before shift | She will not hear a new job | Turn up sound | Can wait | Job | nothing |
| E6 | *Show over other apps* off | Home | Job alert cannot come on top | Allow | Can wait | Job | specced |
| E7 | Phone date or time wrong | Login, check-in | Phone clock is wrong | Set time to automatic | **Stops** (times and codes go wrong) | ₹ (late) | nothing |
| E8 | Phone too old for the app | Install, update | Snabbit cannot run on this phone | Call help / Hub | **Stops** | Job | nothing |
| E9 | App closed in the middle of a job | Reopen | Snabbit closed by itself | Nothing; her job is still running | — | — | nothing |

## F · Login and account

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | Logged out | Reopen | She has to log in again | Log in with the code; work is saved | **Stops** | Job if mid-shift | nothing |
| F2 | Logged in on another phone | Reopen | Her account opened on another phone | Log in here; call help if it was not her | **Stops** | Job, Safety | nothing |
| F3 | Login code did not come | Login | The SMS has not come | Wait for the timer; ask for a call | Stops | — | specced (*Call me instead*) |
| F4 | Wrong code | Login, end-job code | Code does not match | Type again; ask again | Stops | — | **shipped** red boxes *Incorrect OTP* · *Resend OTP* (ER `770:43671`) |
| F5 | Too many wrong codes | Login | Code is locked for some minutes | Wait the time shown; call help | **Stops** | Job | nothing |
| F6 | Account on hold by Snabbit | Login, Home | Her account is stopped | Call help / go to Hub | **Stops** | ₹, Job | nothing |
| F7 | Number not with Snabbit | Login | This number is not an expert yet | Join, or try the other number | Stops | — | nothing |
| F8 | City not open yet | Onboarding | Snabbit is not in her city yet | Tell me when it opens | **Stops** | — | **shipped** *We are not live in your area yet* (ER `778:47242`); specced |

## G · The app

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| G1 | Update needed | App open | This Snabbit is old; new one needed | Update app | **Stops** | Job | nothing |
| G2 | Update ready, not needed | Home | A new Snabbit is ready | Update now or later | Can wait | — | nothing |
| G3 | Clip will not play | How-to clips | Clip needs internet | Turn on data | Can wait | — | specced |

## H · The job

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| H1 | Cannot accept, no internet | Job alert | Job came but cannot be taken without internet | Turn on data; it enables by itself | **Stops** accept | Job | specced |
| H2 | Job went to someone else | Job alert | Another expert took it | Nothing | — | Job | specced |
| H3 | Missed the job alert | Home after | She did not answer in time | Nothing; red card if any | — | Job, red card | specced in part |
| H4 | Customer cancelled | On the way, at the door | Customer cancelled the job | Nothing; paid for the trip if so | — | ₹ | specced |
| H5 | Job time or address changed | Before the job | Snabbit changed the job | See the new time or place | Can wait | — | specced in part |
| H6 | Customer not at home, door not opening | At the door | Customer is not answering | Call customer; wait; tell Snabbit | Stops check-in | Job, ₹ | nothing |
| H7 | Call to customer does not connect | At the door, on the way | Customer's phone does not connect | Try again; chat; call help | Can wait | Late | nothing |
| H8 | Customer cannot give the end code | Check-out | Customer does not have the code | Call help | Stops completion | ₹ | specced |
| H9 | Check-in time over (late) | Check-in | Check-in time has passed | Check in now | Can wait | ₹ (bonus, red card) | specced |
| H10 | Cannot check in: Shield cannot start | Check-in | Shield needs battery, space or microphone | Fix the one thing | Stops check-in | Safety | specced |
| H11 | Shield stopped in the job | Job in progress | Shield stopped (battery) | Charge; start again | Can wait | Safety | specced |
| H12 | Map did not load | Job card | Map did not open | Use the address; open directions | Can wait | — | specced |
| H13 | No directions app | Job card | Phone has no maps app | Read the address; call customer | Can wait | Late | nothing |
| H14 | Extra-time request ran out | Job in progress | Her request for more time was not answered in time | Nothing | Can wait | ₹ (no overtime) | **shipped** *Sorry, you were late / Request expired* · [OK] (BEM `1:25251`) |
| H15 | Block list full | Rating after job | She has already blocked 5 customers | Unblock one first | Stops blocking | — | **shipped** *5/5 People blocked* (BEM `152:81197`) |

## I · Money

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| I1 | Payout processing | Earnings | Money is at the bank | Wait until the date shown | Can wait | — | **shipped** (Payment is under processing) |
| I2 | Payout failed, bank's side; retrying | Earnings, notification | Bank did not take it today; trying again | Nothing | Can wait | ₹ late | specced (`payout.md` retrying) |
| I3 | Payout failed, retries over | Same | Money did not go | Send again | Can wait | ₹ | specced |
| I4 | Bank details wrong | Same | Bank account number or name is wrong | Fix bank details | **Stops** payout | ₹ | specced |
| I5 | No bank account added | Earnings, Home | No account to send money to | Add bank account | **Stops** payout | ₹ | **shipped** (Add UPI / Bank Account callout) |
| I6 | Bank account being checked | Earnings | Bank is checking her account | Wait about a day | Can wait | — | specced |
| I7 | Early payout not open | Early payout | Early payout not allowed now (limit, tier, date) | Add bank details, or wait until the date shown | Can wait | — | **shipped** *₹7,100 is waiting for you · Add bank details to unlock* (ER `599:30322`) |
| I8 | Money looks wrong or missing | Earnings | A job or bonus is missing | Report it (shipped Payout Issue menu) | Can wait | ₹ | **shipped** (Payout Issue menu) |

## J · Joining (onboarding)

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| J1 | Aadhaar did not match | Onboarding | Aadhaar details do not match | Try again; call help | **Stops** joining | — | specced |
| J2 | Aadhaar slow | Onboarding | Aadhaar is slow today | Try again later; carry on with other steps | Can wait | — | specced |
| J3 | Aadhaar phone not hers | Onboarding | Code goes to another phone | Use that phone; call help | Stops | — | nothing |
| J4 | PAN does not match / not linked | Onboarding, payout | PAN does not match Aadhaar | Add or fix PAN; call help | Can wait | ₹ (more tax) | **shipped** *You're losing ₹4,700* · *Add PAN* sheet (ER Bank/UPI) |
| J5 | Bank account check failed | Onboarding | Bank says the account is wrong | Fix bank details | Stops payout | ₹ | specced |
| J6 | Face does not match | Selfie | Face does not match the ID | Take again; call help | Stops | — | specced (D3) |
| J7 | Under review | After joining | Snabbit is checking her papers | Wait until the date shown | Can wait | — | nothing |
| J8 | Not allowed to join | Onboarding | Age or document not allowed | Call help | **Stops** | — | nothing (pictogram exists) |
| J9 | Not hiring men | Onboarding | Snabbit is not taking men right now | Call help | **Stops** | — | **shipped** *We are not hiring male experts at the moment* (ER `778:48025`) |
| J10 | Missed a training day | Training | She missed a training day | Pick a new date | Stops training | — | **shipped** *Missed Day 2 Training. Pick a new date.* (ER `752:37755`) |

## K · Safety (never shown as a failure)

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| K1 | SOS with no internet | Anywhere | SOS goes by phone call and SMS | Nothing different | — | — | specced |
| K2 | SOS call did not connect | SOS active | The call did not go through | It calls again; call 112 | — | Safety | specced |
| K3 | Help line busy | Any *Call help* | Help is busy | Chat with Saathi; Help calls back | Can wait | — | nothing |

## L · Nothing to show (empty, not broken)

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | No jobs today | Home | No job yet | Stay on; jobs will come | — | — | specced |
| L2 | No jobs nearby | Home | No job near her right now | Wait | — | — | nothing |
| L3 | No earnings yet | Earnings | Nothing earned yet | Do the first job | — | — | specced |
| L4 | No payouts yet | Payout history | No payout yet | Nothing | — | — | nothing |
| L5 | No messages | Notifications | Nothing new | Nothing | — | — | specced |
| L6 | No friends invited | Refer | No friend yet | Invite on WhatsApp | — | — | specced |
| L7 | Search found nothing | Hood or city search | Nothing with that name | Try another name | — | — | specced in part |

## M · Misses that cost a red card (found in the shipped Figma; probably not fallback)

These are not *something did not work*. They are consequences of a rule. They are listed so you can choose to leave them out, not so they are forgotten.

| # | Case | Where | What happened | What she can do | Blocks? | Costs | Today |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Job not accepted in time | Home, after the alert | She did not take the job | Nothing | — | ₹ red card −50 | **shipped** takeover *−50 JOB NOT ACCEPTED* (BEM `152:79344`) |
| M2 | No show | Home | She did not come for her shift | Nothing | — | ₹ red cards | **shipped** *NO SHOW* takeover (BEM `1:19220`) |
| M3 | Marked present but not working | Home | Present without a login | Nothing | — | ₹ red cards | **shipped** *FALSE PRESENT* (BEM `1:23395`) |
| M4 | Emergency logout | Home, in shift | Leaving mid-shift costs money | Go back, or log out | Choice | ₹ red card, ₹250 | **shipped** sheet + takeover (BEM `1:24255`) |
| M5 | Red card let off this time | Home | Warning: next time costs more | Nothing | — | — | **shipped** sheet *Red cards waived off this time* (BEM `152:84695`) |
| M6 | Missed a Sunday, no bonus | Earnings | Bonus lost this week | Nothing | — | ₹ bonus | **shipped** Status Banner *No bonus. Missed 1 Sunday* (DS `666:3389`) |
| M7 | Items missing from the kit bag (Beauty) | Bag check | Some kit items are missing | Report it; still work | Can wait | — | **shipped** *3 items missing* (BEM `422:58963`) |

**Count:** 98 cases in 13 families. 25 are shipped today, 45 are specced but not drawn, and 28 have nothing in the system.

**Shipped look today.** Two looks, both reading-first:
- Full-page and sheet failures use a red `!` icon, a title, a body sentence, *Try again* and *Contact support*.
- Lasting conditions use a red or yellow strip with one sentence (*No internet connection*, *Bad internet connection*, *No storage available. Clear space to continue.*).

No shipped screen uses a picture or a voice line for a failure. Nothing shipped covers app update, maintenance, location or GPS off, permission denied, upload failure, payment failure or being logged out. Screenshots are in the scratchpad `figma/` folder.

---

## What I need you to decide

1. **Scope.** Is M (misses with a red card) out? It sits with the penalties work. Are K (safety) and L (empty) in? Safety is never shown as a failure (P7), and empty is not a failure, but both use the same screen parts. Are H6 and H7 (customer not at the door, call does not connect) in? Nothing in the system covers them today.
2. **Cases to confirm exist in the live app:** C7 fake-location app, F2 logged in on another phone, F5 code locked, F6 account on hold, J7 under review.
3. **The words already in the system break your rule.** `offline.md` and `error-recovery.md` use *network*, *You're offline ·*, *we*, contractions and middle dots. In step 3 I will rewrite them in place, so the new copy replaces the old.
