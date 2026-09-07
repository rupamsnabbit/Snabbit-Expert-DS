# TextField

Status: **Proposed** · Tier: Core · Package: `SnabbitTextField` · Figma: Input field (`44:108`) + Mobile and OTP (`44:280`) + Number Input (`89:129`) + Text Box (`1491:12793`) + Search Box (`1491:17604`)

One component for everything the expert types. Five Figma frames become one component with a `kind`: text, phone, otp, number, amount, search, multiline. Same label, same border, same error, same helper — so once she has learned one field she has learned them all (the research on transfer of learning says this matters more for her than for most users).

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| 5 separate frames | 1 component, `kind` property | Transfer of learning; one set of states to maintain. |
| ~48 dp field | **56 dp default** (L), 48 dp compact (M) | P3: the primary control on a form screen is the field; it gets the L target. |
| States: default, focused, filled, error, disabled | + **verified** (read-only with *Change*), **loading** (validating) | The mobile-number field already shows a verified check; make it a state. |
| Disabled shows *Change* in brand pink | Disabled greys everything, including trailing action | A tappable-looking thing that does nothing breaks P5. |
| Helper 12 sp | Helper and error at **BodyMd 14 sp** | She reads slowly; the line that tells her what went wrong cannot be the smallest text on screen. |
| Placeholder-only fields possible | **Label always visible**; placeholder is an example, never the instruction | Once she types, a placeholder is gone. The label stays. |

---

## Anatomy

```
Label                                  ← BodyMd Medium, textBody, always visible
┌──────────────────────────────────────┐
│ [icon]  Input text          [trail]  │ ← 56 dp, radius lg, border thin
└──────────────────────────────────────┘
[i] Helper or error line               ← BodyMd, one line, icon when error/success
```

Parts: **label** (required except `search`), **leading icon** (Phosphor regular 20 dp, optional, means the field's content — `user`, `envelope`, `phone`), **prefix** (`+91`, `₹` — fixed text in `textBody`), **input** (BodyLg 16 sp `textPrimary`), **trailing slot** (exactly one of: clear ✕ · verified check · *Change* action · unit suffix · spinner · character counter), **helper line** (BodyMd `textSecondary`; becomes error line in `textError` with `x-circle`, or success line in `textSuccess` with `check-circle`).

Spacing: label→field 8 dp; field→helper 8 dp; horizontal padding 16 dp; icon→text 12 dp; prefix→text 8 dp.

---

## Kinds

| `kind` | What differs | Keyboard | Trailing |
| --- | --- | --- | --- |
| `text` | Default | text | clear ✕ while typing; *Change* when verified |
| `phone` | Fixed `+91` prefix; 10 digits; formats as `98765 43210` | numeric | clear; verified check + *Change* after OTP |
| `otp` | 4 or 6 boxes, 48 × 56 dp, 8 dp apart; one digit each; auto-advance; paste fills all; auto-submit on last digit | numeric (auto-read SMS where the OS allows) | none — helper carries *Resend in 29 s* → *Resend OTP* |
| `number` | Digits only; optional unit suffix (*hr*, *km*) | numeric | unit |
| `amount` | Fixed `₹` prefix; Indian grouping `1,25,000`; tabular numerals | numeric | clear |
| `search` | Leading `magnifying-glass`; **no label**; placeholder is the instruction (*Search jobs*); `bgSecondary` fill, no border at rest | text | clear ✕ |
| `multiline` | 3 lines min, grows to 6, then scrolls; counter when a max is set | text | counter (`48/120`) bottom-right, Caption |

`search` is the only kind allowed without a label, because its icon and placement are the label.

---

## States

| State | Border | Fill | Text | Trailing | Helper |
| --- | --- | --- | --- | --- | --- |
| default | `borderDefault` 1 dp | `bgPrimary` | placeholder `textTertiary` | — | helper `textSecondary` |
| focused | `borderBrand` 2 dp | `bgPrimary` | caret `interactiveDefault` | clear (if text) | helper |
| filled | `borderDefault` 1 dp | `bgPrimary` | `textPrimary` | clear | helper |
| error | `borderError` 2 dp | `bgPrimary` | `textPrimary` | clear | `x-circle` + message in `textError` |
| success / verified | `borderDefault` 1 dp | `bgPrimary` | `textPrimary` | `check-circle` in `iconSuccess` + *Change* (ghost brand, S) | optional `check-circle` line in `textSuccess` |
| loading (validating) | `borderDefault` 1 dp | `bgPrimary` | `textPrimary` | spinner | *Checking…* |
| disabled | `borderDefault` 1 dp | `bgTertiary` | `textTertiary` | greyed, not tappable | helper `textTertiary` |

Error is carried by **three channels**: border colour, icon, message (P1). Error appears on blur or on submit — never on every keystroke — and clears as soon as the input becomes valid. Focus ring: none extra; the 2 dp brand border is the focus state.

*Change* in the verified state is a ghost brand S Button inside the trailing slot; tapping it returns the field to `focused` with the value selected. Verified data is never editable by tapping the text itself (P3: costly change needs deliberate action).

---

## Behaviour

- One field per screen wherever possible; long forms become steps with a `Stepper` (P2). Two fields on a screen is the maximum before it becomes a step.
- The primary Button below the form is enabled always; on tap with invalid fields, the first invalid field scrolls into view, focuses, and reads its error aloud on first-time flows (P4, P5). Never a silently disabled submit.
- Clear ✕ (IconButton XS ghost neutral, 48 dp hit area) appears whenever there is text and the field is focused.
- Phone: as she types, digits group `98765 43210`; the OTP field follows on the next screen with the number shown above it and *Change* beside it.
- OTP: focus starts in box 1; each digit advances; backspace on an empty box moves back; the 6th digit submits automatically; wrong code shakes the boxes once (120 ms, reduced-motion → colour only) and turns all borders `borderError`; *Resend* is a ghost brand Button in the helper line, disabled with a countdown for 30 s.
- Amount: `₹` prefix fixed; Indian grouping applied live; `.00` never shown unless typed.
- Number keypad: until the `NumericKeypad` component exists, `phone`, `otp`, `number` and `amount` request the OS numeric keyboard.
- Font scaling to 130 %: label and helper wrap; the field grows in height; nothing clips.

---

## Content

- **Label** is a noun in sentence case naming the thing, ≤ 20 characters in the longest language: *Mobile number*, *Full name*, *PAN number*.
- **Placeholder** is an example of a valid value, in `textTertiary`, never an instruction: *98765 43210*, *Radhika Sharma*. (Instruction belongs in the helper.)
- **Helper** is one line ≤ 40 characters, tells her what happens or what format: *We'll send an OTP to this number*.
- **Error** names the problem and the fix, no blame: *Enter all 10 digits* · *PAN has 10 characters, like ABCDE1234F* · *This number is already registered — call support*. Never *Invalid input*.
- Leading icon means the content, from the register: `user` name, `phone` phone, `envelope` email, `identification-card` PAN/Aadhaar, `currency-inr` amount, `magnifying-glass` search.

---

## Accessibility

Label is the accessible name; helper/error is the description and is announced when it changes. Input text `textPrimary` on white 17.7:1; placeholder `textTertiary` 2.5:1 — acceptable only because placeholder is never the sole instruction (label and helper carry it). Field height ≥ 56 dp (L) is the tap target. OTP boxes announce "digit 3 of 6".

---

## Token proposals

`borderFocus` is blue and reserved for keyboard focus; the field's focused border uses `borderBrand` (2 dp) as the Figma file already does. No new colour tokens needed. The OTP box (48 × 56) and the 30 s resend countdown are component-owned values.

---

## Figma reconciliation

1. Merge the five frames into one component; properties → `Kind` (Text / Phone / OTP / Number / Amount / Search / Multiline), `Size` (L / M), `State` (Default / Focused / Filled / Error / Verified / Loading / Disabled), booleans `Leading icon`, `Helper`.
2. Field height 56 dp (L) and 48 dp (M); radius `lg` 12; padding 16.
3. Disabled: grey the trailing *Change*; remove verified check from the disabled variant.
4. Helper and error text to `BodyMd`; error line gets `x-circle`.
5. OTP: a `Boxes` property (4 / 6); add error (shaken, red) and filled states; *Resend* as a ghost Button in the helper line.
6. Rebind fills, borders and text to semantic variables.

Result: 7 kinds × 2 sizes × 7 states ≈ 98 possible, **~60 meaningful** variants replacing 5 frames / 29 variants that covered only a fraction of the states.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ field 56 / 48; clear ✕ wrapped to 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale only | ✅ BodyLg / BodyMd / Caption (counter only) |
| 4 | ⚙ States by ≥ 2 channels | ✅ error = border + icon + text; verified = icon + action |
| 5 | ⚙ Loading / error | ✅ validating + error states |
| 6 | ⚙ Duplicate taps | n/a; *Change* uses Button's guard |
| 7 | ⚙ Fits four languages at large font | ⬜ label ≤ 20, helper ≤ 40 chars set; verify |
| 8 | ⚙ Reduced motion | ✅ OTP shake → colour only |
| 9 | Meaning without text | ⚠ label is text by nature; leading icon + helper spoken on first use |
| 10 | Greyscale | ✅ error carries icon + text |
| 11 | Costly actions protected | ✅ verified data needs *Change* |
| 13 | Error copy names problem + fix | ✅ rule + examples |
| 15–16 | Copy / device review | ⬜ pending |
