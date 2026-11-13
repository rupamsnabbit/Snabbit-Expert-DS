/* Shared renderers — rebuilt to Figma V2 frame by frame (get_design_context). Same function names as before, so lane files keep working. */
window.C = (() => {
  const C = { icons: {} };
  const ICONS = ['arrow-left', 'caret-left', 'map-pin', 'clock', 'users-three', 'microphone', 'hourglass', 'check', 'x', 'caret-down', 'caret-up', 'caret-right', 'speaker-high', 'backspace', 'house', 'arrow-counter-clockwise', 'pencil-simple', 'magnifying-glass', 'user-circle', 'circle', 'check-circle-fill', 'clock-fill', 'map-pin-fill', 'microphone-fill', 'radio-button-fill', 'users-three-fill', 'keyboard', 'currency-inr', 'navigation-arrow'];
  C.loadIcons = async () => { await Promise.all(ICONS.map(async n => { try { const r = await fetch(`assets/icons/${n}.svg`); C.icons[n] = r.ok ? await r.text() : ''; } catch (e) { C.icons[n] = ''; } })); if (!C.icons['caret-left']) C.icons['caret-left'] = C.icons['arrow-left']; if (!C.icons['keyboard']) C.icons['keyboard'] = C.icons['pencil-simple']; };
  C.icon = (name, cls = '') => `<span class="ic ${cls}">${C.icons[name] || ''}</span>`;
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  C.esc = esc;

  /* Top: white band (status bar sits in it as an overlay) + TopNav 56 with the back chevron, title, and a slot.
     action: 'Type it' renders V2's bordered chip; any other label renders the pink text button (Skip / Speak). */
  C.topNav = ({ title = '', back = true, action = null, actionAct = 'toast', actionTo = '', chip = null } = {}) => {
    const isChip = action === 'Type it' || chip;
    const slot = action ? (isChip ? `<span class="chip" data-act="${actionAct}" data-to="${actionTo}">${C.icons['keyboard']}<span>${esc(action)}</span></span>` : `<span class="textbtn" data-act="${actionAct}" data-to="${actionTo}">${esc(action)}</span>`) : '';
    return `<div class="top"><div class="topnav"><div class="left">${back ? `<div class="back" data-act="back">${C.icons['caret-left']}</div>` : '<div class="back"></div>'}${title ? `<div class="title">${esc(title)}</div>` : ''}</div><div class="slot">${slot}</div></div></div>`;
  };
  C.topPlain = () => `<div class="top plain"></div>`;

  /* You asked band */
  C.askStrip = (line) => `<div class="ask"><div class="col"><span class="bs g500">You asked</span><span class="bm-sb g900">${esc(line)}</span></div><span class="change" data-act="change">Change</span></div>`;
  C.askLine = (state) => { const a = state.ask, d = Data; const place = a.friend && state.friendConfirmed ? `${d.friend.area} · ${d.friend.id}` : (a.samePlace || !a.place ? 'Your hood' : (a.subhood ? `${a.place} ${a.subhood}` : a.place)); const time = a.time ? d.fmt(a.time) : d.fmt(d.her.time); return a.friend && state.friendConfirmed ? place : `${place} · ${time}`; };

  /* Status banner — Figma V3 (2026-10-15): 'Banner 10' 452:18460 (Timing is not available), 'Banner 9' 453:19804 (Area is not available),
     'Banner 8' 452:18446 (the same once she joined the waitlist: a 32 px white icon button on the right), 'Banner 7' 454:33187 (green, the offer held).
     Pink-50 card, pink-500 border with a 4 px bottom edge, the mascot (118 × 79) bleeding top-left; line one states the fact (14/20), line two says what to do (16/24 medium).
     art: 'time' · 'area' · 'open' (green). button: { act, icon } adds the icon button (V3). close: V2's 18 px dismiss, kept for callers that still pass it. act: the whole banner's tap. */
  C.statusCard = ({ line, desc, art = 'time', tone = 'waiting', close = false, act = '', pillAct = '', button = null }) => {
    if (window.App && App.state && App.state.bannerHidden === App.current) return '';
    const open = tone === 'open' || art === 'open';
    const tap = act || (open ? pillAct : '');
    const src = open ? 'assets/banner/open.png' : `assets/results/banner-${art === 'area' ? 'area' : 'time'}.png`;
    const btn = button ? `<span class="bbtn" data-act="${esc(button.act || 'banner-btn')}">${C.icons[button.icon || 'currency-inr'] || ''}</span>` : '';
    return `<div class="sbanner ${open ? 'open' : ''} ${btn ? 'has-btn' : ''}" ${tap ? `data-act="${tap}"` : ''}><img class="bart" src="${src}" alt=""><div class="btext"><span class="bl1">${esc(line)}</span>${desc ? `<span class="bl2">${esc(desc)}</span>` : ''}</div>${btn}${close ? `<span class="bclose" data-act="banner-close"><img src="assets/banner/close.svg" alt="Close"></span>` : ''}</div>`;
  };

  /* V3 pieces shared by the hood and area cards: map-pin 20 + name, "Earn upto" 12 gray-400 over ₹ 14 semibold green-600 */
  const nameRow = name => `<div class="nmrow"><img class="pin" src="assets/results/card-map-pin-20.svg" width="20" height="20" alt=""><span class="name">${esc(name)}</span></div>`;
  const earn = pay => `<div class="earn"><span class="eu">Earn upto</span><b>${Data.rs(pay)}</b></div>`;
  const h12 = h => `${h % 12 || 12} ${h < 12 || h === 24 ? 'AM' : 'PM'}`;
  C.timeArrow = t => `<span class="label tm"><span>${h12(t.start)}</span><img src="assets/results/row-arrow-16.svg" width="16" height="16" alt="to"><span>${h12(t.end)}</span></span>`;   // "9 AM → 5 PM"

  /* Area card — Figma V3 452:19014 / 454:33179: radio 20 · [Recommended] · map-pin + area · km | Earn upto ₹ · Divider · buildings 16 "N Hoods" | clock 16 "Starts 6AM" (14/20 medium gray-500) */
  C.areaCard = (area, { recommended = false, selected = false, act = 'area', meta = true } = {}) =>
    `<div class="card plain v3area" data-act="${act}" data-area="${esc(area.name)}"><div class="head"><div class="l"><span class="radio ${selected ? 'on' : ''}"></span><div class="left">${recommended ? '<span class="tag">Recommended</span>' : ''}${nameRow(area.name)}<span class="sub">${esc(area.km)}</span></div></div>${earn(area.hoods[0].times[0].pay)}</div>${meta ? `<div class="hr soft"></div><div class="ameta"><span class="it"><img src="assets/results/meta-buildings-16.svg" width="16" height="16" alt=""><span>${area.hoodsCount || area.hoods.length} Hoods</span></span><span>|</span><span class="it"><img src="assets/results/meta-clock-16.svg" width="16" height="16" alt=""><span>Starts ${esc(area.starts || '6AM')}</span></span></div>` : ''}</div>`;

  /* Hood card — Figma V4 (2026-10-17) 481:41401 (My hood) · 481:38023 (HSR) · 492:52510 (friend) · 481:40497 (behind the hood sheet):
     [label tag above] · map-pin 20 + hood 16 semibold · km 14 gray-500 · caret 16 (up open, down shut); then a column (gap 20) of Divider · time row:
     radio 20 centred on a column (pt 2, gap 4): [row tag] · "7:00 AM to 5:00 PM" 16/20 medium gray-900 · clock 16 + "6 hours" 14 regular gray-500 | "Earn upto" 12/16 gray-400 over ₹ 14/20 semibold green-600;
     "Show more" 14/20 medium pink-600 (glyph 18, gap 4, py 10) under the column (card gap 12).
     rowTag: a tag over the ticked row's time ("Best match"); rowTagHtml: the same with the caller's own tag markup; rowTagAt: a time — tag that row instead of the ticked one
     (lane C: "Anita works here" over the friend's time). chevron:false drops the caret (lane T, 481:41401). */
  const clock12 = h => `${h % 12 || 12}:00 ${h < 12 || h === 24 ? 'AM' : 'PM'}`;
  C.timeLine = t => `${clock12(t.start)} to ${clock12(t.end)}`;                                   // "7:00 AM to 5:00 PM"
  C.hoursLine = t => `<span class="hrs"><img src="assets/results/v4-row-clock-16.svg" width="16" height="16" alt=""><span>${t.end - t.start} hours</span></span>`;
  C.hoodCard = (hood, { open = true, selected = null, tag = null, now = null, fullTime = null, label = null, more = Data.more, act = 'hood', extra = '', chevron = true, rowTag = null, rowTagHtml = '', rowTagAt = null } = {}) => {
    const rows = open ? hood.times.map((t, i) => {
      const isSel = selected && t.start === selected.start && t.end === selected.end;
      const isNow = now && t.start === now.start && t.end === now.end;
      const isFull = fullTime && t.start === fullTime.start && t.end === fullTime.end;
      const at = rowTagAt ? (t.start === rowTagAt.start && t.end === rowTagAt.end) : isSel;
      const tagged = at && (rowTag || rowTagHtml);
      const col = `<div class="rcol">${tagged ? (rowTagHtml || `<span class="tag">${esc(rowTag)}</span>`) : ''}<span class="label tm4">${C.timeLine(t)}${isNow ? ' <span class="bs g400">now</span>' : ''}</span>${C.hoursLine(t)}</div>`;
      return `<div class="hr soft"></div><div class="rrow v4 ${isSel ? 'on' : ''} ${isNow ? 'now' : ''} ${isFull ? 'full' : ''}" data-act="time" data-hood="${esc(hood.name)}" data-i="${i}"><div class="l"><span class="radio"></span>${col}</div>${isFull ? '<span class="tag full">Full</span>' : earn(t.pay)}</div>`; }).join('') : '';
    // V4 rev (481:36973 · 481:41658 · 492:52510 · 629:71703): "+10 slots" became "Show more", pink, with a leading glyph — Figma draws a rupee-circle duotone from
    // another set; here Phosphor currency-inr (regular, 18), the registered earnings glyph, as the nearest Phosphor match
    const moreBtn = open && more ? `<div class="more" data-act="more" data-hood="${esc(hood.name)}">${C.icons['currency-inr'] || ''}<span>Show more</span></div>` : '';
    return `<div class="card v3 ${open ? 'open' : 'collapsed'}" data-hood="${esc(hood.name)}"><div class="head" data-act="${act}" data-hood="${esc(hood.name)}"><div class="left">${label ? `<span class="tag lbl">${esc(label)}</span>` : ''}${tag ? `<span class="tag neutral lbl">${esc(tag)}</span>` : ''}${nameRow(hood.name)}${hood.km ? `<span class="sub">${esc(hood.km)}</span>` : ''}</div>${chevron ? `<img class="chev" src="assets/results/card-caret-16.svg" width="16" height="16" alt="">` : ''}</div>${extra}${open ? `<div class="rows v4">${rows}</div>${moreBtn}` : ''}</div>`;
  };

  /* The 1.06 floor under the "full right now" sheets (443:16866 · 452:18838 · V4 481:42395, unchanged): "Work for you", the chips, "Work close by" H3 and three plain cards
     (tag · name · km | ₹ 16 semibold over "a month" / "₹ less" · Divider · clock 20 + "9 AM – 5 PM · 8 hrs"). Under a 45 % scrim, so drawn once here for lanes T and HT. */
  C.plainCard = ({ tag = null, name, sub = '', pay, time }) => { const less = pay < Data.her.pay ? Data.her.pay - pay : 0;
    return `<div class="card plain ht-plain"><div class="head"><div class="left">${tag ? `<span class="tag">${esc(tag)}</span>` : ''}<span class="name">${esc(name)}</span>${sub}</div><div class="pay"><span class="amt">${Data.rs(pay)}</span><span class="per">${less ? `${Data.rs(less)} less` : 'a month'}</span></div></div><div class="hr soft"></div><div class="meta">${C.icons['clock']}<span>${Data.fmt(time)} · ${Data.hours(time)} hrs</span></div></div>`; };
  C.floor106 = () => `${C.topNav({ title: 'Work for you', keepTitle: true })}${C.floorChips ? C.floorChips() : ''}<div class="body"><div class="h3 g900">Work close by</div>${Data.nearby.map((n, i) => { const a = Data.areas[n], t = a.hoods[0].times[0]; return C.plainCard({ tag: i === 0 ? 'Recommended' : null, name: a.name, sub: `<span class="sub">${esc(a.km)}</span>`, pay: t.pay, time: t }); }).join('')}</div>`;
  /* The 1.06 sheet (443:17013 · 452:18985): close orb 40 above, scene 180 (image 354 × 197) in a 2 px gray-100 frame, H2 centred, body 16/24 gray-700, one button */
  C.fullSheet = ({ title, body, button = 'Join waitlist', act = 'join' }) => `<div class="v3-sheet"><span class="orb-close" data-act="sheet-dismiss">${C.icons['x']}</span><div class="scene"></div><div class="stext"><div class="stitle">${esc(title).replace(/\n/g, '<br>')}</div><div class="sbody">${esc(body)}</div></div><div class="sactions">${C.button(button, { act })}</div></div>`;

  /* Buttons: primary pink, secondary bordered (V2 "Record again"), text (pink) */
  C.button = (label, { act = 'primary', kind = 'primary', disabled = false, icon = null, to = '' } = {}) =>
    `<button class="btn btn-${kind}" data-act="${act}" data-to="${to}" ${disabled ? 'disabled' : ''}>${icon ? C.icons[icon] : ''}${esc(label)}</button>`;
  C.textButton = (label, act, icon = null) => `<button class="btn btn-secondary" data-act="${act}">${icon ? C.icons[icon] : ''}${esc(label)}</button>`;
  C.actions = (...buttons) => `<div class="actions">${buttons.join('')}</div>`;

  /* Guide / recording middle (N1–N4, F3): fan at top, prompt or transcript, Saathi 144 (grey until the mic is on), Watch again */
  C.recStage = ({ prompt = 'Tap to record', transcript = '', live = false, foot = 'Watch again', footIcon = 'arrow-counter-clockwise', fan = '', loader = false, off = true }) =>
    `<div class="middle ${live ? 'live' : ''}">${fan}${transcript ? `<p class="transcript hi">${transcript}</p>` : `<p class="prompt">${esc(prompt)}</p>`}${loader ? '<div class="loader"></div>' : `<div class="ripple"></div><div class="ripple r1"></div><div class="saathi ${off && !live ? 'off' : ''}" data-act="mic">${live || !off ? `<div class="badge">${C.icons['microphone']}</div>` : ''}</div>`}${foot ? `<div class="watch ${foot === 'Listening' ? 'quiet' : ''}" data-act="${footIcon === 'arrow-counter-clockwise' ? 'watch' : 'foot'}">${footIcon && foot !== 'Listening' ? C.icons[footIcon] : ''}<span>${esc(foot)}</span></div>` : ''}</div>`;

  /* highlight the slots in a transcript line (V2: pink-100 block, pink text) */
  // one time phrase, highlighted once: "सुबह 9 से 5" · "सुबह 9 बजे से 8 घंटे तक" (V4 rev: start + hours) · "7 बजे से" · "8 घंटे"; Hindi and Hinglish words
  const TIME_RE = /((?:(?:सुबह|दोपहर|शाम|subah|dopahar|shaam)\s*)?\d{1,2}\s*(?:बजे|baje)?\s*(?:से|se|to)\s*\d{1,2}(?:\s*(?:बजे|baje))?(?:\s*(?:घंटे|ghante|hours|hrs)(?:\s*(?:तक|tak))?)?|(?:(?:सुबह|दोपहर|शाम|subah|dopahar|shaam)\s*)?\d{1,2}\s*(?:बजे|baje)(?:\s*(?:से|se))?|\d{1,2}\s*(?:घंटे|ghante|hours|hrs)(?:\s*(?:तक|tak))?)/gi;
  C.highlight = (text, { times = true } = {}) => { let s = esc(text); for (const w of ['HSR', 'Bellandur', 'Agara', 'Koramangala', 'Marathahalli', 'Kudlu', 'Anita', 'एचएसआर']) s = s.replace(new RegExp('(' + w + ')', 'gi'), '<span class="hl">$1</span>'); if (times) s = s.replace(TIME_RE, '<span class="hl">$1</span>').replace(/(\b\d{5}\b)/g, '<span class="hl">$1</span>'); return s; };

  /* Read-back rows (S1b): disc 48 with icon · label over value · caret, inside one bordered card */
  C.readRow = ({ icon, label, value, act }) => `<div class="lrow" data-act="${act}"><div class="disc">${C.icons[icon]}</div><div class="text"><span class="lab">${esc(label)}</span><span class="val">${esc(value)}</span></div><span class="caret">${C.icons['caret-right']}</span></div>`;
  C.listCard = (...rows) => `<div class="listcard">${rows.join('<div class="hr soft"></div>')}</div>`;

  /* The deck (Figma V2 G1–G5, 365:6897 → 365:7365): three pearl cards dealt in from off-screen right.
     G1 Place alone, upright · G2 Time dealt to the front, Place swings left · G3 Expert ID dealt front-right · G4/G5/F3 all three in the hand.
     Callers still pass the old fan description; it maps to a stage. The deck animates from the stage the previous screen showed. */
  const DECK = { place: { label: 'Place', val: '“HSR”' }, time: { label: 'Time', val: '“सुबह 9 से 5”' }, friend: { label: 'Expert ID', val: '“124564”' } };
  C.deckStage = (cards) => {
    const has = k => cards.some(c => c.key === k), lit = k => cards.some(c => c.key === k && c.lit);
    if (!has('time') && !has('friend')) return 'g1';
    if (!has('friend')) return 'g2';
    return lit('friend') ? 'g3' : 'g4';
  };
  C.fan = (cards) => {
    const to = typeof cards === 'string' ? cards : C.deckStage(cards);
    const from = (window.App && App.state && App.state.deckStage) || 'g0';
    if (window.App && App.state) App.state.deckStage = to;
    const card = k => `<div class="dkcard ${k}"><span class="dklabel">${DECK[k].label}</span><span class="dkval">${esc(DECK[k].val)}</span><img class="dkline" src="assets/deck/line-${k}.svg" alt=""><img class="dkicon" src="assets/deck/icon-${k}.svg" alt=""></div>`;
    return `<div class="deck ${from}" data-to="${to}">${card('place')}${card('time')}${card('friend')}</div>`;
  };

  /* Confirm body (E1/E2 shape) — kept for the per-lane confirm screens */
  C.confirmBody = ({ title, nowLabel, nowLine, newCard, caption, extra = '' }) =>
    `<div class="h2 g900">${esc(title)}</div><div class="now-line"><span class="bs g500">${esc(nowLabel)}</span><span class="bs-m g900">${esc(nowLine)}</span></div><div class="date-band">${C.icons['clock']}<span>From <b>${esc(Data.startDay)}</b></span></div>${newCard}${extra}<div class="bs g500">${esc(caption)}</div>`;
  C.newShiftCard = ({ hood, km, time, pay, lessThan = null, tag = 'New' }) =>
    `<div class="card new"><div class="head"><div class="left"><span class="tag">${esc(tag)}</span><span class="name">${esc(hood)}</span><span class="sub">${esc(km)}</span></div><div class="earn-col ${lessThan ? 'g900' : ''}"><b>${Data.rs(pay)}</b><br>${lessThan ? `<span class="bs" style="color:var(--color-red-600)">${Data.rs(lessThan)} less</span>` : '<span class="bs g500">a month</span>'}</div></div><div class="hr soft"></div><div class="meta">${C.icons['clock']}<span>${esc(Data.fmt(time))} · ${Data.hours(time)} hrs</span></div></div>`;

  /* Finding (1.05): skeleton title + three skeleton cards */
  C.skeletons = (n = 3) => `<div class="skel-title"><i></i></div>` + [[120, 88], [104, 96], [132, 80]].slice(0, n).map(([a, b]) => `<div class="skel"><div class="row"><div class="l"><i class="t" style="width:${a}px"></i><i style="width:${b}px"></i></div><i class="t" style="width:64px"></i></div><div class="hr soft"></div><i style="width:140px"></i></div>`).join('');
  /* Confirm your move (Figma V3 443:17020, 2026-10-15): place card (tag · hood 20/28 · area 16/24 · city picture) and one card of three rows,
     each a 48 px disc (gray-100 ring) with a pink Phosphor glyph: time (old struck over new), pay (old struck over new + "a month"), start date + "onwards".
     Her current time and pay are always shown struck above the new ones, as every V3 confirm frame draws them (lead, 2026-10-15). V3 drops V2's green From band; the date is the third row. */
  C.fromDate = () => `From ${Data.date.dayMonth(Data.startDate)} ${Data.startDate.getFullYear()}, ${Data.date.long(Data.startDate).split(',')[0]}`;
  /* V4 (505:56463, 2026-10-18): place card, then one card of two columns — Old (gray-100, gray-400 text) | New (white, pink "New"): clock · time 18 · hours 14 ·
     ₹ 20 / 18 · "a month"; then the start date as a line under the card (calendar 20 · date 16 medium · "onwards"). Replaces the three-row card. */
  C.confirmMove = ({ title = 'Confirm your move', tag = null, name, area, oldTime, newTime, oldPay, newPay, button }) => {
    const hrs = t => `${t.end - t.start} hours`;
    const col = (kind, label, t, pay) => `<div class="cmc ${kind}"><span class="cmc-lab">${label}</span><div class="cmc-time"><img src="assets/confirm/col-clock-${kind}.svg" alt=""><b>${esc(Data.fmt(t))}</b><span>${hrs(t)}</span></div><div class="cmc-pay"><b>${esc(Data.rs(pay))}</b><span>a month</span></div></div>`;
    return `${C.topNav({ title })}<div class="body cm-body">
      <div class="cm-place"><div class="cm-txt">${tag ? `<span class="tag">${esc(tag)}</span>` : ''}<div class="cm-names"><span class="cm-nm">${esc(name)}</span><span class="cm-ar">${esc(area)}</span></div></div><img class="cm-city" src="assets/confirm/city.png" alt=""></div>
      <div class="cm-cols">${col('old', 'Old', oldTime, oldPay)}${col('new', 'New', newTime, newPay)}</div>
    </div><div class="actions cm-actions"><div class="cm-date"><img src="assets/confirm/col-calendar.svg" alt=""><b>${esc(Data.date.ordinal(Data.startDate))}</b><span>onwards</span></div>${C.button(button)}</div>`;   // V4 rev (632:72443): the start date sits in the footer, above the button
  };

  return C;
})();
