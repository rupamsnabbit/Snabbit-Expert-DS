# Decisions

Design decisions that constrain everything downstream. One entry each, dated, with the consequence spelled out. Reverse a decision by adding a new entry, not by editing the old one.

## 2026-09-07 — Outfit is the only type family

**Decision.** Compose/KMP uses Outfit for all text. No companion or second family is added, including for Indic scripts.

**Consequence.** Outfit covers Latin and numerals only. Hindi, Marathi (Devanagari) and Kannada glyphs render in the platform's system fallback face, which differs by device. To keep layouts safe: any container that may hold those scripts uses the type scale's line height × 1.15, text wraps and never truncates, and every text component is reviewed in all four languages at large font size (P9). Numerals stay Latin (₹1,250) so amounts always render in Outfit.

**Revisit if.** Field feedback shows Indic text clipping or looking inconsistent enough to hurt trust; or the design-system package adds a bundled Indic face.

## 2026-09-07 — Phosphor Icons only

**Decision.** All icons come from Phosphor Icons. No other set, no custom glyphs, no emoji used as icons.

**Weights.** `regular` is the default. `fill` marks selected/active state (tab bar, selection cards, toggled controls) so state is carried by shape as well as colour (P1). `bold` only for deliberate emphasis. `thin`, `light` and `duotone` are not used.

**Consequence.** The iconography foundation reduces to a meaning register: one Phosphor icon name → one meaning in the Expert app, in `foundations/icons.md`. An icon not in the register is not used until it is added. The Figma library's icon frames (Icons Group, Icons_Karma Bonus, Pay Summary – Icons, Lock, Smileys, SNABBIT COIN) are reviewed against Phosphor; anything that is not a Phosphor glyph becomes an illustration asset or is replaced.

**Revisit if.** A required meaning has no Phosphor glyph after a real search; then propose an illustration, not a custom icon.

## 2026-09-07 — Assets: two layers, continuing the existing illustration system

**Decision.** Assets follow the system built by Snabbit's previous visual designer (*Snabbit Assets* Figma file). Two layers: **illustration** — flat vector with soft gradient shading, pink stage, pink/purple/yellow palette — for scenes, status pictograms, characters and faces; **reward** — metallic 3D hexagons, discs and cards — only for badges, tiers, bonuses, coins and penalty cards. *Supersedes the earlier same-day note that everything should be soft 3D, which was made before the assets file was reviewed.*

**Consequence.** "If it shines, it's earned" is a rule the expert learns without text: nothing informational is glossy, nothing earned is flat. Assets are registered like icons in `foundations/assets.md` by class (scene, picto, character, reward, face, state), made from a six-asset reference sheet with per-class style prompts, and checked against the layer's style lock. The gold coin and red card marked "old" are deprecated in favour of the pink Snabbit coin. All assets move to an Assets page in the design-system file.

**Revisit if.** A new asset class appears that fits neither layer; then add a layer here, do not blur the two.

## 2026-09-07 — Light mode only, for now

**Decision.** Tokens define light mode. No dark values are invented.

**Consequence.** Semantic names are mode-ready; a dark mapping is a later token task, not a per-screen decision.

## 2026-09-07 — Navigation: keep the shipped four-tab bar and the labelled home actions

**Decision.** The bottom tab bar stays **Home · Earnings · Refer · Profile**, as the live app ships it, with the pink pill indicator; icons become Phosphor (`spray-bottle`, `currency-inr`, `users`, `user-circle`). Rewards and Saathi are **not** tabs. The Home header keeps the shipped *disc + label pill* item (now the `HeaderAction` sub-component) with a fixed set and order — coins · red cards · Saathi · SOS — and drops Help, bell and ≡. The greeting moves from the header into the content. *Supersedes the first HeaderNav / BottomTabBar drafts, which proposed a five-tab bar (with Rewards and Saathi) and unlabelled chips + bell in the header — written before the shipped bar had been reviewed.*

**Consequence.** Experts relearn nothing: the map they know is the map. The system gains one small component (`HeaderAction`), one governed badge kind (`promo`, Refer only, live bonus only), and a rule that SOS is always the rightmost labelled action on Home and every in-job screen.

**Revisit if.** Rewards outgrows the header (tier, coins, streaks, contests in one place) — then it becomes the only permitted fifth tab.

## 2026-09-08 — No FAB component

**Decision.** The system has no floating action button. A floating control is an IconButton `L` `circle` at `elevation.floating`, and exactly two exist: the camera shutter (MediaCapture) and recentre on the taller arrival map. No extended FAB, no `+` / *New* action, at most one per screen.

**Consequence.** Benchmark row *Floating action button* is closed against IconButton; `elevation.floating` stays the only control shadow. The expert never creates content, so the M3 FAB's purpose does not exist in this app; a labelled floating action is a Button in the bottom action bar (P2).

**Revisit if.** A pannable map with more than one control ships (zoom, layers) — then a `MapControls` composition, still built from IconButtons.

## 2026-09-08 — Read the shipped screens; four header/stepper corrections

**Decision.** The two screen files (*Expert App 2.0*, *Shift – Job Lifecycle DS*; pages listed in `references/SCREENS.md`) are the evidence for "what ships today" in every spec. Read against them: the Home header keeps the shipped **bell at left**; the action cluster is coins · (red cards) · Saathi · **SOS rightmost** — the one deliberate change from shipped (P7: SOS in the same place on Home and in-job). **Help** (headset) and **Saathi** (chat) are two different actions: Help is a call and appears on job screens beside SOS; Saathi is the chat and appears on Home. HeaderNav gains a **`state`** variant — centred icon + title, no back — for full-screen job states only. Stepper gains an **`unordered`** mode for independent steps (*complete them in any order*), matching the shipped Training screen.

**Consequence.** Every future spec starts from a screenshot of the shipped form and records it in its *What changes* table; a departure from shipped must cite a principle. `references/SCREENS.md` says which pages and sections count as shipped.

**Revisit if.** The shipped app moves SOS to the right on Home — then the P7 rule is simply met and the note above can go.

## 2026-09-09 — *Nominee* leaves the interface

**Decision.** The word **nominee** never appears on a screen, in a voice line, or in a translation. The question the app asks is *Who should get the money?* and the answer is a relationship and a name, chosen from pictogram cards. *Nominee* stays in the API payload, the insurer's forms and the specs' margins. The same rule is applied to *hospitalisation*, *cashless treatment*, *dependents* and *coverage amount* — see the vocabulary table in `PRINCIPLES.md`.

**Consequence.** The insurance flow (`patterns/insurance.md`) is rebuilt as one question per screen, answered by picture and voice: eight relationship pictogram cards in two labelled groups, a contacts picker for the name and number (the insurer accepts Latin characters only, which she does not read — so the app never asks her to proofread one; a TTS read-back speaks it instead), the DatePicker `month` for both birth dates, children added to a list rather than counted, and a review screen that reads every card aloud before submit. Twelve new pictograms are registered in `foundations/assets.md`. `SelectionCard`'s "≤ 5 cards in a group" gains a documented exception for a fixed outside list (`briefs/insurance-relationship-picker.md`). The confirmation screen loses its metallic starburst — insurance is not earned, so it is not the reward layer.

**Revisit if.** Field testing shows experts already use and understand a local word for nominee (some hub trainers may have taught one) — then that word, not the English one, is what goes on screen.
