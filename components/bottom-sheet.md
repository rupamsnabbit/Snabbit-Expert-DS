# BottomSheet

Status: **Proposed** · Tier: Core · Package: `SnabbitBottomSheet` (exists in the design-system package; this spec defines its kinds and rules) · Figma: Bottom Sheets (`1535:12163`, 15 variants), stray `1825:6967`

The surface that rises from the bottom when the app needs a decision, an answer or a moment of attention without leaving the screen. It is the **only modal surface** in the Expert app — there are no centred dialogs, because a sheet is where the thumb already is (P3), and because a centred box covering the middle of the screen reads as "something broke" to someone who reads slowly.

Four of the benchmark's P0 components live on this surface: the **confirmation Dialog**, the **Select menu**, the **Permission sheet**, and short **forms** (OTP, phone, message). This spec is their shared shell and their rules.

---

## What changes from Figma

| Today (15 sheets) | Proposed | Why |
| --- | --- | --- |
| Each sheet drawn separately; buttons in green (*Accept Job*), red/green pairs (*Absent / Present*), *No | Yes* | One shell, five **kinds**; buttons follow the Button spec — danger filled only here and only with hold; no success-coloured buttons; labels are verbs, never *Yes / No / Okay* | P6, P3, Button spec. |
| Close ✕ floats above the sheet on the scrim | Close is an IconButton **inside** the sheet, top-right — and only on dismissible kinds | A control floating on the scrim has no visible hit area. |
| Some sheets have a dashed empty box, some a hero illustration, some a text field | `info`, `confirm`, `select`, `form`, `permission` each with a fixed slot order | Same shape every time. |
| Scrim, radius and grabber vary | Scrim `bgInverse` 60 % · radius `xl` 16 on top corners · grabber 32 × 4 `borderDefault` when draggable | |

---

## Anatomy

```
▒▒▒▒▒▒▒▒▒▒▒▒ scrim: bgInverse @ 60 % ▒▒▒▒▒▒▒▒▒▒▒▒
╭──────────────── radius xl 16 ────────────────╮
│                  ▬ grabber                   │  32 × 4, borderDefault, 8 dp from top — only when draggable
│  [asset 96–160]                          [✕] │  optional hero (info/permission) · close IconButton M ghost (dismissible only)
│  Title                                       │  Heading3 20 SemiBold · ≤ 40 chars · centred when there is a hero, else left
│  Body / consequence                          │  BodyLg 16 textBody · ≤ 2 lines
│  ─── content slot ───                        │  rows (select) · TextField (form) · facts strip (confirm)
│  [ghost / secondary]                         │  actions: stacked, primary LAST (lowest), full width, L
│  [primary]                                   │
│  ◦ safe-area inset ◦                         │
╰──────────────────────────────────────────────╯
```

Padding 16 sides, 24 top (8 when grabber), 16 bottom + safe area. Content gap 12; actions gap 12. Height = content, max 90 % of the screen; taller content scrolls **inside the content slot** while title and actions stay fixed. Width = screen.

---

## Kinds

| Kind | Dismissible | Hero | Content | Actions | Use |
| --- | --- | --- | --- | --- | --- |
| `info` | yes (✕, drag, scrim tap) | scene/pictogram 96–160 | body text | one: `primary` *Got it* / a verb | Job started · Battery low · Kavach reminder |
| `confirm` | **no** while the decision is pending (no ✕, scrim tap does nothing; back = the safe option) | pictogram 96 or a **consequence strip** | body names the consequence; optional facts strip (red card · missed shift · −₹200) | two, stacked: safe option `ghost` **above**, the costly option `secondary danger` with **hold** below — or `primary brand` when the decision is safe | Go offline? · Emergency logout · Block customer · Change attendance |
| `select` | yes | none | list of Radio rows (single) or Checkbox rows (multi), ≤ 8; search TextField above when > 8 | `primary` *Done* only for multi; single closes on pick | Language · Shift · Reason for leave |
| `form` | yes, unless mid-submit | none | one TextField (OTP, phone, message) with helper | `primary` verb (*Start job*, *Send*) + optional `ghost` (*No OTP?*) | Enter OTP to start job · Customer's number · Message customer |
| `permission` | yes (*Not now*) | scene asset 160 explaining the permission | body: why we need it, one sentence | `primary` *Allow camera* → OS prompt · `ghost` *Not now* | Camera · Location · Contacts · Notifications · Overlay |
| **`persistent`** | **never** — no ✕, no scrim, it is part of the screen | none | whatever the screen's content is; scrolls **inside** the sheet at the tall detent | the screen's own actions, inside the content | Home while a shift is running, over the LiveMap |

---

## `info` · day detail — what happened on one day

Tapping a day on a WeekStrip, a tracker or the rewards calendar opens an `info` sheet with a fixed recipe (from *Expert (Sahil)* `8510:23259`, seven day cards drawn as centred dialogs — `references/expert-sahil-rewards-2026-09-24/` `08`; translated here because the sheet is the app's one modal surface).

```
╭──────────────────────────────────────────────╮
│ Sat 13 Sep                               [✕] │  date · Caption textSecondary · weekday + day + month (content.md § 5)
│                 ( asset 96 )                 │  a registered asset: reward for a coin or bonus · pictogram calendar-✓ / calendar-✗ for present / absent · spin-wheel for a spin day
│  Utsav day                                   │  title Heading3 · the event, in her words
│  [Present · Full shift]                      │  a Tag success / error ONLY for attendance — never a coloured title
│  You earned a Snabbit coin for logging in    │  body BodyLg textBody · ≤ 2 lines · fact first
│  ┌ Work on Utsav day            −₹2,000 ┐    │  optional Nudge `loss` / `gain` for a day still ahead (condition → consequence)
│  [ Got it ]                                  │  one Button primary L · *Got it* — never *Okay!*
╰──────────────────────────────────────────────╯
```

| Day | Asset | Title | Body | Extra |
| --- | --- | --- | --- | --- |
| ahead, with a penalty | festival scene (open — see `assets.md`) | *Utsav day* | *Working today counts double for your streak* | Nudge `loss` *Miss today · − ₹2,000* |
| ahead, with a spin | `asset/reward/spin-wheel` | *Free spin day* | *Spin once after your shift to win coins* | — |
| coin won | `asset/reward/snabbit-coin` | *1 Snabbit coin* | *For logging in by 6:40 am* | — |
| present | `asset/picto/calendar-✓` | Tag `success` **Present · Full shift** | *7:00 am – 12:00 pm · 5 hr* | — |
| absent | `asset/picto/calendar-✗` | Tag `error` **Absent · Full shift** | *Log in by 6:40 am tomorrow to keep your streak* | never *You missed…* as a headline (`content.md` § 9) |
| prize won | the prize asset or photo | *1 gram gold coin* | *We'll call you about delivery this week* | — |
| spin with no win | `asset/reward/spin-wheel` at 40 % | *No coin this spin* | *Next spin Thu 18 Sep* | no face, no *Better luck next time!* (§ 4 miss) |

One Button, always **Got it** — the sheet informs; it never asks. Colour is never the title's job: present and absent are Tags, wins are reward assets, everything else is words.

---

## `persistent` — the sheet that lives on the screen

Every other kind is modal: it arrives, takes a decision, leaves. `persistent` is furniture. It exists because of a
**gesture conflict, not a layout preference**: a LiveMap (`map-marker.md`) is pannable, so a vertical drag anywhere
on it pans the map. On a map-first screen there is therefore **no scroll gesture left** for anything below the map —
content placed there is visible and unreachable, which is worse than absent.

`persistent` resolves it by **owning the vertical gesture in its own area**. The map keeps pan where it is exposed;
the sheet takes drag where it covers.

```
┌──────────────────────────┐   peek        ┌──────────────────────────┐   tall
│                          │               │        ▁▁▁▁              │
│      LiveMap, pannable   │               │   the screen's content   │
│                          │               │   scrolls inside here    │
├────────  ▁▁▁▁  ─────────-┤  ← handle     │                          │
│  the one next action     │               │                          │
└──────────────────────────┘               └──────────────────────────┘
```

- **Two detents, not three.** `peek` (the one next action, and enough map to be worth having) and `tall` (content
  scrolls inside). A third detent is a third thing to learn for no gain.
- **`peek` is the resting state** and must carry the screen's single next action in full — never a truncated card.
  If the next action does not fit in `peek`, the screen has too many next actions (P2), not too small a sheet.
- **A drag handle is required**, 32 × 4 dp `borderDefault`, 8 dp below the top edge, in a 48 dp drag target. It is
  the only affordance that says the sheet moves; without it the content below is invisible and stays invisible.
- **It never covers the BottomTabBar**, and it is never dismissible — she cannot end up on a screen with no sheet.
- At `tall` the map is still visible above the sheet and still pannable there; the sheet does not take a scrim,
  because the map is not disabled, just covered.
- Snap between detents on `motion.standard`, `easing.move`; reduced motion snaps without the spring.
- Screen reader: the sheet is a region labelled by its first heading, with *expand* / *collapse* actions. The map
  behind it is reachable in the reading order **before** the sheet, so she is not trapped in it.

### Action rules (from the Button spec, applied here)

- Actions **stack**, full width, L. The primary/most-likely is **lowest** — nearest the thumb.
- Two side-by-side buttons are allowed **only** in `confirm` when both outcomes are legitimate and equal (Absent / Present), with ≥ 12 dp between them and the **safer on the left** — and neither is coloured green or red; both are `secondary neutral`, the chosen one becomes `primary brand` after tap and the sheet closes.
- A costly action (lose earnings, penalty, logout mid-shift, block) is `secondary danger` with **hold-to-confirm**. Never a filled red button, never one tap.
- No *Yes / No / Okay*. *Go offline* · *Stay available* · *Start job* · *Allow camera* · *Not now*.
- Never three actions.

---

## Behaviour

- Opens in `motion.slow` (300 ms) `easing.enter` from the bottom; scrim fades in over the same time. Closes in `motion.standard` (200 ms) `easing.exit`. Reduced motion → appear/disappear.
- `info`, `select`, `form`, `permission`: drag down past 30 % dismisses; scrim tap dismisses; back dismisses; ✕ dismisses. A dismissed `form` keeps its typed value for 5 minutes.
- `confirm`: **cannot be dismissed accidentally.** No ✕, no drag, scrim tap does nothing, back button = the safe option. The only ways out are the two labelled actions. This is the P3 second gesture for anything costly.
- On open the sheet **speaks its title and body** on first-time flows and whenever the kind is `confirm` or `permission` (P4). A `speaker-high` IconButton beside the title lets her hear it again.
- Keyboard (form): the sheet rises above the keyboard; the TextField is focused on open; the primary Button stays visible above the keyboard.
- One sheet at a time. A sheet never opens another sheet; it closes and the next opens (200 ms gap).
- Offline: sheets that need the network (`form` submit) show the Offline Banner inside the content slot and disable nothing — the submit explains when tapped (P5).
- Loading (`form` submit, `confirm` committing): the primary Button goes `loading`; the sheet stays.

---

## Content

- Title states the event or asks the question in ≤ 40 chars, sentence case: *Job started* · *Go offline now?* · *Enter the customer's OTP* · *Camera lets you check in*.
- Body: one or two lines. For `confirm`, the **consequence** in plain words: *You'll stop getting jobs for the rest of this shift.* For `permission`, the **why**: *We take a selfie to confirm you've arrived.*
- Consequence strip (confirm): up to three asset + label pairs (red card · *1 red card*, clock · *Miss full shift*, coins · *Lose ₹200*), assets from the reward/pictogram layers.
- Spoken copy is the title + body, written to be heard.
- Illustrations from the asset register only: scenes for `info`/`permission`, pictograms for `confirm`.

---

## Accessibility

Role dialog, modal; focus moves to the title on open and returns to the trigger on close. Title is the accessible name; body the description. Scrim is not focusable. `confirm` announces "requires a choice". Actions ≥ 56 dp; drag is never the only way to dismiss (✕ and back exist). Contrast: title `textPrimary` on `bgPrimary`.

---

## Token proposals

`scrim` = `bgInverse` at 60 % — propose `overlayScrim` as a semantic token (rgba(17,24,39,.6)). Sheet elevation is component-owned (the package's `SnabbitBottomSheet`), per the tokens' elevation rule.

---

## Figma reconciliation

1. Merge the 15 sheets into **BottomSheet**: `Kind` (Info / Confirm / Select / Form / Permission), booleans `Hero`, `Grabber`, `Close`, `Facts strip`, `Secondary action`. Add an **Info / Day detail** instance set (date line · asset · title or Tag · body · Nudge · *Got it*) and rebuild the seven day cards in *Expert (Sahil)* `8510:23259` from it.
2. Close ✕ moves inside the sheet, top-right, IconButton M ghost; removed on Confirm.
3. Replace green/red/status buttons with Button instances per the action rules; *No | Yes* → stacked verbs; *Absent | Present* → two `secondary neutral`.
4. Costly confirms (*Emergency logout*, *Block*, *Lose earnings*) get `secondary danger` + Hold.
5. Illustrations swapped for asset instances; delete the stray `1825:6967`.
6. Rebuild the 15 existing sheets as instances on their feature pages.

Result: 5 kinds × booleans ≈ **20 core variants**; the 15 feature sheets become compositions.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ actions 56; ✕ 48 |
| 2 | ⚙ Semantic tokens only | ✅ (scrim token proposed) |
| 3 | ⚙ Type scale | ✅ Heading3 / BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ confirm = no ✕ + hold + consequence strip |
| 5 | ⚙ Loading / offline | ✅ button loading; Offline Banner inside |
| 6 | ⚙ Tap guard | ✅ via Button |
| 8 | ⚙ Motion ≤ 300 ms, reduced motion | ✅ `motion.slow` / `motion.standard` |
| 9 | Meaning without text | ✅ hero asset + consequence strip + spoken title |
| 11 | Costly actions protected | ✅ confirm is non-dismissible + hold |
| 12 | Sound / voice | ✅ spoken on confirm & permission & first-time |
| 13 | Copy | ✅ verbs, consequence, why |
| 15–16 | Review | ⬜ pending |
