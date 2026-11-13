# Reference read — *Self-Serve ER/AR* → `Final` → **TC Less house help · ER/AR flows v2 · Post Onboarding · 11 loose frames**

Read for project `contactless-gl` (surface numbers below are `../../TIERS.md`). Internal reference only; nothing here is published or traced.

## Source

| | |
| --- | --- |
| File | Figma *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB` · page `Final` (`0:1`) |
| Sections read | `599:37239` **TC Less house help** (35 children · 24 phone frames + 3 label bars, 2 arrows, 1 note) · `1108:15875` **ER/AR flows v2** (98 children · ~80 phone frames + 14 label bars, 5 arrows, 3 branch titles, 2 voice-bar components) · `599:29415` **Post Onboarding** (35 children · 24 phone frames + 7 banner/card assets + 9 label bars) |
| Loose frames | `1146:48612` `1146:48659` `1146:48707` `1146:48736` `1761:20432` `1761:20522` `1761:20634` `1788:43525` `1788:43650` `1788:43775` `1788:43900` — all 11 screenshotted at native 393 px (§ Loose frames) |
| Skipped | `619:55994` TC house help, `1055:34205` ER/AR flows v1, Bank/UPI, Insurance, TC Less house cook — other agents or already in `patterns/onboarding.md` / `payout.md` |
| Date · reader | 2026-11-04 · Claude (agent), for Rupam Banik |
| Method | `get_metadata` on each section (oversized, saved to file, parsed with Python for depth-1 frames and text-node names) · one `get_screenshot` per section at max 8000 / 6000 px, cropped per frame with PIL (`section-*.png`, `crops/<section>-<nn>-<frame-id>.png`) · 21 frames re-shot at native size (`crops/*-hi.png`, `crops/loose-*.png`) |
| Figma failures | **Figma MCP rate limit** (*tool call limit for your Full seat*) refused ~45 `get_screenshot` calls across two batches on both Figma servers. Consequence: ER/AR v2 is read mostly from the 0.41× section render (phone frames ≈ 162 px wide) plus the 13 frames that got through at native size; strings were cross-checked against the metadata text-node names, so verbatim quotes are reliable, fine detail (helper text, disabled states) is not everywhere. `1109:36571` rendered identical bytes to `1109:36478` at native size (a Figma-side mix-up) — the hi-res copy was deleted and the section crop used. `1146:48736` is byte-identical to `1146:48612` (two copies of the same frame on the canvas). |
| Not read | Text node *names* were used as the string source where crops were too small; a renamed text layer (e.g. `Please enter a valid PAN` as the name of every summary row's helper slot, `Title`/`Description`/`Label`) is reported as *placeholder name* and not quoted as copy. |

Files: `section-tcless.png` · `section-erar-v2.png` · `section-post-onboarding.png` · `crops/` (128 section crops + 21 native). Total ≈ 16 MB.

---

## Step 1 — what is there

Header shell on every form screen in all three sections: **back ‹ · title · `Call` pill with phone glyph · language pill (`अ/A` + caret)**; a thin **5-segment progress strip** under it; a **mascot** (illustrated expert in pink, waving) bottom-right above the Button; a **speaker icon** after some titles (*Enter your mobile number*, *Enter OTP*). The Button is full-width pink; its label carries the step count (*Continue (1/5)*). Disabled Buttons are pale pink with white text.

### A. TC Less house help (`599:37239`) — the shipped TC-less base

| # | Frame | Screen | Strings (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| A1 | `599:37240` | Splash | "BECOME A" · "Snabbit Expert" | Pink gradient, wordmark, expert photo (namaste) |
| A2 | `599:37277` | Promise | "30,000 per month" · "Sick leaves" · "Insurance upto 5 lac" | Three white rows with 3D reward assets (note bundle, piggy/clock, shield); expert pointing; no Button visible on the crop |
| A3 | `599:39867` | Language | "Choose your language" · "English / English" · "हिन्दी / Hindi" · "मराठी / Marati" · "తెలుగు / Telugu" · "ಕನ್ನಡ / Kannada" · Button "Continue" (disabled) | Dark-pink hero with आ/A speech bubbles; 2-column radio cards (own script over English name); text-node names still say "1.2 km from your location" (placeholder) |
| A4–A5 | `599:39687` · `599:39777` | Language, Hindi chosen | "अपनी भाषा चुनें" · selected card shows a **waveform** (speaks the language) · Button "शुरू" | Same; title and Button re-render in Hindi at once |
| A6 | `599:39942` | Phone | hero "Earn upto 45,000 per month" · "Enter your mobile number" + speaker · "+91" field · "We'll send an OTP to verify your number" · Button "Continue" | Photo hero with 3-dot PageIndicator; white panel |
| A7 | `599:39989` | Phone, typed | hero "Work in flexible shifts" · "+91 8606653178" · "Continue" | Carousel state 2 |
| A8–A10 | `599:40018` · `599:40065` · `599:40109` | OTP | hero "Join 10,000 happy experts" · "Enter OTP" + speaker · spinner at right · 6 boxes · "OTP sent to 9677063716" + edit pencil · "Resend OTP (50s)" / "Resend OTP" · Button "Confirm" (disabled → enabled) · OS QWERTY keyboard | Note on canvas: "Truecaller autofill" |
| A11 | `599:37364` | Steps intro | "Join Snabbit in 4 simple steps" · "It takes 2 minutes" · Button "Start onboarding" | Stairs scene with green check; text-node name says "Complete onboarding in just 5 steps!" (old copy) |
| A12 | `599:37386` | Location dialog | OS dialog "Allow **Snabbit** to access this device's location?" · map pin · "Precise" · "Allow" · "Only this time" · "Don't allow" (dark-green OS buttons) | Overlays the About-you screen; the frame also holds a stray OTP block and a green "Verified!" Button (composite artboard) |
| A13–A15 | `599:37631` · `599:37856` · `599:38020` | About you | header "Work details" · "A little bit about you" · "Work location" / "Bengaluru" + "Change" (pencil) · "Full name" / "Rupam Banik" · "Gender" / "Female" · "Male" (photo cards, radio) · "Have a referral code? (optional)" link + waveform pill · expanded: "Referral code" / "eg. ERIE935" · Button "Continue (1/5)" | Progress 1/5 |
| A16 | `599:38186` | Work type | "What work are you interested in?" · "House help / Cleaning, mopping, laundry, and other house work" · "Cooks / Cleaning, mopping, laundry, and other house work" (copy-paste error) · "Beauty" + green "NEW" pill / "Hair dying, hair coloring and facials" · "Continue (2/5)" | Radio cards with photo at right; 2/5 |
| A17–A20 | `599:38549` · `599:38598` · `599:38647` · `599:38696` | Confirmations | "Tap on the image to proceed" · illustration card + checkbox "I have my own smartphone" → "I can wear the snabbit uniform" · "Continue (3/5)" disabled until checked | One hero card per screen; 3/5 |
| A21 | `599:38745` | Aadhaar intro | "Keep Aadhar number ready" · "You will need your Aadhar number and phone number to get an OTP" · Aadhaar card picture with the number circled "xxxx xxxx xxxx" · yellow Banner "⚠ Do not exit app now" · Button "Taking you there" (loading) | 4/5 |
| A22 | `599:38944` | Aadhaar verified | header "Identity verification" · green check · "Your Aadhar is verified!" · rows "Name / Radhika Sharma" · "Gender / Female" · "Date of birth / 20 Jan 1996" · "Father's name / Umar kanti sikder" · "Aadhar / 12** **** **** 3456" · "Address / AECS Layout, Silver Springs kodihalli bangalore" · Button "Finish onboarding" | Summary card, each row with a pink glyph; 5/5 |
| A23 | `599:40665` | Done | "CONGRATULATIONS!" · "You have successfully done your onboarding!" · Button "Let's train now" (dark) + a play glyph in the scene | Blue confetti scene, expert with "ONBOARDING COMPLETE" clipboard, "TRAINING CENTER" building |
| A24 | `682:87880` | Training welcome | "Welcome to Snabbit Training" · "Let's become a **5★** Expert together." | Avatar in a circle, pink wash; no Button on the crop |
| A25 | `599:40160` | Unavailable city | "We are not live in your area yet." · "Work in another place" · city cards "Mumbai · Bangalore · Delhi NCR · Pune · Bangalore · Hyderabad" (skyline pictograms, radio) · "Continue" | Label bar "Unavailable city" |
| A26 | `599:40378` | Change city | "Select a city" · "Mumbai · Bangalore · Delhi NCR · Pune · Bengaluru · Hyderabad · Chennai · Kolkata · Ahmedabad · Jaipur" · "Continue" | Label bar "Change city"; both Bangalore and Bengaluru listed |
| A27 | `682:88736` | About you, Male | Male card selected · "Continue (1/5)" enabled | Label bar "No males" |
| A28 | `682:88669` | No males | "SORRY FOR THE INCONVENIECE" (sic) · "We are not hiring male experts at the moment" · Button "Call support" (dark) | Illustration of five women in uniform |

### B. ER/AR flows v2 (`1108:15875`) — newer iteration, three branches (canvas titles "HOUSE HELP" · "HOME COOK" · "BEAUTY"), sub-labels "Happy flow" · "Incorrect otp" · "Unavailable city" · "Change city" · "No males" · "Aadhar OCR" · "TC less" · "TC journey" · "Training centre states" · "Change training center" · "Change training date"

**B-i. Entry (same as A, copy and numbers changed)**

| # | Frame | Screen | Strings | Delta vs A |
| --- | --- | --- | --- | --- |
| B1–B2 | `1108:16842` · `1108:16879` | Splash · promise | as A1–A2 | none |
| B3–B5 | `1108:17146` · `1108:16966` · `1108:17056` | Language | "Select language" (was "Choose your language") · same five | title |
| B6–B8 | `1108:16718` · `1108:16766` · `1108:16795` | Phone · OTP | hero "Earn upto **70,000** per month" (was 45,000) · "Join **30,000** happy experts" (was 10,000) · "Continue" / "Confirm" | numbers |
| B27–B28, B33 | `1108:15889` · `1108:17234` · `1108:17288` | OTP states | empty · filled "6 6 6 6 6 6" · **"Incorrect OTP"** in red under red-outlined boxes · "Resend OTP" | new error state |
| B9 | `1108:17332` | Steps intro | "Get ready to earn with Snabbit" · "Complete your profile in a few easy steps" · Button "Let's start" | no step count any more |

**B-ii. Personal details (new header title)**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B10 | `1386:42209` | Name and gender | header "Personal details" · "Name and gender" · "Work location / Bengaluru / Change" · "Full name / Rupam Banik" · helper "Your name will be verified with your Aadhaar" · "Gender" Female / Male photo cards · "Have a referral code?" collapsed row with caret · "Continue (1/5)" |
| B11 | `1576:20296` | Name error | "Rupam B1anik" with red ✕ · "Please enter your full name correctly" |
| B12 | `1386:42312` | Female selected | referral expanded "7D7D6D6D" |
| B13 | `1386:42397` | Referral filled | "Have a referral code?" ^ · "7D7D6D6D" · "Continue (1/5)" (native crop `erar-13-…-hi.png`) |
| B14 | `1576:20513` | Referral error | "KSYDGDTD" · "Enter a valid referral code" |
| B40 | `1108:20766` | Male, voice | Male selected; **voice bar** (pause + waveform) left of the mascot · "Continue (1/5)" disabled |
| B42 | `1109:35810` | No males (inline) | red inline pill "✕ We only need female experts." above the disabled Button |
| B43 | `1109:35999` | No males (toast) | red top Banner "⊘ Please select female to continue" · title reads "A little bit about you" (old) |
| B36, B38 | `1108:20282` · `1108:20498` | Unavailable / change city | "We are not live in your city yet" · "Work in another city" · "Select a city" — as A25–A26 |

**B-iii. Work details**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B15 | `1108:17879` | Type of work | "Select your type of work" · 2-column photo cards "House help" · "Home cook" · "Beauty" + "NEW" · "Continue (2/5)" |
| B16 | `1287:43887` | Requirements (house help) | pink eyebrow "House help" · "Confirm these requirements to work with Snabbit" · two round pictograms with green ticks "I have my own smartphone" · "I can wear Snabbit uniform" · Button **"I accept"** |
| B54 | `1287:43679` | Requirements (cook) | eyebrow "Beauty" (mislabelled) · "Confirm these requirements for every job" · + "I can cook in multiple households" · "I accept" |
| B72 | `1109:38450` | Requirements (beauty) | "Beauty" · + "I can travel to multiple households" · "I accept" |
| B71 | `1108:21555` | Beauty experience | "How long have you worked as a beautician?" · "I am just starting" · "1-3 years" · "More than 3 years" · "Continue (2/5)" disabled |
| B17, B55 | `1361:42073` · `1362:42142` | Training interstitial | eyebrow "TRAINING" · "Get trained to join us" · dark Button **"Finding slots"** (loading) · full-bleed scene (trainer + expert) |
| B73 | `1361:41946` | Skill-test interstitial | "SKILL TEST" · "Take our skill test to join us" · "Finding slots" |

**B-iv. Training centre (TC journey)**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B18 | `1108:16650` | Pick date | header "Training centre" · "Nearest training centre" · "Koramangala" ✎ · pink pill "2.5 km away" · "Select training start date" · date rows "7 Feb Tomorrow · 9 Feb Tuesday · 10 Feb Wednesday · 11 Feb Thursday · 12 Feb Friday" · "Continue(3/5)" |
| B19 | `1108:18422` | Confirmed (1741 tall) | blue top Banner "Verify Aadhaar before reaching the centre" · green check "Training Confirmed" · pink ring "Starts Friday / 10:00 AM" · "Your Timings" + "Change" · "Day 1 - 7 Feb, Friday / 10:00 AM - 5:00 PM" · "Day 2 - 8 Feb, Saturday …" · "Important" tag · "Please carry your original Aadhar" with an Aadhaar pictogram · "Training Centre Details" + "Change" · 3 photos · "Koramangala Training Center" · "HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru" · "Nearest Metro / BTM Layout" · "Nearest Bus stop / Silk board" + speaker · round actions "Map · Call · Share" · "Training Videos" carousel "How to become a Snabbit Expert" · "Introduction to Snabbit" · "Refer your friend, earn ₹5,000" card · Buttons **"Verify Aadhar"** (primary) / **"Go to training centre"** (outline, pin) |
| B20, B24, B62 | `1108:18956` · `1108:19492` · `1108:25690` | Today | "Reach the training centre" / "Please reach the training centre" · orange ring "Starts in / 53:43" · "Reach by 9:45 AM" (pink) · B24 adds "DOCUMENTS TO CARRY / Aadhar card, PAN Card" and Buttons "Start training" / "Go to training centre" |
| B59–B61, B67, B70 | `1108:26229` · `1108:26766` · `1108:27303` · `1108:30281` · `1108:30818` | States | "Training Confirmed" · "Day 1 Training Tomorrow / Starts tomorrow / 10:00 AM" · B70 green Banner "✓ Training centre changed!" |
| B63 | `1108:28094` | Late | orange "!" · "Reach before 12 pm to attend your training" · "Reach by 12:00 PM" · Button "View directions" |
| B64 | `1108:27842` | Missed | orange "!" · "Missed Day 2 Training. Pick a new date." · "AVAILABLE DATES" · "Tomorrow 9 Feb · 10 Feb · 11 Feb" · Button **"Submit"** · timeline "Day 1 … Completed" (green) · "Day 2 … Missed" (orange) |
| B65 | `1108:28596` | Rebooked | "Day 2 Training Tomorrow" · timeline "8 Feb, Saturday Missed" · "Day 2 - 11 Feb, Saturday" · Button "Proceed to Training" |
| B68–B69 | `1108:29159` · `1108:29183` | Change centre | "Change your training center" · "Nearby training centres" · "Sony Signal · BTM Layout · HSR Layout · Kadunesanahalli · Sony Signal · Sony Signal" each "1.2 km from your location" · Button "Change training center" |
| B95 | `1108:29118` | Change date | "Change your visit date" · "Choose a date for Day 1" · "7 Feb Tomorrow · 9 Feb Tuesday · 10 Feb Wednesday" · "Change date"; B96 result Banner "✓ Day 1 date changed" |

**B-v. Identity — two paths**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B21, B78 | `1108:15923` · `1108:21933` | Aadhaar intro | header "Aadhar" / "Complete KYC" · "Keep Aadhar number ready" · "You will need your Aadhar number and phone number to get an OTP" · yellow "Do not exit app now" · Button "Continue to verify" |
| B22, B79 | `1108:16128` · `1108:22137` | Verified | header "Training centre" / "Complete KYC" · "Your Aadhar is verified!" · same six rows · Button "Continue" / "Completing onboarding" (loading) |
| B45 | `1109:36478` | **Aadhaar OCR — upload** | header "Aadhar" · "Upload Aadhar images" · two dashed drop zones "+ Upload Front Side / JPG, PNG (Max 5MB)" · "+ Upload Back Side …" · Accordion row "📷 How to take aadhar photos" · Button "Verify Aadhar" disabled |
| B46 | `1109:36571` | OCR — source sheet | header "Aadhaar Card Verification" · "Upload Images" · "Tips to take a good Aadhaar photo" (2×2 examples) · BottomSheet "Upload Aadhaar" · "Camera" · "Choose from gallery" |
| B47 | `1109:36509` | OCR — both uploaded | two card previews with ✕ · Accordion open: "Bright & clear" ✓ · "No glare" ✕ · "Verify Aadhar" enabled |
| B48 | `1109:37752` | OCR — front only | one preview · Accordion open 2×2: "Bright & clear" · "No glare" · "No photo copy" · "No half visible" · "Verify Aadhar" |
| B80 | `1108:22453` | Driving licence (beauty) | "Add your driving license" · "Only if you have one. You can add it later." · DL picture · "Take photo" · "Upload from gallery" · link "I don't have DL" |
| B23, B81 | `1108:20026` · `1108:24159` | Done | as A23 · beauty: "VERIFICATION COMPLETED!" · "Get ready to show your beauty skills!!" · Button "Getting ready" (loading) |
| B32 | `1108:18329` | Training welcome | as A24 (TC less) |
| B26 | `1108:25645` | TC-less landing | header "Snabbit Expert" + Call + language · card "Complete Onboarding / Get started as a expert fast" · "Continue" · "Snabbit Benefits" tiles "Family insurance up to ₹1,00,000" · "Monthly earnings up to ₹50,000" · "Refer…" (cut) |

**B-vi. Expert ID handshake (TC journey)**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B50, B83 | `1108:20236` · `1108:24185` | Share ID | header back + language only · "Share Expert ID and OTP with Trainer" · card "Your Expert ID / #AB12456" · card "Trainer OTP / **5 4 2** / Valid for today's training session" · **no Button** (native crop `erar-50-…-hi.png`) |

**B-vii. Beauty: skill test and shift**

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| B74–B75 | `1108:22500` · `1108:24471` | Skill test slot | "Nearest skill test centre / Koramangala" · "Choose a date to visit" · "Select training start time" "10 AM · 11 AM · 12 PM · 1 PM · 2 PM · 3 PM" · "Continue" |
| B76–B77, B82 | `1108:22568` · `1108:23096` · `1108:23628` | Skill test card | header **"Sunita Rao / 5673439"** (name + ID subtitle) · "Skill Test Confirmed" / "Reach your skill test centre" · "DOCUMENTS TO CARRY / Aadhar card, Driving license" · "Koramangala Skill Center" · Buttons "Verify Aadhar" / "View directions"; B82 "Start skill test" |
| B84 | `1108:25351` | In progress | "Skill test in progress" · Stepper "Beauty skills — Going on" · "Personal details — Pending" · "Driving questions — Pending" · referral card "Refer now" · Button "Logout" disabled |
| B85 | `1132:48181` | Passed | green wash · "Skill test passed!" · Button "Select shift area" |
| B97 | `1132:48318` | Failed | yellow wash · "#AB12456" · retry glyph · "Try again in 30 days" · row "Driving questions — Failed / You said you cant ride. We require you to drive to location" · Button "Call trainer" (outline) |
| B86, B90 | `1109:46920` · `1109:47614` | Shift & location | header "Sunita Rao / 5673439" · "Select your shift & location" · fields "Work area / Select three areas" → "Koramangala, Indiranagar, BTM Layout" · "Shift time / Select time" → "Morning" · "Shift type / Select type" → "Full-time" · list "Wipro Park / Koramangala / 8 AM to 2 PM \| 6 hrs / Earn upto ₹22,000" ×4 (Owner's Court, ST Bed Layout) · Button "Proceed" (disabled → enabled) |
| B87 | `1109:47066` | Pick areas sheet | **video strip** "How it Works" (play, scrubber, speaker) · "Select preferred work areas" · "Search a location" · "Best for you" tag · "① Koramangala · 1.2 km · Landmark HDFC Bank" + speaker · "Sony Signal" · "HSR Layout" · "Confirm" |
| B88 | `1109:47231` | Pick shift type sheet | "Pick a shift that suits you" · "Full Time / 10 to 12 hours daily" · "Part Time / 4 to 6 hours daily" (clock pictograms) · "Confirm" |
| B89 | `1109:47451` | Pick start time sheet | "Select your shift start time" · "Morning 06:00 AM to 10:00 AM" · "Afternoon 10:00 AM to 03:00 PM" · "Evening 03:00 PM to 05:00 PM" (sun/moon glyphs) · "Confirm" |

### C. Post Onboarding (`599:29415`)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| C1–C4 | `599:33195` · `599:33229` · `2025:20737` · `599:33189` | Reusable cards | "Get Accidental and Health care insurance / Add insurance" (yellow) · "● Payout at risk / Add bank account to recieve payouts / Add bank account" (red) · "Add bank account to get money quickly / Add bank account" (green) · "Avoid 20% income tax on your earnings / Add PAN" (blue) | 254×264 task cards with 3D assets |
| C5–C7 | `664:85912` · `664:85918` · `664:85924` | Banners | "Payout at risk · Add Bank & PAN · To receive payouts" · "Secure your family · Get ₹5L cover" · "Add PAN · Avoid 20% income tax" | 361-wide strips with "Add" |
| C8 | `599:29416` | **Home, first time** (native crop) | top: bell with "1", "SOS" · "Saathi" · coin "30" · card "Welcome to Snabbit!" + avatar · "Tuesday, 7 February" · "7:00 AM - 12:00 PM" · "₹ You can earn ₹800 - ₹1000" · "📅 Mark attendance for tomorrow" · Buttons **"⊗ Absent"** (red) and **"⊙ Present"** (green) side by side · task carousel "Add bank account to get money quickly / Add bank account" · "Protect loved ones with 5 lac insurance / Add insurance" · "Need help? Call our team" · "Komal Rani / Trainer" · "Anjali Sharma / Team Leader" · "Ramesh Kumar / CLM" · tab bar "Home · Earnings · Refer (₹4000 pill) · Profile" | Label bar "Home screen - first time" |
| C9–C11 | `599:29687` · `599:29553` · `636:73126` | Home variants | insurance first; "Pay less to the goverment now / Add PAN"; contest "Saheli lao, Cooler ghar le jao! / Free Cooler" · "Jeeto Har Mahina🏆" · "Saheli jodo, kapdon ki tension chhodo! / Washing Machine Jeeto!" | Label "If bank/ insurance added, then show PAN" |
| C12–C17 | `599:29856` · `599:30532` · `599:30763` · `599:30994` · `599:31492` · `599:31245` | Profile | "Profile" · "Reema Saju / #SNAB2413 / ★ 4.2" · "Diamond Tier / View tier ›" · one banner (Bank & PAN / insurance / PAN "Save ₹7,100 now") · groups "Earnings & Payments" (Monthly earnings ₹24,000 · Payout history · Early Payout) · "Shift & Availability" (Apply leave · Emergency logout in red) · "Benefits & Perks" (Refer & earn · Seva · Insurance · Snabbit store · Loans) · "Account & Settings" (Language · Emergency contact · Personal details & KYC · Bank details "Add Bank" · PAN details "Add PAN") · "Learnings" (Snabbit Training) | Label bars "Profile Page - Base info" · "PAN and Bank edit" |
| C18–C20 | `599:32404` · `599:32774` · `599:32589` | Daily earnings | "Expert ID: 14586" · "Payout Issue" headset · "March 2025" · tabs "Earnings / Refer Saheli" · "Total Daily Earnings ₹7,680" · rows "Min G ₹2,000 · Last Hour Min G Loss -₹21 · Base Pay ₹4,000 (Work ₹3,430 · Check In ₹250 · Distance Bonus ₹10 · Summer Bonus ₹1,345) · OT ₹200 · Adjustments ₹800 · Red Cards 🟥2 -₹100 · Red Cards Waiver ₹50" · "Cash collected : ₹150" · banner · "Week 1 / 1 March - 7 March / ₹1,350" … "Week 5 / 28 March - 30 March / ₹250" (tier-tinted rows) | Label "Daily Earnings" |
| C21–C24 | `599:31726` · `599:31889` · `599:32247` · `599:32052` | Monthly earnings | "Total Earnings ₹11,800 + 🔒₹8,500" · "Cash Collected -₹1,000 · Early Payout -₹3,000 · Loan EMI -₹1,200 · Training and Uniform Fees -₹500 / Deducted EMI (1/4) · Joining Bonus 🔒₹8,500 · Remaining Payout ₹800" · "PAYOUT SCHEDULE" "5 APR Monthly Payout / Add UPI / bank account to enable payout ₹14,255" · "10 APR Winback Bonus … ₹5,000" · "Monthly Earnings Breakup" rows "Daily Earnings ₹8,000 · Shakti Bonus Check · Joining Bonus 🔒₹3,500 · Winback Bonus 🔒₹5,000 · Adjustments ₹8,000 · Income Tax (20%) -₹4,200 / Upload your PAN Card to reduce tax · Tips Check" · "Penalties / Red Cards 🟥5 received this month" · "Other Actions / Request Early Payout Available limit ₹25,000 · View Payout History · Referral Earnings · Add UPI ID/ Bank Account" · C24 sheet "You're losing ₹4,700 / If u dont add PAN / No PAN 20% tax ₹8,000 of tax cut / PAN 1% tax ₹250 / Add PAN" | Label "Monthly Earnings" |
| C25–C27 | `599:30087` · `599:30322` · `599:33027` | Early payout | Profile with "Early Payout 🔒 Locked" · sheet "₹7,100 is waiting for you / Add bank details to unlock / Add bank details" · page "Early Payout" · green "Save ₹1,800 more" "No PAN 20% Income Tax ₹5,000 / With PAN 1% Income Tax ₹250 / Add PAN" · "Max.Early payout (50% of total earnings) ₹7,100" · "Total earnings ₹14,200" · "Withdrawals/ month 2 available" · "Processing time 12 hrs" · "Withdraw" · "Helpful tips and guide" video tiles "How to get 5 star ratings ?" · "How to get more benefits?" · "Learn more aboyt insurance" · "View more" | Label "Early payout" |

### D. Loose frames (top right of the page) — a **"Language preference"** sub-flow, not yet in any section

All share: header "‹ Language preference" + language pill (no Call pill), **5-segment progress**, a **voice bar** (pause button + waveform) beside the mascot above the Button, Button **"आगे · Next"** (bilingual). Copy is in Hindi.

| # | Frame | What it is | Strings |
| --- | --- | --- | --- |
| D1 | `1146:48612` (= `1146:48736`, identical) | Phone hero, carousel 1 | "Join 30,000 happy experts" — photo of ~20 women in uniform, 3-dot indicator |
| D2 | `1146:48659` | Phone hero, carousel 2 | "Earn upto 70,000 per month" — expert with cleaning basket, thumbs up |
| D3 | `1146:48707` | Phone hero, carousel 3 | "Work in flexible shifts" — expert on phone in a lobby |
| D4 | `1761:20432` | Languages you know (multi) | hero आ/A · "आप कौन सी भाषाएँ बोल और समझ सकते हैं?" · 2-column checkboxes "English ✓ · हिन्दी ✓ · मराठी · தமிழ் · বাংলা ✓ · తెలుగు · कोंकणी · ગુજરાતી" · "आगे · Next" |
| D5 | `1761:20522` | Reading check | "क्या आप यह पढ़ सकते हैं?" · yellow box with a Bengali sentence "গ্রাহক রান্নাঘর পরিষ্কার করাতে চান" · "सही चित्र चुनें-" · three radio picture tiles (beauty · mopping · cooking) · "आगे · Next" disabled |
| D6 | `1761:20634` | How you send messages | "आप मैसेज कैसे भेजना पसंद करते हैं?" · "हिंदी में टाइप" (selected) · "अंग्रेज़ी और हिंदी में टाइप" · "वॉइस नोट" · "मैसेज नहीं भेजती" |
| D7 | `1788:43525` | Language with customers | "ग्राहकों से ज़्यादातर किस भाषा में बात करते हैं?" · "हिंदी" (selected) · "বাংলা" · "English" · "अन्य" |
| D8–D9 | `1788:43650` · `1788:43775` | App language | "Snabbit ऐप किस भाषा में चाहिए?" · "हिंदी" · "বাংলা" · "English" · **"ज़्यादा चित्र और आवाज़"** (*more pictures and voice*) — two states, 3 vs 4 segments filled |
| D10 | `1788:43900` | Saathi's voice | "Saathi आपसे किस भाषा में बात करे?" · "हिंदी" · "বাংলা" · "English" each with a **play button** · link "▶ दबाकर Saathi की आवाज़ सुनें" (*press to hear Saathi's voice*) |

Also on the v2 canvas, loose beside the "No males" row: `1724:20456` and `1727:20457` **"Sathi-speaking-play"** (222×72) — the voice-bar component the loose frames use.

---

## Step 2 — what each sub-flow is trying to do

**A. TC-less house help.** Get a woman from install to "verified and training" in five screens of one question each, with a photo of a real expert on every hero and a mascot who speaks the screen. Training happens in the app after Aadhaar; the Hub never appears. It is the shipped shape `patterns/onboarding.md` § 0–6a already describes.

**B. ER/AR v2.** The same spine re-cut for three job types with a **Hub (training centre / skill-test centre) stage before KYC**: pick work → accept requirements → *Finding slots* → pick centre and date → a tall confirmed card that lives through *tomorrow / today / late / missed / rebooked / centre changed / date changed* → Aadhaar (DigiLocker **or a new photo-upload OCR path**) → done. The TC journey ends with an **Expert ID + 3-digit trainer OTP** screen she shows at the Hub. Beauty adds experience, a driving licence, a skill test with pass/fail, and a **shift & work-area picker** (three areas, shift time, shift type) with explanatory video strips. Copy moves from "A little bit about you" to "Name and gender", from "Continue" to "I accept" on the requirements, and adds inline validation.

**C. Post onboarding.** Day-one Home as a pre-shift card (date, hours, earnings range, Present/Absent) over a carousel of money-and-cover tasks and three people to call; Profile as grouped rows with one task banner; earnings as a daily breakup and a monthly statement with locked bonuses and a PAN nudge; early payout gated on bank details.

**D. Language preference.** A new six-question profile of *how she reads and talks* — languages known, a reading test with a picture answer, how she messages, customer language, app language (with a "more pictures and voice" option), and which voice Saathi speaks in — spoken aloud, answered by tapping, in her own script.

---

## Step 3 — against the expert

| Symptom | Where | Rule it breaks |
| --- | --- | --- |
| Buttons are *Continue (n/5)* · *Confirm* · *Submit* · *Proceed* · *Continue to verify* · *Getting ready* | A, B throughout; B64; B86 | `button.md` / `content.md` § 3 verbs, § 9 banned list; the count duplicates the strip (P1 one channel) |
| Red **Absent** beside green **Present** in one row | C8–C11 | P3 mirrored costly/desired pair; checklist row 14 (status colours as Buttons) |
| Location asked by the raw OS dialog, in English, three dark-green options | A12 | P5 honesty before the dialog; `permissions.md` sheet-first rule; this is *Design problem 1* in `SCOPE.md` |
| *Finding slots* is a dark loading Button with no shape of time | B17, B55, B73 | P5 duplicate-tap rule needs spinner **and** label; P1 state by two channels |
| Expert ID screen has no Button, no time left on the code, no voice | B50, B83 | P2 one next action; P5 time as a shape; P4 |
| Training-centre card is 1741 px tall: timings, documents, centre, videos, referral, two Buttons | B19–B24, B59–B70 | P1 *Related is not needed*; P2 one next action (here *Verify Aadhar* and *Go to training centre* compete) |
| "Missed Day 2" state is a red-free orange "!" but Button *Submit* and timeline tags *Missed / Completed* in red/green text only | B64 | P6 dignity ✓, but P1 state by colour-and-word only; `button.md` verb |
| Eight-up language checkbox grid with names in each own script but the question in Hindi only | D4 | P9 ✓ own script; the question must be spoken (voice bar present ✓) |
| Reading test shows a Bengali sentence under a Hindi question | D5 | P9 — fine *if* the sentence is in the language she just picked; the frame does not show the rule |
| OCR tips as a 2×2 of card thumbnails with captions *No glare / No photo copy / No half visible* | B47–B48 | P1 picture over caption ✓, but the ✕ examples carry meaning by caption; `media-capture.md` `document` already has retake tips |
| *Cooks* card describes cleaning; *Beauty* eyebrow on the cook screen; "INCONVENIECE", "goverment", "aboyt", "recieve" | A16, B54, A28, C10, C27, C2 | Copy errors to not inherit |
| Pricing numbers drift: 30,000 / 45,000 / 70,000 per month; 10,000 / 30,000 experts; ₹22,000 *Earn upto* per hood | A2, A6, B6, B8, B86 | P5 honesty — a figure needs a source |
| Both *Bangalore* and *Bengaluru* in the city list | A26 | content |
| "Earn upto ₹22,000" and "8 AM to 2 PM \| 6 hrs" per hood card, with *Full-time / Part Time* as shift types | B86–B88 | Vocabulary: *Full time / Part time* never reach her (PRINCIPLES.md table, 2026-10-01); shift is hours a day |
| Emoji 🏆 in "Jeeto Har Mahina🏆"; coin emoji glyphs in earnings rows | C11, C18 | P6 no emoji as content; `assets.md` |

What it does **right** and must be kept: one question per screen; real expert photo on every hero; five languages in their own script, the chosen one *spoken* (A4 waveform); the mascot + speaker on every form; **"I accept"** as the requirements Button (B16 — the Button is the agreement); inline, in-place errors (B11, B14, B33, B42); the *Verify Aadhaar before reaching the centre* banner; **"Important · Please carry your original Aadhar"** as a picture + one line; the Expert-ID card shape (ID above, big three digits, one line of validity); the Hub card's Map · Call · Share round trio with the address read aloud (speaker); the "Best for you" tag with a landmark on the hood row (B87 — this *is* the shipped hood row `selection-card.md` describes); the bilingual **"आगे · Next"** and the Saathi play-per-option (D10) — the voice *is* the choice; the "ज़्यादा चित्र और आवाज़" app-mode option (D8).

---

## Step 4 — tier and system map

Every screen is **Tier 2** (composition of core parts) except where marked. Names from `components/README.md`.

| Screen | Region → component · kind |
| --- | --- |
| Header shell (A, B, D) | HeaderNav `page` with Help `HeaderAction` (= shipped *Call*) + Language IconButton `translate`; ProgressBar `segmented` `S` (5) under it; VoicePrompt `bar` (the D voice bar / `Sathi-speaking-play`); mascot = illustration asset in the VoicePrompt slot |
| A1–A2 splash · promise | Scene asset; ListItem `informational` ×3 with reward assets; Button `primary L` |
| A3–A5 language | SelectionCard `compact` ×5 `single`, own script first; selected card plays = VoicePrompt inline |
| A6–A7, D1–D3 phone | Hero photo + PageIndicator (3); TextField `phone`; NumericKeypad (shipped uses OS keyboard) |
| A8–A10, B27–B33 OTP | NumericKeypad `otp` (6) with `error` (*Incorrect OTP*); Button `tertiary` **Resend code** + Timer `deadline` |
| A11, B9 steps intro | EmptyState-like scene + Heading + Button — *composition*: scene asset, Heading1, Button `primary L` |
| A12 location | BottomSheet `permission` → OS dialog (`permissions.md`) |
| A13–A15, B10–B14 about you | ListItem `navigational` (city + **Change** `tertiary`), TextField `text` with `error`, SelectionCard `rich` ×2 (gender, character asset), Accordion row → TextField (referral) with `error` |
| A16, B15 work type | SelectionCard `hero` ×3 `single`, Tag `brand` **New** |
| A17–A20 confirmations | SelectionCard `hero` `multi`, one per screen |
| B16, B54, B72 requirements | *no exact match* — pictogram pair with ticks; nearest **SelectionCard `hero` `multi`** (A17) or ListItem `informational` ×2–3 with illustration assets; Button **I accept** = `primary L` |
| B71 experience | SelectionCard `compact` ×3 `single` |
| B17, B55, B73 interstitial | Scene asset + eyebrow + Heading + ProgressButton / Skeleton `Spinner` on Button (P5) |
| B18, B74–B75, B95 pick date / time | SelectionCard `date` strip (≤ 7) or `compact` rows; the shipped list-of-days = `date` kind |
| B19–B24, B59–B70 Hub card | **training-centre card composition** (`onboarding.md` § 6b): Banner `info` top · Card `state` with Timer `deadline` (ring) · Stepper `list` (Day 1 / Day 2 with `done` / `missed`) · ListItem `informational` *Important* with pictogram · MapSnippet `hub` + ListItem rows (address with Listen, metro, bus) · IconButton trio Map / Call / Share · HowToClip `card` carousel · PromoCard (referral) · Button `primary` + `secondary` |
| B63–B65 late / missed | same card; EmptyState `error`-tone header (orange `!`), SelectionCard `date` ×3, Button |
| B68–B69 change centre | SelectionCard `rich` list with distance fact |
| B21, B78 Aadhaar intro | Scene asset (card with number circled), Banner `warning` *Stay in the app*, Button |
| B22, B79, A22 verified | Card with ListItem `informational` rows + Stat `S`; Button |
| B45–B48 OCR | **MediaCapture `document` ×2** (front / back) with `preview`, retake tips as its `fail`/tips state; BottomSheet `select` (Camera / Gallery); Accordion `faq` *How to take photos* |
| B80 driving licence | MediaCapture `document` + Button `ghost` *I don't have DL* |
| A23, B23, B81 done | Scene asset + `motion.celebrate`, Button `primary brand L` |
| A24, B32 training welcome | Avatar `L` + Heading; `onboarding.md` § 6a |
| B26 TC-less landing | Card `task` + Stat tiles — *composition*; nearest Home § 8 |
| B50, B83 Expert ID | *no match* — **nearest** HeaderNav subtitle *name + ID* + Card with NumericKeypad `otp` boxes as **display** + Timer `deadline` for validity → **Tier 3 brief** (`SCOPE.md` ask 5) |
| B84 skill test in progress | Stepper `list` with Tag per row |
| B85, B97 passed / failed | EmptyState `success` / `waiting` (yellow wash, retry glyph, Timer *30 days*) + ListItem `informational` reason + Button `secondary` **Call trainer** |
| B86–B90 shift & location | Form: ListItem `navigational` ×3 (areas / time / type) opening BottomSheet `select`; hood list = **SelectionCard `rich` · shift option** (hood over area, `map-pin` distance, landmark line, Amount trailing); B87 sheet = SelectionCard `rich` with Tag `brand` *Best for you* + speaker; B88 = SelectionCard `rich` ×2 with clock pictograms; B89 = SelectionCard `compact` ×3 with time facts; **HowToClip `guide`** strip on top |
| C8–C11 Home | HeaderNav `home` (bell · SOS · Saathi · coins); Card *first shift* with Stats + Amount range; **Present** `primary M` / **Can't come** `ghost` (not side by side — `onboarding.md` § 8); task carousel → Stepper `unordered` *Before your first shift* + Banner `info`; *Need help?* = ListItem `actionable` rows with Avatar + `phone`; BottomTabBar |
| C12–C17 Profile | HeaderNav `page`; Card `profile` (Avatar, Rating, Tag tier); Banner `info` task; ListItem `navigational` groups with Divider |
| C18–C24 Earnings | Statement (band · rows · total · `schedule`), Accordion `breakdown`, Amount `locked`; `payout.md` § 3 |
| C25–C27 Early payout | Banner `success`, Statement, HowToClip `card` row |
| D4 languages known | SelectionCard `compact` `multi`, 2 columns, own script |
| D5 reading check | *no exact match* — Card `quote` (sentence in the picked script) + SelectionCard `hero` ×3 `single` as picture answers; nearest is the training quiz (`onboarding.md` § 6a, SelectionCard `compact`) |
| D6–D9 single-choice | SelectionCard `compact` ×4 `single` |
| D10 Saathi voice | SelectionCard `compact` ×3 with a trailing **play** IconButton (VoicePrompt inline per option) + ListItem `actionable` link — a `compact` slot ask if none exists |

---

## Step 5 — what travels to contactless-gl (TIERS.md surface → base here → change)

| # | Surface | Base frame(s) | What changes for contactless |
| --- | --- | --- | --- |
| 1 | Install → OTP | A1–A10, B1–B8, B27–B33, D1–D3 | Kept as shipped; take v2's *Incorrect OTP* state and the three-slide hero. Button **Next**, keypad in-app (`onboarding.md`) |
| 2 | Already attended TC | — **no base**; nearest A28 *No males* (scene + line + **Call support**) | EmptyState `info` in that shape, one line, **Call help** |
| 3 | Intro videos | B19 *Training Videos* carousel (HowToClip `card` ×2 with play) · B87 *How it Works* strip | Lift the carousel out of the Hub card into its own screen after language; thumbnails are assets to register |
| 4 | Permission asks | A12 (raw OS dialog) | Replace with BottomSheet `permission` before the dialog (`SCOPE.md` *Design problem 1*); A12 is the evidence of what *not* to ship |
| 5–7 | Settings guide, denied path | — **no base** in any section (no denied state drawn) | From `permissions.md`; Mobbin read pending |
| 8 | Language change anywhere | header language pill on every A/B/D frame; A4 re-render in Hindi | Kept; D8 *more pictures and voice* is a new app-mode idea to raise with the stakeholder |
| 9 | Registration | B10–B14 (v2 *Name and gender* with inline errors and helper *verified with your Aadhaar*) | Base on v2, not A13; referral pre-filled = B12/B13 row collapsed |
| 10 | Gender rejection | A28 (full screen) · B42 (inline pill) · B43 (top banner) | Three shipped variants disagree — pick A28's shape (scene, one line, **Call help**); B42's inline pill is the kinder precursor (P6) |
| 11 | Work-area list | **B87** *Select preferred work areas* (rank badge, *Best for you*, distance, landmark, speaker) and B86/B90 hood rows (*Earn upto ₹22,000*) | This is the shipped hood row the tier table names; the trailing Amount reads a joining bonus, not *Earn upto*; the speaker per row is kept (P4) |
| 12 | Shift windows | B88 (Full/Part time) · B89 (Morning/Afternoon/Evening with hour ranges) | Keep B89's shape (time-of-day with hours); drop B88's *Full Time / Part Time* words (vocabulary) |
| 13–14 | Help me choose · Decide later | — **no base** (B86 has no skip) | Button `ghost` + EmptyState per `SCOPE.md` Q5 |
| 15 | Seat released | B64 *Missed … Pick a new date* (orange `!`, three dates, timeline) | Same card for a released seat: fact, way back, no red (P6) |
| 16 | No open windows | A25 *We are not live in your area yet* | EmptyState `empty` in that shape with **Call help** / **Help me choose** |
| 17 | KYC choice | **no choice screen drawn** — B21 goes straight to DigiLocker; B45 is a separate OCR path | SelectionCard `compact` ×2 with Tag *Recommended* is new; both legs exist (B21, B45) |
| 18 | DigiLocker in-app | A21–A22, B21–B22 | Kept; *Do not exit app now* → Banner `warning` *Stay in the app* |
| 19 | Aadhaar photo upload OCR | **B45–B48** | Base; drop-zones → MediaCapture `document` ×2; the 2×2 tips → its retake tips; B46's Camera / Gallery sheet kept |
| 20 | Face-data consent | — **no base** (no consent screen anywhere) | BottomSheet `confirm` per TIERS |
| 21, 41 | Live selfie + match | — **no base** in these sections (Beauty go-live G11–14 is the selfie reference) | core change ask 3 |
| 22 | Confirm Aadhaar data | A22, B22, B79 (six rows, green check) | Kept; Button becomes **Yes, that's me** + **Not me — call help** |
| 23–24 | KYC errors, 3 failures | — **no error screen drawn** for Aadhaar (only B33 OTP error) | From `error-recovery.md`; nearest shape B97 (*Try again in 30 days* + reason row + **Call trainer**) |
| 25–26 | Transition video, training home | A24/B32 welcome; B84 Stepper (*Going on / Pending*) | B84 is the module-list Stepper shape |
| 27–28 | Failed attempt, locked out | **B97** *Try again in 30 days* (reason row with *Failed* tag, retry glyph, **Call trainer**) | Direct base for lock-out; score/attempts-left are not shown anywhere |
| 30 | Completion | A23, B23, B81 | Kept with `motion.celebrate`; Button **Go to Home** |
| 31 | Certificate | — **no base** | brief |
| 32 | Joining date | B18, B95 (list of dated days) | SelectionCard `date` strip |
| 33 | Slot confirmation + change | B19 *Your Timings · Change*, B95–B96 change date + *Day 1 date changed* Banner | Same change-and-confirm loop |
| 34 | Hub screen | **B19** (centre photos, name, address, metro/bus with speaker, Map/Call/Share, *Important · carry Aadhaar* pictogram, *Verify Aadhaar before reaching* Banner, documents to carry) | Base; cut videos and referral out (P1 *Related is not needed*); Amount row for the advance is new (Q9) |
| 35 | Expert ID + rotating code | **B50 / B83** *Share Expert ID and OTP with Trainer* (#AB12456 · 5 4 2 · *Valid for today's training session*) | Shipped shape exists — but code is static for the day, no Button, no timer; the brief adds Timer `deadline`, voice, and places it on the Hub screen and Home |
| 36 | Visit started with agent | — **no base** (no agent card) | Card `state` per TIERS |
| 37 | Post-visit uniform / payment / BMI | — **no base** here (Beauty go-live G5–G8 kit Statement) | Statement |
| 38 | Work-area pending block | B84 Stepper *Pending* rows; C8 task carousel | Stepper `list` with `attention` |
| 39 | BMI fail | B97 shape (yellow, no red, one reason, **Call**) | EmptyState `waiting` |
| 40 | TnC | — **no base** (no terms screen in these sections) | Beauty go-live G9 |
| 42–43 | Uniform preview, 3 failures | — **no base** | MediaCapture `preview`; B97 |
| 44 | Day-one Home | **C8** *Welcome to Snabbit!* card (date · hours · earnings range · attendance for tomorrow) | Base; Present/Absent pair → Present + *Can't come* ghost (`onboarding.md` § 8); add MapSnippet `hotspot` row + **Show directions** (Beauty go-live G18 has *Reach hotspot by 6:30 AM · Jyoti Nivas College Gate 3.2 km · Show me the way*) |
| 45 | Call for help | C8 *Need help? Call our team* (Trainer · Team Leader · CLM) | ListItem `actionable` rows; area ops contact replaces Trainer |
| 46 | Voice reads Home | D voice bar + C8 Saathi chip in the header | VoicePrompt + `first-run.md` |
| 47–48 | Reminders | — no screen (as expected) | `notification-centre.md` |
| 49 | Progress count | 5-segment strip on every A/B/D form screen; D frames show 3/5, 4/5 states | ProgressBar `segmented` with a per-config count |

**Surfaces with no base in these sections:** 2, 5, 6, 7, 13, 14, 17, 20, 21, 23, 24, 29, 31, 36, 37, 40, 41, 42, 43, 47, 48.

---

## Step 6 — side by side / open findings

- The shipped TC-less flow (A) says "4 simple steps · 2 minutes" on screen while its progress strip, Button counts and text-layer name say 5 — `patterns/onboarding.md` already chose 5; keep the strip, drop the count.
- v2 (B) puts the **Hub before Aadhaar** for every job type ("Verify Aadhaar before reaching the centre"), while `onboarding.md` § 5–6 and the PRD put Identity before the Hub — the contactless order (work area → KYC → training → Hub) is a third order and must be drawn, not inherited (open question 8).
- v2's Expert-ID handshake (B50) is **her ID + a trainer OTP she reads out**, exactly the direction the PRD § 3.11 describes, while the Beauty go-live (G15–17) does the reverse (trainer gives her a 3-digit code) — open question 10 now has shipped evidence on both sides.
- B87's hood row ("Best for you", rank, 1.2 km, landmark HDFC Bank, speaker) is the shipped form of the `selection-card.md` shift option; the earlier v2 list (B86) uses *Earn upto ₹22,000* and *8 AM to 2 PM | 6 hrs* — two row designs in one section.
- Three different gender-rejection treatments ship on the same canvas (A28 full screen, B42 inline pill, B43 top banner); none is marked final.
- The v2 Aadhaar OCR path (B45–B48) exists in the file but not in `patterns/onboarding.md`, which only knows DigiLocker; the PRD § 3.7 assumes it.
- No frame in any section shows a permission *denied* state, a KYC error, a face capture, a consent, a certificate, terms, or an agent card — the PRD assumes all of them.
- Home C8 marks attendance *for tomorrow* ("Mark attendance for tomorrow") the night before, which is `patterns/check-in-out.md`'s *Present* step, not a new screen.
- The loose "Language preference" sub-flow (D) is a six-question profile the PRD never mentions (§ 3.4 only asks for a language switch); its *app in more pictures and voice* option and *hear Saathi's voice per language* are ideas worth an open question, and its bilingual Button label "आगे · Next" conflicts with `button.md` (one language per label, verb).
- Earnings copy on screen uses system words the vocabulary bans (*Min G*, *Winback Bonus*, *Shakti Bonus*, *Red Cards Waiver*, *Full-time*) — out of this project's scope but visible on the same Home she lands on.
- Metadata text-node names revealed stale layer copy that is not what renders ("Complete onboarding in just 5 steps!", "1.2 km from your location" on the language cards, "Please enter a valid PAN" on Aadhaar rows) — read the render, not the layer tree, when citing strings.
