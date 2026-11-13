# Build plan — Fallback screens (template drawing, step 2)

Written 2026-11-12, **before** the first artboard. The lead asked to *draw it first* before agreeing `TEMPLATE.md`. The drawing shows three example cases, one per placement, each laid on the **shipped TC-less frame** it happens on. It is imported from *Self-Serve ER/AR* `HqmnjmxhZvyvZxmIaVMCrB`, section *TC Less house help* `599:37239`, and is not drawn from scratch. Copy on the fallback parts is a **draft placeholder**; step 3 writes the real lines.

Sources in this order: shipped app → `patterns/` → `components/` → Mobbin → invention.

## The board

One flow board, *Flow · Fallback template*, with three lanes. Each lane runs: the shipped step → the fallback → *(cause clears)* → back on the step. The arrows carry labels: *data turned off*, *she has not tapped*, *data on*, *internet slow*, *wrong code typed*.

| Lane | Case (`CASES.md`) | Placement | Artboards |
| --- | --- | --- | --- |
| 1 | 1.3 Mobile data off | **Screen** | S1 *A little bit about you* (shipped, filled) → F1 fallback → F1b same, finger guide after idle → back to S1 |
| 2 | 1.6 Very slow internet | **Strip** | S2 *Tap on the image to proceed* (shipped) → F2 the same step with the strip |
| 3 | 2.2 Wrong code | **In place** | S3 *Enter OTP* (shipped) → F3 *Incorrect OTP* (shipped `770:43671`) with Saathi speaking |

## Regions

| Screen · region | Built from | Source | Inherits | Tried first |
| --- | --- | --- | --- | --- |
| S1, S2, S3 · whole screen | shipped frame, imported as is | ER/AR `599:37239` (frame ids in `FROM-ERAR.md`) | — | — |
| F1 · status bar, header (back · *Work details* · Call pill · language), progress strip | shipped S1 chrome, kept | ER/AR S1 | — | — |
| F1 · content area | **EmptyState size `step`** (proposed in `TEMPLATE.md`) | `components/empty-state.md` § Anatomy | Centred in the area between header and Button; `spacing.5` rhythm; `spacing.6` before the Button | — |
| F1 · picture | EmptyState pictogram slot at 200 dp: pictogram `phone-✗` (pink disc, magenta phone, red ✗ dot) | `foundations/assets.md` § Pictograms (existing `phone-✗`) | Pictogram rule: object says what, dot says status | — |
| F1 · one line | EmptyState title | `components/empty-state.md` | Heading3 `textPrimary`, centred, ≤ 40 chars, no body line | — |
| F1 · Saathi docked + speaking pill | shipped Saathi dock from S1 | `references/onboarding-mascot-2026-10-08/` (shipped behaviour) | Bottom-right above the Button; waveform pill = speaking | — |
| F1 · Button | shipped primary Button of S1, label changed | `components/button.md` primary brand L | Full width, bottom, `toggle-right` icon leading | — |
| F1b · finger guide | Coachmark spotlight on the Button + finger (accepted idle CTA guide) | `components/coachmark.md` § Anatomy | Scrim, spotlight = target + 8 dp, the Button stays live; **no bubble text** (Saathi speaks) | — |
| F2 · whole screen | shipped S2 | ER/AR | — | — |
| F2 · strip | **Banner `degraded`** | `components/feedback.md` § Banner | Under the header, full width minus margin, `cell-signal-low` icon, one line, not dismissible | — |
| F2 · Saathi | shipped dock, speaking pill on | as F1 | — | — |
| F3 · whole screen | shipped *Incorrect OTP* frame | ER/AR `770:43671` | Figma wording kept (*Incorrect OTP*, *Resend OTP*) | — |
| F3 · Saathi | shipped dock, speaking pill on | as F1 | — | — |
| Board · lanes, arrows, labels | flow board convention | memory: flows, not screens | Lane title, labelled arrows, a *leaves by itself* return arrow | — |

No region is built from Mobbin or invented. The one new thing is EmptyState size `step`, an ask of core in `TEMPLATE.md`.
