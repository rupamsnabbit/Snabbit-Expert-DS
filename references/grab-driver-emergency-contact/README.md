# Reference read — Grab Driver · Setting an emergency contact

App: **Grab Driver** (ride-hailing, worker side) · Platform: iOS · Captured: 2026-09-11
Mobbin: https://mobbin.com/flows/4a8a31f4-8205-4959-a098-f7d0a0b1808c (7 screens)
Read alongside: [Apple Health · adding an emergency contact](https://mobbin.com/flows/6710907a-2d83-4c39-9fa6-99b4cbea0813) · [Citizen · adding an emergency contact](https://mobbin.com/flows/c3be80f9-f18a-4e6c-94ae-89f9a20f2b2d)
Fed: `patterns/insurance.md` § 3 *Their name*.

Screenshots are not committed — see the note in `references/alan-add-family-member/README.md`.

---

## 1. Name the idea

Name a person the app will contact on your behalf. Three apps, three ways of getting the same two fields: Grab **types** them, Apple Health and Citizen **pick from the phone's contact list**.

This is the closest worker-side analogue we have to *who should get the money*: a low-frequency, high-consequence naming of one person by someone using the app to earn.

## 2. Separate idea from expression

**Borrowable.** The contact picker as the **primary** path, not an alternative — Apple Health and Citizen both open the OS picker first and never present a blank name field. The relationship is chosen from a plain, ordered list after the person is picked (Apple Health's *mother · father · parent · brother · sister…*), not before.

**Not borrowable.** Grab's two bare fields with a *Save* in the nav bar — this is the anti-pattern and it is the one drawn by the worker-side app, which is the point. Also: Citizen's dark UI, Apple Health's system-list styling, and the English-only relationship list.

## 3. Run it against the expert

Grab's version fails the expert on four counts: a phone number typed from memory (P3 — ten digits is the largest single error source in a form like this), a name field in a script she does not write, *Save* as the action word (P2), and no read-back of what she typed (P4). Apple Health's and Citizen's picker-first version fails none of them.

Ordering the relationship list alphabetically, as Apple Health does, is wrong here: our list is ordered by how often each is chosen (P2 — the common answer is nearest the thumb).

## 4. Tier

**Tier 2 — composition.** Button `secondary brand L` with `address-book` → `permission` BottomSheet → OS picker. No new component.

## 5. Translate

`patterns/insurance.md` § 3. Because the insurer does **not** require the person's phone number (confirmed 2026-09-11), the picker's job here is narrower than in these three apps: it supplies a **name already stored in Latin characters**, which is the thing she cannot type or proofread.

## 6. Side by side

See the *What changes* table in `patterns/insurance.md`. Grab is cited there as the shape to avoid, not to copy.
