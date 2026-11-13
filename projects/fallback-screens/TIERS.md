# Tiers — <Project name>

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). This is the step that turns an ask into a plan, and it is where the gaps in the system become visible.

## Surfaces

| # | Surface (PRD's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | | 1 core · 2 composition · 3 local · core change | | exists · needs brief · needs core change |

- **Tier 1 — core**: a system component, used as-is. If it does not fit, that is information about the component — raise a core change, do not work around it.
- **Tier 2 — composition**: an arrangement of core components and tokens. Most new things are this. No approval needed.
- **Tier 3 — local**: genuinely new and not a composition. Needs a brief in `briefs/`, tokens only, namespaced, passes the checklist.
- **Tier 0**: not allowed. A detached, hand-styled, unnamed thing.

## Gaps

Everything the verdict column marked as missing, copied into `SCOPE.md` → *Asks of core* and closed **there** — in the shared system — before the pattern is written. A project never patches core privately.

| Gap | Kind | Blocks |
| --- | --- | --- |
| | token · icon · asset · component change | surface # |

## Checks

- [ ] Every surface in the PRD appears in the table above — none skipped as "obvious"
- [ ] Every Tier 3 row has a brief, or a line saying why it is not needed yet
- [ ] Every gap is an ask of core, not a local fix
- [ ] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [ ] Nothing in this table came from another project's PRD
