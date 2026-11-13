# Early payout — the live flow, five screens

| | |
| --- | --- |
| Source | The live Expert app's Early Payout flow, five frames shared by the design lead 2026-10-23 (`01-early-payout-five-screens.png`). Not in *Expert App 2.0*; Figma location to be added |
| Status | **Shipped** — evidence of what she uses today. Figures are placeholders (design lead, 2026-10-23) |
| Fed | `patterns/payout.md` § 4 (2026-10-23) |

| # | Screen | Regions, as components |
| --- | --- | --- |
| 1 | Early Payout home | HeaderNav *Early Payout* · a card: *Max. early payout* Amount `L` + money-bag pictogram, *Total earnings* row · Button **Withdraw** (dark, full width) · *Helpful tips and guide* — HowToClip `story` row |
| 2 | Amount, empty | the same card + tier chip in the header · *How much do you need?* · amount field *₹0* · slider ₹0 – max · rows *Remaining amount* · *Arrives in your bank — Within 12 hours* · **Withdraw** disabled |
| 3 | Amount, filled | *₹5,000*, slider filled · **Withdraw** enabled |
| 4 | Sent | confetti · `check-circle` disc · Amount *₹5,100* · *will be credited in your bank account within 12 hours* · **Go back** |
| 5 | Home, after | the card with the lower max · **Withdraw** · *Recent withdrawals*: ListItem *20 June, 5:35 PM* · status pill *● Successful* · Amount |

What it lacks today: any state between *sent* and *successful*, a *failed* row, and a no-bank state.
