# Button

Status: **Proposed** (spec written; awaiting Figma reconciliation and package implementation)
Tier: Core · Package: `SnabbitButton` · Figma: Components → Buttons (`2:8530`)

The button is the one thing on a screen the expert is meant to do next. It is big, it says what will happen, and it never lets a tap go unanswered.

---

## What changes from the current Figma component

| Today (Figma) | Proposed | Why |
| --- | --- | --- |
| 9 styles: Primary, Secondary, Tertiary, Text, Link, Neutral Filled, Neutral Stroke, Destructive, Success | **4 variants × 4 tones** (see below); Success removed; **`accept` added**; Link removed | Status colours are not button styles (P6: status colours only for status) — a green *Success* button makes the **action** look like a **result**. `accept` is not that: it is one action, filled green **only where a decline sits beside it**, so the two doors are told apart without reading (P6, P3). Link is not a button — it becomes its own small `Link` component. |
| 2 states: Active, Disabled | **5 states**: default, pressed, focused, disabled, loading — plus a **hold-to-confirm** behaviour | P3 needs a second gesture for costly actions; P5 needs loading to block duplicate taps and keep the label. |
| Content: Default, Icon Left, Icon Right, Icon Both | Label · Icon leading · Icon trailing. **Icon Both removed.** | P1: one icon, one meaning. Two icons on one button is two meanings. |
| Variables: palette-level (`Pink/color-primary-600`, `Body-M/16-Semibold`) | Semantic (`interactiveDefault`, `ButtonLg`) | Drift between Figma and the package ends when both speak the same names. |
| 294 variants | 4 variants × 3 tones × 4 sizes × 3 contents × 5 states = 720 possible, **~90 actually allowed** (see matrix) | Fewer, real combinations. |

---

## Anatomy

```
┌────────────────────────────────────────────┐
│  [icon]  Label                              │  ← container (fill / border / radius)
└────────────────────────────────────────────┘
   ▲        ▲
   │        └ label: ButtonLg / ButtonMd, single line, sentence case, verb
   └ icon slot: Phosphor, one icon max, leading or trailing; replaced by spinner when loading
```

Parts: **container**, **icon slot** (optional, leading *or* trailing), **label** (required except in IconButton, a separate component), **focus ring** (outside the container), **hold fill** (destructive hold variant only).

---

## Variants and tones

A **variant** is emphasis. A **tone** is meaning. Choose emphasis by how important the action is on this screen; choose tone by what kind of action it is.

| Variant | Emphasis | Container | Label & icon |
| --- | --- | --- | --- |
| `primary` | The one next action | filled | inverse |
| `secondary` | Equal alternative to primary, or the main action on a busy surface | `borderDefault`-width `thick` (1.5 dp) outline, `bgPrimary` fill | tone colour |
| `tertiary` | Supporting action inside a card or list | subtle tonal fill | tone colour |
| `ghost` | Dismiss / "Not now" / low-stakes | no container | tone colour |

| Tone | Meaning | Allowed variants |
| --- | --- | --- |
| `brand` | Move forward: accept, start, continue, save | primary · secondary · tertiary · ghost |
| `neutral` | Neither forward nor destructive: back, view, filter, change | secondary · tertiary · ghost (never primary — nothing neutral is the one next action) |
| `danger` | Lose something: decline, cancel, end shift, remove | primary (only inside a confirmation sheet) · secondary · ghost |
| `accept` | **Take the job.** Nothing else. | primary — **and only when a `danger` action is adjacent in the same footer** |

> `accept` is a **build request** — a new tone in the package. It **supersedes the 2026-09-10 decision** (`DECISIONS.md`: *the shipped green Accept Job becomes brand, no success Button tone*), which was not consulted when this tone was added on 2026-09-16. The 2026-09-16 call stands; the record now says so.

### Colour by variant × tone × state

Every value is a semantic token from `tokens/tokens.json`.

| | default | pressed | disabled |
| --- | --- | --- | --- |
| **primary · brand** | fill `interactiveDefault` · label `textInverse` | fill `interactivePressed` | fill `bgTertiary` · label `textTertiary` |
| **primary · danger** | fill `borderError` (#EF4444) · label `textInverse` | fill `textError` (#DC2626) | fill `bgTertiary` · label `textTertiary` |
| **primary · accept** | fill `interactiveAccept` (green.700 #047857) · label `textInverse` | fill `interactiveAcceptPressed` (green.800 #065F46) | fill `bgTertiary` · label `textTertiary` |
| **secondary · brand** | border `borderBrand` · fill `bgPrimary` · label `textBrand` | fill `bgBrandSubtle` | border `borderDefault` · label `textTertiary` |
| **secondary · neutral** | border `borderStrong` · fill `bgPrimary` · label `textBody` | fill `bgSecondary` | border `borderDefault` · label `textTertiary` |
| **secondary · danger** | border `borderError` · fill `bgPrimary` · label `textError` | fill `bgError` | border `borderDefault` · label `textTertiary` |
| **tertiary · brand** | fill `bgBrandSubtle` · label `textBrand` | fill pink.100 (#FDE4EF)* | fill `bgTertiary` · label `textTertiary` |
| **tertiary · neutral** | fill `bgTertiary` · label `textBody` | fill gray.200 (#E5E7EB)* | fill `bgTertiary` · label `textTertiary` |
| **ghost · brand** | label `textBrand` | fill `bgBrandSubtle` | label `textTertiary` |
| **ghost · neutral** | label `textBody` | fill `bgSecondary` | label `textTertiary` |
| **ghost · danger** | label `textError` | fill `bgError` | label `textTertiary` |

\* Two pressed fills have no semantic token yet. **Token proposal:** `bgBrandSubtlePressed` = pink.100, `bgTertiaryPressed` = gray.200. Until added they are component-owned values, not for use elsewhere.

**Token proposal (contrast):** `textDisabled` is gray.300 (#D1D5DB), 1.3:1 on `bgTertiary` — invisible on a sunlit ₹10k screen. This spec uses `textTertiary` (gray.400) for disabled labels instead, and proposes `textDisabled` move to gray.400.

Focused (any variant): 2 dp `borderFocus` ring, 2 dp outside the container. Loading (any variant): colours of *default*, icon slot shows spinner in the label colour, label stays.

### Why `accept` is green when *Success* was removed

They are not the same green, and the difference is the whole rule.

*Success* was a **tone available to any button** — green as decoration, or as a report that something worked. That
makes an action look like a result, and it spends the one colour the expert reads as *finished* on a thing that has
not happened yet. It stays removed.

`accept` is **one action in one place**. It exists because of what sits next to it: on a job alert, *Accept Job* and
*Deny* are two doors under a 1:23 countdown, and the expert decides before she has finished reading either label.
Green against red is not *good against bad* here — it is **take against decline** (P6: for someone who reads slowly,
colour is a language; P3: the decline is adjacent, never hidden). Green carries information only while the red is
there to carry the other half.

**So the constraint is the pairing, not the colour:** `primary · accept` is allowed **only when a `danger` action is
adjacent in the same footer**. A green button standing alone is `primary · brand` — which is why *Check In*,
*Complete Job* and *Save what I used* are pink even on the same flow. One green button per screen, or none.

Contrast: `textInverse` on `interactiveAccept` is **5.48:1**, so the accept button passes AA at ButtonLg 16 sp
SemiBold outright — better than `primary · brand`'s 3.96:1, which is still open in `foundations/accessibility.md`
§ Open. Do not lighten it to green.600 (3.77:1) to match a screenshot.

---

## Sizes

From `tokens.json → button.sizes`. Height, padding, radius, icon and label are owned by the size; they are never overridden inside the component.

| Size | Height | Padding X | Radius | Icon | Icon gap | Label | Use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L` | 56 dp | 24 | 12 | 24 | 8 | `ButtonLg` 16 sp SemiBold | Full-width bottom action. The default for anything the expert must do. |
| `M` | 48 dp | 20 | 10 | 20 | 8 | `ButtonLg` 16 sp SemiBold | Standard in-content action, cards, sheets. |
| `S` | 40 dp | 16 | 8 | 18 | 6 | `ButtonMd` 14 sp Medium | Inside list rows and dense cards. Needs a 48 dp parent hit area. |
| `XS` | 32 dp | 12 | 6 | 16 | 4 | 12 sp Medium | Chips-adjacent, tags with action. Needs a 48 dp parent hit area. Never for a primary action. |

Width: content width plus padding, with a minimum of 2 × height (so a one-word button is never a square). `fullWidth` stretches to the parent; L primary at the bottom of a screen is always `fullWidth`.

---

## States and behaviour

| State | What the expert sees | Rule |
| --- | --- | --- |
| **default** | Resting colours | — |
| **pressed** | Darker fill (see table), 100 ms ease-out; scale stays 1.0 | Fires on `onPress`, not on release, so the tap feels answered instantly. Haptic `light` on primary. |
| **focused** | 2 dp focus ring outside the container | Keyboard / accessibility focus only; never shown on touch. |
| **disabled** | Grey fill and label, no border colour | Still readable as a button (P5). Tap does nothing and gives no haptic. A disabled primary is a last resort — prefer explaining what is missing. |
| **loading** | Spinner in the icon slot (or leading if there was no icon), label unchanged, colours of default | All taps ignored while loading (P5). Minimum visible time 400 ms so it never flickers. Never a bare spinner without the label. |
| **hold** (danger only) | On press, a fill sweeps left→right over 600 ms; release early cancels; completing fires the action with a `medium` haptic and the label changes to the outcome ("Declined") | The P3 second gesture. Spoken hint on first use: *"Hold to decline"*. Never used for brand tone — accepting is one tap. |

Duplicate-tap guard: after `onClick`, the button ignores further taps for 300 ms or until `loading` clears, whichever is longer.

---

## Content

- **Label is a verb phrase in sentence case** that names the outcome: *Accept job*, *Start work*, *Mark done*, *Call customer*, *Not now*. Never *OK*, *Submit*, *Continue*, *Yes*.
- **One line.** Two words is the target; four is the limit. If a translation does not fit at L width on a 320 dp screen, shorten the copy — do not shrink the type or wrap.
- **Length budget:** ≤ 18 characters in the longest of Hindi, Kannada, Marathi, English at the largest system font size. Check all four.
- **Icon** is optional and Phosphor `regular` (see `foundations/icons.md`). Leading icon = what the action is (`check` for accept, `phone` for call). Trailing icon only for direction (`caret-right`, `arrow-right`). Never both. The icon's meaning must already be in the register.
- **Numerals** stay Latin (*Accept · ₹450*), so the amount renders in Outfit in every language.

---

## Placement

- One `primary` per screen, `L`, `fullWidth`, at the bottom, 16 dp side padding plus the safe-area inset (P2). Secondary or ghost actions sit *above* it, stacked, never beside it in a row (P3: adjacency is how mis-taps happen).
- Two equal choices side by side are allowed only inside a confirmation sheet, with ≥ 12 dp between them and the safer choice on the left.
- Inside cards and list rows use `M` or `S` tertiary/secondary; never a filled primary inside a card unless the card *is* the screen's one action (the job card's Accept).

---

## Accessibility

Hit area ≥ 48 × 48 dp (parent provides for S/XS). Contrast: primary brand label on `interactiveDefault` is 4.1:1 — passes AA for text ≥ 16 sp SemiBold (large text). Screen-reader: label plus state ("Accept job, button, loading"). Respects font scaling to 130 %; beyond that the button grows in height, never clips. Honours reduced motion (pressed fade only, no hold sweep animation — hold uses a countdown label instead).

---

## Sound and voice (P4)

Primary brand tap: the `confirm` sound family (short, rising) once the action *succeeds*, not on tap. Hold completing: `commit` sound (short, falling). No sound on secondary/tertiary/ghost. First-time coachmark on any hold button reads the label aloud with "hold to…".

---

## Do / Don't

**Do** — one primary at the bottom · verb labels · Phosphor icon that means the action · hold for anything that loses the expert money or a job · keep the label visible while loading.

**Don't** — two primaries · green as decoration or as a result · a green accept with no decline beside it · icons on both sides · *OK* / *Submit* · a decline button next to accept in the same row · disable a button without telling the expert why · shrink text to fit a translation.

---

## Figma reconciliation — what to change in the component

1. Rename the variant property `Style` → **Variant** (`Primary / Secondary / Tertiary / Ghost`) and add **Tone** (`Brand / Neutral / Danger / Accept`). Delete *Success* (it is not `Accept` — see *Why `accept` is green*), *Link*, *Neutral Filled*, *Neutral Stroke*, *Text* (Text → Ghost; Neutral Stroke → Secondary·Neutral; Link → new Link component).
2. `State`: add **Pressed**, **Focused**, **Loading**; keep Disabled. Add a **Hold** boolean on Danger.
3. `Content`: delete **Icon Both**.
4. Rebind every fill, stroke and text colour to semantic variables named as in this spec; rebind text styles to `ButtonLg` / `ButtonMd`.
5. Disabled: replace the pink-200 wash with `bgTertiary` + `textTertiary`.
6. Move Button Groups and Block/Unblock out of the Components page (compositions). ~~Progress Buttons~~ stay — reconciled as **ProgressButton** (`progress-button.md`, 2026-09-10): a system-moved band (clock / server), distinct from the hold fill (her finger) here.

Expected result: ~90 variants instead of 294.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp; primary ≥ 56 dp | ✅ L 56, M 48; S/XS require parent hit area — documented |
| 2 | ⚙ Semantic tokens only | ✅ except two pressed fills — token proposal filed above |
| 3 | ⚙ Type scale only | ✅ ButtonLg / ButtonMd; XS uses Caption size with Medium weight — proposal to add `ButtonSm` |
| 4 | ⚙ Every state by ≥ 2 of colour/icon/shape/motion | ✅ pressed: colour + motion; loading: icon + label; disabled: colour + (no) haptic; hold: motion + label |
| 5 | ⚙ Loading/empty/error/offline | ✅ loading; others n/a for a control |
| 6 | ⚙ Duplicate taps blocked, label visible | ✅ 300 ms guard + loading |
| 7 | ⚙ Text fits all four languages at large font | ⬜ to verify with real copy — 18-char budget set |
| 8 | ⚙ Reduced motion, ≤ 300 ms | ✅ pressed 100 ms; hold sweep 600 ms is the *gesture*, not decoration, and has a reduced-motion alternative |
| 9 | Meaning survives without text | ✅ with leading icon; ⚠ label-only buttons rely on position + colour — prefer an icon on primaries |
| 10 | Meaning survives in greyscale | ✅ variants differ by fill/outline/none, not only hue |
| 11 | Costly actions protected, desired one tap | ✅ hold on danger; brand one tap |
| 12 | Key moments have unique sound | ✅ confirm / commit |
| 13 | Error copy names problem + recovery | n/a (control) |
| 14 | Tier colours only for tier; status only for status | ✅ Success removed |
| 15 | Copy reviewed aloud in each language | ⬜ pending |
| 16 | Reviewed on baseline device | ⬜ pending implementation |
