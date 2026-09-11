# Pattern — free health cover

Status: **Proposed** · Tier: 2 (composition) · Owner: Rupam Banik · Revised 2026-09-11

She has a free ₹5,00,000 health cover from the day she goes live. To put it in force the insurer needs two things: **who receives the money if she cannot claim it**, and **which of her children go on the policy with her**. Today that is five unique screens of dense English built around a word — *nominee* — that has no everyday equivalent in any of her languages.

This pattern rebuilds the same data collection. **Nothing about what we collect changes**; the insurer's fields are fixed. Everything about how it is asked does — and the measure of success is not artboards, it is **how much work she does**.

Reference reads: `references/insurance-flow-current.md` (the shipped screens) · `references/alan-add-family-member/` · `references/grab-driver-emergency-contact/` · `references/marcus-add-beneficiary/` · `references/mobbin-tile-pickers/` (Mobbin).
Drawn in Paper: file *Snabbit* → page **Insurance**, artboards `01`–`10`.

---

## The one rule for this flow

**Never write *nominee*.** The question is always *who should get the money*, and the answer is always a face and a name. *Nominee* stays in the API payload, the insurer's forms and this document's margins; it never reaches a screen, a voice line or a translation. See the word table below.

---

## What the insurer needs

Confirmed with the design lead, 2026-09-11. This is the whole payload.

| Field | Asked as | Note |
| --- | --- | --- |
| Nominee yes / no | The two Buttons on screen 1 — *Not now* and *Choose the person* | Never a separate Yes/No question. The shipped flow asks it twice |
| Nominee name | Contacts picker, or typed in Latin characters | The hardest field in the flow — see screen 2 |
| Nominee date of birth | DatePicker `month` in a BottomSheet, year stepper above | Never three dropdowns (`date-picker.md` removed that control) |
| Nominee relationship to her | Eight pictogram cards in two labelled groups | Fixed list, set by the insurer |
| Children yes / no, then how many (max **3**) | Two SelectionCards, then a 1 · 2 · 3 row on the same screen | |
| Per child: name, date of birth, boy / girl | One screen per child | |

**No phone number.** The insurer does not need the nominee's number. That removes ten digits typed from memory — the single largest error source in the shipped flow — and it is why the contacts picker is now here for the *name* alone: contact names are already stored in Latin characters, which she cannot type or proofread.

---

## Where it lives

**After go-live** (decided 2026-09-09, reconfirmed 2026-09-11). She is already earning, so there is no time pressure and no blocked shift. The Figma screens place it as *Step 5* of self-serve onboarding; that placement is superseded here and the departure is deliberate — putting a nine-field insurance form between her and her first shift costs go-live conversion for a benefit that is already active.

Two doors (Paper artboard `09`):

| Entry | Component | Content |
| --- | --- | --- |
| **Home** | Card `static`, pictogram `family` 64, footer Button `secondary brand M` with `first-aid-kit` | *Your health cover* · Tag `brand soft L` *Free* · Amount `lg` **₹5,00,000** · *See your cover* |
| **Profile** | ListItem `navigational`, leading `first-aid-kit` 24 in a 40 dp `bgBrandSubtle` box | *Health cover* · *₹5,00,000 · Free* · status line `warning-circle` *Choose who gets the money* while incomplete |

The Home card disappears once the cover is complete; the Profile row stays and opens the review. **No Profile tab badge** — `bottom-tab-bar.md` reserves that for a document that will block work, and this does not block work. Marcus keeps *Manage beneficiaries* permanently in a menu for the same reason (`references/marcus-add-beneficiary/`).

---

## How dense — the rules this flow follows

Rewritten 2026-09-11 after design review. The first translation kept the shipped flow's *shape* and only restyled it: one option per full-width row, a `Heading3` above every input, and a sentence of explanation under every question. That is a transplant, and it made the relationship step 2½ screenfuls long. Four rules now govern density here, and they are general — they belong to the system, not to this pattern.

1. **One `Heading3` per screen.** It is the question. A field's own name is its **`BodyMd` Medium label** (`text-field.md` § Anatomy) — never a heading. A group of choices gets the same `BodyMd` label, not a heading.
2. **No body copy under a question.** If a sentence is needed to explain the question, the VoicePrompt says it (P4). The screen carries the question, the options and the action. Explanations that only reassure are cut.
3. **A fixed set of options is a `tile` grid, not a stack.** Two columns, picture above a short label, no radio (`briefs/insurance-relationship-picker.md`). Scrolling to see your options is worse than tight spacing.
4. **An answered question shrinks.** Once she has chosen, the answer becomes a Chip — not a card, not a banner. It is context, and context does not get the weight of the live question.

Applied, this took the relationship step from ~1400 dp of scroll to one 800 dp screen, and cut roughly 100 words from screens 1–6.

---

## The flow — four screens plus one per child

```
 Home card / Profile row
        │
        ▼
 1. You are covered ──── Not now ──► back, Home card stays
        │  Choose the person
        ▼
 2. Who should get the money? ── 8 cards, 2 labelled groups
        ▼
 3. Their name and birthday ── contacts │ type it │ Call Help
        │                      birthday ──► DatePicker sheet
        ▼
 4. Your children ── No children ──┐
        │  Yes → 1 · 2 · 3         │
        │  one row per child       │
        ▼                          │
 5. Child n ── name, boy/girl, ────┤
        │      birthday sheet      │
        │  (repeats, n ≤ 3)        │
        ▼                          │
 [ Check before we send ] ◄────────┘   confirm BottomSheet, not a screen
        ▼
 6. Your family is covered
```

Stepper `rail`, four nodes, non-interactive, under the VoicePrompt bar on screens 1–5: **Cover** `first-aid-kit` · **Who gets** `users-three` · **Children** `baby` · **Done** `check-circle`.

Every screen carries: HeaderNav `default` (back, title *Health cover*) · VoicePrompt `bar` autoplaying on first visit after `timeout.screenSettle` · the rail · one primary Button L full width above the safe area. Every screen saves on leave; re-entry lands on the first unfinished screen.

**Three structural decisions make this four screens instead of nine.** Each is borrowed and each is named:

1. **Name and birthday share one screen**, because the birthday is a BottomSheet, not a field. `text-field.md` allows two fields on a screen; this screen has one.
2. **The children question, the count and the list share one screen** — Alan's *Who is in your household?*, translated. The shipped flow spends a screen on the count and then N more; here the count *produces* the list in place.
3. **The review is a `confirm` BottomSheet**, not a screen. It keeps the P3 second look and costs nothing in the stack.

---

## 1. You are covered

The education screen, and the only one allowed to be long. Paper artboard `01`.

| Part | Component | Content |
| --- | --- | --- |
| Figure | pictogram `family` 120, then Amount `hero` | label *Your cover* · Tag `brand soft L` *Free* · **₹5,00,000** |
| Fact 1 | ListItem `informational`, pictogram `hospital-bed` 40 | *Hospital bills for your family* |
| Fact 2 | ListItem, pictogram `cash-in-hand` with a red ✗ dot | *You pay nothing at the hospital* |
| Fact 3 | ListItem, pictogram `family` 40 | *Your children are covered too* |
| Actions | ghost neutral M above, primary brand L below | *Not now* · **Choose the person** |

Three fact rows of pictogram + **one line each** — the shape Monese and Airbnb use for *what's covered*, and the shape that survives having its text covered. There is no paragraph under them and no second line per row: the amount is the hero, the three lines are the promise, the Button is the way in.

Two honest departures from the shipped screen. The green *100% FREE COVERAGE* pill becomes a `brand` Tag: success tone means done, paid or verified, and free is a price, not a status (P6, row 14). The grey image placeholder becomes the `family` pictogram, because a picture that carries nothing is worse than no picture (P1).

*Not now* is safe and reversible — she can return from Profile at any time — so it needs no confirmation sheet (P3: protect costly actions, not cheap ones). These two Buttons **are** the insurer's nominee yes/no; it is never asked again.

## 2. Who should get the money?

Paper artboard `02`. One `Heading3` — *Who should get the money?* — and the grid. **No body copy**; the voice says the rest.

Eight SelectionCard **`tile`** `single`, 48 dp pictogram above a one- or two-word label, two columns, four rows, all eight visible without scrolling on the 360 × 800 baseline. Ordered by how often each is chosen, not alphabetically — Apple Health orders the same list alphabetically and that is wrong here (P2: the common answer belongs nearest the thumb).

| Row | Left | Right |
| --- | --- | --- |
| 1 | Husband or wife | Son or daughter |
| 2 | Mother | Father |
| 3 | Brother | Sister |
| 4 | Husband's mother | Husband's father |

The labels drop *Your* because the question already said it. The in-law pair is no longer separated by a `labelled` Divider: the labels say *Husband's mother* and *Husband's father* outright, and the two pictograms carry a **second, smaller figure behind the parent** — the husband the relation runs through. Still the weakest row in the flow for P1, still the first field-test watch item, but weak by degree rather than blank.

The `tile` variant and the withdrawal of the earlier one-column proposal: `briefs/insurance-relationship-picker.md`. Reference: `references/mobbin-tile-pickers/`.

Primary Button: **Add their name**. Nothing is chosen and she taps it → group error per `selection-card.md` (`borderError` `thicker` on every unselected card, one error line) and the voice says *Choose one person.* The Button is never silently disabled (`text-field.md`).

Why eight cards on a screen and not a `select` sheet: `briefs/insurance-relationship-picker.md`. That brief stands — the sheet was considered and rejected on P1/P2, and this revision does not reopen it.

## 3. Their name and birthday

Paper artboard `03`; the birthday sheet is `04`. The chosen relationship rides at the top as a **Chip** — 48 dp, `bgBrandSubtle`, pictogram 32 + *Mother* + `pencil-simple`, sitting at the content edge where a title would. It is context, not a question, so it gets a chip's weight and not a card's (density rule 4). The loudest things on the screen are the contacts Button and the name field, which is what she is here to do.

There is **no `Heading3` on this screen**. The chip says who, and the two `BodyMd` field labels say what.

The name is the hardest field in the app, because **the insurer accepts Latin characters only** and she reads and writes in Devanagari or Kannada. Three doors, in order of how well they work:

1. **Pick from contacts** — Button `secondary brand L` with `address-book`, full width, above the field. Opens the `permission` BottomSheet (scene `permission-contacts`, one line: *We only read the one contact you pick*), then the OS picker. Contact names are already stored in Latin. This is the primary path, and Apple Health and Citizen both show it as the primary path rather than an alternative.
2. **Type it** — TextField `text`, label *Or type her name* (the label does the work a divider used to do), helper *In English letters*.
3. **Call Help** — Button `ghost brand M`, always visible on this screen. A trainer types it for her. This is the only screen in the app where Help is offered pre-emptively rather than as recovery, and the reason is the script mismatch.

**The read-back.** Once a name is present, a VoicePrompt `inline` sits inside the field and speaks it with on-device TTS. She cannot read Latin; she can hear whether the phone just said her mother's name. This is the verification channel for the whole screen and it is not optional. It carries no helper line telling her to tap it — the voice does that once, on arrival.

**The birthday** is a `BodyMd` label — *Her birthday* — over a ListItem that opens a `select` BottomSheet holding DatePicker `month` with a year stepper above it — never three dropdowns, never a typed date (`date-picker.md`). The year stepper **opens at a sensible year for the relationship chosen**: her own year for a husband or wife, minus 25 for a parent, plus 20 for a child. That default is what keeps the stepper to two or three taps instead of forty.

The summary line inside the sheet, always present and spoken when it changes: *Sunday, 28 January 1968 · 58 years old*. The **age** is the part she can actually check; the date is the part the insurer needs. The row on the screen behind then reads *28 January 1968 / 58 years old* with its own inline speaker.

She may not know it. Button `ghost brand M` **I'll ask her later** inside the sheet saves everything so far and closes with a Toast *Saved. Finish it from Profile.*

Primary Button: **Save this person**.

## 4. Your children

Paper artboard `05`. One screen, whatever the answer.

`Heading3` *Do you have children?* and two SelectionCard **`tile`**s side by side — **No children** and **Yes** — the same control she just used on screen 2. *No children* takes the `child` pictogram with a **red ✗ dot**, which is the register's own rule at work: the object says what, the dot says status, so one drawing answers both ways. *No children* goes straight to the review sheet.

On *Yes*, two things appear in place: a `BodyMd` label **How many?** over three 56 dp cards — **1 · 2 · 3** — and then **that many rows**. There is no sentence explaining the cap; the absence of a 4 is the message, and the voice says it once. A filled row is a ListItem with the child's pictogram 40, name, *Boy · 7 years old* and a `check-circle` `iconSuccess`. An unfilled row is dashed `borderBrand` with a `plus` in the pictogram slot, *Your second child* and a `caret-right` — no description line, because the child screen asks the questions.

The primary Button names the outstanding row — **Add your second child** — and becomes **Check my details** when every row is filled. The dashed row and the Button are the same action; the row is the status, the Button is the thumb-reachable version of it.

Changing the count down when a row is already filled asks first: `confirm` BottomSheet, *Remove Priya from your cover?*, safe option above.

## 5. Each child

Paper artboard `06`. Title counts in words she can hear: *Your first child*, *Your second child*.

One `Heading3` (*Your second child*) and three `BodyMd` labels — **Name**, **Boy or girl**, **Birthday**. The name is a TextField with the same inline read-back and the helper *In English letters*. **Boy** and **Girl** are two SelectionCard **`tile`**s side by side, the third use of the same control on this flow — which is the point: she learns one shape, not three. They map to the insurer's Male / Female; *Boy* and *Girl* are the words used about a child in all four languages, *Male* and *Female* are form words. The birthday row opens the same DatePicker sheet, year stepper opening at this year − 5.

One TextField, one choice, one sheet. Primary Button: **Save this child** → back to screen 4 with the row filled.

## Check before we send

Paper artboard `07`. BottomSheet `confirm` — non-dismissible while the decision is pending, no ✕, back returns to screen 4.

*Check before we send* / *Tap the speaker to hear each one. A wrong name means the money never arrives.* Then one card per person: pictogram 40, name in `BodyLg` SemiBold, the relationship line, the birthday in words with the age. A VoicePrompt `inline` on each card **reads the whole card aloud as one block**.

Actions: ghost *Change something* above, primary **Send my details** below. Submit: the Button goes `loading` with its label kept (`button.md`), the three-second rule applies (`timeout.loading`), and duplicate taps are blocked.

## 6. Your family is covered

Paper artboard `08`. Pictogram `family` at 120 with a green ✓ dot — **illustration layer, flat**. The shipped Thank-you screen uses a metallic starburst badge; metallic is the reward layer and belongs only to things she earned (`foundations/assets.md`, decided 2026-09-07). Being insured is not a prize.

Title `Heading2` *Your family is covered*. Body: *{Name} will get ₹5,00,000 if you can't claim it. {Children} are on your cover.* Spoken on arrival without being asked.

One Button: **Back to home**. No confetti, no metallic, no *Thank you* — she did us no favour, she protected her family.

---

## The five states

Paper artboard `10` draws the three that are easy to forget.

| State | What she sees |
| --- | --- |
| **Loading** | Skeleton of the real layout on screen 1 while the cover amount loads; three skeleton rows for the facts. Never `₹0` as a placeholder (`amount.md`) |
| **Empty** | Screen 4 with nobody added is not an empty state — it is a question with two cards |
| **Error** | Load failure → EmptyState `error` `page`, pictogram `search-document-✗`, *Couldn't open your cover* / *Your cover is safe. The network dropped.* / *Try again* + *Call Help*. Save failure → Snackbar *Couldn't save · Retry*, with everything she typed kept |
| **Offline** | Banner `offline` under the header, `wifi-slash`: *No internet. Keep filling — we'll send it when you're back.* **The whole form works offline** — contacts, pickers and typing are all local. Tapping *Send my details* offline queues it and shows a Snackbar *Saved on your phone. We'll send it when you're back online.* The Button is never disabled without saying why |
| **Resumed** | Every screen saves on leave. Re-entry from Profile lands on the first unfinished screen, the rail shows where she is, and the voice says *"Step two of four. Who gets the money."* |

---

## Voice (P4)

VoicePrompt `bar` on every screen, autoplaying on first visit only, recorded by a native speaker in each language. Inline controls on: each typed name (TTS read-back), each birthday summary line, and each card in the review sheet.

Spoken source lines — English, to be written as speech and reviewed aloud, ≤ 12 words a sentence, ≤ 3 sentences a screen:

| Screen | Spoken |
| --- | --- |
| 1 | *Snabbit gives you five lakh rupees of hospital cover. It is free.* / *Choose one person in your family. If you cannot claim the money, they get it.* |
| 2 | *Who should get the money? Choose one person.* / *The second group is your husband's family.* |
| 3 | *Pick them from your contacts. Or type their name in English letters.* / *Tap the speaker to hear the name you wrote.* |
| 3 sheet | *Choose the year first, then the month, then the day.* / *Don't know it? Tap "I'll ask her later".* |
| 4 | *Do you have children? We can put them on your cover too.* |
| 5 | *Your second child. Their name, boy or girl, and their birthday.* |
| Review | *Listen to each card. If something is wrong, tap "Change something".* |
| 6 | *Done. {Name} will get five lakh rupees if you cannot claim it.* |

Numbers are spoken as words and units, never digit by digit.

---

## The words

Every term on the left is what appears on screen and in the four translations. Every term on the right exists only in code, the insurer's forms and this document. Already added to the `PRINCIPLES.md` vocabulary table.

| Say | Not | Why |
| --- | --- | --- |
| Cover · You are covered | policy, plan, scheme, insurance product | *Insurance* itself is fine — बीमा (Hindi/Marathi) and ವಿಮೆ (Kannada) are everyday words. *Policy* and *scheme* are not |
| The person who gets the money | nominee, beneficiary, assignee | No everyday equivalent in any of her languages; the translations are more formal than the English |
| Hospital bills | hospitalisation, in-patient, admission | |
| You pay nothing at the hospital | cashless treatment, cashless claim, network hospital | Says the outcome, not the mechanism |
| Your family on the cover | dependents, family floater, add-on members | |
| Boy · Girl | Male · Female | For a child, in all four languages |
| Free | 100% free, no cost to you, complimentary | One word; the price is zero and nothing else needs saying |

---

## What changes from the current screens

**Screens are not the measure — interactions are.** The shipped flow is short in artboards and long in work; Marcus proves that compressing it further would make it worse (`references/marcus-add-beneficiary/`). This redesign holds the screen count and roughly halves the work inside it.

| For an expert with two children | Shipped | Redesign |
| --- | --- | --- |
| Screens | 6 | 6 (4 + one per child) |
| Screens with more than one question | 3 | 1 (the children screen) |
| Discrete interactions (estimate) | ~61 | ~40 |
| Characters typed | ~27 | ~10 |
| Digits typed from memory | 10 | 0 |
| Dropdown pickers opened | 6 | 0 |
| Screens that speak | 0 | 6 |
| States designed | 1 | 5 |

Every difference as one sentence, with the principle:

| Current | Redesign | Why |
| --- | --- | --- |
| The flow is built around the word *nominee* | The word never appears; the question is *Who should get the money?* | P1, P9 — it has no everyday translation |
| One grey image placeholder and three outline icons | 12 registered pictograms; every choice is made by picture first | P1, rows 9–10 — cover the text and the current flow is blank |
| *Hospitalization*, *Cashless treatment*, *Coverage Amount* | *Hospital bills*, *You pay nothing at the hospital*, *Your cover* | P1, P9 |
| Checkboxes for Yes/No, relationship and gender | SelectionCard `single` everywhere; a square never promises "one" | P1, P3 |
| Eight relationship targets in two columns at ~20 dp | Eight SelectionCard `tile`s, 158 × 104, two columns, **all eight on one screen** | P3, row 1 · `references/mobbin-tile-pickers/` |
| Date of birth as three dropdowns, three times | DatePicker `month` in a sheet, year stepper opening near the answer, date read back in words with the age | P3 — the DS removed the dropdown control |
| *Do you have a nominee?* asked again after screen 1 already asked it | Asked once, on screen 1, as two Buttons | P2 |
| Five questions on screen 2 | Relationship on its own screen; name + birthday on the next, one field and one sheet | P2 |
| The nominee's phone number typed by hand | **The field is gone** — the insurer does not need it | P3 — ten digits from memory was the flow's biggest error source |
| A Latin-only name field with no way through it | Contacts picker first, typing second, Call Help third, TTS read-back over all three | P1, P4 — she cannot proofread a script she does not read |
| *How many kids do you have?* on its own screen, then that many forms | Question, count and list on one screen; the rows appear as the count is chosen | P2, P5 — Alan's household screen, translated |
| Max 4 children implied | Max 3, said out loud beside the count | P5 |
| No loading, error or offline state | Five states designed; the form works offline and the submit queues | P5, row 5 |
| No sign of where she is | Stepper `rail`, four nodes, spoken on entry | P5 |
| *Continue* × 4 | *Choose the person*, *Add their name*, *Save this person*, *Add your second child*, *Save this child*, *Send my details*, *Back to home* | P2 — actions are verbs that name the outcome |
| Title Case, and `*` for required | Sentence case; no asterisks | Type rules, P1 |
| A heading over every input | One `Heading3` per screen (the question); every field and group labelled in `BodyMd` Medium | `text-field.md` § Anatomy |
| Explanatory sentences under questions | None. The VoicePrompt carries the explanation | P4 — she hears faster than she reads |
| An answered question stays as a full-width card | It shrinks to a Chip | P2 — context does not get the weight of the live question |
| Secondary Button below the primary on screen 1 | Secondary above, primary lowest and nearest the thumb | `button.md` placement, P3 |
| Metallic starburst on the Thank-you screen | Flat illustration pictogram with a green ✓ dot | `assets.md` — metallic is the reward layer, and being insured is not a prize |
| Green *100% FREE COVERAGE* pill | Tag `brand soft` *Free* | Row 14 — success tone means done, paid or verified |
| No confirmation of what is being sent | A `confirm` sheet reads every card aloud before submit, at no cost in screens | P3 — a wrong name is a payout that never arrives |
| **₹6 Lakh and ₹5,00,000 on the same screen** | **₹5,00,000** everywhere | P5 — resolved 2026-09-11 |
| Placed as Step 5 of onboarding | Placed after go-live, two doors | She is already covered; nothing here should delay her first shift |

---

## New assets — 12 pictograms

Registered in `foundations/assets.md`. Illustration layer, pink disc + magenta object, 40 and 64 dp (120 for the two hero uses), SVG.

`family` · `hospital-bed` · `spouse` · `mother` · `father` · `brother` · `sister` · `mother-in-law` · `father-in-law` · `child` · `boy` · `girl`

**Cashless needs no new asset.** The existing `cash-in-hand` object takes a red ✗ dot — the register's own rule is that the object says what and the dot says status, so one object carries both outcomes.

`mother-in-law` and `father-in-law` are drawn as the parent figure with a **second, smaller `pink.300` figure behind them** — the husband the relation runs through. That plus the self-describing labels (*Husband's mother*) replaces the `labelled` Divider the 2026-09-09 version relied on. Still the field-test watch item. The Paper artboards use placeholder geometry for all twelve — they are positioned, sized and coloured correctly, but the final drawings come from the *Snabbit Assets* file.

New Phosphor rows, now in `foundations/icons.md`: `first-aid-kit` · `users-three` · `baby` · `address-book` · `pencil-simple`.

---

## Open

1. **Does she get a policy document?** If so, screen 6 gains a second ghost Button and Profile gains a row; the document is a PDF she cannot read, so it needs a spoken summary beside it.
2. **Consent or e-signature?** Assumed none. If the insurer needs a declaration, it goes in the review `confirm` sheet, spoken in full, never a scroll-to-accept.
3. **More than one nominee, with a percentage split?** Assumed one. A split would need a new screen and probably a Tier 3 control; do not add it without evidence that experts ask for it.
4. **Telugu** — if the fifth language launches (`patterns/onboarding.md`), every recorded line here is recorded again.
5. **If the insurer later makes a nominee mandatory for enrolment**, *Not now* leaves screen 1 and the placement decision is reopened. Nothing else on this screen changes.

---

## Checklist for the flow

- [ ] Cover the text on all six screens: can a first-week expert still choose the right person?
- [ ] Greyscale: are the eight relationship cards still distinguishable? (Expected: six yes, two by heading only.)
- [ ] Kannada at font scale 1.3 on 360 × 800: **eight tile labels inside 158 × 104**, every field label, seven Button labels — nothing clipped, nothing shrunk. This is the `tile` variant's open risk.
- [ ] Read every screen aloud and count the words that are not a question, an option or an action. The target is zero.
- [ ] Contacts picker fills the name in one tap on the three most common phones in the fleet.
- [ ] TTS read-back speaks a typed Latin name correctly in all four language settings.
- [ ] The year stepper's opening default lands within three taps of the real year for each of the eight relationships.
- [ ] Airplane mode from screen 2 to the review sheet: everything fills, the submit queues, nothing is lost.
- [ ] Leave at screen 3 and return from Profile: lands on screen 3, rail correct, voice announces the step.
- [ ] Lower the child count with a row already filled: the confirm sheet appears and nothing is silently dropped.
- [ ] Every spoken line heard, not read, by a native speaker of each language (row 15).
- [ ] Baseline device and 3G profile (row 16).
- [ ] Field review: watch the in-law row, and watch whether *I'll ask her later* is used more than it is designed for.
