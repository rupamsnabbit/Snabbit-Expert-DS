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
| `scissors` | The **Waxing & Threading** pouch. Never *cut*, *trim* or *delete* — in this app the shears mean one pouch | regular | Inventory: pouch tile, pouch row |
| `paint-brush` | The **Hair & Bleach** pouch. Never a generic *edit* or *customise* | regular | Inventory: pouch tile, pouch row |
| `hand-soap` | The **Pedicure & Manicure** pouch. Never *wash your hands* as an instruction | regular | Inventory: pouch tile, pouch row |
| `bandaids` | The **Hygiene & Disposables** pouch. Never injury, first aid or SOS — `siren` is SOS and `shield-check` is Kavach | regular | Inventory: pouch tile, pouch row |
| `users` | Refer tab | regular / fill when selected | Bottom tab bar |
| `user-circle` | Profile tab | regular / fill when selected | Bottom tab bar |
| `siren` | SOS | fill | SOS control — this icon is used for nothing else |
| `shield-check` | Shield / Kavach active | fill | In-job header |
| `speaker-high` | Play / replay spoken guidance | regular · fill while playing | Voice prompt, Coachmark, HeaderNav trailing |
| `speaker-slash` | Sound / autoplay off | regular | VoicePrompt bar toggle, Coachmark muted state |
| `play` | Play (voice or clip) | fill | VoicePrompt bar disc, HowToClip card |
| `arrow-counter-clockwise` | Replay | regular | HowToClip player |
| `pause` | Pause spoken guidance | fill | VoicePrompt bar disc while playing |
| `wifi-slash` | Offline | regular | Offline banner |
| `warning-circle` | Warning / attention | regular | Banner, Toast, ShieldRow blocked / stopped reason |
| `x-circle` | Error | regular | Banner, Toast, TextField |
| `check-circle` | Success | fill | Banner, Toast, celebration |
| `info` | Information | regular | Banner `info` tone only — never as an (i) tooltip trigger |
| `caret-right` | Navigate into | regular | ListItem trailing |
| `calendar-blank` | A date / choose a day | regular | Leave, shift date rows |
| `arrow-up` / `arrow-down` | Change versus a period (Stat delta) | regular | Stat |
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
| `copy` | Copy a reference number (UTR, job ID) | regular | Payout rows, payout detail |
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
| `hourglass` | Time still to run before something starts, or a job's duration — *Setting up* state header, *Duration* row. Never for a running countdown (that is the Timer's ring) | regular | HeaderNav `state` on the buffer screen, Job in progress card |
| `bag` | Her kit bag — the products she carries to a job (*9 products from your bag*). The bag holds pouches (`tote`) and products (`package`) | regular | Job alert, Check in, Job completed rows |
| `prohibit` | Block a customer — *Don't send me to Radhika again*. Never *disabled* or *unavailable* | regular | Rating screen ListItem, Block sheet |
| `chat-circle` | Chat with the customer — one person. Saathi (support) is `chats-circle`, never this | regular | IconButton on the job card, Check in action tile |
| `list-plus` | A service was added to the job while it is running — the customer's add-on (*Radhika added eyebrow threading*). Never *add one more* (that is `plus-circle`, an action she takes) and never *time added* alone (that is `clock-clockwise`) | regular | Add-on sheet pictogram (`beauty-job-cycle` 2.07) |
| `file-text` | A document she can read in full — *Read the full terms ›*, a statement PDF. Never for *notes* or *edit* | regular | Go-live agreement row, Profile documents |
| `moon` | Rest — her weekly off, a leave day. Never *night shift* (that is a time, said in words) | regular | Go-live *Your week* card, shift calendar |
| `credit-card` | A repayment that comes off her payout — the kit EMI. Not a card she owns; Snabbit has no cards | regular | Go-live *Paying it back* Statement band |
| `pencil-simple` | Edit this — change a saved detail (location, time). Never *write* or *notes* | regular | Go-live location row, Profile |
| `heart` | Reaction — *I love this* on a post or story. Never *favourite* or *save* (that is `bookmark-simple`) | regular · fill when hers | Chip `reaction` (notifications) |
| `thumbs-up` | Reaction — *I like this*. Never *yes* / *confirm* (a Button says the verb) | regular · fill when hers | Chip `reaction` |
| `hands-clapping` | Reaction — *well done* to another expert's story | regular · fill when hers | Chip `reaction` |
| `hands-praying` | Reaction — *thank you* (namaste). Never *Seva* (that is `hand-heart`) and never *pray* | regular · fill when hers | Chip `reaction` |
| `bookmark-simple` | Save for later / the Saved list. Never *favourite* | regular · fill when saved | Notifications header trailing, Post and story footer (IconButton S) |
| `whatsapp-logo` | WhatsApp — invite a friend, share, or message a friend she referred; opens WhatsApp. The one third-party mark allowed as an icon, because it is the app she already uses; never a generic *share* | regular | PromoCard `referral` Button leading, the friend's screen *Message on WhatsApp* row |
| `corners-out` | Watch full screen — opens the HowToClip `player` from an inline `guide`. Never *expand a card* (that is `caret-down`) | regular | HowToClip `guide` bar |

Not icons: smileys for Rating and the mascot are illustrations, not Phosphor glyphs — they live in the illustration library.
