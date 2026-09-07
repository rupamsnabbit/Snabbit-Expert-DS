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
