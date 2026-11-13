# From ER/AR — where every contactless screen comes from

Written 2026-11-04 after the lead's review of the first drawing: *"they aren't made from current ER/AR screens, you've made
them from scratch."* Every screen in the Paper file's **ER/AR ·** pages starts as an import of the shipped frame
below, at its own size (393 × 852), with its pictures, mascot, header and strip. The project change is then made
**on** that frame, and only where `BUILD.md` or the PRD needs it. Everything not listed under *Change* stays as shipped.

Files: **ER/AR** = *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB` · **XA** = *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM` ·
**BE** = *Beauty Expert Master* `MBl1qmM0jgAJn49V8oBxLO`. Frame labels (B10, gl-22…) are the ones in `reads/`.

Changes applied on every imported frame (system rules, not project choices): the Button label becomes the verb for
what the screen does, with no *(1/5)* count (`button.md`); the strip stays as shipped; copy typos are fixed; same
expert and data throughout (*Sunita*, *Kudlu Gate*, *8 am – 2 pm*, *₹2,000*, *Tue 11 Nov*, *#AB12456*).

## 1 · Entry and about you

| Screen | Source frame | Change |
| --- | --- | --- |
| A1 Splash · promise | ER/AR B1 `1108:16842` · B2 `1108:16879` | none |
| A2 Language | ER/AR B3 `1108:17146` | *Marati* → *Marathi* |
| A3a–c Get to know Snabbit | XA lesson player v2 11 `32725:194328` (full-bleed clip, segmented strip, header with Call + Language) · end card from train-a L7 (*Rewatch module*) | **guided, 2026-11-05 (Rupam):** the intro videos play one after another with no tap to start; the strip shows four videos; *Start joining* skips at any time; after the last video an end card offers *Watch again* and **Start joining**. Replaces the carousel (ER/AR B26 + B19), kept off the board. Never unskippable: PRD § 3.2 req. 4 |
| A4 Notifications ask | XA s3b `30541:112816` (pictogram · one line · **Allow notifications**) | add *Not now*; one line of why |
| A5 Phone | ER/AR B6 `1108:16718` | none |
| A6 Code · wrong code | ER/AR B27 `1108:15889` · B33 `1108:17288` | resend row gains SMS · WhatsApp · Call (XA `30541:113754`) |
| A7 Already trained | ER/AR A28 `682:88669` (scene + line + one Button) | copy: *You have done your training already*; Button *Go to Home* |
| B1 Steps intro | ER/AR B9 `1108:17332` | none |
| B2 Name and gender | ER/AR B10 `1386:42209` | referral row hidden when the link carried a code |
| B2x Not hiring men here | ER/AR B42 `1109:35810` (inline) | copy without blame, *Call support* stays |
| B4 City not live · change city | ER/AR B36 `1108:20282` · B38 `1108:20498` | none |

## 2 · Hood and shift — from the lead's own flow

**Source changed 2026-11-04 (Rupam):** *"for hood and shift you can use this, I made a flow for changing shift/hood"* —
Figma *Expert App (Rupam)* `cIAH24e13VZJu31OmiMWrj`, page *Hood & shift · Voice final* `26:291`, section **V4**
`481:36972` (**LF** below). It is the lead's change-hood flow, voice first (Saathi asks place and time, she answers,
the app finds work close by). For a new expert the same screens pick her **first** hood and shift: there is no
*current hood*, no *Old* column and no move date. The ER/AR B86–B89 version stays in the file as an alternative.

| Screen | Source frame (LF) | Change for a new expert |
| --- | --- | --- |
| C0 How it works | `481:37518` *1.01 · How to speak (video)* | none |
| C1 Saathi asks place | `492:48807` *FB2 · 1 · Listen · Place + Time* (place) | none |
| C1 Speak now · listening | `492:48838` · `492:48883` *FB2 · 2 / 3* | none |
| C1 Confirm what you said | `492:48268` *S1b · Does this look right?* | none |
| C2 Finding work | `481:41609` *1.05 · Finding work* | none |
| C3 Work close by | `481:38023` *1.07 · Work close by* (filters: Hoods · Start time · Shift time) | no *Current hood* row; the best match is *Kudlu Gate*; each card shows the **joining bonus** where one is set (PRD § 3.6) |
| C3 sheets | `481:40497` *S1 hood sheet* · `481:40702` *S2 hours sheet* · `481:40842` *S3 start time sheet* | none |
| C3 few seats | `2043:19362` *Hurry! Only 2 slots left* | *Only 2 seats left* (no *Hurry*, P6) |
| C4 Not at your time | `481:42395` *1.06 · Full right now (sheet)* | none |
| C5 Pick your area by hand | `481:37876` *G4 · Pick instead · area* (search + areas near your home) | none |
| C6 Confirm | `505:56613` *Confirm your move · Old \| New* | **one column**: no *Old*; title *Confirm your hood*; *Joining bonus ₹2,000* row; no move date; button *Pick Kudlu Gate* plus *Decide later* (PRD § 3.6) |
| C7 Nothing open | `481:43451` *C4 · All slots are closed* | *We will tell you when a seat opens* + *Call help* (*Help me choose*, PRD § 3.6) |

## 3 · Identity

| Screen | Source frame | Change |
| --- | --- | --- |
| D1 Keep Aadhaar ready, DigiLocker first | ER/AR B21 `1108:15923` | **Use DigiLocker** as the one primary, *Use Aadhaar photo instead* as a ghost link; failure goes to the photo flow on its own (PRD § 3.7 req. 1–2; Rupam 2026-11-05) |
| D3 Aadhaar photo | ER/AR B45 `1109:36478` · B46 `1109:36571` · B47 `1109:36509` · B48 `1109:37752` | none beyond the Button verb |
| D4 Face consent | ER/AR B46 sheet style | new sheet: why the face is matched, **I agree** |
| D6 Selfie camera · fail | XA go-live camera G16–G18 (section `28383:58385`) | no uniform rule at KYC; fail reason *Doesn't match your Aadhaar* |
| D7 Verified details | ER/AR B22 `1108:16128` | **Yes, that's me** / *Not me* |
| D8 Errors | XA Errors `14967:135286` (e1 sheet, e2 page) | one line each from the PRD error table; never *Try restarting the app* |
| D8f Not eligible | XA e2 page `14967:135368` | *You can join Snabbit when you turn 18* · **Call help** · final; not in the PRD table (Q20) |
| D8g Aadhaar says Male | XA e2 page `14967:135368` + ER/AR B42 line | *Your Aadhaar says Male* · *We hire women experts for now* · **Call help** · final (Q21, Rupam) |

## 4 · Training

| Screen | Source frame | Change |
| --- | --- | --- |
| E1–E4 Welcome, home, lesson, question | XA *For Diya* `30541:112228` and *TRAINING – PRE GOLIVE (v2)* `32725:192015` (ids in `reads/figma-tcless-training-a…` and `…-b…`) | Help in the header; picture questions stacked, not ✕/✓ side by side |
| E5 Failed attempt | XA v2 61 `32725:197623` | add wrong topics and tries left (PRD § 3.8) |
| E6 Locked out | ER/AR B97 `1132:48318` (*Try again in 30 days*) | date of the next try |
| E7 Passed · E8 Certificate | XA v2 34 `33563:52326` · BE tr-28 `97:54679` | exit to the joining date; certificate gains *Share on WhatsApp* |

## 5 · Joining date and Hub visit

| Screen | Source frame | Change |
| --- | --- | --- |
| F1 Joining date | ER/AR B18 `1108:16650` (date rows) | *Pick your joining date*; no centre row |
| F2 Your shift | ER/AR B90 `1109:47614` | read-only with *Change* |
| G1 Visit the Hub | ER/AR B19 `1108:18422` regions, reordered | **rethought 2026-11-05 (Rupam):** Hub card first with *Open 10 AM to 5 PM any day*; Bring as two pictures (Aadhaar card, ₹500); one *Show this at the Hub* card with photo, name, ID and code; **Show directions** |
| ~~G1m Missed~~ | ER/AR B64 `1108:27842` | **removed 2026-11-05**: any day, nothing to miss |
| G2 Expert ID | ER/AR B50 `1108:20236` | merged into G1's *Show this at the Hub* card with the code; *Valid till 5 pm* |
| G1k From Identity | G1 | *We'll check your Aadhaar at the Hub*; Aadhaar card only; no photo on the card (PRD § 3.7 req. 6) |
| G3 Priya is with you | ER/AR B24 `1108:19492` + BE gl-09 rows | agent-led: title and a ticking checklist only |
| G4 After the visit | BE go-live kit gl-07 · gl-09 (ids in `reads/figma-beauty-onboarding…`) | House Help uniform rows; payment and health check rows |
| G5 Health check under review | ER/AR B97 `1132:48318` | copy |
| G6 Hood still to pick | ER/AR B84 `1108:25351` (step list) | the hood step needs attention |

## 6 · Terms, photo, day one

| Screen | Source frame | Change |
| --- | --- | --- |
| H1 Terms | BE gl-06 `97:56590` | five plain points above the full text; **I agree** alone |
| I1–I3 Photo | BE gl-21 `775:13921` · gl-23 `775:14145` · gl-24 `775:14164` · gl-22 `775:14117` | on her phone, not the trainer's; *Your photo · With uniform* labelled |
| J1 You're live | BE gl-01 `97:55483` | none |
| J2 Day-one Home | ER/AR C8 `599:29416` · BE pl-32 `670:103865` | Present alone, *Can't come* above; hotspot in her hood |

## 7 · Permissions, guided (V5, every PRD 3.3 permission, 2026-11-05)

| Screen | Source frame | Change |
| --- | --- | --- |
| N1 · L1 · L2 · C1 · M1 · K1 | XA s3b `30541:112816` / s3a `30541:112418` shell | the phone's box drawn in place, V5 (lit button, greyed rest, frame, finger), no buttons |
| N2 | ER/AR A12 `599:37386` | the real box over N1 |
| L4 · B1 | Google location box · Android battery dialog | drawn in place, V5, finger below |
| N5 · L5 · O1 | ER/AR B46 `1109:36571` sheet | clip plays, Settings opens by itself |
| N6 · L3 · L6 · C2 · M2 · O2 | the maker's Settings page (Samsung) | Snabbit in picture-in-picture with the right control |
| N3 · N7 | s3b shell · XA e2 `14967:135368` | tick · Call help |
