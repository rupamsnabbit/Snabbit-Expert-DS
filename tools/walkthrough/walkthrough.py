"""Walkthrough — a Paper page, played on a phone as the app would behave.

    python3 tools/walkthrough/walkthrough.py find  "<page name>"            which Paper file/page has that name
    python3 tools/walkthrough/walkthrough.py init  <project> "<page name>"  start a flow for that page (writes flow.json)
    python3 tools/walkthrough/walkthrough.py pull  <project> <flow>         read the screens from Paper (Paper must be open)
    python3 tools/walkthrough/walkthrough.py report <project> <flow>        per screen: its tappable labels and what behaves
    python3 tools/walkthrough/walkthrough.py check <project> <flow>         taps that miss, screens nothing leads to
    python3 tools/walkthrough/walkthrough.py build <project> <flow>         write index.html next to flow.json
    bash    tools/walkthrough/open.sh <project> <flow>                      serve, boot the emulator, open it

A flow lives in projects/<project>/walkthrough/<flow>/: flow.json (the only file anyone edits), paper/ (the last
pull) and the built page. The screens are Paper's own code; nothing is redrawn. The build removes Paper's drawn
status bar (the phone has one), fits each artboard to the phone (long screens scroll), wires the taps in flow.json,
and makes Paper's drawn controls behave: expandable cards, a card drawn in two layouts, countdowns, code boxes with
a keypad, steppers, single-choice chips, the close ✕. A state Paper never drew is never invented.
"""
import copy, html, json, os, re, struct, sys, urllib.request, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
from jsx2html import parse, to_html, Node

PAPER = "http://127.0.0.1:29979/mcp"   # Paper desktop's local MCP server


# ── Paper ────────────────────────────────────────────────────────────────────────────────────────────
class Paper:
    def __init__(self):
        self.sid, self.i = None, 0
        try:
            self.rpc("initialize", {"protocolVersion": "2025-03-26", "capabilities": {}, "clientInfo": {"name": "walkthrough", "version": "1"}})
        except OSError:
            sys.exit("Paper isn't reachable on 127.0.0.1:29979 — open the Paper desktop app and try again.")
        self._post({"jsonrpc": "2.0", "method": "notifications/initialized"})

    def _post(self, body):
        h = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"}
        if self.sid: h["mcp-session-id"] = self.sid
        req = urllib.request.Request(PAPER, data=json.dumps(body).encode(), headers=h, method="POST")
        with urllib.request.urlopen(req, timeout=120) as r:
            self.sid = self.sid or r.headers.get("mcp-session-id")
            raw = r.read().decode()
        msgs = [json.loads(l[5:]) for l in raw.splitlines() if l.startswith("data:")]
        return msgs[-1] if msgs else (json.loads(raw) if raw.strip().startswith("{") else None)

    def rpc(self, method, params):
        self.i += 1
        return self._post({"jsonrpc": "2.0", "id": self.i, "method": method, "params": params})

    def call(self, name, args):
        r = self.rpc("tools/call", {"name": name, "arguments": args})
        if "error" in r: raise RuntimeError(r["error"])
        if r["result"].get("isError"): raise RuntimeError(r["result"]["content"][0].get("text"))
        return [c["text"] for c in r["result"]["content"] if c.get("type") == "text"][-1]

    def json(self, name, args):
        return json.loads(self.call(name, args))


def find(name):
    """Every page called `name` in the files Paper lists (open first, then recent)."""
    p = Paper()
    files = p.json("list_files", {"limit": 50})
    files = files.get("files", files) if isinstance(files, dict) else files
    hits = []
    for f in files:
        fid = f.get("id") or f.get("fileId")
        try:
            info = p.json("get_basic_info", {"fileId": fid})
        except Exception:
            continue
        for pg in info.get("pages", []):
            if pg["name"].strip().lower() == name.strip().lower():
                hits.append({"file": fid, "file_name": info.get("fileName"), "page": pg["id"], "page_name": pg["name"]})
    return hits


# ── A flow on disk ──────────────────────────────────────────────────────────────────────────────────
def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def flow_dir(project, flow):
    d = os.path.join(ROOT, "projects", project, "walkthrough", flow)
    if not os.path.isdir(os.path.join(ROOT, "projects", project)): sys.exit(f"No project folder projects/{project}/")
    return d


def load(project, flow):
    d = flow_dir(project, flow)
    return d, json.load(open(os.path.join(d, "flow.json")))


def screen_no(name):
    """'2.03a · Enter the code' → '2.03a'. Covers, notes, lane titles and ✕ dropped screens have no number."""
    m = re.match(r"^(\d+\.\d+[a-z]?) · ", name)
    return m and m.group(1)


def order_key(sid):
    a, b = sid.split(".")
    return int(a), int(re.match(r"\d+", b).group()), b.lstrip("0123456789")


def init(project, page_name, file_id=None, page_id=None):
    if not (file_id and page_id):
        hits = find(page_name)
        if len(hits) != 1:
            sys.exit(f"{len(hits)} pages named {page_name!r}: {json.dumps(hits, ensure_ascii=False)} — pass --file and --page")
        file_id, page_id, file_name = hits[0]["file"], hits[0]["page"], hits[0]["file_name"]
    else:
        file_name = None
    d = flow_dir(project, slugify(page_name))
    os.makedirs(d, exist_ok=True)
    path = os.path.join(d, "flow.json")
    if os.path.exists(path): sys.exit(f"{os.path.relpath(path, ROOT)} already exists")
    spec = {"name": page_name, "short_name": page_name[:12],
            "paper": {"file": file_id, "file_name": file_name, "page": page_id, "page_name": page_name},
            "start": None, "taps": {}}
    json.dump(spec, open(path, "w"), indent=2, ensure_ascii=False)
    print(os.path.relpath(path, ROOT))


def pull(project, flow):
    d, spec = load(project, flow)
    src = os.path.join(d, "paper")
    os.makedirs(src, exist_ok=True)
    p = Paper()
    info = p.json("get_basic_info", {"fileId": spec["paper"]["file"], "pageId": spec["paper"]["page"]})
    tokens = p.json("get_tokens", {"fileId": spec["paper"]["file"]})["tokens"]
    boards = sorted((a for a in info["artboards"] if screen_no(a["name"])), key=lambda a: order_key(screen_no(a["name"])))
    for f in os.listdir(src):
        if f.endswith(".jsx"): os.remove(os.path.join(src, f))
    for a in boards:
        with open(os.path.join(src, a["id"] + ".jsx"), "w") as f:
            f.write(p.call("get_jsx", {"fileId": spec["paper"]["file"], "nodeId": a["id"], "format": "inline-styles"}))
    json.dump({"file_name": info.get("fileName"), "tokens": tokens, "artboards": boards},
              open(os.path.join(src, "paper.json"), "w"), indent=1, ensure_ascii=False)
    skipped = [a["name"] for a in info["artboards"] if not screen_no(a["name"])]
    print(f"Pulled {len(boards)} screens from {info.get('fileName')} → {spec['paper']['page_name']}")
    if skipped: print("Not screens (no number, or ✕):", "; ".join(skipped))


def screens(d):
    meta = json.load(open(os.path.join(d, "paper", "paper.json")))
    roots = {}
    for a in meta["artboards"]:
        roots[screen_no(a["name"])] = (a, parse(open(os.path.join(d, "paper", a["id"] + ".jsx")).read()))
    return meta, roots


# ── Reading Paper's tree ────────────────────────────────────────────────────────────────────────────
def px(v):
    m = re.fullmatch(r"(-?[\d.]+)px", str(v or ""))
    return float(m.group(1)) if m else None


def walk(n):
    yield n
    for c in n.children:
        if isinstance(c, Node): yield from walk(c)


def kids(n):
    return [c for c in n.children if isinstance(c, Node)]


def is_leaf(n):
    return bool(n.children) and all(isinstance(c, str) for c in n.children)


def parents_of(root):
    return {c: p for p in walk(root) for c in kids(p)}


def svg_d(n):
    return n.tag == "svg" and " ".join(c.attrs.get("d", "") for c in kids(n))


def find_path(root, path):
    n = root
    for i in path.split("."): n = kids(n)[int(i)]
    return n


def tap_target(n, parents):
    """From a label up to the control around it: the widest ancestor that adds no other text."""
    t = n.text()
    while n in parents and parents[n].text() == t and len(parents[n].children) <= 3:
        n = parents[n]
    return n


def looks_tappable(n):
    s = n.style
    return ("backgroundColor" in s or "borderStyle" in s) and (px(s.get("height")) or 0) >= 40 or \
        (s.get("color", "").startswith("var(--color-brand") and n.text())


# Icon drawings Paper files use for the controls below. Hand-drawn (the Beauty board) and Phosphor regular.
# When a page draws a control with a new icon, add its path here; `report` shows what was found.
CARET = {"m6 9 6 6 6-6", "m6 15 6-6 6 6",
         "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
         "M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z",
         "M208 96 128 176 48 96", "M48 160 128 80 208 160"}
CLOSE = {"M18 6 6 18M6 6l12 12", "M200 56 56 200M200 200 56 56",
         "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}
MINUS = {"M40 128h176", "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"}
PLUS = {"M40 128h176M128 40v176",
        "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"}
TIMER = re.compile(r"\d{1,2}:\d{2}(:\d{2})?")


def is_card(n):
    return "backgroundColor" in n.style and n.style.get("borderRadius") in ("var(--radius-xl)", "var(--radius-lg)") \
        and "padding" in n.style


def caret_cards(root):
    parents, out = parents_of(root), []
    for n in walk(root):
        if svg_d(n) not in CARET: continue
        c, head = n, n
        while c in parents and not is_card(c):
            head, c = c, parents[c]
        if is_card(c) and (c, head) not in out: out.append((c, head))
    return out


def title_of(n):
    return next((m.text() for m in walk(n) if is_leaf(m)), "")


def layout(card):
    return "column" if card.style.get("flexDirection") == "column" else "row"


def keypad(root, parents):
    """The ten digit keys, if the screen draws a keypad: one key per digit, all the same height."""
    by_h = {}
    for n in walk(root):
        if is_leaf(n) and re.fullmatch(r"\d", n.text()):
            k = n                                    # the key is the nearest filled box around the digit
            while "backgroundColor" not in k.style and k in parents and len(kids(parents[k])) == 1:
                k = parents[k]
            by_h.setdefault(k.style.get("height"), {}).setdefault(n.text(), k)
    return next((list(g.values()) for g in by_h.values() if len(g) == 10), [])


def is_status_bar(n):
    return isinstance(n, Node) and 40 <= (px(n.style.get("height")) or 0) <= 60 and \
        re.match(r"\d{1,2}:\d{2}", n.text() or "") and len(n.text()) <= 6


# ── Library: what Paper drew on one screen that another screen needs ────────────────────────────────
def library(roots):
    bodies, drawings = {}, {}
    for sid, (a, root) in roots.items():
        for card, head in caret_cards(root):
            t = title_of(card)
            drawings.setdefault(t, {}).setdefault(layout(card), copy.deepcopy(card))
            if len(kids(card)) > 1 and layout(card) == "column":
                bodies.setdefault(t, copy.deepcopy(kids(card)[1:]))
    swaps = {t: v for t, v in drawings.items() if len(v) == 2}   # one card, drawn as a column and as a row
    return bodies, swaps


# ── One screen ──────────────────────────────────────────────────────────────────────────────────────
def wire(root, taps):
    parents, missing = parents_of(root), []
    for tap, go in taps:
        if tap == "keypad":
            hits = keypad(root, parents)
            for h in hits: h.attrs["data-key"] = h.text()
        elif tap.startswith("@"):
            try: hits = [find_path(root, tap[1:])]
            except (IndexError, ValueError): hits = []
        else:
            leaves = [n for n in walk(root) if n.text() == tap and not any(c.text() == tap for c in kids(n))]
            hits = [tap_target(n, parents) for n in leaves]
        if not hits: missing.append(tap)
        for h in hits: h.attrs["data-go"] = go
    return missing


def behave(root, bodies, swaps):
    parents, found = parents_of(root), {}
    add = lambda k: found.__setitem__(k, found.get(k, 0) + 1)
    swap_ids = {t: i for i, t in enumerate(sorted(swaps))}
    for card, head in caret_cards(root):
        t = title_of(card)
        if t in swaps:                                   # a tap moves between Paper's two drawings of this card
            card.attrs["data-swap"] = str(swap_ids[t]); card.attrs["data-layout"] = layout(card); add("two-drawing card")
            continue
        if len(kids(card)) == 1 and t in bodies:         # drawn closed here, open elsewhere: borrow the body
            for b in copy.deepcopy(bodies[t]):
                b.attrs["hidden"] = ""; card.children.append(b)
        if len(kids(card)) > 1:
            for b in kids(card)[1:]: b.attrs["data-acc-body"] = ""
            head.attrs["data-acc"] = ""; add("expandable card")
            for n in walk(head):
                if svg_d(n) in CARET: n.attrs["data-caret"] = ""
    for n in walk(root):
        d, ks = svg_d(n), kids(n)
        if d in CLOSE and n in parents and "data-go" not in parents[n].attrs:
            parents[n].attrs["data-go"] = "back"; add("close ✕")
        if (d in MINUS or d in PLUS) and n in parents:
            parents[n].attrs["data-step"] = "-1" if d in MINUS else "1"; add("stepper button")
        if is_leaf(n) and TIMER.fullmatch(n.text()) and not is_status_bar(parents.get(n)):
            n.attrs["data-timer"] = n.text(); add("countdown")
        sizes = {(px(k.style.get("width")), px(k.style.get("height"))) for k in ks}
        if 3 <= len(ks) <= 6 and len(sizes) == 1 and all(36 <= (w or 0) <= 64 and 44 <= (h or 0) <= 72 for w, h in sizes) \
                and all(k.style.get("borderStyle") for k in ks):
            n.attrs["data-code"] = ""; add("code boxes")
            for k in ks: k.attrs["data-box"] = ""
        pills = [k for k in ks if k.style.get("borderRadius") == "var(--radius-full)" and 32 <= (px(k.style.get("height")) or 0) <= 48]
        if len(ks) >= 2 and len(pills) == len(ks) and sum(k.style.get("backgroundColor") == "var(--color-brand-subtle)" for k in ks) == 1:
            n.attrs["data-chips"] = ""; add("chip group")
            for k in ks: k.attrs["data-chip"] = "on" if k.style.get("backgroundColor") == "var(--color-brand-subtle)" else ""
    keys = [n for n in walk(root) if "data-key" in n.attrs]
    if keys:
        row = parents[keys[-1]]
        for k in kids(row):
            if "data-key" not in k.attrs and any(m.tag == "svg" for m in walk(k)): k.attrs["data-key"] = "del"
        code = next((n for n in walk(root) if "data-code" in n.attrs), None)
        if code is not None:
            code.attrs["data-done"] = keys[0].attrs.get("data-go", "")
            for k in keys: k.attrs.pop("data-go", None)
            add("keypad types into the boxes")
        else:
            add("keypad (any digit continues)")
    return found


def fit(container, art_h, shift):
    """Fill the phone instead of the artboard; the main column scrolls; overlays keep to their edge."""
    container.style.update(width="100%", height="100%")
    container.style.pop("flexBasis", None)
    ks = kids(container)
    flow = [c for c in ks if c.style.get("position") != "absolute"]
    if len(flow) == 1 and px(flow[0].style.get("height")) == art_h:   # the whole screen drawn as one frame
        fit(flow[0], art_h, shift); flow[0].style["flexShrink"] = "0"
    else:
        grow = [c for c in flow if c.style.get("flexGrow") == "1" or c.style.get("height") == "fit-content"]
        body = grow[0] if grow else max(flow, key=lambda c: len(c.text()), default=None)
        if body is not None:
            body.style.update(flex="1 1 0", minHeight="0", overflowY="auto", overflowX="hidden")
            body.style.pop("height", None); body.attrs["data-scroll"] = ""
    for c in ks:
        if c.style.get("position") != "absolute": continue
        top, h = px(c.style.get("top")), px(c.style.get("height"))
        if top == 0 and h == art_h:
            c.style.update(top="0px", left="0px", width="100%", height="100%"); c.attrs["data-scrim"] = ""
        elif top is not None and h is not None and top > art_h / 2:
            c.style.pop("top"); c.style["bottom"] = f"{art_h - top - h:g}px"
        elif top is not None:
            c.style["top"] = f"{max(top - shift, 0):g}px"
            if top == 0 and h is not None: c.style["height"] = f"{max(h - shift, 0):g}px"
        if c.style.get("bottom") == "0px" and "borderTopLeftRadius" in c.style:
            c.attrs["data-sheet"] = ""; c.style["width"] = "100%"


def prepare(roots, spec):
    """Wire, add behaviour, remove the drawn status bar and fit — every screen. Returns what each screen got."""
    bodies, swaps = library(roots)
    out = {}
    for sid, (a, root) in roots.items():
        missing = wire(root, spec["taps"].get(sid, []))
        found = behave(root, bodies, swaps)
        shift = 0
        for n in list(walk(root)):
            for c in [c for c in n.children if is_status_bar(c)]:
                n.children.remove(c); shift = px(c.style.get("height"))
        fit(root, float(a["height"]), shift)
        root.style.pop("position", None)
        out[sid] = (a, root, missing, found)
    return out, swaps


# ── Commands ────────────────────────────────────────────────────────────────────────────────────────
def report(project, flow):
    """What Claude drafts the taps from: each screen's tappable labels, icon-only controls, sheet, behaviour."""
    d, spec = load(project, flow)
    meta, roots = screens(d)
    raw = {sid: copy.deepcopy(r) for sid, (a, r) in roots.items()}
    prepared, _ = prepare(roots, spec)
    for sid, (a, root, missing, found) in prepared.items():
        r = raw[sid]; parents = parents_of(r)
        labels = []
        for n in walk(r):
            if is_leaf(n) and not TIMER.fullmatch(n.text()) and not re.fullmatch(r"\d", n.text()):
                up, k = [n], n
                while k in parents and len(up) < 4: k = parents[k]; up.append(k)
                if any(looks_tappable(u) for u in up if u.text() == n.text()) or looks_tappable(n): labels.append(n.text())
        icons = [p for p in paths(r) if p[1]]
        sheet = any("data-sheet" in n.attrs for n in walk(root))
        print(f"\n{sid} · {a['name'].split(' · ', 1)[1]}{'  [sheet over a screen]' if sheet else ''}")
        print("   labels:", " | ".join(dict.fromkeys(labels)) or "—")
        if icons: print("   icon-only controls:", " | ".join(f"@{p} {s}" for p, s in icons))
        if found: print("   behaves:", ", ".join(f"{k} ×{v}" if v > 1 else k for k, v in found.items()))
        if spec["taps"].get(sid): print("   taps:", "; ".join(f"{t} → {g}" for t, g in spec["taps"][sid]))
        if missing: print("   MISSING:", ", ".join(missing))


def paths(root, pre=""):
    """Icon-only controls (a box of 32–72 with just an svg), by child path, so a flow can point at them with @path."""
    out = []
    for i, c in enumerate(kids(root)):
        p = f"{pre}.{i}" if pre else str(i)
        w, h = px(c.style.get("width")), px(c.style.get("height"))
        if w and h and 32 <= w <= 72 and 32 <= h <= 72 and not c.text() and any(m.tag == "svg" for m in walk(c)):
            out.append((p, f"{w:g}×{h:g}"))
        else:
            out += paths(c, p)
    return out


def check(project, flow):
    d, spec = load(project, flow)
    meta, roots = screens(d)
    prepared, _ = prepare(roots, spec)
    ids = set(prepared)
    into = {g for taps in spec["taps"].values() for _, g in taps}
    problems = []
    if spec.get("start") not in ids: problems.append(f"start {spec.get('start')!r} is not a screen")
    for sid, taps in spec["taps"].items():
        if sid not in ids: problems.append(f"{sid}: in flow.json but not on the Paper page any more")
        for t, g in taps:
            if g not in ids | {"back", "dismiss"}: problems.append(f"{sid}: {t!r} goes to {g!r}, which is not a screen")
    for sid, (a, root, missing, found) in prepared.items():
        if missing: problems.append(f"{sid}: can't find {', '.join(map(repr, missing))} on the screen")
        if sid not in into and sid != spec.get("start"): problems.append(f"{sid}: nothing leads here (reachable from the screen list only)")
        if sid not in spec["taps"]: problems.append(f"{sid}: no taps listed yet")
    print("\n".join(problems) if problems else "Every tap lands and every screen has a way in.")
    return problems


def build(project, flow):
    d, spec = load(project, flow)
    meta, roots = screens(d)
    prepared, swaps = prepare(roots, spec)
    sections = []
    for sid, (a, root, missing, found) in prepared.items():
        title = a["name"].split(" · ", 1)[1]
        bg = root.style.get("backgroundColor", "var(--color-bg)")
        sections.append(f'<section class="screen" data-id="{sid}" data-title="{html.escape(title)}" data-bg="{html.escape(bg)}" hidden>'
                        f'{to_html(root)}</section>')
    ids = {t: i for i, t in enumerate(sorted(swaps))}
    templates = "".join(f'<template id="swap-{ids[t]}-{lay}">{to_html(card)}</template>'
                        for t, v in swaps.items() for lay, card in v.items())
    tokens = "\n".join(f"  {t['name']}: {t['value']};" for t in meta["tokens"])
    tpl = open(os.path.join(HERE, "shell.html")).read()
    start = spec.get("start") or next(iter(prepared))
    page = (tpl.replace("/*TOKENS*/", tokens).replace("<!--SCREENS-->", "\n".join(sections) + templates)
               .replace("__TITLE__", html.escape(spec["name"])).replace("__START__", start))
    open(os.path.join(d, "index.html"), "w").write(page)
    json.dump({"name": spec["name"], "short_name": spec.get("short_name", spec["name"][:12]),
               "start_url": f"./index.html#{start}", "scope": "./", "display": "standalone", "orientation": "portrait",
               "background_color": "#FFFFFF", "theme_color": "#FFFFFF",
               "icons": [{"src": f"icon-{s}.png", "sizes": f"{s}x{s}", "type": "image/png"} for s in (192, 512)]},
              open(os.path.join(d, "manifest.webmanifest"), "w"), indent=2, ensure_ascii=False)
    icons(d)
    print(f"Built {os.path.relpath(os.path.join(d, 'index.html'), ROOT)} · {len(sections)} screens")
    return prepared


def icons(d):
    """Home-screen icon: brand pink with a white disc, written without dependencies."""
    for size in (192, 512):
        path = os.path.join(d, f"icon-{size}.png")
        if os.path.exists(path): continue
        c, r = size / 2, size * 0.22
        rows = b"".join(bytes([0]) + b"".join(bytes((255, 255, 255)) if (x - c) ** 2 + (y - c) ** 2 < r * r
                                               else bytes((0xF7, 0x0F, 0x79)) for x in range(size)) for y in range(size))
        chunk = lambda t, data: struct.pack(">I", len(data)) + t + data + struct.pack(">I", zlib.crc32(t + data) & 0xFFFFFFFF)
        open(path, "wb").write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
                               + chunk(b"IDAT", zlib.compress(rows, 9)) + chunk(b"IEND", b""))


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args: sys.exit(__doc__)
    cmd, rest = args[0], args[1:]
    opt = lambda k: rest[rest.index(k) + 1] if k in rest else None
    if cmd == "find": print(json.dumps(find(rest[0]), indent=2, ensure_ascii=False))
    elif cmd == "init": init(rest[0], rest[1], opt("--file"), opt("--page"))
    elif cmd == "pull": pull(*rest[:2])
    elif cmd == "report": report(*rest[:2])
    elif cmd == "check": sys.exit(1 if check(*rest[:2]) else 0)
    elif cmd == "build": build(*rest[:2])
    else: sys.exit(__doc__)
