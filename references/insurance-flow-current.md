# Reference read — the current insurance flow

Source: Snabbit Expert app, *Step 5 · Insurance* — seven screens shared by Rupam Banik on 2026-09-09.
Screenshot: `references/insurance-flow-current.png` (save the shared image here).
Fed: `patterns/insurance.md`, `briefs/insurance-relationship-picker.md`.

This is our own current UI, not an outside inspiration — but the procedure is the same, because the request was "revamp this" and the danger is the same: restyling the screenshot instead of translating the idea. The screens are evidence of what ships (`references/SCREENS.md`), not a source of expression.

The seven screens: **1** Insurance Coverage (benefits, *Add nominee* / *I don't want to add nominee*) · **2–3** Nominee Details (has-nominee, name, DOB, contact, relationship ×8) · **4** Children Details (count 0–4) · **5–6** Child details (name, DOB, gender) · **7** Thank you.

---

## 1. Name the idea

Collect the four pieces of data an insurer needs to put a free ₹6,00,000 health cover in force — who the money goes to, and who else in her household is on the policy — inside the app, without a branch visit or a paper form.

That idea is good and worth keeping. Everything below is about the expression.

## 2. Separate idea from expression

**Borrowable — the order of the work.** Explain the cover before asking for anything. Nominee first, children second. Ask the count of children before their details. Confirm at the end. Offer a way out on the first screen. These are all correct and the redesign keeps them.

**Not borrowable — everything about how it is said.** The Title Case headings, the marketing line *Secure Your Family's Future*, the grey image placeholder, the outline benefit icons, the `*` required markers, the three-dropdown dates, the checkbox grids, the green *100% FREE COVERAGE* pill, the metallic starburst on the Thank you screen, and the word **nominee** itself.

## 3. Run it against the expert

Against `PRINCIPLES.md` § Who we design for. Each failure and the change that fixes it.

| # | Failure | Principle | Fix |
| --- | --- | --- | --- |
| 1 | The premise is a legal abstraction. *Nominee* has no everyday equivalent in Hindi, Marathi or Kannada — the translations are more formal, not less | P1, P9 | The word leaves the UI. The question becomes *Who should get the money?* and the person is named by relationship and face |
| 2 | Cover the text and all seven screens are blank. One grey placeholder, three outline icons, no pictures anywhere | P1, rows 9–10 | 12 registered pictograms; every choice is made by picture first, word second |
| 3 | Hard words carrying the meaning: *Hospitalization*, *Cashless treatment*, *Coverage Amount*, *Father in law* | P1, P9 | The word-swap table in the pattern. *Hospital bills*, *You pay nothing*, *Your cover* |
| 4 | Checkboxes where exactly one answer is possible — Yes/No, relationship, gender. A square promises "many" | P1, P3 | SelectionCard single-mode throughout; the shape now tells the truth |
| 5 | Eight relationship targets in two adjacent columns at roughly 20 dp | P3, row 1 | Full-width cards, ≥ 64 dp, one column, 12 dp apart |
| 6 | Date of birth as three dropdowns, twice. Format ambiguity is a real error source and the DS already removed this control | P3 | DatePicker `month` with a year stepper, and the date written back in words |
| 7 | Nothing speaks. This is a flow she does alone, once, about money for her family | P4, row 12 | VoicePrompt `bar` on every screen, autoplay on first visit; inline read-back on the two typed names |
| 8 | Five things asked on one screen (screen 2) | P2 | One question per screen; at most two fields |
| 9 | No loading, error, offline or partial-save state anywhere. No sign she is on child 1 of 2 | P5, row 5 | Five states designed; Stepper `rail`; save-and-resume on every screen |
| 10 | *Continue* four times | P2 | Every Button names its outcome |
| 11 | Title Case throughout | Type rules | Sentence case |
| 12 | `*` marks required fields | P1 | Removed — every field on a screen is required, and the Button says so when one is missing |
| 13 | Secondary Button sits **below** the primary on screen 1 | `button.md` placement | Secondary above, primary lowest |
| 14 | The Thank you screen uses a **metallic** starburst badge | `assets.md` two layers | Metallic is the reward layer — earned things only. Confirmation is flat illustration |
| 15 | *Child* is a relationship option while children have their own section | P1 | Kept as a relationship (the insurer's list), but the children section is reframed as adding people, not answering a count |
| 16 | **₹6 Lakh and ₹5,00,000 on the same screen** | P5 honesty | One number, everywhere. Open item — which is correct |

Nothing here says the idea cannot survive. Every failure is expression, which is exactly what the system exists to supply.

## 4. Tier

**Tier 2 — composition**, throughout. The whole flow is built from HeaderNav, VoicePrompt, Stepper, Card, ListItem, SelectionCard, TextField, DatePicker, NumericKeypad, BottomSheet, Banner, Toast, Snackbar, Amount, Tag, Divider, EmptyState and Button. No Tier 3 component is needed.

Two things sit outside that: **12 new pictograms** registered in `foundations/assets.md`, and **one proposed change to core** — `SelectionCard`'s "≤ 5 cards in a group" cannot hold a fixed, externally-mandated list of eight relationships. Brief: `briefs/insurance-relationship-picker.md`.

## 5. Translate

`patterns/insurance.md`.

## 6. Side by side

The *What changes from the current screens* table in `patterns/insurance.md` — every difference as one sentence with its principle.
