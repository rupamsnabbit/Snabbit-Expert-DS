# Changelog

One section per release, newest first; *Unreleased* on top. Sections inside: Tokens · Components · Foundations · Patterns · Decisions · Site. One line each, present tense, naming the file. How and when to write here: `GOVERNANCE.md` § 3–4.

## Unreleased

### Tokens
- Add `motion` (10 durations, 4 easings, reduced-motion rule) and `timeout` (14 waits) groups to `tokens.json`; summarised in `DESIGN_TOKENS.md` § Motion and timeouts.
- Extend `typography.indic`: fallback faces per platform, weight map, expansion factors (hi 1.2 · mr 1.25 · kn 1.35), `maxFontScale` 1.3, the three truncation sites.
- Proposed for 0.20.0 (not yet in `tokens.json`): `textSuccessStrong` / `textWarningStrong` / `textErrorStrong` / `textInfoStrong`; `iconSuccess` → green.600; `iconWarning` → yellow.600; `bgErrorStrong`, `bgReward`, `bgInfoSubtle`, `bgNeutralStrong`; `overlay.scrim`, `overlay.result`; `ButtonLg` size decision. See `foundations/accessibility.md` § Open.

### Components
- All 49 core components specified with live pages (`components/*.md`, `site/components/*.html`): Button, IconButton, Tag, TextField, Checkbox · Radio · Switch, Amount, Timer, Banner · Toast · Snackbar, Chip, Avatar, Badge, Card, ListItem, SelectionCard, BottomSheet, HeaderNav, BottomTabBar, ProgressBar, Stepper, Coachmark, SOSControl, Accordion, DatePicker, EmptyState, Skeleton, VoicePrompt, Tabs, Nudge, NumericKeypad, PageIndicator, MediaCapture, MapMarker · MapSnippet, Stat · Rating · Divider, HowToClip, Tooltip, ProgressButton, Popover. Status: Proposed.
- Compositions: ShieldCard (Kavach) — ShieldRow, ShieldConsent, SafetyCheck; JobAlert — the reference case as one screen.
- Tooltip (`label` long-press name · `status` change at the Timer, tone computed), ProgressButton (`countdown` · `progress`, band from the left, brand only) and Popover (`actions` · `detail`, non-modal, three-site whitelist) reinstated as separate components (`DECISIONS.md` 2026-09-10); `coachmark.md` and `button.md` reconciliation lists updated; BENCHMARK P2 Popover closed.
- FAB folded into IconButton (`floating` = L circle at `elevation.floating`; shutter and recentre only).
- SelectionCard gains `hero` (image on top, radio or checkbox, ≤ 3 per group; 4:3; selected row takes the brand wash).
- HeaderNav: shipped bell restored at left; SOS rightmost as a deliberate change; Help (call) and Saathi (chat) are two actions; `state` variant for full-screen job states.
- BottomTabBar: shipped four tabs kept (Home · Earnings · Refer · Profile).
- Stepper gains `unordered`; NumericKeypad `otp` supports 3–6 boxes; Timer `countdown` for time left, `elapsed` for overtime; Amount sign icons unified with Stat (`arrow-up` / `arrow-down`).

### Foundations
- `foundations/icons.md` — 73 Phosphor meanings registered (`clock-clockwise` added for Tooltip); `first-aid-kit`, `users-three`, `baby`, `address-book`, `pencil-simple` added for the health-cover pattern (78).
- `foundations/assets.md` — two layers (illustration / metallic rewards); `asset/picto/shield` proposed as the one domain-coloured pictogram.
- `foundations/motion.md` — three rules, durations, easing, timeouts, where motion is not, reduced motion per kind.
- `foundations/type.md` — four scripts: fallback faces, ×1.15 table, English budgets / universal box, consolidated length table, wrapping, font scale 1.3, test strings.
- `foundations/accessibility.md` — every token pair measured; failing pairs named with fixes; targets, focus, screen reader, greyscale, sunlight, the seven-step test pass.
- `foundations/content.md` — the content guide: register, grammar, actions, states, number/time formats, spoken copy, how a string ships in four languages, vocabulary, the banned list, copy review checklist.
- Sound & haptics register parked (`ROADMAP.md`).

### Patterns
- `patterns/insurance.md` — **density pass after design review (2026-09-11):** four rules now stated in the pattern — one `Heading3` per screen, field/group names are `BodyMd` labels not headings, no body copy under a question (the VoicePrompt carries it), a fixed option set is a `tile` grid not a stack, and an answered question shrinks to a Chip. Relationship step goes from ~1400 dp of scroll to one 800 dp screen; roughly 100 words cut from screens 1–6.
- `briefs/insurance-relationship-picker.md` — rewritten: proposes **SelectionCard `tile`** (2-up grid, 158 × 104 fixed, pictogram 48 above a short label, no radio, selected = border + fill + check badge). Withdraws the earlier "8 in one column with a `labelled` Divider" proposal. Third use in this flow alone, so `tile` is a promotion candidate for `selection-card.md`.
- `references/mobbin-tile-pickers/` — Warby Parker · Strava · Afterpay · Lloyds; the read behind the `tile` variant.
- `patterns/insurance.md` — free health cover, rewritten 2026-09-11 against the confirmed insurer payload (no phone number, max 3 children, ₹5,00,000) and a reduce-the-steps brief: 4 screens + one per child, name and birthday on one screen, children question + count + list on one screen, review as a `confirm` sheet. Measured in interactions, not artboards (~61 → ~40; typed characters ~27 → ~10; digits from memory 10 → 0). Mobbin reads in `references/alan-add-family-member/`, `references/grab-driver-emergency-contact/`, `references/marcus-add-beneficiary/`. Drawn in Paper (*Snabbit* → **Insurance**, artboards 01–10).
- Ten patterns in `patterns/`: new job arrives · check in, work, check out · payout · onboarding and go-live · when something goes wrong · asking for permission · the first time she sees it · earnings · after SOS · offline.
- `PRINCIPLES.md` reference case corrected: Timer above the Button (pill ring), *Decline* as a ghost hold.

### Decisions
- **One project, one boundary.** Project work now lives in `projects/<slug>/` (`prd.md` — a PRD verbatim or an ask captured and confirmed in conversation · `SCOPE.md` · `TIERS.md` · `reads/`; template in `projects/_template/`). A project reads its own folder and the shared system, never another project's folder; gaps are *asks of core* landed in `tokens/`, `foundations/` or `components/`, so work travels between projects as a capability and never as copied content. `projects/ACTIVE` names the project in play and is read at the start of every session, so the boundary survives a new chat; it is re-read before every write, and a session that finds it naming a different project stops and asks rather than writing into the wrong folder. Procedure in `projects/README.md` and the `prd` skill; rules added to `CLAUDE.md`/`AGENTS.md`.
- See `DECISIONS.md`: assets two layers; light mode only; navigation (shipped tab bar, HeaderAction); header and Stepper corrections after the screen read; no FAB component.
- Open, awaiting the design lead: Kavach vs Shield as the user-facing name; primary Button label contrast (ButtonLg 18/24 recommended); token release 0.20; Telugu as a fifth script; Shield auto-start and the blue shield; HowToClip `guide`.

### Site
- Documentation site under `site/` built by `build_all.sh`: tokens page (with Motion & timeouts and the four-script sample), foundations, 39 component pages, 10 pattern pages, roadmap, benchmark, audit.
- `site/lint.py` — spec lint run by the build; first run found and fixed 55 errors. W1 now warns on the whole `content.md` § 9 banned list.
- `EXTENDING.md` § *Where inspiration comes from — Mobbin first*: search by flow, prefer worker-side apps, read three, save under `references/<app>-<flow>/`, internal only; mirrored in `CLAUDE.md` / `AGENTS.md`.
- Paper: the *Snabbit* Paper file carries the full token set (153 tokens) exported from `tokens.json`; `CLAUDE.md` / `AGENTS.md` gain a *Designing on Paper* section.
- `GOVERNANCE.md` — status lifecycle, review step, recording changes, releases, roles.
- `references/SCREENS.md` — the three screen files and the *When the screens change* procedure; *Self-Serve ER/AR* registered as the onboarding source.

## 0.19.0 — 2026-09-07

The starting point: `tokens/tokens.json` and `DESIGN_TOKENS.md` (colour, type, spacing, radius, border, elevation, icon, button, grid), `principles/PRINCIPLES.md` and `EXTENDING.md`, the Figma audit (204 frames) and benchmark, and the Button spec.
