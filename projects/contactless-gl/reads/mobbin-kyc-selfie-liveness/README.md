# Reference read — Mobbin → **identity by selfie with liveness, matched to an ID**

Feeds `TIERS.md` surfaces 17–24 (KYC choice, consent, selfie with liveness, Aadhaar confirm, the eight errors, after three failures) and 41–43 (go-live selfie, retake, three failures), and `SCOPE.md` ask 3 (MediaCapture `face` without the logo box; *live / matched* results). Internal reference only: never published, never traced. Screenshots `<app>-<nn>.webp` in flow order.

| | |
| --- | --- |
| Source | Mobbin, iOS catalogue, searched by flow on 2026-11-04 |
| Searches | *identity verification selfie liveness check* · *KYC document scan and selfie* · *driver onboarding identity verification* · *face verification failed retry screen* |
| Read | Claude (agent), 2026-11-04; every screen of every flow opened at full size (contact sheets), strings quoted verbatim |
| Skipped | Airwallex (a web form with a *Verify identity* sheet, nothing of the capture), LinkedIn (same Persona SDK as DoorDash — kept as one fact below, files not saved), Stake (upload-a-file, no liveness), Hinge screens 3–8 (a paywall and unrelated screens after the scan), Grab Driver 1–2 and 10–17 (login, terms, home tour) |

## Source table

| App | Flow | Mobbin URL | Screens | Files | Why it is here |
| --- | --- | --- | --- | --- | --- |
| DoorDash Dasher (worker) | Verifying identity (Persona) | https://mobbin.com/flows/cfb0e2cd-ecb5-42f1-bca1-c41d7a454ec9 | 15 | `doordash-dasher-01…15` | Worker-side: consent, ID scan, face scan, retry, hard fail, pending |
| Grab Driver (worker) | Onboarding, screens 3–9 | https://mobbin.com/flows/c55815d6-5167-482f-86ec-83e99f6283e9 | 17 (7 read) | `grab-driver-01…17` | Worker-side selfie re-verification: do/don't faces, head-movement liveness, time-out |
| Wise | Verifying identity (Onfido) | https://mobbin.com/flows/898f1907-18b8-4c5a-929a-e24227d5a193 | 22 | `wise-01…22` | The fullest flow: method choice, ID front/back + *Is everything clear?*, **consent as a real choice**, video selfie with live prompts, retry side by side |
| OKX | Verifying account (Jumio) | https://mobbin.com/flows/cab2edd4-e07f-4499-a124-c731b88bcede | 12 | `okx-01…12` | *Good example / Cropped / Glare / Blurry* pictograms; selfie tips as three faces; *Check the photo* |
| Binance | Verifying identity (Sumsub) | https://mobbin.com/flows/cdc52574-dd6c-4203-8cc6-4a246dea0a8f | 12 | `binance-01…12` | Two-step overview (*Identity document → Selfie*), *Document is readable* confirm; liveness intro (search result) |
| KOHO | Verifying identity (Onfido) | https://mobbin.com/flows/7993e3d4-36ec-4d46-81ff-bd3c22d2762a | 9 | `koho-01…09` | *What you'll need* intro with *Why we need this*; camera permission at the moment of need; *Record a video — 20 seconds* with a photo of the pose |
| Hinge | Verifying identity (Face Check) | https://mobbin.com/flows/11ef5367-9e22-4f18-8217-78c15226f0c7 | 8 (2 read) | `hinge-01…08` | Consent screen with illustration; *Uploading encrypted 3D face scan* progress |
| Tinder · Plenty of Fish · Wise | retry screens | https://mobbin.com/screens/a37f4d92-90ec-495a-8ba6-157ad4e2874c · https://mobbin.com/screens/18d477ff-b8aa-4131-9dbf-0fb7347a3ff4 | 1 each | `tinder-01` · `plenty-of-fish-01` (Wise's is `wise-18/19`) | The *Your selfie / Ideal pose* side-by-side retry, three apps |
| Walmart · Noom | fail states | https://mobbin.com/screens/78c46fd9-b1b8-4f1e-a2f4-c8c90adf3408 · https://mobbin.com/screens/e4639153-79c7-4591-b228-3afd30135933 | 1 each | `walmart-01` · `noom-01` | The ring turning red with *Face isn't detected*; the generic *We couldn't process your scan* |

Worker-side first (DoorDash Dasher, Grab Driver), then fintech (Wise, OKX, Binance, KOHO), then the dating-app retry convention.

## Step 1 — what is there

### A. Choice of method and the intro

| # | File | App | Strings (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| A1 | `wise-01` | Wise | *"How would you like to verify?"* · *Recommended Option* · `singpass` *"Verify instantly using Singpass — Log into MyInfo with Singpass."* › · *Other ways of verifying* · *"Verify using other documents — Upload your ID which includes your nationality."* › | Two rows; the government route marked *Recommended* |
| A2 | `binance-04` | Binance | *"Verify your identity"* · *"It will only take 2 minutes"* · rows *"Identity document — Take a photo of your ID"* · *"Selfie — Take a selfie"* · **Continue** · *Powered by Sumsub* | The two steps as a list before anything starts |
| A3 | `koho-01` | KOHO | *"Get verified and start using your benefits"* · *"Here's what you'll need to get verified:"* · *"Take a picture of a valid photo ID"* + *Why we need this ⓘ* · *"Record a short video of yourself — A quick, real-time video to verify you."* + *Why we need this ⓘ* · **Verify my identity** · 🔒 *"Your information is secured with encryption."* | What-you'll-need list, the *why* behind a tap |
| A4 | `okx-05` | OKX | *"Get your National ID card ready"* · *"Make sure you capture a clear and complete image."* · a drawn card *Good example ✓* · three small cards *Cropped ✕ · Glare ✕ · Blurry ✕* · checkbox *"I consent to Jumio collecting, processing, and sharing my personal information, which may include biometric data…"* · **Start verification** (disabled until ticked) | The three failure reasons **as pictures**, before the camera |
| A5 | `grab-driver-03`, `-04` | Grab Driver | *"Verify Your Identity — To secure your account, we need your help with verifying your identity."* **Next** · *"Verify to Accept Jobs — It only takes a few seconds and you'll then be available for jobs."* **Verify Now** | Two illustration + line + button screens, a 2-dot PageIndicator |
| A6 | `doordash-dasher-02` | DoorDash | *"Scan your driver's license"* · *"We'll verify your identity and check that you're legally licensed to drive."* · two paragraphs of Persona legal text · **Continue** | Illustration, then a legal wall |

### B. Consent for face data

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| B1 | `wise-12` (= `wise-21`) | Wise | *"Can we run an automatic check of your selfie?"* · *"For you this means:"* · *"we, or our verification partner, will use technology to compare your selfie and ID"* · *"we'll securely store your biometric data (a scan of your face) for up to 1 year"* · *"Our team can manually compare your selfie and ID instead — but this might take longer."* · **Yes, check automatically** (primary) · **No, check manually** (outline) · *"You can change how we use your biometric data any time, under Settings…"* | Consent is a **question with two real answers**, each a verb |
| B2 | `hinge-01` | Hinge | *"Keep Hinge genuine"* · *"Hinge requires users in your region to complete our biometric Face Check.™"* · *"This helps to prevent fraud, detect duplicate accounts, estimate your age…"* · *"By tapping "Agree," you consent to Hinge's collection, use, and storage of your biometric data. To decline, exit the app."* · **Agree** | Illustration of a woman holding a phone; one button; *to decline, exit the app* |
| B3 | `doordash-dasher-14` | DoorDash | *"Verify your identity to continue"* · *"Why is this required? — The person Dashing must be the account owner…"* · *"How do I verify my identity? — You'll do this through a live selfie right here on the app…"* · Persona paragraph · **Continue** · *SECURED WITH persona* | FAQ-shaped consent |
| B4 | `binance-02`, `-03` | Binance | *"Identity Verification — You will be directed to a third party website to complete the following steps."* · *Identity Document Verification → Take a Selfie* · checkbox *"I understand that my personal information will be processed by a third party… biometric data…"* · **Continue** (disabled until ticked) | Checkbox gate |
| B5 | `grab-driver-05` | Grab Driver | *"Park and verify with selfie"* · *"Regular verification helps to ensure your account is safe. To continue receiving bookings, please complete verification."* · two round faces: masked + cap + glasses ✕ (red) · bare face ✓ (green) · *"Your face should not be covered in your selfie."* · **Start Verification** · 🛡 *"Your photo will be stored and processed in accordance with our privacy policy."* | Consent + the do/don't as **two faces** |

### C. The document

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| C1 | `wise-06`, `-07` | Wise | camera, white rectangle frame · pictogram · *"Front side of your ID"* / *"Back side of your ID"* · *"Please make sure that all the details are clear and the whole ID fits in the box above"* · shutter | Frame + one line + shutter |
| C2 | `wise-08…10` | Wise | *"Is everything clear?"* · *"Check that all the details are easy to read with no glare or blur."* · *Front side of your ID* [photo] · *Back side of your ID* [photo] · **Submit** · **Retake front side** · **Retake back side** · *Choose different document* | Review of both sides on one screen |
| C3 | `binance-07`, `-09` | Binance | *"ID card — Make sure that all the information on the document is visible and easy to read"* · **Document is readable** · **Retake photo** | Review: the confirm button states what she is confirming |
| C4 | `okx-06`, `-07` | OKX | *"**Front side** of National ID card"* / *"**Back side** of National ID card"* · corner brackets, a green scan line | Side named in accent colour; a scan line as the only motion |
| C5 | `doordash-dasher-03`, `-04` | DoorDash | *"Place the front of your ID in the frame"* · *ⓘ Capture Tips* · shutter · flash → *"Processing your ID — This may take a few seconds."* | Then a processing screen |
| C6 | `koho-05…07` | KOHO | *"Choose your document"* · *"Select issuing country to see which documents we accept"* · four rows *Passport — Photo page · Driver's license — Front and back · National identity card · Residence permit* → *"Allow camera access"* **Enable camera** → green frame with ✓ *"Position the front of your document in the frame"* | Camera permission asked here, at the moment of need |

### D. Before the face

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| D1 | `okx-08` | OKX | *"Ready to take a selfie?"* · a drawn face in a green ring · three rows, each a small face with a red ✕: *"Remove anything that covers your face."* · *"Take off your glasses to prevent glare or reflections"* · *"Take your selfie in a well-lit space"* · **Next** | The tips **as three pictures** |
| D2 | `wise-11` | Wise | *"Now it's time to take a selfie"* · *"We'll compare it to the photo in your ID document to make sure it's you."* · *Tips for a successful selfie:* · *"Make sure you're somewhere with a stable internet connection."* · *"Hold your device upright…"* · ⚠ *"Stay on the page. Don't switch tabs or apps until your selfie is uploaded… Otherwise, you'll have to start over."* · **Continue** | Says plainly that it is a **match to the ID**; the stay-in-app warning |
| D3 | `binance-liveness` (search result, not saved) | Binance | *"Liveness Check"* · smiling-face sunburst · *"Please show your face clearly — Your face and background will be recorded · Maximize screen brightness · Well lit area · No glasses, mask, hat"* · **Continue** | Bullet list version of D1 |
| D4 | `koho-08` | KOHO | *"Record a video"* · *"For security, we need a live capture"* · *"You have 20 seconds to finish"* · *"Follow the instructions to move or speak"* · a **photo of a woman holding the phone at arm's length** · **Record video** | The pose as a photograph |
| D5 | `doordash-dasher-05` | DoorDash | red circle with a face outline · *"Now, a quick scan to verify you're you"* · **Start** | One pictogram, one line, one button |
| D6 | `grab-driver-06` | Grab Driver | same as B5 with a spinner over it | Loading before the camera |

### E. The capture — frame and liveness prompts

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| E1 | `wise-13…16` | Wise | *"Get ready for your video selfie"* · green oval · *"Frame your face in the oval, then press "I'm ready""* · **I'm ready** → the oval with a **ring that fills green** around it and one word at a time: *"Move closer"* · *"Hold steady"* · *"Move closer"* | Oval + progress ring + one short prompt |
| E2 | `grab-driver-07…09` | Grab Driver | dotted oval in a circle · *"Move your head up and down"* / *"Hold your phone upright."* · smiley · *"You're almost there."* / *"Get ready!"* · blue band *"You'll be available for jobs only after verifying identity."* → dialog *"Time Out — Your session has timed out due to inactivity. Please try again."* **OK** | Head-movement liveness; the time-out as an OS-style alert |
| E3 | `doordash-dasher-06`, `-07` | DoorDash | black screen, soft circle · *"Hold still"* → *"Finishing up…"* with a clock illustration | One prompt; then a processing screen |
| E4 | `walmart-01` | Walmart | big oval with a **red ring** · *"Face isn't detected."* | The ring is the state (red = not found) |
| E5 | `binance-selfie` (search result) | Binance | black camera, shutter, sheet *"Selfie — Take a photo of yourself."* · *⌄ See more guidance* · camera overlay *"Move phone closer"* with a pink disc | Prompt as a pill |
| E6 | `hinge-02` | Hinge | *"Uploading encrypted 3D face scan"* · a progress bar | Upload progress |
| E7 | `wise-17`, `-20` | Wise | *"Securely uploading your video selfie"* · a coin glyph | Upload state |

### F. Results — checked, retry, hard fail, pending

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| F1 | `okx-09` | OKX | *"Check the photo"* · *"Make sure your face and eyes are uncovered"* · the selfie in a big circle · **Take again** (outline) · **Next** (primary), side by side | Self-review before submit |
| F2 | `wise-18`, `-19`; `tinder-01`; `plenty-of-fish-01` | Wise, Tinder, POF | *"Let's try that again"* · *"We need a clearer video selfie"* · **two photos side by side**: *Your selfie* (hers, blurred) · *Ideal pose* (a face in an oval) · one line *"Avoid glare or extreme lighting"* / *"Please Use Ideal Pose & Lighting"* · **Try again** / **TRY AGAIN** / **I'm ready** (POF: *"Retry verification"*; Tinder adds a red banner *"Photo Verification Error — Try uploading a solo shot…"*) | The retry convention: hers next to the good one |
| F3 | `doordash-dasher-08` | DoorDash | *"Let's give that another try"* · *"Your facial scan did not succeed. Please try again ensuring the following:"* · four icon rows *Bright room without glare · Clear phone camera · No glasses, clothing, or mask blocking face · Steady hand holding phone* · **Retry** | Retry with a four-row checklist |
| F4 | `doordash-dasher-09` | DoorDash | *"Your identity could not be verified with the ID and selfie submitted"* · *"You won't be able to dash until you verify your identity. You can request a review below, or visit the FAQ…"* · **Request Review** · **View FAQ** | The hard fail: a human review as the way out |
| F5 | `doordash-dasher-10` | DoorDash | *"Verification in progress"* · *"Our team will update you via email — usually within a few hours. If your identity is verified, you'll be able to continue signup."* | Pending, with a time expectation |
| F6 | `okx-10` | OKX | shield-with-face illustration · *"Identity verified"* · *"You've completed your identity verification. Get started on your crypto journey now!"* | Success |
| F7 | `koho-09` | KOHO | hourglass · *"We're verifying your documents"* · *"Hang tight! This could take a minute or two to complete."* · spinner | Waiting |
| F8 | `noom-01` | Noom | *"We couldn't process your scan"* · *"Sorry, we were unable to process your Face Scan. You can scan again now or come back later."* · **Try again** | The generic error (the one to avoid) |
| F9 | `grab-driver-09` | Grab Driver | *"Time Out — Your session has timed out due to inactivity. Please try again."* **OK** | Session expiry |

## Step 2 — what each flow is trying to do

**DoorDash Dasher** (Persona): consent as an FAQ, scan the licence, a quick face scan with one prompt (*Hold still*), then three distinct outcomes drawn as three screens — retry (soft fail, with a four-row checklist), *could not be verified* (hard fail, **Request Review** → a human), and *in progress* (pending, with an expectation in hours). It is the only flow that designs the **after-three-failures** case: a human review, not a loop.

**Grab Driver**: a *re*-verification that gates jobs (*You'll be available for jobs only after verifying identity*). The do/don't as two faces is the whole instruction; liveness is a head movement with one prompt and a smiley; the band at the bottom says what is at stake. Its failure is a time-out alert with *OK*.

**Wise** (Onfido): the longest and the most honest. The method choice marks the government route *Recommended*; every capture has a review step (*Is everything clear?*) with a retake per side; the selfie is introduced as a **match to the ID photo**; consent is a genuine choice (automatic vs manual, each a verb); the live prompts are one word at a time on a filling ring; the retry shows hers next to the ideal.

**OKX** (Jumio): puts the failure reasons **before** the camera as pictures — *Good example* and *Cropped / Glare / Blurry* for the card, three small faces for the selfie — and lets her check the photo herself before submitting.

**Binance** (Sumsub) and **KOHO** (Onfido): a *what-you'll-need* list first (two steps), the consent as a checkbox gate, the camera permission asked only when the camera is about to open (KOHO), the record-a-video step shown as a photograph of the pose, and a *Document is readable* confirm whose label is the thing she is agreeing to.

**Tinder / POF / Wise retry**: three apps show the same retry — *your selfie* beside *ideal pose* — which makes it a convention.

## Step 3 — against the expert

| Symptom | Where | Breaks |
| --- | --- | --- |
| Consent as a legal wall (*"Persona stores this biometric data and uses it to perform ongoing…"*; *"To decline, exit the app."*) | DoorDash A6, B3; Hinge B2; Binance B4; OKX A4 | P1 text carries all; P5 — a consent with no way to say no is not a consent; `permissions.md` § Shield consent (one primary, a visible ✕ to leave) |
| Tips as bullet lists of sentences (*Maximize screen brightness · Well lit area · No glasses, mask, hat*) | Binance D3, Wise D2, DoorDash F3 | P1 — *a step is a screen, not a numbered line*; one instruction line per screen |
| Four icon rows on the retry screen | DoorDash F3 | P1 — the one reason it failed is the only line she needs; four rows means she must guess which applies |
| *OK* on the time-out; *Continue · Next · Submit* everywhere | Grab F9, all | `content.md` § 9; `button.md` verbs |
| The generic fail (*"We couldn't process your scan — Sorry…"*) | Noom F8 | P5 — never *something went wrong*; name the problem and one recovery |
| Tiny grey *Why we need this ⓘ* links; *See more guidance* disclosure | KOHO A3, Binance E5 | P3 target size; P1 — the why belongs to Listen or one spoken line |
| Red ring + *Face isn't detected* with nothing to do | Walmart E4 | P5 one recovery; P6 no red shouting — the ring may change colour, but the line must say what to do (*Move closer*) |
| *Required*, *you must*, *You won't be able to dash until…* | DoorDash B3, F4; Grab E2 band | `permissions.md` § Copy; P6 dignity — state the fact, show the way back |
| The stay-in-app warning as a paragraph in a grey box | Wise D2 | `onboarding.md` § 5 already has this as a Banner `warning` *Stay in the app — we'll bring you back* |
| Pending state sends her to **email** | DoorDash F5 | P4 / P5 — she does not read email; the pending result is a notification + Home Stepper step |
| Two primaries side by side (*Take again · Next*) | OKX F1 | P2, P3 — the retake is the quieter ghost above or below, never mirrored |
| Illustrated people are generic / Western | all | `assets.md` — the real expert in uniform, or the registered character |

**What they get right, to keep**

- **The do/don't as faces, not sentences** (Grab B5: masked ✕ / bare ✓; OKX D1: three small faces with ✕). This is P1 done — the rule about sunglasses and masks is a picture.
- **The failure reasons shown before the camera, as pictures** (OKX A4 *Cropped / Glare / Blurry*): the `document` tips as a row of three thumbnails, not a list.
- **One live prompt at a time, on a ring that fills** (Wise E1, Grab E2): *Move closer · Hold steady* — shape + one word, which is exactly `timer.md`'s shape-first rule applied to a capture.
- **Hers beside the ideal on retry** (Wise, Tinder, POF): she can *see* the difference; one line says the one reason.
- **The selfie is introduced as a match to the ID** (Wise D2): the honest why in one sentence (P5); the match is not a surprise.
- **Consent as a real question with two verbs** (Wise B1: *Yes, check automatically / No, check manually*): the one consent in the set that P5 passes.
- **Three outcomes, three screens** (DoorDash F3–F5): retry · human review · pending with a time. The hard fail has a person at the end, which is surface 24.
- **Review before submit with a label that states what she confirms** (Binance C3 **Document is readable**; Wise C2 *Is everything clear?* with per-side retake).
- **Camera permission asked at the moment the camera opens** (KOHO C6).
- **The stake in one band** (Grab E2 *You'll be available for jobs only after verifying identity*): wrong words, right idea — the Stepper step on Home carries it.

## Step 4 — tier and system map

| Region (reference) | What it is in the system | Tier |
| --- | --- | --- |
| Method choice with *Recommended* (Wise A1) | **SelectionCard `compact`** ×2 with **Tag `brand`** *Recommended* on DigiLocker — already TIERS.md 17 | 1 — exists |
| What-you'll-need intro (Binance A2, KOHO A3) | `onboarding.md` § 5 *Keep your Aadhaar ready* intro: scene asset + Heading1 + one line + **Button**; the two steps are the ProgressBar `segmented`, not a list | 1 — exists |
| Consent for face data (Wise B1; Grab B5's faces) | **BottomSheet `confirm`** safe-confirm form (`permissions.md` § Shield consent): scene asset of *her face matched to her Aadhaar card*, Heading3 *Confirm it's you*, one spoken sentence (*We match your face to your Aadhaar photo*), **I agree** primary, ✕ to leave. Wise's *manual check* alternative becomes *Do it at the Hub* `ghost` only if the stakeholder confirms a manual path (q — open) | 1 — exists (TIERS 20) |
| Document front/back with frame + one line (Wise C1, OKX C4) | **MediaCapture `document`** ×2 (front, back) — exists (TIERS 19) | 1 — exists |
| *Good example / Cropped / Glare / Blurry* pictograms before the card (OKX A4) | MediaCapture `document`'s **retake tips** drawn as a 3-thumbnail row (pictograms, `assets.md` illustration layer), shown once before the first capture and again on `result` fail — a content change inside the existing `document` guide, not a new part | 1 — content |
| *Is everything clear?* review, retake per side (Wise C2, Binance C3) | **MediaCapture `preview`** with **Use this photo** `primary` / **Retake** `ghost` — exists; the label states what she confirms (`button.md`) | 1 — exists |
| Three-face selfie tips (OKX D1, Grab B5) | The **MediaCapture `face` guide frame**: the oval with the registered character, and the ✕ cases as *three small faces* under it (sunglasses · mask · dark) — this is ask 3's *no logo box*; the tips become pictograms in the guide, not rows | core change — ask 3 |
| Oval + filling ring + one word (Wise E1, Grab E2, Walmart E4) | **MediaCapture `face`** `capturing` state: the oval's stroke is a **ProgressBar ring** that fills (`timer.md` shape rule), one prompt line at a time (*Move closer · Hold still · Turn your head*), spoken (P4); red stroke only with a line that says what to do | core change — ask 3 (liveness prompts) |
| *Hold still → Finishing up…* (DoorDash E3), *Securely uploading* (Wise E7) | **Skeleton** with the 3-second rule, then the `result` (`onboarding.md` § 5) | 1 — exists |
| Hers beside the ideal on retry (Wise F2, Tinder, POF) | **MediaCapture `face` `result` fail**: her frame (dimmed) + the guide oval side by side, **one reason line** (*Too dark · Blurred · Face not found · Sunglasses · More than one face · Not you*), **Try again** primary — ask 3's `result` states *not live / not matched* | core change — ask 3 |
| Four-row retry checklist (DoorDash F3) | **Not borrowed** — one reason per fail (P1, P5) | — |
| Hard fail → human (DoorDash F4) | **EmptyState `error`** final rung: **Call help** primary, *Do it at the Hub* `ghost` → the Hub screen (TIERS 24, 43) | 1 — exists |
| Pending with a time (DoorDash F5, KOHO F7) | **EmptyState `waiting`** with Timer `deadline` (*by 6 pm*) and the step `attention` in the Home Stepper; notification on result (`notification-centre.md`) — not email | 1 — exists |
| Success (OKX F6) | `onboarding.md` § 5 *Your Aadhaar is verified* summary Card with the KYC photo as Avatar; TIERS 22 confirm rows **Yes, that's me** / **Not me — call help** | 1 — exists |
| Time-out alert with *OK* (Grab F9) | **EmptyState `error`** *Took too long — start again* **Try again**; never a dialog with *OK* (`content.md`) | 1 — exists (error row *session expired*) |
| Stake band (*available for jobs only after…*) | Not a band: the Stepper step on Home + the ProgressBar; dignity copy (P6) | — |
| Camera permission at the moment of need (KOHO C6) | **BottomSheet `permission`** *Confirm it's you* → **Allow camera**, opened by the first MediaCapture (`permissions.md` row for camera) | 1 — exists |

## Step 5 — what travels to contactless-gl

| Surface | Base here | What changes for contactless |
| --- | --- | --- |
| 17 · KYC choice | Wise A1 | Convention confirmed: two rows, the government route first with *Recommended*; ours is SelectionCard `compact` ×2 + Tag `brand`; the second row's line says what it costs (*Photo of your Aadhaar, front and back*) |
| 18 · DigiLocker in-app | Wise D2's stay-on-page warning | Already a Banner `warning` in `onboarding.md` § 5; nothing new |
| 19 · Aadhaar photo, front/back, OCR | Wise C1–C2, OKX A4/C4, Binance C3 | MediaCapture `document` ×2 as specced; add the *good / cropped / glare / blurry* **pictogram row** once before capture (OKX) — a content addition to `media-capture.md` § `document` tips (P1); the review label is **Use this photo**, not *Submit* |
| 20 · consent before face data | Wise B1 (the only real choice); Grab B5 (faces) | BottomSheet `confirm` with a scene of *her face next to her Aadhaar photo*, one spoken sentence of why, **I agree**, ✕ to leave; the *why* is the match itself (Wise D2), said once, never *required* |
| 21 · live selfie with liveness, matched | Wise E1, Grab E2, OKX D1, Walmart E4 | Ask 3 made concrete: `face` guide = oval + character + three ✕ faces (no logo box); `capturing` = ring fills, one prompt at a time, spoken; `result` = *matched* (tick, the summary Card follows) · *not matched* · *not live* · quality reasons, each one line |
| 22 · name / DOB / gender to confirm | OKX F6 | Success is the summary Card with her KYC photo as the Avatar, **Yes, that's me**; no celebratory copy before the confirm (P5) |
| 23 · the eight errors | Wise F2, DoorDash F3–F5, Grab F9, Noom F8 | Capture-side fails (blurred · face mismatch · liveness) live inside MediaCapture `result` with hers-beside-ideal and **one** line; the others (not linked · session expired · already registered · name/DOB mismatch · network) are EmptyState `error` rows, one recovery each; the pending case gets a Timer and a notification, never email |
| 24 · after three failures | DoorDash F4 | EmptyState `error` with **Call help** primary and *Do it at the Hub* ghost — DoorDash's *Request Review* is the same rung with a person at the end |
| 41 · go-live selfie with tips, quality checks, match to KYC | Same as 21 (the `face` component is one) | The guide shows the uniform in the scene (not a logo box); `result` reasons *blurred · dark · more than one face · sunglasses* exactly as OKX's three faces + one |
| 42 · AI uniform preview | — | No base: nothing on Mobbin shows a generated photo for approval. MediaCapture `preview` with **Use this photo** / **Retake** is the nearest (Wise C2 / Binance C3 shape); the *generated* line is ours (P5), open question 11 |
| 43 · three failures → call support | As 24 | — |

Surfaces with **no base** here: 42 (generated image preview). Nothing shows an Indic-script KYC, a DigiLocker WebView, or an Aadhaar-shaped document.

## Step 6 — convention vs choice

**Convention (three or more — keep):**

- A *what you'll need* screen before any camera (Binance, KOHO, Wise, OKX, Grab): one picture, one line, one button. Already `onboarding.md` § 5.
- The face in an **oval** on a dark camera, with a stroke that changes colour and **one short prompt at a time** (Wise, Grab, DoorDash, Walmart, Binance).
- **Review before submit** for the document, with a retake per side (Wise, Binance, OKX, KOHO).
- **Retry shows hers beside the ideal** with one line (Wise, Tinder, POF).
- An explicit consent for biometric data before the face step (every flow) — the form varies, the step does not.
- Three outcomes after the scan: retry · fail-to-a-human · pending (DoorDash fully; Wise, KOHO, OKX partly).

**Choice (one app — borrow with a reason, or not):**

- Grab's do/don't **as two faces** and OKX's three small faces: borrowed — it is P1's *an instruction a picture can show is a picture*, and it is how ask 3 drops the logo box.
- OKX's *Good example / Cropped / Glare / Blurry* before the card: borrowed into `document` tips as a pictogram row — the reasons for failure shown once, as pictures, beat a bullet list.
- Wise's consent as **two verbs** (*Yes, check automatically / No, check manually*): borrowed as the shape (a real way to say no), not the manual-review path unless the stakeholder confirms one.
- Wise's *We'll compare it to the photo in your ID* as the one *why*: borrowed verbatim in spirit (P5).
- DoorDash's four-row retry checklist, KOHO's *Why we need this ⓘ*, Hinge's *to decline, exit the app*, Noom's generic error, Grab's *OK* time-out: not borrowed.
- KOHO's camera permission asked at the camera: already the system's rule; cited as evidence that a shipped KYC does it.

## What Mobbin could not show

- No **Aadhaar / DigiLocker** flow, no Indian KYC; the document shapes are passports and licences.
- No flow in an **Indic script** or at a large font size; no spoken guidance anywhere.
- No **match result** shown to the user as *matched / not matched* — every app reports a generic pass/fail; *not you* as a reason is ours to word.
- No **generated-image preview** (surface 42).
- Liveness prompts captured are *Move closer · Hold steady · Hold still · Move your head up and down*; no blink or smile prompt was captured, though Binance's intro implies recording.
- Android camera UI and the Android camera-permission dialog: not on Mobbin.
