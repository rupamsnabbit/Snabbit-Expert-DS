# Read · whose turn is it to speak (Mobbin, 2026-11-12)

**Problem (lead, field test):** after Saathi's voice explains the card, the app starts listening by itself. The only cue is a small "Speak now" line with a waveform at the bottom, and the expert did not know when to start speaking.

**What shipped apps do:**
| Pattern | Apps | What tells you it's your turn |
| --- | --- | --- |
| Auto-listen, loud switch | YouTube, Google Maps, Google Search Live | A big red mic appears, "Speak now" / "Listening…", and a beep |
| Tap to speak | Brainly | One big mic, nothing else on screen |
| Hold to talk | WhatsApp, LinkedIn ("Release to send"), Claude ("Hold to speak, release to send") | Your finger is on the button; a timer runs; let go to finish |
| Character speaks, then hands over | Tolan, Meta AI in WhatsApp | The character / orb changes state; your mic lights up |

**Translation rules for us:**
- One state change she can see and hear: the mic and colour switch, with a chime and a buzz. Text is not the cue (P1).
- Her mic is never shown before it is live, so there is no greyed button to tap (the dead-mascot taps, FB2).
- *Select* (type instead) stays as the quiet way out.
- The pearl cards keep their size (memory).

Screens: `https://mobbin.com/screens/0c01dcb4-cd53-48db-80fc-ed80f3f881b7` (YouTube), `…/121285a9-79ad-4120-9716-7c0dd52c6d55` (Brainly), `…/5609cf9c-a6e5-4785-ae58-f0d8b9118851` (WhatsApp), `…/f191a932-d66b-4694-9996-84691bab8420` (Claude), `…/e3d06f86-9c1d-466e-aeb0-342a2e6ed946` (Tolan). Internal only.
