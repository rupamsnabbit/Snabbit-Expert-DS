# Pattern — free health cover

She has a free ₹6,00,000 health cover from the day she goes live. To put it in force the insurer needs four things: who receives the money if she cannot claim it, that person's name, birth date and phone, and the children who go on the policy with her. Today that is seven screens of dense English built around a word — *nominee* — that has no everyday equivalent in any of her languages.

This pattern rebuilds the same data collection as a sequence of single questions answered by picture and voice. **Nothing about what we collect changes**; the insurer's fields are fixed. Everything about how it is asked does.

Tier: **2 — composition** throughout, plus 12 registered pictograms and one proposed change to core (`briefs/insurance-relationship-picker.md`). Reference read: `references/insurance-flow-current.md`.

---

## The one rule for this flow

**Never write *nominee*.** The question is always *who should get the money*, and the answer is always a face and a name. *Nominee* stays in the API payload, the insurer's forms and this document's margins; it never reaches a screen, a voice line or a translation. See the word table below.

---

## Where it lives

Placed after go-live (decided 2026-09-09) — she is already earning, so there is no time pressure and no blocked shift. Two doors:

| Entry | Component | Content |
| --- | --- | --- |
| **Home** | Card `static`, pictogram `family` 64, footer Button `secondary brand M` | *Your free health cover* · Amount `lg` **₹6,00,000** · Tag `brand soft L` *Free* · *See your cover* |
| **Profile** | ListItem `navigational`, leading `first-aid-kit` 24 in a 40 dp `bgBrandSubtle` box | *Health cover* · description *₹6,00,000 · Free* · status line `warning-circle` *Choose who gets the money* while incomplete |

The Home card disappears once the cover is complete; the Profile row stays and opens the review screen. **No Profile tab badge** — `bottom-tab-bar.md` reserves that for a document that will block work, and this does not block work.

---

## The flow

```
 Home card / Profile row
        │
        ▼
 1. You are covered ──── Not now ──► back, Home card stays
        │  Choose the person
        ▼
 2. Who gets the money ── 8 cards, 2 labelled groups
        ▼
 3. Their name and number ── pick from contacts │ type it │ Call Help
        ▼
 4. Their birthday ── month picker + year stepper ── or "I'll ask them later" (saves)
        ▼
 5. Your children ── No children ──┐
        │  Add a child             │
        ▼                          │
 5a. Name and boy/girl             │
 5b. Their birthday ──── loop ─────┤
        │  Save my family          │
        ▼                          │
 6. Check before we send ◄─────────┘
        ▼
 7. Done ── your family is covered
```

Stepper `rail`, four nodes, non-interactive, under the VoicePrompt bar on screens 1–6: **Cover** `first-aid-kit` · **Who gets it** `users-three` · **Children** `baby` · **Done** `check-circle`.

Every screen carries: HeaderNav `default` (back, title *Health cover*) · VoicePrompt `bar` autoplaying on first visit after `timeout.screenSettle` · the rail · one primary Button L full width above the safe area. Every screen saves on leave; re-entry lands on the first unfinished screen.

---

## 1. You are covered

The education screen, and the only one that is allowed to be long. Pictogram `family` 120 dp, then the number, then three facts, then one line of honesty, then the way in.

| Part | Component | Content |
| --- | --- | --- |
| Figure | Amount `hero` | label *Your cover* · **₹6,00,000** · Tag `brand soft L` *Free* beside the label |
| Fact 1 | ListItem `informational`, pictogram `hospital-bed` 40 | *Hospital bills up to ₹6,00,000* / *For you and your family* |
| Fact 2 | ListItem, pictogram `cash-in-hand` with a red ✗ dot | *You pay nothing at the hospital* / *Snabbit pays them directly* |
| Fact 3 | ListItem, pictogram `family` 40 | *Your family is covered too* / *Add them here* |
| The ask | `BodyLg` `textBody` | *Choose one person. If you can't claim the money, it goes to them.* |
| Actions | ghost neutral M above, primary brand L below | *Not now* · **Choose the person** |

Two honest departures from the shipped screen. The green *100% FREE COVERAGE* pill becomes a `brand` Tag: success tone means done, paid or verified, and free is a price, not a status (P6, row 14). The grey image placeholder becomes the `family` pictogram, because a picture that carries nothing is worse than no picture (P1).

*Not now* is safe and reversible — she can return from Profile at any time — so it needs no confirmation sheet (P3: protect costly actions, not cheap ones). **Open:** if the insurer makes a nominee mandatory for enrolment, *Not now* is removed and the flow becomes part of go-live; nothing else on this screen changes.

## 2. Who should get the money?

Title `Heading3` *Who should get the money?* Body, two lines: *Choose one person from your family.* / *This is only if you can't claim it yourself.*

Eight SelectionCard `rich` `single`, 64 dp pictogram, in two `labelled` Divider groups — *Your family* (husband or wife, son or daughter, mother, father, brother, sister) and *Your husband's family* (his mother, his father). Ordered by how often each is chosen, not alphabetically.

The two in-law cards are the weakest place in the whole flow for P1: a mother and a mother-in-law cannot be told apart by drawing. The group heading and the spoken line carry them, and this row is the first thing to watch in field testing.

Primary Button: **Add their name**. Nothing is chosen and she taps it → group error per `selection-card.md` (`borderError` `thicker` on every unselected card, one error line) and the voice says *Choose one person.* The Button is never silently disabled (`text-field.md`).

Why eight cards and not a `select` sheet, and the proposed change to core: `briefs/insurance-relationship-picker.md`.

## 3. Their name and number

The hardest screen in the flow, because **the insurer accepts Latin characters only** and she reads and writes in Devanagari or Kannada. Three doors, in order of how well they work:

1. **Pick from contacts** — Button `secondary brand L` with `address-book`, full width, above the fields. Opens the `permission` BottomSheet (scene `permission-contacts`, one line: *We only read the one contact you pick*), then the OS picker. Fills **name and number in one tap**, and contact names are already stored in Latin. This is the primary path and it solves both fields at once.
2. **Type it** — TextField `text` *Full name*, helper *In English letters, the same as on their Aadhaar*; TextField `phone` *Their phone number* on the NumericKeypad with live grouping. Two fields is the maximum on one screen (`text-field.md`).
3. **Call Help** — Button `ghost brand M`, always visible on this screen. A trainer types it for her. This is the only screen in the app where Help is offered pre-emptively rather than as recovery, and the reason is the script mismatch.

**The read-back.** Once a name is present, a VoicePrompt `inline` sits beside it and speaks it with on-device TTS. She cannot read Latin; she can hear whether the phone just said her husband's name. This is the verification channel for the whole screen and it is not optional.

The chosen relationship stays visible at the top as its pictogram 40 + a `brand soft L` Tag, so she never loses track of who she is describing.

Primary Button: **Add their birthday**.

## 4. Their birthday

DatePicker `month` with the year stepper above it — never three dropdowns, never a typed date (`date-picker.md`). The year stepper opens at a sensible year for the relationship chosen: her own year for a husband or wife, minus 25 for a parent, plus 20 for a child.

The summary line under the grid, always present and spoken when it changes: *Wednesday, 28 January 2000 · 26 years old*. The **age** is the part she can actually check; the date is the part the insurer needs.

She may not know it. Button `ghost brand M` **I'll ask them later** saves everything so far and closes with a Toast *Saved. Finish it from Profile.* This drops no field — it moves it to a second sitting, which the placement decision allows.

Primary Button: **Save this person**.

## 5. Your children

The count question is gone. Asking *how many kids do you have?* as an abstract number, and then asking for that many sets of details, invites a mismatch she cannot fix. Instead she adds people to a list, and the count is what we send.

**Nobody added yet:** pictogram `child` 120, title *Do you have children?*, body *We can add them to your cover.* Buttons — ghost *No children* above primary **Add a child**.

**One or more added:** a list of ListItem rows (pictogram `boy` / `girl` 40, title the child's name, description *7 years old*, trailing `caret-right` to edit) and a Card `empty` dashed *Add another child*. Buttons — ghost *Add another child* above primary **Save my family**.

At four children the `empty` card is replaced by a line *That's the most we can add* (the insurer's cap). *No children* goes straight to screen 6.

### 5a. Your first child

TextField `text` *Child's name*, English-letters helper and the same VoicePrompt `inline` read-back as screen 3. Then two SelectionCard `rich` `single` with 64 dp pictograms — **Boy** and **Girl** — which map to the insurer's Male / Female. *Boy* and *Girl* are the words used about a child in all four languages; *Male* and *Female* are form words.

The title counts in words she can hear: *Your first child*, *Your second child*.

Primary Button: **Add their birthday**.

### 5b. When was {name} born?

As screen 4, year stepper opening at this year − 5, summary line *28 January 2019 · 7 years old*. Primary Button: **Save this child** → back to screen 5 with the row added.

## 6. Check before we send

The P3 second look, and the most valuable screen in the flow — a wrong name here is a payout that never arrives.

One Card per person: pictogram 40, name in `Heading3`, relationship as a `brand soft` Tag, birthday in words, phone number grouped, and a `pencil-simple` IconButton M ghost that jumps back to the step that owns it. A VoicePrompt `inline` on each card **reads the whole card aloud as one block** — the name, the relationship, the date in words, the number digit-grouped as *nine eight four seven, two one, six one five nine*, which is the one place in the system a number is read in groups instead of as a value, because she is checking it against what she was told.

Buttons — ghost *Change something* above primary **Send my details**.

Submit: the Button goes `loading` with its label kept (`button.md`), the three-second rule applies (`timeout.loading`), and duplicate taps are blocked.

## 7. Done

Pictogram `family` at 120 with a green ✓ dot — **illustration layer, flat**. The shipped Thank-you screen uses a metallic starburst badge; metallic is the reward layer and belongs only to things she earned (`foundations/assets.md`, decided 2026-09-07). Being insured is not a prize.

Title `Heading3` *Your family is covered*. Body: *{Name} will get ₹6,00,000 if you can't claim it.* Spoken on arrival without being asked.

One Button: **Back to home**. No confetti, no metallic, no *Thank you* — she did us no favour, she protected her family.

---

## The five states, everywhere

| State | What she sees |
| --- | --- |
| **Loading** | Skeleton of the real layout on screen 1 while the cover amount loads; three skeleton rows for the benefits. Never `₹0` as a placeholder (`amount.md`) |
| **Empty** | Screen 5 with nobody added is not an empty state — it is a question with two Buttons |
| **Error** | Load failure → EmptyState `error` `page`, pictogram `search-document-✗`, *Couldn't open your cover* / *Your cover is safe. The network dropped.* / *Try again* + *Call Help*. Save failure → Snackbar *Couldn't save · Retry*, with everything she typed kept |
| **Offline** | Banner `offline` under the header. **The whole form works offline** — contacts, pickers and typing are all local. The final submit queues: tapping *Send my details* while offline shows a Snackbar *Saved on your phone. We'll send it when you're back online.* The Button is never disabled without saying why |
| **Resumed** | Every screen saves on leave. Re-entry from Profile lands on the first unfinished screen, the rail shows where she is, and the voice says *"Step two of four. Who gets the money."* |

---

## Voice (P4)

VoicePrompt `bar` on screens 1–7, autoplaying on first visit only, recorded by a native speaker in each language. Inline controls on: each typed name (TTS read-back), each birthday summary line, and each card on screen 6.

Spoken source lines — English, to be written as speech and reviewed aloud, ≤ 12 words a sentence, ≤ 3 sentences a screen:

| Screen | Spoken |
| --- | --- |
| 1 | *Snabbit gives you six lakh rupees of hospital cover. It is free.* / *Choose one person in your family. If you cannot claim the money, they get it.* |
| 2 | *Who should get the money? Choose one person.* / *The second group is your husband's family.* |
| 3 | *Pick them from your contacts. Or type their name in English letters.* / *Tap the speaker to hear the name you wrote.* |
| 4 | *Choose the year first, then the month, then the day.* / *Don't know it? Tap "I'll ask them later".* |
| 5 | *Do you have children? We can put them on your cover too.* |
| 6 | *Listen to each card. If something is wrong, tap the pencil.* |
| 7 | *Done. {Name} will get six lakh rupees if you cannot claim it.* |

Numbers are spoken as words and units, never digit by digit — the one exception is the phone number on screen 6, which is spoken in groups because she is checking it.

---

## The words

Every term on the left is what appears on screen and in the four translations. Every term on the right exists only in code, the insurer's forms and this document. Proposed as rows in the `PRINCIPLES.md` vocabulary table.

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

Every difference as one sentence, with the principle. The reference read is `references/insurance-flow-current.md`.

| Current | Redesign | Why |
| --- | --- | --- |
| The flow is built around the word *nominee* | The word never appears; the question is *Who should get the money?* | P1, P9 — it has no everyday translation |
| One grey image placeholder and three outline icons | 12 registered pictograms; every choice is made by picture first | P1, rows 9–10 — cover the text and the current flow is blank |
| *Hospitalization*, *Cashless treatment*, *Coverage Amount* | *Hospital bills*, *You pay nothing at the hospital*, *Your cover* | P1, P9 |
| Checkboxes for Yes/No, relationship and gender | SelectionCard `single` everywhere; a square never promises "one" | P1, P3 |
| Eight relationship targets in two columns at ~20 dp | Eight full-width cards ≥ 64 dp in two labelled groups | P3, row 1 |
| Date of birth as three dropdowns, twice | DatePicker `month` with a year stepper, and the date read back in words with the age | P3 — the DS removed this control |
| *Do you have a nominee?* asked again after screen 1 already asked it | Asked once, on screen 1, as two Buttons | P2 |
| Five questions on screen 2 | One question per screen, two fields maximum | P2 |
| *How many kids do you have?* then that many forms | She adds children to a list; the count is derived | P5 — the count and the details can no longer disagree |
| Nothing speaks | VoicePrompt `bar` on every screen; inline read-back on every typed name | P4, row 12 |
| A Latin-only name field with no way through it | Contacts picker first, typing second, Call Help third, TTS read-back over all three | P1, P4 — she cannot proofread a script she does not read |
| The phone number typed by hand | One tap from contacts; typing is the fallback | P3 — ten digits from memory is the flow's biggest error source |
| No loading, error or offline state | Five states designed; the form works offline and the submit queues | P5, row 5 |
| No sign of where she is | Stepper `rail`, four nodes, spoken on entry | P5 |
| *Continue* × 4 | *Choose the person*, *Add their name*, *Add their birthday*, *Save this person*, *Save my family*, *Send my details*, *Back to home* | P2 — actions are verbs that name the outcome |
| Title Case, and `*` for required | Sentence case; no asterisks | Type rules, P1 |
| Secondary Button below the primary on screen 1 | Secondary above, primary lowest and nearest the thumb | `button.md` placement, P3 |
| Metallic starburst on the Thank-you screen | Flat illustration pictogram with a green ✓ dot | `assets.md` — metallic is the reward layer, and being insured is not a prize |
| Green *100% FREE COVERAGE* pill | Tag `brand soft` *Free* | Row 14 — success tone means done, paid or verified |
| No confirmation of what is being sent | Screen 6 reads every card aloud before submit | P3 — a wrong name is a payout that never arrives |
| **₹6 Lakh and ₹5,00,000 on the same screen** | One number everywhere | P5 — see Open, below |

Seven screens become nine for a nominee with one child. That is the deliberate trade: each screen asks one thing, and there is no clock on this flow. If field testing shows the length hurts more than the density did, the merge to make first is screens 3 and 4 behind a single *About them* scroll — not the relationship step, and never the review.

---

## New assets — 12 pictograms

Registered in `foundations/assets.md`. Illustration layer, pink disc + magenta object, 40 and 64 dp (120 for the two hero uses), SVG.

`family` · `hospital-bed` · `spouse` · `mother` · `father` · `brother` · `sister` · `mother-in-law` · `father-in-law` · `child` · `boy` · `girl`

**Cashless needs no new asset.** The existing `cash-in-hand` object takes a red ✗ dot — the register's own rule is that the object says what and the dot says status, so one object carries both outcomes.

`mother-in-law` and `father-in-law` are drawn as distinct assets but will read as near-identical to `mother` and `father`; the labelled group heading and the voice carry them. Flagged as the field-test watch item.

New Phosphor rows for `foundations/icons.md`: `first-aid-kit` (health cover), `users-three` (the family on the cover), `baby` (children), `address-book` (pick from contacts), `plus-circle` (add to a list — the Card `empty` affordance), `pencil-simple` (edit this answer).

---

## Open

1. **Is a nominee optional?** If the insurer requires one to enrol, *Not now* leaves screen 1 and the flow joins go-live. Everything else is unchanged. Awaiting the insurer.
2. **₹6 Lakh or ₹5,00,000?** The shipped screen says both. The redesign uses ₹6,00,000 throughout as a placeholder; one number must win before this ships.
3. **Why do we collect children?** Assumed coverage-relevant. If it turns out to be records only, screen 5 gets a *Skip* and stops claiming they are covered.
4. **More than one nominee, with a percentage split?** Assumed one. A split would need a new screen and probably a Tier 3 control; do not add it without evidence that experts ask for it.
5. **Consent or e-signature?** Assumed none. If the insurer needs a declaration, it is a `confirm` BottomSheet before screen 6's submit, spoken in full, never a scroll-to-accept.
6. **Does she get a policy document?** If so, screen 7 gains a second ghost Button and Profile gains a row; the document is a PDF she cannot read, so it needs a spoken summary beside it.
7. **Telugu** — if the fifth language launches (`patterns/onboarding.md`), every recorded line here is recorded again.

---

## Checklist for the flow

- [ ] Cover the text on all nine screens: can a first-week expert still choose the right person?
- [ ] Greyscale: are the eight relationship cards still distinguishable? (Expected: six yes, two by heading only.)
- [ ] Kannada at font scale 1.3 on 360 × 800: eight card titles, two group headings, seven Button labels — nothing clipped, nothing shrunk.
- [ ] Contacts picker fills both fields in one tap on the three most common phones in the fleet.
- [ ] TTS read-back speaks a typed Latin name correctly in all four language settings.
- [ ] Airplane mode from screen 2 to screen 6: everything fills, the submit queues, nothing is lost.
- [ ] Leave at screen 4 and return from Profile: lands on screen 4, rail correct, voice announces the step.
- [ ] Every spoken line heard, not read, by a native speaker of each language (row 15).
- [ ] Baseline device and 3G profile (row 16).
- [ ] Field review: watch the in-law row, and watch whether *I'll ask them later* is used more than it is designed for.
