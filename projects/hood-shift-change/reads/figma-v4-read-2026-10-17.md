# Figma V4 read — 2026-10-17

Source: file `cIAH24e13VZJu31OmiMWrj`, sections **V4** `481:36972` (85 nodes) and **V4 Expert ID** `492:51478` (30 nodes). The lead's ask: *"I made V4 for the app, after feedback; read all the screens and incorporate the change; I want to see if you understood."*

**Method.** Both V3 and V4 sections were rendered at half size, and every V4 frame was compared pixel by pixel with the V3 frame at the same position. 39 frames are identical to V3: Home, Profile, the spotlight, the video, Confirm your move, Done, the whole hand-hold, WhatsApp, C2, C4, and the Expert ID listen, speak, sheets and keypad. Every changed or new frame (about 40) was then read on its own.

## What V4 changes

| # | V3 | V4 | Frames |
| --- | --- | --- | --- |
| 1 | *Do you want to work with a friend?*: alone or friend | **Select an option**: *Change my shift time* · *Change my hood* · *Work with a friend*. Three intents, three pictures | 481:41035 · 492:48652 · 492:51797 |
| 2 | Alone: one deck of Place + Time | **One card per intent.** Time: only the Time card. Hood: only the Place card. Friend: the Expert ID card, as before | 481:41190–41350 · 492:48807–48928 |
| 3 | *Confirm your hood & shifts*: Place + Time rows | Time: **Confirm your shift time**, with Start time 9 AM · End time 7 PM · Shift time 8 hours. Hood: **Confirm what you said**, with only the Place row | 481:37540 · 492:48268 |
| 4 | Modify start time (part-of-day dials) · Modify hours (8 / 4 / 6 / 10 / 12) | **Select shift start time** 9–12 · **Select shift end time** 5–8 PM · **Select shift time** 4-6 / 6-8 / 8-10 / 10-12 hrs | 492:50895 · 492:50998 · 492:51101 |
| 5 | Pink filter chips under the nav | The chips are gone. A collapsible card instead: **Change timing** (Shift time · Start time · End time) in my-hood and friend results, **Filters** (Hoods · Shift time · Start · End) in new-hood results | 481:41401 · 481:36973 · 481:38023 · 492:52510 |
| 6 | Hours sheet 4 / 6 / 8 / 10 | **Hour ranges**: Any hours · 4-6 · 6-8 · 8-10 (Now) · 10-12 hrs, and a new **Select end time** sheet | 481:40702 · 492:50566 |
| 7 | Time rows "9 AM → 5 PM" | **"7:00 AM to 5:00 PM"**, with a clock + "6 hours" line under it | all results |
| 8 | 1.06 always "HSR and Bellandur are full" | The sheet names what she asked: **"HSR is full right now"** | 481:42395 |
| 9 | Offer card: one Timing row | **Start time** and **End time** rows | 481:43546 · 492:52945 |
| 10 | Manual: area → part of day → hours | area → **start time → end time → hour range** (progress 1-2-2-3) → finding → results | 481:37876 → 481:41658 |
| 11 | Finding screens with chips | No chips | 481:41566 · 481:41609 · 481:41838 |

## Inconsistencies in the frames (asked, not fixed)

- The friend copy of the option screen (492:51797) still has the old title *Do you want to work with a friend?*. The prototype uses *Select an option*.
- *Confirm your shift time* shows the transcript "सुबह 9 से 5" over End time **7 PM** and Shift time **8 hours**. The prototype reads all three from what she said.
- The time deck's prompt still says *Tell us your Place and time* over a Time-only card.
- *Select timings* (481:37672) still draws the V3 pink chips, while every other results screen uses the new card. Kept as drawn.
- The hours step of the manual row is titled *Select shift time*, the same title as the hours picker; the start and end steps are titled for themselves.
