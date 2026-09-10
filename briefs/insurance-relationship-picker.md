# Insurance / Relationship picker

Tier: change to core **SelectionCard**
Owner: Rupam Banik · Date: 2026-09-09

## Idea

The insurance nominee's relationship is a fixed list of eight values the insurer will not shorten: Spouse, Child, Mother, Father, Brother, Sister, Mother-in-law, Father-in-law. All eight must be visible and choosable by picture, because the expert reads slowly and this single choice decides where ₹6,00,000 goes.

## Why not existing

- **Radio** (`selection-controls.md`) caps at 5 plain options and carries no image.
- **SelectionCard** is the right component — a card that behaves like a radio, with an asset slot — but its rule is **"≤ 5 cards in a group"**, written to stop feature teams turning a picker into a wall.
- **`select` BottomSheet** allows ≤ 8 radio rows with a 40 dp pictogram leading, and is technically legal. It fails P1 and P2 in this specific case: the options become invisible until she taps a row that names none of them, and the most important question in the flow ends up behind a disclosure. For a list she has never seen before, hiding it is worse than scrolling it.
- **Shortening the list** was tried and rejected. Grouping into *Parent* / *Sibling* / *In-law* tiles fails the register's own rule — a two-adult pictogram for *Parent* and a two-adult pictogram for *In-law* would be the same drawing with two meanings.

## Reference

`references/insurance-flow-current.md` — the current screen shows all eight as text checkboxes in two adjacent columns at roughly 20 dp.

## The change

In `selection-card.md` § Behaviour, the group cap becomes:

> ≤ **5** cards in a group (≤ **3** for `hero`). A group may run to **8** only when (a) the list is fixed by an outside authority and cannot be shortened, (b) it is split by a `labelled` Divider into sub-groups of ≤ 5, and (c) every card carries a pictogram. More than 8 is a `select` sheet with a search field.

Nothing else about the component changes: same anatomy, same states, same modes, same tokens.

Applied here as two labelled sub-groups:

| Divider label | Cards |
| --- | --- |
| *Your family* | Husband or wife · Your son or daughter · Your mother · Your father · Your brother · Your sister |
| *Your husband's family* | His mother · His father |

The `labelled` Divider is doing real work, not decoration: **it carries the meaning the picture cannot.** A mother-in-law and a mother are not visually distinguishable in any icon language, so the heading is what separates them. This is the weakest row in the flow for P1 and the pattern says so.

## Translation

Tokens: `radius.lg`, `borderDefault` `thin`, `borderBrand` `thicker`, `bgPrimary`, `bgSecondary` (pressed), `borderSubtle` (divider), `textPrimary`, `textSecondary`, `spacing.4` between cards, `spacing.5` padding.
Core components: SelectionCard `rich` `single`, Divider `labelled`, Button.
Assets: eight relationship pictograms at 64 dp, registered in `foundations/assets.md`.
States: default · selected · pressed · group error (`borderError` `thicker` on every unselected card + one error line, per the existing spec).
Voice: the screen's VoicePrompt `bar` reads the question and the two group names.

## Deviations

Breaks from `selection-card.md`'s "≤ 5 cards in a group" on the relationship step, because the list is set by the insurer and hiding it in a sheet would fail P1 and P2 more badly than scrolling does.

## Principles checklist

Inherited from `selection-card.md`, which passes rows 1–6 and 9–11. The change affects two rows:

| # | Check | Result |
| --- | --- | --- |
| 4 | ⚙ States by ≥ 2 channels | ✅ unchanged — border + control + check badge |
| 9 | Meaning survives with text covered | ⚠ six of eight cards yes; the two in-law cards rely on the group heading and the voice. Named as a field-test watch item |
| 7 | ⚙ Four languages | ⬜ eight titles ≤ 20 chars; the group headings are the new strings to measure in Kannada at 1.3 |

## Promotion

Second likely use: government document type pickers in onboarding (Aadhaar / PAN / voter ID / driving licence / passport — also a fixed outside list). Third use promotes the rule from this brief into the spec proper; until then the cap stays 5 with this documented exception.
