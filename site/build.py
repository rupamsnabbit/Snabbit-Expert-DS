#!/usr/bin/env python3
"""Inject tokens/tokens.json into every template.
  site/template.html                    → site/index.html
  site/components/<name>.template.html  → site/components/<name>.html
Run from the repo root:  python3 site/build.py
"""
import json, pathlib, sys
root = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / "site")); from nav import nav_html, NAV_CSS
tok = json.dumps(json.load(open(root / "tokens" / "tokens.json")), separators=(",", ":")).replace("</", "<\\/")
def build(src, out):
    rel = out.relative_to(root / "site").as_posix(); depth = rel.count("/")
    html = src.read_text().replace("__TOKENS__", tok).replace("__NAVCSS__", NAV_CSS).replace("__SITENAV__", nav_html(depth, rel))
    out.write_text(html); print("wrote", out.relative_to(root))
build(root / "site" / "template.html", root / "site" / "index.html")
for t in sorted((root / "site" / "components").glob("*.template.html")):
    build(t, t.with_name(t.name.replace(".template", "")))
