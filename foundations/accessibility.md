# Accessibility

The expert reads slowly or not at all, works in sunlight and in dim stairwells, holds the phone in one hand on a moving bus, and may have set the system font large because her eyes are tired. Accessibility here is not a compliance layer; it is the persona. This page consolidates what every component spec has been repeating — contrast, targets, focus, screen reader, reduced motion, colour — into one standard, states what the tokens actually measure, and names the pairs that do **not** pass so they get fixed once rather than argued about per component. The checks are the ⚙ rows of the component checklist (`PRINCIPLES.md`).

---

## Contrast — what the tokens measure

Ratios computed from `tokens.json` (WCAG 2.x). AA is 4.5:1 for text, 3:1 for large text (≥ 24 sp Regular or ≥ 18.7 sp SemiBold) and for non-text indicators. **Our floor is higher than WCAG for anything read outdoors: 4.5:1 regardless of size, 7:1 preferred for money and time.**

### Text on `bgPrimary` (white)

| Pair | Ratio | Verdict | Rule |
| --- | --- | --- | --- |
| `textPrimary` | 17.7 | ✅ | Titles, amounts, anything essential |
| `textBody` | 10.3 | ✅ | Body copy |
| `textSecondary` | 4.8 | ✅ AA | Metadata; **the smallest colour a translated string may use**; on `bgTertiary` it drops to 4.4 — use `textBody` there |
| `textTertiary` | 2.5 | ❌ | Decorative only: locked digits, placeholder glyphs, disabled-adjacent; never the only carrier of meaning |
| `textDisabled` | 1.5 | ❌ by design | Disabled labels; the reason is always given in text next to it |
| `textBrand` | 4.0 | ⚠ large only | Brand text passes only at Heading3 SemiBold and above (Amount, headings, secondary Button labels at 16 SemiBold are **not** large — see below) |
| `textSuccess` | 3.8 | ⚠ large only | Status text uses the **Strong** step (below); 600 is for icons and large digits |
| `textWarning` | 3.2 | ⚠ large only | Same |
| `textError` | 4.8 | ✅ AA | |
| `textInfo` | 5.2 | ✅ AA | |
| `textInverse` on `bgInverse` | 17.7 | ✅ | Toast, Snackbar, dark stages |

### Text on tinted surfaces

| Pair | Ratio | Verdict | Fix |
| --- | --- | --- | --- |
| `textInverse` on `bgBrand` (primary Button) | 4.0 | ❌ at 16 SemiBold | **Decision needed** — see *Open* below |
| `textInverse` on `interactivePressed` | 5.8 | ✅ | |
| `textBrand` on `bgBrandSubtle` | 3.6 | ⚠ | Brand text on the pink wash only at Heading3+; selected SelectionCard titles use `textPrimary` |
| `textSuccess` on `bgSuccess` / `Subtle` | 3.6 / 3.3 | ❌ | `textSuccessStrong` (green.700) → 5.5 / 5.3 ✅ |
| `textWarning` on `bgWarning` / `Subtle` | 3.1 / 2.9 | ❌ | `textWarningStrong` (yellow.700) → 5.0 / 4.8 ✅ |
| `textError` on `bgError` / `Subtle` | 4.4 / 4.0 | ❌ | `textErrorStrong` (red.700) → 6.5 / 6.2 ✅ |
| `textInfo` on `bgInfo` | 4.8 | ✅ AA | `textInfoStrong` (blue.700) → 6.7 preferred at Caption |
| `textBody` on `bgInfo` | 9.5 | ✅ | The Accordion conditional row |

**Rule that follows:** status **text** (Tag soft labels, Banner copy, Timer labels, reason lines, status rows) always uses the `*Strong` step; the 600 step is for **icons, digits ≥ 24 sp and fills**. The four `text*Strong` tokens were proposed in `tag.md` and are hereby **required**, not optional — they go into the next token release.

### Non-text (3:1 floor)

| Indicator | Ratio on white | Verdict | Rule |
| --- | --- | --- | --- |
| `iconBrand`, `iconError`, `borderBrand`, `borderError`, `borderFocus`, `borderStrong` | 3.7 – 4.8 | ✅ | |
| `iconSuccess` (green.500) | 2.5 | ❌ | Change `iconSuccess` → green.600 (3.8); a standalone success icon (Stepper done node, MediaCapture check) must otherwise sit on a filled disc |
| `iconWarning` (yellow.500) | 2.2 | ❌ | Change `iconWarning` → yellow.600 (3.2); same rule |
| `borderDefault`, `borderSubtle` | 1.2 / 1.1 | — | Structural only; a control's edge is never the only sign it is a control (Buttons are filled or `borderStrong`/`borderBrand`) |
| Timer ring, ProgressBar fill | ≥ 3.8 | ✅ | Tone colours are 600 steps; the track is `borderDefault`, which is fine because the fill's *length* is the information |

---

## Targets and spacing

- Every interactive element ≥ **48 × 48 dp**; the screen's primary action ≥ **56 dp** tall and full width (checklist row 1).
- Adjacent targets have ≥ **8 dp** between them; a decline never sits beside an accept in a row (P3).
- Small visuals (S / XS IconButtons, Chips, Checkbox glyphs) get their 48 dp from the parent row or a padded hit area — the visual may be 24, the target never is.
- The whole row is the target wherever there is a row (ListItem, selection controls, ShieldRow, tabs).
- One-handed reach: the primary Button is at the bottom; nothing she must tap during a job is in the top-left corner except Back.
- Hold gestures (SOS, danger Buttons, keypad clear) are the only long-presses, they always show what they are doing, and they have a TalkBack equivalent (double-tap-and-hold) and a reduced-motion form.
- No swipe-only actions: every swipe (Tabs, carousel) has a tap or Button alternative; nothing is deleted by swiping.

---

## Focus and keyboard / switch access

- Focus ring: 2 dp `borderFocus` **outside** the control with a 2 dp offset, radius following the control; visible on every focusable element, never removed.
- Tab order = reading order = visual order, except the primary Button, which comes **first** on takeover screens (JobAlert, SafetyCheck) so a switch user reaches Accept before Decline.
- A BottomSheet traps focus while open and returns it to the opener on close; Coachmark focus lands on the sentence.
- The NumericKeypad is a grid of buttons; hardware keyboards type into it.

---

## Screen reader (TalkBack / VoiceOver)

- Every control announces **role + label + state**: *"Accept job, button"*, *"Shield, on, recording and location shared, button"*, *"Available for jobs, switch, on"*.
- Labels are the visible text; icons are decorative (`contentDescription = null`) unless the icon is the only meaning (IconButton, marker glyphs), in which case the label is the registered meaning from `icons.md`.
- Cards and rows are read as **one block** in visual order (*"New job. 1.2 kilometres. 7:45. One hour. You'll earn 150 rupees."*), not as six separate nodes; the block is also what the VoicePrompt speaks — one text, two channels.
- Amounts, times and distances have spoken forms (*"four hundred and fifty rupees"*, *"nine thirty am"*, *"1.2 kilometres"*), never digit-by-digit (`amount.md`, `timer.md`).
- Live regions: Timer at 60 / 30 / 10 s, Stepper step change, upload state, ShieldRow state — announced **once**, never chattering.
- Auto-advance, autoplay voice and shimmer stop when a screen reader is on; the SafetyCheck and JobAlert sounds do not.
- Truncated text (the three allowed places, `type.md`) is read in full.

---

## Motion, time and sound

- Reduced motion per `motion.md`: decoration fades or disappears; information motion stays.
- Time limits exist only where the business requires them (job alert, OTP resend, SOS cancel window) and are shown as a Timer she can see and hear; there is no other timed UI, and nothing dismisses itself before she has read it except a Toast (3 s, non-essential by definition).
- Anything that flashes does so ≤ 1 Hz (the `beat` pulse), never faster; nothing strobes.
- Sound is never the only channel: every sound has a visible state and a haptic (P4). (The sound register itself is parked — `ROADMAP.md`.)

---

## Colour and greyscale (checklist rows 9, 10, 14)

- Every state is carried by ≥ 2 of colour / icon / shape / motion / words (row 4). Red alone is not an error; green alone is not success.
- Greyscale test: the page still reads — Timer by ring length and digits, Tag by outline vs fill and glyph, Rating by face shape, ProgressBar by fill length, Stepper by node glyph. Run it on every new component (row 10).
- Status colours mean status only; tier colours mean tier only; the Kavach-blue shield is the one domain colour and is never a status (row 14).
- Deuteranopia check: the pairs that collide are `iconSuccess` vs `iconWarning` (green/amber) — which is why both always carry a glyph — and the Timer's calm/attention tones, which is why the ring length and the digits do the work.

---

## Sunlight and dim light

- Design at 50 % brightness outdoors as the baseline condition (P8's baseline device profile); the 7:1 preference for money and time comes from this.
- Prefer filled indicators over thin outlines (a 1 dp `borderDefault` disappears in sunlight — which is fine, because it never carries meaning).
- Photos and maps behind text always get the scrim rule (`overlay.scrim` 60 % for caption blocks; MediaCapture and HowToClip).
- Light mode only for now: a dark mode would help the stairwell case and is a decision for the token roadmap, not a per-screen choice.

---

## Cognitive load

- One next action per screen (P2); at most three hierarchy levels; ≤ 5 items in any carousel; ≤ 5 rows in any breakdown; ≤ 8 options in any picker before search appears.
- Errors name the problem and one recovery in her words (row 13); no codes, no *Something went wrong*.
- Nothing is hidden behind a gesture she has to discover; Coachmarks teach the three or four that exist.
- Consistency is an accessibility feature: one keypad, one Timer, one place for SOS, one pin family — she learns each once.

---

## The test pass — for every component and screen

1. **Greyscale** filter on: meaning intact?
2. **Font scale 1.3**, Kannada strings (`type.md`): nothing clipped, Buttons still one line?
3. **TalkBack** end to end: every control has role + label + state; blocks read in order; live regions announce once?
4. **Reduced motion** on: information motion still present; gestures have their alternative?
5. **Contrast**: every text pair ≥ 4.5, every indicator ≥ 3 — use the table above; a new pair is computed, not eyeballed.
6. **Targets**: 48 / 56 measured, 8 dp apart.
7. **Outdoors** at 50 % brightness on the baseline device: can she read the amount and the time at arm's length?

---

## Open — decisions this page needs

1. **Primary Button label contrast.** `textInverse` on `bgBrand` is 4.0:1; at ButtonLg 16 sp SemiBold that fails AA (large text starts at 18.7 sp SemiBold). Options: (a) raise `ButtonLg` to **18 / 24 SemiBold** for L Buttons — passes as large text, helps sunlight, costs Kannada width (re-check budgets); (b) darken `interactiveDefault` to pink.700 (`#C70C61`, 5.8:1) — passes outright but moves the brand colour on the app's most visible surface; (c) keep 16 sp and document the brand exception with mitigations (56 dp, icon, spoken label). **Recommendation: (a)**, because it changes no colour and improves the outdoor case; `button.md` and `tokens.json` follow once decided.
2. **Token release 0.20.** Required by this page: `textSuccessStrong` / `textWarningStrong` / `textErrorStrong` / `textInfoStrong` (700 steps); `iconSuccess` → green.600 and `iconWarning` → yellow.600; plus the earlier proposals already in use (`bgErrorStrong`, `bgReward`, `bgInfoSubtle`, `bgNeutralStrong`, `overlay.scrim`, `overlay.result`).

Until decided, specs cite this page rather than repeating the numbers, and the `*Strong` step is used for status text everywhere.
