# Tiers — <Project name>

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). This is the step that turns an ask into a plan, and it is where the gaps in the system become visible.

## Surfaces

| # | Surface (PRD's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | | 1 core · 2 composition · 3 local · core change | | exists · needs brief · needs core change |
| F1 | Filters on the hoods page — a chip that holds the chosen hood / hours / start and opens its list (2026-10-13) | core change | Chip, new kind `select`: Chip anatomy + trailing `caret-down`, selected look when the value differs from her ask | needs core change — `SCOPE.md` → Asks of core |
| F2 | The hood / hours / start sheets | 1 core | BottomSheet `select` (single, closes on pick, search above 8) with Radio rows; Amount on the hours rows | exists |
| F3 | The hoods page with the filter strip (D1) and the re-answered state (R1) | 2 composition | HeaderNav · Chip row · SelectionCard hood cards · Saathi dock · Button | exists |
| F4 | D3 · three inline Chip `filter` rows | 2 composition | Chip `filter` × 3 rows, current-value default | exists |
| F5 | D4 · one *Narrow it down* sheet from a header funnel; applied filters as removable chips | 2 composition · icon | BottomSheet (form shell) · Chip `filter` wrapping · Chip `removable` · Badge · HeaderAction `funnel` | needs icon — `funnel` not registered |
| F6 | D5 · hood list screen, then that hood's times | 2 composition | ListItem `navigational` · TextField search · Chip `filter` · SelectionCard | exists |
| F7 | D6 · filter bar in the footer | core change | the same Chip `select` as F1, docked bottom | needs core change (F1) |
| G1 | Guide cards Place · Time · Expert ID on N1–N4 and F3 (redrawn 2026-10-13) | 3 local | Local card: picture + label/value, corner pattern under a gradient mask, aligned fan; SelectionCard `tile` type roles | needs brief + tokens + icon/asset registration — `SCOPE.md` → Asks of core |
| F8 | D7 · hours and start as dial tiles | 2 composition | SelectionCard `tile` with the registered dial pictograms | exists |

- **Tier 1 — core**: a system component, used as-is. If it does not fit, that is information about the component — raise a core change, do not work around it.
- **Tier 2 — composition**: an arrangement of core components and tokens. Most new things are this. No approval needed.
- **Tier 3 — local**: genuinely new and not a composition. Needs a brief in `briefs/`, tokens only, namespaced, passes the checklist.
- **Tier 0**: not allowed. A detached, hand-styled, unnamed thing.

## Gaps

Everything the verdict column marked as missing, copied into `SCOPE.md` → *Asks of core* and closed **there** — in the shared system — before the pattern is written. A project never patches core privately.

| Gap | Kind | Blocks |
| --- | --- | --- |
| | token · icon · asset · component change | surface # |
| Chip kind `select` — a chip that shows its value and opens a `select` sheet | component change | F1, F3 |
| `caret-down` meaning extended: *opens the choices for this value* (today: expand / collapse on Accordion) | icon | F1 |
| `funnel` — *narrow a list* (HeaderAction that opens the filters sheet) | icon | F5 |
| Guide-card hues: sky · lime · violet (+ teal, orange as Expert ID alternatives) as palette steps and three semantic pairs | token | G1 |
| Expert ID glyph: `identification-badge` for *a friend's expert ID* (replaces `users-three` for this meaning) | icon | G1 |
| Three guide pictograms — map, clock with the shift span, ID badge | asset | G1 |

## Checks

- [ ] Every surface in the PRD appears in the table above — none skipped as "obvious"
- [ ] Every Tier 3 row has a brief, or a line saying why it is not needed yet
- [ ] Every gap is an ask of core, not a local fix
- [ ] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [ ] Nothing in this table came from another project's PRD
