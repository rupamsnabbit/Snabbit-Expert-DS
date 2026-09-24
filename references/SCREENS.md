# Screen files — what ships, and how to read them

Two Figma files hold the **real screens** of the Expert app. They are the evidence for "what ships today" in every spec, and the primary source for `patterns/`. They are read-only for this repository and are never a second source of truth: they supply structure and evidence; `tokens/` and `principles/` supply expression. Where a spec deliberately departs from a shipped screen, the spec says so in its *What changes* table.

## Files

| File | Key | Read these pages only | Skip |
| --- | --- | --- | --- |
| **The live app** (Android screenshots, added 2026-09-22) | — | `references/shipped-app-2026-09-22/` — Tier, Base Pay sheet, Coins, three Trackers, Earnings statement, Rate card, each mapped region by region to the component it *is* | — · **Outranks every Figma file as evidence**: it is what tech has built. Read it first |
| **Expert App 2.0** (master) | `Q0YzzdKk21ayyKHjvCGPzM` | `FINAL ONBOARDING` (14537:42610) · `📝 Onboarding (ER - training)` (0:1) · `📍 Training` (110:3666) · `🏁 Go live` (1067:4218) · `🍔 Lunch Selection` (28714:63473) · `WIP - Payout I` (3406:12122) | Everything else (Archive, V2, UAT, Page 30/33, Design System page — the DS lives in `QjXqQZVAqLoRmH1j7foH1I`) |
| **Shift – Job Lifecycle DS** | `WEUPV9q19eAqRbkZSBj6OY` | `Job Lifecycle` (0:1) · `Shift Lifecycle` (28:18373) | UAT, BRANDING |
| **Beauty Expert Master** (added 2026-09-16) | `MBl1qmM0jgAJn49V8oBxLO` | **Beauty linear job flow** `686:12720` — 27 frames, the stakeholder's own Beauty job cycle, read 2026-09-23 → `projects/beauty-job-cycle/reads/figma-linear-flow/` (**the build target for the Beauty job cycle from 2026-09-23**; the top earnings card on it belongs to Payout) · `Job lifecycle` (34:41693): section **Final Designs DS Compatible** `152:78592` — 62 screens · `Shift lifecycle` (1:9251) · `Onboarding` (0:1): section **Go Live Flow** `97:55482` — 19 frames, read 2026-09-22 → `references/beauty-expert-master-go-live/` | The second, **empty** `Final Designs DS Compatible` section `152:93447` (0 children) · **Supersedes `WEUPV9q19eAqRbkZSBj6OY` as the job-lifecycle build target.** Its job lifecycle is currently **Cook** content, not Beauty — see the note below |
| **Self-Serve ER/AR** (onboarding, latest — added 2026-09-08) | `HqmnjmxhZvyvZxmIaVMCrB` | `Final` (0:1): sections *TC Less house help* · *TC house help* · *TC Less house cook* · *Bank/UPI* · *Post Onboarding* | — · **Supersedes** `FINAL ONBOARDING` in the master file for onboarding evidence; the master file's onboarding pages are now older iterations |
| **Expert (Sahil)** (added 2026-09-24) | `KiQaNqLFaH1orma4Uf7hzU` | section `8510:23259` — rewards, referral and notifications: a bonus hero, the Shakti tiers row, a peer-earnings strip, referral banners and cards, contest cards, day-detail cards, the Notification Centre and a story viewer (~70 frames), read 2026-09-24 → `references/expert-sahil-rewards-2026-09-24/` | everything else until registered · **Proposed, not shipped** — nothing in this file is evidence of what ships; it is a design ask, read for structure and translated (PromoCard, Chip `reaction`, BottomSheet day detail, HeroCard `facts`, HowToClip `player · story`, `patterns/notification-centre.md`) |

## Beauty Expert Master — first read, 2026-09-16

The file name says Beauty. **The `Job lifecycle` page does not contain a single Beauty string.** Its 62 screens are
the **Cook** job lifecycle: *Customer preferences · Spice level · Oil level · View Recipes · Your cooking space ·
Add photos of dishes you cooked*, and the home cards read *COOOOKS* and *Dosa*. So this file is the **master shell**
— the category-agnostic job lifecycle with Cook filled in — and Beauty content has not been drawn into it yet.

That makes it the right structure to inherit and the wrong content to copy. Read it for anatomy, order and states;
take none of its category strings.

**It is built on this repository's token values.** Sampled fills include `#F70F79` (`--color-brand`), `#FBC9DF`
(`--color-brand-200`, the disabled primary), `#111827` (`--color-text-primary`), and emerald/red tint pairs for the
in-progress gradient. Palette drift is not the problem here; **semantic drift is** — see the colour row below.

| What the file does | What the system currently says | Status |
| --- | --- | --- |
| **Accept Job** is a **green** button; every other primary (*Check In*, *Complete Job*, *Okay*) is brand pink | `button.md`: primary is brand | **open** — is green-for-accept a deliberate semantic, or drift? |
| Timer digits are green throughout, red when low (`03:23`) | `timer.md` escalation | consistent |
| **Deny** is a white button with red label, directly under Accept | P3: decline is adjacent to accept | consistent |
| Job In Progress uses a **ring-pill** timer over a green gradient header | `timer.md` `L` ring-pill | consistent |
| **No map canvas anywhere in the job lifecycle.** Check-in gives Map / Call / Chat / Street view as four action tiles | — | the job cycle is **not** map-first; only Home is |
| *What tasks did you do?* is a bottom sheet whose **body is an empty magenta dashed placeholder** | — | the slot is reserved and undesigned |
| Block cap is **5** (*5/5 People blocked*, *Unblock someone to block Radhika S*) | — | the number is 5, not 3 |

**Copy that cannot ship as-is** (same list as the Househelp read, confirmed present here): emoji as icons —
*📞 Call SOS Team*, *😊 I am safe, end SOS*, *😰 I am in danger*, *Summer Bonus ☀️*; and *No storage available.*

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
