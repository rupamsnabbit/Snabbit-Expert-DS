# Tiers — Expert penalty constructs (offline gaming · check-in actions)

Every surface this PRD asks for, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*). Answers from the lead (2026-10-27) are applied: hold not swipe, *Decline* not *Deny*, only toggles trigger, a dead battery is never carded, the warning rings through silent.

## Surfaces — new

| # | Surface (PRD's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| N1 | Group A sheet: *"Your mobile data is off. Turn it on in [timer] or you'll get [N] red cards[ and be logged out]."* Four versions: data · location · permission · airplane | 2 composition, possibly a core change | BottomSheet `confirm` (not dismissible while pending) + Timer `countdown` + consequence strip (`asset/reward/red-card` × N, logout) + one `primary brand` fix Button (*Turn on data* · *Turn on location* · *Allow location* → settings · *Turn off airplane mode*) + VoicePrompt + the new warning sound | needs core change: `confirm` has no slot for a running Timer and its two-action rule does not fit one fix action; a scene per state is a new asset |
| N2 | The same warning when the app is in the background (the ringer fires live; the PRD says the sheet shows *on open*) | 2 composition | notification with the warning sound → opens N1 | exists (notification), sound is the gap |
| N3 | Countdown ran out: N red cards issued, logout fired or not | 2 composition | auto-logout on → N4's screen; off → Snackbar on Home with the red-card asset + count and *Why? ›* (`error-recovery.md`, `first-run.md`) | exists |
| N4 | Group B on return: *"You've been logged out — your phone was off for [X] during your shift. [N] red cards."* · *"…the app was stopped for [X]…"* | 2 composition | full-screen state (EmptyState anatomy: pictogram, Heading, one line, one Button) + red-card asset + count; one next action (P2) | exists; the copy and the next action wait on open question 14 |
| N6 | PX gate: *"bottom sheet opens, headed Call the customer, with a Call customer action"*; *Call PX* appears only after two calls | 2 composition | BottomSheet `info` · scene asset (calling the customer) · Button `primary brand L` *Call customer* · *Call PX* revealed as `secondary` after the 2nd call | exists; a call-count shape (*1 of 2*) is a design choice to show the lead, the PRD says hidden |
| N7 | Deny warning: *"You will get X red cards."*, swipe to confirm | 1 core | BottomSheet `confirm`: consequence strip (red card × X), safe `ghost` *Go to the job* above, `secondary danger` **Decline** with **hold** below | exists |
| N8 | Early logout warning: *"You will get X red cards and you will be logged out for the day."* | 1 core | BottomSheet `confirm`: consequence strip (red card × X, logged out for today), safe `ghost` above, `secondary danger` **Log out for today** with **hold** below | exists (*Emergency logout* is already a listed use) |

## Surfaces — existing screens this changes

| # | Screen (pattern · shipped frame) | What changes | Tier |
| --- | --- | --- | --- |
| E1 | **On the way / Check in** (`check-in-out.md` § 1 · shipped *Reach Job Location* `16:14340`) | Gains **Decline** (≥ 1.1 km) **or** **Early logout** (< 1.1 km), never both, as a quiet `ghost danger` Button away from *Check in* (P2, P3). Gains the PX entry that opens N6 | 2 composition |
| E2 | **Every screen during a shift**, in-job screens included | N1 can appear over any of them. SOS and Help in the header must stay reachable above or beside the sheet (P7) | rule |
| E3 | **Offline Banner** (`offline.md`) | No visual change. The rule is added: a dead zone stays the Banner, the toggles open N1 | rule |
| E4 | **Permission sheets** (`permissions.md`) | During a shift, location permission revoked → N1 (permission version), not the *Not now* fallback. Off shift, unchanged | rule |
| E5 | **Home** | After a card: the header's red-card count goes up (`header-nav.md`) and a Snackbar shows it. After a logout: Home in the logged-out state (open question 14) | 2 composition |
| E6 | **Earnings day view** (`earnings.md` · *Red cards* row) | The red-card row's detail names the new reasons: data off, location off, airplane mode, phone off, app stopped, Decline, Early logout | 2 composition |
| — | **New-job alert** (`new-job-alert.md`) | Unchanged. Listed because its *Decline* (hold) is now the same word and gesture as E1's | — |

## Gaps

Everything the verdict column marked as missing, copied into `SCOPE.md` → *Asks of core* and closed **there**, in the shared system, before the pattern is written.

| Gap | Kind | Blocks |
| --- | --- | --- |
| BottomSheet `confirm` with a running Timer and a single fix action | component change (`bottom-sheet.md`, `timer.md`) | N1 |
| Penalty warning sound that rings through silent mode | sound + P4 change + `DECISIONS.md` | N1, N2 |
| Scenes: data off · location off · airplane mode on · phone off · calling the customer | asset (`foundations/assets.md`) | N1, N4, N6 |
| Icon meanings: airplane, data off, location off, power (whichever are used) | icon (`foundations/icons.md`) | N1, N4, E6 |

## Checks

- [x] Every surface in the PRD appears in the table above — none skipped as "obvious"
- [x] Every Tier 3 row has a brief, or a line saying why it is not needed yet (no Tier 3 rows)
- [x] Every gap is an ask of core, not a local fix
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
