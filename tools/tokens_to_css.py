"""tokens/tokens.json → CSS custom properties. Semantic names become --color-<name>; type roles --text-<role>
and --leading-<role>; spacing --spacing-<n>; radius --radius-<name>; border --border-<name>; button sizes --button-<size>-*.
Usage: python3 tools/tokens_to_css.py <out.css>"""
import json, re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = json.load(open(os.path.join(ROOT, 'tokens', 'tokens.json')))
kebab = lambda s: re.sub(r'(?<!^)(?=[A-Z])', '-', s).lower()
lines = [':root {', '  /* generated from tokens/tokens.json — do not edit */']
for fam, steps in t['color']['palette'].items():
    if isinstance(steps, dict):
        for k, v in steps.items(): lines.append(f'  --color-{fam}-{k}: {v};')
    else: lines.append(f'  --color-{fam}: {steps};')
for group, items in t['color']['semantic'].items():
    for it in items: lines.append(f'  --color-{kebab(it["name"])}: {it["value"]};')
lines.append(f'  --font-sans: "{t["typography"]["fontFamily"]["compose"]}", "Noto Sans Devanagari", system-ui, sans-serif;')
for r in t['typography']['scale']:
    n = kebab(r['name']); lines.append(f'  --text-{n}: {r["size"]}px; --leading-{n}: {r["lineHeight"]}px; --weight-{n}: {r["weight"]};')
for s in t['spacing']['scale']: lines.append(f'  --spacing-{s["name"]}: {s["value"]}px;')
for s in t['radius']['scale']: lines.append(f'  --radius-{s["name"]}: {s["value"]}px;')
for s in t['borderWidth']['scale']: lines.append(f'  --border-{s["name"]}: {s["value"]}px;')
for b in t['button']['sizes']:
    n = {'XS':'xs','S':'sm','M':'md','L':'lg'}.get(b['name'], b['name'].lower()); lines.append(f'  --button-{n}-height: {b["height"]}px; --button-{n}-padding: {b["paddingX"]}px; --button-{n}-radius: {b["radius"]}px; --button-{n}-label: {b["labelSize"]}px; --button-{n}-weight: {b["labelWeight"]}; --button-{n}-icon: {b["icon"]}px;')
g = t['grid']; lines.append(f'  --container-screen: {g["baselineViewport"]["width"]}px; --container-height: {g["baselineViewport"]["height"]}px; --screen-margin: {g["screenMargin"]}px;')
for k, v in t['icon'].items():
    if isinstance(v, int): lines.append(f'  --icon-{kebab(k)}: {v}px;')
lines.append('}')
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'site', 'tokens.css')
open(out, 'w').write('\n'.join(lines) + '\n'); print(out, len(lines), 'lines')
