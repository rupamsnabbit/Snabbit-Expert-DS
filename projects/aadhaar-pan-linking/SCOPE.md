# Scope — PAN–Aadhaar linking and account updates

The contract for this project. Filled at intake, kept current as the work runs. Read it before touching anything in this folder.

| | |
| --- | --- |
| Slug | `aadhaar-pan-linking` |
| PRD | `prd.md` — captured 2026-10-28 from Rupam Banik (design lead), in chat |
| Stakeholder | Rupam Banik |
| Status | Screens drawn in Figma — awaiting the lead's review and the open questions |

## Boundary

This project reads **its own folder** and **the system** (`tokens/`, `components/`, `foundations/`, `principles/`, `patterns/`, `references/SCREENS.md`). It does not read any other project's folder. Every decision traces to this PRD, the principles, or the tokens — nothing else.

## Answers with

| Output | Path | Status |
| --- | --- | --- |
| Pattern | `patterns/payout.md` § 3 *Get paid — account and PAN*: the not-linked state, the status check, update from what she has | — |
| Screens | Figma `cIAH24e13VZJu31OmiMWrj` page *PAN & Aadhar linking*, section *Aadhaar–PAN linking · flows* `1785:5630` (12 screens, lanes A / B / C) | drawn, awaiting review |

## Asks of core

| Ask | Kind | Why this PRD needs it | Where it lands | Status |
| --- | --- | --- | --- | --- |
| `Account Item` (Figma library) has only Filled / Unfilled. The PAN row needs a **not linked** state: status line (`warning-circle` + *Not linked with Aadhaar*, red) and a trailing **Check** pill like *Update*. Spec already allows it (`list-item.md` status line); the Figma component does not. A1 detaches the row to show it | component change (Figma library variant) | surface 1 | Figma *Expert App — Design System 2.O* `Account Item` · `components/list-item.md` note | proposed |
| Illustration *Seva Kendra counter* (she hands her Aadhaar and PAN cards across the counter) for A6 | asset | linking is done in person; P1 wants the place as a picture, not a sentence | `foundations/assets.md` register + Figma *Snabbit Assets* | withdrawn 2026-10-28 (A6 removed) |
| Icon `device-mobile`: *her phone, as a thing to carry or use* (`phone` already means *Call*) | icon | A6 *Carry these* | `foundations/icons.md` | withdrawn 2026-10-28 (A6 removed) |
| Illustration *PAN card with a red alert* (the lead's, on 2.4 A4 as `image 354080`; replaced the earlier *broken link* picture the same day) — used on every not-linked surface; register it in `foundations/assets.md` with one meaning: *PAN not linked with Aadhaar* | asset | the not-linked sheet and page | `foundations/assets.md` + Figma *Snabbit Assets* | proposed |

## Sits beside

| Existing pattern | Relationship |
| --- | --- |
| `patterns/payout.md` § 3 *Get paid* | **variant of** — adds the not-linked PAN state and the update paths to the rows it already describes |
| `patterns/onboarding.md` step 7 *Get paid* | **runs before** — the add flows reused unchanged after *Update* |

## Open questions

| Question | Asked | Answer |
| --- | --- | --- |
| Is tax cut at 20 % while the PAN is not linked (inoperative PAN), as when no PAN is added? The screens assume yes. | 2026-10-28 | |
| Is the status check instant, or can it take hours? The screens assume instant, with a *could not check* state. | 2026-10-28 | |
| When she updates her bank account, which account does a payout already in processing go to? | 2026-10-28 | |
| After a PAN update, is the new PAN checked for the Aadhaar link in the same step? The screens assume yes. | 2026-10-28 | |
| Seva Kendra: is there a fee she should know before she goes (late fee, the centre's charge)? Kept off the screen until confirmed. | 2026-10-28 | Moot: the app no longer explains where or how to link (lead, 2026-10-28) |
| Any Seva Kendra, or ones Snabbit lists? *Find Seva Kendra near me* opens Maps for now. | 2026-10-28 | Moot: A6 removed |
| Frame 5 of the section shows *Income Tax (1%)* with no PAN; frame 7 shows UPI added but *Add UPI / bank account to enable payout* in the schedule. Deliberate or leftovers? | 2026-10-28 | |

## Log

| Date | What happened |
| --- | --- |
| 2026-10-28 | Intake. Read the Monthly Earnings section and the *Self-Serve ER/AR* Bank/UPI section. Ask captured in `prd.md`, confirmed by the lead (link = status check only). Tier table and build plan written; drawing in Figma. |
| 2026-10-28 | Drew 12 screens in Figma section `1785:5630`: lane A (A1 Earnings with the not-linked PAN row and 20 % tax line, A2 checking, A3 linked, A4 not-linked sheet with *Link on Income Tax website* and *Update PAN*, A5 could not check), lane B (B1 current PAN + new PAN, B2 typed, B3 verified), lane C (C1 current UPI, C1b current bank account, C2 shipped add flow unchanged, C3 updated). Built from library components and variables; illustrations carried over from Self-Serve ER/AR. Next: the lead's review, answers to the open questions. |
| 2026-10-28 | Lead: PAN–Aadhaar linking is done **offline at a Seva Kendra**, not on a website; after linking **she taps to check again**. Lane A reworked: A1 pill *Link* → *Check*; A4 button → *Link at Seva Kendra*, headline ₹7,750 to match the lead's restored *No PAN / PAN* rows (₹8,000 vs ₹250); new **A6 Link at Seva Kendra** (picture placeholder, *Carry these* Aadhaar card / PAN card / Your phone, *Find Seva Kendra near me*, *Already linked? Check now*); A5 moved right, subtitle *Try again in a few minutes*. New asks of core: Seva Kendra illustration, `device-mobile` icon. |
| 2026-10-28 | Lead: the case *PAN not linked and she wants to update it* was missing. Added lane D (D1 current PAN card with *Aadhaar · Not linked*, D2 wrong number, D3 verified and linked, D4 verified and still not linked → *Link at Seva Kendra*); B3 gains *Aadhaar · Linked*. The lead had meanwhile renamed the section *Aadhar linking*, moved it, and removed the captions, the open-questions card, A5 and A6; those were left as the lead has them. D4 still points to A6, which is no longer on the page. |
| 2026-10-28 | Lead: flows were half-baked ("how do I land on D1?"). Built section *Aadhar linking · end-to-end flows* `1821:7487`: 9 rows, each from her Earnings screen (scrolled to Quick Actions) to the end, a pink ring on what she taps, a label for what happens next; one persona (Sushila Kumari, BFTPX1234K → GAKPR9873Q, sushila@okaxis). Rows: 1 check → linked · 2 check → not linked → Seva Kendra → check → linked · 3 check fails → Try again · 4 not linked → Update PAN → new PAN linked · 5 … new PAN not linked → Seva Kendra · 6 … wrong number · 7 linked → update PAN · 8 update UPI · 9 bank account → new bank account. The shipped add screens (choose, UPI, bank form, fetching, confirm) rebuilt from Self-Serve ER/AR. A4 on the board is the lead's edited version plus *Link at Seva Kendra* / *Update PAN*; the lead's own section left untouched. |
| 2026-10-28 | Lead: the app does not explain the Seva Kendra or what to carry; the sheet just says to come back once linked. A4 (lead's section and board): headline *Your PAN is not linked with Aadhaar* (spelling fixed), one line *Come back when your PAN is linked* in place of the repeated subtitle (P1: one instruction line; *linked* not *verified*, since the PAN is already verified), the 20 % / 1 % rows moved up under it, **Update PAN** Text Button above **Understood** (`Neutral - Filled`, bottom; P2). D4: same line, one Button **Go to Earnings**. A6 removed from the board; row 2 now E → Check → A2 → A4 Understood → (later) E → Check → A2 → A3 → E; row 5 ends on Earnings with the new PAN still not linked. Asks for the Seva Kendra illustration and `device-mobile` withdrawn. |
| 2026-10-28 | Lead: "PAN not linked, but I want to update PAN or verify — not included". The update path was hidden behind the *Check* pill. Added **P0 PAN Details (not linked)**: tapping the not-linked PAN row opens it; it shows her PAN with *Aadhaar · Not linked* and offers **Check if linked** (primary) and **Update PAN**. *Check* pill removed from the row (lead's A1 and the board). Board rows 1–6 rebuilt through P0; A4 / A5 now sit over P0. P0 also placed in the lead's section under A2. Checking now takes one more tap than the original ask (row → P0 → Check); trade-off stated to the lead. |
| 2026-10-28 | Lead: "show a bottom sheet asking whether I want to update or verify". P0 screen replaced by **S0**, a BottomSheet `select` over Earnings: *What do you want to do?* · *Check if PAN is linked* (`seal-check`) · *Update PAN* (`pencil-simple`); tap a row to go. Board rows 1–6 now E → S0 → …; row 2 ends back on Earnings; A4 / A5 over Earnings again. Lead's section: P0 swapped for S0. |
| 2026-10-28 | Lead drew the Update PAN screen (`1855:91711`): TopNav *Update PAN*, *Current PAN* label, the PAN card picture with her name and number on it, a library Toast strip under the card (*Aadhar not linked*, State=Red Dark), Input field with heading *Enter new PAN card number*, Button *Update PAN*. Propagated as the single source: board 4.3 (the lead's frame moved into the slot), 5.3, 6.3 (empty), 4.4, 5.4 (typed, Button on), 6.4 (Input Error *Please enter a valid PAN*), 7.2, 7.3 (linked case: Toast State=Success Light *Aadhar linked*); lead's section B1, B2, D1, D2 replaced. Copy kept as the lead wrote it (*Aadhar*), though elsewhere it is *Aadhaar*. |
| 2026-10-28 | Lead: fix the spelling everywhere and remove the pink borders. *Aadhar* → *Aadhaar* in 13 texts and 2 section names across the page (0 left); all 35 pink tap rings removed from the board (the pink *Next* labels between screens stay). |
| 2026-10-28 | Lead: no *Your PAN is verified!* page after an update; a success moment, then straight to Earnings. D3, D4, B3 (board rows 4, 5, 7 and the lead's section) replaced with the A3 success screen: *PAN updated* + *Income tax is now 1%* (linked) or *Come back when your PAN is linked* (not linked); no Button, returns on its own (P6 moment ≤ 1.5 s, never blocks). Labels after them now *Back on its own*. |
| 2026-10-28 | Lead: emphasise *get your PAN linked and come back* on the not-linked sheet. Headline (H2 red) is now **Get your PAN linked and come back**; the small line is the status *Your PAN is not linked with Aadhaar* (one hero, one instruction line, P1). The lead had removed *Update PAN* from the sheet on the board (2.4); the lead's-section A4 matched to it — the sheet's only action is **Understood** (update stays in the choice sheet S0). |
| 2026-10-28 | Lead edited S0 (rows in auto layout with PAN-card pictures, *Check if PAN linked to Aadhaar*) and asked for it everywhere, and for auto layout instead of hand-placed frames. S0 rebuilt from the lead's rows in all 7 copies. Every screen I authored rebuilt as auto layout and swapped in place (same names, positions): S0 ×7, A4 ×2, A5 ×1, A2 / FE / A3 / *PAN updated* / C3 ×18, C1 / C1b / CH / UF / UC / BF / BC ×10. Structure: screen = vertical AL (status bar, TopNav, Content grow, Footer, home indicator); sheets = AL with backdrop and scrim absolute; cards and rows AL. The lead's own frames (Update PAN, Earnings clones) untouched. |
| 2026-10-28 | Lead: A5 (could not check) uses a cross, not the PAN warning picture. Replaced with `x-circle` (registered: *Error*, regular) 56 in `red600` on an 88 white disc, auto layout, in the one A5 copy (board 3.4). |
| 2026-10-28 | Feedback via the lead: on *PAN updated (not linked)* the line *Come back when your PAN is linked* was too hidden. 5.5 is now the success screen (badge + *PAN updated*, moved up) with the A4 not-linked sheet over it (picture, *Get your PAN linked and come back*, 20 % / 1 % rows, **Understood**); label after it *Taps Understood*. The lead had removed their *Aadhaar linking* section and the original Monthly Earnings section; the board (renamed *Aadhaar PAN link*) is the only section. Two frames named *2.4 A4* exist (one at row 5's end) — left as the lead placed them. Home and Profile touchpoints waiting on the lead's Profile (and current Home) links. |
| 2026-10-28 | Lead: no sheet on the not-linked result; a full page with more weight on getting it linked. 5.5 is now a full page (auto layout): Toast `Success Light` *PAN updated* at the top, PAN warning picture 180, H2 red **Get your PAN linked with Aadhaar**, one line *Come back once it is linked*, the *No PAN / PAN* rows, Button `Neutral - Filled` **Understood** in the footer. |
| 2026-10-28 | 5.5 full page: red top wash added, as on the not-linked sheet — absolute rectangle 393 × 440, linear `red100` → `gray-50`, stops bound to the variables. |
| 2026-10-28 | Lead swapped the not-linked picture on 2.4 A4 for a new illustration (PAN and Aadhaar cards with a broken link). Replaced the old PAN-warning picture with it on 5.5 (the only other place it was used); A5 keeps its `x-circle`. Asset registration added to *Asks of core*. |
| 2026-10-28 | Lead swapped the not-linked picture again (PAN card with a red alert, `image 354080` on 2.4 A4). Put on 5.5 too; those two are the only not-linked screens with a picture. |
| 2026-10-28 | Lead added the Saathi orb (120, absolute) to 1.2, 1.3, 1.4, 2.2, 2.4 and asked for it on every other screen and over every sheet. Added to 31 frames by the lead's rule: x 273; on sheets just above the sheet's top edge (behind the sheet, over the scrim); on full screens on top of the home indicator; where buttons sit at the bottom, just above them. Earnings screens left without it, as the lead had. Old 72 px Saathi images replaced. |
