/* Lane T — my hood, other time. Rebuilt to Figma V3 (file cIAH24e13VZJu31OmiMWrj, section 436:4761, row "My hood - other time" + "(not found)"), 2026-10-15;
   V4 (2026-10-17, section 481:36972): the chip row is gone — a timing card sits at the top of the list; time rows read "7:00 AM to 5:00 PM" over clock + "N hours".
   V4 revised (2026-10-21): time is start + hours, so the card has Shift time · Start time only (Filters / C.filterCard), and the "not found" row is a cascade
   (row "Change shift time (not found)", y 2518): her hood, other times (T1f) → other hoods (TH) → other areas (TA) → nothing anywhere (T0).
   Which one opens is state.mode — App.results(): 'full' → T1f, 'hood' → TH, 'area' → TA, 'none' → T0, else T1.
   T1  · 481:41401  "My hood" — "Change shift timings" (open), one card: tag "Current hood" above map-pin + Kudlu gate, radio rows, "Show more", Confirm
   T1f · 443:16866  the 1.06 sheet "Requested time in your hood is not there / Wait for them, or see other times / Join waitlist" over the "Work for you" floor;
         X → 481:41899 (title "Kudlu gate", banner "Timing is not available / Check other times", "Change shift timing" open, the times);
         Join waitlist → 481:42069 (the banner with its icon button, the card shut)
   TH  · 629:71703  "Kudlu gate" — banner "Timing in your hood unavailable / Check other hoods", "Change shift timing" (Hood name · Shift time · Start time),
         the hoods of the nearest area with her time (one open, the rest shut), "Show more", Confirm → H5 (a hood move)
   TA  · 632:72095  "Kudlu gate" — banner "Timing in this area unavailable / Check other areas", "Change shift timing" (Shift time · Start time),
         area cards (radio · Recommended · map-pin + area · km | Earn upto · N Hoods | Starts 9AM), Confirm → H4 "Select hood and timings" → H5
   T0  · 502:55128  "Sorry, no open slots available anywhere" + "Restart" → the option screen with "Change my shift time" picked (632:75129)
   T2  · Confirm your time — the shared confirm (C.confirmMove), no tag (505:56463), "Change my time" → D */
(() => {
  const R = App.register, D = Data;
  const L = { floor: false, open: null, area: null };   // T1f: the 1.06 sheet is up · TH: the open hood card · TA: the ticked area
  const asked = s => s.ask.time || { start: 7, end: 15 };
  const T_SCREENS = ['T1', 'T2'];
  const allRows = s => (s.mode === 'open' && T_SCREENS.includes(s.screen) ? D.herTimesExtra.concat(D.herTimes) : D.herTimes);
  const rows = s => allRows(s);                      // "6 घंटे वाला" and the card's sheets cut the list in Filters (C.hoodCard), not here
  const nearest = (list, t) => list.reduce((b, r) => Math.abs(r.start - t.start) < Math.abs(b.start - t.start) ? r : b);
  const hoodOf = (s, km = D.her.km) => ({ name: D.her.hood, km, times: rows(s) });
  const tick = (ctx, t) => ctx.set({ pick: { area: D.her.area, hood: hoodOf(ctx.state), time: t } });
  const resay = async (ctx, line) => { App.gen++; Voice.cancel(); await ctx.say(line); ctx.listen(++App.gen); };
  const tWant = s => D.hi.start(asked(s).start);
  const more = ctx => ctx.toast('More slots are not in this demo');

  /* the V3 card (443:16517 / 443:16708): tag above the name, the area as the name, no km line, no caret */
  const card = s => C.hoodCard({ name: D.her.area, km: '', times: rows(s) }, { selected: s.pick.time, label: 'Current hood', chevron: false });

  /* T1 · 481:41401 — her ask ticked in the list; Confirm below */
  R({ id: 'T1',
    render: ({ state }) => `${C.topNav({ title: 'My hood' })}<div class="body">${C.filterCard()}${card(state)}</div>${C.actions(C.button('Confirm'))}`,
    onEnter: ctx => { tick(ctx, nearest(rows(ctx.state), asked(ctx.state))); ctx.rerender(); },
    say: ({ state }) => `आपके hood में ${D.hi.start((state.pick.time || nearest(rows(state), asked(state))).start)} का time खुला है। क्या आप यह time लेना चाहेंगी।`,
    hear: (u, ctx) => { const s = ctx.state;
      if (u.place) return false;                                            // a place is a new ask
      if (u.time) { tick(ctx, nearest(rows(s), u.time)); ctx.rerender(); if (u.affirm) ctx.go('T2'); else resay(ctx, `ठीक है, मैंने ${D.hi.time(s.pick.time)} चुन लिया है। क्या आप इसे पक्का करना चाहेंगी।`); return true; }
      if (u.hours) return false;                                            // "6 घंटे वाला": Filters.hear sets the Shift time field and cuts the list
      if (u.affirm) { ctx.go('T2'); return true; }
      return false; },
    act: (name, el, ctx) => {
      if (name === 'time') { tick(ctx, rows(ctx.state)[+el.dataset.i]); ctx.rerender(); }
      if (name === 'primary') ctx.go('T2');
      if (name === 'more') more(ctx);
      if (name === 'change') ctx.go('S1b'); }
  });

  /* T1f · 443:16866 sheet over the floor → 481:41899 list (X) or 481:42069 list with the waitlist icon button (Join waitlist) */
  const alts = s => rows(s).filter(r => r.start !== D.her.time.start).slice(0, 2).map(r => r.start % 12 || 12);
  const listLine = s => { const [a, b] = alts(s); return `आपके hood में ${a} या ${b} बजे का time खुला है। आप कौनसा time लेना चाहेंगी।`; };
  const toList = ctx => { L.floor = false; ctx.closeSheet(true); ctx.rerender(); };
  const join = ctx => { const s = ctx.state;
    ctx.set({ joined: true, waitlisted: { what: D.fmt(asked(s)), where: D.her.area } }); toList(ctx);
    resay(ctx, `ठीक है, ${tWant(s)} का time खुलते ही मैं आपको बता दूँगी। तब तक आप दूसरे time देख सकती हैं।`); };
  const seeOther = ctx => { toList(ctx); resay(ctx, listLine(ctx.state)); };
  const leave = ctx => { ctx.set({ joined: false, waitlisted: null }); ctx.rerender(); resay(ctx, 'ठीक है, मैंने आपको waitlist से हटा दिया है।'); };
  const sheetHtml = () => C.fullSheet({ title: 'Requested time in your\nhood is not there', body: 'Wait for them, or see other times' });
  R({ id: 'T1f',
    render: ({ state }) => L.floor ? C.floor106() : `${C.topNav({ title: D.her.area })}<div class="body t-gap16">
      ${C.statusCard({ line: 'Timing is not available', desc: 'Check other times', art: 'time', button: state.joined ? { act: 'wl', icon: 'currency-inr' } : null })}
      ${C.filterCard()}${card(state)}</div>
      ${C.actions(C.button('Confirm', { disabled: !state.pick.time }))}`,
    onEnter: ctx => { const s = ctx.state; const prev = s.history[s.history.length - 1];
      // nothing is ticked on her asked time (it is not there): the nearest other time is pre-ticked, as 481:41899 draws a ticked first row
      const list = rows(s).filter(r => !(r.start === D.her.time.start && r.end === D.her.time.end));
      if (!s.pick.time || prev !== 'T2') tick(ctx, nearest(list.length ? list : rows(s), asked(s)));
      L.floor = !s.joined && prev !== 'T2'; ctx.rerender();
      if (L.floor) ctx.openSheet(sheetHtml(), { join: () => join(ctx), onClose: () => seeOther(ctx) }); },
    say: ({ state: s }) => L.floor ? `माफ़ कीजिए, ${tWant(s)} का time अभी आपके hood में नहीं है। क्या आप चाहेंगी कि time खुलते ही मैं आपको बता दूँ, या आप दूसरे time देखना चाहेंगी।`
      : s.joined ? `${tWant(s)} के लिए आप waitlist पर हैं। तब तक ${listLine(s).replace('आपके hood में ', '')}` : listLine(s),
    hear: (u, ctx) => { const s = ctx.state;
      if (u.place) return false;
      if (u.waitlist || (L.floor && u.affirm && !u.time)) { join(ctx); return true; }
      if (u.leave && s.joined) { leave(ctx); return true; }
      if (L.floor && (u.negate || u.more || /dikhao|दिखा|दूसरे/.test(u.text || ''))) { seeOther(ctx); return true; }
      if (u.time) { tick(ctx, nearest(rows(s), u.time)); toList(ctx);
        (async () => { await ctx.say(`ठीक है, मैंने ${D.hi.time(s.pick.time)} चुन लिया है।`); ctx.go('T2'); })(); return true; }
      if (u.affirm) { if (s.pick.time) ctx.go('T2'); else resay(ctx, `आप कौनसा time लेना चाहेंगी, ${alts(s).join(' या ')} बजे का।`); return true; }
      if (u.negate) { resay(ctx, 'ठीक है, कोई बात नहीं। जब भी आप चाहें, मुझे बता दीजिएगा।'); return true; }
      return false; },
    act: (name, el, ctx) => { const s = ctx.state;
      if (name === 'time') { tick(ctx, rows(s)[+el.dataset.i]); ctx.rerender(); }
      if (name === 'primary' && s.pick.time) ctx.go('T2');
      if (name === 'wl') resay(ctx, `आप ${tWant(s)} के waitlist पर हैं। time खुलते ही मैं आपको बता दूँगी।`);
      if (name === 'more') more(ctx);
      if (name === 'change') ctx.go('S1b'); }
  });

  /* ---------- TH · 629:71703 — her time is not in her hood: the hoods of the nearest area (Agara) with her time; Confirm → H5 (a hood move) ---------- */
  const want = s => { const t = asked(s); return { start: t.start, end: t.end }; };
  // the row closest to what she asked: start and length count the same (an 8-hour 9 AM row beats a 2-hour 8 AM row for "7 से 8 घंटे")
  const gap = (x, t) => Math.abs(x.start - t.start) + Math.abs((x.end - x.start) - (t.end - t.start));
  const closest = (hood, t) => hood.times.reduce((b, x) => gap(x, t) < gap(b, t) ? x : b, hood.times[0]);
  const thArea = s => (s.pick.area && typeof s.pick.area === 'object' && D.nearby.includes(s.pick.area.name)) ? s.pick.area : D.areas[D.nearby[0]];
  const thPick = (ctx, area, hood, time) => { ctx.set({ pick: { area, hood, time: time || closest(hood, want(ctx.state)) } }); L.open = hood.name; };
  const prepTH = ctx => { const s = ctx.state, area = thArea(s);
    if (s.pick.area !== area || !s.pick.hood || !area.hoods.includes(s.pick.hood)) thPick(ctx, area, area.hoods[0]);
    if (!L.open) L.open = s.pick.hood.name; };
  const thLine = s => { const p = s.pick; return `${p.hood.name} में ${D.hi.time(p.time)} का time खुला है। क्या आप यह लेना चाहेंगी।`; };
  R({ id: 'TH',
    render: ctx => { prepTH(ctx); const s = ctx.state, p = s.pick;
      return `${C.topNav({ title: D.her.area })}<div class="body t-gap16">
        ${C.statusCard({ line: 'Timing in your hood unavailable', desc: 'Check other hoods', art: 'time' })}
        ${C.filterCard()}<div class="t-cards">${p.area.hoods.map(h => C.hoodCard(h, { open: h.name === L.open, selected: p.hood === h ? p.time : null })).join('')}</div></div>
        ${C.actions(C.button('Confirm'))}`; },
    onEnter: ctx => { L.open = ctx.state.pick.hood ? ctx.state.pick.hood.name : null; ctx.rerender(); },
    say: ({ state: s }) => `माफ़ कीजिए, ${tWant(s)} का time आपके hood में नहीं है। पास में ${thLine(s)}`,
    hear: (u, ctx) => { const s = ctx.state, p = s.pick;
      if (u.place) { const area = D.findArea(u.place);
        if (area && D.nearby.includes(area.name)) { const h = (u.subhood && area.hoods.find(x => x.name.toLowerCase().includes(String(u.subhood).toLowerCase()))) || area.hoods[0];
          thPick(ctx, area, h, u.time ? closest(h, u.time) : null); ctx.rerender(); resay(ctx, thLine(ctx.state)); return true; }
        return false; }
      if (u.subhood) { const h = p.area.hoods.find(x => x.name.toLowerCase().includes(String(u.subhood).toLowerCase()));
        if (h) { thPick(ctx, p.area, h, u.time ? closest(h, u.time) : null); ctx.rerender(); resay(ctx, thLine(ctx.state)); return true; } }
      if (u.time) { thPick(ctx, p.area, p.hood, closest(p.hood, u.time)); ctx.rerender(); resay(ctx, thLine(ctx.state)); return true; }
      if (u.hours) return false;
      if (/(^|\s)(area|एरिया|इलाक)/.test(u.text || '')) { ctx.go('TA'); return true; }
      if (u.affirm) { ctx.go('H5'); return true; }
      if (u.more) { const hs = p.area.hoods, i = hs.indexOf(p.hood); thPick(ctx, p.area, hs[(i + 1) % hs.length]); ctx.rerender(); resay(ctx, thLine(ctx.state)); return true; }
      if (u.negate) { resay(ctx, `ठीक है। आप ${p.area.name} के दूसरे hood देख सकती हैं, या दूसरा area बोलिए।`); return true; }
      return false; },
    act: (name, el, ctx) => { const p = ctx.state.pick, hood = p.area.hoods.find(h => h.name === el.dataset.hood);
      if (name === 'hood' && hood) { if (L.open === hood.name) L.open = null; else thPick(ctx, p.area, hood); ctx.rerender(); }
      if (name === 'time' && hood) { thPick(ctx, p.area, hood, hood.times[+el.dataset.i]); ctx.rerender(); }
      if (name === 'primary') ctx.go('H5');
      if (name === 'more') more(ctx); }
  });

  /* ---------- TA · 632:72095 — not in the nearby hoods either: the areas near her that start at her time; Confirm → H4 "Select hood and timings" → H5 ---------- */
  const AREAS = () => D.nearby.map(n => D.areas[n]);
  const startsAt = s => { const h = asked(s).start; return `${h % 12 || 12}${h < 12 ? 'AM' : 'PM'}`; };   // "Starts 9AM" — her start
  const toH4 = (ctx, area) => { const hood = area.hoods[0]; ctx.go('H4', { pick: { area, hood, time: closest(hood, want(ctx.state)) } }); };
  R({ id: 'TA',
    render: ({ state: s }) => { const sel = L.area || D.nearby[0];
      return `${C.topNav({ title: D.her.area })}<div class="body t-gap16">
        ${C.statusCard({ line: 'Timing in this area unavailable', desc: 'Check other areas', art: 'time' })}
        ${C.filterCard()}<div class="t-cards">${AREAS().map((a, i) => C.areaCard(Object.assign({}, a, { starts: startsAt(s) }), { recommended: i === 0, selected: a.name === sel })).join('')}</div></div>
        ${C.actions(C.button('Confirm'))}`; },
    onEnter: ctx => { if (!L.area || !D.nearby.includes(L.area)) L.area = D.nearby[0]; ctx.rerender(); },
    say: ({ state: s }) => { const [a, b, c] = AREAS(); const km = x => String(x.km).split(' km')[0];
      return `माफ़ कीजिए, ${tWant(s)} का time पास के hoods में भी नहीं है। ${a.name} में ${tWant(s)} से काम है, ${km(a)} किलोमीटर दूर। ${b.name} और ${c.name} में भी है। आप कौनसा area देखना चाहेंगी।`; },
    hear: (u, ctx) => {
      if (u.place) { const area = D.findArea(u.place); if (area && D.nearby.includes(area.name)) { toH4(ctx, area); return true; }
        resay(ctx, `पास में ${D.nearby.join(', ')} है। आप कौनसा area देखना चाहेंगी।`); return true; }
      if (/sabse paas|pehla|pehle wala|nearest|first|पहला|सबसे पास/.test(u.text || '')) { toH4(ctx, AREAS()[0]); return true; }
      if (u.affirm) { toH4(ctx, D.areas[L.area || D.nearby[0]]); return true; }
      if (u.negate) { resay(ctx, 'ठीक है। जब भी आप चाहें, कोई area बोल दीजिए।'); return true; }
      return false; },
    act: (name, el, ctx) => {
      if (name === 'area') { L.area = el.dataset.area; ctx.rerender(); }
      if (name === 'primary') toH4(ctx, D.areas[L.area || D.nearby[0]]); }
  });

  /* T2 · Confirm your time — the shared confirm (C.confirmMove): her own hood, no tag (505:56463), Old | New columns, date in the footer; "Change my time" → D */
  const newTime = s => s.pick.time || D.herTimesExtra[0];
  R({ id: 'T2',
    render: ({ state }) => { const t = newTime(state);
      return C.confirmMove({ title: 'Confirm your time', tag: null, name: D.her.hood, area: D.her.area, oldTime: D.her.time, newTime: t, oldPay: D.her.pay, newPay: t.pay, button: 'Change my time' }); },
    say: ({ state }) => { const t = newTime(state), diff = D.her.pay - t.pay;
      const money = diff > 0 ? `इसमें आपको ${t.pay.toLocaleString('en-IN')} रुपये मिलेंगे, जो अभी से ${diff.toLocaleString('en-IN')} कम है` : `आपका पैसा वही रहेगा, ${D.her.pay.toLocaleString('en-IN')} रुपये`;
      return `आपका time ${D.hi.time(D.her.time)} से बदलकर ${D.hi.time(t)} हो जाएगा। ${money}। यह ${D.startDayHi} से लागू होगा। क्या आप इसे पक्का करना चाहेंगी।`; },
    hear: (u, ctx) => { if (u.affirm) { ctx.go('D'); return true; } if (u.negate) { ctx.back(); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'primary') ctx.go('D'); }
  });

  /* T0 · 502:55128 "Sorry, no open slots available anywhere": white page, no TopNav, picture 266 × 200, H2 24/32 centred, "Restart" →
     the option screen with "Change my shift time" picked (632:75129). The frame draws no orb; she still speaks and listens. */
  const restart = ctx => ctx.go('FQ', { fqPick: 'time', intent: 'time', lane: 'T', history: [] });
  R({ id: 'T0', orb: 'hidden', white: true,
    render: () => `${C.topPlain()}<div class="result t0"><img src="assets/results/no-slots.png" alt="" width="266" height="200" style="object-fit:cover"><div class="t0-h">Sorry, no open slots available anywhere</div></div><div class="t0-foot">${C.button('Restart', { act: 'restart' })}</div>`,
    say: () => 'माफ़ कीजिए, अभी कहीं भी कोई slot खाली नहीं है। क्या आप फिर से शुरू करना चाहेंगी।',
    hear: (u, ctx) => { if (u.affirm || /restart|फिर से|phir se|dobara|दोबारा/i.test(u.text || '')) { restart(ctx); return true; } if (u.negate || u.home) { ctx.go('entry', { history: [] }); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'restart') restart(ctx); }
  });
})();
