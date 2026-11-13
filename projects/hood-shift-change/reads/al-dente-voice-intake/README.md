# Reference read: Al Dente's voice intake (2026-10-07)

**Why.** The design lead found it online: *"its a nice concept we can learn. but lets start fresh on paper"*. It's a cooking app that learns your household by voice. Two screens are saved here: `01-speaking.png` and `02-check.png`.

It is a concept shot, not a shipped flow seen on Mobbin, so it supplies **mood and interaction**, not proof (`CLAUDE.md` § Mobbin). The interaction matches what the review meeting already asked for: one spoken input, then *does this look right?*

Internal only. Never published, never traced.

## What it shows

- **01 · Speaking**
  - A coloured card on top holds the one question (*Who is in your household?*) and a one-line hint.
  - Her words appear live in the middle of the screen. The parts the app understood are **highlighted inside her own sentence**.
  - At the bottom, **what it heard stacks up as rows** (*Household · 2 adults, 1 kid*), with a spinner while it is still working.
  - The mic is a pause button with a waveform on each side.
- **02 · Check:** *Does this look right?* A two-column table: what it heard, by topic. One button.

## 1 · The idea

**Talk, see it understood, check it once.** The highlight in her own words is the proof that we heard her. The rows are the same thing turned into fields we can act on.

## 2 · Idea vs expression

| Borrowable | Skin (does not travel) |
| --- | --- |
| The question in a coloured card that stays on screen while she speaks | Yellow, the serif face |
| Live words with the understood parts highlighted | English-only examples; hers will be Hindi, Kannada or Marathi, often mixed with English place names |
| Understood rows building up at the bottom, a spinner until each is ready | Nine topics. We have three: place, time, friend |
| *Does this look right?* before anything happens | A bare text table with *Next* (banned copy); our rows get an icon and a *Change* |

## 3 · Against the expert

- **She needs to be shown what to say first.** Al Dente opens straight on the question; ours opens on a guide with three spoken examples, as the design lead asked.
- **Three rows, each with an icon** (`map-pin`, `clock`, `users`), so the check can be read without reading (P1).
- **The highlight is pink** (`bgBrandSubtle`), meaning *understood*. We don't use yellow.
- **Indic text** in her transcript uses the line height × 1.15.

## 4 · Tier

A Composition of core parts (Card, ListItem, Button, VoicePrompt), plus **one new core component: VoiceInput**. VoiceInput is the mic, the waveform, the live words with highlights, and the understood rows. It's an ask of core, with a brief to follow once the screens are agreed.

## 5 · Translation

On the Paper page *Voice flow · fresh*:
- **V1 · Guide:** the question card, three example lines she can play, a big mic, *Type instead*.
- **V2 · Speaking:** the card made small, her Hindi sentence with *HSR*, *Bellandur* and *9 से 5* highlighted, understood rows stacking, and the stop button.
- **V3 · Is this right?** Three rows (place, time, friend), each with *Change*, then *Find work* and *Say again*.
- **V4 · Results:** her area isn't available, so nearby areas.

## 6 · Differences, one sentence each

- Outfit and our pink replace the serif and yellow, because type and colour are system tokens.
- A guide screen comes first, because she has never spoken to an app like this.
- The check screen has icons and *Change* on each row, because she reads pictures before words (P1).
- The button says *Find work*, never *Next* (`content.md` § 9).
