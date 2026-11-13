/* V3 Expert ID flow (Figma V3 Expert ID section 454:20138, 2026-10-15) — the friend path after FQ "Yes, work with a friend".
   E1 listen (FB2·4 454:25098) → E4 tell us (FB2·5 454:25131, her words 454:28928) → E5 thinking (454:29099) →
     match: sheet "Is this Anita Sharma?" (454:29319) → Yes, that's her → friend results (C4 / C4t by state)
     miss:  sheet "Invalid expert ID" (454:29389: Speak again; from the 2nd miss 454:29457: + Type expert ID)
   EID · "Tell us the expert ID of your friend" with the keypad sheet (436:5585) → Find her → "Is this Anita Sharma?" over it (436:5722).
   The stage (header, cards, words, glow) is the shared V3 listen stage C.v3 from screens/spine.js. Keypad logic ported from V2's C1/C2/C3. */
(() => {
  const R = App.register, D = Data, esc = C.esc, V3 = C.v3;

  const lineHer = () => `क्या यह ${D.friend.name} हैं, जो ${D.friend.area} में काम करती हैं।`;
  const lineMiss1 = 'माफ़ कीजिए, यह expert ID नहीं मिला। क्या आप एक बार फिर से बोल सकती हैं।';
  const lineMiss2 = 'यह ID फिर से नहीं मिला। आप एक बार और बोल सकती हैं, या ID type कर सकती हैं।';
  const lineKeys = 'कोई बात नहीं, आप यहाँ ID type भी कर सकती हैं।';
  const lineKeyMiss = 'माफ़ कीजिए, यह expert ID नहीं मिला। एक बार ID फिर से देख लीजिए।';

  // the friend is found: lane C results (App.results maps lane C → C4, or C4t when her time is full)
  const confirmFriend = ctx => { ctx.set({ lane: 'C', friendConfirmed: true, withFriend: true, idInput: '', idMisses: 0,
    ask: Object.assign({}, ctx.state.ask, { friend: { id: D.friend.id, name: D.friend.first } }) }); ctx.results(); };
  const digitsOf = u => u.id || String(u.text || '').replace(/\D/g, '');
  const heardId = (ctx, u) => ctx.go('E5', { e5: 'think', heard: u.raw, ask: Object.assign({}, ctx.state.ask, { friend: Object.assign({}, ctx.state.ask.friend || {}, { id: digitsOf(u) }) }) });

  /* ---------- sheets (scrim 40 %, radius 16 top, close orb gray-700 above) ---------- */
  const sheet = (cls, inner, { close = true } = {}) => `<div class="x-wrap"><div class="x-dim" data-act="x-dismiss"></div><div class="x-sheet ${cls}">${close ? `<span class="x-close" data-act="x-dismiss">${C.icons['x']}</span>` : ''}${inner}</div></div>`;
  const herSheet = () => sheet('x-her', `
      <div class="x-avatar"><span class="verified"><img src="assets/seal-check-fill.svg" alt=""></span><img class="photo" src="assets/anita.jpg" alt=""></div>
      <div class="x-htitle">Is this ${esc(D.friend.name)}?</div>
      <div class="x-hsub">Works in ${esc(D.friend.area)}</div>
      <div class="x-action">${C.button("Yes, that's her", { act: 'yes' })}</div>`);
  // 454:29389 (one action) · 454:29457 (two; the sheet is taller and covers the close orb, as drawn)
  const missSheet = (twice) => sheet('x-her x-miss', `
      <div class="x-avatar"></div>
      <div class="x-htitle">Invalid expert ID</div>
      <div class="x-hsub">Please speak again</div>
      <div class="x-action">${C.button('Speak again', { act: 'again' })}${twice ? C.button('Type expert ID', { act: 'type', kind: 'secondary' }) : ''}</div>`, { close: !twice });

  /* ---------- E1 · FB2·4 Listen · Expert ID: one card dealt in, "Please Listen to this carefully..." → E4 ---------- */
  R({ id: 'E1', orb: 'hidden', white: true, listen: false, auto: { ms: 5000, to: 'E4' },
    render: () => `${V3.header()}${V3.prompt('Please Listen to this<br>carefully...')}${V3.deck('v3e1', ['id'])}`,
    say: () => 'अब मुझे अपनी दोस्त का expert ID बताइए। यह पाँच अंकों का नंबर होता है।',
    onEnter: ctx => { ctx.set({ withFriend: true }); if (Voice.remote.enabled) Voice.warm([lineHer(), lineMiss1, lineMiss2, lineKeys, lineKeyMiss]); },
    act: (name, el, ctx) => { V3.headAct(name, ctx); }
  });

  /* ---------- E4 · FB2·5 Tell us your friend's Expert ID: listening; her words appear and the card rises to 150 ---------- */
  R({ id: 'E4', orb: 'hidden', white: true, scriptKey: 'E4', listenMs: 9000, allowNewAsk: false,
    render: () => `${V3.header()}${V3.prompt('Tell us your friend’s<br>Expert ID')}${V3.deck('v3e4', ['id'])}${V3.glow()}`,
    say: () => 'मैं सुन रही हूँ। अपनी दोस्त का expert ID बोलिए।',
    onVoice: s => V3.liveState(s),
    interim: t => V3.live(t, () => V3.move('v3e4w')),
    hear: (u, ctx) => {
      if (u.back || u.home) return false;
      if (u.type || u.dontKnow) { ctx.go('EID', { eid: 'keys', idInput: '' }); return true; }
      heardId(ctx, u); return true; },
    act: (name, el, ctx) => { if (V3.headAct(name, ctx)) return; if (name === 'mic') { Voice.cancel(); ctx.listen(); } }
  });

  /* ---------- E5 · thinking (454:29099) → match sheet (454:29319) or Invalid expert ID (454:29389 / 454:29457) ---------- */
  const decide = ctx => { const s = ctx.state, id = (s.ask.friend && s.ask.friend.id) || '';
    if (id === D.friend.id) ctx.set({ e5: 'match' }); else ctx.set({ e5: 'miss', idMisses: (s.idMisses || 0) + 1 });
    ctx.orb('idle'); ctx.rerender(); App.voiceLoop(); };
  R({ id: 'E5', orb: 'hidden', white: true, allowNewAsk: false,
    get scriptKey() { return App.state.e5 === 'match' ? 'C3' : 'E4'; },   // scripted: "हाँ" on the match sheet; the ID again on the miss sheet
    get listen() { return App.state.e5 !== 'think'; },
    render: ({ state }) => { const p = state.e5 || 'think';
      return `${V3.header()}${V3.deck('v3e4w', ['id'])}${V3.words(state.heard || '')}${V3.glow({ loader: p !== 'miss' })}${p === 'match' ? herSheet() : p === 'miss' ? missSheet(state.idMisses >= 2) : ''}`; },
    say: ({ state }) => state.e5 === 'match' ? lineHer() : state.e5 === 'miss' ? (state.idMisses >= 2 ? lineMiss2 : lineMiss1) : null,
    onEnter: ctx => { if (ctx.state.e5 !== 'think') { ctx.set({ e5: 'think' }); ctx.rerender(); } ctx.orb('thinking'); ctx.after(1100, () => decide(ctx)); },
    hear: (u, ctx) => { const p = ctx.state.e5;
      if (p === 'match') { if (u.affirm && !u.negate) { confirmFriend(ctx); return true; } if (u.negate) { ctx.go('E4'); return true; } return false; }
      if (p === 'miss') {
        if (u.type || u.dontKnow) { ctx.go('EID', { eid: 'keys', idInput: '' }); return true; }
        if (digitsOf(u)) { heardId(ctx, u); return true; }
        if (u.affirm) { ctx.go('E4'); return true; } }
      return false; },
    act: (name, el, ctx) => { if (V3.headAct(name, ctx)) return;
      if (name === 'yes') confirmFriend(ctx);
      if (name === 'again' || name === 'x-dismiss') ctx.go('E4');
      if (name === 'type') ctx.go('EID', { eid: 'keys', idInput: '' }); }
  });

  /* ---------- EID · the page under the keypad (436:5585): TopNav · "Tell us the expert ID of your friend" · Tap to record · Saathi on her disc · I'll enter it,
     then one sheet by phase: keys (Enter Expert ID + keypad) · her (436:5722) · miss (Invalid expert ID with Type expert ID) ---------- */
  const SAATHI = `<div class="x-saathi"><img class="el" src="assets/saathi-ellipse.svg" alt=""><img class="bd" src="assets/saathi-body.svg" alt=""><img class="eye r" src="assets/saathi-eye-right.svg" alt=""><img class="eye l" src="assets/saathi-eye-left.svg" alt=""></div>`;
  const page = () => `${C.topNav()}<div class="x-stage"><div class="middle">
      <p class="x-title">Tell us the expert ID of your friend</p><p class="prompt">Tap to record</p>
      <img class="x-disc" src="assets/saathi-disc.svg" alt="">${SAATHI}
      <div class="x-badge"><img src="assets/mic-badge.svg" alt=""><img class="mic" src="assets/mic-badge-microphone.svg" alt=""></div>
      <a class="x-foot"><img src="assets/keyboard-pink-16.svg" alt=""><span>I’ll enter it</span></a></div></div>`;
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keysSheet = (v) => sheet('x-keys', `
      <div class="x-content">
        <div class="x-stitle">Enter Expert ID</div>
        <div class="x-ssub">Type friend’s expert ID or phone number</div>
        <div class="x-field"><span class="v">${esc(v)}</span><span class="caret"></span></div>
        ${C.button('Find her', { act: 'find', disabled: v.length < 5 })}
      </div>
      <div class="x-keypad">${KEYS.map(k => `<button class="k" data-act="key" data-k="${k}">${k}</button>`).join('')}<span class="k empty"></span><button class="k" data-act="key" data-k="0">0</button><button class="k del" data-act="del">${C.icons['backspace']}</button></div>`);
  // typing updates the field in place (a re-render would replay the sheet's entrance)
  const setInput = (ctx, v) => { ctx.set({ idInput: v }); const f = document.querySelector('[data-screen="EID"] .x-field .v'); if (f) f.textContent = v; const b = document.querySelector('[data-screen="EID"] [data-act="find"]'); if (b) b.disabled = v.length < 5; };
  const pushDigits = (ctx, digits) => setInput(ctx, (ctx.state.idInput + digits).replace(/\D/g, '').slice(0, 5));
  const phase = (ctx, eid, patch = {}) => { ctx.set(Object.assign({ eid }, patch)); ctx.orb('idle'); ctx.rerender(); App.voiceLoop(); };
  const findHer = ctx => { const v = ctx.state.idInput;
    ctx.state.ask.friend = Object.assign({}, ctx.state.ask.friend || {}, { id: v });
    if (v === D.friend.id) phase(ctx, 'her'); else phase(ctx, 'miss', { idMisses: (ctx.state.idMisses || 0) + 1 }); };
  R({ id: 'EID', orb: 'hidden', allowNewAsk: false,
    get scriptKey() { return App.state.eid === 'her' ? 'C3' : 'C1'; },
    render: ({ state }) => { const p = state.eid || 'keys';
      return `${page()}${p === 'her' ? herSheet() : p === 'miss' ? missSheet(true) : keysSheet(state.idInput || '')}`; },
    say: ({ state }) => state.eid === 'her' ? lineHer() : state.eid === 'miss' ? lineKeyMiss : lineKeys,
    onEnter: ctx => { if (!ctx.state.eid) ctx.set({ eid: 'keys' }); if (ctx.state.idInput == null) ctx.set({ idInput: '' }); },
    hear: (u, ctx) => { const p = ctx.state.eid;
      if (p === 'her') { if (u.affirm && !u.negate) { confirmFriend(ctx); return true; } if (u.negate) { phase(ctx, 'keys', { idInput: '' }); return true; } return false; }
      if (p === 'miss') { if (u.type || u.affirm) { phase(ctx, 'keys', { idInput: '' }); return true; } return false; }
      if (u.id) { setInput(ctx, u.id); ctx.after(600, () => findHer(ctx)); return true; }
      const digits = String(u.text || '').replace(/\D/g, '');
      if (digits) { pushDigits(ctx, digits); if (ctx.state.idInput.length === 5) ctx.after(600, () => findHer(ctx)); else ctx.listen(); return true; }
      return false; },
    act: (name, el, ctx) => { const p = ctx.state.eid;
      if (name === 'key') pushDigits(ctx, el.dataset.k);
      if (name === 'del') setInput(ctx, (ctx.state.idInput || '').slice(0, -1));
      if (name === 'find' && (ctx.state.idInput || '').length === 5) findHer(ctx);
      if (name === 'yes') confirmFriend(ctx);
      if (name === 'again') ctx.go('E4');
      if (name === 'type') phase(ctx, 'keys', { idInput: '' });
      if (name === 'x-dismiss') { if (p === 'keys') ctx.go('E4'); else phase(ctx, 'keys', { idInput: '' }); } }
  });
})();
