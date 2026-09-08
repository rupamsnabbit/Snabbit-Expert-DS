#!/usr/bin/env bash
# Rebuild the whole documentation site. Run from the repo root.
set -e
python3 site/build.py
python3 site/build_doc.py principles/PRINCIPLES.md site/principles.html "Snabbit Expert Principles" "Design principles"
python3 site/build_doc.py principles/EXTENDING.md  site/extending.html  "Snabbit Expert Extending"  "Extending the system"
python3 site/build_doc.py foundations/icons.md     site/icons.html      "Snabbit Expert Icons"      "Icons"
python3 site/build_doc.py foundations/assets.md    site/assets.html     "Snabbit Expert Assets"     "Assets"
python3 site/build_doc.py audit/BENCHMARK.md       site/benchmark.html  "Snabbit Expert Benchmark"  "Benchmark"
python3 site/build_doc.py patterns/new-job-alert.md site/pattern-new-job-alert.html "Snabbit Expert Pattern New Job" "Pattern · New job arrives"
python3 site/build_doc.py ROADMAP.md               site/roadmap.html    "Snabbit Expert Roadmap"    "Roadmap"
python3 site/build_audit.py
