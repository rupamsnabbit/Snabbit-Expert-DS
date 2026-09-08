# MediaCapture

Status: **Proposed** · Tier: Core · Package: `SnabbitMediaCapture` (new) · Figma: Document Upload Card (`1075:9974`), Selection Pill Camera / Gallery (`1075:9887`), Camera Preview (`1594:6484`, 3 states). Shipped: selfie login with a face oval and a Snabbit-logo guide; document tiles *Upload Front Side · JPG, PNG (Max 5MB)*.

Every photo the app asks for — the login selfie in uniform, the check-in photo, the Aadhaar front and back, a photo of the finished kitchen — through one component with two forms: a **tile** that holds a photo slot in a form, and a **preview** that guides the shot. The camera talks her through it (*"Move closer" · "Show the Snabbit logo"*), tells her in one word whether it worked, and always offers a retake. She never has to know what a megabyte is.

---

## What changes from Figma

| Today | Proposed | Why |
| --- | --- | --- |
| Tile hint *JPG, PNG (Max 5MB)*; a ✕ on the captured photo | Hint says **what to photograph** (*Front of your Aadhaar card*); size and format are handled silently; ✕ becomes **Retake** | She does not know formats or megabytes; deleting a photo is never the goal — replacing it is (P2, P3). |
| Camera / Gallery choice as a full-width Selection Pill | **Selfies and check-in photos are camera-only.** Documents offer *Take photo* (primary) and *Choose from gallery* (tertiary) | A selfie from the gallery is not a selfie; a document from the gallery is fine. |
| Face oval + logo box drawn only for the selfie; success/fail shown as a full green / red tint | **Guides** as a slot: `face` (oval + logo box), `document` (card frame), `scene` (none). Result overlays kept — green with a check, red with the reason and *Retake* — as `result` states with spoken lines | The shipped overlays are right for this user (P1: show first); they needed the words and the way out. |
| No loading, no error | `uploading` (shimmer + progress) and `error` (reason + Retake) states on the tile | P5: five states for everything. |

---

## Forms

### `tile` — a photo slot in a form

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  empty · 156 × 156 (or 328 × 180 for a wide document) · radius.lg · dashed borderStrong
        ( camera 32 )          
   Front of your Aadhaar       label BodyMd Medium textPrimary
   Take photo                  Button tertiary S, or the whole tile is the target
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

| State | Looks | Action |
| --- | --- | --- |
| `empty` | dashed `borderStrong`, `camera` 32 dp `textSecondary`, label, *Take photo* | Tile opens the `preview` |
| `uploading` | the photo, dimmed 40 %, ProgressBar `S` along the bottom edge, no spinner | none; *Cancel* only if > 3 s |
| `done` | the photo, 2 dp `borderSuccess`, `check-circle` fill 24 dp top-right, **Retake** Button `tertiary S` below | Retake → `preview` |
| `error` | the photo dimmed, 2 dp `borderError`, one reason line `Caption` `textError` (*Photo is blurry*), **Retake** `secondary danger S` | Retake |
| `review` (rejected later by ops) | as `error` with the ops reason; a Stepper `attention` row points here | Retake |

Documents that have two sides are two tiles side by side (156 dp each in 328); the second tile stays `empty` until the first is `done`.

### `preview` — the camera

Full screen; HeaderNav `transparent` with back on a disc; **SOS stays in the header** on check-in previews (P7). Camera fills the screen; a **guide** is drawn over it; a 48 dp instruction bar at the bottom says one thing; the shutter is an IconButton `L primary brand`, `circle`, `camera` (allowed set); *Choose from gallery* `tertiary` beside it for documents only.

| Guide | Draws | Spoken while aligning |
| --- | --- | --- |
| `face` | Dashed oval (60 % width, centred at 40 % height) + a dashed box bottom-right for the Snabbit logo on the uniform | *"Put your face in the circle. Show the Snabbit logo."* |
| `document` | Dashed card frame (85 % width, 1.6 : 1) with rounded corners | *"Fit the whole card in the frame."* |
| `scene` | none; a 16 dp inset only | *"Take a photo of the finished work."* |

Guide colours: dashed `textInverse` 2 dp on the live camera; when the app detects alignment the dashes turn `iconSuccess` and the shutter pulses once — a tap then, or auto-capture after 1 s for `face` (login and check-in are hands-busy moments).

| Result | Overlay | Line | Action |
| --- | --- | --- | --- |
| `checking` | none; shutter shows a Spinner | *Checking…* | none, ≤ 3 s then a result |
| `success` | `bgSuccessSubtle` @ 60 % over the frozen frame; `check-circle` fill 64 dp centred | *Login successful* / *Photo taken* — spoken | auto-continue after 800 ms |
| `fail` | `bgErrorSubtle` @ 60 %; the reason in `Heading3` `textInverse` on a scrim strip | *Uniform not visible* · *Face not clear* · *Card not in frame* — spoken | **Retake** `primary brand L` at the bottom; after 3 fails, *Call Help* `secondary` joins it |

---

## Behaviour

- Camera permission is asked through the Permission BottomSheet before the first `preview` (why, then the OS dialog). Denied → EmptyState `error` inside the preview area with *Allow camera* → settings.
- The shutter ignores taps while `checking`; hardware volume buttons also shoot.
- Photos are compressed on device to the upload budget; the user never sees a size, format or "too large" message. If the network drops mid-upload the tile stays `uploading` under the 3-second rule, then `error` *Couldn't upload — try again* with the photo kept locally so Retake is not needed.
- Flash: auto for `document`, off for `face` (glare on a face is worse than dark). No manual flash control.
- Torch, zoom, filters, timers: none. One control, the shutter.
- Retake always replaces; there is no delete. A tile can be cleared only by the flow that owns it.
- Landscape: locked to portrait for `face` and `document`.
- Reduced motion: shutter pulse and overlay fades removed; the dashed-to-green change stays (it is information).

---

## Content

- Tile labels say **what** to photograph: *Front of your Aadhaar card* · *Your face, in uniform* · *The finished kitchen*. Never *Upload*, *Attach*, *Image 1*.
- Instruction bar: one imperative sentence ≤ 40 chars, spoken as it changes: *Move closer* · *Show the Snabbit logo* · *Hold still* · *Fit the whole card in the frame*.
- Results: two or three words, then what to do if failed. Never a code, never *Verification failed*.
- Buttons: *Take photo*, *Retake*, *Choose from gallery*, *Use this photo* (documents only — a moment to check the text is readable).

---

## Accessibility

Tile is a button announcing state and label (*"Front of your Aadhaar card, not taken, button"*); preview announces the guide and each instruction change; shutter announces *"Take photo"*; results announced immediately. All targets ≥ 48 dp; shutter 56. Overlay contrast: `textInverse` on the scrim strip ≥ 4.5:1 regardless of the photo.

---

## Token proposals

| Token | Value | Use |
| --- | --- | --- |
| `overlay.result` | 60 % | Success / fail tint over a frozen frame — shares the number with `overlay.scrim` but a different colour role |
| `sound.shutter` | — | Registered camera sound; system default where mandated |

---

## Figma reconciliation

1. Document Upload Card → **MediaCapture / Tile**: `State` (Empty / Uploading / Done / Error / Review), `Shape` (Square / Wide). Hint text → *what to photograph*; ✕ → Retake Button.
2. Camera Preview → **MediaCapture / Preview**: `Guide` (Face / Document / Scene), `Result` (None / Checking / Success / Fail); overlays bound to `bgSuccessSubtle` / `bgErrorSubtle`; add the instruction bar and Retake / Call Help.
3. Delete the Camera / Gallery Selection Pill; gallery is a tertiary Button on document previews only.
4. Add SOS to every check-in preview frame.

Result: **~12 variants**, and a camera that explains itself.

---

## Acceptance checklist

| # | Check | Result |
| --- | --- | --- |
| 1 | ⚙ Targets | ✅ tile ≥ 156; shutter 56; Buttons S–L |
| 2 | ⚙ Semantic tokens only | ✅ + two proposed |
| 4 | ⚙ States by ≥ 2 channels | ✅ border + icon + tint + words + voice |
| 5 | ⚙ One next action | ✅ shutter; then Retake or continue |
| 6 | ⚙ Tap guard / loading | ✅ checking ≤ 3 s; uploading progress |
| 7 | ⚙ Four languages | ⬜ instruction bar ≤ 40 chars — verify |
| 8 | ⚙ Reduced motion | ✅ |
| 9 | Meaning without text | ✅ guide, green dashes, check / red |
| 11 | Costly actions | ✅ no delete; retake replaces |
| 12 | Voice | ✅ aligning instructions and results spoken |
| 15–16 | Review | ⬜ pending — test the face guide outdoors at noon |
