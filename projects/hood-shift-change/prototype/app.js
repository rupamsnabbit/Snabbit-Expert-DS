/* App: state, router, the voice loop every screen shares, and the dev switch.
   A screen is { id, render(ctx) → html, say(ctx) → string|null, hear(u, ctx) → true|false, act(name, el, ctx), onEnter(ctx), auto: {ms, to}, orb: 'hidden'|'raised'|undefined, listen: false }
   ctx = { state, data, go, back, say, listen, toast, set, rerender, open sheet helpers } */
window.App = (() => {
  const A = { screens: {}, state: null, current: null, ctx: null, sheet: null, timers: [] };
  const $ = sel => document.querySelector(sel);

  A.initial = () => ({ lane: 'HT', mode: 'open', voice: 'real', screen: 'entry',
    ask: { place: null, subhood: null, time: null, friend: null, samePlace: false, transcript: '' },
    pick: { area: null, hood: null, time: null }, waitlisted: null, joined: false, booked: null, misses: 0, history: [], seenVideo: false, friendConfirmed: false, idInput: '',
    withFriend: false, idMisses: 0, move: null, homeDay: 'booked', coachSeen: false });   // V3: the friend question, Expert ID misses, the booked move and the hand-hold day shown on Home

  A.register = def => { A.screens[def.id] = def; };
  A.set = patch => { Object.assign(A.state, patch); };

  /* ---------- navigation ---------- */
  A.go = (id, patch, opts = {}) => {
    const def = A.screens[id]; if (!def) { A.toast('No screen ' + id); return; }
    A.clearTimers(); Voice.cancel(); Voice.stopListening(); A.closeSheet(true); if (window.Coach) Coach.hide(true);
    if (patch) A.set(patch);
    if (A.current !== id) A.state.bannerHidden = null;
    if (!['N1', 'N2', 'N3', 'N4', 'F3'].includes(id)) A.state.deckStage = 'g0';   // leaving the guide: the deck is dealt again next time
    if (A.current && !opts.replace && A.current !== id) A.state.history.push(A.current);
    A.current = id; A.state.screen = id; A.state.misses = 0;
    A.render();
    if (def.onEnter) def.onEnter(A.ctx);
    if (def.auto && !def.say) A.after(def.auto.ms, () => A.go(def.auto.to, def.auto.patch));   // a screen that speaks advances after its line (see voiceLoop)
    A.voiceLoop();
  };
  A.back = () => { const prev = A.state.history.pop(); if (prev) A.go(prev, null, { replace: true }); else A.go('entry', null, { replace: true }); };
  A.after = (ms, fn) => { const t = setTimeout(fn, ms); A.timers.push(t); return t; };
  A.clearTimers = () => { A.timers.forEach(clearTimeout); A.timers = []; };

  A.render = () => {
    const def = A.screens[A.current];
    const host = $('#screen'); host.innerHTML = `<div class="screen ${def.white ? 'white' : ''}" data-screen="${def.id}">${def.render(A.ctx)}</div>`;
    // the deck deals from where the previous screen left it: render at the old stage, then move to the new one
    const deck = host.querySelector('.deck[data-to]');
    if (deck) { const to = deck.dataset.to; if (!deck.classList.contains(to)) { const sc = host.querySelector('.screen'); if (sc && !deck.classList.contains('g0')) sc.style.animation = 'none'; requestAnimationFrame(() => requestAnimationFrame(() => { deck.className = 'deck ' + to; })); } }
    const orb = $('#orb'); orb.className = 'orb ' + (A.orbState || 'idle') + (def.orb === 'hidden' ? ' hidden' : '') + (def.orb === 'raised' ? ' raised' : '') + (def.orb === 'small' ? ' small' : '') + (def.orb === 'lift' ? ' lift' : '');
  };
  A.rerender = () => { if (A.sheet) return; const top = (document.querySelector('#screen .body, #screen .profile') || {}).scrollTop || 0; A.render(); const sc = document.querySelector('#screen .screen'); if (sc) sc.style.animation = 'none'; const b = document.querySelector('#screen .body, #screen .profile'); if (b) b.scrollTop = top; };   // in-place update: no fade, keep scroll

  /* ---------- sheets ---------- */
  A.openSheet = (html, handlers = {}) => {
    A.closeSheet(true);
    const w = document.createElement('div'); w.className = 'sheet-wrap'; w.innerHTML = `<div class="dim" data-act="sheet-dismiss"></div><div class="sheet">${html}</div>`;
    $('#stage').appendChild(w); A.sheet = { el: w, handlers };
  };
  A.closeSheet = silent => { if (A.sheet) { A.sheet.el.remove(); const h = A.sheet.handlers; A.sheet = null; if (!silent && h.onClose) h.onClose(); } };

  /* ---------- toast ---------- */
  A.toast = (msg, ms = 1800) => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(A._toastT); A._toastT = setTimeout(() => t.classList.remove('show'), ms); };

  /* ---------- voice loop: say the screen's line, then listen, then route ---------- */
  A.orb = s => { A.orbState = s; const o = $('#orb'); if (o) { o.classList.remove('idle', 'speaking', 'listening', 'thinking'); o.classList.add(s); } document.querySelectorAll('.mic-wrap').forEach(m => m.classList.toggle('live', s === 'listening')); };
  Voice.onState = A.orb;
  A.say = async text => { if (!text) return; A.lastSaid = text; await Voice.speak(text); };
  A.gen = 0;
  A.voiceLoop = async () => {
    const def = A.screens[A.current]; const gen = ++A.gen;
    const line = def.say ? def.say(A.ctx) : null;
    if (line) await A.say(line);
    if (gen !== A.gen) return;
    if (def.auto && def.say) { A.after(def.auto.pause ?? 700, () => A.go(def.auto.to, def.auto.patch)); return; }   // never cut her off: next card after the line, plus a beat
    if (def.listen === false) return;
    A.listenOnce(gen);
  };
  A.listenOnce = async (gen) => {
    const def = A.screens[A.current];
    const scripted = (Data.script[A.state.lane] || {})[def.scriptKey || def.id] || '';
    if (Voice.mode === 'script' && !scripted) { A.orb('idle'); return; }   // nothing scripted here: wait for a tap
    const text = await Voice.listen({ interim: t => def.interim && def.interim(t, A.ctx), scripted, timeout: def.listenMs || 7000 });
    if (gen !== A.gen) return;
    if (Voice.lastError === 'not-allowed') { Voice.lastError = null; A.toast('Microphone blocked — allow it in the site settings'); return; }
    A.route(text);
  };
  A.route = async (text) => {
    const def = A.screens[A.current];
    const u = Voice.parse(text, { hours: Data.her.hours });
    A.lastHeard = u;
    if (u.empty) { A.orb('idle'); return; }                 // silence is not a miss: she waits quietly; the orb re-arms the mic
    if (def.hear && def.hear(u, A.ctx)) return;           // the screen answered it
    if (window.Filters && Filters.hear(u)) return;          // "6 ghante wala" on a results screen narrows the list
    if (u.back) return A.back();
    if (u.home) return A.go('entry');
    if (u.question === 'money' || u.question === 'distance' || u.question === 'when') { await A.say(A.answer(u)); return A.listenOnce(A.gen); }
    if (u.newAsk && def.allowNewAsk !== false) { return A.newAsk(u); }
    return A.miss();
  };
  A.miss = async () => {
    A.state.misses++;
    if (A.state.misses === 1) { await A.say('माफ़ कीजिए, मैं ठीक से समझ नहीं पाई। क्या आप एक बार फिर से बता सकती हैं।'); return A.listenOnce(A.gen); }
    await A.say('कोई बात नहीं। आप screen पर tap करके भी चुन सकती हैं।'); A.orb('idle');
  };
  // say-only answers, numbers from Data
  A.answer = u => {
    const p = A.state.pick, h = p.hood, t = p.time;
    if (u.question === 'money') { const pay = (t && t.pay) || (h && h.times && h.times[0].pay) || Data.her.pay; return `यहाँ आपको महीने के ${pay.toLocaleString('en-IN')} रुपये तक मिल सकते हैं।`; }
    if (u.question === 'distance') { return h ? `${h.name} आपसे ${h.km.replace('from', 'से')} दूर है।` : 'सबसे पास Agara है, आपसे 1.8 किलोमीटर दूर।'; }
    if (u.question === 'when') return `यह बदलाव ${Data.startDayHi} से लागू होगा।`;
    return 'क्या आप इसे लेना चाहेंगी। हाँ या नहीं बता दीजिए।';
  };
  // a place / time / friend said anywhere = a new ask → read-back with the fields refilled
  A.newAsk = u => {
    const ask = Object.assign({}, A.state.ask);
    if (u.place) { ask.place = u.place; ask.subhood = u.subhood; ask.samePlace = false; }
    if (u.samePlace) { ask.samePlace = true; ask.place = null; }
    if (u.time || /घंटे|ghante|hours?/i.test(u.raw || '')) { const st = (C.v3 && C.v3.spokenTime) ? C.v3.spokenTime(u, (A.state.ask.time || {}).start) : null; if (st && st.time) { ask.time = st.time; ask.hours = st.hours; } else if (u.time) ask.time = u.time; }   // V4 rev: "9 बजे से 8 घंटे" = start + hours
    if (u.friend) ask.friend = Object.assign({}, ask.friend || {}, u.friend);
    ask.transcript = u.raw;
    const lane = ask.friend ? 'C' : (ask.place ? 'HT' : 'T');
    A.go('S1b', { ask, lane, pick: { area: null, hood: null, time: null } });
  };
  // the lane's results screen, by lane and state
  A.results = () => {
    const s = A.state, full = s.mode === 'full';
    if (s.lane === 'T') return A.go({ none: 'T0', hood: 'TH', area: 'TA', full: 'T1f' }[s.mode] || 'T1');   // V4 rev cascade: her hood other times (T1f) → other hoods (TH) → other areas (TA) → nothing anywhere (T0)
    if (s.lane === 'C') return A.go(full ? 'C4t' : 'C4');
    return A.go(full ? 'H1f' : 'H1');
  };

  /* ---------- taps ---------- */
  A.onTap = e => {
    // any tap interrupts Saathi mid-sentence so the screen can be used; the line is not repeated
    if (Voice.speaking || (Voice.remote && Voice.remote.audio)) { Voice.cancel(); }
    const el = e.target.closest('[data-act]'); if (!el) return;
    const name = el.dataset.act;
    if (name === 'orb') { Voice.cancel(); A.listenOnce(++A.gen); return; }
    if (name === 'switch-close') { A.closeSwitch(); return; }
    if (name === 'sheet-dismiss') { A.closeSheet(); return; }
    if (name === 'back') { A.back(); return; }
    if (name === 'filter' && window.Filters) { Filters.open(el.dataset.f); return; }
    if (name === 'banner-close') { A.state.bannerHidden = A.current; A.rerender(); return; }
    if (name === 'go') { A.go(el.dataset.to); return; }
    if (name === 'toast') { A.toast(el.dataset.msg || 'Not in this demo'); return; }
    if (A.sheet && A.sheet.handlers[name]) { A.sheet.handlers[name](el); return; }
    const def = A.screens[A.current];
    if (def.act) def.act(name, el, A.ctx);
  };

  /* ---------- dev switch ---------- */
  A.openSwitch = () => { $('#scrim').hidden = false; $('#switch').hidden = false; A.syncSwitch(); };
  A.closeSwitch = () => { $('#scrim').hidden = true; $('#switch').hidden = true; };
  A.syncSwitch = () => {
    document.querySelectorAll('#switch .seg').forEach(seg => { const k = seg.dataset.key; seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', A.state[k] === b.dataset.v)); });
    $('#switch-info').textContent = Voice.remote.enabled ? `voice: Gemini ${Voice.remote.voice} (cloud) · STT ${Voice.supported.stt ? 'ok' : 'none'}` : `voice: phone ${Voice.voice ? Voice.voice.name + ' ' + Voice.voice.lang : 'none yet'} · ${Voice.usingHindi === false ? 'romanised (no Hindi voice)' : 'Hindi'} · STT ${Voice.supported.stt ? 'ok' : 'none'}`;
  };
  A.bindSwitch = () => {
    document.querySelectorAll('#switch .seg button').forEach(b => b.addEventListener('click', () => {
      const k = b.closest('.seg').dataset.key, v = b.dataset.v;
      if (k === 'reset') {                                                   // clear what a run left behind, then show Profile
        if (v === 'coach') { A.state.coachSeen = false; A.closeSwitch(); A.go('entry', { history: [] }); return; }
        if (v === 'login') { A.state.lateStart = null; A.state.latePick = null; A.closeSwitch(); A.go('entry', { history: [] }); A.toast('Login time tomorrow reset'); return; }
        const keep = { lane: A.state.lane, mode: A.state.mode, voice: A.state.voice };
        A.state = Object.assign(A.initial(), keep); A.presetAsk(); A.closeSwitch(); A.go('entry', null, { replace: true }); A.toast('Prototype reset'); return; }
      if (k === 'day') { A.state.homeDay = v; A.closeSwitch(); A.go('home'); return; }   // V3 hand-hold: which day Home shows
      if (k === 'goto') { A.closeSwitch(); if (!A.state.pick.time) A.presetAsk(); if (v === 'results') { A.results(); } else A.go(v); return; }
      A.state[k] = v; if (k === 'voice') Voice.mode = v; A.syncSwitch();
      if (k === 'lane' || k === 'mode') { A.presetAsk(); A.warmVoice(); }
    }));
    let pressT = null; const sb = $('#statusbar');
    const down = () => { pressT = setTimeout(A.openSwitch, 600); }; const up = () => clearTimeout(pressT);
    sb.addEventListener('touchstart', down, { passive: true }); sb.addEventListener('touchend', up); sb.addEventListener('mousedown', down); sb.addEventListener('mouseup', up); sb.addEventListener('mouseleave', up);
    window.addEventListener('keydown', e => { if (e.key === '`') { $('#switch').hidden ? A.openSwitch() : A.closeSwitch(); } });
  };
  // when the lane is switched by hand, prefill the ask so results screens have something to show
  A.presetAsk = () => {
    const s = A.state;
    if (s.lane === 'T') s.ask = { place: null, subhood: null, time: { start: 7, end: 15, startOnly: true }, friend: null, samePlace: true, transcript: 'यहीं, बस सुबह 7 बजे से' };
    if (s.lane === 'HT') s.ask = { place: 'HSR', subhood: null, time: { start: 9, end: 17 }, friend: null, samePlace: false, transcript: 'मुझे HSR या Bellandur में काम चाहिए, सुबह 9 से 5' };
    if (s.lane === 'C') s.ask = { place: null, subhood: null, time: null, friend: { name: 'Anita', id: '14586' }, samePlace: false, transcript: 'मेरी दोस्त Anita के साथ, उसका ID 14586' };
    // a default pick per lane, so a direct jump to a confirm screen has something to show; results screens overwrite it
    const t = (start, end, pay) => ({ start, end, pay });
    if (s.lane === 'T') s.pick = { area: Data.her.area, hood: { name: Data.her.hood, km: Data.her.km, times: Data.herTimesExtra.concat(Data.herTimes) }, time: s.mode === 'open' ? t(7, 15, 22000) : t(8, 10, 22000) };
    if (s.lane === 'HT') { const a = Data.areas.HSR; s.pick = { area: a, hood: a.hoods[0], time: a.hoods[0].times[0] }; }
    if (s.lane === 'C') { const h = Data.areas['Kudlu Gate'].hoods[0]; s.pick = { area: 'Kudlu Gate', hood: h, time: h.times[0] }; }
    s.joined = false; s.waitlisted = null; s.friendConfirmed = s.lane === 'C';
  };

  /* ---------- pre-generate the lane's lines on the remote voice so the demo never waits ---------- */
  A.linesFor = (lane, mode) => {
    const keep = { state: Object.assign({}, A.state), current: A.current };   // shallow: keep the real objects (a JSON copy breaks identity checks like pick.area === area)
    const lines = new Set();
    try {
      for (const m of (mode ? [mode] : ['open', 'full'])) {
        A.state.lane = lane; A.state.mode = m; A.presetAsk(); if (lane === 'HT') A.set({ joined: true, waitlisted: { what: 'HSR', time: { start: 9, end: 17 } } });
        for (const id of Object.keys(A.screens)) { const d = A.screens[id]; if (d.lines) d.lines.forEach(l => lines.add(l)); if (!d.say) continue;   // screens that speak in steps (N1) list their lines
          if (/^(H|W|P|A)/.test(id) && lane !== 'HT') continue; if (/^T/.test(id) && lane !== 'T') continue; if (/^C/.test(id) && lane !== 'C') continue;   // M* (manual) and spine lines are warmed with every lane
          try { const ctxState = A.state; const line = d.say({ ...A.ctx, state: ctxState }); if (line) lines.add(line); } catch (e) {} }
      }
    } finally { for (const k of Object.keys(A.state)) if (!(k in keep.state)) delete A.state[k]; Object.assign(A.state, keep.state); }
    return [...lines];
  };
  A.warmVoice = async () => { if (!Voice.remote.enabled) return; const lines = [...new Set([].concat(A.linesFor(A.state.lane), A.linesFor('T'), A.linesFor('HT'), A.linesFor('C')))]; lines.push('माफ़ कीजिए, मैं ठीक से समझ नहीं पाई। क्या आप एक बार फिर से बता सकती हैं।', 'कोई बात नहीं। आप screen पर tap करके भी चुन सकती हैं।'); Voice.warm(lines); };

  /* ---------- stage scaling ---------- */
  A.fit = () => { const st = $('#stage'); const s = Math.min(window.innerWidth / 360, window.innerHeight / 800); st.style.transform = `scale(${s})`; };

  /* ---------- start ---------- */
  A.start = () => {
    A.state = A.initial();
    const q = new URLSearchParams(location.search);
    if (q.get('lane')) A.state.lane = q.get('lane'); if (q.get('state')) A.state.mode = q.get('state'); if (q.get('voice')) A.state.voice = q.get('voice'); if (q.get('tts')) Voice.script = q.get('tts');
    Voice.mode = A.state.voice;
    A.ctx = { get state() { return A.state; }, data: Data, go: A.go, back: A.back, say: A.say, listen: g => A.listenOnce(g || A.gen), toast: A.toast, set: A.set, rerender: A.rerender, openSheet: A.openSheet, closeSheet: A.closeSheet, results: A.results, newAsk: A.newAsk, orb: A.orb, after: A.after, C: window.C };
    document.addEventListener('click', A.onTap);
    A.bindSwitch(); A.fit(); window.addEventListener('resize', A.fit);
    const d = new Date(); $('#clock').textContent = `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`;
    C.loadIcons().then(async () => { await Voice.checkRemote(); const start = q.get('go') || 'entry'; A.presetAsk(); A.go(start, null, { replace: true }); A.warmVoice(); });
  };
  return A;
})();
