# Mobbin read — a list filtered by value chips that open a sheet (2026-10-13)

| | |
| --- | --- |
| Asked by | `projects/hood-shift-change` — the lead, 2026-10-13: "a lot of hoods in a particular cluster; three filters: hoods, working hours, change the starting time" |
| Region | The hoods page (Figma V2 *1.07 · Current hood · Kudlu gate*): where the three filters sit and what a filter control is |
| Why Mobbin | The system has Chip `filter` (one dimension, ≤ 6 values, inline) and BottomSheet `select` (≤ 8 rows, search above 8). It has no chip that *holds a chosen value and opens a sheet* — three dimensions, one of them with more than six values, need that. `CLAUDE.md` § Before you draw a screen: Mobbin only after the shipped app, `patterns/` and `components/` were tried (see `BUILD.md` § Filters) |
| Search | `search_screens`, standard mode, iOS: "list of shift or job options with a row of filter chips at the top, each chip showing the chosen value with a down caret that opens a bottom sheet" |
| Internal only | Not published, not traced |

## Three shipped versions

| App | What the screen does | Take | Leave |
| --- | --- | --- | --- |
| [Insight Timer](https://mobbin.com/screens/c1c44b75-53d1-4515-8c25-1ccaadcea5d4) | A chip row above the list: *Date ▾* holds a value and opens a sheet of radio rows (*Tomorrow · This week · This weekend · All*) with *Apply* | One chip per dimension; the chip shows the value; the sheet is a radio list | *Apply* — our `select` sheet closes on a single pick (`bottom-sheet.md` § Kinds) |
| [Flighty](https://mobbin.com/screens/0bb346da-7258-4ee5-95ab-4da8b64367ee) | A bar of value chips (*SFO · LAX · Mon, 29 Jun · All Airlines ▾*) above a long list; the values are the ask she made, each tappable to change | **The ask *is* the filter bar** — the values she gave are the controls that re-ask. This is what D1 does with the *You asked* strip | Two rows of chips; a date picker inline |
| [Doji](https://mobbin.com/screens/c9a33028-4fdc-4828-a7b8-7f4f2df28b76) | One *Filters* sheet with tabs (*Type · Brand · Sort · Department*), *Clear all · View results* | — | The configure-everything sheet: the stakeholders rejected it on 2026-10-12 ("reads like a SaaS tool"); a low-literacy user is asked to hold four tabs in her head |

## Translation (what the Paper page draws)

- **Structure borrowed:** one chip per dimension, each chip shows its current value, tapping opens a `select` sheet of that dimension's values, the list re-answers at once (Insight Timer, Flighty).
- **Expression ours:** Chip anatomy (40 dp, `radius.full`, BodyMd Medium, 48 dp row), trailing `caret-down` 20 dp in the chip's trailing slot, `bgBrandSubtle` + `borderBrand` when the value differs from what she asked, BottomSheet `select` with Radio rows, Amount S on the hours rows, Saathi says what changed (FLOW v3 § Voice, response 1).
- **Not borrowed:** *Apply* buttons, *Clear all*, tabs, a search inside the chip row. Only values that exist are offered, so nothing can return empty (stakeholder review 2026-10-12, item 6).
