# Hood & shift · the real prototype

Voice in, voice out, on the phone. One page, no install. Built per `PLAN.md`; the screens are Figma V2, the behaviour is `FLOW.md` v3.

## Run it

On the Mac, phone on the same Wi-Fi:

```bash
python3 projects/hood-shift-change/prototype/serve.py
```

It prints the URL (`https://<mac-ip>:8766/`). On the phone, in **Chrome**:

1. Open the URL. Chrome warns about the certificate once: *Advanced → Proceed*. (The cert is self-signed; the mic needs HTTPS.)
2. Allow the **microphone** when asked. If it was blocked: tap the lock icon → Site settings → Microphone → Allow.
3. Turn the media volume up. Saathi speaks with the phone's **Hindi voice** if one is installed (Settings → System → Languages → Text-to-speech → Google Speech Services → Install voice data → Hindi). Without one, she speaks **romanised Hinglish** through the Indian-English voice, automatically. Force either with `?tts=hindi` or `?tts=roman`; the hidden switch shows which voice is in use.
4. After every update, pull down to reload; the scripts are versioned so Chrome fetches them fresh.
5. Add to home screen for a full-screen run (⋮ → *Add to Home screen*).

## A real Indian-Hindi voice (Gemini TTS)

The phone's own voices sound foreign. With a Gemini key, Saathi speaks through Gemini's text-to-speech instead: natural Hindi, Indian accent, a warm female voice. The key stays on the Mac; the phone only receives audio.

1. Get a key at https://aistudio.google.com/apikey (free tier is enough for a demo).
2. Copy `tts.config.example.json` to `tts.config.json` and paste the key into `"key"`. Never commit it (it is git-ignored).
3. Restart `serve.py`. The hidden switch shows *voice: Gemini Aoede (cloud)*.

Voices to try in the config: `Aoede` (default, warm), `Leda` (younger), `Kore` (firmer), `Zephyr` (bright). Model `gemini-2.5-pro-preview-tts` is richer and slower. Every line is generated once and cached in `tts-cache/`; the lane's lines are pre-generated when the page opens, so the demo never waits. If the key is missing or the call fails, the phone voice is used.

## Drive it

- Everything spoken is tappable, everything tappable is sayable. Tap the Saathi orb to make her listen again.
- **Switch** (hidden): long-press the status bar — or press `` ` `` on a keyboard. Pick the lane (T · my hood, HT · new hood, C · friend), the state (open / full), the voice (real / scripted), and jump to a screen.
- URL form: `?lane=HT&state=full&voice=script&go=S1b`.
- **Scripted** voice replays the lines in `data.js → script` so the demo looks identical in a loud room.

## What's in it (Figma V2, 57 frames)

- **Entry** is the shipped *My Profile* screen; *Change shift or hood* starts the flow.
- **Guide and record**: video, the three cards, record with the live transcript, *Confirm your hood & shifts*.
- **Three lanes**: my hood · other time (T), new hood · other time (HT), with a friend (C), each with open and full states, the compare sheet and the *Confirm your move* card.
- **Waitlist communication**: after joining a waitlist and staying on the results screen, a WhatsApp message arrives after 20 s → the offer page → move. The offer-held and *filled up again* states are reachable from the switch (*Offer*) and by URL (`go=W2b`, `go=P2late`).
- **Type it**: the *Type it* chip and *Select instead* open the manual pickers — area (up to three), shift time, hours a day, friend ID — and the read-back rows open *Modify areas* / *Modify start time* / *Modify hours*.
- **Start late tomorrow** (Paper *Hood and shift change* · Multiple entry Review · flow 3): Profile → *Start late tomorrow* → pick 9:30, 10 or 11 AM (each shows what she loses) → sheet *Start at 11 AM tomorrow? · − ₹250 From this month's payout* → back on Profile, the row locked with *You start at 11 AM · can't be changed* and a green-tick toast. By voice: *साढ़े 9 बजे*, *10 baje se*, then *हाँ* twice. Switch: *Start late*.
- **Filters** (V2 *Filters* row): every results screen has a chip row instead of the *You asked* line — *All hoods · 8 hrs · From 9 AM* on the new-hood lane, *8 hrs · From 9 AM* where there is one hood; the top bar shows the place. Each chip opens a sheet (hoods with a count and search above 8 · hours with *Now* · starting times that exist with *You asked*). Chips show what she asked and change nothing until she picks; then hoods with no match disappear and the tick moves to the first match. Say *6 ghante wala* on a results screen to do the same by voice. A new search clears them.
- **Interaction**: a tap anywhere stops Saathi mid-sentence; silence after a line is not a miss — she waits, and the orb re-arms the mic. Screens that speak advance only after the line.

## Say these (Hinglish or Hindi)

| On | Say | It does |
| --- | --- | --- |
| Record | *HSR ya Bellandur, subah 9 se 5* | reads it back, finds work in HSR |
| Record | *yahin, bas 7 baje se* | my hood, other time |
| Record | *meri dost Anita ke saath, uska ID 14586* | the friend lane |
| Read-back | *haan* · *nahi* · *8 se 10* | find · record again · change the time |
| Results | *Agara* · *Sector 9* · *6 ghante wala* · *kitna milega* | pick · open · filter · she answers |
| Full sheet | *bata dena* · *paas ka dikhao* | join the waitlist · show work close by |
| Anywhere | *peeche* · *ghar* · a new place or time | back · home · a new ask |
| Two misses | — | "टैप करके बताओ", the screen is unchanged |

## Files

`index.html` shell · `styles.css` (tokens only) · `tokens.css` (generated: `python3 tools/tokens_to_css.py <out>`) · `data.js` one data set · `voice.js` speak / listen / parse · `components.js` shared renderers · `app.js` router, voice loop, switch · `screens/spine.js` + `laneT.js/.css` + `laneHT.js/.css` + `laneC.js/.css` (every screen built from its Figma V2 frame via get_design_context) · `assets/` Phosphor icons, Saathi, the street scene · `cert/` self-signed (ignored by git).

## Not in this build

The area picker (*Type it*), the add-areas / modify-hours sheets, the push offer, Kannada and Marathi, offline, a backend.
