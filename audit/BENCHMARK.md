# Benchmark — what other systems have that we might need

Compared the proposed Snabbit Expert core set (30 components, from `FIGMA_AUDIT.md`) against mature mobile design systems, then filtered every gap through the expert persona and the nine principles. Not everything they have belongs here; some things we need, nobody has.

Systems compared: Material Design 3 (Google; the Android baseline and what Compose ships), Base (Uber; the most complete two-sided marketplace system, with a driver/earner app), Asphalt Aloha (Gojek; the closest analogue — ride, delivery and services in Indonesia, with a driver-partner app and emerging-market constraints), and Apple HIG as the iOS baseline. Plus the Microsoft Research programme on interfaces for low-literate users, which is the strongest evidence base for our persona.

---

## 1. Components we are missing

Ranked by how directly a principle demands it. **P0** = a principle cannot be met without it; **P1** = every mature system has it and we will need it within the first ten screens; **P2** = useful, build on demand.

| Priority | Component | Who has it | Why we need it |
| --- | --- | --- | --- |
| P0 | **Offline banner** | — (Uber/Gojek handle inline) | P5: offline is a persistent calm banner, not a modal. Patchy data is the expert's normal. |
| P0 | **SOS control** | — (Uber has in-app, undocumented) | P7: reachable in ≤2 taps from every in-job screen, same place, hold/slide protected. Nobody documents this as a component; we must. |
| P0 | **Voice prompt / audio bubble** | — | P4: spoken guidance is a first-class channel. Needs a visible affordance: "tap to hear again", playing state, language. Unique to us. |
| P0 | **Dialog / confirmation sheet** | M3 Dialog, Base Dialog & Modal, Asphalt Alert | P3: costly actions need a second deliberate gesture with the consequence shown. Ours is a bottom sheet, never a centred modal (thumb reach). |
| P0 | **Permission sheet** | — (M3 relies on OS) | Camera, location, contacts, notifications, overlay — the app asks often. One consistent, illustrated, spoken sheet that explains *why* before the OS prompt. The old app repo had ad-hoc versions of this. |
| P0 | **Switch / Toggle** | All | Basic control; missing entirely. Availability on/off, shift on/off. |
| P0 | **Snackbar (with action)** | M3, Base | P5: confirm success on screen; undo where possible. Toast (which we have) is passive; Snackbar carries one action. |
| P0 | **Empty state** | Base, M3 (pattern) | P5: one of the five mandatory states. Illustration + one line + one action. |
| P0 | **Skeleton / Spinner** | Base (Progress indicator), M3 (Loading indicator) | P5 and P8: loading must be visible and cheap. Skeleton for lists and cards, spinner inside buttons. |
| P0 | **Coachmark** | Asphalt | Microsoft Research: low-literate users struggle with transfer of learning. Point-and-say guidance on first use — with audio — is how features get discovered. |
| P1 | **Tabs / Segmented control** | M3 Tabs & Segmented buttons, Base | Earnings (today/week/month), history filters. Max 3 segments, icon + label. |
| P1 | **Numeric keypad** | Asphalt Keyboard | OTP, amounts, phone numbers. Large keys, one purpose; the OS keyboard is too small and too full. |
| P1 | **Amount / number display** | — (we have "Value") | Earnings, payouts, timers: the primary figure on most screens. Own component so ₹, tabular numerals, size and colour are always right. |
| P1 | **Pagination indicator** | Asphalt Indicator, M3 Carousel | Dots for banner carousels and onboarding. |
| P1 | **Floating action button** | M3 FAB | Map screens only: recentre, call. Not a general pattern (P2: one primary action at the bottom). |
| P1 | **Map marker** | Asphalt Marker | Job location, hub, expert position. Consistent pin family. |
| P1 | **Menu / Select** | M3 Menus, Base Select | On mobile this is a bottom sheet list with radio. Language picker, shift picker. |
| P1 | **Media container** | — | Photos of the home, selfie, document capture: one component with loading, error and retake states. |
| P1 | **Stepper / Progress steps** | M3, Base | We have "Step Indicatorss"; formalise for onboarding and go-live. |
| P2 | Time picker | M3 | Shift start. Probably a Select in practice. |
| P2 | Popover | Base | Rarely; tooltips cover most cases. |
| P2 | Data table | Base, M3 | Not on phone. Use ListItem rows. |
| P2 | Drawer / Navigation rail | M3, Base | Not for a 360 dp phone with a bottom tab bar. Skip. |
| P2 | Breadcrumb, Tree view, Pagination | Base | Web components. Skip. |

**Revised core set: 30 → 46.** The 16 additions are the P0 and P1 rows above (Stepper already counted).

---

## 2. Foundations we are missing

Uber Base documents 18 foundations; we have three (colour, type, spacing/shape). What is missing, in order of urgency:

**Iconography.** *Decided 2026-09-07: Phosphor Icons only.* P1 says every state and every action carries an icon with exactly one meaning. The library is settled; what is missing is the weight rule and the meaning register. Asphalt and Base both publish one. This is the single largest foundation gap: without it "show first, then say" cannot be enforced. Deliverable: `foundations/icons.md` + an icon sheet in Figma with one semantic name per glyph, sizes 16–40, and the meaning written next to each.

**Indic typography.** *Decided 2026-09-07: Outfit only; Indic scripts fall back to the system face, with line height × 1.15.* Outfit is a Latin-only face. The app ships in Hindi, Kannada and Marathi. Today either the OS falls back silently (different face, different metrics per phone) or text is rendered in whatever the platform picks. A system that says "Outfit only" while serving three Indic scripts has an undefined type scale for most of its users. Decision needed: a companion family with Devanagari and Kannada coverage (Noto Sans Devanagari / Noto Sans Kannada are the safe choice; Baloo 2 / Baloo Tamma 2 pair better with Outfit's rounded geometry), with line-height adjustments per script in `tokens.json`. P9 depends on this.

**Sound and haptics.** No mature system documents this because none of them treats audio as a primary channel. We do (P4). Needs: a named sound family (new job, job starting, running late, shift end, payout, success, error, SOS), a haptic pattern per sound, rules for silent-mode override, and spoken-copy guidelines. Deliverable: `foundations/sound.md` + the assets.

**Motion.** Uber and M3 both publish duration and easing tokens. P8 sets ≤300 ms and reduced-motion; the celebration moment (P6) needs a defined curve. Deliverable: `duration.short/medium/long` and `easing.standard/emphasized` in `tokens.json`.

**Illustration.** *Decided 2026-09-07: two layers (flat illustration / metallic rewards) continuing the existing Snabbit Assets system — see `foundations/assets.md`.* Every system with a persona like ours (Asphalt especially) leans on illustration for empty states, permissions, onboarding and coachmarks. The Figma file has a handful of "Illustration – List Items" and a mascot in Avatars. Needs a style guide: line weight, palette from tokens, how the expert is depicted (adult, dignified, in uniform), and a library of the twenty scenes we will need.

**Content and voice.** Uber has "Voice and tone" and "Writing for components". We have a vocabulary table and copy rules scattered through the principles. Consolidate into `foundations/content.md`: voice, spoken vs written register, sentence patterns for each state, translation workflow, and per-language length budgets.

**Accessibility.** Base publishes it as a foundation. Ours is spread across P1, P3, P9. Consolidate: contrast targets (and the exception list — `textTertiary` fails on white), touch targets, font scaling behaviour, screen-reader labels, reduced motion. Short, but one place.

**Elevation.** Currently "flat, package-owned". Fine for 0.19.0; document the two exceptions (floating map controls, bottom sheet scrim) and stop.

**Data visualisation.** Base has it. We will need exactly two charts: earnings over time and progress toward a goal. Define them as components (bar strip, progress ring) rather than a foundation.

---

## 3. Patterns

Every mature system separates *components* from *patterns* (Base has a Patterns section; M3 documents them per component). Our audit found screen fragments living on the Components page because there was nowhere else to put them. Create `patterns/` and start with the ones the principles already name:

1. **New job alert** — the reference case in `PRINCIPLES.md`. Timer + Amount + Button + sound.
2. **Check-in / check-out** — selfie, location, time; the flow money depends on.
3. **Costly-action confirmation** — Dialog sheet with consequence shown; hold-to-confirm variant.
4. **Permission request** — Permission sheet → OS prompt → denied-state recovery.
5. **Offline** — banner, what still works, what is queued.
6. **Loading / empty / error** — the five-state rule made concrete per screen type (list, card, detail).
7. **First-run guidance** — Coachmarks + voice, when they appear, when they stop.
8. **Celebration** — the ≤1.5 s moment: sound, motion, copy, and what stays tappable.
9. **Earnings breakdown** — Amount + ListItem + Tabs; the trust screen.
10. **Bottom action bar** — the fixed primary action above the safe area (the "Bottom Sticky" frame).

---

## 4. Governance — what the case studies say

The Asphalt retrospective is blunt: *"Design systems aren't a design problem — they're an adoption problem."* Gojek reached 77k weekly component insertions across 20+ teams not by policing but by workshops, self-serve docs, design-system reviews before engineering handoff, and absorbing what teams built on their own into the system. Their "adoption is negotiated" is exactly our rule of three.

What we should add, that they and Base have and we do not:

- **Component status.** Every component shows Planned / Beta / Stable / Deprecated on its page. Engineers stop guessing which Figma frame is real.
- **Changelog.** One file, dated entries, what changed in tokens or a component and why. Base publishes one; ours becomes the record the acceptance checklist points at.
- **Lint.** Asphalt shipped lint plugins. For us: a detekt/ktlint rule in the app repo that fails on raw `Color(0x…)`, raw `.dp` outside the design-system layer, and `TextStyle(` outside the theme. This is how "tokens only" becomes enforceable rather than reviewed.
- **Design review before handoff.** A short step in `EXTENDING.md`: nothing Tier 3 reaches engineering without the brief and the ticked checklist.

---

## 5. What the low-literacy research adds

Microsoft Research's programme (700+ field hours, 570 participants, India among the sites; job-search, health and mobile banking apps) found that non-textual interfaces combining voice, video and graphics were strongly preferred and that first-time non-literate users could complete tasks with them. Two findings matter beyond "use icons":

**Transfer of learning is weak.** A pattern learned on one screen does not automatically carry to another. For us: consistency is not aesthetics, it is usability. The same icon, same place, same sound, every time — and Coachmarks with voice whenever something new appears. This also argues for a *smaller* core set used everywhere over a larger one used precisely.

**Hierarchical navigation is hard.** Nested menus and deep trees fail. For us: bottom tab bar with ≤5 destinations, at most two levels deep anywhere, no hamburger menu, no nested settings. Search and Select are flat lists, not trees.

They also validated **video** as a channel. A short "how-to clip" component — 10-second looping demonstration for a task step, with voice — would fit onboarding, go-live and the first check-in. Add as P1 alongside Coachmark.

---

## 6. Revised plan

**Core set: 46 components** (30 from the audit + 16 additions), built in this order: Button → IconButton → Tag/Badge → TextField → Checkbox/Radio/Switch → Chip → Amount → Timer → Toast/Snackbar → Banner (incl. Offline) → Dialog sheet → Permission sheet → Card/SelectionCard → ListItem → BottomSheet → HeaderNav/BottomTabBar → Tabs → Empty/Skeleton → Coachmark/Voice prompt → SOS → the rest.

**Foundations to add: 7** — icons, Indic type, sound & haptics, motion, illustration, content, accessibility.

**Patterns: 10** in `patterns/`, starting with the new-job alert.

**Governance: 4** — status, changelog, lint, review step.

Both blocking decisions are made (see `DECISIONS.md`): Outfit only with system fallback for Indic, and Phosphor Icons only. Next: the Phosphor meaning register in `foundations/icons.md`, then Button.

---

Sources: [Material Design 3 components](https://m3.material.io/components) · [Uber Base — components and foundations](https://designsystems.surf/design-systems/uber) · [Uber Base](https://base.uber.com/) · [Asphalt Aloha — components](https://asphalt.gojek.io/pages/components.html) · [Beyond Components — Scaling the Asphalt Design System](https://emje.vercel.app/posts/asphalt-dls) · [Microsoft Research — UIs for Low-Literate Users](https://www.microsoft.com/en-us/research/project/uis-low-literate-users/)
