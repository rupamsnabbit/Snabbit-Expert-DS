# Pattern — notifications and stories

The bell. Everything the app has to tell her that is not a job, a shift or money — a training tip, a contest, a change in rates, a story from another expert — arrives here, and a story can be opened full screen. Evidence: *Expert (Sahil)* `KiQaNqLFaH1orma4Uf7hzU` → section `8510:23259`, two screens (*Notification Centre*, story viewer), read 2026-09-24 → `references/expert-sahil-rewards-2026-09-24/` (`09a`, `09b`, `10`). Proposed, not shipped. This page owns the screen, the **Post** composition and the story viewer; the reaction control is Chip `reaction` (`components/chip.md`) and the story circles are HowToClip `story` (`components/how-to-clip.md`).

---

## The screen

```
┌────────────────────────────────────────────┐
│ ‹  Notifications                    [🔖]  │  HeaderNav page · trailing IconButton M ghost `bookmark-simple` → Saved
│ Stories                                    │  section heading BodyMd Medium textSecondary
│ (○) (○) (○) (○) →                          │  HowToClip `story` · 72 dp circles · borderBrand ring = not watched · ≤ 8, then it scrolls
│ [All] [Updates] [Important] [Training] [Bonuses]   Chip filter row · All selected by default
│ ┌ Post ─────────────────────────────────┐  │
│ │ [icon] Rates change on 1 Oct   Today  │  │  header · icon box 40 or Avatar 40 · title BodyLg wraps 2 lines · meta Caption
│ │ ───────── media 16:9 ── (▶) · 120 views │  │  media · optional · play disc for video · views chip bottom-right
│ │ From 1 Oct you earn ₹140 an hour…     │  │  body BodyMd textBody · ≤ 3 lines · *Read more ›* opens the post
│ │ (♥ 12) (👍 4) (👏 2) (🙏 120)     [🔖] │  │  footer · Chip reaction × ≤ 4 · IconButton S bookmark-simple
│ └───────────────────────────────────────┘  │
│ ┌ Post … ┐                                 │  12 dp between posts
│                                            │
│ Home · Earnings · Refer · Profile          │  BottomTabBar (the bell lives in the Home header, `header-nav.md`)
└────────────────────────────────────────────┘
```

- Opened from the bell in the Home header (IconButton with a Badge `dot` while there is something unread). The Badge clears when this screen opens (`badge.md`: a badge that lingers trains her to ignore badges).
- One scroll. Stories first because they are the newest and the shortest; then the filter row; then posts, newest first, paginated.
- Five states (P5): **loading** — three Post skeletons and story skeleton circles; **empty** — EmptyState `section` *Nothing new · We'll ring you when there is*; **error** — EmptyState `error` with **Try again**; **offline** — the Offline Banner at the top, posts already fetched stay readable, media shows *Needs internet* on its ground; **loaded**.

---

## What changes from the Figma screens

| Figma | Proposed | Why |
| --- | --- | --- |
| Title *Notification Centre* | **Notifications** — the bell's registered meaning (`icons.md`) | one word she knows; *Centre* is a system word |
| Stories as portrait rounded rectangles, one with a pink ring | HowToClip `story` **circles** (72 dp), ring `borderBrand` unwatched → `borderDefault` watched | the shipped circle from the Coins and tracker screens; nothing gained by a second shape |
| Chips *All · Information · Alert · Training · Incentive* | Chip `filter` **All · Updates · Important · Training · Bonuses** | her words (`content.md` § 8: *Bonus*, never *incentive*); *Alert* is kept for safety |
| Post title truncated (*…consectetur.co*) | title wraps to two lines, never truncates | P9 |
| Icon disc with a badge glyph; avatar with an emoji face | ListItem leading: **icon in a tonal box** 40 dp for Snabbit posts (`bell` for updates, `graduation-cap` for training, `trophy` for contests, `currency-inr` for rates) or **Avatar** 40 for a post from a named expert | one icon, one meaning; emoji are not icons |
| 👁 *120* · *1.1K* · *100K* on the image | Caption `textInverse` on `bgInverse` at 60 % opacity, bottom-right of the media: *120 views* · *1,100 views* · *10,000+ views* | `eye` already means *show / hide an amount*; words say it; Indian grouping to 9,999 then *10,000+* |
| Reactions ♥ · 🔥 2 · 👍 1 · 😍 1 · 🙏 120 as emoji pills | **Chip `reaction`** × ≤ 4: `heart` · `thumbs-up` · `hands-clapping` · `hands-praying`, count trailing, `fill` when hers | Phosphor only; `fire` means *streak* and is not offered |
| Dots on the image for a media carousel | PageIndicator 12 dp **below** the media, inside the card, ≤ 5 images | `page-indicator.md` |
| Bookmark glyph in the header and on every post | IconButton `bookmark-simple` — header opens **Saved**; on a post it saves; `fill` when saved | one meaning: *save for later* |
| Android nav bar drawn in the frame | system UI, not ours | — |

---

## Post — a Tier 2 composition

A Post is a `Card` `static` with every slot filled from existing parts. It is recorded here and in `card.md` § Compositions; it is not a new component.

| Slot | Built from | Rule |
| --- | --- | --- |
| header | ListItem leading (icon box 40 / Avatar 40) · title `BodyLg` `textPrimary` 2 lines · trailing meta `Caption` `textSecondary` *Today* · *Yesterday* · *Mon 22 Sep* | relative time only for a week, then the date (`content.md` § 5) |
| media | Card media 16:9, full-bleed · optional · a `play` disc 40 dp `bgPrimary` / `iconBrand` for video · views chip · for 2–5 images, a swipeable row with a PageIndicator below | never required for meaning (P8); tapping video opens the story viewer, tapping an image opens it full screen with the same close |
| body | `BodyMd` `textBody`, ≤ 3 lines, then a ListItem-style *Read more ›* row that opens the full post | one idea per line |
| footer | Chip `reaction` × ≤ 4 (`spacing.3` apart) · IconButton `S` `bookmark-simple` trailing, wrapped to 48 dp | the Card footer's `reactions` option (`card.md` § Slots) |

The whole card is not tappable; its targets are the media, the reactions, the bookmark and *Read more ›*. A post with a single action from Snabbit (*See the new rate card*) carries it as a `tertiary brand` Button **above** the reactions — the footer holds one or the other row, never both stacked with a Button between reactions.

**Unread.** A post she has not seen has a 4 dp `bgBrand` bar down its left edge inside the border, and its title is `SemiBold`; both go when it scrolls fully into view once. Colour plus weight — two channels (P1).

---

## The story viewer

HowToClip `player` in **`story`** mode (`how-to-clip.md`): full screen, portrait, `bgInverse`, close `x` top-right, back top-left, autoplay with voice, **knob-less** progress, and — because a story runs minutes, not seconds — a `Caption` `textInverse` *1:31 / 2:42* at the bar's right. Below the bar, over the scrim: title `BodyLg` SemiBold `textInverse`, body `BodyMd` `textInverse` ≤ 2 lines, then the same reaction row and bookmark as the Post. Tap the video to pause; back or ✕ to leave; no swipe to the next story — a swipe is never the only path (P3), and *Up next* is banned copy. When one ends, **Replay** and the next story's circle appear as a ListItem `navigational` *Next: Sunita's first week ›*.

---

## Content

- Section heading *Stories*; chips *All · Updates · Important · Training · Bonuses*; header *Notifications*; the Saved screen *Saved*.
- Post title ≤ 40 characters, sentence case, the fact first: *Rates change on 1 Oct* · *New: Utsav bonus this week* · *Sunita's first month at Snabbit*.
- Body: what it means for her and, if anything, what to do: *From 1 Oct you earn ₹140 an hour. Nothing changes until then.*
- Views: *120 views* · *1,100 views* · *10,000+ views*. Reaction counts ≤ 999 exact, then *999+*.
- Never *Notification Centre*, *Information*, *Incentive*, *Alert* as a category, *Up next*, *New!*, an emoji.
- Spoken: a post is read on its Listen (title, then body); the story's voice is its own.

---

## Spec follow-ups

- `chip.md` — **`reaction`** kind (landed 2026-09-24).
- `card.md` — media gains the `play` disc, the views chip and the ≤ 5 image carousel with a PageIndicator below; footer gains `reactions`; Post recorded as a composition (landed).
- `how-to-clip.md` — `player · story` mode (landed).
- `icons.md` — `heart`, `thumbs-up`, `hands-clapping`, `hands-praying`, `bookmark-simple` (landed).
- `header-nav.md` — the bell's Badge clears on opening this screen; a **Saved** screen is a plain list of Posts (to add when the screen is drawn).
- `empty-state.md` — copy *Nothing new · We'll ring you when there is* to add to the examples.

---

## Checklist for the pattern

- [ ] Stories are the shipped 72 dp circles; the ring means unwatched.
- [ ] Filter chips are her words; *All* is first and selected.
- [ ] Every post has a title that wraps, a leading icon or avatar with a registered meaning, and no emoji anywhere.
- [ ] Reactions are Phosphor, ≤ 4, `fill` when hers; `fire` is not among them.
- [ ] Media is never required for meaning; views are words; dots sit below the image.
- [ ] Story viewer has no scrubber knob and no swipe-only path; *1:31 / 2:42* is the only place digits appear.
- [ ] Five states designed; the bell's Badge clears on open.
- [ ] Copy reviewed aloud in four languages; *Bonuses* and *Important* verified with the Hub.
