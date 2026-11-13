# Reference read — *Beauty Expert Master* → page **Onboarding to Go Live + Inventory** (Beauty intro · Training · Go Live deltas · Post-logout/Profile · loose Landing screens)

Read for project `contactless-gl` only. Internal reference; never published, never traced. Format follows `references/beauty-expert-master-go-live/README.md`.

## Source table

| | |
| --- | --- |
| File | Figma *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO` · page *Onboarding to Go Live + Inventory* (`0:1`) |
| Sections read | **Beauty intro** `1:1720` (65 children: 60 phone frames + 5 label strips *Happy flow · Driving skills · Beauty skills · Smart shift · No males*) · **Training - Happy Flow** `97:52030` (31 frames) · **Go Live Flow** `97:55482` (32 frames + 1 label strip; deltas only, see § Deltas) · **Postlogout and inventory** `670:104159` (32 phone frames at depth 1; the section reports 39 children — the rest are not frames) · 7 loose *Landing screen* frames `1:6932` · `127:68181` · `127:68281` · `1:7081` · `1:7173` · `97:64773` · `97:64939` |
| Frames | 60 + 31 + 32 + 32 + 7 = **162 read**; strings swept from node names (Figma auto-names text layers with their content; instance labels — buttons, tags — read from the renders). 0 skipped. Post-logout inventory frames pl-04 → pl-26 were read from strings + the section render only, not frame by frame (one-line list, per the brief) |
| Date · reader | 2026-11-04 · Claude (Fable 5.1), for Rupam Banik |
| Shipped vs proposed | Nothing in this file is marked shipped. Frames in the *Happy flow* lane at full opacity are the designer's current intent; the 7 loose Landing screens render at reduced opacity (dimmed on canvas) — older iterations of the trainer-side skill-test screens, see § Loose frames |
| Method | `get_metadata` on each section (saved to file by the tool, parsed with Python) · `get_screenshot` on each section at native size (18 856 px), cropped per frame with PIL into `crops/` (`bi-` Beauty intro, `tr-` Training, `gl-` Go Live, `pl-` Post-logout, `landing-` loose) · the 8000-px section renders saved as `section-*.png` |
| Figma failures | One `get_screenshot` (`1:6932`) hit the Figma MCP rate limit (*tool call limit for your Full seat*); retried once after the other calls, succeeded. No other failures |
| Vocabulary note | The screens say *training centre · skill test centre · hub · cluster · micromarket · Full-time / Part Time / Smart Shift*; in prose below: Hub, Area, Hood, Shift (hours a day). Screen words are quoted verbatim |

---

## Step 1 — what is there

Shell on almost every onboarding frame: status bar · **back · title** (*Work details / Personal details / Skill test / Complete KYC*) or **back · *Sunita Rao* / *5673439* subtitle** · **Call** pill (phone icon) · **language** switcher (translate glyph + caret) · a **5-segment thin progress strip** · a Heading · content · one pink **Button** whose label often carries a count (*Continue (1/5)*). A mascot (pink-uniform expert, illustrated, waving) sits bottom-right on most form screens. The trainer-side screens (blue buttons, `12:00` status bar, no Call/language) are the **agent tool**, not the expert app.

### 1a. Beauty intro — entry, language, phone, OTP (`bi-07 … bi-12, bi-42 … bi-44`)

| # | Frame | Screen | Strings that matter | Regions |
| --- | --- | --- | --- | --- |
| bi-07 | `841:31678` | Splash | *BECOME A* · *Snabbit* · *Expert* — expert in uniform, hands folded, pink gradient | full-bleed hero, wordmark |
| bi-08 | `841:31715` | Promise | *30,000 per month* (note icon) · *Sick leaves* (bell jar) · *Insurance upto 5 lac* (shield) — expert pointing up; no button visible | three promise rows (3D reward-style icons), hero |
| bi-42 | `833:30306` | Phone, variant | *Earn upto 70,000 per month* · *Enter your mobile number* · `+91` · *We'll send an OTP to verify your number* · **Continue** (disabled) · OS keyboard | hero photo, bottom panel, TextField, Button |
| bi-43 | `833:30354` | Phone, variant | *Work in flexible shifts* (3-dot PageIndicator) · *Enter your mobile number* (speaker) · `+91 8606653178` · **Continue** | carousel hero, panel |
| bi-01 · bi-12 · bi-44 | `1:1721` · `1:3170` · `833:30383` | OTP | *Join 10,000 happy experts* (bi-44: *Join 30,000 happy experts*) · *Enter OTP* (speaker) · 4 boxes (`6 6 6 6`) · *OTP sent to 9677063716* (edit pencil) · *Resend OTP (50s)* / *Resend OTP* · **Confirm** · OS keyboard · bi-01 shows a spinner top-right | hero photo (group of experts), 4-box OTP, Button |
| bi-11 | `1:3095` | Language (English) | *Select language* · *English / English* · *हिन्दी / Hindi* · *मराठी / Marati* · *తెలుగు / Telugu* · *ಕನ್ನಡ / Kannada* — radios at right, 2-column grid · **Continue** (disabled) | speech-bubble *आ / A* hero, 5 cards, Button |
| bi-09 · bi-10 | `1:2915` · `1:3005` | Language (Hindi chosen) | *अपनी भाषा चुनें* · same five; selected card shows a **waveform** (voice playing) instead of the English name · **शुरू** | as above, voice mark on the selected card |
| bi-13 | `1:3224` | Steps intro | *Get ready to earn with Snabbit* · *Complete your profile in a few easy steps* (layer name: *Complete onboarding in just 5 steps!*) · **Start onboarding** (ProgressButton, dark) — expert climbing pink stairs to a green tick | scene, Heading, Button |

### 1b. Beauty intro — Work details / Personal details (`bi-02, bi-14, bi-32 … bi-40`, label strip *No males*)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| bi-02 | `1:1768` | Location permission over Work details | OS dialog: *Allow **Snabbit** to access this device's location?* · map-pin ring · *Precise* · **Allow** · **Only this time** · **Don't allow** (green buttons); behind: *Work details* · *A little bit about you* · *Bengaluru* · *Change* · *Gender Female / Male* · *Didn't receive? Resend OTP* · **Verified!** (green) | OS dialog, form behind |
| bi-38 · bi-39 · bi-40 | `209:47107` · `209:47218` · `209:47311` | Personal details 1/5 | *Personal details* · *Name and gender* · *Work location* **Change** (₹-glyph link) · *Bengaluru* · *Full name* `Rupam Banik` · *Your name will be verified with your Aadhaar* (bi-38 only) · *Gender* **Female / Male** as two illustrated face cards · *Have a referral code?* (bi-38: with waveform; bi-39: collapsed accordion ∨; bi-40: expanded, placeholder *eg. ERIE93S*) · **Continue (1/5)** | header, 5-strip (1 filled), ListItem-like city row, TextField, two SelectionCard-like gender cards, Accordion, Button, mascot |
| bi-35 | `209:46660` | Work details · Male chosen | *Work details* · *Name and gender* · *Bengaluru* · **Change** (pencil) · Male selected · *Have a referral code? (optional)* · **Continue (1/5)** | same |
| bi-36 | `209:46772` | *No males* — inline error | as bi-35 + a pink error strip above the button: ⓧ *We only need female experts.* · Button disabled | error strip (bottom) |
| bi-37 | `209:46870` | *No males* — toast | as bi-35 + red Toast at top: ⊘ *Please select female to continue* | Toast |
| bi-14 | `97:50106` | Type of work 2/5 | *Work details* · *Select your type of work* · *House help* · *Home cook* · *Home Salon* **NEW** (pink Tag) — three photo cards, radio at top-left, Home Salon selected · **Continue (2/5)** | 3 photo SelectionCards, Tag, Button |
| bi-32 | `841:31003` | Experience 3/5 | *Tell us your experience level as a beautician.* · *No experience/ fresher* · *0-2 years* · *2-5 years* · *>5 years* · **Continue (3/5)** (disabled) | 4 radio rows, Button |
| bi-33 · bi-34 | `841:31139` · `209:45479` | Requirements 3/5 | *Beauty* (pink Tag) · *Confirm these requirements for every job* · three round illustrations with green ticks: *I have my own smartphone* · *I can wear Snabbit uniform* · *I can travel to multiple households* · **I accept**; bi-34 adds a small waveform pill by the mascot | 3 image-tiles with tick badges, Button, mascot |

### 1c. Beauty intro — Skill test (TC) branch (`bi-06, bi-25, bi-41, bi-15 … bi-21, bi-23, bi-31, bi-18`)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| bi-41 | `777:68796` | Skill-test intro | *SKILL TEST* · *Take our skill test to join us.* · **Finding slots** (dark ProgressButton, loading) — illustration: expert doing a client's make-up | scene, Heading, loading Button |
| bi-06 | `1:2600` | Pick date | *Skill test* · *Nearest skill test centre* · **2.5 km away** (pink pill) · *Koramangala* (pencil) · *Choose a date to visit* · *7 Feb Tomorrow* (selected) · *9 Feb Tuesday* … *12 Feb Friday* · **Continue** | header, centre row, 5 date rows (radio · day number · weekday), Button, mascot |
| bi-25 | `103:5457` | Pick start time | *Select your skill test start time* · *10 AM* (selected) · *11 AM* · *12 PM* · *1 PM* · *2 PM* · *3 PM* · **Continue** | 6 radio rows, Button |
| bi-15 | `1:3885` | Skill Test Confirmed (long scroll) | header *Sunita Rao / 5673439* · blue Banner *Verify Aadhaar before reaching the centre* · ✓ *Skill Test Confirmed* · ring *Starts Friday / 10:00 AM* · *Your Timings* **Change** · *7 Feb, Friday · 10:00 AM - 5:00 PM* · *Important* · *DOCUMENTS TO CARRY* · *Aadhar card, Driving license* (ID pictograms) · *Skill test centre Details* **Change** · 3 photos · *Koramangala Skill Center* · *HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru* · *Nearest Metro BTM Layout* · *Nearest Bus stop Silk board* (speaker) · **Map · Call · Share** (3 round icon buttons) · *Training Videos* · *How to become a Snabbit Expert* · *Introduction to Snabbit* (video cards, PageIndicator) · *Refer your friend, earn ₹5,000* · **Verify Aadhar** · **View directions** (outline) | Banner, status tick + ring (Timer-like), timing card, documents card, centre card (photos, address, transit, 3 actions), video carousel, referral promo, two Buttons |
| bi-16 · bi-17 | `1:4408` · `1:4935` | Reach your skill test centre (today) | same as bi-15 with ✓ *Reach your skill test centre* · ring *Starts in / 53:43* (orange) · *Reach by 9:45 AM* · bi-17: *Aadhar card, PAN Card* · **Start skill test** (bi-17) / **Verify Aadhar** (bi-16) · **View directions** | countdown ring, same cards |
| bi-03 | `1:2013` | Complete KYC — intro | *Complete KYC* · *Keep Aadhar number ready* · *You will need your Aadhar number and phone number to get an OTP* · Aadhaar card illustration with the number circled · yellow Banner ⚠ *Do not exit app now* · **Taking u there** (ProgressButton) | header, scene, Banner, loading Button |
| bi-04 | `841:31526` | Aadhaar verified | *Training centre* (title) · ✓ *Your Aadhar is verified!* · *Name Radhika Sharma* · *Gender Female* · *Date of birth 20 Jan 1996* · *Father's name Umar kanti sikder* · *Aadhar 12** **** **** 3456* · *Address AECS Layout, Silver Springs kodihalli bangalore* · **Continue** · hidden helper layers *Please enter a valid PAN* ×6 | summary card (two groups of label/value rows), Button, mascot |
| bi-05 | `1:2553` | Add driving licence | *Complete KYC* · *Add your driving license* · *Only if you have one. You can add it later.* · DL card illustration · **Take photo** · **Upload from gallery** (outline) · *I don't have DL* (text link) | scene, three actions |
| bi-18 | `1:5992` | Verification completed | *VERIFICATION COMPLETED!* · *Get ready to show your beauty skills!!* · **Getting ready** (dark ProgressButton) — expert with *ONBOARDING COMPLETE* clipboard before a *TRAINING CENTER*, confetti, play button on the scene | celebration scene, loading Button |
| bi-19 | `97:61860` | Share Expert ID and OTP with Trainer | *Share Expert ID and OTP with Trainer* · *Your Expert ID* · *#AB12456* · *Trainer OTP* · **5 4 2** (large) · *Valid for today's training session* · no button; header: back · Call · language | two outlined cards: ID, 3-digit code |
| bi-31 | `97:63476` | Skill test in Progress | calendar icon · *Skill test in Progress* · *Beauty skills* **Going on** (pink Tag) · *Driving questions* **Pending** (grey Tag) · referral promo **Refer now** · **Logout** (disabled) | status list, promo, Button |
| bi-23 | `97:64361` | Skills list (trainer-side, blue) | *Sunita Rao / 5673439* · *Beauty skills* **Completed** (green Tag) · *Driving questions* **Start** (blue Button) · **Call expert** (outline, ₹-glyph) | list, Button |
| bi-20 | `1:6734` | Skill test passed | green top gradient · illustration (trainer with tablet, tick) · *Skill test passed!* · **Select shift area** (ProgressButton) | scene, Heading, Button |
| bi-21 | `209:47564` | Skill test failed | yellow top · *#AB12456* (top-left) · illustration (trainer with tablet, retry arrow) · *Try again in 30 days* · row ⓘ *Driving questions* **Failed** (yellow Tag) · *You said you cant ride. We require you to drive to location* · **Call trainer** (outline, phone) | scene, reason card, Button |

**Trainer-side (agent tool) frames inside Beauty intro** — blue buttons, `12:00` status bar, header *Sunita Rao / 5673439* with a 4-step blue strip: bi-22 `103:5421` / bi-24 `131:5943` *Enter OTP shared by expert for beauty skills / for driving skills* · boxes `0 2 2 |` · **Next** · OS numpad; bi-53 … bi-56 (`1217:13363` · `1219:14231` · `1219:13670` · `1219:14348`) *Ask these questions loudly* · *01 Can she currently ride a 2-wheeler?* *Never driven / Beginner / Intermediate / Professional* · *02 Is she keen to learn?* **Yes / No** (or *02 Does she have a Driving Licence (DL)?* *Have a valid DL / Have a learner's DL / Have applied for DL / Have not applied yet* · *03 Does she have a 2-wheeler?* *Already have a vehicle / Will arrange myself / Will need help arranging a vehicle / Not keen to arrange a vehicle*) · **Confirm**; bi-57 `1238:20498` *Beauty skills* · *Eyebrow Threading / Roll-on Waxing / Soft Skills* each **Pass / Fail** · *Note for Sunita* (placeholder `you@example.com`) · **Confirm**; bi-59 · bi-60 (`1238:20592` · `1238:20636`) *Has she worked with any similar companies?* *Urban company / YesMadam / Salon / Home service / None* → selected *Urban company* (edit pencil) + *Photo · Tap to take a photo* · **Confirm**; bi-49 · bi-58 (`1219:14560` · `1238:20563`) *Beauty test passed!* · *All checks cleared* · **Go home**; bi-50 `1274:78015` *Beauty test failed!* · *Ask expert to try after 30 days* · **Go home**; bi-51 · bi-52 (`1217:13334` · `1219:13913`) *Driving skills test passed!* · *All checks cleared* · **Go home**.

### 1d. Beauty intro — Shift & location, Smart shift, lunch (`bi-26 … bi-30, bi-45 … bi-48`, label strip *Smart shift*)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| bi-26 | `104:5707` | Shift & location, empty | *Sunita Rao / 5673439* · 5-strip · *Select your shift & location* · *Work area* `Select three areas` ∨ · *Shift time* `Select time` ∨ · *Shift type* `Select type` ∨ (layer: *Email Address*) · **Proceed** (disabled) | card of 3 dropdown fields, Button |
| bi-27 | `135:71133` | Work-area sheet | dark header with a **voice bar** (play · scrubber · speaker) under *Select your shift & location* · sheet: *Select preferred work areas* (speaker) · search *Search a location* · *Koramangala* **1** (numbered pink badge, selected, **Tag Title** pink tab) · *1.2 km* · *Landmark HDFC Bank* (speaker per row) · *Sony Signal* · *HSR Layout* · **Confirm**; layers behind: *Micromarket / Koramangala / 09:00 AM / Full-time*, 4 hood cards *Wipro Park · St.Bed Layout · Owner's Court* *8 AM to 2 PM · Koramangala · 8 hours · Earn upto ₹22,000* | VoicePrompt bar, search, 3 area cards with landmark line + Listen, Button |
| bi-28 · bi-46 | `1156:51112` · `1156:51868` | Shift-type sheet | *Pick a shift that suits you* (speaker) · *Full Time · 10 to 12 hours daily · Earn upto ₹22,000* · *Part Time · 4 to 6 hours daily · Earn upto ₹22,000* · *Smart Shift · 8 to 12 hours daily* (bi-46: *4 to 12 hours daily*) · *Earn upto ₹22,000* — clock-face illustrations; bi-46 selected Smart Shift expands *Select your working hours* Chips *4-6 hrs · 6-8 hrs (selected) · 8-10 hrs · 10-12 hrs* · **Confirm** | 3 rich radio cards with pictograms, Chips, Button |
| bi-29 | `135:71732` | Start-time sheet | *Select your shift start time* (speaker) · *Morning 06:00 AM to 10:00AM* (cloud-sun) · *Afternoon 10:00 AM to 03:00PM* · *Evening 03:00 PM to 05:00PM* (moon) · **Confirm** | 3 radio cards with time-of-day icons |
| bi-30 | `106:66318` | Hood list, Full-time | *Work area* `Koramangala, Indiranagar, BTM Layout` · *Shift time* `Morning` · *Shift type* `Full-time` · cards *ST Bed Layout · Koramangala (pin) · Earn upto ₹22,000 (green) · 8 AM to 2 PM | 6 hrs* ×3, first selected · **Proceed** | filter card, hood SelectionCards (radio · name · area · pay · hours), Button |
| bi-45 | `1156:51456` | Hood list, Smart Shift | same with `Smart Shift`; cards *Wipro Park · Koramangala · Earn upto ₹22,000 · 8 AM to 10 AM | 6 hrs · Break · 2 PM to 5 PM | 5 hrs* (day rail block · break · block) · *ST Bed Layout* … · **Proceed** | split-shift rail inside the card |
| bi-47 · bi-48 | `1169:52833` · `1169:52919` | Lunch | *Select your lunch duration* · *30 min · 45 min · 60 min* (Chip-like radios) · bi-48 adds *Update your shift timings* · *9 AM - 5 PM Current shift* · *8.30 AM - 5 PM Start early* 🪙 *Earn ₹50 extra* · *9 AM - 5:30 PM Work late* 🪙 *Earn ₹50 extra* · **Confirm my lunch** | 3 Chips, 3 radio cards with a yellow reward band, Button |

### 1e. Training — Happy Flow (`tr-01 … tr-31`)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| tr-18 | `97:53514` | Training advance | *Sunita Rao / 5673439* · 5-strip (3 filled) · 3D card: *Training advance* · *₹2000* · *Book your seat in training* · green strip *This amount will be adjusted with your kit* · **Pay now** | reward-style 3D card (coin + mortarboard), green Banner, Button |
| tr-19 | `718:64306` | Payment failed | red Banner ⊘ *Payment didnt go through* · *Any debited amount will be credited back to your account* · same card · **Try again** (₹ icon) | Banner, card, Button |
| tr-20 | `718:64048` | Checking payment | clock ring · *Checking your payment* · *Usually takes a minute, please dont exit* · *Amount ₹2,000* · *Payment Method UPI* | spinner, summary list |
| tr-21 | `97:53591` | Payment Successful | ✓ *Payment Successful* (green) · *₹2,000 Paid via UPI* · *Amount ₹2,000 · Payment Method UPI · Date & time 19 Aug, 2024, 9:30 AM · Transaction ID T230891234* · **Continue** | tick, summary list, Button |
| tr-17 | `97:53447` | Pick training date | *Nearest training centre* · **2.5 km away** · *Koramangala* (pencil) · *Choose a date to visit* · *7 Sep Tomorrow* … *12 Sep Friday* · **Continue** | as bi-06 |
| tr-01 | `97:52031` | Training Confirmed (long) | ✓ *Training Confirmed* · ring *Starts Friday / 10:00 AM* · *Your Timings* **Change** · day rail *DAY 1 · 2 · 3 · 4 · …* · *Threading basics · 10:00 AM - 5:00 PM* · *1 of 7 days completed* with ProgressBar (7) · *Training Centre Details* **Change** · 3 photos · *Koramangala Training Center* · address · *Nearest Metro BTM Layout · Nearest Bus stop Silk board* (speaker) · **Map · Call · Share** · *Training Videos* (2 cards) · **Start Training** (disabled) · **Call Trainer** (outline) | status + ring, day rail (Tabs-like), module card with progress, centre card, videos, two Buttons |
| tr-02 · tr-31 | `97:52191` · `713:62693` | Day 1 Training Tomorrow | ✓ *Day 1 Training Tomorrow* · *Starts tomorrow / 10:00 AM* · *Reach by 9:45 AM* · (tr-31: *Training Centres* card with **Change** inline, referral promo) · **Start Training** (disabled) · **Call Trainer** | same |
| tr-03 · tr-06 · tr-30 | `97:52355` · `97:52853` · `713:62191` | Reach the training centre (today) | ✓ *Please reach the training centre* · ring *Starts in / 53:43* (orange) · *Reach by 9:45 AM*; tr-30: ⓘ orange *Reach before 12 pm to attend your training* · *Reach by 12:00 PM* · **View directions** · **Start Training** (enabled) · **Call Trainer** | countdown ring, same cards |
| tr-04 | `97:52519` | Day 2 attendance | *Please confirm your attendance for Day 2* · **Present** (red) · **Present** (green) — two buttons side by side, both labelled *Present* (the red one is clearly meant as Absent) · day rail with DAY 1 ticked, DAY 2 current | two coloured Buttons in a row |
| tr-05 | `97:52687` | Day 2 Training Tomorrow | as tr-02 for day 2 | |
| tr-29 | `713:61939` | Missed Day 1 | ⓘ orange *Missed Day 1 Training. Pick a new date.* · *AVAILABLE DATES* · *Tomorrow 9 Feb · 10 Feb · 11 Feb* (date tiles) · **Submit** · module card *Threading basics* **Missed** (red text) | Banner-like heading, date tiles, Button, card |
| tr-07 · tr-08 | `97:53019` · `97:53040` | Personal details updated | spinner *Your personal details are being updated!* · **Login** (disabled) → ✓ *Personal details updated! Login to start Training.* · **Login** | full-screen status, Button |
| tr-11 | `97:53124` | Take a selfie to Login (sheet) | header *Take a selfie · Please ensure you are wearing the uniform.* · sheet *Take a selfie to Login* · reference photo with dashed outline · ✓ *Correct way to take selfie* · **Understood** | camera behind, instruction sheet |
| tr-10 | `97:53105` | Camera | dashed face oval + shoulders outline over live camera · round shutter | MediaCapture-like face frame |
| tr-12 | `97:53152` | Review | captured photo · **Retake** (light) · **Submit** | two Buttons |
| tr-09 · tr-13 · tr-14 · tr-15 | `97:53051` · `97:53167` · `97:53192` · `97:53217` | Trainer OTP to log in | sheet *Enter OTP* · 3 boxes · *Please ask your trainer to share the OTP with you* · **Verify OTP** (disabled → enabled → **Verifying** spinner) → confetti · ✓ *Log in Successful* · **Get Started** | OTP sheet over the selfie, celebration |
| tr-16 | `97:53397` | Share Expert ID and OTP with Trainer | as bi-19 (`#AB12456` · *Trainer OTP 5 4 2* · *Valid for today's training session*), header back · Call · language | two cards |
| tr-22 · tr-23 | `97:53642` · `97:53698` | Day 1 Training in Progress | ✓ *Day 1 Training in Progress* · day rail · *Threading basics* **In Progress** (pink) · *10:00 AM - 5:00 PM* · *1 of 7 days completed* · referral promo · **Logout** (disabled → enabled) | status, module card, promo, Button |
| tr-24 · tr-25 · tr-26 · tr-27 | `841:32199` · `841:32515` · `841:32831` · `841:33147` | Logout OTP | sheet *Enter logout OTP* · 3 boxes · *Please ask your trainer to share the OTP with you* · **Verify OTP** → **Verifying** → ✓ *Log out Successful* · **Continue** | OTP sheet, success sheet |
| tr-28 | `97:54679` | Certification Screen | beauty-scene hero · *CONGRATULATIONS!* · *You're Snabbit Beauty Expert!* · gold certificate card: *CERTIFICATE OF COMPLETION* · gold medal · *This is proudly presented to* · **Maya Patel** (gold script) · *COMPLETED 8 Feb 2026 · CENTRE Koramangla · DURATION 7 Days* · *Snabbit* signature · **Download Certificate** (download icon) · **Continue** (outline) | hero, certificate card (name · date · centre · duration), two Buttons |

### 1f. Go Live Flow — deltas since 2026-09-22

The September read listed 19 frames; the section now has 32 phone frames. Only **5 of the 19** survive by id (`97:55844` date · `97:61143` weekly off, renamed *Sunday shift start time* · `97:56526` Hub · `97:56590` Terms · `97:55483` Congrats). Everything else was replaced.

| Change | Frames | What is there now |
| --- | --- | --- |
| Removed | `135:73283` · `135:73369` (Earn more on Sunday pills) · `135:73464` · `135:73825` (Confirm shift) · `97:57379` Kit · `97:57472` Confirmation · `97:57506` EMI · `97:56233` · `97:57225` · `97:57244` · `97:57210` Selfie · `97:57275` · `97:57329` · `97:57354` OTP | gone from the section |
| Sunday hours → stepper (label strip *ONLY FOR SMART SHIFT - SUNDAY SELECTION*) | gl-29 `1169:53323` · gl-30 `1332:78512` · gl-31 `1169:53384` · gl-28 `1169:53206` · gl-04 `1169:53529` | *Earn more on Sunday* · **−** · *+2 hours* · **+** · 🪙 *Earn ₹3,000 extra* (yellow pill with coin emoji) · **Add 2 hours** · **I dont want to work extra** (outline) → *Start time on Sunday* · *8:00 AM Till 8:00PM* (selected) · *9:00 AM Till 8:00PM* · *8:00 AM Till 5:00PM* · *7:00 AM Till 3:00PM* · **Continue**; date of joining and weekly off duplicated below the strip (weekly off adds blue Banner *Fri, Sat and Sun unavailable*) |
| Confirm shift timings → one card | gl-12 `591:81901` | *Confirm your shift timings* · pin *Wipro Park, 2nd Block Kormangala* (pencil) · blue band *Monday to Sunday* · *10:00 AM to 8:00 PM / Start time - End time* · *10 hours / Working hours* · *Monday / Weekly off day* · *Estimated Monthly Earnings ₹35,000* · *Joining Bonus +₹1,000* (green) · **Continue** |
| Shift & location copied in from Beauty intro | gl-13 … gl-16 (`591:82057` · `1156:52489` · `591:82442` · `591:82605`) | identical to bi-27 · bi-28 · bi-29 · bi-30 |
| Kit → tiles + checklist, then *All items*, then pay | gl-07 · gl-08 `557:74120` · `591:83110` · gl-11 `557:74743` · gl-09 `557:75292` · gl-10 `557:77450` · gl-17 `726:64554` | *Your beauty kit* · tiles *Items / 64 items* (pink) · *1 Bag / 5 pouches* · *2 Uniforms / Size M* · *Please select to confirm* · ☐ *All 34 tools are in the bag* · ☐ *I have my snabbit bag* · ☐ *I have 2 uniform in my size* · ☐ *I machines witch on and work* · **Continue** (enabled only when all four ticked) → *All items* · *Facial 20 · Facial cream 10 · Aloe vera gel 10 · Sunscreen 10 · Gloves 10 · Body 25 · Moisturizer 15 · Body scrub 12 · Body lotion 18 · Bath salts 8 · Hair 30 · Shampoo 12 · Conditioner 12 · Hair mask 20 · Hair oil 15* → *Pay for your kit* · pink band *Kit price ₹22,500 ~~₹25,000~~* · ✓ *₹2,000 paid · ₹20,500 left* (ProgressBar) · *Next payment* · ✓ *₹2,000 Paid / Training advance* · ○ *₹3,000 / Go live advance* · **Pay ₹3,000** → (gl-10, 976 tall) *₹5,000 paid · ₹18,500 left* · *Deducted from your payout* · *15 FEB February payout −₹3,624* … *15 JUL July payout −₹3,624* · *6 cuts • 12% interest included ₹21,744* · **I agree** → *Payment Successful · ₹3,000 Paid via UPI* (list shows *Amount ₹2,000* — a copy slip) · **Continue** |
| Hub | gl-05 `97:56526` (kept) | *Your hub location* · *Your hub is where you you pick creams and waxes. and meet your team lead.* · *Your Cluster Powai* · 4 photos (+4) · *R-City Mall* · *278, 5th Cross Road, 10th Main Road, 8th Block, Koramangala 560095, Bengaluru, Karnataka, India* · **MAPS** (icon) · **Proceed** — no Call pill in this header |
| Terms | gl-06 `97:56590` (kept) | *Term and conditions* · *Please read and understand* · full legal text · **Decline** (outline) · **Accept** |
| Selfie moved to the **trainer's phone**; *Enhanced* image added | gl-21 `775:13921` · gl-23 `775:14145` · gl-24 `775:14164` · gl-26 `775:14224` · gl-22 `775:14117` · gl-27 `775:14233` · gl-20 `796:69370` · gl-19 `796:69350` | trainer-side (blue): sheet *Take clear image of expert in Snabbit uniform* · *This will be their ID card picture* · **Take selfie** → header *Take expert photo · Please ensure they are wearing the uniform.* · dashed face + shoulders oval · shutter → ⚠ *Your uniform is not visible* · reference photo ✓ *Correct way to take selfie* · **Retake Photo** → spinner *Image is being enhanced!* → *Actual* | *Enhanced ✦* side-by-side photos · **Retake** · **Submit** → ✓ *Image updated!*; expert-side (pink): spinner *Your image is being updated!* → ✓ *Image updated!* |
| ID handshake now in go-live | gl-18 `796:69300` | *Share Expert ID and OTP with Trainer* · *#AB12456* · *Trainer OTP 5 4 2* · *Valid for today's training session* (`12:00` status bar, header *Sunita Rao / 5673439*) |
| BMI check (trainer-side) | gl-25 `775:14195` | *Enter OTP shared by expert to start BMI check* · `0 2 2 |` · **Next** — the only BMI screen in the file; no result screen |
| Congrats | gl-01 `97:55483` (kept) | unchanged from the September read |

### 1g. Postlogout and inventory — onboarding-adjacent frames

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| pl-27 | `670:102572` | **My Profile** | *Profile* · Avatar (empty) · *Reema Saju* · *#SNAB2413* · ★ *4.2* · band *STAR EXPERT* **View tier ›** (gold) · *Earnings & Payments* · *Monthly earnings ₹24,000 ›* · *Payout history ›* · *Early Payout* **NEW** *›* · *Inventory ›* · *Shift & Availability* · *Request overtime ›* · *Apply leave ›* · bottom tabs *Home · Earnings · Refer (₹4000 badge) · Profile* | profile card (Avatar · name · ID · rating · tier band), two grouped ListItem lists, BottomTabBar. **No documents, certificate, uniform or kit row** |
| pl-32 | `670:103865` | Home *With All Nudges* (day-one Home) | header *SOS · Saathi · Silver · 30* · card *Welcome to Snabbit!* (expert photo) · *7 FEB Tuesday · 7:00 AM - 12:00 PM* · *Earning Potential ₹800 - ₹1000* · ring *LOGIN WITHIN 4:23* · **Login** · *Your Hotspot · Jyoti Nivas College Gate · 3.2 km away* · **Map** · *You are a Silver expert now ›* · *Watch how to increase your speed to get 5 stars · 2 mins* **Watch now** · *Delivery update · Your order is on the way · Arrives Wed, 9th feb* **Track** · promos *Free Gold Coin · Spin the Wheel · Saheli lao, saath mein ₹15,000 tak kamao · Saheli lao, gold coin ghar le jao! · This Ganesh Chaturthi, Win Exciting Rewards! · Invite via WhatsApp · Gold Coin @₹0 · Claim now* | first-shift card with a countdown ring, hotspot row, nudges, promo carousel |
| pl-01 · pl-02 | `628:98061` · `628:98501` | Home during/after shift | map · *Shift ends at 6:00PM* **Logout** · *Delivery update · Your order is on the way · Arrives Wed, 9th feb* **Track** · *More From Snabbit · Refer and earn upto ₹4000* **Refer Now** · sheet *Mark tomorrow's attendance · Tuesday, 7 February · 7:00 AM - 12:00 PM* · **Absent** (red) · **Present** (green) | map Home, attendance sheet |
| pl-03 | `628:98827` | Post Logout — Earnings | *Logout Successful* · *Present · Full Shift · Shift Timing (5h) 7:00 AM - 12:00 PM · Login Time 6:40 AM · Logout Time 11:50 AM* · *Daily Earnings ₹530 · Min G ₹500 · Base Pay ₹390 · OT ₹0 · Gold Coins 3 ₹30 · Red Cards 0 ₹0* · *Bonus Progress · Shakti Bonus ₹1,000 ₹2,000 ₹3,000 · 10 Full Shifts done · 1 Sunday Full Shifts done · 4.65 Ratings achieved · Joining Bonus ₹2,500 · 7 Full Shifts done · Winback Bonus ₹2,500 · Vishwaas Bonus ₹1,580 · Last updated on 12 March 8:05 PM* | shift statement, bonus trackers |

Inventory and post-logout, one line each (not onboarding): pl-04 · pl-05 · pl-12 · pl-13 `628:100204` · `1082:36939` · `628:100304` · `628:101278` *Refill your bag* (red-card warning *One red card if missing items −50*, *FACIAL / PEDICURE & MANICURE* checklists, *Facial cream Qty: 2*, **Done / Done adding**, **Report missing items**) · pl-06 … pl-11 `1073:21600` · `1082:21964` · `1082:22175` · `1082:22314` · `1082:36499` · `1082:36700` *Report missing item* (category lists with quantity steppers, *Send a message to customer*; two frames carry a stray *Work Full Time · Earn ₹20K - ₹30K / month* card) · pl-14 · pl-15 `628:100406` · `628:100501` *Check pouch · Please check your pouches · Is everything in each pouch?* (kit-by-pouch sheet) · pl-16 `628:100906` *All set for tomorrow! · Your bag is ready* · pl-17 … pl-21 `628:101476` · `628:101506` · `628:101556` · `628:101606` · `1082:36902` *Report an issue · Enter some details → Ticket submitted! / Request submitted! · Our team will contact you soon* · pl-22 · pl-23 `628:101715` · `628:101879` *Inventory · Weekly refills · Delivery status Out for delivery / Order Placed · Expected on 23rd Feb · 34 items · Total cost ₹18,000 · ₹18,000 will be deducted from your next payout* · pl-24 `628:102043` *Nothing to refill* · pl-25 `628:102094` *Orders · In your bag · 2 FEB - 8 FEB · Placed › Packed › On the way › Delivered · Items (24) · Mark as received?* · pl-26 `628:102278` *Your inventory has been updated · ₹1,000 will get deducted from next month's payout* · pl-28 · pl-29 `670:102892` · `670:103162` *Inventory · Orders / Live inventory / Weekly refills* (Tabs; order rows *2 Feb - 8 Feb · On the way / Delivered · 34 items · ₹1,240*, **See all**) · pl-30 · pl-31 `670:103260` · `670:103405` *26 Feb - 1 Mar · Delivery status Delivered / On the way · Delivered on 21st Mar, 2026 / Expected on 22nd Mar, 2026 · Total cost ₹18,000 · 21 items · Facial kit ₹800 • 5 units ₹4,000 …*.

### 1h. The seven loose *Landing screen* frames (outside any section, dimmed on canvas)

| Frame | What it is |
| --- | --- |
| `1:6932` | Trainer-side *Beauty skills* — *Eyebrow Threading / Roll-on Waxing / Soft Skills* **Pass / Fail** · *Note for Sunita* · **Confirm** (older copy of bi-57) |
| `127:68181` | Trainer-side *Beauty test passed! · All checks cleared* · **Go home** (older copy of bi-49) |
| `127:68281` | Trainer-side *Driving skills test passed! · All checks cleared* · **Go home** |
| `1:7081` · `1:7173` | Trainer-side *Ask these questions loudly* — older question set: *01 Does she know how to ride a scooty* **Yes / No** · *02 You have your own scooty?* · *03 Ready to rent a scooty?* · *04 Any service you aint comfortable wid?* *Cool with everything / Not cool with everything* · **Confirm** / **Confirm weight** (`1:7173`) — the only mention of a weight check in the file |
| `97:64773` · `97:64939` | Trainer-side *Has she worked with any similar companies?* list → *Urban company* chosen + *Photo · Tap to take a photo* (older copies of bi-59 · bi-60) |

They are iterations superseded by the *Driving skills* and *Beauty skills* lanes inside Beauty intro; nothing in them is onboarding for the expert app.

---

## Step 2 — what it is trying to do

**Entry (splash → promise → phone → OTP → language → steps intro).** Sell the job in three promises, get a number verified, pick a language, promise a short profile. Two different headline numbers for the same step (*Join 10,000* vs *30,000 happy experts*; *30,000* vs *70,000 per month*) are A/B copy, not two screens. The language screen speaks the chosen language back (waveform on the selected card) — the first voice moment.

**Work / Personal details (1/5 → 3/5).** Three questions in three screens: who she is (city auto-filled, name, gender, optional referral), what work (three photo cards; Beauty is *NEW*), how experienced, and three yes-pictures she must accept. Beauty is female-only; the *No males* lane tries two ways to say so (inline strip vs toast).

**Skill test (Beauty's TC).** Beauty onboarding sends her to a Hub for a skill test before training: pick centre/date/time, a long confirmed card (timer, documents, centre, transit, videos), KYC (DigiLocker with the *Do not exit* banner, then verified summary, then an optional driving-licence photo), then at the Hub she shows an **Expert ID + 3-digit code** which the trainer types into the agent tool; the trainer runs the test (pass/fail per skill, driving questions, prior-company photo) and the app shows pass → *Select shift area* or fail → *Try again in 30 days · Call trainer*.

**Shift & location.** After passing: choose up to three areas (voice bar and a Listen per area, landmark line), shift type (Full/Part/Smart with hours and *Earn upto*), start time (Morning/Afternoon/Evening), then the hood list filtered by those, with the pay and hours per card; Smart Shift shows a split day rail. A lunch-duration step with *Earn ₹50 extra* for shifting the hours.

**Training (7 days at the Hub).** Pay a ₹2,000 *Training advance* (fail / checking / success), pick a date, then one living card for the whole week: status heading + ring (date → countdown), day rail, today's module with *x of 7 days* progress, centre details, videos, **Start Training / Call Trainer**. Each day: selfie-to-login → trainer's 3-digit OTP → *Log in Successful*; later *Logout OTP* → *Log out Successful*. Missed day → pick a new date. End: certificate (name, date, centre, duration) with **Download Certificate**.

**Go Live (deltas).** The kit stage is now tiles + a four-box checklist + *All items* + a *Pay for your kit* band with the ₹2,000 and ₹3,000 advances and a payout-deduction schedule she agrees to. Sunday extra hours became a ± stepper with a coin pill. The selfie is now taken **by the trainer on the trainer's phone**, auto-*Enhanced*, and the expert's app just shows *Image updated!*. A BMI check starts from an OTP she reads to the trainer.

**Profile / Home.** Profile shows name, *#SNAB…* ID, rating and tier, and money/shift rows — no documents, certificate or kit. The day-one Home card has the shift, earning potential, a *LOGIN WITHIN* ring, the hotspot with distance and **Map**.

---

## Step 3 — against the expert

| Symptom | Where | Principle / spec it breaks |
| --- | --- | --- |
| Buttons say *Continue (1/5) · Continue · Proceed · Confirm · Submit · Understood · Taking u there · Getting ready · Finding slots · Next · OK-shaped labels* | nearly every frame | `content.md` § 3 verbs, § 9 banned list; `button.md` (no counts in labels — the strip carries progress) |
| Progress strip never says the count; *(2/5)* sits in the Button instead | all onboarding frames | P5 — one channel for progress (`patterns/onboarding.md`) |
| OS location dialog is in English with three green buttons; nothing before it says why | bi-02 | P5, P7; `patterns/permissions.md` (benefit sheet first, then the dialog); this is *Design problem 1* in `SCOPE.md` |
| *We only need female experts.* / *Please select female to continue* — a rejection after she has typed her name, in a red Toast | bi-36 · bi-37 | P6 dignity, `error-recovery.md` (reason + way out, never a dead end with a disabled button); open question: ask gender first |
| Two coloured Buttons side by side, both labelled **Present** (red + green) | tr-04 | P3 mis-tap; `patterns/onboarding.md` § 8 (Present / Can't come never side by side); copy error |
| Trainer-side screens live in the same lane, with blue buttons, `12:00` status bar and *you@example.com* placeholders | bi-22 … bi-24, bi-49 … bi-60, gl-21 … gl-25, loose frames | not the expert's app (SCOPE.md open question 1: expert app only); must not leak into the build |
| Legal wall with **Decline / Accept** | gl-06 | P1, P9; `bottom-sheet.md` `confirm`; the September translation (five plain rows + **I agree**) still stands |
| Coin emoji pills (*🪙 Earn ₹50 extra*, *🪙 Earn ₹3,000 extra*) and emoji-style 3D icons on the promise screen | bi-48, gl-29 · gl-30, bi-08 | `assets.md` — rewards are registered assets, never emoji; `content.md` numbers first |
| Checklist line *I machines witch on and work*; *Taking u there*; *didnt*; *Marati*; *Koramangla*; *Kormangala*; *Aadhar* | gl-07, bi-03, tr-19, bi-11, tr-28, gl-12 | `content.md` — copy is unproofed; quote, do not reuse |
| Money disagreement: *Payment Successful ₹3,000 Paid via UPI* over a list that says *Amount ₹2,000* | gl-17 | P5 honesty; `statement.md` one shape for money |
| Certificate is a gold-foil card with a script name and a medal; *Download Certificate* only, no share, no place it is kept | tr-28 | `assets.md` (a reward may be metallic — but one asset, one meaning; the medal and the card are two); PRD § 3.9 wants share + stays in the app; Profile (pl-27) has no row for it |
| *Image is being enhanced!* → *Actual | Enhanced ✦* with no line saying what changed, and only the trainer sees the pair; the expert sees *Image updated!* | gl-22, gl-19 | P5 honesty — she must see and may refuse the generated photo (SCOPE.md open question 11) |
| Expert ID + 3-digit code shown as static text with *Valid for today's training session*; no timer, no refresh, no Listen | bi-19 · tr-16 · gl-18 | P1 (number first is right), P5 (how long is it valid?), P4 (spoken) — the base for surface 35 but missing the rotating state |
| Long confirmed cards (bi-15, tr-01: ~1,700 px) stack status, timings, documents, centre, transit, videos, referral and two Buttons on one scroll | bi-15 … bi-17, tr-01 … tr-06 | P2 one next action; `patterns/onboarding.md` § 6b already composes this as MapSnippet + Timer + ListItems + two Buttons and drops the videos/promo |
| Countdown ring *53:43* / *4:23* for a reach-by time, draining | bi-16, tr-03, pl-32 | `timer.md` — a time she plans around is a `deadline`, a draining ring only on the day inside the last hour |
| *Nearest skill test centre · 2.5 km away · Koramangala* with a pencil — the centre is editable through a tiny icon | bi-06, tr-17 | P3 target size; `list-item.md` navigational with **Change ›** |
| Header is three different shells (title · Call · language / name + ID · Call · language / name + ID · language only / bare back + voice bar) | across sections | `header-nav.md` one shell; the September decision keeps name + ID (support identifies screenshots) |

**What it does right and must be kept:** one question per screen in Work/Personal details; the real expert in uniform on every hero; the language picker speaks the selected language; the voice bar and per-row Listen on the area sheet; the yes-pictures (smartphone · uniform · travel) as image tiles; *Earn upto ₹22,000* and hours on every hood card (numbers first); the training week as one living card with a day rail and *x of 7 days*; the ID + code handshake as two big numbers; the Hub card with photos, address, transit and Map/Call/Share; the honest payment ladder (fail → *Try again*, checking → *please dont exit*, success with the transaction ID); *Add your driving license — only if you have one. You can add it later* with **I don't have DL** as a plain exit; the day-one Home card with hotspot + distance + **Map**.

---

## Step 4 — tier and system map

All Tier 2 compositions of core parts unless marked. Names from `components/README.md`.

| Frame · region | Is |
| --- | --- |
| all · header | `HeaderNav page` (title) or `HeaderNav default` (name Title + ID Caption subtitle) · trailing `HeaderAction` Help (headset — Call = Help) + `IconButton translate` |
| all · 5-segment strip | `ProgressBar segmented` `S`, count per variant |
| all · voice bar (bi-27 … bi-29, gl-13 … gl-15, gl-21) | `VoicePrompt bar` |
| all · mascot | illustration asset (character) — register in `assets.md`; not a component |
| all · bottom Button(s) | `Button primary brand L`; secondary outline = `Button secondary L`; text link (*I don't have DL*) = `Button ghost` |
| bi-07 · bi-08 splash, promise | scene asset + `ListItem informational` ×3 with reward assets (`onboarding.md` § 0) |
| bi-42 · bi-43 phone | hero + `PageIndicator` + `TextField phone` + `NumericKeypad` (`onboarding.md` § 2) |
| bi-01 · bi-12 · bi-44 OTP | `NumericKeypad otp` (4 here; spec says 6) · *Resend OTP (50s)* = `Button tertiary` + `Timer deadline` |
| bi-09 … bi-11 language | `SelectionCard compact` ×5, two columns; the waveform = `VoicePrompt` inline on the selected card |
| bi-13 steps intro | full-screen intro: scene asset · Heading1 · `Button` (`onboarding.md` § 3) |
| bi-02 OS dialog | OS — preceded by `BottomSheet permission` (`patterns/permissions.md`) |
| bi-35 … bi-40 city row | `ListItem navigational` + `Button tertiary` **Change** → `BottomSheet select` |
| · name | `TextField text` with helper |
| · gender cards | `SelectionCard rich` ×2 `single` with the character asset |
| · referral | `Accordion` row → `TextField` (collapsed row, `onboarding.md` § 3) |
| · *We only need female experts.* strip / toast | `Banner error` inline (not Toast) — but see Step 5: the shape is `EmptyState info` on its own screen |
| bi-14 type of work | `SelectionCard hero` ×3 `single` + `Tag brand` **New** |
| bi-32 experience | `SelectionCard compact` ×4 `single` |
| bi-33 · bi-34 requirements | `SelectionCard hero` `multi` ×3 (image is the target; tick badge = `Checkbox` state) — one per screen per `onboarding.md` § 4 |
| bi-06 · bi-25 · tr-17 pick date / time | `SelectionCard date` strip + `Button tertiary` *Show more dates ›*; time = `SelectionCard compact` radio rows; the centre row = `ListItem navigational` (`map-pin`, distance as `Tag neutral`) |
| bi-15 … bi-17 · tr-01 … tr-06 confirmed card | the **training-centre card composition** (`onboarding.md` § 6b): `Card state` header (tick + `Timer deadline` `L`) · `ListItem informational` rows (date/time, *Reach by*) · documents row with ID pictograms · `MapSnippet hub` + address `ListItem` with Listen · transit rows · `IconButton` ×3 (Map · Call · Share → **Show directions** `secondary` + **Call trainer**) · day rail = `Tabs segmented`-like day strip (no exact match — nearest `Stepper list` horizontal; inherits `SelectionCard date` tile anatomy) · module row = `ListItem` with `Tag` + `ProgressBar linear` *1 of 7* · videos = `HowToClip card` ×2 + `PageIndicator` · referral promo = `PromoCard` |
| bi-03 KYC intro | scene asset + `Banner warning` *Stay in the app* + `ProgressButton` (`onboarding.md` § 5) |
| bi-04 Aadhaar verified | summary `Card` with `ListItem informational` label/value rows (`onboarding.md` § 5) |
| bi-05 driving licence | `MediaCapture document` entry: scene + **Take photo** `primary` + **Upload from gallery** `secondary` + *I don't have DL* `ghost` |
| bi-18 · bi-20 · tr-07 · tr-15 · tr-27 · gl-19 success screens | `EmptyState success` (scene/tick · Heading · one Button) with `motion.celebrate` where confetti is drawn |
| bi-21 skill test failed | `EmptyState error` + `ListItem` reason row with `Tag warning` + **Call trainer** `secondary` |
| bi-31 skill test in progress | `Stepper list` (two steps with `Tag` states) |
| bi-19 · tr-16 · gl-18 Expert ID + code | **no match** — nearest: `Card static` with `Stat L` (ID) + `NumericKeypad otp` boxes as display (3) + Caption; inherits `header-nav` subtitle for the ID. → Tier 3 brief (surface 35) |
| bi-26 · bi-30 · bi-45 filter card | `Card static` with three `TextField select` rows (→ `BottomSheet select` each) |
| bi-27 area sheet | `BottomSheet select` with `TextField search` + `SelectionCard rich` rows (hood title · distance `Tag` · *Landmark* description · `IconButton speaker`), numbered `Badge` for order |
| bi-28 · bi-46 shift-type sheet | `BottomSheet select` with `SelectionCard rich` ×3 (pictogram trailing, Amount `S` *Earn upto*) + `Chip choice` ×4 inside the selected card |
| bi-29 start-time sheet | `BottomSheet select` with `SelectionCard rich` ×3 (icon trailing) |
| bi-30 · bi-45 hood list | `SelectionCard rich` · shift option form (shipped 2026-10-01: hood over area + `map-pin` + trailing pay slot; day rail block · break · block) — exact match |
| bi-47 · bi-48 lunch / timings | `Chip choice` ×3; `SelectionCard rich` ×3 with Amount `S` *+₹50* (not a yellow band) |
| tr-18 · tr-19 training advance | `Statement` band *Training advance ₹2,000* + `Banner success` line + `Button` **Pay ₹2,000**; the 3D card = reward asset (register or drop) · fail = `Banner error` + **Try again** |
| tr-20 · tr-21 · gl-17 payment states | `Skeleton`/`Spinner` with the 3-second rule → `EmptyState success` + `Statement` rows (Amount · Method · Date · Transaction ID) |
| tr-04 attendance | `Button primary` **Present** + `Button ghost` **Can't come** above it (`onboarding.md` § 8) |
| tr-29 missed day | `Banner error` + `SelectionCard date` ×3 + **Pick this date** |
| tr-10 … tr-12 · gl-23 · gl-24 selfie | `MediaCapture face` with `fail` (*uniform not visible*) and `review` (Retake / Submit) states |
| tr-09 · tr-13 · tr-14 · tr-24 … tr-26 trainer OTP sheets | `BottomSheet form` with `NumericKeypad otp` (3) + `ProgressButton` **Verifying** |
| tr-28 certificate | **no match** — composition: `Card` with Avatar · Heading2 name · `Stat S` ×3 (completed · centre · duration) · `Tag` ID; **Share on WhatsApp** `primary` + **Save** `secondary`; the gold card/medal = one reward asset (`assets.md`) → Tier 3 brief if the composition cannot carry it (surface 31) |
| gl-07 · gl-08 kit tiles + checklist | `Stat M` ×3 in a row (or `Statement` band) + `ListItem selection` ×4 with `Checkbox` (`references/beauty-expert-master-go-live/BUILD.md` G5–G6) |
| gl-11 all items | `Statement` groups (category band with count · rows with quantity) |
| gl-09 · gl-10 pay for your kit | `Statement` band (price · struck list price) + `ProgressBar linear` paid/left + `Stepper list` (advance 1 paid · advance 2 due) + `schedule` panel with date tiles (`statement.md` § `schedule`) + **Pay ₹3,000** / **I agree** |
| gl-12 confirm shift timings | `ListItem navigational` (pin) + `Card static` with `ListItem informational` ×3 + `Statement` band (*About ₹35,000 a month* · *Joining bonus +₹1,000*) — as BUILD.md G4 |
| gl-29 · gl-30 Sunday stepper | `Stepper` is a different thing here; this is a quantity control — nearest `NumericKeypad`? no — **no match**: use `SelectionCard rich` ×3 (*+2 h · +4 h · usual hours*) with Amount `S` as BUILD.md G2 instead of a ± control |
| gl-31 Sunday start time | `SelectionCard compact` ×4 with trailing *Till 8:00 pm* Caption |
| gl-05 Hub | `MapSnippet hub` + `ListItem` rows (area, address with Listen) + photos row + **Show directions** `secondary` — BUILD.md G8 |
| gl-06 terms | `ListItem informational` ×5 numbered + *Read the full terms ›* + `Button` **I agree** / **I don't agree** — BUILD.md G9 |
| gl-22 Actual / Enhanced | `MediaCapture preview` with two images side by side + a line *Uniform added by Snabbit* + **Use this photo** / **Retake** — needs the `preview` *generated* state (ask of core) |
| gl-25 BMI OTP | trainer-side; on the expert's side the same ID card (surface 35) is the input |
| pl-27 Profile | `HeaderNav page` · profile `Card` (Avatar `L` · Title · ID Caption · `Rating` · tier band = `AchievementBadge` + `ListItem navigational` **View tier**) · grouped `ListItem navigational` lists with `Tag brand` **New** · `BottomTabBar` |
| pl-32 day-one Home card | `Card` *Your first shift*: date `Stat` · time `Stat` · `Amount` range · `Timer deadline` (not a draining ring) · **Present**; hotspot row = `ListItem navigational` with `MapSnippet hotspot` + **Show directions** (`onboarding.md` § 8) |
| pl-01 · pl-02 attendance sheet | `BottomSheet confirm` — **Present** `primary` + **Can't come** `ghost`, never red/green side by side |

---

## Step 5 — what travels to contactless-gl

| Surface (TIERS.md) | Base frame(s) here | What changes for contactless |
| --- | --- | --- |
| 1 deep link → OTP | bi-07 · bi-08 · bi-42/43 · bi-01/12/44 · bi-11 | Keep the order (splash · promise · phone · OTP · language); OTP on the `NumericKeypad otp` with 6 boxes, not the OS keyboard (`onboarding.md` § 2); one headline number, not two (P5) |
| 2 already attended TC | — | **no base**; `EmptyState info` + **Call help** |
| 3 intro videos | bi-15/tr-01 *Training Videos* carousel (`HowToClip card` ×2 + PageIndicator); bi-18's play button on the scene | The carousel becomes the *Get to know more* screen on its own (≤5 cards → `player`), skippable with **Next**; thumbnails are assets to register |
| 4 permission asks | bi-02 (the OS dialog, nothing before it) | Insert `BottomSheet permission` before the dialog, one per screen, spoken; the dialog itself cannot change — Design problem 1 |
| 5 · 7 settings guide / denied | — | **no base** in this file (no denied state drawn anywhere) |
| 8 language change | header language switcher on every frame; bi-09/10 waveform | Keep the IconButton `translate` → `BottomSheet select`; keep the spoken-language mark on the selected card (P4) |
| 9 registration | bi-38 … bi-40 (name · city · gender · referral), bi-14 (type of work), bi-33/34 (requirements) | Same four fields; gender asked **first** so a male never types his name before the rejection; referral pre-filled from the link → row hidden; type of work is fixed by the link (House Help pilot) so bi-14 is skipped; requirements as `SelectionCard hero multi`, one per screen |
| 10 gender rejection | bi-36 · bi-37 | Not a strip or Toast on a disabled form: its own `EmptyState info` with the reason in her words and **Call help** (P6, `error-recovery.md`) |
| 11 work-area list | bi-27 (area sheet) + bi-30/bi-45 (hood cards) | Keep the landmark line and the per-row Listen; the trailing pay slot reads *₹2,000 joining bonus* as Amount where configured; *Near your home* as the list heading; no *Micromarket* word (open question 7) |
| 12 shift windows | bi-28/29 (type, start time) + bi-45 (split rail) | Hours a day and times, never *Full-time / Part Time / Smart Shift* words on screen (vocabulary); full windows hidden, not greyed |
| 13 · 14 · 16 Help me choose · Decide later · nothing nearby | — | **no base** (bi-26 only shows a disabled **Proceed**); per open question 5 |
| 15 seat released | — | **no base** |
| 17 KYC choice | bi-03 (*Keep Aadhar number ready*) | Keep the intro scene; add the two-card choice (DigiLocker `Recommended` · Aadhaar photo) under it |
| 18 DigiLocker in-app | bi-03 Banner *Do not exit app now* → bi-04 verified Card | Keep as `onboarding.md` § 5; Button **Start …** not **Taking u there** |
| 19 Aadhaar photo OCR | bi-05 (driving licence entry: Take photo · Upload · I don't have) | Same entry shape for Aadhaar front/back with `MediaCapture document`; no *Upload from gallery* for KYC if liveness matters (open) |
| 20 face consent | — | **no base**; `BottomSheet confirm` |
| 21 live selfie + match | tr-10 … tr-12 (expert selfie with dashed oval, Retake/Submit) | Keep the oval and the review step; drop the uniform requirement at KYC (she has no uniform yet); add *live* / *matched* result states (ask of core) |
| 22 confirm Aadhaar data | bi-04 | Keep the label/value Card; add **Yes, that's me** / **Not me — call help** |
| 23 · 24 KYC errors / 3 failures | bi-21 (fail with reason row + **Call trainer**) | Shape travels: `EmptyState error` + reason row + **Call help**; *Do it at the Hub* `ghost` for the final rung |
| 25 transition video | bi-18 (scene with play button) | A full-screen `HowToClip player`, close → training home |
| 26 training home | tr-01 day rail + module row with *x of 7* | For in-app training the day rail becomes the module `Stepper list`; the centre card goes |
| 27 · 28 failed attempt / locked out | bi-21 (*Try again in 30 days*) | The lockout copy shape exists (date, not days — P5); score and modules-to-rewatch have **no base** |
| 29 Call support everywhere | Call pill in the header on most frames; **Call Trainer** outline Button on the training cards | Header Help only (open question 6); no body button |
| 30 completion | bi-18 · bi-20 · tr-15 (confetti + ✓ + one Button) | Keep the celebration scene and one Button **Go to Home** |
| 31 certificate | **tr-28** | Base exists: name · date · centre · duration. Add KYC photo and ID; **Share on WhatsApp** primary, **Save** secondary; a Profile row to keep it (pl-27 has none); one reward asset, not a card + a medal |
| 32 joining date | gl-02/gl-28 *Select date of joining* | As BUILD.md G1 (`SelectionCard date` strip) |
| 33 slot confirmation with edit | gl-12 *Confirm your shift timings* | Keep the pin row with **Change ›** and the week card; alternatives-with-bonus state has **no base** |
| 34 Hub screen | gl-05 (hub photos · address · MAPS) + tr-01 centre card (transit, Map/Call/Share) + tr-18 (*Training advance ₹2000 · adjusted with your kit*) | Merge: `MapSnippet hub` + `Timer deadline` + what-to-bring rows (bi-15 *DOCUMENTS TO CARRY* with pictograms) + advance Amount row (amount is open question 9); **Show directions** |
| 35 Expert ID card with rotating code | **bi-19 · tr-16 · gl-18** | Base exists (ID + 3 big digits + validity line). Add the code's life as `Timer deadline`, a refresh, Listen, and put it on Home too; the direction already matches the PRD (she shows, the agent types) — the September note that it was reversed is now wrong, see Step 6 |
| 36 visit started with agent | — | **no base** (the trainer never appears on her screen in this file) |
| 37 after the visit: uniform, quantity, payment, BMI | gl-07/08 (kit tiles · checklist) + gl-09 (paid/left band, advances) + gl-25 (BMI OTP, trainer-side only) | `Statement` with item rows + payment status Tag as BUILD.md G5; BMI result row has **no base** (only the trainer's OTP entry exists) |
| 38 work area pending | — | **no base** |
| 39 BMI fail / under review | — | **no base** |
| 40 TnC | gl-06 | As BUILD.md G9: five plain rows + *Read the full terms ›* + **I agree**; VoicePrompt reads it |
| 41 go-live selfie | gl-23 · gl-24 (dashed oval · *uniform not visible* fail) — on the **trainer's** phone here | Same `MediaCapture face` on her phone; result reasons *blurred · dark · more than one face · sunglasses* have **no base** |
| 42 AI uniform preview | **gl-22 *Actual | Enhanced*** + gl-26/27 | Base exists but is trainer-side and unlabelled; on her phone: `MediaCapture preview` showing both, a line that says the uniform is added, **Use this photo** / **Retake** (P5; open question 11) |
| 43 three failures | — | as 24 |
| 44 day-one Home | **pl-32** (*Welcome to Snabbit!* card: date · time · earning potential · *LOGIN WITHIN* ring · hotspot · **Map**) + gl-01 | Keep date/time/earnings/hotspot; `Timer deadline` instead of a draining ring; **Present** alone with **Can't come** `ghost` above (pl-02's red/green pair must not travel) |
| 45 call for help | gl-01 (*Need help? Call them anytime* · Buddy / Team Leader / CLM · Call) | `ListItem actionable` rows with `phone` — unchanged |
| 46 voice guidance | bi-27 voice bar; per-row Listen; bi-09 language waveform | `VoicePrompt bar` on each Home card per `first-run.md` |
| 47 · 48 reminders | — | **no base** (no notification drawn) |
| 49 progress count | the 5-segment strip + *(n/5)* in Buttons | `ProgressBar segmented` with the computed count; the Button label loses the count |

**Surfaces with no base anywhere in these sections:** 2, 5, 6, 7, 13, 14, 15, 16, 20, 36, 38, 39, 47, 48 — plus the states inside 27 (score), 33 (alternatives), 37 (BMI result), 41 (quality reasons).

---

## Step 6 — side by side / open findings

- The **Expert ID + code direction has flipped since September**: in the 2026-09-22 read the trainer gave her a 3-digit OTP to type (*Enter OTP · ask your trainer*); now the expert's app shows *Your Expert ID #AB12456 · Trainer OTP 5 4 2 · Valid for today's training session* and the **trainer types it** (bi-22 · bi-24 · gl-25) — which is exactly the PRD § 3.11 handshake, so surface 35 has a shipped-intent base and `SCOPE.md` → *Asks of core* row 5 should drop "the other way round".
- Both directions still coexist in Training: she **shows** the code to be marked in (tr-16) and later **types** the trainer's OTP to log in and log out (tr-09 … tr-15, tr-24 … tr-27) — two handshakes for one visit.
- The go-live **selfie is now taken on the trainer's phone** (gl-21 … gl-27), while the PRD § 3.13 has her take it at home; the file no longer has an expert-side go-live selfie — surface 41's base is the Training login selfie (tr-10 … tr-12), not Go Live.
- *Enhanced ✦* (gl-22) is the file's name for the AI uniform photo; only the trainer sees *Actual* beside *Enhanced*; the expert sees *Image updated!* — the PRD's *she sees the result and can retake* is not drawn.
- Canvas order of the *Happy flow* lane (by frame x): splash (x 100) · promise (533) · language (993 · 1452 · 1885) · phone (2318 · 2751) · OTP (3184 · 3617 · 4050) · steps intro (4482) · location dialog over Work details (4916) · personal details (5352 …) — language **before** phone, as `patterns/onboarding.md` has it; the only reorder against the pattern is that the steps intro (*5 steps*) comes after OTP, not after location.
- The language screen ships **five** languages with *Telugu*; `type.md` and P9 say four — already a follow-up in `onboarding.md`; the PRD's seven (adds Odia, Bengali) has no base.
- OTP is **4 boxes** here, 6 in `onboarding.md` and `text-field.md`.
- The OS location dialog appears **over Work details** (after OTP, before the form) — i.e. before city auto-fill; the pattern asks at step 2 then falls back to a manual city. Same moment; the missing part is the benefit sheet before it.
- The 5-segment strip is the same count on Beauty's skill-test path and on the training path, though the steps differ — evidence that the count is hard-coded; surface 49 must compute it.
- Beauty's TC is a **skill test at a Hub before training**; the PRD's contactless flow has no skill test — the entire skill-test lane (bi-06 … bi-25, bi-31, bi-41, trainer-side frames) is Beauty-only and does not travel, except its shapes (date picker, confirmed card, pass/fail screens).
- *Training advance ₹2000 · This amount will be adjusted with your kit* and *Go live advance ₹3,000* are two advances; the PRD § 3.11 names one *uniform advance* with an open amount (open question 9) — the Beauty kit model (₹22,500 kit, 6 payout cuts, 12 % interest) is not House Help's.
- Profile (`670:102572`) has **no documents, certificate, uniform or kit row** — surface 31's *stays in the app* and surface 37's record need a Profile row that does not exist yet (ask of `patterns/` Post onboarding, not a core change).
- Nothing in this file shows a **denied permission**, a **seat released**, a **locked-out** training state with a timer, a **BMI result**, or **notifications** — the states the PRD's acceptance criteria name most.
- The Go Live section's September translation (`references/beauty-expert-master-go-live/BUILD.md`) still covers the kept frames; the new kit/pay/Sunday-stepper frames change the money shapes (now a progress band + advances + schedule) but not the Statement answer — BUILD.md G5/G7 stand.
- Three frames carry **Beauty-wide copy errors** that must not be quoted as strings in any build: *I machines witch on and work*, *Taking u there*, *Payment didnt go through*, *Marati*, *Koramangla*.
