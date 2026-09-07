#!/usr/bin/env python3
"""Render any markdown doc into the token-site chrome.
Usage: python3 site/build_doc.py <src.md> <out.html> "<Title>" "<Sidebar subtitle>"
"""
import re, pathlib, sys, markdown

root = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / "site")); from nav import nav_html, NAV_CSS
src, out, TITLE, SUB = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
md = (root / src).read_text()

# drop the H1 + first paragraph (rendered as the page header instead)
parts = md.split("\n---\n", 1)
body_md = parts[1] if len(parts) > 1 else md
lede = re.search(r"^# .*?\n\n(.*?)\n\n", md, re.S).group(1)
H1 = re.match(r"^# (.*)", md).group(1).replace("Snabbit Expert — ", "")
if H1.lower().startswith("benchmark"): H1 = "Benchmark"

html = markdown.markdown(body_md, extensions=["tables", "sane_lists"])
# checklists: "- [ ] text" → styled
html = re.sub(r"<li>\[ \] (.*?)</li>", r'<li class="chk">\1</li>', html)
# add ids to h2/h3 and collect nav
nav = []
def slug(s): return re.sub(r"[^a-z0-9]+", "-", re.sub(r"<.*?>", "", s).lower()).strip("-")
def h(m):
    lvl, txt = m.group(1), m.group(2)
    sid = slug(txt)
    if lvl == "2": nav.append((sid, re.sub(r"<.*?>", "", txt), []))
    elif lvl == "3" and nav: nav[-1][2].append((sid, re.sub(r"<.*?>", "", txt)))
    return f'<h{lvl} id="{sid}">{txt}</h{lvl}>'
html = re.sub(r"<h([23])>(.*?)</h\1>", h, html)
# wrap tables for horizontal scroll
html = html.replace("<table>", '<div class="tbl-wrap"><table>').replace("</table>", "</table></div>")
# "Rules" / "Checks" mini-labels
html = re.sub(r"<p>(Rules|Checks|Why: )", lambda m: f'<p class="lbl">{m.group(1)}' if m.group(1) != "Why: " else '<p class="why">', html)

page_nav = ""
for sid, txt, subs in nav:
    page_nav += f'<a href="#{sid}">{txt}</a>'
    for ssid, stxt in subs:
        short = re.sub(r"^\d+\.\s*", "", stxt)
        num = re.match(r"^(\d+)\.", stxt)
        page_nav += f'<a class="sub" href="#{ssid}">{"<b>"+num.group(1)+"</b> " if num else ""}{short}</a>'

page = f"""<meta charset="utf-8">
<title>{TITLE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
:root{{
  --bg:#FFFFFF; --bg-2:#F9FAFB; --bg-3:#F3F4F6;
  --text:#111827; --text-body:#374151; --text-2:#6B7280; --text-3:#9CA3AF;
  --border:#E5E7EB; --border-subtle:#F3F4F6;
  --brand:#F70F79; --brand-wash:#FEF1F7; --brand-ink:#97094A;
  --ok:#059669; --ok-wash:#ECFDF5; --focus:#3B82F6;
  --sans:"Outfit",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}}
@media (prefers-color-scheme: dark){{
  :root:not([data-theme="light"]){{
    --bg:#111827; --bg-2:#1F2937; --bg-3:#374151;
    --text:#F9FAFB; --text-body:#E5E7EB; --text-2:#9CA3AF; --text-3:#6B7280;
    --border:#374151; --border-subtle:#1F2937;
    --brand:#F65CA1; --brand-wash:rgba(247,15,121,.14); --brand-ink:#FBC9DF;
    --ok:#34D399; --ok-wash:rgba(16,185,129,.14);
  }}
}}
:root[data-theme="dark"]{{
  --bg:#111827; --bg-2:#1F2937; --bg-3:#374151;
  --text:#F9FAFB; --text-body:#E5E7EB; --text-2:#9CA3AF; --text-3:#6B7280;
  --border:#374151; --border-subtle:#1F2937;
  --brand:#F65CA1; --brand-wash:rgba(247,15,121,.14); --brand-ink:#FBC9DF;
  --ok:#34D399; --ok-wash:rgba(16,185,129,.14);
}}
*{{box-sizing:border-box}}
html{{scroll-behavior:smooth;scroll-padding-top:24px}}
@media (prefers-reduced-motion:reduce){{html{{scroll-behavior:auto}}}}
body{{margin:0;background:var(--bg);color:var(--text-body);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}}
code{{font-family:var(--mono);font-size:.85em;background:var(--bg-2);border:1px solid var(--border);border-radius:4px;padding:1px 5px;color:var(--text)}}
:focus-visible{{outline:2px solid var(--focus);outline-offset:2px;border-radius:4px}}
.shell{{display:grid;grid-template-columns:248px minmax(0,1fr);min-height:100vh}}
.rail{{position:sticky;top:0;height:100vh;overflow-y:auto;border-right:1px solid var(--border);padding:24px 16px 32px;background:var(--bg);display:flex;flex-direction:column;gap:20px}}
.brand{{display:flex;align-items:center;gap:10px;padding:0 8px}}
.brand-mark{{width:28px;height:28px;border-radius:8px;background:var(--brand);display:grid;place-items:center;flex:none}}
.brand-mark span{{width:12px;height:12px;border-radius:3px;background:#fff;transform:rotate(45deg)}}
.brand b{{font-weight:600;color:var(--text);font-size:15px;line-height:1.2;display:block}}
.brand small{{color:var(--text-2);font-size:12px}}
.nav{{display:flex;flex-direction:column;gap:2px}}
.nav a{{display:block;padding:6px 8px;border-radius:6px;text-decoration:none;color:var(--text);font-size:13.5px;font-weight:500}}
.nav a.sub{{font-weight:400;color:var(--text-body);padding-left:14px;font-size:13px}}
.nav a.sub b{{font-family:var(--mono);font-weight:500;color:var(--text-3);font-size:11.5px;margin-right:2px}}
.nav a:hover{{background:var(--bg-2)}}
.nav a.on{{background:var(--brand-wash);color:var(--brand-ink)}}
.rail-foot{{margin-top:auto;padding:0 8px;font-size:12px;color:var(--text-3);line-height:1.5}}
.main{{padding:40px 56px 96px;max-width:860px;width:100%}}
.eyebrow{{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--brand);font-weight:600}}
h1{{font-size:40px;line-height:1.1;font-weight:600;color:var(--text);margin:8px 0 12px;letter-spacing:-.015em;text-wrap:balance}}
.lede{{font-size:18px;color:var(--text-2);max-width:60ch;margin:0 0 8px}}
.lede strong{{color:var(--text);font-weight:500}}
h2{{font-size:26px;line-height:1.2;font-weight:600;color:var(--text);margin:72px 0 16px;letter-spacing:-.01em;text-wrap:balance;padding-top:24px;border-top:1px solid var(--border)}}
h3{{font-size:20px;font-weight:600;color:var(--text);margin:48px 0 8px;letter-spacing:-.005em}}
h3::before{{content:"";display:block;width:32px;height:3px;background:var(--brand);border-radius:2px;margin-bottom:14px}}
p{{margin:0 0 14px;max-width:66ch}}
h3 + p{{font-size:17px;color:var(--text);font-weight:500}}
p.why{{color:var(--text-2);font-size:15px;padding-left:14px;border-left:2px solid var(--border)}}
p.why::before{{content:"Why · ";color:var(--text-3);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:600}}
p.lbl{{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-2);font-weight:600;margin:22px 0 8px}}
strong{{color:var(--text);font-weight:600}}
em{{font-style:italic}}
ul,ol{{margin:0 0 14px;padding-left:0;list-style:none;max-width:68ch}}
ul li{{position:relative;padding-left:20px;margin:6px 0;font-size:15.5px}}
ul li::before{{content:"";position:absolute;left:0;top:11px;width:9px;height:2px;background:var(--brand)}}
ul li.chk{{padding-left:30px}}
ul li.chk::before{{width:16px;height:16px;top:4px;background:var(--bg);border:1.5px solid var(--text-3);border-radius:4px}}
ol{{counter-reset:s}}
ol li{{counter-increment:s;display:grid;grid-template-columns:32px 1fr;gap:12px;margin:10px 0;font-size:15.5px}}
ol li::before{{content:counter(s);width:28px;height:28px;border-radius:50%;background:var(--brand-wash);color:var(--brand-ink);font-weight:600;font-size:13px;display:grid;place-items:center;margin-top:1px}}
.tbl-wrap{{overflow-x:auto;border:1px solid var(--border);border-radius:12px;margin:8px 0 20px}}
table{{width:100%;border-collapse:collapse;font-size:14px}}
th{{text-align:left;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-2);font-weight:500;padding:10px 14px;background:var(--bg-2);border-bottom:1px solid var(--border);white-space:nowrap}}
td{{padding:10px 14px;border-bottom:1px solid var(--border-subtle);vertical-align:top;color:var(--text-body)}}
tr:last-child td{{border-bottom:0}}
td:first-child{{color:var(--text);font-weight:500;white-space:nowrap}}
hr{{display:none}}
{NAV_CSS}
@media (max-width:900px){{
  .shell{{grid-template-columns:1fr}}
  .rail{{position:static;height:auto;border-right:0;border-bottom:1px solid var(--border);padding:16px}}
  .nav{{flex-direction:row;flex-wrap:wrap;gap:4px}} .nav a.sub{{padding-left:8px}} .rail-foot{{display:none}}
  .main{{padding:32px 20px 80px}} h1{{font-size:32px}} h2{{margin-top:56px}}
}}
</style>
<div class="shell">
  <aside class="rail">
    <div class="brand"><div class="brand-mark"><span></span></div><div><b>Snabbit Expert</b><small>{SUB}</small></div></div>
    {nav_html(0, pathlib.Path(out).name)}<nav class="nav" id="nav">{page_nav}</nav>
    <div class="rail-foot">Snabbit Expert Design System · generated from {src}</div>
  </aside>
  <main class="main">
    <header>
      <div class="eyebrow">Snabbit Expert · Mobile</div>
      <h1>{H1}</h1>
      <p class="lede">{lede}</p>
    </header>
    {html}
  </main>
</div>
<script>
(function(){{
const links=[...document.querySelectorAll('#nav a')];
const targets=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){{
  const io=new IntersectionObserver(es=>{{es.forEach(en=>{{if(en.isIntersecting){{links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id));}}}});}},{{rootMargin:'-10% 0px -80% 0px'}});
  targets.forEach(t=>io.observe(t));
}}
}})();
</script>
"""
(root / out).write_text(page)
print("wrote", out)
