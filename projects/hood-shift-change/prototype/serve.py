"""Serve the prototype to the phone over HTTPS (self-signed) so the mic and the voice work.
Usage: python3 serve.py [port]   → prints the URL and a QR code if `qrencode` exists."""
import http.server, ssl, os, sys, socket, subprocess, json, hashlib, base64, struct, urllib.request, urllib.error
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'tts-cache'); os.makedirs(CACHE, exist_ok=True)

def tts_config():
    """tts.config.json next to this file: {"provider": "gemini", "key": "…", "voice": "Aoede", "model": "gemini-2.5-flash-preview-tts", "style": "…"}. Never committed."""
    p = os.path.join(HERE, 'tts.config.json')
    cfg = {}
    if os.path.exists(p):
        try: cfg = json.load(open(p))
        except Exception as e: print('tts.config.json unreadable:', e)
    key = cfg.get('key') or os.environ.get('GEMINI_API_KEY')
    if not key: return None
    cfg.setdefault('provider', 'gemini'); cfg.setdefault('voice', 'Aoede'); cfg.setdefault('model', 'gemini-2.5-flash-preview-tts')
    cfg.setdefault('style', 'Speak as Saathi, a warm and friendly young Indian woman helping a co-worker. Natural conversational Hindi with an Indian accent, clear and unhurried, kind, never robotic. English words like HSR, time, area, expert ID are said the Indian way.')
    cfg['key'] = key; return cfg

def wav_from_pcm(pcm, rate=24000, channels=1, width=2):
    header = struct.pack('<4sI4s4sIHHIIHH4sI', b'RIFF', 36 + len(pcm), b'WAVE', b'fmt ', 16, 1, channels, rate, rate * channels * width, channels * width, width * 8, b'data', len(pcm))
    return header + pcm

def gemini_tts(cfg, text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{cfg['model']}:generateContent?key={cfg['key']}"
    body = { 'contents': [{ 'parts': [{ 'text': f"{cfg['style']}\n\n{text}" }] }],
             'generationConfig': { 'responseModalities': ['AUDIO'], 'speechConfig': { 'voiceConfig': { 'prebuiltVoiceConfig': { 'voiceName': cfg['voice'] } } } } }
    req = urllib.request.Request(url, data=json.dumps(body).encode('utf-8'), headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=40) as r: data = json.load(r)
    part = data['candidates'][0]['content']['parts'][0]['inlineData']
    pcm = base64.b64decode(part['data'])
    rate = 24000
    m = [x for x in part.get('mimeType', '').split(';') if x.strip().startswith('rate=')]
    if m: rate = int(m[0].split('=')[1])
    return wav_from_pcm(pcm, rate)

import threading, time
LOCK = threading.Lock(); LAST = [0.0]
def cache_path(cfg, text):
    key = hashlib.sha1((cfg['provider'] + cfg['voice'] + cfg['model'] + cfg['style'] + text).encode('utf-8')).hexdigest()
    return os.path.join(CACHE, key + '.wav')
def synth(text, wait=True):
    """Cached WAV for a line. One Gemini call at a time, paced by cfg['gapSeconds'] (free tier is a few requests a minute),
    429 → back off and retry. wait=False: return None at once if another call is in flight (live request → phone voice)."""
    cfg = tts_config()
    if not cfg: return None
    path = cache_path(cfg, text)
    if os.path.exists(path): return open(path, 'rb').read()
    if not LOCK.acquire(blocking=wait): return None
    try:
        if os.path.exists(path): return open(path, 'rb').read()
        gap = float(cfg.get('gapSeconds', 7))
        for attempt in range(4):
            pause = LAST[0] + gap - time.time()
            if pause > 0: time.sleep(pause)
            try:
                wav = gemini_tts(cfg, text); LAST[0] = time.time()
                open(path, 'wb').write(wav); print('tts ok:', text[:40]); return wav
            except urllib.error.HTTPError as e:
                LAST[0] = time.time()
                if e.code == 429:
                    retry = e.headers.get('Retry-After'); delay = float(retry) if retry and retry.isdigit() else 20 * (attempt + 1)
                    body = ''
                    try: body = e.read().decode('utf-8', 'ignore')[:300]
                    except Exception: pass
                    print(f'tts 429, waiting {delay:.0f}s:', body.replace(chr(10), ' ')[:200]); time.sleep(delay); continue
                raise
        return None
    finally: LOCK.release()
ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
HTTP = '--http' in sys.argv  # plain http for the Mac's own browser; the phone needs https for the mic
PORT = int(ARGS[0]) if ARGS else 8766
def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try: s.connect(('8.8.8.8', 80)); return s.getsockname()[0]
    except Exception: return '127.0.0.1'
    finally: s.close()
class NoCache(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=HERE, **k)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def log_message(self, *a): pass
    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode('utf-8'); self.send_response(code); self.send_header('Content-Type', 'application/json'); self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body)
    def do_POST(self):
        if self.path.startswith('/tts'):
            try:
                n = int(self.headers.get('Content-Length') or 0); req = json.loads(self.rfile.read(n) or b'{}')
                texts = req.get('texts') or [req.get('text', '')]
                if self.path == '/tts/warm':
                    # answer at once; generate in the background, one line at a time, paced for the rate limit
                    def run():
                        ok = 0
                        for t in texts:
                            try:
                                if t and synth(t): ok += 1
                            except Exception as e: print('warm error:', e)
                        print(f'warm done: {ok}/{len(texts)} cached')
                    threading.Thread(target=run, daemon=True).start()
                    return self.send_json({ 'queued': len(texts) })
                wav = synth(texts[0], wait=False) if texts[0] else None      # a live line never waits behind the warm-up
                if not wav: return self.send_json({ 'error': 'busy or not configured' }, 503)
                self.send_response(200); self.send_header('Content-Type', 'audio/wav'); self.send_header('Content-Length', str(len(wav))); self.end_headers(); self.wfile.write(wav)
            except Exception as e:
                print('tts error:', e); self.send_json({ 'error': str(e) }, 500)
            return
        self.send_response(404); self.end_headers()
    def do_GET(self):
        if self.path.startswith('/tts/status'):
            cfg = tts_config(); return self.send_json({ 'enabled': bool(cfg), 'provider': cfg and cfg['provider'], 'voice': cfg and cfg['voice'], 'model': cfg and cfg['model'] })
        if self.path.split('?')[0] in ('/', '/index.html'):
            import re, glob
            stamp = str(int(max(os.path.getmtime(f) for f in glob.glob(os.path.join(HERE, '**', '*.*'), recursive=True) if f.endswith(('.js', '.css', '.html')))))
            body = re.sub(r'\?v=\d+', '?v=' + stamp, open(os.path.join(HERE, 'index.html'), encoding='utf-8').read()).encode('utf-8')
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body); return
        super().do_GET()
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(os.path.join(HERE, 'cert', 'cert.pem'), os.path.join(HERE, 'cert', 'key.pem'))
httpd = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), NoCache)
if not HTTP: httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)
url = f'{"http" if HTTP else "https"}://{lan_ip()}:{PORT}/'
print('Open on the phone (same Wi-Fi):', url)
print('Chrome will warn about the certificate once: Advanced → Proceed. Then allow the microphone.')
try: subprocess.run(['qrencode', '-t', 'ANSIUTF8', url])
except FileNotFoundError: pass
httpd.serve_forever()
