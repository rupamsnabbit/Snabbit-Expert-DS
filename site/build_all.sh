#!/usr/bin/env bash
# Rebuild the whole documentation site. Run from the repo root.
set -e
python3 site/build.py
python3 site/build_doc.py principles/PRINCIPLES.md site/principles.html "Snabbit Expert Principles" "Design principles"
python3 site/build_doc.py principles/EXTENDING.md  site/extending.html  "Snabbit Expert Extending"  "Extending the system"
python3 site/build_doc.py foundations/icons.md     site/icons.html      "Snabbit Expert Icons"      "Icons"
python3 site/build_doc.py foundations/assets.md    site/assets.html     "Snabbit Expert Assets"     "Assets"
python3 site/build_doc.py foundations/motion.md    site/motion.html     "Snabbit Expert Motion"     "Motion"
python3 site/build_doc.py foundations/type.md      site/type.html       "Snabbit Expert Type"       "Type · four scripts"
python3 site/build_doc.py foundations/accessibility.md site/accessibility.html "Snabbit Expert Accessibility" "Accessibility"
python3 site/build_doc.py audit/BENCHMARK.md       site/benchmark.html  "Snabbit Expert Benchmark"  "Benchmark"
python3 site/build_doc.py patterns/new-job-alert.md site/pattern-new-job-alert.html "Snabbit Expert Pattern New Job" "Pattern · New job arrives"
python3 site/build_doc.py patterns/check-in-out.md site/pattern-check-in-out.html "Snabbit Expert Pattern Check-in" "Pattern · Check in, work, check out"
python3 site/build_doc.py patterns/payout.md site/pattern-payout.html "Snabbit Expert Pattern Payout" "Pattern · Payout"
python3 site/build_doc.py patterns/onboarding.md site/pattern-onboarding.html "Snabbit Expert Pattern Onboarding" "Pattern · Onboarding and go-live"
python3 site/build_doc.py patterns/error-recovery.md site/pattern-error-recovery.html "Snabbit Expert Pattern Errors" "Pattern · When something goes wrong"
python3 site/build_doc.py patterns/permissions.md site/pattern-permissions.html "Snabbit Expert Pattern Permissions" "Pattern · Asking for permission"
python3 site/build_doc.py patterns/first-run.md site/pattern-first-run.html "Snabbit Expert Pattern First Run" "Pattern · The first time she sees it"
python3 site/build_doc.py ROADMAP.md               site/roadmap.html    "Snabbit Expert Roadmap"    "Roadmap"
python3 site/build_audit.py
