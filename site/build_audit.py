#!/usr/bin/env python3
"""Figma Components-page audit → audit/FIGMA_AUDIT.md + site/audit.html
Source data: audit/frames.json (exported from Figma metadata) + the classification below.
Run from repo root: python3 site/build_audit.py
"""
import json, pathlib, html, re, sys
from collections import Counter, OrderedDict

root = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / "site")); from nav import nav_html, NAV_CSS
frames = {f["id"]: f for f in json.load(open(root / "audit" / "frames.json"))}
FILE = "QjXqQZVAqLoRmH1j7foH1I"

# tier: CORE | COMP (composition) | LOCAL | ASSET | KEEP (docs) | HK (housekeeping)
# (id, tier, target, note)
C = [
 # ---- controls
 ("2:8530","CORE","Button","294 variants, only Active/Disabled. Cut 9 styles → Primary, Secondary, Tertiary, Destructive, Link. Add Pressed, Loading, Focus. Fold Text into Tertiary; drop Success, Neutral Filled/Stroke as styles (status is not a button style)."),
 ("1825:6970","CORE","IconButton","60 variants. Merge with 1847:11099."),
 ("1847:11099","CORE","IconButton","Duplicate set (12). Merge into 1825:6970."),
 ("1491:13660","CORE","Button · progress variant","'Small fill / Half fill / Full fill' — a progress-fill button. Belongs as a Button variant (change to core), not a separate component."),
 ("1491:14586","COMP","Button","Block / Unblock — two Button instances with copy. Composition."),
 ("9:2148","COMP","Button","Button Groups: layouts of Button (stacked, side by side, 70/30). Keep as documented patterns, not components."),
 ("8:1091","CORE","Radio","15 variants, fine."),
 ("8:1322","CORE","Checkbox","18 variants, fine."),
 ("2231:7109","HK","—","Stray Checkbox instance on the page. Delete."),
 ("44:108","CORE","TextField","15 variants. Base for OTP, Number, Search, TextArea."),
 ("44:280","CORE","TextField · OTP / Mobile","Keep as TextField variants (mobile with +91 prefix, OTP boxes)."),
 ("89:129","CORE","TextField · Number","Fold into TextField as a variant."),
 ("1491:12793","CORE","TextField · TextArea","Fold into TextField as multiline variant."),
 ("1491:17604","CORE","TextField · Search","Fold into TextField with leading icon + clear."),
 ("89:99","COMP","TextField + DatePicker","DOB Selection — composition."),
 ("122:145","CORE","Chip","Merge with Selection Pill."),
 ("1075:9887","CORE","SelectionCard","Selection Pill (Camera / Gallery) — a full-width option row with icon; reclassified from Chip to SelectionCard during the Chip spec."),
 ("1236:8652","CORE","Slider","💯 Percentage variants. Merge with 2524:8298; confirm whether interactive or display-only."),
 ("2524:8298","CORE","Slider","Second Slider frame. Merge."),
 # ---- feedback & status
 ("519:2495","CORE","Toast","7 variants, fine."),
 ("666:3389","CORE","Banner","Status Banner (10) is the base. Absorb Banners, Banner, Banner +CTA."),
 ("1580:8199","CORE","Banner","Banners (1) — merge into Status Banner."),
 ("1616:9990","CORE","Banner","Banner (2) — merge into Status Banner."),
 ("1537:11688","CORE","Banner","Banner +CTA — a Banner variant with action slot."),
 ("1786:6804","COMP","Banner","Banner carousel — composition of Banner."),
 ("537:4918","CORE","Tooltip","6 variants. Merge Colored Tooltip in."),
 ("1491:17618","CORE","Tooltip","Colored Tooltip — merge."),
 ("1581:6683","CORE","Nudge","Gamification nudge; P6 says nudges are core. Spec against 'never blocks the next action'."),
 ("666:3317","CORE","ProgressBar","34 variants (linear, segmented). Fine; trim state explosion."),
 ("1075:8388","CORE","Stepper","'Step Indicatorss' — rename."),
 ("371:6294","CORE","Timer","8 variants. This is the countdown for the job alert — highest-stakes core component. Design the ring form (P5)."),
 ("2477:7134","HK","Timer","Stray Timers frame (no variants). Delete after merging anything unique."),
 ("2477:7141","HK","Timer","Stray Timers frame. Delete."),
 # ---- identity & rewards
 ("7:1574","CORE","Tag","84 variants (Color × Style × Size). Map colours to status tokens; tier colours only for tier."),
 ("685:4021","CORE","Badge","12 variants."),
 ("666:3358","COMP","Badge","Badges Groups — arrangement of Badge."),
 ("1234:6423","CORE","Avatar","45 variants (Size × Style × Persona). Fine."),
 ("1534:11661","HK","Avatar","'Referee pfp' — an Avatar instance. Delete."),
 ("2485:7676","CORE","TierBadge","12 variants (Tiers × Use at). Owns TierColors."),
 ("2488:8490","COMP","TierBadge + ProgressBar","TIER PROGRESS — composition."),
 ("531:2544","CORE","CoinChip","24 variants. Reward currency chip."),
 ("609:6820","CORE","CoinChip","Coins & Cards – Small — size variant of CoinChip."),
 ("758:4947","COMP","CoinChip","Coins & Cards – Groups — arrangement."),
 ("2539:8337","ASSET","icon/coin","SNABBIT COIN — icon asset."),
 ("1550:11864","CORE","Rating","6 variants. Uses Smileys as its icon set."),
 ("1491:9039","ASSET","icon/smileys","15 face states — icon assets for Rating."),
 # ---- surfaces & structure
 ("8:116","CORE","HeaderNav","6 variants. Exists in code as SnabbitHeaderNav."),
 ("1491:15247","CORE","BottomTabBar","5 variants. Exists in code as SnabbitBottomTabBar."),
 ("1535:12163","CORE","BottomSheet","15 variants. Package owns scrim/elevation."),
 ("1825:6967","HK","BottomSheet","Stray Bottom Sheets symbol. Delete."),
 ("894:7348","CORE","Accordion","2 variants."),
 ("83:119","CORE","Divider","5 variants."),
 ("379:6040","CORE","Card","Cards – States (4) is the base card."),
 ("10:2334","CORE","SelectionCard","Simple Selection Cards — base. Absorb the 6 other selection-card frames as variants."),
 ("19:133","CORE","SelectionCard","with Description — variant."),
 ("10:2585","CORE","SelectionCard","Date Selection — variant."),
 ("10:2791","CORE","SelectionCard","Complex — variant."),
 ("75:500","CORE","SelectionCard","Selectable Card — duplicate concept, merge."),
 ("1237:10853","COMP","SelectionCard","Service Selection Card — domain composition."),
 ("1075:6540","COMP","SelectionCard","Shift Selection Card (8) — domain composition."),
 ("579:2665","CORE","ListItem","List Items (3) — base with leading/trailing slots."),
 ("609:6107","CORE","ListItem","ListItem / meta — variant."),
 ("1598:7354","CORE","ListItem","List (3) — merge."),
 ("537:5021","COMP","ListItem","List Items – Payout (8) — domain."),
 ("609:3882","COMP","ListItem","Attendance List Item — domain."),
 ("537:4754","COMP","ListItem","Account Item — domain."),
 ("637:4266","COMP","ListItem","Breakdown List — domain."),
 ("542:3934","COMP","ListItem","Pay Summary – List — domain."),
 ("666:3266","COMP","ListItem + ProgressBar","Progress Stat – List — domain."),
 ("1537:11829","COMP","ListItem","Referral list — domain."),
 ("1560:11849","COMP","ListItem","Contact List — domain."),
 ("974:5706","COMP","ListItem","Table Components — key/value rows; compose from ListItem. Low confidence — check."),
 ("537:4277","CORE","Stat","Value (6) — number + label. Small core primitive for earnings/metrics. Low confidence."),
 ("1491:13010","COMP","Card + Stat","Metric Card."),
 ("756:3531","CORE","DatePicker","Date Picker (2) — base."),
 ("827:5182","CORE","DatePicker","Calendar (3) — merge with 1598:7553."),
 ("1598:7553","CORE","DatePicker","Calendar (3) — duplicate. Merge."),
 ("371:2306","CORE","DatePicker · day cell","Date (3)."),
 ("827:5161","CORE","DatePicker · day cell","Day Properties (5)."),
 ("869:4920","COMP","DatePicker","Day Strip — horizontal week strip built from day cells."),
 # ---- domain compositions
 ("531:2478","COMP","Card","Summary Card — earnings."),
 ("1491:14507","COMP","Card","Earnings Card (6)."),
 ("1847:9629","HK","Card","Earnings Card instance stray. Delete."),
 ("1490:11066","COMP","Accordion","Earnings Accordion."),
 ("1558:11868","COMP","ListItem","Transaction states."),
 ("582:2702","COMP","Card","Attendance Card (9)."),
 ("1580:6419","COMP","Card","Attendance (7)."),
 ("1533:11507","COMP","Card + Tag","Job States (4)."),
 ("1533:11600","COMP","pattern","Bottom check-in / Acceptance screen — a screen fragment. Move to Patterns; it is the P2/P3 reference case."),
 ("1534:11534","COMP","Button","Remind buttons."),
 ("1491:13181","COMP","Card","Navigation Card (4) — merge with 1580:6548."),
 ("1580:6548","COMP","Card","Navigation Card (4) — duplicate."),
 ("1589:7952","COMP","Card","Contact Card."),
 ("1075:8182","COMP","Card + Stepper","Onboarding Step Card."),
 ("1491:10192","COMP","Chip","Categories (18) — service categories as selectable chips/cards."),
 ("2489:8412","COMP","Card + ProgressBar","Progress Cards (16)."),
 ("1491:12676","COMP","?","Widgets (3) — unknown contents. Check."),
 ("1491:14153","COMP","Carousel","Carousel Strip."),
 ("1075:6268","COMP","Card","Training centre (2)."),
 ("2232:7174","HK","Card","Training centre duplicate frame. Delete."),
 ("134:1465","COMP","Card + Timer","Training Timer Cards."),
 ("1545:11729","COMP","Card","Invite card."),
 ("1568:12063","LOCAL","Chat","Message Container — chat bubble."),
 ("1491:19268","LOCAL","Chat","Chat Card."),
 ("1678:6892","COMP","?","States (3) — unclear. Check."),
 ("1679:6881","COMP","IconButton","Navigation Button."),
 ("29:2995","HK","—","Building Blocks (2) — unclear scratch. Check then delete or name."),
 ("1237:8893","HK","—","Box (2) — unclear. Check."),
 # ---- local (feature-owned)
 ("1490:11346","LOCAL","Shield","Kavach Card."),
 ("1847:7050","HK","Shield","Kavach Card instance stray. Delete."),
 ("1594:6484","LOCAL","Shield","Camera Preview."),
 ("1548:12258","LOCAL","Shield","PIP."),
 ("1564:12441","LOCAL","Shield","Over the app — overlay states."),
 ("1582:7327","LOCAL","Job · Map","Maps."),
 ("1582:7472","LOCAL","Job · Map","Map widget (4)."),
 ("1540:12241","LOCAL","Contest","Contest Rules."),
 ("1540:12259","LOCAL","Contest","Rule number."),
 ("1543:12452","LOCAL","Contest","Contest fyi."),
 ("1543:13779","LOCAL","Contest","Contest Banner."),
 ("1543:13869","LOCAL","Contest","Contest Page Hero."),
 ("2492:8230","LOCAL","Contest","Reel."),
 ("1574:8439","LOCAL","Referral","Manual Referral."),
 ("1075:9974","LOCAL","Onboarding","Document Upload Card — error states are good; keep."),
 ("1075:10055","LOCAL","Onboarding","Tip Image Container."),
 ("1537:11919","COMP","Button","Bottom Sticky — the fixed bottom action bar. Pattern, not component."),
 ("545:2614","ASSET","icon/lock","Lock (2)."),
 ("975:6018","ASSET","icons","Icons Group."),
 ("666:3301","ASSET","icons","Icons_Karma Bonus."),
 ("545:2768","ASSET","icons","Pay Summary – Icons."),
 ("862:4989","ASSET","illustrations","Illustration – List Items."),
 ("1289:7830","KEEP","docs","Guidelines section — move to its own page."),
 # ---- housekeeping
 ("1534:11821","HK","—","'Component 24' (6 variants, 401×939) — unnamed. Identify, rename or delete."),
 ("1582:7227","HK","—","'Component 39' — unnamed. Identify."),
 ("1708:6952","HK","—","Frame 2147241321 (1 variant) — unnamed."),
 ("1550:11779","HK","—","Frame 2147243598 (1 variant) — unnamed."),
 ("1568:14840","HK","—","Frame 2147243605 (10 children, 1004×1191) — looks like a screen. Move out."),
 ("1847:9094","HK","—","'Frame' (393×852) — a screen. Move out."),
 ("1847:10754","HK","—","Frame 2147239652 (393×756) — a screen. Move out."),
 ("1820:6826","HK","—","Frame 2147243617 — unnamed."),
 ("756:3520","HK","—","Frame 2147241471 — unnamed."),
 ("758:4507","HK","—","Frame 2147242575 (40×40) — stray."),
 ("758:4509","HK","—","Frame 2147242576 (40×40) — stray."),
 ("2637:8327","HK","—","Frame 2147243863 (68×20) — stray."),
 ("975:6015","HK","—","Frame 2147242975 — stray symbol."),
]
# section-title banners (unnamed, height 279, one child) → HK
for fid, f in frames.items():
    if f["name"].startswith("Frame 2147") and abs(f["h"] - 279) < 1 and f["children"] == 1:
        C.append((fid, "HK", "sections", "Section-title banner. Replace with a Figma Section so the page is navigable."))
# stray TIER text labels
for fid, f in frames.items():
    if f["kind"] == "text":
        C.append((fid, "HK", "—", f"Stray text label '{f['name']}'. Delete."))

seen = {c[0] for c in C}
missing = [f for fid, f in frames.items() if fid not in seen]
assert not missing, [m["name"] for m in missing]

TIER = OrderedDict([
 ("CORE",("Core","Tier 1 — a system component. Gets a spec, semantic variables, package implementation.")),
 ("COMP",("Composition","Tier 2 — built from core components + tokens. Lives in its feature namespace; leaves the Components page.")),
 ("LOCAL",("Local","Tier 3 — feature-owned component. Tokens only, principles pass, briefed. Promote on third use.")),
 ("ASSET",("Asset","Icon or illustration. Move to an Assets page / icon library.")),
 ("KEEP",("Keep","Documentation. Move to its own page.")),
 ("HK",("Housekeeping","Rename, merge, move out, or delete.")),
])

rows = []
for fid, tier, target, note in C:
    f = frames[fid]
    rows.append(dict(id=fid, name=f["name"].replace("&amp;","&").strip(), variants=len(f["syms"]), tier=tier, target=target, note=note,
                     url=f"https://www.figma.com/design/{FILE}/Expert-App---Design-System-2.O?node-id={fid.replace(':','-')}"))
order = {k:i for i,k in enumerate(TIER)}
rows.sort(key=lambda r:(order[r["tier"]], r["target"], r["name"]))
counts = Counter(r["tier"] for r in rows)
core_targets = sorted({r["target"].split(" ·")[0] for r in rows if r["tier"]=="CORE"})
gaps = ["Toggle / Switch","Spinner / loading indicator","Skeleton","Dialog / Alert","Empty state","Offline banner (P5)","SOS button (P7)","Snackbar with action"]

# ---------- markdown
md = ["# Figma Components page — audit", "",
      f"Source: *Expert App — Design System 2.O*, page 🧩 Components (`1:3886`). {len(rows)} top-level frames classified into the tiers defined in `principles/EXTENDING.md`.", "",
      "| Tier | Count | Meaning |","| --- | --- | --- |"]
for k,(n,d) in TIER.items(): md.append(f"| {n} | {counts[k]} | {d} |")
md += ["", f"## Proposed core set ({len(core_targets)})", "", ", ".join(core_targets), "",
       "## Gaps — core components that do not exist yet", "", ", ".join(gaps), "",
       "## Classification", ""]
for k,(n,d) in TIER.items():
    md += [f"### {n} ({counts[k]})", "", "| Frame | Variants | Target | Note |", "| --- | --- | --- | --- |"]
    for r in rows:
        if r["tier"]==k: md.append(f"| [{r['name']}]({r['url']}) | {r['variants']} | {r['target']} | {r['note']} |")
    md.append("")
(root/"audit"/"FIGMA_AUDIT.md").write_text("\n".join(md))

# ---------- html
e = html.escape
def trow(r):
    return (f'<tr class="f" data-tier="{r["tier"]}" data-f="{e((r["name"]+" "+r["target"]+" "+r["note"]).lower())}">'
            f'<td><a href="{r["url"]}" target="_blank" rel="noopener">{e(r["name"])}</a></td>'
            f'<td class="num">{r["variants"] or "—"}</td><td><span class="pill {r["tier"]}">{e(TIER[r["tier"]][0])}</span></td>'
            f'<td class="tgt">{e(r["target"])}</td><td class="note">{e(r["note"])}</td></tr>')
tiles = "".join(f'<button class="tile" data-tier="{k}" type="button"><b>{counts[k]}</b><span>{e(n)}</span></button>' for k,(n,d) in TIER.items())
legend = "".join(f'<div class="lg"><span class="pill {k}">{e(n)}</span><span>{e(d)}</span></div>' for k,(n,d) in TIER.items())
page = f"""<title>Snabbit Expert Figma Audit</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
:root{{--bg:#FFFFFF;--bg-2:#F9FAFB;--bg-3:#F3F4F6;--text:#111827;--text-body:#374151;--text-2:#6B7280;--text-3:#9CA3AF;--border:#E5E7EB;--border-subtle:#F3F4F6;--brand:#F70F79;--brand-wash:#FEF1F7;--brand-ink:#97094A;--focus:#3B82F6;
--core:#FEF1F7;--core-ink:#97094A;--comp:#EFF6FF;--comp-ink:#1D4ED8;--local:#FFFBEB;--local-ink:#B45309;--asset:#F3F4F6;--asset-ink:#374151;--keep:#ECFDF5;--keep-ink:#047857;--hk:#FEF2F2;--hk-ink:#B91C1C;
--sans:"Outfit",ui-sans-serif,system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,Menlo,monospace}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#111827;--bg-2:#1F2937;--bg-3:#374151;--text:#F9FAFB;--text-body:#E5E7EB;--text-2:#9CA3AF;--text-3:#6B7280;--border:#374151;--border-subtle:#1F2937;--brand:#F65CA1;--brand-wash:rgba(247,15,121,.14);--brand-ink:#FBC9DF;
--core:rgba(247,15,121,.16);--core-ink:#FBC9DF;--comp:rgba(59,130,246,.16);--comp-ink:#BFDBFE;--local:rgba(245,158,11,.16);--local-ink:#FDE68A;--asset:#374151;--asset-ink:#E5E7EB;--keep:rgba(16,185,129,.16);--keep-ink:#A7F3D0;--hk:rgba(239,68,68,.16);--hk-ink:#FECACA}}}}
:root[data-theme="dark"]{{--bg:#111827;--bg-2:#1F2937;--bg-3:#374151;--text:#F9FAFB;--text-body:#E5E7EB;--text-2:#9CA3AF;--text-3:#6B7280;--border:#374151;--border-subtle:#1F2937;--brand:#F65CA1;--brand-wash:rgba(247,15,121,.14);--brand-ink:#FBC9DF;
--core:rgba(247,15,121,.16);--core-ink:#FBC9DF;--comp:rgba(59,130,246,.16);--comp-ink:#BFDBFE;--local:rgba(245,158,11,.16);--local-ink:#FDE68A;--asset:#374151;--asset-ink:#E5E7EB;--keep:rgba(16,185,129,.16);--keep-ink:#A7F3D0;--hk:rgba(239,68,68,.16);--hk-ink:#FECACA}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--text-body);font-family:var(--sans);font-size:15px;line-height:1.55}}
a{{color:var(--text);text-decoration:none;border-bottom:1px solid var(--border)}} a:hover{{border-color:var(--brand)}}
:focus-visible{{outline:2px solid var(--focus);outline-offset:2px;border-radius:4px}}
.main{{max-width:1180px;margin:0 auto;padding:40px 32px 96px}}
.eyebrow{{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--brand);font-weight:600}}
h1{{font-size:36px;line-height:1.1;font-weight:600;color:var(--text);margin:8px 0 12px;letter-spacing:-.015em}}
.lede{{font-size:17px;color:var(--text-2);max-width:66ch;margin:0 0 28px}}
.tiles{{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-bottom:20px}}
.tile{{border:1px solid var(--border);background:var(--bg);border-radius:12px;padding:14px 16px;text-align:left;cursor:pointer;font:inherit;color:var(--text-body);display:flex;flex-direction:column;gap:2px}}
.tile b{{font-size:26px;font-weight:600;color:var(--text);font-variant-numeric:tabular-nums;line-height:1.1}} .tile span{{font-size:12.5px;color:var(--text-2)}}
.tile:hover{{border-color:var(--brand)}} .tile.on{{border-color:var(--brand);background:var(--brand-wash)}} .tile.on span{{color:var(--brand-ink)}}
.legend{{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:8px 24px;margin:0 0 28px;font-size:13.5px;color:var(--text-2)}}
.lg{{display:flex;gap:10px;align-items:baseline}}
.pill{{display:inline-block;font-size:11.5px;font-weight:600;letter-spacing:.03em;padding:2px 8px;border-radius:999px;white-space:nowrap}}
.pill.CORE{{background:var(--core);color:var(--core-ink)}}.pill.COMP{{background:var(--comp);color:var(--comp-ink)}}.pill.LOCAL{{background:var(--local);color:var(--local-ink)}}.pill.ASSET{{background:var(--asset);color:var(--asset-ink)}}.pill.KEEP{{background:var(--keep);color:var(--keep-ink)}}.pill.HK{{background:var(--hk);color:var(--hk-ink)}}
h2{{font-size:22px;font-weight:600;color:var(--text);margin:36px 0 10px;letter-spacing:-.01em}}
.chips{{display:flex;flex-wrap:wrap;gap:6px}} .chips span{{font-family:var(--mono);font-size:12.5px;color:var(--text);background:var(--bg-2);border:1px solid var(--border);border-radius:6px;padding:3px 8px}}
.chips.gap span{{border-style:dashed;color:var(--text-2)}}
.bar{{display:flex;gap:12px;align-items:center;margin:28px 0 12px;flex-wrap:wrap}}
.bar input{{flex:1;min-width:220px;height:38px;border:1px solid var(--border);border-radius:8px;background:var(--bg-2);color:var(--text);padding:0 12px;font:inherit;font-size:14px}}
.bar .cnt{{font-size:13px;color:var(--text-2);font-variant-numeric:tabular-nums}}
.tbl-wrap{{overflow-x:auto;border:1px solid var(--border);border-radius:12px}}
table{{width:100%;border-collapse:collapse;font-size:13.5px}}
th{{text-align:left;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-2);font-weight:500;padding:10px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);white-space:nowrap;position:sticky;top:0}}
td{{padding:9px 12px;border-bottom:1px solid var(--border-subtle);vertical-align:top}} tr:last-child td{{border-bottom:0}}
td.num{{font-family:var(--mono);font-size:12.5px;text-align:right;color:var(--text-2)}} td.tgt{{font-family:var(--mono);font-size:12.5px;color:var(--text);white-space:nowrap}} td.note{{color:var(--text-2);min-width:320px}}
.hidden{{display:none!important}}
{NAV_CSS}
.sitenav{{flex-direction:row;flex-wrap:wrap;gap:4px;border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:28px}} .sitenav .grp{{display:none}}
@media (max-width:800px){{.tiles{{grid-template-columns:repeat(3,1fr)}} .main{{padding:28px 16px 80px}}}}
</style>
<main class="main">
  {nav_html(0,"audit.html")}
  <div class="eyebrow">Snabbit Expert · Figma</div>
  <h1>Components page audit</h1>
  <p class="lede">Every top-level frame on the 🧩 Components page, sorted into the tiers from <em>Extending the system</em>. Click a tile to filter; click a frame name to open it in Figma. Approve or change the tier, then the rebuild starts from Core.</p>
  <div class="tiles">{tiles}</div>
  <div class="legend">{legend}</div>
  <h2>Proposed core set — {len(core_targets)} components</h2>
  <div class="chips">{"".join(f"<span>{e(t)}</span>" for t in core_targets)}</div>
  <h2>Gaps — core components that do not exist yet</h2>
  <div class="chips gap">{"".join(f"<span>{e(g)}</span>" for g in gaps)}</div>
  <div class="bar"><input id="q" type="search" placeholder="Filter frames…" aria-label="Filter frames"><span class="cnt" id="cnt"></span></div>
  <div class="tbl-wrap"><table><thead><tr><th>Frame</th><th>Variants</th><th>Tier</th><th>Target</th><th>Note</th></tr></thead><tbody id="tb">{"".join(trow(r) for r in rows)}</tbody></table></div>
</main>
<script>
(function(){{
let tier=null; const q=document.getElementById('q'), rows=[...document.querySelectorAll('#tb tr')], cnt=document.getElementById('cnt');
function apply(){{const s=q.value.trim().toLowerCase();let n=0;rows.forEach(r=>{{const ok=(!tier||r.dataset.tier===tier)&&(!s||r.dataset.f.includes(s));r.classList.toggle('hidden',!ok);if(ok)n++;}});cnt.textContent=n+' of '+rows.length+' frames';}}
document.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>{{tier=(tier===t.dataset.tier)?null:t.dataset.tier;document.querySelectorAll('.tile').forEach(x=>x.classList.toggle('on',x.dataset.tier===tier));apply();}}));
q.addEventListener('input',apply);apply();
}})();
</script>
"""
(root/"site"/"audit.html").write_text(page)
print(dict(counts), len(rows), "core targets:", len(core_targets))
