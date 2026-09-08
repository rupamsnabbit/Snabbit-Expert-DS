"""Shared site navigation. Every builder imports nav_html(depth)."""
PAGES = [
  ("Foundations", [("index.html","Tokens"),("principles.html","Principles"),("extending.html","Extending"),("icons.html","Icons"),("assets.html","Assets")]),
  ("Components",  [("components/button.html","Button"),("components/icon-button.html","IconButton"),("components/tag.html","Tag"),("components/text-field.html","TextField"),("components/selection-controls.html","Checkbox · Radio · Switch"),("components/amount.html","Amount"),("components/timer.html","Timer"),("components/feedback.html","Banner · Toast · Snackbar"),("components/chip.html","Chip"),("components/avatar.html","Avatar"),("components/badge.html","Badge"),("components/card.html","Card"),("components/list-item.html","ListItem"),("components/selection-card.html","SelectionCard"),("components/bottom-sheet.html","BottomSheet"),("components/header-nav.html","HeaderNav"),("components/bottom-tab-bar.html","BottomTabBar"),("components/progress-bar.html","ProgressBar"),("components/stepper.html","Stepper"),("components/coachmark.html","Coachmark"),("components/sos-control.html","SOSControl"),("components/accordion.html","Accordion"),("components/date-picker.html","DatePicker"),("components/empty-state.html","EmptyState"),("components/skeleton.html","Skeleton · Spinner"),("components/voice-prompt.html","VoicePrompt"),("components/tabs.html","Tabs · Segmented"),("components/nudge.html","Nudge")]),
  ("Research",    [("benchmark.html","Benchmark"),("audit.html","Figma audit"),("roadmap.html","Roadmap")]),
]
def nav_html(depth=0, current=None):
    pre = "../" * depth
    out = ['<nav class="sitenav" aria-label="Site">']
    for grp, items in PAGES:
        out.append(f'<div class="grp">{grp}</div>')
        for href, label in items:
            on = ' class="on"' if href == current else ''
            out.append(f'<a{on} href="{pre}{href}">{label}</a>')
    out.append('</nav>')
    return "".join(out)
NAV_CSS = """
.sitenav{display:flex;flex-direction:column;gap:2px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.sitenav .grp{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);padding:10px 8px 4px;font-weight:500}
.sitenav a{display:block;padding:5px 8px;border-radius:6px;text-decoration:none;color:var(--text-body);font-size:13.5px;border:0}
.sitenav a:hover{background:var(--bg-2);color:var(--text)} .sitenav a.on{color:var(--brand-ink);background:var(--brand-wash);font-weight:500}
@media (max-width:900px){.sitenav{flex-direction:row;flex-wrap:wrap;gap:4px;border-bottom:0;padding-bottom:0}.sitenav .grp{display:none}}
"""
