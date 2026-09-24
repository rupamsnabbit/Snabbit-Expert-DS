# Reference read — *Expert (Sahil)* → section `8510:23259` — rewards, referral, notifications

| | |
| --- | --- |
| Source | Figma *Expert (Sahil)* `KiQaNqLFaH1orma4Uf7hzU` · section `8510:23259` (5199 × 3704) — a working sheet of new surfaces, **proposed, not shipped** |
| Read | 2026-09-24 from a full-size render (`00-section.png`) and eleven crops (`01`–`10`); the node tree would not parse through the Figma connector, so strings were read from the render |
| Ask | "This section has new components that I want to add to the DS — observe all the elements and help me create and add them" |
| Owner | **The system, not a project.** `projects/ACTIVE` names `beauty-job-cycle`; nothing here was written into that folder. These are core asks and land in `components/`, `foundations/` and `patterns/` |
| Registered | `references/SCREENS.md` → *Expert (Sahil)* row, same day |

## Step 1 — what is on the sheet

Eleven families, roughly seventy frames. Strings are quoted as drawn (romanised Hindi and English mixed).

| # | Crop | Family | Count | Strings that matter |
| --- | --- | --- | --- | --- |
| 1 | `01` | **Utsav Bonus card** — purple gradient top with a wordmark and *₹6000*; white footer *Deducted: ₹0 · Balance: ₹6000* | 1 | a bonus wallet: headline amount, two facts under it |
| 2 | `02` | **Shakti Bonus row** — title, caret, three cells: hexagon badge C / S / P with *₹1,500 · ₹2,500 · ₹3,500* | 1 | the three Shakti tiers and what each pays |
| 3 | `03` | **Top Saheli earnings near you** — pink panel with a scalloped top edge, close ✕, horizontal cards: avatar · *Sunita · HSR Layout* · *Earned ₹21000* in green | 1 | other experts' earnings as motivation |
| 4 | `04` | **Referral banners** — character illustration bleeding out of a tinted strip, title + subtitle, close ✕: *Maya ne mobile jeeta! Aap bhi saheli lao, rewards kamao* · *Ek Saheli lao, 10 job ka paisa kamao!* | 2 | a friend's win as a reason to refer |
| 5 | `05` | **Referral cards** — tinted card with a coloured border, hero art (cash bundle *KAMAO 15,000*, money bag, two experts handing over a Snabbit box), two-line copy, **Invite via WhatsApp** in green, orange, pink, purple or black | 6 | *Saheli lao, saath mein ₹15,000 tak kamao* · *Ek saheli lao aur kamao 10 job ka paisa* |
| 6 | `06` | **Festival card** — *✦ Festival Finds ✦* eyebrow, *UTSAV BONUS* wordmark, *This Ganesh Chaturthi, win exciting rewards!*, **Claim now** in purple | 1 | a campaign bonus |
| 7 | `07a–c` | **Contest cards** — eyebrow pill (*For You* · *Phone @₹0* · *Rewards Jeeto 🏆* · *Free Gold Coin* · *Jeeto Har Mahina 🏆* · *Free Tablet*), a product photo (fridge, phone, laptop, cooler, washing machine, stove, tablet, cycle, dinner set, mixer, cooker, TV, gold coin, silver coin), two-line copy, one button (*View Contest* · *Free Phone* · *Refer Saheli* · *Gold Coin @₹0* · *Free Silver Coin* · *Free Cooler* · *Washing Machine Jeeto!* · *Tablet @₹0* · *Free TV!* · *Cooker Ghar Lao*) in blue, pink, black, orange, purple or green | 15 | a prize for referring |
| 8 | — | Product image tiles (fridge, TV) | 4 | exported prize photos, not UI |
| 9 | `08` | **Day detail cards** — tinted top with an image (Ganesh idol · spin wheel · pink S coin · green ✓ disc · red ✕ disc · gold-coin ribbon · 🥹 emoji), close ✕, coloured title, body, **Okay!**: *13 Sep, Utsav Day · If Absent, −₹2000 will be deducted* · *14 Sep, Free spin day! · Win Gold coins, Silver coins and more!* · *16 Sep, Snabbit Coin · Congratulations! You've won a Snabbit coin* · *16 Sep, Present · Good job!* · *16 Sep, Absent · You missed the full shift* · *Congratulation! You've won a Gold Coin* · *Better luck next time! Next spin on 18 Sep.* | 7 | what happened, or will happen, on one day |
| 10 | `09a–b` | **Notification Centre** screen — back · title · bookmark; *Stories* row of portrait thumbnails (one with a pink ring); filter chips *All · Information · Alert · Training · Incentive*; feed posts: icon disc or avatar · title · *Today* / *Yesterday*, 16:9 image or video with a view count (*120* · *1.1K* · *100K*) and a play disc, two lines of body, a reaction row (♥ · 🔥 2 · 👍 1 · 😍 1 · 🙏 120) and a bookmark; one post has an image carousel with dots on the image | 1 screen | the app talking to her outside a job |
| 11 | `10` | **Story viewer** — full-screen portrait video, back and close, a scrubber with a knob and *01:31/02:42*, title, two lines of body, the same reaction row and bookmark | 1 screen | one story, full screen |

## Step 2 — idea and expression

**Borrowable (structure, order, interaction, states)**

- One promotional card shape used twenty-two times: something to win or earn, a picture of it, one line, one button. Eyebrow tag as the *kind* of offer.
- A bonus wallet that shows the headline and, beneath it, what was deducted and what is left.
- A bonus's tiers as three cells with their badge and amount, collapsible.
- Peers' earnings as social proof for referral.
- A friend's actual win as the referral nudge (*Maya won a phone*).
- Tapping a day opens a card: the date, what it was, what it meant in money or coins, one way out.
- A notification centre with stories on top, category filters, posts with media and reactions; a full-screen story with title, body and reactions.

**The sheet's own skin (does not travel)**

Six card fills and border colours; six button colours; purple, orange, blue and black as accents; gradient tops; wordmarks with words inside the art; product photos on coloured stages; emoji as icons and as reactions; romanised Hindi; exclamation marks; *Okay!*, *View Contest*, *Claim now*, *@₹0*; a draggable scrubber; dots on top of the image.

## Step 3 — run it against the expert

| Failure | Where | Rule | Fix |
| --- | --- | --- | --- |
| Colour carries no meaning — six fills, six button colours, five title colours mean only *different* | 5 · 6 · 7 · 9 | P6: for someone who reads slowly colour is a language; `card.md` *colour by content, not by container*; `button.md` one primary | One surface (`bgPrimary`, `borderDefault`), one button tone (`brand`), identity carried by the asset and the eyebrow Tag |
| Words inside artwork — *KAMAO 15,000*, *UTSAV BONUS*, *1 GRAM GOLD COIN* | 5 · 6 · 9 | `assets.md` style lock: no text inside assets, words cannot be translated | Amounts are `Amount`; names are text; the art shows the thing |
| Emoji as icons (🏆) and as reactions (🔥 👍 😍 🙏) and as a mood (🥹) | 7 · 9 · 10 | Phosphor only; `content.md` § 2 | `trophy` (registered: contest); reactions as Phosphor `heart` · `thumbs-up` · `hands-clapping` · `hands-praying`; the miss state is words, not a face |
| `fire` for a reaction | 10 | `icons.md`: `fire` already means *streak* — one icon, one meaning | not offered as a reaction |
| Bare agreement label *Okay!*; noun buttons *Free Phone*, *Free TV!*; *View Contest*; *Claim now* | 7 · 9 | `content.md` § 3 verbs, § 9 banned | *Got it* · *See contest* · *Invite on WhatsApp* · *Claim bonus* |
| Exclamation marks, *Congratulations!*, *Better luck next time!*, *You missed the full shift* as a headline | 9 | `content.md` § 2, § 4 (miss: fact, number, way back, no shame), § 9 | *Present · Full shift* Tag · *Absent · Full shift* Tag + *Log in by 6:40 am tomorrow to keep your streak* · *No coin this spin · Next spin 18 Sep* |
| Romanised Hindi as the copy | 4 · 5 · 7 | P9 and `content.md` § 7: English master, Hindi ships in Devanagari; romanised Hindi is not one of the four scripts | Masters written in English here; the Hub translates |
| *@₹0*, *Information*, *Alert*, *Incentive* | 7 · 10 | `content.md` § 8: *Bonus* not *incentive*; jargon | *Free* is said in the sentence; chips *All · Updates · Important · Training · Bonuses* |
| Draggable scrubber with a knob; duration digits | 11 | P3: no drag-only interactions; `how-to-clip.md` player is knob-less | progress bar without a knob; *1:31 / 2:42* stays as Caption because a 2–3 min story needs it |
| Dots on top of the photo | 10 | `page-indicator.md`: never on the image | PageIndicator 12 dp below the media, inside the card |
| A truncated post title (*…consectetur.co*) | 10 | P9: text wraps, never truncates | title wraps to two lines |
| A centred dialog with a close ✕ | 9 | `bottom-sheet.md`: the sheet is the only modal surface | BottomSheet `info` |
| Religious imagery (Ganesh idol) as a status image | 9 | `assets.md`: assets are registered, one meaning; no rule yet on festival imagery | **open** — see below |
| A product photo as a design-system asset | 7 | `assets.md`: product images are content, not assets | prize photos are campaign content in the media slot |
| Five side-by-side promo buttons in a row of five cards | 7 | P2: one next action per screen | grid or carousel of ≤ 5, buttons `secondary` M; `primary` only when the card is the screen's one action |

Nothing here failed the test outright; every idea survives translation.

## Step 4 — tier, and what each is built from

Sources in the fixed order — shipped app → `patterns/` → `components/` → invention.

| # | Family | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- | --- |
| 1 | Utsav Bonus card | **HeroCard** `reward` with the new **`facts`** bottom (two Stat `S`) | `components/hero-card.md` | top: label BodyLg · Stat L · reward asset; bottom: bgPrimary 16 padding | Statement `band` — has the headline but its bottom is rows, not two facts; Card `static` — no filled top |
| 2 | Shakti Bonus row | **Card `expandable`** header + body of three Stat `S` with badge assets | `components/card.md`, `stat-rating-divider.md` | Card header 48 · caret rotates · Stat S BodyLg SemiBold · assets `asset/badge/shakti-*` | RateTable `matrix` Shakti row (shipped rate card) — right data, but a table; here she wants the three tiers at a glance |
| 3 | Peer earnings strip | **Card** (header title + dismiss IconButton XS) + horizontal row of **ListItem** tiles (Avatar 40 · name · locality · Amount `sm positive`) | `components/card.md`, `list-item.md` | ListItem 72 with a 40 leading · Amount tone | Banner — not a condition; Nudge — not about her next action. **Tier 2 composition**; home: a future `patterns/referral.md` |
| 4 | Referral banners | **Banner `brand`** with `Leading: Asset` 40 dp, title + body, dismiss | `components/feedback.md` | as specced | — |
| 5 | Referral cards | **PromoCard `referral`** | `components/promo-card.md` (new) | Card radius · border · padding; Button M; Tag M | Card `static` + media + footer — media is 16:9 full-bleed and the footer forbids a filled Button; six-card families would need four exceptions |
| 6 | Festival card | **PromoCard `campaign`** | same | same | same |
| 7 | Contest cards | **PromoCard `contest`** in a `pair` grid or `carousel` | same | same; prize photo is content | same |
| 8 | Product tiles | not UI — campaign content | — | — | — |
| 9 | Day detail cards | **BottomSheet `info`** with the new **day** recipe: date line · asset · title · body · *Got it* | `components/bottom-sheet.md` | sheet anatomy as specced; Tag `success` / `error` for Present / Absent; Nudge `loss` for a future deduction | Popover `detail` — non-modal, whitelisted to maps; Card — no tinted dialogs |
| 10 | Notification Centre | **pattern** — HeaderNav `page` · HowToClip `story` row · Chip `filter` · **Post** composition (Card header · media · body · reactions footer) · **Chip `reaction`** (new kind) · IconButton S `bookmark-simple` | `patterns/notification-centre.md` (new); `chip.md`, `card.md` | Card slots; ListItem header; PageIndicator; HowToClip duration chip for views | — |
| 11 | Story viewer | **HowToClip `player`** in the new **`story`** mode | `components/how-to-clip.md` | player anatomy: close, knob-less progress, captions | the OS player — scrubber, share, landscape |

One new core component (**PromoCard**, Tier 1, build request — it names the shipped image banner carousel on Home as the thing it tried). Four variants on existing core (HeroCard `facts`, Chip `reaction`, BottomSheet day recipe, HowToClip `player · story`). Two Tier 2 compositions (Shakti row, peer strip). One new pattern.

## Step 5–6 — translation, side by side

| Figma | System | In one sentence |
| --- | --- | --- |
| Six card colours and six button colours across referral and contest cards | one PromoCard: `bgPrimary`, `borderDefault`, media ground `bgBrandSubtle`, Button `brand` | P6 — hue is a language here, and six hues meaning *different prize* teaches her nothing |
| *KAMAO 15,000* painted into the cash bundle | *Up to ₹15,000 when a friend joins* as the title; the art shows two experts and a Snabbit box | `assets.md` — words in art cannot be translated or read aloud |
| *Invite via WhatsApp* (19 chars) in five colours | **Invite on WhatsApp**, `whatsapp-logo` leading, one tone | 18-character budget; the icon is the meaning |
| *View Contest* · *Free Phone* · *Tablet @₹0* · *Free TV!* | **See contest** on every contest card; the prize is in the title | verbs, one label to learn (P2, `content.md` § 3) |
| Eyebrow pill *Rewards Jeeto 🏆* in five colours | Tag `M soft brand` *Contest* with `trophy`, top-centre of the media ground | Phosphor only; the Tag already exists |
| *Festival Finds* · *UTSAV BONUS* wordmark · *Claim now* | Tag *Festival* · title *Utsav bonus* · body *Win rewards this Ganesh Chaturthi* · **Claim bonus** | a bonus is named in text like *Summer bonus* and *Shakti bonus* are |
| Utsav Bonus purple hero, *Deducted ₹0 · Balance ₹6000* | HeroCard `reward`: *Utsav bonus* · Amount L ₹6,000 · reward asset; bottom `facts`: *Deducted* ₹0 · *Balance* ₹6,000 as two Stat `S` | the shipped hero shape with a two-fact bottom (Indian grouping on the amount) |
| Shakti Bonus caret row with C / S / P hexagons | Card `expandable` *Shakti bonus*; body three Stat `S`: badge asset 24 · *Classic* ₹1,500 · *Super* ₹2,500 · *Premium* ₹3,500 | the badges are already registered; the label names the tier before the number |
| *Top Saheli earnings near you!* pink scalloped panel | Card header *Experts near you earned* + dismiss; ListItem tiles *Sunita · HSR Layout* · `+ ₹21,000` | no scallop (the scallop is the Statement's signature, `statement.md`); Amount `positive` because it is money earned |
| *Maya ne mobile jeeta! Aap bhi saheli lao…* strip with art bleeding out | Banner `brand`, asset 40 inside the row, title *Maya won a phone by referring* · body *Refer a friend and you can too* · dismiss | Banner already allows an asset leading; art stays inside the row so the row is one target |
| Day cards as centred dialogs with coloured titles and *Okay!* | BottomSheet `info` · date line Caption *Sat 13 Sep* · asset 96 · title Heading3 · body · **Got it**; Present / Absent as Tags | the app has one modal surface; status by Tag, not by title colour |
| *If Absent, −₹2000 will be deducted* | Nudge `loss` inside the sheet: *Work on Utsav day* · `− ₹2,000` | condition, then consequence, in the shape she already knows |
| *You missed the full shift · Okay!* | Tag `error` *Absent · Full shift* · body *Log in by 6:40 am tomorrow to keep your streak* · **Got it** | `content.md` § 4 miss: fact, way back, no shame |
| *Better luck next time! Next spin on 18 Sep.* with 🥹 | *No coin this spin · Next spin Thu 18 Sep*, spin-wheel asset | no face for a miss; the date tells her when to come back |
| Stories as portrait rounded thumbnails, pink ring | HowToClip `story` circles, `borderBrand` ring unwatched, `borderDefault` watched | the shipped circle; the ring already means unwatched |
| Chips *All · Information · Alert · Training · Incentive* | Chip `filter` *All · Updates · Important · Training · Bonuses* | her words (`content.md` § 8: *Bonus*, never *incentive*) |
| Post: icon disc · truncated title · *Today*; media with 👁 *120*; 2-line body; ♥ 🔥2 👍1 😍1 🙏120; bookmark | **Post**: Card header (icon box 40 or Avatar · title wraps 2 lines · meta *Today*) · media 16:9 with *120 views* chip and `play` disc · body ≤ 3 lines · footer: Chip `reaction` × ≤ 4 + IconButton S `bookmark-simple` | one card, every slot already exists except the reaction chip |
| Dots on the image | PageIndicator 12 dp below the media | `page-indicator.md` |
| Story viewer with a scrubber knob, *01:31/02:42* | HowToClip `player · story`: knob-less progress, Caption *1:31 / 2:42*, title + body over the scrim, reactions row | P3 — nothing essential is drag-only; the time stays because a story is minutes, not seconds |

## Open for the design lead

1. **Festival imagery.** The Utsav card and the 13 Sep day card use a Ganesh idol. The asset register has no rule on religious imagery. Proposal: a generic festive scene (`asset/scene/festival` — diya, marigold, sparkles, illustration layer) for any festival bonus, with the festival named in text. Needs a yes before any festival asset is made.
2. **Utsav bonus wordmark.** Is *Utsav Bonus* a brand word like *Snabbit* (stays Latin, may have a mark) or a bonus name like *Summer bonus* (text, translated)? This read treats it as a bonus name.
3. **Where the day cards open from.** The sheet shows seven day details but not the surface that opens them — a month calendar with markers is implied (`week-strip.md` says a day may open its detail; `date-picker.md` `month` has markers). Confirm the calendar before the Rewards home is drawn.
4. **Prize photos on the contest cards** are campaign content from Growth, supplied per contest, and are never registered as assets. Confirm that the team can supply them on a transparent ground at 160 dp.
5. **Reactions — which four.** Registered here: `heart` (love this), `thumbs-up` (like), `hands-clapping` (well done), `hands-praying` (thank you). 🔥 is not offered because `fire` means *streak*. If Growth needs a different set, the register changes, not the component.
6. **Saheli.** The shipped Refer tab says *Refer Saheli*. Added to `content.md` § 8: in English copy she is *a friend*; in Hindi and Marathi सहेली; Kannada uses its own word. Confirm the Hub is happy with *friend* in English.

## What landed, where

`components/promo-card.md` + live page · `components/chip.md` § `reaction` · `components/card.md` (Kinds row, media additions, footer `reactions`, the Post composition) · `components/bottom-sheet.md` § Day detail · `components/hero-card.md` § `facts` · `components/how-to-clip.md` § `player · story` · `patterns/notification-centre.md` + page · `foundations/icons.md` (six meanings) · `foundations/assets.md` (three assets, one open) · `foundations/content.md` § 8 *Saheli* · `references/SCREENS.md` · `CHANGELOG.md` · `ROADMAP.md` · `DECISIONS.md` 2026-09-24.
