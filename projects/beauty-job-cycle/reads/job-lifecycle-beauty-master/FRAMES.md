# Read — *Beauty Expert Master* · Job lifecycle

| | |
| --- | --- |
| File | **Beauty Expert Master** `MBl1qmM0jgAJn49V8oBxLO` |
| Page | `Job lifecycle` `34:41693` |
| Section | **Final Designs DS Compatible** `152:78592` — 12782 × 20092, 78 children, **62 screens** |
| Read | 2026-09-16 |
| Supersedes | `WEUPV9q19eAqRbkZSBj6OY` § `19:18372` as the build target for this project |

A second section `152:93447` carries the same name and is **empty** (0 children). Ignore it.

## The finding that reframes the project

**The page is the Cook job lifecycle, not Beauty.** *Spice level · Oil level · View Recipes · Your cooking space ·
Add photos of dishes you cooked*, and *COOOOKS* / *Dosa* on the home cards. There is no Beauty string in 62 screens.

So the file is the **master shell**: the category-agnostic job lifecycle with one category filled in. That is
exactly the thing the stakeholder's instruction points at — *stick to the existing designs so it is easy for the
devs* — and it means the job is **swap the category block, keep everything around it**, not *design a job cycle*.

## Flow map

Read left→right within a row; rows are stacked lanes.

| Lane | y | Screens | What it is |
| --- | --- | --- | --- |
| Check-in variants | 455 | 4 | Check In with `CHECK IN BY 7:45 PM` and `RUNNING LATE -01:23`; earnings expanded / collapsed |
| **Main line** | 2601 | 24 | Home → New Job → Check In → Running late → OTP start → Job In Progress → OTP end → *What tasks did you do?* → Rate → Block |
| Sheets | 3608 / 5210 | 3 | component-built sheets (incl. a Toast variant) |
| Home | 7024 | 4 | *Searching for jobs nearby*, *More From Snabbit* |
| Over-the-app | 8598 | 2 | full-bleed image + `Over the app` overlay instance |
| Deny | 9922 | 3 | New Job **with Deny** + *You will lose your job earnings* |
| Offline | 11485 | 4 | *Bad internet connection* · *No internet connection* on check-in |
| Chat | 13076 | 5 | quick replies (*I have reached*, *Please give gate approval*), thread, **Reach Job Location** |
| In-progress + Kavach | 14648 | 10 | timer states, `YOU EARN ₹145`, battery low, no storage, *Are you in danger?*, SOS active, Kavach intro |
| Last-hour deny | 16809 | 3 | *You will miss earnings of ₹240* → **Accept Job / Logout** |

## Screen anatomy, as drawn

**New Job** `152:81081` — no map. Centred title with icon. The hero is **earnings**: *You Will Earn* / **₹150** in
display size, an accordion chevron, then the breakdown — *Work (1 hour) ₹120*, ***Check In by 7:45 PM ₹5*** on a
tinted blue row, *Long Distance (1.2 Kms) ₹20*, *Summer Bonus ☀️ (1 hour) ₹20*, *OT (15 min) ₹40*. Footer:
`ACCEPT IN` / **1:23** green, **Accept Job** green, **Deny** white with a red label. Help / SOS top right.
**The customer is not named on this screen.**

**Check In** `152:81413` — earnings card **collapsed** to one line (*₹145 + ₹5* + a *Check In by 7:45 PM* pill).
Customer card: name, `Listen` speaker, full address, then four action tiles **Map · Call · Chat · Street view**
(Street view is a thumbnail). Footer `CHECK IN BY 7:45 PM` / **1:23** green, **Check In** pink.

**Job In Progress** `152:80546` (h852 and a tall h1268 variant) — green gradient header, centred title with icon,
**ring-pill timer** `TIME LEFT 48:23`. Then: customer card containing name + chat/call icon buttons + *Job Timing
10:00 AM – 11:00 AM* + *Duration 60 min*; a **Snabbit Kavach** row with a blue shield and an *Activate* button;
then a section header ***Customer preferences*** sitting **outside** its card, with *Spice level / Oil level* inside
it; then ***Your cooking space*** with *Add photos of dishes you cooked* → *Add Pictures*. **Complete Job** pink,
disabled until the timer allows it.

**What tasks did you do?** `152:80881` — a bottom sheet over a dimmed, red-tinted in-progress screen with a close X.
**Its body is an empty magenta dashed placeholder.** One **Okay** button. This is the slot § 6 fills.

## What this answers

| # | Question | Answer from this file |
| --- | --- | --- |
| **10** | *"What have you done" is not on the board* | It **is** here, as ***What tasks did you do?*** `152:80881` — a bottom sheet after the end-job OTP, with an **undesigned body**. The space is reserved and blank. |
| **13** | Block cap never states the number | It does: ***5/5 People blocked*** / ***4/5 People blocked***. The cap is **5**. |
| **2** | Extension — booked or mid-job? | Shipped shows it **time-level only**: a *Job extended by 15 min* banner, `Duration +15 min`, `60 min + 15 min`, `TIME LEFT 14:23`. **No service-level view, and no mid-job offer flow.** § 4's *"at both time and service level"* has no shipped half. |
| **6** | Auto-checkout | No surface. Still open. |

## What it does not answer

| # | Still open |
| --- | --- |
| **11** | **No denial-reason picker in this file either.** Deny leads to a cost warning — *You will lose your job earnings* (Accept Job / Deny), and at the last hour *You will miss earnings of ₹240* (**Accept Job / Logout**). Two files, no reasons. |
| **3 / 4** | The buffer has **no shipped equivalent** in this file. Duration and paid/unpaid still unknown. |
| **5** | Trust. Unchanged by this read. |
| **7 · 8 · 9** | § 6 mechanics. Unchanged — the sheet body is blank. |

## New — states this project had not accounted for

Present in shipped, absent from the Paper board: **chat + quick replies**, **Reach Job Location**, **offline**
(*Bad internet connection* / *No internet connection*), **Street view**, **Listen** on the address, **send a message
to customer** on check-in, and the whole **Snabbit Kavach** sub-flow (intro sheet, Activate, *Always keep your phone
with you*, *Battery is running low*, *No storage available*, *Are you in danger?*, SOS active).

## Where the Paper board departs from it

The board was drawn against the Househelp file and against the PRD, before this file existed.

| Paper | Shipped | Verdict |
| --- | --- | --- |
| **1.01** map-first, customer-led, no Deny, `ACCEPT IN` inline as a chip | no map, **earnings-led**, customer not shown, Deny present, timer above the button | **rebuild** |
| **1.03** check-in | earnings collapsed to one line + four action tiles | **rebuild** |
| **1.06** card timer + linear progress bar, left-aligned title | **ring-pill** timer, centred title, green gradient | **rebuild** |
| **1.02 / 1.07** products as a full page and a sheet | the slot is *Customer preferences* + *Your cooking space* | **re-site** |
| **1.09–1.11** three full screens for § 6 | one bottom sheet with an empty body | **re-site** |
| **1.12b** *You can block 3 people* | **5** | **correct the number** |
| **1.05** buffer | nothing | keep as invention; flag |
| — | chat, offline, Kavach, Reach Job Location | **missing from the board** |
