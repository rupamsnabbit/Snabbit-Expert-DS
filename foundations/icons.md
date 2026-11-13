# Icons — Phosphor meaning register

Phosphor Icons only (see `DECISIONS.md`). Weight `regular` by default, `fill` for selected/active, `bold` for emphasis. Sizes 16 / 20 / 24 / 32 / 40 dp; 24 for actions, 20 in medium controls; hit area ≥ 48 dp.

**One icon, one meaning.** Before using an icon, find its meaning here. If the meaning is missing, add a row — the Phosphor name, the Snabbit meaning, where it appears — in the same change. Never reuse a registered icon for a second meaning; never add a second icon for a registered meaning.

Status: **seed**. Populated fully during the Button, Tab bar and Job-alert specs. Rows below are the ones the principles and the reference case already need.

| Phosphor icon | Meaning in the Expert app | Weight | Appears in |
| --- | --- | --- | --- |
| `check` | Confirm / accept / done | regular | Accept job, Mark done |
| `x` | Close / dismiss; **remove this value** — takes one picked value back out of a selection (the same *take it away* gesture, applied to a pick instead of a layer). Never *delete* her data, *decline* a job or *wrong* (that is `x-circle`) | regular | Sheets, banners; trailing ✕ on Chip `removable`, the picked-areas strip (`projects/hood-shift-change`, 2026-10-07) |
| `map-pin` | Job location / distance; **show this place on a map** | regular | Job alert, job card, the *Show map* text button on the SelectionCard `rich` shift option (`projects/hood-shift-change`, 2026-10-01; it replaced the pin after the area · km line). Never as a map marker — markers carry `house` / `graduation-cap` |
| `house` | Customer's home (map marker) | fill | MapMarker `job` |
| `navigation-arrow` | Her heading | fill | MapMarker `me` |
| `arrow-square-out` | Opens another app (maps) | regular | MapSnippet *Show directions* |
| `clock` | Duration / time; **waiting until a time** — money on its way, a payout on hold | regular | Job alert, shift; payout status line `sent` / `held`, Tag *On its way* (`patterns/payout.md` § 2, 2026-10-23) |
| `currency-inr` | Earnings tab / amount | regular / fill when selected | Bottom tab bar, job alert, earnings, payout |
| `spray-bottle` | Home tab — her tool; already learned in the shipped app | regular / fill when selected | Bottom tab bar |
| `scissors` | The **Waxing & Threading** pouch. Never *cut*, *trim* or *delete* — in this app the shears mean one pouch | regular | Inventory: pouch tile, pouch row |
| `paint-brush` | The **Hair & Bleach** pouch. Never a generic *edit* or *customise* | regular | Inventory: pouch tile, pouch row |
| `hand-soap` | The **Pedicure & Manicure** pouch. Never *wash your hands* as an instruction | regular | Inventory: pouch tile, pouch row |
| `bandaids` | The **Hygiene & Disposables** pouch. Never injury, first aid or SOS — `siren` is SOS and `shield-check` is Kavach | regular | Inventory: pouch tile, pouch row |
| `users` | Refer tab | regular / fill when selected | Bottom tab bar |
| `user-circle` | Profile tab | regular / fill when selected | Bottom tab bar |
| `siren` | SOS | fill | SOS control — this icon is used for nothing else |
| `shield-check` | Shield / Kavach active | fill | In-job header |
| `speaker-high` | **Listen** — this can be heard; tap to hear it (the `inline` voice control). Never the replay of a finished voice (that is `arrow-counter-clockwise`) | regular · fill while playing | Voice prompt `inline`, Coachmark, HeaderNav trailing |
| `speaker-slash` | Sound / autoplay off | regular | VoicePrompt bar toggle, Coachmark muted state |
| `play` | Play / **resume** (voice or clip) — it has not played yet, or it stopped midway. Never *play again* after it finished | fill | VoicePrompt bar disc (idle, paused), Saathi ring control, HowToClip card |
| `arrow-counter-clockwise` | **Replay from the start** — a voice or clip that has finished; tap to hear it again | regular · bold on the 12 dp Saathi badge (emphasis) | HowToClip player; VoicePrompt `finished` disc and the Saathi ring control with the glow (`projects/hood-shift-change`, 2026-11-13) |
| `pause` | Pause spoken guidance | fill | VoicePrompt bar disc while playing |
| `wifi-slash` | Offline | regular | Offline banner |
| `warning-circle` | Warning / attention | regular | Banner, Toast, ShieldRow blocked / stopped reason |
| `shield-warning` | **A Trust and Safety case against her** — a penalty taken from her payout, or a payout held for a check. Never Shield / Kavach (that is `shield-check`), never *attention* in general (that is `warning-circle`) | regular | Statement *Deductions* line *Trust and Safety Penalty*, its sheet (`projects/payouts-revamp` workstream 4, 2026-10-26 — **proposed**) |
| `x-circle` | Error | regular | Banner, Toast, TextField |
| `check-circle` | Success | fill | Banner, Toast, celebration |
| `info` | Information | regular | Banner `info` tone only — never as an (i) tooltip trigger |
| `caret-right` | Navigate into | regular | ListItem trailing |
| `calendar-blank` | A date / choose a day | regular | Leave, shift date rows; payout status line `approaching` / `next-batch` (*Coming on 2 Nov*) |
| `arrow-up` / `arrow-down` | Change versus a period (Stat delta) | regular | Stat |
| `arrow-right` | Do this → get that (gain nudge); **what she has now → what she'll have** on a change confirm, between the old (grey) and the new (brand) picture. Never *next* or *go* (that is `caret-right` on a row, or the Button) | regular | Nudge leading icon · BottomSheet confirm for a hood or shift-time change (`projects/hood-shift-change`, 2026-10-06) |
| `backspace` | Delete a digit (hold to clear) | regular | NumericKeypad |
| `caret-down` | Expand / collapse | regular · rotates 180° when open | Accordion header |
| `sun` | Summer / daytime bonus | regular | Breakdown rows (replaces the 🌞 emoji) |
| `caret-left` | Back | regular | HeaderNav |
| `arrow-clockwise` | Retry / refresh — including **the system retrying on its own** (*trying again in 3 hours*) | regular | Error states; payout status line `retrying` (`patterns/payout.md` § 2, 2026-10-23) |
| `camera` | Take photo / selfie | regular | MediaCapture tile and shutter, check-in, documents |
| `image` | Choose from gallery | regular | MediaCapture document preview only |
| `user-plus` | Register / add expert | regular | Stepper (onboarding), Refer |
| `identification-card` | ID proof / documents | regular | Stepper, Profile documents |
| `bank` | Bank account | regular | Stepper, Earnings payout; payout status line `blocked` / `details-wrong` |
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
| `copy` | Copy a reference number (UTR, job ID) | regular | Payout rows, payout detail, Job screen |
| `hash` | A reference number itself (job ID, UTR) — the row's leading icon; `copy` is the action beside it | regular | Job screen *Job ID* row (`projects/earnings-page-revamp`, 2026-10-05) |
| `gift` | A bonus or extra she earned (joining bonus, winback, tips) — the Bonuses line on Earnings | regular | Earnings statement row (`projects/earnings-page-revamp`, 2026-10-06) |
| `lock-simple` / `lock` | Locked — a bonus, a step, a badge not yet earned (`lock-simple` in Stepper nodes; `lock` beside amounts and assets) | regular | Amount locked, Badge locked, ProgressBar neutral, Stepper locked |
| `lock-open` | Just unlocked | regular | Amount unlock moment |
| `eye` / `eye-slash` | Show / hide an amount | regular | Amount, ListItem trailing (privacy in public) |
| `user` | A person (placeholder avatar, name field) | regular | Avatar placeholder, TextField leading |
| `envelope` | Email / message field | regular | TextField leading |
| `seal-check` | Verified (KYC, selfie) | fill | Avatar verified mark |
| `caret-up` | Collapse | regular | Card / Accordion expanded header (rotates from `caret-down`) |
| `plus-circle` | Add one more | regular | Card add action, referral |
| `paper-plane-right` | Send a message | fill | Chat send |
| `broom` | Cleaning (service category) | regular | Chip filter |
| `cooking-pot` | Cooking (service category) | regular | Chip filter |
| `t-shirt` | Laundry (service category) | regular | Chip filter |
| `calendar` | This week / a date range | regular | Chip filter, Earnings pager (a single day is `calendar-blank`) |
| `cell-signal-low` / `wifi-slash` | Weak signal / offline | regular | Banner offline, EmptyState offline |
| `crosshair` | Recentre map | regular | The one floating map control (IconButton) |
| `minus` | Indeterminate (parent "select all") | bold | Checkbox |
| `receipt` | Payout history | regular | Earnings statement row |
| `hand-coins` | Early payout | regular | Earnings statement row |
| `clock-clockwise` | Time added (job extended) | regular | Tooltip `status` success on the Timer |
| `tote` | A pouch in her kit bag — one of the five service pouches | regular | Bag check pouch rows, live inventory |
| `package` | A product she carries or is being sent; the *Packed* stage of a refill order | regular | Bag check refill rows, refill tracker, ledger |
| `truck` | Out for delivery — a refill order on its way to her | regular | Refill tracker, Home refill card |
| `polygon` | Her work area — the boundary she must be inside to start a shift (never a pin; a pin is a point, this is an area) | regular | Home shift card work-area row, boundary screen |
| `armchair` | A rest hub — somewhere she can sit down between jobs. Rest, not work: never the `graduation-cap` used for a training `hub` | fill | LiveMap `rest-hub` marker, rest-hub sheet |
| `hand-heart` | A Seva point — where she goes for help in person. Care offered, not a transaction | fill | LiveMap `seva` marker, Seva sheet |
| `hourglass` | Time still to run before something starts, or a job's duration — *Setting up* state header, *Duration* row. Never for a running countdown (that is the Timer's ring) | regular | *Duration* row on the Job in progress card (the buffer screen that used it as a header was dropped 2026-09-24) |
| `bag` | Her kit bag — the products she carries to a job (*9 products from your bag*). The bag holds pouches (`tote`) and products (`package`) | regular | Job alert, Check in, Job completed rows |
| `prohibit` | Block a customer — *Don't send me to Radhika again*. Never *disabled* or *unavailable* | regular | Rating screen ListItem, Block sheet |
| `chat-circle` | Chat with the customer — one person. Saathi (support) is `chats-circle`, never this | regular | IconButton on the job card, Check in action tile |
| `list-plus` | A service was added to the job while it is running — the customer's add-on (*Radhika added eyebrow threading*). Never *add one more* (that is `plus-circle`, an action she takes) and never *time added* alone (that is `clock-clockwise`) | regular | Add-on sheet pictogram (`beauty-job-cycle` 2.07) |
| `file-text` | A document she can read in full — *Read the full terms ›*, a statement PDF. Never for *notes* or *edit* | regular | Go-live agreement row, Profile documents |
| `moon` | Rest — her weekly off, a leave day, **a shift she will not work** (*Can't come*). Never *night shift* (that is a time, said in words) | regular | Go-live *Your week* card, shift calendar, Chip `answer` and the weekly-off row in the attendance sheet and Home record (`projects/advance-attendance`, 2026-10-01) |
| `credit-card` | A repayment that comes off her payout — the kit EMI. Not a card she owns; Snabbit has no cards | regular | Go-live *Paying it back* Statement band |
| `pencil-simple` | Edit this — change a saved detail (location, time). Never *write* or *notes* | regular | Go-live location row, Profile |
| `heart` | Reaction — *I love this* on a post or story. Never *favourite* or *save* (that is `bookmark-simple`) | regular · fill when hers | Chip `reaction` (notifications) |
| `thumbs-up` | Reaction — *I like this*. Never *yes* / *confirm* (a Button says the verb) | regular · fill when hers | Chip `reaction` |
| `hands-clapping` | Reaction — *well done* to another expert's story | regular · fill when hers | Chip `reaction` |
| `hands-praying` | Reaction — *thank you* (namaste). Never *Seva* (that is `hand-heart`) and never *pray* | regular · fill when hers | Chip `reaction` |
| `bookmark-simple` | Save for later / the Saved list. Never *favourite* | regular · fill when saved | Notifications header trailing, Post and story footer (IconButton S) |
| `whatsapp-logo` | WhatsApp — invite a friend, share, or message a friend she referred; opens WhatsApp. The one third-party mark allowed as an icon, because it is the app she already uses; never a generic *share* | regular | PromoCard `referral` Button leading, the friend's screen *Message on WhatsApp* row |
| `corners-out` | Watch full screen — opens the HowToClip `player` from an inline `guide`. Never *expand a card* (that is `caret-down`) | regular | HowToClip `guide` bar |
| `coffee` | Break — the gap in a split day (*Break · 4 hrs*). Never a day off or leave (that is `moon`), and never food or a meal | regular | SelectionCard `rich` shift option day rail, between two `clock` blocks (`projects/hood-shift-change`, 2026-10-01) |
| `users-three` | Work with a friend — find a hood by a friend's expert ID. Never Refer (that is `users`) or a team | regular | Button secondary neutral on the change-hood screens and search (`projects/hood-shift-change`, 2026-10-01) |

| `briefcase` | **Earned** — what her jobs paid, before anything was added or taken. The first of the three money buckets on every Statement (`patterns/earnings.md`). Never *work* as a tab or *job* (a job row carries the customer's Avatar) | regular | Statement bucket row, month · day · job |
| `arrow-circle-up` | **Added** — what the company put in on top of her work: the guaranteed top-up, overtime, bonuses, tips. Never a Stat delta (that is `arrow-up`) and never *add one more* (that is `plus-circle`) | regular | Statement bucket row |
| `arrow-circle-down` | **Taken** — what came out of her pay: products from her kit, the daily pass, red cards, EMIs, tax, cash she already collected. A fact, not a penalty — the row is `textPrimary`. Never a Stat delta (that is `arrow-down`) | regular | Statement bucket row |

Not icons: smileys for Rating and the mascot are illustrations, not Phosphor glyphs — they live in the illustration library.
