# Extending the system

How to build something the design system does not already have — from a Figma exploration, a screenshot, a Mobbin or Pinterest reference, a PRD, or a hunch — without the result drifting from the Expert app.

This document is binding for designers, engineers and AI agents. If you are an agent and the user asks for "something like this screenshot" or "don't stick strictly to the design system", this is the procedure. It is not a request to ignore tokens or principles; it is a request to translate an idea into them.

---

## The one rule

**Translate, don't transplant.** A reference gives the *idea* — layout, hierarchy, information order, interaction, motion, a state you had not thought of. The system gives the *expression* — tokens, components, copy voice, and the principles. Every new thing borrows ideas freely and expresses them only in system terms.

What may be borrowed from a reference: structure, proportion, sequencing, gestures, transitions, what information is shown and in what order, how a state is handled.

What may never be borrowed: colours, type faces or sizes, radii, spacing values, shadows, icon styles, illustration styles, copy, or a dependence on reading that the expert does not have.

---

## Three tiers

Every piece of UI is one of these. Name the tier in the brief and in the PR.

### Tier 1 — Core
A system component: Button, Tag, Input, Checkbox, Bottom sheet, Toast, Avatar, Progress bar, Tier badge, and so on. Lives in `components/`, in the Figma **Components** page, and in the `design-system` package.

Use as-is. Do not detach, restyle or fork. If a core component does not fit, that is information about the component — open a change request against it (see *Changing core* below), do not work around it.

### Tier 2 — Composition
A new arrangement of core components and tokens. A new card is a container using `radius.lg`, `borderDefault` and `spacing.5`, holding a `Heading3`, a `Tag` and a `SnabbitButton`. Most "I need something new" is this.

Allowed without approval. Conditions: only core components and tokens inside; passes the principles checklist; lives in the feature's namespace (`Contest / Hero`, `Earnings / Breakdown`), never on the Components page. No brief needed beyond the feature's own.

### Tier 3 — Local component
Something new that is not a composition — a countdown ring, a map widget, a selfie preview, a coin animation, a custom slider.

Allowed with four conditions:
1. **Tokens only.** No new colour, radius, type size, spacing value or shadow. If a token is missing, propose the token (see `tokens/DESIGN_TOKENS.md` → *Adding or changing a token*); do not hard-code.
2. **Principles pass.** Runs the full component acceptance checklist in `PRINCIPLES.md`.
3. **Namespaced.** Lives in the feature's namespace in Figma and code. Never on the Components page, never in `core/designsystem`.
4. **Briefed.** Has a brief (template below) saying what it is, why no core component or composition worked, and what it borrows from where.

### The rule of three
The third time a Tier 3 component is used or copied by a *different* feature, it is promoted to Tier 1: it gets a spec in `components/`, a Figma component with semantic variables, and a package implementation. Until then it stays local. This is how the system grows from real need instead of speculation.

### Tier 0 — Not allowed
A detached, hand-styled, unnamed frame or composable that lives nowhere and follows nothing. Any of: a raw hex or dp in feature code, a text style not in the scale, a colour not in the palette, a "Frame 2147242534", a component copied and edited rather than composed. Reviewers reject these; agents must not produce them.

---

## The reference read

When the input is a screenshot or reference (Mobbin, Pinterest, Dribbble, a competitor, a customer-app screen), do this **before** drawing or coding anything. Write it down; it is the first half of the brief.

**1. Name the idea.** In one sentence, what problem does this reference solve and how? *"Shows earnings as a stacked bar so the split between base and incentive is visible at a glance."* Not "a nice earnings card".

**2. Separate idea from expression.** List what is borrowable (structure, order, interaction, state handling) and what is the reference's own skin (its colours, type, radius, illustration, copy). Only the first list travels.

**3. Run it against the expert.** Check the idea against `PRINCIPLES.md` §Who we design for. The most common failures: depends on reading fluently; targets too small; text-dense; assumes fast data or a large screen; colour alone carries meaning; celebration or nudge blocks the next action. For each failure, state the change that fixes it. If the idea *cannot* survive these changes, say so and stop — a different idea is needed.

**4. Place it in a tier.** Is it a composition of existing core parts (Tier 2)? A new local component (Tier 3)? A change to an existing core component (see below)? Name it.

**5. Translate.** Rebuild the idea in system terms: every colour a semantic token, every size from the type scale, every gap from the spacing scale, every control a core component. Copy rewritten in the Snabbit voice (warm, specific, sentence case, one idea per line) in all four languages' worth of room.

**6. Show side by side.** Present the reference and the translation together so the borrowing is visible and the differences are deliberate. Every difference from the reference is a sentence: *"Enlarged the amount to Heading1 and added the ₹ icon because P1."*

An agent asked to "make it like this but not strictly the design system" does steps 1–6 and delivers step 6. It does not skip to a restyled copy of the screenshot.

### Where inspiration comes from — Mobbin first

**Mobbin is the preferred source** of references for this system, and the design lead uses it daily. It shows *shipped* product — real flows, with their states, edge cases and sequence — which is the same standard of evidence this repository holds itself to (`references/SCREENS.md`: screens are evidence). Pinterest and Dribbble show concept art: one screen, no states, no next screen, colours chosen to win a like. They are allowed for **mood** only; nothing structural is borrowed from a screen that never shipped.

How to use Mobbin here:

- **Search by flow, not by look.** *Onboarding · OTP*, *Check-in*, *Earnings breakdown*, *Payout*, *Referral*, *Permission request*, *Empty state*, *Offline*. Open the whole flow and read it start to finish — the borrowable idea is almost always in the *sequence* and the *state handling*, not in the screen you first liked.
- **Prefer apps that serve someone like the expert.** Worker-side apps first — Urban Company Partner, Swiggy / Zomato delivery partner, Rapido Captain, Uber Driver, DoorDash Dasher, Grab Driver, Porter — then consumer apps with a low-literacy or first-time-smartphone audience (PhonePe, Paytm, Meesho, ShareChat, WhatsApp). A fintech dashboard for analysts teaches us nothing about a woman at a customer's door.
- **Pull three, not one.** For any pattern, read at least three apps' versions before translating. What all three do is convention (she may already know it from another app — P7 says keep it); what only one does is a choice to justify.
- **Save the flow, with its read.** `references/<app>-<flow>/` holds the screenshots in order plus one `.md`: app, platform, date captured, Mobbin URL, the six-step read, and which spec or brief it fed. Internal reference only — Mobbin screenshots are never published on the site or in the repo's public pages, and never traced.
- **Then translate** (steps 1–6 above). What comes across: order of screens, what is asked when, how a state is handled, a gesture, a transition. What never comes across: the skin. If the translated version is not recognisably ours — Outfit, our pinks and status colours, our Buttons, our voice — it is a transplant, start again.

An agent given a Mobbin link does exactly this: opens the flow, reads three, saves the read, translates, shows side by side.

---

## Changing core

Sometimes the right outcome of a reference read is that a Tier 1 component should change — Button needs a loading state, Tag needs a count. That is welcome. The path:

1. Write what is missing and which principle or use case demands it.
2. Propose the change against the component's spec in `components/`, including every state and token affected.
3. Update spec, Figma component and package together in one change, with the component page in `site/` regenerated.
4. Never fork a core component to get the change into one feature faster. A fork is Tier 0.

---

## Brief template (Tier 3, or a change to core)

Keep it to one screen. Put it in `briefs/<feature>-<component>.md`.

```
# <Feature> / <Component>

Tier: 3 (local)  |  or: change to core <Component>
Owner: <name>  ·  Date: <yyyy-mm-dd>

## Idea
One sentence: the problem and how this solves it.

## Why not existing
Which core components / compositions were tried and why they don't fit.

## Reference (if any)
Source, screenshot filename in references/, and the reference read (steps 1–4).

## Translation
Tokens used (every colour, type, spacing, radius by name).
Core components inside it.
States: default / pressed / disabled / loading / error / offline / empty (as applicable).
Audio or voice moments.

## Deviations
Each as one sentence: "Breaks from <system rule> on <X> because <Y>." Empty is the goal.

## Principles checklist
Paste the 16-row checklist from PRINCIPLES.md, ticked honestly.

## Promotion
Where else this might be used. Promote to core on third use.
```

---

## Decision tree

```
Need something that doesn't exist?
│
├─ Can it be built only from core components + tokens?
│    └─ Yes → Tier 2 composition. Build it in the feature namespace. Done.
│
├─ Does an existing core component almost fit?
│    └─ Yes → Change to core. Propose against its spec. Don't fork.
│
├─ Is it genuinely new?
│    └─ Yes → Tier 3 local. Tokens only, principles pass, namespaced, briefed.
│              Third use elsewhere → promote to core.
│
└─ Starting from a screenshot / reference?
     └─ Reference read first (steps 1–6), then re-enter this tree.
```

---

## References folder

Keep the reasoning, not just the result. `references/` holds each reference screenshot with a short `.md` beside it: source, date, the reference read, and which brief or component it fed. When someone asks "why does the earnings card look like that", the answer is on disk.
