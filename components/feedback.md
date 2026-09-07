# Feedback — Banner · Toast · Snackbar

Status: **Proposed** · Tier: Core · Package: `SnabbitBanner`, `SnabbitToast`, `SnabbitSnackbar` · Figma: Status Banner (`666:3389`), Banners (`1580:8199`), Banner (`1616:9990`), Banner +CTA (`1537:11688`), Toast (`519:2495`)

Three ways the app talks back, chosen by **how long the thing is true**:

| | It is… | Lives | Looks | Example |
| --- | --- | --- | --- | --- |
| **Banner** | a **condition** that lasts | inline, in the layout, pushes content | soft tone, flat | Offline · Pending verification · Bonus unlocked this week · Complete by 15 March |
| **Toast** | an **event** that just happened | floating, bottom, 3 s, then gone | solid dark, elevated | PAN verified · Photo saved · Copied |
| **Snackbar** | an event **she can act on** | floating, bottom, 6 s or until acted | solid dark + one action | Job declined · *Undo* — Upload failed · *Retry* |

If it is still true in ten seconds, it is a Banner. If it needs an action, it is a Snackbar. Everything else is a Toast.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Four banner frames, one toast frame | One `Banner`, one `Toast`, one `Snackbar` | |
| Toast has *soft* and *solid* styles in status colours | Toast and Snackbar are **always solid `bgInverse`** with a coloured status icon | A floating message must read over any content in sunlight; dark ground + white text is 17:1 everywhere. Soft pastels float badly. |
| Banner has soft status colours and a blue/pink two-column date variant | Banner is **always soft**; the date variant becomes a `facts` content slot | Inline soft = lasting condition; floating dark = event. Two looks, two meanings — she learns it once. |
| "No internet" / "Bad internet" are Toasts | They are the **Offline Banner** — persistent, top, never dismissible | P5: offline is a calm persistent banner, not a modal and not something that disappears after 3 s while she is still offline. |
| Emoji and asset icons inline (🎉, gold gem) | Phosphor icon **or** one asset pictogram, 24 dp, leading | Assets are allowed here — a bonus banner with the tier gem is exactly what the asset layer is for — but never emoji. |
| No dismiss / action rules | Banner: optional one action or one dismiss, never both required; Snackbar: exactly one action | |

---

## Banner

```
┌────────────────────────────────────────────────┐
│ [icon]  Title                          [action]│  ← soft tone fill, radius lg, 12 / 16 padding
│         Body (optional, one or two lines)      │
│         Fact · Value     Fact · Value          │  ← optional facts slot
└────────────────────────────────────────────────┘
```

**Tones** (soft fill · text/icon) — same table as Tag soft: `info` blue.100* / blue.700*, `success` `bgSuccessSubtle` / green.700*, `warning` `bgWarningSubtle` / yellow.700*, `error` `bgErrorSubtle` / red.700*, `brand` `bgBrandSubtle` / `textBrand`, `neutral` `bgTertiary` / `textBody`. (\* the `*Strong` and `bgInfoSubtle` tokens already proposed in Tag.)

**Parts.** Leading: Phosphor regular 24 dp in the tone colour, **or** one 24–40 dp asset pictogram/reward (gold gem for *Gold bonus unlocked*). Title: `BodyMd` Medium, tone text colour, ≤ 40 chars. Body: `BodyMd` Regular `textBody`, ≤ 2 lines. Facts: up to two label·value pairs, `Caption` label + `BodyMd` Medium value, for dates and amounts (*Complete by · 15 March*). Trailing: **either** one action (ghost S Button in the tone colour: *Retry*, *Verify now*, *See how*) **or** a dismiss ✕ (IconButton XS ghost neutral) — never both, and neither on the Offline banner.

**Variants.** `standard` (icon + title [+ body] [+ action|dismiss]) · `facts` (title + two pairs) · `offline` (fixed: `neutral` tone, `wifi-slash`, title *You're offline*, body says what still works, no dismiss) · `degraded` (`warning`, `cell-signal-low`, *Slow connection*).

**Placement and stacking.** Page-level banners sit directly under the header, full width, 16 dp side margin, 8 dp above content. **One page-level slot**; priority when several apply: offline > error > warning > info > brand > success. Lower-priority banners move inline into the content where they belong (a bonus banner sits above the earnings card, not at the top of the screen). Inline banners are 12 dp from the card they refer to.

**Behaviour.** Banners never auto-dismiss. A dismissed banner stays dismissed for that condition until it changes. The Offline banner appears within 1 s of losing connection and disappears within 1 s of regaining it, replaced by a *Back online* success Toast. Banner appearance is silent except Offline (`soft-tick` once).

---

## Toast

```
┌──────────────────────────────────────┐
│ [icon]  Message                      │  ← bgInverse, textInverse, radius lg, 12 / 16 padding, elevation floating
└──────────────────────────────────────┘
```

Solid `bgInverse` (gray.900), text `textInverse`, icon in the tone's **500** step (`iconSuccess` green.500, `iconError` red.500, `iconWarning` yellow.500, `borderFocus` blue.500 for info, pink.400 for brand) so it reads on dark. Message `BodyMd` Medium, ≤ 2 lines, ≤ 60 chars. Icon is mandatory — it is the only thing that distinguishes a success toast from an error toast in greyscale, and the tone colour is not enough alone (P1).

Width: screen − 32 dp, centred, 16 dp above the bottom action bar (or above the tab bar, or above the safe area — whichever is highest). Slides up 200 ms, holds **3 s** (4 s if two lines), fades 200 ms. Reduced motion: appear/disappear. **One at a time**; later toasts queue. A toast never carries an action, is never the only place critical information appears (P5: the screen must also show the result), and never asks a question.

**Sound.** `success` → `confirm` · `error` → `error` sound + `light` haptic · others silent.

---

## Snackbar

A Toast with **exactly one** action: a ghost S Button in `interactiveHover` (pink.500 — brand readable on dark). Holds **6 s** or until the action is tapped or the screen changes; while holding, the whole snackbar is a 48 dp+ target for the action.

Allowed actions: *Undo* (after decline, delete, mark done), *Retry* (after a failed upload/sync), *View* (after something arrived elsewhere), *Turn on* (after a permission was denied). Never *Dismiss* (swipe does that), never two actions, never *OK*.

Undo is the P3 second chance for actions that were one-tap because they are usually right but occasionally costly — declining a job stays one tap **because** the Snackbar offers 6 s of Undo.

---

## Content

- Banner title says the **condition**: *You're offline*, *Verification pending*, *Gold bonus unlocked*, *Complete by 15 March*. Body says what to do or what still works: *You can still check in. Earnings update when you're back.*
- Toast says what **just happened**, past tense, ≤ 60 chars: *PAN verified*, *Photo saved*, *Back online*. Never *Success!* alone — say what succeeded.
- Snackbar message + verb action: *Job declined · Undo*, *Upload failed · Retry*.
- No exclamation marks, no emoji, no *Oops*. Errors name the problem and (in a Banner) the fix.
- Spoken: toasts are announced once; banners announced on appearance and readable again via the `speaker-high` IconButton when they contain instructions.

---

## Accessibility

Banner: `role=status`, announced on appear. Toast/Snackbar: `role=status` polite; error toasts assertive. Snackbar action ≥ 48 dp target. Text on `bgInverse` 17:1; tone icons on dark ≥ 3:1 (green.500 4.0, yellow.500 8.6, red.500 5.1, blue.500 4.7). Banner soft text ≥ 4.5:1 via the `*Strong` tokens. Toast never blocks the primary Button (sits above it).

---

## Token proposals

Reuses Tag's proposals (`text*Strong`, `bgInfoSubtle`). New: `elevation.floating` is used for Toast/Snackbar as the tokens already allow; no new colour tokens.

---

## Figma reconciliation

1. Merge Status Banner, Banners, Banner, Banner +CTA into **Banner**: `Tone` (Info / Success / Warning / Error / Brand / Neutral), `Variant` (Standard / Facts / Offline / Degraded), booleans `Body`, `Action`, `Dismiss`, `Leading` (Icon / Asset).
2. Toast: delete soft styles and status-coloured solids; one solid `bgInverse` style with `Tone` icon (Success / Error / Warning / Info / Brand). Move *No internet* / *Bad internet* / *No storage* out: the first two become Banner Offline/Degraded, storage becomes an Error Banner with *Clear space* action.
3. Add **Snackbar**: Toast + one action slot.
4. Replace emoji with Phosphor or asset instances; rebind colours to semantic variables.

Result: Banner 6 tones × 4 variants (offline/degraded fixed) ≈ **16**; Toast **5**; Snackbar **5** — replacing 21 frames/variants that mixed all three.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets ≥ 48 dp | ✅ snackbar action, banner action/dismiss wrapped |
| 2 | ⚙ Semantic tokens only | ✅ (Tag's proposals reused) |
| 3 | ⚙ Type scale | ✅ BodyMd / Caption |
| 4 | ⚙ States by ≥ 2 channels | ✅ tone colour + mandatory icon + wording |
| 5 | ⚙ Offline handled | ✅ Offline Banner is the component |
| 6 | ⚙ Duplicate taps | ✅ snackbar action uses Button guard |
| 7 | ⚙ Four languages | ⬜ title ≤ 40, toast ≤ 60 chars; verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ icon + tone + position (inline vs floating) |
| 10 | Greyscale | ✅ icon carries tone |
| 11 | Costly actions | ✅ Undo snackbar is the second chance |
| 12 | Sounds | ✅ confirm / error / soft-tick |
| 13 | Error copy | ✅ rule |
| 15–16 | Review | ⬜ pending |
