# Mobbin read: a guide that tells her what to say, while she speaks (2026-10-07)

**Why.** The design lead liked C2: three big step circles (place · time · friend), the Trainer saying *Now say the time*, and the mic. Their words: "its more understandable, can u build on top of that, can u read mobbin and create another set of iterations".

Internal only. Never published, never traced.

## Screens

| # | App | What it shows | Link |
| --- | --- | --- | --- |
| 01 | Duolingo · conversation | A character fills the middle, with **a speech bubble over her head** (and a speaker to hear it again); the answer sits at the bottom | [screen](https://mobbin.com/screens/aaa44dcc-b20d-4c0e-aa8f-c7324b0a6725) |
| 02 | Speak · lesson setup | A guide avatar and a chat bubble asking one question; the mic is at the bottom, with **"I can't speak now"** (keyboard) above it | [screen](https://mobbin.com/screens/81f174a7-a929-4520-b6df-eb43dcbed8af) |
| 03 | Tolan · chat | A character beside a chat thread; her answers come back as bubbles | [screen](https://mobbin.com/screens/a8006d79-f8df-4c1d-8eff-7119068a6006) |
| 04 | Todoist · voice add | **"Try saying"** above one large example sentence; *Listening…*; a bar of **pause · waveform · done ✓** | [screen](https://mobbin.com/screens/61757b22-a4ea-4cc0-a656-1df18d726b4c) |
| 05 | CVS · voice search | A one-line question, her words big in the centre, *Listening…* | [screen](https://mobbin.com/screens/7c6533b4-158d-4e79-ba60-6c87e3198308) |
| 06 | Chime · sign-up | **Three icon circles joined by a line**, with labels under each (*Basic Info · Verification · You're in!*) | [screen](https://mobbin.com/screens/1fac87e2-445a-4478-84ca-0d01edc25b38) |
| 07 | Plum · set-up | A checklist that ticks, with *Done* under each finished item | [screen](https://mobbin.com/screens/bdf284fa-4681-4835-94b8-e7792e6ca25d) |

## 1 · The idea

Three ways a guide leads someone through speaking:
- **The guide is the stage** (01): a character, a bubble, and her line, one at a time.
- **Show the words to say** (04, 05): one big example for the current step, which her own words then replace.
- **A conversation** (02, 03): the guide asks, her answer comes back as a bubble. It works like WhatsApp, which she already uses.

Across all three: the steps as joined icon circles (06), done marked as she goes (07), and a fallback for when she can't speak (02).

## 2 · Idea vs expression

| Borrowable | Skin |
| --- | --- |
| A bubble over the guide's head, with a speaker (01) | Duolingo's cartoon style; our guide is the registered Trainer (illustration layer) |
| *Try saying* + one big example (04) | English examples; hers are spoken Hindi/Kannada |
| The guide asks, her answer comes back as a bubble (02, 03) | A typing keyboard as the main input |
| Joined step circles with labels (06) | — |
| *I can't speak now* → type (02) | — |
| Pause · waveform · done ✓ (04) | — |

## 3 · Against the expert

- **She knows WhatsApp.** A chat thread (D3) is the most familiar shape for her.
- **Show, don't tell:** the example (D2) shows exactly what to say for this one step.
- **One line on screen at a time**, always spoken aloud too (P4).
- **Done** is a green tick, plus the words we heard.

## 4 · Tier

A Composition, plus the same two asks of core as C: VoiceInput, and the guide character or clip. The step bar inherits from PageIndicator / Stepper (`components/stepper.md` if it fits; otherwise a brief).

## 5 · Translation

The **D** row on *Voice flow · fresh*:
- **D1 · Guide on stage** (01 + 06)
- **D2 · Try saying** (04 + 06)
- **D3 · Chat with the guide** (02 + 03)
