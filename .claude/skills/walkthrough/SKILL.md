---
name: walkthrough
description: Turn a Paper page into a tap-through walkthrough on the Android emulator, so people see the flow as an app instead of a row of screenshots. Use when the user names a Paper page to walk through, says "walkthrough", "show the flow", "make it clickable", "put it on the phone / emulator", or "refresh the walkthrough" after editing Paper. Reads the screens' code from Paper, wires the taps, makes the drawn controls behave, and opens it on the emulator. Never redraws a screen and never invents a state Paper did not draw.
---

# Walkthrough — a Paper page, played on a phone

The designer says a page name. You read that page's screens from Paper, work out where each tap goes, build, and
open it on the emulator. The screens are Paper's own code; the walkthrough only moves between them and makes what is
drawn behave. It is for showing a flow to people. It is never evidence for a spec, never a source of design, and it
is not published on claude.ai (`CLAUDE.md` § Publishing).

Engine: `tools/walkthrough/` (shared by every project). A flow: `projects/<project>/walkthrough/<flow>/` —
`flow.json` is the only file anyone edits; `paper/` is the last pull; `index.html` is built.

## 1. Which project, which page

1. Read `projects/ACTIVE`. That is the project. If it says `none`, ask.
2. Find the page: `python3 tools/walkthrough/walkthrough.py find "<page name>"` (Paper desktop must be open; if the
   script can't reach it, say so and stop). One hit → use it. Several → name them (file · page) and ask.
3. **The page must belong to the active project.** If nothing in `projects/<project>/` (prd, SCOPE, BUILD) names that
   Paper file or page, ask once: *"Is <page> part of <project>?"* Never put a flow in another project's folder, and
   never read another project's folder to decide.
4. First time for this page: `walkthrough.py init <project> "<page name>"` — the flow's folder is the page name
   slugged (`Job lifecycle · linear` → `job-lifecycle-linear`). Already has a `flow.json` → this is a refresh (§ 5).

Before every write into the project folder, re-read `projects/ACTIVE`; if it changed, stop and ask (`CLAUDE.md` § The guard).

## 2. Pull and read

```bash
python3 tools/walkthrough/walkthrough.py pull   <project> <flow>
python3 tools/walkthrough/walkthrough.py report <project> <flow>
```

`pull` takes every artboard named `N.NN · title` (variants `N.NNa`), in number order. Covers, notes, lane titles and
anything starting `✕` are skipped and listed. `report` prints, per screen: its tappable labels, icon-only controls by
child path (`@2.1.0 40×40`), whether it is a sheet over a screen, and what already behaves on its own.

## 3. Draft the taps in `flow.json`

`taps` maps a screen to `[what she taps, where it goes]`. A tap is an exact on-screen label, `keypad` (the drawn digit
keys), or `@path` from the report for an icon-only control. A target is a screen number, `back`, or `dismiss` (close
this screen's sheet, stay). Set `start` to the first screen. Put presenter cues in `notes` (a tap nobody would guess).

Draft from the screens, in this order of evidence:

1. **The primary action goes to the next screen that follows from it** — by title and by number (*Check in* on 2.02 →
   2.03 *Enter the code*). A sheet's *Got it* goes to the drawn after-state if there is one, otherwise `dismiss`.
2. **A variant `N.NNa` is reached from the control on its parent that names it** (*No code? Use her phone number* →
   2.03a). A variant that is a *time* state (last seconds, 15 min left) or a system event (an add-on arrives) has no
   control: hang it on the timer or the header with `@path`, and write the cue in `notes`.
3. **Leaving a variant** goes back to where it came from (`back`) or on to the same next screen as its parent.
4. A keypad on a screen with code boxes types into the boxes and the last digit goes to the target; without boxes, any
   digit goes to the target.
5. The close ✕ already goes back; don't list it. Don't wire what the flow never uses (Help, SOS, Call) — list them as
   not wired.

Then `walkthrough.py check <project> <flow>`: every tap must land; every screen should have a way in. A screen nothing
leads to is still reachable from the long-press screen list — fine for a time variant, a question otherwise.

**Show the user the tap table once**, compact — one line per screen, and a short list of what you guessed or could not
place (*"2.06a — no control leads here; I put it on the timer on 2.06. Right?"*). Change what they correct. On a
refresh, show only new or changed screens.

## 4. Build, check, open

```bash
python3 tools/walkthrough/walkthrough.py build <project> <flow>
bash tools/walkthrough/open.sh <project> <flow>
```

Before the emulator, walk the main path in the Browser pane at 427 × 880
(`http://localhost:8765/projects/<project>/walkthrough/<flow>/index.html`; start `tools/walkthrough/serve.py` in the
background if nothing answers): click each `data-go` in order with JavaScript, confirm the screen id after each, and
look at the sheets and one long screen. Don't claim a path works that you didn't walk.

`open.sh` serves the repo to this Mac only (no cache), boots the emulator if needed, forwards the port and opens the
flow in Chrome.

**The emulator is the user's device.**
- Chrome's first-run screen (*Stay signed out* — it accepts Chrome's terms) and any sign-in are theirs to tap. Ask.
- If screens change without your taps, the user is using it: stop driving it at once.
- Installing to the home screen (no address bar): tell them — **⋮ → Add to Home screen → Install → Install**. Drive it
  yourself only if they ask and aren't using it; read the screen with `uiautomator dump` and tap by label, never by
  remembered coordinates.

## 5. Refresh

"Refresh" or "I changed the screens": `pull` → `check` → `build` → reload on the emulator (the page is never cached).
Ask only about screens that are new or whose labels no longer match a tap.

## What behaves without being listed

The build finds these in Paper's drawing and makes them work. Anything else is a picture.

| Drawn in Paper | Behaves as |
| --- | --- |
| A card with a caret whose items are drawn (here or on another screen under the same title) | Opens and closes; caret turns 180° in 200 ms (`card.md` `expandable`); a card drawn closed borrows the items from the screen that draws it open |
| The same card drawn as a column on one screen and as a row on another | A tap moves between the two drawings |
| `m:ss` / `h:mm:ss` | Counts down while the screen shows; restarts on return |
| 3–6 equal boxes with borders + a drawn keypad | Boxes start empty, fill as she types, delete works, the last digit moves on |
| − n + | Counts, never below zero; a *"+2 pcs vs usual 4"* line under the name follows |
| A row of pills with one drawn selected | Single choice; the drawn selected look moves |
| ✕ | Back |
| A panel with top corners rounded, pinned to the bottom, over a scrim | Rises over the screen (300 ms) and falls on leaving (200 ms), `motion.md` |
| A screen taller than the phone | Its main column scrolls; header and bottom bar stay |

Tapping where nothing is flashes every tappable place. A long-press anywhere opens the list of screens.

If a control isn't found because a page draws it with a different icon, add that icon's path to the sets at the top of
the reading section in `tools/walkthrough/walkthrough.py` (`CARET`, `CLOSE`, `MINUS`, `PLUS`) — the engine is
shared, so every project gets it.

## What you never do

- **Never invent a state.** If a control has no second state drawn anywhere on the page (a card's open state, a
  filled field, an error), it stays a picture, and you say which state is missing so the designer can draw it. The
  next refresh picks it up.
- Never write to Paper. Never hand-edit `index.html` or `paper/`.
- Never redraw a screen "to make it work" — a screen that can't be wired as drawn is a question for the designer.

## Reply

What was built (screens, taps), what behaves, what is not wired, which states Paper doesn't draw, and the one step
that is theirs (Chrome first run, home-screen install). Two presenter cues if the flow has them: tap-where-nothing
flashes the controls; long-press lists the screens.
