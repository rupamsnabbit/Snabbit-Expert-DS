# Earnings page revamp — structure v4: one tab, three scopes (Paper, 2026-10-06)

Source: Paper file *Earnings*, page *Earnings v4 — one tab, three scopes*. New flow; v2/v3 pages untouched. Build plan: `projects/earnings-page-revamp/BUILD.md` § Structure v4. Rule it follows: one ledger · every rupee is a line at one level · every line opens one of three origins · status is not a scope (`SCOPE.md` log, `CRITIQUE.md`).

| Screen | What it shows | Built from |
| --- | --- | --- |
| **M** · Month (default) | HeaderNav *Earnings* + Help · Segmented *Today · Week · Month* · month pager · Statement band alone **Payout · March ₹43,100** (the final amount, nothing else) · open block *Total earned ₹50,000* with *Work · 24 days ₹28,000 ›* (→ Week) and *Bonuses · 3 ₹22,000 ›* (→ list sheet) · Accordion *Deductions −₹6,900* open — header and its four lines on one grey surface, each line opening its origin · section *Payouts ₹43,100* at the bottom: *Early payout · 10 Mar · Paid ₹27,000 ›* · *Monthly payout · 18 Apr · Processing ₹16,100 ›* → payout sheet. 840 dp; the last payout row scrolls | Statement · Segmented (`tabs.md`) · DatePicker month header · Accordion `breakdown` |
| **W** · Week | same frame; pager *Week 4 · 22 – 28 Mar* · band *Earned · 5 days ₹12,600* with the coins bar inside (*12 of 15 coins · 3 to Silver*) · one ListItem per day (*Today* brand, off day `moon`, red-card day with the card mark) → Today scope. No Deductions section: no week-level lines exist | Statement · ProgressBar `goal` · ListItem |
| **T** · Today | pager *Thu, 27 Mar* · band *Earned · 4 jobs · 5 hr ₹2,000* with one row per job (→ Job) and *Minimum guarantee +₹200 ›* · Accordion *Deductions −₹150* open on one surface: *Daily pass ›* · *Product cost · 3 items ›* · Divider · total **Yours today ₹1,850** | Statement · Avatar · Accordion `breakdown` |

Sums: 50,000 − 6,900 = 43,100 = 27,000 + 16,100 · week 1,850 + 2,700 + 2,500 + 2,900 + 2,650 = 12,600 · day 1,800 + 200 = 2,000 earned, − 150 = 1,850 yours.

What changed from v3: the money that reaches her is the band, the business number is one row below; the pinned status strip is gone because the band *is* the status; one pager whose label follows the scope; Y, D and the Days screen collapse into the Week and Today scopes. Decided 2026-10-06: the band says *Payouts*; *Earned* opens the Week scope. Open: *Yours today* as the day's total word.
