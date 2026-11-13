# Read · the box drawn where the real one will land (Cal AI, Sesame)

Shared by Rupam, 2026-11-05, during the permissions rework (*"look how smart this is"*, *"see this as well"*).
Internal reference only; never published, never traced.

| # | App · platform | What it does | File |
| --- | --- | --- | --- |
| 01 | Cal AI · iOS | alert drawn in place; 👆 just under *Allow*, outside the alert | `01-cal-ai-notifications.webp` |
| 02 | Sesame · iOS | location alert drawn in place; *Allow While Using App* outlined; a line under the alert names it; **Continue** | `02-sesame-location.jpg` |
| 03 | Rocket Money · iOS | alert drawn in place; red circle-arrow under *Allow*; *Tap "Allow" on the next screen*; **Continue** / *Not Now* | `03-rocket-money-notifications.png` |
| 04 | Fetch · iOS | alert drawn, *Allow* filled green, big hand on it, coins | `04-fetch-notifications.jpg` |
| 05 | Liven · iOS | alert drawn in place, thin arrow under *Allow* | `05-liven-notifications.jpg` |
| 06 | DailyArt · iOS | alert drawn, curved arrow to *Allow* from outside, *Tap Continue and then click on Allow* | `06-dailyart-notifications.jpg` |
| 07 | Tempo · iOS | the real alert sitting over the app's own card: what the moment looks like once it lands | `07-tempo-real-box-over-drawn.jpg` |
| 08 | Strava · iOS | *Make sure you select "Allow" on the next step* under a sample notification; no drawn alert | `08-strava-notifications.jpg` |
| 09 | BeReal · iOS (shared, not on disk) | contacts sheet drawn at the bottom where the real one lands; finger half outside the edge pointing at *Allow Full Access* | — |
| 10 | ChatGPT · iOS (shared, not on disk) | alert drawn in place, small chevron under *Allow* | — |
| 11 | ReciMe · iOS (shared, not on disk) | *Tap **Allow** to get a reminder*: the word coloured like the drawn button | — |
| 12 | Jomo · iOS (shared, not on disk) | arrow from outside, curving onto the grey button because the right one is not the prominent one | — |
| 13 | Breathwrk · iOS | alert drawn in place inside a **frame drawn around it, outside its footprint**, so the frame still glows around the real alert; curved arrow from below up to *Allow* | `13-breathwrk-frame-and-arrow.png` |

Most apps that prime a permission (Vrbo, Brilliant, Luma, Noom, Zalando…) show sample notifications and a button; the
pointer-in-place apps are the minority, and the ones that work without reading.

## 1 · The idea

The app draws the system box on its own screen **at the exact size and position the real one will appear**, and puts the
pointer (a finger, or a highlight line) **just outside the box's footprint**. When the real box comes, it lands on top of
the drawn one, and the pointer is still visible beside it, now pointing at the real button. No app can draw over a system
permission box, but nothing stops it drawing around one.

## 2 · Idea vs expression

| Borrow | Leave |
| --- | --- |
| drawn box at the real box's size and place, so the real one replaces it in the same spot | iOS styling, emoji finger, Cal AI's and Sesame's type and colour |
| pointer outside the box's footprint (Cal AI: under it; Sesame: the line under it) | *Continue* (Sesame): a button that only opens the box |
| the right option marked before the box comes | English captions explaining the option |

## 3 · Against the expert

- **Reading.** Cal AI's finger needs no words. Sesame's caption does; for her it becomes the voice.
- **Tapping the picture.** Our earlier rehearsal failed because she tapped the drawn *Allow*. Here that tap is harmless:
  the real box arrives in the same spot within a second or two, and her next tap at the same place is the real *Allow*.
- **Android differs.** Buttons are stacked (*Allow* on top), the box is centred on stock Android and sits low on Samsung
  One UI, and the scrim dims our screen more than iOS does. The pointer goes in the margin beside the top button, large and
  bright, and the box's position is measured per maker and Android version.

## 3b · Drawn for Android (2026-11-05)

N1 draws the notification box at the real one's place (22.5, 272 on a 393 × 852 frame; *Allow* at 440–496). The Android margin beside the box is about 22 px, so a finger beside *Allow* is almost fully covered (tried, N2 showed a sliver). The pointer therefore starts **under** the box at its right corner, runs **up the margin** and ends in an arrowhead at the *Allow* row — the BeReal and Jomo move (from outside, onto the right button). L1 does the same on the taller location box. From Breathwrk: a 3 px `borderBrand` frame 9 px outside the box (it fits the margin) shows where the box is through the scrim; the pointer line runs just outside the frame.

## 4 · Tier

Tier 2 composition: the drawn box is the phone's own UI as a picture (as in the old rehearsal), the pointer is
`hand-pointing` (already an ask), the timing is the `Timer` ring. Fed `BUILD.md` § P (N1, N4, L1, L2).
