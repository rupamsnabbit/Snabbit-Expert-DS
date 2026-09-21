# Changelog

One section per release, newest first; *Unreleased* on top. Sections inside: Tokens · Components · Foundations · Patterns · Decisions · Site. One line each, present tense, naming the file. How and when to write here: `GOVERNANCE.md` § 3–4.

## Unreleased

### Tokens
- Add `motion` (10 durations, 4 easings, reduced-motion rule) and `timeout` (14 waits) groups to `tokens.json`; summarised in `DESIGN_TOKENS.md` § Motion and timeouts.
- Extend `typography.indic`: fallback faces per platform, weight map, expansion factors (hi 1.2 · mr 1.25 · kn 1.35), `maxFontScale` 1.3, the three truncation sites.
- **0.20.0** — `interactiveAccept` (green.700 `#047857`) and `interactiveAcceptPressed` (green.800 `#065F46`), plus palette step `green.800`. The filled green of a job accept, landed for `projects/beauty-job-cycle` after the shipped *Beauty Expert Master* board was read. `textInverse` on it measures **5.5:1** — it passes AA at ButtonLg 16 SemiBold, unlike `primary · brand`.
- Proposed for 0.20.0 (not yet in `tokens.json`): `textSuccessStrong` / `textWarningStrong` / `textErrorStrong` / `textInfoStrong`; `iconSuccess` → green.600; `iconWarning` → yellow.600; `bgErrorStrong`, `bgReward`, `bgInfoSubtle`, `bgNeutralStrong`; `overlay.scrim`, `overlay.result`; `ButtonLg` size decision. See `foundations/accessibility.md` § Open.

### Components
- **Statement** (new, In app) — the two shipped earnings cards as one component: tinted band with headline amount and locked addition, scalloped edge, icon rows (signed, locked, with nested breakup, with asset count + caret), one divider, total, schedule panel with a **date tile**, footer band. `patterns/payout.md`'s statement re-shape is withdrawn; the built card is the spec.
- **HeroCard** (new, In app) — the filled two-part tracker header: label, Stat `L`, glyph small and as watermark; tones `streak` / `jobs` / `login` / `reward`; optional WeekStrip in the white bottom. Supersedes the Card `hero` kind.
- **WeekStrip** (new, In app) — a read-only week: `band` (one unbroken pill, breaks at a missed day) and `dots` (independent circles), reward markers above days. Distinct from DatePicker `strip`, which picks.
- **Withdrawn from core → `briefs/`:** ProductTile and QuantityStepper. Neither is in the app; both were invented from Mobbin for a project. Tier 3 until the rule of three says otherwise.
- DatePicker's standalone header gains the **week pager** form (‹ Week 1 · 01 Mar to 07 Mar ›).
- **RateTable** (new, In app) — the system's only table: `matrix` (tiers × day types) and `sum` (addends with + and =, banded total); ≤ 3 value columns, never scrolls, re-flows to rows at font scale 1.3. From the shipped Rate card.
- **BenefitTile** (new, In app) — icon disc + label, three across; `benefit` (ring) and `earn` (filled); locked tiles stay visible. From the shipped Tier and Coins screens. Shipped per-tile disc colours recorded as a P6 departure, kept.
- Card gains **`hero`**; Stepper gains **`progression`** (earned rail, `locked` allowed, reward-asset nodes); Accordion gains **`week`** with the shipped tier tint (kept — rewards may carry their colour); HowToClip gains **`story`** (the shipped 72 dp circle); DatePicker's month header is registered standalone as the **month pager**; ListItem gains a **current** (*you are here*) state. All In app 2026-09-22.
- Status lines re-marked for build cost: **QuantityStepper** is a genuine build request; **ProductTile** is an *avoidable* one (default to ListItem with an image leading); Button **`accept`** recorded as superseding the 2026-09-10 decision. The ListItem fill bar is now named as a **ProgressBar `S`** in the row, not a new primitive.
- **ProductTile** (new, `components/product-tile.md` + live page) — a picture of a thing she carries, how many of it, and its name; `read` / `incoming` / `task`. Core on its first pass because it replaces a text row on three screens at once (rule of three met at birth). The zero state **stays in the grid, greyed**, because removing a product she has run out of hides the only thing she has to act on.
- **ListItem `of-total` gains a fill bar** — the numerals stay and a 2 dp bar joins them. Never coloured: a red bar on a short pouch says she failed and a green one says a shortfall is fine; shortness is carried by **length**. Landed for `projects/beauty-shift-lifecycle` after the stakeholder's *"text heavy and like a bill"* feedback (2026-09-18).
- **Button gains a fourth tone, `accept`** (`components/button.md`) — filled green, `primary` only, and allowed **only where a `danger` action sits beside it in the same footer**. This is not the removed *Success* style: *Success* was green as decoration or as a result, while `accept` is one action told apart from its opposite without reading (P6, P3). A green button standing alone stays `primary · brand` — which is why *Check In* and *Complete Job* are pink on the same flow.
- All 49 core components specified with live pages (`components/*.md`, `site/components/*.html`): Button, IconButton, Tag, TextField, Checkbox · Radio · Switch, Amount, Timer, Banner · Toast · Snackbar, Chip, Avatar, Badge, Card, ListItem, SelectionCard, BottomSheet, HeaderNav, BottomTabBar, ProgressBar, Stepper, Coachmark, SOSControl, Accordion, DatePicker, EmptyState, Skeleton, VoicePrompt, Tabs, Nudge, NumericKeypad, PageIndicator, MediaCapture, MapMarker · MapSnippet, Stat · Rating · Divider, HowToClip, Tooltip, ProgressButton, Popover. Status: Proposed.
- Compositions: ShieldCard (Kavach) — ShieldRow, ShieldConsent, SafetyCheck; JobAlert — the reference case as one screen.
- Tooltip (`label` long-press name · `status` change at the Timer, tone computed), ProgressButton (`countdown` · `progress`, band from the left, brand only) and Popover (`actions` · `detail`, non-modal, three-site whitelist) reinstated as separate components (`DECISIONS.md` 2026-09-10); `coachmark.md` and `button.md` reconciliation lists updated; BENCHMARK P2 Popover closed.
- FAB folded into IconButton (`floating` = L circle at `elevation.floating`; shutter and recentre only).
- SelectionCard gains `hero` (image on top, radio or checkbox, ≤ 3 per group; 4:3; selected row takes the brand wash).
- HeaderNav: shipped bell restored at left; SOS rightmost as a deliberate change; Help (call) and Saathi (chat) are two actions; `state` variant for full-screen job states.
- BottomTabBar: shipped four tabs kept (Home · Earnings · Refer · Profile).
- Stepper gains `unordered`; NumericKeypad `otp` supports 3–6 boxes; Timer `countdown` for time left, `elapsed` for overtime; Amount sign icons unified with Stat (`arrow-up` / `arrow-down`).
- **Four core changes for `projects/beauty-shift-lifecycle`** (Beauty carries a kit and works an area, not a hotspot): MapMarker gains **`area`** — a filled, stroked region she may work anywhere inside, never dashed like a hotspot, with a Home-card row form; Stepper gains **`tracker`** — the rail for a process that advances *without her* (Placed → Packed → On the way → Delivered), no step numbers, no Button inside, always paired with a plain-language line; ListItem gains a **`quantity`** trailing — a count that is not money (*add 2*, *used 6 of 8*, *+17*), never coloured, never a bare digit; Amount gains **`charge`** — money she *spends* rather than loses, `textPrimary` with no sign and a required caption saying where it goes, because a purchase rendered in penalty red says she was fined.

### Foundations
- **Reuse before you invent** — `principles/EXTENDING.md` gains the section and a first step in the decision tree; `CLAUDE.md` gains the hard rule; `GOVERNANCE.md` § 1 gains the **In app** evidence mark. `references/shipped-app-2026-09-22/` registers seven live-app screens as a component map and outranks Figma as evidence (`references/SCREENS.md`).
- `foundations/icons.md` — **83** Phosphor meanings registered; `scissors`, `paint-brush`, `hand-soap`, `bandaids` added for the five Beauty pouches, because telling pouches apart by colour would be decorative colour (P6).
- `foundations/icons.md` — 77 Phosphor meanings registered (`clock-clockwise` for Tooltip; `tote`, `package`, `truck`, `polygon` for the Beauty kit and refill).
- `foundations/assets.md` — two layers (illustration / metallic rewards); `asset/picto/shield` proposed as the one domain-coloured pictogram.
- `foundations/assets.md` — 4 kit-and-refill pictograms (`bag`, `pouch`, `box`, `rest-day`), illustration layer; and the rule that **product images are catalogue content, not design-system assets** — the register holds the structure, the Category team owns the contents.
- `foundations/motion.md` — three rules, durations, easing, timeouts, where motion is not, reduced motion per kind.
- `foundations/type.md` — four scripts: fallback faces, ×1.15 table, English budgets / universal box, consolidated length table, wrapping, font scale 1.3, test strings.
- `foundations/accessibility.md` — every token pair measured; failing pairs named with fixes; targets, focus, screen reader, greyscale, sunlight, the seven-step test pass.
- `foundations/content.md` — the content guide: register, grammar, actions, states, number/time formats, spoken copy, how a string ships in four languages, vocabulary, the banned list, copy review checklist.
- Sound & haptics register parked (`ROADMAP.md`).

### Patterns
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
