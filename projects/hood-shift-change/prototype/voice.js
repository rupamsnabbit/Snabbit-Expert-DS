/* Voice: speak (TTS), listen (STT), parse (Hinglish → slots). Real mode uses the browser; scripted mode replays Data.script. */
window.Voice = (() => {
  const V = { mode: 'real', lang: 'hi-IN', voice: null, rec: null, speaking: null, onState: () => {}, script: 'auto' };
  const synth = window.speechSynthesis;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  V.supported = { tts: !!synth, stt: !!SR };

  function pickVoice() {
    if (!synth) return null;
    const vs = synth.getVoices();
    return vs.find(v => /^hi/i.test(v.lang) && /google/i.test(v.name)) || vs.find(v => /^hi/i.test(v.lang)) || vs.find(v => /en-IN/i.test(v.lang)) || vs[0] || null;
  }
  if (synth) { synth.onvoiceschanged = () => { V.voice = pickVoice(); }; V.voice = pickVoice(); }

  /* ---------- speak ---------- */
  /* remote voice (Gemini TTS through serve.py) — used when /tts/status says enabled; browser voice is the fallback */
  V.remote = { enabled: false, voice: null, audio: null };
  V.checkRemote = async () => { try { const r = await fetch('tts/status'); const j = await r.json(); V.remote.enabled = !!j.enabled; V.remote.voice = j.voice; V.remote.model = j.model; } catch (e) { V.remote.enabled = false; } return V.remote.enabled; };
  V.warm = async (texts) => { if (!V.remote.enabled || !texts.length) return; try { await fetch('tts/warm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texts }) }); } catch (e) {} };
  V.speakRemote = (text) => new Promise(async resolve => {
    try {
      const r = await fetch('tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
      if (!r.ok) throw new Error('tts ' + r.status);
      const blob = await r.blob(); const url = URL.createObjectURL(blob);
      const a = new Audio(url); V.remote.audio = a; V.onState('speaking');
      let done = false; const end = () => { if (done) return; done = true; URL.revokeObjectURL(url); if (V.remote.audio === a) V.remote.audio = null; V.onState('idle'); resolve(true); };
      a.onended = end; a.onerror = end; a.onpause = end; a.play().catch(end);
    } catch (e) { resolve(false); }
  });
  V.speak = (text) => new Promise(async resolve => {
    V.cancel();
    if (!text) return resolve();
    if (V.remote.enabled && V.script !== 'browser') { const ok = await V.speakRemote(String(text).replace(/\s*—\s*/g, ', ')); if (ok) return resolve(); }
    if (!synth) return resolve();
    text = String(text).replace(/\s*—\s*/g, ', ');   // the Hindi voice stumbles on dashes; a pause reads better
    V.voice = pickVoice();
    const hindi = V.script === 'hindi' || (V.script !== 'roman' && V.voice && /^hi/i.test(V.voice.lang));
    if (!hindi) { text = window.Roman ? Roman.say(text) : text; }           // no Hindi voice on this phone: romanised Hinglish for the English-Indian voice
    const u = new SpeechSynthesisUtterance(text);
    u.lang = hindi ? 'hi-IN' : 'en-IN'; if (V.voice && (hindi || !/^hi/i.test(V.voice.lang))) u.voice = V.voice; u.rate = hindi ? 0.95 : 0.92; u.pitch = 1.05;
    V.lastSpoken = text; V.usingHindi = hindi;
    V.speaking = u; V.onState('speaking');
    let done = false; const end = () => { if (done) return; done = true; V.speaking = null; V.onState('idle'); resolve(); };
    u.onend = end; u.onerror = end;
    // Android Chrome sometimes never fires onend for long strings: safety timeout by length
    setTimeout(end, 2000 + text.length * 140);   // safety only; a real onend arrives first
    synth.speak(u);
  });
  V.cancel = () => { if (synth && synth.speaking) synth.cancel(); V.speaking = null; if (V.remote.audio) { try { V.remote.audio.pause(); } catch (e) {} V.remote.audio = null; } };

  /* ---------- listen ---------- */
  // opts: { interim(text), timeout }  → resolves with the final transcript ('' on silence)
  V.listen = (opts = {}) => new Promise(resolve => {
    V.stopListening();
    if (V.mode === 'script') {
      const text = opts.scripted || '';
      V.onState('listening');
      let i = 0; const words = text.split(' ');
      const tick = () => { i++; if (opts.interim) opts.interim(words.slice(0, i).join(' ')); if (i < words.length) setTimeout(tick, 260); else setTimeout(() => { V.onState('thinking'); setTimeout(() => { V.onState('idle'); resolve(text); }, 500); }, 400); };
      setTimeout(tick, 700);
      return;
    }
    if (!SR) { V.onState('idle'); return resolve(''); }
    const r = new SR(); V.rec = r;
    r.lang = V.lang; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let finalText = '', settled = false, interimText = '';
    const finish = () => { if (settled) return; settled = true; V.rec = null; V.onState(finalText || interimText ? 'thinking' : 'idle'); setTimeout(() => { V.onState('idle'); resolve((finalText || interimText).trim()); }, 350); };
    r.onresult = e => { let it = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finalText += t; else it += t; } interimText = it || interimText; if (opts.interim) opts.interim((finalText + ' ' + it).trim()); };
    r.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') V.lastError = e.error; finish(); };
    r.onend = finish;
    V.onState('listening');
    try { r.start(); } catch (err) { finish(); }
    setTimeout(() => { try { r.stop(); } catch (e) {} }, opts.timeout || 7000);
  });
  V.stopListening = () => { if (V.rec) { try { V.rec.abort(); } catch (e) {} V.rec = null; } };

  /* ---------- parse ---------- */
  // Devanagari → latin keys, so one vocabulary serves both scripts
  const DEV = {
    'हाँ': 'haan', 'हां': 'haan', 'हा': 'haan', 'जी': 'haan', 'ठीक': 'theek', 'पक्का': 'pakka', 'सही': 'sahi', 'लेना': 'lena', 'लूँगी': 'lena', 'लूंगी': 'lena', 'करो': 'karo', 'कर': 'kar', 'दो': 'do', 'चलेगा': 'chalega', 'बिल्कुल': 'bilkul',
    'नहीं': 'nahi', 'नही': 'nahi', 'ना': 'na', 'मत': 'mat', 'रहने': 'rehne',
    'यहीं': 'yahin', 'यही': 'yahin', 'वही': 'wahi', 'इसी': 'isi', 'जगह': 'jagah', 'हुड': 'hood', 'एरिया': 'area', 'इलाका': 'area',
    'सुबह': 'subah', 'दोपहर': 'dopahar', 'शाम': 'shaam', 'रात': 'raat', 'से': 'se', 'तक': 'tak', 'बजे': 'baje', 'घंटे': 'ghante', 'घंटा': 'ghante', 'टाइम': 'time', 'समय': 'time',
    'दोस्त': 'dost', 'सहेली': 'dost', 'साथ': 'saath', 'आईडी': 'id', 'आइडी': 'id', 'अनीता': 'anita', 'अनिता': 'anita',
    'वेटलिस्ट': 'waitlist', 'वेट': 'wait', 'रुक': 'wait', 'बता': 'bata', 'देना': 'dena', 'बताना': 'bata dena', 'खुलने': 'khulne', 'खुले': 'khule', 'जब': 'jab',
    'हटाओ': 'hatao', 'हटा': 'hatao', 'छोड़ो': 'chhodo', 'निकालो': 'hatao', 'कैंसल': 'cancel',
    'पीछे': 'peeche', 'वापस': 'wapas', 'घर': 'ghar', 'होम': 'home',
    'और': 'aur', 'बाकी': 'baaki', 'ज़्यादा': 'zyada', 'ज्यादा': 'zyada', 'दिखाओ': 'dikhao', 'दिखा': 'dikhao',
    'कितना': 'kitna', 'कितने': 'kitna', 'पैसा': 'paisa', 'पैसे': 'paisa', 'मिलेगा': 'milega', 'दूर': 'door', 'कब': 'kab', 'कौनसा': 'kaunsa', 'कौन': 'kaun', 'सा': 'sa',
    'सबसे': 'sabse', 'पास': 'paas', 'पहला': 'pehla', 'पहले': 'pehle', 'वाला': 'wala', 'वाली': 'wala',
    'एचएसआर': 'hsr', 'बेल्लंदूर': 'bellandur', 'बेलंदूर': 'bellandur', 'बेल्लन्दूर': 'bellandur', 'अगारा': 'agara', 'अगरा': 'agara', 'कुडलू': 'kudlu', 'कुड्लू': 'kudlu', 'कोरमंगला': 'koramangala', 'कोरामंगला': 'koramangala', 'मराठहल्ली': 'marathahalli', 'मराठाहल्ली': 'marathahalli', 'सेक्टर': 'sector', 'मेन': 'main', 'मैन': 'main',
    'एक': '1', 'दो्': '2', 'तीन': '3', 'चार': '4', 'पाँच': '5', 'पांच': '5', 'छह': '6', 'छः': '6', 'छे': '6', 'सात': '7', 'आठ': '8', 'नौ': '9', 'दस': '10', 'ग्यारह': '11', 'बारह': '12',
    'पता': 'pata', 'मालूम': 'pata', 'लिख': 'likh', 'टाइप': 'type', 'बदलो': 'badlo', 'बदलना': 'badlo', 'चाहिए': 'chahiye', 'काम': 'kaam', 'में': 'mein', 'का': 'ka', 'की': 'ki', 'के': 'ke', 'है': 'hai', 'हो': 'ho', 'या': 'ya', 'मुझे': 'mujhe', 'मेरी': 'meri', 'मेरा': 'mera', 'उसका': 'uska', 'उसकी': 'uska'
  };
  const LAT_NUM = { ek: '1', do: '2', teen: '3', tin: '3', char: '4', chaar: '4', paanch: '5', panch: '5', pach: '5', chhe: '6', che: '6', saat: '7', sat: '7', aath: '8', ath: '8', nau: '9', no: '9', das: '10', dus: '10', gyarah: '11', barah: '12', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12' };
  const DEVDIGIT = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
  const PLACES = ['hsr', 'bellandur', 'agara', 'kudlu', 'koramangala', 'marathahalli'];
  const PLACE_KEY = { hsr: 'HSR', bellandur: 'Bellandur', agara: 'Agara', kudlu: 'Kudlu Gate', koramangala: 'Koramangala', marathahalli: 'Marathahalli' };

  V.normalise = (raw) => {
    let s = (raw || '').toLowerCase().replace(/[०-९]/g, d => DEVDIGIT[d]).replace(/[.,!?।"'“”]/g, ' ').replace(/-/g, ' ');
    s = s.replace(/\bh\s*s\s*r\b/g, 'hsr').replace(/एच\s*एस\s*आर/g, 'hsr').replace(/(\d)\s*(?:am|pm|a\.m|p\.m)\b/g, '$1');
    const toks = s.split(/\s+/).filter(Boolean).map(t => DEV[t] || LAT_NUM[t] || t);
    return toks.join(' ');
  };
  const has = (s, ...words) => words.some(w => new RegExp('(^|\\s)' + w + '(\\s|$)').test(s));
  const hour = (n, pm) => { n = +n; if (n > 12) return n; if (pm) return n === 12 ? 12 : n + 12; return n; };

  V.parse = (raw, ctx = {}) => {
    const s = V.normalise(raw);
    const u = { raw, text: s, affirm: false, negate: false, place: null, subhood: null, samePlace: false, time: null, hours: null, part: null, friend: null, id: null, waitlist: false, leave: false, back: false, home: false, more: false, question: null, type: false, dontKnow: false, empty: !s.trim() };
    if (u.empty) return u;
    u.affirm = has(s, 'haan', 'theek', 'pakka', 'sahi', 'lena', 'chalega', 'bilkul', 'ok', 'okay', 'yes', 'yeah', 'karo', 'kar do', 'haa', 'han', 'ha');
    u.negate = has(s, 'nahi', 'na', 'mat', 'rehne', 'no', 'nope', 'cancel') && !has(s, 'nahi hai');
    if (has(s, 'nahi hai', 'pata nahi', 'pata nahin', 'malum nahi', 'yaad nahi')) { u.dontKnow = true; u.negate = false; }
    for (const p of PLACES) if (has(s, p)) { u.place = PLACE_KEY[p]; break; }
    const sec = s.match(/sector\s*(\d{1,2})/); if (sec) u.subhood = 'Sector ' + sec[1];
    const main = s.match(/(\d{1,2})(?:th|st|nd|rd)?\s*main/); if (main) u.subhood = main[1] + 'th Main';
    if (has(s, 'yahin', 'wahi jagah', 'isi hood', 'isi area', 'same place', 'same hood', 'yahi')) u.samePlace = true;
    if (has(s, 'subah', 'morning')) u.part = 'subah'; if (has(s, 'dopahar', 'afternoon')) u.part = 'dopahar'; if (has(s, 'shaam', 'evening')) u.part = 'shaam';
    const range = s.match(/(\d{1,2})\s*(?:baje\s*)?(?:se|to|tak|se lekar)\s*(\d{1,2})/);
    if (range) {
      let a = +range[1], b = +range[2];
      const pmStart = u.part === 'dopahar' || u.part === 'shaam' || (a <= 6 && !u.part);
      a = hour(a, pmStart); b = hour(b, b <= a % 12 || b < 7 || (b <= 12 && hour(b, false) <= a));
      if (b <= a) b += 12;
      u.time = { start: a, end: b };
    } else {
      const single = s.match(/(\d{1,2})\s*baje/) || s.match(/\bfrom\s*(\d{1,2})/) || (has(s, 'se') && s.match(/(\d{1,2})\s*se\b/));
      if (single && !/\d{5}/.test(s)) { let a = +single[1]; const pm = u.part === 'dopahar' || u.part === 'shaam' || (a <= 5 && !u.part); a = hour(a, pm); const hrs = (ctx.hours || 8); u.time = { start: a, end: a + hrs, startOnly: true }; }
    }
    const gh = s.match(/(\d{1,2})\s*ghante/); if (gh) u.hours = +gh[1];
    const idm = s.match(/\b(\d{5})\b/) || s.match(/\b(\d\s\d\s\d\s\d\s\d)\b/); if (idm) u.id = idm[1].replace(/\s/g, '');
    if (has(s, 'dost', 'saath', 'friend', 'anita') || u.id) u.friend = { name: has(s, 'anita') ? 'Anita' : null, id: u.id };
    if (has(s, 'waitlist', 'wait', 'bata dena', 'khulne', 'khule', 'jab khule', 'bata do', 'batana', 'rukna', 'wait karo')) u.waitlist = true;
    if (has(s, 'hatao', 'chhodo', 'leave', 'remove', 'waitlist se')) { u.leave = true; u.waitlist = false; }
    if (has(s, 'peeche', 'wapas', 'back')) u.back = true;
    if (has(s, 'ghar', 'home')) u.home = true;
    if (has(s, 'aur', 'baaki', 'zyada', 'dikhao', 'more', 'aur dikhao')) u.more = true;
    if (has(s, 'kitna', 'kitne')) u.question = has(s, 'door', 'far') ? 'distance' : 'money';
    if (has(s, 'kab')) u.question = 'when';
    if (has(s, 'kaunsa', 'kaun sa', 'which')) u.question = u.question || 'which';
    if (has(s, 'likh', 'type', 'likhti', 'likhna')) u.type = true;
    u.newAsk = !!(u.place || (u.time && !u.affirm && !u.negate) || u.friend);
    return u;
  };
  return V;
})();
