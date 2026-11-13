# Tiers — PAN–Aadhaar linking and account updates

Every surface this ask needs, placed in a tier before anything is drawn (`principles/EXTENDING.md` → *Three tiers*).

## Surfaces

| # | Surface (the ask's words) | Tier | Built from | Verdict |
| --- | --- | --- | --- | --- |
| 1 | "in this same card … you need to link your PAN card" | 1 core | shipped *PAN Details* row = ListItem `navigational` + **status line** (`list-item.md` § Content) + trailing pill as the shipped *Update* | needs core change — the spec allows it, the Figma `Account Item` has no such variant |
| 2 | "we run something in the backend" — checking | 2 composition | shipped *Fetching account details* screen (Self-Serve ER/AR `619:49952`) | exists |
| 3 | "whether it actually is verified" — linked | 2 composition | shipped success screen *Bank details added* (`619:49985`) | exists |
| 4 | …or not — not linked | 2 composition | shipped *You're losing ₹4,700* sheet (`659:73914`) = BottomSheet `info` | exists |
| 5 | check could not run | 2 composition | same sheet, EmptyState `error` copy rules (`patterns/error-recovery.md`) | exists |
| 6 | "This is your existing PAN details. Enter your new PAN details" | 2 composition | shipped *Enter PAN card number* (`619:50053`) + the shipped *Your PAN is verified!* detail card (`619:50354`) above it | exists |
| 7 | "This is your existing bank details. Click to update" | 2 composition | shipped *This account belongs to* / *Confirm this is you* card (`619:50227`, `619:49899`) + Button `primary` | exists |
| 8 | after update — the shipped add flow | 1 core | shipped *How would you like to receive your payments?* (`619:50184`) and onward, unchanged | exists |
| 10 | linking happens offline at a Seva Kendra (lead, 2026-10-28) | — | removed 2026-10-28: the app does not explain where to link; the sheet says *Come back when your PAN is linked* | not needed |
| 11 | PAN not linked and she updates it (lead, 2026-10-28) | 2 composition | B1 / B2 / B3 + an *Aadhaar* row on the PAN card; library *Input field* `Error` | exists |
| 9 | updated — confirmation | 2 composition | shipped success screen (`619:49985`) | exists |

## Gaps

| Gap | Kind | Blocks |
| --- | --- | --- |
| `Account Item` variant *Pan Card, not linked* (status line + *Check* pill) in the Figma library | component change | surface 1 |

## Checks

- [x] Every surface in the ask appears in the table above — none skipped as "obvious"
- [x] Every Tier 3 row has a brief, or a line saying why it is not needed yet — no Tier 3
- [x] Every gap is an ask of core, not a local fix — the one gap is in `SCOPE.md` → *Asks of core*
- [x] `SCOPE.md` → *Sits beside* names the existing patterns this flow touches
- [x] Nothing in this table came from another project's PRD
