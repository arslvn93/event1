#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle /admin redirect to /admin.html
        if path == '/admin' or path == '/admin/':
            # Redirect to admin.html
            self.send_response(301)
            self.send_header('Location', '/admin.html')
            self.end_headers()
            return
        
        # Handle root path
        if path == '/':
            self.path = '/index.html'
        
        # Call the parent class to handle the request normally
        return super().do_GET()

    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server(port=5000):
    # Change to the directory containing the files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Allow socket reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("0.0.0.0", port), CustomHTTPRequestHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{port}/")
        print(f"Admin accessible at http://0.0.0.0:{port}/admin")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()