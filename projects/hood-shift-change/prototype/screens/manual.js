/* Manual pickers — she picks instead of speaking. Figma V4 rev 2026-10-21 (cIAH24e13VZJu31OmiMWrj, section V4 481:36972), frame by frame:
   Row "Manual enter" (y 8417): M1 · Pick your area, 1/3 (481:37876 / 481:38383) → M4 · Select shift time = hours 4 · 6 · 8 · 10 (481:38664)
     → M2 · Select shift start time 9AM–12PM (481:38530) → L 1.05 (481:41838) → the lane's results. No end step.
     Progress follows the step order (area 1/3 · hours 2/3 · start 3/3); the frames draw hours 3/3 and start 2/3, left from the V4 order (start before hours).
   Opened from the read-back S1b (each Confirm returns to it): M1a · Modify areas (481:40333) · M4a · Shift hours 4 · 6 · 8 · 10 · 12 (492:51101)
     · M2a · Select shift start time (492:50895). The end-time pickers (492:50998 / 492:49766) are gone.
   Saathi's orb listens on every picker.
   Every confirm writes state.ask the way the voice path does: ask.hours (exact hours, the source of truth), ask.time { start, end = start + hours } (24 h),
     ask.places / place / samePlace. ask.hoursRange is no longer written. */
(() => {
  const R = App.register, D = Data, esc = C.esc;
  const L = { picks: [], query: '', start: 9, hours: 8 };   // lane-local, seeded from state.ask on entry
  const MAX = 3;
  const NEAR = [{ name: 'Agara', km: '1.8 km', key: 'Agara' }, { name: 'HSR Layout', km: '2.1 km', key: 'HSR' }, { name: 'Bellandur', km: '3.4 km', key: 'Bellandur' }, { name: 'Koramangala', km: '4.0 km', key: 'Koramangala' }, { name: 'Sarjapur Road', km: '5.2 km', key: 'Sarjapur Road' }];
  const her = () => ({ name: D.her.area, km: String(D.her.km).split(' from')[0], key: D.her.area });
  const SAY_MOD = 'ठीक है, यहाँ बदल लीजिए।';

  /* ---------- chrome: TopNav with the title (18 semibold), no slot; gray-50 top; Confirm in a white band ---------- */
  const nav = title => C.topNav({ title });
  const progress = n => `<div class="m-progress">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
  const confirmBar = () => C.actions(C.button('Confirm', { act: 'primary' }));
  const askCopy = ctx => Object.assign({}, ctx.state.ask);
  const laneFor = ask => ask.friend ? 'C' : (ask.place ? 'HT' : 'T');
  const back = ctx => { ctx.back(); return true; };
  const h12 = h => `${h % 12 || 12}${h < 12 || h === 24 ? 'AM' : 'PM'}`;   // the frames' "9AM" / "5PM"
  const timeOf = ask => ask.time ? { start: ask.time.start, end: ask.time.end } : { start: D.her.time.start, end: D.her.time.end };
  const hoursOf = ask => ask.hours || (timeOf(ask).end - timeOf(ask).start) || D.her.hours;

  // the typed summary that stands in for a transcript on S1b / 1.05: "HSR · 9 AM – 5 PM · 8 hrs"
  const summary = ask => { const place = ask.friend ? `${D.friend.first} · ${ask.friend.id || ''}`.trim() : (ask.samePlace || !ask.place ? D.her.area : (ask.places && ask.places.length ? ask.places.join(' · ') : ask.place));
    return `${place} · ${D.fmt(timeOf(ask))} · ${hoursOf(ask)} hrs`; };
  // land on S1b with the ask rewritten; the M screens (and a stale S1b) leave the back stack so Back from S1b goes where it did before
  const finish = ctx => { const ask = ctx.state.ask; if (!ask.transcript) ask.transcript = summary(ask);
    ctx.go('S1b', { ask, lane: laneFor(ask), pick: { area: null, hood: null, time: null } });
    const h = ctx.state.history; while (h.length && (/^M\d/.test(h[h.length - 1]) || h[h.length - 1] === 'S1b')) h.pop(); };
  // the "Manual enter" row ends at 1.05 Finding work (L), which opens the lane's results
  const search4 = ctx => { const ask = ctx.state.ask; ask.transcript = summary(ask);
    ctx.go('L', { ask, lane: laneFor(ask), intent: ask.place ? 'hood' : 'time', pick: { area: null, hood: null, time: null } }); };

  /* ---------- M1 · M1a · the area list. M1 (V4 rev 481:37876 / 481:38383): "Your area" is her own area as a plain row (pin · name · km, no checkbox,
     list border gray-100, header 12 over it); "Areas near your home" carries the checkboxes. M1a Modify areas (481:40333) is unchanged. ---------- */
  const seedPicks = (ask, modify) => { L.query = ''; L.picks = ask.places ? ask.places.slice(0, MAX) : (ask.place ? [D.findArea(ask.place) ? D.findArea(ask.place).name : ask.place] : (ask.samePlace ? [D.her.area] : []));
    if (!modify) L.picks = L.picks.filter(k => k !== D.her.area); };
  const picked = key => L.picks.includes(key);
  const toggle = key => { const i = L.picks.indexOf(key); if (i >= 0) L.picks.splice(i, 1); else if (L.picks.length < MAX) L.picks.push(key); else return false; return true; };
  const commitPlace = ctx => { const ask = askCopy(ctx), others = L.picks.filter(k => k !== D.her.area);
    ask.places = L.picks.slice(); ask.subhood = null;
    if (others.length) { ask.place = others[0]; ask.samePlace = false; } else { ask.place = null; ask.samePlace = true; }
    if (!ask.time) ask.time = timeOf(ask); ask.hours = hoursOf(ask); delete ask.hoursRange;
    ctx.set({ ask }); };
  const row = (a, modify) => { const on = picked(a.key), off = !on && L.picks.length >= MAX;
    return `<div class="m-row ${on ? 'on' : ''} ${off ? 'off' : ''} ${modify ? 'modify' : ''}" data-act="pick" data-key="${esc(a.key)}" data-name="${esc(a.name)}"><span class="m-cb">${C.icons['check']}</span><span class="pin">${C.icons['map-pin']}</span><span class="name">${esc(a.name)}</span><span class="km">${esc(a.km)}</span></div>`; };
  const list = (rows, modify) => `<div class="m-list">${rows.map(a => row(a, modify)).join('')}</div>`;
  const herRow = a => `<div class="m-list m-own"><div class="m-row own" data-name="${esc(a.name)}"><span class="pin">${C.icons['map-pin']}</span><span class="name">${esc(a.name)}</span><span class="km">${esc(a.km)}</span></div></div>`;
  const search = () => `<div class="m-search">${C.icons['magnifying-glass']}<input class="m-q" type="search" placeholder="Search an area or landmark" value="${esc(L.query).replace(/"/g, '&quot;')}" autocomplete="off" autocorrect="off" spellcheck="false"></div>`;
  // G4: progress · search · "Your area" · "Areas near you" (gap 16 throughout). Modify areas: no progress; each header sits 12 over its list.
  const section = (title, rows, modify) => modify ? `<div class="m-group"><div class="m-sec"><span class="t">${title}</span></div>${list(rows, modify)}</div>` : `<div class="m-sec"><span class="t">${title}</span></div>${list(rows, modify)}`;
  const areaBody = modify => `<div class="body m-body m-area ${modify ? 'm-plain' : ''}">${modify ? '' : progress(1)}<div class="m-stack">${search()}
      ${modify ? section('Your area', [her()], modify) : `<div class="m-group"><div class="m-sec"><span class="t">Your area</span></div>${herRow(her())}</div>`}
      ${section(modify ? 'Areas near you' : 'Areas near your home', NEAR, modify)}</div></div>`;
  // the search filters the drawn rows in place (no rerender, so the field keeps focus); a rerender re-applies it
  const applyFilter = () => { const q = L.query.trim().toLowerCase();
    document.querySelectorAll('.m-list').forEach(l => { let n = 0; l.querySelectorAll('.m-row').forEach(r => { const hit = !q || r.dataset.name.toLowerCase().includes(q); r.hidden = !hit; if (hit) n++; }); l.hidden = !n; const sec = l.previousElementSibling; if (sec && sec.classList.contains('m-sec')) sec.hidden = !n; });
    document.querySelectorAll('.m-group').forEach(g => { const l = g.querySelector('.m-list'); g.hidden = !!(l && l.hidden); }); };
  const bindSearch = () => { const inp = document.querySelector('.m-q'); if (inp) inp.oninput = () => { L.query = inp.value; applyFilter(); }; };
  const paint = ctx => { ctx.rerender(); bindSearch(); applyFilter(); };
  // a place she says: tick it if it is on the list
  const hearPlace = (u, ctx) => { const key = u.samePlace ? D.her.area : (u.place ? ((D.findArea(u.place) || {}).name || u.place) : null); if (!key) return false;
    if (key === D.her.area && App.current === 'M1') { L.picks = []; paint(ctx); ctx.listen(); return true; }   // M1: her own area is not a pick — it clears the others (she stays)
    const known = key === D.her.area || NEAR.some(a => a.key === key);
    if (!known) { ctx.say(`${key} इस list में नहीं है। आप Agara, HSR, Bellandur, Koramangala या Sarjapur Road चुन सकती हैं।`).then(() => ctx.listen()); return true; }
    if (!picked(key) && !toggle(key)) { ctx.say('आप तीन से ज़्यादा area नहीं चुन सकतीं। पहले एक हटा दीजिए।').then(() => ctx.listen()); return true; }
    paint(ctx); ctx.listen(); return true; };
  const areaHear = (next) => (u, ctx) => {
    if (u.place || u.samePlace) return hearPlace(u, ctx);
    if (u.affirm) { next(ctx); return true; }
    if (u.negate || u.back) return back(ctx);
    return false; };
  const areaAct = (next) => (name, el, ctx) => {
    if (name === 'pick') { if (toggle(el.dataset.key)) paint(ctx); }
    if (name === 'primary') next(ctx); };
  const m1Next = ctx => { commitPlace(ctx); ctx.go('M4'); };
  R({ id: 'M1', scriptKey: 'M1',
    render: () => `${nav('Pick your area')}${areaBody(false)}${confirmBar()}`,
    onEnter: ctx => { seedPicks(ctx.state.ask, false); paint(ctx); },
    say: () => 'आप जिस area में काम करना चाहती हैं, उसे चुन लीजिए। आप तीन तक चुन सकती हैं।',
    hear: areaHear(m1Next),
    act: areaAct(m1Next)
  });
  const m1aNext = ctx => { commitPlace(ctx); finish(ctx); };
  R({ id: 'M1a', scriptKey: 'M1a', orb: 'hidden', allowNewAsk: false,
    render: () => `${nav('Modify areas')}${areaBody(true)}${confirmBar()}`,
    onEnter: ctx => { seedPicks(ctx.state.ask, true); paint(ctx); },
    say: () => SAY_MOD,
    hear: areaHear(m1aNext),
    act: areaAct(m1aNext)
  });

  /* ---------- the one-choice list (492:51101 / 492:50895 and their manual twins 481:38664 / 481:38530): body p16 (manual pt 8, progress then gap 16),
     cards gap 12 — white, r12, p16, radio 20 + 16/24 medium gray-800; idle border 1.5 gray-100, chosen 2 pink-600 ---------- */
  const opt = (k, label, on) => `<div class="m-opt ${on ? 'on' : ''}" data-act="opt" data-k="${esc(String(k))}"><span class="radio ${on ? 'on' : ''}"></span><span class="t">${esc(label)}</span></div>`;
  const optBody = (step, items) => `<div class="body m-body m-pick ${step ? '' : 'm-plain'}">${step ? progress(step) : ''}<div class="m-opts">${items.join('')}</div></div>`;
  const firstNum = s => { const m = String(s || '').match(/(\d{1,2})/); return m ? +m[1] : null; };
  // she keeps her hours when the start moves, and her start when the hours move: end = start + hours, always
  const writeTime = (ctx, start, hours) => { const ask = askCopy(ctx); delete ask.hoursRange;
    ask.hours = hours; ask.time = { start, end: start + hours }; ask.part = null; ctx.set({ ask }); };

  /* start time · 9AM 10AM 11AM 12PM */
  const STARTS = [9, 10, 11, 12];
  const startBody = step => optBody(step, STARTS.map(h => opt(h, h12(h), L.start === h)));
  const seedStart = ask => { const s = timeOf(ask).start; L.start = STARTS.includes(s) ? s : STARTS[0]; };
  const commitStart = ctx => writeTime(ctx, L.start, hoursOf(ctx.state.ask));
  const startHear = next => (u, ctx) => {
    let n = u.time ? u.time.start : null; if (n == null && !u.hours) { const x = firstNum(u.text); if (x) n = x === 12 ? 12 : (x <= 8 ? x + 12 : x); }
    if (n != null && STARTS.includes(n)) { L.start = n; ctx.rerender(); ctx.listen(); return true; }
    if (n != null) { ctx.say('आप सुबह 9, 10, 11 या दोपहर 12 बजे से शुरू कर सकती हैं।').then(() => ctx.listen()); return true; }
    if (u.affirm) { next(ctx); return true; }
    if (u.negate || u.back) return back(ctx);
    return false; };
  const SAY_START = 'आप कितने बजे से काम शुरू करना चाहती हैं। सुबह 9, 10, 11 या दोपहर 12 बजे।';

  /* shift hours · exact: 4 · 6 · 8 · 10 · 12 hours (S1b's Shift hours, 492:51101); the manual row's Select shift time draws 4 · 6 · 8 · 10 (481:38664) */
  const HOURS_S1B = [4, 6, 8, 10, 12], HOURS_ROW = [4, 6, 8, 10];
  const hoursBody = (step, list) => optBody(step, list.map(h => opt(h, `${h} hours`, L.hours === h)));
  const nearestIn = (list, h) => list.reduce((b, x) => Math.abs(x - h) < Math.abs(b - h) ? x : b, list[0]);
  const seedHours = list => ask => { L.hours = nearestIn(list, hoursOf(ask)); };
  const commitHours = ctx => writeTime(ctx, timeOf(ctx.state.ask).start, L.hours);
  const hoursHear = (list, next) => (u, ctx) => {
    const n = u.hours || (!u.time ? firstNum(u.text) : null);
    if (n && list.includes(n)) { L.hours = n; ctx.rerender(); ctx.listen(); return true; }
    if (n) { ctx.say(`आप ${list.slice(0, -1).join(', ')} या ${list[list.length - 1]} घंटे चुन सकती हैं।`).then(() => ctx.listen()); return true; }
    if (u.affirm) { next(ctx); return true; }
    if (u.negate || u.back) return back(ctx);
    return false; };
  const sayHours = list => `आप दिन में कितने घंटे काम करना चाहती हैं। ${list.slice(0, -1).join(', ')} या ${list[list.length - 1]} घंटे।`;

  const pickAct = (set, next) => (name, el, ctx) => { if (name === 'opt') { set(el.dataset.k); ctx.rerender(); } if (name === 'primary') next(ctx); };
  const setStart = k => { L.start = +k; }, setHours = k => { L.hours = +k; };
  const seeded = seed => ctx => { seed(ctx.state.ask); ctx.rerender(); };

  /* manual row: M1 area (1/3) → M4 hours (2/3) → M2 start (3/3) → L */
  const m4Next = ctx => { commitHours(ctx); ctx.go('M2'); };
  const m2Next = ctx => { commitStart(ctx); search4(ctx); };
  R({ id: 'M4', scriptKey: 'M4', allowNewAsk: false, render: () => `${nav('Select shift time')}${hoursBody(2, HOURS_ROW)}${confirmBar()}`,
    onEnter: seeded(seedHours(HOURS_ROW)), say: () => sayHours(HOURS_ROW), hear: hoursHear(HOURS_ROW, m4Next), act: pickAct(setHours, m4Next) });
  R({ id: 'M2', scriptKey: 'M2', allowNewAsk: false, render: () => `${nav('Select shift start time')}${startBody(3)}${confirmBar()}`,
    onEnter: seeded(seedStart), say: () => SAY_START, hear: startHear(m2Next), act: pickAct(setStart, m2Next) });

  /* from the read-back's tiles: M4a Shift hours · M2a start, each Confirm → S1b with ask.hours / ask.time rewritten */
  const m4aNext = ctx => { commitHours(ctx); finish(ctx); };
  const m2aNext = ctx => { commitStart(ctx); finish(ctx); };
  R({ id: 'M4a', scriptKey: 'M4a', allowNewAsk: false, render: () => `${nav('Shift hours')}${hoursBody(0, HOURS_S1B)}${confirmBar()}`,
    onEnter: seeded(seedHours(HOURS_S1B)), say: () => sayHours(HOURS_S1B), hear: hoursHear(HOURS_S1B, m4aNext), act: pickAct(setHours, m4aNext) });
  R({ id: 'M2a', scriptKey: 'M2a', allowNewAsk: false, render: () => `${nav('Select shift start time')}${startBody(0)}${confirmBar()}`,
    onEnter: seeded(seedStart), say: () => SAY_START, hear: startHear(m2aNext), act: pickAct(setStart, m2aNext) });
})();
