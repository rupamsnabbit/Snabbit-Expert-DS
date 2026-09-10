# Snabbit Expert Design System

Mobile design system for the Snabbit Expert app (Compose Multiplatform). Built token-first.

```
tokens/
  DESIGN_TOKENS.md   Human-readable token contract (original)
  tokens.json        Machine-readable source of truth — edit this
CLAUDE.md / AGENTS.md  Agent instructions — read first in any tool
DECISIONS.md         Dated decisions: Outfit only, Phosphor only, light only
foundations/
  icons.md           Phosphor meaning register (one icon, one meaning)
  assets.md          Illustration/reward assets: soft-3D style lock, register, AI style prompt
  motion.md          Durations, easing, timeouts, reduced motion
  type.md            Four scripts: fallback faces, ×1.15, budgets, wrapping, font scale
  accessibility.md   Measured contrast, targets, focus, screen reader, the test pass
  content.md         How the app talks: register, actions, states, formats, spoken copy, four languages, vocabulary, banned words
principles/
  PRINCIPLES.md      Persona, 9 principles, reference case, acceptance checklist
  EXTENDING.md       Tiers, rule of three, reference-read procedure, brief template
components/          One spec per core component (49) + 2 compositions; live page per spec under site/components/
patterns/            One flow per file (10)
GOVERNANCE.md · CHANGELOG.md · ROADMAP.md   Lifecycle, releases, what is done and left
briefs/              Tier 3 / change-to-core briefs
references/          Reference screenshots + reads
audit/               FIGMA_AUDIT.md · BENCHMARK.md · frames.json
site/
  build_doc.py       any markdown → page (principles.html, benchmark.html)
  build_audit.py     Figma audit → audit.html + audit/FIGMA_AUDIT.md
  principles.html · benchmark.html · audit.html   Generated
  template.html      Token site markup/styles (reads tokens.json at build time)
  build.py           tokens.json + template.html → index.html
  index.html         Generated. Open in a browser or publish.
```

Workflow: change a value in `tokens/tokens.json` → `python3 site/build.py` → the site reflects it.
Keep `DESIGN_TOKENS.md` and `tokens.json` in sync until the package (`com.snabbit:design-system`) generates both.
