# Scope — <Project name>

The contract for this project. Filled at intake, kept current as the work runs. Read it before touching anything in this folder.

| | |
| --- | --- |
| Slug | `<vertical>-<flow>` |
| PRD | `prd.md` — received `<YYYY-MM-DD>` from `<name, team>` |
| Stakeholder | `<who answers questions about the ask>` |
| Status | Intake · Tiered · Core gaps open · Pattern drafted · Reconciled · Stable |

## Boundary

This project reads **its own folder** and **the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`, `references/SCREENS.md`). It does not read any other project's folder. Every decision traces to this PRD, the principles, or the tokens — nothing else.

## Answers with

The outputs that graduate to the shared system. Fill in as they land.

| Output | Path | Status |
| --- | --- | --- |
| Pattern | `patterns/<flow>.md` | — |
| Brief | `briefs/<slug>-<thing>.md` | — |
| Screens | `references/<slug>-<screen>/` | — |

## Asks of core

Everything this PRD needs that the system does not have yet. Nothing here is solved privately inside this folder — each row is a change to the shared system, made per `principles/EXTENDING.md` → *Changing core*, and available to every other project once landed.

| Ask | Kind | Why this PRD needs it | Where it lands | Status |
| --- | --- | --- | --- | --- |
| | token · icon · asset · component change · new core component | | `tokens/tokens.json` · `foundations/icons.md` · `components/<name>.md` | proposed · landed |

## Sits beside

Flows already in `patterns/` that this one touches, follows or is a variant of. Named at intake, because a new PRD is usually a variant of a flow that already exists — and a second file duplicating four of five screens is how the system rots.

| Existing pattern | Relationship |
| --- | --- |
| `patterns/<name>.md` | variant of · runs before · runs after · unrelated |

## Open questions

For the stakeholder, not for the designer to guess. One line each, dated, with the answer when it arrives.

| Question | Asked | Answer |
| --- | --- | --- |
| | | |

## Log

One line per working session: what was decided and what it changed. This is the audit trail from "someone asked for this" to "this is why the component works that way".

| Date | What happened |
| --- | --- |
| | |
