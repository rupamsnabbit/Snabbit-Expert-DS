# Amount

Status: **Proposed** · Tier: Core · Package: `SnabbitAmount` · Figma: Value (`537:4277`), plus every ad-hoc ₹ figure across Earnings, Payout, Job cards

The primary number on most screens the expert looks at: what a job pays, what today earned, what reached her bank. One component so the rupee sign, grouping, size, colour and sign are always the same — an amount is the one thing she reads fluently, so it must never be ambiguous.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| "Value" = one small ₹ line with lock/unlock + chevron; other amounts are hand-typed text | One `Amount` with **four sizes**, **tones**, **sign**, **locked** state, optional label/caption | Every ₹ in the app renders identically. |
| Mixed formats (₹450, Rs. 450, 450/-) | Always `₹` + Indian grouping (`1,25,000`), tabular numerals, no paise unless non-zero | One format she learns once. |
| Lock as a grey padlock beside the value | `locked` state: value in `textTertiary`, Phosphor `lock` leading, caption says what unlocks it | The lock must say *how to earn it*, not just that it's shut. |

---

## Anatomy

```
Label                    ← optional, BodyMd textSecondary, above
₹1,250  [icon]           ← currency + integer + optional decimals + optional trailing icon
Caption                  ← optional, Caption/BodyMd textSecondary, below
```

The `₹` is set **one step smaller** than the digits and aligned to the digits' cap height, so the number reads first. Digits are Outfit with `tabular-nums` so columns of amounts align. Decimals (`.50`) render at the ₹ size, only when non-zero.

---

## Sizes

| Size | Digits | ₹ | Use |
| --- | --- | --- | --- |
| `hero` | `Display` 32/40 SemiBold | 24 | One per screen: today's earnings, payout total, job pay on the alert |
| `lg` | `Heading2` 24/32 SemiBold | 18 | Card headline: job pay on a job card, weekly total |
| `md` | `BodyLg` 16/24 SemiBold | 14 | List rows, breakdown lines |
| `sm` | `BodyMd` 14/20 Medium | 12 | Secondary figures, tags, inline mentions |

A screen has at most one `hero`. If two figures compete, one becomes `lg`.

---

## Tones and signs

| Tone | Colour | Sign shown | Use |
| --- | --- | --- | --- |
| `default` | `textPrimary` | none | Pay, totals, balances |
| `positive` | `textSuccess` | `+` | Earned, credited, bonus added |
| `negative` | `textError` | `−` (true minus, U+2212) | Penalty, deduction |
| `brand` | `textBrand` | none | Highlighted incentive on offer (*Earn ₹50 extra*) |
| `muted` | `textSecondary` | as value | Past, struck-through (`line-through`) or estimated figures |

Sign is a property of the **value**, not typed into copy. `+₹50` and `−₹50` differ by colour **and** sign **and** — where the number stands alone — a Phosphor `arrow-up` / `arrow-down` 16 dp leading icon (P1: never colour alone). Negative amounts are never wrapped in parentheses.

---

## States

| State | Rendering |
| --- | --- |
| default | as above |
| `locked` | `lock` regular icon leading (`textTertiary`), digits `textTertiary`, caption in `textSecondary` says the condition: *Complete 3 more jobs* |
| `unlocked` (just earned) | `lock-open` icon for the celebration moment (≤ 1.5 s, P6), then becomes `positive` |
| `loading` | Skeleton bar the width of `₹0,000` at the size's height; never `₹0` as a placeholder |
| `hidden` | `₹••••` with an `eye` IconButton to reveal — balances on shared/handed-over phones |
| `estimated` | `~₹450` with tilde, `muted` tone, caption *Estimated* |

A loading amount is never shown as `₹0` — a zero is a real, alarming number to someone paid by the job.

---

## Formatting rules

- Currency symbol `₹` always; never `Rs`, `INR` or `/-`.
- Indian grouping: `1,250` · `12,500` · `1,25,000` · `12,50,000`. Never Western grouping.
- Latin numerals in every language (P9), so amounts render in Outfit everywhere.
- No paise unless non-zero; then always two digits (`₹450.50`).
- Ranges: `₹400–450` with an en dash, one `₹`.
- Rates: `₹169/hr` with the unit in `textSecondary` at the ₹ size.
- Rounding for `hero` and `lg` on summary screens only, and only when a caption says *approx.* — line items are never rounded.
- Read aloud as "four hundred and fifty rupees", never digit by digit; negative read as "minus"; locked read with its condition.

---

## Accessibility

Announced as the full spoken amount plus tone ("plus fifty rupees, bonus") and state ("locked, complete three more jobs"). `hero` at 32 sp scales with system font to 130 %; containers must allow the width of `₹1,25,000.00` at that scale. Colour contrast: `textSuccess` on white 4.5:1 — passes for ≥ 14 sp Medium; `textError` 4.8:1.

---

## Token proposals

None. Sizes map directly to the type scale; the smaller `₹` uses the next step down.

---

## Figma reconciliation

1. Rename Value → **Amount**. Properties: `Size` (Hero / Lg / Md / Sm), `Tone` (Default / Positive / Negative / Brand / Muted), `State` (Default / Locked / Loading / Hidden / Estimated), booleans `Label`, `Caption`, `Trailing chevron`.
2. Build the ₹ as a separate text layer one type step smaller, cap-aligned.
3. Replace every hand-typed ₹ figure in Earnings, Payout and Job card frames with an Amount instance.
4. Bind digits to the type scale styles and colours to semantic variables.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale only | ✅ Display / Heading2 / BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ sign + colour + icon; locked = icon + colour + caption |
| 5 | ⚙ Loading | ✅ skeleton, never ₹0 |
| 7 | ⚙ Four languages | ✅ numerals are Latin everywhere; labels ≤ 20 chars |
| 9 | Meaning without text | ✅ ₹ + digits + sign icon |
| 10 | Greyscale | ✅ sign and icon carry positive/negative |
| 14 | Status colours only for status | ✅ positive/negative are outcomes |
| 15–16 | Copy / device review | ⬜ pending |
