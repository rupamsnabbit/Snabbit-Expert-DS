# Snabbit Expert Design System — agent instructions

> Identical to `CLAUDE.md`. Cursor, Codex and other tools read this file; Claude reads `CLAUDE.md`. Edit both together.

This repository is the **mobile design system** for the Snabbit Expert app (Compose Multiplatform, Android + iOS). It is not the app; it holds tokens, principles, component specs and the documentation site that is generated from them. Anything you produce here — a spec, a component, a screen mockup, a translation of a reference — must follow the files below. They are binding, in this order of precedence: the user's explicit instruction → `principles/` → `tokens/` → this file.

## Read before doing anything

1. `principles/PRINCIPLES.md` — who the expert is, the nine principles, the new-job reference case, the 16-row component acceptance checklist, the vocabulary. **Read in full on every task that touches UI.**
2. `principles/EXTENDING.md` — the three tiers, the rule of three, and the **reference read** procedure for screenshots and inspiration. **Read whenever the user shares a screenshot, a Mobbin/Pinterest/Dribbble link, says "something like this", or asks not to stick strictly to the system.**
3. `tokens/tokens.json` — the machine-readable source of truth for colour, type, spacing, radius, border, elevation, icon, button and grid values. `tokens/DESIGN_TOKENS.md` is the human-readable contract of the same values.
4. `components/*.md` — one spec per core component (anatomy, states, tokens, behaviour, checks). Read the spec of any component you use or change.

## Hard rules

- **Tokens only.** No raw hex, dp, sp, radius or shadow in anything you produce. Every value is a semantic token name from `tokens/tokens.json` (`textPrimary`, `spacing.5`, `radius.lg`, `ButtonLg`). Palette names (`pink600`) only while proposing a new semantic token.
- **Light mode only** for now. Do not invent dark-mode values.
- **Outfit** is the only type family. Sizes and line heights come from the type scale; nothing else. Indic scripts fall back to the system face — never add a second family; use line height × 1.15 where Hindi/Marathi/Kannada may appear.
- **Phosphor Icons only.** No other icon set, no custom glyphs, no emoji as icons. Weight `regular` by default, `fill` for selected/active, `bold` for emphasis only; never `thin`, `light`, `duotone`. Look up the icon's meaning in `foundations/icons.md` before using it; if the meaning is not registered, propose it there.
- **Assets are two layers and registered.** Illustration (flat vector, soft shading, pink stage) for scenes, pictograms, characters, faces; metallic 3D only for rewards (badges, tiers, coins, red cards). Check `foundations/assets.md` before creating or placing one; one asset, one meaning; use the class's style prompt and the reference sheet; never make an informational asset glossy or a reward flat. Source archive: Figma *Snabbit Assets* (`QhbyjXwWU3rukCUuDcLuRD`).
- **Tier every piece of UI** as Core / Composition / Local per `EXTENDING.md`, and say which. Never produce Tier 0 (a detached, hand-styled, unnamed thing).
- **Translate, don't transplant.** A reference supplies ideas (structure, order, interaction); the system supplies expression (tokens, components, voice). "Don't stick strictly to the design system" means *run the reference read and translate*, never *restyle the screenshot*.
- **Principles pass.** Anything with a state, an action or text runs the acceptance checklist in `PRINCIPLES.md`. Cite principle numbers when you make or request a change (*"P3: decline is adjacent to accept"*).
- **Vocabulary.** Expert (not worker/runner/helper), Job, Shift, Check in/out, Earnings, Payout, Tier, Streak, SOS, Shield, Hub. See the table in `PRINCIPLES.md`.
- **Copy** is warm, specific, sentence case, one idea per line, and designed to fit Hindi, Kannada and Marathi at large font size. Actions are verbs (*Accept job*), never *OK / Submit / Continue*.

## When the user shares a screenshot or reference

Do the six-step reference read in `principles/EXTENDING.md` and deliver step 6 (reference and translation side by side, every difference stated as one sentence). Save the screenshot and the read to `references/` with a short `.md`. Do not start drawing or coding before step 4 (tier named).

## Repository layout

```
tokens/         DESIGN_TOKENS.md (contract) · tokens.json (source of truth)
principles/     PRINCIPLES.md · EXTENDING.md
components/     one spec per core component (button.md, …); each has a live page site/components/<name>.template.html
briefs/         Tier 3 / change-to-core briefs (template in EXTENDING.md)
patterns/       one flow per file (new-job-alert.md, …); each has a page site/pattern-<name>.html built by build_doc.py
references/     SCREENS.md (the two screen files: which pages, shipped vs proposed, open conflicts) · reference screenshots + their reads
foundations/    icons.md (Phosphor meaning register) · assets.md (illustration style lock + register) · motion.md (durations, easing, timeouts, reduced motion) · type.md (four scripts: fallback faces, ×1.15, budgets, wrapping, font scale) · accessibility.md (measured contrast, targets, focus, screen reader, test pass)
DECISIONS.md    dated design decisions and their consequences
ROADMAP.md      what is done and what is left (components, foundations, patterns, governance) — update in the same commit as the work
audit/          FIGMA_AUDIT.md — tier classification of every Figma frame · BENCHMARK.md — gaps vs M3/Base/Asphalt · frames.json
site/           generated documentation site
  build.py               tokens.json + template.html → index.html
  build_doc.py           any markdown → page in site chrome (principles.html, benchmark.html)
  build_audit.py         audit/frames.json + classification → audit.html + FIGMA_AUDIT.md
  index.html · principles.html · benchmark.html · audit.html · template.html
```

## Commands

```bash
bash site/build_all.sh   # rebuild every page: tokens, docs, components, audit
```

`build_all.sh` runs `site/build.py` (tokens.json → index.html + site/components/*.html), `site/build_doc.py` for each markdown doc, and `site/build_audit.py`. Add new docs/components to `build_all.sh` **and** to the site nav in `site/nav.py`.

Regenerate the site in the same change as the source you edited. Never hand-edit a generated `site/*.html`.

## Publishing

The site deploys to GitHub Pages from `main` via `.github/workflows/pages.yml` (builds `site/` and publishes it). That is the canonical URL. Do **not** publish per-component artifacts on claude.ai — one link per component clutters the gallery; the site is the library.

## Figma

Design file: *Expert App — Design System 2.O* (`QjXqQZVAqLoRmH1j7foH1I`), Components page `1:3886`. **Screen files** (what actually ships): *Expert App 2.0* (`Q0YzzdKk21ayyKHjvCGPzM`) and *Shift – Job Lifecycle DS* (`WEUPV9q19eAqRbkZSBj6OY`) — read only the pages listed in `references/SCREENS.md`, and treat only "Final Designs DS Compatible" sections and numbered FINAL ONBOARDING frames as shipped. Before specifying a component, screenshot its shipped form and record it in the spec's *What changes* table; a departure from the shipped screen must cite a principle. Figma is the visual source; this repository is the spec and reference implementation. Read from Figma freely; do not write to it unless the user asks. Figma variables are currently palette-level (`Pink/color-primary-600`) — map them to the semantic tokens in `tokens.json`, and flag drift when Figma and tokens disagree.

## Working style

- Prefer prose and tables in specs; keep bullets for rules and checklists.
- Every new component gets: spec in `components/<name>.md` (follow `button.md` as the template: what changes from Figma, anatomy, variants, sizes, states, content, placement, accessibility, sound, do/don't, Figma reconciliation, ticked checklist), a live page `site/components/<name>.template.html` rendered from tokens with Phosphor icons inlined, and a status: Proposed → Reconciled (Figma matches) → Stable (package ships it).
- Do not claim a check passed unless you ran it. Say when you didn't.
- When a rule here conflicts with the app repo's own `CLAUDE.md`, this file governs design decisions and that file governs code conventions.
