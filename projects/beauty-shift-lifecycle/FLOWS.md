# Flows — Shift Lifecycle · Beauty Category

Step by step, tap by tap. Every step is marked **INHERIT** (it ships today for Househelp — match the frame) or **INVENT** (a *New* row in the PRD — design from `principles/` first, even where a Figma version exists).

Evidence for every inherit step: `reads/shift-lifecycle-shipped/`. Tier for every screen: `TIERS.md`.

Baseline 360 × 800 · content `--container-content` · margin `--spacing-5`.

---

## The one thing to hold on to

**The Home shift card is the hub.** In the shipped app, attendance, login, the hotspot and logout all happen on *one card* that changes state through the day. There is no separate attendance screen, no separate login screen. Beauty keeps this — she already knows it — and the new Beauty things are inserted into the same card's lifecycle rather than added beside it.

```
                        THE HOME SHIFT CARD, through one day
  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
  │ Mark       │→ │ ✓ Present  │→ │ map        │→ │ 🕐 Shift   │→ │ Today's    │
  │ attendance │  │ [Login]    │  │ searching  │  │ ends 6 PM  │  │ earnings   │
  │ [A] [P]    │  │ boundary ▲ │  │ for jobs   │  │ [Logout] ▲ │  │            │
  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
                        ▲ Beauty inserts here      ▲ and here
```

---

# FLOW 1 · Mark attendance for the next 3 days

**INVENT.** Stakeholder instruction: *"If you even see any existing screen of multi-attendance, don't refer to it. Think first principally."* The shipped 4-day strip + Submit is captured in `reads/` only so the departure is visible.

### The insight that makes it simple

She does **not** answer three questions. She answered D+1 two days ago and D+2 yesterday. **Only D+3 has never been seen.** One new day enters the window each day; one falls off.

So: **one open question, two settled facts.** Not three identical pickers.

### Steps

**1.1** She opens Home. The shift card is in its *before attendance* state and now covers three days instead of one.

```
┌ Home shift card ─────────────────────────┐
│ Tuesday, 7 February                      │
│ 7:00 AM – 12:00 PM                       │
│ 💰 You can earn        ₹800 – ₹1,000     │  keep — the shipped motivator (P6)
│ ─────────────────────────────────────    │
│ Your next 3 days                         │
│ ✓ Tomorrow · Wed 8      [Working]     ›  │  settled — answered 2 days ago
│ ✓ Thu 9                 [Working]     ›  │  settled — answered yesterday
│ ┌──────────────────────────────────────┐ │
│ │ Fri 10                               │ │  OPEN — borderBrand 2 dp
│ │ Are you working?                     │ │
│ │  ( ) Working                         │ │  SelectionCard compact, single
│ │  ( ) Not working                     │ │  56 dp each, stacked, 12 apart
│ │  ( ) On leave                        │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**1.2** She taps **Working** on Friday.

**1.3** The card collapses to its settled row — `check-circle`, Tag *Working*, `light` haptic. **No Submit button.** D+2 and D+3 save on tap with no penalty check, exactly as the PRD says, so a submit step would be a lie about what is happening.

**1.4** All three are set. A calm line replaces the open card: *All three days are set.*

### Branch — she changes a settled day

**1.5** She taps a settled row → it expands back into the three options, in place. Selecting saves immediately.

**1.6** **If the day is D+1 and the cutoff has passed**, it does not expand. A BottomSheet opens instead:

> **Change tomorrow to Not working?**
> You said you would work tomorrow. Changing now costs ₹50.
> `[ Keep it as it is ]` ghost neutral
> `[ Change anyway · −₹50 ]` primary danger

The cost is **on the button**, not buried in the body (P3: a costly action gets a second deliberate gesture and states its price).

**1.7** Inside the cutoff window, the D+1 row carries a `Nudge loss` — *🕐 Change before 8 pm · −₹50*. This is the fix for the trap the PRD creates: a day marked free on Monday becomes expensive on Wednesday, and nothing tells her. Now something does, at the moment it becomes true.

### Branch — the day is her week off

**1.8** Week off is **not a fourth option**. It is pre-filled and not tappable, and it must never wear the *Not working* grey:

```
│ [rest pictogram]  Wed 8      [Week off]  │  Tag brand soft
│                   Your day off.          │
```

Mandatory, unpaid, Mon–Thu, fixed at go-live. It is a good thing; the copy is warm, not apologetic (P6).

### States

loading → Skeleton rows · offline → Banner, answers queue with a `clock-clockwise` *Will save when you're back online* · save failed → the row returns to its previous answer with *Couldn't save. Tap to try again.*, never a silent revert.

---

# FLOW 2 · Start the shift

Steps 2.1, 2.2, 2.5 **INVENT**. Steps 2.6–2.9 **INHERIT** (selfie ships unchanged).

### Steps

**2.1** Home, after attendance. The card is in its *✓ Present* state — and now carries **today's first job**, which Househelp never sees.

```
┌ Home shift card ─────────────────────────┐
│ ✓ Present                    ⟳ Change    │  INHERIT
│ ┌ First job ─────────────────────────┐   │  INVENT
│ │ 🕐 10:00 am                        │   │
│ │ 🧴 Facial · Threading              │   │  services only — never the amount
│ │ 📍 Indiranagar · 3.2 km            │   │
│ └────────────────────────────────────┘   │
│ [ Start shift ]                          │  INHERIT (relabelled from Login)
│ 🪙 Start by 6:50 am              +1      │  INHERIT — Nudge gain
│ ─────────────────────────────────────    │
│ 📍 Your work area · Indiranagar    Map › │  INVENT — replaces the hotspot row
└──────────────────────────────────────────┘
```

Two changes to the shipped card: the hotspot row (*Your Hotspot · Jyoti Nivas College Gate · 3.2 km away*) becomes a **work area** row, and the first-job block is new. Everything else is as it ships.

If nothing is booked yet: EmptyState `waiting` inside the block — *No jobs booked yet · Jobs appear here as customers book.*

**2.2** She taps **Start shift**. The boundary check runs. **This is the only hard gate in the entire PRD.**

**2.3 — inside the area**

```
┌──────────────────────────────────────────┐
│ ‹  Start shift                           │
│ ┌ map, hero ─────────────────────────────┐│
│ │ ░░░░░░░░░░░░░░░░░░░                    ││  area: bgBrandSubtle fill,
│ │ ░░░░  ● You  ░░░░░░                    ││  borderBrand 2 dp stroke
│ │ ░░░░░░░░░░░░░░░░░░░                    ││
│ └────────────────────────────────────────┘│
│ ✓ You're in your work area                │
│   Start from anywhere inside the pink area│
│ [ Start shift ]                           │
└──────────────────────────────────────────┘
```

The question has changed from *where do I go* (a pin, 3.2 km away) to *am I allowed to work from here* (an area). That is why the hotspot row goes.

**2.4 — outside the area**

```
│ ✗ You're 1.2 km outside your work area    │
│   Move into the pink area to start        │
│ ┌ Nudge loss ────────────────────────────┐│
│ │ 🕐 Start by 10:00 am    [red card] 1   ││  the existing absence consequence,
│ └────────────────────────────────────────┘│  said before it happens (P5)
│ [ ⇱ Show directions ]                     │
│ [ ⟳ Check again ]                         │
```

**No "start anyway."** Everything else in this PRD is non-blocking; this one thing is not, and the contrast is what teaches her the rule.

**2.5** Inside → the **bag status** sheet, carried over from last night's check.

*All clear* — one tap:
> [packed bag pictogram] **Your bag is ready**
> 5 pouches checked last night · 6 refills added
> `[ Take selfie ]` primary brand L

*Flagged*:
> [bag + warning pictogram] **3 things were missing last night**
> · Facial kit · 2 · Wax strips · 1 pack · Rose water · 1
> `Nudge loss` — *If a customer needs these today* · [red card] 1
> `[ I have them now ]` secondary brand L → ticks them, updates live inventory
> `[ Start anyway ]` primary brand L

Note the button order: **proceed is primary, fix is secondary**, because the PRD says three separate times that this never blocks. The warning carries the weight; the button does not.

**2.6 – 2.9 INHERIT, unchanged:** selfie intro sheet (good example + the *Do not click selfies like this* grid) → camera with face oval and *Align the face and logo* → green **Login successful** → back on Home with the coin animation and *EARLY LOGIN AT 7:45 AM*.

One copy fix carried along: the selfie sheet's button is **OK** today, which is banned (`button.md`, lint warning). It becomes **Take selfie**.

---

# FLOW 3 · Lunch

**INHERIT.** The only change is a number: the window to start lunch is **10 minutes, not 5**.

**3.1** Nudge while working: *Lunch break coming up in 30 mins* — INHERIT.

**3.2** Slot ends. Nudge: *Lunch in 10 mins* — the one changed value.

**3.3** She taps **Start lunch**. The window itself is drawn as a shape, because it is time (P5):

```
│        Start lunch within                 │
│           ( 8:42 )                        │  Timer L countdown
│ [ 🍽 Start lunch ]                        │
```

**3.4** The lunch card — INHERIT exactly: tiffin + bottle on the pink stage, Timer ring **green → amber → red**, **End break & start earning**.

**3.5** Ends on tap or automatically at 30 minutes. Ending early confirms — INHERIT, but as a BottomSheet, not the shipped centred dialog.

**3.6** Window missed → the Button is `disabled` **with the reason under it**: *Lunch window closed at 2:10 pm*. Never a dead button (`button.md`). Job overrun is permitted, so this state will be common — it reads as a fact, not a scolding (P6).

---

# FLOW 4 · End the shift

The spine is INHERIT — the shipped order is **Logout → attendance → earnings**. Beauty inserts the bag check between attendance and earnings.

### Steps

**4.1** The map pill: *🕐 Shift ends at 6:00 PM* **[Logout]** — INHERIT. Label becomes **End shift**.

**4.2** She taps it. BottomSheet:
> **End your shift?**
> 5 jobs done · 7 hr 20 min
> `[ End shift ]` primary brand L
> `[ I'm unwell — end early ]` ghost neutral → Flow 4b

**4.3** **Attendance** — Flow 1, embedded as a sheet. INHERIT in position (the shipped *Mark tomorrow's attendance* sheet sits exactly here), INVENT in content (three days). Bottom Button: **Check my bag** — the flow continues, so the button names what comes next.

**4.4** **Bag check** — Flow 5, four steps.

**4.5** Shift ended. Brief moment, ≤ 1.5 s, with sound (P6): *Shift done. See you tomorrow at 10:00 am.*

**4.6** **Today's earnings** — INHERIT, unchanged. ✓ Logout successful, shift/login/logout times, daily earnings, MinG, OT, coins, red cards, bonus progress.

### Flow 4b — emergency logout

**INHERIT**, and the shipped version is the best thing on the board. Keep its structure exactly; change only the surface and the words.

**4b.1** Entry: Profile → *Shift & Availability* → **Emergency logout** (red row). Also reachable from 4.2.

**4b.2** The sheet — keep the **consequence tiles**. Three objects side by side saying what this costs, which is P1 made physical: she reads the price without reading.

```
│ Shift ending in 01h : 36m : 12s          │  countdown pill
│ Ending early will cost you               │  ← was "Emergency logout will lead to"
│  ┌────┐   ┌────┐   ┌────┐                │
│  │red │   │miss│   │ ₹  │                │
│  │card│   │shift   │    │                │
│  └────┘   └────┘   └────┘                │
│  1 red card  Miss full shift  Lose ₹250  │
│                                          │
│ [✓] I'm on my period · 1 left            │  ← ticking REMOVES the red-card tile
│                                          │
│ [ Go back ]                              │
│ [ End shift now ▸ ]                      │  slide to confirm when a red card applies;
└──────────────────────────────────────────┘  plain Button when period leave clears it
```

The shipped interaction is genuinely good and stays: **ticking the leave visibly deletes a consequence.** She sees the penalty disappear rather than being told it will. The slide-to-confirm also stays — P3, a costly action needs a second gesture — and correctly drops to a plain tap once the cost is gone.

Only the words change: *Period Leave (1 Available)* is a form field's name. *I'm on my period · 1 left* is hers.

**4b.3** Confirmation, then the waiver: *No red card this time · We've waived it for you* → **I won't do this again**.

**4b.4** Earnings opens with the heart and **Take care!** — INHERIT, and do not touch it.

---

# FLOW 5 · The bag check

**INVENT**, all of it. The prototype is Lovable and cannot be shared, so this is built from the PRD and the call transcript.

### The model, in one line

Her **full weekly stock lives at home**. Her **bag is a subset**. At logout the app shows only **what she used today** and she refills the bag from home stock. She never sees the 40–50 item list — *"first principally, we can't ask them to give 48 का list."*

### Steps

```
5.0 Why  →  5.1 Refills  →  5.2 Pouches  →  5.3 Spot checks  →  5.4 Missing?  →  5.5 Confirm
   1 tap     4–10 ticks      5 taps          2 answers          only if flagged    1 tap
```

ProgressBar across the top of every step. **No hard gates anywhere.**

**5.0 · Why.** Do not open with a threat.

> [bag pictogram] **Pack your bag for tomorrow**
> About a minute. We'll only ask about what you used today.
> *If something is missing tomorrow, you get a red card.*  ← plain BodyMd, not red
> `[ Start bag check ]`

The red-card warning appears **exactly twice in this whole flow** — here as a sentence, and at 5.5 as a `Nudge loss`. As literally specified it could hit her five times a day, at which point it stops being information (P6: nudges are rare).

**5.1 · Add refills.** The system knows what she consumed.

```
│ Put these back in your bag                │
│ You used them today                       │
│ ┌────────────────────────────────────────┐│
│ │ [✓] [asset] Facial kit          add 2  ││  72 dp checkbox rows
│ │              used 2 today               ││
│ │ [ ] [asset] Wax strips     add 1 pack  ││
│ │ [ ] [asset] Rose water        add 1    ││
│ └────────────────────────────────────────┘│
│              2 of 6 added                  │
│ [ Done adding ]                            │
```

**Ticked = it's in my bag. Unticked = I don't have it.** That is the entire interaction — no per-row report control, no second mode. Reasons are collected **once** at 5.4 instead of eleven times here (P3).

**Quantity is shown, not typed.** The system already knows it is 2, so she confirms rather than enters. Typing eleven numbers at 9 pm on a ₹10k phone fails P8 before it fails anything else.

Button is **never disabled**. Used nothing today → skip this step entirely.

**5.2 · Confirm the five pouches.** One tap each.

```
│ [✓]  Facial & Clean-up         9 items ⌄ │  row toggles = confirm
│ [ ]  Waxing & Threading        7 items ⌄ │  caret = expand, separate small target
│ [ ]  Pedicure & Manicure       6 items ⌄ │
│ [ ]  Hair & Bleach             8 items ⌄ │
│ [ ]  Hygiene & Disposables    11 items ⌄ │
```

Expanding shows the contents read-only — the pouch tick covers them. Order follows her service calendar. **Branded Snabbit kits sit inside the relevant pouch**, never a sixth "kits" group: she packs by the job she is doing, not by who made the box.

**5.3 · Spot checks — ask, don't confirm.** *Tier 3, needs a brief.*

The PRD's stated purpose is *"so blind confirming gets caught."* A tick cannot do that — a tick **is** blind confirming. Only a question she cannot answer without looking can.

```
│        [ rose water asset ]               │
│      Find your rose water                 │
│      How many bottles do you have?        │
│   ( 0 )   ( 1 )   ( 2 )   ( 3+ )          │  Chips, 56 dp
│      [ I can't find it ]                  │  ghost → flags missing
```

Two per session, random **carry** items, rotating daily. Same one tap as a tick, but the answer is checkable against what she should hold — so the check produces data instead of a signature.

Built as **removable**: product has said it may be pulled. It is its own step, feeds nothing else, and deleting it costs one screen and one recap line.

**5.4 · What's missing.** Only if something was left unticked or not found. One sheet, at the end.

> **3 things are missing**
> Each row with a reason as Chips: *Not at home* · *Finished* · *Damaged*
> `[ Add them and carry on ]` secondary → back to 5.1
> `[ Finish bag check ]` primary

**5.4b · Home stock short.** Choosing *Not at home* — the case product called out, where the app said add 8 kits assuming home stock had 8, and it didn't:

> **How many facial kits do you actually have at home?**
> We thought you had 8.
> Chips 0–8
> `[ Tell us ]`

Framed as a question, not an issue report. The number corrects her live inventory and feeds next week's order — which is why she'll answer it honestly.

**5.5 · Final confirmation.** The declaration.

```
│ Is your bag ready for tomorrow?           │
│ ✓ 6 refills added                         │
│ ✓ 5 pouches checked                       │
│ ✓ 2 quick checks done                     │
│ ⚠ 3 things missing                        │
│ ┌ Nudge loss ────────────────────────────┐│
│ │ ⚠ Missing something tomorrow [red] 1   ││
│ └────────────────────────────────────────┘│
│ [ Yes, my bag is ready ]                  │
│ [ Go back and check ]                     │
```

**Confirming completes the step whatever is flagged.** Three separate lines of the PRD say it never blocks logout. Then the success moment, then 4.5.

**Offline:** this flow must work fully offline. She does it in a stairwell at 9 pm. Every tick queues; progress survives a crash.

---

# FLOW 6 · The weekly refill

**INVENT.** This screen is a **bill** — she pays for the stock and it is deducted from her payout.

**6.1** Home card:
> [asset] **Your refill is on the way** · 34 items · arrives Wed 8 Feb ›

**6.2** She taps it → the Weekly refill screen:

```
│ 2 Feb – 8 Feb                             │
│ RPL-2418                                  │  Caption textTertiary — for support
│ ┌────────────────────────────────────────┐│
│ │ [Nothing to do]     Arrives Wed 8 Feb  ││
│ │ ₹1,240                                 ││  Amount lg · DEFAULT tone
│ │ Taken from this month's pay            ││  ← the honesty, in her words
│ │ 34 units · enough for the full week    ││
│ └────────────────────────────────────────┘│
│  ●━━━━●━━━━○━━━━○                          │
│  Placed Packed On the way Delivered        │
│  🚚 Out for delivery · keep your phone     │
│     reachable on 8 Feb                     │
│ [ ✓ Mark received ]                        │
│ [ Report issue ]                           │
│                                            │
│  What is coming        12 products · 34 units │
│  ▸ Facial & Clean-up                  +17  │
│      Facial kit · used 6 of 8   +6   ₹360  │
│  ▸ Waxing & Threading                  +9  │
│ ▶ How your refill works                    │
```

Three decisions worth naming:

- **The cost is `default` tone, not red.** Red would classify a purchase as a penalty. The honesty is the sentence under the number, not the colour.
- **Two counts, both labelled.** *12 products · 34 units* — the PRD is precise that these differ, and neither may ever appear bare.
- **Mark received is live from *On the way*, not *Placed*** — the PRD's two sections disagree, the specific one wins. Before that the Button is disabled **with its reason**: *Available when your refill is on the way*.

**6.3** *Used 6 of 8 kits* is the receipt for last week's bag checks. It shows her **why** she is being sent — and charged for — six.

---

# FLOW 7 · Mark received

**7.1** She taps **Mark received** → BottomSheet:
> **Did everything arrive?**
> 34 items go into your stock.
> ₹1,240 comes out of this month's pay.
> `[ Yes, I have it all ]` primary
> `[ Something's wrong ]` ghost danger → Flow 8

**7.2** Confirm → success moment → tracker moves to **Delivered** → live inventory updates, so tomorrow's bag check already reflects the top-up.

**Nothing is ever marked delivered automatically.** This tap is her signature on a charge.

---

# FLOW 8 · Report an issue

Two different flows in this project. Do not merge them.

**8a — the order arrived wrong.** Three sheets: *What's wrong?* (Wrong item · Something missing · Something damaged) → *Which ones?* (checkbox list) → confirm. Order **freezes** — Tag `warning` *Issue reported* — and does not advance to Delivered until resolved.

**8b — home stock was never there.** Flow 5.4b. A number, not a complaint.

---

# FLOW 9 · Inventory ledger

**9.1** Profile → **Inventory ledger** (ListItem, `receipt` leading).

**9.2** Lands on **Orders**. Three tiles: orders placed · items received all-time · on the way.

**9.3** Order cards, newest first and **expanded by default**, older collapsed. Each: date range, total items, arrival date, status Tag.

**9.4** Expanding shows order ID, when placed, every item with quantity added, how much old stock was used, and price. In-transit orders get **Track this order ›** back to Flow 6.

**9.5** **Live inventory** tab: the five pouches as Accordions, each item *6 of 8*. This is the only place the master list appears — which answers "what am I supposed to be carrying?" without ever putting 48 rows in the logout flow.

---

# FLOW 10 · Scheduled jobs

**10.1** Entry: Profile → **Your jobs**; the first job also surfaces on Home (2.1).

**10.2** Tabs: **Today** | **Tomorrow**. D and D+1 only.

**10.3** Each row: time in a tonal box (leading) · customer name (title) · services (description) · area + distance (meta) · caret.

**10.4** Tapping opens detail: name, start time and duration, MapSnippet with **Show directions**, address with Listen (P4), and the services with per-service time.

**10.5 Amount is never shown** — not on the list, not on the detail, not on either day. The reason is reallocation churn: a job shown at ₹3,000 and then reassigned reads as theft rather than scheduling.

**10.6** Empty → EmptyState `waiting`: *No jobs tomorrow yet · Customers are still booking. Check again this evening.* Not `empty` — the day isn't over, and `waiting` says when to look again (P5).

---

# FLOW 11 · Home & Profile

**INHERIT.** Beauty banner content · Saathi/Help dial per category · a category dimension on nudge, notification and spotlight targeting (backend, no design) · two new Profile rows (*Inventory ledger*, *Your jobs*). Everything else unchanged. Profile visibility default when unset: **visible**.

---

# What this needs from the design system

Closed in the shared system before anything is drawn — never inside this folder.

| Ask | Kind | Blocks |
| --- | --- | --- |
| `package` · `truck` · `tote` · `polygon` | icon → `foundations/icons.md` | 2, 5, 6 |
| Service-area shape (filled + stroked) on a map | change → `map-marker.md` | 2 |
| Delivery tracker — 4 stages she watches, not acts on | change → `stepper.md` | 6 |
| Quantity on a checkable row (*add 2*, *used 6 of 8*) | change → `list-item.md` | 5, 6, 9 |
| A price that is a deduction from pay, outside Earnings | change → `amount.md` | 6, 7 |
| Pouch · kit · packed bag · rest day pictograms | asset → `foundations/assets.md` — illustration layer, **never metallic** | 1, 2, 5, 6 |
| Spot check | Tier 3 brief → `briefs/beauty-shift-lifecycle-spot-check.md` | 5 |

## Vocabulary this project introduces

| Say | Not | Why |
| --- | --- | --- |
| Start shift / End shift | login, logout, punch | *Check in / out* is taken by arriving at a customer's home; *login* is banned as UI language |
| Bag check | inventory update, stock check, audit | It is her bag and she is checking it |
| Refill | restock, replenish | She already uses it |
| Pouch | kit group, section | The physical thing in her bag |
| Week off | leave, holiday | Neither leave (she chose) nor a holiday (nobody works) |
| Your work area | hotspot, micro-market, polygon | Replaces the hotspot row |
| Taken from this month's pay | deduction, adjustment, debit | Says what happens to her money |

## Before drawing in Paper

- [x] Shipped shift-lifecycle screens read and saved — `reads/shift-lifecycle-shipped/`
- [ ] Core gaps closed (icons, assets, three component changes)
- [ ] Spot-check brief written
- [ ] Every colour, size, spacing and radius in Paper is `var(--…)` from the token set
- [ ] Copy checked against `foundations/content.md` § 9 — no *OK*, *Submit*, *Continue*
