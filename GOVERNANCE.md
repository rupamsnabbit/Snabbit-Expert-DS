# Governance — how the system changes

The system has 46 core components, 2 compositions, 6 foundations and 10 patterns, all **Proposed**. This page is how a page stops being proposed: what evidence moves it to **Reconciled** and **Stable**, who reviews what, how a change is recorded, and how the lint keeps the rules honest. It is short on purpose; the process should cost less than the work.

---

## 1. Status lifecycle

Every component spec carries one status line. It moves in one direction and never skips a step.

| Status | Means | Evidence required to enter | Who confirms |
| --- | --- | --- | --- |
| **Proposed** | The spec and live page exist; the checklist is ticked by the author | Spec, template, lint clean, ROADMAP row | Author |
| **Reconciled** | Figma matches the spec: the *Figma reconciliation* list is done and the shipped screens use the instances | The Figma component's node id in the status line; every item in the reconciliation list ticked; a screenshot of the Figma variants saved in `references/reconciled/<name>.png` | Design lead (Rupam) |
| **Stable** | The package ships it and the app uses it | Package version in the status line; the component's Compose name resolves in the app repo; checklist rows 15–16 (copy heard aloud in four languages; device review with experts) ticked with the date | Design lead + one engineer |
| **Deprecated** | Superseded; the status line names the replacement and the last version | DECISIONS.md entry | Design lead |

Rules: a status change is its own commit (*"Button → Reconciled"*) with the evidence in the same commit; a Stable component's spec can still change, but the change goes through §3 and the status drops to Reconciled until the package catches up; a Reconciled component whose Figma drifts drops back to Proposed at the next screen re-read (`references/SCREENS.md` § When the screens change).

Status line format (the lint reads it):

```
Status: **Reconciled** · Figma `1:4020` · Tier: Core · Package: `SnabbitButton` · …
Status: **Stable** · Figma `1:4020` · Package: `SnabbitButton` 0.20.0 · reviewed 2026-10-02 · …
```

**Reconciliation order.** Not alphabetical — by what unblocks the most screens: Button → HeaderNav → BottomTabBar → Card → ListItem → Amount → Timer → Tag → BottomSheet → SelectionCard → the rest. The first ten make the job alert, the job screen and Home reconcilable end to end.

---

## 2. Review — the design-review step

`principles/EXTENDING.md` defines the tiers and the brief; this is the review that goes with them.

| Change | Review | Time |
| --- | --- | --- |
| Tier 2 composition inside a feature | None before merge; the author pastes the ticked checklist in the PR. Design lead spot-checks weekly | 0 |
| Tier 3 local component | Brief in `briefs/` (template in EXTENDING.md) reviewed by the design lead **before** build; the brief answers *why not existing*; third use triggers promotion | ≤ 2 days |
| Change to a core component | A brief marked *change to core*, plus: the spec diff, the live page updated, the lint clean, the *What changes* table's *Why* naming the principle. Reviewed by the design lead; if it changes a token, also by the engineer who owns `tokens.json` | ≤ 1 week |
| New token | Proposed in the spec's *Token proposals* first; promoted in a token release (§4) — never added ad hoc | Per release |
| New icon meaning / asset | A row in `icons.md` / `assets.md` in the same PR as the first use; the lint blocks unregistered icons | 0 |
| Pattern change | The pattern page updated with the shipped-screen citation and the *Why*; DECISIONS.md if a rule changed | ≤ 1 week |
| Principle change | A DECISIONS.md entry with *Revisit if*; the design lead and a founder | Rare |

What a review checks, in order: **is it a system part or a new thing** (tier named) · **does it depart from a principle, and does it say why** · **tokens only, lint clean** · **four languages at 1.3** · **the checklist is ticked honestly** (row 15–16 pending is fine; a row ticked without the check having been run is not).

Review happens in the PR (GitHub) or, for a Figma-only change, as a comment on the frame naming the spec section. Either way the outcome lands in the repo: a spec change, a DECISIONS entry, or a *screen flagged* note in `references/SCREENS.md`.

---

## 3. Recording a change

- **Spec change** → edit the spec and its template; rebuild; lint; one commit with a message that names the component and the change (*"Timer: elapsed mode is for overtime; time left is a countdown"*).
- **Decision** (a rule, a trade-off, anything someone will ask "why" about later) → `DECISIONS.md` entry: date · decision · consequence · *revisit if*. Written the day it is decided.
- **Screen file change** → `references/SCREENS.md` first, then the re-read per its procedure.
- **Anything that changes what a designer or engineer must do differently** → a line in `CHANGELOG.md` (§4).
- `ROADMAP.md` counts and to-do lists are updated in the same commit as the work, never after.

The commit message is the primary record; `CHANGELOG.md` is the human summary; `DECISIONS.md` is the *why*. Nothing is recorded in three places when one will do — a routine spec fix is a commit; a rule change is a commit plus a decision.

---

## 4. Changelog and releases

`CHANGELOG.md` has one section per **release** and an *Unreleased* section at the top. A release is a tag on this repo (`v0.20.0`) and, when tokens change, a matching package version. Sections: *Tokens* · *Components* · *Foundations* · *Patterns* · *Decisions* · *Site*. One line each, present tense, naming the file.

Token releases follow semver on `tokens.json`: adding a token is minor; renaming or removing is major and needs a DECISIONS entry and a migration note; changing a value is minor if it stays within the same role (a darker `iconSuccess`) and major if it changes what a role means.

The next release is **0.20.0** and its content is already known (`foundations/accessibility.md` § Open): `text*Strong` × 4, `iconSuccess` → green.600, `iconWarning` → yellow.600, `bgErrorStrong`, `bgReward`, `bgInfoSubtle`, `bgNeutralStrong`, `overlay.scrim`, `overlay.result`, plus the decision on `ButtonLg` size — and the motion / timeout / typography.indic groups added in this cycle.

---

## 5. The lint as governance

`site/lint.py` is the part of this page that runs itself. It fails a commit for: raw hex · off-scale milliseconds · unregistered icons · a spec missing *What changes*, *Accessibility*, *Figma reconciliation* or the checklist · a spec without a live page · nav ↔ build mismatch · a generated page older than its source · **a status line that claims Reconciled or Stable without its evidence** (Figma id, package version). It warns on banned copy. `build_all.sh` runs it; CI should run it on every PR (`python3 site/lint.py`, exit 1 on error).

---

## 6. Roles

- **Design lead** — owns principles, tokens' *meaning*, statuses, reviews Tier 3 and core changes, reads new screen files.
- **Engineer owning the package** — owns `tokens.json` values and the package version; confirms Stable.
- **Any contributor** — may propose: a spec, a token in *Token proposals*, an icon row, a brief. Proposals are cheap; promotion is reviewed.
- **Experts** (the users) — the last reviewers: rows 15–16 exist so nothing becomes Stable without them.

---

## Checklist — is the system governed?

- [ ] Every component spec has a status line the lint accepts.
- [ ] `CHANGELOG.md` has an *Unreleased* section that is not empty when the last commit changed behaviour.
- [ ] Every decision someone asked "why" about in the last month is in `DECISIONS.md`.
- [ ] The reconciliation order's first ten are Reconciled before any Tier 3 brief is approved.
- [ ] CI runs the lint.
