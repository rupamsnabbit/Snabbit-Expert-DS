# Read — Shift – Job Lifecycle DS, the shipped bases for this project

Source: Figma *Shift – Job Lifecycle DS* (`WEUPV9q19eAqRbkZSBj6OY`), registered in `references/SCREENS.md`. Read 2026-10-27 with a read-only script and section screenshots, because the page node trees are too large for `get_metadata`. Internal only.

| File | Section | Frames | What it gives this project |
| --- | --- | --- | --- |
| `customer-address.png` | Job Lifecycle → **CUSTOMER ADDRESS** `4876:56802` | Acceptance screen `4926:60329` · **Check in screen** `4985:64267` | E1 base: *Check In* header (Help + SOS), *You Will Earn ₹150* collapsed card, customer card (Listen, address, MAP · CALL · CHAT), *CHECK IN BY 7:45 PM* 1:23 timer, pink **Check In** |
| `deny-logic.png` | Job Lifecycle → **DENY LOGIC** `4876:56328` | `1` `4876:57189` · `5` `4940:64088` · `3` `4926:61072` · `4` `4932:63856` · Bottom Sheets `5123:56858` | The stakeholder's own deny pattern: an outline **Deny + Auto logout** button (red label, icon) under the main button; a sheet with a pictogram on a pink disc (clock-off · money jar), **Are you sure you cannot accept?**, one line (*If you deny, you will be auto-logged out.* · *You will loose ₹400*), **Deny Job** (outline) beside **Accept Job** (pink) |
| `awol.png` | Shift Lifecycle → **AWOL** `971:54822` | `971:54823` Home · `971:54900` dimmed · `971:55029` centred sheet · `971:55133` pink Home hero · `1059:53358` pink Home hero with *1 Red Cards Received* | The penalty-countdown pattern already in the app: map art, *MOVEMENT REQUIRED* tag, **Please return to hotspot within**, TIME LEFT ring (14:23 / 15:23), *You will face a penalty if you don't return before the timer expires.*, the rule strip *1 🟥 for every 15 Minutes*, **Show Directions** + **I Understand** |
| `errors.png` | Job Lifecycle → **ERRORS** `991:58068` | Full page `991:57980` · Logout Screen `991:57993` · B/s `991:58006` · `991:57444` · `991:57710` · My Profile ×3 | Full-screen state: red alert icon, title, one line, **Try again** + **Contact support**; the same as a bottom sheet (*We couldn't mark your attendance*) |
| `red-cards-received-87-39237.png` | Shift Lifecycle → **Final Designs DS Compatible** (given by the lead, 2026-10-27) | `87:39237` | **The red cards received moment**: Home under a red full-screen wash, one glossy *−50* card per red card (`asset/reward/red-card` `-50`), a slanted ribbon with an icon and the reason (*NO SHOW*). The lead: "this is the screen we show for red cards received" — it plays wherever red cards are issued |

## Read

1. **The idea is already shipped.** The AWOL sheet is N1 almost exactly: a reason, a countdown ring, the red-card rule, one fix action. DENY LOGIC is N7/N8: the stakeholder already drew *Deny + Auto logout* as a button under the main action, with a confirm sheet.
2. **Kept as shipped:** layouts, components, colours, Title Case labels (*Show Directions*, *I Understand*, *Check In*), the red-card asset + count, the tag above the title.
3. **Changed, each for a reason:** *Deny* → **Decline** (the lead, Q3); the costly button in the sheet needs a **hold** (the lead, Q2; P3); the AWOL sheet's two-sentence body is cut to one line where the ring already says it (P1).
4. **Tier:** every screen is a Tier 2 composition of shipped parts; no new component.
