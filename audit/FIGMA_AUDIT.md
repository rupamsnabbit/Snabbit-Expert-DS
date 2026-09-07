# Figma Components page — audit

Source: *Expert App — Design System 2.O*, page 🧩 Components (`1:3886`). 204 top-level frames classified into the tiers defined in `principles/EXTENDING.md`.

| Tier | Count | Meaning |
| --- | --- | --- |
| Core | 53 | Tier 1 — a system component. Gets a spec, semantic variables, package implementation. |
| Composition | 43 | Tier 2 — built from core components + tokens. Lives in its feature namespace; leaves the Components page. |
| Local | 17 | Tier 3 — feature-owned component. Tokens only, principles pass, briefed. Promote on third use. |
| Asset | 7 | Icon or illustration. Move to an Assets page / icon library. |
| Keep | 1 | Documentation. Move to its own page. |
| Housekeeping | 83 | Rename, merge, move out, or delete. |

## Proposed core set (30)

Accordion, Avatar, Badge, Banner, BottomSheet, BottomTabBar, Button, Card, Checkbox, Chip, CoinChip, DatePicker, Divider, HeaderNav, IconButton, ListItem, Nudge, ProgressBar, Radio, Rating, SelectionCard, Slider, Stat, Stepper, Tag, TextField, TierBadge, Timer, Toast, Tooltip

## Gaps — core components that do not exist yet

Toggle / Switch, Spinner / loading indicator, Skeleton, Dialog / Alert, Empty state, Offline banner (P5), SOS button (P7), Snackbar with action

## Classification

### Core (53)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [Accordion](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=894-7348) | 2 | Accordion | 2 variants. |
| [Avatars](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1234-6423) | 45 | Avatar | 45 variants (Size × Style × Persona). Fine. |
| [Badge - Parent](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=685-4021) | 12 | Badge | 12 variants. |
| [Banner](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1616-9990) | 2 | Banner | Banner (2) — merge into Status Banner. |
| [Banner +CTA](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1537-11688) | 1 | Banner | Banner +CTA — a Banner variant with action slot. |
| [Banners](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-8199) | 1 | Banner | Banners (1) — merge into Status Banner. |
| [Status Banner](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=666-3389) | 10 | Banner | Status Banner (10) is the base. Absorb Banners, Banner, Banner +CTA. |
| [Bottom Sheets](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1535-12163) | 15 | BottomSheet | 15 variants. Package owns scrim/elevation. |
| [Home navigation bar nav](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-15247) | 5 | BottomTabBar | 5 variants. Exists in code as SnabbitBottomTabBar. |
| [Buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2-8530) | 294 | Button | 294 variants, only Active/Disabled. Cut 9 styles → Primary, Secondary, Tertiary, Destructive, Link. Add Pressed, Loading, Focus. Fold Text into Tertiary; drop Success, Neutral Filled/Stroke as styles (status is not a button style). |
| [Progress Buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-13660) | 10 | Button · progress variant | 'Small fill / Half fill / Full fill' — a progress-fill button. Belongs as a Button variant (change to core), not a separate component. |
| [Cards - States](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=379-6040) | 4 | Card | Cards – States (4) is the base card. |
| [Check box](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=8-1322) | 18 | Checkbox | 18 variants, fine. |
| [Selection Chips](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=122-145) | 2 | Chip | Merge with Selection Pill. |
| [Coins & Card - Chips](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=531-2544) | 24 | CoinChip | 24 variants. Reward currency chip. |
| [Coins & Cards - Small](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=609-6820) | 6 | CoinChip | Coins & Cards – Small — size variant of CoinChip. |
| [Calendar](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=827-5182) | 3 | DatePicker | Calendar (3) — merge with 1598:7553. |
| [Calendar](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1598-7553) | 3 | DatePicker | Calendar (3) — duplicate. Merge. |
| [Date Picker](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=756-3531) | 2 | DatePicker | Date Picker (2) — base. |
| [Date](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=371-2306) | 3 | DatePicker · day cell | Date (3). |
| [Day Properties](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=827-5161) | 5 | DatePicker · day cell | Day Properties (5). |
| [Divider](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=83-119) | 5 | Divider | 5 variants. |
| [TopNav](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=8-116) | 6 | HeaderNav | 6 variants. Exists in code as SnabbitHeaderNav. |
| [Icon Buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1825-6970) | 60 | IconButton | 60 variants. Merge with 1847:11099. |
| [Icon Buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1847-11099) | 12 | IconButton | Duplicate set (12). Merge into 1825:6970. |
| [List](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1598-7354) | 3 | ListItem | List (3) — merge. |
| [List Items](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=579-2665) | 3 | ListItem | List Items (3) — base with leading/trailing slots. |
| [ListItem / meta](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=609-6107) | 2 | ListItem | ListItem / meta — variant. |
| [Nudge](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1581-6683) | 3 | Nudge | Gamification nudge; P6 says nudges are core. Spec against 'never blocks the next action'. |
| [Progress Bar](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=666-3317) | 34 | ProgressBar | 34 variants (linear, segmented). Fine; trim state explosion. |
| [Radio button](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=8-1091) | 15 | Radio | 15 variants, fine. |
| [Rating](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1550-11864) | 6 | Rating | 6 variants. Uses Smileys as its icon set. |
| [Complex Selection Cards](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=10-2791) | 2 | SelectionCard | Complex — variant. |
| [Date Selection Cards](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=10-2585) | 2 | SelectionCard | Date Selection — variant. |
| [Selectable Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=75-500) | 4 | SelectionCard | Selectable Card — duplicate concept, merge. |
| [Selection Cards with Description](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=19-133) | 6 | SelectionCard | with Description — variant. |
| [Selection Pill](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-9887) | 2 | SelectionCard | Selection Pill (Camera / Gallery) — a full-width option row with icon; reclassified from Chip to SelectionCard during the Chip spec. |
| [Simple Selection Cards](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=10-2334) | 4 | SelectionCard | Simple Selection Cards — base. Absorb the 6 other selection-card frames as variants. |
| [Slider](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1236-8652) | 5 | Slider | 💯 Percentage variants. Merge with 2524:8298; confirm whether interactive or display-only. |
| [Slider](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2524-8298) | 2 | Slider | Second Slider frame. Merge. |
| [Value](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=537-4277) | 6 | Stat | Value (6) — number + label. Small core primitive for earnings/metrics. Low confidence. |
| [Step Indicatorss](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-8388) | 3 | Stepper | 'Step Indicatorss' — rename. |
| [Tags](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=7-1574) | 84 | Tag | 84 variants (Color × Style × Size). Map colours to status tokens; tier colours only for tier. |
| [Input field](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=44-108) | 15 | TextField | 15 variants. Base for OTP, Number, Search, TextArea. |
| [Number Input](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=89-129) | 2 | TextField · Number | Fold into TextField as a variant. |
| [Mobile and OTP](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=44-280) | 4 | TextField · OTP / Mobile | Keep as TextField variants (mobile with +91 prefix, OTP boxes). |
| [Search Box](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-17604) | 2 | TextField · Search | Fold into TextField with leading icon + clear. |
| [Text Box](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-12793) | 2 | TextField · TextArea | Fold into TextField as multiline variant. |
| [Tier](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2485-7676) | 12 | TierBadge | 12 variants (Tiers × Use at). Owns TierColors. |
| [Timers](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=371-6294) | 8 | Timer | 8 variants. This is the countdown for the job alert — highest-stakes core component. Design the ring form (P5). |
| [Toast](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=519-2495) | 7 | Toast | 7 variants, fine. |
| [Colored Tooltip](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-17618) | 2 | Tooltip | Colored Tooltip — merge. |
| [Tooltips](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=537-4918) | 6 | Tooltip | 6 variants. Merge Colored Tooltip in. |

### Composition (43)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [States](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1678-6892) | 3 | ? | States (3) — unclear. Check. |
| [Widgets](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-12676) | 3 | ? | Widgets (3) — unknown contents. Check. |
| [Earnings Accordion](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1490-11066) | 2 | Accordion | Earnings Accordion. |
| [Badges Groups](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=666-3358) | 5 | Badge | Badges Groups — arrangement of Badge. |
| [Banner carousel](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1786-6804) | 1 | Banner | Banner carousel — composition of Banner. |
| [Block. unblock buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-14586) | 2 | Button | Block / Unblock — two Button instances with copy. Composition. |
| [Bottom Sticky](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1537-11919) | 2 | Button | Bottom Sticky — the fixed bottom action bar. Pattern, not component. |
| [Button Groups](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=9-2148) | 15 | Button | Button Groups: layouts of Button (stacked, side by side, 70/30). Keep as documented patterns, not components. |
| [Remind buttons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1534-11534) | 3 | Button | Remind buttons. |
| [Attendance](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-6419) | 7 | Card | Attendance (7). |
| [Attendance Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=582-2702) | 9 | Card | Attendance Card (9). |
| [Contact Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1589-7952) | 1 | Card | Contact Card. |
| [Earnings Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-14507) | 6 | Card | Earnings Card (6). |
| [Invite card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1545-11729) | 2 | Card | Invite card. |
| [Navigation Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-13181) | 4 | Card | Navigation Card (4) — merge with 1580:6548. |
| [Navigation Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-6548) | 4 | Card | Navigation Card (4) — duplicate. |
| [Summary Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=531-2478) | 6 | Card | Summary Card — earnings. |
| [Training centre](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-6268) | 2 | Card | Training centre (2). |
| [Progress Cards](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2489-8412) | 16 | Card + ProgressBar | Progress Cards (16). |
| [Metric Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-13010) | 4 | Card + Stat | Metric Card. |
| [Onboarding Step Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-8182) | 4 | Card + Stepper | Onboarding Step Card. |
| [Job States](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1533-11507) | 4 | Card + Tag | Job States (4). |
| [Training Timer Cards](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=134-1465) | 2 | Card + Timer | Training Timer Cards. |
| [Carousel Strip](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-14153) | 3 | Carousel | Carousel Strip. |
| [Categories](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-10192) | 18 | Chip | Categories (18) — service categories as selectable chips/cards. |
| [Coins & Cards - Groups](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=758-4947) | 6 | CoinChip | Coins & Cards – Groups — arrangement. |
| [Day Strip](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=869-4920) | 3 | DatePicker | Day Strip — horizontal week strip built from day cells. |
| [Navigation Button](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1679-6881) | 1 | IconButton | Navigation Button. |
| [Account Item](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=537-4754) | 5 | ListItem | Account Item — domain. |
| [Attendance List Item](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=609-3882) | 5 | ListItem | Attendance List Item — domain. |
| [Breakdown List](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=637-4266) | 3 | ListItem | Breakdown List — domain. |
| [Contact List](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1560-11849) | 1 | ListItem | Contact List — domain. |
| [List Items - Payout](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=537-5021) | 8 | ListItem | List Items – Payout (8) — domain. |
| [Pay Summary - List](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=542-3934) | 6 | ListItem | Pay Summary – List — domain. |
| [Referral list](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1537-11829) | 5 | ListItem | Referral list — domain. |
| [Table Components](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=974-5706) | 7 | ListItem | Table Components — key/value rows; compose from ListItem. Low confidence — check. |
| [Transaction states](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1558-11868) | 3 | ListItem | Transaction states. |
| [Progress Stat - List](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=666-3266) | 8 | ListItem + ProgressBar | Progress Stat – List — domain. |
| [Service Selection Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1237-10853) | 4 | SelectionCard | Service Selection Card — domain composition. |
| [Shift Selection Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-6540) | 8 | SelectionCard | Shift Selection Card (8) — domain composition. |
| [DOB Selection](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=89-99) | 2 | TextField + DatePicker | DOB Selection — composition. |
| [TIER PROGRESS](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2488-8490) | 5 | TierBadge + ProgressBar | TIER PROGRESS — composition. |
| [Bottom check-in / Acceptance screen](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1533-11600) | 3 | pattern | Bottom check-in / Acceptance screen — a screen fragment. Move to Patterns; it is the P2/P3 reference case. |

### Local (17)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [Chat Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-19268) | 2 | Chat | Chat Card. |
| [Message Container](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1568-12063) | 4 | Chat | Message Container — chat bubble. |
| [Contest Banner](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1543-13779) | 2 | Contest | Contest Banner. |
| [Contest Page Hero](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1543-13869) | 1 | Contest | Contest Page Hero. |
| [Contest Rules](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1540-12241) | 1 | Contest | Contest Rules. |
| [Contest fyi](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1543-12452) | 1 | Contest | Contest fyi. |
| [Reel](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2492-8230) | 2 | Contest | Reel. |
| [Rule number](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1540-12259) | 4 | Contest | Rule number. |
| [Map widget](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1582-7472) | 4 | Job · Map | Map widget (4). |
| [Maps](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1582-7327) | 1 | Job · Map | Maps. |
| [Document Upload Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-9974) | 3 | Onboarding | Document Upload Card — error states are good; keep. |
| [Tip Image Container](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1075-10055) | 4 | Onboarding | Tip Image Container. |
| [Manual Referral](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1574-8439) | 2 | Referral | Manual Referral. |
| [Camera Preview](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1594-6484) | 3 | Shield | Camera Preview. |
| [Kavach Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1490-11346) | 3 | Shield | Kavach Card. |
| [Over the app](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1564-12441) | 2 | Shield | Over the app — overlay states. |
| [PIP](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1548-12258) | 1 | Shield | PIP. |

### Asset (7)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [SNABBIT COIN](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2539-8337) | 2 | icon/coin | SNABBIT COIN — icon asset. |
| [Lock](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=545-2614) | 2 | icon/lock | Lock (2). |
| [Smileys](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1491-9039) | 15 | icon/smileys | 15 face states — icon assets for Rating. |
| [Icons Group](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=975-6018) | 4 | icons | Icons Group. |
| [Icons_Karma Bonus](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=666-3301) | 3 | icons | Icons_Karma Bonus. |
| [Pay Summary - Icons](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=545-2768) | 6 | icons | Pay Summary – Icons. |
| [Illustration - List Items](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=862-4989) | 5 | illustrations | Illustration – List Items. |

### Keep (1)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [Guidelines](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1289-7830) | 0 | docs | Guidelines section — move to its own page. |

### Housekeeping (83)

| Frame | Variants | Target | Note |
| --- | --- | --- | --- |
| [Referee pfp](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1534-11661) | 0 | Avatar | 'Referee pfp' — an Avatar instance. Delete. |
| [Bottom Sheets](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1825-6967) | 0 | BottomSheet | Stray Bottom Sheets symbol. Delete. |
| [Earnings Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1847-9629) | 0 | Card | Earnings Card instance stray. Delete. |
| [Training centre](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2232-7174) | 0 | Card | Training centre duplicate frame. Delete. |
| [Kavach Card](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1847-7050) | 0 | Shield | Kavach Card instance stray. Delete. |
| [Timers](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2477-7134) | 0 | Timer | Stray Timers frame (no variants). Delete after merging anything unique. |
| [Timers](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2477-7141) | 0 | Timer | Stray Timers frame. Delete. |
| [Frame 2147242534](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8941) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242535](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8943) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242536](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8945) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242537](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8947) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242538](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8949) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242539](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8951) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242540](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8953) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242541](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8955) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242542](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8957) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242543](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8959) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242544](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8961) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242545](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8963) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242546](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8965) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242547](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8967) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242548](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8969) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242549](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-8971) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242550](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=692-10624) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242552](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=715-12734) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242577](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=827-5143) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242604](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=894-6369) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242605](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=974-5124) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147242976](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1237-11121) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243554](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10696) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243555](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10700) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243556](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10702) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243557](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10704) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243558](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10706) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243559](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10708) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243560](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10710) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243561](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10712) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243562](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1492-10714) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243583](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1532-12616) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243584](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1533-11508) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243585](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1533-11596) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243586](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1535-11789) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243587](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1535-12158) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243588](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1537-11605) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243589](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1537-11841) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243599](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1550-11862) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243606](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-6359) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243607](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-6467) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243608](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1580-6675) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243609](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1582-9158) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243610](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1589-6548) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243611](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1594-6481) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243612](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1598-7305) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243613](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1598-7792) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Frame 2147243614](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1786-6801) | 0 | sections | Section-title banner. Replace with a Figma Section so the page is navigable. |
| [Box](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1237-8893) | 2 | — | Box (2) — unclear. Check. |
| [Building Blocks](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=29-2995) | 2 | — | Building Blocks (2) — unclear scratch. Check then delete or name. |
| [Check box](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2231-7109) | 0 | — | Stray Checkbox instance on the page. Delete. |
| [Component 24](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1534-11821) | 6 | — | 'Component 24' (6 variants, 401×939) — unnamed. Identify, rename or delete. |
| [Component 39](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1582-7227) | 2 | — | 'Component 39' — unnamed. Identify. |
| [DIAMOND - 01](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8256) | 0 | — | Stray text label 'DIAMOND - 01'. Delete. |
| [DIAMOND - 02](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8258) | 0 | — | Stray text label 'DIAMOND - 02'. Delete. |
| [Frame](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1847-9094) | 0 | — | 'Frame' (393×852) — a screen. Move out. |
| [Frame 2147239652](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1847-10754) | 0 | — | Frame 2147239652 (393×756) — a screen. Move out. |
| [Frame 2147241321](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1708-6952) | 1 | — | Frame 2147241321 (1 variant) — unnamed. |
| [Frame 2147241471](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=756-3520) | 0 | — | Frame 2147241471 — unnamed. |
| [Frame 2147242575](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=758-4507) | 0 | — | Frame 2147242575 (40×40) — stray. |
| [Frame 2147242576](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=758-4509) | 0 | — | Frame 2147242576 (40×40) — stray. |
| [Frame 2147242975](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=975-6015) | 0 | — | Frame 2147242975 — stray symbol. |
| [Frame 2147243598](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1550-11779) | 1 | — | Frame 2147243598 (1 variant) — unnamed. |
| [Frame 2147243605](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1568-14840) | 0 | — | Frame 2147243605 (10 children, 1004×1191) — looks like a screen. Move out. |
| [Frame 2147243617](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=1820-6826) | 0 | — | Frame 2147243617 — unnamed. |
| [Frame 2147243863](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2637-8327) | 0 | — | Frame 2147243863 (68×20) — stray. |
| [GOLD -01](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8254) | 0 | — | Stray text label 'GOLD -01'. Delete. |
| [NO TIER - 01](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2538-8314) | 0 | — | Stray text label 'NO TIER - 01'. Delete. |
| [NO TIER - 02](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2538-8315) | 0 | — | Stray text label 'NO TIER - 02'. Delete. |
| [PINK DIAMOND - 01](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8260) | 0 | — | Stray text label 'PINK DIAMOND - 01'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8253) | 0 | — | Stray text label 'TIER'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8255) | 0 | — | Stray text label 'TIER'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8257) | 0 | — | Stray text label 'TIER'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2538-8312) | 0 | — | Stray text label 'TIER'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2517-8259) | 0 | — | Stray text label 'TIER'. Delete. |
| [TIER](https://www.figma.com/design/QjXqQZVAqLoRmH1j7foH1I/Expert-App---Design-System-2.O?node-id=2538-8313) | 0 | — | Stray text label 'TIER'. Delete. |
