---
name: walkthrough
description: Turn a Paper page into a working app on the Android emulator (she can type, pick, close and go back; not a prototype of linked screens), so people use the flow instead of reading a row of screenshots. Use when the user names a Paper page to walk through, says "walkthrough", "show the flow", "make it clickable", "put it on the phone / emulator", or "refresh the walkthrough" after editing Paper. Reads the screens' code from Paper, wires the taps, makes the drawn controls behave, and opens it on the emulator. Never redraws a screen and never invents a state Paper did not draw.
---

# Walkthrough — a Paper page, played on a phone

The designer says a page name. You read that page's screens from Paper, make everything drawn on them work the way it
works in the app, connect them where the app would move, build, and open it on the emulator. The screens are Paper's
own code; nothing is redrawn. It is for showing a flow to people. It is never evidence for a spec, never a source of design, and it
is not published on claude.ai (`CLAUDE.md` § Publishing).

## It is the app, not a prototype

**This is the rule the designer has had to repeat. Do not make them say it again.** A walkthrough is the Expert app
running on a phone. It is not a Figma prototype: screens joined by hotspots. Linking screens is the smallest part of
the job. The job is that every control does on the phone what it does in the app.

- **She can type.** Every drawn text field (search, name, ID, phone) takes the phone's keyboard. Grey text is the
  placeholder; the search key acts on what she typed (`fields`), and the next screen shows her words. A drawn keypad
  types into its field or boxes.
- **She can change things in place.** Chips, Radios, SelectionCards, toggles and steppers change state on the screen
  they are on. Expandable cards open. Lists scroll. Countdowns run. Toasts come and go. In-flight screens (*finding*,
  *saving*, *moving*) finish by themselves (`auto`).
- **She can leave every way the app allows.** Back arrow, ✕ and the phone's back always work. The scrim tap and the
  drag-down close a sheet **only where `components/bottom-sheet.md` allows it** (`info`, `select`, `form`,
  `permission`). A `confirm` sheet never closes by scrim or drag, and on it the phone's back takes the safe option
  (`onback`).
- **What she did stays done.** What she picked, typed or finished changes later screens (`seen:`, `picked:`, `typed:`,
  her search words). After a move, *My hood* opens locked.
- **A tap goes only where the app would go.** Never hang a screen on an unrelated control (a title, a card, a banner,
  a spinner) so it can be reached. That is a hotspot, and hotspots are the prototype. States that happen *to* her
  (offline, a time just taken, a window closed, nothing open) are reached the way the app reaches them (a timer, `auto`,
  what she typed) or from the long-press screen list. Say so in `notes`.
- **Nothing tells her where to tap.** No hint flashes, no highlights, no "tap here". `hints` is off unless the
  designer asks for it.
- **If a control can't behave because Paper doesn't draw its other state, say which state is missing.** Never wire
  it to a different screen as a stand-in.

**Before you hand it over, use it like she would** in the Browser pane at 427 × 880:
- type in every field and press search;
- pick every chip and card;
- open every sheet and close it by ✕, by the overlay and by dragging, where each is allowed;
- press the phone's back (`history.back()`) on every screen and on every sheet;
- let every in-flight screen finish, and watch a toast leave.

Anything that doesn't behave is fixed in the engine (`tools/walkthrough/`, shared, so every project gets it) before
the designer sees it.

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

`pull` takes every artboard named `N.NN · title` (variants `N.NNa`), in number order. A page whose artboards carry other names (*E1 Profile*, *E3a …*) is not renamed in Paper: give each artboard id its number in `flow.json` → `"numbers": {"<artboard id>": "2.1"}` and pull again. Covers, notes, lane titles and
anything starting `✕` are skipped and listed. `report` prints, per screen: its tappable labels, icon-only controls by
child path (`@2.1.0 40×40`), whether it is a sheet over a screen, and what already behaves on its own.

## 3. Draft the taps in `flow.json`

`taps` maps a screen to `[what she taps, where it goes]`. A tap is an exact on-screen label (`Show map#3` = the third
one on the screen, in reading order), `keypad` (the drawn digit keys), or `@path` from the report for an icon-only control. A target is a screen number, `back`, or `dismiss` (close
this screen's sheet, stay). Set `start` to the first screen. Put presenter cues in `notes` (a tap nobody would guess).

Draft from the screens, in this order of evidence:

1. **The primary action goes to the next screen that follows from it** — by title and by number (*Check in* on 2.02 →
   2.03 *Enter the code*). A sheet's *Got it* goes to the drawn after-state if there is one, otherwise `dismiss`.
2. **A variant `N.NNa` is reached from the control on its parent that names it** (*No code? Use her phone number* →
   2.03a), or by what she types (`fields`, `typed:`). A variant that is a *time* state (last seconds, 15 min left) or
   a system event (offline, an add-on arrives, a time just taken) has no control. If the app gets there by itself, use
   `auto`. Otherwise it is reached from the long-press screen list, and `notes` says so. Never hang it on an unrelated
   control.
3. **Leaving a variant** goes back to where it came from (`back`) or on to the same next screen as its parent.
4. A keypad on a screen with code boxes types into the boxes and the last digit goes to the target; without boxes, any
   digit goes to the target.
5. The close ✕ and the back arrow already go back; don't list them. Wire a sheet's scrim (`@path` → `back`) only for
   the kinds `bottom-sheet.md` lets close by scrim. Give every `confirm` an `onback` to its safe option. Don't wire what
   the flow never uses (Help, SOS, Call); list them as not wired.

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
| SelectionCards with a Radio, one drawn chosen (or none) | Single choice; the chosen card's border and Radio move |
| A number field with a cursor + a drawn keypad | Digits type into it (≤ 6), delete works; the value carries to the next screens and can pick a target (`typed:`) |
| A field with the `magnifying-glass` and its text (grey = placeholder) | A real input: the phone's keyboard opens, the search key goes where `fields` says, and her words carry over |
| A dark rounded panel laid over the screen with a message (Toast) | Slides up in 200 ms, holds 3 s (4 s for long text) and fades (`feedback.md`) |
| ✕ · back arrow (`caret-left` / `arrow-left`) · the phone's back | Back. On a screen with `onback`, the phone's back does that instead |
| A shift ring (track + pink arc, range in the middle) and a 12-hour shift clock (pink wedge) | Follow the time she picks on the screen: the arc sweeps to it in 300 ms, a split day becomes two arcs with a notch and the `coffee` cup in the gap, one ring only (a shift is never longer than 12 hours, so a full circle at most), the range in the middle changes |
| What she picks on a SelectionCard | Carries to the other screens of the same lane (same first number): the confirm, the saved screen, the toast and their clocks show her time, place and money. A value under *Now* is never changed |
| A chip group above a picker, with `lists` in flow.json | The chip swaps the rows for that chip's options (realistic placeholder data the designer asked for); a `chip:10_hrs` step picks the chip on arrival, and if no chip says it, her own chip takes the words |
| A panel with top corners rounded, pinned to the bottom, over a scrim | Rises over the screen (300 ms) and falls on leaving (200 ms), `motion.md`. When its scrim is wired to `back` (a dismissible kind), she can also drag it down: past 30 % it closes, otherwise it springs back |
| A screen taller than the phone | Its main column scrolls; header and bottom bar stay |

Tapping where nothing is does nothing, as on the phone. `"hints": true` brings back the old flash of every tappable place, for
a designer who asks for it. A long-press anywhere opens the list of screens. It is the presenter's way to reach a
state that happens to her, not something she taps.

**Targets are steps**, read left to right: `2.1` push · `back` · `back:0.1` pop to that screen · `~1.10` replace this
screen (a new state of the same place — no travel; in-flight sheets swap in place) · `dismiss` / `sheet` close or
raise this screen's sheet · `speak` (a *Hear again*: says the line beside it). `back:2.1 back ~2.3` = pop to 2.1, pop
it, and replace what is under it with 2.3 — the confirm and the picker leave the history once the change is saved.

**A tap can choose its target**: a third element `[[condition, target], …]` — `seen:<screen>` (the latest seen wins;
so My hood opens locked after the move), `picked:<text>` (a chosen chip or card), `typed:<value>` / `typed!:<value>`.
Conditions are checked against what Paper drew only; they never invent a screen.

**In-flight screens move on by themselves**: `"auto": {"1.9b": ["~1.10", 1600, [conditions]]}`.

**Search fields route by what she typed**: `"fields": {"1.6": [["indira", "1.2"], ["white", "1.11"], ["*", "1.2b"]]}`.
The rules are checked in order and the first match wins: a case-insensitive *contains*, and `*` for anything else. The
next screen shows her words in its field, and wherever it quotes the drawn query (*We couldn't find "…"*).

**The phone's back on a confirm takes the safe option**: `"onback": {"1.9c": "back:1.6"}`.

Screens are artboards named `N.NN · title` or `N.N title` (variants `N.Na` / `N.NL`).

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

What was built (screens), what she can do on it (type, pick, close, go back), what is not wired, which states Paper
doesn't draw, and the one step that is theirs (Chrome first run, home-screen install). Name the states that are
reached only from the long-press screen list.
