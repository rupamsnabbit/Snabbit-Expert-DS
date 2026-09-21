# The ask — Shift Lifecycle · Beauty Category

## A — A PRD arrived

| | |
| --- | --- |
| From | Product (Snabbit) |
| Received | 2026-09-12 |
| Source | `Shift Lifecycle Beauty Final .pdf` — handed over in chat by Rupam Banik |
| Kind | Written PRD — verbatim below |
| Version | v1 |

The body below is the PRD **as received**. It is evidence, like a Figma screen or a Mobbin flow: it says what the business wants and when. It is not a design, and nothing in it overrides `principles/` or `tokens/`.

Do not edit the body — not the wording, not the structure, not the parts that are wrong. Disagreements go in `SCOPE.md` → *Open questions*. A revision is appended below as a new version with its own header; the diff between versions is often the most useful thing in the folder.

---

# Shift Lifecycle - Beauty Category

## Summary

Beauty goes live on the same Shift Lifecycle backbone built for Househelp: Attendance → Login → Job(s) → Lunch → Logout. The state machine is unchanged. What's different for a Beauty expert is that she carries a large, multi-service inventory kit that has to be verified and replenished daily, and her locations need tighter verification — those two differences drive everything below.

## 1. Attendance

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Attendance for next 3 days | New (Beauty only) | ● Expert can view and mark attendance (Available / Unavailable / Leave) independently for D+1, D+2, and D+3.<br>● D+2 and D+3 are freely editable with no penalty.<br>● Househelp is unaffected — attendance stays D+1 only. |
| Update attendance for D+1 | Existing | ● Editing after the existing cutoff triggers the existing penalty logic, unchanged.<br>● Once D+2 or D+3 rolls forward and becomes D+1, this same cutoff/penalty rule applies to it. |
| No-show and Late Login states | Existing | State definitions and triggers carry over as-is, keyed off D+1 only. |
| Weekoff State | New | On days of weekoff, show the state and handle the shift cases. |
| Change implementation | - | |

### Flow

1. Expert opens Attendance and sees three day-cards: D+1, D+2, D+3.
2. Sets status per day — D+2/D+3 save immediately with no penalty check.
3. Editing D+1 before cutoff saves silently; after cutoff, triggers the existing penalty modal.
4. Next day, D+2 becomes D+1 and picks up the standard cutoff window.

## 2. Login Screen

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Location check for login | New (Beauty only) | ● Replaces hotspot-based location check with a map showing a polygon boundary; expert must be inside it to proceed.<br>● Househelp keeps the existing hotspot check, unaffected.<br>● If she's outside the boundary, the existing AWOL flow (already live for Househelp) applies unchanged — no new failure state to build. |
| Scheduled job visibility | New | ● Login screen shows the day's first job: time and service(s).<br>● Amount is not shown. |
| Inventory check-in | New | ● Reflects the status of the Inventory Update (Section 5) completed at the prior logout, confirming she's stocked for today's shift.<br>● If flagged incomplete, she sees a warning that a red card may follow if it's later discovered she didn't actually have the inventory (see Section 5) — this does not block her from proceeding to selfie.<br>● She can add/flag missing items here before continuing. |
| Selfie flow | Existing | Unchanged. |

### Flow

1. Expert opens the app and sees today's first job (time + service, no amount).
2. Taps login/start-shift.
3. Map opens, showing her position against the required boundary. Outside boundary → existing AWOL flow, unchanged.
4. Once inside the boundary, she sees her inventory check-in status (carried over from last logout).
5. If flagged incomplete, she's shown the red-card-risk warning and can add/flag what's missing.
6. Inventory check-in step closes.
7. Existing selfie flow runs and closes.
8. Login complete, shift starts.

## 3. Lunch

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Buffer time to start lunch | New (Beauty only) | Buffer increases from 5 to 10 minutes. Househelp is unaffected and stays at 5. |
| Lunch duration | Existing | Stays at 30 minutes, same screen, unchanged. |

### Flow

1. Expert taps "Start Lunch" any time within the 10-minute window after her slot ends.
2. Existing 30-minute lunch screen and countdown, unchanged.
3. Lunch ends on tap, or automatically at 30 minutes.

## 4. Logout Flow

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Emergency logout | Existing | Emergency logout option available, with 1 menstrual leave — unchanged. |
| Next-3-days attendance prompt | Existing | Same prompt as today; now reflects the 3-day capability from Section 1 (D+1/D+2/D+3), Beauty only. |
| Inventory update on logout | New | ● Logout runs the full Inventory Update (Section 5) before completing, replenishing/verifying stock for the next day's shift.<br>● A missing/incomplete item never blocks logout from completing — see Section 5. |
| Daily earnings page | Existing | Unchanged. |

### Flow

1. Expert taps Logout.
2. Emergency logout option (1 menstrual leave) shown if applicable.
3. Prompted to confirm attendance for D+1/D+2/D+3.
4. Inventory Update (Section 5) runs; she reaches final confirmation regardless of whether any items are flagged missing.
5. Logout completes.
6. Daily earnings page shown, updated for the day.

## 5. Inventory Update

Runs as part of Logout (Section 4), verifying and replenishing stock for the next day's shift.

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Pouch structure | New | ● Items grouped into 5 service pouches matching her calendar: Facial & Clean-up, Waxing & Threading, Pedicure & Manicure, Hair & Bleach, Hygiene & Disposables.<br>● Branded Snabbit kits sit inside their relevant service pouch, not a separate "kits" group.<br>● Each item displays quantity (e.g. "8 kits", "1 pack of 6"), not just presence. |
| Restock items | New | ● 2–3 items per service theme, consumed daily and must be physically replenished.<br>● Require item-level ticks - cannot be confirmed via the pouch-level tap. |
| Carry items | New | ● Items that live permanently in the bag.<br>● Confirmed with a single tap per pouch, not item-by-item. |
| Spot checks | New | ● 2 rotating spot checks per session on random carry items the expert must physically locate and confirm.<br>● Selection rotates daily so blind confirming gets caught. |
| Final confirmation | New | ● Red card risk warning is stated upfront, before final confirmation.<br>● Missing items surface in a summary sheet at the end rather than blocking mid-flow.<br>● Confirming - even with items flagged missing completes the step; it never blocks logout. |
| Red card trigger | New | ● Not issued automatically at checklist confirmation.<br>● If it's discovered afterward (e.g. during a job, or an audit) that the expert did not actually have required inventory, a red card is issued the next day. |
| Replenishment feed | New | ● Ticked restock quantities feed the weekly replenishment order.<br>● Pouch/item master list (contents, restock-vs-carry classification, quantities) is owned and maintained by the Category/Catalog team. |

### Flow

1. Add today's refills (item-level ticks, restock items only).
2. Confirm each of the 5 pouches with one tap each.
3. Complete 2 rotating spot checks on random carry items.
4. Final confirmation, red-card-risk warning stated up front.

Why it holds up: effort scales with what actually changes daily, not total inventory size; spot checks catch blind confirming without re-checking everything; ticked restock quantities feed the replenishment order automatically.

Block the time in case of manual deallocation.

## 6. Home Page & Profile

Home Page and Profile keep the same layout and structure as Househelp. What changes for Beauty: a few sections get Beauty-specific content (like banners), and some settings need a "category" option added so Beauty and Househelp can be configured separately.

### Home Page

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Top app bar | Existing | Same bar on every screen: menu, SOS, Saathi/Help, coins, notification count. Saathi and Help now dial different numbers depending on category - Beauty and Househelp each get their own. |
| Primary action panel (pink) / Map | Existing | Shows one action at a time - finding a job, login, logout, job-waiting, or action-required. Same for Beauty as Househelp, no changes. |
| Banner carousel | New content | Beauty gets its own set of banners. The carousel already supports this by category - just new banner content, no new engineering needed. |
| Contextual nudges | Existing | Beauty and Househelp should be able to run different nudges - needs a category option added to its targeting. |
| Seva nudge & map | Existing | No changes for Beauty. |
| Bottom navigation | Existing | No changes for Beauty. |
| Notifications | Existing | Should support different content for Beauty and Househelp. |

### Profile Page

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Category visibility | New | Every profile item can be shown or hidden separately for Beauty. What the default should be, when nobody's set it explicitly, isn't decided yet. |
| Profile header | Existing | No changes for Beauty. |
| Spotlight nudge | Existing | Beauty should be able to run its own spotlight nudge - needs a category option added to its targeting. Used for PAN and bank details update. |
| Earnings | Existing | No changes for Beauty. |
| Shift & Availability | Existing | No changes for Beauty. |
| Benefits & Perks - Insurance | Existing | Same policy and logic as Househelp. |
| Benefits & Perks - Refer & Earn, Seva, Store | Existing | No changes for Beauty. Referral campaigns will be different for beauty and merch store items can be different. |
| Account & Settings | Existing | No changes for Beauty. |

## 7. Auto Replenishment

Builds on the replenishment feed from Section 5. Every week, the system compares what an expert should be carrying against her current live inventory, and auto-places an order to be delivered on weekoff day for just the shortfall. Two places she sees this: a summary on the homepage, and full detail on her profile.

### Weekly Replenishment screen (opened from the homepage)

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Order header | New | Shows the week range (e.g. "Week 2 Feb – 8 Feb") and an order ID (e.g. "RPL-2418"). |
| Status summary | New | Shows a status tag ("Nothing to do" when there's no action pending), the expected arrival date, total unit count, and a one-line note (e.g. "enough to fill your bag for the full week") along with product cost. |
| Order tracker | New | Four stages shown as a stepper: Placed → Packed → On the way → Delivered. The current stage is highlighted; later stages stay greyed out until reached. |
| Status banner | New | One line tied to the current stage - e.g. "Out for delivery · keep your phone reachable on [date]." |
| Action buttons | New | "Mark received" and "Report issue" - both available once the order is placed. |
| Item breakdown | New | Grouped by service pouch (only pouches with something to replenish this week are shown). Each pouch row shows how many units are coming in that pouch (e.g. "+17") and expands to list each item, with how much of the old stock she used (e.g. "Used 6 of 8 kits") and how many new ones are coming (e.g. "+6"). The total unit count at the top is the sum across all pouches; the item count next to "What is coming" is the number of distinct products, not units. We have to mention the price of each also. |
| How it works | New | A short explainer video, lower on the screen, describing the replenishment logic in plain terms for the expert. |

#### Flow

1. Expert taps the replenishment notice on her homepage.
2. Sees the order header, current status, and arrival date at the top.
3. Sees the four-stage tracker with a plain-language status banner underneath.
4. Scrolls down to "What is coming" - expands any pouch to see exactly what's being topped up and how much of the old stock she'd used.
5. Once the order is in hand, she taps "Mark received" (see Mark Receipt Flow below); if something's wrong, she taps "Report issue" instead.

### Mark Receipt Flow

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Mark received | New | ● Available once the order reaches "On the way".<br>● Tapping it is what moves the order to "Delivered" — delivery is never marked automatically, it always needs her confirmation.<br>● Once confirmed, the ordered quantities are added to her live inventory, so the next day's Inventory Update (Section 5) reflects the top-up. |
| Report issue instead | New | If she taps "Report issue" (wrong item, missing item, damaged), the order stays in its current status and doesn't move to "Delivered" until it's resolved. |

#### Flow

1. Order physically reaches her.
2. She opens the Weekly Replenishment screen (or the Inventory Ledger) and taps "Mark received".
3. Order moves to "Delivered"; her live inventory updates immediately with the new quantities.
4. If instead she taps "Report issue", she's taken to the issue flow, and the order's status doesn't change until that's sorted out.

### Inventory Ledger (Profile page)

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Ledger tabs | New | Two tabs: "Orders" and "Live Inventory". |
| Summary stats | New | Three tiles at the top: total orders placed, total items received all-time, and how many are currently on the way. |
| Order list | New | Each order shown as a card: date range, total items, arrival date, and a status tag (e.g. "Out for delivery", "Delivered"). Newest order first, expanded by default; older ones collapsed. |
| Order detail | New | Expanding an order shows its order ID and when it was placed, then every item in it with quantity added and how much of the old stock was used and price. In-transit orders show a "Track this order" link back to the Weekly Replenishment screen. |

#### Flow

1. Expert opens Profile → Inventory ledger.
2. Lands on "Orders", sees her 3 summary stats at the top.
3. Scrolls her orders, newest first; taps any order to expand or collapse its items.
4. Taps "Track this order" on one still in transit to jump to its Weekly Replenishment screen.
5. Switches to "Items Received" to see her full received-items history.

## 8. Scheduled Jobs Visibility

Beauty-only - Househelp doesn't have this today and it's not planned for them either.

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Visibility window | New (Beauty only) | Expert can see her scheduled jobs for D (today) and D+1 (tomorrow) only - nothing further ahead. |
| Details shown | New (Beauty only) | Customer name, customer address, a map link to track/navigate to the location, and the services booked. |
| Details hidden | New (Beauty only) | Amount/payout for the job is never shown, on either day. |
| Househelp | No change | Not available now, and not planned for the future. |

### Flow

1. Expert opens her job schedule.
2. Sees a Today / Tomorrow split — her jobs for D and D+1 only, in order.
3. Each job in the list shows the customer's name, address, and the service(s) booked.
4. Tapping a job opens its detail, including a tappable map link to navigate to the customer.
5. Amount is never shown, on the list or the detail view, for either day.

---

# v1.1 — Clarification call, verbatim transcript

| | |
| --- | --- |
| From | Product (Speaker 1) with Design (Speaker 2 — Rupam Banik) |
| Captured | 2026-09-12 |
| Kind | Call transcript, verbatim — clarifies and extends v1 |
| Status | Evidence. Not edited. Where it contradicts v1, the contradiction is logged in `SCOPE.md` → *Open questions*, not resolved here. |

This call answers most of the blocking questions raised against v1 and adds material v1 does not cover at all — most importantly that **the expert pays for her replenishment** (deducted from payout), that **weekoff is a mandatory unpaid day**, and a whole **job cycle** (job alert line items, product needs at check-in, a setup timer, add-on services, job-end inventory reconciliation) that has its own PRD not yet handed over.

---

Speaker 1: In shift lifecycle, one of the main things is your— we will start taking attendance for next 3 days. Today what we take is कि आप कल का अटेंडेंस बता दें। Now we have to take कि next 3 days का बताओ, जिसमें first 2 days का उसने कल ही दे दिया होगा।

Speaker 1: Hmm, है ना? But we have to make this flow in a very simplest way possible.

Speaker 2: Okay.

Speaker 1: If you even see any existing screen of multi-attendance, don't refer to it. Think first principally and make the most simple way that you can make.

Speaker 1: ठीक है? This is the first thing. There's the no-show, late logins— every state will remain the same.

Speaker 1: One state will be week-off state. So basically, in househeld we don't give them any leave.

Speaker 1: But in beauty, technically, we will give them one week-off. Basically, week-off means कि आपको 1 दिन का छुट्टी है, where we will not pay you, but you— you— you can take the leave.

Speaker 2: We won't pay you for it.

Speaker 1: It will be not counted in your bonuses or anywhere. The app it doesn't.

Speaker 2: So this is including Saturday-Sunday?

Speaker 1: No, no. It's only between Monday to Thursday. An expert has to take it.

Speaker 1: Because in beauty, if they work 7 days continuously, it affects on their representation, presentation, and since it is a premium service, we don't want to risk that.

Speaker 2: So in this Monday to Thursday, I can take a leave every week?

Speaker 1: One— one week you will decide on go-live, which will be constant, and in the upcoming weeks, every day— like every Wednesday for example— will be a week-off. Okay? In the login now, right now, what we do is we show them the hotspot.

Speaker 1: You— you understand all these screens, no?

Speaker 2: Mm-hmm.

Speaker 1: Sorry, broke. Right now we show them a hotspot. Now there is a 3.5 km radius where expert is traveling in a mobility.

Speaker 1: So what we are doing is, there is no hotspot or anything. As soon as they enter the boundary of that micro-market, they can log in from anywhere.

Speaker 2: Okay, okay.

Speaker 1: So instead of showing them the information of the location, now we have to show them a boundary in the login.

Speaker 2: Okay.

Speaker 1: That now you can log in to, for them to understand where they are.

Speaker 2: So if I'm outside this boundary—

Speaker 1: You can't log in.

Speaker 2: I can't log in. Only when I'm inside that boundary I can log in.

Speaker 1: So basically you are telling them the serviceable area, sort of. Cool.

Speaker 2: Yeah. ठीक है।

Speaker 1: Another big change for login is scheduled jobs.

Speaker 2: Hmm.

Speaker 1: आजकल हम househelp को नहीं दिखाते। हम beauty में दिखाना चाहते हैं, so that they can directly go to the customer's house. They can be better planned because now they have vehicles to go back to the hub.

Speaker 1: So they have one hub. Instead of a hotspot, they have one place where they can sit properly.

Speaker 1: To if they decide that, okay, चलो मैं hub चली जाती हूँ, it will take them minimum 10-15 minutes to go. And by chance, in 25 minutes we have already taken a booking for her.

Speaker 1: She has to come back again. Which is inefficient.

Speaker 1: So we are planning कि initially we will show— start showing her scheduled jobs.

Speaker 2: Okay.

Speaker 1: Now there will be a scheduled jobs column in the profile page or anywhere. But in during your login space, we can show you your first job, if it is there.

Speaker 2: Okay.

Speaker 1: So that you directly go to that space. Fair?

Speaker 2: ठीक है।

Speaker 1: In this, one of the constraints that can come is कि basically, I allotted you yesterday. Today my system says that I am allotting dear. That job.

Speaker 1: You can be pissed off that my 3,000 rupees job has gone to someone else. So first we will not show the amount.

Speaker 1: We will start showing them the services. But if we see that this is a backlash coming from them, we will stop showing the services and amount.

Speaker 2: Oh.

Speaker 1: But this is a later on thing. I am telling you the holistic view of it.

Speaker 2: Okay.

Speaker 1: Now comes inventory check-in. Okay? So post you log out, no?

Speaker 1: We have to ensure that every day your bag is fully— so suppose there is an inventory system now. On a weekly basis, I will send you full inventory, which will include 20 facial kits, 10 this XYZ things.

Speaker 2: Weekly?

Speaker 1: Weekly. Weekly I will replenish your things. On a daily basis, there should be X things present on your bag.

Speaker 1: Like out of those 20, minimum 2 facial kits should be there on your bag.

Speaker 2: Okay.

Speaker 1: Because that's how marketplace will look into your data. So every day post log out, I will show her a screen. Post log out, post attendance mark, post earnings, I will show her a screen.

Speaker 1: Please ensure, please mark your daily bag check-in so that she can pack her bags for tomorrow, for tomorrow, कि basically मेरे पास सारा सामान है। So उसके लिए मैंने एक prototype बनाया था।

Speaker 1: So first principally, if I think, okay, there is a 40-50 items का line of— line of list, ठीक है? They will never be like taking 40 items.

Speaker 1: Nobody looks at it.

Speaker 2: Right, right.

Speaker 1: But today if I have used 4 or 5 items, those 4 or 5 items I will remember to refill on my bag. So I will first focus on add refills. कि these items were used on your last shift.

Speaker 1: Please add this and confirm this.

Speaker 2: ठीक है।

Speaker 1: मैं आपको पहले स्क्रीन का structure बना रही हूँ। Design आप देखिए।

Speaker 2: हाँ, हाँ, हाँ।

Speaker 1: तो हमने ऐसे-ऐसे कर दिया। ठीक है? और ये अभी ज्यादा दिख रहा है।

Speaker 1: इतने सारे भी किट्स होंगे नहीं।

Speaker 2: You are saying कि all of these के लिए I will need refills. This is every day.

Speaker 1: You need to add this in your bag. आज अगर आपने 5 चीजें use करी हैं, तो वो 5 चीजों की list मैं यहाँ पे दिखाऊँगी आपको, ताकि आप वो 5 चीजें वापस से bag में डाल सकें।

Speaker 2: नहीं, नहीं, नहीं। समझा नहीं। So let's say I have finished.

Speaker 2: This is happening at when I log out, right? In end of the day.

Speaker 2: In my bag, I let's say I have 40 items. In that, 10 items I have used in 5 houses.

Speaker 2: उस 10 items में, like the quantity is less. So I'm coming here and I'm saying—

Speaker 1: So our goal here is that to ensure that expert always has that 48 items. Correct?

Speaker 2: हाँ।

Speaker 1: To do that, first principally, if they have used 10 items, the best way to add value to for them is to show them that these 10 values you have used today, add them. So that's—

Speaker 2: So that 10 items I have to remember.

Speaker 1: Add refill.

Speaker 2: हाँ, add refill. ठीक है।

Speaker 1: ठीक है? Then they— they'll have a very big bag. Then we will say, you have 5 pouches.

Speaker 1: For each 5 pouches, check if you have all the things.

Speaker 1: ठीक है? Now they might or might not check this. But if they want to go deeper, they can even see the list.

Speaker 2: ठीक है।

Speaker 1: ठीक है? Then they will say कि नहीं, नहीं, मैंने सब— मेरे पास सब है। जो 10 चीजें मैंने use करी थीं, वो डाल दीं।

Speaker 1: वो अपने आप—

Speaker 2: This is telling— taking the input कि ये सब है अभी।

Speaker 1: हाँ।

Speaker 2: ये सब है।

Speaker 1: This is to ensure that they are reminded about the criticality of this. This is to ensure that we are able to achieve our goal.

Speaker 1: ठीक है? First principally, we can't ask them to give 48 का list.

Speaker 2: Yeah, yeah, yeah.

Speaker 1: ठीक है? And at the same time, I will give her one warning that if any item is missing tomorrow, then I will give you an red card.

Speaker 2: How are you checking this item? Like if it's missing tomorrow or not?

Speaker 1: No, no. So basically, whenever they are going for jobs, they will contact us कि मेरे पास inventory नहीं है। On all those cases.

Speaker 1: This is more immediately you can think कि I am first threatening them, then I will think of a solution of exact logic.

Speaker 1: ठीक है? Then we will build some random spot checks। कि ये 2 item check करो यार।

Speaker 1: रोज़ अलग-अलग आएगी 2 item।

Speaker 1: This is something जो open है, but it could work or it could not work. Learning है।

Speaker 1: हटा देंगे।

Speaker 1: ठीक है? तो आपका bag ready हो गया। मैं assume करूँगी कि अब आपने confirmation दे दिया कि आपके bag में सब है।

Speaker 1: यहाँ पे—

Speaker 2: But ये refill, if I just take 10 items, तो ये कब, like when am I going to get refill? Like—

Speaker 1: जब घर जाओगे, आपके घर में पूरा inventory पड़ा होगा। Expert के घर में।

Speaker 2: हाँ।

Speaker 1: तो वो अपने घर से अपने bag में refill करेगी ना।

Speaker 2: Oh, you're saying that refill? I thought अभी एक, let's say, some lotion is half empty, then what?

Speaker 1: So basically, we have packets.

Speaker 2: Okay.

Speaker 1: So if they have used 2 packets of facial today, so they have to add 2 more packets to their bag for tomorrow's service.

Speaker 2: Okay, okay. Got it, got it. I was thinking कि you are, like, we will— अच्छा, got it, got it.

Speaker 1: In this, you have to create one flow of report and issue. Where I have said कि 8 kits add करो, assuming कि उसके घर में 8 kits हैं। But for some reason नहीं हैं।

Speaker 1: She has to report that। अभी के लिए एक button डाल के रखना, उसका exact flow सोच के।

Speaker 1: ठीक है? ये वाला एक flow बना के रखना। तो आपका यहाँ पे मैंने इसका थोड़ा understanding भी लिखा हुआ है।

Speaker 2: वो पूरा flow?

Speaker 1: हाँ। Shift वाला। Inventory वाला।

Speaker 1: Restock items, pouches, final confirmation। Prototype share करके रखूँगी।

Speaker 1: Prototype से refer करना best way लगेगा।

Speaker 1: ठीक है?

Speaker 2: Done.

Speaker 1: Home page और profile में ज्यादा बड़े changes नहीं होंगे। ये mostly from tech understanding है। अभी के लिए similar ही रखेंगे home page में।

Speaker 1: आपके banners beauty के हो जाएंगे। आपके entry points जो हैं, वो अंदर जाके beauty का खुलना चाहिए।

Speaker 1: वो सारे changes हो गए। I don't think so a lot for you.

Speaker 1: I will auto replenish my— So the model that we are working backwards of is कि आज के दिन में मैं क्या करूँगी? कि मैं हर 7th day पे देखूँगी, 2 days before week-off, कि इस बंदे के पास 10 item होनी चाहिए थीं, इसकी 8 use हो गई हैं।

Speaker 1: So basically, the weekly level पे the item you should have, and the daily level पे the consumption that you had with your live inventory. Just difference between that.

Speaker 1: Our system will auto place order for them.

Speaker 2: Oh, okay. Okay, okay, okay.

Speaker 1: So I will automatically estimate— I will automatically calculate कि 10 items are missing, which Rupam needs for next week's inventory. I have placed an order for it.

Speaker 1: ठीक है? So for that, how the flow will look like is, on the home page there will be sub-nudge that you are weekly replenishing—

Speaker 2: Tell me the trigger again for ये। How is it getting triggered? अभी—

Speaker 1: अभी it can be triggered in two ways. Either manually somebody in business team is placing order for them, or automatically via tech we are placing order for them.

Speaker 2: So when— so system will basically detect कि अभी my— like this expert का—

Speaker 1: Every 7th day they will return. So this is a weekly thing.

Speaker 2: So if you're auto placing order, then isn't there a chance कि I will just steal it and I will sell it for a higher price somewhere else?

Speaker 1: No. Because you are paying for each product. We are auto placing order for you, but end of the month, in the payoff, I will deduct it.

Speaker 2: Got it. ठीक है।

Speaker 1: This is a rule that you should have these many items with you. ठीक है? For that, I will show one nudge on the home.

Speaker 1: Something like weekly replenishment placed, or something like that. You— sorry.

Speaker 1: You open this, and you can see placed, packed, on the way or delivered, that your refill is arriving. This is a very basic prompt.

Speaker 1: ठीक है? You can mark that you have received the items, or you can say there is a report and issue. You have to mark the pricing also.

Speaker 1: Pricing is something I have marked. But pricing is a very important thing for them, because we are going to deduct that money.

Speaker 1: How it works, no? We will add a video so that they can understand, in case they are confused.

Speaker 1: We have to make one inventory ledger which will show them कि ये-ये orders place हुए थे past में, ये delivered हुए थे। और inventory ledger का entry point हमें यहाँ पे डालना पड़ेगा, देखो।

Speaker 2: समझ गया। But they'll understand all this क्या, bro?

Speaker 1: They are very educated. मतलब, we have to teach them. They have done this in UC.

Speaker 1: But UC does not do auto replenishment. This is the first time we are doing it.

Speaker 1: तो उसका भी मैंने कुछ-कुछ डाला है यहाँ पे। Flows में देख लेना, एक बार पढ़ लेना थोड़ा understanding के लिए।

Speaker 1: Inventory—

Speaker 2: क्या है कि वो mark receipt is that only? What is it?

Speaker 1: हाँ, that mark receipt वाला flow। On clicking mark receipt, what will happen?

Speaker 1: Scheduled jobs visibility एक आपको profile में भी बनानी पड़ेगी next week के लिए। तो उसके लिए मैंने बस थोड़ा सा अलग से लिख दिया है।

Speaker 1: Nothing else। ये आपका पूरा shift ledger है।

Speaker 1: अब मैं एक बार job भी समझा देती हूँ। Job कैसा होगा?

Speaker 1: आपके पास beauty की एक नई job दिखेगी। उसी screen पे आपके लिए line items change हो जाएंगी।

Speaker 2: Correct, yes.

Speaker 1: And you have to start showing them basically their services. इधर हमें time भी दिखाना पड़ेगा हर service का। And your this—

Speaker 2: Time? क्या time? Like how long it takes to do?

Speaker 1: Yes. हाँ। So अभी हम time backwards ही जाएंगे, but हम ऐसे करेंगे, हम calculate करेंगे कि अगर हमारे system में हमें maximum 60 minutes का बोल रखा है, तो हम वैसे calculate करेंगे।

Speaker 1: Although अगर job overrun हो गई, तो हम होने देंगे। हम ourself की तरह रोकेंगे नहीं एकदम से।

Speaker 1: But हमें maths वैसे करने पड़ेंगे। Except things वगैरह ऐसे ही रहेगा, same.

Speaker 1: ठीक है? फिर उसके बाद आप check-in screen पे उसको दिखाओगे कि आपने ये services book करी थीं, ये products needed हैं। ताकि अगर उसके पास कुछ नहीं है, वो यहीं पे raise करता है अभी।

Speaker 2: एक मिनट। Services booked, product needed। So consumer side में one customer can book multiple services।

Speaker 1: Yes.

Speaker 2: Okay. Okay. And these are the services, and what are the— ये products needed also?

Speaker 2: It's coming like from the backend?

Speaker 1: Yeah.

Speaker 2: Okay.

Speaker 1: ठीक है? ये check-in। इसके बाद मैंने एक flow नहीं डाला यहाँ पे, but you have to add a flow of 5 मिनट timer, where you will say, please set up your stuff.

Speaker 1: They will open their bag and all those things. And then they will see this.

Speaker 1: Today, add-on happens on a time level.

Speaker 2: हाँ, हाँ, हाँ।

Speaker 1: But there will be a service that will be added on. Time will also get added because of the service.

Speaker 2: ठीक है।

Speaker 1: Now, they end a job. Today we ask them what they have done. Correct?

Speaker 1: Now we have to ensure that we are taking an inventory check-in. Suppose, for a person who does not like oil in their head, their oil has never been used.

Speaker 2: Correct.

Speaker 1: ठीक है? So— but I will have one system where they will tell me, by default, कितना use होना चाहिए था। I will say, yes, use does expect it, which will be majority of the cases.

Speaker 1: But in case of something was different, I will say, मेरी wax use नहीं हुई है, product ran out, या client asked less।

Speaker 2: But I mean, best cases, they will most probably be like, हाँ, I just used whatever. But let's say I didn't use।

Speaker 2: क्या हो रहा है, bro? He's leaving क्या?

Speaker 1: मेरे से तो मिला ही नहीं तू। Same day हूँ। जा रहा है तू बस अब?

Speaker 1: हो गया? Launch करके बताऊँगी तेरे को location वगैरह।

Speaker 1: Permission देगी वो कि जेटपैड पे बुला के।

Speaker 2: क्या bro, is he going home or is he going— is he leaving?

Speaker 1: He's leaving.

Speaker 1: चलो, ये आप—

Speaker 2: हाँ, नहीं, नहीं, I'm saying, इसका use case क्या है? Why are we doing this?

Speaker 1: Because marketplace is assuming कि उसके पास 10 wax strips होगी। But एक मोटी उस पे, female पे, अगर 3 wax strip लग गईं, तो आगे की job वो कर नहीं पाएगी।

Speaker 2: So just take an extra stuff? No, अगर if I have used— if I have not used the stuff, why are you taking that? Like if I have used, like we can just ask?

Speaker 1: अगर not used the stuff, तो I can take more instant bookings for you, no?

Speaker 2: No, because this state will come after I am like packed my stuff, and when I am like getting away, मतलब customer's house से when I am leaving, that state is this, ना? तो वहाँ पे will they do this?

Speaker 1: Yeah, they have to. Otherwise, we will consider कि एक ही use हुआ है। फिर वो बाद में आएगी कि मेरे तो 2 use हो गए थे, क्योंकि product cost तो वो दे रही है ना हमें।

Speaker 2: Can you go back? पीछे जाओ।

Speaker 2: ODP to start, checklist।

Speaker 3: PM नहीं आएगी तो कैसे चलेगा?

Speaker 1: Time बताओ।

Speaker 1: अरे, बताया था ना कि काट दो, उसमें बंद हो जाएगा। वो सब नहीं।

Speaker 1: नहीं, कुछ बोलेंगे, तामझाम।

Speaker 2: हाँ, हाँ, wait।

Speaker 1: इसको और अच्छा design करना है, ये तो बहुत ही shitty design है।

Speaker 2: ओह, समझ गया, ठीक है। But—

Speaker 1: I will already know कि उसका कितना use होना चाहिए था एक जगह।

Speaker 2: So I have to go through all of these, right? If I use like some 30 products, I have to spend time and go through all of this and— But इसको याद कैसे रहेगा?

Speaker 1: अरे, याद होगा कि अरे यार, एक— basically अगर एक kit है, मेरी एक extra kit use हो गई है disposable की, because पहली वाली kit खराब थी।

Speaker 2: नहीं, ये— ये best case होगा कि ये worst case है, like this many products। ये तो बहुत सारे products हैं।

Speaker 1: हाँ, अब इसमें एक kit तो होगी, और ये सब चीजें तो होगी।

Speaker 2: ठीक है। So used as expected. If not— if I don't use, then I tell, did I use less or did I use more?

Speaker 2: ठीक है।

Speaker 1: Same thing. तो पूरा job यही है। इसकी भी मैंने PID लिख दी है।

Speaker 1: अरे यार।

Speaker 2: Crazy boat, yeah, crazy। वो cooking हाँ, beauty में। इसके बाद क्या है?

Speaker 2: In beauty? That's it, ना?

Speaker 1: Many payouts। But I think it's a very interesting job, ना? इसलिए मैंने prototypes बनाए हैं।

Speaker 1: Can you tell me if you can access this? कैसे दूँ मैं?

Speaker 1: Publish करूँ?

Speaker 2: Publish करके you will have a link। हाँ, this link shared with me।

Speaker 1: Start thinking on this, because I think it's mostly inventory वाला part थोड़ा सोचने का होगा। Rest all are existing screens, and multi-layer tendency is also something that you are looking for।

Speaker 2: ठीक है।

Speaker 1: I am sending you। मैं एक proper thread भी बना दूँगी इसकी। But एक बार बताओ, ये access कर पा रहे हो?

Speaker 1: But okay, no? For you, the requirements, the understanding, the workflow।

Speaker 2: I have no choice, bro. I have no choice, ना।

Speaker 1: In terms of, like, if this helps you or you are still confused—

Speaker 2: No, no, I understood what you guys are trying to do. How it works? नहीं, नहीं, रुको।

Speaker 2: हाँ, works, works।

Speaker 2: और दो थे, ना? नहीं, सब इसमें ही है।

Speaker 1: Weekly replenishment, ये job आ गया, और profile पे जाओगे, वहाँ पे ledger।

Speaker 2: वो ledger आएगा। ठीक है।

Speaker 2: ठीक है, bro। और PID you share, ना?

Speaker 1: PID I'll share. In launch beauty channel, no? I will add all the three things.

Speaker 1: You are there, ना?
