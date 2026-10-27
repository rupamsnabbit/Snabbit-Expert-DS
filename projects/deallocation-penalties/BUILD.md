# Build plan — <Project name>

Written **before** the first artboard. One row per region of every screen. Sources in this order and no other:
**shipped app → `patterns/` → `components/` → Mobbin → invention.** Read all three system sources first, every time
(`CLAUDE.md` § Before you draw a screen).

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| 1.01 · header | `HeaderNav` | `components/header-nav.md` | — | — |
| 1.01 · | | | | |

- **Built from** — a component and its kind (`ListItem navigational`, `Statement row`), or a shipped screen region. *Composition* only when every part inside it is also named.
- **Source** — a file in this repo. Mobbin only when the three system sources have no match **and** *Tried first* is filled.
- **Inherits** — when no whole component fits, the anatomy the region still takes from the nearest one: heights, type roles, spacing, amount format, divider rule. **Never empty for a Mobbin or invention row.**
- **Tried first** — what was tried before leaving the system, and why each failed. Empty only when *Built from* is a system component.

A drawn region with no row here is Tier 0.
