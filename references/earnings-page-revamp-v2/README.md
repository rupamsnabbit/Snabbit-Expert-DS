# Earnings page revamp — v4 screens (Paper, 2026-10-05)

| | |
| --- | --- |
| Source | Paper file **Earnings** (`01M45RCXKPDWDZXCPTBJMG1HJ5`), page *Earnings v2*; exported at 2× |
| Project | `projects/earnings-page-revamp/` — `CONCEPT.md` v4, `TIERS.md` v4, `BUILD.md` v4. v1–v3 were drawn and discarded the same day; the trail is in `SCOPE.md` → *Log* |
| Status | **Proposed.** The scene is a described placeholder; the tier badge is a grey disc; the early-payout icon uses the `coins` glyph until the `hand-coins` path is placed. Not evidence of what ships |
| Files | `E-earnings.png · E2-loan-emi-sheet.png · E3-cash-collected-sheet.png · E2b-loan-emi-clip.png · E3b-cash-collected-clip.png · G-net-earnings-graph.png` · `Y-day-by-day.png` · `D-day.png` · `J-job.png` · `S-end-of-day-sheet.png` |

## The brief this answers

Experts call about three things: *why was this taken off?* · *where is my money?* (Razorpay, up to 3 days) · *you said
the red card would be reduced*. Each is answered on the first screen with no tap, by an icon, a date, a count or a
number — not a sentence. Three levels at most.

| Screen | What is on it | Built from |
| --- | --- | --- |
| **E** · Earnings | Month pager ‹ *March 2026* › (DatePicker month header standalone, next arrow disabled on the current month), then one Statement card with **the payout as the band**: *Payout · 18 Apr · ₹16,100*, the tracker ✓ 15 Apr → ● Processing → ○ 18 Apr directly under it, Divider, then the parts; below the Statement a second Card *Net earnings ₹50,000* with a 6-bar sparkline → G. (Round 3, Paper comments.) Earlier band *Net earnings · ₹50,000* · *Daily earnings · 24 days · ₹28,000 ›* (opens the day list) · *Bonuses ₹22,000 ▾* (closed) · *Deductions −₹33,900 ▴* (open by default) with five month-level lines: icon · 1–2 words · date or count · amount, *Income tax · 20%* carrying the only action *Add PAN ›* · Divider · *Payout ₹16,100* with the 3-node tracker ✓ 15 Apr → ● Processing → ○ 18 Apr. Fits one screen | Statement · Accordion `breakdown` rows · Stepper `tracker` (dated, proposed) |
| **E2** · Loan EMI sheet | BottomSheet `info` opened from the *Loan EMI* line: `bank` disc · *Loan EMI* · **−₹1,200** · *March · 3 of 12* · ProgressBar `segmented` 12 (*3 of 12 paid · Ends Dec 2026*) · *Loan taken · 10 Jan · ₹12,000* · *Every month · from payout · −₹1,200* · *Left · 9 months · ₹10,800* · *Loan details ›* · ✕ only, no Button | BottomSheet · ProgressBar `segmented` · Statement `breakup` · ListItem |
| **E3** · Cash collected sheet | same recipe from the *Cash collected* line: `money` disc · **−₹1,000** · *March · 4 jobs* · one line *Paid to you in cash by the customer* · four customer rows (Avatar · name · date · time · amount ›) → Job · ✕ only | BottomSheet · Statement rows that open |
| **E2b / E3b** · clip iteration | same head, then a **HowToClip `guide`** (16:9, poster, play disc 56, bar with `speaker-high` · knob-less progress · `corners-out`; *Loan EMI explained · 0:30* / *Cash collected explained · 0:20*) in place of the ledger data — nothing per-expert except the line she tapped; zero backend, one film per term per language | BottomSheet · HowToClip `guide` |
| **G** · Net earnings graph | HeaderNav back · *Since Oct 2025 · ₹2,51,000* · MonthBars `M` Oct–Mar (current bar brand, values above, months below) · one ListItem per month *March · 24 days · ₹50,000 ›* | HeaderNav · MonthBars (Tier 3 brief) · ListItem |
| **Y** · Daily earnings | One card per week: header *Week 4 · 22 – 28 Mar · ●12 · ₹12,600*; the current week open with its day rows (*Today* in brand, Mon 24 as a `moon` row, Tue 25 marked), weeks 3–1 closed | Card `expandable` · ListItem |
| **D** · Daily earnings (day) | One Statement card, two sections: band *Today · 4 jobs · 5 hr · ₹1,850* · **Earnings ₹2,000 ▴** (one line per job, then *Minimum guarantee ₹200* with the ProgressBar `target`) · **Deductions −₹150 ▴** (*Daily pass* · *Product cost · 3 items*) | Statement · Accordion `breakdown` rows · ProgressBar `target` |
| **J** · Job | *Job earnings ₹1,155* · services · *Total* · checked in / out · *Rating* · *Job ID · SNB-48213* with `copy` | Statement · ListItem · Rating |
| **S** · End of day | scene · *Today's earnings ₹1,850 · 4 jobs · 5 hr* · *●12/15 coins · 3 to Silver* · **Done** | BottomSheet · Amount `L` · ProgressBar `goal` · Button |

Sums: 28,000 + 22,000 = 50,000; taken off 27,000 + 4,200 + 1,200 + 1,000 + 500 = 33,900; 50,000 − 33,900 = 16,100. Day costs (daily pass, products, red cards) are inside the day figures and are not on the month list. Week 4 days
2,650 + 2,900 + 2,500 + 2,700 + 1,850 = 12,600. D (1,800 + 200) − 150 = 1,850. J 950 + 200 + 5 = 1,155.

## Checks run

- Every text node `font-family: var(--font-sans)`; `find_nodes` for `*system*` returns 0.
- Every colour, size, radius and spacing by `var(--…)`; borders literal `1px`.
- Copy follows standard app vocabulary (Net earnings · Daily earnings · Bonuses · Deductions · Payout · Processing) on the design lead's instruction, 2026-10-05; this departs from `foundations/content.md`'s her-words labels and is to be recorded in `DECISIONS.md`. Words on E: 14 labels; everything else is a number, date, count or icon (`CONCEPT.md` § 4).

## Open before this is evidence

- Razorpay states and failure reasons; when a waived red card's money returns; per-line dates for products, pass, cash (`SCOPE.md` → *Open questions*).
- Core: Stepper `tracker` dated nodes · Chip `status` · Statement band-only · icons · `asset/scene/day-done` (`TIERS.md` → Gaps).
- Field read with experts in Hindi, Kannada and Marathi: *Net earnings · Deductions · Payout · Processing · Minimum guarantee · Done*.

## Figma

Rebuilt 2026-10-05 in *Expert App — Earnings revamp (critique build)* (`cIAH24e13VZJu31OmiMWrj`): one frame per screen, auto layout, Outfit, colours bound to a local *Semantic* collection that mirrors `tokens/tokens.json`; a critique note above each frame (`projects/earnings-page-revamp/CRITIQUE.md`). Paper stays the drawing surface; the Figma file is the review copy.
