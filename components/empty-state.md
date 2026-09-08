# EmptyState

Status: **Proposed** · Tier: Core · Package: `SnabbitEmptyState` (new) · Figma: no component. Shipped: the ERRORS section of *Job Lifecycle* (`991:58068`) — full-page *We couldn't mark your attendance* / *Try again* / *Contact support*, and a *Retrying…* spinner screen. No shipped empty ("nothing here yet") screens exist.

The screen that has nothing to show still has to say three things: **what is true**, **why or what happens next**, and **what she can do**. P5 lists empty as one of the five mandatory states of every screen; today it is the one most often left blank. EmptyState is one component for all four "nothing to show" cases — nothing yet, could not load, offline with nothing cached, and waiting for something to finish — so they look like the same app and are spoken the same way.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Error screens: red `warning-circle` glyph, title, body, *Try again*, *Contact support*; nothing for empty, offline or waiting | One **EmptyState** with four kinds — `empty`, `error`, `offline`, `waiting` — same anatomy, same positions | Transfer of learning is weak (research): one shape for "nothing here" is learned once. |
| Red glyph for every error | A **pictogram** from the illustration layer (pink disc, magenta object, status dot) — the dot carries the status, never the object | P6: colour means one thing. A whole red circle shouts; a red dot informs. |
| *Contact support* as a text link | *Call Help* (headset) as a `secondary neutral M` Button on `error`, or *Ask Saathi* elsewhere | Help and Saathi are two doors (decided 2026-09-08); a labelled Button beats a link for a 48 dp target. |
| Placeholder copy (*COPY DWJGCIW…*) | Copy rules below; every state has a spoken line | P4: every error she must recover from has spoken guidance. |
| *Retrying…* full-screen spinner | `waiting` kind with a Timer or a deadline (*Ready by 10:00 pm*), never an indefinite spinner | P5/P8: waiting must say how long. Indefinite loading is Skeleton's job, and it is brief. |

---

## Anatomy

```
                 ┌─────────────┐
                 │  pictogram  │  120 dp (page) · 64 dp (section) — illustration layer, `asset/picto/*`
                 └─────────────┘
              Nothing booked yet            Heading3 · textPrimary · ≤ 40 chars · centred
   Jobs appear here when you go online.     BodyMd · textBody · ≤ 80 chars · ≤ 2 lines · centred
             [ 🔊 Hear this ]               IconButton M tertiary brand (speaker-high) — always on error/offline; optional on empty
           [ Go online              ]       Button primary brand M · the one way out · ≤ 20 chars
           [ Call Help              ]       optional second Button secondary neutral M (error only)
```

Vertically centred in the **remaining content area** (below header, safety strip and Banners; above the tab bar), max width 296 dp, 16 dp vertical rhythm (`spacing.5`), 24 dp between body and Button (`spacing.6`). The Buttons sit inline under the text, not in the bottom action bar — there is nothing else on the screen to compete with.

| Size | Pictogram | Title | Body | Button | Where |
| --- | --- | --- | --- | --- | --- |
| `page` | 120 | `Heading3` | `BodyMd` | `M` | Whole screen or tab has nothing to show |
| `section` | 64 | `BodyLg` Medium | `BodyMd` | `tertiary M` or none | Inside a Card or list section (*No jobs today* on Home) |

---

## Kinds

| Kind | When | Pictogram dot | Title says | Body says | Button |
| --- | --- | --- | --- | --- | --- |
| `empty` | The list is truly empty | none (neutral) | What is true: *No jobs today* · *Nothing earned yet* | What makes it non-empty: *Jobs appear here when you go online* | The way to make it non-empty: *Go online* · *Refer a friend*; **or none** when there is nothing to do |
| `error` | Load or save failed | red ✗ | What failed, in her words: *Couldn't load your earnings* | Reassurance + cause when known: *Your money is safe. The network dropped.* | *Try again* (primary) + *Call Help* (secondary) |
| `offline` | No connection **and** nothing cached | red ✗ on `phone-✗` | *You're offline* | *Your jobs will show when you're back online. SOS still works.* | *Try again*; the Offline **Banner** stays at the top as well |
| `waiting` | Something is being processed on a known schedule | none; `timer` pictogram | *Payout on its way* · *Attendance being checked* | **When**: *Ready by 10:00 pm* — a deadline, never a spinner | none, or *Go to Home* |

`offline` is a full-page state only when the screen has **nothing** cached. A screen with stale data shows the data plus the Offline Banner (P5), never this.

---

## Behaviour

- Appears instantly in place of Skeleton once the answer is known (the Skeleton never turns into an EmptyState with an animation; it swaps).
- `error` and `offline` **speak** their title and body once when shown (P4); the speaker replays. `empty` speaks only when it carries a Button (there is something to do). `waiting` speaks the deadline.
- *Try again* runs the request with the Button's own loading state; on a second failure the body gains *Still not working — call Help*, and *Call Help* becomes `primary`. Never more than two automatic retries; the third is hers.
- `offline` swaps to the real content the moment the connection returns, with a Toast *Back online*.
- Never a dead end: `error` and `offline` always have a way out; `empty` has one whenever an action exists. If nothing can be done, the body says what will happen instead (*Your trainer will call before Monday*).
- No Coachmark ever targets an EmptyState.
- Reduced motion: no pictogram entrance; none is defined anyway.

---

## Content

- Title: what is true, plain, ≤ 40 chars, no exclamation, no *Oops*, no *Uh-oh*, no *Something went wrong*: *No jobs today* · *Couldn't load your earnings* · *You're offline* · *Payout on its way*.
- Body: one or two sentences, ≤ 80 chars, spoken register; for errors, **reassure first** (*Your money is safe*), then the cause if known, then nothing else. Never an error code, never *server*, never blame (*You entered…*).
- Buttons: verbs — *Try again*, *Go online*, *Call Help*, *Refer a friend*. Never *OK*, *Retry* alone, *Contact support*.
- Waiting always has a time: *Ready by 10:00 pm* · *Usually 2 hours*. If truly unknown, say who will tell her: *We'll message you*.
- Four languages: titles verified at 130 % on 360 dp — two lines maximum.

---

## Pictograms

From `foundations/assets.md` § Pictograms; each state names its object; the dot carries the status.

| Kind | Object | Dot | Existing / new |
| --- | --- | --- | --- |
| `empty` jobs | `calendar` | none | new (calendar without dot) |
| `empty` earnings | `wallet-coins` | none | existing |
| `empty` referrals | `expert-with-tablet` | none | existing |
| `error` | `search-document` | ✗ | existing (`search-document-✗`) |
| `offline` | `phone` | ✗ | existing (`phone-✗`) |
| `waiting` payout | `cash-in-hand` + `timer` | none | existing |

Never the Phosphor `warning-circle` alone at 120 dp: an icon is not an illustration, and a red icon is a Banner's language.

---

## Accessibility

Region labelled by the title; title is the page heading when `page`. The speaker is the first focusable element, then the Buttons. Announced once on appearance: *"No jobs today. Jobs appear here when you go online. Button: Go online."* Contrast `textPrimary` / `textBody` on `bgPrimary`; pictogram is decorative to the reader.

---

## Token proposals

None.

---

## Figma reconciliation

1. **Create** EmptyState: `Kind` (Empty / Error / Offline / Waiting), `Size` (Page / Section), booleans `Speaker`, `Body`, `Button`, `SecondButton`.
2. Rebuild the ERRORS frames as `error` instances: `search-document-✗` pictogram, *Try again* + *Call Help* Buttons; delete the red `warning-circle` glyph and the *Retrying…* spinner screen (→ `waiting` with a deadline, or the Button's own loading state).
3. Add the three missing `empty` pictograms to the Assets page (calendar, and any that the Home, Earnings and Refer tabs need).
4. Add an `empty` instance to every list screen mock in the Lifecycle file — the state exists only if it is drawn.

Result: **~10 variants**, and the first drawn empty states in the app.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ Buttons M; speaker 48 |
| 2 | ⚙ Semantic tokens only | ✅ |
| 3 | ⚙ Type scale | ✅ Heading3 / BodyLg / BodyMd |
| 4 | ⚙ States by ≥ 2 channels | ✅ pictogram + dot + words |
| 5 | ⚙ One next action | ✅ one primary; Help secondary on error only |
| 8 | ⚙ Reduced motion | ✅ none |
| 9 | Meaning without text | ✅ pictogram object + dot; spoken |
| 12 | Voice | ✅ error / offline / waiting spoken |
| 14 | Status colours | ✅ only the dot |
| 7 | Four languages | ⬜ title ≤ 40 at 130 % — verify |
| 15–16 | Review | ⬜ pending |
