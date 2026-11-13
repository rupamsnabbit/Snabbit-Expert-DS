/* Devanagari → romanised Hinglish, for phones without a Hindi voice. A word list first (natural spellings), then a letter map. */
window.Roman = (() => {
  const WORDS = {
    'नमस्ते': 'namaste', 'क्या': 'kya', 'आप': 'aap', 'आपका': 'aapka', 'आपकी': 'aapki', 'आपके': 'aapke', 'आपको': 'aapko', 'आपसे': 'aapse', 'अपना': 'apna', 'अपनी': 'apni',
    'है': 'hai', 'हैं': 'hain', 'हूँ': 'hoon', 'था': 'tha', 'थी': 'thi', 'हो': 'ho', 'होगा': 'hoga', 'होगी': 'hogi', 'हुआ': 'hua', 'हुई': 'hui',
    'मैं': 'main', 'मैंने': 'maine', 'मुझे': 'mujhe', 'मेरी': 'meri', 'मेरा': 'mera', 'यह': 'yeh', 'यही': 'yahi', 'यहाँ': 'yahan', 'यहीं': 'yahin', 'वो': 'woh', 'वही': 'wahi', 'वहाँ': 'wahan', 'इस': 'is', 'इसे': 'ise', 'इसमें': 'ismein', 'इनमें': 'inmein', 'उसका': 'uska',
    'में': 'mein', 'से': 'se', 'का': 'ka', 'की': 'ki', 'के': 'ke', 'को': 'ko', 'पर': 'par', 'तक': 'tak', 'और': 'aur', 'या': 'ya', 'भी': 'bhi', 'ही': 'hi', 'तो': 'toh', 'कि': 'ki', 'जो': 'jo', 'जहाँ': 'jahan', 'जैसे': 'jaise', 'जैसी': 'jaisi', 'फिर': 'phir', 'पहले': 'pehle', 'सबसे': 'sabse', 'अभी': 'abhi', 'अब': 'ab', 'तब': 'tab', 'जब': 'jab', 'कब': 'kab', 'कहाँ': 'kahan', 'कौनसा': 'kaunsa', 'कोई': 'koi', 'कुछ': 'kuch', 'सब': 'sab', 'एक': 'ek', 'बार': 'baar', 'बाद': 'baad', 'साथ': 'saath', 'पास': 'paas', 'दूर': 'door', 'नहीं': 'nahi', 'न': 'na', 'हाँ': 'haan',
    'चाहती': 'chahti', 'चाहते': 'chahte', 'चाहेंगी': 'chahengi', 'चाहें': 'chahein', 'चाहिए': 'chahiye', 'सकती': 'sakti', 'सकते': 'sakte', 'करना': 'karna', 'करती': 'karti', 'करेंगी': 'karengi', 'कर': 'kar', 'करके': 'karke', 'कीजिए': 'kijiye', 'कीजिएगा': 'kijiyega', 'बताइए': 'bataiye', 'बता': 'bata', 'बताना': 'batana', 'बताऊँ': 'bataoon', 'बताओ': 'batao', 'बताइएगा': 'bataiyega', 'दीजिए': 'dijiye', 'दीजिएगा': 'dijiyega', 'दूँ': 'doon', 'दूँगी': 'doongi', 'दिया': 'diya', 'दिखाओ': 'dikhao', 'देख': 'dekh', 'देखना': 'dekhna', 'देखिए': 'dekhiye', 'देखें': 'dekhein', 'लीजिए': 'lijiye', 'लेना': 'lena', 'लिया': 'liya', 'रहना': 'rehna', 'रहेगा': 'rahega', 'रहेंगी': 'rahengi', 'रही': 'rahi', 'सुन': 'sun', 'समझ': 'samajh', 'समझा': 'samjha', 'पाई': 'paayi', 'पक्का': 'pakka', 'चुन': 'chun', 'चुना': 'chuna', 'बदलना': 'badalna', 'बदलकर': 'badalkar', 'बदलाव': 'badlaav', 'हटा': 'hata', 'हटाना': 'hatana', 'हटाओ': 'hatao', 'लगा': 'laga', 'लगी': 'lagi', 'लागू': 'laagu', 'खुला': 'khula', 'खुलेगा': 'khulega', 'खुलेगी': 'khulegi', 'खुलने': 'khulne', 'खुलते': 'khulte', 'भरा': 'bhara', 'मिलेंगे': 'milenge', 'मिलेगा': 'milega', 'जा': 'ja', 'जाएगा': 'jayega', 'गया': 'gaya', 'शुरू': 'shuru', 'दबा': 'daba', 'बोलकर': 'bolkar', 'बोलना': 'bolna', 'बोलिए': 'boliye',
    'काम': 'kaam', 'जगह': 'jagah', 'समय': 'samay', 'सुबह': 'subah', 'दोपहर': 'dopahar', 'शाम': 'shaam', 'बजे': 'baje', 'घंटे': 'ghante', 'घंटों': 'ghanton', 'दोस्त': 'dost', 'सहेली': 'saheli', 'अंकों': 'ankon', 'अंक': 'ank', 'पाँच': 'paanch', 'रुपये': 'rupaye', 'पैसा': 'paisa', 'पैसे': 'paise', 'महीने': 'mahine', 'किलोमीटर': 'kilometre', 'बात': 'baat', 'बधाई': 'badhai', 'माफ़': 'maaf', 'ठीक': 'theek', 'सही': 'sahi', 'आसान': 'aasaan', 'बहुत': 'bahut', 'नया': 'naya', 'नई': 'nayi', 'वाला': 'wala', 'वाली': 'wali', 'कम': 'kam', 'ज़्यादा': 'zyada', 'जगहें': 'jagahein', 'गुरुवार': 'guruvaar', 'सोमवार': 'somvaar', 'अक्टूबर': 'October', 'नवंबर': 'November',
    'लिए': 'liye', 'किसी': 'kisi', 'करते': 'karte', 'उसके': 'uske', 'चलिए': 'chaliye', 'आराम': 'aaraam', 'किस': 'kis', 'नीचे': 'neeche', 'रहा': 'raha', 'उसका': 'uska', 'जिसका': 'jiska', 'बोल': 'bol', 'होंगी': 'hongi', 'करेंगे': 'karenge', 'हज़ार': 'hazaar', 'एचएसआर': 'HSR', 'बेल्लंदूर': 'Bellandur', 'अगारा': 'Agara', 'कुडलू': 'Kudlu', 'कोरमंगला': 'Koramangala', 'मराठहल्ली': 'Marathahalli'
  };
  const V = { 'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऑ': 'o' };
  const M = { 'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॉ': 'o', 'ं': 'n', 'ँ': 'n', 'ः': 'h' };
  const K = { 'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny', 'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'क़': 'q', 'ख़': 'kh', 'ग़': 'g', 'ज़': 'z', 'ड़': 'r', 'ढ़': 'rh', 'फ़': 'f', 'य़': 'y' };
  const VIRAMA = '्', NUKTA = '़';
  function word(w) {
    if (WORDS[w]) return WORDS[w];
    let out = '', chars = [...w.normalize('NFC')];
    for (let i = 0; i < chars.length; i++) {
      let c = chars[i];
      if (chars[i + 1] === NUKTA) { c = c + NUKTA; i++; }
      if (K[c]) { out += K[c]; const n = chars[i + 1]; if (n === VIRAMA) { i++; continue; } if (n && M[n]) { out += M[n]; i++; continue; } const last = i === chars.length - 1; if (!last) out += 'a'; continue; }
      if (V[c]) { out += V[c]; continue; }
      if (M[c]) { out += M[c]; continue; }
      if (c === VIRAMA) continue;
      out += c;
    }
    return out;
  }
  return { say: text => String(text).replace(/[ऀ-ॣ०-ॿ]+/g, m => word(m)).replace(/।/g, '.').replace(/\s+/g, ' ') };
})();
