# Earnings page revamp — structure v3 (Figma, 2026-10-05)

Source: Figma *Expert App — Earnings revamp (critique build)* (`cIAH24e13VZJu31OmiMWrj`), page *Structure v3 — simplified*. Built with `use_figma` from the system (auto layout, Outfit, colours bound to a local *Semantic* variable collection mirroring `tokens/tokens.json`). Read: `projects/earnings-page-revamp/CRITIQUE.md` § Round 2. Build plan: `projects/earnings-page-revamp/BUILD.md` § Structure v3.

| Screen | What it shows | Built from |
| --- | --- | --- |
| **E** · Earnings v3 | one equation on one screen: Statement *Earned · 24 days · ₹50,000* with rows *Work ₹28,000 ›* and *Bonuses ₹22,000 ›* · section *Deductions −₹6,900* (Income tax · Add PAN · Loan EMI · Kit EMI · Cash collected, each opens its sheet) · section *Payouts ₹43,100* (*Early payout · 10 Mar · Paid* ✓ · *Monthly payout · 18 Apr · Processing* ›). Fits 800 dp | Statement · ListItem · Stepper node glyphs as status discs |
| **DY** · Days v3 | Y and D merged: week cards, a day row opens in place to its jobs (→ J) and day costs (*Minimum guarantee +₹200 · Daily pass −₹100 · Product cost · 3 items −₹50*); Tue 25 open shows *Red card · late −₹100* with Chip `status` *Waived · back 18 Apr* | Card `expandable` · Accordion `breakdown` · Chip `status` (to land) |
| **P** · Payout sheet | BottomSheet `info`: *Monthly payout ₹16,100 · By Fri, 18 Apr* · Stepper `tracker` *Sent 15 Apr ✓ · Bank Processing ● · Your account by 18 Apr ○* · ListItem *Not received by 18 Apr? Call support ›* | BottomSheet · Stepper · ListItem |
| **P** · failed | same sheet: *Returned by bank · 16 Apr* · tracker with `error` node · *Account number did not match* · Button *Check bank account* · *Call support ›* | as above · Button |

What changed from v2 and why (one line each): early payout moved from Deductions to Payouts (it is money she received); three unrelated totals became one subtraction (Earned − Deductions = Payouts); *Net earnings* → *Earned*; the tracker moved into the payout sheet so both transfers show a status word; Y and D merged (three levels, not four); coins left the day list; the red card got its line and its waiver status (call 3); Net earnings card, graph screen and *Done* buttons dropped from the path.

Open: the word *Work* vs *Days* (four-language check); bonuses as a sheet or rows; a voice button on E (P4).

## On the DS (2026-10-06)

The file is now bound to *Expert App - Design System 2.O*: semantic variables alias the published palette (`text-primary → Gray/color-gray-900`, `bg-brand → Pink/color-primary-600 P`, `border-default → Secondary Stroke` …), text uses the DS styles, spacing/radius/stroke are bound, and headers, bands, buttons, dividers, avatars, icons and chips are library instances. Where the library has no equivalent the drawing stays a frame and the gap is logged in `SCOPE.md` (Statement, Stepper, status Chip, BottomSheet, 13 regular-weight icons, Caption semibold).
