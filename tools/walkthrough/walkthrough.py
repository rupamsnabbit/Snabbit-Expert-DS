"""Walkthrough — a Paper page, played on a phone as the app would behave.

    python3 tools/walkthrough/walkthrough.py find  "<page name>"            which Paper file/page has that name
    python3 tools/walkthrough/walkthrough.py init  <project> "<page name>"  start a flow for that page (writes flow.json)
    python3 tools/walkthrough/walkthrough.py pull  <project> <flow>         read the screens from Paper (Paper must be open)
    python3 tools/walkthrough/walkthrough.py report <project> <flow>        per screen: its tappable labels and what behaves
    python3 tools/walkthrough/walkthrough.py check <project> <flow>         taps that miss, screens nothing leads to
    python3 tools/walkthrough/walkthrough.py build <project> <flow>         write index.html next to flow.json
    bash    tools/walkthrough/open.sh <project> <flow>                      serve, boot the emulator, open it

A flow can also be read straight from Figma (flow.json "source": "figma"): tools/walkthrough/fig2jsx.js, run through the
Figma connector's use_figma per frame, turns a Figma frame into the same inline-styles JSX — auto layout as flex,
absolute frames as positioned boxes, Figma's status bar dropped, bottom sheets pinned to the bottom, small icons as
inline SVG, pictures as assets/*.png fetched with get_screenshot.

A flow lives in projects/<project>/walkthrough/<flow>/: flow.json (the only file anyone edits), paper/ (the last
pull) and the built page. Screens are artboards named "N.NN · title"; on a page whose artboards carry other names,
flow.json "numbers" maps artboard id → screen number, so Paper is never renamed. The screens are Paper's own code; nothing is redrawn. The build removes Paper's drawn
status bar (the phone has one), fits each artboard to the phone (long screens scroll), wires the taps in flow.json,
and makes Paper's drawn controls behave as they do in the app (it is the app, not a prototype of linked screens):
search fields take the phone's keyboard, keypads type, chips and SelectionCards select, steppers count, cards expand,
countdowns run, toasts come and go, sheets close by ✕ / scrim / drag where bottom-sheet.md allows, back arrows and the
phone's back go back, in-flight screens finish by themselves. A shift ring (24 h, noon at the top) and a 12-hour
shift clock follow the time she picks, and what she picks carries to the other screens of the same lane (the same
first number) — the confirm, the saved screen, the toast. flow.json "lists" gives a picker's rows per chip (her
realistic options for 4, 6, 8 … hrs); a "chip:<text>" step (spaces as _) picks that chip on arrival. Apart from
those, a state Paper never drew is never invented.
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
    """'2.03a · Enter the code' or '1.6L Near me' → '2.03a' / '1.6L'. Covers, notes, lane titles and ✕ dropped
    screens have no number."""
    m = re.match(r"^(\d+\.\d+[a-zA-Z]?)(?: · |\s+)\S", name)
    return m and m.group(1)


def screen_title(name):
    """The name without its number: '2.03a · Enter the code' → 'Enter the code', '1.6L Near me' → 'Near me'."""
    return re.sub(r"^\d+\.\d+[a-zA-Z]?(?: · |\s+)", "", name)


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
    if spec.get("source") == "figma":                # screens come straight from Figma, not Paper
        sys.exit("This flow is read from Figma: run tools/walkthrough/fig2jsx.js through use_figma for each frame in "
                 "paper/paper.json (\"figma\" ids), write the JSX to paper/<id>.jsx and the listed pictures to assets/ "
                 "(get_screenshot, contentsOnly). Then check and build as usual.")
    src = os.path.join(d, "paper")
    os.makedirs(src, exist_ok=True)
    p = Paper()
    info = p.json("get_basic_info", {"fileId": spec["paper"]["file"], "pageId": spec["paper"]["page"]})
    tokens = p.json("get_tokens", {"fileId": spec["paper"]["file"]})["tokens"]
    for a in info["artboards"]:                     # a page whose artboards aren't numbered (E1, E3a …): flow.json
        no = spec.get("numbers", {}).get(a["id"])    # "numbers" gives each artboard id its screen number; Paper is
        if no: a["name"] = f'{no} · {a["name"]}'     # never renamed
    boards = sorted((a for a in info["artboards"] if screen_no(a["name"])), key=lambda a: order_key(screen_no(a["name"])))
    for f in os.listdir(src):
        if f.endswith(".jsx"): os.remove(os.path.join(src, f))
    for a in boards:
        with open(os.path.join(src, a["id"] + ".jsx"), "w") as f:
            f.write(p.call("get_jsx", {"fileId": spec["paper"]["file"], "nodeId": a["id"], "format": "inline-styles"}))
    json.dump({"file_name": info.get("fileName"), "tokens": tokens, "artboards": boards},
              open(os.path.join(src, "paper.json"), "w"), indent=1, ensure_ascii=False)
    seen = {}
    for a in boards: seen.setdefault(screen_no(a["name"]), []).append(a["name"])
    for no, names in seen.items():
        if len(names) > 1: print(f"Two screens numbered {no}: {' / '.join(names)} — only the last is used; renumber one in Paper")
    skipped = [a["name"] for a in info["artboards"] if not screen_no(a["name"])]
    print(f"Pulled {len(boards)} screens from {info.get('fileName')} → {spec['paper']['page_name']}")
    if skipped: print("Not screens (no number, or ✕):", "; ".join(skipped))


def screens(d):
    meta = json.load(open(os.path.join(d, "paper", "paper.json")))
    TOKENS.update({t["name"]: t["value"] for t in meta["tokens"]})
    roots = {}
    for a in meta["artboards"]:
        f = os.path.join(d, "paper", a["id"] + ".jsx")
        if not os.path.exists(f): print(f"Not pulled yet, left out: {a['name']}"); continue
        roots[screen_no(a["name"])] = (a, parse(open(f).read()))
    return meta, roots


# ── Reading Paper's tree ────────────────────────────────────────────────────────────────────────────
TOKENS = {}   # the Paper file's tokens, so a size written as var(--spacing-touch-min) reads as 48


def px(v):
    v = str(v or "").strip()
    for _ in range(4):                                 # var(--a) → var(--b) → 48px
        m = re.fullmatch(r"var\((--[\w-]+)\)", v)
        if not m or m.group(1) not in TOKENS: break
        v = str(TOKENS[m.group(1)]).strip()
    m = re.fullmatch(r"(-?[\d.]+)px", v)
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
BACK = {"M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z",   # caret-left
        "M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"}  # arrow-left
SEARCH = {"M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"}  # magnifying-glass
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
    if not (isinstance(n, Node) and re.match(r"\d{1,2}:\d{2}", n.text() or "") and len(n.text()) <= 6): return False
    drawn = any(m.tag == "svg" and m.attrs.get("viewBox") == "0 0 82 22" for m in walk(n))   # Paper's mobile status bar
    return 40 <= (px(n.style.get("height")) or 0) <= 60 or (drawn and not px(n.style.get("height")))


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
    for tap, go, *when in taps:
        if tap == "keypad":
            hits = keypad(root, parents)
            for h in hits: h.attrs["data-key"] = h.text()
        elif tap.startswith("@"):
            try: hits = [find_path(root, tap[1:])]
            except (IndexError, ValueError): hits = []
        else:
            label, nth = (re.match(r"^(.*)#(\d+)$", tap).groups() if re.match(r"^.*#\d+$", tap) else (tap, None))
            leaves = [n for n in walk(root) if n.text() == label and not any(c.text() == label for c in kids(n))]
            hits = [tap_target(n, parents) for n in leaves]
            if nth: hits = hits[int(nth) - 1:int(nth)]          # "Show map#3": the third one on the screen
        if not hits: missing.append(tap)
        for h in hits:
            h.attrs["data-go"] = go
            if when: h.attrs["data-when"] = json.dumps(when[0], ensure_ascii=False)
    return missing


def intro(root, cfg):
    """flow.json "intro": the screen arrives without a line Paper drew ("row"), the line slides in, the amounts count
    from where they were ("count": [[@path, from], …]) to what Paper drew, and party poppers go off ("confetti").
    Paper's drawing is always the end state; the intro only builds up to it."""
    if not cfg: return []
    missing = []
    def at(p):
        try: return find_path(root, p[1:])
        except (IndexError, ValueError): missing.append(p)
    if cfg.get("row"):
        r = at(cfg["row"])
        if r is not None: r.attrs["data-intro-row"] = ""
    for p, start in cfg.get("count", []):
        n = at(p)
        if n is not None: n.attrs["data-count-from"] = str(start)
    return missing


def behave(root, bodies, swaps):
    parents, found = parents_of(root), {}
    add = lambda k: found.__setitem__(k, found.get(k, 0) + 1)
    has_keypad = bool(keypad(root, parents))             # code boxes only exist beside a keypad (a row of round photos is not one)
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
        if d in BACK and n in parents and "data-go" not in parents[n].attrs:
            parents[n].attrs["data-go"] = "back"; add("back arrow")
        if is_ring(n):                                       # a shift ring (24 h, noon at the top): it follows the chosen time
            n.attrs["data-ring"] = ""; add("shift ring")
            for k in (kids(parents[n]) if n in parents else []):
                if k is not n and k.style.get("position") != "absolute" and k.text(): k.attrs["data-ring-label"] = ""
        if is_clock(n):                                      # a 12-hour shift clock: a pink wedge is a time she may pick
            wedge = next(k for k in ks if is_wedge(k))
            n.attrs["data-clock"] = "now" if "gray" in wedge.attrs.get("fill", "") else "new"; add("shift clock")
        cards = [k for k in ks if is_radio_card(k)]          # SelectionCards with a Radio: single choice
        if len(cards) >= 2 and sum(radio_on(radio_of(k)) for k in cards) <= 1:
            n.attrs["data-picks"] = ""; add("single-choice cards")
            for k in cards:
                k.attrs["data-pick"] = "on" if radio_on(radio_of(k)) else ""; radio_of(k).attrs["data-radio"] = ""
        if any(svg_d(k) in SEARCH for k in ks) and n.style.get("borderRadius") and \
                not str(n.style.get("backgroundColor", "")).startswith("var(--color-interactive"):
            text = next((k for k in ks if is_leaf(k)), None)          # a drawn search field: she types into it
            if text is not None:
                placeholder = "tertiary" in str(text.style.get("color", ""))     # drawn grey = empty field
                text.attrs["data-input"] = "placeholder" if placeholder else "value"
                text.attrs["data-drawn"] = text.text(); n.attrs["data-input-box"] = ""; add("text field")
        if n.style.get("position") == "absolute" and n.style.get("backgroundColor") == "var(--color-bg-inverse)" \
                and n.style.get("borderRadius") and n.text():
            n.attrs["data-toast"] = str(4000 if len(n.text()) > 40 else 3000); add("toast")   # feedback.md: 3 s, 4 s on 2 lines
        cursor = [k for k in ks if px(k.style.get("width")) == 2 and (px(k.style.get("height")) or 0) >= 16]
        field = [k for k in ks if is_leaf(k) and re.fullmatch(r"\d*", k.text())]
        if cursor and field:                                 # a drawn number field with a cursor: the keypad types into it
            field[0].attrs["data-field"] = field[0].text(); add("number field")
        if (d in MINUS or d in PLUS) and n in parents:
            parents[n].attrs["data-step"] = "-1" if d in MINUS else "1"; add("stepper button")
        if is_leaf(n) and TIMER.fullmatch(n.text()) and not is_status_bar(parents.get(n)):
            n.attrs["data-timer"] = n.text(); add("countdown")
        sizes = {(px(k.style.get("width")), px(k.style.get("height"))) for k in ks}
        if has_keypad and 3 <= len(ks) <= 6 and len(sizes) == 1 and all(36 <= (w or 0) <= 64 and 44 <= (h or 0) <= 72 for w, h in sizes) \
                and all(k.style.get("borderStyle") for k in ks):
            n.attrs["data-code"] = ""; add("code boxes")
            for k in ks: k.attrs["data-box"] = ""
        pills = [k for k in ks if k.style.get("borderRadius") == "var(--radius-full)" and 32 <= (px(k.style.get("height")) or 0) <= 48]
        on = lambda k: k.style.get("backgroundColor") in ("var(--color-brand-subtle)", "var(--color-bg-brand-subtle)")
        if len(ks) >= 2 and len(pills) == len(ks) and sum(map(on, ks)) == 1:
            n.attrs["data-chips"] = ""; add("chip group")
            for k in ks: k.attrs["data-chip"] = "on" if on(k) else ""
    if any("data-field" in n.attrs for n in walk(root)):
        for k in keypad(root, parents): k.attrs["data-key"] = k.text()
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
        elif any("data-field" in n.attrs for n in walk(root)):
            add("keypad types into the field")
        else:
            add("keypad (any digit continues)")
    return found


def is_radio(n):
    s = n.style
    return px(s.get("width")) == 24 and px(s.get("height")) == 24 and s.get("borderRadius") == "var(--radius-full)" \
        and bool(s.get("borderStyle") or s.get("borderWidth"))


def radio_of(card):
    return next((m for m in walk(card) if m is not card and is_radio(m)), None)


def radio_on(r):
    return r is not None and ("brand" in str(r.style.get("borderColor", "")) or bool(kids(r)))


def is_ring(n):
    ks = kids(n)
    return n.tag == "svg" and any(k.tag == "circle" and "bg-tertiary" in k.attrs.get("stroke", "") for k in ks) and \
        any(k.tag == "path" and "bg-brand" in k.attrs.get("stroke", "") and "A" in k.attrs.get("d", "") for k in ks)


def is_wedge(k):
    return k.tag == "path" and k.attrs.get("d", "").startswith("M20 20 L") and "A15" in k.attrs.get("d", "")


def is_clock(n):
    return n.tag == "svg" and n.attrs.get("viewBox") == "0 0 40 40" and any(is_wedge(k) for k in kids(n))


def is_radio_card(n):
    return bool(n.style.get("borderStyle") or n.style.get("borderWidth")) and \
        n.style.get("borderRadius") in ("var(--radius-lg)", "var(--radius-xl)") and radio_of(n) is not None


def fit(container, art_h, shift):
    """Fill the phone instead of the artboard; the main column scrolls; overlays keep to their edge."""
    container.style.update(width="100%", height="100%")
    container.style.pop("flexBasis", None)
    ks = kids(container)
    flow = [c for c in ks if c.style.get("position") != "absolute"]
    if len(flow) == 1 and px(flow[0].style.get("height")) == art_h:   # the whole screen drawn as one frame
        fit(flow[0], art_h, shift); flow[0].style["flexShrink"] = "0"
    else:
        grow = [c for c in flow if c.style.get("flexGrow") == "1"] or [c for c in flow if c.style.get("height") == "fit-content"]
        body = grow[0] if grow else max(flow, key=lambda c: len(c.text()), default=None)
        if body is not None:
            body.style.update(flex="1 1 0", minHeight="0", overflowY="auto", overflowX="hidden")
            body.style.pop("height", None); body.attrs["data-scroll"] = ""
    for c in ks:
        if c.style.get("position") != "absolute": continue
        top, h = px(c.style.get("top")), px(c.style.get("height"))
        if top == 0 and (h == art_h or c.style.get("height") == "100%"):
            c.style.update(top="0px", left="0px", width="100%", height="100%"); c.attrs["data-scrim"] = ""
        elif top is not None and h is not None and top > art_h / 2:
            c.style.pop("top"); c.style["bottom"] = f"{art_h - top - h:g}px"
        elif top is not None:
            c.style["top"] = f"{max(top - shift, 0):g}px"
            if top == 0 and h is not None: c.style["height"] = f"{max(h - shift, 0):g}px"
        if px(c.style.get("bottom")) == 0 and "borderTopLeftRadius" in c.style:
            c.attrs["data-sheet"] = ""; c.style["width"] = "100%"


def is_system_nav(n):
    """Android's drawn navigation bar (■ ● ◀): a wide strip with no text and three 24 px glyphs. The phone has its own."""
    if not isinstance(n, Node) or n.text().strip() or (n.style.get("width") != "100%" and (px(n.style.get("width")) or 0) < 300): return False
    if (px(n.style.get("height")) or 0) > 60: return False
    size = lambda m, k: px(m.style.get(k)) or (float(m.attrs[k]) if re.fullmatch(r"[\d.]+", m.attrs.get(k, "")) else None)
    return len(kids(n)) == 3 and all(20 <= (size(k, "width") or 0) <= 28 and size(k, "width") == size(k, "height") for k in kids(n)) \
        or len([m for m in walk(n) if m is not n and 20 <= (size(m, "width") or 0) <= 28 and size(m, "width") == size(m, "height")]) == 3


def is_canvas(root):
    """A screen drawn as absolutely placed blocks (copied from Figma) rather than Paper's flex column: every block is
    placed, or one block flows at the top with the rest (nav, scrim, sheet) placed over it."""
    ks = kids(root)
    flow = [c for c in ks if c.style.get("position") != "absolute"]
    return len(ks) > 1 and (not flow or len(flow) == 1 and ks[0] is flow[0] and len(ks) >= 2
                            and not root.style.get("paddingTop") and not root.style.get("padding"))


def has_back(n):
    return any(svg_d(m) in BACK for m in walk(n)) or any("data-go" in m.attrs and m.attrs["data-go"].startswith("back") for m in walk(n))


def is_orb(n):
    """Saathi's floating orb: a 120 px box of rings around her face."""
    return px(n.style.get("width")) == 120 and px(n.style.get("height")) == 120 and not n.text().strip()


def fit_canvas(root, art_h, shift, holder, nav_h=0):
    """An absolutely placed screen on the phone: the drawn status bar's height comes off every block (the phone has its
    own bar); the header, the bottom nav, Saathi's orb, scrims, sheets and whatever sits over a scrim stay put; the rest
    scrolls as one canvas, so a long statement scrolls under its header as in the app."""
    VIEW = 760                                           # the shortest phone, in artboard px: what is on screen without scrolling
    fixed, moving, header_bottom, over_scrim = [], [], 0, False
    for c in kids(root):                                 # the one block that flows sits at the top
        if c.style.get("position") != "absolute": c.style.update(position="absolute", top="0px", left="0px")
    for c in kids(root):
        top, h = px(c.style.get("top")), px(c.style.get("height"))
        if top is not None and c is not holder and not (top <= 0 and h and h >= art_h - 1):
            top -= shift; c.style["top"] = f"{top:g}px"
        full = top is not None and top <= 0 and (h and h >= art_h - 1 or c.style.get("height") == "100%")
        navlike = sum(w in c.text() for w in ("Home", "Earnings", "Profile")) >= 2
        low = top is not None and top > art_h / 2 and (h is not None and top + h >= art_h - shift - nav_h - 2 or h is None and navlike
                                                       or "borderTopLeftRadius" in c.style)
        if top is None and px(c.style.get("bottom")) is not None:   # already pinned to the bottom (a nav, a sheet)
            if "borderTopLeftRadius" in c.style: c.attrs["data-sheet"] = ""; c.style["width"] = "100%"
            fixed.append(c)
        elif full:
            c.style.update(top="0px", left="0px", width="100%", height="100%"); c.attrs["data-scrim"] = ""
            over_scrim = True; fixed.append(c)
        elif low and not is_orb(c):
            c.style.pop("top"); c.style["bottom"] = f"{max(art_h - shift - top - h - nav_h, 0) if h else 0:g}px"
            if "borderTopLeftRadius" in c.style: c.attrs["data-sheet"] = ""; c.style["width"] = "100%"
            fixed.append(c)
        elif over_scrim:
            fixed.append(c)
        elif top is not None and top <= 0 and h and h <= 130 and has_back(c):
            header_bottom = top + h; fixed.append(c)
        elif header_bottom and top is not None and top >= 0 and h and top + h <= header_bottom + 1:
            fixed.append(c)
        elif is_orb(c):
            if top + 120 > VIEW: c.style.pop("top"); c.style["bottom"] = "24px"
            fixed.append(c)
        else:
            moving.append(c)
    extent = max([art_h - shift] + [(px(c.style.get("top")) or 0) + (px(c.style.get("height")) or 0) for c in moving])
    canvas = Node("div", {"data-canvas": ""}, {"position": "relative", "width": "100%", "height": f"{extent:g}px", "flexShrink": "0"})
    canvas.children = moving
    scroller = Node("div", {"data-scroll": ""}, {"position": "absolute", "top": "0px", "left": "0px", "right": "0px",
                                                  "bottom": "0px", "overflowY": "auto", "overflowX": "hidden"})
    scroller.children = [canvas]
    root.children = [scroller] + fixed
    root.style.update(width="100%", height="100%", overflow="hidden")
    root.style.pop("display", None)


def prepare(roots, spec):
    """Wire, add behaviour, remove the drawn status bar and fit — every screen. Returns what each screen got."""
    bodies, swaps = library(roots)
    out = {}
    for sid, (a, root) in roots.items():
        missing = wire(root, spec["taps"].get(sid, []))
        missing += intro(root, spec.get("intro", {}).get(sid))
        found = behave(root, bodies, swaps)
        nav_h = 0
        for n in list(walk(root)):                       # the phone draws its own navigation bar
            for c in [c for c in n.children if is_system_nav(c)]:
                n.children.remove(c)
                if n is root and c.style.get("position") == "absolute": nav_h = px(c.style.get("height")) or 0
                elif n is not root: n.style.pop("height", None)  # the block that held it (the bottom nav) closes up
        for n in walk(root):                             # one-line labels stay one line (Paper sizes them to their text)
            if is_leaf(n) and n.style.get("width") == "max-content": n.style.setdefault("whiteSpace", "pre")
        shift, holder, top_level = 0, None, kids(root)
        parents = parents_of(root)
        for n in list(walk(root)):
            for c in [c for c in n.children if is_status_bar(c)]:
                n.children.remove(c)
                shift = px(c.style.get("height")) or sum(px(c.style.get(k)) or 0 for k in ("paddingTop", "paddingBottom")) + \
                    max((px(m.style.get("lineHeight")) or 0) for m in walk(c))
                if n is not root:                        # the bar sat inside a header block: that block closes up by itself
                    for k in kids(n):                    # … and what Paper placed over that block moves up with it
                        if k.style.get("position") == "absolute" and px(k.style.get("top")) is not None:
                            k.style["top"] = f"{px(k.style['top']) - shift:g}px"
                    holder = n
                    while holder in parents and parents[holder] is not root: holder = parents[holder]
        if is_canvas(root):
            fit_canvas(root, float(a["height"]), shift, holder, nav_h)
        else:
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
        print(f"\n{sid} · {screen_title(a['name'])}{'  [sheet over a screen]' if sheet else ''}")
        print("   labels:", " | ".join(dict.fromkeys(labels)) or "—")
        if icons: print("   icon-only controls:", " | ".join(f"@{p} {s}" for p, s in icons))
        if found: print("   behaves:", ", ".join(f"{k} ×{v}" if v > 1 else k for k, v in found.items()))
        if spec["taps"].get(sid): print("   taps:", "; ".join(f"{t} → {g}" + (" (" + ", ".join(f"{c} → {w}" for c, w in when[0]) + ")" if when else "")
                                                             for t, g, *when in spec["taps"][sid]))
        if sid in spec.get("auto", {}): print("   moves on by itself:", spec["auto"][sid][0], f"after {spec['auto'][sid][1]} ms")
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
    steps = lambda g: {re.sub(r"^(back:|~)", "", st) for st in g.split() if not st.startswith("chip:")}
    into = set()
    for rules in spec.get("fields", {}).values():
        for _, g in rules: into |= steps(g)
    for taps in list(spec["taps"].values()) + [[["auto", *v[:1], *v[2:]]] for v in spec.get("auto", {}).values()]:
        for t, g, *when in taps:
            into |= steps(g)
            for w in (when[0] if when else []): into |= steps(w[1])
    problems = []
    if spec.get("start") not in ids: problems.append(f"start {spec.get('start')!r} is not a screen")
    for sid, taps in spec["taps"].items():
        if sid not in ids: problems.append(f"{sid}: in flow.json but not on the Paper page any more")
        for t, g, *when in taps:
            for go in [g] + [w[1] for w in (when[0] if when else [])]:
                bad = [st for st in go.split() if st not in ("back", "dismiss", "sheet", "speak", "voice") and
                       not st.startswith("chip:") and re.sub(r"^(back:|~)", "", st) not in ids]
                if bad: problems.append(f"{sid}: {t!r} goes to {go!r} — {', '.join(bad)} is not a screen")
    for sid, rules in spec.get("fields", {}).items():
        for match, go in rules:
            bad = [st for st in go.split() if st != "back" and re.sub(r"^(back:|~)", "", st) not in ids]
            if bad: problems.append(f"fields {sid}: {match!r} goes to {go!r} — {', '.join(bad)} is not a screen")
    for sid, go in spec.get("onback", {}).items():
        bad = [st for st in go.split() if st != "back" and re.sub(r"^(back:|~)", "", st) not in ids]
        if bad: problems.append(f"onback {sid}: {go!r} — {', '.join(bad)} is not a screen")
    for sid, (go, ms, *when) in spec.get("auto", {}).items():
        if sid not in ids: problems.append(f"auto {sid}: not a screen")
        for g in [go] + [w[1] for w in (when[0] if when else [])]:
            bad = [st for st in g.split() if st != "back" and re.sub(r"^(back:|~)", "", st) not in ids]
            if bad: problems.append(f"auto {sid}: goes to {g!r} — {', '.join(bad)} is not a screen")
    for sid in spec.get("lists", {}):
        if sid not in ids: problems.append(f"lists {sid}: not a screen")
    for sid, (a, root, missing, found) in prepared.items():
        if missing: problems.append(f"{sid}: can't find {', '.join(map(repr, missing))} on the screen")
        if sid not in into and sid != spec.get("start"): problems.append(f"{sid}: nothing leads here (reachable from the screen list only)")
        if sid not in spec["taps"]: problems.append(f"{sid}: no taps listed yet")
    print("\n".join(problems) if problems else "Every tap lands and every screen has a way in.")
    return problems


def trails(spec, ids):
    """For every screen, the screens she would have come through from the start (shortest path through the taps), so a
    page opened straight on a screen — a reload, the flow switcher — still goes back the way the app would."""
    start = spec.get("start")
    if start not in ids: return {}
    def step(stack, go):
        s = list(stack)
        for st in go.split():
            if st in ("dismiss", "sheet", "speak", "voice") or st.startswith("chip:"): continue
            if st == "back":
                if len(s) > 1: s.pop()
            elif st.startswith("back:"):
                i = max((k for k, x in enumerate(s) if x == st[5:]), default=-1)
                s = s[:i + 1] if i >= 0 else s + [st[5:]]
            elif st.startswith("~"): s[-1] = st[1:]
            else: s.append(st)
        return tuple(s)
    out, queue, done = {start: [start]}, [(start,)], {(start,)}
    while queue:
        stack = queue.pop(0)
        if len(stack) > 8: continue
        top = stack[-1]
        gos = [g for t, g, *w in spec["taps"].get(top, [])] + [w2 for t, g, *w in spec["taps"].get(top, []) for c, w2 in (w[0] if w else [])]
        if top in spec.get("auto", {}): gos.append(spec["auto"][top][0])
        for g in gos:
            nxt = step(stack, g)
            if not nxt or nxt in done or nxt[-1] not in ids: continue
            done.add(nxt); queue.append(nxt)
            out.setdefault(nxt[-1], list(nxt))
    return out


def build(project, flow):
    d, spec = load(project, flow)
    meta, roots = screens(d)
    prepared, swaps = prepare(roots, spec)
    sections = []
    for sid, (a, root, missing, found) in prepared.items():
        title = screen_title(a["name"])
        bg = root.style.get("backgroundColor", "var(--color-bg)")
        auto = ""
        if sid in spec.get("auto", {}):                  # an in-flight screen moves on by itself: [target, ms, conditions?]
            go, ms, *when = spec["auto"][sid]
            auto = f' data-auto="{html.escape(go)}" data-auto-ms="{int(ms)}"'
            if when: auto += f' data-auto-when="{html.escape(json.dumps(when[0], ensure_ascii=False))}"'
        if sid in spec.get("fields", {}):                # what she types picks where the field's search goes
            auto += f' data-fields="{html.escape(json.dumps(spec["fields"][sid], ensure_ascii=False))}"'
        if sid in spec.get("onback", {}):                # the phone's back takes the safe option (bottom-sheet.md, confirm)
            auto += f' data-onback="{html.escape(spec["onback"][sid])}"'
        if sid in spec.get("intro", {}):                 # an intro builds the screen up to what Paper drew
            auto += f' data-intro="{"confetti" if spec["intro"][sid].get("confetti") else "plain"}"'
        if sid in spec.get("voice", {}):                 # Saathi's line for this screen (voice-prompt.md): said on first visit, again on tap
            auto += f' data-voice="{html.escape(spec["voice"][sid])}"'
        sections.append(f'<section class="screen" data-id="{sid}" data-title="{html.escape(title)}" data-bg="{html.escape(bg)}"{auto} hidden>'
                        f'{to_html(root)}</section>')
    ids = {t: i for i, t in enumerate(sorted(swaps))}
    templates = "".join(f'<template id="swap-{ids[t]}-{lay}">{to_html(card)}</template>'
                        for t, v in swaps.items() for lay, card in v.items())
    tokens = "\n".join(f"  {t['name']}: {t['value']};" for t in meta["tokens"])
    siblings = []                                    # the project's other flows: a switcher on the page and in the screen list
    pdir = os.path.dirname(d)
    for f in sorted(os.listdir(pdir)):
        fj = os.path.join(pdir, f, "flow.json")
        if f.startswith((".", "_")) or not os.path.exists(fj): continue
        o = json.load(open(fj))
        siblings.append({"label": o.get("switch_label") or o.get("short_name") or o["name"], "href": f"../{f}/index.html", "on": f == os.path.basename(d),
                         "order": order_key(o["start"]) if o.get("start") else (99, 0, "")})
        for e in o.get("entries", []):              # extra ways into a flow, e.g. straight to its early payout screen
            siblings.append({"label": e["label"], "href": f"../{f}/index.html#{e['screen']}", "on": False, "order": order_key(e["screen"])})
    siblings.sort(key=lambda x: x.pop("order"))
    tpl = open(os.path.join(HERE, "shell.html")).read()
    widths = [float(a["width"]) for a, *_ in prepared.values()]
    start = spec.get("start") or next(iter(prepared))
    page = (tpl.replace("/*TOKENS*/", tokens).replace("<!--SCREENS-->", "\n".join(sections) + templates)
               .replace("__TITLE__", html.escape(spec["name"])).replace("__START__", start)
               .replace("__HINTS__", "true" if spec.get("hints", False) else "false")
               .replace("__VOICE_LANG__", spec.get("voice_lang", "hi-IN"))
               .replace("__SIBLINGS__", json.dumps(siblings if len(siblings) > 1 else [], ensure_ascii=False))
               .replace("__TRAILS__", json.dumps(trails(spec, set(prepared)), ensure_ascii=False))
               .replace("__LISTS__", json.dumps(spec.get("lists", {}), ensure_ascii=False).replace("</", "<\\/"))
               .replace("__W__", f'{max(set(widths), key=widths.count):g}'))
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
