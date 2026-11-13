# Octopus Energy — book an appointment (Mobbin, iOS, read 2026-10-01)

Source: https://mobbin.com/screens/db6eb739-e009-4c81-8c05-b65c9fe19e6a

1. **Idea.** Several days × several slots on one screen: each day is a row, each slot a pill; unavailable slots are dimmed with a word, available ones are bright and tappable. The whole week is read at a glance.
2. **Idea vs skin.** Borrowable: **days as rows, slots as pills, everything visible at once** — exactly the two-days × two-shifts shape. Skin: dark purple, *Fully Booked* text in every dead cell, *Only 8 appointments left* urgency.
3. **Against the expert.** Pills carry a time range, which is numbers first (P1). Dead cells must be shape, not a word. No scroll for ≤ 3 days × ≤ 3 shifts.
4. **Tier.** Composition: a day header (DatePicker `strip` tile anatomy) with a row of Chip `choice` pills. The pill's second state (*Can't come*) is a Chip ask — see `EXPLORATION.md`.
