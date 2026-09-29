#!/bin/bash
# Open a walkthrough on the Android emulator:  bash tools/walkthrough/open.sh <project> <flow>
# Serves the repo on localhost:8765, boots the emulator if it isn't running, and opens the flow in Chrome.
# WALKTHROUGH_AVD picks the emulator (default: the first one `emulator -list-avds` prints).
set -e
PROJECT=$1; FLOW=$2
[ -z "$FLOW" ] && { echo "usage: open.sh <project> <flow>"; exit 1; }
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd)
[ -f "$ROOT/projects/$PROJECT/walkthrough/$FLOW/index.html" ] || { echo "Not built yet: run walkthrough.py build $PROJECT $FLOW"; exit 1; }
SDK=${ANDROID_HOME:-$HOME/Library/Android/sdk}; ADB=$SDK/platform-tools/adb; PORT=8765
LOGS=${TMPDIR:-/tmp}

if ! curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then
  nohup python3 "$HERE/serve.py" $PORT > "$LOGS/walkthrough-serve.log" 2>&1 &
  sleep 1
fi
if ! "$ADB" devices | grep -q "^emulator-"; then
  AVD=${WALKTHROUGH_AVD:-$("$SDK/emulator/emulator" -list-avds | head -1)}
  echo "Booting $AVD…"
  nohup "$SDK/emulator/emulator" -avd "$AVD" -no-snapshot-save -no-boot-anim > "$LOGS/walkthrough-emulator.log" 2>&1 &
fi
"$ADB" wait-for-device
until [ "$("$ADB" shell getprop sys.boot_completed | tr -d '\r')" = "1" ]; do sleep 2; done
"$ADB" reverse tcp:$PORT tcp:$PORT > /dev/null
URL="http://localhost:$PORT/projects/$PROJECT/walkthrough/$FLOW/index.html"
"$ADB" shell am start -a android.intent.action.VIEW -d "$URL" com.android.chrome > /dev/null
echo "Open on the emulator: $URL"
