# Figma V2 — full read before the real prototype (2026-10-13)

Section *V2* (`213:14101`) in *Expert App (Rupam)*, 38 frames in four rows. Read from the node tree (every visible text, every prototype link) plus screenshots. **Comments not read** — the connector has no comments call and no API token was available; see *Open*.

## Row 1 · the voice guide (shared by every lane)

| # | Frame | What it shows | Links |
| --- | --- | --- | --- |
| 1.01 | How to speak (video) ×2 | Pink video stage, speaker, *Skip*, *Try it now* / *Try yourself* | 3 s auto → second video; button → N1 |
| N1 → N4 | Voice guide | B2 fan: Place (*"HSR"*) → + Time (*"सुबह 9 से 5"*) → + Expert ID (*if you want*) → all three, *Tap to record* | 3 s auto each, Smart Animate; *Type it* → G4 (outside V2); *Watch again* → 1.01 |
| F3 ×3 | Recording | *Start speaking…* / *Listening* → live transcript *मुझे* → full line *मुझे HSR या Bellandur में काम चाहिए, सुबह 9 से 5…* + loader | F3₁ 3 s → F3₂; F3₂ transcript step 0.6 s; **F3₃ → nothing** |
| S1b | Does this look right? | *Confirm your hood & shifts*, transcript with HSR / Bellandur / सुबह 9 से 5 highlighted, rows *Place · HSR Layout, Bellandur* and *Time · 7 hours*, *Find work*, *Record again* | rows → *Add areas* / *Modify hours* sheets (outside V2); *Find work* → 1.05; *Record again* → N4 |
| 1.05 | Finding work | *You asked · Your hood · 10 AM – 5 PM*, three skeleton cards | 1.5 s → 1.06 |

## Row 2 · "My hood – other time" (lane T)

1.07 *Current hood · Kudlu gate* with a radio list of times (9–5 ticked, 8–10, 10–12, 12–2, 2–4, *+10 slots*) → 1.08 *Compare two hoods* (RM Layout Koramangala ₹20,000 vs ST Bed Layout ₹22,000, *Move to Koramangala*) → P4a *Confirm your move* (Koramangala 6th Block · 6 hrs a day, 2 less · 10 AM – 4 PM · Upto ₹16,500 · from 8 Oct) · 1.06 sheet *Requested time in your hood is not there · Join waitlist* → 1.07 with the status card (*Full right now · 9 AM – 5 PM*) over the same radio list.

## Row 3 · "New hood – other time" (lane HT)

1.07 *HSR Sector 7 · Best match* (9–5, 8–10, +10) with Sectors 9 / 10 / 11 collapsed → 1.08 → P4a · 1.06 sheet *HSR and Bellandur are full right now · Join waitlist* → 1.07 with the status card (*Waiting for HSR*) over *Work close by* (Agara · Recommended · 3 hoods · starts 6 AM; Marathahalli; Koramangala) → G5 *Select timings* (Agara 10th Main 12–2 ticked, 8–10, +10; 11th / 12th / 13th Main) → 1.08 → P4a → 1.09 *You're moving to Koramangala 6th Block · From Thu 8 Oct · Go to Home* → 1.10 (outside V2).

## Row 4 · "Expert ID" (lane C)

S1b-friend ×6: *Tell us the expert ID of your friend* — *Tap to record* → *Start speaking…* → transcript *Meri dost ki id 11234 hai* → loader → keypad *Enter Expert ID · 14586 · Find her* (the *I'll enter it* path) → *Is this Anita Sharma? Works in Kudlu gate · Yes, that's her* → R3 *Kudlu main road · Anita works here* (9–5, 8–10, +10) → 1.08. R3 variants: status card *Anita's time is full · 9 AM – 5 PM* over the list (9–5 marked *Full*); status card *Full right now · Anita's area* over *Work near Anita's area* (Agara / Marathahalli / Koramangala).

## Flow starting points on the page
*1 · Change work area by voice* (V1 and V2 video), *2 · Voice fails* (V1), *3 · Pick instead* (V1 and G4), *4 · Waitlist · work opened (push)* (V1 and `213:16072`), *5 · With a friend* (V1), *6 · Several areas full* (V1).

## Gaps and breaks found (for the build, not for Figma)

1. **N4's mic has no link** to F3; F3₃ (full transcript) has no link to S1b. The spine of the demo is unwired in the prototype.
2. **The six friend screens are unwired** between themselves; only the last one links on (→ R3).
3. **Every *Confirm* on 1.07 / R3 is the old *Find work* button** and goes back to 1.05 *Finding work*. Only the cards go to 1.08.
4. **1.08 is the same Koramangala compare sheet in all three lanes**, including lane T (my hood, other time), where the confirm should be a time change in Kudlu gate, not a move to Koramangala. Its *You asked* line also says *HSR · Bellandur* while 1.07 above it says *Your hood*.
5. **P4a *Flip card · New side* has no links in or out** in any lane. It sits after 1.08 in each row; unclear whether it replaces 1.08 or follows it.
6. **Three different expert IDs**: transcript *11234*, keypad *14586*, *You asked · Kudlu gate · 13465*.
7. **Transcript vs row**: *सुबह 9 से 5* is 8 hours; the S1b Time row says *7 hours*.
8. **1.07 lane T shows *Your hood · 10 AM – 5 PM*** as the ask while the transcript asked 9 to 5.
9. R3 *Anita's time is full* lists *8 AM to 10 AM* four times.
10. **Outside V2 but linked from it**: G4 *Pick instead · area* (`213:15213`), *Add areas* and *Modify hours* sheets, 1.10 *move booked*, the W4 push offer (`213:16072`). The *Entry* screen (0 · Work area & time) and the W1 *join* / W3 *leave first* sheets of FLOW v3 are not in V2.
11. **No Saathi line is written on any screen.** FLOW v3 has *Saathi says* / *She can say* per screen; V2 has the pictures only.

## Open
- Comments: unread. Paste them, or allow a Figma token, and this read gets a *Comments* section.
