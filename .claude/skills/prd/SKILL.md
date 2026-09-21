---
name: prd
description: Start or continue a project, scoped to that project only. Use when the user hands over a PRD, product requirements or a feature ask; says "start a new project" or "new project" with no document; says "switch to <slug>" or "carry on" with project work; or names a folder in projects/. Also use at the start of any session that touches project work, to read projects/ACTIVE and resume. Runs intake (written PRD or an ask captured in conversation), the tier pass, the core-gap closure, the reference reads, the pattern and the publish — reading that one project's folder and the design system, never another project's.
---

# PRD → pattern, one project at a time

One PRD, one folder, one boundary. The system is shared; the ask is not.

## The rule that outranks everything else in this skill

**Read `projects/<slug>/` and the system. Never another project's folder.**

| May read | May not read |
| --- | --- |
| `projects/<slug>/**` | `projects/<other>/**` — any other PRD, read, tier table or scope |
| `tokens/`, `components/`, `foundations/`, `principles/` | |
| `patterns/` — flows already in the app | |
| `references/SCREENS.md` and the Figma screens it registers | |

A second PRD is a different ask from a different stakeholder. Reading it while building this one puts requirements nobody asked for into a spec and destroys the trace from every line back to the ask it came from. If something in another project seems relevant, the answer is never to open it: either it is already in the system, or it belongs in the system, and the path is *Step 3*.

The bar for every decision: **this PRD, `principles/`, `tokens/`.** Anything that traces to none of the three does not go in.

## Step 0 — Which project, and where it left off

Read `projects/ACTIVE` **first**, every time. It holds one slug, or `none`. That file is the memory a new chat does not have.

| `ACTIVE` says | Do |
| --- | --- |
| a slug, and the user said "carry on" or nothing in particular | that is the project; read its `SCOPE.md` — *Status* says which step is next, *Log* says what happened last. Resume there; do not restart a finished step. |
| a slug, and the user named a different project | confirm the switch, write the new slug to `ACTIVE`, and carry **nothing** across from the old one |
| `none` | ask which project before touching anything. Never guess from what is lying around in the working tree, from the git branch, or from the most recently edited file. |
| a slug for a folder that does not exist | say so and stop; do not create it silently |

### The guard — before writing anything

A session learns its project once, at Step 0. `projects/ACTIVE` can change afterwards, from another chat. So:

**Before every write to a project folder, and before every output made on that project's behalf, re-read `projects/ACTIVE`.**

| What you find | Do |
| --- | --- |
| it names the project this session is working on | carry on |
| it names a **different** project | **stop.** Write nothing. Say both names — "this chat has been working on `<a>`, but `projects/ACTIVE` now says `<b>`" — and ask which is right. |
| it says `none` | stop and ask, same as above |

Never resolve the disagreement yourself, and never rewrite `ACTIVE` to match what this session happens to believe. Another chat set that value deliberately; silently overwriting it is how two sessions write into each other's projects.

Once the user answers: if this session is right, write its slug to `ACTIVE` and carry on; if the other chat is right, stop project work here and say so. `ACTIVE` is only ever written when the user has just said which project is in play.

This is what makes it safe to go back to an older conversation and keep typing in it.

Starting a new project — with or without a document:

```bash
cp -r projects/_template projects/<slug> && echo "<slug>" > projects/ACTIVE
```

Add its row to the table at the bottom of `projects/README.md`.

Then read `principles/PRINCIPLES.md` in full and `principles/EXTENDING.md`, as `CLAUDE.md` requires.

One project per sitting. If the user asks for a second one mid-session, finish or park the first, update `ACTIVE`, and treat the second as a fresh start with none of the first in context.

---

## Step 1 — Intake

Two ways in. The rest of the skill is identical either way.

**A — a PRD arrived.** Put it in `projects/<slug>/prd.md` **verbatim** under header A. Do not edit the body: not the wording, not the structure, not the parts that are wrong. Disagreements become rows in `SCOPE.md` → *Open questions*, addressed to the stakeholder.

**B — no document; the ask came in conversation.** This is normal and needs no apology, but the ask still gets **written down before anything is designed**. Interview for what a PRD would have carried, in roughly this order:

1. What is being built, in one sentence, in the user's own words.
2. Who it is for and when they meet it — which moment in her day, before or after which existing flow.
3. What problem it solves, and what happens today instead.
4. What is in scope and, more usefully, what is explicitly out.
5. What is already decided and not up for design — a business rule, a legal field, a partner's fixed requirement.
6. What is still open.

Write it into `prd.md` under header B, **read it back, and get it confirmed** before Step 2. Once confirmed it is evidence: not edited afterwards, and everything built traces to it. An ask that stays in conversation drifts and cannot be checked against later — that file is the reason the boundary is worth anything.

Fill `SCOPE.md`: slug, PRD date and author, stakeholder, status `Intake`. Add the project's row to the table at the bottom of `projects/README.md`.

Then read the PRD once, end to end, and write two things into `SCOPE.md`:

- **Sits beside** — which existing `patterns/` flows this touches. Do this honestly and early. A new PRD is usually a **variant of a flow that already exists**, not a new flow: `patterns/check-in-out.md` is already a job cycle; *Shift* already has a meaning in the vocabulary table in `PRINCIPLES.md`. If the answer is "variant of", the output is a variant section in the existing pattern, not a second file that duplicates four of five screens.
- **Open questions** — every place the PRD is silent, contradictory, or assumes something about the expert that `PRINCIPLES.md` § Who we design for says is not true. Ask these before designing around them. Guessing is the expensive option.

Stop and put the open questions to the user before Step 2 if any of them change what gets built.

## Step 2 — Tier every surface

Fill `projects/<slug>/TIERS.md`: one row per surface the PRD asks for, in the PRD's own words, each placed in a tier per `EXTENDING.md`. No surface is skipped as obvious. The verdict column says *exists*, *needs brief* or *needs core change*.

Copy every gap into `SCOPE.md` → *Asks of core*. Status becomes `Tiered`.

Show the user the tier table before going further. This is the cheapest moment to be told the plan is wrong.

## Step 3 — Close the gaps on core, first

Every gap is a change to the **shared system**, made before the pattern is written, per `EXTENDING.md` → *Changing core*. A project never patches core privately; a fork is Tier 0.

In this order:

1. **Tokens** — propose per `tokens/DESIGN_TOKENS.md` → *Adding or changing a token*. Never a raw hex, never "just for this project".
2. **Icons** — register the meaning in `foundations/icons.md`, or the lint fails E3.
3. **Assets** — `foundations/assets.md`: illustration for informational, metallic 3D only for rewards, one asset one meaning.
4. **Core component changes** — spec, Figma and site page together, in one change, naming the project that asked.
5. **Tier 3 briefs** — `briefs/<slug>-<thing>.md` from the template at `EXTENDING.md` → *Brief template*.

Once landed, every other project has it too — including ones that have not started. That is the only way work travels between projects: as a **capability in the system**, never as content copied from a folder.

## Step 4 — Reference reads

Mobbin first, searched by *flow*, three apps minimum, worker-side apps preferred. Save each under `projects/<slug>/reads/<app>-<flow>/` with the screenshots in order and the six-step read from `EXTENDING.md`. Internal only — never published, never traced.

Nothing is drawn before step 4 of the read (tier named). Deliver step 6: reference and translation side by side, every difference stated as one sentence citing a principle.

## Step 5 — Write the pattern

`patterns/<flow>.md`, following the shape of `patterns/insurance.md`: the one rule for this flow, where it lives, the flow diagram, screen by screen with real strings, the five states, voice lines (P4), the word table, what changes from the shipped screens, open questions, and the ticked checklist for the flow. Name the tier at the top and link the reference read.

Copy follows `foundations/content.md`. Strings are real, in all four languages' worth of room. Never *OK*, *Submit*, *Continue*.

If Step 1 said *variant of*, this is a section inside the existing pattern instead — same rigour, no duplicate file.

**Before any artboard: `projects/<slug>/BUILD.md`.** One row per region of every screen — *Built from · Source ·
Inherits · Tried first* — sources in the fixed order shipped app → `patterns/` → `components/` → Mobbin → invention
(`CLAUDE.md` § Before you draw a screen). Read all three system sources first, every time, not from memory. A screen
drawn without its rows is Tier 0 and is redrawn; a Mobbin row without *Tried first* is rejected. Then draw in Paper
on the 360 × 800 baseline, tokens by variable only (`CLAUDE.md` → *Designing on Paper*). Screens that become evidence export to `references/<slug>-<screen>/` with a short `.md`.

## Step 6 — Publish and record

Add the pattern to `site/build_all.sh` **and** `site/nav.py`, then:

```bash
bash site/build_all.sh && python3 site/lint.py
```

Fix every ERROR (E1 raw hex · E2 off-scale ms · E3 unregistered icon · E4 missing spec section · E5 spec/template mismatch · E6 nav ↔ build mismatch · E7 stale page) and the copy warnings. Never hand-edit a generated `site/*.html`.

Then: a line in `CHANGELOG.md` § Unreleased, the row in `ROADMAP.md`, status per `GOVERNANCE.md` (Proposed → Reconciled → Stable), and a dated entry in `DECISIONS.md` for anything contested — especially a departure from a shipped screen, which must cite a principle.

Close out `SCOPE.md`: fill *Answers with*, update Status, add the session to the Log, and update the project's row in `projects/README.md`.

**Update `SCOPE.md` → *Log* at the end of every working session, not only at the end of the project.** It is what the next chat reads to know where things stand. When the project is finished, set `projects/ACTIVE` back to `none`.

---

## Running two projects at once

Sequence them; do not interleave. Land the shared core changes from both tier passes first — that is one upgraded system, not two — then finish one project end to end, then the other. The second consumes what the first built. Where the same Tier 3 component is reached for by a third feature, the rule of three promotes it to core.

At no point does either project read the other's folder.
