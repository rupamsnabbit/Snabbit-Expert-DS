# Read — Shift Lifecycle, as shipped (Househelp)

| | |
| --- | --- |
| Source | Figma *Shift – Job Lifecycle DS* (`WEUPV9q19eAqRbkZSBj6OY`), node `138:38552` |
| Captured | 2026-09-12 |
| Kind | **Shipped screens** — evidence of what the app does today, not inspiration |
| Read for | `beauty-shift-lifecycle` — the Beauty variant of this same backbone |

This is not a Mobbin-style inspiration read. It is the **base** the PRD says is unchanged, captured because `patterns/` has no spec for it. Every *inherit* surface in `FLOWS.md` is matched against these frames; every departure is cited in the pattern's *What changes* table.

## The board

Ten sections: **Home page with Map / Seva / Logout · First login · Attendance · Login · Leaves (+ leave-deleting) · No show · Emergency logout · Lunch · Overtime · Multi attendance.**

## What the shipped flow does

**The Home shift card is the hub.** Attendance, login, the hotspot and logout all happen on one card that changes state through the day — it is never a separate screen. Beauty must keep this; it is the thing she already knows.

| Stage | Card shows |
| --- | --- |
| before attendance | date · `7:00 AM – 12:00 PM` · *You can earn ₹800 – ₹1000* · *Mark attendance for tomorrow* · **[Absent] [Present]** |
| after attendance | `✓ Present` + *⟳ Change* · **[Login]** · Nudge *Login by 6:50 AM 🪙1* · *Your Hotspot · Jyoti Nivas College Gate · 3.2 km away · Map* |
| after login | map takes over · *Searching for jobs nearby* · stories · banners |
| end of shift | pill on the map: *🕐 Shift ends at 6:00 PM* **[Logout]** |

**Attendance change** is a two-step centred dialog: *You can earn ₹800 tomorrow · Change your attendance?* → if Absent, *Are you sure you want to change attendance?* with three `−50` red-card assets → *FALSE PRESENT* state → a Warning dialog *Red cards waived off this time · Repeated violations lead to 3 red cards* with **I will not repeat again**.

**Login** = Login button → *Take a selfie* sheet (one good example ✓, then a red-bordered *Do not click selfies like this* grid of six) → camera with a face oval and *Align the face and logo* → green *Login successful* → back on Home with a coin animation and *EARLY LOGIN AT 7:45 AM*.

**Lunch** = Nudge *Lunch break coming up in 30 mins*, then *Lunch in 5 mins* — **this 5 is what becomes 10 for Beauty**. The lunch card is a metallic tiffin + bottle on a pink stage with a Timer ring: green `28:23` → amber `14:23` → red `05:23`, and **End Break & Start Earning**. Ending early is a centred dialog.

**Logout** = the map pill's **[Logout]** → *Mark tomorrow's attendance* sheet (calendar illustration, date card, [Absent] [Present]) → *Today's Earnings* with ✓ Logout Successful, shift/login/logout times, Daily Earnings, MinG, OT, Gold Coins, Red Cards and Bonus Progress bars. **Attendance comes before earnings** — which is where Beauty's bag check inserts.

**Emergency logout** lives in Profile → *Shift & Availability* → *Emergency logout* (a red row). The sheet shows a countdown pill *Shift ending in 01h : 36m : 12s* and three consequence tiles side by side — **1 Red Card · Miss Full Shift · Lose ₹250** — over **[Go back]** and a **slide-to-confirm Logout**. A **Period Leave (1 Available)** checkbox sits above the buttons; ticking it **removes the red-card tile**, and the button drops the slide. Afterwards: a red *EMERGENCY LOGOUT* banner, a `−50` animation, then *No red card applied · We have waived off for you this time* → **I will not repeat again**, and the earnings screen opens with a heart and **Take care!**

**Multi attendance already exists** — a sheet titled *Mark attendance for next 4 days*, a horizontal 4-day strip (`8 FRI · 9 SAT · 10 SUN · 11 MON`), one day's card at a time below it, and a **Submit Attendance** button at the bottom. **The stakeholder has instructed that this is not to be referred to** (v1.1): Beauty's version is designed from first principles. It is captured here only so the departure is visible and deliberate.

## What travels, and what does not

**Travels.** The Home card as the single hub. Attendance before earnings at logout. The consequence-tiles pattern in emergency logout — it states the price of an action in objects, not sentences (P1), and it is the best thing on this board. The Period Leave checkbox that visibly removes a consequence. The Timer ring's green → amber → red. *Take care!*

**Does not travel.**

| Shipped | Why not | Instead |
| --- | --- | --- |
| **Centred dialogs** throughout | `bottom-sheet.md`: the sheet is the only modal surface in the Expert app — a centred box reads as "something broke" | BottomSheet |
| **[Absent] [Present]** as an adjacent 50/50 red/green row | P2 (one next action) and P3 (a costly option mirrored beside the desired one) | One question, options stacked, safer one primary |
| Green / red action buttons | Status colours used as interaction colour; `button.md` tones are brand / neutral / danger | Tone by meaning |
| **OK** on the selfie sheet | Banned (`button.md`, `content.md` § 9); the lint warns on it | *Take selfie* |
| **Submit Attendance** | Banned for the same reason | Answer saves on tap; no submit |
| Four days in the multi-attendance strip | The PRD says three | Three, and only one of them is a new question |
| *FALSE PRESENT* | Not her words, and it accuses | State the fact, show the way back (P6) |

## Files

`00-board.png` whole board · `01-attendance.png` · `02-login.png` · `03-lunch.png` · `04-emergency-logout.png` · `05-multi-attendance.png` · `06-home-logout.png`

Internal reference only.
