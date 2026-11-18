# Servidor local con soporte de Range (audio) y múltiples conexiones a la vez
import http.server, socketserver, os, re, webbrowser, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
        '.svg':'image/svg+xml', '.mp3':'audio/mpeg', '.js':'application/javascript', '.webp':'image/webp'}
    def send_head(self):
        rng = self.headers.get('Range'); path = self.translate_path(self.path)
        if rng and os.path.isfile(path):
            m = re.match(r'bytes=(\d*)-(\d*)', rng); size = os.path.getsize(path)
            if m:
                a = int(m.group(1) or 0); b = int(m.group(2)) if m.group(2) else size-1; b = min(b, size-1)
                self.send_response(206); self.send_header('Content-Type', self.guess_type(path))
                self.send_header('Content-Range', f'bytes {a}-{b}/{size}'); self.send_header('Content-Length', str(b-a+1))
                self.send_header('Accept-Ranges', 'bytes'); self.end_headers()
                f = open(path, 'rb'); f.seek(a); self._left = b-a+1; return f
        self._left = None; return super().send_head()
    def copyfile(self, src, dst):
        try:
            if self._left is None: return super().copyfile(src, dst)
            while self._left > 0:
                d = src.read(min(65536, self._left))
                if not d: break
                dst.write(d); self._left -= len(d)
        except (ConnectionResetError, BrokenPipeError, ConnectionAbortedError): pass
    def log_message(self, *a): pass
class S(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
for port in (3000, 3001, 3002):
    try: srv = S(('127.0.0.1', port), H); break
    except OSError: continue
print(f'Servidor activo: http://localhost:{port}  (Ctrl+C para detener)')
webbrowser.open(f'http://localhost:{port}')
try: srv.serve_forever()
except KeyboardInterrupt: pass
