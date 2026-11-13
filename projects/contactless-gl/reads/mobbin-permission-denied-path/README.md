# Reference read — Mobbin → **the permission she denied, and the way back in**

Feeds `SCOPE.md` → *Design problems* § 1 (the OS dialog in a language she cannot read) and `TIERS.md` surfaces 4–7. Internal reference only: never published, never traced. Screenshots are the high-res Mobbin files, `<app>-<nn>.webp`, in flow order.

| | |
| --- | --- |
| Source | Mobbin, iOS catalogue (Mobbin has no Android catalogue — see *What Mobbin could not show*), searched by flow on 2026-11-04 |
| Searches | *driver app location permission always allow* · *delivery partner app notification permission* · *app location permission denied go to settings* · *background location permission explanation* · *delivery driver app location permission request screen before system dialog* · *location permission denied screen with go to settings button* · *DoorDash Dasher app permissions during onboarding* |
| Read | Claude (agent), 2026-11-04, every screen opened at full size; strings quoted verbatim |
| Skipped | Settings pages that only list toggles (Lyft Privacy, Blue Apron, Tide Guide, Vestiaire, TextNow, Claude app): consumer preference lists, not a denied path. Instagram *Sharing location* (a social feature, not a permission). Kept as files only where they add one fact (Lyft, Places, Grill'd) |

## Source table

| App | Flow | Mobbin URL | Screens | Files | Why it is here |
| --- | --- | --- | --- | --- | --- |
| DoorDash Dasher (worker) | Onboarding | https://mobbin.com/flows/00da93c5-c23b-4701-a51d-5b13fb2c2094 | 16 | `doordash-dasher-01…16` | The only worker-side onboarding with a permission step captured end to end |
| Grab Driver (worker) | Onboarding, screen 12 | https://mobbin.com/flows/c55815d6-5167-482f-86ec-83e99f6283e9 | 1 | `grab-driver-01` | The one real OS dialog in the set (*Don't Allow / Allow*) |
| KOHO | Verifying identity, screen 6 | https://mobbin.com/flows/7993e3d4-36ec-4d46-81ff-bd3c22d2762a | 1 | `koho-01` | A camera pre-prompt at the moment of need, with the honest line |
| Viator | Enabling a location permission | https://mobbin.com/flows/247308cf-b335-49b7-9644-bb99eabc7217 | 3 | `viator-01…03` | The settings-page **guide drawn as the real controls** |
| Polarsteps | Location services information | https://mobbin.com/flows/a5eeb480-1524-4a31-b819-5cc74f7fbef2 | 2 | `polarsteps-01…02` | Same idea as Viator: an *EXAMPLE* of the settings screen with the right row ticked |
| Swarm | Location access | https://mobbin.com/flows/78967bec-ed2a-4c51-83c7-d7706d879d6e | 3 | `swarm-01…03` | Shows **what stops working** per level, as a list with marks |
| Places | Permissions | https://mobbin.com/flows/00794d17-a8b0-43a9-8c44-0bb41e2662d8 | 2 | `places-01…02` | An in-app permissions page with *Allowed / Not allowed* state per row |
| Grill'd | Device permissions | https://mobbin.com/flows/dc3724e3-44a1-4989-b20a-1f83580d8314 | 2 | `grilld-01…02` | Same shape: per-permission card with *Enabled* and an **Update …** button |
| Zomato (India) | screen | https://mobbin.com/screens/010b165e-10fe-4665-8c15-fbb66f20d263 | 1 | `zomato-01` | Denied-state sheet with a **second path that still works** |
| Swiggy (India) | screen | https://mobbin.com/screens/5a7602c5-12a5-4076-a892-48e2e7db01fd | 1 | `swiggy-01` | Denied state as a quiet card over the map, search still works |
| foodpanda | screen | https://mobbin.com/screens/d24cbcca-bfd5-4722-81e8-6c1ac8d1ffd2 | 1 | `foodpanda-01` | *Go to Settings* + manual fallback |
| talabat | screen | https://mobbin.com/screens/20d7220e-b1bc-405b-8b86-aaf69eaa8570 | 1 | `talabat-01` | The settings **path written as text** (the failure to avoid) |
| Tinder | screen | https://mobbin.com/screens/979f2e22-862f-4ece-997b-095ad9345732 | 1 | `tinder-01` | Same failure: *Go to Settings > Tinder > Location > …* |
| Beli | screen | https://mobbin.com/screens/1820315c-e7e6-468f-8bea-711ed8dc3291 | 1 | `beli-01` | The clean pre-prompt: picture, benefit, **Allow location / Not now** |
| Wolt | screen | https://mobbin.com/screens/26742773-2c58-4848-85c2-9946961147a5 | 1 | `wolt-01` | Pre-prompt with two working paths (*Share location / Enter address manually*) |
| Meta AI | screen | https://mobbin.com/screens/38ef0daf-0879-41fc-9767-00a216a05e64 | 1 | `meta-ai-01` | *Open Settings* as the only button (upgrade to *Always Allow*) |
| Lyft | Background location sharing information | https://mobbin.com/flows/ef349bee-a635-4a28-b5b3-3bfe64507616 | 2 | `lyft-01…02` | The ×-close explanation screen with no action; an in-app level choice |
| Zesty · Posh · PayPal · Lex | screens | https://mobbin.com/screens/281cb1ee-3095-4ada-902c-10e24ff8bc01 · https://mobbin.com/screens/c82a302b-0a31-4547-961f-b03235750054 · https://mobbin.com/screens/99f9912d-7868-406d-9eed-fc3b85672d5a · https://mobbin.com/screens/4d2e0a34-7947-4293-828a-b421e44dfd85 | 1 each | `zesty-01` · `posh-01` · `paypal-01` · `lex-01` | The denied state as a full screen with *Skip for now*, as an EmptyState, with a list fallback, and as a Banner on the map |

Three or more apps read per question, worker-side first (DoorDash Dasher, Grab Driver), then the Indian consumer apps she already uses (Zomato, Swiggy), then the rest.

## Step 1 — what is there

### A. Before the OS dialog — the explanation screen

| # | File | App | Strings that matter (verbatim) | Regions |
| --- | --- | --- | --- | --- |
| A1 | `doordash-dasher-09` | DoorDash Dasher | *"Allow permissions for the best dashing experience"* · *"We'll need your help enabling the following"* · rows: *"Current location — Required to dash so we can tell you where to go!"* (green tick) · *"Push notifications — Enables critical alerts for deliveries, updated instructions, best times to earn, and more"* (no mark) · *"Personalized offers — Enables anonymized data collection to deliver the most relevant offers for you"* (red ✕, **Retry** pill) · Button **I'm ready** · ✕ top-left | Dark full screen · hand-with-phone illustration · 3-row list, each row carries its own state · one primary |
| A2 | `beli-01` | Beli | *"Use Beli anywhere"* · *"Beli needs location permission in order to provide maps and recommendations"* · **Allow location** · *Not now* (ghost) · back arrow | Illustration (map + pin) · title · one sentence · primary + ghost |
| A3 | `wolt-01` | Wolt | *"Let us know where you are 🙂"* · *"Share your delivery location or enter the address manually below to find the best places near you."* · **Share location** · **Enter address manually** (secondary) | Illustration · two buttons, both work |
| A4 | `koho-01` | KOHO (inside KYC) | *"Allow camera access"* · *"When prompted, you must enable camera access to continue"* · camera pictogram with tick · *"We can't verify you without your camera"* · **Enable camera** | Asked at the moment of need (just before the ID photo) |
| A5 | `lyft-01` | Lyft | ✕ · *"Ride with peace of mind — Lyft will collect your background location only from when you request a ride until drop-off…"* · *"You're in control — You can always turn off background location at any time…"* · *"We value your privacy"* · *Privacy policy →* | Text-only explanation, no action |
| A6 | `doordash-dasher-12` | DoorDash Dasher | *"Opt in to Dasher texts"* · *"Opt in to receive SMS messages via autodialer…"* · **Opt in** · **No thanks** | Snabbit-style consent (not an OS permission), two stacked buttons |

### B. The OS dialog itself

| # | File | App | Strings | Note |
| --- | --- | --- | --- | --- |
| B1 | `grab-driver-01` | Grab Driver | iOS dialog: *"Driver" Would Like to Access Your Motion & Fitness Activity* · *"Motion data improves the accuracy of the estimated time of arrival for your trip."* · **Don't Allow** · **Allow** | Appears over the map with no in-app preparation; the only captured OS dialog. It is in the phone's language (English here), two equal-weight buttons side by side |

### C. After *Don't allow* — the denied state

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| C1 | `zomato-01` | Zomato | sheet over the map: *"Location permission not enabled"* · *"Please enable location permission to give us your exact delivery address"* · **Enable device location** (red) · **Continue with Godrej BKC, G Block BK…** (outline) | The flow continues with what it has; the fix is primary, the fallback is explicit |
| C2 | `swiggy-01` | Swiggy | card over a greyed map: *"Get the fastest delivery"* · **Turn on device location** · search field *"Search an area or address"* still live below | Denied is a calm card, not a modal; the manual path stays open |
| C3 | `foodpanda-01` | foodpanda | *"Share your location to order with ease"* · *"Turn on Location Services in Settings or enter your address manually to find the best restaurants, shops, and deals near you"* · **Go to Settings** · **Enter address manually** | Full screen, 3D pin, two paths |
| C4 | `talabat-01` | talabat | sheet: *"Turn On Phone Location"* · *"Visit Settings > Privacy & Security > Location Services to turn it on…"* · **Go to Settings** | The path as a breadcrumb sentence |
| C5 | `tinder-01` | Tinder | *"Unable to connect"* · *"To use Tinder, you need to enable your location sharing…"* · *"Go to Settings > Tinder > Location > Enable Location While Using the App"* · **Open Settings** | Same breadcrumb failure; a dead end without the fix |
| C6 | `posh-01` | Posh | empty state: *"You do not have location permissions enabled."* · *"Either change your location filter or allow Posh to use your location."* · **Open App Settings** (gear icon) | Denied as an EmptyState in the list that needed it |
| C7 | `lex-01` | Lex | banner on the map: *"We can't find you on the map"* · *"Allow location access in settings to view events and others"* · **Go to Settings** | Denied as a Banner on the feature screen |
| C8 | `zesty-01` | Zesty | *"Turn on location to get the best results"* · *"Get local favorites that match your vibe."* · **Go to settings** · *Skip for now* | Settings as primary, skip as ghost |
| C9 | `paypal-01` | PayPal | *"Turn on location services to find nearby stores"* · **Turn on Location Services** · *See stores list* | Fix + the no-location path |
| C10 | `meta-ai-01` | Meta AI | *"Change location access to Always Allow"* · *"The Meta AI app needs Always Allow access to … while the app is closed…"* · **Open Settings** | Upgrade-the-level case (foreground → always), the one Snabbit needs for Shield |

### D. The settings-page guide — how to find the toggle

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| D1 | `viator-02` | Viator | sheet: *"Find experiences nearby."* · *"Activate your location permission to find the best experiences nearby that you'll love."* · *"1. In Settings select **Location**"* with a drawn row `[📍 Location]` · *"2. Then tap **While Using the App**"* with a drawn row `While using the app ✓` · **Turn on location permission** · *No, thanks* | The two settings rows are **drawn as they look on the phone**, with the one to tap outlined in green; then one button deep-links |
| D2 | `polarsteps-02` | Polarsteps | sheet: *"For Polarsteps to work you need to:"* · *"Tap "Location" and select "Always", in your phone settings"* · a boxed *EXAMPLE* showing `[Location ›]` → arrow → the list *Never / Ask next time / While using the app / **Always ✓*** · **Open phone settings** · ✕ | The whole settings list is reproduced, the right row ticked |
| D3 | `polarsteps-01` | Polarsteps | in the form: *"Travel Tracker ⓘ — Location services are turned off — you'll need to enable them to track your trip."* with a red ⚠ and the toggle off | The denied state surfaces as a warning on the row that needs it, before any sheet |
| D4 | `viator-01`, `viator-03` | Viator | before: a bare *Nearby* row; after returning from Settings: *"Nearby — Jakarta · Bandung · Semarang"* | On return the screen simply fills; no confirmation screen |

### E. Where she can see and change it later

| # | File | App | Strings | Regions |
| --- | --- | --- | --- | --- |
| E1 | `places-02` | Places | *Permissions* page: *"Location — Your location is used to improve search results…"* · row `Location  ✕ Not allowed ›` (red) · `Notifications  ✓ Allowed ›` (green) · `Contacts  ✓ Allowed ›` | One row per permission, state as icon + colour + word |
| E2 | `grilld-02` | Grill'd | *"Click below to update device permissions in your Settings app."* · card *Enabled / Push Notifications / Keep track of your order…* **UPDATE PUSH NOTIFICATIONS** · card *Enabled / Location Permissions / …* **UPDATE LOCATION** | Card per permission with a benefit line and one button |
| E3 | `swarm-02`, `swarm-03` | Swarm | *"Having location access set to **Always on** is highly recommended for the best experience."* · card `Never — Least recommended  [Edit]` · *"Features supported when location access is set to Never:"* · rows *Check In · Map · Timeline · Notifications*, each with a yellow **!** (Never) or a green ✓ (Always On) | The **consequence list**: what works at each level, as marks on the features she knows |
| E4 | `lyft-02` | Lyft | *Privacy*: *Background location sharing* toggle · radio *Share from request to drop-off* / *Share until pickup* · *Learn more ›* | Level choice inside the app, not only in OS settings |
| E5 | `doordash-dasher-10…16` | DoorDash Dasher | sign-up form, vehicle choice, *"Get ready to dash"* checklist with *Required* tags and *"Background check processing"* | Context: the permission step sits between OTP and the form, once, as a summary screen |

## Step 2 — what each flow is trying to do

**DoorDash Dasher** asks for everything once, on one dark screen, right after OTP — before she has seen the app do anything — and shows the result of each ask on the same screen (tick, nothing, ✕ + *Retry*). The screen is a *status board* as much as a prompt: it survives a denial without a second dialog. That is the idea worth keeping; the batching is the part `SCOPE.md` already rejected (open question 2).

**Viator and Polarsteps** solve the settings-page trip by **drawing the settings screen inside the app**: the exact row, the exact option, the one to tap marked. Then one button deep-links. Neither tells her a breadcrumb path; both show her the control she is about to see. This is the shape surface 5 is asking for, done with a static drawing instead of an animation.

**Zomato, Swiggy, foodpanda, Wolt** never make the denied state a dead end: the fix is primary and a working second path (type the address, keep the saved one) is always on the same screen. The map greys, the app keeps going (P5).

**Swarm** answers *why should I turn it on* with a list of the features she already uses and a mark per feature — the consequence as a picture, not a sentence.

**Places and Grill'd** give her a page where every permission has a state she can read at a glance and one button to change it, so the fix is never more than one tap from the app.

**talabat, Tinder, Meta AI** are the failure mode: a sentence of breadcrumbs (*Settings > Privacy & Security > Location Services*) and a single *Open Settings*. For a reader of English these work; for the expert they are three nouns she has never seen.

**Grab Driver** shows what the OS dialog looks like when nothing prepares her for it: two equal buttons, in the phone's language, over a map, with a reason written for a product manager.

## Step 3 — against the expert

| Symptom | Where | Breaks |
| --- | --- | --- |
| The settings path as a breadcrumb sentence (*Settings > Privacy & Security > Location Services*) | talabat C4, Tinder C5 | P1 — text carries the whole meaning; three English nouns she must find on a Xiaomi settings page in Hindi |
| Three permissions on one screen, asked before she has seen a job | DoorDash A1 | `permissions.md` rule 1 (ask at the moment of need); P2 one next action; SCOPE question 2 (answered: at the moment of need) |
| The reason is the mechanism, not the benefit (*"Enables anonymized data collection…"*, *"background location only from when you request…"*) | DoorDash A1, Lyft A5, Meta AI C10 | `permissions.md` § The sheet — title is the benefit, body is one sentence of why, never the how |
| *Required*, *you need to*, *you must*, *We can't verify you without your camera* | DoorDash A1, Tinder C5, KOHO A4, Polarsteps D2 | `permissions.md` § Copy — never *required / mandatory / the app needs / you must* |
| Two equal buttons side by side in the OS dialog (*Don't Allow · Allow*) | Grab B1 | P3 — mirrored targets, a mis-tap costs the feature; nothing the app can restyle, so the sheet before it must **name the button she will see** |
| *OK* on the time-out dialog; *Continue*, *I'm ready* as labels | Grab, DoorDash | `content.md` § 9 banned list; `button.md` verbs |
| Emoji in copy (*"Let us know where you are 🙂"*) | Wolt A3 | `content.md` — no emoji as content |
| Red ✕ + *Retry* as the denied mark, with no reason | DoorDash A1 | P5 — says *that* it failed, not *what to do*; P6 no red shouting |
| The settings guide is a static drawing of **iOS**; on her phone the page looks different per maker | Viator D1, Polarsteps D2 | SCOPE ask 2 — the guide must be per maker (Xiaomi, Samsung, Vivo, Oppo, Realme), which is why it is a HowToClip, not a drawing |
| Text-only explanation screen with no action (*Privacy policy →*) | Lyft A5 | P2 — a screen with no next action |

**What they get right, to keep**

- **A working second path on the denied screen** (Zomato C1, Swiggy C2, foodpanda C3, Wolt A3, PayPal C9): the fix is primary, the no-permission path is a real button, the flow continues. Matches `permissions.md` (*Not now always works*; city asked manually).
- **The settings control drawn as she will see it, with the right option marked** (Viator D1, Polarsteps D2). This is the picture-not-sentence answer to the breadcrumb problem (P1) and the base of surface 5.
- **The state board** (DoorDash A1, Places E1, Grill'd E2): per permission, state by icon + colour + word, one button each. P1 row 4 (two channels per state) is already satisfied; it is the shape of an in-app *Permissions* page.
- **The consequence as marks on features she knows** (Swarm E3): *Check in ✓ / Map ✓ / Notifications !* says what she loses without a paragraph.
- **On return from Settings the screen just fills** (Viator D4): no *Permission granted* screen. Matches `permissions.md` (*allowed → the flow continues with no confirmation*).
- **Denied surfaces on the row that needs it** (Polarsteps D3, Lex C7): a warning on the feature, where she will look, not a modal.
- **Camera asked at the moment of need, inside KYC** (KOHO A4): the right moment; only the copy is wrong.

## Step 4 — tier and system map

| Region (reference) | What it is in the system | Tier |
| --- | --- | --- |
| Pre-prompt: picture + benefit + **Allow …** / *Not now* (Beli A2, Wolt A3, KOHO A4) | **BottomSheet `permission`** exactly as `permissions.md` § The sheet (scene asset 160, Heading3 benefit, BodyLg one sentence, Button primary L **Allow location**, Button ghost L **Not now**), spoken on open | 1 — exists |
| The second path on the pre-prompt (*Enter address manually*) | The `permission` sheet's **Not now** → the manual step (`onboarding.md` § 2: city asked in step 3). No new control | 1 — exists |
| Denied state as a card over the feature (Swiggy C2, Lex C7, Polarsteps D3) | **Banner `warning`** on the screen that needs it, with the fix Button (`permissions.md` fallback rows) | 1 — exists |
| Denied state as a sheet with fix + fallback (Zomato C1, foodpanda C3) | **BottomSheet `permission`**, permanently-denied form: body + *Turn it on in Settings — we'll bring you back*, Button **Open settings**, ghost **Not now** / the manual path | 1 — exists (`permissions.md` § Permanently denied) |
| Denied state inside a list that needed it (Posh C6) | **EmptyState `error`** with one recovery Button **Open settings** | 1 — exists |
| The settings screen drawn with the right row marked (Viator D1, Polarsteps D2) | **HowToClip `guide`** on the permanently-denied sheet — a 12 s clip of *her phone maker's* settings page with the toggle circled (SCOPE ask 2). The static drawing is the fallback frame of the clip, never a numbered list of sentences (P1) | core change — ask 2 |
| *1. … 2. …* numbered steps under the drawing (Viator D1) | **Not borrowed.** P1 — a sequence is a sequence of frames in the clip, not two numbered lines | — |
| Per-permission state board (DoorDash A1, Places E1, Grill'd E2) | **ListItem `navigational`** rows with a leading pictogram and a trailing **Tag** (`success` *Allowed* · `warning` *Not yet*), one row per permission, on a *Permissions* page in Profile → each row opens its `permission` sheet. Composition of core parts | 2 — composition |
| Consequence list with marks (Swarm E3) | **ListItem `informational`** rows (Check in · Map · Jobs) with a trailing Tag `success` / `warning` — the body of the *Keep the safety team listening* (always-on) sheet when she picked *While using* | 2 — composition |
| Breadcrumb sentence (talabat C4, Tinder C5) | **Not borrowed** (P1) | — |
| The real OS dialog (Grab B1) | Not ours to draw. The `permission` sheet's **Allow …** label and its scene asset show the dialog's *Allow* button so the next tap is recognisable (SCOPE § Design problems 1) | — |
| Explanation-only screen (Lyft A5) | Not borrowed; the *why* lives behind Listen / the sheet's one sentence | — |

## Step 5 — what travels to contactless-gl

| Surface | Base here | What changes for contactless |
| --- | --- | --- |
| 4 · permission asks, one per screen | Beli A2, Wolt A3, KOHO A4 → `permission` sheet | Convention confirmed: picture, benefit title, one sentence, **Allow …** + *Not now*; asked at the moment of need (SCOPE q2) — notifications before phone entry, location at the hood pick, camera at the selfie, contacts at *Pick from contacts* (q4). The sheet's scene asset shows the phone's *Allow* button so the OS dialog that follows is recognisable (P1) |
| 5 · settings-page guide per maker | Viator D1, Polarsteps D2 (drawn control, right row marked) | Same idea, as a HowToClip `guide` per maker on the permanently-denied sheet (ask 2); the clip's poster frame is the Viator-style drawing of *her* maker's page with the toggle circled; no numbered lines (P1) |
| 6 · floating PiP guide | — no base; nothing on Mobbin floats over Settings | Confirms q3's answer: the in-app clip before she leaves, then **Open settings**, then a check on return (Viator D4: the screen fills, no confirmation) |
| 7 · denied twice → explain once, guide, *Call support* | DoorDash A1 (state survives on screen), Zomato C1 / Swiggy C2 (fix + fallback, flow continues), Swarm E3 (consequence as marks) | Denied once → Banner `warning` with the fix on the screen that needs it; denied again / *Don't ask again* → the permanently-denied sheet with the clip and **Open settings**; Help stays in the header throughout (q6). The ✕ + *Retry* mark is replaced by the reason and one recovery (P5) |
| 8 · language from any screen | — | Not shown; nothing here. The OS dialog does not follow the in-app language (B1 is in the phone's language) — this is the design problem, not a surface |
| 45 · *Call for help* on day-one Home | — | Not in these flows |
| (new, Profile) a *Permissions* page | Places E1, Grill'd E2 | A ListItem list with state Tags, one row per permission, each opening its sheet — so a fix is one tap from the app on any day, not only during onboarding. Propose as a composition in `patterns/permissions.md`; not in TIERS.md yet |

Surfaces with **no base** in these flows: 6 (nothing floats), 8 (no app changed language mid-permission), and the Android *Don't ask again* path — no Android screens exist on Mobbin.

## Step 6 — convention vs choice

**Convention (three or more do it — keep it, she may know it from Zomato and Swiggy):**

- Before the OS dialog: a picture, a benefit line, one **Allow** button and a quiet *Not now* (Beli, Wolt, KOHO, Zesty, foodpanda).
- After a denial the flow does not stop: the fix is primary and a manual path is a real button on the same screen (Zomato, Swiggy, foodpanda, Wolt, PayPal).
- The way back is one deep-link button named *Open settings / Go to settings*, never a menu (every denied screen in the set).
- On return from Settings nothing is confirmed; the feature just works (Viator, Swiggy, Zomato).
- A permissions state page exists somewhere in the app with per-row *Allowed / Not allowed* (Places, Grill'd, DoorDash's board, Lyft, Swarm).

**Choice (one app does it — borrow with a reason):**

- Viator / Polarsteps draw the settings control with the right option marked: borrowed, because it is the picture that replaces the breadcrumb sentence (P1) and it is the shape of surface 5.
- Swarm's consequence list with marks: borrowed for the always-on ask only, because *what you lose* as marks on Check in / Map / Jobs is shorter than any sentence (P1, P5).
- DoorDash's one-screen batch with per-row state: the batching is rejected (SCOPE q2); the *state survives on the screen* idea is kept as the Banner / Tag rows.
- Zomato's *Continue with <saved address>* as the fallback label: borrowed as the pattern for *Not now* that names what she keeps (*Keep Koramangala*), because a fallback that says its outcome is a verb (`button.md`).
- talabat / Tinder breadcrumb text, Lyft's text-only screen, Meta AI's *needs Always Allow*: not borrowed (P1, P2, `permissions.md` § Copy).

## What Mobbin could not show

- **No Android.** Mobbin's catalogue is iOS and web; there is no Xiaomi / Samsung / Vivo / Oppo / Realme settings page, no *Don't ask again* dialog, no *Allow only while using the app / Only this time* three-button dialog. The five makers' real dialogs and settings pages must be photographed from devices (SCOPE § Design problems 1 → *Research input*).
- **No in-app language switch** affecting a permission flow; no permission flow in an Indic script.
- **No worker-side app** was captured asking for a permission at the moment of need — DoorDash batches, Grab shows the bare OS dialog. The moment-of-need convention is from consumer apps (Zomato, Swiggy, KOHO).
- **No animation / clip** guiding to a settings page — only static drawings (Viator, Polarsteps). The per-maker HowToClip remains an ask of core with no shipped precedent here.
