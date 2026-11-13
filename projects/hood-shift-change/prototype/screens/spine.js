/* The shared spine, Figma V4 (section 481:36972, 2026-10-17): video → FQ "Select an option" → N1 listen → N4 tell us → F3 thinking → S1b read-back → L finding → (lane) · D done.
   Figma: cIAH24e13VZJu31OmiMWrj — 1.01 436:5072 / 436:5122 · FQ 481:41035 / 492:48652 / 492:51797 · time deck 481:41190 / 481:41234 / 481:41292 / 481:41350 · hood deck 492:48807 / 492:48838 / 492:48883 / 492:48928 ·
   S1b time 610:69114 · S1b hood 492:48268 · 1.05 481:41566 / 481:41609 / 481:41838 · 1.09 481:37852 (time) / 481:37864 (hood, friend)
   V4: three intents (time · hood · friend), one card per intent; the friend path asks for the ID on its own screens (screens/expert.js).
   V4 rev (2026-10-21): time = start + hours. She says "सुबह 9 बजे से 8 घंटे तक"; ask.hours is the hours, ask.time { start, end = start + hours } follows it. No end time anywhere. */
(() => {
  const R = App.register, D = Data, esc = C.esc;
  const A = 'assets/entry/';

  /* ---------- the V3 listen stage (FB2), shared with screens/expert.js as C.v3 ----------
     White page; the app shell's status bar sits on top. Header 48 at 56: Close (22) at 25 · Type instead (keyboard 22) at 313.
     Prompt 18/24 regular at 132 (w 252). Cards group 360 × 240 (top 280 listening to Saathi · 180 / 150 once she speaks).
     Her words 24/37 semibold at 444 (w 312), the last word gray-300. Glow from the bottom edge (243 at 557): base gradient,
     four blurred ellipses, and either Saathi's wave glyph (7 white bars) or the gradient loader (80). */
  const V3 = {};
  const lines = { place: '1.79% -3.05% -35.71% 18.29%', time: '10.4% -2.78% -51.13% 18.33%', id: '3.25% -2.78% -43.99% 18.33%' };
  const linesIn = { place: '0 -0.15% -0.14% -0.53%', time: '0 -0.15% -0.13% -0.52%', id: '0 -0.15% -0.13% -0.52%' };
  V3.card = (k, label, value) => `<div class="v3card ${k}"><img class="v3pearl" src="${A}pearl-${k}.svg" alt="">
      <div class="v3lines"><div class="v3lg" style="inset:${lines[k]}"><div style="position:absolute;inset:${linesIn[k]}"><img src="${A}line-${k}.svg" alt=""></div></div></div>
      <span class="v3lab">${esc(label)}</span><span class="v3val">${esc(value)}</span><img class="v3ic" src="${A}icon-${k}.svg" alt=""></div>`;
  const CARDS = { place: () => V3.card('place', 'Place', '“HSR”'), time: () => V3.card('time', 'Time', '“सुबह 9 बजे से\n8 घंटे तक”'), id: () => V3.card('id', 'Expert ID', '“124564”') };
  /* the deck: App.render deals it from the stage the previous V3 screen left it at (data-to), else from off-stage right (g0) */
  V3.deck = (to, keys) => {
    const s = App.state, prev = s.history[s.history.length - 1];
    const from = s.v3deck && (s.v3deckOn === App.current || s.v3deckOn === prev) ? s.v3deck : 'g0';
    s.v3deck = to; s.v3deckOn = App.current;
    return `<div class="deck ${from}" data-to="${to}">${keys.map(k => CARDS[k]()).join('')}</div>`;
  };
  V3.move = to => { const d = document.querySelector('#screen .deck'); if (d && !d.classList.contains(to)) { d.className = 'deck ' + to; App.state.v3deck = to; } };
  V3.header = () => `<div class="v3head"><span class="v3hbtn l" data-act="v3-close"><img src="${A}close.svg" alt="Close"></span><span class="v3hbtn r" data-act="v3-type"><img src="${A}keyboard.svg" alt="Type instead"></span></div>`;
  V3.prompt = (html) => `<p class="v3prompt">${html}</p>`;
  V3.wordsHtml = (t, { live = false } = {}) => { const s = String(t || '').trim(); if (!s) return '';
    if (!live) return `“${esc(s)}”`;
    const w = s.split(/\s+/), last = w.pop(); return `“${esc(w.join(' '))}${w.length ? ' ' : ''}<span class="v3dim">${esc(last)}…</span>`; };
  V3.words = (t, opts) => `<p class="v3words">${V3.wordsHtml(t, opts)}</p>`;
  V3.glow = ({ loader = false } = {}) => `<div class="v3glow" data-act="mic"><div class="v3base"></div>
      <img class="v3e e1" src="${A}glow-1.svg" alt=""><img class="v3e e2" src="${A}glow-2.svg" alt=""><img class="v3e e3" src="${A}glow-3.svg" alt=""><img class="v3e e4" src="${A}glow-4.svg" alt="">
      ${loader ? `<img class="v3loader" src="${A}loader.svg" alt="">` : `<div class="v3wave">${[0, 1, 2, 3, 4, 5, 6].map(i => `<i style="--i:${i}"></i>`).join('')}</div>`}</div>`;
  // her words while she speaks: the prompt goes, her line grows under the cards (last word dimmed)
  V3.live = (t, onFirst) => { const sc = document.querySelector('#screen .screen'); if (!sc || !String(t || '').trim()) return;
    const p = sc.querySelector('.v3prompt'); if (p) p.remove();
    let w = sc.querySelector('.v3words'); if (!w) { sc.insertAdjacentHTML('beforeend', V3.words('')); w = sc.querySelector('.v3words'); if (onFirst) onFirst(); }
    w.innerHTML = V3.wordsHtml(t, { live: true }); };
  V3.liveState = s => { const sc = document.querySelector('#screen .screen'); if (sc) sc.classList.toggle('v3listening', s === 'listening'); };
  V3.headAct = (name, ctx) => { if (name === 'v3-close') { ctx.go('entry', { history: [] }); return true; } if (name === 'v3-type') { ctx.go(ctx.state.withFriend ? 'EID' : V3.manualStart(ctx.state), ctx.state.withFriend ? { eid: 'keys', idInput: '' } : null); return true; } return false; };
  C.v3 = V3;

  // a screen's onVoice(state) hook, used by the listening screens to animate Saathi's wave
  const baseOnState = Voice.onState; Voice.onState = s => { baseOnState(s); const def = App.screens[App.current]; if (def && def.onVoice) def.onVoice(s, App.ctx); };

  /* 0 · Entry — kept as a fallback; the shipped Profile (screens/profile.js) registers 'entry' after this file and replaces it */
  R({ id: 'entry', orb: 'raised',
    render: () => `${C.topNav({ title: 'Work area & time', back: false })}<div class="body">
      <div class="entry-card"><span class="bs g500">Now</span><span class="bm-sb g900">${esc(D.her.hood)}</span><div class="meta bs g700">${C.icons['clock']}<span>${D.fmt(D.her.time)} · ${D.her.hours} hrs</span></div></div></div>
      ${C.actions(C.button('Change shift or hood', { act: 'change' }))}`,
    say: () => 'क्या आप अपना काम का area या time बदलना चाहती हैं।',
    hear: (u, ctx) => { if (u.affirm) { ctx.go(ctx.state.seenVideo ? 'FQ' : 'video'); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'change') ctx.go(ctx.state.seenVideo ? 'FQ' : 'video'); }
  });

  /* V · 1.01 How to speak (436:5072 → 436:5122). While Saathi explains, the button is the disabled "Try it now" (pink-200).
     When her line ends it becomes the progress button "Try yourself": the darker band is what is left before it moves on, draining to nothing, then FQ. */
  const DRAIN_MS = 4000;
  const tryNow = () => `<button class="btn btn-primary v3try" disabled>Try it now</button>`;
  const tryYourself = () => `<button class="btn btn-primary v3try" data-act="try"><span class="vprog" style="animation-duration:${DRAIN_MS}ms"></span><span style="position:relative">Try yourself</span></button>`;
  const startDrain = () => { if (App.current !== 'video') return; App.state.vidPhase = 'try'; const b = document.querySelector('[data-screen="video"] .v3try'); if (b) b.outerHTML = tryYourself(); };
  R({ id: 'video', orb: 'hidden', listen: false,
    auto: { to: 'FQ', get pause() { startDrain(); return DRAIN_MS; } },   // the app reads the pause the moment her line ends: that is when the band starts to drain
    render: ({ state }) => `${C.topNav({ title: 'How to speak', action: 'Skip', actionAct: 'skip' })}
      <div class="v3video"><div class="v3screen"><div class="v3sound" data-act="replay"><img src="assets/speaker-high-figma.svg" alt="Replay sound"></div></div></div>
      <div class="v3vbottom">${state.vidPhase === 'try' ? tryYourself() : tryNow()}</div>`,
    say: () => 'देखिए, बोलना बहुत आसान है। पहले वो जगह बताइए जहाँ आप काम करना चाहती हैं, फिर अपना time। जैसे, HSR में सुबह 9 बजे से शाम 5 बजे तक।',
    onEnter: ({ set }) => set({ seenVideo: true, vidPhase: 'play' }),
    act: (name, el, ctx) => { if (name === 'try' || name === 'skip') ctx.go('FQ');
      if (name === 'replay') { Voice.cancel(); App.clearTimers(); ctx.set({ vidPhase: 'play' }); ctx.rerender(); App.voiceLoop(); } }
  });

  /* FQ · V4 "Select an option" (481:41035 time selected · 492:48652 hood selected · 492:51797 friend selected — that frame still carries the V3 title; V4's is used):
     three illustrated selection cards, Confirm. time → lane T · hood → lane HT · friend → the Expert ID flow (E1, lane C). Sets state.intent. */
  const INTENTS = { time: { label: 'Change my shift<br>time', lane: 'T' }, hood: { label: 'Change my hood', lane: 'HT' }, friend: { label: 'Work at a friend’s<br>place', lane: 'C' } };
  const intentOf = s => s.intent || (s.lane === 'HT' ? 'hood' : s.lane === 'C' ? 'friend' : 'time');
  const fqCard = (k, on) => `<div class="fqcard ${k} ${on ? 'on' : ''}" data-act="fq" data-k="${k}"><div class="fqrow"><span class="fqradio"></span><span class="fqlabel">${INTENTS[k].label}</span></div><img class="fqart" src="${A}opt-${k}.png" alt=""></div>`;
  const fqGo = (ctx, k) => {
    if (k === 'friend') { ctx.go('E1', { intent: 'friend', withFriend: true, lane: 'C', friendConfirmed: false, idMisses: 0, idInput: '' }); return; }
    ctx.go('N1', { intent: k, lane: INTENTS[k].lane, withFriend: false, friendConfirmed: false }); };
  // what she wants, from her words: a friend first (दोस्त / साथ), then a hood (hood / area / जगह / इलाका or a place), then the time (time / टाइम / समय / shift or a time)
  const intentHeard = u => { const s = u.text || '';
    if (u.friend || /(^|\s)(dost|saath|friend)(\s|$)/.test(s)) return 'friend';
    if (u.place || /(^|\s)(hood|area|jagah|ilaka)(\s|$)/.test(s)) return 'hood';
    if (u.time || /(^|\s)(time|shift|samay|timing)(\s|$)/.test(s)) return 'time';
    return null; };
  R({ id: 'FQ', scriptKey: 'FQ',
    render: ({ state }) => { const k = state.fqPick || 'time';
      return `${C.topNav()}<div class="fqbody"><div class="h2 g900">Select an option</div>
        <div class="fqcards">${['time', 'hood', 'friend'].map(x => fqCard(x, k === x)).join('')}</div></div>
        <div class="actions fqactions">${C.button('Confirm', { act: 'confirm' })}</div>`; },
    onEnter: ({ state, set, rerender }) => { if (!state.fqPick) { set({ fqPick: state.intent || 'time' }); rerender(); } },
    say: () => 'आप क्या बदलना चाहती हैं। अपना shift time, अपना hood, या आप किसी दोस्त के साथ काम करना चाहती हैं।',
    hear: (u, ctx) => { const k = intentHeard(u); if (!k) return false;
      ctx.set({ fqPick: k }); ctx.rerender(); ctx.after(600, () => fqGo(ctx, k)); return true; },
    act: (name, el, ctx) => { if (name === 'fq') { ctx.set({ fqPick: el.dataset.k }); ctx.rerender(); } if (name === 'confirm') fqGo(ctx, ctx.state.fqPick || 'time'); }
  });

  /* the one-card deck per intent: time → the Time card (481:41190 · 481:41234 · 481:41292 · 481:41350); hood → the Place card (492:48807 · 492:48838 · 492:48883 · 492:48928) */
  const deckKey = s => intentOf(s) === 'hood' ? 'place' : 'time';
  const deckAt = (s, stage) => V3.deck((deckKey(s) === 'place' ? 'v3p' : 'v3t') + stage, [deckKey(s)]);

  /* N1 · FB2·1 Listen: "Please Listen to this carefully...", her one card dealt in on entry; Saathi says the intent's line, then N4.
     One card: nothing is dealt while she speaks (lead, 2026-10-15: no card may arrive before the voice line ends). */
  const N1_LINE = { time: 'ध्यान से सुनिए। अपना नया shift time बताइए, किस बजे से, और कितने घंटे, जैसे सुबह 9 बजे से 8 घंटे तक।', hood: 'ध्यान से सुनिए। वो जगह बताइए जहाँ आप काम करना चाहती हैं, जैसे HSR।' };
  let n1Run = 0;
  R({ id: 'N1', orb: 'hidden', white: true, listen: false,
    render: ({ state }) => `${V3.header()}${V3.prompt('Please Listen to this<br>carefully...')}${deckAt(state, 1)}`,
    lines: [N1_LINE.time, N1_LINE.hood],
    onEnter: async ctx => { const run = ++n1Run, here = () => run === n1Run && App.current === 'N1';
      await new Promise(r => setTimeout(r, 700)); if (!here()) return;   // let the card land, then speak
      await ctx.say(N1_LINE[intentOf(ctx.state) === 'hood' ? 'hood' : 'time']); if (!here()) return;
      ctx.after(700, () => { if (here()) ctx.go('N4'); }); },
    act: (name, el, ctx) => { V3.headAct(name, ctx); }
  });

  /* N4 · FB2·2 Tell us (481:41234 / 492:48838): the card up to 180, the glow and Saathi's wave; her words appear under it (481:41292 / 492:48883). → F3
     The frame keeps the prompt "Tell us your Place and time" on both one-card decks; Saathi's line says only what the intent asks. */
  const N4_LINE = { time: 'अब बताइए, आप किस बजे से, और कितने घंटे काम करना चाहती हैं।', hood: 'अब बताइए, आप किस जगह काम करना चाहती हैं।' };
  const herTime = () => ({ start: D.her.time.start, end: D.her.time.end });
  /* what she said about time, as start + hours: "9 बजे से 8 घंटे" (voice.js reads that as the range 9–8, so the hours win) or "9 से 5" (hours = end − start).
     Hours alone ("8 घंटे") keep the start she has (baseStart, else her shift's). → { time: { start, end }, hours } or null. Shared as C.v3.spokenTime for A.newAsk. */
  const spokenTime = (u, baseStart) => { if (!u || (!u.time && !u.hours)) return null;
    const start = u.time ? u.time.start : (baseStart != null ? baseStart : D.her.time.start);
    const hours = u.hours || (u.time && !u.time.startOnly ? u.time.end - u.time.start : D.her.hours);
    return { time: { start, end: start + hours }, hours }; };
  V3.spokenTime = spokenTime;
  R({ id: 'N4', orb: 'hidden', white: true, scriptKey: 'N4', listenMs: 9000, allowNewAsk: false,
    render: ({ state }) => `${V3.header()}${V3.prompt('Tell us your Place and time')}${deckAt(state, 4)}${V3.glow()}`,
    say: ({ state }) => N4_LINE[intentOf(state) === 'hood' ? 'hood' : 'time'],
    lines: [N4_LINE.time, N4_LINE.hood],
    onEnter: ({ set }) => set({ ask: { place: null, subhood: null, time: null, hours: null, friend: null, samePlace: false, transcript: '' } }),
    onVoice: s => V3.liveState(s),
    interim: t => V3.live(t),
    hear: (u, ctx) => {
      const want = intentOf(ctx.state);
      // hood: a place she names; her time stays as it is now. time: the hours she names, in her own hood. A place said on the time deck turns it into a hood ask.
      if (u.place && (want === 'hood' || !(u.time || u.hours))) { ctx.go('F3', { intent: 'hood', lane: 'HT', ask: { place: u.place, subhood: u.subhood, time: herTime(), hours: D.her.hours, friend: null, samePlace: false, transcript: u.raw } }); return true; }
      const st = spokenTime(u);
      if (st) { ctx.go('F3', { intent: 'time', lane: 'T', ask: { place: null, subhood: null, time: st.time, hours: st.hours, friend: null, samePlace: true, transcript: u.raw } }); return true; }
      return false; },
    act: (name, el, ctx) => { if (V3.headAct(name, ctx)) return; if (name === 'mic') { Voice.cancel(); ctx.listen(); } }
  });

  /* F3 · thinking (481:41350 / 492:48928): her full line under the card, the gradient loader in the glow → S1b */
  R({ id: 'F3', orb: 'hidden', white: true, listen: false, auto: { ms: 1400, to: 'S1b' },
    render: ({ state }) => `${V3.header()}${deckAt(state, 4)}${V3.words(state.ask.transcript)}${V3.glow({ loader: true })}`,
    onEnter: ({ orb }) => orb('thinking'),
    act: (name, el, ctx) => { V3.headAct(name, ctx); }
  });

  /* S1b · the read-back, one id, two looks by intent:
     time → "Confirm your shift timings" (610:69114): transcript, two tiles side by side — Shift hours (watch) · Start time (clock), each with a caret → M4a / M2a.
     hood → "Confirm what you said" (492:48268): transcript, only the Place row → Modify areas (M1a, 481:40333).
     Both: title and transcript 10 apart, the card 24 below; Find work → L; Select instead → the manual row. */
  const PLACE_NAME = { HSR: 'HSR Layout' };   // the read-back names the place as she knows it
  const placeKeys = a => { if (a.places && a.places.length) return a.places.slice();
    const t = (a.transcript || '').toLowerCase(), names = [a.place];
    Object.keys(D.areas).forEach(k => { if (k !== a.place && (t.includes(k.toLowerCase()) || (k === 'Bellandur' && /बेल/.test(t)))) names.push(k); });
    return names; };
  const placesSaid = a => placeKeys(a).map(n => PLACE_NAME[n] || n).join(', ');
  const h12 = h => `${h % 12 || 12} ${h < 12 || h === 24 ? 'AM' : 'PM'}`;
  const askTime = a => a.time || herTime();
  const askHours = a => a.hours || (askTime(a).end - askTime(a).start);
  const partHi = h => h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : 'शाम';
  // change hood captures only the area: a time said along with it is not shown or used (lead, 2026-10-21)
  const placeOnly = t => String(t || '').replace(/[,،]?\s*(सुबह|शाम|दोपहर|रात)?\s*\d{1,2}\s*(बजे)?\s*(से|to|-|–)\s*\d{1,2}(\s*बजे)?(\s*(घंटे|ghante|hours?))?(\s*तक)?/g, '').replace(/\s+([,।])/g, '$1').trim();
  const s1bLook = s => s.lane === 'HT' ? 'hood' : 'time';
  R({ id: 'S1b', orb: 'small', scriptKey: 'S1b',
    render: ({ state }) => { const a = state.ask, look = s1bLook(state), t = askTime(a);
      const title = look === 'hood' ? 'Confirm what you said' : 'Confirm your shift timings';
      // V4 rev 610:69114 (2026-10-21): two tiles, gap 16 — "Shift hours" (watch 20) · "8 hours"  and  "Start time" (clock 20) · "9:00 AM", each with a caret 18 → its picker
      const hm = h => `${h % 12 || 12}:00 ${h < 12 || h === 24 ? 'AM' : 'PM'}`;
      const tile = (act, glyph, label, value) => `<div class="s1t-tile" data-act="${act}"><div class="lab"><img src="${A}${glyph}" width="20" height="20" alt=""><span>${label}</span></div>
            <div class="val"><b>${C.esc(value)}</b><img src="${A}s1t-caret.svg" width="18" height="18" alt=""></div></div>`;
      const card = look === 'hood'
        ? C.listCard(C.readRow({ icon: 'map-pin', label: 'Place', value: a.samePlace || !a.place ? D.her.area : (a.subhood ? `${a.place} ${a.subhood}` : placesSaid(a)), act: 'row-place' }))
        : `<div class="s1t-tiles">${tile('row-hours', 's1t-watch.svg', 'Shift hours', `${askHours(a)} hours`)}${tile('row-start', 's1t-clock.svg', 'Start time', hm(t.start))}</div>`;
      return `${C.topNav()}<div class="body middle-pad s1b-body"><div class="s1b-head"><div class="h2 g900">${title}</div><p class="tline">${look === 'hood' ? C.highlight(placeOnly(a.transcript), { times: false }) : C.highlight(a.transcript)}</p></div>
      ${card}</div>
      ${C.actions(C.button('Find work', { act: 'find' }), C.textButton('Select instead', 'select', 'microphone'))}`; },
    say: ({ state }) => { const a = state.ask, t = askTime(a);
      if (s1bLook(state) === 'hood') return `मैंने समझा — आप ${a.samePlace || !a.place ? D.her.area : (a.subhood ? a.place + ' ' + a.subhood : placeKeys(a).join(' या '))} में काम करना चाहती हैं। क्या यह सही है।`;   // area only, no time
      return `मैंने समझा — आप ${partHi(t.start)} ${t.start % 12 || 12} बजे से ${askHours(a)} घंटे काम करना चाहती हैं। क्या यह सही है।`; },
    onEnter: ctx => { const s = ctx.state; if (s.ask.friend && !s.friendConfirmed) ctx.go('E1', { intent: 'friend', withFriend: true, lane: 'C' }, { replace: true }); },   // a friend named by voice: the Expert ID flow
    hear: (u, ctx) => {
      if (u.affirm && !u.newAsk) { S1bFind(ctx); return true; }
      if (u.negate && !u.newAsk) { ctx.go('N4'); return true; }
      if (u.newAsk || u.samePlace || (u.hours && !u.affirm)) {   // a new time is start + hours: "9 बजे से 8 घंटे" must not read as 9 to 8
        const st = spokenTime(u, askTime(ctx.state.ask).start); if (st) { u.time = st.time; ctx.set({ ask: Object.assign({}, ctx.state.ask, { hours: st.hours }) }); }
        ctx.newAsk(u); return true; }
      return false; },
    act: (name, el, ctx) => { if (name === 'find') S1bFind(ctx); if (name === 'select') ctx.go(manualStart(ctx.state));
      if (name === 'row-place') ctx.go('M1a'); if (name === 'row-start') ctx.go('M2a'); if (name === 'row-hours') ctx.go('M4a'); }
  });
  // the manual row: hood starts at Pick your area (M1); time starts at Select shift time, the hours (M4)
  const manualStart = s => intentOf(s) === 'hood' || s.lane === 'HT' ? 'M1' : 'M4';
  V3.manualStart = manualStart;
  const S1bFind = ctx => { const s = ctx.state; if (s.lane === 'C' && !s.friendConfirmed) { ctx.go('E1', { withFriend: true }); return; } ctx.go('L'); };

  /* L · 1.05 Finding work (481:41566 lane T "My hood" · 481:41609 lane HT "HSR" · 481:41838 manual): TopNav with the place and skeletons — V4 draws no chips or "You asked" band → the lane's results */
  const lTitle = s => s.lane === 'T' ? 'My hood' : (s.lane === 'HT' ? (s.ask.place || (window.Filters ? Filters.title() : 'Work for you')) : (window.Filters ? Filters.title() : D.friend.area));
  R({ id: 'L', orb: 'hidden', listen: false,
    render: ({ state }) => `${C.topNav({ title: lTitle(state) })}<div class="body">${C.skeletons(3)}</div>`,
    onEnter: ({ after, results }) => after(1500, results)
  });

  /* D · 1.09 (V4 rev 2026-10-21) — white page, the green disc + check, then
       time lane (481:37852): "Hood timing updated!" · "New timing" (16 medium gray-500) · clock 24 + the new time (18 medium gray-800) · pink "From <day>"
       hood / friend (481:37864): "You're moving to <hood>" · clock 24 + the time (18 medium gray-600) · pink "From <day>"
     title → info 24, info rows 12; Go to Home → Home with the move booked */
  const areaName = a => typeof a === 'string' ? a : (a && a.name);
  const dTimeLane = s => s.lane === 'T' || (s.pick.hood && s.pick.hood.name === D.her.hood);
  R({ id: 'D', orb: 'hidden', scriptKey: 'D', white: true,
    render: ({ state }) => { const p = state.pick, tl = dTimeLane(state), t = p.time || D.her.time;
      const title = tl ? 'Hood timing updated!' : `You're moving to ${p.hood ? p.hood.name : areaName(p.area)}`;
      return `${C.topPlain()}<div class="result"><div style="position:relative;width:120px;height:120px"><img src="assets/done-circle.svg" alt="" style="position:absolute;inset:0;width:120px;height:120px"><img src="assets/done-check.svg" alt="" style="position:absolute;left:24.38px;top:32.81px;width:71.25px;height:54.375px"></div>
        <div class="d-text"><div class="h2 g900">${esc(title)}</div>
          <div class="d-info ${tl ? 't' : 'h'}">${tl ? '<span class="d-lab">New timing</span>' : ''}<span class="d-time"><img src="${A}done-clock-${tl ? 't' : 'h'}.svg" width="24" height="24" alt=""><span>${esc(D.fmt(t))}</span></span><div class="when">From ${esc(D.startDay)}</div></div></div></div>
        <div class="bottom-plain">${C.button('Go to Home', { act: 'home' })}</div>`; },
    say: ({ state }) => { const p = state.pick; return dTimeLane(state) ? `बधाई हो! ${D.startDayHi} से आपका नया time ${D.hi.time(p.time || D.her.time)} पक्का हो गया है। अब आप home पर जा सकती हैं।` : `बधाई हो! ${D.startDayHi} से आप ${p.hood ? p.hood.name : areaName(p.area)} में काम करेंगी। अब आप home पर जा सकती हैं।`; },
    onEnter: ({ state, set }) => { const p = state.pick, t = p.time || D.her.time;
      const move = { hood: (p.hood && p.hood.name) || D.her.hood, area: areaName(p.area) || D.her.area, time: t, pay: t.pay || D.her.pay, lane: state.lane };
      set({ joined: false, waitlisted: null, move, homeDay: 'booked', booked: `${state.lane === 'T' ? D.fmt(t) + ' in ' + D.her.area : move.hood} from ${D.startDay}` }); },
    hear: (u, ctx) => { if (u.home || u.affirm) { ctx.go('home', { history: [] }, { replace: true }); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'home') ctx.go('home', { history: [] }, { replace: true }); }
  });
})();
