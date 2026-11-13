# Build plan — Expert penalty constructs (iteration 1, 2026-10-27)

Written **before** the first artboard. Every screen is a **shipped frame copied exactly from Figma, then edited** (the lead: "we just need to use our existing screens"). Shipped frames are in *Shift – Job Lifecycle DS* (`WEUPV9q19eAqRbkZSBj6OY`); the read is `reads/figma-lifecycle-2026-10-27/`. Flows are `FLOW.md`; screen ids match `TIERS.md`.

Sources in this order and no other: **shipped app → `patterns/` → `components/` → Mobbin → invention.** No row below reaches Mobbin or invention.

Illustrative values everywhere (PRD placeholders): grace **2:00**, **2** red cards, dark **36 min**.

## Flow A — she switches something off (Paper page *A · Switched off*)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A1 · base | AWOL centred sheet over dimmed Home | shipped `971:55029` | — | — |
| A1 · art | the sheet's map-art slot → placeholder that **describes** the picture: *phone with mobile data off* (one per case) | shipped `971:55029` art slot; `foundations/assets.md` (scene to add) | slot size and radius as shipped | — |
| A1 · tag | *MOVEMENT REQUIRED* tag → **MOBILE DATA OFF** · **LOCATION OFF** · **LOCATION PERMISSION OFF** | shipped tag | as shipped | — |
| A1 · title | *Please return to hotspot within* → **Please turn on mobile data within** (per case) | shipped title | as shipped | — |
| A1 · ring | TIME LEFT ring → **2:00** | shipped Timer ring; `components/timer.md` | as shipped | — |
| A1 · body | *You will face a penalty…* → removed when logout is off (the strip already says it, P1); **You will be logged out when the timer ends.** when logout is on | shipped body line | as shipped | — |
| A1 · rule strip | *1 🟥 for every 15 Minutes* → **2 🟥 when the timer ends** | shipped strip | as shipped | — |
| A1 · actions | **Show Directions** → **Turn On Data** · **Turn On Location** · **Allow Location** · **Turn Off Airplane Mode**; **I Understand removed** (the lead, 2026-10-27: popup only — it stays on top of any screen until she fixes it) | shipped Buttons | as shipped | — |
| A4 · countdown ended, logout off | the same A1 popup, still on top: tag, title **Mobile data is still off**, **Turn On Data** — no timer ring and no red-card strip (the lead, 2026-10-27: one penalty, shown once in the red cards moment) | A1 | as A1 | the pink Home hero (`1059:53358`): dropped with popup only |
| A5 · countdown ended, logout on | the B1 logged-out page moved onto page A: **You have been logged out** · **Your mobile data was off during your shift.** · tag **2 Red Cards Received** · **Go To Home** + **Contact support** | shipped `991:57993` | as B1 | — |
| A2 · notification (app in background) | **not drawn this iteration** — no shipped notification frame in the registered sections | — | — | `patterns/notification-centre.md` (in-app list, not the OS banner) |

## Flow B — phone off / app stopped — OUT OF SCOPE (product, 2026-10-27; page parked)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| B1 · base | ERRORS full page | shipped `991:57980` / `991:57993` | — | — |
| B1 · icon + title | red alert icon kept; title → **You have been logged out** | shipped | as shipped | — |
| B1 · line | → **Your phone was off for 36 min during your shift.** (force stop: **The app was stopped for 36 min during your shift.**) | shipped line | as shipped | — |
| B1 · red cards | the AWOL tag **2 Red Cards Received** above the title | shipped `1059:53358` tag | as shipped | — |
| B1 · actions | **Try again** → **Go To Home**; **Contact support** kept | shipped Buttons | as shipped | — |
| B2 · logout off | pink Home with the top error banner → **Phone was off for 36 min. 2 Red Cards Received** | shipped `991:57444` | as shipped | — |
| B3 · shift ended while off | B1 with title **Your shift ended while your phone was off** | B1 | — | — |

## Flow C — the Check In screen (Paper page *C · Check In*)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| C1 · base | Check in screen | shipped `4985:64267` | — | — |
| C1 · far job | + the outline **Deny + Auto logout** button from DENY LOGIC, under **Check In** → **Decline Job** | shipped `4876:57189` button | as shipped | — |
| C2 · near job | + the same button → **Early Logout** | shipped `4876:57189` button | as shipped | — |
| C3 · Decline sheet | DENY LOGIC sheet: pictogram on pink disc, **Are you sure you want to decline?**, line **You will get 2 red cards.**; **Go To Job** (pink) + **Hold To Decline** (outline) | shipped `4940:64088` | as shipped | — |
| C4 · Early logout sheet | the same sheet: **Are you sure you want to log out?**, line **You will get 2 red cards and be logged out for today.**; **Go To Job** + **Hold To Log Out** | shipped `4940:64088` | as shipped | — |
| C5 · Call the customer (N6) | the same sheet: phone pictogram, **Call the customer first**, **Call Customer** (pink); v1 (PRD): no PX button; v2: a line **1 of 2 calls** | shipped `4940:64088` | as shipped | — |
| C6 · after 2 calls | C5 + **Call PX** (outline) | shipped `4940:64088` | as shipped | — |

## The red cards moment (all flows)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| R · base | the shipped red cards received moment | shipped `87:39237` | — | — |
| R · cards | **2** of the shipped `-50` cards (top row kept, bottom three removed) | shipped `87:39237`; `foundations/assets.md` `asset/reward/red-card` | as shipped | — |
| R · ribbon | *NO SHOW* → **MOBILE DATA OFF** · **LOCATION OFF** · **LOCATION PERMISSION OFF** · **PHONE OFF** · **APP STOPPED** · **JOB DECLINED** · **EARLY LOGOUT**; the no-show calendar icon removed (it means *no show*) until icons are registered per reason | shipped ribbon | as shipped | — |
| R · where | A: timer ends (before A4 and before B1) · B: on return, before B1 / B1-stop / B2 / B3 · C: after Hold To Decline and Hold To Log Out | `FLOW.md` | — | — |

## Flags for the review (departures from the system, kept because the shipped screen does it)

- C3/C4: the shipped sheet puts the costly button **beside** the safe one; P2 says never adjacent in the same row. Kept as shipped; the **hold** is the protection (P3).
- C5: where PX is tapped from on the Check In screen is not in the PRD or the shipped frame. Drawn as the sheet only; the entry point is an open question.
- Copy: shipped Title Case kept on every label (`copy-keep-figma-wording`); new strings follow it. No "·" in her copy.
