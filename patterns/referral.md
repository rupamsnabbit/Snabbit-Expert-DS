# Pattern — referral

The Refer tab: how she brings a friend to Snabbit, what she earns for it, and how she follows each friend's first weeks. Evidence: the proposed Refer screen from the design lead, 2026-09-24 → `references/refer-tab-2026-09-24/`, and the referral, contest and story surfaces on *Expert (Sahil)* `8510:23259` → `references/expert-sahil-rewards-2026-09-24/`. Proposed, not shipped; the shipped app has the **Refer** tab with a `₹4000` promo Badge (`bottom-tab-bar.md`) and nothing else read yet. Everything on this tab is a Tier 2 composition of core components — the money list is a **Statement**, the offer is a **PromoCard**, the stories are **HowToClip**.

---

## The tab

```
┌────────────────────────────────────────────┐
│ ‹  Refer a friend                    [A/अ] │  HeaderNav page · trailing IconButton translate (one control; no (i))
│ ┌ PromoCard referral · full ────────────┐  │
│ │   (two experts, a Snabbit box)        │  │  media ground bgBrandSubtle · asset/character/referral-handover
│ │   Up to ₹15,000 when a friend joins   │  │  title BodyLg Medium
│ │   Paid as she completes her first weeks│ │  body BodyMd textSecondary
│ │   [whatsapp] Invite on WhatsApp       │  │  Button primary L — THE tab's one primary
│ └───────────────────────────────────────┘  │
│ Stories                                    │  section heading
│ (○) Pooja's win  (○) Sita's first month  → │  HowToClip story · 72 dp · title beneath · ring = unwatched
│ ┌ Contest ─────────────────────────────┐   │  Card static · header title + description *Refer friends, win prizes · Ends Mon 23 Mar 2026*
│ │  [cooler]   [gold coin]   [phone]    │   │  PODIUM composition · three prize photos over asset/reward/podium
│ │  ▁▁2▁▁     ▔▔▔1▔▔▔      ▁▁3▁▁        │   │
│ │ (1) (A) Pooja Sharma        ₹20,000  │   │  ListItem rank 1–3 · medal asset · Avatar 40 · Amount md
│ │ (2) (A) Meena Rao           ₹18,500  │   │
│ │ (3) (A) Asha Devi           ₹17,000  │   │
│ │ ─────────────────────────────────── │   │  Divider
│ │ 25  (A) Sunita Rao   [You]  ₹6,000   │   │  ListItem current · rank number · Tag You
│ │ (→) Refer 3 more friends   🥇 Top 3  │   │  Nudge gain · rank medal as the consequence
│ │ [ See leaderboard ]                  │   │  Button secondary neutral M
│ └──────────────────────────────────────┘   │
│ ┌ Referral earnings near you ───────────┐  │  Card · horizontal Stat M tiles
│ │ (A56)     (A56)     (A56)   →         │  │  Avatar 56 · name · locality Caption · Amount md positive
│ │ Sunita    Rekha     Nasreen           │  │
│ │ HSR Layout Koramangala BTM            │  │
│ │ + ₹21,000 + ₹18,000 + ₹15,500         │  │
│ └───────────────────────────────────────┘  │
│ ┌ Your joining bonus                  › ┐  │  Card tappable · description *3 milestones to ₹1,000* → Stepper progression screen
│ Your friends                               │  section heading
│ ┌ Statement ────────────────────────────┐  │
│ │ (₹) Earned from friends       ₹2,000  │  │  band
│ │~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~│  │
│ │ (A) Kriti Patel                       │  │  row · Avatar 40 leading · description *7 of 7 days · ready to claim*
│ │     7 of 7 days · ready to claim ₹2,000 › │  Amount md brand + caret → friend screen
│ │ (A) Sita Rao                🔒 ₹2,000 │  │  Amount locked · *after day 7* · description *5 of 7 days*
│ │ (A) Kriti Patel · claimed Fri 12 Sep  + ₹2,000 │  Amount positive
│ │ ┌─ ON ITS WAY ───────────────────────┐│  │  schedule panel · date tile
│ │ │ [26 SEP] Sita's bonus       ₹2,000 ││  │
│ │ └────────────────────────────────────┘│  │
│ └───────────────────────────────────────┘  │
│ See all 12 friends                       › │  ListItem navigational
│ ┌ HowToClip guide · How referral works ─┐  │  16:9 inline · tap to play · sound · knob-less bar · fullscreen
│ How referral works                    ⌄   │  Accordion faq with Listen (replaces the (i))
│ Home · Earnings · Refer · Profile          │  BottomTabBar · Refer selected
└────────────────────────────────────────────┘
```

Order kept from the proposed screen: **offer → stories → contest → peers → her bonus → her friends → how it works**. The one primary is *Invite on WhatsApp*; every other action is `secondary`, `tertiary` or a row.

Five states (P5): **loading** — PromoCard skeleton, story skeleton circles, Statement band with skeleton rows; **empty** (no friends yet) — the Statement is replaced by EmptyState `section` *No friends yet · Your first invite lands here*, the contest and peers still show; **error** — EmptyState `error` with **Try again** in place of the lists, the PromoCard stays (inviting needs no server); **offline** — Offline Banner; *Invite on WhatsApp* works, *See leaderboard* and *Claim* are disabled with *Needs internet*; **loaded**.

---

## What changes from the proposed screen

| Proposed | Pattern | Why |
| --- | --- | --- |
| Confetti hero with the *Saheli* wordmark, *₹15,000 tak* pill, **Refer Saheli** | PromoCard `referral` `full` `primary`: *Up to ₹15,000 when a friend joins* · **Invite on WhatsApp** | `promo-card.md`; words are text, not art (`assets.md`) |
| (i) and a language toggle in the header | `translate` alone; *How referral works* Accordion `faq` at the foot | `header-nav.md`: one trailing, no (i) |
| Portrait story tiles with *Winner 🎁* / *Trending 🔥* | `story` circles with titles (*Pooja's win*) | the shipped circle; no emoji |
| Purple *Bumper Contest* section | Card *Contest* with the date on its description line | colour by content, not container (P6) |
| Prize photos on a three-block podium | **Podium** composition on `asset/reward/podium` | rank is the reward layer's domain |
| *Earnings ₹20,000* as a description | Amount `md` trailing | a value is a value |
| *25 · You* row | ListItem `current` with Tag *You* | `list-item.md` (rule added 2026-09-24) |
| *Refer 3 more to people enter Top 3* ○ | Nudge `gain` → medal · *Top 3* | `nudge.md` |
| **View Leaderboard** black · *Ends on 23 March 2026* | **See leaderboard** `secondary neutral`; *Ends Mon 23 Mar 2026* in the Card header | one primary; date format (`content.md` § 5) |
| Pink scalloped *Top Saheli earnings near you!* | Card *Referral earnings near you* with Stat tiles | the scallop belongs to the Statement |
| Friend cards: **Claim Bonus** green, phone + WhatsApp, *Processing*, *Claimed 🤑* | **Statement** rows per friend; claim, call and message on the friend's screen | never a Button in a row (`list-item.md`); the shipped money card has every state |
| **View all ›** Button | ListItem *See all 12 friends ›* | `card.md` |
| Video with a scrubber knob | HowToClip `guide` | P3 |

---

## The friend's screen

Tapping a friend's row opens her screen. It is where the two things the proposed card crammed into a row actually live.

```
┌────────────────────────────────────────────┐
│ ‹  Sita Rao                                │  HeaderNav page
│ (A56) Sita Rao · joined Mon 15 Sep         │  Avatar 56 · BodyLg · Caption
│ ●──●──●──●──●──○──○                        │  Stepper progression · 7 nodes (her first 7 working days) · coin asset on the last
│ 5 of 7 days · ₹2,000 after day 7           │  the mandatory paired line
│ Call Sita                                › │  ListItem navigational · phone
│ Message on WhatsApp                      › │  ListItem navigational · whatsapp-logo
│ Her bonus so far                           │  Statement (band + rows) when there is more than one milestone
│ [ Claim ₹2,000 ]                           │  Button primary L — only when ready; otherwise the disabled reason *Available after day 7*
└────────────────────────────────────────────┘
```

**Claim ₹2,000** opens a BottomSheet `info`: *₹2,000 reaches your bank with Friday's payout* · **Got it**; the row moves to the Statement's `schedule` panel as *ON ITS WAY · 26 SEP*, and a Toast *₹2,000 on its way* plays `confirm`. Claiming is money she has already earned, so it is one tap (P3: desired actions are not protected).

**Call** and **Message on WhatsApp** are for a friend who has stalled — *Sita hasn't worked since Tue*. They are `navigational` rows, not IconButtons in a row, so each is a 56 dp target with a label she can read.

---

## Contest — the podium and the leaderboard

- **Podium**: a Card body holding three prize photos (campaign content, transparent ground, 96 dp) over `asset/reward/podium` — gold centre and tallest, silver left, bronze right. Never Buttons on the prizes; the Card's footer holds **See leaderboard**.
- **Leaderboard** rows are ListItems: `rank` leading (medal assets `asset/reward/rank-1/2/3` for the top three, then a number), Avatar 40, name, Amount `md` trailing (what is ranked — earnings from referrals, to confirm). Her row is `current` with Tag *You*, pinned after a Divider even when she is 25th, because *where am I* is the question the list answers.
- The Nudge under the rows says how far: *Refer 3 more friends* → medal · *Top 3*. It disappears when she is in the top three, replaced by a Tag `success` *You're in the top 3*.
- **See leaderboard** opens the full list (≤ 100 rows, paginated, her row pinned at the bottom while scrolling).
- The contest's end date is on the Card header's description line, never a countdown Timer (a contest is days away; `timer.md` is for minutes).

---

## Content

- *Refer a friend* (title) · *Up to ₹15,000 when a friend joins* · *Paid as she completes her first weeks* · **Invite on WhatsApp** · *Stories* · *Contest* · *Refer friends, win prizes · Ends Mon 23 Mar 2026* · **See leaderboard** · *Refer 3 more friends* · *Referral earnings near you* · *Your joining bonus · 3 milestones to ₹1,000* · *Your friends* · *Earned from friends* · *7 of 7 days · ready to claim* · *after day 7* · *ON ITS WAY* · *claimed Fri 12 Sep* · *See all 12 friends* · *How referral works* · **Claim ₹2,000** · *Call Sita* · *Message on WhatsApp*.
- *Saheli* is the Hindi / Marathi word for the friend she refers (`content.md` § 8); English says *a friend*.
- Never *Refer Saheli* as a Button, *Bumper*, *tak*, *Winner* / *Trending* as tags, *Processing*, *Claimed* with an emoji, *View all*, *Complete milestones to earn*.
- Spoken: the PromoCard is read on the tab's Listen; the Statement is read row by row; the friend's screen says *"Sita has worked five of seven days. Two thousand rupees after day seven."*

---

## Spec follow-ups

- `how-to-clip.md` — **`guide`** form (landed 2026-09-24; closes the ROADMAP open item).
- `list-item.md` — **`rank`** leading; `current` in a list of people carries Tag *You* (landed).
- `statement.md` — rows may lead with an Avatar 40; *Referral earnings* recorded as a fourth use (landed).
- `nudge.md` — a `gain` consequence may be a rank medal (landed).
- `assets.md` — `asset/reward/rank-1/2/3`, `asset/reward/podium` (landed); `icons.md` — `corners-out`, `whatsapp-logo` widened to *message on WhatsApp* (landed).
- `bottom-tab-bar.md` — the Refer tab's promo Badge shows the live bonus (`₹15,000`), unchanged.
- Open: what the leaderboard ranks; whether the language toggle belongs on the share sheet; the *Saheli* wordmark.

---

## Checklist for the pattern

- [ ] One primary on the tab — *Invite on WhatsApp*; everything else `secondary`, `tertiary` or a row.
- [ ] No tinted sections; the contest and peers are Cards on `bgSecondary`.
- [ ] The friend list is a Statement; claim, call and message live on the friend's screen.
- [ ] Ranks 1–3 are medal assets, the rest numbers; her row is `current` with *You* and is always visible.
- [ ] Stories are 72 dp circles with titles; no *Winner* / *Trending* tags.
- [ ] The inline video has no knob; fullscreen opens the player.
- [ ] Five states designed; offline keeps inviting alive.
- [ ] Copy heard aloud in four languages; *a friend* for *Saheli* confirmed with the Hub.
