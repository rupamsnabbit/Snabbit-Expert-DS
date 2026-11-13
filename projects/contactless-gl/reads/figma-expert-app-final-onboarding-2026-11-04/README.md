# Reference read — *Expert App 2.0* → page **FINAL ONBOARDING**

Project read for `contactless-gl` (internal reference only — never published, never traced). Shipped-app evidence for the build plan: which regions of the contactless onboarding already exist in the master file, under what name, and what has to change. Read with `patterns/onboarding.md` (written from *Self-Serve ER/AR*), `projects/contactless-gl/SCOPE.md` and `TIERS.md`.

## Source table

| | |
| --- | --- |
| File | Figma *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM` · page **FINAL ONBOARDING** `14537:42610` |
| Read | 2026-11-04, Claude (agent) for Rupam Banik · from PNG renders, not the node tree |
| Numbered frames | `1Login … 20Finished` (21 frames, ids in Step 1) — screenshot each at native size (`crops/01-… 20-…`). The brief's "latest" frames |
| Permissions | `30541:112432` *Location Permision* (the bare OS dialog, 348 × 552), `30541:112543` (Choose your language, pink hero), `30541:112641` (the OS dialog over the language screen); section `30541:114181` **Section 3** (6 frames, metadata read: `30541:112418` Share precise location · `30541:112816` Allow notification permissions · `30541:113577` / `30541:114087` / `30541:112930` Enter your mobile number × 3 · `30541:113754` Enter OTP with SMS / Whatsapp / Call) — `crops/p1–p3`, `crops/s3a–s3f`, `section-3-permissions.png` |
| Errors | section `14967:135286` **Errors**, 5 frames, metadata read: `14967:135356` B/s · `14967:135368` Full page · `14967:135335` Toast on shift · `14967:135287` Incorrect OTP · `14993:42497` Name with special characters — `crops/e1–e5`, `section-errors.png` |
| Onboarding section | `14537:42620` **Onboarding** (38 children, 12624 × 3330) — rendered at native size, 34 frames cropped by grid (`crops/ob01–ob34`, named by x-offset because the section's metadata call fails); `section-onboarding.png` (downscaled) |
| Go live WIP | `28383:58385` (35 children, 18752 × 2819) read fully (`crops/gl3-01…27`, `gl3-r2-01…07`); `14575:64248` (46) and `17270:30314` (40) read for deltas only (`section-golive-wip-1/2`). **Newest is `28383:58385`** (highest ids; the *Device testing* block and the dropdown-form variants of the other two are gone) |
| Skipped | `14566:48426` Training WIP (another agent); loose *Landing screen* / *Unmarried* frames — **not opened**: page-level metadata was unavailable once the Figma rate limit hit, so they could not be located; nothing in the four read sections references them |
| Figma failures | `mcp__plugin_figma_figma__*` hit the **Professional-plan tool-call limit** after 26 frame screenshots; the rest of the read used the second Figma connector (`28ce1f22…`). `get_metadata` on `14537:42620`, `14575:64248`, `17270:30314`, `28383:58385` fails on both connectors (SSE JSON parse error at ~90 KB) — those sections were read from renders, so **Onboarding-section and Go-live frames have no ids in this read**; cite them by crop name and x-offset |

Vocabulary in this read follows `PRINCIPLES.md`: Expert, Job, Shift, Hood, Area, Hub. The screens' own words are in quotes.

---

## Step 1 — what is there

The shell on every registration screen (frames 7–20, Section 3, Onboarding section): status bar · **back ‹** · title *"Registration"* (or none) · a **language pill** (translate glyph + caret) at right on the screens where the title is empty · a thin pink **progress strip** under the header (filled ≈ ⅓ on every Registration screen; never a count) · a **voice bar** (pink play button, scrubber, speaker glyph) · the title · content · a full-width pink **"Continue"** at the bottom; where support is offered it is a second outlined **"Call support"** button *below* Continue. No Help/Call pill in the header anywhere on this page.

### A. Login, OTP, language — numbered frames 1–6 (older skin) and the Onboarding section / Section 3 (newer, pink hero)

| # | Frame | Screen | Strings (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| 1 | `23235:37232` 1Login | Phone entry, empty (iOS shell) | *"Welcome to Snabbit"* (Snabbit in pink) · *"Login or Sign up to continue"* · placeholder *"Enter mobile number"* · *"We will send an OTP to confirm the number"* · **"Continue"** (disabled) | centred title, outlined field, helper line, OS numeric keyboard |
| 2 | `23235:37141` 2Enter number | Phone entry, filled | *"808611231"* with a clear ⊗ · **"Continue"** enabled | same |
| 3 | `23235:36919` 3OTP Not Entered | OTP, empty | header *"OTP Verification"* with back · *"Enter OTP sent to +918086112313"* · **5** boxes (placeholder 0) · *"Resend OTP in 00:08"* · **"Confirm"** (disabled) · OS keyboard with *"From Messages 61561"* autofill | title, 5 boxes, timer line, button |
| 4 | `23235:37032` 4OTP Entered | OTP, filled | *"6 1 5 6 1"* · **"Confirm"** | same |
| 5 | `23235:37403` 5EnableLocation | OS location dialog over the app's own location screen | behind: back · *"Share precise location to go online"* · a dimmed pink **"Allow location"** button · **"Dismiss"** · OS dialog: *"Allow Snabbit to access this device's location?"* · map circle · *"Precise"* · **"Allow"** · **"Only this time"** · **"Don't allow"** (three green stacked buttons) | app screen (= Section 3 `30541:112418`) + OS dialog |
| 6 | `23235:36857` 6Language Selection | Language, old skin | pink banner with the illustrated expert: *"New beginnings, new opportunities - your progress is in your hands!"* · *"Select a language to continue"* · 4 radio cards *"English · हिन्दी · मराठी · ಕನ್ನಡ"* each with a large grey script watermark (*Aa · अआ · ಅಆ*) · **"Confirm"** (disabled) | banner, 4 cards, button |
| ob01–02 | Onboarding section x160, x652 | Language, **new skin** | pink hero *"Welcome to Snabbit" / "Become an Expert"* with the real expert · white sheet *"Choose your language"* + speaker glyph · 4 radio cards *"English / English · हिन्दी / Hindi · मराठी / Marati · ಕನ್ನಡ / Kannada"* (own script first, English name under) · **"Continue"** disabled → enabled with English selected (card gets pink border + filled radio) | hero, sheet, 4 cards, button — same as `30541:112543` |
| ob03–04 | x1144, x1636 | Phone, new skin | *"Enter your mobile number"* + speaker · field *"+91"* → *"+91 8606653178"* · *"We'll send an OTP to verify your number"* · **"Continue"** disabled → enabled | = Section 3 `30541:113577` |
| s3e | `30541:112930` | Phone with keypad | the hero crops to the face when the keypad is up · *"By clicking continue, I accept the Privacy Policy & Onboarding Policies"* (links underlined) · **"Continue"** disabled · G-Board numeric keypad | the only frame with the policy line |
| s3d | `30541:114087` | Phone, **error** | field *"BYDPC0243F"* with red border and ⊗ · *"Please enter a valid PAN"* in red (a PAN error on the phone field — a Figma leftover, not a real state) · **"Continue"** | field error state |
| ob05–07 | x2128, x2620, x3112 | OTP, new skin | *"Enter OTP"* + speaker · **4** boxes · *"Resend OTP in 29s"* (empty) · *"Didn't receive? Resend OTP"* (filled *6 6 6 6*) · **"Verify OTP"** disabled → enabled → **"Verifying OTP"** with spinner (button keeps its label) | 4 boxes, resend line, button; spinner state |
| s3f | `30541:113754` | OTP, **error + channels** | boxes *6 6 6 6* red-bordered · *"Incorrect OTP entered, please enter again"* · *"Didn't receive? Resend OTP"* · three outlined pills **"SMS" · "Whatsapp" · "Call"** with glyphs · **"Verify OTP"** | the resend-channel row exists nowhere else |
| e4 | `14967:135287` | OTP, error (Errors section) | *"Incorrect OTP. Please try again"* with an ⓘ · *"Didn't receive? Resend OTP"* · **"Verify OTP"** | a second wording of the same error |

### B. Permissions — Section 3 and the loose frames

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| s3a | `30541:112418` | Location ask (app's own screen) | back · pink pin pictogram in a pale pink circle · *"Share precise location to go online"* · **"Allow location"** | header (no language pill), pictogram, one line, one button |
| s3b | `30541:112816` | Notifications ask | back · **language pill** · pink bell pictogram · *"Allow notification permissions"* · **"Allow notifications"** | same anatomy |
| p1 | `30541:112432` *Location Permision* | The OS dialog alone | *"Allow Snabbit to access this device's location?"* · *"Precise"* · **"Allow" · "Only this time" · "Don't allow"** | the untranslatable part |
| p3 | `30541:112641` | OS dialog over *Choose your language* | the language screen dimmed behind the same dialog | shows the dialog firing before language is even chosen |
| 5 | `23235:37403` | OS dialog over s3a (above) | behind: **"Allow location"** dimmed, **"Dismiss"** visible — an outlined dismiss appears only under the dialog | — |

Not shown anywhere: a denied state, a "don't ask again" state, a settings-page trip, a camera ask, a contacts ask.

### C. Registration — numbered frames 7–16 (= Onboarding section, identical skin)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 7 | `23235:40771` 7Registration | Step list | back · language pill · voice bar · *"Let's get started with your registration"* · card *"STEP 1 / Registration"* with a pink lock badge at left and an add-person glyph, button **"Start ›"** inside the card · four locked rows *"STEP 2 / ID Verification"* (× 4, all labelled Step 2 — placeholder text) with ID, briefcase, bank and shield glyphs | Stepper list with the current step as a card |
| 8 | `23235:17591` 8City | City auto-detected | language pill · voice bar · *"We have selected your city as"* / **"Bangalore"** (pink) · isometric city illustration with a *"Bangalore"* label · link **"Change Work City?"** · **"Continue"** | hero illustration, one line, text link, button |
| ob10 | x4088 row 2 | City list | back · voice bar · *"Choose your preferred city"* · radio cards *"Bangalore"* (selected) *"Mumbai" "Delhi NCR" "Chennai" "Pune"* · **"Continue"** | 5 compact cards |
| 9 | `23235:37492` 9Registration | Name, empty | header *"Registration"* + strip · *"Tell us your full name"* · field with envelope glyph, placeholder *"Radhika Sharma"* · *"Your name will be verified with your Aadhaar"* · link *"Have a referral code?"* *(optional)* · yellow banner with an *18+* ring glyph: *"Confirm you are 18 before proceeding"* · **"Continue"** disabled | field, helper, collapsed referral row, info banner, button |
| 10 | `23235:37520` 10Registration | Name, filled, referral open | *"Radhika Sharma"* · *"Have a referral code? (optional)"* · field placeholder *"000 000"* · banner · **"Continue"** | referral field expanded |
| e5 | `14993:42497` | Name, **error** | *"Radhika)("* · *"You cant have special characters like !@#$%^&*() in name"* (red) · **"Continue"** disabled | field error |
| 11 | `23235:37577` 11Registration | Gender, empty | *"Select your gender"* · two radio cards with illustrated faces *"Female" · "Male"* · **"Continue"** disabled · OS QWERTY keyboard still up (leftover) | 2 rich cards |
| 11b | `23235:37597` 11Gender Selection | The two cards alone (component) | *"Female" · "Male"* | — |
| 12 | `23235:37557` 12Registration | Gender, Female selected | card pink-bordered, radio filled · **"Continue"** | — |
| 13 | `23235:38542` 13Registration | Work type | *"Choose the work you're interested in"* · hero cards with the uniformed character: *"House Help / Cleaning, mopping, laundry, and other house work"* (selected) · *"Home Cook / Cooking, meal preparation, and cleaning utensils"* (dimmed — unavailable) · **"Continue"** | 2 image cards |
| ob19–21 | x7416 (3 rows) | Work type states | both enabled; House Help selected; Home Cook selected; and a third with *"House Help"* dimmed carrying a pink tag **"Only for females"** while a male Home Cook is selected | the gender-gate shown as a dimmed card + tag |
| 14 | `23235:38739` 14Registration | Shift type, empty | *"Pick a shift that suits you"* · cards *"Full Time / 10 to 12 hours daily"* · *"Part Time / 4 to 6 hours daily"* with a clock glyph and a pink clock-face illustration · **"Continue"** disabled | 2 rich cards |
| 15 | `23235:38719` 15Registration | Shift type, Full Time selected | **"Continue"** | — |
| e3 | `14967:135335` | Shift type with **toast** | red toast under the header: ⊗ *"Couldn't save your preference"* · the screen otherwise as 15 | toast |
| e1 | `14967:135356` B/s | Save-failed **bottom sheet** | red ⓘ ring · *"We couldn't save your preference"* · *"Don't worry your data is safe. This might be a network issue."* · **"Try again"** (pink) · **"Contact support"** (outlined) | error sheet |
| e2 | `14967:135368` Full page | Load-failed **full page** (iOS shell) | red ⓘ ring · *"Couldn't load the screen"* · *"Try restarting the app"* · **"Try again"** · **"Contact support"** | error page |
| 16 | `23235:40284` 16Registration | Work areas, 3 to pick | *"Select 3 work areas"* · *"Your can change this later at the training center"* (sic) · card *"Your current location / 4th block, Koramangala"* with pin glyph and **"Change"** · search field *"Search a location"* · cards: pink tag *"Tag Title"* · *"Koramangala"* with a numbered pink **1** radio · *"1.2 km"* with a navigation glyph · divider · *"Landmark / HDFC Bank"* with a bank glyph · a pink speaker button · then *"Sony Signal"*, *"HSR Layout"* (same facts) · link *"Show more areas ⌄"* · **"Continue"** · **"Call support"** | location card, search, 3 rich hood cards, show-more, two buttons |
| ob25–26 | x8872 (2 rows) | Work area, single pick, long list | *"Select your work area"* (singular) · six hoods *"Koramangala · Sony Signal · HSR Layout · ST Bed Layout · Madiwala · Wipro Signal"*, all *"1.2 km"*, all *"Landmark / HDFC Bank"* · **"Continue"** disabled · **"Call support"** | the single-pick variant |
| ob28 | x9344 row 2 | Change location (map) | full-bleed map · back · search *"Search area"* · pink pin with a callout *"Move pin to the exact location"* · sheet *"Koramangala / 278, 5th Cross Road, 10th Main Road, 8th Block, Koramangala 560095, Bengaluru, Karnataka, India"* · a pink button cut by the crop | map picker |

### D. Training-centre booking — numbered 17–20 (TC branch) and the section's variants

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 17 | `23235:39017` 17Registration | Training intro | header *"Registration"*, **no** strip, **no** voice bar · collage of five illustrated scenes (expert with tablet, classroom, cleaning, cooking, trainer handing a phone) · *"Complete 2-day training program and become an Expert"* · **"Continue"** | picture + one line + button |
| 18 | `23235:39830` 18Registration | Pick a centre | *"Select training center  location and date"* · *"Recommended center"* · card: radio *"Koramangala"* · **"MAPS"** square button · 3 photos · *"Landmark / BTM Metro Station"* + speaker · link *"Show more training centers ⌄"* · **"Continue"** · **"Call support"** | hero-ish centre card |
| ob31 | x10319 row 2 | Pick a centre, long | *"Select a training centre"* · *"Recommended center"* (as 18) · *"Other training centers near you"* · *"BTM layout"*, *"Indiranagar"* each with **MAPS** and *"Landmark / HDFC Bank"* + speaker · **"Continue" · "Call support"** | list variant |
| 19 | `23235:38989` 19Registration | Pick a date | *"Select training center location and date"* · label **"Mobile Number"** (sic — should read *Training center*; ob32 says *"Training center"*) over *"Koramangala"* + **"Change"** · *"Choose a date to visit"* · radio cards *"7 Feb / Tomorrow"* (selected) *"9 Feb / Tuesday"* *"10 Feb / Wednesday"* · link *"Show more dates ⌄"* · **"Continue" · "Call support"** | date list |
| 20 | `23235:39901` 20Finished | Confirmed (tall) | back · voice bar · *"Training Confirmed"* with green check · *"Your Timings"* + **"Change"** · timeline *"Day 1 - 7 Feb, Friday / 10:00 AM - 5:00 PM"* · *"Day 2 - 8 Feb, Saturday / 10:00 AM - 5:00 PM"* · *"Training Centre Details"* + **"Change"** · card: 3 photos · *"Koramangala Training Center"* · *"HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru"* · *"Landmark / BTM Metro Station"* + speaker · three square buttons **"Map" · "Call" · "Share"** · *"Finish your registration"* · *"All steps unlocked! Complete them in any order."* (green) · rows: green check *"Completed / Registration"* · *"Step 2 / ID Verification"* · *"Step 3 / Work Experience"* · *"Step 4 / Bank Details"* · *"Step 5 / Insurance Details"* each with ›· **"Start Training"** (disabled) · **"Call Trainer"** | confirmed card, step list, two buttons |
| ob33–34 | x11220 (2 rows) | Confirmed, section version | as 20 plus *"Training Videos"* (two thumbnails) and a referral card *"Refer your friend, earn ₹5,000"* **"Refer now"** with two illustrated women before *"Finish your registration"* | adds videos + referral |

### E. Go live WIP `28383:58385` — read fully (27 top-row frames + 7 states)

Shell: back · language pill (no title) · voice bar · title · **"Continue"**; a few screens keep the *"Registration"* title + strip (work areas) or use *"Proceed"*. Header shows **no** name/ID (unlike the Beauty go-live boards).

| # | Crop | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| G1 | gl3-01 | Training passed | trophy illustration, confetti, *"TRAINING CENTER"* on a sign · *"CONGRATULATIONS!"* · *"You have successfully passed your Training!"* · dark **"Continue"** | celebration (illustration layer) |
| G2 | gl3-02 · r2-01 | Date of joining | *"Select date of joining"* · *"8 Feb / Tomorrow"* (selected) *"9 Feb / Tuesday"* *"10 Feb / Wednesday"* · *"Show more dates ⌄"* · **"Continue"** | date list, with an unselected state |
| G3 | gl3-03 | Kit, pre-sized | *"Your kit is ready"* · *"We have pre-selected your uniform size based on your measurements"* · card: shirt photo *"T-shirt / Size: Medium"* stepper *"− 2 +"* · *"Not your size?"* **"Change size"** · card *"Pant / Size: Medium"* *"− 2 +"* · **"Change size"** · **"Continue"** | 2 item cards with quantity steppers |
| G4 | gl3-04 | Kit, size picker open | *"Select your size"* chips *"S · M · L · XL · XXL"* (M selected) · *"Pant / Size: 32"* | chip row |
| G5 | gl3-05, 06 | Region | *"Select region"* + speaker · *"Mumbai" · "Thane"* · **"Continue"** disabled → Mumbai selected | 2 compact cards |
| G6 | gl3-07 · r2-07 | Work areas | *"Select preffered work areas"* (sic) · as frame 16 (current location card, search, hood cards with **1**, *"Show more areas"*) · underneath, a sheet state *"Pick a shift that suits you"* (Full Time / Part Time clock cards) **"Confirm"** | frame 16 re-used; shift type as a sheet |
| G7 | gl3-08, 09 · r2-02, 03, 04 | Shift hours | *"Select your shift hours"* · grey row *"Shift type / Full-time"* · cards *"10 hours"* with green pill *"Earn ₹14,000 to ₹15,000"* · *"12 hours / Earn ₹16,000 to ₹20,000"* · **"Continue"** · outlined **"Change shift type"** · states: Part-time variant *"4 hours / 6 hours — ₹10,000 to ₹15,000 Potential earnings"*; a dimmed *"6 hours / ₹10,000K to ₹15,000 Potential earnings"* (sic) under the *"Pick a shift that suits you"* sheet with **"Confirm"** | hours cards with an earnings pill; sheet to change type |
| G8 | gl3-10, 11 | Shift start time | *"Select your shift start time"* · *"Shift type / Full-time"* · cards *"Morning / 06:00 AM to 10:00AM"* (sun-rise glyph) · *"Afternoon / 10:00 AM to 03:00PM"* · *"Evening / 03:00 PM to 05:00PM"* (moon glyph) · **"Continue"** disabled → Morning selected | 3 cards with time-of-day glyphs |
| G9 | gl3-12 · r2-05 | Shift & location | *"Select your shift & location"* · cards *"Wipro Park / Koramangala"* · *"8 AM to 2 PM / 8 hours"* · green band *"Earn upto ₹22,000"* · *"St.Bed Layout"* · *"Owner's Court"* × 2 · **"Proceed"** (disabled; enabled when one is picked) | hood + shift cards with an earnings band |
| G10 | gl3-13 · r2-06 | Sunday | *"Your Monday - Saturday shift"* dotted card *"Shift duration / 6 hours"* · *"Shift time / 8 AM to 2 PM"* · *"Earn more on Sunday"* · *"8 hours"* yellow pill with coin emoji *"Earn ₹1,000 extra"* · *"10 hours / Earn ₹3,000 extra"* · *"12 hours / Earn ₹5,000 extra"* · **"Continue"** disabled · **"Skip"** · state with *8 hours* selected (*"6 hours / day"*) | summary card, 3 option cards, skip |
| G11 | gl3-14 | Sunday start | *"Select your Sunday shift start time"* · *"6 AM / Ends at 4 PM"* (selected) · *"7 AM / Ends at 5 PM"* · *"8 AM / Ends at 6 PM"* · **"Continue"** | 3 cards |
| G12 | gl3-15, 16 | Confirm timings | *"Confirm your shift timings"* · dotted card with pin *"Wipro Park, 2nd Block Kormangala"* · blue band *"Monday to Saturday"* → *"10:00 AM to 8:00 PM / Start time - End time"* · *"10 hours / Working hours"* · yellow band *"Sunday"* → *"07:00 AM to 07:00 PM"* · *"12 hours"* · card *"Estimated Monthly Earnings ₹35,000"* · *"Joining Bonus +₹1,000"* (green) · **"Continue"** · variant without Sunday: band *"Monday to Sunday"* | summary + money card |
| G13 | gl3-17, 18 | Hotspot | *"Your hotspot location"* · row *"Your Cluster / Powai"* · card: 4 photo thumbnails (*"+4"*) · *"R-City Mall"* · *"278, 5th Cross Road, 10th Main Road, 8th Block, Koramangala 560095, Bengaluru, Karnataka, India"* · **"MAPS"** square · **"Proceed"** · then a sheet *"Confirm your shift timings?"* + speaker · *"These cannot be changed going forward"* · **"Confirm"** · **"Go back"** | hotspot card; confirm sheet |
| G14 | gl3-19 | Terms | *"Term and conditions"* · *"Please read and understand"* · the full legal text (*"These terms and conditions ("Terms") govern the use of services…"*, *"Maestroedge Solutions Private Limited"*) · **"Decline"** (outlined) · **"Accept"** (pink) side by side | legal wall, two adjacent buttons |
| G15 | gl3-20 | Selfie intro | sheet over the dimmed timings screen: illustration of the expert taking a selfie · *"Please take a selfie in your Snabbit uniform"* + speaker · *"This will be your ID card picture"* · **"Take selfie"** | intro sheet |
| G16 | gl3-21 | Camera | header *"Take a selfie / Please ensure you are wearing the uniform."* · live preview with a dashed face oval and dashed shoulder line · round pink shutter | capture |
| G17 | gl3-22 | Uniform not visible | red warning triangle · *"Your uniform is not visible"* · photo of the uniformed expert with dashed outline · green check *"Correct way to take selfie"* · **"Retake Photo"** | fail sheet |
| G18 | gl3-23 | Review | the captured photo · **"Retake"** (pale) · **"Submit"** (pink) side by side | review |
| G19 | gl3-24, 25, 26 | Trainer OTP | sheet over the frozen preview: *"Enter OTP"* · **3** boxes · *"Please ask your trainer to share the OTP with you"* · **"Submit"** disabled → *6 6 6* **"Verify OTP"** → **"Verifying"** with spinner | 3-box code entry |
| G20 | gl3-27 | You are an Expert | confetti over a first Home (*"Welcome to Snabbit! / Earn upto ₹800 on your first day"* · *"Your Shift 7:00 AM - 12:00 PM"*, a coin pill *"₹0"*) · pink sheet *"Congratulations"* · the expert with thumbs up · *"YOU ARE NOW A / Snabbit / Expert"* · **"Get started"** | celebration sheet over Home |

**Deltas in the two older Go live sections** (`14575:64248`, `17270:30314`): both open with a 12-frame greyed-out **"Device testing"** sequence (*"Camera / Testing front camera…" · "Camera test passed!" · "Location / Are you nearby? 278, 5th Cross Road…" "No" / "Yes" · "Location successfully tested!" · "Speaker / Click play to start" "Play" · "Can you hear the audio?" "No" / "Yes" · "Vibration / Count number of vibrations" · "How many times did it vibrate?" 1 2 3 4 · "Camera test failed" with "Retry"* · **"Proceed"**) that `28383:58385` drops. `17270:30314` also has a **form** version of shift & location (dropdowns *"Work Area / Koramangala, Indiranagar, BTM Layout"* · *"Shift time / Morning"* · *"Shift type / Full-time"*, and a *"Micromarket / Koramangala"* + *"Shift time / 09:00 AM"* variant), and an *"Earn more on Sunday"* with a blue tag *"Current shift hours"* on *6 hours* and start-time pills *"08:00 AM · 09:00 AM · 10:00 AM"* under the selected option. Everything else (kit, region, timings, hotspot, terms, selfie, OTP, congratulations) is identical across the three.

---

## Step 2 — what it is trying to do

**A — Login and language.** Get a phone number and a code with as little as possible on screen; choose a language before anything else is read. The older numbered frames do it in an iOS shell with *Login or Sign up*; the section and Section 3 do it on the pink hero with the real expert, a speaker glyph on the title, 4 boxes and a *Verifying* button state. Section 3 adds what the happy path forgets: a wrong code, and three ways to get the code again (SMS, WhatsApp, call).

**B — Permissions.** Two app screens — one pictogram, one line, one button — placed before the OS dialog, so that the dialog is expected. Location is framed as *to go online*; notifications as a bare *allow*. There is no path after a refusal.

**C — Registration.** A step list sets expectation (*Step 1 Registration*, four locked steps), then one question per screen: city (auto, changeable), name (with the Aadhaar warning and 18+ banner), gender, work type, shift type, hoods (3, then 1), each with a voice bar. The Onboarding section carries the states the numbered path skips: city list, map picker, single-hood list, gender-gated work cards, three error surfaces.

**D — Training centre (TC branch).** Pick a centre and a date, see the confirmed card with directions, call and share, and a post-booking list of the remaining steps that can be done *in any order* — this is the shipped version of the Hub stage that `patterns/onboarding.md` § 6b describes from Self-Serve.

**E — Go live (WIP, newest).** After training: joining date → kit (sizes and quantities) → region → hoods → shift type/hours/start time → Sunday hours (with a bonus) → confirm the week (with monthly estimate and joining bonus) → hotspot → terms → uniform selfie → trainer's 3-digit code → *You are now a Snabbit Expert* over Home. It is the Beauty go-live boards (`references/beauty-expert-master-go-live/`) for house help, drawn in the registration shell, with the kit stage reduced to sizes (no money).

---

## Step 3 — against the expert

| Symptom | Where | Breaks |
| --- | --- | --- |
| Every action is *"Continue" / "Confirm" / "Submit" / "Proceed" / "Accept" / "Skip"* | all sections | `content.md` § 3, § 9 banned list; P2 (the button states its outcome) |
| The OS permission dialog is English-only and appears over a screen that itself says nothing about what to press | 5, p3, s3a/b | P1, P5 — the one thing she must get right is in a language she cannot read (SCOPE.md *Design problems* 1) |
| No denied / permanently-denied / settings-page state for any permission | B | P5 (five states); `patterns/permissions.md` fallback rows |
| The location dialog fires over the language screen, before she has chosen a language | p3 | `permissions.md` rule 1; P9 |
| Progress is a thin strip at ⅓ on every Registration screen; never a count, never spoken | 9–16, G6 | P5, P6 (progress is a shape *and* a number) |
| Four header shells on one flow: pink hero sheet (A), bare back + pill (B, E), *"Registration"* + strip (C, D), *"Take a selfie"* subtitle header (G16–19) | all | `header-nav.md` one nav; `references/beauty-expert-master-go-live/` found the same fault |
| Help is a body button (*"Call support"*) under Continue on some screens and absent on most; never in the header | 16, 18, 19, 20 | P7 — SOS/Help in the header on every screen; SCOPE.md open question 6 (answered: header Help) |
| *"Call support"* / *"Continue"* stacked, *"Retake"* / *"Submit"* and *"Decline"* / *"Accept"* side by side | 16–20, G14, G18 | P3 — no mirrored pair; `button.md` |
| Terms as a legal wall with no summary and no Listen | G14 | P1, P9; Beauty read: five plain rows + full text behind a tap |
| *"Confirm you are 18 before proceeding"* as a permanent yellow banner with no control | 9, 10, e5 | P5 — a banner that cannot be acted on; it is a consent, not a warning |
| *"Your name will be verified with your Aadhaar"* + 18+ banner + referral link on the name screen | 9 | P1 *one instruction line*; *related is not needed* |
| Coin emoji on the Sunday-bonus pills; *"Earn ₹1,000 extra"* not numbers-first | G10 | `assets.md` (rewards are assets); `content.md` § 1 |
| Placeholder strings shipped in the design: *"Tag Title"*, *"STEP 2 / ID Verification"* × 4, *"Mobile Number"* over a centre name, *"Your can change…"*, *"preffered"*, *"₹10,000K"*, a PAN error on the phone field | 7, 16, 19, s3d, G6, G7 | evidence hygiene — none of it is a decision |
| Every hood is *"1.2 km"* with *"HDFC Bank"* — distance and landmark are placeholders, so the card's facts have not been designed for real data | 16, ob25 | P5, `flow-data-continuity` |
| Hood cards carry a number badge (*1*) for an ordered 3-pick, but nothing says why three or in what order | 16 | P1, P5 |
| OS keyboard left up on the gender screen; 5 OTP boxes in the old frames vs 4 in the new; *"Verify OTP"* vs *"Confirm"* | 3, 4, 11, 12 | consistency; `numeric-keypad.md` (one keypad) |
| Two error surfaces say the same thing differently (*"Incorrect OTP entered, please enter again"* / *"Incorrect OTP. Please try again"*) | s3f, e4 | `content.md` § 5 one state word |
| *"Couldn't load the screen / Try restarting the app"* | e2 | P5 — blames the phone and gives two recoveries |
| Celebration (*You are now a Snabbit Expert*) sits over a Home that is already visible and must be dismissed | G20 | P6 — a moment that blocks the next action |
| Device-testing sequence (older WIPs) asks her to count vibrations and answer *"Can you hear the audio?"* | WIP-1/2 | P1, P8 — dropped in the newest WIP; keep it dropped |

**What it does right — keep:** one question per screen with a voice bar on every one; language first with each script in its own face; the real expert on the hero; the 4-box OTP with a *Verifying* button that keeps its label; the app's own pictogram screen *before* the OS dialog; a *Resend* row with three channels (SMS · WhatsApp · Call); the step list on first entry and the *finish in any order* list at the end; the city auto-detected and changeable; the picture-led work cards with the gender gate as a dimmed card + tag rather than an error; the hood card anatomy (hood name · distance · landmark line · Listen); date-of-joining as a short list with *Show more*; the selfie oval with a fail sheet that shows the *correct way*; the 3-digit trainer code typed by her; the Home-under-celebration order (Home is ready when the sheet closes).

---

## Step 4 — tier and system map

Everything here is **Tier 2** (compositions of core parts) except the three rows marked *no match*. Names from `components/README.md`.

| Screen · region | Is | Notes |
| --- | --- | --- |
| A · pink hero + white sheet (language, phone, OTP) | composition: hero photo asset + BottomSheet-like panel (static) with Heading + VoicePrompt `inline` Listen | `onboarding.md` § 0–2 already names it |
| A · language cards | SelectionCard `compact` × 4 `single` | Telugu missing here (section has 4; `onboarding.md` says the Self-Serve set is 5) |
| A · phone field | TextField `phone` + NumericKeypad (s3e shows the OS G-Board) | `numeric-keypad.md` |
| A · OTP boxes, resend timer, channel pills | NumericKeypad `otp` (4) · Timer `deadline` (*in 29s*) · Button `tertiary` **Resend code** · Chip row (SMS · WhatsApp · Call) → BottomSheet `select` | the channel row is new evidence for `onboarding.md` § Edges *No OTP arrives* |
| A · *Verifying OTP* | Button `loading` (label kept) | `button.md` |
| A · policy line | ListItem `informational` with links — or a line under the Button | `content.md`: links in body text are not a control |
| B · pictogram + line + button (s3a, s3b) | BottomSheet `permission` content drawn full-screen: scene asset · Heading2 · Button **Allow …** | `permissions.md` § The sheet — same anatomy, missing *Not now* and the one-sentence why |
| B · OS dialog | not ours — the thing the sheet prepares her for | SCOPE *Design problems* 1 |
| C · step list (7) | Stepper `list` with the current step as a Card holding Button **Start**; locked rows `locked` | `stepper.md` |
| C · city hero (8) | composition: illustration asset + Heading1 + Button `tertiary` **Change** → BottomSheet `select` (ob10 = SelectionCard `compact` × 5); `onboarding.md` § 3 draws the city as a ListItem with **Change** instead | `onboarding.md` § 3 |
| C · name (9, 10, e5) | TextField `text` with helper and `error`; referral as a collapsed ListItem `actionable` → TextField | — |
| C · 18+ banner | Banner `info` — **should be** Checkbox row or part of the consent sheet | P5 |
| C · gender (11–12) | SelectionCard `rich` × 2 with the character asset | `selection-card.md` |
| C · work type (13, ob19–21) | SelectionCard `hero` × 2 `single`; unavailable = `disabled` + Tag `neutral` *Only for females* | `onboarding.md` § 4 |
| C · shift type (14, 15) | SelectionCard `rich` × 2 with the clock illustration — **vocabulary**: *Full Time / Part Time* never reach her; say *10–12 hrs a day* | `PRINCIPLES.md` Shift row |
| C · current-location card | ListItem `informational` with Button `tertiary` **Change** | — |
| C · search field | TextField `search` | — |
| C · hood card (16, ob25) | SelectionCard `rich` · shift option form: hood name · distance fact · landmark line · Listen IconButton; the numbered **1** radio = `multi` with order | TIERS.md surface 11 already names it (shipped 2026-10-01) |
| C · *Show more areas* | Button `tertiary` with `caret-down` | — |
| C · map picker (ob28) | MapSnippet full-bleed + MapMarker `draggable` + Banner-like callout + summary Card | `map-marker.md` has no draggable pin — **nearest is `MapMarker` `hub`, inherits the pin + callout**; a change to core only if the contactless flow needs the map (it does not — hoods are a list) |
| C · toast / sheet / page errors (e1–e3) | Toast `error` · BottomSheet `confirm`-shaped error with EmptyState `error` inside · EmptyState `error` full page with **Try again** + **Call help** | `feedback.md`, `empty-state.md` |
| D · training intro (17) | scene asset + Heading1 + Button | = `onboarding.md` *Start training in 4 simple steps* slot |
| D · centre card (18, ob31) | SelectionCard `hero` (3 photos) with an IconButton **Map** and a landmark ListItem | `onboarding.md` § 6b |
| D · date list (19, G2) | SelectionCard `date` strip (vertical in the shipped form) + *Show more dates* | `selection-card.md` |
| D · confirmed card (20) | the **training-centre card** composition (`onboarding.md` § 6b): timeline rows · photos · address · landmark + Listen · IconButton row Map / Call / Share | `card.md` compositions |
| D · *Finish your registration* list | Stepper `unordered` with `done` row | `stepper.md` |
| D · referral card (ob34) | PromoCard | `promo-card.md` (build request) |
| E · trophy celebration (G1) | celebration screen composition: reward asset (the metallic 3D trophy is the reward layer) + Heading1 + Button, `motion.celebrate` — EmptyState has no success kind (`empty-state.md`: empty · error · offline · waiting) | `assets.md`, `onboarding.md` § 6a *Onboarding complete* |
| E · kit cards (G3, G4) | ListItem `informational` with image + Stat; quantity as a Stepper-like counter — **no core quantity control**; size as Chip `choice` row | Beauty read used Statement for the kit; here no money is shown, so ListItem rows suffice |
| E · region / hours / start-time / Sunday cards | SelectionCard `compact` (region) · `rich` with Tag `success` earnings pill (hours) · `rich` with glyph (start time) · `rich` with Amount `S` *+₹1,000 a month* (Sunday — coin emoji → Amount) | Beauty read: same translation |
| E · *Shift type / Full-time* grey row + **Change shift type** | ListItem `informational` + Button `secondary` | — |
| E · timings summary (G12) | Card with two Stat bands (Mon–Sat / Sunday) + Statement rows (*Estimated monthly earnings*, *Joining bonus*) | `statement.md` for the money rows |
| E · hotspot (G13) | MapSnippet `hotspot` + photo strip + address ListItem with Listen + **Show directions** | `onboarding.md` § 8 |
| E · confirm sheet (G13) | BottomSheet `confirm` with the consequence line | `bottom-sheet.md` |
| E · terms (G14) | → five ListItem `informational` rows + *Read the full terms ›* + VoicePrompt `bar`; **I agree** `primary` alone | Beauty read, TIERS surface 40 |
| E · selfie intro (G15) | BottomSheet `info` with scene asset + Button **Take selfie** | — |
| E · camera + fail + review (G16–18) | MediaCapture `face` with `fail` (*uniform not visible*) and `review` states | `media-capture.md` — the shipped fail copy is uniform-specific |
| E · trainer OTP (G19) | NumericKeypad `otp` 3 in a BottomSheet, Button `loading` | Beauty read G15–17 |
| E · congratulations over Home (G20) | celebration sheet (`motion.celebrate`) → Home pre-shift Card | `onboarding.md` § 8 |
| **no match** · hood map picker with a draggable pin (ob28) | nearest MapSnippet + MapMarker `hub` (inherits pin, callout, summary sheet) | not needed by contactless |
| **no match** · quantity counter on kit rows (G3) | nearest Chip `choice` / Stepper — inherits 32 dp controls | contactless surface 37 shows the kit *after* the visit as a Statement; no counter needed |
| **no match** · device-testing sequence (older WIPs) | — | dropped by the newest WIP; do not revive |

---

## Step 5 — what travels to contactless-gl

TIERS.md surface → base here → what changes (cite).

| # | Surface | Base in this read | What changes for contactless |
| --- | --- | --- | --- |
| 1 | deep link → OTP | ob01–07 (hero language, phone, OTP) + s3f (wrong code, SMS/WhatsApp/Call) | Keep as shipped; the three-channel resend row becomes the `onboarding.md` § Edges answer to *no OTP arrives* (P5); the stamp is backend |
| 2 | *already attended TC* message | e2 *Couldn't load the screen* is the only full-page message shape | TIERS says EmptyState `info`; `empty-state.md` has only empty · error · offline · waiting — use `empty` anatomy (neutral, one line, **Call help**), never the error tone (P6); note the kind gap for the tier pass |
| 3 | intro videos | ob33 *"Training Videos"* thumbnails on the confirmed screen | The only shipped video-thumbnail row; HowToClip `card` keeps that shape, moved to the promise screen |
| 4 | permission sheets | **s3a, s3b** (pictogram · one line · **Allow …**) — this is the shipped *"existing permissions screen design"* the PRD § 3.3 means | Keep the pictogram-first anatomy; add the one-sentence why and **Not now** (`permissions.md`); the **Allow …** label must match the dialog's button she will see (SCOPE design problem 1) |
| 5 | settings guide per maker | **no base** — no denied or settings state exists on this page | HowToClip `guide` is new; Mobbin is the next source |
| 6 | floating PiP guide | no base | answered: not built (question 3) |
| 7 | denied twice → explain + guide + call | no base; p3 shows the dialog over the language screen, which is the order to avoid | Design the denied path as first-class screens (SCOPE design problem 1) |
| 8 | language switch anywhere | the **language pill** in the header on 7, 8, s3b and every Go-live screen; absent on the *"Registration"*-titled screens | HeaderNav `page` Language IconButton on every screen, including titled ones (P9) |
| 9 | registration | 8 (city hero) · ob10 (city list) · 9–10 (name, referral) · 11–12 (gender) · 13 (work type) | Keep region for region; drop the 18+ banner into the consent sheet (surface 20); referral row hidden when pre-filled (PRD § 3.5); no 14–15 shift-type screen — shift is surface 12 |
| 10 | gender-check rejection | ob21 *Only for females* dimmed card + Tag | The gate is shown on the card, not as a rejection screen — keep; the rejection screen (if the backend still rejects) is EmptyState `info` as surface 2 |
| 11 | work area list, nearby first | **16 / ob25** hood cards (name · distance · landmark · Listen) with *"Your current location"* card and search | Keep the card; replace the numbered 3-pick with `single`; real distances and landmarks (P5); the pay slot reads the joining bonus as an Amount; *"Your can change this later at the training center"* goes (no Hub before the hood; PRD § 3.6) |
| 12 | shift windows | G7 hours cards with the earnings pill · G8 start-time cards · G10 Sunday · G12 summary | Merge into one `rich` shift option per window (hours + times + pay) as TIERS says; *Full-time / Part-time* never on screen (vocabulary) |
| 13 | *Help me choose* / support | 16's **"Call support"** outlined button under Continue | Support moves to the header Help (question 5/6 answered); *Help me choose* has **no base** here |
| 14 | *Decide later* | G10 **"Skip"** under Continue | Button `ghost` as TIERS; the consequence stated (P5) |
| 15 | seat released after 7 days | no base | — |
| 16 | nothing nearby | no base (every list is full) | EmptyState `empty` to design |
| 17–19 | KYC choice, DigiLocker, Aadhaar photo | **not on this page** (ID Verification is a locked row in 7 and 20 only) | base is Self-Serve § 5 (other agent) |
| 20 | face-data consent | no base; the shipped consent is the policy line on s3e and the 18+ banner | BottomSheet `confirm` with the 18+ check folded in |
| 21, 41 | liveness selfie / go-live selfie | **G16–G18** camera with face oval + shoulder line, fail sheet *"Your uniform is not visible"* with the *correct way* photo, review **Retake / Submit** | For 21 (KYC): the oval without the uniform line and logo (ask 3). For 41: the shipped fail sheet is the uniform case; add *blurred · dark · more than one face · sunglasses* as `result` reasons; **Retake / Submit** become one primary **Use this photo** + `ghost` **Retake** (P3) |
| 22 | Aadhaar summary confirm | no base | — |
| 23 | eight KYC errors | **e1 (sheet), e2 (page), e3 (toast)** — the three shipped error shapes; s3f / e4 (inline field error) | One shape per rung of `error-recovery.md`: inline (field) → toast (saved later) → sheet (retry here) → page (dead end with Call help). Copy: never *Try restarting the app* |
| 24, 43 | three failures → support | e1's **Try again / Contact support** pair | EmptyState `error` final rung; *Do it at the Hub* `ghost` |
| 25–29 | training | **G1** trophy celebration is the pass screen | base for surface 30's moment; training itself is on Training WIP (other agent) |
| 30 | completion | G1 *"You have successfully passed your Training!"* | Keep the trophy (reward layer); **Go to Home** / next step as the verb |
| 31 | certificate | no base | brief |
| 32 | joining date | **G2** *"Select date of joining"* list with *Show more dates* | SelectionCard `date` as TIERS |
| 33 | slot confirmation + change | **G12** timings summary with the money card · 19's *Koramangala* + **Change** row | Statement rows for money; **Change ›** ListItem |
| 34 | Hub screen | **20** confirmed card (photos · name · address · landmark + Listen · Map / Call / Share) · G13 hotspot card | The training-centre card is the Hub card with the nouns changed; add Timer `deadline`, what-to-bring rows and the Amount row (question 9) |
| 35 | Expert ID card with code | **G19** is the reverse (she types the trainer's 3 digits) — no display-ID base | brief; the 3-box NumericKeypad `otp` as display is the nearest anatomy |
| 36 | *visit started with <agent>* | no base | Card `state` as TIERS |
| 37 | after the visit: uniform size, qty, payment, BMI | **G3–G4** kit cards (T-shirt / Pant, size, quantity, Change size) | Read-only after the visit: Statement rows, no counter; size as a fact, not a Chip row |
| 38 | work area pending blocks go-live | **7** step list with locked rows · 20 *Finish your registration* list | Stepper `list` with `attention` + `locked` as TIERS |
| 39 | BMI fail | no base | — |
| 40 | TnC | **G14** legal wall with **Decline / Accept** | Five rows + full text + Listen, **I agree** alone (Beauty read) |
| 42 | AI uniform preview | no base; G18 review is the nearest | MediaCapture `preview` + a *generated* line (P5) |
| 44 | day-one Home | **G20** Home under the celebration: *"Welcome to Snabbit! Earn upto ₹800 on your first day"*, *"Your Shift 7:00 AM - 12:00 PM"* · G13 hotspot card | `onboarding.md` § 8; the hotspot card supplies the MapSnippet + **Show directions** row |
| 45, 46, 47, 48 | call ops · voice · reminders | the voice bar on every screen (46) | nothing else here |
| 49 | progress count | the thin strip on *"Registration"* screens | ProgressBar `segmented` with a count, computed per config; never the bare strip |

**No base on this page:** 5, 6, 13 (*Help me choose*), 15, 16, 17–19, 20, 22, 31, 35, 36, 39, 42, 45, 47, 48.

---

## Step 6 — side by side / open findings

- **Which is newer, numbered frames or the Onboarding section?** The **section** for the login/language/OTP stage (pink hero, 4 boxes, speaker on the title, *Verify OTP*); the numbered 1–4 and 6 are the older iOS-shell skin (*Login or Sign up to continue*, 5 boxes, *Confirm*, speech-bubble language). From 7 onward the numbered frames and the section are the same screens; the section is the superset (city list, map picker, single-hood list, gender-gated work cards, referral card, training videos). Section 3 is newer than both for OTP (channels row, wrong-code state).
- The numbered path is a **TC flow** (17–20 book a training centre); `patterns/onboarding.md` calls Self-Serve's TC-less branch the shipped flow — this page has no TC-less training stage at all (Training WIP is the other agent's read).
- **Permissions:** the shipped "existing design" (PRD § 3.3) is **s3a / s3b** — pictogram, one line, one **Allow …** button, no *Not now*, no why, and the OS dialog fires right after; `patterns/onboarding.md` already translates it to BottomSheet `permission`. Nothing on this page shows a refusal, so the PRD's *denied twice → guide* has no shipped shape.
- The location dialog is drawn over the **language** screen (p3) and over the app's location screen (5) — two orders in one file; the PRD's table puts location on the first screen after language, which matches p3 and contradicts the answered question 2 (ask at the moment of need).
- **Go live WIP vs Beauty go-live boards:** same stages, but this file has **no name + ID header**, **no kit money** (sizes only), **region → hoods → hours → start time → Sunday** instead of Beauty's *Sunday hours → weekly off → confirm*, and *"Decline / Accept"* on terms in both. The newest WIP (`28383:58385`) drops the device-testing block; the pattern should not inherit it.
- The go-live hood screen (G6) is **frame 16 re-used** with the *Registration* title — the shipped app already moves the hood pick between stages, which is open question 8's premise.
- **Shift vocabulary:** *Full Time / Part Time* and *Shift type / Full-time* appear on five screens (14, 15, G6–G8); the vocabulary table says these never reach her.
- Hood cards show **₹22,000 "Earn upto"** on the go-live cards and **nothing** on the registration cards; TIERS surface 11 wants the pay slot to read the **joining bonus** — the slot exists, the content does not.
- The confirmed-training screen (20) says *"All steps unlocked! Complete them in any order."* with ID, Work Experience, Bank, Insurance as steps — the shipped app already treats post-booking tasks as an unordered Stepper, which is TIERS surface 38/49's Home Stepper.
- *"Confirm you are 18 before proceeding"* is a banner, not a consent; the PRD's consent (§ 3.5, § 3.7) has no shipped control to inherit.
- Two OTP box counts (5 old, 4 new, 3 trainer) and two wrong-code wordings exist; one count per purpose and one state line is a `content.md` fix before the pattern is written.
- e2 *Couldn't load the screen / Try restarting the app* breaks P5 twice (blame, two recoveries) and must not be the base for surface 23's *network* case.
- Telugu is absent from every language list on this page (4 scripts), while `patterns/onboarding.md` records five in Self-Serve — the PRD's seven is a foundation ask either way (question 12 answered: English-only design for now).
