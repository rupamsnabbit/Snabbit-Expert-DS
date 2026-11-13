# The ask — PAN–Aadhaar linking, and updating PAN and UPI / bank without starting over

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | Rupam Banik (design lead), in chat |
| Captured | 2026-10-28 |
| Kind | Captured in conversation — no written PRD |
| Confirmed by | Rupam Banik, 2026-10-28 — "yes … it's only a status check" |

---

### The ask, as said

> Currently, if you notice in our app, if I click on the UPI bank or the PAN card section (even after I have uploaded my details), it opens a screen where it literally is again asking me to enter the new details. Right now, the intended flow I want is:
>
> 1. If you have added your PAN card and you have not linked your PAN card, then I show you, in this same card, that you need to link your PAN card. You click that, and then we run something in the backend. We then see whether it actually is verified or not.
> 2. Within PAN, even if, let's say, you want to update your PAN card details, we need to show on a screen: "This is your existing PAN details. Enter your new PAN details" (instead of just randomly throwing them in a very new screen).
>
> Same thing goes even for the UPI bank details. Let's say I've already added a bank account and I'm clicking on the update button. It just randomly throws me into a new screen where it's asking me to add bank details, etc. Instead of that, we just say, "This is your existing bank details. Click to update," something like that.

Follow-up, same day: *"it's only a status check"* — the link itself happens on the Income Tax website; our tap checks whether it is done.

### What is being built

The *UPI / Bank Details* and *PAN Details* rows at the bottom of the Monthly Earnings page get the states they lack: a PAN that is added but **not linked with Aadhaar**, and an **update** path for PAN and for UPI / bank that starts from what she already has.

### Who, and when

The expert on the Earnings tab → Monthly Earnings, after onboarding, once she has added a PAN and / or a UPI ID or bank account. Evidence: *Expert App (Rupam)* `cIAH24e13VZJu31OmiMWrj`, page *PAN & Aadhar linking*, section *✅ Monthly Earnings* `1764:26942` (frame labelled *UPI added, link pan with aadhar case*). The add flows she went through are *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB` section *Bank/UPI* `619:51990`.

### The problem

1. Today, tapping *UPI / Bank Details* (**Update**) or *PAN Details* opens the same empty add screen she used the first time. Nothing she saved is shown, so it reads as if her details were lost.
2. A PAN that is not linked with Aadhaar is inoperative; tax is cut at 20 % instead of 1 %. The app has no state that says so, and no way to check.

### In scope

- PAN row state **added, not linked with Aadhaar**, on the same row, with one tap that runs a **status check** in the backend, and its results: linked · not linked · could not check.
- **Update PAN**: one screen showing the current PAN and taking the new one.
- **Update UPI / bank**: a screen showing the current account, with one action to update it, then the shipped add flow.

### Out of scope

- Linking PAN with Aadhaar inside the app (it happens on the Income Tax website).
- The first-time add flows for PAN and UPI / bank (shipped in onboarding; reused unchanged).
- The rest of the Monthly Earnings statement.

### Already decided

- The link action is **only a status check**.
- Entry points are the existing rows at the bottom of Monthly Earnings.
- Design directly in Figma, on page *PAN & Aadhar linking* `1764:26670`.

### Still open

See `SCOPE.md` → *Open questions*.
