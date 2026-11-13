/* One data set for the whole demo. Nothing numeric lives in a screen. */
window.Data = (() => {
  const t = (start, end, pay) => ({ start, end, pay });
  const data = {
    startDay: '', startDayHi: '',   // set below from today's date
    lockDays: 30,
    her: { area: 'Kudlu Gate', hood: 'Kudlu Gate 7th Main', km: '3.2 km from Bellandur', time: t(9, 17, 22000), hours: 8, pay: 22000 },
    friend: { name: 'Anita Sharma', first: 'Anita', id: '14586', area: 'Kudlu Gate', hood: 'Kudlu Main Road', time: t(9, 17, 22000) },
    // times offered in her own hood. 7 AM exists only when lane T is "open".
    herTimes: [t(9, 17, 22000), t(8, 10, 22000), t(10, 12, 25000), t(12, 14, 30000), t(14, 16, 28000), t(9, 13, 11000), t(9, 15, 16500), t(8, 18, 27500)],   // V4 rev: exact-hours filters need 4 / 6 / 10-hour slots
    herTimesExtra: [t(7, 15, 22000)],
    more: 10,
    // areas she can name, with hoods and their times
    areas: {
      HSR: { name: 'HSR', km: '3.2 km from Bellandur', hoods: [
        { name: 'HSR Sector 7', km: '3.2 km from Bellandur', best: true, times: [t(9, 17, 22000), t(8, 10, 22000), t(9, 15, 16500), t(9, 13, 11000), t(8, 18, 27500)] },
        { name: 'HSR Sector 9', km: '5.5 km from Bellandur', times: [t(10, 16, 16500), t(8, 10, 22000), t(9, 19, 27500)] },
        { name: 'HSR Sector 10', km: '6.2 km from Bellandur', times: [t(9, 17, 22000)] },
        { name: 'HSR Sector 11', km: '4.8 km from Bellandur', times: [t(12, 18, 16500)] } ] },
      Bellandur: { name: 'Bellandur', km: '0 km', hoods: [ { name: 'Bellandur Sector 2', km: '1.1 km', times: [t(9, 17, 22000)] }, { name: 'Green Glen Layout', km: '1.6 km', times: [t(9, 17, 22000), t(10, 16, 16500)] }, { name: 'Helios Tech Park', km: '2.4 km', times: [t(9, 13, 11000), t(9, 17, 22000)] } ] },   // V4 rev 481:40497 names
      Agara: { name: 'Agara', km: '1.8 km from HSR', hoodsCount: 3, starts: '6AM', hoods: [
        { name: 'Agara 10th Main', km: '3.2 km from Bellandur', times: [t(9, 17, 22000), t(12, 14, 22000), t(8, 10, 22000), t(9, 15, 16500), t(9, 19, 27500)] },
        { name: 'Agara 11th Main', km: '4.5 km from Bellandur', times: [t(10, 16, 16500)] },
        { name: 'Agara 12th Main', km: '3.8 km from Bellandur', times: [t(8, 14, 16500)] },
        { name: 'Agara 13th Main', km: '5.0 km from Bellandur', times: [t(9, 17, 22000)] } ] },
      Marathahalli: { name: 'Marathahalli', km: '3.2 km from Bellandur', hoodsCount: 6, starts: '6AM', hoods: [
        { name: 'Marathahalli Main', km: '3.2 km from Bellandur', times: [t(9, 17, 23000), t(8, 14, 16500)] } ] },
      Koramangala: { name: 'Koramangala', km: '2.6 km from HSR', hoodsCount: 8, starts: '6AM', hoods: [
        { name: 'Koramangala 6th Block', km: '2.6 km from HSR', times: [t(10, 16, 16500), t(9, 17, 22000)] } ] },
      'Kudlu Gate': { name: 'Kudlu Gate', km: '0 km', hoods: [ { name: 'Kudlu Main Road', km: '0.8 km', times: [t(9, 17, 22000), t(8, 10, 22000), t(10, 12, 22000), t(9, 15, 16500), t(9, 13, 11000)] } ] }
    },
    nearby: ['Agara', 'Marathahalli', 'Koramangala'],   // close to HSR, nearest first
    // scripted mode: what "she says" on each screen, per lane
    script: {
      T:  { FQ: 'मुझे shift का time बदलना है', N4: 'सुबह 7 बजे से 8 घंटे', S1b: 'हाँ', T1: 'हाँ', T1f: '8 बजे', T2: 'हाँ पक्का', D: 'home' },
      HT: { FQ: 'मुझे hood बदलना है', N4: 'मुझे HSR या Bellandur में काम चाहिए', S1b: 'हाँ', H1: 'हाँ', H1f: 'बता देना', W1: 'हाँ', H3: 'Agara', H4: 'हाँ', H5: 'हाँ पक्का', P2: 'हाँ', W2b: 'हाँ', P2late: 'हाँ', D: 'home' },
      C:  { FQ: 'दोस्त के साथ', E4: 'दोस्त की ID है 14586', N4: 'मेरी दोस्त Anita के साथ, उसका ID 14586', S1b: 'हाँ', C1: '14586', C3: 'हाँ', C4: 'हाँ', C4t: '8 से 10', C4a: 'Agara', H4: 'हाँ', H5: 'हाँ', D: 'home' }
    }
  };
  // helpers
  const h12 = h => { const x = h % 12 === 0 ? 12 : h % 12; return `${x} ${h < 12 || h === 24 ? 'AM' : 'PM'}`; };
  data.fmt = (tm, sep = ' – ') => `${h12(tm.start)}${sep}${h12(tm.end)}`;
  data.fmtTo = tm => data.fmt(tm, ' to ');
  data.hours = tm => tm.end - tm.start;
  data.rs = n => '₹' + n.toLocaleString('en-IN');
  data.hi = { time: tm => `${tm.start % 12 || 12} से ${tm.end % 12 || 12}`, start: h => `${h % 12 || 12} बजे` };
  data.findArea = name => { if (!name) return null; const k = Object.keys(data.areas).find(k => k.toLowerCase() === String(name).toLowerCase()); return k ? data.areas[k] : null; };
  data.findHood = (area, sub) => { const a = data.findArea(area); if (!a) return null; if (!sub) return a.hoods[0]; return a.hoods.find(h => h.name.toLowerCase().includes(String(sub).toLowerCase())) || a.hoods[0]; };
  // start day of a booked change: Mon–Wed → the next day; Thu–Sun → the next Monday (FLOW rules). The lock runs lockDays from it.
  const DAY3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], DAYV3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const DAYLONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONLONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYHI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const MONHI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const wd = today().getDay();
  data.today = today();
  data.startDate = addDays(data.today, wd >= 1 && wd <= 3 ? 1 : ((8 - wd) % 7 || 7));
  data.lockUntil = addDays(data.startDate, data.lockDays);
  const ord = n => n + ((n % 100 >= 11 && n % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'));
  data.date = {
    short: d => `${DAY3[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`,            // "Mon 19 Oct"
    dayMonth: d => `${d.getDate()} ${MON[d.getMonth()]}`,                                // "19 Oct"
    ordinal: d => `${ord(d.getDate())} ${MON[d.getMonth()]}, ${DAYV3[d.getDay()]}`,      // "19th Oct, Mon" (V3 confirm)
    long: d => `${DAYLONG[d.getDay()]}, ${d.getDate()} ${MONLONG[d.getMonth()]}`,        // "Monday, 19 October" (Home shift card)
    hi: d => `${DAYHI[d.getDay()]} ${d.getDate()} ${MONHI[d.getMonth()]}`,
    addDays, daysFrom: (a, b) => Math.round((b - a) / 864e5)
  };
  data.startDay = data.date.short(data.startDate);
  data.startDayHi = data.date.hi(data.startDate);
  return data;
})();
