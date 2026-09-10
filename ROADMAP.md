# Roadmap

What is done and what is left, against the 46-component core set in `audit/BENCHMARK.md`. Updated in the same commit as the work. Status meanings: **Proposed** (spec + live page exist) → **Reconciled** (Figma matches) → **Stable** (package ships it).

---

## Done — 46 pages · 46 of 46 core components + 2 compositions + 1 pattern

| # | Page | Covers | Status |
| --- | --- | --- | --- |
| 1 | Button | Button (incl. hold-to-confirm) | Proposed |
| 2 | IconButton | IconButton, allowed-icon set | Proposed |
| 3 | Tag | Tag | Proposed |
| 4 | TextField | TextField (text, phone, OTP, amount, search) | Proposed |
| 5 | Checkbox · Radio · Switch | three selection controls | Proposed |
| 6 | Amount | Amount (₹, tabular, sizes) | Proposed |
| 7 | Timer | Timer (countdown, deadline) | Proposed |
| 8 | Banner · Toast · Snackbar | Banner (incl. **Offline banner**), Toast, **Snackbar with action** | Proposed |
| 9 | Chip | Chip (filter, input) | Proposed |
| 10 | Avatar | Avatar | Proposed |
| 11 | Badge | Badge (dot, count, promo), AchievementBadge | Proposed |
| 12 | Card | Card | Proposed |
| 13 | ListItem | ListItem | Proposed |
| 14 | SelectionCard | SelectionCard | Proposed |
| 15 | BottomSheet | BottomSheet — info, **confirm (Dialog)**, select (**Menu/Select**), form, **permission** | Proposed |
| 16 | HeaderNav | HeaderNav, HeaderAction | Proposed |
| 17 | BottomTabBar | BottomTabBar | Proposed |
| 18 | ProgressBar | ProgressBar; compositions TierProgressCard, WeeklyGoalCard, TierRail | Proposed |
| 19 | Stepper | Stepper (rail, list) | Proposed |
| 20 | Coachmark | Coachmark (replaces Tooltip) | Proposed |
| 21 | SOSControl | SOSControl, active screen, SafetyStrip | Proposed |
| 22 | Accordion | Accordion (faq, breakdown) | Proposed |
| 23 | DatePicker | DatePicker (strip, month, DayCell); time = Select | Proposed |
| 24 | EmptyState | EmptyState (empty, error, offline, waiting; page, section) | Proposed |
| 25 | Skeleton · Spinner | Skeleton shapes + presets; Spinner (Button, inline); 3-second rule | Proposed |
| 26 | VoicePrompt | VoicePrompt (bar, inline); autoplay policy | Proposed |
| 27 | Tabs · Segmented | Segmented (2–3), Tabs (3–5) | Proposed |
| 28 | Nudge | Nudge (gain, loss, list) | Proposed |
| 29 | NumericKeypad | NumericKeypad (phone, otp, number, amount) | Proposed |
| 30 | PageIndicator | PageIndicator (2–5 pages; carousel rules) | Proposed |
| 31 | MediaCapture | MediaCapture (tile, preview; face / document / scene guides) | Proposed |
| 32 | MapMarker · MapSnippet | MapMarker (job, hub, me, hotspot); MapSnippet composition | Proposed |
| 33 | Stat · Rating · Divider | Stat (S/M/L, delta); Rating (faces: input, display); Divider (row, section, labelled) | Proposed |
| 34 | HowToClip | HowToClip (card, player; 10–20 s, loops once, captions) | Proposed |
| 35 | ShieldCard (Kavach) | Composition: ShieldRow (6 states), ShieldConsent, SafetyCheck; SafetyStrip `shield` kind | Proposed |
| 36 | JobAlert | Composition: the reference case as one screen — facts strip, earnings Card, Nudge loss, Timer L, Decline hold, Accept | Proposed |
| — | FAB | Folded into IconButton: floating = `L` `circle` at `elevation.floating`; shutter and recentre only; no FAB component (`icon-button.md`) | Decided |
| 43 | Pattern · First run | `patterns/first-run.md` — the 12 first-run teachings, the Home tour, gating, reset, never-list | Proposed |
| 42 | Pattern · Asking for permission | `patterns/permissions.md` — the eight permissions, when each is asked, the why-sentence, the fallback, permanently denied | Proposed |
| 41 | Pattern · When something goes wrong | `patterns/error-recovery.md` — failure level → component, recovery ladder, copy rules, never-list | Proposed |
| 40 | Pattern · Onboarding and go-live | `patterns/onboarding.md` — from *Self-Serve ER/AR*: TC-less and TC variants, Bank/UPI, pre-shift Home; presenter video → HowToClip `guide`; Telugu decision | Proposed |
| 39 | Pattern · Payout | `patterns/payout.md` — statement, schedule states, get paid (UPI / PAN), early payout, history, the paid moment; from ✅ Monthly Earnings + Adjustments | Proposed |
| 38 | Pattern · Check in, work, check out | `patterns/check-in-out.md` — four stages from shipped Final Designs, departures cited, edges (late, overtime, extension, offline, no GPS) | Proposed |
| 37 | Pattern · New job arrives | `patterns/new-job-alert.md` — arrive, decide, accept / decline / time's up, edges; PRINCIPLES reference case corrected | Proposed |

Foundations done: tokens (`tokens/`), principles, extending, icons register, assets (two layers), motion (`foundations/motion.md`), type across four scripts (`foundations/type.md`), accessibility (`foundations/accessibility.md`). Research done: Figma audit (204 frames), benchmark.

---

## To do — components

None. The 46-component core set is specified; FAB was folded into IconButton.

Removed from the count (decided): Tooltip (→ Coachmark), Progress Buttons (→ Button hold state), Popover, Data table, Drawer, Breadcrumb.

---

## To do — foundations (2 of 8 left) — visual first

Order decided 2026-09-08: the visual foundations first, sound parked.

| # | Foundation | Why it blocks | Status |
| --- | --- | --- | --- |
| 1 | **Motion tokens** | `motion.*` (10 durations, 4 easings) and `timeout.*` (14) added to tokens.json; `foundations/motion.md`; specs reconciled | **done** |
| 2 | **Indic type rules** | `foundations/type.md`: fallback faces, ×1.15 table, expansion budgets, consolidated length table, wrapping, font scale 1.3, test strings; `typography.indic` extended | **done** |
| 3 | **Accessibility standard** | `foundations/accessibility.md`: every token pair measured, targets, focus, screen reader, greyscale, sunlight, the seven-step test pass | **done** — two decisions open |
| 4 | Content guide | Voice, four languages, spoken-copy rules, vocabulary in one place | next (or patterns first) |
| — | Sound & haptics register | Every spec names sounds and haptics that exist nowhere as a list (`sound.sos`, `sound.newJob`, `sound.safetyCheck`, `sound.shutter`, `sound.voiceStart`; `haptic.*`) | **parked** — not visual; the proposals stay in the specs until this is picked up |

---

## To do — patterns (7 of 10 done)

~~New-job alert~~ (done) · ~~Check-in / check-out~~ (done) · ~~Payout~~ (done) · ~~Onboarding & go-live~~ (done) · ~~Error recovery~~ (done) · ~~Permission asking~~ (done) · ~~First run~~ (done) · Earnings breakdown · SOS flow (drawn in SOSControl; pattern adds what happens after) · Offline.

---

## To do — governance (0 of 4)

Component status lifecycle in practice (nothing is Reconciled yet) · Changelog · Token/spec lint · Design-review step from `EXTENDING.md`.

---

## Open items

- `illustration.purple` hex — waiting on a value from the Snabbit Assets file.
- `1Login` question superseded: onboarding evidence now comes from *Self-Serve ER/AR* (`HqmnjmxhZvyvZxmIaVMCrB`); the master file's FINAL ONBOARDING is an older iteration.
- Shield: two product decisions to confirm — auto-start at check-in (vs shipped per-job *Activate*), and the Kavach-blue shield as the one domain-coloured pictogram (`shield-card.md`).
- **Telugu**: the latest onboarding file offers five languages (adds Telugu). If it launches, P9 / `type.md` / `typography.indic` update from four scripts to five in one commit (`patterns/onboarding.md` follow-ups).
- HowToClip `guide` form (inline presenter video on form screens) — add to `how-to-clip.md`.
- Accessibility decisions: (1) primary Button label is 4.0:1 at 16 sp SemiBold — recommend ButtonLg 18 / 24 for L Buttons; (2) token release 0.20 with the `text*Strong` steps, `iconSuccess` → green.600, `iconWarning` → yellow.600 and the accumulated proposals (`foundations/accessibility.md` § Open).
- Figma reconciliation: every spec lists its changes; none applied yet. Until Figma matches, designers still draw from old frames.
- Field validation: checklist rows 15–16 (copy heard aloud in four languages; device review with experts) are open on every component.
