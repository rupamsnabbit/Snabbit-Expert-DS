# Reference read — Alan · Adding a family member

App: **Alan** (health insurance, France) · Platform: iOS · Captured: 2026-09-11
Mobbin: https://mobbin.com/flows/8fdfedbf-5115-4e9f-ae14-1c7cdf235352 (26 screens)
Supporting: [Insurance (profile)](https://mobbin.com/flows/04fb6374-377e-4f48-b42b-cdbee8a58012) · [health contract screen](https://mobbin.com/screens/4bc98bc2-d304-47c0-8c51-0adc0a0a2340)
Fed: `patterns/insurance.md` (screens 3–6), Paper file *Snabbit* → page **Insurance**.

Screenshots are **not committed**. Mobbin captures are internal reference only (`principles/EXTENDING.md` § Where inspiration comes from) and this repository publishes to GitHub Pages. The URLs above are the record.

---

## 1. Name the idea

Put a household onto a health policy by asking *who is in it* as a set of yes/no switches on one screen, then opening a short sub-flow only for the ones switched on — so a person with no dependants answers one question and leaves.

## 2. Separate idea from expression

**Borrowable.** (a) *Who is in your household?* as one screen of switches rather than a count question followed by N forms. (b) Date of birth as **month + day stepper + year inline inside the question screen**, never its own step and never three dropdowns. (c) One question per screen, each with a small picture above it. (d) The sub-flow for each person is short and returns to the list.

**Not borrowable.** The indigo/lavender palette, the emoji-as-illustration (🐥, 🏠, 💗 — banned by `foundations/assets.md` and P1), the legal register (*Cohabitant*, *article 515-8 of Civil Code*), the toggle control itself (a switch means on/off of a setting, not "I have children" — `selection-controls.md`), and the reliance on reading fluent French.

## 3. Run it against the expert

| Failure | Principle | Fix in the translation |
| --- | --- | --- |
| Toggles carry the answer; a switch reads as a setting, not an answer to a question | P1 | SelectionCard `single` — No children / Yes, I have children |
| The emoji is the only picture, and it carries nothing | P1, `assets.md` | Registered pictograms, pink disc + magenta object |
| The declaration text is a wall of legal prose behind a *?* | P1, P9 | One spoken line and one body line; no disclosure sheet |
| Nothing speaks | P4 | VoicePrompt `bar` on the screen, inline read-back on the typed name |

## 4. Tier

**Tier 2 — composition.** Nothing new is needed: SelectionCard, DatePicker `month` in a BottomSheet, ListItem, Button.

## 5. Translate

`patterns/insurance.md` § 4 *Your children* and § 5 *Each child*. The household-in-one-screen idea is what collapses the shipped flow's *How many kids do you have?* screen plus N detail screens into one question screen with an inline list.

## 6. Side by side

The *What changes* table in `patterns/insurance.md`. Every borrowing is structural; nothing of Alan's skin survives.
