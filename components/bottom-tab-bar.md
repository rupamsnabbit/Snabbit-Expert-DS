# BottomTabBar

Status: **Proposed** · Tier: Core · Package: `SnabbitBottomTabBar` (exists in code; **no Figma component exists** — this spec creates it)

The whole map of the app, always visible, always in the same order. For a user who struggles with hierarchical navigation, the tab bar is not a convenience — it is the only structure she needs to learn. Everything in the app is reachable from one of these tabs in at most two steps.

---

## Why it needs a spec now

The code has a tab bar; Figma has none, so every screen mock invents its own bottom. The home header is currently carrying six actions because there is no tab bar to hold them. This spec defines the destinations, the look and the rules, and moves *Saathi* (help) and *Rewards* down here where they belong.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────┐  64 dp + safe-area inset · bgPrimary · 1 dp borderDefault top
│   ⌂        ₹        🏆        💬        ☺               │  icon 24 · Phosphor regular, fill when selected
│  Home   Earnings  Rewards   Saathi   Profile             │  label Caption 12 Medium · ALWAYS visible
└──────────────────────────────────────────────────────────┘
```

Each tab is an equal-width column, full height (64 dp) as the tap target, icon centred 8 dp from the top, label 4 dp below the icon. No floating centre button, no raised action.

---

## Destinations

Fixed at **five**, in this order, in every build. Order never changes per user or per experiment.

| # | Tab | Icon (Phosphor) | Label | Holds |
| --- | --- | --- | --- | --- |
| 1 | Home | `house` | Home | Today's jobs, availability switch, the next action |
| 2 | Earnings | `wallet` | Earnings | Today / week / month, breakdown, payouts, bank |
| 3 | Rewards | `trophy` | Rewards | Tier, coins, streaks, achievement badges, contests |
| 4 | Saathi | `chats-circle` | Saathi | Help chat, trainer contact, how-to clips, FAQs |
| 5 | Profile | `user` | Profile | Documents, shifts, language, settings |

Fewer than five is allowed (a build without Rewards shows four); more than five is not. New areas go **inside** a tab, never as a sixth.

`chats-circle` joins the icon register with this spec (meaning: *Saathi / help*). `house`, `wallet`, `trophy`, `user` are already registered.

---

## States

| State | Icon | Label | Extra |
| --- | --- | --- | --- |
| unselected | `regular`, `textSecondary` | `textSecondary`, Medium | |
| selected | **`fill`**, `textBrand` | `textBrand`, Medium | no underline, no pill — the fill + colour + label colour are the three channels |
| pressed | as state | | `bgSecondary` wash on the column, 100 ms; `light` haptic |
| badged | as state | | `Badge` (dot or count ≤ 9) top-right of the icon; at most **two** badged tabs at once |
| disabled | `textTertiary` | `textTertiary` | only during onboarding, before the account is live; the tab explains on tap with a Toast (*Available after your first job*) |

Selection is icon weight + two colours (P1); in greyscale the filled icon still distinguishes the current tab.

---

## Behaviour

- **Always visible** on every tab-root screen and every screen one level down. Hidden only on full-screen flows that must not be left mid-way: the job alert, check-in camera, OTP, a `confirm` sheet's parent while open. It never hides on scroll.
- Tapping the current tab scrolls its screen to the top; tapping it again does nothing (no "reset stack" surprises).
- Tapping another tab switches instantly (no slide), keeping each tab's scroll position and stack.
- Badges: Earnings badge when a payout landed; Rewards badge when something was earned; Saathi badge for unread replies. Home and Profile never badge. Badges clear when the tab is opened.
- A first-time user gets **one** Coachmark on the tab bar (*Everything is here*), spoken, then never again.
- Font scaling: labels wrap to two lines at 130 %; the bar grows to 72. Labels never truncate and never hide — an icon-only tab bar is not allowed.
- Reduced motion: no wash fade.

---

## Content

- Labels are one word, ≤ 10 characters in the longest language, sentence case: *Home*, *Earnings*, *Rewards*, *Saathi*, *Profile*. In Hindi/Kannada/Marathi the label is the translated word, except *Saathi*, which stays *Saathi* in every language (it is a name).
- Spoken: "Earnings tab, 1 new" / "Rewards tab, selected".

---

## Accessibility

Role tablist; each tab role tab with selected state and badge count. Full 64 dp column is the target. `textSecondary` on `bgPrimary` 4.8:1; `textBrand` 4.1:1 with weight and fill as second and third channels. Announces the destination name and badge.

---

## Token proposals

None.

---

## Figma reconciliation

1. **Create** BottomTabBar: `Tabs` (4 / 5), `Selected` (1–5), per-tab `Badge` (None / Dot / Count).
2. Icons as Phosphor instances: `regular` unselected, `fill` selected.
3. Add it to every screen mock at the tab-root and one-level-down; remove hamburger menus, drawer frames and the Saathi/Help pill from the home header.
4. Move *Saathi* and *Rewards* entry points into the bar.

Result: **~10 variants**, and a bottom edge every screen agrees on.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 64 dp columns |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Caption Medium |
| 4 | ⚙ States by ≥ 2 channels | ✅ fill weight + icon colour + label colour |
| 7 | ⚙ Four languages | ⬜ labels ≤ 10 chars; verify wrap at 130 % |
| 8 | ⚙ Motion | ✅ none beyond 100 ms wash |
| 9 | Meaning without text | ✅ icons universal; labels always present anyway |
| 10 | Greyscale | ✅ fill weight |
| 12 | Coachmark / voice | ✅ one spoken coachmark, first run |
| 15–16 | Review | ⬜ pending |
