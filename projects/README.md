# Projects

One PRD, one folder, one boundary.

A **project** is a product ask and everything produced in answer to it: the PRD as received, the reference reads, the tier table, the open questions, the screens. It lives in `projects/<slug>/` and nothing else in the repository needs to know it exists.

A **system** is what every project is built from: `tokens/`, `components/`, `foundations/`, `principles/`. One copy, shared by everyone.

The whole point of this folder is the line between those two. Two projects can run at the same time, on the same design system, without either one bleeding into the other.

---

## The isolation rule

**When building a project, read that project's folder and the system. Nothing else.**

| May read | May not read |
| --- | --- |
| `projects/<this-slug>/**` — its PRD, its reads, its tier table | `projects/<any-other-slug>/**` — another project's PRD, reads or decisions |
| `tokens/`, `components/`, `foundations/`, `principles/` — the system | |
| `patterns/` — flows already shipped in the app, which this flow must sit beside | |
| `references/SCREENS.md` and the Figma screens it registers | |

A second PRD is not context. It is a different ask, from a different stakeholder, with different constraints and possibly a different answer. Reading it while building this one is how a requirement nobody asked for ends up in a spec — and how a reviewer loses the ability to trace any line back to the ask it came from.

The bar for every decision in a project is: **this PRD, the principles, the tokens.** If a decision cannot be traced to one of those three, it does not belong in the project.

---

## The one crossing point

Projects do not read each other. They meet in exactly one place: **the system**.

```
  system  ──────────────►  project A        every project reads core
     ▲                     project B
     │
     └── change request ── project A        every project may propose a change to core
```

When a project needs something core does not have — a token, an icon meaning, an asset, a state on an existing component — it does **not** solve it privately inside its folder. That is a fork, and a fork is Tier 0 (`principles/EXTENDING.md`). It raises the change against the system:

1. Write it in the project's `SCOPE.md` → *Asks of core*.
2. Make the change in `tokens/`, `foundations/` or `components/` per `EXTENDING.md` → *Changing core*, naming the project that asked.
3. Regenerate the site, run the lint, record it in `CHANGELOG.md`.

The change is now in the system, which means every other project gets it — including ones that have not started. That is what "one design system, used everywhere" means in practice, and it is the only way work travels between projects. It travels as a **capability**, never as content.

Where the same Tier 3 component is needed by a third feature, the rule of three promotes it to core (`EXTENDING.md`). Again: through the system, not by copying another project's file.

---

---

## The active project — how a new chat knows where it is

A rule agreed in one conversation dies with that conversation. The boundary is written down instead, in `projects/ACTIVE`: one slug, or `none`.

Every session reads that file before doing any project work — it is a hard rule in `CLAUDE.md`. So a fresh chat that opens with *"carry on"* knows which project it is in, which folder it may read, and which folders it may not. `SCOPE.md` → *Log* and *Status* tell it what was done last and what is next.

| You say | What happens |
| --- | --- |
| "start a new project" | a folder is created, `ACTIVE` set to it, and the ask is captured |
| "switch to `<slug>`" | `ACTIVE` changes; nothing from the previous project carries over |
| "carry on" in a new chat | `ACTIVE` is read, then that project's `SCOPE.md` — work resumes where the log ended |
| `ACTIVE` says `none` | the session asks which project before touching anything |

Switching is always explicit. A session never guesses the project from what is lying around in the working tree, and never works on two in one sitting.

---

## Starting without a PRD

Most projects will not arrive with a document. *"Let's start a new project"* is a perfectly good start — the boundary does not depend on a PRD existing, only on the project existing.

What changes is the first step: instead of pasting a document into `prd.md`, the ask is **captured** into it in conversation, in the same detail a PRD would carry — what is being built, for whom, what problem it solves, what is in and out of scope, what is already decided, what is still open — and then read back and confirmed before anything is designed.

Once confirmed, that file is evidence and behaves exactly like a PRD: it is not edited, everything built traces back to it, and no other project's ask may be read while building against it. An unwritten ask drifts and cannot be checked against later; a written one is the whole reason the boundary holds.

## What a project owns, and what it graduates

A project folder is a **workspace**, not a second library. Its working files stay inside it for good; its finished outputs graduate into the shared system, because the expert uses one app and the app has one pattern library.

| Stays in `projects/<slug>/` | Graduates to the system |
| --- | --- |
| `prd.md` — the ask, verbatim | `patterns/<flow>.md` — the flow spec, built into the site |
| `reads/` — reference reads for this project | `briefs/<slug>-<thing>.md` — Tier 3 briefs |
| `TIERS.md` — surface-by-surface tier table and gap list | changes to `components/`, `tokens/`, `foundations/` |
| `SCOPE.md` — the contract and the running log | a line in `CHANGELOG.md`, a row in `ROADMAP.md` |

`SCOPE.md` records both columns, so a year later the path from "someone asked for this" to "this is why the Timer has segments" is one file long.

---

## Starting a project

```bash
cp -r projects/_template projects/<slug> && echo "<slug>" > projects/ACTIVE
```

Then fill `prd.md` — with the PRD as received, or with the ask captured and confirmed in conversation — and run `/prd <slug>` — the skill in `.claude/skills/prd/` that walks intake → tier → close the gaps on core → write the pattern → publish, scoped to that one project.

Slugs are `<vertical>-<flow>`: `beauty-shift-cycle`, `beauty-job-cycle`. One PRD per folder. A revised PRD is a new version inside the same folder, never a new project.

---

## Projects

| Project | PRD received | Status | Answers with |
| --- | --- | --- | --- |
| _none yet_ | | | |
