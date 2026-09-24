# Reference read — the Refer tab (*Saheli*), proposed screen

| | |
| --- | --- |
| Source | One Android-frame screenshot from the design lead, 2026-09-24 (`00-refer-tab.png`, 319 × 2000; bands `01`–`06` at 2×). Same design family as *Expert (Sahil)* `KiQaNqLFaH1orma4Uf7hzU` — **proposed, not shipped** |
| Ask | "Read this thoroughly, see what components we can add to the DS" |
| Owner | The system, not a project (`projects/ACTIVE` is `beauty-job-cycle`; untouched) |
| Fed | `patterns/referral.md` (new) · HowToClip `guide` · ListItem `rank` leading and the *You* Tag · Statement rows with an Avatar · Nudge rank consequence · four reward assets · one icon |

## Step 1 — what is on the screen, top to bottom

| # | Band | Region | Strings |
| --- | --- | --- | --- |
| 1 | `01` | Header: back · **(i)** · language toggle *A/अ ▾* | — |
| 2 | `01` | Hero on a pink confetti stage with coins and gift boxes: *Saheli* wordmark · *Saheli Lao, Saath Mein Kamao* · pill *₹15,000 tak* | — |
| 3 | `01` | Primary Button **Refer Saheli** | — |
| 4 | `02` | *Saheli Stories* — three portrait video tiles, pink ring on the first, tags *Winner 🎁* and *Trending 🔥* | — |
| 5 | `02`–`03` | Purple section *Bumper Contest · Saheli lao, rewards jeeto 🏆*: three prize photos (cooler · 1 g gold coin · phone) on silver / gold / bronze podium blocks; leaderboard rows — medal · avatar · *Pooja Sharma · Earnings ₹20,000*; her row *25 · You* tinted; *Refer 3 more to people enter Top 3* with a hollow circle; dark Button **View Leaderboard**; *Ends on 23 March 2026* | — |
| 6 | `04` | Pink scalloped section *Top Saheli earnings near you!* — cards: Avatar 56 · *Sunita* · *HSR Layout* · *₹21000* green | — |
| 7 | `04` | Card *Your Referral Joining Bonus · Complete milestones to earn* › | — |
| 8 | `04`–`05` | *Your saheli referrals* — row *Total saheli earnings ₹2,000* ›; friend cards: placeholder avatar · *Kriti Patel ›* · *Day 7 completed* green · **Claim Bonus ₹2,000** green Button; *Sita Rao › · Day 5 completed* · phone and WhatsApp icon buttons · orange strip *⟳ Processing Bonus ₹2,000*; *Kriti Patel › · Day 7 completed* · green pill *Claimed ₹2,000 🤑*; outline Button **View all ›** | — |
| 9 | `06` | Inline 16:9 video of an expert in uniform: mute · scrubber with a knob · fullscreen | — |

## Step 2 — idea and expression

**Borrowable.** The order of the tab: hero offer → stories → contest → peers → her bonus → her friends → how it works. A contest shown as prizes on a podium plus the top three and *her* row pinned beneath with how far she is from the top. Peers' earnings as social proof. A friend as a line of money with a state: in progress, ready to claim, on its way, claimed. Call or message a friend who has stalled. A presenter video at the end.

**Skin that does not travel.** Confetti, coins and gift boxes on the hero; the *Saheli* wordmark; a purple section and a pink scalloped section as containers; green, orange and black buttons; medals as emoji-sized coins; *Winner 🎁*, *Trending 🔥*, *Bumper*, *tak*, *🤑*; romanised Hindi; a scrubber knob; an (i) icon.

## Step 3 — against the expert

| Failure | Where | Rule | Fix |
| --- | --- | --- | --- |
| Tinted sections as containers (purple contest, pink peers) | 5 · 6 | `card.md` colour by content, not container (P6) | page `bgSecondary`; each section is a Card with a heading |
| Green, orange, black and pink Buttons on one screen; a filled green *Claim Bonus* | 3 · 5 · 8 | `button.md`: one primary, tone `brand`; success is not a Button tone | one `primary` (the hero); every other action `secondary` / `tertiary` brand or `secondary neutral` |
| A Button inside a list row (*Claim Bonus*), two IconButtons in one row (phone, WhatsApp) | 8 | `list-item.md`: never a Button in a row; one IconButton max | the friend row opens her detail; *Claim* is the detail's one action |
| An (i) icon in the header | 1 | `header-nav.md`: removed — a 16 dp target hiding a sentence | *How it works* as an Accordion `faq` with Listen, at the foot of the tab |
| Two trailing header controls | 1 | HeaderNav: **one** trailing | keep `translate`; the explanation moves down |
| Currency in the illustration layer (coins, gifts, confetti) | 2 | `assets.md`: currency is reward layer; sparkles are the only flourish | the registered `referral-handover` character on the pink ground |
| Words in the art (*Saheli* wordmark, *₹15,000 tak* pill, *1 g* on the coin) | 2 · 5 | `assets.md` no text in assets | title *Up to ₹15,000 when a friend joins*; the coin is a prize photo |
| Emoji as tags and moods (🎁 🔥 🏆 🤑) | 4 · 5 · 8 | Phosphor only | story titles as words; `trophy` on the contest Tag; a claimed bonus is Amount `positive` |
| *Ends on 23 March 2026* · *Day 7 completed* · *Processing Bonus* | 5 · 8 | `content.md` § 5 dates; § 4 states say what is true then what happens | *Ends Mon 23 Mar 2026* · *7 of 7 days · ready to claim* · *On its way · in your bank by Fri 26 Sep* |
| A scrubber knob on the inline video | 9 | P3; `how-to-clip.md` knob-less | HowToClip `guide`: tap to play, sound toggle, knob-less bar, fullscreen |
| Her rank row shows a *You* Tag while the spec's `current` shows an Avatar `XS` | 5 | `list-item.md` `current` | in a list where every row already has an avatar, the marker is the word — spec gains the rule |
| *Refer 3 more to people enter Top 3* with a hollow circle | 5 | `nudge.md` condition → consequence | Nudge `gain`: *Refer 3 more friends* → rank medal *Top 3* |
| *View all* as an outline Button under a list | 8 | `card.md`: *See all ›* is a ListItem | ListItem `navigational` *See all 12 friends ›* |

Every idea survives; nothing needed a second look.

## Step 4 — tier, and what each region is built from

Sources in the fixed order — shipped app → `patterns/` → `components/` → invention.

| Region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| Header | HeaderNav `page` *Refer a friend* · trailing IconButton `translate` | `header-nav.md` | — | — |
| Hero + **Refer Saheli** | **PromoCard `referral` `full`** with `primary` **Invite on WhatsApp** | `promo-card.md` | media ground, character asset, title, Button | HeroCard `reward` — has no Button and the figure is not hers yet |
| Saheli Stories | HowToClip **`story`** circles with a title beneath (*Pooja's win*) | `how-to-clip.md` | 72 dp, ring = unwatched | the portrait tiles — a second shape for the same thing |
| Contest — podium | **Podium composition**: three prize photos (campaign content) over `asset/reward/podium` inside a Card with header *Contest* + description *Refer friends, win prizes · Ends Mon 23 Mar 2026* | `card.md`, `assets.md` | Card header description line | PromoCard `contest` ×3 — three Buttons where one is wanted |
| Contest — leaderboard | ListItem rows with a **`rank`** leading (medal assets 1–3, a number after), Avatar 40, name, Amount `md` trailing; her row **`current`** with Tag *You*, pinned after a Divider | `list-item.md` | 72 dp rows, Amount, `current` (In app) | — |
| *Refer 3 more…* | Nudge `gain` → rank medal · *Top 3* | `nudge.md` | 40 dp, condition → consequence | ProgressBar — a rank is not a fill |
| **View Leaderboard** | Button `secondary neutral` M **See leaderboard** in the Card footer | `button.md` | — | — |
| *Top Saheli earnings near you!* | **Peer tiles composition**: Card header *Referral earnings near you* · horizontal Stat `M` tiles, Avatar 56 above the label (*Sunita · HSR Layout*), Amount `md positive` | `stat-rating-divider.md`, `avatar.md` (56 = contest ranks) | Stat label-then-value | ListItem tiles — the shipped 56 dp avatar reads better as a tile |
| *Your Referral Joining Bonus* › | Card `tappable`: *Your joining bonus* · *3 milestones to ₹1,000* → Stepper `progression` screen | `card.md`, `stepper.md` | — | — |
| *Your saheli referrals* | **Statement**: band *Earned from friends* ₹2,000 · rows with an **Avatar leading** per friend · Amount `brand` + caret (ready to claim) / `locked` (in progress) / `positive` (claimed) · `schedule` panel *ON ITS WAY* with date tiles for processing bonuses · a ListItem *See all 12 friends ›* below | `statement.md` (In app) | band, rows, schedule, date tile | a card per friend with a Button — a Button in a row and four card shapes; the shipped money card already has every state |
| Friend detail (on tap) | pushed screen: HeaderNav *Sita Rao* · Stepper `progression` of her first 7 days · ListItems *Call Sita* (`phone`) · *Message on WhatsApp* (`whatsapp-logo`) · one Button **Claim ₹2,000** when ready → BottomSheet `info` *Reaches your bank with Friday's payout* | `stepper.md`, `list-item.md`, `bottom-sheet.md` | — | — |
| Inline video | **HowToClip `guide`** — 16:9 inline, tap to play, sound toggle, knob-less bar, `corners-out` to the full player | `how-to-clip.md` (new form, closes the ROADMAP open item) | player rules | the OS player |
| (i) | Accordion `faq` *How referral works* with Listen, under the video | `accordion.md` | — | Tooltip — she cannot discover it |

**Tier:** the whole tab is a Tier 2 composition of core components; no new component. Four variants on core (HowToClip `guide`, ListItem `rank` + *You*, Statement avatar rows, Nudge rank), four reward assets, one icon, one pattern.

## Step 5–6 — translation, side by side

| Screen | System | In one sentence |
| --- | --- | --- |
| Confetti hero, *Saheli* wordmark, *₹15,000 tak*, **Refer Saheli** | PromoCard `referral`: pink ground, `referral-handover` character, *Up to ₹15,000 when a friend joins*, **Invite on WhatsApp** `primary` | one shape for every offer; the amount is text; the Button says what happens |
| (i) + language toggle | `translate` alone; *How referral works* `faq` at the foot with Listen | one trailing control; nothing hides behind a 16 dp target |
| Portrait story tiles with *Winner 🎁* / *Trending 🔥* | `story` circles titled *Pooja's win* · *Sita's first month* · *How to invite* | the shipped circle; a title is a word, not a tag |
| Purple *Bumper Contest* section | Card *Contest* · *Refer friends, win prizes · Ends Mon 23 Mar 2026* | colour by content, not container |
| Prizes on a three-block podium | Podium composition: prize photos on `asset/reward/podium` | rank is the reward layer's job; prizes are campaign content |
| Medal · avatar · *Pooja Sharma · Earnings ₹20,000* | ListItem `rank` 1–3 (medal assets) · Avatar 40 · *Pooja Sharma* · Amount `md` ₹20,000 | the amount is the trailing value, not a description |
| *25 · You* tinted row | ListItem `current` with Tag `M soft brand` *You*, after a Divider | every row has an avatar, so the marker is the word |
| *Refer 3 more to people enter Top 3* ○ | Nudge `gain`: *Refer 3 more friends* → medal · *Top 3* | condition then consequence, in the shape she knows |
| **View Leaderboard** (black) · *Ends on 23 March 2026* | **See leaderboard** `secondary neutral` M; the date on the Card's description line | one primary per screen; the date sits with the contest's name |
| Pink scalloped *Top Saheli earnings near you!* | Card *Referral earnings near you* · Stat tiles: Avatar 56 · *Sunita* · *HSR Layout* · `+ ₹21,000` | the scallop is the Statement's signature; earned money is `positive` |
| *Your Referral Joining Bonus · Complete milestones to earn* › | Card `tappable` *Your joining bonus* · *3 milestones to ₹1,000* › → Stepper `progression` | numbers first; milestones are earned steps |
| Friend cards with **Claim Bonus**, phone + WhatsApp, *Processing*, *Claimed 🤑* | Statement: *Kriti Patel · 7 of 7 days · ready to claim* Amount `brand` › · *Sita Rao · 5 of 7 days* Amount `locked` *after day 7* · schedule *ON ITS WAY* **26 SEP** *Sita's bonus* ₹2,000 · *Kriti Patel · claimed Fri 12 Sep* `+ ₹2,000` | the shipped money card already has every state; the claim and the call live on the friend's screen |
| **View all ›** | ListItem `navigational` *See all 12 friends ›* | a Button is not a way into a list |
| Inline video with mute, knob, fullscreen | HowToClip `guide` *How referral works*: tap to play, `speaker-high` / `speaker-slash`, knob-less bar, `corners-out` | no drag-only control (P3) |

## Open for the design lead

1. **The *Saheli* wordmark.** Programme name or brand word? Treated here as the programme's name written as text (*a friend* in English, सहेली in Hindi/Marathi) per `content.md` § 8; a wordmark would need a decision like *Utsav Bonus*.
2. **Language toggle in this header.** `content.md` says language is one tap from Settings; a per-screen toggle suggests the referral message is sent in a chosen language. If so it belongs on the share sheet, not the header.
3. **What the leaderboard ranks** — referral count or referral earnings? Drawn as earnings; the Amount trailing follows.
4. **Prize photos on the podium** — campaign content, transparent ground, 96 dp each, supplied per contest.
5. **The bonus schedule** — day 7 of what? *7 of 7 days* is drawn as the friend's first seven working days; confirm with Growth before copy goes to the Hub.

## What landed, where

`patterns/referral.md` + page · `components/how-to-clip.md` § `guide` · `components/list-item.md` (`rank` leading; `current` in a list of people) · `components/statement.md` (Avatar rows; referral use) · `components/nudge.md` (rank consequence) · `foundations/icons.md` (`corners-out`; `whatsapp-logo` meaning widened) · `foundations/assets.md` (`rank-1/2/3`, `podium`) · `CHANGELOG.md` · `ROADMAP.md` · `DECISIONS.md`.
