# Scope — Expert penalty constructs (offline gaming · check-in actions)

The contract for this project. Filled at intake, kept current as the work runs. Read it before touching anything in this folder.

| | |
| --- | --- |
| Slug | `deallocation-penalties` |
| PRD | `prd.md` § A — received 2026-10-27 from Hardik (De-allocation program), doc rev 16 |
| Stakeholder | Hardik (De-allocation program); design lead Rupam Banik |
| Status | **Intake** (2026-10-27) — PRD read end to end; open questions put to the lead; nothing tiered or drawn |

## Boundary

This project reads **its own folder** and **the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`, `references/SCREENS.md`). It does not read any other project's folder. Every decision traces to this PRD, the principles, or the tokens — nothing else.

**What design owns here.** The PRD has two halves: what the expert sees (six penalty cases, the PX gate, Deny / Early Logout) and the event contract (`offline_penalty_triggered`, `checkin_action_triggered`, payload 1.6). This project designs the first half. The second half is engineering's. It is read only for which states exist (open · reverted in time · penalised · abandoned; tapped · confirmed · dismissed), because every state the event records is a state the screen must show (P5).

## Answers with

The outputs that graduate to the shared system. Fill in as they land.

| Output | Path | Status |
| --- | --- | --- |
| Pattern section — offline on purpose during a shift (Group A live sheet, Group B on-return screen) | `patterns/offline.md` | — |
| Pattern section — location permission revoked during a shift | `patterns/permissions.md` | — |
| Pattern section — the On the way screen's exits: Decline / Early logout by distance, the call-the-customer gate | `patterns/check-in-out.md` § 1 | — |
| Screens | `references/deallocation-penalties-<screen>/` | — |

## Asks of core

Filled at the tier pass (Step 2). Candidates seen at intake, not yet decided:

| Ask | Kind | Why this PRD needs it | Where it lands | Status |
| --- | --- | --- | --- | --- |
| A sound for the penalty warning (no sound in the family means this today) | sound | Group A *voice ringer*; P4: one sound, one meaning, the new-job sound is never reused | sound family (`foundations/`) | candidate |
| BottomSheet `confirm` with a running Timer (grace countdown) | component change | Group A sheet: a consequence plus a live countdown plus one fix action | `components/bottom-sheet.md` · `components/timer.md` | candidate |
| Scene / pictogram assets: data off, location off, airplane on, phone was off | asset | P1: the sheet shows the state of the phone, not a sentence about it | `foundations/assets.md` | candidate |
| Icon meanings: `airplane`, `wifi-slash` / `cell-signal-slash`, `power` (if used) | icon | E3 — any Phosphor icon not yet registered | `foundations/icons.md` | candidate |

## Sits beside

| Existing pattern | Relationship |
| --- | --- |
| `patterns/offline.md` | **variant of.** Today the app treats every loss of network as a calm, non-blocking condition: one Banner, everything queues. This PRD adds *offline on purpose during a shift*: four toggles that open a sheet with a countdown, and two dark cases that are reviewed when she comes back. It has to sit inside the offline rules without breaking them for the innocent twin (a lift, a basement) |
| `patterns/permissions.md` | **amends.** Rule 3 says *No is allowed, and the app keeps working*. The PRD makes location permission non-negotiable during a shift. That needs a written exception in the pattern, not a silent override |
| `patterns/check-in-out.md` § 1 *On the way* | **variant of.** The PRD's *check-in screen* reads as our *On the way* stage (state header *Check in*, Timer *Check in by*). It adds three exits there: Decline (≥ 1.1 km), Early logout (< 1.1 km), and a call-the-customer gate before PX. Today that screen has none of these |
| `patterns/new-job-alert.md` | **reconcile.** The alert already has *Decline* (hold) with a red card on a repeat alert. A second Decline after acceptance, gated by distance, has to read as the same act or a clearly different one |
| `patterns/error-recovery.md` · `patterns/first-run.md` | **runs after.** A red card is shown before it applies (Nudge `loss`) and after as a Snackbar with *Why? ›* (first-run: the penalties Accordion `faq`, HowToClip *What a red card is*) |

Components already in the system that this will mostly be built from: BottomSheet `confirm` (consequence strip, safe option above, costly option with **hold** below; *Emergency logout* is already a listed use), Timer `countdown`, Nudge `loss`, `asset/reward/red-card`, VoicePrompt, Banner, Snackbar, Button `ghost danger` hold.

## Open questions

For the stakeholder, not for the designer to guess. One line each, dated, with the answer when it arrives. **★ = changes what gets built; asked before the tier pass.**

| # | Question | Asked | Answer |
| --- | --- | --- | --- |
| 1 ★ | **What is PX, exactly?** If it is the support / Help line, gating it behind two customer calls conflicts with P7: Help and SOS are always reachable, never behind a step. Proposal: the gate applies only to *getting off this job*. Help and SOS stay one tap away | 2026-10-27 | |
| 2 ★ | **Swipe or hold?** The PRD asks for swipe to confirm. The system's costly-action gesture is a **hold**: Decline on the job alert, and the costly option in BottomSheet `confirm`. Two gestures for "this costs you" is one more thing to learn (P3). Is swipe a hard requirement? | 2026-10-27 | |
| 3 ★ | **Is the check-in screen's Deny the same act as the job alert's Decline?** *Deny* is banned copy (`content.md`: *Decline*). And how does a red-carded Decline here reconcile with the existing distance-denial disposition? (The PRD lists this as open too) | 2026-10-27 | |
| 4 ★ | **A near job (< 1.1 km) offers only Early logout. What about a real reason to refuse it?** For example the customer is unsafe, or she is unwell. SOS is always there (P7), but is there an exit between "red cards + day over" and SOS? Does she see *why* Decline is missing (P5: say why before she taps)? | 2026-10-27 | |
| 5 ★ | **Dead zone vs data off.** Only the toggle (`mobile_data_on = false`) should open the sheet. No signal with data on stays the calm Banner (`offline.md`). Confirm. Same for location: the PRD detects *location off* by `location_services_on = false` **or empty `locations[]`**. An empty fix is also a basement or a GPS glitch, the PRD's own innocent twin | 2026-10-27 | |
| 6 ★ | **Phone off because the battery died — carded or not?** The PRD says battery % separates switched off (64 %) from died (3 %), and that we penalise only what she controls. Does a dead battery card? | 2026-10-27 | |
| 7 ★ | **Force stop is "consistent with, not proof of."** A crash, a low-memory kill or a reboot looks the same. Do Group B cases card automatically on return, or after review? Does she get a way to say *my phone died / the app closed by itself* (P5: one recovery action; P6: misses handled with dignity)? | 2026-10-27 | |
| 8 ★ | **Does the warning ring through silent mode?** P4: only the new-job alert and SOS override silent today. A third exception is a principle change. The sound must also be its own sound, not the job ringer | 2026-10-27 | |
| 9 | **Does any of this fire on shift with no job in hand** (between jobs, on a break)? The PRD carries `is_live_job` as a harm multiplier, so the screen may need to say which case she is in | 2026-10-27 | |
| 10 | **Placeholder values to draw with.** Group A grace (e.g. 2 min?), N red cards per case, auto-logout on/off, X red cards for Decline and Early logout. The PRD says these are placeholders; the screens need realistic numbers | 2026-10-27 | |
| 11 | **Red cards with money?** Today a red card shows as the asset + count (Nudge, `components/nudge.md`); the shipped earnings rows also show −₹50. Should the warning show the money as well? | 2026-10-27 | |
| 12 | Early logout lockout: rest of the day, or end of this shift? (PRD open decision) | 2026-10-27 | |
| 13 | What counts as a customer call for the gate: dialled, connected, or a minimum duration? Decides whether the gate can be cleared by tapping and hanging up. Also: does the count show her progress (*1 of 2*)? Or is Call PX simply hidden, as the PRD says? (PRD open decision) | 2026-10-27 | |
| 14 | Logged out by the penalty: when can she log back in? Same day, after a wait, or not today? The on-return screen needs its one next action (P2) | 2026-10-27 | |
| 15 | Where does she learn these rules before the first card? A HowToClip / penalties Accordion entry, or out of scope for this PRD? | 2026-10-27 | |

## Log

| Date | What happened |
| --- | --- |
| 2026-10-27 | **Intake.** The lead parked `payouts-revamp` and started this project from Hardik's doc (rev 16). PRD transcribed verbatim to `prd.md`. Read `PRINCIPLES.md`, `EXTENDING.md`, `patterns/offline.md`, `permissions.md`, `check-in-out.md`. Found this is a variant of three existing flows, not a new flow. Fifteen open questions written, eight that change what gets built put to the lead. Next: answers → `TIERS.md` |
