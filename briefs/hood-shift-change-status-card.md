# Hood & shift change / StatusCard

Tier: 3 (local) · proposed as a `Banner` kind `card` once it lands  |  Owner: Rupam Banik · Date: 2026-10-13 · Status: Proposed (skin not yet picked)

## Idea
One card at the top of the areas screen tells her, in one glance, what happened to what she asked for — *full*, *open*, *waiting* — and gives her one tap. The eyebrow carries the state, the big line carries her ask, one pill Button carries the way forward. Eight skins were drawn; the anatomy is the same in all of them, so the skin is a theme, not a new component each time.

## Why not existing
- `Banner` (`feedback.md`): a soft-tone strip with a 40-char title and a ghost action. It is the right *meaning* but reads as a system notice, not as the answer to what she asked; the lead rejected its look on 2026-10-12 and again on 2026-10-13 ("even more crazy").
- `PromoCard`: pink media ground, an asset, a two-line title and a Button — the closest shape, but its ground is brand pink and brand pink means *tap me*; a status is not a promotion (P6: colour is a language).
- `Card` `filled`: no tone, no hero.

## Reference (if any)
`projects/hood-shift-change/reads/status-card-lead-2026-10-13/` (the lead's current set) and `projects/hood-shift-change/reads/mobbin-status-card-crazy/README.md` (Lloyds, Cash App, Public, Waymo, BeReal, corner, Rodeo, Tolan, Starling, Opal — six-step read inside). Idea named there: *one thing is big* — an object, a number, a word or a track — and the rest is small and flat.

## Translation
**Slots, in order:** eyebrow (`Caption`/`BodyMd` Medium, ≤ 24 ch, the state) · hero (`Heading1`–`Display` SemiBold, what she asked, or the hold as digits with the Timer rule) · line (`BodyMd`, optional, one) · Button (pill, 40 dp = `spacing.button.s`, `radius.full`, `ButtonMd` SemiBold, a verb) · picture (one: the hourglass pictogram on its pink stage, a sticker, a silhouette at 22 %, a stub, or a track).
**Tones** (proposed tokens): `full` → `bgErrorStrong` = `red.600` (dark skins `gray.900` → `red.700`); `open` → `bgSuccessStrong` = `green.600` (dark: `gray.900` → `green.700`); `waiting` → `bgInverse` = `gray.900`. Text on tone: `textInverse`; the soft line in the tone's 100 step. Colour is never alone: the eyebrow word and the picture change with it; every skin passes greyscale.
**Spacing / radius:** card padding `spacing.6`, gap `spacing.3`, `radius.xl`; width `container.content`.
**Core inside it:** Button (pill shape — an ask of core: Button `S` gains `pill`), Tag (D5), Timer digits rule (`timer.md`), the hourglass pictogram (`assets.md`).
**States:** `full` · `open` (with or without a hold) · `waiting`; `pressed` on the Button only; no loading (data comes with the screen); offline: the card stays, its Button `disabled` with the reason under it.
**Audio:** none on the card itself; Saathi speaks the eyebrow + hero on the screen's open.
**Skins drawn** (Paper *Hood & shift · Saathi* → *Status card · crazy iterations*): D1 poster (flat tone, blobs, sticker hourglass) · D2 live track (dark, the hold or the state as the hero, a three-stop track) · D3 sticker table (tilted ask ticket, round stamp, pink stage) · D4 deep gradient (guide lines, glowing hourglass) · D5 object hero (white card, pictogram 96, tone only on Tag and Button) · D6 ticket stub (tone stub with the state, white body) · D7 aurora (blurred colour on dark, glass pill) · D8 big word (the state as a giant cropped word). Two in context on the areas screen (D1, D2).

## Deviations
- Breaks from `content.md` § 2 (no caps) on nothing — D8's big word is sentence case at 112 px.
- Breaks from `tokens` on four values until the tokens land: `red.600` / `green.600` / `gray.900` as card grounds (proposed `bgErrorStrong`, `bgSuccessStrong`, `bgInverse`) and the 112 px big word in D8 (a shape, not a type role).
- Breaks from `button.md` on shape: a 40 dp pill. Proposed as Button `S` `pill`.
- D7's blur and D4's glow are decoration (`motion.md` says decoration ends at 300 ms; these are static) — allowed, but they cost paint on a ₹10k phone; D7 is the one to drop first (P8).

## Principles checklist
| # | Check | |
| --- | --- | --- |
| 1 | targets ≥ 48 dp | ☐ the pill is 40 dp — the card's padding makes the hit area 48; verify in build |
| 2 | semantic tokens only | ☐ four proposed tokens above; nothing raw except the 112 px word |
| 3 | type scale only | ☑ except D8's big word (shape) |
| 4 | every state by ≥ 2 channels | ☑ eyebrow word + picture + tone |
| 5 | loading / empty / error / offline | ☑ offline: Button disabled with reason; others n/a |
| 6 | duplicate taps blocked | ☑ Button rule |
| 7 | text wraps at 130 % in four languages | ☐ not yet checked; the hero is one line in English, Kannada will wrap to two — D1, D4, D7, D8 have room, D3's ticket does not |
| 8 | reduced motion / ≤ 300 ms | ☑ static |
| 9 | meaning with text covered | ☑ tone + hourglass + stamp / track |
| 10 | meaning in greyscale | ☑ eyebrow word + picture; D2's lit dot also changes size |
| 11 | costly actions protected | ☑ *Leave the waitlist* opens W3 |
| 12 | key moments have sound | ☑ via the screen (Saathi), not the card |
| 13 | error copy names the problem + one way | ☑ *Full right now · See other times* |
| 14 | tier colours only for tier | ☑ |
| 15 | copy heard in four languages | ☐ |
| 16 | reviewed on the baseline device | ☐ |

## Promotion
Used on the areas screen (full · waiting · open), the friend lane (Anita's time / area), and — with `open` — the Entry screen when a change is booked. Third use is here; promote to `Banner` kind `card` in `feedback.md` once a skin is picked and the four tokens land.
