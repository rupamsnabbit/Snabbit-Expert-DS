/* V3 Home (Figma cIAH24e13VZJu31OmiMWrj · section V3 436:4761), each region from its frame's get_design_context, fitted to the 360 stage
   the way Profile fits its 393 frame (16 side margin, cards 328 wide).
   - Discoverability (no move): 436:13991 on shift (map · "Shift ends at …" · Logout) and 436:12023 off shift (map · "Searching for jobs nearby").
     The sheet "Do you want to change shift time or hood?" opens once per session shortly after Home appears (Saathi speaks it);
     the Saathi chip reopens it. Yes, change → the flow; No, call agent → not in the demo. (The frames do not say what opens it: our call.)
   - Post-change hand-hold (state.move set by Done; the day from the switch's Day row): 456:34240 booked · 456:35011 last day ·
     456:35374 after logout · 460:6995 Day 0. The moving card opens MB (456:34862 Change shift or hood · move booked).
   Home is silent except for the sheet. */
(() => {
  const timeOnly = m => !!m && (m.lane === 'T' || m.hood === Data.her.hood);   // lane T: same hood, new time — not a move
  const R = App.register, D = Data;
  const img = (n, cls = '') => `<img class="${cls}" src="assets/home/${n}" alt="">`;
  const esc = s => C.esc(s);

  /* ---------- the move: state.move from Done, or the brief's fallback (HSR's first hood, 10 AM – 4 PM) ---------- */
  const FALLBACK = () => { const a = D.areas.HSR; return { hood: a.hoods[0], area: a, time: { start: 10, end: 16 }, pay: 16500, lane: 'HT', demo: true }; };
  const move = s => s.move || FALLBACK();
  const hoodName = m => (m.hood && m.hood.name) || m.hood || '';
  const areaName = m => (m.area && m.area.name) || m.area || '';
  const hm = h => `${h % 12 || 12}:00 ${h < 12 || h === 24 ? 'AM' : 'PM'}`;                         // "7:00 AM"
  const loginBy = h => `${(h - 1) % 12 || 12}:50 ${h - 1 < 12 ? 'AM' : 'PM'}`;                      // ten minutes before the start
  const daysTo = () => Math.max(1, D.date.daysFrom(D.today, D.startDate));
  const H = window.Home = { move, hoodName, areaName, daysTo, FALLBACK };                            // Profile and MB read the same move

  /* ---------- shared pieces ---------- */
  // Top nav (1491:15136): bell with its count, SOS · Saathi · coins chips
  const chip = (icon, label, cls, act = 'toast') => `<div class="h-chip" data-act="${act}"><span class="h-chipic">${img(icon, icon === 'coin.svg' ? 'coin' : '')}</span><span class="h-pill ${cls}">${label}</span></div>`;
  const topbar = () => `<div class="h-top"><div class="h-bell" data-act="toast">${img('bell.svg')}<span class="h-count">1</span></div>
    <div class="h-chips">${chip('sos.svg', 'SOS', 'sos')}${chip('faq.svg', 'Saathi', 'saathi', 'saathi')}${chip('coin.svg', '30', 'coins')}</div></div>`;
  // More From Snabbit (Banners - 24): the refer banner, built from its parts; after logout a carousel with the purple banner first
  const blue = () => `<div class="h-banner blue" data-act="toast"><div class="h-cooks"><span>COOOOKS</span><span>COOOOKS</span><span>COOOOKS</span><span>COOOOKS</span></div>
    <div class="h-cook">${img('cook.png')}<i></i></div><div class="h-btxt"><span>Refer and earn upto</span><b>₹4000</b></div><span class="h-refer">Refer Now</span></div>`;
  const purple = () => `<div class="h-banner" data-act="toast">${img('banner-purple.png')}</div>`;
  const more = (carousel = false) => `<div class="h-more"><div class="h-mtitle">More From Snabbit</div>${carousel ? `<div class="h-carousel">${purple()}${blue()}</div><div class="h-dots"><i></i></div>` : blue()}</div>`;
  // Bottom nav (436:11750): Home on; Profile goes to Profile (entry)
  const nav = () => `<div class="bottomnav"><div class="tab on"><div class="tabic"><img class="pic" src="assets/home/nav-home-on.svg" alt=""></div><span>Home</span></div><div class="tab" data-act="toast"><div class="tabic"><img class="pic" src="assets/profile/nav-earnings.svg" alt=""></div><span>Earnings</span></div><div class="tab" data-act="toast"><span class="badge">₹4000</span><div class="tabic"><img class="pic" src="assets/profile/nav-refer.svg" alt=""></div><span>Refer</span></div><div class="tab" data-act="go" data-to="entry"><div class="tabic"><img class="pic" src="assets/home/nav-profile-off.svg" alt=""></div><span>Profile</span></div></div>`;

  /* ---------- discoverability: the map header (Maps 1582:7057) ---------- */
  const pin = (cls, style) => `<div class="h-pin ${cls}" style="${style}"><span class="w">${img('pin-white.svg')}</span><span class="f"></span></div>`;
  const mapHead = (off) => {
    const end = D.her.time.end;
    const widget = off
      ? `<div class="h-widget search" data-act="toast"><span>Searching for jobs nearby</span><span class="h-search">${C.icons['magnifying-glass'] || ''}</span><i class="h-glow"></i></div>`
      : `<div class="h-widget shift"><div class="l"><span class="h-ph"></span><span>Shift ends at ${end % 12 || 12}:00${end < 12 ? 'AM' : 'PM'}</span></div><button class="h-logout" data-act="logout">Logout</button></div>`;
    return `<div class="h-map"><div class="h-mapimg">${img('map.png')}</div><i class="h-haze"></i>
      <div class="h-me"><i class="r54"></i><i class="r38"></i>${img('me-ring.svg', 'ring')}${img('me.png', 'face')}</div>
      ${pin(off ? '' : 'b', 'left:27px;top:181px')}${pin('', 'right:21px;top:259px')}<i class="h-fade"></i>${widget}${topbar()}</div>`;
  };

  /* ---------- hand-hold cards ---------- */
  const moveCard = (m, day) => {
    const n = daysTo(), t = m.time;
    if (day === 'booked') return `<div class="h-move" data-act="mb"><div class="h-count-box"><b>${n}</b><span>${n === 1 ? 'DAY' : 'DAYS'}</span></div><div class="h-mtext"><b>${timeOnly(m) ? 'New shift timings soon' : `Moving to ${esc(hoodName(m))}`}</b><span>${timeOnly(m) ? `From ${D.date.short(D.startDate).split(' ')[0]}, ${D.date.dayMonth(D.startDate)}, ${D.fmt(t)}` : `From ${D.date.dayMonth(D.startDate)} · ${D.fmt(t)}`}</span></div>${img('caret-right.svg', 'h-caret')}</div>`;
    return `<div class="h-move soon" data-act="mb"><div class="h-count-box"><b>1</b><span>DAY</span></div><div class="h-mtext"><b>${timeOnly(m) ? 'New shift timings tomorrow' : `Tomorrow at ${esc(hoodName(m))}`}</b><span>${D.fmt(t)}</span></div>${img('caret-right.svg', 'h-caret')}</div>`;
  };
  // Attendance (Present + Nudge 456:34105): the day's shift, Present / Change, Login, and the yellow "Login by" strip
  const shiftCard = ({ date, time, login = true }) => {
    const card = `<div class="h-att"><i class="h-band"></i><div class="h-when"><span>${esc(D.date.long(date))}</span><b>${hm(time.start)}  -  ${hm(time.end)}</b></div>
      <div class="h-present"><div class="l">${img('present.svg')}<span>Present</span></div><span class="h-change" data-act="toast">${img('change.svg')}<span>Change</span></span></div>
      ${login ? `<button class="btn btn-primary" data-act="toast">Login</button>` : ''}</div>`;
    if (!login) return card;
    return `<div class="h-attwrap">${card}<div class="h-nudge"><div class="l"><span class="h-money">${img('money-bg.svg')}${img('money-arrow.svg', 'arr')}</span><span>Login by <b>${loginBy(time.start)}</b></span></div><span class="h-coins">${img('coin.svg')}<b>1</b></span></div></div>`;
  };
  const hotspot = (title, name, sub) => `<div class="h-hot"><div class="h-hotl"><div class="h-hott">${img('pin-16.svg')}<span>${esc(title)}</span></div><span class="h-hotn">${esc(name)}</span><span class="h-hots">${esc(sub)}</span></div><div class="h-mapbtn" data-act="toast"><span>${img('map-arrow.svg')}</span><i>Map</i></div></div>`;
  const pinkHead = (inner) => `<div class="h-head"><i class="h-blob a"></i><i class="h-blob b"></i>${topbar()}<div class="h-cards">${inner}</div></div>`;

  const handHold = (s) => {
    const m = move(s), day = s.homeDay, her = D.her;
    const eve = D.date.addDays(D.startDate, -1);
    const herHotspot = () => hotspot('Your Hotspot', 'Jyoti Nivas College Gate', '3.2 km away');
    if (day === 'booked') return pinkHead(moveCard(m, day) + shiftCard({ date: D.today, time: her.time }) + herHotspot()) + more();
    if (day === 'lastday') return pinkHead(moveCard(m, day) + shiftCard({ date: eve, time: her.time }) + herHotspot()) + more();
    if (day === 'afterlogout') return pinkHead(moveCard(m, day) + shiftCard({ date: eve, time: her.time, login: false })) + more(true);
    return pinkHead(shiftCard({ date: D.startDate, time: m.time }) + hotspot('Your new Hotspot', hoodName(m), 'New hood')) + more();   // day0
  };
  const isHandHold = s => !!s.move && s.homeDay && s.homeDay !== 'none';

  /* ---------- the discoverability sheet (Bottom Sheets 436:14883) ---------- */
  const LINE = 'क्या आप अपनी shift का समय या hood बदलना चाहती हैं।';
  const toFlow = ctx => ctx.go(ctx.state.seenVideo ? 'FQ' : 'video');
  const quiet = () => { Voice.cancel(); Voice.stopListening(); };
  const openSheet = (ctx) => {
    if (App.current !== 'home' || isHandHold(ctx.state)) return;
    ctx.set({ homeSheetSeen: true });
    ctx.openSheet(`<span class="h-x" data-act="sheet-dismiss">${img('close.svg')}</span>
      <div class="h-sheet-top"><div class="h-saathi"></div><div class="h-q">Do you want to change<br>shift time or hood?</div></div>
      <div class="h-btns">${C.button('Yes, change', { act: 'h-yes' })}${C.button('No, call agent', { act: 'h-agent', kind: 'secondary' })}</div>`,
      { 'h-yes': () => { quiet(); ctx.closeSheet(true); toFlow(ctx); },
        'h-agent': () => { quiet(); ctx.closeSheet(true); ctx.toast('Calling an agent is not in this demo'); },
        onClose: quiet });
    const w = document.querySelector('.sheet-wrap'); if (w) w.classList.add('home-sheet');
    const face = document.querySelector('.home-sheet .h-saathi');
    if (face) face.classList.add('talk');
    ctx.say(LINE).then(() => { if (face) face.classList.remove('talk'); if (App.sheet && App.current === 'home') ctx.listen(); });   // she may answer "हाँ" / "नहीं"
  };

  R({ id: 'home', orb: 'hidden', listen: false,
    render: ({ state }) => `${isHandHold(state) ? `<div class="home">${handHold(state)}</div>` : `<div class="home disc">${mapHead(!!state.homeOff)}${more()}</div>`}${nav()}`,
    onEnter: ctx => { if (!isHandHold(ctx.state) && !ctx.state.homeSheetSeen) App.after(1200, () => { if (!App.sheet && !(window.Coach && Coach.open())) openSheet(ctx); }); },
    hear: (u, ctx) => {                                                   // only ever listening while the sheet is open
      if (!App.sheet) return true;
      if (u.affirm || u.newAsk) { quiet(); ctx.closeSheet(true); if (u.newAsk) ctx.newAsk(u); else toFlow(ctx); return true; }
      if (u.negate) { quiet(); ctx.closeSheet(true); return true; }
      return false;
    },
    act: (name, el, ctx) => {
      if (name === 'saathi' && !isHandHold(ctx.state)) openSheet(ctx);
      if (name === 'saathi' && isHandHold(ctx.state)) ctx.toast('Saathi is not in this demo');
      if (name === 'logout') { ctx.set({ homeOff: true }); ctx.rerender(); }
      if (name === 'mb') ctx.go('MB');
    }
  });

  /* ---------- MB · Change shift or hood · move booked (456:34862) ---------- */
  R({ id: 'MB', allowNewAsk: false,
    render: ({ state }) => { const m = move(state), n = daysTo(), eve = D.date.addDays(D.startDate, -1);
      return `${C.topNav({ title: 'Change shift or hood' })}<div class="body mb-body">
        <div class="mb-place"><div class="mb-txt"><span class="mb-tag">${timeOnly(m) ? 'Time change' : 'Moving'} in ${n} ${n === 1 ? 'day' : 'days'}</span><div class="mb-names"><b>${esc(hoodName(m))}</b><span>${esc(areaName(m))}</span></div></div><img class="mb-city" src="assets/confirm/city.png" alt=""></div>
        <div class="mb-line">
          <div class="mb-stop now"><div class="mb-rail"><i class="dot"></i><i class="bar"></i></div><div class="mb-st"><span class="mb-when">Till ${D.date.dayMonth(eve)}</span><div class="mb-what">${timeOnly(m) ? `<b>${D.fmt(D.her.time)}</b><span>${esc(D.her.hood)}</span>` : `<b>${esc(D.her.hood)}</b><span>${D.fmt(D.her.time)}</span>`}</div></div></div>
          <div class="mb-stop new"><div class="mb-rail"><i class="dot"></i></div><div class="mb-st"><span class="mb-when">From ${D.date.dayMonth(D.startDate)}</span><div class="mb-what">${timeOnly(m) ? `<b>${D.fmt(m.time)}</b><span>${esc(hoodName(m))}</span>` : `<b>${esc(hoodName(m))}</b><span>${D.fmt(m.time)}</span>`}</div></div><div class="h-mapbtn" data-act="toast"><span>${img('map-arrow.svg')}</span><i>Map</i></div></div>
          <i class="mb-div"></i>
        </div>
      </div><div class="actions mb-actions">${C.button('Ok, got it', { act: 'mb-ok' })}</div>`; },
    say: ({ state }) => { const m = move(state); return `${D.startDayHi} से आप ${hoodName(m)} में ${D.hi.time(m.time)} बजे तक काम करेंगी।`; },
    hear: (u, ctx) => { if (u.affirm || u.back || u.negate) { ctx.back(); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'mb-ok') ctx.back(); }
  });

  /* The switch's Day row sets homeDay and opens Home (app.js). Without a booked move there is nothing to hand-hold,
     so a Day other than "No move" seeds the brief's fallback move first. This listener runs before app.js's own (registered later at start). */
  document.querySelectorAll('#switch .seg[data-key="day"] button').forEach(b => b.addEventListener('click', () => {
    const s = App.state; if (!s) return;
    if (b.dataset.v === 'none') { s.homeOff = false; s.homeSheetSeen = false; return; }
    if (!s.move) s.move = FALLBACK();
  }));
})();
