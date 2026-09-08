# Roadmap

What is done and what is left, against the 46-component core set in `audit/BENCHMARK.md`. Updated in the same commit as the work. Status meanings: **Proposed** (spec + live page exist) → **Reconciled** (Figma matches) → **Stable** (package ships it).

---

## Done — 24 pages · 31 of 46 core components

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

Foundations done: tokens (`tokens/`), principles, extending, icons register, assets (two layers). Research done: Figma audit (204 frames), benchmark.

---

## To do — components (15), in the agreed order

| # | Component | Priority | Notes |
| --- | --- | --- | --- |
| 25 | **Skeleton / Spinner** | P0 | Loading for lists and cards; spinner only inside Button. |
| 26 | **Voice prompt** | P0 | The spoken-guidance bubble: play/replay, playing state, language. Every spec references it. |
| 27 | Tabs / Segmented control | P1 | Earnings today/week/month; ≤ 3 segments, icon + label. |
| 28 | Nudge | P1 | Consequence strip (Figma `1581:6683`): *If not accepted −50*, *Login by 6:50 +1 coin*. Sits with the job-alert pattern. |
| 29 | Numeric keypad | P1 | OTP, amounts, phone. Large keys. |
| 30 | Pagination dots | P1 | Carousels, onboarding. |
| 31 | Media container | P1 | Photo capture: loading, error, retake. |
| 32 | Map marker | P1 | Job, hub, expert position. |
| 33 | Divider | — | Trivial; fold into ListItem/Card pages or one small page. |
| 34 | Rating | — | Post-job rating the expert gives/receives. |
| 35 | Stat | — | Label + Amount + delta; earnings tiles. |
| 36 | How-to clip | P1 | 10-second looping video with voice (research-validated channel). |
| 37 | Shield (Kavach) card | Composition | Card + SafetyStrip + *Start Shield*; after Voice prompt. |
| 38 | Job-alert sheet | Composition | Timer + Amount + Button + Nudge; written as the first pattern. |
| 39 | FAB (map controls) | P1 | IconButton `L` floating variant — may collapse into IconButton. |

Removed from the count (decided): Tooltip (→ Coachmark), Progress Buttons (→ Button hold state), Popover, Data table, Drawer, Breadcrumb.

---

## To do — foundations (5 of 7)

| Foundation | Why it blocks | Depends on |
| --- | --- | --- |
| **Sound & haptics register** | Every spec names sounds (*coin*, *success*, *sos*) and haptics (*light*, *medium*, *heavy*) that exist nowhere as a list | — |
| **Motion tokens** | Durations and curves are hard-coded per spec (100, 150, 200, 300, 400 ms) | — |
| **Content guide** | Voice, four languages, spoken-copy rules, vocabulary in one place | Voice prompt |
| **Accessibility standard** | Contrast, targets, screen reader, reduced motion — currently repeated per spec | — |
| Indic type rules | Line-height ×1.15 exists in tokens; wrap/length rules per component not consolidated | — |

---

## To do — patterns (0 of 10)

New-job alert (reference case, first) · Check-in / check-out · Payout · Onboarding & go-live · Error recovery · Permission asking · First run (Coachmark tours) · Earnings breakdown · SOS flow (drawn in SOSControl; pattern adds what happens after) · Offline.

---

## To do — governance (0 of 4)

Component status lifecycle in practice (nothing is Reconciled yet) · Changelog · Token/spec lint · Design-review step from `EXTENDING.md`.

---

## Open items

- `illustration.purple` hex — waiting on a value from the Snabbit Assets file.
- `PRINCIPLES.md` reference-case line still says the Timer is a ring around the Button; the Timer spec places it above. Fix when the job-alert pattern is written.
- Confirm whether the `1Login` onboarding screen (navy, non-Outfit) is shipped or older — see `references/SCREENS.md`.
- Figma reconciliation: every spec lists its changes; none applied yet. Until Figma matches, designers still draw from old frames.
- Field validation: checklist rows 15–16 (copy heard aloud in four languages; device review with experts) are open on every component.
