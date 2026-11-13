# Read — contact the customer before you escalate (Mobbin, 2026-10-27)

Internal only — never published, never traced. Feeds iterations of C5 *Call the customer first* (Paper page *C5 · Call the customer first · iterations*).

Why Mobbin here: the lead asked for it ("try mobbin and pinterest… it looks basic"). The shipped app has no screen for this moment; the system sources were tried first — `patterns/check-in-out.md` § Edges (*Customer not home / not answering*: after 5 min a Banner *Waited 5 min? Call help*), the DENY LOGIC sheet (pictogram + title + buttons, too bare for this), `components/timer.md`. Pinterest: the browser could not open it; not used (mood only anyway).

| # | App · screen | Mobbin | What it does |
| --- | --- | --- | --- |
| 1 | talabat · "How would you like to get in touch?" | https://mobbin.com/screens/92f5a47f-58bb-47d4-b228-c283b2347f0b | A sheet whose hero is a big illustration of the person you are contacting, one line, Call (primary) and Chat |
| 2 | Waymo · "Car will wait 5 min before moving" | https://mobbin.com/screens/ee44778f-bba8-4da9-8b23-450fe426818f | The wait is a bar that fills; the next step happens when it ends — no button to skip it |
| 3 | DoorDash Dasher · Dash paused | https://mobbin.com/screens/731d968c-6684-49d4-9c6c-2e7c3435db04 | A worker app: a big ring timer is the hero, one line under it, the consequence when it ends |
| 4 | Grill'd · auto-confirm | https://mobbin.com/screens/f1357069-77cf-415f-85d1-086c7570035d | The button itself fills with a countdown `(0:05)`; the action happens when the fill completes |

## Six-step read

1. **Idea.** Escalation is earned by time and real attempts, not by a counter the user can watch and game: the app waits, the user tries, and the next option appears when the system decides.
2. **Borrowable:** the person (her customer) as the hero of the sheet (1); the wait shown as a filling shape, not a number of attempts (2, 3, 4); the next option appearing by itself (2). **Not borrowed:** their colours, type, illustration style, copy.
3. **Against the expert.** A count (*1 of 2 calls*) is a target she can hit by tapping and hanging up — the lead's point. A filling shape tells her "keep trying, help is coming" without telling her the rule. Pictures over words (P1); one action per state (P2).
4. **Tier.** Tier 2: BottomSheet (shipped DENY LOGIC sheet), the shipped customer card from the Check In screen, the shipped Timers ring, Button Groups. The scene illustration is an asset to add (`foundations/assets.md`).
5. **Translate.** See the Paper page: three directions, each a short flow.
6. **Side by side.** On the Paper page, each direction's board names the reference it borrowed from and the one-sentence difference.
