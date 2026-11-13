# Data sanity check — V4 and V5 (EXPERT ID), 2026-11-03

Every visible string in both sections was read from Figma (`481:36972` V4, `714:12195` V5 Expert ID). The guide video breaks because the same person, hood, time, pay and date change from screen to screen. Below: one story to hold everything to, then each break.

## The story (proposed — one set of facts for every screen)

| Fact | Value | Why this one |
| --- | --- | --- |
| Expert | Reema Saju · #SNAB2413 | Same on every Profile already |
| Her hood today | **Kudlu Gate** | What the time flow's *Current hood* already says |
| Her shift today | **9 AM – 5 PM · 8 hours · ₹20,000 a month** | The *Old* column on Confirm |
| Home on her shift today | 9:00 AM – 5:00 PM · Login by 8:50 AM · hotspot in Kudlu Gate | Home says 7 AM – 12 PM today — matches nothing else |
| Day she changes | **Sat 10 Oct** | *Moving in 3 days* banner |
| Day before | Mon 12 Oct | *last day here* screens |
| First day new | **Tue 13 Oct** (13 Oct 2026 is a Tuesday) | Day 0 already says Tuesday, 13 October |
| **Flow 1 · time only** | Kudlu Gate, 9–5 → Kudlu Gate, **10 AM – 4 PM · 6 hours** | Every "New" on Confirm and the hand-hold says 10–4 |
| What she says (time) | "सुबह **10** बजे से **6** घंटे" → *सुबह 10 से 4* | Today she asks for 9 AM · 8 hrs — the shift she already has |
| **Flow 2 · hood only** | Kudlu Gate → **HSR Sector 7**, same 9–5 · 8 hours | She says "HSR"; HSR Sector 7 is the *Best match* |
| Hood flow, HSR full | Areas near her → **Agara** → **Agara 10th Main** | The areas list and Select-hood screens already pick these |
| **Flow 3 · with a friend** | Anita Sharma · ID **124564** · works in **HSR Sector 2** | 124564 is on the voice card; HSR Sector 2 is the friend WhatsApp |
| Friend rows 1–2 | HSR Sector 2 (her time / other times there) | |
| Friend row 3 | Hoods near Anita → **Agara 10th Main** | Already built |
| Friend row 4 | Areas near Anita → **Koramangala → ST Bed Layout** | Gives ST Bed Layout one honest home |
| Distances | Always "from your home" (or "from Anita's hood" in flow 3) | Today: from HSR, from Bellandur, plain km, mixed on one list |

## Breaks, screen by screen

### V4 · Discoverability / Entry
- **FB2 1–3 + S1b (time)** — she asks for *9 AM, 8 hours* = her current shift. Change the voice line, the transcript and S1b to 10 AM, 6 hours (*सुबह 10 से 4*). S1b's title still says *Confirm your shift timings* in English above Hindi.
- **Discoverability Home** — hotspot *Jyoti Nivas · 300 meters away*; the other Homes say *Jyoti Nivas College Gate · 3.2 km away*. Jyoti Nivas College is in Koramangala, not Kudlu Gate.

### V4 · Change shift time
- **1.07 Work close by (all three)** — slots read *7:00 AM to 5:00 PM · 6 hours*: that is 10 hours, and it is not the 10–4 she picks next. Use 10:00 AM to 4:00 PM · 6 hours.
- **Confirm (6023, 2518)** — a time-only change shows **New hood · ST Bed Layout, Koramangala**. Should be Kudlu Gate, no "New hood". Date *13th Oct, Thur* → *13th Oct, Tue*.
- **Confirm pay** — New is 6 hours at ₹22,000 vs Old 8 hours at ₹20,000; fewer hours paying more will read as an error in a guide. The 1.06 sheet says 10–4 earns ₹16,500 (*₹5,500 less*). **Pick one** (see questions).
- **1.09 Hood timing updated!** — *From Thu 8 Oct*; everything else says 13 Oct. → *From Tue 13 Oct*.

### V4 · Change shift time (not found)
- **1.06 sheets** — *Requested time in your hood is not there* sits over a list of other **areas** (Agara, Marathahalli, Koramangala 6th Block). That list belongs to the "other areas" step, not "other times".
- **1.07 nearby hoods / nearby areas** — banners read *unavilable* (twice). Hood list is measured *from Bellandur*, area list mixes *from HSR* and *from Bellandur*; she lives near Kudlu Gate.
- Areas list says *Starts 9AM* on one row and *Starts 6AM* on the others.

### V4 · New hood (and its edge cases)
- **FB2 + S1b (place)** — she says *HSR या Bellandur*, S1b keeps *HSR Layout* only. Fine if intended; say so in the voice line or drop Bellandur.
- **Results** — best match **HSR Sector 7**, but **Confirm and 1.09 say ST Bed Layout, Koramangala**. → HSR Sector 7 · HSR.
- **Edge case path** — picks **Agara 10th Main** on *Select hood and timings*, then **Confirm and 1.09 say ST Bed Layout**. → Agara 10th Main.
- Slots again *7:00 AM to 5:00 PM · 6 hours*; for a hood-only move the time stays 9:00 AM to 5:00 PM · 8 hours.
- **Add areas** — *Your area · MTR Layout*; nowhere else. → Kudlu Gate. Agara has no distance.

### V4 · Manual enter / Filters
- Filter says **Hoods: Sector 9**, results still lead with **HSR Sector 7 · Best match** and list Sector 7, 9, 10, 11.
- Filter says **Shift time 8-12 hrs**, every slot is *6 hours*.
- S3 sheet: HSR Sector 7 is *Near BDA complex · 1.2 km*; the list says *5.5 km from Bellandur*.
- *HSR Sector 9* has no distance.

### V4 · Waitlist communication
- **WhatsApp** — *Work opened in HSR · HSR Layout Sector 2 · 9 AM – 5 PM*. **The list after it has no Sector 2** (Sector 7, 9, 10, 11), and **Confirm / 1.09 say ST Bed Layout**. Make the opened hood **HSR Sector 7** all the way through (and keep Sector 2 for the friend flow).
- *Hurry! Only 3 slots left* above *2 slot open* — two counts, and "slot" → "slots".
- Home *Slots opened in HSR!* still shows today as *Tuesday, 7 February · 7:00 AM – 12:00 PM*.

### V4 · Post change hand hold (TIME ALONE)
- **Home 10 Oct** — banner *From Thu, 13 Oct, 10AM -5PM*; everywhere else 10 AM – 4 PM, and 13 Oct is a Tuesday.
- **All Homes** — today's card says *Tuesday, 7 February · 7:00 AM – 12:00 PM · Login by 6:50 AM*. → *Saturday, 10 October* / *Monday, 12 October*, 9:00 AM – 5:00 PM, Login by 8:50 AM.
- **Move booked** — a time-only change shows **HSR sector 7 · HSR** as the hood. → Kudlu Gate.
- **Day 0** — 10 AM shift but hotspot time still *6:30 AM*; hotspot *Jyoti Nivas College Gate*.
- *Ok, got it* — *OK* is on the banned list (`foundations/content.md` § 9).

### V4 · Post change hand hold (hood)
- Good: HSR sector 7 from 13 Oct, Till 12 Oct, Day 0 hotspot HSR sector 7.
- But the Confirm that leads here says **ST Bed Layout**, and the time changes to 10–4 here while the hood flow never asked for a new time. Decide: hood only (9–5 stays) or hood + time.
- Same Home date/time issue as above. *HSR sector 7* vs *HSR Sector 7* (capital S) varies.

### V5 · Expert ID
- **Three different IDs** — card *124564*, she says *Dost ki ID hai 12344*, she types *14586*. → 124564 everywhere.
- **Anita works in Kudlu gate** (popup) — that is Reema's own hood, so working with her is no move at all. Results then call it *Kudlu main road*. → HSR Sector 2 in both.
- **Row 1 and Row 2** — Anita's hood slots *7:00 AM to 5:00 PM · 6 hours*; **Confirm / 1.09 say ST Bed Layout, Koramangala**. → HSR Sector 2.
- **Row 1 / 2 / 4 · 1.09** — *From Thu 8 Oct*. → From Tue 13 Oct.
- **Row 3** — consistent (Agara 10th Main) except the date.
- **Row 4** — areas near Anita list Agara first, picks Agara 10th Main on *Select hood and timings*, **Confirm says ST Bed Layout**. Either pick Koramangala → ST Bed Layout (proposed, so Row 3 and Row 4 differ) or keep Agara and change Confirm.
- **Row 5** — button now *Try new search*; fine.
- **Waitlist (friend)** — *near your friend's place in HSR · HSR Layout Sector 2* is right once Anita is in HSR Sector 2; then the list must show Sector 2, and Confirm / 1.09 must say HSR Sector 2, not ST Bed Layout.

### Everywhere
- Monthly earnings on Profile *₹24,000*; Confirm says today she earns *Upto ₹20,000 a month*.
- *Upto* → *Up to*; *₹22,000 /month* on Confirm vs *a month* elsewhere.

## Questions before fixing
1. Pay for 10 AM – 4 PM (6 hours): **₹15,000** (pro rata), **₹16,500** (the 1.06 sheet), or keep **₹22,000**?
2. Hood flow: hood only (9–5 stays) or hood + new time (10–4)?
3. OK to use the story above (Kudlu Gate today; HSR Sector 7 for hood; Anita in HSR Sector 2; ST Bed Layout only in friend row 4)?

## Fixed in Figma, 2026-11-03

The lead said "go with any story, make the money work". Applied the story above with these calls:
- **Time only:** Kudlu Gate 9–5 (8 hrs, ₹20,000) → Kudlu Gate 10–4 (6 hrs, **₹15,000**, pro rata). Fewer hours never pays more. The ask is now "सुबह 10 बजे से 6 घंटे". The Confirm button reads *Change to 10 AM – 4 PM*.
- **Hood only:** the time stays 9–5 · 8 hrs, and the new hood pays ₹22,000. Hood Confirm, move-booked and Day 0 screens all keep 9–5.
- **Other times:** lists show 10–4, 11–5, 12–6, 1–7 (and 7–1 on "not available"), all 6 hours at ₹15,000.
- **Friend row 4:** the areas list is now Koramangala (Recommended), Marathahalli, Bellandur. The hoods list is ST Bed Layout, Koramangala 1st, 5th and 6th Block.
- **Profile:** monthly earnings changed from ₹24,000 to ₹20,000.
- **Filters:** *Sector 9* → *Sector 7* (*Sector 2* in the friend waitlist), *8-12 hrs* → *8 hrs*.

**Checked:** a re-scan of both sections found no ST Bed Layout outside friend row 4, and no Thu 8 Oct, Thur, February, Jyoti Nivas, Kudlu main road, 12344, 14586, MTR Layout, *unavilable*, *Upto*, 7 AM – 12 PM or ₹24,000. I screenshotted six screens and found no overflow.

**Not touched:** which option is pre-selected on the *Pick instead* hours and start-time sheets (G5b, G5); the lists behind the scrim on the 1.06 sheets (other areas, ₹22,000 / ₹23,000).

## Lists obey their filters, 2026-11-04

The lead flagged that a list contradicted its own filter: the filter said 10 AM, and the list showed slots starting at 11, 12 and 1. The rules now enforced on every list screen:

1. **Hours:** every slot has the hours in the *Shift time* filter, and end = start + hours.
2. **Start time:** every slot starts at the *Start time* filter. When the banner says *Check other times*, the start filter reads **Any time**, and the hours filter still holds.
3. **Hoods:** a list that shows several hoods has the hood filter set to **All hoods**.
4. **Pay** follows hood and hours. Kudlu Gate: 8 h ₹20,000, 6 h ₹15,000. Every other hood: 8 h ₹22,000, 6 h ₹16,500.
5. **Counts:** *Hurry! Only 2 slots left* sits over 2 slots and the *2 slots open* chip; no *+10 slots* below it.

**Screens changed:**
- **Time flow:** the Kudlu Gate list is now five 10–4 slots. On *not available*: *Any time*, slots 11–5, 12–6, 1–7, 7–1 and 8–2, all 6 h. Nearby hoods: two 10–4 slots at ₹16,500. Nearby areas: ₹16,500. The 1.06 sheets behind the scrim are now 10–4 · 6 h · ₹16,500.
- **Hood flow:** the 1.06 sheets behind the scrim are now 9–5 · 8 h · ₹22,000.
- **Filters and waitlist lists:** *Sector 9* → *All hoods*.
- **Friend row 2:** *Any time*, slots 10–6, 11–7, 7–3, 8–4 and 12–8, all 8 h at ₹22,000. Its Confirm now reads 10 AM – 6 PM · 8 hours · ₹22,000.

**Checked:** a script parsed all 17 slot lists in both sections, comparing each slot's start, end, hours and pay against the filters and the pay rule. It found 0 breaks.

## Expert ID flow walked screen by screen, 2026-11-04

Fixed:
- **Wrong-ID screens:** the transcript said the correct ID (124564) above *Invalid expert ID*. It now reads *Dost ki ID hai 12456* (one digit short).
- **One clock:** status bars in both sections went 9:41 / 9:30 back and forth, and the waitlist Home read *Login by 8:50 AM* at 9:30. All 107 status bars now read **8:30**.
- **Waitlist order:** the WhatsApp arrived at 6:12 pm, then she opened a morning Home that still asked her to log in. It now arrives at **7:42 am** (friend and V4).
- **Friend WhatsApp:** *Work opened near your friend's place in HSR* → *Work opened where Anita works* (the next line is HSR Sector 2, Anita's own hood).
- **Areas near Anita:**
  - Koramangala said *3 Hoods*, but the next screen lists 4; it now says *4 Hoods*.
  - The area sat 1.8 km away while its nearest hood was 3.2 km. Areas now read Koramangala 3.2 km (Recommended, nearest), Marathahalli 6.5 km and Bellandur 4.1 km.

**Already consistent:**
- **ID and popup:** card 124564 → she says 124564 → *Is this Anita Sharma? Works in HSR Sector 2*. The typed path is the same.
- **Rows 1–4 end to end:**
  - Row 1: HSR Sector 2, 9–5.
  - Row 2: other times there, *Any time* · 8 hrs; she picks 10–6.
  - Row 3: Agara 10th Main.
  - Row 4: Koramangala → ST Bed Layout.
  - In each row, Confirm and *You're moving* repeat the slot she picked.
- **Waitlist chain:** WhatsApp HSR Sector 2 · 9–5 → *Slots opened in HSR!* → list with HSR Sector 2, 2 slots → Confirm → moving.

## No duplicate slots, 2026-11-04

The lead asked why the same slot appeared five times. A list with a fixed start time and fixed hours can only hold one slot per hood, so identical rows meant nothing.

**Rule 6:** one row per distinct slot. With a fixed start time, a hood shows a single row, with no *+10 slots* or *Show more* under it. Lists set to *Any time* keep their different times and their *+10 slots*. On the waitlist lists, *2 slots open* says how many openings exist at that one time, so a single row sits under it.

**Applied** to 14 lists by hiding the duplicate rows, the divider before each, and the more-buttons (nothing deleted; unhide in Figma to restore). A check of both sections finds no visible duplicate slot left.
