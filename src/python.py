#!/usr/bin/env python3
import http.server
import socketserver
import sys

PORT = 3000 if len(sys.argv) == 1 else int(sys.argv[1])

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Server running at http://localhost:{PORT}/")
httpd.serve_forever()
