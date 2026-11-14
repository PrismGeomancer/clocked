#!/usr/bin/env python3
"""Local static server with clean URLs (/launch -> launch.html), like GitHub Pages / Netlify.
Usage: python3 tools/serve.py [port]   (run from anywhere; serves the site root)"""
import http.server, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def send_head(self):
        path = self.translate_path(self.path.split('?')[0].split('#')[0])
        if not os.path.exists(path) and os.path.exists(path + '.html'):
            self.path = self.path.split('?')[0] + '.html'
        elif not os.path.exists(path):
            self.path = '/404.html'
            f = super().send_head()
            return f
        return super().send_head()
http.server.test(HandlerClass=H, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000, bind='127.0.0.1')
