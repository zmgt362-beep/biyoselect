"""
TikTok Login Kit Desktop OAuth (PKCE) helper.

Run locally:
    python scripts/tiktok_oauth_desktop.py

Fill CLIENT_KEY and CLIENT_SECRET before running.
The script opens the TikTok authorization page, receives the localhost
callback, exchanges the authorization code for tokens, and prints the
access token for local API testing.

Do not commit real client secrets or access/refresh tokens.
"""

from __future__ import annotations

import base64
import hashlib
import http.server
import json
import secrets
import threading
import urllib.parse
import urllib.request
import webbrowser


CLIENT_KEY = "YOUR_CLIENT_KEY"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"

REDIRECT_URI = "http://localhost:3456/callback/"
SCOPES = "user.info.basic,video.list,video.publish"
TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/"
AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/"

_callback = {}
_server_ready = threading.Event()


def make_code_verifier() -> str:
    # 64 URL-safe characters; TikTok Desktop Login Kit requires PKCE.
    return secrets.token_urlsafe(48)


def make_code_challenge(code_verifier: str) -> str:
    # TikTok Login Kit Desktop docs specify SHA-256; the overview specifies
    # the hex-encoded SHA-256 value.
    return hashlib.sha256(code_verifier.encode("ascii")).hexdigest()


class CallbackHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.rstrip("/") != "/callback":
            self.send_response(404)
            self.end_headers()
            return

        params = urllib.parse.parse_qs(parsed.query)
        _callback["code"] = params.get("code", [None])[0]
        _callback["state"] = params.get("state", [None])[0]
        _callback["error"] = params.get("error", [None])[0]
        _callback["error_description"] = params.get(
            "error_description", [None]
        )[0]

        body = (
            "<html><body><h2>TikTok authorization received.</h2>"
            "<p>You can close this window and return to Python.</p>"
            "</body></html>"
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

        _server_ready.set()

    def log_message(self, format: str, *args) -> None:
        return


def exchange_code(code: str, code_verifier: str) -> dict:
    payload = urllib.parse.urlencode(
        {
            "client_key": CLIENT_KEY,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": REDIRECT_URI,
            "code_verifier": code_verifier,
        }
    ).encode("utf-8")

    request = urllib.request.Request(
        TOKEN_URL,
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def main() -> None:
    if CLIENT_KEY == "YOUR_CLIENT_KEY" or CLIENT_SECRET == "YOUR_CLIENT_SECRET":
        raise SystemExit(
            "Set CLIENT_KEY and CLIENT_SECRET at the top of this script first."
        )

    state = secrets.token_urlsafe(32)
    code_verifier = make_code_verifier()
    code_challenge = make_code_challenge(code_verifier)

    query = urllib.parse.urlencode(
        {
            "client_key": CLIENT_KEY,
            "scope": SCOPES,
            "response_type": "code",
            "redirect_uri": REDIRECT_URI,
            "state": state,
            "code_challenge": code_challenge,
            "code_challenge_method": "S256",
        }
    )

    authorization_url = f"{AUTH_URL}?{query}"

    server = http.server.HTTPServer(("localhost", 3456), CallbackHandler)
    server.timeout = 1

    print("Opening TikTok authorization page...")
    print(authorization_url)
    webbrowser.open(authorization_url)

    print("Waiting for TikTok callback on", REDIRECT_URI)
    while not _server_ready.is_set():
        server.handle_request()

    server.server_close()

    if _callback.get("error"):
        raise SystemExit(
            f"TikTok authorization failed: {_callback['error']} "
            f"{_callback.get('error_description', '')}"
        )

    if _callback.get("state") != state:
        raise SystemExit("State mismatch. Aborting for security.")

    code = _callback.get("code")
    if not code:
        raise SystemExit("No authorization code received.")

    token = exchange_code(code, code_verifier)

    print("\nToken response:")
    print(json.dumps(token, indent=2, ensure_ascii=False))

    if "access_token" in token:
        print("\nACCESS TOKEN:")
        print(token["access_token"])
        print("\nCopy this token only for local testing. Do not commit it to GitHub.")


if __name__ == "__main__":
    main()
