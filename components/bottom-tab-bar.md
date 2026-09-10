# BottomTabBar

Status: **Proposed** · Tier: Core · Package: `SnabbitBottomTabBar` (ships today with four tabs; **no Figma component exists** — this spec documents the shipped bar and creates the component)

The whole map of the app, always visible, always in the same order. For a user who struggles with hierarchical navigation, the tab bar is not a convenience — it is the only structure she needs to learn. Everything in the app is reachable from one of these tabs in at most two steps.

---

## What changes from Figma — starting point: what ships today

The live app already has a four-tab bar — **Home · Earnings · Refer · Profile** — with a pink pill behind the selected icon, a brand-coloured label, and a `₹4000` promo pill on *Refer*. This spec keeps that structure (the experts have learned it) and tightens four things: the icons become registered Phosphor glyphs, the selection channels are defined, the promo pill becomes a governed `Badge` kind, and the rules for badges, hiding and font scaling are written down. Rewards and Saathi stay where they are today — in the Home header — not in the bar.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────┐  64 dp + safe-area inset · bgPrimary · 1 dp borderDefault top
│  (▓🧴▓)       ₹          👥 [₹4000]        ◎             │  selected: 64×32 pill bgBrandSubtle, radius.full, icon fill iconBrand
│   Home     Earnings      Refer          Profile          │  label Caption 12 Medium · ALWAYS visible
└──────────────────────────────────────────────────────────┘
```

Each tab is an equal-width column and the full 64 dp column is the tap target. Icon 24 sits inside a 64 × 32 indicator area 8 dp from the top; label 4 dp below. No floating centre button, no raised action.

---

## Destinations

Fixed at **four**, in this order, in every build. Order never changes per user or per experiment.

| # | Tab | Icon (Phosphor) | Label | Holds |
| --- | --- | --- | --- | --- |
| 1 | Home | `spray-bottle` | Home | Today's jobs, availability, the next action; header carries coins, red cards, Saathi, SOS |
| 2 | Earnings | `currency-inr` | Earnings | Today / week / month, breakdown, payouts, bank |
| 3 | Refer | `users` | Refer | Refer an expert, bonus status, referral list |
| 4 | Profile | `user-circle` | Profile | Documents, shifts, language, settings, notifications |

`spray-bottle` is kept deliberately: the current app uses a spray bottle for Home, it is the tool of her trade, and it is already learned. A generic `house` would be a regression. `users` (two people) says *refer* better than any gift or link glyph.

A fifth tab is allowed only for **Rewards** if that area outgrows the Home header (tier, coins, streaks, contests in one place). Nothing else becomes a tab; new areas go **inside** a tab. Saathi is never a tab — it is a labelled place in the Home header and on Job screens where help is needed in context.

`spray-bottle`, `users`, `user-circle` join the icon register with this spec; `currency-inr` is already registered.

---

## States

| State | Indicator | Icon | Label |
| --- | --- | --- | --- |
| unselected | none | `regular`, `textSecondary` | `textSecondary`, Medium |
| selected | 64 × 32 pill `bgBrandSubtle`, `radius.full` | **`fill`**, `iconBrand` | `textBrand`, Medium |
| pressed | `bgSecondary` wash on the column, 100 ms; `light` haptic | as state | |
| badged | | `Badge` top-right of the icon (dot / count ≤ 9 / **promo**) | |
| disabled | | `textTertiary` | `textTertiary` — onboarding only, before the account is live; tapping explains with a Toast (*Available after your first job*) |

Selection is shown by **three** channels — pill, icon weight, colour — so it survives greyscale (the pill and fill weight remain) and a first-week glance (P1).

### Badge kinds on a tab

| Kind | Looks | When |
| --- | --- | --- |
| dot | 10 dp `bgBrand` | Something new she hasn't seen (a payout landed) |
| count | ≤ 9, else `9+` | Unread items with a number that matters |
| **promo** | pill, `bgBrand`, `textInverse`, Caption SemiBold, an amount only: *₹4000* | A live referral bonus. **Refer only.** Only while the bonus is actually live; disappears when it ends |

At most **two** badged tabs at once, and at most **one** promo. Home never badges (she is already there or one tap away); Profile badges only for a document that will block work (expiring ID).

---

## Behaviour

- **Always visible** on every tab-root screen and every screen one level down. Hidden only on full-screen flows that must not be left mid-way: the job alert, check-in camera, OTP, a `confirm` sheet's parent while open. It never hides on scroll.
- Tapping the current tab scrolls its screen to the top; tapping it again does nothing (no "reset stack" surprises).
- Tapping another tab switches instantly (no slide), keeping each tab's scroll position and stack.
- Badges clear when the tab is opened; the promo pill does not (it is a fact, not an unread count).
- A first-time user gets **one** Coachmark on the bar (*Everything is here*), spoken, then never again.
- Font scaling: labels wrap to two lines at 130 %; the bar grows to 72. Labels never truncate and never hide — an icon-only tab bar is not allowed.
- Reduced motion: no wash fade.

---

## Content

- Labels are one word, ≤ 10 characters in the longest language, sentence case: *Home*, *Earnings*, *Refer*, *Profile*. In Hindi, Kannada and Marathi the label is the translated word.
- The promo pill carries an amount and nothing else — no *Earn*, no *!*.
- Spoken: "Earnings tab, 1 new" · "Refer tab, ₹4000 bonus" · "Home tab, selected".

---

## Accessibility

Role tablist; each tab role tab with selected state and badge text. Full 64 dp column is the target. `textSecondary` on `bgPrimary` 4.8:1; `textBrand` 4.1:1 with the pill and fill weight as second and third channels. Announces destination and badge.

---

## Token proposals

None. The selected pill uses `bgBrandSubtle`; the promo pill uses `bgBrand` / `textInverse`.

---

## Figma reconciliation

1. **Create** BottomTabBar: `Tabs` (4 / 5), `Selected` (1–5), per-tab `Badge` (None / Dot / Count / Promo).
2. Icons as Phosphor instances — `spray-bottle`, `currency-inr`, `users`, `user-circle` — `regular` unselected, `fill` selected. Replace the current custom spray-bottle glyph with the Phosphor one.
3. Selected indicator as a 64 × 32 `bgBrandSubtle` pill bound to the semantic variable, not a raw pink.
4. Add the bar to every tab-root and one-level-down screen mock; remove hamburger menus and drawer frames.

Result: **~12 variants**, and a bottom edge every screen agrees on.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 64 dp columns |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Caption Medium / SemiBold |
| 4 | ⚙ States by ≥ 2 channels | ✅ pill + fill weight + colour |
| 7 | ⚙ Four languages | ⬜ labels ≤ 10 chars; verify wrap at 130 % |
| 8 | ⚙ Motion | ✅ none beyond 100 ms wash |
| 9 | Meaning without text | ✅ spray bottle and ₹ already learned; labels always present anyway |
| 10 | Greyscale | ✅ pill + fill weight |
| 12 | Coachmark / voice | ✅ one spoken coachmark, first run |
| 15–16 | Review | ⬜ pending |
