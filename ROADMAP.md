# Roadmap

What is done and what is left, against the 46-component core set in `audit/BENCHMARK.md`. Updated in the same commit as the work. Status meanings: **Proposed** (spec + live page exist) → **Reconciled** (Figma matches) → **Stable** (package ships it).

---

## Done — 37 pages · 46 of 46 core components + 2 compositions + 1 pattern

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
| 37 | Pattern · New job arrives | `patterns/new-job-alert.md` — arrive, decide, accept / decline / time's up, edges; PRINCIPLES reference case corrected | Proposed |

Foundations done: tokens (`tokens/`), principles, extending, icons register, assets (two layers). Research done: Figma audit (204 frames), benchmark.

---

## To do — components

None. The 46-component core set is specified; FAB was folded into IconButton.

Removed from the count (decided): Tooltip (→ Coachmark), Progress Buttons (→ Button hold state), Popover, Data table, Drawer, Breadcrumb.

---

## To do — foundations (5 of 7)

| Foundation | Why it blocks | Depends on |
| --- | --- | --- |
| **Sound & haptics register** | Every spec names sounds (*coin*, *success*, *sos*) and haptics (*light*, *medium*, *heavy*) that exist nowhere as a list | — |
| **Motion tokens** | Durations and curves are hard-coded per spec (100, 150, 200, 300, 400 ms) | — |
| **Content guide** | Voice, four languages, spoken-copy rules, vocabulary in one place | — (VoicePrompt done) |
| **Accessibility standard** | Contrast, targets, screen reader, reduced motion — currently repeated per spec | — |
| Indic type rules | Line-height ×1.15 exists in tokens; wrap/length rules per component not consolidated | — |

---

## To do — patterns (1 of 10 done)

~~New-job alert~~ (done) · Check-in / check-out · Payout · Onboarding & go-live · Error recovery · Permission asking · First run (Coachmark tours) · Earnings breakdown · SOS flow (drawn in SOSControl; pattern adds what happens after) · Offline.

---

## To do — governance (0 of 4)

Component status lifecycle in practice (nothing is Reconciled yet) · Changelog · Token/spec lint · Design-review step from `EXTENDING.md`.

---

## Open items

- `illustration.purple` hex — waiting on a value from the Snabbit Assets file.
- Confirm whether the `1Login` onboarding screen (navy, non-Outfit) is shipped or older — see `references/SCREENS.md`.
- Shield: two product decisions to confirm — auto-start at check-in (vs shipped per-job *Activate*), and the Kavach-blue shield as the one domain-coloured pictogram (`shield-card.md`).
- Figma reconciliation: every spec lists its changes; none applied yet. Until Figma matches, designers still draw from old frames.
- Field validation: checklist rows 15–16 (copy heard aloud in four languages; device review with experts) are open on every component.
