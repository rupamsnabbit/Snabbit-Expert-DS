# Icons — Phosphor meaning register

Phosphor Icons only (see `DECISIONS.md`). Weight `regular` by default, `fill` for selected/active, `bold` for emphasis. Sizes 16 / 20 / 24 / 32 / 40 dp; 24 for actions, 20 in medium controls; hit area ≥ 48 dp.

**One icon, one meaning.** Before using an icon, find its meaning here. If the meaning is missing, add a row — the Phosphor name, the Snabbit meaning, where it appears — in the same change. Never reuse a registered icon for a second meaning; never add a second icon for a registered meaning.

Status: **seed**. Populated fully during the Button, Tab bar and Job-alert specs. Rows below are the ones the principles and the reference case already need.

| Phosphor icon | Meaning in the Expert app | Weight | Appears in |
| --- | --- | --- | --- |
| `check` | Confirm / accept / done | regular | Accept job, Mark done |
| `x` | Close / dismiss | regular | Sheets, banners |
| `map-pin` | Job location / distance | regular | Job alert, job card |
| `clock` | Duration / time | regular | Job alert, shift |
| `currency-inr` | Earnings tab / amount | regular / fill when selected | Bottom tab bar, job alert, earnings, payout |
| `spray-bottle` | Home tab — her tool; already learned in the shipped app | regular / fill when selected | Bottom tab bar |
| `users` | Refer tab | regular / fill when selected | Bottom tab bar |
| `user-circle` | Profile tab | regular / fill when selected | Bottom tab bar |
| `siren` | SOS | fill | SOS control — this icon is used for nothing else |
| `shield-check` | Shield / Kavach active | fill | In-job header |
| `speaker-high` | Play spoken guidance | regular | Voice prompt |
| `wifi-slash` | Offline | regular | Offline banner |
| `warning-circle` | Warning / attention | regular | Banner, Toast |
| `x-circle` | Error | regular | Banner, Toast, TextField |
| `check-circle` | Success | fill | Banner, Toast, celebration |
| `info` | Information | regular | Banner, Tooltip |
| `caret-right` | Navigate into | regular | ListItem trailing |
| `caret-left` | Back | regular | HeaderNav |
| `arrow-clockwise` | Retry / refresh | regular | Error states |
| `camera` | Take photo / selfie | regular | Check-in, documents |
| `phone` | Call | regular | Job card, contact |
| `trophy` | Tier / contest | regular / fill when earned | Tier badge, contest |
| `fire` | Streak | fill | Streak chip |
| `coin` | Snabbit coins | fill | CoinChip |
| `translate` | Change language | regular | Settings |
| `bell` | Notifications | regular | Profile / root header trailing, with Badge — not on Home |
| `chats-circle` | Saathi / help | regular | Home header `HeaderAction`, job screens |
| `magnifying-glass` | Search | regular | TextField search, HeaderNav search |

Not icons: smileys for Rating and the mascot are illustrations, not Phosphor glyphs — they live in the illustration library.
