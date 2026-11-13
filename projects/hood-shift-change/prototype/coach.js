/* Spotlight · the Coachmark as Figma V3 draws it (436:15527, "first time when u come to profile, highlight this section").
   The scrim (gray-900 at 50 %) dims everything; the target's card section stays lit (radius 16) and live. Saathi's pointing face sits beside a
   white speech bubble (pink-200 edge, pink drop) holding one sentence; Saathi says it once, 300 ms after the spotlight settles.
   The frame has no "Hear again" and no "Got it": she leaves by tapping the lit row (it does the real thing) or anywhere else (it closes).
   Motion: scrim, bubble and face enter over motion.standard (200) and leave over motion.fast (100); reduced motion has no scale. */
window.Coach = (() => {
  const K = {};
  let cur = null;
  const stage = () => document.getElementById('stage');

  K.show = ({ target, text, line, onDo, onDone }) => {
    K.hide(true);
    const st = stage(); if (!target || !st) return;
    const box = st.getBoundingClientRect(), scale = box.width / st.offsetWidth;
    const local = r => ({ left: (r.left - box.left) / scale, top: (r.top - box.top) / scale, width: r.width / scale, height: r.height / scale });
    const t = local(target.getBoundingClientRect());
    const card = target.closest('.pcard'), c = card ? local(card.getBoundingClientRect()) : { left: t.left - 20, width: t.width + 40 };
    const hole = { left: c.left, width: c.width, top: t.top - 18, height: t.height + 36 };   // Figma: the card's width, 60 tall around the 24 row
    const above = hole.top > 170;                                                            // room above for the face and the bubble (Figma), else below
    const faceTop = above ? hole.top - 97 : hole.top + hole.height + 33;
    const bubTop = above ? hole.top - 150 : hole.top + hole.height + 12;
    const el = document.createElement('div');
    el.className = 'coach';
    el.innerHTML = `
      <div class="coach-hole" style="left:${hole.left}px;top:${hole.top}px;width:${hole.width}px;height:${hole.height}px"></div>
      <div class="coach-face" style="top:${faceTop}px"></div>
      <div class="coach-bubble ${above ? 'above' : 'below'}" role="dialog" aria-modal="true" aria-label="${text}" style="top:${bubTop}px">
        <img class="coach-shape" src="assets/home/bubble.svg" alt=""><div class="coach-text">${text}</div>
      </div>`;
    st.appendChild(el);
    const inHole = (x, y) => { const p = { x: (x - box.left) / scale, y: (y - box.top) / scale }; return p.x >= hole.left && p.x <= hole.left + hole.width && p.y >= hole.top && p.y <= hole.top + hole.height; };
    el.addEventListener('click', e => {
      e.stopPropagation();
      const lit = inHole(e.clientX, e.clientY);
      K.hide(); if (onDone) onDone(); if (lit && onDo) onDo();                // the lit row does the real thing; anywhere else just closes
    });
    cur = { el, onDone };
    void el.offsetWidth; setTimeout(() => el.classList.add('in'), 16);       // next frame: the scrim, face and bubble ease in
    const face = el.querySelector('.coach-face');
    App.after(200 + 300, async () => { if (cur && cur.el === el) { face.classList.add('talk'); try { await App.say(line); } finally { face.classList.remove('talk'); } } });   // settle, then Saathi speaks once
  };

  K.hide = (now = false) => {
    if (!cur) return; const { el } = cur; cur = null; Voice.cancel();
    if (now) { el.remove(); return; }
    el.classList.remove('in'); el.classList.add('out'); setTimeout(() => el.remove(), 100);
  };
  K.open = () => !!cur;
  return K;
})();
