# Reference read — *Self-Serve ER/AR* → `Final` → **TC house help (PRIMARY)**, **Bank/UPI**, **Insurance**, **Step 5 - Insurance**

Read for project `contactless-gl`. The surfaces in Step 5 are numbered as in `../../TIERS.md`. Nothing here is drawn; this is evidence for `BUILD.md`.

## Source

| | |
| --- | --- |
| File | Figma *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB` · page `Final` (`0:1`) |
| Sections | `619:55994` **TC house help (PRIMARY)** — 70 children, 58 phone frames (393 wide) + 12 label strips · `619:51990` **Bank/UPI** — 21 children, 20 phone frames + 1 label · `659:74952` **Insurance** — 3 frames · `905:61505` **Step 5 - Insurance** — 6 frames |
| Read | 2026-11-04, Claude (agent) for Rupam Banik. Section renders at 8000 px (`section-tc.png`, `section-bank-upi.png`) and 6000 / 4000 px (`section-insurance.png`, `section-step5-insurance.png`); every phone frame cropped (`crops/01…58-<id>.png` TC, `crops/b01…b20-<id>.png` Bank/UPI, `crops/s01…s06-<id>.png` Step 5); 17 frames re-rendered at frame level (`crops/hi-<id>.png`) where the section crop was too small to read. Strings were cross-checked against the text layer names in the section metadata (Figma keeps the string as the layer name unless renamed; renamed layers — *Title*, *Label*, *How it Works* — were read from the render) |
| What ships | Every frame under the *Happy flow* and *TC journey* labels is the shipped intent; *Training centre states*, *Change training center*, *Change training date* are state rows of the same screen; *Cook questions* (8 frames, the Home-cook confirmations) was cropped but not read in detail — it is the TC-less cook variant and not in this project's ask. The faded frame `619:61330` is an older confirmed card (trainer, map, *TIME LEFT*) kept beside the current one; treated as superseded |
| Skipped | Per-frame rendering of the 10 language / phone / OTP frames (`01–11`) — identical to the TC-less section already in `patterns/onboarding.md` § 0–2; read from the crops only. `get_metadata` on the two large sections overflowed and was parsed from the saved file; four `get_screenshot` calls hit the Figma MCP rate limit once and succeeded on retry — nothing was lost |
| Brief | `/private/tmp/…/scratchpad/READ_BRIEF.md` (shared across the four reads of this day) |

**Header shell everywhere** (TC section): status bar · back chevron · page title (*Work details* / *Training centre* / none on state screens) · **Call** pill with a phone glyph · **language** pill (translate glyph + caret). Progress: a thin 4-segment strip under the header on the form screens; the button carries a count (*Continue (1/5)* … *Continue(3/5)*). No voice bar anywhere in these sections; a speaker glyph sits beside *Enter your mobile number* / *Enter OTP* titles and beside the nearest-metro row on the confirmed card. A small character (the expert, waving) sits above the primary button on most form screens.

---

## Step 1 — what is there

### A. Welcome → OTP (frames 01–12, `Happy flow`)

Same screens as the TC-less section; listed for completeness, strings verbatim.

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 01 | `619:62613` | Splash | *BECOME A* · *Snabbit* · *Expert* | pink stage, expert photo (namaste) |
| 02 | `619:62650` | Promise | *30,000 per month* · *Sick leaves* · *Insurance upto 5 lac* | three reward tiles (cash, pink-ribbon, blue shield — 3D style), expert pointing |
| 03–05 | `619:62917` · `619:62737` · `619:62827` | Language | *Choose your language* / *अपनी भाषा चुनें* · *English · हिन्दी · मराठी · తెలుగు · ಕನ್ನಡ* (own script + English under) · *Continue* / *शुरू* | five cards, radio at right; *1.2 km from your location* is a leftover sub-line in the layer tree, not rendered |
| 06–07 | `619:62493` · `619:62540` | Phone | *Earn upto 70,000 per month* / *Work in flexible shifts* (hero over a 3-dot carousel) · *Enter your mobile number* (speaker glyph) · *+91* · *We'll send an OTP to verify your number* · *Continue* | hero photo, bottom panel, OS keyboard |
| 08–11 | `619:62569` · `619:59994` · `619:62992` · `770:43671` | OTP | *Join 30,000 happy experts* (11: *Join 10,000 happy experts*) · *Enter OTP* · *OTP sent to 9677063716* (pencil) · *Resend OTP (50s)* / *Resend OTP* · *Confirm* · 11: *Incorrect OTP* (red, under the boxes) | four OTP boxes, OS keyboard |
| 12 | `619:63043` | Steps intro | *Join Snabbit in 4 simple steps* · *It takes 2 minutes* · *Start onboarding* (layer tree also holds *Complete onboarding in just 5 steps!*) | stairs scene, green tick |

### B. About you → Work (frames 13–21, 33–36)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 13–16 | `770:44348` · `619:63064` · `619:63244` · `770:43917` | A little bit about you | *Work details* · *A little bit about you* · *Work location* · *Bengaluru* · *Change* · *Full name* · *eg. Rupa devi* · *Your name will be verified with your Aadhaar* · *Gender* · *Female* / *Male* · *Have a referral code?* *(optional)* / accordion → *eg. ERIE93S* · *Continue (1/5)* | strip 1/4 lit; city row with pin; text field; two photo cards (faces); referral accordion |
| 17 | `619:63406` | Work | *What work are you interested in?* · *House help* · *Home cook* · *Beauty* **NEW** · *Continue (2/5)* | three photo cards, 2-column, radio top-left |
| 18–21 | `619:63769` · `619:63818` · `619:63867` · `619:63916` | Conditions | *Select and agree to below conditions* / *To work with Snabbit, you need these* · *I have my own smartphone* · *I can wear the snabbit uniform* · *Continue (3/5)* (18: 2-dot indicator; 19–21: 2-dot) | one big illustration card with a checkbox line; dots under the title |
| 33 | `778:47242` | Unavailable city | *We are not live in your area yet.* · *Work in another place* · *Mumbai · Bangalore · Delhi NCR · Pune · Bangalore · Hyderabad · Chennai · Kolkata* · *Continue* | pink city skyline, 2-column city cards with radio |
| 34 | `778:47460` | Change city | *Select a city* · *Mumbai · Bangalore · Delhi NCR · Pune · Bengaluru · Hyderabad · Chennai · Kolkata · Ahmedabad · Jaipur* · *Continue* | same |
| 35–36 | `778:47841` · `778:48025` | No males | 35: *Male* selected · *Continue (1/5)* → 36: *SORRY FOR THE INCONVENIECE* · *We are not hiring male experts at the moment* · *Call support* (black button) | 36: row of five women in uniform, arms crossed |

### C. Training centre — pick, confirmed, reach (frames 22–25, 29, 37–48) — **the base for the Hub visit**

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 22 | `619:62297` | Pick a date | *Training centre* (title) · *Nearest training centre* · **Koramangala** (pink, pencil) · *2.5 km away* (pink tag, pin) · *Choose a date to visit* · *7 Feb Tomorrow · 9 Feb Tuesday · 10 Feb Wednesday · 11 Feb Thursday · 12 Feb Friday* · *Continue(3/5)* | strip 3/4 lit; the centre is **assigned** (nearest) and changed by the pencil; five date cards (big day, small month, weekday), radio left |
| 23 | `770:44582` | Confirmed | banner *Verify Aadhaar before reaching the centre* (blue) · green tick · **Training Confirmed** · pill *Starts Friday* **10:00 AM** · *Your Timings* · *Change* · *Day 1 - 7 Feb, Friday* · *10:00 AM - 5:00 PM* · *Day 2 - 8 Feb, Saturday* · *10:00 AM - 5:00 PM* · tag *Important* · *Please carry your original Aadhar* (Aadhaar card pictogram) · *Training Centre Details* · *Change* · three centre photos · **Koramangala Training Center** · *HAL Old Airport rd, near railway over bridge, LN Pura, Marathahalli, Bengaluru* · *Nearest Metro* **BTM Layout** · *Nearest Bus stop* **Silk board** · speaker glyph · round icon buttons *Map* (pink, filled) · *Call* · *Share* · *Training Videos* · *How to become a Snabbit Expert* · *Introduction to Snabbit* (video tiles, play glyph, 3-dot indicator) · *Refer your friend, earn ₹5,000* (cut off) · **Verify Aadhar** (primary) · **Go to training centre** (secondary, with a ₹ glyph) | no header title; no progress; two-step timeline (hollow dots); pink *Important* band; centre card; carousel; referral card; two stacked buttons |
| 24 | `770:45162` | Reach (before Aadhaar) | as 23 except: no blue banner · **Reach the training centre** · pill *Starts in* **53:43** (orange ring, orange digits) · Day 1 row tinted with *Reach by* **9:45 AM** (pink) · buttons **Verify Aadhar** / **Go to training centre** | the pill turns into a countdown on the day |
| 29 | `770:45744` | Reach (Aadhaar done) | as 24 except: *Important* band reads *DOCUMENTS TO CARRY* · **Aadhar card, PAN Card** · primary is **Start training** · secondary *Go to training centre* | after KYC the top action becomes the in-app training |
| 25 | `619:61330` | *older* confirmed card (faded) | *Day 1 - 7 Feb, Friday · 10:00 AM - 5:00 PM · Reach by 9:45 AM* over a **map with the route and the expert's marker** · ring *TIME LEFT* **1 day** · *Your training is confirmed!* · *Important* · *DOCUMENTS TO CARRY* *Aadhar card, PAN Card* · *YOUR TRAINER* **Mansavi Shukla** (avatar) · *TRAINING CENTRE* **Koramangala Training Center** · *Change* · address · *Call* · *Share* · *NEAREST METRO BTM Layout* · *NEAREST BUS STOP Silk board* · **Verify Aadhar** · **Call Trainer** | this is the frame `patterns/onboarding.md` § 69 was written from (trainer, map, TIME LEFT). It is greyed in the file; the current card (23) has **no map, no trainer, no time-left ring** |
| 37, 41, 44, 45 | `762:42392` · `762:41232` · `752:33329` · `752:35152` | Confirmed — state copies | identical to 23 (44/45 are 1741 tall with the carousel; 37/41 are the 918-tall tops used as the start of the change flows) | — |
| 38–39 | `627:69322` · `631:72133` | Change training center | *Change your training center* · *Nearby training centres* · *Sony Signal · BTM Layout · HSR Layout · Kadunesanahalli · Sony Signal · Sony Signal* each *1.2 km from your location* (pin) · **Change training center** (disabled → enabled) | header: back only (no Call, no language); radio list cards; no map |
| 40 | `762:42970` | Changed | green toast *Training centre changed!* over 23 | Toast under the blue banner |
| 42 | `627:69261` | Change training date | *Change your visit date* · *Choose a date for Day 1* · *7 Feb Tomorrow · 9 Feb Tuesday · 10 Feb Wednesday* · **Change date** | three date cards; the waving character |
| 43 | `762:41812` | Changed | green toast *Day 1 date changed* over 23 | — |
| 46 | `752:33675` | Day before | **Day 1 Training Tomorrow** · pill *Starts tomorrow* **10:00 AM** · Day 1 row tinted, *Reach by* **9:45 AM** · rest as 23 | — |
| 47 | `752:32992` | On the day | **Please reach the training centre** · pill *Starts in* **53:43** (orange) · *Reach by 9:45 AM* · **Verify Aadhar** / *Go to training centre* | 24 with a different title |
| 48 | `752:37855` | Late | orange **!** · **Reach before 12 pm to attend your training** · Day 1 row tinted yellow, *Reach by* **12:00 PM** (orange) · *Important* band · *Training Centres* (section) · one primary **View directions** | the cut-off is moved from 9:45 to 12:00 and the action becomes directions |
| 49 | `752:37755` | Missed | orange **!** · **Missed Day 2 Training.** **Pick a new date.** · *AVAILABLE DATES* · *Tomorrow 9 Feb · 10 Feb · 11 Feb* (three tiles) · **Submit** · *Your Timings* · *Day 1 - 7 Feb, Friday* **Completed** (green tick) · *Day 2 - 8 Feb, Saturday* **Missed** (orange !) · *Important · Please carry your original Aadhar* | header: back · Call · language; the re-pick is inline, no bottom button |
| 50 | `752:38274` | Rebooked | **Day 2 Training Tomorrow** · pill *Starts tomorrow* **10:00 AM** · timeline: *Day 1 - 7 Feb, Friday* **Completed** · *8 Feb, Saturday* **Missed** · *Day 2 - 11 Feb, Saturday* · *Important* · *Training Centres* card (photos, address, metro/bus, Map/Call/Share) · *Refer your friend, ₹5,000* · **Proceed to Training** | the missed day stays in the timeline as history |

### D. Identity, finish, the Hub handshake (frames 26–28, 30–32, `TC journey`)

| # | Frame | Screen | Strings | Regions |
| --- | --- | --- | --- | --- |
| 26 | `619:60390` | Aadhaar ready | *Training centre* · **Keep Aadhar number ready** · *You will need your Aadhar number and phone number to get an OTP* · Aadhaar card picture with the number circled · yellow band *Do not exit app now* (warning glyph) · **Taking u there** | progress strip 4/4 lit |
| 27 | `619:60589` | Aadhaar verified | green tick · **Your Aadhar is verified!** · *Name Radhika Sharma · Gender Female · Date of birth 20 Jan 1996 · Father's name Umar kanti sikder · Aadhar 12\*\* \*\*\*\* \*\*\*\* 3456 · Address AECS Layout, Silver Springs kodihalli bangalore* · **Completing onboarding** | two Card groups of label/value rows |
| 28 | `682:90569` | Congratulations | *CONGRATULATIONS!* · **You have successfully done your onboarding!** · **Let's train now** (black, with a grey stub beside it) · expert holding an *ONBOARDING COMPLETE* clipboard, confetti, *TRAINING CENTER* signboard | full-bleed illustration |
| 30 | `682:89070` | Welcome to training | **Welcome to Snabbit Training** · *Let's become a* **5★** *Expert together.* · expert character in a pink disc | TC-less entry (labelled *TC less*) |
| 31 | `813:56582` | **Share Expert ID and OTP with Trainer** | header: back · *Call* · language · **Share Expert ID and OTP with Trainer** · card *Your Expert ID* **#AB12456** · card *Trainer OTP* **5 4 2** (three big digits) · *Valid for today's training session* | **no button**; the screen *is* the credential. Labelled *TC journey* |
| 32 | `599:37813` | Home, onboarding pending | *Snabbit Expert* (title) · *Call* · language · card *Complete Onboarding* · *Get started as a expert fast* · **Continue** · *Snabbit Benefits* · tiles *Family Insurance up to* **₹1,00,000** · *Monthly earnings up to* **₹50,000** · *Referr…* **₹5…** (cut) | a Home with one task card and a benefits carousel (3D reward art: heart, coins) |

### E. Bank/UPI (`619:51990`, frames b01–b20) — listed against `patterns/payout.md` § 3; only deltas carried to Step 6

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| b13 | `682:88324` | Home pre-shift | *Welcome to Snabbit!* · *Tuesday, 7 February* · **7:00 AM - 12:00 PM** · *You can earn* **₹800 - ₹1000** · *Mark attendance for tomorrow* · **Absent** (red) / **Present** (green) side by side · cards *Add bank account to get money quickly* **Add bank account** · *Protect loved ones with 5 lac insurance* **Add insurance** · *Need help? Call our team* · *Komal Rani Trainer · Anjali Sharma Team Leader · Ramesh Kumar CLM* · *Call* ×3 · tabs *Home · Earnings · Refer (₹4000) · Profile* |
| b01 | `619:50184` | Choose | *Bank Details* · **How would you like to receive your payments?** · card *I'll provide UPI ID* with tag *Fast & Easy* (phone + ₹ art) · card *I'll provide bank account* (bank art) |
| b02–b04, b06 | `619:49630` · `619:49823` · `659:73525` · `619:49899` | Bank form | presenter video (expert with phone, play glyph) · *Bank account number \** · *Confirm bank account number \** · *IFSC Code\** · *1242 4567 7890 0987 6543* · **Verify bank details** → **Confirm this is you** · *Account holder name* **Lata Kumari** · *Bank account number* **7082 1023 5159 2761** · *IFSC Code* **HDFC8019** (green ticks) · **Yes** / *No* |
| b05, b07 | `619:49952` · `619:49985` | Fetching · Added | *Fetching account details* · *Give us a moment please* (magnifier art) → pink rosette tick · **Bank details added** · *Your money will be deposited into this account* |
| b14–b17, b18–b19 | `619:49669` · `659:74623` · `659:74726` · `659:74831` · `619:50227` · `619:50320` | UPI form | presenter video · *UPI ID* · *your@upi* · chips *@oksbi · @okhdfcbank · @yblbank · @oksbi · @oksbi* · *rupam@oksbi* (green tick) · **Fetch details** → **This account belongs to** · avatar *RP* **Lata Kumari** · *UPI ID* **latakumari@okhdfc** · *By clicking yes, you agree to allow Snabbit to verify this ID and confirm this belongs to you or a family member* (green tick) · **Yes** / *No* → rosette · **Thank you** · *UPI details successfully uploaded* |
| b08, b10, b11 | `619:50018` · `619:50053` · `619:50088` | PAN | **Enter PAN card number** · PAN-card art (*आयकर विभाग · INCOME TAX DEPARTMENT · भारत सरकार · GOVT. OF INDIA*) with the field inside: *eg.GAKPR9873Q* / *GAKPR9873Q* · green band *Save ₹100 - ₹200 extra* · *Dont have a PAN?* **Apply for an e-PAN now!** (link) · *I'll do later* (text) · **Confirm** |
| b09 | `1449:42704` | e-PAN sheet | over Earnings: *Get your PAN in 2 steps* · *Apply from UIDAI* · rows *Enter Aadhar number* · *Enter OTP and download PAN* · **Take me to ePAN** (black) |
| b12 | `619:50354` | PAN verified | *Verification* · green tick · **Your PAN is verified!** · *Name Radhika Sharma · Gender Female · Date of birth 20 Jan 1996 · Father's name Umar kanti sikder · PAN GAKPR9433P · Address AECS Layout, Silver Springs kodihalli bangalore* · **Go home** |
| b20 | `659:73914` | No-PAN sheet | over Earnings (*Expert ID: 14586 · Payout issue · March 2025 · Total Earnings ₹11,800*): PAN art · **You're losing ₹4,700** · *If u dont add PAN* · rows *No PAN · 20% tax* **₹8,000** *of tax cut* · *PAN · 1% tax* **₹250** *of tax cut* (green) · **Add PAN** (black) |

### F. Insurance (`659:74952`, 3 frames) and Step 5 - Insurance (`905:61505`, 6 frames)

| # | Frame | Screen | Strings |
| --- | --- | --- | --- |
| i01 | `905:61506` | Insurance Details | header back · *Insurance Details* (no Call, no language) · card tag *100% FREE COVERAGE* · **Health and accidental protection** · 3D shield with tick · *Your Benefits* · *Hospitalization cover up to* **₹6,00,000** · *Full coverage for hospital stays* · *Accident cover up to* **₹2,00,000** · *Add family members if needed* · *Family coverage option* · *Add family members if needed* · *Cashless treatment* · *No upfront payment needed* · **Add nominee** · *I don't want to add nominee* |
| i02 | `926:62178` | Who should get the money? | 3-segment progress (2 lit) · **Who should get the money?** · cards *Husband · Child · Mother · Father · Daughter · Son · Brother · Sister* (2-column, radio) · **Add children** (disabled) |
| i03 | `926:62587` | Details | **Who should get the money?** · row *Husband* (green tick, pencil) · *Husband's name* *eg.Shakuntala devi* · *Date of Birth* *Select date* · *Phone number* *Enter phone number* · **Add children** (disabled) |
| s01–s02 | `905:61560` · `905:61598` | Nominee Details for Insurance | *Insurance Details* · **Nominee Details for Insurance** · *Do you have a nominee?* ☑ *Yes* ☐ *No* · *Full name of nominee\** *Enter nominee's full name* / *Akash* · *Date of Birth \** *DD · MM · YY* / *28 · Janurary · 2000* · *Contact number \** / *9847216159* · *Relationship - He/she is your? \** ☑ *Spouse · Mother · Sister · Child · Father · Brother · Father in law · Mother in law* · **Continue** |
| s03 | `905:61636` | Children | **Children Details for Insurance** · *How many kids do you have? \** · tiles *0 · 1 · 2 · 3 · 4* · **Continue** |
| s04–s05 | `905:61656` · `905:61679` | Child | *Name of child\** / *Akash JR* · *Date of Birth \** · *Gender of child \** ☑ *Male* ☐ *Female* · **Continue** |
| s06 | `905:61702` | Done | rosette tick · **Thank you** · *Insurance details updated* · **Continue** |

**Is insurance an onboarding step?** Not in these sections. The TC flow's strip has four segments and its buttons count to five (*1/5 · 2/5 · 3/5*; Aadhaar is 4/4 lit; a fifth step is never labelled on screen). Insurance appears as a **Home card after onboarding** (*Protect loved ones with 5 lac insurance* → **Add insurance**, frame b13) beside *Add bank account*, with its own 3-segment progress inside. The section name *Step 5* is the file's, not the screen's. → Surface 49's count is unaffected by insurance.

---

## Step 2 — what it is trying to do

**Training centre (C).** Get her to a physical place on a day she chose, with her Aadhaar verified before she arrives and the right paper in her bag. One screen carries the whole visit: when (pill + two-day timeline), what to bring (the *Important* band), where (photos, address, metro/bus, Map · Call · Share) and what to do while waiting (videos, referral). The same screen changes its top (tick → countdown → late → missed) as the day approaches, and the primary button changes meaning with her state (*Verify Aadhar* → *Start training* → *View directions* → *Submit* a new date). The centre is assigned by distance and only *changed*, not picked.

**Hub handshake (D, frame 31).** At the centre, identity is proved by her showing a screen: her Expert ID and a 3-digit code the trainer types. No action on her side.

**Bank/UPI (E).** One choice (UPI or bank), a video that explains the form, the form, a name-check she confirms, then PAN with the money reason (*Save ₹100 – ₹200 extra*, *You're losing ₹4,700*) and an e-PAN side path.

**Insurance (F).** Sell the free cover in four benefit rows, then collect who gets the money and the children, as a post-onboarding task from Home.

---

## Step 3 — against the expert

| Symptom | Where | Breaks |
| --- | --- | --- |
| Every action is *Continue · Confirm · Submit · Proceed to Training · Taking u there · Completing onboarding* | all | `content.md` § 3 actions are verbs; § 9 banned list (*Continue*, *Submit*, *Confirm*) |
| Button carries the count (*Continue (1/5)*) and the strip shows it too, with 4 segments for 5 steps | 13–22, 26 | P5 one honest channel; `progress-bar.md`; `button.md` label is a verb |
| Verify Aadhaar is the primary on the confirmed card though the trip is the thing she is looking at; *Go to training centre* carries a **₹** glyph | 23, 24, 47 | P2 one next action; `icons.md` one icon one meaning (₹ = money) |
| The confirmed screen is 1741 dp of scroll: timeline, band, centre card, video carousel, referral card | 23, 29, 44–47, 50 | P1 *related is not needed* — videos and referral are not the visit; P2 |
| Documents to carry is a text band (*Please carry your original Aadhar* / *Aadhar card, PAN Card*) with one small pictogram; the band changes wording between frames | 23 vs 29 | P1 picture first; one asset per meaning (`assets.md`) |
| *Reach by 9:45 AM* / *12:00 PM* is a tinted row and coloured text only; the 53:43 ring has no label of what it counts (*Starts in* — but she must *reach* by 9:45) | 24, 47, 48 | P5 time as a shape with one meaning; `timer.md` `deadline` vs `countdown` |
| Missed: orange **!**, *Missed Day 2 Training.* then the re-pick inline with **Submit**, re-pick tiles 56 dp wide | 49 | P6 dignity is fine; P3 targets; `button.md` *Submit* |
| Trainer gone from the current card (25 had *YOUR TRAINER* + *Call Trainer*); *Call* on the centre card calls the centre | 23 vs 25 | `onboarding.md` § 6b says *Call trainer always present*; P7 one help path |
| Change-centre list has no header actions, every row *1.2 km from your location*, two duplicate *Sony Signal* rows | 38–39 | `header-nav.md` one shell; `selection-card.md` `rich` facts |
| Expert ID + OTP: three huge digits with *Valid for today's training session* — no refresh, no expiry shape, nothing to tap, nothing spoken | 31 | P5 (how long is it valid?); P4 (a first-time flow with no voice) |
| *Absent* red and *Present* green side by side | b13 | P3 costly beside desired; `onboarding.md` § 8 already fixes it |
| PAN is **typed** (card art with a text field) and the UPI form offers handle chips; the consent line *…belongs to you or a family member* is 16 px grey | b08, b14, b18 | `payout.md` § 3: PAN read from a photo, never typed; P1 text carries consent alone |
| *Dont have a PAN?*, *If u dont add PAN*, *Taking u there*, *Janurary*, *INCONVENIECE* | b08, b20, 26, s01, 36 | `content.md` grammar; typos ship |
| Insurance: *nominee* on every Step 5 screen; relationship as 8 tiny checkboxes; children as *0–4* tiles | s01–s05 | Vocabulary (*The person who gets the money*, never *nominee*); P3 targets |
| Insurance benefit rows say the mechanism (*Cashless treatment · No upfront payment needed*, *Hospitalization cover*) | i01 | Vocabulary: *You pay nothing at the hospital*, *Hospital bills* |
| Reward-style 3D art for informational things (shield, heart, coins on Home tiles) | 02, 32, i01 | `assets.md`: metallic 3D only for rewards |

**What it does right and must be kept**

- One screen for the visit, read top to bottom in the order she needs it: **when → bring → where → go**. The state lives in the top block, the facts below do not move (23 → 24 → 46 → 47 → 48).
- The centre is **assigned, not chosen** (22): she picks only the day. Change is a pencil, one tap, and comes back with a toast.
- *Reach by 9:45* is separate from *Starts 10:00* — the buffer is a fact on the screen, not a rule she must know.
- The missed day stays in the timeline (*8 Feb, Saturday — Missed*) next to the new one: honest history, no shame screen (50).
- Nearest metro and bus stop with a speaker — spoken directions for someone who will ask a conductor.
- The handshake is **show, not type**: she holds up a screen; the trainer does the typing (31) — this is the direction the PRD § 3.11 keeps (*agent enters the expert ID*).
- Bank name-check before saving (*Confirm this is you · Lata Kumari*) and the money reason for PAN as a number.
- Insurance's newer frames already ask *Who should get the money?* — the vocabulary rule, shipped.

---

## Step 4 — tier and system map

All Tier 2 compositions of core parts; one region with no whole-component match (the ID + code card) and one core change already on the asks list.

| Frame · region | Is | Notes |
| --- | --- | --- |
| Header (all) | HeaderNav `page` · Help `HeaderAction` (headset) + Language `IconButton` `translate` | as `onboarding.md` |
| Strip + *(1/5)* | ProgressBar `segmented` `S`; count leaves the Button | — |
| 22 · *Nearest training centre · Koramangala · 2.5 km away* | ListItem `informational` with Tag `brand` for the distance and a `tertiary` **Change** | not a SelectionCard — nothing is selected here |
| 22 · date cards | SelectionCard `date` strip (≤ 7) | shipped as a vertical radio list; the system's `date` strip is the same facts |
| 23 · blue banner | Banner `info` | — |
| 23 · tick + title + pill | EmptyState-style header → **Card `state`** top block: Badge success + Heading2 + Timer `deadline` (*Fri 7 Feb · 10:00 am*) | the pill = Timer `deadline`; on the day Timer `countdown` (24/47); late = Timer `deadline` `warning` (48) |
| 23 · *Your Timings* timeline | Stepper `list` (2 steps; states `todo` / `current` / `done` / `attention` for *Missed*) | 49–50 use `done` + `attention` + `todo` |
| 23 · *Important* band | ListItem `informational` with the ID pictogram (asset) — or Banner `warning` | documents = `identification-card` meaning |
| 23 · centre card | composition: three photos (Card media) · Heading3 · BodyMd address · two Stat rows (metro, bus) with VoicePrompt inline Listen · IconButton ×3 *Map · Call · Share* | **MapSnippet `hub`** replaces the photo strip per `onboarding.md` § 6b; Share → `whatsapp-logo` rule |
| 23 · *Training Videos* | HowToClip `card` ×2 + PageIndicator | surface 3's component, moved here on the shipped screen |
| 23 · *Refer your friend ₹5,000* | PromoCard `referral` | not part of the visit |
| 23 · buttons | Button `primary` L + Button `secondary` L stacked | — |
| 38 · change centre list | SelectionCard `compact` list (name + distance fact) | `rich` if a next-slot fact is added |
| 42 · change date | SelectionCard `date` | — |
| 49 · missed re-pick | SelectionCard `date` strip ×3 + Button `primary`; the **!** = EmptyState `attention` head | *Submit* → a verb |
| 26 · Aadhaar ready | `onboarding.md` § 5 as is (scene asset + Banner `warning` + Button) | — |
| 27 · verified | Card with ListItem `informational` label/value rows ×6 | surface 22's shape |
| 28 · congratulations | `onboarding.md` § 6a *Onboarding complete* scene | — |
| **31 · Expert ID card** | **no match** — nearest: HeaderNav subtitle *name + ID* (Beauty go-live shell) for the ID; NumericKeypad `otp` boxes *as display* for the three digits; Timer `deadline` for *valid for today* | surface 35; inherits Card padding, Heading1 digits, BodyMd caption |
| 32 · Home task card | Card `state` + Button; benefits = PromoCard carousel | `onboarding.md` § 8 Stepper replaces the single card |
| b01 · choose | BottomSheet `select` (two Radio rows with pictograms) — `payout.md` § 3 | shipped is a full screen with picture cards = SelectionCard `hero` ×2; either is a system part |
| b02 · presenter video | HowToClip `guide` (inline 16:9, collapses) | already a follow-up in `onboarding.md` |
| b02 · fields | TextField ×3 → NumericKeypad for the account number, TextField for IFSC | `payout.md` |
| b06 / b18 · name check | Card + ListItem rows + Button pair **Yes** / *No* | the *Is this you?* shape |
| b08 · PAN | MediaCapture `document` → `preview` (`payout.md`) | shipped types it — delta |
| b09 / b20 · sheets | BottomSheet `info` with Stepper `list` ×2 / Statement two rows | — |
| i01 · benefits | ListItem `informational` ×4 with pictograms; header Card = illustration (not 3D) | vocabulary rewrite |
| i02 · who | SelectionCard `compact` grid | — |
| i03 / s01 · details | TextField · DatePicker · TextField `phone` | — |
| s03 · how many kids | Stepper? no — SelectionCard `compact` row of 5 or a NumericKeypad count | — |

---

## Step 5 — what travels to contactless-gl

| Surface | Base here | What changes for contactless |
| --- | --- | --- |
| **34** Hub screen: address, map, timings, what to bring, advance amount | **23 / 24 / 29** (confirmed · reach · after KYC) top-to-bottom order; 25 for the map | Keep the order *when → bring → where → go*; the top block is the Timer `deadline` for her visit (PRD § 3.11 point 1); replace the photo strip with MapSnippet `hub`; the *Important* band becomes a row of pictograms (Aadhaar, phone, the advance) instead of a sentence (P1); add the **advance amount** as an Amount row (open question 9); drop the video carousel and referral card from the visit screen (P1 related is not needed); one primary — *Show directions* or *I'm on my way* — and Help in the header (P2) |
| **35** Expert ID card with a rotating code, on the Hub screen and Home | **31** *Share Expert ID and OTP with Trainer* | Same idea (she shows, the agent types — PRD § 3.11 and the Beauty go-live G15–17 confirm the direction); add what 31 lacks: her KYC photo and name beside the ID (PRD § 3.11 point 1), the code's life as a Timer `deadline` shape (*valid until 6 pm* or a draining ring), a spoken line on first show (P4), and the card as a block on 34 and on day-one Home — not a separate screen. **No shipped base for rotation** — open question 10 |
| **36** *Your visit has started with <agent>* | none here; 25's *YOUR TRAINER Mansavi Shukla* row is the only person-on-the-card precedent | Card `state` with Avatar + Tag *With you now* above the ID card (`check-in-out.md` customer card) — not in any Self-Serve frame |
| **37** After the visit: uniform size, quantity, payment status, BMI | none here | Statement (Beauty go-live G5) — the TC section ends at training; nothing about kit or BMI is drawn in this file |
| **38** Work area pending blocks moving on | none here | the shipped flow has no skippable step; the Stepper `attention` / `locked` shape comes from `onboarding.md` § 8 |
| **32** Joining date | **22** date cards; **42** change date; **49** three-tile re-pick | SelectionCard `date` strip; keep *Tomorrow* as the first tile's label (shipped twice) |
| **33** Slot confirmation with edit | **23** *Your Timings* + *Change*; **40 / 43** toast after a change | the toast-on-return pattern travels as is (Snackbar `success`) |
| **15** Seat released after 7 days | **49 / 50** missed → re-pick with history kept | the dignity shape: fact in the timeline, next step inline, no red |
| **47** Reminders evening before / morning of | **46** *Day 1 Training Tomorrow* · **47** *Please reach the training centre* · **48** *Reach before 12 pm* | three states of one screen, not three notifications — the notification deep-links into the state |
| **18** DigiLocker with *Stay in the app* banner | **26** *Do not exit app now* band · **27** verified summary | as `onboarding.md` § 5 |
| **22** Name / DOB / gender confirm | **27** six-row summary | add **Yes, that's me** / *Not me — call help* (shipped has one button *Completing onboarding*) |
| **30** Completion screen | **28** | as `onboarding.md` § 6a; the shipped button *Let's train now* becomes the certificate / Home step for contactless (training already done) |
| **3** Intro videos | **23**'s *Training Videos* tiles (HowToClip `card`) | the tiles exist; moved to the front of the flow per PRD § 3.2 |
| **9 / 10** Registration · gender rejection | **13–16** · **35–36** | as TIERS; *We are not hiring male experts at the moment* is the shipped string to rewrite (P6) |
| **44** Day-one Home | **b13** (bank section) · **32** | `onboarding.md` § 8; keep the *Need help? Call our team* rows (surface 45) |
| **49** Progress count | strip 4 segments / *x/5* labels | insurance is **not** a step (Home card, b13); the count is onboarding's own |
| **7 Get paid** (runs after) | **b01–b20** | deltas for `payout.md`: shipped PAN is typed with an e-PAN path (b09) — spec says photo; UPI handle chips (b14) and the *…or a family member* consent (b18) are not in the spec; the bank form asks the account number twice. None blocks this project |

**No base in these sections:** 36, 37, 38, 39 (BMI fail), 40 (TnC — the Beauty go-live G9 is the base), 41–43 (go-live selfie), 31 (certificate), 11–16 (work area / shift), 4–8 (permissions — the TC section asks for no permission on screen), 20–21 (face consent / liveness), 23–24 (KYC error table — only *Incorrect OTP* and the Aadhaar happy path are drawn).

---

## Step 6 — open findings

- `patterns/onboarding.md` § *What changes* row for TC (map · *TIME LEFT 1 day* · trainer · documents) describes the **faded older frame** `619:61330`; the current confirmed card `770:44582` has no map, no trainer, no time-left ring, and adds photos, Map/Call/Share, videos and a referral card — the pattern's § 6b should name which it follows (the system's MapSnippet + Timer `deadline` choice still stands; the trainer row is gone from the shipped card).
- The pattern says *Call trainer always present*; the shipped card's *Call* calls the centre, and the trainer appears only on the Expert ID screen (31) — for contactless the *person* is the Hub agent, which is surface 36.
- `references/SCREENS.md` lists five sections for this file; **Insurance** (`659:74952`) and **Step 5 - Insurance** (`905:61505`) are not registered — register before using them as evidence.
- The two insurance sections disagree: Step 5 says *nominee* eight times and collects relationship + children with checkboxes; the newer *Insurance* section asks *Who should get the money?* with cards and a 3-step progress — the newer one matches the vocabulary and is the one to cite.
- Insurance is not an onboarding step on any screen (Home card *Add insurance*, b13); the section title *Step 5* is a file label.
- The PRD § 3.11 says the agent enters the expert ID and a valid code; the shipped TC screen (31) shows an ID and a **trainer OTP** valid *for today's training session* — the code is per-day, not rotating; whether contactless needs rotation is open question 10.
- The shipped visit screen's cut-off moves (*Reach by 9:45 AM* → *Reach before 12 pm*) with no rule shown; the PRD gives no late rule for the Hub visit — ask with question 9.
- The confirmed card's primary is *Verify Aadhar* because KYC comes **after** the centre is booked in the TC flow; in contactless KYC precedes the Hub (PRD § 3.7 → § 3.11), so surface 34's primary is the trip itself.
- *Go to training centre* carries a ₹ glyph on every state frame — read as a leftover; the PRD's advance amount (question 9) may be why it is there, but nothing on the screen says so.
- Bank/UPI: the shipped PAN entry is typed with an e-PAN path and a *you or a family member* UPI consent; `payout.md` § 3 specifies a photographed PAN and no family-member clause — a delta for the payout pattern's owner, not for this project.
- The TC section asks for **no permission** on any frame (no location sheet, no camera) — the permission flow for contactless has no base in this file; `patterns/permissions.md` and Mobbin are the sources.
