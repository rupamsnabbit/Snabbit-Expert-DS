# Type across four scripts

Hindi, Kannada, Marathi and English are equal citizens (P9): the layout is designed for the longest and tallest of them, not for English with the others squeezed in later. This page consolidates the rules that the component specs already apply one at a time — line height, fallback faces, length budgets, wrapping, truncation, font scaling — so that checklist row 7 (*text wraps; nothing truncated at the largest font in all four languages*) can be passed by measurement rather than by hope. Tokens: `typography.indic` in `tokens/tokens.json`.

---

## The two faces

| | Latin and numerals | Devanagari (Hindi, Marathi) · Kannada |
| --- | --- | --- |
| Face | **Outfit** 400 / 500 / 600 | The platform's own face: **Noto Sans Devanagari / Noto Sans Kannada** on Android, **Devanagari Sangam MN / Kannada Sangam MN** on iOS |
| Why | The brand face; covers every numeral and symbol the app uses | Shipped on every phone, hinted for small screens, maintained by the OS; a bundled Indic face would cost 300–600 KB per script and still render worse than the system's (P8) |
| Weights | As the scale says | 400 → Regular; 500 → Medium where the face has it, else Regular; 600 → SemiBold where the face has it, else **Bold**. Never synthesised |
| Italics | none | none — the UI never uses italics; the fallback faces have none and a slanted Devanagari is unreadable |

Rules: never bundle a second family; never style the fallback to imitate Outfit (letter-spacing, fake weight); a mixed line — a Hindi label beside a `₹` amount — sets the amount in Outfit and the words in the fallback, on one baseline, because **numerals are Latin in every language** (`amount.md`, P9). Brand words (*Snabbit*, *SOS*) stay in Latin; the feature name *Kavach* is written in the script of the language (कवच).

---

## Metrics — the ×1.15 rule, made concrete

Devanagari carries the shirorekha and vowel signs above it and conjuncts below; Kannada is round, wide and deep. Both exceed Outfit's ascender and descender at the same size. Every container that **may** hold one of them (which is every container that holds a translated string) uses the scale's line height × 1.15, rounded up to the nearest 2 dp. The scale's line heights are minimums for Latin-only text (amounts, times, codes).

| Style | Size | Latin line height | Indic line height | Where the difference shows |
| --- | --- | --- | --- | --- |
| Display | 32 | 40 | 46 | Job alert amount is Latin; the *Time's up* line is not |
| Heading1 | 28 | 37.3 | 44 | SafetyCheck question |
| Heading2 | 24 | 32 | 38 | Sheet titles |
| Heading3 | 20 | 28 | 32 | Card titles |
| Title | 18 | 24 | 28 | HeaderNav title, ListItem title |
| BodyLg | 16 | 24 | 28 | Body copy, Button labels in rows |
| BodyMd | 14 | 20 | 24 | Supporting copy |
| Caption | 12 | 16 | 18 | Metadata; the smallest size a translated string may use |
| Small | 10 | 14 | 16 | Latin-only (tabular metadata); never a translated string |
| ButtonLg | 16 | 16 → container 56 / 48 | same | Buttons are fixed-height containers; the label is centred, one line, and the container is what fits it |
| ButtonMd | 14 | 14 → container 40 | same | |

Two consequences: a two-line `BodyMd` in Hindi is 48 dp, not 40, so ListItem rows and Stepper rows size to content, never to a fixed height; and a `Caption` in Kannada at font scale 1.3 is 15.6 sp on an 18 × 1.3 line — still legible, which is why `Small` is Latin-only.

No letter-spacing anywhere (the shipped *ACCEPT IN* small caps is already retired in `timer.md`; the label is sentence case `BodyMd`). No all-caps: Indic scripts have no case, so caps would make English the odd one out. No justified text; ragged right in every script.

---

## Length — budgets are English, the box is universal

Every character budget in a component spec (*≤ 18 characters*, *≤ 40 chars*) is written for **English**. The translation does not get the same character count; it gets the **same box**. Approximate expansion at equal size:

| Language | Width vs English | Why |
| --- | --- | --- |
| Hindi | × 1.2 | Longer words, conjunct stacks are narrow but frequent |
| Marathi | × 1.25 | Longer inflections than Hindi |
| Kannada | × 1.35 | Wide round letterforms; the longest of the four almost every time |

So a Button budget of 18 English characters is really *"fits one line in a 328 dp Button at font scale 1.3 in Kannada"*. The Kannada string is the test string for every budget below. When it does not fit: shorten the copy in **all** languages (the English is probably too long as well), never shrink the type, never let one language have a different layout.

Consolidated budgets (from the specs; English characters, Kannada must fit the same box):

| Component | Text | Budget | Lines allowed | Truncation |
| --- | --- | --- | --- | --- |
| Button | label | ≤ 18 | 1 | never — shorten the copy |
| BottomTabBar | tab label | ≤ 10 | 1 | never; never hidden |
| Chip | filter label | ≤ 12 | 1 | never |
| Chip | quick reply | ≤ 20 | 1 | never |
| HeaderNav | title | ≤ 24 | 1 | **ellipsis allowed**; read aloud in full |
| ListItem | title | ≤ 28 | 2 (1 when it opens a detail, then ellipsis allowed) | see left |
| ListItem | supporting | ≤ 40 | 2 | never |
| Card / ProgressBar | title | ≤ 24 | 2 | never |
| Selection controls / SelectionCard | label · description | ≤ 24 · ≤ 40 | 1–2 · 2 | never |
| Amount | label | ≤ 20 | 1 | never |
| BottomSheet | title · body | ≤ 40 · — | 2 · ≤ 4 | never |
| Toast · Snackbar · Banner | message | ≤ 40 · ≤ 60 · ≤ 60 | 2 | never |
| EmptyState | title · body | ≤ 40 · ≤ 80 | 2 · 2 | never |
| Coachmark | sentence | ≤ 60 EN / ≤ 72 HI | 3 | never |
| Nudge | line | ≤ 40 | 2 | never |
| Accordion | FAQ question | ≤ 48 | 2 | never |
| MediaCapture | instruction | ≤ 40 | 1 | never |
| HowToClip | title · caption | ≤ 3 words · ≤ 40 per line | 2 · 2 | never |
| MapMarker | label | ≤ 20 | 1 | **ellipsis allowed**; read aloud in full |
| JobAlert | facts strip | 3 facts | wraps to 2 lines before anything shrinks | never |
| Timer | label | 2 words | 1 | never |

Three places may truncate, and each reads the full text aloud through its VoicePrompt or the screen reader. Nothing else truncates: not amounts, not times, not Buttons, not errors, not safety copy. If it does not fit, the spec is wrong and the copy is too long.

---

## Wrapping

- Text wraps at spaces. Conjuncts, vowel signs and the `₹` + digits group never split; a time (`9:30 am`) and a distance (`1.2 km`) are one unbreakable unit.
- No hyphenation: Indic scripts do not hyphenate, and English hyphenation would make English the odd one out.
- Headings avoid a single-word last line where the copy allows; this is a copy rule, not a layout hack — never adjust tracking or size to fix it.
- A two-line label is normal (P9). A three-line label is a signal to shorten the copy, except body text and Coachmark sentences.
- Containers size to content vertically. Fixed heights exist only for Buttons (56 / 48 / 40), the tab bar (64), the header (56), keypad keys (64) and the SafetyStrip (32); in each, the text is one line by budget.

---

## Font scaling

The app honours the system font size up to **1.3 ×** (`typography.indic.maxFontScale`) for layout purposes: every screen is designed at 1.0 and verified at 1.3 in Kannada. Above 1.3 the text keeps scaling (it is her setting, never overridden) and the rules are: containers grow, nothing clips, Buttons grow in height, the tab bar labels stay one line by budget, the header title truncates as allowed, scrolling appears where the screen no longer fits. Type is set in `sp`; sizes that must not scale (a `₹` glyph relative to its digits, the Timer digits inside a fixed ring) scale together as a group, never independently.

At 1.3 in Kannada the following are the known tight spots and are the first things to check on any new screen: the tab bar labels, the Chip row, the Stat facts strip on the job alert, the Segmented control, and any two Buttons stacked above the safe area.

---

## Numerals, time, money

Latin numerals in every language — `₹1,250`, `45 min`, `9:30 am`, `1.2 km` — set in Outfit, tabular where they align in columns (`amount.md`, `timer.md`). Indian digit grouping (`1,25,000`). No Devanagari or Kannada numerals, even where the OS would offer them (`numeric-keypad.md`). Time is 12-hour with a lowercase `am` / `pm` in every language; dates are *Mon 8 Sep* with the weekday and month translated and the numerals Latin.

---

## Test strings

Working strings for the highest-traffic labels, to be verified by native speakers who have met an expert (P9). They exist so that a designer can drop the longest one into a component and see whether it fits.

| English | Hindi | Marathi | Kannada |
| --- | --- | --- | --- |
| Accept job | काम स्वीकार करें | काम स्वीकारा | ಕೆಲಸ ಸ್ವೀಕರಿಸಿ |
| Check in | चेक इन करें | चेक इन करा | ಚೆಕ್ ಇನ್ ಮಾಡಿ |
| Earnings | कमाई | कमाई | ಗಳಿಕೆ |
| Show directions | रास्ता दिखाएँ | रस्ता दाखवा | ದಾರಿ ತೋರಿಸಿ |
| Not now | अभी नहीं | आता नाही | ಈಗ ಬೇಡ |
| Recording · Location shared | रिकॉर्डिंग · लोकेशन साझा | रेकॉर्डिंग · लोकेशन शेअर | ರೆಕಾರ್ಡಿಂಗ್ · ಸ್ಥಳ ಹಂಚಿಕೆ |
| Are you in danger? | क्या आप खतरे में हैं? | तुम्ही धोक्यात आहात का? | ನೀವು ಅಪಾಯದಲ್ಲಿದ್ದೀರಾ? |

The Kannada column is the layout test; the Marathi column is usually the longest Devanagari.

---

## Checklist row 7, restated

*⚙ Four languages — text wraps; nothing truncated at the largest font.* Passes when: every translated container uses the Indic line height; the Kannada string fits the box at font scale 1.3 without shrinking; truncation happens only in the three named places and is read aloud; numerals are Latin; no caps, tracking or italics. A spec that gives a character budget without naming the Kannada test passes only provisionally — mark it ⬜ until measured.

---

## Reconciliation

- `tokens.json` → `typography.indic`: fallback faces per platform, weight map, expansion factors, `maxFontScale` 1.3, the three truncation sites. `DESIGN_TOKENS.md` carries the summary.
- Every spec's checklist row 7 that reads *verify* or ⬜ is now measurable against this page; they are ticked one by one as the Kannada strings are dropped in (site pages carry English only).
- Figma: create a *Kannada at 1.3* variant of the Button, Chip, Tab bar and ListItem components with the test strings above, so the tight spots are visible in the file; set text layers to *auto height* everywhere.
- `timer.md`: the label is `BodyMd` sentence case — the shipped *ACCEPT IN* small caps is already retired there; this page adds the reason (no caps in a four-script system).
