# Reference read — Mobbin, three flows

| | |
| --- | --- |
| Source | Mobbin, iOS |
| Captured | 2026-09-12 |
| Read for | `beauty-shift-lifecycle` — the three **invented** surfaces (bag check, weekly refill, attendance) |
| Rule | `EXTENDING.md` — search by flow, read three apps before translating, borrow structure not skin |

Internal reference only. Never published, never traced.

---

## 1 · Checking off a list → the bag check

**Apps read:** [Wanderlog](https://mobbin.com/flows/00921a44-d37e-42e6-be3a-235144476228) · [ClickUp](https://mobbin.com/flows/506c72c2-0f03-4813-a628-21e7f3961492) · [Fabric](https://mobbin.com/flows/65f315e4-072d-473a-8c75-05053aba29d3) · [Apple Notes](https://mobbin.com/flows/b62f531d-a1fa-4240-b654-cf7e6c7786b4)

**1. The idea.** A list of physical things you must have, ticked one by one, with the list's completeness shown as a count.

**2. Idea vs expression.** Borrowable: the **`0/2` count in the header**, **strikethrough on a completed row**, checkbox leading. Not borrowable: their palettes, their density, and — crucially — their *length*.

**3. Against the expert.** All four fail her in the same way and it is instructive: **Wanderlog shows thirteen checkboxes in one scroll** (*Backpack · Boarding pass · Credit and debit cards · …*). That is precisely the 40-item wall the stakeholder ruled out — *"first principally, we can't ask them to give 48 का list."* These apps are for a literate user planning at leisure; she is standing over an open bag at 9 pm. Apple Notes even offers *Enable Automatic Sorting* to move ticked items to the bottom — a preference dialog mid-task, which she would never answer.

**4. Tier.** Composition (Tier 2), plus one Tier 3 for the spot check.

**5. Translation.** Keep the **count** (*2 of 6 added*) — it is a shape for progress (P6) and she may know it. Keep **checkbox leading**. Drop strikethrough: a struck-through item reads as *cancelled*, and these items are not cancelled, they are packed. Replace the long list with **only what she used today** — the list is generated, not compiled.

**6. Difference from the reference.** Six sentences:
- Shortened the list from everything she owns to the 4–10 things she consumed today, because effort must scale with what changed (stakeholder constraint, P8).
- Moved the reason for an unticked item out of the row and into one sheet at the end, because eleven inline controls is eleven chances to mis-tap (P3).
- Replaced strikethrough with a filled checkbox, because struck-through reads as cancelled rather than done.
- Added the quantity to the row (*add 2*) because presence is not the question — amount is.
- Kept the header count, in words (*2 of 6 added*) rather than `2/6`, because a slash is not read aloud (P1).
- Added voice: the list is spoken while her hands are in the bag (P4). None of the four references does this, and it is the single biggest departure.

---

## 2 · Order tracking → the weekly refill

**Apps read:** [sweetgreen](https://mobbin.com/flows/8720624a-0226-44d0-bcf4-83db685bbf61) · [Woolworths](https://mobbin.com/flows/f9075867-414d-44aa-80c2-5258741d9533) · [Fi](https://mobbin.com/flows/72bcf891-8dfc-4ad4-a0d5-aa602c7e5833)

**1. The idea.** A parcel moves through named stages on someone else's clock; the screen says which stage it is at and when it arrives.

**2. Idea vs expression.** Borrowable: the stage rail, the stage-as-headline, the arrival time as the second-biggest thing, the delay strip. Not borrowable: green, the dark card, the map, the courier photo.

**3. Against the expert.** Two problems. All three assume the reader can scan a stage label and infer a state (*Preparing*, *Ready for courier*); and all three are about a parcel that costs nothing extra — **none of them is a bill.** Ours is: she pays for this stock out of her payout. So the money must be present in a way none of these references models.

**4. Tier.** Composition, on a changed core Stepper (`tracker` mode).

**5. Translation.** Adopt the convention all three share, then add the money.

**6. What travels, and what I changed:**
- **The stage is the headline.** Woolworths says **"Packed for delivery"** as an h1; Fi says **"Your order has arrived"**. All three do it, so it is convention and P7 says keep it. My earlier spec had the stage only as a small label under a node with a sentence beneath — **this read corrected that**: the stage becomes the screen's headline and the rail becomes confirmation underneath.
- **Arrival time is the second-largest element.** All three. Adopted.
- **A delay is a separate strip, not a broken node.** sweetgreen shows *"Sorry we're running a little behind with your order"* as a banner while the rail stays truthful — independent confirmation of the rule already written into `stepper.md` § tracker.
- **Woolworths' expanded vertical list, one plain sentence per stage**, is a better explainer than a video for the question *what do these words mean*. Adopted as the *How your refill works* sheet; the video stays for the harder question (*why am I being charged*).
- Added the cost and *Taken from this month's pay* directly under the headline, which no reference has, because ours is the only one that is a bill.
- Dropped the map: she is at home on her week off, not tracking a courier across a city (P8).

---

## 3 · Availability → attendance

**Apps read:** [Fiverr](https://mobbin.com/flows/f9230f7b-0ce5-4807-a125-a23b43ba594e) · [DoorDash Dasher](https://mobbin.com/flows/7f950431-4f7d-4309-99d9-f7ce6abab6b6) · [Beside](https://mobbin.com/flows/5ae96939-6a68-4f5c-ad72-f0590699f2c6)

Read **after** the first-principles design, not before — the stakeholder's instruction was to think first and not copy an existing multi-day screen. Recorded because it turns out to support the departure.

**1. The idea.** A worker declares which days she will and will not work.

**3. Against the expert — the finding.** All three use a **7-day horizontal strip** (DoorDash `Fri 28 · Sat 29 · Sun 30 …`, Beside `M T W T F S S`). That is the industry default, and it is also what the shipped Snabbit multi-attendance screen does. **But in all three the strip is a navigation device or a recurring-rule setter** — pick a day, then see or set that day's hours. **None of them is answering one new day per day.** Our case is a rolling three-day window where two days are already answered and one is new. A 7-day strip would tell her she has a week to manage, which is false, and would bury the single question she actually has.

**6. Conclusion.** The first-principles design stands: **two settled rows and one open question**, not a strip. The read is evidence *for* the departure, which is the more useful outcome than a borrow.

One genuine borrow: **Fiverr states the consequence of being unavailable in plain sentences** — *"While unavailable, your Gigs are hidden and you will not receive new orders or messages. During this time, your response rate will not be affected."* Note the second half: it says what is **not** affected. Our *Not working* and *On leave* options need exactly this, and our emergency-logout copy already reaches for it (*Your pay for today is not affected*). Adopted.
