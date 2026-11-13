# Tiers — Contactless GL (Phase 2: Onboarding Centre)

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). This is the step that turns an ask into a plan, and it is where the gaps in the system become visible.

Numbering follows the PRD's § 3 steps. *Built from* names the shipped screen or pattern stage first, then the component. Drafted 2026-11-04 from `patterns/onboarding.md`, `permissions.md`, `first-run.md`, `error-recovery.md` and the component specs; the shipped screens were read region by region on 2026-11-04 — **`reads/README.md` § The map** gives every surface its best base and what is still undrawn; it supersedes the *Built from* column below where they differ.

## Surfaces

| # | Surface (PRD's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | § 3.1 deep-link install → OTP (*stamped contactless, never sees TC slot selection*) | 2 | `onboarding.md` § 0–2 as shipped: welcome, language, phone, OTP (NumericKeypad `otp`). Nothing new on screen; the flow flag is backend | exists |
| 2 | § 3.1 *already attended TC training — a clear message in her language* | 2 | EmptyState `info` with one line and **Call help**; `error-recovery.md` | exists |
| 3 | § 3.2 Intro videos *"Get to know more"*, 3–5 under 60 s, skippable | 2 | HowToClip `card` ×≤5 with PageIndicator → `player`; Button **Next** always enabled; `onboarding.md` § 0 promise screen is where it sits | exists — thumbnails are assets to register |
| 4 | § 3.3 Permission asks, one per screen: picture, one line, one button | 1 | BottomSheet `permission` (`permissions.md` § The sheet) — benefit title, one-sentence why, **Allow …** / **Not now**, spoken | exists · **order is open question 2** |
| 5 | § 3.3 Settings-page guide: animation of the exact screen and toggle, per phone maker | core change | HowToClip `guide` on the permanently-denied sheet (`permissions.md` § Permanently denied) — exists for one clip; needs a clip per maker | needs core change (ask 2) |
| 6 | § 3.3 Floating picture-in-picture guide while on the settings page | — | Not built: needs the overlay permission it is meant to teach (open question 3). Proposed answer is surface 5 | blocked by question 3 |
| 7 | § 3.3 Denied twice → explain once, show the guide, then *Call support* | 2 | `permissions.md` fallback rows: Banner `warning` with the fix Button, **Open settings** with the guide; Help in the header | exists |
| 8 | § 3.4 Language change from any screen, applies at once | 1 | HeaderNav `page` Language IconButton `translate` → BottomSheet `select` (`onboarding.md` header row) | exists · **seven languages is ask 1** |
| 9 | § 3.5 Registration: name, city, gender, consent, referral pre-filled; no TC screens | 2 | `onboarding.md` § 3 About you — city ListItem + `select` sheet, name TextField, gender SelectionCard `rich` ×2, referral row (hidden when pre-filled) | exists |
| 10 | § 3.5 Gender-check rejection, translated, explains why politely | 2 | EmptyState `info` — the *Unavailable city* shape with **Notify me** / **Call help**; `error-recovery.md` copy rules | exists |
| 11 | § 3.6 Work area list: nearby first, display name + landmark line, joining bonus where configured | 1 | SelectionCard `rich` · shift option form (shipped 2026-10-01: hood over area + `map-pin` + trailing pay slot) — pay slot carries *₹2,000 joining bonus* as Amount; *Near your home* as the list heading | exists — confirm the pay slot may read a bonus, not a monthly figure |
| 12 | § 3.6 Shift windows with open seats, full ones hidden | 1 | SelectionCard `rich` · shift option, day rail (block · break · block) | exists |
| 13 | § 3.6 *Help me choose* → callback task; *Call support* | 2 | *Help me choose* as Button `secondary` in the EmptyState (no open seats nearby) and as a ghost under the list; support = header Help | exists · placement is open question 5 |
| 14 | § 3.6 *Decide later* (skip) | 1 | Button `ghost` below the primary (`button.md`); the step turns `attention` in the Home Stepper | exists |
| 15 | § 3.6 Seat released after 7 days — *she is told* | 2 | Notification + Home Banner `warning` *Your shift seat was released* → **Pick again**; `notification-centre.md` | exists · what she sees is open question 15 |
| 16 | § 3.6 No open windows in any nearby area — message + support, not an empty list | 1 | EmptyState `empty` with **Call help** and **Help me choose** | exists |
| 17 | § 3.7 KYC choice: DigiLocker (recommended) · Aadhaar photo upload | 1 | SelectionCard `compact` ×2 with Tag `brand` *Recommended*; `onboarding.md` § 5 *Keep your Aadhaar ready* intro kept | exists |
| 18 | § 3.7 DigiLocker in-app with *Stay in the app* banner, Skeleton, verified summary Card | 2 | `onboarding.md` § 5 as shipped: Banner `warning`, WebView with HeaderNav, Skeleton 3-second rule, summary Card | exists |
| 19 | § 3.7 Aadhaar photo upload with OCR (front/back) | 1 | MediaCapture `document` ×2 with its retake tips | exists |
| 20 | § 3.7 Consent before capturing face data, with the reason, spoken | 1 | BottomSheet `confirm` safe-confirm form (one primary **I agree**, ✕ to leave) — Snabbit's own agreement, like Shield consent (`permissions.md` § Shield consent is not a permission) | exists |
| 21 | § 3.7 Live selfie with liveness check, matched to the Aadhaar photo | core change | MediaCapture `face` — oval exists; the logo box must go and *live* / *matched* results added | needs core change (ask 3) |
| 22 | § 3.7 Name, DOB, gender read from Aadhaar, shown to confirm | 2 | Summary Card with ListItem rows + **Yes, that's me** / **Not me — call help** (the bank confirm shape, `onboarding.md` § 7) | exists |
| 23 | § 3.7 Eight error screens (not linked · session expired · already registered · blurred · face mismatch · liveness · name/DOB mismatch · network) | 1 | EmptyState `error` per row, one recovery each; MediaCapture `result` overlay for blurred / mismatch / liveness; `error-recovery.md` ladder | exists — copy to write, the PRD's *Something went wrong on our side* is banned (P5) |
| 24 | § 3.7 After 3 failures: *Call support* and KYC at the onboarding centre | 2 | EmptyState `error` final rung with **Call help** primary and *Do it at the Hub* `ghost` → the Hub screen (surface 36) | exists |
| 25 | § 3.8 Transition video before training | 1 | HowToClip `player`, full screen, close → training home | exists |
| 26 | § 3.8 Training home, auto-enrolled | 2 | Training v2 home (module rail · chapter count · HowToClip `card` grid · one button) or *For Diya* (Accordion + ring lessons); picture-card questions with VoicePrompt highlight | exists in two newer shapes — the pattern's variant section picks one (ask of core) |
| 27 | § 3.8 Failed attempt: score, wrong topics, module to rewatch, attempts left | 2 | Training v2 fail screen (score tiles + **Rewatch videos**) as the base · ListItem `navigational` rows for the wrong topics · ProgressBar `segmented` for attempts left · the Button names the module | composition to design — the shipped screen has the score only |
| 28 | § 3.8 Locked out: one next step and a call button | 1 | EmptyState `waiting` (Timer `deadline` if the lockout is timed) with **Call help** | exists |
| 29 | § 3.8 *Call support* on every module and the assessment | 1 | HeaderNav Help, as everywhere (open question 6) | exists |
| 30 | § 3.9 Completion screen: her name, date, next step | 2 | `onboarding.md` § 6a *Onboarding complete* scene with `motion.celebrate` and **Go to Home** | exists |
| 31 | § 3.9 Certificate — name, KYC photo, date, ID; download and share; stays in the app | 3 | No core certificate. Composition: Card with Avatar, Heading2, two Stats, a Tag with the ID; **Share on WhatsApp** `primary`, **Save** `secondary`. A Profile ListItem keeps it. Reward layer (metallic 3D) or illustration? — `assets.md` decides: a certificate is a reward | needs brief (if the composition cannot carry it) · asset to register |
| 32 | § 3.10 Joining date | 1 | SelectionCard `date` strip + *Show more dates* (Beauty go-live G1) | exists |
| 33 | § 3.10 Slot confirmation with edit; alternatives with joining bonus if the slot filled | 1 | SelectionCard `rich` · shift option `selected` + ListItem **Change ›**; filled → the list from surface 11 with a Banner `info` *Your seat went — these are open* | exists |
| 34 | § 3.11 Hub screen: address, map, timings, what to bring, advance amount | 2 | The training-centre card composition (`onboarding.md` § 6b): MapSnippet `hub` + Timer `deadline` + ListItem rows (what to bring with pictograms, address with Listen and **Show directions**) + Amount row; Beauty go-live G8 | exists — amount is open question 9 |
| 35 | § 3.11 Expert ID card with a rotating code, on the Hub screen and on Home | 3 | Shipped *Share Expert ID and OTP* card (ID · three digits · validity line, in every current file) + Avatar with her KYC photo + Timer `deadline` for the code's life + Listen | needs brief for the life/refresh/placement · open question 10 (partly answered) |
| 36 | § 3.11 *Your visit has started with <agent name>* | 2 | Card `state` with Avatar + name + Tag `info` *With you now* on the Hub screen; `check-in-out.md` has the shape (customer card) | exists |
| 37 | § 3.11 After the visit: uniform size, quantity, payment status, BMI result | 1 | Statement (Beauty go-live G5 kit statement) with rows per item and a payment row with status Tag; BMI as a ListItem with Tag `success` / `warning` | exists |
| 38 | § 3.11 Work area pending blocks moving on | 1 | Stepper `list` with the step `attention` and the next step `locked`; Banner `warning` **Pick your hood** | exists |
| 39 | § 3.11 BMI fail: go-live blocked, *case under review* | 1 | EmptyState `waiting` — dignity copy (P6), **Call help**; no red | exists |
| 40 | § 3.12 TnC readable in her language, summary above, play button | 2 | Beauty go-live G9: five ListItem `informational` rows with numbers, then full text; VoicePrompt `bar` reads it; **I agree** `primary` (the Button is the agreement) | exists |
| 41 | § 3.13 Go-live selfie with face frame and tips; quality checks; must match KYC | core change | MediaCapture `face` (same change as surface 21: no logo box, match result) with `result` reasons *blurred · dark · more than one face · sunglasses* | needs core change (ask 3) |
| 42 | § 3.13 AI puts the uniform on; she sees the result and can retake | 2 (confirm) | Beauty gl-22 *Actual \| Enhanced* compare, moved to her phone as MediaCapture `preview` with **Use this photo** `primary` / **Retake** `ghost`; a line that says it is generated (P5) | base exists trainer-side only; `preview` showing two images is ask 6 · Legal is open question 11 |
| 43 | § 3.13 Three failures → call support | 1 | As surface 24 | exists |
| 44 | § 3.14 Day-one Home: hotspot, address, map button, shift time | 2 | `onboarding.md` § 8 Home pre-shift Card + MapSnippet `hotspot` row with **Show directions** | exists — `hotspot` marker meaning to check in `icons.md` |
| 45 | § 3.14 *Call for help* reaches the area ops contact | 1 | *Need help?* ListItem `actionable` with `phone` (`onboarding.md` § 8) | exists |
| 46 | § 3.14 Voice guidance reads each Home card and the route steps | 1 | VoicePrompt + `first-run.md` Home tour (safety → work → money) | exists |
| 47 | § 3.14 Reminders the evening before and the morning of | 2 | `notification-centre.md` rows; no screen | exists |
| 48 | § 4.3 Inactive 24 h → reminder | 2 | `onboarding.md` § Edges *Finish in 2 minutes* notification | exists |
| 49 | Progress through the flow (count changes with config: work-area position, Hub on/off) | 1 | ProgressBar `segmented` `count` 2–7 under the header; Home Stepper `unordered` for the post-training tasks | exists — the count must be computed per config |

## Gaps

Everything the verdict column marked as missing, copied into `SCOPE.md` → *Asks of core* and closed **there** — in the shared system — before the pattern is written. A project never patches core privately.

| Gap | Kind | Blocks |
| --- | --- | --- |
| Telugu, Odia, Bengali as scripts of the system | foundation change (`type.md`, P9, `content.md`) | every surface |
| HowToClip `guide` per phone maker | component change | 5, 7 |
| MediaCapture `face` without the logo box; liveness and match `result` states | component change | 21, 41 |
| Expert ID card with a rotating code | Tier 3 brief | 35 |
| Certificate | Tier 3 brief or composition; reward asset | 31 |
| MediaCapture `preview` showing a generated photo, labelled | component change (to confirm) | 42 |
| Icon meanings: certificate, hotspot, physical check, uniform handover, joining bonus | icon | 31, 34, 37, 44 |
| Assets: intro-video thumbnails, Hub-visit scene, face-consent scene, certificate | asset | 3, 20, 34, 31 |

## Checks

- [x] Every surface in the PRD appears in the table above — none skipped as "obvious" (§ 3.1 link/LMS, § 4.2, § 4.4, § 4.5 are not screens)
- [ ] Every Tier 3 row has a brief, or a line saying why it is not needed yet — briefs pending (35, 31)
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
