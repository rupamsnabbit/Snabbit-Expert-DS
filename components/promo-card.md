# PromoCard

Status: **Proposed** · **Build request** · Tier 1 Core · Package: `SnabbitPromoCard` (new) · Figma: no component — drawn twenty-two times as loose frames in *Expert (Sahil)* `KiQaNqLFaH1orma4Uf7hzU` section `8510:23259` (read: `references/expert-sahil-rewards-2026-09-24/`). Reuse rejected: the shipped Home carousel *More from Snabbit* (`87:25332`) shows promotions as **flat images** — an image cannot wrap Kannada at font scale 1.3, cannot be read aloud, and cannot hold a Button, so the card is built, not pasted.

A card that offers her something — a referral bonus, a contest prize, a festival bonus — with a picture of it, one line saying what it is, and one Button that starts it. It is the shape the Growth team draws most and the one the system had nowhere to put: `Card` forbids tinted fills and filled Buttons in its footer for good reasons, and a promotion needs a picture on a stage and one action. This spec gives promotions one shape so twenty-two frames become one component with three kinds, and so a new campaign is content, not design.

---

## What changes from the Figma sheet

| Today (the sheet) | Proposed | Why |
| --- | --- | --- |
| Six card fills, six border colours, six button colours across referral, contest and festival cards | One surface: `bgPrimary`, 1 dp `borderDefault`, `radius.lg`; media ground `bgBrandSubtle`; Button tone `brand` | P6 — for someone who reads slowly colour is a language, and six hues meaning *a different prize* teach her nothing. Identity is the asset and the eyebrow Tag. |
| Amounts and names painted into the artwork (*KAMAO 15,000*, *UTSAV BONUS*) | Amounts in the title as text; art shows the thing | `foundations/assets.md` — words inside an asset cannot be translated or spoken |
| Eyebrow pill in five colours with 🏆 emoji | Tag `M soft brand`, Phosphor `trophy` where it is a contest | Phosphor only; the Tag exists |
| Buttons: *View Contest* · *Free Phone* · *Tablet @₹0* · *Free TV!* · *Claim now* · *Invite via WhatsApp* | Three labels: **Invite on WhatsApp** · **See contest** · **Claim bonus** (or **Show me**) | `content.md` § 3 — a verb that names the outcome, ≤ 18 characters; one label per kind to learn |
| Romanised Hindi copy with exclamation marks | English master, sentence case, no exclamation marks; the Hub translates into four scripts | `content.md` § 2, § 7 |
| Five cards in a row, each with a filled button | `pair` grid (2 across, ≤ 6) or `carousel` (≤ 5 with a PageIndicator); Buttons `secondary` M. `primary` only when the card is the screen's one action | P2 one next action; `page-indicator.md` ≤ 5 pages |
| Product photos on coloured stages | Prize photo is **campaign content** in the media slot, contain-fit on the `bgBrandSubtle` ground | `assets.md` — product images are content, never registered assets |

---

## Anatomy

```
┌─────────────────────────────────────────┐  radius lg · border thin borderDefault · bgPrimary · width 328 (full) or 156 (pair)
│ ┌─────────── media ground ────────────┐ │  bgBrandSubtle · 120 dp tall (full) / 96 (pair) · top corners follow the radius
│ │        [ Contest 🏆 ]               │ │  eyebrow · Tag M soft brand · top-centre · 8 dp inset · optional
│ │                                     │ │
│ │            ( asset )                │ │  asset 96 dp (full) / 64 (pair) · registered scene / character / reward · or a prize photo
│ └─────────────────────────────────────┘ │
│   Up to ₹15,000 when a friend joins     │  title · BodyLg Medium textPrimary · centred · ≤ 2 lines · ≤ 48 chars
│   Paid after her first 10 jobs          │  body · BodyMd textSecondary · centred · 1 line · optional
│ ┌─────────────────────────────────────┐ │
│ │  [whatsapp]  Invite on WhatsApp     │ │  Button M · secondary brand (grid / carousel) or primary brand (the screen's one action) · full width
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘  padding 16 · gap 12 · 12 dp between cards
```

| Part | Spec |
| --- | --- |
| Container | `bgPrimary`, 1 dp `borderDefault`, `radius.lg`, flat. Never tinted, never shadowed, never a coloured border — the same rules as `card.md` |
| Media ground | `bgBrandSubtle`, full width of the card, 120 dp tall (`pair`: 96). It is the illustration layer's own pink stage, so a registered scene sits on it without a second background |
| Eyebrow | One Tag `M soft brand`, top-centre of the ground, `spacing.3` inset; a Phosphor 14 dp icon from the register where one applies (`trophy` for a contest). Optional; absent on `referral` |
| Asset | 96 dp (`pair`: 64) from `foundations/assets.md` — character scene for referral, reward asset for a bonus — **or** a prize photo supplied by the campaign, contain-fit, transparent ground. Never text inside it |
| Title | `BodyLg` Medium `textPrimary`, centred, wraps to two lines, never truncates; ≤ 48 English characters; numbers first where there is a number |
| Body | `BodyMd` `textSecondary`, one line, optional — the condition (*Paid after her first 10 jobs*) or the date (*Ends Sun 28 Sep*) |
| Button | Button `M` full width. `secondary · brand` inside a grid or carousel; `primary · brand` when the card is the screen's one next action (the referral card on the Refer tab). Leading icon where the action has one (`whatsapp-logo`). Never `accept`, never `danger` |

The card is **not tappable**. The Button is the one target; tapping the picture does nothing (P3: one tap target per card, or many small ones — never both, `card.md`).

---

## Kinds

| Kind | Eyebrow | Asset | Title says | Button | Where |
| --- | --- | --- | --- | --- | --- |
| `referral` | none | `asset/character/referral-handover` — two experts, one handing over a Snabbit box | the bonus and the condition: *Up to ₹15,000 when a friend joins* · *10 jobs' pay when a friend joins* | **Invite on WhatsApp** (`whatsapp-logo`) → the OS share sheet with the referral message and code | Refer tab hero (`primary`), Home carousel (`secondary`) |
| `contest` | Tag *Contest* with `trophy` | the prize photo (campaign content) | the prize and how: *Refer a friend, win a fridge* · *Refer 3 friends, win a mixer* | **See contest** → the contest screen (rules, her count, the deadline) | Refer tab grid, Home carousel |
| `campaign` | Tag with the campaign's kind: *Festival* · *This month* | a reward asset (`asset/reward/*`) or a festival scene | the bonus by name and what to do: *Utsav bonus · Work every day this week* | **Claim bonus** when there is money to claim · **Show me** when there is something to learn | Home, Earnings, Rewards |

A `contest` card never shows a price (*@₹0*) — the title says *win*, and *free* is already the meaning. A `campaign` card never shows an amount she has not earned as an `Amount` `positive`; a possible bonus is `Amount` `brand` (*Earn ₹6,000*) per `amount.md`.

---

## Layouts

| Layout | Width | Count | Button | Notes |
| --- | --- | --- | --- | --- |
| `full` | 328 dp | 1 | `primary` M if it is the screen's one action, else `secondary` | The Refer tab's hero; a Home card |
| `pair` | 156 dp, 2 across, `spacing.4` gap | ≤ 6, then a ListItem `navigational` *See all contests ›* | `secondary` M | Media ground 96, asset 64, title still 2 lines. At font scale 1.3 the grid drops to one column before any title clips |
| `carousel` | 328 dp, 24 dp peek of the next | ≤ 5 with a **PageIndicator** 12 dp below | `secondary` M | Promotional carousels may auto-advance per `page-indicator.md`: 6 s, pause on touch, one loop. Never auto-advance when a card's Button is `primary` |

---

## States

| State | Rendering |
| --- | --- |
| default | as drawn |
| pressed | the Button's own pressed state; the card does not wash |
| `ended` | Tag `M soft neutral` *Ended* replaces the eyebrow; asset at 40 % opacity; Button `disabled` with its reason under it in `BodyMd` `textSecondary`: *Ended Sun 28 Sep*. Shown for 7 days so she can see the result, then removed |
| `entered` (contest) | Tag `M soft success` *You're in · 2 of 3* with `check-circle`; Button **See contest** stays | progress lives on the contest screen, not on the card |
| loading | Skeleton: ground, one title bar, one Button bar; never a spinner |
| offline | `referral` works — WhatsApp is another app; `contest` and `campaign` Buttons are `disabled` with *Needs internet* under them, never hidden |

A card whose campaign has not started is not shown. A card she has dismissed is not shown again for that campaign; dismissal is a Banner's job, not the card's — a PromoCard has no ✕.

---

## Behaviour

- **Invite on WhatsApp** opens the OS share sheet targeted at WhatsApp with the referral text and her code pre-filled; on return, a Toast *Invite sent* is **not** shown — the app cannot know it was sent (P5: honest states). The Refer tab's list shows friends as they join.
- **See contest** opens the contest screen; **Claim bonus** opens the bonus's `confirm` or `info` sheet; **Show me** opens a HowToClip or an `info` sheet.
- One `primary` PromoCard per screen, and only when the screen exists for that promotion (the Refer tab). Everywhere else the Button is `secondary`, so the screen's own primary keeps its place (P2).
- No sound, no haptic beyond the Button's own. No motion beyond the carousel's slide (`motion.standard`, `easing.move`) and its PageIndicator. Reduced motion: no auto-advance, no slide.
- The asset is never required for meaning (P8): with images blocked the ground stays pink and empty, the title and Button carry everything.

---

## Content

- Title: the offer in her words, numbers first, ≤ 48 English characters, two lines at most in Kannada at 1.3: *Up to ₹15,000 when a friend joins* · *Refer a friend, win a fridge* · *Utsav bonus · Work every day this week*.
- Body (optional, one line): the condition or the date: *Paid after her first 10 jobs* · *Ends Sun 28 Sep*.
- Buttons: **Invite on WhatsApp** · **See contest** · **Claim bonus** · **Show me**. Never *View*, *Claim now*, *Free …*, *… @₹0*, *Refer Saheli* as a button.
- Eyebrow: one word — *Contest* · *Festival* · *This month*. Never *For you*, *New!*, *Hurry!*.
- *Saheli* is the shipped word for the friend she refers (`content.md` § 8); in English copy she is *a friend*.
- Spoken (on the card's Listen where a screen has one): *"Up to fifteen thousand rupees when a friend joins. Invite on WhatsApp."*

---

## Accessibility

- The card is a group named by its title; the Button is the one control, 48 dp tall and full width — well past the target rule.
- Contrast: title `textPrimary` on `bgPrimary` 17.7:1; body `textSecondary` 4.8:1; Tag soft brand `textBrand` on `bgBrandSubtle` 4.2:1 at 12 sp Medium with the icon as second channel (`tag.md`); Button per `button.md`.
- The asset is decorative to a screen reader; the title and Button say everything.
- Greyscale: the eyebrow's word, the asset's shape and the Button's outline carry the kind; nothing depends on the pink ground.
- Font scale 1.3: title wraps to two lines, the card grows, the `pair` grid drops to one column; nothing clips.

---

## Sound

None of its own.

---

## Do / don't

**Do** — one shape for every promotion · the offer as text, numbers first · one Button, one verb · `secondary` in a grid, `primary` only on the screen that exists for it · a registered asset or a campaign photo on the pink ground · ≤ 5 in a carousel, ≤ 6 in a grid.

**Don't** — tint the card or colour the border by prize · paint an amount into the art · two Buttons · a tappable picture · a ✕ on the card (that is a Banner) · *Claim now* · *Free TV!* · a price tag · an emoji in the eyebrow · a PageIndicator on the image.

---

## Token proposals

None. Every value is an existing token: `bgPrimary`, `bgBrandSubtle`, `borderDefault`, `radius.lg`, `spacing.3/4/5`, `BodyLg`, `BodyMd`, Button `M`, Tag `M`.

---

## Figma reconciliation

1. Create **PromoCard** on the Components page `1:3886`: `Kind` (Referral / Contest / Campaign), `Layout` (Full / Pair), `State` (Default / Ended / Entered / Loading), boolean `Eyebrow`, boolean `Body`, `Button` (Primary / Secondary), asset as an instance-swap slot with a photo-fill fallback.
2. Rebuild the 22 frames in *Expert (Sahil)* `8510:23259` as instances: 6 referral → `referral`, 15 contest → `contest`, the Utsav card → `campaign`. Delete the six colour variants; bind the surface to `bgPrimary`, the ground to `bgBrandSubtle`, the Button to the Button component.
3. Replace the eyebrow pills with Tag `M soft brand` instances; replace 🏆 with `trophy`.
4. Replace *Invite via WhatsApp* with the Button instance **Invite on WhatsApp** + `whatsapp-logo` leading; *View Contest* and the noun buttons with **See contest**; *Claim now* with **Claim bonus**.
5. Move the prize photos to a *Campaign content* page — they are not library assets.

Result: 3 kinds × 2 layouts × 4 states ≈ **24 variants** replacing 22 loose frames.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ Button M 48, full width; the only target |
| 2 | ⚙ Semantic tokens only | ✅ no proposals |
| 3 | ⚙ Type scale | ✅ BodyLg Medium / BodyMd / Tag M |
| 4 | ⚙ States by ≥ 2 channels | ✅ ended = Tag word + opacity + disabled Button with reason; entered = Tag + icon |
| 5 | ⚙ Loading / offline | ✅ skeleton; offline Buttons disabled with reason, never hidden |
| 6 | ⚙ Tap guard | ✅ via Button |
| 7 | ⚙ Four languages at 1.3 | ⬜ title ≤ 48 chars, 2 lines; Kannada to verify with the Hub |
| 8 | ⚙ Reduced motion | ✅ no auto-advance, no slide |
| 9 | Meaning without text | ✅ asset + Tag icon + Button outline |
| 10 | Greyscale | ✅ nothing depends on the ground colour |
| 11 | Costly actions | ✅ none — every action opens something |
| 12 | Sound | ✅ none |
| 13 | Error copy | n/a |
| 14 | Status colours only for status | ✅ one tone; `success` only on the *You're in* Tag |
| 15 | Copy heard aloud in four languages | ⬜ pending |
| 16 | Device review | ⬜ pending — build request |
