/* Start late tomorrow (Paper "Hood and shift change" · Multiple entry Review · 3.1 How late FW1-1 · 3.2 Confirm CQ8-1 · 3.3 Saved CRT-1),
   rebuilt in the DS: selection cards (components/selection-card.md, the manual pickers' .m-card), the bottom sheet (the filters' .fsheet),
   Profile as entry and exit. Vocabulary: *login time* by the lead's call (2026-10-14) — experts know the word; PRINCIPLES lists it as avoid, raised as an ask of core; the sheet's way out is "Not now", not "Cancel". */
(() => {
  const R = App.register, D = Data;
  const USUAL = D.her.time.start;                                       // 9
  const OPTS = [{ h: 9.5, loss: 60 }, { h: 10, loss: 125 }, { h: 11, loss: 250 }];   // Paper's values
  const fmt = h => { const whole = Math.floor(h), m = h % 1 ? ':30' : ''; return `${whole % 12 || 12}${m} ${h < 12 ? 'AM' : 'PM'}`; };
  const hi = h => (h % 1 ? `साढ़े ${Math.floor(h)}` : `${h}`) + ' बजे';
  const pick = () => OPTS.find(o => o.h === App.state.latePick) || null;
  /* tomorrow, from the real clock: the DayCell strip tile (components/date-picker.md § Anatomy), read-only, selected state */
  const tmr = () => new Date(Date.now() + 864e5);
  const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], DAYLONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYHI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const MONHI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  const dayTile = () => { const d = tmr(); return `<div class="ll-day" role="img" aria-label="Tomorrow, ${DAYLONG[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}"><span class="n">${d.getDate()}</span><span class="w">${DAY[d.getDay()]}</span></div>`; };
  const dayHi = () => { const d = tmr(); return `${DAYHI[d.getDay()]}, ${d.getDate()} ${MONHI[d.getMonth()]}`; };

  const body = (s) => { const p = pick();
    return `${C.topNav({ title: 'Change tomorrow login time' })}<div class="body ll-body">
      <div class="ll-head"><div class="ll-h">What time will you log in tomorrow?</div>${dayTile()}</div>
      <div class="ll-usual"><span>Current login time</span><b>${fmt(USUAL)}</b></div>
      <div class="m-opts">${OPTS.map(o => `<div class="m-card ll-card ${p === o ? 'on' : ''}" data-act="ll-opt" data-h="${o.h}"><span class="radio ${p === o ? 'on' : ''}"></span><div class="tx"><span class="t">${fmt(o.h)}</span><span class="ll-loss">₹${o.loss} less</span></div></div>`).join('')}</div>
    </div>${C.actions(C.button(p ? 'Confirm' : 'Pick a login time', { act: 'll-go', disabled: !p }))}`; };

  const confirmSheet = (ctx) => { const p = pick();
    ctx.openSheet(`<div class="fsheet ll-sheet"><div class="fgrab"></div><div class="ftitle"><span>Log in at ${fmt(p.h)} tomorrow?</span></div>
      <div class="ll-cost"><span class="ll-amt">− ₹${p.loss}</span><span class="ll-from">From tomorrow's earnings</span></div>
      ${C.button('Confirm', { act: 'll-save' })}<button class="btn btn-text ll-not" data-act="ll-not">Not now</button></div>`,
      { 'll-save': () => save(ctx), 'll-not': () => { ctx.closeSheet(); ctx.back(); }, onClose: () => ctx.back() });
    const w = document.querySelector('.sheet-wrap'); if (w) w.classList.add('filter-sheet');
  };
  const save = (ctx) => { const p = pick();
    ctx.set({ lateStart: { h: p.h, loss: p.loss, label: fmt(p.h) }, history: [] });
    ctx.closeSheet(true); ctx.go('entry');
    ctx.toast(`Saved. Log in at ${fmt(p.h)} tomorrow.`, 3200);
    const t = document.getElementById('toast'); if (t) t.innerHTML = `<span class="ll-tick">${C.icons['check-circle-fill'] || ''}</span><span>Saved. Log in at ${fmt(p.h)} tomorrow.</span>`;   // 3.3: green tick
  };
  const hearTime = (u) => {                                   // "साढ़े 9", "10 बजे", "11 se"
    const t = u.text || ''; const n = (t.match(/\b(9|10|11)\b/) || [])[1];
    if (!n) return null; const h = /sadhe|साढ़े|saadhe|half/.test(t + ' ' + (u.raw || '')) ? +n + 0.5 : +n;
    return OPTS.find(o => o.h === h) || null;
  };

  /* LL1 · 3.1 How late */
  R({ id: 'LL1', orb: 'raised', render: ({ state }) => body(state),
    say: () => `कल ${dayHi()} को आप कितने बजे login करेंगी। अभी आपका login time ${hi(USUAL)} है। जितनी देर से login करेंगी, उतने पैसे कटेंगे।`,
    hear: (u, ctx) => { const o = hearTime(u);
      if (o) { ctx.set({ latePick: o.h }); ctx.rerender(); ctx.say(`${hi(o.h)} login करने पर ${o.loss} रुपये कटेंगे। क्या आप यही चाहती हैं।`).then(() => ctx.listen()); return true; }
      if (u.affirm && pick()) { ctx.go('LL2'); return true; }
      if (u.negate) { ctx.go('entry'); return true; }
      return false; },
    allowNewAsk: false,
    act: (name, el, ctx) => {
      if (name === 'll-opt') { ctx.set({ latePick: +el.dataset.h }); ctx.rerender(); }
      if (name === 'll-go' && pick()) ctx.go('LL2');
    }
  });

  /* LL2 · 3.2 Confirm — the sheet over 3.1 */
  R({ id: 'LL2', orb: 'hidden', render: ({ state }) => body(state),
    onEnter: (ctx) => confirmSheet(ctx),
    say: () => { const p = pick(); return `कल आप ${hi(p.h)} login करेंगी, और कल की कमाई से ${p.loss} रुपये कटेंगे। क्या मैं यह पक्का कर दूँ।`; },
    hear: (u, ctx) => { if (u.affirm) { save(ctx); return true; } if (u.negate) { ctx.closeSheet(true); ctx.back(); return true; } return false; },
    allowNewAsk: false
  });
})();
