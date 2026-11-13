/* Lane C — with a friend. Figma V3 (cIAH24e13VZJu31OmiMWrj, section V3 Expert ID 454:20138), frame by frame:
   C4 · R3 Work with a friend — Anita works here (436:6261) · C4t · Anita's timing is not available (436:6310) · C4a · Anita's area is not available (436:6388) → H4 Select timings (G5 454:29926, lane HT's screen).
   Every Confirm goes to the shared H5 (Confirm your move) → D. Which results show: App.results() — mode open → C4, full → C4t; mode 'area' (?state=area) → C4a; on C4t "दूसरा area" → C4a.
   The shared renderers draw the chrome (C.topNav, C.statusCard, C.filterCard, C.hoodCard, C.areaCard, the Filters sheets); this file only adds
   the "Anita works here" tag (blue A avatar) above her time whichever row is ticked. V4 (492:52510 / 52570 / 52658): the chip band became a card; V4 rev (2026-10-21): C4 "Change shift timing", C4t "Change timing",
   both Start time · Shift time (no End time) — Filters.card; "+10 slots" is "Show more" (C.hoodCard).
   The V2 Expert ID entry (C1 · C1h · C2 · C3) is gone: V3's E1 / E4 / E5 / EID live in screens/expert.js. */
(() => {
  const R = App.register, D = Data, esc = C.esc;
  const L = { picked: false, area: null };   // lane-local: she has picked a row (Confirm turns on) · the area ticked on C4a

  // the pick carries the area *object* (H5 reads pick.area.name / hoods), never the area's name
  const friendArea = () => D.areas[D.friend.area];
  const friendHood = () => friendArea().hoods[0];
  // the row in a hood's list closest to an asked time (exact match first, then nearest start)
  const nearest = (times, t) => { if (!t) return times[0]; return times.find(x => x.start === t.start && x.end === t.end) || times.reduce((b, x) => Math.abs(x.start - t.start) < Math.abs(b.start - t.start) ? x : b, times[0]); };
  const sameTime = (a, b) => !!a && !!b && a.start === b.start && a.end === b.end;
  const sayThenListen = (ctx, line) => { const g = App.gen; ctx.say(line).then(() => { if (App.gen === g) ctx.listen(g); }); };

  /* ---------- results chrome — V4 rev (2026-10-21) 492:52510 · 492:52570: white Top with TopNav "Work with a friend"; body p 16 gap 16 on gray-50:
     [banner] · the timing card (Start time · Shift time, drawn open; Filters' C.filterCard, its sheets) · the list; Confirm.
     The V3 outline chip band is gone. ---------- */
  const head = () => C.topNav({ title: 'Work with a friend' });
  const confirmBar = () => C.actions(C.button('Confirm', { disabled: !L.picked }));
  // "A Anita works here": blue-50 tag, white 20 avatar with her initial — set above her time's line whichever row is ticked (C.hoodCard rowTagAt)
  const friendTag = () => `<span class="c-ftag"><span class="av">${esc(D.friend.first[0])}</span><span class="tx">${esc(D.friend.first)} works here</span></span>`;
  // the friend's hood as the frames draw it: pin + name, no km line; `times` is the list this screen shows
  const hoodCard = (times, selected, tagAt = null, chevron = true) => { const h = friendHood(); return C.hoodCard(Object.assign({}, h, { km: '', times }), { selected, chevron, rowTagAt: tagAt, rowTagHtml: tagAt ? friendTag() : '' }); };
  const setTime = (ctx, t) => ctx.set({ pick: { area: friendArea(), hood: friendHood(), time: t } });
  const sayC4 = ({ state }) => `${D.friend.first} ${D.friend.hood} में ${D.hi.time(state.pick.time || D.friend.time)} काम करती हैं। क्या आप भी यही time लेना चाहेंगी।`;
  const more = ctx => ctx.toast('More slots are not in this demo');

  /* C4 · R3 Results — Anita works here (436:6261): her time ticked with the tag, the hood's other times, +10 slots; Confirm stays off until she picks */
  const allTimes = () => friendHood().times;
  R({ id: 'C4', scriptKey: 'C4',
    render: ({ state }) => `${head(state)}<div class="body">${C.filterCard()}${hoodCard(allTimes(), state.pick.time, D.friend.time)}</div>${confirmBar()}`,
    onEnter: ctx => { if (ctx.state.mode === 'area') { ctx.after(0, () => ctx.go('C4a', null, { replace: true })); return; }
      L.picked = false; setTime(ctx, nearest(allTimes(), ctx.state.ask.time || D.friend.time)); ctx.rerender(); },
    say: sayC4,
    hear: (u, ctx) => {
      if (u.affirm && !u.time) { ctx.go('H5'); return true; }
      if (u.time) { setTime(ctx, nearest(allTimes(), u.time)); L.picked = true; ctx.rerender(); sayThenListen(ctx, sayC4(ctx)); return true; }
      if (u.more) { more(ctx); ctx.listen(); return true; }
      return false; },
    act: (name, el, ctx) => {
      if (name === 'time') { const t = allTimes()[+el.dataset.i]; if (t) { setTime(ctx, t); L.picked = true; ctx.rerender(); } }
      if (name === 'primary' && L.picked) ctx.go('H5');
      if (name === 'more') more(ctx); }
  });

  /* C4t · Anita's timing is not available (436:6310): the banner, then the hood's other times (her full one is not listed); Confirm off until she picks */
  const openTimes = () => allTimes().filter(t => !sameTime(t, D.friend.time));
  R({ id: 'C4t', scriptKey: 'C4t',
    render: ({ state }) => `${head(state)}<div class="body">
      ${C.statusCard({ line: `${D.friend.first}’s timing is not available`, desc: 'Check other times', art: 'time' })}
      ${C.filterCard()}${hoodCard(openTimes(), state.pick.time, null, false)}</div>${confirmBar()}`,
    onEnter: ctx => { L.picked = false; setTime(ctx, openTimes()[0]); ctx.rerender(); },
    say: () => { const [a, b] = openTimes(); return `${D.friend.first} का ${D.hi.time(D.friend.time)} वाला time अभी भरा हुआ है। क्या आप ${D.hi.time(a)} या ${D.hi.time(b)} लेना चाहेंगी।`; },
    hear: (u, ctx) => {
      if (/(^|\s)(area|एरिया|जगह)(\s|$)/.test(u.text)) { ctx.go('C4a'); return true; }
      if (u.time) { const t = nearest(allTimes(), u.time);
        if (sameTime(t, D.friend.time)) { sayThenListen(ctx, `माफ़ कीजिए, ${D.hi.time(t)} अभी भरा हुआ है। क्या आप ${openTimes().map(D.hi.time).join(' या ')} लेना चाहेंगी।`); return true; }
        setTime(ctx, t); ctx.go('H5'); return true; }
      if (u.affirm) { ctx.go('H5'); return true; }
      return false; },
    act: (name, el, ctx) => {
      if (name === 'time') { const t = openTimes()[+el.dataset.i]; if (t) { setTime(ctx, t); L.picked = true; ctx.rerender(); } }
      if (name === 'primary' && L.picked) ctx.go('H5');
      if (name === 'more') more(ctx); }
  });

  /* C4a · Anita's area is not available (436:6388): the banner · "Work near Anita’s area" · the nearby area cards with a radio (Agara recommended, ticked) · Confirm → H4 Select timings */
  const AREAS = () => D.nearby.map(n => D.areas[n]);
  const goArea = (ctx, area) => { const hood = area.hoods[0]; ctx.go('H4', { pick: { area, hood, time: nearest(hood.times, ctx.state.ask.time || D.friend.time) } }); };
  R({ id: 'C4a', scriptKey: 'C4a',
    render: ({ state }) => `${head(state)}<div class="body">
      ${C.statusCard({ line: `${D.friend.first}’s area is not available`, desc: 'Check other areas', art: 'area' })}
      <div class="c-section">Work near ${esc(D.friend.first)}’s area</div>
      <div class="c-areas">${AREAS().map((a, i) => C.areaCard(a, { recommended: i === 0, selected: L.area === a, act: 'area' })).join('')}</div></div>${confirmBar()}`,
    onEnter: ctx => { L.picked = false; L.area = AREAS()[0]; ctx.rerender(); },
    say: () => `${D.friend.first} का area अभी भरा हुआ है। पास में ${D.nearby.join(', ')} में काम खुला है। आप कौनसा देखना चाहेंगी।`,
    hear: (u, ctx) => {
      if (u.place) { const area = D.findArea(u.place);
        if (area && D.nearby.includes(area.name)) { goArea(ctx, area); return true; }
        sayThenListen(ctx, `पास में ${D.nearby.join(', ')} में काम खुला है। आप कौनसा देखना चाहेंगी।`); return true; }
      if (u.affirm) { goArea(ctx, L.area); return true; }
      return false; },
    act: (name, el, ctx) => {
      if (name === 'area') { const area = D.findArea(el.dataset.area); if (area) { L.area = area; L.picked = true; ctx.rerender(); } }
      if (name === 'primary' && L.picked) goArea(ctx, L.area); }
  });
})();
