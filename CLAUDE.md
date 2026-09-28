# Snabbit Expert Design System — agent instructions

This repository is the **mobile design system** for the Snabbit Expert app (Compose Multiplatform, Android + iOS). It is not the app; it holds tokens, principles, component specs and the documentation site that is generated from them. Anything you produce here — a spec, a component, a screen mockup, a translation of a reference — must follow the files below. They are binding, in this order of precedence: the user's explicit instruction → `principles/` → `tokens/` → this file.

## Read before doing anything

1. `principles/PRINCIPLES.md` — who the expert is, the nine principles, the new-job reference case, the 16-row component acceptance checklist, the vocabulary. **Read in full on every task that touches UI.**
2. `principles/EXTENDING.md` — the three tiers, the rule of three, and the **reference read** procedure for screenshots and inspiration. **Read whenever the user shares a screenshot, a Mobbin/Pinterest/Dribbble link, says "something like this", or asks not to stick strictly to the system.**
3. `tokens/tokens.json` — the machine-readable source of truth for colour, type, spacing, radius, border, elevation, icon, button and grid values. `tokens/DESIGN_TOKENS.md` is the human-readable contract of the same values.
4. `components/*.md` — one spec per core component (anatomy, states, tokens, behaviour, checks). Read the spec of any component you use or change.

## Hard rules

- **Build from the system, and prove it before you draw.** No screen is drawn — in Paper, Figma or code — until its **build plan** exists: every region of the screen mapped to the system component it is built from, in this order of sources and no other: shipped app → `patterns/` → `components/` → Mobbin → invention. See *Before you draw a screen* below. A screen without a plan is Tier 0.
- **Tokens only.** No raw hex, dp, sp, radius or shadow in anything you produce. Every value is a semantic token name from `tokens/tokens.json` (`textPrimary`, `spacing.5`, `radius.lg`, `ButtonLg`). Palette names (`pink600`) only while proposing a new semantic token.
- **Light mode only** for now. Do not invent dark-mode values.
- **Outfit** is the only type family. Sizes and line heights come from the type scale; nothing else. Indic scripts fall back to the system face — never add a second family; use line height × 1.15 where Hindi/Marathi/Kannada may appear.
- **Phosphor Icons only.** No other icon set, no custom glyphs, no emoji as icons. Weight `regular` by default, `fill` for selected/active, `bold` for emphasis only; never `thin`, `light`, `duotone`. Look up the icon's meaning in `foundations/icons.md` before using it; if the meaning is not registered, propose it there.
- **Assets are two layers and registered.** Illustration (flat vector, soft shading, pink stage) for scenes, pictograms, characters, faces; metallic 3D only for rewards (badges, tiers, coins, red cards). Check `foundations/assets.md` before creating or placing one; one asset, one meaning; use the class's style prompt and the reference sheet; never make an informational asset glossy or a reward flat. Source archive: Figma *Snabbit Assets* (`QhbyjXwWU3rukCUuDcLuRD`).
- **Tier every piece of UI** as Core / Composition / Local per `EXTENDING.md`, and say which. Never produce Tier 0 (a detached, hand-styled, unnamed thing).
- **One project, one boundary.** Project work lives in `projects/<slug>/` — the PRD verbatim, its reference reads, its tier table, its scope contract. While building a project, read **that project's folder and the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`); **never another project's folder**. Another project's ask is a different ask from a different stakeholder, not context. Every decision traces to this project's ask, the principles or the tokens. Work travels between projects only as a capability landed in the shared system — never as content copied from another project. **Read `projects/ACTIVE` before any project work** — it names the one project in play, and is how a new session knows where it is; if it says `none`, ask. A project may start without a PRD: capture the ask into `prd.md` and get it confirmed before designing. See `projects/README.md`; run it with the `prd` skill.
- **Translate, don't transplant.** A reference supplies ideas (structure, order, interaction); the system supplies expression (tokens, components, voice). "Don't stick strictly to the design system" means *run the reference read and translate*, never *restyle the screenshot*.
- **Principles pass.** Anything with a state, an action or text runs the acceptance checklist in `PRINCIPLES.md`. Cite principle numbers when you make or request a change (*"P3: decline is adjacent to accept"*).
- **Vocabulary.** Expert (not worker/runner/helper), Job, Shift, Check in/out, Earnings, Payout, Tier, Streak, SOS, Shield, Hub. See the table in `PRINCIPLES.md`.
- **Copy** follows `foundations/content.md`: warm, specific, sentence case, one idea per line, numbers first, designed to fit Hindi, Kannada and Marathi at large font size. Actions are verbs (*Accept job*), never *OK / Submit / Continue*; the § 9 banned list is enforced by the lint.
- **Show, don't tell — words are the last medium.** Picture → shape → icon → number → word, in that order (P1 · *Text is the last medium*). One instruction line per task screen; a sequence of steps is a sequence of screens, never a numbered list of sentences; a rule about what to avoid goes into the picture or the voice line, not a caption; context she already has is not repeated on a step screen. Say only what is new to her or what she could get wrong — she does this job every day, and explaining more is talking down to her, not being kind. A placeholder illustration is *described* (what it must show), never compensated for with text. Understanding the persona is not the same as writing it onto the screen: the persona tells you what to leave out.

## When the user shares a screenshot or reference

Do the six-step reference read in `principles/EXTENDING.md` and deliver step 6 (reference and translation side by side, every difference stated as one sentence). Save the screenshot and the read to `references/` with a short `.md`. Do not start drawing or coding before step 4 (tier named).

**Mobbin is source four of five** (*Before you draw a screen*, below): it is reached only for a region the shipped app, `patterns/` and `components/` cannot build, and the plan row says what was tried. When it is reached, **Mobbin is the preferred source of inspiration** (`EXTENDING.md` § Where inspiration comes from): it shows shipped flows with their states, which is the standard of evidence this system holds. Search Mobbin by *flow* (onboarding, check-in, earnings, payout, referral, permissions, offline), prefer worker-side and low-literacy-audience apps, read three apps' versions before translating, save the flow and its read under `references/<app>-<flow>/` (internal only — never published, never traced), then translate. Pinterest and Dribbble are for mood only; nothing structural is borrowed from a screen that never shipped.

## Projects — one project, one boundary

An ask — a PRD, or a conversation that starts "let's build X" — becomes a project in `projects/<slug>/` (`cp -r projects/_template projects/<slug> && echo "<slug>" > projects/ACTIVE`) holding `prd.md` (the ask, written down once and never edited afterwards — disagreements go to *Open questions*), **`BUILD.md`** (the build plan — every region of every screen mapped to the component it is built from, written before drawing), `SCOPE.md` (the contract: boundary, answers with, asks of core, sits beside, open questions, log), `TIERS.md` (every surface placed in a tier before anything is drawn) and `reads/` (that project's reference reads).

**A new session starts by reading `projects/ACTIVE`** — one slug, or `none`. That file, not the conversation, is what makes the boundary survive a new chat: it says which project is in play, and `SCOPE.md` → *Status* and *Log* say what was done last and what is next. Never infer the project from the git branch, from recently edited files, or from what happens to be open. Switching is explicit ("switch to `<slug>`"), carries nothing across, and rewrites `ACTIVE`. One project per sitting.

**The guard.** `ACTIVE` can change from another chat while an older conversation is still being typed in. So before every write to a project folder, re-read `projects/ACTIVE`: if it names a different project than the session has been working on, **stop, write nothing, name both, and ask which is right** — never resolve it silently, and never rewrite `ACTIVE` to match what the session believes. `ACTIVE` is written only when the user has just said which project is in play.

**A project does not need a PRD to exist.** "Let's start a new project" is a valid start: create the folder, set `ACTIVE`, then capture the ask into `prd.md` in the detail a PRD would carry — what, for whom, what problem, in and out of scope, already decided, still open — read it back, get it confirmed, and only then design. Once confirmed it is evidence and is not edited. An ask that stays in conversation drifts and cannot be checked against later.

The project folder is a **workspace**, not a second library. Working files stay in it; finished outputs graduate to the shared system — `patterns/<flow>.md`, `briefs/<slug>-<thing>.md`, changes to `components/`, `tokens/`, `foundations/` — because the expert uses one app and the app has one pattern library.

Projects never read each other. They meet in exactly one place: the system. When a project needs something core does not have, that is an *ask of core*, made per `EXTENDING.md` → *Changing core* and named in `SCOPE.md`; once landed, every project has it, including ones not started. Solving it privately inside the project folder is a fork, and a fork is Tier 0.

A new ask is usually a **variant of a flow that already exists**, not a new flow — `patterns/check-in-out.md` is already a job cycle, and *Shift* already has a meaning in the vocabulary table. Name the relationship in `SCOPE.md` → *Sits beside* at intake. A second pattern file that duplicates four of five screens is how the system rots.

Two projects at once: land the shared core changes from both tier passes first, then finish one end to end, then the other. Sequence, do not interleave.

## Repository layout

```
tokens/         DESIGN_TOKENS.md (contract) · tokens.json (source of truth)
principles/     PRINCIPLES.md · EXTENDING.md
components/     one spec per core component (button.md, …); each has a live page site/components/<name>.template.html
projects/       one folder per project — prd.md (the ask: a PRD verbatim, or captured in conversation) · SCOPE.md (contract, asks of core, log) · TIERS.md · reads/; ACTIVE names the project in play; `_template/` to copy
briefs/         Tier 3 / change-to-core briefs (template in EXTENDING.md)
patterns/       one flow per file (new-job-alert.md, …); each has a page site/pattern-<name>.html built by build_doc.py
references/     SCREENS.md (the two screen files: which pages, shipped vs proposed, open conflicts) · reference screenshots + their reads
foundations/    icons.md (Phosphor meaning register) · assets.md (illustration style lock + register) · motion.md (durations, easing, timeouts, reduced motion) · type.md (four scripts: fallback faces, ×1.15, budgets, wrapping, font scale) · accessibility.md (measured contrast, targets, focus, screen reader, test pass) · content.md (voice, grammar, actions, states, formats, spoken copy, four-language process, vocabulary, banned words)
DECISIONS.md    dated design decisions and their consequences
GOVERNANCE.md   status lifecycle (Proposed → Reconciled → Stable), review step, how changes are recorded, releases
CHANGELOG.md    one section per release, Unreleased on top — a line for anything that changes what a designer or engineer must do
ROADMAP.md      what is done and what is left (components, foundations, patterns, governance) — update in the same commit as the work
audit/          FIGMA_AUDIT.md — tier classification of every Figma frame · BENCHMARK.md — gaps vs M3/Base/Asphalt · frames.json
site/           generated documentation site
  build.py               tokens.json + template.html → index.html
  build_doc.py           any markdown → page in site chrome (principles.html, benchmark.html)
  build_audit.py         audit/frames.json + classification → audit.html + FIGMA_AUDIT.md
  lint.py                spec lint (tokens, motion, icons, sections, pairing, nav, staleness)
  index.html · principles.html · benchmark.html · audit.html · template.html
```

## Commands

```bash
bash site/build_all.sh   # rebuild every page: tokens, docs, components, audit — ends with the lint report
python3 site/lint.py     # spec lint alone; exit 1 on errors (raw hex, off-scale ms, unregistered icons, missing sections, stale pages)
```

`build_all.sh` runs `site/build.py` (tokens.json → index.html + site/components/*.html), `site/build_doc.py` for each markdown doc, and `site/build_audit.py`. Add new docs/components to `build_all.sh` **and** to the site nav in `site/nav.py`.

Status changes, reviews and releases follow `GOVERNANCE.md`; behaviour changes get a line in `CHANGELOG.md` § Unreleased. Regenerate the site in the same change as the source you edited. Never hand-edit a generated `site/*.html`. **Run `python3 site/lint.py` before committing** and fix every ERROR: E1 raw hex · E2 millisecond not on the motion/timeout scale · E3 Phosphor icon not registered in `foundations/icons.md` · E4 spec missing *What changes* / *Accessibility* / *Figma reconciliation* / checklist · E5 spec without a template (or the reverse) · E6 nav ↔ build mismatch · E7 generated page older than its source. Warnings (banned copy such as *OK / Submit / Continue / Oops*) are to be fixed too unless the line is quoting what *not* to write.

## Before you draw a screen — the build plan

Tech has low bandwidth and the system is large. Both facts point the same way: **read the system first, build from it,
and write down what each part is built from before the first artboard.** This is a gate, not advice.

**1. Read, in this order, every time.** `references/shipped-app-*/` (the live app, region by region) → `patterns/`
(the flows already designed) → `components/` (every kind, state and slot). Not the ones you remember — all of them.
Most of what a new screen needs already exists under a name you have not searched for: a ledger is a `Statement`, a
tracker header is a `HeroCard`, a week is a `WeekStrip`, a money row is a `ListItem` with `Amount S`.

**2. Write `projects/<slug>/BUILD.md` before drawing.** One row per region of each screen:

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1 · order line | `Statement` row | `components/statement.md` § Anatomy | 48 dp row · label BodyLg · description BodyMd secondary · signed Amount M trailing · space between rows, one Divider before the total | — |
| A2 · pouch row | `ListItem` `selection` + `current` | `components/list-item.md` | — | — |
| C1 · split bar | *none — Mobbin* | `references/mobbin-…` | `ProgressBar S` track and radius | `ProgressBar` (one segment only) · `Statement` band (no split) |

- **Built from** names a component and its kind, or the shipped screen. *Composition* is allowed only when every part inside it is named.
- **Source** is a file in this repository. Mobbin appears in this column only when the three system sources are exhausted **and** *Tried first* says which components were tried and why each failed.
- **Inherits** is the partial-reuse column, and it is the one this rule exists for. **When no whole component fits, the region still takes the nearest component's anatomy** — row height, type roles, spacing, the amount format, the divider rule — and names it here. A new row that ignores `Statement`'s 48 dp and `BodyLg`/`BodyMd` pairing because it "isn't a statement" is the failure this column prevents.
- **Tried first** is empty only when *Built from* is a system component.

**3. Only then draw.** The plan is the checklist for the review: a drawn region with no row, or a row whose source is
Mobbin with an empty *Tried first*, is rejected as Tier 0 regardless of how it looks. Draw the pictures, shapes and
numbers first and the words last.

**4. Then take words away.** Before a screen is shown to anyone, run P1's delete-a-line check: remove each line of
text in turn, and any line whose loss costs her nothing — because the picture, the Timer, the icon or the number
already says it, or because she already knows it — stays removed. More than one instruction line, or a numbered list
of instructions, means the screen is really several screens. A first draft that is "too explanatory" has failed this
step, not the persona.

**Why the step and not the instinct.** The Beauty setup-photo screen (2026-09-28,
`references/setup-photo-text-vs-visual-2026-09-28/`) was drawn with a title, a heading, two numbered instruction
lines, a caption rule, a customer card, a Kavach banner and nine product rows on one scroll — every line was true and
the persona was understood, and it still read like explaining to a child. The shipped flow says the same with a setup
scene, a Timer ring, one line and one Button per screen: arrange → camera → saving → started.

**Why the file and not the memory.** The Beauty inventory ledger (September 2026) was drawn with a new tile grid and
a new two-segment bar while `patterns/payout.md` already described the ledger as a statement and the app already
shipped the statement card. The designer had read those files once. A plan row saying *Built from: Statement* would
have taken thirty seconds and saved a sprint.

## Designing on Paper

The design lead draws in **Paper** (the desktop app), not in a prototype. The Paper file *Snabbit* (team *Rupam's Team*) carries the full token set exported from `tokens/tokens.json` on 2026-09-10 — 153 tokens named `--color-text-primary`, `--text-body-lg`, `--leading-body-lg`, `--spacing-5`, `--radius-lg`, `--spacing-border-thin`, `--spacing-elevation-floating`, `--container-content`, and so on, each with its DS description. When drawing or editing in Paper:

- **Tokens by variable, always.** Every colour, size, line height, spacing and radius is `var(--…)` from the file's token set. A raw hex or px in a Paper design is the same violation as in a spec. Palette steps (`--color-pink-300`) only while proposing a new semantic token; illustration accents (`--color-illustration-yellow`) only inside illustration assets.
- **Components before compositions.** Draw a control as the spec draws it (`components/<name>.md` anatomy, sizes, states) before arranging it. A screen is a Tier 2 composition of core components on the 360 × 800 baseline (`--container-screen`, content `--container-content`, margin `--spacing-5`); anything that is not a core component is Tier 3 and gets a brief in `briefs/` (`principles/EXTENDING.md`).
- **Mobbin, Pinterest, Dribbble, screenshots:** Mobbin first (shipped flows, states); run the six-step reference read in `EXTENDING.md` first and translate — structure, order and interaction may be borrowed; colours, faces, radii, shadows and copy may not. Off-palette colour is not a style choice here: for a low-literacy user colour is a language (P6). A campaign or celebration surface that needs more than the palette proposes a token, it does not paste a hex.
- **Type in Paper** is size + line height + weight; the Indic rule (line height × 1.15) is applied by picking the next leading up when a container holds Hindi, Marathi or Kannada. Weights are 400 / 500 / 600 only; no letter-spacing; no caps.
- **Keep the token set in sync.** When `tokens.json` changes (a release per `GOVERNANCE.md` § 4), re-export to Paper the same day and note it in `CHANGELOG.md` § Site. The Paper file is a consumer of the tokens, never a source.
- **Copy** on any Paper screen follows `foundations/content.md` — real strings from the specs, never lorem ipsum, never `OK` / `Submit` / `Continue`.
- Screens that become evidence for a spec are exported as PNG into `references/` with a short `.md`, like any other reference.

Nothing in this repository is a prototype and none of it needs to be: the live pages under `site/` exist so engineers and reviewers can see behaviour; the visual source of truth for a new screen is the Paper file, and the spec is what makes it buildable.

## Publishing

The site deploys to GitHub Pages from `main` via `.github/workflows/pages.yml` (builds `site/` and publishes it). That is the canonical URL. Do **not** publish per-component artifacts on claude.ai — one link per component clutters the gallery; the site is the library.

## Figma

Design file: *Expert App — Design System 2.O* (`QjXqQZVAqLoRmH1j7foH1I`), Components page `1:3886`. **Screen files** (what actually ships): *Expert App 2.0* (`Q0YzzdKk21ayyKHjvCGPzM`), *Shift – Job Lifecycle DS* (`WEUPV9q19eAqRbkZSBj6OY`) and, for onboarding, *Self-Serve ER/AR* (`HqmnjmxhZvyvZxmIaVMCrB`, supersedes FINAL ONBOARDING) — read only the pages listed in `references/SCREENS.md`, and treat only "Final Designs DS Compatible" sections and numbered FINAL ONBOARDING frames as shipped. Screen files change often; when a new one arrives, register it in `references/SCREENS.md` first and follow its *When the screens change* procedure. Before specifying a component, screenshot its shipped form and record it in the spec's *What changes* table; a departure from the shipped screen must cite a principle. Figma is the visual source; this repository is the spec and reference implementation. Read from Figma freely; do not write to it unless the user asks. Figma variables are currently palette-level (`Pink/color-primary-600`) — map them to the semantic tokens in `tokens.json`, and flag drift when Figma and tokens disagree.

## Working style

- Prefer prose and tables in specs; keep bullets for rules and checklists.
- Every new component gets: spec in `components/<name>.md` (follow `button.md` as the template: what changes from Figma, anatomy, variants, sizes, states, content, placement, accessibility, sound, do/don't, Figma reconciliation, ticked checklist), a live page `site/components/<name>.template.html` rendered from tokens with Phosphor icons inlined, and a status: Proposed → Reconciled (Figma matches) → Stable (package ships it).
- Do not claim a check passed unless you ran it. Say when you didn't.
- When a rule here conflicts with the app repo's own `CLAUDE.md`, this file governs design decisions and that file governs code conventions.
