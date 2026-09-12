# Screen files — what ships, and how to read them

Two Figma files hold the **real screens** of the Expert app. They are the evidence for "what ships today" in every spec, and the primary source for `patterns/`. They are read-only for this repository and are never a second source of truth: they supply structure and evidence; `tokens/` and `principles/` supply expression. Where a spec deliberately departs from a shipped screen, the spec says so in its *What changes* table.

## Files

| File | Key | Read these pages only | Skip |
| --- | --- | --- | --- |
| **Expert App 2.0** (master) | `Q0YzzdKk21ayyKHjvCGPzM` | `FINAL ONBOARDING` (14537:42610) · `📝 Onboarding (ER - training)` (0:1) · `📍 Training` (110:3666) · `🏁 Go live` (1067:4218) · `🍔 Lunch Selection` (28714:63473) · `WIP - Payout I` (3406:12122) | Everything else (Archive, V2, UAT, Page 30/33, Design System page — the DS lives in `QjXqQZVAqLoRmH1j7foH1I`) |
| **Shift – Job Lifecycle DS** | `WEUPV9q19eAqRbkZSBj6OY` | `Job Lifecycle` (0:1) · `Shift Lifecycle` (28:18373) | UAT, BRANDING |
| **Self-Serve ER/AR** (onboarding, latest — added 2026-09-08) | `HqmnjmxhZvyvZxmIaVMCrB` | `Final` (0:1): sections *TC Less house help* · *TC house help* · *TC Less house cook* · *Bank/UPI* · *Post Onboarding* · *Step 5 - Insurance* (`664:86380`, added 2026-09-11 — 7 frames, 5 unique screens; read in `references/insurance-flow-current.md`, translated in `patterns/insurance.md`) | — · **Supersedes** `FINAL ONBOARDING` in the master file for onboarding evidence; the master file's onboarding pages are now older iterations |

## Telling shipped from proposed

- In the Lifecycle file, each page has a section named **"Final Designs DS Compatible"** — that is the shipped/latest state. "FOR ANY SCREEN REFERENCE", "Section 2" and dated sections (*Not moving towards the job_May 20*) are working copies and older iterations.
- In the master file, `FINAL ONBOARDING` holds a numbered flow `1Login … 20Finished` — treat the numbered frames as the latest; unnumbered `Frame` copies and *WIP* sections are iterations.
- Frames are **393 × 852** (iPhone 15 canvas). The system's grid is 360 × 800; measure spacing, not absolute widths.
- Older screens are recognisable by a solid pink header with a hamburger, Help/SOS text pills and a dark navy palette; these are superseded.

## What the screens showed on first read (2026-09-08)

Confirmed by the screens:

- Four-tab bar Home · Earnings · Refer · Profile with the pink pill indicator and the ₹4000 promo on Refer — matches `bottom-tab-bar.md`.
- Timer digits sit **above** the primary Button with a small caps label (*ACCEPT IN · 1:23*) — matches `timer.md`; the ring-pill form (*TIME LEFT 48:23*) is used for the in-job countdown — matches Timer `L`.
- Earnings breakdown accordion with a tinted *Check in by 7:45 PM* row — matches `accordion.md` (`conditional` row).
- Per-item **speaker** (*Listen*) on the customer address; a **voice bar** (play ▸, progress, speaker) at the top of every onboarding screen — this is the Voice prompt, not yet specified; it is the next P0.
- Loading = Button with spinner and lightened fill — matches `button.md` loading state.
- Stepper list on *Training confirmed* (Steps 1–5, *Completed* / *Step n*) — matches `stepper.md` `list`, **except** the copy says *Complete them in any order*, while the spec assumes strict order. Resolved: Stepper now has an `unordered` mode.
- Nudge strip on Home: *Login by 6:40 AM → 3 coins* — matches the Nudge shape in the DS file; to be specified with the job-alert pattern.
- Action trio Map / Call / Share as stacked icon + label tiles — same shape as `HeaderAction`; consider naming it once (`ActionTile`) and using it in both places.

Conflicts found on first read — **decided 2026-09-08** (see `DECISIONS.md`): bell restored at left, SOS rightmost as a deliberate P7 change, Help (call) and Saathi (chat) are two actions, HeaderNav `state` variant added, Stepper `unordered` mode added. The `1Login` screen is still to be confirmed as shipped or older.

| Where | Shipped screen | Current spec | Options |
| --- | --- | --- | --- |
| Home header | Bell with badge **left**; right cluster **SOS · Saathi · coins (30)**; no red cards; no greeting; no wordmark | Wordmark left; cluster **coins · red cards · Saathi · SOS** (SOS rightmost) | Keep P7 rule (SOS rightmost everywhere) as a deliberate change, or follow shipped order; restore the bell |
| In-job header | **Help** (headset) + **SOS**, top right; SOS rightmost | SOS only; Help removed as a duplicate of Saathi | Help and Saathi may be two things (call trainer vs chat). Define both, or merge |
| In-job title | **Centred** with a leading icon (*✓ Check In*, *🧴 New Job*, *⏱ Job In Progress*), no back | Left-aligned beside back | Allow a centred `state` variant for full-screen job states only |
| Onboarding `1Login` | Navy palette, non-Outfit type, native keypad | Tokens: pink brand, Outfit | Likely an older or OS-level screen — confirm before treating as shipped |
| Stepper | *Complete them in any order* | Strict order | Add `ordered: false` (no locked state, every row tappable) |

## When the screens change

They will — every quarter, sometimes every sprint. The system is built so that this is normal rather than a crisis:

1. **Screens are evidence, not source.** A spec cites the shipped screen in its *What changes* table and departs from it with a principle. When a new screen file arrives, the citation is updated (file key, frame id, date); the *rule* in the spec changes only if the new screen shows something the principle did not anticipate. Most screen changes are re-arrangements of the same parts and change nothing in the system.
2. **Register the file here first.** Add the row above (key, pages/sections, what it supersedes), note the date, then re-read only the specs and patterns whose evidence it replaces. Old files stay listed as *superseded* so a citation in an older spec still resolves.
3. **Three outcomes per component**, recorded in `DECISIONS.md` when it is a decision: *confirmed* (the new screen matches the spec — move the component towards **Reconciled**), *spec updated* (the screen taught the system something — change the rule and say why), *screen flagged* (the screen departs from a principle — the spec stays and the departure goes to the Figma reconciliation list for the designer).
4. **Patterns absorb flow changes; components absorb look changes.** A new onboarding order edits `patterns/onboarding.md`; a new button shape edits `button.md` and every pattern inherits it. Nothing is edited in two places.
5. **Nothing is Stable until it ships from the package.** While screens keep moving, statuses stay *Proposed* / *Reconciled*; the changelog (`ROADMAP.md`, and a `CHANGELOG.md` once governance is set up) records each re-read with the file key and date.

## How to use these files in a spec

1. Before writing a spec, find the component in a **Final Designs DS Compatible** section (or numbered FINAL ONBOARDING frame) and screenshot it.
2. Add a *Shipped today* column to the *What changes* table when shipped and DS-file differ.
3. If the spec departs from the shipped screen, say why in one sentence and cite the principle.
4. Never copy raw values from a screen; map them to tokens and flag drift.
