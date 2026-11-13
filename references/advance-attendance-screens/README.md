# Advance attendance — the four screens, exported from Paper

| | |
| --- | --- |
| Source | Paper file *Advance attendance* (`01M3V5ZE11T221X5NHPMMRQ9RT`, team *Rupam's Team*), exported 2026-10-01 at 2×; Home redrawn and *My shifts* added the same day after the design lead's review |
| Project | `projects/advance-attendance/` — flow in `FLOW.md`, build plan in `BUILD.md`, tiers in `TIERS.md` |
| Status | **Proposed** — drawn from the system, not yet reviewed by the design lead; not shipped |
| Baseline | 360 × 800, content 328, margin `spacing.5`; tokens by variable; Outfit only (the status-bar clock is the OS face) |

| File | Screen | Built from |
| --- | --- | --- |
| `1a-evening-sheet-first-evening.png` | The first evening: Friday and Saturday blocks, four Chip `answer` pills all *Coming*, Button *I'll come to all* | BottomSheet `confirm` safe · VoicePrompt `inline` · day header (DatePicker tile type roles) · Chip `answer` · Button `primary L` |
| `1b-evening-sheet-daily.png` | Every evening after: the new day (Sunday) with two pills, the answered day as a ListItem with a Tag `success` *Coming · both*, Button *I'll come* | as above + ListItem · Tag · `caret-down` |
| `2-home-one-row.png` | Home: the shipped *Your shift today* card kept, the *Present / Absent* block replaced by one navigational row *Tomorrow · Can't come · 4 – 8 pm ›*; *Login* + Nudge `gain` unchanged. (The first draft, `2-home-shifts-record.png`, put two day blocks of pills on Home and was rejected the same day — kept for the record.) | HeaderNav `home` · Card · ListItem `navigational` · Tag · Button · Nudge · BottomTabBar |
| `2b-my-shifts.png` | *My shifts* (Profile → Shifts, from the Home row): Today read-only (Present Tag · login window), Tomorrow and Saturday pills, weekly off row, the one rule as the single instruction line | HeaderNav `page` · ListItem · Tag · Chip `answer` |
| `3-change-sheet-after-midnight.png` | Tapping a pill after midnight: *Change Friday 8 am – 12 pm?*, the consequence strip (red-card asset, count is product's placeholder), *Keep it* ghost above, *Hold · Can't come* `secondary danger` below | BottomSheet `confirm` costly · Nudge `loss` · Button `ghost` / `secondary danger` hold |

Departures from the shipped Home card are recorded in `projects/advance-attendance/FLOW.md` § *What changes from the shipped screens*. The Chip `answer` kind these screens use landed in `components/chip.md` the same day.
