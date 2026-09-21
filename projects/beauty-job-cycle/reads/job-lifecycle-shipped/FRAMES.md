# Frame index — Job Lifecycle, as shipped (Househelp)

File *Shift – Job Lifecycle DS* `WEUPV9q19eAqRbkZSBj6OY` · page **Job Lifecycle** `0:1` · section
**`19:18372` "Final Designs DS Compatible"** (12782 × 20092, 78 direct children).

Per `references/SCREENS.md`, *Final Designs DS Compatible* is the shipped state.

Pulled 2026-09-15 by running read-only traversals inside the file (`use_figma`) — `get_metadata` exceeds the
response limit on a board this size. **Cite these IDs in the pattern's *What changes from the shipped screens* table.**

> **Correction to a previously recorded fact.** `projects/beauty-shift-lifecycle/reads/shift-lifecycle-shipped/FRAMES.md`
> records section `138:38552` as living on page *Job Lifecycle* `0:1`. It does not — it is on page
> **"Shift Lifecycle "** (`28:18373`). The file has four pages: `0:1` Job Lifecycle · `28:18373` Shift Lifecycle ·
> `2678:52696` UAT · `2112:60691` BRANDING.

---

## What the screens are built from

**1076 component instances · 47 distinct components** across 70 screen frames. Same conclusion as the shift board:
the shipped app is already component-composed, so reconciliation is renaming and de-duplicating, not introducing
components. The two boards draw on the same library — `Divider`, `Icons`, `Buttons`, `Top nav`, `Building Blocks`,
`Navigation Card`, `Component 19`, `Component 39`, `Component 8` appear on both.

| Component | Uses | Notes |
| --- | --- | --- |
| Divider | 116 | `stat-rating-divider.md` |
| Icons | 95 | Phosphor register |
| Buttons | 85 | `button.md` |
| Component / Home Indicator | 76 | OS chrome — not ours |
| Icon / tasks · Icon / home · Icon / back | 76 each | bottom nav |
| Building Blocks | 56 | generic container → `Card` |
| Top nav | 52 | `header-nav.md` |
| **Metric Card** | 50 | the earnings-line rows on the job card |
| **Job States** | 46 | **the state machine itself — the single most important component on this board** |
| **Earnings Card** | 38 | `patterns/earnings.md` |
| **Progress Buttons** | 35 | `progress-button.md` — the slide/hold to check in |
| **Bottom check-in / Acceptance screen** | 28 | a named composition — the bottom sheet that carries accept and check-in |
| Bottom Sheets | 16 | `bottom-sheet.md` |
| Navigation Card | 14 | the Home shift card (shared with the shift board, where it is used 85×) |
| Coins & Cards - Small 13 · Groups 2 · Chips 1 | 16 | coin / red-card assets |
| Timers | 12 | `timer.md` |
| Widgets | 12 | |
| **Component 19** 12 · **Component 21** 9 · **Component 39** 6 · **Component 17** 1 · **Component 8** 1 | 29 | **unnamed — Tier 0**, same defect as the shift board |
| Rating | 6 | § 7 |
| Button Groups | 6 | |
| Mobile and OTP | 5 | § 3 / § 5 |
| Toast | 5 | `feedback.md` |
| Kavach Card | 4 | `shield-card.md` |
| Banners - 22 | 4 | |
| Colored Tooltip | 4 | `tooltip.md` |
| Maps 3 · Map widget 3 | 6 | `map-marker.md` |
| Message Container 3 · Chat Card 2 | 5 | the chat screens |
| Status Banner 2 · Over the app 2 · Cross 2 · Input field 2 | 8 | |
| Nudge 1 · Attendance 1 · Pay Summary - Icons 1 | 3 | |

---

## Bands, by y

Screens are 393 × 852/854 unless noted. Most frames are named **"Before 12 AM"** — the names carry no meaning, so
each row below is identified by the copy inside it.

### y 455 — check-in card, earnings breakdown
`1:28113` x755 (h947) · `1:28091` x1248 (h947) · `1:28047` x2038 · `1:28069` x2504
> *Check In · Work (1 hour) · Check In by 7:45 PM · Summer Bonus ☀️ (1 hour) · OT (15 min) · You Will Earn ₹145 + ₹5 · Radhika S · HAL Old Airport rd…*

### y 2601–2603 — **the main line**, left to right
`3551:54460` x273 *Searching for jobs nearby · Jyoti Nivas · 300 meters away*
`2:6955` x728 **ACCEPT IN · Accept Job** · `2:6891` x1221 *New Job · If job not accepted*
`4:9038` x1714 · `4:8915` x2207 · `4:9194` x2700 — **Check In** screens
`2:6823` x3193 · `4:9621` x3686 · `4:9885` x4179 · `4:10055` x4672 — **RUNNING LATE** + OTP
`10:8552` x5165 · `6:8405` x5658 (h1268) · `9:8300` x6151 (h1268) · `10:9397` x6644 (h1268) · `10:14008` x7137 ·
`10:13110` x7630 · `10:13325` x8123 · `10:15029` x8616 — **Job In Progress**
`11:18791` x9109 *Ready for next job · Job Completed* · `12:9750` x9602 · `13:10601` x10095 ·
`13:11931` x10613 · `13:12234` x11085 · `13:11607` x11578 — **Job Completed · Rate the customer · Block**

### y 3608 · 5210 — check-in variants
`2:7075` x3193 · `5:11301` x728 · `5:11546` x1212

### y 7024–7026 — searching / home
`13:13879` x728 · `13:14151` x1221 · `13:16176` x1705 *Searching for jobs nearby* ·
`3679:55576` x2219 — **the shift card** (*Tuesday, 7 February · 7:00 AM - 12:00 PM · You can earn ₹800 - ₹1000 · Mark attendance for tomorrow*)

### y 8598 · 9922 — new job, accept / **deny**
`14:10322` x728 · `14:10325` x1221 (**Deny**) · `14:11083` x728 (**Deny**) · `14:11347` x1171 (**Deny**) · `14:11858` x1614

### y 11485–11498 — accept + check-in + tier
`15:12524` x728 · `15:12625` x1171 · `15:12746` x1614 · `2075:52207` x2151 *Gold Tier*

### y 13076 — accept, check-in, **chat**, reach location
`15:13936` x728 · `15:14036` x1171 ·
**`15:13246` x1645 — quick replies** (*Where are you ? · I am waiting at my home. · I have reached · Please give approval*) ·
**`15:13093` x2142 — chat thread** (*Radhika S · Type your message…*) ·
`16:14340` x2639 **CHECK IN BY · Reach Job Location**

### y 14648–14658 — Job In Progress variants + SOS
`19:14852` x728 (h1268) · `19:15020` x1221 *15 mins remaining* · `19:16682` x1714 · `19:15700` x2207 ·
`19:15729` x2700 · `19:17075` x3193 · **`19:16343` x3686 — *No storage available. Clear space to continue.*** ·
`421:17221` x4555 *Shift ends at 6:00PM* · `421:18176` x5034 ·
**`421:15691` x5489 — SOS** (*📞 Call SOS Team · 😊 I am safe, end SOS · Help is on the way. Move to a safe place.*)

### y 16552 — the board's **only** section label
`98:36858` **"Last hour job denied"** (TEXT, 1078 × 178)
`98:36570` x728 · `98:36579` x1164 (**Deny**) · `132:38226` x1657

---

## Exact copy, pulled from the layers

### Acceptance · § 1 / § 2
> **ACCEPT IN** *(countdown)* · **Accept Job** · **Deny** · New Job · *If job not accepted* …
> Work (1 hour) · Check In by 7:45 PM · Summer Bonus ☀️ (1 hour) · OT (15 min) · **You Will Earn ₹145 + ₹5**

### Check-in · § 3
> **Check In** · **CHECK IN BY** · **Reach Job Location** · **RUNNING LATE**
> Radhika S · HAL Old Airport rd, near railway over bridge, · Map
> **Enter OTP to start job** · *Please ask the customer to share the OTP with you* · **No OTP** · **Use OTP instead**

### Job in progress · § 4
> **Job In Progress** · **TIME LEFT** · **15 mins remaining** · **Job extended by 15 min**
> Snabbit Kavach [Activate] · Radhika S · Job Timing · **Complete Job**
> error state: *No storage available. Clear space to continue.*

### Check-out · § 5
> **Complete Job** → **Enter OTP to end job** · *Please ask the customer to share the OTP with you*

### Rating & block · § 7
> **Rate the customer** · **Block Customer?** · *Blocked customer won't be able to book you in future.*
> **Block** · **Unblock** · *The customer is blocked* · *Are you sure you want to block?*
> *Unblock someone to block Radhika S* ← **there is a cap on how many customers she may block**

### Completion · § 8
> **Job Completed** · **You Earned** · **Ready for next job**

---

## What the PRD changes, against what is actually drawn

| PRD § | Shipped design exists? | Evidence |
| --- | --- | --- |
| 1 Acceptance | **Yes** | `2:6955`, `14:11083`, `15:12524`, `98:36570` — needs services + products/quantities added |
| 2 Deallocation & denial | **Partly** | **Deny** button on 5 frames; **no denial-reason screen anywhere in this section** |
| 3 Check-in | **Yes, fully** | incl. OTP, **No OTP** fallback, RUNNING LATE, Reach Job Location |
| 4 Job in progress | **Yes, for the Househelp version** | 15 frames. **No buffer state** — zero hits for "buffer". Extension appears only as a status line, *Job extended by 15 min* (`9:8300`); there is **no extension flow** |
| 5 Check-out | **Yes** | *Enter OTP to end job* (`10:13110`, `10:13325`). Auto-checkout at +30 min is a logic change with no screen |
| 6 Inventory check-in | **No — and neither is what it replaces** | **"What have you done" does not exist anywhere in this section** (0 hits for *what have you done* / *have you done*). Entirely new surface |
| 7 Rating & block | **Yes, fully** | `12:9750`, `13:10601`, `13:11931`, `13:12234`, `13:11607` |
| 8 Completion & earnings | **Yes** | *Job Completed · You Earned* |

---

## Copy that cannot ship as-is

| Shipped string | Rule it breaks |
| --- | --- |
| **Are you sure you want to block?** | *Are you sure* names no outcome; `bottom-sheet.md` + P2 |
| **Summer Bonus ☀️** | emoji as content (P6); `foundations/assets.md` has the bonus asset |
| **OT (15 min)** | jargon — already flagged in `patterns/earnings.md` |
| **📞 Call SOS Team** · **😊 I am safe, end SOS** | emoji as icons — banned outright; Phosphor only |
| **No storage available. Clear space to continue.** | a device error in her words, not the system's; no way out offered (P6) |
| **Unblock someone to block Radhika S** | states the constraint, never the number or the way to it |
| **Type other message…** / **Type your message…** | two strings for one field |

Internal reference only.
