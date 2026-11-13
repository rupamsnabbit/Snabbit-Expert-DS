# Mobbin — how payout apps show earned → taken → got → bank

| | |
| --- | --- |
| Captured | 2026-10-23, Mobbin (iOS), for `prd.md` § B v2 (the month statement) |
| Internal only | Never published, never traced (`EXTENDING.md`) |
| Pinterest | Not used — this is a structural problem, and Pinterest is mood-only in this system (`EXTENDING.md` § Where inspiration comes from) |

| File | App | Mobbin |
| --- | --- | --- |
| `01-grailed-order-earnings.webp` | Grailed — Sold price · − commission · − processing fee · **Total earnings** · *Will be released to your bank account* | https://mobbin.com/screens/7d077a25-34be-4075-84a7-5f40ccf69967 |
| `02-alias-cash-out-breakdown.webp` | alias — Selling price · − commission · − seller fee · **Available to spend** · Available to cash out | https://mobbin.com/screens/97f87d71-214e-4d9e-8772-5391e21493b2 |
| `03-upside-cash-out-summary.webp` | Upside — Amount · − fee · **Cash out amount** · *Deliver to* Capital One (bank icon) · *2–4 business days* | https://mobbin.com/screens/73adb83c-0e14-44b9-b564-b0572472e29f |
| `04-airtasker-youll-receive.webp` | Airtasker — $5,000 · − service fee · **You'll receive** | https://mobbin.com/screens/0a6183a5-c517-4220-b837-7b3ec6608d1b |
| `05-doordash-dasher-week-pay.webp` | DoorDash Dasher — the week's total large at the top with a caret, its parts listed under it, then the dashes | https://mobbin.com/screens/1371715f-7794-424b-8b4d-00bc11a8b620 |

## The read

1. **Idea.** Every one of them answers *how much do I get* as **one column read top to bottom**: the gross figure, the lines taken off it, the result **once**, then where the money goes (Upside: *Deliver to* + the bank; Grailed: *released to your bank account*).
2. **Borrowable:** the order (gross → minus lines → net → destination); the net shown once; the destination as its own block after the net. **Not borrowable:** their type, colours, the US-fintech density, *$*.
3. **Against the expert.** Fits P1 (numbers first, one sum), P2 (one figure that matters), P5 (honest — every line adds up). Fails nothing, provided rows stay ≥ 48 dp and labels are her words.
4. **Tier.** Tier 2 — the shipped Statement (band · rows · divider · total · schedule) re-ordered; no new component.
5. **Translation** — Paper *Payouts revamp* → page *3b · Statement · made → taken → got → bank*: **A** one column (the Mobbin convention, everything in one card) · **B** four lines (made → taken off as one line → got → bank; earnings list below) · **C** earnings list first, then the card that starts from its sum.
6. **Differences from the references.** Kept the shipped band, scallop, icons and schedule panel instead of their flat lists (P6, *keep the UI*); *You made / Taken off / You got / To your bank* in place of *Subtotal / Fees / Total* (`content.md`); the destination is the shipped payout-schedule row with its status, not a static bank name, because the bank leg is what payout visibility tracks.
