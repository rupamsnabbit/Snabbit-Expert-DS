# NumericKeypad

Status: **Proposed** · Tier: Core · Package: `SnabbitNumericKeypad` (new) · Figma: no component. Shipped: the OS keyboard — iOS/Android numeric pad with letters under the digits (*2 ABC*, *3 DEF*) on *Enter number* and *OTP Verification* (`23235:37032`); the in-job OTP sheet (`98:36313`) also relies on the OS keyboard.

Every number she types — her phone, the OTP the customer reads out, an amount — goes through one in-app keypad: **twelve big keys, digits only, the same on every phone.** The OS keyboard changes with the device and the manufacturer, carries letters she does not need, and shrinks on the phones she actually has; a keypad the app owns is the same size, the same place and the same sound every time (research: consistency is usability). `text-field.md` already assumes this component for its `phone`, `otp`, `number` and `amount` kinds; this spec delivers it.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| OS numeric keyboard; letters under digits; layout and size vary by device | In-app keypad: 3 × 4 grid, **digits only**, keys 64 dp tall, `Heading2` numerals, identical on every device | Letters are noise for a numeric field; a ₹8k phone's keyboard is smaller and slower than one drawn by the app (P8). |
| Backspace as a small glyph key | Backspace key the same size as a digit, `backspace` icon 24 dp, **hold to clear** | A mistake should be as easy to fix as to make (P3). |
| No confirm on the keypad; a separate *Confirm* Button above it | Kept: the flow's Button stays above the keypad and enables when the entry is complete; OTP **auto-submits** on the last digit | One next action stays where it always is. |
| Entry shown in small boxes / a small field | The entry is the screen's hero: OTP boxes 48 × 56, phone as `Heading2` grouped *98765 43210*, amounts as Amount `L` | Big numbers she can check at a glance; she reads digits well. |
| Nothing spoken | Digits are **read back** on completion (*"nine eight seven six five, four three two one zero — is this right?"*) before the Button acts | Catching a wrong digit by ear is faster than by eye for this user (P4). |

---

## Anatomy

```
┌────────────────────────────────────────────────────────┐  tray bgSecondary · padding 8 · full width · 1 dp borderDefault top
│  ┌───────┐  ┌───────┐  ┌───────┐                        │
│  │   1   │  │   2   │  │   3   │   keys bgPrimary · radius.md · 64 dp tall · equal thirds · 8 dp gaps
│  └───────┘  └───────┘  └───────┘   numerals Heading2 (24) Medium textPrimary, tabular
│  │   4   │  │   5   │  │   6   │
│  │   7   │  │   8   │  │   9   │
│  │  aux  │  │   0   │  │   ⌫   │   aux: empty (phone, OTP) · "00" (amounts) · backspace textSecondary, hold to clear
└────────────────────────────────────────────────────────┘
```

Total height 4 × 64 + 3 × 8 + 16 = **296 dp**, fixed. The keypad is anchored to the bottom, above the safe area, below the flow's Button. It never covers the entry; the screen's content area is what remains above.

Key states: default `bgPrimary`; pressed `bgTertiary` with a 60 ms scale to 0.96 and a `light` haptic plus the platform key click; disabled (max length reached) — the digit keys stay visible but a tap gives a `bump` of the entry (2 dp shake, 80 ms) and no digit; backspace is never disabled.

---

## Entry kinds

| Kind | Entry shows | Length | Completion | Aux key |
| --- | --- | --- | --- | --- |
| `phone` | `+91` fixed prefix + `Heading2` digits grouped *98765 43210* | 10 | Button enables; digits **read back**; Button acts | — |
| `otp` | 4 or 6 boxes 48 × 56, 8 dp apart, one digit each, active box `borderBrand` | 4 / 6 | **Auto-submit** on the last digit, 300 ms after it appears; wrong code shakes once, clears, keeps the keypad | — |
| `number` | `Heading2` digits (bag count, pincode) | as set | Button enables | — |
| `amount` | Amount `L` with ₹, live Indian grouping *₹12,500* | as set (max shown) | Button enables; read back *"twelve thousand five hundred rupees"* | `00` |

SMS autofill (OTP) fills the boxes and submits as if typed. Paste is honoured for `phone` and `otp`. There is never a cursor to place: entry is append and backspace only.

---

## Behaviour

- Appears when a numeric TextField gains focus, in 200 ms from the bottom; the content scrolls so the entry stays visible above the Button. Dismissed by the Button, by auto-submit, or by tapping outside the field — never by a hidden "done" key.
- Each key press appends one digit, `light` haptic, key click at the phone's system volume. Sound off → haptic only.
- **Backspace**: tap removes one digit; hold 600 ms clears the whole entry with a `medium` haptic — undo is not offered because re-typing is short.
- **Read back** (`phone`, `amount`): when the entry is complete, the digits are spoken once in her language in groups of five (phone) or as an amount, ending with *"— is this right?"*; the Button is enabled during and after; tapping it stops the voice. Not for OTP (it is auto-submitting and short).
- Wrong OTP: boxes shake 80 ms, clear, a Toast *Wrong code — try again* spoken; after 3 wrong codes, *Resend code* becomes the primary action and the keypad stays.
- Max length: extra digits are ignored with the entry bump; no error text.
- One keypad on screen at a time; it is never shown with the OS keyboard.
- Reduced motion: no slide-in, no key scale; shake replaced by a colour flash of `borderError` on the entry.
- Landscape and tablets: same keypad, max width 400 dp, centred.

---

## Content

- Numerals are Latin digits (0–9) in all four languages — the digits she reads on money, phones and time; never Devanagari or Kannada numerals.
- Read-back copy: *"You typed nine eight seven six five, four three two one zero. Is this right?"* · *"Twelve thousand five hundred rupees. Is this right?"*
- Toasts: *Wrong code — try again* · *Code sent again*. Never *Invalid input*.

---

## Accessibility

Role `group` labelled *Number keypad*; each key a button announcing its digit; backspace announces *Delete* / *Hold to clear*. Entry is a live region announcing each digit as typed (TalkBack users) — read-back is suppressed when a screen reader is on. Keys 64 dp tall × ≥ 104 dp wide; contrast `textPrimary` on `bgPrimary`; `textSecondary` backspace 4.8:1. Works one-handed at the bottom of the screen; the digits she uses most (right thumb) are all within reach.

---

## Token proposals

| Token | Value | Note |
| --- | --- | --- |
| `haptic.bump` | short double tick | Max-length and wrong-code feedback; into the sound & haptics register |
| `motion.keyPress` | 60 ms | Key scale; into the motion foundation |

---

## Figma reconciliation

1. **Create** NumericKeypad: `Aux` (None / 00), `Pressed` key state, with keys bound to `bgPrimary` / `bgTertiary` on a `bgSecondary` tray.
2. Replace the OS keyboard screenshots in *Enter number*, *OTP Verification* and the in-job OTP sheet with the component; delete the letter labels.
3. Update the OTP mocks to 48 × 56 boxes per `text-field.md`; show the *read-back* state as a frame description on the phone-entry mock.

Result: **~4 variants**, and one keypad for every number in the app.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 64 × ≥ 104 dp |
| 2 | ⚙ Semantic tokens only | ✅ + two proposed |
| 3 | ⚙ Type scale | ✅ Heading2 numerals; Amount L |
| 4 | ⚙ States by ≥ 2 channels | ✅ pressed fill + scale + haptic + click |
| 5 | ⚙ One next action | ✅ the flow's Button above; OTP auto-submits |
| 6 | ⚙ Tap guard | ✅ max-length bump; 300 ms OTP settle |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ digits and one icon |
| 12 | Voice | ✅ read-back before acting on phone and amount |
| 15–16 | Review | ⬜ pending — verify reach on a 360 dp phone one-handed |
