# Read — planned suspension screens (Expert App 2.0)

| | |
| --- | --- |
| Source | *Expert App 2.0* `Q0YzzdKk21ayyKHjvCGPzM`, section `25013:170243` ("SUSPENSION SCREEN") |
| Status | Planned by the design lead — not shipped |
| Captured | 2026-10-18 |
| Frames | `01-account-paused.png` (`25013:170245`) · `02-temporarily-suspended.png` (`25013:170428`) · `03-account-terminated.png` (`25013:170620`) |
| Fed | `BUILD.md` § S · Paper *EMI recovery* → *Figma · suspension (as planned)* (exact copy) and *Suspension · lighter* (S1–S3) |

## The structure (kept)

Home, with the top band tinted by state (pink paused · red suspended · deep red terminated), the Home header (bell ·
Saathi · coins; terminated shows the bell only), one white status card — picture, title, reason, action(s) — then
*More from Snabbit* and the tab bar. Terminated has no carousel and no tab bar: there is nowhere left to go.

## What was too heavy, and the change (each one sentence)

- The grey 80 dp circle carries nothing; it becomes the state's pictogram (`calendar-✗` paused, `profile-blocked` suspended / terminated) — placeholders until the assets are pulled (P1).
- *"You were absent for X days without informing us. Contact Support to resume work."* becomes *Absent 5 days without telling us*: the second sentence is what the Button already says (P1 delete-a-line).
- The *Reason* box loses its heading word; the warning icon and tint already say "reason", and the sentence is cut to the fact (*Customer rating fell below 3.0*).
- Paused's outline Button becomes the primary L Button, because it is the screen's one action (P2, P3 56 dp).
- Paused and suspended gain a `Nudge` `gain` under the Button — *Come back by 15 Jan → +₹2,600* — the EMI money she gets back if she returns (SCOPE Q4; PRD § 7–8).
- Suspended's *Contact Support* becomes *Call help* with `headset`, a quieter secondary under the Nudge (P2).
- Terminated gets no money line: the PRD sends no EMI message to terminated experts (§ 8 rules, E19).
