# Icons — Phosphor meaning register

Phosphor Icons only (see `DECISIONS.md`). Weight `regular` by default, `fill` for selected/active, `bold` for emphasis. Sizes 16 / 20 / 24 / 32 / 40 dp; 24 for actions, 20 in medium controls; hit area ≥ 48 dp.

**One icon, one meaning.** Before using an icon, find its meaning here. If the meaning is missing, add a row — the Phosphor name, the Snabbit meaning, where it appears — in the same change. Never reuse a registered icon for a second meaning; never add a second icon for a registered meaning.

Status: **seed**. Populated fully during the Button, Tab bar and Job-alert specs. Rows below are the ones the principles and the reference case already need.

| Phosphor icon | Meaning in the Expert app | Weight | Appears in |
| --- | --- | --- | --- |
| `check` | Confirm / accept / done | regular | Accept job, Mark done |
| `x` | Close / dismiss | regular | Sheets, banners |
| `map-pin` | Job location / distance | regular | Job alert, job card (never as a map marker — markers carry `house` / `graduation-cap`) |
| `house` | Customer's home (map marker) | fill | MapMarker `job` |
| `navigation-arrow` | Her heading | fill | MapMarker `me` |
| `arrow-square-out` | Opens another app (maps) | regular | MapSnippet *Show directions* |
| `clock` | Duration / time | regular | Job alert, shift |
| `currency-inr` | Earnings tab / amount | regular / fill when selected | Bottom tab bar, job alert, earnings, payout |
| `spray-bottle` | Home tab — her tool; already learned in the shipped app | regular / fill when selected | Bottom tab bar |
| `users` | Refer tab | regular / fill when selected | Bottom tab bar |
| `user-circle` | Profile tab | regular / fill when selected | Bottom tab bar |
| `siren` | SOS | fill | SOS control — this icon is used for nothing else |
| `shield-check` | Shield / Kavach active | fill | In-job header |
| `speaker-high` | Play / replay spoken guidance | regular · fill while playing | Voice prompt, Coachmark, HeaderNav trailing |
| `speaker-slash` | Sound / autoplay off | regular | VoicePrompt bar toggle, Coachmark muted state |
| `play` | Play spoken guidance | fill | VoicePrompt bar disc |
| `pause` | Pause spoken guidance | fill | VoicePrompt bar disc while playing |
| `wifi-slash` | Offline | regular | Offline banner |
| `warning-circle` | Warning / attention | regular | Banner, Toast |
| `x-circle` | Error | regular | Banner, Toast, TextField |
| `check-circle` | Success | fill | Banner, Toast, celebration |
| `info` | Information | regular | Banner `info` tone only — never as an (i) tooltip trigger |
| `caret-right` | Navigate into | regular | ListItem trailing |
| `calendar-blank` | A date / choose a day | regular | Leave, shift date rows |
| `arrow-right` | Do this → get that (gain nudge) | regular | Nudge leading icon |
| `backspace` | Delete a digit (hold to clear) | regular | NumericKeypad |
| `caret-down` | Expand / collapse | regular · rotates 180° when open | Accordion header |
| `sun` | Summer / daytime bonus | regular | Breakdown rows (replaces the 🌞 emoji) |
| `caret-left` | Back | regular | HeaderNav |
| `arrow-clockwise` | Retry / refresh | regular | Error states |
| `camera` | Take photo / selfie | regular | MediaCapture tile and shutter, check-in, documents |
| `image` | Choose from gallery | regular | MediaCapture document preview only |
| `user-plus` | Register / add expert | regular | Stepper (onboarding), Refer |
| `identification-card` | ID proof / documents | regular | Stepper, Profile documents |
| `bank` | Bank account | regular | Stepper, Earnings payout |
| `graduation-cap` | Training | regular | Stepper, Hub |
| `lock-simple` | Locked / not yet available | fill | Stepper node badge, ProgressBar goal, tier rail |
| `phone` | Call | regular | Job card, contact, SOS status row |
| `phone-call` | Place an emergency call | regular | SOS active screen (Call police 112) |
| `siren` | SOS | fill | SOSControl only — no other use |
| `microphone` | Audio recording | regular | SOS / Shield status rows |
| `record` | Something is live (recording, sharing) | fill | SafetyStrip dot, status rows |
| `trophy` | Tier / contest | regular / fill when earned | Tier badge, contest |
| `fire` | Streak | fill | Streak chip |
| `coin` | Snabbit coins | fill | CoinChip |
| `translate` | Change language | regular | Settings |
| `bell` | Notifications | regular | Home header left (IconButton with Badge), root header trailing |
| `chats-circle` | Saathi — chat with support | regular | Home header `HeaderAction` |
| `headset` | Help — call the trainer / support line | regular | In-job and state headers `HeaderAction` |
| `magnifying-glass` | Search | regular | TextField search, HeaderNav search |

Not icons: smileys for Rating and the mascot are illustrations, not Phosphor glyphs — they live in the illustration library.
