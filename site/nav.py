"""Shared site navigation. Every builder imports nav_html(depth)."""
PAGES = [
  ("Foundations", [("index.html","Tokens"),("principles.html","Principles"),("extending.html","Extending"),("icons.html","Icons"),("assets.html","Assets"),("motion.html","Motion"),("type.html","Type · four scripts"),("accessibility.html","Accessibility"),("content.html","Content")]),
  ("Components",  [("components/accordion.html","Accordion"),("components/amount.html","Amount"),("components/avatar.html","Avatar"),("components/badge.html","Badge"),("components/feedback.html","Banner · Toast · Snackbar"),("components/bottom-sheet.html","BottomSheet"),("components/bottom-tab-bar.html","BottomTabBar"),("components/button.html","Button"),("components/card.html","Card"),("components/selection-controls.html","Checkbox · Radio · Switch"),("components/chip.html","Chip"),("components/coachmark.html","Coachmark"),("components/date-picker.html","DatePicker"),("components/empty-state.html","EmptyState"),("components/header-nav.html","HeaderNav"),("components/how-to-clip.html","HowToClip"),("components/icon-button.html","IconButton"),("components/job-alert.html","JobAlert"),("components/list-item.html","ListItem"),("components/map-marker.html","MapMarker · MapSnippet"),("components/media-capture.html","MediaCapture"),("components/nudge.html","Nudge"),("components/numeric-keypad.html","NumericKeypad"),("components/page-indicator.html","PageIndicator"),("components/popover.html","Popover"),("components/progress-bar.html","ProgressBar"),("components/progress-button.html","ProgressButton"),("components/selection-card.html","SelectionCard"),("components/shield-card.html","ShieldCard"),("components/skeleton.html","Skeleton · Spinner"),("components/sos-control.html","SOSControl"),("components/stat-rating-divider.html","Stat · Rating · Divider"),("components/stepper.html","Stepper"),("components/tabs.html","Tabs · Segmented"),("components/tag.html","Tag"),("components/text-field.html","TextField"),("components/timer.html","Timer"),("components/tooltip.html","Tooltip"),("components/voice-prompt.html","VoicePrompt")]),
  ("Patterns",    [("pattern-new-job-alert.html","New job arrives"),("pattern-check-in-out.html","Check in · work · check out"),("pattern-payout.html","Payout"),("pattern-onboarding.html","Onboarding · go-live"),("pattern-error-recovery.html","When something goes wrong"),("pattern-permissions.html","Asking for permission"),("pattern-first-run.html","First run"),("pattern-earnings.html","Earnings"),("pattern-after-sos.html","After SOS"),("pattern-offline.html","Offline")]),
  ("Research",    [("benchmark.html","Benchmark"),("audit.html","Figma audit"),("roadmap.html","Roadmap"),("governance.html","Governance"),("changelog.html","Changelog")]),
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
