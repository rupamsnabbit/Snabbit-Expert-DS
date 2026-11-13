/* Entry · My Profile (Figma V3 436:14917; shipped Profile V2 303:33259) — "Change shift or hood" opens the flow.
   V3 row states: NEW (no move) · "Moving <date>" (move booked, 456:34558 → MB) · "Locked" (Day 0, 467:36005 → the dark snackbar "Locked till <date>", 467:36314).
   The row "Change login time" stays (lead's call 2026-10-14), not V3's "Request late login". */
(() => {
  const R = App.register, D = Data;
  const ic = n => `<img class="pic" src="assets/profile/${n}.svg" alt="">`;
  const row = (icon, label, { value = '', tag = '', tagCls = '', act = 'toast', danger = false } = {}) =>
    `<div class="prow" data-act="${act}"><div class="l">${ic(icon)}<span class="plabel ${danger ? 'danger' : ''}">${C.esc(label)}</span></div><div class="r">${tag ? `<span class="ptag ${tagCls}">${C.esc(tag)}</span>` : ''}${value ? `<span class="pval">${C.esc(value)}</span>` : ''}${ic('ic-chevron-right')}</div></div>`;
  const section = (title, rows) => `<div class="psection"><div class="ptitle">${C.esc(title)}</div><div class="pcard">${rows.join('<div class="pdiv"></div>')}</div></div>`;
  const MONLONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ord = n => n + ((n % 100 >= 11 && n % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'));
  const lockText = () => `Locked till ${ord(D.lockUntil.getDate())} ${MONLONG[D.lockUntil.getMonth()]}`;   // Figma: "Locked till 31st december" (placeholder date)

  /* which state the row is in: 'new' · 'moving' · 'locked' */
  const rowState = s => (!s.move || !s.homeDay || s.homeDay === 'none') ? 'new' : (s.homeDay === 'day0' ? 'locked' : 'moving');
  const toFlow = ctx => ctx.go(ctx.state.seenVideo ? 'FQ' : 'video');
  const changeRow = s => { const st = rowState(s);
    if (st === 'moving') return row('ic-shift', 'Change shift or hood', { tag: (state => state.move && (state.move.lane === 'T' || state.move.hood === D.her.hood))(App.state) ? 'New timing' : `Moving ${D.date.dayMonth(D.startDate)}`, tagCls: 'moving', act: 'moving' });
    if (st === 'locked') return row('ic-shift', 'Change shift or hood', { tag: 'Locked', tagCls: 'locked', act: 'locked' });
    return row('ic-shift', 'Change shift or hood', { tag: 'NEW', act: 'change' }); };

  /* V4 505:58520 (2026-10-18): Locked opens a bottom sheet — picture (Saathi, the frame's placeholder circle), "Locked till / <date>, <year>" H2, "Ok, understood". Replaces the V3 snackbar. */
  const lockSheet = ctx => {
    ctx.openSheet(`<span class="h-x" data-act="sheet-dismiss"><img class="pic" src="assets/home/close.svg" alt=""></span>
      <div class="h-sheet-top"><div class="h-saathi"></div><div class="h-q">Locked till<br>${ord(D.lockUntil.getDate())} ${MONLONG[D.lockUntil.getMonth()]}, ${D.lockUntil.getFullYear()}</div></div>
      <div class="h-btns">${C.button('Ok, understood', { act: 'lock-ok' })}</div>`, { 'lock-ok': () => ctx.closeSheet(true) });
    const w = document.querySelector('.sheet-wrap'); if (w) w.classList.add('home-sheet');
  };
  /* the dark snackbar under the row (467:36314), inside the Shift & Availability card */
  let snackT = null;
  const snack = (el) => { const card = el.closest('.pcard'); if (!card) return;
    card.querySelectorAll('.psnack').forEach(n => n.remove()); clearTimeout(snackT);
    const n = document.createElement('div'); n.className = 'psnack'; n.textContent = lockText();
    n.style.top = (el.offsetTop + 114) + 'px'; card.appendChild(n);   // Figma: 114 below the row's top, over the next rows

    requestAnimationFrame(() => n.classList.add('in')); snackT = setTimeout(() => { n.classList.remove('in'); setTimeout(() => n.remove(), 200); }, 2400); };

  /* Spotlight (Figma V3 436:15527, components/coachmark.md kind point): the first time Profile shows in a session, *Change shift or hood* is lit,
     everything else is dimmed, Saathi's face and a white bubble say "Now, you can change your hood and shift time", and Saathi says it once.
     Tapping the lit row opens the flow; a tap anywhere else closes it. The switch's Reset → Spotlight replays it. */
  const coach = ctx => { if (ctx.state.coachSeen || App.current !== 'entry' || rowState(ctx.state) !== 'new') return;
    const row = document.querySelector('#screen .prow[data-act="change"]'), pane = document.querySelector('#screen .profile'); if (!row || !pane) return;
    const rr = row.getBoundingClientRect(), pr = pane.getBoundingClientRect();
    const show = () => { if (App.current !== 'entry' || ctx.state.coachSeen) return;
      Coach.show({ target: row, text: 'Now, you can change your hood and shift time', line: 'अब आप अपना hood और shift का समय खुद बदल सकती हैं।',
        onDone: () => { ctx.state.coachSeen = true; pane.style.overflowY = ''; }, onDo: () => toFlow(ctx) }); };
    const delta = (rr.top + rr.height / 2) - (pr.top + pr.height * 0.62);                 // row just below the middle: room above it for Saathi and the bubble
    if (Math.abs(delta) < 40) { show(); return; }
    const goal = Math.max(0, Math.min(pane.scrollHeight - pane.clientHeight, pane.scrollTop + delta));
    let done = false; const go = () => { if (done) return; done = true; pane.removeEventListener('scrollend', go);
      pane.style.overflowY = 'hidden'; pane.scrollTo({ top: goal, behavior: 'instant' });   // stop any scroll still running and land exactly on the row; the page holds still under the scrim
      App.after(100, show); };
    pane.addEventListener('scrollend', go); App.after(900, go);                         // light it only once the scroll has stopped
    pane.scrollBy({ top: delta, behavior: 'smooth' });                                 // bring the row into view first
  };

  R({ id: 'entry', orb: 'hidden', listen: false,   // Profile is silent except for the one-time Coachmark on *Change shift or hood*
    onEnter: ctx => { App.after(1000, () => coach(ctx)); },                           // she sees Profile for a beat (motion.beat) before it talks
    render: ({ state }) => `${C.topPlain()}<div class="profile">
      <div class="ph2">Profile</div>
      <div class="hero"><img class="hero-bg" src="assets/profile/medal.svg" alt="">
        <div class="hero-top"><div class="photo"><img src="assets/profile/photo.png" alt=""></div><div class="who"><span class="name">Reema Saju</span><span class="eid">#SNAB2413</span></div><div class="rating">${ic('star')}<span>4.2</span></div></div>
        <div class="hero-bottom"><div class="tier"><img class="medal" src="assets/profile/tier-a.png" alt=""><span>Gold Tier</span></div><div class="viewtier" data-act="toast"><span>View tier</span>${ic('chevron')}</div></div>
      </div>
      <div class="tiering" data-act="toast"><div class="tdisc"></div><div class="ttext"><span class="ttitle">View Snabbit Tiering</span><span class="tsub">A new way to reward good work ${ic('chev-small')}</span></div></div>
      ${state.booked ? `<div class="strip">${C.icons['check-circle-fill']}<span>${C.esc(state.booked)}</span></div>` : ''}
      ${section('Earnings & Payments', [row('ic-earnings', 'Monthly earnings', { value: '₹24,000', act: 'toast' }), row('ic-payout', 'Payout history'), row('ic-early', 'Early Payout', { tag: 'NEW' })])}
      ${section('Shift & Availability', [changeRow(state), (state.lateStart ? `<div class="prow ll-set" data-act="late-set"><div class="l">${ic('ic-late')}<div class="lt"><span class="plabel">Login time tomorrow</span><span class="psub">You log in at ${state.lateStart.label} · can't be changed</span></div></div><div class="r"></div></div>` : row('ic-late', 'Change login time', { tag: 'NEW', act: 'late' })), row('ic-overtime', 'Request overtime'), row('ic-leave', 'Apply leave'), row('ic-logout', 'Emergency logout', { danger: true })])}
      ${section('Benefits & Perks', [row('ic-refer', 'Refer & earn'), row('ic-seva', 'Seva', { tag: 'NEW' }), row('ic-insurance', 'Insurance'), row('ic-store', 'Snabbit store')])}
      ${section('Account & Settings', [row('ic-language', 'Language'), row('ic-emergency', 'Emergency contact'), row('ic-kyc', 'Personal details & KYC'), row('ic-bank', 'Bank details', { value: 'ICICI****4567' }), row('ic-pan', 'PAN details', { value: 'PBYDC0243F' })])}
      <div class="pfoot">SNABBIT EXPERT 2.0</div>
    </div>
    <div class="bottomnav"><div class="tab" data-act="go" data-to="home"><div class="tabic">${ic('nav-home')}</div><span>Home</span></div><div class="tab" data-act="toast"><div class="tabic">${ic('nav-earnings')}</div><span>Earnings</span></div><div class="tab" data-act="toast"><span class="badge">₹4000</span><div class="tabic">${ic('nav-refer')}</div><span>Refer</span></div><div class="tab on"><div class="tabic">${ic('nav-profile')}</div><span>Profile</span></div></div>`,
    hear: (u, ctx) => { if (u.affirm || u.newAsk) { if (u.newAsk) ctx.newAsk(u); else toFlow(ctx); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'change') toFlow(ctx); if (name === 'moving') ctx.go('MB'); if (name === 'locked') lockSheet(ctx); if (name === 'late') ctx.go('LL1', { latePick: null }); if (name === 'late-set') ctx.toast(`Tomorrow's login time is set for ${ctx.state.lateStart.label}`); }
  });
})();
