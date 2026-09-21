# Beauty shift lifecycle / Spot check

Tier: **3 (local)**
Owner: Rupam Banik · Date: 2026-09-12
Project: `projects/beauty-shift-lifecycle` (PRD § 5)

## Idea

At the end of her shift a Beauty expert confirms five pouches with five taps. Two of those taps cover 40-odd items she has not looked at. The spot check picks **two random carry items a day** and asks a question she cannot answer without physically finding the thing — so one of the five taps a night is backed by evidence instead of habit.

The PRD's own words for why it exists: *"Selection rotates daily so blind confirming gets caught."*

## Why not existing

The PRD describes it as *"2 rotating spot checks on random carry items the expert must physically locate and confirm."* Read literally that is a Checkbox, and a Checkbox cannot do the job — **a tick is exactly the blind confirming the check exists to catch.** Whatever we build, its whole value is in being un-fakeable from the sofa.

| Tried | Why not |
| --- | --- |
| **Checkbox / SelectionCard** | Confirmation with no evidence. Identical effort whether she looks or not, so it changes nothing and costs a screen. |
| **MediaCapture** — photograph the item | Un-fakeable, and far too expensive: camera launch on a ₹10k phone, a photo upload on prepaid data, at 9 pm in a stairwell (P8). It also reads as an accusation every single night (P6). |
| **A hold instead of a tap** | Measures patience, not possession. |
| **NumericKeypad** for the count | The right *question*, the wrong control — a keypad for a single digit from a known small range is four taps where one will do, and the keypad is the app's money surface. |
| **Chip group alone** (Tier 2) | Closest, and genuinely tempting. Rejected because the component is not the chips — it is the pairing of a **catalogue image, a locate instruction, a bounded answer set derived from expected stock, and a can't-find escape**, plus the rotation rule that makes the whole thing work. That logic has to live somewhere named, or it gets re-invented differently on the next surface. |

## The component

One question per screen, one item, no list.

```
┌──────────────────────────────────────────┐
│ ‹  Quick check                3 of 4     │  ProgressBar, flow-level
│                                          │
│         [ catalogue image ]               │  96 dp, from the item's catalogue data
│                                          │
│       Find your rose water                │  Heading3, centred
│     How many bottles do you have?         │  BodyLg textBody, centred
│                                          │
│   ( 0 )   ( 1 )   ( 2 )   ( 3+ )          │  Chip, 56 dp, single-select, 8 dp apart
│                                          │
│       [ I can't find it ]                 │  Button ghost neutral → flags missing
└──────────────────────────────────────────┘
```

**Answer set.** Four Chips, always four, built around the expected count — expected, expected ± 1, and a bounded high option. Never *Yes / No*, and never a free number: bounded answers keep it to one tap while still requiring her to have looked.

**Rotation.** Two per session, drawn from **carry** items only (restock items are already counted at step 1). The server picks and rotates daily so the pair is never predictable; the client never chooses.

**What a wrong answer does — nothing, tonight.** It records a mismatch and moves on. It never blocks, never accuses, and never issues a red card at the moment of answering — the PRD is explicit that the red card is retrospective and comes from a real discovery, not from a checklist. A pattern of mismatches is an ops signal, not a screen.

**I can't find it** flags the item as missing and it joins the summary sheet at step 5.4 with everything else. Finding nothing is a legitimate answer, and making it a quiet ghost button rather than a hidden one is what keeps the other answers honest.

## Translation

**Tokens.** Nothing new. `spacing.5` margins, `spacing.4` between chips, `radius.lg` on the image frame, `Heading3` / `BodyLg` / `BodyMd`, `textPrimary` / `textBody`, Chip's own tokens.

**Core components inside it:** Chip (single-select), Button `ghost neutral`, ProgressBar, HeaderNav `page`. The image is catalogue content, not a registered asset (`foundations/assets.md` — product images are data).

**States.** default · one chip selected → auto-advance after `timeout.settle` · offline → works fully, answer queues · no expected count from the server → the step is skipped silently rather than guessed.

**Audio (P4).** The question is spoken on arrival after `timeout.screenSettle`: *Find your rose water. How many bottles do you have?* This is the step most likely to be done with the phone propped against the bag while both hands are in it.

## Deviations

- Breaks from the PRD's literal *"locate and confirm"* on the control: it asks a question rather than taking a confirmation, because a confirmation cannot satisfy the PRD's own stated purpose. Everything else — two per session, random, carry items only, rotating daily — is as written.

## Principles checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ Chips 56, ghost Button 48, 8 dp apart |
| 2 | ⚙ Semantic tokens only | ✅ no new tokens |
| 3 | ⚙ Type scale | ✅ Heading3 / BodyLg |
| 4 | ⚙ States by ≥ 2 channels | ✅ Chip selection is fill + border + weight |
| 5 | ⚙ Loading / empty / error / offline | ✅ skipped when no data; queues offline |
| 6 | ⚙ Duplicate taps blocked | ✅ `timeout.tapGuard` before auto-advance |
| 7 | ⚙ Text wraps, four languages | ✅ two-line question budgeted; chip labels are numerals |
| 8 | ⚙ Reduced motion, ≤ 300 ms | ✅ advance is a cross-fade |
| 9 | Meaning without text | ✅ the image plus four numbers is the question |
| 10 | Greyscale | ✅ selection is border weight + fill, not hue |
| 11 | Costly protected, desired one tap | ✅ answering is one tap; nothing here is costly |
| 12 | Sound / voice | ✅ question spoken |
| 13 | Error copy | ✅ no error state — a wrong answer is data, not a failure |
| 14 | Tier colours | ✅ none used |
| 15 | Copy reviewed aloud | ⬜ pending four-language review |
| 16 | Baseline device | ⬜ pending — no camera, no upload, so expected to be cheap |

## Promotion

Stays Tier 3, and may not survive at all: product has said it is an experiment — *"it could work or it could not work. Learning है। हटा देंगे."* It is therefore built to be deleted — its own step in the flow, feeding nothing downstream except the missing-items list, so removing it costs one screen and one line of the recap.

If it does survive and a second flow needs *verify possession of a physical thing* (uniform check, document check at a hub), that is the second use. Third use promotes it to core.
