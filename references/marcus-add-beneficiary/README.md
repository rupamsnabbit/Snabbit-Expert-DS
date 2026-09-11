# Reference read — Marcus by Goldman Sachs · Add a beneficiary

App: **Marcus by Goldman Sachs** (savings) · Platform: iOS · Captured: 2026-09-11
Mobbin: https://mobbin.com/flows/c30c0014-b79d-4690-9f69-9e68ec3feb75 (6 screens)
Fed: `patterns/insurance.md` — as the counter-example.

Screenshots are not committed — see the note in `references/alan-add-family-member/README.md`.

---

## 1. Name the idea

Designate who receives the money in an account after death, entirely inside the app: name, relationship, government ID, address, which accounts, and a legal agreement — collected as one long scrolling form with a paging control at the bottom.

## 2. Separate idea from expression

**Borrowable.** Exactly two things. (a) The entry point: *Manage beneficiaries* lives in an account overflow menu, permanently, so it can be revisited without a support call — this is our Profile row. (b) The relationship is a single-select, not free text.

**Not borrowable.** Everything else, and deliberately so. This flow is the reason the redesign does not simply compress the shipped Snabbit screens into fewer, denser ones.

## 3. Run it against the expert

This is the reference that proves **fewer screens is not the same as fewer steps**. Marcus asks eight things on two screens; the shipped Snabbit nominee screen asks five things on one. Both are short in artboards and long in work. Against our expert the form fails on: field density (P2), a typed government ID re-entered twice (P3), *First name · MI · Last name* as three inputs where one is meant (P1), *Submit* as the action word (P2, banned in `foundations/content.md` § 9), and a legal paragraph as the consent mechanism (P1, P9).

## 4. Tier

Not applicable — nothing is being built from this. Recorded so the argument survives.

## 5. Translate

Nothing is translated. The one carried idea, a permanent entry point that is not the enrolment flow, is `patterns/insurance.md` § *Where it lives* → the Profile row.

## 6. Side by side

The measure taken from this read is in `patterns/insurance.md` § *What changes*: **interactions**, not screens. The redesign matches the shipped screen count and roughly halves the interactions.
