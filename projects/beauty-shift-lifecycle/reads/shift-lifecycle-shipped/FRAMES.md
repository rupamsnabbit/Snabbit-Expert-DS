# Frame index — Shift Lifecycle, as shipped

File *Shift – Job Lifecycle DS* `WEUPV9q19eAqRbkZSBj6OY` · page **Shift Lifecycle** `28:18373` · section **`138:38552` "Final Designs DS Compatible"** (7669 × 22120).

> Corrected 2026-09-15: this was recorded as page *Job Lifecycle* `0:1`. It is not — `0:1` holds the **job** lifecycle board (section `19:18372`), read into `projects/beauty-job-cycle/`. The file has four pages: `0:1` Job Lifecycle · `28:18373` Shift Lifecycle · `2678:52696` UAT · `2112:60691` BRANDING.

Per `references/SCREENS.md`, *Final Designs DS Compatible* is the shipped state — so everything below is what the app does today, not a working copy.

Pulled 2026-09-12 by running a read-only traversal inside the file (`use_figma`) rather than dumping metadata, which exceeds the response limit on a board this size. **Cite these IDs in the pattern's *What changes from the shipped screens* table.**

---

## What the screens are actually built from

97 screen frames · **823 component instances** · **48 distinct components**. This is the most useful finding on the board: the shipped app is already composed from a component library, not hand-drawn. The reconciliation job is renaming and de-duplicating, not introducing components.

| Component | Uses | Maps to |
| --- | --- | --- |
| Component / Home Indicator | 94 | OS chrome — not ours |
| **Navigation Card** | 85 | the Home shift card — the hub of the whole lifecycle |
| **Building Blocks** | 79 | generic container → `Card` |
| Banners - 22 | 65 | the *More From Snabbit* carousel |
| **Top nav** 59 + **TopNav** 20 | 79 | `header-nav.md` — **two components for one meaning** |
| Buttons | 51 | `button.md` |
| Divider | 45 | `stat-rating-divider.md` |
| **Attendance** 37 + **Attendance Card** 3 | 40 | **two components for one meaning** |
| Badges Groups 33 · **Badge - Parent** 15 · **Badge [1.1]** 4 | 52 | `badge.md` — **three generations live at once** |
| Tags | 23 | `tag.md` |
| Maps 23 · Map widget 1 | 24 | `map-marker.md` |
| Icons 20 · Icon / tasks · Icon / home · Icon / back | 23 | Phosphor register |
| Container | 18 | `card.md` |
| ListItem / meta | 15 | `list-item.md` |
| Coins & Cards - Small 14 · - Groups 5 · - Chips 2 | 21 | coin / red-card assets |
| Bottom Sheets 14 · Bottom sheet / Subcomponents / Home indicator 2 | 16 | `bottom-sheet.md` |
| Breakdown List 12 · Progress Stat - List 12 · Pay Summary - Icons 10 · Summary Card 3 · List Items - Payout 3 · Earnings Card 1 | 41 | `patterns/earnings.md` compositions |
| Timers | 8 | `timer.md` |
| Camera Preview | 6 | `media-capture.md` |
| Calendar 5 · Lock 6 · star 4 · Cross 4 | 19 | icons / assets |
| Button Groups 4 · Radio button 3 · Toast 3 · **Nudge 2** | 12 | `button.md`, `selection-controls.md`, `feedback.md`, `nudge.md` |
| Carousel Strip 2 · Job States 1 | 3 | |
| **Component 39** 2 · **Component 8** 1 · **Component 19** 1 | 4 | **unnamed — Tier 0** |

**Four findings worth acting on**, all of which belong to the system rather than to this project:

1. **`Top nav` and `TopNav` are two components doing one job** (79 uses between them). Same for **`Attendance` / `Attendance Card`**, and Badge is on its third generation (`Badges Groups`, `Badge - Parent`, `Badge [1.1]`).
2. **`Building Blocks` (79) and `Container` (18)** are generic names carrying real structural load. Neither says what it is.
3. **`Component 39`, `Component 8`, `Component 19`** — unnamed components in shipped screens, exactly the pattern `EXTENDING.md` calls Tier 0.
4. **`Nudge` is used twice.** The yellow *Login by 6:50 AM · 🪙1* strip is drawn ad hoc almost everywhere else — so the component exists and is not being used.

---

## Frames by section

Screens are 393 × 852 unless noted. `x` is the position in the band, left to right in flow order.

### Home page with Map / Seva / Logout — y 978
`33:67141` x787 · `33:67676` x1270 · `43:27392` x1753 · `91:22503` x2236 · `43:28884` x2719 · `47:27143` x3202 · **`47:27971` x3685 "Post Logout - Earnings"** (h 1479) · `47:29924` x4137 · `108:38099` x4990 · `933:32253` x6473 "My Profile" (h 1600) · `933:32501` x6896 "My Profile" (h 1600)

### First login — y 3037 (label `53:28161`)
`64:28689` x787 · `53:28877` x1254 (h 1078) · `69:15873` x1721 (h 1310) · `76:32297` x2188 · `76:31041` x2655 (h 1310) · `76:32653` x3122 · `76:33040` x3589 · `76:33400` x4056 *Snabbit Cancelled* · `76:33885` x4523 · `76:33957` x4990 · `76:33989` x5457 · `76:34516` x5924 · `76:34173` x4990 y4021 · `76:34417` x5457 y4021

### Attendance — y 5388 (label `76:35012`)
`76:35279` x787 · `76:36025` x1254 · `76:37531` x1721 · `76:37790` x2188 · **`76:39231` x2655 — the *FALSE PRESENT* state** · `76:39884` x3122 · `76:40923` x3589 · `318:44202` x4041 · `318:43671` x4480 · `540:45062` x4966 · `540:45414` x5452

### Login — y 7248 (label `76:42902`)
`76:43489` x787 · `76:43746` x1254 · **`76:44375` x1721 — selfie intro** · `76:44467` x2188 · `76:44493` x2655 · **`76:44003` x3122 — Home after login** · `76:44453` x3589

### Leaves — y 9045 (label `76:44851`)
`76:44852` x787 "My Profile" (h 1531) · `76:45327` x1254 · `76:45397` x1721 · `76:45883` x2171 · `76:46324` x2638 · `76:47293` x3105 · `76:47960` x3589 · `76:48381` x4104
**Leaves deleting flow** (label `76:48644`): `76:48645` x5187 · `76:49254` x5637 · `76:49373` x6087

### No show — y 11644 (label `87:22437`)
`969:56763` x302 · `87:25332` x787 · `87:25605` x1298 · `87:39237` x1809 · `87:39946` x2320 · `87:40260` x2787 · `87:40668` x3254

### Emergency logout — y 13687 / 14764 (label `222:48361`)
`219:37984` x787 **Profile** (h 1531) · `3993:55323` x334 · **`220:38847` x1280 — the consequence sheet** · `222:40504` x1773 · `222:41182` x2266 · `222:42121` x2759
Row 2 — **`222:43283` x1280 — Period Leave unticked** · **`222:45827` x1773 — Period Leave ticked, red-card tile gone** · `222:46559` x2266 *Mark tomorrow's attendance* · **`222:46997` x2759 "Post Logout - Earnings"**

### Lunch — y 16296 (label `226:28679`)
`222:49069` x787 *Before 12 AM* — in-job · `222:49448` x1280 · **`222:49936` x1773 — 28:23** · `222:50268` x2244 — 14:23 · `222:50566` x2726 — 05:23 · `222:51238` x3219 — end-break confirm · `226:28043` x3712 · **`2636:52690` x4194 — "LUNCH STARTING IN 04:23"**

### Overtime — y 18039 (label `226:28680`)
`3569:54729` x15 · `226:28681` x787 · `2536:53191` x1280 *Before 12 AM* · `2536:53453` x1773 · `226:30514` x2259 · `2553:52470` x2882

### Multi attendance — y 19960 / 20977 (label `764:29849` band)
`764:31257` x787 · **`764:29849` x1280 — "Mark attendance for next 4 days"** · `764:30049` x1773 · `764:30251` x2266 · `764:30457` x2759 · `764:30875` x3252 · **`764:31732` x3745 "Post Logout - Earnings"** (h 1479) · `764:31482` x4238 · `764:30666` x5032 · `764:31066` x5525
Row 2 — `764:31877` x1773 · `764:32191` x2266

---

## Exact copy, pulled from the layers

Not read off screenshots — these are the real strings.

### Multi attendance `764:29849`
> Mark attendance for **next 4 days** · (then *Mark attendance for upcoming days*)
> `8 FRI` `9 SAT` `10 SUN` `11 MON`
> Wednesday, 8 February · 7:00 AM - 12:00 PM
> You can earn · **₹800 - ₹1000**
> Mark attendance · 6:30 AM
> **Absent** · **Present**
> **Submit Attendance**
> answered state: *Present* · *Change*

### Logout entry
> Shift end time 6:00 PM · Log out to view your today's earnings · **Logout**
> after: *Logged out successful and attendance submitted*

### Login `76:44003`
> Login by 6:50 AM · Tuesday, 7 February · 7:00 AM - 12:00 PM · Present · Change · **Login**
> Your Hotspot · Jyoti Nivas College Gate · 3.2 km away · Map
> UPI ID/ Bank details missing
> selfie `76:44375`: **Take a selfie** · Take clean, Clear selfie · Do not click selfies like this · **Align the face and logo**

### Emergency logout `220:38847` / `222:43283` / `222:45827`
> Profile → Shift & Availability → Request overtime · Apply leave · **Emergency logout**
> **Shift ending in 01h : 36m : 12s**
> **Emergency logout will lead to**
> `-50` **1 Red Card** · `FULL SHIFT` **Miss Full Shift** · **Lose ₹250**
> **Period Leave (1 Available)** ← ticking it removes the *1 Red Card* tile
> **Go back** · **Logout**
> then: *Mark tomorrow's attendance* · Tuesday, 7 February · 7:00 AM - 12:00 PM · Absent · Present

### Post-logout earnings `222:46997`
> Today's Earnings - 13 March · Shift Timing (5h) 7:00 AM - 12:00 PM · Login Time 6:40 AM · Logout Time 11:50 AM
> Present · Full Shift · **Daily Earnings ₹530**
> Min G ₹500 · Base Pay ₹390 · Work ₹130 · Check In ₹5 · Long distance · **Summer Bonus ☀️** · OT ₹0 · Gold Coins 3 ₹30 · Red Cards 0
> Bonus Progress — Shakti Bonus ₹1,000 / ₹2,000 / ₹3,000 · 10 Full Shifts done · Joining Bonus ₹2,500 · Winback Bonus · Vishwaas Bonus ₹1,580

### Lunch
> in-job `222:49069`: Job In Progress · TIME LEFT 25:23 · **Lunch Break coming up in 30 mins** · Snabbit Kavach [Activate] · Radhika S · Job Timing 10:00 AM - 11:00 AM · Duration 60 min +15 min · YOU EARN ₹145 · Complete Job
> home `222:49448`: **Lunch in 5 mins**
> buffer `2636:52690`: **LUNCH STARTING IN 04:23** ← **this is the 5-minute buffer that becomes 10 for Beauty**
> running: TIME LEFT 28:23 → 14:23 → 05:23 · **End Break & Start Earning**
> confirm `222:51238`: **Are you sure you want to end the break ?** · End Break · Go Back

---

## Copy that cannot ship as-is

Each fails a rule already in the system; each needs a line in the pattern's *What changes* table.

| Shipped string | Rule it breaks |
| --- | --- |
| **Submit Attendance** | `button.md` — *Submit* is banned; and it is a lie, since D+2/D+3 save on tap |
| **OK** (selfie sheet) | banned; lint warns |
| **Absent** / **Present** side by side | P2, P3 — a costly option mirrored beside the desired one |
| **FALSE PRESENT** `76:39231` | accuses; not her words (P6) |
| **Are you sure you want to end the break ?** | a centred dialog, and *Are you sure* names no outcome |
| **Emergency logout will lead to** | jargon; the tiles below it already say it better |
| **Period Leave (1 Available)** | a form field's name, not hers |
| **Min G** · **Base Pay** · **OT** | already flagged in `patterns/earnings.md` |
| **Summer Bonus ☀️** | emoji as content (P6); `foundations/assets.md` has the bonus asset |
| **Log out to view your today's earnings** | ungrammatical in English, and it buries the outcome |
| **Your Hotspot** | replaced by *Your work area* for Beauty |

Two nav generations also appear across the board — `Home · Earnings · Refer · Profile` on most frames, and `Work · Earnings · Inbox` on some of the emergency-logout and lunch frames. `DECISIONS.md` already fixes the four-tab bar; the second set is drift and should not be drawn from.
