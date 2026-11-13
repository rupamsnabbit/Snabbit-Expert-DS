# Build plan — Contactless GL (Phase 2)

Written **before** the first artboard, 2026-11-04. One row per region of every screen. Sources in this order and no
other: **shipped app → `patterns/` → `components/` → Mobbin → invention** (`CLAUDE.md` § Before you draw a screen).
Read for this plan, in that order: `references/shipped-app-2026-09-22/`, `references/shipped-app-2026-10-01-shift-option-card/`,
the nine reads in `reads/` (the shipped Figma screens and Mobbin), `patterns/onboarding.md`, `permissions.md`,
`first-run.md`, `error-recovery.md`, `offline.md`, and the anatomy of every component named below.

Design in **English** for now (SCOPE Q12): every text box is laid out for the widest script (`foundations/type.md`
budgets, ×1.15 line height where Hindi, Marathi or Kannada may sit), but only English is drawn.

## How to read the Source column

| Short form | File |
| --- | --- |
| **tcless** | `reads/figma-self-serve-tcless-2026-11-04/README.md` — Self-Serve TC-less + v2 (frame labels A·B·C·D) |
| **tc-hub** | `reads/figma-self-serve-tc-hub-2026-11-04/README.md` — Self-Serve TC house help (visit states) |
| **final** | `reads/figma-expert-app-final-onboarding-2026-11-04/README.md` — FINAL ONBOARDING (numbered, s3, e1–e3, G go-live) |
| **train-a** · **train-b** | `reads/figma-tcless-training-a-…` · `reads/figma-tcless-training-b-…` — For Diya, training v2, knowledge check, post-training |
| **beauty** | `reads/figma-beauty-onboarding-2026-11-04/README.md` — bi · tr · gl · pl frames |
| **go-live** | `references/beauty-expert-master-go-live/BUILD.md` — G1–G14, already translated |
| **mob-perm** · **mob-kyc** · **mob-area** | `reads/mobbin-permission-denied-path/` · `reads/mobbin-kyc-selfie-liveness/` · `reads/mobbin-worker-area-shift-pick/` |

A frame label (*B87*, *s3a*, *gl-22*) is the label that read gives the frame; the read carries its Figma node id.

## The order, and what config can move

```
 A Entry ─ B About you ─ C Hood & shift* ─ D Identity ─ E Training ─ F Joining date ─ G Hub visit† ─ H Terms ─ I Photo ─ J Go live · day one
                          * can move after E (PRD § 3.6) or be skipped (Decide later)
                          † switched off in Phase 3 (PRD § 3.11)
```

Two rules follow from the config, and every screen obeys them:

- **The progress count is computed, never drawn as a constant.** ProgressBar `segmented` counts the stages the
  config gives *this* expert (4 to 6), and the Button never carries *(2/5)* (`onboarding.md` § What changes).
- **No screen names the next stage in its copy** (*Next: Aadhaar*), because the next stage can change. The Button
  says what *this* screen does (*Pick this shift*), and the progress bar shows where she is.

---

## 0 · The shell — every onboarding screen

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| all · header | `HeaderNav default` — back · title · **two** trailing actions: Help (`headset`, calls the onboarding line) and Language (`translate` → BottomSheet `select`) | `components/header-nav.md` § Variants; `patterns/onboarding.md` § What changes, row 1; shipped: language pill on every Self-Serve and Beauty frame (tcless, beauty) | — | — · **gap:** `header-nav.md` allows **one** trailing action; the onboarding pair is proposed in `onboarding.md` § Follow-ups but has not landed. Ask of core (SCOPE) |
| all · progress | `ProgressBar segmented S`, count = stages for this expert, `brand` fill | `components/progress-bar.md` § Kinds; shipped 5-segment strip (tcless, beauty) | — | — |
| all · voice | `VoicePrompt bar` under the progress bar; screen spoken on arrival | `components/voice-prompt.md` § `bar`; shipped voice bar on every FINAL ONBOARDING screen (final) | — | — |
| all · primary action | `Button primary brand L fullWidth`, verb label, bottom + safe area | `components/button.md` § Placement | — | — |
| all · secondary action | `Button ghost neutral L` **above** the primary, never beside it | `components/button.md` § Placement | — | — |
| all · offline | `Banner offline` in the page slot; steps that queue (name, gender, hood) keep working, steps that wait (OTP, DigiLocker, selfie match, video) disable their Button with *Needs internet* | `components/feedback.md` § Banner; `patterns/offline.md` § What works | — | — |
| all · loading over 3 s | `Skeleton` → EmptyState `error` *… is slow right now* with **Try again** and **Later** | `patterns/error-recovery.md` § Where the failure is, row *A service*; `components/skeleton.md` | — | — |

---

## A · Entry — link to OTP

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A1 · welcome | shipped splash + promise screen: three ListItem rows with reward assets, expert photo, **Start** | `patterns/onboarding.md` § 0–1; tcless A1–A3; beauty bi-07/08 | — | — |
| A2 · language | `SelectionCard compact` ×5, own script first, **Next** | `patterns/onboarding.md` § 0–1; `components/selection-card.md` § Variants | — | — |
| A3a · video plays | shipped lesson player: full-bleed clip, `ProgressBar segmented` one segment per video (current one filling), header title *Get to know Snabbit* + video name, Call + Language; burned-in caption; `Button secondary M` **Start joining** bottom right, there from the first second | XA v2 11 `32725:194328` (lesson player, *Currently playing*, segmented strip); `components/how-to-clip.md` § `player` (captions, knob-less, no scrubber) | `HowToClip player` captions and voice rules | `HowToClip card` carousel (tcless B19): one tap per video and a choice before the first one plays, so most experts never start one (P2 · one next action) |
| A3b · next plays | same player; the next video starts on its own, the finished segment fills | XA v2 11 lesson strip; train-a L7 sequence | — | — · **departs from** `how-to-clip.md` *no next-clip autoplay*: the shipped lesson player already runs a module as a sequence (P7 · keep what she knows) and the PRD wants them watched before permissions (§ 3.2) |
| A3c · end card | last frame under a scrim, all segments full, `Button secondary inverse M` *Watch again* (`arrow-counter-clockwise`) and `Button primary L` **Start joining** → A4 | train-a L7 end card (*Rewatch module* + next action); `components/how-to-clip.md` § `player` (*Replay*) | — | — |
| A4 · notifications | `BottomSheet permission` over A3: scene showing the phone's own *Allow* button, title *Hear about every step*, one spoken line, **Allow notifications** / *Not now* → OS dialog | `patterns/permissions.md` § The sheet; shipped s3b pictogram + one line + **Allow notifications** (final); mob-perm Beli/Wolt/KOHO convention | — | — · the scene asset is new (assets ask) |
| A5 · phone | hero photo · `TextField phone` `+91` · `NumericKeypad` · **Next** | `patterns/onboarding.md` § 2; `components/numeric-keypad.md`; `components/text-field.md` § Kinds | — | — |
| A6 · code | `NumericKeypad otp` (box count from tech, Q17) · auto-read · **Resend code** `tertiary` with `Timer deadline` | `patterns/onboarding.md` § 2; final s3f | — | — |
| A6 · wrong code | `TextField otp` error line *Wrong code — ask again* + keypad shake; after the deadline a row of three channels: SMS · WhatsApp · Call | `patterns/error-recovery.md` § A field; final s3f / `30541:113754` (the channel row) | — | — |
| A7 · already trained | `EmptyState` page, `empty` anatomy and neutral tone: pictogram, *You've already done your training*, one line *We'll finish your joining the usual way*, **Go to Home**; Help in header | `components/empty-state.md` § Kinds; nearest shipped shape tcless A28 | `empty` kind's anatomy: 120 dp pictogram, Heading3 ≤ 40, BodyMd ≤ 80, Button M inline | `EmptyState error` (wrong tone — nothing failed, P6) · `waiting` (nothing is pending). **Gap:** a neutral message kind — ask of core |
| A · link blocked | no screen: she lands in the regular flow with no error (PRD § 3.1) | PRD § 3.1 | — | — |

## B · About you

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| B1 · steps intro | full-screen scene (stairs), Heading1, **Start**; the count is the computed stage count, no minutes promise unless measured | `patterns/onboarding.md` § 3; tcless A-intro (*4 simple steps · 2 minutes*, which disagrees with its own 5-segment strip) | — | — |
| B2 · gender | `SelectionCard rich` ×2 with the character asset, asked **first** | `patterns/onboarding.md` § 3; beauty bi-38–40 (gender before name) | — | — |
| B2x · not hiring men here | `EmptyState` page in `empty` anatomy: pictogram, *We hire women experts for now*, one line, **Notify me**; never a toast or a disabled form | tcless A28 (full-screen shape); `patterns/error-recovery.md` § Copy rules | `empty` anatomy as A7 | A28's *We are not hiring male experts at the moment* string (P6) · B42 inline pill · B43 banner (three shipped treatments, tcless) |
| B3 · name | `TextField text`, spoken *Type your name as on your Aadhaar* | `patterns/onboarding.md` § 3; tcless B10–B14 (v2 inline errors) | — | — |
| B4 · city | `ListItem navigational` (auto from location) · **Change** → `BottomSheet select` of city cards | `patterns/onboarding.md` § 3; final 8 + ob10 | — | — |
| B4 · location ask | `BottomSheet permission` *Find work near you* → OS dialog; *Not now* → city picked by hand | `patterns/permissions.md` table row *Location* (onboarding step 3) | — | — |
| B4 · city not live | `EmptyState empty` *We're not in Mysuru yet* + **Notify me** | `patterns/onboarding.md` § 3; tcless A25 | — | — |
| B5 · referral | collapsed row → `TextField`; **hidden** when the link carried a code | `patterns/onboarding.md` § 3; PRD § 3.5 | — | — |

## C · Hood and shift

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| C1 · heading | `Heading2` *Where do you want to work?* + list heading *Near your home* (area name) | `components/selection-card.md` § `rich` · shift option, Content (the area is the heading, not on each card) | — | — |
| C1 · hood cards | `SelectionCard rich · shift option` **header only** (Radio · landmark title · sector · km · inline Listen), `single`; pay slot reads *Joining bonus* / Amount `md` *₹2,000* where configured, empty slot where not | shipped card `references/shipped-app-2026-10-01-shift-option-card/`; tcless B87 (rank, *Best for you*, km, landmark, speaker); mob-area Grab A6 (bonus on the option) | — | — · *Earn up to … a month* label swapped for the bonus label: confirm the pay slot may carry a one-time amount (ask of core, small) |
| C1 · *Best for you* | `Tag brand soft` on the first card only | tcless B87; mob-area Turo (one label per list) | — | — |
| C1 · help row | `ListItem navigational` *Help me choose* with `headset` under the last card | `components/list-item.md` § Kinds | — | — |
| C1 · actions | **Pick this hood** primary · **Decide later** `ghost` above it | `components/button.md` § Placement; SCOPE Q5 | — | — |
| C1e · nothing open nearby | `EmptyState empty` page: *No open shifts near you right now* · **Help me choose** primary · Help in header | `components/empty-state.md`; tcless A25 shape; mob-area DoorDash A2 (screen stays, primary changes) | — | — |
| C2 · shift windows | `SelectionCard rich · shift option` full form (header + Divider + day rail), one card per window with open seats; full windows **not shown** | `components/selection-card.md` § `rich` · shift option; tcless B89 (time-of-day + hour ranges) | — | — |
| C2 · seats | a fact on the day rail's first line: *3 seats left* `Caption` `textSecondary`, only when ≤ 5 | mob-area (no app shows capacity) | the rail line's anatomy: 20 dp icon column, BodyMd, `spacing.3` gap | a Tag on the header (header holds Radio · text · pay, no room) · a count in the pay slot (the slot is money) |
| C2 · action | **Pick this shift** | `components/button.md` | — | — |
| C3 · *Help me choose* | `BottomSheet info` safe confirm: scene of a call, *We'll call you to help you choose*, `Timer deadline` *by 6 pm today*, **Call me** primary, ✕ | `components/bottom-sheet.md` § Kinds; PRD § 3.6 (creates an LMS callback) | — | — |
| C4 · *Decide later* | `BottomSheet confirm` safe confirm: *You can pick at the Hub*, consequence line *Your shift is picked with the Hub team*, **Decide later** primary, ✕ to go back | `components/bottom-sheet.md` § `confirm`; `patterns/error-recovery.md` ladder step 5 *Later* | — | — |
| C5 · picked | `Toast success` *Kudlu Gate · 8 am – 2 pm saved*; the stage turns done on the progress bar | `components/feedback.md` § Toast; tc-hub 40/43 (toast after a change) | — | — |

## D · Identity

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1 · get ready | scene (Aadhaar card with the number highlighted) + Heading2 *Keep your Aadhaar ready* | `patterns/onboarding.md` § 5; tcless A21; beauty bi-03 | — | — |
| D1 · two ways | **Button primary L** *Use DigiLocker* + **Button ghost M** `camera` *Use Aadhaar photo instead* above it; DigiLocker fails or no Aadhaar phone → D3 on its own (Rupam 2026-11-05) | `components/button.md`; PRD § 3.7 req. 1–2 | — | `SelectionCard compact` ×2 (drawn first): two equal choices before she knows either, P2 one next action |
| D2 · DigiLocker | WebView with HeaderNav kept + `Banner warning` *Stay in the app — we'll bring you back* | `patterns/onboarding.md` § 5; tcless A21–A22, tc-hub 26 | — | — |
| D2 · checking | `Skeleton` *Checking…*, 3-second rule → D7 or D8 | `patterns/onboarding.md` § 5; `components/skeleton.md` | — | — |
| D3 · Aadhaar photo | `MediaCapture tile` ×2 side by side (*Front* · *Back*), second waits for the first; a pictogram row *good · cut off · glare · blurry* once above the tiles | `components/media-capture.md` § `tile`; tcless B45–B48 (two drop zones, 2×2 tips); mob-kyc OKX (four small pictures) | — | — · the pictogram row is a content ask on `media-capture.md` § `document` |
| D3 · camera | `MediaCapture preview` · `document` guide · **Choose from gallery** `tertiary` | `components/media-capture.md` § `preview`; tcless B46 (Camera / Gallery sheet) | — | — |
| D4 · face consent | `BottomSheet confirm` safe confirm: scene of her face beside her Aadhaar photo, title *We match your face to your Aadhaar*, one spoken line on why (no age line: Aadhaar gives the age), **I agree** primary, ✕ to leave | `components/bottom-sheet.md` § `confirm`; `patterns/permissions.md` § Shield consent is not a permission (own agreement before OS permission); mob-kyc Wise B1 | — | — · scene asset is new |
| D5 · camera ask | `BottomSheet permission` *Take a photo of your face* → OS dialog | `patterns/permissions.md` table row *Camera* | — | — |
| D6 · selfie | `MediaCapture preview` · live camera only, no gallery (PRD § 3.7 req. 3 liveness) · `face` guide **without the logo box** · one prompt at a time in the bar (*Look at the circle* → *Blink*), spoken · auto-capture on alignment | `components/media-capture.md` § `preview`; final G16–G18 (oval + shoulder line); mob-kyc Wise E1 (one prompt), Grab B5 / OKX D1 (do/don't as faces) | — | — · **core change:** `face` guide variant without the logo box, a liveness prompt sequence (ask 3) |
| D6 · results | `MediaCapture result`: `checking` · `success` (auto-continue) · `fail` with one reason — *Face not clear* · *Look straight at the camera* · *Only your face, please* · *Doesn't match your Aadhaar* — **Retake**; her photo beside the ideal on a fail | `components/media-capture.md` § Result; mob-kyc Wise/Tinder/POF (hers beside ideal) | — | — · *not matched* and *not live* are new result reasons (ask 3) |
| D7 · confirm details | `Card` with `Avatar 56` (her KYC photo) + ListItem `informational` rows (name · date of birth · gender · masked Aadhaar); **Yes, that's me** primary, *Not me — call help* `ghost` | tcless A22 / B79; tc-hub 27; `patterns/onboarding.md` § 7 (*Is this you?* confirm shape) | — | — |
| D8 · errors | `EmptyState error` page, one per case below, each with one recovery and Help in the header | `patterns/error-recovery.md` § ladder + Copy rules; final e1 (sheet), e2 (page — copy not reused), e3 (toast) | — | — |
| D8a · no Aadhaar phone | *DigiLocker needs your Aadhaar phone number* · **Use Aadhaar photo** (ladder: Alternative) | PRD § 3.7 error table | — | — |
| D8b · session ended | *The check didn't finish* · *Your details are saved* · **Try again** | PRD § 3.7; `error-recovery.md` line 2 *is she okay* | — | — |
| D8c · already registered | *This Aadhaar is already with Snabbit* · **Call help** (ladder: Help) | PRD § 3.7 | — | — |
| D8d · details differ | *Your Aadhaar name is different* · facts strip: typed · on Aadhaar · **Use Aadhaar name** / *Call help* | PRD § 3.7; `components/feedback.md` Banner `facts` | — | — |
| D8e · network | *Couldn't reach Aadhaar* · *Your progress is saved* · **Try again** | PRD § 3.7 (never *Something went wrong on our side*, `error-recovery.md`) | — | — |
| D8f · not eligible | *You can join Snabbit when you turn 18* · **Call help** · final, no retry (Q20) | shipped e2 page (`14967:135368`); not in the PRD error table (Q20, Q21) | `EmptyState error` page | — |
| D8g · Aadhaar says Male | *Your Aadhaar says Male* · *We hire women experts for now* · **Call help** · final, no retry (Q21, Rupam 2026-11-05) | shipped e2 page (`14967:135368`); line from shipped B42 `1109:35810` | `EmptyState error` page | — |
| D9 · third failure | `EmptyState error`: *Let's do this together* · **Call help** primary · *Do it at the Hub* `ghost` | `patterns/error-recovery.md` ladder step 4; final e1 pair; mob-kyc DoorDash F4 (a person at the end) | — | — |

## E · Training

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| E1 · how training works | `HowToClip player` full screen, one clip: how long, what a check is, what happens if she fails; close → E2 | `components/how-to-clip.md` § `player`; train-a 1A-28 / L3; train-b v2 2–5 | — | v2's two welcome screens + mascot intro between clip and home (fail P1 delete-a-line, train-b) |
| E2 · training home | **decision for the lead:** (a) `Stepper rail` of modules + count + `HowToClip card` grid ×2 columns + one Button (train-b v2 8), or (b) `Accordion` of modules with ring lessons (train-a *For Diya*). Plan recommends (a): five modules fit the rail at 360 dp, and the grid is HowToClip `card` as specced | train-b v2 8; train-a 1D-6/7; `components/stepper.md` § `rail`; `components/how-to-clip.md` § `card` | — | `onboarding.md` § 6a `Stepper list` (both newer shipped shapes replaced it) |
| E2 · progress | `ProgressBar M` with label *Lessons* · *12 of 30* | `components/progress-bar.md` § Anatomy; train-b Section 3 (*Lessons 3/40*) | — | — |
| E2 · locked module | `Stepper rail` node `locked` with the reason as the eyebrow (*After Module 2 check*) | `components/stepper.md`; train-b home states 56–60 (unlock on check passed) | — | — |
| E3 · lesson | `HowToClip player` per lesson; end card *Next lesson* / *Replay* | `components/how-to-clip.md` § `player`; train-a L7 | — | — |
| E4 · question | `SelectionCard hero` ×2–3 `single` (every option a picture), spoken with the active option highlighted (VoicePrompt `inline` per card); yes/no questions as two `hero` cards stacked, never ✕/✓ side by side | `components/selection-card.md` § `hero`; train-b v2 11–24 (picture options read aloud) | — | the shipped ✕ / ✓ button pair (mirrored, P3, train-a) · multi-select (PRD § 3.8 req 5 retires it) |
| E4 · answer | `Toast success` *Right* or `Snackbar` *Not quite — see why* → `BottomSheet info` with the correct picture | `components/feedback.md`; train-b v2 66–68 wrong-answer sheets | — | — |
| E5 · failed attempt | `HeroCard facts`: top label *Your score*, figure *7 of 15*, bottom facts *Pass mark · 10* and *Tries left · 2*; then `ListItem navigational` rows for the wrong topics, each opening its module; **Watch Payouts again** primary (names the first wrong module) | `components/hero-card.md` § `facts`; `components/list-item.md`; train-b v2 61 (score tiles + *Rewatch videos*) | — | — · tone of the HeroCard is `neutral`, not error (P6); numbers wait for Q14 |
| E6 · locked out | `EmptyState waiting` page: *Your next try opens on Sat 8 Nov* with `Timer deadline` · **Call help** | `components/empty-state.md` § `waiting`; register from tcless B97 (*Try again in 30 days*, no red) and train-b v2 42 (*Trainer will call you in 24 hours*) | — | — · no screen in any read shows a lockout |
| E7 · passed | full-bleed `bgBrandSubtle` stage, celebration scene, Heading1 *You passed, Sunita*, `BodyLg` date, `motion.celebrate` + `sound.confirm`; **See your certificate** primary · *Pick your joining date* `ghost` | go-live G13 (celebration anatomy); final G1 trophy; train-b v2 34 | — | v2 35 *You are now a Snabbit Expert → Start working* (wrong here: the Hub, terms and photo are still ahead) |
| E8 · certificate | `Card static`: reward-layer certificate asset 96 · `Avatar 56` (KYC photo) · Heading2 name · two `Stat S` (*Passed on* · *Certificate no.*) · **Share on WhatsApp** primary (`whatsapp-logo`) · **Save to phone** `secondary` | beauty tr-28 (name · date · centre · duration, *Download certificate*); `components/card.md`; `components/stat-rating-divider.md` § Stat | `Card` anatomy (radius lg, 16 padding, 12 gap); `HeroCard facts` for the two-fact row | `Statement` (a ledger, not a record) · `HeroCard` (a tracker header; no photo slot) — **Tier 3 brief** if the composition does not hold (TIERS 31) |

## F · Joining date and shift confirm

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| F1 · joining date | `SelectionCard date` strip ×7, *Tomorrow* first + `ListItem navigational` *Show more dates ›* | go-live G1; final G2; tc-hub 22 | — | — |
| F2 · your shift | `SelectionCard rich · shift option` `selected`, read-only + `ListItem navigational` **Change ›** | tcless B19 *Your Timings · Change*; go-live G4 | — | — |
| F2 · picked later | when C was skipped, F2 is **not shown** (PRD § 3.10); the Hub stage carries the pick | PRD § 3.10 | — | — |
| F2f · seat gone | `Banner info` *Your seat went — these are open* over the C2 list with bonuses | `components/feedback.md` § Banner; mob-area DoorDash A2 | — | — |
| F · action | **Confirm my shift** | `components/button.md` | — | — |

## G · Hub visit (switchable)

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| G1 · order | rethought 2026-11-05 (Rupam, *"rethink from first principles"*): the screen's one job is to get her there, so the order is **where → bring → what to show**; title *Visit the Hub*, no hero pill, no tick | PRD § 3.11 req. 1 (address, map, timings, what to bring, advance) | shipped B19 regions, reordered | B19 order (time first, Hub last): built for a booked batch |
| G1 · where | Hub card first: photos, name, address, **Open 10 AM to 5 PM** *any day* row (`clock`), nearest metro and bus, Listen, Call and Share; **Show directions** is the one primary, so no Map tile | shipped B19 Hub card; PRD § 3.11 req. 1 | `Card static` + `ListItem` anatomy | `MapSnippet` (drawn later if the card's photos do not get her there) |
| G1 · bring | two tiles: Aadhaar card pictogram · `currency-inr` *₹500 for uniform*; *Your phone* dropped (she is holding it, P1); no *Important* band | PRD § 3.11 req. 1; B19 *Important* items | `SelectionCard` tile anatomy, static | ListItem ×3 in a gradient band (B19): read as decoration, and the phone row told her nothing |
| G1 · show at the Hub | one card: *Show this at the Hub* · photo (KYC) · name · *#AB12456* · divider · *Code* *Valid till 5 pm* · **542** in `Display` | PRD § 3.11 handshake (ID + rotating code, one card); B50 ID + code | `Card static` | two cards, ID and Hub code (B50): one handshake split in two |
| G1k · from Identity | same screen when D9 *Do it at the Hub* sends her: line *We'll check your Aadhaar at the Hub* under the title; Bring is the Aadhaar card only; the card has no photo (no KYC photo yet) | PRD § 3.7 req. 6 | G1 | — |
| G3 · agent-led | *Priya is with you* · one checklist card that ticks as Priya records: health check · uniform sizes (*Priya is noting them*) · ₹500; no buttons, no Hub details, no ID card | PRD § 3.11 handshake 3 + what the ops tool records; BE gl-09 rows | `Stepper` vertical anatomy (done · current · next) | agent row above the full Hub screen (B24): she had to read past what she no longer needed |
| G4 · after the visit | `Statement`: band *Your uniform* (no money in the band) · rows per item (*T-shirt · M · 2*, *Pant · L · 2*, *Bag · 1*) · row *Advance paid* with Amount and Tag `success` *Paid* · row *Health check* with Tag `success` *Done* | go-live G5 (kit Statement); beauty gl-07–09; final G3–G4 (sizes as facts) | — | — · the BMI result row has no drawn base anywhere |
| G5 · health check under review | `EmptyState waiting` page: *We're checking your health form* · `Timer deadline` *Answer by Fri 14 Nov* · **Call help**; no red, no number shown to her | `components/empty-state.md` § `waiting`; register from train-a 1B-11 *Trainer approval pending*, tcless B97 | — | — · copy reviewed for dignity (P6) before it is drawn |
| G6 · hood still to pick | `Stepper list` with the hood step `attention` and the next step `locked` + `Banner warning` *Pick your hood to finish* → C1 | `components/stepper.md` § `list`; final 7 / 20 (*All steps unlocked*); tcless B84 | — | — |

## H · Terms

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| H1 · the five points | ListItem `informational` ×5, number leading (Heading3 `textSecondary`), one sentence each: pay · attendance · red cards · uniform advance · safety | go-live G9 | — | — |
| H1 · full terms | `ListItem navigational` *Read the full terms ›* → a text page in her language, VoicePrompt `bar` reads it | go-live G9; PRD § 3.12 (readable text, not only a PDF) | — | — |
| H1 · action | **I agree** alone (the Button is the agreement; no *Decline* beside it) | go-live G9; `components/button.md` § Placement | — | final G14 / beauty gl-06 *Decline / Accept* pair |

## I · Go-live photo

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| I1 · intro | `BottomSheet info`: scene (her at home, plain wall, good light) · *A photo for your profile* · *We add the Snabbit uniform for you* · **Take photo** | go-live G10; beauty gl-21 | — | — |
| I2 · camera | `MediaCapture preview` · `face` guide without the logo box (same as D6) | `components/media-capture.md`; final G16 | — | as D6 (ask 3) |
| I2 · results | `MediaCapture result fail` with one reason each: *Too dark* · *Face not clear* · *Only your face, please* · *Take off sunglasses* · *Doesn't match your Aadhaar photo* | `components/media-capture.md` § Result; mob-kyc OKX (three faces + one) | — | — |
| I3 · your photo | `MediaCapture preview` showing two images side by side, labelled *Your photo* · *With uniform* (a `Tag neutral` *Uniform added* on the second); **Use this photo** primary · **Take again** `ghost` | beauty gl-22 *Actual \| Enhanced ✦* (trainer-side, unlabelled); `components/media-capture.md` § `preview` | `preview`'s review layout (frozen frame, one primary) | — · two-image review is a core change (ask 6); the label is P5, wording waits for Legal (Q11) |
| I4 · third failure | `EmptyState error` · **Call help** | `patterns/error-recovery.md` ladder step 4 | — | — |

## J · Go live and day one

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| J1 · you're live | go-live G13 celebration: stage, scene, *You're a Snabbit Expert, Sunita*, first shift line, **See my first shift** | go-live G13; final G1 | — | — |
| J2 · header | `HeaderNav home` (bell · coins · Saathi · SOS) | `components/header-nav.md` § Variants; `patterns/onboarding.md` § 8 | — | — |
| J2 · first shift card | `Card`: date and hours as `Stat S` ×2, Amount range *₹800 – ₹1,000*, `Timer M deadline` *Login by 6:50 am*; **Present** `primary brand M` alone, *Can't come* `ghost` above it | `patterns/onboarding.md` § 8; beauty pl-32 (*LOGIN WITHIN* ring → deadline); train-b pt 4 / ae 4 | — | pl-02 / tcless C8 red-and-green *Absent / Present* pair (P3, checklist row 14) |
| J2 · hotspot | `MapSnippet 160` with MapMarker `hotspot` + `me`, *Jyoti Nivas College Gate · 3.2 km*, **Show directions** | `components/map-marker.md`; beauty pl-32; final G13 | — | — |
| J2 · Expert ID | the G2 card, compact, while a Hub visit or uniform handover is still due | G2 | — | — |
| J2 · before your first shift | `Stepper list unordered` *Get paid · Watch the check-in clip* | `patterns/onboarding.md` § 8; `patterns/payout.md` § 3 | — | — |
| J2 · help | *Need help?* ListItem `actionable` ×2 with Avatar + role + `phone` IconButton: *Your area lead* · *Onboarding team* | beauty gl-01 (*Buddy · Team Leader · CLM*); tcless C8 | — | — |
| J2 · first visit | `first-run.md` Home tour, three stops, spoken | `patterns/first-run.md` § first-run map | — | — |

## P · Permissions — guided, every ask (rewritten 2026-11-05)

Rupam: *"super super guided… if phone's language is English and the notification pop-up comes, can we guide them there, if by mistake they select something else, how do we use PiP to guide them there as well."* One pattern for every runtime permission she meets while joining (notifications after language, location before *Finding work*, camera before the selfie). Platform limits it is built on: nothing of ours can draw over the phone's box (Android 12+ hides other windows over it); a first *Don't allow* can be asked once more, a second cannot; picture-in-picture floats over Settings; low-RAM Android Go phones may have no PiP. Developers confirm these on the five top makers.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| P · pattern (V5, Rupam 2026-11-05) | the phone's box drawn at the exact size and place the real one lands (per maker and Android version); the right button lit (`bgSuccessSubtle`, 3 px `borderSuccess`, Title semibold `textSuccess`), the rest greyed (`gray-200` / `gray-400`); a 3 px `borderBrand` frame 9 px outside the box; a 96 px `hand-pointing` on the right button, half outside the box; why line + speaker mark; Saathi in a corner; the real box comes by itself after 2 s; no buttons | `reads/mobbin-cal-ai-notification-pointer-2026-11-05/` (13 apps; Fetch, Breathwrk, BeReal); XA s3b · s3a; ER/AR A12 | — | box picture with a ringed button; Saathi scene in a ring; pointer line up the margin; V1–V4 (iterations row) |
| N1–N3 notifications | N1 rehearse · N2 real box lands (frame and finger end still show) · N3 tick, moves on | XA s3b; A12 | P | — |
| N4 first wrong press | N1 again, voice *That was the bottom one. Press the top one.*; Android allows one more ask | N1 | P | — |
| N5 second no | sheet over N1: *Turn it on in Settings* · *Settings opens by itself after this.* · HowToClip for her maker playing · `ProgressBar`; Settings opens by itself | ER/AR B46 sheet | HowToClip | **Open settings** / *Not now* |
| N6 Settings + PiP | the maker's Settings page with Snabbit in picture-in-picture showing the same control ringed with a finger; polls and returns by itself | PRD 3.3 req. 3 | HowToClip `player` | — |
| N7 two rounds | *Let's turn it on together* · **Call help** / *Show me again* | XA e2; PRD 3.3 req. 5 | — | — |
| L1 location | P on the location box (Precise picture), *While using the app*; *Only this time* = yes | XA s3a | P | — |
| L2 approximate | P on *Change to precise* | N1 | P | — |
| L3 kept approximate | N6 on *Use precise location* | N6 | N6 | — |
| L4 phone location off | P on Google's *Turn on* box (side-by-side buttons, finger below) | PRD 3.3 (*location services on*) | P | — |
| C1 · C2 camera | P on the camera box before the selfie · Settings radio *Allow only while using the app* with PiP | PRD 3.3, 3.7 | P · N6 | — |
| M1 · M2 microphone | as C1 · C2, when voice is first used | PRD 3.3 | P · N6 | — |
| K1 contacts | P on *Allow*, only after she taps invite from contacts; optional, no second ask, no Settings trip | PRD 3.3 | P | — |
| L5 · L6 All the time | part of the location ask, right after L1 is allowed (PRD 3.3 row 2: pop-up, then settings page; timing TBD, re-checked when she goes online): no box on Android 11+, so the clip sheet plays and Settings opens straight away on *Allow all the time* with Snabbit in the corner | PRD 3.3 rows 2 and *Background location* | N5 · N6 | in the before-first-shift lane (first drawing): the PRD asks it with location |
| B1 battery | P on Android's *Let app always run in background?* dialog (config switch, default off); deny path as G1–G2 | PRD 3.3 | P | — |
| O1 · O2 Appear on top | clip sheet, then the *Appear on top* switch with PiP (config switch) | PRD 3.3 | N5 · N6 | — |
| P4 · Profile → Permissions | unchanged from the earlier plan | — | — | — |
---

## What this plan asks of the system before drawing

Copied to `SCOPE.md` → *Asks of core*. None blocks drawing in Paper as long as the drawn region cites the row.

| Ask | Rows |
| --- | --- |
| HeaderNav with two trailing actions in onboarding (Help + Language) | 0 · header |
| EmptyState neutral message kind (not empty, not error, not waiting) | A7, B2x |
| SelectionCard shift option pay slot carrying a one-time *Joining bonus* | C1 |
| MediaCapture `face` without the logo box; liveness prompts; *not matched* / *not live* results | D6, I2 |
| MediaCapture `document` failure pictogram row | D3 |
| MediaCapture `preview` with two images and a label | I3 |
| HowToClip `guide` per device maker | P3 |
| Expert ID card (Tier 3 brief) | G2 |
| Certificate (composition, brief if it fails) and a reward asset | E8 |
| Scenes and pictograms: permission scenes ×6, face consent, Hub what-to-bring, go-live photo intro, already trained, health check | A4, B4, D4, D5, G1, I1, A7, G5 |
| Icons to register: `certificate` (E8 card), `download-simple` (*Save to phone*), `arrows-clockwise` (code refresh, if Q10 keeps it) | E8, G2 |

## Still open, and which rows wait

| Question | Rows that wait |
| --- | --- |
| Q8 · work area before KYC or after training for the pilot | the drawn order of C |
| Q9 · advance amount and when it is paid | G1 what to bring |
| Q10 · the code's life and refresh | G2 |
| Q11 · Legal on the generated uniform photo | I3 label |
| Q14 · attempts, pass mark, lockout | E5, E6 numbers |
| Q15 · what she sees when a held seat releases | C (notification), F2f |
| Q17 · OTP box count | A6 |
| E2 · training home shape (rail + grid vs Accordion) | E2 — the lead picks |

## Checks

- [x] Every surface in `TIERS.md` (1–49) has at least one row here; 6 (floating guide) is answered *not built*, 47–48 are notifications and have no screen.
- [x] Every *Built from* names a component and its kind, or a shipped screen; every composition names its parts.
- [x] No row cites Mobbin while a shipped screen, pattern or component had the shape; Mobbin rows (C2 seats, P4) list what was tried.
- [x] Every *Inherits* is filled where no whole component fits (A7, B2x, C2 seats, E8, G2, G3, I3, P4).
- [x] No copy in this plan uses *Continue*, *Submit*, *OK*, *Full time*, *Micromarket* or a step count in a Button.
- [ ] Assets and icons registered before the screens that use them are called done.
