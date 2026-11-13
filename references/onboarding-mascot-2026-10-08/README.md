# Shipped onboarding: the mascot (Saathi)

- **Source:** screenshot shared by the design lead on 2026-10-08. It shows the onboarding *Work details · A little bit about you* step in three states: empty, name typed, and Female picked.
- **Caveat from the lead:** the drawing of the mascot here is an older one. The real mascot is the portrait in the Figma file *Expert App (Rupam)*, page *Hood & shift · Voice final* (`26:291`), used on N1–N4 and S1b: an expert in a pink Snabbit polo, hair in a bun, on a pink blob.
- **Second screenshot** (`language-preference-saathi.png`), shared the same day: six *Language preference* screens. These are the language checkboxes, a reading test (*क्या आप यह पढ़ सकते हैं?* with *सही चित्र चुनें*), how she likes to send messages (type Hindi / English + Hindi / voice note / none), the language customers speak, the app language, and *Saathi आपसे किस भाषा में बात करे?*.
- **Read for:** how experts already know the mascot. This decides what she can mean in `hood-shift-change`.

## What she does here

| Observation | Reading |
| --- | --- |
| She stays in the same place in all three states: bottom-right, just above the primary Button | She has a home. She doesn't travel with the content |
| A small pill with a waveform sits above her left shoulder in states 1 and 2, and is gone in state 3 | The waveform pill means *she is speaking now*; with no pill, she is idle. It is shown as a picture, not a word |
| There is no voice bar under the header (the older FINAL ONBOARDING had one, see `components/voice-prompt.md`) | In this onboarding, the mascot replaces the voice bar as the sign of voice |
| Her pose: half-body, smiling, a hand pointing toward the form | She points at what she's talking about |
| She is present while the screen waits for input and after a choice is made | Her being there means *I'm with you*; the pill means *I'm talking* |
| Tapping her replays the line (confirmed by the lead, 2026-10-08) | She is the replay control. Experts learn this in onboarding, so no other play affordance is needed where she is docked |

## From the language-preference screens

| Observation | Reading |
| --- | --- |
| The mascot has a name: **Saathi**. The expert picks *the language Saathi talks to her in* separately from the app's language | Her voice language is its own setting. Every voice flow speaks it, and speech recognition should expect it |
| While she speaks, the pill beside her holds a **pause** disc and a waveform | The pill is the player: pause while she's talking, play afterwards. It is the VoicePrompt `bar` (play/pause disc + progress, no knob) reshaped and attached to her |
| On the *Saathi …* language screen she isn't docked; each language row has its own play disc | Playing something the expert asked to hear uses a per-item play control, not the mascot |
| Onboarding asks whether she can read, and how she prefers to send messages (including *voice note*) | The app already knows who relies on voice. A voice-led flow can use this to pick its default (speak first or type first) |
| In the *Work details* frames, the pill is gone once she has finished (state 3) | After a line, the pill may go away rather than switch to play. Confirm |

## Open

- Does the real (Figma) mascot have poses (pointing, listening, celebrating), or only a portrait?
- After she finishes a line, does the pill hide or switch to a play disc?
- *Saathi* is not in the vocabulary table (`principles/PRINCIPLES.md`, `foundations/content.md`).
- Nothing in `foundations/assets.md` registers her yet, and `foundations/motion.md` forbids mascot animation.
