#!/usr/bin/env python3
"""Spec lint — the rules in CLAUDE.md, checked by machine.

Usage: python3 site/lint.py            # report, exit 1 on errors
       python3 site/lint.py --warn      # report, always exit 0

Checks
  E1  raw hex colour in a spec / pattern / foundation (tokens only)
  E2  raw millisecond value that is not a motion.* / timeout.* token value
  E3  Phosphor icon named in a spec but not registered in foundations/icons.md
  E4  component spec missing a required section or the acceptance checklist
  E5  component spec without a live page template, or template without a spec
  E6  page in site/nav.py not produced by build_all.sh (or vice versa)
  E7  generated site/*.html older than its source (run build_all.sh)
  E8  status line claims Reconciled / Stable without its evidence (Figma id / package version), or is missing
  W1  banned words in UI copy (OK, Submit, Continue as a bare label; the foundations/content.md § 9 list)
  W2  spec still says "pending motion foundation" / "sound register" placeholders
"""
import re, sys, pathlib, json, subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
WARN_ONLY = "--warn" in sys.argv
errors, warnings = [], []
def err(f, line, code, msg): errors.append((str(f.relative_to(ROOT)), line, code, msg))
def warn(f, line, code, msg): warnings.append((str(f.relative_to(ROOT)), line, code, msg))

tokens = json.loads((ROOT / "tokens/tokens.json").read_text())
MOTION_MS = {d["value"] for d in tokens["motion"]["duration"]} | {t["value"] for t in tokens["timeout"]["scale"] if t["value"]}
# palette hexes are allowed only in tokens/ and foundations/accessibility.md (which cites them by name)
ALLOW_HEX = {"tokens/DESIGN_TOKENS.md", "foundations/accessibility.md", "foundations/assets.md", "audit/BENCHMARK.md", "audit/FIGMA_AUDIT.md"}

# registered icons: every `name` in the icons.md tables' first column (plus a / b pairs)
icons_md = (ROOT / "foundations/icons.md").read_text()
REGISTERED = set()
for m in re.finditer(r"^\| `([a-z0-9-]+)`(?: / `([a-z0-9-]+)`)?", icons_md, re.M):
    REGISTERED.add(m.group(1))
    if m.group(2): REGISTERED.add(m.group(2))
# words that look like icon names but are tokens / variants / kinds, not icons
NOT_ICONS = {
 "primary","secondary","tertiary","ghost","brand","neutral","danger","success","warning","error","info",
 "single","multi","compact","rich","date","hero","page","section","state","home","in-job","root","transparent",
 "linear","segmented","list","unordered","ordered","point","tour","do-it","card","player","guide","tile","preview",
 "face","document","scene","input","display","row","labelled","paid","processing","blocked","failed","held","scheduled",
 "on","off","starting","stopped","ended","new","attention","urgent","calm","expired","deadline","countdown","elapsed",
 "default","selected","pressed","disabled","focused","loading","hover","empty","offline","waiting","review","done","current","upcoming","locked","open",
 "small","medium","large","full","fullWidth","circle","square","wide","gain","loss","otp","phone","number","amount","search","multiline","text",
 "instant","xfast","fast","standard","slow","emphasis","gesture","celebrate","beat","loop","enter","exit","move",
 "tapGuard","loadingMin","settle","screenSettle","toast","snackbar","autoAdvance","autoContinue","holdSOS","sosCancel","expiredClose","safetyCheck","jobAlert",
 "confirm","select","form","permission","alert","sheet","job","hub","me","hotspot","filter","quick-reply","faq","breakdown","conditional",
 "tabs","navigational","selection","kind","variant","mode","size","height","width","count","spin","shimmer","keyPress","autoplayDelay",
 "picto","reward","placeholder","note","dot","badge","tier","asset","character","shield","siren-fill","fill","regular","bold","stale","repeat","accepting","accepted","declining","verified",
 "pending","queued","uploading","checking","fail","result","present","absent","today","week","month","cash","bank","upi","pan","aadhaar",
 "en","hi","mr","kn","te","S","M","L","XS","XL","sm","md","lg","xl","xxl","none","light","heavy","bump","sos","newJob","shutter","voiceStart","commit","coin","confirm",
 "bgPrimary","bgSecondary","bgTertiary","bgInverse","bgBrand","bgBrandSubtle","bgSuccess","bgSuccessSubtle","bgWarning","bgWarningSubtle","bgError","bgErrorSubtle","bgInfo","bgInfoSubtle","bgErrorStrong","bgReward","bgNeutralStrong",
 "textPrimary","textBody","textSecondary","textTertiary","textDisabled","textInverse","textBrand","textSuccess","textWarning","textError","textInfo","textSuccessStrong","textWarningStrong","textErrorStrong","textInfoStrong",
 "borderDefault","borderSubtle","borderStrong","borderBrand","borderFocus","borderSuccess","borderWarning","borderError","iconBrand","iconSuccess","iconWarning","iconError","iconInverse",
 "interactiveDefault","interactiveHover","interactivePressed","spacing","radius","elevation","floating","flat","modal","overlay","scrim","motion","timeout","easing","sound","haptic","voice","media","clipBudget","map","style","typography","indic","maxFontScale",
}
# Phosphor names actually used as icons in specs: backticked kebab or single words that exist in the Phosphor set
PH_DIR = pathlib.Path("/tmp/claude-0/ph/node_modules/@phosphor-icons/core/assets/regular")
PHOSPHOR = {p.stem for p in PH_DIR.glob("*.svg")} if PH_DIR.exists() else set()

# foundations/content.md § 9 — the first two groups (system error language, marketing filler)
BANNED = r"\bOops\b|Error \d{3}|Something went wrong|Request failed|Network error|No internet connection|Failed to fetch|Invalid input|Verification failed|Try again later|Coming soon|Pro tip|Learn more|Know more|Don't miss out|Keep going!|Hurry!"
SPEC_SECTIONS = ["## What changes", "## Accessibility", "## Figma reconciliation", "## Acceptance checklist"]
SKIP_SPECS = {"README.md"}

def scan(f, kind):
    text = f.read_text()
    rel = str(f.relative_to(ROOT))
    for i, line in enumerate(text.splitlines(), 1):
        # E1 raw hex
        # a hex beside a backticked token / palette name is documentation of the token, not a raw value
        if rel not in ALLOW_HEX and re.search(r"#[0-9A-Fa-f]{6}\b", line) and not re.search(r"`[A-Za-z]+(\.\d{2,3})?`", line):
            err(f, i, "E1", "raw hex colour — use a semantic token: " + line.strip()[:80])
        # E2 raw ms not on the scale (skip lines that already name a token, tables of the scale itself, and 'was N' history)
        if kind != "foundation":
            for m in re.finditer(r"(\d{2,5})\s?ms\b", line):
                v = int(m.group(1))
                if v not in MOTION_MS and "motion." not in line and "timeout." not in line and "was " not in line:
                    err(f, i, "E2", f"{v} ms is not a motion/timeout token value")
        # E3 icons: backticked kebab words that are Phosphor icons and not registered
        low = line.lower()
        skip_icons = any(k in low for k in ("not allowed", "never", "forbidden", "pictogram", "scene", "role `", "asset/", "| existing |", "| new |"))
        for m in re.finditer(r"`([a-z][a-z0-9-]{2,})`", line):
            name = m.group(1)
            if skip_icons or name in NOT_ICONS or "." in name: continue
            if name in PHOSPHOR and name not in REGISTERED:
                err(f, i, "E3", f"Phosphor icon `{name}` used but not registered in foundations/icons.md")
        # W1 banned copy
        if re.search(r"\*\*(OK|Submit|Continue)\*\*(?! \(|\s*[·—-])", line) and "never" not in line.lower() and "not " not in line.lower() and "don" not in line.lower():
            warn(f, i, "W1", "bare label OK / Submit / Continue as a Button: " + line.strip()[:80])
        if rel != "foundations/content.md" and re.search(BANNED, line) and not re.search(r"never|no \*|no \b|banned|not |don't|instead of|→", line, re.I):
            warn(f, i, "W1", "banned copy (foundations/content.md § 9): " + line.strip()[:80])
        if re.search(r"pending (the )?motion foundation|into the motion foundation", line, re.I):
            warn(f, i, "W2", "motion placeholder — the foundation exists; cite the token")
    if kind == "component":
        low = text.lower()
        if not re.search(r"^##+ .*(what changes|starting point|what ships)", text, re.M | re.I): err(f, 0, "E4", "missing a 'What changes from Figma / what ships' section")
        if not re.search(r"^##+ .*accessibility", text, re.M | re.I): err(f, 0, "E4", "missing an Accessibility section")
        for s in ("## Figma reconciliation", "## Acceptance checklist"):
            if s.lower() not in low: err(f, 0, "E4", f"missing section '{s}'")
        if not re.search(r"^\| \d+", text, re.M): err(f, 0, "E4", "acceptance checklist has no rows")
        # E8 status line (GOVERNANCE.md §1)
        st = re.search(r"^Status: \*\*(Proposed|Reconciled|Stable|Deprecated)\*\*(.*)$", text, re.M)
        if not st: err(f, 0, "E8", "missing or malformed status line (Status: **Proposed** · …)")
        else:
            status, rest = st.group(1), st.group(2)
            if status in ("Reconciled", "Stable") and not re.search(r"Figma `\d+:\d+`", rest): err(f, 0, "E8", f"{status} without a Figma component id in the status line")
            if status == "Stable" and not re.search(r"`Snabbit\w+` \d+\.\d+\.\d+", rest): err(f, 0, "E8", "Stable without a package version in the status line")
            if status == "Stable" and not re.search(r"reviewed \d{4}-\d{2}-\d{2}", rest): err(f, 0, "E8", "Stable without a 'reviewed YYYY-MM-DD' date")

for f in sorted((ROOT / "components").glob("*.md")):
    if f.name in SKIP_SPECS: continue
    scan(f, "component")
for f in sorted((ROOT / "patterns").glob("*.md")): scan(f, "pattern")
for f in sorted((ROOT / "foundations").glob("*.md")): scan(f, "foundation")

# E5 spec ↔ template pairing (compositions and multi-component pages are mapped by hand)
PAIR = {"stat-rating-divider": "stat-rating-divider", "selection-controls": "selection-controls", "feedback": "feedback"}
specs = {f.stem for f in (ROOT / "components").glob("*.md")} - {"README"}
templates = {f.name.replace(".template.html", "") for f in (ROOT / "site/components").glob("*.template.html")}
for s in sorted(specs - templates): err(ROOT / f"components/{s}.md", 0, "E5", "spec without a live page template")
for t in sorted(templates - specs): err(ROOT / f"site/components/{t}.template.html", 0, "E5", "template without a spec")

# E6 nav ↔ build
nav = (ROOT / "site/nav.py").read_text()
nav_pages = set(re.findall(r'\("([a-z0-9/-]+\.html)"', nav))
build = (ROOT / "site/build_all.sh").read_text()
built = set(re.findall(r"site/([a-z0-9/-]+\.html)", build)) | {"index.html", "audit.html"} | {f"components/{t}.html" for t in templates}
for p in sorted(nav_pages - built): err(ROOT / "site/nav.py", 0, "E6", f"nav links to {p} but build_all.sh does not build it")
for p in sorted(built - nav_pages - {"index.html"}): warn(ROOT / "site/build_all.sh", 0, "E6", f"{p} is built but not in the nav")

# E7 stale generated pages
def mtime(p): return p.stat().st_mtime if p.exists() else 0
for t in templates:
    out = ROOT / f"site/components/{t}.html"
    if mtime(ROOT / f"site/components/{t}.template.html") > mtime(out) or mtime(ROOT / "tokens/tokens.json") > mtime(out):
        err(out, 0, "E7", "generated page older than its template or tokens — run bash site/build_all.sh")
for m in re.finditer(r"build_doc\.py (\S+\.md) (site/\S+\.html)", build):
    src, out = ROOT / m.group(1), ROOT / m.group(2)
    if mtime(src) > mtime(out): err(out, 0, "E7", f"older than {m.group(1)} — run bash site/build_all.sh")

def show(rows, label):
    for f, line, code, msg in rows:
        loc = f"{f}:{line}" if line else f
        print(f"{label} {code}  {loc}  {msg}")
show(errors, "ERROR"); show(warnings, "warn ")
print(f"\n{len(errors)} error(s), {len(warnings)} warning(s) · {len(specs)} specs · {len(REGISTERED)} icons registered")
sys.exit(0 if (WARN_ONLY or not errors) else 1)
