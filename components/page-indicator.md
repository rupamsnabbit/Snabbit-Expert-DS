# PageIndicator

Status: **Proposed** · Tier: Core · Package: `SnabbitPageIndicator` (new) · Figma: no component. Shipped: dots under the how-to clip carousel on *My Rate Card* (`6062:14426`, a pink dash + grey dots) and under the *More from Snabbit* banner carousel on Home (`87:25332`).

The small row of dots under anything she swipes sideways: *you are on the second of four*. It exists only where there is a carousel, a carousel exists only for things she can safely miss, and there are never more than five pages — a sixth page is a list.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Pink dash for the current page, small grey dots for the rest; sizes vary between the two carousels | One component: current page a **24 × 8 pill** `bgBrand`, others **8 dp dots** `borderDefault`; 8 dp gaps; one size everywhere | The dash is the right idea (it shows both *which* and *how many*); it needs one definition. |
| Dots sit on the image / bottom edge of the card | Dots sit **12 dp below** the carousel on the page background, never on the image | Contrast on a photo is unpredictable; below the card it is always `borderDefault` on `bgPrimary`. |
| Carousels of 6–8 cards | **≤ 5 pages.** More is a vertical list or a *See all ›* ListItem | Anything past the third swipe is never seen (research: what is not visible is not learned). |
| Auto-advance undefined | Promotional banners may auto-advance every **6 s**, pause on touch, stop after one loop; how-to clips and anything with an action never auto-advance | Motion she did not ask for on a ₹10k phone is cost and confusion (P8). |

---

## Anatomy

```
     ━━━━━━━━   ●   ●   ●        ← current: 24 × 8 pill bgBrand · others: 8 dp dots borderDefault · 8 dp gaps · centred · 12 dp below the carousel
```

| Variant | Where | Dots | Current |
| --- | --- | --- | --- |
| `default` | On `bgPrimary` / `bgSecondary` below a carousel | `borderDefault` | `bgBrand` |
| `inverse` | Inside a full-screen onboarding intro on a coloured stage | `textInverse` @ 40 % | `textInverse` |

Height 8 dp, plus 12 dp gap above = 20 dp reserved. The row is centred under the carousel's content width. It is **not a target**: the carousel is swiped, or stepped with the flow's *Next* Button (onboarding intros). Tapping a dot does nothing — on a moving bus a 8 dp dot is a mis-tap waiting to happen; the swipe is the control.

---

## Behaviour

- The pill moves to the new page with a 200 ms slide of the width (the old pill shrinks to a dot while the new dot grows), matching the carousel's own transition.
- **Count 2–5.** One page shows no indicator. Six or more pages is a design error: the content becomes a vertical list, or three cards plus *See all ›*.
- **Auto-advance** only for promotional banner carousels (*More from Snabbit*): 6 s per page, pauses while touched, stops after one full loop, never restarts. How-to clips, job cards, anything with a Button inside: never.
- Position is remembered while on the screen; returns to page 1 on the next visit.
- Announces *"Page 2 of 4"* on change; each card is a region announcing its title. The carousel is swipeable with TalkBack's two-finger swipe.
- Reduced motion: no slide, no auto-advance.

---

## Content

No text. If the carousel needs a title it is a section heading above the cards (*Learn how Snabbit works*), and the card itself carries its own label — never a caption under the dots.

---

## Accessibility

Role `tablist` with `aria-hidden` dots (decorative) and a live region *"Page 2 of 4"*; the carousel is the accessible control. Contrast of `borderDefault` on `bgPrimary` is decorative-grade; the pill is `bgBrand` 3.3:1 as a non-text indicator. Auto-advance never runs when a screen reader is active.

---

## Token proposals

None. Pill width 24 = `spacing.6`; dot 8 = `spacing.3`; gap `spacing.3`.

---

## Figma reconciliation

1. **Create** PageIndicator: `Count` (2–5), `Current` (1–5), `Variant` (Default / Inverse). Pill bound to `bgBrand`, dots to `borderDefault`.
2. Replace the dash+dots under the rate-card clips and the Home banners with instances 12 dp below the card, on the page background.
3. Trim any carousel mock with more than five cards.

Result: **~8 variants**, and one indicator for every swipe.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ not a target — the swipe is |
| 2 | ⚙ Semantic tokens only | ✅ |
| 4 | ⚙ States by ≥ 2 channels | ✅ width + colour |
| 8 | ⚙ Reduced motion | ✅ no slide, no auto-advance |
| 9 | Meaning without text | ✅ |
| 10 | Greyscale | ✅ pill length carries it |
| 13 | Screen reader | ✅ live count; no auto-advance |
| 15–16 | Review | ⬜ pending |
