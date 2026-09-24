# Reference read — Mobbin · choosing extra hours and a start time

| | |
| --- | --- |
| Searched | 2026-09-22, three flow queries: *extra hours with earnings per option* · *pick a time block on a day timeline* · *duration with a stepper and live price*. Worker-side apps first |
| Kept | **Uber** *How much time do you need?* · **Setel** *Extend duration* · **Angi** *Select a specific start time* · **Grab Driver** *Booking planner* (slots with bonus) |
| For | Go-live G2 / G2b, **Iteration B** on Paper *Iterations* (row 2). Iteration A (three SelectionCard rows, then three start-time rows) is kept as drawn |
| Internal only | never published, never traced |

## Step 1–2 — what they show and what they are for

| App · screen | What is on it | What it is for |
| --- | --- | --- |
| Uber · *How much time do you need?* | one giant number (*2 hours*) with **−** and **+** either side; a slider under it; the price (*Starting at $116.56 · $58.28/hour*) pinned above the button | pick a duration and see the cost change, with almost no reading |
| Setel · *Extend duration* | *1 hr* between **−** / **+**, the cost (*RM1.00*) directly under the number, one pay button | same shape, smaller: one number, one price |
| Angi · *Select a specific start time* | a **3-column grid of time tiles**, selected one filled; day strip above | pick a start time by tapping a tile, not scrolling a list |
| Grab Driver · *Booking planner* | time-slot rows each with a **bonus amount** on the right | see which hours pay extra |

## Step 3 — what carries the meaning

The **one big number that changes** is what makes Uber and Setel readable without literacy: the hand taps +, the number and the price move together, nothing else on the screen changes. Angi's grid works because a time is a short string she recognises, and nine tiles beat a list of nine rows. Grab's rows show the money next to the hour, which is the Sunday hook.

## Step 4 — tier

Tier 2 composition. The **− / + around a number is the QuantityStepper shape** (`briefs/quantity-stepper.md`, Tier 3, withdrawn from core 2026-09-22). This is the **third flow** to reach for it (§ 6 products used · Sunday hours round 7 · this iteration) — the rule of three is met; promote back to core if Iteration B is chosen. Time tiles = `SelectionCard compact` in a 3-column grid; the drawn day = the block bar already used on G4.

## Step 5–6 — translation, one sentence per difference

| Reference | Iteration B | Why |
| --- | --- | --- |
| Uber's number is a duration she needs | ours is **extra hours added**: *+2 hours*, and the result under it is **₹1,000 more a month** in green | the hook is the money (stakeholder) |
| Slider under the number | **no slider** — a slider needs a steady thumb; − / + are 56 dp targets (P3) | one-handed, moving |
| Price at the bottom near the button | money **directly under the number**, Setel-style — eyes never move | the earlier "eyes bounce" failure |
| Angi: 9–18 time tiles | **three** tiles (*8:00 am · 9:00 am · 10:00 am*), each with *till 8:00 pm* under it | ops offers three starts |
| Angi: no picture of the day | the chosen day **drawn under the grid** as the block bar (*Sunday · 8:00 am – 8:00 pm · 12 h*), read-only | the picture lives where it is read, not where it is edited |
| Uber's *Leave now / later* chips | none | one question per screen |
