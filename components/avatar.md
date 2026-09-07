# Avatar

Status: **Proposed** · Tier: Core · Package: `SnabbitAvatar` · Figma: Avatars (`1234:6423`, 45 variants: 9 sizes × 5 styles)

A face in a circle: the expert herself, a customer, a trainer, a teammate in a contest. In an app where reading is slow, a face is the fastest way to say *who* — so the avatar has to be reliable when there is no photo, honest about verification, and never used for anything that is not a person.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| 9 sizes (≈ 80 → 16 dp) | **5 sizes**: 24 · 32 · 40 · 56 · 96 | On the asset grid; five is what the app actually uses (list, card, header, profile, hero). |
| 5 styles: photo, placeholder glyph, initials, illustrated woman, illustrated man | 3 sources — `photo`, `initials`, `illustration` — with `placeholder` as the fallback state | Illustrated woman/man are one source with a `persona` parameter, and they are assets from `foundations/assets.md`, not avatar styles. |
| No status, no badge | Optional **status dot** (online / on job / offline) and **verified** mark | Who is available and who is verified are the two things the app needs to say about a person. |
| Initials only | Initials fall back in a **deterministic tone** from the palette so the same person is always the same colour | Recognition without a photo. |

---

## Anatomy

```
   ╭──────╮
   │ face │ ●   ← optional status dot, bottom-right, 25 % of size, 2 dp bgPrimary ring
   ╰──────╯
      ✓         ← optional verified mark, bottom-right (replaces dot when both), Phosphor seal-check fill, iconSuccess
```

Circle, `radius.full`, always 1:1. Photo fills and crops centre-weighted (face detection where the platform offers it). Initials: `Heading3` 20 SemiBold at 56–96 dp, `BodyMd` 14 Medium at 32–40, `Caption` 12 Medium at 24; one letter below 32 dp. Illustration: the persona assets (`asset/character/…` portraits) inside the circle on a `pink.100` ground.

Sizes: **24** list meta · **32** list rows, chat · **40** cards, header · **56** profile row, contest ranks · **96** profile hero, check-in selfie confirm.

---

## Sources and fallback order

1. **`photo`** — the verified selfie for the expert; the customer's photo if they have one.
2. **`initials`** — first letters of first and last name in the display script (Latin for the app's Latin names; Devanagari/Kannada initials when the name is stored in that script). Background tone chosen by hashing the name into six soft washes: `bgBrandSubtle`, `bgSuccessSubtle`, `bgWarningSubtle`, blue.100, `bgTertiary`, pink.100 — text in the matching 700 step. Same name → same colour every time.
3. **`illustration`** — the Snabbit character portrait (`persona`: house-help woman, cook man, cook woman, trainer). Used for the expert **before her selfie is verified**, for training content, and for empty states — never as a stand-in for a real customer.
4. **`placeholder`** — Phosphor `user` regular on `bgTertiary`, `textTertiary`. Only while a photo is loading or when there is no name at all.

Photos that fail to load fall to `initials`, not to `placeholder`.

---

## Status and marks

| Indicator | Look | Meaning |
| --- | --- | --- |
| `online` dot | `iconSuccess` fill | Available for jobs now |
| `busy` dot | `iconWarning` fill | On a job |
| `offline` dot | `borderStrong` (gray.500) fill | Not available |
| `verified` mark | Phosphor `seal-check` **fill**, `iconSuccess`, on a 2 dp `bgPrimary` ring | Selfie/KYC verified — the expert's own avatar and the trainer's |

Dot is 25 % of the avatar size (min 8 dp), bottom-right, with a 2 dp `bgPrimary` ring so it reads on any photo. Verified mark is 40 % of size (min 16 dp). When both apply, the verified mark wins and status moves to a Tag beside the name. Status colour is never the only signal: the name row always carries the status word or Tag (P1).

---

## States

| State | Rendering |
| --- | --- |
| default | as source |
| loading | skeleton circle, `bgTertiary` shimmer, then fades to photo |
| pressed (when tappable) | 100 ms `bgSecondary` wash ring outside |
| disabled / inactive | 40 % opacity, greyscale photo — a blocked or removed customer |
| selected (in a group picker) | `borderBrand` 2 dp ring + `check` badge, as SelectionCard |

An avatar is tappable only when it opens that person (profile, chat). Never as decoration that happens to be clickable.

---

## Groups

Up to **3** overlapping avatars (−8 dp), 32 dp, then a `+N` circle in `bgTertiary` / `textBody`. Used for "experts near you", contest participants. Overlap order: the expert herself last (on top) when present.

---

## Rules

- **People only.** Businesses, services, hubs, coins and gems use icons or assets — never an avatar circle. The circle means "a person".
- The expert's own avatar is her **verified selfie**, the same one used for check-in. Changing it goes through re-verification; there is no casual "upload photo".
- Customer avatars respect what the customer allowed; default is initials, never a placeholder glyph that looks like an error.
- Illustrated portraits follow the asset rules: dignified, in uniform, skin tones varied across instances.
- No frames, rings or borders beyond the status/verified ring — a pink ring around an avatar would collide with the selected state.

---

## Accessibility

Announced as the person's name plus status ("Radhika, available", "Customer Meera"). Decorative avatars beside a visible name are hidden from the reader to avoid double announcement. Initials text ≥ 4.5:1 on its wash via the 700 step. Status dot has a text equivalent nearby.

---

## Token proposals

The six initials washes reuse existing tokens plus blue.100 and pink.100 (already proposed as `bgInfoSubtle` and `bgBrandSubtlePressed`). No new tokens.

---

## Figma reconciliation

1. Avatars → 5 sizes (24 / 32 / 40 / 56 / 96). Properties: `Source` (Photo / Initials / Illustration / Placeholder), `Persona` (for illustration), `Status` (None / Online / Busy / Offline), boolean `Verified`, `State` (Default / Loading / Disabled / Selected).
2. Initials backgrounds bound to the six washes; text to the 700 steps.
3. Illustration variants use the character portrait assets from the Assets page, not embedded drawings.
4. Add **Avatar group** (3 + count).

Result: 5 sizes × 4 sources (+ personas) with status/verified overlays ≈ **40 variants** from 45, but covering status, verified, loading and groups that did not exist.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ 48 dp hit area when tappable (parent row) |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Heading3 / BodyMd / Caption for initials |
| 4 | ⚙ States by ≥ 2 channels | ✅ status dot + status word; verified mark + label |
| 5 | ⚙ Loading | ✅ skeleton; photo failure → initials |
| 8 | ⚙ Reduced motion | ✅ fade → instant |
| 9 | Meaning without text | ✅ face or initials; illustration when no photo |
| 10 | Greyscale | ✅ verified is a shape; status also in text |
| 14 | Status colours only for status | ✅ |
| 15–16 | Review | ⬜ pending |
