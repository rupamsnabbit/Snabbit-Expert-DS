# Reference read — *Expert App 2.0* → page **🏋️‍♀️TC Less training** (part A: Onboarding · 2.Training WIP · 3.GO LIVE · For Diya · loose frames)

Read for project `contactless-gl` on 2026-11-04. Read-only; nothing in Figma was touched. Part B (TRAINING - PRE GOLIVE v2, KNOWLEDGE CHECK, POST TRAINING - APP, App Education, everything below y = 0) is another agent's read.

## Source table

| | |
| --- | --- |
| File | *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM`, page **🏋️‍♀️TC Less training** `29584:61907` |
| Sections read | `29598:88461` **Onboarding** (33 phone frames of 38 children; 5 small helper frames/text skipped) · `29585:62048` **2.Training WIP** (51 of 76 children at phone size; the rest are overlays, labels and loose groups) · `29585:84916` **3.GO LIVE** (47 of 48 children; 1 label group) · `30716:120292` **For Diya** → its one child, section `30541:112228` **FINAL (Without Assets)** (66 phone frames) |
| Loose frames (x 6276–11191, y −46748…−43047) | 14 frames, each screenshotted at native size: `29598:100518` · `29591:85823` Finished · `29591:86552` Finished · `29606:102478` · `29591:86748` · `29591:87593` · `29606:101989` · `29606:102303` · `29606:102016` · `29606:102043` · `29606:102070` · `29606:102133` · `29606:102178` · `29598:101727` |
| Frames read | **211 crops** in `crops/` (33 onb · 51 wip · 47 gl · 66 diya · 14 loose). Section renders: `section-onboarding.png` (7700 px), `section-training-wip.png`, `section-golive.png`, `section-for-diya.png` (8000 px each) |
| Method | `get_metadata` on each section (all four results exceeded the tool limit and were saved to disk; parsed with Python for depth-1 frames, positions and text-node names) → `get_screenshot` on the section → PIL crops by frame position → read from contact sheets. Text-node names are partial (instance children are not listed), so strings below come from the crops first, metadata second |
| Figma failures | Figma MCP rate limit (*tool call limit for your Full seat*) hit on the first and second attempt for the 2.Training WIP render and six loose frames; a third attempt ~10 minutes later succeeded. Nothing is missing. No `get_design_context` used |
| Shipped vs proposed | **Nothing on this page is marked shipped.** Section names say so: *2.Training WIP*, *FINAL (Without Assets)*. Frames named *Finished* inside WIP are the designer's done-marks, not release marks. Frames named *Snabbit Cancelled* are rendered dimmed on the canvas (greyed out) — read as dropped iterations. The *Device Testing* group in GO LIVE is also dimmed. `references/SCREENS.md` governs what ships; this page is **proposed-intent evidence only** |
| What is skipped | Everything below y = 0 (part B); the ops-side frames inside GO LIVE that show the *trainer's* phone (`29585:76936`, `29585:77132`, `29585:77210` — *Take expert photo*, *Enter OTP shared by expert to start BMI check*, *Actual / Enhanced*) are read for the handshake only, since the agent tool is out of scope (SCOPE.md open question 1) |
| Read by | agent read for Rupam Banik, 2026-11-04 |

## Step 1 — what is there

Header shell throughout the Registration frames: **back ‹ · "Registration" title · thin pink progress strip (one segment, ~¼ filled) · voice bar (play ▶ · scrubber · speaker)**; some frames add a **language switcher (translate glyph + caret)** at top right; the Help/Call appears as a **"Call support"** outlined button *under* the primary, not in the header. Training frames use **back ‹ · "Training" · language switcher**, no Call. TC-day frames use **back ‹ · "Call Trainer"** pill top right.

### 1A. Onboarding (section `29598:88461`) — registration up to the training booking

| # | Frame | Screen | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1–2 | `29598:88462` · `88493` | Language | *"Welcome to Snabbit"* · *"Become an Expert"* · *"Choose your language"* + speaker · *"English / English"* · *"हिन्दी / Hindi"* · *"मराठी / Marati"* (sic) · *"ಕನ್ನಡ / Kannada"* · **"Continue"** (disabled → enabled on pick) | pink hero with the real expert photo · title with Listen · 4 radio rows · primary. **Four languages, no Telugu** |
| 3–4 | `88524` · `88552` | Phone | *"Enter your mobile number"* + speaker · *"+91"* field · *"8606653178"* · *"We'll send an OTP to verify your number"* · **"Continue"** | hero · title + Listen · TextField · helper · primary |
| 5–7 | `88580` · `88608` · `88636` | OTP | *"Enter OTP"* + speaker · 4 boxes · *"Resend OTP in 29s"* · *"Didn't receive? Resend OTP"* · **"Verify OTP"** → **"Verifying OTP"** with spinner | 4-digit boxes (not 6) · countdown · in-flight button keeps its label |
| 8 | `88664` | Registration home | *"Let's get started with your registration"* · *"STEP 1 Registration"* card with **"Start ›"** · four locked rows all reading *"STEP 2 ID Verification"* (placeholder copy) | header with language switcher · voice bar · Stepper-like card list, one unlocked |
| 9–11 | `88709` · `88737` · `88765` | Name | *"Tell us your full name"* · *"Radhika Sharma"* · *"Your name will be verified with your Aadhaar"* · *"Have a referral code? (optional)"* (as link, then as field *"000 000"*) · **"18+ Confirm you are 18 before proceeding"** yellow banner · **"Continue"** | title · TextField · helper · referral link/field · age Banner · primary |
| 12–14 | `88802` · `88822` · `88949` | Gender | *"Select your gender"* · *"Female"* / *"Male"* with character avatars · **"Continue"** | two radio cards with avatar · OS keyboard still open underneath (artefact) |
| 15–18 | `88969` · `88989` · `89009` · `89029` | Work | *"Choose the work you're interested in"* · *"House Help — Cleaning, mopping, laundry, and other house work"* · *"Home Cook — Cooking, meal preparation, and cleaning utensils"* · Tag *"Only for females"* on a greyed House Help (for a male expert) · **"Continue"** | two radio cards with illustration at right · the gender-gating is a disabled card + Tag |
| 19, 29–31 | `89106` · `90244` · `90315` · `90387` | Training centre | *"Select training center location and date"* · *"Training center · Koramangala · Change"* · *"Choose a date to visit"* · *"7 Feb Tomorrow · 9 Tuesday · 10 Wednesday"* · *"Show more dates ⌄"* · *"Recommended center"* · *"Other training centers near you"* · *"BTM layout"* · *"Indiranagar"* · *"Landmark · BTM Metro Station"* + speaker · *"MAPS"* tile · *"Show more training centers"* · map sheet *"Move pin to the exact location"* · *"Search area"* · *"278, 5th Cross Road, 10th Main Road, 8th Block, Koramangala 560095…"* · **"Confirm location"** · **"Continue"** · **"Call support"** | centre card with 3 photos, radio, MAPS tile, landmark row with Listen · date radio rows · **Call support** as a second outlined button under the primary |
| 20–22 | `89134` · `89154` · `89174` | Shift type | *"Pick a shift that suits you"* · *"Full Time · 10 to 12 hours daily"* · *"Part Time · 4 to 6 hours daily"* with clock illustration · **"Continue"** | two radio cards |
| 23, 27 | `89194` · `89399` | City | *"Choose your preferred city"* · *"Bangalore · Mumbai · Delhi NCR · Chennai · Pune"* · *"We have selected your city as **Bangalore**"* over an isometric city map · *"Change Work City?"* · **"Continue"** | radio list · auto-detected city hero with a text link to change |
| 24 | `89285` | Location permission | *"Share precise location to go online"* behind the **OS dialog** *"Allow Snabbit to access this device's location? · Precise · Allow · Only this time · Don't allow"* · *"Dismiss"* | the raw OS dialog drawn on the canvas, green Android system style; no app sheet before it |
| 25–26, 33 | `89328` · `89362` · `90758` | Work areas | *"Select 3 work areas"* / *"Select your work area"* · *"Your can change this later at the training center"* (sic) · *"Your current location · 4th block, Koramangala · Change"* · *"Search a location"* · rows *"Koramangala · 1.2 km · Landmark HDFC Bank"* + speaker, *"Sony Signal"*, *"HSR Layout"*, *"ST Bed Layout"*, *"Madiwala"*, *"Wipro Signal"* · Tag *"Tag Title"* (unfilled) · numbered badge *"1"* on the picked row · *"Show more areas ⌄"* · **"Continue"** · **"Call support"** | current-location card · search · multi-pick rows with distance, landmark, Listen · ordered selection (1, 2, 3) |
| 28 | `89431` | Training intro | *"Complete 2-day training program and become an Expert"* with a 5-picture collage (tablet, classroom, bathroom, kitchen, desk) · **"Continue"** | full-bleed illustration + one line + primary |
| 32 | `90422` Finished | Training confirmed (home) | *"Training Confirmed ✓"* · *"Your Timings · Change"* · *"Day 1 - 7 Feb, Friday · 10:00 AM - 5:00 PM"* · *"Day 2 - 8 Feb, Saturday"* · *"Training Centre Details · Change"* · *"Koramangala Training Center · HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru"* · *"Landmark BTM Metro Station"* · tiles **Map · Call · Share** · *"Training Videos"* carousel *"How to become a Snabbit Expert"* · *"Introduction to Snabbit"* · *"Refer your friend, earn ₹5,000 · Refer now"* · *"Finish your registration · All steps unlocked! Complete them in any order."* · rows *"Completed Registration · Step 2 ID Verification · Step 3 Work Experience · Step 4 Bank Details · Step 5 Insurance Details"* · **"Start Training"** (disabled) · **"Call Trainer"** | the TC home: timings timeline · centre card · video carousel · refer banner · five-step Stepper · sticky primary + outlined Call |

### 1B. 2.Training WIP (section `29585:62048`) — the two-day *training-centre* (TC) day cycle, not in-app training

Despite the page name, this section is the **TC** flow: check in at the centre with a selfie and a trainer OTP, check out with another OTP, mark Day 2 attendance, reschedule a missed day, verification states, pass.

| # | Frame(s) | Screen | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1 | `66895` Finished · `67253` · `67607` · `65646` | TC home states | *"Training Confirmed ✓"* → *"Day 1 Training Tomorrow"* → *"Day 1 Training"* · *"Reach by 9:45 AM"* (pink) · *"Reach training centre in **54:23**"* (pill countdown) · same centre card, *"Nearest Metro BTM Layout · Nearest Bus stop Silk board"* · *"Training Videos"* · refer banner · **"Start Training"** (disabled until on the day) · **"Call Trainer"** | header: language switcher only, voice bar · title · timings timeline (Stepper-like, two nodes) · centre card · carousel |
| 2 | `69914` Landing screen (and `76857` in GO LIVE) | **Expert ID + trainer OTP** | *"Share Expert ID and OTP with Trainer"* · *"Your Expert ID · #AB12456"* · *"Trainer OTP · 5 4 2"* · *"Valid for today's training session"* | two outlined cards: ID in a pink-label card; three large digits; validity line. **No countdown, no refresh.** This is the only "rotating code" in the file |
| 3 | `69903` · `69882` | Updating | *"Your personal details are being updated!"* (ring spinner) → *"Personal details updated! Login to start Training."* · **"Login"** | full-screen loader → success with a check |
| 4 | `62912` · `62867` · `62970` · `62940` · `62886` Overlay (all *Snabbit Cancelled*, dimmed) | Selfie login | *"Take a selfie to Login"* sheet with the model photo · *"Correct way to take selfie"* ✓ · **"Understood"** · camera *"Take a selfie · Please ensure you are wearing the uniform."* with a dashed head-and-shoulders outline · shutter · preview **"Retake" / "Submit"** · fail sheet *"Selfie not captured Please try again."* ⚠ **"Retake Photo"** | intro sheet · camera with silhouette overlay (`62886` is the overlay asset) · review · fail |
| 5 | `62759` · `62998` · `63048` · `62813` · `63023` · `63073` (*Snabbit Cancelled*) | Check-in OTP (dimmed) | *"Enter OTP"* · 3 boxes · *"Please ask your trainer to share the OTP with you"* · **"Verify OTP"** / **"Submit"** → **"Verifying"** | sheet over the camera |
| 6 | `62064` · `63105` · `63355` · `64076` · `64600` · `65124` · `69469` | Day 1 in progress / logout | *"Day 1 Training in Progress"* with a pink calendar icon · timeline *"Day 1 - 7 Feb, Friday · In Progress"* · confetti sheet *"Log in Successful"* ✓ **"Get Started"** · **"Logout"** · *"Enter logout OTP"* 3 boxes → **"Verify OTP"** → **"Verifying"** | the day card · OTP sheet for both check-in and check-out |
| 7 | `62472` · `63605` · `70003` · `69964` | Day 1 done, Day 2 attendance | *"Log out Successful"* ✓ · *"Day 1 completed on 7 Feb"* green pill · *"Please confirm your attendance for Day 2"* · **"Absent"** (red) / **"Present"** (green) side by side · *"Wednesday · Edit · 9:45 AM"* · *"Mark Day 2 as Absent?"* sheet **"Mark absent"** (red) / **"Cancel"** · *"Select new date for Day 2 training"* **"Confirm" / "Cancel"** | confetti · red/green pair · confirm sheet |
| 8 | `68485` · `68810` · `67963` · `68224` · `64332` · `64856` · `65380` | Day 2 states | *"Day 2 Training Tomorrow"* · *"Day 2 Training today"* with *"54:23"* · *"Day 2 Training in Progress"* · *"Completed"* / *"In Progress"* tags · **"Start Day 2 Training"** · **"Logout"** | same shell |
| 9 | `69139` · `70353` · `64008` · `63938` | Missed / rescheduled | *"Missed Day 2 Training. Pick a new date."* ⚠ (orange) · *"AVAILABLE DATES · Tomorrow 9 Feb · 10 Feb · 11 Feb"* · **"Submit"** · timeline *"8 Feb, Saturday · Missed"* (orange) · *"Rescheduled"* · *"Day 2 - 11 Feb, Saturday"* · *"Day 2 Training Confirmed"* | orange = missed, not red; date chips inline above the timeline |
| 10 | `66036` · `66007` | Late / not at centre | *"Reach before 12 pm to attend your training"* ⚠ · *"Reach before 12:00 PM"* · **"Start Training"** · sheet *"You are not at the Training Center · You need to be present at the Training Center to get started"* **"Okay"** (dark) | geofence gate as a sheet |
| 11 | `66356` · `66398` · `66516` | Verification | *"Background verification failed"* ✕ · *"Trainer Approval Pending"* · *"Verification in progress"* — all three with the same body *"Based on the details provided, you currently don't meet our onboarding criteria. · You can apply again in 1 month."* (placeholder copied into the two non-failure states) · **"Proceed for Go Live"** (disabled) · **"Call Trainer"** pill in header | EmptyState with a document-and-magnifier illustration (reward-style badge) |
| 12 | `66561` · `66622` | Change date / centre | *"Change your visit date"* · *"Koramangala Training Center · 7 Feb, 9.00 AM · Change"* · **"Change date"** · *"Change your training center · Nearby training centres"* · *"Sony Signal · 1.2 km from your location"* … · **"Change training center"** | radio lists |
| 13 | `66663` · `66702` Landing screen | Pass | *"CONGRATULATIONS!"* · *"You have successfully passed your Training!"* · trophy illustration (metallic 3D trophy, flat character) · **"Continue"** (dark) · variant over a *"Log out Successful"* sheet | celebration |

### 1C. 3.GO LIVE (section `29585:84916`) — go-live at the Hub with a trainer

| # | Frame(s) | Screen | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1 | `73177` | Pass (repeat) | *"CONGRATULATIONS! You have successfully passed your Training!"* **"Continue"** | as 1B-13 |
| 2 | `73567` · `73610` | Joining date | *"Select date of joining"* · *"8 Feb Tomorrow · 9 Tuesday · 10 Wednesday"* · *"Show more dates ⌄"* · **"Continue"** | header: language switcher + voice bar, no title · radio date rows |
| 3 | `73653` … `75149` (14 frames, group *Device Testing*, **dimmed**) | Device testing | *"Device testing"* · rows **Camera · Location · Speaker · Vibration** each expanding: *"Testing front camera…"* → *"Camera test passed!"* ✓ / *"Camera test failed"* ✕ **"Retry"** · *"Are you nearby?"* with a map and the address, **"No" / "Yes"** → *"Location successfully tested!"* · *"Click play to start" **"Play"*** → *"Can you hear the audio?" **"No" / "Yes"*** → *"Speaker test passed!"* · *"Count number of vibrations" **"Play"*** → *"How many times did it vibrate? 1 2 3 4"* · **"Proceed"** | an Accordion-like checklist, one row open at a time, each with its own mini-test. Dimmed on canvas = parked |
| 4 | `75231` · `75315` | Kit | *"Your kit is ready"* · *"We have pre-selected your uniform size based on your measurements"* · *"T-shirt · Size: Medium · − 2 +"* · *"Not your size? · Change size"* · *"Select your size · S M L XL XXL"* · *"Pant · Size: 32"* · **"Continue"** | two product cards with image, size, stepper, change-size link; size chips |
| 5 | `75861` · `75896` | Region | *"Select region"* + speaker · *"Mumbai · Thane"* · **"Continue"** | radio list |
| 6 | `75931` · `76068` · `76203` · `76423` · `76588` · `73143` | Shift & location | *"Select your shift & location"* · dropdowns *"Work Area · Koramangala, Indiranagar, BTM Layout"* / *"Micromarket · Koramangala"* · *"Shift time · Morning / 09:00 AM"* · *"Shift type · Full-time"* · cards *"Wipro Park · Earn upto ₹22,000 · Koramangala · 8 AM to 2 PM · 6 hrs"* / *"8 hours"* · *"Owner's Court"* · *"ST Bed Layout"* · **"Proceed"** · sheets: *"Pick a shift that suits you · Full Time 10 to 12 hours daily · Part Time 4 to 6 hours daily"* **"Confirm"** · *"Select preferred work areas"* (search + numbered rows) **"Confirm"** · *"Select your shift start time · Morning 06:00 AM to 10:00 AM · Afternoon 10:00 AM to 03:00 PM · Evening 03:00 PM to 05:00 PM"* with sun/moon icons **"Confirm"** · `73143` repeats *"Select 3 work areas"* | three dropdown filters over a card list; each dropdown opens a radio sheet; the pay figure is green at right |
| 7 | `75761` · `76751` | Sunday hours | *"Earn more on Sunday"* · *"6 hours · Current shift hours"* (blue pill) · *"8 hours · 🪙 Earn ₹1,000 extra"* · *"10 hours · 🪙🪙 Earn ₹3,000 extra"* · *"12 hours · 🪙🪙🪙 Earn ₹5,000 extra"* · expanded *"Select shift start time · 08:00 AM · 09:00 AM · 10:00 AM"* · *"Your Monday - Saturday shift · Shift duration · Shift time 8 AM to 2 PM"* · **"Continue"** | radio rows with coin-emoji pills; inline time chips |
| 8 | `75404` · `75581` · `75508` · `77239` | Confirm shift | *"Confirm your shift timings"* · *"Wipro Park, 2nd Block Kormangala"* pin card · blue band *"Monday to Saturday · 10:00 AM to 8:00 PM · Start time - End time · 10 hours · Working hours"* · yellow band *"Sunday · 07:00 AM to 07:00 PM · 12 hours"* · *"Estimated Monthly Earnings ₹35,000"* · *"Joining Bonus +₹1,000"* (green) · **"Continue"** · sheet *"Confirm your shift timings? · These cannot be changed going forward"* **"Confirm" / "Go back"** · `77239` carries the selfie intro sheet on top (see 10) | summary bands (blue = weekday, yellow = Sunday) · earnings rows · irreversible-confirm sheet |
| 9 | `75665` · `75508` | Hotspot | *"Your hotspot location"* · *"Your Cluster · Powai"* · 4 photos *"+4"* · *"R-City Mall"* · full address · *"MAPS"* tile · **"Proceed"** | photo strip + address + map tile |
| 10 | `75725` | Terms | *"Term and conditions"* · *"Please read and understand"* · full legal text wall (*"These terms and conditions ("Terms") govern the use of services made available on or through snabbit.com…"*) · **"Decline" / "Accept"** side by side | text wall + two buttons in a row |
| 11 | `77239` · `77448` · `77463` · `77482` · `77160` · `77179` (4 of these *Snabbit Cancelled*, dimmed) | Selfie in uniform (expert side) | sheet *"Please take a selfie in your Snabbit uniform · This will be your ID card picture"* + speaker, illustration of the expert holding a phone, **"Take selfie"** (blue) · camera *"Take a selfie · Please ensure you are wearing the uniform."* dashed head outline · **"Retake" / "Submit"** · fail *"⚠ Your uniform is not visible"* with the model photo and *"✓ Correct way to take selfie"* **"Retake Photo"** | the shipped selfie flow, blue buttons = OG app styling |
| 12 | `76857` Landing screen | Expert ID + OTP | identical to 1B-2 | — |
| 13 | `76927` · `76907` · `77513` · `77522` | Photo processing | *"Your image is being updated!"* ring → *"Image updated!"* ✓ (green header tint) · *"Image is being enhanced!"* → *"Image updated!"* | full-screen loader → success; the "enhanced" pair sits on the trainer's side |
| 14 | `76936` · `77132` · `77210` (trainer's phone, out of scope) | Trainer side | *"Take clear image of expert in Snabbit uniform · This will be their ID card picture"* · *"Take expert photo · Please ensure they are wearing the uniform."* · *"Enter OTP shared by expert to start BMI check"* 4 boxes **"Next"** · compare *"Actual / Enhanced ✦"* **"Retake" / "Submit"** | **BMI check starts with her OTP typed by the trainer**; the enhanced (AI) photo is reviewed by the trainer, not by her |
| 15 | `73206` Before 12 AM | First Home | *"Congratulations · YOU ARE NOW A Snabbit Expert"* confetti overlay **"Get started"** over Home: *"Welcome to Snabbit! · Earn upto ₹800 on your first day"* with presenter video *"Hear from other Experts 2:42"* · *"Your Shift 7:00 AM - 12:00 PM"* · *"Mark attendance for tomorrow · Mark Absent / Mark Present"* · *"Reach hotspot by 6:30 AM · Jyoti Nivas College Gate · 3.2 km away · Show me the way"* · *"Need help? Call them anytime · Komal Rani Buddy · Anjali Sharma Team Leader · Ramesh Kumar CLM · Call"* · *"Benefits of joining Snabbit"* · tabs *"Work · Earnings · Inbox · Menu"* · *"₹0"* | the pre-shift Home already read in `patterns/onboarding.md` § 8 and `references/beauty-expert-master-go-live/` #18 |

### 1D. For Diya → FINAL (Without Assets) (`30541:112228`) — in-app training, the most recent thinking

Header: **back ‹ · "Training" · language switcher**; module header *"Knowledge check · Intro to Snabbit"* with a 3-segment strip; assessment header *"Benefits and about assessment · Question 01 of 15"* with a continuous bar. A **Saathi mascot** (flat cartoon girl in uniform, winking, pointing) speaks in a white speech bubble on most frames. The section also contains **grey placeholder boxes** for every missing asset — hence *Without Assets*.

| # | Frame(s) | Screen | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1 | `38103` · `38121` | Entry (reused) | *"Pick a shift that suits you"* · *"Select 3 work areas"* with **"Submit and Start Training"** · **"Call support"** | the registration screens re-pointed at training: the last registration step's primary becomes *Submit and Start Training* |
| 2 | `38156` · `39448` · `39479` | Loading / splash | pink stairs/bars motif empty · mascot in a circle (two sizes) — no text | three stages of a splash/transition |
| 3 | `39411` · `117060` | Welcome | *"Welcome to Snabbit Training"* · *"Let's become a **5★** Expert together."* (5★ as a gold pill) · variant: a full-bleed glossy 3D *"Welcome to Snabbit TRAINING"* poster with a jumping cartoon girl | mascot hero + one line; the poster variant is a different style altogether |
| 4 | `45144` | Trainer intro | *"Snabbit Trainer"* · *"We will teach you everything step by step"* · bubble *"Hey I am your Saathi, I'll help you with your training process"* | mascot + bubble + title + line |
| 5 | `38091` · `87593` (loose) · `101727` (loose) | Intro video | full-bleed video still of a real expert holding a phone, *"Introduction to Snabbit"* · **"Continue"** (dark) / no button | HowToClip-player-like full screen |
| 6 | `39202` · `37845` · `38687` · `38996` · `116381` · `116170` · `116451` · `116662` · `117134` | Training home, 0/40 | *"Lessons · 0 / 40"* progress card with *"Play video"* link · bubble *"Hey let's start with your training videos"* · module accordions *"About Snabbit"* (open) → rows *"Intro to Snabbit · Seva services · Loans, early payouts, insurance · Knowledge check 🔒"* · *"Payouts and rate card 🔒 · How to use the app and map 🔒 · Grooming and delight 🔒 · Technical skills 🔒"* · bubbles *"Lets start with the first video"* · *"Tap on it"* · *"Let's see how you can perform"* (on Knowledge check once the three lessons are ticked) | progress card (bar + count) · Accordion of modules · lesson rows with a ring icon (progress ring around the lesson icon), check when done, lock when locked · mascot coachmark bubbles |
| 7 | `73739` · `118234` · `74035` · `74543` · `118373` · `118568` · `119513` | Training home, 21/40 | *"Lessons · 21 / 40"* · *"How to use the app and map"* open → *"Login flow video · Change attendance · Logout and emergency logout · Lunch screen · Profile page · Referral · Job flow · Map flow · Assessment 🔒"* · bubble *"Lets start with the app paractice"* (sic; `119513` corrected to *"practice"*) | same, mid-course |
| 8 | `37800` · `45726` · `37815` · `74772` · `75689` · `47613` · `37829` | Lesson video | header *"Training · Currently playing : Loans"* · 3-segment strip · real-photo stills (expert watering a plant; sweeping with pink dashed arrows) · play ▶ · end card: bubble *"Start your first assessment now"* · **"Knowledge Check"** · **"Rewatch module"** · later variant **"Try it yourself"** / **"Rewatch module"** with bubble *"Try to login yourself once, I'll help you"* | full-bleed video · segmented progress per lesson · end-of-module sheet with two actions |
| 9 | `37342` · `37444` · `37478` · `37375` · `37409` · `37308` · `37513` · `115845` (*Currently employed full time* frames) | Knowledge check Q1 | *"Why did you join Snabbit?"* · four picture cards *"Earn Money · Watch TV · Shopping · Gaming"* (illustrations; wrong ones go greyscale after a pick) · mascot pointing at the picked card · **"Continue"** (disabled → enabled) · "you" greyed in the title (word-by-word read-aloud highlight) | 2×2 image radio grid · title words highlighted as spoken |
| 10 | `119087` · `119188` | Q1 result | wrong: bubble *"Lets watch the videos again try again"* · *"Oops, that's not correct"* (pink dot) · **"Rewatch Videos"** · right: bubble *"Congrats, You have understood the assignment"* · *"Let's Gooo…"* (green dot) · **"Next"** | bottom sheet tinted pink (wrong) / green (right) with the mascot sad / happy |
| 11 | `46497` · `115892` | Q2 | *"Which two benefits does Snabbit offer?"* · *"Insurance ✓ · Free car · Early payout ✓ · Gifts"* (grey image placeholders, checkboxes) · **"Submit"** | 2×2 multi-select |
| 12 | `46588` · `47198` · `47416` | Module complete | *"✓ Completed"* pill over confetti (grey placeholder) · five ring nodes (1 ticked, 2 unlocking, 3 locked) · *"Up next : Module 2 · Payout's and rate card"* · **"Go to Module 2"** | celebration placeholder · module Stepper as rings · next-up card |
| 13 | `78301` · `78239` · `78465` · `78718` · `78869` · `78881` · `78891` · `112043` · `112159` · `120026` · `119778` · `120096` · `119869` | **App practice: login** | Home mock (*"Tuesday, 7 February · 7:00 AM - 12:00 PM · ✓ Present · Change · Button"*, *"Your Hotspot · Jyoti Nivas College Gate · 3.2 km away · Map"*, *"Refer and earn upto ₹4000"*, tabs *"Home · Earnings · Refer · Profile"*) with bubbles *"On a brand new day🕷️ you will see a login button"* · *"Lets login to start working"* **"Login"** · *"Login by 6:50 AM"* · *"Tap on it to start taking selfie"* · camera *"Take a selfie · Please ensure you are wearing the uniform."* bubbles *"Tap here to click your selfie"* · *"Smileeeee 😂😂😂😂……"* · *"Submit your selfie now"* **"Retake" / "Submit"** · *"Login successful"* ✓ (green tint) → result sheet *"Congrats, You have understood the assignment · Let's Gooo…"* **"Next : Change attendance"** | a guided replica of the real Home and selfie check-in with the mascot bubble as Coachmark; the emoji in bubbles are placeholder copy |
| 14 | `114722` · `36863` · `72358` · `72795` · `73229` | Assessment | *"Have you cut vegetables before?"* / *"Does Snabbit provide handwash service to our customers"* · *"Benefits and about assessment · Question 01 of 15"* · illustration in a pink oval (expert cutting vegetables) · **✕** (red) / **✓** (green) side by side, each with pressed/ghost states · mascot | yes/no as two big colour buttons |
| 15 | `115198` | Assessment, image pick | *"Select the correct image from options"* · two grey image cards both labelled *"Earn Money"* · **"Continue"** | image radio pair |

### 1E. Loose frames (x 6276–11191, y −46748…−43047)

| # | Frame | Screen | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| L1 | `29591:85823` Finished | Training tracker (TC-less home draft) | *"Start Training"* · three grey tiles · *"0/30 Completed"* · *"Go live Centre Details · Change"* · Koramangala centre card (photos, address, landmark + Listen, Map · Call · Share) · *"Finish your registration · All steps unlocked! Complete them in any order."* · five step rows · **"Start Training"** (disabled) · **"Call Trainer"** | the TC home with the timings block replaced by a lesson tile row and a count; "Go live Centre" replaces "Training Centre" |
| L2 | `29591:86552` Finished | Lesson grid | pink *"Start Training"* band with three tiles · *"Kitchen cleaning (4/10)"* · *"Bathroom cleaning (4/10)"* · *"App Training"* each a row of grey tiles | course as a tile grid by topic |
| L3 | `29591:86748` | Training intro | *"Complete the training program and become an Expert"* collage · **"Start Training"** | as 1A-28 with the "2-day" removed |
| L4 | `29591:87593` · `29598:101727` | Intro video | *"Introduction to Snabbit"* · **"Continue"** / none | as 1D-5 |
| L5 | `29598:100518` | Work areas | *"Select 3 work areas"* (as 1A-25) **"Continue"** · **"Call support"** | — |
| L6 | `29606:101989` · `102016` · `102043` · `102070` | Sweeping steps | *"Start from the Farthest Corner"* · *"Sweep into One Pile"* · *"Clean Every Corner"* · *"Finish the Job"* — each over a full-bleed photo with a pink dashed arrow, a grey circle (step number placeholder) and the **same** caption on all four: *"Move small objects like toys, slippers, and buckets out of the way before you begin."* | one picture, one title, one caption per step; the caption is a placeholder repeated |
| L7 | `29606:102133` · `102178` · `102303` | Clip player end cards | *"How to broom the house?"* · **"Next video" / "Replay"** · **"Replay" / "Talk to trainer"** with an up-next thumbnail *"HOW TO MOP THE FLOOR · 5 EASY STEPS"* and *"Next"* · player with ⟲15 ▶ ⟳15 and scrubber *"00:12 / 00:32"* | HowToClip player chrome: title top-left, centre controls, scrubber, end-card actions |
| L8 | `29606:102478` | Training road | *"Sweeping · 1/4"* · *"Moping"* (sic) · *"Behavioral Training"* · a fourth blank — grey tiles joined by a winding road | a map-as-progress draft |

## Step 2 — what it is trying to do

**Onboarding (1A).** A phone-first registration that asks one thing per screen with a voice bar on every screen, then books her into a two-day training centre: language → phone → OTP → a step list → name (+18 banner, referral) → gender → work type → shift type → city → location permission → three work areas (ordered) → "2-day training" intro → centre → date → map pin → the TC home with the five remaining steps unlocked in any order. It is the TC branch of `patterns/onboarding.md` drawn in the Expert App 2.0 style; it is where the **work-area pick with landmark + distance + Listen**, the **numbered multi-select**, and the **Call support button under the primary** come from.

**2.Training WIP (1B).** The two training days as a job cycle: check in by selfie + trainer OTP, check out by OTP, confirm tomorrow's attendance, reschedule a missed day, wait for BGV/trainer approval, pass. The important thing it carries for this project is the **Expert ID + trainer OTP card** (*#AB12456 · 5 4 2 · Valid for today's training session*) — the handshake the PRD § 3.11 reuses at the Hub — and the pattern of **a day card with a timeline + a countdown pill + a centre card**, which is the Hub-visit card.

**3.GO LIVE (1C).** Go-live at the Hub with a trainer present: joining date → (parked) device tests → kit sizes → region → shift & location with three dropdown filters → Sunday hours → confirm (irreversible) → hotspot → terms → selfie in uniform → ID + OTP → photo updated → first Home. The trainer's phone takes the ID photo, starts the BMI check with her OTP, and reviews an *Actual / Enhanced* pair. This is the flow the PRD removes the trainer from.

**For Diya (1D) and the loose frames (1E).** In-app training with a mascot ("Saathi") who talks in bubbles: welcome → trainer intro → intro video → a training home of modules (Accordion) with lessons (rings) and a 0/40 progress card → full-bleed lesson videos → a picture-card knowledge check per module with sad/happy result sheets → a module-complete ring Stepper → an **app-practice** module that replays the real Home and selfie check-in with coachmark bubbles → a 15-question assessment with big ✕ / ✓ buttons. The loose frames are earlier drafts of the same: a tile grid by topic, a winding road, photo-step cards for sweeping, and HowToClip end cards (*Next video · Replay · Talk to trainer*).

## Step 3 — against the expert

| Symptom | Where | Principle / spec it breaks |
| --- | --- | --- |
| Every primary is *Continue · Proceed · Submit · Confirm · Okay · Next · Get Started · Understood* | 1A all, 1B, 1C, 1D | `content.md` § 3 / § 9 banned list; P2 — the button must say the outcome |
| *"Oops, that's not correct"*, *"Smileeeee 😂😂😂😂"*, *"Let's Gooo…"*, *"On a brand new day🕷️"* | 1D-10, 1D-13 | `content.md` § 9 (*Oops* banned; emoji as content) · P6 misses handled with dignity, no exclamation spam |
| *"Absent"* red / *"Present"* green side by side; *"Decline" / "Accept"* in a row; *"No" / "Yes"*; ✕ / ✓ in a row | 1B-7, 1C-10, 1C-3, 1D-14 | P3 — two outcomes mirrored beside each other is the mis-tap; red/green are status colours (checklist row 14) |
| The OS location dialog drawn as the screen, in English, with *Don't allow* one tap away and no app sheet before it | 1A-24 | `patterns/permissions.md` (sheet first, why in one sentence); SCOPE.md *Design problem 1* — this is exactly the problem the project names |
| *"Call support"* as a second full-width outlined button under the primary on every list screen | 1A-19, 25; 1D-1 | P2 one primary; `patterns/onboarding.md` puts Help in the header (open question 6 answered: header satisfies it) |
| Progress strip is one segment, ~¼ filled, never a count; Training home shows *0 / 40 Lessons* as a number only | 1A, 1D-6 | P5 progress as a shape **and** a number; ProgressBar `segmented` with a count |
| Coin-emoji pills *"🪙 Earn ₹1,000 extra"*; a glossy 3D *Welcome to Snabbit TRAINING* poster; a gold trophy for passing | 1C-7, 1D-3, 1B-13 | `assets.md` — rewards are registered assets, never emoji; informational scenes are flat, metallic only for rewards (the trophy may qualify as a reward asset; the poster does not) |
| Terms as a legal wall | 1C-10 | P1, P9; `beauty-expert-master-go-live/` already translates this to five plain rows + **I agree** |
| Same caption on four sweeping steps (*"Move small objects…"*) and the same failure body on *Trainer Approval Pending* / *Verification in progress* | 1E-L6, 1B-11 | P5 honest states — placeholder copy shipped as the state would lie; `error-recovery.md` one state, one line |
| Step rows all read *"STEP 2 ID Verification"*; Tag reads *"Tag Title"*; *"Marati"*, *"Your can change…"*, *"Moping"*, *"paractice"* | 1A-8, 1A-25, 1A-1, 1E-L8, 1D-7 | placeholders / typos — evidence this page is WIP, not shipped |
| Text wall on the Home mock (*"Mark attendance for tomorrow"*, three contacts, benefits, video) | 1C-15 | already departed from in `patterns/onboarding.md` § 8 |
| Kit stepper *− 2 +* for uniform quantity with no reason | 1C-4 | P1 — quantity she cannot change is not a control; surface 37 reads it as a Statement row |
| Three dropdown filters (*Work Area · Shift time · Shift type*) over a card list, each opening a sheet | 1C-6 | P3 one-handed, P1 reading; `SelectionCard rich · shift option` (shipped 2026-10-01) already shows area + hours + pay on the card without filters |
| Mascot bubbles carry the instruction in English prose (*"Try to login yourself once, I'll help you"*) on top of a screen that already shows it | 1D-6, 1D-13 | P1 one instruction line; the bubble duplicates the Coachmark role — the system has `Coachmark` and `VoicePrompt`; a bubble is a third voice |
| Device testing with *"How many times did it vibrate? 1 2 3 4"* | 1C-3 | P1/P3: a counting quiz on a phone she is holding; parked on the canvas already |

**What it does right and must be kept**

- One question per screen, Listen on every title, the voice bar on every screen (P4).
- The **work-area row**: name · distance · landmark · Listen, picked in order with a numbered badge — the display-name requirement in PRD § 3.6 (surface 11).
- The **Expert ID + OTP card** with a validity line — the whole handshake on one screen, numbers first (surface 35).
- The **training-day card**: title state (*Tomorrow / today / in Progress / Missed*), a timeline with tags, a **countdown pill** on the day, the centre card with Map · Call · Share — the Hub-visit card's anatomy (surface 34, 36).
- Missed state in **orange with a next step** (*Pick a new date*), not red (P6).
- In-flight buttons keep their label (*Verifying OTP*) (P5, row 6).
- Training home as **modules → lessons with a progress ring and a lock**; module-complete as rings; the *Up next* card (surfaces 26, 30).
- Knowledge check as **picture cards**, wrong answers greyscaled, the result as a tinted sheet with one action (*Rewatch Videos* / *Next*) (surface 27 — the fail shape).
- The **app-practice** module: training inside a replica of the real screen with a Coachmark — this is `patterns/first-run.md`'s tour used as a lesson.
- Photo-step cards: one picture, one title, one action per step (P1 *a step is a screen*) — the sweeping drafts are the right shape, with the caption removed.
- Lesson end cards *Next video · Replay · Talk to trainer* — the HowToClip `player` end state with Help in it (surface 29).
- The *Image updated!* full-screen success with a check and a tint (P5).

## Step 4 — tier and system map

Core names from `components/README.md`. "Composition of" = Tier 2; "no match — nearest" = Tier 3 candidate.

### Onboarding (1A)

| Region | Is |
| --- | --- |
| Header back · title · strip · voice bar · language switcher | HeaderNav `page` (Help HeaderAction + Language IconButton `translate`) · ProgressBar `segmented` `S` · VoicePrompt `bar` — the onboarding shell already in `patterns/onboarding.md` |
| Language rows, city rows, shift-type cards, gender cards | SelectionCard `compact` (language, city) · SelectionCard `rich` with illustration (shift type, gender, work type) |
| Phone field, name field, referral, search | TextField `phone` + NumericKeypad · TextField `text` · TextField in a collapsed row · TextField `search` |
| OTP boxes + resend timer | NumericKeypad `otp` + Timer `deadline` + Button `tertiary` **Resend code** |
| *18+ Confirm you are 18* banner | Banner `warning` (or a Checkbox row — the shipped one is a Banner with no control) |
| *Only for females* tag on a disabled card | SelectionCard `rich` `disabled` + Tag `info` |
| Registration step list (*STEP 1 … STEP 5*, *All steps unlocked*) | Stepper `unordered` (Home) / Stepper `list` |
| Work-area row: name · km · landmark · Listen · numbered badge | SelectionCard `rich` · **shift option form** (shipped 2026-10-01: hood + `map-pin` + trailing slot) with `multi` and an order Badge — the order badge is the only part not in the spec |
| Current-location card with *Change* | ListItem `navigational` with a `tertiary` Button |
| Centre card (3 photos · radio · MAPS tile · landmark + Listen) | SelectionCard `hero` (photo top) — `patterns/onboarding.md` § 6b already says `hero` when ≤ 3 centres |
| Date rows *7 Feb Tomorrow* | SelectionCard `date` strip |
| Map pin sheet *Move pin to the exact location · Confirm location* | MapSnippet `full` + MapMarker `drag` + Button — composition (`map-marker.md`) |
| *Complete 2-day training program* collage + one line | EmptyState-like intro: scene asset + Heading1 + Button (the `onboarding.md` § 3 intro shape) |
| OS location dialog | not a component; BottomSheet `permission` goes **before** it (`permissions.md`) |
| TC home (timings timeline · centre card · video carousel · refer banner · step list · sticky primary + Call) | composition: **training-centre card** (`onboarding.md` follow-ups: MapSnippet + Timer `deadline` + ListItem rows + Buttons) · HowToClip `card` ×2 with PageIndicator · PromoCard (refer) · Stepper `unordered` |
| *Call support* outlined button under the primary | Button `secondary` — **replaced by** HeaderNav Help (open question 6) |

### 2.Training WIP (1B)

| Region | Is |
| --- | --- |
| Day card title + state icon (*Day 1 Training in Progress*) | HeroCard `facts` with the state as Tag · or Card `state` |
| Timings timeline (two nodes, tags *In Progress / Completed / Missed / Rescheduled*) | Stepper `list` with `done` / `current` / `attention` / `locked` + Tag |
| *Reach training centre in* **54:23** pill | Timer `countdown` `M` (pill) — on the day only, per `timer.md` |
| *Reach by 9:45 AM* line | Timer `deadline` |
| **Expert ID + Trainer OTP card** (`#AB12456` · `5 4 2` · *Valid for today's training session*) | **no match — nearest** is the HeaderNav subtitle (name + ID, Beauty go-live shell) for the ID, and NumericKeypad `otp` boxes as *display* for the digits, with Timer `deadline` for validity. This is surface 35's brief: a Card composition of Stat `L` (ID) + three Amount-sized digits + Timer |
| Selfie login (intro sheet · camera with dashed silhouette · review · fail sheet · *Correct way to take selfie*) | MediaCapture `face` with its `review` and `fail` states; the intro sheet = BottomSheet `info` with a scene asset |
| OTP sheet over the camera (*Enter OTP · 3 boxes · Please ask your trainer…*) | BottomSheet + NumericKeypad `otp` (3) — the Beauty go-live *trainer's code* |
| *Log in Successful* / *Log out Successful* confetti sheet | BottomSheet `success` + `motion.celebrate` |
| *Absent / Present* pair; *Mark Day 2 as Absent?* | Button `primary` **Present** + `ghost` **Can't come** above → BottomSheet `confirm` (the § 8 rule) |
| *Missed Day 2 Training. Pick a new date.* with date chips | EmptyState `attention` (orange) + SelectionCard `date` strip + Button |
| *You are not at the Training Center* sheet | BottomSheet `info` / Banner `warning` with the fix |
| *Background verification failed · Trainer Approval Pending · Verification in progress* | EmptyState `error` / `waiting` / `waiting` — three kinds, one shape (`empty-state.md`) |
| *Change your visit date* / *Change your training center* | SelectionCard `date` strip · SelectionCard `rich` list |
| Pass screen (trophy) | the *Onboarding complete* scene (`onboarding.md` § 6a) with a reward asset; `motion.celebrate` |

### 3.GO LIVE (1C)

| Region | Is |
| --- | --- |
| Joining date rows | SelectionCard `date` strip + *Show more dates ›* (already in `beauty-expert-master-go-live/` #1) |
| Device-testing accordion (Camera · Location · Speaker · Vibration) | Accordion `checklist` with inline tests — **parked**; not in this PRD |
| Kit cards (image · size · quantity · *Change size*) + size chips | Statement rows (Beauty go-live G5) + Chip `filter` for sizes — surface 37 |
| Region radio list | SelectionCard `compact` |
| Shift & location dropdowns + card list | **replaced by** SelectionCard `rich` · shift option (shipped) — no dropdown filter in the system; the sheets (*Pick a shift*, *Select preferred work areas*, *shift start time* with sun/moon) are BottomSheet `select` with SelectionCard `rich` |
| Sunday hours rows with coin pills | SelectionCard `rich` with Amount `S` trailing (Beauty go-live translation) |
| Confirm-shift bands (blue weekday / yellow Sunday) + earnings rows | Card with Stat rows + Statement band for the money rows (Beauty go-live #5); the irreversible sheet = BottomSheet `confirm` with the consequence line |
| Hotspot card (photos · cluster · address · MAPS) | MapSnippet `hotspot` + ListItem rows (surface 44) |
| Terms wall + Decline/Accept | five ListItem `informational` rows + VoicePrompt `bar` + **I agree** (surface 40) |
| Selfie intro sheet · camera · review · *Your uniform is not visible* | MediaCapture `face` (`intro` sheet, `capture`, `review`, `fail`) — the logo/uniform check is what surface 41 removes |
| *Your image is being updated!* → *Image updated!* | Skeleton/Spinner full-screen → EmptyState `success` (or BottomSheet `success`) |
| Trainer-side *Actual / Enhanced* compare | **no match — nearest** MediaCapture `preview`; this is surface 42's ask (`preview` showing a generated image, labelled) — on the expert's phone in this project |
| First Home with confetti | `patterns/onboarding.md` § 8 Home pre-shift + `motion.celebrate` |

### For Diya + loose (1D, 1E)

| Region | Is |
| --- | --- |
| Training header (back · *Training* · language) | HeaderNav `page` — Help missing (surface 29 adds it) |
| *Lessons 0 / 40* progress card + *Play video* link | HeroCard `facts` with ProgressBar `linear` + count; the link is Button `tertiary` |
| Module accordions with lock; lesson rows with ring icon / check / lock | Accordion `list` + Stepper `list` inside (ring = `current`, check = `done`, lock = `locked`) — surface 26 |
| Mascot + speech bubble | **no match in core** — nearest is Coachmark (pointer + one line) and VoicePrompt (spoken). The mascot itself is an asset question (`assets.md`; `references/onboarding-mascot-2026-10-08/` already read a mascot) |
| Welcome *Let's become a 5★ Expert together* | the § 6a *Welcome to Snabbit training* screen — exists in the pattern; the 5★ pill is Tag `brand` |
| Full-bleed lesson video with a 3-segment strip and *Currently playing* | HowToClip `player` full screen + ProgressBar `segmented` — surface 25/26 |
| End-of-module sheet *Knowledge Check / Rewatch module*, *Try it yourself / Rewatch module* | BottomSheet `actions`: Button `primary` + `secondary` stacked |
| Knowledge-check picture cards (2×2, wrong greyscaled) | SelectionCard `hero` `single` / `multi` in a 2-column grid — `hero` exists (`onboarding.md` follow-ups); the greyscale-on-wrong is a `result` state to add |
| Wrong / right result sheet (pink / green tint, one action) | BottomSheet `result` kind: `error` → **Watch again**, `success` → **Next** — surface 27's fail shape; the shipped one has no score or attempts-left |
| Module-complete rings + *Up next* card | Stepper `rail` of modules (rings) + ListItem `navigational` + Button — surface 30 |
| App-practice Home replica with bubbles | the real Home composition + Coachmark — `patterns/first-run.md` as a lesson |
| Assessment yes/no (✕ / ✓) | SelectionCard `compact` ×2 or Button pair — **must become** two SelectionCards (P3: not a mirrored button pair); header shows *Question 01 of 15* + ProgressBar `linear` |
| Assessment image pick | SelectionCard `hero` ×2 `single` |
| Photo-step cards (sweeping) | HowToClip `card` / a step screen: scene photo + Heading2 + (no caption) — P1 |
| Clip end cards *Next video · Replay · Talk to trainer* | HowToClip `player` end state: Button `primary` + `secondary`; *Talk to trainer* = Help |
| Lesson tile grid by topic (L2) and the winding road (L8) | drafts; the Stepper/Accordion home in 1D supersedes them. Not mapped |

## Step 5 — what travels to contactless-gl

| Surface (TIERS.md) | Base frame(s) here | What changes for contactless |
| --- | --- | --- |
| 1 deep link → OTP | 1A-1…7 (`88462`–`88636`) | Keep the shape; OTP is 6 boxes on NumericKeypad `otp` per `onboarding.md`; Telugu joins the four languages (ask 1); the registration step list (1A-8) is not needed — the flow is linear (§ 3.1) |
| 3 intro videos | 1D-5 / L4 (`38091`, `87593`) + L7 end cards (`102133`, `102178`) | Full-screen HowToClip `player` with the *Next video / Replay* end card; a `card` row with PageIndicator on the promise screen; always skippable (§ 3.2) |
| 4 permission asks | 1A-24 (`89285`) — as the **anti-pattern** | BottomSheet `permission` with the exact *Allow* button pictured **before** the OS dialog; the OS dialog never appears alone (Design problem 1, P5) |
| 8 language from any screen | the language switcher on 1A/1C/1D headers | Keep: HeaderNav `page` Language IconButton `translate` on every screen (§ 3.4) |
| 9 registration | 1A-9…14 (`88709`–`88949`), 1A-23/27 city | Keep name · city · gender; the *18+* Banner becomes the consent row; referral pre-filled and hidden (§ 3.5); no shift-type, no centre, no date (1A-19…22 drop) |
| 10 gender-check rejection | 1A-18 *Only for females* Tag (`89029`) | A disabled card + Tag is not a message; EmptyState `info` with one polite line (§ 3.5) |
| 11 work-area list | 1A-25/26/33 (`89328`, `89362`, `90758`), 1C-6 sheet `76423` | Keep the row (name · km · landmark · Listen); drop the dropdown filters and *Select 3* — one hood, nearby first, pay slot carries *₹2,000 joining bonus* (§ 3.6); *Help me choose* in the empty state (question 5) |
| 12 shift windows | 1C-6 cards (`75931`, `76203`), 1C-7 Sunday rows | SelectionCard `rich` · shift option with open seats; full ones hidden; no coin emoji (assets.md) |
| 14 *Decide later* | — (no base; the TC home's *All steps unlocked* is the closest idea) | Button `ghost` under the primary; the step turns `attention` on the Home Stepper |
| 17–19, 22 KYC | **no base here** (ID Verification is a locked row in 1A-8; Aadhaar screens live in Self-Serve ER/AR) | from `patterns/onboarding.md` § 5 |
| 20–21 consent + selfie match | 1B-4 / 1C-11 selfie (`62912`, `77239`, `77463`, `77482`) | MediaCapture `face`: keep the dashed head outline and the review step; remove the uniform check and *Your uniform is not visible*; add liveness and *matched to Aadhaar* results (ask 3, § 3.7) |
| 23–24 KYC errors, 3 strikes | 1B-11 verification states (`66356`, `66398`, `66516`) | EmptyState `error`/`waiting` shape kept; each with its own line (never the copied body) and one recovery; final rung **Call help** + *Do it at the Hub* |
| 25 transition video | 1A-28 / L3 (`89431`, `86748`) + 1D-3/4 welcome (`39411`, `45144`) | One screen: the collage scene + *how long, what if you fail* spoken; HowToClip `player` full screen (§ 3.8.1); not the glossy poster |
| 26 training home | 1D-6/7 (`37845`, `74035`) | Keep modules → lessons with rings and locks, the progress card; add Help to the header; mascot bubbles become VoicePrompt + Coachmark (one line) |
| 27 failed attempt | 1D-10 (`119087`) + 1D-14 assessment header | Keep the tinted result sheet with **Watch again**; add the score as HeroCard figure, the wrong topics as ListItem rows, attempts left as ProgressBar `segmented` (§ 3.8.7) — the drawn sheet has none of these |
| 28 locked out | **no base** (nearest 1B-11 *Verification in progress*) | EmptyState `waiting` + **Call help** (§ 3.8.8) |
| 29 Call support on every module | L7 *Talk to trainer* end card (`102178`) | HeaderNav Help on the training shell; *Talk to trainer* becomes Help on the end card |
| 30 completion | 1B-13 / 1C-1 trophy (`66663`, `73177`) + 1D-12 module complete (`46588`) | `motion.celebrate` scene with her name and date, Button **Go to Home**; the trophy only if registered as a reward asset (§ 3.9.1) |
| 31 certificate | **no base** — nothing on this page draws a certificate | brief (TIERS.md) |
| 32 joining date | 1C-2 (`73567`) | SelectionCard `date` strip — unchanged (§ 3.10.1) |
| 33 slot confirmation | 1C-8 confirm bands (`75404`, `75508`) | Her hood + shift as the shipped shift-option card `selected` + **Change ›**; the *cannot be changed* sheet goes — § 3.10.2 says *with an edit option*; filled → Banner `info` + the list from 11 |
| 34 Hub screen | 1A-32 / 1B-1 TC home (`90422`, `66895`, `65646`) | The training-centre card as drawn: centre photos → MapSnippet `hub`, address + landmark + Listen, Map · Call · Share → **Show directions** / Help, *Reach by* Timer `deadline`, the countdown pill on the day; add *what to bring* rows and the advance Amount (question 9); drop the video carousel and refer banner (P1 *related is not needed*) |
| 35 Expert ID card with rotating code | **1B-2 / 1C-12 `69914` / `76857`** — the direct base | Keep ID + three digits + validity line; add the code's life as a Timer `deadline` and a refresh (question 10); shown on the Hub screen and on Home; the agent types it (the trainer-side `77210` shows the other phone) |
| 36 *Your visit has started with <agent>* | 1B-6 *Day 1 Training in Progress* + *Log in Successful* (`62064`, `69469`) | Card `state` with the agent's Avatar + name + Tag `info`; the confetti sheet → a Toast/`success` moment, not a blocking sheet |
| 37 after the visit: uniform, payment, BMI | 1C-4 kit (`75231`, `75315`) + trainer-side BMI OTP (`77210`) | Statement rows per item (size, qty), a payment row with status Tag; BMI as a ListItem with Tag — the quantity stepper and size chips go (she does not choose at this point) |
| 38 work area pending blocks moving on | 1A-32 *Finish your registration* step list | Stepper `list` with `attention` + Banner `warning` **Pick your hood** |
| 39 BMI fail / under review | 1B-11 *Trainer Approval Pending* shape (`66398`) | EmptyState `waiting`, dignity copy, **Call help**; the illustration is a flat scene, not the badge-style magnifier |
| 40 TnC | 1C-10 (`75725`) | Five plain rows + VoicePrompt + **I agree** — as `beauty-expert-master-go-live/` already translated |
| 41 go-live selfie | 1C-11 (`77239`, `77463`, `77482`) | MediaCapture `face` without the uniform rule; quality reasons *blurred · dark · more than one face · sunglasses* as `result` states; **she** takes it, no trainer phone (§ 3.13) |
| 42 AI uniform preview | trainer-side *Actual / Enhanced* (`77132`) + *Image is being enhanced!* → *Image updated!* (`77513`, `77522`) | The compare moves to **her** phone: MediaCapture `preview` with the generated photo, a line that says it is generated (P5, question 11), **Use this photo** / **Retake** |
| 43 three failures → support | 1C-11 fail (`77482`) | EmptyState `error` final rung + **Call help** |
| 44–46 day-one Home | 1C-15 (`73206`) + 1D-13 Home mock (`78301`) | `onboarding.md` § 8 as already translated; hotspot row with **Show directions**; *Need help?* rows; VoicePrompt reads the cards (§ 3.14) |
| 49 progress through the flow | the one-segment strip (1A) and the 3-segment lesson strip (1D) | ProgressBar `segmented` with a count that the config computes |

**No base on this page:** surfaces 2 (already-trained message), 5–7 (settings guide per maker, denied twice), 13 (*Help me choose*), 15–16 (seat released, nothing nearby), 17–19 and 22 (KYC, DigiLocker, OCR, confirm), 28 (locked out), 31 (certificate), 47–48 (reminders). Surfaces 6 and 3's thumbnails are assets.

## Step 6 — side by side / open findings

- The page is named *TC Less training* but **2.Training WIP and 3.GO LIVE are the TC flow** (centre, trainer OTP, two days); only *For Diya* and the loose frames are TC-less.
- The **Expert ID + Trainer OTP** card is drawn in both WIP and GO LIVE with no countdown and no refresh — the PRD's *rotating code* (§ 3.11) is not on any screen; `TIERS.md` surface 35 and open question 10 stand.
- The go-live photo is taken on the **trainer's phone** (*Take expert photo*) and the *Actual / Enhanced* compare is shown to the trainer; the PRD moves both to her phone (§ 3.13.1, 3.13.4) — surface 42 has no expert-side base.
- The BMI check starts when **the trainer types her OTP** (`77210`) — the same handshake surface 35 reuses; `TIERS.md` surface 37 should note the BMI result arrives after a handshake, not after a form.
- Language list here is **four** (English, Hindi, Marathi, Kannada); `patterns/onboarding.md` says the shipped Self-Serve list has **five** (with Telugu); the PRD says seven. Three sources, three counts.
- OTP here is **4 boxes**; `patterns/onboarding.md` says 6 (NumericKeypad `otp` 6); confirm with tech which the contactless API sends.
- The location permission is drawn as the **bare OS dialog** with no app sheet — the opposite of `patterns/permissions.md`; it is the evidence for SCOPE.md *Design problem 1*.
- *Select 3 work areas* (ordered, three) vs PRD § 3.6 (one work area with a joining bonus) vs `TIERS.md` 11 (one hood): the multi-pick is TC-era; contactless picks one.
- *Call support* is a **body button** on list screens here and *Call Trainer* a header pill on TC-day screens; `onboarding.md` and question 6 put Help in the header — the page shows both placements, neither consistently.
- The in-app training home (For Diya) has **no score, no attempts-left, no wrong-topics** on the fail sheet; PRD § 3.8.7 requires all three — surface 27 is a composition to draw, not a screen to copy.
- The assessment's **✕ / ✓ buttons side by side** are the P3 mirrored pair; the knowledge check's picture cards are the right shape and should carry the assessment too.
- The For Diya training shell has **no Help** in its header (PRD § 3.8.6 *Call support on every module*); the loose end card's *Talk to trainer* is the only support entry in training.
- Mascot bubbles are a **third instruction channel** (beside VoicePrompt and Coachmark) and carry emoji placeholder copy; `references/onboarding-mascot-2026-10-08/` is the earlier read to reconcile with before any mascot is drawn.
- The For Diya *Lessons 0 / 40* count and the loose *0/30 Completed* / *(4/10)* counts disagree; the module list has 5 modules with 4 + 9 lessons visible — the course length is not settled (PRD § 3.8.4 says duration is to be agreed with the training team).
- *Device testing* (camera, location, speaker, vibration) is drawn and parked (dimmed); it is not in the PRD and not in `TIERS.md` — leave it parked.
- The TC home's *Finish your registration · All steps unlocked! Complete them in any order* is the only drawn precedent for a non-linear post-training task list — it matches `TIERS.md` 49's Home Stepper `unordered`.
- `patterns/onboarding.md` § 6a describes the in-app course as *Stepper `list` of modules, HowToClip `player`, quiz as SelectionCard `compact`*; the For Diya frames use an Accordion of modules with ring lessons and **picture** quiz cards — the pattern's § 6a should be updated to the Accordion + `hero` cards once this read is accepted.
