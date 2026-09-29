"""Paper get_jsx (inline-styles) -> a small node tree -> HTML. Only what Paper emits: tags, string attrs, style={{}}, text."""
import re, html

UNITLESS = {"fontWeight", "flex", "flexGrow", "flexShrink", "opacity", "zIndex", "order", "lineHeight"}
SVG_ATTR = {"strokeWidth": "stroke-width", "strokeLinecap": "stroke-linecap", "strokeLinejoin": "stroke-linejoin",
            "fillRule": "fill-rule", "clipRule": "clip-rule", "strokeDasharray": "stroke-dasharray",
            "strokeDashoffset": "stroke-dashoffset", "strokeMiterlimit": "stroke-miterlimit", "stopColor": "stop-color",
            "stopOpacity": "stop-opacity", "fillOpacity": "fill-opacity", "strokeOpacity": "stroke-opacity"}

class Node:
    def __init__(self, tag, attrs, style):
        self.tag, self.attrs, self.style, self.children = tag, attrs, style, []
    def text(self):
        return "".join(c if isinstance(c, str) else c.text() for c in self.children)

def kebab(k):
    k = re.sub(r"^(Moz|Webkit|ms)", lambda m: "-" + m.group(1).lower(), k)
    return re.sub(r"[A-Z]", lambda m: "-" + m.group(0).lower(), k)

def fix_css(v):
    # Paper writes color-mix(X N%, transparent); browsers need an interpolation space.
    return re.sub(r"color-mix\((?!in )", "color-mix(in srgb, ", v)

def parse_style(src):
    style, i = {}, 0
    for m in re.finditer(r"([A-Za-z]+):\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"|[-0-9.]+)", src):
        k, v = m.group(1), m.group(2)
        if v[0] in "'\"":
            v = v[1:-1].replace("\\'", "'").replace('\\"', '"')
        elif k not in UNITLESS:
            v = v + "px"
        style[k] = fix_css(v)
    return style

TOKEN = re.compile(r"<(/?)([a-zA-Z][\w.]*)((?:\s+[a-zA-Z][\w-]*=(?:\"[^\"]*\"|\{\{.*?\}\}))*)\s*(/?)>", re.S)
ATTR = re.compile(r"([a-zA-Z][\w-]*)=(\"[^\"]*\"|\{\{(.*?)\}\})", re.S)

def parse(jsx):
    start = jsx.index("<")
    root, stack, pos = None, [], start
    for m in TOKEN.finditer(jsx, start):
        txt = jsx[pos:m.start()]
        if stack and txt.strip():
            stack[-1].children.append(" ".join(txt.split()))
        pos = m.end()
        closing, tag, attrs_src, selfclose = m.groups()
        if closing:
            n = stack.pop()
            if not stack: root = n
            continue
        attrs, style = {}, {}
        for a in ATTR.finditer(attrs_src):
            if a.group(1) == "style": style = parse_style(a.group(3))
            else: attrs[a.group(1)] = a.group(2)[1:-1]
        n = Node(tag, attrs, style)
        if stack: stack[-1].children.append(n)
        if selfclose:
            if not stack: root = n
        else:
            stack.append(n)
    return root

def css(style):
    return "; ".join(f"{kebab(k)}: {v}" for k, v in style.items())

def to_html(n, extra=None):
    if isinstance(n, str): return html.escape(n)
    a = "".join(f' {SVG_ATTR.get(k, k)}="{html.escape(v)}"' for k, v in n.attrs.items())
    for k, v in (extra(n) if extra else {}).items(): a += f' {k}="{html.escape(v)}"'
    if n.style: a += f' style="{html.escape(css(n.style))}"'
    inner = "".join(to_html(c, extra) for c in n.children)
    return f"<{n.tag}{a}>{inner}</{n.tag}>"
