# Read — suspension cases (Expert App 2.0, 2026-10-18)

Shared by the lead: `15980:125809` (older Home: *Account Temporarily Suspended! Know more ›* banner → sheet *Reason
for suspension* with a bullet list + *Contact support*) and `37231:320916` *13 Oct 2026* (the new reason cards, Hindi).
Screenshots: `cases-a.png`, `cases-b.png`. Reason pictures exported to `assets/figma-suspension-reasons/` (the composed
300×162 frames at 2×, plus the suspended character `37231:320919` at 3×).

## The cases

Five reasons, shown alone or two at a time (the file draws pairs). Every card is: the suspended character · *आपको
सस्पेंड किया गया है!* · *कारण:* · the reason(s) · *contact your TL or Snabbit Saathi (08065907712) to come back*.

| Reason | Picture | Line (Hindi card) | Our line |
| --- | --- | --- | --- |
| Hotspot | map with the hotspot and a pin *Away from hotspot* | आप बार-बार हॉटस्पॉट से बाहर चले जाते हैं | You left your hotspot many times |
| Deallocation | job alert on a phone + red ✗ | अपने जॉब्स कई बार Accept नहीं करे | You didn't accept jobs many times |
| Uniform | expert in uniform + red ✗ | आप सही से Snabbit यूनिफॉर्म नहीं पहनते हैं | You didn't wear the uniform |
| Performance | phone: *Your overall rating is very low*, 1 star | कस्टमर्स ने आपकी परफॉर्मेंस खराब रिपोर्ट की है | Customers rated your work low |
| Early logout | expert leaving, *Emergency Logout* tag | आप बार-बार अपनी शिफ्ट पूरी नहीं करते हैं | You left shifts early many times |

The single-reason card gives the picture the full width; the two-reason card drops to 110 × 110 thumbs + an English
label. The Kavach sheet on the same page is a different message (phone with you), not a suspension reason.

## Translation onto Home (E1 with card A on top)

The picture already says the reason (P1), so the red error banner goes and the picture + one line take its place.
The phone number does not come across — *Request to come back* is the action on our screen.

Iterations, Paper page *E · Come back · explore (pick one)*, row 2:
S1 one reason — full-width picture · S2 two reasons — two picture tiles · S3 two reasons — rows (72 thumb + one line,
ListItem anatomy) · S4 one character for every case, reasons as small chips · S5 compact card *See 2 reasons ›* ·
S5b the reasons sheet (BottomSheet `info`).

## Open

- Assets: the reason pictures are photo-composites from the Figma file, not registered in `foundations/assets.md`.
  If picked they register as the suspension-reason set (one picture, one reason).
- Can there be three reasons? The file only draws one or two.
