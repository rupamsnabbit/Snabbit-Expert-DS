# Build plan — PAN–Aadhaar linking and account updates

Written **before** the first artboard. Sources in this order and no other:
**shipped app → `patterns/` → `components/` → Mobbin → invention.**

Shipped evidence: Monthly Earnings `cIAH24e13VZJu31OmiMWrj` `1764:26942` (frames `1764:27058` UPI + PAN added, `1764:26945` 20 % tax link) and Self-Serve ER/AR `HqmnjmxhZvyvZxmIaVMCrB` section *Bank/UPI* `619:51990`. Every screen below is a shipped frame with words changed; nothing is a new component. Mobbin was not reached.

## Lane A — PAN not linked with Aadhaar → status check

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| A1 · whole screen | shipped Monthly Earnings, *UPI added, link pan with aadhar case* frame, cloned | `1764:27058` | — | — |
| A1 · Income Tax row | shipped row *Income Tax (20%)* with the red link line (*Upload PAN Card to reduce tax*), words changed to *Link PAN with Aadhaar to reduce tax* | `1764:26945` · `patterns/payout.md` § 2 *PAN missing* | — | — |
| A1 · PAN Details row | shipped *PAN Details* row + ListItem **status line** (`warning-circle` 16 + BodyMd `textError`) *Not linked with Aadhaar* + trailing pill as the shipped *Update* pill, word *Link* | `components/list-item.md` § Content, § Trailing · `patterns/payout.md` § 3 | — | — |
| A2 · checking | shipped *Fetching account details* screen, words changed | `619:49952` | — | — |
| A3 · linked | shipped success screen *Bank details added*, words changed | `619:49985` | — | — |
| A4 · not linked | shipped *You're losing ₹4,700* sheet as the lead edited it: PAN warning picture · H2 red *Your PAN is not linked with Aadhaar* · one line *Come back when your PAN is linked* · the shipped *No PAN / PAN* rows (₹8,000 / ₹250) · Button `Text Button` **Update PAN** · Button `Neutral - Filled` L **Understood** at the bottom | `659:73914` · `components/bottom-sheet.md` `info` | — | — |
| A5 · could not check | same sheet, pictogram swapped, *Could not check your PAN* · *Try again in a few minutes* + **Try again** | `659:73914` · `patterns/error-recovery.md` *A service* | — | — |
| A6 · Link at Seva Kendra | **removed 2026-10-28** — the app does not explain where to link | — | — | — |
| A7 · back on the statement, linked | not drawn: she returns to the shipped *UPI + PAN* frame as it is (row normal, *Income Tax (1%)*); said in A3's caption | `1764:27058` | — | — |

## Choice sheet, not linked (S0) — replaces P0, 2026-10-28

While the PAN is not linked, a tap on the PAN row opens **S0**, a BottomSheet `select` over Earnings: *What do you want to do?* with two equal rows. A tap on a row closes the sheet and goes (no primary Button: the two choices are equal, `bottom-sheet.md` `select`). The P0 screen it replaces is gone.

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| S0 · sheet | BottomSheet `select`: grabber, H3 *What do you want to do?*, white surface, radius 16 top | `components/bottom-sheet.md` | — | — |
| S0 · rows | ListItem `navigational` ×2 in bordered cards (64, radius 12): `seal-check` *Check if PAN is linked* (→ A2) · `pencil-simple` *Update PAN* (→ D1); `caret-right` trailing; icon on a 40 `pink100` disc | `components/list-item.md` · `foundations/icons.md` (both registered) | — | — |
| A4 / A5 | open over Earnings again | A4 · A5 | — | — |

## Lane B — Update PAN

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| B1 · header | library `TopNav` *Default*, title *PAN Details* (as on the shipped Bank Details screens) | `619:50184` | — | — |
| B1 · current PAN | shipped *Your PAN is verified!* detail card: Name and PAN rows | `619:50354` | — | — |
| B1 · new PAN | shipped PAN card picture with the field, empty | `619:50053` | — | — |
| B1 · action | Button `primary` L *Update PAN*, disabled until a valid PAN | `components/button.md` | — | — |
| B2 · filled | B1 with the field typed and the Button enabled | `619:50088` | — | — |
| B3 · verified | shipped *Your PAN is verified!* screen | `619:50354` | — | — |

## Lane C — Update UPI / bank

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| C1 · current UPI | shipped *This account belongs to* screen (avatar · name · UPI ID card), title changed, Yes / No replaced by one Button *Update Bank Details* | `619:50227` · `components/button.md` | — | — |
| C1b · current bank account | shipped *Confirm this is you* card (holder · account number masked · IFSC) | `619:49899` | — | — |
| C2 · choose | shipped *How would you like to receive your payments?*, unchanged | `619:50184` | — | — |
| C3 · updated | shipped success screen, *Bank details updated* | `619:49985` | — | — |

## Lane D — PAN not linked, and she updates it

Entry: the A4 sheet's **Update PAN** (while the PAN is not linked, a tap anywhere on the PAN row runs *Check*; one target per row, P3).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| D1 · current PAN | B1's card + a third row *Aadhaar* with the status as value: `warning-circle` 16 + BodyMd SemiBold `textError` *Not linked* | B1 · `components/list-item.md` § Content (status line) | row 56, divider rule of the card | — |
| D1 · new PAN | B1, unchanged | B1 | — | — |
| D2 · wrong number | B2 with the library *Input field* `Error` state and its own string *Please enter a valid PAN*; Button disabled | library *Input field* · `components/text-field.md` | — | — |
| D3 · verified, linked | B3 + *Aadhaar · Linked* (`check-circle` `textSuccess`) + one line *Income tax is now 1%* | B3 | — | — |
| D4 · verified, not linked | B3 + *Aadhaar · Not linked* + *Come back when your PAN is linked*; one Button **Go to Earnings** | B3 | — | — |

B3 now carries the *Aadhaar · Linked* row too: changing a linked PAN ends in D3 or D4 the same way. *Update PAN* shows the Button's loading state (label kept, P5) while the new PAN and its link are checked; no separate checking screen.

## Update PAN screen — the lead's design, 2026-10-28

Every update-PAN screen (D1, D1 typed, D2, B1, B2) is now a clone of the lead's frame `1855:91711`: TopNav *Update PAN* · *Current PAN* · PAN card picture carrying her name and current PAN · library **Toast** as the link status under the card (`State=Red, Style=Dark` *Aadhar not linked*; `State=Success, Style=Light` *Aadhaar linked* when linked) · library **Input field** 56 with heading *Enter new PAN card number* (`Default` / `Filled` / `Error`) · Button `primary` L *Update PAN* (`Disabled` until typed). The earlier card-with-rows version of B1 / D1 is retired.

**2026-10-28:** D3, D4 and B3 are no longer screens with a card and *Go to Earnings*; each is the A3 success screen (*PAN updated* + one line) that returns to Earnings on its own.
