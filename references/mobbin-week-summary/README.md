# Reference read — Mobbin · a week, summarised

| | |
| --- | --- |
| Searched | 2026-09-22 — *weekly schedule overview with hours per day* · *confirmation summary with earnings* · *week strip with a single time range* |
| Kept | **Calm** *Day 4, score!* · **Beside** *Preferred hours* · **Linktree** *Weekly availability* · **Fi** *Rest — week timeline* |
| For | Go-live G4 (*Confirm your shift timings*), round 10, after feedback that the three-card version still needs work |
| Internal only | never published, never traced |

## Step 1–2 — what they show and what they are for

| App · screen | What is on it | For |
| --- | --- | --- |
| Calm · *Day 4, score!* | one big number in a ring, **seven day circles M–S with ticks on the done days**, one sentence, one button | make a week feel like an achievement at a glance |
| Beside · *Preferred hours* | **seven day circles, working days filled black, weekend hollow**; under them *From 9:00 AM · To 5:00 PM* | the whole week in one strip and one time range |
| Linktree · *Weekly availability* | same strip (M–F filled), a single *9:00 AM – 5:00 PM* row, *+ Add more availability* | same |
| Fi · *Rest* week | seven horizontal bars, one per day, hours as filled length | compare days by length |

## Step 3 — what carries the meaning

**Seven circles are a week.** Filled = working, hollow = off; she reads it in one look and it is the same in every script. **One time range under the strip** covers the normal days; only the exception (Sunday) needs its own line. Calm shows that the strip can *celebrate* — ticks and a big number — not just inform.

## Step 4 — tier

Tier 2. The strip is **WeekStrip `dots`** (In app, `components/week-strip.md`) with a reward **marker** on Sunday; money is **HeroCard `jobs`**; the time lines are `Stat` rows with icons; the location is a `ListItem navigational`.

## Step 5–6 — translation, one sentence per difference

| Reference | Paper G4 v10 | Why |
| --- | --- | --- |
| Beside's black filled circles | filled **brand** for working days, **hollow** for Monday off, Sunday filled with a **reward marker** above it (WeekStrip `markers`) | the system's own strip; yellow already means *gain* |
| Beside/Linktree: one time range | *Tue – Sat · 10:00 am – 8:00 pm · 10 h* as the one range, then *Sun · 8:00 am – 8:00 pm · 12 h* as the exception, *Mon · off* | only the exception earns a second line |
| Calm's big ring number | the money HeroCard above the strip, with the Sunday gain in its strip | the hook is the money |
| Three text cards (round 9) | gone — one strip + three short lines | "still needs improving" |
