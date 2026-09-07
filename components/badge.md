# Badge

Status: **Proposed** · Tier: Core · Package: `SnabbitBadge`, `SnabbitAchievementBadge` · Figma: Badge – Parent (`685:4021`), Badges Groups (`666:3358`)

The word *badge* means two different things in the Figma file and in every design system, so this spec splits them explicitly:

| | What it is | Where it lives |
| --- | --- | --- |
| **Badge** | A tiny count or dot pinned to something else — 3 unread messages on the chat icon, a dot on the Rewards tab | Corner of an IconButton, tab, avatar or card |
| **AchievementBadge** | The metallic hexagon she *earned* — bronze star, gold star, Shakti Premium | Profile, tier page, celebration; a reward-layer asset with a component wrapper |

Figma's "Badge – Parent" is the second. The first did not exist and IconButton already depends on it.

---

## Part 1 — Badge (count · dot)

### Anatomy

```
  ●        dot: 10 dp circle
 (3)       count: 18 dp tall pill, min-width 18, padding 0 5, radius full
 (9+)
```

Pinned top-right of the host, overlapping by 4 dp (dot) / 6 dp (count), with a 2 dp `bgPrimary` ring so it separates from any host colour. Count label `Caption` 12 sp SemiBold, tabular.

### Tones

| Tone | Fill · text | Use |
| --- | --- | --- |
| `brand` (default) | `bgBrand` · `textInverse` | Unread messages, new items, pending actions |
| `error` | `borderError` (red.500) · `textInverse` | Something needs fixing: a failed upload, a rejected document |
| `neutral` | `borderStrong` (gray.500) · `textInverse` | Counts that are informational, not calls to action (jobs in a filter) |

Never `success` — a badge is a nudge to look; a finished thing needs no nudge.

### Rules

- **Count ≤ 9, then `9+`.** Two digits is the most she should ever be asked to read at 12 sp in a corner. Beyond 99 nothing is gained.
- **Dot** when the number does not matter, only that there is something new. Prefer the dot: fewer digits, same information (P1).
- A badge is **information, never a target**. Tapping the host does the thing; the badge has no tap of its own and no hit area requirement.
- Clears the moment the thing is seen — a badge that lingers after she has looked trains her to ignore badges.
- At most **one badge per host**, and at most **three badged hosts on a screen** (tab bar included). More than that is noise, not nudging (P6: nudges are rare).
- Badges never carry money. An amount is an `Amount`.
- Announced with the host: "Chat, 3 unread". A dot announces "new".

### States

Appears with a 150 ms scale-in from 0.6, disappears with a 100 ms fade; reduced motion → instant. No pressed/disabled — it is not interactive. While the host is disabled the badge hides.

---

## Part 2 — AchievementBadge

A thin wrapper around a **reward-layer asset** (`asset/badge/*`, see `foundations/assets.md`) that adds size, state and a label. The artwork itself is never redrawn per instance; the component only places it.

### Anatomy

```
   ⬢          asset, metallic hex, square canvas
  Gold        optional label, Caption/BodyMd, textBody
```

Sizes: **24** inline beside a name · **40** list rows, tier strip · **64** profile, celebration card · **96** tier page hero, earn moment.

### States

| State | Rendering |
| --- | --- |
| `earned` | Full-colour asset |
| `locked` | Asset desaturated to greyscale at 60 % opacity, Phosphor `lock` regular 16 dp bottom-right on a `bgPrimary` ring; label in `textTertiary` with the condition (*3 more jobs*) |
| `in-progress` | As `locked`, plus a 3 dp `ProgressBar` ring around the hex in `interactiveDefault` showing how close |
| `just-earned` | The celebration: asset scales 0.8 → 1 with a `spark` burst ≤ 1.5 s and the `earn` sound; then `earned` (P6) |
| `equipped` | For the one badge shown on her profile: 2 dp `borderBrand` ring |

### Rules

- The artwork comes only from the asset register. New badge = new asset row + reference-sheet style prompt, not a variant here.
- A locked badge always says **how** to earn it — the label or the row beside it carries the condition. A grey hexagon alone is a mystery, not motivation.
- Badges are shown in **earn order** on the profile, earned first; locked ones follow, never more than two locked at a time in a strip (show the *next* two, not all of them).
- Never as a substitute for `TierBadge` — tier gems and achievement hexes are different assets with different meanings, and never in the same row.
- Read aloud as the badge name and state: "Gold star badge, earned" / "Silver star badge, locked, three more jobs".

### Groups ("Badges Groups" in Figma)

A horizontal strip of 40 dp badges, 12 dp apart, earned then next-two-locked, followed by `+N more` in `textSecondary` when she has more than five. This is a composition; it lives with the profile pattern, not as a core component.

---

## Token proposals

None. Badge fills reuse `bgBrand`, red.500 (`borderError`) and gray.500 (`borderStrong`) as fills; if the Switch's `bgControlOff` proposal (gray.500) is adopted, `neutral` badge uses it.

---

## Figma reconciliation

1. Rename **Badge – Parent → AchievementBadge**. Properties: `Asset` (swap instance from the Assets page), `Size` (24 / 40 / 64 / 96), `State` (Earned / Locked / In progress / Just earned / Equipped), boolean `Label`.
2. Create **Badge**: `Kind` (Dot / Count), `Tone` (Brand / Error / Neutral), `Count` text. Attach as a nested instance to IconButton, BottomTabBar item and Avatar.
3. **Badges Groups** → a composition on the profile pattern page, not a component.
4. Bind fills to semantic variables; count text to `Caption` SemiBold.

Result: Badge 2 kinds × 3 tones = **6**; AchievementBadge 4 sizes × 5 states = **20** (asset swapped, not multiplied).

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | n/a — not interactive |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Caption SemiBold / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ locked = grey + lock icon + condition text; count vs dot |
| 6 | ⚙ Tap guard | n/a |
| 8 | ⚙ Reduced motion | ✅ celebration → instant, ≤ 1.5 s |
| 9 | Meaning without text | ✅ dot/count shape; badge artwork |
| 10 | Greyscale | ✅ locked is greyscale by design; count is shape |
| 12 | Sound | ✅ `earn` on just-earned only |
| 14 | Tier vs achievement kept apart | ✅ rule |
| 15–16 | Review | ⬜ pending |
