# PRD — Job Lifecycle · Beauty Category

Source: `Job Lifecycle – Beauty Category.pdf`, supplied by Rupam Banik 2026-09-15 (5 pages, 8 sections).
Transcribed **verbatim**. Not edited — disagreements go to `SCOPE.md` → *Open questions*.

Companion document: *Shift Lifecycle – Beauty Category* (`projects/beauty-shift-lifecycle/prd.md`). This PRD
cross-references it once, in § 6, for Auto Replenishment.

---

## Summary

This covers the changes needed in the existing Job Lifecycle, built for Househelp, to support the new Beauty
category. Most of the flow - job acceptance, deallocation, check-in, check-out, customer rating, and completion
earnings is reused exactly as it works today. What's new for Beauty is the Job In Progress state (buffer time,
inventory tracking, and paid extensions) and the Inventory Check-in flow, which replaces "What have you done"
for Beauty only, Househelp keeps that flow unchanged. Builds on top of the existing Househelp Job Lifecycle screens

## 1. Job Acceptance

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Job details shown | Existing (updated) | ● Continues to show date/time, customer, and address, same as today ● Now also shows the services booked and the products/quantities needed for those services |
| Earnings display | New | Earnings shown on the acceptance card reflect Beauty service pricing, computed from the services booked |
| Accept / deny | Existing | Same accept/deny actions as Househelp. |

**Flow**

1. Expert receives a job request notification.
2. Acceptance screen shows customer, date/time window, address, services booked, the products/quantities expected for those services, and total earnings for the job.
3. Expert accepts or deny, same as today.

## 2. Job Deallocation & Denial

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Deallocation flow | Existing | Reused exactly as built for Househelp - no Beauty-specific change to how a job is deallocated by ops or by the system. |
| Denial flow | Existing | ● Deny option will only be available for long distance and last hour job. ● Same denial reasons as Househelp, few could be added based on category. ● Same downstream handling (e.g., re-assignment) as Househelp |

**Flow**

1. Job is deallocated (by ops/system) or denied (by the expert) the same way it works for Househelp today.
2. Downstream handling- re-assignment, notifications is unchanged.

## 3. Check-in

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Check-in screen | Existing | ● Continues to show location-based check-in, same as today ● Now also lists the services and products/inventory needed for this job, so the expert knows what to prepare |
| Delayed check-in | Existing | ● Same delayed check-in handling and messaging as Househelp. ● Logic for penalty can be changed and should be maintained at category level. |
| Check-in OTP | Existing | Same OTP-based check-in as Househelp. |
| No-OTP fallback | Existing | Same fallback path as Househelp when the customer can't share an OTP. |

**Flow**

1. Expert arrives and opens the check-in screen sees the services booked and the products/inventory needed for this job.
2. If arriving late, the same delayed check-in messaging shows as it does today.
3. Expert requests an OTP from the customer and enters it to check in, or uses the existing no-OTP fallback if the customer can't share one.
4. Check-in completes and the job moves to Job In Progress.

## 4. Job In Progress

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Buffer time | New | ● Right after check-in, a fixed buffer window opens before the service timer starts, giving the expert time to take out tools and set up everything needed for the service at the customer's home. ● This would be only for beauty and configurability should be maintained at category level |
| Services & inventory shown | New | The in-progress screen keeps showing the services booked and the products/inventory needed, so the expert can reference them at any point during the job. |
| Extension as addon | New | If customer has added an addon service during the booking then the visibility should be given to expert at both time and service level |

**Flow**

1. Right after check-in, the buffer window opens - expert takes tools out and preps for the service; the service timer hasn't started yet.
2. Buffer ends and the job moves into progress; expert can view services and inventory needed at any point on this screen.

## 5. Check-out

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Check-out OTP | Existing | Same OTP-based check-out as Househelp. |
| Auto checkout | Existing, logic change | If the expert doesn't check out manually, the system auto-checks-out the job once it exceeds its scheduled end time by 30 minutes |

**Flow**

1. Expert requests an OTP from the customer and enters it to check out, same as today.
2. If checkout doesn't happen manually, the system auto-checks-out the job 30 minutes past its scheduled end time.

## 6. Inventory Check-in (New - Beauty only)

This check is important so that we can ensure that we can look into the inventory post every job properly.

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Replaces "What have you done" | New (Beauty only) | ● For Beauty, "What have you done" is removed and replaced by Inventory check-in below, right after checkout ● Househelp keeps "What have you done" exactly as it is today |
| Products-used summary screen | New | ● Shown right after checkout ● Read-only summary of every product tied to the services performed on this job ● Grouped by service, with a count of items per service ● Each product shown at its usual/expected quantity for this job |
| Confirm as expected | New | ● Expert taps "Yes, used as expected" if everything matches ● Inventory is deducted at the usual quantities - no further input needed |
| Report a difference | New | ● Expert taps "Something was different" if actual usage differed ● Opens an editable version of the same list ● Only the products that differed need to change — everything else stays at usual |
| Edit quantities | New | ● Expert adjusts a product's quantity up or down with a +/- stepper ● A changed line is marked against the usual amount (e.g., "+1 pcs vs usual 1") ● Expert picks a reason for the change: client needed more, spilled/wasted, product ran out, or client asked less |
| Save & update inventory | New | ● Saving applies only the changed quantities — everything else stays at usual ● Directly updates the expert's live inventory count ● This is what next week's Auto Replenishment order is calculated from (see Auto Replenishment, Shift Lifecycle – Beauty Category) ● Does not feed any separate audit or red-card review |

**Flow**

1. Right after checkout, expert sees "Products you used" - every product for the services performed on this job, grouped by service, shown at usual/expected quantity.
2. If it all matches, expert taps "Yes, used as expected" - inventory is deducted at usual quantities and the expert moves on to Customer Rating & Block.
3. If something was different, expert taps "Something was different" and lands on an editable list, with the instruction to change only what differed.
4. Expert adjusts a product's quantity with +/-; the screen shows how far it is from usual (e.g., "+1 pcs vs usual 1") and shows reason chips — client needed more, spilled/wasted, product ran out, client asked less - expert picks the one that applies.
5. Expert taps "Save what I used." Only the changed quantities are applied, and live inventory updates immediately, feeding directly into next week's Auto Replenishment calculation.

## 7. Customer Rating & Block

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Customer rating & block flow | Existing | ● Expert rates the customer just completed, same as Househelp ● Expert can choose to block the customer from future bookings, same as Househelp |

**Flow**

1. After the inventory step, expert rates the customer, same as today.
2. Expert can choose to block the customer from future bookings, same as today.

## 8. Job Completion & Earnings

| Line item | Status | Acceptance criteria |
| --- | --- | --- |
| Job completion earnings | Existing | ● Final earnings screen shows the job's total earnings ● Includes base fare plus any addons, including Extension addons added during the job ● Shown the same way as it is for Househelp |

**Flow**

1. After the rating/block step, the job is marked complete.
2. Final earnings screen shows total earnings for the job, including base fare and any addons (e.g., Extension) added during the job.
