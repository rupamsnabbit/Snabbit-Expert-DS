# The ask — Contactless GL (Phase 2: Onboarding Centre)

## A — A PRD arrived

| | |
| --- | --- |
| From | Diya Sarawagi, Product |
| Received | 2026-11-04 |
| Source | https://claude.ai/artifact/EL8Qb7wrFkgqaa2AkqEvMm (Claude doc, rev 179) |
| Kind | Written PRD — verbatim below |
| Version | v1 |

The body below is the PRD **as received**. It is evidence, like a Figma screen or a Mobbin flow: it says what the business wants and when. It is not a design, and nothing in it overrides `principles/` or `tokens/`.

Do not edit the body — not the wording, not the structure, not the parts that are wrong. Disagreements go in `SCOPE.md` → *Open questions*. A revision is appended below as a new version with its own header; the diff between versions is often the most useful thing in the folder.

The doc's one diagram (§ 2) is transcribed as a table at the same place; nothing else was changed. The doc was converted from its rich text to markdown: headings, lists and tables are the doc's own.

---

## PRD — Contactless GL (Phase 2: Onboarding Centre)

2026-11-04 · Diya Sarawagi

### 1. Overview

Phase 2 takes the Training Centre (TC) out of onboarding. An expert goes from deep-link install to go-live in the Expert App, with one visit to a light onboarding centre for uniform, BMI and handover. This PRD covers what dev starts now (Phase 2). It also keeps each physical step behind a config switch so Phase 3 (no visit at all) can go live without a rebuild.

#### Problem

- Today an expert visits the TC for training, KYC, uniform and go-live. Each visit is a drop-off point, and each needs a trainer or TC staff.
- App-led (TC-less) training already works: of experts who open the course, 79% finish. But 40% of targeted experts never open it (snapshot 2026-10-27, 693 experts).
- TC-less today is switched on per training batch, TC or expert ID. So the expert still needs a TC batch and an ops person to add them. The flow cannot be handed out as a link.
- The flow is not fully in the expert's language. Registration inputs, city names, the TnC and some error messages show in English.
- The expert picks a work area and shift only at the end. If no slot is free, she has trained for nothing.

#### Goal

Any expert who opens a contactless deep link completes lead capture to go-live in the app, in her chosen language, with one onboarding-centre visit and no trainer.

#### Scope

|  | Phase 2 (this PRD) | Phase 3 (design for, build later) |
| --- | --- | --- |
| Entry | Deep link, pilot-gated | Deep link, all leads |
| Training | App (TC-less) | App |
| KYC | App: Aadhaar face match, DigiLocker, OCR fallback | App: eKYC + video KYC fallback |
| Uniform | Advance payment + handover at onboarding centre | In-app size + payment, home delivery |
| BMI | Recorded by onboarding agent | Photo-based |
| Go-live photo | App, with AI uniform overlay | App, with image verification |
| Day one | Hotspot guidance + support contact + voice | Plus buddy, IVR, coachmarks |

Out of scope for Phase 2: home delivery of uniform, in-app uniform payment, video KYC, AI voice assistant, expert buddy.

#### Success metrics

| Metric | Target | Why |
| --- | --- | --- |
| Lead-to-GL conversion (deep-link cohort) | At or above the Phase 1 TC-less cohort | Phase 2 gate |
| Face match success rate (first attempt) | Set after pilot week 1 | Phase 2 gate |
| Share of enrolled experts who open training | Up from 60% | Biggest leak today |
| Days from ER to GL | Below the TC-less 4.2 days enrollment-to-completion baseline | Speed |
| Ops / telecaller calls per GL | Down vs regular flow | Contactless means fewer touches |
| First shift login within 7 days of GL | At or above physical (42.9%) | Quality does not drop |

Baselines: TC-less training snapshot of 2026-10-27, the internal context file `tcless_training.md`.

### 2. End-to-end flow

The contactless flow is the regular flow with the TC removed, work area moved up front, and KYC and go-live photo moved into the app.

Read top to bottom. Every step is shown in the expert's chosen language. Support (call) is reachable from every step.

#### What changes vs the regular flow

| Step | Regular flow today | Contactless flow |
| --- | --- | --- |
| Lead capture | Telecaller call | Deep link, source + referrer tagged |
| Intro videos | Section is empty | 3–5 short videos |
| Permissions | All at once | One at a time, with a picture guide to the settings page |
| Registration | Inputs in English | All inputs and values in chosen language |
| TC slot selection | Required | Removed |
| Work area + shift | After training | Before KYC, skippable, with joining bonus |
| KYC | At TC | In app: face match, DigiLocker, OCR fallback |
| Training | TC, or TC-less if batch targeted | App only |
| Certificate | None | Downloadable |
| Uniform + BMI | TC | Onboarding centre, recorded in an agent tool |
| TnC | English | Chosen language |
| Go-live photo | At TC, in uniform | In app, AI adds the uniform |

### 3. Requirements by step

Each step has a user story, the problem today, numbered requirements and acceptance criteria. Priority: P0 = needed for the pilot, P1 = needed before scale-up.

#### 3.1 Lead capture: contactless deep link — P0

**User stories**

- As  product manager, I want one link that puts any expert who opens it into the contactless flow, so I can run a pilot without opening the flow to a whole city or tying it to a TC batch.
- As  product manager, I want to know who shared the link (an FR, an expert, or a digital ad), so I can see which channel works.
- As a telecaller, I want to see in LMS that an expert is on the contactless flow, so I guide her through the right steps.
- As an expert who has already started the regular flow, I want the link to move me into the contactless flow, without starting over or calling anyone.

**Problem today**

- TC-less is switched on only by training batch, TC or expert ID (campaign targeting). Each new expert needs an ops person to add her.
- The app parses only the AppsFlyer OneLink fields `deep_link_value`, `deep_link_sub1` (referrer ID) and `deep_link_sub2` (campaign ID). Ad conversion data (media source, campaign) is not read.
- Deep links route only after the home screen loads. For signed-out or onboarding experts the link is queued and dropped after 5 minutes. Only the referral IDs survive.
- There is no flow flag in LMS (EMS), so telecallers cannot tell a contactless expert from a regular one.

**Requirements — link and flow assignment**

1. Use the existing AppsFlyer OneLink. Contactless links carry `deep_link_value = contactless_gl`, plus attribution fields (below).
2. Capture the flow intent before login, on install or first open, including deferred deep links, and keep it until OTP verification. It works the same way as referral IDs today.
3. The link is the gate, so anyone who gets it can enter. Add server-side controls: allowed cities, allowed services, allowed categories, a daily cap, and a kill switch. If a control blocks the expert, she goes to the regular flow and sees no error.

**Requirements ****-**** expert already in the regular flow**

1. If the expert is still in registration (before training starts), opening the link moves her to the contactless flow. Keep name, city, gender, language and any completed KYC. Remove TC slot booking.
2. If she is booked into a TC batch but has not attended, cancel the booking and move her.
3. If she has attended TC training, or is past training, do not move her. Show a message in her language and tag LMS.
4. The switch is one backend action, logged with the old flow, new flow and time. Today's reset deletes documents and does not clear `go_live`, `user_campaign_progress` or `aadhaar_vendor_session`, so it cannot be reused as is.
5. Ops can also switch an expert from the ops tool, either way.

**Requirements — attribution**

| Field | OneLink param | Values | Stored on |
| --- | --- | --- | --- |
| Flow | `deep_link_value` | `contactless_gl` | Runner meta + lead |
| Source type | `deep_link_sub3` (new) | `FR`, `EXPERT`, `DIGITAL_AD`, `JOB_PLATFORM`, `TELECALLER` | Lead |
| Referrer ID | `deep_link_sub1` | FR agent ID or expert ID | Lead + referral |
| Campaign | `deep_link_sub2` | Referral or ad campaign ID | Lead + referral |
| Ad source | AppsFlyer conversion data | `media_source`, `campaign`, `adset` | Lead |

1. Ops can generate a link for any FR or expert from the ops tool, with source type and referrer ID filled in.
2. When an ER is created, write these fields to the lead record so the Databricks funnel can report lead → GL by source type and by FR ID.
3. First touch wins. If the expert opens a second link, keep the first attribution and log the second.

**Requirements — LMS**

1. Send `onboarding_flow = contactless` and the source fields on the lead events (`LEAD_INSERT` / `LEAD_UPDATE`) that feed EMS.
2. Show a "Contactless" badge on the lead in LMS, plus a filter, and the expert's current step.

**Acceptance criteria**

- A new user who installs from a contactless link and verifies OTP and category is stamped contactless and never sees TC slot selection.
- The same works when the app was already installed and when the link is opened before login.
- A link opened from a blocked city or service, or after the kill switch is on, lands in the regular flow.
- An expert in regular registration who opens the link moves to contactless and keeps her completed details.
- An expert who has attended TC training does not move and sees a clear message.
- Lead records show source type, referrer ID and campaign for 100% of link installs that reach ER.
- LMS shows the Contactless badge within 5 minutes of ER.

#### 3.2 Intro videos ("Get to know more") — P0

**User story.** As a new expert, I want short videos about Snabbit before I give permissions, so I trust the app and know what the job is.

**Problem today.** The "Learn more" screen loads videos from `runner_onboarding/video_configuration`, but the backend is hardcoded to return nothing. Every expert sees "No videos found".

**Requirements**

1. Make the video list config-driven by language and city. Ops can add, remove and reorder videos with no release.
2. Launch with 3–5 videos of under 60 seconds each: what Snabbit is, what an expert earns, a day in the job, safety, and how the app onboarding works.
3. Each video plays in the expert's chosen language, with subtitles. If her language has no version, play Hindi.
4. Videos are optional to watch and never block the next step.

**Acceptance criteria**

- The screen shows at least 3 videos in every supported language.
- A video added in config shows up with no app release.
- Events fire for video started, video completed and screen skipped.

#### 3.3 Permissions: fewer, staggered, guided — P0

**User story.** As an expert, I cannot understand many permission pop-ups at once. I want to be asked one at a time, when it is needed, in my language, with a picture that shows me where to tap on the settings page.

**Problem today.** All permissions are asked at once, after language and before phone entry. Five of the six are mandatory. The copy is English only: the server-side translation keys for permissions do not exist.

**What the app asks for today, in order**

| # | Permission | Mandatory today | How it is granted |
| --- | --- | --- | --- |
| 1 | Notifications | Yes | System pop-up |
| 2 | Location (precise), then background ("Allow all the time") | Yes, plus location services on | Pop-up, then settings page |
| 3 | Camera + microphone | Yes | System pop-ups |
| 4 | Battery optimisation | Only if remote config on (default off) | Settings page |
| 5 | Display over other apps | Only if overlay remote config on | Settings page |
| 6 | Contacts | No ("Not now") | System pop-up |

After sign-in, the app asks again for camera/mic, battery, overlay and contacts. Going online re-checks background location and battery.

**Proposed: ask each permission when it is needed**

| Permission | When to ask | Why then |
| --- | --- | --- |
| Notifications | First screen after language | Reminders for every later step |
| Location (precise, while using) | First screen after language | To show nearby areas |
| Camera | First screen after language | Face match |
| Microphone | Before first shift (or at training, if voice input is used) | Not needed to onboard |
| Background location ("Allow all the time") | First screen after language (TBD) | Needed only to work |
| Battery optimisation | Before first shift login | Needed only to work |
| Display over other apps | Before first shift login (TBD) | Needed only to work |
| Contacts | At referral screen, optional | Only for referrals |

**Requirements**

1. Before login, ask only for notifications, location, camera. Ask every other permission at the step that needs it (table above).
2. Each ask is its own screen: one picture, one line on why it is needed, one button. All in the expert's language.
3. For permissions granted on a settings page (precise or background location, battery, display over other apps), first show a short animation of the exact settings screen and toggle. Then, while she is on the settings page, show a small floating guide (picture-in-picture) pointing to what to tap.
4. Use guide images for the top phone makers (Xiaomi, Samsung, Vivo, Oppo, Realme), since their settings screens differ.
5. If she denies, explain once in her language and show the guide again. Never loop more than twice. Then show "Call support".
6. Add translation keys for every permission string in all supported languages.
7. Keep the existing permissions screen design. Change only the order, the timing and the language.

**Acceptance criteria**

- A contactless expert sees only the notifications ask before phone entry.
- Location, camera and other asks appear only at the step that uses them.
- Every permission screen and denial message is in the chosen language, in all supported languages.
- For each settings-page permission, the guide shows on the five top phone makers, and the app detects the grant when she returns.
- Permission grant rate is tracked per permission, per device maker.

#### 3.4 Language across the whole flow — P0

**User story.** As an expert who only knows Hindi (or Kannada, Marathi, Telugu, Odia, Bengali), I want every screen, option and message in my language, so I am never stuck on English text.

**Problem today**

- The app supports 7 languages: English, Hindi, Marathi, Kannada, Telugu, Odia and Bengali. Coverage is uneven: Hindi and Marathi have 1,179 keys each; Bengali has 745 and Odia 809.
- Several native screens have English hardcoded ("Confirm", "Locate me", "Page x of y") or use keys that do not exist, so they show in English in every language.
- Dropdown values (city, cluster, TC, dates) are never translated. City and cluster show their raw technical names.
- The gender check's rejection message is hardcoded English.
- Possible bug: the training webview has no alias for Odia, so Odia experts may get no translations there.

**Requirements**

1. Every user-facing string in the contactless flow comes from a translation key, with no hardcoded text. This covers native screens, webviews, the server-driven ER questions and error messages.
2. Translate dynamic values: city, micro market (display name, 3.6), hood, hotspot, shift times and dates. Show dates in local format.
3. Bring Odia and Bengali up to full coverage for every contactless screen.
4. Fix the Odia locale alias in the webview.
5. Translations are vetted by a native speaker before launch.
6. Language can be changed from any screen in the flow. The change applies straight away.

**Acceptance criteria**

- A QA pass of every contactless screen in all 7 languages finds no English text, except names and numbers.
- City and area names in dropdowns show in the chosen language.
- Changing language mid-flow changes the current and later screens with no restart.

#### 3.5 Registration, with TC slot selection removed - P0

**User story.** As an expert in the contactless flow, I want to register (name, city, gender, consent) and go straight on, with no step asking me to pick a training centre or visit date.

**Problem today.** In ER v3, the House Help sequence is registration → category details → training booking → Aadhaar KYC. Training booking is the TC slot selection. Other places also assume a TC: the referral-code question is required when the expert is at a TC, and go-live areas are filtered by the expert's TC.

**Requirements**

1. Create a contactless module sequence: registration → category details → work area (3.6) → Aadhaar KYC (3.7) → training (3.8). It has no training booking module.
2. Hide every TC screen for contactless experts: training slots, change training centre, change visit date.
3. Registration questions and options are fully translated (3.4).
4. If the referral code came in the link, pre-fill it and do not ask again.
5. The gender-check rejection message is translated and explains why, politely.

**Acceptance criteria**

- A contactless expert never sees a TC, batch or visit-date screen, in the app or in a webview.
- A regular-flow expert still sees TC slot selection as today.
- A referral code from the link is pre-filled and stored on the lead.

#### 3.6 Work area and shift selection (new, modular) — P0

**User story.** As an expert, I want to confirm where and when I will work before I train, so I do not finish training and find there is no slot for me.

**Problem today.** Work area is picked after training. Micro-market names are technical ("Sarjapur 1"), so the expert cannot recognise her own area. Joining bonus is not shown, so she has no reason to pick a slot that needs supply. Many experts cannot decide hours alone and get stuck.

**Current state in code.** Area and shift are chosen today inside go-live (shift location, lunch shift, shift timings, hotspot, week off). Micro markets (`geo_cluster`) already have a nullable `display_name`, but every screen shows the technical `name`. Joining bonus is wired end to end, but maestro has returned 0 . Go-live areas are filtered by the expert's TC, which a contactless expert does not have.

**Requirements**

1. Place the step after registration and before KYC. Its position comes from the step-order config, so it can move later in the flow (for example after training) with no app release.
2. Add a display name to every micro market, separate from the technical name. Display names are translated for each supported language. The technical name is never shown to the expert.
3. Show areas near the expert's location first, each with its display name and a short landmark line.
4. After she picks an area, show the shift windows that have open seats. Hide full windows.
5. Show the joining bonus on each area and slot where one is configured (for example "₹2,000 joining bonus"). Ops sets the bonus per micro market, and optionally per slot.
6. Show a "Call support" button and a "Help me choose" option. "Help me choose" creates a callback task in LMS.
7. Show a "Decide later" (skip) option. Skip is on by default for the pilot and can be turned off by config.
8. If she skips: mark work area as pending, hide the slot-confirmation step (3.10), and show work area as a mandatory task in the onboarding-agent tool (3.11).
9. She can change her area and shift until slot confirmation. A picked slot is soft-held for 7 days; if she has not reached slot confirmation by then, the seat is released and she is told.
10. Every label, area name and slot time is shown in her chosen language.

**Acceptance criteria**

- A deep-link expert who completes registration lands on work-area selection, and sees display names, never technical names.
- Areas with a configured joining bonus show the amount; areas without one show nothing.
- Only shift windows with open seats are listed. If none are open in any nearby area, she sees a message and the support button, not an empty list.
- Skip sets work area = pending, removes slot confirmation from her flow, and adds a mandatory work-area task in the agent tool.
- Moving the step in config (for example to after training) changes the order for new experts with no app release, and the flow still completes.
- Events fire: area list viewed, area picked, shift picked, skipped, support tapped, help-me-choose tapped.

**Watch.** This is the step where experts get most stuck. Track drop-off and skip rate here from day one of the pilot.

#### 3.7 Aadhaar KYC and face match - P0

**User story.** As an expert, I want to complete my own KYC on my phone, easily, in my language. If something fails, I want to know why and what to do next.

**Business need.** The person who fills the form must be the expert herself. A selfie matched to the Aadhaar photo proves it.

**Problem today**

- Three Aadhaar paths exist: OTP e-KYC (Perfios SDK, off by default via remote config), DigiLocker (Surepass, webview) and photo upload with OCR (IDfy front/back, Surepass QR).
- There is no face match in KYC. Face checks exist only for shifts and the go-live uniform check.
- Error screens give no clear next step.

**Requirements**

1. Offer two options on one screen, in her language: DigiLocker (recommended) and Aadhaar photo upload (OCR, as backup).
2. If DigiLocker fails or she has no Aadhaar-linked mobile number, offer photo upload (TBD with business).
3. After the Aadhaar step, she takes a live selfie with a liveness check. The selfie is matched to the Aadhaar photo (DigiLocker photo or OCR card image) by the in-house face match model.
4. Name, date of birth and gender are read from Aadhaar and shown for her to confirm.
5. Every failure has its own screen: what went wrong, what to do, a retry button and "Call support". See the table below.
6. After 3 failed attempts at any step, show "Call support" and offer KYC at the onboarding centre (Phase 2 fallback).
7. Ask for consent before capturing face data, with the reason, in her language. Store the consent with its time.
8. P1: check if DigiLocker's own pages can open in her language; if not, show a short guide video in her language before redirecting.

**Error screens**

| Case | What she sees | Next action |
| --- | --- | --- |
| Aadhaar not linked to a mobile number | DigiLocker needs your Aadhaar mobile number | Upload Aadhaar photo instead |
| DigiLocker session expired or failed | The check did not finish | Try again, or upload Aadhaar photo |
| Aadhaar already used by another expert | This Aadhaar is already registered | Call support |
| Photo blurred, cut off or glare | We could not read your Aadhaar | Retake with tips (flat surface, light, all corners) |
| Face does not match Aadhaar | Your selfie does not match your Aadhaar photo | Retake selfie with tips; after 3 tries, call support |
| Liveness failed | We could not confirm a live photo | Retake in good light, look at the camera |
| Name or DOB mismatch with registration | Details on Aadhaar differ from what you entered | Confirm Aadhaar details or call support |
| Network or server error | Something went wrong on our side | Try again; progress is saved |

**Acceptance criteria**

- An expert can complete KYC by DigiLocker or by photo upload, without help.
- A selfie that does not match the Aadhaar photo is rejected, and the expert cannot continue.
- Every row in the error table shows its own message and action, in all supported languages.
- After 3 failures, she sees the support and onboarding-centre options, and LMS is tagged "KYC stuck".
- Face match result, score, vendor and consent are stored per attempt.
- Face match success rate (first attempt) is tracked, since it is a Phase 2 gate.

#### 3.8 Training (TC-less) and assessment — P0

**User story.** As an expert, I want to learn the job in the app, in my language, and know exactly what to do if I fail, so I can finish without visiting a centre.

**Problem today.** will add this

**Requirements**

1. Before training, show a short transition video: how training works, how long it takes, what happens if she fails.
2. Enrol every contactless expert in training automatically after KYC. Training must not depend on a physical TC batch or on ops adding her to a campaign (see 4.2).
3. Vet all translations and the text-to-speech voice in every supported language.
4. Update video content and shorten total duration. Target duration to be agreed with the training team.
5. Make the assessment easier: replace or part-score multi-select questions, and review the 10 questions with under 40% correct.
6. Show a "Call support" button on every module and on the assessment.
7. On a failed attempt, show the score, which topics she got wrong, which module to rewatch, and how many attempts are left.
8. When she is locked out (attempts used up), show one clear next step, and let ops move her to regular (TC) training from the ops tool.
9. P1: face check at module start and at the assessment, so nobody else takes training in her place.

**Acceptance criteria**

- A contactless expert who passes KYC sees the training home with no ops action.
- Every screen, video, quiz question and TTS line plays in her chosen language.
- A failed attempt shows score, wrong topics, the module to rewatch and attempts left.
- A locked-out expert sees the next step and a call button; ops can move her to regular training, and her LMS record shows the move.
- Completion closes training exactly like a trainer's sign-off (status, completion date, BGV, referral event).

#### 3.9 Training complete and certificate — P1

**User story.** As an expert, I want to be told clearly that I have finished training and get a certificate I can keep, so I feel recognised and know what comes next.

**Requirements**

1. Show a completion screen in her language, with her name, the date and the next step.
2. Generate a certificate (PDF or image) with her name, photo from KYC, completion date and a certificate ID.
3. She can download and share it (for example on WhatsApp).
4. The certificate stays available in the app after go-live.

**Acceptance criteria**

- On passing, the completion screen shows, then the next step.
- The certificate downloads to the phone and opens in the gallery or file viewer.
- The certificate ID can be looked up by ops.

#### 3.10 Joining date and slot confirmation — P0

**User story.** As an expert, I want to tell Snabbit when I will start and confirm my area and hours, so the business can plan for me and I know my slot is held.

**Requirements**

1. Joining date stays as it is today.
2. Slot confirmation shows the area and shift picked in 3.6, with an edit option.
3. If she skipped 3.6, slot confirmation does not show here. It is done at the onboarding centre.
4. If her slot filled up since she picked it, show the nearest open options and the joining bonus for each.

**Acceptance criteria**

- An expert who picked a work area sees it pre-filled and can edit it.
- An expert who skipped work area never sees slot confirmation in the app.
- A full slot is never confirmed; she is offered alternatives.

#### 3.11 Onboarding centre visit (configurable) — P0 (To be confirmed by Business)

**User story.** As an expert, I want to know where to go and what will happen at the onboarding centre. As the business, we want her uniform paid for, sized and handed over, and her BMI/physical m checked, all recorded in one place.

**Current state in code.** The go-live "Confirm kit" screen has the expert pick T-shirt and pant size and quantity herself. The field-ops (OG) app has go-live verification and merch-delivery views. There is no BMI record and no payment record.

**Requirements — expert app**

1. Show one screen: onboarding centre address, map link, timings, what to bring and the advance amount to pay.
2. The screen is on or off by config (per city or cohort). When off (Phase 3), the expert goes straight to TnC, and uniform and BMI are handled in the app.
3. After the visit, her app shows uniform size, quantity and payment status.
4. If work area is still pending, show it as a mandatory step before she can move on.

**Requirements — onboarding-agent tool (new touch point)**

One ops tool records the expert's physical check and uniform handover. It works the same way at the onboarding centre and at the expert's doorstep (Phase 3 delivery), so the same tool carries over when the centre is switched off.

**Handshake: expert app ↔ ops tool**

1. The expert app shows an "Expert ID" card on the onboarding-centre screen and on home: her name, photo from KYC, expert ID
2. The agent (at the centre) or the delivery person (at the doorstep) enters the expert ID  in the ops tool. A match opens her record; . This reuses the existing go-live pattern, where the expert shows her ID and an OTP to the trainer.
3. The expert app shows "Your visit has started with <agent name>", so she knows who is recording her details.

**What the ops tool records**

1. Physical check: BMI (height, weight, pass or fail) and a short checklist of anything else checked in person.
2. Uniform size and quantity given, per item (T-shirt, pant, bag). The expert's in-app size pick is shown pre-filled; the agent confirms or corrects it.
3. Advance payment received: amount, mode, reference.
4. Every record is saved with the agent ID, time and place (centre or doorstep).

**What the expert sees afterwards**

1. Her app shows what was recorded: uniform size and quantity received, payment status and the BMI check result.

**Acceptance criteria**

- The expert app shows her expert ID card with a rotating code on the onboarding-centre screen and on home.
- The ops tool opens an expert's record only with a matching expert ID and a valid code.
- The same tool and handshake work at the onboarding centre and at a doorstep visit.
- The agent can record physical check, uniform size and quantity per item, and payment for an expert, and the expert app shows them within one minute.
- A pending work area blocks visit completion until it is filled.
- Turning the module off in config skips the screen for new experts, and the flow still completes.
- A BMI fail blocks go-live, tells the expert her case is under review, and creates an ops review task.

#### 3.12 Terms and conditions in her language — P0

**User story.** As an expert, I want to read and understand the terms before I accept them, in my language.

**Problem today.** The go-live TnC is a PDF per language, but only English, Hindi, Marathi and Kannada have one. Telugu, Bengali and Odia fall back to English. The text around it is barely translated in Bengali (40 keys) and Odia (1 key). The older native TnC screen uses one English PDF.

**Requirements**

1. Provide the TnC in all 7 languages, translated and signed off by legal.
2. Show it as readable text in the app (not only a PDF), with a play button that reads it out.
3. Show a short summary of the key points (pay, attendance, penalties, uniform deposit) above the full text.
4. Store the accepted TnC version, language and time.

**Acceptance criteria**

- The TnC opens in the chosen language for all 7 languages, with no English fallback.
- The voice read-out plays in that language.
- Acceptance is stored with version, language and time.

#### 3.13 Go-live photo — P0

**User story.** As an expert, I want to take my profile photo myself at home, without wearing the uniform, so I can go live without another visit.

**Problem today.** The go-live photo needs a trainer. The expert shows her expert ID and an OTP, the trainer verifies the OTP and takes her selfie in the OG app, and an ML check confirms she is wearing the uniform. For contactless, she must take the photo herself, without the uniform.

**Requirements**

1. The expert takes a selfie in the app, with an on-screen face frame and tips (light, plain background, face fully visible).
2. Check photo quality before accepting it: one face, in focus, lit, no sunglasses or mask.
3. The face must match her KYC selfie or Aadhaar photo.
4. An AI model puts the Snabbit uniform on the photo and enhances it. The expert sees the result and can retake.
5. The original and the generated photo are both stored. Customers only see the generated one.
6. If checks fail three times, show a call-support option.

**Acceptance criteria**

- A blurred, dark or multi-face photo is rejected with a reason in her language.
- A photo whose face does not match KYC is rejected.
- The approved photo shows her in uniform and is used on her customer-facing profile.

#### 3.14 Go-live, and day one at the hotspot — P1

Go-live completes after the photo is approved. Detailed day-one requirements will follow; this is the starting set.

**User stories**

- As an expert, on my joining date I want to know exactly which place to go to.
- As an expert, I want to call someone if I am lost.
- As an expert who cannot read or write well, I want voice guidance in the app.

**Requirements (starting set)**

1. On the joining date, the home screen shows her hotspot, address, a map button and her shift time.
2. A "Call for help" button reaches her area's ops contact.
3. Voice guidance in her language reads out each home-screen card and the route steps.
4. A reminder the evening before and the morning of her joining date.

### 4. Cross-cutting requirements

#### 4.1 Flow config and modularity

The contactless flow is a new flow version on the existing server-driven onboarding. It is not a separate app flow.

1. New flow value `contactless`, stamped on the runner at OTP verification (3.1). It drives `onboarding_conditions` the same way `v3` does today.
2. New `onboarding_module_group` row for contactless, per service. Its sequence has no training booking and has a work-area module (3.5).
3. Go-live steps are switchable per flow and city: work area position, slot confirmation, onboarding-centre visit, uniform at centre vs home, photo by trainer vs self.
4. Changing any switch affects only new experts. Experts already mid-flow keep their sequence.
5. Phase 3 is reached by config: onboarding centre off, uniform delivered home, BMI by photo.

#### 4.2 TC dependencies to remove

These places in the code assume every expert has a TC. Each must work for an expert with no TC.

| Dependency today | Where | Change needed |
| --- | --- | --- |
| TC-less targeting uses batch, TC or expert ID | expert-service campaign targeting | Add a targeting fact for `onboarding_flow = contactless` |
| Training completion needs an ONGOING TC batch enrollment | expert-service enrollment service | Auto-enrol contactless experts in a virtual online batch per city, or drop the check for contactless |
| Referral code required when the expert is at a TC | maestro runner service | Skip for contactless; use the link's referrer |
| Go-live areas filtered by the expert's TC | expert-service go-live cluster filters | Filter by city or region for contactless |
| Go-live photo needs a trainer OTP and OG-app capture | go-live profile image + OG app | Expert self-capture through the existing selfie validation API (3.13) |
| Reset does not clear go-live, campaign progress or KYC session | maestro + expert-service reset | New "switch flow" action (3.1) |

#### 4.3 Support on every step

1. Every contactless screen has a "Call support" button.
2. A tap creates a callback task in LMS with the expert's current step and last error, and offers a direct call.
3. If an expert is inactive on a step for 24 hours, she gets a reminder (push, then SMS or IVR), and LMS gets a telecaller task.

#### 4.4 Tracking and analytics

1. Every step fires viewed, completed and failed events with `flow`, `source_type`, `referrer_id`, `language` and `step`.
2. Add `onboarding_flow` and the link attribution fields to the Databricks supply funnel, so lead → ER → KYC → trained → GL → FL can be cut by flow, source type and FR ID.
3. A pilot dashboard shows the funnel and drop-off per step, the contactless vs regular comparison, face match success, and support calls per GL.

#### 4.5 Ops tools

| Tool | Who uses it | What it needs |
| --- | --- | --- |
| LMS (EMS) | Telecallers | Contactless badge and filter, current step, last error, callback tasks |
| Ops tool | Supply ops | Generate links per FR or expert, switch an expert's flow, move to regular training, see link attribution |
| Onboarding-agent tool (OG app) | Onboarding-centre agent | Find expert, record uniform size, quantity and payment, BMI, complete work area and slot, mark visit done |

### 5. Open questions and rollout

#### 5.1 Open questions

| Question | Decision | Owner |
| --- | --- | --- |
| Pilot city and services | Bangalore, House Help only. Cook and Beauty later, by config | Decided |
| Link source types | FR, expert referral, digital ads, job platforms | Decided |
| Does the link's source override the ER source waterfall in Databricks? | Open | Business team |
| Can an expert who attended a TC day switch to contactless? | Open | Business team |
| Uniform size | Expert picks size in the app (existing Confirm Kit); agent confirms or corrects at handover | Decided |
| Uniform advance amount and payment mode | Open | Business team |
| Seat hold after work-area pick | Soft hold for 7 days; released if she does not reach slot confirmation | Decided |
| Face match vendor | In-house model | Decided |
| BMI fail | Block go-live; expert is told her case is under review; ops decides | Decided |
| AI uniform photo: legal check and selfie threshold | Open | Legal |
| Training length target and multi-select rewrite | Open | Training team |
| Joining bonus micro markets, amounts and budget | Open | Business team |

#### 5.2 Rollout

To be added

