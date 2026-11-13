/* Lane HT — new hood, other time. Rebuilt to Figma V3 (file cIAH24e13VZJu31OmiMWrj, section 436:4761), 2026-10-15:
   V4 (2026-10-17, section 481:36972): the chip row is gone — a collapsible card tops the list; the 1.06 title names what she asked (481:42395);
   the offer card's Timing row is two rows, Start time · End time (481:43546 · friend 492:52945).
   V4 revised (2026-10-21): no End time field; the voice results card is "Filters" (481:36973 shut · 481:38203 open: Hood name · Shift time · Start time),
   the manual row's is "Change shift timing" with Hood name "Select hood" (481:41658); "+10 slots" is "Show more"; G5 is "Select hood and timings" (481:37672).
   H1  · 481:36973  "HSR" — the card, hood cards (map-pin + hood, km, caret), "Best match" over the ticked time, Confirm → H5
   H1f · 452:18838 the 1.06 sheet "HSR and Bellandur are full right now / Wait for them, or see work close by / Join waitlist" over the "Work for you" floor
   H3  · 452:19014 "HSR" — banner "Area is not available / Check other areas", area cards (radio · Recommended · map-pin + area · km | Earn upto · N Hoods | Starts 6AM), Confirm → H4;
         once she joined: 453:19551 (the banner with its icon button). W1 is kept as an id: joining now happens on the sheet's button (V3 drops the separate W1 sheet).
   H4  · 481:37672  "Select hood and timings" (the hoods of the picked area) → H5 · H5 · the shared confirm ("Move to <hood>") → D
   Waitlist communication: A1 · 454:33133 WhatsApp (lane C 454:21894) · P2 · 454:33449 / 454:33585 the "Before 12 AM" offer page (lane C 454:30429 adds "Anita works here") ·
   W2b · 454:33179 "Work area & time" with the green "Accept by 11 PM" banner (lane C 454:22054) · P2late · 454:33354 "HSR filled up again" (lane C 454:22182). */
(() => {
  const R = App.register, D = Data;
  const L = { open: null, pending: null, area: null };   // lane-local: which hood card is open · a far-place ask waiting on "hataun?" · the area ticked on H3
  const OFFER_DELAY = 20000;                  // ms after she joins the waitlist (and sits on H3) before the WhatsApp push "Work opened in HSR" arrives (A1)
  const OFFER_TILL = '8 pm';                  // A1 copy (454:33133): "Yours till 8 pm today"
  const ACCEPT_BY = '11 PM';                  // P2 / W2b copy (454:33449 · 454:33179): "Accept by 11 PM"
  // the offer (454:33133 / 454:33449): HSR Layout Sector 2, 9 AM – 5 PM, ₹22,000 — a hood Data does not carry, so it is defined here
  const OFFER_HOOD = { name: 'HSR Layout Sector 2', km: '3.2 km from Bellandur', times: [{ start: 9, end: 17, pay: 22000 }] };
  const offerPick = () => ({ area: D.areas.HSR, hood: OFFER_HOOD, time: OFFER_HOOD.times[0] });
  const friendSide = s => s.lane === 'C' || s.withFriend;   // lane C variants: "near your friend's place", "Anita works here"

  /* ---------- helpers (behaviour) ---------- */
  const nearest = (hood, want) => { const w = want || D.her.time; const d = t => Math.abs(t.start - w.start) * 10 + Math.abs((t.end || 0) - (w.end || w.start + D.her.hours)); return hood.times.reduce((b, t) => d(t) < d(b) ? t : b, hood.times[0]); };
  const subHood = (area, sub) => sub ? area.hoods.find(h => h.name.toLowerCase().includes(String(sub).toLowerCase())) || null : null;
  const pickFor = (area, hood, want) => ({ area, hood, time: nearest(hood, want) });
  const setPick = (ctx, hood, time) => { const p = ctx.state.pick; ctx.set({ pick: { area: p.area, hood, time: time || nearest(hood, p.time || ctx.state.ask.time) } }); L.open = hood.name; };
  const rs = n => `${n.toLocaleString('en-IN')} रुपये`;
  const askedPlace = s => s.ask.place || 'HSR';
  const askedArea = s => D.findArea(askedPlace(s)) || D.areas.HSR;
  // the 1.06 title names what she asked: ask.places (the entry flow / Modify areas) first, else Bellandur said alongside the place (481:42395: one place → "HSR is full right now")
  const twoPlaces = (s, join) => { const ps = (s.ask.places || []).filter(Boolean); if (ps.length) { const n = ps.slice(0, 2).map(x => (D.findArea(x) || { name: x }).name); return n.join(join); }
    const p = askedPlace(s); return p !== 'Bellandur' && /bellandur|बेल/i.test(s.ask.transcript || '') ? `${p}${join}Bellandur` : p; };
  const stamp = () => { const d = new Date(); return `${d.getDate()} ${d.toLocaleDateString('en-GB', { month: 'short' })} ${d.getFullYear()}`; };
  const clock = () => { const d = new Date(), h = d.getHours(); return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`; };   // "6:12 pm" (A1)
  // say one line, then open the mic again on the same screen
  const resay = (ctx, line) => { const g = App.gen; ctx.say(line).then(() => { if (App.gen === g) ctx.listen(g); }); };
  const hoodLine = (ctx, verb) => { const p = ctx.state.pick; return `${p.hood.name} में ${D.hi.time(p.time)} का time ${verb}। क्या आप यह लेना चाहेंगी।`; };
  const hoodList = (ctx, best) => { const p = ctx.state.pick; return p.area.hoods.map((h, i) => C.hoodCard(h, { open: h.name === L.open, selected: p.hood === h ? p.time : null, rowTag: best && i === 0 ? 'Best match' : null })).join(''); };
  const goH4 = (ctx, area, want) => ctx.go('H4', { pick: pickFor(area, area.hoods[0], want || ctx.state.ask.time) });
  const areaName = p => (p.area && p.area.name) || p.area || p.hood.name;
  const km = a => String(a.km).split(' km')[0];

  // a place not on this screen: while waitlisted it is the W3 case; otherwise app.js makes it a new ask
  const farPlace = (u, ctx) => { const s = ctx.state; if (!s.joined) return false; L.pending = u; resay(ctx, `इसके लिए पहले ${s.waitlisted.what} का wait हटाना होगा। क्या मैं हटा दूँ।`); return true; };
  const pendingHear = (u, ctx) => { if (!L.pending) return false; const p = L.pending; L.pending = null;
    if (u.affirm) { ctx.set({ joined: false, waitlisted: null, offered: false }); ctx.newAsk(p); return true; }
    if (u.negate) { resay(ctx, 'ठीक है, आपका wait लगा रहेगा।'); return true; } return false; };

  // shared hear for the two hood-list screens (H1 best-match list · H4 timings in a close-by area)
  const hoodHear = (u, ctx, verb) => { const s = ctx.state, p = s.pick;
    if (pendingHear(u, ctx)) return true;
    if (u.place) { const area = D.findArea(u.place);
      if (area && area === p.area) { const h = subHood(area, u.subhood); if (h) setPick(ctx, h, u.time ? nearest(h, u.time) : null); else if (u.time) setPick(ctx, p.hood, nearest(p.hood, u.time)); ctx.rerender(); resay(ctx, hoodLine(ctx, verb)); return true; }
      if (area && D.nearby.includes(area.name)) { goH4(ctx, area, u.time); return true; }
      return farPlace(u, ctx); }
    if (u.subhood) { const h = subHood(p.area, u.subhood); if (h) { setPick(ctx, h, u.time ? nearest(h, u.time) : null); ctx.rerender(); resay(ctx, hoodLine(ctx, verb)); return true; } }
    if (u.time) { setPick(ctx, p.hood, nearest(p.hood, u.time)); ctx.rerender(); resay(ctx, hoodLine(ctx, verb)); return true; }
    if (u.affirm) { ctx.go('H5'); return true; }
    if (u.more) { const hs = p.area.hoods, i = hs.findIndex(h => h.name === L.open); setPick(ctx, hs[(i + 1) % hs.length], null); ctx.rerender(); resay(ctx, hoodLine(ctx, verb)); return true; }
    return false; };
  const hoodAct = (name, el, ctx) => { const p = ctx.state.pick, hood = p.area.hoods.find(h => h.name === el.dataset.hood);
    if (name === 'hood' && hood) { if (L.open === hood.name) L.open = null; else setPick(ctx, hood, null); ctx.rerender(); }
    if (name === 'time' && hood) { setPick(ctx, hood, hood.times[+el.dataset.i]); ctx.rerender(); }
    if (name === 'primary') ctx.go('H5');
    if (name === 'more') ctx.toast('More slots are not in this demo');
    if (name === 'change') ctx.go('S1b'); };

  /* ---------- H1 · 436:4762 ---------- */
  // render runs before onEnter, so the pick is prepared inside render (keeps her tick when she comes back from H5)
  const prepH1 = ctx => { const s = ctx.state, area = askedArea(s);
    const ok = s.pick.area === area || (window.Filters && Filters.groups().includes(s.pick.area));   // a hood picked in another asked place (the Select hoods groups) keeps its area
    if (!ok || !s.pick.hood) { ctx.set({ pick: pickFor(area, area.hoods[0], s.ask.time) }); L.open = area.hoods[0].name; } };
  R({ id: 'H1',
    render: ctx => { prepH1(ctx); return `${C.topNav({ title: askedArea(ctx.state).name })}<div class="body">${C.filterCard()}${hoodList(ctx, true)}</div>${C.actions(C.button('Confirm'))}`; },
    onEnter: ctx => { L.pending = null; L.open = ctx.state.pick.hood.name; ctx.rerender(); },
    say: ctx => hoodLine(ctx, 'खुला है'),
    hear: (u, ctx) => hoodHear(u, ctx, 'खुला है'),
    act: hoodAct
  });

  /* ---------- joining the waitlist (H1f's button, W1, or saying "बता देना") → H3 with the waitlist icon button ---------- */
  const joinWait = ctx => { const s = ctx.state; ctx.set({ joined: true, offered: false, waitlisted: { what: askedPlace(s), time: s.ask.time || D.her.time, at: stamp() } }); ctx.go('H3', null, { replace: true }); };

  /* ---------- H3 · 452:19014 / 453:19551 — the banner, three area cards with radios, Confirm → H4 ---------- */
  const h3Body = ctx => { const s = ctx.state, sel = L.area || D.nearby[0];
    const status = C.statusCard({ line: 'Area is not available', desc: 'Check other areas', art: 'area', button: s.joined ? { act: 'wl', icon: 'currency-inr' } : null });
    return `${C.topNav({ title: askedArea(s).name })}<div class="body">${status}${D.nearby.map((n, i) => C.areaCard(D.areas[n], { recommended: i === 0, selected: n === sel })).join('')}</div>${C.actions(C.button('Confirm'))}`; };
  const leave = ctx => { ctx.set({ joined: false, waitlisted: null, offered: false }); ctx.rerender(); resay(ctx, 'ठीक है, मैंने आपको waitlist से हटा दिया है।'); };
  // the push: while she is waitlisted and sits on H3, after OFFER_DELAY the WhatsApp message arrives (toast, then A1). Armed on every entry to H3 until it has fired.
  const armOffer = ctx => ctx.after(OFFER_DELAY, () => { const s = ctx.state; if (s.joined && !s.offered && App.current === 'H3') { ctx.set({ offered: true }); ctx.toast(`WhatsApp · Work opened in ${D.areas.HSR.name}`); ctx.go('A1'); } });
  R({ id: 'H3',
    render: h3Body,
    onEnter: ctx => { L.pending = null; if (!L.area || !D.nearby.includes(L.area)) L.area = D.nearby[0]; if (ctx.state.joined && !ctx.state.offered) armOffer(ctx); },
    say: ({ state: s }) => { const [a, b, c] = D.nearby.map(n => D.areas[n]);
      return `${s.joined ? `${s.waitlisted.what} में जगह खुलते ही मैं आपको बता दूँगी। ` : `माफ़ कीजिए, ${askedPlace(s)} में अभी जगह नहीं है। `}आपके पास में ${a.name} है, ${km(a)} किलोमीटर दूर। ${b.name} और ${c.name} में भी काम खुला है। आप कौनसा देखना चाहेंगी।`; },
    hear: (u, ctx) => { const s = ctx.state;
      if (pendingHear(u, ctx)) return true;
      if (u.place) { const area = D.findArea(u.place); if (area && D.nearby.includes(area.name)) { goH4(ctx, area, u.time); return true; } return farPlace(u, ctx); }
      if (/sabse paas|pehla|pehle wala|nearest|first/.test(u.text)) { goH4(ctx, D.areas[D.nearby[0]], u.time); return true; }
      if (u.affirm) { goH4(ctx, D.areas[L.area || D.nearby[0]], u.time); return true; }
      if (u.leave && s.joined) { leave(ctx); return true; }
      if (u.waitlist && !s.joined) { joinWait(ctx); return true; }
      return false; },
    act: (name, el, ctx) => { const s = ctx.state;
      if (name === 'area') { L.area = el.dataset.area; ctx.rerender(); }
      if (name === 'primary') goH4(ctx, D.areas[L.area || D.nearby[0]]);
      if (name === 'wl') resay(ctx, `आप ${s.waitlisted ? s.waitlisted.what : askedPlace(s)} के waitlist पर हैं। जगह खुलते ही मैं आपको बता दूँगी।`);
      if (name === 'change') ctx.go('S1b'); }
  });

  /* ---------- H1f · 452:18838 — the asked places are full; Join waitlist → H3 (joined), the close orb or "paas dikhao" → H3 ---------- */
  R({ id: 'H1f', render: () => C.floor106(),
    onEnter: ctx => { L.pending = null; const toH3 = () => ctx.go('H3', null, { replace: true }); const places = twoPlaces(ctx.state, ' and '), two = / and /.test(places);
      ctx.openSheet(C.fullSheet({ title: `${places} ${two ? 'are' : 'is'} full right now`, body: 'Wait for them, or see work close by' }),   // 481:42395 keeps "them" for one place too
        { join: () => joinWait(ctx), onClose: toH3 }); },
    say: ({ state: s }) => `माफ़ कीजिए, ${twoPlaces(s, ' और ')} में अभी जगह नहीं है। क्या आप चाहेंगी कि जगह खुलते ही मैं आपको बता दूँ, या आप पास का काम देखना चाहेंगी।`,
    hear: (u, ctx) => { if (u.waitlist || (u.affirm && !u.place)) { joinWait(ctx); return true; }
      if (u.negate || u.more || /paas|dikhao|पास/.test(u.text || '')) { ctx.closeSheet(true); ctx.go('H3', null, { replace: true }); return true; } return false; }
  });

  /* ---------- W1 · kept as an id (other files may still go to it): V3 joins on the 1.06 sheet's button, so W1 joins and shows H3 ---------- */
  R({ id: 'W1', render: () => C.floor106(), listen: false, onEnter: ctx => joinWait(ctx) });

  /* ---------- H4 · V4 rev 481:37672 "Select hood and timings" — back only in the nav, H2, the "Change shift timing" card (Hood name · Shift time · Start time, open;
     friend 492:52764: "Filters", shut — Filters.card decides), the hood cards with "Show more". Reached from H3, C4a and lane T's TA. ---------- */
  const prepH4 = ctx => { const s = ctx.state; if (!s.pick.area || !s.pick.hood) { const area = s.pick.area || D.areas[D.nearby[0]]; ctx.set({ pick: pickFor(area, area.hoods[0], s.ask.time) }); L.open = area.hoods[0].name; } };
  const h4Body = ctx => { prepH4(ctx); return `${C.topNav({})}<div class="body ht-pick"><div class="h2 g900">Select hood and timings</div><div class="ht-pick-list">${C.filterCard()}<div class="ht-cards">${hoodList(ctx, false)}</div></div></div><div class="actions ht-pick-actions">${C.button('Confirm')}</div>`; };
  R({ id: 'H4',
    render: h4Body,
    onEnter: ctx => { L.pending = null; L.open = ctx.state.pick.hood.name; ctx.rerender(); },
    say: ctx => hoodLine(ctx, 'है'),
    hear: (u, ctx) => { if (u.back) { ctx.back(); return true; } return hoodHear(u, ctx, 'है'); },
    act: hoodAct
  });

  /* ---------- H5 · Confirm your move — the shared V3 confirm (454:33721): tag "New hood", the hood, the area, "Move to HSR" → D. Reached from H4 / H1 / P2 and lane C. ---------- */
  R({ id: 'H5',
    render: ({ state: s }) => { const p = s.pick;
      return C.confirmMove({ tag: 'New hood', name: p.hood.name, area: areaName(p), oldTime: D.her.time, newTime: p.time, oldPay: D.her.pay, newPay: p.time.pay, button: `Move to ${p.hood.name}` }); },   // V3 443:17020 · 452:18687 · 453:19888: "Move to <hood>"
    onEnter: () => { L.pending = null; },
    say: ({ state: s }) => { const p = s.pick, less = p.time.pay < D.her.pay ? D.her.pay - p.time.pay : 0;
      return `आप ${D.her.area} से ${p.hood.name} में move करेंगी। आपका time होगा ${D.hi.time(p.time)}, और आपको ${rs(p.time.pay)} मिलेंगे${less ? `, जो अभी से ${less.toLocaleString('en-IN')} कम है` : ''}। यह ${D.startDayHi.split(' ')[0]} से लागू होगा। क्या आप इस hood में move करना चाहेंगी।`; },
    hear: (u, ctx) => { if (u.affirm) { ctx.go('D'); return true; } if (u.negate) { ctx.back(); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'primary') ctx.go('D'); }
  });

  /* ================= Waitlist communication ================= */

  /* ---------- A1 · 454:33133 WhatsApp message (lane C 454:21894) — their UI in system greys; not our app, so no Saathi line and no orb ---------- */
  R({ id: 'A1', orb: 'hidden', listen: false, white: true,
    render: ({ state: s }) => { const o = offerPick(), title = friendSide(s) ? `Work opened near your friend's place in ${o.area.name}` : `Work opened in ${o.area.name}`;
      return `${C.topPlain()}<div class="ht-wa-head">${C.icons['arrow-left']}<span class="av">S</span><div class="who"><span class="n">Snabbit</span><span class="s">Business account</span></div></div>
        <div class="ht-wa-chat"><span class="date">Today</span><div class="msg" data-act="open"><div class="mb"><span class="t">${C.esc(title)}</span><span>${C.esc(o.hood.name)} · ${D.fmt(o.time)}</span><span>${D.hours(o.time)} hrs · ${D.rs(o.time.pay)} a month</span><span>Yours till ${OFFER_TILL} today</span><span class="time">${clock()}</span></div><div class="hr"></div><div class="cta"><img src="assets/icons/arrow-square-out.svg" width="20" height="20" alt=""><span>Take this work</span></div></div></div>
        <div class="ht-wa-compose"><div class="in">Message</div><span class="mic">${C.icons['microphone']}</span></div>`; },
    onEnter: () => { L.pending = null; },
    act: (name, el, ctx) => { if (name === 'open') ctx.go('P2'); }
  });

  /* ---------- P2 · 454:33449 / 454:33585 "Before 12 AM" offer page (lane C 454:30429): green glow top, clock 20 + "Work opened in HSR" H3, the stadium countdown
     "ACCEPT BY / 11 PM" (6 px green-500 stroke on gray-200, the stroke runs down as the deadline nears), the shift card (hood · Timing · Earnings), Move to HSR / See other areas.
     The frame has no close control: saying "back" is her leaving the page (→ W2b, the banner holds the offer). ---------- */
  const fmtClock = h => `${String(h % 12 || 12).padStart(2, '0')}:00 ${h < 12 || h === 24 ? 'AM' : 'PM'}`;   // "09:00 AM" (454:33490 draws "10:00 AM - 11:00 AM")
  const deadlineLeft = () => { const now = new Date(), end = new Date(now); end.setHours(23, 0, 0, 0); const start = new Date(now); start.setHours(18, 0, 0, 0);   // the offer arrived at 6 pm (A1), holds till 11 pm
    return Math.max(0.04, Math.min(1, (end - now) / (end - start))); };
  const stadium = () => { const len = 2 * (243 - 98) + Math.PI * 92;   // perimeter of the 243 × 98 pill, stroke centred 3 px in
    return `<div class="p2-timer"><svg width="243" height="98" viewBox="0 0 243 98" aria-hidden="true"><rect x="3" y="3" width="237" height="92" rx="46" class="trk"/><rect x="3" y="3" width="237" height="92" rx="46" pathLength="${len.toFixed(0)}" class="bar" style="stroke-dasharray:${(len * deadlineLeft()).toFixed(0)} ${len.toFixed(0)}"/></svg><div class="tx"><span class="lab">ACCEPT BY</span><span class="by">${ACCEPT_BY}</span></div></div>`; };
  const offerCard = s => { const o = offerPick();
    return `<div class="p2-card">${friendSide(s) ? `<span class="p2-ftag"><span class="av">${C.esc(D.friend.first[0])}</span>${C.esc(D.friend.first)} works here</span>` : ''}<div class="p2-hood"><img src="assets/results/offer-user-16.svg" width="16" height="16" alt=""><span>${C.esc(o.hood.name)}</span></div>
      <div class="p2-rows"><div class="hr"></div><div class="p2-row"><span class="k"><img src="assets/results/offer-clock-16.svg" width="16" height="16" alt="">Start time</span><span class="v">${fmtClock(o.time.start)}</span></div>
      <div class="hr"></div><div class="p2-row"><span class="k"><img src="assets/results/offer-clock-16.svg" width="16" height="16" alt="">End time</span><span class="v">${fmtClock(o.time.end)}</span></div>
      <div class="hr"></div><div class="p2-row"><span class="k"><img src="assets/results/offer-hourglass-16.svg" width="16" height="16" alt="">Earnings</span><span class="v"><span class="up">Upto</span> ${D.rs(o.time.pay)}</span></div></div></div>`; };
  const take = ctx => ctx.go('H5', { pick: offerPick() });   // H5 confirms the move to the offer
  R({ id: 'P2',
    render: ({ state: s }) => { const o = offerPick();
      return `<div class="p2-glow"><i class="g1"></i><i class="g2"></i></div>${C.topPlain()}<div class="p2-body"><div class="p2-head"><img src="assets/results/offer-clock-20.svg" width="20" height="20" alt=""><span>Work opened in ${C.esc(o.area.name)}</span></div>${stadium()}${offerCard(s)}</div>
        <div class="p2-foot">${C.button(`Move to ${o.area.name}`, { act: 'take' })}<button class="btn ht-ghost" data-act="other">See other areas</button></div>`; },
    onEnter: () => { L.pending = null; },
    say: ({ state: s }) => { const o = offerPick();
      return `खुशखबरी! ${friendSide(s) ? `आपकी दोस्त की जगह के पास, ` : ''}${o.area.name} में आपके लिए काम खुल गया है, ${D.hi.time(o.time)}, ${rs(o.time.pay)} तक। आप इसे रात 11 बजे तक ले सकती हैं। क्या आप ${o.area.name} में move करना चाहेंगी।`; },
    hear: (u, ctx) => { if (u.back) { ctx.go('W2b'); return true; } if (u.affirm) { take(ctx); return true; } if (u.negate || u.more) { ctx.go('H3'); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'take') take(ctx); if (name === 'other') ctx.go('H3'); }
  });

  /* ---------- W2b · 454:33179 she left the page: "Work area & time", the green banner holds the offer ("Accept by 11 PM / HSR 9AM - 5PM", icon button → P2),
     "Work nearby" and three area cards; Confirm stays dormant (pink-200) ---------- */
  const short = t => `${t.start % 12 || 12}${t.start < 12 ? 'AM' : 'PM'} - ${t.end % 12 || 12}${t.end < 12 || t.end === 24 ? 'AM' : 'PM'}`;   // "9AM - 5PM"
  R({ id: 'W2b',
    render: () => { const o = offerPick();
      return `${C.topNav({ title: 'Work area & time' })}<div class="body">${C.statusCard({ line: `Accept by ${ACCEPT_BY}`, desc: `${o.area.name} ${short(o.time)}`, art: 'open', act: 'offer', button: { act: 'offer', icon: 'currency-inr' } })}<div class="ht-nearby-h">Work nearby</div><div class="ht-cards">${D.nearby.map((n, i) => C.areaCard(D.areas[n], { recommended: i === 0, selected: i === 0 })).join('')}</div></div>${C.actions(C.button('Confirm', { disabled: true }))}`; },
    onEnter: () => { L.pending = null; },
    say: () => { const o = offerPick(); return `${o.area.name} में आपके लिए काम खुला है, ${D.hi.time(o.time)}। आप इसे रात 11 बजे तक ले सकती हैं। क्या आप इसे देखना चाहेंगी।`; },
    hear: (u, ctx) => { if (pendingHear(u, ctx)) return true;
      if (u.place) { const area = D.findArea(u.place); if (area === D.areas.HSR) { ctx.go('P2'); return true; } if (area && D.nearby.includes(area.name)) { goH4(ctx, area, u.time); return true; } return farPlace(u, ctx); }
      if (u.affirm) { ctx.go('P2'); return true; }
      if (u.negate) { resay(ctx, 'ठीक है। आप पास का काम देख सकती हैं।'); return true; }
      return false; },
    act: (name, el, ctx) => { if (name === 'offer') ctx.go('P2'); if (name === 'area') goH4(ctx, D.findArea(el.dataset.area)); }
  });

  /* ---------- P2late · 454:33354 too late: an empty 64 header, image 266 × 200, "HSR filled up again" 28/37, "You're still on the waitlist", Try new search (→ FQ) / Show nearby areas (→ H3) ---------- */
  R({ id: 'P2late',
    render: () => `${C.topPlain()}<div class="ht-close"></div><div class="ht-result late"><img class="pic" src="assets/offer-filled.png" width="266" height="200" alt=""><div class="ht-txt"><div class="ht-h1 g900">${C.esc(D.areas.HSR.name)} filled up again</div><div class="bm g700">You're still on the waitlist</div></div></div><div class="ht-footer">${C.button('Try new search', { act: 'new' })}<button class="btn ht-ghost" data-act="near">Show nearby areas</button></div>`,
    onEnter: () => { L.pending = null; },
    say: () => `माफ़ कीजिए, ${D.areas.HSR.name} फिर से भर गया। आप अभी भी waitlist पर हैं। क्या आप पास के area देखना चाहेंगी, या नई search करेंगी।`,
    hear: (u, ctx) => { if (u.affirm || u.more) { ctx.go('H3'); return true; } if (u.negate || /नई|nayi|new|search/i.test(u.text || '')) { ctx.go('FQ'); return true; } return false; },
    act: (name, el, ctx) => { if (name === 'new') ctx.go('FQ'); if (name === 'near') ctx.go('H3'); }
  });
})();
