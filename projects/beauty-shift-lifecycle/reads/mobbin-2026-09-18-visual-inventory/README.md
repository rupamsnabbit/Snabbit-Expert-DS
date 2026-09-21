# Reference read — Mobbin, making inventory visual

| | |
| --- | --- |
| Source | Mobbin, iOS |
| Captured | 2026-09-18 |
| Read for | `beauty-shift-lifecycle` — stakeholder feedback: *"all the inventory screens look very text heavy and like a bill, we need to use more visuals"* |
| Rule | `EXTENDING.md` — search by flow, read three apps before translating, borrow structure not skin |

Internal reference only. Never published, never traced. This read **follows** the 2026-09-12 read
(`../mobbin-2026-09-12/`), which settled the *structure* of the bag check, the refill tracker and attendance.
Nothing here re-opens those decisions; this is only about **density and visual form**.

---

## The diagnosis, before the references

The feedback is right, and the cause is one habit repeated on every screen:

> **Quantity is only ever expressed as a numeral pair.**
> *6 of 8 · 7 of 9 · 38 of 41 · 1 of 1 · 0 of 1 pack · used 6 of 8 · +6 · ₹360*

Every row asks her to read two numbers and infer a ratio between them. Nine rows of that is a ledger, and a
ledger is what a bill looks like. `PRINCIPLES.md` P6 says colour and shape are a language for someone who reads
slowly — and we used **neither**, on the one flow that is entirely about amounts.

The second cause is smaller: the product image slots exist on `1.11` and are **empty**, so a row that was designed
as *picture + name + amount* currently renders as *box + name + amount*.

---

## 1 · How much is left → the pouch and the ledger

**Apps read:** [Copilot Money](https://mobbin.com/screens/b7e73076-147a-4493-b507-fe502e255035) ·
[Garmin Connect](https://mobbin.com/screens/f1d6b3f4-fecb-4586-8741-455a8a438f0c) ·
[Runna](https://mobbin.com/screens/b28edf12-d7c1-47d9-a9bc-cea357083a56) ·
[Shopify](https://mobbin.com/screens/27619a9c-56fe-4711-8427-944bae8c5d04) ·
[alias](https://mobbin.com/screens/98106f05-accf-462b-a309-4e6f65ac1aeb)

**1. The idea.** A set of things, each partly used up, shown so you can see at a glance which one is running out.

**2. Idea vs expression.** Borrowable: **the inline bar sitting in the row itself**, the category grouping, the
thumbnail as the row's leading element. Not borrowable: Copilot's blue chrome and emoji category icons, Shopify's
dark mode, the editable number box.

**3. Against the expert.** The instructive pair is Garmin and Runna: both show gear wear as
**`0.0 of 400.0 miles` *and* a bar** — the numerals and the shape together, not one instead of the other. Copilot
does the same at two scales: a bar per category row, and a summary at the top. And **alias is our current screen** —
*For Sale 2 · In Review 1 · Not For Sale 0* — status names with bare counts and no shape at all. It is the exact
failure mode the feedback describes, which makes it the most useful of the five.

**4. Tier.** Composition (Tier 2) on an existing core component — `progress-bar.md` already has the bar.

**5. Translation.** **Keep the count, add the bar.** `Facial & Clean-up · 7 of 9` keeps its numerals and gains a
fill bar on the same row, so the answer is available before the numbers are read and confirmed after. A pouch
that is short reads short.

**6. Difference from the references — one sentence each:**
- Count stays in words on its own line (*7 of 9 items*) rather than compressed into `7/9`, because a slash is not read aloud (P1) — this repeats the 2026-09-12 decision.
- The bar is **not** coloured red when low: `list-item.md` already rules a quantity is never coloured, and a short pouch is *different*, not *bad* (P6). Shortness is carried by **length**, which is the honest channel.
- Dropped Copilot's per-category emoji; `foundations/icons.md` is Phosphor-only and emoji-as-icon is banned outright.
- Added the pouch as a **physical object with its own tile**, because she does not think in categories — she thinks in five zipped pouches she can hold.

## 2 · What is in it → pouch contents and "What is coming"

**Apps read:** [sweetgreen](https://mobbin.com/screens/679de068-3e70-4b71-9d0e-c90ae9647379) ·
[CREME](https://mobbin.com/screens/548b9cda-8e97-4c75-b87e-d61b815c8ff0) ·
[Snoonu](https://mobbin.com/screens/26bcd6e6-7aed-4741-a643-3604f0884b1b) ·
[Blinkit](https://mobbin.com/screens/d07bf906-6dfc-4bf7-9386-ffe9925f7428)

**1. The idea.** Show the contents of a container as pictures of the actual things, not as a list of their names.

**2. Idea vs expression.** Borrowable: **the tile grid** (sweetgreen's *Power Greens Bowl* is nine ingredient
tiles, photo on a tinted square, name underneath), the **corner quantity badge** (Snoonu's *2 LEFT*), and Blinkit's
**order summary as two product thumbnails side by side** rather than invoice lines. Not borrowable: the food-photography
style, the `+` add buttons, the promotional red.

**3. Against the expert.** sweetgreen is the closest analogue we have found for any Snabbit surface: it answers
*what is in this thing* for a reader who is not going to read. It is also the strongest argument against our
current design — the same nine items, as a grid of pictures, occupy less height than our nine text rows and are
recognisable without reading a word. Blinkit matters because it is Indian, it is a delivery, and it still shows the
goods as **pictures inside the tracking screen**, which is exactly what `2.02` refuses to do.

**4. Tier.** Composition. The tile itself is a **new core component** — see *Asks of core* below.

**5. Translation.** Contents become a **3-across tile grid**: product image on a `bgSecondary` square, the amount as
a badge on the tile, the name in two lines under it. The same tile serves three screens — what is in the pouch
(Live inventory), what is coming (Weekly refill), and what to put back (Add refills) — which is the rule of three
satisfied on its first pass.

**6. Difference from the references — one sentence each:**
- The badge carries **the amount, not a promotion** (*+6*, *×2*, *8 kits*), because every reference uses that corner for a discount and we have nothing to sell her.
- Names stay under the tile at `body-md` rather than sweetgreen's caption size, because our budget has to survive Kannada at 1.3 font scale (`foundations/type.md`).
- Tiles are **3-across at 360 dp**, not 2, because five pouches × nine items is a long scroll at 2-across and she is standing over an open bag.
- Product images are **catalogue content, not design-system assets** — `foundations/assets.md` already says so; the board draws the slot and the Category team fills it.

## 3 · The ring we are not using — a negative finding

**Apps read:** [Apple Fitness](https://mobbin.com/screens/620e1c4b-46e7-4ba7-936d-a2bded2de22e) ·
[Flo](https://mobbin.com/screens/3878bc48-a6d7-427a-ae5a-492504ca84c1) ·
[Replika](https://mobbin.com/screens/6340ca6a-914f-4d21-b9bd-114e9bd84eed) ·
[Me+](https://mobbin.com/screens/9a4176f1-411a-40e3-8c55-da3717676279) ·
[Jomo](https://mobbin.com/screens/af3d04eb-0b65-4fac-a743-7a851be5dcdc) ·
[Speak](https://mobbin.com/screens/cdfcd4b7-8a0f-4bdc-ac02-a0786fff8c73)

The obvious way to make *38 of 41* visual is a big donut with a number in it. **Six searches returned six rings and
every one of them means something else:** *78%*, *29%*, *20%*, *100% Mastered*, *100% — let's do the math*. Five of
the six are a **process running** — a loading state — and the sixth is a score.

So a ring reading **93%** on her bag would say *wait* or *you got 93 out of 100*, neither of which is true, and it
would replace a count she can act on (*3 short*) with a percentage she cannot. **Rejected.** The summary at the top
of Live inventory stays a number plus a `short` Tag, and gains a **single horizontal bar** — Copilot's summary
treatment, not Apple's ring.

Recording the rejection because it is the first idea anyone will have again in three months.

---

## Asks of core

| Ask | Kind | Why | Where it lands |
| --- | --- | --- | --- |
| **ProductTile** — image square, amount badge, name under | component (new) | § 5 and § 7 both show contents; nothing in core draws a picture of a thing with an amount on it. `selection-card.md` `hero` is a 4:3 choice card with a radio, `list-item.md` is a row. Used on three screens at once, so the rule of three is met at birth. | `components/product-tile.md` + template |
| **ListItem `fill` trailing** — a count with a bar under it | component change | § 5 pouch rows and § 7 ledger rows. `list-item.md` `quantity` displays a count but has no shape; this read says the shape must sit with it. | `components/list-item.md` |

Neither is solved privately inside this folder.


---

## 4 · Showing what is inside without listing it → the pouch confirm

Read 2026-09-18, second pass, after the stakeholder asked why *Check the pouches* names a count but never says
what the pouch holds.

**Apps read:** [Goodreads](https://mobbin.com/screens/297aa9b2-2f6c-4c14-8485-03da4930a2d1) ·
[Fiverr](https://mobbin.com/screens/ebde8ece-ad04-4569-af25-228ad37dc999) ·
[Klarna](https://mobbin.com/screens/bd9745d3-b6ac-486f-8d95-9dad4de43a38) ·
[Pangea](https://mobbin.com/screens/3896ff76-d5b7-4caf-88d4-744f6beb0aae) ·
[Linktree](https://mobbin.com/screens/5d9d582f-e258-44b1-adae-84b92bf9e5dc) ·
[Formula 1](https://mobbin.com/screens/b929a71f-bc4d-4af9-8017-2a749468d4af) ·
[Qantas](https://mobbin.com/screens/79caf29b-b4a5-460b-a5b8-b9853f1f626b)

**1. The idea.** A container has a name and a count. Show what is in it without becoming a list of it.

**2. Three patterns, and what each is for.**

| Pattern | Apps | What it is good for |
| --- | --- | --- |
| **Collage as the card's image** | Goodreads (3 fanned covers + *634 books*), Fiverr (1 large + 2 small + *2 Gigs*) | Telling collections apart at a glance. Decorative — nobody verifies against it |
| **Overlapping strip + count** | Klarna (*In 3 stores*), Pangea (*194 Others Want To Go*) | Saying *who / what is in here* in one row of a card |
| **One expanded, rest collapsed** | F1 (collapsed rows keep their **total** visible), Qantas, Agoda | A long set where only one matters right now |

**3. Against the expert — the constraint that decided it.** At 2-across, a pouch card is 158 dp wide; after
padding a contents strip gets four ~28 dp thumbnails. **Too small to recognise a product**, which makes it
decoration — and decoration is the exact thing this whole read removed. At full width there is room for five
48 dp thumbnails and a `+N`. **So showing contents means giving up the 2-column grid.** That is the trade, and it
is worth taking: a count alone (*9 things*) asks her to confirm a pouch without telling her what is meant to be in
it, which is the one thing a confirm screen must not do.

**4. Tier.** Composition, on ProductTile — which gains a `peek` size rather than a new component.

**5. Translation — corrected the same day.** The first attempt put a strip of 48 dp product images under the pouch
name. **It was wrong**, and the stakeholder said why: *"we have 40 category icons right? how can we expect experts
to identify each icon instantly."* She cannot. Forty cosmetics items are mostly white bottles, sachets and tubes —
not reliably distinguishable at 48 dp even as photographs, and not at all as glyphs. Worse, `foundations/icons.md`
registers **meanings**, not products; a face pack is not a UI concept and will never earn a glyph.

Going back to the PRD settled it. The stakeholder already described this exact screen on the call:

> *"Now they might or might not check this. **But if they want to go deeper, they can even see the list.**"* (§ call, line 390)
> *"First principally, we can't ask them to give 48 का list."* (line 406)

So the PRD's answer is **not a preview — it is a door.** And *"each item displays quantity"* sits under **Pouch
structure**, which governs the list wherever it appears, one level down. The pouch row therefore carries a single
line of **names** — two of them, then *+4 more* — with a speaker and a chevron into the full list. Text, because
text is what identifies a product; one line, because the 48-item wall is banned.

**6. Difference from the references — one sentence each:**
- **Took the names, not the thumbnails.** Goodreads can preview a shelf with three covers because a book cover *is* an identifier; a cosmetics bottle is not. The pattern travels, the mechanism does not.
- Kept Klarna's shape — one compact line inside the row, ending in a count — and filled it with words instead of pictures.
- The line **collapses when the pouch is ticked**, which no reference does: information and effort should shrink together, so the screen is tallest at the moment she needs it most and shortest when she is done.
- Added a **speaker** on the line (P4). None of the seven references speaks its contents, and she is reading this with both hands in a bag at 9 pm.
- The line is honestly partial (*+4 more*) **only because the PRD rules that carry items are confirmed one tap per pouch, never item by item**, with the rotating spot check as the anti-blind-confirm mechanism — and because the chevron goes to the complete list. If she were expected to verify each item, a `+N` would be a lie.
- Rejected F1's one-expanded-at-a-time: she works through the pouches in whatever order the bag gives her, and an accordion would make her open each one before she can see it.

**What this cost, recorded so it is not rediscovered:** a 48 dp image-only `peek` size was added to
`product-tile.md` and **removed the same day**. The rule that replaced it — *the name never leaves* — is the more
valuable output of the two.

---

## 5 · How inventory apps actually do it → the row, and the register

Read 2026-09-21, after the stakeholder said A2 *"is more of a FYI screen where I'm saying that these should be in
ur pouch"* and that A1 is *"a lot of space for no reason."* Both were right, for two different reasons.

**Apps read — density:** [Crouton](https://mobbin.com/screens/9e03557e-c7a3-43d4-af0c-d30f6a47cf5c) ·
[Centr](https://mobbin.com/screens/a0a29ff5-6177-4395-bc61-37f166d9920b) ·
[Recime](https://mobbin.com/screens/c7692449-3f88-4ae5-9ca6-7d33d7bdf0bc) ·
[Amazon Fresh](https://mobbin.com/screens/f7d26399-4635-471d-bad2-084213216d69) ·
[Julienne](https://mobbin.com/screens/8b1cd31a-1b29-4f1a-ac12-b8b41e1608b7) ·
[Thrive Market](https://mobbin.com/screens/a8eef848-630b-46ae-9ebc-f53b0ab63630) ·
[Shopify](https://mobbin.com/screens/27619a9c-56fe-4711-8427-944bae8c5d04)

**Apps read — register:** [Runna](https://mobbin.com/screens/7bd3ead1-07df-405b-8b38-5baf89c1a49a) ·
[IKEA](https://mobbin.com/screens/1cc706da-7296-4535-b5b1-def091112004) ·
[MyFitnessPal](https://mobbin.com/screens/da83cbb7-ddcd-46ce-86bf-20eb9fc50f98) ·
[Cherrypick](https://mobbin.com/screens/6c4b1066-ebe7-49b2-afa1-b8838ab32660)

### Finding 1 — nobody who does this every day uses a tile grid

**Seven out of seven** shopping-list, pantry and stock apps use a **compact full-width row**, 48–64 dp:
Crouton is the tightest (`( ) 2 large eggs` — quantity and name on **one line**), Centr puts the count right and
groups under collapsible headers, Recime and Julienne add a 40 dp thumbnail, Amazon Fresh leads with the checkbox,
Thrive Market puts a `− N +` in the row. Shopify — the only true inventory tool in the set — is a thumbnail, a
name, a variant line and an editable number, at ~70 dp.

A tile grid is for **browsing a catalogue you do not know**. A list is for **working through things you already
own**. Ours is the second, every single night. The 99 dp tile grid on A1 was ~2.5× the height of a row for the
same three facts, and it put the quantities in a zig-zag instead of a column.

### Finding 2 — the register is a review, not a form

Four apps converge, and all four **phrase it as a question**: *"Have you checked your laps?"* (Runna),
*"Have you scanned everything?"* (IKEA), *"Do these matches look right?"* (MyFitnessPal), and Cherrypick's list
under *"Click to edit any ingredients that look wrong"* with a single **This looks correct**.

That is exactly the stakeholder's read of A2. The screen states a fact — *this is what should be in your bag* — and
the interaction only confirms it. A2 was dressed as a five-card form, which made a statement look like five
decisions.

### Translation

| | Was | Now |
| --- | --- | --- |
| **A1 · Add refills** | 6 × 99 dp tiles, 3-across, ~380 dp of grid | 6 rows at 56 dp: checkbox · 40 dp image · name · **add 2** right-aligned. Quantities form a scannable column (Crouton). *"used 2 today"* deleted from every row — the subtitle already says it once |
| **A2 · Check the pouches** | 5 cards, ~620 dp, scrolling | 5 rows. Title becomes the statement *"What should be in your bag"*; the instruction drops to the subtitle. Ticked rows collapse to 56 dp, open rows keep their names line. Whole screen now fits 800 dp |

**What did *not* travel:** none of the eleven references speaks its list aloud, and ours keeps the speaker (P4).
And we keep **per-pouch ticks** rather than Cherrypick's single *This looks correct*, because the PRD is explicit —
*"confirmed with a single tap per pouch, not item-by-item"* — and the per-pouch tap is a real assertion: she
physically opened that pouch. The review framing is about **register and density**, not about collapsing five
assertions into one.

**The rule this leaves for the rest of the board:** *a list she works through is rows; a grid is for browsing.*
`C2 · Inside a pouch`, `B2 · What is coming` and `D2 · Order detail` are all **browsing** surfaces — she is reading,
not ticking — so their tile grids stay. Only the two working surfaces became rows.
