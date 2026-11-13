// Figma frame → Paper-style inline-styles JSX for tools/walkthrough (a flow with "source": "figma").
// Run through the Figma connector's use_figma with __ID__ = the frame id and __OFF__ = 0, 44000, 88000 … until END = TOTAL.
// Returns: "ASSETS {file: {nodeId, w, h}}" · "SIZE WxH" · "TOTAL n OFF a END b" · then that page of the JSX.
// Pictures (image fills, illustrations, banners) and icons become assets/<file>.png — fetch each with get_screenshot
// (contentsOnly) — so the JSX stays small; identical icons and photos share one file. Read-only: nothing is changed.
const FRAME_ID = '__ID__';
const OFF = Number('__OFF__') || 0, PAGE = 44000;
const root = await figma.getNodeByIdAsync(FRAME_ID);
for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold']) { try { await figma.loadFontAsync({ family: 'Outfit', style: s }); } catch (e) {} }
const r2 = v => Math.round(v * 100) / 100;
const px = v => `${r2(v)}px`;
const hex = x => Math.round(x * 255).toString(16).padStart(2, '0');
const rgba = (c, o = 1) => { const a = r2((c.a ?? 1) * o); return a >= 1 ? `#${hex(c.r)}${hex(c.g)}${hex(c.b)}` : `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
const WEIGHT = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, 'Semi Bold': 600, Bold: 700, ExtraBold: 800, Black: 900 };
const vis = n => n.visible !== false && !n.isMask;
const mixed = v => v === figma.mixed;
function solidOf(fills) { if (!fills || mixed(fills)) return null; const f = [...fills].reverse().find(f => f.visible !== false && f.type === 'SOLID'); return f ? rgba(f.color, f.opacity ?? 1) : null; }
function gradOf(fills) { if (!fills || mixed(fills)) return null; const g = [...fills].reverse().find(f => f.visible !== false && f.type === 'GRADIENT_LINEAR'); if (!g) return null;
  const t = g.gradientTransform, ang = Math.round(Math.atan2(t[1][0], t[0][0]) * 180 / Math.PI) + 90;
  return `linear-gradient(${ang}deg, ${g.gradientStops.map(s => `${rgba(s.color, g.opacity ?? 1)} ${Math.round(s.position * 100)}%`).join(', ')})`; }
const imageFill = n => 'fills' in n && !mixed(n.fills) ? (n.fills || []).find(f => f.visible !== false && f.type === 'IMAGE') : null;
const VEC = new Set(['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON', 'LINE', 'ELLIPSE', 'RECTANGLE']);
const kidsOf = n => 'children' in n ? n.children.filter(vis) : [];
function onlyVectors(n) { const k = kidsOf(n); if (!('children' in n)) return VEC.has(n.type) && !imageFill(n); return k.length > 0 && k.every(onlyVectors); }
function anyText(n) { return n.type === 'TEXT' || kidsOf(n).some(anyText); }
function anyImage(n) { return !!imageFill(n) || kidsOf(n).some(anyImage); }
function isPicture(n) {
  if (n.type === 'TEXT') return false;
  if (imageFill(n) && !kidsOf(n).length) return true;                                     // a photo, the money bag
  if (/^(Orb|Illustration|image\/|Component \/ Home Indicator)/i.test(n.name)) return true;
  if (kidsOf(n).length && !anyText(n) && anyImage(n)) return true;                        // an illustration: layers + images
  if (kidsOf(n).length && !anyText(n) && !onlyVectors(n) && n.width * n.height > 64 * 64) return true;
  return false;
}
const isIcon = n => (kidsOf(n).length && onlyVectors(n) && n.width <= 72 && n.height <= 72) || (!('children' in n) && ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON'].includes(n.type));
const ASSETS = {};
function asset(file, n) { if (!ASSETS[file]) ASSETS[file] = { nodeId: n.id, w: Math.round(n.width), h: Math.round(n.height) }; return `assets/${file}`; }
const safe = s => s.replace(/[^\w]+/g, '-');
async function picture(n) { const f = imageFill(n);
  return asset(f && !kidsOf(n).length ? `img-${f.imageHash.slice(0, 12)}-${Math.round(n.width)}x${Math.round(n.height)}.png` : `node-${safe(n.id)}.png`, n); }
async function icon(n) { let key = n.id;
  if (n.type === 'INSTANCE') { const m = await n.getMainComponentAsync(); const v = n.findAll(x => 'fills' in x && !mixed(x.fills) && (x.fills || []).length)[0];
    key = `${m ? m.id : n.id}-${Math.round(n.width)}x${Math.round(n.height)}-${v ? solidOf(v.fills) : ''}`; }
  return asset(`ic-${safe(key)}.png`, n); }
function st(o) { const e = Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '');
  return e.length ? ` style={{ ${e.map(([k, v]) => `${k}: '${String(v).replace(/'/g, "\\'")}'`).join(', ')} }}` : ''; }
function box(n, parent, style, dy = 0) {
  const pAuto = parent && parent.layoutMode && parent.layoutMode !== 'NONE';
  if (parent && (!pAuto || n.layoutPositioning === 'ABSOLUTE')) {
    // a group has no coordinate space of its own: its children are placed relative to the group's parent
    const gx = parent.type === 'GROUP' ? parent.x : 0, gy = parent.type === 'GROUP' ? parent.y : 0;
    let lx = n.x - gx, ty = n.y - gy;
    if (n.rotation && n.absoluteBoundingBox && parent.absoluteBoundingBox) {   // rotated or flipped: where it is drawn, not its origin
      lx = n.absoluteBoundingBox.x - parent.absoluteBoundingBox.x; ty = n.absoluteBoundingBox.y - parent.absoluteBoundingBox.y; }
    Object.assign(style, { position: 'absolute', left: px(lx), top: px(ty - dy), width: px(n.width), height: px(n.height) });
    if (parent.type !== 'GROUP' && Math.abs(n.y + n.height - parent.height) < 1 && n.y > 0 && n.width >= parent.width - 1) { delete style.top; style.bottom = '0px'; }
  } else if (pAuto) {
    const row = parent.layoutMode === 'HORIZONTAL', main = row ? n.layoutSizingHorizontal : n.layoutSizingVertical, cross = row ? n.layoutSizingVertical : n.layoutSizingHorizontal;
    if (main === 'FILL') Object.assign(style, { flexGrow: '1', flexBasis: '0px', [row ? 'minWidth' : 'minHeight']: '0px' });
    else { style.flexShrink = '0'; if (main === 'FIXED') style[row ? 'width' : 'height'] = px(row ? n.width : n.height); }
    if (cross === 'FILL') style.alignSelf = 'stretch'; else if (cross === 'FIXED') style[row ? 'height' : 'width'] = px(row ? n.height : n.width);
  } else { style.width = px(n.width); style.height = px(n.height); }
  if (n.opacity !== undefined && n.opacity < 1) style.opacity = String(r2(n.opacity));
}
function paint(n, style) {
  const g = gradOf(n.fills), s = solidOf(n.fills); if (g) style.backgroundImage = g; else if (s) style.backgroundColor = s;
  if ('strokes' in n && (n.strokes || []).some(x => x.visible !== false)) { const c = solidOf(n.strokes);
    if (c) { style.borderColor = c; style.borderStyle = 'solid';
      if (!mixed(n.strokeWeight)) style.borderWidth = px(n.strokeWeight);
      else Object.assign(style, { borderTopWidth: px(n.strokeTopWeight), borderRightWidth: px(n.strokeRightWeight), borderBottomWidth: px(n.strokeBottomWeight), borderLeftWidth: px(n.strokeLeftWeight) }); } }
  if ('topLeftRadius' in n) { const r = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius];
    if (r.some(x => x > 0)) Object.assign(style, { borderTopLeftRadius: px(r[0]), borderTopRightRadius: px(r[1]), borderBottomRightRadius: px(r[2]), borderBottomLeftRadius: px(r[3]) }); }
  if (n.type === 'ELLIPSE') style.borderRadius = '50%';
  const sh = ('effects' in n ? n.effects : []).filter(e => e.visible !== false && e.type === 'DROP_SHADOW');
  if (sh.length) style.boxShadow = sh.map(e => `${px(e.offset.x)} ${px(e.offset.y)} ${px(e.radius)} ${px(e.spread || 0)} ${rgba(e.color)}`).join(', ');
  if (n.clipsContent) style.overflow = 'hidden';
  style.boxSizing = 'border-box';
}
function layout(n, style) {
  style.position = style.position || 'relative';
  if (!n.layoutMode || n.layoutMode === 'NONE') return;
  const row = n.layoutMode === 'HORIZONTAL', A = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', SPACE_BETWEEN: 'space-between', BASELINE: 'baseline' };
  Object.assign(style, { display: 'flex', flexDirection: row ? 'row' : 'column', justifyContent: A[n.primaryAxisAlignItems], alignItems: A[n.counterAxisAlignItems] || 'flex-start',
    gap: n.itemSpacing > 0 && n.primaryAxisAlignItems !== 'SPACE_BETWEEN' ? px(n.itemSpacing) : undefined,
    paddingTop: n.paddingTop ? px(n.paddingTop) : undefined, paddingRight: n.paddingRight ? px(n.paddingRight) : undefined,
    paddingBottom: n.paddingBottom ? px(n.paddingBottom) : undefined, paddingLeft: n.paddingLeft ? px(n.paddingLeft) : undefined,
    flexWrap: n.layoutWrap === 'WRAP' ? 'wrap' : undefined });
}
const SEG = ['fontSize', 'fontName', 'fills', 'lineHeight', 'letterSpacing'];
function textStyle(t) {     // t: a text node or one of its styled segments
  const fn = t.fontName, lh = t.lineHeight, ls = t.letterSpacing;
  const o = { fontFamily: `"${fn.family}", system-ui, sans-serif`, fontSize: px(t.fontSize), fontWeight: String(WEIGHT[fn.style.replace(' Italic', '')] || 400), color: solidOf(t.fills) || '#000000' };
  if (lh && lh.unit === 'PIXELS') o.lineHeight = px(lh.value); else if (lh && lh.unit === 'PERCENT') o.lineHeight = `${r2(lh.value)}%`;
  if (ls && ls.value) o.letterSpacing = ls.unit === 'PERCENT' ? `${r2(ls.value / 100)}em` : px(ls.value);
  return o;
}
async function node(n, parent, ind, dy = 0) {
  if (!vis(n)) return '';
  const I = '  '.repeat(ind), style = {}; box(n, parent, style, dy);
  if (parent && parent.itemSpacing < 0 && parent.layoutMode && parent.layoutMode !== 'NONE' && n.layoutPositioning !== 'ABSOLUTE' && kidsOf(parent).indexOf(n) > 0)
    style[parent.layoutMode === 'HORIZONTAL' ? 'marginLeft' : 'marginTop'] = px(parent.itemSpacing);   // Figma's negative spacing: an overlap
  if (n.type === 'TEXT') {
    const segs = n.getStyledTextSegments(SEG);
    Object.assign(style, textStyle(segs[0]), { textAlign: { CENTER: 'center', RIGHT: 'right', JUSTIFIED: 'justify' }[n.textAlignHorizontal] });
    if (n.textAutoResize === 'WIDTH_AND_HEIGHT') style.whiteSpace = 'nowrap';
    const text = s => esc(s.replace(/\n/g, ' '));
    if (segs.length <= 1) return `${I}<div${st(style)}>${text(n.characters)}</div>\n`;
    return `${I}<div${st(style)}>${segs.map(s => `<span${st(textStyle(s))}>${text(s.characters)}</span>`).join('')}</div>\n`;
  }
  if (isPicture(n) || isIcon(n)) { let src;
    try { src = isIcon(n) && !isPicture(n) ? await icon(n) : await picture(n); } catch (e) { return `${I}<div${st(style)} />\n`; }
    if (!style.width && !style.flexGrow) style.width = px(n.width);
    if (!style.height && !style.alignSelf) style.height = px(n.height);
    return `${I}<img src="${src}"${st(Object.assign(style, { display: 'block', flexShrink: '0' }))} />\n`; }
  if (n.type === 'LINE') { Object.assign(style, { borderTop: `${px(n.strokeWeight || 1)} solid ${solidOf(n.strokes) || '#EAECF0'}`, height: '0px' }); return `${I}<div${st(style)} />\n`; }
  paint(n, style);
  if (!kidsOf(n).length) {      // a plain shape (a scrim): its opacity goes into its colour, so a fade-in can't override it
    if (style.opacity && /^#[0-9a-f]{6}$/i.test(style.backgroundColor || '')) { const h = style.backgroundColor;
      style.backgroundColor = `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${style.opacity})`; delete style.opacity; }
    return `${I}<div${st(style)} />\n`; }
  layout(n, style);
  // a centred box that fills its row: Figma lets wide side padding be ignored, the browser doesn't
  if (style.flexGrow === '1' && n.primaryAxisAlignItems === 'CENTER' && n.paddingLeft === n.paddingRight && n.paddingLeft >= 24) { delete style.paddingLeft; delete style.paddingRight; }
  let out = `${I}<div${st(style)}>\n`;
  for (const c of n.children) out += await node(c, n, ind + 1);
  return out + `${I}</div>\n`;
}
// The phone draws its own status bar: drop Figma's (a strip at the top holding the clock) and lift the rest.
const isClock = t => t.type === 'TEXT' && /^\d{1,2}:\d{2}$/.test(t.characters.trim());
const top = kidsOf(root);
const bar = top.find(c => c.y < 2 && c.height <= 60 && c.width >= root.width - 1 && (isClock(c) || ('findOne' in c && c.findOne(isClock))));
const shift = bar ? bar.height : 0, H = root.height - shift;
const rs = { position: 'relative', width: px(root.width), height: px(H), overflow: 'hidden' };
paint(root, rs); ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'overflow'].forEach(k => delete rs[k]); rs.overflow = 'hidden';
let body = '';
if (root.layoutMode && root.layoutMode !== 'NONE') {
  layout(root, rs);
  for (const c of root.children) if (c !== bar) body += await node(c, root, 1);
} else {
  // An absolute screen: its content goes in one column that can scroll; a full-screen scrim and a bottom sheet stay overlays.
  // A scrim is an empty full-screen rectangle; everything drawn after it (a sheet, a coachmark's lit card, bubble and
  // Saathi) sits on top of it, so it stays an overlay too. A full-screen frame WITH content is the screen itself.
  const isScrim = c => c.x <= 1 && c.y <= shift + 1 && c.width >= root.width - 1 && c.height >= H - 2 && !kidsOf(c).length;
  const firstScrim = root.children.findIndex(c => vis(c) && isScrim(c));
  const isSheet = c => Math.abs(c.y + c.height - root.height) < 2 && c.y > root.height / 3 && c.width >= root.width - 1 && 'topLeftRadius' in c && c.topLeftRadius > 0;
  const overlay = c => isScrim(c) || isSheet(c) || (firstScrim >= 0 && root.children.indexOf(c) > firstScrim);
  Object.assign(rs, { display: 'flex', flexDirection: 'column' });
  const sheetParent = { layoutMode: 'NONE', height: root.height, width: root.width }, contentParent = { layoutMode: 'NONE', height: 1e6, width: root.width };
  let inner = '';
  for (const c of root.children) if (c !== bar && vis(c) && !overlay(c)) inner += await node(c, contentParent, 2, shift);
  body += `  <div style={{ flexGrow: '1', position: 'relative', minHeight: '0px' }}>\n    <div style={{ position: 'relative', width: '100%', height: '${px(H)}' }}>\n${inner}    </div>\n  </div>\n`;
  for (const c of root.children) {
    if (c === bar || !vis(c) || !overlay(c)) continue;
    let s = await node(c, sheetParent, 1);
    if (isScrim(c)) s = s.replace(`top: '${px(c.y)}'`, `top: '0px'`).replace(`height: '${px(c.height)}'`, `height: '${px(H)}'`);
    else if (!isSheet(c)) s = s.replace(`top: '${px(c.y)}'`, `top: '${px(c.y - shift)}'`);
    body += s;
  }
}
const jsx = `(\n<div${st(rs)}>\n${body}</div>\n)`;
return `ASSETS ${JSON.stringify(ASSETS)}\nSIZE ${root.width}x${H}\nTOTAL ${jsx.length} OFF ${OFF} END ${Math.min(OFF + PAGE, jsx.length)}\n` + jsx.slice(OFF, OFF + PAGE);
