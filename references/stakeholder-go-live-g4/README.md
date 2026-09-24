# Reference read — design lead's own G4 *Confirm your shift timings* (2026-09-22)

| | |
| --- | --- |
| Source | Screenshot pasted in chat by the design lead (Android, 393 wide). **PNG not on disk** — drop it in as `g4-confirm-shift-timings.png` |
| Why | Feedback on my G4 (*Your week with Snabbit*): "like a bill, boring". This read says what theirs does that mine did not, and what changes in the translation |

## Step 1 — what is on it

Header: back · *Sunita Rao · 5673439* · **Call** pill · language pill. Five-segment progress. Title *Confirm your shift timings*. Location row: pink pin disc · *Wipro Park, 2nd Block Kormangala* · pencil, dashed border. **Green hero card**: *Estimated monthly earnings* · **₹35,000** with an OK-hand illustration bleeding the right edge; white strip under it: orange plus disc · *+ 1,000 for working extra on sundays*. **Three day cards**, each a tinted header band + a white fact row with icons: *Tuesday to Saturday* (blue) · ⏱ *10:00 AM to 8:00 PM* · ⏲ *10 hours*; *Sunday* (yellow) · *07:00 AM to 07:00 PM* · *12 hours*; *Monday* (grey) · 🌙 *Weekly off*. Pinned **Continue**.

## Step 2 — what it is for

The proud moment: *this is your week and this is what it pays*. Money first, then the week in three chunks she can hold in her head, each chunk with two facts and an icon per fact.

## Step 3 — what carries the meaning

**Grouping.** Tue–Sat is one card, not five rows — five identical rows are noise, one card is a fact. **Size.** Every fact is Heading-sized with an icon in front; nothing is a 40 dp table row. **Rhythm.** Header band → fact row, three times; the eye learns the shape on the first card. **Celebration.** The hero has a hand and a gradient, not just a number. What I did wrong: I read "per day" literally and drew seven rows at 40 dp — a timetable, not a week.

## Step 4 — tier

Tier 2 composition of system components: HeaderNav · ProgressBar `segmented` · ListItem `navigational` (location) · **HeroCard** `jobs` tone with a bottom strip carrying a Nudge `gain` · three Cards with a header band + one fact row (`Stat` with icon) · Button.

## Step 5–6 — translation, one sentence per difference

| Theirs | Paper | Why |
| --- | --- | --- |
| Card header bands blue · yellow · grey | **Tue–Sat `bgSecondary` · Sunday `bgReward` (yellow) · Monday `bgTertiary`** | P6: colour is a language — yellow already means *reward/gain* in this system (Nudge `gain` strip), so Sunday earns it; blue means *info*, which Tue–Sat is not, so it goes neutral |
| Orange plus disc on the gain strip | plus disc on `bgReward`, `warning` glyph — the Nudge `gain` anatomy | same component as G2's gain line |
| OK-hand emoji next to ₹35,000 and a hand illustration | one **illustration** on the pink-stage rule (stand-in drawn) — the emoji goes | `assets.md`: no emoji; one asset, one meaning |
| *10:00 AM to 8:00 PM* · *07:00 AM* | *10:00 am – 8:00 pm* · *7:00 am* | `content.md` § 5 time format |
| Pencil icon on the location row | kept — `pencil-simple` registered as *edit this* | icon register |
| **Continue** | **This is my week** | `content.md` § 9 banned; the Button is the sentence she says back |
| Sunday *07:00 AM to 07:00 PM · 12 hours* | *8:00 am – 8:00 pm · 12 h* | matches what she chose on G2/G2b |

Everything else — the order, the grouping, the hero-then-week structure, the fact-with-icon rows — is taken as drawn.
