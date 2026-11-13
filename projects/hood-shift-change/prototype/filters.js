/* Filters — Figma V4 revised (2026-10-21, file cIAH24e13VZJu31OmiMWrj, section V4 481:36972 · V4 Expert ID 492:51478).
   Time is start + hours now ("सुबह 9 बजे से 8 घंटे तक"): no End time field and no Select end time sheet anywhere; hours are exact (4 · 6 · 8 · 10), not ranges.
   The collapsible card at the top of every results list, per screen (CARDS below):
     T1  481:41401 "Change shift timings"  Shift time · Start time (open)            T1f 481:41899 open / 481:42069 joined, shut: "Change shift timing"
     TH  629:71703 "Change shift timing"   Hood name (Select hood) · Shift time · Start time (open)
     TA  632:72095 "Change shift timing"   Shift time · Start time (open)
     H1  voice 481:36973 shut / 481:38203 open: "Filters"  Hood name · Shift time · Start time (fields 24 apart)
         manual row 481:41658 (open): "Change shift timing"  Hood name (Select hood) · Shift time · Start time
     H3  481:37153 / 481:37335 "Filters" shut under the banner (no hood field on an area list)
     H4  481:37672 "Select hood and timings" — "Change shift timing" open, Hood name (Select hood) · Shift time · Start time; friend 492:52764 "Filters" shut
     C4  492:52510 "Change shift timing"  Start time · Shift time (open) · C4t 492:52570 "Change timing"  Start time · Shift time (open)
   Card: white, gray-200 rule, radius 16, p 16; header funnel 20 + 14/20 semibold | caret 20; field: label 14/20 gray-500, 4 above a box (1.5 gray-200, radius 10, px 12 py 10,
   value 14/20 gray-900 — "Select hood" placeholder gray-400 — caret 18). T1 · T1f · TH · TA write "8 hrs", the others "8 hours".
   Sheets: Select hoods grouped under area headings (481:40497 — "HSR" then its hoods, "Bellandur" then its hoods; radio rows 64; search above 8 hoods),
   Select hours — Any hours · 4 · 6 · 8 (Now) · 10 hours (481:40702), Select starting time (481:40842, unchanged).
   Field values come from her ask (state.ask.time.start · state.ask.hours, written by the entry flow; hours fall back to end − start) until she picks in a sheet;
   only a pick (or "6 घंटे वाला") cuts the list. The 1.05 finding screens draw nothing between the TopNav and the skeletons (C.askStrip renders nothing).
   Applied centrally: C.filterCard renders the card, C.hoodCard hides what does not match. */
window.Filters = (() => {
  const F = {};
  const D = Data;
  const RESULTS = ['T1', 'T1f', 'TH', 'TA', 'H1', 'H3', 'H4', 'C4', 'C4t', 'C4a'];
  const HOURS = [4, 6, 8, 10];                                // 481:40702
  const st = () => App.state;
  const blank = () => ({ hood: null, hours: null, start: null });
  const f = () => (st().filter = Object.assign(blank(), st().filter || {}));
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const h12 = h => `${h % 12 || 12} ${h < 12 || h === 24 ? 'AM' : 'PM'}`;
  const num = v => typeof v === 'number';
  const hiClock = h => h < 12 ? `सुबह ${h} बजे` : h < 16 ? `दोपहर ${h % 12 || 12} बजे` : h < 20 ? `शाम ${h - 12} बजे` : `रात ${h - 12} बजे`;
  const friendSide = () => st().lane === 'C' || !!st().withFriend;
  // the manual row ("Pick your area" → pickers → 1.05) lands on H1 with the "Change shift timing" card (481:41658); the voice path gets "Filters" (481:36973)
  const manual = () => { const s = st(); return !!(s.ask && s.ask.manual) || (s.history || []).some(id => /^M\d$/.test(id)); };

  /* what she asked: the field values and the ticks in the sheets */
  const askTime = () => { const a = st().ask || {}; return a.time || D.her.time; };
  const askHours = () => { const a = st().ask || {}; return num(a.hours) ? a.hours : (a.time ? a.time.end - a.time.start : D.her.hours); };
  const askStart = () => askTime().start;
  F.askHours = askHours; F.askStart = askStart;

  /* the area on screen, and the groups the hood sheet lists */
  const OWN = ['T1', 'T1f', 'T2'];
  const ownHood = () => ({ name: D.her.area, hoods: [{ name: D.her.hood, km: D.her.km, times: D.herTimesExtra.concat(D.herTimes) }] });
  F.area = () => {
    const s = st(), p = s.pick || {};
    if (s.lane === 'T' && OWN.includes(App.current)) return ownHood();
    if (p.area && typeof p.area === 'object' && p.area.hoods) return p.area;          // the area on screen (HT, TH, H4 from TA / C4a)
    if (s.lane === 'T') return D.areas[D.nearby[0]];
    if (s.lane === 'C') return D.areas['Kudlu Gate'];
    return D.findArea(p.area) || D.findArea(s.ask && s.ask.place) || D.areas.HSR;
  };
  F.groups = () => { const s = st(), here = F.area(), id = App.current;
    let list = [here];
    if (id === 'TH') list = D.nearby.map(n => D.areas[n]);                                                       // other hoods near her
    else if (id === 'H1') list = [here].concat(((s.ask && s.ask.places) || []).map(x => D.findArea(x)).filter(Boolean));   // the places she asked
    return list.filter((a, i) => a && list.indexOf(a) === i); };
  F.hoodArea = () => { const x = f(); return x.hood ? F.groups().find(a => a.hoods.some(h => h.name === x.hood)) || null : null; };
  F.title = () => { const s = st(); if (s.lane === 'T') return 'My hood'; if (s.lane === 'C') return D.friend.area; return F.area().name; };
  F.active = () => { const x = f(); return !!(x.hood || num(x.hours) || num(x.start)); };
  F.reset = () => { st().filter = blank(); };
  const match = t => { const x = f(); return (!num(x.hours) || t.end - t.start === x.hours) && (!num(x.start) || t.start === x.start); };
  F.match = match;

  /* field labels */
  const unit = () => (['T1', 'T1f', 'TH', 'TA'].includes(App.current) ? 'hrs' : 'hours');   // the lane T frames write "8 hrs"; H1 / H4 / the friend's "8 hours"
  const hoursLabel = () => { const x = f(); return x.hours === 'any' ? 'Any hours' : `${num(x.hours) ? x.hours : askHours()} ${unit()}`; };
  const startLabel = () => { const x = f(); return x.start === 'any' ? 'Any time' : h12(num(x.start) ? x.start : askStart()); };
  // "HSR Sector 9" reads "Sector 9" in the field (481:38203); a hood whose name is more than "<area> Sector n" keeps its full name ("Agara 10th Main")
  const hoodLabel = () => { const x = f(), a = F.hoodArea() || F.area(); if (!x.hood) return ''; const short = x.hood.replace(new RegExp('^' + a.name + '\\s+(Layout\\s+)?', 'i'), ''); return /^sector\s/i.test(short) ? short : x.hood; };

  /* ---- the card, per screen ---- */
  const CARDS = {
    T1: () => ({ title: 'Change shift timings', rows: [['hours', 'start']], open: true, cls: 'g16' }),
    T1f: () => ({ title: 'Change shift timing', rows: [['hours', 'start']], open: !st().joined, cls: 'g16' }),
    TH: () => ({ title: 'Change shift timing', rows: [['hood'], ['hours', 'start']], open: true }),
    TA: () => ({ title: 'Change shift timing', rows: [['hours', 'start']], open: true }),
    H1: () => manual() ? { title: 'Change shift timing', rows: [['hood'], ['hours', 'start']], open: true }
      : { title: 'Filters', rows: [['hood'], ['hours', 'start']], open: false, cls: 'f24' },
    H3: () => ({ title: 'Filters', rows: [['hours', 'start']], open: false, cls: 'f24' }),
    H4: () => friendSide() ? { title: 'Filters', rows: [['hood'], ['hours', 'start']], open: false, cls: 'f24' }
      : { title: 'Change shift timing', rows: [['hood'], ['hours', 'start']], open: true },
    C4: () => ({ title: 'Change shift timing', rows: [['start', 'hours']], open: true }),
    C4t: () => ({ title: 'Change timing', rows: [['start', 'hours']], open: true })
  };
  const cardFor = () => (CARDS[App.current] || (() => ({ title: 'Filters', rows: [['hours', 'start']], open: false, cls: 'f24' })))();
  const fold = { screen: null, open: false };
  const isOpen = () => { if (fold.screen !== App.current) { fold.screen = App.current; fold.open = cardFor().open; } return fold.open; };
  const field = k => {
    const lab = { hood: 'Hood name', hours: 'Shift time', start: 'Start time' }[k];
    const v = k === 'hood' ? hoodLabel() : k === 'hours' ? hoursLabel() : startLabel();
    return `<div class="tf-field" data-act="filter" data-f="${k}"><span class="tf-lab">${esc(lab)}</span><div class="tf-box"><span class="tf-val ${v ? '' : 'ph'}">${esc(v || 'Select hood')}</span><img src="assets/results/v4-field-caret-18.svg" width="18" height="18" alt=""></div></div>`; };
  F.card = ({ title } = {}) => {
    const c = cardFor(), open = isOpen();
    const body = c.rows.map(r => `<div class="tf-row">${r.map(field).join('')}</div>`).join('');
    return `<div class="tf-card ${c.cls || ''} ${open ? 'open' : ''}"><div class="tf-head" data-act="filter" data-f="fold"><span class="tf-title"><img src="assets/results/v4-funnel-20.svg" width="20" height="20" alt=""><span>${esc(title || c.title)}</span></span><img class="tf-caret" src="assets/results/v4-caret-20.svg" width="20" height="20" alt="${open ? 'Hide' : 'Show'}"></div>${open ? `<div class="tf-fields">${body}</div>` : ''}</div>`;
  };

  /* ---- the V3 chip row, kept for any caller that still asks for it (no V4 frame draws it) ---- */
  const GLYPH = { hood: ['chip-buildings-16.svg', 16], hours: ['chip-watch-20.svg', 20], start: ['chip-clock-20.svg', 20] };
  F.chipRow = () => {
    const x = f();
    const chip = (k, label) => { const [g, w] = GLYPH[k], set = (k === 'hood' && x.hood) || (k === 'hours' && x.hours != null) || (k === 'start' && x.start != null);
      return `<span class="fchip ${set ? 'set' : ''}" data-act="filter" data-f="${k}"><img class="fg" src="assets/results/${g}" width="${w}" height="${w}" alt=""><span>${esc(label)}</span><img class="fcv" src="assets/results/chip-chevron-down-20.svg" width="20" height="20" alt=""></span>`; };
    return `<div class="fchips">${F.area().hoods.length > 1 ? chip('hood', x.hood || 'All hoods') : ''}${chip('hours', hoursLabel())}${chip('start', x.start === 'any' ? 'Any time' : `Starts ${startLabel()}`)}</div>`;
  };

  /* ---- sheets: grabber 32 × 4 · title row 48 (H3 20/28 + close 48) · rows 64 (radio 20 · 16/24 label, semibold when ticked · "Now" tag gray-100) · gray-100 dividers ---- */
  const row = ({ v, on, label, tag = '' }) =>
    `<div class="frow ${on ? 'on' : ''}" data-act="fpick" data-v="${esc(v)}"><span class="radio"></span><div class="ftext"><div class="fline"><span class="flabel">${esc(label)}</span>${tag ? `<span class="ftag neutral">${esc(tag)}</span>` : ''}</div></div></div>`;
  const sheet = (title, body, cls = '') => `<div class="fsheet ${cls}"><div class="fgrab"></div><div class="ftitle"><span>${esc(title)}</span><span class="fclose" data-act="fclose"><img src="assets/results/sheet-close-24.svg" width="24" height="24" alt="Close"></span></div>${body}</div>`;
  const join = rows => rows.map((r, i) => (i === 0 ? '' : '<div class="fdiv"></div>') + r).join('');
  const times = () => F.area().hoods.flatMap(h => h.times);

  F.open = (k) => {
    if (k === 'fold') { isOpen(); fold.open = !fold.open; App.rerender(); return; }
    const x = f();
    let html = '';
    if (k === 'hood') {
      // 481:40497: an area heading (48, 16/24 semibold) over its hoods (radio rows 64, no divider inside a group); the search field only above 8 hoods
      const groups = F.groups(), count = groups.reduce((n, a) => n + a.hoods.length, 0);
      const search = count > 8 ? `<div class="fsearch"><img src="assets/search-20.svg" alt=""><input placeholder="Search a hood or landmark" data-act="fsearch"></div>` : '';
      html = sheet('Select hoods', search + `<div class="frows">${groups.map(a => `<div class="fgroup">${esc(a.name)}</div>` + a.hoods.map(h => row({ v: h.name, on: x.hood === h.name, label: h.name })).join('')).join('')}</div>`, 'hoods');
    } else if (k === 'hours') {
      const cur = x.hours === 'any' ? 'any' : num(x.hours) ? x.hours : askHours();
      const list = HOURS.includes(cur) || cur === 'any' ? HOURS : HOURS.concat(cur).sort((a, b) => a - b);   // 12 hours appears only when she asked for it
      html = sheet('Select hours', `<div class="frows">${join([row({ v: 'any', on: cur === 'any', label: 'Any hours' })].concat(list.map(h => row({ v: h, on: cur === h, label: `${h} hours`, tag: h === D.her.hours ? 'Now' : '' }))))}</div>`);
    } else {
      const list = [...new Set(times().map(t => t.start))].sort((a, b) => a - b);   // only start times that exist (481:40842)
      const cur = x.start === 'any' ? null : (num(x.start) ? x.start : askStart());
      html = sheet('Select starting time', `<div class="frows">${join([row({ v: 'any', on: x.start === 'any', label: 'Any time' })].concat(list.map(h => row({ v: h, on: cur === h, label: h12(h) }))))}</div>`);
    }
    const unmark = () => document.querySelectorAll('.fchip.on, .tf-field.on').forEach(c => c.classList.remove('on'));
    App.openSheet(html, {
      fpick: el => F.apply(k, el.dataset.v),
      fclose: () => { App.closeSheet(true); unmark(); },
      fsearch: () => {},
      onClose: unmark
    });
    const wrap = document.querySelector('.sheet-wrap'); if (wrap) wrap.classList.add('filter-sheet');
    document.querySelectorAll(`.fchip[data-f="${k}"], .tf-field[data-f="${k}"]`).forEach(c => c.classList.add('on'));
    const inp = document.querySelector('.fsearch input');
    if (inp) inp.addEventListener('input', () => { const q = inp.value.toLowerCase(); document.querySelectorAll('.frow').forEach(r => { r.style.display = !q || r.dataset.v.toLowerCase().includes(q) ? '' : 'none'; }); });
  };

  // k: 'hood' (a hood name; the ticked one again clears it) · 'hours' ('any' or a number) · 'start' ('any' or an hour)
  F.apply = (k, v) => {
    const x = f(), s = st();
    if (k === 'hood') x.hood = x.hood === v ? null : v;
    if (k === 'hours') x.hours = v === 'any' ? 'any' : +v;
    if (k === 'start') x.start = v === 'any' ? 'any' : +v;
    App.closeSheet(true);
    // a hood from another group moves the list to that area; the tick stays on something she can still see
    const ga = k === 'hood' && x.hood ? F.hoodArea() : null;
    const p0 = s.pick || {};
    if (ga && ga !== F.area() && !(s.lane === 'T' && OWN.includes(App.current))) App.set({ pick: { area: ga, hood: null, time: null } });
    const area = F.area(), p = s.pick || {};
    let hood = x.hood ? area.hoods.find(h => h.name === x.hood) : (p.hood && p.hood.times ? (area.hoods.find(h => h.name === p.hood.name) || p.hood) : area.hoods[0]);
    if (hood && !x.hood && !hood.times.some(match)) hood = area.hoods.find(h => h.times.some(match)) || hood;
    if (hood) {
      const vis = hood.times.filter(match);
      const keep = p.time && p.hood && p.hood.name === hood.name && vis.some(t => t.start === p.time.start && t.end === p.time.end);
      App.set({ pick: Object.assign({}, p, { area: p.area || p0.area, hood: (x.hood || vis.length) ? hood : p.hood, time: keep ? p.time : (vis[0] || p.time) }) });
    }
    App.rerender();
    const n = area.hoods.reduce((a, h) => a + (x.hood && h.name !== x.hood ? 0 : h.times.filter(match).length), 0);
    const what = k === 'hood' ? (x.hood ? `अब सिर्फ़ ${x.hood} दिख रहा है।` : `अब ${area.name} के सारे hood दिख रहे हैं।`)
      : v === 'any' ? 'अब सारे time दिख रहे हैं।'
      : k === 'hours' ? `अब ${x.hours} घंटे वाले time दिख रहे हैं।` : `अब ${hiClock(x.start)} से शुरू होने वाले time दिख रहे हैं।`;
    const g = ++App.gen;
    App.say(n ? what : what + ' माफ़ कीजिए, इसमें अभी कोई time खाली नहीं है।').then(() => { if (App.gen === g) App.listenOnce(g); });
  };

  /* voice: "6 घंटे वाला" on a results screen */
  F.hear = (u) => {
    if (!RESULTS.includes(App.current)) return false;
    if (u.hours) { F.apply('hours', u.hours); return true; }
    return false;
  };

  /* ---- wire into the shared renderers ---- */
  const baseCard = C.hoodCard, baseNav = C.topNav;
  C.askStrip = () => '';                                    // V4: no band between the TopNav and the list (1.05 · results)
  C.filterCard = o => F.card(o);
  C.chipRow = () => F.chipRow();
  // the 1.06 floor (481:42395 "You asked"): two outline select chips, no glyph — "8 hrs" · "From 9 AM" — under the scrim
  C.floorChips = () => { const chip = (k, label) => `<span class="fchip floor" data-act="filter" data-f="${k}"><span>${esc(label)}</span><img class="fcv" src="assets/results/v4-caret-20.svg" width="20" height="20" alt=""></span>`;
    return `<div class="fband"><div class="fchips">${chip('hours', `${num(f().hours) ? f().hours : askHours()} hrs`)}${chip('start', `From ${startLabel()}`)}</div></div>`; };
  const emptyMsg = area => { const x = f();
    return `<div class="fempty">No ${num(x.hours) ? x.hours + ' hours ' : ''}times${num(x.start) ? ' from ' + h12(x.start) : ''} in ${esc(area.name)} right now</div>`; };
  C.hoodCard = (hood, opts = {}) => {
    const x = f();
    if (x.hood && hood.name !== x.hood && F.area().hoods.some(h => h.name === x.hood)) return '';
    const forceOpen = !!(x.hood && x.hood === hood.name);
    const p = st().pick || {};
    if (forceOpen && !opts.selected && p.time && p.hood && p.hood.name === hood.name) opts = Object.assign({}, opts, { selected: p.time });   // the tick follows onto the hood she picked
    const cutting = num(x.hours) || num(x.start);
    if (!cutting) return baseCard(hood, Object.assign({}, opts, { open: (opts.open === undefined ? true : opts.open) || forceOpen }));
    const keep = hood.times.map((t, i) => ({ t, i })).filter(({ t }) => match(t));
    if (!keep.length) {
      const area = F.area(), anyMatch = area.hoods.some(h => (!x.hood || h.name === x.hood) && h.times.some(match));
      const first = (area.hoods.find(h => !x.hood || h.name === x.hood) || {}).name;
      if (anyMatch || (hood.name !== first && area.hoods.some(h => h.name === hood.name))) return '';   // hide hoods with nothing she asked for
      return baseCard(Object.assign({}, hood, { times: [] }), Object.assign({}, opts, { open: true, more: 0, extra: (opts.extra || '') + emptyMsg(area) }));
    }
    const holdsTick = !!(p.hood && p.hood.name === hood.name);
    if (holdsTick && !opts.selected && p.time) opts = Object.assign({}, opts, { selected: p.time });
    const html = baseCard(Object.assign({}, hood, { times: keep.map(k => k.t) }), Object.assign({}, opts, { open: (opts.open === undefined ? true : opts.open) || forceOpen || holdsTick }));
    return html.replace(/data-i="(\d+)"/g, (_, n) => `data-i="${keep[+n].i}"`);   // taps still point at the real time
  };
  C.topNav = (o = {}) => baseNav(Object.assign({}, o, RESULTS.includes(App.current) && o.title === 'Work for you' && !o.keepTitle ? { title: F.title() } : {}));

  /* a new search starts with no filters; the card folds back to the screen's own default */
  const baseGo = App.go, basePreset = App.presetAsk;
  App.go = (id, patch, opts) => { if (id === 'L' || id === 'S1b' || id === 'FQ') F.reset(); if (id !== App.current) fold.screen = null; return baseGo(id, patch, opts); };
  App.presetAsk = () => { basePreset(); F.reset(); };
  return F;
})();
