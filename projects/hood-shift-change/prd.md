# The ask — Self-serve work area & time change (restart)

## B — No PRD, the work started in conversation

| | |
| --- | --- |
| From | Design lead (Rupam), from the review meeting with product and business (transcript summary shared 2026-10-07) |
| Captured | 2026-10-07 |
| Kind | Captured in conversation — no written PRD. Replaces the first attempt, which was scrapped at review and erased |
| Confirmed by | Design lead, 2026-10-07, with the corrections in *Answers at confirmation* below |

There is no document, so this file **becomes** one. This section is closed once confirmed. After that it is evidence and is not edited: new information goes to `SCOPE.md` → *Log*, and a genuinely changed ask is a new version below.

---

### What is being built

A **self-serve, voice-first flow**. She says, in one go, where she wants to work and (if it matters to her) when. The system (*the genie*: backend matching, assumed smart) reads that once and shows **the best options it actually has**. She accepts one, or she joins a waitlist. Her intent is captured either way.

It is **one flow**. Area, time, or both are not split into separate journeys, because changing area often changes the time too.

### Who it is for

Experts (*didis*), aged 18–40, mostly doing house help.
- **Different constraints:** some have a bike and some don't; some won't work nights; some put money first, some distance, some time, some working near a friend.
- **Literacy:** reading is not assumed.
- **Habits:** she is used to WhatsApp, and for any problem she calls support.
- **No trainer:** this flow is fully self-serve.

### The problem today

Area and time changes go through calls, and **only about 10 in 100 requests end in a change**.
- **What people ask for** (figures from the meeting): 60% ask for location only, 20% for location and time, and 10% for time only.
- **So location is primary.**
- **Most people won't get exactly what they asked for.** Getting that case right matters more than the happy path, which is only about 10% of requests.

### What the meeting decided

1. **Location first.** Capture where she wants to work as precisely as she can say it: an area (*Bellandur*), a micro-area (*Koramangala NGV*), or a landmark (*near Indiranagar metro*). She can name one place or several. Time is secondary, and flexible by assumption.
2. **One input, not a step-by-step wizard.** The first screen sets the context; she speaks whatever she wants to change.
   - **Voice first:** a mic, a live transcript she can see and edit, then submit.
   - **Fallback when we're not sure we understood:** *say it again* or *type instead*.
   - **Already proven:** speech-to-text and text-to-speech work in local languages (English, Hindi and Marathi tested). Saathi ticketing already turns her audio into text for agents.
3. **Never send her away empty-handed.** Show about five or six options, in this order:
   - **Recommended:** what she asked for (area and time) at the top.
   - **Same area, other times:** including more or fewer hours, and part-time, full-time or split shifts.
   - **Nearby areas:** close to what she asked for, but not where she works now.
4. **Money is the hook.**
   - Each option shows what she would earn.
   - She may move to fewer hours, but if her pay drops she sees it and says yes to it: *you earn ₹X now, you'll earn ₹Y here — do you want this?*
5. **Be honest when what she asked for isn't available.** Say so, then show what's close. If we don't, she calls support asking why she didn't get what she asked for.
6. **Make her feel heard.** Show what she asked for, then where she'd do best at Snabbit. The business can push the options that are best for it.
7. **None of these → join the waitlist.** Her intent is recorded, and we get back to her.
8. **Words:** to her it is *work area* and *time*, never *cluster* or *hood*.
9. **Design for two years from now.**
   - The same UI should still work when demand and the backend logic change.
   - Design without tech constraints. Add new components where needed, but as few as possible.
   - Likely built as web.

### Guardrails discussed

- **30-day freeze:** after a change, she can't change area or time again for 30 days.
- **Waitlist cap:** she can't sit on many waitlists. There will be a cap (1 or 2 was discussed).
  - The voice input must not be a toy she replays: each run costs an LLM call, and Saathi ticketing already sees duplicate tickets.
  - When she comes back while waitlisted, gently show what she's waiting for, plus nearby options that are open.
  - She can still change her mind, for example because she moved home.
- **When the change starts:** debated. Kishan's view was always T+3/T+4. The other view was that a request made Monday to Thursday starts the next day.

### Later, not the MVP

- Work near the expert who referred her (*Anita Sharma referred you — work near her?*).
- Work near a friend, by the friend's expert ID.

### Still open

- The waitlist cap (1 or 2), and what *start again* does to an existing waitlist.
- When a change takes effect (T+3/T+4, or next day for Monday–Thursday requests).
- How we say *not available here*: an explicit line, or the recommended labels alone.
- Whether time is ever asked separately, or only inferred from what she says.
- The split between location and time requests. The meeting said 60/20/10, but the first data deep-dive said 90% of calls involve location. Which is current?

### Answers at confirmation (design lead, 2026-10-07)

- **The waitlist is her choice.** She joins only when she says *put me on the waitlist*. While she waits, she can still see nearby areas.
- **The waitlist cap is 1.** While she is on a waitlist, voice is off, but she can browse other areas. To use voice again, she removes the waitlist.
- **When a change starts:** asked Monday, Tuesday or Wednesday → it starts the next day. Asked Thursday to Sunday → it starts the next Monday.
- **When an area isn't available, we say so in a line:** *that area isn't available, here are nearby areas*.
- **We ask for time.**
- **A visual guide comes first:** it shows what to say, with examples, so she gets the best results.
- **Work with a friend** is part of the flow, not later.
