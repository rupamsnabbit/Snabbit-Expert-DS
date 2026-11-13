# Reference read: "Does this look right?" summary card

- **Source:** screenshot the lead shared on 2026-10-08 (*Al Dente* onboarding, iOS). Internal only; never published or traced.
- **File:** `00-ref-does-this-look-right.png`
- **Fed:** S1 / S1b on Paper *One screen · iterations* (`hood-shift-change`). These are alternatives to E5 and F4 for the edit-before-finding step.

## 1. Name the idea

After an open-ended input, the app shows back everything it understood as one grouped list of label → value rows.
She checks it in one glance, and only then moves on.

## 2. Idea vs expression

| Borrowable (travels) | Their skin (stays) |
| --- | --- |
| One grouped card with hairline dividers, one row per understood field | Black primary button, Inter-like face, grey card stroke |
| A fixed label column, the value beside it, wrapping to two lines | The subtitle about "the best Al Dente experience" |
| The question title *Does this look right?* | *Next* as the action |
| A single primary action at the bottom | Nine fields (ours has three) |

## 3. Against the expert (PRINCIPLES § Who we design for)

| Failure | Fix |
| --- | --- |
| Labels are words only (reading-dependent) | A 40 icon disc leads every row: pin, clock, friends (P1: icon before word) |
| No visible way to change a row | Each row is a ListItem `navigate` with a trailing `caret-right` that opens that row's sheet (E5a / E5b / G6) |
| *Next* is not a verb for what happens | *Find work* (content.md: actions are verbs) |
| A subtitle explains the screen | Dropped (P1 delete-a-line: the title and the rows already say it) |
| Two columns break at large font or in Hindi | S1b stacks the label above the value. Pick S1b if the Hindi pass at 1.3× font clips S1 |
| Nothing for a value she didn't say | The friend row shows *Not said* in `textTertiary` and a dashed disc; it stays tappable |
| No way back to voice | Ghost *Say it again* above the primary, as on E5 and F4 |

## 4. Tier

Tier 2, a composition of core parts: Card (`radius.lg`, `borderDefault`) holding ListItem `navigate` rows with dividers, plus Button ghost and Button primary L. No new component.

## 6. Differences, one sentence each

- Every row gained a leading icon disc because labels alone depend on reading (P1).
- Every row gained a trailing caret because a summary she can't change is a dead end (P3).
- The subtitle was removed because it told her nothing she needed (P1).
- *Next* became *Find work* because the action names what happens (content.md § Actions).
- Nine rows became three, because she said three things.
- Black became the brand primary and the face became Outfit, because colour and type come from tokens.
